import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

export default function GraphsPage(): JSX.Element {
  return (
    <TopicLayout
      title="Graphs"
      subtitle="Stories told by nodes and edges"
      intro="Graphs are the narrative of connection. Every vertex plays a role, edges are the chapters, and the algorithms act like detectives tracing the plot. These structures model the tangled, recursive nature of networks, decisions, transport, and dependencies."
    >
      <TopicSection heading="What makes a graph a graph?">
        <p>Graphs embrace relationships. Nodes represent entities, and edges represent the interactions or flows between them. A graph is connected when you can reach every node from another, but it can also hosts multiple components, cycles, and directed passages.</p>
        <p>The defining feature is flexibility. You can add direction, weight, multi-edges, or labels without changing the core: a set of vertices plus a relation. That makes graphs the go-to model whenever hierarchy is too rigid and linear order too narrow.</p>
      </TopicSection>

      <TopicSection heading="Core anatomy">
        <p>Vertices are the anchors: people in a social network, routers in the internet, or tasks in a scheduler. Each holds a payload or identifier.</p>
        <p>Edges connect those anchors. They may be undirected friendships, one-way hyperlinks, or weighted flights. The meaning shifts, but the traversal always follows these links.</p>
        <p>Direction and weight tune the story. A directed edge imposes a one-way relationship, while weights represent cost, capacity, or time. Together, they let you capture nuanced domains such as transport grids and dependency graphs.</p>
      </TopicSection>

      <TopicSection heading="Exploration patterns">
        <p>Depth-first search dives down a branch until it hits a dead end, then backtracks. Think of descending into a file system or unfolding a proof. Recursion mirrors the structure, so DFS feels natural and elegant.</p>
        <p>Breadth-first search spreads level by level. It visits all neighbors before going deeper, perfect for finding the shortest unweighted path or the nearest service in a network.</p>
        <p>Heuristic-driven searches (like A*), minimum spanning tree sweeps, and flow augmentations all build on these foundations. Every traversal keeps track of visited nodes or scores to avoid cycles and repetition.</p>
      </TopicSection>

      <TopicSection heading="What you can do with graphs">
        <div className="space-y-2 text-sm text-white/90">
          <p>Search for specific nodes or paths by following edges while pruning irrelevant branches. Graph search keeps you from wandering into dead ends.</p>
          <p>Insert and remove vertices or edges as your model grows. Update adjacency lists, matrices, or edge sets, and keep invariants like connectivity or acyclicity intact.</p>
          <p>Calculate shortest paths with Dijkstra, Bellman-Ford, or Floyd-Warshall so you can route traffic, avoid congestion, or schedule tasks.</p>
          <p>Discover spanning trees, matchings, and cuts that reveal the backbone of the network. Kruskal’s and Prim’s algorithms trace minimum structures that keep everything connected.</p>
          <p>Analyze flows (max flow/min cut) and dependencies (topological sort) to model supply chains, resource allocation, or compilation pipelines.</p>
        </div>
      </TopicSection>

      <TopicSection heading="Common graph flavors">
        <ul className="list-disc space-y-2 pl-5 text-sm text-white/90">
          <li>Adjacency lists keep a neighbor collection per vertex; ideal for sparse graphs and dynamic updates.</li>
          <li>Adjacency matrices provide constant-time edge checks, helping when density is high or matrix math is in play.</li>
          <li>Directed graphs impose asymmetry: one-way streets, prerequisites, or flow directions.</li>
          <li>Weighted graphs add costs that guide optimization routines.</li>
          <li>Multigraphs allow parallel edges (useful in network flows), and hypergraphs let edges touch more than two nodes at once.</li>
        </ul>
      </TopicSection>

      <TopicSection heading="Where graphs thrive">
        <p>Graphs model anything with relationships: transportation networks, recommendation systems, dependency planners, and even biological systems. Whenever multiple paths, constraints, or nested relationships exist, graphs keep the map precise.</p>
        <p>Steer away from forcing web-like data into a tree. Social networks, citation graphs, and road maps need the ability to revisit nodes through different edges; that’s where general graphs shine.</p>
      </TopicSection>

      <TopicSection heading="Building your own">
        <p>Start with simple storage: adjacency lists for flexibility or matrices for dense problems. Keep node and edge factories clean so you can swap implementations later.</p>
        <p>Design traversal helpers that accept callbacks or visitor patterns. DFS and BFS differ only in order, so abstract their common behavior for reuse.</p>
        <p>Track visited nodes, distances, or states in auxiliary maps so your algorithms stay correct even with cycles or multiple components.</p>
        <p>Add heuristics or priorities (A*, Dijkstra) when costs matter. Balance convenience (like Python dicts) with performance (typed arrays or custom pools) depending on your target environment.</p>
      </TopicSection>

      <TopicSection heading="Related structures and algorithms">
        <div className="space-y-3 text-sm text-white/90">
          <article>
            <p className="font-semibold text-white">Graph algorithms:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Depth-First Search (DFS), Breadth-First Search (BFS)</li>
              <li>Dijkstra, Bellman-Ford, Floyd-Warshall</li>
              <li>Minimum spanning trees: Kruskal, Prim</li>
              <li>Topological sort</li>
              <li>Max flow / min cut (Edmonds-Karp, Dinic)</li>
            </ul>
          </article>

          <article>
            <p className="font-semibold text-white">Hybrid structures:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Trees (specialized acyclic graphs for hierarchy)</li>
              <li>Disjoint Set Union (Union-Find) for connectivity and Kruskal’s helper</li>
              <li>Segment trees or Fenwick trees when ranges overlay graphs</li>
            </ul>
          </article>

          <article>
            <p className="font-semibold text-white">Advanced ideas:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Graph embedding and spectral methods</li>
              <li>Graph neural networks and message passing</li>
              <li>Cycle detection, strongly connected components</li>
            </ul>
          </article>
        </div>
      </TopicSection>
    </TopicLayout>
  )
}
