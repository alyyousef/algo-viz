import { describe, expect, it } from 'vitest'

import {
  kbLegacyRedirectEntries,
  kbOrderedRouteDefinitions,
  kbRouteDefinitions,
  getAdjacentKbRoutes,
} from '@/features/kb/routeManifest'

describe('kbRouteDefinitions', () => {
  it('builds route paths from DSA route files', () => {
    const primitiveTypesRoute = kbRouteDefinitions.find(
      (route) => route.filePath === './routes/KB/0. Fundamentals/1. Primitive Types/index.tsx',
    )

    expect(primitiveTypesRoute).toMatchObject({
      segments: ['0. Fundamentals', '1. Primitive Types'],
      path: '/kb/0-fundamentals/1-primitive-types',
      alternatePaths: [],
    })
  })

  it('adds ampersandless alternate paths for segments that contain "&"', () => {
    const languagesRoute = kbRouteDefinitions.find(
      (route) => route.filePath === './routes/KB/0. Languages & Ecosystems/index.tsx',
    )

    expect(languagesRoute?.path).toBe('/kb/0-languages-and-ecosystems')
    expect(languagesRoute?.alternatePaths).toEqual(['/kb/0-languages-ecosystems'])
  })

  it('does not generate duplicate public paths', () => {
    const publicPaths = kbRouteDefinitions.flatMap(({ path, alternatePaths }) => [
      path,
      ...alternatePaths,
    ])

    expect(new Set(publicPaths).size).toBe(publicPaths.length)
  })

  it('orders sibling pages using natural numeric route order', () => {
    const paradigmChildren = kbOrderedRouteDefinitions
      .filter(({ segments }) => segments[0] === '3. Algorithmic Paradigms' && segments.length === 2)
      .map(({ path }) => path)

    expect(paradigmChildren).toEqual([
      '/kb/3-algorithmic-paradigms/1-brute-force',
      '/kb/3-algorithmic-paradigms/2-divide-and-conquer',
      '/kb/3-algorithmic-paradigms/3-greedy-algorithms',
      '/kb/3-algorithmic-paradigms/4-dynamic-programming',
      '/kb/3-algorithmic-paradigms/5-backtracking',
      '/kb/3-algorithmic-paradigms/6-randomized-algorithms',
      '/kb/3-algorithmic-paradigms/7-branch-and-bound',
      '/kb/3-algorithmic-paradigms/8-meet-in-the-middle',
      '/kb/3-algorithmic-paradigms/9-two-pointers-and-sliding-window',
      '/kb/3-algorithmic-paradigms/10-greedy-proof-techniques-exchange-argument',
    ])
  })
})

describe('getAdjacentKbRoutes', () => {
  it('returns the previous and next route for a topic page', () => {
    expect(
      getAdjacentKbRoutes('/kb/3-algorithmic-paradigms/9-two-pointers-sliding-window'),
    ).toMatchObject({
      previous: { path: '/kb/3-algorithmic-paradigms/8-meet-in-the-middle' },
      next: { path: '/kb/3-algorithmic-paradigms/10-greedy-proof-techniques-exchange-argument' },
    })
  })

  it('recognizes alternate paths when resolving the current route', () => {
    expect(getAdjacentKbRoutes('/kb/0-languages-ecosystems').current?.path).toBe(
      '/kb/0-languages-and-ecosystems',
    )
  })

  it('omits missing neighbors at the ends of the sequence', () => {
    const firstPath = kbOrderedRouteDefinitions[0]?.path
    const lastPath = kbOrderedRouteDefinitions.at(-1)?.path

    expect(firstPath).toBeDefined()
    expect(lastPath).toBeDefined()
    expect(getAdjacentKbRoutes(firstPath ?? '')).toMatchObject({ previous: null })
    expect(getAdjacentKbRoutes(lastPath ?? '')).toMatchObject({ next: null })
  })
})

describe('kbLegacyRedirectEntries', () => {
  it('maps legacy language routes to the new language and ecosystem routes', () => {
    expect(kbLegacyRedirectEntries).toContainEqual({
      from: '/kb/0-programming-languages',
      to: '/kb/0-languages-and-ecosystems',
    })

    expect(kbLegacyRedirectEntries).toContainEqual({
      from: '/kb/0-programming-languages/abstraction-level',
      to: '/kb/0-languages-and-ecosystems/language-levels',
    })
  })

  it('avoids collisions with current routes', () => {
    const currentPaths = new Set(
      kbRouteDefinitions.flatMap(({ path, alternatePaths }) => [path, ...alternatePaths]),
    )

    kbLegacyRedirectEntries.forEach(({ from, to }) => {
      expect(currentPaths.has(from)).toBe(false)
      expect(currentPaths.has(to)).toBe(true)
    })
  })

  it('does not emit duplicate redirects', () => {
    const redirectKeys = kbLegacyRedirectEntries.map(({ from, to }) => `${from}->${to}`)

    expect(new Set(redirectKeys).size).toBe(redirectKeys.length)
  })
})
