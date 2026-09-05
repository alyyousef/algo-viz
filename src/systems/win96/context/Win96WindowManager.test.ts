import { beforeEach, describe, expect, it, vi } from 'vitest'

import { INITIAL_STATE, reduceManager } from '@/systems/win96/context/Win96WindowManager'

import type { FolderWindowState, WindowState } from '@/systems/win96/context/Win96WindowManager'

// ---------------------------------------------------------------------------
// Module mocks
// ---------------------------------------------------------------------------

vi.mock('@/data/algoviz-explorer', () => ({
  explorerIndex: {
    root: { id: 'root', name: 'AlgoViz', kind: 'folder', children: [] },
    map: new Map(),
  },
  getExplorerNode: vi.fn(),
  getExplorerChildren: vi.fn(() => []),
}))

const { getExplorerNode } = await import('@/data/algoviz-explorer')
const mockGetExplorerNode = vi.mocked(getExplorerNode)

// ---------------------------------------------------------------------------
// Test helpers
// ---------------------------------------------------------------------------

/** Build a minimal FolderWindowState for seeding state */
function makeFolderWindow(overrides: Partial<FolderWindowState> = {}): FolderWindowState {
  return {
    id: 'win-1',
    kind: 'folder',
    nodeId: 'folder:algorithms',
    title: 'Algorithms',
    isMinimized: false,
    zIndex: 11,
    path: ['root', 'folder:algorithms'],
    history: [],
    forwardHistory: [],
    initialPosition: { x: 160, y: 120 },
    ...overrides,
  }
}

function stateWithWindow(win: WindowState) {
  return {
    ...INITIAL_STATE,
    windows: [win],
    activeWindowId: win.id,
    zCounter: 11,
  }
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('reduceManager', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // -------------------------------------------------------------------------
  // FOCUS_WINDOW
  // -------------------------------------------------------------------------
  describe('FOCUS_WINDOW', () => {
    it('sets activeWindowId and bumps zIndex', () => {
      const win = makeFolderWindow({ id: 'win-1', zIndex: 11 })
      const state = stateWithWindow(win)

      const next = reduceManager(state, { type: 'FOCUS_WINDOW', windowId: 'win-1' })

      expect(next.activeWindowId).toBe('win-1')
      expect(next.windows[0]?.zIndex).toBeGreaterThan(11)
    })

    it('does not change other windows zIndex', () => {
      const win1 = makeFolderWindow({ id: 'win-1', zIndex: 11 })
      const win2 = makeFolderWindow({ id: 'win-2', zIndex: 12 })
      const state = { ...INITIAL_STATE, windows: [win1, win2], zCounter: 12 }

      const next = reduceManager(state, { type: 'FOCUS_WINDOW', windowId: 'win-1' })

      const nextWin2 = next.windows.find((w) => w.id === 'win-2')
      expect(nextWin2?.zIndex).toBe(12)
    })
  })

  // -------------------------------------------------------------------------
  // CLOSE_WINDOW
  // -------------------------------------------------------------------------
  describe('CLOSE_WINDOW', () => {
    it('removes the window from the list', () => {
      const win = makeFolderWindow()
      const state = stateWithWindow(win)

      const next = reduceManager(state, { type: 'CLOSE_WINDOW', windowId: 'win-1' })

      expect(next.windows).toHaveLength(0)
    })

    it('clears activeWindowId when the active window is closed', () => {
      const win = makeFolderWindow()
      const state = { ...stateWithWindow(win), activeWindowId: 'win-1' }

      const next = reduceManager(state, { type: 'CLOSE_WINDOW', windowId: 'win-1' })

      expect(next.activeWindowId).toBeUndefined()
    })

    it('preserves activeWindowId when a different window is closed', () => {
      const win1 = makeFolderWindow({ id: 'win-1' })
      const win2 = makeFolderWindow({ id: 'win-2' })
      const state = {
        ...INITIAL_STATE,
        windows: [win1, win2],
        activeWindowId: 'win-1',
        zCounter: 12,
      }

      const next = reduceManager(state, { type: 'CLOSE_WINDOW', windowId: 'win-2' })

      expect(next.activeWindowId).toBe('win-1')
      expect(next.windows).toHaveLength(1)
    })

    it('is a no-op for unknown windowId', () => {
      const state = INITIAL_STATE
      const next = reduceManager(state, { type: 'CLOSE_WINDOW', windowId: 'ghost' })
      expect(next.windows).toHaveLength(0)
    })
  })

  // -------------------------------------------------------------------------
  // MINIMIZE_WINDOW
  // -------------------------------------------------------------------------
  describe('MINIMIZE_WINDOW', () => {
    it('sets isMinimized to true', () => {
      const win = makeFolderWindow({ isMinimized: false })
      const state = stateWithWindow(win)

      const next = reduceManager(state, { type: 'MINIMIZE_WINDOW', windowId: 'win-1' })

      expect(next.windows[0]?.isMinimized).toBe(true)
    })

    it('clears activeWindowId', () => {
      const win = makeFolderWindow()
      const state = { ...stateWithWindow(win), activeWindowId: 'win-1' }

      const next = reduceManager(state, { type: 'MINIMIZE_WINDOW', windowId: 'win-1' })

      expect(next.activeWindowId).toBeUndefined()
    })
  })

  // -------------------------------------------------------------------------
  // RESTORE_WINDOW
  // -------------------------------------------------------------------------
  describe('RESTORE_WINDOW', () => {
    it('sets isMinimized to false and focuses the window', () => {
      const win = makeFolderWindow({ isMinimized: true })
      const state = { ...stateWithWindow(win), activeWindowId: undefined }

      const next = reduceManager(state, { type: 'RESTORE_WINDOW', windowId: 'win-1' })

      expect(next.windows[0]?.isMinimized).toBe(false)
      expect(next.activeWindowId).toBe('win-1')
    })
  })

  // -------------------------------------------------------------------------
  // NAVIGATE_BACK
  // -------------------------------------------------------------------------
  describe('NAVIGATE_BACK', () => {
    it('pops from history and pushes current path to forwardHistory', () => {
      const previousPath = ['root', 'folder:fundamentals']
      const win = makeFolderWindow({
        path: ['root', 'folder:algorithms'],
        history: [previousPath],
        forwardHistory: [],
      })
      const state = stateWithWindow(win)

      const mockEntry = {
        node: {
          id: 'folder:fundamentals',
          name: 'Fundamentals',
          kind: 'folder' as const,
          children: [],
        },
        parentId: 'root',
        pathEntries: [],
      }
      mockGetExplorerNode.mockReturnValue(mockEntry)

      const next = reduceManager(state, { type: 'NAVIGATE_BACK', windowId: 'win-1' })

      const nextWin = next.windows[0] as FolderWindowState
      expect(nextWin.path).toEqual(previousPath)
      expect(nextWin.history).toHaveLength(0)
      expect(nextWin.forwardHistory).toEqual([['root', 'folder:algorithms']])
    })

    it('is a no-op when history is empty', () => {
      const win = makeFolderWindow({ history: [], forwardHistory: [] })
      const state = stateWithWindow(win)

      const next = reduceManager(state, { type: 'NAVIGATE_BACK', windowId: 'win-1' })

      const nextWin = next.windows[0] as FolderWindowState
      expect(nextWin.path).toEqual(win.path)
    })
  })

  // -------------------------------------------------------------------------
  // NAVIGATE_FORWARD
  // -------------------------------------------------------------------------
  describe('NAVIGATE_FORWARD', () => {
    it('pops from forwardHistory and pushes current path to history', () => {
      const forwardPath = ['root', 'folder:algorithms', 'folder:sorting']
      const win = makeFolderWindow({
        path: ['root', 'folder:algorithms'],
        history: [],
        forwardHistory: [forwardPath],
      })
      const state = stateWithWindow(win)

      const mockEntry = {
        node: { id: 'folder:sorting', name: 'Sorting', kind: 'folder' as const, children: [] },
        parentId: 'folder:algorithms',
        pathEntries: [],
      }
      mockGetExplorerNode.mockReturnValue(mockEntry)

      const next = reduceManager(state, { type: 'NAVIGATE_FORWARD', windowId: 'win-1' })

      const nextWin = next.windows[0] as FolderWindowState
      expect(nextWin.path).toEqual(forwardPath)
      expect(nextWin.forwardHistory).toHaveLength(0)
      expect(nextWin.history).toEqual([['root', 'folder:algorithms']])
    })

    it('is a no-op when forwardHistory is empty', () => {
      const win = makeFolderWindow({ forwardHistory: [] })
      const state = stateWithWindow(win)

      const next = reduceManager(state, { type: 'NAVIGATE_FORWARD', windowId: 'win-1' })

      const nextWin = next.windows[0] as FolderWindowState
      expect(nextWin.path).toEqual(win.path)
    })
  })

  // -------------------------------------------------------------------------
  // NAVIGATE_UP
  // -------------------------------------------------------------------------
  describe('NAVIGATE_UP', () => {
    it('moves to the parent folder', () => {
      const win = makeFolderWindow({
        path: ['root', 'folder:algorithms', 'folder:sorting'],
        history: [],
        forwardHistory: [],
      })
      const state = stateWithWindow(win)

      const mockEntry = {
        node: {
          id: 'folder:algorithms',
          name: 'Algorithms',
          kind: 'folder' as const,
          children: [],
        },
        parentId: 'root',
        pathEntries: [],
      }
      mockGetExplorerNode.mockReturnValue(mockEntry)

      const next = reduceManager(state, { type: 'NAVIGATE_UP', windowId: 'win-1' })

      const nextWin = next.windows[0] as FolderWindowState
      expect(nextWin.path).toEqual(['root', 'folder:algorithms'])
      expect(nextWin.nodeId).toBe('folder:algorithms')
    })

    it('is a no-op at the root level (path length 1)', () => {
      const win = makeFolderWindow({ path: ['root'] })
      const state = stateWithWindow(win)

      const next = reduceManager(state, { type: 'NAVIGATE_UP', windowId: 'win-1' })

      const nextWin = next.windows[0] as FolderWindowState
      expect(nextWin.path).toEqual(['root'])
    })
  })

  // -------------------------------------------------------------------------
  // Unknown action (default branch)
  // -------------------------------------------------------------------------
  describe('OPEN_TOPIC_WINDOW', () => {
    it('opens a topic window', () => {
      const next = reduceManager(INITIAL_STATE, {
        type: 'OPEN_TOPIC_WINDOW',
        route: '/kb/32-computer-vision/yolo',
        title: 'YOLO',
      })

      expect(next.windows).toHaveLength(1)
      expect(next.windows[0]).toMatchObject({
        kind: 'topic',
        route: '/kb/32-computer-vision/yolo',
        title: 'YOLO',
      })
      expect(next.activeWindowId).toBe(next.windows[0]?.id)
    })

    it('reuses the existing topic window instead of opening a second one', () => {
      const opened = reduceManager(INITIAL_STATE, {
        type: 'OPEN_TOPIC_WINDOW',
        route: '/kb/32-computer-vision/yolo',
        title: 'YOLO',
      })
      const next = reduceManager(opened, {
        type: 'OPEN_TOPIC_WINDOW',
        route: '/kb/32-computer-vision/cnns',
        title: 'CNNs',
      })

      expect(next.windows).toHaveLength(1)
      expect(next.windows[0]).toMatchObject({
        kind: 'topic',
        route: '/kb/32-computer-vision/cnns',
        title: 'CNNs',
        isMinimized: false,
      })
    })
  })

  describe('unknown action', () => {
    it('returns state unchanged', () => {
      const state = stateWithWindow(makeFolderWindow())
      // @ts-expect-error — intentionally testing the default branch
      const next = reduceManager(state, { type: 'UNKNOWN_ACTION' })
      expect(next).toBe(state)
    })
  })
})
