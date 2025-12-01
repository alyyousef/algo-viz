import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const historicalNotes = [
  {
    title: '1960, C. A. R. Hoare invents quicksort',
    detail:
      'Hoare devised quicksort while working on translation software, seeking a fast in-memory sort for words on an Elliott 803. The paper established partitioning around a pivot as a simple, powerful idea.',
  },
  {
    title: '1970s, Sedgewick refines pivoting and cutoffs',
    detail:
      'Robert Sedgewick analyzed variants like median-of-three pivoting and insertion sort cutoffs, reducing comparisons and improving real performance.',
  },
  {
    title: '1997, introsort guards the worst case',
    detail:
      'Musser blended quicksort with heapsort to cap recursion depth, guaranteeing O(n log n) even on adversarial inputs. C++ std::sort popularized this hybrid.',
  },
  {
    title: 'Modern era, three-way partitioning and sampling',
    detail:
      'Variants handle massive duplicates (Dijkstra three-way partition) and use random or sample pivots to keep partitions balanced in practice.',
  },
]

const mentalModels = [
  {
    title: 'Pivot as a fulcrum',
    detail:
      'Drop a fulcrum on a beam of numbers. Everything lighter moves left, heavier moves right. The fulcrum ends up exactly where it belongs in the final order.',
  },
  {
    title: 'Border control checkpoint',
    detail:
      'Two inspectors walk toward each other. When left finds a traveler too big and right finds one too small, they swap them across the border. When inspectors cross, the border (pivot position) is settled.',
  },
  {
    title: 'Divide by filtering',
    detail:
      'Instead of halving by index, quicksort halves by property: less than pivot versus greater than pivot. Good pivots make the property split balanced.',
  },
]

const mechanics = [
  {
    heading: 'Pivot selection',
    bullets: [
      'Options: first element, random element, median-of-three (first, middle, last), or sample median for larger arrays.',
      'Randomization defends against pre-sorted or crafted inputs that cause quadratic behavior.',
    ],
  },
  {
    heading: 'Partitioning',
    bullets: [
      'Lomuto: single pass, pivot at end, pointer for smaller region. Simple but more swaps.',
      'Hoare: two pointers from ends moving inward, fewer swaps and good cache behavior.',
      'Three-way partition: split into less than, equal, greater than pivot to handle duplicates efficiently.',
    ],
  },
  {
    heading: 'Recursion and stack control',
    bullets: [
      'Recurse on left and right partitions. Tail-recurse on the larger side last or turn it into a loop to keep stack depth O(log n) on average.',
      'Switch to insertion sort for tiny partitions (often size < 16) to reduce overhead.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Time complexity',
    detail:
      'Average O(n log n) with balanced partitions. Worst case O(n^2) when partitions are highly unbalanced, such as sorted input with a fixed first-element pivot.',
  },
  {
    title: 'Space complexity',
    detail:
      'In-place with O(1) auxiliary data, but needs call stack. Expected recursion depth is O(log n) with random pivots; worst-case depth is O(n) without safeguards.',
  },
  {
    title: 'Cache behavior',
    detail:
      'Partitioning walks arrays sequentially, which is cache-friendly. This often makes quicksort faster than heap sort and sometimes faster than merge sort despite similar asymptotics.',
  },
  {
    title: 'Stability',
    detail:
      'Standard quicksort is unstable; equal elements can swap relative order. Stable variants exist but lose the simple in-place partition.',
  },
]

const applications = [
  {
    context: 'Standard library sorts',
    detail:
      'Many C and C++ qsort or std::sort implementations rely on quicksort or introsort for in-memory arrays because of strong average performance and low overhead.',
  },
  {
    context: 'Selection problems',
    detail:
      'Quickselect, a sibling of quicksort, finds the kth smallest element in expected linear time using the same partition routine.',
  },
  {
    context: 'Partition-based analytics',
    detail:
      'Streaming and analytics tasks use partition steps to split data around a threshold (for example, values above a quantile) without fully sorting.',
  },
  {
    context: 'Randomized algorithms education',
    detail:
      'Quicksort is a primary example of expected-time analysis and randomized algorithms, illustrating how random pivots smooth out adversarial inputs.',
  },
]

const codeExamples = [
  {
    title: 'Randomized quicksort with Hoare partition',
    code: `function quickSort(a: number[], lo = 0, hi = a.length - 1): void {
  if (lo >= hi) return
  const p = partition(a, lo, hi)
  quickSort(a, lo, p)
  quickSort(a, p + 1, hi)
}

function partition(a: number[], lo: number, hi: number): number {
  const pivotIndex = lo + Math.floor(Math.random() * (hi - lo + 1))
  const pivot = a[pivotIndex]
  // move pivot to start for convenience
  ;[a[lo], a[pivotIndex]] = [a[pivotIndex], a[lo]]
  let i = lo - 1
  let j = hi + 1
  while (true) {
    do { i++ } while (a[i] < pivot)
    do { j-- } while (a[j] > pivot)
    if (i >= j) return j
    ;[a[i], a[j]] = [a[j], a[i]]
  }
}`,
    explanation:
      'Hoare partition returns the final index of the left partition. Random pivot defends against crafted inputs. Tail-call elimination can reduce recursion depth in practice.',
  },
  {
    title: 'Three-way partition to handle duplicates',
    code: `function quickSort3Way(a: number[], lo = 0, hi = a.length - 1): void {
  if (lo >= hi) return
  const pivot = a[lo]
  let lt = lo, gt = hi, i = lo + 1
  while (i <= gt) {
    if (a[i] < pivot) { swap(a, lt++, i++) }
    else if (a[i] > pivot) { swap(a, i, gt--) }
    else { i++ }
  }
  quickSort3Way(a, lo, lt - 1)
  quickSort3Way(a, gt + 1, hi)
}

function swap(a: number[], i: number, j: number): void {
  const tmp = a[i]; a[i] = a[j]; a[j] = tmp
}`,
    explanation:
      'Three partitions (< pivot, == pivot, > pivot) shrink recursion when many duplicates exist, preventing the O(n^2) blowup seen with simple two-way partitioning.',
  },
]

const pitfalls = [
  'Choosing the first or last element as pivot on sorted or reverse-sorted input triggers worst-case O(n^2) time. Use randomization or sampling.',
  'Off-by-one errors in partition loops can drop or duplicate elements. Verify invariants: left partition < pivot, right partition > pivot (or <= / >= for chosen variant).',
  'Recursing on the larger partition first inflates stack depth. Always recurse on the smaller side and loop on the larger to keep depth near O(log n).',
  'Assuming stability: quicksort does not preserve equal-ordering. If stability matters, pick merge sort or Timsort.',
  'Skipping small-array cutoffs hurts performance. Switch to insertion sort for tiny ranges to avoid overhead.',
]

const decisionGuidance = [
  'Need fastest average in-memory sort with small constant factors: quicksort or introsort is often best.',
  'Need guaranteed worst-case O(n log n): use introsort or heap sort; guard quicksort with depth limits.',
  'Need stability: choose merge sort or Timsort.',
  'Data has many duplicates: use three-way quicksort or pivot sampling to avoid unbalanced partitions.',
  'Input might be adversarial or sorted: randomize pivots or median-of-three to avoid quadratic behavior.',
]

const advancedInsights = [
  {
    title: 'Introsort safety net',
    detail:
      'Track recursion depth; when it exceeds 2 log2 n, switch to heap sort. This keeps the O(n log n) guarantee without losing quicksort speed on typical data.',
  },
  {
    title: 'Median-of-medians pivot',
    detail:
      'Using the deterministic linear-time median-of-medians algorithm as a pivot yields guaranteed balanced partitions, but higher constants make it slower in practice.',
  },
  {
    title: 'Cache-aware partitioning',
    detail:
      'Block partitioning and branchless comparisons reduce cache misses and branch mispredictions, narrowing the gap to theoretical optimal performance.',
  },
  {
    title: 'Parallel quicksort',
    detail:
      'Partitioning both halves in parallel can speed large arrays on multi-core systems, but requires careful scheduling to avoid false sharing and load imbalance.',
  },
]

const takeaways = [
  'Quicksort excels on average because partitioning is cache-friendly and in-place.',
  'Random or sampled pivots and three-way partitioning keep performance near O(n log n) even with duplicates or sorted data.',
  'Worst-case O(n^2) is real; introsort-style guards eliminate that risk.',
  'Quicksort is unstable; choose a stable algorithm when equal-ordering matters.',
  'References: Hoare 1961 paper, CLRS Chapter 7, Sedgewick analyses, and GeeksforGeeks for visual traces.',
]

export default function QuickSortPage(): JSX.Element {
  return (
    <TopicLayout
      title="Quick Sort"
      subtitle="Partition around a pivot, conquer in place"
      intro="Quick sort selects a pivot, partitions the array into elements less and greater than that pivot, and recurses on each side. With good pivots it delivers fast, in-place O(n log n) sorting; with guardrails it avoids the rare quadratic worst case."
    >
      <TopicSection heading="The big picture">
        <p className="text-white/80">
          Quicksort shines when you want speed with minimal extra memory. It divides by property rather than by position, letting the
          pivot fall into its final slot after a single partition pass. The algorithm is simple to code yet deep enough to teach
          randomized analysis, cache behavior, and adversarial thinking.
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
          The partition phase is the heart: a single pass rearranges elements so the pivot can be placed in its final index. After
          that, the pivot is done forever. Choosing the smaller side for recursion first keeps stack growth contained. Tiny slices
          often switch to insertion sort to cut overhead and comparisons.
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
