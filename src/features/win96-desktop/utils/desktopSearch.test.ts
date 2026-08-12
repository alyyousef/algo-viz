import { describe, expect, it } from 'vitest'

import { kbRouteDefinitions } from '@/features/kb/routeManifest'

import { desktopSearchEntries, searchDesktopEntries } from './desktopSearch'

describe('desktopSearchEntries', () => {
  it('creates one searchable entry per DSA route', () => {
    expect(desktopSearchEntries).toHaveLength(kbRouteDefinitions.length)
  })

  it('strips numeric prefixes from the display title', () => {
    const binarySearch = desktopSearchEntries.find(
      (entry) => entry.route === '/kb/2-core-algorithms/1-sorting-and-searching/binary-search',
    )

    expect(binarySearch).toMatchObject({
      title: 'Binary Search',
      breadcrumb: 'Core Algorithms / Sorting & Searching',
    })
  })
})

describe('searchDesktopEntries', () => {
  it('returns the full route list when no query is provided', () => {
    expect(searchDesktopEntries('')).toHaveLength(desktopSearchEntries.length)
  })

  it('finds route matches by topic name', () => {
    const [firstResult] = searchDesktopEntries('binary search', 5)

    expect(firstResult?.route).toBe('/kb/2-core-algorithms/1-sorting-and-searching/binary-search')
  })

  it('matches across breadcrumb labels, not just page titles', () => {
    const results = searchDesktopEntries('applied domains os kernel', 5)

    expect(
      results.some((entry) => entry.route.includes('/5-applied-domains/3-os-and-kernel')),
    ).toBe(true)
  })
})
