import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

const historicalMilestones = [
  {
    title: 'Map coloring sparks the question (1800s)',
    detail:
      'Cartographers noticed neighboring regions need different colors, leading to the famous four color problem.',
  },
  {
    title: 'Graph theory formalizes coloring (1900s)',
    detail:
      'Graphs offered a clean model: vertices are regions, edges are adjacencies, colors are labels.',
  },
  {
    title: 'Backtracking becomes practical (1950s)',
    detail:
      'Search with pruning made NP-complete problems solvable for small to medium graphs.',
  },
  {
    title: 'Heuristics and SAT solvers (1990s)',
    detail:
      'Coloring evolved into constraint satisfaction; heuristics like MRV and DSATUR improved real performance.',
  },
]

const mentalModels = [
  {
    title: 'Paint without clashes',
    detail:
      'Assign a color to each node so neighbors never share the same color. If you hit a clash, erase and try a new color.',
  },
  {
    title: 'Constraint satisfaction',
    detail:
      'Each vertex is a variable and each color is a value. Edges impose "not equal" constraints.',
  },
  {
    title: 'Search tree pruning',
    detail:
      'Every choice creates a branch. Backtracking cuts off branches that violate constraints early.',
  },
]

const coreIdeas = [
  {
    title: 'Problem statement',
    detail:
      'Color the vertices of a graph using at most k colors so that no two adjacent vertices share the same color.',
  },
  {
    title: 'Decision vs optimization',
    detail:
      'The decision version asks if k colors are enough. The optimization version finds the smallest k (chromatic number).',
  },
  {
    title: 'Backtracking approach',
    detail:
      'Assign colors vertex by vertex, checking constraints at each step. If a conflict appears, backtrack.',
  },
  {
    title: 'Pruning',
    detail:
      'As soon as a vertex has no valid color, the current partial assignment is abandoned.',
  },
]

const algorithmSteps = [
  'Order vertices (simple order, or by degree).',
  'Try to assign a color to the next vertex from 1..k.',
  'Check if any neighbor already has that color; if yes, skip.',
  'If valid, recurse to the next vertex.',
  'If all colors fail, backtrack to the previous vertex.',
  'If all vertices are colored, success.',
]

const dataStructures = [
  {
    title: 'Adjacency list or matrix',
    detail:
      'Use a matrix for fast conflict checks, or a list for space efficiency on sparse graphs.',
  },
  {
    title: 'Color array',
    detail:
      'Stores assigned color for each vertex. Zero or -1 denotes uncolored.',
  },
  {
    title: 'Ordering heuristic',
    detail:
      'Ordering vertices by degree, MRV, or DSATUR often reduces branching.',
  },
  {
    title: 'Constraint checks',
    detail:
      'A helper function verifies that a chosen color does not conflict with neighbors.',
  },
]

const correctnessNotes = [
  {
    title: 'Invariant',
    detail:
      'At each recursion depth, the partial coloring satisfies all adjacency constraints for colored vertices.',
  },
  {
    title: 'Completeness',
    detail:
      'Backtracking explores all possible colorings consistent with the partial assignment, so it finds a solution if one exists.',
  },
  {
    title: 'Soundness',
    detail:
      'Only valid colorings are accepted because every assignment is checked against neighbors.',
  },
  {
    title: 'Decision guarantee',
    detail:
      'If the algorithm returns false for k, no valid coloring with k colors exists under the chosen model.',
  },
]

const complexityNotes = [
  {
    title: 'Worst-case time',
    detail:
      'O(k^n) in the worst case, since each of n vertices can take k colors.',
  },
  {
    title: 'Space complexity',
    detail:
      'O(n + m) for the graph plus O(n) recursion and color storage.',
  },
  {
    title: 'Practical performance',
    detail:
      'Heuristics and pruning can reduce the search space dramatically on real graphs.',
  },
  {
    title: 'Optimization cost',
    detail:
      'Finding the chromatic number typically tries k from lower bounds upward and can be expensive.',
  },
]

const edgeCases = [
  {
    title: 'Disconnected graphs',
    detail:
      'Each component can be colored independently, but the same k limit applies globally.',
  },
  {
    title: 'Complete graphs',
    detail:
      'A complete graph of size n requires n colors; backtracking quickly discovers this for small k.',
  },
  {
    title: 'Bipartite graphs',
    detail:
      'If the graph is bipartite, two colors suffice. Testing bipartiteness can short-circuit the search.',
  },
  {
    title: 'Self-loops',
    detail:
      'A self-loop makes the graph uncolorable for any finite k because a vertex would conflict with itself.',
  },
]

const realWorldUses = [
  {
    context: 'Register allocation',
    detail:
      'Compilers color an interference graph so variables that overlap in time use different CPU registers.',
  },
  {
    context: 'Timetable planning',
    detail:
      'Exams or classes that share students are adjacent vertices; colors represent time slots.',
  },
  {
    context: 'Frequency assignment',
    detail:
      'Nearby radio towers must use different frequencies; colors represent frequency bands.',
  },
  {
    context: 'Map coloring',
    detail:
      'Regions sharing a border cannot use the same color, the original inspiration for the problem.',
  },
  {
    context: 'Task scheduling',
    detail:
      'Tasks with conflicts must be assigned to different time slots or machines.',
  },
]

const examples = [
  {
    title: 'Backtracking pseudocode',
    code: `function colorGraph(v):
    if v == n: return true
    for color in 1..k:
        if isValid(v, color):
            colors[v] = color
            if colorGraph(v + 1): return true
            colors[v] = 0
    return false`,
    explanation:
      'The recursion assigns a color to each vertex. If a dead end appears, it resets and tries the next color.',
  },
  {
    title: 'Triangle with k = 2',
    code: `Vertices: A-B-C-A
k = 2
Try A=1, B=2, C=?
C conflicts with both 1 and 2, so no solution.`,
    explanation:
      'A 3-cycle requires 3 colors. The algorithm backtracks and eventually reports false.',
  },
  {
    title: 'Square with diagonal, k = 3',
    code: `Vertices: A-B-C-D-A with diagonal A-C
One valid coloring:
A=1, B=2, C=3, D=2`,
    explanation:
      'The diagonal adds a constraint, but 3 colors still suffice. Backtracking finds a valid assignment.',
  },
]

const pitfalls = [
  'Assuming greedy coloring is always optimal. Greedy is fast but can use more colors than necessary.',
  'Not using a good vertex ordering, which can explode the search tree.',
  'Confusing graph coloring with edge coloring, which assigns colors to edges instead of vertices.',
  'Skipping conflict checks, which can accept invalid colorings.',
  'Forgetting that self-loops make coloring impossible.',
]

const variants = [
  {
    title: 'Chromatic number search',
    detail:
      'Run the decision algorithm for k = lowerBound..upperBound until it succeeds.',
  },
  {
    title: 'List coloring',
    detail:
      'Each vertex has its own allowed color list, turning the problem into list-coloring CSP.',
  },
  {
    title: 'Edge coloring',
    detail:
      'Edges are colored so adjacent edges differ; this has different bounds and algorithms.',
  },
  {
    title: 'Heuristic solvers',
    detail:
      'DSATUR, tabu search, and SAT-based solvers provide fast approximate or exact colorings.',
  },
]

const takeaways = [
  'Graph coloring assigns labels to vertices so adjacent vertices never share a label.',
  'Backtracking is complete and correct but exponential in the worst case.',
  'Good ordering and pruning are the difference between instant solutions and blowups.',
  'Coloring models many real resource conflicts, from registers to timetables.',
]

const quickGlossary = [
  {
    term: 'k-coloring',
    definition: 'A valid vertex coloring that uses at most k colors.',
  },
  {
    term: 'Chromatic number',
    definition: 'The smallest k for which a graph has a valid k-coloring.',
  },
  {
    term: 'Constraint satisfaction problem',
    definition: 'Model where variables take values while satisfying constraints.',
  },
  {
    term: 'DSATUR',
    definition: 'Heuristic choosing the vertex with the highest saturation degree first.',
  },
  {
    term: 'Self-loop',
    definition: 'Edge from a vertex to itself, which makes standard coloring impossible.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const graphColoringHelpStyles = `
.graph-coloring-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.graph-coloring-window {
  width: 100%;
  min-height: 100dvh;
  margin: 0;
  display: flex;
  flex-direction: column;
  background: #c0c0c0;
  box-sizing: border-box;
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
}

.graph-coloring-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.graph-coloring-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
}

.graph-coloring-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.graph-coloring-control {
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

.graph-coloring-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.graph-coloring-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.graph-coloring-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.graph-coloring-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.graph-coloring-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.graph-coloring-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.graph-coloring-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.graph-coloring-toc-list li {
  margin: 0 0 8px;
}

.graph-coloring-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.graph-coloring-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.graph-coloring-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.graph-coloring-section {
  margin: 0 0 20px;
}

.graph-coloring-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.graph-coloring-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.graph-coloring-content p,
.graph-coloring-content li {
  font-size: 12px;
  line-height: 1.5;
}

.graph-coloring-content p {
  margin: 0 0 10px;
}

.graph-coloring-content ul,
.graph-coloring-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.graph-coloring-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.graph-coloring-codebox {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 8px;
  margin: 6px 0 10px;
}

.graph-coloring-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .graph-coloring-main {
    grid-template-columns: 1fr;
  }

  .graph-coloring-toc {
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
    { id: 'bp-models', label: 'Mental Models' },
    { id: 'bp-applications', label: 'Real-World Applications' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-ideas', label: 'What the Algorithm Does' },
    { id: 'core-steps', label: 'Step-by-Step Process' },
    { id: 'core-structures', label: 'Data Structures Used' },
    { id: 'core-correctness', label: 'Why Backtracking Works' },
    { id: 'core-complexity', label: 'Complexity Analysis' },
    { id: 'core-edge-cases', label: 'Edge Cases and Conventions' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-variants', label: 'Variants and Extensions' },
  ],
  examples: [{ id: 'ex-practical', label: 'Practical Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function GraphColoringPage(): JSX.Element {
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
    document.title = `Graph Coloring (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Graph Coloring',
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
    <div className="graph-coloring-help-page">
      <style>{graphColoringHelpStyles}</style>
      <div className="graph-coloring-window" role="presentation">
        <header className="graph-coloring-titlebar">
          <span className="graph-coloring-title">Graph Coloring</span>
          <div className="graph-coloring-controls">
            <button className="graph-coloring-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="graph-coloring-control" aria-label="Close">X</Link>
          </div>
        </header>

        <div className="graph-coloring-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`graph-coloring-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="graph-coloring-main">
          <aside className="graph-coloring-toc" aria-label="Table of contents">
            <h2 className="graph-coloring-toc-title">Contents</h2>
            <ul className="graph-coloring-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="graph-coloring-content">
            <h1 className="graph-coloring-doc-title">Graph Coloring</h1>
            <p>
              Backtracking for assigning colors without conflicts. Graph coloring asks whether you can color the vertices of a graph
              with k colors so adjacent vertices never share a color. The classic solution uses backtracking: try colors, check
              constraints, and undo choices when you hit a conflict. It is a core example of constraint satisfaction and a gateway to
              heuristic search.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="graph-coloring-section">
                  <h2 className="graph-coloring-heading">Overview</h2>
                  <p>
                    Coloring captures resource conflicts: neighboring vertices cannot share a color. Backtracking explores the space of
                    assignments while pruning invalid partial solutions as soon as possible.
                  </p>
                </section>
                <hr className="graph-coloring-divider" />
                <section id="bp-history" className="graph-coloring-section">
                  <h2 className="graph-coloring-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <div key={item.title}>
                      <h3 className="graph-coloring-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>
                <section id="bp-models" className="graph-coloring-section">
                  <h2 className="graph-coloring-heading">Core Concept and Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-applications" className="graph-coloring-section">
                  <h2 className="graph-coloring-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-takeaways" className="graph-coloring-section">
                  <h2 className="graph-coloring-heading">Key Takeaways</h2>
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
                <section id="core-ideas" className="graph-coloring-section">
                  <h2 className="graph-coloring-heading">What the Algorithm Does</h2>
                  {coreIdeas.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-steps" className="graph-coloring-section">
                  <h2 className="graph-coloring-heading">Step-by-Step Process</h2>
                  <ol>
                    {algorithmSteps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </section>
                <section id="core-structures" className="graph-coloring-section">
                  <h2 className="graph-coloring-heading">Data Structures Used</h2>
                  {dataStructures.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-correctness" className="graph-coloring-section">
                  <h2 className="graph-coloring-heading">Why the Backtracking Works</h2>
                  {correctnessNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    Backtracking is exhaustive but prunes any partial assignment that cannot be extended to a full coloring, ensuring
                    correctness while avoiding unnecessary work.
                  </p>
                </section>
                <section id="core-complexity" className="graph-coloring-section">
                  <h2 className="graph-coloring-heading">Complexity Analysis</h2>
                  {complexityNotes.map((note) => (
                    <p key={note.title}>
                      <strong>{note.title}:</strong> {note.detail}
                    </p>
                  ))}
                </section>
                <section id="core-edge-cases" className="graph-coloring-section">
                  <h2 className="graph-coloring-heading">Edge Cases and Conventions</h2>
                  {edgeCases.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="graph-coloring-section">
                  <h2 className="graph-coloring-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-variants" className="graph-coloring-section">
                  <h2 className="graph-coloring-heading">Variants and Extensions</h2>
                  {variants.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <section id="ex-practical" className="graph-coloring-section">
                <h2 className="graph-coloring-heading">Practical Examples</h2>
                {examples.map((example) => (
                  <div key={example.title}>
                    <h3 className="graph-coloring-subheading">{example.title}</h3>
                    <div className="graph-coloring-codebox">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </div>
                ))}
              </section>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="graph-coloring-section">
                <h2 className="graph-coloring-heading">Glossary</h2>
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
