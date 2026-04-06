import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'What it is',
    details:
      'Tower of Hanoi is a classic recursive puzzle: move a stack of disks from one peg to another using a third peg, one disk at a time, never placing a larger disk on a smaller one.',
    notes:
      'It is a benchmark problem for recursion, invariants, and exponential growth.',
  },
  {
    title: 'Why it matters',
    details:
      'The minimal number of moves is 2^n - 1, illustrating exponential complexity.',
    notes:
      'It models constrained state transitions and recursive decomposition.',
  },
  {
    title: 'What it teaches',
    details:
      'Divide-and-conquer, recursion trees, and careful state management.',
    notes:
      'It highlights the difference between algorithmic elegance and scalability.',
  },
]

const problemSetup = [
  {
    title: 'Input',
    detail:
      'n disks of distinct sizes stacked on a source peg, largest at the bottom.',
  },
  {
    title: 'Goal',
    detail:
      'Move the entire stack to a target peg using an auxiliary peg.',
  },
  {
    title: 'Rules',
    detail:
      'Move one disk at a time and never place a larger disk on top of a smaller disk.',
  },
  {
    title: 'Output',
    detail:
      'A sequence of legal moves that transfers all disks to the target peg.',
  },
]

const glossary = [
  { term: 'Peg', definition: 'A rod holding a stack of disks.' },
  { term: 'Disk', definition: 'An item of a particular size; smaller disks must stay above larger ones.' },
  { term: 'Legal move', definition: 'Moving the top disk of a peg onto a peg whose top disk is larger or empty.' },
  { term: 'Recursive step', definition: 'Solve a smaller instance of the same problem.' },
  { term: 'Move count', definition: 'Total number of disk moves required to solve the puzzle.' },
  { term: 'State', definition: 'The configuration of disks across the pegs.' },
  { term: 'Invariant', definition: 'A condition that must always hold; here, peg stacks are strictly increasing.' },
  { term: 'Optimal solution', definition: 'The minimum move sequence, known to be 2^n - 1.' },
]

const algorithmOverview = [
  {
    title: 'Move n-1 disks to auxiliary',
    detail:
      'Use the target peg as auxiliary to move the top n-1 disks off the largest disk.',
  },
  {
    title: 'Move largest disk to target',
    detail:
      'This move is forced because the largest disk cannot sit on any smaller disk.',
  },
  {
    title: 'Move n-1 disks to target',
    detail:
      'Move the smaller stack onto the largest disk, using the source peg as auxiliary.',
  },
  {
    title: 'Repeat recursively',
    detail:
      'Each step reduces the problem size by one.',
  },
]

const recurrence = [
  {
    title: 'Recurrence',
    detail:
      'T(n) = 2T(n-1) + 1, with T(1) = 1.',
  },
  {
    title: 'Closed form',
    detail:
      'T(n) = 2^n - 1.',
  },
  {
    title: 'Growth rate',
    detail:
      'Exponential time; doubling disks nearly squares the number of moves.',
  },
]

const correctnessInsights = [
  {
    title: 'Optimality',
    detail:
      'The largest disk must move exactly once, and all smaller disks must move off and back, forcing 2T(n-1) + 1.',
  },
  {
    title: 'Invariant',
    detail:
      'Each peg remains an increasing stack from top to bottom throughout the algorithm.',
  },
  {
    title: 'Termination',
    detail:
      'Each recursive call reduces n by 1 until it reaches 1.',
  },
  {
    title: 'Uniqueness of minimal count',
    detail:
      'Any legal solution must have at least 2^n - 1 moves.',
  },
]

const complexity = [
  {
    title: 'Time',
    detail:
      'O(2^n) moves; each move is constant time.',
  },
  {
    title: 'Space (recursive)',
    detail:
      'O(n) call stack depth.',
  },
  {
    title: 'Space (iterative)',
    detail:
      'O(1) additional space if you generate moves algorithmically.',
  },
]

const variants = [
  {
    title: 'Iterative solution',
    detail:
      'Uses binary patterns or parity rules to generate moves without recursion.',
  },
  {
    title: "Reve's puzzle (4 pegs)",
    detail:
      'The Frame-Stewart algorithm generalizes Hanoi with more pegs; optimality is more complex.',
  },
  {
    title: 'Constrained Hanoi',
    detail:
      'Disallow certain moves (e.g., direct source-to-target), creating new recurrences.',
  },
  {
    title: 'Weighted moves',
    detail:
      'Assign costs to moves; optimal solutions change accordingly.',
  },
]

const applications = [
  {
    title: 'Recursive thinking',
    detail:
      'A pedagogical example for recursion and divide-and-conquer.',
  },
  {
    title: 'State-space search',
    detail:
      'Used to illustrate BFS/DFS on a constrained state graph.',
  },
  {
    title: 'Stack discipline',
    detail:
      'Analogy to stack-based memory and call-stack evolution.',
  },
  {
    title: 'Algorithm analysis',
    detail:
      'Shows exponential growth and how recurrence relations are solved.',
  },
]

const mindMapNodes = [
  {
    id: 'root',
    title: 'Tower of Hanoi',
    detail:
      'A recursive puzzle with strict move constraints and exponential minimal move count.',
  },
  {
    id: 'definition',
    title: 'Definition',
    detail:
      'Move n disks from source to target using auxiliary peg, one disk at a time, never larger on smaller.',
  },
  {
    id: 'rules',
    title: 'Rules',
    detail:
      'Only top disk moves; larger disks can never rest on smaller disks.',
  },
  {
    id: 'algorithm',
    title: 'Algorithm',
    detail:
      'Recursive: move n-1 to auxiliary, move largest, move n-1 to target.',
  },
  {
    id: 'recurrence',
    title: 'Recurrence',
    detail:
      'T(n) = 2T(n-1) + 1; closed form 2^n - 1.',
  },
  {
    id: 'proofs',
    title: 'Proofs',
    detail:
      'Optimality by necessity of moving largest disk; stability via invariants.',
  },
  {
    id: 'complexity',
    title: 'Complexity',
    detail:
      'Exponential time, linear recursion depth.',
  },
  {
    id: 'variants',
    title: 'Variants',
    detail:
      'More pegs, constrained moves, weighted moves, iterative methods.',
  },
  {
    id: 'applications',
    title: 'Applications',
    detail:
      'Recursion pedagogy, state-space search, algorithm analysis.',
  },
]

const commonPitfalls = [
  {
    mistake: 'Violating the disk ordering rule',
    description:
      'Any move that places a larger disk on a smaller one invalidates the solution.',
  },
  {
    mistake: 'Assuming polynomial time',
    description:
      'The move count grows exponentially; even 30 disks is over a billion moves.',
  },
  {
    mistake: 'Missing base cases',
    description:
      'Recursive solutions without correct base cases can loop or overflow.',
  },
  {
    mistake: 'Wrong auxiliary peg',
    description:
      'Swapping peg roles incorrectly produces invalid sequences.',
  },
  {
    mistake: 'Treating minimal sequence as unique',
    description:
      'There are many valid move sequences; only the minimal move count is fixed.',
  },
]

const dataStructures = [
  {
    title: 'Stack per peg',
    detail:
      'Model each peg as a stack of disk sizes for simulation or visualization.',
  },
  {
    title: 'Move list',
    detail:
      'Store generated moves as (from, to) pairs for replay.',
  },
  {
    title: 'Disk size ordering',
    detail:
      'Keep disks sorted so the invariant is easy to validate after each move.',
  },
  {
    title: 'Recursive call stack',
    detail:
      'Implicit structure of the algorithm; depth equals disk count.',
  },
]

const iterativeInsights = [
  {
    title: 'Parity rule',
    detail:
      'For odd n, the smallest disk cycles A -> C -> B -> A; for even n, it cycles A -> B -> C -> A.',
  },
  {
    title: 'Every other move',
    detail:
      'The smallest disk moves every alternate step; the other move is the only legal move.',
  },
  {
    title: 'Binary interpretation',
    detail:
      'Move sequences correspond to binary counting; disk k moves every 2^(k-1) steps.',
  },
  {
    title: 'Iterative advantage',
    detail:
      'Avoids recursion stack; useful for large n or low-level implementations.',
  },
]

const proofWalkthrough = [
  {
    title: 'Why largest disk moves once',
    detail:
      'It starts at the bottom of the source and must end at the bottom of the target.',
  },
  {
    title: 'Clearing the top',
    detail:
      'All n-1 smaller disks must move off the largest disk before it can move.',
  },
  {
    title: 'Rebuilding the stack',
    detail:
      'After moving the largest disk, the n-1 disks must be placed on top again.',
  },
  {
    title: 'Recurrence forced',
    detail:
      'This yields T(n) = 2T(n-1) + 1; any solution must follow it.',
  },
]

const stateSpaceView = [
  {
    title: 'States',
    detail:
      'Each disk can be on one of 3 pegs, so there are 3^n possible states.',
  },
  {
    title: 'Edges',
    detail:
      'Legal moves form edges between states; the solution is a path in this graph.',
  },
  {
    title: 'Shortest path',
    detail:
      'The optimal solution is the shortest path between start and goal states.',
  },
  {
    title: 'Gray-code connection',
    detail:
      'The sequence of states for smallest disk resembles Gray-code patterns.',
  },
]

const pseudocode = [
  {
    title: 'Recursive algorithm',
    code: `function hanoi(n, source, auxiliary, target):
  if n == 1:
    move source -> target
    return
  hanoi(n-1, source, target, auxiliary)
  move source -> target
  hanoi(n-1, auxiliary, source, target)`,
    explanation:
      'The standard divide-and-conquer solution.',
  },
  {
    title: 'Move count',
    code: `T(1) = 1
T(n) = 2T(n-1) + 1
T(n) = 2^n - 1`,
    explanation:
      'The minimal number of moves grows exponentially.',
  },
  {
    title: 'Iterative rule sketch',
    code: `if n is odd:
  smallest moves A->C->B->A ...
else:
  smallest moves A->B->C->A ...
on alternate steps:
  do the only legal non-smallest move`,
    explanation:
      'The iterative method avoids recursion but follows a strict parity pattern.',
  },
]

const workedExamples = [
  {
    title: 'n = 3 solution',
    code: `1) A -> C
2) A -> B
3) C -> B
4) A -> C
5) B -> A
6) B -> C
7) A -> C`,
    explanation:
      'Seven moves are required (2^3 - 1 = 7).',
  },
  {
    title: 'n = 4 move count',
    code: `T(4) = 2^4 - 1 = 15`,
    explanation:
      'The number of moves doubles plus one as n increases.',
  },
  {
    title: 'Exponential growth intuition',
    code: `n=10 -> 1,023 moves
n=20 -> 1,048,575 moves
n=30 -> 1,073,741,823 moves`,
    explanation:
      'Adding 10 disks multiplies the work by about 1024.',
  },
]

const timelineScenarios = [
  {
    id: 'n3',
    title: 'n=3 walkthrough',
    steps: [
      'Move disk 1: A -> C',
      'Move disk 2: A -> B',
      'Move disk 1: C -> B',
      'Move disk 3: A -> C',
      'Move disk 1: B -> A',
      'Move disk 2: B -> C',
      'Move disk 1: A -> C',
    ],
    summary:
      'All disks end on C after 7 legal moves.',
  },
  {
    id: 'forced-largest',
    title: 'Largest disk is forced',
    steps: [
      'To move disk n, all smaller disks must move to auxiliary.',
      'Only then can disk n move to target.',
      'Smaller disks must move again on top of disk n.',
    ],
    summary:
      'This explains the recurrence T(n) = 2T(n-1) + 1.',
  },
  {
    id: 'exponential-growth',
    title: 'Exponential growth',
    steps: [
      'n=1 -> 1 move',
      'n=2 -> 3 moves',
      'n=3 -> 7 moves',
      'n=4 -> 15 moves',
      'n=5 -> 31 moves',
    ],
    summary:
      'Each additional disk roughly doubles the work.',
  },
]

const diskSizes = [
  { n: 1, moves: 1 },
  { n: 2, moves: 3 },
  { n: 3, moves: 7 },
  { n: 4, moves: 15 },
  { n: 5, moves: 31 },
  { n: 6, moves: 63 },
]

const mindMapWalkthrough = [
  {
    title: 'Start at the definition',
    detail:
      'The rules constrain every move and enforce the stack invariant.',
  },
  {
    title: 'Focus on the largest disk',
    detail:
      'It cannot move until every smaller disk is out of the way.',
  },
  {
    title: 'Recurrence emerges',
    detail:
      'Moving n disks requires moving n-1 twice plus one forced move.',
  },
  {
    title: 'Complexity follows',
    detail:
      'The recurrence solves to 2^n - 1, yielding exponential growth.',
  },
  {
    title: 'Variants generalize',
    detail:
      'Changing pegs or constraints alters the recurrence and the optimal strategy.',
  },
]

const mindMapEdges = [
  { from: 'Tower of Hanoi', to: 'Definition', note: 'Problem statement' },
  { from: 'Definition', to: 'Rules', note: 'Legal moves' },
  { from: 'Rules', to: 'Algorithm', note: 'Strategy respects constraints' },
  { from: 'Algorithm', to: 'Recurrence', note: 'Forced by largest disk' },
  { from: 'Recurrence', to: 'Complexity', note: 'Exponential growth' },
  { from: 'Algorithm', to: 'Proofs', note: 'Optimality & correctness' },
  { from: 'Algorithm', to: 'Variants', note: 'Generalizations' },
  { from: 'Variants', to: 'Applications', note: 'Real use cases' },
]

const keyTakeaways = [
  'Tower of Hanoi has a minimal move count of 2^n - 1.',
  'The recursive algorithm is optimal and simple to express.',
  'The problem demonstrates exponential growth and recursion depth.',
  'Invariants ensure no larger disk is placed on a smaller one.',
  'Variants introduce new constraints and complex recurrences.',
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

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
    { id: 'bp-recurrence', label: 'Recurrence and Growth' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-algorithm', label: 'Algorithm Overview' },
    { id: 'core-correctness', label: 'Correctness Insights' },
    { id: 'core-complexity', label: 'Complexity' },
    { id: 'core-structures', label: 'Data Structures' },
    { id: 'core-iterative', label: 'Iterative Insights' },
    { id: 'core-proof', label: 'Proof Walkthrough' },
    { id: 'core-state', label: 'State-Space View' },
    { id: 'core-mind-map', label: 'Mind Map Concepts' },
    { id: 'core-edges', label: 'Mind Map Edges' },
    { id: 'core-variants', label: 'Variants' },
    { id: 'core-applications', label: 'Applications' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
  ],
  examples: [
    { id: 'ex-pseudocode', label: 'Pseudocode Reference' },
    { id: 'ex-worked', label: 'Worked Examples' },
    { id: 'ex-table', label: 'Move Count Table' },
    { id: 'ex-calculator', label: 'Move Count Calculator' },
    { id: 'ex-timeline', label: 'Interactive Timeline' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

const towerHelpStyles = `
.hanoi98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.hanoi98-window {
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

.hanoi98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 24px;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-weight: 700;
}

.hanoi98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.hanoi98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.hanoi98-control {
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
  padding: 0;
}

.hanoi98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.hanoi98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.hanoi98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.hanoi98-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.hanoi98-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.hanoi98-toc-title {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 10px;
}

.hanoi98-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.hanoi98-toc-list li {
  margin: 0 0 8px;
}

.hanoi98-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.hanoi98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.hanoi98-doc-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px;
}

.hanoi98-section {
  margin: 0 0 20px;
}

.hanoi98-heading {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px;
}

.hanoi98-subheading {
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 6px;
}

.hanoi98-content p,
.hanoi98-content li,
.hanoi98-content td,
.hanoi98-content th,
.hanoi98-content button,
.hanoi98-content a {
  font-size: 12px;
  line-height: 1.5;
}

.hanoi98-content p {
  margin: 0 0 10px;
}

.hanoi98-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.hanoi98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.hanoi98-codebox {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 8px;
  margin: 6px 0 10px;
}

.hanoi98-codebox code {
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
  display: block;
}

.hanoi98-inline-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 0 0 10px;
}

.hanoi98-push {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  font-size: 12px;
  padding: 4px 8px;
  cursor: pointer;
}

.hanoi98-link {
  color: #000080;
}

.hanoi98-table {
  border-collapse: collapse;
  margin: 0 0 10px;
}

.hanoi98-table th,
.hanoi98-table td {
  border: 1px solid #b0b0b0;
  padding: 4px 8px;
  text-align: left;
}

@media (max-width: 900px) {
  .hanoi98-main {
    grid-template-columns: 1fr;
  }

  .hanoi98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .hanoi98-title-text {
    position: static;
    transform: none;
    margin-right: auto;
    font-size: 14px;
  }
}
`

export default function TowerOfHanoiPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedScenarioId, setSelectedScenarioId] = useState(timelineScenarios[0]?.id ?? 'n3')
  const [stepIndex, setStepIndex] = useState(0)
  const [diskCount, setDiskCount] = useState(3)
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    const tab = searchParams.get('tab')
    return isTabId(tab) ? tab : 'big-picture'
  })

  const selectedScenario = timelineScenarios.find((scenario) => scenario.id === selectedScenarioId) ?? timelineScenarios[0]
  const stepText = selectedScenario?.steps[stepIndex] ?? 'No steps available.'
  const canStepForward = selectedScenario ? stepIndex < selectedScenario.steps.length - 1 : false

  const moveCount = useMemo(() => (diskCount > 0 ? Math.pow(2, diskCount) - 1 : 0), [diskCount])
  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Tower of Hanoi (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Tower of Hanoi',
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
    <div className="hanoi98-help-page">
        <style>{towerHelpStyles}</style>
        <div className="hanoi98-window" role="presentation">
          <header className="hanoi98-titlebar">
            <span className="hanoi98-title-text">Tower of Hanoi</span>
            <div className="hanoi98-title-controls">
              <button className="hanoi98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
              <Link to="/algoViz" className="hanoi98-control" aria-label="Close">X</Link>
            </div>
          </header>

          <div className="hanoi98-tabs" role="tablist" aria-label="Sections">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`hanoi98-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
                role="tab"
                aria-selected={activeTab === tab.id}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="hanoi98-main">
            <aside className="hanoi98-toc" aria-label="Table of contents">
              <h2 className="hanoi98-toc-title">Contents</h2>
              <ul className="hanoi98-toc-list">
                {sectionLinks[activeTab].map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`}>{section.label}</a>
                  </li>
                ))}
              </ul>
            </aside>

            <main className="hanoi98-content">
              <h1 className="hanoi98-doc-title">Tower of Hanoi</h1>
              <p>
                Tower of Hanoi is a canonical recursion problem where each legal move follows strict ordering constraints.
                This page keeps the full reference in one place: setup, recurrence, correctness, variants, and worked examples.
                <Link to="/algoViz" className="hanoi98-link"> Back to catalog</Link>.
              </p>

              {activeTab === 'big-picture' && (
                <>
                  <section id="bp-overview" className="hanoi98-section">
                    <h2 className="hanoi98-heading">Overview</h2>
                    {bigPicture.map((item) => (
                      <div key={item.title}>
                        <h3 className="hanoi98-subheading">{item.title}</h3>
                        <p>{item.details}</p>
                        <p>{item.notes}</p>
                      </div>
                    ))}
                  </section>

                  <hr className="hanoi98-divider" />

                  <section id="bp-setup" className="hanoi98-section">
                    <h2 className="hanoi98-heading">Problem Setup</h2>
                    {problemSetup.map((item) => (
                      <p key={item.title}>
                        <strong>{item.title}:</strong> {item.detail}
                      </p>
                    ))}
                  </section>

                  <section id="bp-recurrence" className="hanoi98-section">
                    <h2 className="hanoi98-heading">Recurrence and Growth</h2>
                    {recurrence.map((item) => (
                      <p key={item.title}>
                        <strong>{item.title}:</strong> {item.detail}
                      </p>
                    ))}
                  </section>

                  <section id="bp-takeaways" className="hanoi98-section">
                    <h2 className="hanoi98-heading">Key Takeaways</h2>
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
                  <section id="core-algorithm" className="hanoi98-section">
                    <h2 className="hanoi98-heading">Algorithm Overview</h2>
                    {algorithmOverview.map((item) => (
                      <p key={item.title}>
                        <strong>{item.title}:</strong> {item.detail}
                      </p>
                    ))}
                  </section>
                  <section id="core-correctness" className="hanoi98-section">
                    <h2 className="hanoi98-heading">Correctness Insights</h2>
                    {correctnessInsights.map((item) => (
                      <p key={item.title}>
                        <strong>{item.title}:</strong> {item.detail}
                      </p>
                    ))}
                  </section>
                  <section id="core-complexity" className="hanoi98-section">
                    <h2 className="hanoi98-heading">Complexity</h2>
                    {complexity.map((item) => (
                      <p key={item.title}>
                        <strong>{item.title}:</strong> {item.detail}
                      </p>
                    ))}
                  </section>
                  <section id="core-structures" className="hanoi98-section">
                    <h2 className="hanoi98-heading">Data Structures</h2>
                    {dataStructures.map((item) => (
                      <p key={item.title}>
                        <strong>{item.title}:</strong> {item.detail}
                      </p>
                    ))}
                  </section>
                  <section id="core-iterative" className="hanoi98-section">
                    <h2 className="hanoi98-heading">Iterative Method Insights</h2>
                    {iterativeInsights.map((item) => (
                      <p key={item.title}>
                        <strong>{item.title}:</strong> {item.detail}
                      </p>
                    ))}
                  </section>
                  <section id="core-proof" className="hanoi98-section">
                    <h2 className="hanoi98-heading">Proof Walkthrough</h2>
                    {proofWalkthrough.map((item) => (
                      <p key={item.title}>
                        <strong>{item.title}:</strong> {item.detail}
                      </p>
                    ))}
                  </section>
                  <section id="core-state" className="hanoi98-section">
                    <h2 className="hanoi98-heading">State-Space View</h2>
                    {stateSpaceView.map((item) => (
                      <p key={item.title}>
                        <strong>{item.title}:</strong> {item.detail}
                      </p>
                    ))}
                  </section>
                  <section id="core-mind-map" className="hanoi98-section">
                    <h2 className="hanoi98-heading">Mind Map Concepts</h2>
                    {mindMapNodes.map((item) => (
                      <p key={item.id}>
                        <strong>{item.title}:</strong> {item.detail}
                      </p>
                    ))}
                    <h3 className="hanoi98-subheading">Walkthrough Steps</h3>
                    {mindMapWalkthrough.map((item) => (
                      <p key={item.title}>
                        <strong>{item.title}:</strong> {item.detail}
                      </p>
                    ))}
                  </section>
                  <section id="core-edges" className="hanoi98-section">
                    <h2 className="hanoi98-heading">Mind Map Edges</h2>
                    <ul>
                      {mindMapEdges.map((edge) => (
                        <li key={`${edge.from}-${edge.to}`}>
                          <strong>{edge.from}</strong> -&gt; <strong>{edge.to}</strong>: {edge.note}
                        </li>
                      ))}
                    </ul>
                  </section>
                  <section id="core-variants" className="hanoi98-section">
                    <h2 className="hanoi98-heading">Variants</h2>
                    {variants.map((item) => (
                      <p key={item.title}>
                        <strong>{item.title}:</strong> {item.detail}
                      </p>
                    ))}
                  </section>
                  <section id="core-applications" className="hanoi98-section">
                    <h2 className="hanoi98-heading">Applications</h2>
                    {applications.map((item) => (
                      <p key={item.title}>
                        <strong>{item.title}:</strong> {item.detail}
                      </p>
                    ))}
                  </section>
                  <section id="core-pitfalls" className="hanoi98-section">
                    <h2 className="hanoi98-heading">Common Pitfalls</h2>
                    <ul>
                      {commonPitfalls.map((pitfall) => (
                        <li key={pitfall.mistake}>
                          <strong>{pitfall.mistake}:</strong> {pitfall.description}
                        </li>
                      ))}
                    </ul>
                  </section>
                </>
              )}

              {activeTab === 'examples' && (
                <>
                  <section id="ex-pseudocode" className="hanoi98-section">
                    <h2 className="hanoi98-heading">Pseudocode Reference</h2>
                    {pseudocode.map((item) => (
                      <div key={item.title}>
                        <h3 className="hanoi98-subheading">{item.title}</h3>
                        <div className="hanoi98-codebox">
                          <code>{item.code.trim()}</code>
                        </div>
                        <p>{item.explanation}</p>
                      </div>
                    ))}
                  </section>
                  <section id="ex-worked" className="hanoi98-section">
                    <h2 className="hanoi98-heading">Worked Examples</h2>
                    {workedExamples.map((item) => (
                      <div key={item.title}>
                        <h3 className="hanoi98-subheading">{item.title}</h3>
                        <div className="hanoi98-codebox">
                          <code>{item.code.trim()}</code>
                        </div>
                        <p>{item.explanation}</p>
                      </div>
                    ))}
                  </section>
                  <section id="ex-table" className="hanoi98-section">
                    <h2 className="hanoi98-heading">Move Count Table</h2>
                    <table className="hanoi98-table">
                      <thead>
                        <tr>
                          <th>Disks (n)</th>
                          <th>Moves (2^n - 1)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {diskSizes.map((row) => (
                          <tr key={row.n}>
                            <td>{row.n}</td>
                            <td>{row.moves}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </section>
                  <section id="ex-calculator" className="hanoi98-section">
                    <h2 className="hanoi98-heading">Move Count Calculator</h2>
                    <p>Pick a disk count to compute the minimal number of moves.</p>
                    <div className="hanoi98-inline-buttons">
                      {[1, 2, 3, 4, 5, 6].map((value) => (
                        <button key={value} type="button" className="hanoi98-push" onClick={() => setDiskCount(value)}>
                          {value} disks
                        </button>
                      ))}
                    </div>
                    <p><strong>Disks:</strong> {diskCount}</p>
                    <p><strong>Minimal moves:</strong> {moveCount}</p>
                  </section>
                  <section id="ex-timeline" className="hanoi98-section">
                    <h2 className="hanoi98-heading">Interactive Timeline</h2>
                    <p>Step through key sequences to see why the recurrence and move count are forced by the rules.</p>
                    <div className="hanoi98-inline-buttons">
                      {timelineScenarios.map((scenario) => (
                        <button
                          key={scenario.id}
                          type="button"
                          className="hanoi98-push"
                          onClick={() => {
                            setSelectedScenarioId(scenario.id)
                            setStepIndex(0)
                          }}
                        >
                          {scenario.title}
                        </button>
                      ))}
                    </div>
                    <p><strong>Selected:</strong> {selectedScenario?.title ?? 'None'}</p>
                    <p><strong>Current step:</strong> {stepText}</p>
                    <p>{selectedScenario?.summary ?? ''}</p>
                    <div className="hanoi98-inline-buttons">
                      <button type="button" className="hanoi98-push" onClick={() => setStepIndex(0)}>Reset</button>
                      <button type="button" className="hanoi98-push" onClick={() => setStepIndex((prev) => Math.max(0, prev - 1))}>Back</button>
                      <button
                        type="button"
                        className="hanoi98-push"
                        onClick={() => {
                          if (canStepForward) {
                            setStepIndex((prev) => prev + 1)
                          }
                        }}
                      >
                        Step
                      </button>
                    </div>
                  </section>
                </>
              )}

              {activeTab === 'glossary' && (
                <section id="glossary-terms" className="hanoi98-section">
                  <h2 className="hanoi98-heading">Glossary</h2>
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

