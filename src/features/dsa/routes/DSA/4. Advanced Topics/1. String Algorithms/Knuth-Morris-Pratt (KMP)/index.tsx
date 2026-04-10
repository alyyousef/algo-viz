import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

const historicalMilestones = [
  {
    title: 'Naive search hits a wall (1960s)',
    detail:
      'Early string search compared the pattern at every position, leading to O(n*m) behavior in the worst case.',
  },
  {
    title: 'Knuth, Morris, and Pratt publish KMP (1977)',
    detail:
      'They show how to reuse partial matches to skip redundant comparisons, producing a linear-time guarantee.',
  },
  {
    title: 'Standard text tools adopt prefix tables (1980s)',
    detail:
      'Editors, compilers, and UNIX utilities embed KMP-style prefix arrays for fast search in large texts.',
  },
  {
    title: 'Modern string engines combine KMP with others (2000s+)',
    detail:
      'Hybrid algorithms blend KMP with Boyer-Moore variants, but KMP remains the core linear-time building block.',
  },
]

const mentalModels = [
  {
    title: 'Pattern knows its own overlaps',
    detail:
      'KMP precomputes how the pattern overlaps with itself so it can shift without rechecking characters.',
  },
  {
    title: 'A cursor that never backs up',
    detail:
      'The text index always moves forward; when a mismatch occurs, only the pattern index jumps using the prefix table.',
  },
  {
    title: 'Reusable partial match',
    detail:
      'If you matched a prefix of length k, KMP tells you the next best prefix to continue from after a mismatch.',
  },
]

const coreComponents = [
  {
    heading: 'Prefix table (LPS)',
    bullets: [
      'LPS[i] stores the length of the longest proper prefix of pattern[0..i] that is also a suffix.',
      'It captures how much of the pattern can be reused after a mismatch.',
      'Computed in O(m) for a pattern of length m.',
    ],
  },
  {
    heading: 'Two-pointer scan',
    bullets: [
      'i indexes the text, j indexes the pattern.',
      'On match: increment both. On mismatch: move j to LPS[j-1] without moving i.',
      'Guarantees linear time because i never decreases.',
    ],
  },
  {
    heading: 'Match reporting',
    bullets: [
      'When j reaches the pattern length, a match ends at i-1.',
      'Set j to LPS[j-1] to continue searching for overlaps.',
      'Supports overlapping matches in the same pass.',
    ],
  },
  {
    heading: 'Prefix reuse logic',
    bullets: [
      'If pattern has repeated substrings, LPS jumps over redundant work.',
      'Worst-case naive inputs become linear under KMP.',
      'Key insight: do not re-compare text characters that already matched.',
    ],
  },
]

const buildSteps = [
  {
    title: 'Initialize LPS array',
    detail:
      'Set LPS[0] = 0. Use two indices: len for current prefix length, i for position in the pattern.',
  },
  {
    title: 'Extend on matches',
    detail:
      'If pattern[i] == pattern[len], increment len and assign LPS[i] = len, then move i forward.',
  },
  {
    title: 'Fallback on mismatch',
    detail:
      'If mismatch and len > 0, set len = LPS[len - 1] and retry; otherwise set LPS[i] = 0 and move i.',
  },
  {
    title: 'Finish in linear time',
    detail: 'Every character is processed a constant number of times, so building LPS is O(m).',
  },
]

const matchSteps = [
  {
    title: 'Start with i=0, j=0',
    detail: 'i scans the text, j scans the pattern.',
  },
  {
    title: 'Advance on match',
    detail: 'When text[i] == pattern[j], increment both. If j reaches m, report a match.',
  },
  {
    title: 'Fallback on mismatch',
    detail: 'If j > 0, set j = LPS[j-1]. If j == 0, only move i forward.',
  },
  {
    title: 'Keep scanning',
    detail: 'No backtracking on the text index, so total work is O(n).',
  },
]

const complexityNotes = [
  {
    title: 'Preprocessing time',
    detail: 'O(m) to build the LPS array for a pattern of length m.',
  },
  {
    title: 'Search time',
    detail: 'O(n) over a text of length n, plus reporting matches.',
  },
  {
    title: 'Memory cost',
    detail: 'O(m) for the LPS array. No extra structures beyond the pattern.',
  },
  {
    title: 'Predictable worst-case',
    detail: 'Unlike naive search, KMP never degrades to O(n*m).',
  },
]

const realWorldUses = [
  {
    context: 'Text editors',
    detail: 'Find/replace operations use KMP for predictable search time across large files.',
  },
  {
    context: 'Compilers and lexers',
    detail: 'Tokenization and keyword recognition benefit from efficient substring search.',
  },
  {
    context: 'DNA sequence analysis',
    detail: 'Exact motif matching across long genomes is linear with KMP.',
  },
  {
    context: 'Log scanning',
    detail: 'Searching for error signatures in streaming logs can be done without backtracking.',
  },
]

const examples = [
  {
    title: 'Build the LPS array',
    code: `// Pseudocode
function buildLPS(pattern):
    lps = array(pattern.length)
    lps[0] = 0
    len = 0
    i = 1
    while i < pattern.length:
        if pattern[i] == pattern[len]:
            len += 1
            lps[i] = len
            i += 1
        else if len > 0:
            len = lps[len - 1]
        else:
            lps[i] = 0
            i += 1
    return lps`,
    explanation:
      'LPS captures the longest proper prefix that is also a suffix for each prefix of the pattern.',
  },
  {
    title: 'Search with KMP',
    code: `// Pseudocode
function search(text, pattern):
    lps = buildLPS(pattern)
    i = 0
    j = 0
    while i < text.length:
        if text[i] == pattern[j]:
            i += 1
            j += 1
            if j == pattern.length:
                report(i - j)
                j = lps[j - 1]
        else if j > 0:
            j = lps[j - 1]
        else:
            i += 1`,
    explanation:
      'On mismatch, KMP reuses the longest known prefix instead of restarting from scratch.',
  },
  {
    title: 'Overlapping matches',
    code: `// Pattern: "aba", text: "ababa"
// Matches at 0 and 2 because j resets to lps[2] = 1 after first match.`,
    explanation: 'Resetting j with LPS allows the next match to start inside the previous match.',
  },
]

const pitfalls = [
  'Miscomputing LPS by allowing the whole prefix (must be proper prefix).',
  'Forgetting to reset j to LPS[j-1] after a full match, which misses overlaps.',
  'Mixing 0-based and 1-based indices in the LPS table.',
  'Using KMP for many patterns; Aho-Corasick is better for multi-pattern search.',
  'Ignoring normalization (case-folding, Unicode), which causes mismatches in real text.',
]

const decisionGuidance = [
  'Need single-pattern search with strict worst-case guarantees.',
  'Large texts where naive O(n*m) is unacceptable.',
  'Streaming input where you cannot backtrack the text.',
  'You want a simple, reliable algorithm with minimal memory.',
  'If patterns are many, build an automaton instead (Aho-Corasick).',
]

const advancedInsights = [
  {
    title: 'Prefix table intuition',
    detail:
      'LPS is the length of the longest border of each prefix, letting you jump to the next viable alignment.',
  },
  {
    title: 'Partial match reuse',
    detail:
      'When a mismatch happens at j, KMP does not discard all progress; it reuses the longest suffix that is a prefix.',
  },
  {
    title: 'Streaming support',
    detail:
      'Keep i and j across chunks to continue searching as text arrives, with no need to rebuild LPS.',
  },
  {
    title: 'Comparison to Z algorithm',
    detail:
      'Z is great for preprocessing a combined string, but KMP is more direct for one-pattern streaming search.',
  },
]

const takeaways = [
  'KMP guarantees linear-time single-pattern search by precomputing pattern overlaps.',
  'The LPS array is the key data structure; build it carefully.',
  'Text scanning never backtracks, making KMP ideal for streams.',
  'Use KMP for one pattern; use Aho-Corasick for many.',
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
    { id: 'bp-applications', label: 'Applications' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-models', label: 'Mental Models' },
    { id: 'core-components', label: 'Core Components' },
    { id: 'core-build', label: 'Prefix Table' },
    { id: 'core-match', label: 'Matching Workflow' },
    { id: 'core-complexity', label: 'Complexity' },
    { id: 'core-pitfalls', label: 'Pitfalls' },
    { id: 'core-when', label: 'When to Use' },
    { id: 'core-advanced', label: 'Advanced Insights' },
  ],
  examples: [{ id: 'ex-code', label: 'Practical Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function KnuthMorrisPrattKMPPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Knuth-Morris-Pratt (KMP)',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Knuth-Morris-Pratt (KMP)"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Knuth-Morris-Pratt (KMP)</h1>
      <p className="kmp-help-intro">
        KMP solves single-pattern search by precomputing how the pattern overlaps with itself. This
        page keeps the original material intact, but presents it as a Windows-style help document
        focused on the LPS table, mismatch fallback, and the practical cases where linear worst-case
        search matters.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            <p>
              KMP solves the classic substring search problem in guaranteed linear time by avoiding
              re-checking text characters. It does this by building a prefix table, also called LPS,
              for the pattern and using it to decide how far the pattern can shift after a mismatch.
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

          <hr className="bin98-divider" />

          <section id="bp-applications" className="bin98-section">
            <h2 className="bin98-heading">Applications</h2>
            {realWorldUses.map((item) => (
              <p key={item.context}>
                <strong>{item.context}:</strong> {item.detail}
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
          <section id="core-models" className="bin98-section">
            <h2 className="bin98-heading">Mental Models</h2>
            {mentalModels.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
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

          <section id="core-build" className="bin98-section">
            <h2 className="bin98-heading">Prefix Table Construction</h2>
            {buildSteps.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-match" className="bin98-section">
            <h2 className="bin98-heading">Matching Workflow</h2>
            {matchSteps.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-complexity" className="bin98-section">
            <h2 className="bin98-heading">Complexity Analysis and Tradeoffs</h2>
            {complexityNotes.map((item) => (
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
        <section id="ex-code" className="bin98-section">
          <h2 className="bin98-heading">Practical Examples</h2>
          {examples.map((item) => (
            <div key={item.title}>
              <h3 className="bin98-subheading">{item.title}</h3>
              <pre className="bin98-codebox">
                <code>{item.code.trim()}</code>
              </pre>
              <p>{item.explanation}</p>
            </div>
          ))}
        </section>
      )}

      {activeTab === 'glossary' && (
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          <p>
            <strong>LPS:</strong> Longest proper prefix that is also a suffix for each pattern
            prefix.
          </p>
          <p>
            <strong>Proper prefix:</strong> A prefix shorter than the whole string.
          </p>
          <p>
            <strong>Overlap:</strong> A suffix of the matched prefix that can continue as a prefix
            of the pattern.
          </p>
          <p>
            <strong>Streaming search:</strong> Processing text left-to-right without backtracking or
            full buffering.
          </p>
        </section>
      )}
    </TopicPageShell>
  )
}
