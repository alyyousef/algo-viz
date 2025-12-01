import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const historicalNotes = [
  {
    title: '1964, J. W. J. Williams coins heaps',
    detail:
      'Williams published the binary heap and heapsort idea to improve tape sorting, showing that the structure could deliver in-place O(n log n) sorting.',
  },
  {
    title: '1964, Robert Floyd optimizes heapify',
    detail:
      'Floyd introduced the bottom-up heap construction that runs in O(n) time, a cornerstone still taught in CLRS and Knuth Volume 3.',
  },
  {
    title: '1970s, heaps extend to Dijkstra and Prim',
    detail:
      'Priority queues backed by heaps powered shortest paths and minimum spanning tree algorithms, cementing heaps as a general scheduling tool.',
  },
  {
    title: '1997, introsort adopts heaps',
    detail:
      'Musser blended quicksort with heapsort in introspective sort to guarantee O(n log n) even on adversarial inputs, a strategy used by C++ std::sort.',
  },
]

const mentalModels = [
  {
    title: 'Ballasted pyramid',
    detail:
      'Picture a pyramid of rocks where each layer must rest on heavier stones beneath it. The largest rock settles at the top in a max-heap because every parent dominates its children.',
  },
  {
    title: 'Bubble with gravity',
    detail:
      'Sift-down acts like a bubble in water moving opposite gravity. When the root is swapped with a tail element, it sinks until the heap property is restored.',
  },
  {
    title: 'Two-phase excavation',
    detail:
      'First compact the pile (heapify), then excavate the biggest rocks one by one and stack them at the end of the array. The sorted segment grows from the tail backward.',
  },
]

const mechanics = [
  {
    heading: 'Array layout',
    bullets: [
      'Store the heap in place: children of index i sit at 2i+1 and 2i+2, the parent is floor((i-1)/2).',
      'Use a max-heap for ascending order. The maximum is always at index 0, ready for extraction.',
    ],
  },
  {
    heading: 'Bottom-up heapify',
    bullets: [
      'Start from the last internal node at floor(n/2)-1 and call sift-down on each node toward index 0.',
      'Each sift-down touches at most the height of its subtree, yielding an amortized O(n) build, a result Floyd formalized.',
    ],
  },
  {
    heading: 'Sort-down phase',
    bullets: [
      'Swap the root with the last element in the heap boundary, shrinking the active heap by one.',
      'Sift-down the new root to restore order, then repeat until the heap size is 1. The array tail becomes the sorted output.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Time complexity',
    detail:
      'Heapify runs in O(n); each of n extract-max operations costs O(log n). Overall heapsort is O(n log n) regardless of input order, unlike quicksort without introspection.',
  },
  {
    title: 'Space complexity',
    detail:
      'The algorithm is in-place, requiring O(1) auxiliary space beyond a few temporaries. No additional buffers are allocated.',
  },
  {
    title: 'Constant factors and cache',
    detail:
      'Tree-shaped memory access harms cache locality compared to merge sort or quicksort. Practical runtimes can be slower even with identical Big O bounds.',
  },
  {
    title: 'Stability',
    detail:
      'Plain heapsort is unstable because swaps can reorder equal elements. Stable variants track original indices at the cost of extra space.',
  },
]

const applications = [
  {
    context: 'Language runtimes and libraries',
    detail:
      'C++ std::sort uses introsort, which falls back to heapsort when recursion depth grows too large. This protects against worst-case quicksort behavior caused by crafted inputs.',
  },
  {
    context: 'Partial sorting and top-k',
    detail:
      'Building a heap lets you pick off the largest or smallest elements efficiently. Top-k selection with a bounded heap avoids sorting the full array when you only need the extremes.',
  },
  {
    context: 'External and streaming workflows',
    detail:
      'Heapsort pairs well with runs from external sorting passes. It offers deterministic memory use, useful when merging streams or preparing fixed-size batches for disks.',
  },
  {
    context: 'Scheduling and simulation',
    detail:
      'Priority queues in simulators, networking stacks, and operating systems depend on heap operations. Heapsort demonstrates the same primitives used in those schedulers.',
  },
]

const codeExamples = [
  {
    title: 'Canonical heapsort (TypeScript-like pseudocode)',
    code: `function heapSort(arr: number[]): void {
  const n = arr.length
  // Build max-heap in O(n)
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    siftDown(arr, i, n)
  }
  // Extract max and shrink heap
  for (let end = n - 1; end > 0; end--) {
    swap(arr, 0, end)
    siftDown(arr, 0, end) // heap size is 'end'
  }
}

function siftDown(a: number[], i: number, heapSize: number): void {
  while (true) {
    const left = 2 * i + 1
    const right = 2 * i + 2
    let largest = i
    if (left < heapSize && a[left] > a[largest]) largest = left
    if (right < heapSize && a[right] > a[largest]) largest = right
    if (largest === i) return
    swap(a, i, largest)
    i = largest
  }
}

function swap(a: number[], i: number, j: number): void {
  const tmp = a[i]
  a[i] = a[j]
  a[j] = tmp
}`,
    explanation:
      'The sift-down loop ensures each node is larger than its children before moving on. Using the heap boundary (heapSize) prevents touching the sorted suffix.',
  },
  {
    title: 'Top-k smallest using a max-heap',
    code: `function topKSmallest(stream: number[], k: number): number[] {
  const heap: number[] = []
  for (const x of stream) {
    if (heap.length < k) {
      heap.push(x)
      siftUp(heap, heap.length - 1)
    } else if (x < heap[0]) { // replace current max
      heap[0] = x
      siftDown(heap, 0, heap.length)
    }
  }
  return heap.sort((a, b) => a - b) // final order
}

function siftUp(a: number[], i: number): void {
  while (i > 0) {
    const parent = Math.floor((i - 1) / 2)
    if (a[parent] >= a[i]) break
    swap(a, parent, i)
    i = parent
  }
}`,
    explanation:
      'A bounded heap keeps only k elements in O(k) space. This pattern is common in recommendations, monitoring dashboards, and leaderboard services that surface top items without full sorts.',
  },
]

const pitfalls = [
  'Forgetting the floor(n/2)-1 starting index for heapify leads to wasted work or missed nodes.',
  'Using sift-up during heap construction degrades performance to O(n log n); the bottom-up Floyd method is strictly better.',
  'Not shrinking the heap boundary after swaps causes already-sorted elements to be reheapified and can break correctness.',
  'Assuming stability can misplace equal keys. Attach original positions if order among equals matters.',
  'Ignoring cache effects can make heapsort slower than quicksort or merge sort on real CPUs even though complexities match.',
]

const decisionGuidance = [
  'Need worst-case O(n log n) without extra memory: pick heapsort over quicksort when adversarial inputs are possible.',
  'Need tight cache behavior and average-case speed: prefer quicksort or Timsort; heapsort trades locality for predictability.',
  'Need stability: choose merge sort or Timsort. Stable heapsort variants require extra bookkeeping and space.',
  'Need to guard a quicksort: use introsort, which switches to heapsort after a recursion depth threshold.',
  'Need top-k or continuous selection: maintain a bounded heap instead of sorting all elements.',
]

const advancedInsights = [
  {
    title: 'D-ary and pairing heaps',
    detail:
      'Increasing arity reduces depth and can speed up decrease-key heavy workloads. Pairing heaps or Fibonacci heaps beat binary heaps for specific priority queue operations, but they trade simplicity and constants.',
  },
  {
    title: 'Heapsort with branchless comparisons',
    detail:
      'Tuning sift-down with branchless selection and cache-aware layouts can narrow the gap to quicksort. Academic benchmarks show 5 to 15 percent gains from reduced mispredictions.',
  },
  {
    title: 'Stable heapsort variants',
    detail:
      'Tagging elements with original indices or using two heaps can yield stability at O(n log n) time with O(n) extra space. Useful when equality order must be preserved.',
  },
  {
    title: 'Parallel heap construction',
    detail:
      'Bottom-up heapify parallelizes across subtrees. Parallel heapsort exists, but merge-based parallel sorts often scale better because of memory access patterns.',
  },
]

const takeaways = [
  'Heapsort guarantees O(n log n) time and O(1) extra space, independent of input order.',
  'Floyds bottom-up heapify is the key to linear-time construction.',
  'Cache behavior and instability are the main practical drawbacks compared to quicksort or merge sort.',
  'Heaps underpin schedulers, top-k queries, and introsort fallbacks, so mastering heap primitives pays beyond sorting.',
  'References: CLRS, Knuth Volume 3, and GeeksforGeeks for walkthroughs and visualizations.',
]

export default function HeapSortPage(): JSX.Element {
  return (
    <TopicLayout
      title="Heap Sort"
      subtitle="Build a heap in place, then peel off the maximums"
      intro="Heapsort is an in-place, comparison-based algorithm that never degrades beyond O(n log n). It leverages the heap order property to surface the maximum element, swap it to the back, and restore the heap until the array is sorted."
    >
      <TopicSection heading="The big picture">
        <p className="text-white/80">
          Heapsort answers a classic constraint: sort reliably using minimal extra space. By turning the input array into a binary
          heap, it provides a predictable ceiling on comparisons and memory. That reliability is why introsort leans on it and why
          systems with strict memory budgets keep it in the toolkit.
        </p>
      </TopicSection>

      <TopicSection heading="Historical context">
        <div className="grid gap-3 md:grid-cols-2">
          {historicalNotes.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Core concept and mental models">
        <div className="grid gap-3 md:grid-cols-3">
          {mentalModels.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="How it works">
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
        <p className="mt-3 text-sm text-white/70">
          The key operation is sift-down: compare a node to its children, swap with the larger child if the heap property fails,
          and continue downward. Each swap strictly reduces the height of the violation, so it terminates in logarithmic time.
        </p>
      </TopicSection>

      <TopicSection heading="Complexity analysis">
        <div className="grid gap-3 md:grid-cols-2">
          {complexityNotes.map((note) => (
            <article key={note.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h4 className="text-sm font-semibold text-white">{note.title}</h4>
              <p className="text-sm text-white/80">{note.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Real-world applications">
        <div className="grid gap-3 md:grid-cols-2">
          {applications.map((item) => (
            <article key={item.context} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.context}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Practical examples">
        <div className="space-y-4">
          {codeExamples.map((example) => (
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

      <TopicSection heading="Advanced insights and variations">
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
