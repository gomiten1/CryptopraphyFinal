import { serve } from 'https://deno.land/std@0.224.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.106.0'
import { asRecord, corsHeaders, hmacSha256Hex, jsonResponse, requireEnv, sha256Hex, stringifyContractPayload, tryParseJson } from '../_shared/crypto.ts'

type DbContract = {
  id: string
  alumno_id: string | null
  empresa_id: string | null
  vacante_id: string | null
  json_datos: Record<string, unknown> | null
  hash_sha256: string | null
  firma_digital: string | null
  estado: string | null
}

function getBearerToken(req: Request): string | null {
  const auth = req.headers.get('authorization') ?? req.headers.get('Authorization')
  if (!auth) return null
  const [scheme, token] = auth.split(' ')
  if (scheme?.toLowerCase() !== 'bearer' || !token) return null
  return token
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, { status: 405 })
  }

  try {
    const supabaseUrl = requireEnv('SUPABASE_URL')
    const serviceRoleKey = requireEnv('SUPABASE_SERVICE_ROLE_KEY')
    const signatureSecret = requireEnv('SIGN_CONTRACT_SECRET')
    const supabase = createClient(supabaseUrl, serviceRoleKey)

    const token = getBearerToken(req)
    if (!token) {
      return jsonResponse({ approved: false, error: 'Missing bearer token' }, { status: 401 })
    }

    const { data: userData, error: userError } = await supabase.auth.getUser(token)
    if (userError || !userData.user) {
      return jsonResponse({ approved: false, error: 'Invalid auth token' }, { status: 401 })
    }

    const adminId = userData.user.id

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, rol')
      .eq('id', adminId)
      .single()

    if (profileError) {
      return jsonResponse({ approved: false, error: profileError.message }, { status: 500 })
    }

    if (profile.rol !== 'admin') {
      return jsonResponse({ approved: false, error: 'Only admins can approve contracts' }, { status: 403 })
    }

    const body = asRecord(tryParseJson(await req.text()))
    const contractId = body.contract_id

    if (typeof contractId !== 'string') {
      return jsonResponse({ approved: false, error: 'contract_id is required' }, { status: 400 })
    }

    const { data: contract, error: contractError } = await supabase
      .from('contratos_eventos')
      .select('id, alumno_id, empresa_id, vacante_id, json_datos, hash_sha256, firma_digital, estado')
      .eq('id', contractId)
      .single<DbContract>()

    if (contractError) {
      return jsonResponse({ approved: false, error: contractError.message }, { status: 404 })
    }

    if (!contract.json_datos || typeof contract.json_datos !== 'object') {
      return jsonResponse({ approved: false, error: 'Contract payload is missing' }, { status: 400 })
    }

    if (typeof contract.hash_sha256 !== 'string' || typeof contract.firma_digital !== 'string') {
      return jsonResponse({ approved: false, error: 'Contract hashes are missing' }, { status: 400 })
    }

    const jsonString = stringifyContractPayload(contract.json_datos)
    const computedHash = await sha256Hex(jsonString)
    const computedSignature = await hmacSha256Hex(computedHash, signatureSecret)

    const hashMatches = computedHash === contract.hash_sha256
    const signatureMatches = computedSignature === contract.firma_digital

    if (!hashMatches || !signatureMatches) {
      return jsonResponse(
        {
          approved: false,
          error: 'Cryptographic verification failed',
          matches: {
            hash_sha256: hashMatches,
            firma_digital: signatureMatches,
          },
        },
        { status: 400 },
      )
    }

    const { data: approvalResult, error: approvalError } = await supabase.rpc('approve_contract_and_apply_progress', {
      p_contract_id: contract.id,
      p_admin_id: adminId,
    })

    if (approvalError) {
      return jsonResponse({ approved: false, error: approvalError.message }, { status: 500 })
    }

    return jsonResponse({
      ...(approvalResult ?? {}),
      approved: approvalResult?.approved === true,
      verification: {
        hash_sha256: hashMatches,
        firma_digital: signatureMatches,
        algorithm: 'SHA-256 + HMAC-SHA256',
      },
    })
  } catch (error) {
    return jsonResponse({ approved: false, error: error instanceof Error ? error.message : 'Unexpected error' }, { status: 500 })
  }
})
