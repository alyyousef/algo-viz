import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: 'Binary search formalized (1940s-1960s)',
    detail:
      'Exponential search builds on binary search by adding a fast bounding phase to handle unknown or unbounded sizes.',
  },
  {
    title: 'Galloping search in merges (1990s)',
    detail:
      'Library merges introduced exponential probing to skip ahead when one run dominates, a close cousin of exponential search.',
  },
  {
    title: 'Unbounded arrays and indexed APIs',
    detail:
      'Search on paged files, memory-mapped data, or "infinite" sequences revived the need for fast bounds discovery.',
  },
]

const mentalModels = [
  {
    title: 'Expanding spotlight',
    detail:
      'Scan 1, 2, 4, 8... until the target is inside the lit area, then zoom in with binary search.',
  },
  {
    title: 'Find the fence first',
    detail:
      'You do not need the whole size. You only need a left and right fence that trap the target.',
  },
  {
    title: 'Two-phase search',
    detail:
      'Phase 1 grows a window exponentially. Phase 2 does a precise binary search inside that window.',
  },
]

const mechanics = [
  {
    heading: 'Phase 1: bound discovery',
    bullets: [
      'Check index 0 to handle the smallest case quickly.',
      'Start bound = 1 and double while bound < n and a[bound] < target.',
      'Stop when you pass the target or run past the array size.',
    ],
  },
  {
    heading: 'Phase 2: binary search',
    bullets: [
      'Left = floor(bound / 2); right = min(bound, n - 1).',
      'Run binary search inside [left, right].',
      'Return the index if found, else -1.',
    ],
  },
  {
    heading: 'Correctness intuition',
    bullets: [
      'By construction, a[left] < target <= a[right] (or right is end).',
      'Binary search is valid because the window is sorted.',
      'No element outside the window can be the target.',
    ],
  },
]

const prerequisites = [
  'Array must be sorted in non-decreasing order.',
  'Random access is required for probing and binary search.',
  'If n is unknown, you need safe out-of-range checks or a sentinel API.',
]

const stepTrace = [
  {
    step: 'Start',
    state: 'a = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33], target = 24',
    note: 'Check index 0 first: a[0] = 3, not equal.',
  },
  {
    step: 'Expand bounds',
    state: 'bound = 1 -> 2 -> 4 -> 8',
    note: 'Values at 1,2,4 are < 24. At 8 we see 27, which stops the expansion.',
  },
  {
    step: 'Binary search window',
    state: 'left = 4, right = 8',
    note: 'Binary search in [4..8] finds 24 at index 7.',
  },
]

const complexityNotes = [
  {
    title: 'Time',
    detail:
      'O(log i) to find the bound and O(log i) to binary search it, where i is the target index. Worst case is O(log n).',
  },
  {
    title: 'Space',
    detail: 'O(1) extra space. No additional buffers are needed.',
  },
  {
    title: 'Why it can beat binary search',
    detail:
      'If the target is near the front, the bound phase ends quickly and the search window is tiny.',
  },
]

const comparisonTable = [
  {
    algorithm: 'Linear search',
    sorted: 'No',
    time: 'O(n)',
    needsN: 'No',
    notes: 'Best for tiny arrays or unsorted data.',
  },
  {
    algorithm: 'Binary search',
    sorted: 'Yes',
    time: 'O(log n)',
    needsN: 'Yes',
    notes: 'Fast when size is known; no bound discovery.',
  },
  {
    algorithm: 'Jump search',
    sorted: 'Yes',
    time: 'O(sqrt(n))',
    needsN: 'Yes',
    notes: 'Fixed step size; slower than binary for large n.',
  },
  {
    algorithm: 'Interpolation search',
    sorted: 'Yes',
    time: 'O(log log n) avg',
    needsN: 'Yes',
    notes: 'Needs near-uniform distribution; can degrade to O(n).',
  },
  {
    algorithm: 'Exponential search',
    sorted: 'Yes',
    time: 'O(log i)',
    needsN: 'No',
    notes: 'Best when size is unknown or target is near front.',
  },
]

const realWorldUses = [
  {
    context: 'Unknown-size arrays',
    detail:
      'Search inside data structures where size is unknown or expensive to query, such as virtual arrays or external indexes.',
  },
  {
    context: 'Paged files and memory-mapped data',
    detail:
      'Find a small window quickly to reduce page faults and disk reads before doing binary search.',
  },
  {
    context: 'Galloping in merges',
    detail:
      'TimSort-style merges use exponential probing to skip ahead when one run wins repeatedly.',
  },
  {
    context: 'Streaming or append-only logs',
    detail:
      'If you can access by index but the data grows, exponential search gives fast bounds without a fresh size lookup.',
  },
]

const examples = [
  {
    title: 'Exponential search (TypeScript-like pseudocode)',
    code: `function exponentialSearch(a: number[], target: number): number {
  if (a.length === 0) return -1;
  if (a[0] === target) return 0;

  let bound = 1;
  while (bound < a.length && a[bound] < target) {
    bound *= 2;
  }

  const left = Math.floor(bound / 2);
  const right = Math.min(bound, a.length - 1);
  return binarySearch(a, target, left, right);
}

function binarySearch(a: number[], target: number, left: number, right: number): number {
  let lo = left;
  let hi = right;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (a[mid] === target) return mid;
    if (a[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}`,
    explanation:
      'The bound phase traps the target between left and right. Binary search finishes inside that window.',
  },
  {
    title: 'Safe accessor for unknown size',
    code: `function getValue(a: number[], index: number): number | null {
  return index >= 0 && index < a.length ? a[index] : null;
}

function exponentialSearchUnknown(a: number[], target: number): number {
  if (getValue(a, 0) === target) return 0;
  let bound = 1;
  while (true) {
    const value = getValue(a, bound);
    if (value === null || value >= target) break;
    bound *= 2;
  }
  const left = Math.floor(bound / 2);
  const right = Math.min(bound, a.length - 1);
  return binarySearch(a, target, left, right);
}`,
    explanation:
      'When size is unknown, guard out-of-range reads and treat them as an upper bound.',
  },
]

const pitfalls = [
  'Skipping the a[0] check can miss a match at index 0.',
  'Using a[bound] <= target in the expansion loop can skip a direct hit.',
  'Failing to clamp right to n - 1 causes out-of-range access.',
  'Applying the algorithm to unsorted data invalidates both phases.',
]

const decisionGuidance = [
  'Need to search a sorted structure with unknown length: exponential search is a strong default.',
  'Targets tend to be near the front: exponential search usually beats binary search.',
  'Known length and random access: plain binary search is simpler and equally optimal.',
  'Data is unsorted or not random-access: use linear search or a different index.',
]

const advancedInsights = [
  {
    title: 'Window size is always tight',
    detail:
      'The window size is at most 2i, so the binary phase never grows beyond a small multiple of the target index.',
  },
  {
    title: 'Doubling is cache-friendly',
    detail:
      'Probing powers of two is predictable and can be optimized by prefetching in low-level implementations.',
  },
  {
    title: 'Batching searches',
    detail:
      'If you search many targets, keep the last bound and reuse it as the next starting point for nearby queries.',
  },
  {
    title: 'Galloping merge reuse',
    detail:
      'The same bound-then-binary idea appears in high-performance merges to skip long streaks quickly.',
  },
]

const takeaways = [
  'Exponential search adds a fast bounding phase to binary search.',
  'It is ideal for unknown-size data and early targets.',
  'Worst-case time matches binary search, but best-case often wins.',
  'Correctness relies on sorted input and careful bound handling.',
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

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

.win98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
}

.win98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
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
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-mental-models', label: 'Mental Models' },
    { id: 'core-mechanics', label: 'How It Works' },
    { id: 'core-prerequisites', label: 'Prerequisites' },
    { id: 'core-trace', label: 'Worked Trace' },
    { id: 'core-complexity', label: 'Complexity' },
    { id: 'core-compare', label: 'Comparison Snapshot' },
    { id: 'core-applications', label: 'Real-World Applications' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-when-to-use', label: 'When to Use It' },
    { id: 'core-advanced', label: 'Advanced Insights' },
  ],
  examples: [{ id: 'ex-code', label: 'Code Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

const glossary = [
  {
    term: 'Bound discovery',
    definition: 'The doubling phase that finds a window likely to contain the target.',
  },
  {
    term: 'Search window',
    definition: 'The [left, right] range used for the binary search phase.',
  },
  {
    term: 'Galloping search',
    definition: 'A variant of exponential probing often used in merge algorithms.',
  },
  {
    term: 'Target index (i)',
    definition: 'Index of the sought value; complexity is often expressed as O(log i).',
  },
  {
    term: 'Safe accessor',
    definition: 'A guarded index read that handles out-of-range access in unknown-size settings.',
  },
]

export default function ExponentialSearchPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTabParam = searchParams.get('tab')
  const activeTab: TabId = isTabId(activeTabParam) ? activeTabParam : 'big-picture'
  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Exponential Search (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Exponential Search',
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
    <div className="win98-help-page">
      <style>{win98HelpStyles}</style>
      <div className="win98-window" role="presentation">
        <header className="win98-titlebar">
          <span className="win98-title-text">Exponential Search</span>
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
              onClick={() => setSearchParams((prev) => {
                const nextParams = new URLSearchParams(prev)
                nextParams.set('tab', tab.id)
                return nextParams
              })}
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
            <h1 className="win98-doc-title">Exponential Search</h1>
            <p>
              Exponential search is a two-phase strategy for sorted data. It expands a search window by powers of two until the target
              is bracketed, then runs binary search inside that window. It shines when the size is unknown or when targets tend to be
              near the front.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="win98-section">
                  <h2 className="win98-heading">Overview</h2>
                  <p>
                    Think of exponential search as binary search with a fast "find the fence" prelude. The prelude is cheap when the
                    target is early and still bounded by log n when it is late, so worst-case performance stays logarithmic.
                  </p>
                  {complexityNotes.map((note) => (
                    <p key={note.title}>
                      <strong>{note.title}:</strong> {note.detail}
                    </p>
                  ))}
                </section>
                <hr className="win98-divider" />
                <section id="bp-history" className="win98-section">
                  <h2 className="win98-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
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
                <section id="core-mental-models" className="win98-section">
                  <h2 className="win98-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-mechanics" className="win98-section">
                  <h2 className="win98-heading">How It Works</h2>
                  {mechanics.map((block) => (
                    <div key={block.heading}>
                      <h3 className="win98-subheading">{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
                <section id="core-prerequisites" className="win98-section">
                  <h2 className="win98-heading">Prerequisites and Assumptions</h2>
                  <ul>
                    {prerequisites.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-trace" className="win98-section">
                  <h2 className="win98-heading">Worked Trace</h2>
                  {stepTrace.map((item) => (
                    <div key={item.step}>
                      <h3 className="win98-subheading">{item.step}</h3>
                      <p><strong>State:</strong> <code>{item.state}</code></p>
                      <p>{item.note}</p>
                    </div>
                  ))}
                </section>
                <section id="core-complexity" className="win98-section">
                  <h2 className="win98-heading">Complexity Analysis and Intuition</h2>
                  {complexityNotes.map((note) => (
                    <p key={note.title}>
                      <strong>{note.title}:</strong> {note.detail}
                    </p>
                  ))}
                </section>
                <section id="core-compare" className="win98-section">
                  <h2 className="win98-heading">Comparison Snapshot</h2>
                  {comparisonTable.map((row) => (
                    <p key={row.algorithm}>
                      <strong>{row.algorithm}:</strong> Sorted: {row.sorted}. Time: {row.time}. Needs n: {row.needsN}. {row.notes}
                    </p>
                  ))}
                </section>
                <section id="core-applications" className="win98-section">
                  <h2 className="win98-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="win98-section">
                  <h2 className="win98-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
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
                <section id="core-advanced" className="win98-section">
                  <h2 className="win98-heading">Advanced Insights</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <section id="ex-code" className="win98-section">
                <h2 className="win98-heading">Code Examples</h2>
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
