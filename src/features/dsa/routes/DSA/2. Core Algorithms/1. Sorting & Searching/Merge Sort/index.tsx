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

const historicalNotes = [
  {
    title: '1945, John von Neumann proposes merge sort',
    detail:
      'Designed for early computers with sequential storage, merge sort fit tape drives where random access was expensive but linear scans were cheap.',
  },
  {
    title: '1968, Knuth formalizes the analysis',
    detail:
      'The Art of Computer Programming Volume 3 recorded merge sort as a canonical stable sort with tight O(n log n) bounds and practical external variants.',
  },
  {
    title: '1970s, database and tape sorting',
    detail:
      'External merge sort became the backbone of tape and disk sorting, influencing database merge joins and batch processing pipelines.',
  },
  {
    title: '2002, Tim Peters crafts Timsort',
    detail:
      'Python adopted a hybrid merge-based sort that detects natural runs and gallops through data, later adopted by Java and Android.',
  },
]

const mentalModels = [
  {
    title: 'Two conveyor belts',
    detail:
      'Picture two belts of sorted boxes feeding a single chute. You always take the smaller front box to keep the outgoing stream sorted.',
  },
  {
    title: 'Tournament brackets',
    detail:
      'Subarrays compete pairwise, producing winners that advance to the next merge round. Each level halves the number of contenders until one sorted champion remains.',
  },
  {
    title: 'Band rehearsal',
    detail:
      'Each section (subarray) practices alone to stay in tune, then sections merge in time until the full orchestra is synchronized in order.',
  },
]

const mechanics = [
  {
    heading: 'Divide phase',
    bullets: [
      'Split the array at the midpoint into left and right halves until each segment has length 1.',
      'Recursion depth is O(log n), and each level covers all elements exactly once.',
    ],
  },
  {
    heading: 'Merge phase',
    bullets: [
      'Maintain two pointers, one per half. Repeatedly pick the smaller element to append to the output buffer.',
      'When a half is exhausted, append the remaining items from the other half; they are already sorted.',
      'Copy the merged buffer back into the original segment to preserve global order.',
    ],
  },
  {
    heading: 'Stable behavior',
    bullets: [
      'Ties are resolved by taking from the left half first, so equal elements retain their original ordering.',
      'Stability is why merge sort underpins language library sorts where predictable ordering matters.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Time complexity',
    detail:
      'Every level of the recursion tree processes n elements, and there are log2 n levels. Total time is O(n log n) regardless of input order.',
  },
  {
    title: 'Space complexity',
    detail:
      'The classic array implementation needs O(n) auxiliary space for the merge buffer. Linked list versions can achieve O(1) extra space by relinking nodes.',
  },
  {
    title: 'Cache and bandwidth',
    detail:
      'Merge sort reads and writes sequentially, which plays well with disks and memory bandwidth. Cache locality is good for the merge buffer but can lag quicksort on in-place arrays.',
  },
  {
    title: 'Stability and determinism',
    detail:
      'Stable by design and free from pivot pathologies. Worst-case behavior matches average-case behavior, a reason databases rely on it.',
  },
]

const applications = [
  {
    context: 'Standard library defaults',
    detail:
      'Python, Java, and Android collections lean on Timsort, a merge-based stable algorithm tuned for real-world runs and partly sorted data.',
  },
  {
    context: 'External sorting and ETL',
    detail:
      'Sorting terabyte-scale logs uses external merge sort: produce sorted runs that fit in memory or on SSD, then k-way merge them from disk.',
  },
  {
    context: 'Databases and merge joins',
    detail:
      'Merge sort aligns with merge join operators. Sorted relations let databases join in linear time relative to input sizes.',
  },
  {
    context: 'Linked list ordering',
    detail:
      'Without random access, quicksort and heapsort stumble. Merge sort on linked lists stays O(n log n) and stable with no extra buffer.',
  },
]

const codeExamples = [
  {
    title: 'Classic merge sort (TypeScript-like pseudocode)',
    code: `function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr
  const mid = Math.floor(arr.length / 2)
  const left = mergeSort(arr.slice(0, mid))
  const right = mergeSort(arr.slice(mid))
  return merge(left, right)
}

function merge(a: number[], b: number[]): number[] {
  const out: number[] = []
  let i = 0, j = 0
  while (i < a.length && j < b.length) {
    if (a[i] <= b[j]) out.push(a[i++])
    else out.push(b[j++])
  }
  // append any leftovers
  while (i < a.length) out.push(a[i++])
  while (j < b.length) out.push(b[j++])
  return out
}`,
    explanation:
      'Left-first tie handling preserves stability. Slicing simplifies the exposition; production code prefers a shared buffer to avoid repeated allocations.',
  },
  {
    title: 'External merge: k-way merge of sorted runs',
    code: `function mergeRuns(runs: Array<Iterator<number>>): number[] {
  // Min-heap of { value, fromRun }
  const heap: Array<{ v: number, r: number }> = []
  const next = (r: number) => {
    const iter = runs[r]
    const { value, done } = iter.next()
    if (!done) pushHeap(heap, { v: value, r })
  }
  // seed heap
  for (let r = 0; r < runs.length; r++) next(r)
  const out: number[] = []
  while (heap.length) {
    const { v, r } = popMin(heap)
    out.push(v)
    next(r) // refill from the run that lost an element
  }
  return out
}`,
    explanation:
      'External sort reads multiple pre-sorted runs from disk and merges them with a min-heap of run heads. The heap keeps the next smallest item across all runs in O(log k) per output element.',
  },
]

const pitfalls = [
  'Forgetting to copy merged data back into the source segment leaves parent calls with stale ordering.',
  'Allocating a fresh buffer at every recursion level inflates space to O(n log n). Reuse one buffer per call stack level instead.',
  'Off-by-one midpoints can skip elements or double-count them. Use mid = floor((l + r) / 2) and careful boundaries.',
  'Recursion depth can overflow on very large inputs in constrained environments; iterative bottom-up merges avoid this.',
  'Assuming merge sort is always faster because of stability. On tiny arrays insertion sort beats it; hybrids switch for small sizes.',
]

const decisionGuidance = [
  'Need stability and predictable O(n log n) time: choose merge sort or Timsort.',
  'Sorting linked lists: prefer merge sort to avoid random access and preserve stability.',
  'Sorting data larger than memory: external merge sort is the default approach.',
  'Memory is tight and stability is optional: quicksort or heapsort may be better.',
  'Real-world partially sorted data: use Timsort or a merge hybrid that exploits natural runs.',
]

const advancedInsights = [
  {
    title: 'Bottom-up iterative merges',
    detail:
      'Merging subarrays of size 1, then 2, then 4 avoids recursion and improves cache behavior. This pattern mirrors how Timsort merges runs.',
  },
  {
    title: 'Galloping mode in Timsort',
    detail:
      'When one run dominates comparisons, Timsort switches to exponential search and bulk copies, cutting comparisons significantly on clustered data.',
  },
  {
    title: 'In-place merging tricks',
    detail:
      'Algorithms like the rotation method or block merge sort reduce auxiliary space below O(n) while trying to preserve stability, trading simplicity for intricate pointer gymnastics.',
  },
  {
    title: 'Parallel merges',
    detail:
      'Splitting both halves and merging with parallel prefix partitions delivers near-linear speedups on multi-core systems when bandwidth allows.',
  },
]

const takeaways = [
  'Merge sort delivers stable, deterministic O(n log n) performance across inputs.',
  'Its space footprint buys simplicity and guarantees, shining on linked lists and external sorting.',
  'Run detection and galloping, as in Timsort, make merge-based sorts excel on real-world partially ordered data.',
  'When memory is scarce, consider quicksort or heapsort; when order stability matters, merge sort is the safe choice.',
  'References: CLRS Chapter 2, Knuth Volume 3, and GeeksforGeeks for visual walkthroughs and external sort examples.',
]

export default function MergeSortPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Merge Sort</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Divide, conquer, and recombine in steady order</div>
              <p className="win95-text">
                Merge sort is the canonical divide-and-conquer sort: split the array into halves, sort each half, and merge them
                while keeping ties stable. Its predictable O(n log n) behavior and stability make it a backbone for library sorts,
                external sorting, and linked structures.
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
                Merge sort exists to provide reliable ordering when memory and determinism matter. It favors sequential access over
                clever pivots, making it ideal for disks, streams, and data that must keep equal elements in their original order.
                Its rhythm is consistent at every scale: divide, sort, and merge with the same choreography from start to finish.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Historical context</legend>
            <div className="win95-grid win95-grid-2">
              {historicalNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Core concept and mental models</legend>
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
            <legend>How it works</legend>
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
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                The merge step drives the algorithm: two sorted halves flow into a buffer, picking the smallest head each time.
                Stability arises naturally because ties favor the left half, preserving the original relative order of equal items.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity analysis</legend>
            <div className="win95-grid win95-grid-2">
              {complexityNotes.map((note) => (
                <div key={note.title} className="win95-panel">
                  <div className="win95-heading">{note.title}</div>
                  <p className="win95-text">{note.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Real-world applications</legend>
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
            <legend>Advanced insights and variations</legend>
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
