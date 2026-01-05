import type { JSX } from 'react'
import { Link } from 'react-router-dom'

export default function TwoPointersSlidingWindowPage(): JSX.Element {
  const win95Styles = `
.win95-page {
  min-height: 100vh;
  background: #C0C0C0;
  padding: 0;
  color: #000;
  font-family: 'MS Sans Serif', 'Tahoma', sans-serif;
  -webkit-font-smoothing: none;
}

.win95-page * {
  box-sizing: border-box;
}

.win95-page a {
  color: #000;
  text-decoration: none;
}

.win95-page a:hover {
  text-decoration: underline;
}

.win95-window {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  background: #C0C0C0;
  box-shadow: none;
  border-radius: 0;
}

.win95-titlebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #000080;
  color: #fff;
  padding: 4px 6px;
  font-weight: 700;
  font-size: 13px;
  line-height: 1;
}

.win95-title {
  display: inline-block;
}

.win95-title-controls {
  display: flex;
  gap: 4px;
}

.win95-control {
  width: 22px;
  height: 20px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  border-radius: 0;
  font-weight: 700;
  font-size: 12px;
  line-height: 1;
  padding: 0;
  cursor: pointer;
}

.win95-control:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-control:focus,
.win95-button:focus {
  outline: 1px dotted #000;
  outline-offset: -3px;
}

.win95-content {
  padding: 10px;
}

.win95-header-row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: flex-start;
  margin-bottom: 8px;
}

.win95-button {
  padding: 3px 10px 2px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  border-radius: 0;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  line-height: 1.2;
}

.win95-button:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-fieldset {
  border: 2px solid;
  border-color: #808080 #404040 #404040 #808080;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 0;
  background: #C0C0C0;
}

.win95-fieldset legend {
  padding: 0 6px;
  font-weight: 700;
  font-size: 12px;
}

.win95-grid {
  display: grid;
  gap: 6px;
}

.win95-grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.win95-grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
}

.win95-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 8px;
}

.win95-panel {
  border: 2px solid;
  border-color: #808080 #fff #fff #808080;
  background: #C0C0C0;
  padding: 8px;
  border-radius: 0;
}

.win95-panel--raised {
  border-color: #fff #404040 #404040 #fff;
}

.win95-heading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 4px;
}

.win95-subheading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 6px;
}

.win95-text {
  font-size: 12px;
  line-height: 1.35;
  margin: 0 0 6px;
}

.win95-stack {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.win95-list {
  margin: 0;
  padding-left: 18px;
  font-size: 12px;
  line-height: 1.35;
}

.win95-list li {
  margin-bottom: 4px;
}

.win95-list--numbered {
  list-style: decimal;
}

.win95-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.win95-table th,
.win95-table td {
  border: 1px solid #808080;
  padding: 6px 6px 4px;
  text-align: left;
}

.win95-table th {
  font-weight: 700;
}

.win95-code {
  margin: 6px 0;
  background: #C0C0C0;
  color: #000;
  padding: 8px;
  font-family: 'Courier New', monospace;
  font-size: 11px;
  border: 2px solid;
  border-color: #404040 #fff #fff #404040;
  overflow-x: auto;
  border-radius: 0;
}
`

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

  const decisionGuidance = [
    'The problem asks for a pair, triplet, or range with sorted or monotonic structure.',
    'You need subarray or substring constraints that can be updated incrementally.',
    'A brute force double loop is too slow for the input size.',
    'You can maintain a valid window with a simple counter or aggregate.',
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
