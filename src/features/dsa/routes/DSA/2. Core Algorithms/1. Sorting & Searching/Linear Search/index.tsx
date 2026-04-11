import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

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
    detail: 'Check items one by one until you find the target or reach the end.',
  },
  {
    title: 'Flashlight sweep',
    detail: 'Move a spotlight across the list; you either spot the target or finish the sweep.',
  },
  {
    title: 'Baseline comparator',
    detail: 'Linear search is the simplest reference point for judging other search methods.',
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
    detail: 'If n is tiny, the overhead of sorting or indexing outweighs any gains.',
  },
  {
    title: 'One-off lookups',
    detail: 'If you only search once, building a structure (hash table, tree) is wasteful.',
  },
  {
    title: 'Streaming or unknown size',
    detail: 'When data arrives in a stream, linear scan is often the only option.',
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
    detail: 'The loop ends either on a match or after examining all elements.',
  },
  {
    title: 'Correctness',
    detail: 'If the target exists, linear search eventually inspects that index and returns it.',
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
    detail: 'On average, you scan about n/2 elements if the target exists uniformly at random.',
  },
  {
    title: 'Space',
    detail: 'O(1) extra space; only a few counters are needed.',
  },
]

const performanceProfile = [
  {
    title: 'Cache friendliness',
    detail: 'Linear scans are sequential and cache friendly, which helps on modern CPUs.',
  },
  {
    title: 'Branch predictability',
    detail: 'The equality check is consistent; CPUs can predict the loop well for simple types.',
  },
  {
    title: 'Comparison cost',
    detail: 'If equality is expensive (large objects), linear search can become very slow.',
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
    detail: 'Configuration lists, small lookup tables, and UI options often use linear scans.',
  },
  {
    context: 'Filtering',
    detail: 'Searching for the first match in a list of predicates or rules is typically linear.',
  },
  {
    context: 'Streams',
    detail: 'Processing logs or events often requires scanning in order until a match appears.',
  },
  {
    context: 'Early exit checks',
    detail: 'Validating if any item matches a condition is naturally a linear scan.',
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
    explanation: 'A single loop checks each element. The first match returns immediately.',
  },
  {
    title: 'Search with custom predicate',
    code: `function findFirst<T>(items: T[], predicate: (x: T) => boolean): number {
  for (let i = 0; i < items.length; i += 1) {
    if (predicate(items[i])) return i;
  }
  return -1;
}`,
    explanation: 'Linear search generalizes naturally to any matching rule, not just equality.',
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
    explanation: 'If the array is sorted, you can stop once values exceed the target.',
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
    detail: 'Avoid loose comparisons to prevent accidental matches.',
  },
  {
    title: 'Short-circuit fast',
    detail: 'Return immediately on match; do not continue scanning.',
  },
  {
    title: 'Extract comparable keys',
    detail: 'When objects are large, compare on a precomputed key instead of deep equality.',
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

const quickGlossary = [
  {
    term: 'Linear search',
    definition:
      'A search strategy that inspects elements one by one until a match is found or input ends.',
  },
  {
    term: 'Early exit',
    definition: 'Returning immediately when a match is found, reducing average work.',
  },
  {
    term: 'Worst-case time',
    definition: 'O(n), when the target is at the end or not present.',
  },
  {
    term: 'Best-case time',
    definition: 'O(1), when the first element matches.',
  },
  {
    term: 'Scanned prefix invariant',
    definition:
      'Before checking index i, all earlier elements have already been proven not to match.',
  },
  {
    term: 'Sequential access',
    definition: 'Access pattern that reads items in order, typically cache-friendly.',
  },
  {
    term: 'Sentinel optimization',
    definition: 'A low-level technique that places a target sentinel to simplify bounds checks.',
  },
  {
    term: 'One-off lookup',
    definition: 'A single search where preprocessing/indexing overhead is often not worth it.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-history', label: 'Historical Context' },
    { id: 'bp-mental-models', label: 'Mental Models' },
    { id: 'bp-patterns', label: 'Problem Patterns' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-mechanics', label: 'How It Works' },
    { id: 'core-invariants', label: 'Loop Invariants' },
    { id: 'core-complexity', label: 'Complexity Analysis' },
    { id: 'core-performance', label: 'Performance Profile' },
    { id: 'core-compare', label: 'Compare and Contrast' },
    { id: 'core-applications', label: 'Real-World Applications' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-shortcuts', label: 'Thinking Shortcuts' },
    { id: 'core-implementation', label: 'Implementation Tips' },
    { id: 'core-decisions', label: 'When to Use It' },
    { id: 'core-advanced', label: 'Advanced Insights' },
  ],
  examples: [
    { id: 'ex-trace', label: 'Worked Trace' },
    { id: 'ex-code', label: 'Code Examples' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function LinearSearchPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Linear Search',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Linear Search"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Linear Search</h1>
      <p>
        Linear search is the most direct approach: check each item in order until you find a match
        or run out of elements. It is simple, works on unsorted data, and serves as the baseline for
        all other search methods.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            <p>
              Linear search trades performance for universality: no preprocessing, no memory
              overhead, and no ordering assumptions. When data is small or searched only once, that
              simplicity can beat more complex alternatives.
            </p>
          </section>
          <hr className="bin98-divider" />
          <section id="bp-history" className="bin98-section">
            <h2 className="bin98-heading">Historical Context</h2>
            {historicalMilestones.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="bp-mental-models" className="bin98-section">
            <h2 className="bin98-heading">Mental Models</h2>
            {mentalModels.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="bp-patterns" className="bin98-section">
            <h2 className="bin98-heading">Problem Patterns</h2>
            {problemPatterns.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="bp-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key Takeaways</h2>
            <ul>
              {takeaways.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {activeTab === 'core-concepts' && (
        <>
          <section id="core-mechanics" className="bin98-section">
            <h2 className="bin98-heading">How It Works</h2>
            {mechanics.map((item) => (
              <div key={item.heading}>
                <h3 className="bin98-subheading">{item.heading}</h3>
                <ul>
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
          <section id="core-invariants" className="bin98-section">
            <h2 className="bin98-heading">Loop Invariants</h2>
            {loopInvariants.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-complexity" className="bin98-section">
            <h2 className="bin98-heading">Complexity Analysis</h2>
            {complexityNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-performance" className="bin98-section">
            <h2 className="bin98-heading">Performance Profile</h2>
            {performanceProfile.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-compare" className="bin98-section">
            <h2 className="bin98-heading">Compare and Contrast</h2>
            <table>
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
          </section>
          <section id="core-applications" className="bin98-section">
            <h2 className="bin98-heading">Real-World Applications</h2>
            {realWorldUses.map((item) => (
              <p key={item.context}>
                <strong>{item.context}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-pitfalls" className="bin98-section">
            <h2 className="bin98-heading">Common Pitfalls</h2>
            <ul>
              {pitfalls.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section id="core-shortcuts" className="bin98-section">
            <h2 className="bin98-heading">Thinking Shortcuts</h2>
            <ul>
              {thinkingShortcuts.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section id="core-implementation" className="bin98-section">
            <h2 className="bin98-heading">Implementation Tips</h2>
            {implementationTips.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-decisions" className="bin98-section">
            <h2 className="bin98-heading">When to Use It</h2>
            <ol>
              {decisionGuidance.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>
          <section id="core-advanced" className="bin98-section">
            <h2 className="bin98-heading">Advanced Insights</h2>
            {advancedInsights.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
        </>
      )}

      {activeTab === 'examples' && (
        <>
          <section id="ex-trace" className="bin98-section">
            <h2 className="bin98-heading">Worked Trace</h2>
            {stepTrace.map((item) => (
              <div key={item.step}>
                <h3 className="bin98-subheading">{item.step}</h3>
                <p>{item.state}</p>
                <p>{item.note}</p>
              </div>
            ))}
          </section>
          <section id="ex-code" className="bin98-section">
            <h2 className="bin98-heading">Code Examples</h2>
            {examples.map((example) => (
              <div key={example.title}>
                <h3 className="bin98-subheading">{example.title}</h3>
                <div className="bin98-codebox">
                  <code>{example.code.trim()}</code>
                </div>
                <p>{example.explanation}</p>
              </div>
            ))}
          </section>
        </>
      )}

      {activeTab === 'glossary' && (
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {quickGlossary.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
