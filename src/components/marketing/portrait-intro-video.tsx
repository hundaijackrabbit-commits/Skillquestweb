import { INTRO_VIDEO } from '@/lib/video-intro';

export function PortraitIntroVideo() {
  return (
    <figure className="w-full max-w-[310px] sm:max-w-[360px]">
      <div className="overflow-hidden rounded-[1.65rem] border border-white/15 bg-slate-950 shadow-[0_28px_80px_-32px_rgba(15,23,42,0.75)] ring-1 ring-white/10">
        <video
          aria-label="Modern Skill Lab introduction video"
          className="block aspect-[512/910] h-auto w-full bg-slate-950 object-contain"
          controls
          playsInline
          preload="none"
          poster={INTRO_VIDEO.posterPath}
          src={INTRO_VIDEO.videoPath}
          width={512}
          height={910}
        >
          <p>Your browser cannot play this video. <a href={INTRO_VIDEO.videoPath}>Open the MP4 video directly</a>.</p>
        </video>
      </div>
      <figcaption className="mt-3 text-center text-xs leading-5 text-slate-400">
        A 50-second introduction to skills, careers, and practical learning.
      </figcaption>
    </figure>
  );
}
