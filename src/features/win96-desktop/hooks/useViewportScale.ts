import { useEffect, useRef } from 'react'

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
  /** Sized to match the scaled logical canvas exactly. */
  outerRef: RefObject<HTMLDivElement | null>
  /** Holds the full logical canvas and receives the CSS scale transform. */
  scaleRef: RefObject<HTMLDivElement | null>
}

const FALLBACK_TASKBAR_HEIGHT = 28

/**
 * Drives the CSS-transform scaling of the fixed-size logical desktop canvas
 * to fit the current viewport. Updates on window and visualViewport resize/scroll
 * events and reads `--win96-taskbar-total-height` from the root element to
 * subtract the taskbar from the available height.
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
      const isMobile = viewport.width < mobileBreakpoint
      const baseW = isMobile ? mobileWidth : Math.max(desktopWidth, viewport.width)
      const baseH = isMobile ? mobileHeight : desktopHeight
      const availableHeight = Math.max(viewport.height - getTaskbarHeight(), 0)
      const widthScale = viewport.width / baseW
      const heightScale = availableHeight / baseH
      const nextScale = Math.min(widthScale, heightScale, 1)
      const scale = Number.isFinite(nextScale) ? nextScale : 1

      if (outerRef.current) {
        outerRef.current.style.width = `${Math.round(baseW * scale)}px`
        outerRef.current.style.height = `${Math.round(baseH * scale)}px`
      }

      if (scaleRef.current) {
        scaleRef.current.style.width = `${baseW}px`
        scaleRef.current.style.height = `${baseH}px`
        scaleRef.current.style.transform = `scale(${scale})`
      }
    }

    applyScale()
    window.addEventListener('resize', applyScale)
    window.visualViewport?.addEventListener('resize', applyScale)
    window.visualViewport?.addEventListener('scroll', applyScale)

    return () => {
      window.removeEventListener('resize', applyScale)
      window.visualViewport?.removeEventListener('resize', applyScale)
      window.visualViewport?.removeEventListener('scroll', applyScale)
    }
  }, [desktopWidth, desktopHeight, mobileWidth, mobileHeight, mobileBreakpoint])

  return { rootRef, outerRef, scaleRef }
}
