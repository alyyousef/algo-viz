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

const mentalModels = [
  {
    title: 'Climbing stairs with skip limits',
    detail:
      'Each element is a step. You can only move to a higher step. The longest increasing subsequence is the maximum climb you can chain by obeying the strictly higher rule.',
  },
  {
    title: 'Version chain',
    detail:
      'Think of versions tagged with numbers. A valid upgrade path only moves to higher numbers. LIS finds the longest compatible upgrade path hidden in noisy releases.',
  },
  {
    title: 'Patience sorting piles',
    detail:
      'Cards with numbers are placed into piles using binary search. The number of piles equals the LIS length, and tracking parents reconstructs the best chain.',
  },
]

const algorithmOptions = [
  {
    title: 'O(n^2) dynamic programming',
    detail:
      'dp[i] = longest length ending at i. For each i, scan all j < i with a[j] < a[i]. Simple, easy to derive, good for n up to a few thousand.',
  },
  {
    title: 'Patience sorting with binary search (O(n log n))',
    detail:
      'Maintain tails[k] = minimum possible tail of an increasing subsequence of length k+1. Use lower_bound to place each value. Fast for large n and streaming-friendly.',
  },
  {
    title: 'Coordinate compression + Fenwick/segment tree',
    detail:
      'When values are large or you need updates/queries on ranges, compress values and take LIS as a longest path in a DAG over value order, using range max queries.',
  },
]

const walkthroughSteps = [
  'Initialize empty tails. Iterate left-to-right.',
  'Binary search tails for the first value >= current (lower_bound for strictly increasing). Replace it; if none, append.',
  'Keep indexOfLength[k] storing the array index where tails[k] came from to enable reconstruction.',
  'Maintain parent[i] pointing to the predecessor index chosen for nums[i] when it extends a subsequence.',
  'After the scan, the tails size is the LIS length. Rebuild by walking parents from the last stored index.',
]

const complexityNotes = [
  {
    title: 'Time and space',
    detail:
      'Quadratic DP is O(n^2) time, O(n) space. Patience sorting is O(n log n) time, O(n) space to track parents for reconstruction.',
  },
  {
    title: 'Strict vs non-decreasing',
    detail:
      'Use lower_bound (first >=) for strictly increasing. Use upper_bound (first >) for non-decreasing to allow equal values in the subsequence.',
  },
  {
    title: 'Stability and reconstruction',
    detail:
      'tails alone gives only length. To recover one optimal sequence, store parent links and the index that last achieved each length.',
  },
  {
    title: 'Streaming and online use',
    detail:
      'Patience sorting works online—each element processed once with a binary search. Range-query methods are helpful when interleaving queries and updates.',
  },
]

const correctnessInsights = [
  {
    title: 'Greedy choice',
    detail:
      'Keeping the smallest possible tail for each length is safe: a smaller tail cannot block future extensions and dominates any larger tail for the same length.',
  },
  {
    title: 'Monotone tails array',
    detail:
      'tails is strictly increasing. Binary search is valid and bounds the replacement position, preventing missed opportunities for extension.',
  },
  {
    title: 'Parent reconstruction',
    detail:
      'When an element lands at position k in tails, its parent is the index stored for k-1. Walking parents backward yields a valid LIS of maximal length.',
  },
]

const applications = [
  {
    context: 'Versioning and dependency resolution',
    detail:
      'Find the longest compatible upgrade chain or detect maximal ordered subsets of APIs, schema changes, or migrations.',
  },
  {
    context: 'Signal processing and trend detection',
    detail:
      'Identify longest upward trends in noisy series (stock prices, telemetry metrics) without requiring contiguous segments.',
  },
  {
    context: 'Geometry and scheduling',
    detail:
      'Equivalent to longest chain of non-crossing envelopes/intervals after sorting. Useful in nesting problems and sequence alignment.',
  },
  {
    context: 'Compiler optimizations',
    detail:
      'Used inside register allocation heuristics and instruction scheduling to find longest precedence-respecting chains.',
  },
]

const pitfalls = [
  'Confusing subsequence with substring: LIS is not required to be contiguous.',
  'Using upper_bound when the problem is strictly increasing (or vice versa) changes answers on duplicates.',
  'Forgetting to capture parents/indexes when you need the actual sequence, not just its length.',
  'Sorting pairs incorrectly in envelope problems—secondary sort must be descending on width/height to avoid falsely extending with equals.',
  'Not resetting state between test cases in streaming contexts, leading to reused tails.',
]

const variations = [
  {
    title: 'Non-decreasing subsequence (LNDS)',
    detail: 'Swap lower_bound with upper_bound to permit equal neighbors.',
  },
  {
    title: '2D/box nesting',
    detail:
      'Sort by one dimension and run LIS on the second after breaking ties in descending order to prevent invalid chains.',
  },
  {
    title: 'Bitonic subsequence',
    detail: 'Compute LIS left-to-right and right-to-left on reversed array; combine to maximize up-then-down chains.',
  },
  {
    title: 'K-constrained LIS',
    detail: 'Only allow jumps within value/window constraints; use segment trees over indices or values to enforce limits.',
  },
]

const codeExamples = [
  {
    title: 'Quadratic DP (length only)',
    code: `function lisQuadratic(nums):
    if nums is empty: return 0
    dp = array(len(nums), fill=1)
    best = 1
    for i in 0..len(nums)-1:
        for j in 0..i-1:
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)
        best = max(best, dp[i])
    return best`,
    explanation:
      'Direct definition of LIS ending at i. Easy to code, good for pedagogy and small inputs.',
  },
  {
    title: 'Patience sorting + reconstruction (O(n log n))',
    code: `function lis(nums):
    tails = []                 // smallest tail for each length
    tailsIndex = []            // index in nums that achieved that tail
    parent = array(len(nums), fill=-1)

    for i, x in enumerate(nums):
        pos = lower_bound(tails, x)   // first >= x for strictly increasing
        if pos == len(tails):
            tails.append(x)
            tailsIndex.append(i)
        else:
            tails[pos] = x
            tailsIndex[pos] = i
        if pos > 0:
            parent[i] = tailsIndex[pos - 1]

    k = tailsIndex[len(tailsIndex) - 1]  // last element of LIS
    seq = []
    while k != -1:
        seq.append(nums[k])
        k = parent[k]
    return reverse(seq)`,
    explanation:
      'Binary search keeps tails sorted. parents and tailsIndex retain enough breadcrumbs to rebuild one optimal LIS.',
  },
  {
    title: 'Coordinate compression + Fenwick tree',
    code: `function lisFenwick(nums):
    coords = compress(nums)          // map values to 1..m in sorted order
    bit = Fenwick(m)                 // stores best length up to value
    parent = array(len(nums), fill=-1)
    bestIndexForVal = array(m+1, fill=-1)

    for i, x in enumerate(nums):
        c = coords[i]
        bestLen, prevIdx = bit.query(c - 1)   // best below current value
        bit.update(c, bestLen + 1, i)
        parent[i] = prevIdx

    endIdx = bit.argMax()            // index that achieved global best
    return rebuildUsing(parent, endIdx, nums)`,
    explanation:
      'Useful when values are large but range queries must be fast, or when interleaving updates/queries in online variants.',
  },
]

const takeaways = [
  'LIS is a subsequence problem, not a contiguous one—order matters, gaps are allowed.',
  'Patience sorting with binary search shrinks LIS to O(n log n) while staying online.',
  'Tracking parents is the key to reconstruction; tails alone only gives length.',
  'Tie-handling (strict vs non-decreasing) changes the binary search condition and secondary sorts in 2D versions.',
  'Many layout problems (envelopes, nesting, scheduling) reduce to LIS after sorting once.',
]

export default function LongestIncreasingSubsequenceLISPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Longest Increasing Subsequence (LIS)</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">
              X
            </Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Build the longest strictly increasing chain inside a sequence</div>
              <p className="win95-text">
                Given an array, LIS finds the longest subsequence (not necessarily contiguous) where each element is strictly larger
                than the previous. It is a core dynamic programming and greedy showcase: a quadratic DP teaches the recurrence, and
                a patience-sorting greedy with binary search delivers O(n log n) performance.
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
                LIS extracts the longest ordered signal hidden in noisy data. It underpins problems like envelope nesting, longest
                chain of pairs, and trend detection. The elegance comes from combining a monotone structure (tails) with binary search
                to keep the state minimal and extendable.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Mental models</legend>
            <div className="win95-grid win95-grid-3">
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
            <div className="win95-grid win95-grid-2">
              <div className="win95-panel">
                <div className="win95-heading">Definition</div>
                <p className="win95-text">
                  Input: array a[0..n-1]. Find the maximum-length sequence of indices i0 &lt; i1 &lt; ... &lt; ik with a[i0] &lt; a[i1] &lt; ...
                  &lt; a[ik]. Strict order; elements do not need to be adjacent.
                </p>
                <p className="win95-text">
                  Output can be length only or the subsequence itself. Reconstruction requires storing predecessors.
                </p>
              </div>
              <div className="win95-panel">
                <div className="win95-heading">Why it matters</div>
                <ul className="win95-list">
                  <li>Canonical DP and greedy example with matching optimal solutions.</li>
                  <li>Reduces many 2D problems (Russian doll envelopes) after sorting.</li>
                  <li>Appears in trend analysis, bioinformatics alignments, and scheduling.</li>
                </ul>
              </div>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Algorithm options</legend>
            <div className="win95-grid win95-grid-3">
              {algorithmOptions.map((option) => (
                <div key={option.title} className="win95-panel">
                  <div className="win95-heading">{option.title}</div>
                  <p className="win95-text">{option.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                Start with O(n^2) DP to grasp the recurrence, then switch to patience sorting for scale. Both compute identical answers;
                they differ only in efficiency and reconstruction bookkeeping.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Step-by-step (patience sorting)</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                {walkthroughSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity & correctness</legend>
            <div className="win95-grid win95-grid-2">
              {complexityNotes.map((note) => (
                <div key={note.title} className="win95-panel">
                  <div className="win95-heading">{note.title}</div>
                  <p className="win95-text">{note.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-grid win95-grid-3" style={{ marginTop: '6px' }}>
              {correctnessInsights.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Practical examples</legend>
            <div className="win95-stack">
              {codeExamples.map((example) => (
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
            <legend>Applications</legend>
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
            <legend>Variations & related problems</legend>
            <div className="win95-grid win95-grid-2">
              {variations.map((item) => (
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
