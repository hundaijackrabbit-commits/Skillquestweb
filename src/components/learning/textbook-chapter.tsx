import type { TextbookChapter as Chapter } from '@/lib/textbook-chapters';

export function TextbookChapter({ chapter }: { chapter: Chapter }) {
  return (
    <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8" aria-labelledby="textbook-chapter-heading">
      <p className="text-xs font-bold uppercase tracking-widest text-indigo-700">Textbook companion</p>
      <h2 id="textbook-chapter-heading" className="mt-2 scroll-mt-32 text-2xl font-bold text-slate-950">Understand, apply and review</h2>
      <div className="mt-6 rounded-xl border border-indigo-100 bg-indigo-50 p-4 sm:p-5">
        <h3 className="font-bold text-indigo-950">Learning objectives</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 leading-7 text-slate-800">
          {chapter.objectives.map((objective) => <li key={objective}>{objective}</li>)}
        </ul>
      </div>
      <div className="mt-7">
        <h3 className="text-lg font-bold text-slate-950">The underlying principles</h3>
        <p className="mt-3 max-w-prose leading-8 text-slate-700">{chapter.theory}</p>
      </div>
      <figure className="mt-7">
        <figcaption className="text-lg font-bold text-slate-950">A practical framework</figcaption>
        <ol className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {chapter.steps.map(([title, explanation], index) => (
            <li key={title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-700 text-sm font-bold text-white">{index + 1}</span>
              <h4 className="mt-3 font-bold text-slate-950">{title}</h4>
              <p className="mt-2 text-sm leading-6 text-slate-700">{explanation}</p>
            </li>
          ))}
        </ol>
      </figure>
      <div className="mt-7 rounded-xl border border-sky-200 bg-sky-50 p-4 sm:p-5">
        <h3 className="text-lg font-bold text-sky-950">Worked example</h3>
        <p className="mt-2 font-medium leading-7 text-slate-800">{chapter.example.scenario}</p>
        <ol className="mt-3 list-decimal space-y-2 pl-5 leading-7 text-slate-700">
          {chapter.example.work.map((step) => <li key={step}>{step}</li>)}
        </ol>
        <p className="mt-4 border-t border-sky-200 pt-3 leading-7 text-slate-800"><strong>Result:</strong> {chapter.example.result}</p>
      </div>
      <div className="mt-7 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 sm:p-5">
          <h3 className="font-bold text-emerald-950">Try it yourself</h3>
          <p className="mt-2 leading-7 text-slate-700">{chapter.exercise}</p>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 sm:p-5">
          <h3 className="font-bold text-amber-950">Check your understanding</h3>
          <p className="mt-2 leading-7 text-slate-800">{chapter.check.question}</p>
          <details className="mt-3">
            <summary className="min-h-11 cursor-pointer rounded-lg py-2 font-semibold text-amber-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-800">Reveal explanation</summary>
            <p className="mt-2 leading-7 text-slate-700">{chapter.check.answer}</p>
          </details>
        </div>
      </div>
      <div className="mt-7 border-t border-slate-200 pt-5">
        <h3 className="font-bold text-slate-950">Further reading</h3>
        <ul className="mt-3 list-disc space-y-2 break-words pl-5 text-sm leading-6 text-slate-700">
          {chapter.reading.map((reference) => <li key={reference}>{reference}</li>)}
        </ul>
      </div>
    </section>
  );
}
