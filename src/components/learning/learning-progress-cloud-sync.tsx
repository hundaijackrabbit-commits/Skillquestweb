'use client';

/**
 * Optional, additive sync for signed-in practice progress.
 *
 * Safe rollout:
 * 1. Apply docs/supabase/learning-activity-completions.sql and verify its RLS policies.
 * 2. Enable NEXT_PUBLIC_LEARNING_PROGRESS_SYNC_ENABLED=true on Vercel.
 *
 * Without the flag or database table, the existing on-device learning flow is unchanged.
 * Browser activity records are never removed after upload or on network failure.
 */
import { useEffect, useMemo } from 'react';
import { useSupabase } from '@/components/providers/supabase-provider';
import { createClient } from '@/lib/supabase/client';
import {
  getLearningProfile,
  LEARNING_PROGRESS_EVENT,
  mergeLearningActivitiesFromCloud,
  type LearningActivity,
  type LearningActivityKind,
} from '@/lib/learning-progress';

const PAGE_SIZE = 500;
const MAX_PAGES = 40;
const UPLOAD_SIZE = 100;
const SYNC_ENABLED = process.env.NEXT_PUBLIC_LEARNING_PROGRESS_SYNC_ENABLED === 'true';
const ALLOWED_ACTIVITY_KINDS = new Set<LearningActivityKind>([
  'mission', 'course-lesson', 'knowledge-check', 'sequence-practice', 'sort-practice', 'workshop',
]);

type CompletionRow = {
  activity_id: string;
  kind: LearningActivityKind;
  skill_slug: string;
  xp: number;
  completed_at: string;
};

function toActivity(row: CompletionRow): LearningActivity {
  return {
    id: row.activity_id,
    kind: row.kind,
    skillSlug: row.skill_slug,
    xp: row.xp,
    completedAt: row.completed_at,
  };
}

export function LearningProgressCloudSync() {
  const { user } = useSupabase();
  const userId = user?.id;
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    if (!SYNC_ENABLED || !userId) return;

    let cancelled = false;
    let syncing = false;
    let rerun = false;
    let schemaUnavailable = false;

    const fetchCloud = async (): Promise<CompletionRow[] | null> => {
      const rows: CompletionRow[] = [];

      for (let page = 0; page < MAX_PAGES; page += 1) {
        const { data, error } = await supabase
          .from('learning_activity_completions')
          .select('activity_id, kind, skill_slug, xp, completed_at')
          .eq('user_id', userId)
          .order('completed_at', { ascending: true })
          .order('activity_id', { ascending: true })
          .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

        if (error) {
          // A missing table must never interrupt learning or delete local progress.
          if (error.code === 'PGRST205' || error.code === '42P01') schemaUnavailable = true;
          console.warn('Learning sync unavailable; progress remains saved on this device.', error.code);
          return null;
        }
        if (cancelled) return null;

        const batch = (data ?? []) as CompletionRow[];
        rows.push(...batch);
        if (batch.length < PAGE_SIZE) return rows;
      }

      // Never merge from a truncated cloud response or assume it is complete.
      console.warn('Learning sync paused: cloud progress exceeds the current page limit.');
      return null;
    };

    const syncOnce = async () => {
      const cloud = await fetchCloud();
      if (cloud === null || cancelled) return;

      mergeLearningActivitiesFromCloud(userId, cloud.map(toActivity));
      const local = getLearningProfile(userId);
      const existingIds = new Set(cloud.map((activity) => activity.activity_id));
      const pending = local.activities.filter((activity) =>
        !existingIds.has(activity.id) &&
        activity.id.trim() !== '' && activity.id.length <= 240 &&
        activity.skillSlug.trim() !== '' && activity.skillSlug.length <= 200 &&
        ALLOWED_ACTIVITY_KINDS.has(activity.kind) &&
        Number.isInteger(activity.xp) && activity.xp >= 0 && activity.xp <= 1000 &&
        Number.isFinite(Date.parse(activity.completedAt)),
      );

      for (let index = 0; index < pending.length; index += UPLOAD_SIZE) {
        if (cancelled) return;
        const batch = pending.slice(index, index + UPLOAD_SIZE).map((activity) => ({
          user_id: userId,
          activity_id: activity.id,
          kind: activity.kind,
          skill_slug: activity.skillSlug,
          xp: activity.xp,
          completed_at: activity.completedAt,
        }));
        const { error } = await supabase
          .from('learning_activity_completions')
          .upsert(batch, { onConflict: 'user_id,activity_id', ignoreDuplicates: true });
        if (error) {
          console.warn('Learning sync upload failed; the original on-device record is preserved.', error.code);
          return;
        }
      }

      // Re-read after upload to incorporate concurrent additions from another device.
      if (!cancelled && pending.length) {
        const refreshed = await fetchCloud();
        if (refreshed !== null && !cancelled) {
          mergeLearningActivitiesFromCloud(userId, refreshed.map(toActivity));
        }
      }
    };

    const requestSync = () => {
      if (cancelled || schemaUnavailable) return;
      if (syncing) {
        rerun = true;
        return;
      }
      syncing = true;
      void (async () => {
        try {
          await syncOnce();
        } catch (error) {
          // A sync failure may be retried, but must never block local completion.
          console.warn('Learning sync could not finish; on-device progress is intact.', error);
        } finally {
          syncing = false;
          if (rerun && !cancelled && !schemaUnavailable) {
            rerun = false;
            requestSync();
          }
        }
      })();
    };

    const onProgress = (event: Event) => {
      const detail = (event as CustomEvent<{ userId?: string; source?: string }>).detail;
      if (detail?.source === 'cloud-merge' || (detail?.userId && detail.userId !== userId)) return;
      requestSync();
    };
    const onVisibility = () => {
      if (document.visibilityState === 'visible') requestSync();
    };

    const onStorage = (event: StorageEvent) => {
      if (event.key === `msl_learning_profile_v1:${userId}`) requestSync();
    };

    window.addEventListener(LEARNING_PROGRESS_EVENT, onProgress);
    window.addEventListener('online', requestSync);
    window.addEventListener('focus', requestSync);
    window.addEventListener('storage', onStorage);
    document.addEventListener('visibilitychange', onVisibility);
    requestSync();

    return () => {
      cancelled = true;
      window.removeEventListener(LEARNING_PROGRESS_EVENT, onProgress);
      window.removeEventListener('online', requestSync);
      window.removeEventListener('focus', requestSync);
      window.removeEventListener('storage', onStorage);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [supabase, userId]);

  return null;
}
