import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: 'Binary search formalized (1940s-1960s)',
    detail:
      'Exponential search builds on binary search by adding a fast bounding phase to handle unknown or unbounded sizes.',
  },
  {
    title: 'Galloping search in merges (1990s)',
    detail:
      'Library merges introduced exponential probing to skip ahead when one run dominates, a close cousin of exponential search.',
  },
  {
    title: 'Unbounded arrays and indexed APIs',
    detail:
      'Search on paged files, memory-mapped data, or "infinite" sequences revived the need for fast bounds discovery.',
  },
]

const mentalModels = [
  {
    title: 'Expanding spotlight',
    detail:
      'Scan 1, 2, 4, 8... until the target is inside the lit area, then zoom in with binary search.',
  },
  {
    title: 'Find the fence first',
    detail:
      'You do not need the whole size. You only need a left and right fence that trap the target.',
  },
  {
    title: 'Two-phase search',
    detail:
      'Phase 1 grows a window exponentially. Phase 2 does a precise binary search inside that window.',
  },
]

const mechanics = [
  {
    heading: 'Phase 1: bound discovery',
    bullets: [
      'Check index 0 to handle the smallest case quickly.',
      'Start bound = 1 and double while bound < n and a[bound] < target.',
      'Stop when you pass the target or run past the array size.',
    ],
  },
  {
    heading: 'Phase 2: binary search',
    bullets: [
      'Left = floor(bound / 2); right = min(bound, n - 1).',
      'Run binary search inside [left, right].',
      'Return the index if found, else -1.',
    ],
  },
  {
    heading: 'Correctness intuition',
    bullets: [
      'By construction, a[left] < target <= a[right] (or right is end).',
      'Binary search is valid because the window is sorted.',
      'No element outside the window can be the target.',
    ],
  },
]

const prerequisites = [
  'Array must be sorted in non-decreasing order.',
  'Random access is required for probing and binary search.',
  'If n is unknown, you need safe out-of-range checks or a sentinel API.',
]

const stepTrace = [
  {
    step: 'Start',
    state: 'a = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33], target = 24',
    note: 'Check index 0 first: a[0] = 3, not equal.',
  },
  {
    step: 'Expand bounds',
    state: 'bound = 1 -> 2 -> 4 -> 8',
    note: 'Values at 1,2,4 are < 24. At 8 we see 27, which stops the expansion.',
  },
  {
    step: 'Binary search window',
    state: 'left = 4, right = 8',
    note: 'Binary search in [4..8] finds 24 at index 7.',
  },
]

const complexityNotes = [
  {
    title: 'Time',
    detail:
      'O(log i) to find the bound and O(log i) to binary search it, where i is the target index. Worst case is O(log n).',
  },
  {
    title: 'Space',
    detail: 'O(1) extra space. No additional buffers are needed.',
  },
  {
    title: 'Why it can beat binary search',
    detail:
      'If the target is near the front, the bound phase ends quickly and the search window is tiny.',
  },
]

const comparisonTable = [
  {
    algorithm: 'Linear search',
    sorted: 'No',
    time: 'O(n)',
    needsN: 'No',
    notes: 'Best for tiny arrays or unsorted data.',
  },
  {
    algorithm: 'Binary search',
    sorted: 'Yes',
    time: 'O(log n)',
    needsN: 'Yes',
    notes: 'Fast when size is known; no bound discovery.',
  },
  {
    algorithm: 'Jump search',
    sorted: 'Yes',
    time: 'O(sqrt(n))',
    needsN: 'Yes',
    notes: 'Fixed step size; slower than binary for large n.',
  },
  {
    algorithm: 'Interpolation search',
    sorted: 'Yes',
    time: 'O(log log n) avg',
    needsN: 'Yes',
    notes: 'Needs near-uniform distribution; can degrade to O(n).',
  },
  {
    algorithm: 'Exponential search',
    sorted: 'Yes',
    time: 'O(log i)',
    needsN: 'No',
    notes: 'Best when size is unknown or target is near front.',
  },
]

const realWorldUses = [
  {
    context: 'Unknown-size arrays',
    detail:
      'Search inside data structures where size is unknown or expensive to query, such as virtual arrays or external indexes.',
  },
  {
    context: 'Paged files and memory-mapped data',
    detail:
      'Find a small window quickly to reduce page faults and disk reads before doing binary search.',
  },
  {
    context: 'Galloping in merges',
    detail:
      'TimSort-style merges use exponential probing to skip ahead when one run wins repeatedly.',
  },
  {
    context: 'Streaming or append-only logs',
    detail:
      'If you can access by index but the data grows, exponential search gives fast bounds without a fresh size lookup.',
  },
]

const examples = [
  {
    title: 'Exponential search (TypeScript-like pseudocode)',
    code: `function exponentialSearch(a: number[], target: number): number {
  if (a.length === 0) return -1;
  if (a[0] === target) return 0;

  let bound = 1;
  while (bound < a.length && a[bound] < target) {
    bound *= 2;
  }

  const left = Math.floor(bound / 2);
  const right = Math.min(bound, a.length - 1);
  return binarySearch(a, target, left, right);
}

function binarySearch(a: number[], target: number, left: number, right: number): number {
  let lo = left;
  let hi = right;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (a[mid] === target) return mid;
    if (a[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}`,
    explanation:
      'The bound phase traps the target between left and right. Binary search finishes inside that window.',
  },
  {
    title: 'Safe accessor for unknown size',
    code: `function getValue(a: number[], index: number): number | null {
  return index >= 0 && index < a.length ? a[index] : null;
}

function exponentialSearchUnknown(a: number[], target: number): number {
  if (getValue(a, 0) === target) return 0;
  let bound = 1;
  while (true) {
    const value = getValue(a, bound);
    if (value === null || value >= target) break;
    bound *= 2;
  }
  const left = Math.floor(bound / 2);
  const right = Math.min(bound, a.length - 1);
  return binarySearch(a, target, left, right);
}`,
    explanation:
      'When size is unknown, guard out-of-range reads and treat them as an upper bound.',
  },
]

const pitfalls = [
  'Skipping the a[0] check can miss a match at index 0.',
  'Using a[bound] <= target in the expansion loop can skip a direct hit.',
  'Failing to clamp right to n - 1 causes out-of-range access.',
  'Applying the algorithm to unsorted data invalidates both phases.',
]

const decisionGuidance = [
  'Need to search a sorted structure with unknown length: exponential search is a strong default.',
  'Targets tend to be near the front: exponential search usually beats binary search.',
  'Known length and random access: plain binary search is simpler and equally optimal.',
  'Data is unsorted or not random-access: use linear search or a different index.',
]

const advancedInsights = [
  {
    title: 'Window size is always tight',
    detail:
      'The window size is at most 2i, so the binary phase never grows beyond a small multiple of the target index.',
  },
  {
    title: 'Doubling is cache-friendly',
    detail:
      'Probing powers of two is predictable and can be optimized by prefetching in low-level implementations.',
  },
  {
    title: 'Batching searches',
    detail:
      'If you search many targets, keep the last bound and reuse it as the next starting point for nearby queries.',
  },
  {
    title: 'Galloping merge reuse',
    detail:
      'The same bound-then-binary idea appears in high-performance merges to skip long streaks quickly.',
  },
]

const takeaways = [
  'Exponential search adds a fast bounding phase to binary search.',
  'It is ideal for unknown-size data and early targets.',
  'Worst-case time matches binary search, but best-case often wins.',
  'Correctness relies on sorted input and careful bound handling.',
]

export default function ExponentialSearchPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Exponential Search</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Find a bound fast, then binary search the window</div>
              <p className="win95-text">
                Exponential search is a two-phase strategy for sorted data. It expands a search window by powers of two until the target
                is bracketed, then runs binary search inside that window. It shines when the size is unknown or when targets tend to be
                near the front.
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
                Think of exponential search as binary search with a fast "find the fence" prelude. The prelude is cheap when the target
                is early and still bounded by log n when it is late, so worst-case performance stays logarithmic.
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
            <legend>How it works: step-by-step</legend>
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
            <legend>Prerequisites and assumptions</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {prerequisites.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Worked trace</legend>
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
            <legend>Complexity analysis and intuition</legend>
            <div className="win95-grid win95-grid-2">
              {complexityNotes.map((note) => (
                <div key={note.title} className="win95-panel">
                  <div className="win95-heading">{note.title}</div>
                  <p className="win95-text">{note.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Comparison snapshot</legend>
            <div className="win95-panel">
              <table className="win95-table">
                <thead>
                  <tr>
                    <th>Algorithm</th>
                    <th>Sorted?</th>
                    <th>Time</th>
                    <th>Needs n?</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonTable.map((row) => (
                    <tr key={row.algorithm}>
                      <td>{row.algorithm}</td>
                      <td>{row.sorted}</td>
                      <td>{row.time}</td>
                      <td>{row.needsN}</td>
                      <td>{row.notes}</td>
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
