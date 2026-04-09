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
    <div className="page-loader">
      <div className="page-loader__dialog">
        <div className="page-loader__titlebar">AlgoViz</div>
        <div className="page-loader__body">
          <div className="page-loader__label">Loading page, please wait…</div>
          <div className="page-loader__bar-track">
            <div className="page-loader__bar-fill" />
          </div>
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
