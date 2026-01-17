import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

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
    detail:
      'Stop when the range is small enough, then finish with a linear scan or direct check.',
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
    detail:
      'Find the peak of a unimodal array when gradients are noisy or unavailable.',
  },
  {
    title: 'Parameter tuning',
    detail:
      'Tune a scalar hyperparameter where performance rises to a peak and then falls.',
  },
  {
    title: 'Not for arbitrary arrays',
    detail:
      'If data is not unimodal or sorted, ternary search can converge to the wrong answer.',
  },
  {
    title: 'Precision-bounded search',
    detail:
      'Use when you can accept an approximate argmax/argmin within a tolerance.',
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
  { label: 'Evaluations per step', value: '2 evaluations for functions; 2 to 4 comparisons for arrays.' },
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
    explanation:
      'When the interval is small, a final scan is cheaper than more splits.',
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
    explanation:
      'Flip the comparison to find a minimum on a convex curve.',
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
    detail:
      'Find the peak frequency or best window size when the response curve is unimodal.',
  },
  {
    context: 'Game design balancing',
    detail:
      'Tune a value to maximize engagement or fairness when the score behaves like a single hill.',
  },
  {
    context: 'Operations research',
    detail:
      'Select batch sizes or thresholds that minimize cost in unimodal cost curves.',
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
    detail:
      'Noise can mislead comparisons; smoothing or averaging evaluations improves stability.',
  },
  {
    title: 'Sorted arrays',
    detail:
      'Works, but binary search is usually faster due to fewer comparisons.',
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
    detail:
      'Choose steps based on desired error: more steps yield tighter intervals.',
  },
  {
    title: 'Deterministic control flow',
    detail:
      'Simple loop structure makes it easy to reason about and test.',
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
    detail:
      'Stop once the range is smaller than a threshold and scan for the exact best index.',
  },
  {
    title: 'Fixed-iteration search',
    detail:
      'For real numbers, run a fixed number of iterations to guarantee precision.',
  },
  {
    title: 'Caching evaluations',
    detail:
      'Store f(m1) and f(m2) when possible to avoid redundant work in expensive functions.',
  },
  {
    title: 'Hybrid with golden section',
    detail:
      'Switch to golden section for expensive functions to reduce evaluation count.',
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
    detail:
      'If f(m1) == f(m2), move both bounds inward to guarantee progress.',
  },
  {
    title: 'Choose a stopping rule',
    detail:
      'For floats, stop after N iterations or when right-left is below epsilon.',
  },
  {
    title: 'Avoid overflow',
    detail:
      'Compute m1 and m2 from low and high using differences, not (low+high)/3.',
  },
  {
    title: 'Scan small ranges',
    detail:
      'For integers, finish with a scan when the range is under 3-5 elements.',
  },
  {
    title: 'Memoize f(x)',
    detail:
      'When f(x) is expensive, cache evaluations to avoid recomputation.',
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

export default function TernarySearchPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Ternary Search</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Two midpoints, one discarded region, and fast convergence on unimodal peaks</div>
              <p className="win95-text">
                Ternary search splits a range into three segments using two midpoints and removes the segment that cannot contain the
                answer. It is most valuable when searching for the maximum or minimum of a unimodal function, where it converges
                quickly to the peak without requiring derivatives.
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
                Binary search asks one question and cuts the range in half. Ternary search asks two questions, keeps two thirds,
                and repeats. That tradeoff usually makes it worse for plain sorted arrays, but it shines for unimodal optimization,
                where comparisons are replaced by function evaluations.
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
            <legend>How it works: the ternary loop</legend>
            <div className="win95-grid win95-grid-2">
              {workflowSteps.map((step) => (
                <div key={step.title} className="win95-panel">
                  <div className="win95-heading">{step.title}</div>
                  <p className="win95-text">{step.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How to think about similar problems</legend>
            <div className="win95-grid win95-grid-3">
              {problemPatterns.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Loop invariants (why it is correct)</legend>
            <div className="win95-grid win95-grid-3">
              {loopInvariants.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Where it applies</legend>
            <div className="win95-grid win95-grid-3">
              {variants.map((item) => (
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
              {complexityRows.map((row) => (
                <div key={row.label} className="win95-panel">
                  <div className="win95-heading">{row.label}</div>
                  <p className="win95-text">{row.value}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                On sorted arrays, binary search is almost always better. Ternary search is a clean tool for unimodal optimization,
                where the cost is dominated by function evaluations rather than comparisons.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Binary vs ternary at a glance</legend>
            <table className="win95-table">
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
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Worked trace on a tiny example</legend>
            <div className="win95-stack">
              {stepTrace.map((item) => (
                <div key={item.step} className="win95-panel">
                  <div className="win95-heading">{item.step}</div>
                  <pre className="win95-code">
                    <code>{item.state}</code>
                  </pre>
                  <p className="win95-text">{item.note}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Input sensitivity</legend>
            <div className="win95-grid win95-grid-2">
              {inputSensitivity.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Performance profile</legend>
            <div className="win95-grid win95-grid-2">
              {performanceProfile.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Compare and contrast</legend>
            <div className="win95-panel">
              <table className="win95-table">
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
            <legend>Variants and performance tweaks</legend>
            <div className="win95-grid win95-grid-2">
              {variantsAndTweaks.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
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
            <legend>Implementation tips</legend>
            <div className="win95-grid win95-grid-2">
              {implementationTips.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
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
