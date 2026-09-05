import { describe, expect, it } from 'vitest'

import { slugifySegment } from './slug'

describe('slugifySegment', () => {
  it('keeps C and C++ on different paths', () => {
    expect(slugifySegment('C')).toBe('c')
    expect(slugifySegment('C++')).toBe('c-plus-plus')
  })

  it('keeps B-trees and B+ trees on different paths', () => {
    expect(slugifySegment('B-trees')).toBe('b-trees')
    expect(slugifySegment('B+ trees')).toBe('b-plus-trees')
  })
})
