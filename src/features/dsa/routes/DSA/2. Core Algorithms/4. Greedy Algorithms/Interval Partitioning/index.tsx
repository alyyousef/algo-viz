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

export default function IntervalPartitioningPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Interval Partitioning</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Greedy scheduling that minimizes rooms, machines, or resources</div>
              <p className="win95-text">
                Interval partitioning assigns time intervals to the smallest number of resources so that no overlapping intervals share
                a resource. It is the backbone of meeting room allocation, classroom scheduling, and capacity planning. The greedy
                solution is simple, optimal, and easy to implement with a priority queue.
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
                The goal is not to pick a few non-overlapping intervals, but to place every interval somewhere with the fewest rooms.
                Greedy scheduling works because the only thing that matters for reuse is which room frees up first.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Historical context</legend>
            <div className="win95-grid win95-grid-2">
              {historicalMilestones.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Core concept and mental models</legend>
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
            <legend>What the algorithm does</legend>
            <div className="win95-grid win95-grid-2">
              {coreIdeas.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Step-by-step process</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                {algorithmSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Data structures used</legend>
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
            <legend>Why the greedy choice works</legend>
            <div className="win95-grid win95-grid-2">
              {correctnessNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                The number of rooms the algorithm uses is exactly the maximum overlap seen in the sweep. Since no schedule can do
                better than the maximum overlap, the greedy strategy is optimal.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity analysis</legend>
            <div className="win95-grid win95-grid-2">
              {complexityNotes.map((note) => (
                <div key={note.title} className="win95-panel">
                  <div className="win95-heading">{note.title}</div>
                  <p className="win95-text">{note.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Edge cases and conventions</legend>
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
            <legend>Real-world applications</legend>
            <div className="win95-grid win95-grid-2">
              {realWorldUses.map((item) => (
                <div key={item.context} className="win95-panel">
                  <div className="win95-heading">{item.context}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Practical examples</legend>
            <div className="win95-stack">
              {examples.map((example) => (
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
            <legend>Variants and extensions</legend>
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
