import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

const historicalMilestones = [
  {
    title: 'Tri-section ideas in numerical search',
    detail:
      'Numerical methods for unimodal optimization use interval shrinking. Ternary search is a simple discrete analog to these mid-20th century techniques.',
  },
  {
    title: 'Generalization of binary search',
    detail:
      'Ternary search extends binary search by probing two midpoints instead of one, shrinking the interval by discarding one of three regions.',
  },
  {
    title: 'Competitive programming staple',
    detail:
      'It is popular for problems that ask for a maximum or minimum of a unimodal function without derivatives.',
  },
  {
    title: 'Golden section refinements',
    detail:
      'More advanced methods like golden section search reduce repeated evaluations, but ternary search remains a clear conceptual baseline.',
  },
]

const mentalModels = [
  {
    title: 'Two scouts, three regions',
    detail:
      'You place two scouts at one-third and two-thirds. Their reports tell you which third to discard.',
  },
  {
    title: 'Shrinking a spotlight',
    detail:
      'You keep the region that could still contain the target or peak, narrowing the spotlight on the answer.',
  },
  {
    title: 'Binary search plus one extra probe',
    detail:
      'The extra probe trades more comparisons for a slightly smaller remaining interval each step.',
  },
  {
    title: 'Hill hunting',
    detail:
      'For unimodal functions, you compare two heights and walk toward the higher slope until the peak remains in a small interval.',
  },
]

const workflowSteps = [
  {
    title: 'Pick two midpoints',
    detail:
      'Compute m1 and m2 so they split the current range into thirds. Keep integer rounding consistent for arrays.',
  },
  {
    title: 'Evaluate or compare',
    detail:
      'For arrays, compare target to arr[m1] and arr[m2]. For unimodal functions, compare f(m1) and f(m2).',
  },
  {
    title: 'Discard one region',
    detail:
      'One of the three segments cannot contain the answer. Remove it and keep the other two thirds.',
  },
  {
    title: 'Repeat until small',
    detail: 'Stop when the range is small enough, then finish with a linear scan or direct check.',
  },
  {
    title: 'Finalize precisely',
    detail:
      'On continuous domains, stop after enough iterations to meet precision and return the midpoint of the remaining interval.',
  },
]

const problemPatterns = [
  {
    title: 'Unimodal optimization',
    detail:
      'Maximize or minimize a function that increases then decreases (or vice versa) without derivatives.',
  },
  {
    title: 'Discrete peak finding',
    detail: 'Find the peak of a unimodal array when gradients are noisy or unavailable.',
  },
  {
    title: 'Parameter tuning',
    detail: 'Tune a scalar hyperparameter where performance rises to a peak and then falls.',
  },
  {
    title: 'Not for arbitrary arrays',
    detail: 'If data is not unimodal or sorted, ternary search can converge to the wrong answer.',
  },
  {
    title: 'Precision-bounded search',
    detail: 'Use when you can accept an approximate argmax/argmin within a tolerance.',
  },
]

const loopInvariants = [
  {
    title: 'Unimodal invariant',
    detail:
      'If the function is unimodal on [l, r], the global optimum remains within the retained interval after each step.',
  },
  {
    title: 'Array search invariant',
    detail:
      'If the target exists in a sorted array, it is always contained in the current [low, high] range.',
  },
  {
    title: 'Monotone region invariant',
    detail:
      'After comparing f(m1) and f(m2), one of the outer thirds is guaranteed not to contain the optimum.',
  },
]

const variants = [
  {
    title: 'Sorted array search',
    detail:
      'Use it like binary search but with two midpoints. It finds the index of a target value if it exists.',
  },
  {
    title: 'Unimodal optimization',
    detail:
      'Search for the maximum or minimum of a function that increases then decreases (or vice versa).',
  },
  {
    title: 'Discrete vs continuous',
    detail:
      'On integers, stop when the interval is small and scan. On reals, stop after fixed iterations or when precision is reached.',
  },
]

const complexityRows = [
  { label: 'Sorted array time', value: 'O(log n), but with more comparisons than binary search.' },
  { label: 'Unimodal function time', value: 'O(log n) iterations, two evaluations per step.' },
  { label: 'Extra space', value: 'O(1) iterative; O(log n) recursive stack.' },
  {
    label: 'Evaluations per step',
    value: '2 evaluations for functions; 2 to 4 comparisons for arrays.',
  },
]

const comparisonNotes = [
  {
    metric: 'Interval shrink',
    binary: 'Cuts range to 1/2',
    ternary: 'Cuts range to 2/3',
  },
  {
    metric: 'Comparisons per step',
    binary: '1 to 2',
    ternary: '2 to 4',
  },
  {
    metric: 'Typical use',
    binary: 'Sorted arrays',
    ternary: 'Unimodal peaks',
  },
]

const stepTrace = [
  {
    step: 'Setup',
    state: 'Array: [2, 5, 8, 12, 16, 23, 38, 56], target = 23',
    note: 'We want the index of 23 in a sorted array.',
  },
  {
    step: 'Compute midpoints',
    state: 'low = 0, high = 7, m1 = 2 (8), m2 = 5 (23)',
    note: 'Two probes split the range into thirds.',
  },
  {
    step: 'Compare and decide',
    state: 'arr[m2] equals target, return 5',
    note: 'If the target had been 12, we would keep the middle third.',
  },
  {
    step: 'Shrink for unimodal',
    state: 'If f(m1) < f(m2), move left to m1; else move right to m2',
    note: 'The higher value points toward the peak.',
  },
]

const examples = [
  {
    title: 'Ternary search on a sorted array',
    code: `function ternarySearch(arr, target):
    low = 0
    high = arr.length - 1
    while low <= high:
        m1 = low + Math.floor((high - low) / 3)
        m2 = high - Math.floor((high - low) / 3)
        if arr[m1] == target: return m1
        if arr[m2] == target: return m2
        if target < arr[m1]: high = m1 - 1
        else if target > arr[m2]: low = m2 + 1
        else:
            low = m1 + 1
            high = m2 - 1
    return -1`,
    explanation:
      'Two probes split the range into thirds. The target can only exist in one of the three segments.',
  },
  {
    title: 'Maximizing a unimodal function (continuous)',
    code: `function ternarySearchMax(f, left, right, steps):
    for i in 0..steps:
        m1 = left + (right - left) / 3
        m2 = right - (right - left) / 3
        if f(m1) < f(m2): left = m1
        else: right = m2
    return (left + right) / 2`,
    explanation:
      'For a unimodal function, the higher of f(m1) and f(m2) tells you where the peak lies.',
  },
  {
    title: 'Finding the peak in a discrete array',
    code: `// Unimodal array (strictly up then down)
function peakIndex(arr):
    left = 0
    right = arr.length - 1
    while right - left > 3:
        m1 = left + Math.floor((right - left) / 3)
        m2 = right - Math.floor((right - left) / 3)
        if arr[m1] < arr[m2]: left = m1
        else: right = m2
    return indexOfMax(arr, left, right)`,
    explanation: 'When the interval is small, a final scan is cheaper than more splits.',
  },
  {
    title: 'Minimizing a convex function',
    code: `function ternarySearchMin(f, left, right, steps):
    for i in 0..steps:
        m1 = left + (right - left) / 3
        m2 = right - (right - left) / 3
        if f(m1) > f(m2): left = m1
        else: right = m2
    return (left + right) / 2`,
    explanation: 'Flip the comparison to find a minimum on a convex curve.',
  },
]

const realWorldUses = [
  {
    context: 'Latency tuning',
    detail:
      'Pick a configuration value that minimizes a latency curve that rises after a sweet spot.',
  },
  {
    context: 'Graphics and animation',
    detail:
      'Choose a parameter that maximizes a quality metric, such as smoothness or visibility, on a unimodal curve.',
  },
  {
    context: 'Signal processing',
    detail: 'Find the peak frequency or best window size when the response curve is unimodal.',
  },
  {
    context: 'Game design balancing',
    detail:
      'Tune a value to maximize engagement or fairness when the score behaves like a single hill.',
  },
  {
    context: 'Operations research',
    detail: 'Select batch sizes or thresholds that minimize cost in unimodal cost curves.',
  },
]

const inputSensitivity = [
  {
    title: 'Non-unimodal functions',
    detail:
      'Multiple peaks break the invariant. Ternary search can converge to a local peak instead of the global one.',
  },
  {
    title: 'Flat plateaus',
    detail:
      'If the function is flat across a range, ties require careful handling; shrink both sides evenly.',
  },
  {
    title: 'Noisy evaluations',
    detail: 'Noise can mislead comparisons; smoothing or averaging evaluations improves stability.',
  },
  {
    title: 'Sorted arrays',
    detail: 'Works, but binary search is usually faster due to fewer comparisons.',
  },
]

const performanceProfile = [
  {
    title: 'Iteration count',
    detail:
      'Each step keeps two thirds of the interval, so convergence is logarithmic but slower than binary for lookup.',
  },
  {
    title: 'Evaluation cost',
    detail:
      'Function evaluations dominate runtime. If f(x) is expensive, consider golden section search.',
  },
  {
    title: 'Precision control',
    detail: 'Choose steps based on desired error: more steps yield tighter intervals.',
  },
  {
    title: 'Deterministic control flow',
    detail: 'Simple loop structure makes it easy to reason about and test.',
  },
]

const comparisonTable = [
  {
    algorithm: 'Binary search',
    time: 'O(log n)',
    space: 'O(1)',
    bestFor: 'Sorted arrays',
    notes: 'Fewer comparisons than ternary in practice.',
  },
  {
    algorithm: 'Ternary search',
    time: 'O(log n)',
    space: 'O(1)',
    bestFor: 'Unimodal peaks',
    notes: 'Two probes per step; best for optimization tasks.',
  },
  {
    algorithm: 'Golden section',
    time: 'O(log n)',
    space: 'O(1)',
    bestFor: 'Expensive f(x)',
    notes: 'Reuses evaluations to reduce function calls.',
  },
  {
    algorithm: 'Linear scan',
    time: 'O(n)',
    space: 'O(1)',
    bestFor: 'Tiny ranges',
    notes: 'Used as a finish when interval is small.',
  },
]

const variantsAndTweaks = [
  {
    title: 'Discrete finish scan',
    detail: 'Stop once the range is smaller than a threshold and scan for the exact best index.',
  },
  {
    title: 'Fixed-iteration search',
    detail: 'For real numbers, run a fixed number of iterations to guarantee precision.',
  },
  {
    title: 'Caching evaluations',
    detail: 'Store f(m1) and f(m2) when possible to avoid redundant work in expensive functions.',
  },
  {
    title: 'Hybrid with golden section',
    detail: 'Switch to golden section for expensive functions to reduce evaluation count.',
  },
]

const pitfalls = [
  'Using ternary search on data that is not unimodal. It can converge to the wrong region.',
  'Expecting it to beat binary search on sorted arrays. It usually does more comparisons.',
  'Stopping too early for continuous search and returning low precision results.',
  'Rounding midpoints incorrectly on integers, which can lead to infinite loops.',
  'Recomputing f(m1) and f(m2) with expensive functions without caching.',
  'Ignoring plateaus: if f(m1) == f(m2), shrink both sides carefully to avoid stalling.',
]

const decisionGuidance = [
  'Use it for unimodal functions when derivatives are unavailable or noisy.',
  'Use it for peak finding in unimodal arrays if you prefer a simple, robust method.',
  'Prefer binary search for plain sorted array lookup.',
  'Use golden section search when function evaluations are costly and you want fewer repeats.',
  'If the interval is tiny, just scan: it is simpler and often faster.',
]

const implementationTips = [
  {
    title: 'Handle equal values',
    detail: 'If f(m1) == f(m2), move both bounds inward to guarantee progress.',
  },
  {
    title: 'Choose a stopping rule',
    detail: 'For floats, stop after N iterations or when right-left is below epsilon.',
  },
  {
    title: 'Avoid overflow',
    detail: 'Compute m1 and m2 from low and high using differences, not (low+high)/3.',
  },
  {
    title: 'Scan small ranges',
    detail: 'For integers, finish with a scan when the range is under 3-5 elements.',
  },
  {
    title: 'Memoize f(x)',
    detail: 'When f(x) is expensive, cache evaluations to avoid recomputation.',
  },
]

const advancedInsights = [
  {
    title: 'Golden section optimization',
    detail:
      'Golden section search reuses one evaluation per step, reducing cost when f(x) is expensive to compute.',
  },
  {
    title: 'Caching evaluations',
    detail:
      'If f(x) is expensive, cache f(m1) and f(m2). This is especially helpful if you shrink the interval slowly.',
  },
  {
    title: 'Convexity vs unimodality',
    detail:
      'A convex function has a single minimum. Ternary search works for convex or concave functions over a closed interval.',
  },
  {
    title: 'Discrete precision control',
    detail:
      'For integers, stop when the interval is smaller than a threshold and scan. This avoids off-by-one errors.',
  },
  {
    title: 'Floating point stability',
    detail:
      'For long ranges and high precision, use epsilon-based stopping instead of a fixed loop count.',
  },
]

const takeaways = [
  'Ternary search shrinks an interval by comparing two midpoints and discarding one third.',
  'It is best for unimodal functions, not for basic sorted array lookup.',
  'It trades extra comparisons for a simple and reliable selection of the correct region.',
  'Precision and correctness depend on a good stopping rule and unimodality.',
  'References: numerical optimization texts, competitive programming guides, and golden section search notes.',
]

const glossary = [
  {
    term: 'Ternary search',
    definition:
      'A search strategy that probes two interior points, then discards one third of the interval each step.',
  },
  {
    term: 'Unimodal function',
    definition:
      'A function with a single peak (for maximum) or a single valley (for minimum) over the searched interval.',
  },
  {
    term: 'Midpoints m1 and m2',
    definition:
      'The one-third and two-thirds probe positions used to compare and shrink the current interval.',
  },
  {
    term: 'Invariant',
    definition:
      'A property that remains true after each iteration, such as the optimum staying inside the retained range.',
  },
  {
    term: 'Discrete finish scan',
    definition:
      'A final linear scan on a small integer interval to avoid off-by-one issues and return the exact best index.',
  },
  {
    term: 'Golden section search',
    definition:
      'A related optimization method that reuses one function evaluation per step for cheaper expensive-function searches.',
  },
  {
    term: 'Epsilon stopping rule',
    definition:
      'A floating-point termination rule that stops when the interval width is smaller than a target tolerance.',
  },
  {
    term: 'Plateau',
    definition:
      'A flat region where neighboring points have equal values and tie-handling is needed for progress.',
  },
  {
    term: 'Argmax / Argmin',
    definition: 'The input value where a function reaches its maximum or minimum.',
  },
  {
    term: 'Sorted-array ternary lookup',
    definition:
      'Using ternary search to find an exact key in a sorted array, usually less efficient than binary search.',
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
    { id: 'bp-models', label: 'Mental Models' },
    { id: 'bp-patterns', label: 'Problem Patterns' },
    { id: 'bp-where', label: 'Where It Applies' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-workflow', label: 'Ternary Loop Workflow' },
    { id: 'core-invariants', label: 'Loop Invariants' },
    { id: 'core-complexity', label: 'Complexity and Tradeoffs' },
    { id: 'core-binary-ternary', label: 'Binary vs Ternary' },
    { id: 'core-sensitivity', label: 'Input Sensitivity' },
    { id: 'core-profile', label: 'Performance Profile' },
    { id: 'core-compare', label: 'Compare and Contrast' },
    { id: 'core-uses', label: 'Real-World Applications' },
    { id: 'core-variants', label: 'Variants and Tweaks' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-tips', label: 'Implementation Tips' },
    { id: 'core-decisions', label: 'When to Use It' },
    { id: 'core-advanced', label: 'Advanced Insights' },
  ],
  examples: [
    { id: 'ex-trace', label: 'Worked Trace' },
    { id: 'ex-code', label: 'Practical Examples' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function TernarySearchPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Ternary Search',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Ternary Search"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Ternary Search</h1>
      <p>
        Ternary search splits a range into three segments using two midpoints and removes the
        segment that cannot contain the answer. It is most valuable when searching for the maximum
        or minimum of a unimodal function, where it converges quickly to the peak without requiring
        derivatives.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            <p>
              Binary search asks one question and cuts the range in half. Ternary search asks two
              questions, keeps two thirds, and repeats. That tradeoff usually makes it worse for
              plain sorted arrays, but it shines for unimodal optimization, where comparisons are
              replaced by function evaluations.
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
          <section id="bp-models" className="bin98-section">
            <h2 className="bin98-heading">Mental Models</h2>
            {mentalModels.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="bp-patterns" className="bin98-section">
            <h2 className="bin98-heading">Problem Patterns</h2>
            {problemPatterns.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="bp-where" className="bin98-section">
            <h2 className="bin98-heading">Where It Applies</h2>
            {variants.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
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
          <section id="core-workflow" className="bin98-section">
            <h2 className="bin98-heading">How It Works: The Ternary Loop</h2>
            {workflowSteps.map((step) => (
              <p key={step.title}>
                <strong>{step.title}:</strong> {step.detail}
              </p>
            ))}
          </section>
          <section id="core-invariants" className="bin98-section">
            <h2 className="bin98-heading">Loop Invariants (Why It Is Correct)</h2>
            {loopInvariants.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-complexity" className="bin98-section">
            <h2 className="bin98-heading">Complexity Analysis and Tradeoffs</h2>
            {complexityRows.map((row) => (
              <p key={row.label}>
                <strong>{row.label}:</strong> {row.value}
              </p>
            ))}
            <p>
              On sorted arrays, binary search is almost always better. Ternary search is a clean
              tool for unimodal optimization, where the cost is dominated by function evaluations
              rather than comparisons.
            </p>
          </section>
          <section id="core-binary-ternary" className="bin98-section">
            <h2 className="bin98-heading">Binary vs Ternary at a Glance</h2>
            <table className="bin98-table">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Binary</th>
                  <th>Ternary</th>
                </tr>
              </thead>
              <tbody>
                {comparisonNotes.map((row) => (
                  <tr key={row.metric}>
                    <td>{row.metric}</td>
                    <td>{row.binary}</td>
                    <td>{row.ternary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          <section id="core-sensitivity" className="bin98-section">
            <h2 className="bin98-heading">Input Sensitivity</h2>
            {inputSensitivity.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-profile" className="bin98-section">
            <h2 className="bin98-heading">Performance Profile</h2>
            {performanceProfile.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-compare" className="bin98-section">
            <h2 className="bin98-heading">Compare and Contrast</h2>
            <table className="bin98-table">
              <thead>
                <tr>
                  <th>Algorithm</th>
                  <th>Time</th>
                  <th>Space</th>
                  <th>Best for</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {comparisonTable.map((row) => (
                  <tr key={row.algorithm}>
                    <td>{row.algorithm}</td>
                    <td>{row.time}</td>
                    <td>{row.space}</td>
                    <td>{row.bestFor}</td>
                    <td>{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          <section id="core-uses" className="bin98-section">
            <h2 className="bin98-heading">Real-World Applications</h2>
            {realWorldUses.map((item) => (
              <p key={item.context}>
                <strong>{item.context}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-variants" className="bin98-section">
            <h2 className="bin98-heading">Variants and Performance Tweaks</h2>
            {variantsAndTweaks.map((item) => (
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
          <section id="core-tips" className="bin98-section">
            <h2 className="bin98-heading">Implementation Tips</h2>
            {implementationTips.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-decisions" className="bin98-section">
            <h2 className="bin98-heading">When to Use It</h2>
            <ol>
              {decisionGuidance.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>
          <section id="core-advanced" className="bin98-section">
            <h2 className="bin98-heading">Advanced Insights</h2>
            {advancedInsights.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
        </>
      )}

      {activeTab === 'examples' && (
        <>
          <section id="ex-trace" className="bin98-section">
            <h2 className="bin98-heading">Worked Trace on a Tiny Example</h2>
            <ol>
              {stepTrace.map((item) => (
                <li key={item.step}>
                  <p>
                    <strong>{item.step}:</strong> {item.note}
                  </p>
                  <p className="ternary98-state">{item.state}</p>
                </li>
              ))}
            </ol>
          </section>
          <section id="ex-code" className="bin98-section">
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
        </>
      )}

      {activeTab === 'glossary' && (
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {glossary.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
