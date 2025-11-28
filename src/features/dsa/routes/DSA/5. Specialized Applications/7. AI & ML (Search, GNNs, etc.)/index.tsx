import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const searchAndPlanning = [
  {
    title: 'Heuristic/graph search',
    detail:
      'A* and IDA* stay optimal with admissible, consistent heuristics. Use transposition tables and pruning to cut duplicate work on large graphs.',
  },
  {
    title: 'Monte Carlo Tree Search',
    detail:
      'UCT balances exploration and exploitation; progressive widening handles huge branching factors. Rollouts can be learned policies for stronger playouts.',
  },
  {
    title: 'Beam and constrained decoding',
    detail:
      'Beam search with length/coverage penalties curbs short outputs. Add diverse beams or nucleus sampling for variety; enforce constraints for structured text.',
  },
  {
    title: 'Constraint/SAT/SMT hybrids',
    detail:
      'Encode hard rules and let the solver prune infeasible states. Combine with heuristic search or LP relaxations for scheduling and allocation tasks.',
  },
]

const learningBlocks = [
  {
    title: 'Optimization and stability',
    detail:
      'AdamW or Lion with warmup and cosine decay; keep gradient clipping and EMA for stability. Monitor loss spikes and NaNs early in training.',
  },
  {
    title: 'Representation and self-supervision',
    detail:
      'Contrastive losses (InfoNCE/SimCLR) and masked prediction (MAE/BERT) learn reusable features. Strong augmentations and queue/buffer tuning matter.',
  },
  {
    title: 'Graph neural networks',
    detail:
      'Message passing (GCN/GAT/GraphSAGE) aggregates neighbor signals; add residuals and normalization to fight over-smoothing. Sample neighbors for scale.',
  },
  {
    title: 'Sequence models',
    detail:
      'Transformers with causal or bidirectional masks; use RoPE/ALiBi for long context. Flash attention and checkpointing reduce memory footprint.',
  },
]

const playbooks = [
  {
    title: 'Shipping a ranking/recommendation model',
    steps: [
      'Define offline metrics that correlate with business goals; guard with holdout splits by user/time.',
      'Log rich features and context; bucketize IDs; add popularity and recency priors to fight cold start.',
      'Serve with a two-stage stack (recall + rank); cache top candidates; run A/B with guardrail metrics.',
    ],
  },
  {
    title: 'Reliable training loops',
    steps: [
      'Deterministic seeds and versioned configs; checkpoint weights, optimizer state, and RNG.',
      'Track learning rate, loss, grad norms; alert on divergence or saturating activations.',
      'Profile input pipeline; keep GPUs fed with prefetch, mixed precision, and dataset caching.',
    ],
  },
  {
    title: 'Graph ML rollout',
    steps: [
      'Build scalable neighbor sampling (importance or layer-wise) and cache frequent subgraphs.',
      'Normalize features per type; handle hetero graphs with typed relations and aggregators.',
      'Evaluate with realistic negative sampling; test sensitivity to graph sparsity and churn.',
    ],
  },
  {
    title: 'RL experiment hygiene',
    steps: [
      'Separate actor/learner; use replay buffers with prioritization and target networks for stability.',
      'Reward shaping with unit tests; clip or normalize rewards to control variance.',
      'Benchmark on simple envs first; compare to strong baselines and random policies.',
    ],
  },
]

const guardrails = [
  'Prevent data leakage with time-based or entity-based splits; freeze test sets.',
  'Log model inputs/outputs for debuggability; add feature hashing bounds to avoid blowups.',
  'Monitor drift and calibration; retrain or fine-tune on rolling windows with eval gates.',
  'Use reproducible seeds and deterministic ops when comparing runs; track exact checkpoints and code revs.',
  'Fail fast on silent errors: NaNs, exploding norms, or collapsed beams should trigger alerts and retries.',
]

export default function AIMLPage(): JSX.Element {
  return (
    <TopicLayout
      title="AI & ML (Search, GNNs, etc.)"
      subtitle="Structures for intelligent systems"
      intro="Pair search and learning: informed exploration, robust training loops, and production guardrails keep intelligent systems reliable."
    >
      <TopicSection heading="Search and planning toolkit">
        <div className="grid gap-3 md:grid-cols-2">
          {searchAndPlanning.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold leading-tight text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Learning building blocks">
        <div className="grid gap-3 md:grid-cols-2">
          {learningBlocks.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Operational playbooks">
        <div className="grid gap-3 md:grid-cols-2">
          {playbooks.map((play) => (
            <article key={play.title} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{play.title}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/80">
                {play.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Safety checklist">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/90">
          {guardrails.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </TopicSection>
    </TopicLayout>
  )
}
