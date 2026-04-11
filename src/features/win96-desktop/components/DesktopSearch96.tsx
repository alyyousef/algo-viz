import {
  useCallback,
  useDeferredValue,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type JSX,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react'

import { desktopSearchEntries, searchDesktopEntries } from '../utils/desktopSearch'

interface DesktopSearch96Props {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onNavigate: (route: string) => void
}

interface ScrollMetrics {
  clientHeight: number
  scrollHeight: number
  scrollTop: number
}

const SCROLL_BUTTON_STEP = 64
const MIN_THUMB_HEIGHT = 24

const isEditableTarget = (target: EventTarget | null): boolean => {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  return Boolean(target.closest('input, textarea, select, [contenteditable="true"]'))
}

const eventPathIncludes = (event: Pick<PointerEvent, 'composedPath'>, element: Element | null) => {
  if (!element || typeof event.composedPath !== 'function') {
    return false
  }

  return event.composedPath().includes(element)
}

const isSearchInteraction = (
  event: Pick<PointerEvent, 'target' | 'composedPath'>,
  searchRoot: HTMLDivElement | null,
): boolean => {
  const target = event.target
  if (target instanceof Node && searchRoot?.contains(target)) {
    return true
  }

  return eventPathIncludes(event, searchRoot)
}

const isTaskbarSearchInteraction = (event: Pick<PointerEvent, 'target' | 'composedPath'>) => {
  const target = event.target
  if (target instanceof Element && target.closest('.win96-taskbar__search-button')) {
    return true
  }

  return event
    .composedPath()
    .some(
      (entry) =>
        entry instanceof Element && entry.classList.contains('win96-taskbar__search-button'),
    )
}

export default function DesktopSearch96({
  isOpen,
  onOpenChange,
  onNavigate,
}: DesktopSearch96Props): JSX.Element | null {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const deferredQuery = useDeferredValue(query)
  const searchRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const resultsViewportRef = useRef<HTMLDivElement | null>(null)
  const scrollbarTrackRef = useRef<HTMLDivElement | null>(null)
  const dragStateRef = useRef<{ pointerId: number; offsetY: number } | null>(null)
  const listboxId = useId()
  const [scrollMetrics, setScrollMetrics] = useState<ScrollMetrics>({
    clientHeight: 0,
    scrollHeight: 0,
    scrollTop: 0,
  })

  const results = useMemo(() => searchDesktopEntries(deferredQuery), [deferredQuery])
  const activeResult = results[activeIndex] ?? null
  const canScroll = scrollMetrics.scrollHeight > scrollMetrics.clientHeight + 1
  const maxScrollTop = Math.max(scrollMetrics.scrollHeight - scrollMetrics.clientHeight, 0)
  const thumbHeight = canScroll
    ? Math.max(
        MIN_THUMB_HEIGHT,
        Math.round(
          (scrollMetrics.clientHeight / Math.max(scrollMetrics.scrollHeight, 1)) *
            scrollMetrics.clientHeight,
        ),
      )
    : 0
  const maxThumbOffset = Math.max(scrollMetrics.clientHeight - thumbHeight, 0)
  const thumbOffset = canScroll
    ? Math.round((scrollMetrics.scrollTop / Math.max(maxScrollTop, 1)) * maxThumbOffset)
    : 0
  const handleSelectRoute = useCallback(
    (route: string) => {
      onNavigate(route)
      onOpenChange(false)
    },
    [onNavigate, onOpenChange],
  )
  const syncScrollMetrics = useCallback(() => {
    const viewport = resultsViewportRef.current
    if (!viewport) {
      return
    }

    setScrollMetrics({
      clientHeight: viewport.clientHeight,
      scrollHeight: viewport.scrollHeight,
      scrollTop: viewport.scrollTop,
    })
  }, [])

  const scrollResultsBy = useCallback((delta: number) => {
    resultsViewportRef.current?.scrollBy({ top: delta, behavior: 'auto' })
  }, [])

  const scrollResultsTo = useCallback((top: number) => {
    const viewport = resultsViewportRef.current
    if (!viewport) {
      return
    }

    viewport.scrollTop = Math.max(0, Math.min(top, viewport.scrollHeight - viewport.clientHeight))
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isShortcut = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k'
      if (isShortcut) {
        event.preventDefault()
        onOpenChange(true)
        return
      }

      if (isOpen && event.key === 'Escape') {
        event.preventDefault()
        onOpenChange(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onOpenChange])

  useEffect(() => {
    if (!isOpen) {
      setQuery('')
      setActiveIndex(0)
      setScrollMetrics({
        clientHeight: 0,
        scrollHeight: 0,
        scrollTop: 0,
      })
      return
    }

    inputRef.current?.focus()
    inputRef.current?.select()
  }, [isOpen])

  useLayoutEffect(() => {
    if (!isOpen) {
      return
    }

    syncScrollMetrics()
  }, [isOpen, results, syncScrollMetrics])

  useEffect(() => {
    setActiveIndex((current) => {
      if (results.length === 0) {
        return 0
      }

      return Math.min(current, results.length - 1)
    })
  }, [results])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const viewport = resultsViewportRef.current
    if (!viewport) {
      return
    }

    const handleScroll = () => syncScrollMetrics()
    const resizeObserver =
      typeof ResizeObserver === 'undefined'
        ? null
        : new ResizeObserver(() => {
            syncScrollMetrics()
          })

    viewport.addEventListener('scroll', handleScroll, { passive: true })
    resizeObserver?.observe(viewport)

    return () => {
      viewport.removeEventListener('scroll', handleScroll)
      resizeObserver?.disconnect()
    }
  }, [isOpen, syncScrollMetrics])

  useEffect(() => {
    if (!isOpen || !results.length) {
      return
    }

    document.getElementById(`${listboxId}-${activeIndex}`)?.scrollIntoView({ block: 'nearest' })
    syncScrollMetrics()
  }, [activeIndex, isOpen, listboxId, results.length, syncScrollMetrics])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const listenerOptions: AddEventListenerOptions = { capture: true }

    const handlePointerDown = (event: PointerEvent) => {
      if (isSearchInteraction(event, searchRef.current) || isTaskbarSearchInteraction(event)) {
        return
      }

      onOpenChange(false)
    }

    window.addEventListener('pointerdown', handlePointerDown, listenerOptions)
    return () => window.removeEventListener('pointerdown', handlePointerDown, listenerOptions)
  }, [isOpen, onOpenChange])

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const dragState = dragStateRef.current
      const track = scrollbarTrackRef.current
      if (!dragState || dragState.pointerId !== event.pointerId || !track || !canScroll) {
        return
      }

      event.preventDefault()
      const trackRect = track.getBoundingClientRect()
      const nextThumbTop = Math.min(
        Math.max(event.clientY - trackRect.top - dragState.offsetY, 0),
        maxThumbOffset,
      )
      const nextScrollTop =
        maxThumbOffset === 0 ? 0 : (nextThumbTop / maxThumbOffset) * maxScrollTop

      scrollResultsTo(nextScrollTop)
    }

    const handlePointerUp = (event: PointerEvent) => {
      if (dragStateRef.current?.pointerId !== event.pointerId) {
        return
      }

      dragStateRef.current = null
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [canScroll, maxScrollTop, maxThumbOffset, scrollResultsTo])

  const handleScrollbarTrackPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!canScroll || !scrollbarTrackRef.current) {
      return
    }

    const trackRect = scrollbarTrackRef.current.getBoundingClientRect()
    const targetThumbTop = Math.min(
      Math.max(event.clientY - trackRect.top - thumbHeight / 2, 0),
      maxThumbOffset,
    )
    const nextScrollTop =
      maxThumbOffset === 0 ? 0 : (targetThumbTop / maxThumbOffset) * maxScrollTop

    scrollResultsTo(nextScrollTop)
  }

  const handleThumbPointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (!canScroll || !scrollbarTrackRef.current) {
      return
    }

    event.preventDefault()
    event.stopPropagation()

    const trackRect = scrollbarTrackRef.current.getBoundingClientRect()
    dragStateRef.current = {
      pointerId: event.pointerId,
      offsetY: event.clientY - trackRect.top - thumbOffset,
    }
  }

  const handleSearchInputKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((current) => Math.min(current + 1, Math.max(results.length - 1, 0)))
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((current) => Math.max(current - 1, 0))
      return
    }

    if (event.key === 'Home') {
      event.preventDefault()
      setActiveIndex(0)
      return
    }

    if (event.key === 'End') {
      event.preventDefault()
      setActiveIndex(Math.max(results.length - 1, 0))
      return
    }

    if (event.key === 'Enter' && activeResult) {
      event.preventDefault()
      handleSelectRoute(activeResult.route)
      return
    }

    if (event.key === 'k' && (event.ctrlKey || event.metaKey) && !isEditableTarget(event.target)) {
      event.preventDefault()
      inputRef.current?.select()
    }
  }

  if (!isOpen) {
    return null
  }

  return (
    <div ref={searchRef} className="win96-search" role="dialog" aria-label="Desktop search">
      <div className="win96-search__titlebar">
        <div className="win96-search__titlecopy">
          <span className="win96-search__title">Route Search</span>
          <span className="win96-search__shortcut">Ctrl/Cmd+K</span>
        </div>
        <button
          type="button"
          className="win96-search__close"
          aria-label="Close search"
          onClick={() => onOpenChange(false)}
        >
          x
        </button>
      </div>
      <div className="win96-search__body">
        <label className="win96-search__label" htmlFor={`${listboxId}-query`}>
          Search or scroll all {desktopSearchEntries.length} DSA routes
        </label>
        <input
          id={`${listboxId}-query`}
          ref={inputRef}
          type="text"
          className="win96-search__input"
          placeholder="Type a topic, domain, or route fragment, or scroll the full list"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={handleSearchInputKeyDown}
          role="combobox"
          aria-expanded="true"
          aria-controls={listboxId}
          aria-activedescendant={activeResult ? `${listboxId}-${activeIndex}` : undefined}
        />
        <div className="win96-search__meta">
          <span>Enter opens the selected page</span>
          <span>
            {query.trim() ? `${results.length} matches` : `${results.length} pages`} available
          </span>
        </div>
        <div className="win96-search__results-shell">
          <div
            ref={resultsViewportRef}
            className="win96-search__results-viewport"
            role="listbox"
            id={listboxId}
          >
            <div className="win96-search__results">
              {results.length === 0 ? (
                <div className="win96-search__empty">No routes match this search.</div>
              ) : (
                results.map((result, index) => {
                  const isActive = index === activeIndex
                  return (
                    <button
                      key={result.id}
                      id={`${listboxId}-${index}`}
                      type="button"
                      className={`win96-search__result${isActive ? ' win96-search__result--active' : ''}`}
                      role="option"
                      aria-selected={isActive}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => handleSelectRoute(result.route)}
                    >
                      <span className="win96-search__result-title">{result.title}</span>
                      <span className="win96-search__result-breadcrumb">{result.breadcrumb}</span>
                      <span className="win96-search__result-route">{result.routeLabel}</span>
                    </button>
                  )
                })
              )}
            </div>
          </div>
          <div className="win96-search__scrollbar" aria-hidden="true">
            <button
              type="button"
              className="win96-search__scroll-button win96-search__scroll-button--up"
              onClick={() => scrollResultsBy(-SCROLL_BUTTON_STEP)}
              disabled={!canScroll || scrollMetrics.scrollTop <= 0}
              tabIndex={-1}
            />
            <div
              ref={scrollbarTrackRef}
              className="win96-search__scroll-track"
              onPointerDown={handleScrollbarTrackPointerDown}
            >
              <button
                type="button"
                className="win96-search__scroll-thumb"
                style={
                  canScroll
                    ? {
                        height: `${thumbHeight}px`,
                        transform: `translateY(${thumbOffset}px)`,
                      }
                    : undefined
                }
                onPointerDown={handleThumbPointerDown}
                disabled={!canScroll}
                tabIndex={-1}
              />
            </div>
            <button
              type="button"
              className="win96-search__scroll-button win96-search__scroll-button--down"
              onClick={() => scrollResultsBy(SCROLL_BUTTON_STEP)}
              disabled={!canScroll || scrollMetrics.scrollTop >= maxScrollTop}
              tabIndex={-1}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
