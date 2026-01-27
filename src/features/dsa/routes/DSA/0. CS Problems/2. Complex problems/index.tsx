import { useState } from 'react'
import { Link } from 'react-router-dom'

import { win95Styles } from '@/styles/win95'

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

  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Complex Problems</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Hard, multifaceted computer science scenarios</div>
              <p className="win95-text">
                Complex problems combine multiple constraints, objectives, and system limitations. This page is a roadmap for modeling,
                algorithm selection, evaluation, and real-world integration of solutions.
              </p>
            </div>
            <Link to="/algoViz" className="win95-button" role="button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-fieldset">
            <legend>The Big Picture</legend>
            <div className="win95-grid win95-grid-3">
              {bigPicture.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.details}</p>
                  <p className="win95-text">{item.notes}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Categories</legend>
            <div className="win95-grid win95-grid-2">
              {categories.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Core Skills</legend>
            <div className="win95-grid win95-grid-2">
              {coreSkills.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Algorithmic Toolbox</legend>
            <div className="win95-grid win95-grid-2">
              {toolbox.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Design Checklist</legend>
            <div className="win95-grid win95-grid-2">
              {designChecklist.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Evaluation Metrics</legend>
            <div className="win95-grid win95-grid-2">
              {evaluationMetrics.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Example Problem Frames</legend>
            <div className="win95-grid win95-grid-2">
              {exampleProblemFrames.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Interactive Timeline</legend>
            <div className="win95-panel">
              <div className="win95-heading">Strategy Stepper</div>
              <p className="win95-text">
                Step through common workflows for tackling complex problems.
              </p>
              <div className="win95-grid win95-grid-3">
                {timelineScenarios.map((scenario) => (
                  <button
                    key={scenario.id}
                    type="button"
                    className="win95-button"
                    onClick={() => {
                      setSelectedScenarioId(scenario.id)
                      setStepIndex(0)
                    }}
                  >
                    {scenario.title}
                  </button>
                ))}
              </div>
              <div className="win95-panel win95-panel--raised">
                <p className="win95-text"><strong>Selected:</strong> {selectedScenario?.title ?? 'None'}</p>
                <p className="win95-text">{stepText}</p>
                <p className="win95-text win95-note">{selectedScenario?.summary ?? ''}</p>
              </div>
              <div className="win95-grid win95-grid-3">
                <button
                  type="button"
                  className="win95-button"
                  onClick={() => setStepIndex(0)}
                >
                  RESET
                </button>
                <button
                  type="button"
                  className="win95-button"
                  onClick={() => setStepIndex((prev) => Math.max(0, prev - 1))}
                >
                  BACK
                </button>
                <button
                  type="button"
                  className="win95-button"
                  onClick={() => {
                    if (canStepForward) {
                      setStepIndex((prev) => prev + 1)
                    }
                  }}
                >
                  STEP
                </button>
              </div>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Mind Map (Concept Walkthrough)</legend>
            <div className="win95-grid win95-grid-2">
              {mindMapNodes.map((item) => (
                <div key={item.id} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                <strong>Walkthrough:</strong> Start at Complex Problems -&gt; Modeling -&gt; Algorithms -&gt; Analysis -&gt; Evaluation.
                Then connect to Systems for real-world constraints.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Mind Map Edges</legend>
            <div className="win95-panel">
              <table className="win95-table">
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
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Common Pitfalls</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {commonPitfalls.map((pitfall) => (
                  <li key={pitfall.mistake}>
                    <strong>{pitfall.mistake}:</strong> {pitfall.description}
                  </li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Key Takeaways</legend>
            <div className="win95-grid win95-grid-2">
              {keyTakeaways.map((item) => (
                <div key={item} className="win95-panel">
                  <p className="win95-text">{item}</p>
                </div>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}
