import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


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

const problemPatterns = [
  {
    title: 'Coarse-to-fine search',
    detail:
      'If you can quickly skip across the space and then scan locally, jump search is a natural fit.',
  },
  {
    title: 'Block-aligned data',
    detail:
      'When data lives in fixed-size blocks (pages, cache lines), jumping by block size reduces random access.',
  },
  {
    title: 'Sorted ranges with cheap sequential scans',
    detail:
      'If sequential access is much cheaper than random access, a block scan can beat binary search.',
  },
]

const reasoningSteps = [
  {
    title: 'Confirm sorted order',
    detail:
      'Jump search relies on sorted data so you can stop early when the block end exceeds the target.',
  },
  {
    title: 'Choose a step size',
    detail:
      'Start with sqrt(n) as a safe default, then adjust if caches or pages suggest a better stride.',
  },
  {
    title: 'Find candidate block',
    detail:
      'Jump until the block end is >= target, then linearly scan within that block.',
  },
  {
    title: 'Validate early exit',
    detail:
      'If the target is outside [blockStart, blockEnd], return not found immediately.',
  },
]

const loopInvariants = [
  {
    title: 'Block invariant',
    detail:
      'Before each linear scan, the target can only be in the current block or later; all previous blocks are too small.',
  },
  {
    title: 'Sorted scan invariant',
    detail:
      'During the linear scan, if arr[i] > target, you can stop early because the rest of the block is larger.',
  },
  {
    title: 'Progress invariant',
    detail:
      'Each jump advances the block boundary by step, guaranteeing termination after at most n/step jumps.',
  },
]

const stepTrace = [
  {
    step: 'Start',
    state: 'arr = [1, 3, 7, 9, 12, 15, 18, 21, 24], target = 18',
    note: 'n = 9, step = floor(sqrt(9)) = 3.',
  },
  {
    step: 'Jump phase',
    state: 'Check arr[2] = 7 < 18 -> jump, arr[5] = 15 < 18 -> jump, arr[8] = 24 >= 18',
    note: 'Candidate block is indices 6..8.',
  },
  {
    step: 'Linear scan',
    state: 'Scan arr[6] = 18',
    note: 'Found the target at index 6.',
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

const performanceProfile = [
  {
    title: 'Best-case speed',
    detail:
      'If the target lands on a block boundary, the search ends after a few jumps.',
  },
  {
    title: 'Worst-case behavior',
    detail:
      'You do about sqrt(n) jumps plus sqrt(n) linear checks, giving O(sqrt(n)).',
  },
  {
    title: 'Access patterns',
    detail:
      'Jumping is sparse; scanning is contiguous. This can be friendlier than binary search on slow memory.',
  },
]

const comparisonTable = [
  {
    algorithm: 'Jump search',
    time: 'O(sqrt(n))',
    space: 'O(1)',
    sorted: 'Yes',
    notes: 'Simple, cache-friendly blocks; slower than binary search on CPU arrays.',
  },
  {
    algorithm: 'Binary search',
    time: 'O(log n)',
    space: 'O(1)',
    sorted: 'Yes',
    notes: 'Fast and reliable; random access pattern.',
  },
  {
    algorithm: 'Exponential search',
    time: 'O(log i)',
    space: 'O(1)',
    sorted: 'Yes',
    notes: 'Best when size is unknown or target is near front.',
  },
  {
    algorithm: 'Interpolation search',
    time: 'O(log log n) avg',
    space: 'O(1)',
    sorted: 'Yes',
    notes: 'Great on uniform data, but can degrade to O(n).',
  },
  {
    algorithm: 'Linear search',
    time: 'O(n)',
    space: 'O(1)',
    sorted: 'No',
    notes: 'Works on unsorted data; simplest but slowest.',
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

const thinkingShortcuts = [
  'If you can cheaply scan blocks, jump search can beat binary search on slow storage.',
  'If the data is in memory and comparisons are cheap, binary search usually wins.',
  'If you do repeated searches, build a jump table of block starts.',
  'If blocks are huge, reduce step size to avoid long scans.',
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

const implementationTips = [
  {
    title: 'Compute step once',
    detail:
      'Use a constant step for the whole search to keep bounds predictable.',
  },
  {
    title: 'Clamp block end',
    detail:
      'Always use min(step, n) - 1 when checking the block end.',
  },
  {
    title: 'Early exit in scan',
    detail:
      'Stop the scan when arr[i] > target to avoid useless comparisons.',
  },
  {
    title: 'Consider a jump table',
    detail:
      'Precomputing every k-th key gives a fast coarse index for repeated queries.',
  },
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
            <legend>How to think about similar problems</legend>
            <div className="win95-grid win95-grid-3">
              {problemPatterns.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Reasoning steps and invariants</legend>
            <div className="win95-grid win95-grid-2">
              {reasoningSteps.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-grid win95-grid-3">
              {loopInvariants.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Worked trace on a tiny array</legend>
            <div className="win95-stack">
              {stepTrace.map((item) => (
                <div key={item.step} className="win95-panel">
                  <div className="win95-heading">{item.step}</div>
                  <pre className="win95-code">
                    <code>{item.state}</code>
                  </pre>
                  <p className="win95-text">{item.note}</p>
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
            <legend>Performance profile</legend>
            <div className="win95-grid win95-grid-3">
              {performanceProfile.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Compare and contrast</legend>
            <div className="win95-panel">
              <table className="win95-table">
                <thead>
                  <tr>
                    <th>Algorithm</th>
                    <th>Time</th>
                    <th>Space</th>
                    <th>Sorted?</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonTable.map((row) => (
                    <tr key={row.algorithm}>
                      <td>{row.algorithm}</td>
                      <td>{row.time}</td>
                      <td>{row.space}</td>
                      <td>{row.sorted}</td>
                      <td>{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
            <legend>Thinking shortcuts</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {thinkingShortcuts.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Implementation tips</legend>
            <div className="win95-grid win95-grid-2">
              {implementationTips.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
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

