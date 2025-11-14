import { Link } from 'react-router-dom'
import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const ALGORITHM_LINKS = [
  { name: 'Breadth-First Search', to: '/dsa/2-core-algorithms/2-graph-algorithms/1-breadth-first-search' },
  { name: "Dijkstra's Algorithm", to: '/dsa/2-core-algorithms/2-graph-algorithms/2-dijkstra-s-algorithm' },
  { name: 'Minimum Spanning Tree', to: '/dsa/2-core-algorithms/2-graph-algorithms/3-minimum-spanning-tree' },
]

export default function GraphAlgorithmsPage(): JSX.Element {
  return (
    <TopicLayout
      title="Graph Algorithms"
      subtitle="Exploring networks and paths"
      intro="Graph algorithms decode connections: they trace paths, weigh routes, and expose the minimum structures hiding in a web of edges. In this section you get the grounding before drilling into the algorithms that fill the toolkit."
    >
      <TopicSection heading="What you will find here">
        <p>These algorithms walk the graph in different orders, balancing depth, cost, or connectivity depending on your goal.</p>
        <p>From layer-wise sweeps (BFS) to weighted routing (Dijkstra) and cost-minimizing backbones (MST), we cover the classic perspectives that fuel most graph problems.</p>
      </TopicSection>

      <TopicSection heading="Algorithms in this folder">
        <div className="space-y-2 text-sm text-white/90">
          <p>Tap any entry to read the narrative for that algorithm, understand the core data you need, and see when to wield it.</p>
          <ul className="list-disc space-y-1 pl-5">
            {ALGORITHM_LINKS.map(({ name, to }) => (
              <li key={name}>
                <Link to={to} className="underline hover:text-cyan-200">
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </TopicSection>

      <TopicSection heading="Why this grouping">
        <p>Graphs need both structure and traversal. BFS understands layers, Dijkstra handles cost, and MST carves the lightest tree. Together they make the first trio any graph toolkit should offer.</p>
        <p>Once you've absorbed these, you can explore more specialized algorithms (flows, matchings, embeddings) with a solid intuition for how edges behave under different priorities.</p>
      </TopicSection>
    </TopicLayout>
  )
}
