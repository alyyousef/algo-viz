import {
  type CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState,
  type JSX,
  type ReactNode,
} from 'react'
import { BrowserRouter, useLocation, useNavigate } from 'react-router-dom'

import { navigateToDesktopOrHistory } from '@/features/dsa/utils/topicPageState'

export interface AppProvidersProps {
  children: ReactNode
}

interface Win95ContextMenuState {
  open: boolean
  x: number
  y: number
  url: string
}

function Win95ContextMenu({ currentUrl }: { currentUrl: string }): JSX.Element {
  const [menuState, setMenuState] = useState<Win95ContextMenuState>({
    open: false,
    x: 0,
    y: 0,
    url: currentUrl,
  })
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null
      const contextElement = target?.closest('[data-context-url]')
      const rawUrl = contextElement?.getAttribute('data-context-url')?.trim()
      if (!rawUrl) {
        return
      }

      const resolvedUrl = new URL(rawUrl, window.location.origin).toString()
      event.preventDefault()
      event.stopPropagation()
      setMenuState({ open: true, x: event.clientX, y: event.clientY, url: resolvedUrl })
    }

    const handleClick = (event: MouseEvent) => {
      if (
        menuRef.current &&
        event.target instanceof Node &&
        menuRef.current.contains(event.target)
      ) {
        return
      }

      setMenuState((prev) => (prev.open ? { ...prev, open: false } : prev))
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuState((prev) => (prev.open ? { ...prev, open: false } : prev))
      }
    }

    const handleDismiss = () => {
      setMenuState((prev) => (prev.open ? { ...prev, open: false } : prev))
    }

    document.addEventListener('contextmenu', handleContextMenu, true)
    document.addEventListener('click', handleClick, true)
    document.addEventListener('keydown', handleKeyDown, true)
    window.addEventListener('scroll', handleDismiss, true)
    window.addEventListener('resize', handleDismiss)

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu, true)
      document.removeEventListener('click', handleClick, true)
      document.removeEventListener('keydown', handleKeyDown, true)
      window.removeEventListener('scroll', handleDismiss, true)
      window.removeEventListener('resize', handleDismiss)
    }
  }, [])

  const handleOpenInNewTab = () => {
    window.open(menuState.url || currentUrl, '_blank', 'noopener,noreferrer')
    setMenuState((prev) => ({ ...prev, open: false }))
  }

  const handleClose = () => {
    setMenuState((prev) => ({ ...prev, open: false }))
  }

  const menuWidth = 200
  const menuHeight = 56
  const maxX = typeof window !== 'undefined' ? window.innerWidth - menuWidth - 6 : menuState.x
  const maxY = typeof window !== 'undefined' ? window.innerHeight - menuHeight - 6 : menuState.y
  const left = Math.max(6, Math.min(menuState.x, maxX))
  const top = Math.max(6, Math.min(menuState.y, maxY))

  return menuState.open ? (
    <div
      className="win95-context-menu"
      style={{ '--menu-left': `${left}px`, '--menu-top': `${top}px` } as CSSProperties}
      ref={menuRef}
      role="menu"
    >
      <button
        className="win95-context-menu__item"
        type="button"
        onClick={handleOpenInNewTab}
        role="menuitem"
      >
        Open in new tab
      </button>
      <div className="win95-context-menu__separator" aria-hidden="true" />
      <button
        className="win95-context-menu__item"
        type="button"
        onClick={handleClose}
        role="menuitem"
      >
        Cancel
      </button>
    </div>
  ) : (
    <></>
  )
}

function Win95ContextMenuProvider(): JSX.Element {
  const location = useLocation()
  const currentUrl = useMemo(
    () => `${window.location.origin}${location.pathname}${location.search}${location.hash}`,
    [location],
  )

  return <Win95ContextMenu currentUrl={currentUrl} />
}

function GlobalWatermark(): JSX.Element | null {
  const { pathname } = useLocation()
  if (pathname === '/algoViz') {
    return null
  }

  return (
    <img
      src="/transparentTextBlack.png"
      alt=""
      aria-hidden="true"
      draggable={false}
      className="global-watermark"
    />
  )
}

function Win95ReturnHandler({ children }: AppProvidersProps): JSX.Element {
  const navigate = useNavigate()

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) {
        return
      }

      const explicitControl = target.closest('[data-return-target="history-or-desktop"]')
      const legacyControl = explicitControl ? null : target.closest('.win95-control')
      if (!explicitControl && !legacyControl) {
        return
      }

      if (legacyControl) {
        const label = legacyControl.getAttribute('aria-label')
        if (label && label !== 'Close window' && label !== 'Return') {
          return
        }
      }

      event.preventDefault()
      event.stopPropagation()
      navigateToDesktopOrHistory(navigate)
    }

    document.addEventListener('click', handleClick, true)
    return () => {
      document.removeEventListener('click', handleClick, true)
    }
  }, [navigate])

  return <>{children}</>
}

export default function AppProviders({ children }: AppProvidersProps): JSX.Element {
  return (
    <BrowserRouter>
      <Win95ContextMenuProvider />
      <GlobalWatermark />
      <Win95ReturnHandler>{children}</Win95ReturnHandler>
    </BrowserRouter>
  )
}
