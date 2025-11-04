import { Navigate, Route, Routes } from 'react-router-dom'

import NotFound from '@/app/routes/NotFound'
import Win96AlgoVizDesktop from '@/features/win96-desktop/Win96AlgoVizDesktop'

import type { ComponentType, JSX } from 'react'

type DsaModule = { default: ComponentType<Record<string, unknown>> }

const DSA_ROUTE_PREFIX = '../features/dsa/routes/'

const slugifySegment = (segment: string): string =>
  segment
    .trim()
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'section'

const dsaModules = import.meta.glob<DsaModule>('../features/dsa/routes/**/index.tsx', {
  eager: true,
})

interface DsaRouteEntry {
  path: string
  Component: ComponentType<Record<string, unknown>>
}

const dsaRouteEntries: DsaRouteEntry[] = Object.entries(dsaModules).map(([filePath, module]) => {
  const relative = filePath.replace(DSA_ROUTE_PREFIX, '').replace(/\/index\.tsx$/, '')
  const segments = relative.split('/')
  const pathSegments = segments.map(slugifySegment)
  const path = `/${pathSegments.join('/')}`

  return {
    path,
    Component: module.default,
  }
})

export default function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/algoViz" replace />} />
      <Route path="/algoViz" element={<Win96AlgoVizDesktop />} />
      {dsaRouteEntries.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
