-- Fix "new row violates row-level security policy" for the current frontend.
-- Run this in Supabase SQL Editor if inserts fail with 403/RLS errors.
-- This is development-friendly because the current React frontend writes directly
-- to Supabase with the anon/authenticated client. For production, replace this
-- with stricter per-user RLS policies or move writes behind your backend.

do $$
declare
  table_record record;
begin
  for table_record in
    select schemaname, tablename
    from pg_tables
    where schemaname = 'public'
  loop
    execute format('alter table %I.%I disable row level security', table_record.schemaname, table_record.tablename);
    execute format('alter table %I.%I no force row level security', table_record.schemaname, table_record.tablename);
  end loop;
end $$;

grant usage on schema public to postgres, anon, authenticated, service_role;
grant all on schema public to postgres, service_role;
grant select, insert, update, delete on all tables in schema public to anon, authenticated;
grant usage, select on all sequences in schema public to anon, authenticated;

alter default privileges in schema public grant select, insert, update, delete on tables to anon, authenticated;
alter default privileges in schema public grant usage, select on sequences to anon, authenticated;

-- Ask PostgREST/Supabase API to refresh metadata immediately.
notify pgrst, 'reload schema';
