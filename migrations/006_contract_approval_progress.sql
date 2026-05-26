-- 006_contract_approval_progress.sql
-- Agrega aprobación administrativa de contratos y progreso real de servicio social

alter table public.contratos_eventos
  add column if not exists vacante_id uuid references public.vacantes(id) on delete set null,
  add column if not exists estado text not null default 'pendiente' check (estado in ('pendiente', 'aprobado', 'rechazado')),
  add column if not exists aprobado_en timestamptz,
  add column if not exists aprobado_por uuid references public.profiles(id) on delete set null,
  add column if not exists rechazo_motivo text;

create index if not exists idx_contratos_eventos_estado on public.contratos_eventos(estado);
create index if not exists idx_contratos_eventos_alumno_estado on public.contratos_eventos(alumno_id, estado);

create table if not exists public.servicio_social_progreso (
  alumno_id uuid primary key references public.profiles(id) on delete cascade,
  horas_aprobadas numeric(10,2) not null default 0,
  horas_objetivo numeric(10,2) not null default 480,
  ultimo_contrato_id uuid references public.contratos_eventos(id) on delete set null,
  actualizado_en timestamptz not null default now()
);

alter table public.servicio_social_progreso enable row level security;

drop policy if exists progreso_select_owners on public.servicio_social_progreso;
create policy progreso_select_owners on public.servicio_social_progreso
  for select using (
    alumno_id = auth.uid() or exists (
      select 1 from public.profiles p where p.id = auth.uid() and p.rol = 'admin'
    )
  );

drop policy if exists progreso_update_admin on public.servicio_social_progreso;
create policy progreso_update_admin on public.servicio_social_progreso
  for update using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.rol = 'admin')
  ) with check (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.rol = 'admin')
  );

drop policy if exists progreso_insert_admin on public.servicio_social_progreso;
create policy progreso_insert_admin on public.servicio_social_progreso
  for insert with check (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.rol = 'admin')
  );

create or replace function public.approve_contract_and_apply_progress(
  p_contract_id uuid,
  p_admin_id uuid
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_contract public.contratos_eventos%rowtype;
  v_horas_text text;
  v_horas numeric(10,2);
  v_progress public.servicio_social_progreso%rowtype;
begin
  select *
    into v_contract
    from public.contratos_eventos
   where id = p_contract_id
   for update;

  if not found then
    return jsonb_build_object('approved', false, 'error', 'Contrato no encontrado');
  end if;

  if v_contract.estado = 'aprobado' then
    select *
      into v_progress
      from public.servicio_social_progreso
     where alumno_id = v_contract.alumno_id;

    return jsonb_build_object(
      'approved', true,
      'already_approved', true,
      'contract_id', v_contract.id,
      'alumno_id', v_contract.alumno_id,
      'horas_aprobadas', coalesce(v_progress.horas_aprobadas, 0),
      'horas_objetivo', coalesce(v_progress.horas_objetivo, 480),
      'estado', v_contract.estado
    );
  end if;

  if v_contract.estado = 'rechazado' then
    return jsonb_build_object('approved', false, 'error', 'El contrato fue rechazado y no puede aprobarse');
  end if;

  if v_contract.alumno_id is null then
    return jsonb_build_object('approved', false, 'error', 'El contrato no tiene alumno asociado');
  end if;

  v_horas_text := nullif(trim(coalesce(v_contract.json_datos->>'horas', '')), '');

  if v_horas_text is null then
    return jsonb_build_object('approved', false, 'error', 'El contrato no contiene horas válidas');
  end if;

  if v_horas_text !~ '^[0-9]+(\.[0-9]+)?$' then
    return jsonb_build_object('approved', false, 'error', 'El valor de horas no es numérico');
  end if;

  v_horas := v_horas_text::numeric;

  if v_horas <= 0 then
    return jsonb_build_object('approved', false, 'error', 'Las horas del contrato deben ser mayores a cero');
  end if;

  update public.contratos_eventos
     set estado = 'aprobado',
         aprobado_en = now(),
         aprobado_por = p_admin_id,
         rechazo_motivo = null
   where id = v_contract.id;

  insert into public.servicio_social_progreso (
    alumno_id,
    horas_aprobadas,
    horas_objetivo,
    ultimo_contrato_id,
    actualizado_en
  )
  values (
    v_contract.alumno_id,
    v_horas,
    480,
    v_contract.id,
    now()
  )
  on conflict (alumno_id)
  do update
    set horas_aprobadas = public.servicio_social_progreso.horas_aprobadas + excluded.horas_aprobadas,
        ultimo_contrato_id = excluded.ultimo_contrato_id,
        actualizado_en = now();

  select *
    into v_progress
    from public.servicio_social_progreso
   where alumno_id = v_contract.alumno_id;

  return jsonb_build_object(
    'approved', true,
    'already_approved', false,
    'contract_id', v_contract.id,
    'alumno_id', v_contract.alumno_id,
    'horas_sumadas', v_horas,
    'horas_aprobadas', v_progress.horas_aprobadas,
    'horas_objetivo', v_progress.horas_objetivo,
    'estado', 'aprobado',
    'aprobado_en', now(),
    'aprobado_por', p_admin_id
  );
end;
$$;
