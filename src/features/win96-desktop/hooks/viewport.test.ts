import { describe, expect, it } from 'vitest'

import { computeDesktopCanvasMetrics, isCompactViewport } from './viewport'

describe('isCompactViewport', () => {
  it('treats phones and short laptop viewports as compact', () => {
    expect(isCompactViewport(390, 844)).toBe(true)
    expect(isCompactViewport(1366, 650)).toBe(true)
  })

  it('leaves typical laptop and desktop screens in windowed mode', () => {
    expect(isCompactViewport(1366, 768)).toBe(false)
    expect(isCompactViewport(1440, 900)).toBe(false)
  })
})

describe('computeDesktopCanvasMetrics', () => {
  const desktop = {
    designWidth: 1440,
    designHeight: 900,
    mobileWidth: 480,
    mobileHeight: 800,
    mobileBreakpoint: 768,
    taskbarHeight: 28,
  }

  it('scales a short laptop down from the 1440×900 design and still fills the desktop', () => {
    const metrics = computeDesktopCanvasMetrics({
      ...desktop,
      viewportWidth: 1366,
      viewportHeight: 768,
    })

    expect(metrics.scale).toBeCloseTo(740 / 900, 5)
    expect(metrics.outerWidth).toBe(1366)
    expect(metrics.outerHeight).toBe(740)
    expect(metrics.logicalWidth * metrics.scale).toBeCloseTo(1366, 0)
    expect(metrics.logicalHeight * metrics.scale).toBeCloseTo(740, 0)
  })

  it('keeps a large 1440×900-or-bigger display at 1× and fills the viewport', () => {
    const metrics = computeDesktopCanvasMetrics({
      ...desktop,
      viewportWidth: 1920,
      viewportHeight: 1080,
    })

    expect(metrics.scale).toBe(1)
    expect(metrics.logicalWidth).toBe(1920)
    expect(metrics.logicalHeight).toBe(1052)
    expect(metrics.outerWidth).toBe(1920)
    expect(metrics.outerHeight).toBe(1052)
  })
})
