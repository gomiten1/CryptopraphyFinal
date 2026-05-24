import { serve } from 'https://deno.land/std@0.224.0/http/server.ts'
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

    return jsonResponse({ token })
  } catch (error) {
    return jsonResponse({ error: error instanceof Error ? error.message : 'Unexpected error' }, { status: 500 })
  }
})
