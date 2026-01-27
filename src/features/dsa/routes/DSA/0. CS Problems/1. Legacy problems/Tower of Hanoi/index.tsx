import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { win95Styles } from '@/styles/win95'

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
    title: 'Reve’s puzzle (4 pegs)',
    detail:
      'The Frame–Stewart algorithm generalizes Hanoi with more pegs; optimality is more complex.',
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

export default function TowerOfHanoiPage(): JSX.Element {
  const [selectedScenarioId, setSelectedScenarioId] = useState(timelineScenarios[0]?.id ?? 'n3')
  const [stepIndex, setStepIndex] = useState(0)
  const [diskCount, setDiskCount] = useState(3)

  const selectedScenario = timelineScenarios.find((scenario) => scenario.id === selectedScenarioId) ?? timelineScenarios[0]
  const stepText = selectedScenario?.steps[stepIndex] ?? 'No steps available.'
  const canStepForward = selectedScenario ? stepIndex < selectedScenario.steps.length - 1 : false

  const moveCount = useMemo(() => (diskCount > 0 ? Math.pow(2, diskCount) - 1 : 0), [diskCount])

  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Tower of Hanoi</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">A recursive puzzle with exponential complexity</div>
              <p className="win95-text">
                The Tower of Hanoi problem is the classic example of recursion and exponential growth. Its elegant recursive solution
                is optimal, and its move count grows as 2^n - 1. This page covers the problem definition, algorithm, proofs, and
                practical insights into why the puzzle behaves the way it does.
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
            <legend>Algorithm Overview</legend>
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
            <legend>Recurrence & Move Count</legend>
            <div className="win95-grid win95-grid-2">
              {recurrence.map((item) => (
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
            <legend>Proof Walkthrough</legend>
            <div className="win95-grid win95-grid-2">
              {proofWalkthrough.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Move Count Table</legend>
            <div className="win95-panel">
              <table className="win95-table">
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
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Iterative Method Insights</legend>
            <div className="win95-grid win95-grid-2">
              {iterativeInsights.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>State-Space View</legend>
            <div className="win95-grid win95-grid-2">
              {stateSpaceView.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Move Count Calculator</legend>
            <div className="win95-panel">
              <p className="win95-text">
                Pick a disk count to compute the minimal number of moves.
              </p>
              <div className="win95-grid win95-grid-2">
                <div className="win95-panel win95-panel--raised">
                  <p className="win95-text"><strong>Disks:</strong> {diskCount}</p>
                  <p className="win95-text"><strong>Minimal moves:</strong> {moveCount}</p>
                </div>
                <div className="win95-grid win95-grid-3">
                  {[1, 2, 3, 4, 5, 6].map((value) => (
                    <button
                      key={value}
                      type="button"
                      className="win95-button"
                      onClick={() => setDiskCount(value)}
                    >
                      {value} disks
                    </button>
                  ))}
                </div>
              </div>
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
              <div className="win95-heading">Move Stepper</div>
              <p className="win95-text">
                Step through key sequences to see why the recurrence and move count are forced by the rules.
              </p>
              <div className="win95-grid win95-grid-3">
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
            <legend>Mind Map (Concept Walkthrough)</legend>
            <div className="win95-grid win95-grid-2">
              {mindMapNodes.map((item) => (
                <div key={item.id} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                <strong>Walkthrough:</strong> Follow the nodes in order: Definition → Rules → Algorithm → Recurrence → Complexity.
                Then branch to Proofs, Variants, and Applications.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Mind Map Walkthrough Steps</legend>
            <div className="win95-grid win95-grid-2">
              {mindMapWalkthrough.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Mind Map Edges</legend>
            <div className="win95-panel">
              <table className="win95-table">
                <thead>
                  <tr>
                    <th>From</th>
                    <th>To</th>
                    <th>Why it connects</th>
                  </tr>
                </thead>
                <tbody>
                  {mindMapEdges.map((edge) => (
                    <tr key={`${edge.from}-${edge.to}`}>
                      <td>{edge.from}</td>
                      <td>{edge.to}</td>
                      <td>{edge.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
