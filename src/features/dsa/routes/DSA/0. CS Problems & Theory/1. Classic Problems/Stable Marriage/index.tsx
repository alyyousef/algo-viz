import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

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

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const win98HelpStyles = `
.sm98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.sm98-window {
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
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

.sm98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.sm98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.sm98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.sm98-control {
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
  padding: 0;
}

.sm98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
  overflow-x: auto;
}

.sm98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
  white-space: nowrap;
}

.sm98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.sm98-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.sm98-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.sm98-toc-title {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 10px;
}

.sm98-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.sm98-toc-list li {
  margin: 0 0 8px;
}

.sm98-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.sm98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.sm98-doc-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px;
}

.sm98-section {
  margin: 0 0 20px;
}

.sm98-heading {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px;
}

.sm98-subheading {
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 6px;
}

.sm98-content p,
.sm98-content li,
.sm98-content th,
.sm98-content td {
  font-size: 12px;
  line-height: 1.5;
}

.sm98-content p {
  margin: 0 0 10px;
}

.sm98-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.sm98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.sm98-codebox {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 8px;
  margin: 6px 0 10px;
}

.sm98-codebox code {
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
  display: block;
}

.sm98-table {
  border-collapse: collapse;
  width: 100%;
  margin: 6px 0 10px;
}

.sm98-table th,
.sm98-table td {
  border: 1px solid #808080;
  padding: 4px 6px;
  text-align: left;
  vertical-align: top;
}

.sm98-table thead th {
  background: #e4e4e4;
}

.sm98-inline-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 0 0 10px;
}

.sm98-push {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  font-size: 12px;
  padding: 4px 8px;
  cursor: pointer;
}

@media (max-width: 900px) {
  .sm98-main {
    grid-template-columns: 1fr;
  }

  .sm98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .sm98-title-text {
    font-size: 13px;
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
    { id: 'bp-setup', label: 'Problem Setup' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-algo', label: 'Algorithm Overview' },
    { id: 'core-defs', label: 'Formal Definitions' },
    { id: 'core-correct', label: 'Correctness Insights' },
    { id: 'core-invariants', label: 'Invariants' },
    { id: 'core-proofs', label: 'Proof Sketches' },
    { id: 'core-complexity', label: 'Complexity' },
    { id: 'core-structures', label: 'Data Structures' },
    { id: 'core-lattice', label: 'Stable Matching Lattice' },
    { id: 'core-strategy', label: 'Strategy and Incentives' },
    { id: 'core-variants', label: 'Variants' },
    { id: 'core-edge', label: 'Edge Cases' },
    { id: 'core-applications', label: 'Applications' },
    { id: 'core-debug', label: 'Debugging Checklist' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-faq', label: 'FAQ' },
  ],
  examples: [
    { id: 'ex-pseudocode', label: 'Pseudocode Reference' },
    { id: 'ex-worked', label: 'Worked Examples' },
    { id: 'ex-table', label: 'Preference Table' },
    { id: 'ex-timeline', label: 'Interactive Timeline' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function StableMarriagePage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    const tab = searchParams.get('tab')
    return isTabId(tab) ? tab : 'big-picture'
  })
  const [selectedScenarioId, setSelectedScenarioId] = useState(timelineScenarios[0]?.id ?? 'a-proposes')
  const [stepIndex, setStepIndex] = useState(0)

  const selectedScenario = timelineScenarios.find((scenario) => scenario.id === selectedScenarioId) ?? timelineScenarios[0]
  const stepText = selectedScenario?.steps[stepIndex] ?? 'No steps available.'
  const canStepForward = selectedScenario ? stepIndex < selectedScenario.steps.length - 1 : false
  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Stable Marriage (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Stable Marriage',
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
    <div className="sm98-help-page">
      <style>{win98HelpStyles}</style>
      <div className="sm98-window" role="presentation">
        <header className="sm98-titlebar">
          <span className="sm98-title-text">Stable Marriage</span>
          <div className="sm98-title-controls">
            <button className="sm98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="sm98-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>
        <div className="sm98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`sm98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="sm98-main">
          <aside className="sm98-toc" aria-label="Table of contents">
            <h2 className="sm98-toc-title">Contents</h2>
            <ul className="sm98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="sm98-content">
            <h1 className="sm98-doc-title">Stable Marriage</h1>
            <p>
              The Stable Marriage problem asks for a perfect matching with no blocking pairs. The Gale-Shapley algorithm solves
              this efficiently and reveals deep truths about stability, optimality, and fairness. This page covers definitions,
              algorithm mechanics, proofs of correctness, and real-world applications.
            </p>
            <p>
              <Link to="/algoViz">Back to Catalog</Link>
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="sm98-section">
                  <h2 className="sm98-heading">Overview</h2>
                  {bigPicture.map((item) => (
                    <div key={item.title}>
                      <h3 className="sm98-subheading">{item.title}</h3>
                      <p>{item.details}</p>
                      <p>{item.notes}</p>
                    </div>
                  ))}
                </section>
                <hr className="sm98-divider" />
                <section id="bp-setup" className="sm98-section">
                  <h2 className="sm98-heading">Problem Setup</h2>
                  {problemSetup.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <hr className="sm98-divider" />
                <section id="bp-takeaways" className="sm98-section">
                  <h2 className="sm98-heading">Key Takeaways</h2>
                  <ul>
                    {keyTakeaways.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                <section id="core-algo" className="sm98-section">
                  <h2 className="sm98-heading">Algorithm Overview (Gale-Shapley)</h2>
                  {algorithmOverview.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-defs" className="sm98-section">
                  <h2 className="sm98-heading">Formal Definitions</h2>
                  {formalDefinitions.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-correct" className="sm98-section">
                  <h2 className="sm98-heading">Correctness Insights</h2>
                  {correctnessInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-invariants" className="sm98-section">
                  <h2 className="sm98-heading">Key Invariants</h2>
                  {invariants.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-proofs" className="sm98-section">
                  <h2 className="sm98-heading">Proof Sketches</h2>
                  {proofSketches.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-complexity" className="sm98-section">
                  <h2 className="sm98-heading">Complexity</h2>
                  {complexity.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-structures" className="sm98-section">
                  <h2 className="sm98-heading">Data Structures</h2>
                  {dataStructures.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-lattice" className="sm98-section">
                  <h2 className="sm98-heading">Stable Matching Lattice</h2>
                  {latticeFacts.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-strategy" className="sm98-section">
                  <h2 className="sm98-heading">Strategy and Incentives</h2>
                  {strategyInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-variants" className="sm98-section">
                  <h2 className="sm98-heading">Variants</h2>
                  {variants.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-edge" className="sm98-section">
                  <h2 className="sm98-heading">Edge Cases</h2>
                  {edgeCases.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-applications" className="sm98-section">
                  <h2 className="sm98-heading">Applications</h2>
                  {applications.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-debug" className="sm98-section">
                  <h2 className="sm98-heading">Debugging Checklist</h2>
                  {debuggingChecklist.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="sm98-section">
                  <h2 className="sm98-heading">Common Pitfalls</h2>
                  <ul>
                    {commonPitfalls.map((pitfall) => (
                      <li key={pitfall.mistake}>
                        <strong>{pitfall.mistake}:</strong> {pitfall.description}
                      </li>
                    ))}
                  </ul>
                </section>
                <section id="core-faq" className="sm98-section">
                  <h2 className="sm98-heading">FAQ</h2>
                  {faq.map((item) => (
                    <p key={item.question}>
                      <strong>{item.question}</strong> {item.answer}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                <section id="ex-pseudocode" className="sm98-section">
                  <h2 className="sm98-heading">Pseudocode Reference</h2>
                  {pseudocode.map((item) => (
                    <div key={item.title}>
                      <h3 className="sm98-subheading">{item.title}</h3>
                      <div className="sm98-codebox">
                        <code>{item.code.trim()}</code>
                      </div>
                      <p>{item.explanation}</p>
                    </div>
                  ))}
                </section>
                <section id="ex-worked" className="sm98-section">
                  <h2 className="sm98-heading">Worked Examples</h2>
                  {workedExamples.map((item) => (
                    <div key={item.title}>
                      <h3 className="sm98-subheading">{item.title}</h3>
                      <div className="sm98-codebox">
                        <code>{item.code.trim()}</code>
                      </div>
                      <p>{item.explanation}</p>
                    </div>
                  ))}
                </section>
                <section id="ex-table" className="sm98-section">
                  <h2 className="sm98-heading">Preference Table (Example)</h2>
                  <table className="sm98-table">
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
                </section>
                <section id="ex-timeline" className="sm98-section">
                  <h2 className="sm98-heading">Interactive Timeline</h2>
                  <p>
                    Select a scenario and step through proposal rounds to see how deferred acceptance builds a stable matching.
                  </p>
                  <div className="sm98-inline-buttons">
                    {timelineScenarios.map((scenario) => (
                      <button
                        key={scenario.id}
                        type="button"
                        className="sm98-push"
                        onClick={() => {
                          setSelectedScenarioId(scenario.id)
                          setStepIndex(0)
                        }}
                      >
                        {scenario.title}
                      </button>
                    ))}
                  </div>
                  <h3 className="sm98-subheading">Selected: {selectedScenario?.title ?? 'None'}</h3>
                  <p>{stepText}</p>
                  <p>
                    <strong>Summary:</strong> {selectedScenario?.summary ?? ''}
                  </p>
                  <div className="sm98-inline-buttons">
                    <button type="button" className="sm98-push" onClick={() => setStepIndex(0)}>
                      RESET
                    </button>
                    <button
                      type="button"
                      className="sm98-push"
                      onClick={() => setStepIndex((prev) => Math.max(0, prev - 1))}
                    >
                      BACK
                    </button>
                    <button
                      type="button"
                      className="sm98-push"
                      onClick={() => {
                        if (canStepForward) {
                          setStepIndex((prev) => prev + 1)
                        }
                      }}
                    >
                      STEP
                    </button>
                  </div>
                </section>
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="sm98-section">
                <h2 className="sm98-heading">Glossary</h2>
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
