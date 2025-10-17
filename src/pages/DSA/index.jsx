import { Link } from 'react-router-dom'

const removeOrderingPrefix = (label = '') => label.replace(/^[0-9]+\.?\s*/, '').trim()

function DSAIndex({
  sections = [],
  badgeLabel = 'DSA catalog',
  heading = 'Choose a topic cluster',
  description = 'Explore curated roadmaps for fundamental concepts, canonical data structures, and advanced algorithmic techniques. Pick a cluster to dive into guided overviews and TODOs.',
  backLink = '/',
  backLabel = 'Back to home',
  ctaLabel = 'Explore section ->'
}) {
  const sortedSections = [...sections].sort((a, b) =>
    (a.rawTitle ?? a.title).localeCompare(b.rawTitle ?? b.title, undefined, { numeric: true })
  )

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-16">
        <header className="flex flex-col gap-4">
          <Link
            to={backLink}
            className="w-max rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/35 hover:text-white"
          >
            {backLabel}
          </Link>
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{badgeLabel}</p>
            <h1 className="text-3xl font-semibold text-white sm:text-4xl">{heading}</h1>
            <p className="max-w-3xl text-base text-slate-300 sm:text-lg">{description}</p>
          </div>
        </header>

        <section className="grid gap-6 sm:grid-cols-2">
          {sortedSections.map((section) => {
            const fallbackBadge =
              removeOrderingPrefix(section.rawTitle ?? '') || section.title || 'TOPIC'
            const badgeText = section.badge ?? fallbackBadge
            const headingText =
              removeOrderingPrefix(section.rawTitle ?? section.title) || section.title || 'Untitled'
            const descriptionText =
              section.description ??
              `Jump into ${headingText.toLowerCase()} to explore curated notes and TODOs.`
            const ctaText = section.ctaLabel ?? ctaLabel

            return (
              <Link
                key={section.path}
                to={section.path}
                className="group flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-6 transition hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-slate-900/80 hover:shadow-[0_30px_90px_-60px_rgba(56,189,248,0.6)]"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
                  {badgeText}
                </span>
                <h2 className="text-lg font-semibold text-white">{headingText}</h2>
                <p className="text-sm text-slate-300">{descriptionText}</p>
                <span className="mt-auto text-sm font-semibold text-cyan-300 transition group-hover:text-white">
                  {ctaText}
                </span>
              </Link>
            )
          })}
        </section>
      </div>
    </div>
  )
}

export default DSAIndex
