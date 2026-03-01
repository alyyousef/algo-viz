import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

const historicalMilestones = [
  {
    title: '1974: Karp lists Subset Sum as NP-complete',
    detail:
      'Subset Sum joins the classic NP-complete set, explaining why exponential-time algorithms are the baseline.',
  },
  {
    title: '1980s: Pseudopolynomial DP popularized',
    detail:
      'Table-based DP shows the problem is easy when the target sum is small, even if the input size is large.',
  },
  {
    title: '1990s: Meet-in-the-middle for n ~ 40',
    detail:
      'Horowitz-Sahni style splitting halves the exponent from 2^n to 2^(n/2), making medium instances tractable.',
  },
  {
    title: 'Modern: Bitset and SIMD tricks',
    detail:
      'Bitset shifts pack many sums per word and can be accelerated with SIMD for moderate targets.',
  },
]

const mentalModels = [
  {
    title: 'Reachable sums as a frontier',
    detail:
      'Each item extends the set of sums you can make. The DP tracks which totals are reachable after scanning items.',
  },
  {
    title: 'Partition as balance',
    detail:
      'Equal partition asks if you can split weights onto two pans so both sides match. Sum must be even, then run subset sum to hit half.',
  },
  {
    title: 'Bitset as a sliding window',
    detail:
      'A bitset DP slides reachable sums to the right by item weight and ORs with the previous reachability mask.',
  },
  {
    title: 'Meet-in-the-middle catalog',
    detail:
      'Enumerate all sums of the left half and right half, then search for complementary pairs to hit the target.',
  },
  {
    title: 'Budget planning',
    detail:
      'Choose a subset of expenses that exactly hits a budget cap without exceeding it.',
  },
  {
    title: 'Balancing loads',
    detail:
      'Split jobs so totals are as even as possible; partition is the exact balance special case.',
  },
]

const problemVariants = [
  {
    heading: 'Subset Sum (decision)',
    bullets: [
      'Given numbers and target S, determine if any subset sums to S.',
      'Pseudopolynomial DP in O(nS), exponential in n in the worst case.',
      'NP-complete; exact polynomial-time solutions are unlikely.',
    ],
  },
  {
    heading: 'Count subsets',
    bullets: [
      'Count how many subsets reach S.',
      'DP accumulates counts instead of booleans; watch for overflow.',
      'Useful for probabilistic analyses and combinatorics.',
    ],
  },
  {
    heading: 'Minimum difference partition',
    bullets: [
      'Split set into two subsets minimizing |sumA - sumB|.',
      'Compute reachable sums up to total/2, choose closest.',
      'Important for load balancing and bin packing heuristics.',
    ],
  },
  {
    heading: 'K-partition / multi-bin',
    bullets: [
      'Generalizes to k buckets with capacity constraints.',
      'Becomes NP-hard quickly; use backtracking + pruning or ILP.',
      '2-bin case reduces to classic partition.',
    ],
  },
  {
    heading: 'Bounded / unbounded variants',
    bullets: [
      'Bounded: each item limited by count; expand or use bounded knapsack DP.',
      'Unbounded: coin change style with repeated use.',
      'Same DP skeleton with adjusted transitions.',
    ],
  },
  {
    heading: 'Subset sum with negatives',
    bullets: [
      'Allowing negatives breaks the simple 0..target table.',
      'Shift sums by an offset or use meet-in-the-middle/backtracking.',
      'Careful pruning is required to avoid exponential blowups.',
    ],
  },
]

const algorithmSteps = [
  {
    title: 'Define state',
    detail:
      'dp[i][s] = can we reach sum s using first i items? Optimize to 1D: dp[s] after processing items.',
  },
  {
    title: 'Initialize base',
    detail:
      'dp[0] = true (empty subset makes 0). All other sums start false.',
  },
  {
    title: 'Transition (0/1 items)',
    detail:
      'For weight w: iterate s from target down to w, set dp[s] ||= dp[s - w]. Backward scan prevents double-using an item.',
  },
  {
    title: 'Early exit',
    detail:
      'If dp[target] becomes true, you can stop early for the decision problem.',
  },
  {
    title: 'Partition shortcut',
    detail:
      'If total sum is odd, return false. Otherwise target is total/2; run subset sum to that target.',
  },
  {
    title: 'Meet-in-the-middle',
    detail:
      'Split items into halves, enumerate all sums of each half, sort one list, and binary search complements to find target or minimum gap.',
  },
  {
    title: 'Reconstruct subset (optional)',
    detail:
      'Store parent pointers or retrace from dp table: if dp[s] && !dp_prev[s], then item that flipped s is included.',
  },
]

const implementationNotes = [
  {
    title: 'Space-optimized DP',
    detail:
      'Use a boolean array of length target + 1. Iterate sums descending per item so each is used once.',
  },
  {
    title: 'Bitset acceleration',
    detail:
      'Represent reachable sums as a bitset. Update with dp |= (dp << w). This packs 64 sums per machine word.',
  },
  {
    title: 'Sort for pruning',
    detail:
      'Sorting descending can help pruning in backtracking or meet-in-the-middle, though DP order does not require sorting.',
  },
  {
    title: 'Handling negatives',
    detail:
      'Classic DP assumes non-negative integers. With negatives, shift sums by an offset or use meet-in-the-middle/backtracking carefully.',
  },
  {
    title: 'Counting subsets safely',
    detail:
      'Use 64-bit integers or modular arithmetic if counts can explode.',
  },
  {
    title: 'Iterative versus recursive',
    detail:
      'Iterative DP avoids recursion depth issues and keeps memory predictable.',
  },
]

const complexityNotes = [
  {
    title: 'Pseudopolynomial runtime',
    detail:
      'O(n * target) for 0/1 DP; good when target is small relative to value magnitudes.',
  },
  {
    title: 'Space costs',
    detail:
      'O(target) for 1D boolean DP; O(n * target) if you keep the full table for reconstruction.',
  },
  {
    title: 'Meet-in-the-middle',
    detail:
      'O(2^(n/2)) time and memory; better for large target but moderate n (~40).',
  },
  {
    title: 'Bitset performance',
    detail:
      'Word-level parallelism makes O(n * target / 64) practical for sums up to tens of thousands.',
  },
  {
    title: 'Hardness',
    detail:
      'NP-complete in general. Exponential blowup is unavoidable for worst-case inputs.',
  },
]

const realWorldUses = [
  {
    context: 'Load balancing',
    detail:
      'Split tasks or shards into two machines with nearly equal work to minimize tail latency.',
  },
  {
    context: 'Memory and cache partitioning',
    detail:
      'Assign pages or cache lines to banks for balanced bandwidth.',
  },
  {
    context: 'Risk and portfolio hedging',
    detail:
      'Match positive and negative exposures to reach a target net risk.',
  },
  {
    context: 'Manufacturing and packing',
    detail:
      'Fill two bins or pallets evenly to simplify transport and reduce waste.',
  },
  {
    context: 'Testing and experiment buckets',
    detail:
      'Partition users or experiments so total expected load per bucket is equal.',
  },
]

const examples = [
  {
    title: 'Classic 1D subset sum DP',
    code: `function subsetSum(nums, target):
    dp = array(target + 1, false)
    dp[0] = true
    for w in nums:
        for s from target down to w:
            dp[s] = dp[s] or dp[s - w]
    return dp[target]`,
    explanation:
      'Descending iteration prevents reusing the same item twice. The boolean array encodes reachability of each partial sum.',
  },
  {
    title: 'Partition (equal subset)',
    code: `function canPartition(nums):
    total = sum(nums)
    if total % 2 == 1: return false
    target = total / 2
    return subsetSum(nums, target)`,
    explanation:
      'Partition reduces directly to subset sum on total/2. Odd totals are impossible immediately.',
  },
  {
    title: 'Bitset optimization',
    code: `function subsetSumBitset(nums, target):
    dp = 1 // bit 0 is reachable
    for w in nums:
        dp |= (dp << w)
    return (dp >> target) & 1 == 1`,
    explanation:
      'Bit shifts model adding an item to every reachable sum in parallel. Works when target is within machine word width times number of words.',
  },
  {
    title: 'Meet-in-the-middle (min difference)',
    code: `function minDiff(nums):
    mid = len(nums) / 2
    A = nums[0:mid], B = nums[mid:]
    sumsA = allSubsetSums(A)
    sumsB = allSubsetSums(B).sorted()
    total = sum(nums)
    target = total / 2
    best = INF
    for sa in sumsA:
        need = target - sa
        sb = closestValue(sumsB, need)
        best = min(best, abs(total - 2*(sa + sb)))
    return best`,
    explanation:
      'Enumerating halves and searching complements finds the closest split without scanning every subset.',
  },
]

const pitfalls = [
  'Iterating sums upward in 1D DP will reuse the same item multiple times. Always iterate downward for 0/1 subsets.',
  'For partition, forgetting to check odd total sums wastes time on impossible cases.',
  'Negatives or non-integers break the simple DP; you need offsets or different algorithms.',
  'Overflow when counting subsets in languages with small integer ranges.',
  'Assuming pseudopolynomial DP is fast for huge targets; it is only efficient when target is modest.',
]

const decisionGuidance = [
  'Use 1D boolean DP when target (or total/2) is at most a few tens of thousands.',
  'Use bitset DP when target is moderate and you want constant-factor speedups on CPU.',
  'Use meet-in-the-middle when n is up to ~40 but target is large.',
  'Switch to approximation or heuristics for huge n and huge sums (e.g., greedy with sorting).',
  'If items repeat many times or are small, consider bounded/unbounded knapsack formulations.',
]

const advancedInsights = [
  {
    title: 'Recovering the actual subset',
    detail:
      'Store previous reachable states or a parent pointer to rebuild which items produced the target sum.',
  },
  {
    title: 'Bitset convolution',
    detail:
      'Use word-sized shifts or FFT-based polynomial multiplication to combine groups of items quickly.',
  },
  {
    title: 'FPT by target',
    detail:
      'Runtime depends on target, making the problem fixed-parameter tractable with respect to the sum bound.',
  },
  {
    title: 'Randomized hashing checks',
    detail:
      'For very large targets, randomized modular hashing can quickly rule out impossible sums with low false-positive rates.',
  },
]

const problemFraming = [
  {
    title: 'Inputs and constraints',
    detail:
      'Inputs are usually non-negative integers. Let target be S (or total/2 for partition). The DP complexity scales with S.',
  },
  {
    title: 'Decision vs construction',
    detail:
      'Decision only asks if a subset exists. Construction also asks which items; you must store parents or keep a 2D table.',
  },
  {
    title: 'What changes the answer',
    detail:
      'Strictly increasing S makes the DP slower. Duplicates are fine; negatives require offsetting or different methods.',
  },
]

const dpRecurrence = [
  {
    title: 'State',
    detail:
      'dp[s] is true if some subset of processed items sums to s.',
  },
  {
    title: 'Base',
    detail:
      'dp[0] = true. All other sums start false.',
  },
  {
    title: 'Transition',
    detail:
      'For each item w, set dp[s] = dp[s] OR dp[s - w] for s from target down to w.',
  },
  {
    title: 'Answer',
    detail:
      'Return dp[target] (or for partition, dp[total/2]).',
  },
]

const workedExample = {
  nums: '[3, 34, 4, 12, 5, 2]',
  target: '9',
  result: 'true',
  oneSubset: '[4, 5]',
  steps: [
    'Start: reachable {0}.',
    'After 3: reachable {0, 3}.',
    'After 34: no new sums <= 9, still {0, 3}.',
    'After 4: reachable {0, 3, 4, 7}.',
    'After 12: no new sums <= 9.',
    'After 5: reachable {0, 3, 4, 5, 7, 8, 9} - target hit.',
  ],
}

const partitionExample = {
  nums: '[1, 5, 11, 5]',
  total: '22',
  target: '11',
  result: 'true',
  onePartition: '{1, 5, 5} and {11}',
}

const reconstructionSteps = [
  'Keep a 2D dp table or store parent pointers when dp[s] flips from false to true.',
  'Backtrack from (i, target): if dp[i][s] is true and dp[i-1][s] is false, include item i.',
  'If dp[i-1][s] is true, skip item i and move to i-1.',
  'Stop when s == 0 or i == 0.',
]

const implementationChecklist = [
  'Decide if you need just a boolean or the actual subset; that determines memory strategy.',
  'Use descending sums for 0/1 subsets and ascending for unbounded variants.',
  'Short-circuit when dp[target] becomes true to save time.',
  'Handle empty inputs and zero-valued items explicitly.',
  'Use 64-bit integers if you are counting subsets.',
]

const takeaways = [
  'Subset Sum is NP-complete, but pseudopolynomial DP is practical when the target is small.',
  'Partition reduces to subset sum on half the total and is a staple interview question.',
  'Bitset DP and meet-in-the-middle extend the feasible range for medium inputs.',
  'Descending iteration is crucial to avoid reusing an item in 0/1 settings.',
  'Balance accuracy against cost: exact DP for small targets, heuristics for large ones.',
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const win98HelpStyles = `
.ssp98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.ssp98-window {
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
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

.ssp98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.ssp98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.ssp98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.ssp98-control {
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
  font-family: inherit;
  padding: 0;
}

.ssp98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.ssp98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
  font-family: inherit;
}

.ssp98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.ssp98-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.ssp98-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.ssp98-toc-title {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 10px;
}

.ssp98-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.ssp98-toc-list li {
  margin: 0 0 8px;
}

.ssp98-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.ssp98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.ssp98-doc-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px;
}

.ssp98-section {
  margin: 0 0 20px;
}

.ssp98-heading {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px;
}

.ssp98-subheading {
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 6px;
}

.ssp98-content p,
.ssp98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.ssp98-content p {
  margin: 0 0 10px;
}

.ssp98-content ul,
.ssp98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.ssp98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.ssp98-codebox {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 8px;
  margin: 6px 0 10px;
}

.ssp98-codebox code {
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
  display: block;
}

@media (max-width: 900px) {
  .ssp98-main {
    grid-template-columns: 1fr;
  }

  .ssp98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}
`

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const glossary = [
  { term: 'Subset Sum', definition: 'Decision problem asking whether any subset reaches target S.' },
  { term: 'Partition', definition: 'Special case asking whether a set splits into two equal-sum subsets.' },
  { term: 'Pseudopolynomial', definition: 'Polynomial in numeric target value, not in number of input bits.' },
  { term: 'Bitset DP', definition: 'Represents reachable sums as bits and updates by shift-or operations.' },
  { term: 'Meet-in-the-middle', definition: 'Splits input and combines subset sums from each half to reduce exponent.' },
  { term: 'Reachability state', definition: 'Boolean DP entry indicating whether sum s can be formed.' },
  { term: '0/1 transition', definition: 'Descending sum loop so each item is used at most once.' },
  { term: 'Reconstruction', definition: 'Backtracking or parent pointers to recover which items were chosen.' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-history', label: 'Historical Context' },
    { id: 'bp-models', label: 'Mental Models' },
    { id: 'bp-framing', label: 'Problem Framing' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-variants', label: 'Problem Variants' },
    { id: 'core-dp', label: 'DP Recurrence' },
    { id: 'core-workflow', label: 'DP Workflow' },
    { id: 'core-impl', label: 'Implementation Notes' },
    { id: 'core-reconstruct', label: 'Reconstruction Notes' },
    { id: 'core-complexity', label: 'Complexity and Tradeoffs' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-guidance', label: 'When to Use It' },
    { id: 'core-advanced', label: 'Advanced Insights' },
    { id: 'core-checklist', label: 'Implementation Checklist' },
  ],
  examples: [
    { id: 'ex-worked', label: 'Worked Example' },
    { id: 'ex-code', label: 'Practical Examples' },
    { id: 'ex-applications', label: 'Real-World Applications' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

export default function SubsetSumPartitionPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab: TabId = isTabId(searchParams.get('tab')) ? (searchParams.get('tab') as TabId) : 'big-picture'
  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Subset Sum & Partition (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Subset Sum & Partition',
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

  return (
    <div className="ssp98-help-page">
      <style>{win98HelpStyles}</style>
      <div className="ssp98-window" role="presentation">
        <header className="ssp98-titlebar">
          <span className="ssp98-title-text">Subset Sum &amp; Partition</span>
          <div className="ssp98-title-controls">
            <button className="ssp98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="ssp98-control" aria-label="Close">X</Link>
          </div>
        </header>
        <div className="ssp98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`ssp98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setSearchParams((prev) => {
                const next = new URLSearchParams(prev)
                next.set('tab', tab.id)
                return next
              }, { replace: true })}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="ssp98-main">
          <aside className="ssp98-toc" aria-label="Table of contents">
            <h2 className="ssp98-toc-title">Contents</h2>
            <ul className="ssp98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="ssp98-content">
            <h1 className="ssp98-doc-title">Subset Sum &amp; Partition</h1>
            <p>
              Subset Sum asks whether any subset hits a target total. Partition asks for a perfect split between two halves.
              Both ride on the same pseudopolynomial DP that grows with the sum bound, not just the item count.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="ssp98-section">
                  <h2 className="ssp98-heading">Overview</h2>
                  <p>
                    Subset Sum and Partition show how dynamic programming can convert an NP-complete problem into something tractable
                    when numeric bounds are modest. The DP marks which sums are reachable, building outward like ripples as each item is considered.
                  </p>
                  <p>
                    When totals are too large, alternative techniques like meet-in-the-middle or heuristics take over.
                  </p>
                </section>
                <hr className="ssp98-divider" />
                <section id="bp-history" className="ssp98-section">
                  <h2 className="ssp98-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <div key={item.title}>
                      <h3 className="ssp98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>
                <section id="bp-models" className="ssp98-section">
                  <h2 className="ssp98-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <div key={item.title}>
                      <h3 className="ssp98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>
                <section id="bp-framing" className="ssp98-section">
                  <h2 className="ssp98-heading">Problem Framing</h2>
                  {problemFraming.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-takeaways" className="ssp98-section">
                  <h2 className="ssp98-heading">Key Takeaways</h2>
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
                <section id="core-variants" className="ssp98-section">
                  <h2 className="ssp98-heading">Problem Variants</h2>
                  {problemVariants.map((block) => (
                    <div key={block.heading}>
                      <h3 className="ssp98-subheading">{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
                <section id="core-dp" className="ssp98-section">
                  <h2 className="ssp98-heading">DP Recurrence</h2>
                  {dpRecurrence.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-workflow" className="ssp98-section">
                  <h2 className="ssp98-heading">DP Workflow</h2>
                  {algorithmSteps.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    Correctness sketch: the DP table is closed under adding each item. If a sum s was reachable before, then s + w
                    is reachable after adding item w. Descending iteration preserves the 0/1 constraint.
                  </p>
                </section>
                <section id="core-impl" className="ssp98-section">
                  <h2 className="ssp98-heading">Implementation Notes</h2>
                  {implementationNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-reconstruct" className="ssp98-section">
                  <h2 className="ssp98-heading">Reconstruction Notes</h2>
                  <ol>
                    {reconstructionSteps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </section>
                <section id="core-complexity" className="ssp98-section">
                  <h2 className="ssp98-heading">Complexity and Tradeoffs</h2>
                  {complexityNotes.map((note) => (
                    <p key={note.title}>
                      <strong>{note.title}:</strong> {note.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="ssp98-section">
                  <h2 className="ssp98-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-guidance" className="ssp98-section">
                  <h2 className="ssp98-heading">When to Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
                <section id="core-advanced" className="ssp98-section">
                  <h2 className="ssp98-heading">Advanced Insights</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-checklist" className="ssp98-section">
                  <h2 className="ssp98-heading">Implementation Checklist</h2>
                  <ul>
                    {implementationChecklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                <section id="ex-worked" className="ssp98-section">
                  <h2 className="ssp98-heading">Worked Example</h2>
                  <h3 className="ssp98-subheading">Subset Sum</h3>
                  <p><strong>nums:</strong> {workedExample.nums}</p>
                  <p><strong>target:</strong> {workedExample.target} - <strong>result:</strong> {workedExample.result}</p>
                  <p><strong>One subset:</strong> {workedExample.oneSubset}</p>
                  <ul>
                    {workedExample.steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ul>
                  <h3 className="ssp98-subheading">Partition</h3>
                  <p><strong>nums:</strong> {partitionExample.nums}</p>
                  <p><strong>total:</strong> {partitionExample.total}, <strong>target:</strong> {partitionExample.target}</p>
                  <p><strong>result:</strong> {partitionExample.result}</p>
                  <p><strong>One partition:</strong> {partitionExample.onePartition}</p>
                </section>
                <section id="ex-code" className="ssp98-section">
                  <h2 className="ssp98-heading">Practical Examples</h2>
                  {examples.map((example) => (
                    <div key={example.title}>
                      <h3 className="ssp98-subheading">{example.title}</h3>
                      <div className="ssp98-codebox">
                        <code>{example.code}</code>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>
                <section id="ex-applications" className="ssp98-section">
                  <h2 className="ssp98-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="ssp98-section">
                <h2 className="ssp98-heading">Glossary</h2>
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
