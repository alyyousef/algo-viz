import { Link } from 'react-router-dom'

import { useTopicNavigation } from '@/features/dsa/hooks/useTopicNavigation'

import type { JSX } from 'react'

/**
 * Renders Previous / Next navigation links between sibling DSA topics.
 * Drop this anywhere inside a topic page - it reads the current route automatically.
 *
 * Usage:
 *   <TopicNav />
 */
export default function TopicNav(): JSX.Element | null {
  const { previous, next } = useTopicNavigation()

  if (!previous && !next) {
    return null
  }

  return (
    <nav className="topic-nav" aria-label="Topic navigation">
      {previous ? (
        <Link to={previous.route} className="topic-nav__link topic-nav__link--prev">
          <span className="topic-nav__arrow" aria-hidden="true">
            {'<'}
          </span>
          <span className="topic-nav__label">
            <span className="topic-nav__hint">Previous</span>
            <span className="topic-nav__name">{previous.name}</span>
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link to={next.route} className="topic-nav__link topic-nav__link--next">
          <span className="topic-nav__label">
            <span className="topic-nav__hint">Next</span>
            <span className="topic-nav__name">{next.name}</span>
          </span>
          <span className="topic-nav__arrow" aria-hidden="true">
            {'>'}
          </span>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  )
}
