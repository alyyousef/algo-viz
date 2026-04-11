import { Link } from 'react-router-dom'

import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { type TopicTab, useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

const ALGORITHM_LINKS = [
  {
    name: 'Breadth-First Search',
    to: '/dsa/2-core-algorithms/2-graph-algorithms/1-breadth-first-search',
  },
  {
    name: "Dijkstra's Algorithm",
    to: '/dsa/2-core-algorithms/2-graph-algorithms/2-dijkstra-s-algorithm',
  },
  {
    name: 'Minimum Spanning Tree',
    to: '/dsa/2-core-algorithms/2-graph-algorithms/3-minimum-spanning-tree',
  },
]

type TabId = 'overview'

const tabs: TopicTab<TabId>[] = [{ id: 'overview', label: 'Overview' }]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  overview: [
    { id: 'what-you-will-find-here', label: 'What You Will Find Here' },
    { id: 'algorithms-in-this-folder', label: 'Algorithms In This Folder' },
    { id: 'why-this-grouping', label: 'Why This Grouping' },
  ],
}

export default function GraphAlgorithmsPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Graph Algorithms',
    defaultTab: 'overview',
  })

  return (
    <TopicPageShell
      title="Graph Algorithms"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Graph Algorithms</h1>
      <p className="bin98-doc-subtitle">Exploring networks and paths</p>
      <p>
        Graph algorithms decode connections: they trace paths, weigh routes, and expose the minimum
        structures hiding in a web of edges. In this section you get the grounding before drilling
        into the algorithms that fill the toolkit.
      </p>

      <section id="what-you-will-find-here" className="bin98-section">
        <h2 className="bin98-heading">What You Will Find Here</h2>
        <p>
          These algorithms walk the graph in different orders, balancing depth, cost, or
          connectivity depending on your goal.
        </p>
        <p>
          From layer-wise sweeps (BFS) to weighted routing (Dijkstra) and cost-minimizing backbones
          (MST), we cover the classic perspectives that fuel most graph problems.
        </p>
      </section>

      <hr className="bin98-divider" />

      <section id="algorithms-in-this-folder" className="bin98-section">
        <h2 className="bin98-heading">Algorithms In This Folder</h2>
        <p>
          Tap any entry to read the narrative for that algorithm, understand the core data you need,
          and see when to wield it.
        </p>
        <ul>
          {ALGORITHM_LINKS.map(({ name, to }) => (
            <li key={name}>
              <Link to={to}>{name}</Link>
            </li>
          ))}
        </ul>
      </section>

      <hr className="bin98-divider" />

      <section id="why-this-grouping" className="bin98-section">
        <h2 className="bin98-heading">Why This Grouping</h2>
        <p>
          Graphs need both structure and traversal. BFS understands layers, Dijkstra handles cost,
          and MST carves the lightest tree. Together they make the first trio any graph toolkit
          should offer.
        </p>
        <p>
          Once you&apos;ve absorbed these, you can explore more specialized algorithms (flows,
          matchings, embeddings) with a solid intuition for how edges behave under different
          priorities.
        </p>
      </section>
    </TopicPageShell>
  )
}
