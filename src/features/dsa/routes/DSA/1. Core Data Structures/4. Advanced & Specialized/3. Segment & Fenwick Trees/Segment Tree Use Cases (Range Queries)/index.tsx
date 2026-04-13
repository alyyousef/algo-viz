import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

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

const terminology = [
  {
    term: 'Segment',
    detail: 'A contiguous interval [l, r] represented by a node.',
  },
  {
    term: 'Merge function',
    detail: 'Associative function combining two child summaries into a parent.',
  },
  {
    term: 'Identity element',
    detail: 'Neutral value for merge (0 for sum, +inf for min, -inf for max).',
  },
  {
    term: 'Lazy tag',
    detail: 'Deferred update stored at a node to be pushed when needed.',
  },
  {
    term: 'Query cover',
    detail: 'A range query decomposes into a minimal set of fully covered nodes.',
  },
]

const invariants = [
  {
    title: 'Correct summaries',
    detail: 'Every node must reflect the merge of its children or the base value at a leaf.',
  },
  {
    title: 'Lazy consistency',
    detail: 'Pending updates must be applied or propagated before using child data.',
  },
  {
    title: 'Associativity',
    detail: 'Merge order should not change results; otherwise queries can break.',
  },
  {
    title: 'Range boundaries',
    detail: 'All nodes respect inclusive boundaries and align with input indices.',
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
      'Common in interval scheduling, ?paint? problems, and batch adjustments.',
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

const updateTypes = [
  {
    title: 'Point update',
    detail: 'Change a single value and recompute along the root path.',
  },
  {
    title: 'Range add',
    detail: 'Add delta to all values in [l, r] with lazy propagation.',
  },
  {
    title: 'Range assign',
    detail: 'Overwrite a range with a fixed value; needs assignment lazy tags.',
  },
  {
    title: 'Range min/max chmin/chmax',
    detail: 'Segment tree beats support conditional range updates efficiently.',
  },
]

const buildOptions = [
  {
    title: 'Recursive build',
    detail: 'Build with divide-and-conquer; easy to reason about.',
  },
  {
    title: 'Iterative build',
    detail: 'Store leaves at n..2n and build parents downward; cache-friendly.',
  },
  {
    title: 'Lazy initialization',
    detail: 'Create nodes on demand for sparse arrays to save memory.',
  },
]

const lazyPropagationNotes = [
  {
    title: 'Push down',
    detail: 'Before visiting children, apply pending updates to them.',
  },
  {
    title: 'Compose tags',
    detail: 'Range add and range assign tags must combine in the correct order.',
  },
  {
    title: 'Query correctness',
    detail: 'If a node is fully covered, you can return its summary without exploring children.',
  },
  {
    title: 'Multiple lazy types',
    detail: 'Complex updates require storing more metadata per node.',
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
    detail: 'Update one leaf, then recompute each ancestor. Complexity stays O(log n).',
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

const performanceNotes = [
  {
    title: 'Constants matter',
    detail: 'Segment trees are heavier than Fenwick; iterative versions reduce overhead.',
  },
  {
    title: 'Cache locality',
    detail: 'Array-based trees improve locality versus pointer-based nodes.',
  },
  {
    title: 'Recursion depth',
    detail: 'Deep recursion can overflow on large n; iterative implementations avoid this.',
  },
  {
    title: 'Memory usage',
    detail: 'Storing multiple metrics or lazy tags can double memory footprint.',
  },
]

const realWorldPatterns = [
  {
    title: 'Time series dashboards',
    detail: 'Range sums and maxes over dynamic windows for operational metrics.',
  },
  {
    title: 'Game and simulation maps',
    detail: 'Range buffs, damage fields, and resource totals in map slices.',
  },
  {
    title: 'Financial analytics',
    detail: 'Rolling highs/lows, volatility bands, and live range queries on prices.',
  },
  {
    title: 'Scheduling capacity',
    detail: 'Check capacity and assign work across time slots using range queries.',
  },
]

const examplesExpanded = [
  {
    title: 'Iterative segment tree range sum',
    code: `// leaves at [n..2n)
build(values):
  for i in 0..n-1: tree[n+i] = values[i]
  for i in n-1 down to 1:
    tree[i] = tree[2*i] + tree[2*i+1]

query(l, r): // inclusive
  l += n; r += n
  res = 0
  while l <= r:
    if (l % 2 == 1): res += tree[l++]
    if (r % 2 == 0): res += tree[r--]
    l /= 2; r /= 2
  return res`,
    explanation:
      'Iterative trees avoid recursion and are often faster in practice for tight loops.',
  },
  {
    title: 'Range assign with lazy',
    code: `rangeAssign(node, l, r, value):
  if node.range inside [l, r]:
    node.sum = value * node.length
    node.lazyAssign = value
    node.lazyAdd = 0
    return
  pushDown(node)
  recurse children
  node.sum = left.sum + right.sum`,
    explanation: 'Range assign requires overwriting pending adds; ordering of lazy tags matters.',
  },
  {
    title: 'Max subarray sum node',
    code: `struct Node:
  sum, bestPrefix, bestSuffix, bestSubarray

merge(a, b):
  sum = a.sum + b.sum
  bestPrefix = max(a.bestPrefix, a.sum + b.bestPrefix)
  bestSuffix = max(b.bestSuffix, b.sum + a.bestSuffix)
  bestSubarray = max(a.bestSubarray, b.bestSubarray, a.bestSuffix + b.bestPrefix)`,
    explanation:
      'Storing composite summaries enables queries like maximum subarray sum in O(log n).',
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
    detail: 'Apply damage buffs to map regions and query max health or total resources in a zone.',
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
  'Forgetting to propagate lazy tags before merging children yields wrong summaries.',
  'Mixing 0-based and 1-based indices causes silent range shifts.',
  'Using inclusive ranges in some functions and exclusive in others breaks consistency.',
]

const decisionGuidance = [
  'Need range queries with frequent updates and arbitrary associative operations: use a segment tree.',
  'Need only prefix sums with point updates: a Fenwick tree is simpler and smaller.',
  'Need range updates and range queries: segment tree with lazy propagation is the right fit.',
  'Need immutable history or time travel queries: consider a persistent segment tree.',
  'Need range queries over sparse or huge coordinates: combine with coordinate compression.',
  'Need many offline queries: consider Mo?s algorithm or prefix arrays if updates are rare.',
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
  {
    title: 'Coordinate compression',
    detail:
      'Map sparse coordinates to dense indices for memory-efficient segment trees on large domains.',
  },
  {
    title: 'Hybrid segment + Fenwick',
    detail: 'Use Fenwick for prefix sums and segment trees for min/max when both are needed.',
  },
]

const takeaways = [
  'Segment trees generalize prefix sums to dynamic, arbitrary range queries.',
  'The merge function defines everything: make it associative and pick a safe identity.',
  'Lazy propagation turns expensive range updates into logarithmic work.',
  'When you can express a query as a merged summary, a segment tree is a reliable tool.',
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
    { id: 'bp-patterns', label: 'Range Query Patterns' },
    { id: 'bp-models', label: 'Mental Models' },
    { id: 'bp-uses', label: 'Use Cases' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-terms', label: 'Terminology' },
    { id: 'core-invariants', label: 'Invariants' },
    { id: 'core-query-types', label: 'Query Types' },
    { id: 'core-update-types', label: 'Update Types' },
    { id: 'core-lazy', label: 'Lazy Propagation' },
    { id: 'core-build', label: 'Build Options' },
    { id: 'core-mechanics', label: 'Build/Query Notes' },
    { id: 'core-complexity', label: 'Complexity Notes' },
    { id: 'core-performance', label: 'Performance Notes' },
    { id: 'core-decision', label: 'When to Use It' },
    { id: 'core-advanced', label: 'Advanced Insights' },
    { id: 'core-pitfalls', label: 'Pitfalls' },
  ],
  examples: [
    { id: 'ex-practical', label: 'Practical Examples' },
    { id: 'ex-expanded', label: 'Expanded Examples' },
    { id: 'ex-compare', label: 'Segment vs Fenwick' },
    { id: 'ex-tests', label: 'Testing Checklist' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function SegmentTreeUseCasesRangeQueriesPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Segment Tree Use Cases (Range Queries)',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Segment Tree Use Cases (Range Queries)"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Segment Tree Use Cases (Range Queries)</h1>
      <p>
        Segment trees answer range queries quickly while data changes. They organize an array into
        interval summaries, so any [l, r] query and most updates stay logarithmic.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            <p>
              Range queries ask for aggregates over contiguous intervals: sums, mins, maxes, xor,
              counts, and more. Segment trees keep these summaries dynamic when prefix tables are no
              longer sufficient.
            </p>
          </section>
          <section id="bp-patterns" className="bin98-section">
            <h2 className="bin98-heading">Common Range Query Patterns</h2>
            {rangeQueryPatterns.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="bp-models" className="bin98-section">
            <h2 className="bin98-heading">Mental Models</h2>
            {mentalModels.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="bp-uses" className="bin98-section">
            <h2 className="bin98-heading">Use Cases in Practice</h2>
            {realWorldPatterns.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
            {useCaseGallery.map((item) => (
              <p key={item.context}>
                <strong>{item.context}:</strong> {item.detail}
              </p>
            ))}
          </section>
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
          <section id="core-terms" className="bin98-section">
            <h2 className="bin98-heading">Terminology</h2>
            {terminology.map((item) => (
              <p key={item.term}>
                <strong>{item.term}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-invariants" className="bin98-section">
            <h2 className="bin98-heading">Invariants</h2>
            {invariants.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-query-types" className="bin98-section">
            <h2 className="bin98-heading">Query Types Segment Trees Excel At</h2>
            {queryTypes.map((block) => (
              <div key={block.heading}>
                <h3 className="bin98-subheading">{block.heading}</h3>
                <ul>
                  {block.bullets.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
          <section id="core-update-types" className="bin98-section">
            <h2 className="bin98-heading">Update Types</h2>
            {updateTypes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-lazy" className="bin98-section">
            <h2 className="bin98-heading">Lazy Propagation Notes</h2>
            {lazyPropagationNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-build" className="bin98-section">
            <h2 className="bin98-heading">Build Options</h2>
            {buildOptions.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-mechanics" className="bin98-section">
            <h2 className="bin98-heading">How It Works: Build, Query, Update</h2>
            {buildAndQueryNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-complexity" className="bin98-section">
            <h2 className="bin98-heading">Complexity Analysis and Tradeoffs</h2>
            {complexityNotes.map((note) => (
              <p key={note.title}>
                <strong>{note.title}:</strong> {note.detail}
              </p>
            ))}
          </section>
          <section id="core-performance" className="bin98-section">
            <h2 className="bin98-heading">Performance Notes</h2>
            {performanceNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-decision" className="bin98-section">
            <h2 className="bin98-heading">When to Use It</h2>
            <ol>
              {decisionGuidance.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>
          <section id="core-advanced" className="bin98-section">
            <h2 className="bin98-heading">Advanced Insights</h2>
            {advancedInsights.map((item) => (
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
        </>
      )}

      {activeTab === 'examples' && (
        <>
          <section id="ex-practical" className="bin98-section">
            <h2 className="bin98-heading">Practical Examples</h2>
            {examples.map((example) => (
              <div key={example.title}>
                <h3 className="bin98-subheading">{example.title}</h3>
                <div className="bin98-codebox">
                  <code>{example.code.trim()}</code>
                </div>
                <p>{example.explanation}</p>
              </div>
            ))}
          </section>
          <section id="ex-expanded" className="bin98-section">
            <h2 className="bin98-heading">Expanded Examples</h2>
            {examplesExpanded.map((example) => (
              <div key={example.title}>
                <h3 className="bin98-subheading">{example.title}</h3>
                <div className="bin98-codebox">
                  <code>{example.code.trim()}</code>
                </div>
                <p>{example.explanation}</p>
              </div>
            ))}
          </section>
          <section id="ex-compare" className="bin98-section">
            <h2 className="bin98-heading">Segment Tree vs Fenwick Tree</h2>
            <table className="bin98-table">
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
          </section>
          <section id="ex-tests" className="bin98-section">
            <h2 className="bin98-heading">Testing Checklist</h2>
            <ul>
              <li>Compare segment tree queries with brute-force arrays for random tests.</li>
              <li>Test boundary ranges: [1,1], [n,n], and full range.</li>
              <li>Validate lazy propagation by mixing range updates with queries.</li>
              <li>Ensure identity values are correct for empty and partial overlaps.</li>
              <li>Verify iterative and recursive builds match for the same input.</li>
            </ul>
          </section>
        </>
      )}

      {activeTab === 'glossary' && (
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {terminology.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.detail}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
