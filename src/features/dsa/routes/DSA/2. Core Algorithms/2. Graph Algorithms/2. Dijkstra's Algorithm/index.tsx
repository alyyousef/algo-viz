import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

export default function DijkstrasPage(): JSX.Element {
  return (
    <TopicLayout
      title="Dijkstra's Algorithm"
      subtitle="Shortest paths with rising priority"
      intro="Dijkstra's algorithm walks the graph while always visiting the closest node that has not been settled yet. It pairs a distance map with a min-priority queue so that every relaxation step edges you closer to the optimal path in weighted, non-negative graphs."
    >
      <TopicSection heading="What Dijkstra guarantees">
        <p>
          Every time Dijkstra extracts a node from the queue, that node's distance is final. The algorithm never revisits it because it already found the cheapest way in—there is no shorter path left to discover in a graph with non-negative weights.
        </p>
        <p>
          That invariant lets you assemble shortest-path trees, answer single-source queries, or precompute distances for routing tables with guarantees about optimality and monotonic progress.
        </p>
      </TopicSection>

      <TopicSection heading="Core anatomy">
        <p>
          Distances live in a map keyed by node. Initialize the source to zero and everything else to infinity so the queue has a consistent baseline.
        </p>
        <p>
          The min-priority queue (binary heap, Fibonacci heap, or pairing heap) always surfaces the unsettled node with the smallest tentative distance. Every update to a neighbor pushes a new tentative value and reorders the queue.
        </p>
        <p>
          Edge relaxation compares the current distance plus edge weight against the neighbor's recorded distance. When the new path is better, update the distance and record the predecessor so paths can be reconstructed later.
        </p>
      </TopicSection>

      <TopicSection heading="How the run looks">
        <div className="space-y-2 text-sm text-white/90">
          <p>Start by pushing the source node into the queue with distance zero.</p>
          <p>Loop until the queue is empty: extract the node with the lowest tentative distance.</p>
          <p>For each outgoing edge, calculate the new distance; if it improves the neighbor's record, update the distance, change the predecessor, and push the neighbor back into the queue.</p>
          <p>Once a node is extracted, its distance is final—no future edge can reduce it because the queue already prioritized the current minimum.</p>
        </div>
      </TopicSection>

      <TopicSection heading="Variants & strategies">
        <ul className="list-disc space-y-2 pl-5 text-sm text-white/90">
          <li>Use a Fibonacci heap or radix heap for sparse graphs with tight asymptotic goals, or stick with binary heaps for predictable performance.</li>
          <li>Bidirectional Dijkstra runs from source and target simultaneously, halving the search in undirected graphs.</li>
          <li>Dial&apos;s algorithm replaces the priority queue with buckets when weights are small integers.</li>
          <li>A* adds heuristics on top of Dijkstra by mixing priority with an admissible estimate of remaining cost.</li>
          <li>Maintain parent pointers to recover entire shortest paths instead of just distances.</li>
        </ul>
      </TopicSection>

      <TopicSection heading="When to pick Dijkstra">
        <p>Shortest path problems with weighted edges but no negative weights are Dijkstra's sweet spot—think road networks, transit schedules, and network routing.</p>
        <p>Use it within planners that need distance tables, such as navigation stacks, game AI, or precomputed heuristics for more complex meta-search.</p>
        <p>When you need both the path and cost, the predecessor map gives you the route without additional passes.</p>
      </TopicSection>

      <TopicSection heading="Implementation checklist">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/90">
          <li>Assign infinity to every node except the source, which gets zero.</li>
          <li>Use a min-priority queue and push nodes whenever their distances drop.</li>
          <li>Relax every outgoing edge and update the neighbor&apos;s predecessor when the distance improves.</li>
          <li>Skip outdated queue entries by checking whether the popped distance matches the current recorded distance.</li>
          <li>Reconstruct paths using predecessor pointers once the target or all nodes are settled.</li>
        </ol>
      </TopicSection>
    </TopicLayout>
  )
}
