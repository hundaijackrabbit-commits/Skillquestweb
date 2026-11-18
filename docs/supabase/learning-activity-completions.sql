-- Modern Skill Lab: optional cloud-synced learning activity completions.
-- Safe/idempotent migration. Does not touch existing learning profiles,
-- saved skills, knowledge highlights, or any browser storage.
-- Apply and verify in Supabase SQL Editor BEFORE enabling the site flag.

create table if not exists public.learning_activity_completions (
  user_id uuid not null references auth.users(id) on delete cascade,
  activity_id text not null check (char_length(activity_id) between 1 and 240),
  kind text not null check (
    kind in ('mission', 'course-lesson', 'knowledge-check',
             'sequence-practice', 'sort-practice', 'workshop')
  ),
  skill_slug text not null check (char_length(skill_slug) between 1 and 200),
  xp integer not null check (xp between 0 and 1000),
  completed_at timestamptz not null,
  saved_at timestamptz not null default now(),
  primary key (user_id, activity_id)
);

create index if not exists learning_activity_completions_by_user_date
  on public.learning_activity_completions (user_id, completed_at, activity_id);

alter table public.learning_activity_completions enable row level security;

-- Only authenticated owners can read or add their own records.
-- Updates/deletes are deliberately not permitted from the browser.
revoke all on public.learning_activity_completions from public, anon, authenticated;
grant select, insert on public.learning_activity_completions to authenticated;

do $policies$
begin
  if not exists (
    select 1 from pg_policies where schemaname = 'public'
      and tablename = 'learning_activity_completions'
      and policyname = 'learning_activities_select_own'
  ) then
    create policy learning_activities_select_own
      on public.learning_activity_completions
      for select to authenticated
      using (auth.uid() = user_id);
  end if;

  if not exists (
    select 1 from pg_policies where schemaname = 'public'
      and tablename = 'learning_activity_completions'
      and policyname = 'learning_activities_insert_own'
  ) then
    create policy learning_activities_insert_own
      on public.learning_activity_completions
      for insert to authenticated
      with check (auth.uid() = user_id);
  end if;
end
$policies$;

-- Verify before enabling NEXT_PUBLIC_LEARNING_PROGRESS_SYNC_ENABLED=true:
-- 1. Both policies should appear in Supabase Table Editor.
-- 2. Anonymous clients should not be able to read/insert completions.
-- 3. Two signed-in accounts cannot read or write each other's rows.
-- 4. Existing account progress still loads locally with the flag disabled.
