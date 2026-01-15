import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

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
      "Every element jumps directly to its final neighborhood based on its key's prefix sum, skipping pairwise comparisons entirely.",
  },
]

const terminology = [
  {
    term: 'Key universe (k)',
    detail:
      'The number of distinct key values the input can take, typically maxKey - minKey + 1.',
  },
  {
    term: 'Histogram',
    detail:
      'The array of counts for each key value.',
  },
  {
    term: 'Prefix sum',
    detail:
      'Cumulative counts; used to compute final positions for stable placement.',
  },
  {
    term: 'Stable placement',
    detail:
      'Writing elements in reverse input order so equal keys retain their order.',
  },
  {
    term: 'Key compression',
    detail:
      'Mapping sparse keys to a dense range 0..m-1 before counting.',
  },
]

const stepByStep = [
  {
    title: 'Find key range',
    detail:
      'Scan once to find minKey and maxKey so you can size the count array.',
  },
  {
    title: 'Build histogram',
    detail:
      'Count each key into count[key - minKey].',
  },
  {
    title: 'Prefix transform',
    detail:
      'Convert counts into exclusive end positions by accumulating counts.',
  },
  {
    title: 'Stable placement',
    detail:
      'Scan input from right to left; place and decrement each key position.',
  },
  {
    title: 'Return output',
    detail:
      'Output array is sorted; optionally copy back if in-place is required.',
  },
]

const invariants = [
  {
    title: 'Count correctness',
    detail:
      'After counting, sum(count) equals n and each count[i] matches key frequency.',
  },
  {
    title: 'Prefix semantics',
    detail:
      'After prefix sums, count[i] equals the exclusive end index for key i.',
  },
  {
    title: 'Stability',
    detail:
      'Reverse placement preserves relative order of equal keys.',
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

const performanceNotes = [
  {
    title: 'When k is small',
    detail:
      'Counting sort is fast and cache-friendly. The cost is dominated by linear scans.',
  },
  {
    title: 'When k is large',
    detail:
      'Count array becomes the bottleneck. Consider radix or compression.',
  },
  {
    title: 'Memory reuse',
    detail:
      'Reuse count/output buffers across passes to reduce allocations.',
  },
  {
    title: 'Branch predictability',
    detail:
      'The algorithm is branch-light, often faster than comparison sorts on small integer ranges.',
  },
]

const comparisonGrid = [
  {
    feature: 'Best case',
    counting: 'O(n + k)',
    quick: 'O(n log n)',
    merge: 'O(n log n)',
    radix: 'O(d * (n + k))',
  },
  {
    feature: 'Worst case',
    counting: 'O(n + k)',
    quick: 'O(n^2)',
    merge: 'O(n log n)',
    radix: 'O(d * (n + k))',
  },
  {
    feature: 'Stable',
    counting: 'Yes',
    quick: 'No',
    merge: 'Yes',
    radix: 'Yes (with stable digit sort)',
  },
  {
    feature: 'Extra space',
    counting: 'O(n + k)',
    quick: 'O(log n) stack',
    merge: 'O(n)',
    radix: 'O(n + k)',
  },
  {
    feature: 'Needs small key range',
    counting: 'Yes',
    quick: 'No',
    merge: 'No',
    radix: 'Yes (per digit)',
  },
]

const rangeTuning = [
  {
    title: 'Negative keys',
    detail:
      'Offset by minKey so array indices start at 0.',
  },
  {
    title: 'Sparse keys',
    detail:
      'Compress keys to a dense range via sorting unique keys.',
  },
  {
    title: 'Large keys',
    detail:
      'Use radix sort with a small base to keep k manageable per digit.',
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

const realWorldPatterns = [
  {
    title: 'Event bucketing',
    detail:
      'Group events by small integer categories before aggregation.',
  },
  {
    title: 'Age or score bands',
    detail:
      'Sort records by bounded numeric fields (0-120, 0-1000).',
  },
  {
    title: 'Telemetry histograms',
    detail:
      'Counting and prefix sums feed percentile estimates and dashboards.',
  },
  {
    title: 'GPU pre-sorting',
    detail:
      'Fast histogram + prefix sums partition data for parallel pipelines.',
  },
]

const realWorldUses = [
  {
    context: 'Radix sort digit passes',
    detail:
      'Counting sort is the stable inner loop on each digit for LSD radix sorts on integers, IPv4 addresses, or fixed-width strings.',
  },
  {
    context: 'Image processing histograms',
    detail:
      'Operations like histogram equalization or bucketizing pixel intensities compute counts and prefix sums, effectively running counting-sort primitives.',
  },
  {
    context: 'Database and log bucketing',
    detail:
      'When grouping by small categorical IDs (months 0-11, status codes, grade bands), counting-sort logic bins rows before more expensive aggregation.',
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
  {
    title: 'Counting with key compression',
    code: `function countingSortCompressed(arr):
    keys = sort(unique(arr))
    index = map key -> rank in keys
    count = Array(keys.length).fill(0)
    out = Array(arr.length)
    for x in arr: count[index[x]] += 1
    for i in 1..count.length-1: count[i] += count[i-1]
    for i from arr.length-1 down to 0:
        k = index[arr[i]]
        count[k] -= 1
        out[count[k]] = arr[i]
    return out`,
    explanation:
      'Compression keeps k small even when keys are large or sparse, while preserving stability.',
  },
  {
    title: 'Histogram-only use (no sort)',
    code: `// Count frequencies, skip placement
count = Array(k).fill(0)
for x in arr: count[x - minKey] += 1
// count now answers frequency queries and supports percentiles`,
    explanation:
      'Sometimes the histogram itself is the goal; sorting is optional.',
  },
]

const pitfalls = [
  'Letting k explode: if maxKey - minKey is large, the count array dominates memory and runtime.',
  'Forgetting the minKey offset when negatives exist, which leads to out-of-bounds writes.',
  'Dropping stability by scanning forward during placement, which breaks radix-sort correctness on duplicates.',
  'Using counting sort when keys are sparse over a giant range instead of compressing keys first.',
  'Allocating an output array per pass in radix pipelines without reusing buffers, increasing memory pressure.',
  'Using a non-stable variant in radix pipelines breaks digit ordering.',
  'Skipping min/max detection can waste memory if k is large.',
]

const testingChecklist = [
  'Arrays with negative numbers to verify minKey offset.',
  'Arrays with all identical keys to verify stability.',
  'Sparse keys with large gaps to test compression.',
  'Large n with small k to validate O(n + k) scaling.',
  'Random inputs compared against a reference sort.',
]

const decisionGuidance = [
  'Small integer universe (k in the low thousands or less) and need stability: counting sort is ideal.',
  'Large but fixed-width keys: use radix sort, with counting sort as the digit-level stable sorter.',
  'Sparse keys in a wide range: compress to dense indices, then count; otherwise choose O(n log n) comparisons.',
  'Streaming with tight memory: avoid counting sort unless k is tiny or you can reuse shared buffers.',
  'Need stable grouping before aggregation: counting-sort-like histograms are a cheap pre-step.',
  'Need to sort objects by small integer key: counting sort plus stable placement is ideal.',
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
      'Counting sort is chosen not just for speed but to guarantee stable ordering before downstream operations. Preserve that property unless every consumer is under your control.',
  },
  {
    title: 'In-place variants are tricky',
    detail:
      'In-place counting sorts exist but are complex and usually unstable. The extra buffer is the common trade-off.',
  },
  {
    title: 'Hybrid with comparison sorts',
    detail:
      'If k grows too large at runtime, fall back to quicksort or merge sort based on memory and stability needs.',
  },
]

const practiceIdeas = [
  'Implement counting sort for objects with a small integer key.',
  'Swap between counting and radix based on k threshold.',
  'Build a histogram and compute percentiles from prefix sums.',
  'Compare stability by sorting pairs (key, originalIndex).',
]

const takeaways = [
  'Counting sort trades comparisons for arithmetic, reaching O(n + k) when the key range is small.',
  'Stability comes from backward placement after prefix sums; it is essential for radix and grouping tasks.',
  'Memory scales with k, so compress keys or pivot to radix or comparison sorts when the universe is large.',
  'Cache-friendly counting and prefix phases make it fast in practice when k is tuned to fit cache.',
]

export default function CountingSortPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Counting Sort</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Histogram the keys, prefix the counts, place with stability</div>
              <p className="win95-text">
                Counting sort replaces comparisons with a histogram and a prefix sum. When keys fit a modest integer range, it
                delivers stable O(n + k) performance and powers radix sorts and histogram-heavy pipelines.
              </p>
            </div>
            <Link to="/algoViz" className="win95-button" role="button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-fieldset">
            <legend>The big picture</legend>
            <div className="win95-panel">
              <p className="win95-text">
                Counting sort asks you to trade comparisons for arithmetic. One pass tallies how many times each key appears, a
                prefix sum converts tallies into positions, and a stable placement phase rebuilds the array in order. The approach
                shines when the key universe is small, and it underpins radix sort, histogram equalization, and bucketing stages in
                databases.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Historical context</legend>
            <div className="win95-grid win95-grid-2">
              {historicalMilestones.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Core concept and mental models</legend>
            <div className="win95-grid win95-grid-2">
              {mentalModels.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Terminology and invariants</legend>
            <div className="win95-grid win95-grid-2">
              {terminology.map((item) => (
                <div key={item.term} className="win95-panel">
                  <div className="win95-heading">{item.term}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-grid win95-grid-2">
              {invariants.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Step-by-step technique</legend>
            <div className="win95-grid win95-grid-2">
              {stepByStep.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works: histogram to layout</legend>
            <div className="win95-grid win95-grid-3">
              {mechanics.map((block) => (
                <div key={block.heading} className="win95-panel">
                  <div className="win95-heading">{block.heading}</div>
                  <ul className="win95-list">
                    {block.bullets.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Range and key tuning</legend>
            <div className="win95-grid win95-grid-2">
              {rangeTuning.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity analysis and practical intuition</legend>
            <div className="win95-grid win95-grid-2">
              {complexityNotes.map((note) => (
                <div key={note.title} className="win95-panel">
                  <div className="win95-heading">{note.title}</div>
                  <p className="win95-text">{note.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                Rule of thumb: if k is within a few thousand and you care about stability, counting sort will beat comparison
                sorts. If k approaches n or exceeds cache, switch to radix with smaller digits or fall back to O(n log n)
                algorithms.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Performance notes</legend>
            <div className="win95-grid win95-grid-2">
              {performanceNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Counting sort vs alternatives</legend>
            <div className="win95-panel">
              <table className="win95-table">
                <thead>
                  <tr>
                    <th>Dimension</th>
                    <th>Counting</th>
                    <th>Quick</th>
                    <th>Merge</th>
                    <th>Radix</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonGrid.map((row) => (
                    <tr key={row.feature}>
                      <td>{row.feature}</td>
                      <td>{row.counting}</td>
                      <td>{row.quick}</td>
                      <td>{row.merge}</td>
                      <td>{row.radix}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Real-world applications</legend>
            <div className="win95-grid win95-grid-2">
              {realWorldUses.map((item) => (
                <div key={item.context} className="win95-panel">
                  <div className="win95-heading">{item.context}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Use cases in practice</legend>
            <div className="win95-grid win95-grid-2">
              {realWorldPatterns.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Practical examples</legend>
            <div className="win95-stack">
              {examples.map((example) => (
                <div key={example.title} className="win95-panel">
                  <div className="win95-heading">{example.title}</div>
                  <pre className="win95-code">
                    <code>{example.code}</code>
                  </pre>
                  <p className="win95-text">{example.explanation}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Common pitfalls</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {pitfalls.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Testing checklist</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {testingChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>When to use it</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                {decisionGuidance.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Practice and build ideas</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {practiceIdeas.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Advanced insights</legend>
            <div className="win95-grid win95-grid-2">
              {advancedInsights.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Key takeaways</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {takeaways.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}

