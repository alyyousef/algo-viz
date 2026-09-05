import { describe, expect, it } from 'vitest'

import { formatKbBreadcrumb, formatKbSegment, formatKbTitle } from './labels'

describe('formatKbSegment', () => {
  it('strips numbered section prefixes', () => {
    expect(formatKbSegment('32. Computer Vision')).toBe('Computer Vision')
    expect(formatKbSegment('3.1 Paradigms')).toBe('Paradigms')
  })

  it('leaves unnumbered names alone', () => {
    expect(formatKbSegment('YOLO')).toBe('YOLO')
    expect(formatKbSegment('monoids)')).toBe('monoids)')
  })
})

describe('formatKbBreadcrumb', () => {
  it('joins the raw folder trail', () => {
    expect(formatKbBreadcrumb(['32. Computer Vision', 'YOLO'])).toBe('32. Computer Vision \\ YOLO')
  })
})

describe('formatKbTitle', () => {
  it('uses the cleaned last segment', () => {
    expect(formatKbTitle(['32. Computer Vision', 'Image classification'])).toBe(
      'Image classification',
    )
  })
})
