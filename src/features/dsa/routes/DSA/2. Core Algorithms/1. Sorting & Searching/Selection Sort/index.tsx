import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: '1930s: Tournament method roots',
    detail:
      'Early sorting research used tournament trees to pick winners. Selection sort is the simplest "pick the winner, remove it, repeat" approach.',
  },
  {
    title: '1960s: Textbook staple',
    detail:
      'Selection sort became a CS101 anchor for teaching invariants and contrasting low swap counts with quadratic comparisons.',
  },
  {
    title: 'Flash and EEPROM awareness',
    detail:
      'With flash memory, the one-swap-per-pass property was highlighted for wear-sensitive cases where writes are expensive.',
  },
]

const mentalModels = [
  {
    title: 'Scout and swap',
    detail:
      'Send a scout through the unsorted region to find the minimum, then perform a single swap to place it at the boundary.',
  },
  {
    title: 'Growing a sorted front line',
    detail:
      'The left prefix stays sorted; each pass annexes the smallest remaining element to that front line.',
  },
  {
    title: 'Write-sparing',
    detail:
      'Exactly one swap per pass minimizes writes, trading extra comparisons for write efficiency.',
  },
  {
    title: 'Tournament bracket',
    detail:
      'Every pass plays a tournament among the remaining elements; the minimum wins and is placed into its final slot.',
  },
]

const mechanics = [
  {
    heading: 'Core loop',
    bullets: [
      'For i from 0 to n - 2: set min = i.',
      'Scan j from i + 1 to n - 1; if a[j] < a[min], update min.',
      'Swap a[i] with a[min] once the pass ends.',
    ],
  },
  {
    heading: 'Bidirectional selection',
    bullets: [
      'Find both min and max in the same pass and swap them to the front and back, shrinking both boundaries.',
      'Cuts passes roughly in half but still performs O(n^2) comparisons.',
    ],
  },
  {
    heading: 'Stability considerations',
    bullets: [
      'Naive swaps make it unstable; equal items can cross.',
      'Stable variants shift elements instead of swapping, increasing writes and losing the main advantage.',
    ],
  },
]

const problemPatterns = [
  {
    title: 'Write-limited storage',
    detail:
      'When writes are costly or limited (flash, EEPROM), selection sort keeps writes low with one swap per pass.',
  },
  {
    title: 'Small fixed-size buffers',
    detail:
      'Sorting tiny arrays where the constant factors of more advanced algorithms do not pay off.',
  },
  {
    title: 'Deterministic behavior',
    detail:
      'No data-dependent early exits: cost is predictable and independent of input order.',
  },
  {
    title: 'Teaching invariants',
    detail:
      'Great for explaining loop invariants and the idea of growing a sorted prefix.',
  },
  {
    title: 'Not for large datasets',
    detail:
      'Quadratic comparisons make it unsuitable for large arrays or performance-sensitive paths.',
  },
]

const loopInvariants = [
  {
    title: 'Sorted prefix invariant',
    detail:
      'At the start of pass i, the subarray a[0..i-1] is sorted and contains the i smallest elements.',
  },
  {
    title: 'Minimum tracking invariant',
    detail:
      'During the inner scan, index min always points to the smallest element seen so far in a[i..j].',
  },
  {
    title: 'Permutation invariant',
    detail:
      'Selection sort only swaps elements, so the output is a permutation of the input.',
  },
]

const stepTrace = [
  {
    step: 'Start',
    state: '[7, 2, 5, 1, 4]',
    note: 'i = 0, scan the whole array to find the minimum.',
  },
  {
    step: 'Pass 1',
    state: 'min = 1 at index 3, swap -> [1, 2, 5, 7, 4]',
    note: 'The smallest element is now fixed at position 0.',
  },
  {
    step: 'Pass 2',
    state: 'scan [2, 5, 7, 4], min = 2 at index 1, no swap',
    note: 'Position 1 already holds the minimum of the suffix.',
  },
  {
    step: 'Pass 3',
    state: 'scan [5, 7, 4], min = 4 at index 4, swap -> [1, 2, 4, 7, 5]',
    note: 'Sorted prefix grows; only a small suffix remains.',
  },
]

const complexityNotes = [
  {
    title: 'Time',
    detail:
      'Always O(n^2) comparisons; no best-case improvement. Swaps are O(n) overall (one per pass).',
  },
  {
    title: 'Space and stability',
    detail:
      'In-place with O(1) extra space. Unstable unless you accept more writes to preserve order.',
  },
  {
    title: 'Write profile',
    detail:
      'Minimal writes make it appealing on wear-limited storage or when writes are slower than comparisons.',
  },
]

const inputSensitivity = [
  {
    title: 'Already sorted input',
    detail:
      'Still O(n^2) comparisons because the inner scan always runs. It only saves swaps.',
  },
  {
    title: 'Reverse sorted input',
    detail:
      'Same number of comparisons as any input. Swaps are still one per pass.',
  },
  {
    title: 'Many duplicates',
    detail:
      'Comparisons remain quadratic; naive swapping can reorder equal elements and break stability.',
  },
  {
    title: 'Random input',
    detail:
      'Behavior is essentially identical to sorted or reverse input because comparisons do not adapt.',
  },
]

const performanceProfile = [
  {
    title: 'Comparisons',
    detail:
      'About n(n-1)/2 comparisons every time, which dominates runtime.',
  },
  {
    title: 'Swaps',
    detail:
      'At most n-1 swaps. This is the main advantage over bubble or insertion sort.',
  },
  {
    title: 'Memory',
    detail:
      'In-place with O(1) extra memory and simple control flow.',
  },
  {
    title: 'Branch predictability',
    detail:
      'The inner loop is regular and predictable, but still heavy for large n.',
  },
]

const comparisonTable = [
  {
    algorithm: 'Selection sort',
    time: 'O(n^2)',
    space: 'O(1)',
    stable: 'No',
    notes: 'Minimal swaps, but heavy comparisons.',
  },
  {
    algorithm: 'Insertion sort',
    time: 'O(n^2)',
    space: 'O(1)',
    stable: 'Yes',
    notes: 'Adaptive on nearly sorted data; more writes.',
  },
  {
    algorithm: 'Bubble sort',
    time: 'O(n^2)',
    space: 'O(1)',
    stable: 'Yes',
    notes: 'Many swaps; simple but usually slower.',
  },
  {
    algorithm: 'Merge sort',
    time: 'O(n log n)',
    space: 'O(n)',
    stable: 'Yes',
    notes: 'Fast and stable but uses extra memory.',
  },
  {
    algorithm: 'Quick sort',
    time: 'O(n log n) avg',
    space: 'O(log n)',
    stable: 'No',
    notes: 'Faster for large arrays, but pivot-sensitive.',
  },
]

const realWorldUses = [
  {
    context: 'Write-constrained environments',
    detail:
      'Embedded systems on flash/EEPROM where preserving write cycles matters more than extra comparisons.',
  },
  {
    context: 'Tiny datasets with cheap comparisons',
    detail:
      'Small buffers where simplicity and low swaps outweigh quadratic comparisons (for example, a handful of telemetry fields).',
  },
  {
    context: 'Pedagogical contrast',
    detail:
      'Used in classrooms to highlight invariants, swap minimization, and why O(n^2) comparisons dominate time.',
  },
]

const variantsAndTweaks = [
  {
    title: 'Bidirectional selection',
    detail:
      'Find min and max in one pass, then place them at the front and back to shrink faster.',
  },
  {
    title: 'Stable selection',
    detail:
      'Replace swaps with element shifts to preserve order. This increases writes and loses the main advantage.',
  },
  {
    title: 'Heap-based selection',
    detail:
      'Use a heap to repeatedly extract mins. This becomes heap sort and changes time complexity.',
  },
  {
    title: 'Index selection',
    detail:
      'Sort indices instead of data when data writes are expensive and indirection is acceptable.',
  },
]

const examples = [
  {
    title: 'Selection sort (TypeScript-like pseudocode)',
    code: `function selectionSort(a: number[]): number[] {
  for (let i = 0; i < a.length - 1; i += 1) {
    let min = i;
    for (let j = i + 1; j < a.length; j += 1) {
      if (a[j] < a[min]) min = j;
    }
    if (min !== i) {
      const tmp = a[i];
      a[i] = a[min];
      a[min] = tmp;
    }
  }
  return a;
}`,
    explanation:
      'One pass, one swap. Swaps are bounded by n - 1, which is why selection sort is swap-light compared to other quadratic sorts.',
  },
  {
    title: 'Bidirectional selection',
    code: `function bidirectionalSelectionSort(a: number[]): number[] {
  let start = 0;
  let end = a.length - 1;
  while (start < end) {
    let min = start, max = start;
    for (let i = start; i <= end; i += 1) {
      if (a[i] < a[min]) min = i;
      if (a[i] > a[max]) max = i;
    }
    [a[start], a[min]] = [a[min], a[start]];
    if (max === start) max = min;
    [a[end], a[max]] = [a[max], a[end]];
    start += 1;
    end -= 1;
  }
  return a;
}`,
    explanation:
      'Shrinks from both ends, halving passes. Comparisons remain quadratic; writes stay low (two swaps per pass).',
  },
  {
    title: 'Stable selection (shift instead of swap)',
    code: `function stableSelectionSort(a: number[]): number[] {
  for (let i = 0; i < a.length - 1; i += 1) {
    let min = i;
    for (let j = i + 1; j < a.length; j += 1) {
      if (a[j] < a[min]) min = j;
    }
    const value = a[min];
    for (let j = min; j > i; j -= 1) {
      a[j] = a[j - 1];
    }
    a[i] = value;
  }
  return a;
}`,
    explanation:
      'Shifting preserves stability but increases writes; it is slower when writes are not expensive.',
  },
]

const pitfalls = [
  'No adaptivity: still O(n^2) comparisons on sorted input.',
  'Unstable due to swaps; equal elements can flip order.',
  'Bidirectional variant must adjust max index if it was swapped with the min.',
  'Using it on large datasets causes obvious performance collapse versus O(n log n) sorts.',
  'Stable variants shift many elements, which can be worse than insertion sort in practice.',
]

const implementationTips = [
  {
    title: 'Skip redundant swaps',
    detail:
      'Check min !== i before swapping to avoid useless writes when the minimum is already in place.',
  },
  {
    title: 'Track both min and max',
    detail:
      'The bidirectional variant cuts passes in half at the cost of a slightly more careful swap order.',
  },
  {
    title: 'Avoid for large n',
    detail:
      'Selection sort is quadratic with no best case. Use O(n log n) sorts for real workloads.',
  },
  {
    title: 'Document stability',
    detail:
      'Call out whether your implementation is stable; the default swap-based version is not.',
  },
]

const decisionGuidance = [
  'Writes are expensive and n is tiny: selection sort is acceptable.',
  'Need stability: prefer insertion or merge-based sorts; stable selection costs extra writes.',
  'Need speed on average data: quicksort, merge sort, or TimSort dominate.',
  'Want fewer passes: bidirectional selection reduces passes but not the quadratic comparisons.',
  'Need predictable cost with trivial control flow: selection sort is easy to reason about.',
]

const advancedInsights = [
  {
    title: 'Comparison vs. write trade-off',
    detail:
      'Selection sort minimizes writes at the cost of comparisons. If write cost dominates, it can beat bubble or insertion despite the same asymptotic class.',
  },
  {
    title: 'Cycle sort connection',
    detail:
      'Cycle sort extends the "place element directly" idea to achieve the theoretical minimum number of writes for a permutation.',
  },
  {
    title: 'Cache behavior',
    detail:
      'Linear scans are cache-friendly, but the lack of early exit means every suffix is scanned fully even if mostly sorted.',
  },
  {
    title: 'Adversarial robustness',
    detail:
      'Cost is fixed at Theta(n^2) regardless of input pattern; there is no pivot sensitivity as in quicksort.',
  },
  {
    title: 'Swap minimization',
    detail:
      'Selection sort is optimal among sorts that swap only once per pass, but that constraint limits overall speed.',
  },
]

const takeaways = [
  'Selection sort is in-place and swap-light but fixed at O(n^2) comparisons with no best-case gain.',
  'It is unstable unless modified; stability costs extra writes and undercuts its main advantage.',
  'Use it when writes are expensive and n is small; otherwise prefer adaptive or O(n log n) algorithms.',
  'Bidirectional selection can cut passes but not the quadratic comparison count.',
  'References: Knuth Volume 3, standard CS texts, and flash-memory literature on write-sensitive algorithms.',
]

const glossary = [
  {
    term: 'Selection sort',
    definition:
      'A sorting algorithm that repeatedly selects the minimum from the unsorted suffix and swaps it into the next sorted position.',
  },
  {
    term: 'Sorted prefix',
    definition:
      'The left side of the array that is already sorted and finalized after each pass.',
  },
  {
    term: 'Unsorted suffix',
    definition:
      'The remaining right side scanned each pass to find the next minimum.',
  },
  {
    term: 'Loop invariant',
    definition:
      'A property that stays true during execution, used to reason about correctness.',
  },
  {
    term: 'Stable sort',
    definition:
      'A sort that preserves the relative order of equal elements.',
  },
  {
    term: 'In-place',
    definition:
      'Uses constant extra memory beyond the input array, typically O(1).',
  },
  {
    term: 'Write-sparing',
    definition:
      'A behavior that minimizes data writes, useful on wear-limited storage.',
  },
  {
    term: 'Bidirectional selection',
    definition:
      'A variant that finds both minimum and maximum each pass and places them at both ends.',
  },
  {
    term: 'Stable selection variant',
    definition:
      'A modified version that shifts elements instead of swapping to preserve order of equals.',
  },
  {
    term: 'Quadratic time',
    definition:
      'Runtime proportional to n^2 comparisons, typical of simple comparison-based sorts.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-history', label: 'Historical Context' },
    { id: 'bp-models', label: 'Mental Models' },
    { id: 'bp-patterns', label: 'Where It Fits' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-mechanics', label: 'Mechanics' },
    { id: 'core-invariants', label: 'Loop Invariants' },
    { id: 'core-complexity', label: 'Complexity Analysis' },
    { id: 'core-sensitivity', label: 'Input Sensitivity' },
    { id: 'core-profile', label: 'Performance Profile' },
    { id: 'core-compare', label: 'Compare and Contrast' },
    { id: 'core-uses', label: 'Real-World Uses' },
    { id: 'core-variants', label: 'Variants and Tweaks' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
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

const selection98Styles = `
.selection98-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.selection98-window {
  width: 100%;
  min-height: 100dvh;
  background: #c0c0c0;
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.selection98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.selection98-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
}

.selection98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.selection98-control {
  width: 18px;
  height: 16px;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: 11px;
  line-height: 1;
}

.selection98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.selection98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.selection98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.selection98-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.selection98-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.selection98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.selection98-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.selection98-toc-list li {
  margin: 0 0 8px;
}

.selection98-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.selection98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.selection98-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.selection98-section {
  margin: 0 0 20px;
}

.selection98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.selection98-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.selection98-content p,
.selection98-content li,
.selection98-content td,
.selection98-content th {
  font-size: 12px;
  line-height: 1.5;
}

.selection98-content p {
  margin: 0 0 10px;
}

.selection98-content ul,
.selection98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.selection98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.selection98-table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 0 10px;
}

.selection98-table th,
.selection98-table td {
  border: 1px solid #a0a0a0;
  padding: 4px 6px;
  text-align: left;
  vertical-align: top;
}

.selection98-state {
  font-family: "Courier New", Courier, monospace;
  background: none;
  padding: 0;
}

.selection98-codebox {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 8px;
  margin: 6px 0 10px;
}

.selection98-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .selection98-main {
    grid-template-columns: 1fr;
  }

  .selection98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}
`

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

export default function SelectionSortPage(): JSX.Element {
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
    document.title = `Selection Sort (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const historyState = window.history.state as { idx?: number } | null
    if (historyState?.idx && historyState.idx > 0) {
      void navigate(-1)
      return
    }
    void navigate('/algoViz')
  }

  return (
    <div className="selection98-page">
      <style>{selection98Styles}</style>
      <div className="selection98-window" role="presentation">
        <header className="selection98-titlebar">
          <span className="selection98-title">Selection Sort</span>
          <div className="selection98-title-controls">
            <button className="selection98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="selection98-control" aria-label="Close">X</Link>
          </div>
        </header>
        <div className="selection98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`selection98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="selection98-main">
          <aside className="selection98-toc" aria-label="Table of contents">
            <h2 className="selection98-toc-title">Contents</h2>
            <ul className="selection98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="selection98-content">
            <h1 className="selection98-doc-title">Selection Sort</h1>
            <p>
              Selection sort walks the unsorted region to find an extreme element, then performs a single swap to grow the sorted prefix.
              It is in-place, swap-light, and predictably Theta(n^2), making it interesting for write-sensitive cases but unfit for large
              inputs.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="selection98-section">
                  <h2 className="selection98-heading">Overview</h2>
                  <p>
                    Each pass locks one element into its final position at the boundary of sorted and unsorted regions. Comparisons dominate
                    runtime, while swaps are capped at one per pass, which is why selection sort can win in write-constrained environments
                    despite its quadratic comparisons.
                  </p>
                </section>
                <hr className="selection98-divider" />
                <section id="bp-history" className="selection98-section">
                  <h2 className="selection98-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <div key={item.title}>
                      <h3 className="selection98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>
                <section id="bp-models" className="selection98-section">
                  <h2 className="selection98-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-patterns" className="selection98-section">
                  <h2 className="selection98-heading">Where It Fits</h2>
                  {problemPatterns.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-takeaways" className="selection98-section">
                  <h2 className="selection98-heading">Key Takeaways</h2>
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
                <section id="core-mechanics" className="selection98-section">
                  <h2 className="selection98-heading">Mechanics</h2>
                  {mechanics.map((block) => (
                    <div key={block.heading}>
                      <h3 className="selection98-subheading">{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
                <section id="core-invariants" className="selection98-section">
                  <h2 className="selection98-heading">Loop Invariants</h2>
                  {loopInvariants.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-complexity" className="selection98-section">
                  <h2 className="selection98-heading">Complexity Analysis</h2>
                  {complexityNotes.map((note) => (
                    <p key={note.title}>
                      <strong>{note.title}:</strong> {note.detail}
                    </p>
                  ))}
                </section>
                <section id="core-sensitivity" className="selection98-section">
                  <h2 className="selection98-heading">Input Sensitivity</h2>
                  {inputSensitivity.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-profile" className="selection98-section">
                  <h2 className="selection98-heading">Performance Profile</h2>
                  {performanceProfile.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-compare" className="selection98-section">
                  <h2 className="selection98-heading">Compare and Contrast</h2>
                  <table className="selection98-table">
                    <thead>
                      <tr>
                        <th>Algorithm</th>
                        <th>Time</th>
                        <th>Space</th>
                        <th>Stable?</th>
                        <th>Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonTable.map((row) => (
                        <tr key={row.algorithm}>
                          <td>{row.algorithm}</td>
                          <td>{row.time}</td>
                          <td>{row.space}</td>
                          <td>{row.stable}</td>
                          <td>{row.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
                <section id="core-uses" className="selection98-section">
                  <h2 className="selection98-heading">Real-World Uses</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-variants" className="selection98-section">
                  <h2 className="selection98-heading">Variants and Performance Tweaks</h2>
                  {variantsAndTweaks.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="selection98-section">
                  <h2 className="selection98-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-implementation" className="selection98-section">
                  <h2 className="selection98-heading">Implementation Tips</h2>
                  {implementationTips.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-decisions" className="selection98-section">
                  <h2 className="selection98-heading">When to Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
                <section id="core-advanced" className="selection98-section">
                  <h2 className="selection98-heading">Advanced Insights</h2>
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
                <section id="ex-trace" className="selection98-section">
                  <h2 className="selection98-heading">Worked Trace on a Tiny Array</h2>
                  <ol>
                    {stepTrace.map((item) => (
                      <li key={item.step}>
                        <p><strong>{item.step}:</strong> {item.note}</p>
                        <p className="selection98-state">{item.state}</p>
                      </li>
                    ))}
                  </ol>
                </section>
                <section id="ex-code" className="selection98-section">
                  <h2 className="selection98-heading">Practical Examples</h2>
                  {examples.map((example) => (
                    <div key={example.title}>
                      <h3 className="selection98-subheading">{example.title}</h3>
                      <div className="selection98-codebox">
                        <code>{example.code.trim()}</code>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="selection98-section">
                <h2 className="selection98-heading">Glossary</h2>
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
