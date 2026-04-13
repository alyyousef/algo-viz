import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

const bigPicture = [
  [
    'Search is structured reasoning',
    'Graph and tree search make combinatorial spaces navigable with heuristics and pruning.',
    'The heuristic decides whether the problem is solvable under budget.',
  ],
  [
    'Learning is a heuristic engine',
    'Models compress patterns into value functions, policies, and embeddings.',
    'Good representations shrink search depth and candidate set size.',
  ],
  [
    'Evaluation is part of the algorithm',
    'Offline metrics rarely match real users; guardrails and rollback are required.',
    'Production safety is a core algorithmic requirement.',
  ],
  [
    'Scale changes everything',
    'Methods that work on thousands of states can fail at millions.',
    'Batching, caching, and quantization are first-class design choices.',
  ],
] as const

const history = [
  [
    '1968: A* formalized',
    'Admissible heuristics enable optimal shortest-path search.',
    'Became the workhorse for planning and pathfinding.',
  ],
  [
    '1986: Backpropagation revival',
    'Gradient training became practical for deep networks.',
    'Opened the door for modern supervised learning.',
  ],
  [
    '1997-2006: Alpha-Beta to MCTS',
    'Game AI shifted to Monte Carlo Tree Search for large spaces.',
    'Balanced exploration and exploitation.',
  ],
  [
    '2012: AlexNet',
    'GPU training reset ImageNet and ignited deep learning at scale.',
    'Sparked a focus on data and compute scaling.',
  ],
  [
    '2017: Transformers',
    'Attention-first models replaced RNNs for language and vision.',
    'Enabled long-range dependency modeling.',
  ],
  [
    '2018-2022: GNN scaling',
    'Sampling and mini-batching enabled billion-edge training.',
    'Graph learning moved into production workloads.',
  ],
] as const

const pillars = [
  [
    'Reproducibility',
    'Seeded runs, versioned data, and deterministic kernels make comparisons valid.',
  ],
  ['Data hygiene', 'Time/entity splits and schema checks prevent leakage and drift.'],
  ['Search correctness', 'Admissible heuristics and constraints are enforced, not hoped for.'],
  ['Resource-aware loops', 'Training and inference obey memory and latency ceilings.'],
  ['Evaluation fidelity', 'Offline metrics are aligned to user outcomes with online gates.'],
] as const

const mentalModels = [
  [
    'Search as a flashlight',
    'Heuristics aim the beam; weak heuristics cause wandering, biased ones miss solutions.',
  ],
  ['Learning as compression', 'Models store regularities that reduce search or retrieval cost.'],
  ['Assembly line', 'Data, training, eval, and serving are stations; missing checks leak defects.'],
  ['Latency as currency', 'Every beam step, attention head, or GNN hop spends milliseconds.'],
] as const

const howItWorks = [
  ['Frame the task', 'Define states, actions, and objectives; set latency and throughput budgets.'],
  [
    'Build and validate data',
    'Collect, clean, split by time/entity, and log coverage of edge cases.',
  ],
  [
    'Choose search or model family',
    'A*/MCTS for explicit combinatorics; transformers/GNNs for representation-heavy tasks.',
  ],
  [
    'Train with stability',
    'Use normalization, clipping, and checkpoints; monitor gradients and loss spikes.',
  ],
  ['Evaluate realistically', 'Stress with long-tail tests and compute budget limits.'],
  ['Serve with guardrails', 'Use canaries, rate limits, and fallbacks; log for retraining.'],
  ['Monitor drift', 'Detect distribution changes and retrain with gated rollouts.'],
] as const

const searchAnatomy = [
  ['State space', 'Nodes represent states; edges represent actions with costs.'],
  ['Frontier management', 'Priority queues or beam lists decide which states to expand next.'],
  ['Heuristics', 'Admissible and consistent heuristics preserve optimality for A*.'],
  ['Pruning rules', 'Alpha-beta, dominance checks, and bounds reduce expansions.'],
  ['Rollouts', 'MCTS uses simulations to estimate value in large spaces.'],
  ['Budgeting', 'Cap expansions, depth, or time to prevent runaway search.'],
] as const

const modelAnatomy = [
  ['Representation', 'Embeddings encode inputs; quality controls downstream performance.'],
  [
    'Objective',
    'Loss functions encode the behavior you want (ranking, classification, generation).',
  ],
  ['Regularization', 'Dropout, weight decay, and early stopping reduce overfitting.'],
  ['Calibration', 'Platt scaling or temperature fixes probability overconfidence.'],
  ['Distillation', 'Teacher-student training shrinks models without losing accuracy.'],
  ['Serving', 'Batching, caching, and quantization keep latency predictable.'],
] as const

const gnnAnatomy = [
  ['Message passing', 'Nodes aggregate neighbor messages across L layers.'],
  ['Sampling', 'Neighbor sampling reduces memory and compute on large graphs.'],
  ['Over-smoothing', 'Too many layers blur node differences; residuals help.'],
  ['Heterogeneous graphs', 'Typed nodes and edges require specialized aggregators.'],
  ['Temporal graphs', 'Edges change over time; models must respect ordering.'],
  ['Edge features', 'Relation attributes improve prediction beyond pure topology.'],
] as const

const tradeoffMatrix = [
  [
    'Optimality',
    'A* guarantees optimal with admissible heuristics.',
    'Models approximate; must validate on edge cases.',
  ],
  ['Latency', 'Can be high for large branching factors.', 'Low once trained; expensive to train.'],
  [
    'Data dependence',
    'Needs heuristics, not large datasets.',
    'Requires data, labels, and feature pipelines.',
  ],
  ['Adaptability', 'Rule changes are immediate.', 'Requires retraining or fine-tuning.'],
  ['Interpretability', 'Paths and costs are explicit.', 'Model behavior is less transparent.'],
  ['Failure modes', 'Explosion in state space.', 'Distribution shift and leakage.'],
] as const

const complexityTable = [
  ['BFS/DFS', 'O(V + E)', 'O(V)', 'Deterministic exploration; baseline for small graphs.'],
  ['A* (binary heap)', 'O(E log V)', 'O(V)', 'Optimal if heuristic is admissible.'],
  ['Beam search (b, d)', 'O(b * d)', 'O(b * d)', 'Controlled latency; non-optimal.'],
  ['MCTS (iterations n)', 'O(n)', 'O(n)', 'Quality scales with rollouts.'],
  ['GNN message passing (L)', 'O(L * E)', 'O(L * (V + E))', 'Sampling reduces E.'],
  ['Transformer attention (seq L)', 'O(L^2 * d)', 'O(L^2)', 'Sparse/flash variants reduce cost.'],
] as const

const applications = [
  [
    'Game-playing agents',
    'Value/policy networks guide MCTS to shrink search trees.',
    'Strong play under fixed time per move.',
  ],
  [
    'Recommendation and ranking',
    'Two-stage retrieval + rankers combine search and learned scoring.',
    'Embeddings prune candidates before expensive models.',
  ],
  [
    'Route planning',
    'A* with learned heuristics accelerates multi-stop routing.',
    'Constraints handled via penalties or SAT hybrids.',
  ],
  [
    'Code/text generation',
    'Beam or constrained decoding enforces syntax and policy.',
    'Retrieval grounds generation in known facts.',
  ],
  [
    'Graph fraud detection',
    'GNNs propagate risk across relations with sampled neighbors.',
    'Scales to millions of edges.',
  ],
] as const

const failureStory =
  'A ranking model used random splits and leaked future user clicks into training. Offline AUC soared, but the launch tanked conversions. Fixes: time-based splits, feature lineage checks, and pre-launch replay tests.'

const pitfalls = [
  [
    'Heuristic optimism',
    'Over-optimistic heuristics break admissibility and produce non-optimal paths.',
  ],
  ['Leakage via splits', 'Random splits leak future signals; use time or entity disjoint splits.'],
  ['Over-smoothing', 'Deep GNNs blur signal; add residuals and normalization.'],
  ['Unbounded decoding', 'Beam or sampling without caps violates latency budgets.'],
  ['Silent drift', 'Models decay in production without monitoring and retraining gates.'],
  ['Weak calibration', 'Uncalibrated scores break ranking and decision thresholds.'],
] as const

const whenToUse = [
  ['A*/IDA*', 'Use when optimality matters and heuristics exist (planning, puzzles).'],
  ['MCTS', 'Use for stochastic spaces where rollouts estimate value (games).'],
  ['Beam/constrained decoding', 'Use when syntax or policy constraints must be respected.'],
  ['GNNs', 'Use when relationships are the signal (fraud, chemistry, knowledge graphs).'],
  ['Transformers', 'Use for long-range sequence dependencies (language, logs, audio).'],
  ['Hybrid search+learn', 'Use when both structure and statistical patterns matter.'],
] as const

const advanced = [
  [
    'Learned heuristics',
    'Train value networks to guide A* or MCTS; validate admissibility limits.',
    'Great for speed, risky for optimality.',
  ],
  [
    'Retrieval-augmented generation',
    'Nearest-neighbor retrieval grounds outputs without retraining.',
    'Improves factuality and reduces hallucination.',
  ],
  [
    'Mixture-of-experts',
    'Route tokens to specialized experts for scale with sparse compute.',
    'Latency stays bounded via top-k routing.',
  ],
  [
    'Constraint-aware decoding',
    'FSMs or token masks enforce hard rules at generation time.',
    'Reduces invalid outputs dramatically.',
  ],
  [
    'Hardware-aware distillation',
    'Quantize and distill to fit edge/real-time budgets.',
    'Maintain accuracy with calibration.',
  ],
  [
    'Graph contrastive learning',
    'Self-supervised signals reduce label dependence.',
    'Useful for sparse or noisy labels.',
  ],
] as const

const tuningChecklist = [
  ['Search budgets', 'Cap expansions, depth, or wall-clock per query.'],
  ['Evaluation splits', 'Use time or entity splits; prevent leakage with lineage checks.'],
  ['Calibration', 'Tune thresholds and temperature to align scores with outcomes.'],
  ['Batching and caching', 'Group inference and cache embeddings to cut latency.'],
  ['Quantization', 'Use 8-bit or 4-bit where accuracy allows.'],
  ['Monitoring', 'Track drift, error rates, and input coverage.'],
] as const

const observability = [
  ['Search metrics', 'Expansions per query, open-set size, and timeouts.'],
  ['Model health', 'Prediction latency, calibration drift, and outlier rates.'],
  ['Data drift', 'Feature distribution shifts and missing-value spikes.'],
  ['GNN stability', 'Neighbor sampling variance and oversmoothing diagnostics.'],
  ['Serving reliability', 'Fallback rate, cache hit rate, and queue depth.'],
  ['Experiment safety', 'A/B guardrails, rollback triggers, and shadow traffic tests.'],
] as const

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
  [
    'Heuristics decide feasibility',
    'Good heuristics and embeddings shrink search and compute costs.',
  ],
  ['Data hygiene matters', 'Splits, logging, and lineage checks prevent silent leakage.'],
  [
    'Budget latency end-to-end',
    'Beam size, rollout count, attention length, and hops must be capped.',
  ],
  [
    'Guardrails keep launches safe',
    'Canaries, rollback, and shadow traffic are part of the system.',
  ],
] as const

const glossary = [
  ['Admissible heuristic', 'A search estimate that never overstates the true remaining cost.'],
  ['Beam search', 'Heuristic decoding that keeps only the top-k candidate sequences at each step.'],
  ['Calibration', 'Adjustment process that aligns model confidence with actual observed accuracy.'],
  ['GNN', 'Graph Neural Network that propagates information along edges between related entities.'],
  ['MCTS', 'Monte Carlo Tree Search that uses rollouts to estimate value in large search spaces.'],
  [
    'Distribution shift',
    'Change between training and production data that degrades model quality.',
  ],
  [
    'Quantization',
    'Technique that lowers numeric precision to reduce inference memory and latency.',
  ],
  [
    'Shadow traffic',
    'Production requests mirrored to a new system for evaluation without user impact.',
  ],
] as const

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
    { id: 'bp-history', label: 'History' },
    { id: 'bp-applications', label: 'Applications' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-pillars', label: 'Pillars' },
    { id: 'core-models', label: 'Mental Models' },
    { id: 'core-flow', label: 'How It Works' },
    { id: 'core-search', label: 'Search Anatomy' },
    { id: 'core-model', label: 'Model Anatomy' },
    { id: 'core-gnn', label: 'GNN Anatomy' },
    { id: 'core-tradeoffs', label: 'Tradeoff Matrix' },
    { id: 'core-complexity', label: 'Complexity' },
    { id: 'core-pitfalls', label: 'Pitfalls' },
    { id: 'core-when', label: 'When to Use' },
    { id: 'core-advanced', label: 'Advanced Moves' },
    { id: 'core-tuning', label: 'Tuning Checklist' },
    { id: 'core-observability', label: 'Observability' },
  ],
  examples: [
    { id: 'ex-failure', label: 'Failure Mode' },
    { id: 'ex-code', label: 'Code Examples' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function AIMLPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'AI &amp; ML (Search, GNNs, etc.)',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="AI &amp; ML (Search, GNNs, etc.)"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">AI &amp; ML (Search, GNNs, etc.)</h1>
      <p className="bin98-doc-subtitle">
        Search and ML work best together: search provides structure, models provide heuristics and
        representations. Production systems succeed when data hygiene, latency budgets, and
        guardrails are treated as algorithmic requirements.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            {bigPicture.map(([title, detail, note]) => (
              <div key={title}>
                <h3 className="bin98-subheading">{title}</h3>
                <p>{detail}</p>
                <p>{note}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="bp-history" className="bin98-section">
            <h2 className="bin98-heading">History</h2>
            {history.map(([title, detail, note]) => (
              <div key={title}>
                <h3 className="bin98-subheading">{title}</h3>
                <p>{detail}</p>
                <p>{note}</p>
              </div>
            ))}
          </section>

          <section id="bp-applications" className="bin98-section">
            <h2 className="bin98-heading">Applications</h2>
            {applications.map(([title, detail, note]) => (
              <div key={title}>
                <h3 className="bin98-subheading">{title}</h3>
                <p>{detail}</p>
                <p>{note}</p>
              </div>
            ))}
          </section>

          <section id="bp-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key Takeaways</h2>
            {keyTakeaways.map(([title, detail]) => (
              <p key={title}>
                <strong>{title}:</strong> {detail}
              </p>
            ))}
          </section>
        </>
      )}

      {activeTab === 'core-concepts' && (
        <>
          <section id="core-pillars" className="bin98-section">
            <h2 className="bin98-heading">Core Pillars and Mental Hooks</h2>
            {pillars.map(([title, detail]) => (
              <p key={title}>
                <strong>{title}:</strong> {detail}
              </p>
            ))}
          </section>

          <section id="core-models" className="bin98-section">
            <h2 className="bin98-heading">Mental Models</h2>
            {mentalModels.map(([title, detail]) => (
              <p key={title}>
                <strong>{title}:</strong> {detail}
              </p>
            ))}
          </section>

          <section id="core-flow" className="bin98-section">
            <h2 className="bin98-heading">How It Works, Step by Step</h2>
            {howItWorks.map(([title, detail], index) => (
              <p key={title}>
                <strong>
                  Step {index + 1}: {title}:
                </strong>{' '}
                {detail}
              </p>
            ))}
          </section>

          <section id="core-search" className="bin98-section">
            <h2 className="bin98-heading">Search Anatomy</h2>
            {searchAnatomy.map(([title, detail]) => (
              <p key={title}>
                <strong>{title}:</strong> {detail}
              </p>
            ))}
          </section>

          <section id="core-model" className="bin98-section">
            <h2 className="bin98-heading">Model Anatomy</h2>
            {modelAnatomy.map(([title, detail]) => (
              <p key={title}>
                <strong>{title}:</strong> {detail}
              </p>
            ))}
          </section>

          <section id="core-gnn" className="bin98-section">
            <h2 className="bin98-heading">GNN Anatomy</h2>
            {gnnAnatomy.map(([title, detail]) => (
              <p key={title}>
                <strong>{title}:</strong> {detail}
              </p>
            ))}
          </section>

          <section id="core-tradeoffs" className="bin98-section">
            <h2 className="bin98-heading">Tradeoff Matrix</h2>
            {tradeoffMatrix.map(([dimension, search, learned]) => (
              <p key={dimension}>
                <strong>{dimension}:</strong> Search-heavy: {search} Learning-heavy: {learned}
              </p>
            ))}
          </section>

          <section id="core-complexity" className="bin98-section">
            <h2 className="bin98-heading">Complexity Reference</h2>
            {complexityTable.map(([approach, time, space, note]) => (
              <p key={approach}>
                <strong>{approach}:</strong> Time {time}; Space {space}; {note}
              </p>
            ))}
          </section>

          <section id="core-pitfalls" className="bin98-section">
            <h2 className="bin98-heading">Pitfalls</h2>
            <ul>
              {pitfalls.map(([title, detail]) => (
                <li key={title}>
                  <strong>{title}:</strong> {detail}
                </li>
              ))}
            </ul>
          </section>

          <section id="core-when" className="bin98-section">
            <h2 className="bin98-heading">When to Use What</h2>
            {whenToUse.map(([title, detail]) => (
              <p key={title}>
                <strong>{title}:</strong> {detail}
              </p>
            ))}
          </section>

          <section id="core-advanced" className="bin98-section">
            <h2 className="bin98-heading">Advanced Moves</h2>
            {advanced.map(([title, detail, note]) => (
              <div key={title}>
                <h3 className="bin98-subheading">{title}</h3>
                <p>{detail}</p>
                <p>{note}</p>
              </div>
            ))}
          </section>

          <section id="core-tuning" className="bin98-section">
            <h2 className="bin98-heading">Tuning Checklist</h2>
            {tuningChecklist.map(([title, detail]) => (
              <p key={title}>
                <strong>{title}:</strong> {detail}
              </p>
            ))}
          </section>

          <section id="core-observability" className="bin98-section">
            <h2 className="bin98-heading">Observability and Signals</h2>
            {observability.map(([title, detail]) => (
              <p key={title}>
                <strong>{title}:</strong> {detail}
              </p>
            ))}
          </section>
        </>
      )}

      {activeTab === 'examples' && (
        <>
          <section id="ex-failure" className="bin98-section">
            <h2 className="bin98-heading">Failure Mode</h2>
            <p>{failureStory}</p>
          </section>

          <section id="ex-code" className="bin98-section">
            <h2 className="bin98-heading">Code Examples</h2>
            {codeExamples.map((example) => (
              <div key={example.title}>
                <h3 className="bin98-subheading">{example.title}</h3>
                <div className="bin98-codebox">
                  <code>{example.code.trim()}</code>
                </div>
                <p>{example.explanation}</p>
              </div>
            ))}
          </section>
        </>
      )}

      {activeTab === 'glossary' && (
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {glossary.map(([term, definition]) => (
            <p key={term}>
              <strong>{term}:</strong> {definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
