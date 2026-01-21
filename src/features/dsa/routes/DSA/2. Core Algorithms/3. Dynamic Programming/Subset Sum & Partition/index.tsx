import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

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
                through the DP recurrence, reconstruction, bitset accelerations, meet-in-the-middle for medium n, and the common traps to avoid.
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
            <legend>Problem framing</legend>
            <div className="win95-grid win95-grid-3">
              {problemFraming.map((item) => (
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
            <legend>DP recurrence</legend>
            <div className="win95-grid win95-grid-2">
              {dpRecurrence.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
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
            <legend>Worked example</legend>
            <div className="win95-grid win95-grid-2">
              <div className="win95-panel">
                <div className="win95-heading">Subset Sum</div>
                <p className="win95-text">nums = <code>{workedExample.nums}</code></p>
                <p className="win95-text">target = {workedExample.target} - result: {workedExample.result}</p>
                <p className="win95-text">One subset: {workedExample.oneSubset}</p>
                <ul className="win95-list">
                  {workedExample.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ul>
              </div>
              <div className="win95-panel">
                <div className="win95-heading">Partition</div>
                <p className="win95-text">nums = <code>{partitionExample.nums}</code></p>
                <p className="win95-text">total = {partitionExample.total}, target = {partitionExample.target}</p>
                <p className="win95-text">result: {partitionExample.result}</p>
                <p className="win95-text">One partition: {partitionExample.onePartition}</p>
              </div>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Reconstruction notes</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                {reconstructionSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
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
            <legend>Implementation checklist</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {implementationChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
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

