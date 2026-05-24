## Supabase setup for ServicioSeguro

Below are SQL migrations and instructions to create the minimal schema and RLS policies used by the frontend.

1) Create `profiles` table (links to `auth.users`):

```sql
-- public.profiles
create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  full_name text,
  rol text not null check (rol in ('alumno','empresa','admin')),
  created_at timestamptz default now()
);
```

2) Create `vacantes` table:

```sql
create table if not exists public.vacantes (
  id uuid primary key default gen_random_uuid(),
  empresa_id uuid references public.profiles(id),
  titulo text,
  descripcion text,
  cupo_total int default 1,
  cupo_disponible int default 1,
  creado_en timestamptz default now()
);
```

3) Create `contratos_eventos` table:

```sql
create table if not exists public.contratos_eventos (
  id uuid primary key default gen_random_uuid(),
  alumno_id uuid references public.profiles(id),
  empresa_id uuid references public.profiles(id),
  json_datos jsonb,
  hash_sha256 text,
  firma_digital text,
  creado_en timestamptz default now()
);
```

4) Example RLS policy for `profiles` (allow users to read their own profile):

```sql
alter table public.profiles enable row level security;

create policy "profiles_self_read" on public.profiles
  for select
  using ( auth.uid() = id );

-- If you need admin-wide reads later, do it through a backend/service-role path or a custom JWT claim.
```

5) Edge Functions (recommended names)

- `crypto-qr`: Accepts { alumno_id, empresa_id } signed with the service role key or a separate function secret. Returns AES-256-CBC (or GCM) encrypted string. Secret: `CRYPTO_QR_SECRET`.
- `decrypt-qr`: Accepts encrypted string and returns parsed data after decryption; validates binding between alumno and empresa.
- `sign-contract`: Accepts JSON payload for event, returns { hash, signature } and inserts into `contratos_eventos` using service-role key.

6) Notes
- Do NOT expose `SUPABASE_SERVICE_ROLE_KEY` to the frontend.
- Provide `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` to the frontend (via `.env` or environment).
- Implement the Edge Functions using `@supabase/functions-js` or Node/TS with the Service Role key stored as a secret.
- For the schema itself, run `migrations/001_init.sql` in the Supabase SQL Editor or apply it with the Supabase CLI.

If you want, I can generate starter code for the Edge Functions (Node/TypeScript) and the exact SQL migration file.
