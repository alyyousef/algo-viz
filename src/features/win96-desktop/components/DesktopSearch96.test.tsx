// @vitest-environment jsdom

import { act, useState, type JSX } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import DesktopSearch96 from './DesktopSearch96'
import { desktopSearchEntries, replaceDesktopSearchEntries } from '../utils/desktopSearch'

const searchFixtures = [
  {
    id: 'binary',
    title: 'Binary Search',
    breadcrumb: 'Core Algorithms',
    route: '/kb/binary-search',
    routeLabel: 'kb/binary-search',
    matchText: 'binary search core algorithms',
  },
  {
    id: 'yolo',
    title: 'YOLO',
    breadcrumb: '32. Computer Vision',
    route: '/kb/32-computer-vision/yolo',
    routeLabel: 'kb/32-computer-vision/yolo',
    matchText: 'yolo computer vision',
  },
]

class ResizeObserverMock {
  observe(): void {}

  disconnect(): void {}

  unobserve(): void {}
}

function SearchHarness({ onNavigate }: { onNavigate: (route: string) => void }): JSX.Element {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div>
      <button type="button" data-testid="outside">
        Outside
      </button>
      <DesktopSearch96 isOpen={isOpen} onOpenChange={setIsOpen} onNavigate={onNavigate} />
    </div>
  )
}

describe('DesktopSearch96', () => {
  let container: HTMLDivElement
  let root: Root
  let scrollIntoViewMock: ReturnType<typeof vi.fn>

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
    root = createRoot(container)

    scrollIntoViewMock = vi.fn()
    Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
      configurable: true,
      value: scrollIntoViewMock,
    })

    vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true)
    vi.stubGlobal('ResizeObserver', ResizeObserverMock)
    replaceDesktopSearchEntries(searchFixtures)
  })

  afterEach(() => {
    act(() => {
      root.unmount()
    })
    container.remove()
    vi.unstubAllGlobals()
  })

  it('shows the full route list by default when opened', () => {
    act(() => {
      root.render(<SearchHarness onNavigate={vi.fn()} />)
    })

    expect(container.querySelectorAll('.win96-search__result')).toHaveLength(
      desktopSearchEntries.length,
    )
  })

  it('stays open when clicking inside the popup and closes on outside pointer down', () => {
    act(() => {
      root.render(<SearchHarness onNavigate={vi.fn()} />)
    })

    const searchBody = container.querySelector('.win96-search__body')
    expect(searchBody).not.toBeNull()

    act(() => {
      searchBody?.dispatchEvent(new Event('pointerdown', { bubbles: true, composed: true }))
    })

    expect(container.querySelector('.win96-search')).not.toBeNull()

    const outsideButton = container.querySelector('[data-testid="outside"]')
    expect(outsideButton).not.toBeNull()

    act(() => {
      outsideButton?.dispatchEvent(new Event('pointerdown', { bubbles: true, composed: true }))
    })

    expect(container.querySelector('.win96-search')).toBeNull()
  })

  it('navigates and closes when a result is selected', () => {
    const onNavigate = vi.fn()

    act(() => {
      root.render(<SearchHarness onNavigate={onNavigate} />)
    })

    const firstResult = container.querySelector<HTMLButtonElement>('.win96-search__result')
    expect(firstResult).not.toBeNull()

    act(() => {
      firstResult?.click()
    })

    expect(onNavigate).toHaveBeenCalledTimes(1)
    expect(onNavigate).toHaveBeenCalledWith(desktopSearchEntries[0]?.route)
    expect(container.querySelector('.win96-search')).toBeNull()
  })
})
