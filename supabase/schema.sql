-- MyGcover schema basic setup
-- Crear la tabla principal de leads.
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  country TEXT,
  state TEXT,
  age_range TEXT,
  immigration_status TEXT,
  primary_goal TEXT,
  interested_benefits TEXT,
  dependents TEXT,
  monthly_budget TEXT,
  general_health TEXT,
  preferred_contact_method TEXT,
  preferred_contact_time TEXT,
  message TEXT,
  source TEXT,
  lead_type TEXT,
  lead_magnet TEXT,
  assessment_result JSONB,
  assessment_answers JSONB,
  simulator_answers JSONB,
  landing_page TEXT,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  utm_term TEXT,
  consent BOOLEAN DEFAULT FALSE,
  consent_text_version TEXT,
  consent_timestamp TIMESTAMPTZ,
  status TEXT DEFAULT 'new',
  assigned_to TEXT,
  notes TEXT
);

-- Tabla para eventos del lead.
CREATE TABLE IF NOT EXISTS public.lead_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS leads_email_idx ON public.leads (email);
CREATE INDEX IF NOT EXISTS leads_status_idx ON public.leads (status);
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS lead_events_lead_id_idx ON public.lead_events (lead_id);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_events ENABLE ROW LEVEL SECURITY;

-- Políticas básicas: visitantes pueden insertar leads, pero no leer ni modificar.
CREATE POLICY "Allow public insert on leads"
ON public.leads
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Deny all reads on leads"
ON public.leads
FOR SELECT
USING (false);

CREATE POLICY "Deny all updates on leads"
ON public.leads
FOR UPDATE
USING (false);

CREATE POLICY "Deny all deletes on leads"
ON public.leads
FOR DELETE
USING (false);

CREATE POLICY "Allow public insert on lead_events"
ON public.lead_events
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Deny all reads on lead_events"
ON public.lead_events
FOR SELECT
USING (false);

CREATE POLICY "Deny all updates on lead_events"
ON public.lead_events
FOR UPDATE
USING (false);

CREATE POLICY "Deny all deletes on lead_events"
ON public.lead_events
FOR DELETE
USING (false);

COMMENT ON TABLE public.leads IS 'Leads capturados desde la evaluación, contacto, simulador, guías y formularios principales.';
COMMENT ON TABLE public.lead_events IS 'Eventos de interacción y conversión para cada lead.';
