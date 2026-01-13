import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

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
    title: 'Bentley–Ottmann algorithm (1979)',
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
    detail:
      'Order events by x (or y) coordinate to process from left to right (or bottom to top).',
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
    detail:
      'Record intersections, counts, or merged geometry as events are processed.',
  },
  {
    title: 'Advance to completion',
    detail:
      'Once all events are processed, the algorithm has produced the full answer.',
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
    detail:
      'The sweep line never moves backward, so events are handled exactly once.',
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
    detail:
      'The active set and event queue store O(n) items in typical problems.',
  },
  {
    title: 'Output sensitivity',
    detail:
      'Performance scales with the number of results (intersections, overlaps, etc.).',
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
    detail:
      'Balanced BSTs or ordered sets are crucial for keeping insert/delete/query at log n.',
  },
]

const algorithmPatterns = [
  {
    title: 'Segment intersection',
    detail:
      'Bentley–Ottmann uses endpoint and intersection events with a tree of active segments.',
  },
  {
    title: 'Rectangle union area',
    detail:
      'Sweep along x, maintain active y-intervals, and compute covered length per slab.',
  },
  {
    title: 'Closest pair (1D or strip)',
    detail:
      'Sweep can maintain a window of recent points by y to find near neighbors efficiently.',
  },
  {
    title: 'Polygon scanline fill',
    detail:
      'Rasterize by scanning each horizontal line and filling between intersection pairs.',
  },
  {
    title: 'Point-in-polygon preprocessing',
    detail:
      'Sweep builds trapezoids or monotone subdivisions for fast query responses.',
  },
  {
    title: 'Visibility and arrangements',
    detail:
      'Sweep across segments to build planar subdivisions or visibility graphs.',
  },
]

const realWorldUses = [
  {
    context: 'GIS overlays',
    detail:
      'Compute intersection and union of large polygon layers efficiently.',
  },
  {
    context: 'CAD and EDA',
    detail:
      'Detect overlaps, clearances, and crossings in design layouts.',
  },
  {
    context: 'Graphics pipelines',
    detail:
      'Scanline fills and clipping rely on sweep-style event processing.',
  },
  {
    context: 'Robotics and motion planning',
    detail:
      'Compute visibility graphs and collision boundaries with sweep algorithms.',
  },
  {
    context: 'Computational geometry libraries',
    detail:
      'Sweep-line implementations are core components for intersection and arrangement APIs.',
  },
  {
    context: 'Data visualization',
    detail:
      'Efficiently compute crossings or overlaps in large plotted datasets.',
  },
]

const examples = [
  {
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

export default function LineSweepPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Line Sweep</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Event-driven geometry that converts 2D problems into ordered scans</div>
              <p className="win95-text">
                Line sweep algorithms move a conceptual line across the plane, processing geometric events in order while maintaining
                an active data structure. This pattern turns intersection detection, polygon unions, and visibility problems into
                manageable sequences of local updates with global correctness.
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
                Sweep-line methods rely on the idea that only objects intersecting the moving line can affect the next event.
                By keeping that active set ordered, the algorithm avoids checking all pairs and instead inspects local neighbors.
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
            <legend>How it works: step-by-step</legend>
            <div className="win95-grid win95-grid-3">
              {coreSteps.map((step, index) => (
                <div key={step.title} className="win95-panel">
                  <div className="win95-heading">
                    {index + 1}. {step.title}
                  </div>
                  <p className="win95-text">{step.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Why it works: correctness invariants</legend>
            <div className="win95-grid win95-grid-2">
              {correctnessNotes.map((note) => (
                <div key={note.title} className="win95-panel">
                  <div className="win95-heading">{note.title}</div>
                  <p className="win95-text">{note.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                The sweep line enforces a strict event order, so every update happens exactly when a geometric change is possible,
                guaranteeing that local neighbor checks capture global intersections.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity analysis and tradeoffs</legend>
            <div className="win95-grid win95-grid-2">
              {complexityNotes.map((note) => (
                <div key={note.title} className="win95-panel">
                  <div className="win95-heading">{note.title}</div>
                  <p className="win95-text">{note.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                Sweep-line algorithms are output-sensitive: they pay for the answers they report, not for every possible pair.
                The result is a dramatic speedup on dense input sets.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Algorithm patterns</legend>
            <div className="win95-grid win95-grid-2">
              {algorithmPatterns.map((item) => (
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
            <legend>When to use it</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                {decisionGuidance.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
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

