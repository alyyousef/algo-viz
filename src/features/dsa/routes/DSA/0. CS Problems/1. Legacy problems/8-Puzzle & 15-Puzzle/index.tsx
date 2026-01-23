import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

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

const keyTakeaways = [
  'The puzzle is a canonical state-space search problem with a simple action model.',
  'Solvability is determined by inversion parity; always check before searching.',
  'A* with Manhattan distance is the baseline optimal solver.',
  'IDA* is preferred for the 15-puzzle when memory is limited.',
  'Better heuristics reduce runtime dramatically by shrinking the search space.',
]

export default function EightPuzzlePage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">8-Puzzle & 15-Puzzle</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Sliding tile puzzles that defined heuristic search</div>
              <p className="win95-text">
                The 8-puzzle and 15-puzzle are classic sliding-tile problems that highlight how search algorithms
                behave in large state spaces. With only one empty space, each move is simple, but finding an optimal
                sequence can be difficult without strong heuristics. These puzzles are the go-to teaching example
                for A*, admissible heuristics, and solvability.
              </p>
            </div>
            <Link to="/algoViz" className="win95-button" role="button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-fieldset">
            <legend>The Big Picture</legend>
            <div className="win95-grid win95-grid-3">
              {bigPicture.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.details}</p>
                  <p className="win95-text">{item.notes}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Historical Context</legend>
            <div className="win95-grid win95-grid-2">
              {history.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.details}</p>
                  <p className="win95-text">{item.notes}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Core Concepts</legend>
            <div className="win95-grid win95-grid-2">
              {coreConcepts.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Solvability Rules</legend>
            <div className="win95-grid win95-grid-2">
              {solvabilityRules.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                Practical tip: If your solver runs forever on a random board, it is often because the board is unsolvable.
                The inversion check is O(n^2) and avoids huge wasted searches.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Algorithm Options</legend>
            <div className="win95-grid win95-grid-2">
              {algorithmOptions.map((item) => (
                <div key={item.name} className="win95-panel">
                  <div className="win95-heading">{item.name}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Heuristics That Matter</legend>
            <div className="win95-grid win95-grid-2">
              {heuristics.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity and Practical Trade-offs</legend>
            <div className="win95-panel">
              <table className="win95-table">
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
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Optimization Tips</legend>
            <div className="win95-grid win95-grid-2">
              {optimizationTips.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Common Pitfalls</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {pitfalls.map((pitfall) => (
                  <li key={pitfall.mistake}>
                    <strong>{pitfall.mistake}:</strong> {pitfall.description}
                  </li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Real-World Connections</legend>
            <div className="win95-grid win95-grid-3">
              {realWorldConnections.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Worked Examples</legend>
            <div className="win95-stack">
              {examples.map((example) => (
                <div key={example.title} className="win95-panel">
                  <div className="win95-heading">{example.title}</div>
                  <pre className="win95-code">
                    <code>{example.code.trim()}</code>
                  </pre>
                  <p className="win95-text">{example.explanation}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Key Takeaways</legend>
            <div className="win95-grid win95-grid-2">
              {keyTakeaways.map((takeaway) => (
                <div key={takeaway} className="win95-panel">
                  <p className="win95-text">{takeaway}</p>
                </div>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}
