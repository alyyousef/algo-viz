import { Link } from 'react-router-dom'

function AlgorithmCategoryPage({ config }) {
  const entries = Object.entries(config.items)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-16">
        <header className="flex flex-col gap-6">
          <div className="flex items-center justify-between gap-4">
            <Link
              to="/"
              className="text-lg font-semibold text-white transition hover:text-cyan-300"
            >
              AlgoViz
            </Link>
            <Link
              to="/algorithms"
              className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-white/35 hover:text-white"
            >
              All categories
            </Link>
          </div>
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Algorithm catalog</p>
            <h1 className="text-3xl font-semibold text-white sm:text-4xl">{config.title}</h1>
            <p className="max-w-3xl text-base text-slate-300 sm:text-lg">{config.description}</p>
          </div>
        </header>

        <section className="grid gap-6 sm:grid-cols-2">
          {entries.map(([slug, entry]) => (
            <Link
              key={slug}
              to={`/algorithms/${config.slug}/${slug}`}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-6 transition hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-slate-900/80 hover:shadow-[0_30px_90px_-60px_rgba(56,189,248,0.6)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 opacity-0 transition duration-300 group-hover:opacity-100" />
              <div className="relative flex h-full flex-col gap-4">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
                  {config.title}
                </span>
                <h2 className="text-lg font-semibold text-white">{entry.label}</h2>
                <p className="text-sm text-slate-300">{entry.summary}</p>
                <span className="mt-auto text-sm font-semibold text-cyan-300 transition group-hover:text-white">
                  {'View visualizer ->'}
                </span>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </div>
  )
}

export default AlgorithmCategoryPage
