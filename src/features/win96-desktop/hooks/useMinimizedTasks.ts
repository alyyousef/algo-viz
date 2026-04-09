import { useEffect, useState } from 'react'

import {
  MINIMIZED_HELP_TASKS_KEY,
  readMinimizedHelpTasks,
  writeMinimizedHelpTasks,
  type MinimizedHelpTask,
} from '@/features/dsa/utils/topicPageState'

/**
 * Manages the list of DSA topic pages that have been minimised from their
 * full-page view back to the desktop taskbar.
 *
 * State is persisted in localStorage and kept in sync across tabs via the
 * `storage` event so that minimising from a topic page updates the desktop
 * taskbar without a full reload.
 */
export function useMinimizedTasks() {
  const [tasks, setTasks] = useState<MinimizedHelpTask[]>(readMinimizedHelpTasks)

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === MINIMIZED_HELP_TASKS_KEY) {
        setTasks(readMinimizedHelpTasks())
      }
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const removeTask = (id: string) => {
    setTasks((prev) => {
      const next = prev.filter((task) => task.id !== id)
      writeMinimizedHelpTasks(next)
      return next
    })
  }

  return { tasks, removeTask }
}
