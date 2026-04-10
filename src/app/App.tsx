import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import NotFound from '@/app/routes/NotFound'
import { dsaLegacyRedirectEntries, dsaRouteDefinitions } from '@/features/dsa/routeManifest'
import Win96AlgoVizDesktop from '@/features/win96-desktop/Win96AlgoVizDesktop'

import type { ComponentType, JSX } from 'react'

interface DsaRouteEntry {
  path: string
  Component: ComponentType<Record<string, unknown>>
}

const dsaRouteEntries: DsaRouteEntry[] = dsaRouteDefinitions.flatMap(
  ({ path, alternatePaths, factory }) => {
    const Component = lazy(factory)
    return [
      { path, Component },
      ...alternatePaths.map((alternatePath) => ({ path: alternatePath, Component })),
    ]
  },
)

function PageLoader(): JSX.Element {
  return (
    <div className="page-loader" role="status" aria-live="polite">
      <div className="page-loader__dialog">
        <div className="page-loader__titlebar">
          <span className="page-loader__title">AlgoViz Explorer</span>
          <span className="page-loader__controls" aria-hidden="true">
            <span className="page-loader__control" />
            <span className="page-loader__control" />
            <span className="page-loader__control" />
          </span>
        </div>
        <div className="page-loader__body">
          <div className="page-loader__status">
            <span className="page-loader__status-icon" aria-hidden="true" />
            <div className="page-loader__copy">
              <div className="page-loader__label">Opening topic page...</div>
              <div className="page-loader__detail">Loading the lesson shell and route content.</div>
            </div>
          </div>
          <div className="page-loader__bar-track">
            <div className="page-loader__bar-fill" />
          </div>
          <div className="page-loader__footer">Retro desktop online</div>
        </div>
      </div>
    </div>
  )
}

export default function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/algoViz" replace />} />
      <Route path="/algoViz" element={<Win96AlgoVizDesktop />} />
      {dsaLegacyRedirectEntries.map(({ from, to }) => (
        <Route key={`${from}->${to}`} path={from} element={<Navigate to={to} replace />} />
      ))}
      {dsaRouteEntries.map(({ path, Component }) => (
        <Route
          key={path}
          path={path}
          element={
            <Suspense fallback={<PageLoader />}>
              <Component />
            </Suspense>
          }
        />
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
