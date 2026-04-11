"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Star, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type SaveSkillButtonProps = {
  skillSlug: string;
  className?: string;
};

export default function SaveSkillButton({
  skillSlug,
  className = "",
}: SaveSkillButtonProps) {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let isMounted = true;

    async function loadSavedState() {
      setIsLoading(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (!isMounted) return;

      if (userError || !user) {
        setIsSaved(false);
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("saved_skills")
        .select("id")
        .eq("user_id", user.id)
        .eq("skill_slug", skillSlug)
        .maybeSingle();

      if (!isMounted) return;

      if (error) {
        console.error("Error checking saved skill:", error);
        setIsSaved(false);
      } else {
        setIsSaved(!!data);
      }

      setIsLoading(false);
    }

    loadSavedState();

    return () => {
      isMounted = false;
    };
  }, [skillSlug, supabase]);

  async function handleToggleSave() {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      router.push("/auth");
      return;
    }

    startTransition(async () => {
      if (isSaved) {
        const { error } = await supabase
          .from("saved_skills")
          .delete()
          .eq("user_id", user.id)
          .eq("skill_slug", skillSlug);

        if (error) {
          console.error("Error removing saved skill:", error);
          return;
        }

        setIsSaved(false);
      } else {
        const { error } = await supabase.from("saved_skills").insert({
          user_id: user.id,
          skill_slug: skillSlug,
        });

        if (error) {
          console.error("Error saving skill:", error);
          return;
        }

        setIsSaved(true);
      }

      router.refresh();
    });
  }

  const buttonLabel = isLoading
    ? "Loading..."
    : isSaved
      ? "Saved to Dashboard"
      : "Save Skill";

  const buttonClasses = isSaved
    ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
    : "bg-white text-gray-900 border-gray-300 hover:bg-gray-50";

  return (
    <button
      type="button"
      onClick={handleToggleSave}
      disabled={isLoading || isPending}
      aria-pressed={isSaved}
      className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${buttonClasses} ${className}`}
    >
      {isLoading || isPending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          {isPending ? "Saving..." : "Loading..."}
        </>
      ) : (
        <>
          <Star className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
          {buttonLabel}
        </>
      )}
    </button>
  );
}