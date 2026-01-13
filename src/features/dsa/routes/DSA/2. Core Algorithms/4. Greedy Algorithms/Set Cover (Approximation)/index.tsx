import type { JSX } from 'react'
import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'


const historicalMilestones = [
  {
    title: 'Set Cover formalized as NP-hard (1972)',
    detail:
      'Richard Karp listed Set Cover among the classic NP-complete problems, establishing it as a benchmark for approximation algorithms.',
  },
  {
    title: 'Greedy approximation bound by Chvatal (1979)',
    detail:
      'The greedy rule that picks the most uncovered elements per step is proven to achieve an H_n approximation, where n is the universe size.',
  },
  {
    title: 'Hardness near ln n (1998)',
    detail:
      'Feige showed that, unless P=NP, no polynomial-time algorithm can guarantee a better approximation than (1 - o(1)) ln n.',
  },
  {
    title: 'Modern large-scale uses (2000s+)',
    detail:
      'Set Cover models sensor placement, test suite minimization, and feature selection, making greedy approximations standard in practice.',
  },
]

const mentalModels = [
  {
    title: 'Coupons and baskets',
    detail:
      'Each element is a coupon you must collect; each set is a basket of coupons. Greedy keeps picking the basket that adds the most new coupons.',
  },
  {
    title: 'Price per uncovered element',
    detail:
      'If sets are weighted, think of cost divided by new coverage. Greedy chooses the cheapest price per newly covered element.',
  },
  {
    title: 'Covering a map with beacons',
    detail:
      'Imagine placing towers to cover points on a map. Each tower covers a region; greedy places the tower that lights up the most dark points.',
  },
]

const coreConcepts = [
  {
    heading: 'Problem definition',
    bullets: [
      'Universe U: the elements that must be covered.',
      'Collection of sets S1...Sk where each Si is a subset of U.',
      'Goal: pick the smallest number of sets whose union equals U.',
      'Weighted variant: each set has a cost; goal is minimum total cost.',
    ],
  },
  {
    heading: 'Greedy rule',
    bullets: [
      'Repeatedly choose the set that covers the most uncovered elements.',
      'For weighted cover, choose the best ratio: cost / newly covered elements.',
      'Stop when all elements are covered or no progress is possible.',
    ],
  },
  {
    heading: 'Why approximation matters',
    bullets: [
      'Exact solutions are exponential in the worst case (NP-hard).',
      'Greedy is fast and simple with a provable bound.',
      'Worst-case gap is logarithmic; often close to optimal in practice.',
    ],
  },
]

const algorithmSteps = [
  {
    title: 'Initialize',
    detail:
      'Start with all elements uncovered and an empty solution. Track which elements are covered and how many new ones each set would add.',
  },
  {
    title: 'Pick best set',
    detail:
      'Choose the set that covers the largest number of uncovered elements. If weighted, maximize newly covered per unit cost.',
  },
  {
    title: 'Update coverage',
    detail:
      'Mark the chosen set as selected and remove its elements from the uncovered pool. Recompute coverage gains for remaining sets.',
  },
  {
    title: 'Terminate',
    detail:
      'Stop when all elements are covered or no remaining set adds new elements. The selected sets are the greedy solution.',
  },
]

const approximationNotes = [
  {
    title: 'Harmonic approximation',
    detail:
      'Greedy achieves at most H_n times the optimum, where H_n = 1 + 1/2 + ... + 1/n.',
  },
  {
    title: 'Tight up to constants',
    detail:
      'No polynomial-time algorithm can beat (1 - o(1)) ln n unless P = NP, so greedy is near the best possible in theory.',
  },
  {
    title: 'Weighted guarantee',
    detail:
      'The same H_n bound applies to the weighted variant when using cost-per-new-element greedy.',
  },
  {
    title: 'Practical behavior',
    detail:
      'Real-world instances often have structure (overlaps, clusters) that make greedy solutions close to optimal.',
  },
]

const complexityNotes = [
  {
    title: 'Time cost',
    detail:
      'Naive implementation: O(k * n) per iteration. With k sets and n elements, worst-case O(k * n * log n) if using a heap.',
  },
  {
    title: 'Space cost',
    detail:
      'Store sets as bitsets or boolean arrays for fast membership tests. Space O(k * n) in dense form, less with sparse lists.',
  },
  {
    title: 'Optimization tips',
    detail:
      'Use bitsets and popcount for fast coverage updates. Maintain uncovered elements and recompute only affected sets.',
  },
]

const realWorldUses = [
  {
    context: 'Test suite minimization',
    detail:
      'Each test covers a set of code paths. Greedy picks tests that cover the most uncovered paths to reduce runtime while retaining coverage.',
  },
  {
    context: 'Sensor placement',
    detail:
      'Sensors cover regions or targets. The goal is to place the fewest sensors that cover all points of interest.',
  },
  {
    context: 'Feature selection',
    detail:
      'Each feature explains or covers a subset of requirements. Greedy picks the most informative features under a budget.',
  },
  {
    context: 'Data summarization',
    detail:
      'Select a small set of representative items that cover key topics or elements in a dataset.',
  },
]

const examples = [
  {
    title: 'Worked example (unweighted)',
    code: `Universe U = {1,2,3,4,5,6,7,8}
Sets:
  A = {1,2,3,4}
  B = {3,4,5}
  C = {5,6,7}
  D = {7,8}
  E = {2,8}

Greedy steps:
  Pick A (covers 4 new elements)
  Remaining uncovered = {5,6,7,8}
  Pick C (covers 3 new elements)
  Remaining uncovered = {8}
  Pick D or E (covers 1 new element)
Solution = {A, C, D} (or {A, C, E})`,
    explanation:
      'Greedy chooses the largest new coverage each step. It uses three sets here, which is optimal for this instance.',
  },
  {
    title: 'Weighted variant intuition',
    code: `Weighted sets (cost in brackets):
  A = {1,2,3,4} [4]
  B = {3,4,5} [2]
  C = {5,6,7} [2]
  D = {7,8} [1]
  E = {2,8} [1]

Greedy ratio = cost / newly covered:
  A: 4/4 = 1.0
  B: 2/3 = 0.67
  C: 2/3 = 0.67
  D: 1/2 = 0.5
Pick D first, then recompute ratios.`,
    explanation:
      'Weighted greedy chooses the lowest cost per new element. This often differs from the unweighted choice and leads to cheaper solutions.',
  },
  {
    title: 'Greedy pseudocode',
    code: `function greedySetCover(U, sets):
    covered = empty set
    chosen = []
    while covered != U:
        best = null
        bestGain = 0
        for s in sets:
            gain = |s - covered|
            if gain > bestGain:
                bestGain = gain
                best = s
        if bestGain == 0: break
        chosen.append(best)
        covered = covered union best
    return chosen`,
    explanation:
      'The core loop evaluates how many new elements each set adds, then chooses the best. Weighted versions replace gain with gain per cost.',
  },
]

const pitfalls = [
  'Forgetting to recompute gains after adding a set, which makes later choices incorrect.',
  'Using raw set size instead of newly covered size, which overestimates redundant sets.',
  'Ignoring weights in the weighted variant; the correct rule is cost per new element.',
  'Stopping too early when the remaining uncovered elements are in disjoint or rare sets.',
  'Assuming greedy is optimal; it is an approximation with a provable bound.',
]

const decisionGuidance = [
  'Use greedy when exact optimization is too slow and you need a solution quickly.',
  'Prefer greedy when universe size is large and sets overlap heavily.',
  'Use weighted greedy when costs differ; avoid unweighted heuristics in that case.',
  'If you need exact minimum, switch to integer programming or branch and bound.',
  'If coverage is optional or partial, consider maximum coverage or budgeted variants.',
]

const advancedInsights = [
  {
    title: 'Dual fitting intuition',
    detail:
      'The H_n bound can be understood via dual fitting: greedy assigns a price to each covered element and the total price upper-bounds the greedy cost.',
  },
  {
    title: 'Bitset acceleration',
    detail:
      'Represent each set as a bitset and use popcount to compute gain quickly. This reduces iteration time in dense universes.',
  },
  {
    title: 'Lazy evaluation',
    detail:
      'Maintain a max-heap of sets by gain. Recompute gain only when a set rises to the top to avoid scanning every set each step.',
  },
  {
    title: 'Tight instances',
    detail:
      'There are instances where greedy returns about ln n times the optimal number of sets, matching the theoretical bound.',
  },
]

const takeaways = [
  'Set Cover is NP-hard, so approximation is the practical default.',
  'Greedy is simple, fast, and nearly optimal in a theoretical sense.',
  'Correctness relies on counting only newly covered elements each step.',
  'Weighted and unweighted versions use different selection criteria.',
]

export default function SetCoverApproximationPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Set Cover (Approximation)</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Greedy selection for a classic NP-hard covering problem</div>
              <p className="win95-text">
                Set Cover asks for the smallest collection of sets whose union covers every element in a universe. The exact solution is
                NP-hard, but the greedy approximation is fast, intuitive, and has a tight theoretical guarantee. This page explains the
                problem definition, the greedy rule, why it works, and how to implement it responsibly.
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
                Set Cover models decisions where each action covers multiple requirements and you want the fewest actions overall.
                The greedy approximation repeatedly chooses the most valuable set at the moment, guaranteeing a solution within a
                logarithmic factor of the optimal size.
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
            <legend>How it works: the greedy approach</legend>
            <div className="win95-grid win95-grid-3">
              {coreConcepts.map((block) => (
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
            <legend>Algorithm steps</legend>
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
                The key invariant: each step must measure only newly covered elements. Counting already covered elements makes greedy
                appear better than it is and breaks the approximation guarantee.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Approximation guarantees</legend>
            <div className="win95-grid win95-grid-2">
              {approximationNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel">
              <pre className="win95-code">
                <code>{'H_n = 1 + 1/2 + 1/3 + ... + 1/n  <=  1 + ln(n)'}</code>
              </pre>
              <p className="win95-text">
                This harmonic bound quantifies how far greedy can be from optimal. The bound is tight up to constants, which is why
                greedy remains a gold standard for approximation.
              </p>
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
                Greedy is often I/O and memory bound. Bitsets, sparse lists, and incremental gain updates can make the difference
                between a toy implementation and a production-quality solver.
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
            <legend>Greedy vs optimal (quick intuition)</legend>
            <div className="win95-panel">
              <table className="win95-table">
                <thead>
                  <tr>
                    <th>Aspect</th>
                    <th>Greedy approximation</th>
                    <th>Exact optimization</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Quality</td>
                    <td>Within H_n factor of optimal</td>
                    <td>Optimal solution</td>
                  </tr>
                  <tr>
                    <td>Runtime</td>
                    <td>Polynomial (fast)</td>
                    <td>Exponential worst case</td>
                  </tr>
                  <tr>
                    <td>Practical scale</td>
                    <td>Large universes and many sets</td>
                    <td>Small to medium instances</td>
                  </tr>
                </tbody>
              </table>
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

