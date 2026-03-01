
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'What it is',
    details:
      'A sliding-tile puzzle on a 3x3 board (8-puzzle) or 4x4 board (15-puzzle) with one empty space.',
    notes:
      'A move slides a tile into the empty space. The goal is to reach a target ordering of tiles.',
  },
  {
    title: 'Why it matters',
    details:
      'It is a classic testbed for search algorithms, heuristics, and optimal path finding.',
    notes:
      'Many AI and algorithms courses use it to explain state spaces and admissible heuristics.',
  },
  {
    title: 'What it teaches',
    details:
      'State representation, branching factor, pruning, and trade-offs between time and memory.',
    notes:
      'It shows why blind search explodes and why good heuristics make problems tractable.',
  },
]

const history = [
  {
    title: '1870s: Sam Loyd popularizes the 15-puzzle',
    details:
      'The 15-puzzle became a worldwide craze, with prizes offered for supposedly impossible configurations.',
    notes:
      'It helped motivate early thinking about permutation parity and solvability.',
  },
  {
    title: '1950s-1970s: Search algorithms formalized',
    details:
      'Researchers used the 8-puzzle to compare BFS, DFS, A*, and heuristic design.',
    notes:
      'It became a standard example for admissible heuristics and optimal search.',
  },
  {
    title: '1990s+: Pattern databases',
    details:
      'Large precomputed heuristic tables drastically improved 15-puzzle performance.',
    notes:
      'This inspired a wave of heuristic engineering for hard combinatorial problems.',
  },
]

const coreConcepts = [
  {
    title: 'State representation',
    detail:
      'A state is the layout of tiles, often stored as a 1D array of length 9 or 16. The blank is 0.',
  },
  {
    title: 'Actions (moves)',
    detail:
      'From any state, you can move the blank up, down, left, or right if inside the board.',
  },
  {
    title: 'Goal test',
    detail:
      'Check if the board matches the target ordering (typically 1..8 or 1..15 with blank last).',
  },
  {
    title: 'Cost model',
    detail:
      'Each move usually costs 1, so shortest path equals fewest moves.',
  },
  {
    title: 'State graph',
    detail:
      'Each state is a node. Edges connect states that differ by one legal blank move. The graph is unweighted and undirected.',
  },
  {
    title: 'Branching factor',
    detail:
      'The blank has 2, 3, or 4 legal moves depending on its position, so average branching is ~2.13 (8-puzzle) and ~2.67 (15-puzzle).',
  },
]

const solvabilityRules = [
  {
    title: 'Inversions',
    detail:
      'Flatten the board left-to-right, top-to-bottom, ignoring the blank. An inversion is a pair of tiles (a, b) where a appears before b but a > b.',
  },
  {
    title: '8-puzzle (odd width)',
    detail:
      'A configuration is solvable if the number of inversions is even.',
  },
  {
    title: '15-puzzle (even width)',
    detail:
      'A configuration is solvable if (inversions + blankRowFromBottom) is even.',
  },
  {
    title: 'Why this works',
    detail:
      'Sliding moves preserve permutation parity. The board splits into two disjoint sets: solvable and unsolvable.',
  },
]

const howToThink = [
  {
    title: 'Think in states, not moves',
    detail:
      'Each board configuration is a state. Your job is to find a shortest path in the state graph, not to solve by hand.',
  },
  {
    title: 'Search is the baseline',
    detail:
      'Blind search is too big for 15-puzzle. You need heuristics to guide the search to promising states.',
  },
  {
    title: 'Heuristics must be safe',
    detail:
      'If you want optimal solutions, the heuristic must never overestimate. This is why Manhattan distance is the default.',
  },
  {
    title: 'Prune with memory and math',
    detail:
      'Use solvability tests, closed sets, and good encodings to avoid exploring unreachable or duplicate states.',
  },
  {
    title: 'Know your constraint',
    detail:
      'If memory is limited, choose IDA*. If time is limited, invest in stronger heuristics or bidirectional search.',
  },
]

const algorithmOptions = [
  {
    name: 'Breadth-First Search (BFS)',
    detail:
      'Finds optimal solutions but memory grows exponentially. Fine for 8-puzzle, impractical for 15-puzzle.',
  },
  {
    name: 'Uniform Cost Search',
    detail:
      'Same as BFS when all moves cost 1. Useful when costs differ.',
  },
  {
    name: 'Depth-First Search (DFS)',
    detail:
      'Low memory but can get lost deep and is not optimal without depth limits.',
  },
  {
    name: 'Iterative Deepening DFS (IDDFS)',
    detail:
      'Combines low memory with optimality for unit-cost moves, but re-expands nodes each depth.',
  },
  {
    name: 'A* Search',
    detail:
      'Optimal with an admissible heuristic. The standard approach for 8-puzzle and small 15-puzzle instances.',
  },
  {
    name: 'IDA*',
    detail:
      'Iterative deepening A* reduces memory by doing depth-limited f-cost searches.',
  },
  {
    name: 'Bidirectional Search',
    detail:
      'Search from start and goal simultaneously; works well when reverse moves are easy.',
  },
]

const heuristics = [
  {
    title: 'Misplaced tiles (Hamming)',
    detail:
      'Count how many tiles are not in their goal positions. Simple but weak.',
  },
  {
    title: 'Manhattan distance',
    detail:
      'Sum of distances of each tile from its goal position. Admissible and standard.',
  },
  {
    title: 'Linear conflict',
    detail:
      'Adds extra cost when two tiles are in the same row or column but in the wrong order.',
  },
  {
    title: 'Pattern database',
    detail:
      'Precompute exact distances for subsets of tiles. Combine for a stronger heuristic.',
  },
  {
    title: 'Corner and edge conflicts',
    detail:
      'Add penalties for tiles blocking correct placement of corner or edge tiles.',
  },
]

const admissibilityNotes = [
  {
    title: 'Admissible heuristic',
    detail:
      'Never overestimates true distance. Guarantees optimality for A* and IDA*.',
  },
  {
    title: 'Consistent heuristic',
    detail:
      'Also called monotonic. Ensures that f = g + h never decreases along a path, enabling efficient A* behavior.',
  },
  {
    title: 'Manhattan is both',
    detail:
      'Manhattan distance is admissible and consistent because each move changes total distance by at most 1.',
  },
  {
    title: 'Pattern databases',
    detail:
      'If disjoint and combined by sum, they stay admissible. If overlapping, use max instead of sum.',
  },
]

const complexityTable = [
  {
    approach: 'BFS (8-puzzle)',
    time: 'Exponential in depth',
    space: 'Exponential (stores all frontier states)',
    note: 'Feasible for 8-puzzle, not for 15-puzzle.',
  },
  {
    approach: 'A* + Manhattan (8-puzzle)',
    time: 'Much faster in practice',
    space: 'High but manageable for 8-puzzle',
    note: 'Standard baseline for optimal solutions.',
  },
  {
    approach: 'A* + PDB (15-puzzle)',
    time: 'Faster but still heavy',
    space: 'Very high for large PDBs',
    note: 'Often memory-bound on typical machines.',
  },
  {
    approach: 'IDA* + Manhattan (15-puzzle)',
    time: 'Exponential but prunable',
    space: 'Linear in depth',
    note: 'Common choice for 15-puzzle due to low memory usage.',
  },
]

const comparisons = [
  {
    title: '8/15-puzzle vs 8-queens',
    detail:
      'Both are classic state-space searches, but the 8-queens is a constraint satisfaction problem with no path costs. The puzzle is shortest-path.',
  },
  {
    title: '8/15-puzzle vs TSP',
    detail:
      'TSP is an optimization over permutations with weighted edges. The puzzle is unweighted shortest-path on a fixed graph.',
  },
  {
    title: '8/15-puzzle vs Sudoku',
    detail:
      'Sudoku is a constraint satisfaction and deduction problem. The puzzle is pure search with a simple transition model.',
  },
  {
    title: '8/15-puzzle vs Rubik\'s Cube',
    detail:
      'Rubik\'s has a far larger state space and higher branching. The puzzle is smaller but still hard without heuristics.',
  },
  {
    title: '8/15-puzzle vs Graph shortest path',
    detail:
      'Conceptually identical: find the shortest path in a graph. The puzzle just defines the graph implicitly.',
  },
]

const pitfalls = [
  {
    mistake: 'Ignoring solvability',
    description:
      'Half of all random configurations are unsolvable. Always run the inversion test first.',
  },
  {
    mistake: 'Weak or inadmissible heuristic',
    description:
      'A weak heuristic makes A* slow; an inadmissible heuristic can return non-optimal solutions.',
  },
  {
    mistake: 'No closed set',
    description:
      'Without a visited set, search will revisit states and blow up quickly.',
  },
  {
    mistake: 'Inefficient state encoding',
    description:
      'Using large objects or arrays as keys can dominate runtime. Compact encodings help a lot.',
  },
]

const variants = [
  {
    title: 'General N-puzzle',
    detail:
      'The same rules on an NxN board. Solvability rules generalize by board parity and blank row.',
  },
  {
    title: 'Weighted puzzle',
    detail:
      'Different tiles have different move costs, turning the problem into a weighted shortest path.',
  },
  {
    title: 'Toroidal puzzle',
    detail:
      'The board wraps around edges, changing the state graph and solvability structure.',
  },
  {
    title: 'Multiple blanks',
    detail:
      'More than one empty space increases branching and changes solvability constraints.',
  },
]

const optimizationTips = [
  {
    title: 'Bit-packing',
    detail:
      'Pack tiles into a 64-bit integer (4 bits per tile for 15-puzzle) for fast hashing and comparisons.',
  },
  {
    title: 'Precompute goal positions',
    detail:
      'Store goal coordinates for each tile to compute Manhattan distance quickly.',
  },
  {
    title: 'Move ordering',
    detail:
      'In IDA*, expand moves that reduce the heuristic first to find solutions earlier.',
  },
  {
    title: 'Transposition table',
    detail:
      'Cache visited states with best g-cost to prune worse paths.',
  },
]

const whatsItFor = [
  {
    title: 'Teaching search',
    detail:
      'Used to teach BFS, DFS, A*, IDA*, and the impact of heuristics on node expansions.',
  },
  {
    title: 'Benchmarking heuristics',
    detail:
      'Small enough to test quickly, large enough to show huge differences in heuristic quality.',
  },
  {
    title: 'Explaining admissibility',
    detail:
      'A clean example for why never overestimate matters and how it guarantees optimality.',
  },
  {
    title: 'Algorithm design patterns',
    detail:
      'Demonstrates how to combine precomputation (PDBs) with runtime search.',
  },
]

const realWorldConnections = [
  {
    title: 'Robotics and planning',
    detail:
      'The puzzle is a simplified planning problem: move parts to reach a goal state with constraints.',
  },
  {
    title: 'Compiler optimization',
    detail:
      'Heuristic search resembles register allocation and instruction scheduling problems.',
  },
  {
    title: 'Heuristic engineering',
    detail:
      'Pattern databases are an example of trading memory for speed in search tasks.',
  },
]

const examples = [
  {
    title: 'Solvability check (pseudo)',
    code: `function isSolvable(board, size):
  list = board without 0
  inversions = countPairs(i < j and list[i] > list[j])
  if size is odd:
    return inversions % 2 == 0
  blankRowFromBottom = size - rowIndexOfBlank
  return (inversions + blankRowFromBottom) % 2 == 0`,
    explanation:
      'The solvability rule is a fast pre-check that prevents wasted search on impossible inputs.',
  },
  {
    title: 'A* with Manhattan heuristic (pseudo)',
    code: `function AStar(start, goal):
  open = priority queue by f = g + h
  gScore[start] = 0
  open.push(start)
  while open not empty:
    state = open.popMin()
    if state == goal: return reconstructPath(state)
    for neighbor in neighbors(state):
      tentative = gScore[state] + 1
      if tentative < gScore[neighbor]:
        parent[neighbor] = state
        gScore[neighbor] = tentative
        f = tentative + manhattan(neighbor)
        open.pushOrUpdate(neighbor, f)
  return failure`,
    explanation:
      'A* finds an optimal solution when the heuristic never overestimates.',
  },
  {
    title: 'Manhattan distance example',
    code: `Goal:
1 2 3
4 5 6
7 8 0

State:
1 2 3
4 5 6
0 7 8

Manhattan = dist(7) + dist(8) = 1 + 1 = 2`,
    explanation:
      'Each tile contributes its row and column distance from the goal position.',
  },
]

const evaluationChecklist = [
  {
    title: 'Correctness',
    detail:
      'Does the solver always return a valid sequence of moves that reaches the goal?',
  },
  {
    title: 'Optimality',
    detail:
      'Does it return the shortest solution length? (Requires admissible heuristic.)',
  },
  {
    title: 'Performance',
    detail:
      'Track nodes expanded, max frontier size, and runtime.',
  },
  {
    title: 'Memory',
    detail:
      'A* can blow up memory. IDA* keeps memory low but can re-expand nodes.',
  },
]

const keyTakeaways = [
  'The puzzle is a canonical state-space search problem with a simple action model.',
  'Solvability is determined by inversion parity; always check before searching.',
  'A* with Manhattan distance is the baseline optimal solver.',
  'IDA* is preferred for the 15-puzzle when memory is limited.',
  'Better heuristics reduce runtime dramatically by shrinking the search space.',
]

const glossary = [
  {
    term: 'Inversion',
    definition:
      'A pair of tiles out of order in the flattened board; used to test solvability.',
  },
  {
    term: 'Admissible heuristic',
    definition:
      'A heuristic that never overestimates the true distance to the goal.',
  },
  {
    term: 'Consistent heuristic',
    definition:
      'A heuristic where f = g + h never decreases along any path.',
  },
  {
    term: 'Pattern database',
    definition:
      'A precomputed table of exact distances for subsets of tiles, used as a heuristic.',
  },
  {
    term: 'State space',
    definition:
      'The graph of all reachable puzzle configurations connected by legal moves.',
  },
  {
    term: 'Branching factor',
    definition:
      'Average number of legal moves from a state; roughly 2.13 for 8-puzzle and 2.67 for 15-puzzle.',
  },
]

export default function EightPuzzlePage(): JSX.Element {
  type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    const tab = searchParams.get('tab')
    return tab === 'big-picture' || tab === 'core-concepts' || tab === 'examples' || tab === 'glossary'
      ? tab
      : 'big-picture'
  })

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    const label =
      activeTab === 'big-picture'
        ? 'The Big Picture'
        : activeTab === 'core-concepts'
          ? 'Core Concepts'
          : activeTab === 'examples'
            ? 'Examples'
            : 'Glossary'
    document.title = `8-Puzzle & 15-Puzzle (${label})`
  }, [activeTab, searchParams, setSearchParams])

  const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'
  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: '8-Puzzle & 15-Puzzle',
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

  const tabs: Array<{ id: TabId; label: string }> = [
    { id: 'big-picture', label: 'The Big Picture' },
    { id: 'core-concepts', label: 'Core Concepts' },
    { id: 'examples', label: 'Examples' },
    { id: 'glossary', label: 'Glossary' },
  ]

  const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
    'big-picture': [
      { id: 'bp-overview', label: 'Overview' },
      { id: 'bp-history', label: 'Historical Context' },
      { id: 'bp-takeaways', label: 'Key Takeaways' },
    ],
    'core-concepts': [
      { id: 'core-concepts', label: 'Core Concepts' },
      { id: 'core-thinking', label: 'How to Think' },
      { id: 'core-solvable', label: 'Solvability Rules' },
      { id: 'core-algorithms', label: 'Algorithm Options' },
      { id: 'core-heuristics', label: 'Heuristics' },
      { id: 'core-admissible', label: 'Admissibility Notes' },
      { id: 'core-complexity', label: 'Complexity Table' },
      { id: 'core-use', label: 'What It Is Used For' },
      { id: 'core-optimizations', label: 'Optimization Tips' },
      { id: 'core-compare', label: 'Compare and Contrast' },
      { id: 'core-pitfalls', label: 'Common Pitfalls' },
      { id: 'core-variants', label: 'Variants and Extensions' },
      { id: 'core-real', label: 'Real-World Connections' },
      { id: 'core-eval', label: 'Evaluate a Solver' },
    ],
    examples: [{ id: 'ex-worked', label: 'Worked Examples' }],
    glossary: [{ id: 'glossary-terms', label: 'Terms' }],
  }

  const win98HelpStyles = `
.win98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.win98-window {
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  background: #c0c0c0;
  width: 100%;
  min-height: 100dvh;
  margin: 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.win98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.win98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.win98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
}

.win98-control {
  width: 18px;
  height: 16px;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  line-height: 1;
  cursor: pointer;
}

.win98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.win98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.win98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.win98-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.win98-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.win98-toc-title {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 10px;
}

.win98-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.win98-toc-list li {
  margin: 0 0 8px;
}

.win98-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.win98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.win98-doc-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px;
}

.win98-section {
  margin: 0 0 20px;
}

.win98-heading {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px;
}

.win98-subheading {
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 6px;
}

.win98-content p,
.win98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.win98-content p {
  margin: 0 0 10px;
}

.win98-content ul,
.win98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.win98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.win98-codebox {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 8px;
  margin: 6px 0 10px;
}

.win98-codebox code {
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
  display: block;
}

.win98-table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 0 10px;
  font-size: 12px;
}

.win98-table th,
.win98-table td {
  border: 1px solid #808080;
  padding: 6px 8px;
  text-align: left;
}

.win98-table thead th {
  background: #e6e6e6;
}

@media (max-width: 900px) {
  .win98-main {
    grid-template-columns: 1fr;
  }

  .win98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}
  `

  return (
    <div className="win98-help-page">
      <style>{win98HelpStyles}</style>
      <div className="win98-window" role="presentation">
        <header className="win98-titlebar">
          <span className="win98-title-text">8-Puzzle &amp; 15-Puzzle</span>
          <div className="win98-title-controls">
            <button className="win98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="win98-control" aria-label="Close">X</Link>
          </div>
        </header>
        <div className="win98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`win98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="win98-main">
          <aside className="win98-toc" aria-label="Table of contents">
            <h2 className="win98-toc-title">Contents</h2>
            <ul className="win98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="win98-content">
            <h1 className="win98-doc-title">8-Puzzle &amp; 15-Puzzle</h1>
            <p>
              The 8-puzzle and 15-puzzle are classic sliding-tile problems that highlight how search algorithms behave in large
              state spaces. With only one empty space, each move is simple, but finding an optimal sequence can be difficult without
              strong heuristics. These puzzles are the go-to teaching example for A*, admissible heuristics, and solvability.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="win98-section">
                  <h2 className="win98-heading">The Big Picture</h2>
                  {bigPicture.map((item) => (
                    <div key={item.title}>
                      <h3 className="win98-subheading">{item.title}</h3>
                      <p>{item.details}</p>
                      <p>{item.notes}</p>
                    </div>
                  ))}
                </section>
                <section id="bp-history" className="win98-section">
                  <h2 className="win98-heading">Historical Context</h2>
                  {history.map((item) => (
                    <div key={item.title}>
                      <h3 className="win98-subheading">{item.title}</h3>
                      <p>{item.details}</p>
                      <p>{item.notes}</p>
                    </div>
                  ))}
                </section>
                <section id="bp-takeaways" className="win98-section">
                  <h2 className="win98-heading">Key Takeaways</h2>
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
                <section id="core-concepts" className="win98-section">
                  <h2 className="win98-heading">Core Concepts</h2>
                  {coreConcepts.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-thinking" className="win98-section">
                  <h2 className="win98-heading">How to Think About It</h2>
                  {howToThink.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-solvable" className="win98-section">
                  <h2 className="win98-heading">Solvability Rules</h2>
                  {solvabilityRules.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    <strong>Practical tip:</strong> If your solver runs forever on a random board, it is often because the board is
                    unsolvable. The inversion check is O(n^2) and avoids huge wasted searches.
                  </p>
                </section>
                <section id="core-algorithms" className="win98-section">
                  <h2 className="win98-heading">Algorithm Options</h2>
                  {algorithmOptions.map((item) => (
                    <p key={item.name}>
                      <strong>{item.name}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-heuristics" className="win98-section">
                  <h2 className="win98-heading">Heuristics That Matter</h2>
                  {heuristics.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-admissible" className="win98-section">
                  <h2 className="win98-heading">Admissibility Notes</h2>
                  {admissibilityNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-complexity" className="win98-section">
                  <h2 className="win98-heading">Complexity and Practical Trade-offs</h2>
                  <table className="win98-table">
                    <thead>
                      <tr>
                        <th>Approach</th>
                        <th>Time</th>
                        <th>Space</th>
                        <th>Note</th>
                      </tr>
                    </thead>
                    <tbody>
                      {complexityTable.map((row) => (
                        <tr key={row.approach}>
                          <td>{row.approach}</td>
                          <td>{row.time}</td>
                          <td>{row.space}</td>
                          <td>{row.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
                <section id="core-use" className="win98-section">
                  <h2 className="win98-heading">What It Is Used For</h2>
                  {whatsItFor.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-optimizations" className="win98-section">
                  <h2 className="win98-heading">Optimization Tips</h2>
                  {optimizationTips.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-compare" className="win98-section">
                  <h2 className="win98-heading">Compare and Contrast</h2>
                  {comparisons.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="win98-section">
                  <h2 className="win98-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((pitfall) => (
                      <li key={pitfall.mistake}>
                        <strong>{pitfall.mistake}:</strong> {pitfall.description}
                      </li>
                    ))}
                  </ul>
                </section>
                <section id="core-variants" className="win98-section">
                  <h2 className="win98-heading">Variants and Extensions</h2>
                  {variants.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-real" className="win98-section">
                  <h2 className="win98-heading">Real-World Connections</h2>
                  {realWorldConnections.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-eval" className="win98-section">
                  <h2 className="win98-heading">How to Evaluate a Solver</h2>
                  {evaluationChecklist.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <section id="ex-worked" className="win98-section">
                <h2 className="win98-heading">Worked Examples</h2>
                {examples.map((example) => (
                  <div key={example.title}>
                    <h3 className="win98-subheading">{example.title}</h3>
                    <div className="win98-codebox">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </div>
                ))}
              </section>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="win98-section">
                <h2 className="win98-heading">Glossary</h2>
                {glossary.map((item) => (
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
