import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export interface TopicTab<T extends string = string> {
  id: T
  label: string
}

interface UseTopicTabsOptions<T extends string> {
  tabs: TopicTab<T>[]
  /** Page title shown in the browser tab, e.g. "Binary Search" */
  pageTitle: string
  defaultTab?: T
}

interface UseTopicTabsResult<T extends string> {
  activeTab: T
  setActiveTab: (tab: T) => void
}

/**
 * Shared tab state hook for DSA topic pages.
 *
 * - Reads initial tab from the `?tab=` search param.
 * - Keeps the URL search param in sync with the active tab (replace-mode, no history entry).
 * - Updates `document.title` on tab change.
 */
export function useTopicTabs<T extends string>({
  tabs,
  pageTitle,
  defaultTab,
}: UseTopicTabsOptions<T>): UseTopicTabsResult<T> {
  const [searchParams, setSearchParams] = useSearchParams()

  const firstTabId = tabs[0]?.id
  const fallback = defaultTab ?? firstTabId

  const resolveTab = (raw: string | null): T => {
    if (!raw) return fallback as T
    const found = tabs.find((t) => t.id === raw)
    return found ? (raw as T) : (fallback as T)
  }

  const [activeTab, setActiveTab] = useState<T>(() => resolveTab(searchParams.get('tab')))

  const activeTabLabel = tabs.find((t) => t.id === activeTab)?.label ?? ''

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = activeTabLabel ? `${pageTitle} - ${activeTabLabel}` : pageTitle
  }, [activeTab, activeTabLabel, pageTitle, searchParams, setSearchParams])

  return { activeTab, setActiveTab }
}
