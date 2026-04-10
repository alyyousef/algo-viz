import { useMemo } from 'react'

import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

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
    detail:
      'Replace one chosen item with the greedy item while maintaining feasibility (intervals, knapsack variants).',
  },
  {
    title: 'Cycle exchanges',
    detail:
      'Swap edges along a cycle to include a greedy edge without breaking connectivity (MST).',
  },
  {
    title: 'Cut exchanges',
    detail:
      'Use a cut property: any minimum edge across a cut can be forced into an optimal solution.',
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
    detail:
      'Let O be an optimal solution; if it already agrees with greedy, proceed to the next step.',
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
    detail: "Show the new solution O' is no worse than O.",
  },
  {
    title: 'Step 6: Conclude the invariant',
    detail: 'Therefore there exists an optimal solution consistent with the greedy prefix.',
  },
]

const exchangeTemplate = [
  'State the greedy algorithm and define the greedy choice at step k.',
  'Assume an optimal solution O. If O already uses the greedy choice, continue; otherwise identify a conflicting element.',
  "Exchange the conflicting element with the greedy choice to build O'.",
  "Prove O' is feasible (constraints still satisfied).",
  "Show cost(O') <= cost(O) for minimization, or value(O') >= value(O) for maximization.",
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
    note: 'Inductively apply the same argument to the remaining intervals after the greedy finish time.',
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
    note: 'The cycle exchange is local and preserves feasibility (tree property).',
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

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]
const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-intro', label: 'Overview' },
    { id: 'bp-foundations', label: 'Foundations' },
    { id: 'bp-context', label: 'Historical Context' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-taxonomy', label: 'Exchange Taxonomy' },
    { id: 'core-mental', label: 'Mental Models' },
    { id: 'core-modeling', label: 'Modeling Checklist' },
    { id: 'core-definitions', label: 'Key Definitions' },
    { id: 'core-blueprint', label: 'Exchange Blueprint' },
    { id: 'core-template', label: 'Proof Template' },
    { id: 'core-patterns', label: 'Exchange Patterns' },
    { id: 'core-toolkit', label: 'Proof Toolkit' },
    { id: 'core-checklist', label: 'Proof Checklist' },
    { id: 'core-comparisons', label: 'In Context' },
    { id: 'core-failure', label: 'Failure Mode' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-debug', label: 'Debugging Checklist' },
    { id: 'core-use', label: 'When to Use It' },
    { id: 'core-avoid', label: 'When to Avoid It' },
  ],
  examples: [
    { id: 'ex-code', label: 'Worked Examples' },
    { id: 'ex-steps', label: 'Step-by-Step' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function GreedyProofTechniquesExchangeArgumentPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Greedy Proof Techniques (Exchange Argument)',
    defaultTab: 'big-picture',
  })

  const glossary = useMemo(
    () => [
      {
        term: 'Greedy choice',
        definition:
          'A locally optimal decision taken at each step that must be justified by a structural property of optimal solutions.',
      },
      {
        term: 'Exchange',
        definition:
          'An operation that replaces part of an optimal solution with the greedy choice while keeping feasibility and objective value.',
      },
      {
        term: 'Invariant',
        definition:
          'After k steps, there exists an optimal solution consistent with the greedy prefix; the exchange maintains this property.',
      },
      {
        term: 'Ordering exchange',
        definition:
          'Swap adjacent elements to enforce greedy order without worsening the objective.',
      },
      {
        term: 'Cycle exchange',
        definition:
          'Swap edges along a cycle to include a greedy edge without breaking connectivity (MST).',
      },
      {
        term: 'Cut property',
        definition:
          'Any minimum edge across a cut can be exchanged into an optimal solution (graph greedy proofs).',
      },
      {
        term: 'Stay-ahead property',
        definition:
          'After each step the greedy partial solution is at least as good as any other partial solution of the same size.',
      },
      {
        term: 'Matroid exchange axiom',
        definition:
          'A structural rule that guarantees greedy optimality for matroid feasibility sets.',
      },
    ],
    [],
  )
  return (
    <TopicPageShell
      title="Greedy Proof Techniques (Exchange Argument)"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Greedy Proof Techniques (Exchange Argument)</h1>
      <p>
        Exchange arguments are the workhorse proof technique for greedy algorithms. The idea is
        simple but powerful: if an optimal solution does not make the greedy choice, show how to
        swap the greedy choice in without making the solution worse. That swap proves there exists
        an optimal solution that agrees with the greedy step, and induction finishes the proof.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-intro" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            <p>
              Greedy algorithms build a solution one decision at a time. The exchange argument
              justifies each decision by showing it can replace a conflicting choice in some optimal
              solution without harming feasibility or objective value. The proof is constructive: it
              repairs an optimal solution to match the greedy one step by step.
            </p>
          </section>
          <section id="bp-foundations" className="bin98-section">
            <h2 className="bin98-heading">Foundations</h2>
            {foundations.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="bp-context" className="bin98-section">
            <h2 className="bin98-heading">Historical Context</h2>
            {historicalContext.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="bp-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key Takeaways</h2>
            <ul>
              {takeaways.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {activeTab === 'core-concepts' && (
        <>
          <section id="core-taxonomy" className="bin98-section">
            <h2 className="bin98-heading">Exchange Taxonomy</h2>
            {taxonomy.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-mental" className="bin98-section">
            <h2 className="bin98-heading">Core Mental Models</h2>
            {mentalModels.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-modeling" className="bin98-section">
            <h2 className="bin98-heading">Modeling Checklist</h2>
            <ul>
              {modelingChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section id="core-definitions" className="bin98-section">
            <h2 className="bin98-heading">Key Definitions</h2>
            {coreDefinitions.map((block) => (
              <div key={block.heading}>
                <h3 className="bin98-subheading">{block.heading}</h3>
                <ul>
                  {block.bullets.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
          <section id="core-blueprint" className="bin98-section">
            <h2 className="bin98-heading">Exchange Blueprint</h2>
            {exchangeBlueprint.map((step) => (
              <p key={step.title}>
                <strong>{step.title}:</strong> {step.detail}
              </p>
            ))}
          </section>
          <section id="core-template" className="bin98-section">
            <h2 className="bin98-heading">Exchange Argument Template</h2>
            <ol>
              {exchangeTemplate.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p>
              The strength of this template is its locality. Each step only changes a small part of
              the solution, which keeps feasibility and objective comparisons simple.
            </p>
          </section>
          <section id="core-patterns" className="bin98-section">
            <h2 className="bin98-heading">Common Exchange Patterns</h2>
            {exchangePatterns.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-toolkit" className="bin98-section">
            <h2 className="bin98-heading">Proof Toolkit</h2>
            {proofToolkit.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-checklist" className="bin98-section">
            <h2 className="bin98-heading">Proof Checklist</h2>
            <ul>
              {proofChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section id="core-comparisons" className="bin98-section">
            <h2 className="bin98-heading">Greedy Proof Techniques in Context</h2>
            {comparisons.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-failure" className="bin98-section">
            <h2 className="bin98-heading">Failure Mode</h2>
            <p>{failureStory}</p>
          </section>
          <section id="core-pitfalls" className="bin98-section">
            <h2 className="bin98-heading">Common Pitfalls</h2>
            <ul>
              {pitfalls.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section id="core-debug" className="bin98-section">
            <h2 className="bin98-heading">Debugging Checklist</h2>
            <ul>
              {debuggingChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section id="core-use" className="bin98-section">
            <h2 className="bin98-heading">When to Use It</h2>
            <ol>
              {decisionGuidance.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>
          <section id="core-avoid" className="bin98-section">
            <h2 className="bin98-heading">When to Avoid It</h2>
            <ul>
              {whenToAvoid.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {activeTab === 'examples' && (
        <>
          <section id="ex-code" className="bin98-section">
            <h2 className="bin98-heading">Worked Examples</h2>
            {workedExamples.map((example) => (
              <div key={example.title}>
                <h3 className="bin98-subheading">{example.title}</h3>
                <div className="bin98-codebox">
                  <code>{example.code.trim()}</code>
                </div>
                <p>{example.explanation}</p>
              </div>
            ))}
          </section>
          <section id="ex-steps" className="bin98-section">
            <h2 className="bin98-heading">Worked Examples (Step-by-Step)</h2>
            {workedExampleSteps.map((example) => (
              <div key={example.title}>
                <h3 className="bin98-subheading">{example.title}</h3>
                <ol>
                  {example.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
                <p>{example.note}</p>
              </div>
            ))}
          </section>
        </>
      )}

      {activeTab === 'glossary' && (
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {glossary.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
