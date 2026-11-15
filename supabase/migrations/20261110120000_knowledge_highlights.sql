create table if not exists public.knowledge_highlights (
  user_id uuid not null references auth.users(id) on delete cascade,
  kind text not null check (kind in ('skill','career')),
  item_slug text not null,
  insight_id text not null,
  title text not null,
  body text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, kind, item_slug, insight_id)
);
create index if not exists knowledge_highlights_user_recent on public.knowledge_highlights(user_id, created_at desc);
alter table public.knowledge_highlights enable row level security;
revoke all on public.knowledge_highlights from anon, authenticated;
grant select, insert, delete on public.knowledge_highlights to authenticated;
create policy "Members read own highlights" on public.knowledge_highlights for select to authenticated using ((select auth.uid()) = user_id);
create policy "Members collect own highlights" on public.knowledge_highlights for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Members remove own highlights" on public.knowledge_highlights for delete to authenticated using ((select auth.uid()) = user_id);
