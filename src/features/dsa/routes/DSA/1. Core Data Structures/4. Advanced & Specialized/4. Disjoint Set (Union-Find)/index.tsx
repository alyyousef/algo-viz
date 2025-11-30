import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const historicalMoments = [
  {
    title: 'Galler and Fischer formalize disjoint sets (1964)',
    detail:
      'They introduced union by rank and path compression, showing how to maintain merging sets with near-constant amortized time.',
  },
  {
    title: 'Tarjan proves inverse Ackermann bound (1975)',
    detail:
      'Robert Tarjan analyzed union-find with rank and compression to run in O(alpha(n)) amortized, effectively constant for any practical n.',
  },
  {
    title: 'Kruskal’s MST popularizes the structure (1956, adopted widely later)',
    detail:
      'Kruskal’s algorithm relies on disjoint sets to test connectivity while adding edges in weight order, cementing union-find as a graph workhorse.',
  },
  {
    title: 'Offline dynamic connectivity (1990s-2000s)',
    detail:
      'Researchers used rollback-capable union-find to answer connectivity queries over time, enabling efficient offline algorithms for edge additions and deletions.',
  },
  {
    title: 'DSU on tree / small-to-large merges (2010s)',
    detail:
      'Competitive programming and systems engineering adopted size-biased merging on trees to maintain component statistics with tight constants.',
  },
]

const mentalModels = [
  {
    title: 'Club memberships',
    detail:
      'Each element belongs to a club identified by a leader. Union is two club presidents agreeing to merge their memberships under one leader.',
  },
  {
    title: 'Trees of delegates',
    detail:
      'Parents are delegates pointing toward the leader. Path compression asks each delegate to route directly to the leader, flattening bureaucracy.',
  },
  {
    title: 'Component IDs as passports',
    detail:
      'find(x) is stamping a passport with the component’s ID. After compression, future stamps happen in O(1) because you go straight to the embassy.',
  },
  {
    title: 'Rank/size as a height budget',
    detail:
      'Union by rank or size keeps trees shallow by attaching the shorter tree under the taller one, preventing linked-list shaped worst cases.',
  },
]

const mechanics = [
  {
    heading: 'Core operations',
    bullets: [
      'make-set(x): initialize parent[x] = x and size[x] = 1 or rank[x] = 0.',
      'find(x): follow parents to the root; path compress by pointing nodes directly to the root on the way back.',
      'union(a, b): find leaders, then attach the smaller/rank-lower tree to the larger/higher one; update size or rank.',
    ],
  },
  {
    heading: 'Complexity intuition',
    bullets: [
      'With union by rank/size plus path compression, amortized time per operation is O(alpha(n)) where alpha is inverse Ackermann.',
      'alpha(n) < 5 for any realistic input (even up to 10^80), so performance is effectively constant-time.',
      'Space is O(n) for parent and one auxiliary array (rank or size).',
    ],
  },
  {
    heading: 'Variants',
    bullets: [
      'Union by size vs rank: size tracks node counts; rank approximates tree height. Both keep trees shallow.',
      'Rollback DSU: maintain a stack of changes so you can undo unions for offline dynamic connectivity or backtracking search.',
      'DSU with metadata: store component sums, min/max, or custom aggregates updated during union.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Amortized performance',
    detail:
      'm operations on n elements run in O(m alpha(n)); for m ~ n ~ 1e6, alpha(n) is about 4. That means a few pointer hops per operation in practice.',
  },
  {
    title: 'Memory footprint',
    detail:
      'Two int arrays of length n (parent and rank/size). For n = 1e6 with 4-byte ints, about 8 MB. Add metadata arrays as needed.',
  },
  {
    title: 'Parallel and cache effects',
    detail:
      'Path compression improves locality for future finds. Heavy contention on shared parents can hurt parallel performance, so concurrent variants use disjoint sets with atomic CAS or batching.',
  },
]

const realWorld = [
  {
    context: 'Minimum spanning trees',
    detail:
      'Kruskal’s algorithm uses union-find to skip edges that connect already-joined components, keeping MST construction at O(E log V) dominated by sorting.',
  },
  {
    context: 'Image processing',
    detail:
      'Connected-component labeling groups pixels into regions by unioning adjacent pixels that meet criteria, enabling blob detection and segmentation.',
  },
  {
    context: 'Networking and percolation',
    detail:
      'Union-find tracks connected clusters in simulations of percolation, social networks, or disjoint subnet detection without repeated graph traversals.',
  },
  {
    context: 'Compilers and constraint solvers',
    detail:
      'Type unification and congruence closure merge equivalent symbols. SMT solvers use union-find to maintain equivalence classes efficiently.',
  },
  {
    context: 'Dynamic sets in games',
    detail:
      'Territory control, guild merges, or region ownership can be tracked with union-find to answer “same faction?” queries in near constant time.',
  },
]

const examples = [
  {
    title: 'Union-find with path compression and union by size',
    code: `function makeSet(n):
    parent = [0..n-1]
    size = [1]*n
    for i in 0..n-1: parent[i] = i
    return parent, size

function find(x):
    if parent[x] != x:
        parent[x] = find(parent[x])  // path compression
    return parent[x]

function union(a, b):
    ra = find(a); rb = find(b)
    if ra == rb: return
    if size[ra] < size[rb]: swap(ra, rb)
    parent[rb] = ra
    size[ra] += size[rb]`,
    explanation:
      'Compression flattens trees over time; size-based attachment limits height growth. Together they deliver the inverse Ackermann bound.',
  },
  {
    title: 'Kruskal’s MST using union-find',
    code: `function kruskal(V, edges):
    sort edges by weight
    uf = makeSet(V)
    mst = []
    for (u, v, w) in edges:
        if find(u) != find(v):
            mst.append((u, v, w))
            union(u, v)
    return mst`,
    explanation:
      'Union-find ensures only edges that connect different components enter the MST. Complexity hinges on sorting; unions are near O(1).',
  },
  {
    title: 'Rollback union-find (outline)',
    code: `stack changes

function union(a, b):
    ra = find(a); rb = find(b)
    if ra == rb: push(changes, null); return
    if rank[ra] < rank[rb]: swap(ra, rb)
    push(changes, (rb, parent[rb], rank[ra]))
    parent[rb] = ra
    if rank[ra] == rank[rb]: rank[ra] += 1

function rollback():
    change = pop(changes)
    if change == null: return
    (node, oldParent, oldRank) = change
    parent[node] = oldParent
    rank[parent[node]] = oldRank`,
    explanation:
      'Rollback keeps a stack of modifications so time-travel queries can undo unions. Used in offline dynamic connectivity and backtracking search.',
  },
]

const pitfalls = [
  'Skipping path compression or union by size/rank degrades performance to near-linear in adversarial sequences.',
  'Mixing zero-based arrays with one-based input without careful translation leads to out-of-bounds or incorrect parents.',
  'Forgetting to initialize every element to parent[i] = i leaves phantom connections and incorrect components.',
  'Storing metadata per component but not updating it during union produces stale aggregates.',
  'In rollback DSU, forgetting to record no-op unions breaks stack alignment and corrupts later rollbacks.',
]

const decisionGuidance = [
  'Use union-find for connectivity queries where edges are added over time and deletions are rare or handled offline.',
  'Use BFS/DFS when the graph is small or fully known and you only need one-shot components; union-find shines when queries interleave with updates.',
  'Use union-find in MST (Kruskal) or clustering pipelines where you need to test component membership repeatedly.',
  'Use rollback or persistent variants when you need historical states or offline processing with edge deletions.',
  'Avoid union-find for weighted shortest paths or flows; it only tracks connectivity, not distances or capacities.',
]

const advancedInsights = [
  {
    title: 'DSU on tree / small-to-large',
    detail:
      'When aggregating data on trees, attach smaller child data structures into larger ones to keep total merges O(n log n) with low constants, inspired by union-by-size.',
  },
  {
    title: 'Parallel and lock-free variants',
    detail:
      'Concurrent union-find uses atomic compare-and-swap to compress paths without locks, or batches unions to reduce contention on hot parents.',
  },
  {
    title: 'Component metadata',
    detail:
      'Attach sums, counts, min/max, or custom monoids to roots; merge them during union to answer “component value” queries instantly.',
  },
  {
    title: 'Euler tour plus rollback for offline deletions',
    detail:
      'Process edge additions/removals over time with segment-tree-over-time plus rollback DSU to answer connectivity queries in O((n + q) log n).',
  },
]

const takeaways = [
  'Union-find with path compression and union by size/rank runs in near-constant amortized time for connectivity maintenance.',
  'It excels at dynamic connectivity, MST construction, and equivalence-class maintenance with minimal memory.',
  'Variants like rollback and metadata-aware DSU extend its reach to offline dynamic graphs and aggregated component queries.',
  'Performance collapses without compression or size-aware unions, so always enable both unless you have a proven reason not to.',
]

export default function DisjointSetPage(): JSX.Element {
  return (
    <TopicLayout
      title="Disjoint Set (Union-Find)"
      subtitle="Maintain dynamic connectivity with near-constant operations"
      intro="Disjoint sets answer a simple question fast: are two elements in the same component, and if not, merge their components. With path compression and union by size or rank, the data structure delivers almost O(1) amortized finds and unions, making it indispensable for connectivity-heavy algorithms from Kruskal’s MST to connected-component labeling."
    >
      <TopicSection heading="The big picture">
        <p className="text-white/80">
          Graph algorithms repeatedly ask whether two nodes are already connected. Running a full traversal per query is wasteful.
          Union-find maintains a forest of shallow trees so that each query or merge touches only a handful of pointers, no matter
          how many elements you track. The cost depends on the inverse Ackermann function, which is smaller than 5 for any
          realistic input size.
        </p>
      </TopicSection>

      <TopicSection heading="Historical context">
        <div className="grid gap-3 md:grid-cols-2">
          {historicalMoments.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Core concept and mental models">
        <div className="grid gap-3 md:grid-cols-2">
          {mentalModels.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="How it works: structure and operations">
        <div className="grid gap-3 md:grid-cols-3">
          {mechanics.map((block) => (
            <article key={block.heading} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{block.heading}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/80">
                {block.bullets.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Complexity analysis and performance intuition">
        <div className="grid gap-3 md:grid-cols-2">
          {complexityNotes.map((note) => (
            <article key={note.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h4 className="text-sm font-semibold text-white">{note.title}</h4>
              <p className="text-sm text-white/80">{note.detail}</p>
            </article>
          ))}
        </div>
        <p className="mt-3 text-sm text-white/70">
          Inverse Ackermann growth means you can treat the cost as constant in benchmarks. Micro-optimizations often focus on
          cache friendliness (iterative find, flattening) rather than asymptotics.
        </p>
      </TopicSection>

      <TopicSection heading="Real-world applications">
        <div className="grid gap-3 md:grid-cols-2">
          {realWorld.map((item) => (
            <article key={item.context} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.context}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Practical examples">
        <div className="space-y-4">
          {examples.map((example) => (
            <article key={example.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{example.title}</p>
              <pre className="mt-2 overflow-x-auto rounded bg-black/40 p-3 text-xs text-white/90">
                <code>{example.code}</code>
              </pre>
              <p className="text-sm text-white/80">{example.explanation}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Common pitfalls">
        <ul className="list-disc space-y-2 pl-5 text-sm text-white/80">
          {pitfalls.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </TopicSection>

      <TopicSection heading="When to use it">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/80">
          {decisionGuidance.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </TopicSection>

      <TopicSection heading="Advanced insights and current frontiers">
        <div className="grid gap-3 md:grid-cols-2">
          {advancedInsights.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Key takeaways">
        <div className="rounded-lg border border-emerald-400/40 bg-emerald-500/10 p-4">
          <ul className="list-disc space-y-2 pl-5 text-sm text-emerald-100">
            {takeaways.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </TopicSection>
    </TopicLayout>
  )
}
