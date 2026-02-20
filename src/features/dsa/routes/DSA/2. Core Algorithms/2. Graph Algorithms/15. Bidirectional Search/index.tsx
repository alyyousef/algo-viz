import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: 'Meet-in-the-middle search in early AI (1960s to 1970s)',
    detail:
      'Researchers observed that expanding from both ends can cut depth in half. This idea became a standard tool when state spaces were too large for one-sided search.',
  },
  {
    title: 'Bidirectional BFS for unweighted shortest paths (1970s)',
    detail:
      'The algorithm gained traction in graph theory and AI as a fast way to find shortest paths in unweighted graphs, especially when branching factor is high.',
  },
  {
    title: 'Bidirectional Dijkstra for weighted routing (1990s)',
    detail:
      'Routing systems adopted dual priority queues to cut the search space on large weighted road networks, with formal termination conditions.',
  },
  {
    title: 'Modern navigation and social graphs (2000s to now)',
    detail:
      'Large-scale systems use bidirectional search, often with heuristics and pruning, to answer shortest-path and reachability queries interactively.',
  },
]

const prerequisites = [
  {
    title: 'Known start and goal',
    detail:
      'Bidirectional search needs a single source and a single target to expand from both ends.',
  },
  {
    title: 'Graph traversal access',
    detail:
      'For directed graphs, you must traverse incoming edges on the goal side.',
  },
  {
    title: 'Nonnegative weights for Dijkstra',
    detail:
      'Weighted bidirectional search assumes nonnegative edges to preserve shortest paths.',
  },
  {
    title: 'Memory for two visited sets',
    detail:
      'You store visited nodes and parents from both sides, which doubles bookkeeping.',
  },
]

const inputsOutputs = [
  {
    title: 'Input',
    detail:
      'Graph G(V, E), start s, goal t, and optionally edge weights.',
  },
  {
    title: 'Output',
    detail:
      'A shortest path between s and t, or failure if unreachable.',
  },
  {
    title: 'Optional',
    detail:
      'Distance maps from both sides for diagnostics or alternative path choices.',
  },
]

const formalDefinitions = [
  {
    title: 'Frontiers',
    detail:
      'Two queues or heaps that hold the boundary of the explored region from each side.',
  },
  {
    title: 'Intersection',
    detail:
      'A node visited by both sides defines a candidate path through that node.',
  },
  {
    title: 'Meeting cost',
    detail:
      'For weighted graphs, total cost is distStart[x] + distGoal[x].',
  },
  {
    title: 'Termination condition',
    detail:
      'Stop when no unexplored path can beat the best meeting cost found so far.',
  },
]

const mentalModels = [
  {
    title: 'Two waves that meet',
    detail:
      'Imagine ripples expanding from both the start and goal. The first place the waves intersect is where the path is stitched together.',
  },
  {
    title: 'Depth halving',
    detail:
      'If a path is length d, each side only needs to search about d/2 levels. For exponential branching, that means a dramatic reduction in explored nodes.',
  },
  {
    title: 'Balanced effort',
    detail:
      'You spend search budget where it matters. Expand the smaller frontier to keep both sides balanced and limit redundant exploration.',
  },
]

const coreMechanics = [
  {
    title: 'Two frontiers, two visited sets',
    detail:
      'Maintain a frontier from the start and one from the goal. Each expansion marks visited nodes, along with parent pointers for reconstruction.',
  },
  {
    title: 'Intersection as stopping signal',
    detail:
      'When a node is visited by both sides, a path exists through that meeting point. In unweighted graphs, the first meeting gives a shortest path.',
  },
  {
    title: 'Frontier selection',
    detail:
      'Expand the frontier with fewer nodes or lower total cost to reduce work. This keeps the search balanced and improves worst-case performance.',
  },
]

const stepByStepFlow = [
  'Initialize frontierStart with s and frontierGoal with t.',
  'Create visited and parent maps for both sides.',
  'Expand the smaller frontier or the one with smaller min distance.',
  'Relax neighbors and mark newly discovered nodes.',
  'Check whether any newly visited node exists in the opposite visited map.',
  'If found, compute total cost and keep the best meeting node.',
  'Stop when the termination rule is satisfied and reconstruct the path.',
]

const dataStructures = [
  {
    title: 'Two queues or heaps',
    detail:
      'BFS uses queues; Dijkstra uses priority queues for both directions.',
  },
  {
    title: 'Visited and parent maps',
    detail:
      'Track which nodes each side has explored and how to reconstruct paths.',
  },
  {
    title: 'Distance arrays',
    detail:
      'Store best-known distances from both directions for weighted graphs.',
  },
  {
    title: 'Best meeting record',
    detail:
      'Keep the best meeting node and cost found so far.',
  },
]

const correctnessNotes = [
  {
    title: 'Unweighted shortest path',
    detail:
      'BFS expands in layers. The first intersection yields a shortest path by edge count.',
  },
  {
    title: 'Weighted shortest path',
    detail:
      'Dijkstra order and the cost-based stop rule guarantee the best meeting is optimal.',
  },
  {
    title: 'Directed graph handling',
    detail:
      'Backward search must use reverse edges to preserve path direction.',
  },
]

const keyStructures = [
  {
    title: 'Queues or priority queues',
    detail:
      'Use FIFO queues for unweighted graphs (bidirectional BFS) and min-heaps for weighted graphs (bidirectional Dijkstra).',
  },
  {
    title: 'Visited maps with parents',
    detail:
      'Track predecessor from each side. When frontiers meet, you can reconstruct the path by following parent links to the start and goal.',
  },
  {
    title: 'Distance maps',
    detail:
      'For weighted graphs, store best-known distances from both directions. These allow safe termination when no better path can appear.',
  },
  {
    title: 'Meeting point tracking',
    detail:
      'Keep the best meeting node and path length seen so far. This is essential for weighted variants where the first intersection is not always optimal.',
  },
]

const terminationRules = [
  {
    title: 'Unweighted graphs',
    detail:
      'Stop when the frontiers intersect. The path length is the depth from start to meeting plus depth from goal to meeting.',
  },
  {
    title: 'Weighted graphs',
    detail:
      'Stop when minDistStart + minDistGoal >= bestPathFound. This guarantees the current best meeting is optimal.',
  },
  {
    title: 'Directed graphs',
    detail:
      'Run the reverse search using incoming edges. The meeting still works, but you must respect edge directions on both sides.',
  },
]

const complexityNotes = [
  {
    title: 'Time complexity',
    detail:
      'For branching factor b and shortest path length d, bidirectional BFS explores about O(b^(d/2)) per side instead of O(b^d).',
  },
  {
    title: 'Space complexity',
    detail:
      'Both visited sets must be stored, so memory is O(b^(d/2)) in the ideal case. This can still be heavy, but far less than one-sided search.',
  },
  {
    title: 'Overhead costs',
    detail:
      'Two frontiers and intersection checks add constant overhead, but the exponential savings usually dominate in large graphs.',
  },
  {
    title: 'Heuristic effects',
    detail:
      'Adding heuristics can reduce explored nodes further but complicates correctness. Bidirectional A* requires careful termination conditions.',
  },
]

const realWorldUses = [
  {
    context: 'Navigation and routing',
    detail:
      'Road networks are large but sparse. Bidirectional Dijkstra cuts query times for shortest path between two locations.',
  },
  {
    context: 'Social network queries',
    detail:
      'Finding degrees of separation between two users is a classic bidirectional BFS use case due to high branching factor.',
  },
  {
    context: 'Word ladder puzzles',
    detail:
      'Searching from both the start word and the target word halves the depth and speeds up dictionary lookups.',
  },
  {
    context: 'State-space planning',
    detail:
      'Robotics and planning tasks use bidirectional search to reduce search depth in large action spaces.',
  },
]

const examples = [
  {
    title: 'Bidirectional BFS for unweighted shortest path',
    code: `function biBfs(graph, start, goal):
    if start == goal: return [start]
    qStart = Queue([start])
    qGoal = Queue([goal])
    parentStart = Map(start -> null)
    parentGoal = Map(goal -> null)

    while qStart not empty and qGoal not empty:
        meet = expandOneLayer(graph, qStart, parentStart, parentGoal)
        if meet: return buildPath(meet, parentStart, parentGoal)
        meet = expandOneLayer(graph, qGoal, parentGoal, parentStart)
        if meet: return buildPath(meet, parentStart, parentGoal)

    return null`,
    explanation:
      'Each expansion checks if the newly visited node already exists in the opposite visited map. The first intersection yields a shortest path in unweighted graphs.',
  },
  {
    title: 'Bidirectional Dijkstra for weighted graphs',
    code: `function biDijkstra(graph, start, goal):
    pqStart = MinHeap((0, start))
    pqGoal = MinHeap((0, goal))
    distStart = Map(start -> 0)
    distGoal = Map(goal -> 0)
    best = Infinity
    meeting = null

    while pqStart and pqGoal:
        if pqStart.min + pqGoal.min >= best: break
        relaxOne(pqStart, distStart, distGoal, graph, (node) => {
            total = distStart[node] + distGoal.get(node, Infinity)
            if total < best: best = total; meeting = node
        })
        relaxOne(pqGoal, distGoal, distStart, graphReverse, (node) => {
            total = distGoal[node] + distStart.get(node, Infinity)
            if total < best: best = total; meeting = node
        })

    return reconstructPath(meeting, distStart, distGoal)`,
    explanation:
      'Weighted graphs need min-heaps and a termination condition based on current best path length. The first intersection is not always optimal.',
  },
  {
    title: 'Using balanced frontier expansion',
    code: `function balancedStep(frontierA, frontierB):
    if frontierA.size <= frontierB.size:
        return expand(frontierA)
    return expand(frontierB)`,
    explanation:
      'Expanding the smaller frontier keeps the two searches balanced and typically minimizes the total number of explored nodes.',
  },
]

const edgeCases = [
  'Start equals goal: return the single-node path immediately.',
  'Disconnected graphs: frontiers exhaust without meeting.',
  'Directed graphs without reverse edges: build reverse adjacency first.',
  'Weighted graphs with zero-weight edges: still valid for Dijkstra.',
]

const pitfalls = [
  'Stopping too early in weighted graphs. The first meeting is not guaranteed to be optimal without a proper termination rule.',
  'Forgetting to reverse edges in directed graphs. The backward search must follow incoming edges, not outgoing.',
  'Reconstructing the path incorrectly. Remember to reverse one side and avoid duplicating the meeting node.',
  'Using inconsistent visited checks. A node must be marked before you test for intersection to avoid missing early meetings.',
  'Mixing heuristic search without correct proofs. Bidirectional A* needs careful admissibility and consistent stopping criteria.',
]

const decisionGuidance = [
  'You need shortest paths in large unweighted graphs with high branching factor.',
  'You have a well-defined start and goal and can search backward from the goal.',
  'Memory can hold two visited sets, but full one-sided BFS is too expensive.',
  'You can afford extra bookkeeping for parent and distance maps.',
  'You need faster interactive queries, such as navigation or social graph lookups.',
]

const implementationNotes = [
  {
    title: 'Balanced expansion',
    detail:
      'Expanding the smaller frontier reduces total explored nodes.',
  },
  {
    title: 'Path stitching',
    detail:
      'Reverse the goal-side path before concatenation and avoid duplicating the meeting node.',
  },
  {
    title: 'Termination for Dijkstra',
    detail:
      'Use minStart + minGoal >= bestFound to stop safely.',
  },
  {
    title: 'Memory limits',
    detail:
      'If visited maps are too large, consider heuristic search or pruning.',
  },
]

const advancedInsights = [
  {
    title: 'Search direction strategy',
    detail:
      'Choosing the smaller frontier or lower minimum-cost frontier reduces total expansions. This is often more effective than strict alternation.',
  },
  {
    title: 'Meet-in-the-middle with heuristics',
    detail:
      'Bidirectional A* can be powerful but fragile. It requires consistent heuristics and a termination condition that guarantees optimality.',
  },
  {
    title: 'Graph preprocessing',
    detail:
      'Techniques like contraction hierarchies or landmark heuristics can be combined with bidirectional search to speed up routing queries.',
  },
  {
    title: 'Path stitching quality',
    detail:
      'In weighted graphs, the best meeting node may not be the first. Tracking the best total cost meeting preserves optimality.',
  },
]

const takeaways = [
  'Bidirectional search cuts depth in half, which can reduce explored nodes exponentially.',
  'The algorithm is most effective when both sides can expand symmetrically and meet near the middle.',
  'Unweighted graphs allow a clean stopping rule at the first intersection; weighted graphs require a cost-based termination check.',
  'Correct path reconstruction depends on parent maps from both directions.',
  'The extra bookkeeping is usually worth the speedup on large graphs.',
]

const variantTable = [
  {
    variant: 'Bidirectional BFS',
    graphType: 'Unweighted, undirected or directed with reverse edges',
    guarantee: 'Shortest path by edge count',
    useCase: 'Social graphs, word ladders, connectivity checks',
  },
  {
    variant: 'Bidirectional Dijkstra',
    graphType: 'Weighted, non-negative edges',
    guarantee: 'Shortest path by total weight',
    useCase: 'Routing, logistics, map navigation',
  },
  {
    variant: 'Bidirectional A*',
    graphType: 'Weighted with admissible heuristics',
    guarantee: 'Shortest path with careful termination',
    useCase: 'Games, robotics, path planning with heuristics',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const win98HelpStyles = `
.bi98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  padding: 0;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.bi98-window {
  width: 100%;
  min-height: 100dvh;
  margin: 0;
  background: #c0c0c0;
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.bi98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 24px;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.bi98-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  line-height: 1;
  white-space: nowrap;
}

.bi98-title-controls {
  margin-left: auto;
  display: flex;
  gap: 2px;
}

.bi98-control {
  width: 18px;
  height: 16px;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  line-height: 1;
  cursor: pointer;
}

.bi98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.bi98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  color: #000;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.bi98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.bi98-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 230px 1fr;
}

.bi98-toc {
  background: #efefef;
  border-right: 1px solid #808080;
  padding: 12px;
  overflow: auto;
}

.bi98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.bi98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.bi98-toc-list li {
  margin: 0 0 8px;
}

.bi98-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.bi98-toc-list a:hover {
  text-decoration: underline;
}

.bi98-content {
  padding: 14px 20px 22px;
  overflow: auto;
}

.bi98-doc-title {
  margin: 0 0 10px;
  font-size: 20px;
  font-weight: 700;
}

.bi98-content a {
  color: #000080;
}

.bi98-section {
  margin: 0 0 18px;
}

.bi98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.bi98-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.bi98-content p,
.bi98-content li {
  margin: 0 0 9px;
  font-size: 12px;
  line-height: 1.5;
}

.bi98-content ul,
.bi98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.bi98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 13px 0;
}

.bi98-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.bi98-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  line-height: 1.4;
}

@media (max-width: 900px) {
  .bi98-main {
    grid-template-columns: 1fr;
  }

  .bi98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}
`

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-history', label: 'Historical Context' },
    { id: 'bp-prerequisites', label: 'Prerequisites' },
    { id: 'bp-io', label: 'Inputs and Outputs' },
    { id: 'bp-formal', label: 'Formal Concepts' },
    { id: 'bp-mental', label: 'Mental Models' },
    { id: 'bp-when', label: 'When to Use It' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-mechanics', label: 'Core Mechanics' },
    { id: 'core-flow', label: 'Step-by-Step Flow' },
    { id: 'core-key-structures', label: 'Key Structures' },
    { id: 'core-data-structures', label: 'Data Structures' },
    { id: 'core-termination', label: 'Termination Rules' },
    { id: 'core-correctness', label: 'Correctness' },
    { id: 'core-complexity', label: 'Complexity and Tradeoffs' },
    { id: 'core-implementation', label: 'Implementation Notes' },
    { id: 'core-advanced', label: 'Advanced Insights' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
  ],
  examples: [
    { id: 'ex-code', label: 'Code Examples' },
    { id: 'ex-applications', label: 'Real-World Applications' },
    { id: 'ex-edge-cases', label: 'Edge Cases' },
  ],
  glossary: [
    { id: 'glossary-terms', label: 'Core Terms' },
    { id: 'glossary-variants', label: 'Variants and Guarantees' },
  ],
}

export default function BidirectionalSearchPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    const tab = searchParams.get('tab')
    return isTabId(tab) ? tab : 'big-picture'
  })
  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Bidirectional Search (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Bidirectional Search',
      url: `${location.pathname}${location.search}${location.hash}`,
      kind: 'help',
    }

    const rawTasks = window.localStorage.getItem(MINIMIZED_HELP_TASKS_KEY)
    const parsedTasks = rawTasks ? (JSON.parse(rawTasks) as Array<{ id: string }>) : []
    const nextTasks = [...parsedTasks.filter((task) => task.id !== minimizedTask.id), minimizedTask]
    window.localStorage.setItem(MINIMIZED_HELP_TASKS_KEY, JSON.stringify(nextTasks))

    const historyState = window.history.state as { idx?: number } | null
    if (historyState?.idx && historyState.idx > 0) {
      void navigate(-1)
      return
    }
    void navigate('/algoViz')
  }

  return (
    <div className="bi98-help-page">
      <style>{win98HelpStyles}</style>
      <div className="bi98-window" role="presentation">
        <header className="bi98-titlebar">
          <span className="bi98-title">Bidirectional Search</span>
          <div className="bi98-title-controls">
            <button className="bi98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="bi98-control" aria-label="Close">X</Link>
          </div>
        </header>
        <div className="bi98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`bi98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="bi98-main">
          <aside className="bi98-toc" aria-label="Table of contents">
            <h2 className="bi98-toc-title">Contents</h2>
            <ul className="bi98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="bi98-content">
            <h1 className="bi98-doc-title">Bidirectional Search</h1>
            <p>
              Bidirectional search runs two coordinated searches: one from the start and one from the goal. By letting frontiers
              meet in the middle, it reduces the exponential blowup that makes one-sided BFS or Dijkstra expensive on large graphs.
            </p>
            <p>
              <Link to="/algoViz">Back to catalog</Link>
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="bi98-section">
                  <h2 className="bi98-heading">Overview</h2>
                  <p>
                    Bidirectional search is a meet-in-the-middle strategy for shortest path and reachability. Instead of exploring
                    all nodes out to depth <strong>d</strong> from the start, it explores about <strong>d/2</strong> levels from
                    both ends, then stitches a path through an intersection.
                  </p>
                </section>
                <hr className="bi98-divider" />
                <section id="bp-history" className="bi98-section">
                  <h2 className="bi98-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <div key={item.title}>
                      <h3 className="bi98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>
                <section id="bp-prerequisites" className="bi98-section">
                  <h2 className="bi98-heading">Prerequisites</h2>
                  {prerequisites.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-io" className="bi98-section">
                  <h2 className="bi98-heading">Inputs and Outputs</h2>
                  {inputsOutputs.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-formal" className="bi98-section">
                  <h2 className="bi98-heading">Formal Concepts</h2>
                  {formalDefinitions.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-mental" className="bi98-section">
                  <h2 className="bi98-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-when" className="bi98-section">
                  <h2 className="bi98-heading">When to Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
                <section id="bp-takeaways" className="bi98-section">
                  <h2 className="bi98-heading">Key Takeaways</h2>
                  <ul>
                    {takeaways.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                <section id="core-mechanics" className="bi98-section">
                  <h2 className="bi98-heading">Core Mechanics</h2>
                  {coreMechanics.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-flow" className="bi98-section">
                  <h2 className="bi98-heading">Step-by-Step Flow</h2>
                  <ol>
                    {stepByStepFlow.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
                <section id="core-key-structures" className="bi98-section">
                  <h2 className="bi98-heading">Key Structures and Invariants</h2>
                  {keyStructures.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-data-structures" className="bi98-section">
                  <h2 className="bi98-heading">Data Structures</h2>
                  {dataStructures.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-termination" className="bi98-section">
                  <h2 className="bi98-heading">Termination Rules</h2>
                  {terminationRules.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-correctness" className="bi98-section">
                  <h2 className="bi98-heading">Correctness Notes</h2>
                  <p>
                    The key idea is that each side explores paths in nondecreasing order of length (BFS) or cost (Dijkstra).
                    Once the stop rule is met, no shorter path can beat the best meeting already found.
                  </p>
                  {correctnessNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-complexity" className="bi98-section">
                  <h2 className="bi98-heading">Complexity and Tradeoffs</h2>
                  {complexityNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-implementation" className="bi98-section">
                  <h2 className="bi98-heading">Implementation Notes</h2>
                  {implementationNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-advanced" className="bi98-section">
                  <h2 className="bi98-heading">Advanced Insights</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="bi98-section">
                  <h2 className="bi98-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                <section id="ex-code" className="bi98-section">
                  <h2 className="bi98-heading">Code Examples</h2>
                  {examples.map((example) => (
                    <div key={example.title}>
                      <h3 className="bi98-subheading">{example.title}</h3>
                      <div className="bi98-codebox">
                        <code>{example.code.trim()}</code>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>
                <section id="ex-applications" className="bi98-section">
                  <h2 className="bi98-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="ex-edge-cases" className="bi98-section">
                  <h2 className="bi98-heading">Edge Cases Checklist</h2>
                  <ul>
                    {edgeCases.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'glossary' && (
              <>
                <section id="glossary-terms" className="bi98-section">
                  <h2 className="bi98-heading">Core Terms</h2>
                  {formalDefinitions.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p><strong>Frontier selection:</strong> Expand the smaller frontier or lower-cost side to balance work.</p>
                  <p><strong>Path stitching:</strong> Combine parent traces from both sides through the chosen meeting node.</p>
                  <p><strong>Reverse graph search:</strong> On directed graphs, the goal-side traversal follows incoming edges.</p>
                </section>
                <section id="glossary-variants" className="bi98-section">
                  <h2 className="bi98-heading">Variants and Guarantees</h2>
                  {variantTable.map((item) => (
                    <p key={item.variant}>
                      <strong>{item.variant}:</strong> {item.graphType}. <strong>Guarantee:</strong> {item.guarantee}.{' '}
                      <strong>Typical use case:</strong> {item.useCase}.
                    </p>
                  ))}
                </section>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
