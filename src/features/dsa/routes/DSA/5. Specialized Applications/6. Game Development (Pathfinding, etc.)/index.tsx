import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'
import type { JSX } from 'react'


const bigPicture = [
  {
    title: 'Navigation is player freedom',
    detail: 'Pathfinding turns authored geometry into explorable space for players and NPCs.',
    note: 'Reliable traversal saves designers from fragile waypoint scripts.',
  },
  {
    title: 'Global plan, local feel',
    detail: 'Long-range planning guides intent; steering handles crowds, doors, and micro-collisions.',
    note: 'The split keeps motion responsive under tight frame budgets.',
  },
  {
    title: 'Latency is a budget',
    detail: 'Search and steering must fit within a few milliseconds per frame.',
    note: 'Expensive work moves to offline baking or async jobs.',
  },
  {
    title: 'Scale changes everything',
    detail: 'Single-agent optimality gives way to batched or approximate flows for large crowds.',
    note: 'The right abstraction keeps cost predictable as populations grow.',
  },
]

const history = [
  {
    title: '1968: A* formalized',
    detail: 'Admissible heuristics enable optimal shortest-path search with pruning.',
    note: 'The workhorse of game navigation for decades.',
  },
  {
    title: '1987: Boids flocking',
    detail: 'Local steering rules produce lifelike motion without global planning.',
    note: 'Influenced modern crowd systems.',
  },
  {
    title: '2004: HPA*',
    detail: 'Hierarchical abstractions cut search latency on large maps.',
    note: 'Made open-world and RTS pathfinding feasible.',
  },
  {
    title: '2008: ORCA',
    detail: 'Reciprocal velocity obstacles improve dense crowd stability.',
    note: 'Distributed responsibility prevents deadlocks.',
  },
  {
    title: '2012+: Navmesh standardization',
    detail: 'Engine toolchains embed tiled navmeshes and off-mesh links.',
    note: 'Navigation becomes a default pipeline step.',
  },
]

const pillars = [
  {
    title: 'Deterministic simulation',
    detail: 'Fixed timesteps and consistent math keep multiplayer and replays in sync.',
  },
  {
    title: 'Heuristic alignment',
    detail: 'Heuristics must match movement metrics to avoid wobble or wasted expansions.',
  },
  {
    title: 'Spatial acceleration',
    detail: 'Grids, quadtrees, BVH, or navmesh tiles make queries fast and predictable.',
  },
  {
    title: 'Dynamic updates',
    detail: 'Incremental planners and tiled rebuilds handle doors, debris, and moving platforms.',
  },
  {
    title: 'Animation constraints',
    detail: 'Navigation respects collider size, step height, and turn radius.',
  },
]

const mentalModels = [
  {
    title: 'Atlas vs lane keeping',
    detail: 'Global path is the atlas; steering is lane keeping for local obstacles and crowds.',
  },
  {
    title: 'Water and culverts',
    detail: 'Crowds flow along fields; chokepoints are culverts that must be sized and monitored.',
  },
  {
    title: 'Muscle memory',
    detail: 'Cached corridors speed repeated routes; relearn only when geometry changes.',
  },
  {
    title: 'Attention budget',
    detail: 'Agents spend CPU like attention: rare global planning, constant local checks.',
  },
]

const howItWorks = [
  {
    title: 'Build navigation data',
    detail: 'Extract navmesh or grid walkables; add off-mesh links for jumps, ladders, doors.',
  },
  {
    title: 'Choose resolution',
    detail: 'Pick cell size or polygon granularity based on agent radius and map scale.',
  },
  {
    title: 'Plan globally',
    detail: 'Run A* (or HPA*/JPS) with a consistent heuristic; time-slice to fit frame budget.',
  },
  {
    title: 'Smooth paths',
    detail: 'Apply funnel/string-pulling; add look-ahead points to reduce jitter.',
  },
  {
    title: 'Layer local avoidance',
    detail: 'Blend steering or ORCA with the global path; cap neighbor checks.',
  },
  {
    title: 'Handle changes',
    detail: 'Use incremental search or tile rebuilds; fall back to conservative paths on stale data.',
  },
  {
    title: 'Observe and tune',
    detail: 'Profile expansions, avoidance cost, and p95 navigation time per frame.',
  },
]

const navmeshAnatomy = [
  {
    title: 'Walkable polygons',
    detail: 'Surface decomposition with height and slope rules for agents.',
  },
  {
    title: 'Portals and edges',
    detail: 'Adjacency graph for A*; portals define corridor boundaries.',
  },
  {
    title: 'Off-mesh links',
    detail: 'Explicit jumps, ladders, doors, and scripted transitions.',
  },
  {
    title: 'Tiled streaming',
    detail: 'Chunks load and unload as players move to bound memory.',
  },
  {
    title: 'Area costs',
    detail: 'Weighted regions bias toward roads, away from hazards or stealth zones.',
  },
  {
    title: 'Obstacle carving',
    detail: 'Dynamic agents or blockers carve local holes in the mesh.',
  },
]

const gridAnatomy = [
  {
    title: 'Cell occupancy',
    detail: 'Binary or weighted cells define walkable and cost surfaces.',
  },
  {
    title: 'Neighborhood model',
    detail: '4-way or 8-way movement changes heuristic choice.',
  },
  {
    title: 'Jump point pruning',
    detail: 'Uniform grids can skip symmetric expansions for speed.',
  },
  {
    title: 'Cost layers',
    detail: 'Terrain costs, threat fields, or visibility penalties per cell.',
  },
  {
    title: 'Flow fields',
    detail: 'Precompute gradients for many agents sharing a goal.',
  },
  {
    title: 'Dynamic grids',
    detail: 'Incremental updates keep grids viable for destructible maps.',
  },
]

const steeringAnatomy = [
  {
    title: 'Velocity obstacles',
    detail: 'Predict collisions in velocity space and choose safe velocities.',
  },
  {
    title: 'Separation/alignment/cohesion',
    detail: 'Boids-style forces create lifelike crowds with minimal global data.',
  },
  {
    title: 'Look-ahead',
    detail: 'Short-horizon predictions reduce jitter near corners.',
  },
  {
    title: 'Priority and yield',
    detail: 'Rules prevent deadlocks at narrow doors or bridges.',
  },
  {
    title: 'Animation blending',
    detail: 'Steering outputs match animation speed and turn limits.',
  },
  {
    title: 'Caps and budgets',
    detail: 'Neighbor count and horizon length are capped for performance.',
  },
]

const tradeoffMatrix = [
  {
    dimension: 'Search optimality',
    exact: 'A* with admissible heuristics gives optimal paths.',
    approximate: 'HPA*, flow fields, and smoothing trade optimality for speed.',
  },
  {
    dimension: 'Authoring cost',
    exact: 'Grid or simple navmesh is quick to generate.',
    approximate: 'Hand-authored links and weights improve believability.',
  },
  {
    dimension: 'Runtime budget',
    exact: 'Higher CPU for many agents or large maps.',
    approximate: 'Lower CPU with caching and hierarchical planning.',
  },
  {
    dimension: 'Dynamic obstacles',
    exact: 'Incremental planners handle changes but are costly.',
    approximate: 'Local avoidance is cheaper but not globally optimal.',
  },
  {
    dimension: 'Multiplayer determinism',
    exact: 'Deterministic math and fixed steps required.',
    approximate: 'Floating-point drift causes desync.',
  },
  {
    dimension: 'Crowd realism',
    exact: 'Precise collision avoidance can look robotic.',
    approximate: 'Steering adds natural motion but can jitter without smoothing.',
  },
]

const complexityTable = [
  {
    approach: 'Grid A* (binary heap)',
    time: 'O(E log V)',
    space: 'O(V)',
    note: 'Baseline for tile maps; tie-breaking affects path quality.',
  },
  {
    approach: 'Jump Point Search',
    time: '~O(k log V)',
    space: 'O(V)',
    note: 'Prunes symmetric expansions on uniform grids.',
  },
  {
    approach: 'Navmesh A* + funnel',
    time: 'O(F log F)',
    space: 'O(F)',
    note: 'F = faces; fewer nodes and smoother paths.',
  },
  {
    approach: 'HPA*',
    time: 'O(E log V) at top + locals',
    space: 'O(V) + portals',
    note: 'Great for repeated long routes.',
  },
  {
    approach: 'D* Lite / LPA*',
    time: 'O(E log V) worst-case',
    space: 'O(V)',
    note: 'Reuses prior search when graph changes.',
  },
  {
    approach: 'ORCA (per agent)',
    time: 'O(n log n)',
    space: 'O(n)',
    note: 'n = neighbors; cap for frame budgets.',
  },
]

const applications = [
  {
    title: 'Open-world NPCs',
    detail: 'Tiled navmeshes and streamed regions keep memory bounded as players roam.',
    note: 'Off-mesh links handle ladders, jumps, and scripted traversal.',
  },
  {
    title: 'RTS squads',
    detail: 'Hierarchical planning plus flow fields keeps armies cohesive.',
    note: 'Local steering prevents clumping at choke points.',
  },
  {
    title: 'Competitive shooters',
    detail: 'Deterministic A* and cover nodes preserve fairness and replay fidelity.',
    note: 'Server authority avoids client-side exploits.',
  },
  {
    title: 'Racing lines',
    detail: 'Spline-based paths with curvature costs produce smooth driving.',
    note: 'Precomputed lines feed AI and ghost replays.',
  },
]

const failureStory =
  'A live event added destructible bridges but navmesh tiles were not marked dirty. NPC caravans piled up and blocked players for an hour. Fixes: instrument off-mesh links, rebuild tiles on structural changes, and keep a conservative fallback path.'

const pitfalls = [
  {
    title: 'Stale nav data',
    detail: 'Moving platforms and doors must mark tiles dirty for rebuilds.',
  },
  {
    title: 'Heuristic mismatch',
    detail: 'Using Manhattan on 8-way grids increases expansions and path wobble.',
  },
  {
    title: 'Unbounded neighbors',
    detail: 'Local avoidance can tank frame rate in dense crowds.',
  },
  {
    title: 'Corner clipping',
    detail: 'Smoothing that ignores collider radius cuts into walls.',
  },
  {
    title: 'Replan thrashing',
    detail: 'Replanning every frame destroys cache benefits and spikes CPU.',
  },
  {
    title: 'Off-mesh deadlocks',
    detail: 'Two-way links without priority rules can jam narrow passages.',
  },
]

const whenToUse = [
  {
    title: 'Navmesh A*',
    detail: 'Best for 3D spaces with ramps, stairs, and irregular obstacles.',
  },
  {
    title: 'Grid A* / JPS',
    detail: 'Best for tile maps or puzzle games where clarity beats smoothness.',
  },
  {
    title: 'HPA* / cached corridors',
    detail: 'Use for many agents on large maps with repeated queries.',
  },
  {
    title: 'D* Lite / incremental',
    detail: 'Use when obstacles move mid-session but geometry is mostly stable.',
  },
  {
    title: 'Flow fields',
    detail: 'Use for large crowds sharing a common goal.',
  },
  {
    title: 'Pure steering',
    detail: 'Use for ambient crowds where local motion matters more than exact paths.',
  },
]

const advanced = [
  {
    title: 'Bidirectional A*',
    detail: 'Cuts search depth on long routes; watch asymmetric costs.',
    note: 'Needs careful meeting criteria on weighted graphs.',
  },
  {
    title: 'Any-angle planners',
    detail: 'Theta* and Field D* reduce grid cornering without full navmesh authoring.',
    note: 'Improves smoothness on tile maps.',
  },
  {
    title: 'GPU pathfinding',
    detail: 'Batch searches or jump flooding on GPU for massive crowds.',
    note: 'Great for RTS or simulation-heavy scenes.',
  },
  {
    title: 'Hierarchical flow fields',
    detail: 'Coarse global flow with local refinement for swarms.',
    note: 'Balances speed and responsiveness.',
  },
  {
    title: 'Async navmesh tiling',
    detail: 'Rebuild tiles off the game thread and stream updates to agents.',
    note: 'Avoids frame spikes during level edits.',
  },
  {
    title: 'Dynamic cost layers',
    detail: 'Threat, visibility, and sound cost layers drive stealth or cover behavior.',
    note: 'Lets AI express intent beyond shortest distance.',
  },
]

const tuningChecklist = [
  {
    title: 'Cell/triangle size',
    detail: 'Align with smallest agent radius and animation step height.',
  },
  {
    title: 'Heuristic scale',
    detail: 'Match movement metric (octile for 8-way, Euclidean for navmesh).',
  },
  {
    title: 'Node expansion budget',
    detail: 'Cap expansions per frame and time-slice searches.',
  },
  {
    title: 'Neighbor caps',
    detail: 'Limit ORCA or steering neighbors to keep frame rate stable.',
  },
  {
    title: 'Cache lifetimes',
    detail: 'Reuse paths until blocked; invalidate on tile updates.',
  },
  {
    title: 'Off-mesh priorities',
    detail: 'Set rules for ladders, doors, and bridges to avoid jams.',
  },
]

const observability = [
  {
    title: 'Search time',
    detail: 'Track p95/p99 path query time and expansions per request.',
  },
  {
    title: 'Navmesh health',
    detail: 'Monitor dirty tile rebuild rates and missing link errors.',
  },
  {
    title: 'Crowd stability',
    detail: 'Log deadlocks, oscillations, and avoidance failures.',
  },
  {
    title: 'Cache effectiveness',
    detail: 'Measure reuse rate of cached corridors or portals.',
  },
  {
    title: 'Frame spikes',
    detail: 'Track time spent in navigation vs render/physics.',
  },
  {
    title: 'Stuck agent rate',
    detail: 'Detect agents with zero progress over a window.',
  },
]

const codeExamples = [
  {
    title: 'Grid A* with octile heuristic',
    code: `type Node = { x: number; y: number; g: number; f: number; parent?: Node }

const octile = (a: Node, b: Node) => {
  const dx = Math.abs(a.x - b.x)
  const dy = Math.abs(a.y - b.y)
  const D = 1
  const D2 = Math.SQRT2
  return D * (dx + dy) + (D2 - 2 * D) * Math.min(dx, dy)
}

function aStar(start: Node, goal: Node, walkable: (x: number, y: number) => boolean) {
  const open: Node[] = [start]
  const closed = new Set<string>()
  const key = (n: Node) => \`\${n.x},\${n.y}\`
  start.g = 0
  start.f = octile(start, goal)

  while (open.length) {
    open.sort((a, b) => a.f - b.f)
    const current = open.shift()!
    if (current.x === goal.x && current.y === goal.y) return current

    closed.add(key(current))
    for (const [nx, ny] of neighbors(current.x, current.y)) {
      if (!walkable(nx, ny)) continue
      const g = current.g + cost(current, nx, ny)
      const neighbor: Node = { x: nx, y: ny, g, f: g + octile({ x: nx, y: ny, g: 0, f: 0 }, goal), parent: current }
      if (closed.has(key(neighbor))) continue
      const existing = open.find((n) => n.x === nx && n.y === ny)
      if (!existing || g < existing.g) open.push(neighbor)
    }
  }
  return undefined
}`,
    explanation: 'Octile distance matches 8-way movement; replace the sort with a heap in production.',
  },
  {
    title: 'Navmesh funnel (sketch)',
    code: `type Portal = { left: [number, number]; right: [number, number] }

function funnel(portals: Portal[]) {
  const path: [number, number][] = []
  let apex = portals[0].left
  let left = portals[0].left
  let right = portals[0].right
  path.push(apex)

  for (let i = 1; i < portals.length; i++) {
    const p = portals[i]
    if (triarea2(apex, right, p.right) <= 0) right = p.right
    if (triarea2(apex, left, p.left) >= 0) left = p.left
    if (triarea2(apex, right, left) < 0) {
      apex = right
      path.push(apex)
      left = apex
      right = apex
    }
  }
  path.push(portals[portals.length - 1].left)
  return path
}`,
    explanation: 'Funnel/string-pulling converts corridor portals into smooth paths.',
  },
  {
    title: 'Steering with capped neighbors',
    code: `type Agent = { pos: [number, number]; vel: [number, number] }

function steer(agent: Agent, neighbors: Agent[], maxNeighbors = 12) {
  const nearby = neighbors.slice(0, maxNeighbors)
  let sep: [number, number] = [0, 0]
  for (const n of nearby) {
    const dx = agent.pos[0] - n.pos[0]
    const dy = agent.pos[1] - n.pos[1]
    const d2 = dx * dx + dy * dy + 1e-5
    sep = [sep[0] + dx / d2, sep[1] + dy / d2]
  }
  return normalize(sep)
}`,
    explanation: 'Capping neighbors keeps CPU predictable; combine with alignment/cohesion for crowd motion.',
  },
]

const keyTakeaways = [
  {
    title: 'Keep nav data fresh',
    detail: 'Dirty tiles and incremental rebuilds prevent agents walking into voids.',
  },
  {
    title: 'Match heuristic to physics',
    detail: 'Movement costs and heuristics must align to avoid wobble and wasted work.',
  },
  {
    title: 'Budget per frame',
    detail: 'Time-slice searches and cap neighbors to avoid spikes.',
  },
  {
    title: 'Cache aggressively',
    detail: 'Reuse corridors and portal legs; rebuild only when needed.',
  },
]

export default function GameDevelopmentPathfindingPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Game Development (Pathfinding, etc.)</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Interactivity powered by navigation and motion</div>
              <p className="win95-text">
                From tile puzzles to open worlds, navigation blends global planning with local steering under tight frame budgets.
                The best systems keep paths stable, motion natural, and performance predictable.
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
            <legend>Navmesh anatomy</legend>
            <div className="win95-grid win95-grid-2">
              {navmeshAnatomy.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Grid anatomy</legend>
            <div className="win95-grid win95-grid-2">
              {gridAnatomy.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Steering anatomy</legend>
            <div className="win95-grid win95-grid-2">
              {steeringAnatomy.map((item) => (
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
                    <th>Exact/optimal</th>
                    <th>Approximate/fast</th>
                  </tr>
                </thead>
                <tbody>
                  {tradeoffMatrix.map((row) => (
                    <tr key={row.dimension}>
                      <td>{row.dimension}</td>
                      <td>{row.exact}</td>
                      <td>{row.approximate}</td>
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
