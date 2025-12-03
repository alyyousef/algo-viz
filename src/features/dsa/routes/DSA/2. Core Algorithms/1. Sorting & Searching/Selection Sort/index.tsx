import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const mentalModels = [
  {
    title: 'Picking the smallest',
    detail:
      'Scan the unsorted region to find the minimum and place it at the boundary, growing a sorted prefix from left to right.',
  },
  {
    title: 'One swap per pass',
    detail:
      'Each pass finds an extreme element and swaps once, minimizing writes compared to other quadratic sorts.',
  },
]

const mechanics = [
  {
    heading: 'Core loop',
    bullets: [
      'For i from 0 to n - 2: assume min = i.',
      'Scan j from i + 1 to n - 1; update min when a smaller element appears.',
      'Swap arr[i] with arr[min] at the end of the pass.',
    ],
  },
  {
    heading: 'Variants',
    bullets: [
      'Find both min and max each pass to shrink from both ends (bidirectional selection).',
      'Unstable by default because of swaps; stable variants require more moves.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Time',
    detail:
      'Always O(n^2) comparisons; swaps are only O(n). No best-case speedup on sorted input.',
  },
  {
    title: 'Space',
    detail:
      'In-place, O(1) extra space; typically unstable.',
  },
  {
    title: 'Write-sensitive scenarios',
    detail:
      'Low swap count can benefit flash memory or wear-limited environments compared to bubble or insertion sorts.',
  },
]

const realWorldUses = [
  {
    context: 'Small arrays with expensive writes',
    detail:
      'Useful when comparisons are cheap but writes are costly (e.g., EEPROM/flash).',
  },
  {
    context: 'Teaching selection and invariants',
    detail:
      'Shows how a sorted prefix grows via choosing extremes, illustrating invariants and O(n^2) behavior.',
  },
]

const examples = [
  {
    title: 'Selection sort',
    code: `function selectionSort(arr):
    n = len(arr)
    for i in range(n - 1):
        minIdx = i
        for j in range(i + 1, n):
            if arr[j] < arr[minIdx]:
                minIdx = j
        if minIdx != i:
            swap(arr[i], arr[minIdx])
    return arr`,
    explanation:
      'Finds the minimum in the unsorted suffix and swaps it into position i. Swaps are limited to at most n - 1.',
  },
]

const pitfalls = [
  'No best-case improvement: still scans entire suffix even if already sorted.',
  'Unstable swaps can reorder equal elements.',
  'Quadratic time makes it unsuitable for large datasets.',
]

const decisionGuidance = [
  'Need minimal writes and can afford comparisons: selection sort is acceptable for small n.',
  'Need stability or better average time: prefer insertion (small n) or O(n log n) sorts.',
  'Already using bidirectional strategy: consider finding min and max per pass to halve passes.',
]

const takeaways = [
  'Selection sort is in-place and swap-light but fixed O(n^2) time.',
  'Works by repeatedly selecting the minimum from the unsorted region.',
  'Use when writes are expensive and n is small; otherwise pick faster algorithms.',
]

export default function SelectionSortPage(): JSX.Element {
  return (
    <TopicLayout
      title="Selection Sort"
      subtitle="Grow a sorted prefix by selecting extremes"
      intro="Selection sort repeatedly selects the smallest remaining element and swaps it into place. It minimizes swaps but still performs quadratic comparisons, making it fit only for small, write-sensitive tasks."
    >
      <TopicSection heading="The big picture">
        <p className="text-white/80">
          Each pass locks one element into its final position at the boundary of sorted and unsorted regions. Comparisons dominate
          runtime, while swaps are limited to one per pass, which can matter when writes are costly.
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
