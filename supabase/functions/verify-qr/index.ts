import { serve } from 'https://deno.land/std@0.224.0/http/server.ts'
import { asRecord, corsHeaders, decryptJson, jsonResponse, requireEnv, tryParseJson } from '../_shared/crypto.ts'

type QRPayload = {
  alumno_id: string
  empresa_id: string
  purpose?: string
  issued_at?: string
  nonce?: string
}

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
    const token = body.token
    const expectedAlumnoId = body.expected_alumno_id
    const expectedEmpresaId = body.expected_empresa_id

    if (typeof token !== 'string' || !token.trim()) {
      return jsonResponse({ error: 'token is required' }, { status: 400 })
    }

    const payload = await decryptJson<QRPayload>(token.trim(), secret)

    if (payload.purpose !== 'qr-verification') {
      return jsonResponse(
        {
          verified: false,
          error: 'QR payload purpose is invalid',
          payload,
        },
        { status: 400 },
      )
    }

    const studentMatches = typeof expectedAlumnoId !== 'string' || payload.alumno_id === expectedAlumnoId
    const companyMatches = typeof expectedEmpresaId !== 'string' || payload.empresa_id === expectedEmpresaId
    const verified = studentMatches && companyMatches

    return jsonResponse({
      verified,
      payload,
      matches: {
        alumno_id: studentMatches,
        empresa_id: companyMatches,
      },
      algorithm: 'AES-256-GCM',
    })
  } catch (error) {
    return jsonResponse(
      {
        verified: false,
        error: error instanceof Error ? error.message : 'Unexpected error',
      },
      { status: 400 },
    )
  }
})