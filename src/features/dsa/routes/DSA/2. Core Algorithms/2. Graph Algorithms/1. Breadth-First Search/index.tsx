import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

export default function BreadthFirstSearchPage(): JSX.Element {
  return (
    <TopicLayout
      title="Breadth-First Search"
      subtitle="Wave-like exploration"
      intro="Breadth-first search (BFS) sweeps a graph layer by layer. It honors distance from the start node by visiting every neighbor before stepping deeper, which makes it the natural pick whenever proximity, shortest paths, or frontier visibility matter."
    >
      <TopicSection heading="What BFS guarantees">
        <p>
          BFS explores nodes in order of their edge distance from the origin. When you pop a node from the queue, you already know it has the minimal number of hops because every shallower neighbor was processed before it.
        </p>
        <p>
          That level-by-level discipline exposes the frontier. You can stop once you discover your target, measure how many hops away every node sits, or trigger events per layer without additional bookkeeping.
        </p>
      </TopicSection>

      <TopicSection heading="Core anatomy">
        <p>
          A FIFO queue tracks the frontier. Nodes enter the queue as soon as they become visible and wait while earlier nodes finish their turn. No node can skip ahead, so BFS naturally respects the order you care about.
        </p>
        <p>
          The visited set keeps cycles from spiraling out of control and also marks nodes whose distance has already been locked in. Mark them before enqueueing so they never reappear downstream.
        </p>
        <p>
          Neighbors live in adjacency lists or matrices; BFS treats all edges equally. You can layer weights or priorities later, but the core algorithm only needs to know what is directly reachable from each node.
        </p>
      </TopicSection>

      <TopicSection heading="How the traversal unfolds">
        <div className="space-y-2 text-sm text-white/90">
          <p>Seed the queue with your start nodes (single source, multi source, or even an entire frontier) and mark them visited.</p>
          <p>Dequeue the next node, record results such as distance or parent, then enqueue every unvisited neighbor while marking them immediately.</p>
          <p>Because the queue always processes the oldest entries first, nodes that entered together stay within the same layer; their children enter later, preserving depth order.</p>
          <p>Stop early if you find what you need, or let the loop finish to learn the distances of every reachable node.</p>
        </div>
      </TopicSection>

      <TopicSection heading="Variants & strategies">
        <ul className="list-disc space-y-2 pl-5 text-sm text-white/90">
          <li>Multi-source BFS begins with multiple starting nodes so their wavefronts collide naturally, useful for spreading contagion or simultaneous reachability.</li>
          <li>Bidirectional BFS runs two searches from source and target, meeting in the middle to dramatically cut explored territory.</li>
          <li>0-1 BFS swaps the queue for a deque when edge weights are 0 or 1, pushing zero-cost moves to the front so they stay within the current layer.</li>
          <li>Layered BFS builds level graphs in flow algorithms (Dinic), keeping track of distances to respect residual capacity order.</li>
          <li>Tree/forest BFS records parents to build spanning graphs where each node points back to the node that first discovered it.</li>
        </ul>
      </TopicSection>

      <TopicSection heading="When to reach for BFS">
        <p>BFS finds the shortest path in unweighted graphs, so it is the first tool for maze solving, grid-based puzzles, and hop-limited routing.</p>
        <p>Use BFS for proximity queries, range expansion, or ripple effects where you need to see the frontier at each wave before triggering the next step.</p>
        <p>The explicit layers make it easy to pause, throttle, or visualize each level while leaving depth-first explorations to other algorithms.</p>
      </TopicSection>

      <TopicSection heading="Implementation checklist">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/90">
          <li>Pick an adjacency structure (list for sparse graphs, matrix for dense ones).</li>
          <li>Initialize the queue with start nodes and mark them visited to lock in their distance.</li>
          <li>While the queue isn&apos;t empty: dequeue, process, then enqueue every newly discovered neighbor.</li>
          <li>Store parents/distances in parallel maps if you need to reconstruct paths or report distances later.</li>
          <li>Mark nodes before enqueueing to avoid double visits and keep your queue size manageable.</li>
        </ol>
      </TopicSection>
    </TopicLayout>
  )
}
