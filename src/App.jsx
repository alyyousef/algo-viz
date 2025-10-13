import { Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage.jsx'
import AlgorithmPage from './pages/AlgorithmPage.jsx'
import AlgorithmCategoryPage from './pages/AlgorithmCategoryPage.jsx'
import AlgorithmsIndex from './pages/AlgorithmsIndex.jsx'
import NotFound from './pages/NotFound.jsx'

const algorithmConfig = {
  sorting: {
    slug: 'sorting',
    title: 'Sorting Algorithms',
    description:
      'Explore comparison-based and divide-and-conquer sorting strategies with interactive animations and performance insights.',
    paramKey: 'algorithmName',
    items: {
      'bubble-sort': {
        label: 'Bubble Sort',
        summary: 'Repeatedly swaps adjacent elements to bubble the largest values to the end.',
      },
      'selection-sort': {
        label: 'Selection Sort',
        summary: 'Selects the minimum element on each pass and places it at the front.',
      },
      'insertion-sort': {
        label: 'Insertion Sort',
        summary: 'Builds a sorted portion by inserting each element into its correct position.',
      },
      'merge-sort': {
        label: 'Merge Sort',
        summary: 'Recursively divides the array and merges sorted halves in linear time.',
      },
      'quick-sort': {
        label: 'Quick Sort',
        summary: 'Partitions elements around pivots to achieve average O(n log n) performance.',
      },
      'heap-sort': {
        label: 'Heap Sort',
        summary: 'Uses a binary heap to repeatedly extract the maximum and rebuild the heap.',
      },
    },
  },
  searching: {
    slug: 'searching',
    title: 'Searching Algorithms',
    description:
      'Visualize iterative and divide-and-conquer techniques for locating targets within collections.',
    paramKey: 'algorithmName',
    items: {
      'linear-search': {
        label: 'Linear Search',
        summary: 'Scans each element sequentially until the target is found or the list ends.',
      },
      'binary-search': {
        label: 'Binary Search',
        summary: 'Halves the search interval within a sorted list to locate a target efficiently.',
      },
      'jump-search': {
        label: 'Jump Search',
        summary: 'Skips ahead in fixed jumps and backtracks to narrow the search window.',
      },
      'interpolation-search': {
        label: 'Interpolation Search',
        summary: 'Estimates the likely position of the target using linear interpolation.',
      },
    },
  },
  'data-structures': {
    slug: 'data-structures',
    title: 'Data Structures',
    description:
      'Examine foundational structures, their operations, and how they influence algorithm performance.',
    paramKey: 'structureName',
    items: {
      stack: {
        label: 'Stack',
        summary: 'A LIFO structure ideal for undo operations, parsing, and backtracking.',
      },
      queue: {
        label: 'Queue',
        summary: 'A FIFO structure that models scheduling, buffering, and breadth-first traversal.',
      },
      'linked-list': {
        label: 'Linked List',
        summary: 'Nodes connected via pointers, enabling efficient insertions and deletions.',
      },
      'binary-tree': {
        label: 'Binary Tree',
        summary: 'Hierarchical structure supporting fast ordered and hierarchical operations.',
      },
      graph: {
        label: 'Graph',
        summary: 'Represents complex relationships using vertices and edges.',
      },
    },
  },
  graphs: {
    slug: 'graphs',
    title: 'Graph Algorithms',
    description:
      'Traverse and optimize graph structures using search and shortest-path techniques.',
    paramKey: 'algorithmName',
    items: {
      dfs: {
        label: 'Depth-First Search (DFS)',
        summary: 'Explores as far as possible along each branch before backtracking.',
      },
      bfs: {
        label: 'Breadth-First Search (BFS)',
        summary: 'Visits neighbors level by level to find the shortest path in unweighted graphs.',
      },
      dijkstra: {
        label: "Dijkstra's Algorithm",
        summary: 'Computes shortest paths in weighted graphs with non-negative edge weights.',
      },
      'a-star': {
        label: 'A* Search',
        summary: 'Guides traversal with heuristics to find optimal paths efficiently.',
      },
    },
  },
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/algorithms">
        <Route index element={<AlgorithmsIndex configs={algorithmConfig} />} />
        {Object.values(algorithmConfig).map((config) => (
          <Fragment key={config.slug}>
            <Route
              path={`${config.slug}`}
              element={<AlgorithmCategoryPage config={config} />}
            />
            <Route
              path={`${config.slug}/:${config.paramKey}`}
              element={<AlgorithmPage config={config} />}
            />
          </Fragment>
        ))}
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
