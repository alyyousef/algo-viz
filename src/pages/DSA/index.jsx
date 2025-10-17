import { Link } from 'react-router-dom'

const toBadgeLabel = (rawTitle) => rawTitle.split('.')[0]?.trim() ?? 'DSA'

const toHeading = (rawTitle, fallback) => {
  if (!rawTitle) return fallback
  return rawTitle.replace(/^[0-9]+\.?\s*/, '') || fallback
}

function DSAIndex({ sections = [] }) {
  const sortedSections = [...sections].sort((a, b) =>
    a.rawTitle.localeCompare(b.rawTitle, undefined, { numeric: true })
  )

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
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">DSA catalog</p>
            <h1 className="text-3xl font-semibold text-white sm:text-4xl">Choose a topic cluster</h1>
            <p className="max-w-3xl text-base text-slate-300 sm:text-lg">
              Explore curated roadmaps for fundamental concepts, canonical data structures, and
              advanced algorithmic techniques. Pick a cluster to dive into guided overviews and TODOs.
            </p>
          </div>
        </header>

        <section className="grid gap-6 sm:grid-cols-2">
          {sortedSections.map((section) => (
            <Link
              key={section.path}
              to={section.path}
              className="group flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-6 transition hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-slate-900/80 hover:shadow-[0_30px_90px_-60px_rgba(56,189,248,0.6)]"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
                {toBadgeLabel(section.rawTitle)}
              </span>
              <h2 className="text-lg font-semibold text-white">
                {toHeading(section.rawTitle, section.title)}
              </h2>
              <p className="text-sm text-slate-300">{section.description}</p>
              <span className="mt-auto text-sm font-semibold text-cyan-300 transition group-hover:text-white">
                {'Explore section ->'}
              </span>
            </Link>
          ))}
        </section>
      </div>
    </div>
  )
}

export default DSAIndex
