import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const mentalModels = [
  {
    title: 'Sorting a hand of cards',
    detail:
      'You pick up cards one by one and insert each into its correct spot among the already sorted ones.',
  },
  {
    title: 'Growing a sorted prefix',
    detail:
      'Left side stays sorted; each new element from the right shifts left until it fits.',
  },
]

const mechanics = [
  {
    heading: 'Core loop',
    bullets: [
      'Iterate i from 1 to n - 1; key = arr[i].',
      'Shift larger elements in arr[0..i-1] one position right until you find the insertion point.',
      'Place key in the opened slot.',
    ],
  },
  {
    heading: 'Stability and adaptivity',
    bullets: [
      'Stable: equal elements retain relative order because shifts move only larger elements.',
      'Adaptive: runs in O(n) on already sorted input (only comparisons, no shifts).',
    ],
  },
  {
    heading: 'Hybrid usage',
    bullets: [
      'Use insertion sort for small partitions inside quicksort/mergesort to reduce overhead.',
      'Good for small arrays where constant factors dominate.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Time',
    detail:
      'Worst and average O(n^2); best case O(n) on sorted arrays. Practical for small n.',
  },
  {
    title: 'Space',
    detail:
      'In-place, O(1) extra space; stable.',
  },
]

const realWorldUses = [
  {
    context: 'Small or nearly sorted datasets',
    detail:
      'Great for small n (e.g., n < 20) or low-disorder data where shifts are minimal.',
  },
  {
    context: 'Sorting cutoffs in hybrids',
    detail:
      'Used as a base case in introsort and mergesort implementations to speed up tiny partitions.',
  },
]

const examples = [
  {
    title: 'Insertion sort',
    code: `function insertionSort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
    explanation:
      'Shifts elements right until the correct spot for key is found; stable and in-place.',
  },
]

const pitfalls = [
  'Inefficient on large, random data due to O(n^2) behavior.',
  'Forgetting stability by swapping instead of shifting can break relative order.',
]

const decisionGuidance = [
  'Tiny arrays or nearly sorted: insertion sort is simple and fast.',
  'Large or random data: prefer O(n log n) algorithms.',
  'As a helper inside divide-and-conquer sorts, set a cutoff where insertion sort takes over small partitions.',
]

const takeaways = [
  'Insertion sort is stable, in-place, adaptive to order, and great for small ranges.',
  'Quadratic worst-case time limits it to small or low-disorder inputs.',
  'Perfect as a hybrid cutoff in faster sorts.',
]

export default function InsertionSortPage(): JSX.Element {
  return (
    <TopicLayout
      title="Insertion Sort"
      subtitle="Grow a sorted prefix one item at a time"
      intro="Insertion sort builds a sorted prefix by inserting each new element into place. It is stable, in-place, adaptive on nearly sorted data, and a common base case for hybrid algorithms."
    >
      <TopicSection heading="The big picture">
        <p className="text-white/80">
          With each iteration, the left portion remains sorted while the next element slides left to fit. This yields linear time
          on sorted input and quadratic time on random input, making it best for small or nearly ordered arrays.
        </p>
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
      </TopicSection>

      <TopicSection heading="Complexity">
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
          {realWorldUses.map((item) => (
            <article key={item.context} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.context}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Practical example">
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
