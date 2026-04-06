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

interface LegacyRouteMapping {
  oldSegments: string[]
  newSegments: string[]
  exactOnly?: boolean
}

interface LegacyRedirectEntry {
  from: string
  to: string
}

const toRoutePath = (segments: string[], useAmpersandlessSlug = false): string => {
  const slugify = useAmpersandlessSlug ? slugifySegmentWithoutAmpersand : slugifySegment
  return `/${segments.map(slugify).join('/')}`
}

const arraysEqual = (left: string[], right: string[]): boolean =>
  left.length === right.length && left.every((segment, index) => segment === right[index])

const hasPrefix = (segments: string[], prefix: string[]): boolean =>
  prefix.length <= segments.length && prefix.every((segment, index) => segment === segments[index])

const legacyRouteMappings: LegacyRouteMapping[] = [
  {
    oldSegments: ['0. Programming Languages'],
    newSegments: ['0. Languages & Ecosystems'],
    exactOnly: true,
  },
  {
    oldSegments: ['0. Programming Languages', 'Abstraction Level'],
    newSegments: ['0. Languages & Ecosystems', 'Language Levels'],
  },
  {
    oldSegments: ['0. Programming Languages', 'Execution Method'],
    newSegments: ['0. Languages & Ecosystems', 'Execution Models'],
  },
  {
    oldSegments: ['0. Programming Languages', 'Programming Paradigm'],
    newSegments: ['0. Languages & Ecosystems', 'Paradigms'],
  },
  {
    oldSegments: ['0. Programming Languages', 'Languages', 'Cloud Platforms'],
    newSegments: ['0. Languages & Ecosystems', 'Platforms & Cloud'],
  },
  {
    oldSegments: ['0. Programming Languages', 'Languages', 'Frameworks'],
    newSegments: ['0. Languages & Ecosystems', 'Frameworks'],
  },
  {
    oldSegments: ['0. Programming Languages', 'Languages', 'Database'],
    newSegments: ['0. Languages & Ecosystems', 'Databases & Storage'],
  },
  {
    oldSegments: ['0. Programming Languages', 'Languages', 'Mobile Ecosystems'],
    newSegments: ['0. Languages & Ecosystems', 'Mobile Development'],
  },
  {
    oldSegments: ['0. Programming Languages', 'Languages', 'ML'],
    newSegments: ['0. Languages & Ecosystems', 'AI & ML Tools'],
  },
  {
    oldSegments: ['0. Programming Languages', 'Languages', 'Compare & Contrast'],
    newSegments: ['0. Languages & Ecosystems', 'Comparisons'],
  },
  {
    oldSegments: ['0. Programming Languages', 'Languages', 'OOP'],
    newSegments: ['0. Languages & Ecosystems', 'Object-Oriented Languages'],
  },
  {
    oldSegments: ['0. Programming Languages', 'Languages', 'Systems-Programming'],
    newSegments: ['0. Languages & Ecosystems', 'Systems Languages'],
  },
  {
    oldSegments: ['0. Programming Languages', 'Languages', 'Web-Development'],
    newSegments: ['0. Languages & Ecosystems', 'Web Technologies'],
  },
  {
    oldSegments: ['0. CS Problems'],
    newSegments: ['0. CS Problems & Theory'],
    exactOnly: true,
  },
  {
    oldSegments: ['0. CS Problems', '1. Legacy problems'],
    newSegments: ['0. CS Problems & Theory', '1. Classic Problems'],
  },
  {
    oldSegments: ['0. CS Problems', '2. Complex problems'],
    newSegments: ['0. CS Problems & Theory', '2. Advanced Problems'],
  },
  {
    oldSegments: ['4. Domain-Specific & Advanced'],
    newSegments: ['4. Advanced Topics'],
    exactOnly: true,
  },
  {
    oldSegments: ['4. Domain-Specific & Advanced', '1. String Algorithms'],
    newSegments: ['4. Advanced Topics', '1. String Algorithms'],
  },
  {
    oldSegments: ['4. Domain-Specific & Advanced', '2. Mathematical Algorithms'],
    newSegments: ['4. Advanced Topics', '2. Mathematical Algorithms'],
  },
  {
    oldSegments: ['4. Domain-Specific & Advanced', '3. Computational Geometry'],
    newSegments: ['4. Advanced Topics', '3. Computational Geometry'],
  },
  {
    oldSegments: ['4. Domain-Specific & Advanced', '4. Advanced Graph Theory'],
    newSegments: ['2. Core Algorithms', '2. Graph Algorithms', '24. Advanced Graph Algorithms & Theory'],
  },
  {
    oldSegments: ['4. Domain-Specific & Advanced', '5. Probabilistic DS (Bloom Filters, etc.)'],
    newSegments: ['1. Core Data Structures', '4. Advanced & Specialized', '6. Probabilistic Data Structures'],
  },
  {
    oldSegments: ['4. Domain-Specific & Advanced', '6. Concurrent & Parallel DS & Algorithms'],
    newSegments: ['4. Advanced Topics', '4. Systems & Concurrency'],
  },
  {
    oldSegments: ['5. Specialized Applications'],
    newSegments: ['5. Applied Domains'],
    exactOnly: true,
  },
  {
    oldSegments: ['5. Specialized Applications', '1. System Design (Caches, LRU, etc.)'],
    newSegments: ['5. Applied Domains', '1. Systems Design & Architecture'],
  },
  {
    oldSegments: ['5. Specialized Applications', '2. Database & Indexing (B+ Trees, LSM Trees)'],
    newSegments: ['5. Applied Domains', '2. Database & Indexing (B+ Trees, LSM Trees)'],
  },
  {
    oldSegments: ['5. Specialized Applications', '3. OS & Kernel (Scheduling, Memory Mgmt)'],
    newSegments: ['5. Applied Domains', '3. OS & Kernel (Scheduling, Memory Mgmt)'],
  },
  {
    oldSegments: ['5. Specialized Applications', '4. Network & Distributed Algorithms'],
    newSegments: ['5. Applied Domains', '4. Network & Distributed Algorithms'],
  },
  {
    oldSegments: ['5. Specialized Applications', '5. Cryptography'],
    newSegments: ['5. Applied Domains', '5. Cryptography'],
  },
  {
    oldSegments: ['5. Specialized Applications', '6. Game Development (Pathfinding, etc.)'],
    newSegments: ['5. Applied Domains', '6. Game Development (Pathfinding, etc.)'],
  },
  {
    oldSegments: ['5. Specialized Applications', '7. AI & ML (Search, GNNs, etc.)'],
    newSegments: ['5. Applied Domains', '7. AI & ML (Search, GNNs, etc.)'],
  },
  {
    oldSegments: ['5. Specialized Applications', '8. Blockchain (Merkle Trees, etc.)'],
    newSegments: ['5. Applied Domains', '8. Blockchain (Merkle Trees, etc.)'],
  },
  {
    oldSegments: ['5. Specialized Applications', '9. Bioinformatics (Suffix Arrays, etc.)'],
    newSegments: ['5. Applied Domains', '9. Bioinformatics (Suffix Arrays, etc.)'],
  },
]

const dsaRouteEntries: DsaRouteEntry[] = []
const dsaRouteSegments: string[][] = []

Object.entries(dsaModuleFactories).forEach(([filePath, factory]) => {
  const relative = filePath.replace(DSA_ROUTE_PREFIX, '').replace(/\/index\.tsx$/, '')
  const segments = relative.split('/')
  const path = toRoutePath(segments)
  const Component = lazy(factory as DsaModuleFactory)

  dsaRouteSegments.push(segments)
  dsaRouteEntries.push({ path, Component })

  const altPath = toRoutePath(segments, true)
  const hasAmpersand = segments.some((segment) => segment.includes('&'))
  const differsFromPrimary = altPath !== path

  if (hasAmpersand && differsFromPrimary) {
    dsaRouteEntries.push({ path: altPath, Component })
  }
})

const legacyRedirectEntries: LegacyRedirectEntry[] = (() => {
  const redirects = new Map<string, string>()
  const currentPaths = new Set(dsaRouteEntries.map(({ path }) => path))

  legacyRouteMappings.forEach(({ oldSegments, newSegments, exactOnly = false }) => {
    dsaRouteSegments.forEach((segments) => {
      const matches = exactOnly ? arraysEqual(segments, newSegments) : hasPrefix(segments, newSegments)
      if (!matches) {
        return
      }

      const suffix = segments.slice(newSegments.length)
      const redirectTarget = toRoutePath(segments)
      const legacySegments = [...oldSegments, ...suffix]
      const legacyPrimary = toRoutePath(legacySegments)
      const legacyAlt = toRoutePath(legacySegments, true)

      ;[legacyPrimary, legacyAlt].forEach((legacyPath) => {
        if (
          legacyPath === redirectTarget ||
          currentPaths.has(legacyPath) ||
          redirects.has(legacyPath)
        ) {
          return
        }
        redirects.set(legacyPath, redirectTarget)
      })
    })
  })

  return Array.from(redirects.entries()).map(([from, to]) => ({ from, to }))
})()

function PageLoader(): JSX.Element {
  return <div className="page-loader">Loading…</div>
}

export default function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/algoViz" replace />} />
      <Route path="/algoViz" element={<Win96AlgoVizDesktop />} />
      {legacyRedirectEntries.map(({ from, to }) => (
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
