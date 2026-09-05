import { useLocation } from 'react-router-dom'

import { getKbRouteByPath } from '@/features/kb/routeManifest'
import { formatKbBreadcrumb } from '@/features/kb/utils/labels'

import type { JSX } from 'react'

export default function TopicBreadcrumb(): JSX.Element | null {
  const location = useLocation()
  const route = getKbRouteByPath(location.pathname)

  if (!route || route.segments.length === 0) {
    return null
  }

  const trail = formatKbBreadcrumb(route.segments)

  return (
    <p className="bin98-breadcrumb" title={trail}>
      <span className="bin98-breadcrumb__root">KB</span>
      <span className="bin98-breadcrumb__sep" aria-hidden="true">
        \
      </span>
      <span className="bin98-breadcrumb__trail">{trail}</span>
    </p>
  )
}
