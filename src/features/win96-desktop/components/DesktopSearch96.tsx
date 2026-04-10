import {
  useDeferredValue,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type JSX,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react'

import { desktopSearchEntries, searchDesktopEntries } from '../utils/desktopSearch'

interface DesktopSearch96Props {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onNavigate: (route: string) => void
}

const isEditableTarget = (target: EventTarget | null): boolean => {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  return Boolean(target.closest('input, textarea, select, [contenteditable="true"]'))
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
  const listboxId = useId()

  const results = useMemo(() => searchDesktopEntries(deferredQuery, 10), [deferredQuery])
  const activeResult = results[activeIndex] ?? null

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
      return
    }

    inputRef.current?.focus()
    inputRef.current?.select()
  }, [isOpen])

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

    const listenerOptions: AddEventListenerOptions = { capture: true }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target
      if (
        !(target instanceof Node) ||
        searchRef.current?.contains(target) ||
        (target instanceof Element && target.closest('.win96-taskbar__search-button'))
      ) {
        return
      }

      onOpenChange(false)
    }

    window.addEventListener('pointerdown', handlePointerDown, listenerOptions)
    return () => window.removeEventListener('pointerdown', handlePointerDown, listenerOptions)
  }, [isOpen, onOpenChange])

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
      onOpenChange(false)
      onNavigate(activeResult.route)
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
          Search all {desktopSearchEntries.length} DSA routes
        </label>
        <input
          id={`${listboxId}-query`}
          ref={inputRef}
          type="text"
          className="win96-search__input"
          placeholder="Type a topic, domain, or route fragment"
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
          <span>Arrow keys move through matches</span>
        </div>
        <div className="win96-search__results" role="listbox" id={listboxId}>
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
                  onClick={() => {
                    onOpenChange(false)
                    onNavigate(result.route)
                  }}
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
    </div>
  )
}
