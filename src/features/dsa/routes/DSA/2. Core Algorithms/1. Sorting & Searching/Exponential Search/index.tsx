import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

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
    explanation: 'When size is unknown, guard out-of-range reads and treat them as an upper bound.',
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
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-mental-models', label: 'Mental Models' },
    { id: 'core-mechanics', label: 'How It Works' },
    { id: 'core-prerequisites', label: 'Prerequisites' },
    { id: 'core-trace', label: 'Worked Trace' },
    { id: 'core-complexity', label: 'Complexity' },
    { id: 'core-compare', label: 'Comparison Snapshot' },
    { id: 'core-applications', label: 'Real-World Applications' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-when-to-use', label: 'When to Use It' },
    { id: 'core-advanced', label: 'Advanced Insights' },
  ],
  examples: [{ id: 'ex-code', label: 'Code Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

const glossary = [
  {
    term: 'Bound discovery',
    definition: 'The doubling phase that finds a window likely to contain the target.',
  },
  {
    term: 'Search window',
    definition: 'The [left, right] range used for the binary search phase.',
  },
  {
    term: 'Galloping search',
    definition: 'A variant of exponential probing often used in merge algorithms.',
  },
  {
    term: 'Target index (i)',
    definition: 'Index of the sought value; complexity is often expressed as O(log i).',
  },
  {
    term: 'Safe accessor',
    definition: 'A guarded index read that handles out-of-range access in unknown-size settings.',
  },
]

export default function ExponentialSearchPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Exponential Search',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Exponential Search"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Exponential Search</h1>
      <p>
        Exponential search is a two-phase strategy for sorted data. It expands a search window by
        powers of two until the target is bracketed, then runs binary search inside that window. It
        shines when the size is unknown or when targets tend to be near the front.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            <p>
              Think of exponential search as binary search with a fast "find the fence" prelude. The
              prelude is cheap when the target is early and still bounded by log n when it is late,
              so worst-case performance stays logarithmic.
            </p>
            {complexityNotes.map((note) => (
              <p key={note.title}>
                <strong>{note.title}:</strong> {note.detail}
              </p>
            ))}
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
          <hr className="bin98-divider" />
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
          <section id="core-mental-models" className="bin98-section">
            <h2 className="bin98-heading">Mental Models</h2>
            {mentalModels.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-mechanics" className="bin98-section">
            <h2 className="bin98-heading">How It Works</h2>
            {mechanics.map((block) => (
              <div key={block.heading}>
                <h3 className="bin98-subheading">{block.heading}</h3>
                <ul>
                  {block.bullets.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
          <section id="core-prerequisites" className="bin98-section">
            <h2 className="bin98-heading">Prerequisites and Assumptions</h2>
            <ul>
              {prerequisites.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section id="core-trace" className="bin98-section">
            <h2 className="bin98-heading">Worked Trace</h2>
            {stepTrace.map((item) => (
              <div key={item.step}>
                <h3 className="bin98-subheading">{item.step}</h3>
                <p>
                  <strong>State:</strong> <code>{item.state}</code>
                </p>
                <p>{item.note}</p>
              </div>
            ))}
          </section>
          <section id="core-complexity" className="bin98-section">
            <h2 className="bin98-heading">Complexity Analysis and Intuition</h2>
            {complexityNotes.map((note) => (
              <p key={note.title}>
                <strong>{note.title}:</strong> {note.detail}
              </p>
            ))}
          </section>
          <section id="core-compare" className="bin98-section">
            <h2 className="bin98-heading">Comparison Snapshot</h2>
            {comparisonTable.map((row) => (
              <p key={row.algorithm}>
                <strong>{row.algorithm}:</strong> Sorted: {row.sorted}. Time: {row.time}. Needs n:{' '}
                {row.needsN}. {row.notes}
              </p>
            ))}
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
          <section id="core-when-to-use" className="bin98-section">
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
      )}

      {activeTab === 'glossary' && (
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {glossary.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
