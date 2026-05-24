// Example Edge Function (Node) - sign-contract
// This example computes SHA-256 of json payload and signs it (example using HMAC).
// In production use proper asymmetric signing (RSA/ECDSA) and keep private key secret.
import crypto from 'crypto'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

export default async function (req, res) {
  try {
    const body = await req.json()
    const { alumno_id, empresa_id, json_datos } = body
    if (!alumno_id || !empresa_id || !json_datos) return res.status(400).json({ error: 'missing fields' })

    const jsonString = JSON.stringify(json_datos)
    const hash = crypto.createHash('sha256').update(jsonString).digest('hex')

    // Example signature using HMAC (not recommended for legal signatures)
    const secret = process.env.SIGN_CONTRACT_SECRET
    const signature = crypto.createHmac('sha256', secret || '').update(hash).digest('hex')

    // Insert into contratos_eventos using service role key
    const { error } = await supabase.from('contratos_eventos').insert([{ alumno_id, empresa_id, json_datos, hash_sha256: hash, firma_digital: signature }])
    if (error) return res.status(500).json({ error: error.message })

    return res.json({ hash, signature })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
