import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

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
    detail: 'Maintain a min-heap keyed by end time. The heap top is the room that frees up first.',
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
    definition: 'Always reuse the room that frees up the earliest when feasible.',
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

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

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
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Interval Partitioning',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Interval Partitioning"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Interval Partitioning</h1>
      <p>
        Greedy scheduling that minimizes rooms, machines, or resources. Interval partitioning
        assigns time intervals to the smallest number of resources so that no overlapping intervals
        share a resource. It is the backbone of meeting room allocation, classroom scheduling, and
        capacity planning. The greedy solution is simple, optimal, and easy to implement with a
        priority queue.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            <p>
              The goal is not to pick a few non-overlapping intervals, but to place every interval
              somewhere with the fewest rooms. Greedy scheduling works because the only thing that
              matters for reuse is which room frees up first.
            </p>
          </section>
          <hr className="bin98-divider" />
          <section id="bp-history" className="bin98-section">
            <h2 className="bin98-heading">Historical Context</h2>
            {historicalMilestones.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>
          <section id="bp-models" className="bin98-section">
            <h2 className="bin98-heading">Core Concept and Mental Models</h2>
            {mentalModels.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="bp-applications" className="bin98-section">
            <h2 className="bin98-heading">Real-World Applications</h2>
            {realWorldUses.map((item) => (
              <p key={item.context}>
                <strong>{item.context}:</strong> {item.detail}
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
          <section id="core-problem" className="bin98-section">
            <h2 className="bin98-heading">Problem and Greedy Rule</h2>
            {coreIdeas.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-steps" className="bin98-section">
            <h2 className="bin98-heading">Step-by-Step Process</h2>
            <ol>
              {algorithmSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>
          <section id="core-structures" className="bin98-section">
            <h2 className="bin98-heading">Data Structures Used</h2>
            {dataStructures.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-correctness" className="bin98-section">
            <h2 className="bin98-heading">Why the Greedy Choice Works</h2>
            {correctnessNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
            <p>
              The number of rooms the algorithm uses is exactly the maximum overlap seen in the
              sweep. Since no schedule can do better than the maximum overlap, the greedy strategy
              is optimal.
            </p>
          </section>
          <section id="core-complexity" className="bin98-section">
            <h2 className="bin98-heading">Complexity Analysis</h2>
            {complexityNotes.map((note) => (
              <p key={note.title}>
                <strong>{note.title}:</strong> {note.detail}
              </p>
            ))}
          </section>
          <section id="core-edge-cases" className="bin98-section">
            <h2 className="bin98-heading">Edge Cases and Conventions</h2>
            {edgeCases.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-pitfalls" className="bin98-section">
            <h2 className="bin98-heading">Common Pitfalls</h2>
            <ul>
              {pitfalls.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section id="core-variants" className="bin98-section">
            <h2 className="bin98-heading">Variants and Extensions</h2>
            {variants.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
        </>
      )}

      {activeTab === 'examples' && (
        <section id="examples-worked" className="bin98-section">
          <h2 className="bin98-heading">Worked Examples</h2>
          {examples.map((example) => (
            <div key={example.title}>
              <h3 className="bin98-subheading">{example.title}</h3>
              <div className="bin98-codebox">
                <code>{example.code}</code>
              </div>
              <p>{example.explanation}</p>
            </div>
          ))}
        </section>
      )}

      {activeTab === 'glossary' && (
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {quickGlossary.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
