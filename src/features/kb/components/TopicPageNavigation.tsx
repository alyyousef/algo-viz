import { useLocation, useNavigate } from 'react-router-dom'

import { getAdjacentKbRoutes } from '@/features/kb/routeManifest'
import { formatKbTitle } from '@/features/kb/utils/labels'

import type { JSX } from 'react'

export default function TopicPageNavigation(): JSX.Element | null {
  const location = useLocation()
  const navigate = useNavigate()
  const { previous, next } = getAdjacentKbRoutes(location.pathname)

  if (!previous && !next) {
    return null
  }

  const previousLabel = previous ? formatKbTitle(previous.segments) : null
  const nextLabel = next ? formatKbTitle(next.segments) : null

  const goToPath = (pathname: string | null) => {
    if (!pathname) {
      return
    }

    void navigate({ pathname, search: location.search })
  }

  return (
    <nav className="bin98-page-nav" aria-label="Page navigation">
      <button
        type="button"
        className="bin98-button bin98-page-nav-button"
        onClick={() => goToPath(previous?.path ?? null)}
        disabled={!previous}
        aria-label={previousLabel ? `Previous page: ${previousLabel}` : 'Previous page unavailable'}
        title={previousLabel ? `Previous page: ${previousLabel}` : 'Previous page unavailable'}
      >
        <span className="bin98-page-nav-label bin98-page-nav-label--full">
          {previousLabel ? `← ${previousLabel}` : 'Previous Page'}
        </span>
        <span className="bin98-page-nav-label bin98-page-nav-label--short">← Prev</span>
      </button>
      <button
        type="button"
        className="bin98-button bin98-page-nav-button"
        onClick={() => goToPath(next?.path ?? null)}
        disabled={!next}
        aria-label={nextLabel ? `Next page: ${nextLabel}` : 'Next page unavailable'}
        title={nextLabel ? `Next page: ${nextLabel}` : 'Next page unavailable'}
      >
        <span className="bin98-page-nav-label bin98-page-nav-label--full">
          {nextLabel ? `${nextLabel} →` : 'Next Page'}
        </span>
        <span className="bin98-page-nav-label bin98-page-nav-label--short">Next →</span>
      </button>
    </nav>
  )
}
