import { Link } from 'react-router-dom'

import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

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
    detail: 'Store pairU and pairV for current matches. Unmatched vertices map to NIL.',
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
    detail: 'When BFS fails to reach any free V vertex (dist[NIL] = INF), the matching is maximum.',
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
    detail: 'Sizes of U and V can differ; loops should be driven by |U| for BFS sources.',
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
    detail: 'Adjacency lists plus pair and dist arrays use O(V + E) memory.',
  },
  {
    title: 'Phase behavior',
    detail:
      'Each BFS+DFS phase augments along multiple shortest paths, reducing total phases to O(sqrt(V)).',
  },
  {
    title: 'Ordering effects',
    detail: 'Different neighbor orderings can yield different matchings but the same maximum size.',
  },
]

const realWorldUses = [
  {
    context: 'Job and internship assignment',
    detail: 'Students or candidates are matched to roles where each role accepts one candidate.',
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
    detail: 'Time slots are matched to classes or interviews to avoid conflicts.',
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
    { id: 'bp-mental', label: 'Mental Models' },
    { id: 'bp-when', label: 'When to Use It' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-definitions', label: 'Core Definitions' },
    { id: 'core-steps', label: 'Algorithm Steps' },
    { id: 'core-implementation', label: 'Implementation Notes' },
    { id: 'core-complexity', label: 'Complexity and Tradeoffs' },
    { id: 'core-advanced', label: 'Advanced Insights' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
  ],
  examples: [
    { id: 'ex-code', label: 'Code Examples' },
    { id: 'ex-applications', label: 'Real-World Applications' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms and Notes' }],
}

export default function BipartiteMatchingHopcroftKarpPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Bipartite Matching (Hopcroft-Karp)',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Bipartite Matching (Hopcroft-Karp)"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Bipartite Matching (Hopcroft-Karp)</h1>
      <p>
        Hopcroft-Karp computes maximum cardinality matching in bipartite graphs by batching shortest
        augmenting paths. This gives strong performance on large assignment and allocation
        workloads.
      </p>
      <p>
        <Link to="/algoViz">Back to catalog</Link>
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            <p>
              Maximum matching chooses the largest set of non-overlapping edges between two
              partitions. Hopcroft-Karp alternates BFS layer construction with DFS augmentation to
              grow the matching efficiently.
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
          <section id="bp-mental" className="bin98-section">
            <h2 className="bin98-heading">Mental Models</h2>
            {mentalModels.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="bp-when" className="bin98-section">
            <h2 className="bin98-heading">When to Use It</h2>
            <ol>
              {decisionGuidance.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
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
          <section id="core-definitions" className="bin98-section">
            <h2 className="bin98-heading">Core Definitions</h2>
            {coreDefinitions.map((block) => (
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
          <section id="core-steps" className="bin98-section">
            <h2 className="bin98-heading">Algorithm Steps</h2>
            {algorithmSteps.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-implementation" className="bin98-section">
            <h2 className="bin98-heading">Implementation Notes</h2>
            {implementationNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-complexity" className="bin98-section">
            <h2 className="bin98-heading">Complexity and Tradeoffs</h2>
            {complexityNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
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
          <section id="ex-code" className="bin98-section">
            <h2 className="bin98-heading">Code Examples</h2>
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
          <section id="ex-applications" className="bin98-section">
            <h2 className="bin98-heading">Real-World Applications</h2>
            {realWorldUses.map((item) => (
              <p key={item.context}>
                <strong>{item.context}:</strong> {item.detail}
              </p>
            ))}
          </section>
        </>
      )}

      {activeTab === 'glossary' && (
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Terms and Notes</h2>
          {coreDefinitions.map((block) => (
            <p key={block.heading}>
              <strong>{block.heading}:</strong> {block.bullets.join(' ')}
            </p>
          ))}
          <p>
            <strong>NIL sentinel:</strong> Special unmatched marker used in standard Hopcroft-Karp
            BFS/DFS implementations.
          </p>
          <p>
            <strong>Batch augmentation:</strong> Augmenting multiple shortest disjoint paths in one
            phase.
          </p>
        </section>
      )}
    </TopicPageShell>
  )
}
