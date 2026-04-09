import type { NavigateFunction } from 'react-router-dom'

export const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

interface HistoryState {
  idx?: number
}

export interface MinimizedHelpTask {
  id: string
  title: string
  url: string
  kind: 'help'
}

export const readMinimizedHelpTasks = (): MinimizedHelpTask[] => {
  const raw = window.localStorage.getItem(MINIMIZED_HELP_TASKS_KEY)
  if (!raw) {
    return []
  }

  try {
    const parsed = JSON.parse(raw) as unknown
    return Array.isArray(parsed) ? (parsed as MinimizedHelpTask[]) : []
  } catch {
    return []
  }
}

export const writeMinimizedHelpTasks = (tasks: MinimizedHelpTask[]): void => {
  window.localStorage.setItem(MINIMIZED_HELP_TASKS_KEY, JSON.stringify(tasks))
}

export const upsertMinimizedHelpTask = (task: MinimizedHelpTask): void => {
  const existing = readMinimizedHelpTasks()
  writeMinimizedHelpTasks([...existing.filter((entry) => entry.id !== task.id), task])
}

export const navigateToDesktopOrHistory = (navigate: NavigateFunction): void => {
  const historyState = window.history.state as HistoryState | null
  if (historyState?.idx && historyState.idx > 0) {
    void navigate(-1)
    return
  }

  void navigate('/algoViz')
}
