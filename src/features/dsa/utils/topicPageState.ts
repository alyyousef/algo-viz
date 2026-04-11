import type { NavigateFunction } from 'react-router-dom'

interface HistoryState {
  idx?: number
}

export const navigateToDesktopOrHistory = (navigate: NavigateFunction): void => {
  const historyState = window.history.state as HistoryState | null
  if (historyState?.idx && historyState.idx > 0) {
    void navigate(-1)
    return
  }

  void navigate('/algoViz')
}
