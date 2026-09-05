import { useEffect, useRef } from 'react'

import { computeDesktopCanvasMetrics } from './viewport'

import type { RefObject } from 'react'

interface UseViewportScaleOptions {
  desktopWidth: number
  desktopHeight: number
  mobileWidth: number
  mobileHeight: number
  mobileBreakpoint: number
}

interface UseViewportScaleRefs {
  /** Root element used to read the CSS taskbar-height custom property. */
  rootRef: RefObject<HTMLDivElement | null>
  /** Sized to the visible desktop after scale. */
  outerRef: RefObject<HTMLDivElement | null>
  /** Logical canvas; CSS scale maps it onto `outerRef`. */
  scaleRef: RefObject<HTMLDivElement | null>
}

const FALLBACK_TASKBAR_HEIGHT = 28

/**
 * Scales the Win96 design density to the viewport, then expands the logical
 * canvas so maximized windows still fill the visible desktop.
 */
export function useViewportScale({
  desktopWidth,
  desktopHeight,
  mobileWidth,
  mobileHeight,
  mobileBreakpoint,
}: UseViewportScaleOptions): UseViewportScaleRefs {
  const rootRef = useRef<HTMLDivElement>(null)
  const outerRef = useRef<HTMLDivElement>(null)
  const scaleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const getViewportSize = () => {
      const viewport = window.visualViewport
      return {
        width: viewport?.width ?? window.innerWidth,
        height: viewport?.height ?? window.innerHeight,
      }
    }

    const getTaskbarHeight = (): number => {
      if (!rootRef.current) {
        return FALLBACK_TASKBAR_HEIGHT
      }

      const rawValue = window
        .getComputedStyle(rootRef.current)
        .getPropertyValue('--win96-taskbar-total-height')
        .trim()
      const parsedValue = Number.parseFloat(rawValue)
      return Number.isFinite(parsedValue) ? parsedValue : FALLBACK_TASKBAR_HEIGHT
    }

    const applyScale = () => {
      const viewport = getViewportSize()
      const metrics = computeDesktopCanvasMetrics({
        viewportWidth: viewport.width,
        viewportHeight: viewport.height,
        taskbarHeight: getTaskbarHeight(),
        designWidth: desktopWidth,
        designHeight: desktopHeight,
        mobileWidth,
        mobileHeight,
        mobileBreakpoint,
      })

      if (outerRef.current) {
        outerRef.current.style.width = `${metrics.outerWidth}px`
        outerRef.current.style.height = `${metrics.outerHeight}px`
      }

      if (scaleRef.current) {
        scaleRef.current.style.width = `${metrics.logicalWidth}px`
        scaleRef.current.style.height = `${metrics.logicalHeight}px`
        scaleRef.current.style.transform = metrics.scale === 1 ? 'none' : `scale(${metrics.scale})`
      }
    }

    applyScale()
    window.addEventListener('resize', applyScale)
    window.addEventListener('orientationchange', applyScale)
    window.visualViewport?.addEventListener('resize', applyScale)
    window.visualViewport?.addEventListener('scroll', applyScale)

    return () => {
      window.removeEventListener('resize', applyScale)
      window.removeEventListener('orientationchange', applyScale)
      window.visualViewport?.removeEventListener('resize', applyScale)
      window.visualViewport?.removeEventListener('scroll', applyScale)
    }
  }, [desktopWidth, desktopHeight, mobileWidth, mobileHeight, mobileBreakpoint])

  return { rootRef, outerRef, scaleRef }
}
