import { createContext, useCallback, useContext, useMemo, useReducer, type ReactNode } from 'react'

import {
  explorerIndex,
  getExplorerChildren,
  getExplorerNode,
  type ExplorerIndexEntry,
  type ExplorerNode,
} from '@/data/algoviz-explorer'

const { root } = explorerIndex

type WindowKind = 'folder' | 'visualization'

export interface BaseWindowState {
  id: string
  kind: WindowKind
  nodeId: string
  title: string
  isMinimized: boolean
  zIndex: number
  initialPosition: { x: number; y: number }
}

export interface FolderWindowState extends BaseWindowState {
  kind: 'folder'
  path: string[] // node ids from root to current node inclusive
  history: string[][]
  forwardHistory: string[][]
}

export interface VisualizationWindowState extends BaseWindowState {
  kind: 'visualization'
}

export type WindowState = FolderWindowState | VisualizationWindowState

interface ManagerState {
  windows: WindowState[]
  activeWindowId?: string
  zCounter: number
  nextOffset: number
}

const INITIAL_STATE: ManagerState = {
  windows: [],
  zCounter: 10,
  nextOffset: 0,
}

type ManagerAction =
  | { type: 'OPEN_FOLDER_WINDOW'; nodeId: string }
  | { type: 'OPEN_VISUALIZATION_WINDOW'; nodeId: string }
  | { type: 'FOCUS_WINDOW'; windowId: string }
  | { type: 'CLOSE_WINDOW'; windowId: string }
  | { type: 'MINIMIZE_WINDOW'; windowId: string }
  | { type: 'RESTORE_WINDOW'; windowId: string }
  | { type: 'NAVIGATE_TO_CHILD'; windowId: string; nodeId: string }
  | { type: 'NAVIGATE_BACK'; windowId: string }
  | { type: 'NAVIGATE_FORWARD'; windowId: string }
  | { type: 'NAVIGATE_UP'; windowId: string }

const createWindowId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `win-${Math.random().toString(36).slice(2)}`
}

const makePosition = (offset: number) => ({
  x: 160 + offset,
  y: 120 + offset,
})

const bumpZIndex = (state: ManagerState): [ManagerState, number] => {
  const nextZ = state.zCounter + 1
  return [{ ...state, zCounter: nextZ }, nextZ]
}

const withFocusedWindow = (state: ManagerState, windowId: string): ManagerState => {
  const [, newZ] = bumpZIndex(state)
  return {
    ...state,
    windows: state.windows.map((win) =>
      win.id === windowId
        ? {
            ...win,
            zIndex: newZ,
          }
        : win,
    ),
    activeWindowId: windowId,
    zCounter: newZ,
  }
}

const reduceManager = (state: ManagerState, action: ManagerAction): ManagerState => {
  switch (action.type) {
    case 'OPEN_FOLDER_WINDOW': {
      const entry = getExplorerNode(action.nodeId)
      if (!entry || entry.node.kind !== 'folder') {
        return state
      }

      const existing = state.windows.find(
        (win) => win.kind === 'folder' && win.nodeId === action.nodeId,
      )

      if (existing) {
        const baseState = existing.isMinimized
          ? {
              ...state,
              windows: state.windows.map((win) =>
                win.id === existing.id
                  ? {
                      ...win,
                      isMinimized: false,
                    }
                  : win,
              ),
            }
          : state

        return withFocusedWindow(baseState, existing.id)
      }

      const windowId = createWindowId()
      const offset = (state.nextOffset + 24) % 72
      const [nextState, zIndex] = bumpZIndex({ ...state, nextOffset: offset })
      const pathIds = entry.pathEntries.map((node) => node.id)
      const initialHistory = pathIds.length > 1 ? [pathIds.slice(0, -1)] : []

      const newWindow: FolderWindowState = {
        id: windowId,
        kind: 'folder',
        nodeId: action.nodeId,
        title: entry.node.name,
        isMinimized: false,
        zIndex,
        path: pathIds,
        history: initialHistory,
        forwardHistory: [],
        initialPosition: makePosition(offset),
      }

      return {
        ...nextState,
        windows: [...nextState.windows, newWindow],
        activeWindowId: windowId,
      }
    }

    case 'OPEN_VISUALIZATION_WINDOW': {
      const entry = getExplorerNode(action.nodeId)
      if (!entry || entry.node.kind !== 'visualization') {
        return state
      }

      const windowId = createWindowId()
      const offset = (state.nextOffset + 24) % 72
      const [nextState, zIndex] = bumpZIndex({ ...state, nextOffset: offset })

      const newWindow: VisualizationWindowState = {
        id: windowId,
        kind: 'visualization',
        nodeId: action.nodeId,
        title: entry.node.name,
        isMinimized: false,
        zIndex,
        initialPosition: makePosition(offset),
      }

      return {
        ...nextState,
        windows: [...nextState.windows, newWindow],
        activeWindowId: windowId,
      }
    }

    case 'FOCUS_WINDOW':
      return withFocusedWindow(state, action.windowId)

    case 'CLOSE_WINDOW':
      return {
        ...state,
        windows: state.windows.filter((win) => win.id !== action.windowId),
        activeWindowId: state.activeWindowId === action.windowId ? undefined : state.activeWindowId,
      }

    case 'MINIMIZE_WINDOW':
      return {
        ...state,
        windows: state.windows.map((win) =>
          win.id === action.windowId
            ? {
                ...win,
                isMinimized: true,
              }
            : win,
        ),
        activeWindowId: state.activeWindowId === action.windowId ? undefined : state.activeWindowId,
      }

    case 'RESTORE_WINDOW':
      return withFocusedWindow(
        {
          ...state,
          windows: state.windows.map((win) =>
            win.id === action.windowId
              ? {
                  ...win,
                  isMinimized: false,
                }
              : win,
          ),
        },
        action.windowId,
      )

    case 'NAVIGATE_TO_CHILD': {
      const entry = getExplorerNode(action.nodeId)
      if (!entry || entry.node.kind !== 'folder') {
        return state
      }

      return {
        ...state,
        windows: state.windows.map((win) => {
          if (win.id !== action.windowId || win.kind !== 'folder') {
            return win
          }

          const currentPath = [...win.path]
          return {
            ...win,
            nodeId: action.nodeId,
            title: entry.node.name,
            path: entry.pathEntries.map((node) => node.id),
            history: [...win.history, currentPath],
            forwardHistory: [],
          }
        }),
      }
    }

    case 'NAVIGATE_BACK':
      return {
        ...state,
        windows: state.windows.map((win) => {
          if (win.id !== action.windowId || win.kind !== 'folder') {
            return win
          }

          const history = [...win.history]
          const previous = history.pop()
          if (!previous) {
            return win
          }

          const targetId = previous[previous.length - 1]
          if (!targetId) {
            return win
          }
          const entry = getExplorerNode(targetId)
          if (!entry) {
            return win
          }

          return {
            ...win,
            nodeId: targetId,
            title: entry.node.name,
            path: [...previous],
            history,
            forwardHistory: [...win.forwardHistory, [...win.path]],
          }
        }),
      }

    case 'NAVIGATE_FORWARD':
      return {
        ...state,
        windows: state.windows.map((win) => {
          if (win.id !== action.windowId || win.kind !== 'folder') {
            return win
          }

          const forwardHistory = [...win.forwardHistory]
          const next = forwardHistory.pop()
          if (!next) {
            return win
          }

          const targetId = next[next.length - 1]
          if (!targetId) {
            return win
          }
          const entry = getExplorerNode(targetId)
          if (!entry) {
            return win
          }

          return {
            ...win,
            nodeId: targetId,
            title: entry.node.name,
            path: [...next],
            history: [...win.history, [...win.path]],
            forwardHistory,
          }
        }),
      }

    case 'NAVIGATE_UP':
      return {
        ...state,
        windows: state.windows.map((win) => {
          if (win.id !== action.windowId || win.kind !== 'folder') {
            return win
          }

          if (win.path.length <= 1) {
            return win
          }

          const parentPath = win.path.slice(0, -1)
          const targetId = parentPath[parentPath.length - 1]
          if (!targetId) {
            return win
          }
          const entry = getExplorerNode(targetId)
          if (!entry) {
            return win
          }

          return {
            ...win,
            nodeId: targetId,
            title: entry.node.name,
            path: parentPath,
            history: [...win.history, [...win.path]],
            forwardHistory: [],
          }
        }),
      }

    default:
      return state
  }
}

interface WindowManagerValue {
  windows: WindowState[]
  activeWindowId?: string
  rootFolders: ExplorerNode[]
  focusWindow: (windowId: string) => void
  closeWindow: (windowId: string) => void
  minimizeWindow: (windowId: string) => void
  restoreWindow: (windowId: string) => void
  toggleMinimize: (windowId: string) => void
  openFolderWindow: (nodeId: string) => void
  openVisualizationWindow: (nodeId: string) => void
  navigateToChild: (windowId: string, nodeId: string) => void
  navigateBack: (windowId: string) => void
  navigateForward: (windowId: string) => void
  navigateUp: (windowId: string) => void
  getPathEntries: (path: string[]) => ExplorerIndexEntry[]
  getChildren: (nodeId: string) => ExplorerNode[]
}

const Win96WindowManagerContext = createContext<WindowManagerValue | null>(null)

export interface Win96WindowManagerProviderProps {
  children: ReactNode
}

export const Win96WindowManagerProvider = ({ children }: Win96WindowManagerProviderProps) => {
  const [state, dispatch] = useReducer(reduceManager, INITIAL_STATE)

  const rootFolders = useMemo(() => root.children ?? [], [])

  const focusWindow = useCallback((windowId: string) => {
    dispatch({ type: 'FOCUS_WINDOW', windowId })
  }, [])

  const closeWindow = useCallback((windowId: string) => {
    dispatch({ type: 'CLOSE_WINDOW', windowId })
  }, [])

  const minimizeWindow = useCallback((windowId: string) => {
    dispatch({ type: 'MINIMIZE_WINDOW', windowId })
  }, [])

  const restoreWindow = useCallback((windowId: string) => {
    dispatch({ type: 'RESTORE_WINDOW', windowId })
  }, [])

  const toggleMinimize = useCallback(
    (windowId: string) => {
      const target = state.windows.find((win) => win.id === windowId)
      if (!target) {
        return
      }
      if (target.isMinimized) {
        dispatch({ type: 'RESTORE_WINDOW', windowId })
      } else {
        dispatch({ type: 'MINIMIZE_WINDOW', windowId })
      }
    },
    [state.windows],
  )

  const openFolderWindow = useCallback((nodeId: string) => {
    dispatch({ type: 'OPEN_FOLDER_WINDOW', nodeId })
  }, [])

  const openVisualizationWindow = useCallback((nodeId: string) => {
    dispatch({ type: 'OPEN_VISUALIZATION_WINDOW', nodeId })
  }, [])

  const navigateToChild = useCallback((windowId: string, nodeId: string) => {
    dispatch({ type: 'NAVIGATE_TO_CHILD', windowId, nodeId })
  }, [])

  const navigateBack = useCallback((windowId: string) => {
    dispatch({ type: 'NAVIGATE_BACK', windowId })
  }, [])

  const navigateForward = useCallback((windowId: string) => {
    dispatch({ type: 'NAVIGATE_FORWARD', windowId })
  }, [])

  const navigateUp = useCallback((windowId: string) => {
    dispatch({ type: 'NAVIGATE_UP', windowId })
  }, [])

  const getChildren = useCallback((nodeId: string) => getExplorerChildren(nodeId), [])

  const getPathEntries = useCallback((path: string[]) => {
    return path
      .map((id) => explorerIndex.map.get(id))
      .filter((entry): entry is ExplorerIndexEntry => Boolean(entry))
  }, [])

  const value = useMemo<WindowManagerValue>(
    () => ({
      windows: state.windows,
      activeWindowId: state.activeWindowId,
      rootFolders,
      focusWindow,
      closeWindow,
      minimizeWindow,
      restoreWindow,
      toggleMinimize,
      openFolderWindow,
      openVisualizationWindow,
      navigateToChild,
      navigateBack,
      navigateForward,
      navigateUp,
      getChildren,
      getPathEntries,
    }),
    [
      state.windows,
      state.activeWindowId,
      rootFolders,
      focusWindow,
      closeWindow,
      minimizeWindow,
      restoreWindow,
      toggleMinimize,
      openFolderWindow,
      openVisualizationWindow,
      navigateToChild,
      navigateBack,
      navigateForward,
      navigateUp,
      getChildren,
      getPathEntries,
    ],
  )

  return (
    <Win96WindowManagerContext.Provider value={value}>
      {children}
    </Win96WindowManagerContext.Provider>
  )
}

export const useWin96WindowManager = (): WindowManagerValue => {
  const ctx = useContext(Win96WindowManagerContext)
  if (!ctx) {
    throw new Error('useWin96WindowManager must be used within Win96WindowManagerProvider')
  }
  return ctx
}
