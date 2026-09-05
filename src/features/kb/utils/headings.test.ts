import { describe, expect, it } from 'vitest'

import { collectHeadingText, slugifyHeading } from './headings'

describe('slugifyHeading', () => {
  it('builds url-safe ids from section titles', () => {
    expect(slugifyHeading('5. Interview Prep')).toBe('5-interview-prep')
    expect(slugifyHeading('Deep Dive & Mechanics')).toBe('deep-dive-mechanics')
  })
})

describe('collectHeadingText', () => {
  it('flattens nested text nodes', () => {
    expect(collectHeadingText(['1. ', 'Overview'])).toBe('1. Overview')
  })
})
