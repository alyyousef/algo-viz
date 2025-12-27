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

const bigPicture = [
  {
    title: 'Geometry as predicates and robustness',
    detail:
      'Most geometry reduces to reliable orientation, intersection, and distance tests. If your predicates wobble, everything on top breaks.',
    note: 'Prevents silent misclassification when coordinates are nearly collinear.',
  },
  {
    title: 'From quadratic to log-linear via structure',
    detail:
      'Sweep lines, spatial indexes, and hulls turn all-pairs scans into O((n + k) log n) passes with clear correctness proofs.',
    note: 'Keeps collision and intersection tasks tractable at scale.',
  },
  {
    title: 'Exact vs floating math',
    detail:
      'Integers and rationals give exact predicates; floats give speed but need epsilons and consistent comparisons.',
    note: 'Avoids disagreement between machines or compilers.',
  },
  {
    title: 'Dimension-aware thinking',
    detail:
      '2D techniques inspire 3D, but degeneracies explode. Choose algorithms and tolerances that match the dimension and data scale.',
    note: 'Prevents naive lifts of 2D logic into unstable 3D code.',
  },
]

const history = [
  { title: '1979: Graham scan', detail: 'One of the first practical convex hull algorithms; popularized angle sorting.' },
  { title: '1983-1986: Divide-and-conquer hulls (Preparata-Shamos)', detail: 'Showed n log n lower bounds and efficient hull merges.' },
  { title: '1986: Bentley-Ottmann sweep', detail: 'Sweep-line framework for segment intersections in O((n + k) log n).' },
  { title: '1990s: Rotating calipers', detail: 'Geared hull post-processing for widths, diameters, and antipodal pairs.' },
  { title: '2000s: Robust predicates (Shewchuk)', detail: 'Adaptive precision techniques stabilized orientation and incircle tests.' },
  { title: '2010s+: CGAL/GEOS standardization', detail: 'Robust libraries set defaults for predicates and tolerance handling.' },
]

const pillars = [
  {
    title: 'Robust orientation and incircle',
    detail:
      'These predicates power intersections, Delaunay, and hulls. Implement once with exact or adaptive arithmetic.',
  },
  {
    title: 'Consistent epsilon policy',
    detail: 'Pick one tolerance for equality and ordering under floats; centralize it to avoid contradictory decisions.',
  },
  {
    title: 'Canonical ordering',
    detail:
      'Sort points deterministically (lexicographic, then polar) so hulls and sweeps behave the same across runs and platforms.',
  },
  {
    title: 'Bounding-volume prefilters',
    detail:
      'Use AABBs or grids to cull obvious non-interactions before expensive predicates; crucial in collision and GIS workloads.',
  },
  {
    title: 'Degeneracy handling',
    detail:
      'Collinear points, overlapping segments, and duplicate coordinates must be treated explicitly to avoid missing intersections.',
  },
]

const mentalModels = [
  {
    title: 'Sweep as event choreography',
    detail:
      'Events enter/leave an ordered structure as you sweep a line; intersections become predictable neighbor swaps.',
  },
  {
    title: 'Hull as rubber band',
    detail:
      'Imagine stretching a band around nails; only extreme points remain. Antipodal pairs are where the band touches opposite sides.',
  },
  {
    title: 'Spatial indexes as phone books',
    detail:
      'Divide space into pages (cells/nodes); you only open nearby pages when searching neighbors, not the whole book.',
  },
  {
    title: 'Precision as budgeted trust',
    detail:
      'Exact predicates are expensive but trustworthy; floats are cheap but need skepticism. Spend precision where mistakes are costly.',
  },
]

const howItWorks = [
  {
    step: '1. Normalize input',
    detail:
      'Deduplicate points, enforce consistent units, and, if floating, clamp to a defined epsilon policy.',
  },
  {
    step: '2. Implement core predicates',
    detail:
      'Orientation, on-segment, and segment-segment intersection with optional adaptive precision; centralize in one module.',
  },
  {
    step: '3. Add prefilters',
    detail:
      'Axis-aligned bounding boxes or hash grids filter pairs before precise checks, reducing predicate calls dramatically.',
  },
  {
    step: '4. Choose the pattern',
    detail:
      'Sweep for intersections/closest pair, hull + calipers for extremes, spatial trees for k-NN or range queries.',
  },
  {
    step: '5. Handle degeneracies',
    detail:
      'Explicitly define behavior for collinear points on edges, overlapping segments, and duplicate coordinates.',
  },
  {
    step: '6. Validate with adversarial sets',
    detail:
      'Test grids, near-collinear clouds, and large coordinates to ensure predicates and ordering stay consistent.',
  },
]

const complexityTable = [
  { approach: 'Orientation / intersection check', time: 'O(1)', space: 'O(1)', note: 'Assumes constant-time arithmetic.' },
  { approach: 'Graham scan / monotone hull', time: 'O(n log n)', space: 'O(n)', note: 'Lower bound for sorting-based hulls.' },
  { approach: 'Bentley-Ottmann sweep (k intersections)', time: 'O((n + k) log n)', space: 'O(n + k)', note: 'Event queue + balanced tree.' },
  { approach: 'Closest pair (divide-and-conquer)', time: 'O(n log n)', space: 'O(n)', note: 'Strip merge reduces to linear within each level.' },
  { approach: 'Delaunay via incremental flipping', time: 'O(n^2) worst, O(n log n) expected', space: 'O(n)', note: 'Robust incircle predicate required.' },
  { approach: 'Spatial grid neighbor lookup', time: 'O(1) avg', space: 'O(n)', note: 'Depends on uniform distribution and cell sizing.' },
]

const applications = [
  {
    title: 'Collision and physics engines',
    detail:
      'Broad-phase grids/trees prune pairs; narrow-phase uses robust intersection and penetration depth. Determinism matters for replays.',
  },
  {
    title: 'GIS and mapping',
    detail:
      'Segment intersection, point-in-polygon, and buffering rely on consistent predicates; spatial indexes keep queries responsive.',
  },
  {
    title: 'Robotics and path planning',
    detail:
      'Visibility graphs, Minkowski sums, and configuration-space checks depend on stable orientation and distance calculations.',
  },
  {
    title: 'Graphics and mesh processing',
    detail:
      'Delaunay triangulation, mesh simplification, and collision culling need exactness to avoid cracks and self-intersections.',
  },
  {
    title: 'Computational design/EDA',
    detail:
      'Layout, routing, and spacing checks use sweeplines and geometry predicates to catch violations in chips or CAD models.',
  },
]

const failureCallout = {
  title: 'Failure story: disappearing intersections',
  detail:
    'A sweepline used float orientation without epsilon unification. Near-collinear roads produced inconsistent ordering, skipping intersections in some runs. Fix: centralized robust predicates (adaptive or integer), consistent epsilon, and tie-breaking in the event queue.',
}

const pitfalls = [
  'Mixing float comparisons with inconsistent epsilons yields non-deterministic hulls and sweeps.',
  'Assuming general position; collinear or overlapping segments can break intersection logic and hull construction.',
  'Skipping bounding-box checks leads to quadratic predicate calls in dense scenes.',
  'Using unstable sorting keys (angle alone) without secondary lexicographic order causes hull self-crossing.',
  'Scaling coordinates without adjusting epsilon causes false positives/negatives in predicates.',
]

const whenToUse = [
  'Use monotone chain hull when you need a stable convex hull with predictable ties.',
  'Use sweep line for segment intersections or closest pair when n is large and you need k outputs.',
  'Use rotating calipers after hull when you need diameter, width, or antipodal pairs.',
  'Use uniform grids for broad-phase collision on roughly uniform data; use trees (k-d/R-tree) for skewed distributions.',
  'Use exact predicates (bigint/rational) when correctness trumps speed, such as triangulation and CAD.',
]

const advanced = [
  {
    title: 'Adaptive precision predicates',
    detail: 'Shewchuk-style expansions compute orientation/incircle exactly only when floats are ambiguous.',
  },
  {
    title: 'Fraction-free determinants',
    detail: 'Avoids intermediate fractions in 3D orientation; reduces overflow risk with integer inputs.',
  },
  {
    title: 'Minkowski sums and configuration space',
    detail: 'Transforms collision checks into point-in-polygon on expanded obstacles for robot/path planning.',
  },
  {
    title: 'Voronoi/Delaunay duality',
    detail: 'Switch between triangulation and Voronoi diagrams to answer proximity and region queries efficiently.',
  },
  {
    title: 'Line sweep with fractional cascading',
    detail: 'Speeds repeated segment set queries by reusing search results across event levels.',
  },
]

const codeExamples = [
  {
    title: 'Orientation with epsilon guard',
    code: `type Point = { x: number; y: number }

function orient(a: Point, b: Point, c: Point, eps = 1e-9) {
  const cross = (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x)
  if (cross > eps) return 1 // counter-clockwise
  if (cross < -eps) return -1 // clockwise
  return 0 // collinear
}`,
    explanation:
      'Centralized orientation with a consistent epsilon. Replace with exact arithmetic when integer coordinates allow.',
  },
  {
    title: 'Segment intersection using orientation',
    code: `function onSegment(a: Point, b: Point, p: Point) {
  return Math.min(a.x, b.x) <= p.x && p.x <= Math.max(a.x, b.x) &&
         Math.min(a.y, b.y) <= p.y && p.y <= Math.max(a.y, b.y)
}

function segmentsIntersect(p1: Point, q1: Point, p2: Point, q2: Point, eps = 1e-9) {
  const o1 = orient(p1, q1, p2, eps)
  const o2 = orient(p1, q1, q2, eps)
  const o3 = orient(p2, q2, p1, eps)
  const o4 = orient(p2, q2, q1, eps)

  if (o1 !== o2 && o3 !== o4) return true // proper intersection
  if (o1 === 0 && onSegment(p1, q1, p2)) return true
  if (o2 === 0 && onSegment(p1, q1, q2)) return true
  if (o3 === 0 && onSegment(p2, q2, p1)) return true
  if (o4 === 0 && onSegment(p2, q2, q1)) return true
  return false
}`,
    explanation:
      'Uses orientation with collinearity checks to capture overlapping cases. Bounding box tests can prefilter calls for speed.',
  },
]

const keyTakeaways = [
  'Centralize robust predicates; everything else depends on them.',
  'Cull early with bounding volumes before precise checks.',
  'Be explicit about epsilon policy or use exact arithmetic to avoid nondeterminism.',
  'Test degeneracies and near-collinearity; do not assume general position.',
  'Reuse hulls and sweeps with rotating calipers and event structures to solve many tasks quickly.',
]

export default function ComputationalGeometryPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Computational Geometry</span>
          <div className="win95-title-controls">
            <button className="win95-control" aria-label="Close window">
              X
            </button>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Robust spatial reasoning</div>
              <p className="win95-text">
                Reliable predicates, disciplined tolerances, and sweep or hull patterns turn spatial problems into predictable
                computations. Robustness beats elegance when coordinates get messy.
              </p>
            </div>
            <Link to="/algoViz" className="win95-button" role="button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-fieldset">
            <legend>Big picture</legend>
            <div className="win95-grid win95-grid-2">
              {bigPicture.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                  <p className="win95-text">{item.note}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>History</legend>
            <div className="win95-grid win95-grid-2">
              {history.map((event) => (
                <div key={event.title} className="win95-panel">
                  <div className="win95-heading">{event.title}</div>
                  <p className="win95-text">{event.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Core pillars and mental hooks</legend>
            <div className="win95-row">
              <div className="win95-stack">
                {pillars.map((pillar) => (
                  <div key={pillar.title} className="win95-panel">
                    <div className="win95-heading">{pillar.title}</div>
                    <p className="win95-text">{pillar.detail}</p>
                  </div>
                ))}
              </div>
              <div className="win95-stack">
                {mentalModels.map((model) => (
                  <div key={model.title} className="win95-panel">
                    <div className="win95-heading">{model.title}</div>
                    <p className="win95-text">{model.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works</legend>
            <div className="win95-grid win95-grid-2">
              {howItWorks.map((item) => (
                <div key={item.step} className="win95-panel">
                  <div className="win95-heading">{item.step}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity reference</legend>
            <div className="win95-panel">
              <table className="win95-table">
                <thead>
                  <tr>
                    <th>Approach</th>
                    <th>Time</th>
                    <th>Space</th>
                    <th>Note</th>
                  </tr>
                </thead>
                <tbody>
                  {complexityTable.map((row) => (
                    <tr key={row.approach}>
                      <td>{row.approach}</td>
                      <td>{row.time}</td>
                      <td>{row.space}</td>
                      <td>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
            <div className="win95-panel win95-panel--raised">
              <div className="win95-heading">{failureCallout.title}</div>
              <p className="win95-text">{failureCallout.detail}</p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Pitfalls</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {pitfalls.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>When to use what</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                {whenToUse.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Advanced moves</legend>
            <div className="win95-grid win95-grid-2">
              {advanced.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Code examples</legend>
            <div className="win95-stack">
              {codeExamples.map((example) => (
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
            <legend>Key takeaways</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {keyTakeaways.map((item) => (
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
