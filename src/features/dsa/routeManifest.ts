import { slugifySegment, slugifySegmentWithoutAmpersand } from '@/features/dsa/utils/slug'

import type { ComponentType } from 'react'

export type DsaModuleFactory = () => Promise<{ default: ComponentType<Record<string, unknown>> }>

export interface DsaRouteDefinition {
  filePath: string
  segments: string[]
  path: string
  alternatePaths: string[]
  factory: DsaModuleFactory
}

export interface AdjacentDsaRoutes {
  current: DsaRouteDefinition | null
  previous: DsaRouteDefinition | null
  next: DsaRouteDefinition | null
}

interface LegacyRouteMapping {
  oldSegments: string[]
  newSegments: string[]
  exactOnly?: boolean
}

export interface LegacyRedirectEntry {
  from: string
  to: string
}

const ROUTE_FILE_PREFIX = './routes/DSA/'
const routeOrderCollator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' })

const dsaModuleFactories = import.meta.glob<{ default: ComponentType<Record<string, unknown>> }>(
  './routes/DSA/**/index.tsx',
  { eager: false },
)

const toRoutePath = (segments: string[], useAmpersandlessSlug = false): string => {
  const slugify = useAmpersandlessSlug ? slugifySegmentWithoutAmpersand : slugifySegment
  return `/dsa/${segments.map(slugify).join('/')}`
}

const arraysEqual = (left: string[], right: string[]): boolean =>
  left.length === right.length && left.every((segment, index) => segment === right[index])

const hasPrefix = (segments: string[], prefix: string[]): boolean =>
  prefix.length <= segments.length && prefix.every((segment, index) => segment === segments[index])

export const compareDsaRouteSegments = (left: string[], right: string[]): number => {
  const maxLength = Math.min(left.length, right.length)
  for (let index = 0; index < maxLength; index += 1) {
    const comparison = routeOrderCollator.compare(left[index]!, right[index]!)
    if (comparison !== 0) {
      return comparison
    }
  }

  return left.length - right.length
}

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
    newSegments: [
      '2. Core Algorithms',
      '2. Graph Algorithms',
      '24. Advanced Graph Algorithms & Theory',
    ],
  },
  {
    oldSegments: ['4. Domain-Specific & Advanced', '5. Probabilistic DS (Bloom Filters, etc.)'],
    newSegments: [
      '1. Core Data Structures',
      '4. Advanced & Specialized',
      '6. Probabilistic Data Structures',
    ],
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

export const dsaRouteDefinitions: DsaRouteDefinition[] = Object.entries(dsaModuleFactories).map(
  ([filePath, factory]) => {
    const relativePath = filePath.slice(ROUTE_FILE_PREFIX.length).replace(/\/index\.tsx$/, '')
    const segments = relativePath ? relativePath.split('/') : []
    const path = toRoutePath(segments)
    const alternatePath = toRoutePath(segments, true)
    const alternatePaths =
      segments.some((segment) => segment.includes('&')) && alternatePath !== path
        ? [alternatePath]
        : []

    return {
      filePath,
      segments,
      path,
      alternatePaths,
      factory: factory as DsaModuleFactory,
    }
  },
)

export const dsaOrderedRouteDefinitions: DsaRouteDefinition[] = [...dsaRouteDefinitions].sort(
  (left, right) => compareDsaRouteSegments(left.segments, right.segments),
)

const dsaRouteIndexByPath = new Map<string, number>()

dsaOrderedRouteDefinitions.forEach((route, index) => {
  dsaRouteIndexByPath.set(route.path, index)
  route.alternatePaths.forEach((alternatePath) => {
    dsaRouteIndexByPath.set(alternatePath, index)
  })
})

export const getAdjacentDsaRoutes = (pathname: string): AdjacentDsaRoutes => {
  const currentIndex = dsaRouteIndexByPath.get(pathname)

  if (currentIndex === undefined) {
    return { current: null, previous: null, next: null }
  }

  return {
    current: dsaOrderedRouteDefinitions[currentIndex] ?? null,
    previous: dsaOrderedRouteDefinitions[currentIndex - 1] ?? null,
    next: dsaOrderedRouteDefinitions[currentIndex + 1] ?? null,
  }
}

export const dsaLegacyRedirectEntries: LegacyRedirectEntry[] = (() => {
  const redirects = new Map<string, string>()
  const currentPaths = new Set(
    dsaRouteDefinitions.flatMap(({ path, alternatePaths }) => [path, ...alternatePaths]),
  )

  legacyRouteMappings.forEach(({ oldSegments, newSegments, exactOnly = false }) => {
    dsaRouteDefinitions.forEach(({ segments, path: redirectTarget }) => {
      const matches = exactOnly
        ? arraysEqual(segments, newSegments)
        : hasPrefix(segments, newSegments)
      if (!matches) {
        return
      }

      const suffix = segments.slice(newSegments.length)
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
