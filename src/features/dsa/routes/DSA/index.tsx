import { Link } from 'react-router-dom'

import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

export interface DsaSection {
  path: string
  rawTitle?: string
  title?: string
  description?: string
  badge?: string
  ctaLabel?: string
}

export interface DsaIndexProps {
  sections?: DsaSection[]
  badgeLabel?: string
  heading?: string
  description?: string
  backLink?: string
  backLabel?: string
  ctaLabel?: string
}

const removeOrderingPrefix = (label = ''): string => label.replace(/^[0-9]+\.?\s*/, '').trim()

export default function DsaIndex({
  sections = [],
  badgeLabel = 'DSA catalog',
  heading = 'Choose a topic cluster',
  description = 'Explore curated roadmaps for fundamental concepts, canonical data structures, and advanced algorithmic techniques. Pick a cluster to dive into guided overviews and TODOs.',
  backLink = '/',
  backLabel = 'Back to home',
  ctaLabel = 'Explore section ->',
}: DsaIndexProps): JSX.Element {
  const sortedSections = [...sections].sort((a, b) =>
    (a.rawTitle ?? a.title ?? '').localeCompare(b.rawTitle ?? b.title ?? '', undefined, {
      numeric: true,
    }),
  )

  return (
    <TopicLayout
      title={heading}
      subtitle={badgeLabel.toUpperCase()}
      intro={description}
      backLink={backLink}
      backLabel={backLabel}
    >
      <TopicSection heading="Available paths">
        <div className="grid gap-4 sm:grid-cols-2">
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
                className="flex h-full flex-col gap-3 rounded-lg bg-white/15 p-4 text-white transition hover:bg-white/25"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
                  {badgeText}
                </span>
                <h2 className="text-lg font-semibold tracking-tight">{headingText}</h2>
                <p className="text-sm text-white/80">{descriptionText}</p>
                <span className="mt-auto text-sm font-semibold text-white/90">{ctaText}</span>
              </Link>
            )
          })}
        </div>
      </TopicSection>
    </TopicLayout>
  )
}
