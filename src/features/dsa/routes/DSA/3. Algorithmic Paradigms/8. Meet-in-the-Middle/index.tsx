import type { JSX } from 'react'
import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

export default function MeetInTheMiddlePage(): JSX.Element {
  

  const overviewPanels = [
    {
      title: 'What it is',
      detail:
        'Meet-in-the-Middle (MITM) splits a problem into two halves, solves each half, then combines the results to reconstruct full solutions.',
    },
    {
      title: 'Why it matters',
      detail:
        'Many exponential searches become feasible when 2^n is reduced to roughly 2^(n/2) per side, trading memory for time.',
    },
    {
      title: 'Where it shines',
      detail:
        'Subset sum, knapsack variants, and combinational problems where two partial computations can be merged by sorting or hashing.',
    },
  ]

  const mentalModels = [
    {
      title: 'Two scouts, one rendezvous',
      detail:
        'Instead of exploring all paths from one end, send two scouts from both ends and let them meet in the middle.',
    },
    {
      title: 'Split the exponent',
      detail:
        'Exponential cost becomes two smaller exponentials. 2^n becomes 2^(n/2) + 2^(n/2), which is a massive reduction.',
    },
    {
      title: 'Precompute then combine',
      detail:
        'Generate all possibilities on the left, all on the right, then combine with search, sort, or hashing.',
    },
  ]

  const algorithmSteps = [
    {
      heading: '1) Split the problem',
      bullets: [
        'Partition input into two halves, often equal size.',
        'Define how a partial solution on each side will be represented.',
      ],
    },
    {
      heading: '2) Enumerate each half',
      bullets: [
        'Generate all candidate partial results for each half.',
        'Store metadata needed to reconstruct full solutions.',
      ],
    },
    {
      heading: '3) Normalize or sort',
      bullets: [
        'Sort results by key or store in a hash map.',
        'If multiple partials yield the same key, keep best or all.',
      ],
    },
    {
      heading: '4) Combine efficiently',
      bullets: [
        'Use two-pointer, binary search, or hashing to find complements.',
        'Track feasibility or optimization objective while merging.',
      ],
    },
    {
      heading: '5) Reconstruct answer',
      bullets: [
        'Use stored metadata to reconstruct the exact solution.',
        'Apply ties or constraints to pick the best valid candidate.',
      ],
    },
  ]

  const combinationTechniques = [
    {
      title: 'Hash lookup for exact matches',
      detail:
        'Store left half sums in a hash set or map, then for each right sum check if the complement exists.',
    },
    {
      title: 'Sort and two-pointer',
      detail:
        'Sort both lists and sweep with two pointers to find pairs closest to a target.',
    },
    {
      title: 'Compress dominated entries',
      detail:
        'For optimization, keep only Pareto-optimal pairs to reduce combination cost.',
    },
    {
      title: 'Binary search for best fit',
      detail:
        'When optimizing, binary search on the sorted list to find the best partner for each partial.',
    },
  ]

  const complexityNotes = [
    {
      title: 'Time drops from 2^n to 2^(n/2)',
      detail:
        'Enumerating two halves yields roughly 2^(n/2) elements per side, making the search practical for n up to around 40-50.',
    },
    {
      title: 'Memory is the price',
      detail:
        'The algorithm stores all partial results, which can be large. Sorting and compressing can mitigate memory use.',
    },
    {
      title: 'Combination cost matters',
      detail:
        'Sorting is O(m log m). Hashing is O(m) expected. Choosing the right method drives performance.',
    },
    {
      title: 'Parallelism is easy',
      detail:
        'The two halves can be generated in parallel, making MITM a good fit for multicore execution.',
    },
  ]

  const comparisonTable = [
    {
      method: 'Brute force',
      time: 'O(2^n)',
      memory: 'O(1)',
      tradeoff: 'Too slow for n > ~30',
    },
    {
      method: 'Meet-in-the-Middle',
      time: 'O(2^(n/2) log 2^(n/2))',
      memory: 'O(2^(n/2))',
      tradeoff: 'Fast but memory heavy',
    },
    {
      method: 'Dynamic programming',
      time: 'O(n * target)',
      memory: 'O(target)',
      tradeoff: 'Good for small target values',
    },
  ]

  const applications = [
    {
      context: 'Subset sum',
      detail:
        'Generate all sums for each half, then search for pairs that hit the target exactly.',
    },
    {
      context: 'Partition and balancing',
      detail:
        'Use two-pointer on sorted sums to find the closest balance between halves.',
    },
    {
      context: 'Knapsack with weights',
      detail:
        'Keep Pareto-optimal (weight, value) pairs per half, then merge to maximize value under capacity.',
    },
    {
      context: 'Cryptography meet-in-the-middle attacks',
      detail:
        'Breaking double encryption by matching intermediate states generated from both ends.',
    },
  ]

  const examples = [
    {
      title: 'Subset sum with hashing',
      code: `function meetInTheMiddleSubsetSum(nums, target):
    left = nums[0..n/2-1]
    right = nums[n/2..n-1]
    leftSums = allSums(left) // size ~ 2^(n/2)
    table = hashSet(leftSums)
    for sumR in allSums(right):
        if table contains (target - sumR):
            return true
    return false`,
      explanation:
        'We trade memory for speed by storing all left sums. Each right sum checks for a complement in O(1) expected time.',
    },
    {
      title: 'Knapsack with Pareto compression',
      code: `function mitmKnapsack(items, capacity):
    L, R = split(items)
    leftPairs = allWeightValuePairs(L)
    rightPairs = allWeightValuePairs(R)
    rightPairs = paretoCompress(rightPairs) // keep best value per weight
    sort rightPairs by weight
    best = 0
    for (wL, vL) in leftPairs:
        if wL > capacity: continue
        remaining = capacity - wL
        vR = bestValueAtWeight(rightPairs, remaining)
        best = max(best, vL + vR)
    return best`,
      explanation:
        'Pareto compression removes dominated pairs, shrinking the search space while preserving optimality.',
    },
  ]

  const pitfalls = [
    'Blowing memory by storing all partial results without pruning or compression.',
    'Skipping sorting or normalization, which can make combination O(m^2).',
    'Forgetting to handle duplicates or dominated entries, producing incorrect results.',
    'Using MITM when a polynomial-time DP would be simpler and smaller.',
    'Ignoring reconstruction metadata when the actual solution is required, not just feasibility.',
  ]

  const decisionGuidance = [
    'n is too large for 2^n brute force, but still moderate (often <= 45).',
    'The objective combines two halves cleanly (sum, XOR, concatenation, path length).',
    'Memory is available for storing about 2^(n/2) partial results.',
    'You need exact answers, not heuristic approximations.',
  ]

  const advancedInsights = [
    {
      title: 'Gray code enumeration',
      detail:
        'Generate sums in Gray code order to update sums incrementally and reduce overhead per subset.',
    },
    {
      title: 'Multi-level MITM',
      detail:
        'Split into more than two parts when memory is tight, then combine in stages (k-way MITM).',
    },
    {
      title: 'Compression by dominance',
      detail:
        'For knapsack, keep only non-dominated pairs to minimize memory without losing optimality.',
    },
    {
      title: 'Hybrid with branch and bound',
      detail:
        'Use MITM to generate strong bounds or initial incumbents for branch and bound solvers.',
    },
  ]

  const takeaways = [
    'Meet-in-the-Middle halves the exponent by paying with memory.',
    'Efficient combination (hashing, sorting, compression) is the key to real speed.',
    'It is ideal for exact solutions on medium-sized instances.',
    'When memory is scarce, use compression or multi-level splits.',
  ]

  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Meet-in-the-Middle</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Split an exponential search into two manageable halves</div>
              <p className="win95-text">
                Meet-in-the-Middle is a divide-and-combine strategy that shrinks exponential search by precomputing all partial results
                for each half, then merging them efficiently. It is a go-to paradigm for exact subset problems at medium scale.
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
            <legend>How it works: the MITM flow</legend>
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
            <legend>Combination techniques</legend>
            <div className="win95-grid win95-grid-2">
              {combinationTechniques.map((item) => (
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
                MITM is the classic time-memory trade: it is much faster than brute force, but only if you can afford to store the
                partial results.
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
                    <th>Time</th>
                    <th>Memory</th>
                    <th>Tradeoff</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonTable.map((row) => (
                    <tr key={row.method}>
                      <td>{row.method}</td>
                      <td>{row.time}</td>
                      <td>{row.memory}</td>
                      <td>{row.tradeoff}</td>
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

