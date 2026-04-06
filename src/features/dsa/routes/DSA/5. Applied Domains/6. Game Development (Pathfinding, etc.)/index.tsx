import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

const bigPicture = [
  ['Navigation is player freedom', 'Pathfinding turns authored geometry into explorable space for players and NPCs.', 'Reliable traversal saves designers from fragile waypoint scripts.'],
  ['Global plan, local feel', 'Long-range planning guides intent; steering handles crowds, doors, and micro-collisions.', 'The split keeps motion responsive under tight frame budgets.'],
  ['Latency is a budget', 'Search and steering must fit within a few milliseconds per frame.', 'Expensive work moves to offline baking or async jobs.'],
  ['Scale changes everything', 'Single-agent optimality gives way to batched or approximate flows for large crowds.', 'The right abstraction keeps cost predictable as populations grow.'],
] as const

const history = [
  ['1968: A* formalized', 'Admissible heuristics enable optimal shortest-path search with pruning.', 'The workhorse of game navigation for decades.'],
  ['1987: Boids flocking', 'Local steering rules produce lifelike motion without global planning.', 'Influenced modern crowd systems.'],
  ['2004: HPA*', 'Hierarchical abstractions cut search latency on large maps.', 'Made open-world and RTS pathfinding feasible.'],
  ['2008: ORCA', 'Reciprocal velocity obstacles improve dense crowd stability.', 'Distributed responsibility prevents deadlocks.'],
  ['2012+: Navmesh standardization', 'Engine toolchains embed tiled navmeshes and off-mesh links.', 'Navigation becomes a default pipeline step.'],
] as const

const pillars = [
  ['Deterministic simulation', 'Fixed timesteps and consistent math keep multiplayer and replays in sync.'],
  ['Heuristic alignment', 'Heuristics must match movement metrics to avoid wobble or wasted expansions.'],
  ['Spatial acceleration', 'Grids, quadtrees, BVH, or navmesh tiles make queries fast and predictable.'],
  ['Dynamic updates', 'Incremental planners and tiled rebuilds handle doors, debris, and moving platforms.'],
  ['Animation constraints', 'Navigation respects collider size, step height, and turn radius.'],
] as const

const mentalModels = [
  ['Atlas vs lane keeping', 'Global path is the atlas; steering is lane keeping for local obstacles and crowds.'],
  ['Water and culverts', 'Crowds flow along fields; chokepoints are culverts that must be sized and monitored.'],
  ['Muscle memory', 'Cached corridors speed repeated routes; relearn only when geometry changes.'],
  ['Attention budget', 'Agents spend CPU like attention: rare global planning, constant local checks.'],
] as const

const howItWorks = [
  ['Build navigation data', 'Extract navmesh or grid walkables; add off-mesh links for jumps, ladders, doors.'],
  ['Choose resolution', 'Pick cell size or polygon granularity based on agent radius and map scale.'],
  ['Plan globally', 'Run A* (or HPA*/JPS) with a consistent heuristic; time-slice to fit frame budget.'],
  ['Smooth paths', 'Apply funnel/string-pulling; add look-ahead points to reduce jitter.'],
  ['Layer local avoidance', 'Blend steering or ORCA with the global path; cap neighbor checks.'],
  ['Handle changes', 'Use incremental search or tile rebuilds; fall back to conservative paths on stale data.'],
  ['Observe and tune', 'Profile expansions, avoidance cost, and p95 navigation time per frame.'],
] as const

const navmeshAnatomy = [
  ['Walkable polygons', 'Surface decomposition with height and slope rules for agents.'],
  ['Portals and edges', 'Adjacency graph for A*; portals define corridor boundaries.'],
  ['Off-mesh links', 'Explicit jumps, ladders, doors, and scripted transitions.'],
  ['Tiled streaming', 'Chunks load and unload as players move to bound memory.'],
  ['Area costs', 'Weighted regions bias toward roads, away from hazards or stealth zones.'],
  ['Obstacle carving', 'Dynamic agents or blockers carve local holes in the mesh.'],
] as const

const gridAnatomy = [
  ['Cell occupancy', 'Binary or weighted cells define walkable and cost surfaces.'],
  ['Neighborhood model', '4-way or 8-way movement changes heuristic choice.'],
  ['Jump point pruning', 'Uniform grids can skip symmetric expansions for speed.'],
  ['Cost layers', 'Terrain costs, threat fields, or visibility penalties per cell.'],
  ['Flow fields', 'Precompute gradients for many agents sharing a goal.'],
  ['Dynamic grids', 'Incremental updates keep grids viable for destructible maps.'],
] as const

const steeringAnatomy = [
  ['Velocity obstacles', 'Predict collisions in velocity space and choose safe velocities.'],
  ['Separation/alignment/cohesion', 'Boids-style forces create lifelike crowds with minimal global data.'],
  ['Look-ahead', 'Short-horizon predictions reduce jitter near corners.'],
  ['Priority and yield', 'Rules prevent deadlocks at narrow doors or bridges.'],
  ['Animation blending', 'Steering outputs match animation speed and turn limits.'],
  ['Caps and budgets', 'Neighbor count and horizon length are capped for performance.'],
] as const

const tradeoffMatrix = [
  ['Search optimality', 'A* with admissible heuristics gives optimal paths.', 'HPA*, flow fields, and smoothing trade optimality for speed.'],
  ['Authoring cost', 'Grid or simple navmesh is quick to generate.', 'Hand-authored links and weights improve believability.'],
  ['Runtime budget', 'Higher CPU for many agents or large maps.', 'Lower CPU with caching and hierarchical planning.'],
  ['Dynamic obstacles', 'Incremental planners handle changes but are costly.', 'Local avoidance is cheaper but not globally optimal.'],
  ['Multiplayer determinism', 'Deterministic math and fixed steps required.', 'Floating-point drift causes desync.'],
  ['Crowd realism', 'Precise collision avoidance can look robotic.', 'Steering adds natural motion but can jitter without smoothing.'],
] as const

const complexityTable = [
  ['Grid A* (binary heap)', 'O(E log V)', 'O(V)', 'Baseline for tile maps; tie-breaking affects path quality.'],
  ['Jump Point Search', '~O(k log V)', 'O(V)', 'Prunes symmetric expansions on uniform grids.'],
  ['Navmesh A* + funnel', 'O(F log F)', 'O(F)', 'F = faces; fewer nodes and smoother paths.'],
  ['HPA*', 'O(E log V) at top + locals', 'O(V) + portals', 'Great for repeated long routes.'],
  ['D* Lite / LPA*', 'O(E log V) worst-case', 'O(V)', 'Reuses prior search when graph changes.'],
  ['ORCA (per agent)', 'O(n log n)', 'O(n)', 'n = neighbors; cap for frame budgets.'],
] as const

const applications = [
  ['Open-world NPCs', 'Tiled navmeshes and streamed regions keep memory bounded as players roam.', 'Off-mesh links handle ladders, jumps, and scripted traversal.'],
  ['RTS squads', 'Hierarchical planning plus flow fields keeps armies cohesive.', 'Local steering prevents clumping at choke points.'],
  ['Competitive shooters', 'Deterministic A* and cover nodes preserve fairness and replay fidelity.', 'Server authority avoids client-side exploits.'],
  ['Racing lines', 'Spline-based paths with curvature costs produce smooth driving.', 'Precomputed lines feed AI and ghost replays.'],
] as const

const failureStory =
  'A live event added destructible bridges but navmesh tiles were not marked dirty. NPC caravans piled up and blocked players for an hour. Fixes: instrument off-mesh links, rebuild tiles on structural changes, and keep a conservative fallback path.'

const pitfalls = [
  ['Stale nav data', 'Moving platforms and doors must mark tiles dirty for rebuilds.'],
  ['Heuristic mismatch', 'Using Manhattan on 8-way grids increases expansions and path wobble.'],
  ['Unbounded neighbors', 'Local avoidance can tank frame rate in dense crowds.'],
  ['Corner clipping', 'Smoothing that ignores collider radius cuts into walls.'],
  ['Replan thrashing', 'Replanning every frame destroys cache benefits and spikes CPU.'],
  ['Off-mesh deadlocks', 'Two-way links without priority rules can jam narrow passages.'],
] as const

const whenToUse = [
  ['Navmesh A*', 'Best for 3D spaces with ramps, stairs, and irregular obstacles.'],
  ['Grid A* / JPS', 'Best for tile maps or puzzle games where clarity beats smoothness.'],
  ['HPA* / cached corridors', 'Use for many agents on large maps with repeated queries.'],
  ['D* Lite / incremental', 'Use when obstacles move mid-session but geometry is mostly stable.'],
  ['Flow fields', 'Use for large crowds sharing a common goal.'],
  ['Pure steering', 'Use for ambient crowds where local motion matters more than exact paths.'],
] as const

const advanced = [
  ['Bidirectional A*', 'Cuts search depth on long routes; watch asymmetric costs.', 'Needs careful meeting criteria on weighted graphs.'],
  ['Any-angle planners', 'Theta* and Field D* reduce grid cornering without full navmesh authoring.', 'Improves smoothness on tile maps.'],
  ['GPU pathfinding', 'Batch searches or jump flooding on GPU for massive crowds.', 'Great for RTS or simulation-heavy scenes.'],
  ['Hierarchical flow fields', 'Coarse global flow with local refinement for swarms.', 'Balances speed and responsiveness.'],
  ['Async navmesh tiling', 'Rebuild tiles off the game thread and stream updates to agents.', 'Avoids frame spikes during level edits.'],
  ['Dynamic cost layers', 'Threat, visibility, and sound cost layers drive stealth or cover behavior.', 'Lets AI express intent beyond shortest distance.'],
] as const

const tuningChecklist = [
  ['Cell/triangle size', 'Align with smallest agent radius and animation step height.'],
  ['Heuristic scale', 'Match movement metric (octile for 8-way, Euclidean for navmesh).'],
  ['Node expansion budget', 'Cap expansions per frame and time-slice searches.'],
  ['Neighbor caps', 'Limit ORCA or steering neighbors to keep frame rate stable.'],
  ['Cache lifetimes', 'Reuse paths until blocked; invalidate on tile updates.'],
  ['Off-mesh priorities', 'Set rules for ladders, doors, and bridges to avoid jams.'],
] as const

const observability = [
  ['Search time', 'Track p95/p99 path query time and expansions per request.'],
  ['Navmesh health', 'Monitor dirty tile rebuild rates and missing link errors.'],
  ['Crowd stability', 'Log deadlocks, oscillations, and avoidance failures.'],
  ['Cache effectiveness', 'Measure reuse rate of cached corridors or portals.'],
  ['Frame spikes', 'Track time spent in navigation vs render/physics.'],
  ['Stuck agent rate', 'Detect agents with zero progress over a window.'],
] as const

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
  ['Keep nav data fresh', 'Dirty tiles and incremental rebuilds prevent agents walking into voids.'],
  ['Match heuristic to physics', 'Movement costs and heuristics must align to avoid wobble and wasted work.'],
  ['Budget per frame', 'Time-slice searches and cap neighbors to avoid spikes.'],
  ['Cache aggressively', 'Reuse corridors and portal legs; rebuild only when needed.'],
] as const

const glossary = [
  ['Navmesh', 'Navigation mesh made of walkable polygons connected by adjacency edges and portals.'],
  ['Off-mesh link', 'Explicit traversal connection for jumps, ladders, doors, or scripted transitions.'],
  ['Funnel algorithm', 'String-pulling technique that smooths a portal corridor into a shorter path.'],
  ['HPA*', 'Hierarchical Pathfinding A* that reduces long-route search cost using abstractions.'],
  ['ORCA', 'Optimal Reciprocal Collision Avoidance method for local multi-agent steering.'],
  ['Flow field', 'Precomputed direction field that lets many agents move toward the same goal cheaply.'],
  ['Heuristic', 'Estimate of remaining path cost used by informed search algorithms like A*.'],
  ['Dirty tile', 'Navigation chunk marked for rebuild because geometry or traversal state changed.'],
] as const

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

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
    { id: 'core-navmesh', label: 'Navmesh Anatomy' },
    { id: 'core-grid', label: 'Grid Anatomy' },
    { id: 'core-steering', label: 'Steering Anatomy' },
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

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

const gameHelpStyles = `
.game-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.game-help-window {
  min-height: 100dvh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #c0c0c0;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  box-sizing: border-box;
}

.game-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 24px;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.game-help-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
}

.game-help-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.game-help-control {
  width: 18px;
  height: 16px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  text-decoration: none;
  font-size: 11px;
  line-height: 1;
  cursor: pointer;
}

.game-help-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
}

.game-help-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  color: #000;
  font-size: 12px;
  cursor: pointer;
}

.game-help-tab.active {
  position: relative;
  top: 1px;
  background: #fff;
}

.game-help-main {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  flex: 1;
  min-height: 0;
  border-top: 1px solid #404040;
  background: #fff;
}

.game-help-toc {
  overflow: auto;
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
}

.game-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.game-help-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.game-help-toc-list li {
  margin: 0 0 8px;
}

.game-help-toc-list a {
  color: #000;
  font-size: 12px;
  text-decoration: none;
}

.game-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.game-help-doc-title {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 700;
}

.game-help-intro {
  margin: 0 0 16px;
}

.game-help-section {
  margin: 0 0 22px;
}

.game-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.game-help-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.game-help-content p,
.game-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.game-help-content p {
  margin: 0 0 10px;
}

.game-help-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.game-help-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.game-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.game-help-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .game-help-main {
    grid-template-columns: 1fr;
  }

  .game-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 640px) {
  .game-help-content {
    padding: 12px 14px 16px;
  }

  .game-help-title {
    position: static;
    transform: none;
    margin: 0 auto;
    text-align: center;
  }
}
`

export default function GameDevelopmentPathfindingPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = (() => {
    const tab = searchParams.get('tab')
    return isTabId(tab) ? tab : 'big-picture'
  })()
  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Game Development (Pathfinding, etc.) (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleTabChange = (tabId: TabId) => {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('tab', tabId)
    setSearchParams(nextParams, { replace: false })
  }

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Game Development (Pathfinding, etc.)',
      url: `${location.pathname}${location.search}${location.hash}`,
      kind: 'help',
    }

    try {
      const rawTasks = window.localStorage.getItem(MINIMIZED_HELP_TASKS_KEY)
      const parsedTasks = rawTasks ? (JSON.parse(rawTasks) as Array<{ id: string }>) : []
      const nextTasks = [...parsedTasks.filter((task) => task.id !== minimizedTask.id), minimizedTask]
      window.localStorage.setItem(MINIMIZED_HELP_TASKS_KEY, JSON.stringify(nextTasks))
    } catch {
      // Ignore storage issues and keep navigation behavior intact.
    }

    const historyState = window.history.state as { idx?: number } | null
    if (historyState?.idx && historyState.idx > 0) {
      void navigate(-1)
      return
    }

    void navigate('/algoViz')
  }

  return (
    <div className="game-help-page">
      <style>{gameHelpStyles}</style>
      <div className="game-help-window" role="presentation">
        <header className="game-help-titlebar">
          <span className="game-help-title">Game Development (Pathfinding, etc.) - Help</span>
          <div className="game-help-controls">
            <button className="game-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="game-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="game-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`game-help-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="game-help-main">
          <aside className="game-help-toc" aria-label="Table of contents">
            <h2 className="game-help-toc-title">Contents</h2>
            <ul className="game-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="game-help-content">
            <h1 className="game-help-doc-title">Game Development (Pathfinding, etc.)</h1>
            <p className="game-help-intro">
              From tile puzzles to open worlds, navigation blends global planning with local steering under tight frame budgets. The
              best systems keep paths stable, motion natural, and performance predictable.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="game-help-section">
                  <h2 className="game-help-heading">Overview</h2>
                  {bigPicture.map(([title, detail, note]) => (
                    <div key={title}>
                      <h3 className="game-help-subheading">{title}</h3>
                      <p>{detail}</p>
                      <p>{note}</p>
                    </div>
                  ))}
                </section>

                <hr className="game-help-divider" />

                <section id="bp-history" className="game-help-section">
                  <h2 className="game-help-heading">History</h2>
                  {history.map(([title, detail, note]) => (
                    <div key={title}>
                      <h3 className="game-help-subheading">{title}</h3>
                      <p>{detail}</p>
                      <p>{note}</p>
                    </div>
                  ))}
                </section>

                <section id="bp-applications" className="game-help-section">
                  <h2 className="game-help-heading">Applications</h2>
                  {applications.map(([title, detail, note]) => (
                    <div key={title}>
                      <h3 className="game-help-subheading">{title}</h3>
                      <p>{detail}</p>
                      <p>{note}</p>
                    </div>
                  ))}
                </section>

                <section id="bp-takeaways" className="game-help-section">
                  <h2 className="game-help-heading">Key Takeaways</h2>
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
                <section id="core-pillars" className="game-help-section">
                  <h2 className="game-help-heading">Core Pillars and Mental Hooks</h2>
                  {pillars.map(([title, detail]) => (
                    <p key={title}>
                      <strong>{title}:</strong> {detail}
                    </p>
                  ))}
                </section>

                <section id="core-models" className="game-help-section">
                  <h2 className="game-help-heading">Mental Models</h2>
                  {mentalModels.map(([title, detail]) => (
                    <p key={title}>
                      <strong>{title}:</strong> {detail}
                    </p>
                  ))}
                </section>

                <section id="core-flow" className="game-help-section">
                  <h2 className="game-help-heading">How It Works, Step by Step</h2>
                  {howItWorks.map(([title, detail], index) => (
                    <p key={title}>
                      <strong>Step {index + 1}: {title}:</strong> {detail}
                    </p>
                  ))}
                </section>

                <section id="core-navmesh" className="game-help-section">
                  <h2 className="game-help-heading">Navmesh Anatomy</h2>
                  {navmeshAnatomy.map(([title, detail]) => (
                    <p key={title}>
                      <strong>{title}:</strong> {detail}
                    </p>
                  ))}
                </section>

                <section id="core-grid" className="game-help-section">
                  <h2 className="game-help-heading">Grid Anatomy</h2>
                  {gridAnatomy.map(([title, detail]) => (
                    <p key={title}>
                      <strong>{title}:</strong> {detail}
                    </p>
                  ))}
                </section>

                <section id="core-steering" className="game-help-section">
                  <h2 className="game-help-heading">Steering Anatomy</h2>
                  {steeringAnatomy.map(([title, detail]) => (
                    <p key={title}>
                      <strong>{title}:</strong> {detail}
                    </p>
                  ))}
                </section>

                <section id="core-tradeoffs" className="game-help-section">
                  <h2 className="game-help-heading">Tradeoff Matrix</h2>
                  {tradeoffMatrix.map(([dimension, exact, approximate]) => (
                    <p key={dimension}>
                      <strong>{dimension}:</strong> Exact/optimal: {exact} Approximate/fast: {approximate}
                    </p>
                  ))}
                </section>

                <section id="core-complexity" className="game-help-section">
                  <h2 className="game-help-heading">Complexity Reference</h2>
                  {complexityTable.map(([approach, time, space, note]) => (
                    <p key={approach}>
                      <strong>{approach}:</strong> Time {time}; Space {space}; {note}
                    </p>
                  ))}
                </section>

                <section id="core-pitfalls" className="game-help-section">
                  <h2 className="game-help-heading">Pitfalls</h2>
                  <ul>
                    {pitfalls.map(([title, detail]) => (
                      <li key={title}>
                        <strong>{title}:</strong> {detail}
                      </li>
                    ))}
                  </ul>
                </section>

                <section id="core-when" className="game-help-section">
                  <h2 className="game-help-heading">When to Use What</h2>
                  {whenToUse.map(([title, detail]) => (
                    <p key={title}>
                      <strong>{title}:</strong> {detail}
                    </p>
                  ))}
                </section>

                <section id="core-advanced" className="game-help-section">
                  <h2 className="game-help-heading">Advanced Moves</h2>
                  {advanced.map(([title, detail, note]) => (
                    <div key={title}>
                      <h3 className="game-help-subheading">{title}</h3>
                      <p>{detail}</p>
                      <p>{note}</p>
                    </div>
                  ))}
                </section>

                <section id="core-tuning" className="game-help-section">
                  <h2 className="game-help-heading">Tuning Checklist</h2>
                  {tuningChecklist.map(([title, detail]) => (
                    <p key={title}>
                      <strong>{title}:</strong> {detail}
                    </p>
                  ))}
                </section>

                <section id="core-observability" className="game-help-section">
                  <h2 className="game-help-heading">Observability and Signals</h2>
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
                <section id="ex-failure" className="game-help-section">
                  <h2 className="game-help-heading">Failure Mode</h2>
                  <p>{failureStory}</p>
                </section>

                <section id="ex-code" className="game-help-section">
                  <h2 className="game-help-heading">Code Examples</h2>
                  {codeExamples.map((example) => (
                    <div key={example.title}>
                      <h3 className="game-help-subheading">{example.title}</h3>
                      <div className="game-help-codebox">
                        <code>{example.code.trim()}</code>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="game-help-section">
                <h2 className="game-help-heading">Glossary</h2>
                {glossary.map(([term, definition]) => (
                  <p key={term}>
                    <strong>{term}:</strong> {definition}
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
