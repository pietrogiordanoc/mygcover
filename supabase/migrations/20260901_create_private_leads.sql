create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  country text not null,
  state text,
  insurance_interest text not null,
  preferred_contact_method text not null,
  message text not null default '',
  status text not null default 'new',
  source text not null default 'sitio-web',
  consent_to_contact boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.leads
  add column if not exists full_name text,
  add column if not exists insurance_interest text,
  add column if not exists preferred_contact_method text,
  add column if not exists consent_to_contact boolean,
  add column if not exists source text,
  add column if not exists created_at timestamptz,
  add column if not exists status text;

update public.leads
set
  full_name = coalesce(nullif(full_name, ''), 'Sin nombre'),
  email = coalesce(nullif(email, ''), 'sin-correo@no-definido.local'),
  phone = coalesce(nullif(phone, ''), '0000000'),
  country = coalesce(nullif(country, ''), 'No definido'),
  insurance_interest = coalesce(nullif(insurance_interest, ''), 'No estoy seguro'),
  preferred_contact_method = coalesce(nullif(preferred_contact_method, ''), 'WhatsApp'),
  message = coalesce(message, ''),
  source = coalesce(nullif(source, ''), 'sitio-web'),
  consent_to_contact = coalesce(consent_to_contact, false),
  status = coalesce(nullif(status, ''), 'new'),
  created_at = coalesce(created_at, now())
where
  full_name is null
  or insurance_interest is null
  or preferred_contact_method is null
  or source is null
  or consent_to_contact is null
  or status is null
  or created_at is null;

alter table public.leads alter column full_name set not null;
alter table public.leads alter column email set not null;
alter table public.leads alter column phone set not null;
alter table public.leads alter column country set not null;
alter table public.leads alter column insurance_interest set not null;
alter table public.leads alter column preferred_contact_method set not null;
alter table public.leads alter column message set default '';
alter table public.leads alter column message set not null;
alter table public.leads alter column source set default 'sitio-web';
alter table public.leads alter column source set not null;
alter table public.leads alter column consent_to_contact set default false;
alter table public.leads alter column consent_to_contact set not null;
alter table public.leads alter column status set default 'new';
alter table public.leads alter column status set not null;
alter table public.leads alter column created_at set default now();
alter table public.leads alter column created_at set not null;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'leads_status_check') then
    alter table public.leads
      add constraint leads_status_check check (status in ('new', 'contacted', 'closed'));
  end if;
end $$;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'leads_insurance_interest_check') then
    alter table public.leads
      add constraint leads_insurance_interest_check check (
        insurance_interest in ('Seguro de vida', 'IUL', 'Salud', 'Viaje', 'No estoy seguro')
      );
  end if;
end $$;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'leads_contact_method_check') then
    alter table public.leads
      add constraint leads_contact_method_check check (
        preferred_contact_method in ('Telefono', 'WhatsApp', 'Email')
      );
  end if;
end $$;

alter table public.leads enable row level security;

revoke all on table public.leads from anon;
revoke all on table public.leads from authenticated;

grant insert (
  full_name,
  email,
  phone,
  country,
  state,
  insurance_interest,
  preferred_contact_method,
  message,
  source,
  consent_to_contact
) on table public.leads to anon;

drop policy if exists "Allow public insert on leads" on public.leads;
drop policy if exists "Deny all reads on leads" on public.leads;
drop policy if exists "Deny all updates on leads" on public.leads;
drop policy if exists "Deny all deletes on leads" on public.leads;
drop policy if exists leads_anon_insert on public.leads;

create policy leads_anon_insert
on public.leads
for insert
to anon
with check (
  consent_to_contact is true
  and status = 'new'
  and char_length(full_name) between 2 and 120
  and char_length(email) between 5 and 160
  and char_length(phone) between 7 and 32
  and char_length(country) between 2 and 80
  and char_length(coalesce(state, '')) <= 80
  and char_length(coalesce(message, '')) <= 1000
  and char_length(source) between 1 and 80
  and insurance_interest in ('Seguro de vida', 'IUL', 'Salud', 'Viaje', 'No estoy seguro')
  and preferred_contact_method in ('Telefono', 'WhatsApp', 'Email')
);
