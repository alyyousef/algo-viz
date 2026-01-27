import { useState } from 'react'
import { Link } from 'react-router-dom'

import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'What it is',
    details:
      'Stable Marriage asks for a perfect matching between two equally sized sets so that no pair would both prefer each other over their assigned partners.',
    notes:
      'The canonical solution is the Gale-Shapley (deferred acceptance) algorithm.',
  },
  {
    title: 'Why it matters',
    details:
      'It models real-world matching markets like residency assignment, school choice, and job matching.',
    notes:
      'Stability prevents incentive-compatible pairs from breaking the matching.',
  },
  {
    title: 'What it teaches',
    details:
      'Greedy algorithms, invariants, and the subtle difference between stability and optimality.',
    notes:
      'It illustrates how algorithm design influences fairness and outcomes.',
  },
]

const problemSetup = [
  {
    title: 'Input',
    detail:
      'Two sets of size n (traditionally men and women). Each participant ranks all members of the other set.',
  },
  {
    title: 'Output',
    detail:
      'A perfect matching (pairs) between the two sets.',
  },
  {
    title: 'Stability condition',
    detail:
      'No blocking pair (m, w) exists such that m prefers w over m’s match and w prefers m over w’s match.',
  },
  {
    title: 'Goal',
    detail:
      'Find a stable matching for every valid input.',
  },
]

const glossary = [
  { term: 'Matching', definition: 'A set of pairings where each participant appears in exactly one pair.' },
  { term: 'Stable matching', definition: 'A matching with no blocking pair.' },
  { term: 'Blocking pair', definition: 'A pair of participants who prefer each other over their assigned matches.' },
  { term: 'Proposal', definition: 'An offer from one participant to another in the Gale-Shapley algorithm.' },
  { term: 'Deferred acceptance', definition: 'A process where proposals are tentatively accepted and can later be replaced.' },
  { term: 'Proposer-optimal', definition: 'The best stable matching for the proposing side.' },
  { term: 'Receiver-optimal', definition: 'The best stable matching for the receiving side.' },
  { term: 'Perfect matching', definition: 'All participants are matched with exactly one partner.' },
]

const algorithmOverview = [
  {
    title: 'Initialize all participants as free',
    detail:
      'No pairs exist at the start.',
  },
  {
    title: 'Free proposer makes a proposal',
    detail:
      'Choose a free proposer and have them propose to their top remaining choice.',
  },
  {
    title: 'Receiver decides',
    detail:
      'If the receiver is free, they accept. If already matched, they keep the better proposer and reject the other.',
  },
  {
    title: 'Repeat',
    detail:
      'Continue until every proposer is matched.',
  },
  {
    title: 'Output the final matching',
    detail:
      'The result is stable and proposer-optimal.',
  },
]

const formalDefinitions = [
  {
    title: 'Preferences',
    detail:
      'Each participant has a strict total order over all members of the other set.',
  },
  {
    title: 'Matching',
    detail:
      'A bijection between the two sets: every participant is paired with exactly one partner.',
  },
  {
    title: 'Blocking pair',
    detail:
      'A pair (a, b) that is not matched together but both prefer each other over their assigned partners.',
  },
  {
    title: 'Stability',
    detail:
      'A matching with no blocking pair is stable.',
  },
  {
    title: 'Optimality',
    detail:
      'A matching is proposer-optimal if no proposer can improve without breaking stability.',
  },
]

const correctnessInsights = [
  {
    title: 'Termination',
    detail:
      'Each proposer makes at most n proposals, so the algorithm always halts.',
  },
  {
    title: 'Stability',
    detail:
      'If a blocking pair existed, the proposer would have proposed to that receiver and been accepted over a worse match.',
  },
  {
    title: 'Proposer-optimality',
    detail:
      'Every proposer gets the best possible partner among all stable matchings.',
  },
  {
    title: 'Receiver-pessimality',
    detail:
      'Receivers get their worst stable partners when the other side proposes.',
  },
]

const invariants = [
  {
    title: 'Invariant 1: Tentative matches',
    detail:
      'Every receiver holds at most one proposal at any time.',
  },
  {
    title: 'Invariant 2: Best-so-far',
    detail:
      'A receiver’s tentative match is always the best proposer seen so far.',
  },
  {
    title: 'Invariant 3: Monotone proposals',
    detail:
      'Proposers never propose to the same receiver twice and only move down their list.',
  },
  {
    title: 'Invariant 4: Safety of rejection',
    detail:
      'Once a receiver rejects a proposer, they will never be matched in a stable outcome.',
  },
]

const proofSketches = [
  {
    title: 'Why it terminates',
    detail:
      'Each proposer makes at most n proposals, so the total number of proposals is at most n^2.',
  },
  {
    title: 'Why it is stable',
    detail:
      'A blocking pair would imply a proposer was rejected by a receiver who preferred them more, which contradicts best-so-far.',
  },
  {
    title: 'Why it is proposer-optimal',
    detail:
      'Any proposer rejected by a receiver can never be matched to that receiver in any stable matching.',
  },
]

const complexity = [
  {
    title: 'Time',
    detail:
      'O(n^2) proposals; each proposal is processed in constant time with efficient data structures.',
  },
  {
    title: 'Space',
    detail:
      'O(n^2) to store preference lists, plus O(n) for matches and pointers.',
  },
]

const dataStructures = [
  {
    title: 'Preference arrays',
    detail:
      'Store each proposer’s ordered list and a pointer to the next receiver to propose to.',
  },
  {
    title: 'Rank lookup',
    detail:
      'For each receiver, store a rank map so comparisons are O(1).',
  },
  {
    title: 'Match arrays',
    detail:
      'Two arrays map proposer->receiver and receiver->proposer.',
  },
  {
    title: 'Free queue',
    detail:
      'A queue or stack holds currently free proposers ready to propose.',
  },
]

const latticeFacts = [
  {
    title: 'Lattice of stable matchings',
    detail:
      'All stable matchings form a lattice ordered by proposer preference.',
  },
  {
    title: 'Extreme matchings',
    detail:
      'Gale-Shapley yields the proposer-optimal and receiver-pessimal extremes.',
  },
  {
    title: 'Rotation concept',
    detail:
      'Transitions between stable matchings can be described by eliminating rotations.',
  },
  {
    title: 'Rural Hospitals theorem',
    detail:
      'In many-to-one variants, the set of matched residents is the same across all stable matchings.',
  },
]

const strategyInsights = [
  {
    title: 'Strategy-proof for proposers',
    detail:
      'Truthful reporting is a dominant strategy for the proposing side.',
  },
  {
    title: 'Not strategy-proof for receivers',
    detail:
      'Receivers can benefit by misreporting in some instances.',
  },
  {
    title: 'Incentive tradeoff',
    detail:
      'Choosing which side proposes affects incentives and perceived fairness.',
  },
  {
    title: 'Market design',
    detail:
      'Real systems choose the proposing side to optimize policy goals.',
  },
]

const variants = [
  {
    title: 'Women-propose version',
    detail:
      'Switching the proposing side flips optimality: women become optimal, men pessimal.',
  },
  {
    title: 'Ties in preferences',
    detail:
      'Stability must be redefined; algorithms can be more complex.',
  },
  {
    title: 'Incomplete lists',
    detail:
      'Participants can deem some partners unacceptable; the output may be partial matching.',
  },
  {
    title: 'Hospitals/residents',
    detail:
      'One-to-many matching where hospitals have capacity constraints.',
  },
  {
    title: 'Stable roommates',
    detail:
      'Matching within a single set; a stable solution may not exist.',
  },
  {
    title: 'Many-to-many matching',
    detail:
      'Each participant can match with multiple partners; stability becomes more complex.',
  },
]

const applications = [
  {
    title: 'Residency matching',
    detail:
      'Medical residency assignment uses deferred acceptance to ensure stability.',
  },
  {
    title: 'School choice',
    detail:
      'Students and schools are matched with policies that ensure stability and fairness.',
  },
  {
    title: 'Job matching',
    detail:
      'Internships and job pipelines can use stable matching to prevent reneging pairs.',
  },
  {
    title: 'Organ exchange',
    detail:
      'Matching donors and recipients often uses stability-inspired mechanisms.',
  },
  {
    title: 'Mentor-mentee matching',
    detail:
      'Programs pair mentors and mentees based on ranked preferences.',
  },
  {
    title: 'Project assignment',
    detail:
      'Teams and projects can be matched to reduce renegotiations.',
  },
]

const edgeCases = [
  {
    title: 'Non-unique matchings',
    detail:
      'Multiple stable matchings may exist; the output depends on the proposing side.',
  },
  {
    title: 'Ties',
    detail:
      'If preferences include ties, stability must be defined as weak or strong stability.',
  },
  {
    title: 'Incomplete lists',
    detail:
      'If some partners are unacceptable, the result may be a partial matching.',
  },
  {
    title: 'Unequal set sizes',
    detail:
      'Some participants remain unmatched; stability is defined relative to acceptable partners.',
  },
]

const commonPitfalls = [
  {
    mistake: 'Confusing optimality with fairness',
    description:
      'Proposer-optimal does not mean globally fair; the other side may receive worse outcomes.',
  },
  {
    mistake: 'Not defining stability precisely',
    description:
      'Stability depends on strict preference rankings; ties require special handling.',
  },
  {
    mistake: 'Assuming uniqueness',
    description:
      'Stable matchings need not be unique; there can be many.',
  },
  {
    mistake: 'Breaking ties arbitrarily without justification',
    description:
      'Tie-breaking can change outcomes and fairness properties.',
  },
  {
    mistake: 'Ignoring strategic behavior',
    description:
      'The algorithm is strategy-proof for proposers but not for receivers.',
  },
]

const pseudocode = [
  {
    title: 'Gale-Shapley (proposers A)',
    code: `freeA = set of all A
while freeA not empty:
  a = some free member of A
  b = highest-ranked on a's list not yet proposed
  if b is free:
    match a with b
  else if b prefers a to currentMatch(b):
    free currentMatch(b)
    match a with b
  else:
    // b rejects a
    a remains free`,
    explanation:
      'Each proposer advances down their preference list until matched.',
  },
  {
    title: 'Stability check (conceptual)',
    code: `for each unmatched pair (a, b):
  if a prefers b over match(a) and b prefers a over match(b):
    unstable`,
    explanation:
      'A matching is stable if no blocking pair exists.',
  },
  {
    title: 'Efficient receiver comparison',
    code: `// Precompute ranks for each receiver b
rank[b][a] = position of a in b's list

// Compare two proposers a1, a2
if rank[b][a1] < rank[b][a2]:
  b prefers a1`,
    explanation:
      'Rank lookup makes comparisons O(1) during proposals.',
  },
]

const workedExamples = [
  {
    title: 'Small instance',
    code: `A1: B1 > B2 > B3
A2: B2 > B1 > B3
A3: B2 > B3 > B1

B1: A2 > A1 > A3
B2: A1 > A2 > A3
B3: A1 > A3 > A2`,
    explanation:
      'Run Gale-Shapley with A proposing to get a stable matching that is best for A.',
  },
  {
    title: 'Optimality insight',
    code: `If A proposes:
  A gets best possible stable partners
If B proposes:
  B gets best possible stable partners`,
    explanation:
      'The proposing side always benefits in terms of stable outcomes.',
  },
  {
    title: 'Blocking pair illustration',
    code: `Matching: (A1,B2), (A2,B1)
Preferences:
A1: B1 > B2
B1: A1 > A2
Pair (A1,B1) blocks.`,
    explanation:
      'A1 and B1 prefer each other, so the matching is unstable.',
  },
]

const preferenceTable = [
  { a: 'A1', prefs: 'B1 > B2 > B3', b: 'B1', prefsB: 'A2 > A1 > A3' },
  { a: 'A2', prefs: 'B2 > B1 > B3', b: 'B2', prefsB: 'A1 > A2 > A3' },
  { a: 'A3', prefs: 'B2 > B3 > B1', b: 'B3', prefsB: 'A1 > A3 > A2' },
]

const timelineScenarios = [
  {
    id: 'a-proposes',
    title: 'A proposes',
    steps: [
      'Round 1: A1->B1, A2->B2, A3->B2.',
      'B1 accepts A1 (free). B2 prefers A2 over A3, keeps A2 and rejects A3.',
      'Round 2: A3 proposes to B3.',
      'B3 accepts A3. Matching complete: (A1,B1), (A2,B2), (A3,B3).',
    ],
    summary:
      'A side achieves its proposer-optimal stable matching.',
  },
  {
    id: 'b-proposes',
    title: 'B proposes',
    steps: [
      'Round 1: B1->A2, B2->A1, B3->A1.',
      'A2 accepts B1. A1 prefers B2 over B3, keeps B2 and rejects B3.',
      'Round 2: B3 proposes to A3.',
      'A3 accepts B3. Matching complete: (A2,B1), (A1,B2), (A3,B3).',
    ],
    summary:
      'B side achieves its proposer-optimal stable matching.',
  },
  {
    id: 'rejection-chain',
    title: 'Rejection chain',
    steps: [
      'A1 proposes to B2 and is accepted.',
      'A2 proposes to B2; B2 prefers A2, so A1 is rejected.',
      'A1 proposes to B1 and is accepted.',
      'B1 later receives A3, but prefers A1, so A3 is rejected.',
    ],
    summary:
      'Rejected proposers continue down their lists until matched.',
  },
]

const debuggingChecklist = [
  {
    title: 'Are preference lists complete?',
    detail:
      'Missing entries can create undefined behavior unless explicitly supported.',
  },
  {
    title: 'Are rank maps built correctly?',
    detail:
      'Incorrect ranks cause wrong accept/reject decisions.',
  },
  {
    title: 'Is each proposer advancing?',
    detail:
      'Ensure each proposer moves to the next receiver after rejection.',
  },
  {
    title: 'Is the free queue maintained?',
    detail:
      'Proposers rejected must re-enter the free queue.',
  },
  {
    title: 'Are matches consistent?',
    detail:
      'If A is matched to B, then B must be matched to A.',
  },
  {
    title: 'Does the algorithm stop?',
    detail:
      'A proposer should stop once matched, unless later rejected.',
  },
]

const faq = [
  {
    question: 'Does a stable matching always exist?',
    answer:
      'Yes for two equally sized sets with strict, complete preferences.',
  },
  {
    question: 'Is the stable matching unique?',
    answer:
      'Not necessarily. There can be many stable matchings.',
  },
  {
    question: 'Which side should propose?',
    answer:
      'The proposing side gets the best stable outcomes; the choice depends on policy goals.',
  },
  {
    question: 'What if preferences have ties?',
    answer:
      'You need a variant of the algorithm and a precise stability definition.',
  },
  {
    question: 'Can participants lie?',
    answer:
      'The algorithm is strategy-proof for proposers but not for receivers.',
  },
]

const keyTakeaways = [
  'A stable matching always exists for complete strict preferences.',
  'Gale-Shapley finds one in O(n^2) time.',
  'The proposing side gets its best stable partners.',
  'Stable matchings may not be unique.',
  'Stability prevents mutually beneficial deviations.',
]

export default function StableMarriagePage(): JSX.Element {
  const [selectedScenarioId, setSelectedScenarioId] = useState(timelineScenarios[0]?.id ?? 'a-proposes')
  const [stepIndex, setStepIndex] = useState(0)

  const selectedScenario = timelineScenarios.find((scenario) => scenario.id === selectedScenarioId) ?? timelineScenarios[0]
  const stepText = selectedScenario?.steps[stepIndex] ?? 'No steps available.'
  const canStepForward = selectedScenario ? stepIndex < selectedScenario.steps.length - 1 : false

  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Stable Marriage</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Finding stable matchings with deferred acceptance</div>
              <p className="win95-text">
                The Stable Marriage problem asks for a perfect matching with no blocking pairs. The Gale-Shapley algorithm solves this
                efficiently and reveals deep truths about stability, optimality, and fairness. This page covers definitions, algorithm
                mechanics, proofs of correctness, and real-world applications.
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
            <legend>Quick Glossary</legend>
            <div className="win95-grid win95-grid-2">
              {glossary.map((item) => (
                <div key={item.term} className="win95-panel">
                  <div className="win95-heading">{item.term}</div>
                  <p className="win95-text">{item.definition}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Algorithm Overview (Gale-Shapley)</legend>
            <div className="win95-grid win95-grid-2">
              {algorithmOverview.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Formal Definitions</legend>
            <div className="win95-grid win95-grid-2">
              {formalDefinitions.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Correctness Insights</legend>
            <div className="win95-grid win95-grid-2">
              {correctnessInsights.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Key Invariants</legend>
            <div className="win95-grid win95-grid-2">
              {invariants.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Proof Sketches</legend>
            <div className="win95-grid win95-grid-2">
              {proofSketches.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity</legend>
            <div className="win95-grid win95-grid-2">
              {complexity.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Data Structures</legend>
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
            <legend>Preference Table (Example)</legend>
            <div className="win95-panel">
              <table className="win95-table">
                <thead>
                  <tr>
                    <th>Proposer (A)</th>
                    <th>Preferences</th>
                    <th>Receiver (B)</th>
                    <th>Preferences</th>
                  </tr>
                </thead>
                <tbody>
                  {preferenceTable.map((row) => (
                    <tr key={row.a}>
                      <td>{row.a}</td>
                      <td>{row.prefs}</td>
                      <td>{row.b}</td>
                      <td>{row.prefsB}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Stable Matching Lattice</legend>
            <div className="win95-grid win95-grid-2">
              {latticeFacts.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Strategy & Incentives</legend>
            <div className="win95-grid win95-grid-2">
              {strategyInsights.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Pseudocode Reference</legend>
            <div className="win95-stack">
              {pseudocode.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <pre className="win95-code">
                    <code>{item.code.trim()}</code>
                  </pre>
                  <p className="win95-text">{item.explanation}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Worked Examples</legend>
            <div className="win95-stack">
              {workedExamples.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <pre className="win95-code">
                    <code>{item.code.trim()}</code>
                  </pre>
                  <p className="win95-text">{item.explanation}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Interactive Timeline</legend>
            <div className="win95-panel">
              <div className="win95-heading">Proposal Stepper</div>
              <p className="win95-text">
                Select a scenario and step through proposal rounds to see how deferred acceptance builds a stable matching.
              </p>
              <div className="win95-grid win95-grid-2">
                {timelineScenarios.map((scenario) => (
                  <button
                    key={scenario.id}
                    type="button"
                    className="win95-button"
                    onClick={() => {
                      setSelectedScenarioId(scenario.id)
                      setStepIndex(0)
                    }}
                  >
                    {scenario.title}
                  </button>
                ))}
              </div>
              <div className="win95-panel win95-panel--raised">
                <p className="win95-text"><strong>Selected:</strong> {selectedScenario?.title ?? 'None'}</p>
                <p className="win95-text">{stepText}</p>
                <p className="win95-text win95-note">{selectedScenario?.summary ?? ''}</p>
              </div>
              <div className="win95-grid win95-grid-3">
                <button
                  type="button"
                  className="win95-button"
                  onClick={() => setStepIndex(0)}
                >
                  RESET
                </button>
                <button
                  type="button"
                  className="win95-button"
                  onClick={() => setStepIndex((prev) => Math.max(0, prev - 1))}
                >
                  BACK
                </button>
                <button
                  type="button"
                  className="win95-button"
                  onClick={() => {
                    if (canStepForward) {
                      setStepIndex((prev) => prev + 1)
                    }
                  }}
                >
                  STEP
                </button>
              </div>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Variants</legend>
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
            <legend>Edge Cases</legend>
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
            <legend>Debugging Checklist</legend>
            <div className="win95-grid win95-grid-2">
              {debuggingChecklist.map((item) => (
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
                {commonPitfalls.map((pitfall) => (
                  <li key={pitfall.mistake}>
                    <strong>{pitfall.mistake}:</strong> {pitfall.description}
                  </li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>FAQ</legend>
            <div className="win95-stack">
              {faq.map((item) => (
                <div key={item.question} className="win95-panel">
                  <div className="win95-heading">{item.question}</div>
                  <p className="win95-text">{item.answer}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Key Takeaways</legend>
            <div className="win95-grid win95-grid-2">
              {keyTakeaways.map((item) => (
                <div key={item} className="win95-panel">
                  <p className="win95-text">{item}</p>
                </div>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}
