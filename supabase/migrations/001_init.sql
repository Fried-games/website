-- Run this in the Supabase SQL editor

create table if not exists waitlist (
  id         uuid        default gen_random_uuid() primary key,
  email      text        unique not null,
  name       text,
  created_at timestamptz default now()
);

create table if not exists contact_submissions (
  id         uuid        default gen_random_uuid() primary key,
  name       text        not null,
  email      text        not null,
  message    text        not null,
  type       text        not null check (type in ('contact', 'support')),
  created_at timestamptz default now()
);
