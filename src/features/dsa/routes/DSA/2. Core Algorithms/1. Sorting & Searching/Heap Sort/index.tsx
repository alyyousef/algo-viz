import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: '1964: Williams introduces heapsort',
    detail:
      'J. W. J. Williams proposed the binary heap and heapsort to speed up tape sorting, showing O(n log n) time with O(1) extra space.',
  },
  {
    title: '1964: Floyd makes heapify linear',
    detail:
      "Robert Floyd published the bottom-up heap construction that runs in O(n), the version still taught in CLRS and Knuth's texts.",
  },
  {
    title: '1970s: Heaps power graph algorithms',
    detail:
      'Binary heaps became the default priority queue for Dijkstra and Prim, tying heap primitives to scheduling and shortest paths.',
  },
  {
    title: '1997: Introsort uses heaps as a safety net',
    detail:
      'David Musser blended quicksort with heapsort to cap worst-case time at O(n log n); C++ std::sort still follows this strategy.',
  },
]

const mentalModels = [
  {
    title: 'Mountain with the peak on top',
    detail:
      'A max-heap is a mountain where every parent is taller than its children. The peak (largest element) sits at index 0, ready to remove.',
  },
  {
    title: 'Sift-down as gravity',
    detail:
      'After swapping the root with the end, the new root falls down the tree, swapping with the larger child until the heap property is restored.',
  },
  {
    title: 'Two zones in one array',
    detail:
      'Heapsort keeps a live heap prefix and a growing sorted suffix at the end. The boundary shrinks as you peel off maxima.',
  },
]

const mechanics = [
  {
    heading: 'Array layout',
    bullets: [
      'Children of i are at 2i+1 and 2i+2; parent is floor((i-1)/2).',
      'Use a max-heap for ascending output; the root holds the current maximum.',
    ],
  },
  {
    heading: 'Linear-time heapify',
    bullets: [
      'Start at the last internal node floor(n/2)-1 and call sift-down to index 0.',
      'Total work is O(n) because lower levels have many nodes with tiny heights.',
    ],
  },
  {
    heading: 'Sort-down',
    bullets: [
      'Swap the root with the last element in the heap boundary.',
      'Reduce heap size by one, then sift-down the new root to restore heap order.',
      'Repeat until the heap size is 1; the array tail ends up sorted.',
    ],
  },
]

const heapProperties = [
  {
    title: 'Heap order property',
    detail:
      'In a max-heap, every parent is >= its children. This guarantees the maximum element sits at the root.',
  },
  {
    title: 'Shape property',
    detail:
      'The heap is a complete binary tree: all levels are full except possibly the last, filled left to right.',
  },
  {
    title: 'Implicit tree',
    detail:
      'The tree lives in the array layout; no pointer objects are needed, which keeps memory overhead tiny.',
  },
]

const loopInvariants = [
  {
    title: 'Heap boundary invariant',
    detail:
      'Before each extraction, a[0..heapSize-1] is a valid max-heap and a[heapSize..n-1] is sorted in ascending order.',
  },
  {
    title: 'Root is current maximum',
    detail:
      'Because of the heap order property, the largest element in the heap boundary is always at index 0.',
  },
  {
    title: 'Sift-down correctness',
    detail:
      'Sift-down restores heap order by pushing the root down until both children are smaller.',
  },
]

const stepTrace = [
  {
    step: 'Build heap',
    state: '[4, 10, 3, 5, 1] -> [10, 5, 3, 4, 1]',
    note: 'Heapify converts the array into a max-heap in-place.',
  },
  {
    step: 'Extract max',
    state: '[10, 5, 3, 4, 1] -> [1, 5, 3, 4, 10]',
    note: 'Swap root with end. Heap boundary shrinks to index 3.',
  },
  {
    step: 'Sift-down',
    state: '[1, 5, 3, 4, 10] -> [5, 4, 3, 1, 10]',
    note: 'Restore heap property in the reduced boundary.',
  },
  {
    step: 'Repeat',
    state: '[5, 4, 3, 1, 10] -> [1, 4, 3, 5, 10] -> [4, 1, 3, 5, 10]',
    note: 'Continue extracting until the array is fully sorted.',
  },
]

const complexityNotes = [
  {
    title: 'Time',
    detail:
      "O(n) to build the heap with Floyd's method, then (n-1) extract-max steps at O(log n) each; total O(n log n) regardless of input order.",
  },
  {
    title: 'Space',
    detail: 'In-place with O(1) auxiliary space. No extra buffers beyond a few temporaries.',
  },
  {
    title: 'Stability',
    detail:
      'Unstable: swaps can reorder equal elements. Stable variants tag items with original indices at the cost of extra space.',
  },
  {
    title: 'Cache behavior',
    detail:
      'Pointer-like jumps (2i+1, 2i+2) hurt locality, so heapsort often lags quicksort or mergesort in wall-clock time despite the same asymptotic bound.',
  },
]

const performanceProfile = [
  {
    title: 'Comparison count',
    detail:
      'Each sift-down compares a node with up to two children per level, making comparisons dense but predictable.',
  },
  {
    title: 'Writes and swaps',
    detail:
      'Heapsort uses swaps heavily, which can be expensive for large records; consider indirect sorting with indices when needed.',
  },
  {
    title: 'Cache locality',
    detail:
      'Jumping between parents and children causes cache misses, often making heapsort slower than quicksort in practice.',
  },
]

const comparisonTable = [
  {
    algorithm: 'Heap sort',
    time: 'O(n log n)',
    space: 'O(1)',
    stable: 'No',
    notes: 'Great worst-case bounds; weaker cache locality.',
  },
  {
    algorithm: 'Quick sort',
    time: 'O(n log n) avg',
    space: 'O(log n)',
    stable: 'No',
    notes: 'Fast in practice; worst case O(n^2) without safeguards.',
  },
  {
    algorithm: 'Merge sort',
    time: 'O(n log n)',
    space: 'O(n)',
    stable: 'Yes',
    notes: 'Stable and predictable but needs extra memory.',
  },
  {
    algorithm: 'TimSort',
    time: 'O(n log n)',
    space: 'O(n)',
    stable: 'Yes',
    notes: 'Adaptive on real-world data; dominates many standard libraries.',
  },
  {
    algorithm: 'Selection sort',
    time: 'O(n^2)',
    space: 'O(1)',
    stable: 'No',
    notes: 'Simple but too slow for large arrays.',
  },
]

const realWorldUses = [
  {
    context: 'Introsort fallback',
    detail:
      'C++ std::sort and many runtimes fall back to heapsort when quicksort recursion gets too deep, protecting against adversarial inputs.',
  },
  {
    context: 'Top-k selection',
    detail:
      'Maintaining a bounded heap yields top-k without sorting everything, common in leaderboards, search ranking, and monitoring dashboards.',
  },
  {
    context: 'Resource scheduling',
    detail:
      'Heaps back priority queues in simulators, kernels, and networking stacks. Heapsort showcases the same primitives.',
  },
  {
    context: 'External sorting pipelines',
    detail:
      'Deterministic memory use makes heaps useful when producing fixed-size runs for external merge sort or constrained batch jobs.',
  },
]

const variantsAndTweaks = [
  {
    title: 'Bottom-up sift',
    detail:
      'Instead of swapping on every level, move the hole down and place the root once; reduces writes.',
  },
  {
    title: 'Heaps on indices',
    detail:
      'Sort indices instead of records to avoid copying large objects; stable order can be added with index ties.',
  },
  {
    title: 'Min-heap for descending',
    detail:
      'Using a min-heap produces descending order; max-heap yields ascending order.',
  },
  {
    title: 'D-ary heaps',
    detail:
      'Increase branching factor to reduce height; trades extra comparisons for fewer levels.',
  },
]

const examples = [
  {
    title: 'Heapsort (TypeScript-like pseudocode)',
    code: `function heapSort(a: number[]): void {
  const n = a.length;
  // Build max-heap in O(n)
  for (let i = Math.floor(n / 2) - 1; i >= 0; i -= 1) {
    siftDown(a, i, n);
  }
  // Sort-down: extract max to the end
  for (let end = n - 1; end > 0; end -= 1) {
    swap(a, 0, end);
    siftDown(a, 0, end); // heap size is "end"
  }
}

function siftDown(a: number[], i: number, size: number): void {
  while (true) {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let largest = i;
    if (left < size && a[left] > a[largest]) largest = left;
    if (right < size && a[right] > a[largest]) largest = right;
    if (largest === i) break;
    swap(a, i, largest);
    i = largest;
  }
}

function swap(a: number[], i: number, j: number): void {
  const tmp = a[i];
  a[i] = a[j];
  a[j] = tmp;
}`,
    explanation:
      'Floyd-style heapify builds the structure in linear time. The heap boundary (size) keeps the sorted suffix untouched during sift-down.',
  },
  {
    title: 'Top-k largest via min-heap',
    code: `function topKLargest(stream: number[], k: number): number[] {
  if (k === 0) return [];
  const heap: number[] = [];
  for (const x of stream) {
    if (heap.length < k) {
      heap.push(x);
      siftUpMin(heap, heap.length - 1);
    } else if (x > heap[0]) {
      heap[0] = x;
      siftDownMin(heap, 0, heap.length);
    }
  }
  return heap.sort((a, b) => b - a); // optional final order
}

function siftUpMin(h: number[], i: number): void {
  while (i > 0) {
    const p = Math.floor((i - 1) / 2);
    if (h[p] <= h[i]) break;
    swap(h, p, i);
    i = p;
  }
}

function siftDownMin(h: number[], i: number, size: number): void {
  while (true) {
    const l = 2 * i + 1;
    const r = 2 * i + 2;
    let smallest = i;
    if (l < size && h[l] < h[smallest]) smallest = l;
    if (r < size && h[r] < h[smallest]) smallest = r;
    if (smallest === i) break;
    swap(h, i, smallest);
    i = smallest;
  }
}`,
    explanation:
      'A size-k min-heap keeps the current k largest items; any new item only interacts with the root. This pattern avoids sorting the full stream.',
  },
]

const pitfalls = [
  'Building with repeated insert (sift-up) wastes O(n log n); use Floyd heapify for O(n).',
  'Off-by-one in heapify start: begin at floor(n/2)-1 or you will revisit leaves unnecessarily.',
  'Forgetting to shrink the heap boundary after swapping root with end causes already-sorted elements to be reheapified.',
  'Assuming stability: plain heapsort can reorder equal keys unless you tag original positions.',
  'Expecting quicksort-like cache behavior: scattered accesses can make heapsort slower in practice despite O(n log n) bounds.',
  'Ignoring record size: swapping large objects is costly; use indices or pointers when items are heavy.',
]

const decisionGuidance = [
  'Need worst-case O(n log n) with O(1) space: heapsort is a safe choice or fallback inside introsort.',
  'Need raw speed on average data and good cache use: quicksort or TimSort usually win.',
  'Need stability: choose merge sort or TimSort; stable heapsort needs extra space to tag elements.',
  'Need partial results (top-k): use a bounded heap instead of full heapsort.',
  'Memory constrained environments: heapsort avoids the extra buffers merge-based methods allocate.',
]

const advancedInsights = [
  {
    title: 'Branch and cache tuning',
    detail:
      'Branchless comparisons and blocking the array to improve locality can narrow the gap to quicksort by reducing mispredictions and cache misses.',
  },
  {
    title: 'D-ary heaps',
    detail:
      'Using d-ary heaps reduces height (fewer sift steps) at the cost of more child comparisons per level; useful for wide-fanout hardware or decrease-key heavy queues.',
  },
  {
    title: 'Parallel heapify',
    detail:
      'Bottom-up heap construction parallelizes across subtrees, but merge-based parallel sorts often scale better because of memory access patterns.',
  },
  {
    title: 'Stable heapsort variants',
    detail:
      'Stability can be achieved by pairing each key with its original index and comparing tuples. Time stays O(n log n), space rises to O(n).',
  },
]

const implementationTips = [
  {
    title: 'Keep sift-down tight',
    detail:
      'Use iterative loops and hoist bounds checks to reduce overhead in inner loops.',
  },
  {
    title: 'Choose max-heap for ascending',
    detail:
      'If you build a max-heap, each extraction places the next-largest at the end, yielding ascending order.',
  },
  {
    title: 'Minimize swaps',
    detail:
      'Use a temporary root value and move children up until the correct spot is found.',
  },
  {
    title: 'Prefer Floyd heapify',
    detail:
      'Bottom-up heap construction is linear time; repeated inserts are not.',
  },
]

const takeaways = [
  'Heapsort guarantees O(n log n) time and O(1) extra space for any input.',
  'Floyd heapify is the lever that makes heap construction linear.',
  'Scattered memory access and instability are the main practical drawbacks versus quicksort or mergesort.',
  'Mastering heap primitives pays off beyond sorting: top-k, schedulers, and introsort all rely on them.',
]

export default function HeapSortPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Heap Sort</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Build a max-heap in place, then peel off the maximums</div>
              <p className="win95-text">
                Heap sort converts the array into a max-heap, then repeatedly swaps the root to the end and restores the heap. It
                offers O(n log n) worst-case time and O(1) extra space, making it a predictable safety net when inputs can be
                adversarial.
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
                Heapsort trades a bit of cache friendliness for reliability. It never needs extra buffers, never degrades beyond
                O(n log n), and uses the same sift primitives that power priority queues. That predictability is why introsort falls
                back to it when quicksort faces bad pivots.
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
            <legend>How it works: heapify then sort-down</legend>
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
                The core operation is sift-down: compare a node to its children, swap with the larger child if the heap property
                fails, and continue until the path ends. Each swap reduces the height of the violation, so sift-down is O(log n).
                Building from the bottom amortizes that cost to O(n) overall during heapify.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Heap properties</legend>
            <div className="win95-grid win95-grid-3">
              {heapProperties.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Loop invariants (why it is correct)</legend>
            <div className="win95-grid win95-grid-3">
              {loopInvariants.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Worked trace on a tiny array</legend>
            <div className="win95-stack">
              {stepTrace.map((item) => (
                <div key={item.step} className="win95-panel">
                  <div className="win95-heading">{item.step}</div>
                  <pre className="win95-code">
                    <code>{item.state}</code>
                  </pre>
                  <p className="win95-text">{item.note}</p>
                </div>
              ))}
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
            <legend>Performance profile</legend>
            <div className="win95-grid win95-grid-3">
              {performanceProfile.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Compare and contrast</legend>
            <div className="win95-panel">
              <table className="win95-table">
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
            <legend>Variants and performance tweaks</legend>
            <div className="win95-grid win95-grid-2">
              {variantsAndTweaks.map((item) => (
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
            <legend>Implementation tips</legend>
            <div className="win95-grid win95-grid-2">
              {implementationTips.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
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
            <div className="win95-grid win95-grid-2">
              {takeaways.map((item) => (
                <div key={item} className="win95-panel">
                  <p className="win95-text">{item}</p>
                </div>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}

