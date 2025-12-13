import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'Structure as leverage',
    detail: 'Advanced graph tools expose latent structure (cuts, matchings, treewidth) so problems shrink to simpler primitives.',
  },
  {
    title: 'Duality gives certificates',
    detail: 'Cuts certify flows, covers certify matchings, Laplacians certify connectivity; guarantees matter when stakes are high.',
  },
  {
    title: 'Scale through decomposition',
    detail: 'Break dense graphs into SCC DAGs, bridges, or heavy paths so thousands to millions of queries stay near-linear or log-time.',
  },
]

const history = [
  {
    title: '1736: Euler and the bridges of Konigsberg',
    detail: 'Sparked graph theory by formalizing traversal constraints and parity of degrees.',
  },
  {
    title: '1847: Kirchhoff matrix-tree theorem',
    detail: 'Connected Laplacians to spanning trees, grounding spectral and electrical analogies.',
  },
  {
    title: '1931: Konig and bipartite min-cover = max-matching',
    detail: 'Showed a clean duality that still powers assignment and resource allocation.',
  },
  {
    title: '1972-1973: Tarjan SCCs, Hopcroft-Karp matching',
    detail: 'Linear-time condensation and O(E sqrt V) matching made connectivity and pairing practical at scale.',
  },
]

const pillars = [
  {
    title: 'Connectivity lenses',
    detail: 'SCCs, bridges, and articulation points expose how information or failures propagate.',
  },
  {
    title: 'Optimization duals',
    detail: 'Flows vs cuts, matchings vs covers, potentials vs reduced costs; dual solutions certify optimality.',
  },
  {
    title: 'Decomposition-first thinking',
    detail: 'Condense, orient, and index before solving; preprocessing amortizes heavy work across many queries.',
  },
]

const mentalModels = [
  {
    title: 'Electrical networks',
    detail: 'Edges as resistors; effective resistance mirrors connectivity strength. Breaks when costs are asymmetric or directed.',
  },
  {
    title: 'Road closures and detours',
    detail: 'Bridges/articulation points are single-lane tunnels; one closure disconnects the city. Misleads if multiple parallel routes exist.',
  },
]

const howItWorks = [
  {
    step: '1. Choose the right representation',
    detail: 'Directed vs undirected, weighted vs unweighted; index edges for quick residual or low-link updates.',
  },
  {
    step: '2. Decompose early',
    detail: 'Run SCCs, bridge/articulation search, or tree decomposition to simplify the topology before heavy computation.',
  },
  {
    step: '3. Apply the dual view',
    detail: 'For throughput, inspect cuts; for pairing, inspect covers; for clustering, inspect Laplacian spectra.',
  },
  {
    step: '4. Maintain invariants',
    detail: 'Non-negative reduced costs, monotone heights, low-link <= discovery time; assert in debug builds.',
  },
  {
    step: '5. Certify and extract results',
    detail: 'Return both primal (flow, matching, ordering) and certificates (min-cut, cover, condensation DAG) to prove correctness.',
  },
]

const complexityTable = [
  { approach: 'Hopcroft-Karp (bipartite matching)', time: 'O(E sqrt V)', space: 'O(V + E)', note: 'Layered BFS/DFS shrinks augmentations; strong for large sparse graphs.' },
  { approach: 'Dinic with scaling (max flow)', time: 'O(E V^2)', space: 'O(V + E)', note: 'Blocking flows per level; scaling trims iterations on big capacities.' },
  { approach: 'Tarjan SCC + bridges', time: 'O(V + E)', space: 'O(V + E)', note: 'Single DFS yields SCCs, articulation points, and bridges for resilience analysis.' },
  { approach: 'Spectral partition (Laplacian Fiedler vector)', time: 'O(V^3) naive / O(E log V) iterative', space: 'O(V + E)', note: 'Eigen-solvers dominate; iterative methods suit million-node sparse graphs.' },
]

const applications = [
  {
    title: 'Compiler and build pipelines',
    detail: 'Condense SCCs to order strongly dependent modules; prevents cyclic imports from stalling builds.',
  },
  {
    title: 'Ad auctions and ride-sharing matching',
    detail: 'Hopcroft-Karp or Hungarian assign bidders to slots or drivers to riders with fairness and capacity constraints.',
  },
  {
    title: 'CDN routing and cut planning',
    detail: 'Min-cuts reveal brittle edges between regions; informs where to add links before peak events.',
  },
  {
    title: 'Community detection and clustering',
    detail: 'Spectral cuts or modularity methods group users; used in fraud detection and recommendation pipelines.',
  },
]

const pitfalls = [
  'Treating directed graphs as undirected breaks SCC and cut reasoning; orientations matter.',
  'Ignoring parallel edges or multi-edges causes undercounted capacity and wrong bridge detection.',
  'Running matching without layered BFS wastes iterations; augmentations become quadratic.',
  'Large weights in Laplacians lead to numeric instability; scale or use iterative solvers with tolerances.',
]

const whenToUse = [
  'Need provable throughput or resilience: pick flow/cut duals and output the cut as a certificate.',
  'Pairing problems on bipartite data: Hopcroft-Karp for sparse, Hungarian for dense with costs.',
  'Heavy repeated queries on mostly static graphs: decompose once (SCCs, bridges, LCA) and reuse the summary.',
  'Cluster discovery on sparse graphs: spectral methods with iterative eigensolvers to stay memory-light.',
]

const advanced = [
  {
    title: 'Gap and global relabel in push-relabel',
    detail: 'Periodically recompute heights to accelerate convergence on dense flow networks.',
  },
  {
    title: 'Small-to-large DSU on tree',
    detail: 'Merge child frequency maps from small to large to answer subtree color/frequency queries in near-linear time.',
  },
  {
    title: 'Treewidth-driven DP',
    detail: 'Exploit low treewidth to solve NP-hard problems (coloring, CSP) in O(f(w) * n); practical for sparse real-world graphs.',
  },
  {
    title: 'Iterative Laplacian solvers',
    detail: 'Use conjugate gradient with preconditioning to approximate Fiedler vectors on million-edge graphs.',
  },
]

const codeExamples = [
  {
    title: 'Tarjan SCC with bridges and articulation points',
    code: `function dfs(u, parent):
    disc[u] = low[u] = timer++
    stack.push(u)
    childCount = 0
    for v in adj[u]:
        if disc[v] == -1:
            dfs(v, u)
            low[u] = min(low[u], low[v])
            if low[v] >= disc[u]: markArticulation(u)  // u splits components
            if low[v] > disc[u]: markBridge(u, v)      // removing (u,v) disconnects
            childCount += 1
        else if v != parent:
            low[u] = min(low[u], disc[v])  // back edge
    if low[u] == disc[u]: pop stack until u to form SCC`,
    explanation: 'Low-link values track earliest reachable ancestor; SCCs form when a root cannot reach higher nodes, and bridges are edges that only appear in tree paths.',
  },
  {
    title: 'Hopcroft-Karp layering and augmentation',
    code: `while bfsLayers():
    for u in U:
        if pairU[u] == NIL and dfsAugment(u):
            matching += 1

function bfsLayers():
    queue = []
    for u in U:
        if pairU[u] == NIL: dist[u] = 0; enqueue(u)
        else: dist[u] = INF
    dist[NIL] = INF
    while queue not empty:
        u = dequeue(queue)
        if dist[u] < dist[NIL]:
            for v in adj[u]:
                if dist[pairV[v]] == INF:
                    dist[pairV[v]] = dist[u] + 1
                    enqueue(pairV[v])
    return dist[NIL] != INF  // path to free vertex exists`,
    explanation: 'Layered BFS finds the shortest augmenting paths, and DFS only explores forward along layers, giving O(E sqrt V) total augmentations.',
  },
]

const keyTakeaways = [
  'Decompose first: SCCs, bridges, and heavy paths turn messy graphs into tractable summaries.',
  'Use duality to certify results; cuts, covers, and spectra prove optimality or resilience.',
  'Layered or height-based search cuts augmentations from quadratic to near-linear.',
  'Iterative spectral tools unlock clustering on million-edge sparse graphs without cubic cost.',
]

export default function AdvancedGraphTheoryPage(): JSX.Element {
  return (
    <TopicLayout
      title="Advanced Graph Theory"
      subtitle="Flows, duals, decompositions, and spectral lenses"
      intro="Tough network problems yield when you expose structure: condense cycles, separate cuts, layer augmentations, and let dual certificates prove you are optimal."
    >
      <TopicSection heading="Big picture">
        <div className="grid gap-3 md:grid-cols-3">
          {bigPicture.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="History">
        <div className="grid gap-3 md:grid-cols-2">
          {history.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Core concept and mental hooks">
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white">Pillars</h3>
            <div className="space-y-3">
              {pillars.map((item) => (
                <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                  <p className="text-sm text-white/80">{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white">Mental models</h3>
            <div className="space-y-3">
              {mentalModels.map((item) => (
                <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                  <p className="text-sm text-white/80">{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </TopicSection>

      <TopicSection heading="How it works">
        <div className="grid gap-3 md:grid-cols-3">
          {howItWorks.map((item) => (
            <article key={item.step} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.step}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Complexity table">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-white/10 bg-white/5 text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-3 text-left text-white">Approach</th>
                <th className="p-3 text-left text-white">Time</th>
                <th className="p-3 text-left text-white">Space</th>
                <th className="p-3 text-left text-white">Note</th>
              </tr>
            </thead>
            <tbody>
              {complexityTable.map((row) => (
                <tr key={row.approach} className="border-b border-white/10">
                  <td className="p-3 text-white">{row.approach}</td>
                  <td className="p-3 text-white">{row.time}</td>
                  <td className="p-3 text-white">{row.space}</td>
                  <td className="p-3 text-white/80">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TopicSection>

      <TopicSection heading="Applications">
        <div className="grid gap-3 md:grid-cols-2">
          {applications.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
        <div className="mt-4 rounded-lg border border-red-400/40 bg-red-500/10 p-4">
          <h3 className="text-sm font-semibold text-red-100">Failure story: Fragile articulation point</h3>
          <p className="text-sm text-red-100/80">
            A large transit operator modeled its rail map as tree-like and missed a single articulation bridge feeding multiple lines. A routine maintenance closure partitioned the network and stranded riders; a bridge/articulation audit would have flagged the weak cut long before scheduling.
          </p>
        </div>
      </TopicSection>

      <TopicSection heading="Pitfalls">
        <div className="rounded-lg bg-white/5 p-4">
          <ul className="list-disc space-y-2 pl-5 text-sm text-white/80">
            {pitfalls.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </TopicSection>

      <TopicSection heading="When to use">
        <div className="rounded-lg bg-white/5 p-4">
          <ol className="list-decimal space-y-2 pl-5 text-sm text-white/80">
            {whenToUse.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </div>
      </TopicSection>

      <TopicSection heading="Advanced">
        <div className="grid gap-3 md:grid-cols-3">
          {advanced.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Code examples">
        <div className="space-y-4">
          {codeExamples.map((example) => (
            <article key={example.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{example.title}</h3>
              <pre className="mt-2 overflow-x-auto rounded bg-black/40 p-3 text-xs text-white/90">
                <code>{example.code}</code>
              </pre>
              <p className="text-sm text-white/80">{example.explanation}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Key takeaways">
        <div className="grid gap-3 md:grid-cols-2">
          {keyTakeaways.map((item) => (
            <article key={item} className="rounded-lg border border-emerald-400/40 bg-emerald-500/10 p-4">
              <p className="text-sm text-emerald-100">{item}</p>
            </article>
          ))}
        </div>
      </TopicSection>
    </TopicLayout>
  )
}
