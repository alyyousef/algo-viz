import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

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

const complexityNotes = [
  {
    title: 'Time',
    detail:
      'Worst and average O(n^2) comparisons and shifts; best case O(n) when the array is already sorted.',
  },
  {
    title: 'Space and stability',
    detail:
      'In-place with O(1) extra space and stable ordering via shifts instead of swaps.',
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
    <TopicLayout
      title="Insertion Sort"
      subtitle="Grow a sorted prefix one element at a time"
      intro="Insertion sort builds a sorted prefix by shifting larger elements right to make space for each new key. It is stable, in-place, and adaptive on nearly sorted data, which makes it a staple for tiny arrays and hybrid cutoffs."
    >
      <TopicSection heading="The big picture">
        <p className="text-white/80">
          Each iteration keeps the left side sorted while one new element slides left to its place. On sorted data, the algorithm
          is linear; on random data it is quadratic. That balance makes it perfect for small buffers, nearly ordered sequences,
          and as the finishing step inside faster divide-and-conquer sorts.
        </p>
      </TopicSection>

      <TopicSection heading="Historical context">
        <div className="grid gap-3 md:grid-cols-2">
          {historicalMilestones.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Core concept and mental models">
        <div className="grid gap-3 md:grid-cols-2">
          {mentalModels.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="How it works: step-by-step">
        <div className="grid gap-3 md:grid-cols-3">
          {mechanics.map((block) => (
            <article key={block.heading} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{block.heading}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/80">
                {block.bullets.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Complexity analysis and intuition">
        <div className="grid gap-3 md:grid-cols-2">
          {complexityNotes.map((note) => (
            <article key={note.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h4 className="text-sm font-semibold text-white">{note.title}</h4>
              <p className="text-sm text-white/80">{note.detail}</p>
            </article>
          ))}
        </div>
        <p className="mt-3 text-sm text-white/70">
          Rule of thumb: for n under a few dozen or when inversions are rare, insertion sort can outrun O(n log n) sorts because
          of its low overhead and cache friendliness. Beyond that, switch to merge, heap, quick, or TimSort.
        </p>
      </TopicSection>

      <TopicSection heading="Real-world applications">
        <div className="grid gap-3 md:grid-cols-2">
          {realWorldUses.map((item) => (
            <article key={item.context} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.context}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Practical examples">
        <div className="space-y-4">
          {examples.map((example) => (
            <article key={example.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{example.title}</p>
              <pre className="mt-2 overflow-x-auto rounded bg-black/40 p-3 text-xs text-white/90">
                <code>{example.code}</code>
              </pre>
              <p className="text-sm text-white/80">{example.explanation}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Common pitfalls">
        <ul className="list-disc space-y-2 pl-5 text-sm text-white/80">
          {pitfalls.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </TopicSection>

      <TopicSection heading="When to use it">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/80">
          {decisionGuidance.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </TopicSection>

      <TopicSection heading="Advanced insights">
        <div className="grid gap-3 md:grid-cols-2">
          {advancedInsights.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Key takeaways">
        <div className="rounded-lg border border-emerald-400/40 bg-emerald-500/10 p-4">
          <ul className="list-disc space-y-2 pl-5 text-sm text-emerald-100">
            {takeaways.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </TopicSection>
    </TopicLayout>
  )
}
