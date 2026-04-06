import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

import { explorerIndex } from '@/data/algoviz-explorer'

import type { ExplorerVisualizationNode } from '@/data/algoviz-explorer'

export interface AdjacentTopic {
  name: string
  route: string
}

export interface TopicNavigation {
  /** The previous sibling topic in the same folder, or null */
  previous: AdjacentTopic | null
  /** The next sibling topic in the same folder, or null */
  next: AdjacentTopic | null
}

/**
 * Returns previous/next sibling topics for the current DSA page.
 *
 * Siblings are determined by the parent folder in the explorer tree.
 * Only `visualization` nodes (leaf pages) count as siblings — sub-folders
 * are skipped so navigation stays within the same content level.
 */
export function useTopicNavigation(): TopicNavigation {
  const location = useLocation()
  const currentPath = location.pathname

  return useMemo(() => {
    // Find the current node by matching its route
    let currentNodeId: string | null = null
    for (const [id, entry] of explorerIndex.map.entries()) {
      if (
        entry.node.kind === 'visualization' &&
        (entry.node as ExplorerVisualizationNode).route === currentPath
      ) {
        currentNodeId = id
        break
      }
    }

    if (!currentNodeId) {
      return { previous: null, next: null }
    }

    const currentEntry = explorerIndex.map.get(currentNodeId)
    if (!currentEntry || currentEntry.parentId === null) {
      return { previous: null, next: null }
    }

    const parentEntry = explorerIndex.map.get(currentEntry.parentId)
    if (!parentEntry || parentEntry.node.kind !== 'folder') {
      return { previous: null, next: null }
    }

    // Collect only visualization siblings (skip sub-folders)
    const siblings = parentEntry.node.children.filter(
      (child): child is ExplorerVisualizationNode =>
        child.kind === 'visualization' && Boolean(child.route),
    )

    const currentIndex = siblings.findIndex((s) => s.id === currentNodeId)
    if (currentIndex === -1) {
      return { previous: null, next: null }
    }

    const prevNode = currentIndex > 0 ? siblings[currentIndex - 1] : undefined
    const nextNode = currentIndex < siblings.length - 1 ? siblings[currentIndex + 1] : undefined

    return {
      previous: prevNode?.route ? { name: prevNode.name, route: prevNode.route } : null,
      next: nextNode?.route ? { name: nextNode.name, route: nextNode.route } : null,
    }
  }, [currentPath])
}
