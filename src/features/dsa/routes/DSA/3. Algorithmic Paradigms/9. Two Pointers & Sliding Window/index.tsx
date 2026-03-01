import { useEffect, useMemo, useState } from 'react'
import type { JSX } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

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

  const glossary = useMemo(
    () => [
      {
        term: 'Two pointers',
        definition:
          'A linear scan technique that moves one or two indices through an array or string to maintain a useful invariant.',
      },
      {
        term: 'Sliding window',
        definition:
          'A contiguous window that expands and shrinks while maintaining a condition such as a sum, count, or frequency bound.',
      },
      {
        term: 'Invariant',
        definition:
          'A condition that must always be true for the current window or pointer configuration. Pointer moves exist to restore or extend it.',
      },
      {
        term: 'Monotonicity',
        definition:
          'Pointers only move forward; each index advances at most n times, keeping total work linear.',
      },
      {
        term: 'Opposing pointers',
        definition:
          'Two pointers move toward each other in a sorted array to find pairs or ranges.',
      },
      {
        term: 'Fast/slow pointers',
        definition:
          'A slow pointer anchors a write position while a fast pointer scans ahead to find the next valid element.',
      },
      {
        term: 'Fixed-size window',
        definition:
          'A window of size k that moves with O(1) updates for rolling sums or averages.',
      },
      {
        term: 'Variable-size window',
        definition:
          'Expand until a constraint breaks, then shrink from the left to restore validity.',
      },
      {
        term: 'Monotonic queue window',
        definition:
          'A deque maintains max/min values for each window in O(1) amortized time.',
      },
      {
        term: 'Prefix + pointers',
        definition:
          'Prefix sums and two pointers can locate target ranges without re-summing each subarray.',
      },
    ],
    [],
  )

  type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    const tab = searchParams.get('tab')
    return tab === 'big-picture' || tab === 'core-concepts' || tab === 'examples' || tab === 'glossary'
      ? tab
      : 'big-picture'
  })
  const activeTabLabel =
    activeTab === 'big-picture'
      ? 'The Big Picture'
      : activeTab === 'core-concepts'
        ? 'Core Concepts'
        : activeTab === 'examples'
          ? 'Examples'
          : 'Glossary'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Two Pointers & Sliding Window (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'
  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Two Pointers & Sliding Window',
      url: `${location.pathname}${location.search}${location.hash}`,
      kind: 'help',
    }
    const rawTasks = window.localStorage.getItem(MINIMIZED_HELP_TASKS_KEY)
    const parsedTasks = rawTasks ? (JSON.parse(rawTasks) as Array<{ id: string }>) : []
    const nextTasks = [...parsedTasks.filter((task) => task.id !== minimizedTask.id), minimizedTask]
    window.localStorage.setItem(MINIMIZED_HELP_TASKS_KEY, JSON.stringify(nextTasks))

    const historyState = window.history.state as { idx?: number } | null
    if (historyState?.idx && historyState.idx > 0) {
      void navigate(-1)
      return
    }
    void navigate('/algoViz')
  }

  const tabs: Array<{ id: TabId; label: string }> = [
    { id: 'big-picture', label: 'The Big Picture' },
    { id: 'core-concepts', label: 'Core Concepts' },
    { id: 'examples', label: 'Examples' },
    { id: 'glossary', label: 'Glossary' },
  ]

  const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
    'big-picture': [
      { id: 'bp-overview', label: 'Overview' },
      { id: 'bp-why-it-works', label: 'Why It Works' },
      { id: 'bp-takeaways', label: 'Key Takeaways' },
    ],
    'core-concepts': [
      { id: 'core-foundations', label: 'Foundations' },
      { id: 'core-taxonomy', label: 'Technique Taxonomy' },
      { id: 'core-models', label: 'Mental Models' },
      { id: 'core-checklist', label: 'Modeling Checklist' },
      { id: 'core-patterns', label: 'Common Patterns' },
      { id: 'core-rules', label: 'Pointer Rules' },
      { id: 'core-loop', label: 'The Pointer Loop' },
      { id: 'core-comparisons', label: 'Paradigm Comparisons' },
      { id: 'core-complexity', label: 'Complexity and Tradeoffs' },
      { id: 'core-table', label: 'Comparisons at a Glance' },
      { id: 'core-applications', label: 'Real-World Applications' },
      { id: 'core-pitfalls', label: 'Common Pitfalls' },
      { id: 'core-debugging', label: 'Debugging Checklist' },
      { id: 'core-when-to-use', label: 'When to Use It' },
      { id: 'core-when-to-avoid', label: 'When to Avoid It' },
      { id: 'core-advanced', label: 'Advanced Insights' },
      { id: 'core-instrumentation', label: 'Instrumentation' },
    ],
    examples: [
      { id: 'ex-worked', label: 'Worked Examples' },
      { id: 'ex-code', label: 'Practical Code' },
    ],
    glossary: [{ id: 'glossary-terms', label: 'Terms' }],
  }

  const win98HelpStyles = `
.win98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.win98-window {
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  background: #c0c0c0;
  width: 100%;
  min-height: 100dvh;
  margin: 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.win98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.win98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.win98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
}

.win98-control {
  width: 18px;
  height: 16px;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  line-height: 1;
  cursor: pointer;
}

.win98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.win98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.win98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.win98-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.win98-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.win98-toc-title {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 10px;
}

.win98-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.win98-toc-list li {
  margin: 0 0 8px;
}

.win98-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.win98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.win98-doc-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px;
}

.win98-section {
  margin: 0 0 20px;
}

.win98-heading {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px;
}

.win98-subheading {
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 6px;
}

.win98-content p,
.win98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.win98-content p {
  margin: 0 0 10px;
}

.win98-content ul,
.win98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.win98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.win98-codebox {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 8px;
  margin: 6px 0 10px;
}

.win98-codebox code {
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
  display: block;
}

.win98-table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 0 10px;
  font-size: 12px;
}

.win98-table th,
.win98-table td {
  border: 1px solid #808080;
  padding: 6px 8px;
  text-align: left;
}

.win98-table thead th {
  background: #e6e6e6;
}

@media (max-width: 900px) {
  .win98-main {
    grid-template-columns: 1fr;
  }

  .win98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}
  `

  return (
    <div className="win98-help-page">
      <style>{win98HelpStyles}</style>
      <div className="win98-window" role="presentation">
        <header className="win98-titlebar">
          <span className="win98-title-text">Two Pointers &amp; Sliding Window</span>
          <div className="win98-title-controls">
            <button className="win98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="win98-control" aria-label="Close">X</Link>
          </div>
        </header>
        <div className="win98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`win98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="win98-main">
          <aside className="win98-toc" aria-label="Table of contents">
            <h2 className="win98-toc-title">Contents</h2>
            <ul className="win98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="win98-content">
            <h1 className="win98-doc-title">Two Pointers &amp; Sliding Window</h1>
            <p>
              Two pointers and sliding window techniques sweep through arrays and strings while maintaining a clean invariant.
              When used correctly, they collapse O(n^2) loops into O(n) passes with minimal memory.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="win98-section">
                  <h2 className="win98-heading">Overview</h2>
                  {overviewPanels.map((panel) => (
                    <div key={panel.title}>
                      <h3 className="win98-subheading">{panel.title}</h3>
                      <p>{panel.detail}</p>
                    </div>
                  ))}
                </section>
                <hr className="win98-divider" />
                <section id="bp-why-it-works" className="win98-section">
                  <h2 className="win98-heading">Why It Works</h2>
                  {complexityNotes.map((note) => (
                    <p key={note.title}>
                      <strong>{note.title}:</strong> {note.detail}
                    </p>
                  ))}
                  <p>
                    The win comes from monotonic pointer movement. If each pointer only moves forward, the algorithm stays linear.
                  </p>
                </section>
                <hr className="win98-divider" />
                <section id="bp-takeaways" className="win98-section">
                  <h2 className="win98-heading">Key Takeaways</h2>
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
                <section id="core-foundations" className="win98-section">
                  <h2 className="win98-heading">Foundations</h2>
                  {foundations.map((panel) => (
                    <p key={panel.title}>
                      <strong>{panel.title}:</strong> {panel.detail}
                    </p>
                  ))}
                </section>
                <section id="core-taxonomy" className="win98-section">
                  <h2 className="win98-heading">Technique Taxonomy</h2>
                  {taxonomy.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-models" className="win98-section">
                  <h2 className="win98-heading">Core Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-checklist" className="win98-section">
                  <h2 className="win98-heading">Modeling Checklist</h2>
                  <ul>
                    {modelingChecklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-patterns" className="win98-section">
                  <h2 className="win98-heading">Common Patterns</h2>
                  {techniquePanels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-rules" className="win98-section">
                  <h2 className="win98-heading">Pointer Movement Rules</h2>
                  {pointerRules.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-loop" className="win98-section">
                  <h2 className="win98-heading">How It Works: The Pointer Loop</h2>
                  {algorithmSteps.map((step) => (
                    <div key={step.heading}>
                      <h3 className="win98-subheading">{step.heading}</h3>
                      <ul>
                        {step.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
                <section id="core-comparisons" className="win98-section">
                  <h2 className="win98-heading">Comparisons with Other Paradigms</h2>
                  {comparisonParadigms.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-complexity" className="win98-section">
                  <h2 className="win98-heading">Complexity and Tradeoffs</h2>
                  {complexityNotes.map((note) => (
                    <p key={note.title}>
                      <strong>{note.title}:</strong> {note.detail}
                    </p>
                  ))}
                </section>
                <section id="core-table" className="win98-section">
                  <h2 className="win98-heading">Comparisons at a Glance</h2>
                  <table className="win98-table">
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
                </section>
                <section id="core-applications" className="win98-section">
                  <h2 className="win98-heading">Real-World Applications</h2>
                  {applications.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                  {applicationsExtended.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                  <p><strong>Failure mode:</strong> {failureStory}</p>
                </section>
                <section id="core-pitfalls" className="win98-section">
                  <h2 className="win98-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-debugging" className="win98-section">
                  <h2 className="win98-heading">Debugging Checklist</h2>
                  <ul>
                    {debuggingChecklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-when-to-use" className="win98-section">
                  <h2 className="win98-heading">When to Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
                <section id="core-when-to-avoid" className="win98-section">
                  <h2 className="win98-heading">When to Avoid It</h2>
                  <ul>
                    {whenToAvoid.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-advanced" className="win98-section">
                  <h2 className="win98-heading">Advanced Insights</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-instrumentation" className="win98-section">
                  <h2 className="win98-heading">Instrumentation That Helps</h2>
                  {instrumentation.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                <section id="ex-worked" className="win98-section">
                  <h2 className="win98-heading">Worked Examples</h2>
                  {workedExamples.map((example) => (
                    <div key={example.title}>
                      <h3 className="win98-subheading">{example.title}</h3>
                      <ol>
                        {example.steps.map((step) => (
                          <li key={step}>{step}</li>
                        ))}
                      </ol>
                      <p>{example.note}</p>
                    </div>
                  ))}
                </section>
                <section id="ex-code" className="win98-section">
                  <h2 className="win98-heading">Practical Code</h2>
                  {examples.map((example) => (
                    <div key={example.title}>
                      <h3 className="win98-subheading">{example.title}</h3>
                      <div className="win98-codebox">
                        <code>{example.code.trim()}</code>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="win98-section">
                <h2 className="win98-heading">Glossary</h2>
                {glossary.map((item) => (
                  <p key={item.term}>
                    <strong>{item.term}:</strong> {item.definition}
                  </p>
                ))}
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
