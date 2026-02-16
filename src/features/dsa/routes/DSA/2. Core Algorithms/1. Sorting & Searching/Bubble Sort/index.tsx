import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

const historicalMilestones = [
  {
    title: 'Early exchange sorts in APL (1962)',
    detail:
      'Kenneth Iverson described element-swapping loops in A Programming Language, providing one of the earliest published templates for what became known as bubble sort.',
  },
  {
    title: 'Knuth formalizes analysis (1968)',
    detail:
      'Donald Knuth used bubble sort in The Art of Computer Programming Volume 3 as a baseline O(n^2) stable algorithm, cementing it as the canonical teaching example for invariants and inner-loop reasoning.',
  },
  {
    title: 'Bidirectional cocktail shaker emerges (1974)',
    detail:
      'While studying permutation networks, researchers introduced bidirectional passes that pull small elements forward and push large elements back, reducing passes when disorder is concentrated near both ends.',
  },
  {
    title: 'Odd-even transposition sort in parallel machines (1980s)',
    detail:
      'SIMD and mesh-connected computers used an odd-even variant of bubble sort because its neighbor-only communication pattern mapped cleanly to hardware without long-distance data movement.',
  },
  {
    title: 'Pedagogical staple in CS1 courses (1990s to today)',
    detail:
      'Bubble sort remains a fixture in introductory courses for demonstrating loop invariants, stability, and why asymptotic complexity matters compared with optimized insertion or merge sort.',
  },
]

const mentalModels = [
  {
    title: 'Bubbles rising',
    detail:
      'On each pass, the largest remaining element bubbles to the end, like an air bubble rising to the surface. If the list is almost sorted, small bubbles move quickly and few passes are needed.',
  },
  {
    title: 'Thermostat passes',
    detail:
      'Each pass is a sweep that nudges the list closer to its final temperature of sorted order. The swapped flag is the thermostat: once no swaps occur, the system is at equilibrium and the algorithm halts.',
  },
  {
    title: 'Local repairs',
    detail:
      'Bubble sort fixes local inversions one neighbor pair at a time. This makes its behavior easy to reason about, but also explains the quadratic work when inversions are widespread.',
  },
  {
    title: 'Stability by drifting',
    detail:
      'Equal elements drift without crossing because swaps only happen when the left item is strictly greater. This property makes bubble sort a friendly teaching tool for the idea of stability.',
  },
]

const terminology = [
  {
    term: 'Inversion',
    detail:
      'A pair (i, j) with i < j but a[i] > a[j]. Bubble sort fixes inversions one swap at a time.',
  },
  {
    term: 'Pass',
    detail:
      'A full left-to-right sweep that pushes the current maximum to the end.',
  },
  {
    term: 'Boundary',
    detail:
      'The rightmost index of the unsorted prefix; shrinks by one each pass.',
  },
  {
    term: 'Swapped flag',
    detail:
      'A boolean that detects if any swap occurred, enabling early exit.',
  },
]

const invariants = [
  {
    title: 'Suffix sortedness',
    detail:
      'After k passes, the last k elements are in final sorted positions.',
  },
  {
    title: 'Local order repairs',
    detail:
      'Each swap eliminates at least one inversion.',
  },
  {
    title: 'Stability',
    detail:
      'Equal elements never swap if you use a strict greater-than comparison.',
  },
]

const mechanics = [
  {
    heading: 'One pass',
    bullets: [
      'Scan from left to right, swapping adjacent items that are out of order.',
      'After a full pass, the maximum of the unsorted prefix ends up at the right boundary.',
      'Shrink the boundary by one and repeat.',
    ],
  },
  {
    heading: 'Early exit',
    bullets: [
      'Track whether any swap occurred during a pass.',
      'If a pass completes with zero swaps, the list is sorted and the algorithm can stop early.',
      'Best-case behavior becomes O(n) when the input is already sorted.',
    ],
  },
  {
    heading: 'Variants',
    bullets: [
      'Cocktail shaker sort: sweep left to right, then right to left, reducing passes when disorder sits at both ends.',
      'Odd-even transposition sort: alternate comparing odd-even and even-odd pairs, enabling parallel neighbor comparisons.',
      'Comb sort: generalizes bubble sort by starting with larger gaps and shrinking them, reducing turtle elements that move slowly.',
    ],
  },
]

const stepByStep = [
  {
    title: 'Initialize end',
    detail:
      'Set the boundary to the last index; the unsorted portion is [0..end].',
  },
  {
    title: 'Scan and swap',
    detail:
      'Compare neighbors and swap if out of order; track if any swap happens.',
  },
  {
    title: 'Shrink boundary',
    detail:
      'The largest element has bubbled to end; decrement end.',
  },
  {
    title: 'Early exit',
    detail:
      'If no swaps occurred, the array is already sorted.',
  },
]

const variantsDeepDive = [
  {
    title: 'Cocktail shaker',
    detail:
      'Sweeps both directions to pull small items left and large items right in one round.',
  },
  {
    title: 'Odd-even transposition',
    detail:
      'Alternates comparing odd-even pairs; parallel-friendly on SIMD or meshes.',
  },
  {
    title: 'Comb sort',
    detail:
      'Starts with a large gap and shrinks it, reducing slow-moving turtles.',
  },
  {
    title: 'Bubble with last swap',
    detail:
      'Track the last swap index to skip already-sorted tail work.',
  },
]

const complexityNotes = [
  {
    title: 'Asymptotic cost',
    detail:
      'Worst and average time complexity is O(n^2) comparisons and swaps. Best case becomes O(n) if the swapped flag short-circuits on an already sorted list.',
  },
  {
    title: 'Space and stability',
    detail:
      'Bubble sort is in-place with O(1) extra space and it is stable because equal elements never cross. That stability is rare among in-place simple sorts.',
  },
  {
    title: 'Constant factors',
    detail:
      'Each comparison may trigger a swap involving three assignments. On modern CPUs, the memory traffic dominates, making it slower than insertion sort even with identical asymptotics.',
  },
  {
    title: 'Practical scale',
    detail:
      'At 10,000 elements, bubble sort performs about 50 million comparisons. A good O(n log n) sort on the same data will complete in milliseconds where bubble sort may take seconds.',
  },
]

const comparisonTable = [
  {
    feature: 'Best case',
    bubble: 'O(n)',
    insertion: 'O(n)',
    selection: 'O(n^2)',
    merge: 'O(n log n)',
    quick: 'O(n log n)',
  },
  {
    feature: 'Average case',
    bubble: 'O(n^2)',
    insertion: 'O(n^2)',
    selection: 'O(n^2)',
    merge: 'O(n log n)',
    quick: 'O(n log n)',
  },
  {
    feature: 'Worst case',
    bubble: 'O(n^2)',
    insertion: 'O(n^2)',
    selection: 'O(n^2)',
    merge: 'O(n log n)',
    quick: 'O(n^2)',
  },
  {
    feature: 'Stable',
    bubble: 'Yes',
    insertion: 'Yes',
    selection: 'No',
    merge: 'Yes',
    quick: 'No',
  },
  {
    feature: 'Extra space',
    bubble: 'O(1)',
    insertion: 'O(1)',
    selection: 'O(1)',
    merge: 'O(n)',
    quick: 'O(log n) stack',
  },
]

const realWorldUses = [
  {
    context: 'Education and visualization',
    detail:
      'Bubble sort is widely used in CS1 to introduce loop invariants, stability, and reasoning about time complexity. Animated visualizations make its local swaps easy to grasp.',
  },
  {
    context: 'Small nearly sorted buffers',
    detail:
      'In constrained firmware or tight kernels, a short, almost sorted buffer (tens of elements) can be tidied with bubble sort when branch predictability matters more than asymptotic bounds.',
  },
  {
    context: 'Sanity checks and smoke tests',
    detail:
      'Bubble sort is sometimes included in test harnesses as a correctness oracle because the code is simple enough to be obviously right and stable for duplicate-sensitive checks.',
  },
  {
    context: 'Parallel neighbor exchanges',
    detail:
      'Odd-even transposition, the parallel cousin of bubble sort, appears in GPU and mesh-sorting demos to showcase local communication patterns.',
  },
]

const examples = [
  {
    title: 'Bubble sort with early exit (JavaScript)',
    code: `function bubbleSort(arr) {
  const a = [...arr]; // avoid mutating input
  for (let end = a.length; end > 1; end -= 1) {
    let swapped = false;
    for (let i = 1; i < end; i += 1) {
      if (a[i - 1] > a[i]) {
        [a[i - 1], a[i]] = [a[i], a[i - 1]];
        swapped = true;
      }
    }
    if (!swapped) break; // already sorted
  }
  return a;
}`,
    explanation:
      'The swapped flag protects best-case inputs from unnecessary work. Copying the input makes the function side-effect free, a common testing convenience.',
  },
  {
    title: 'Cocktail shaker sort (pseudocode)',
    code: `function cocktailShakerSort(a):
    start = 0
    end = length(a) - 1
    repeat
        swapped = false
        for i from start to end - 1:
            if a[i] > a[i + 1]:
                swap(a[i], a[i + 1])
                swapped = true
        end = end - 1
        for i from end - 1 down to start:
            if a[i] > a[i + 1]:
                swap(a[i], a[i + 1])
                swapped = true
        start = start + 1
    until swapped is false`,
    explanation:
      'Bidirectional passes move small elements left and large elements right in the same iteration, shrinking both boundaries faster when disorder sits at both ends.',
  },
  {
    title: 'Odd-even transposition (parallel-friendly)',
    code: `for phase in 0..n-1:
    if phase is even:
        compare-swap pairs (1,2), (3,4), (5,6), ...
    else:
        compare-swap pairs (0,1), (2,3), (4,5), ...
    // Neighbor pairs within a phase can execute in parallel`,
    explanation:
      "This variant preserves bubble sort's neighbor-only communication, allowing SIMD lanes or GPU threads to operate on disjoint pairs simultaneously.",
  },
  {
    title: 'Bubble sort trace (short array)',
    code: `array: [5, 1, 4, 2]
pass 1:
  compare 5,1 -> swap => [1,5,4,2]
  compare 5,4 -> swap => [1,4,5,2]
  compare 5,2 -> swap => [1,4,2,5]
pass 2:
  compare 1,4 -> ok
  compare 4,2 -> swap => [1,2,4,5]
  compare 4,5 -> ok
pass 3:
  no swaps => stop`,
    explanation:
      'Each pass places the current max at the end. Early exit stops once a pass performs no swaps.',
  },
]

const pitfalls = [
  'Forgetting the swapped flag leaves the algorithm O(n^2) even on sorted input and wastes passes.',
  'Loop bounds off by one can skip the last comparison or read past array edges. The inner loop should stop at end - 1.',
  'Misinterpreting stability: if you swap when elements are equal, you lose stability. Use a strict greater-than comparison.',
  'Using bubble sort on large random inputs leads to severe performance regressions; it should not back your production sorting paths.',
  'Counting swaps instead of comparisons when analyzing complexity can mask the quadratic comparison cost that dominates run time.',
  'Not shrinking the boundary wastes comparisons against the already-sorted suffix.',
  'Sorting unstable records (if using >=) breaks relative order of equals.',
]

const testingChecklist = [
  'Already sorted input (best case).',
  'Reverse sorted input (worst case).',
  'Array with many duplicates to verify stability.',
  'Small arrays of size 0, 1, and 2.',
  'Random arrays with a known sorted baseline.',
]

const decisionGuidance = [
  'List already sorted or nearly sorted and very small (tens of elements): bubble sort with early exit is acceptable and easy to audit.',
  'Need stability with O(1) extra space and simplicity: bubble sort works, but insertion sort is usually faster on the same inputs.',
  'Teaching loop invariants or visualizing local swaps: bubble sort is the clearest narrative example.',
  'General-purpose production sorting: prefer O(n log n) algorithms like merge sort, quicksort, or TimSort.',
  'Parallel neighbor-only network required: odd-even transposition (bubble cousin) fits SIMD or mesh hardware.',
]

const advancedInsights = [
  {
    title: 'Stability and inversion counting',
    detail:
      'Bubble sort removes at least one inversion per swap. Its total swaps equal the number of inversions when using strict greater-than comparisons, which can help explain inversion counting to students.',
  },
  {
    title: 'Adaptive motivation for TimSort',
    detail:
      "TimSort, used in Python and Java, scans for naturally occurring runs and exploits near-sorted data. Bubble sort's best-case O(n) shows the value of adaptivity, but TimSort scales that idea to real workloads.",
  },
  {
    title: 'Cache and branch behavior',
    detail:
      'Despite touching data sequentially, bubble sort suffers from heavy branch misprediction on random inputs due to frequent swap decisions. Insertion sort often wins because its inner loop can leverage branch prediction and contiguous shifts.',
  },
  {
    title: 'Comparator networks',
    detail:
      "Sorting networks like the odd-even transposition network mirror bubble sort's neighbor-exchange logic, illustrating how to map comparison sequences to hardware without data-dependent control flow.",
  },
]

const practiceIdeas = [
  'Add a last-swap optimization and measure comparisons saved.',
  'Implement cocktail shaker and compare passes on nearly sorted data.',
  'Compare bubble vs insertion on random arrays of size 50.',
  'Count inversions via bubble swaps and verify with a brute-force counter.',
]

const takeaways = [
  'Bubble sort is simple, stable, and in-place, but quadratic, making it unsuitable for large or random inputs.',
  'The swapped flag transforms the best case to linear time and is the key optimization to teach adaptivity.',
  'Variants like cocktail shaker and odd-even transposition show how local exchanges map to different performance envelopes and hardware.',
  'Use bubble sort as a teaching tool or for tiny, nearly sorted buffers. Choose O(n log n) algorithms for anything serious.',
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

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
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-models', label: 'Mental Models' },
    { id: 'core-terms', label: 'Terminology and Invariants' },
    { id: 'core-mechanics', label: 'Mechanics and Steps' },
    { id: 'core-variants', label: 'Variants' },
    { id: 'core-complexity', label: 'Complexity' },
    { id: 'core-compare', label: 'Comparison' },
    { id: 'core-applications', label: 'Applications' },
    { id: 'core-pitfalls', label: 'Pitfalls and Testing' },
    { id: 'core-usage', label: 'When to Use It' },
    { id: 'core-advanced', label: 'Advanced Insights' },
  ],
  examples: [{ id: 'ex-practical', label: 'Practical Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

const bubble98HelpStyles = `
.bub98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.bub98-window {
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

.bub98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.bub98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
}

.bub98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.bub98-control {
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

.bub98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.bub98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.bub98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.bub98-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.bub98-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.bub98-toc-title {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 10px;
}

.bub98-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.bub98-toc-list li {
  margin: 0 0 8px;
}

.bub98-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.bub98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.bub98-doc-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px;
}

.bub98-section {
  margin: 0 0 20px;
}

.bub98-heading {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px;
}

.bub98-subheading {
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 6px;
}

.bub98-content p,
.bub98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.bub98-content p {
  margin: 0 0 10px;
}

.bub98-content ul,
.bub98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.bub98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.bub98-codebox {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 8px;
  margin: 6px 0 10px;
  overflow-x: auto;
}

.bub98-codebox code {
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
  display: block;
}

@media (max-width: 900px) {
  .bub98-main {
    grid-template-columns: 1fr;
  }

  .bub98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}
`

export default function BubbleSortPage(): JSX.Element {
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
    document.title = `Bubble Sort (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Bubble Sort',
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
    <div className="bub98-help-page">
      <style>{bubble98HelpStyles}</style>
      <div className="bub98-window" role="presentation">
        <header className="bub98-titlebar">
          <span className="bub98-title-text">Bubble Sort</span>
          <div className="bub98-title-controls">
            <button className="bub98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="bub98-control" aria-label="Close">X</Link>
          </div>
        </header>

        <div className="bub98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`bub98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bub98-main">
          <aside className="bub98-toc" aria-label="Table of contents">
            <h2 className="bub98-toc-title">Contents</h2>
            <ul className="bub98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="bub98-content">
            <h1 className="bub98-doc-title">Bubble Sort</h1>
            <p>
              Bubble sort is the simplest stable, in-place sorting algorithm. Its strength is not speed; it is the clarity with
              which it reveals comparisons, swaps, and loop invariants.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="bub98-section">
                  <h2 className="bub98-heading">Overview</h2>
                  <p>
                    Bubble sort repeatedly walks the list, swapping adjacent out-of-order elements until no swaps occur. It is
                    stable, uses constant extra space, and achieves O(n) time on already sorted data when equipped with an early
                    exit.
                  </p>
                  <p>
                    On random inputs it is O(n^2), which is why it rarely appears in production sorting pipelines. Its enduring
                    value lies in its transparency: you can watch correctness emerge one swap at a time.
                  </p>
                </section>

                <hr className="bub98-divider" />

                <section id="bp-history" className="bub98-section">
                  <h2 className="bub98-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <div key={item.title}>
                      <h3 className="bub98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <hr className="bub98-divider" />

                <section id="bp-takeaways" className="bub98-section">
                  <h2 className="bub98-heading">Key Takeaways</h2>
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
                <section id="core-models" className="bub98-section">
                  <h2 className="bub98-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-terms" className="bub98-section">
                  <h2 className="bub98-heading">Terminology and Invariants</h2>
                  {terminology.map((item) => (
                    <p key={item.term}>
                      <strong>{item.term}:</strong> {item.detail}
                    </p>
                  ))}
                  {invariants.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-mechanics" className="bub98-section">
                  <h2 className="bub98-heading">Mechanics and Steps</h2>
                  {mechanics.map((item) => (
                    <div key={item.heading}>
                      <h3 className="bub98-subheading">{item.heading}</h3>
                      <ul>
                        {item.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  {stepByStep.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-variants" className="bub98-section">
                  <h2 className="bub98-heading">Variants</h2>
                  {variantsDeepDive.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-complexity" className="bub98-section">
                  <h2 className="bub98-heading">Complexity and Performance Intuition</h2>
                  {complexityNotes.map((note) => (
                    <p key={note.title}>
                      <strong>{note.title}:</strong> {note.detail}
                    </p>
                  ))}
                </section>

                <section id="core-compare" className="bub98-section">
                  <h2 className="bub98-heading">Comparison with Other Sorts</h2>
                  {comparisonTable.map((row) => (
                    <p key={row.feature}>
                      <strong>{row.feature}:</strong> Bubble {row.bubble}; Insertion {row.insertion}; Selection {row.selection};
                      Merge {row.merge}; Quick {row.quick}.
                    </p>
                  ))}
                </section>

                <section id="core-applications" className="bub98-section">
                  <h2 className="bub98-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-pitfalls" className="bub98-section">
                  <h2 className="bub98-heading">Pitfalls, Testing, and Practice</h2>
                  <h3 className="bub98-subheading">Common Pitfalls</h3>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <h3 className="bub98-subheading">Testing Checklist</h3>
                  <ul>
                    {testingChecklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <h3 className="bub98-subheading">Practice Ideas</h3>
                  <ul>
                    {practiceIdeas.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section id="core-usage" className="bub98-section">
                  <h2 className="bub98-heading">When to Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>

                <section id="core-advanced" className="bub98-section">
                  <h2 className="bub98-heading">Advanced Insights</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <section id="ex-practical" className="bub98-section">
                <h2 className="bub98-heading">Practical Examples</h2>
                {examples.map((example) => (
                  <div key={example.title}>
                    <h3 className="bub98-subheading">{example.title}</h3>
                    <div className="bub98-codebox">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </div>
                ))}
              </section>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="bub98-section">
                <h2 className="bub98-heading">Glossary</h2>
                {terminology.map((item) => (
                  <p key={item.term}>
                    <strong>{item.term}:</strong> {item.detail}
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
