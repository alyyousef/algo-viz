import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'


const mentalModels = [
  {
    title: 'Climbing stairs with skip limits',
    detail:
      'Each element is a step. You can only move to a higher step. The LIS is the longest climb you can chain while obeying the strictly higher rule.',
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
  {
    title: 'Filtering a noisy signal',
    detail:
      'Imagine a jagged sensor reading. LIS extracts the longest steadily rising trend while ignoring short-term dips.',
  },
  {
    title: 'Building a chain of boxes',
    detail:
      'Sort by one dimension, then LIS on the other dimension gives the longest nesting chain without overlaps.',
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
  'Initialize empty tails, tailsIndex, and parent. Iterate left-to-right.',
  'Binary search tails for the first value >= current (lower_bound for strictly increasing). Replace it; if none, append.',
  'Keep tailsIndex[k] storing the array index where tails[k] came from to enable reconstruction.',
  'When you place a value at position k, set parent[i] to tailsIndex[k - 1] (the best chain of length k).',
  'After the scan, tails length is the LIS length. Rebuild by walking parent links from the last stored index.',
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
      'Patience sorting works online - each element processed once with a binary search. Range-query methods are helpful when interleaving queries and updates.',
  },
  {
    title: 'Edge cases',
    detail:
      'Empty input returns 0 (and empty sequence). All equal values return length 1 for strict LIS. Negative values work without changes.',
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
  'Sorting pairs incorrectly in envelope problems - secondary sort must be descending on width/height to avoid falsely extending with equals.',
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


const dpRecurrence = [
  {
    title: 'State definition',
    detail:
      'Let dp[i] be the length of the LIS that ends exactly at index i (must include a[i]). This makes subproblems local and comparable.',
  },
  {
    title: 'Transition',
    detail:
      'dp[i] = 1 + max(dp[j]) over all j < i with a[j] < a[i]. If no such j exists, dp[i] = 1.',
  },
  {
    title: 'Answer',
    detail:
      'The LIS length is max(dp[i]) over all i. To recover one subsequence, store parent[i] = argmax j and backtrack from the best i.',
  },
]

const patienceInvariant = [
  {
    title: 'Invariant',
    detail:
      'After processing prefix a[0..i], tails[k] is the smallest possible tail value of any increasing subsequence of length k+1 within that prefix.',
  },
  {
    title: 'Why replacement is safe',
    detail:
      'Replacing a larger tail with a smaller one of the same length preserves all future extension options and can only help.',
  },
  {
    title: 'Binary search correctness',
    detail:
      'tails is strictly increasing for strict LIS, so lower_bound finds the first position where the current value can serve as a better tail.',
  },
]

const workedExample = {
  input: '[0, 8, 4, 12, 2, 10, 6, 14, 1, 9]',
  steps: [
    {
      i: 0,
      x: 0,
      tails: '[0]',
      note: 'Start a length-1 chain.',
    },
    {
      i: 1,
      x: 8,
      tails: '[0, 8]',
      note: 'Append, new length-2 chain.',
    },
    {
      i: 2,
      x: 4,
      tails: '[0, 4]',
      note: 'Replace 8 with 4 to keep a smaller tail.',
    },
    {
      i: 3,
      x: 12,
      tails: '[0, 4, 12]',
      note: 'Append, new length-3 chain.',
    },
    {
      i: 4,
      x: 2,
      tails: '[0, 2, 12]',
      note: 'Replace 4 with 2; length unchanged, tail improved.',
    },
    {
      i: 5,
      x: 10,
      tails: '[0, 2, 10]',
      note: 'Replace 12 with 10 for a better length-3 tail.',
    },
    {
      i: 6,
      x: 6,
      tails: '[0, 2, 6]',
      note: 'Replace 10 with 6; still length 3.',
    },
    {
      i: 7,
      x: 14,
      tails: '[0, 2, 6, 14]',
      note: 'Append, new length-4 chain.',
    },
    {
      i: 8,
      x: 1,
      tails: '[0, 1, 6, 14]',
      note: 'Replace 2 with 1; smaller tail for length 2.',
    },
    {
      i: 9,
      x: 9,
      tails: '[0, 1, 6, 9]',
      note: 'Replace 14 with 9; final LIS length is 4.',
    },
  ],
}

const implementationChecklist = [
  'Clarify strict vs non-decreasing and choose lower_bound or upper_bound accordingly.',
  'If you need the sequence, track parent[] and tailsIndex[]; length-only can skip them.',
  'Use 0-based indices consistently and test with duplicates and decreasing arrays.',
  'For 2D variants, sort by first dimension asc, second desc before running LIS.',
  'Guard empty input early to avoid indexing errors.',
]

const takeaways = [
  'LIS is a subsequence problem, not a contiguous one - order matters, gaps are allowed.',
  'Patience sorting with binary search shrinks LIS to O(n log n) while staying online.',
  'Tracking parents is the key to reconstruction; tails alone only gives length.',
  'Tie-handling (strict vs non-decreasing) changes the binary search condition and secondary sorts in 2D versions.',
  'Many layout problems (envelopes, nesting, scheduling) reduce to LIS after sorting once.',
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const win98HelpStyles = `
.lis98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.lis98-window {
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

.lis98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.lis98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.lis98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.lis98-control {
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

.lis98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.lis98-tab {
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

.lis98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.lis98-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.lis98-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.lis98-toc-title {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 10px;
}

.lis98-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.lis98-toc-list li {
  margin: 0 0 8px;
}

.lis98-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.lis98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.lis98-doc-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px;
}

.lis98-section {
  margin: 0 0 20px;
}

.lis98-heading {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px;
}

.lis98-subheading {
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 6px;
}

.lis98-content p,
.lis98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.lis98-content p {
  margin: 0 0 10px;
}

.lis98-content ul,
.lis98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.lis98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.lis98-codebox {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 8px;
  margin: 6px 0 10px;
}

.lis98-codebox code {
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
  display: block;
}

@media (max-width: 900px) {
  .lis98-main {
    grid-template-columns: 1fr;
  }

  .lis98-toc {
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

const lisGlossary = [
  {
    term: 'Subsequence',
    definition: 'A sequence formed by deleting elements without changing relative order; elements are not required to be contiguous.',
  },
  {
    term: 'Strict LIS',
    definition: 'Longest subsequence where each next element is strictly greater than the previous one.',
  },
  {
    term: 'LNDS',
    definition: 'Longest non-decreasing subsequence; equal neighbors are allowed.',
  },
  {
    term: 'dp[i]',
    definition: 'In O(n^2) DP, the best LIS length that ends exactly at index i.',
  },
  {
    term: 'tails[k]',
    definition: 'In O(n log n), the minimum possible tail value of any increasing subsequence of length k+1.',
  },
  {
    term: 'lower_bound',
    definition: 'First index with value >= x; used for strict LIS updates.',
  },
  {
    term: 'upper_bound',
    definition: 'First index with value > x; used for non-decreasing variants.',
  },
  {
    term: 'Parent reconstruction',
    definition: 'Track previous index links so one optimal LIS can be rebuilt after processing.',
  },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-mental-models', label: 'Mental Models' },
    { id: 'bp-why', label: 'Why LIS Matters' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-framing', label: 'Problem Framing' },
    { id: 'core-dp', label: 'DP Recurrence' },
    { id: 'core-options', label: 'Algorithm Options' },
    { id: 'core-walkthrough', label: 'Patience Walkthrough' },
    { id: 'core-complexity', label: 'Complexity Notes' },
    { id: 'core-correctness', label: 'Correctness Insights' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-variations', label: 'Variations' },
    { id: 'core-checklist', label: 'Implementation Checklist' },
  ],
  examples: [
    { id: 'ex-worked', label: 'Worked Example' },
    { id: 'ex-code', label: 'Code Examples' },
    { id: 'ex-applications', label: 'Applications' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

export default function LongestIncreasingSubsequenceLISPage(): JSX.Element {
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
    document.title = `Longest Increasing Subsequence (LIS) (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Longest Increasing Subsequence (LIS)',
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
    <div className="lis98-help-page">
      <style>{win98HelpStyles}</style>
      <div className="lis98-window" role="presentation">
        <header className="lis98-titlebar">
          <span className="lis98-title-text">Longest Increasing Subsequence (LIS)</span>
          <div className="lis98-title-controls">
            <button className="lis98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="lis98-control" aria-label="Close">X</Link>
          </div>
        </header>
        <div className="lis98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`lis98-tab ${activeTab === tab.id ? 'active' : ''}`}
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
        <div className="lis98-main">
          <aside className="lis98-toc" aria-label="Table of contents">
            <h2 className="lis98-toc-title">Contents</h2>
            <ul className="lis98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="lis98-content">
            <h1 className="lis98-doc-title">Longest Increasing Subsequence (LIS)</h1>
            <p>
              Given an array, LIS finds the longest subsequence (not necessarily contiguous) where each element is strictly larger
              than the previous. It is a core dynamic programming and greedy showcase: a quadratic DP teaches the recurrence and
              reconstruction, while a patience-sorting greedy with binary search delivers O(n log n) performance for large inputs.
              The two approaches compute the same optimal length; the difference is how they maintain and compress state.
            </p>
            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="lis98-section">
                  <h2 className="lis98-heading">Overview</h2>
                  <p>
                    LIS extracts the longest ordered signal hidden in noisy data. It underpins problems like envelope nesting,
                    longest chain of pairs, and trend detection. The elegance comes from combining a monotone structure (tails)
                    with binary search to keep the state minimal and extendable.
                  </p>
                  <p>
                    You can think of it as the smallest set of representatives that still captures every possible increasing
                    length, which is why the greedy strategy is safe.
                  </p>
                </section>
                <hr className="lis98-divider" />
                <section id="bp-mental-models" className="lis98-section">
                  <h2 className="lis98-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <div key={item.title}>
                      <h3 className="lis98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>
                <hr className="lis98-divider" />
                <section id="bp-why" className="lis98-section">
                  <h2 className="lis98-heading">Why LIS Matters</h2>
                  <ul>
                    <li>Canonical DP and greedy example with matching optimal solutions.</li>
                    <li>Reduces many 2D problems (Russian doll envelopes) after sorting.</li>
                    <li>Appears in trend analysis, bioinformatics alignments, and scheduling.</li>
                  </ul>
                </section>
                <hr className="lis98-divider" />
                <section id="bp-takeaways" className="lis98-section">
                  <h2 className="lis98-heading">Key Takeaways</h2>
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
                <section id="core-framing" className="lis98-section">
                  <h2 className="lis98-heading">Problem Framing</h2>
                  <h3 className="lis98-subheading">Definition</h3>
                  <p>
                    Input: array a[0..n-1]. Find the maximum-length sequence of indices i0 &lt; i1 &lt; ... &lt; ik with a[i0] &lt; a[i1] &lt; ...
                    &lt; a[ik]. Strict order; elements do not need to be adjacent.
                  </p>
                  <p>Output can be length only or the subsequence itself. Reconstruction requires storing predecessors.</p>
                  <h3 className="lis98-subheading">Strict vs non-decreasing</h3>
                  <p>
                    Strict LIS requires a[i] &lt; a[j]. Non-decreasing (LNDS) allows equal values a[i] &lt;= a[j]. The only code
                    change in patience sorting is the binary search condition (lower_bound vs upper_bound), but it changes answers
                    when duplicates appear.
                  </p>
                  <h3 className="lis98-subheading">Edge cases</h3>
                  <ul>
                    <li>Empty input returns length 0 and an empty subsequence.</li>
                    <li>All decreasing values give length 1.</li>
                    <li>Repeated values depend on strict vs non-decreasing rules.</li>
                  </ul>
                </section>
                <section id="core-dp" className="lis98-section">
                  <h2 className="lis98-heading">DP Recurrence (O(n^2))</h2>
                  {dpRecurrence.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-options" className="lis98-section">
                  <h2 className="lis98-heading">Algorithm Options</h2>
                  {algorithmOptions.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    Start with O(n^2) DP to grasp the recurrence, then switch to patience sorting for scale. Both compute identical
                    answers; they differ only in efficiency and reconstruction bookkeeping.
                  </p>
                </section>
                <section id="core-walkthrough" className="lis98-section">
                  <h2 className="lis98-heading">Step-by-step (Patience Sorting)</h2>
                  <ol>
                    {walkthroughSteps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                  <h3 className="lis98-subheading">Invariants</h3>
                  {patienceInvariant.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-complexity" className="lis98-section">
                  <h2 className="lis98-heading">Complexity Notes</h2>
                  {complexityNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-correctness" className="lis98-section">
                  <h2 className="lis98-heading">Correctness Insights</h2>
                  {correctnessInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="lis98-section">
                  <h2 className="lis98-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-variations" className="lis98-section">
                  <h2 className="lis98-heading">Variations and Related Problems</h2>
                  {variations.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-checklist" className="lis98-section">
                  <h2 className="lis98-heading">Implementation Checklist</h2>
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
                <section id="ex-worked" className="lis98-section">
                  <h2 className="lis98-heading">Worked Example</h2>
                  <p>
                    <strong>Input:</strong> nums = <code>{workedExample.input}</code>
                  </p>
                  <ol>
                    {workedExample.steps.map((step) => (
                      <li key={`${step.i}-${step.x}`}>
                        i={step.i}, x={step.x}, tails={step.tails}. {step.note}
                      </li>
                    ))}
                  </ol>
                </section>
                <section id="ex-code" className="lis98-section">
                  <h2 className="lis98-heading">Practical Code Examples</h2>
                  {codeExamples.map((example) => (
                    <div key={example.title}>
                      <h3 className="lis98-subheading">{example.title}</h3>
                      <div className="lis98-codebox">
                        <code>{example.code}</code>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>
                <section id="ex-applications" className="lis98-section">
                  <h2 className="lis98-heading">Applications</h2>
                  {applications.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="lis98-section">
                <h2 className="lis98-heading">Glossary</h2>
                {lisGlossary.map((item) => (
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

