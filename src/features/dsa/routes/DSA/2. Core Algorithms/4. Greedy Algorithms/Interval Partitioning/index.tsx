import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

const historicalMilestones = [
  {
    title: 'Edge coloring view of interval graphs (1960s)',
    detail:
      'Interval partitioning can be seen as coloring the edges of an interval graph. The number of colors needed equals the maximum overlap.',
  },
  {
    title: 'Scheduling theory formalizes resources (1970s)',
    detail:
      'Operations research cast the problem as allocating identical machines to time windows, motivating fast greedy strategies.',
  },
  {
    title: 'Priority queues become standard (1980s)',
    detail:
      'Heap-based priority queues made the greedy solution practical and efficient for large schedules.',
  },
  {
    title: 'Meeting rooms popularize the pattern (2000s)',
    detail:
      'Interview questions and real scheduling apps brought interval partitioning into everyday software engineering.',
  },
]

const mentalModels = [
  {
    title: 'Rooms as reusable buckets',
    detail:
      'Each room is a bucket that can be reused once its current interval ends. Always reuse the bucket that frees up the earliest.',
  },
  {
    title: 'Timeline sweep',
    detail:
      'Sort by start time and sweep left to right. When you see a new interval, either reuse a free room or open a new one.',
  },
  {
    title: 'Peak overlap is destiny',
    detail:
      'The minimum number of rooms is the maximum number of intervals overlapping at any time. The greedy algorithm attains it.',
  },
]

const coreIdeas = [
  {
    title: 'Problem statement',
    detail:
      'Given intervals with start and end times, assign each interval to a resource so that no two overlapping intervals share a resource, while minimizing the total number of resources.',
  },
  {
    title: 'Greedy choice',
    detail:
      'Process intervals by increasing start time. Assign each interval to the room that becomes available the earliest, if possible.',
  },
  {
    title: 'Key data structure',
    detail:
      'Maintain a min-heap keyed by end time. The heap top is the room that frees up first.',
  },
  {
    title: 'Feasibility rule',
    detail:
      'If the earliest end time is less than or equal to the current start, reuse that room. Otherwise, allocate a new room.',
  },
]

const algorithmSteps = [
  'Sort intervals by start time (tie-break by end time for stability).',
  'Create an empty min-heap of rooms keyed by end time.',
  'For each interval: if the heap top ends before the interval starts, reuse that room and update its end; else create a new room.',
  'Track the maximum heap size; this is the minimum number of rooms required.',
  'Store assignments if you need a concrete schedule, not just the count.',
]

const dataStructures = [
  {
    title: 'Min-heap of end times',
    detail:
      'Each heap entry stores (endTime, roomId). Peek tells you the soonest room to free. Pop when reuse is possible, then push with new end.',
  },
  {
    title: 'Sorted interval list',
    detail:
      'Sorting by start time ensures the greedy choice is safe. Tie-break by end time to keep ordering deterministic.',
  },
  {
    title: 'Room assignment array',
    detail:
      'Optional array to map interval index to roomId. This lets you reconstruct the full schedule.',
  },
  {
    title: 'Free list optimization',
    detail:
      'If you do not need ordering by end time, you could keep an unordered list of free rooms, but the greedy proof relies on earliest end.',
  },
]

const correctnessNotes = [
  {
    title: 'Invariant',
    detail:
      'After processing the first k intervals, the heap contains exactly the set of rooms currently in use, each keyed by its end time.',
  },
  {
    title: 'Greedy choice property',
    detail:
      'Reusing the room with the smallest end time never blocks a feasible schedule because any other room ends later and is less flexible.',
  },
  {
    title: 'Optimality via overlap',
    detail:
      'At any time t, the number of rooms used is at least the number of overlapping intervals. The algorithm uses exactly that many at the peaks.',
  },
  {
    title: 'Exchange argument',
    detail:
      'If an optimal schedule assigns the current interval to a room that ends later than the earliest end, swapping assignments keeps feasibility without increasing rooms.',
  },
]

const complexityNotes = [
  {
    title: 'Time complexity',
    detail:
      'Sorting dominates at O(n log n). Each interval performs one heap pop and push in O(log n). Total O(n log n).',
  },
  {
    title: 'Space complexity',
    detail:
      'The heap stores at most the number of rooms, which is at most n. So O(n) space in the worst case.',
  },
  {
    title: 'Lower bound',
    detail:
      'Any algorithm must inspect interval ordering. Sorting or equivalent ordering is necessary to be optimal in general.',
  },
  {
    title: 'Practical performance',
    detail:
      'Heap operations are fast and cache-friendly. In real schedules, the maximum overlap is usually far smaller than n.',
  },
]

const edgeCases = [
  {
    title: 'Touching endpoints',
    detail:
      'Decide whether an interval ending at time t can share a room with one starting at time t. Most models allow reuse with end <= start.',
  },
  {
    title: 'Zero-length intervals',
    detail:
      'Intervals with start == end behave like instantaneous events. They can reuse rooms depending on your endpoint rule.',
  },
  {
    title: 'Unsorted input',
    detail:
      'Sorting is required; otherwise the greedy choice can fail. Always sort by start time first.',
  },
  {
    title: 'Ties in start times',
    detail:
      'Breaking ties by earlier end helps keep assignments stable and avoids extra rooms in edge cases.',
  },
]

const realWorldUses = [
  {
    context: 'Meeting rooms',
    detail:
      'Assign meetings to rooms while minimizing the total number of rooms required for the day.',
  },
  {
    context: 'Class scheduling',
    detail:
      'Allocate classes to classrooms or exam sessions to proctors, ensuring overlaps do not conflict.',
  },
  {
    context: 'Cloud resource windows',
    detail:
      'Schedule compute jobs with fixed start and end times onto virtual machines to reduce VM count.',
  },
  {
    context: 'Runway usage',
    detail:
      'Assign takeoff/landing slots to runways or gates where overlapping windows cannot share a resource.',
  },
  {
    context: 'Operating rooms',
    detail:
      'Plan surgeries and equipment usage to minimize the number of rooms or staff teams needed.',
  },
]

const examples = [
  {
    title: 'Meeting room assignment',
    code: `Intervals (start, end):
A: (9, 10)
B: (9.5, 11)
C: (10, 10.5)
D: (11, 12)

Sorted by start: A, B, C, D
Heap tracks end times.

Assign A -> Room 1 (end 10)
Assign B -> Room 2 (end 11) because 10 > 9.5
Assign C -> Room 1 (end 10.5) because 10 <= 10
Assign D -> Room 1 (end 12) because 10.5 <= 11`,
    explanation:
      'Peak overlap is 2, so the minimum rooms is 2. The heap always reuses the earliest ending room.',
  },
  {
    title: 'Classroom count only',
    code: `Intervals:
(1, 4), (2, 3), (3, 5), (7, 9)

Peak overlap is 2 during time 2-3.
Algorithm heap sizes by step:
start 1 -> size 1
start 2 -> size 2
start 3 -> reuse one (size 2)
start 7 -> reuse one (size 1)`,
    explanation:
      'Even without storing room IDs, the maximum heap size yields the minimum classroom count.',
  },
  {
    title: 'Greedy pseudocode',
    code: `function minRooms(intervals):
    sort intervals by start, then end
    heap = empty min-heap of (endTime, roomId)
    nextRoomId = 1
    maxRooms = 0

    for interval in intervals:
        if heap not empty and heap.min.endTime <= interval.start:
            room = heap.pop()
        else:
            room = (endTime: 0, roomId: nextRoomId)
            nextRoomId += 1

        room.endTime = interval.end
        heap.push(room)
        assign interval -> room.roomId
        maxRooms = max(maxRooms, heap.size)

    return maxRooms`,
    explanation:
      'The heap guarantees the greedy choice: use the earliest finishing room if possible, otherwise add a new one.',
  },
]

const pitfalls = [
  'Forgetting to sort by start time. The greedy proof relies on processing intervals in order.',
  'Using a max-heap or unsorted list for end times, which can incorrectly allocate rooms.',
  'Handling endpoints inconsistently. Decide whether end == start is overlapping and apply it everywhere.',
  'Dropping room IDs when you need assignments. The heap should carry both end time and room identifier.',
  'Confusing interval partitioning with interval scheduling. Scheduling maximizes non-overlapping intervals; partitioning minimizes rooms.',
]

const variants = [
  {
    title: 'Open vs closed intervals',
    detail:
      'Model intervals as [start, end) or [start, end]. This changes whether an interval ending at t conflicts with one starting at t.',
  },
  {
    title: 'Weighted resources',
    detail:
      'If rooms have costs or capacities, the greedy approach can fail. This becomes a different optimization problem.',
  },
  {
    title: 'Online scheduling',
    detail:
      'If intervals arrive in real time, the same heap rule can be used, but the solution may not be optimal without future knowledge.',
  },
  {
    title: 'Multiple constraints',
    detail:
      'Add constraints like room features or instructor availability and the problem becomes a bipartite matching or ILP.',
  },
]

const takeaways = [
  'Interval partitioning finds the minimum number of resources needed to host all intervals without conflict.',
  'Sorting by start time plus a min-heap of end times yields an optimal greedy algorithm.',
  'The maximum heap size equals the maximum overlap and is the minimum number of rooms.',
  'Careful endpoint conventions and tie-breaking are essential for correctness in edge cases.',
]

const quickGlossary = [
  {
    term: 'Interval partitioning',
    definition:
      'Assign every interval to a resource so overlapping intervals never share a resource, while minimizing resources.',
  },
  {
    term: 'Maximum overlap',
    definition:
      'The largest number of intervals active at the same time; this equals the minimum resources needed.',
  },
  {
    term: 'Greedy choice',
    definition:
      'Always reuse the room that frees up the earliest when feasible.',
  },
  {
    term: 'Min-heap',
    definition:
      'Priority queue keyed by end time so the earliest available room is found in O(1) peek and O(log n) update.',
  },
  {
    term: 'Exchange argument',
    definition:
      'Proof method showing any optimal solution can be transformed to match the greedy choice without worsening cost.',
  },
  {
    term: 'Endpoint convention',
    definition:
      'Rule deciding whether end == start conflicts; commonly reuse is allowed when end <= start.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const intervalHelpStyles = `
.ip-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.ip-window {
  width: 100%;
  min-height: 100dvh;
  margin: 0;
  display: flex;
  flex-direction: column;
  background: #c0c0c0;
  box-sizing: border-box;
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
}

.ip-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.ip-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
}

.ip-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.ip-control {
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
}

.ip-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.ip-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.ip-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.ip-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.ip-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.ip-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.ip-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.ip-toc-list li {
  margin: 0 0 8px;
}

.ip-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.ip-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.ip-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.ip-section {
  margin: 0 0 20px;
}

.ip-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.ip-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.ip-content p,
.ip-content li {
  font-size: 12px;
  line-height: 1.5;
}

.ip-content p {
  margin: 0 0 10px;
}

.ip-content ul,
.ip-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.ip-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.ip-codebox {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 8px;
  margin: 6px 0 10px;
}

.ip-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .ip-main {
    grid-template-columns: 1fr;
  }

  .ip-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
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
    { id: 'bp-models', label: 'Mental Models' },
    { id: 'bp-applications', label: 'Real-World Applications' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-problem', label: 'Problem and Greedy Rule' },
    { id: 'core-steps', label: 'Step-by-Step Process' },
    { id: 'core-structures', label: 'Data Structures Used' },
    { id: 'core-correctness', label: 'Why Greedy Works' },
    { id: 'core-complexity', label: 'Complexity Analysis' },
    { id: 'core-edge-cases', label: 'Edge Cases' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-variants', label: 'Variants and Extensions' },
  ],
  examples: [{ id: 'examples-worked', label: 'Worked Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function IntervalPartitioningPage(): JSX.Element {
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
    document.title = `Interval Partitioning (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Interval Partitioning',
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
    <div className="ip-help-page">
      <style>{intervalHelpStyles}</style>
      <div className="ip-window" role="presentation">
        <header className="ip-titlebar">
          <span className="ip-title">Interval Partitioning</span>
          <div className="ip-controls">
            <button className="ip-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="ip-control" aria-label="Close">X</Link>
          </div>
        </header>
        <div className="ip-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`ip-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="ip-main">
          <aside className="ip-toc" aria-label="Table of contents">
            <h2 className="ip-toc-title">Contents</h2>
            <ul className="ip-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="ip-content">
            <h1 className="ip-doc-title">Interval Partitioning</h1>
            <p>
              Greedy scheduling that minimizes rooms, machines, or resources. Interval partitioning assigns time intervals to the
              smallest number of resources so that no overlapping intervals share a resource. It is the backbone of meeting room
              allocation, classroom scheduling, and capacity planning. The greedy solution is simple, optimal, and easy to implement
              with a priority queue.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="ip-section">
                  <h2 className="ip-heading">Overview</h2>
                  <p>
                    The goal is not to pick a few non-overlapping intervals, but to place every interval somewhere with the fewest
                    rooms. Greedy scheduling works because the only thing that matters for reuse is which room frees up first.
                  </p>
                </section>
                <hr className="ip-divider" />
                <section id="bp-history" className="ip-section">
                  <h2 className="ip-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <div key={item.title}>
                      <h3 className="ip-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>
                <section id="bp-models" className="ip-section">
                  <h2 className="ip-heading">Core Concept and Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-applications" className="ip-section">
                  <h2 className="ip-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-takeaways" className="ip-section">
                  <h2 className="ip-heading">Key Takeaways</h2>
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
                <section id="core-problem" className="ip-section">
                  <h2 className="ip-heading">Problem and Greedy Rule</h2>
                  {coreIdeas.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-steps" className="ip-section">
                  <h2 className="ip-heading">Step-by-Step Process</h2>
                  <ol>
                    {algorithmSteps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </section>
                <section id="core-structures" className="ip-section">
                  <h2 className="ip-heading">Data Structures Used</h2>
                  {dataStructures.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-correctness" className="ip-section">
                  <h2 className="ip-heading">Why the Greedy Choice Works</h2>
                  {correctnessNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    The number of rooms the algorithm uses is exactly the maximum overlap seen in the sweep. Since no schedule can do
                    better than the maximum overlap, the greedy strategy is optimal.
                  </p>
                </section>
                <section id="core-complexity" className="ip-section">
                  <h2 className="ip-heading">Complexity Analysis</h2>
                  {complexityNotes.map((note) => (
                    <p key={note.title}>
                      <strong>{note.title}:</strong> {note.detail}
                    </p>
                  ))}
                </section>
                <section id="core-edge-cases" className="ip-section">
                  <h2 className="ip-heading">Edge Cases and Conventions</h2>
                  {edgeCases.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="ip-section">
                  <h2 className="ip-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-variants" className="ip-section">
                  <h2 className="ip-heading">Variants and Extensions</h2>
                  {variants.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <section id="examples-worked" className="ip-section">
                <h2 className="ip-heading">Worked Examples</h2>
                {examples.map((example) => (
                  <div key={example.title}>
                    <h3 className="ip-subheading">{example.title}</h3>
                    <div className="ip-codebox">
                      <code>{example.code}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </div>
                ))}
              </section>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="ip-section">
                <h2 className="ip-heading">Glossary</h2>
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

