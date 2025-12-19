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
  outline-offset: 2px;
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
    title: 'Early textbook anchor (1960s)',
    detail:
      'Insertion sort appeared as a canonical example in early algorithm texts for demonstrating loop invariants and stability.',
  },
  {
    title: 'Knuth analysis (1968)',
    detail:
      'The Art of Computer Programming Vol. 3 formalized its expected O(n^2) cost and highlighted its adaptivity on nearly sorted inputs.',
  },
  {
    title: 'Hybrid cutoffs in libraries (1990s to today)',
    detail:
      'C and C++ library sorts, Python TimSort, and JavaScript engines use insertion sort on tiny partitions to beat branch and call overhead from heavier sorts.',
  },
]

const mentalModels = [
  {
    title: 'Sorting a hand of cards',
    detail:
      'Hold a sorted fan in your left hand and insert each new card into its proper spot. The left side stays sorted the whole time.',
  },
  {
    title: 'Growing a sorted prefix',
    detail:
      'Think of the array as two zones: a sorted prefix and an unsorted suffix. Each step moves one item from right to left until it fits.',
  },
  {
    title: 'Shifting to make space',
    detail:
      'Instead of swapping, you shift elements right to open a hole, preserving stability because equal keys never leapfrog.',
  },
]

const mechanics = [
  {
    heading: 'Core loop',
    bullets: [
      'For i from 1 to n - 1, set key = a[i].',
      'Shift elements in a[0..i-1] right while they are greater than key.',
      'Place key into the hole created by the shifts.',
    ],
  },
  {
    heading: 'Stability and adaptivity',
    bullets: [
      'Shifts move only strictly greater elements, so equal keys keep order (stable).',
      'If the input is already sorted, no shifts occur and time drops to O(n).',
    ],
  },
  {
    heading: 'Hybrid cutoffs',
    bullets: [
      'Commonly used for partitions of size 16-32 inside quicksort, mergesort, or introsort to reduce constant factors.',
      'Works well after a partition step when many elements are already close to sorted.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Time',
    detail: 'Worst and average O(n^2) comparisons and shifts; best case O(n) when the array is already sorted.',
  },
  {
    title: 'Space and stability',
    detail: 'In-place with O(1) extra space and stable ordering via shifts instead of swaps.',
  },
  {
    title: 'Constant factors',
    detail:
      'Excellent data locality and branch predictability on nearly sorted data make it fast for small n despite quadratic asymptotics.',
  },
]

const realWorldUses = [
  {
    context: 'Small or nearly sorted arrays',
    detail:
      'Excellent for tiny buffers (tens of elements) or workloads with few inversions, such as merging almost-sorted logs.',
  },
  {
    context: 'Hybrid sort cutoffs',
    detail:
      'Used inside TimSort, V8 sort, and std::sort/introsort as the base case to finish tiny partitions faster than recursive calls.',
  },
  {
    context: 'Online insertion',
    detail:
      'When elements arrive one by one and must be kept sorted immediately (small priority lists, leaderboard snippets), insertion sort incremental nature is simple and predictable.',
  },
]

const examples = [
  {
    title: 'Insertion sort (TypeScript-like pseudocode)',
    code: `function insertionSort(a: number[]): number[] {
  for (let i = 1; i < a.length; i += 1) {
    const key = a[i];
    let j = i - 1;
    while (j >= 0 && a[j] > key) {
      a[j + 1] = a[j]; // shift right
      j -= 1;
    }
    a[j + 1] = key; // place key
  }
  return a;
}`,
    explanation:
      'Shifts create a hole, then key fills it. Because only greater elements move, equal keys keep their original order (stability).',
  },
  {
    title: 'Hybrid cutoff inside quicksort',
    code: `function quicksort(a, lo, hi):
    while lo < hi:
        if hi - lo + 1 <= 24: # cutoff tuned to CPU/cache
            insertionSortRange(a, lo, hi)
            return
        p = partition(a, lo, hi)
        if p - lo < hi - p:
            quicksort(a, lo, p - 1)
            lo = p + 1
        else:
            quicksort(a, p + 1, hi)
            hi = p - 1`,
    explanation:
      'Small partitions skip recursive overhead and branch mispredictions by finishing with insertion sort. Tail recursion elimination keeps stack depth shallow.',
  },
]

const pitfalls = [
  'Using swaps instead of shifts loses stability and doubles writes.',
  'Applying insertion sort to large, random data leads to severe O(n^2) slowdowns.',
  'Forgetting to tune hybrid cutoffs can leave performance on the table (too low wastes recursion, too high wastes quadratic work).',
  'Inner loop bounds errors (j >= 0) can underflow or skip the first element.',
]

const decisionGuidance = [
  'Tiny or nearly sorted input: insertion sort is ideal and often faster than O(n log n) sorts.',
  'Hybrid base case: switch to insertion sort when partitions drop below a tuned threshold (often 16-32 elements).',
  'Need stability with in-place behavior: insertion sort provides both for small n.',
  'General large or disordered input: pick merge sort, heap sort, quicksort, or TimSort.',
]

const advancedInsights = [
  {
    title: 'Adaptive cost and inversion count',
    detail:
      'Runtime is proportional to the number of inversions; few inversions mean few shifts. This connects insertion sort to inversion-count analytics.',
  },
  {
    title: 'Binary-search insertion',
    detail:
      'You can binary search the insertion point to cut comparisons to O(log n), but shifts still cost O(n), so overall remains O(n^2).',
  },
  {
    title: 'Cache friendliness',
    detail:
      'Linear scans and tight inner loops make insertion sort friendlier to caches and branch predictors than bubble sort on similar sizes.',
  },
  {
    title: 'Stable merges and TimSort runs',
    detail:
      'TimSort detects ascending runs; short runs are extended using insertion sort before merging, combining adaptivity with O(n log n) guarantees.',
  },
]

const takeaways = [
  'Insertion sort is stable, in-place, and adaptive, excelling on tiny or nearly sorted inputs.',
  'Quadratic worst-case time limits it to small ranges or hybrid base cases.',
  'Shifts, not swaps, preserve order and reduce writes.',
  'Tune hybrid cutoffs to your CPU and data to maximize gains.',
]

export default function InsertionSortPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Insertion Sort</span>
          <div className="win95-title-controls">
            <button className="win95-control" aria-label="Close window">
              X
            </button>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Grow a sorted prefix one element at a time</div>
              <p className="win95-text">
                Insertion sort builds a sorted prefix by shifting larger elements right to make space for each new key. It is stable,
                in-place, and adaptive on nearly sorted data, which makes it a staple for tiny arrays and hybrid cutoffs.
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
                Each iteration keeps the left side sorted while one new element slides left to its place. On sorted data, the
                algorithm is linear; on random data it is quadratic. That balance makes it perfect for small buffers, nearly ordered
                sequences, and as the finishing step inside faster divide-and-conquer sorts.
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
            <legend>How it works: step-by-step</legend>
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
            <legend>Complexity analysis and intuition</legend>
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
                Rule of thumb: for n under a few dozen or when inversions are rare, insertion sort can outrun O(n log n) sorts because
                of its low overhead and cache friendliness. Beyond that, switch to merge, heap, quick, or TimSort.
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
