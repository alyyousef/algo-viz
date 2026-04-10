import { Link } from 'react-router-dom'

import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

const historicalMilestones = [
  {
    title: 'Early scanline ideas (1950s)',
    detail:
      'Graphics researchers used scanlines to fill polygons efficiently, foreshadowing the sweep-line paradigm.',
  },
  {
    title: 'Plane sweep formalized (1970s)',
    detail:
      'Computational geometry formalized event-driven sweeps for segment intersection and closest pairs.',
  },
  {
    title: 'Bentley-Ottmann algorithm (1979)',
    detail:
      'A landmark sweep-line algorithm that reports all segment intersections in O((n + k) log n).',
  },
  {
    title: 'Visibility and arrangement algorithms (1980s)',
    detail:
      'Sweep lines became core tools for computing arrangements, visibility graphs, and motion planning.',
  },
  {
    title: 'Modern GIS and CAD pipelines (2000s-present)',
    detail:
      'Sweep-line techniques underpin polygon clipping, overlays, and large-scale spatial analytics.',
  },
]

const mentalModels = [
  {
    title: 'A vertical scanner',
    detail:
      'Imagine a vertical line moving left to right, maintaining only the active geometry it intersects.',
  },
  {
    title: 'Event queue with a moving frontier',
    detail:
      'Events update a balanced tree of active segments; the sweep line is the frontier of processed space.',
  },
  {
    title: 'Local updates, global guarantees',
    detail:
      'Because the sweep advances in order, local events are enough to maintain global correctness.',
  },
  {
    title: 'Sorting as precomputation',
    detail:
      'Sorting the event points creates a timeline; the sweep is just playing it back with updates.',
  },
  {
    title: 'Neighborhood comparisons',
    detail:
      'Many algorithms only compare neighbors in the active structure, reducing a quadratic scan to log factors.',
  },
]

const coreSteps = [
  {
    title: 'Define events',
    detail:
      'Each geometric element generates events: segment endpoints, intersections, or interval edges.',
  },
  {
    title: 'Sort events',
    detail: 'Order events by x (or y) coordinate to process from left to right (or bottom to top).',
  },
  {
    title: 'Maintain the active set',
    detail:
      'A balanced tree holds segments intersecting the sweep line, ordered by y at the sweep position.',
  },
  {
    title: 'Process each event',
    detail:
      'Insert, delete, or swap segments; check neighbors for intersections or closest candidates.',
  },
  {
    title: 'Emit results',
    detail: 'Record intersections, counts, or merged geometry as events are processed.',
  },
  {
    title: 'Advance to completion',
    detail: 'Once all events are processed, the algorithm has produced the full answer.',
  },
]

const correctnessNotes = [
  {
    title: 'Event order invariant',
    detail:
      'All events left of the sweep line have been fully handled; all right-of-line events are unprocessed.',
  },
  {
    title: 'Active set completeness',
    detail:
      'Every segment crossing the sweep line is present in the active set, and no others are.',
  },
  {
    title: 'Neighbor checks suffice',
    detail:
      'In many sweep algorithms, only adjacent segments in the active ordering can intersect next.',
  },
  {
    title: 'Monotone progress',
    detail: 'The sweep line never moves backward, so events are handled exactly once.',
  },
]

const complexityNotes = [
  {
    title: 'Time cost',
    detail:
      'Most sweep algorithms run in O((n + k) log n), where k is the number of reported events.',
  },
  {
    title: 'Space cost',
    detail: 'The active set and event queue store O(n) items in typical problems.',
  },
  {
    title: 'Output sensitivity',
    detail: 'Performance scales with the number of results (intersections, overlaps, etc.).',
  },
  {
    title: 'Precision issues',
    detail:
      'Floating point errors can reorder events; robust predicates or exact arithmetic are often required.',
  },
  {
    title: 'Degenerate cases',
    detail:
      'Overlapping, collinear, or vertical segments need explicit handling in the event logic.',
  },
  {
    title: 'Data structures matter',
    detail: 'Balanced BSTs or ordered sets are crucial for keeping insert/delete/query at log n.',
  },
]

const algorithmPatterns = [
  {
    title: 'Segment intersection',
    detail: 'Bentley-Ottmann uses endpoint and intersection events with a tree of active segments.',
  },
  {
    title: 'Rectangle union area',
    detail: 'Sweep along x, maintain active y-intervals, and compute covered length per slab.',
  },
  {
    title: 'Closest pair (1D or strip)',
    detail: 'Sweep can maintain a window of recent points by y to find near neighbors efficiently.',
  },
  {
    title: 'Polygon scanline fill',
    detail: 'Rasterize by scanning each horizontal line and filling between intersection pairs.',
  },
  {
    title: 'Point-in-polygon preprocessing',
    detail: 'Sweep builds trapezoids or monotone subdivisions for fast query responses.',
  },
  {
    title: 'Visibility and arrangements',
    detail: 'Sweep across segments to build planar subdivisions or visibility graphs.',
  },
]

const realWorldUses = [
  {
    context: 'GIS overlays',
    detail: 'Compute intersection and union of large polygon layers efficiently.',
  },
  {
    context: 'CAD and EDA',
    detail: 'Detect overlaps, clearances, and crossings in design layouts.',
  },
  {
    context: 'Graphics pipelines',
    detail: 'Scanline fills and clipping rely on sweep-style event processing.',
  },
  {
    context: 'Robotics and motion planning',
    detail: 'Compute visibility graphs and collision boundaries with sweep algorithms.',
  },
  {
    context: 'Computational geometry libraries',
    detail: 'Sweep-line implementations are core components for intersection and arrangement APIs.',
  },
  {
    context: 'Data visualization',
    detail: 'Efficiently compute crossings or overlaps in large plotted datasets.',
  },
]

const examples = [
  {
    id: 'ex-segment-intersection',
    title: 'Segment intersection sweep (pseudocode)',
    code: `function sweepIntersections(segments):
    events = []
    for s in segments:
        events.push((s.left, "start", s))
        events.push((s.right, "end", s))
    sort events by x, then type
    active = balancedTree()
    for event in events:
        if event.type == "start":
            active.insert(event.segment)
            check neighbors of event.segment for intersections
        if event.type == "end":
            check neighbors of event.segment for intersections
            active.remove(event.segment)`,
    explanation:
      'Only neighbor segments in the active set can create new intersections as the sweep progresses.',
  },
  {
    id: 'ex-rectangle-union',
    title: 'Rectangle union area',
    code: `function unionArea(rects):
    events = []
    for r in rects:
        events.push((r.x1, +1, r.y1, r.y2))
        events.push((r.x2, -1, r.y1, r.y2))
    sort events by x
    activeIntervals = multiset()
    area = 0
    prevX = events[0].x
    for e in events:
        dx = e.x - prevX
        area += dx * coveredLength(activeIntervals)
        update activeIntervals with e
        prevX = e.x
    return area`,
    explanation:
      'The sweep line partitions space into vertical slabs; active intervals determine covered y-length.',
  },
  {
    id: 'ex-event-ordering',
    title: 'Event ordering rule',
    code: `// When x is equal, handle "start" before "end" to avoid missing overlaps
sort by (x, typeOrder)`,
    explanation:
      'Consistent tie-breaking is critical to avoid off-by-one errors in overlap handling.',
  },
]

const pitfalls = [
  'Sorting events without a deterministic tie-breaker, which can miss intersections.',
  'Treating vertical segments as undefined slopes; represent them consistently.',
  'Ignoring overlapping or collinear segments, which require special handling.',
  'Using floating point for orientation tests without robustness checks.',
  'Failing to update neighbor checks after deletions in the active set.',
  'Assuming events never share coordinates in real data.',
]

const decisionGuidance = [
  'Need all segment intersections: use a sweep-line algorithm.',
  'Need polygon union area or perimeter: sweep in one axis with interval bookkeeping.',
  'Need repeated queries: build an arrangement or spatial index instead.',
  'Small n only: a brute force check may be simpler.',
  'Data is noisy: use robust predicates or integer arithmetic if possible.',
  'Streaming updates: incremental sweeps are tricky; consider batched updates.',
]

const takeaways = [
  'Sweep-line transforms 2D geometry into a sorted event stream plus a dynamic set.',
  'Balanced trees keep updates and neighbor queries in log n.',
  'Correct event ordering and robust predicates are as important as the data structure.',
  'Most sweep algorithms are output-sensitive: they scale with the number of results.',
  'The pattern generalizes to polygon fill, segment intersection, and spatial overlays.',
]

const glossaryTerms = [
  {
    term: 'Sweep line',
    definition:
      'A conceptual line that moves across the plane while events are processed in sorted order.',
  },
  {
    term: 'Event queue',
    definition:
      'The sorted list or priority queue of geometric events such as endpoints, intersections, or interval boundaries.',
  },
  {
    term: 'Active set',
    definition: 'The ordered structure containing objects currently intersected by the sweep line.',
  },
  {
    term: 'Bentley-Ottmann',
    definition:
      'A classic sweep-line algorithm for reporting all line-segment intersections efficiently.',
  },
  {
    term: 'Output-sensitive',
    definition:
      'A runtime model where cost depends partly on how many results the algorithm reports.',
  },
  {
    term: 'Tie-breaker',
    definition:
      'A secondary ordering rule used when multiple events share the same primary coordinate.',
  },
  {
    term: 'Robust predicate',
    definition:
      'A numerically stable geometric test used to avoid errors caused by floating point imprecision.',
  },
  {
    term: 'Balanced BST',
    definition:
      'A balanced binary search tree used to maintain the active ordering with logarithmic updates.',
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
    { id: 'bp-applications', label: 'Applications' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-mental-models', label: 'Mental Models' },
    { id: 'core-walkthrough', label: 'Step-by-Step' },
    { id: 'core-correctness', label: 'Correctness' },
    { id: 'core-complexity', label: 'Complexity' },
    { id: 'core-patterns', label: 'Algorithm Patterns' },
    { id: 'core-pitfalls', label: 'Pitfalls' },
    { id: 'core-when-to-use', label: 'When to Use It' },
  ],
  examples: examples.map((example) => ({
    id: example.id,
    label: example.title,
  })),
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function LineSweepPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Line Sweep',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Line Sweep"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="linesweep-help98-title">Line Sweep</h1>
      <p>
        Line sweep algorithms move a conceptual line across the plane, processing geometric events
        in order while maintaining an active data structure. This pattern turns intersection
        detection, polygon unions, and visibility problems into manageable sequences of local
        updates with global correctness.
      </p>
      <p>
        This page uses the same Win98 Help layout as the other redesigned geometry pages: text-first
        documentation, a left contents pane, top tabs, and sunken panels only for code examples.
      </p>
      <p>
        The title-bar minimize control returns to the previous page when possible, or to{' '}
        <Link to="/algoViz" className="linesweep-help98-inline-link">
          /algoViz
        </Link>{' '}
        when there is no prior history entry.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            <p>
              Sweep-line methods rely on the idea that only objects intersecting the moving line can
              affect the next event. By keeping that active set ordered, the algorithm avoids
              checking all pairs and instead inspects local neighbors.
            </p>
            <p>
              The core reduction is from two-dimensional geometry to one-dimensional event order.
              Once the events are sorted, the rest of the work becomes maintaining the current
              frontier correctly.
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
          <hr className="bin98-divider" />
          <section id="bp-applications" className="bin98-section">
            <h2 className="bin98-heading">Applications</h2>
            {realWorldUses.map((item) => (
              <p key={item.context}>
                <strong>{item.context}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
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
          <section id="core-mental-models" className="bin98-section">
            <h2 className="bin98-heading">Mental Models</h2>
            {mentalModels.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>
          <section id="core-walkthrough" className="bin98-section">
            <h2 className="bin98-heading">Step-by-Step</h2>
            <ol>
              {coreSteps.map((step) => (
                <li key={step.title}>
                  <strong>{step.title}:</strong> {step.detail}
                </li>
              ))}
            </ol>
          </section>
          <section id="core-correctness" className="bin98-section">
            <h2 className="bin98-heading">Correctness</h2>
            {correctnessNotes.map((note) => (
              <p key={note.title}>
                <strong>{note.title}:</strong> {note.detail}
              </p>
            ))}
            <p>
              The sweep line enforces a strict event order, so every update happens exactly when a
              geometric change is possible, guaranteeing that local neighbor checks capture global
              intersections.
            </p>
          </section>
          <section id="core-complexity" className="bin98-section">
            <h2 className="bin98-heading">Complexity</h2>
            {complexityNotes.map((note) => (
              <p key={note.title}>
                <strong>{note.title}:</strong> {note.detail}
              </p>
            ))}
            <p>
              Sweep-line algorithms are output-sensitive: they pay for the answers they report, not
              for every possible pair. The result is a dramatic speedup on dense input sets.
            </p>
          </section>
          <section id="core-patterns" className="bin98-section">
            <h2 className="bin98-heading">Algorithm Patterns</h2>
            {algorithmPatterns.map((item) => (
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
          <section id="core-when-to-use" className="bin98-section">
            <h2 className="bin98-heading">When to Use It</h2>
            <ol>
              {decisionGuidance.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>
        </>
      )}

      {activeTab === 'examples' && (
        <>
          {examples.map((example) => (
            <section key={example.id} id={example.id} className="bin98-section">
              <h2 className="bin98-heading">{example.title}</h2>
              <div className="bin98-codebox">
                <code>{example.code.trim()}</code>
              </div>
              <p>{example.explanation}</p>
            </section>
          ))}
        </>
      )}

      {activeTab === 'glossary' && (
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {glossaryTerms.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
