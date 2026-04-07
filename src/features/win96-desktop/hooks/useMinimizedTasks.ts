import { useEffect, useState } from 'react'

export interface MinimizedHelpTask {
  id: string
  title: string
  url: string
  kind: 'help'
}

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const readTasks = (): MinimizedHelpTask[] => {
  const raw = window.localStorage.getItem(MINIMIZED_HELP_TASKS_KEY)
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw) as MinimizedHelpTask[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

/**
 * Manages the list of DSA topic pages that have been minimised from their
 * full-page view back to the desktop taskbar.
 *
 * State is persisted in localStorage and kept in sync across tabs via the
 * `storage` event so that minimising from a topic page updates the desktop
 * taskbar without a full reload.
 */
export function useMinimizedTasks() {
  const [tasks, setTasks] = useState<MinimizedHelpTask[]>(readTasks)

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === MINIMIZED_HELP_TASKS_KEY) {
        setTasks(readTasks())
      }
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const removeTask = (id: string) => {
    setTasks((prev) => {
      const next = prev.filter((task) => task.id !== id)
      window.localStorage.setItem(MINIMIZED_HELP_TASKS_KEY, JSON.stringify(next))
      return next
    })
  }

  return { tasks, removeTask }
}
