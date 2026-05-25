import { serve } from 'https://deno.land/std@0.224.0/http/server.ts'
import { asRecord, corsHeaders, hmacSha256Hex, jsonResponse, requireEnv, sha256Hex, stringifyContractPayload, tryParseJson } from '../_shared/crypto.ts'

type ContractRecord = {
  json_datos?: Record<string, unknown>
  hash_sha256?: string
  firma_digital?: string
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, { status: 405 })
  }

  try {
    const signatureSecret = requireEnv('SIGN_CONTRACT_SECRET')
    const body = asRecord(tryParseJson(await req.text()))
    const record = (body.record ?? body) as ContractRecord

    if (!record || typeof record !== 'object' || Array.isArray(record)) {
      return jsonResponse({ error: 'record is required' }, { status: 400 })
    }

    const json_datos = record.json_datos
    const storedHash = record.hash_sha256
    const storedSignature = record.firma_digital

    if (!json_datos || typeof json_datos !== 'object' || Array.isArray(json_datos)) {
      return jsonResponse({ error: 'json_datos is required' }, { status: 400 })
    }

    if (typeof storedHash !== 'string' || typeof storedSignature !== 'string') {
      return jsonResponse({ error: 'hash_sha256 and firma_digital are required' }, { status: 400 })
    }

    const jsonString = stringifyContractPayload(json_datos)
    const computedHash = await sha256Hex(jsonString)
    const computedSignature = await hmacSha256Hex(computedHash, signatureSecret)

    const hashMatches = computedHash === storedHash
    const signatureMatches = computedSignature === storedSignature

    return jsonResponse({
      verified: hashMatches && signatureMatches,
      matches: {
        hash_sha256: hashMatches,
        firma_digital: signatureMatches,
      },
      computed: {
        hash_sha256: computedHash,
        firma_digital: computedSignature,
      },
      stored: {
        hash_sha256: storedHash,
        firma_digital: storedSignature,
      },
      algorithm: 'SHA-256 + HMAC-SHA256',
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