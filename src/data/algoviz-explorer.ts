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
  description: string,
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

export const explorerRoot: ExplorerFolderNode = folder('root', 'AlgoViz', [
  folder('fundamentals', 'Fundamentals', [
    visualization(
      'complexity-analysis',
      'Complexity Analysis',
      'Review Big-O, Big-Theta, and Big-Omega bounds with annotated charts.',
      '/dsa/0-fundamentals/2-complexity-analysis-big-o',
      '\uD83D\uDCC8',
    ),
    visualization(
      'bitwise-operations',
      'Bitwise Operations',
      'Interactive bit manipulation playground with masks and shifts.',
      '/dsa/0-fundamentals/3-bit-manipulation',
      '\uD83E\uDDEE',
    ),
  ]),
  folder('core-data-structures', 'Core Data Structures', [
    folder('linear-structures', 'Linear Structures', [
      visualization(
        'arrays-lists',
        'Arrays & Lists',
        'Compare contiguous vs linked layouts with insertion/deletion demos.',
        '/dsa/1-core-data-structures/1-linear/1-arrays-and-lists',
      ),
      visualization(
        'linked-lists',
        'Linked Lists',
        'Step through pointer operations for singly and doubly linked lists.',
        '/dsa/1-core-data-structures/1-linear/2-linked-lists',
      ),
      visualization(
        'stacks',
        'Stacks',
        'Visualize push/pop operations with call stack analogies.',
        '/dsa/1-core-data-structures/1-linear/3-stacks',
        '\uD83D\uDDC4',
      ),
      visualization(
        'queues',
        'Queues',
        'Simulate queueing systems with circular buffers and priority queues.',
        '/dsa/1-core-data-structures/1-linear/4-queues',
      ),
    ]),
    folder('non-linear-structures', 'Non-Linear Structures', [
      visualization(
        'trees',
        'Trees',
        'Traverse binary trees, heaps, and tries with animated recursion.',
        '/dsa/1-core-data-structures/2-non-linear/1-trees',
        '\uD83C\uDF33',
      ),
      visualization(
        'graphs',
        'Graphs',
        'Explore BFS, DFS, and shortest paths with interactive graph layouts.',
        '/dsa/1-core-data-structures/2-non-linear/2-graphs',
        '\uD83D\uDD75',
      ),
    ]),
  ]),
  folder('sorting-algorithms', 'Sorting Algorithms', [
    visualization(
      'bubble-sort',
      'Bubble Sort',
      'Classic adjacent swap animation with swap counters and adaptive mode.',
      '/dsa/2-core-algorithms/1-sorting-searching/bubble-sort',
      '\uD83D\uDCA7',
    ),
    visualization(
      'merge-sort',
      'Merge Sort',
      'Divide-and-conquer breakdown with merge buffers and tree view.',
      '/dsa/2-core-algorithms/1-sorting-searching/merge-sort',
      '\uD83D\uDD37',
    ),
    visualization(
      'quick-sort',
      'Quick Sort',
      'Pivot selection strategies with Lomuto/Hoare partition animations.',
      '/dsa/2-core-algorithms/1-sorting-searching/quick-sort',
      '\u26A1',
    ),
    visualization(
      'heap-sort',
      'Heap Sort',
      'Heapify process and array representation side-by-side.',
      '/dsa/2-core-algorithms/1-sorting-searching/heap-sort',
      '\u26F0',
    ),
  ]),
  folder('graph-algorithms', 'Graph Algorithms', [
    visualization(
      'breadth-first-search',
      'Breadth-First Search',
      'Layer-by-layer traversal with queue state and distance tracking.',
      '/dsa/2-core-algorithms/2-graph-algorithms/1-breadth-first-search',
      '\uD83D\uDC41',
    ),
    visualization(
      'dijkstras',
      "Dijkstra's Algorithm",
      'Shortest paths with priority queue timeline and edge relaxation view.',
      '/dsa/2-core-algorithms/2-graph-algorithms/2-dijkstra-s-algorithm',
      '\uD83D\uDEE6',
    ),
    visualization(
      'minimum-spanning-tree',
      'Minimum Spanning Tree',
      'Compare Kruskal vs Prim with sorted edges and union-find inspector.',
      '/dsa/2-core-algorithms/2-graph-algorithms/3-minimum-spanning-tree',
      '\uD83C\uDF08',
    ),
  ]),
  folder('dynamic-programming', 'Dynamic Programming', [
    visualization(
      'knapsack',
      'Knapsack',
      'Table filling steps with decision tracebacks for 0/1 and unbounded variants.',
      '/dsa/2-core-algorithms/3-dynamic-programming/knapsack',
      '\uD83C\uDF92',
    ),
    visualization(
      'longest-common-subsequence',
      'Longest Common Subsequence',
      'Matrix animations that highlight matches and reconstruction paths.',
      '/dsa/2-core-algorithms/3-dynamic-programming',
      '\uD83D\uDD17',
    ),
  ]),
])

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
