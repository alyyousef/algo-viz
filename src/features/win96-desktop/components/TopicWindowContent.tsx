import { lazy, Suspense, useMemo, type ComponentType, type JSX } from 'react'

import { ErrorBoundary } from '@/app/ErrorBoundary'
import { getKbRouteByPath } from '@/features/kb/routeManifest'

interface TopicWindowContentProps {
  route: string
}

function TopicLoader(): JSX.Element {
  return (
    <div className="page-loader page-loader--window" role="status" aria-live="polite">
      <div className="page-loader__dialog">
        <div className="page-loader__titlebar">
          <span className="page-loader__title">Help</span>
        </div>
        <div className="page-loader__body">
          <div className="page-loader__label">Opening topic page...</div>
          <div className="page-loader__bar-track">
            <div className="page-loader__bar-fill" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TopicWindowContent({ route }: TopicWindowContentProps): JSX.Element {
  const definition = getKbRouteByPath(route)
  const Component = useMemo<ComponentType<Record<string, unknown>> | null>(() => {
    if (!definition) {
      return null
    }

    return lazy(definition.factory)
  }, [definition])

  if (!definition || !Component) {
    return (
      <div className="bin98-help-page">
        <div className="bin98-content" style={{ padding: '20px' }}>
          <h1 className="bin98-doc-title">Cannot find topic</h1>
          <p>That path is not in the knowledge base.</p>
        </div>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <Suspense fallback={<TopicLoader />}>
        <Component />
      </Suspense>
    </ErrorBoundary>
  )
}
