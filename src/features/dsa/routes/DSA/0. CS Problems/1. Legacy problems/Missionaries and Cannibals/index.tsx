import { Link } from 'react-router-dom'

import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const bigPicture = [
  {
    title: 'What it is',
    details:
      'A river-crossing puzzle where missionaries must not be outnumbered by cannibals on either bank.',
    notes:
      'It is a classic state-space search problem with constraints on safety and capacity.',
  },
  {
    title: 'Why it matters',
    details:
      'It illustrates how to model constraints, generate legal moves, and search for optimal solutions.',
    notes:
      'The problem is small but rich enough to teach BFS, DFS, and state representation.',
  },
  {
    title: 'What it teaches',
    details:
      'State encoding, validity constraints, shortest path search, and avoiding repeated states.',
    notes:
      'It also demonstrates how a simple rule can prune a large part of the state space.',
  },
]

const historicalContext = [
  {
    title: 'Early logic puzzles',
    details:
      'River-crossing puzzles were popular in recreational mathematics and early AI texts.',
    notes:
      'Missionaries and Cannibals became a standard example in AI search courses.',
  },
  {
    title: '1950s-1960s: AI search',
    details:
      'The puzzle was used to demonstrate state-space search, BFS, and problem formulation.',
    notes:
      'Its small size makes it ideal for exhaustive search demonstrations.',
  },
  {
    title: 'Modern usage',
    details:
      'Still used in interviews and teaching to highlight modeling and constraints.',
    notes:
      'Variants generalize to transport, logistics, and resource safety constraints.',
  },
]

const quickGlossary = [
  {
    term: 'State',
    definition: 'A snapshot of how many missionaries and cannibals are on each bank, plus boat position.',
  },
  {
    term: 'Valid state',
    definition: 'A state where missionaries are never outnumbered by cannibals on any bank.',
  },
  {
    term: 'Boat capacity',
    definition: 'The maximum number of people the boat can carry per crossing.',
  },
  {
    term: 'Successor',
    definition: 'A state reachable by one legal boat crossing.',
  },
  {
    term: 'Goal state',
    definition: 'All missionaries and cannibals safely on the destination bank.',
  },
  {
    term: 'Search frontier',
    definition: 'The queue or stack of states to explore next during search.',
  },
]

const problemSetup = [
  {
    title: 'Classic setup',
    detail:
      '3 missionaries and 3 cannibals must cross a river with a 2-person boat.',
  },
  {
    title: 'Constraint',
    detail:
      'On any bank, if missionaries are present, they cannot be outnumbered by cannibals.',
  },
  {
    title: 'Moves',
    detail:
      'Each crossing moves 1 or 2 people, any mix of missionaries and cannibals.',
  },
  {
    title: 'Goal',
    detail:
      'All 6 individuals end up safely on the opposite bank.',
  },
]

const stateRepresentation = [
  {
    title: 'Tuple form',
    detail:
      'Represent state as (M_left, C_left, boatSide). Boat side is L or R.',
  },
  {
    title: 'Derived counts',
    detail:
      'Right bank counts are determined by totals: M_right = 3 - M_left, C_right = 3 - C_left.',
  },
  {
    title: 'Validity check',
    detail:
      'A state is valid if M_left == 0 or M_left >= C_left AND M_right == 0 or M_right >= C_right.',
  },
  {
    title: 'Initial state',
    detail:
      '(3, 3, L) is the start. The goal is (0, 0, R).',
  },
]

const moveSet = [
  {
    title: 'Legal boat loads',
    detail:
      'Possible loads: (1M), (2M), (1C), (2C), (1M1C).',
  },
  {
    title: 'Direction matters',
    detail:
      'Each move subtracts from the source bank and adds to the destination bank.',
  },
  {
    title: 'Validity after move',
    detail:
      'A move is legal only if both banks remain valid after crossing.',
  },
  {
    title: 'State space size',
    detail:
      'Only a small number of states are valid; most are rejected by constraints.',
  },
]

const searchStrategies = [
  {
    title: 'Breadth-first search (BFS)',
    detail:
      'Guarantees the shortest sequence of crossings in an unweighted graph of states.',
  },
  {
    title: 'Depth-first search (DFS)',
    detail:
      'Finds a solution but may explore deep dead ends first.',
  },
  {
    title: 'Bidirectional search',
    detail:
      'Search forward from start and backward from goal, meeting in the middle.',
  },
  {
    title: 'A* search',
    detail:
      'Works with a heuristic like the number of people left to move.',
  },
]

const correctnessNotes = [
  {
    title: 'State validity',
    detail:
      'All states in the search must satisfy the safety constraint on both banks.',
  },
  {
    title: 'No repeats',
    detail:
      'Use a visited set to avoid cycles (such as undoing a move repeatedly).',
  },
  {
    title: 'Optimality with BFS',
    detail:
      'BFS guarantees the minimum number of crossings if all moves cost the same.',
  },
]

const complexityNotes = [
  {
    title: 'State space size',
    detail:
      'For the classic problem, only a handful of valid states exist (less than 20).',
  },
  {
    title: 'Branching factor',
    detail:
      'At most 5 legal move types, but usually fewer after constraints.',
  },
  {
    title: 'Search time',
    detail:
      'BFS runs quickly due to the small state space; complexity is negligible here.',
  },
]

const variants = [
  {
    title: 'Different counts',
    detail:
      'Use N missionaries and N cannibals; the problem scales and may become impossible for small boats.',
  },
  {
    title: 'Different boat capacity',
    detail:
      'Capacity 3 changes the move set and typically reduces the number of crossings.',
  },
  {
    title: 'Other constraints',
    detail:
      'Add rules like only missionaries can pilot or cannibals cannot be left alone.',
  },
  {
    title: 'Multiple boats',
    detail:
      'Creates a richer state space and more complex coordination.',
  },
]

const workedExample = [
  {
    title: 'One optimal solution (11 crossings)',
    code: `1) CC ->
2) C <-
3) CC ->
4) C <-
5) MM ->
6) MC <-
7) MM ->
8) C <-
9) CC ->
10) C <-
11) MC ->`,
    explanation:
      'This is a canonical shortest sequence for the 3-3-2 problem. Many equivalent solutions exist.',
  },
]

const pitfalls = [
  {
    mistake: 'Allowing illegal states',
    description:
      'If you do not enforce the safety constraint after every move, the search becomes invalid.',
  },
  {
    mistake: 'Not modeling boat position',
    description:
      'Boat side is part of the state. Without it, you cannot generate correct successors.',
  },
  {
    mistake: 'Ignoring repeats',
    description:
      'Without a visited set, BFS/DFS can loop forever between reversible moves.',
  },
  {
    mistake: 'Assuming any move is reversible',
    description:
      'Some legal moves lead only to dead ends; you still must track visited states carefully.',
  },
]

const realWorldConnections = [
  {
    title: 'Resource safety',
    detail:
      'Ensuring a critical resource (missionaries) is never outnumbered by risk (cannibals).',
  },
  {
    title: 'Transport scheduling',
    detail:
      'Moving people or goods between two locations with limited capacity vehicles.',
  },
  {
    title: 'Concurrency constraints',
    detail:
      'State constraints mirror safety requirements in concurrent systems.',
  },
  {
    title: 'Search algorithms',
    detail:
      'A tiny, complete example for teaching search and constraint pruning.',
  },
]

const pseudocode = [
  {
    title: 'Successor generation',
    code: `moves = [(2,0),(0,2),(1,0),(0,1),(1,1)]
for (m,c) in moves:
  if boat on left:
    newM = M_left - m
    newC = C_left - c
  else:
    newM = M_left + m
    newC = C_left + c
  if 0 <= newM <= 3 and 0 <= newC <= 3:
    if valid(newM, newC):
      add state (newM, newC, flippedBoat)`,
    explanation:
      'Generate successor states by applying each legal boat load and checking validity.',
  },
  {
    title: 'BFS search',
    code: `queue = [start]
visited = {start}
parent = {start: null}
while queue not empty:
  state = pop_front(queue)
  if state == goal: break
  for next in successors(state):
    if next not in visited:
      visited.add(next)
      parent[next] = state
      queue.push(next)
reconstruct path via parent`,
    explanation:
      'BFS ensures the shortest sequence of crossings.',
  },
]

const evaluationChecklist = [
  {
    title: 'State validity',
    detail:
      'Ensure every generated state respects the safety constraint.',
  },
  {
    title: 'Boat modeling',
    detail:
      'Always track which side the boat is on.',
  },
  {
    title: 'Shortest path',
    detail:
      'Use BFS if you want the minimum number of crossings.',
  },
  {
    title: 'Solution reconstruction',
    detail:
      'Store parents or actions to reconstruct the sequence of moves.',
  },
]

const keyTakeaways = [
  'The problem is a small but complete state-space search puzzle.',
  'Validity constraints prune the vast majority of naive moves.',
  'BFS finds the shortest sequence of crossings.',
  'State representation must include boat position.',
  'Variants show how constraints change solvability.',
]

export default function MissionariesAndCannibalsPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Missionaries and Cannibals</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">A classic river-crossing puzzle about safety constraints</div>
              <p className="win95-text">
                The missionaries and cannibals problem asks you to move three missionaries and three cannibals across a river with a
                two-person boat. The constraint is that missionaries can never be outnumbered by cannibals on either bank, or they are
                eaten. This turns a simple transport puzzle into a search problem with legality constraints.
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
            <legend>State Representation</legend>
            <div className="win95-grid win95-grid-2">
              {stateRepresentation.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                A valid state must respect the constraint on both banks. If a bank has zero missionaries, it is always safe regardless
                of cannibals.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Legal Moves</legend>
            <div className="win95-grid win95-grid-2">
              {moveSet.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Search Strategies</legend>
            <div className="win95-grid win95-grid-2">
              {searchStrategies.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Correctness Notes</legend>
            <div className="win95-grid win95-grid-2">
              {correctnessNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity and Scale</legend>
            <div className="win95-grid win95-grid-2">
              {complexityNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
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
            <legend>Worked Example</legend>
            <div className="win95-stack">
              {workedExample.map((example) => (
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
            <div className="win95-grid win95-grid-2">
              {realWorldConnections.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How to Evaluate an Implementation</legend>
            <div className="win95-grid win95-grid-2">
              {evaluationChecklist.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
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
