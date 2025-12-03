import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const historicalMilestones = [
  {
    title: 'Edsger Dijkstra sketches the algorithm (1956)',
    detail:
      'While considering Dutch city routes, Dijkstra realized a greedy settle-order by rising distance would produce optimal paths for non-negative edges.',
  },
  {
    title: 'Formal publication in Numerische Mathematik (1959)',
    detail:
      'The paper proved correctness for single-source shortest paths and popularized the distance-label and relaxation language still used today.',
  },
  {
    title: "Dial's bucket optimization (1969)",
    detail:
      'Robert Dial replaced heaps with buckets for small integer weights, pushing the runtime toward linear on many practical graphs.',
  },
  {
    title: 'Fredman and Tarjan connect Fibonacci heaps (1984)',
    detail:
      'They showed that fast decrease-key operations drop the bound to O(E + V log V), influencing textbook presentations and contest implementations.',
  },
  {
    title: 'Networking era adoption (1990s)',
    detail:
      'Link-state routing protocols like OSPF and IS-IS embedded Dijkstra to recompute forwarding tables rapidly as topologies changed.',
  },
]

const mentalModels = [
  {
    title: 'Rising water',
    detail:
      'Imagine water filling terrain from the source. The first time water touches a node is the cheapest cost to that node; once wet, it never becomes cheaper.',
  },
  {
    title: 'IOU ledger',
    detail:
      'Every node holds an IOU for what it costs to reach it. The priority queue always pays off the smallest IOU next, guaranteeing no unpaid smaller debt remains.',
  },
  {
    title: 'Settled frontier',
    detail:
      'Settled nodes are paved; the frontier is gravel being compacted. Stepping back onto pavement cannot shorten a path because that pavement already follows the cheapest grade.',
  },
  {
    title: 'Weighted BFS',
    detail:
      'Swap BFS layers for a priority queue ordered by cumulative weight instead of hop count. Relaxation plays the same role as in BFS but respects edge costs.',
  },
]

const mechanics = [
  {
    heading: 'Core loop',
    bullets: [
      'Initialize all distances to infinity except the source at 0, then push the source into a min-priority queue.',
      'Extract the node with the smallest tentative distance. If the popped distance is larger than the recorded one, skip it as stale.',
      'For each outgoing edge (u, v, w), relax: if dist[u] + w < dist[v], update dist[v], set parent[v] = u, and push (dist[v], v) into the queue.',
      'Repeat until the queue is empty or a target node is extracted; that extraction finalizes its optimal cost.',
    ],
  },
  {
    heading: 'Data structure choices',
    bullets: [
      'Binary heap: O((V + E) log V) with simple code and predictable constants.',
      'Fibonacci or pairing heap: better asymptotic decrease-key for dense graphs, higher constants in practice.',
      'Bucket queues (Dial, radix, 0-1 BFS): near-linear when weights are small integers or in {0,1}.',
    ],
  },
  {
    heading: 'Correctness levers',
    bullets: [
      'Non-negative edges are required. Negative weights break the settle-order guarantee.',
      'Settling at extract-min locks a node; no future path can improve it because all unsettled nodes are at least as far.',
      'Outdated heap entries are harmless if you verify dist on pop before relaxing neighbors.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Asymptotic core',
    detail:
      'Binary heap runs in O((V + E) log V); Fibonacci heap in O(E + V log V). With adjacency lists the work scales with actual edges.',
  },
  {
    title: 'Dense vs. sparse graphs',
    detail:
      'Adjacency matrices push runtime toward O(V^2) regardless of edge count, acceptable only when graphs are dense and V is moderate.',
  },
  {
    title: 'Integer weight shortcuts',
    detail:
      'Dial buckets achieve O(V + E + W) when weights are small non-negative integers and W is the maximum edge weight. 0-1 BFS specializes further to O(V + E).',
  },
  {
    title: 'Memory footprint',
    detail:
      'Distance and parent arrays cost O(V); the queue can hold up to O(E) entries when reinserting instead of decrease-key.',
  },
]

const realWorldUses = [
  {
    context: 'Navigation and maps',
    detail:
      'Car GPS, delivery routing, and ride hailing compute fastest routes with Dijkstra or A* on road graphs where weights encode travel time.',
  },
  {
    context: 'Internet routing',
    detail:
      'OSPF and IS-IS routers run Dijkstra on link-state databases to rebuild forwarding tables whenever a link weight or topology change arrives.',
  },
  {
    context: 'Game AI and robotics',
    detail:
      'Pathfinding on weighted grids or navmeshes uses Dijkstra for cost-to-go tables, often combined with heuristics for real-time play.',
  },
  {
    context: 'Network reliability and QoS',
    detail:
      'Traffic engineering tools compute least-cost and k-shortest paths under latency or utilization weights to balance load safely.',
  },
  {
    context: 'Compilers and analysis',
    detail:
      'Dataflow and call graph analyses use Dijkstra when edge weights encode risk or frequency, revealing cheapest witnesses through code.',
  },
]

const examples = [
  {
    title: 'Standard Dijkstra with min-heap',
    code: `function dijkstra(graph, source):
    dist = map with default infinity
    parent = map
    dist[source] = 0

    pq = new MinHeap()
    pq.push((0, source))

    while pq not empty:
        (d, u) = pq.pop_min()
        if d != dist[u]:
            continue  // stale entry from an older relaxation

        for (v, w) in graph.neighbors(u):
            if dist[u] + w < dist.get(v, infinity):
                dist[v] = dist[u] + w
                parent[v] = u
                pq.push((dist[v], v))

    return { dist, parent }`,
    explanation:
      'Reinserting instead of decrease-key keeps code simple; the stale check preserves correctness. Parent pointers enable path reconstruction.',
  },
  {
    title: 'Early exit when target is known',
    code: `function shortestPath(graph, source, target):
    dist = { source: 0 }
    parent = { source: null }
    pq = MinHeap([(0, source)])

    while pq not empty:
        (d, u) = pq.pop_min()
        if d != dist[u]:
            continue
        if u == target:
            break  // first time we pop target is optimal

        for (v, w) in graph.neighbors(u):
            if d + w < dist.get(v, infinity):
                dist[v] = d + w
                parent[v] = u
                pq.push((dist[v], v))

    return reconstruct(parent, target)`,
    explanation:
      'Because the queue orders by cost, the first extraction of the target certifies its shortest path. Stopping here avoids needless work.',
  },
  {
    title: "Dial's buckets for small integer weights",
    code: `function dial(graph, source, maxW):
    dist = map with default infinity
    parent = map
    dist[source] = 0

    buckets = array of lists length (maxW * |V| + 1)
    idx = 0
    buckets[0].append(source)

    while some bucket is non-empty:
        while buckets[idx] is empty:
            idx += 1
        u = buckets[idx].pop()
        if idx != dist[u]:
            continue

        for (v, w) in graph.neighbors(u):
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                parent[v] = u
                buckets[dist[v]].append(v)

    return dist`,
    explanation:
      'When weights are bounded small integers, bucket indices act as exact keys and remove the log factor, approaching O(V + E + W).',
  },
]

const pitfalls = [
  'Applying Dijkstra when any edge is negative yields wrong paths; use Bellman-Ford or Johnson in that case.',
  'Ignoring stale heap entries when using reinsertion wastes work or corrupts parents; always check the recorded distance on pop.',
  'Overflowing distance sums on large weights breaks comparisons; use 64-bit or bigint distances.',
  'Using adjacency matrices on sparse graphs inflates runtime and memory; prefer adjacency lists.',
  'Skipping parent tracking forces extra passes or prevents route reconstruction after the run.',
]

const decisionGuidance = [
  'Non-negative weighted edges and single-source queries: pick Dijkstra.',
  'Unit weights: use BFS for simpler O(V + E) time.',
  'Weights limited to 0 or 1: use 0-1 BFS with a deque.',
  'Negative weights present: use Bellman-Ford or Johnson (for many sources).',
  'Single target and a good heuristic: use A* to narrow the search.',
  'Many queries on a static graph: preprocess with contraction hierarchies or multi-level Dijkstra for faster responses.',
]

const advancedInsights = [
  {
    title: 'Bidirectional Dijkstra',
    detail:
      'Run forward from the source and backward from the target; meet-in-the-middle cuts explored nodes dramatically on large undirected graphs.',
  },
  {
    title: 'Potential-based reweighting',
    detail:
      'Johnson adds vertex potentials to eliminate negative edges, making Dijkstra applicable while preserving shortest paths after reweighting.',
  },
  {
    title: 'Heuristic overlays (A*)',
    detail:
      'Adding an admissible heuristic h(v) to the key (dist + h) keeps the settle-order optimal while focusing effort near the goal.',
  },
  {
    title: 'Cache-aware engineering',
    detail:
      'D-ary heaps reduce cache misses; radix heaps work well for monotone integer keys; contiguous adjacency layouts improve memory bandwidth.',
  },
  {
    title: 'Cut property intuition',
    detail:
      'The next settled node is always reached by the minimum-weight edge crossing the cut between settled and unsettled sets, mirroring the logic behind MST algorithms.',
  },
]

const takeaways = [
  'Dijkstra is weighted BFS with a min-priority frontier; non-negative edges make its greedy settling safe.',
  'Priority queue choice controls constants: binary heaps are dependable, buckets excel on bounded integers, Fibonacci heaps push asymptotics.',
  'Stale-entry checks or real decrease-key keep reinsertion strategies correct.',
  'Match the algorithm to the graph: BFS for unit weights, 0-1 BFS for {0,1}, Bellman-Ford for negatives, A* when a goal and heuristic exist.',
]

export default function DijkstrasPage(): JSX.Element {
  return (
    <TopicLayout
      title="Dijkstra's Algorithm"
      subtitle="Weighted shortest paths without regrets"
      intro="Dijkstra's algorithm is weighted BFS with discipline. It settles nodes in order of increasing cost using a priority queue, guaranteeing optimal paths in graphs whose edges never go negative. From road networks to link-state routers, it is the reliable workhorse for single-source shortest paths."
    >
      <TopicSection heading="The big picture">
        <p className="text-white/80">
          The algorithm asks: what is the cheapest way to reach every node when edges are non-negative? By always expanding the
          lowest-cost unsettled node and relaxing its outgoing edges, it builds a shortest-path tree without backtracking. The
          only risk is memory and heap overhead, not correctness, as long as weights stay non-negative.
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

      <TopicSection heading="How it works: mechanics in motion">
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
          Implementation choices dominate real speed: heaps balance clarity and efficiency, buckets win when weights are tiny
          integers, and cache-aware layouts matter on billion-edge graphs more than minor asymptotic differences.
        </p>
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
