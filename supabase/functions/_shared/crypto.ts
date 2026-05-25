export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const encoder = new TextEncoder()
const decoder = new TextDecoder()

function toBase64(bytes: Uint8Array): string {
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary)
}

function fromBase64(value: string): Uint8Array {
  const binary = atob(value)
  const bytes = new Uint8Array(binary.length)
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index)
  }
  return bytes
}

export function jsonResponse(body: unknown, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...corsHeaders,
      ...(init.headers ?? {}),
    },
  })
}

export function requireEnv(name: string): string {
  const value = Deno.env.get(name)
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

async function deriveAesKey(secret: string): Promise<CryptoKey> {
  const rawKey = await crypto.subtle.digest('SHA-256', encoder.encode(secret))
  return crypto.subtle.importKey('raw', rawKey, 'AES-GCM', false, ['encrypt', 'decrypt'])
}

export async function encryptJson(payload: unknown, secret: string): Promise<string> {
  const key = await deriveAesKey(secret)
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const plaintext = encoder.encode(JSON.stringify(payload))
  const ciphertext = new Uint8Array(
    await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, plaintext),
  )

  return [toBase64(iv), toBase64(ciphertext)].join('.')
}

export async function decryptJson<T>(token: string, secret: string): Promise<T> {
  const [ivPart, ciphertextPart] = token.split('.')
  if (!ivPart || !ciphertextPart) {
    throw new Error('Invalid encrypted payload format')
  }

  const key = await deriveAesKey(secret)
  const iv = fromBase64(ivPart)
  const ciphertext = fromBase64(ciphertextPart)
  const plaintext = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ciphertext)
  return JSON.parse(decoder.decode(plaintext)) as T
}

export async function sha256Hex(value: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', encoder.encode(value))
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

export async function hmacSha256Hex(value: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )

  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(value))
  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

export function tryParseJson(body: string): unknown {
  try {
    return JSON.parse(body)
  } catch {
    throw new Error('Request body must be valid JSON')
  }
}

export function asRecord(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error('Expected a JSON object')
  }

  return value as Record<string, unknown>
}

function serializeValue(value: unknown, preferredKeyOrder: string[]): string {
  if (value === null) {
    return 'null'
  }

  const valueType = typeof value

  if (valueType === 'string') {
    return JSON.stringify(value)
  }

  if (valueType === 'number') {
    return Number.isFinite(value as number) ? String(value) : 'null'
  }

  if (valueType === 'boolean') {
    return value ? 'true' : 'false'
  }

  if (Array.isArray(value)) {
    return `[${value.map((item) => serializeValue(item, preferredKeyOrder)).join(',')}]`
  }

  if (valueType === 'object') {
    const record = value as Record<string, unknown>
    const keys = Object.keys(record)
    const orderedKeys = [
      ...preferredKeyOrder.filter((key) => keys.includes(key)),
      ...keys.filter((key) => !preferredKeyOrder.includes(key)).sort(),
    ]

    return `{${orderedKeys
      .map((key) => `${JSON.stringify(key)}:${serializeValue(record[key], preferredKeyOrder)}`)
      .join(',')}}`
  }

  return 'null'
}

export function stringifyContractPayload(value: unknown): string {
  return serializeValue(value, [
    'alumno_id',
    'alumno_nombre',
    'empresa_id',
    'horas',
    'actividad',
    'notas',
    'firmado_en',
  ])
}
