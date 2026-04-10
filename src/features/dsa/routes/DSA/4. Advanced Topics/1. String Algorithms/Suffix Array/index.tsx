import { Link } from 'react-router-dom'

import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

const historicalMilestones = [
  {
    title: 'Suffix trees inspire lighter indexes (1970s)',
    detail:
      'Suffix trees enabled fast substring queries but used heavy memory, motivating leaner alternatives.',
  },
  {
    title: 'Suffix arrays proposed (1990)',
    detail:
      'Manber and Myers introduced suffix arrays as a simpler, space-friendly index for strings.',
  },
  {
    title: 'Linear-time construction (1990s)',
    detail: 'Algorithms like SA-IS and DC3 showed that suffix arrays can be built in O(n) time.',
  },
  {
    title: 'Adopted in search and bioinformatics (2000s+)',
    detail:
      'Efficient indexing for large texts and genomes made suffix arrays a practical standard.',
  },
]

const mentalModels = [
  {
    title: 'Sorted list of all suffixes',
    detail: 'A suffix array stores the starting indices of all suffixes in lexicographic order.',
  },
  {
    title: 'Binary search on text',
    detail:
      'With suffixes sorted, you can binary search for any pattern by comparing against suffixes.',
  },
  {
    title: 'Suffix tree without pointers',
    detail: 'Suffix arrays are a compact alternative to suffix trees when you add the LCP array.',
  },
]

const coreComponents = [
  {
    heading: 'Suffix array (SA)',
    bullets: [
      'SA[i] is the start index of the i-th smallest suffix.',
      'Implicitly represents all suffixes without storing strings.',
      'Supports fast substring search via binary search.',
    ],
  },
  {
    heading: 'LCP array',
    bullets: [
      'LCP[i] is the longest common prefix of suffixes SA[i] and SA[i-1].',
      'Built in O(n) using Kasai algorithm.',
      'Enables fast repeated-substring and longest-common-substring queries.',
    ],
  },
  {
    heading: 'Rank array',
    bullets: [
      'Inverse of SA: rank[pos] = order of suffix at pos.',
      'Useful for LCP computation and neighbor queries.',
      'Supports building suffix arrays in doubling algorithms.',
    ],
  },
  {
    heading: 'Comparison strategy',
    bullets: [
      'Naive sort compares suffix strings directly.',
      'Efficient builds use prefix doubling with ranks or linear-time SA-IS.',
      'Trade memory for speed with stable sorting on ranks.',
    ],
  },
]

const buildSteps = [
  {
    title: 'Initialize ranks',
    detail:
      'Assign each character a rank (e.g., ASCII code). These ranks represent 1-length prefixes.',
  },
  {
    title: 'Sort by 2^k prefixes',
    detail: 'Sort suffixes by the pair (rank[i], rank[i + 2^k]) and update ranks.',
  },
  {
    title: 'Double until complete',
    detail: 'Increase k each round until the ranks are unique or 2^k >= n.',
  },
  {
    title: 'Build LCP',
    detail: 'Use Kasai algorithm to compute LCP in linear time from SA and rank.',
  },
]

const querySteps = [
  {
    title: 'Binary search the suffix array',
    detail: 'Compare the pattern against suffixes at midpoints to narrow a match range.',
  },
  {
    title: 'Locate match interval',
    detail: 'Find the leftmost and rightmost suffixes with the pattern as a prefix.',
  },
  {
    title: 'Report occurrences',
    detail: 'All suffix indices in the interval are match positions.',
  },
  {
    title: 'Use LCP for speedups',
    detail: 'LCP can reduce repeated comparisons in range queries and advanced tasks.',
  },
]

const complexityNotes = [
  {
    title: 'Construction time',
    detail: 'O(n log n) with prefix-doubling sorts; O(n) with advanced algorithms.',
  },
  {
    title: 'Search time',
    detail: 'O(m log n) for pattern length m using binary search comparisons.',
  },
  {
    title: 'Memory cost',
    detail: 'O(n) for SA, rank, and LCP arrays, typically much smaller than suffix trees.',
  },
  {
    title: 'Best when text is reused',
    detail: 'Upfront build cost amortizes across many queries and analyses.',
  },
]

const realWorldUses = [
  {
    context: 'Full-text search',
    detail: 'Index large documents for substring queries and autocomplete features.',
  },
  {
    context: 'Bioinformatics',
    detail: 'Find motifs and repeated patterns in DNA or protein sequences.',
  },
  {
    context: 'Compression',
    detail: 'Burrows-Wheeler Transform relies on suffix ordering for block sorting.',
  },
  {
    context: 'Plagiarism detection',
    detail: 'Repeated substring detection and longest-common-substring analysis.',
  },
]

const examples = [
  {
    title: 'Suffix array by doubling',
    code: `// Pseudocode
function buildSA(s):
    n = s.length
    sa = [0..n-1]
    rank = [code(s[i]) for i in 0..n-1]
    k = 1
    while k < n:
        sa.sort by (rank[i], rank[i + k] or -1)
        tmp[sa[0]] = 0
        for i in 1..n-1:
            prev = sa[i-1]
            cur = sa[i]
            tmp[cur] = tmp[prev] + (rankPair(prev) != rankPair(cur))
        rank = tmp
        if rank[sa[n-1]] == n-1: break
        k *= 2
    return sa`,
    explanation:
      'Prefix doubling sorts suffixes by 2^k-length prefixes, updating ranks each round.',
  },
  {
    title: 'LCP with Kasai',
    code: `// Pseudocode
function buildLCP(s, sa):
    n = s.length
    rank[sa[i]] = i
    lcp = array(n, 0)
    k = 0
    for i in 0..n-1:
        if rank[i] == 0: continue
        j = sa[rank[i] - 1]
        while i + k < n and j + k < n and s[i + k] == s[j + k]:
            k += 1
        lcp[rank[i]] = k
        if k > 0: k -= 1
    return lcp`,
    explanation: 'LCP compares neighboring suffixes in SA order with linear overall work.',
  },
  {
    title: 'Pattern search',
    code: `// Binary search for pattern "ana" in "banana"
// SA: [5, 3, 1, 0, 4, 2] -> ["a","ana","anana","banana","na","nana"]
// Match interval is indices 1..2 -> starts at 3 and 1.`,
    explanation: 'Binary search finds the interval of suffixes with the pattern as a prefix.',
  },
]

const pitfalls = [
  'Sorting suffix strings directly leads to O(n^2 log n) comparisons.',
  'Forgetting a sentinel character can break ordering in some constructions.',
  'Binary search comparisons are O(m) each; long patterns can be costly.',
  'Ignoring LCP means missing faster repeated-substring queries.',
  'Using suffix arrays when a simple index or KMP would suffice.',
]

const decisionGuidance = [
  'Need fast substring queries over a fixed text with many searches.',
  'Want a compact alternative to suffix trees with similar power.',
  'Need LCP-based queries like longest repeated substring.',
  'Working with large texts where memory matters.',
  'If only one pattern is searched once, KMP or Rabin-Karp is simpler.',
]

const advancedInsights = [
  {
    title: 'SA-IS linear construction',
    detail: 'Induced sorting builds suffix arrays in O(n) time, but implementation is complex.',
  },
  {
    title: 'Range minimum on LCP',
    detail: 'RMQ on LCP enables fast longest common prefix queries between any two suffixes.',
  },
  {
    title: 'BWT connection',
    detail: 'The Burrows-Wheeler Transform is derived from the suffix array order.',
  },
  {
    title: 'Compressed suffix arrays',
    detail: 'FM-index and related structures compress SA while supporting fast queries.',
  },
]

const takeaways = [
  'Suffix arrays store sorted suffix indices, enabling fast substring search with low memory.',
  'LCP adds powerful queries like longest repeated substring and LRS/LCS variants.',
  'Construction cost is upfront and pays off when text is reused.',
  'Choose suffix arrays when you need indexing power without suffix tree overhead.',
]

const quickGlossary = [
  {
    term: 'Suffix',
    definition: 'A substring that starts at some position and runs to the end of the text.',
  },
  {
    term: 'Suffix array',
    definition: 'An array of starting indices of all suffixes sorted in lexicographic order.',
  },
  {
    term: 'LCP array',
    definition:
      'An array where each entry stores the longest common prefix between adjacent suffixes in suffix-array order.',
  },
  {
    term: 'Rank array',
    definition:
      'The inverse mapping of the suffix array, telling you where a suffix appears in sorted order.',
  },
  {
    term: 'Prefix doubling',
    definition:
      'A construction method that repeatedly sorts suffixes by prefixes of length 1, 2, 4, 8, and so on.',
  },
  {
    term: 'Kasai algorithm',
    definition:
      'A linear-time algorithm for building the LCP array from the suffix array and rank array.',
  },
  {
    term: 'Match interval',
    definition:
      'The contiguous range of suffix-array positions whose suffixes share the pattern as a prefix.',
  },
  {
    term: 'Sentinel character',
    definition:
      'A special smallest-ending marker sometimes appended so suffixes compare cleanly during construction.',
  },
  {
    term: 'Compressed suffix array',
    definition:
      'A space-efficient variant, such as the FM-index, that preserves fast substring query capability.',
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
    { id: 'bp-why', label: 'Why It Matters' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-mental-models', label: 'Mental Models' },
    { id: 'core-components', label: 'Core Components' },
    { id: 'core-construction', label: 'Construction Workflow' },
    { id: 'core-query', label: 'Query Workflow' },
    { id: 'core-complexity', label: 'Complexity and Tradeoffs' },
    { id: 'core-applications', label: 'Real-World Applications' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-when', label: 'When to Use It' },
    { id: 'core-advanced', label: 'Advanced Insights' },
  ],
  examples: [
    { id: 'ex-code', label: 'Code Examples' },
    { id: 'ex-walkthrough', label: 'Search Walkthrough' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function SuffixArrayPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Suffix Array',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Suffix Array"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Suffix Array</h1>
      <p>
        A suffix array stores the starting positions of every suffix in sorted order, letting you
        binary search for any pattern as if you had sorted all suffixes. Pair it with the LCP array
        and you get many suffix-tree capabilities using only arrays and simple comparisons.
      </p>
      <p>
        This page keeps the material as a help document: use the tabs to switch sections, the
        contents pane to jump within the current tab, or return to the{' '}
        <Link to="/algoViz" className="sa-help-link">
          catalog
        </Link>
        .
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            <p>
              A suffix array is a sorted index of all suffixes of a string. With this sorted list,
              substring queries reduce to binary searches and prefix comparisons. It offers strong
              querying power with less memory than suffix trees.
            </p>
            {mentalModels.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
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

          <section id="bp-why" className="bin98-section">
            <h2 className="bin98-heading">Why It Matters</h2>
            <p>
              Most practical builds use prefix doubling for simplicity; linear-time builds exist if
              you need top-end performance. Suffix arrays balance build cost with compact memory and
              fast repeated queries.
            </p>
            {complexityNotes.map((note) => (
              <p key={note.title}>
                <strong>{note.title}:</strong> {note.detail}
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
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>

          <section id="core-components" className="bin98-section">
            <h2 className="bin98-heading">Core Components</h2>
            {coreComponents.map((block) => (
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

          <section id="core-construction" className="bin98-section">
            <h2 className="bin98-heading">Construction Workflow</h2>
            {buildSteps.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-query" className="bin98-section">
            <h2 className="bin98-heading">Query Workflow</h2>
            {querySteps.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-complexity" className="bin98-section">
            <h2 className="bin98-heading">Complexity and Tradeoffs</h2>
            {complexityNotes.map((note) => (
              <p key={note.title}>
                <strong>{note.title}:</strong> {note.detail}
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

          <section id="core-when" className="bin98-section">
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
          <section id="ex-code" className="bin98-section">
            <h2 className="bin98-heading">Code Examples</h2>
            {examples.map((example) => (
              <div key={example.title}>
                <h3 className="bin98-subheading">{example.title}</h3>
                <div className="bin98-codebox">
                  <pre>{example.code}</pre>
                </div>
                <p>{example.explanation}</p>
              </div>
            ))}
          </section>

          <section id="ex-walkthrough" className="bin98-section">
            <h2 className="bin98-heading">Search Walkthrough</h2>
            <h3 className="bin98-subheading">Building the index</h3>
            <ol>
              {buildSteps.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}:</strong> {item.detail}
                </li>
              ))}
            </ol>
            <h3 className="bin98-subheading">Searching the index</h3>
            <ol>
              {querySteps.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}:</strong> {item.detail}
                </li>
              ))}
            </ol>
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
