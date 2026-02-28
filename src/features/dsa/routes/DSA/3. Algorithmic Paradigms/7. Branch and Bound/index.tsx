import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

const overviewPanels = [
  {
    title: 'What it is',
    detail:
      'Branch and Bound is a systematic search strategy for optimization problems. It explores a decision tree of candidate solutions, while using bounds to discard whole subtrees that cannot beat the best solution found so far.',
  },
  {
    title: 'Why it matters',
    detail:
      'Many optimization problems are NP-hard, so brute force is infeasible. Branch and Bound keeps the search exact but prunes aggressively, often solving instances far beyond naive enumeration.',
  },
  {
    title: 'Where confirmable optimality helps',
    detail:
      'It delivers a proof of optimality, which is critical in scheduling, logistics, and resource allocation where near-optimal is not enough.',
  },
]

const foundations = [
  {
    title: 'Exact search with certificates',
    detail:
      'Branch and Bound explores the search tree exactly but prunes nodes using mathematically valid bounds. The final solution comes with a proof: every pruned subtree was impossible to beat the incumbent.',
  },
  {
    title: 'Incumbent + bound = pruning',
    detail:
      'Two numbers drive everything: the current best feasible solution (incumbent) and a bound on what a partial solution could achieve. If the bound cannot beat the incumbent, prune.',
  },
  {
    title: 'Relaxation is the engine',
    detail:
      'Bounds often come from relaxed problems (continuous, fractional, or simplified constraints). The tighter the relaxation, the more pruning you get.',
  },
  {
    title: 'Search order shapes performance',
    detail:
      'Node selection (depth-first, best-first, or hybrid) trades memory for speed and determines how quickly you find strong incumbents.',
  },
]

const taxonomy = [
  {
    title: 'Pure Branch and Bound',
    detail: 'Bounds + branching only. Good when relaxations are tight and feasible solutions are easy to find.',
  },
  {
    title: 'Branch and Cut',
    detail: 'Add cutting planes to tighten relaxations while searching. Backbone of modern MIP solvers.',
  },
  {
    title: 'Branch and Price',
    detail: 'Column generation provides bounds; branch on variables that appear dynamically.',
  },
  {
    title: 'Branch and Bound with heuristics',
    detail: 'Use greedy or local search to seed incumbents and boost pruning.',
  },
  {
    title: 'Parallel Branch and Bound',
    detail: 'Distribute subtrees across workers and share incumbents for stronger pruning.',
  },
]

const mentalModels = [
  {
    title: 'Search tree with a scoreboard',
    detail:
      'Each node is a partial solution. The scoreboard is the best full solution so far. If a node cannot possibly beat the scoreboard, it is pruned.',
  },
  {
    title: 'Optimistic estimates',
    detail:
      'Bounds are optimistic promises. For minimization, a lower bound says the best you could possibly do from this node. If even that is worse than the best known, stop exploring.',
  },
  {
    title: 'Prune by proof, not by guess',
    detail:
      'Pruning is safe because bounds are mathematically guaranteed, not heuristic guesses. If the bound is valid, pruning never removes the optimal solution.',
  },
]

const modelingChecklist = [
  'Define variables and feasibility constraints clearly.',
  'Choose an objective function and confirm whether it is min or max.',
  'Identify a relaxation that can be solved quickly for bounds.',
  'Decide branching variables and values (most fractional, most constrained).',
  'Select a node ordering strategy (depth-first, best-first, hybrid).',
  'Plan how to get a strong initial incumbent quickly.',
  'Define dominance and symmetry rules for pruning equivalent nodes.',
]

const algorithmSteps = [
  {
    heading: '1) Form the decision tree',
    bullets: [
      'Define variables and how each branching choice fixes or restricts them.',
      'Each node represents a partial assignment; leaves represent complete solutions.',
    ],
  },
  {
    heading: '2) Compute bounds',
    bullets: [
      'Lower bound for minimization, upper bound for maximization.',
      'Common sources: linear relaxations, greedy estimates, or problem-specific relaxations.',
    ],
  },
  {
    heading: '3) Pick next node to expand',
    bullets: [
      'Best-first: choose node with best bound (priority queue).',
      'Depth-first: cheaper memory, faster first incumbent.',
      'Breadth-first: systematic but often slower.',
    ],
  },
  {
    heading: '4) Branch and prune',
    bullets: [
      'Branch into child nodes by fixing a decision.',
      'Prune if bound is worse than current best, or if infeasible.',
    ],
  },
  {
    heading: '5) Update the incumbent',
    bullets: [
      'When a complete feasible solution is found, update the best known value.',
      'Tighter incumbents unlock more pruning.',
    ],
  },
]

const nodeSelection = [
  {
    title: 'Depth-first (DFS)',
    detail:
      'Low memory, finds a feasible solution early. Risk: may explore deep but poor branches before discovering tight bounds.',
  },
  {
    title: 'Best-first (best bound)',
    detail:
      'Expands the node with the best bound, often reducing total nodes. Risk: frontier can explode in memory.',
  },
  {
    title: 'Best-first with depth bias',
    detail:
      'Tie-break toward deeper nodes to find incumbents sooner while keeping bound-driven search.',
  },
  {
    title: 'Iterative deepening',
    detail:
      'Set a bound threshold or depth limit and increase gradually; useful when memory is capped.',
  },
]

const boundingTechniques = [
  {
    title: 'Relax the constraints',
    detail:
      'Drop integrality or combinatorial constraints to obtain a continuous or simpler problem whose solution gives a bound.',
  },
  {
    title: 'Greedy upper or lower bounds',
    detail:
      'Fast constructive heuristics can produce good incumbents. Strong incumbents often matter as much as strong bounds.',
  },
  {
    title: 'Problem-specific dominance',
    detail:
      'If two partial solutions lead to the same state but one is strictly worse, the worse one can be pruned outright.',
  },
  {
    title: 'Infeasibility pruning',
    detail:
      'Constraint checks can prove a node cannot lead to any feasible solution, allowing immediate pruning.',
  },
]
const boundingRules = [
  {
    title: 'Lower bound (minimization)',
    detail:
      'A lower bound is an optimistic estimate. If it is already >= incumbent, prune.',
  },
  {
    title: 'Upper bound (maximization)',
    detail:
      'An upper bound is an optimistic estimate. If it is <= incumbent, prune.',
  },
  {
    title: 'Dual bounds from relaxations',
    detail:
      'Solve a linear or convex relaxation to get strong bounds that are safe for pruning.',
  },
  {
    title: 'Heuristic incumbents',
    detail:
      'Even a decent feasible solution can unlock massive pruning by tightening the incumbent early.',
  },
]

const branchingStrategies = [
  {
    title: 'Most fractional variable',
    detail:
      'In LP relaxations, branch on variables closest to 0.5 to split the search evenly.',
  },
  {
    title: 'Most constrained decision',
    detail:
      'Branch on the variable with the smallest feasible domain to fail fast.',
  },
  {
    title: 'Strong branching',
    detail:
      'Test multiple candidate branches to estimate which yields the best bound improvements.',
  },
  {
    title: 'Problem-specific choices',
    detail:
      'In TSP, branch on edges; in scheduling, branch on job ordering or machine assignment.',
  },
]

const complexityNotes = [
  {
    title: 'Worst case is still exponential',
    detail:
      'Branch and Bound does not change worst-case complexity. It changes the effective search size by pruning large parts of the tree.',
  },
  {
    title: 'Bound quality drives runtime',
    detail:
      'Tight bounds and good incumbents reduce nodes explored. Loose bounds can degrade into brute force.',
  },
  {
    title: 'Memory depends on search order',
    detail:
      'Best-first stores many frontier nodes, which can be memory heavy. Depth-first uses less memory but may explore more.',
  },
  {
    title: 'Parallelism is natural',
    detail:
      'Subtrees are independent after branching. With shared incumbents, multiple workers can prune aggressively in parallel.',
  },
]

const instrumentation = [
  {
    title: 'Node counters',
    detail: 'Track nodes expanded, pruned, and feasible solutions found.',
  },
  {
    title: 'Bound gap monitoring',
    detail: 'Measure incumbent - best bound gap to see progress toward optimality.',
  },
  {
    title: 'Search tree profiling',
    detail: 'Log depth distribution and prune reasons to identify weak bounds or heuristics.',
  },
  {
    title: 'Time limits and checkpoints',
    detail: 'Save incumbent and best bound at intervals to support anytime use.',
  },
]

const comparisonTable = [
  {
    method: 'Backtracking',
    guarantee: 'Exact if all nodes visited',
    pruning: 'Feasibility only',
    typicalUse: 'Constraint satisfaction',
  },
  {
    method: 'Branch and Bound',
    guarantee: 'Exact with bounds',
    pruning: 'Feasibility + optimality bounds',
    typicalUse: 'Optimization problems',
  },
  {
    method: 'Heuristics',
    guarantee: 'No global optimum',
    pruning: 'Problem dependent',
    typicalUse: 'Very large instances',
  },
]

const workedExamples = [
  {
    title: '0/1 Knapsack: bound and prune',
    steps: [
      'Sort items by value density.',
      'Branch on include or exclude of the next item.',
      'Compute fractional knapsack bound for the remaining capacity.',
      'Prune if bound <= incumbent best value.',
    ],
    note:
      'Fractional fill gives a valid upper bound for maximization; it is the classic Branch and Bound success case.',
  },
  {
    title: 'Scheduling with deadlines',
    steps: [
      'Branch on assigning the next job to a machine or a time slot.',
      'Use earliest completion or relaxed machine capacity for lower bounds.',
      'Prune branches that cannot beat the best schedule found.',
      'Use a greedy schedule as the initial incumbent.',
    ],
    note:
      'Even loose scheduling bounds can prune heavily when jobs are tight.',
  },
]

const applications = [
  {
    context: '0/1 Knapsack',
    detail:
      'Branch on include or exclude each item, use fractional knapsack to compute a bound, and prune branches that cannot beat the incumbent.',
  },
  {
    context: 'Traveling Salesman Problem',
    detail:
      'Branch on choosing the next city, bound using minimum spanning tree or 1-tree relaxation, and prune tours that cannot beat best known.',
  },
  {
    context: 'Integer programming',
    detail:
      'Solve a linear relaxation for bounds, then branch on fractional variables. This is the foundation of modern MIP solvers.',
  },
  {
    context: 'Scheduling and routing',
    detail:
      'Branch on task assignments or sequence decisions, bound using earliest completion or relaxed resource constraints.',
  },
]

const failureStory =
  'A vehicle routing solver used a weak bound (simple distance sum) and explored millions of nodes. Replacing it with a 1-tree bound and seeding a greedy tour cut the search by 95% and reached optimality in minutes.'

const comparisons = [
  {
    title: 'Branch and Bound vs Backtracking',
    detail:
      'Backtracking prunes only infeasible states; Branch and Bound also prunes by optimality bounds.',
  },
  {
    title: 'Branch and Bound vs Dynamic Programming',
    detail:
      'DP exploits overlapping subproblems; Branch and Bound explores a search tree when states are unique or too large for a table.',
  },
  {
    title: 'Branch and Bound vs Heuristics',
    detail:
      'Heuristics give fast, possibly suboptimal answers; Branch and Bound gives proof of optimality but can be slower.',
  },
]

const examples = [
  {
    title: '0/1 Knapsack: bounding with fractional fill',
    code: `function branchAndBoundKnapsack(items, capacity):
    sort items by value/weight descending
    bestValue = 0
    dfs(node):
        if node.weight > capacity: return
        if node.value > bestValue: bestValue = node.value
        bound = node.value + fractionalFill(node.index, capacity - node.weight)
        if bound <= bestValue: return
        // branch include
        dfs(node.withItem())
        // branch exclude
        dfs(node.withoutItem())
    dfs(root)
    return bestValue`,
    explanation:
      'The fractional fill is a valid upper bound for the integer solution. If even that bound cannot beat the incumbent, prune the subtree.',
  },
  {
    title: 'TSP: best-first with 1-tree bound',
    code: `function branchAndBoundTSP(cities):
    bestTour = Infinity
    pq = priorityQueue()
    pq.push(root, bound = oneTreeBound(root))
    while pq not empty:
        node = pq.popMinBound()
        if node.bound >= bestTour: continue
        if node.isCompleteTour():
            bestTour = min(bestTour, node.cost)
            continue
        for child in node.branchNextCity():
            child.bound = oneTreeBound(child)
            if child.bound < bestTour:
                pq.push(child)`,
    explanation:
      'Best-first expands the most promising node. A strong bound ensures the priority queue rarely grows to the full exponential frontier.',
  },
]
const pitfalls = [
  'Using a bound that is not valid. If it can overestimate in minimization, you can prune the optimal solution.',
  'Weak incumbents. Without a good initial feasible solution, pruning stays poor even with decent bounds.',
  'Exploding memory in best-first. The frontier can be large; switch to depth-first or apply node limits.',
  'Branching on the wrong variable. Poor branching choices create large symmetric subtrees.',
  'Ignoring dominance and symmetry reductions that could remove redundant nodes.',
]

const debuggingChecklist = [
  'Validate bound correctness on small instances (never prune optimal).',
  'Confirm incumbent updates with feasible solution checks.',
  'Log prune reasons to ensure bounds are actually cutting.',
  'Check branching rules for symmetry; add dominance rules if duplicates appear.',
  'Use a depth or node limit to prevent runaway exploration during tuning.',
]

const decisionGuidance = [
  'You need exact optimality, not just a good solution.',
  'The problem has a strong relaxation that gives tight bounds.',
  'Feasible solutions can be found early to tighten the incumbent.',
  'Instance sizes are moderate, or structure allows heavy pruning.',
]

const whenToAvoid = [
  'The relaxation is too weak to prune (bound nearly equals trivial).',
  'Instances are huge with little structure and no good heuristics.',
  'You only need a fast approximate answer.',
  'Strict real-time guarantees prohibit worst-case exponential search.',
]

const advancedInsights = [
  {
    title: 'Branching strategy matters',
    detail:
      'Choose the variable or decision with the biggest impact on the bound. In MIP, branching on the most fractional variable often helps.',
  },
  {
    title: 'Cutting planes improve bounds',
    detail:
      'Add valid constraints to tighten relaxations before branching. This yields branch-and-cut, the engine of modern solvers.',
  },
  {
    title: 'Hybrid search orders',
    detail:
      'Depth-first finds quick incumbents, then switch to best-first to finish faster. Many solvers interleave strategies.',
  },
  {
    title: 'Warm starts and heuristics',
    detail:
      'Embedding greedy or local-search heuristics gives strong incumbents early, often dominating pruning behavior.',
  },
]

const takeaways = [
  'Branch and Bound is exact but pragmatic: prune what provably cannot win.',
  'Bounds and incumbents are the core levers; investing in them pays the most.',
  'Search order trades memory for speed. Choose based on instance size and resources.',
  'The best implementations combine branching, bounding, dominance, and heuristics.',
]

const glossaryTerms = [
  {
    term: 'Incumbent',
    definition:
      'The best feasible solution found so far during the search.',
  },
  {
    term: 'Bound',
    definition:
      'A mathematically valid estimate on the best objective value reachable from a partial solution.',
  },
  {
    term: 'Relaxation',
    definition:
      'A simplified version of the problem, often dropping integrality or constraints, used to compute bounds.',
  },
  {
    term: 'Branching',
    definition:
      'Splitting a partial solution into child subproblems by fixing a decision or variable.',
  },
  {
    term: 'Pruning',
    definition:
      'Discarding a subtree because infeasibility or a bound proves it cannot improve the incumbent.',
  },
  {
    term: 'Best-first search',
    definition:
      'A node expansion order that always chooses the frontier node with the strongest bound.',
  },
  {
    term: 'Dominance rule',
    definition:
      'A proof that one partial solution is always no better than another equivalent state, so it can be removed.',
  },
  {
    term: 'Branch and Cut',
    definition:
      'A Branch and Bound variant that adds cutting planes to tighten relaxations during search.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const branchBoundHelpStyles = `
.branch-bound-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  padding: 0;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.branch-bound-help-window {
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: #c0c0c0;
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  box-sizing: border-box;
}

.branch-bound-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
}

.branch-bound-help-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  font-weight: 700;
  white-space: nowrap;
}

.branch-bound-help-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.branch-bound-help-control {
  width: 18px;
  height: 16px;
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
  padding: 0;
}
.branch-bound-help-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
  overflow-x: auto;
}

.branch-bound-help-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  font-family: inherit;
  cursor: pointer;
  white-space: nowrap;
}

.branch-bound-help-tab.active {
  position: relative;
  top: 1px;
  background: #fff;
}

.branch-bound-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
  border-top: 1px solid #404040;
  background: #fff;
}

.branch-bound-help-toc {
  overflow: auto;
  background: #f2f2f2;
  border-right: 1px solid #808080;
  padding: 12px;
}

.branch-bound-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.branch-bound-help-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.branch-bound-help-toc-list li {
  margin: 0 0 8px;
}

.branch-bound-help-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.branch-bound-help-content {
  overflow: auto;
  padding: 14px 20px 24px;
}

.branch-bound-help-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.branch-bound-help-section {
  margin: 0 0 20px;
}

.branch-bound-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.branch-bound-help-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.branch-bound-help-content p,
.branch-bound-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.branch-bound-help-content p {
  margin: 0 0 10px;
}

.branch-bound-help-content ul,
.branch-bound-help-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.branch-bound-help-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.branch-bound-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.branch-bound-help-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .branch-bound-help-main {
    grid-template-columns: 1fr;
  }

  .branch-bound-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}
`

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-foundations', label: 'Foundations' },
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-taxonomy', label: 'Taxonomy' },
    { id: 'bp-mental', label: 'Mental Models' },
  ],
  'core-concepts': [
    { id: 'core-modeling', label: 'Modeling Checklist' },
    { id: 'core-loop', label: 'Algorithm Loop' },
    { id: 'core-selection', label: 'Node Selection' },
    { id: 'core-bounding', label: 'Bounding Techniques' },
    { id: 'core-rules', label: 'Bounding Rules' },
    { id: 'core-branching', label: 'Branching Strategies' },
    { id: 'core-complexity', label: 'Complexity' },
    { id: 'core-instrumentation', label: 'Instrumentation' },
    { id: 'core-comparisons', label: 'Comparisons' },
    { id: 'core-applications', label: 'Applications' },
    { id: 'core-pitfalls', label: 'Pitfalls' },
    { id: 'core-debugging', label: 'Debugging' },
    { id: 'core-use', label: 'When To Use It' },
    { id: 'core-avoid', label: 'When To Avoid It' },
    { id: 'core-advanced', label: 'Advanced Insights' },
    { id: 'core-takeaways', label: 'Key Takeaways' },
  ],
  examples: [
    { id: 'examples-worked', label: 'Worked Examples' },
    { id: 'examples-code', label: 'Code Examples' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

export default function BranchAndBoundPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const tabParam = searchParams.get('tab')
  const activeTab: TabId = isTabId(tabParam) ? tabParam : 'big-picture'
  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Branch and Bound (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleTabChange = (tabId: TabId) => {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('tab', tabId)
    setSearchParams(nextParams, { replace: false })
  }

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Branch and Bound',
      url: `${location.pathname}${location.search}${location.hash}`,
      kind: 'help',
    }
    const rawTasks = window.localStorage.getItem(MINIMIZED_HELP_TASKS_KEY)
    const parsedTasks = rawTasks ? (JSON.parse(rawTasks) as Array<{ id: string }>) : []
    const nextTasks = [...parsedTasks.filter((task) => task.id !== minimizedTask.id), minimizedTask]
    window.localStorage.setItem(MINIMIZED_HELP_TASKS_KEY, JSON.stringify(nextTasks))

    const historyState = window.history.state as { idx?: number } | null
    if (historyState?.idx && historyState.idx > 0) {
      void navigate(-1)
      return
    }
    void navigate('/algoViz')
  }

  return (
    <div className="branch-bound-help-page">
      <style>{branchBoundHelpStyles}</style>
      <div className="branch-bound-help-window" role="presentation">
        <header className="branch-bound-help-titlebar">
          <span className="branch-bound-help-title">Branch and Bound</span>
          <div className="branch-bound-help-controls">
            <button className="branch-bound-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="branch-bound-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="branch-bound-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`branch-bound-help-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="branch-bound-help-main">
          <aside className="branch-bound-help-toc" aria-label="Table of contents">
            <h2 className="branch-bound-help-toc-title">Contents</h2>
            <ul className="branch-bound-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="branch-bound-help-content">
            <h1 className="branch-bound-help-doc-title">Branch and Bound</h1>
            <p>
              Branch and Bound explores a decision tree of candidate solutions while eliminating subtrees that cannot outperform the
              best solution found so far. It is the backbone of exact solvers for knapsack, scheduling, routing, and integer programming.
            </p>
            {activeTab === 'big-picture' && (
              <>
                <section id="bp-foundations" className="branch-bound-help-section">
                  <h2 className="branch-bound-help-heading">Foundations</h2>
                  {foundations.map((item) => (
                    <div key={item.title}>
                      <h3 className="branch-bound-help-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <hr className="branch-bound-help-divider" />

                <section id="bp-overview" className="branch-bound-help-section">
                  <h2 className="branch-bound-help-heading">Overview</h2>
                  {overviewPanels.map((item) => (
                    <div key={item.title}>
                      <h3 className="branch-bound-help-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <hr className="branch-bound-help-divider" />

                <section id="bp-taxonomy" className="branch-bound-help-section">
                  <h2 className="branch-bound-help-heading">Taxonomy</h2>
                  {taxonomy.map((item) => (
                    <div key={item.title}>
                      <h3 className="branch-bound-help-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <hr className="branch-bound-help-divider" />

                <section id="bp-mental" className="branch-bound-help-section">
                  <h2 className="branch-bound-help-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <div key={item.title}>
                      <h3 className="branch-bound-help-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                <section id="core-modeling" className="branch-bound-help-section">
                  <h2 className="branch-bound-help-heading">Modeling Checklist</h2>
                  <ul>
                    {modelingChecklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <hr className="branch-bound-help-divider" />

                <section id="core-loop" className="branch-bound-help-section">
                  <h2 className="branch-bound-help-heading">Algorithm Loop</h2>
                  {algorithmSteps.map((step) => (
                    <div key={step.heading}>
                      <h3 className="branch-bound-help-subheading">{step.heading}</h3>
                      <ul>
                        {step.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>

                <hr className="branch-bound-help-divider" />

                <section id="core-selection" className="branch-bound-help-section">
                  <h2 className="branch-bound-help-heading">Node Selection</h2>
                  {nodeSelection.map((item) => (
                    <div key={item.title}>
                      <h3 className="branch-bound-help-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <hr className="branch-bound-help-divider" />

                <section id="core-bounding" className="branch-bound-help-section">
                  <h2 className="branch-bound-help-heading">Bounding Techniques</h2>
                  {boundingTechniques.map((item) => (
                    <div key={item.title}>
                      <h3 className="branch-bound-help-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <hr className="branch-bound-help-divider" />

                <section id="core-rules" className="branch-bound-help-section">
                  <h2 className="branch-bound-help-heading">Bounding Rules</h2>
                  {boundingRules.map((item) => (
                    <div key={item.title}>
                      <h3 className="branch-bound-help-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <hr className="branch-bound-help-divider" />

                <section id="core-branching" className="branch-bound-help-section">
                  <h2 className="branch-bound-help-heading">Branching Strategies</h2>
                  {branchingStrategies.map((item) => (
                    <div key={item.title}>
                      <h3 className="branch-bound-help-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <hr className="branch-bound-help-divider" />

                <section id="core-complexity" className="branch-bound-help-section">
                  <h2 className="branch-bound-help-heading">Complexity</h2>
                  <p>
                    Branch and Bound is a time-space trade. The method stays exact, but performance depends on how fast it finds good
                    incumbents and how aggressively its bounds can cut the tree.
                  </p>
                  {complexityNotes.map((item) => (
                    <div key={item.title}>
                      <h3 className="branch-bound-help-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <hr className="branch-bound-help-divider" />

                <section id="core-instrumentation" className="branch-bound-help-section">
                  <h2 className="branch-bound-help-heading">Instrumentation</h2>
                  {instrumentation.map((item) => (
                    <div key={item.title}>
                      <h3 className="branch-bound-help-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <hr className="branch-bound-help-divider" />

                <section id="core-comparisons" className="branch-bound-help-section">
                  <h2 className="branch-bound-help-heading">Comparisons</h2>
                  {comparisonTable.map((item) => (
                    <div key={item.method}>
                      <h3 className="branch-bound-help-subheading">{item.method}</h3>
                      <p>
                        Guarantee: {item.guarantee}. Pruning: {item.pruning}. Typical use: {item.typicalUse}.
                      </p>
                    </div>
                  ))}
                  {comparisons.map((item) => (
                    <div key={item.title}>
                      <h3 className="branch-bound-help-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <hr className="branch-bound-help-divider" />

                <section id="core-applications" className="branch-bound-help-section">
                  <h2 className="branch-bound-help-heading">Applications</h2>
                  {applications.map((item) => (
                    <div key={item.context}>
                      <h3 className="branch-bound-help-subheading">{item.context}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                  <h3 className="branch-bound-help-subheading">Failure Story</h3>
                  <p>{failureStory}</p>
                </section>

                <hr className="branch-bound-help-divider" />

                <section id="core-pitfalls" className="branch-bound-help-section">
                  <h2 className="branch-bound-help-heading">Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <hr className="branch-bound-help-divider" />

                <section id="core-debugging" className="branch-bound-help-section">
                  <h2 className="branch-bound-help-heading">Debugging</h2>
                  <ul>
                    {debuggingChecklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <hr className="branch-bound-help-divider" />

                <section id="core-use" className="branch-bound-help-section">
                  <h2 className="branch-bound-help-heading">When To Use It</h2>
                  <ul>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <hr className="branch-bound-help-divider" />

                <section id="core-avoid" className="branch-bound-help-section">
                  <h2 className="branch-bound-help-heading">When To Avoid It</h2>
                  <ul>
                    {whenToAvoid.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <hr className="branch-bound-help-divider" />

                <section id="core-advanced" className="branch-bound-help-section">
                  <h2 className="branch-bound-help-heading">Advanced Insights</h2>
                  {advancedInsights.map((item) => (
                    <div key={item.title}>
                      <h3 className="branch-bound-help-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <hr className="branch-bound-help-divider" />

                <section id="core-takeaways" className="branch-bound-help-section">
                  <h2 className="branch-bound-help-heading">Key Takeaways</h2>
                  <ul>
                    {takeaways.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                <section id="examples-worked" className="branch-bound-help-section">
                  <h2 className="branch-bound-help-heading">Worked Examples</h2>
                  {workedExamples.map((example) => (
                    <div key={example.title}>
                      <h3 className="branch-bound-help-subheading">{example.title}</h3>
                      <ol>
                        {example.steps.map((step) => (
                          <li key={step}>{step}</li>
                        ))}
                      </ol>
                      <p>{example.note}</p>
                    </div>
                  ))}
                </section>

                <hr className="branch-bound-help-divider" />

                <section id="examples-code" className="branch-bound-help-section">
                  <h2 className="branch-bound-help-heading">Code Examples</h2>
                  {examples.map((example) => (
                    <div key={example.title}>
                      <h3 className="branch-bound-help-subheading">{example.title}</h3>
                      <div className="branch-bound-help-codebox">
                        <code>{example.code}</code>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="branch-bound-help-section">
                <h2 className="branch-bound-help-heading">Terms</h2>
                {glossaryTerms.map((item) => (
                  <div key={item.term}>
                    <h3 className="branch-bound-help-subheading">{item.term}</h3>
                    <p>{item.definition}</p>
                  </div>
                ))}
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
