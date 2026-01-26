import { slugifySegment } from '@/features/dsa/utils/slug'

export type ExplorerNodeKind = 'folder' | 'visualization'

export interface ExplorerNodeBase {
  id: string
  name: string
  icon?: string
  description?: string
}

export interface ExplorerFolderNode extends ExplorerNodeBase {
  kind: 'folder'
  children: ExplorerNode[]
}

export interface ExplorerVisualizationNode extends ExplorerNodeBase {
  kind: 'visualization'
  route?: string
  estimatedDurationMinutes?: number
}

export type ExplorerNode = ExplorerFolderNode | ExplorerVisualizationNode

export interface ExplorerIndexEntry {
  node: ExplorerNode
  parentId: string | null
  pathEntries: ExplorerNode[]
}

export interface ExplorerIndex {
  root: ExplorerFolderNode
  map: Map<string, ExplorerIndexEntry>
}

const visualization = (
  id: string,
  name: string,
  description?: string,
  route?: string,
  icon = '\uD83D\uDCCA',
  estimatedDurationMinutes?: number,
): ExplorerVisualizationNode => ({
  id,
  name,
  description,
  icon,
  route,
  kind: 'visualization',
  estimatedDurationMinutes,
})

const folder = (id: string, name: string, children: ExplorerNode[], icon = '\uD83D\uDCC1'): ExplorerFolderNode => ({
  id,
  name,
  icon,
  kind: 'folder',
  children,
})

const ROUTE_PREFIX = '../features/dsa/routes/DSA/'
const SEGMENT_DELIMITER = '\u0000'

const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' })

const joinPrefix = (segments: string[]) => segments.join(SEGMENT_DELIMITER)
const formatSegmentName = (segment: string): string => {
  const normalized = segment.replace(/^\d+\.\s*/, '').trim() || segment
  if (normalized === 'Concurrency & Synchronization') {
    return 'Concurrency & Sync'
  }
  return normalized
}
const slugPath = (segments: string[]): string => segments.map((segment) => slugifySegment(segment)).join('/')

const routeFiles = Object.keys(
  import.meta.glob('../features/dsa/routes/DSA/**/index.tsx', { eager: false }),
)

const getSegmentArray = (filePath: string): string[] => {
  if (!filePath.startsWith(ROUTE_PREFIX)) {
    return []
  }

  const relative = filePath.slice(ROUTE_PREFIX.length).replace(/\/index\.tsx$/, '')
  if (!relative) {
    return []
  }

  return relative.split('/')
}

const compareSegmentArrays = (a: string[], b: string[]): number => {
  const maxLength = Math.min(a.length, b.length)
  for (let i = 0; i < maxLength; i += 1) {
    const comparison = collator.compare(a[i]!, b[i]!)
    if (comparison !== 0) {
      return comparison
    }
  }
  return a.length - b.length
}

const segmentPaths = routeFiles
  .map(getSegmentArray)
  .filter((segments): segments is string[] => segments.length > 0)
  .sort(compareSegmentArrays)

const prefixSegments = new Map<string, string[]>()
const prefixMaxDepth = new Map<string, number>()

segmentPaths.forEach((segments) => {
  for (let depth = 1; depth <= segments.length; depth += 1) {
    const prefix = joinPrefix(segments.slice(0, depth))
    if (!prefixSegments.has(prefix)) {
      prefixSegments.set(prefix, segments.slice(0, depth))
    }

    const currentMax = prefixMaxDepth.get(prefix) ?? 0
    if (segments.length > currentMax) {
      prefixMaxDepth.set(prefix, segments.length)
    }
  }
})

const nonLeafPrefixes = new Set<string>()
prefixSegments.forEach((segments, prefix) => {
  if ((prefixMaxDepth.get(prefix) ?? 0) > segments.length) {
    nonLeafPrefixes.add(prefix)
  }
})

export const explorerRoot: ExplorerFolderNode = folder('root', 'AlgoViz', [])
const folderCache = new Map<string, ExplorerFolderNode>([['', explorerRoot]])

const sortedNonLeafPrefixes = Array.from(nonLeafPrefixes).sort((a, b) => {
  const aSegments = prefixSegments.get(a)
  const bSegments = prefixSegments.get(b)

  if (!aSegments || !bSegments) {
    return 0
  }

  if (aSegments.length !== bSegments.length) {
    return aSegments.length - bSegments.length
  }

  return compareSegmentArrays(aSegments, bSegments)
})

sortedNonLeafPrefixes.forEach((prefix) => {
  const segments = prefixSegments.get(prefix)
  if (!segments || segments.length === 0) {
    return
  }

  const parentSegments = segments.slice(0, -1)
  const parentPrefix = joinPrefix(parentSegments)
  const parentFolder = folderCache.get(parentPrefix)
  if (!parentFolder) {
    return
  }

  const nodeId = `folder:${slugPath(segments)}`
  const lastSegment = segments[segments.length - 1]
  if (!lastSegment) {
    return
  }
  const displayName = formatSegmentName(lastSegment)
  const childFolder = folder(nodeId, displayName, [])
  parentFolder.children.push(childFolder)
  folderCache.set(prefix, childFolder)
})

segmentPaths.forEach((segments) => {
  if (segments.length === 0) {
    return
  }

  const prefix = joinPrefix(segments)
  if (nonLeafPrefixes.has(prefix)) {
    return
  }

  const parentSegments = segments.slice(0, -1)
  const parentPrefix = joinPrefix(parentSegments)
  const parentFolder = folderCache.get(parentPrefix) ?? explorerRoot

  const lastSegment = segments[segments.length - 1]
  if (!lastSegment) {
    return
  }
  const pageId = `page:${slugPath(segments)}`
  const pageName = formatSegmentName(lastSegment)
  const route = `/dsa/${slugPath(segments)}`

  parentFolder.children.push(visualization(pageId, pageName, undefined, route))
})

export const createExplorerIndex = (root: ExplorerFolderNode): ExplorerIndex => {
  const map = new Map<string, ExplorerIndexEntry>()

  const walk = (node: ExplorerNode, parentPath: ExplorerNode[]) => {
    const currentPath = [...parentPath, node]
    map.set(node.id, {
      node,
      parentId: parentPath[parentPath.length - 1]?.id ?? null,
      pathEntries: currentPath,
    })

    if (node.kind === 'folder') {
      node.children.forEach((child) => walk(child, currentPath))
    }
  }

  walk(root, [])

  return { root, map }
}

export const explorerIndex = createExplorerIndex(explorerRoot)

export const getExplorerNode = (id: string): ExplorerIndexEntry | undefined =>
  explorerIndex.map.get(id)

export const getExplorerChildren = (id: string): ExplorerNode[] => {
  const entry = explorerIndex.map.get(id)
  if (!entry) {
    return []
  }

  return entry.node.kind === 'folder' ? entry.node.children : []
}

export const ROOT_NODE_ID = explorerRoot.id
