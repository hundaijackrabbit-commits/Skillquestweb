import Link from 'next/link';
import { ArrowRight, CheckCircle2, MessageSquareText } from 'lucide-react';

/** Flagship content bridge. Existing research, lessons, vault, progress and skill sections remain below. */
export function CommunicationFieldGuide() {
  return (
    <section className="mb-12 overflow-hidden rounded-3xl border border-indigo-200 bg-white shadow-sm" aria-labelledby="communication-field-guide-title">
      <div className="border-b border-indigo-100 bg-gradient-to-r from-indigo-50 via-white to-cyan-50 p-6 sm:p-8">
        <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-indigo-800">
          <MessageSquareText aria-hidden="true" className="h-4 w-4" /> A practical place to start
        </p>
        <h2 id="communication-field-guide-title" className="mt-3 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
          Communication skills at work: make the next action clear
        </h2>
        <p className="mt-3 max-w-3xl leading-7 text-slate-700">
          Effective workplace communication is not just speaking confidently or writing polished emails.
          It means understanding your audience, explaining what matters, and checking whether people
          know what to do next. Here is a short framework you can practise today.
        </p>
      </div>
      <div className="grid gap-4 p-6 sm:p-8 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 p-5">
          <span className="text-sm font-bold text-indigo-700">01 · Understand</span>
          <h3 className="mt-2 text-lg font-bold text-slate-950">Start with the audience</h3>
          <p className="mt-2 text-sm leading-6 text-slate-700">Who is receiving this message? What do they already know? What question or decision are they facing?</p>
        </div>
        <div className="rounded-2xl border border-slate-200 p-5">
          <span className="text-sm font-bold text-indigo-700">02 · Explain</span>
          <h3 className="mt-2 text-lg font-bold text-slate-950">Lead with the point</h3>
          <p className="mt-2 text-sm leading-6 text-slate-700">Put the main idea first. Add the evidence or context the reader needs, and separate facts from assumptions.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 p-5">
          <span className="text-sm font-bold text-indigo-700">03 · Confirm</span>
          <h3 className="mt-2 text-lg font-bold text-slate-950">Close the loop</h3>
          <p className="mt-2 text-sm leading-6 text-slate-700">Identify the next action, owner, and timing where appropriate. Make room for questions or correction.</p>
        </div>
      </div>
      <div className="grid gap-5 border-t border-slate-100 p-6 sm:p-8 lg:grid-cols-2">
        <div>
          <h3 className="text-lg font-bold text-slate-950">Example: the unclear project update</h3>
          <div className="mt-4 rounded-xl bg-amber-50 p-4">
            <span className="text-xs font-bold uppercase tracking-wide text-amber-900">Before</span>
            <p className="mt-2 text-sm leading-6 text-slate-800">“The report still needs work. We should look at it soon.”</p>
          </div>
          <div className="mt-3 rounded-xl bg-emerald-50 p-4">
            <span className="text-xs font-bold uppercase tracking-wide text-emerald-900">After</span>
            <p className="mt-2 text-sm leading-6 text-slate-800">“Two figures in the report need verification. Sam will check them by Thursday at 3 p.m., then send the revised draft for review.”</p>
          </div>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            The second version makes the issue, owner, timing, and next step visible. In a sensitive or uncertain situation, a clarifying conversation may still be better than a short message.
          </p>
        </div>
        <div className="rounded-2xl bg-slate-950 p-6 text-white">
          <h3 className="flex items-center gap-2 text-lg font-bold">
            <CheckCircle2 aria-hidden="true" className="h-5 w-5 text-cyan-300" /> Five-minute communication exercise
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-200">
            Choose an email or update you were about to send. Rewrite it in four lines:
            the main point, what changed, what you need, and the next step.
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-200">
            Ask another person to identify the intended action, owner, and deadline without extra explanation.
            If they cannot, revise the message and try again.
          </p>
          <Link href="/skills/communication/lessons/exercises" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200">
            Explore communication exercises <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-slate-200 px-6 py-5 text-sm font-semibold sm:px-8">
        <span className="text-slate-700">Explore related skills:</span>
        <Link className="text-indigo-700 underline-offset-4 hover:underline" href="/skills/active-listening">Active listening</Link>
        <Link className="text-indigo-700 underline-offset-4 hover:underline" href="/skills/written-communication">Written communication</Link>
        <Link className="text-indigo-700 underline-offset-4 hover:underline" href="/skills/public-speaking">Public speaking</Link>
      </div>
    </section>
  );
}
