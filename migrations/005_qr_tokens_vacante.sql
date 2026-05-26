-- 005_qr_tokens_vacante.sql
-- Vincula cada QR con una vacante concreta para poder descontar cupo al validar

alter table public.qr_tokens
  add column if not exists vacante_id uuid references public.vacantes(id) on delete set null;

create index if not exists idx_qr_tokens_vacante_id on public.qr_tokens(vacante_id);

create or replace function public.validate_qr_token_and_decrement_vacante(
  p_token text,
  p_expected_empresa_id uuid default null,
  p_expected_alumno_id uuid default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_token public.qr_tokens%rowtype;
  v_vacante public.vacantes%rowtype;
  v_student_matches boolean;
  v_company_matches boolean;
begin
  select *
    into v_token
    from public.qr_tokens
   where token = p_token
   for update;

  if not found then
    return jsonb_build_object('verified', false, 'error', 'QR token not found');
  end if;

  if v_token.validado_en is not null then
    return jsonb_build_object('verified', false, 'error', 'QR token already validated', 'payload', v_token.payload);
  end if;

  v_student_matches := p_expected_alumno_id is null or v_token.alumno_id = p_expected_alumno_id;
  v_company_matches := p_expected_empresa_id is null or v_token.empresa_id = p_expected_empresa_id;

  if not (v_student_matches and v_company_matches) then
    return jsonb_build_object(
      'verified', false,
      'error', 'QR token does not match expected identities',
      'payload', v_token.payload,
      'matches', jsonb_build_object(
        'alumno_id', v_student_matches,
        'empresa_id', v_company_matches
      ),
      'algorithm', 'AES-256-GCM'
    );
  end if;

  update public.qr_tokens
     set validado_en = now(),
         validado_por = p_expected_empresa_id
   where id = v_token.id;

  if v_token.vacante_id is not null then
    update public.vacantes
       set cupo_disponible = greatest(coalesce(cupo_disponible, 0) - 1, 0)
     where id = v_token.vacante_id
       and coalesce(cupo_disponible, 0) > 0
     returning * into v_vacante;

    if not found then
      raise exception 'No hay cupo disponible para la vacante asociada';
    end if;
  end if;

  return jsonb_build_object(
    'verified', true,
    'payload', v_token.payload,
    'matches', jsonb_build_object(
      'alumno_id', v_student_matches,
      'empresa_id', v_company_matches
    ),
    'algorithm', 'AES-256-GCM',
    'vacante_id', v_token.vacante_id,
    'cupo_disponible', case when v_token.vacante_id is null then null else v_vacante.cupo_disponible end
  );
end;
$$;