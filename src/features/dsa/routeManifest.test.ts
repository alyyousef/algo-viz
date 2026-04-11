import { describe, expect, it } from 'vitest'

import {
  dsaLegacyRedirectEntries,
  dsaOrderedRouteDefinitions,
  dsaRouteDefinitions,
  getAdjacentDsaRoutes,
} from '@/features/dsa/routeManifest'

describe('dsaRouteDefinitions', () => {
  it('builds route paths from DSA route files', () => {
    const primitiveTypesRoute = dsaRouteDefinitions.find(
      (route) => route.filePath === './routes/DSA/0. Fundamentals/1. Primitive Types/index.tsx',
    )

    expect(primitiveTypesRoute).toMatchObject({
      segments: ['0. Fundamentals', '1. Primitive Types'],
      path: '/dsa/0-fundamentals/1-primitive-types',
      alternatePaths: [],
    })
  })

  it('adds ampersandless alternate paths for segments that contain "&"', () => {
    const languagesRoute = dsaRouteDefinitions.find(
      (route) => route.filePath === './routes/DSA/0. Languages & Ecosystems/index.tsx',
    )

    expect(languagesRoute?.path).toBe('/dsa/0-languages-and-ecosystems')
    expect(languagesRoute?.alternatePaths).toEqual(['/dsa/0-languages-ecosystems'])
  })

  it('does not generate duplicate public paths', () => {
    const publicPaths = dsaRouteDefinitions.flatMap(({ path, alternatePaths }) => [
      path,
      ...alternatePaths,
    ])

    expect(new Set(publicPaths).size).toBe(publicPaths.length)
  })

  it('orders sibling pages using natural numeric route order', () => {
    const paradigmChildren = dsaOrderedRouteDefinitions
      .filter(({ segments }) => segments[0] === '3. Algorithmic Paradigms' && segments.length === 2)
      .map(({ path }) => path)

    expect(paradigmChildren).toEqual([
      '/dsa/3-algorithmic-paradigms/1-brute-force',
      '/dsa/3-algorithmic-paradigms/2-divide-and-conquer',
      '/dsa/3-algorithmic-paradigms/3-greedy-algorithms',
      '/dsa/3-algorithmic-paradigms/4-dynamic-programming',
      '/dsa/3-algorithmic-paradigms/5-backtracking',
      '/dsa/3-algorithmic-paradigms/6-randomized-algorithms',
      '/dsa/3-algorithmic-paradigms/7-branch-and-bound',
      '/dsa/3-algorithmic-paradigms/8-meet-in-the-middle',
      '/dsa/3-algorithmic-paradigms/9-two-pointers-and-sliding-window',
      '/dsa/3-algorithmic-paradigms/10-greedy-proof-techniques-exchange-argument',
    ])
  })
})

describe('getAdjacentDsaRoutes', () => {
  it('returns the previous and next route for a topic page', () => {
    expect(
      getAdjacentDsaRoutes('/dsa/3-algorithmic-paradigms/9-two-pointers-sliding-window'),
    ).toMatchObject({
      previous: { path: '/dsa/3-algorithmic-paradigms/8-meet-in-the-middle' },
      next: { path: '/dsa/3-algorithmic-paradigms/10-greedy-proof-techniques-exchange-argument' },
    })
  })

  it('recognizes alternate paths when resolving the current route', () => {
    expect(getAdjacentDsaRoutes('/dsa/0-languages-ecosystems').current?.path).toBe(
      '/dsa/0-languages-and-ecosystems',
    )
  })

  it('omits missing neighbors at the ends of the sequence', () => {
    const firstPath = dsaOrderedRouteDefinitions[0]?.path
    const lastPath = dsaOrderedRouteDefinitions.at(-1)?.path

    expect(firstPath).toBeDefined()
    expect(lastPath).toBeDefined()
    expect(getAdjacentDsaRoutes(firstPath ?? '')).toMatchObject({ previous: null })
    expect(getAdjacentDsaRoutes(lastPath ?? '')).toMatchObject({ next: null })
  })
})

describe('dsaLegacyRedirectEntries', () => {
  it('maps legacy language routes to the new language and ecosystem routes', () => {
    expect(dsaLegacyRedirectEntries).toContainEqual({
      from: '/dsa/0-programming-languages',
      to: '/dsa/0-languages-and-ecosystems',
    })

    expect(dsaLegacyRedirectEntries).toContainEqual({
      from: '/dsa/0-programming-languages/abstraction-level',
      to: '/dsa/0-languages-and-ecosystems/language-levels',
    })
  })

  it('avoids collisions with current routes', () => {
    const currentPaths = new Set(
      dsaRouteDefinitions.flatMap(({ path, alternatePaths }) => [path, ...alternatePaths]),
    )

    dsaLegacyRedirectEntries.forEach(({ from, to }) => {
      expect(currentPaths.has(from)).toBe(false)
      expect(currentPaths.has(to)).toBe(true)
    })
  })

  it('does not emit duplicate redirects', () => {
    const redirectKeys = dsaLegacyRedirectEntries.map(({ from, to }) => `${from}->${to}`)

    expect(new Set(redirectKeys).size).toBe(redirectKeys.length)
  })
})
