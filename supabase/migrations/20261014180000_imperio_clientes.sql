-- Barbería Imperio · cuentas de cliente, historial y perfiles del equipo.
-- PENDIENTE DE APLICAR: requiere un proyecto Supabase exclusivo de Imperio (no reutilizar otro proyecto).
-- Acceso:
--   · Cada cliente ve y edita solo su ficha, su perfil de estilo y sus visitas.
--   · El personal (app_metadata.role = 'staff', asignado desde el panel o con service_role) ve a todos los clientes
--     y puede registrar visitas. app_metadata no es editable por el usuario; user_metadata nunca se usa para permisos.
--   · Los perfiles de barberos publicados son públicos; el resto solo lo ve el personal.

create schema if not exists private;

create or replace function private.es_staff()
returns boolean
language sql
stable
set search_path = ''
as $$
  select coalesce((select auth.jwt()) -> 'app_metadata' ->> 'role', '') = 'staff';
$$;
revoke execute on function private.es_staff() from public, anon;
grant usage on schema private to authenticated;
grant execute on function private.es_staff() to authenticated;

-- Clientes: una fila por usuario de Auth
create table public.clientes (
  id uuid primary key references auth.users (id) on delete cascade,
  nombre text check (char_length(nombre) <= 40),
  consentimiento_at timestamptz not null,   -- aceptación del aviso de privacidad (Ley 19.628)
  created_at timestamptz not null default now()
);

-- Perfil de estilo: respuestas del asesor (claves y valores validados en el motor)
create table public.perfiles_estilo (
  cliente_id uuid primary key references public.clientes (id) on delete cascade,
  respuestas jsonb not null default '{}'::jsonb check (jsonb_typeof(respuestas) = 'object'),
  updated_at timestamptz not null default now()
);

-- Equipo
create table public.barberos (
  id bigint generated always as identity primary key,
  slug text not null unique check (slug ~ '^[a-z0-9-]{2,60}$'),
  nombre text not null check (char_length(nombre) between 2 and 60),
  rol text check (char_length(rol) <= 60),
  bio text check (char_length(bio) <= 400),
  especialidades text[] not null default '{}',
  desde smallint check (desde between 1990 and 2100),
  horario text check (char_length(horario) <= 120),
  foto_url text,
  instagram_url text check (instagram_url is null or instagram_url ~ '^https://(www\.)?instagram\.com/'),
  publicado boolean not null default false,
  created_at timestamptz not null default now()
);

-- Historial de visitas
create table public.visitas (
  id bigint generated always as identity primary key,
  cliente_id uuid not null references public.clientes (id) on delete cascade,
  fecha date not null check (fecha >= date '2015-01-01'),
  corte text not null check (corte ~ '^[a-z0-9-]{2,40}$'),         -- id del catálogo del motor o 'otro'
  barbero_id bigint references public.barberos (id) on delete set null,
  barbero_texto text check (char_length(barbero_texto) <= 40),
  satisfaccion smallint not null default 0 check (satisfaccion between 0 and 5),
  nota text check (char_length(nota) <= 200),
  created_at timestamptz not null default now()
);
create index visitas_cliente_fecha_idx on public.visitas (cliente_id, fecha desc);
create index visitas_barbero_idx on public.visitas (barbero_id);

alter table public.clientes enable row level security;
alter table public.perfiles_estilo enable row level security;
alter table public.barberos enable row level security;
alter table public.visitas enable row level security;

-- Privilegios de tabla (RLS decide las filas)
grant select, insert, update, delete on public.clientes, public.perfiles_estilo, public.visitas to authenticated;
grant select on public.barberos to anon, authenticated;
grant insert, update, delete on public.barberos to authenticated;

-- clientes
create policy clientes_select on public.clientes for select to authenticated
  using ((select auth.uid()) = id or (select private.es_staff()));
create policy clientes_insert on public.clientes for insert to authenticated
  with check ((select auth.uid()) = id);
create policy clientes_update on public.clientes for update to authenticated
  using ((select auth.uid()) = id) with check ((select auth.uid()) = id);
create policy clientes_delete on public.clientes for delete to authenticated
  using ((select auth.uid()) = id);

-- perfiles_estilo
create policy perfiles_select on public.perfiles_estilo for select to authenticated
  using ((select auth.uid()) = cliente_id or (select private.es_staff()));
create policy perfiles_insert on public.perfiles_estilo for insert to authenticated
  with check ((select auth.uid()) = cliente_id);
create policy perfiles_update on public.perfiles_estilo for update to authenticated
  using ((select auth.uid()) = cliente_id) with check ((select auth.uid()) = cliente_id);
create policy perfiles_delete on public.perfiles_estilo for delete to authenticated
  using ((select auth.uid()) = cliente_id);

-- visitas: el cliente gestiona las suyas; el personal puede verlas y registrarlas
create policy visitas_select on public.visitas for select to authenticated
  using ((select auth.uid()) = cliente_id or (select private.es_staff()));
create policy visitas_insert on public.visitas for insert to authenticated
  with check ((select auth.uid()) = cliente_id or (select private.es_staff()));
create policy visitas_update on public.visitas for update to authenticated
  using ((select auth.uid()) = cliente_id) with check ((select auth.uid()) = cliente_id);
create policy visitas_delete on public.visitas for delete to authenticated
  using ((select auth.uid()) = cliente_id);

-- barberos
create policy barberos_select_anon on public.barberos for select to anon
  using (publicado);
create policy barberos_select_auth on public.barberos for select to authenticated
  using (publicado or (select private.es_staff()));
create policy barberos_insert_staff on public.barberos for insert to authenticated
  with check ((select private.es_staff()));
create policy barberos_update_staff on public.barberos for update to authenticated
  using ((select private.es_staff())) with check ((select private.es_staff()));
create policy barberos_delete_staff on public.barberos for delete to authenticated
  using ((select private.es_staff()));

-- updated_at del perfil
create or replace function private.tocar_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;
create trigger perfiles_updated_at before update on public.perfiles_estilo
  for each row execute function private.tocar_updated_at();
