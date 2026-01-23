import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


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

const foundations = [
  {
    title: 'Proof by repair',
    detail:
      'Assume an optimal solution exists. If it differs from your greedy choice, repair it with a local exchange to create another optimal solution that agrees with the greedy choice.',
  },
  {
    title: 'Local swaps, global optimality',
    detail:
      'The exchange must be local and safe: it preserves feasibility and does not worsen the objective. Repeating the swap aligns the entire solution.',
  },
  {
    title: 'Existence, not uniqueness',
    detail:
      'Exchange arguments show that there exists an optimal solution consistent with greedy choices, not that the greedy solution is the only optimum.',
  },
  {
    title: 'Invariant + induction',
    detail:
      'After k steps, there is an optimal solution that matches the greedy prefix. The exchange maintains this invariant, so induction completes the proof.',
  },
]

const taxonomy = [
  {
    title: 'Ordering exchanges',
    detail: 'Swap adjacent elements to enforce greedy ordering (scheduling, sorting by due date).',
  },
  {
    title: 'Set exchanges',
    detail: 'Replace one chosen item with the greedy item while maintaining feasibility (intervals, knapsack variants).',
  },
  {
    title: 'Cycle exchanges',
    detail: 'Swap edges along a cycle to include a greedy edge without breaking connectivity (MST).',
  },
  {
    title: 'Cut exchanges',
    detail: 'Use a cut property: any minimum edge across a cut can be forced into an optimal solution.',
  },
  {
    title: 'Tree/leaf swaps',
    detail: 'Swap leaves or subtrees to place greedy elements deeper or earlier (Huffman).',
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

const modelingChecklist = [
  'State the objective and feasibility constraints explicitly.',
  'Identify the greedy choice at a single step.',
  'Define the structure of an optimal solution O you want to compare against.',
  'Specify the conflicting element in O and the exchange operation.',
  'Prove the swap preserves feasibility.',
  'Compare objective values before and after the swap.',
  'State the invariant and apply induction over steps.',
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

const exchangeBlueprint = [
  {
    title: 'Step 1: Choose the greedy decision',
    detail: 'Define the rule (earliest finish, smallest weight, highest density).',
  },
  {
    title: 'Step 2: Pick any optimal solution',
    detail: 'Let O be an optimal solution; if it already agrees with greedy, proceed to the next step.',
  },
  {
    title: 'Step 3: Identify conflict',
    detail: 'Find the element in O that conflicts with the greedy choice.',
  },
  {
    title: 'Step 4: Exchange safely',
    detail: 'Replace the conflicting element with the greedy choice while keeping feasibility.',
  },
  {
    title: 'Step 5: Compare objective',
    detail: 'Show the new solution O\' is no worse than O.',
  },
  {
    title: 'Step 6: Conclude the invariant',
    detail: 'Therefore there exists an optimal solution consistent with the greedy prefix.',
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

const proofToolkit = [
  {
    title: 'Stay-ahead property',
    detail:
      'Show that after each step the greedy partial solution is at least as good as any other partial solution of the same size.',
  },
  {
    title: 'Cut property',
    detail:
      'For MSTs, the lightest edge across any cut is safe and can be exchanged into an optimal tree.',
  },
  {
    title: 'Matroid exchange axiom',
    detail:
      'If feasible sets form a matroid, the greedy algorithm is optimal; the exchange axiom provides the swap logic.',
  },
  {
    title: 'Dominance arguments',
    detail:
      'If one partial solution dominates another, you can discard the dominated one without losing optimality.',
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

const workedExampleSteps = [
  {
    title: 'Activity selection (interval scheduling)',
    steps: [
      'Greedy choice: pick the activity that finishes earliest.',
      'Let O be an optimal schedule; if it starts with the greedy activity, continue.',
      'Otherwise, O starts with activity i that finishes later.',
      'Swap i with the greedy activity; feasibility is preserved because the greedy one ends earlier.',
      'The swap does not reduce the number of activities, so there is an optimal schedule that starts with the greedy choice.',
    ],
    note:
      'Inductively apply the same argument to the remaining intervals after the greedy finish time.',
  },
  {
    title: 'Kruskal MST (cycle exchange)',
    steps: [
      'Greedy choice: take the lightest edge that does not form a cycle.',
      'Let T be an optimal MST that excludes that edge e.',
      'Adding e creates a cycle; remove the heaviest edge f in that cycle.',
      'The resulting tree is no heavier and now includes e.',
      'Therefore there is an optimal MST consistent with the greedy choice.',
    ],
    note:
      'The cycle exchange is local and preserves feasibility (tree property).',
  },
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

const comparisons = [
  {
    title: 'Exchange argument vs contradiction',
    detail:
      'Contradiction shows the greedy choice must be part of an optimal solution; exchange provides a constructive way to transform one.',
  },
  {
    title: 'Exchange argument vs matroid proof',
    detail:
      'Matroid proofs are general and abstract; exchange arguments are concrete and problem-specific.',
  },
  {
    title: 'Exchange argument vs cut property',
    detail:
      'Cut property is a specialized exchange argument for graphs. Use it when a cut-based minimum edge can be proven safe.',
  },
]

const failureStory =
  'A scheduling solution claimed earliest start time was greedy-optimal. The exchange failed because swapping jobs changed feasibility due to deadlines. Only earliest finish time preserves feasibility, which the exchange argument reveals.'

const pitfalls = [
  'Swapping breaks feasibility. If the exchange creates overlap, cycles, or violates constraints, the proof fails.',
  'Comparing the wrong cost. Exchange arguments must compare objective values, not unrelated metrics like total weight when minimizing maximum lateness.',
  'Using a non-local swap. Exchanges should be small and justified; large rearrangements often hide gaps.',
  'Assuming uniqueness. Greedy proofs show existence of an optimal solution that matches greedy choices, not that it is the only optimal solution.',
  'Missing the induction step. You must show the invariant continues after the swap, not just for the first step.',
]

const debuggingChecklist = [
  'Write down the exact constraint that must remain true after the swap.',
  'Check the swap on a small counterexample candidate.',
  'Make sure the swap is local; avoid restructuring the whole solution.',
  'Confirm you are comparing the correct objective (min vs max).',
  'State the induction invariant explicitly.',
]

const decisionGuidance = [
  'Use exchange arguments when a greedy choice conflicts with some optimal solution but can replace it without harm.',
  'Look for problems with ordering or selection where a local swap makes future choices easier.',
  'If constraints are global but decomposable into local conflicts, exchange arguments are a strong fit.',
  'If a swap cannot be shown to preserve feasibility, consider matroid or cut-property approaches instead.',
]

const whenToAvoid = [
  'Constraints are global and a local swap can break feasibility.',
  'The greedy choice is not uniquely defined or depends on future information.',
  'You cannot define an exchange that preserves the objective.',
  'The problem lacks optimal substructure for greedy choices.',
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
            <legend>Foundations</legend>
            <div className="win95-grid win95-grid-2">
              {foundations.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

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
            <legend>Exchange taxonomy</legend>
            <div className="win95-grid win95-grid-2">
              {taxonomy.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
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
            <legend>Modeling checklist</legend>
            <div className="win95-panel win95-panel--raised">
              <ul className="win95-list">
                {modelingChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
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
            <legend>Exchange blueprint</legend>
            <div className="win95-grid win95-grid-3">
              {exchangeBlueprint.map((step) => (
                <div key={step.title} className="win95-panel">
                  <div className="win95-heading">{step.title}</div>
                  <p className="win95-text">{step.detail}</p>
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
            <legend>Proof toolkit</legend>
            <div className="win95-grid win95-grid-2">
              {proofToolkit.map((item) => (
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
            <legend>Worked examples (step-by-step)</legend>
            <div className="win95-stack">
              {workedExampleSteps.map((example) => (
                <div key={example.title} className="win95-panel">
                  <div className="win95-heading">{example.title}</div>
                  <ol className="win95-list win95-list--numbered">
                    {example.steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                  <p className="win95-text">{example.note}</p>
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
            <legend>Greedy proof techniques in context</legend>
            <div className="win95-grid win95-grid-2">
              {comparisons.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Failure mode</legend>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">{failureStory}</p>
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
            <legend>Debugging checklist</legend>
            <div className="win95-panel win95-panel--raised">
              <ul className="win95-list">
                {debuggingChecklist.map((item) => (
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
            <legend>When to avoid it</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {whenToAvoid.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
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


