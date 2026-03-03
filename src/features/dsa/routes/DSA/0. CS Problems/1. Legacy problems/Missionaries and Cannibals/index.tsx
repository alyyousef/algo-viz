import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

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

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const mission98Styles = `
.mission98-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.mission98-window {
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background: #c0c0c0;
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
}

.mission98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.mission98-titletext {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.mission98-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.mission98-control {
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
  font-family: inherit;
  font-size: 11px;
  line-height: 1;
  cursor: pointer;
}

.mission98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
  overflow-x: auto;
}

.mission98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  font-family: inherit;
  white-space: nowrap;
  cursor: pointer;
}

.mission98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.mission98-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 236px 1fr;
  border-top: 1px solid #404040;
  background: #fff;
}

.mission98-toc {
  padding: 12px;
  overflow: auto;
  background: #f2f2f2;
  border-right: 1px solid #808080;
}

.mission98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.mission98-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.mission98-toc-list li {
  margin: 0 0 8px;
}

.mission98-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.mission98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.mission98-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.mission98-section {
  margin: 0 0 20px;
}

.mission98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.mission98-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.mission98-content p,
.mission98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.mission98-content p {
  margin: 0 0 10px;
}

.mission98-content ul,
.mission98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.mission98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.mission98-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.mission98-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .mission98-main {
    grid-template-columns: 1fr;
  }

  .mission98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 560px) {
  .mission98-titletext {
    font-size: 14px;
  }

  .mission98-content {
    padding: 12px 14px 16px;
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
    { id: 'bp-history', label: 'Historical Context' },
    { id: 'bp-setup', label: 'Problem Setup' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-state', label: 'State Representation' },
    { id: 'core-moves', label: 'Legal Moves' },
    { id: 'core-search', label: 'Search Strategies' },
    { id: 'core-correctness', label: 'Correctness Notes' },
    { id: 'core-complexity', label: 'Complexity and Scale' },
    { id: 'core-variants', label: 'Variants' },
    { id: 'core-real-world', label: 'Real-World Connections' },
    { id: 'core-evaluate', label: 'Evaluation Checklist' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
  ],
  examples: [
    { id: 'ex-worked', label: 'Worked Example' },
    { id: 'ex-pseudocode', label: 'Pseudocode Reference' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function MissionariesAndCannibalsPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    const tab = searchParams.get('tab')
    return isTabId(tab) ? tab : 'big-picture'
  })
  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Missionaries and Cannibals (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Missionaries and Cannibals',
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
    <div className="mission98-page">
      <style>{mission98Styles}</style>
      <div className="mission98-window" role="presentation">
        <header className="mission98-titlebar">
          <span className="mission98-titletext">Missionaries and Cannibals</span>
          <div className="mission98-controls">
            <button className="mission98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="mission98-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>
        <div className="mission98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`mission98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="mission98-main">
          <aside className="mission98-toc" aria-label="Table of contents">
            <h2 className="mission98-toc-title">Contents</h2>
            <ul className="mission98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="mission98-content">
            <h1 className="mission98-doc-title">Missionaries and Cannibals</h1>
            <p>
              The missionaries and cannibals problem asks you to move three missionaries and three cannibals across a river with a
              two-person boat. The constraint is that missionaries can never be outnumbered by cannibals on either bank, or they are
              eaten. This turns a simple transport puzzle into a search problem with legality constraints.
            </p>
            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="mission98-section">
                  <h2 className="mission98-heading">Overview</h2>
                  {bigPicture.map((item) => (
                    <div key={item.title}>
                      <h3 className="mission98-subheading">{item.title}</h3>
                      <p>{item.details}</p>
                      <p>{item.notes}</p>
                    </div>
                  ))}
                </section>
                <hr className="mission98-divider" />
                <section id="bp-history" className="mission98-section">
                  <h2 className="mission98-heading">Historical Context</h2>
                  {historicalContext.map((item) => (
                    <div key={item.title}>
                      <h3 className="mission98-subheading">{item.title}</h3>
                      <p>{item.details}</p>
                      <p>{item.notes}</p>
                    </div>
                  ))}
                </section>
                <hr className="mission98-divider" />
                <section id="bp-setup" className="mission98-section">
                  <h2 className="mission98-heading">Problem Setup</h2>
                  {problemSetup.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <hr className="mission98-divider" />
                <section id="bp-takeaways" className="mission98-section">
                  <h2 className="mission98-heading">Key Takeaways</h2>
                  <ul>
                    {keyTakeaways.map((takeaway) => (
                      <li key={takeaway}>{takeaway}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                <section id="core-state" className="mission98-section">
                  <h2 className="mission98-heading">State Representation</h2>
                  {stateRepresentation.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    A valid state must respect the constraint on both banks. If a bank has zero missionaries, it is always safe
                    regardless of cannibals.
                  </p>
                </section>
                <section id="core-moves" className="mission98-section">
                  <h2 className="mission98-heading">Legal Moves</h2>
                  {moveSet.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-search" className="mission98-section">
                  <h2 className="mission98-heading">Search Strategies</h2>
                  {searchStrategies.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-correctness" className="mission98-section">
                  <h2 className="mission98-heading">Correctness Notes</h2>
                  {correctnessNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-complexity" className="mission98-section">
                  <h2 className="mission98-heading">Complexity and Scale</h2>
                  {complexityNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-variants" className="mission98-section">
                  <h2 className="mission98-heading">Variants</h2>
                  {variants.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-real-world" className="mission98-section">
                  <h2 className="mission98-heading">Real-World Connections</h2>
                  {realWorldConnections.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-evaluate" className="mission98-section">
                  <h2 className="mission98-heading">How to Evaluate an Implementation</h2>
                  {evaluationChecklist.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="mission98-section">
                  <h2 className="mission98-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((pitfall) => (
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
                <section id="ex-worked" className="mission98-section">
                  <h2 className="mission98-heading">Worked Example</h2>
                  {workedExample.map((example) => (
                    <div key={example.title}>
                      <h3 className="mission98-subheading">{example.title}</h3>
                      <div className="mission98-codebox">
                        <code>{example.code.trim()}</code>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>
                <section id="ex-pseudocode" className="mission98-section">
                  <h2 className="mission98-heading">Pseudocode Reference</h2>
                  {pseudocode.map((example) => (
                    <div key={example.title}>
                      <h3 className="mission98-subheading">{example.title}</h3>
                      <div className="mission98-codebox">
                        <code>{example.code.trim()}</code>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="mission98-section">
                <h2 className="mission98-heading">Glossary</h2>
                {quickGlossary.map((item) => (
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
