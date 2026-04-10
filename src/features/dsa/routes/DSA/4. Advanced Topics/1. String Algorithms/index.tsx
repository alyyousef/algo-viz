import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'Text as a structured domain',
    detail:
      'String algorithms turn raw text into searchable structure so we can answer substring, pattern, and similarity queries predictably.',
    note: 'Avoids O(nm) scans when corpora grow to gigabytes.',
  },
  {
    title: 'Preprocessing to buy speed',
    detail:
      'Investing in prefix tables, suffix arrays, or tries moves work up front so per-query latency stays near-linear or constant.',
    note: 'Trading build time for consistent query SLAs.',
  },
  {
    title: 'Handling noise and collisions',
    detail:
      'Rolling hashes and Unicode normalization can betray you; correctness depends on careful collision checks and text canonicalization.',
    note: 'Prevents false positives from hash matches or mixed encodings.',
  },
  {
    title: 'Scaling with memory awareness',
    detail:
      'Succinct structures (suffix arrays, FM-index) replace pointer-heavy trees to keep billions of characters searchable in RAM.',
    note: 'Keeps indexes deployable on commodity machines.',
  },
]

const history = [
  {
    title: '1970: KMP (Knuth, Morris, Pratt)',
    detail: 'Introduced prefix-function search in O(n + m) without backtracking.',
  },
  {
    title: '1977: Boyer-Moore',
    detail: 'Bad-character and good-suffix shifts made pattern skipping practical on long texts.',
  },
  {
    title: '1975-1976: Aho-Corasick',
    detail: 'Automaton for multi-pattern search with output links; ideal for lexicons.',
  },
  {
    title: '1990: Suffix array (Manber, Myers)',
    detail: 'Array + LCP replaced suffix trees with better memory locality.',
  },
  {
    title: '1994: Rabin-Karp popularization',
    detail: 'Rolling hashes enabled fast plagiarism and multi-pattern scans.',
  },
  {
    title: '2000s: FM-index/BWT',
    detail: 'Compressed full-text search became standard in genomics and big-text search.',
  },
]

const pillars = [
  {
    title: 'Deterministic preprocessing',
    detail:
      'Prefix tables, LCP, and automata must be built in linear or n log n time with no ambiguity about encoding.',
  },
  {
    title: 'Canonical text handling',
    detail:
      'Normalize Unicode (NFC/NFD), decide on case folding, and define alphabet before hashing or building automata.',
  },
  {
    title: 'Collision discipline',
    detail:
      'Rolling hashes need secondary verification; choose bases/moduli to minimize collisions and avoid overflow.',
  },
  {
    title: 'Boundary safety',
    detail:
      'Off-by-one errors at pattern/text boundaries or sentinel handling break correctness; indexes need clear sentinels.',
  },
  {
    title: 'Memory locality',
    detail:
      'Prefer arrays over pointer-heavy trees; cache-friendly layouts keep throughput high on large corpora.',
  },
]

const mentalModels = [
  {
    title: 'Search as guided skipping',
    detail:
      'KMP/Z precompute where to jump after a mismatch, like a bookmark; Boyer-Moore jumps ahead based on what cannot match.',
  },
  {
    title: 'Suffix array as sorted endings',
    detail:
      'Imagine all suffixes alphabetized; any substring is a prefix of some suffix range. Binary search narrows the band.',
  },
  {
    title: 'Automaton as compiled dictionary',
    detail:
      'Aho-Corasick turns a word list into a DFA with failure links; scanning text becomes a streaming state machine.',
  },
  {
    title: 'Hash as a fingerprint',
    detail:
      'Rolling hashes are fingerprints of substrings; most differ, some collide. Always double-check identities when stakes are high.',
  },
]

const howItWorks = [
  {
    step: '1. Normalize input',
    detail:
      'Define encoding, case, and decomposition; strip or preserve accents per domain; ensure deterministic byte sequences.',
  },
  {
    step: '2. Pick a matcher vs index',
    detail:
      'For one-off searches use linear matchers (KMP/Z/Boyer-Moore); for heavy reuse build suffix arrays, automata, or tries.',
  },
  {
    step: '3. Build preprocessing tables',
    detail:
      'Compute prefix-function or Z-array; build failure links for Aho-Corasick; sort suffixes and compute LCP with Kasai.',
  },
  {
    step: '4. Execute searches',
    detail:
      'Stream through text once: update automaton state, compare windows, or binary search suffix ranges with LCP pruning.',
  },
  {
    step: '5. Verify on risk',
    detail:
      'For hashes, confirm matches with direct substring compare; for Unicode, recheck normalization before equality claims.',
  },
  {
    step: '6. Report and cache',
    detail:
      'Return indices, counts, or context snippets; cache frequent queries or suffix ranges to accelerate repeated lookups.',
  },
]

const complexityTable = [
  {
    approach: 'KMP / Z-algorithm',
    time: 'O(n + m)',
    space: 'O(m)',
    note: 'Linear scan with prefix/Z preprocessing.',
  },
  {
    approach: 'Boyer-Moore (full heuristics)',
    time: 'O(n / m) avg',
    space: 'O(|Sigma| + m)',
    note: 'Skips on mismatches; worst-case O(nm).',
  },
  {
    approach: 'Rabin-Karp rolling hash',
    time: 'O(n + m)',
    space: 'O(1)',
    note: 'Expected linear; collisions require verification.',
  },
  {
    approach: 'Suffix array construction (SA-IS)',
    time: 'O(n)',
    space: 'O(n)',
    note: 'Practical n log n (prefix-doubling) is common.',
  },
  {
    approach: 'Aho-Corasick (multi-pattern)',
    time: 'O(n + z)',
    space: 'O(total patterns)',
    note: 'z outputs; streaming, failure links guide jumps.',
  },
  {
    approach: 'Suffix automaton',
    time: 'O(n)',
    space: 'O(n)',
    note: 'All substrings represented; answers existence/longest queries fast.',
  },
]

const applications = [
  {
    title: 'IDE search and autocomplete',
    detail:
      'Prefix tries and suffix arrays back fuzzy finders; fast substring checks enable instant results as you type.',
  },
  {
    title: 'Plagiarism and clone detection',
    detail:
      'Rolling hashes and suffix arrays compare many documents efficiently; collisions are mitigated with double hashes.',
  },
  {
    title: 'Security scanning',
    detail:
      'Aho-Corasick scans traffic or binaries for signatures in one pass with bounded memory.',
  },
  {
    title: 'Genome substring queries',
    detail:
      'Suffix arrays/FM-index let large genomes be searched for motifs or read seeds without loading all sequences.',
  },
  {
    title: 'Log and telemetry parsing',
    detail:
      'Streaming matchers detect patterns in unbounded logs; failure links keep latency flat as volume spikes.',
  },
]

const failureCallout = {
  title: 'Failure story: Unicode outage',
  detail:
    'A production search normalized queries but not the index. Composed vs decomposed accents split matches, causing zero hits for French and Vietnamese users. Fix: enforce NFC at ingest and query, add audits for mixed-normalization documents.',
}

const pitfalls = [
  'Ignoring normalization leads to missed matches across accents or casing.',
  'Assuming rolling hashes are unique; collisions can slip through without secondary checks.',
  'Forgetting sentinels or separators in suffix arrays mixes suffixes from concatenated strings.',
  'Boyer-Moore worst-case behavior on repetitive text if heuristics are not guarded.',
  'Off-by-one errors at pattern boundaries or when patterns exceed text length.',
]

const whenToUse = [
  'Use KMP or Z for single exact pattern searches in streaming text.',
  'Use Boyer-Moore when patterns are long and alphabets are large, and text is not repetitive.',
  'Use Aho-Corasick when many patterns must be found in one pass.',
  'Use suffix arrays or FM-index when you will run many substring queries over a fixed corpus.',
  'Use rolling hashes for fast substring equality checks or plagiarism detection with collision verification.',
]

const advanced = [
  {
    title: 'Suffix array + LCP + RMQ',
    detail:
      'Combining LCP with RMQ answers longest common prefix of any two suffixes in O(1) after O(n) prep.',
  },
  {
    title: 'Suffix automaton for LCS',
    detail:
      'Build SAM on one string, traverse with another to find longest common substring in linear time.',
  },
  {
    title: 'FM-index with wavelet trees',
    detail: 'Adds rank/select over compressed text for backward search with tiny memory footprint.',
  },
  {
    title: 'Bitset-accelerated DP',
    detail:
      'Shift-Or/Bitap uses word-level ops for approximate matching on short patterns at very high speed.',
  },
  {
    title: 'Double-hash and 128-bit mixing',
    detail:
      'Reduces collision probability when rolling hashes are used for deduplication or integrity checks.',
  },
]

const codeExamples = [
  {
    title: 'Prefix-function (KMP) preprocessing',
    code: `function prefixFunction(p: string): number[] {
  const pi = Array(p.length).fill(0)
  for (let i = 1; i < p.length; i++) {
    let j = pi[i - 1]
    while (j > 0 && p[i] !== p[j]) j = pi[j - 1]
    if (p[i] === p[j]) j++
    pi[i] = j
  }
  return pi
}`,
    explanation:
      'Computes longest proper prefix-suffix lengths to drive KMP skips. Linear time, O(m) space.',
  },
  {
    title: 'Z-algorithm scan',
    code: `function zArray(s: string): number[] {
  const z = Array(s.length).fill(0)
  let l = 0
  let r = 0
  for (let i = 1; i < s.length; i++) {
    if (i <= r) z[i] = Math.min(r - i + 1, z[i - l])
    while (i + z[i] < s.length && s[z[i]] === s[i + z[i]]) z[i]++
    if (i + z[i] - 1 > r) { l = i; r = i + z[i] - 1 }
  }
  z[0] = s.length
  return z
}`,
    explanation:
      'Maintains a [l, r] box of the rightmost prefix match to extend matches in linear time.',
  },
  {
    title: 'Rolling hash substring equality',
    code: `const MOD = 1_000_000_007
const BASE = 911382323

function prefixHashes(s: string) {
  const h = Array(s.length + 1).fill(0)
  const p = Array(s.length + 1).fill(1)
  for (let i = 0; i < s.length; i++) {
    h[i + 1] = (h[i] * BASE + s.charCodeAt(i)) % MOD
    p[i + 1] = (p[i] * BASE) % MOD
  }
  return { h, p }
}

function hashRange(h: number[], p: number[], l: number, r: number) {
  return (h[r] - (h[l] * p[r - l]) % MOD + MOD) % MOD
}

function equalSubstr(a: { h: number[]; p: number[] }, l1: number, r1: number, l2: number, r2: number) {
  return hashRange(a.h, a.p, l1, r1) === hashRange(a.h, a.p, l2, r2)
}`,
    explanation:
      'Computes prefix hashes and powers to compare substrings in O(1). In practice use two moduli or 128-bit mixing to curb collisions.',
  },
]

const keyTakeaways = [
  'Normalize text before building or querying indexes.',
  'Pick linear matchers for one-off searches; build suffix structures or automata for heavy reuse.',
  'Hashes speed equality checks but need collision guards.',
  'Suffix arrays and FM-indexes deliver memory-efficient full-text search at scale.',
  'Testing on repetitive and degenerate inputs prevents worst-case blowups.',
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'takeaways'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'takeaways', label: 'Takeaways' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'overview', label: 'Overview' },
    { id: 'big-picture', label: 'Big picture' },
    { id: 'history', label: 'History' },
    { id: 'applications', label: 'Applications' },
  ],
  'core-concepts': [
    { id: 'core-pillars-and-mental-hooks', label: 'Core pillars and mental hooks' },
    { id: 'how-it-works', label: 'How it works' },
    { id: 'complexity-reference', label: 'Complexity reference' },
    { id: 'advanced-moves', label: 'Advanced moves' },
  ],
  examples: [
    { id: 'failure-mode', label: 'Failure mode' },
    { id: 'code-examples', label: 'Code examples' },
  ],
  takeaways: [
    { id: 'pitfalls', label: 'Pitfalls' },
    { id: 'when-to-use-what', label: 'When to use what' },
    { id: 'key-takeaways', label: 'Key takeaways' },
  ],
}

export default function StringAlgorithmsPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'String Algorithms',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="String Algorithms"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">String Algorithms</h1>
      <p className="bin98-doc-subtitle">Pattern search, indexing, and text rigor.</p>

      {activeTab === 'big-picture' && (
        <>
          <section id="overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            <div className="bin98-subheading">Pattern search, indexing, and text rigor</div>
            <p>
              From single-pattern scans to compressed full-text search, string algorithms trade
              preprocessing for predictable queries. The right normalization, hashing discipline,
              and indexes keep results correct at scale.
            </p>
          </section>

          <section id="big-picture" className="bin98-section">
            <h2 className="bin98-heading">Big picture</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {bigPicture.map((item) => (
                <div key={item.title} className="bin98-section">
                  <div className="bin98-subheading">{item.title}</div>
                  <p>{item.detail}</p>
                  <p>{item.note}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="history" className="bin98-section">
            <h2 className="bin98-heading">History</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {history.map((event) => (
                <div key={event.title} className="bin98-section">
                  <div className="bin98-subheading">{event.title}</div>
                  <p>{event.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="applications" className="bin98-section">
            <h2 className="bin98-heading">Applications</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {applications.map((item) => (
                <div key={item.title} className="bin98-section">
                  <div className="bin98-subheading">{item.title}</div>
                  <p>{item.detail}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {activeTab === 'core-concepts' && (
        <>
          <section id="core-pillars-and-mental-hooks" className="bin98-section">
            <h2 className="bin98-heading">Core pillars and mental hooks</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-4">
                {pillars.map((pillar) => (
                  <div key={pillar.title} className="bin98-section">
                    <div className="bin98-subheading">{pillar.title}</div>
                    <p>{pillar.detail}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                {mentalModels.map((model) => (
                  <div key={model.title} className="bin98-section">
                    <div className="bin98-subheading">{model.title}</div>
                    <p>{model.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="how-it-works" className="bin98-section">
            <h2 className="bin98-heading">How it works</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {howItWorks.map((item) => (
                <div key={item.step} className="bin98-section">
                  <div className="bin98-subheading">{item.step}</div>
                  <p>{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="complexity-reference" className="bin98-section">
            <h2 className="bin98-heading">Complexity reference</h2>
            <div className="bin98-section">
              <table className="bin98-table">
                <thead>
                  <tr>
                    <th>Approach</th>
                    <th>Time</th>
                    <th>Space</th>
                    <th>Note</th>
                  </tr>
                </thead>
                <tbody>
                  {complexityTable.map((row) => (
                    <tr key={row.approach}>
                      <td>{row.approach}</td>
                      <td>{row.time}</td>
                      <td>{row.space}</td>
                      <td>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="advanced-moves" className="bin98-section">
            <h2 className="bin98-heading">Advanced moves</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {advanced.map((item) => (
                <div key={item.title} className="bin98-section">
                  <div className="bin98-subheading">{item.title}</div>
                  <p>{item.detail}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {activeTab === 'examples' && (
        <>
          <section id="failure-mode" className="bin98-section">
            <h2 className="bin98-heading">Failure mode</h2>
            <div className="bin98-section">
              <div className="bin98-subheading">{failureCallout.title}</div>
              <p>{failureCallout.detail}</p>
            </div>
          </section>

          <section id="code-examples" className="bin98-section">
            <h2 className="bin98-heading">Code examples</h2>
            <div className="space-y-4">
              {codeExamples.map((example) => (
                <div key={example.title} className="bin98-section">
                  <div className="bin98-subheading">{example.title}</div>
                  <pre className="bin98-codebox">
                    <code>{example.code}</code>
                  </pre>
                  <p>{example.explanation}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {activeTab === 'takeaways' && (
        <>
          <section id="pitfalls" className="bin98-section">
            <h2 className="bin98-heading">Pitfalls</h2>
            <div className="bin98-section">
              <ul className="list-disc pl-5 space-y-2">
                {pitfalls.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section id="when-to-use-what" className="bin98-section">
            <h2 className="bin98-heading">When to use what</h2>
            <div className="bin98-section">
              <ol className="list-decimal pl-5 space-y-2">
                {whenToUse.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </section>

          <section id="key-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key takeaways</h2>
            <div className="bin98-section">
              <ul className="list-disc pl-5 space-y-2">
                {keyTakeaways.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>
        </>
      )}
    </TopicPageShell>
  )
}
