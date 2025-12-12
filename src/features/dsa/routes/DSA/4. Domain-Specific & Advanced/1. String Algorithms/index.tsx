import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'
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
  { title: '1970: KMP (Knuth, Morris, Pratt)', detail: 'Introduced prefix-function search in O(n + m) without backtracking.' },
  { title: '1977: Boyer-Moore', detail: 'Bad-character and good-suffix shifts made pattern skipping practical on long texts.' },
  { title: '1975-1976: Aho-Corasick', detail: 'Automaton for multi-pattern search with output links; ideal for lexicons.' },
  { title: '1990: Suffix array (Manber, Myers)', detail: 'Array + LCP replaced suffix trees with better memory locality.' },
  { title: '1994: Rabin-Karp popularization', detail: 'Rolling hashes enabled fast plagiarism and multi-pattern scans.' },
  { title: '2000s: FM-index/BWT', detail: 'Compressed full-text search became standard in genomics and big-text search.' },
]

const pillars = [
  {
    title: 'Deterministic preprocessing',
    detail: 'Prefix tables, LCP, and automata must be built in linear or n log n time with no ambiguity about encoding.',
  },
  {
    title: 'Canonical text handling',
    detail: 'Normalize Unicode (NFC/NFD), decide on case folding, and define alphabet before hashing or building automata.',
  },
  {
    title: 'Collision discipline',
    detail: 'Rolling hashes need secondary verification; choose bases/moduli to minimize collisions and avoid overflow.',
  },
  {
    title: 'Boundary safety',
    detail: 'Off-by-one errors at pattern/text boundaries or sentinel handling break correctness; indexes need clear sentinels.',
  },
  {
    title: 'Memory locality',
    detail: 'Prefer arrays over pointer-heavy trees; cache-friendly layouts keep throughput high on large corpora.',
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
  { approach: 'KMP / Z-algorithm', time: 'O(n + m)', space: 'O(m)', note: 'Linear scan with prefix/Z preprocessing.' },
  { approach: 'Boyer-Moore (full heuristics)', time: 'O(n / m) avg', space: 'O(|Sigma| + m)', note: 'Skips on mismatches; worst-case O(nm).' },
  { approach: 'Rabin-Karp rolling hash', time: 'O(n + m)', space: 'O(1)', note: 'Expected linear; collisions require verification.' },
  { approach: 'Suffix array construction (SA-IS)', time: 'O(n)', space: 'O(n)', note: 'Practical n log n (prefix-doubling) is common.' },
  { approach: 'Aho-Corasick (multi-pattern)', time: 'O(n + z)', space: 'O(total patterns)', note: 'z outputs; streaming, failure links guide jumps.' },
  { approach: 'Suffix automaton', time: 'O(n)', space: 'O(n)', note: 'All substrings represented; answers existence/longest queries fast.' },
]

const applications = [
  {
    title: 'IDE search and autocomplete',
    detail: 'Prefix tries and suffix arrays back fuzzy finders; fast substring checks enable instant results as you type.',
  },
  {
    title: 'Plagiarism and clone detection',
    detail: 'Rolling hashes and suffix arrays compare many documents efficiently; collisions are mitigated with double hashes.',
  },
  {
    title: 'Security scanning',
    detail: 'Aho-Corasick scans traffic or binaries for signatures in one pass with bounded memory.',
  },
  {
    title: 'Genome substring queries',
    detail: 'Suffix arrays/FM-index let large genomes be searched for motifs or read seeds without loading all sequences.',
  },
  {
    title: 'Log and telemetry parsing',
    detail: 'Streaming matchers detect patterns in unbounded logs; failure links keep latency flat as volume spikes.',
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
    detail: 'Combining LCP with RMQ answers longest common prefix of any two suffixes in O(1) after O(n) prep.',
  },
  {
    title: 'Suffix automaton for LCS',
    detail: 'Build SAM on one string, traverse with another to find longest common substring in linear time.',
  },
  {
    title: 'FM-index with wavelet trees',
    detail: 'Adds rank/select over compressed text for backward search with tiny memory footprint.',
  },
  {
    title: 'Bitset-accelerated DP',
    detail: 'Shift-Or/Bitap uses word-level ops for approximate matching on short patterns at very high speed.',
  },
  {
    title: 'Double-hash and 128-bit mixing',
    detail: 'Reduces collision probability when rolling hashes are used for deduplication or integrity checks.',
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

export default function StringAlgorithmsPage(): JSX.Element {
  return (
    <TopicLayout
      title="String Algorithms"
      subtitle="Pattern search, indexing, and text rigor"
      intro="From single-pattern scans to compressed full-text search, string algorithms trade preprocessing for predictable queries. The right normalization, hashing discipline, and indexes keep results correct at scale."
    >
      <TopicSection heading="Big picture">
        <div className="grid gap-3 md:grid-cols-2">
          {bigPicture.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
              <p className="text-xs text-white/60">{item.note}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="History">
        <div className="grid gap-3 md:grid-cols-2">
          {history.map((event) => (
            <article key={event.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{event.title}</h3>
              <p className="text-sm text-white/80">{event.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Core pillars and mental hooks">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            {pillars.map((pillar) => (
              <article key={pillar.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h3 className="text-sm font-semibold text-white">{pillar.title}</h3>
                <p className="text-sm text-white/80">{pillar.detail}</p>
              </article>
            ))}
          </div>
          <div className="space-y-3">
            {mentalModels.map((model) => (
              <article key={model.title} className="rounded-lg bg-white/5 p-4">
                <h3 className="text-sm font-semibold text-white">{model.title}</h3>
                <p className="text-sm text-white/80">{model.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </TopicSection>

      <TopicSection heading="How it works">
        <div className="grid gap-3 md:grid-cols-2">
          {howItWorks.map((item) => (
            <article key={item.step} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/70">{item.step}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Complexity reference">
        <div className="overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full text-left text-sm text-white/80">
            <thead className="bg-white/10 text-xs uppercase tracking-wide text-white/70">
              <tr>
                <th className="px-4 py-2">Approach</th>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Space</th>
                <th className="px-4 py-2">Note</th>
              </tr>
            </thead>
            <tbody>
              {complexityTable.map((row) => (
                <tr key={row.approach} className="odd:bg-white/5">
                  <td className="px-4 py-2 font-semibold text-white">{row.approach}</td>
                  <td className="px-4 py-2">{row.time}</td>
                  <td className="px-4 py-2">{row.space}</td>
                  <td className="px-4 py-2 text-white/70">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TopicSection>

      <TopicSection heading="Applications">
        <div className="grid gap-3 md:grid-cols-2">
          {applications.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
        <div className="mt-4 rounded-lg border border-red-500/50 bg-red-500/10 p-4">
          <p className="text-sm font-semibold text-white">{failureCallout.title}</p>
          <p className="text-sm text-red-100">{failureCallout.detail}</p>
        </div>
      </TopicSection>

      <TopicSection heading="Pitfalls">
        <ul className="space-y-2 text-sm text-white/80">
          {pitfalls.map((item) => (
            <li key={item} className="rounded-lg bg-white/5 p-3">
              {item}
            </li>
          ))}
        </ul>
      </TopicSection>

      <TopicSection heading="When to use what">
        <ul className="space-y-2 text-sm text-white/80">
          {whenToUse.map((item) => (
            <li key={item} className="rounded-lg border border-white/10 bg-white/5 p-3">
              {item}
            </li>
          ))}
        </ul>
      </TopicSection>

      <TopicSection heading="Advanced moves">
        <div className="grid gap-3 md:grid-cols-2">
          {advanced.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Code examples">
        <div className="grid gap-3 md:grid-cols-2">
          {codeExamples.map((example) => (
            <article key={example.title} className="space-y-2 rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{example.title}</p>
              <pre className="overflow-x-auto rounded bg-black/40 p-3 text-xs text-white">
                <code>{example.code}</code>
              </pre>
              <p className="text-xs text-white/70">{example.explanation}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Key takeaways">
        <div className="grid gap-3 md:grid-cols-2">
          {keyTakeaways.map((item) => (
            <article key={item} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item}</p>
            </article>
          ))}
        </div>
      </TopicSection>
    </TopicLayout>
  )
}
