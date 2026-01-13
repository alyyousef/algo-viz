import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: 'Fenwick publishes the Binary Indexed Tree (1994)',
    detail:
      'Peter Fenwick introduced a cache-friendly structure that stores cumulative frequencies with simple bit operations, replacing heavier segment trees for prefix sums.',
  },
  {
    title: 'Competitive programming adoption (late 1990s)',
    detail:
      'Fenwick trees became the default tool for inversion counts, order statistics, and dynamic prefix sums because of tiny code and low constants.',
  },
  {
    title: 'Database and systems use (2000s)',
    detail:
      'Indexing and telemetry pipelines adopted Fenwick-like prefix structures to keep rolling counts and percentiles fast under continuous updates.',
  },
  {
    title: 'Multi-dimensional variants mature (2010s)',
    detail:
      '2D and 3D Fenwick trees proved practical for grids, heatmaps, and real-time analytics where O(log^d n) updates beat full recomputation.',
  },
]

const mentalModels = [
  {
    title: 'Binary buckets',
    detail:
      'Each index stores a bucket of size lowbit(i). Buckets overlap in a controlled way so every prefix is the sum of a few buckets.',
  },
  {
    title: 'Staircase walk',
    detail:
      'Prefix queries walk down by clearing the least significant set bit. Updates walk up by adding that bit, like climbing a staircase.',
  },
  {
    title: 'Compact segment tree',
    detail:
      'It is a segment tree squeezed into one array. The shape is implied by bit patterns instead of explicit node pointers.',
  },
]

const coreConcepts = [
  {
    heading: 'Indexing discipline',
    bullets: [
      'Fenwick trees are typically 1-indexed; index 0 is unused to keep lowbit math clean.',
      'lowbit(i) = i & -i gives the size of the range stored at index i.',
      'Node i aggregates the range (i - lowbit(i) + 1) to i.',
    ],
  },
  {
    heading: 'Prefix sum query',
    bullets: [
      'Initialize sum = 0 and walk i = i - lowbit(i) until i becomes 0.',
      'Each step adds a pre-aggregated bucket, so query cost is O(log n).',
      'Range sum [l..r] = prefix(r) - prefix(l - 1).',
    ],
  },
  {
    heading: 'Point update',
    bullets: [
      'To add delta at index i, update all buckets that include i.',
      'Walk i = i + lowbit(i) until i exceeds n.',
      'Each update touches O(log n) nodes, preserving fast queries.',
    ],
  },
  {
    heading: 'Linear build',
    bullets: [
      'Seed tree[i] with the array values, then add tree[i] to tree[i + lowbit(i)].',
      'This builds in O(n) instead of O(n log n) repeated updates.',
      'Use it when initializing from static data before online updates.',
    ],
  },
  {
    heading: 'Order statistics',
    bullets: [
      'Binary lifting can find the smallest index where prefix >= k.',
      'Useful for selecting the k-th element in a multiset.',
      'Requires non-negative frequencies to keep prefix monotonic.',
    ],
  },
  {
    heading: '2D extension',
    bullets: [
      'Nest Fenwick trees for each dimension to support rectangle sums.',
      'Update and query are O(log^2 n) with higher constants.',
      'Best for sparse or moderate grids when full prefix tables are too large.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Time cost',
    detail:
      'Point updates and prefix queries are O(log n). Range sums use two prefixes. Constants are small due to tight loops and cache-friendly memory.',
  },
  {
    title: 'Space cost',
    detail:
      'Uses n + 1 entries. A 1,000,000 element tree with 64-bit values costs about 8 MB, much less than a 4n segment tree.',
  },
  {
    title: 'Initialization',
    detail:
      'Naive builds with updates cost O(n log n). Linear build is O(n) and preferred when loading from arrays.',
  },
  {
    title: 'Constraints',
    detail:
      'Supports associative operations that decompose by prefixes (sum, count). Not ideal for min/max without extra tricks.',
  },
]

const realWorldUses = [
  {
    context: 'Streaming counters',
    detail:
      'Maintain rolling counts for telemetry and analytics, updating bins while answering prefix statistics in log time.',
  },
  {
    context: 'Order statistics',
    detail:
      'Pick the k-th item in a multiset (e.g., scheduling, load balancing) using binary lifting on prefix sums.',
  },
  {
    context: 'Inversion counting',
    detail:
      'Coordinate compress values and track how many smaller elements have appeared so far.',
  },
  {
    context: 'Fenwick for text editors',
    detail:
      'Track line lengths to translate between (line, column) and file offsets when edits occur.',
  },
  {
    context: 'Game leaderboards',
    detail:
      'Maintain score frequencies and quickly answer percentile or rank queries with prefix sums.',
  },
  {
    context: '2D heatmaps',
    detail:
      'Use a 2D Fenwick for dynamic grid counts in dashboards and sensor maps.',
  },
]

const examples = [
  {
    title: 'Core update and prefix query',
    code: `// 1-indexed Fenwick tree
function add(i, delta):
    while i <= n:
        tree[i] += delta
        i += i & -i

function prefixSum(i):
    sum = 0
    while i > 0:
        sum += tree[i]
        i -= i & -i
    return sum`,
    explanation:
      'Updates climb to all buckets that include index i. Prefix queries descend by clearing the lowbit to accumulate buckets.',
  },
  {
    title: 'Range query using two prefixes',
    code: `function rangeSum(l, r):
    if r < l: return 0
    return prefixSum(r) - prefixSum(l - 1)`,
    explanation:
      'Fenwick trees are prefix data structures. Range sums are derived by subtracting two prefix totals.',
  },
  {
    title: 'Linear-time build',
    code: `// tree is 1-indexed, values is 1-indexed input
for i in 1..n:
    tree[i] += values[i]
    j = i + (i & -i)
    if j <= n: tree[j] += tree[i]`,
    explanation:
      'Each node contributes its bucket sum to the next parent bucket, building the structure in O(n).',
  },
  {
    title: 'Find k-th element by frequency',
    code: `// smallest idx with prefixSum(idx) >= k
function kth(k):
    idx = 0
    bit = highestPowerOfTwoAtMost(n)
    while bit != 0:
        next = idx + bit
        if next <= n && tree[next] < k:
            k -= tree[next]
            idx = next
        bit >>= 1
    return idx + 1`,
    explanation:
      'Binary lifting walks the implicit tree to locate the k-th element in O(log n). Requires non-negative frequencies.',
  },
]

const pitfalls = [
  'Mixing 0-indexed arrays with 1-indexed formulas leads to off-by-one errors.',
  'Forgetting to use a wide enough type for sums; prefix sums can overflow 32-bit ints.',
  'Using negative frequencies and then applying order-statistic queries breaks monotonicity.',
  'Building with O(n log n) updates when a linear build is available.',
  'Assuming Fenwick supports arbitrary range updates or min/max queries without extra transforms.',
]

const decisionGuidance = [
  'Need fast prefix sums with point updates and minimal memory: choose Fenwick.',
  'Need range updates or min/max queries: use a segment tree or a different structure.',
  'Working with sparse large keys: coordinate compress and then apply Fenwick.',
  'Need 2D or 3D grid updates with moderate sizes: use a multi-dimensional Fenwick.',
  'Need only static ranges: prefix-sum arrays beat Fenwick with O(1) queries.',
]

const advancedInsights = [
  {
    title: 'Fenwick for range update + point query',
    detail:
      'Store a difference array inside Fenwick so you can add delta to a range and query single points. Two trees can extend this to range sum queries.',
  },
  {
    title: 'Binary lifting explains the shape',
    detail:
      'The implicit tree is a binary trie over indices. Binary lifting reuses the same lowbit logic to navigate without recursion.',
  },
  {
    title: 'Coordinate compression first',
    detail:
      'Map sparse keys to dense indices to keep the tree small and preserve O(log n) updates on large value ranges.',
  },
  {
    title: 'Cache efficiency is a feature',
    detail:
      'Fenwick loops touch contiguous memory with predictable strides, often beating segment trees for pure prefix sums.',
  },
]

const takeaways = [
  'Fenwick trees are the lightest structure for dynamic prefix sums.',
  'lowbit drives both update and query; keep indices 1-based to avoid bugs.',
  'Range sums are just two prefix sums, keeping the API minimal.',
  'Binary lifting unlocks order statistics when counts are non-negative.',
  'Use segment trees only when you need more expressive queries or updates.',
]

export default function FenwickTreePrefixSumsPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Fenwick Tree (Prefix Sums)</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">A compact data structure for fast dynamic prefix sums</div>
              <p className="win95-text">
                Fenwick trees (binary indexed trees) keep prefix sums and frequencies fast while using only a single array.
                They shine when updates are frequent, queries are prefix-based, and memory or constant factors matter.
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
                A Fenwick tree stores partial sums in buckets determined by the lowest set bit of each index. This creates
                a structure that answers prefix sums in O(log n) time and applies point updates in O(log n), while using only
                n + 1 storage.
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
            <legend>How it works: structure and operations</legend>
            <div className="win95-grid win95-grid-3">
              {coreConcepts.map((block) => (
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
                Fenwick trees are ideal when your query is a prefix sum and your update is a point change. When you need
                full range updates, min/max, or complex aggregates, a segment tree or other structure is a better fit.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Operation summary</legend>
            <div className="win95-panel">
              <table className="win95-table">
                <thead>
                  <tr>
                    <th>Operation</th>
                    <th>Time</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Point update</td>
                    <td>O(log n)</td>
                    <td>Update buckets using i += lowbit(i).</td>
                  </tr>
                  <tr>
                    <td>Prefix sum</td>
                    <td>O(log n)</td>
                    <td>Accumulate buckets using i -= lowbit(i).</td>
                  </tr>
                  <tr>
                    <td>Range sum</td>
                    <td>O(log n)</td>
                    <td>prefix(r) - prefix(l - 1).</td>
                  </tr>
                  <tr>
                    <td>Build from array</td>
                    <td>O(n)</td>
                    <td>Propagate each bucket once.</td>
                  </tr>
                  <tr>
                    <td>k-th by frequency</td>
                    <td>O(log n)</td>
                    <td>Binary lifting on prefix sums.</td>
                  </tr>
                </tbody>
              </table>
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

