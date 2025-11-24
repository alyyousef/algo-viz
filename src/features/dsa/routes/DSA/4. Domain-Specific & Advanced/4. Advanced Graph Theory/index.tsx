import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const flowTools = [
  {
    title: 'Dinic with scaling',
    detail:
      'Level graphs plus blocking flows deliver O(EV^2) worst case and are fast in practice; capacity scaling improves performance on graphs with large capacities.',
  },
  {
    title: 'Push-relabel (HLPP)',
    detail:
      'Maintains preflow and heights; gap/heuristic variants like highest-label or global relabeling make it a workhorse for dense flow problems.',
  },
  {
    title: 'Min cut / max flow duality',
    detail:
      'Once you have max flow, the residual graph separates source-reachable nodes from the rest to yield a minimum s-t cut. Critical for segmentation, bipartite matching, and network design.',
  },
  {
    title: 'Min-cost flow and potentials',
    detail:
      'Successive shortest augmenting paths with Johnson potentials or cost-scaling give you optimal flow with costs; beware of negative edges and maintain reduced costs.',
  },
]

const decompositions = [
  {
    title: 'Strongly connected components (SCC)',
    detail:
      'Kosaraju or Tarjan condense a directed graph into a DAG of components to simplify reachability, 2-SAT, or cycle detection.',
  },
  {
    title: 'Bridges, articulation points, BCCs',
    detail:
      'DFS with low-link values finds edges/vertices whose removal disconnects the graph. Block-cut trees model articulation structure for queries.',
  },
  {
    title: 'Tree decompositions',
    detail:
      'Centroid or heavy-light decomposition breaks trees for path/subtree queries. On general graphs, treewidth-based decompositions enable exponential-in-width DP.',
  },
  {
    title: 'Matchings and covers',
    detail:
      "Hopcroft-Karp for bipartite matching; Kuhn-Munkres (Hungarian) for assignment. Konig's theorem links min vertex cover and max matching in bipartite graphs.",
  },
]

const patterns = [
  'Euler tour + binary lifting (LCA) to answer ancestor, path min/max, or parity queries quickly.',
  'DSU on tree (small-to-large) to aggregate subtree queries with near-linear complexity.',
  'Topological order on condensed SCC DAGs to run DP over strongly connected regions without double-counting cycles.',
  'Flow reductions: model bipartite matching, edge-disjoint paths, or project selection as flow networks to reuse well-tuned solvers.',
]

const checklists = [
  'Define constraints: density, capacity size, and need for costs decide between Dinic, push-relabel, or min-cost flow variants.',
  'Normalize directions: choose consistent edge indexing (forward/residual) to avoid update bugs in flow code.',
  'Guard corner cases: parallel edges, self-loops, disconnected components, and zero-capacity edges.',
  'For LCA and decompositions, precompute parents/heights once per test set; reuse across queries to stay near O(1) per answer.',
  'Prove invariants (flow conservation, non-negative reduced costs, low-link definitions) and assert them in debug builds.',
]

const scenarios = [
  {
    title: 'Need max throughput with large capacities',
    steps: ['Pick Dinic with capacity scaling or highest-label push-relabel', 'Enable global relabel and gap relabel heuristics'],
  },
  {
    title: 'Many ancestor/path queries on a static tree',
    steps: ['Precompute LCA with binary lifting', 'Layer heavy-light decomposition for path aggregates (sum/min/max)'],
  },
  {
    title: 'Bipartite assignment with costs',
    steps: ['Use Hungarian for dense graphs; min-cost max-flow for sparse cases', 'Extract matching and total cost from the residual'],
  },
  {
    title: 'Cycle-heavy directed graph logic',
    steps: ['Condense SCCs into a DAG', 'Run DP/topo algorithms on the condensed graph to avoid reprocessing cycles'],
  },
]

export default function AdvancedGraphTheoryPage(): JSX.Element {
  return (
    <TopicLayout
      title="Advanced Graph Theory"
      subtitle="Flows, cuts, matchings, and decompositions"
      intro="Beyond basic traversals, advanced graph work leans on flows, connectivity decompositions, and tree techniques to turn complex networks into tractable subproblems."
    >
      <TopicSection heading="Flow and cut toolkit">
        <div className="grid gap-3 md:grid-cols-2">
          {flowTools.map((tool) => (
            <article key={tool.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold leading-tight text-white">{tool.title}</h3>
              <p className="text-sm text-white/80">{tool.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Decompositions and matchings">
        <div className="grid gap-3 md:grid-cols-2">
          {decompositions.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Patterns to reuse">
        <ul className="list-disc space-y-2 pl-5 text-sm text-white/90">
          {patterns.map((pattern) => (
            <li key={pattern}>{pattern}</li>
          ))}
        </ul>
      </TopicSection>

      <TopicSection heading="Correctness and performance checklist">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/90">
          {checklists.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </TopicSection>

      <TopicSection heading="Pick the right approach by scenario">
        <div className="grid gap-3 md:grid-cols-2">
          {scenarios.map((scenario) => (
            <article key={scenario.title} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{scenario.title}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/80">
                {scenario.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </TopicSection>
    </TopicLayout>
  )
}

