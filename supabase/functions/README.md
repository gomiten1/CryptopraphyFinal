# Supabase Edge Functions

This folder contains the deployable Supabase Edge Functions for the project.

## Functions

- `crypto-qr`: encrypts `{ alumno_id, empresa_id }` into a QR token.
- `sign-contract`: hashes and signs a contract event, then stores it in `contratos_eventos`.

## Required secrets

Set these in Supabase before deploying:

- `CRYPTO_QR_SECRET`
- `SIGN_CONTRACT_SECRET`
- `SUPABASE_SERVICE_ROLE_KEY` (for `sign-contract` only)

The function runtime also needs `SUPABASE_URL`, which Supabase provides in the hosted environment.

## Local structure

- `supabase/functions/_shared/crypto.ts`
- `supabase/functions/crypto-qr/index.ts`
- `supabase/functions/sign-contract/index.ts`

## Deploy

```bash
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase secrets set CRYPTO_QR_SECRET='your-32-byte-base64-secret'
supabase secrets set SIGN_CONTRACT_SECRET='your-signature-secret'
supabase secrets set SUPABASE_SERVICE_ROLE_KEY='your-service-role-key'
supabase functions deploy crypto-qr
supabase functions deploy sign-contract
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
  -d '{"alumno_id":"uuid-alumno","empresa_id":"uuid-empresa","json_datos":{"horas":4,"descripcion":"Asistencia"}}'
```
