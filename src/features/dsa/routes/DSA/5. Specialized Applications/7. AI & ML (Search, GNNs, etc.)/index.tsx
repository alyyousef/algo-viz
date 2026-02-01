import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'
import type { JSX } from 'react'


const bigPicture = [
  {
    title: 'Search is structured reasoning',
    detail: 'Graph and tree search make combinatorial spaces navigable with heuristics and pruning.',
    note: 'The heuristic decides whether the problem is solvable under budget.',
  },
  {
    title: 'Learning is a heuristic engine',
    detail: 'Models compress patterns into value functions, policies, and embeddings.',
    note: 'Good representations shrink search depth and candidate set size.',
  },
  {
    title: 'Evaluation is part of the algorithm',
    detail: 'Offline metrics rarely match real users; guardrails and rollback are required.',
    note: 'Production safety is a core algorithmic requirement.',
  },
  {
    title: 'Scale changes everything',
    detail: 'Methods that work on thousands of states can fail at millions.',
    note: 'Batching, caching, and quantization are first-class design choices.',
  },
]

const history = [
  {
    title: '1968: A* formalized',
    detail: 'Admissible heuristics enable optimal shortest-path search.',
    note: 'Became the workhorse for planning and pathfinding.',
  },
  {
    title: '1986: Backpropagation revival',
    detail: 'Gradient training became practical for deep networks.',
    note: 'Opened the door for modern supervised learning.',
  },
  {
    title: '1997-2006: Alpha-Beta to MCTS',
    detail: 'Game AI shifted to Monte Carlo Tree Search for large spaces.',
    note: 'Balanced exploration and exploitation.',
  },
  {
    title: '2012: AlexNet',
    detail: 'GPU training reset ImageNet and ignited deep learning at scale.',
    note: 'Sparked a focus on data and compute scaling.',
  },
  {
    title: '2017: Transformers',
    detail: 'Attention-first models replaced RNNs for language and vision.',
    note: 'Enabled long-range dependency modeling.',
  },
  {
    title: '2018-2022: GNN scaling',
    detail: 'Sampling and mini-batching enabled billion-edge training.',
    note: 'Graph learning moved into production workloads.',
  },
]

const pillars = [
  {
    title: 'Reproducibility',
    detail: 'Seeded runs, versioned data, and deterministic kernels make comparisons valid.',
  },
  {
    title: 'Data hygiene',
    detail: 'Time/entity splits and schema checks prevent leakage and drift.',
  },
  {
    title: 'Search correctness',
    detail: 'Admissible heuristics and constraints are enforced, not hoped for.',
  },
  {
    title: 'Resource-aware loops',
    detail: 'Training and inference obey memory and latency ceilings.',
  },
  {
    title: 'Evaluation fidelity',
    detail: 'Offline metrics are aligned to user outcomes with online gates.',
  },
]

const mentalModels = [
  {
    title: 'Search as a flashlight',
    detail: 'Heuristics aim the beam; weak heuristics cause wandering, biased ones miss solutions.',
  },
  {
    title: 'Learning as compression',
    detail: 'Models store regularities that reduce search or retrieval cost.',
  },
  {
    title: 'Assembly line',
    detail: 'Data, training, eval, and serving are stations; missing checks leak defects.',
  },
  {
    title: 'Latency as currency',
    detail: 'Every beam step, attention head, or GNN hop spends milliseconds.',
  },
]

const howItWorks = [
  {
    title: 'Frame the task',
    detail: 'Define states, actions, and objectives; set latency and throughput budgets.',
  },
  {
    title: 'Build and validate data',
    detail: 'Collect, clean, split by time/entity, and log coverage of edge cases.',
  },
  {
    title: 'Choose search or model family',
    detail: 'A*/MCTS for explicit combinatorics; transformers/GNNs for representation-heavy tasks.',
  },
  {
    title: 'Train with stability',
    detail: 'Use normalization, clipping, and checkpoints; monitor gradients and loss spikes.',
  },
  {
    title: 'Evaluate realistically',
    detail: 'Stress with long-tail tests and compute budget limits.',
  },
  {
    title: 'Serve with guardrails',
    detail: 'Use canaries, rate limits, and fallbacks; log for retraining.',
  },
  {
    title: 'Monitor drift',
    detail: 'Detect distribution changes and retrain with gated rollouts.',
  },
]

const searchAnatomy = [
  {
    title: 'State space',
    detail: 'Nodes represent states; edges represent actions with costs.',
  },
  {
    title: 'Frontier management',
    detail: 'Priority queues or beam lists decide which states to expand next.',
  },
  {
    title: 'Heuristics',
    detail: 'Admissible and consistent heuristics preserve optimality for A*.',
  },
  {
    title: 'Pruning rules',
    detail: 'Alpha-beta, dominance checks, and bounds reduce expansions.',
  },
  {
    title: 'Rollouts',
    detail: 'MCTS uses simulations to estimate value in large spaces.',
  },
  {
    title: 'Budgeting',
    detail: 'Cap expansions, depth, or time to prevent runaway search.',
  },
]

const modelAnatomy = [
  {
    title: 'Representation',
    detail: 'Embeddings encode inputs; quality controls downstream performance.',
  },
  {
    title: 'Objective',
    detail: 'Loss functions encode the behavior you want (ranking, classification, generation).',
  },
  {
    title: 'Regularization',
    detail: 'Dropout, weight decay, and early stopping reduce overfitting.',
  },
  {
    title: 'Calibration',
    detail: 'Platt scaling or temperature fixes probability overconfidence.',
  },
  {
    title: 'Distillation',
    detail: 'Teacher-student training shrinks models without losing accuracy.',
  },
  {
    title: 'Serving',
    detail: 'Batching, caching, and quantization keep latency predictable.',
  },
]

const gnnAnatomy = [
  {
    title: 'Message passing',
    detail: 'Nodes aggregate neighbor messages across L layers.',
  },
  {
    title: 'Sampling',
    detail: 'Neighbor sampling reduces memory and compute on large graphs.',
  },
  {
    title: 'Over-smoothing',
    detail: 'Too many layers blur node differences; residuals help.',
  },
  {
    title: 'Heterogeneous graphs',
    detail: 'Typed nodes and edges require specialized aggregators.',
  },
  {
    title: 'Temporal graphs',
    detail: 'Edges change over time; models must respect ordering.',
  },
  {
    title: 'Edge features',
    detail: 'Relation attributes improve prediction beyond pure topology.',
  },
]

const tradeoffMatrix = [
  {
    dimension: 'Optimality',
    search: 'A* guarantees optimal with admissible heuristics.',
    learned: 'Models approximate; must validate on edge cases.',
  },
  {
    dimension: 'Latency',
    search: 'Can be high for large branching factors.',
    learned: 'Low once trained; expensive to train.',
  },
  {
    dimension: 'Data dependence',
    search: 'Needs heuristics, not large datasets.',
    learned: 'Requires data, labels, and feature pipelines.',
  },
  {
    dimension: 'Adaptability',
    search: 'Rule changes are immediate.',
    learned: 'Requires retraining or fine-tuning.',
  },
  {
    dimension: 'Interpretability',
    search: 'Paths and costs are explicit.',
    learned: 'Model behavior is less transparent.',
  },
  {
    dimension: 'Failure modes',
    search: 'Explosion in state space.',
    learned: 'Distribution shift and leakage.',
  },
]

const complexityTable = [
  { approach: 'BFS/DFS', time: 'O(V + E)', space: 'O(V)', note: 'Deterministic exploration; baseline for small graphs.' },
  { approach: 'A* (binary heap)', time: 'O(E log V)', space: 'O(V)', note: 'Optimal if heuristic is admissible.' },
  { approach: 'Beam search (b, d)', time: 'O(b * d)', space: 'O(b * d)', note: 'Controlled latency; non-optimal.' },
  { approach: 'MCTS (iterations n)', time: 'O(n)', space: 'O(n)', note: 'Quality scales with rollouts.' },
  { approach: 'GNN message passing (L)', time: 'O(L * E)', space: 'O(L * (V + E))', note: 'Sampling reduces E.' },
  { approach: 'Transformer attention (seq L)', time: 'O(L^2 * d)', space: 'O(L^2)', note: 'Sparse/flash variants reduce cost.' },
]

const applications = [
  {
    title: 'Game-playing agents',
    detail: 'Value/policy networks guide MCTS to shrink search trees.',
    note: 'Strong play under fixed time per move.',
  },
  {
    title: 'Recommendation and ranking',
    detail: 'Two-stage retrieval + rankers combine search and learned scoring.',
    note: 'Embeddings prune candidates before expensive models.',
  },
  {
    title: 'Route planning',
    detail: 'A* with learned heuristics accelerates multi-stop routing.',
    note: 'Constraints handled via penalties or SAT hybrids.',
  },
  {
    title: 'Code/text generation',
    detail: 'Beam or constrained decoding enforces syntax and policy.',
    note: 'Retrieval grounds generation in known facts.',
  },
  {
    title: 'Graph fraud detection',
    detail: 'GNNs propagate risk across relations with sampled neighbors.',
    note: 'Scales to millions of edges.',
  },
]

const failureStory =
  'A ranking model used random splits and leaked future user clicks into training. Offline AUC soared, but the launch tanked conversions. Fixes: time-based splits, feature lineage checks, and pre-launch replay tests.'

const pitfalls = [
  {
    title: 'Heuristic optimism',
    detail: 'Over-optimistic heuristics break admissibility and produce non-optimal paths.',
  },
  {
    title: 'Leakage via splits',
    detail: 'Random splits leak future signals; use time or entity disjoint splits.',
  },
  {
    title: 'Over-smoothing',
    detail: 'Deep GNNs blur signal; add residuals and normalization.',
  },
  {
    title: 'Unbounded decoding',
    detail: 'Beam or sampling without caps violates latency budgets.',
  },
  {
    title: 'Silent drift',
    detail: 'Models decay in production without monitoring and retraining gates.',
  },
  {
    title: 'Weak calibration',
    detail: 'Uncalibrated scores break ranking and decision thresholds.',
  },
]

const whenToUse = [
  {
    title: 'A*/IDA*',
    detail: 'Use when optimality matters and heuristics exist (planning, puzzles).',
  },
  {
    title: 'MCTS',
    detail: 'Use for stochastic spaces where rollouts estimate value (games).',
  },
  {
    title: 'Beam/constrained decoding',
    detail: 'Use when syntax or policy constraints must be respected.',
  },
  {
    title: 'GNNs',
    detail: 'Use when relationships are the signal (fraud, chemistry, knowledge graphs).',
  },
  {
    title: 'Transformers',
    detail: 'Use for long-range sequence dependencies (language, logs, audio).',
  },
  {
    title: 'Hybrid search+learn',
    detail: 'Use when both structure and statistical patterns matter.',
  },
]

const advanced = [
  {
    title: 'Learned heuristics',
    detail: 'Train value networks to guide A* or MCTS; validate admissibility limits.',
    note: 'Great for speed, risky for optimality.',
  },
  {
    title: 'Retrieval-augmented generation',
    detail: 'Nearest-neighbor retrieval grounds outputs without retraining.',
    note: 'Improves factuality and reduces hallucination.',
  },
  {
    title: 'Mixture-of-experts',
    detail: 'Route tokens to specialized experts for scale with sparse compute.',
    note: 'Latency stays bounded via top-k routing.',
  },
  {
    title: 'Constraint-aware decoding',
    detail: 'FSMs or token masks enforce hard rules at generation time.',
    note: 'Reduces invalid outputs dramatically.',
  },
  {
    title: 'Hardware-aware distillation',
    detail: 'Quantize and distill to fit edge/real-time budgets.',
    note: 'Maintain accuracy with calibration.',
  },
  {
    title: 'Graph contrastive learning',
    detail: 'Self-supervised signals reduce label dependence.',
    note: 'Useful for sparse or noisy labels.',
  },
]

const tuningChecklist = [
  {
    title: 'Search budgets',
    detail: 'Cap expansions, depth, or wall-clock per query.',
  },
  {
    title: 'Evaluation splits',
    detail: 'Use time or entity splits; prevent leakage with lineage checks.',
  },
  {
    title: 'Calibration',
    detail: 'Tune thresholds and temperature to align scores with outcomes.',
  },
  {
    title: 'Batching and caching',
    detail: 'Group inference and cache embeddings to cut latency.',
  },
  {
    title: 'Quantization',
    detail: 'Use 8-bit or 4-bit where accuracy allows.',
  },
  {
    title: 'Monitoring',
    detail: 'Track drift, error rates, and input coverage.',
  },
]

const observability = [
  {
    title: 'Search metrics',
    detail: 'Expansions per query, open-set size, and timeouts.',
  },
  {
    title: 'Model health',
    detail: 'Prediction latency, calibration drift, and outlier rates.',
  },
  {
    title: 'Data drift',
    detail: 'Feature distribution shifts and missing-value spikes.',
  },
  {
    title: 'GNN stability',
    detail: 'Neighbor sampling variance and oversmoothing diagnostics.',
  },
  {
    title: 'Serving reliability',
    detail: 'Fallback rate, cache hit rate, and queue depth.',
  },
  {
    title: 'Experiment safety',
    detail: 'A/B guardrails, rollback triggers, and shadow traffic tests.',
  },
]

const codeExamples = [
  {
    title: 'Beam search with length penalty',
    code: `type BeamState = { tokens: string[]; score: number }

function beamSearch(start: BeamState, step: (s: BeamState) => BeamState[], beamSize: number, alpha: number) {
  let beams: BeamState[] = [start]
  while (!beams.every((b) => isComplete(b))) {
    const candidates = beams.flatMap((b) => step(b))
    for (const c of candidates) {
      const len = c.tokens.length
      const penalty = Math.pow((5 + len) / 6, alpha)
      c.score = c.score / penalty
    }
    candidates.sort((a, b) => b.score - a.score)
    beams = candidates.slice(0, beamSize)
  }
  return beams
}`,
    explanation: 'Length penalty avoids short outputs; add token masks for constraints.',
  },
  {
    title: 'GNN message passing (one layer)',
    code: `type Graph = { edges: Array<[number, number]>; features: number[][] }

function messagePass(graph: Graph, weight: number[][], aggregate: (msgs: number[][]) => number[]) {
  const msgs: number[][][] = Array.from({ length: graph.features.length }, () => [])

  for (const [u, v] of graph.edges) {
    const h = graph.features[u]
    const m = matVec(weight, h)
    msgs[v].push(m)
  }

  const updated = msgs.map((neighborMsgs, i) => {
    const agg = aggregate(neighborMsgs.length ? neighborMsgs : [[0]])
    return add(agg, graph.features[i])
  })

  return { ...graph, features: updated }
}`,
    explanation: 'Neighbor aggregation with residuals helps avoid over-smoothing.',
  },
  {
    title: 'A* with learned heuristic (sketch)',
    code: `type State = { id: string; g: number; h: number; f: number }

function aStarLearned(start: State, goal: State, expand: (s: State) => State[], hNet: (s: State) => number) {
  const open: State[] = [start]
  start.h = hNet(start)
  start.f = start.g + start.h

  while (open.length) {
    open.sort((a, b) => a.f - b.f)
    const current = open.shift()!
    if (current.id === goal.id) return current
    for (const next of expand(current)) {
      next.h = hNet(next)
      next.f = next.g + next.h
      open.push(next)
    }
  }
  return undefined
}`,
    explanation: 'Learned heuristics accelerate search but must be validated for admissibility.',
  },
]

const keyTakeaways = [
  {
    title: 'Heuristics decide feasibility',
    detail: 'Good heuristics and embeddings shrink search and compute costs.',
  },
  {
    title: 'Data hygiene matters',
    detail: 'Splits, logging, and lineage checks prevent silent leakage.',
  },
  {
    title: 'Budget latency end-to-end',
    detail: 'Beam size, rollout count, attention length, and hops must be capped.',
  },
  {
    title: 'Guardrails keep launches safe',
    detail: 'Canaries, rollback, and shadow traffic are part of the system.',
  },
]

export default function AIMLPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">AI & ML (Search, GNNs, etc.)</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Search meets learning</div>
              <p className="win95-text">
                Search and ML work best together: search provides structure, models provide heuristics and representations. Production
                systems succeed when data hygiene, latency budgets, and guardrails are treated as algorithmic requirements.
              </p>
            </div>
            <Link to="/algoViz" className="win95-button" role="button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-fieldset">
            <legend>Big picture</legend>
            <div className="win95-grid win95-grid-2">
              {bigPicture.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                  <p className="win95-text">{item.note}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>History</legend>
            <div className="win95-grid win95-grid-2">
              {history.map((event) => (
                <div key={event.title} className="win95-panel">
                  <div className="win95-heading">{event.title}</div>
                  <p className="win95-text">{event.detail}</p>
                  <p className="win95-text">{event.note}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Core pillars and mental hooks</legend>
            <div className="win95-row">
              <div className="win95-panel">
                <div className="win95-subheading">Pillars</div>
                <div className="win95-stack">
                  {pillars.map((pillar) => (
                    <div key={pillar.title} className="win95-panel">
                      <div className="win95-heading">{pillar.title}</div>
                      <p className="win95-text">{pillar.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="win95-panel">
                <div className="win95-subheading">Mental models</div>
                <div className="win95-stack">
                  {mentalModels.map((model) => (
                    <div key={model.title} className="win95-panel">
                      <div className="win95-heading">{model.title}</div>
                      <p className="win95-text">{model.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works, step by step</legend>
            <div className="win95-grid win95-grid-3">
              {howItWorks.map((step, index) => (
                <div key={step.title} className="win95-panel">
                  <div className="win95-heading">
                    Step {index + 1}: {step.title}
                  </div>
                  <p className="win95-text">{step.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Search anatomy</legend>
            <div className="win95-grid win95-grid-2">
              {searchAnatomy.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Model anatomy</legend>
            <div className="win95-grid win95-grid-2">
              {modelAnatomy.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>GNN anatomy</legend>
            <div className="win95-grid win95-grid-2">
              {gnnAnatomy.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Tradeoff matrix</legend>
            <div className="win95-panel">
              <table className="win95-table">
                <thead>
                  <tr>
                    <th>Dimension</th>
                    <th>Search-heavy</th>
                    <th>Learning-heavy</th>
                  </tr>
                </thead>
                <tbody>
                  {tradeoffMatrix.map((row) => (
                    <tr key={row.dimension}>
                      <td>{row.dimension}</td>
                      <td>{row.search}</td>
                      <td>{row.learned}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity reference</legend>
            <div className="win95-panel">
              <table className="win95-table">
                <thead>
                  <tr>
                    <th>Approach</th>
                    <th>Time</th>
                    <th>Space</th>
                    <th>Note</th>
                  </tr>
                </thead>
                <tbody>
                  {complexityTable.map((row) => (
                    <tr key={row.approach}>
                      <td>{row.approach}</td>
                      <td>{row.time}</td>
                      <td>{row.space}</td>
                      <td>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Applications</legend>
            <div className="win95-grid win95-grid-2">
              {applications.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                  <p className="win95-text">{item.note}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <div className="win95-heading">Failure mode</div>
              <p className="win95-text">{failureStory}</p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Pitfalls</legend>
            <div className="win95-grid win95-grid-2">
              {pitfalls.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>When to use what</legend>
            <div className="win95-grid win95-grid-2">
              {whenToUse.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Advanced moves</legend>
            <div className="win95-grid win95-grid-2">
              {advanced.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                  <p className="win95-text">{item.note}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Tuning checklist</legend>
            <div className="win95-grid win95-grid-2">
              {tuningChecklist.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Observability and signals</legend>
            <div className="win95-grid win95-grid-2">
              {observability.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Code examples</legend>
            <div className="win95-stack">
              {codeExamples.map((example) => (
                <div key={example.title} className="win95-panel">
                  <div className="win95-heading">{example.title}</div>
                  <pre className="win95-code">
                    <code>{example.code}</code>
                  </pre>
                  <p className="win95-text">{example.explanation}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Key takeaways</legend>
            <div className="win95-grid win95-grid-2">
              {keyTakeaways.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}
