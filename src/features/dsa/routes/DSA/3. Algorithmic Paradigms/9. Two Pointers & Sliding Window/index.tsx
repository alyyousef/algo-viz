import type { JSX } from 'react'
import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

export default function TwoPointersSlidingWindowPage(): JSX.Element {
  const overviewPanels = [
    {
      title: 'What it is',
      detail:
        'Two pointers and sliding window are linear scan techniques that move one or two indices through an array or string to maintain a useful invariant.',
    },
    {
      title: 'Why it matters',
      detail:
        'They turn nested loops into single passes. Many O(n^2) brute force checks collapse to O(n) with the right pointer logic.',
    },
    {
      title: 'Where it shines',
      detail:
        'Sorted arrays, subarray sums, substring constraints, and problems with monotonic or accumulative structure.',
    },
  ]

  const foundations = [
    {
      title: 'Monotonic pointer movement',
      detail:
        'The key guarantee is that pointers only move forward. Each index advances at most n times, keeping total work linear.',
    },
    {
      title: 'Invariant-driven design',
      detail:
        'You must define a condition that is always true for the current window or pointer configuration. Pointer moves exist only to restore or extend that invariant.',
    },
    {
      title: 'Incremental updates',
      detail:
        'All updates to counts, sums, or frequency maps must be O(1). Recomputing window state destroys the linear advantage.',
    },
    {
      title: 'Order or contiguity matters',
      detail:
        'Two pointers usually need sorted order or monotonic properties; sliding windows require contiguity. Without these, the technique is often invalid.',
    },
  ]

  const taxonomy = [
    {
      title: 'Opposing pointers',
      detail: 'Two pointers move toward each other in a sorted array to find pairs or ranges.',
    },
    {
      title: 'Fast/slow pointers',
      detail: 'A slow pointer anchors write position, a fast pointer scans ahead (dedup, partition).',
    },
    {
      title: 'Fixed-size window',
      detail: 'Maintain a window of size k with O(1) updates for rolling sums or averages.',
    },
    {
      title: 'Variable-size window',
      detail: 'Expand until a constraint breaks, then shrink to restore validity.',
    },
    {
      title: 'Multi-constraint windows',
      detail: 'Track multiple counts or conditions; window moves when any constraint fails.',
    },
    {
      title: 'Monotonic queue windows',
      detail: 'Use a deque to maintain max/min values for each window in O(1) amortized.',
    },
  ]

  const mentalModels = [
    {
      title: 'Moving fences',
      detail:
        'The pointers are fences that enclose a valid region. Move left or right to keep the region valid while expanding coverage.',
    },
    {
      title: 'Invariant first',
      detail:
        'Every pointer move is justified by an invariant. If the invariant breaks, advance the pointer that restores it.',
    },
    {
      title: 'Each element touched once',
      detail:
        'Well designed pointer rules ensure each index advances monotonically, so total work is linear.',
    },
  ]

  const modelingChecklist = [
    'Define the invariant (sum <= k, distinct count <= m, sorted condition holds).',
    'Decide which pointer moves on violation vs on success.',
    'Pick state to maintain: counts, sum, frequency, deque, or map.',
    'Confirm monotonicity: each pointer should only move forward.',
    'Plan how to update the answer when the invariant is satisfied.',
    'Check edge cases: empty input, duplicates, or negative numbers.',
  ]

  const techniquePanels = [
    {
      title: 'Opposing pointers (two sum on sorted)',
      detail:
        'One pointer starts at the left, one at the right. Move inward based on whether the sum is too small or too large.',
    },
    {
      title: 'Fast and slow (remove duplicates)',
      detail:
        'A slow pointer marks the write position, while a fast pointer scans ahead to find the next valid element.',
    },
    {
      title: 'Sliding window fixed size',
      detail:
        'Keep a window of size k and update the aggregate in O(1) as it moves.',
    },
    {
      title: 'Sliding window variable size',
      detail:
        'Expand to include new items, then shrink from the left while a constraint is violated.',
    },
    {
      title: 'Multiple window constraints',
      detail:
        'Track counts or sums in maps. The window moves based on whether all constraints are satisfied.',
    },
    {
      title: 'Prefix + pointers',
      detail:
        'Prefix sums and two pointers can locate target ranges without re-summing each subarray.',
    },
  ]

  const pointerRules = [
    {
      title: 'Move the pointer that fixes the invariant',
      detail: 'If the window is invalid, advance the left pointer until it is valid again.',
    },
    {
      title: 'Move the pointer that explores new candidates',
      detail: 'If valid, advance the right pointer to expand the search space.',
    },
    {
      title: 'Advance in a single direction',
      detail: 'Never move pointers backward; backtracking typically breaks linear complexity.',
    },
    {
      title: 'Record answers consistently',
      detail: 'Decide whether to update on every valid window or only on exact matches.',
    },
  ]

  const algorithmSteps = [
    {
      heading: '1) Define the invariant',
      bullets: [
        'What makes the current window or pointer state valid?',
        'Examples: sum <= target, unique characters, array sorted order.',
      ],
    },
    {
      heading: '2) Initialize pointers',
      bullets: [
        'Set left and right (or slow and fast) positions.',
        'Initialize the state needed for the invariant (counts, sum, etc).',
      ],
    },
    {
      heading: '3) Expand or move',
      bullets: [
        'Advance the pointer that makes progress toward the goal.',
        'Update state in O(1) for each move.',
      ],
    },
    {
      heading: '4) Restore validity',
      bullets: [
        'If the invariant breaks, advance the other pointer until it holds again.',
        'Never move pointers backwards unless you must reset the scan.',
      ],
    },
    {
      heading: '5) Record answers',
      bullets: [
        'Whenever the invariant holds, update the best result or collect matches.',
        'Keep a consistent way to compare or store candidates.',
      ],
    },
  ]

  const comparisonParadigms = [
    {
      title: 'Two pointers vs binary search',
      detail:
        'Binary search repeatedly splits; two pointers sweep once. When order is monotone and you need all pairs or windows, two pointers are usually faster.',
    },
    {
      title: 'Sliding window vs prefix sums',
      detail:
        'Prefix sums answer range queries quickly but still need a search strategy. Sliding window excels when constraints are monotone and windows move forward.',
    },
    {
      title: 'Two pointers vs greedy',
      detail:
        'Greedy makes global choices; two pointers are local scans that exploit order. They can complement each other (e.g., greedy sort + two pointers).',
    },
    {
      title: 'Sliding window vs DP',
      detail:
        'DP handles complex substructure; sliding window handles simple monotone constraints. DP is heavier but more general.',
    },
    {
      title: 'Two pointers vs hashing',
      detail:
        'Hashing finds complements without order; two pointers need order but avoid extra memory.',
    },
  ]

  const complexityNotes = [
    {
      title: 'Time is linear',
      detail:
        'Each pointer advances at most n times. Total work is O(n), even though there are two pointers.',
    },
    {
      title: 'Space is small',
      detail:
        'Often O(1), or O(k) for character counts and frequency maps in sliding window problems.',
    },
    {
      title: 'Monotonicity is key',
      detail:
        'If pointers only move forward, the algorithm remains linear. Breaking monotonicity can reintroduce quadratic behavior.',
    },
    {
      title: 'Sorting can dominate',
      detail:
        'Two pointer solutions on unsorted input may need O(n log n) sorting first.',
    },
  ]

  const workedExamples = [
    {
      title: 'Longest substring without repeats',
      steps: [
        'Use a map of last seen indices.',
        'Expand right pointer; if a duplicate appears, move left to just after last seen.',
        'Update best length after each move.',
      ],
      note:
        'Each character is added and removed at most once; the total work remains linear.',
    },
    {
      title: 'Minimum window with sum >= target (positive numbers)',
      steps: [
        'Expand right pointer and accumulate sum.',
        'When sum >= target, shrink from left to minimize window.',
        'Track the smallest valid length.',
      ],
      note:
        'Monotonicity holds only with non-negative numbers; with negatives, this fails.',
    },
  ]

  const comparisonTable = [
    {
      method: 'Brute force',
      time: 'O(n^2)',
      memory: 'O(1)',
      note: 'Checks all pairs or subarrays',
    },
    {
      method: 'Two pointers',
      time: 'O(n) or O(n log n)',
      memory: 'O(1)',
      note: 'Requires order or monotonicity',
    },
    {
      method: 'Sliding window',
      time: 'O(n)',
      memory: 'O(1) to O(k)',
      note: 'Best for contiguous subarrays',
    },
  ]

  const applicationsExtended = [
    {
      context: 'Remove duplicates in-place',
      detail:
        'Fast/slow pointers compress sorted arrays without extra memory.',
    },
    {
      context: 'Max consecutive ones with flips',
      detail:
        'Variable window keeps at most k zeros; shrink left when constraint breaks.',
    },
    {
      context: 'Smallest subarray with all chars',
      detail:
        'Frequency map tracks coverage, shrink when all constraints are met.',
    },
    {
      context: 'Merge intervals by sweep',
      detail:
        'Two pointers over sorted endpoints to combine overlapping intervals efficiently.',
    },
  ]

  const applications = [
    {
      context: 'Two sum in sorted array',
      detail:
        'Move pointers inward to find a pair that matches the target without nested loops.',
    },
    {
      context: 'Longest substring without repeats',
      detail:
        'Expand the right pointer and shrink left pointer to maintain unique characters.',
    },
    {
      context: 'Minimum size subarray sum',
      detail:
        'Use variable window and shrink when sum exceeds target to find minimal length.',
    },
    {
      context: 'Merge of two sorted arrays',
      detail:
        'Advance pointers across both arrays to stream the merged order.',
    },
  ]

  const failureStory =
    'A substring solver allowed negative weights in its scoring and still used a sliding window. The window oscillated and missed valid answers. Switching to prefix sums with binary search fixed correctness.'

  const examples = [
    {
      title: 'Two sum on sorted array',
      code: `function twoSumSorted(nums, target):
    left = 0
    right = nums.length - 1
    while left < right:
        sum = nums[left] + nums[right]
        if sum == target: return [left, right]
        if sum < target: left += 1
        else: right -= 1
    return null`,
      explanation:
        'The array is sorted, so if the sum is too small, only moving left upward can increase it. Each pointer moves at most n times.',
    },
    {
      title: 'Longest substring with at most k distinct',
      code: `function longestSubstringK(s, k):
    counts = map()
    left = 0
    best = 0
    for right in 0..s.length-1:
        add s[right] to counts
        while counts.size > k:
            remove s[left] from counts
            left += 1
        best = max(best, right - left + 1)
    return best`,
      explanation:
        'The window expands to include new characters, and shrinks only when the constraint breaks. This keeps the scan linear.',
    },
    {
      title: 'Minimum length subarray sum',
      code: `function minSubarrayLen(nums, target):
    left = 0
    sum = 0
    best = Infinity
    for right in 0..nums.length-1:
        sum += nums[right]
        while sum >= target:
            best = min(best, right - left + 1)
            sum -= nums[left]
            left += 1
    return best == Infinity ? 0 : best`,
      explanation:
        'Shrink from the left to keep the window minimal whenever the sum is large enough.',
    },
  ]

  const pitfalls = [
    'Forgetting the invariant, leading to incorrect pointer moves.',
    'Moving both pointers in the wrong order, skipping valid answers.',
    'Handling duplicates incorrectly when compressing or filtering.',
    'Using sliding window on problems that are not contiguous.',
    'Breaking monotonicity and accidentally reintroducing O(n^2).',
  ]

  const debuggingChecklist = [
    'Print pointer positions and window state on small inputs.',
    'Assert invariants before and after pointer moves.',
    'Verify pointer monotonicity (no backward moves).',
    'Test edge cases: empty arrays, all duplicates, large k.',
    'If negative numbers exist, reconsider sliding window assumptions.',
  ]

  const decisionGuidance = [
    'The problem asks for a pair, triplet, or range with sorted or monotonic structure.',
    'You need subarray or substring constraints that can be updated incrementally.',
    'A brute force double loop is too slow for the input size.',
    'You can maintain a valid window with a simple counter or aggregate.',
  ]

  const whenToAvoid = [
    'Constraints are not monotone (negative numbers or non-local conditions).',
    'You need non-contiguous subsets (sliding window does not apply).',
    'The array is unsorted and cannot be sorted without breaking requirements.',
    'A hashing-based solution is simpler and acceptable in memory.',
  ]

  const advancedInsights = [
    {
      title: 'Monotonic queue for sliding window extremes',
      detail:
        'Maintain a deque of candidates to get max or min of each window in O(1) per step.',
    },
    {
      title: 'Two pointers with prefix sums',
      detail:
        'If sums are nonnegative, pointers can advance using prefix sums to find ranges efficiently.',
    },
    {
      title: 'Three pointers for cyclic windows',
      detail:
        'Circular arrays sometimes need a second right pointer to represent wraparound windows.',
    },
    {
      title: 'Window with frequency constraints',
      detail:
        'Track counts and number of satisfied conditions to handle problems with multiple constraints.',
    },
  ]

  const instrumentation = [
    {
      title: 'Pointer move counters',
      detail: 'Track left/right moves to confirm linear behavior.',
    },
    {
      title: 'Constraint hit rate',
      detail: 'Measure how often the window is valid vs invalid to tune heuristics.',
    },
    {
      title: 'State update cost',
      detail: 'Ensure per-step updates are O(1); profile maps or deques if slow.',
    },
  ]

  const takeaways = [
    'Two pointers and sliding window reduce quadratic scans to linear passes.',
    'The invariant defines the algorithm. Keep it explicit and easy to update.',
    'Monotonic pointer movement is the performance guarantee.',
    'Use sorting, hashing, or queues to maintain window state efficiently.',
  ]

  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Two Pointers & Sliding Window</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Linear scans that replace nested loops with pointer logic</div>
              <p className="win95-text">
                Two pointers and sliding window techniques sweep through arrays and strings while maintaining a clean invariant.
                When used correctly, they collapse O(n^2) loops into O(n) passes with minimal memory.
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
            <legend>Technique taxonomy</legend>
            <div className="win95-grid win95-grid-3">
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
            <legend>Common patterns</legend>
            <div className="win95-grid win95-grid-3">
              {techniquePanels.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Pointer movement rules</legend>
            <div className="win95-grid win95-grid-2">
              {pointerRules.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works: the pointer loop</legend>
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
            <legend>Comparisons with other paradigms</legend>
            <div className="win95-grid win95-grid-2">
              {comparisonParadigms.map((item) => (
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
                The win comes from monotonic pointer movement. If each pointer only moves forward, the algorithm stays linear.
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
                    <th>Note</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonTable.map((row) => (
                    <tr key={row.method}>
                      <td>{row.method}</td>
                      <td>{row.time}</td>
                      <td>{row.memory}</td>
                      <td>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Real-world applications</legend>
            <div className="win95-stack">
              <div className="win95-grid win95-grid-2">
                {applications.map((item) => (
                  <div key={item.context} className="win95-panel">
                    <div className="win95-heading">{item.context}</div>
                    <p className="win95-text">{item.detail}</p>
                  </div>
                ))}
              </div>
              <div className="win95-grid win95-grid-2">
                {applicationsExtended.map((item) => (
                  <div key={item.context} className="win95-panel">
                    <div className="win95-heading">{item.context}</div>
                    <p className="win95-text">{item.detail}</p>
                  </div>
                ))}
              </div>
              <div className="win95-panel win95-panel--raised">
                <div className="win95-heading">Failure mode</div>
                <p className="win95-text">{failureStory}</p>
              </div>
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


