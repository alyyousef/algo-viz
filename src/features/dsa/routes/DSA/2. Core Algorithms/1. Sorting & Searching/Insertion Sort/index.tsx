import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


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

const loopInvariants = [
  {
    title: 'Sorted prefix invariant',
    detail:
      'Before each outer-loop iteration i, the subarray a[0..i-1] is sorted and contains the same elements as the original prefix.',
  },
  {
    title: 'Hole invariant',
    detail:
      'During the inner loop, there is a single hole at index j + 1, and all elements in a[0..i-1] greater than key have been shifted right by one.',
  },
  {
    title: 'Stability guarantee',
    detail:
      'Only elements strictly greater than key are shifted, so equal keys never cross each other.',
  },
]

const stepTrace = [
  {
    step: 'Start',
    state: '[7, 3, 5, 2]',
    note: 'Prefix of length 1 is trivially sorted.',
  },
  {
    step: 'Insert 3',
    state: '[3, 7, 5, 2]',
    note: 'Shift 7 right, place 3 at index 0.',
  },
  {
    step: 'Insert 5',
    state: '[3, 5, 7, 2]',
    note: 'Shift 7 right, place 5 at index 1.',
  },
  {
    step: 'Insert 2',
    state: '[2, 3, 5, 7]',
    note: 'Shift 7, 5, 3 right; place 2 at index 0.',
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

const performanceProfile = [
  {
    title: 'Comparisons',
    detail:
      'Worst case ~ n(n-1)/2 comparisons. Best case n-1 comparisons (already sorted). With binary insertion, comparisons drop to O(n log n) but shifts still dominate.',
  },
  {
    title: 'Data movement',
    detail:
      'Shifts are proportional to the number of inversions. Each inversion causes one element move, so total writes are O(n + inversions).',
  },
  {
    title: 'Adaptive behavior',
    detail:
      'Nearly sorted input yields few inversions, so runtime approaches linear even for moderately sized arrays.',
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

const variantsAndTweaks = [
  {
    title: 'Binary insertion sort',
    detail:
      'Use binary search to find the insertion point, reducing comparisons. Shifts remain O(n) so total time is still O(n^2).',
  },
  {
    title: 'Sentinel optimization',
    detail:
      'Place a guaranteed minimum value at a[0] to remove the j >= 0 bound check in the inner loop, improving branch prediction.',
  },
  {
    title: 'Gapped insertion (Shell sort)',
    detail:
      'Insertion sort on gapped elements is the core of Shell sort. Gaps reduce inversions quickly before a final insertion pass.',
  },
  {
    title: 'Partial insertion for TimSort',
    detail:
      'Extend short runs to a minimum run length with insertion sort, then merge. This exploits existing order for large arrays.',
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
  {
    title: 'Stable insertion of objects by key',
    code: `type Item = { key: number; payload: string };

function insertionSortByKey(items: Item[]): Item[] {
  for (let i = 1; i < items.length; i += 1) {
    const keyItem = items[i];
    let j = i - 1;
    while (j >= 0 && items[j].key > keyItem.key) {
      items[j + 1] = items[j];
      j -= 1;
    }
    items[j + 1] = keyItem;
  }
  return items;
}`,
    explanation:
      'Use a strict greater-than comparison on the key to preserve stability when payloads share the same key value.',
  },
]

const pitfalls = [
  'Using swaps instead of shifts loses stability and doubles writes.',
  'Applying insertion sort to large, random data leads to severe O(n^2) slowdowns.',
  'Forgetting to tune hybrid cutoffs can leave performance on the table (too low wastes recursion, too high wastes quadratic work).',
  'Inner loop bounds errors (j >= 0) can underflow or skip the first element.',
  'Comparing with >= instead of > breaks stability by reordering equal keys.',
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

const implementationTips = [
  {
    title: 'Use a local key variable',
    detail:
      'Store a[i] in a temporary key to avoid repeated array reads while shifting.',
  },
  {
    title: 'Prefer index arithmetic over swaps',
    detail:
      'Shifting contiguous memory is faster than repeated swapping and preserves stability.',
  },
  {
    title: 'Short-circuit sorted prefixes',
    detail:
      'If a[i] >= a[i - 1], skip the inner loop entirely; this is common on nearly sorted data.',
  },
  {
    title: 'Avoid extra allocations',
    detail:
      'Insertion sort is in-place; avoid creating new arrays unless you need a persistent original.',
  },
]

const quickChecks = [
  {
    q: 'Is insertion sort stable?',
    a: 'Yes, when you shift only elements that are strictly greater than the key.',
  },
  {
    q: 'Why does it perform well on nearly sorted input?',
    a: 'Few inversions mean few shifts, so the inner loop runs a tiny number of steps.',
  },
  {
    q: 'Can we make it faster with binary search?',
    a: 'Binary search reduces comparisons but cannot avoid the O(n) shifts per insertion.',
  },
  {
    q: 'When should I avoid it?',
    a: 'Large random arrays or data with many inversions; use O(n log n) sorts instead.',
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
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Grow a sorted prefix one element at a time</div>
              <p className="win95-text">
                Insertion sort builds a sorted prefix by shifting larger elements right to make space for each new key. It is stable,
                in-place, and adaptive on nearly sorted data, which makes it a staple for tiny arrays, streaming inserts, and hybrid
                cutoffs in faster sorts.
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
            <legend>Quick checks</legend>
            <div className="win95-grid win95-grid-2">
              {quickChecks.map((item) => (
                <div key={item.q} className="win95-panel">
                  <div className="win95-heading">{item.q}</div>
                  <p className="win95-text">{item.a}</p>
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

