import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: 'Map coloring sparks the question (1800s)',
    detail:
      'Cartographers noticed neighboring regions need different colors, leading to the famous four color problem.',
  },
  {
    title: 'Graph theory formalizes coloring (1900s)',
    detail:
      'Graphs offered a clean model: vertices are regions, edges are adjacencies, colors are labels.',
  },
  {
    title: 'Backtracking becomes practical (1950s)',
    detail:
      'Search with pruning made NP-complete problems solvable for small to medium graphs.',
  },
  {
    title: 'Heuristics and SAT solvers (1990s)',
    detail:
      'Coloring evolved into constraint satisfaction; heuristics like MRV and DSATUR improved real performance.',
  },
]

const mentalModels = [
  {
    title: 'Paint without clashes',
    detail:
      'Assign a color to each node so neighbors never share the same color. If you hit a clash, erase and try a new color.',
  },
  {
    title: 'Constraint satisfaction',
    detail:
      'Each vertex is a variable and each color is a value. Edges impose "not equal" constraints.',
  },
  {
    title: 'Search tree pruning',
    detail:
      'Every choice creates a branch. Backtracking cuts off branches that violate constraints early.',
  },
]

const coreIdeas = [
  {
    title: 'Problem statement',
    detail:
      'Color the vertices of a graph using at most k colors so that no two adjacent vertices share the same color.',
  },
  {
    title: 'Decision vs optimization',
    detail:
      'The decision version asks if k colors are enough. The optimization version finds the smallest k (chromatic number).',
  },
  {
    title: 'Backtracking approach',
    detail:
      'Assign colors vertex by vertex, checking constraints at each step. If a conflict appears, backtrack.',
  },
  {
    title: 'Pruning',
    detail:
      'As soon as a vertex has no valid color, the current partial assignment is abandoned.',
  },
]

const algorithmSteps = [
  'Order vertices (simple order, or by degree).',
  'Try to assign a color to the next vertex from 1..k.',
  'Check if any neighbor already has that color; if yes, skip.',
  'If valid, recurse to the next vertex.',
  'If all colors fail, backtrack to the previous vertex.',
  'If all vertices are colored, success.',
]

const dataStructures = [
  {
    title: 'Adjacency list or matrix',
    detail:
      'Use a matrix for fast conflict checks, or a list for space efficiency on sparse graphs.',
  },
  {
    title: 'Color array',
    detail:
      'Stores assigned color for each vertex. Zero or -1 denotes uncolored.',
  },
  {
    title: 'Ordering heuristic',
    detail:
      'Ordering vertices by degree, MRV, or DSATUR often reduces branching.',
  },
  {
    title: 'Constraint checks',
    detail:
      'A helper function verifies that a chosen color does not conflict with neighbors.',
  },
]

const correctnessNotes = [
  {
    title: 'Invariant',
    detail:
      'At each recursion depth, the partial coloring satisfies all adjacency constraints for colored vertices.',
  },
  {
    title: 'Completeness',
    detail:
      'Backtracking explores all possible colorings consistent with the partial assignment, so it finds a solution if one exists.',
  },
  {
    title: 'Soundness',
    detail:
      'Only valid colorings are accepted because every assignment is checked against neighbors.',
  },
  {
    title: 'Decision guarantee',
    detail:
      'If the algorithm returns false for k, no valid coloring with k colors exists under the chosen model.',
  },
]

const complexityNotes = [
  {
    title: 'Worst-case time',
    detail:
      'O(k^n) in the worst case, since each of n vertices can take k colors.',
  },
  {
    title: 'Space complexity',
    detail:
      'O(n + m) for the graph plus O(n) recursion and color storage.',
  },
  {
    title: 'Practical performance',
    detail:
      'Heuristics and pruning can reduce the search space dramatically on real graphs.',
  },
  {
    title: 'Optimization cost',
    detail:
      'Finding the chromatic number typically tries k from lower bounds upward and can be expensive.',
  },
]

const edgeCases = [
  {
    title: 'Disconnected graphs',
    detail:
      'Each component can be colored independently, but the same k limit applies globally.',
  },
  {
    title: 'Complete graphs',
    detail:
      'A complete graph of size n requires n colors; backtracking quickly discovers this for small k.',
  },
  {
    title: 'Bipartite graphs',
    detail:
      'If the graph is bipartite, two colors suffice. Testing bipartiteness can short-circuit the search.',
  },
  {
    title: 'Self-loops',
    detail:
      'A self-loop makes the graph uncolorable for any finite k because a vertex would conflict with itself.',
  },
]

const realWorldUses = [
  {
    context: 'Register allocation',
    detail:
      'Compilers color an interference graph so variables that overlap in time use different CPU registers.',
  },
  {
    context: 'Timetable planning',
    detail:
      'Exams or classes that share students are adjacent vertices; colors represent time slots.',
  },
  {
    context: 'Frequency assignment',
    detail:
      'Nearby radio towers must use different frequencies; colors represent frequency bands.',
  },
  {
    context: 'Map coloring',
    detail:
      'Regions sharing a border cannot use the same color, the original inspiration for the problem.',
  },
  {
    context: 'Task scheduling',
    detail:
      'Tasks with conflicts must be assigned to different time slots or machines.',
  },
]

const examples = [
  {
    title: 'Backtracking pseudocode',
    code: `function colorGraph(v):
    if v == n: return true
    for color in 1..k:
        if isValid(v, color):
            colors[v] = color
            if colorGraph(v + 1): return true
            colors[v] = 0
    return false`,
    explanation:
      'The recursion assigns a color to each vertex. If a dead end appears, it resets and tries the next color.',
  },
  {
    title: 'Triangle with k = 2',
    code: `Vertices: A-B-C-A
k = 2
Try A=1, B=2, C=?
C conflicts with both 1 and 2, so no solution.`,
    explanation:
      'A 3-cycle requires 3 colors. The algorithm backtracks and eventually reports false.',
  },
  {
    title: 'Square with diagonal, k = 3',
    code: `Vertices: A-B-C-D-A with diagonal A-C
One valid coloring:
A=1, B=2, C=3, D=2`,
    explanation:
      'The diagonal adds a constraint, but 3 colors still suffice. Backtracking finds a valid assignment.',
  },
]

const pitfalls = [
  'Assuming greedy coloring is always optimal. Greedy is fast but can use more colors than necessary.',
  'Not using a good vertex ordering, which can explode the search tree.',
  'Confusing graph coloring with edge coloring, which assigns colors to edges instead of vertices.',
  'Skipping conflict checks, which can accept invalid colorings.',
  'Forgetting that self-loops make coloring impossible.',
]

const variants = [
  {
    title: 'Chromatic number search',
    detail:
      'Run the decision algorithm for k = lowerBound..upperBound until it succeeds.',
  },
  {
    title: 'List coloring',
    detail:
      'Each vertex has its own allowed color list, turning the problem into list-coloring CSP.',
  },
  {
    title: 'Edge coloring',
    detail:
      'Edges are colored so adjacent edges differ; this has different bounds and algorithms.',
  },
  {
    title: 'Heuristic solvers',
    detail:
      'DSATUR, tabu search, and SAT-based solvers provide fast approximate or exact colorings.',
  },
]

const takeaways = [
  'Graph coloring assigns labels to vertices so adjacent vertices never share a label.',
  'Backtracking is complete and correct but exponential in the worst case.',
  'Good ordering and pruning are the difference between instant solutions and blowups.',
  'Coloring models many real resource conflicts, from registers to timetables.',
]

export default function GraphColoringPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Graph Coloring</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Backtracking for assigning colors without conflicts</div>
              <p className="win95-text">
                Graph coloring asks whether you can color the vertices of a graph with k colors so adjacent vertices never share a color.
                The classic solution uses backtracking: try colors, check constraints, and undo choices when you hit a conflict. It is a
                core example of constraint satisfaction and a gateway to heuristic search.
              </p>
            </div>
            <Link to="/algoViz" className="win95-button" role="button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-fieldset">
            <legend>The big picture</legend>
            <div className="win95-panel">
              <p className="win95-text">
                Coloring captures resource conflicts: neighboring vertices cannot share a color. Backtracking explores the space of
                assignments while pruning invalid partial solutions as soon as possible.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Historical context</legend>
            <div className="win95-grid win95-grid-2">
              {historicalMilestones.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Core concept and mental models</legend>
            <div className="win95-grid win95-grid-2">
              {mentalModels.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>What the algorithm does</legend>
            <div className="win95-grid win95-grid-2">
              {coreIdeas.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Step-by-step process</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                {algorithmSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Data structures used</legend>
            <div className="win95-grid win95-grid-2">
              {dataStructures.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Why the backtracking works</legend>
            <div className="win95-grid win95-grid-2">
              {correctnessNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                Backtracking is exhaustive but prunes any partial assignment that cannot be extended to a full coloring, ensuring
                correctness while avoiding unnecessary work.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity analysis</legend>
            <div className="win95-grid win95-grid-2">
              {complexityNotes.map((note) => (
                <div key={note.title} className="win95-panel">
                  <div className="win95-heading">{note.title}</div>
                  <p className="win95-text">{note.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Edge cases and conventions</legend>
            <div className="win95-grid win95-grid-2">
              {edgeCases.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Real-world applications</legend>
            <div className="win95-grid win95-grid-2">
              {realWorldUses.map((item) => (
                <div key={item.context} className="win95-panel">
                  <div className="win95-heading">{item.context}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Practical examples</legend>
            <div className="win95-stack">
              {examples.map((example) => (
                <div key={example.title} className="win95-panel">
                  <div className="win95-heading">{example.title}</div>
                  <pre className="win95-code">
                    <code>{example.code}</code>
                  </pre>
                  <p className="win95-text">{example.explanation}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Common pitfalls</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {pitfalls.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Variants and extensions</legend>
            <div className="win95-grid win95-grid-2">
              {variants.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Key takeaways</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {takeaways.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}

