import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

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
      'Meet-in-the-Middle reduces a 2^n search by dividing it into two 2^(n/2) searches and then combining their results. The speedup is dramatic when n is about 35-50.',
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
    detail: 'Split into 3-4 parts to reduce memory, then combine hierarchically.',
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
    detail: 'Sort both lists and sweep with two pointers to find pairs closest to a target.',
  },
  {
    title: 'Compress dominated entries',
    detail: 'For optimization, keep only Pareto-optimal pairs to reduce combination cost.',
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
    detail: 'Map large keys to compact indices to reduce storage and enable faster search.',
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
    note: 'This is the canonical MITM example: O(2^(n/2)) time and memory with O(1) expected combine.',
  },
  {
    title: 'Partition into two balanced subsets',
    steps: [
      'Compute all subset sums for each half.',
      'Sort both lists.',
      'Use two pointers to minimize |left + right - total/2|.',
      'Recover the combination that yields the balance.',
    ],
    note: 'Two-pointer merge avoids O(m^2) pairing and finds the closest balance efficiently.',
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
    detail: 'Greedy is fast but may be incorrect; MITM is exact when feasible.',
  },
]

const applications = [
  {
    context: 'Subset sum',
    detail: 'Generate all sums for each half, then search for pairs that hit the target exactly.',
  },
  {
    context: 'Partition and balancing',
    detail: 'Use two-pointer on sorted sums to find the closest balance between halves.',
  },
  {
    context: 'Knapsack with weights',
    detail:
      'Keep Pareto-optimal (weight, value) pairs per half, then merge to maximize value under capacity.',
  },
  {
    context: 'Cryptography meet-in-the-middle attacks',
    detail: 'Breaking double encryption by matching intermediate states generated from both ends.',
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

const glossaryTerms = [
  {
    term: 'Meet-in-the-Middle',
    definition:
      'A technique that splits a search into two halves, enumerates each half, and combines them to recover exact answers more efficiently than full brute force.',
  },
  {
    term: 'Partial result',
    definition:
      'A value computed from one half of the input, such as a subset sum, XOR, or weight-value pair.',
  },
  {
    term: 'Complement',
    definition:
      'The value needed from the other half so that two partial results satisfy a target condition.',
  },
  {
    term: 'Pareto compression',
    definition:
      'Removing dominated entries, such as a higher-weight lower-value pair, without changing the best achievable answer.',
  },
  {
    term: 'Dominated entry',
    definition:
      'A partial result that is never better than another one under the same or looser constraints.',
  },
  {
    term: 'Reconstruction metadata',
    definition:
      'Extra information, such as masks or indices, stored so the exact solution can be rebuilt after a match is found.',
  },
  {
    term: 'Gray code enumeration',
    definition:
      'A way to generate subsets so consecutive subsets differ by one element, allowing incremental updates.',
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
    { id: 'bp-foundations', label: 'Foundations' },
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-taxonomy', label: 'Taxonomy' },
    { id: 'bp-mental', label: 'Mental Models' },
  ],
  'core-concepts': [
    { id: 'core-modeling', label: 'Modeling Checklist' },
    { id: 'core-loop', label: 'Algorithm Flow' },
    { id: 'core-patterns', label: 'Combination Patterns' },
    { id: 'core-techniques', label: 'Combination Techniques' },
    { id: 'core-data', label: 'Data Management' },
    { id: 'core-complexity', label: 'Complexity' },
    { id: 'core-comparisons', label: 'Comparisons' },
    { id: 'core-applications', label: 'Applications' },
    { id: 'core-failure', label: 'Failure Mode' },
    { id: 'core-pitfalls', label: 'Pitfalls' },
    { id: 'core-debugging', label: 'Debugging' },
    { id: 'core-use', label: 'When To Use It' },
    { id: 'core-avoid', label: 'When To Avoid It' },
    { id: 'core-advanced', label: 'Advanced Insights' },
    { id: 'core-instrumentation', label: 'Instrumentation' },
    { id: 'core-takeaways', label: 'Key Takeaways' },
  ],
  examples: [
    { id: 'examples-worked', label: 'Worked Examples' },
    { id: 'examples-code', label: 'Code Examples' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function MeetInTheMiddlePage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Meet-in-the-Middle',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Meet-in-the-Middle"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Meet-in-the-Middle</h1>
      <p>
        Meet-in-the-Middle is a divide-and-combine strategy that shrinks exponential search by
        precomputing all partial results for each half, then merging them efficiently. It is a go-to
        paradigm for exact subset problems at medium scale.
      </p>
      {activeTab === 'big-picture' && (
        <>
          <section id="bp-foundations" className="bin98-section">
            <h2 className="bin98-heading">Foundations</h2>
            {foundations.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            {overviewPanels.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="bp-taxonomy" className="bin98-section">
            <h2 className="bin98-heading">Taxonomy</h2>
            {taxonomy.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="bp-mental" className="bin98-section">
            <h2 className="bin98-heading">Mental Models</h2>
            {mentalModels.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>
        </>
      )}

      {activeTab === 'core-concepts' && (
        <>
          <section id="core-modeling" className="bin98-section">
            <h2 className="bin98-heading">Modeling Checklist</h2>
            <ul>
              {modelingChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <hr className="bin98-divider" />

          <section id="core-loop" className="bin98-section">
            <h2 className="bin98-heading">Algorithm Flow</h2>
            {algorithmSteps.map((step) => (
              <div key={step.heading}>
                <h3 className="bin98-subheading">{step.heading}</h3>
                <ul>
                  {step.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="core-patterns" className="bin98-section">
            <h2 className="bin98-heading">Combination Patterns</h2>
            {combinationPatterns.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="core-techniques" className="bin98-section">
            <h2 className="bin98-heading">Combination Techniques</h2>
            {combinationTechniques.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="core-data" className="bin98-section">
            <h2 className="bin98-heading">Data Management and Compression</h2>
            {dataManagement.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="core-complexity" className="bin98-section">
            <h2 className="bin98-heading">Complexity and Tradeoffs</h2>
            <p>
              MITM is the classic time-memory trade: it is much faster than brute force, but only if
              you can afford to store the partial results.
            </p>
            {complexityNotes.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="core-comparisons" className="bin98-section">
            <h2 className="bin98-heading">Comparisons</h2>
            {comparisonTable.map((item) => (
              <div key={item.method}>
                <h3 className="bin98-subheading">{item.method}</h3>
                <p>
                  Time: {item.time}. Memory: {item.memory}. Tradeoff: {item.tradeoff}.
                </p>
              </div>
            ))}
            {comparisons.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="core-applications" className="bin98-section">
            <h2 className="bin98-heading">Applications</h2>
            {applications.map((item) => (
              <div key={item.context}>
                <h3 className="bin98-subheading">{item.context}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="core-failure" className="bin98-section">
            <h2 className="bin98-heading">Failure Mode</h2>
            <p>{failureStory}</p>
          </section>

          <hr className="bin98-divider" />

          <section id="core-pitfalls" className="bin98-section">
            <h2 className="bin98-heading">Common Pitfalls</h2>
            <ul>
              {pitfalls.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <hr className="bin98-divider" />

          <section id="core-debugging" className="bin98-section">
            <h2 className="bin98-heading">Debugging Checklist</h2>
            <ul>
              {debuggingChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <hr className="bin98-divider" />

          <section id="core-use" className="bin98-section">
            <h2 className="bin98-heading">When To Use It</h2>
            <ul>
              {decisionGuidance.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <hr className="bin98-divider" />

          <section id="core-avoid" className="bin98-section">
            <h2 className="bin98-heading">When To Avoid It</h2>
            <ul>
              {whenToAvoid.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <hr className="bin98-divider" />

          <section id="core-advanced" className="bin98-section">
            <h2 className="bin98-heading">Advanced Insights</h2>
            {advancedInsights.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="core-instrumentation" className="bin98-section">
            <h2 className="bin98-heading">Instrumentation That Helps</h2>
            {instrumentation.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="core-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key Takeaways</h2>
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
          <section id="examples-worked" className="bin98-section">
            <h2 className="bin98-heading">Worked Examples</h2>
            {workedExamples.map((example) => (
              <div key={example.title}>
                <h3 className="bin98-subheading">{example.title}</h3>
                <ol>
                  {example.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
                <p>{example.note}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="examples-code" className="bin98-section">
            <h2 className="bin98-heading">Code Examples</h2>
            {examples.map((example) => (
              <div key={example.title}>
                <h3 className="bin98-subheading">{example.title}</h3>
                <div className="bin98-codebox">
                  <code>{example.code}</code>
                </div>
                <p>{example.explanation}</p>
              </div>
            ))}
          </section>
        </>
      )}

      {activeTab === 'glossary' && (
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Terms</h2>
          {glossaryTerms.map((item) => (
            <div key={item.term}>
              <h3 className="bin98-subheading">{item.term}</h3>
              <p>{item.definition}</p>
            </div>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
