-- Metadatos mínimos para notificación y respuestas de evaluación; sin IP ni identificadores publicitarios.
alter table public.leads
  add column if not exists page_origin text,
  add column if not exists referrer text,
  add column if not exists device_type text,
  add column if not exists browser_language text,
  add column if not exists assessment_answers jsonb;