import { Link } from 'react-router-dom'

function AlgorithmsIndex({ configs }) {
  const entries = Object.values(configs)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-16">
        <header className="flex flex-col gap-4">
          <Link
            to="/"
            className="w-max rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/35 hover:text-white"
          >
            Back to home
          </Link>
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Interactive catalog</p>
            <h1 className="text-3xl font-semibold text-white sm:text-4xl">Choose a category</h1>
            <p className="max-w-3xl text-base text-slate-300 sm:text-lg">
              Dive into visual, step-by-step walkthroughs for sorting, searching, data structures,
              and graph algorithms. Pick a category to begin exploring.
            </p>
          </div>
        </header>

        <section className="grid gap-6 sm:grid-cols-2">
          {entries.map((config) => (
            <Link
              key={config.slug}
              to={`/algorithms/${config.slug}`}
              className="group flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-6 transition hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-slate-900/80 hover:shadow-[0_30px_90px_-60px_rgba(56,189,248,0.6)]"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
                Algorithms
              </span>
              <h2 className="text-lg font-semibold text-white">{config.title}</h2>
              <p className="text-sm text-slate-300">{config.description}</p>
              <span className="mt-auto text-sm font-semibold text-cyan-300 transition group-hover:text-white">
                {'Explore category ->'}
              </span>
            </Link>
          ))}
        </section>
      </div>
    </div>
  )
}

export default AlgorithmsIndex
