# Learning progress — safe cloud sync rollout (2026-11-18)

## Goal and current state
Practice XP, streaks, achievements and activity completions are currently stored in the browser by Supabase user ID, under `msl_learning_profile_v1:<user-id>`. Saved skills and Knowledge Vault are separate and **must not be modified** by this rollout.

This change ships a guarded, **disabled-by-default** synchronization layer. It retains the original client-side recording path, copies existing completions to an account-owned database table when explicitly enabled, and only merges additional activity IDs found in the cloud. It never deletes local records, overwrites an existing local activity ID, or clears browser storage after upload.

## Preparation — required before enabling

1. **Back up Supabase** and verify the current production database state. Leave all existing tables and policies unchanged.
2. Apply `docs/supabase/learning-activity-completions.sql` via the Supabase SQL Editor for the production project. This creates **one new table** `public.learning_activity_completions`, one index, and two owner-only RLS policies.
3. In Supabase Table Editor or SQL, confirm the table exists and both policies are enabled. Test with two different, non-admin Supabase accounts: each must be able to insert/read its **own** row and must be unable to read or write another account's rows. Confirm anonymous access is denied.
4. In Vercel **Preview only**, set `NEXT_PUBLIC_LEARNING_PROGRESS_SYNC_ENABLED=true`, and build one preview. This client-exposed flag enables the sync code; no secret token is needed.
5. With a test account that already has browser-based completions, verify: same-device XP and achievements are unchanged; after syncing, each completion exists once in the new table; another device using the same account receives the activities; new completions made on both devices merge without double XP.
6. Test with browser storage disabled, an offline device, a stale session, two open tabs, Arabic/French selected, and an intentionally failed API connection. On any failure, the original local activities must remain readable. Check for duplicate ID rows, unexpected rewrites and errors.
7. After QA, set the same flag in **production** and deploy **once**. Update the public Privacy page and the progress UI from "this browser only" to the verified cloud-sync behavior **in the activation release**, not before.

## Rollback and data protection

- Set `NEXT_PUBLIC_LEARNING_PROGRESS_SYNC_ENABLED=false` and redeploy if any anomaly occurs. Local practice works exactly as before.
- Do **not** drop the new table during a rollback; it contains already-synced user history. Do **not** clear any member's browser storage.
- Repeat migration verification before re-enabling. Synced rows are additive, keyed by `(user_id, activity_id)`, and server-side RLS prohibits cross-account access.
- An owner can review table data in Supabase after users have explicitly tested the flow. Never transfer rows between accounts.
- XP remains an informal private practice signal, not a verified credential. Browser-sourced submissions are not evidence of real-world proficiency.

## Technical notes

- A cloud merge may reorder the local activity list chronologically; it does not remove any activity IDs.
- Streaks are recalculated from completion timestamps for newly merged history using the viewer's local timezone. They are not intended as audited daily-attendance records.
- Sync retries when a member signs in, completes a new practice, returns to the tab, or comes back online. It does not use a background polling timer.
- Missing migration means the client receives a database error only **if the flag has been enabled prematurely**; it falls back to local-only without destructive updates.
- For unusually large histories (over 20,000 completions), automated sync pauses instead of using a truncated cloud list. Consider paginated reconciliation before raising this limit.
- Future improvement: a server-validated activity catalog, stronger anti-abuse rules and an explicit in-dashboard sync-status indicator after rollout testing.
