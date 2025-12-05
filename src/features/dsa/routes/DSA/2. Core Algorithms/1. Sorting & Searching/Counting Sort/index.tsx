import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const historicalMilestones = [
  {
    title: 'Seward frames counting sort (1954)',
    detail:
      'Harold H. Seward described counting sort while proposing LSD radix sorting of punched cards, showing how histograms can replace comparisons.',
  },
  {
    title: 'Knuth popularizes the analysis (1968)',
    detail:
      'Volume 3 of The Art of Computer Programming cast counting sort as the canonical linear-time stable sort when keys fit a small universe, giving the O(n + k) framing.',
  },
  {
    title: 'Radix sort synergy in systems (1970s to 1990s)',
    detail:
      'Mainframes and later database engines leaned on counting sort as the stable digit sorter inside radix sort to beat comparison sorts on fixed-width records.',
  },
  {
    title: 'GPU histograms and scans (2000s)',
    detail:
      'Parallel prefix-sum primitives on GPUs made counting-sort-like kernels a staple for clustering keys before heavier work like radix partitioning.',
  },
]

const mentalModels = [
  {
    title: 'Tally marks by value',
    detail:
      'Lay out buckets for every possible key, place a tally each time you see that key, then read the buckets in order to rebuild the array.',
  },
  {
    title: 'Prefix sums as conveyor belts',
    detail:
      'Cumulative counts become starting slots for each key. As you decrement while placing, the conveyor belt advances to the next open position.',
  },
  {
    title: 'Replacing comparisons with address arithmetic',
    detail:
      'Every element jumps directly to its final neighborhood based on its key’s prefix sum, skipping pairwise comparisons entirely.',
  },
]

const mechanics = [
  {
    heading: 'Count',
    bullets: [
      'Find minKey and maxKey; let k = maxKey - minKey + 1.',
      'Allocate count[k] = 0. One pass over input increments count[key - minKey].',
    ],
  },
  {
    heading: 'Prefix and position',
    bullets: [
      'Convert counts to prefix sums so count[i] stores the end offset (exclusive) for key i.',
      'This turns histogram bins into write pointers for stable placement.',
    ],
  },
  {
    heading: 'Stable placement',
    bullets: [
      'Scan input backward to preserve order of equal keys.',
      'For each x: idx = x - minKey; count[idx] -= 1; output[count[idx]] = x.',
    ],
  },
  {
    heading: 'Range and memory tuning',
    bullets: [
      'Counting sort is practical only when k is modest; otherwise compress keys or switch to radix or comparison sorts.',
      'If keys are sparse within a large numeric range, map them to dense indices before counting.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Time',
    detail:
      'O(n + k): one pass to count, one to prefix, one to place. When k is much smaller than n, it is effectively linear in n.',
  },
  {
    title: 'Space',
    detail:
      'O(n + k): an output array plus the count array. In-place variants lose stability and rarely pay off.',
  },
  {
    title: 'Stability',
    detail:
      'Backward placement is what makes the algorithm stable. Skip it and radix-sort pipelines break on repeated digits.',
  },
  {
    title: 'Cache behavior',
    detail:
      'Counting and prefix phases are sequential and cache-friendly. Placement scatters writes across the output but remains predictable and branch-light.',
  },
]

const realWorldUses = [
  {
    context: 'Radix sort digit passes',
    detail:
      'Counting sort is the stable inner loop on each digit for LSD radix sorts on integers, IPv4 addresses, or fixed-width strings. See CLRS and GeeksforGeeks radix-sort writeups.',
  },
  {
    context: 'Image processing histograms',
    detail:
      'Operations like histogram equalization or bucketizing pixel intensities compute counts and prefix sums, effectively running counting-sort primitives.',
  },
  {
    context: 'Database and log bucketing',
    detail:
      'When grouping by small categorical IDs (months 0–11, status codes, grade bands), counting-sort logic bins rows before more expensive aggregation.',
  },
  {
    context: 'Parallel pre-partitioning',
    detail:
      'GPU and SIMD pipelines use counting-plus-scan to cluster keys locally before global sorts, taking advantage of fast prefix-sum kernels.',
  },
]

const examples = [
  {
    title: 'Stable counting sort with offsets (TypeScript-like pseudocode)',
    code: `function countingSort(arr: number[]): number[] {
  if (arr.length === 0) return [];
  const minKey = Math.min(...arr);
  const maxKey = Math.max(...arr);
  const k = maxKey - minKey + 1;
  const count = Array(k).fill(0);
  const out = Array(arr.length);

  // Count
  for (const x of arr) count[x - minKey] += 1;

  // Prefix to positions (exclusive end)
  for (let i = 1; i < k; i += 1) count[i] += count[i - 1];

  // Stable placement (reverse scan)
  for (let i = arr.length - 1; i >= 0; i -= 1) {
    const idx = arr[i] - minKey;
    count[idx] -= 1;
    out[count[idx]] = arr[i];
  }
  return out;
}`,
    explanation:
      'Offsetting by minKey supports negative keys. The reverse scan preserves stability, which is crucial if this function feeds a radix sort.',
  },
  {
    title: 'Digit pass inside radix sort (base 256)',
    code: `function radixPass(arr, byteIndex):
    count[256] = {0}
    out = new array(len(arr))
    for x in arr:
        digit = (x >> (8 * byteIndex)) & 0xFF
        count[digit] += 1
    for d in 1..255:
        count[d] += count[d - 1]
    for x in reversed(arr):
        digit = (x >> (8 * byteIndex)) & 0xFF
        count[digit] -= 1
        out[count[digit]] = x
    return out`,
    explanation:
      'Using 256 as the digit alphabet keeps k small and cacheable. Each byte pass is stable, letting later passes respect earlier ordering.',
  },
]

const pitfalls = [
  'Letting k explode: if maxKey - minKey is large, the count array dominates memory and runtime.',
  'Forgetting the minKey offset when negatives exist, which leads to out-of-bounds writes.',
  'Dropping stability by scanning forward during placement, which breaks radix-sort correctness on duplicates.',
  'Using counting sort when keys are sparse over a giant range instead of compressing keys first.',
  'Allocating an output array per pass in radix pipelines without reusing buffers, increasing memory pressure.',
]

const decisionGuidance = [
  'Small integer universe (k in the low thousands or less) and need stability: counting sort is ideal.',
  'Large but fixed-width keys: use radix sort, with counting sort as the digit-level stable sorter.',
  'Sparse keys in a wide range: compress to dense indices, then count; otherwise choose O(n log n) comparisons.',
  'Streaming with tight memory: avoid counting sort unless k is tiny or you can reuse shared buffers.',
  'Need stable grouping before aggregation: counting-sort-like histograms are a cheap pre-step.',
]

const advancedInsights = [
  {
    title: 'Key compression',
    detail:
      'When keys are sparse, map them to consecutive IDs via hashing or sorting unique keys once, then run counting sort on the compressed IDs to avoid huge k.',
  },
  {
    title: 'Cache-aware digit sizing',
    detail:
      'In radix pipelines, pick digit sizes so that count arrays fit in L1 or L2 cache (base 2^8 or 2^11 is common) to keep the O(n + k) promise in practice.',
  },
  {
    title: 'Parallel scans',
    detail:
      'Prefix sums parallelize well. Many-core and GPU implementations split the array into tiles, build local histograms, then merge via an exclusive scan.',
  },
  {
    title: 'Stability as a contract',
    detail:
      'Counting sort is often chosen not just for speed but to guarantee stable ordering before downstream operations. Preserve that property unless every consumer is under your control.',
  },
]

const takeaways = [
  'Counting sort trades comparisons for arithmetic, reaching O(n + k) when the key range is small.',
  'Stability comes from backward placement after prefix sums; it is essential for radix and grouping tasks.',
  'Memory scales with k, so compress keys or pivot to radix or comparison sorts when the universe is large.',
  'Cache-friendly counting and prefix phases make it fast in practice when k is tuned to fit cache.',
]

export default function CountingSortPage(): JSX.Element {
  return (
    <TopicLayout
      title="Counting Sort"
      subtitle="Histogram the keys, prefix the counts, place with stability"
      intro="Counting sort replaces comparisons with a histogram and a prefix sum. When keys fit in a modest integer range, it delivers stable O(n + k) performance and powers radix sorts and histogram-heavy pipelines."
    >
      <TopicSection heading="The big picture">
        <p className="text-white/80">
          Counting sort asks you to trade comparisons for arithmetic. One pass tallies how many times each key appears, a prefix
          sum converts tallies into positions, and a stable placement phase rebuilds the array in order. The approach shines when
          the key universe is small, and it underpins radix sort, histogram equalization, and bucketing stages in databases.
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

      <TopicSection heading="How it works: histogram to layout">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
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

      <TopicSection heading="Complexity analysis and practical intuition">
        <div className="grid gap-3 md:grid-cols-2">
          {complexityNotes.map((note) => (
            <article key={note.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h4 className="text-sm font-semibold text-white">{note.title}</h4>
              <p className="text-sm text-white/80">{note.detail}</p>
            </article>
          ))}
        </div>
        <p className="mt-3 text-sm text-white/70">
          Rule of thumb: if k is within a few thousand and you care about stability, counting sort will beat comparison sorts.
          If k approaches n or exceeds cache, switch to radix with smaller digits or fall back to O(n log n) algorithms.
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

      <TopicSection heading="Advanced insights and frontiers">
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
