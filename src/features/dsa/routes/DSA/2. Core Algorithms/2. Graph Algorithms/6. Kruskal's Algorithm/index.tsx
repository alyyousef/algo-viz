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
      "O(E log E) for sorting; Union-Find adds O(E IÃ±(V)) (inverse Ackermann, effectively constant). With small integer weights and buckets, sorting can approach O(E).",
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
      'With path compression and union by rank, total Union-Find cost is O((V + E) IÃ±(V)), effectively constant in practice.',
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
