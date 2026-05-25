import { serve } from 'https://deno.land/std@0.224.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.106.0'
import { corsHeaders, encryptJson, jsonResponse, requireEnv, asRecord, tryParseJson } from '../_shared/crypto.ts'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, { status: 405 })
  }

  try {
    const secret = requireEnv('CRYPTO_QR_SECRET')
    const supabaseUrl = requireEnv('SUPABASE_URL')
    const serviceRoleKey = requireEnv('SUPABASE_SERVICE_ROLE_KEY')
    const supabase = createClient(supabaseUrl, serviceRoleKey)
    const body = asRecord(tryParseJson(await req.text()))
    const alumno_id = body.alumno_id
    const empresa_id = body.empresa_id

    if (typeof alumno_id !== 'string' || typeof empresa_id !== 'string') {
      return jsonResponse({ error: 'alumno_id and empresa_id are required string values' }, { status: 400 })
    }

    const token = await encryptJson(
      {
        alumno_id,
        empresa_id,
        purpose: 'qr-verification',
        issued_at: new Date().toISOString(),
        nonce: crypto.randomUUID(),
      },
      secret,
    )

    const { error: insertError } = await supabase.from('qr_tokens').insert({
      alumno_id,
      empresa_id,
      token,
      payload: {
        alumno_id,
        empresa_id,
        purpose: 'qr-verification',
      },
    })

    if (insertError) {
      return jsonResponse({ error: insertError.message }, { status: 500 })
    }

    return jsonResponse({ token })
  } catch (error) {
    return jsonResponse({ error: error instanceof Error ? error.message : 'Unexpected error' }, { status: 500 })
  }
})
