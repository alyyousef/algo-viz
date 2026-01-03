import { Link } from 'react-router-dom'

import type { JSX } from 'react'

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

const historicalMilestones = [
  {
    title: '1974: Karp lists Subset Sum as NP-complete',
    detail:
      'Subset Sum joins the classic NP-complete set, explaining why exponential-time algorithms are the baseline.',
  },
  {
    title: '1980s: Pseudopolynomial DP popularized',
    detail:
      'The table-based DP shows that the problem is easy when the target sum is small, even if the input size is large.',
  },
  {
    title: '1990s: Meet-in-the-middle for n ≈ 40',
    detail:
      'Horowitz-Sahni style splitting halves the exponent from 2^n to 2^(n/2), making medium instances tractable.',
  },
  {
    title: 'Modern: Bitset convolution tricks',
    detail:
      'Bitset shifts and FFT-style subset convolutions speed up reachability checks for moderate sums on modern CPUs.',
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
    title: 'Prune large weights early',
    detail:
      'Discard weights greater than target for decision problems. Sort descending to hit target faster and prune branches.',
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
      'O(2^(n/2)) time and memory; better for large target but moderate n (≈ 40).',
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
  'Assuming pseudopolynomial DP is fast for huge targets—it is only efficient when target is modest.',
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

const takeaways = [
  'Subset Sum is NP-complete, but pseudopolynomial DP is practical when the target is small.',
  'Partition reduces to subset sum on half the total and is a staple interview question.',
  'Bitset DP and meet-in-the-middle extend the feasible range for medium inputs.',
  'Descending iteration is crucial to avoid reusing an item in 0/1 settings.',
  'Balance accuracy against cost: exact DP for small targets, heuristics for large ones.',
]

export default function SubsetSumPartitionPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Subset Sum &amp; Partition</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">
              X
            </Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Reachable sums, balanced partitions, and the DP that powers both</div>
              <p className="win95-text">
                Subset Sum asks whether any subset hits a target total. Partition asks for a perfect split between two halves.
                Both ride on the same pseudopolynomial DP that grows with the sum bound, not just the item count. This page walks
                through the core recurrence, bitset accelerations, meet-in-the-middle for medium n, and the common traps to avoid.
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
                Subset Sum and Partition show how dynamic programming can convert an NP-complete problem into something tractable
                when numeric bounds are modest. The DP marks which sums are reachable, building outward like ripples as each item is
                considered. When totals are too large, alternative techniques like meet-in-the-middle or heuristics take over.
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
            <legend>How it works: problem variants</legend>
            <div className="win95-grid win95-grid-3">
              {problemVariants.map((block) => (
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
            <legend>How it works: DP workflow</legend>
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
                Correctness sketch: the DP table is closed under adding each item. If a sum s was reachable before, then s + w is
                reachable after adding item w. Iterating items once in descending sum order preserves the 0/1 constraint. The
                monotone growth of reachable sums guarantees you find the target if it exists.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Implementation notes</legend>
            <div className="win95-grid win95-grid-2">
              {implementationNotes.map((item) => (
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
              {complexityNotes.map((note) => (
                <div key={note.title} className="win95-panel">
                  <div className="win95-heading">{note.title}</div>
                  <p className="win95-text">{note.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                Subset Sum is easy when the target is small, hard in the worst case, and flexible enough to admit faster special
                cases via bitsets or meet-in-the-middle. Choose the technique that matches your constraints on n, target, and memory.
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
