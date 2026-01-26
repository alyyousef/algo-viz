
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { win95Styles } from '@/styles/win95'

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

export default function PebbleGamesMemoryRecursionPage(): JSX.Element {
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

  const selectedGraph = graphCases.find((graph) => graph.id === selectedGraphId) ?? defaultGraph
  const selectedStrategy = strategies.find((strategy) => strategy.id === selectedStrategyId) ?? defaultStrategy

  const blackFeasible = pebbleBudget >= selectedGraph.minBlackPebbles
  const blackWhiteFeasible = pebbleBudget >= selectedGraph.minBlackWhite

  const budgetStatus = useMemo(() => {
    if (pebbleBudget < 1) {
      return 'Invalid budget.'
    }
    if (blackFeasible && blackWhiteFeasible) {
      return 'Budget is sufficient for both black and black-white pebbling.'
    }
    if (blackWhiteFeasible) {
      return 'Budget is enough for black-white but not for black-only.'
    }
    return 'Budget is too small; no valid strategy can reach the target.'
  }, [blackFeasible, blackWhiteFeasible, pebbleBudget])

  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Pebble Games (Memory-Recursion)</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">How pebbling models memory usage in recursive computation</div>
              <p className="win95-text">
                Pebble games are a classic abstraction for memory usage in computation. Each pebble stands for a stored intermediate
                result. Placing a pebble means you computed and kept a value; removing it means you discarded it. The rules encode
                dependency constraints, so pebbling reveals the inherent memory needed to compute an output. This page covers the black
                pebble game, the black-white (reversible) variant, and the deep connection to recursion and time-space tradeoffs.
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
              {historicalContext.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.details}</p>
                  <p className="win95-text">{item.notes}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Quick Glossary</legend>
            <div className="win95-grid win95-grid-2">
              {quickGlossary.map((item) => (
                <div key={item.term} className="win95-panel">
                  <div className="win95-heading">{item.term}</div>
                  <p className="win95-text">{item.definition}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Problem Setup</legend>
            <div className="win95-grid win95-grid-2">
              {problemSetup.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Core Rules (Black Pebbling)</legend>
            <div className="win95-grid win95-grid-2">
              {coreRules.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                Intuition: a black pebble means you have computed and stored the value of that node. To compute a node, all its inputs
                must be in memory at the same time.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Rule Variants</legend>
            <div className="win95-grid win95-grid-2">
              {ruleVariants.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Memory and Recursion Connection</legend>
            <div className="win95-grid win95-grid-2">
              {memoryRecursionLink.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                In recursive algorithms, the call stack holds intermediate results. Pebbling makes that memory explicit and shows that
                when the stack is too small, the algorithm must recompute work that was previously done.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Key Claims</legend>
            <div className="win95-grid win95-grid-2">
              {keyClaims.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Graph Families and Their Pebbling Behavior</legend>
            <div className="win95-grid win95-grid-2">
              {graphFamilies.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Resource Metrics</legend>
            <div className="win95-grid win95-grid-2">
              {metrics.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Strategy Landscape</legend>
            <div className="win95-grid win95-grid-2">
              {strategies.map((item) => (
                <div key={item.id} className="win95-panel">
                  <div className="win95-heading">{item.name}</div>
                  <p className="win95-text">{item.description}</p>
                  <p className="win95-text"><strong>Space:</strong> {item.space}</p>
                  <p className="win95-text"><strong>Time:</strong> {item.time}</p>
                  <p className="win95-text"><strong>Best for:</strong> {item.bestFor}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Proof Ideas for Lower Bounds</legend>
            <div className="win95-grid win95-grid-2">
              {proofIdeas.map((item) => (
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
              {workedExamples.map((example) => (
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
            <legend>Pseudocode Reference</legend>
            <div className="win95-stack">
              {pseudocode.map((example) => (
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
            <legend>Interactive Explorers</legend>
            <div className="win95-stack">
              <div className="win95-panel">
                <div className="win95-heading">Graph Gallery</div>
                <p className="win95-text">
                  Select a DAG shape to see its structure and typical pebbling requirements. These examples are small but highlight
                  general behavior.
                </p>
                <div className="win95-grid win95-grid-2">
                  {graphCases.map((graph) => (
                    <button
                      key={graph.id}
                      type="button"
                      className="win95-button"
                      onClick={() => setSelectedGraphId(graph.id)}
                    >
                      {graph.name}
                    </button>
                  ))}
                </div>
                <div className="win95-panel win95-panel--raised">
                  <p className="win95-text"><strong>Selected:</strong> {selectedGraph.name}</p>
                  <p className="win95-text"><strong>Nodes:</strong> {selectedGraph.nodes}</p>
                  <p className="win95-text"><strong>Edges:</strong> {selectedGraph.edges}</p>
                  <p className="win95-text"><strong>Black pebble minimum:</strong> {selectedGraph.minBlackPebbles}</p>
                  <p className="win95-text"><strong>Black-white minimum:</strong> {selectedGraph.minBlackWhite}</p>
                  <p className="win95-text">{selectedGraph.notes}</p>
                </div>
              </div>

              <div className="win95-panel">
                <div className="win95-heading">Strategy Selector</div>
                <p className="win95-text">
                  Choose a strategy and see the expected tradeoffs. Real-world schedules often combine these ideas based on which
                  subgraphs are reused the most.
                </p>
                <div className="win95-grid win95-grid-2">
                  {strategies.map((strategy) => (
                    <button
                      key={strategy.id}
                      type="button"
                      className="win95-button"
                      onClick={() => setSelectedStrategyId(strategy.id)}
                    >
                      {strategy.name}
                    </button>
                  ))}
                </div>
                <div className="win95-panel win95-panel--raised">
                  <p className="win95-text"><strong>Strategy:</strong> {selectedStrategy.name}</p>
                  <p className="win95-text">{selectedStrategy.description}</p>
                  <p className="win95-text"><strong>Space:</strong> {selectedStrategy.space}</p>
                  <p className="win95-text"><strong>Time:</strong> {selectedStrategy.time}</p>
                  <p className="win95-text"><strong>Best for:</strong> {selectedStrategy.bestFor}</p>
                </div>
              </div>

              <div className="win95-panel">
                <div className="win95-heading">Pebble Budget Estimator</div>
                <p className="win95-text">
                  Adjust the pebble budget and see whether the chosen graph is feasible under black-only and black-white rules.
                </p>
                <div className="win95-grid win95-grid-2">
                  <div className="win95-panel win95-panel--raised">
                    <p className="win95-text"><strong>Budget:</strong> {pebbleBudget} pebble(s)</p>
                    <input
                      type="range"
                      min={1}
                      max={6}
                      value={pebbleBudget}
                      onChange={(event) => setPebbleBudget(Number(event.target.value))}
                      aria-label="Pebble budget"
                    />
                  </div>
                  <div className="win95-panel win95-panel--raised">
                    <p className="win95-text"><strong>Black-only feasible:</strong> {blackFeasible ? 'Yes' : 'No'}</p>
                    <p className="win95-text"><strong>Black-white feasible:</strong> {blackWhiteFeasible ? 'Yes' : 'No'}</p>
                    <p className="win95-text">{budgetStatus}</p>
                  </div>
                </div>
                <div className="win95-panel win95-panel--raised">
                  <p className="win95-text">
                    Increasing budget reduces recomputation, but real systems trade memory for time and energy. Pebbling makes this
                    explicit by counting both pebbles and moves.
                  </p>
                </div>
              </div>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Time-Space Tradeoff Profiles</legend>
            <div className="win95-grid win95-grid-3">
              {tradeoffCases.map((item) => (
                <div key={item.id} className="win95-panel">
                  <div className="win95-heading">{item.label}</div>
                  <p className="win95-text">{item.summary}</p>
                  <p className="win95-text">{item.effect}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Applications</legend>
            <div className="win95-grid win95-grid-2">
              {applications.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Compare and Contrast</legend>
            <div className="win95-grid win95-grid-2">
              {compareContrast.map((item) => (
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
