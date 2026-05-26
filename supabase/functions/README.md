# Supabase Edge Functions

This folder contains the deployable Supabase Edge Functions for the project.

## Functions

- `crypto-qr`: encrypts `{ alumno_id, empresa_id, vacante_id }` into a QR token and stores it in `qr_tokens`.
- `verify-qr`: decrypts a QR token and validates the linked alumno/empresa/vacante pair.
- `sign-contract`: hashes and signs a contract event, validates QR previo, then stores it in `contratos_eventos` as `pendiente`.
- `verify-contract`: recalculates the hash/signature for a stored contract event.
- `approve-contract`: verifies integrity and approves a contract as admin, then applies hours to `servicio_social_progreso`.

## Required secrets

Set these in Supabase before deploying:

- `CRYPTO_QR_SECRET`
- `SIGN_CONTRACT_SECRET`
- `SUPABASE_SERVICE_ROLE_KEY` (for `sign-contract` and `approve-contract`)

The function runtime also needs `SUPABASE_URL`, which Supabase provides in the hosted environment.

## Local structure

- `supabase/functions/_shared/crypto.ts`
- `supabase/functions/crypto-qr/index.ts`
- `supabase/functions/verify-qr/index.ts`
- `supabase/functions/sign-contract/index.ts`
- `supabase/functions/verify-contract/index.ts`
- `supabase/functions/approve-contract/index.ts`

## Deploy

```bash
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase secrets set CRYPTO_QR_SECRET='your-32-byte-base64-secret'
supabase secrets set SIGN_CONTRACT_SECRET='your-signature-secret'
supabase secrets set SUPABASE_SERVICE_ROLE_KEY='your-service-role-key'
supabase functions deploy crypto-qr
supabase functions deploy verify-qr
supabase functions deploy sign-contract
supabase functions deploy verify-contract
supabase functions deploy approve-contract
```

## Test

Example request to `crypto-qr`:

```bash
curl -X POST 'https://YOUR_PROJECT_REF.supabase.co/functions/v1/crypto-qr' \
  -H 'Authorization: Bearer YOUR_ANON_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"alumno_id":"uuid-alumno","empresa_id":"uuid-empresa"}'
```

Example request to `sign-contract`:

```bash
curl -X POST 'https://YOUR_PROJECT_REF.supabase.co/functions/v1/sign-contract' \
  -H 'Authorization: Bearer YOUR_ANON_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"alumno_id":"uuid-alumno","empresa_id":"uuid-empresa","vacante_id":"uuid-vacante","json_datos":{"horas":4,"actividad":"Asistencia"}}'
```

Example request to `verify-qr`:

```bash
curl -X POST 'https://YOUR_PROJECT_REF.supabase.co/functions/v1/verify-qr' \
  -H 'Authorization: Bearer YOUR_ANON_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"token":"ciphertext.token","expected_alumno_id":"uuid-alumno","expected_empresa_id":"uuid-empresa"}'
```

Example request to `verify-contract`:

```bash
curl -X POST 'https://YOUR_PROJECT_REF.supabase.co/functions/v1/verify-contract' \
  -H 'Authorization: Bearer YOUR_ANON_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"record":{"json_datos":{"horas":4,"descripcion":"Asistencia"},"hash_sha256":"...","firma_digital":"..."}}'

Example request to `approve-contract`:

```bash
curl -X POST 'https://YOUR_PROJECT_REF.supabase.co/functions/v1/approve-contract' \
  -H 'Authorization: Bearer ADMIN_ACCESS_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"contract_id":"uuid-contrato"}'
```
```
