import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

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
  {
    title: '1979: Graham scan',
    detail: 'One of the first practical convex hull algorithms; popularized angle sorting.',
  },
  {
    title: '1983-1986: Divide-and-conquer hulls (Preparata-Shamos)',
    detail: 'Showed n log n lower bounds and efficient hull merges.',
  },
  {
    title: '1986: Bentley-Ottmann sweep',
    detail: 'Sweep-line framework for segment intersections in O((n + k) log n).',
  },
  {
    title: '1990s: Rotating calipers',
    detail: 'Geared hull post-processing for widths, diameters, and antipodal pairs.',
  },
  {
    title: '2000s: Robust predicates (Shewchuk)',
    detail: 'Adaptive precision techniques stabilized orientation and incircle tests.',
  },
  {
    title: '2010s+: CGAL/GEOS standardization',
    detail: 'Robust libraries set defaults for predicates and tolerance handling.',
  },
]

const pillars = [
  {
    title: 'Robust orientation and incircle',
    detail:
      'These predicates power intersections, Delaunay, and hulls. Implement once with exact or adaptive arithmetic.',
  },
  {
    title: 'Consistent epsilon policy',
    detail:
      'Pick one tolerance for equality and ordering under floats; centralize it to avoid contradictory decisions.',
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
  {
    approach: 'Orientation / intersection check',
    time: 'O(1)',
    space: 'O(1)',
    note: 'Assumes constant-time arithmetic.',
  },
  {
    approach: 'Graham scan / monotone hull',
    time: 'O(n log n)',
    space: 'O(n)',
    note: 'Lower bound for sorting-based hulls.',
  },
  {
    approach: 'Bentley-Ottmann sweep (k intersections)',
    time: 'O((n + k) log n)',
    space: 'O(n + k)',
    note: 'Event queue + balanced tree.',
  },
  {
    approach: 'Closest pair (divide-and-conquer)',
    time: 'O(n log n)',
    space: 'O(n)',
    note: 'Strip merge reduces to linear within each level.',
  },
  {
    approach: 'Delaunay via incremental flipping',
    time: 'O(n^2) worst, O(n log n) expected',
    space: 'O(n)',
    note: 'Robust incircle predicate required.',
  },
  {
    approach: 'Spatial grid neighbor lookup',
    time: 'O(1) avg',
    space: 'O(n)',
    note: 'Depends on uniform distribution and cell sizing.',
  },
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
    detail:
      'Shewchuk-style expansions compute orientation/incircle exactly only when floats are ambiguous.',
  },
  {
    title: 'Fraction-free determinants',
    detail:
      'Avoids intermediate fractions in 3D orientation; reduces overflow risk with integer inputs.',
  },
  {
    title: 'Minkowski sums and configuration space',
    detail:
      'Transforms collision checks into point-in-polygon on expanded obstacles for robot/path planning.',
  },
  {
    title: 'Voronoi/Delaunay duality',
    detail:
      'Switch between triangulation and Voronoi diagrams to answer proximity and region queries efficiently.',
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

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'takeaways'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'takeaways', label: 'Takeaways' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'overview', label: 'Overview' },
    { id: 'big-picture', label: 'Big picture' },
    { id: 'history', label: 'History' },
    { id: 'applications', label: 'Applications' },
  ],
  'core-concepts': [
    { id: 'core-pillars-and-mental-hooks', label: 'Core pillars and mental hooks' },
    { id: 'how-it-works', label: 'How it works' },
    { id: 'complexity-reference', label: 'Complexity reference' },
    { id: 'advanced-moves', label: 'Advanced moves' },
  ],
  examples: [
    { id: 'failure-mode', label: 'Failure mode' },
    { id: 'code-examples', label: 'Code examples' },
  ],
  takeaways: [
    { id: 'pitfalls', label: 'Pitfalls' },
    { id: 'when-to-use-what', label: 'When to use what' },
    { id: 'key-takeaways', label: 'Key takeaways' },
  ],
}

export default function ComputationalGeometryPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Computational Geometry',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Computational Geometry"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Computational Geometry</h1>
      <p className="bin98-doc-subtitle">Robust spatial reasoning.</p>

      {activeTab === 'big-picture' && (
        <>
          <section id="overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            <div className="bin98-subheading">Robust spatial reasoning</div>
            <p>
              Reliable predicates, disciplined tolerances, and sweep or hull patterns turn spatial
              problems into predictable computations. Robustness beats elegance when coordinates get
              messy.
            </p>
          </section>

          <section id="big-picture" className="bin98-section">
            <h2 className="bin98-heading">Big picture</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {bigPicture.map((item) => (
                <div key={item.title} className="bin98-section">
                  <div className="bin98-subheading">{item.title}</div>
                  <p>{item.detail}</p>
                  <p>{item.note}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="history" className="bin98-section">
            <h2 className="bin98-heading">History</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {history.map((event) => (
                <div key={event.title} className="bin98-section">
                  <div className="bin98-subheading">{event.title}</div>
                  <p>{event.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="applications" className="bin98-section">
            <h2 className="bin98-heading">Applications</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {applications.map((item) => (
                <div key={item.title} className="bin98-section">
                  <div className="bin98-subheading">{item.title}</div>
                  <p>{item.detail}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {activeTab === 'core-concepts' && (
        <>
          <section id="core-pillars-and-mental-hooks" className="bin98-section">
            <h2 className="bin98-heading">Core pillars and mental hooks</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-4">
                {pillars.map((pillar) => (
                  <div key={pillar.title} className="bin98-section">
                    <div className="bin98-subheading">{pillar.title}</div>
                    <p>{pillar.detail}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                {mentalModels.map((model) => (
                  <div key={model.title} className="bin98-section">
                    <div className="bin98-subheading">{model.title}</div>
                    <p>{model.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="how-it-works" className="bin98-section">
            <h2 className="bin98-heading">How it works</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {howItWorks.map((item) => (
                <div key={item.step} className="bin98-section">
                  <div className="bin98-subheading">{item.step}</div>
                  <p>{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="complexity-reference" className="bin98-section">
            <h2 className="bin98-heading">Complexity reference</h2>
            <div className="bin98-section">
              <table className="bin98-table">
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
          </section>

          <section id="advanced-moves" className="bin98-section">
            <h2 className="bin98-heading">Advanced moves</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {advanced.map((item) => (
                <div key={item.title} className="bin98-section">
                  <div className="bin98-subheading">{item.title}</div>
                  <p>{item.detail}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {activeTab === 'examples' && (
        <>
          <section id="failure-mode" className="bin98-section">
            <h2 className="bin98-heading">Failure mode</h2>
            <div className="bin98-section">
              <div className="bin98-subheading">{failureCallout.title}</div>
              <p>{failureCallout.detail}</p>
            </div>
          </section>

          <section id="code-examples" className="bin98-section">
            <h2 className="bin98-heading">Code examples</h2>
            <div className="space-y-4">
              {codeExamples.map((example) => (
                <div key={example.title} className="bin98-section">
                  <div className="bin98-subheading">{example.title}</div>
                  <pre className="bin98-codebox">
                    <code>{example.code}</code>
                  </pre>
                  <p>{example.explanation}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {activeTab === 'takeaways' && (
        <>
          <section id="pitfalls" className="bin98-section">
            <h2 className="bin98-heading">Pitfalls</h2>
            <div className="bin98-section">
              <ul className="list-disc pl-5 space-y-2">
                {pitfalls.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section id="when-to-use-what" className="bin98-section">
            <h2 className="bin98-heading">When to use what</h2>
            <div className="bin98-section">
              <ol className="list-decimal pl-5 space-y-2">
                {whenToUse.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </section>

          <section id="key-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key takeaways</h2>
            <div className="bin98-section">
              <ul className="list-disc pl-5 space-y-2">
                {keyTakeaways.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>
        </>
      )}
    </TopicPageShell>
  )
}
