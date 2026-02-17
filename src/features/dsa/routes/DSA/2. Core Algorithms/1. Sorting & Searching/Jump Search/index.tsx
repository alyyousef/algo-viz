import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: 'Block search ideas in early indexing',
    detail:
      'Before modern caches, scanning in chunks reduced expensive disk seeks and tape operations. Jump search formalized this pattern on arrays.',
  },
  {
    title: 'Jump search popularized in teaching',
    detail:
      'It became a common step between linear and binary search to explain time-space tradeoffs and block-based reasoning.',
  },
  {
    title: 'Hybrid searching in practice',
    detail:
      'Many real systems use a coarse jump or index to find a region, then a tight linear scan for final selection.',
  },
  {
    title: 'Cache-aware variants',
    detail:
      'Choosing step sizes that align with cache lines or pages turns jump search into a lightweight cache-aware strategy.',
  },
]

const mentalModels = [
  {
    title: 'Skimming the table of contents',
    detail:
      'Jump search is like flipping through every k-th page, then reading the final section line by line.',
  },
  {
    title: 'Stepping stones',
    detail:
      'You hop forward in fixed strides until you overshoot the target, then walk back within the last block.',
  },
  {
    title: 'Two-phase scan',
    detail:
      'A fast coarse search narrows the region, followed by a local linear scan to finish.',
  },
]

const coreConcepts = [
  {
    heading: 'Sorted input required',
    bullets: [
      'Jump search assumes the array is sorted in non-decreasing order.',
      'If the data is unsorted, the method devolves to linear search.',
      'Sorting cost dominates if data is not already ordered.',
    ],
  },
  {
    heading: 'Choose a step size',
    bullets: [
      'Classic choice is step = floor(sqrt(n)).',
      'This balances jump count and linear scan length.',
      'Other sizes can be better if caches or pages dictate.',
    ],
  },
  {
    heading: 'Jump phase',
    bullets: [
      'Compare arr[min(step, n) - 1] to the target.',
      'Keep jumping by step until you find a block that may contain the target.',
      'If you jump past the end, the target is not present.',
    ],
  },
  {
    heading: 'Linear scan phase',
    bullets: [
      'Linearly scan from prev block start to block end.',
      'Stop early if the current value exceeds the target.',
      'Return index on match or -1 on failure.',
    ],
  },
  {
    heading: 'Why sqrt(n)',
    bullets: [
      'You do about n / step jumps and at most step linear checks.',
      'Total work is n / step + step, minimized at step = sqrt(n).',
      'This yields O(sqrt(n)) comparisons.',
    ],
  },
  {
    heading: 'When it wins',
    bullets: [
      'Works well when comparisons are cheap but random access is costly.',
      'Useful when you want a simple method better than linear search.',
      'For CPU arrays, binary search often wins; jump search is a teaching baseline.',
    ],
  },
]

const problemPatterns = [
  {
    title: 'Coarse-to-fine search',
    detail:
      'If you can quickly skip across the space and then scan locally, jump search is a natural fit.',
  },
  {
    title: 'Block-aligned data',
    detail:
      'When data lives in fixed-size blocks (pages, cache lines), jumping by block size reduces random access.',
  },
  {
    title: 'Sorted ranges with cheap sequential scans',
    detail:
      'If sequential access is much cheaper than random access, a block scan can beat binary search.',
  },
]

const reasoningSteps = [
  {
    title: 'Confirm sorted order',
    detail:
      'Jump search relies on sorted data so you can stop early when the block end exceeds the target.',
  },
  {
    title: 'Choose a step size',
    detail:
      'Start with sqrt(n) as a safe default, then adjust if caches or pages suggest a better stride.',
  },
  {
    title: 'Find candidate block',
    detail:
      'Jump until the block end is >= target, then linearly scan within that block.',
  },
  {
    title: 'Validate early exit',
    detail:
      'If the target is outside [blockStart, blockEnd], return not found immediately.',
  },
]

const loopInvariants = [
  {
    title: 'Block invariant',
    detail:
      'Before each linear scan, the target can only be in the current block or later; all previous blocks are too small.',
  },
  {
    title: 'Sorted scan invariant',
    detail:
      'During the linear scan, if arr[i] > target, you can stop early because the rest of the block is larger.',
  },
  {
    title: 'Progress invariant',
    detail:
      'Each jump advances the block boundary by step, guaranteeing termination after at most n/step jumps.',
  },
]

const stepTrace = [
  {
    step: 'Start',
    state: 'arr = [1, 3, 7, 9, 12, 15, 18, 21, 24], target = 18',
    note: 'n = 9, step = floor(sqrt(9)) = 3.',
  },
  {
    step: 'Jump phase',
    state: 'Check arr[2] = 7 < 18 -> jump, arr[5] = 15 < 18 -> jump, arr[8] = 24 >= 18',
    note: 'Candidate block is indices 6..8.',
  },
  {
    step: 'Linear scan',
    state: 'Scan arr[6] = 18',
    note: 'Found the target at index 6.',
  },
]

const complexityNotes = [
  {
    title: 'Time cost',
    detail:
      'Worst-case O(sqrt(n)) comparisons. Best case is O(1) if the target is at the first block boundary.',
  },
  {
    title: 'Space cost',
    detail:
      'O(1) extra space. Only a few indices and counters are maintained.',
  },
  {
    title: 'Comparison count',
    detail:
      'Approximately sqrt(n) jumps plus up to sqrt(n) linear scans in the final block.',
  },
  {
    title: 'Prerequisites',
    detail:
      'The data must be sorted and accessible by index. Jump search is not suited for linked lists.',
  },
]

const performanceProfile = [
  {
    title: 'Best-case speed',
    detail:
      'If the target lands on a block boundary, the search ends after a few jumps.',
  },
  {
    title: 'Worst-case behavior',
    detail:
      'You do about sqrt(n) jumps plus sqrt(n) linear checks, giving O(sqrt(n)).',
  },
  {
    title: 'Access patterns',
    detail:
      'Jumping is sparse; scanning is contiguous. This can be friendlier than binary search on slow memory.',
  },
]

const comparisonTable = [
  {
    algorithm: 'Jump search',
    time: 'O(sqrt(n))',
    space: 'O(1)',
    sorted: 'Yes',
    notes: 'Simple, cache-friendly blocks; slower than binary search on CPU arrays.',
  },
  {
    algorithm: 'Binary search',
    time: 'O(log n)',
    space: 'O(1)',
    sorted: 'Yes',
    notes: 'Fast and reliable; random access pattern.',
  },
  {
    algorithm: 'Exponential search',
    time: 'O(log i)',
    space: 'O(1)',
    sorted: 'Yes',
    notes: 'Best when size is unknown or target is near front.',
  },
  {
    algorithm: 'Interpolation search',
    time: 'O(log log n) avg',
    space: 'O(1)',
    sorted: 'Yes',
    notes: 'Great on uniform data, but can degrade to O(n).',
  },
  {
    algorithm: 'Linear search',
    time: 'O(n)',
    space: 'O(1)',
    sorted: 'No',
    notes: 'Works on unsorted data; simplest but slowest.',
  },
]

const realWorldUses = [
  {
    context: 'Block storage scans',
    detail:
      'Jumping by block size minimizes disk seeks, then a linear scan reads contiguous data.',
  },
  {
    context: 'Telemetry bins',
    detail:
      'Coarse jumps across sorted buckets reduce comparisons before a short local scan.',
  },
  {
    context: 'Cache-friendly lookups',
    detail:
      'Step sizes matching cache lines or pages can outperform pure binary search on large arrays.',
  },
  {
    context: 'Embedded systems',
    detail:
      'Simple loops and predictable memory access make jump search appealing in tight environments.',
  },
  {
    context: 'Teaching and analysis',
    detail:
      'Jump search illustrates how to trade extra structure for fewer comparisons.',
  },
  {
    context: 'Hybrid indexes',
    detail:
      'A coarse jump table plus local scan can form the core of a simple index strategy.',
  },
]

const thinkingShortcuts = [
  'If you can cheaply scan blocks, jump search can beat binary search on slow storage.',
  'If the data is in memory and comparisons are cheap, binary search usually wins.',
  'If you do repeated searches, build a jump table of block starts.',
  'If blocks are huge, reduce step size to avoid long scans.',
]

const examples = [
  {
    title: 'Jump search pseudocode',
    code: `function jumpSearch(arr, target):
    n = length(arr)
    step = floor(sqrt(n))
    prev = 0

    while prev < n and arr[min(step, n) - 1] < target:
        prev = step
        step += floor(sqrt(n))
        if prev >= n: return -1

    while prev < min(step, n) and arr[prev] < target:
        prev += 1

    if prev < n and arr[prev] == target: return prev
    return -1`,
    explanation:
      'Jump in fixed blocks until the block that could contain the target is found, then linearly scan that block.',
  },
  {
    title: 'Picking a custom step size',
    code: `// Choose a step based on cache lines
step = max(1, cacheLineBytes / elementBytes)
step = roundToPowerOfTwo(step)`,
    explanation:
      'If memory access dominates, align jumps to cache lines or pages to reduce misses.',
  },
  {
    title: 'Comparison with binary search',
    code: `Jump search: O(sqrt(n)) comparisons
Binary search: O(log n) comparisons
Linear search: O(n) comparisons`,
    explanation:
      'Jump search sits between linear and binary search. It is simpler than binary search but usually slower on CPU arrays.',
  },
]

const pitfalls = [
  'Applying jump search on unsorted data yields incorrect results.',
  'Using a step size of 0 or forgetting to recompute when n changes.',
  'Not checking array bounds when the last block is smaller than step.',
  'Assuming it beats binary search on modern CPU caches for all inputs.',
  'Stopping the linear scan too late and reading past the block end.',
]

const implementationTips = [
  {
    title: 'Compute step once',
    detail:
      'Use a constant step for the whole search to keep bounds predictable.',
  },
  {
    title: 'Clamp block end',
    detail:
      'Always use min(step, n) - 1 when checking the block end.',
  },
  {
    title: 'Early exit in scan',
    detail:
      'Stop the scan when arr[i] > target to avoid useless comparisons.',
  },
  {
    title: 'Consider a jump table',
    detail:
      'Precomputing every k-th key gives a fast coarse index for repeated queries.',
  },
]

const decisionGuidance = [
  'Need a simple improvement over linear search without recursion: use jump search.',
  'Need asymptotically fastest comparisons on arrays: prefer binary search.',
  'Need predictable linear access patterns on large memory pages: jump search can help.',
  'Data is not sorted or stored as a linked list: use linear search instead.',
  'Large datasets with slow random access: consider jump search or block indexes.',
]

const advancedInsights = [
  {
    title: 'Jump tables as a micro-index',
    detail:
      'Precompute the first element of each block so you can jump by table lookups before scanning locally.',
  },
  {
    title: 'Adaptive steps',
    detail:
      'If searches skew toward early elements, a smaller step can reduce average time at the expense of worst-case cost.',
  },
  {
    title: 'Cache-friendly scanning',
    detail:
      'Linear scans are efficient when they stay in cache. Jump search leverages this by scanning only one block.',
  },
  {
    title: 'Parallel block scan',
    detail:
      'On SIMD or GPUs, jump to candidate blocks and scan in parallel, reducing wall time even with the same asymptotic work.',
  },
]

const takeaways = [
  'Jump search is a two-phase strategy: jump by blocks, then scan locally.',
  'The classic step size is sqrt(n), balancing jumps and scans.',
  'It uses O(1) memory and is easy to implement in simple loops.',
  'Binary search is usually faster on CPU arrays, but jump search can be more cache friendly in some settings.',
  'Always require sorted input and correct block boundaries.',
]

const quickGlossary = [
  {
    term: 'Jump search',
    definition:
      'A two-phase search on sorted arrays that jumps in fixed steps, then linearly scans within one candidate block.',
  },
  {
    term: 'Step size',
    definition:
      'The jump interval, commonly floor(sqrt(n)), chosen to balance block jumps against final scan length.',
  },
  {
    term: 'Candidate block',
    definition:
      'The final range identified by jumping where the target may exist and where linear scanning begins.',
  },
  {
    term: 'Jump phase',
    definition: 'The coarse phase that checks block endpoints until the target range is bracketed.',
  },
  {
    term: 'Linear scan phase',
    definition: 'The fine phase that scans the candidate block sequentially to find the exact index.',
  },
  {
    term: 'Block invariant',
    definition:
      'All completed blocks are strictly too small for the target, so only the current or later blocks can contain it.',
  },
  {
    term: 'Early exit',
    definition:
      'Stopping the scan once a value exceeds the target in sorted data, proving the target is absent in the block.',
  },
  {
    term: 'Jump table',
    definition:
      'A precomputed index of block starts that accelerates repeated coarse-to-fine searches.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-history', label: 'Historical Context' },
    { id: 'bp-mental-models', label: 'Mental Models' },
    { id: 'bp-patterns', label: 'Problem Patterns' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-how-it-works', label: 'How It Works' },
    { id: 'core-reasoning', label: 'Reasoning and Invariants' },
    { id: 'core-complexity', label: 'Complexity and Tradeoffs' },
    { id: 'core-performance', label: 'Performance Profile' },
    { id: 'core-compare', label: 'Compare and Contrast' },
    { id: 'core-applications', label: 'Real-World Applications' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-shortcuts', label: 'Thinking Shortcuts' },
    { id: 'core-implementation', label: 'Implementation Tips' },
    { id: 'core-decisions', label: 'When to Use It' },
    { id: 'core-advanced', label: 'Advanced Insights' },
  ],
  examples: [
    { id: 'ex-trace', label: 'Worked Trace' },
    { id: 'ex-code', label: 'Code Examples' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

const jump98HelpStyles = `
.jump98-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.jump98-window {
  width: 100%;
  min-height: 100dvh;
  margin: 0;
  background: #c0c0c0;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.jump98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.jump98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
}

.jump98-title-controls {
  margin-left: auto;
  display: flex;
  gap: 2px;
}

.jump98-control {
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

.jump98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.jump98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.jump98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.jump98-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.jump98-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.jump98-toc-title {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 10px;
}

.jump98-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.jump98-toc-list li {
  margin: 0 0 8px;
}

.jump98-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.jump98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.jump98-doc-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px;
}

.jump98-section {
  margin: 0 0 20px;
}

.jump98-heading {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px;
}

.jump98-subheading {
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 6px;
}

.jump98-content p,
.jump98-content li,
.jump98-content td,
.jump98-content th {
  font-size: 12px;
  line-height: 1.5;
}

.jump98-content p {
  margin: 0 0 10px;
}

.jump98-content ul,
.jump98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.jump98-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 0 10px;
}

.jump98-content th,
.jump98-content td {
  border: 1px solid #808080;
  padding: 4px 6px;
  text-align: left;
}

.jump98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.jump98-codebox {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 8px;
  margin: 6px 0 10px;
}

.jump98-codebox code {
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
  display: block;
}

@media (max-width: 900px) {
  .jump98-main {
    grid-template-columns: 1fr;
  }

  .jump98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}
`

export default function JumpSearchPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    const tab = searchParams.get('tab')
    return isTabId(tab) ? tab : 'big-picture'
  })
  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Jump Search (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Jump Search',
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
    <div className="jump98-page">
      <style>{jump98HelpStyles}</style>
      <div className="jump98-window" role="presentation">
        <header className="jump98-titlebar">
          <span className="jump98-title-text">Jump Search - Help</span>
          <div className="jump98-title-controls">
            <button className="jump98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="jump98-control" aria-label="Close">X</Link>
          </div>
        </header>

        <div className="jump98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`jump98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="jump98-main">
          <aside className="jump98-toc" aria-label="Table of contents">
            <h2 className="jump98-toc-title">Contents</h2>
            <ul className="jump98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="jump98-content">
            <h1 className="jump98-doc-title">Jump Search</h1>
            <p>
              Jump search works on sorted arrays by jumping ahead in fixed steps and then scanning within the final block. It
              keeps code simple, uses O(1) memory, and cuts comparisons from O(n) to O(sqrt(n)).
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="jump98-section">
                  <h2 className="jump98-heading">Overview</h2>
                  <p>
                    Jump search is a two-phase algorithm: a coarse jump phase that locates a candidate block, and a linear scan
                    phase that confirms the target inside that block. The classic step size is sqrt(n), which minimizes total
                    work.
                  </p>
                </section>
                <hr className="jump98-divider" />
                <section id="bp-history" className="jump98-section">
                  <h2 className="jump98-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-mental-models" className="jump98-section">
                  <h2 className="jump98-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-patterns" className="jump98-section">
                  <h2 className="jump98-heading">Problem Patterns</h2>
                  {problemPatterns.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-takeaways" className="jump98-section">
                  <h2 className="jump98-heading">Key Takeaways</h2>
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
                <section id="core-how-it-works" className="jump98-section">
                  <h2 className="jump98-heading">How It Works</h2>
                  {coreConcepts.map((item) => (
                    <div key={item.heading}>
                      <h3 className="jump98-subheading">{item.heading}</h3>
                      <ul>
                        {item.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
                <section id="core-reasoning" className="jump98-section">
                  <h2 className="jump98-heading">Reasoning and Invariants</h2>
                  <h3 className="jump98-subheading">Reasoning Steps</h3>
                  {reasoningSteps.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <h3 className="jump98-subheading">Loop Invariants</h3>
                  {loopInvariants.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-complexity" className="jump98-section">
                  <h2 className="jump98-heading">Complexity and Tradeoffs</h2>
                  {complexityNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    Jump search is rarely faster than binary search on CPU arrays, but it is easier to implement, and its linear
                    access patterns can be better for systems where random access is expensive.
                  </p>
                  <h3 className="jump98-subheading">Operation Summary</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Operation</th>
                        <th>Time</th>
                        <th>Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Jump phase</td>
                        <td>O(sqrt(n))</td>
                        <td>Check block endpoints until target range found.</td>
                      </tr>
                      <tr>
                        <td>Linear scan</td>
                        <td>O(sqrt(n))</td>
                        <td>Scan within a single block.</td>
                      </tr>
                      <tr>
                        <td>Total search</td>
                        <td>O(sqrt(n))</td>
                        <td>Best case O(1), worst case about 2 * sqrt(n) checks.</td>
                      </tr>
                      <tr>
                        <td>Extra space</td>
                        <td>O(1)</td>
                        <td>No additional arrays required.</td>
                      </tr>
                    </tbody>
                  </table>
                </section>
                <section id="core-performance" className="jump98-section">
                  <h2 className="jump98-heading">Performance Profile</h2>
                  {performanceProfile.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-compare" className="jump98-section">
                  <h2 className="jump98-heading">Compare and Contrast</h2>
                  <table>
                    <thead>
                      <tr>
                        <th>Algorithm</th>
                        <th>Time</th>
                        <th>Space</th>
                        <th>Sorted?</th>
                        <th>Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonTable.map((row) => (
                        <tr key={row.algorithm}>
                          <td>{row.algorithm}</td>
                          <td>{row.time}</td>
                          <td>{row.space}</td>
                          <td>{row.sorted}</td>
                          <td>{row.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
                <section id="core-applications" className="jump98-section">
                  <h2 className="jump98-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="jump98-section">
                  <h2 className="jump98-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-shortcuts" className="jump98-section">
                  <h2 className="jump98-heading">Thinking Shortcuts</h2>
                  <ul>
                    {thinkingShortcuts.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-implementation" className="jump98-section">
                  <h2 className="jump98-heading">Implementation Tips</h2>
                  {implementationTips.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-decisions" className="jump98-section">
                  <h2 className="jump98-heading">When to Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
                <section id="core-advanced" className="jump98-section">
                  <h2 className="jump98-heading">Advanced Insights</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                <section id="ex-trace" className="jump98-section">
                  <h2 className="jump98-heading">Worked Trace</h2>
                  {stepTrace.map((item) => (
                    <div key={item.step}>
                      <h3 className="jump98-subheading">{item.step}</h3>
                      <p>{item.state}</p>
                      <p>{item.note}</p>
                    </div>
                  ))}
                </section>
                <section id="ex-code" className="jump98-section">
                  <h2 className="jump98-heading">Code Examples</h2>
                  {examples.map((example) => (
                    <div key={example.title}>
                      <h3 className="jump98-subheading">{example.title}</h3>
                      <div className="jump98-codebox">
                        <code>{example.code.trim()}</code>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="jump98-section">
                <h2 className="jump98-heading">Glossary</h2>
                {quickGlossary.map((item) => (
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
