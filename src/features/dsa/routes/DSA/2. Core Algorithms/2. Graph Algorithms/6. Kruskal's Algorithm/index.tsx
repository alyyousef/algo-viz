import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const historicalMilestones = [
  {
    title: 'Boruvka sets the stage (1926)',
    detail:
      'Otakar Boruvka published an algorithm for electrifying Moravia, showing how to pick cheapest edges per component to build a minimum-cost network.',
  },
  {
    title: 'Kruskal publishes his greedy algorithm (1956)',
    detail:
      'Joseph Kruskal formalized the sort-edges-then-union approach, proving it optimal via the cut and cycle properties.',
  },
  {
    title: 'Floyd and Warshall streamline graph computation (1960s)',
    detail:
      'Contemporaries refined graph primitives and data structures; Union-Find plus Kruskal became a standard MST recipe.',
  },
  {
    title: 'Tarjan analyzes Union-Find (1975)',
    detail:
      'Robert Tarjan showed path compression and union by rank run in almost constant amortized time, making Kruskal effectively O(E log V) dominated by sorting.',
  },
  {
    title: 'Parallel and clustered MSTs (1990s to today)',
    detail:
      'Boruvka-Kruskal hybrids and batch-sorting variants adapt Kruskal to parallel hardware and clustering pipelines.',
  },
]

const mentalModels = [
  {
    title: 'Cheapest bridges between islands',
    detail:
      'Sort all possible bridges by cost. Add a bridge if it connects two different islands; skip it if it would create a loop. You stop when everyone is connected.',
  },
  {
    title: 'Cycle veto',
    detail:
      'The heaviest edge in any cycle is never needed. Sorting light-to-heavy ensures cycles are broken by refusing edges that close a loop.',
  },
  {
    title: 'Global order, local merges',
    detail:
      'A single global ordering of edges drives purely local decisions about connectivity. Union-Find keeps those connectivity checks constant-time in practice.',
  },
]

const mechanics = [
  {
    heading: 'Prepare the edge list',
    bullets: [
      'Collect all edges as (u, v, w).',
      'Sort by non-decreasing weight. Buckets or radix sort help when weights are small integers.',
    ],
  },
  {
    heading: 'Initialize components',
    bullets: [
      'Make-set for each vertex in a Union-Find.',
      'Optionally shuffle equal-weight edges to stabilize ties if deterministic forests matter.',
    ],
  },
  {
    heading: 'Scan and union',
    bullets: [
      'For each edge in sorted order, find the roots of its endpoints.',
      'If roots differ, union them and accept the edge into the MST/forest.',
      'Stop after V - 1 edges are accepted for each connected component.',
    ],
  },
  {
    heading: 'Cycle and cut safety',
    bullets: [
      'Cycle property: in any cycle, drop the heaviest edge safely. Sorting ensures those heavy edges appear later and get skipped.',
      'Cut property: the lightest edge crossing any cut is always safe. Kruskal will eventually accept it when reached.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Time',
    detail:
      "O(E log E) for sorting; Union-Find adds O(E α(V)) (inverse Ackermann, effectively constant). With small integer weights and buckets, sorting can approach O(E).",
  },
  {
    title: 'Space',
    detail:
      'O(V) for Union-Find plus O(E) to hold/sort edges. A streaming variant can process edges in batches if memory is tight.',
  },
  {
    title: 'Early exit',
    detail:
      'Stop after V - 1 accepted edges per component. On sparse graphs this trims useless scans of heavy edges.',
  },
  {
    title: 'Determinism',
    detail:
      'Equal-weight edges can yield multiple valid MSTs. Stable sorting or tie-breaking by vertex id makes results reproducible.',
  },
]

const realWorldUses = [
  {
    context: 'Network design',
    detail:
      'Laying minimal-cost fiber, power, or road backbones when costs are already tabulated as an edge list.',
  },
  {
    context: 'Clustering',
    detail:
      'Single-linkage clustering: run Kruskal, then cut the k - 1 largest edges of the MST to form k clusters.',
  },
  {
    context: 'Approximation baselines',
    detail:
      'MST cost bounds show up in TSP heuristics, Steiner tree approximations, and redundancy audits.',
  },
  {
    context: 'Graphics and games',
    detail:
      'Procedural map generation and level design use MSTs to ensure connectivity while removing loops from dungeon graphs.',
  },
]

const examples = [
  {
    title: "Kruskal's with Union-Find (TypeScript-like pseudocode)",
    code: `function kruskal(vertices: number[], edges: [number, number, number][]): [number, number, number][] {
  edges.sort((a, b) => a[2] - b[2]); // sort by weight
  const uf = new UnionFind(vertices);
  const mst: [number, number, number][] = [];

  for (const [u, v, w] of edges) {
    if (uf.find(u) !== uf.find(v)) {
      uf.union(u, v);
      mst.push([u, v, w]);
      if (mst.length === vertices.length - 1) break; // early exit
    }
  }
  return mst;
}

class UnionFind {
  parent: Map<number, number>;
  rank: Map<number, number>;
  constructor(nodes: number[]) {
    this.parent = new Map(nodes.map((x) => [x, x]));
    this.rank = new Map(nodes.map((x) => [x, 0]));
  }
  find(x: number): number {
    const p = this.parent.get(x)!;
    if (p !== x) this.parent.set(x, this.find(p)); // path compression
    return this.parent.get(x)!;
  }
  union(a: number, b: number): void {
    let ra = this.find(a), rb = this.find(b);
    if (ra === rb) return;
    const raRank = this.rank.get(ra)!;
    const rbRank = this.rank.get(rb)!;
    if (raRank < rbRank) [ra, rb] = [rb, ra];
    this.parent.set(rb, ra);
    if (raRank === rbRank) this.rank.set(ra, raRank + 1);
  }
}`,
    explanation:
      'Sorting once and using Union-Find keeps cycle checks near-constant. Early exit avoids scanning the heaviest edges once the tree is complete.',
  },
  {
    title: 'Bucketed Kruskal for small integer weights',
    code: `function bucketedKruskal(vertices, edges, maxW):
    buckets = array of lists length maxW + 1
    for (u, v, w) in edges:
        buckets[w].append((u, v))
    uf = new UnionFind(vertices)
    mst = []
    for w from 0 to maxW:
        for (u, v) in buckets[w]:
            if uf.find(u) != uf.find(v):
                uf.union(u, v)
                mst.append((u, v, w))
                if len(mst) == len(vertices) - 1:
                    return mst
    return mst`,
    explanation:
      'Replacing comparison sort with buckets drops the log factor when weights are bounded, a common optimization in competitive programming and low-range cost graphs.',
  },
]

const pitfalls = [
  'Omitting path compression or union by rank degrades performance to near O(E log V) on finds alone.',
  'Skipping early exit wastes scans on dense graphs after the MST is complete.',
  'Assuming connectivity: disconnected inputs produce a minimum spanning forest. Handle that if a single tree is expected.',
  'Unstable handling of equal weights can lead to nondeterministic forests; tie-break if reproducibility matters.',
  'Sorting edges from an adjacency matrix of a dense graph is expensive in memory and time; prefer Prim for dense adjacency-driven cases.',
]

const decisionGuidance = [
  'Edge list ready and graph is sparse: Kruskal is a strong choice.',
  'Dense or adjacency-driven graphs: Prim (with a binary or Fibonacci heap) often wins.',
  'Small integer weights: bucketed Kruskal trims the log factor.',
  'Disconnected graphs: Kruskal naturally yields a spanning forest without extra changes.',
  'Need parallelism: consider Boruvka or Boruvka-Kruskal hybrids for component-wise parallel edge picking.',
]

const advancedInsights = [
  {
    title: 'Cycle vs cut duality',
    detail:
      'Kruskal is often taught with the cycle property, but every acceptance also satisfies the cut property: the first time an edge crosses a cut, it is the lightest, so it is safe.',
  },
  {
    title: 'Union-Find amortized costs',
    detail:
      'With path compression and union by rank, total Union-Find cost is O((V + E) α(V)), effectively constant in practice.',
  },
  {
    title: 'Streaming and external memory',
    detail:
      'When edges do not fit in RAM, sort in runs and stream through once with Union-Find. Kruskal remains I/O-friendly because it requires only a single sorted pass.',
  },
  {
    title: 'Clustering linkage',
    detail:
      'Single-linkage clustering is exactly Kruskal with a cut: halt after forming k components or cut the k - 1 heaviest edges of the MST.',
  },
]

const takeaways = [
  "Kruskal's sorts edges globally and uses Union-Find to add only cycle-free edges, guaranteeing an MST in O(E log E).",
  'The algorithm is simple, deterministic with tie-breaks, and excels on sparse edge lists.',
  'Union-Find optimizations are essential; without them the performance degrades sharply.',
  'Use Kruskal when edge lists are ready and weights are sortable; pivot to Prim or Boruvka when density or parallelism demands it.',
]

export default function KruskalsAlgorithmPage(): JSX.Element {
  return (
    <TopicLayout
      title="Kruskal's Algorithm"
      subtitle="Sort edges once, union components, skip cycles"
      intro="Kruskal builds a minimum spanning tree by globally sorting edges and locally unioning components when a light edge connects them. The cycle and cut properties justify the greedy choices, while Union-Find keeps connectivity checks effectively constant time."
    >
      <TopicSection heading="The big picture">
        <p className="text-white/80">
          Kruskal is the global MST strategy: sort every edge light to heavy, then add an edge if it connects two different
          components. Cycle edges are skipped automatically by Union-Find. The process halts after V - 1 accepted edges per
          component, yielding an MST or a spanning forest for disconnected inputs.
        </p>
      </TopicSection>

      <TopicSection heading="Historical context">
        <div className="grid gap-3 md:grid-cols-2">
          {historicalMilestones.map((item) => (
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

      <TopicSection heading="How it works">
        <div className="grid gap-3 md:grid-cols-4">
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

      <TopicSection heading="Complexity analysis and intuition">
        <div className="grid gap-3 md:grid-cols-2">
          {complexityNotes.map((note) => (
            <article key={note.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h4 className="text-sm font-semibold text-white">{note.title}</h4>
              <p className="text-sm text-white/80">{note.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Real-world applications">
        <div className="grid gap-3 md:grid-cols-2">
          {realWorldUses.map((item) => (
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

      <TopicSection heading="Advanced insights">
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
