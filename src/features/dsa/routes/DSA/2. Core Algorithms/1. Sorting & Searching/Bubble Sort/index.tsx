import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const mentalModels = [
  {
    title: 'Bubbles rising',
    detail:
      'Adjacent out-of-order pairs swap so heavy elements sink to the end; multiple passes bubble light elements upward to their spot.',
  },
  {
    title: 'Local cleanup',
    detail:
      'Each pass cleans local inversions; after k passes, the k heaviest items are locked in place at the end.',
  },
]

const mechanics = [
  {
    heading: 'Core loop',
    bullets: [
      'Repeat passes over the array; compare adjacent items and swap if they are out of order.',
      'Track whether any swap occurred; if a full pass makes no swaps, the array is sorted and you can stop early.',
    ],
  },
  {
    heading: 'Optimization',
    bullets: [
      'Shrink the inner loop by one each pass because the tail portion is already sorted.',
      'Stable by nature (adjacent swaps only).',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Time',
    detail:
      'O(n^2) in average and worst cases. Best case O(n) if early-exit detects an already sorted array.',
  },
  {
    title: 'Space',
    detail:
      'In-place with O(1) extra space; stable.',
  },
]

const realWorldUses = [
  {
    context: 'Teaching tool',
    detail:
      'Simple to visualize and reason about inversions; often used to introduce sorting and stability concepts.',
  },
  {
    context: 'Tiny datasets with near-sorted input',
    detail:
      'Early-exit variant can be fine when n is very small and data is nearly sorted, though insertion sort is usually better.',
  },
]

const examples = [
  {
    title: 'Bubble sort with early exit',
    code: `function bubbleSort(arr):
    n = len(arr)
    for i in range(n):
        swapped = false
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                swap(arr[j], arr[j + 1])
                swapped = true
        if not swapped:
            break
    return arr`,
    explanation:
      'Early exit turns best-case time to O(n). Inner loop shrinks because last i elements are already in place.',
  },
]

const pitfalls = [
  'Ignoring early-exit wastes time on already sorted data.',
  'Using bubble sort on large data is impractical; quadratic time dominates quickly.',
]

const decisionGuidance = [
  'For education or tiny, almost-sorted arrays: acceptable.',
  'For production or larger n: pick insertion sort for small n or O(n log n) algorithms (merge/quick/heap).',
]

const takeaways = [
  'Bubble sort is stable, in-place, and simple but quadratic.',
  'Early-exit improves best case to linear on sorted inputs.',
  'Use mainly as a teaching example, not a production workhorse.',
]

export default function BubbleSortPage(): JSX.Element {
  return (
    <TopicLayout
      title="Bubble Sort"
      subtitle="Adjacent swaps that bubble extremes outward"
      intro="Bubble sort repeatedly swaps out-of-order neighbors, pushing heavy elements to the end and letting light elements rise. It is stable and simple but quadratic, best suited for teaching or tiny, nearly sorted data."
    >
      <TopicSection heading="The big picture">
        <p className="text-white/80">
          Each pass removes local inversions. After k passes, the k largest elements are fixed at the tail. Early exit detects
          sorted arrays, making best-case time linear but leaving average and worst cases quadratic.
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
        <div className="grid gap-3 md:grid-cols-2">
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
