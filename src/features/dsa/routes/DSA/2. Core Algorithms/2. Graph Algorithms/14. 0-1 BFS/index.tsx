import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: 'Dial style shortest paths for small integer weights',
    detail:
      "Dial's algorithm showed that bounded integer weights allow faster queues than full Dijkstra. 0-1 BFS is the minimal case of that idea.",
  },
  {
    title: 'Deque-based optimization becomes popular (1990s)',
    detail:
      'Competitive programming and systems courses popularized 0-1 BFS as a practical speedup for graphs with only 0 or 1 edge weights.',
  },
  {
    title: 'Used in grid, maze, and routing puzzles',
    detail:
      'Problems with binary costs (free vs paid edges, open vs blocked) naturally fit the 0-1 model.',
  },
  {
    title: 'A specialized Dijkstra substitute',
    detail:
      "0-1 BFS delivers Dijkstra's correctness for non-negative weights but with linear-time behavior on binary edges.",
  },
]

const prerequisites = [
  {
    title: 'Binary edge weights',
    detail:
      'All edges must have weight 0 or 1. Any other weight breaks the deque ordering.',
  },
  {
    title: 'Nonnegative costs',
    detail:
      '0-1 BFS is a special case of Dijkstra and assumes nonnegative weights.',
  },
  {
    title: 'Single-source objective',
    detail:
      'Compute shortest paths from one source to all reachable nodes.',
  },
  {
    title: 'Adjacency list',
    detail:
      'A list of neighbors with weights keeps the algorithm linear in V + E.',
  },
]

const inputsOutputs = [
  {
    title: 'Input',
    detail:
      'Graph G(V, E) with weights in {0,1} and a source node.',
  },
  {
    title: 'Output',
    detail:
      'Shortest distances and optional parents for path reconstruction.',
  },
  {
    title: 'Optional',
    detail:
      'Early stop if only a specific target distance is needed.',
  },
]

const formalDefinitions = [
  {
    title: 'Relaxation rule',
    detail:
      'If dist[u] + w < dist[v], update dist[v] and parent[v] = u.',
  },
  {
    title: 'Deque ordering',
    detail:
      'Edges with weight 0 keep distance, weight 1 increases it by one.',
  },
  {
    title: 'Monotone expansion',
    detail:
      'Nodes popped from the front are processed in nondecreasing distance.',
  },
]

const mentalModels = [
  {
    title: 'Two-lane freeway',
    detail:
      'Edges of weight 0 are a fast lane. You jump to the front of the deque. Weight 1 edges go to the back.',
  },
  {
    title: 'Bucketed priorities',
    detail:
      'You only need two buckets for distance increments of 0 or 1. A deque simulates those buckets exactly.',
  },
  {
    title: 'Dijkstra with a simpler queue',
    detail:
      'The algorithm still expands nodes in nondecreasing distance order, but a deque replaces the priority queue.',
  },
]

const coreMechanics = [
  {
    title: 'Deque instead of heap',
    detail:
      'Pop from the front. When relaxing an edge, push front for weight 0 and push back for weight 1.',
  },
  {
    title: 'Distance relaxation',
    detail:
      'If dist[u] + w improves dist[v], update and enqueue v. This mirrors Dijkstra but with a binary-cost queue.',
  },
  {
    title: 'Monotone expansion',
    detail:
      'The deque ordering ensures nodes are processed in nondecreasing distance, preserving shortest path correctness.',
  },
]

const keyStructures = [
  {
    title: 'Deque',
    detail:
      'Supports push front and push back in O(1), which matches the binary weight behavior.',
  },
  {
    title: 'Distance array',
    detail:
      'Holds shortest known distance. Initialize with Infinity except the source.',
  },
  {
    title: 'Parent array',
    detail:
      'Track the predecessor edge for path reconstruction.',
  },
  {
    title: 'Visited or in-queue tracking',
    detail:
      'Not strictly required if you check dist improvements, but can reduce redundant enqueues.',
  },
]

const stepByStepFlow = [
  'Initialize dist[source] = 0 and all other distances to Infinity.',
  'Push source to the front of the deque.',
  'Pop from the front and relax each outgoing edge.',
  'If the edge weight is 0, push the neighbor to the front.',
  'If the edge weight is 1, push the neighbor to the back.',
  'Repeat until the deque is empty or the goal is popped.',
  'Reconstruct a path from the parent array if needed.',
]

const dataStructures = [
  {
    title: 'Deque',
    detail:
      'Supports O(1) push front/back to simulate two priority buckets.',
  },
  {
    title: 'Distance array',
    detail:
      'Stores shortest known distance from the source.',
  },
  {
    title: 'Parent array',
    detail:
      'Captures the edge that last improved a node.',
  },
  {
    title: 'In-queue flag (optional)',
    detail:
      'Can reduce duplicate pushes but must not block better relaxations.',
  },
]

const correctnessNotes = [
  {
    title: 'Deque preserves order',
    detail:
      'Zero-cost edges do not increase distance, so they are processed first.',
  },
  {
    title: 'Equivalent to Dijkstra',
    detail:
      'For weights in {0,1}, the deque emulates a priority queue exactly.',
  },
  {
    title: 'Relaxation ensures optimality',
    detail:
      'No shorter path can appear after a node is popped at its minimal distance.',
  },
]

const terminationRules = [
  {
    title: 'Deque empty',
    detail:
      'When the deque is empty, all reachable nodes have final distances.',
  },
  {
    title: 'Early goal stop',
    detail:
      'If you only need the distance to a goal, you can stop when the goal is popped from the deque.',
  },
  {
    title: 'Binary-weight requirement',
    detail:
      'Edge weights must be 0 or 1. Any other weights break the deque ordering guarantee.',
  },
]

const complexityNotes = [
  {
    title: 'Time complexity',
    detail:
      'O(V + E) because each edge relax is O(1) and each node is pushed a bounded number of times.',
  },
  {
    title: 'Space complexity',
    detail:
      'O(V + E) for graph storage plus distance and parent arrays.',
  },
  {
    title: 'Why it beats Dijkstra',
    detail:
      'No heap operations. The deque is linear-time for binary weights, so the log factor disappears.',
  },
  {
    title: 'Edge cases',
    detail:
      'Graphs with many 0 edges can cause many front pushes but still remain linear in total relaxations.',
  },
]

const realWorldUses = [
  {
    context: 'Maze and grid navigation',
    detail:
      'Grid problems with free steps and costly steps (like breaking walls) map directly to 0 and 1 edge weights.',
  },
  {
    context: 'Network routing with tolls',
    detail:
      'Binary cost edges model paid vs free links, where you want to minimize toll count.',
  },
  {
    context: 'String transformation puzzles',
    detail:
      'Edits with cost 0 or 1 (like flip vs swap) form a graph where 0-1 BFS finds minimal edits quickly.',
  },
  {
    context: 'Layered state graphs',
    detail:
      'State machines with optional transitions (free) and costly transitions (1) are a perfect fit.',
  },
]

const examples = [
  {
    title: '0-1 BFS pseudocode',
    code: `function zeroOneBfs(graph, source):
    dist = array(|V|, Infinity)
    parent = array(|V|, null)
    deque = Deque()
    dist[source] = 0
    deque.pushFront(source)

    while deque not empty:
        u = deque.popFront()
        for (v, w) in graph[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                parent[v] = u
                if w == 0:
                    deque.pushFront(v)
                else:
                    deque.pushBack(v)

    return dist, parent`,
    explanation:
      'The deque keeps nodes ordered by distance without a heap. Weight 0 edges get priority.',
  },
  {
    title: 'Binary grid example',
    code: `// 0 = open, 1 = wall to break
// Move cost is 0 for open, 1 for wall
grid = [
  0 1 0
  0 1 0
  0 0 0
]
// 0-1 BFS finds the minimal number of walls to break`,
    explanation:
      'Edges through free cells push to front, while breaking a wall pushes to back.',
  },
  {
    title: 'Convert to 0-1 graph',
    code: `// Edge weight is 0 if condition holds, else 1
if canReuseToken(u, v): weight = 0
else: weight = 1`,
    explanation:
      'Any decision that is binary can be modeled as 0 or 1, enabling fast shortest paths.',
  },
  {
    title: 'Worked mini-example',
    code: `Edges:
S->A (0), S->B (1), A->C (1), B->C (0)

Start: dist[S]=0, deque=[S]
Pop S -> A (0) push front, B (1) push back
Deque: [A, B]
Pop A -> C (1) dist[C]=1 push back
Deque: [B, C]
Pop B -> C (0) improves dist[C]=1? no change
Pop C -> done
Shortest to C is 1`,
    explanation:
      'Zero edges jump to the front, one edges go to the back, preserving distance order.',
  },
]

const edgeCases = [
  'Disconnected nodes remain at Infinity.',
  'Multiple edges between nodes keep the smallest distance through relaxation.',
  'All edges are 0: deque behaves like BFS on zero-cost edges.',
  'All edges are 1: algorithm reduces to standard BFS on unweighted graph.',
]

const pitfalls = [
  'Using weights other than 0 or 1. The deque ordering no longer preserves shortest paths.',
  'Forgetting to update parent when a shorter path is found.',
  'Stopping too early when the goal is first discovered rather than popped.',
  'Using a visited flag that prevents relaxation through a shorter path.',
  'Assuming the graph is undirected without adding reverse edges.',
]

const decisionGuidance = [
  'Edge weights are strictly 0 or 1.',
  'You want shortest paths faster than Dijkstra without heaps.',
  'You can afford O(V + E) memory and want linear-time performance.',
  'The graph is large and sparse with binary costs.',
  'You need reliable shortest paths, not just greedy approximations.',
]

const implementationNotes = [
  {
    title: 'Avoid stale updates',
    detail:
      'If you use an in-queue flag, clear it when a node is popped.',
  },
  {
    title: 'Early exit',
    detail:
      'You can stop when the goal is popped, not when it is first seen.',
  },
  {
    title: 'Graph modeling',
    detail:
      'Convert binary decisions into edges of weight 0 or 1 to exploit 0-1 BFS.',
  },
  {
    title: 'Undirected edges',
    detail:
      'Add both directions explicitly with the same weight.',
  },
]

const advancedInsights = [
  {
    title: 'Relation to Dijkstra',
    detail:
      '0-1 BFS is a specialized Dijkstra where the priority queue is replaced by a deque due to binary edge weights.',
  },
  {
    title: "Dial's algorithm generalization",
    detail:
      'For weights in 0..C, you can use C+1 buckets. 0-1 BFS is the C=1 case.',
  },
  {
    title: 'Path reconstruction detail',
    detail:
      'Because multiple relaxations can occur, only the last relaxation to a node should define its parent.',
  },
  {
    title: 'Multi-source variant',
    detail:
      'Initialize the deque with all sources at distance 0 to compute minimum distance to the nearest source.',
  },
]

const takeaways = [
  '0-1 BFS delivers shortest paths in linear time for binary-weight graphs.',
  'A deque is enough to maintain the correct expansion order.',
  'It is a practical drop-in replacement for Dijkstra when weights are 0 or 1.',
  'Correctness depends on monotone distances and strict relaxation checks.',
  'It pairs well with grid and state-space problems that have binary costs.',
]

const variantTable = [
  {
    variant: '0-1 BFS',
    graphType: 'Directed or undirected, weights in {0,1}',
    guarantee: 'Shortest paths by total weight',
    useCase: 'Binary cost routing, maze breaking, min toggles',
  },
  {
    variant: "Dial's algorithm",
    graphType: 'Integer weights in [0, C]',
    guarantee: 'Shortest paths by total weight',
    useCase: 'Small bounded weights with bucket queues',
  },
  {
    variant: 'Dijkstra',
    graphType: 'Non-negative weights',
    guarantee: 'Shortest paths by total weight',
    useCase: 'General weighted graphs without binary restriction',
  },
]

const quickGlossary = [
  {
    term: '0-1 BFS',
    definition:
      'Shortest path algorithm for graphs where every edge weight is exactly 0 or 1.',
  },
  {
    term: 'Relaxation',
    definition:
      'Update rule: if dist[u] + w improves dist[v], replace dist[v] and record parent[v] = u.',
  },
  {
    term: 'Deque ordering',
    definition:
      'Push weight-0 relaxations to the front and weight-1 relaxations to the back.',
  },
  {
    term: 'Monotone expansion',
    definition:
      'Nodes popped from the front are processed in nondecreasing distance order.',
  },
  {
    term: 'Dial variant',
    definition:
      "For weights in 0..C, C+1 buckets generalize the same idea; 0-1 BFS is the C=1 case.",
  },
  {
    term: 'Parent array',
    definition:
      'Stores the predecessor that produced the best known distance, enabling path reconstruction.',
  },
  {
    term: 'Early goal stop',
    definition:
      'Safe only when the goal node is popped from the deque, not when first discovered.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-history', label: 'Historical Context' },
    { id: 'bp-mental', label: 'Mental Models' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-prerequisites', label: 'Prerequisites' },
    { id: 'core-formal', label: 'Formal Concepts' },
    { id: 'core-mechanics', label: 'Core Mechanics' },
    { id: 'core-flow', label: 'Step-by-Step Flow' },
    { id: 'core-structures', label: 'Data Structures' },
    { id: 'core-correctness', label: 'Correctness and Termination' },
    { id: 'core-complexity', label: 'Complexity and Tradeoffs' },
    { id: 'core-variants', label: 'Variants and Guarantees' },
    { id: 'core-applications', label: 'Applications and Use Cases' },
    { id: 'core-implementation', label: 'Implementation Notes' },
    { id: 'core-advanced', label: 'Advanced Insights' },
    { id: 'core-edge-pitfalls', label: 'Edge Cases and Pitfalls' },
  ],
  examples: [{ id: 'ex-code', label: 'Code Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const win98HelpStyles = `
.win98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.win98-window {
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  background: #c0c0c0;
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.win98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  padding: 2px 4px;
  min-height: 22px;
  font-size: 13px;
  font-weight: 700;
}

.win98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
  pointer-events: none;
}

.win98-title-controls {
  margin-left: auto;
  display: flex;
  gap: 2px;
}

.win98-control {
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
  font-family: inherit;
}

.win98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.win98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
  font-family: inherit;
}

.win98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.win98-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.win98-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.win98-toc-title {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 10px;
}

.win98-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.win98-toc-list li {
  margin: 0 0 8px;
}

.win98-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.win98-toc-list a:hover {
  text-decoration: underline;
}

.win98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.win98-doc-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px;
}

.win98-section {
  margin: 0 0 22px;
}

.win98-heading {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px;
}

.win98-subheading {
  font-size: 13px;
  font-weight: 700;
  margin: 10px 0 6px;
}

.win98-content p,
.win98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.win98-content p {
  margin: 0 0 10px;
}

.win98-content ul,
.win98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.win98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.win98-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.win98-codebox pre {
  margin: 0;
}

.win98-codebox code {
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
  display: block;
}

@media (max-width: 900px) {
  .win98-main {
    grid-template-columns: 1fr;
  }

  .win98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}
`

export default function Topic01BFSPage(): JSX.Element {
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
    document.title = `0-1 BFS (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: '0-1 BFS',
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
    <div className="win98-help-page">
      <style>{win98HelpStyles}</style>
      <div className="win98-window" role="presentation">
        <header className="win98-titlebar">
          <span className="win98-title-text">0-1 BFS - Help</span>
          <div className="win98-title-controls">
            <button className="win98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="win98-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="win98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`win98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="win98-main">
          <aside className="win98-toc" aria-label="Table of contents">
            <h2 className="win98-toc-title">Contents</h2>
            <ul className="win98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="win98-content">
            <h1 className="win98-doc-title">0-1 BFS</h1>
            <p>
              0-1 BFS is a specialized shortest path algorithm for graphs whose edge weights are only 0 or 1. It replaces the
              priority queue of Dijkstra with a deque and still expands nodes in nondecreasing distance order. The result is the
              same optimal paths, but with linear-time performance.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="win98-section">
                  <h2 className="win98-heading">Overview</h2>
                  <p>
                    Many problems have edges that are either free (0) or cost one unit (1): breaking a wall, paying a toll, or
                    toggling a bit. 0-1 BFS exploits this structure by using a deque. If traversing an edge adds zero cost, the
                    next node should be processed immediately, so it goes to the front. If it adds one cost, it goes to the back.
                    This simple rule keeps the queue ordered by distance without a heap.
                  </p>
                  <h3 className="win98-subheading">Input and output contract</h3>
                  <ul>
                    {inputsOutputs.map((item) => (
                      <li key={item.title}>
                        <strong>{item.title}:</strong> {item.detail}
                      </li>
                    ))}
                  </ul>
                </section>
                <hr className="win98-divider" />
                <section id="bp-history" className="win98-section">
                  <h2 className="win98-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <hr className="win98-divider" />
                <section id="bp-mental" className="win98-section">
                  <h2 className="win98-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <hr className="win98-divider" />
                <section id="bp-takeaways" className="win98-section">
                  <h2 className="win98-heading">Key Takeaways</h2>
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
                <section id="core-prerequisites" className="win98-section">
                  <h2 className="win98-heading">Prerequisites</h2>
                  {prerequisites.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-formal" className="win98-section">
                  <h2 className="win98-heading">Formal Concepts</h2>
                  {formalDefinitions.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-mechanics" className="win98-section">
                  <h2 className="win98-heading">Core Mechanics</h2>
                  {coreMechanics.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-flow" className="win98-section">
                  <h2 className="win98-heading">Step-by-Step Flow</h2>
                  <ol>
                    {stepByStepFlow.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
                <section id="core-structures" className="win98-section">
                  <h2 className="win98-heading">Data Structures</h2>
                  <h3 className="win98-subheading">Primary structures and invariants</h3>
                  {keyStructures.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <h3 className="win98-subheading">Implementation details</h3>
                  {dataStructures.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-correctness" className="win98-section">
                  <h2 className="win98-heading">Correctness and Termination</h2>
                  <h3 className="win98-subheading">Termination rules</h3>
                  {terminationRules.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <h3 className="win98-subheading">Correctness sketch</h3>
                  {correctnessNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    The deque ordering preserves nondecreasing distance because any 0 edge keeps distance the same and any 1 edge
                    increases it by one. This mimics Dijkstra's greedy rule with a simpler data structure.
                  </p>
                </section>
                <section id="core-complexity" className="win98-section">
                  <h2 className="win98-heading">Complexity and Tradeoffs</h2>
                  {complexityNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    0-1 BFS is a perfect fit when weights are binary. If weights drift beyond 0 or 1, switch to Dijkstra or a
                    bucketed variant like Dial's algorithm.
                  </p>
                </section>
                <section id="core-variants" className="win98-section">
                  <h2 className="win98-heading">Variants and Guarantees</h2>
                  {variantTable.map((row) => (
                    <p key={row.variant}>
                      <strong>{row.variant}:</strong> {row.graphType}. <strong>Guarantee:</strong> {row.guarantee}.{' '}
                      <strong>Typical use case:</strong> {row.useCase}.
                    </p>
                  ))}
                </section>
                <section id="core-applications" className="win98-section">
                  <h2 className="win98-heading">Applications and Use Cases</h2>
                  <h3 className="win98-subheading">Real-world applications</h3>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                  <h3 className="win98-subheading">When to use it</h3>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
                <section id="core-implementation" className="win98-section">
                  <h2 className="win98-heading">Implementation Notes</h2>
                  {implementationNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-advanced" className="win98-section">
                  <h2 className="win98-heading">Advanced Insights</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-edge-pitfalls" className="win98-section">
                  <h2 className="win98-heading">Edge Cases and Pitfalls</h2>
                  <h3 className="win98-subheading">Edge cases checklist</h3>
                  <ul>
                    {edgeCases.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <h3 className="win98-subheading">Common pitfalls</h3>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <section id="ex-code" className="win98-section">
                <h2 className="win98-heading">Code Examples</h2>
                {examples.map((example) => (
                  <div key={example.title}>
                    <h3 className="win98-subheading">{example.title}</h3>
                    <div className="win98-codebox">
                      <pre>
                        <code>{example.code}</code>
                      </pre>
                    </div>
                    <p>{example.explanation}</p>
                  </div>
                ))}
              </section>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="win98-section">
                <h2 className="win98-heading">Glossary</h2>
                {quickGlossary.map((item) => (
                  <p key={item.term}>
                    <strong>{item.term}:</strong> {item.definition}
                  </p>
                ))}
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
