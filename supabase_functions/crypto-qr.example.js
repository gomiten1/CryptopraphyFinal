// Example Edge Function (Node) - crypto-qr
// Deploy this with Supabase Functions and set CRYPTO_QR_SECRET in secrets
import crypto from 'crypto'

export default async function (req, res) {
  try {
    const body = await req.json()
    const { alumno_id, empresa_id } = body
    if (!alumno_id || !empresa_id) return res.status(400).json({ error: 'missing ids' })

    const secret = process.env.CRYPTO_QR_SECRET
    if (!secret) return res.status(500).json({ error: 'missing secret' })

    // Example: AES-256-GCM encrypt
    const iv = crypto.randomBytes(12)
    const key = Buffer.from(secret, 'base64')
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)
    const payload = JSON.stringify({ alumno_id, empresa_id, ts: Date.now() })
    let encrypted = cipher.update(payload, 'utf8', 'base64')
    encrypted += cipher.final('base64')
    const tag = cipher.getAuthTag().toString('base64')

    const token = `${iv.toString('base64')}.${tag}.${encrypted}`
    return res.json({ token })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
