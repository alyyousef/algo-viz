import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

const historicalNotes = [
  {
    title: '1945, John von Neumann proposes merge sort',
    detail:
      'Designed for early computers with sequential storage, merge sort fit tape drives where random access was expensive but linear scans were cheap.',
  },
  {
    title: '1968, Knuth formalizes the analysis',
    detail:
      'The Art of Computer Programming Volume 3 recorded merge sort as a canonical stable sort with tight O(n log n) bounds and practical external variants.',
  },
  {
    title: '1970s, database and tape sorting',
    detail:
      'External merge sort became the backbone of tape and disk sorting, influencing database merge joins and batch processing pipelines.',
  },
  {
    title: '2002, Tim Peters crafts Timsort',
    detail:
      'Python adopted a hybrid merge-based sort that detects natural runs and gallops through data, later adopted by Java and Android.',
  },
]

const mentalModels = [
  {
    title: 'Two conveyor belts',
    detail:
      'Picture two belts of sorted boxes feeding a single chute. You always take the smaller front box to keep the outgoing stream sorted.',
  },
  {
    title: 'Tournament brackets',
    detail:
      'Subarrays compete pairwise, producing winners that advance to the next merge round. Each level halves the number of contenders until one sorted champion remains.',
  },
  {
    title: 'Band rehearsal',
    detail:
      'Each section (subarray) practices alone to stay in tune, then sections merge in time until the full orchestra is synchronized in order.',
  },
]

const mechanics = [
  {
    heading: 'Divide phase',
    bullets: [
      'Split the array at the midpoint into left and right halves until each segment has length 1.',
      'Recursion depth is O(log n), and each level covers all elements exactly once.',
    ],
  },
  {
    heading: 'Merge phase',
    bullets: [
      'Maintain two pointers, one per half. Repeatedly pick the smaller element to append to the output buffer.',
      'When a half is exhausted, append the remaining items from the other half; they are already sorted.',
      'Copy the merged buffer back into the original segment to preserve global order.',
    ],
  },
  {
    heading: 'Stable behavior',
    bullets: [
      'Ties are resolved by taking from the left half first, so equal elements retain their original ordering.',
      'Stability is why merge sort underpins language library sorts where predictable ordering matters.',
    ],
  },
]

const problemPatterns = [
  {
    title: 'Stable ordering required',
    detail:
      'If equal keys must keep their original order (e.g., sorting by secondary fields), merge sort is a safe default.',
  },
  {
    title: 'Large data, sequential access',
    detail:
      'When random access is expensive (disk, tape, network streams), merge sort uses sequential scans efficiently.',
  },
  {
    title: 'Linked structures',
    detail:
      'Linked lists lack random access; merge sort preserves O(n log n) time with pointer relinking.',
  },
]

const loopInvariants = [
  {
    title: 'Sorted halves invariant',
    detail: 'Before each merge, the left and right halves are already sorted.',
  },
  {
    title: 'Merge buffer invariant',
    detail:
      'At any point during merge, the buffer contains the smallest elements seen so far in sorted order.',
  },
  {
    title: 'Stability invariant',
    detail:
      'When keys are equal, elements from the left half are emitted first, preserving original ordering.',
  },
]

const stepTrace = [
  {
    step: 'Split',
    state: '[8, 3, 7, 4, 2, 6] -> [8, 3, 7] | [4, 2, 6]',
    note: 'Recursively split into halves until singletons.',
  },
  {
    step: 'Sort halves',
    state: '[8, 3, 7] -> [3, 7, 8], [4, 2, 6] -> [2, 4, 6]',
    note: 'Each half becomes sorted independently.',
  },
  {
    step: 'Merge',
    state: '[3, 7, 8] + [2, 4, 6] -> [2, 3, 4, 6, 7, 8]',
    note: 'Pick the smaller head each time until one side empties.',
  },
]

const complexityNotes = [
  {
    title: 'Time complexity',
    detail:
      'Every level of the recursion tree processes n elements, and there are log2 n levels. Total time is O(n log n) regardless of input order.',
  },
  {
    title: 'Space complexity',
    detail:
      'The classic array implementation needs O(n) auxiliary space for the merge buffer. Linked list versions can achieve O(1) extra space by relinking nodes.',
  },
  {
    title: 'Cache and bandwidth',
    detail:
      'Merge sort reads and writes sequentially, which plays well with disks and memory bandwidth. Cache locality is good for the merge buffer but can lag quicksort on in-place arrays.',
  },
  {
    title: 'Stability and determinism',
    detail:
      'Stable by design and free from pivot pathologies. Worst-case behavior matches average-case behavior, a reason databases rely on it.',
  },
]

const performanceProfile = [
  {
    title: 'Sequential access',
    detail:
      'Reads and writes are mostly sequential, which is ideal for disks, SSDs, and large memory scans.',
  },
  {
    title: 'Predictable runtime',
    detail: 'Always O(n log n), avoiding worst-case spikes seen in naive quicksort.',
  },
  {
    title: 'Memory bandwidth',
    detail:
      'The merge buffer doubles memory traffic, which can bottleneck in memory-bound workloads.',
  },
]

const comparisonTable = [
  {
    algorithm: 'Merge sort',
    time: 'O(n log n)',
    space: 'O(n)',
    stable: 'Yes',
    notes: 'Reliable, stable, great for sequential access.',
  },
  {
    algorithm: 'Quick sort',
    time: 'O(n log n) avg',
    space: 'O(log n)',
    stable: 'No',
    notes: 'Fast on arrays, but worst case can be O(n^2).',
  },
  {
    algorithm: 'Heap sort',
    time: 'O(n log n)',
    space: 'O(1)',
    stable: 'No',
    notes: 'In-place with good worst-case bounds, but cache unfriendly.',
  },
  {
    algorithm: 'TimSort',
    time: 'O(n log n)',
    space: 'O(n)',
    stable: 'Yes',
    notes: 'Adaptive on real-world runs; used by many standard libraries.',
  },
  {
    algorithm: 'Insertion sort',
    time: 'O(n^2)',
    space: 'O(1)',
    stable: 'Yes',
    notes: 'Great for tiny arrays; often used as a merge base case.',
  },
]

const applications = [
  {
    context: 'Standard library defaults',
    detail:
      'Python, Java, and Android collections lean on Timsort, a merge-based stable algorithm tuned for real-world runs and partly sorted data.',
  },
  {
    context: 'External sorting and ETL',
    detail:
      'Sorting terabyte-scale logs uses external merge sort: produce sorted runs that fit in memory or on SSD, then k-way merge them from disk.',
  },
  {
    context: 'Databases and merge joins',
    detail:
      'Merge sort aligns with merge join operators. Sorted relations let databases join in linear time relative to input sizes.',
  },
  {
    context: 'Linked list ordering',
    detail:
      'Without random access, quicksort and heapsort stumble. Merge sort on linked lists stays O(n log n) and stable with no extra buffer.',
  },
]

const variantsAndTweaks = [
  {
    title: 'Bottom-up merge sort',
    detail: 'Iteratively merge runs of size 1, 2, 4, ... to avoid recursion depth limits.',
  },
  {
    title: 'Natural runs',
    detail:
      'Detect already-sorted stretches and merge them, reducing work on partially sorted data.',
  },
  {
    title: 'In-place merge variants',
    detail:
      'Algorithms exist to reduce buffer size, but they are complex and often slower in practice.',
  },
  {
    title: 'K-way merge',
    detail: 'Merge more than two runs at once using a min-heap; essential for external sorting.',
  },
]

const codeExamples = [
  {
    title: 'Classic merge sort (TypeScript-like pseudocode)',
    code: `function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr
  const mid = Math.floor(arr.length / 2)
  const left = mergeSort(arr.slice(0, mid))
  const right = mergeSort(arr.slice(mid))
  return merge(left, right)
}

function merge(a: number[], b: number[]): number[] {
  const out: number[] = []
  let i = 0, j = 0
  while (i < a.length && j < b.length) {
    if (a[i] <= b[j]) out.push(a[i++])
    else out.push(b[j++])
  }
  // append any leftovers
  while (i < a.length) out.push(a[i++])
  while (j < b.length) out.push(b[j++])
  return out
}`,
    explanation:
      'Left-first tie handling preserves stability. Slicing simplifies the exposition; production code prefers a shared buffer to avoid repeated allocations.',
  },
  {
    title: 'External merge: k-way merge of sorted runs',
    code: `function mergeRuns(runs: Array<Iterator<number>>): number[] {
  // Min-heap of { value, fromRun }
  const heap: Array<{ v: number, r: number }> = []
  const next = (r: number) => {
    const iter = runs[r]
    const { value, done } = iter.next()
    if (!done) pushHeap(heap, { v: value, r })
  }
  // seed heap
  for (let r = 0; r < runs.length; r++) next(r)
  const out: number[] = []
  while (heap.length) {
    const { v, r } = popMin(heap)
    out.push(v)
    next(r) // refill from the run that lost an element
  }
  return out
}`,
    explanation:
      'External sort reads multiple pre-sorted runs from disk and merges them with a min-heap of run heads. The heap keeps the next smallest item across all runs in O(log k) per output element.',
  },
]

const pitfalls = [
  'Forgetting to copy merged data back into the source segment leaves parent calls with stale ordering.',
  'Allocating a fresh buffer at every recursion level inflates space to O(n log n). Reuse one buffer per call stack level instead.',
  'Off-by-one midpoints can skip elements or double-count them. Use mid = floor((l + r) / 2) and careful boundaries.',
  'Recursion depth can overflow on very large inputs in constrained environments; iterative bottom-up merges avoid this.',
  'Assuming merge sort is always faster because of stability. On tiny arrays insertion sort beats it; hybrids switch for small sizes.',
]

const decisionGuidance = [
  'Need stability and predictable O(n log n) time: choose merge sort or Timsort.',
  'Sorting linked lists: prefer merge sort to avoid random access and preserve stability.',
  'Sorting data larger than memory: external merge sort is the default approach.',
  'Memory is tight and stability is optional: quicksort or heapsort may be better.',
  'Real-world partially sorted data: use Timsort or a merge hybrid that exploits natural runs.',
]

const implementationTips = [
  {
    title: 'Reuse a single buffer',
    detail:
      'Allocate one auxiliary array and reuse it across merges to avoid O(n log n) allocations.',
  },
  {
    title: 'Cut over to insertion sort',
    detail: 'Switch to insertion sort for tiny subarrays (often < 32) to reduce overhead.',
  },
  {
    title: 'Avoid repeated slicing',
    detail: 'Pass indices rather than slicing arrays to reduce allocations and copying.',
  },
  {
    title: 'Stable tie handling',
    detail: 'Use <= for left-first comparison to preserve stability.',
  },
]

const advancedInsights = [
  {
    title: 'Bottom-up iterative merges',
    detail:
      'Merging subarrays of size 1, then 2, then 4 avoids recursion and improves cache behavior. This pattern mirrors how Timsort merges runs.',
  },
  {
    title: 'Galloping mode in Timsort',
    detail:
      'When one run dominates comparisons, Timsort switches to exponential search and bulk copies, cutting comparisons significantly on clustered data.',
  },
  {
    title: 'In-place merging tricks',
    detail:
      'Algorithms like the rotation method or block merge sort reduce auxiliary space below O(n) while trying to preserve stability, trading simplicity for intricate pointer gymnastics.',
  },
  {
    title: 'Parallel merges',
    detail:
      'Splitting both halves and merging with parallel prefix partitions delivers near-linear speedups on multi-core systems when bandwidth allows.',
  },
]

const takeaways = [
  'Merge sort delivers stable, deterministic O(n log n) performance across inputs.',
  'Its space footprint buys simplicity and guarantees, shining on linked lists and external sorting.',
  'Run detection and galloping, as in Timsort, make merge-based sorts excel on real-world partially ordered data.',
  'When memory is scarce, consider quicksort or heapsort; when order stability matters, merge sort is the safe choice.',
  'References: CLRS Chapter 2, Knuth Volume 3, and GeeksforGeeks for visual walkthroughs and external sort examples.',
]

const quickGlossary = [
  {
    term: 'Merge sort',
    definition: 'A divide-and-conquer stable sorting algorithm with O(n log n) time complexity.',
  },
  {
    term: 'Stable sort',
    definition: 'A sort where equal keys keep their original relative order.',
  },
  {
    term: 'Merge step',
    definition: 'The phase that combines two sorted halves into one sorted output.',
  },
  {
    term: 'Auxiliary buffer',
    definition: 'Temporary storage used during merging, typically O(n) for array implementations.',
  },
  {
    term: 'External merge sort',
    definition: 'A disk-friendly variant that sorts runs and merges them when data exceeds memory.',
  },
  {
    term: 'Bottom-up merge sort',
    definition: 'Iterative variant that merges runs of size 1, 2, 4, and so on, without recursion.',
  },
  {
    term: 'Natural runs',
    definition: 'Already sorted stretches in input that adaptive merge algorithms can exploit.',
  },
  {
    term: 'Galloping mode',
    definition:
      'A Timsort optimization that accelerates merging when one run repeatedly wins comparisons.',
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
    { id: 'core-variants', label: 'Variants and Tweaks' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
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

export default function MergeSortPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Merge Sort',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Merge Sort"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Merge Sort</h1>
      <p>
        Merge sort is the canonical divide-and-conquer sort: split the array into halves, sort each
        half, and merge them while keeping ties stable. Its predictable O(n log n) behavior and
        stability make it a backbone for library sorts, external sorting, and linked structures.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            <p>
              Merge sort exists to provide reliable ordering when memory and determinism matter. It
              favors sequential access over clever pivots, making it ideal for disks, streams, and
              data that must keep equal elements in their original order. Its rhythm is consistent
              at every scale: divide, sort, and merge with the same choreography from start to
              finish.
            </p>
          </section>
          <hr className="bin98-divider" />
          <section id="bp-history" className="bin98-section">
            <h2 className="bin98-heading">Historical Context</h2>
            {historicalNotes.map((item) => (
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
            <p>
              The merge step drives the algorithm: two sorted halves flow into a buffer, picking the
              smallest head each time. Stability arises naturally because ties favor the left half,
              preserving the original relative order of equal items.
            </p>
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
            {complexityNotes.map((note) => (
              <p key={note.title}>
                <strong>{note.title}:</strong> {note.detail}
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
                  <th>Stable?</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {comparisonTable.map((row) => (
                  <tr key={row.algorithm}>
                    <td>{row.algorithm}</td>
                    <td>{row.time}</td>
                    <td>{row.space}</td>
                    <td>{row.stable}</td>
                    <td>{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          <section id="core-applications" className="bin98-section">
            <h2 className="bin98-heading">Real-World Applications</h2>
            {applications.map((item) => (
              <p key={item.context}>
                <strong>{item.context}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-variants" className="bin98-section">
            <h2 className="bin98-heading">Variants and Tweaks</h2>
            {variantsAndTweaks.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
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
            {codeExamples.map((example) => (
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
