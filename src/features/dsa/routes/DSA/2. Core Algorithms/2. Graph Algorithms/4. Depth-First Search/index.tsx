import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const mentalModels = [
  {
    title: 'Hand on the wall',
    detail:
      'Like walking a maze with one hand on the wall, DFS keeps pushing forward until it cannot, then backtracks to the last junction.',
  },
  {
    title: 'Call stack explorer',
    detail:
      'Recursion or an explicit stack records the return path. Each push dives deeper; each pop returns to an unfinished branch.',
  },
  {
    title: 'Time stamps',
    detail:
      'Entry and exit times give a natural ordering of edges: tree, back, forward, and cross, which power cycle detection and topological sorting.',
  },
]

const mechanics = [
  {
    heading: 'Core loop',
    bullets: [
      'Mark node as visited; record entry time.',
      'For each neighbor: if unvisited, recurse/push; otherwise classify edge as back/forward/cross as needed.',
      'On return, record exit time; push to a finishing stack if building a topo order or SCC meta-graph.',
    ],
  },
  {
    heading: 'Iterative vs. recursive',
    bullets: [
      'Recursive DFS is concise but risks stack overflow on very deep graphs.',
      'Iterative DFS uses an explicit stack; push children manually to control order and avoid recursion limits.',
    ],
  },
  {
    heading: 'Classification and utilities',
    bullets: [
      'Back edge to an ancestor signals a cycle in directed graphs.',
      'Finishing times reversed yield a topological order in DAGs.',
      'Edge types feed articulation point and bridge detection via low-link values.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Work and space',
    detail:
      'O(V + E) time with adjacency lists; O(V) memory for visited plus recursion/stack depth proportional to path length.',
  },
  {
    title: 'Ordering effects',
    detail:
      'Neighbor order changes traversal order but not complexity; it can matter for tie-breaking in applications like maze generation.',
  },
]

const realWorldUses = [
  {
    context: 'Topological sorting and cycle detection',
    detail:
      'DFS finishing times produce topo orders for DAGs and quickly expose back edges (cycles) in dependency graphs.',
  },
  {
    context: 'Strongly connected components',
    detail:
      'Kosaraju and Tarjan both rely on DFS passes to group vertices with mutual reachability.',
  },
  {
    context: 'Bridge and articulation points',
    detail:
      'Low-link DFS computes critical edges and nodes in networks (e.g., connectivity resilience).',
  },
  {
    context: 'Puzzle and state search',
    detail:
      'Depth-first backtracking drives Sudoku solvers, N-queens, and DFS-based SAT/constraint searches.',
  },
]

const examples = [
  {
    title: 'Iterative DFS',
    code: `function dfsIterative(graph, start):
    visited = set()
    stack = [start]

    while stack:
        node = stack.pop()
        if node in visited:
            continue
        visited.add(node)
        for neighbor in graph.neighbors(node):
            if neighbor not in visited:
                stack.push(neighbor)
    return visited`,
    explanation:
      'Explicit stack avoids recursion depth limits and allows custom neighbor ordering (e.g., reverse to mimic recursive order).',
  },
  {
    title: 'Recursive DFS with finishing order',
    code: `function dfs(node):
    visited.add(node)
    for neigh in graph.neighbors(node):
        if neigh not in visited:
            dfs(neigh)
    finish.append(node)`,
    explanation:
      'Appending on exit records finishing order. Reversing finish yields a topological sort in DAGs.',
  },
]

const pitfalls = [
  'Recursion depth overflow on large/deep graphs; switch to iterative.',
  'Forgetting to mark visited before recursion can cause exponential blowup on cyclic graphs.',
  'Assuming DFS finds shortest paths in edge count - it does not; use BFS for that.',
  'Using DFS finishing order as topo sort on graphs with cycles yields invalid orders; detect cycles first.',
]

const decisionGuidance = [
  'Need reachability, component labeling, or ordering tasks: use DFS.',
  'Need shortest hop paths: prefer BFS.',
  'Need weighted shortest paths: use Dijkstra or Bellman-Ford.',
  'Need SCCs, articulation points, bridges, or topo sort: DFS variants are the backbone.',
]

const takeaways = [
  'DFS dives deep, using a stack to remember the path; it runs in O(V + E) and excels at structural graph questions.',
  'Edge classifications and finishing times turn DFS into a multipurpose tool: topo sorts, SCCs, bridges, cycles.',
  'Control recursion depth with an explicit stack on large or adversarial inputs.',
]

export default function DepthFirstSearchPage(): JSX.Element {
  return (
    <TopicLayout
      title="Depth-First Search"
      subtitle="Backtracking through the graph frontier"
      intro="Depth-first search explores by diving until it must backtrack. With O(V + E) work and a simple stack discipline, it powers topological sorts, cycle detection, articulation point finding, and SCC algorithms."
    >
      <TopicSection heading="The big picture">
        <p className="text-white/80">
          DFS is the opposite of BFS: it commits to a branch until blocked, then rewinds. This behavior exposes ancestry
          relationships and finishing times that become the backbone of many graph analyses beyond mere reachability.
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
