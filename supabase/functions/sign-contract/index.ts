import { serve } from 'https://deno.land/std@0.224.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.106.0'
import { asRecord, corsHeaders, hmacSha256Hex, jsonResponse, requireEnv, sha256Hex, stringifyContractPayload, tryParseJson } from '../_shared/crypto.ts'

serve(async (req: Request) => {
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

    const body = asRecord(tryParseJson(await req.text()))
    const alumno_id = body.alumno_id
    const empresa_id = body.empresa_id
    const vacante_id = body.vacante_id
    const json_datos = body.json_datos

    if (
      typeof alumno_id !== 'string' ||
      typeof empresa_id !== 'string' ||
      typeof vacante_id !== 'string' ||
      !json_datos ||
      typeof json_datos !== 'object'
    ) {
      return jsonResponse({ error: 'alumno_id, empresa_id, vacante_id and json_datos are required' }, { status: 400 })
    }

    const { data: validatedQr, error: qrError } = await supabase
      .from('qr_tokens')
      .select('id')
      .eq('alumno_id', alumno_id)
      .eq('empresa_id', empresa_id)
      .eq('vacante_id', vacante_id)
      .not('validado_en', 'is', null)
      .limit(1)
      .maybeSingle()

    if (qrError) {
      return jsonResponse({ error: qrError.message }, { status: 500 })
    }

    if (!validatedQr) {
      return jsonResponse(
        { error: 'No existe validación QR previa para alumno, empresa y vacante indicados' },
        { status: 400 },
      )
    }

    const jsonString = stringifyContractPayload(json_datos)
    const hash_sha256 = await sha256Hex(jsonString)
    const firma_digital = await hmacSha256Hex(hash_sha256, signatureSecret)

    const { data, error } = await supabase
      .from('contratos_eventos')
      .insert({
        alumno_id,
        empresa_id,
        vacante_id,
        estado: 'pendiente',
        json_datos,
        hash_sha256,
        firma_digital,
      })
      .select('id, alumno_id, empresa_id, vacante_id, estado, json_datos, hash_sha256, firma_digital, creado_en')
      .single()

    if (error) {
      return jsonResponse({ error: error.message }, { status: 500 })
    }

    return jsonResponse({
      record: data,
      verification: {
        hash_sha256,
        firma_digital,
        algorithm: 'SHA-256 + HMAC-SHA256',
      },
    })
  } catch (error) {
    return jsonResponse({ error: error instanceof Error ? error.message : 'Unexpected error' }, { status: 500 })
  }
})
