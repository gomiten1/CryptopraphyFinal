-- 001_init.sql
-- Inicializa esquemas y políticas RLS para ServicioSeguro

-- Extensiones necesarias
create extension if not exists pgcrypto;

-- Tabla de perfiles vinculada a auth.users
create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  full_name text,
  rol text not null check (rol in ('alumno','empresa','admin')),
  metadata jsonb,
  created_at timestamptz default now()
);

-- Trigger function para crear profile automáticamente al registrarse en auth.users
create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  user_rol text;
begin
  -- Evitar duplicados
  if not exists (select 1 from public.profiles where id = new.id) then
    -- Intentar leer el rol de metadata; si no existe, asignar 'alumno'
    user_rol := coalesce(new.raw_user_meta_data->>'rol', 'alumno');
    insert into public.profiles (id, full_name, rol, created_at)
    values (new.id, new.raw_user_meta_data->>'full_name', user_rol, now());
  end if;
  return new;
end;
$$;

-- Crear trigger sobre auth.users (Supabase usa este schema)
drop trigger if exists new_user_profile on auth.users;
create trigger new_user_profile
after insert on auth.users
for each row
execute procedure public.handle_new_auth_user();

-- Tabla de vacantes
create table if not exists public.vacantes (
  id uuid primary key default gen_random_uuid(),
  empresa_id uuid references public.profiles(id) on delete set null,
  titulo text not null,
  descripcion text,
  cupo_total int default 1,
  cupo_disponible int default 1,
  activo boolean default true,
  creado_en timestamptz default now()
);

create index if not exists idx_vacantes_cupo_disponible on public.vacantes(cupo_disponible);

-- Tabla de contratos / eventos
create table if not exists public.contratos_eventos (
  id uuid primary key default gen_random_uuid(),
  alumno_id uuid references public.profiles(id) on delete set null,
  empresa_id uuid references public.profiles(id) on delete set null,
  json_datos jsonb,
  hash_sha256 text,
  firma_digital text,
  creado_en timestamptz default now()
);

-- Activar RLS y políticas
alter table public.profiles enable row level security;
alter table public.vacantes enable row level security;
alter table public.contratos_eventos enable row level security;

-- POLÍTICAS: profiles
-- Lectura: el usuario puede leer su propio perfil
drop policy if exists profiles_self_read on public.profiles;
create policy profiles_self_read on public.profiles
  for select using ( auth.uid() = id );

-- Escritura: los usuarios pueden actualizar su propio perfil
drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own on public.profiles
  for update using ( auth.uid() = id ) with check ( auth.uid() = id );

-- Inserción: sólo mediante trigger/autenticación (permitir insert cuando auth.uid() = id)
drop policy if exists profiles_insert_self on public.profiles;
create policy profiles_insert_self on public.profiles
  for insert with check ( auth.uid() = id );

-- POLÍTICAS: vacantes
-- Lectura: cualquiera autenticado puede leer vacantes activas (frontend aplicará cupo_disponible>0)
drop policy if exists vacantes_select_authenticated on public.vacantes;
create policy vacantes_select_authenticated on public.vacantes
  for select using ( auth.role() = 'authenticated' );

drop policy if exists vacantes_insert_by_empresa on public.vacantes;
create policy vacantes_insert_by_empresa on public.vacantes
  for insert with check (
    exists (
      select 1 from public.profiles p where p.id = auth.uid() and p.rol = 'empresa'
    )
  );

drop policy if exists vacantes_update_by_empresa on public.vacantes;
create policy vacantes_update_by_empresa on public.vacantes
  for update using (
    exists (
      select 1 from public.profiles p where p.id = auth.uid() and p.rol = 'empresa'
    )
  ) with check (
    exists (
      select 1 from public.profiles p where p.id = auth.uid() and p.rol = 'empresa'
    )
  );

drop policy if exists vacantes_delete_by_empresa on public.vacantes;
create policy vacantes_delete_by_empresa on public.vacantes
  for delete using (
    exists (
      select 1 from public.profiles p where p.id = auth.uid() and p.rol = 'empresa'
    )
  );

-- POLÍTICAS: contratos_eventos
-- Lectura: alumno propio, empresa propia o admin
drop policy if exists contratos_select_owners on public.contratos_eventos;
create policy contratos_select_owners on public.contratos_eventos
  for select using (
    (alumno_id = auth.uid()) or (empresa_id = auth.uid()) or (
      exists (select 1 from public.profiles p where p.id = auth.uid() and p.rol = 'admin')
    )
  );

-- Inserción: preferiblemente realizada por funciones con service role (service role bypasses RLS).
-- Si se permite inserción por empresas directamente:
drop policy if exists contratos_insert_by_empresa on public.contratos_eventos;
create policy contratos_insert_by_empresa on public.contratos_eventos
  for insert with check (
    empresa_id = auth.uid()
  );

-- Nota: las funciones Edge/Backend que usen la service role key no son afectadas por RLS y pueden insertar libremente.

-- Fin de la migración
