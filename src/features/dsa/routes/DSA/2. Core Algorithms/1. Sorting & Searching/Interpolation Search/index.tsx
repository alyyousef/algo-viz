import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

const historicalMilestones = [
  {
    title: '1950s-1960s: Ordered file search',
    detail:
      'Interpolation search emerged from the idea that if data is uniformly distributed, you can guess where the key should be.',
  },
  {
    title: '1970s: Indexed storage systems',
    detail:
      'File systems and databases with dense numeric keys used interpolation-style probing to reduce disk seeks.',
  },
  {
    title: 'Modern use as a specialized tool',
    detail:
      'Today it is a niche optimization: very fast on uniform numeric data, risky on skewed distributions.',
  },
]

const mentalModels = [
  {
    title: 'Phone book guess',
    detail:
      'If you want "Khan" in a phone book, you open around the K section, not the middle. Interpolation search makes that guess numerically.',
  },
  {
    title: 'Ruler-based estimate',
    detail:
      'Given min and max values, estimate the position of the target by proportional distance.',
  },
  {
    title: 'Fast when evenly spaced',
    detail:
      'If values are roughly uniform, each probe lands near the target and shrinks the range aggressively.',
  },
]

const mechanics = [
  {
    heading: 'Position estimate',
    bullets: [
      'Assume values are roughly uniform across the array.',
      'Compute a probe index by linear interpolation between low and high.',
      'Clamp or guard when values are equal to avoid division by zero.',
    ],
  },
  {
    heading: 'Range narrowing',
    bullets: [
      'If a[pos] < target, move low to pos + 1.',
      'If a[pos] > target, move high to pos - 1.',
      'Repeat while target is within [a[low], a[high]].',
    ],
  },
  {
    heading: 'Termination',
    bullets: [
      'Stop when low exceeds high or the target falls outside the value range.',
      'Return the index if found, otherwise -1.',
    ],
  },
]

const problemPatterns = [
  {
    title: 'Range-to-index mapping',
    detail:
      'If values grow roughly linearly with index, you can map a target value to an estimated index using proportional distance.',
  },
  {
    title: 'Ordered numeric domains',
    detail:
      'Any problem where you can map the key to a numeric scale (timestamps, IDs, sorted scores) is a candidate.',
  },
  {
    title: 'Uniform sampling clues',
    detail:
      'When you know data is generated at a fixed rate (e.g., one reading per second), interpolation is a natural fit.',
  },
]

const reasoningSteps = [
  {
    title: 'Verify distribution',
    detail:
      'Ask: are values roughly evenly spaced? If not, assume interpolation is risky.',
  },
  {
    title: 'Check bounds',
    detail:
      'Ensure the target lies between a[low] and a[high] before computing a position estimate.',
  },
  {
    title: 'Guard degeneracy',
    detail:
      'If a[low] === a[high], you only have one possible value; avoid division by zero.',
  },
  {
    title: 'Measure progress',
    detail:
      'If the probe barely moves, switch to binary search to avoid worst-case drift.',
  },
]

const loopInvariants = [
  {
    title: 'Value range invariant',
    detail:
      'Before each probe, target is guaranteed to be within [a[low], a[high]]. If not, the search stops.',
  },
  {
    title: 'Sorted range invariant',
    detail:
      'The search window always remains a sorted subarray, so comparisons remain valid.',
  },
  {
    title: 'Progress invariant',
    detail:
      'Each probe either returns the target or shrinks the window by moving low or high.',
  },
]

const prerequisites = [
  'Array must be sorted in non-decreasing order.',
  'Values must be numeric or at least orderable with a meaningful distance.',
  'Best results require near-uniform distribution of values.',
]

const stepTrace = [
  {
    step: 'Start',
    state: 'a = [10, 20, 30, 40, 50, 60, 70, 80, 90], target = 70',
    note: 'low=0 (10), high=8 (90).',
  },
  {
    step: 'Estimate',
    state: 'pos = low + (target - a[low]) * (high - low) / (a[high] - a[low])',
    note: 'pos = 0 + (70-10) * 8 / (90-10) = 6.0 -> index 6.',
  },
  {
    step: 'Check',
    state: 'a[6] = 70',
    note: 'Match found in one probe.',
  },
]

const complexityNotes = [
  {
    title: 'Average (uniform data)',
    detail:
      'O(log log n) expected probes on uniformly distributed data, faster than binary search.',
  },
  {
    title: 'Worst case',
    detail:
      'O(n) when data is highly skewed or clustered; probes may barely move.',
  },
  {
    title: 'Space',
    detail: 'O(1) extra space.',
  },
]

const performanceProfile = [
  {
    title: 'When it shines',
    detail:
      'Dense, evenly spaced numeric keys (IDs, timestamps without gaps) where proportional guesses are accurate.',
  },
  {
    title: 'When it struggles',
    detail:
      'Skewed distributions (exponential, clustered values, many duplicates) can cause near-linear behavior.',
  },
  {
    title: 'Cost model',
    detail:
      'Requires extra arithmetic per step compared to binary search; savings come only if probes shrink faster.',
  },
]

const distributionChecks = [
  {
    title: 'Uniformity hint',
    detail:
      'Compute the average gap and check the variance. Low variance implies uniform spacing.',
  },
  {
    title: 'Skew warning',
    detail:
      'If a[high] - a[low] grows much faster than the index range, probes will be biased.',
  },
  {
    title: 'Duplicate density',
    detail:
      'Large blocks of identical values reduce the value range, making interpolation less informative.',
  },
]

const comparisonTable = [
  {
    algorithm: 'Interpolation search',
    time: 'O(log log n) avg',
    space: 'O(1)',
    stable: 'N/A',
    notes: 'Great on uniform numeric data; worst case O(n).',
  },
  {
    algorithm: 'Binary search',
    time: 'O(log n)',
    space: 'O(1)',
    stable: 'N/A',
    notes: 'Reliable on any sorted data; no distribution assumptions.',
  },
  {
    algorithm: 'Exponential search',
    time: 'O(log i)',
    space: 'O(1)',
    stable: 'N/A',
    notes: 'Best when size is unknown or target is near front.',
  },
  {
    algorithm: 'Jump search',
    time: 'O(sqrt(n))',
    space: 'O(1)',
    stable: 'N/A',
    notes: 'Fixed step size; simpler but slower than binary.',
  },
  {
    algorithm: 'Linear search',
    time: 'O(n)',
    space: 'O(1)',
    stable: 'N/A',
    notes: 'Works on unsorted data, but slow for large arrays.',
  },
]

const realWorldUses = [
  {
    context: 'Dense numeric IDs',
    detail:
      'User IDs, ticket numbers, or incremental keys with low sparsity can benefit from interpolation probes.',
  },
  {
    context: 'Time-series blocks',
    detail:
      'Uniformly sampled timestamps (e.g., every second) allow accurate proportional guesses.',
  },
  {
    context: 'Sorted telemetry ranges',
    detail:
      'If data is evenly distributed, interpolation search reduces the number of probes.',
  },
  {
    context: 'Hybrid strategies',
    detail:
      'Systems may start with interpolation and fall back to binary search when estimates look unstable.',
  },
]

const thinkingShortcuts = [
  'If keys are timestamps sampled at a fixed interval, interpolation is a natural first choice.',
  'If keys are user IDs with gaps, prefer binary search unless the gaps are small.',
  'If you only need the nearest value, use interpolation to jump near the region, then scan locally.',
  'If values are skewed (e.g., exponential), interpolation can be worse than binary search.',
]

const examples = [
  {
    title: 'Interpolation search (TypeScript-like pseudocode)',
    code: `function interpolationSearch(a: number[], target: number): number {
  let low = 0;
  let high = a.length - 1;

  while (low <= high && target >= a[low] && target <= a[high]) {
    if (a[high] === a[low]) {
      return a[low] === target ? low : -1;
    }
    const pos = low + Math.floor(
      ((target - a[low]) * (high - low)) / (a[high] - a[low])
    );

    if (a[pos] === target) return pos;
    if (a[pos] < target) low = pos + 1;
    else high = pos - 1;
  }
  return -1;
}`,
    explanation:
      'The interpolation formula estimates where the target should lie between low and high values.',
  },
  {
    title: 'Hybrid: interpolation then binary fallback',
    code: `function hybridSearch(a: number[], target: number): number {
  let low = 0;
  let high = a.length - 1;
  for (let steps = 0; steps < 4 && low <= high; steps += 1) {
    if (target < a[low] || target > a[high]) return -1;
    if (a[high] === a[low]) break;
    const pos = low + Math.floor(
      ((target - a[low]) * (high - low)) / (a[high] - a[low])
    );
    if (a[pos] === target) return pos;
    if (a[pos] < target) low = pos + 1;
    else high = pos - 1;
  }
  return binarySearch(a, target, low, high);
}`,
    explanation:
      'A few interpolation steps can quickly narrow the range, then binary search guarantees logarithmic worst-case.',
  },
]

const pitfalls = [
  'Using it on non-uniform data can degrade to near-linear scans.',
  'Division by zero when a[low] === a[high]; guard explicitly.',
  'Floating point rounding can produce pos outside [low, high] if not clamped.',
  'Not checking target bounds can cause invalid estimates or infinite loops.',
]

const decisionGuidance = [
  'Uniform or nearly uniform numeric data: interpolation search can beat binary search.',
  'Unknown size or unbounded data: choose exponential search instead.',
  'Skewed distributions or many duplicates: prefer binary search for stability.',
  'Non-numeric or unordered keys: interpolation search does not apply.',
]

const implementationTips = [
  {
    title: 'Clamp probe index',
    detail:
      'Make sure pos stays within [low, high] to avoid runaway indices from rounding.',
  },
  {
    title: 'Avoid floating error',
    detail:
      'Use integer arithmetic when possible to avoid precision drift on large values.',
  },
  {
    title: 'Add a fallback',
    detail:
      'After a few poor probes, switch to binary search to guarantee O(log n).',
  },
  {
    title: 'Return first match if needed',
    detail:
      'If duplicates exist, scan left or right to find the first or last occurrence.',
  },
]

const advancedInsights = [
  {
    title: 'Distribution assumptions matter',
    detail:
      'Interpolation search is fast because it assumes linear density. When that assumption fails, progress slows dramatically.',
  },
  {
    title: 'Cache and branch behavior',
    detail:
      'Like binary search, it jumps around the array, but fewer probes can still reduce cache misses overall.',
  },
  {
    title: 'Adaptive hybrids',
    detail:
      'Some systems monitor probe quality and switch to binary search if the estimated position does not shrink the interval enough.',
  },
  {
    title: 'Duplicate-heavy arrays',
    detail:
      'If many values are the same, interpolation provides little guidance; consider a range query or binary search on edges.',
  },
]

const takeaways = [
  'Interpolation search is a specialized optimization for uniform numeric data.',
  'Average-case can be faster than binary search, but worst-case can be linear.',
  'Guard against division by zero and invalid bounds.',
  'When in doubt, binary search is the safer default.',
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
    { id: 'core-patterns', label: 'Problem Patterns' },
    { id: 'core-prerequisites', label: 'Prerequisites' },
    { id: 'core-reasoning', label: 'Reasoning Steps' },
    { id: 'core-invariants', label: 'Loop Invariants' },
    { id: 'core-trace', label: 'Worked Trace' },
    { id: 'core-complexity', label: 'Complexity' },
    { id: 'core-performance', label: 'Performance Profile' },
    { id: 'core-distribution', label: 'Distribution Checks' },
    { id: 'core-compare', label: 'Compare and Contrast' },
    { id: 'core-applications', label: 'Real-World Applications' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-shortcuts', label: 'Thinking Shortcuts' },
    { id: 'core-implementation', label: 'Implementation Tips' },
    { id: 'core-when-to-use', label: 'When to Use It' },
    { id: 'core-advanced', label: 'Advanced Insights' },
  ],
  examples: [{ id: 'ex-code', label: 'Code Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

const glossary = [
  { term: 'Interpolation probe', definition: 'Estimated index computed from target proportion between low and high values.' },
  { term: 'Uniform distribution', definition: 'Values are spaced roughly evenly, making proportional guesses accurate.' },
  { term: 'Skewed distribution', definition: 'Values cluster unevenly, reducing probe quality and potentially causing slow progress.' },
  { term: 'Degeneracy guard', definition: 'Check for a[low] === a[high] to avoid division by zero.' },
  { term: 'Hybrid fallback', definition: 'Switch to binary search when interpolation steps are not shrinking fast enough.' },
]

export default function InterpolationSearchPage(): JSX.Element {
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
    document.title = `Interpolation Search (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Interpolation Search',
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
          <span className="win98-title-text">Interpolation Search</span>
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
            <h1 className="win98-doc-title">Interpolation Search</h1>
            <p>
              Interpolation search assumes values are roughly uniform and uses that assumption to guess where the target should be.
              When the guess is good, it shrinks the range faster than binary search. When the distribution is skewed, performance can
              degrade sharply, so it is a specialized tool rather than a general default.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="win98-section">
                  <h2 className="win98-heading">Overview</h2>
                  <p>
                    Binary search splits the range in half every time. Interpolation search tries to jump directly near the target by
                    assuming the values are evenly spaced. When that assumption holds, the search converges extremely fast.
                  </p>
                  {complexityNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
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
                <section id="core-patterns" className="win98-section">
                  <h2 className="win98-heading">How to Think About Similar Problems</h2>
                  {problemPatterns.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
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
                <section id="core-reasoning" className="win98-section">
                  <h2 className="win98-heading">Reasoning Steps</h2>
                  {reasoningSteps.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-invariants" className="win98-section">
                  <h2 className="win98-heading">Loop Invariants</h2>
                  {loopInvariants.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-trace" className="win98-section">
                  <h2 className="win98-heading">Worked Trace on a Tiny Array</h2>
                  {stepTrace.map((item) => (
                    <div key={item.step}>
                      <h3 className="win98-subheading">{item.step}</h3>
                      <p><strong>State:</strong> <code>{item.state}</code></p>
                      <p>{item.note}</p>
                    </div>
                  ))}
                </section>
                <section id="core-complexity" className="win98-section">
                  <h2 className="win98-heading">Complexity Analysis</h2>
                  {complexityNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-performance" className="win98-section">
                  <h2 className="win98-heading">Performance Profile</h2>
                  {performanceProfile.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-distribution" className="win98-section">
                  <h2 className="win98-heading">Distribution Sanity Checks</h2>
                  {distributionChecks.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-compare" className="win98-section">
                  <h2 className="win98-heading">Compare and Contrast</h2>
                  {comparisonTable.map((row) => (
                    <p key={row.algorithm}>
                      <strong>{row.algorithm}:</strong> Time: {row.time}. Space: {row.space}. Stable: {row.stable}. {row.notes}
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
                <section id="core-shortcuts" className="win98-section">
                  <h2 className="win98-heading">Thinking Shortcuts</h2>
                  <ul>
                    {thinkingShortcuts.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-implementation" className="win98-section">
                  <h2 className="win98-heading">Implementation Tips</h2>
                  {implementationTips.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
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
