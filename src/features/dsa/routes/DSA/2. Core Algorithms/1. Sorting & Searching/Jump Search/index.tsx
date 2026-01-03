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

.win95-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.win95-table th,
.win95-table td {
  border: 1px solid #808080;
  padding: 6px 6px 4px;
  text-align: left;
}

.win95-table th {
  font-weight: 700;
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
    title: 'Block search ideas in early indexing',
    detail:
      'Before modern caches, scanning in chunks reduced expensive disk seeks and tape operations. Jump search formalized this pattern on arrays.',
  },
  {
    title: 'Jump search popularized in teaching',
    detail:
      'It became a common step between linear and binary search to explain time-space tradeoffs and block-based reasoning.',
  },
  {
    title: 'Hybrid searching in practice',
    detail:
      'Many real systems use a coarse jump or index to find a region, then a tight linear scan for final selection.',
  },
  {
    title: 'Cache-aware variants',
    detail:
      'Choosing step sizes that align with cache lines or pages turns jump search into a lightweight cache-aware strategy.',
  },
]

const mentalModels = [
  {
    title: 'Skimming the table of contents',
    detail:
      'Jump search is like flipping through every k-th page, then reading the final section line by line.',
  },
  {
    title: 'Stepping stones',
    detail:
      'You hop forward in fixed strides until you overshoot the target, then walk back within the last block.',
  },
  {
    title: 'Two-phase scan',
    detail:
      'A fast coarse search narrows the region, followed by a local linear scan to finish.',
  },
]

const coreConcepts = [
  {
    heading: 'Sorted input required',
    bullets: [
      'Jump search assumes the array is sorted in non-decreasing order.',
      'If the data is unsorted, the method devolves to linear search.',
      'Sorting cost dominates if data is not already ordered.',
    ],
  },
  {
    heading: 'Choose a step size',
    bullets: [
      'Classic choice is step = floor(sqrt(n)).',
      'This balances jump count and linear scan length.',
      'Other sizes can be better if caches or pages dictate.',
    ],
  },
  {
    heading: 'Jump phase',
    bullets: [
      'Compare arr[min(step, n) - 1] to the target.',
      'Keep jumping by step until you find a block that may contain the target.',
      'If you jump past the end, the target is not present.',
    ],
  },
  {
    heading: 'Linear scan phase',
    bullets: [
      'Linearly scan from prev block start to block end.',
      'Stop early if the current value exceeds the target.',
      'Return index on match or -1 on failure.',
    ],
  },
  {
    heading: 'Why sqrt(n)',
    bullets: [
      'You do about n / step jumps and at most step linear checks.',
      'Total work is n / step + step, minimized at step = sqrt(n).',
      'This yields O(sqrt(n)) comparisons.',
    ],
  },
  {
    heading: 'When it wins',
    bullets: [
      'Works well when comparisons are cheap but random access is costly.',
      'Useful when you want a simple method better than linear search.',
      'For CPU arrays, binary search often wins; jump search is a teaching baseline.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Time cost',
    detail:
      'Worst-case O(sqrt(n)) comparisons. Best case is O(1) if the target is at the first block boundary.',
  },
  {
    title: 'Space cost',
    detail:
      'O(1) extra space. Only a few indices and counters are maintained.',
  },
  {
    title: 'Comparison count',
    detail:
      'Approximately sqrt(n) jumps plus up to sqrt(n) linear scans in the final block.',
  },
  {
    title: 'Prerequisites',
    detail:
      'The data must be sorted and accessible by index. Jump search is not suited for linked lists.',
  },
]

const realWorldUses = [
  {
    context: 'Block storage scans',
    detail:
      'Jumping by block size minimizes disk seeks, then a linear scan reads contiguous data.',
  },
  {
    context: 'Telemetry bins',
    detail:
      'Coarse jumps across sorted buckets reduce comparisons before a short local scan.',
  },
  {
    context: 'Cache-friendly lookups',
    detail:
      'Step sizes matching cache lines or pages can outperform pure binary search on large arrays.',
  },
  {
    context: 'Embedded systems',
    detail:
      'Simple loops and predictable memory access make jump search appealing in tight environments.',
  },
  {
    context: 'Teaching and analysis',
    detail:
      'Jump search illustrates how to trade extra structure for fewer comparisons.',
  },
  {
    context: 'Hybrid indexes',
    detail:
      'A coarse jump table plus local scan can form the core of a simple index strategy.',
  },
]

const examples = [
  {
    title: 'Jump search pseudocode',
    code: `function jumpSearch(arr, target):
    n = length(arr)
    step = floor(sqrt(n))
    prev = 0

    while prev < n and arr[min(step, n) - 1] < target:
        prev = step
        step += floor(sqrt(n))
        if prev >= n: return -1

    while prev < min(step, n) and arr[prev] < target:
        prev += 1

    if prev < n and arr[prev] == target: return prev
    return -1`,
    explanation:
      'Jump in fixed blocks until the block that could contain the target is found, then linearly scan that block.',
  },
  {
    title: 'Picking a custom step size',
    code: `// Choose a step based on cache lines
step = max(1, cacheLineBytes / elementBytes)
step = roundToPowerOfTwo(step)`,
    explanation:
      'If memory access dominates, align jumps to cache lines or pages to reduce misses.',
  },
  {
    title: 'Comparison with binary search',
    code: `Jump search: O(sqrt(n)) comparisons
Binary search: O(log n) comparisons
Linear search: O(n) comparisons`,
    explanation:
      'Jump search sits between linear and binary search. It is simpler than binary search but usually slower on CPU arrays.',
  },
]

const pitfalls = [
  'Applying jump search on unsorted data yields incorrect results.',
  'Using a step size of 0 or forgetting to recompute when n changes.',
  'Not checking array bounds when the last block is smaller than step.',
  'Assuming it beats binary search on modern CPU caches for all inputs.',
  'Stopping the linear scan too late and reading past the block end.',
]

const decisionGuidance = [
  'Need a simple improvement over linear search without recursion: use jump search.',
  'Need asymptotically fastest comparisons on arrays: prefer binary search.',
  'Need predictable linear access patterns on large memory pages: jump search can help.',
  'Data is not sorted or stored as a linked list: use linear search instead.',
  'Large datasets with slow random access: consider jump search or block indexes.',
]

const advancedInsights = [
  {
    title: 'Jump tables as a micro-index',
    detail:
      'Precompute the first element of each block so you can jump by table lookups before scanning locally.',
  },
  {
    title: 'Adaptive steps',
    detail:
      'If searches skew toward early elements, a smaller step can reduce average time at the expense of worst-case cost.',
  },
  {
    title: 'Cache-friendly scanning',
    detail:
      'Linear scans are efficient when they stay in cache. Jump search leverages this by scanning only one block.',
  },
  {
    title: 'Parallel block scan',
    detail:
      'On SIMD or GPUs, jump to candidate blocks and scan in parallel, reducing wall time even with the same asymptotic work.',
  },
]

const takeaways = [
  'Jump search is a two-phase strategy: jump by blocks, then scan locally.',
  'The classic step size is sqrt(n), balancing jumps and scans.',
  'It uses O(1) memory and is easy to implement in simple loops.',
  'Binary search is usually faster on CPU arrays, but jump search can be more cache friendly in some settings.',
  'Always require sorted input and correct block boundaries.',
]

export default function JumpSearchPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Jump Search</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Block-based search that bridges linear and binary methods</div>
              <p className="win95-text">
                Jump search works on sorted arrays by jumping ahead in fixed steps and then scanning within the final block.
                It keeps code simple, uses O(1) memory, and cuts comparisons from O(n) to O(sqrt(n)).
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
                Jump search is a two-phase algorithm: a coarse jump phase that locates a candidate block, and a linear scan
                phase that confirms the target inside that block. The classic step size is sqrt(n), which minimizes total work.
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
            <legend>How it works: structure and steps</legend>
            <div className="win95-grid win95-grid-3">
              {coreConcepts.map((block) => (
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
            <legend>Complexity analysis and tradeoffs</legend>
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
                Jump search is rarely faster than binary search on CPU arrays, but it is easier to implement, and its
                linear access patterns can be better for systems where random access is expensive.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Operation summary</legend>
            <div className="win95-panel">
              <table className="win95-table">
                <thead>
                  <tr>
                    <th>Operation</th>
                    <th>Time</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Jump phase</td>
                    <td>O(sqrt(n))</td>
                    <td>Check block endpoints until target range found.</td>
                  </tr>
                  <tr>
                    <td>Linear scan</td>
                    <td>O(sqrt(n))</td>
                    <td>Scan within a single block.</td>
                  </tr>
                  <tr>
                    <td>Total search</td>
                    <td>O(sqrt(n))</td>
                    <td>Best case O(1), worst case about 2 * sqrt(n) checks.</td>
                  </tr>
                  <tr>
                    <td>Extra space</td>
                    <td>O(1)</td>
                    <td>No additional arrays required.</td>
                  </tr>
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
