import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const rangeQueryPatterns = [
  {
    title: 'Window statistics',
    detail:
      'Compute sums, minimums, maximums, or averages over sliding windows. Segment trees let you query any window length, not just fixed-size.',
  },
  {
    title: 'Dynamic scoring',
    detail:
      'Leaderboard totals, inventory counts, or KPI dashboards where values change often and queries ask for totals over ranges of users or time.',
  },
  {
    title: 'Spatial buckets',
    detail:
      'Index 1D spatial data like road segments or timeline intervals. Range queries answer "what is the max congestion between mile 40 and 80?"',
  },
  {
    title: 'Frequency ranges',
    detail:
      'Track how many elements fall into numeric buckets. Range-sum queries count how many values lie between thresholds.',
  },
  {
    title: 'Status overlays',
    detail:
      'Apply updates to subranges (add, assign, flip) and query aggregate state later. Lazy propagation keeps updates efficient.',
  },
  {
    title: 'Event analytics',
    detail:
      'Measure engagement over time where events arrive continuously. Range sums and max queries support dashboards and alerting.',
  },
]

const mentalModels = [
  {
    title: 'Binary interval tree',
    detail:
      'Every node represents a closed interval. The root covers the whole array, children cover halves, and leaves store individual elements.',
  },
  {
    title: 'Merge operator as contract',
    detail:
      'Segment trees store summaries. The merge function must be associative so that combining two child summaries equals the parent summary.',
  },
  {
    title: 'Queries as interval cover',
    detail:
      'A range query decomposes into O(log n) nodes that perfectly cover the range. You merge only those node summaries.',
  },
  {
    title: 'Updates as local repairs',
    detail:
      'Point updates change one leaf, then repair summaries on the path back to the root. Range updates mark segments and defer work.',
  },
]

const queryTypes = [
  {
    heading: 'Range sum / prefix sum',
    bullets: [
      'Compute total over any [l, r] quickly after arbitrary updates.',
      'Prefix sums work only for static arrays; segment trees handle mutations.',
    ],
  },
  {
    heading: 'Range min / max',
    bullets: [
      'Find min or max in a range while elements change.',
      'Also useful for argmin/argmax by storing both value and index.',
    ],
  },
  {
    heading: 'Range xor / gcd / and',
    bullets: [
      'Any associative operator works: xor, gcd, bitwise and, lcm, etc.',
      'Choose identity elements carefully for empty segments.',
    ],
  },
  {
    heading: 'Range assignment / addition',
    bullets: [
      'Lazy propagation handles bulk updates without touching every element.',
      'Common in interval scheduling, “paint” problems, and batch adjustments.',
    ],
  },
  {
    heading: 'Range frequency',
    bullets: [
      'Store counts in nodes to answer how many values fall in buckets.',
      'Combine with coordinate compression for large value domains.',
    ],
  },
  {
    heading: 'Composite summaries',
    bullets: [
      'Store multiple values: sum + max prefix + max suffix to answer max subarray.',
      'Design node structs to support advanced queries like longest run.',
    ],
  },
]

const buildAndQueryNotes = [
  {
    title: 'Build',
    detail:
      'Build recursively or iteratively. Leaves mirror the input array, internal nodes merge children. Build is O(n).',
  },
  {
    title: 'Query',
    detail:
      'Traverse the tree, collecting nodes that fully fit inside [l, r]. Merge their summaries in O(log n).',
  },
  {
    title: 'Point update',
    detail:
      'Update one leaf, then recompute each ancestor. Complexity stays O(log n).',
  },
  {
    title: 'Lazy range update',
    detail:
      'Store pending updates in nodes. Push them to children only when needed, keeping both update and query O(log n).',
  },
]

const complexityNotes = [
  {
    title: 'Time',
    detail:
      'Build O(n). Query O(log n). Point update O(log n). Range update O(log n) with lazy propagation.',
  },
  {
    title: 'Space',
    detail:
      'Typically 4n nodes for recursive implementation; iterative segment trees use 2n. Memory scales linearly.',
  },
  {
    title: 'Tradeoffs',
    detail:
      'More flexible than Fenwick trees but heavier constants and code complexity. Great for mixed queries and updates.',
  },
  {
    title: 'Associativity requirement',
    detail:
      'Merge must be associative. Non-associative operations break correctness because grouping differs.',
  },
]

const useCaseGallery = [
  {
    context: 'Real-time analytics',
    detail:
      'Track events per minute and query totals over arbitrary time windows while data keeps streaming in.',
  },
  {
    context: 'Game simulations',
    detail:
      'Apply damage buffs to map regions and query max health or total resources in a zone.',
  },
  {
    context: 'Finance and trading',
    detail:
      'Maintain rolling sums, highs, and lows over dynamic price series with frequent updates.',
  },
  {
    context: 'Scheduling systems',
    detail:
      'Find the most loaded interval, assign work to time slots, and check remaining capacity quickly.',
  },
  {
    context: 'Competitive programming',
    detail:
      'Range queries with mixed updates show up in interval problems, inversion counting, and offline queries.',
  },
  {
    context: 'Telemetry and logs',
    detail:
      'Query anomalies over intervals of metrics like CPU usage or error rates with fast aggregation.',
  },
]

const examples = [
  {
    title: 'Range sum with point update',
    code: `// Build from an array, then update and query
tree = buildSegmentTree(values)

update(tree, index=5, newValue=42) // O(log n)
total = query(tree, left=2, right=8) // O(log n)`,
    explanation:
      'Classic use case: numbers change over time, but you still need fast totals for any interval.',
  },
  {
    title: 'Range min with argmin index',
    code: `// Store pairs: (minValue, index)
merge(a, b):
  if a.value <= b.value: return a
  return b

result = query(tree, left=10, right=25)
// result.value is min, result.index is where it occurs`,
    explanation:
      'Storing extra metadata in nodes lets you answer both the value and where it occurs without extra passes.',
  },
  {
    title: 'Range add with lazy propagation',
    code: `// Each node tracks sum and pendingAdd
rangeAdd(node, l, r, delta):
  if node.range fully inside [l, r]:
    node.sum += delta * node.length
    node.pendingAdd += delta
    return
  pushDown(node)
  rangeAdd(node.left, l, r, delta)
  rangeAdd(node.right, l, r, delta)
  node.sum = node.left.sum + node.right.sum`,
    explanation:
      'Lazy propagation keeps large updates cheap by delaying work until a query needs the exact children values.',
  },
]

const pitfalls = [
  'Using a non-associative merge (like subtraction or division) breaks query correctness.',
  'Forgetting to apply pending lazy updates before querying children yields stale answers.',
  'Choosing the wrong identity element (e.g., min with identity 0) corrupts results.',
  'Mishandling inclusive vs exclusive ranges causes off-by-one errors.',
  'Not accounting for overflow when sums can exceed 32-bit limits.',
  'Overusing recursion without tail safeguards can hit stack limits for huge arrays.',
]

const decisionGuidance = [
  'Need range queries with frequent updates and arbitrary associative operations: use a segment tree.',
  'Need only prefix sums with point updates: a Fenwick tree is simpler and smaller.',
  'Need range updates and range queries: segment tree with lazy propagation is the right fit.',
  'Need immutable history or time travel queries: consider a persistent segment tree.',
  'Need range queries over sparse or huge coordinates: combine with coordinate compression.',
]

const advancedInsights = [
  {
    title: 'Iterative segment trees',
    detail:
      'An array-based tree of size 2n avoids recursion and is cache-friendly. Leaves sit at indices [n..2n).',
  },
  {
    title: 'Persistent variants',
    detail:
      'By sharing unchanged nodes, each update creates a new version in O(log n) extra space, enabling time travel.',
  },
  {
    title: 'Segment tree beats',
    detail:
      'Advanced technique that tracks min, second min, and counts to support complex range updates efficiently.',
  },
  {
    title: 'Custom node structs',
    detail:
      'Combine multiple metrics to answer richer queries, like longest increasing run or max subarray sum.',
  },
]

const takeaways = [
  'Segment trees generalize prefix sums to dynamic, arbitrary range queries.',
  'The merge function defines everything: make it associative and pick a safe identity.',
  'Lazy propagation turns expensive range updates into logarithmic work.',
  'When you can express a query as a merged summary, a segment tree is a reliable tool.',
]

export default function SegmentTreeUseCasesRangeQueriesPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Segment Tree Use Cases (Range Queries)</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Fast, flexible range queries on dynamic data</div>
              <p className="win95-text">
                Segment trees shine when you need to answer range queries quickly while the underlying data keeps changing. They
                organize an array into a hierarchy of intervals, letting you aggregate results for any [l, r] range in logarithmic
                time. This page highlights the practical use cases, how the structure answers queries, and the design decisions
                that make a segment tree accurate and fast.
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
                Range queries ask for an aggregate over a contiguous interval, like the sum, min, max, xor, or count between two indices.
                Segment trees store summaries for every interval so queries and updates stay fast even as values change. They are the
                go-to choice for dynamic arrays where prefix sums and static preprocessing fall short.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Common range query patterns</legend>
            <div className="win95-grid win95-grid-3">
              {rangeQueryPatterns.map((item) => (
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
            <legend>Query types segment trees excel at</legend>
            <div className="win95-grid win95-grid-3">
              {queryTypes.map((block) => (
                <div key={block.heading} className="win95-panel">
                  <div className="win95-heading">{block.heading}</div>
                  <ul className="win95-list">
                    {block.bullets.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works: build, query, update</legend>
            <div className="win95-grid win95-grid-2">
              {buildAndQueryNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                The key invariant: every node stores a correct summary of its interval. Queries only touch nodes that fully cover
                the requested range, and updates only repair the path or mark intervals lazily.
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
                Segment trees trade extra memory and code complexity for speed and flexibility. If your data changes and queries
                are frequent, that trade is often worth it.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Real-world applications</legend>
            <div className="win95-grid win95-grid-2">
              {useCaseGallery.map((item) => (
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
            <legend>Segment tree vs Fenwick tree</legend>
            <div className="win95-panel">
              <table className="win95-table">
                <thead>
                  <tr>
                    <th>Dimension</th>
                    <th>Segment tree</th>
                    <th>Fenwick tree</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Operations</td>
                    <td>Any associative merge, range updates with lazy</td>
                    <td>Primarily sums (or invertible operations)</td>
                  </tr>
                  <tr>
                    <td>Query range</td>
                    <td>Direct range query in O(log n)</td>
                    <td>Range sum via prefix differences</td>
                  </tr>
                  <tr>
                    <td>Code complexity</td>
                    <td>Higher, more moving parts</td>
                    <td>Simpler and compact</td>
                  </tr>
                  <tr>
                    <td>Memory</td>
                    <td>~4n (recursive) or 2n (iterative)</td>
                    <td>n</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Advanced insights</legend>
            <div className="win95-grid win95-grid-2">
              {advancedInsights.map((item) => (
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

