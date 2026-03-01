import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'What this section is',
    details:
      'Complex problems are multi-constraint, multi-objective scenarios where a single data structure or algorithm is not enough.',
    notes:
      'They combine modeling, algorithm choice, tradeoffs, and systems thinking.',
  },
  {
    title: 'Why they matter',
    details:
      'Real-world systems rarely fit one clean algorithm; you must blend techniques and reason about constraints.',
    notes:
      'These problems are where correctness, efficiency, and practicality meet.',
  },
  {
    title: 'What you will practice',
    details:
      'Decomposition, reduction, algorithmic design, complexity analysis, and evaluation.',
    notes:
      'You learn to justify design choices and verify correctness under pressure.',
  },
]

const categories = [
  {
    title: 'Optimization under constraints',
    detail:
      'Multiple constraints (time, capacity, fairness) with objective functions (cost, latency, throughput).',
  },
  {
    title: 'Search with structure',
    detail:
      'State-space search with heuristics, pruning, and admissibility guarantees.',
  },
  {
    title: 'Graph + combinatorics hybrids',
    detail:
      'Problems that mix graph properties with combinatorial explosion (e.g., routing + scheduling).',
  },
  {
    title: 'Streaming and online variants',
    detail:
      'Inputs arrive over time; decisions must be made without full knowledge.',
  },
  {
    title: 'Probabilistic and stochastic',
    detail:
      'Uncertainty in inputs or outcomes; expected value and risk tradeoffs.',
  },
  {
    title: 'Distributed or parallel',
    detail:
      'Coordination, consistency, and performance across multiple nodes or threads.',
  },
]

const coreSkills = [
  {
    title: 'Modeling',
    detail:
      'Define variables, constraints, and objectives clearly before choosing algorithms.',
  },
  {
    title: 'Decomposition',
    detail:
      'Split the problem into subproblems that can be solved independently or iteratively.',
  },
  {
    title: 'Algorithm selection',
    detail:
      'Pick exact, approximate, or heuristic strategies based on constraints.',
  },
  {
    title: 'Complexity awareness',
    detail:
      'Recognize NP-hardness and choose realistic approaches.',
  },
  {
    title: 'Correctness reasoning',
    detail:
      'State invariants, prove optimality when possible, and validate with tests.',
  },
  {
    title: 'Evaluation',
    detail:
      'Use baselines, bounds, and metrics to compare solutions.',
  },
]

const toolbox = [
  {
    title: 'Exact algorithms',
    detail:
      'DP, ILP, branch-and-bound, and search with pruning.',
  },
  {
    title: 'Approximations',
    detail:
      'Algorithms with provable guarantees for feasible near-optimal solutions.',
  },
  {
    title: 'Heuristics',
    detail:
      'Greedy, local search, metaheuristics for fast, good-enough solutions.',
  },
  {
    title: 'Graph methods',
    detail:
      'MSTs, flows, matchings, shortest paths, and cuts.',
  },
  {
    title: 'Randomization',
    detail:
      'Monte Carlo, randomized rounding, and probabilistic analysis.',
  },
  {
    title: 'Parallelism',
    detail:
      'Divide-and-conquer, work-stealing, map-reduce-style decompositions.',
  },
]

const designChecklist = [
  {
    title: 'Clarify inputs',
    detail:
      'Size, constraints, and whether the data is static or dynamic.',
  },
  {
    title: 'Define objective',
    detail:
      'Single or multi-objective? Can objectives be weighted or prioritized?',
  },
  {
    title: 'Check feasibility',
    detail:
      'Is there always a feasible solution? If not, how to detect and recover?',
  },
  {
    title: 'Assess complexity',
    detail:
      'Is the general case NP-hard? If so, consider approximations or heuristics.',
  },
  {
    title: 'Pick baselines',
    detail:
      'Always compare against a simple baseline to justify complexity.',
  },
  {
    title: 'Validate and test',
    detail:
      'Use small instances with known solutions and stress tests for robustness.',
  },
]

const evaluationMetrics = [
  {
    title: 'Optimality gap',
    detail:
      'Compare solution cost to lower bounds or exact solutions on small cases.',
  },
  {
    title: 'Runtime and memory',
    detail:
      'Measure scalability with input size.',
  },
  {
    title: 'Stability and variance',
    detail:
      'Assess sensitivity to input changes or random seeds.',
  },
  {
    title: 'Fairness metrics',
    detail:
      'If allocation is involved, check fairness or balance criteria.',
  },
  {
    title: 'Feasibility rate',
    detail:
      'How often does the algorithm produce valid solutions?',
  },
  {
    title: 'Explainability',
    detail:
      'Can you justify why the output is reasonable or safe?',
  },
]

const exampleProblemFrames = [
  {
    title: 'Vehicle routing with time windows',
    detail:
      'Model vehicles, capacities, and delivery windows. Use heuristics + local search.',
  },
  {
    title: 'Multi-processor scheduling',
    detail:
      'Assign tasks to machines minimizing makespan while respecting dependencies.',
  },
  {
    title: 'Supply chain optimization',
    detail:
      'Balance costs, inventory, and reliability across multiple stages.',
  },
  {
    title: 'Network design',
    detail:
      'Choose edges to minimize cost while ensuring redundancy and latency bounds.',
  },
  {
    title: 'Large-scale matching',
    detail:
      'Stable matching with constraints and preferences at scale.',
  },
  {
    title: 'Resource allocation under uncertainty',
    detail:
      'Stochastic demand, probabilistic constraints, and risk-sensitive optimization.',
  },
]

const commonPitfalls = [
  {
    mistake: 'Overfitting to toy models',
    description:
      'Simplifying too aggressively can make solutions irrelevant in real systems.',
  },
  {
    mistake: 'Ignoring constraints',
    description:
      'Feasibility matters more than optimality if constraints are violated.',
  },
  {
    mistake: 'No baseline',
    description:
      'Without a baseline, it is hard to prove your approach is better.',
  },
  {
    mistake: 'Assuming optimality is required',
    description:
      'In many cases, good-enough solutions are the only practical option.',
  },
  {
    mistake: 'Neglecting evaluation',
    description:
      'No metrics or tests means no evidence of solution quality.',
  },
  {
    mistake: 'Hidden coupling',
    description:
      'Subproblems interact; ignoring coupling can invalidate results.',
  },
]

const mindMapNodes = [
  {
    id: 'root',
    title: 'Complex Problems',
    detail:
      'Multi-constraint, multi-objective problems requiring hybrid algorithm strategies.',
  },
  {
    id: 'modeling',
    title: 'Modeling',
    detail:
      'Variables, constraints, objectives, feasibility checks.',
  },
  {
    id: 'algorithms',
    title: 'Algorithms',
    detail:
      'Exact, approximation, heuristic, and hybrid strategies.',
  },
  {
    id: 'analysis',
    title: 'Analysis',
    detail:
      'Complexity, bounds, correctness, and tradeoffs.',
  },
  {
    id: 'evaluation',
    title: 'Evaluation',
    detail:
      'Metrics, baselines, benchmarking, and validation.',
  },
  {
    id: 'systems',
    title: 'Systems',
    detail:
      'Scalability, parallelism, data size, and integration.',
  },
]

const mindMapEdges = [
  { from: 'Complex Problems', to: 'Modeling', note: 'Define the problem clearly' },
  { from: 'Modeling', to: 'Algorithms', note: 'Pick solution strategies' },
  { from: 'Algorithms', to: 'Analysis', note: 'Prove or estimate quality' },
  { from: 'Analysis', to: 'Evaluation', note: 'Measure and compare' },
  { from: 'Algorithms', to: 'Systems', note: 'Scale to real constraints' },
]

const timelineScenarios = [
  {
    id: 'decompose',
    title: 'Decomposition workflow',
    steps: [
      'Clarify objective and constraints.',
      'Identify subproblems and dependencies.',
      'Choose algorithms per subproblem.',
      'Combine with coordination logic.',
      'Evaluate end-to-end performance.',
    ],
    summary:
      'Complex problems are often solved by dividing and recombining.',
  },
  {
    id: 'approx',
    title: 'Approximation workflow',
    steps: [
      'Prove NP-hardness or practical infeasibility.',
      'Pick an approximation or heuristic approach.',
      'Use lower bounds to estimate quality.',
      'Tune for speed vs accuracy.',
    ],
    summary:
      'Approximation is a controlled compromise between optimality and speed.',
  },
  {
    id: 'system',
    title: 'Systems integration',
    steps: [
      'Define data pipeline and constraints.',
      'Implement algorithm core.',
      'Add monitoring and fallbacks.',
      'Validate against real workloads.',
    ],
    summary:
      'Real solutions must fit into systems, not just theoretical models.',
  },
]

const keyTakeaways = [
  'Complex problems require modeling, not just algorithm selection.',
  'Exact solutions are often impossible at scale; approximations matter.',
  'Evaluation and baselines are essential for credibility.',
  'Real-world constraints shape algorithmic choices.',
  'Hybrid strategies often outperform single-method approaches.',
]

export default function ComplexProblemsPage(): JSX.Element {
  const [selectedScenarioId, setSelectedScenarioId] = useState(timelineScenarios[0]?.id ?? 'decompose')
  const [stepIndex, setStepIndex] = useState(0)

  const selectedScenario = timelineScenarios.find((scenario) => scenario.id === selectedScenarioId) ?? timelineScenarios[0]
  const stepText = selectedScenario?.steps[stepIndex] ?? 'No steps available.'
  const canStepForward = selectedScenario ? stepIndex < selectedScenario.steps.length - 1 : false

  const glossary = useMemo(
    () => [
      {
        term: 'Complex problem',
        definition:
          'A multi-constraint, multi-objective scenario that requires hybrid algorithm strategies.',
      },
      {
        term: 'Feasibility',
        definition:
          'Whether a solution satisfies all constraints before optimizing the objective.',
      },
      {
        term: 'Optimality gap',
        definition:
          'The distance between a solution and a known lower bound or exact optimum.',
      },
      {
        term: 'Heuristic',
        definition:
          'A fast method that produces good-enough solutions without guarantees.',
      },
      {
        term: 'Approximation',
        definition:
          'An algorithm with a proven bound on how close the solution is to optimal.',
      },
      {
        term: 'Hybrid strategy',
        definition:
          'A combination of exact, approximate, and heuristic methods used together.',
      },
      {
        term: 'Baseline',
        definition:
          'A simple reference solution used to justify added algorithmic complexity.',
      },
    ],
    [],
  )

  type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    const tab = searchParams.get('tab')
    return tab === 'big-picture' || tab === 'core-concepts' || tab === 'examples' || tab === 'glossary'
      ? tab
      : 'big-picture'
  })
  const activeTabLabel =
    activeTab === 'big-picture'
      ? 'The Big Picture'
      : activeTab === 'core-concepts'
        ? 'Core Concepts'
        : activeTab === 'examples'
          ? 'Examples'
          : 'Glossary'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Complex Problems (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'
  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Complex Problems',
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

  const tabs: Array<{ id: TabId; label: string }> = [
    { id: 'big-picture', label: 'The Big Picture' },
    { id: 'core-concepts', label: 'Core Concepts' },
    { id: 'examples', label: 'Examples' },
    { id: 'glossary', label: 'Glossary' },
  ]

  const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
    'big-picture': [
      { id: 'bp-overview', label: 'Overview' },
      { id: 'bp-categories', label: 'Categories' },
      { id: 'bp-takeaways', label: 'Key Takeaways' },
    ],
    'core-concepts': [
      { id: 'core-skills', label: 'Core Skills' },
      { id: 'core-toolbox', label: 'Algorithmic Toolbox' },
      { id: 'core-design', label: 'Design Checklist' },
      { id: 'core-eval', label: 'Evaluation Metrics' },
      { id: 'core-pitfalls', label: 'Common Pitfalls' },
      { id: 'core-mindmap', label: 'Mind Map' },
      { id: 'core-edges', label: 'Mind Map Edges' },
    ],
    examples: [
      { id: 'ex-frames', label: 'Problem Frames' },
      { id: 'ex-timeline', label: 'Workflow Timeline' },
    ],
    glossary: [{ id: 'glossary-terms', label: 'Terms' }],
  }

  const win98HelpStyles = `
.win98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
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
  margin: 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.win98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.win98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.win98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
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
  margin: 0 0 20px;
}

.win98-heading {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px;
}

.win98-subheading {
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 6px;
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
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 8px;
  margin: 6px 0 10px;
}

.win98-codebox code {
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
  display: block;
}

.win98-table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 0 10px;
  font-size: 12px;
}

.win98-table th,
.win98-table td {
  border: 1px solid #808080;
  padding: 6px 8px;
  text-align: left;
}

.win98-table thead th {
  background: #e6e6e6;
}

.win98-button {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  font-size: 12px;
  padding: 4px 8px;
  cursor: pointer;
}

.win98-button-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 8px 0 10px;
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

  return (
    <div className="win98-help-page">
      <style>{win98HelpStyles}</style>
      <div className="win98-window" role="presentation">
        <header className="win98-titlebar">
          <span className="win98-title-text">Complex Problems</span>
          <div className="win98-title-controls">
            <button className="win98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="win98-control" aria-label="Close">X</Link>
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
            <h1 className="win98-doc-title">Complex Problems</h1>
            <p>
              Complex problems combine multiple constraints, objectives, and system limitations. This page is a roadmap for modeling,
              algorithm selection, evaluation, and real-world integration of solutions.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="win98-section">
                  <h2 className="win98-heading">The Big Picture</h2>
                  {bigPicture.map((item) => (
                    <div key={item.title}>
                      <h3 className="win98-subheading">{item.title}</h3>
                      <p>{item.details}</p>
                      <p>{item.notes}</p>
                    </div>
                  ))}
                </section>
                <section id="bp-categories" className="win98-section">
                  <h2 className="win98-heading">Categories</h2>
                  {categories.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-takeaways" className="win98-section">
                  <h2 className="win98-heading">Key Takeaways</h2>
                  <ul>
                    {keyTakeaways.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                <section id="core-skills" className="win98-section">
                  <h2 className="win98-heading">Core Skills</h2>
                  {coreSkills.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-toolbox" className="win98-section">
                  <h2 className="win98-heading">Algorithmic Toolbox</h2>
                  {toolbox.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-design" className="win98-section">
                  <h2 className="win98-heading">Design Checklist</h2>
                  {designChecklist.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-eval" className="win98-section">
                  <h2 className="win98-heading">Evaluation Metrics</h2>
                  {evaluationMetrics.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="win98-section">
                  <h2 className="win98-heading">Common Pitfalls</h2>
                  <ul>
                    {commonPitfalls.map((pitfall) => (
                      <li key={pitfall.mistake}>
                        <strong>{pitfall.mistake}:</strong> {pitfall.description}
                      </li>
                    ))}
                  </ul>
                </section>
                <section id="core-mindmap" className="win98-section">
                  <h2 className="win98-heading">Mind Map (Concept Walkthrough)</h2>
                  {mindMapNodes.map((item) => (
                    <p key={item.id}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    <strong>Walkthrough:</strong> Start at Complex Problems -&gt; Modeling -&gt; Algorithms -&gt; Analysis -&gt; Evaluation.
                    Then connect to Systems for real-world constraints.
                  </p>
                </section>
                <section id="core-edges" className="win98-section">
                  <h2 className="win98-heading">Mind Map Edges</h2>
                  <table className="win98-table">
                    <thead>
                      <tr>
                        <th>From</th>
                        <th>To</th>
                        <th>Why it connects</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mindMapEdges.map((edge) => (
                        <tr key={`${edge.from}-${edge.to}`}>
                          <td>{edge.from}</td>
                          <td>{edge.to}</td>
                          <td>{edge.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                <section id="ex-frames" className="win98-section">
                  <h2 className="win98-heading">Example Problem Frames</h2>
                  {exampleProblemFrames.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="ex-timeline" className="win98-section">
                  <h2 className="win98-heading">Interactive Timeline</h2>
                  <p>Step through common workflows for tackling complex problems.</p>
                  <div className="win98-button-row">
                    {timelineScenarios.map((scenario) => (
                      <button
                        key={scenario.id}
                        type="button"
                        className="win98-button"
                        onClick={() => {
                          setSelectedScenarioId(scenario.id)
                          setStepIndex(0)
                        }}
                      >
                        {scenario.title}
                      </button>
                    ))}
                  </div>
                  <p><strong>Selected:</strong> {selectedScenario?.title ?? 'None'}</p>
                  <p>{stepText}</p>
                  <p><strong>Summary:</strong> {selectedScenario?.summary ?? ''}</p>
                  <div className="win98-button-row">
                    <button
                      type="button"
                      className="win98-button"
                      onClick={() => setStepIndex(0)}
                    >
                      RESET
                    </button>
                    <button
                      type="button"
                      className="win98-button"
                      onClick={() => setStepIndex((prev) => Math.max(0, prev - 1))}
                    >
                      BACK
                    </button>
                    <button
                      type="button"
                      className="win98-button"
                      onClick={() => {
                        if (canStepForward) {
                          setStepIndex((prev) => prev + 1)
                        }
                      }}
                    >
                      STEP
                    </button>
                  </div>
                </section>
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="win98-section">
                <h2 className="win98-heading">Glossary</h2>
                {glossary.map((item) => (
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
