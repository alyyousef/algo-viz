import { Link } from 'react-router-dom'

import type { JSX } from 'react'

const win95Styles = `
.win95-page {
  min-height: 100vh;
  background: #C0C0C0;
  padding: 0;
  color: #000;
  font-family: 'MS Sans Serif', 'Tahoma', sans-serif;
  -webkit-font-smoothing: none;
}

.win95-page * {
  box-sizing: border-box;
}

.win95-page a {
  color: #000;
  text-decoration: none;
}

.win95-page a:hover {
  text-decoration: underline;
}

.win95-window {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  background: #C0C0C0;
  box-shadow: none;
  border-radius: 0;
}

.win95-titlebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #000080;
  color: #fff;
  padding: 4px 6px;
  font-weight: 700;
  font-size: 13px;
  line-height: 1;
}

.win95-title {
  display: inline-block;
}

.win95-title-controls {
  display: flex;
  gap: 4px;
}

.win95-control {
  width: 22px;
  height: 20px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  border-radius: 0;
  font-weight: 700;
  font-size: 12px;
  line-height: 1;
  padding: 0;
  cursor: pointer;
}

.win95-control:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-control:focus,
.win95-button:focus {
  outline: 1px dotted #000;
  outline-offset: -3px;
}

.win95-content {
  padding: 10px;
}

.win95-header-row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: flex-start;
  margin-bottom: 8px;
}

.win95-button {
  padding: 3px 10px 2px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  border-radius: 0;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  line-height: 1.2;
}

.win95-button:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-fieldset {
  border: 2px solid;
  border-color: #808080 #404040 #404040 #808080;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 0;
  background: #C0C0C0;
}

.win95-fieldset legend {
  padding: 0 6px;
  font-weight: 700;
  font-size: 12px;
}

.win95-grid {
  display: grid;
  gap: 6px;
}

.win95-grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.win95-grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
}

.win95-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 8px;
}

.win95-panel {
  border: 2px solid;
  border-color: #808080 #fff #fff #808080;
  background: #C0C0C0;
  padding: 8px;
  border-radius: 0;
}

.win95-panel--raised {
  border-color: #fff #404040 #404040 #fff;
}

.win95-heading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 4px;
}

.win95-subheading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 6px;
}

.win95-text {
  font-size: 12px;
  line-height: 1.35;
  margin: 0 0 6px;
}

.win95-stack {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.win95-list {
  margin: 0;
  padding-left: 18px;
  font-size: 12px;
  line-height: 1.35;
}

.win95-list li {
  margin-bottom: 4px;
}

.win95-list--numbered {
  list-style: decimal;
}

.win95-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.win95-table th,
.win95-table td {
  border: 1px solid #808080;
  padding: 6px 6px 4px;
  text-align: left;
}

.win95-table th {
  font-weight: 700;
}

.win95-code {
  margin: 6px 0;
  background: #C0C0C0;
  color: #000;
  padding: 8px;
  font-family: 'Courier New', monospace;
  font-size: 11px;
  border: 2px solid;
  border-color: #404040 #fff #fff #404040;
  overflow-x: auto;
  border-radius: 0;
}
`

const historicalContext = [
  {
    title: 'Interval scheduling makes greedy proofs famous (1970s)',
    detail:
      'Earliest finishing time feels obvious, but the exchange argument formalizes why swapping a later finish for an earlier one never harms optimality.',
  },
  {
    title: 'Matroid theory formalizes exchange (1971)',
    detail:
      'Matroids encode exactly when a greedy algorithm is optimal. Their exchange axiom is a global version of the local swap idea.',
  },
  {
    title: 'Huffman coding and optimal prefix trees (1952)',
    detail:
      'Huffman coding uses a greedy merge; proofs rely on exchanging deep leaves to show there is an optimal tree that agrees with the greedy choice.',
  },
  {
    title: 'Scheduling theory popularizes swap arguments (1980s)',
    detail:
      'Single-machine scheduling results are full of adjacent-swap proofs that show out-of-order jobs can be exchanged without increasing cost.',
  },
]

const mentalModels = [
  {
    title: 'Repair an optimal solution',
    detail:
      'Assume an optimal solution exists. If it differs from your greedy choice, swap in the greedy choice and show the cost does not get worse.',
  },
  {
    title: 'Local swap, global consequence',
    detail:
      'One small exchange aligns the optimal solution with the greedy one. Repeat the argument to align all choices.',
  },
  {
    title: 'Stay-ahead by swapping',
    detail:
      'After each greedy choice, show the greedy partial solution can be transformed into an optimal one with the same prefix.',
  },
]

const coreDefinitions = [
  {
    heading: 'Greedy choice',
    bullets: [
      'A locally optimal decision taken at each step (earliest finish, smallest weight, largest value density).',
      'Must be justified by a structural property of optimal solutions.',
    ],
  },
  {
    heading: 'Exchange',
    bullets: [
      'Operation that replaces part of an optimal solution with the greedy choice.',
      'Keeps feasibility and does not increase cost (or does not reduce value).',
    ],
  },
  {
    heading: 'Invariant',
    bullets: [
      'After k steps, there exists an optimal solution consistent with the greedy prefix.',
      'The exchange step preserves this invariant for the next choice.',
    ],
  },
]

const exchangeTemplate = [
  'State the greedy algorithm and define the greedy choice at step k.',
  'Assume an optimal solution O. If O already uses the greedy choice, continue; otherwise identify a conflicting element.',
  'Exchange the conflicting element with the greedy choice to build O\'.',
  'Prove O\' is feasible (constraints still satisfied).',
  'Show cost(O\') <= cost(O) for minimization, or value(O\') >= value(O) for maximization.',
  'Conclude there exists an optimal solution agreeing with the greedy choice; proceed inductively.',
]

const exchangePatterns = [
  {
    title: 'Swap adjacent elements',
    detail:
      'Used in scheduling. If two neighboring jobs are out of greedy order, swapping them does not worsen the objective. Repeat until sorted.',
  },
  {
    title: 'Replace one item',
    detail:
      'Used in interval scheduling and knapsack variants. Replace a conflicting interval with one that finishes earlier or weighs less.',
  },
  {
    title: 'Cycle exchange',
    detail:
      'Used in MST proofs. If a non-greedy edge is heavier on a cycle, swap it for a lighter greedy edge without disconnecting the tree.',
  },
  {
    title: 'Tree leaf swap',
    detail:
      'Used in Huffman coding. Exchange deep leaves so the two smallest weights sit deepest, keeping prefix property intact.',
  },
  {
    title: 'Cut-based exchange',
    detail:
      'Used in shortest paths and MST. If the greedy choice crosses a cut with minimum weight, any optimal structure can exchange to include it.',
  },
  {
    title: 'Prefix exchange',
    detail:
      'Show the greedy prefix can be made identical to an optimal prefix, often by repeatedly swapping earlier decisions.',
  },
]

const proofChecklist = [
  'Define the objective clearly (minimize or maximize) and list feasibility constraints.',
  'Identify the single conflicting element when greedy and optimal differ.',
  'Describe the exchange operation explicitly and keep it local.',
  'Prove feasibility after the swap (no overlaps, no cycles, no broken constraints).',
  'Compare costs using algebra or ordering properties.',
  'Conclude the existence of an optimal solution that contains the greedy choice.',
]

const workedExamples = [
  {
    title: 'Interval scheduling (earliest finish time)',
    code: `// Select max number of non-overlapping intervals
sort intervals by finish time
pick the first interval
for each interval in order:
    if interval.start >= last_finish:
        pick interval
        last_finish = interval.finish`,
    explanation:
      'Exchange argument: take any optimal schedule O. Let g be the greedy interval with earliest finish. If O starts with g, done. Otherwise O starts with some interval i that finishes later than g. Swap i with g. The swap preserves feasibility because g finishes earlier, leaving at least as much time for the remaining intervals. Therefore there is an optimal schedule starting with g, so the greedy choice is safe.',
  },
  {
    title: 'Minimum spanning tree (Kruskal cycle exchange)',
    code: `// Add lightest edges without creating a cycle
sort edges by weight
for each edge e in order:
    if e does not form a cycle:
        add e to the tree`,
    explanation:
      'Exchange argument: suppose an optimal MST T does not include greedy edge e (the lightest edge that connects two components). Adding e to T creates a cycle. That cycle contains some edge f heavier than or equal to e. Remove f to restore a tree. The new tree is no heavier and includes e, so an optimal tree can be adjusted to match the greedy choice.',
  },
  {
    title: 'Minimize maximum lateness (EDD rule)',
    code: `// Single machine, each job has duration p and due date d
sort jobs by increasing due date
process in that order`,
    explanation:
      'Exchange argument: consider two adjacent jobs i, j with d_i > d_j (out of EDD order). Swapping them can only decrease the maximum lateness, because j has an earlier due date and finishes no later after the swap. Repeatedly swapping inversions yields EDD order without increasing the objective, so the greedy order is optimal.',
  },
]

const pitfalls = [
  'Swapping breaks feasibility. If the exchange creates overlap, cycles, or violates constraints, the proof fails.',
  'Comparing the wrong cost. Exchange arguments must compare objective values, not unrelated metrics like total weight when minimizing maximum lateness.',
  'Using a non-local swap. Exchanges should be small and justified; large rearrangements often hide gaps.',
  'Assuming uniqueness. Greedy proofs show existence of an optimal solution that matches greedy choices, not that it is the only optimal solution.',
  'Missing the induction step. You must show the invariant continues after the swap, not just for the first step.',
]

const decisionGuidance = [
  'Use exchange arguments when a greedy choice conflicts with some optimal solution but can replace it without harm.',
  'Look for problems with ordering or selection where a local swap makes future choices easier.',
  'If constraints are global but decomposable into local conflicts, exchange arguments are a strong fit.',
  'If a swap cannot be shown to preserve feasibility, consider matroid or cut-property approaches instead.',
]

const takeaways = [
  'Exchange arguments prove greedy optimality by repairing an optimal solution to match the greedy choice.',
  'The key is a local swap that preserves feasibility and does not worsen the objective.',
  'Once the first greedy choice is justified, induction carries the rest of the algorithm.',
  'Clear statements of constraints and objectives make exchange proofs concise and rigorous.',
]

export default function GreedyProofTechniquesExchangeArgumentPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Greedy Proof Techniques (Exchange Argument)</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">
              X
            </Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">How to prove a greedy choice is safe by swapping it into an optimal solution</div>
              <p className="win95-text">
                Exchange arguments are the workhorse proof technique for greedy algorithms. The idea is simple but powerful: if an
                optimal solution does not make the greedy choice, show how to swap the greedy choice in without making the solution
                worse. That swap proves there exists an optimal solution that agrees with the greedy step, and induction finishes the
                proof.
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
                Greedy algorithms build a solution one decision at a time. The exchange argument justifies each decision by showing
                it can replace a conflicting choice in some optimal solution without harming feasibility or objective value. The proof
                is constructive: it repairs an optimal solution to match the greedy one step by step.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Historical context</legend>
            <div className="win95-grid win95-grid-2">
              {historicalContext.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Core idea and mental models</legend>
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
            <legend>Key definitions</legend>
            <div className="win95-grid win95-grid-3">
              {coreDefinitions.map((block) => (
                <div key={block.heading} className="win95-panel">
                  <div className="win95-heading">{block.heading}</div>
                  <ul className="win95-list">
                    {block.bullets.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Exchange argument template</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                {exchangeTemplate.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                The strength of this template is its locality. Each step only changes a small part of the solution, which keeps the
                feasibility and objective comparisons simple.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Common exchange patterns</legend>
            <div className="win95-grid win95-grid-3">
              {exchangePatterns.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Worked examples</legend>
            <div className="win95-stack">
              {workedExamples.map((example) => (
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
            <legend>Proof checklist</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {proofChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
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
            <legend>When to use it</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                {decisionGuidance.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
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
