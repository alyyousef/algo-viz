import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

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
    title: 'Union-Find accelerates MSTs (1960s-1970s)',
    detail:
      'Disjoint-set forests with path compression and union by rank turned Kruskal into a practical near-linear tool after sorting.',
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
  {
    title: 'Forest to tree',
    detail:
      'Kruskal starts with every vertex as a tiny tree and merges them with the cheapest safe edges until only one tree remains.',
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
      'Optionally tie-break equal weights by vertex id for deterministic output.',
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

const problemPatterns = [
  {
    title: 'Edge list ready',
    detail:
      'If your data already comes as a list of weighted edges, Kruskal fits naturally.',
  },
  {
    title: 'Sparse graphs',
    detail:
      'When E is near V, sorting is cheap and Union-Find dominates in speed.',
  },
  {
    title: 'Clustering by connectivity',
    detail:
      'Single-linkage clustering is Kruskal plus a cutoff on the heaviest edges.',
  },
  {
    title: 'Baseline cost audits',
    detail:
      'MST weight gives a minimal cost benchmark before adding redundancy.',
  },
  {
    title: 'Not for shortest paths',
    detail:
      'Kruskal minimizes total tree weight, not the distance between specific pairs.',
  },
]

const loopInvariants = [
  {
    title: 'Forest invariant',
    detail:
      'At every step, accepted edges form a forest that can be extended into some MST.',
  },
  {
    title: 'Cycle-free invariant',
    detail:
      'Union-Find guarantees no accepted edge creates a cycle.',
  },
  {
    title: 'Cut safety invariant',
    detail:
      'Any accepted edge is the lightest edge crossing some cut, so it is safe to include.',
  },
]

const stepTrace = [
  {
    step: 'Start',
    state: 'Edges sorted: (A-B 1), (B-C 2), (A-C 3), (C-D 4)',
    note: 'Kruskal will pick edges in ascending order if they do not form cycles.',
  },
  {
    step: 'Pick A-B (1)',
    state: 'Forest: {A-B} | {C} | {D}',
    note: 'No cycle, so include the edge.',
  },
  {
    step: 'Pick B-C (2)',
    state: 'Forest: {A-B-C} | {D}',
    note: 'Still no cycle, merge components.',
  },
  {
    step: 'Skip A-C (3)',
    state: 'Would form cycle A-B-C-A',
    note: 'Cycle property says the heaviest edge in a cycle is never needed.',
  },
  {
    step: 'Pick C-D (4)',
    state: 'MST complete with 3 edges',
    note: 'We now have V - 1 edges, so the MST is complete.',
  },
]

const complexityNotes = [
  {
    title: 'Time',
    detail:
      'O(E log E) for sorting; Union-Find adds O(E alpha(V)) (inverse Ackermann, effectively constant). With small integer weights and buckets, sorting can approach O(E).',
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

const inputSensitivity = [
  {
    title: 'Disconnected graphs',
    detail:
      'Kruskal naturally returns a minimum spanning forest.',
  },
  {
    title: 'Duplicate weights',
    detail:
      'Multiple valid MSTs can exist; tests should compare total weight, not exact edge sets.',
  },
  {
    title: 'Dense graphs',
    detail:
      'Sorting all edges can be expensive; Prim often wins on dense adjacency-driven graphs.',
  },
  {
    title: 'Small integer weights',
    detail:
      'Bucketed sorting drops the log factor and speeds up Kruskal substantially.',
  },
]

const performanceProfile = [
  {
    title: 'Sorting dominates',
    detail:
      'Most runtime is spent sorting edges; Union-Find is almost constant-time.',
  },
  {
    title: 'Union-Find quality',
    detail:
      'Path compression and union by rank are essential for near-linear behavior.',
  },
  {
    title: 'Memory footprint',
    detail:
      'Edges must be held for sorting; consider external sorting on massive graphs.',
  },
  {
    title: 'Early termination',
    detail:
      'Once V - 1 edges are chosen, stop scanning to avoid heavy-edge overhead.',
  },
]

const comparisonTable = [
  {
    algorithm: 'Kruskal',
    time: 'O(E log E)',
    space: 'O(V + E)',
    bestFor: 'Sparse graphs with edge list',
    notes: 'Simple with Union-Find, edge-driven.',
  },
  {
    algorithm: 'Prim',
    time: 'O((V + E) log V)',
    space: 'O(V + E)',
    bestFor: 'Dense graphs or adjacency access',
    notes: 'Grows from a seed, adjacency-driven.',
  },
  {
    algorithm: 'Boruvka',
    time: 'O(E log V)',
    space: 'O(V + E)',
    bestFor: 'Parallel settings',
    notes: 'Merges components in rounds.',
  },
  {
    algorithm: 'Reverse-delete',
    time: 'O(E log E)',
    space: 'O(V + E)',
    bestFor: 'Teaching cycle property',
    notes: 'Removes heavy edges if connectivity remains.',
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
  {
    context: 'Infrastructure audits',
    detail:
      'MSTs provide a minimal baseline before adding redundant edges for reliability.',
  },
]

const variantsAndTweaks = [
  {
    title: 'Bucketed Kruskal',
    detail:
      'Replace comparison sorting with buckets for small integer weights to remove log factors.',
  },
  {
    title: 'Boruvka-Kruskal hybrid',
    detail:
      'Use Boruvka rounds to shrink components, then finish with Kruskal on the contracted graph.',
  },
  {
    title: 'Streaming Kruskal',
    detail:
      'Sort edges externally and stream once through Union-Find to handle graphs bigger than memory.',
  },
  {
    title: 'Reverse-delete',
    detail:
      'Sort edges descending and remove if connectivity is preserved; illustrates the cycle property.',
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
  {
    title: 'Early stop for k-clustering',
    code: `function kruskalKClusters(vertices, edges, k):
    sort edges by w ascending
    uf = new UnionFind(vertices)
    clusters = len(vertices)
    for (u, v, w) in edges:
        if uf.find(u) != uf.find(v):
            uf.union(u, v)
            clusters -= 1
            if clusters == k:
                return`,
    explanation:
      'Stop once there are k components to get single-linkage clusters. The last accepted edge defines spacing between clusters.',
  },
]

const pitfalls = [
  'Omitting path compression or union by rank degrades performance to near O(E log V) on finds alone.',
  'Skipping early exit wastes scans on dense graphs after the MST is complete.',
  'Assuming connectivity: disconnected inputs produce a minimum spanning forest. Handle that if a single tree is expected.',
  'Unstable handling of equal weights can lead to nondeterministic forests; tie-break if reproducibility matters.',
  'Sorting edges from an adjacency matrix of a dense graph is expensive in memory and time; prefer Prim for dense adjacency-driven cases.',
  'Confusing MST with shortest path trees; MST does not minimize pairwise distances.',
]

const decisionGuidance = [
  'Edge list ready and graph is sparse: Kruskal is a strong choice.',
  'Dense or adjacency-driven graphs: Prim (with a binary or Fibonacci heap) often wins.',
  'Small integer weights: bucketed Kruskal trims the log factor.',
  'Disconnected graphs: Kruskal naturally yields a spanning forest without extra changes.',
  'Need parallelism: consider Boruvka or Boruvka-Kruskal hybrids for component-wise parallel edge picking.',
]

const implementationTips = [
  {
    title: 'Use Union-Find with compression',
    detail:
      'Path compression and union by rank keep find/union operations nearly constant.',
  },
  {
    title: 'Early exit',
    detail:
      'Stop after V - 1 accepted edges to avoid scanning heavy edges.',
  },
  {
    title: 'Stable tie-breaking',
    detail:
      'If weights tie, sort by (w, u, v) to keep output deterministic.',
  },
  {
    title: 'Prefer edge lists',
    detail:
      'Kruskal is edge-driven; avoid adjacency matrices on sparse graphs.',
  },
  {
    title: 'Handle forests',
    detail:
      'If connectivity is required, verify components after the run.',
  },
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
      'With path compression and union by rank, total Union-Find cost is O((V + E) alpha(V)), effectively constant in practice.',
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
  {
    title: 'Replacement edges',
    detail:
      'For sensitivity analysis, replacing one MST edge with a non-tree edge forms a cycle; swapping the heaviest edge on that cycle adjusts the MST with minimal cost impact.',
  },
]

const takeaways = [
  "Kruskal's sorts edges globally and uses Union-Find to add only cycle-free edges, guaranteeing an MST in O(E log E).",
  'The algorithm is simple, deterministic with tie-breaks, and excels on sparse edge lists.',
  'Union-Find optimizations are essential; without them the performance degrades sharply.',
  'Use Kruskal when edge lists are ready and weights are sortable; pivot to Prim or Boruvka when density or parallelism demands it.',
  'References: Kruskal 1956, Tarjan Union-Find, and CLRS MST chapter.',
]

export default function KruskalsAlgorithmPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Kruskal's Algorithm</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Sort edges once, union components, skip cycles</div>
              <p className="win95-text">
                Kruskal builds a minimum spanning tree by globally sorting edges and locally unioning components when a light edge
                connects them. The cycle and cut properties justify the greedy choices, while Union-Find keeps connectivity checks
                effectively constant time.
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
                Kruskal is the global MST strategy: sort every edge light to heavy, then add an edge if it connects two different
                components. Cycle edges are skipped automatically by Union-Find. The process halts after V - 1 accepted edges per
                component, yielding an MST or a spanning forest for disconnected inputs.
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
            <legend>How it works</legend>
            <div className="win95-grid win95-grid-3">
              {mechanics.map((block) => (
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
            <legend>How to think about similar problems</legend>
            <div className="win95-grid win95-grid-3">
              {problemPatterns.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Loop invariants (why it is correct)</legend>
            <div className="win95-grid win95-grid-3">
              {loopInvariants.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Worked trace on a tiny graph</legend>
            <div className="win95-stack">
              {stepTrace.map((item) => (
                <div key={item.step} className="win95-panel">
                  <div className="win95-heading">{item.step}</div>
                  <pre className="win95-code">
                    <code>{item.state}</code>
                  </pre>
                  <p className="win95-text">{item.note}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity analysis and intuition</legend>
            <div className="win95-grid win95-grid-2">
              {complexityNotes.map((note) => (
                <div key={note.title} className="win95-panel">
                  <div className="win95-heading">{note.title}</div>
                  <p className="win95-text">{note.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Input sensitivity</legend>
            <div className="win95-grid win95-grid-2">
              {inputSensitivity.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Performance profile</legend>
            <div className="win95-grid win95-grid-2">
              {performanceProfile.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Compare and contrast</legend>
            <div className="win95-panel">
              <table className="win95-table">
                <thead>
                  <tr>
                    <th>Algorithm</th>
                    <th>Time</th>
                    <th>Space</th>
                    <th>Best for</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonTable.map((row) => (
                    <tr key={row.algorithm}>
                      <td>{row.algorithm}</td>
                      <td>{row.time}</td>
                      <td>{row.space}</td>
                      <td>{row.bestFor}</td>
                      <td>{row.notes}</td>
                    </tr>
                  ))}
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
            <legend>Variants and extensions</legend>
            <div className="win95-grid win95-grid-2">
              {variantsAndTweaks.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
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
            <legend>Implementation tips</legend>
            <div className="win95-grid win95-grid-2">
              {implementationTips.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
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
            <div className="win95-panel win95-panel--raised">
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
