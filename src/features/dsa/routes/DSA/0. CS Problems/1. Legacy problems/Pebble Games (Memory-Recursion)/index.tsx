
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'What it is',
    details:
      'A family of games on directed acyclic graphs (DAGs) that model how much memory is needed to evaluate a computation.',
    notes:
      'The classic black-pebble game captures irreversible computation; the black-white variant models reversible computation.',
  },
  {
    title: 'Why it matters',
    details:
      'Pebbling gives rigorous lower bounds on space and time-space tradeoffs for algorithms, circuits, and programs.',
    notes:
      'It formalizes the intuition that limited memory forces recomputation.',
  },
  {
    title: 'What it teaches',
    details:
      'The difference between storing intermediate results and recomputing them, and how recursion uses memory.',
    notes:
      'It connects graph structure to resource usage and reveals where bottlenecks must occur.',
  },
]

const historicalContext = [
  {
    title: '1970s: Register and memory lower bounds',
    details:
      'Pebble games were introduced to model how many registers or memory cells are needed to evaluate expressions and circuits.',
    notes:
      'Early work connected pebbling to formula size, recursion, and space-bounded computation.',
  },
  {
    title: '1980s-1990s: Time-space tradeoffs',
    details:
      'Researchers used pebbling to show that using less memory forces more recomputation and more time.',
    notes:
      'These results influenced complexity theory, especially for branching programs and circuits.',
  },
  {
    title: 'Modern era: Memory-hardness',
    details:
      'Pebbling arguments underpin memory-hard functions and proofs in cryptography and proof-of-space systems.',
    notes:
      'The model remains a clean abstraction for understanding memory bottlenecks.',
  },
]

const quickGlossary = [
  {
    term: 'Pebbling',
    definition: 'Placing and removing pebbles on a DAG under rules that model memory usage.',
  },
  {
    term: 'Black pebble',
    definition: 'Represents storing a computed value (irreversible computation).',
  },
  {
    term: 'White pebble',
    definition: 'Represents a guessed value that must be justified (reversible computation).',
  },
  {
    term: 'Pebble number',
    definition: 'The minimum number of pebbles needed to place a pebble on a target node.',
  },
  {
    term: 'Space-time tradeoff',
    definition: 'Using fewer pebbles (space) requires more moves (time).',
  },
  {
    term: 'Configuration',
    definition: 'The set of nodes currently holding pebbles.',
  },
]

const problemSetup = [
  {
    title: 'Graph',
    detail:
      'A directed acyclic graph (DAG) where each node represents a computation whose inputs are its predecessors.',
  },
  {
    title: 'Objective',
    detail:
      'Place a pebble on a designated output node while respecting the rules.',
  },
  {
    title: 'Cost model',
    detail:
      'The number of pebbles used measures space; the number of moves measures time.',
  },
  {
    title: 'Interpretation',
    detail:
      'Pebbles are stored intermediate results; removing a pebble discards that value.',
  },
]

const coreRules = [
  {
    title: 'Black pebbling rule',
    detail:
      'You may place a black pebble on node v only if all immediate predecessors of v currently have black pebbles.',
  },
  {
    title: 'Black pebble removal',
    detail:
      'You may remove a black pebble from any node at any time, modeling forgetting a value.',
  },
  {
    title: 'Start condition',
    detail:
      'Source nodes (in-degree 0) can always be pebbled directly.',
  },
  {
    title: 'Goal condition',
    detail:
      'The target/output node must be pebbled at least once; other pebbles can be removed afterward.',
  },
]

const ruleVariants = [
  {
    title: 'Black-white pebbling',
    detail:
      'A white pebble can be placed on any node (a guess), but it can be removed only if all predecessors have pebbles.',
  },
  {
    title: 'Reversible pebbling',
    detail:
      'Models reversible computation where steps can be undone; often captured by black-white rules.',
  },
  {
    title: 'One-shot pebbling',
    detail:
      'Each node can be pebbled at most once, modeling irreversible resource constraints.',
  },
  {
    title: 'Pebbling with costs',
    detail:
      'Edges or nodes can be weighted to model non-uniform memory or time costs.',
  },
]

const memoryRecursionLink = [
  {
    title: 'Recursive evaluation',
    detail:
      'Each recursive call keeps intermediate values on the call stack; pebbles model what stays in memory.',
  },
  {
    title: 'Depth-first strategy',
    detail:
      'A DFS-like pebbling reuses a small number of pebbles but may recompute subgraphs.',
  },
  {
    title: 'Breadth-first strategy',
    detail:
      'A BFS-like strategy stores many results to avoid recomputation, using more pebbles.',
  },
  {
    title: 'Memoization view',
    detail:
      'Keeping pebbles on subproblems is analogous to memoization in recursion.',
  },
]

const keyClaims = [
  {
    title: 'Structure forces memory usage',
    detail:
      'Certain graphs (like pyramids) require many pebbles at some point, no matter the strategy.',
  },
  {
    title: 'Less space implies more time',
    detail:
      'With fewer pebbles, you must recompute nodes more often, increasing the number of moves.',
  },
  {
    title: 'Black-white can reduce space',
    detail:
      'Allowing white pebbles can lower the space needed compared to black-only pebbling.',
  },
  {
    title: 'Lower bounds are robust',
    detail:
      'Pebbling lower bounds translate into real lower bounds for programs, circuits, and branching programs.',
  },
]
const graphFamilies = [
  {
    title: 'Paths',
    detail:
      'A path of length n can be pebbled with 2 pebbles by sliding one forward at a time.',
  },
  {
    title: 'Binary trees',
    detail:
      'Balanced trees require O(log n) pebbles with DFS, but can require many recomputations.',
  },
  {
    title: 'Pyramids and grids',
    detail:
      'These have strong bottlenecks; many pebbles are needed simultaneously.',
  },
  {
    title: 'Superconcentrators',
    detail:
      'Highly connected graphs used to prove strong lower bounds in time-space tradeoffs.',
  },
]

const metrics = [
  {
    title: 'Pebble number (space)',
    detail:
      'The minimum number of pebbles needed to reach the target at least once.',
  },
  {
    title: 'Time (moves)',
    detail:
      'The total number of pebble placements and removals used in a strategy.',
  },
  {
    title: 'Space-time product',
    detail:
      'A combined measure used to capture unavoidable tradeoffs in resource usage.',
  },
  {
    title: 'Cumulative pebbling cost',
    detail:
      'The sum of pebbles present over time, modeling total memory usage over the whole computation.',
  },
]

const strategies = [
  {
    id: 'dfs',
    name: 'Depth-first recursion',
    description:
      'Pebble one subproblem fully, then reuse pebbles for the next. Saves space, costs time.',
    space: 'Low',
    time: 'High (recompute)',
    bestFor: 'Tree-like graphs with small depth.',
  },
  {
    id: 'bfs',
    name: 'Breadth-first storage',
    description:
      'Keep many intermediate values at once to minimize recomputation.',
    space: 'High',
    time: 'Low (few recomputations)',
    bestFor: 'Graphs with many shared subgraphs.',
  },
  {
    id: 'hybrid',
    name: 'Hybrid schedule',
    description:
      'Store only the most reused subgraphs, recompute the rest.',
    space: 'Medium',
    time: 'Medium',
    bestFor: 'Large DAGs with mixed reuse.',
  },
  {
    id: 'black-white',
    name: 'Black-white reversible',
    description:
      'Use white pebbles to defer storage until justified by inputs.',
    space: 'Lower than black-only',
    time: 'Moderate',
    bestFor: 'Reversible or backtrackable computations.',
  },
]

const workedExamples = [
  {
    title: 'Line graph (6 nodes)',
    code: `Nodes: v1 -> v2 -> v3 -> v4 -> v5 -> v6
Strategy: Place on v1, move to v2, keep one pebble behind
Minimum pebbles: 2`,
    explanation:
      'A path is easy: one pebble advances while another supports the next placement.',
  },
  {
    title: 'Binary tree (height 3)',
    code: `Each internal node depends on its two children.
Strategy: Pebble left subtree, save root of left, pebble right subtree, combine.
Minimum pebbles: 3`,
    explanation:
      'Depth-first recursion uses few pebbles but requires recomputation if you discard a subtree too early.',
  },
  {
    title: 'Pyramid (4 levels)',
    code: `Each node depends on two below it (like Pascal triangle).
Bottleneck: middle layer must be simultaneously available.
Minimum pebbles: 4 (black pebbling)`,
    explanation:
      'The pyramid forces a wide frontier; there is no way to avoid simultaneous storage.',
  },
]

const pseudocode = [
  {
    title: 'DFS pebbling of a tree',
    code: `function pebbleTree(node):
  if node is leaf:
    place pebble(node)
    return
  pebbleTree(node.left)
  pebbleTree(node.right)
  place pebble(node)
  remove pebbles from children`,
    explanation:
      'This is the canonical low-space, high-recompute strategy.',
  },
  {
    title: 'Black-white idea',
    code: `place white pebble on target
recurse to justify predecessors
when predecessors are pebbled:
  remove white pebble
  place black pebble`,
    explanation:
      'White pebbles allow deferring storage until inputs are available.',
  },
]
const proofIdeas = [
  {
    title: 'Cut or separator argument',
    detail:
      'Any strategy must simultaneously pebble enough nodes to cross a cut that separates sources from the target.',
  },
  {
    title: 'Bottleneck layer',
    detail:
      'Some graphs have a layer that must all be pebbled at once to progress, forcing a minimum space.',
  },
  {
    title: 'Time-space tradeoff',
    detail:
      'If you keep fewer pebbles than the minimum width, you must revisit layers repeatedly.',
  },
  {
    title: 'Simulation to programs',
    detail:
      'Every pebble placement corresponds to storing a value; lower bounds on pebbling yield memory lower bounds.',
  },
]

const applications = [
  {
    title: 'Register allocation',
    detail:
      'Pebbles model registers holding intermediate values in expression evaluation.',
  },
  {
    title: 'Memory hierarchy',
    detail:
      'Pebbling explains why limited cache forces recomputation or extra I/O.',
  },
  {
    title: 'Cryptography',
    detail:
      'Memory-hard functions use pebbling lower bounds to force high memory usage.',
  },
  {
    title: 'Proof systems',
    detail:
      'Proofs of space and proof-of-work constructions use pebbling arguments to prevent shortcutting.',
  },
]

const compareContrast = [
  {
    title: 'Pebbling vs graph pebbling',
    detail:
      'Graph pebbling (chip-firing) is about moving pebbles to reach targets, not about computation memory.',
  },
  {
    title: 'Pebbling vs cache analysis',
    detail:
      'Cache models focus on memory hierarchies; pebbling focuses on inherent dependency structure.',
  },
  {
    title: 'Pebbling vs recursion trees',
    detail:
      'Recursion trees give call counts; pebbling adds storage constraints and recomputation costs.',
  },
]

const pitfalls = [
  {
    mistake: 'Confusing time with space',
    description:
      'A strategy can be fast but use many pebbles, or use few pebbles but recompute heavily.',
  },
  {
    mistake: 'Ignoring the DAG structure',
    description:
      'Pebbling is defined on a fixed dependency graph; changing edges changes the memory complexity.',
  },
  {
    mistake: 'Assuming black-white always helps',
    description:
      'Some graphs gain little from white pebbles; the benefit depends on structure.',
  },
  {
    mistake: 'Forgetting the target definition',
    description:
      'Some variants require ending with only the target pebbled; others only require it to be pebbled at some point.',
  },
]

const keyTakeaways = [
  'Pebble games model memory usage during computation on DAGs.',
  'Limited memory forces recomputation, creating time-space tradeoffs.',
  'Different rules (black-only vs black-white) capture different computation models.',
  'Graph structure determines unavoidable space bottlenecks.',
  'Pebbling lower bounds translate to real lower bounds in algorithms and systems.',
]

const graphCases = [
  {
    id: 'line-6',
    name: 'Line of 6 nodes',
    nodes: 6,
    edges: 'v1 -> v2 -> v3 -> v4 -> v5 -> v6',
    minBlackPebbles: 2,
    minBlackWhite: 2,
    notes: 'Paths are easy; one pebble advances while one supports the next placement.',
  },
  {
    id: 'binary-tree-3',
    name: 'Binary tree (height 3)',
    nodes: 7,
    edges: 'Each internal node depends on its two children.',
    minBlackPebbles: 3,
    minBlackWhite: 3,
    notes: 'DFS uses few pebbles but can require recomputation if values are discarded.',
  },
  {
    id: 'pyramid-4',
    name: 'Pyramid (4 levels)',
    nodes: 10,
    edges: 'Each node depends on the two below it (like Pascal triangle).',
    minBlackPebbles: 4,
    minBlackWhite: 3,
    notes: 'Wide middle layer creates a simultaneous-memory bottleneck.',
  },
  {
    id: 'diamond',
    name: 'Diamond DAG',
    nodes: 4,
    edges: 'Two branches converge at the target.',
    minBlackPebbles: 3,
    minBlackWhite: 2,
    notes: 'White pebbles can reduce space by deferring storage of the merge.',
  },
]

const tradeoffCases = [
  {
    id: 'low-space',
    label: 'Low space',
    summary: 'Use the minimum number of pebbles and accept recomputation.',
    effect: 'Moves grow quickly; time may be exponential in worst cases.',
  },
  {
    id: 'balanced',
    label: 'Balanced',
    summary: 'Keep only the most reused subgraphs pebbled.',
    effect: 'Moderate time and space; common in practice with memoization.',
  },
  {
    id: 'high-space',
    label: 'High space',
    summary: 'Keep almost everything pebbled to avoid recomputation.',
    effect: 'Time is near optimal but memory usage is high.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const pebbleHelpStyles = `
.pebble-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.pebble-help-window {
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background: #c0c0c0;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
}

.pebble-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.pebble-help-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.pebble-help-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.pebble-help-control {
  width: 18px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  text-decoration: none;
  font-size: 11px;
  line-height: 1;
  padding: 0;
}

.pebble-help-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
  overflow-x: auto;
}

.pebble-help-tab {
  flex: 0 0 auto;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.pebble-help-tab.active {
  position: relative;
  top: 1px;
  background: #fff;
}

.pebble-help-main {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  flex: 1;
  min-height: 0;
  border-top: 1px solid #404040;
  background: #fff;
}

.pebble-help-toc {
  overflow: auto;
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
}

.pebble-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.pebble-help-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.pebble-help-toc-list li {
  margin: 0 0 8px;
}

.pebble-help-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.pebble-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.pebble-help-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.pebble-help-section {
  margin: 0 0 22px;
}

.pebble-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.pebble-help-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.pebble-help-content p,
.pebble-help-content li,
.pebble-help-content label,
.pebble-help-content input,
.pebble-help-content button {
  font-size: 12px;
  line-height: 1.5;
}

.pebble-help-content p {
  margin: 0 0 10px;
}

.pebble-help-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.pebble-help-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.pebble-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.pebble-help-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

.pebble-help-inline-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 0 0 10px;
}

.pebble-help-push {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  padding: 4px 8px;
  cursor: pointer;
}

.pebble-help-push.active {
  border-top: 1px solid #404040;
  border-left: 1px solid #404040;
  border-right: 1px solid #fff;
  border-bottom: 1px solid #fff;
  background: #b3b3b3;
}

.pebble-help-formline {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin: 0 0 10px;
}

.pebble-help-range {
  width: min(280px, 100%);
}

@media (max-width: 900px) {
  .pebble-help-title {
    position: static;
    transform: none;
    margin: 0 auto 0 0;
    font-size: 13px;
  }

  .pebble-help-main {
    grid-template-columns: 1fr;
  }

  .pebble-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}
`

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-history', label: 'Historical Context' },
    { id: 'bp-claims', label: 'Key Claims' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-setup', label: 'Problem Setup' },
    { id: 'core-rules', label: 'Core Rules' },
    { id: 'core-variants', label: 'Rule Variants' },
    { id: 'core-recursion', label: 'Memory and Recursion' },
    { id: 'core-families', label: 'Graph Families' },
    { id: 'core-metrics', label: 'Resource Metrics' },
    { id: 'core-strategies', label: 'Strategy Landscape' },
    { id: 'core-proofs', label: 'Lower-Bound Proof Ideas' },
    { id: 'core-applications', label: 'Applications' },
    { id: 'core-compare', label: 'Compare and Contrast' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-tradeoffs', label: 'Tradeoff Profiles' },
  ],
  examples: [
    { id: 'ex-worked', label: 'Worked Examples' },
    { id: 'ex-pseudocode', label: 'Pseudocode Reference' },
    { id: 'ex-gallery', label: 'Graph Gallery' },
    { id: 'ex-selector', label: 'Strategy Selector' },
    { id: 'ex-budget', label: 'Budget Estimator' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function PebbleGamesMemoryRecursionPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const defaultGraph = graphCases[0] ?? {
    id: 'fallback',
    name: 'Unavailable graph',
    nodes: 0,
    edges: 'No data available.',
    minBlackPebbles: 0,
    minBlackWhite: 0,
    notes: 'Add graphs to the gallery.',
  }

  const defaultStrategy = strategies[0] ?? {
    id: 'fallback',
    name: 'Unavailable strategy',
    description: 'No strategies are configured.',
    space: 'Unknown',
    time: 'Unknown',
    bestFor: 'Add strategies to display details.',
  }

  const [selectedGraphId, setSelectedGraphId] = useState(defaultGraph.id)
  const [selectedStrategyId, setSelectedStrategyId] = useState(defaultStrategy.id)
  const [pebbleBudget, setPebbleBudget] = useState(3)
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    const tab = searchParams.get('tab')
    return isTabId(tab) ? tab : 'big-picture'
  })

  const selectedGraph = graphCases.find((graph) => graph.id === selectedGraphId) ?? defaultGraph
  const selectedStrategy = strategies.find((strategy) => strategy.id === selectedStrategyId) ?? defaultStrategy

  const blackFeasible = pebbleBudget >= selectedGraph.minBlackPebbles
  const blackWhiteFeasible = pebbleBudget >= selectedGraph.minBlackWhite
  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  const budgetStatus =
    pebbleBudget < 1
      ? 'Invalid budget.'
      : blackFeasible && blackWhiteFeasible
        ? 'Budget is sufficient for both black and black-white pebbling.'
        : blackWhiteFeasible
          ? 'Budget is enough for black-white but not for black-only.'
          : 'Budget is too small; no valid strategy can reach the target.'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Pebble Games (Memory-Recursion) (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Pebble Games (Memory-Recursion)',
      url: `${location.pathname}${location.search}${location.hash}`,
      kind: 'help',
    }
    const rawTasks = window.localStorage.getItem(MINIMIZED_HELP_TASKS_KEY)
    const parsedTasks = rawTasks ? (JSON.parse(rawTasks) as Array<{ id: string }>) : []
    const nextTasks = [...parsedTasks.filter((task) => task.id !== minimizedTask.id), minimizedTask]
    window.localStorage.setItem(MINIMIZED_HELP_TASKS_KEY, JSON.stringify(nextTasks))

    const historyState = window.history.state as { idx?: number } | null
    if (historyState?.idx && historyState.idx > 0) {
      void navigate(-1)
      return
    }
    void navigate('/algoViz')
  }

  return (
    <div className="pebble-help-page">
      <style>{pebbleHelpStyles}</style>
      <div className="pebble-help-window" role="presentation">
        <header className="pebble-help-titlebar">
          <span className="pebble-help-title">Pebble Games (Memory-Recursion)</span>
          <div className="pebble-help-controls">
            <button className="pebble-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="pebble-help-control" aria-label="Close">X</Link>
          </div>
        </header>

        <div className="pebble-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`pebble-help-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="pebble-help-main">
          <aside className="pebble-help-toc" aria-label="Table of contents">
            <h2 className="pebble-help-toc-title">Contents</h2>
            <ul className="pebble-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="pebble-help-content">
            <h1 className="pebble-help-doc-title">Pebble Games (Memory-Recursion)</h1>
            <p>
              Pebble games are a classic abstraction for memory usage in computation. Each pebble stands for a stored intermediate
              result. Placing a pebble means you computed and kept a value; removing it means you discarded it. The rules encode
              dependency constraints, so pebbling reveals the inherent memory needed to compute an output. This document covers the
              black pebble game, the black-white variant, and the connection to recursion and time-space tradeoffs.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="pebble-help-section">
                  <h2 className="pebble-help-heading">Overview</h2>
                  {bigPicture.map((item) => (
                    <div key={item.title}>
                      <h3 className="pebble-help-subheading">{item.title}</h3>
                      <p>{item.details}</p>
                      <p>{item.notes}</p>
                    </div>
                  ))}
                  <p>
                    Intuition: a black pebble means you have computed and stored the value of that node. To compute a node, all its
                    inputs must be in memory at the same time.
                  </p>
                </section>

                <hr className="pebble-help-divider" />

                <section id="bp-history" className="pebble-help-section">
                  <h2 className="pebble-help-heading">Historical Context</h2>
                  {historicalContext.map((item) => (
                    <div key={item.title}>
                      <h3 className="pebble-help-subheading">{item.title}</h3>
                      <p>{item.details}</p>
                      <p>{item.notes}</p>
                    </div>
                  ))}
                </section>

                <hr className="pebble-help-divider" />

                <section id="bp-claims" className="pebble-help-section">
                  <h2 className="pebble-help-heading">Key Claims</h2>
                  {keyClaims.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <hr className="pebble-help-divider" />

                <section id="bp-takeaways" className="pebble-help-section">
                  <h2 className="pebble-help-heading">Key Takeaways</h2>
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
                <section id="core-setup" className="pebble-help-section">
                  <h2 className="pebble-help-heading">Problem Setup</h2>
                  {problemSetup.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-rules" className="pebble-help-section">
                  <h2 className="pebble-help-heading">Core Rules (Black Pebbling)</h2>
                  {coreRules.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-variants" className="pebble-help-section">
                  <h2 className="pebble-help-heading">Rule Variants</h2>
                  {ruleVariants.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-recursion" className="pebble-help-section">
                  <h2 className="pebble-help-heading">Memory and Recursion</h2>
                  {memoryRecursionLink.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    In recursive algorithms, the call stack holds intermediate results. Pebbling makes that memory explicit and shows
                    that when the stack is too small, the algorithm must recompute work that was previously done.
                  </p>
                </section>

                <section id="core-families" className="pebble-help-section">
                  <h2 className="pebble-help-heading">Graph Families and Their Pebbling Behavior</h2>
                  {graphFamilies.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-metrics" className="pebble-help-section">
                  <h2 className="pebble-help-heading">Resource Metrics</h2>
                  {metrics.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-strategies" className="pebble-help-section">
                  <h2 className="pebble-help-heading">Strategy Landscape</h2>
                  {strategies.map((item) => (
                    <div key={item.id}>
                      <h3 className="pebble-help-subheading">{item.name}</h3>
                      <p>{item.description}</p>
                      <p><strong>Space:</strong> {item.space}</p>
                      <p><strong>Time:</strong> {item.time}</p>
                      <p><strong>Best for:</strong> {item.bestFor}</p>
                    </div>
                  ))}
                </section>

                <section id="core-proofs" className="pebble-help-section">
                  <h2 className="pebble-help-heading">Proof Ideas for Lower Bounds</h2>
                  {proofIdeas.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-applications" className="pebble-help-section">
                  <h2 className="pebble-help-heading">Applications</h2>
                  {applications.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-compare" className="pebble-help-section">
                  <h2 className="pebble-help-heading">Compare and Contrast</h2>
                  {compareContrast.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-pitfalls" className="pebble-help-section">
                  <h2 className="pebble-help-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((pitfall) => (
                      <li key={pitfall.mistake}>
                        <strong>{pitfall.mistake}:</strong> {pitfall.description}
                      </li>
                    ))}
                  </ul>
                </section>

                <section id="core-tradeoffs" className="pebble-help-section">
                  <h2 className="pebble-help-heading">Time-Space Tradeoff Profiles</h2>
                  {tradeoffCases.map((item) => (
                    <p key={item.id}>
                      <strong>{item.label}:</strong> {item.summary} {item.effect}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                <section id="ex-worked" className="pebble-help-section">
                  <h2 className="pebble-help-heading">Worked Examples</h2>
                  {workedExamples.map((example) => (
                    <div key={example.title}>
                      <h3 className="pebble-help-subheading">{example.title}</h3>
                      <div className="pebble-help-codebox">
                        <code>{example.code.trim()}</code>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>

                <section id="ex-pseudocode" className="pebble-help-section">
                  <h2 className="pebble-help-heading">Pseudocode Reference</h2>
                  {pseudocode.map((example) => (
                    <div key={example.title}>
                      <h3 className="pebble-help-subheading">{example.title}</h3>
                      <div className="pebble-help-codebox">
                        <code>{example.code.trim()}</code>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>

                <section id="ex-gallery" className="pebble-help-section">
                  <h2 className="pebble-help-heading">Graph Gallery</h2>
                  <p>
                    Select a DAG shape to review its structure and typical pebbling requirements. These examples are small, but they
                    illustrate general behavior.
                  </p>
                  <div className="pebble-help-inline-buttons">
                    {graphCases.map((graph) => (
                      <button
                        key={graph.id}
                        type="button"
                        className={`pebble-help-push ${selectedGraph.id === graph.id ? 'active' : ''}`}
                        onClick={() => setSelectedGraphId(graph.id)}
                        aria-pressed={selectedGraph.id === graph.id}
                      >
                        {graph.name}
                      </button>
                    ))}
                  </div>
                  <h3 className="pebble-help-subheading">{selectedGraph.name}</h3>
                  <p><strong>Nodes:</strong> {selectedGraph.nodes}</p>
                  <p><strong>Edges:</strong> {selectedGraph.edges}</p>
                  <p><strong>Black pebble minimum:</strong> {selectedGraph.minBlackPebbles}</p>
                  <p><strong>Black-white minimum:</strong> {selectedGraph.minBlackWhite}</p>
                  <p>{selectedGraph.notes}</p>
                </section>

                <section id="ex-selector" className="pebble-help-section">
                  <h2 className="pebble-help-heading">Strategy Selector</h2>
                  <p>
                    Choose a strategy and review the tradeoff profile. Real schedules often combine these ideas based on which
                    subgraphs are reused the most.
                  </p>
                  <div className="pebble-help-inline-buttons">
                    {strategies.map((strategy) => (
                      <button
                        key={strategy.id}
                        type="button"
                        className={`pebble-help-push ${selectedStrategy.id === strategy.id ? 'active' : ''}`}
                        onClick={() => setSelectedStrategyId(strategy.id)}
                        aria-pressed={selectedStrategy.id === strategy.id}
                      >
                        {strategy.name}
                      </button>
                    ))}
                  </div>
                  <h3 className="pebble-help-subheading">{selectedStrategy.name}</h3>
                  <p>{selectedStrategy.description}</p>
                  <p><strong>Space:</strong> {selectedStrategy.space}</p>
                  <p><strong>Time:</strong> {selectedStrategy.time}</p>
                  <p><strong>Best for:</strong> {selectedStrategy.bestFor}</p>
                </section>

                <section id="ex-budget" className="pebble-help-section">
                  <h2 className="pebble-help-heading">Pebble Budget Estimator</h2>
                  <p>
                    Adjust the pebble budget and compare feasibility for the selected graph under black-only and black-white rules.
                  </p>
                  <div className="pebble-help-formline">
                    <label htmlFor="pebble-budget">
                      <strong>Budget:</strong> {pebbleBudget} pebble(s)
                    </label>
                    <input
                      id="pebble-budget"
                      className="pebble-help-range"
                      type="range"
                      min={1}
                      max={6}
                      value={pebbleBudget}
                      onChange={(event) => setPebbleBudget(Number(event.target.value))}
                      aria-label="Pebble budget"
                    />
                  </div>
                  <p><strong>Graph:</strong> {selectedGraph.name}</p>
                  <p><strong>Black-only feasible:</strong> {blackFeasible ? 'Yes' : 'No'}</p>
                  <p><strong>Black-white feasible:</strong> {blackWhiteFeasible ? 'Yes' : 'No'}</p>
                  <p>{budgetStatus}</p>
                  <p>
                    Increasing budget reduces recomputation, but real systems trade memory for time and energy. Pebbling makes this
                    explicit by counting both pebbles and moves.
                  </p>
                </section>
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="pebble-help-section">
                <h2 className="pebble-help-heading">Glossary</h2>
                {quickGlossary.map((item) => (
                  <p key={item.term}>
                    <strong>{item.term}:</strong> {item.definition}
                  </p>
                ))}
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
