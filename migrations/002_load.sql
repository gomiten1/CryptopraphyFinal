-- 002_load.sql
-- Seed de datos para pruebas locales en Supabase.
-- Este script es estrictamente Auth-only.
-- Requiere que Auth esté activo en el proyecto y que exista auth.instances.

create extension if not exists pgcrypto;

-- ------------------------------------------------------------
-- Seed completo: Auth + profiles + vacantes
-- ------------------------------------------------------------

do $$
declare
  v_instance_id uuid;
begin
  begin
    select id into v_instance_id
    from auth.instances
    limit 1;
  exception
    when undefined_table then
      raise exception 'Auth no está activo todavía: falta auth.instances. Activa Authentication en Supabase antes de correr este script.';
  end;

  if v_instance_id is null then
    raise exception 'No auth.instances row found. Activa Authentication en Supabase antes de correr este script.';
  end if;

  -- Usuarios de prueba en Auth (preconfirmados para poder iniciar sesión de inmediato)
  insert into auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    recovery_token,
    email_change_token_new,
    email_change,
    email_change_sent_at,
    recovery_sent_at,
    last_sign_in_at
  )
  values
    (
      v_instance_id,
      '11111111-1111-1111-1111-111111111111',
      'authenticated',
      'authenticated',
      'alumno1@servicioseguro.test',
      crypt('Alumno123!', gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{"full_name":"Alumno Uno","career":"Ing. en Sistemas","semester":"8vo"}'::jsonb,
      now(),
      now(),
      '',
      '',
      '',
      '',
      null,
      null,
      null
    ),
    (
      v_instance_id,
      '22222222-2222-2222-2222-222222222222',
      'authenticated',
      'authenticated',
      'alumno2@servicioseguro.test',
      crypt('Alumno123!', gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{"full_name":"Alumno Dos","career":"Ing. Industrial","semester":"6to"}'::jsonb,
      now(),
      now(),
      '',
      '',
      '',
      '',
      null,
      null,
      null
    ),
    (
      v_instance_id,
      '33333333-3333-3333-3333-333333333333',
      'authenticated',
      'authenticated',
      'universidad@servicioseguro.test',
      crypt('Admin123!', gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{"full_name":"Coordinación Universidad"}'::jsonb,
      now(),
      now(),
      '',
      '',
      '',
      '',
      null,
      null,
      null
    ),
    (
      v_instance_id,
      '44444444-4444-4444-4444-444444444444',
      'authenticated',
      'authenticated',
      'empresa1@servicioseguro.test',
      crypt('Empresa123!', gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{"full_name":"TechCorp S.A. de C.V.","company_rfc":"TEC123456ABC","supervisor":"Ing. María Rodríguez"}'::jsonb,
      now(),
      now(),
      '',
      '',
      '',
      '',
      null,
      null,
      null
    ),
    (
      v_instance_id,
      '55555555-5555-5555-5555-555555555555',
      'authenticated',
      'authenticated',
      'empresa2@servicioseguro.test',
      crypt('Empresa123!', gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{"full_name":"CyberSec Corp S.A. de C.V.","company_rfc":"CYC987654XYZ","supervisor":"Ing. Laura Pérez"}'::jsonb,
      now(),
      now(),
      '',
      '',
      '',
      '',
      null,
      null,
      null
    )
  on conflict (id) do nothing;

  -- Roles finales de los perfiles
  update public.profiles
  set rol = case id
    when '11111111-1111-1111-1111-111111111111' then 'alumno'
    when '22222222-2222-2222-2222-222222222222' then 'alumno'
    when '33333333-3333-3333-3333-333333333333' then 'admin'
    when '44444444-4444-4444-4444-444444444444' then 'empresa'
    when '55555555-5555-5555-5555-555555555555' then 'empresa'
    else rol
  end,
  full_name = case id
    when '11111111-1111-1111-1111-111111111111' then 'Alumno Uno'
    when '22222222-2222-2222-2222-222222222222' then 'Alumno Dos'
    when '33333333-3333-3333-3333-333333333333' then 'Coordinación Universidad'
    when '44444444-4444-4444-4444-444444444444' then 'TechCorp S.A. de C.V.'
    when '55555555-5555-5555-5555-555555555555' then 'CyberSec Corp S.A. de C.V.'
    else full_name
  end
  where id in (
    '11111111-1111-1111-1111-111111111111',
    '22222222-2222-2222-2222-222222222222',
    '33333333-3333-3333-3333-333333333333',
    '44444444-4444-4444-4444-444444444444',
    '55555555-5555-5555-5555-555555555555'
  );

end $$;

-- Comprobación rápida (opcional):
-- select rol, count(*) from public.profiles group by rol order by rol;
-- select titulo, cupo_disponible from public.vacantes order by creado_en desc;
