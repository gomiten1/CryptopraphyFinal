-- 004_qr_tokens_validation.sql
-- Agrega persistencia del estado de validación de QR

alter table public.qr_tokens
  add column if not exists validado_en timestamptz,
  add column if not exists validado_por uuid references public.profiles(id) on delete set null;

create index if not exists idx_qr_tokens_empresa_id_validado_en on public.qr_tokens(empresa_id, validado_en);
create index if not exists idx_qr_tokens_alumno_id_validado_en on public.qr_tokens(alumno_id, validado_en);
