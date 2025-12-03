import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const mentalModels = [
  {
    title: 'Tally marks by value',
    detail:
      'Instead of comparing items, count how many of each key occur, then lay them out in order of key.',
  },
  {
    title: 'Prefix sums as positions',
    detail:
      'Cumulative counts tell you the starting index for each key in the output, enabling stable placement.',
  },
]

const mechanics = [
  {
    heading: 'Counting',
    bullets: [
      'Allocate a count array of size (maxKey - minKey + 1) initialized to zero.',
      'Scan input; increment count[key] for each element.',
    ],
  },
  {
    heading: 'Prefix and placement',
    bullets: [
      'Transform counts into prefix sums so count[key] stores the end position for that key.',
      'Scan input backward (for stability), placing each element into output[count[key]-1] and decrementing count[key].',
    ],
  },
  {
    heading: 'Stability and range',
    bullets: [
      'Stable if you place elements in reverse input order during placement.',
      'Requires small key range relative to n to be efficient in space/time.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Time',
    detail:
      'O(n + k) where n is number of elements and k is key range size.',
  },
  {
    title: 'Space',
    detail:
      'O(n + k) for output plus counts. In-place versions exist for limited cases but lose stability.',
  },
  {
    title: 'Key assumptions',
    detail:
      'Keys must be integers in a bounded range; scaling or bucketing needed otherwise.',
  },
]

const realWorldUses = [
  {
    context: 'Radix sort building block',
    detail:
      'Stable counting sort on digits enables radix sort for large integers/strings without comparisons.',
  },
  {
    context: 'Grades, IDs, small-range data',
    detail:
      'When keys fall in a limited range (scores 0-100, months, buckets), counting sort excels.',
  },
  {
    context: 'Histogram-based pipelines',
    detail:
      'Image processing and histogram equalization rely on counting/prefix sums over pixel intensities.',
  },
]

const examples = [
  {
    title: 'Stable counting sort (non-negative keys)',
    code: `function countingSort(arr, maxKey):
    count = array of length maxKey + 1 filled with 0
    output = array of length len(arr)

    for x in arr:
        count[x] += 1

    for k in range(1, maxKey + 1):
        count[k] += count[k - 1]

    for x in reversed(arr):
        count[x] -= 1
        output[count[x]] = x

    return output`,
    explanation:
      'Prefix sums turn counts into positions. Backward scan preserves stability by placing later duplicates after earlier ones.',
  },
]

const pitfalls = [
  'Range too large: O(n + k) becomes impractical in memory/time; switch to comparison sorts or radix with smaller digits.',
  'Forgetting stability (not scanning backward) can break downstream radix sorts.',
  'Negative keys need offset handling (shift keys by -minKey).',
]

const decisionGuidance = [
  'Small integer range: counting sort is fast and stable.',
  'Large range but fixed-width keys: use radix sort with counting as a digit sorter.',
  'Unknown or huge range: use O(n log n) comparison sorts.',
]

const takeaways = [
  'Counting sort replaces comparisons with key tallies, reaching linear time when the range is modest.',
  'Stability comes from backward placement using prefix sums.',
  'Space grows with key range; ensure k is manageable before choosing it.',
]

export default function CountingSortPage(): JSX.Element {
  return (
    <TopicLayout
      title="Counting Sort"
      subtitle="Histogram first, order later"
      intro="Counting sort tallies occurrences of each key, then uses prefix sums to place items in order without comparisons. When the key range is small, it delivers stable linear-time sorting and powers radix sort."
    >
      <TopicSection heading="The big picture">
        <p className="text-white/80">
          By trading comparisons for counting, sorting becomes a histogram-plus-prefix-sum problem. It thrives when keys are
          integers in a small range and produces stable output suitable for radix pipelines.
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
