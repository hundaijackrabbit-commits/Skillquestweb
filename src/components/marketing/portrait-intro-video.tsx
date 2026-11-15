import { INTRO_VIDEO } from '@/lib/video-intro';

type PortraitIntroVideoProps = {
  /** Render immediately on the primary watch page; defer on the homepage. */
  priority?: boolean;
};

export function PortraitIntroVideo({ priority = false }: PortraitIntroVideoProps) {
  return (
    <figure className="w-full max-w-[340px] sm:max-w-[360px]">
      <div className="overflow-hidden rounded-[1.65rem] border border-white/15 bg-slate-950 shadow-[0_28px_80px_-32px_rgba(15,23,42,0.75)] ring-1 ring-white/10">
        <iframe
          title={INTRO_VIDEO.title}
          src={INTRO_VIDEO.embedUrl}
          width={360}
          height={640}
          loading={priority ? 'eager' : 'lazy'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="block aspect-[9/16] h-auto w-full border-0 bg-slate-950"
        />
      </div>
      <figcaption className="mt-3 text-center text-xs leading-5 text-slate-400">
        A 50-second introduction to skills, careers, and practical learning.
        {' '}
        <a
          href={INTRO_VIDEO.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-cyan-200 underline-offset-2 hover:underline focus-visible:underline"
        >
          Watch on YouTube
        </a>
      </figcaption>
    </figure>
  );
}
