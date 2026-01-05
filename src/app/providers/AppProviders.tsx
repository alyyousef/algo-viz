import { BrowserRouter, useLocation, useNavigate } from 'react-router-dom'

import { useEffect, useMemo, useRef, useState, type JSX, type ReactNode } from 'react'

export interface AppProvidersProps {
  children: ReactNode
}

const win95ContextMenuStyles = `
.win95-context-menu {
  position: fixed;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  padding: 2px;
  font-family: 'MS Sans Serif', 'Tahoma', sans-serif;
  font-size: 11px;
  color: #000;
  z-index: 9999;
  min-width: 180px;
}

.win95-context-menu__item {
  width: 100%;
  padding: 3px 18px 3px 8px;
  background: #C0C0C0;
  border: 0;
  text-align: left;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
}

.win95-context-menu__item:hover,
.win95-context-menu__item:focus {
  background: #000080;
  color: #fff;
}

.win95-context-menu__item:focus {
  outline: 1px dotted #fff;
  outline-offset: -3px;
}

.win95-context-menu__separator {
  height: 1px;
  background: #808080;
  margin: 2px 1px;
}
`

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
      const resolvedUrl = rawUrl
        ? new URL(rawUrl, window.location.origin).toString()
        : currentUrl
      event.preventDefault()
      event.stopPropagation()
      setMenuState({ open: true, x: event.clientX, y: event.clientY, url: resolvedUrl })
    }

    const handleClick = (event: MouseEvent) => {
      if (menuRef.current && event.target instanceof Node && menuRef.current.contains(event.target)) {
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
  }, [currentUrl])

  const handleOpenInNewTab = () => {
    window.open(menuState.url, '_blank', 'noopener,noreferrer')
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

  return (
    <>
      <style>{win95ContextMenuStyles}</style>
      {menuState.open ? (
        <div className="win95-context-menu" style={{ left, top }} ref={menuRef} role="menu">
          <button className="win95-context-menu__item" type="button" onClick={handleOpenInNewTab} role="menuitem">
            Open in new tab
          </button>
          <div className="win95-context-menu__separator" aria-hidden="true" />
          <button className="win95-context-menu__item" type="button" onClick={handleClose} role="menuitem">
            Cancel
          </button>
        </div>
      ) : null}
    </>
  )
}

function Win95ContextMenuProvider(): JSX.Element {
  const location = useLocation()
  const currentUrl = useMemo(() => {
    return `${window.location.origin}${location.pathname}${location.search}${location.hash}`
  }, [location])

  return <Win95ContextMenu currentUrl={currentUrl} />
}

function Win95ReturnHandler({ children }: AppProvidersProps): JSX.Element {
  const navigate = useNavigate()

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) {
        return
      }

      const control = target.closest('.win95-control')
      if (!control) {
        return
      }

      const label = control.getAttribute('aria-label')
      if (label && label !== 'Close window' && label !== 'Return') {
        return
      }

      event.preventDefault()
      event.stopPropagation()

      const historyState = window.history.state as { idx?: number } | null
      if (historyState?.idx && historyState.idx > 0) {
        navigate(-1)
      } else {
        navigate('/algoViz')
      }
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
      <Win95ReturnHandler>{children}</Win95ReturnHandler>
    </BrowserRouter>
  )
}
