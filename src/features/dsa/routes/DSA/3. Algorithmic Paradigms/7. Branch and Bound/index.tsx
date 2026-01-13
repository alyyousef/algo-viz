import type { JSX } from 'react'
import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

export default function BranchAndBoundPage(): JSX.Element {
  

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

  const decisionGuidance = [
    'You need exact optimality, not just a good solution.',
    'The problem has a strong relaxation that gives tight bounds.',
    'Feasible solutions can be found early to tighten the incumbent.',
    'Instance sizes are moderate, or structure allows heavy pruning.',
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

  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Branch and Bound</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Exact optimization by pruning the search tree with provable bounds</div>
              <p className="win95-text">
                Branch and Bound explores a decision tree of candidate solutions while eliminating subtrees that cannot outperform the
                best solution found so far. It is the backbone of exact solvers for knapsack, scheduling, routing, and integer programming.
              </p>
            </div>
            <Link to="/algoViz" className="win95-button" role="button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-fieldset">
            <legend>The big picture</legend>
            <div className="win95-grid win95-grid-3">
              {overviewPanels.map((panel) => (
                <div key={panel.title} className="win95-panel">
                  <div className="win95-heading">{panel.title}</div>
                  <p className="win95-text">{panel.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Core concept and mental models</legend>
            <div className="win95-grid win95-grid-2">
              {mentalModels.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works: the Branch and Bound loop</legend>
            <div className="win95-grid win95-grid-3">
              {algorithmSteps.map((step) => (
                <div key={step.heading} className="win95-panel">
                  <div className="win95-heading">{step.heading}</div>
                  <ul className="win95-list">
                    {step.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Bounding techniques</legend>
            <div className="win95-grid win95-grid-2">
              {boundingTechniques.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity and tradeoffs</legend>
            <div className="win95-grid win95-grid-2">
              {complexityNotes.map((note) => (
                <div key={note.title} className="win95-panel">
                  <div className="win95-heading">{note.title}</div>
                  <p className="win95-text">{note.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                Branch and Bound is a time space trade. Better bounds and incumbents reduce time, while best-first trades more memory
                for faster convergence.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Comparisons at a glance</legend>
            <div className="win95-panel">
              <table className="win95-table">
                <thead>
                  <tr>
                    <th>Method</th>
                    <th>Guarantee</th>
                    <th>Pruning rule</th>
                    <th>Typical use</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonTable.map((row) => (
                    <tr key={row.method}>
                      <td>{row.method}</td>
                      <td>{row.guarantee}</td>
                      <td>{row.pruning}</td>
                      <td>{row.typicalUse}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Real-world applications</legend>
            <div className="win95-grid win95-grid-2">
              {applications.map((item) => (
                <div key={item.context} className="win95-panel">
                  <div className="win95-heading">{item.context}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Practical examples</legend>
            <div className="win95-stack">
              {examples.map((example) => (
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
            <legend>Common pitfalls</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {pitfalls.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>When to use it</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                {decisionGuidance.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Advanced insights</legend>
            <div className="win95-grid win95-grid-2">
              {advancedInsights.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Key takeaways</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {takeaways.map((item) => (
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

