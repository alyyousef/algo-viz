import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const mentalModels = [
  {
    title: 'Pipes with capacity',
    detail:
      'Edges are pipes with maximum throughput; flow must respect pipe limits and conserve volume at intermediate nodes.',
  },
  {
    title: 'Residual graph as opportunity map',
    detail:
      'Residual edges show remaining capacity forward and how much can be canceled backward, guiding augmenting paths.',
  },
]

const mechanics = [
  {
    heading: 'Max-flow core (Ford-Fulkerson / Edmonds-Karp)',
    bullets: [
      'Initialize flow to 0; build residual capacities for every edge and reverse edge.',
      'While an s-t path exists in the residual graph, push the minimum residual capacity along that path (augment).',
      'Update residuals forward (subtract) and backward (add) to reflect the new flow.',
      'Edmonds-Karp chooses shortest (BFS) augmenting paths, guaranteeing O(VE^2) time.',
    ],
  },
  {
    heading: 'Dinic level graphs',
    bullets: [
      'Build a level graph with BFS distances from s in the residual graph.',
      'Send blocking flows with DFS that respects level increases only.',
      'Repeat BFS/DFS phases until no augmenting path remains; runs in O(V^2 E) and faster on unit networks.',
    ],
  },
  {
    heading: 'Push-relabel (preflow)',
    bullets: [
      'Allow excess at nodes; push flow locally respecting capacity and height labels.',
      'Relabel (increase height) when no admissible edge exists; global relabeling and gap relabeling speed convergence.',
      'Often fastest in practice for dense graphs.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Ford-Fulkerson vs. Edmonds-Karp',
    detail:
      'Ford-Fulkerson is bounded by O(E * max_flow) and can loop on irrational capacities; Edmonds-Karp uses BFS to ensure O(VE^2).',
  },
  {
    title: 'Dinic and variants',
    detail:
      'O(V^2 E) in general; O(min(V^(2/3), E^(1/2)) * E) for unit networks with optimizations.',
  },
  {
    title: 'Push-relabel',
    detail:
      'Generic O(V^3); with heuristics often much faster in practice, especially on dense graphs.',
  },
]

const realWorldUses = [
  {
    context: 'Networking and bandwidth',
    detail:
      'Model link capacities to find maximum throughput between endpoints or to test network resilience.',
  },
  {
    context: 'Bipartite matching',
    detail:
      'Transform matching into flow with unit capacities to find maximum matchings in graphs (Konig, Hopcroft-Karp specialized).',
  },
  {
    context: 'Image segmentation',
    detail:
      'Graph cuts via max-flow/min-cut delineate foreground and background by minimizing energy functions.',
  },
  {
    context: 'Project selection and circulation',
    detail:
      'Flows with gains/losses model selecting projects under constraints and detecting feasible circulations.',
  },
]

const examples = [
  {
    title: 'Edmonds-Karp sketch',
    code: `function edmondsKarp(graph, s, t):
    flow = 0
    build residual capacities for each edge and reverse edge

    while true:
        parent = bfs(residual, s, t) // returns path or null
        if parent is null:
            break
        aug = min residual capacity along s->t path from parent map
        for each edge on path:
            residual[u][v] -= aug
            residual[v][u] += aug
        flow += aug

    return flow`,
    explanation:
      'BFS ensures each augmentation increases shortest-path length at least occasionally, bounding total augmentations to O(VE).',
  },
  {
    title: 'Dinic phase sketch',
    code: `function dinic(graph, s, t):
    flow = 0
    while bfsLevelGraph(residual, s, t):
        work = array of zeros sized V  // current edge pointers
        pushed = dfsBlocking(residual, work, s, t, infinity)
        while pushed > 0:
            flow += pushed
            pushed = dfsBlocking(residual, work, s, t, infinity)
    return flow`,
    explanation:
      'Level graph BFS plus blocking-flow DFS limits useless backtracking and accelerates convergence versus generic augmenting paths.',
  },
]

const pitfalls = [
  'Forgetting reverse edges in residuals prevents canceling flow and breaks correctness.',
  'Using Ford-Fulkerson with irrational capacities can fail to terminate; prefer Edmonds-Karp or Dinic.',
  'Not resetting work/iterator arrays between blocking-flow DFS runs in Dinic can cause missed augmentations or infinite loops.',
  'Integer overflow on accumulated flow when capacities are large.',
]

const decisionGuidance = [
  'Small to medium graphs, need simplicity: Edmonds-Karp is easy and reliable.',
  'Larger or unit-capacity graphs: Dinic offers faster performance.',
  'Dense graphs or need practical speed: push-relabel with heuristics often wins.',
  'Need matchings or min-cut: model as flow; specialized algorithms (Hopcroft-Karp) can be even faster on bipartite graphs.',
]

const takeaways = [
  'Flow problems hinge on residual graphs and augmenting or pushing until no improvement is possible.',
  'Multiple algorithms trade simplicity for speed: Edmonds-Karp for clarity, Dinic for faster blocking flows, push-relabel for dense graphs.',
  'Always maintain reverse residual edges to allow cancellation and guarantee correctness.',
]

export default function FlowNetworkAlgorithmsPage(): JSX.Element {
  return (
    <TopicLayout
      title="Flow Network Algorithms"
      subtitle="Pushing, augmenting, and cutting through capacity"
      intro="Max-flow and min-cut algorithms model networks of constrained throughput. Residual graphs track remaining capacity and allow cancellation, while augmenting-path and preflow strategies compete to fill the network efficiently."
    >
      <TopicSection heading="The big picture">
        <p className="text-white/80">
          Flow networks capture constrained movement: bandwidth, traffic, goods, or energy. Max-flow equals min-cut, so building
          flow also certifies the tightest bottleneck. Algorithms differ mainly in how they find improvements in the residual graph.
        </p>
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
