import { slugifySegment, slugifySegmentWithoutAmpersand } from '@/features/kb/utils/slug'

import type { ComponentType } from 'react'

export type KbModuleFactory = () => Promise<{ default: ComponentType<Record<string, unknown>> }>

export interface KbRouteDefinition {
  filePath: string
  segments: string[]
  path: string
  alternatePaths: string[]
  factory: KbModuleFactory
}

export interface AdjacentKbRoutes {
  current: KbRouteDefinition | null
  previous: KbRouteDefinition | null
  next: KbRouteDefinition | null
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

const ROUTE_FILE_PREFIX = './routes/KB/'
const routeOrderCollator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' })

const kbModuleFactories = import.meta.glob<{ default: ComponentType<Record<string, unknown>> }>(
  './routes/KB/**/index.{tsx,mdx}',
  { eager: false },
)

const toRoutePath = (segments: string[], useAmpersandlessSlug = false): string => {
  const slugify = useAmpersandlessSlug ? slugifySegmentWithoutAmpersand : slugifySegment
  return `/kb/${segments.map(slugify).join('/')}`
}

const arraysEqual = (left: string[], right: string[]): boolean =>
  left.length === right.length && left.every((segment, index) => segment === right[index])

const hasPrefix = (segments: string[], prefix: string[]): boolean =>
  prefix.length <= segments.length && prefix.every((segment, index) => segment === segments[index])

export const compareKbRouteSegments = (left: string[], right: string[]): number => {
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
    newSegments: ['1. Programming Languages'],
    exactOnly: true,
  },
  {
    oldSegments: ['0. Programming Languages', 'Abstraction Level'],
    newSegments: ['1. Programming Languages', 'Language Levels'],
  },
  {
    oldSegments: ['0. Programming Languages', 'Execution Method'],
    newSegments: ['1. Programming Languages', 'Execution Models'],
  },
  {
    oldSegments: ['0. Programming Languages', 'Programming Paradigm'],
    newSegments: ['1. Programming Languages', 'Paradigms'],
  },
  {
    oldSegments: ['0. Programming Languages', 'Languages', 'Cloud Platforms'],
    newSegments: ['1. Programming Languages', 'Platforms & Cloud'],
  },
  {
    oldSegments: ['0. Programming Languages', 'Languages', 'Frameworks'],
    newSegments: ['1. Programming Languages', 'Frameworks'],
  },
  {
    oldSegments: ['0. Programming Languages', 'Languages', 'Database'],
    newSegments: ['1. Programming Languages', 'Databases & Storage'],
  },
  {
    oldSegments: ['0. Programming Languages', 'Languages', 'Mobile Ecosystems'],
    newSegments: ['1. Programming Languages', 'Mobile Development'],
  },
  {
    oldSegments: ['0. Programming Languages', 'Languages', 'ML'],
    newSegments: ['1. Programming Languages', 'AI & ML Tools'],
  },
  {
    oldSegments: ['0. Programming Languages', 'Languages', 'Compare & Contrast'],
    newSegments: ['1. Programming Languages', 'Comparisons'],
  },
  {
    oldSegments: ['0. Programming Languages', 'Languages', 'OOP'],
    newSegments: ['1. Programming Languages', 'Object-Oriented Languages'],
  },
  {
    oldSegments: ['0. Programming Languages', 'Languages', 'Systems-Programming'],
    newSegments: ['1. Programming Languages', 'Systems Languages'],
  },
  {
    oldSegments: ['0. Programming Languages', 'Languages', 'Web-Development'],
    newSegments: ['1. Programming Languages', 'Web Technologies'],
  },
  {
    oldSegments: ['0. CS Problems'],
    newSegments: ['0. Computer Science Fundamentals', '0. CS Problems & Theory'],
    exactOnly: true,
  },
  {
    oldSegments: ['0. CS Problems', '1. Legacy problems'],
    newSegments: [
      '0. Computer Science Fundamentals',
      '0. CS Problems & Theory',
      '1. Classic Problems',
    ],
  },
  {
    oldSegments: ['0. CS Problems', '2. Complex problems'],
    newSegments: [
      '0. Computer Science Fundamentals',
      '0. CS Problems & Theory',
      '2. Advanced Problems',
    ],
  },
  {
    oldSegments: ['4. Domain-Specific & Advanced'],
    newSegments: ['0. Computer Science Fundamentals', '4. Advanced Topics'],
    exactOnly: true,
  },
  {
    oldSegments: ['4. Domain-Specific & Advanced', '1. String Algorithms'],
    newSegments: ['0. Computer Science Fundamentals', '4. Advanced Topics', '1. String Algorithms'],
  },
  {
    oldSegments: ['4. Domain-Specific & Advanced', '2. Mathematical Algorithms'],
    newSegments: [
      '0. Computer Science Fundamentals',
      '4. Advanced Topics',
      '2. Mathematical Algorithms',
    ],
  },
  {
    oldSegments: ['4. Domain-Specific & Advanced', '3. Computational Geometry'],
    newSegments: [
      '0. Computer Science Fundamentals',
      '4. Advanced Topics',
      '3. Computational Geometry',
    ],
  },
  {
    oldSegments: ['4. Domain-Specific & Advanced', '4. Advanced Graph Theory'],
    newSegments: [
      '0. Computer Science Fundamentals',
      '2. Core Algorithms',
      '2. Graph Algorithms',
      '24. Advanced Graph Algorithms & Theory',
    ],
  },
  {
    oldSegments: ['4. Domain-Specific & Advanced', '5. Probabilistic DS (Bloom Filters, etc.)'],
    newSegments: [
      '0. Computer Science Fundamentals',
      '1. Core Data Structures',
      '4. Advanced & Specialized',
      '6. Probabilistic Data Structures',
    ],
  },
  {
    oldSegments: ['4. Domain-Specific & Advanced', '6. Concurrent & Parallel DS & Algorithms'],
    newSegments: [
      '0. Computer Science Fundamentals',
      '4. Advanced Topics',
      '4. Systems & Concurrency',
    ],
  },
  {
    oldSegments: ['5. Specialized Applications'],
    newSegments: ['0. Computer Science Fundamentals', '5. Applied Domains'],
    exactOnly: true,
  },
  {
    oldSegments: ['5. Specialized Applications', '1. System Design (Caches, LRU, etc.)'],
    newSegments: [
      '0. Computer Science Fundamentals',
      '5. Applied Domains',
      '1. Systems Design & Architecture',
    ],
  },
  {
    oldSegments: ['5. Specialized Applications', '2. Database & Indexing (B+ Trees, LSM Trees)'],
    newSegments: [
      '0. Computer Science Fundamentals',
      '5. Applied Domains',
      '2. Database & Indexing (B+ Trees, LSM Trees)',
    ],
  },
  {
    oldSegments: ['5. Specialized Applications', '3. OS & Kernel (Scheduling, Memory Mgmt)'],
    newSegments: [
      '0. Computer Science Fundamentals',
      '5. Applied Domains',
      '3. OS & Kernel (Scheduling, Memory Mgmt)',
    ],
  },
  {
    oldSegments: ['5. Specialized Applications', '4. Network & Distributed Algorithms'],
    newSegments: [
      '0. Computer Science Fundamentals',
      '5. Applied Domains',
      '4. Network & Distributed Algorithms',
    ],
  },
  {
    oldSegments: ['5. Specialized Applications', '5. Cryptography'],
    newSegments: ['0. Computer Science Fundamentals', '5. Applied Domains', '5. Cryptography'],
  },
  {
    oldSegments: ['5. Specialized Applications', '6. Game Development (Pathfinding, etc.)'],
    newSegments: [
      '0. Computer Science Fundamentals',
      '5. Applied Domains',
      '6. Game Development (Pathfinding, etc.)',
    ],
  },
  {
    oldSegments: ['5. Specialized Applications', '7. AI & ML (Search, GNNs, etc.)'],
    newSegments: [
      '0. Computer Science Fundamentals',
      '5. Applied Domains',
      '7. AI & ML (Search, GNNs, etc.)',
    ],
  },
  {
    oldSegments: ['5. Specialized Applications', '8. Blockchain (Merkle Trees, etc.)'],
    newSegments: [
      '0. Computer Science Fundamentals',
      '5. Applied Domains',
      '8. Blockchain (Merkle Trees, etc.)',
    ],
  },
  {
    oldSegments: ['5. Specialized Applications', '9. Bioinformatics (Suffix Arrays, etc.)'],
    newSegments: [
      '0. Computer Science Fundamentals',
      '5. Applied Domains',
      '9. Bioinformatics (Suffix Arrays, etc.)',
    ],
  },
]

export const kbRouteDefinitions: KbRouteDefinition[] = Object.entries(kbModuleFactories).map(
  ([filePath, factory]) => {
    const relativePath = filePath.slice(ROUTE_FILE_PREFIX.length).replace(/\/index\.(tsx|mdx)$/, '')
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
      factory: factory as KbModuleFactory,
    }
  },
)

export const kbOrderedRouteDefinitions: KbRouteDefinition[] = [...kbRouteDefinitions].sort(
  (left, right) => compareKbRouteSegments(left.segments, right.segments),
)

const kbRouteIndexByPath = new Map<string, number>()

kbOrderedRouteDefinitions.forEach((route, index) => {
  kbRouteIndexByPath.set(route.path, index)
  route.alternatePaths.forEach((alternatePath) => {
    kbRouteIndexByPath.set(alternatePath, index)
  })
})

export const getAdjacentKbRoutes = (pathname: string): AdjacentKbRoutes => {
  const currentIndex = kbRouteIndexByPath.get(pathname)

  if (currentIndex === undefined) {
    return { current: null, previous: null, next: null }
  }

  return {
    current: kbOrderedRouteDefinitions[currentIndex] ?? null,
    previous: kbOrderedRouteDefinitions[currentIndex - 1] ?? null,
    next: kbOrderedRouteDefinitions[currentIndex + 1] ?? null,
  }
}

export const kbLegacyRedirectEntries: LegacyRedirectEntry[] = (() => {
  const redirects = new Map<string, string>()
  const currentPaths = new Set(
    kbRouteDefinitions.flatMap(({ path, alternatePaths }) => [path, ...alternatePaths]),
  )

  legacyRouteMappings.forEach(({ oldSegments, newSegments, exactOnly = false }) => {
    kbRouteDefinitions.forEach(({ segments, path: redirectTarget }) => {
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
