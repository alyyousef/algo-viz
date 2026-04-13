import { Link } from 'react-router-dom'

import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

const historicalMilestones = [
  {
    title: 'Early convexity in geometry (1800s)',
    detail:
      'Convex sets were formalized in classical geometry and later became a central concept in optimization.',
  },
  {
    title: 'Gift wrapping and hull tracing (1930s)',
    detail:
      'Jarvis introduced the gift-wrapping method, one of the earliest constructive hull algorithms.',
  },
  {
    title: 'Graham scan emerges (1972)',
    detail:
      "Graham's scan used sorting and a stack, giving an O(n log n) method that is simple and fast.",
  },
  {
    title: 'Monotonic chain refined (1979)',
    detail:
      "Andrew's monotone chain popularized a stable variant of Graham scan with a neat upper/lower hull split.",
  },
  {
    title: 'Computational geometry mainstreams (1980s-2000s)',
    detail:
      'Convex hulls became a standard building block for collision detection, spatial analysis, and graphics.',
  },
]

const mentalModels = [
  {
    title: 'Rubber band around nails',
    detail:
      'Stretch a rubber band around all points. The band snaps to the outermost points: the hull.',
  },
  {
    title: 'Walk the boundary',
    detail: 'Start at the leftmost point and keep turning left to trace the outer boundary.',
  },
  {
    title: 'Upper and lower skyline',
    detail: 'The hull is the union of the top chain and bottom chain when points are sorted by x.',
  },
  {
    title: 'Turn test as a guardrail',
    detail:
      'Use the cross product to keep only left turns; right turns are inside and get removed.',
  },
  {
    title: 'Peeling layers',
    detail: 'Repeatedly remove the hull to reveal inner layers, like an onion decomposition.',
  },
]

const coreSteps = [
  {
    title: 'Sort points',
    detail: 'Sort by x, then by y to establish a stable left-to-right order.',
  },
  {
    title: 'Build the lower hull',
    detail:
      'Iterate left to right; while the last two points and the new point make a right turn, pop the middle.',
  },
  {
    title: 'Build the upper hull',
    detail: 'Iterate right to left with the same turn test to form the top boundary.',
  },
  {
    title: 'Concatenate hulls',
    detail: 'Combine lower and upper hulls, omitting the last point of each to avoid duplication.',
  },
  {
    title: 'Return ordered vertices',
    detail: 'The resulting cycle lists hull vertices in counterclockwise order.',
  },
  {
    title: 'Handle degeneracies',
    detail: 'Decide whether to keep or discard collinear points along edges.',
  },
]

const correctnessNotes = [
  {
    title: 'Cross product sign',
    detail: 'The sign of the cross product tells whether the turn is left, right, or collinear.',
  },
  {
    title: 'Invariant: hull remains convex',
    detail: 'By removing right turns, the chain stays convex and never cuts inward.',
  },
  {
    title: 'Extreme points preserved',
    detail: 'The leftmost and rightmost points must be on the hull and anchor the chains.',
  },
  {
    title: 'All points outside removed',
    detail:
      'Any point that would create a right turn lies inside or on the boundary and can be discarded.',
  },
]

const complexityNotes = [
  {
    title: 'Time cost',
    detail: 'Sorting dominates at O(n log n). The scan is linear, so total time is O(n log n).',
  },
  {
    title: 'Space cost',
    detail: 'O(n) space for the sorted list and stack of hull points.',
  },
  {
    title: 'Brute force baseline',
    detail:
      'Checking all subsets of points is exponential and infeasible; hull algorithms exploit structure.',
  },
  {
    title: 'Numerical robustness',
    detail: 'Cross products can overflow for large coordinates; use 64-bit or exact arithmetic.',
  },
  {
    title: 'Streaming updates',
    detail: 'Dynamic hull maintenance is more complex; rebuilds can be faster for batch updates.',
  },
  {
    title: 'Higher dimensions',
    detail:
      'Convex hulls generalize to 3D and beyond, but complexity and implementation cost rise quickly.',
  },
]

const algorithmChoices = [
  {
    title: 'Graham scan',
    detail: 'Sort by polar angle around the lowest point and apply the turn test with a stack.',
  },
  {
    title: 'Monotone chain',
    detail: 'Sort by x/y, build lower and upper chains. Simple and stable in practice.',
  },
  {
    title: 'Jarvis march',
    detail: 'Gift wrapping; complexity O(nh) where h is hull size, good for small hulls.',
  },
  {
    title: 'Quickhull',
    detail:
      'Divide and conquer similar to quicksort; fast on average but can degrade on worst cases.',
  },
  {
    title: "Chan's algorithm",
    detail: 'Combines output sensitivity with divide and conquer to achieve O(n log h).',
  },
  {
    title: 'Incremental',
    detail: 'Add points one by one, updating the hull. Useful for online data streams.',
  },
]

const realWorldUses = [
  {
    context: 'Collision detection',
    detail: 'Convex hulls create tight bounds around objects for fast collision checks.',
  },
  {
    context: 'GIS and mapping',
    detail: 'Summarize geographic clusters or territories with a minimal enclosing polygon.',
  },
  {
    context: 'Computer graphics',
    detail: 'Simplify geometry, compute bounding volumes, or generate shadow outlines.',
  },
  {
    context: 'Robotics',
    detail: 'Model reachable workspaces or obstacle regions with convex boundaries.',
  },
  {
    context: 'Data analysis',
    detail: 'Visualize the outer envelope of a scatter plot or compute convex hull area.',
  },
  {
    context: 'Image processing',
    detail: 'Find the outer boundary of a binary shape for contour analysis.',
  },
]

const examples = [
  {
    id: 'ex-monotone-chain',
    title: 'Monotone chain (pseudocode)',
    code: `function convexHull(points):
    if len(points) <= 1: return points
    sort points by (x, then y)
    lower = []
    for p in points:
        while len(lower) >= 2 and cross(lower[-2], lower[-1], p) <= 0:
            lower.pop()
        lower.push(p)
    upper = []
    for p in reverse(points):
        while len(upper) >= 2 and cross(upper[-2], upper[-1], p) <= 0:
            upper.pop()
        upper.push(p)
    return lower[0..-2] + upper[0..-2]`,
    explanation: 'The cross product test preserves only left turns, producing a convex boundary.',
  },
  {
    id: 'ex-cross-product',
    title: 'Cross product helper',
    code: `function cross(o, a, b):
    return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x)`,
    explanation:
      'Positive means counterclockwise turn; negative means clockwise; zero is collinear.',
  },
  {
    id: 'ex-collinear',
    title: 'Including collinear points',
    code: `// Use < 0 instead of <= 0 to keep collinear points on edges
while len(lower) >= 2 and cross(lower[-2], lower[-1], p) < 0:
    lower.pop()`,
    explanation: 'Choosing <= or < controls whether collinear points remain on the hull edges.',
  },
]

const pitfalls = [
  'Using <= when you want to keep collinear edge points, or < when you want to discard them.',
  'Not sorting by both x and y, which can break duplicate or vertical line cases.',
  'Overflow in cross product for large coordinates; use 64-bit or bigint.',
  'Returning the first and last points twice when concatenating hull chains.',
  'Assuming hull exists for 0 or 1 point; handle small sets explicitly.',
  'Mixing clockwise and counterclockwise orientation checks.',
]

const decisionGuidance = [
  'Need a robust standard hull in 2D: use monotone chain.',
  'Hull size is tiny compared to n: use Jarvis march for O(nh).',
  "Need output-sensitive speed for large n: consider Chan's algorithm.",
  'Have streaming points: incremental updates or periodic rebuilds.',
  'Need 3D hulls: use dedicated 3D hull libraries or Quickhull variants.',
  'Need convex hull area or perimeter: compute after hull vertices are known.',
]

const takeaways = [
  'The convex hull is the smallest convex polygon enclosing all points.',
  'Sorting plus turn tests yields a fast O(n log n) solution.',
  'Cross products drive correctness; numerical care matters.',
  'Algorithm choice depends on hull size, data shape, and update patterns.',
  'Hull vertices unlock fast collision checks and geometric summaries.',
]

const glossaryTerms = [
  {
    term: 'Convex hull',
    definition: 'The smallest convex polygon that contains every point in the set.',
  },
  {
    term: 'Cross product',
    definition:
      'An orientation test that reports whether three points form a left turn, right turn, or collinear line.',
  },
  {
    term: 'Monotone chain',
    definition: 'A convex hull method that sorts by x/y and builds lower and upper hull chains.',
  },
  {
    term: 'Graham scan',
    definition: 'A sorting-plus-stack hull algorithm that scans points by polar angle.',
  },
  {
    term: 'Jarvis march',
    definition: 'A gift-wrapping algorithm with O(nh) complexity, where h is the hull size.',
  },
  {
    term: 'Quickhull',
    definition: 'A divide-and-conquer hull approach that is often fast in practice.',
  },
  {
    term: 'Collinear points',
    definition:
      'Points that lie on the same line; hull implementations must decide whether to keep or drop them on edges.',
  },
  {
    term: 'Output-sensitive',
    definition:
      'An algorithmic cost model where runtime depends partly on the size of the output, such as h hull vertices.',
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
    { id: 'core-algorithms', label: 'Algorithm Choices' },
    { id: 'core-pitfalls', label: 'Pitfalls' },
    { id: 'core-when-to-use', label: 'When to Use It' },
  ],
  examples: examples.map((example) => ({
    id: example.id,
    label: example.title,
  })),
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function ConvexHullPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Convex Hull',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Convex Hull"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Convex Hull</h1>
      <p>
        The convex hull of a set of points is the minimal convex polygon that contains every point.
        It is a foundational construct in computational geometry, enabling collision detection,
        spatial summaries, and boundary analysis. The standard solutions use sorting and turn tests
        to trace the outer boundary efficiently.
      </p>
      <p>
        This page follows the same help-document format as the other Win98-styled pages: text-first
        sections, a left contents pane, and code examples as the only sunken panels.
      </p>
      <p>
        The title-bar minimize control returns to the previous page when possible, or to{' '}
        <Link to="/algoViz" className="bin98-inline-link">
          /algoViz
        </Link>{' '}
        when there is no prior history entry.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            <p>
              Convex hull algorithms turn a cloud of points into a clean perimeter. By keeping only
              left turns while scanning, interior points are discarded. The result is an ordered
              cycle that encloses the set with no inward dents.
            </p>
            <p>
              You can think of the hull as the outermost summary of a point set. Once it is known,
              many downstream geometric tasks become simpler because the interior points no longer
              affect the boundary.
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
              The hull remains convex because any right turn indicates a point inside the boundary.
              Removing it preserves the outer envelope and keeps the chain valid.
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
              Convex hulls are fast for large point sets because they reduce a 2D problem to a
              sorted scan with constant-time turn checks.
            </p>
          </section>
          <section id="core-algorithms" className="bin98-section">
            <h2 className="bin98-heading">Algorithm Choices</h2>
            {algorithmChoices.map((item) => (
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
