import { useState } from 'react'

import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'What it is',
    details:
      'Non-linear structures are containers where elements can have more than one predecessor or successor. Trees, graphs, heaps, and tries all belong to this family.',
    notes:
      'Unlike linear structures, traversal order is not predetermined — it depends on the algorithm and the shape of the data.',
  },
  {
    title: 'Why it matters',
    details:
      'Hierarchical and networked data is inherently non-linear. File systems, DOM trees, dependency graphs, social networks, and route maps cannot be modeled efficiently with arrays or linked lists alone.',
    notes:
      'The right non-linear structure can turn an O(n) operation into O(log n) or O(1) — the difference between a program that scales and one that does not.',
  },
  {
    title: 'Where it shows up',
    details:
      'Binary search trees power sorted maps and sets; heaps power priority queues and scheduling; tries power autocomplete and IP routing; graphs power pathfinding, dependency resolution, and social network analysis.',
    notes:
      'Most database index structures (B-trees, LSM trees) and compiler infrastructure (ASTs, CFGs) are non-linear.',
  },
]

const mentalModel = [
  {
    title: 'Nodes and edges',
    detail:
      'All non-linear structures are ultimately collections of nodes connected by edges. The constraints placed on those edges (direction, weight, uniqueness, cycles) define the specific structure.',
  },
  {
    title: 'Trees are acyclic graphs',
    detail:
      'A tree is a connected, directed, acyclic graph where every node except the root has exactly one parent. This constraint enables efficient hierarchical algorithms.',
  },
  {
    title: 'Height and balance',
    detail:
      'The height of a tree determines the worst-case cost of operations. An unbalanced tree degrades to O(n); a balanced tree guarantees O(log n).',
  },
  {
    title: 'Sparse vs dense graphs',
    detail:
      'Sparse graphs (few edges) suit adjacency lists; dense graphs (many edges) suit adjacency matrices. The representation affects both space and traversal time.',
  },
]

const keyTakeaways = [
  'Trees are the go-to structure for hierarchical data; graphs generalize trees by allowing cycles and multiple parents.',
  'Binary search trees give O(log n) search, insert, and delete — but only when balanced.',
  'Heaps give O(1) peek and O(log n) push/pop, making them ideal for priority queues.',
  'Tries give O(k) search (k = key length) independent of the number of stored keys.',
  'Graph traversal (BFS/DFS) is the backbone of pathfinding, cycle detection, and topological sort.',
  'Balance is the critical property: an unbalanced BST degrades to a linked list.',
]

const structures = [
  {
    title: 'Binary Tree',
    detail:
      'Each node has at most two children (left and right). The base form for BSTs, heaps, and expression trees.',
  },
  {
    title: 'Binary Search Tree (BST)',
    detail:
      'A binary tree where left subtree values are less than the node and right subtree values are greater. Gives O(log n) search, insert, delete when balanced.',
  },
  {
    title: 'AVL Tree',
    detail:
      'Self-balancing BST that maintains a height difference of at most 1 between subtrees. Guarantees O(log n) operations via rotations.',
  },
  {
    title: 'Red-Black Tree',
    detail:
      'Self-balancing BST with color-based invariants. Allows slightly more imbalance than AVL for fewer rotations; used in most standard library sorted maps (std::map, TreeMap).',
  },
  {
    title: 'B-Tree / B+ Tree',
    detail:
      'Multi-way balanced tree designed for disk-based storage. Each node can have many children, minimizing I/O. The backbone of most relational database indexes.',
  },
  {
    title: 'Heap (Binary Heap)',
    detail:
      'A complete binary tree satisfying the heap property: each node is ≥ (max-heap) or ≤ (min-heap) all its children. Backed by an array for cache efficiency.',
  },
  {
    title: 'Trie (Prefix Tree)',
    detail:
      'A tree where each edge represents a character. Keys are paths from root to leaf. O(k) search and insert regardless of the number of stored keys.',
  },
  {
    title: 'Graph (undirected)',
    detail:
      'A set of vertices and edges with no direction. Models symmetric relationships: roads, friendships, network links.',
  },
  {
    title: 'Graph (directed / DAG)',
    detail:
      'A graph with directed edges. A DAG (Directed Acyclic Graph) adds the constraint of no cycles and enables topological sorting.',
  },
  {
    title: 'Disjoint Set Union (DSU)',
    detail:
      'Tracks a partition of elements into disjoint sets. Union and Find are near-O(1) with path compression and union by rank. Core to Kruskal MST and cycle detection.',
  },
]

const complexityTable = [
  {
    structure: 'BST (balanced)',
    search: 'O(log n)',
    insert: 'O(log n)',
    delete: 'O(log n)',
    space: 'O(n)',
    note: 'Degrades to O(n) if unbalanced',
  },
  {
    structure: 'AVL Tree',
    search: 'O(log n)',
    insert: 'O(log n)',
    delete: 'O(log n)',
    space: 'O(n)',
    note: 'Strict balance; more rotations',
  },
  {
    structure: 'Red-Black Tree',
    search: 'O(log n)',
    insert: 'O(log n)',
    delete: 'O(log n)',
    space: 'O(n)',
    note: 'Looser balance; fewer rotations',
  },
  {
    structure: 'Binary Heap',
    search: 'O(n)',
    insert: 'O(log n)',
    delete: 'O(log n)',
    space: 'O(n)',
    note: 'Peek min/max is O(1)',
  },
  {
    structure: 'Trie',
    search: 'O(k)',
    insert: 'O(k)',
    delete: 'O(k)',
    space: 'O(n·k)',
    note: 'k = key length',
  },
  {
    structure: 'Graph BFS/DFS',
    search: 'O(V+E)',
    insert: 'O(1)',
    delete: 'O(V+E)',
    space: 'O(V+E)',
    note: 'V = vertices, E = edges',
  },
  {
    structure: 'DSU',
    search: 'O(α(n))',
    insert: 'O(α(n))',
    delete: 'N/A',
    space: 'O(n)',
    note: 'α = inverse Ackermann, near O(1)',
  },
]

const commonPatterns = [
  {
    title: 'In-order traversal for sorted output',
    detail:
      'In-order traversal of a BST visits nodes in ascending key order, enabling sorted iteration without a separate sort step.',
  },
  {
    title: 'Heapify for priority queue construction',
    detail:
      'Building a heap from an array using bottom-up heapify runs in O(n), faster than inserting elements one by one (O(n log n)).',
  },
  {
    title: 'BFS for shortest path in unweighted graphs',
    detail:
      'BFS explores nodes level by level. The first time a node is reached, it is reached via the shortest path (fewest edges).',
  },
  {
    title: 'DFS for cycle detection and topological sort',
    detail:
      'DFS with coloring (white/gray/black) detects back edges (cycles) in directed graphs. Topological sort orders a DAG by finish time.',
  },
  {
    title: 'Trie for autocomplete',
    detail:
      'All keys sharing a prefix share the same path from the root. Collecting all descendants of a prefix node yields autocomplete results in O(k + output size).',
  },
  {
    title: 'DSU for connected components',
    detail:
      'Process edges one by one; union the endpoints. After all edges, nodes sharing a root belong to the same connected component.',
  },
  {
    title: 'Segment tree for range queries',
    detail:
      'A binary tree over an array that answers range sum/min/max queries in O(log n) and supports point updates in O(log n).',
  },
]

const pitfalls = [
  {
    mistake: 'Inserting sorted data into an unbalanced BST',
    description:
      'Inserting keys in ascending order builds a linked list, degrading all operations to O(n). Use a self-balancing tree or shuffle first.',
  },
  {
    mistake: 'Confusing min-heap and max-heap',
    description:
      "A min-heap's root is the smallest element; a max-heap's root is the largest. Using the wrong one silently produces incorrect results in priority queue algorithms.",
  },
  {
    mistake: 'Forgetting to update parent pointers on tree rotations',
    description:
      'AVL and Red-Black rotations involve three nodes and up to six pointer updates. Missing any one corrupts the tree structure silently.',
  },
  {
    mistake: 'Running BFS/DFS on a graph without a visited set',
    description:
      'Without marking nodes as visited, traversal will loop infinitely on graphs with cycles.',
  },
  {
    mistake: 'Using adjacency matrix for sparse graphs',
    description:
      'An adjacency matrix for a graph with 10,000 nodes and 10,000 edges wastes 100M cells. Use an adjacency list instead.',
  },
  {
    mistake: 'Trie memory bloat on large alphabets',
    description:
      'A standard trie node stores one pointer per alphabet character. For Unicode keys, use a hash map of children or a compressed (Patricia) trie.',
  },
]

const codeExamples = [
  {
    title: 'BST — insert and search',
    code: `// TypeScript
type BSTNode = { value: number; left: BSTNode | null; right: BSTNode | null }

function insert(root: BSTNode | null, value: number): BSTNode {
  if (!root) return { value, left: null, right: null }
  if (value < root.value) root.left = insert(root.left, value)
  else if (value > root.value) root.right = insert(root.right, value)
  return root
}

function search(root: BSTNode | null, value: number): boolean {
  if (!root) return false
  if (value === root.value) return true
  return value < root.value ? search(root.left, value) : search(root.right, value)
}`,
    explanation:
      'Each call descends one level, giving O(h) time where h is the tree height. In a balanced tree h = O(log n).',
  },
  {
    title: 'Binary Heap — push and pop (min-heap)',
    code: `# Python (using heapq)
import heapq

heap = []
heapq.heappush(heap, 5)   # O(log n)
heapq.heappush(heap, 1)
heapq.heappush(heap, 3)
minimum = heapq.heappop(heap)  # O(log n) → 1

# Heapify from existing list in O(n)
data = [5, 1, 3, 2, 4]
heapq.heapify(data)`,
    explanation:
      "Python's heapq is a min-heap. For a max-heap, negate values before pushing and after popping.",
  },
  {
    title: 'Graph BFS — shortest path',
    code: `// TypeScript
function bfs(graph: Map<number, number[]>, start: number, target: number): number {
  const visited = new Set<number>()
  const queue: Array<[number, number]> = [[start, 0]]  // [node, distance]
  visited.add(start)
  while (queue.length > 0) {
    const [node, dist] = queue.shift()!
    if (node === target) return dist
    for (const neighbor of graph.get(node) ?? []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor)
        queue.push([neighbor, dist + 1])
      }
    }
  }
  return -1  // not reachable
}`,
    explanation:
      'BFS processes nodes in order of distance from the source. The first time the target is reached, dist is the shortest path length.',
  },
  {
    title: 'DFS — topological sort',
    code: `# Python
def topological_sort(graph: dict[int, list[int]]) -> list[int]:
  visited, result = set(), []

  def dfs(node):
    visited.add(node)
    for neighbor in graph.get(node, []):
      if neighbor not in visited:
        dfs(neighbor)
    result.append(node)  # post-order

  for node in graph:
    if node not in visited:
      dfs(node)
  return result[::-1]  # reverse post-order`,
    explanation:
      'Nodes are appended after all their dependencies are processed. Reversing the post-order list gives a valid topological ordering.',
  },
  {
    title: 'Trie — insert and search',
    code: `// TypeScript
type TrieNode = { children: Map<string, TrieNode>; isEnd: boolean }

function newNode(): TrieNode { return { children: new Map(), isEnd: false } }

function insert(root: TrieNode, word: string): void {
  let node = root
  for (const ch of word) {
    if (!node.children.has(ch)) node.children.set(ch, newNode())
    node = node.children.get(ch)!
  }
  node.isEnd = true
}

function search(root: TrieNode, word: string): boolean {
  let node = root
  for (const ch of word) {
    if (!node.children.has(ch)) return false
    node = node.children.get(ch)!
  }
  return node.isEnd
}`,
    explanation:
      'Each character of the word is consumed in one step, giving O(k) time where k is the word length.',
  },
  {
    title: 'DSU — union and find',
    code: `// TypeScript
class DSU {
  parent: number[]
  rank: number[]
  constructor(n: number) {
    this.parent = Array.from({ length: n }, (_, i) => i)
    this.rank = new Array(n).fill(0)
  }
  find(x: number): number {
    if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x])
    return this.parent[x]
  }
  union(x: number, y: number): void {
    const rx = this.find(x), ry = this.find(y)
    if (rx === ry) return
    if (this.rank[rx] < this.rank[ry]) this.parent[rx] = ry
    else if (this.rank[rx] > this.rank[ry]) this.parent[ry] = rx
    else { this.parent[ry] = rx; this.rank[rx]++ }
  }
}`,
    explanation:
      'Path compression in find() and union by rank together give near-O(1) amortized operations (inverse Ackermann time).',
  },
]

const languageMapping = [
  {
    title: 'C++',
    detail:
      'std::map / std::set (Red-Black Tree), std::priority_queue (binary heap), std::unordered_map (hash table). No built-in trie or DSU.',
  },
  {
    title: 'Rust',
    detail: 'BTreeMap / BTreeSet (B-Tree), BinaryHeap<T> (max-heap). No built-in graph or trie.',
  },
  {
    title: 'Java',
    detail:
      'TreeMap / TreeSet (Red-Black Tree), PriorityQueue (min-heap). Graphs typically hand-rolled or via libraries (JGraphT).',
  },
  {
    title: 'Python',
    detail:
      'heapq module (min-heap on a list), sortedcontainers.SortedList (third-party). Graphs via dictionaries or networkx.',
  },
  {
    title: 'JavaScript / TypeScript',
    detail:
      'No built-in BST, heap, or trie. Use Map/Set for hash-based lookups; hand-roll or use libraries (heap.js, mnemonist) for ordered structures.',
  },
  {
    title: 'Go',
    detail:
      'container/heap interface for binary heaps; no built-in BST or trie. Graphs are typically adjacency lists using slices and maps.',
  },
]

const quickGlossary = [
  {
    term: 'Tree',
    definition:
      'A connected, acyclic graph where every node except the root has exactly one parent.',
  },
  {
    term: 'Binary tree',
    definition: 'A tree where each node has at most two children, called left and right.',
  },
  {
    term: 'BST',
    definition: 'Binary Search Tree: a binary tree where left < node < right for every node.',
  },
  {
    term: 'Balanced tree',
    definition: 'A tree whose height is O(log n), guaranteeing logarithmic operation time.',
  },
  {
    term: 'Heap property',
    definition: 'Every node is ≥ (max-heap) or ≤ (min-heap) all of its children.',
  },
  {
    term: 'Heapify',
    definition: 'Building a valid heap from an arbitrary array in O(n) using bottom-up sifting.',
  },
  {
    term: 'Trie',
    definition:
      'A tree where paths from root to node spell out keys; O(k) operations by key length.',
  },
  {
    term: 'DAG',
    definition:
      'Directed Acyclic Graph: a directed graph with no cycles; enables topological sorting.',
  },
  {
    term: 'BFS',
    definition:
      'Breadth-First Search: traverses nodes level by level; finds shortest path in unweighted graphs.',
  },
  {
    term: 'DFS',
    definition:
      'Depth-First Search: traverses as deep as possible before backtracking; used for cycle detection and topological sort.',
  },
  {
    term: 'Topological sort',
    definition:
      'An ordering of DAG nodes such that every edge points from an earlier node to a later one.',
  },
  {
    term: 'DSU / Union-Find',
    definition:
      'A structure tracking which elements belong to the same set, with near-O(1) union and find operations.',
  },
  {
    term: 'Adjacency list',
    definition:
      'Graph representation as a map from each node to its list of neighbors. O(V+E) space.',
  },
  {
    term: 'Adjacency matrix',
    definition: 'Graph representation as a V×V boolean matrix. O(V²) space; O(1) edge lookup.',
  },
  {
    term: 'Tree rotation',
    definition:
      'A local restructuring of three nodes used in AVL and Red-Black trees to restore balance invariants.',
  },
]

const choiceChecklist = [
  'Need sorted iteration with O(log n) insert/delete? → BST (Red-Black or AVL).',
  'Need the minimum or maximum repeatedly? → Binary heap (priority queue).',
  'Need fast prefix search or autocomplete? → Trie.',
  'Modeling relationships with no hierarchy? → Graph (adjacency list for sparse, matrix for dense).',
  'Need shortest path on unweighted graph? → BFS.',
  'Need shortest path on weighted graph? → Dijkstra (heap) or Bellman-Ford.',
  'Need to detect cycles or topological order in a DAG? → DFS.',
  'Need to group or merge elements into sets dynamically? → DSU.',
  'Need range queries with point updates on an array? → Segment tree or Fenwick tree.',
]

const compareContrast = [
  {
    title: 'AVL vs Red-Black Tree',
    detail:
      'AVL trees are more strictly balanced (height difference ≤ 1), giving slightly faster lookups. Red-Black trees allow more imbalance but require fewer rotations on insert/delete, making them preferred in standard libraries.',
  },
  {
    title: 'Heap vs BST',
    detail:
      'A heap supports O(1) peek and O(log n) push/pop but not arbitrary search. A BST supports O(log n) search but O(1) peek only of the min/max node.',
  },
  {
    title: 'Trie vs hash map',
    detail:
      'Tries support prefix queries and ordered iteration natively; hash maps do not. Hash maps have better constant factors for exact-match lookups.',
  },
  {
    title: 'BFS vs DFS',
    detail:
      'BFS finds shortest paths in unweighted graphs but uses O(V) queue space at peak. DFS uses O(h) stack space (h = depth) but does not find shortest paths.',
  },
  {
    title: 'Adjacency list vs matrix',
    detail:
      'List uses O(V+E) space and is faster to iterate over neighbors. Matrix uses O(V²) space but gives O(1) edge existence checks.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-why', label: 'Why This Matters' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-mental-model', label: 'Core Mental Model' },
    { id: 'core-structures', label: 'The Structures' },
    { id: 'core-complexity', label: 'Complexity Overview' },
    { id: 'core-patterns', label: 'Common Patterns' },
    { id: 'core-languages', label: 'Language Mapping' },
    { id: 'core-compare', label: 'Compare and Contrast' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-checklist', label: 'Choice Checklist' },
  ],
  examples: [{ id: 'ex-code', label: 'Code Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function NonLinearStructuresPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Non-Linear Structures',
    defaultTab: 'big-picture',
  })

  const defaultExample = codeExamples[0] ?? {
    title: 'No examples configured',
    code: 'No code available.',
    explanation: 'No explanation available.',
  }
  const [selectedExampleTitle, setSelectedExampleTitle] = useState(defaultExample.title)

  const selectedExample =
    codeExamples.find((ex) => ex.title === selectedExampleTitle) ?? defaultExample

  return (
    <TopicPageShell
      title="Non-Linear Structures"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Non-Linear Structures</h1>
      <p>
        Non-linear structures organize elements in hierarchies and networks rather than sequences.
        Trees, graphs, heaps, and tries each impose a different set of constraints on edges,
        enabling efficient algorithms that are impossible on flat arrays. Choosing the right
        non-linear structure is often the difference between an O(n²) solution and an O(n log n) or
        O(n) one.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            {bigPicture.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.details}</p>
                <p>{item.notes}</p>
              </div>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-why" className="bin98-section">
            <h2 className="bin98-heading">Why This Matters</h2>
            <p>
              Real-world data is rarely a flat list. Code has a call graph. Dependencies form a DAG.
              Network nodes form a graph. Text prefixes form a trie. Modeling these relationships
              with a linear structure forces repeated O(n) scans where O(log n) or better is
              available.
            </p>
            <p>
              Non-linear structures encode relationships structurally, so the algorithm can exploit
              shape rather than scanning. A balanced BST encodes sorted order in its topology; a
              heap encodes priority in the parent-child relationship; a trie encodes shared prefixes
              in shared paths.
            </p>
          </section>
          <hr className="bin98-divider" />
          <section id="bp-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key Takeaways</h2>
            <ul>
              {keyTakeaways.map((takeaway) => (
                <li key={takeaway}>{takeaway}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {activeTab === 'core-concepts' && (
        <>
          <section id="core-mental-model" className="bin98-section">
            <h2 className="bin98-heading">Core Mental Model</h2>
            {mentalModel.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>
          <section id="core-structures" className="bin98-section">
            <h2 className="bin98-heading">The Structures</h2>
            {structures.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-complexity" className="bin98-section">
            <h2 className="bin98-heading">Complexity Overview</h2>
            <p>
              V = vertices, E = edges, k = key length, α = inverse Ackermann function
              (near-constant).
            </p>
            <table className="bin98-table">
              <thead>
                <tr>
                  <th>Structure</th>
                  <th>Search</th>
                  <th>Insert</th>
                  <th>Delete</th>
                  <th>Space</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {complexityTable.map((row) => (
                  <tr key={row.structure}>
                    <td>{row.structure}</td>
                    <td>{row.search}</td>
                    <td>{row.insert}</td>
                    <td>{row.delete}</td>
                    <td>{row.space}</td>
                    <td>{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          <section id="core-patterns" className="bin98-section">
            <h2 className="bin98-heading">Common Patterns</h2>
            {commonPatterns.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-languages" className="bin98-section">
            <h2 className="bin98-heading">Language Mapping</h2>
            {languageMapping.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-compare" className="bin98-section">
            <h2 className="bin98-heading">Compare and Contrast</h2>
            {compareContrast.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-pitfalls" className="bin98-section">
            <h2 className="bin98-heading">Common Pitfalls</h2>
            <ul>
              {pitfalls.map((pitfall) => (
                <li key={pitfall.mistake}>
                  <strong>{pitfall.mistake}:</strong> {pitfall.description}
                </li>
              ))}
            </ul>
          </section>
          <section id="core-checklist" className="bin98-section">
            <h2 className="bin98-heading">Choice Checklist</h2>
            <ul>
              {choiceChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {activeTab === 'examples' && (
        <section id="ex-code" className="bin98-section">
          <h2 className="bin98-heading">Code Examples</h2>
          <p>Select a scenario to view an annotated code sample.</p>
          <div className="nlbin98-inline-buttons">
            {codeExamples.map((ex) => (
              <button
                key={ex.title}
                type="button"
                className="nlbin98-push"
                onClick={() => setSelectedExampleTitle(ex.title)}
              >
                {ex.title}
              </button>
            ))}
          </div>
          <h3 className="bin98-subheading">{selectedExample.title}</h3>
          <div className="bin98-codebox">
            <code>{selectedExample.code.trim()}</code>
          </div>
          <p>{selectedExample.explanation}</p>
        </section>
      )}

      {activeTab === 'glossary' && (
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {quickGlossary.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
