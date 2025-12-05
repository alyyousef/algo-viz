import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

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
    <TopicLayout
      title="Bubble Sort"
      subtitle="A gentle, stable, quadratic sorter that excels as a teaching lens for comparisons and local swaps"
      intro="Bubble sort is the simplest stable, in-place sorting algorithm. Its strength is not speed; it is the clarity with which it reveals comparisons, swaps, and loop invariants. This page explores the mechanics, history, complexity, and the rare circumstances where bubble sort still earns a place, along with the many situations where faster algorithms win."
    >
      <TopicSection heading="The big picture">
        <p className="text-white/80">
          Bubble sort repeatedly walks the list, swapping adjacent out-of-order elements until no swaps occur. It is stable,
          uses constant extra space, and achieves O(n) time on already sorted data when equipped with an early exit. On random
          inputs it is O(n^2), which is why it rarely appears in production sorting pipelines. Its enduring value lies in its
          transparency: you can watch correctness emerge one swap at a time.
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

      <TopicSection heading="How it works: pass-by-pass motion">
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

      <TopicSection heading="Complexity analysis and performance intuition">
        <div className="grid gap-3 md:grid-cols-2">
          {complexityNotes.map((note) => (
            <article key={note.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h4 className="text-sm font-semibold text-white">{note.title}</h4>
              <p className="text-sm text-white/80">{note.detail}</p>
            </article>
          ))}
        </div>
        <p className="mt-3 text-sm text-white/70">
          Rule of thumb: if you need to sort beyond a handful of nearly sorted items, move to insertion sort for small n or to
          O(n log n) algorithms like quicksort or merge sort. Bubble sort is a clarity benchmark, not a throughput tool.
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

      <TopicSection heading="Advanced insights and current frontiers">
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
