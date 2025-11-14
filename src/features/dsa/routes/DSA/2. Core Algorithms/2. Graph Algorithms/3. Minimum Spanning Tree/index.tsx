import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

export default function MinimumSpanningTreePage(): JSX.Element {
  return (
    <TopicLayout
      title="Minimum Spanning Tree"
      subtitle="The cheapest backbone"
      intro="Minimum spanning trees (MSTs) connect every node with the smallest total weight. They strip a graph down to its essentials—no cycles, just enough edges to keep the network intact. Kruskal, Prim, and other greedy strategies hunt for the lightest connections that still span the graph."
    >
      <TopicSection heading="Why MSTs matter">
        <p>
          MSTs build efficient infrastructures: telephone lines, fiber networks, road systems. Once calculated, they reveal the cheapest way to visit all vertices without redundancy.
        </p>
        <p>
          Because MSTs drop cycles, they also highlight the minimal dependencies you need to maintain connectivity. They are the skeleton of a dense graph, ideal for sensitivity analysis and baseline comparisons.
        </p>
      </TopicSection>

      <TopicSection heading="Core anatomy">
        <p>
          Edges are the primary actors. Sort them (Kruskal) or explore neighbors (Prim) while always choosing the cheapest next edge that does not create a cycle.
        </p>
        <p>
          Union-Find (disjoint set) is Kruskal's guardrail against cycles. It keeps track of which components are already connected so you only add safe edges.
        </p>
        <p>
          Prim keeps a priority queue of frontier edges. Its tree grows outward from a seed node, always adding the cheapest edge that touches the current tree.
        </p>
      </TopicSection>

      <TopicSection heading="How you build one">
        <div className="space-y-2 text-sm text-white/90">
          <p>Kruskal sorts every edge and walks them from lightest to heaviest, adding an edge when it links two previously disconnected components.</p>
          <p>Prim starts from a node, pushes its outgoing edges into a priority queue, and keeps pulling the smallest edge that connects to an untouched vertex.</p>
          <p>Reverse-Delete works backward: remove edges from heaviest to lightest, but only if their removal leaves the graph connected.</p>
          <p>Maintain the set of chosen edges and total weight as you proceed, so the final tree is ready for interpretation.</p>
        </div>
      </TopicSection>

      <TopicSection heading="Variants & strategies">
        <ul className="list-disc space-y-2 pl-5 text-sm text-white/90">
          <li>Borůvka's algorithm runs in rounds, adding the cheapest outgoing edge for each component simultaneously—great for parallelism.</li>
          <li>Using a binary heap, pairing heap, or Fibonacci heap for Prim affects performance; choose based on graph density and constant factors.</li>
          <li>Dynamic MSTs update the tree as edges are added or removed; maintain components with link-cut trees or other advanced structures.</li>
          <li>Kruskal with bucket sort or radix sort edges when weights are integers tightens the overall complexity.</li>
          <li>Minimum spanning forests extend MSTs to disconnected graphs by processing each component separately.</li>
        </ul>
      </TopicSection>

      <TopicSection heading="When MST guides the design">
        <p>Network design, clustering, and approximation algorithms all greedily rely on MSTs to represent efficient connectivity.</p>
        <p>Use MSTs to get starting solutions for traveling salesman heuristics or to compare alternative layouts and detect redundant edges.</p>
        <p>They also help with energy-aware routing, infrastructure planning, and any situation where cycles increase cost.</p>
      </TopicSection>

      <TopicSection heading="Implementation checklist">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/90">
          <li>Decide whether Kruskal, Prim, or another greedy strategy fits your graph and requirements.</li>
          <li>Sort edges or keep a priority queue of frontier edges, depending on the chosen algorithm.</li>
          <li>Track components with Union-Find (Kruskal) or maintain a visited set (Prim).</li>
          <li>When adding an edge, ensure it connects two different components to avoid cycles.</li>
          <li>Collect the edges (and optionally the tree structure) so downstream code can use the MST directly.</li>
        </ol>
      </TopicSection>
    </TopicLayout>
  )
}
