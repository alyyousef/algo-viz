import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const operations = [
  {
    title: 'Add / remove nodes',
    detail:
      'Introduce vertices to the adjacency structure and connect or disconnect them by updating edge lists or matrices.',
  },
  {
    title: 'Add / remove edges',
    detail:
      'Insert edges with weight/direction metadata, or delete them by removing an entry from the neighbor collection and keeping structures consistent.',
  },
  {
    title: 'Traverse',
    detail:
      'Explore neighbors breadth-first, depth-first, or via priority-driven expansions, marking visited nodes to avoid cycles.',
  },
  {
    title: 'Query relationships',
    detail:
      'Compute shortest paths, connectivity, or spanning subgraphs by building upon auxiliary tables updated during traversals.',
  },
]

const variants = [
  {
    title: 'Adjacency list',
    detail:
      'One list per vertex storing neighbors (plus weights). Space-efficient for sparse graphs and fast to iterate outgoing edges.',
  },
  {
    title: 'Adjacency matrix',
    detail:
      '2D grid of booleans or weights. Constant-time edge lookup suits dense graphs or algorithms relying on matrix algebra.',
  },
  {
    title: 'Directed vs undirected',
    detail:
      'Directionality controls whether edges are one-way or two-way, affecting reachability, in-degrees, and traversal choices.',
  },
  {
    title: 'Weighted vs unweighted',
    detail:
      'Include cost values to optimize paths or flow. Weighted graphs unlock Dijkstra, Bellman-Ford, and min-cost flow routines.',
  },
]

export default function GraphsPage(): JSX.Element {
  return (
    <TopicLayout
      title="Graphs"
      subtitle="Nodes, edges, and the stories between them"
      intro="Graphs represent relationships between entities. By modeling vertices and edges you can reason about networks, dependencies, and paths through complicated domains."
    >
      <TopicSection heading="Graph anatomy">
        <p>
          Every graph has vertices (nodes) and edges (connections). Edges may carry weights or directions, and the graph may allow multiple components.
        </p>
        <p>
          Traversals, searches, and cuts all explore the same underlying structure: you follow edges while visiting new nodes and record what has been seen so you can stop or continue efficiently.
        </p>
      </TopicSection>

      <TopicSection heading="Core operations">
        <div className="grid gap-3 md:grid-cols-2">
          {operations.map((op) => (
            <article key={op.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{op.title}</h3>
              <p className="text-sm text-white/80">{op.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Variants & topology">
        <div className="grid gap-3">
          {variants.map((variant) => (
            <article key={variant.title} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{variant.title}</p>
              <p className="text-sm text-white/80">{variant.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="When graphs win">
        <ul className="list-disc space-y-2 pl-5 text-sm text-white/90">
          <li>Model networks such as social graphs, transportation routes, or dependency trees.</li>
          <li>Run searches (BFS/DFS), shortest-paths, or minimum spanning trees to discover connectivity patterns.</li>
          <li>Encode flow, matching, and scheduling constraints when relationships outweigh linear order.</li>
        </ul>
      </TopicSection>

      <TopicSection heading="Implementation checklist">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/90">
          <li>Pick the storage (list, matrix, edge list) that matches expected density and updates.</li>
          <li>Account for directionality and weight when defining traversal helpers.</li>
          <li>Keep track of visited nodes or distances in temporary arrays/maps so algorithms stay correct.</li>
        </ol>
      </TopicSection>
    </TopicLayout>
  )
}
