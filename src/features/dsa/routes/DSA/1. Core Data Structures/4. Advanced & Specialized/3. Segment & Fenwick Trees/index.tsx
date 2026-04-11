import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

const historicalMoments = [
  {
    title: 'Range trees for computational geometry (1970s)',
    detail:
      'Bentley and others explored hierarchical range decomposition to answer orthogonal range queries, laying conceptual groundwork for segment trees.',
  },
  {
    title: 'Segment trees popularized in competitive programming (1980s-1990s)',
    detail:
      'As ICPC and IOI problems needed fast range queries with point updates, segment trees became the standard teaching tool for O(log n) queries.',
  },
  {
    title: 'Fenwick publishes Binary Indexed Tree (1994)',
    detail:
      'Peter Fenwick introduced a cache-friendly alternative to segment trees for cumulative sums, using bit tricks to climb a tree encoded in an array.',
  },
  {
    title: 'Wavelet trees and implicit segment trees (2000s)',
    detail:
      'Researchers extended the idea to support order statistics, compressed storage, and sparse coordinate ranges without preallocating all nodes.',
  },
  {
    title: 'Parallel and lazy segment trees mature (2010s)',
    detail:
      'Lazy propagation and parallel builds became standard in analytics engines and game engines to maintain many range updates at scale.',
  },
]

const mentalModels = [
  {
    title: 'Interval accounting',
    detail:
      'Imagine each node as an accountant responsible for a segment of the array. To answer a query, you combine the reports of accountants whose regions exactly cover the asked interval.',
  },
  {
    title: 'Binary decomposition of ranges',
    detail:
      'Any range can be decomposed into at most 2 log n canonical segments. The tree precomputes answers for these canonical pieces, so queries are just a small merge of pieces.',
  },
  {
    title: 'Fenwick as bit-walking',
    detail:
      'Fenwick trees treat indices as bit masks. Dropping the least significant set bit moves you upward, adding it moves you downward. This keeps code tiny and cache friendly.',
  },
  {
    title: 'Lazy updates as deferred maintenance',
    detail:
      'When an update covers a whole node range, you tag it instead of pushing work to children immediately. You do the minimum work now and push the rest only when needed.',
  },
]

const mechanics = [
  {
    heading: 'Structure',
    bullets: [
      'Segment tree: full binary tree over array indices; node covers [l, r] and stores an aggregate (sum, min, max, gcd). Stored as an array of size about 4n.',
      'Fenwick tree: 1-indexed array where tree edges are encoded with lowbit operations. Node i aggregates a range of size lowbit(i) ending at i.',
      'Neutral elements: define identity for merge (0 for sum, +inf for min, -inf for max, 1 for product).',
    ],
  },
  {
    heading: 'Operations',
    bullets: [
      'Segment tree point update: walk from leaf to root updating aggregates. O(log n).',
      'Segment tree range query: descend recursively or iteratively combining nodes that exactly tile the query interval. O(log n).',
      'Fenwick prefix query: climb by clearing lowbit(i) and accumulating. O(log n). Range query uses two prefixes: prefix(r) - prefix(l-1).',
    ],
  },
  {
    heading: 'Lazy propagation (segment tree)',
    bullets: [
      'Store a lazy tag per node representing a pending update for its entire range.',
      'On query or partial overlap, push the tag to children before descending to preserve correctness.',
      'Supports range updates plus range queries in O(log n), for example add c to [l, r] or set range to value with custom merge rules.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Time complexity',
    detail:
      'Segment tree: O(log n) for point update and range query; with lazy, range update also O(log n). Fenwick: O(log n) for prefix query and point update.',
  },
  {
    title: 'Space complexity',
    detail:
      'Segment tree uses about 4n nodes. Fenwick uses n + 1 entries. For a million elements, a sum segment tree with 64-bit values uses about 32 MB; Fenwick uses about 8 MB.',
  },
  {
    title: 'Constants and cache',
    detail:
      'Fenwick trees are a single array with tight loops, often 1.5x to 2x faster for prefix sums than segment trees due to fewer cache misses. Segment trees win when you need richer queries or lazy updates.',
  },
  {
    title: 'Build costs',
    detail:
      'Segment tree builds in O(n) bottom-up. Fenwick can also build in O(n) by seeding the array and adding lowbit spans instead of n log n naive updates.',
  },
]

const realWorld = [
  {
    context: 'Realtime analytics',
    detail:
      'Rolling sums, counts, and percentiles over sliding windows use segment trees or Fenwick trees to keep latency bounded as event streams grow.',
  },
  {
    context: 'Gaming and graphics',
    detail:
      '2D and 3D range updates (for example, area damage, lighting) use multi-dimensional Fenwick or segment trees to apply updates quickly and query regions each frame.',
  },
  {
    context: 'Text editors and IDEs',
    detail:
      'Gap buffers track cumulative line lengths with Fenwick trees to translate between (line, column) and byte offsets in O(log n).',
  },
  {
    context: 'Databases and indices',
    detail:
      'Column stores maintain segment trees for min/max to accelerate predicate pruning, while Fenwick trees appear in adaptive histogram maintenance.',
  },
  {
    context: 'Networking and OS scheduling',
    detail:
      'Token buckets and rate limiters use segment-like trees to aggregate quotas; schedulers track cumulative weights to pick the k-th task by prefix sum.',
  },
]

const examples = [
  {
    title: 'Fenwick tree core',
    code: `function lowbit(i):
    return i & -i

function add(bit, idx, delta):  // 1-indexed
    while idx < bit.length:
        bit[idx] += delta
        idx += lowbit(idx)

function prefix(bit, idx):
    res = 0
    while idx > 0:
        res += bit[idx]
        idx -= lowbit(idx)
    return res

function rangeQuery(bit, l, r):
    return prefix(bit, r) - prefix(bit, l - 1)`,
    explanation:
      'Each index covers a power-of-two range ending at idx. Updates climb via adding the lowest set bit; queries climb by clearing it. Code stays tiny and branch-light.',
  },
  {
    title: 'Iterative segment tree build and query',
    code: `// tree size = 2n; leaves at [n, 2n)
function build(tree, arr, n):
    for i in range(n):
        tree[n + i] = arr[i]
    for i in range(n - 1, 0, -1):
        tree[i] = tree[i << 1] + tree[i << 1 | 1]

function update(tree, n, pos, val):
    i = pos + n
    tree[i] = val
    while i > 1:
        i >>= 1
        tree[i] = tree[i << 1] + tree[i << 1 | 1]

function query(tree, n, l, r):  // inclusive-exclusive [l, r)
    res = 0
    l += n; r += n
    while l < r:
        if l & 1: res += tree[l]; l += 1
        if r & 1: r -= 1; res += tree[r]
        l >>= 1; r >>= 1
    return res`,
    explanation:
      'Iterative representation keeps data contiguous and avoids recursion overhead. Query splits the interval into at most 2 log n segments.',
  },
  {
    title: 'Lazy propagation for range add, range sum',
    code: `function push(node, l, r):
    if lazy[node] != 0:
        mid = (l + r) // 2
        apply(childLeft, l, mid, lazy[node])
        apply(childRight, mid+1, r, lazy[node])
        lazy[node] = 0

function update(node, l, r, ql, qr, delta):
    if qr < l or r < ql: return
    if ql <= l and r <= qr:
        apply(node, l, r, delta)
        return
    push(node, l, r)
    mid = (l + r) // 2
    update(node*2, l, mid, ql, qr, delta)
    update(node*2+1, mid+1, r, ql, qr, delta)
    tree[node] = tree[node*2] + tree[node*2+1]`,
    explanation:
      'apply updates the node aggregate and stores a pending tag. push ensures children see pending updates before further recursion. This keeps both range updates and queries at O(log n).',
  },
]

const pitfalls = [
  'Mixing 0-indexed arrays with 1-indexed Fenwick formulas causes off-by-one errors. Keep the tree 1-indexed or adjust formulas consistently.',
  'Forgetting neutral elements leads to wrong merges. Each aggregate needs a correct identity (0 for sum, infinity for min).',
  'Not pushing lazy tags before descending yields stale children and wrong answers.',
  'Building Fenwick with n log n updates is unnecessary; use linear build to avoid a large startup cost.',
  'Segment tree memory can balloon if you naively allocate 4n for sparse coordinates. Use coordinate compression or implicit trees for large, sparse indices.',
]

const decisionGuidance = [
  'Pick a Fenwick tree for prefix sums and point updates when memory and cache friendliness matter and you do not need complex range updates.',
  'Pick a segment tree for arbitrary associative aggregates or when you need range updates (with lazy propagation).',
  'Pick an iterative segment tree when you want tight loops and no recursion; pick a recursive one when clarity matters and n is moderate.',
  'Pick a 2D Fenwick or segment tree if you truly need orthogonal 2D range sums; otherwise prefer sweep-line or prefix-sum grids for simplicity.',
  'If updates are rare and queries dominate, consider a sparse segment tree or offline prefix sums instead of maintaining heavy structures.',
]

const advancedInsights = [
  {
    title: 'Double and multidimensional variants',
    detail:
      'Fenwick and segment trees extend to 2D or 3D by nesting structures. Complexity becomes O(log^d n) with d dimensions but constants grow quickly.',
  },
  {
    title: 'Order statistics via Fenwick',
    detail:
      'You can find the k-th element in a multiset by binary searching over Fenwick prefix sums, a trick used in schedulers and median maintenance.',
  },
  {
    title: 'Implicit and dynamic segment trees',
    detail:
      'Allocate nodes lazily as queries touch them, enabling huge coordinate ranges (for example, 10^9) without allocating 4n upfront.',
  },
  {
    title: 'Persistent segment trees',
    detail:
      'Path-copying during updates yields versioned trees. Functional languages and time-travel debugging tools use this to query historical states in O(log n).',
  },
]

const takeaways = [
  'Both structures give O(log n) updates and queries, but Fenwick trees are lighter while segment trees are more expressive.',
  'Memory and cache behavior often decide the choice as much as asymptotics.',
  'Lazy propagation turns segment trees into a powerful range-update engine without losing logarithmic bounds.',
  'Pick the variant that matches your aggregate and update pattern; do not overpay with 4n memory when a Fenwick suffices.',
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
    { id: 'the-big-picture', label: 'The big picture' },
    { id: 'historical-context', label: 'Historical context' },
    { id: 'real-world-applications', label: 'Real-world applications' },
  ],
  'core-concepts': [
    { id: 'core-concept-and-mental-models', label: 'Core concept and mental models' },
    {
      id: 'how-it-works-structure-and-operations',
      label: 'How it works: structure and operations',
    },
    {
      id: 'complexity-analysis-and-performance-intuition',
      label: 'Complexity analysis and performance intuition',
    },
    {
      id: 'advanced-insights-and-current-frontiers',
      label: 'Advanced insights and current frontiers',
    },
  ],
  examples: [{ id: 'practical-examples', label: 'Practical examples' }],
  takeaways: [
    { id: 'common-pitfalls', label: 'Common pitfalls' },
    { id: 'when-to-use-it', label: 'When to use it' },
    { id: 'key-takeaways', label: 'Key takeaways' },
  ],
}

export default function SegmentFenwickPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Segment & Fenwick Trees',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Segment & Fenwick Trees"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Segment &amp; Fenwick Trees</h1>
      <p className="bin98-doc-subtitle">Range queries and updates with logarithmic guarantees.</p>

      {activeTab === 'big-picture' && (
        <>
          <section id="overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            <div className="bin98-subheading">
              Range queries and updates with logarithmic guarantees
            </div>
            <p>
              Segment trees and Fenwick trees are the workhorses for range queries on arrays. They
              provide predictable O(log n) bounds even as data changes, trading modest memory for
              versatility. This page explores how they work, when to choose one over the other, and
              the engineering details that make them fast in practice.
            </p>
          </section>

          <section id="the-big-picture" className="bin98-section">
            <h2 className="bin98-heading">The big picture</h2>
            <div className="bin98-section">
              <p>
                Arrays answer random access in O(1) but struggle with dynamic range sums, mins, or
                maxes. Recomputing from scratch is O(n); both segment and Fenwick trees organize
                partial aggregates so every query or update touches only O(log n) nodes. The choice
                hinges on how rich your aggregates and updates must be and how much memory and cache
                locality you can spare.
              </p>
            </div>
          </section>

          <section id="historical-context" className="bin98-section">
            <h2 className="bin98-heading">Historical context</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {historicalMoments.map((item) => (
                <div key={item.title} className="bin98-section">
                  <div className="bin98-subheading">{item.title}</div>
                  <p>{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="real-world-applications" className="bin98-section">
            <h2 className="bin98-heading">Real-world applications</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {realWorld.map((item) => (
                <div key={item.context} className="bin98-section">
                  <div className="bin98-subheading">{item.context}</div>
                  <p>{item.detail}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {activeTab === 'core-concepts' && (
        <>
          <section id="core-concept-and-mental-models" className="bin98-section">
            <h2 className="bin98-heading">Core concept and mental models</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {mentalModels.map((item) => (
                <div key={item.title} className="bin98-section">
                  <div className="bin98-subheading">{item.title}</div>
                  <p>{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="how-it-works-structure-and-operations" className="bin98-section">
            <h2 className="bin98-heading">How it works: structure and operations</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {mechanics.map((block) => (
                <div key={block.heading} className="bin98-section">
                  <div className="bin98-subheading">{block.heading}</div>
                  <ul className="list-disc pl-5 space-y-2">
                    {block.bullets.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section id="complexity-analysis-and-performance-intuition" className="bin98-section">
            <h2 className="bin98-heading">Complexity analysis and performance intuition</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {complexityNotes.map((note) => (
                <div key={note.title} className="bin98-section">
                  <div className="bin98-subheading">{note.title}</div>
                  <p>{note.detail}</p>
                </div>
              ))}
            </div>
            <div className="bin98-section">
              <p>
                Measure constants: in practice Fenwick trees often beat segment trees for prefix
                sums due to tighter loops, while segment trees pay off when you need lazy range
                updates or non-invertible merges like min with range assignment.
              </p>
            </div>
          </section>

          <section id="advanced-insights-and-current-frontiers" className="bin98-section">
            <h2 className="bin98-heading">Advanced insights and current frontiers</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {advancedInsights.map((item) => (
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
          <section id="practical-examples" className="bin98-section">
            <h2 className="bin98-heading">Practical examples</h2>
            <div className="space-y-4">
              {examples.map((example) => (
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
          <section id="common-pitfalls" className="bin98-section">
            <h2 className="bin98-heading">Common pitfalls</h2>
            <div className="bin98-section">
              <ul className="list-disc pl-5 space-y-2">
                {pitfalls.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section id="when-to-use-it" className="bin98-section">
            <h2 className="bin98-heading">When to use it</h2>
            <div className="bin98-section">
              <ol className="list-decimal pl-5 space-y-2">
                {decisionGuidance.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </section>

          <section id="key-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key takeaways</h2>
            <div className="bin98-section">
              <ul className="list-disc pl-5 space-y-2">
                {takeaways.map((item) => (
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
