import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'
import type { JSX } from 'react'

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
    detail:
      'Offline metrics rarely match real users; guardrails, eval gates, and rollback stories are part of the algorithm.',
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
    detail:
      'Every beam step, attention head, or GNN hop spends milliseconds. Budget them like cash across components.',
  },
]

const howItWorks = [
  {
    step: '1. Frame the task and constraints',
    detail:
      'Define states, actions, and rewards or labels. Set latency/throughput budgets for both training and serving.',
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
    detail:
      'Use sane optimizers, clipping, and normalization; checkpoint weights and RNG; monitor loss spikes and gradient norms.',
  },
  {
    step: '5. Evaluate with realistic metrics',
    detail:
      'Calibrate scores; run adversarial or long-tail tests; for planners, measure plan cost and wall-clock under budget.',
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
    <TopicLayout
      title="AI & ML (Search, GNNs, etc.)"
      subtitle="Search meets learning"
      intro="Blend combinatorial search with learned guidance. Reliable systems hinge on data hygiene, resource-aware loops, and guardrails from training through serving."
    >
      <TopicSection heading="Big picture">
        <div className="grid gap-3 md:grid-cols-2">
          {bigPicture.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
              <p className="text-xs text-white/60">{item.note}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="History">
        <div className="grid gap-3 md:grid-cols-2">
          {history.map((event) => (
            <article key={event.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{event.title}</h3>
              <p className="text-sm text-white/80">{event.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Core pillars and mental hooks">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            {pillars.map((pillar) => (
              <article key={pillar.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h3 className="text-sm font-semibold text-white">{pillar.title}</h3>
                <p className="text-sm text-white/80">{pillar.detail}</p>
              </article>
            ))}
          </div>
          <div className="space-y-3">
            {mentalModels.map((model) => (
              <article key={model.title} className="rounded-lg bg-white/5 p-4">
                <h3 className="text-sm font-semibold text-white">{model.title}</h3>
                <p className="text-sm text-white/80">{model.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </TopicSection>

      <TopicSection heading="How it works">
        <div className="grid gap-3 md:grid-cols-2">
          {howItWorks.map((item) => (
            <article key={item.step} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/70">{item.step}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Complexity reference">
        <div className="overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full text-left text-sm text-white/80">
            <thead className="bg-white/10 text-xs uppercase tracking-wide text-white/70">
              <tr>
                <th className="px-4 py-2">Approach</th>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Space</th>
                <th className="px-4 py-2">Note</th>
              </tr>
            </thead>
            <tbody>
              {complexityTable.map((row) => (
                <tr key={row.approach} className="odd:bg-white/5">
                  <td className="px-4 py-2 font-semibold text-white">{row.approach}</td>
                  <td className="px-4 py-2">{row.time}</td>
                  <td className="px-4 py-2">{row.space}</td>
                  <td className="px-4 py-2 text-white/70">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TopicSection>

      <TopicSection heading="Applications">
        <div className="grid gap-3 md:grid-cols-2">
          {applications.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
        <div className="mt-4 rounded-lg border border-red-500/50 bg-red-500/10 p-4">
          <p className="text-sm font-semibold text-white">{failureCallout.title}</p>
          <p className="text-sm text-red-100">{failureCallout.detail}</p>
        </div>
      </TopicSection>

      <TopicSection heading="Pitfalls">
        <ul className="space-y-2 text-sm text-white/80">
          {pitfalls.map((item) => (
            <li key={item} className="rounded-lg bg-white/5 p-3">
              {item}
            </li>
          ))}
        </ul>
      </TopicSection>

      <TopicSection heading="When to use what">
        <ul className="space-y-2 text-sm text-white/80">
          {whenToUse.map((item) => (
            <li key={item} className="rounded-lg border border-white/10 bg-white/5 p-3">
              {item}
            </li>
          ))}
        </ul>
      </TopicSection>

      <TopicSection heading="Advanced moves">
        <div className="grid gap-3 md:grid-cols-2">
          {advanced.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Code examples">
        <div className="grid gap-3 md:grid-cols-2">
          {codeExamples.map((example) => (
            <article key={example.title} className="space-y-2 rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{example.title}</p>
              <pre className="overflow-x-auto rounded bg-black/40 p-3 text-xs text-white">
                <code>{example.code}</code>
              </pre>
              <p className="text-xs text-white/70">{example.explanation}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Key takeaways">
        <div className="grid gap-3 md:grid-cols-2">
          {keyTakeaways.map((item) => (
            <article key={item} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item}</p>
            </article>
          ))}
        </div>
      </TopicSection>
    </TopicLayout>
  )
}
