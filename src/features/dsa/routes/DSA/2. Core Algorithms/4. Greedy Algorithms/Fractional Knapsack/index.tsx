import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

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
    detail:
      'Highest value density items considered first; stable ties by lower weight or higher value.',
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
    detail:
      'Use the fractional value as an admissible upper bound for branch-and-bound in 0/1 knapsack.',
  },
]

const implementationNotes = [
  {
    title: 'Precision',
    detail:
      'Use floating point for ratios and fractional weights; beware of accumulated rounding on the final value.',
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
    detail:
      'Greedy is exact because the problem is a linear program; the sorted order satisfies complementary slackness.',
  },
  {
    title: 'Contrast with 0/1',
    detail:
      '0/1 knapsack is NP-hard; fractional is easy. The gap shows how integrality changes complexity.',
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
    detail:
      'Invest fractions of budget into assets ranked by expected return per risk-weighted unit.',
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
  'Using the same greedy for 0/1 knapsack; ratio order is not optimal when fractions are disallowed.',
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
    detail:
      'Small changes in capacity or ratios only affect the breakpoint item where the fraction occurs.',
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

const quickGlossary = [
  {
    term: 'Value density',
    definition: 'The value-to-weight ratio used to rank items for greedy filling.',
  },
  {
    term: 'Breakpoint item',
    definition:
      'The item taken fractionally when remaining capacity is smaller than its full weight.',
  },
  {
    term: 'LP relaxation',
    definition:
      'Version of knapsack where binary selection variables are relaxed to continuous fractions.',
  },
  {
    term: 'Complementary slackness',
    definition: 'LP optimality condition that explains why ratio-ordered greedy is exact here.',
  },
  {
    term: 'Admissible upper bound',
    definition: 'A bound that never underestimates the true optimum, used for pruning search.',
  },
  {
    term: '0/1 knapsack',
    definition: 'Indivisible-item variant where each item is either fully selected or excluded.',
  },
  {
    term: 'Stable tie-breaking',
    definition: 'Deterministic ordering for equal ratios to keep outputs reproducible.',
  },
  {
    term: 'Divisible resource',
    definition: 'Resource model where partial allocation of an item is allowed.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-history', label: 'Historical Context' },
    { id: 'bp-real-world', label: 'Real-World Applications' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-mental-models', label: 'Mental Models' },
    { id: 'core-variants', label: 'Problem Variants' },
    { id: 'core-workflow', label: 'Greedy Workflow' },
    { id: 'core-implementation', label: 'Implementation Notes' },
    { id: 'core-complexity', label: 'Complexity and Tradeoffs' },
    { id: 'core-advanced', label: 'Advanced Insights' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-guidance', label: 'When to Use It' },
  ],
  examples: [{ id: 'ex-practical', label: 'Practical Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function FractionalKnapsackPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Fractional Knapsack',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Fractional Knapsack"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Fractional Knapsack</h1>
      <p>
        Fractional knapsack allows taking partial items, making the objective linear and greedily
        solvable. Sorting by value-to-weight ratio and filling until capacity is exhausted gives the
        exact optimum.
      </p>
      <p>
        The fractional answer also upper-bounds the 0/1 knapsack solution, guiding branch-and-bound
        pruning. This page covers the greedy proof, pitfalls, and how to use the relaxation in
        harder variants.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            <p>
              By allowing fractional items, knapsack becomes a continuous optimization problem with
              a straightforward greedy solution. Ordering by value density ensures every unit of
              capacity is spent on the best available price per unit.
            </p>
            <p>
              The last item may be partial; all earlier items are taken in full. The same logic
              underpins linear programming duality and serves as the canonical relaxation for 0/1
              knapsack.
            </p>
          </section>
          <hr className="bin98-divider" />
          <section id="bp-history" className="bin98-section">
            <h2 className="bin98-heading">Historical Context</h2>
            {historicalMilestones.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-real-world" className="bin98-section">
            <h2 className="bin98-heading">Real-World Applications</h2>
            {realWorldUses.map((item) => (
              <p key={item.context}>
                <strong>{item.context}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key Takeaways</h2>
            <ul>
              {takeaways.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {activeTab === 'core-concepts' && (
        <>
          <section id="core-mental-models" className="bin98-section">
            <h2 className="bin98-heading">Mental Models</h2>
            {mentalModels.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>
          <section id="core-variants" className="bin98-section">
            <h2 className="bin98-heading">Problem Variants</h2>
            {problemVariants.map((item) => (
              <div key={item.heading}>
                <h3 className="bin98-subheading">{item.heading}</h3>
                <ul>
                  {item.bullets.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
          <section id="core-workflow" className="bin98-section">
            <h2 className="bin98-heading">Greedy Workflow</h2>
            {algorithmSteps.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
            <p>
              Correctness idea: in any optimal solution, if capacity is spent on a lower ratio item
              while a higher ratio item has remaining mass, swapping equal mass of the higher ratio
              item increases or preserves value. Repeating these exchanges reorders any optimum into
              the greedy order, proving greedy optimality.
            </p>
          </section>
          <section id="core-implementation" className="bin98-section">
            <h2 className="bin98-heading">Implementation Notes</h2>
            {implementationNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-complexity" className="bin98-section">
            <h2 className="bin98-heading">Complexity and Tradeoffs</h2>
            {complexityNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
            <p>
              Sorting dominates runtime; the greedy scan is linear. Unlike 0/1 knapsack, there is no
              exponential blowup. The fractional optimum is both exact for the divisible case and an
              upper bound for the indivisible case.
            </p>
          </section>
          <section id="core-advanced" className="bin98-section">
            <h2 className="bin98-heading">Advanced Insights</h2>
            {advancedInsights.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-pitfalls" className="bin98-section">
            <h2 className="bin98-heading">Common Pitfalls</h2>
            <ul>
              {pitfalls.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section id="core-guidance" className="bin98-section">
            <h2 className="bin98-heading">When to Use It</h2>
            <ol>
              {decisionGuidance.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>
        </>
      )}

      {activeTab === 'examples' && (
        <section id="ex-practical" className="bin98-section">
          <h2 className="bin98-heading">Practical Examples</h2>
          {examples.map((example) => (
            <div key={example.title}>
              <h3 className="bin98-subheading">{example.title}</h3>
              <div className="bin98-codebox">
                <code>{example.code.trim()}</code>
              </div>
              <p>{example.explanation}</p>
            </div>
          ))}
        </section>
      )}

      {activeTab === 'glossary' && (
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {quickGlossary.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
