import { beforeEach, describe, expect, it } from 'vitest'

import {
  desktopSearchEntries,
  extractSearchSnippet,
  replaceDesktopSearchEntries,
  searchDesktopEntries,
} from './desktopSearch'

const fixtures = [
  {
    id: './routes/KB/binary.mdx',
    title: 'Binary Search',
    breadcrumb: 'Core Algorithms / Sorting & Searching',
    route: '/kb/2-core-algorithms/1-sorting-and-searching/binary-search',
    routeLabel: 'kb/2-core-algorithms/1-sorting-and-searching/binary-search',
    matchText: 'binary search core algorithms sorting searching midpoint',
    body: 'Compare the midpoint and discard half the remaining range.',
  },
  {
    id: './routes/KB/dqn.mdx',
    title: 'DQN',
    breadcrumb: '33. Reinforcement Learning',
    route: '/kb/33-reinforcement-learning/dqn',
    routeLabel: 'kb/33-reinforcement-learning/dqn',
    matchText: 'dqn reinforcement learning actor critic vs policy gradient replay',
    body: 'Actor critic vs policy gradient is a common interview contrast. Replay buffers stabilize DQN.',
  },
]

describe('searchDesktopEntries', () => {
  beforeEach(() => {
    replaceDesktopSearchEntries(fixtures)
  })

  it('returns the full list when no query is provided', () => {
    expect(searchDesktopEntries('')).toHaveLength(desktopSearchEntries.length)
  })

  it('finds route matches by topic name', () => {
    const [firstResult] = searchDesktopEntries('binary search', 5)

    expect(firstResult?.route).toBe('/kb/2-core-algorithms/1-sorting-and-searching/binary-search')
  })

  it('matches across breadcrumb labels, not just page titles', () => {
    const results = searchDesktopEntries('core algorithms sorting', 5)

    expect(results.some((entry) => entry.route.includes('binary-search'))).toBe(true)
  })

  it('matches phrases that only appear in the page body', () => {
    const results = searchDesktopEntries('actor critic vs policy gradient', 5)

    expect(results[0]?.route).toBe('/kb/33-reinforcement-learning/dqn')
    expect(results[0]?.snippet).toMatch(/actor critic vs policy gradient/i)
  })
})

describe('extractSearchSnippet', () => {
  it('centers the snippet on the first matching token', () => {
    const snippet = extractSearchSnippet(
      'Replay buffers stabilize DQN. Actor critic vs policy gradient is a common contrast.',
      ['actor', 'critic'],
    )

    expect(snippet).toMatch(/actor critic/i)
  })
})
