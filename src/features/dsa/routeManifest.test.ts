import { describe, expect, it } from 'vitest'

import { dsaLegacyRedirectEntries, dsaRouteDefinitions } from '@/features/dsa/routeManifest'

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
