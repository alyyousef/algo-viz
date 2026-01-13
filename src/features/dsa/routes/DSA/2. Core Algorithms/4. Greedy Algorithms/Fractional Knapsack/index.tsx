import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: '1957: Dantzig formalizes linear programming greedy',
    detail:
      'The fractional knapsack greedy is a simple case of linear programming where taking fractions makes the LP tight.',
  },
  {
    title: '1960s: Greedy stays optimal with ratios',
    detail:
      'Sorting items by value-to-weight ratio and filling by that order becomes a standard textbook proof example.',
  },
  {
    title: '1970s: Contrast with 0/1 knapsack',
    detail:
      'Highlighting that allowing fractions changes the landscape from NP-hard to trivially solvable greedily.',
  },
  {
    title: 'Modern: Duality perspective',
    detail:
      'The greedy solution can be seen as satisfying complementary slackness for the LP relaxation of knapsack.',
  },
]

const mentalModels = [
  {
    title: 'Price per kilogram',
    detail:
      'Think of items as bulk goods sold by weight. You buy the highest price-per-kg first until the bag is full.',
  },
  {
    title: 'Continuous pouring',
    detail:
      'Because you can break items, the objective is linear and divisible; there is no combinatorial explosion.',
  },
  {
    title: 'Frontier of ratios',
    detail:
      'The optimal solution lies on the upper hull when items are ordered by value/weight; taking any worse ratio earlier reduces the final value.',
  },
  {
    title: 'LP relaxation of 0/1 knapsack',
    detail:
      'Fractional knapsack is exactly the linear relaxation; its greedy optimum upper-bounds the 0/1 optimum.',
  },
]

const problemVariants = [
  {
    heading: 'Classic fractional knapsack',
    bullets: [
      'Maximize value with capacity W; fractions allowed.',
      'Greedy by descending value/weight ratio is optimal.',
      'Time O(n log n) due to sorting.',
    ],
  },
  {
    heading: 'Multiple knapsacks (fractional)',
    bullets: [
      'With identical ratios, greedy still works per bag.',
      'Otherwise solve via linear programming for exact optimum.',
      'Heuristics assign high ratios first across bags.',
    ],
  },
  {
    heading: '0/1 knapsack',
    bullets: [
      'Fractions not allowed; greedy by ratio is not optimal.',
      'Requires DP or branch-and-bound.',
      'Fractional value is an upper bound for pruning.',
    ],
  },
  {
    heading: 'Unbounded fractional',
    bullets: [
      'Items can repeat infinitely; still take the best ratio until full.',
      'If a ratio is negative, skip it entirely.',
      'Degenerates to picking the single best ratio item.',
    ],
  },
  {
    heading: 'Additional constraints',
    bullets: [
      'Category or conflict constraints break simple greedy.',
      'Solve with LP or specialized greedy plus adjustments.',
      'Shows how combinatorial constraints reintroduce hardness.',
    ],
  },
]

const algorithmSteps = [
  {
    title: 'Compute ratios',
    detail: 'For each item, compute value/weight.',
  },
  {
    title: 'Sort descending by ratio',
    detail: 'Highest value density items considered first; stable ties by lower weight or higher value.',
  },
  {
    title: 'Fill greedily',
    detail:
      'Take whole items while capacity remains; when an item would overflow, take a fraction to fill the knapsack.',
  },
  {
    title: 'Stop when full',
    detail: 'Total value is maximized at the point capacity is exhausted.',
  },
  {
    title: 'Upper bound for 0/1',
    detail: 'Use the fractional value as an admissible upper bound for branch-and-bound in 0/1 knapsack.',
  },
]

const implementationNotes = [
  {
    title: 'Precision',
    detail: 'Use floating point for ratios and fractional weights; beware of accumulated rounding on the final value.',
  },
  {
    title: 'Tie-breaking',
    detail: 'When ratios tie, prefer smaller weight to keep flexibility.',
  },
  {
    title: 'Capacity checks',
    detail: 'Guard against zero or negative weights; skip invalid items.',
  },
  {
    title: 'Stability for reproducibility',
    detail: 'Stable sort makes outputs deterministic when ratios match.',
  },
  {
    title: 'Streaming inputs',
    detail:
      'Maintain a max-heap of ratios if items arrive online; this approximates the full sort with incremental handling.',
  },
]

const complexityNotes = [
  {
    title: 'Time complexity',
    detail: 'Sorting dominates at O(n log n); the scan is O(n).',
  },
  {
    title: 'Space complexity',
    detail: 'O(1) extra beyond the input and sorted order (or O(n) if you copy).',
  },
  {
    title: 'Optimality guarantee',
    detail: 'Greedy is exact because the problem is a linear program; the sorted order satisfies complementary slackness.',
  },
  {
    title: 'Contrast with 0/1',
    detail: '0/1 knapsack is NP-hard; fractional is easy. The gap shows how integrality changes complexity.',
  },
]

const realWorldUses = [
  {
    context: 'Bandwidth throttling',
    detail: 'Allocate fractions of link capacity to flows proportional to their value density.',
  },
  {
    context: 'Ad inventory selling',
    detail: 'Sell partial impressions or time slices to maximize revenue when slots are divisible.',
  },
  {
    context: 'Cargo blending',
    detail: 'Fill a container with bulk goods; take partial pallets to maximize profit.',
  },
  {
    context: 'Portfolio allocation',
    detail: 'Invest fractions of budget into assets ranked by expected return per risk-weighted unit.',
  },
  {
    context: 'Resource throttles in schedulers',
    detail: 'Assign CPU or memory shares based on priority-to-cost ratios.',
  },
]

const examples = [
  {
    title: 'Greedy fractional fill (pseudocode)',
    code: `function fractionalKnapsack(items, W):
    // items: (value, weight)
    sort items by value/weight descending
    value = 0
    for (v, w) in items:
        if W == 0: break
        take = min(w, W)
        value += v * (take / w)
        W -= take
    return value`,
    explanation:
      'Take as much as possible of the best ratio item before moving to the next; the last item may be fractional.',
  },
  {
    title: 'Exchange argument proof sketch',
    code: `Let g be the first item in greedy order not fully taken by OPT.
OPT must take a worse or equal ratio item before g.
Swap that mass with g's mass; value stays >=.
Repeat swaps to transform OPT into greedy without losing value.`,
    explanation:
      'Any optimal solution can be reordered to greedy order without decreasing value, proving greedy optimality.',
  },
  {
    title: 'Upper bound for 0/1 knapsack',
    code: `function upperBound(items, W):
    // same greedy but allow fraction only on last item
    return fractionalKnapsack(items, W)`,
    explanation:
      'Branch-and-bound uses the fractional value as an admissible upper bound when exploring 0/1 choices.',
  },
]

const pitfalls = [
  'Using the same greedy for 0/1 knapsack--ratio order is not optimal when fractions are disallowed.',
  'Ignoring floating-point precision when summing fractional contributions.',
  'Forgetting to handle zero or negative weights, which break the ratio computation.',
  'Tie-breaking poorly can affect reproducibility or downstream deterministic tests.',
  'Assuming single pass without sorting is optimal; without order, greedy can fail.',
]

const decisionGuidance = [
  'Use fractional greedy when items are divisible and you want maximum value quickly.',
  'Use the fractional value as a bound when solving 0/1 knapsack with branch-and-bound.',
  'If additional combinatorial constraints apply, move to LP or ILP; plain greedy may not hold.',
  'When ratios are close and precision matters, consider higher-precision arithmetic.',
  'For streaming, approximate with a max-heap or partial sorts to keep up with arrivals.',
]

const advancedInsights = [
  {
    title: 'Dual prices',
    detail:
      'The optimal per-unit value acts like a dual price on capacity; items cheaper than this price fill only after better ratios.',
  },
  {
    title: 'Sensitivity',
    detail: 'Small changes in capacity or ratios only affect the breakpoint item where the fraction occurs.',
  },
  {
    title: 'Convex hull view',
    detail:
      'Plot cumulative weight vs value in greedy order; the optimal point lies on the upper convex hull, with the fractional item on the face.',
  },
  {
    title: 'Parallel fill',
    detail:
      'For massive inputs, selection algorithms (nth_element) can find the breakpoint ratio in O(n) expected time without fully sorting.',
  },
]

const takeaways = [
  'Fractional knapsack is solved optimally by sorting items by value density and filling greedily.',
  'The solution runs in O(n log n) time and constant extra space after sorting.',
  'Allowing fractions turns a hard combinatorial problem into a simple linear one.',
  'The fractional optimum is a tight upper bound for 0/1 knapsack.',
  'Precision, tie-breaking, and validity checks matter for correct implementations.',
]

export default function FractionalKnapsackPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Fractional Knapsack</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">
              X
            </Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Value density first: the greedy that is actually optimal</div>
              <p className="win95-text">
                Fractional knapsack allows taking partial items, making the objective linear and greedily solvable. Sorting by
                value-to-weight ratio and filling until capacity is exhausted gives the exact optimum. The fractional answer also
                upper-bounds the 0/1 knapsack solution, guiding branch-and-bound pruning. This page covers the greedy proof, pitfalls,
                and how to use the relaxation in harder variants.
              </p>
            </div>
            <Link to="/algoViz" className="win95-button" role="button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-fieldset">
            <legend>The big picture</legend>
            <div className="win95-panel">
              <p className="win95-text">
                By allowing fractional items, knapsack becomes a continuous optimization problem with a straightforward greedy
                solution. Ordering by value density ensures every unit of capacity is spent on the best available "price per unit."
                The last item may be partial; all earlier items are taken in full. The same logic underpins linear programming duality
                and serves as the canonical relaxation for 0/1 knapsack.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Historical context</legend>
            <div className="win95-grid win95-grid-2">
              {historicalMilestones.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
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
            <legend>How it works: problem variants</legend>
            <div className="win95-grid win95-grid-3">
              {problemVariants.map((block) => (
                <div key={block.heading} className="win95-panel">
                  <div className="win95-heading">{block.heading}</div>
                  <ul className="win95-list">
                    {block.bullets.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works: greedy workflow</legend>
            <div className="win95-grid win95-grid-2">
              {algorithmSteps.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                Correctness idea: in any optimal solution, if capacity is spent on a lower ratio item while a higher ratio item has
                remaining mass, swapping equal mass of the higher ratio item increases or preserves value. Repeating these exchanges
                reorders any optimum into the greedy order, proving greedy optimality.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Implementation notes</legend>
            <div className="win95-grid win95-grid-2">
              {implementationNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity analysis and tradeoffs</legend>
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
                Sorting dominates runtime; the greedy scan is linear. Unlike 0/1 knapsack, there is no exponential blowup. The
                fractional optimum is both exact for the divisible case and an upper bound for the indivisible case.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Real-world applications</legend>
            <div className="win95-grid win95-grid-2">
              {realWorldUses.map((item) => (
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

