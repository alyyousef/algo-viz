import { kbRouteDefinitions } from '@/features/kb/routeManifest'
import { slugifySegment } from '@/features/kb/utils/slug'

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
): ExplorerVisualizationNode => ({
  id,
  name,
  description,
  icon,
  route,
  kind: 'visualization',
})

const folder = (
  id: string,
  name: string,
  children: ExplorerNode[],
  icon = '\uD83D\uDCC1',
): ExplorerFolderNode => ({
  id,
  name,
  icon,
  kind: 'folder',
  children,
})

const SEGMENT_DELIMITER = '\u0000'
const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' })

const joinPrefix = (segments: string[]) => segments.join(SEGMENT_DELIMITER)

const findFolderChild = (
  parent: ExplorerFolderNode,
  id: string,
): ExplorerFolderNode | undefined => {
  const child = parent.children.find((node) => node.id === id)
  return child?.kind === 'folder' ? child : undefined
}

const cloneExplorerNode = (node: ExplorerNode, aliasPrefix: string): ExplorerNode => {
  if (node.kind === 'visualization') {
    return visualization(
      `${aliasPrefix}:${node.id}`,
      node.name,
      node.description,
      node.route,
      node.icon,
    )
  }

  return {
    ...folder(`${aliasPrefix}:${node.id}`, node.name, [], node.icon),
    description: node.description,
    children: node.children.map((child) => cloneExplorerNode(child, aliasPrefix)),
  }
}

const formatSegmentName = (segment: string): string => {
  const normalized = segment.replace(/^\d+\.\s*/, '').trim() || segment
  if (normalized === 'Concurrency & Synchronization') {
    return 'Concurrency & Sync'
  }
  return normalized
}

const slugPath = (segments: string[]): string =>
  segments.map((segment) => slugifySegment(segment)).join('/')

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

const segmentPaths = kbRouteDefinitions
  .map(({ segments }) => segments)
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

  const childFolder = folder(nodeId, formatSegmentName(lastSegment), [])
  parentFolder.children.push(childFolder)
  folderCache.set(prefix, childFolder)
})

kbRouteDefinitions.forEach(({ segments, path }) => {
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

  parentFolder.children.push(
    visualization(`page:${slugPath(segments)}`, formatSegmentName(lastSegment), undefined, path),
  )
})

const languagesEcosystemsFolder = findFolderChild(explorerRoot, 'folder:0-languages-ecosystems')

if (languagesEcosystemsFolder) {
  const aliasChildren = [
    'folder:0-languages-ecosystems/platforms-cloud',
    'folder:0-languages-ecosystems/frameworks',
    'folder:0-languages-ecosystems/databases-storage',
    'folder:0-languages-ecosystems/mobile-development',
    'folder:0-languages-ecosystems/ai-ml-tools',
    'folder:0-languages-ecosystems/comparisons',
    'folder:0-languages-ecosystems/object-oriented-languages',
    'folder:0-languages-ecosystems/systems-languages',
    'folder:0-languages-ecosystems/web-technologies',
  ]
    .map((id) => findFolderChild(languagesEcosystemsFolder, id))
    .filter((node): node is ExplorerFolderNode => Boolean(node))
    .map((node) => cloneExplorerNode(node, 'alias:languages-and-frameworks'))

  if (aliasChildren.length > 0) {
    explorerRoot.children.push(
      folder(
        'alias:languages-and-frameworks:folder:languages-and-frameworks',
        'Languages and Frameworks',
        aliasChildren,
      ),
    )
  }
}

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
