import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import NotFound from '@/app/routes/NotFound'
import { slugifySegment, slugifySegmentWithoutAmpersand } from '@/features/dsa/utils/slug'
import Win96AlgoVizDesktop from '@/features/win96-desktop/Win96AlgoVizDesktop'

import type { ComponentType, JSX } from 'react'

type DsaModuleFactory = () => Promise<{ default: ComponentType<Record<string, unknown>> }>

const DSA_ROUTE_PREFIX = '../features/dsa/routes/'

// eager: false returns a map of path → () => Promise<Module>, enabling per-route code splitting.
// Each DSA page is lazy-loaded only when the user navigates to it, keeping the initial bundle small.
const dsaModuleFactories = import.meta.glob<{ default: ComponentType<Record<string, unknown>> }>(
  '../features/dsa/routes/**/index.tsx',
  { eager: false },
)

interface DsaRouteEntry {
  path: string
  Component: ComponentType<Record<string, unknown>>
}

const dsaRouteEntries: DsaRouteEntry[] = []

Object.entries(dsaModuleFactories).forEach(([filePath, factory]) => {
  const relative = filePath.replace(DSA_ROUTE_PREFIX, '').replace(/\/index\.tsx$/, '')
  const segments = relative.split('/')
  const pathSegments = segments.map(slugifySegment)
  const path = `/${pathSegments.join('/')}`
  const Component = lazy(factory as DsaModuleFactory)

  dsaRouteEntries.push({ path, Component })

  const altSegments = segments.map(slugifySegmentWithoutAmpersand)
  const hasAmpersand = segments.some((segment) => segment.includes('&'))
  const differsFromPrimary = altSegments.some((alt, index) => alt !== pathSegments[index])

  if (hasAmpersand && differsFromPrimary) {
    const altPath = `/${altSegments.join('/')}`
    dsaRouteEntries.push({ path: altPath, Component })
  }
})

function PageLoader(): JSX.Element {
  return <div className="page-loader">Loading…</div>
}

export default function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/algoViz" replace />} />
      <Route path="/algoViz" element={<Win96AlgoVizDesktop />} />
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
