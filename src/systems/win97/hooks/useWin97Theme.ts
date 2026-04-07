import { useCallback, useMemo, useSyncExternalStore } from 'react'

const STORAGE_KEY = 'win97-theme-enabled'
const THEME_CLASS = 'theme-win97'

const isBrowser = () => typeof window !== 'undefined' && typeof document !== 'undefined'

const readStoredPreference = (): boolean => {
  if (!isBrowser()) return false
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === null) return false
    return stored === 'true'
  } catch (error) {
    console.warn('Unable to read Win97 theme preference from localStorage.', error)
    return false
  }
}

// Module-level store — a single source of truth shared by all hook instances.
const listeners = new Set<() => void>()
let themeEnabled = readStoredPreference()

const applyThemeClass = (value: boolean) => {
  if (!isBrowser()) return
  const body = document.body
  if (!body) return
  body.classList.toggle(THEME_CLASS, value)
}

applyThemeClass(themeEnabled)

const persistPreference = (value: boolean) => {
  if (!isBrowser()) return
  try {
    window.localStorage.setItem(STORAGE_KEY, String(value))
  } catch (error) {
    console.warn('Unable to persist Win97 theme preference to localStorage.', error)
  }
}

const notifyListeners = () => {
  listeners.forEach((listener) => listener())
}

const setThemeEnabled = (value: boolean) => {
  if (themeEnabled === value) return
  themeEnabled = value
  applyThemeClass(value)
  persistPreference(value)
  notifyListeners()
}

if (isBrowser()) {
  const storageListener = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return
    const nextValue = event.newValue === 'true'
    if (themeEnabled === nextValue) return
    themeEnabled = nextValue
    applyThemeClass(nextValue)
    notifyListeners()
  }
  window.addEventListener('storage', storageListener)
}

// useSyncExternalStore-compatible interface.
const subscribe = (callback: () => void): (() => void) => {
  listeners.add(callback)
  return () => {
    listeners.delete(callback)
  }
}

const getSnapshot = (): boolean => themeEnabled

export interface UseWin97ThemeResult {
  enabled: boolean
  toggle: () => void
  enable: () => void
  disable: () => void
  setEnabled: (value: boolean) => void
}

export const useWin97Theme = (): UseWin97ThemeResult => {
  const enabled = useSyncExternalStore(subscribe, getSnapshot)

  const enable = useCallback(() => setThemeEnabled(true), [])
  const disable = useCallback(() => setThemeEnabled(false), [])
  const toggle = useCallback(() => setThemeEnabled(!themeEnabled), [])
  const setEnabled = useCallback((value: boolean) => setThemeEnabled(value), [])

  return useMemo(
    () => ({ enabled, toggle, enable, disable, setEnabled }),
    [disable, enable, enabled, setEnabled, toggle],
  )
}

export default useWin97Theme
