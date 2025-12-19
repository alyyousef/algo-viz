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

.win95-page a:focus {
  outline: 1px dotted #000;
  outline-offset: 1px;
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
]

const pitfalls = [
  'Forgetting the swapped flag leaves the algorithm O(n^2) even on sorted input and wastes passes.',
  'Loop bounds off by one can skip the last comparison or read past array edges. The inner loop should stop at end - 1.',
  'Misinterpreting stability: if you swap when elements are equal, you lose stability. Use a strict greater-than comparison.',
  'Using bubble sort on large random inputs leads to severe performance regressions; it should not back your production sorting paths.',
  'Counting swaps instead of comparisons when analyzing complexity can mask the quadratic comparison cost that dominates run time.',
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

const takeaways = [
  'Bubble sort is simple, stable, and in-place, but quadratic, making it unsuitable for large or random inputs.',
  'The swapped flag transforms the best case to linear time and is the key optimization to teach adaptivity.',
  'Variants like cocktail shaker and odd-even transposition show how local exchanges map to different performance envelopes and hardware.',
  'Use bubble sort as a teaching tool or for tiny, nearly sorted buffers. Choose O(n log n) algorithms for anything serious.',
]

export default function BubbleSortPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Bubble Sort</span>
          <div className="win95-title-controls">
            <button className="win95-control" aria-label="Close window">
              X
            </button>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">A gentle, stable, quadratic sorter for teaching comparisons and swaps</div>
              <p className="win95-text">
                Bubble sort is the simplest stable, in-place sorting algorithm. Its strength is not speed; it is the clarity with
                which it reveals comparisons, swaps, and loop invariants. Here are the mechanics, history, complexity, and the rare
                cases where bubble sort still earns a place, plus the many situations where faster algorithms win.
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
                Bubble sort repeatedly walks the list, swapping adjacent out-of-order elements until no swaps occur. It is stable,
                uses constant extra space, and achieves O(n) time on already sorted data when equipped with an early exit. On random
                inputs it is O(n^2), which is why it rarely appears in production sorting pipelines. Its enduring value lies in its
                transparency: you can watch correctness emerge one swap at a time.
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
            <legend>How it works: pass-by-pass motion</legend>
            <div className="win95-grid win95-grid-3">
              {mechanics.map((block) => (
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
            <legend>Complexity analysis and performance intuition</legend>
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
                Rule of thumb: if you need to sort beyond a handful of nearly sorted items, move to insertion sort for small n or
                to O(n log n) algorithms like quicksort or merge sort. Bubble sort is a clarity benchmark, not a throughput tool.
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
