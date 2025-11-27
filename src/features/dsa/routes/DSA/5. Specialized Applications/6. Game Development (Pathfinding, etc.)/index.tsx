import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const pathfinding = [
  {
    title: 'A* search',
    detail:
      'Optimal with an admissible heuristic; consistent heuristics keep the open set monotonic. Tune tie-breaking and neighbor ordering to reduce path wobble.',
  },
  {
    title: 'Dijkstra & variants',
    detail:
      'Great for weighted graphs without heuristics. Use a binary heap for sparse maps; bucketed queues (Dial) shine when edge weights are small integers.',
  },
  {
    title: 'Jump Point Search',
    detail:
      'Prunes symmetrical moves on uniform-cost grids by jumping between turning points. Dramatically cuts nodes expanded for large tile maps.',
  },
  {
    title: 'Navigation meshes',
    detail:
      'Polygon-based navmeshes avoid grid aliasing and produce smooth paths. Use funnel algorithm for corridor smoothing after A* over the mesh graph.',
  },
  {
    title: 'Hierarchical pathfinding (HPA*)',
    detail:
      'Cluster maps into regions, precompute entrances, and search coarsely before refining locally. Reduces latency on huge worlds with reuse across queries.',
  },
]

const movement = [
  {
    title: 'Steering behaviors',
    detail:
      'Seek, flee, arrive, wander; blend with weights for nuanced motion. Clamp acceleration/velocity for stability and frame-rate independence.',
  },
  {
    title: 'Crowd avoidance',
    detail:
      'Reciprocal Velocity Obstacles (RVO/ORCA) compute collision-free velocities for many agents. Use prediction windows and cap neighbor checks per frame.',
  },
  {
    title: 'Flocking',
    detail:
      'Boids rules (separation, alignment, cohesion) create emergent groups. Spatial partitioning (grid/tree) keeps neighbor queries cheap.',
  },
  {
    title: 'Physics integration',
    detail:
      'Semi-implicit Euler for speed; RK4 for accuracy. Keep fixed timesteps for determinism; cap substeps to avoid spiral of death.',
  },
]

const playbooks = [
  {
    title: 'Shipping a pathfinder',
    steps: [
      'Precompute nav data (navmesh, portals) offline; bake obstacle info and height data.',
      'Use A* with a heuristic tuned to your movement model; smooth with funnel or spline.',
      'Cache recent paths and reuse partial routes; replan lazily when obstacles move.',
    ],
  },
  {
    title: 'Scalable crowds',
    steps: [
      'Partition space (uniform grid/quadtree) to query nearby agents quickly.',
      'Update steering in batches and cull distant interactions; limit neighbors per agent.',
      'Blend high-level path (A*) with local avoidance (RVO/steering) to stay responsive.',
    ],
  },
  {
    title: 'Dynamic worlds',
    steps: [
      'Maintain obstacle grids/navmesh tiles; mark dirty regions and re-bake asynchronously.',
      'Use incremental search (D* Lite / LPA*) to reuse previous computation after changes.',
      'Fallback to conservative paths when data is stale; keep agents from dead-ends with local detours.',
    ],
  },
  {
    title: 'Physics-aware movement',
    steps: [
      'Align path nodes with physics colliders; avoid tunneling with continuous collision where needed.',
      'Cap acceleration/turn rates; prefer steering forces over teleporting heading changes.',
      'Keep simulation in fixed timesteps; interpolate visuals to stay smooth at variable frame rates.',
    ],
  },
]

const guardrails = [
  'Decouple rendering from simulation; use fixed delta for logic to stay deterministic.',
  'Avoid per-frame allocations in hot loops; reuse buffers and priority queues.',
  'Instrument expansions, heap ops, and neighbor counts; tune heuristics with data.',
  'Cap search breadth per frame for real-time constraints; degrade gracefully with partial paths.',
  'Test corner cases: tight corridors, dynamic obstacles, and large-agent collisions.',
]

export default function GameDevelopmentPathfindingPage(): JSX.Element {
  return (
    <TopicLayout
      title="Game Development (Pathfinding, etc.)"
      subtitle="Interactivity powered by algorithms"
      intro="Pathfinding and movement turn game worlds into responsive spaces. Combine global search with local steering, and keep simulation deterministic under load."
    >
      <TopicSection heading="Pathfinding toolkit">
        <div className="grid gap-3 md:grid-cols-2">
          {pathfinding.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold leading-tight text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Movement and crowds">
        <div className="grid gap-3 md:grid-cols-2">
          {movement.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Production playbooks">
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

      <TopicSection heading="Reliability checklist">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/90">
          {guardrails.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </TopicSection>
    </TopicLayout>
  )
}
