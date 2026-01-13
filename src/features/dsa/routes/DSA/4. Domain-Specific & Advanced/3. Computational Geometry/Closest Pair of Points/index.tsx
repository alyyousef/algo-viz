import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: 'Divide and conquer takes root (1940s-1960s)',
    detail:
      'Early algorithmic work showed that splitting a problem into balanced subproblems yields dramatic speedups.',
  },
  {
    title: 'Closest pair formalized in computational geometry (1970s)',
    detail:
      'Researchers developed the classic O(n log n) method with a merge step over a geometric strip.',
  },
  {
    title: 'Plane sweep and Voronoi connections (1980s)',
    detail:
      'The closest pair problem became linked to Voronoi diagrams and Delaunay triangulations.',
  },
  {
    title: 'Practical engineering focus (1990s-2000s)',
    detail:
      'Implementations matured with careful sorting, stable precision handling, and cache-aware data layouts.',
  },
  {
    title: 'Spatial indexing era (present)',
    detail:
      'KD-trees and spatial hash grids offer fast approximate answers, but the classic algorithm remains the exact baseline.',
  },
]

const mentalModels = [
  {
    title: 'Split the plane and compare borders',
    detail:
      'Solve left and right halves, then only check points near the dividing line for cross-boundary pairs.',
  },
  {
    title: 'Zoomed-in camera',
    detail:
      'Once you know a best distance d, you only need to inspect a thin vertical strip of width 2d.',
  },
  {
    title: 'Sorted lists with a small neighborhood',
    detail:
      'In the strip, points are sorted by y, and each point only needs to compare against a few successors.',
  },
  {
    title: 'Merge step with geometry rules',
    detail:
      'The merge resembles merge sort, but the geometric constraint limits comparisons to a constant.',
  },
  {
    title: 'Brute force for small clusters',
    detail:
      'Tiny sets are simpler to handle directly; divide and conquer delegates to brute force at the leaves.',
  },
]

const coreSteps = [
  {
    title: 'Sort points by x',
    detail:
      'Pre-sort points by x (and optionally by y) to enable splitting and efficient merge steps.',
  },
  {
    title: 'Divide into left and right halves',
    detail:
      'Split at the median x coordinate so each half is balanced in size.',
  },
  {
    title: 'Solve subproblems recursively',
    detail:
      'Compute the closest pair in each half; call their best distances dL and dR.',
  },
  {
    title: 'Build the middle strip',
    detail:
      'Let d = min(dL, dR). Consider only points within distance d of the vertical split line.',
  },
  {
    title: 'Sort strip by y and scan',
    detail:
      'Within the strip, sort by y and compare each point to the next few points (at most 6-7).',
  },
  {
    title: 'Return the best pair',
    detail:
      'Pick the minimum among the left, right, and strip results to return the exact closest pair.',
  },
]

const correctnessNotes = [
  {
    title: 'Split correctness',
    detail:
      'The closest pair is either entirely in the left half, entirely in the right half, or crosses the split.',
  },
  {
    title: 'Strip restriction',
    detail:
      'If a cross-boundary closest pair exists with distance d, both points must lie within d of the split line.',
  },
  {
    title: 'Constant neighbors',
    detail:
      'In the strip sorted by y, each point needs only check the next few points because of packing limits.',
  },
  {
    title: 'No missed pairs',
    detail:
      'Every candidate closer than d must appear in the strip scan, ensuring completeness.',
  },
]

const complexityNotes = [
  {
    title: 'Time cost',
    detail:
      'The divide-and-conquer algorithm runs in O(n log n) time, dominated by sorting and linear merge steps.',
  },
  {
    title: 'Space cost',
    detail:
      'O(n) extra space for auxiliary arrays of points sorted by y, or less with careful in-place handling.',
  },
  {
    title: 'Brute force baseline',
    detail:
      'The naive method checks all pairs in O(n^2), which becomes impractical for large n.',
  },
  {
    title: 'Precision stability',
    detail:
      'Using squared distances avoids floating point errors until the final answer is needed.',
  },
  {
    title: 'Cache behavior',
    detail:
      'Sorted arrays and sequential scans make the algorithm cache-friendly in practice.',
  },
  {
    title: 'Higher dimensions',
    detail:
      'The constant-neighbor argument weakens in higher dimensions; performance degrades quickly.',
  },
]

const optimizations = [
  {
    title: 'Use squared distances',
    detail:
      'Compare squared distances to avoid repeated square roots and reduce floating point error.',
  },
  {
    title: 'Presort by y once',
    detail:
      'Maintain a y-sorted list throughout recursion to avoid sorting the strip repeatedly.',
  },
  {
    title: 'Small n cutoff',
    detail:
      'Switch to brute force when n is tiny (e.g., <= 3 or <= 8) to reduce recursion overhead.',
  },
  {
    title: 'Stable partitioning',
    detail:
      'Partition the y-sorted list into left and right in linear time to keep O(n log n).',
  },
  {
    title: 'Integer coordinates',
    detail:
      'When inputs are integers, squared distances fit in 64-bit for better determinism.',
  },
  {
    title: 'Return both distance and pair',
    detail:
      'Track the closest pair alongside the distance so you do not need a second pass.',
  },
]

const realWorldUses = [
  {
    context: 'Geospatial analysis',
    detail:
      'Find the nearest facilities, accident hotspots, or nearby devices on a map.',
  },
  {
    context: 'Computer graphics',
    detail:
      'Detect nearly coincident vertices, which matters for mesh cleanup and collision checks.',
  },
  {
    context: 'Robotics and sensing',
    detail:
      'Identify the closest obstacles or clustered sensor readings to trigger avoidance behavior.',
  },
  {
    context: 'Astronomy',
    detail:
      'Measure closest star or galaxy pairs in observational catalogs.',
  },
  {
    context: 'Clustering and data analysis',
    detail:
      'Seed cluster algorithms or evaluate nearest-neighbor distances for anomaly detection.',
  },
  {
    context: 'Manufacturing and QA',
    detail:
      'Detect points that are too close together in CNC, PCB, or lithography layouts.',
  },
]

const examples = [
  {
    title: 'Divide and conquer (pseudocode)',
    code: `function closestPair(points):
    sort points by x
    return solve(points)

function solve(pointsByX):
    n = size(pointsByX)
    if n <= 3:
        return bruteForce(pointsByX)
    mid = n / 2
    left = pointsByX[0..mid-1]
    right = pointsByX[mid..n-1]
    (dL, pairL) = solve(left)
    (dR, pairR) = solve(right)
    d = min(dL, dR)
    strip = points with |x - midX| < d
    sort strip by y
    for i in 0..strip.length-1:
        for j in i+1..min(i+7, strip.length-1):
            update best if dist(strip[i], strip[j]) < d
    return best pair and distance`,
    explanation:
      'The strip scan is the key: you only compare a constant number of neighbors per point.',
  },
  {
    title: 'Squared distance helper',
    code: `function dist2(a, b):
    dx = a.x - b.x
    dy = a.y - b.y
    return dx*dx + dy*dy`,
    explanation:
      'Squared distance is sufficient for comparisons and avoids sqrt until the final answer.',
  },
  {
    title: 'Brute force base case',
    code: `function bruteForce(points):
    best = Infinity
    pair = null
    for i in 0..len(points)-1:
        for j in i+1..len(points)-1:
            d = dist2(points[i], points[j])
            if d < best:
                best = d
                pair = (points[i], points[j])
    return (best, pair)`,
    explanation:
      'Small sets are cheaper to solve directly; the recursion stops here.',
  },
]

const pitfalls = [
  'Forgetting to sort the strip by y, which breaks the constant neighbor guarantee.',
  'Using p*p overflow-prone arithmetic in other contexts; here use 64-bit for dx*dx + dy*dy.',
  'Comparing distances with sqrt in tight loops, which is slower and less stable.',
  'Not handling duplicate points; distance can be zero and should short-circuit.',
  'Returning only distance without the pair, forcing a second search pass.',
  'Assuming the 2D neighbor bound works in higher dimensions.',
]

const decisionGuidance = [
  'Need the exact closest pair in 2D: use divide and conquer.',
  'Need a quick approximate answer: consider a grid or spatial hash.',
  'Need repeated queries: build a KD-tree or Delaunay triangulation.',
  'Small n only: brute force is simpler and fast enough.',
  'Data is streaming: use incremental spatial indexing with occasional rebuilds.',
  'Higher dimensions: switch to KD-tree or approximate methods as exact costs rise.',
]

const takeaways = [
  'The closest pair algorithm is a classic O(n log n) divide-and-conquer success story.',
  'The strip step is safe because geometry limits the number of nearby candidates.',
  'Pre-sorting and careful merging keep the overall runtime optimal.',
  'Squared distances improve speed and numerical stability.',
  'Exact 2D performance is excellent; higher dimensions require different tools.',
]

export default function ClosestPairOfPointsPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Closest Pair of Points</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Exact nearest neighbors in the plane with divide-and-conquer speed</div>
              <p className="win95-text">
                The closest pair of points problem asks for the two points in a set with the smallest Euclidean distance.
                A naive all-pairs check is quadratic, but the classic divide-and-conquer method runs in O(n log n) by splitting
                the plane, solving subproblems, and only checking a narrow strip around the split line.
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
                The algorithm uses spatial structure to avoid unnecessary comparisons. Once you know a best distance d on each side,
                any closer cross-boundary pair must live in a thin vertical strip. Sorting that strip by y makes the merge step linear.
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
                The geometry of the strip guarantees that checking only a few neighbors per point is enough, so the merge step is
                linear and no candidate closest pair is missed.
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
                The closest pair problem is a textbook demonstration of how geometric constraints reduce work from quadratic to near
                linear per level. Sorting is the dominant cost.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity snapshot</legend>
            <div className="win95-panel">
              <table className="win95-table">
                <thead>
                  <tr>
                    <th>Variant</th>
                    <th>Time</th>
                    <th>Space</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Brute force</td>
                    <td>O(n^2)</td>
                    <td>O(1)</td>
                    <td>Simple, only practical for small n.</td>
                  </tr>
                  <tr>
                    <td>Divide and conquer</td>
                    <td>O(n log n)</td>
                    <td>O(n)</td>
                    <td>Exact, standard 2D solution.</td>
                  </tr>
                  <tr>
                    <td>Grid or KD-tree (approx)</td>
                    <td>Varies</td>
                    <td>O(n)</td>
                    <td>Fast for repeated queries, not always exact.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Optimizations and variants</legend>
            <div className="win95-grid win95-grid-2">
              {optimizations.map((item) => (
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

