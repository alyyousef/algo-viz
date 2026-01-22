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

  const foundations = [
    {
      title: 'Split the exponential',
      detail:
        'Meet-in-the-Middle reduces a 2^n search by dividing it into two 2^(n/2) searches and then combining their results. The speedup is dramatic when n is 35–50.',
    },
    {
      title: 'Time-memory trade',
      detail:
        'MITM is fast because it stores partial results. Memory is the main cost, so compression and pruning are often essential.',
    },
    {
      title: 'Combine with structure',
      detail:
        'The paradigm only works when the objective can be decomposed into two parts that can be recombined (sum, XOR, concatenation, distance).',
    },
    {
      title: 'Exact results, not heuristics',
      detail:
        'Unlike randomized or greedy methods, MITM delivers exact answers if you enumerate all partials and combine correctly.',
    },
  ]

  const taxonomy = [
    {
      title: 'Exact sum matching',
      detail: 'Find pairs that hit a target exactly (subset sum, XOR sum).',
    },
    {
      title: 'Closest pair or balancing',
      detail: 'Minimize |left + right - target| with sorted lists and two pointers.',
    },
    {
      title: 'Optimization with Pareto sets',
      detail: 'Compress dominated (weight, value) pairs before combining (knapsack).',
    },
    {
      title: 'Cryptographic MITM',
      detail: 'Match intermediate states between two stages of encryption or hashing.',
    },
    {
      title: 'Multi-stage MITM',
      detail: 'Split into 3–4 parts to reduce memory, then combine hierarchically.',
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

  const modelingChecklist = [
    'Define the objective and identify a split where each half can be evaluated independently.',
    'Decide the key to combine on (sum, XOR, hash, path length).',
    'Select what metadata is required to reconstruct the full solution.',
    'Estimate memory for storing partials; plan compression if needed.',
    'Choose a combination method (hashing, sorting, two-pointer, binary search).',
    'Consider duplicate handling and dominance reduction rules.',
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

  const combinationPatterns = [
    {
      title: 'Exact complement',
      detail: 'Use a hash set to test whether target - sum exists in the other half.',
    },
    {
      title: 'Closest match',
      detail: 'Sort and sweep with two pointers to approach the target.',
    },
    {
      title: 'Best under constraint',
      detail: 'Binary search on sorted Pareto sets to maximize value under a capacity.',
    },
    {
      title: 'Bitset merge',
      detail: 'When keys are small, use bitsets to represent sums and intersect quickly.',
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

  const dataManagement = [
    {
      title: 'Pareto compression',
      detail:
        'Remove dominated entries (higher weight, lower value) to cut memory without losing optimality.',
    },
    {
      title: 'Coordinate compression',
      detail:
        'Map large keys to compact indices to reduce storage and enable faster search.',
    },
    {
      title: 'Deduplicate aggressively',
      detail:
        'If multiple subsets yield the same key, keep only the best (or store counts if needed).',
    },
    {
      title: 'Store masks only when required',
      detail:
        'Keep reconstruction data minimal: store subset masks only if you need explicit solutions.',
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

  const workedExamples = [
    {
      title: 'Subset sum (exact target)',
      steps: [
        'Split array into left and right halves.',
        'Enumerate all sums of the left half; store in a hash set.',
        'Enumerate sums of the right half; check if target - sum exists.',
        'If found, reconstruct using stored masks or indices.',
      ],
      note:
        'This is the canonical MITM example: O(2^(n/2)) time and memory with O(1) expected combine.',
    },
    {
      title: 'Partition into two balanced subsets',
      steps: [
        'Compute all subset sums for each half.',
        'Sort both lists.',
        'Use two pointers to minimize |left + right - total/2|.',
        'Recover the combination that yields the balance.',
      ],
      note:
        'Two-pointer merge avoids O(m^2) pairing and finds the closest balance efficiently.',
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

  const comparisons = [
    {
      title: 'MITM vs dynamic programming',
      detail:
        'DP is great when target values are small. MITM is better when values are huge but n is moderate.',
    },
    {
      title: 'MITM vs branch and bound',
      detail:
        'BnB prunes a search tree with bounds; MITM enumerates all partials and combines. MITM is simpler but memory-heavy.',
    },
    {
      title: 'MITM vs greedy',
      detail:
        'Greedy is fast but may be incorrect; MITM is exact when feasible.',
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

  const failureStory =
    'A subset-sum solver for n=46 ran out of memory because it stored all partials with full masks. Storing only sums and reconstructing via a second pass cut memory by 4x and completed in seconds.'

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

  const debuggingChecklist = [
    'Validate combining logic on tiny instances where brute force is possible.',
    'Check for duplicate sums and ensure your compression keeps the best candidate.',
    'Verify reconstruction metadata (subset masks or indices) matches the sums.',
    'Measure memory and ensure lists fit in RAM before sorting.',
    'Use stable sorting and explicit tie-breakers when you need deterministic outputs.',
  ]

  const decisionGuidance = [
    'n is too large for 2^n brute force, but still moderate (often <= 45).',
    'The objective combines two halves cleanly (sum, XOR, concatenation, path length).',
    'Memory is available for storing about 2^(n/2) partial results.',
    'You need exact answers, not heuristic approximations.',
  ]

  const whenToAvoid = [
    'n is so large that 2^(n/2) is still infeasible.',
    'Memory is constrained and you cannot compress partial results.',
    'The problem does not decompose cleanly into two independent halves.',
    'A polynomial-time DP or greedy algorithm exists with guarantees.',
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

  const instrumentation = [
    {
      title: 'List sizes and compression rates',
      detail: 'Track how many partials are generated and how much compression saves.',
    },
    {
      title: 'Combine cost metrics',
      detail: 'Measure time spent in sort, hash insert, and merge operations.',
    },
    {
      title: 'Memory peak tracking',
      detail: 'Monitor peak memory to choose split sizes and compression strategies.',
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
            <legend>Foundations</legend>
            <div className="win95-grid win95-grid-2">
              {foundations.map((panel) => (
                <div key={panel.title} className="win95-panel">
                  <div className="win95-heading">{panel.title}</div>
                  <p className="win95-text">{panel.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

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
            <legend>MITM taxonomy</legend>
            <div className="win95-grid win95-grid-2">
              {taxonomy.map((item) => (
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
            <legend>Modeling checklist</legend>
            <div className="win95-panel win95-panel--raised">
              <ul className="win95-list">
                {modelingChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
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
            <legend>Combination patterns</legend>
            <div className="win95-grid win95-grid-2">
              {combinationPatterns.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
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
            <legend>Data management and compression</legend>
            <div className="win95-grid win95-grid-2">
              {dataManagement.map((item) => (
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
            <legend>Worked examples</legend>
            <div className="win95-stack">
              {workedExamples.map((example) => (
                <div key={example.title} className="win95-panel">
                  <div className="win95-heading">{example.title}</div>
                  <ol className="win95-list win95-list--numbered">
                    {example.steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                  <p className="win95-text">{example.note}</p>
                </div>
              ))}
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
            <legend>MITM in context</legend>
            <div className="win95-grid win95-grid-2">
              {comparisons.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
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
            <legend>Failure mode</legend>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">{failureStory}</p>
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
            <legend>Debugging checklist</legend>
            <div className="win95-panel win95-panel--raised">
              <ul className="win95-list">
                {debuggingChecklist.map((item) => (
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
            <legend>When to avoid it</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {whenToAvoid.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
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
            <legend>Instrumentation that helps</legend>
            <div className="win95-grid win95-grid-2">
              {instrumentation.map((item) => (
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

