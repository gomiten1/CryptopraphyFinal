-- 003_qr_tokens.sql
-- Persistencia de tokens QR generados para verificación posterior

create table if not exists public.qr_tokens (
  id uuid primary key default gen_random_uuid(),
  alumno_id uuid references public.profiles(id) on delete set null,
  empresa_id uuid references public.profiles(id) on delete set null,
  token text not null unique,
  payload jsonb not null,
  creado_en timestamptz default now()
);

create index if not exists idx_qr_tokens_alumno_id on public.qr_tokens(alumno_id);
create index if not exists idx_qr_tokens_empresa_id on public.qr_tokens(empresa_id);

alter table public.qr_tokens enable row level security;

drop policy if exists qr_tokens_select_owners on public.qr_tokens;
create policy qr_tokens_select_owners on public.qr_tokens
  for select using (
    (alumno_id = auth.uid()) or (empresa_id = auth.uid()) or (
      exists (select 1 from public.profiles p where p.id = auth.uid() and p.rol = 'admin')
    )
  );

drop policy if exists qr_tokens_insert_by_service on public.qr_tokens;
create policy qr_tokens_insert_by_service on public.qr_tokens
  for insert with check (true);
