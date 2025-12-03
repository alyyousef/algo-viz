import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const mentalModels = [
  {
    title: 'Dependency layering',
    detail:
      'Every edge u -> v says u must appear before v. Topological ordering is a schedule that respects all such prerequisites.',
  },
  {
    title: 'Peeling zero indegree',
    detail:
      'Nodes with no unmet prerequisites can be output now; remove them and repeat to peel layers of readiness.',
  },
  {
    title: 'DFS finishing order',
    detail:
      'In a DAG, reversing DFS finishing times gives a valid topological order because children finish before parents in the directed sense.',
  },
]

const mechanics = [
  {
    heading: "Kahn's algorithm (BFS style)",
    bullets: [
      'Compute indegree for every node; enqueue nodes with indegree 0.',
      'Pop from queue, append to order, decrement indegree of outgoing neighbors; enqueue any that drop to 0.',
      'If processed count < V at the end, a cycle exists.',
    ],
  },
  {
    heading: 'DFS finishing order',
    bullets: [
      'Run DFS; on exit from a node, push it onto a stack.',
      'After traversal, reverse the stack (or pop) to produce a topo order.',
      'If a back edge is found during DFS, the graph has a cycle and no topo order exists.',
    ],
  },
  {
    heading: 'Cycle detection',
    bullets: [
      'Kahn: leftover nodes (indegree > 0) imply a cycle.',
      'DFS: encountering a gray (in-progress) node indicates a back edge (cycle).',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Time and space',
    detail:
      'Both Kahn and DFS-based methods run in O(V + E) time with O(V) space for indegree or stacks and visited state.',
  },
  {
    title: 'Ordering differences',
    detail:
      'Multiple valid orders exist; queue/stack ordering and neighbor order affect which one you see.',
  },
]

const realWorldUses = [
  {
    context: 'Build systems and CI',
    detail:
      'Order compilation or deployment steps based on dependency graphs (packages, modules, tasks).',
  },
  {
    context: 'Course scheduling',
    detail:
      'Lay out courses respecting prerequisites to find a valid term-by-term plan or detect impossibility.',
  },
  {
    context: 'Data pipelines',
    detail:
      'Schedule ETL stages so that inputs are ready before dependent transformations run.',
  },
  {
    context: 'Game logic and rendering',
    detail:
      'Resolve update/render order for scene graphs or systems with directional constraints.',
  },
]

const examples = [
  {
    title: "Kahn's algorithm",
    code: `function topoKahn(graph):
    indeg = { v: 0 for v in graph.vertices() }
    for u in graph.vertices():
        for v in graph.neighbors(u):
            indeg[v] += 1
    queue = [v for v in graph.vertices() if indeg[v] == 0]
    order = []

    while queue:
        u = queue.pop(0)  // use deque in practice
        order.append(u)
        for v in graph.neighbors(u):
            indeg[v] -= 1
            if indeg[v] == 0:
                queue.append(v)

    if len(order) != graph.size():
        throw CycleDetected
    return order`,
    explanation:
      'Zero-indegree nodes are ready to output; removing them uncovers the next layer. Leftovers imply a cycle.',
  },
  {
    title: 'DFS-based topo sort',
    code: `function topoDFS(graph):
    visited = set()
    onstack = set()
    order = []

    function dfs(u):
        visited.add(u)
        onstack.add(u)
        for v in graph.neighbors(u):
            if v in onstack:
                throw CycleDetected
            if v not in visited:
                dfs(v)
        onstack.remove(u)
        order.append(u)

    for u in graph.vertices():
        if u not in visited:
            dfs(u)

    order.reverse()
    return order`,
    explanation:
      'Finishing times reversed yield a valid order. On-stack detection catches cycles early.',
  },
]

const pitfalls = [
  'Applying topo sort to graphs with cycles will fail; detect and report cycles.',
  'Using a normal queue instead of deque for Kahn can be slow in some languages.',
  'Forgetting to reverse the DFS finishing list yields an order that violates prerequisites.',
  'Not resetting or separating visitation state between components can miss nodes.',
]

const decisionGuidance = [
  "Need explicit cycle detection plus order: Kahn's algorithm is straightforward.",
  'Already running DFS for other tasks: reuse finishing times for ordering and cycle detection.',
  'Need stable or deterministic orders: control neighbor iteration and queue/stack policy.',
]

const takeaways = [
  'Topological sort orders DAG nodes so every edge points forward; it is impossible when cycles exist.',
  'Kahn peels zero-indegree layers; DFS reverses finishing times - both run in linear time.',
  'Cycle detection is integral: leftover indegree or back edges signal failure to order.',
]

export default function TopologicalSortPage(): JSX.Element {
  return (
    <TopicLayout
      title="Topological Sort"
      subtitle="Scheduling a DAG without breaking dependencies"
      intro="Topological sorting produces an ordering of directed acyclic graph nodes where every prerequisite precedes its dependents. Kahn's queue-based peeling and DFS finishing-order reversal both deliver linear-time solutions with built-in cycle detection."
    >
      <TopicSection heading="The big picture">
        <p className="text-white/80">
          Many workflows are DAGs: builds, courses, pipelines. A topo order is any valid schedule. If no order exists, you have a
          cycle to break before progress can continue.
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
