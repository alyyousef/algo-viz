import { useLocation, useNavigate } from 'react-router-dom'

import { getAdjacentKbRoutes } from '@/features/kb/routeManifest'

import type { JSX } from 'react'

const getRouteLabel = (segments: string[]): string => segments[segments.length - 1] ?? 'Page'

export default function TopicPageNavigation(): JSX.Element | null {
  const location = useLocation()
  const navigate = useNavigate()
  const { previous, next } = getAdjacentKbRoutes(location.pathname)

  if (!previous && !next) {
    return null
  }

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
        aria-label={
          previous
            ? `Previous page: ${getRouteLabel(previous.segments)}`
            : 'Previous page unavailable'
        }
        title={
          previous
            ? `Previous page: ${getRouteLabel(previous.segments)}`
            : 'Previous page unavailable'
        }
      >
        Previous Page
      </button>
      <button
        type="button"
        className="bin98-button bin98-page-nav-button"
        onClick={() => goToPath(next?.path ?? null)}
        disabled={!next}
        aria-label={next ? `Next page: ${getRouteLabel(next.segments)}` : 'Next page unavailable'}
        title={next ? `Next page: ${getRouteLabel(next.segments)}` : 'Next page unavailable'}
      >
        Next Page
      </button>
    </nav>
  )
}
