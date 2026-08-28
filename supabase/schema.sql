create extension if not exists pgcrypto;

create table if not exists events (
  id text primary key,
  title text not null,
  category text not null,
  description text not null,
  venue text not null,
  event_date timestamptz not null,
  max_slots integer not null check (max_slots > 0),
  created_at timestamptz not null default now()
);

create table if not exists registrations (
  id uuid primary key default gen_random_uuid(),
  registration_id text unique not null,
  event_id text not null references events(id) on delete cascade,
  name text not null,
  email text not null,
  phone text not null,
  college text not null,
  created_at timestamptz not null default now(),
  unique(event_id, email)
);

alter table events disable row level security;
alter table registrations disable row level security;
grant usage on schema public to anon;
grant select on events to anon;
grant select, insert on registrations to anon;

insert into events (id, title, category, description, venue, event_date, max_slots) values
('code-sprint','Code Sprint','Coding','A fast-paced build challenge for practical problem solvers.','Innovation Lab','2026-09-15T10:30:00+05:30',100),
('pixel-punch','Pixel Punch','Design','Design a bold interface around a surprise prompt.','Design Studio','2026-09-15T14:00:00+05:30',80),
('bot-arena','Bot Arena','Technical','Race, repair and rethink your autonomous machine.','Central Ground','2026-09-15T16:30:00+05:30',60),
('neon-quiz','Neon Quiz','Quiz','Culture, science and tech in one electric quiz night.','Main Auditorium','2026-09-16T10:00:00+05:30',120),
('frame-by-frame','Frame By Frame','Photography','Capture the spirit of the fest through a single story.','Media Lab','2026-09-16T12:30:00+05:30',50),
('afterglow','Afterglow','Music','A live campus stage for the final night.','Amphitheatre','2026-09-16T19:00:00+05:30',300)
on conflict (id) do nothing;
