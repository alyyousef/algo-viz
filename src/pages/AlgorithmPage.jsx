import { Link, useParams } from 'react-router-dom'
import NotFound from './NotFound.jsx'

function AlgorithmPage({ config }) {
  const params = useParams()
  const slug = params[config.paramKey]
  const entry = slug ? config.items[slug] : null

  if (!entry) {
    return <NotFound message="We couldn’t find that algorithm. Try another from the catalog." />
  }

  const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Algorithms', href: '/algorithms' },
  { label: config.title, href: `/algorithms/${config.slug}` },
  { label: entry.label },
]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-5xl flex-col gap-12 px-6 py-16">
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
              Browse algorithms
            </Link>
          </div>

          <nav aria-label="Breadcrumbs" className="text-xs uppercase tracking-[0.3em] text-slate-400">
            <ol className="flex flex-wrap items-center gap-2">
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  {crumb.href ? (
                    <Link to={crumb.href} className="transition hover:text-white">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-slate-200">{crumb.label}</span>
                  )}
                  {index < breadcrumbs.length - 1 && <span className="text-slate-600">/</span>}
                </li>
              ))}
            </ol>
          </nav>

          <div className="space-y-4">
            <h1 className="text-3xl font-semibold text-white sm:text-4xl">{entry.label}</h1>
            <p className="max-w-3xl text-base text-slate-300 sm:text-lg">{entry.summary}</p>
          </div>
        </header>

        <section className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <article className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/50 p-8 backdrop-blur">
            <h2 className="text-xl font-semibold text-white">Visualizer coming soon</h2>
            <p className="text-sm text-slate-300">
              This route is fully wired up for future visualizations. Plug in your custom renderer,
              stepper controls, and statistics dashboard here to animate every phase of the algorithm.
            </p>
            <div className="rounded-2xl border border-dashed border-cyan-400/30 bg-cyan-400/5 p-6 text-sm text-cyan-200">
              <p>Suggested integration points:</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-cyan-100/80">
                <li>Animation canvas or SVG timeline</li>
                <li>Code snippet synchronized by active line</li>
                <li>Complexity and performance insights</li>
              </ul>
            </div>
          </article>

          <aside className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/70 p-8 backdrop-blur">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
                Category
              </h3>
              <p className="mt-2 text-lg font-semibold text-white">{config.title}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
                Algorithm slug
              </h3>
              <p className="mt-2 text-sm text-slate-300">/{config.slug}/{slug}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
                Next steps
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                <li>Add algorithm-specific parameters</li>
                <li>Connect to shared visualization engine</li>
                <li>Log metrics and collect comparisons</li>
              </ul>
            </div>
          </aside>
        </section>
      </div>
    </div>
  )
}

export default AlgorithmPage
