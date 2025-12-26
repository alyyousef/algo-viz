import { Link } from 'react-router-dom'
import type { JSX } from 'react'

const win95Styles = `
.win95-page {
  min-height: 100vh;
  background: #C0C0C0;
  padding: 0;
  color: #000;
  font-family: 'MS Sans Serif', 'Tahoma', sans-serif;
  -webkit-font-smoothing: none;
}

.win95-page * {
  box-sizing: border-box;
}

.win95-page a {
  color: #000;
  text-decoration: none;
}

.win95-page a:hover {
  text-decoration: underline;
}

.win95-window {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  background: #C0C0C0;
  box-shadow: none;
  border-radius: 0;
}

.win95-titlebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #000080;
  color: #fff;
  padding: 4px 6px;
  font-weight: 700;
  font-size: 13px;
  line-height: 1;
}

.win95-title {
  display: inline-block;
}

.win95-title-controls {
  display: flex;
  gap: 4px;
}

.win95-control {
  width: 22px;
  height: 20px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  border-radius: 0;
  font-weight: 700;
  font-size: 12px;
  line-height: 1;
  padding: 0;
  cursor: pointer;
}

.win95-control:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-control:focus,
.win95-button:focus {
  outline: 1px dotted #000;
  outline-offset: -3px;
}

.win95-content {
  padding: 10px;
}

.win95-header-row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: flex-start;
  margin-bottom: 8px;
}

.win95-button {
  padding: 3px 10px 2px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  border-radius: 0;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  line-height: 1.2;
}

.win95-button:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-fieldset {
  border: 2px solid;
  border-color: #808080 #404040 #404040 #808080;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 0;
  background: #C0C0C0;
}

.win95-fieldset legend {
  padding: 0 6px;
  font-weight: 700;
  font-size: 12px;
}

.win95-grid {
  display: grid;
  gap: 6px;
}

.win95-grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.win95-grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
}

.win95-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 8px;
}

.win95-panel {
  border: 2px solid;
  border-color: #808080 #fff #fff #808080;
  background: #C0C0C0;
  padding: 8px;
  border-radius: 0;
}

.win95-panel--raised {
  border-color: #fff #404040 #404040 #fff;
}

.win95-heading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 4px;
}

.win95-subheading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 6px;
}

.win95-text {
  font-size: 12px;
  line-height: 1.35;
  margin: 0 0 6px;
}

.win95-stack {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.win95-list {
  margin: 0;
  padding-left: 18px;
  font-size: 12px;
  line-height: 1.35;
}

.win95-list li {
  margin-bottom: 4px;
}

.win95-list--numbered {
  list-style: decimal;
}

.win95-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.win95-table th,
.win95-table td {
  border: 1px solid #808080;
  padding: 6px 6px 4px;
  text-align: left;
}

.win95-table th {
  font-weight: 700;
}

.win95-code {
  margin: 6px 0;
  background: #C0C0C0;
  color: #000;
  padding: 8px;
  font-family: 'Courier New', monospace;
  font-size: 11px;
  border: 2px solid;
  border-color: #404040 #fff #fff #404040;
  overflow-x: auto;
  border-radius: 0;
}
`

const bigPicture = [
  {
    title: 'Search as structured reasoning',
    detail:
      'Graph and tree search expose the combinatorial space of moves, proofs, or plans. Heuristics trim the frontier so solutions land under compute budgets.',
    note: 'Avoids brute force explosions when branching factors spike.',
  },
  {
    title: 'Learning as compressed signal',
    detail:
      'Models turn data into heuristics, policies, and embeddings that steer search. Representation quality is the lever that shrinks search depth.',
    note: 'Saves repeated hand-tuning of heuristics as domains evolve.',
  },
  {
    title: 'Feedback loops to production',
    detail: 'Offline metrics rarely match real users; guardrails, eval gates, and rollback stories are part of the algorithm.',
    note: 'Prevents silent regressions when distributions drift.',
  },
  {
    title: 'Scale-aware design',
    detail:
      'Choices that work on thousands of states or samples can fail at millions; batching, quantization, and streaming matter as much as model choice.',
    note: 'Keeps throughput and latency predictable in serving.',
  },
]

const history = [
  {
    title: '1968: A* (Hart, Nilsson, Raphael)',
    detail: 'Admissible heuristics formalized optimal search that later powered pathfinding and planning.',
  },
  {
    title: '1986: Backpropagation revival',
    detail: 'Rumelhart, Hinton, Williams made gradient training practical, enabling deep supervised models.',
  },
  {
    title: '1997-2006: Alpha-Beta to MCTS',
    detail: 'Game AIs moved from Alpha-Beta pruning to Monte Carlo Tree Search for stochastic, vast spaces.',
  },
  {
    title: '2012: AlexNet',
    detail: 'GPU-trained CNNs reset the ImageNet benchmark, igniting large-scale deep learning.',
  },
  {
    title: '2017: Transformers',
    detail: 'Attention-first sequence models displaced RNNs for language, vision, and multimodal tasks.',
  },
  {
    title: '2018-2022: GNN scaling',
    detail: 'Neighbor sampling, mini-batching, and hardware kernels made billion-edge training feasible.',
  },
]

const pillars = [
  {
    title: 'Reproducibility',
    detail: 'Seeded runs, versioned data, and determinism in kernels make comparisons meaningful.',
  },
  {
    title: 'Data hygiene',
    detail: 'Time and entity-based splits stop leakage; feature logging with schema checks prevents drift.',
  },
  {
    title: 'Search correctness',
    detail: 'Admissible and consistent heuristics for optimal search; constraints enforced, not hoped for.',
  },
  {
    title: 'Resource-aware loops',
    detail: 'Training and decoding must respect memory and latency ceilings with profiling and quotas.',
  },
  {
    title: 'Evaluation fidelity',
    detail: 'Offline metrics aligned to business or safety goals; online gates with rollback paths.',
  },
]

const mentalModels = [
  {
    title: 'Search as flashlight',
    detail:
      'Heuristics tilt the beam toward promising regions. If the beam is dim (weak heuristic), you wander; if biased, you miss solutions.',
  },
  {
    title: 'Learning as compression',
    detail:
      'Models store regularities that cut search. Over-compress and you overfit; under-compress and search stays expensive.',
  },
  {
    title: 'Pipelines as assembly lines',
    detail:
      'Data ingest, training, eval, and serving are stations. If any station lacks inspection, defects slip downstream.',
  },
  {
    title: 'Latency as currency',
    detail: 'Every beam step, attention head, or GNN hop spends milliseconds. Budget them like cash across components.',
  },
]

const howItWorks = [
  {
    step: '1. Frame the task and constraints',
    detail: 'Define states, actions, and rewards or labels. Set latency/throughput budgets for both training and serving.',
  },
  {
    step: '2. Build and validate data',
    detail:
      'Collect and clean; split by time or entity; add schema checks; synthesize negatives where needed; log coverage of edge cases.',
  },
  {
    step: '3. Choose search or model family',
    detail:
      'Select heuristic search (A*/MCTS) for explicit combinatorics; transformers or GNNs when structure and pattern learning dominate.',
  },
  {
    step: '4. Train with stability tools',
    detail: 'Use sane optimizers, clipping, and normalization; checkpoint weights and RNG; monitor loss spikes and gradient norms.',
  },
  {
    step: '5. Evaluate with realistic metrics',
    detail: 'Calibrate scores; run adversarial or long-tail tests; for planners, measure plan cost and wall-clock under budget.',
  },
  {
    step: '6. Serve with guardrails',
    detail:
      'Add canaries, rate limits, and fallback paths; log inputs/outputs; retrain or adapt on drift with eval gates.',
  },
]

const complexityTable = [
  { approach: 'BFS/DFS', time: 'O(V + E)', space: 'O(V)', note: 'Deterministic exploration; baseline for small graphs.' },
  { approach: 'A* with binary heap', time: 'O(E log V)', space: 'O(V)', note: 'Optimal if heuristic is admissible and consistent.' },
  { approach: 'Beam search (beam b, depth d)', time: 'O(b * d)', space: 'O(b * d)', note: 'Non-optimal but controllable latency.' },
  { approach: 'MCTS (iterations n)', time: 'O(n)', space: 'O(n)', note: 'Quality rises with rollouts; parallelizable with care.' },
  { approach: 'GNN message passing (L layers)', time: 'O(L * E)', space: 'O(L * (V + E))', note: 'Neighbor sampling reduces effective E.' },
  { approach: 'Transformer attention (seq L)', time: 'O(L^2 * d)', space: 'O(L^2)', note: 'Linear/flash variants cut constants or asymptotics.' },
]

const applications = [
  {
    title: 'Game-playing agents (AlphaGo, MuZero)',
    detail:
      'Learned value/policy networks guide MCTS, shrinking search trees while keeping strong play under fixed time per move.',
  },
  {
    title: 'Recommendation and ranking',
    detail:
      'Two-stage retrieval + rankers blend embeddings with calibrated scores; search prunes candidates, models personalize ordering.',
  },
  {
    title: 'Route planning and logistics',
    detail:
      'A* with learned heuristics or oracles accelerates multi-stop routing; constraints handled via penalties or SAT hybrids.',
  },
  {
    title: 'Code and text generation',
    detail:
      'Beam or nucleus decoding with constrained tokens enforces syntax; retrieval-augmented prompts ground outputs.',
  },
  {
    title: 'Graph anomaly and fraud detection',
    detail:
      'GNNs propagate risk across relations; neighbor sampling keeps inference feasible on millions of edges with low latency.',
  },
]

const failureCallout = {
  title: 'Failure story: silent leakage',
  detail:
    'A ranking model trained with random splits leaked user future clicks into train. Offline AUC soared, but launch tanked conversions. Fix: time-based splits, feature-level lineage checks, and pre-launch replay tests.',
}

const pitfalls = [
  'Admissibility violated by over-optimistic heuristics makes A* non-optimal; align heuristic with true cost.',
  'Beam search without coverage penalties collapses to short outputs; add length/coverage controls.',
  'Feature leakage via random splits inflates offline metrics; prefer time or entity disjoint splits.',
  'GNN over-smoothing after many layers erases signal; use residuals, normalization, and neighbor sampling.',
  'Unbounded decoding or search ignores latency budgets; cap iterations and add early-stopping criteria.',
]

const whenToUse = [
  'Use A* or IDA* when optimality matters and heuristics exist (navigation, puzzle solvers).',
  'Use MCTS when the model is uncertain and stochastic rollouts capture value (games, planners).',
  'Use beam or constrained decoding when structure or syntax must be respected (code, SQL, configs).',
  'Use GNNs when relationships carry the signal (fraud graphs, molecular property prediction).',
  'Use transformers when long-range sequence dependencies dominate (language, logs, audio).',
]

const advanced = [
  {
    title: 'Learned heuristics',
    detail: 'Train value networks or cost models to guide A* or MCTS; watch for optimism that breaks admissibility.',
  },
  {
    title: 'Retrieval-augmented models',
    detail: 'Ground generations with nearest neighbors; improves factuality without re-training huge models.',
  },
  {
    title: 'Mixture-of-experts',
    detail: 'Route tokens or nodes to specialized experts to scale parameters while capping latency via sparse activation.',
  },
  {
    title: 'Constraint-aware decoding',
    detail: 'Finite-state machines or token masks enforce hard rules during generation; reduces invalid outputs.',
  },
  {
    title: 'Hardware-aware distillation',
    detail: 'Quantize and distill models to fit edge or real-time serving budgets; calibrate to maintain accuracy.',
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
      const lengthPenalty = Math.pow((5 + len) / 6, alpha) // encourages longer, complete outputs
      c.score = c.score / lengthPenalty
    }
    candidates.sort((a, b) => b.score - a.score)
    beams = candidates.slice(0, beamSize)
  }
  return beams
}`,
    explanation:
      'Applies a length penalty to avoid short, high-probability outputs. In practice, add masking for invalid tokens and batched scoring.',
  },
  {
    title: 'GNN message passing (one layer)',
    code: `type Graph = { edges: Array<[number, number]>; features: number[][] }

function messagePass(graph: Graph, weight: number[][], aggregate: (msgs: number[][]) => number[]) {
  const msgs: number[][][] = Array.from({ length: graph.features.length }, () => [])

  for (const [u, v] of graph.edges) {
    const h = graph.features[u]
    const m = matVec(weight, h) // linear transform
    msgs[v].push(m)
  }

  const updated = msgs.map((neighborMsgs, i) => {
    const agg = aggregate(neighborMsgs.length ? neighborMsgs : [[0]])
    return add(agg, graph.features[i]) // residual connection to fight over-smoothing
  })

  return { ...graph, features: updated }
}`,
    explanation:
      'Aggregates neighbor messages then adds a residual for stability. Real systems normalize by degree and batch edges to fit accelerator memory.',
  },
]

const keyTakeaways = [
  'Heuristics and representations decide whether search is feasible under real budgets.',
  'Splits, logging, and checkpoints are as critical as the model choice.',
  'Latency must be budgeted across search steps, model calls, and safety checks.',
  'Guardrails and rollback plans keep launches safe despite drift.',
  'Profile and cap work: beams, rollouts, neighbor hops, and attention lengths.',
]

export default function AIMLPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">AI & ML (Search, GNNs, etc.)</span>
          <div className="win95-title-controls">
            <button className="win95-control" aria-label="Close window">
              X
            </button>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Search meets learning</div>
              <p className="win95-text">
                Blend combinatorial search with learned guidance. Reliable systems hinge on data hygiene, resource-aware loops, and
                guardrails from training through serving.
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
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Core pillars and mental hooks</legend>
            <div className="win95-row">
              <div className="win95-stack">
                {pillars.map((pillar) => (
                  <div key={pillar.title} className="win95-panel">
                    <div className="win95-heading">{pillar.title}</div>
                    <p className="win95-text">{pillar.detail}</p>
                  </div>
                ))}
              </div>
              <div className="win95-stack">
                {mentalModels.map((model) => (
                  <div key={model.title} className="win95-panel">
                    <div className="win95-heading">{model.title}</div>
                    <p className="win95-text">{model.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works</legend>
            <div className="win95-grid win95-grid-2">
              {howItWorks.map((item) => (
                <div key={item.step} className="win95-panel">
                  <div className="win95-heading">{item.step}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity reference</legend>
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
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Applications</legend>
            <div className="win95-grid win95-grid-2">
              {applications.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <div className="win95-heading">{failureCallout.title}</div>
              <p className="win95-text">{failureCallout.detail}</p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Pitfalls</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {pitfalls.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>When to use what</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {whenToUse.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Advanced moves</legend>
            <div className="win95-grid win95-grid-2">
              {advanced.map((item) => (
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
            <div className="win95-panel">
              <ul className="win95-list">
                {keyTakeaways.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}
