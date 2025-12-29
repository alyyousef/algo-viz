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
    title: 'Navigation as player freedom',
    detail:
      'Pathfinding turns authored spaces into explorable worlds, ensuring NPCs and players can traverse without designers hand-placing routes.',
    note: 'Saves teams from brittle waypoint scripts that collapse when levels change.',
  },
  {
    title: 'Global search meets local feel',
    detail:
      'Blend long-range planning with short-range steering so motion looks purposeful yet reactive to bumps, doors, and crowds.',
    note: 'Prevents robotic movement and rubber-banding in tight quarters.',
  },
  {
    title: 'Latency as a design budget',
    detail: 'Frame budgets force trade-offs: pathfinding in a few milliseconds, steering every frame, baking heavy data offline.',
    note: 'Keeps large worlds responsive on mid-tier hardware.',
  },
  {
    title: 'Scales from puzzles to MMOs',
    detail: 'Algorithms shift from single-agent optimality to batched, approximate flows when thousands of units share a map.',
    note: 'Chooses the right abstraction so costs stay predictable as populations grow.',
  },
]

const history = [
  {
    title: '1968: A* formalized (Hart, Nilsson, Raphael)',
    detail: 'Admissible heuristics brought optimal paths to robotics and later to games once memory and CPU caught up.',
  },
  {
    title: '1987: Boids flocking (Reynolds)',
    detail: 'Showed local steering could yield lifelike crowds, influencing squad AI and ambient NPCs.',
  },
  {
    title: '2004: HPA* (Botea et al.)',
    detail: 'Hierarchical abstraction cut path latency on huge maps, enabling RTS and open-world traversal without pausing the game.',
  },
  {
    title: '2008: ORCA for crowd avoidance',
    detail: 'Reciprocal velocity obstacles made dense crowds stable by sharing responsibility across agents.',
  },
  {
    title: '2012-2016: Navmesh standardization',
    detail: 'Engines like Unreal and Unity embedded tiled navmeshes and off-mesh links, making smooth navigation a default feature.',
  },
]

const pillars = [
  {
    title: 'Deterministic simulation',
    detail: 'Fixed timesteps and consistent floating point paths keep server-authoritative games in sync with clients and replays.',
  },
  {
    title: 'Heuristic sanity',
    detail: 'Admissible, consistent heuristics prevent A* from skipping true optima; keep cost metrics aligned with movement physics.',
  },
  {
    title: 'Spatial acceleration',
    detail: 'Uniform grids, quadtrees, or BVH speed up neighbor queries for A*, steering, and collision tests.',
  },
  {
    title: 'Dynamic updates',
    detail: 'Incremental planners and tiled navmesh rebuilds let levels change (doors, debris) without full recompute.',
  },
  {
    title: 'Animation alignment',
    detail: 'Navigation nodes must respect collider sizes, step heights, and turn radii so animation and physics stay in lockstep.',
  },
]

const mentalModels = [
  {
    title: 'Road atlas vs lane keeping',
    detail:
      'A* is your atlas: the coarse route. Steering is lane keeping: micro-adjustments for traffic and potholes. Breaks when atlas and lanes disagree (stale navmesh).',
  },
  {
    title: 'Water through culverts',
    detail:
      'Crowd flow follows low-res fields then funnels through portals; chokepoints become culverts that must be sized and instrumented.',
  },
  {
    title: 'Cache as muscle memory',
    detail:
      'Hierarchical and cached subpaths mimic muscle memory: reuse known corridors to react fast, relearn only when the space changes.',
  },
  {
    title: 'Budgeted attention',
    detail:
      'Agents spend CPU like attention: global planning rarely, local checks often. Overspend and you drop frames; underspend and motion looks clueless.',
  },
]

const howItWorks = [
  {
    step: '1. Build navigation data',
    detail:
      'Extract navmesh polygons or grid walkables from level geometry; add off-mesh links for jumps, ladders, doors with custom costs.',
  },
  {
    step: '2. Choose search resolution',
    detail: 'Small grids for puzzles, coarse regions for open worlds; keep cell size aligned with smallest agent radius.',
  },
  {
    step: '3. Plan globally',
    detail:
      'Run A* (or HPA*/JPS) on the nav graph with a heuristic consistent with movement metrics; enforce time-sliced expansions under frame budgets.',
  },
  {
    step: '4. Smooth and post-process',
    detail:
      'Apply funnel or string-pulling on navmesh corridors; snap turns to acceleration limits; insert look-ahead points to avoid jitter.',
  },
  {
    step: '5. Layer local avoidance',
    detail:
      'Blend steering or ORCA with the global path; cap neighbor checks and prediction horizon; prefer partial progress over freezing.',
  },
  {
    step: '6. Handle change',
    detail:
      'Use incremental search (D* Lite/LPA*) or partial navmesh rebuilds when obstacles move; fall back to conservative paths when data is stale.',
  },
]

const complexityTable = [
  {
    approach: 'Grid A* with binary heap',
    time: 'O(E log V)',
    space: 'O(V)',
    note: 'Stable baseline; tie-breaking and neighbor order affect path wobble.',
  },
  {
    approach: 'Jump Point Search (uniform grid)',
    time: '~O(k log V)',
    space: 'O(V)',
    note: 'Prunes symmetry; best on large empty grids.',
  },
  {
    approach: 'Navmesh A* + funnel',
    time: 'O(F log F)',
    space: 'O(F)',
    note: 'F = nav faces; fewer nodes than grids, smoother corridors.',
  },
  {
    approach: 'HPA* (k-level abstraction)',
    time: 'O(E log V) at top + locals',
    space: 'O(V) + portals',
    note: 'Trades optimality for latency; great for repeated queries.',
  },
  {
    approach: 'D* Lite / LPA* incremental',
    time: 'O(E log V) worst-case',
    space: 'O(V)',
    note: 'Reuses prior search when graph mutates; ideal for dynamic levels.',
  },
]

const applications = [
  {
    title: 'Open-world NPCs (Skyrim, GTA V)',
    detail:
      'Tiled navmeshes with off-mesh links allow climbing, ladders, and trains; streaming keeps memory bounded as the player roams.',
  },
  {
    title: 'RTS squad movement (StarCraft II)',
    detail: 'Hierarchical search gives fast long paths; local steering and flow fields keep armies cohesive without collisions.',
  },
  {
    title: 'Server bots (Valorant, CS:GO)',
    detail:
      'Deterministic A* with baked cover nodes ensures fair, replayable routes under server authority and anti-cheat constraints.',
  },
  {
    title: 'Racing lines and ghosts',
    detail:
      'Weighted nav graphs with curvature costs produce smooth racing lines; precomputed splines feed both AI cars and ghost playback.',
  },
  {
    title: 'Indie puzzlers and roguelikes',
    detail:
      'Simple grids with heuristic tuning enable quick rebuilds when rooms randomize; cheap enough for procedural generation loops.',
  },
]

const failureCallout = {
  title: 'Failure story: live event jammed',
  detail:
    'A holiday event added destructible bridges, but navmesh tiles were not marked dirty. NPC caravans piled up, blocking players for an hour. Fix: instrument off-mesh links, rebuild tiles on structural changes, and keep a conservative fallback path.',
}

const pitfalls = [
  'Stale nav data after moving platforms or doors causes agents to walk into voids; mark tiles dirty and rebuild incrementally.',
  'Heuristic that underestimates diagonals on grids makes A* explore too much; match heuristic to movement metric (octile for 8-way).',
  'Unbounded neighbor checks in ORCA tank frame rate in dense crowds; cap neighbors and bucket space.',
  'Path smoothing that ignores collider radius clips corners; inflate obstacles or offset portals by agent radius.',
  'Replanning every frame thrashes caches; debounce global searches and reuse partial paths unless blocked.',
]

const whenToUse = [
  'Use navmesh A* when worlds are 3D with ramps, stairs, and irregular obstacles.',
  'Use grid A* or JPS when levels are tile-based and clarity beats smoothness.',
  'Use HPA* or cached corridors when many agents query long routes on the same map.',
  'Use D* Lite or partial rebuilds when obstacles move mid-session but geometry is mostly stable.',
  'Use flow fields for large homogeneous crowds that share objectives (RTS bases, tower defense).',
]

const advanced = [
  {
    title: 'Bidirectional and meet-in-the-middle',
    detail: 'Reduces search depth on long corridors; watch for asymmetric costs and dynamic starts.',
  },
  {
    title: 'Any-angle planners (Theta*, Field D*)',
    detail: 'Cuts grid corners for smoother motion without full navmesh authoring.',
  },
  {
    title: 'GPU pathfinding',
    detail: 'Batched A* or jump flooding on GPU keeps thousands of agents responsive in crowds.',
  },
  {
    title: 'Flow fields with hierarchical seeding',
    detail: 'Precompute coarse directions, refine locally; great for swarms sharing a target.',
  },
  {
    title: 'Async navmesh tiling',
    detail: 'Rebuild tiles off the game thread; stream updates to agents with versioned data.',
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
  const D2 = Math.SQRT2 // diagonal move cost
  return D * (dx + dy) + (D2 - 2 * D) * Math.min(dx, dy)
}

function aStar(start: Node, goal: Node, walkable: (x: number, y: number) => boolean) {
  const open: Node[] = [start]
  const closed = new Set<string>()

  const key = (n: Node) => \`\${n.x},\${n.y}\`
  start.g = 0
  start.f = octile(start, goal)

  while (open.length) {
    open.sort((a, b) => a.f - b.f) // binary heap recommended in production
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
    explanation:
      'Uses octile distance for 8-way movement; replace the sort with a heap for performance and ensure cost() matches the heuristic metric.',
  },
  {
    title: 'Hierarchical path with cached portals',
    code: `type PortalPath = { portal: string; subpath: number[][] }
const cache = new Map<string, PortalPath[]>()

function plan(startRegion: string, goalRegion: string) {
  const key = \`\${startRegion}->\${goalRegion}\`
  const cached = cache.get(key)
  if (cached) return cached

  const coarsePath = aStarRegions(startRegion, goalRegion) // graph of regions
  const portalPaths: PortalPath[] = []

  for (const [from, to, portalId] of coarsePath) {
    const nav = loadRegionNav(from)
    const portal = nav.portals[portalId]
    const local = aStar(nav.entry, portal.center, nav.walkable)
    portalPaths.push({ portal: portalId, subpath: reconstruct(local) })
  }
  cache.set(key, portalPaths)
  return portalPaths
}`,
    explanation:
      'Separates coarse region planning from local subpaths and caches portal legs so repeated long-range queries stay under budget.',
  },
]

const keyTakeaways = [
  'Keep navigation data fresh and aligned with physics.',
  'Spend CPU on global plans sparingly; spend it on local responsiveness every frame.',
  'Pick heuristics and costs that match how agents really move.',
  'Cache and reuse paths; rebuild only the tiles that changed.',
  'Profile expansions, neighbor counts, and avoidance to stay within frame budgets.',
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
                From puzzle grids to open-world cities, robust pathfinding blends global planning with local steering under tight
                frame budgets.
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
