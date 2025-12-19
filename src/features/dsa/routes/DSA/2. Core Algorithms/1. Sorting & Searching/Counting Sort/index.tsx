import { Link } from 'react-router-dom'

import type { JSX } from 'react'

const win95Styles = `
.win95-page {
  min-height: 100vh;
  background: #C0C0C0;
  padding: 0;
  color: #000;
  font-family: 'MS Sans Serif', 'Tahoma', sans-serif;
  -webkit-font-smoothing: none;
}

.win95-page * {
  box-sizing: border-box;
}

.win95-page a {
  color: #000;
  text-decoration: none;
}

.win95-page a:hover {
  text-decoration: underline;
}

.win95-page a:focus {
  outline: 1px dotted #000;
  outline-offset: 1px;
}

.win95-window {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  background: #C0C0C0;
  box-shadow: none;
  border-radius: 0;
}

.win95-titlebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #000080;
  color: #fff;
  padding: 4px 6px;
  font-weight: 700;
  font-size: 13px;
  line-height: 1;
}

.win95-title {
  display: inline-block;
}

.win95-title-controls {
  display: flex;
  gap: 4px;
}

.win95-control {
  width: 22px;
  height: 20px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  border-radius: 0;
  font-weight: 700;
  font-size: 12px;
  line-height: 1;
  padding: 0;
  cursor: pointer;
}

.win95-control:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-control:focus,
.win95-button:focus {
  outline: 1px dotted #000;
  outline-offset: -3px;
}

.win95-content {
  padding: 10px;
}

.win95-header-row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: flex-start;
  margin-bottom: 8px;
}

.win95-button {
  padding: 3px 10px 2px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  border-radius: 0;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  line-height: 1.2;
}

.win95-button:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-fieldset {
  border: 2px solid;
  border-color: #808080 #404040 #404040 #808080;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 0;
  background: #C0C0C0;
}

.win95-fieldset legend {
  padding: 0 6px;
  font-weight: 700;
  font-size: 12px;
}

.win95-grid {
  display: grid;
  gap: 6px;
}

.win95-grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.win95-grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
}

.win95-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 8px;
}

.win95-panel {
  border: 2px solid;
  border-color: #808080 #fff #fff #808080;
  background: #C0C0C0;
  padding: 8px;
  border-radius: 0;
}

.win95-panel--raised {
  border-color: #fff #404040 #404040 #fff;
}

.win95-heading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 4px;
}

.win95-subheading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 6px;
}

.win95-text {
  font-size: 12px;
  line-height: 1.35;
  margin: 0 0 6px;
}

.win95-stack {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.win95-list {
  margin: 0;
  padding-left: 18px;
  font-size: 12px;
  line-height: 1.35;
}

.win95-list li {
  margin-bottom: 4px;
}

.win95-list--numbered {
  list-style: decimal;
}

.win95-code {
  margin: 6px 0;
  background: #C0C0C0;
  color: #000;
  padding: 8px;
  font-family: 'Courier New', monospace;
  font-size: 11px;
  border: 2px solid;
  border-color: #404040 #fff #fff #404040;
  overflow-x: auto;
  border-radius: 0;
}
`

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
      'Counting sort is chosen not just for speed but to guarantee stable ordering before downstream operations. Preserve that property unless every consumer is under your control.',
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
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Counting Sort</span>
          <div className="win95-title-controls">
            <button className="win95-control" aria-label="Close window">
              X
            </button>
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
