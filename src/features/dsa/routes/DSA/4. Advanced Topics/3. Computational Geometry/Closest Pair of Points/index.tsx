import { Link } from 'react-router-dom'

import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

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
    detail: 'Split at the median x coordinate so each half is balanced in size.',
  },
  {
    title: 'Solve subproblems recursively',
    detail: 'Compute the closest pair in each half; call their best distances dL and dR.',
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
    detail: 'Every candidate closer than d must appear in the strip scan, ensuring completeness.',
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
    detail: 'The naive method checks all pairs in O(n^2), which becomes impractical for large n.',
  },
  {
    title: 'Precision stability',
    detail:
      'Using squared distances avoids floating point errors until the final answer is needed.',
  },
  {
    title: 'Cache behavior',
    detail: 'Sorted arrays and sequential scans make the algorithm cache-friendly in practice.',
  },
  {
    title: 'Higher dimensions',
    detail:
      'The constant-neighbor argument weakens in higher dimensions; performance degrades quickly.',
  },
]

const complexityVariants = [
  {
    variant: 'Brute force',
    time: 'O(n^2)',
    space: 'O(1)',
    notes: 'Simple, only practical for small n.',
  },
  {
    variant: 'Divide and conquer',
    time: 'O(n log n)',
    space: 'O(n)',
    notes: 'Exact, standard 2D solution.',
  },
  {
    variant: 'Grid or KD-tree (approx)',
    time: 'Varies',
    space: 'O(n)',
    notes: 'Fast for repeated queries, not always exact.',
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
    detail: 'Maintain a y-sorted list throughout recursion to avoid sorting the strip repeatedly.',
  },
  {
    title: 'Small n cutoff',
    detail:
      'Switch to brute force when n is tiny (e.g., <= 3 or <= 8) to reduce recursion overhead.',
  },
  {
    title: 'Stable partitioning',
    detail: 'Partition the y-sorted list into left and right in linear time to keep O(n log n).',
  },
  {
    title: 'Integer coordinates',
    detail: 'When inputs are integers, squared distances fit in 64-bit for better determinism.',
  },
  {
    title: 'Return both distance and pair',
    detail: 'Track the closest pair alongside the distance so you do not need a second pass.',
  },
]

const realWorldUses = [
  {
    context: 'Geospatial analysis',
    detail: 'Find the nearest facilities, accident hotspots, or nearby devices on a map.',
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
    detail: 'Measure closest star or galaxy pairs in observational catalogs.',
  },
  {
    context: 'Clustering and data analysis',
    detail: 'Seed cluster algorithms or evaluate nearest-neighbor distances for anomaly detection.',
  },
  {
    context: 'Manufacturing and QA',
    detail: 'Detect points that are too close together in CNC, PCB, or lithography layouts.',
  },
]

const examples = [
  {
    id: 'ex-divide-conquer',
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
    id: 'ex-distance-helper',
    title: 'Squared distance helper',
    code: `function dist2(a, b):
    dx = a.x - b.x
    dy = a.y - b.y
    return dx*dx + dy*dy`,
    explanation:
      'Squared distance is sufficient for comparisons and avoids sqrt until the final answer.',
  },
  {
    id: 'ex-bruteforce',
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
    explanation: 'Small sets are cheaper to solve directly; the recursion stops here.',
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

const glossaryTerms = [
  {
    term: 'Closest pair problem',
    definition: 'The task of finding the two points in a set with the smallest Euclidean distance.',
  },
  {
    term: 'Divide and conquer',
    definition:
      'A strategy that splits the point set into balanced halves, solves them recursively, and merges the results.',
  },
  {
    term: 'Strip',
    definition:
      'The vertical band around the split line that contains every possible cross-boundary pair closer than d.',
  },
  {
    term: 'Squared distance',
    definition:
      'A comparison-friendly distance form that avoids square roots until the final answer is needed.',
  },
  {
    term: 'Brute force',
    definition: 'The baseline method that checks every pair directly in O(n^2) time.',
  },
  {
    term: 'KD-tree',
    definition:
      'A spatial data structure that can support repeated nearest-neighbor style queries efficiently.',
  },
  {
    term: 'Voronoi diagram',
    definition:
      'A geometric structure related to nearest-neighbor relationships and the closest pair problem.',
  },
  {
    term: 'Delaunay triangulation',
    definition:
      'A structure linked to Voronoi diagrams that also appears in closest-pair discussions.',
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
    { id: 'core-optimizations', label: 'Optimizations' },
    { id: 'core-pitfalls', label: 'Pitfalls' },
    { id: 'core-when-to-use', label: 'When to Use It' },
  ],
  examples: examples.map((example) => ({
    id: example.id,
    label: example.title,
  })),
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function ClosestPairOfPointsPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Closest Pair of Points',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Closest Pair of Points"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="closest-help98-title">Closest Pair of Points</h1>
      <p>
        The closest pair of points problem asks for the two points in a set with the smallest
        Euclidean distance. A naive all-pairs check is quadratic, but the classic divide-and-conquer
        method runs in O(n log n) by splitting the plane, solving subproblems, and only checking a
        narrow strip around the split line.
      </p>
      <p>
        This page keeps the material in help-document form: text first, code only where examples are
        needed, and page-local tab state stored in the URL query string so the current section can
        be restored.
      </p>
      <p>
        The title-bar minimize control returns to the previous page when possible, or to{' '}
        <Link to="/algoViz" className="closest-help98-inline-link">
          /algoViz
        </Link>{' '}
        when there is no prior history entry.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            <p>
              The algorithm uses spatial structure to avoid unnecessary comparisons. Once you know a
              best distance d on each side, any closer cross-boundary pair must live in a thin
              vertical strip. Sorting that strip by y makes the merge step linear.
            </p>
            <p>
              The central idea is that geometry does part of the pruning work. You still solve
              recursive subproblems like any divide-and-conquer algorithm, but the strip argument
              prevents the combine step from falling back to quadratic behavior.
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
              The geometry of the strip guarantees that checking only a few neighbors per point is
              enough, so the merge step is linear and no candidate closest pair is missed.
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
              The closest pair problem is a textbook demonstration of how geometric constraints
              reduce work from quadratic to near linear per level. Sorting is the dominant cost.
            </p>
            <ul>
              {complexityVariants.map((item) => (
                <li key={item.variant}>
                  <strong>{item.variant}:</strong> time {item.time}, space {item.space}.{' '}
                  {item.notes}
                </li>
              ))}
            </ul>
          </section>
          <section id="core-optimizations" className="bin98-section">
            <h2 className="bin98-heading">Optimizations and Variants</h2>
            {optimizations.map((item) => (
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
