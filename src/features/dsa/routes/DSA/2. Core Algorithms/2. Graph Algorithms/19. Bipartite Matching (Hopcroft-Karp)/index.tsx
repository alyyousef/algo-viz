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
    title: '1931: Konig links matchings and vertex covers',
    detail:
      'Konig proved that in bipartite graphs, maximum matching size equals minimum vertex cover size, grounding matching theory.',
  },
  {
    title: '1957: Berge formalizes augmenting paths',
    detail:
      'Berge showed that a matching is maximum iff there is no augmenting path, a key optimality test.',
  },
  {
    title: '1973: Hopcroft-Karp algorithm',
    detail:
      'Hopcroft and Karp achieved O(E sqrt(V)) time by batching many shortest augmenting paths per phase.',
  },
  {
    title: '1990s: Large scale allocation systems',
    detail:
      'Ad assignment, scheduling, and database joins drove practical implementations of bipartite matching in production systems.',
  },
]

const mentalModels = [
  {
    title: 'Two-sided handshake',
    detail:
      'Each match pairs one node on the left with one on the right. The goal is to maximize the number of disjoint handshakes.',
  },
  {
    title: 'Alternating paths as toggles',
    detail:
      'An augmenting path alternates unmatched and matched edges; flipping it increases the matching size by one.',
  },
  {
    title: 'Layered wavefront',
    detail:
      'Hopcroft-Karp uses BFS layers to find all shortest augmenting paths and augments them together.',
  },
  {
    title: 'Free vertices are gateways',
    detail:
      'Unmatched vertices on the left act as sources. Unmatched vertices on the right act as sinks for augmentation.',
  },
]

const coreDefinitions = [
  {
    heading: 'Bipartite graph',
    bullets: [
      'Vertices split into disjoint sets U and V.',
      'Edges only go between U and V, never within a set.',
      'Often models two-sided markets or assignments.',
    ],
  },
  {
    heading: 'Matching',
    bullets: [
      'A set of edges with no shared endpoints.',
      'Each vertex is incident to at most one matched edge.',
      'Size is the number of matched edges.',
    ],
  },
  {
    heading: 'Maximum matching',
    bullets: [
      'A matching with the largest possible size.',
      'Not necessarily unique; there may be many.',
      'In bipartite graphs, can be found in polynomial time.',
    ],
  },
  {
    heading: 'Augmenting path',
    bullets: [
      'A path that starts and ends at unmatched vertices.',
      'Edges alternate between unmatched and matched.',
      'Flipping the path increases matching size by 1.',
    ],
  },
  {
    heading: 'Alternating layers',
    bullets: [
      'BFS explores unmatched then matched edges in layers.',
      'Shortest augmenting paths are discovered together.',
      'Multiple vertex-disjoint paths can be augmented per phase.',
    ],
  },
]

const algorithmSteps = [
  {
    title: 'Initialize matching arrays',
    detail:
      'Store pairU and pairV for current matches. Unmatched vertices map to NIL.',
  },
  {
    title: 'BFS to build layers',
    detail:
      'From all free U vertices, BFS through unmatched edges to V, then matched edges back to U, to compute dist layers.',
  },
  {
    title: 'DFS to find shortest augmenting paths',
    detail:
      'DFS from free U vertices along edges that respect the layer distances, collecting vertex-disjoint augmenting paths.',
  },
  {
    title: 'Augment in batches',
    detail:
      'Flip all found augmenting paths, increasing matching size by the number of paths found in this phase.',
  },
  {
    title: 'Repeat until no path',
    detail:
      'When BFS fails to reach any free V vertex (dist[NIL] = INF), the matching is maximum.',
  },
]

const implementationNotes = [
  {
    title: 'Indexing and NIL sentinel',
    detail:
      'Use 1-based indices with NIL = 0, or explicit -1 markers. Keep pairU and pairV arrays consistent.',
  },
  {
    title: 'Adjacency list per U',
    detail:
      'Store edges from U to V to keep BFS and DFS simple. For large graphs, compress V indices.',
  },
  {
    title: 'Dist array reset',
    detail:
      'Reset dist for each BFS phase. Dist controls which DFS edges are valid to preserve shortest paths.',
  },
  {
    title: 'Unbalanced sides',
    detail:
      'Sizes of U and V can differ; loops should be driven by |U| for BFS sources.',
  },
]

const complexityNotes = [
  {
    title: 'Time cost',
    detail:
      'Hopcroft-Karp runs in O(E sqrt(V)) time, improving over O(VE) augmenting path methods.',
  },
  {
    title: 'Space cost',
    detail:
      'Adjacency lists plus pair and dist arrays use O(V + E) memory.',
  },
  {
    title: 'Phase behavior',
    detail:
      'Each BFS+DFS phase augments along multiple shortest paths, reducing total phases to O(sqrt(V)).',
  },
  {
    title: 'Ordering effects',
    detail:
      'Different neighbor orderings can yield different matchings but the same maximum size.',
  },
]

const realWorldUses = [
  {
    context: 'Job and internship assignment',
    detail:
      'Students or candidates are matched to roles where each role accepts one candidate.',
  },
  {
    context: 'Resource allocation',
    detail:
      'Servers are matched to tasks, or machines to jobs, when each job can use only one resource.',
  },
  {
    context: 'Ad matching and recommender systems',
    detail:
      'Ads are matched to impressions while respecting constraints like exclusivity or budget.',
  },
  {
    context: 'Scheduling and timetabling',
    detail:
      'Time slots are matched to classes or interviews to avoid conflicts.',
  },
]

const examples = [
  {
    title: 'Bipartite graph construction',
    code: `// U: engineers, V: projects
U = {u1, u2, u3}
V = {v1, v2, v3, v4}
edges:
u1 -> v1, v3
u2 -> v2
u3 -> v1, v2, v4`,
    explanation:
      'Edges encode allowed assignments. A maximum matching assigns as many engineers to projects as possible.',
  },
  {
    title: 'Hopcroft-Karp (pseudocode)',
    code: `function hopcroftKarp(U, V, adj):
    pairU[1..|U|] = NIL
    pairV[1..|V|] = NIL
    dist[0..|U|] = INF
    matching = 0

    while bfs(U, adj, pairU, pairV, dist):
        for u in U:
            if pairU[u] == NIL and dfs(u, adj, pairU, pairV, dist):
                matching += 1
    return matching`,
    explanation:
      'BFS builds layer distances; DFS searches only along shortest augmenting paths and flips them immediately.',
  },
  {
    title: 'BFS and DFS core',
    code: `function bfs(U, adj, pairU, pairV, dist):
    queue = []
    for u in U:
        if pairU[u] == NIL:
            dist[u] = 0
            queue.push(u)
        else:
            dist[u] = INF
    dist[NIL] = INF

    while queue not empty:
        u = queue.pop()
        if dist[u] < dist[NIL]:
            for v in adj[u]:
                if dist[pairV[v]] == INF:
                    dist[pairV[v]] = dist[u] + 1
                    queue.push(pairV[v])
    return dist[NIL] != INF

function dfs(u, adj, pairU, pairV, dist):
    if u == NIL:
        return true
    for v in adj[u]:
        if dist[pairV[v]] == dist[u] + 1 and dfs(pairV[v], adj, pairU, pairV, dist):
            pairV[v] = u
            pairU[u] = v
            return true
    dist[u] = INF
    return false`,
    explanation:
      'The NIL node signals reaching a free V vertex. Distances enforce shortest augmenting paths per phase.',
  },
]

const pitfalls = [
  'Skipping the connectivity of layers: DFS must follow dist to keep paths shortest.',
  'Forgetting to reset dist each phase, causing stale layers and missed augmentations.',
  'Confusing left and right indices or mixing 0-based and 1-based indexing with NIL.',
  'Using directed edges inside U or V, which breaks bipartite assumptions.',
  'Assuming the matching is unique; multiple maximum matchings are common.',
]

const decisionGuidance = [
  'Use Hopcroft-Karp for maximum cardinality matching in large bipartite graphs.',
  'If edges have weights or costs, use the Hungarian algorithm or min-cost max-flow instead.',
  'If the graph is not bipartite, use Blossom (Edmonds) for general matching.',
  'If you need a minimum vertex cover in bipartite graphs, derive it from the maximum matching via Konig.',
  'If graphs are small, a simple DFS augmenting path method may be simpler to implement.',
]

const advancedInsights = [
  {
    title: 'Konig reconstruction',
    detail:
      'After computing a maximum matching, a minimum vertex cover can be built from BFS layers of unmatched U vertices.',
  },
  {
    title: 'Parallel augmentations',
    detail:
      'Hopcroft-Karp gains speed by augmenting many vertex-disjoint shortest paths per phase.',
  },
  {
    title: 'Incremental updates',
    detail:
      'If edges are added over time, warm-start the algorithm from the existing matching to reduce recomputation.',
  },
  {
    title: 'Sparse graph optimizations',
    detail:
      'Using adjacency vectors and iterators avoids scanning all edges repeatedly, improving cache behavior.',
  },
]

const takeaways = [
  'Bipartite matching pairs two sets without conflicts, maximizing the number of pairs.',
  'Augmenting paths are the core mechanism for improving a matching.',
  'Hopcroft-Karp batches shortest augmenting paths for O(E sqrt(V)) performance.',
  'Pick the right algorithm: weighted or non-bipartite cases need different tools.',
  'Matchings connect directly to covers, scheduling, and allocation problems.',
]

export default function BipartiteMatchingHopcroftKarpPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Bipartite Matching (Hopcroft-Karp)</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Maximum matching at scale with layered BFS and augmenting paths</div>
              <p className="win95-text">
                Hopcroft-Karp solves the maximum bipartite matching problem efficiently by finding many shortest augmenting paths
                per phase. The algorithm is fast, deterministic, and foundational for scheduling, assignments, and allocation systems.
                This page lays out the definitions, proofs of existence, algorithm flow, and implementation details.
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
                In bipartite matching, you want as many disjoint pairs as possible between two sets. Hopcroft-Karp accelerates
                the classic augmenting path approach by batching the shortest improvements, reducing the total number of phases.
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
            <legend>How it works: definitions</legend>
            <div className="win95-grid win95-grid-3">
              {coreDefinitions.map((block) => (
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
            <legend>How it works: Hopcroft-Karp flow</legend>
            <div className="win95-grid win95-grid-2">
              {algorithmSteps.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                Correctness idea: BFS discovers the shortest length of any augmenting path. DFS then finds a maximal set of
                vertex-disjoint shortest augmenting paths. Flipping all of them increases the matching size and strictly increases
                the shortest augmenting path length for the next phase.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Implementation notes</legend>
            <div className="win95-grid win95-grid-2">
              {implementationNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
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
                If the graph is dense or small, a simpler augmenting path algorithm may be fine. For large sparse graphs, Hopcroft-Karp
                is the go-to choice due to its predictable scaling.
              </p>
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
