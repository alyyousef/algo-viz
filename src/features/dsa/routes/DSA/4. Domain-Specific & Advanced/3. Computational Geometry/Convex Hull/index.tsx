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
      'Graham\'s scan used sorting and a stack, giving an O(n log n) method that is simple and fast.',
  },
  {
    title: 'Monotonic chain refined (1979)',
    detail:
      'Andrew\'s monotone chain popularized a stable variant of Graham scan with a neat upper/lower hull split.',
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
    detail:
      'Start at the leftmost point and keep turning left to trace the outer boundary.',
  },
  {
    title: 'Upper and lower skyline',
    detail:
      'The hull is the union of the top chain and bottom chain when points are sorted by x.',
  },
  {
    title: 'Turn test as a guardrail',
    detail:
      'Use the cross product to keep only left turns; right turns are inside and get removed.',
  },
  {
    title: 'Peeling layers',
    detail:
      'Repeatedly remove the hull to reveal inner layers, like an onion decomposition.',
  },
]

const coreSteps = [
  {
    title: 'Sort points',
    detail:
      'Sort by x, then by y to establish a stable left-to-right order.',
  },
  {
    title: 'Build the lower hull',
    detail:
      'Iterate left to right; while the last two points and the new point make a right turn, pop the middle.',
  },
  {
    title: 'Build the upper hull',
    detail:
      'Iterate right to left with the same turn test to form the top boundary.',
  },
  {
    title: 'Concatenate hulls',
    detail:
      'Combine lower and upper hulls, omitting the last point of each to avoid duplication.',
  },
  {
    title: 'Return ordered vertices',
    detail:
      'The resulting cycle lists hull vertices in counterclockwise order.',
  },
  {
    title: 'Handle degeneracies',
    detail:
      'Decide whether to keep or discard collinear points along edges.',
  },
]

const correctnessNotes = [
  {
    title: 'Cross product sign',
    detail:
      'The sign of the cross product tells whether the turn is left, right, or collinear.',
  },
  {
    title: 'Invariant: hull remains convex',
    detail:
      'By removing right turns, the chain stays convex and never cuts inward.',
  },
  {
    title: 'Extreme points preserved',
    detail:
      'The leftmost and rightmost points must be on the hull and anchor the chains.',
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
    detail:
      'Sorting dominates at O(n log n). The scan is linear, so total time is O(n log n).',
  },
  {
    title: 'Space cost',
    detail:
      'O(n) space for the sorted list and stack of hull points.',
  },
  {
    title: 'Brute force baseline',
    detail:
      'Checking all subsets of points is exponential and infeasible; hull algorithms exploit structure.',
  },
  {
    title: 'Numerical robustness',
    detail:
      'Cross products can overflow for large coordinates; use 64-bit or exact arithmetic.',
  },
  {
    title: 'Streaming updates',
    detail:
      'Dynamic hull maintenance is more complex; rebuilds can be faster for batch updates.',
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
    detail:
      'Sort by polar angle around the lowest point and apply the turn test with a stack.',
  },
  {
    title: 'Monotone chain',
    detail:
      'Sort by x/y, build lower and upper chains. Simple and stable in practice.',
  },
  {
    title: 'Jarvis march',
    detail:
      'Gift wrapping; complexity O(nh) where h is hull size, good for small hulls.',
  },
  {
    title: 'Quickhull',
    detail:
      'Divide and conquer similar to quicksort; fast on average but can degrade on worst cases.',
  },
  {
    title: 'Chan\'s algorithm',
    detail:
      'Combines output sensitivity with divide and conquer to achieve O(n log h).',
  },
  {
    title: 'Incremental',
    detail:
      'Add points one by one, updating the hull. Useful for online data streams.',
  },
]

const realWorldUses = [
  {
    context: 'Collision detection',
    detail:
      'Convex hulls create tight bounds around objects for fast collision checks.',
  },
  {
    context: 'GIS and mapping',
    detail:
      'Summarize geographic clusters or territories with a minimal enclosing polygon.',
  },
  {
    context: 'Computer graphics',
    detail:
      'Simplify geometry, compute bounding volumes, or generate shadow outlines.',
  },
  {
    context: 'Robotics',
    detail:
      'Model reachable workspaces or obstacle regions with convex boundaries.',
  },
  {
    context: 'Data analysis',
    detail:
      'Visualize the outer envelope of a scatter plot or compute convex hull area.',
  },
  {
    context: 'Image processing',
    detail:
      'Find the outer boundary of a binary shape for contour analysis.',
  },
]

const examples = [
  {
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
    explanation:
      'The cross product test preserves only left turns, producing a convex boundary.',
  },
  {
    title: 'Cross product helper',
    code: `function cross(o, a, b):
    return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x)`,
    explanation:
      'Positive means counterclockwise turn; negative means clockwise; zero is collinear.',
  },
  {
    title: 'Including collinear points',
    code: `// Use < 0 instead of <= 0 to keep collinear points on edges
while len(lower) >= 2 and cross(lower[-2], lower[-1], p) < 0:
    lower.pop()`,
    explanation:
      'Choosing <= or < controls whether collinear points remain on the hull edges.',
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
  'Need output-sensitive speed for large n: consider Chan\'s algorithm.',
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

export default function ConvexHullPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Convex Hull</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">The smallest convex envelope that wraps a point set</div>
              <p className="win95-text">
                The convex hull of a set of points is the minimal convex polygon that contains every point. It is a foundational
                construct in computational geometry, enabling collision detection, spatial summaries, and boundary analysis.
                The standard solutions use sorting and turn tests to trace the outer boundary efficiently.
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
                Convex hull algorithms turn a cloud of points into a clean perimeter. By keeping only left turns while scanning,
                interior points are discarded. The result is an ordered cycle that encloses the set with no inward dents.
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
                The hull remains convex because any right turn indicates a point inside the boundary. Removing it preserves the
                outer envelope and keeps the chain valid.
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
                Convex hulls are fast for large point sets because they reduce a 2D problem to a sorted scan with constant-time
                turn checks.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Algorithm choices</legend>
            <div className="win95-grid win95-grid-2">
              {algorithmChoices.map((item) => (
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
