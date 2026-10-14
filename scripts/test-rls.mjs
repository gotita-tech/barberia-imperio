// Prueba las reglas RLS de la migración en un Postgres en memoria (PGlite), sin tocar Supabase.
// Uso: npm i @electric-sql/pglite && node scripts/test-rls.mjs  → todo lo marcado "(MAL)" es una falla.
import { PGlite } from '@electric-sql/pglite';
import fs from 'fs';
const db = new PGlite();
const q = async (sql, p) => (await db.query(sql, p)).rows;
await db.exec(`
create role anon nologin; create role authenticated nologin; create role service_role nologin bypassrls;
create schema auth; create table auth.users (id uuid primary key);
create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub', true),'')::uuid $$;
create function auth.jwt() returns jsonb language sql stable as $$ select coalesce(nullif(current_setting('request.jwt.claims', true),''),'{}')::jsonb $$;
grant usage on schema auth to anon, authenticated; grant usage on schema public to anon, authenticated;
`);
await db.exec(fs.readFileSync(new URL('../supabase/migrations/20261014180000_imperio_clientes.sql', import.meta.url),'utf8'));
const A='00000000-0000-0000-0000-00000000000a', B='00000000-0000-0000-0000-00000000000b', ST='00000000-0000-0000-0000-0000000000ff';
await db.exec(`insert into auth.users values ('${A}'),('${B}'),('${ST}');`);
const as = async (uid, staff, fn) => { await db.exec(`set role authenticated; select set_config('request.jwt.claim.sub','${uid}',false); select set_config('request.jwt.claims','${JSON.stringify({sub:uid,app_metadata: staff?{role:'staff'}:{}})}',false);`); try { return await fn(); } finally { await db.exec('reset role'); } };
const res = {};
await as(A,false,()=>q(`insert into clientes(id,nombre,consentimiento_at) values ($1,'Ana',now())`,[A]));
await as(B,false,()=>q(`insert into clientes(id,nombre,consentimiento_at) values ($1,'Beto',now())`,[B]));
await as(A,false,()=>q(`insert into visitas(cliente_id,fecha,corte,satisfaccion) values ($1,'2026-10-01','buzz-cut',4)`,[A]));
await as(A,false,()=>q(`insert into perfiles_estilo(cliente_id,respuestas) values ($1,'{"tipo":"liso"}')`,[A]));
res.B_ve_clientes = await as(B,false,()=>q('select nombre from clientes'));
res.B_ve_visitas = await as(B,false,()=>q('select count(*) from visitas'));
try { await as(B,false,()=>q(`insert into visitas(cliente_id,fecha,corte) values ($1,'2026-10-01','buzz-cut')`,[A])); res.B_inserta_en_A='PERMITIDO (MAL)'; } catch(e){ res.B_inserta_en_A='bloqueado'; }
res.B_update_A = await as(B,false,()=>q(`update perfiles_estilo set respuestas='{}' where cliente_id=$1 returning 1`,[A]));
try { await as(A,false,()=>q(`update visitas set cliente_id=$1 returning 1`,[B])); res.A_reasigna='PERMITIDO (MAL)'; } catch(e){ res.A_reasigna='bloqueado'; }
res.staff_ve = await as(ST,true,()=>q('select count(*)::int n from clientes'));
res.staff_registra = await as(ST,true,()=>q(`insert into visitas(cliente_id,fecha,corte) values ($1,'2026-10-02','taper-clasico') returning id`,[B]));
await as(ST,true,()=>q(`insert into barberos(slug,nombre,publicado) values ('demo-uno','Demo Uno',false),('demo-dos','Demo Dos',true)`));
try { await as(A,false,()=>q(`insert into barberos(slug,nombre) values ('x-x','Hack')`)); res.cliente_crea_barbero='PERMITIDO (MAL)'; } catch(e){ res.cliente_crea_barbero='bloqueado'; }
await db.exec(`set role anon`); res.anon_barberos = await q('select slug from barberos'); try { await q('select * from clientes'); res.anon_clientes='PERMITIDO (MAL)'; } catch(e){ res.anon_clientes='bloqueado'; } await db.exec('reset role');
// user_metadata no debe dar staff
await db.exec(`set role authenticated; select set_config('request.jwt.claim.sub','${B}',false); select set_config('request.jwt.claims','${JSON.stringify({sub:B,user_metadata:{role:'staff'}})}',false);`);
res.user_metadata_staff = await q('select count(*)::int n from clientes'); await db.exec('reset role');
console.log(JSON.stringify(res,null,1));
