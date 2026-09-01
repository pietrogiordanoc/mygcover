-- El visitante ya no inserta directamente: toda escritura pasa por /api/leads con la clave secreta del servidor.
-- RLS permanece activo; el rol service_role la ignora por diseño de Supabase, así que no necesita policy propia.

drop policy if exists leads_anon_insert on public.leads;

revoke insert on public.leads from anon;
revoke all on public.leads from authenticated;

-- Sin policies de select/insert/update/delete para anon/authenticated: toda operación directa queda denegada.
