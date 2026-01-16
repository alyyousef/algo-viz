import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: 'Early programming staples',
    detail:
      'Linear scan is the first search strategy taught because it needs no ordering, indexes, or extra data structures.',
  },
  {
    title: 'Files and tapes era',
    detail:
      'Sequential access media made linear search the default; random access was expensive or impossible.',
  },
  {
    title: 'Still everywhere',
    detail:
      'Even with advanced indexes, a linear scan is the baseline in small arrays, filters, and many embedded routines.',
  },
]

const mentalModels = [
  {
    title: 'Read every card',
    detail:
      'Check items one by one until you find the target or reach the end.',
  },
  {
    title: 'Flashlight sweep',
    detail:
      'Move a spotlight across the list; you either spot the target or finish the sweep.',
  },
  {
    title: 'Baseline comparator',
    detail:
      'Linear search is the simplest reference point for judging other search methods.',
  },
]

const mechanics = [
  {
    heading: 'Core loop',
    bullets: [
      'Start at index 0 and compare each element to the target.',
      'If a match occurs, return the index immediately.',
      'If the end is reached, return -1 (or not found).',
    ],
  },
  {
    heading: 'Early exit',
    bullets: [
      'Stop as soon as the target appears; average time depends on where the target lies.',
      'If the target is absent, you scan the entire array.',
    ],
  },
  {
    heading: 'No prerequisites',
    bullets: [
      'Works on unsorted data and any data type with an equality check.',
      'No extra memory or preprocessing is required.',
    ],
  },
]

const problemPatterns = [
  {
    title: 'Small inputs',
    detail:
      'If n is tiny, the overhead of sorting or indexing outweighs any gains.',
  },
  {
    title: 'One-off lookups',
    detail:
      'If you only search once, building a structure (hash table, tree) is wasteful.',
  },
  {
    title: 'Streaming or unknown size',
    detail:
      'When data arrives in a stream, linear scan is often the only option.',
  },
]

const loopInvariants = [
  {
    title: 'Scanned prefix invariant',
    detail:
      'Before checking index i, all elements in a[0..i-1] are confirmed not to be the target.',
  },
  {
    title: 'Termination',
    detail:
      'The loop ends either on a match or after examining all elements.',
  },
  {
    title: 'Correctness',
    detail:
      'If the target exists, linear search eventually inspects that index and returns it.',
  },
]

const stepTrace = [
  {
    step: 'Start',
    state: 'a = [7, 2, 9, 4], target = 9',
    note: 'Check index 0: 7 != 9.',
  },
  {
    step: 'Continue',
    state: 'index 1 -> 2',
    note: 'Check index 1: 2 != 9. Check index 2: 9 == 9.',
  },
  {
    step: 'Return',
    state: 'return 2',
    note: 'Stop immediately once the target is found.',
  },
]

const complexityNotes = [
  {
    title: 'Time',
    detail:
      'Worst case O(n) when the target is absent or at the end; best case O(1) when it is at the front.',
  },
  {
    title: 'Average position',
    detail:
      'On average, you scan about n/2 elements if the target exists uniformly at random.',
  },
  {
    title: 'Space',
    detail: 'O(1) extra space; only a few counters are needed.',
  },
]

const performanceProfile = [
  {
    title: 'Cache friendliness',
    detail:
      'Linear scans are sequential and cache friendly, which helps on modern CPUs.',
  },
  {
    title: 'Branch predictability',
    detail:
      'The equality check is consistent; CPUs can predict the loop well for simple types.',
  },
  {
    title: 'Comparison cost',
    detail:
      'If equality is expensive (large objects), linear search can become very slow.',
  },
]

const comparisonTable = [
  {
    algorithm: 'Linear search',
    time: 'O(n)',
    space: 'O(1)',
    sorted: 'No',
    notes: 'Baseline; no preprocessing required.',
  },
  {
    algorithm: 'Binary search',
    time: 'O(log n)',
    space: 'O(1)',
    sorted: 'Yes',
    notes: 'Fast but requires sorted input.',
  },
  {
    algorithm: 'Jump search',
    time: 'O(sqrt(n))',
    space: 'O(1)',
    sorted: 'Yes',
    notes: 'Block-based; simple but still slower than binary.',
  },
  {
    algorithm: 'Interpolation search',
    time: 'O(log log n) avg',
    space: 'O(1)',
    sorted: 'Yes',
    notes: 'Great on uniform numeric data; can degrade to O(n).',
  },
  {
    algorithm: 'Hash lookup',
    time: 'O(1) avg',
    space: 'O(n)',
    sorted: 'No',
    notes: 'Fast but needs extra memory and hashing.',
  },
]

const realWorldUses = [
  {
    context: 'Tiny arrays',
    detail:
      'Configuration lists, small lookup tables, and UI options often use linear scans.',
  },
  {
    context: 'Filtering',
    detail:
      'Searching for the first match in a list of predicates or rules is typically linear.',
  },
  {
    context: 'Streams',
    detail:
      'Processing logs or events often requires scanning in order until a match appears.',
  },
  {
    context: 'Early exit checks',
    detail:
      'Validating if any item matches a condition is naturally a linear scan.',
  },
]

const examples = [
  {
    title: 'Linear search (TypeScript-like pseudocode)',
    code: `function linearSearch(a: number[], target: number): number {
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] === target) return i;
  }
  return -1;
}`,
    explanation:
      'A single loop checks each element. The first match returns immediately.',
  },
  {
    title: 'Search with custom predicate',
    code: `function findFirst<T>(items: T[], predicate: (x: T) => boolean): number {
  for (let i = 0; i < items.length; i += 1) {
    if (predicate(items[i])) return i;
  }
  return -1;
}`,
    explanation:
      'Linear search generalizes naturally to any matching rule, not just equality.',
  },
  {
    title: 'Early exit on sorted data',
    code: `function linearSearchSorted(a: number[], target: number): number {
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] === target) return i;
    if (a[i] > target) return -1;
  }
  return -1;
}`,
    explanation:
      'If the array is sorted, you can stop once values exceed the target.',
  },
]

const pitfalls = [
  'Assuming it is fast on large arrays; O(n) grows quickly.',
  'Using it when you should build an index for repeated queries.',
  'Forgetting early exit on sorted data can waste comparisons.',
  'Comparing large objects repeatedly without caching keys.',
]

const decisionGuidance = [
  'Need a simple, one-off lookup: linear search is ideal.',
  'Need repeated queries on large data: build a hash table or use binary search on sorted data.',
  'Need early exit on a predicate (any match): linear scan is the natural tool.',
  'Need guaranteed fast lookups: avoid linear search for big n.',
]

const thinkingShortcuts = [
  'If n < 50, linear search is often faster than complex alternatives.',
  'If you do multiple searches, the preprocessing cost may pay off.',
  'If data arrives in order and you only scan once, stick with linear.',
  'If comparisons are expensive, reduce them by caching keys or indexing.',
]

const implementationTips = [
  {
    title: 'Use strict equality',
    detail:
      'Avoid loose comparisons to prevent accidental matches.',
  },
  {
    title: 'Short-circuit fast',
    detail:
      'Return immediately on match; do not continue scanning.',
  },
  {
    title: 'Extract comparable keys',
    detail:
      'When objects are large, compare on a precomputed key instead of deep equality.',
  },
  {
    title: 'Consider sentinel loops',
    detail:
      'Adding a sentinel can remove bounds checks in low-level languages, but be careful with memory.',
  },
]

const advancedInsights = [
  {
    title: 'Sentinel optimization',
    detail:
      'Place the target as a sentinel at the end to remove bounds checks, then restore the original value.',
  },
  {
    title: 'Vectorized scans',
    detail:
      'SIMD can compare multiple elements at once, making linear search surprisingly fast on large arrays.',
  },
  {
    title: 'Branchless comparisons',
    detail:
      'Replacing branches with arithmetic masks can reduce branch mispredictions in tight loops.',
  },
  {
    title: 'Hybrid strategies',
    detail:
      'Many systems use linear search for tiny partitions and switch to faster algorithms for larger ranges.',
  },
]

const takeaways = [
  'Linear search is the simplest and most general search method.',
  'It requires no sorting or extra memory, but costs O(n) time.',
  'It is often best for tiny arrays, streams, or one-off checks.',
  'For large repeated queries, prefer indexed or logarithmic methods.',
]

export default function LinearSearchPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Linear Search</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Scan every element until the target appears</div>
              <p className="win95-text">
                Linear search is the most direct approach: check each item in order until you find a match or run out of elements.
                It is simple, works on unsorted data, and serves as the baseline for all other search methods.
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
                Linear search trades performance for universality: no preprocessing, no memory overhead, and no ordering assumptions.
                When data is small or searched only once, that simplicity can beat more complex alternatives.
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
            <div className="win95-grid win95-grid-3">
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
            <legend>Loop invariants (why it is correct)</legend>
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
            <legend>Complexity analysis</legend>
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
