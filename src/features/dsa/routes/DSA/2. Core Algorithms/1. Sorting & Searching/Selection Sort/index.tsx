import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const historicalMilestones = [
  {
    title: '1930s: Tournament method roots',
    detail:
      'Early sorting research used tournament trees to pick winners. Selection sort is the simplest “pick the winner, remove it, repeat” approach.',
  },
  {
    title: '1960s: Textbook staple',
    detail:
      'Selection sort became a CS101 anchor for teaching invariants and contrasting low swap counts with quadratic comparisons.',
  },
  {
    title: 'Flash and EEPROM awareness',
    detail:
      'With flash memory, the one-swap-per-pass property was highlighted for wear-sensitive cases where writes are expensive.',
  },
]

const mentalModels = [
  {
    title: 'Scout and swap',
    detail:
      'Send a scout through the unsorted region to find the minimum, then perform a single swap to place it at the boundary.',
  },
  {
    title: 'Growing a sorted front line',
    detail:
      'The left prefix stays sorted; each pass annexes the smallest remaining element to that front line.',
  },
  {
    title: 'Write-sparing',
    detail:
      'Exactly one swap per pass minimizes writes, trading extra comparisons for write efficiency.',
  },
]

const mechanics = [
  {
    heading: 'Core loop',
    bullets: [
      'For i from 0 to n - 2: set min = i.',
      'Scan j from i + 1 to n - 1; if a[j] < a[min], update min.',
      'Swap a[i] with a[min] once the pass ends.',
    ],
  },
  {
    heading: 'Bidirectional selection',
    bullets: [
      'Find both min and max in the same pass and swap them to the front and back, shrinking both boundaries.',
      'Cuts passes roughly in half but still performs O(n^2) comparisons.',
    ],
  },
  {
    heading: 'Stability considerations',
    bullets: [
      'Naive swaps make it unstable; equal items can cross.',
      'Stable variants shift elements instead of swapping, increasing writes and losing the main advantage.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Time',
    detail:
      'Always O(n^2) comparisons; no best-case improvement. Swaps are O(n) overall (one per pass).',
  },
  {
    title: 'Space and stability',
    detail:
      'In-place with O(1) extra space. Unstable unless you accept more writes to preserve order.',
  },
  {
    title: 'Write profile',
    detail:
      'Minimal writes make it appealing on wear-limited storage or when writes are slower than comparisons.',
  },
]

const realWorldUses = [
  {
    context: 'Write-constrained environments',
    detail:
      'Embedded systems on flash/EEPROM where preserving write cycles matters more than extra comparisons.',
  },
  {
    context: 'Tiny datasets with cheap comparisons',
    detail:
      'Small buffers where simplicity and low swaps outweigh quadratic comparisons (for example, a handful of telemetry fields).',
  },
  {
    context: 'Pedagogical contrast',
    detail:
      'Used in classrooms to highlight invariants, swap minimization, and why O(n^2) comparisons dominate time.',
  },
]

const examples = [
  {
    title: 'Selection sort (TypeScript-like pseudocode)',
    code: `function selectionSort(a: number[]): number[] {
  for (let i = 0; i < a.length - 1; i += 1) {
    let min = i;
    for (let j = i + 1; j < a.length; j += 1) {
      if (a[j] < a[min]) min = j;
    }
    if (min !== i) {
      const tmp = a[i];
      a[i] = a[min];
      a[min] = tmp;
    }
  }
  return a;
}`,
    explanation:
      'One pass, one swap. Swaps are bounded by n - 1, which is why selection sort is swap-light compared to other quadratic sorts.',
  },
  {
    title: 'Bidirectional selection',
    code: `function bidirectionalSelectionSort(a: number[]): number[] {
  let start = 0;
  let end = a.length - 1;
  while (start < end) {
    let min = start, max = start;
    for (let i = start; i <= end; i += 1) {
      if (a[i] < a[min]) min = i;
      if (a[i] > a[max]) max = i;
    }
    [a[start], a[min]] = [a[min], a[start]];
    if (max === start) max = min;
    [a[end], a[max]] = [a[max], a[end]];
    start += 1;
    end -= 1;
  }
  return a;
}`,
    explanation:
      'Shrinks from both ends, halving passes. Comparisons remain quadratic; writes stay low (two swaps per pass).',
  },
]

const pitfalls = [
  'No adaptivity: still O(n^2) comparisons on sorted input.',
  'Unstable due to swaps; equal elements can flip order.',
  'Bidirectional variant must adjust max index if it was swapped with the min.',
  'Using it on large datasets causes obvious performance collapse versus O(n log n) sorts.',
]

const decisionGuidance = [
  'Writes are expensive and n is tiny: selection sort is acceptable.',
  'Need stability: prefer insertion or merge-based sorts; stable selection costs extra writes.',
  'Need speed on average data: quicksort, merge sort, or TimSort dominate.',
  'Want fewer passes: bidirectional selection reduces passes but not the quadratic comparisons.',
]

const advancedInsights = [
  {
    title: 'Comparison vs. write trade-off',
    detail:
      'Selection sort minimizes writes at the cost of comparisons. If write cost dominates, it can beat bubble or insertion despite the same asymptotic class.',
  },
  {
    title: 'Cycle sort connection',
    detail:
      'Cycle sort extends the “place element directly” idea to achieve the theoretical minimum number of writes for a permutation.',
  },
  {
    title: 'Cache behavior',
    detail:
      'Linear scans are cache-friendly, but the lack of early exit means every suffix is scanned fully even if mostly sorted.',
  },
  {
    title: 'Adversarial robustness',
    detail:
      'Cost is fixed at Theta(n^2) regardless of input pattern; there is no pivot sensitivity as in quicksort.',
  },
]

const takeaways = [
  'Selection sort is in-place and swap-light but fixed at O(n^2) comparisons with no best-case gain.',
  'It is unstable unless modified; stability costs extra writes and undercuts its main advantage.',
  'Use it when writes are expensive and n is small; otherwise prefer adaptive or O(n log n) algorithms.',
  'Bidirectional selection can cut passes but not the quadratic comparison count.',
]

export default function SelectionSortPage(): JSX.Element {
  return (
    <TopicLayout
      title="Selection Sort"
      subtitle="One swap per pass, a lesson in write-sparing sorting"
      intro="Selection sort walks the unsorted region to find an extreme element, then performs a single swap to grow the sorted prefix. It is in-place, swap-light, and predictably Theta(n^2), making it interesting for write-sensitive cases but unfit for large inputs."
    >
      <TopicSection heading="The big picture">
        <p className="text-white/80">
          Each pass locks one element into its final position at the boundary of sorted and unsorted regions. Comparisons dominate
          runtime, while swaps are capped at one per pass, which is why selection sort can win in write-constrained environments
          despite its quadratic comparisons.
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
