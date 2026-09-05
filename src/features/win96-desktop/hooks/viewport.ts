export const COMPACT_VIEWPORT_WIDTH = 768
export const COMPACT_VIEWPORT_HEIGHT = 700

export const isCompactViewport = (
  width = typeof window === 'undefined' ? 1440 : window.innerWidth,
  height = typeof window === 'undefined' ? 900 : window.innerHeight,
): boolean => width < COMPACT_VIEWPORT_WIDTH || height < COMPACT_VIEWPORT_HEIGHT

export interface DesktopCanvasMetrics {
  scale: number
  logicalWidth: number
  logicalHeight: number
  outerWidth: number
  outerHeight: number
}

interface ComputeDesktopCanvasMetricsOptions {
  viewportWidth: number
  viewportHeight: number
  taskbarHeight: number
  designWidth: number
  designHeight: number
  mobileWidth: number
  mobileHeight: number
  mobileBreakpoint: number
}

const safeScale = (value: number): number => (Number.isFinite(value) && value > 0 ? value : 1)

/**
 * Fits the 1440×900 (or mobile) design density to the viewport, then sizes the
 * logical canvas so the scaled result still fills the area above the taskbar.
 * That keeps icons from looking zoomed-in on laptops while maximize can cover
 * the full visible desktop.
 */
export const computeDesktopCanvasMetrics = ({
  viewportWidth,
  viewportHeight,
  taskbarHeight,
  designWidth,
  designHeight,
  mobileWidth,
  mobileHeight,
  mobileBreakpoint,
}: ComputeDesktopCanvasMetricsOptions): DesktopCanvasMetrics => {
  const availableHeight = Math.max(viewportHeight - taskbarHeight, 0)
  const isMobile = viewportWidth < mobileBreakpoint

  if (isMobile) {
    const scale = safeScale(
      Math.min(viewportWidth / mobileWidth, availableHeight / mobileHeight, 1),
    )
    return {
      scale,
      logicalWidth: mobileWidth,
      logicalHeight: mobileHeight,
      outerWidth: Math.max(1, Math.round(mobileWidth * scale)),
      outerHeight: Math.max(1, Math.round(mobileHeight * scale)),
    }
  }

  const scale = safeScale(Math.min(viewportWidth / designWidth, availableHeight / designHeight, 1))
  const logicalWidth = Math.max(1, Math.round(viewportWidth / scale))
  const logicalHeight = Math.max(1, Math.round(availableHeight / scale))

  return {
    scale,
    logicalWidth,
    logicalHeight,
    outerWidth: Math.max(1, Math.round(logicalWidth * scale)),
    outerHeight: Math.max(1, Math.round(logicalHeight * scale)),
  }
}
