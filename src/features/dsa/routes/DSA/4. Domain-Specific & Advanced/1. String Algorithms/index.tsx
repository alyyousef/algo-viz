import { Link } from 'react-router-dom'
import type { JSX } from 'react'

const win95Styles = `
.win95-page {
  min-height: 100vh;
  background: #C0C0C0;
  padding: 0;
  color: #000;
  font-family: 'MS Sans Serif', 'Tahoma', sans-serif;
  -webkit-font-smoothing: none;
}

.win95-page * {
  box-sizing: border-box;
}

.win95-page a {
  color: #000;
  text-decoration: none;
}

.win95-page a:hover {
  text-decoration: underline;
}

.win95-window {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  background: #C0C0C0;
  box-shadow: none;
  border-radius: 0;
}

.win95-titlebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #000080;
  color: #fff;
  padding: 4px 6px;
  font-weight: 700;
  font-size: 13px;
  line-height: 1;
}

.win95-title {
  display: inline-block;
}

.win95-title-controls {
  display: flex;
  gap: 4px;
}

.win95-control {
  width: 22px;
  height: 20px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  border-radius: 0;
  font-weight: 700;
  font-size: 12px;
  line-height: 1;
  padding: 0;
  cursor: pointer;
}

.win95-control:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-control:focus,
.win95-button:focus {
  outline: 1px dotted #000;
  outline-offset: -3px;
}

.win95-content {
  padding: 10px;
}

.win95-header-row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: flex-start;
  margin-bottom: 8px;
}

.win95-button {
  padding: 3px 10px 2px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  border-radius: 0;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  line-height: 1.2;
}

.win95-button:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-fieldset {
  border: 2px solid;
  border-color: #808080 #404040 #404040 #808080;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 0;
  background: #C0C0C0;
}

.win95-fieldset legend {
  padding: 0 6px;
  font-weight: 700;
  font-size: 12px;
}

.win95-grid {
  display: grid;
  gap: 6px;
}

.win95-grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.win95-grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
}

.win95-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 8px;
}

.win95-panel {
  border: 2px solid;
  border-color: #808080 #fff #fff #808080;
  background: #C0C0C0;
  padding: 8px;
  border-radius: 0;
}

.win95-panel--raised {
  border-color: #fff #404040 #404040 #fff;
}

.win95-heading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 4px;
}

.win95-subheading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 6px;
}

.win95-text {
  font-size: 12px;
  line-height: 1.35;
  margin: 0 0 6px;
}

.win95-stack {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.win95-list {
  margin: 0;
  padding-left: 18px;
  font-size: 12px;
  line-height: 1.35;
}

.win95-list li {
  margin-bottom: 4px;
}

.win95-list--numbered {
  list-style: decimal;
}

.win95-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.win95-table th,
.win95-table td {
  border: 1px solid #808080;
  padding: 6px 6px 4px;
  text-align: left;
}

.win95-table th {
  font-weight: 700;
}

.win95-code {
  margin: 6px 0;
  background: #C0C0C0;
  color: #000;
  padding: 8px;
  font-family: 'Courier New', monospace;
  font-size: 11px;
  border: 2px solid;
  border-color: #404040 #fff #fff #404040;
  overflow-x: auto;
  border-radius: 0;
}
`

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
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">String Algorithms</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Pattern search, indexing, and text rigor</div>
              <p className="win95-text">
                From single-pattern scans to compressed full-text search, string algorithms trade preprocessing for predictable queries.
                The right normalization, hashing discipline, and indexes keep results correct at scale.
              </p>
            </div>
            <Link to="/algoViz" className="win95-button" role="button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-fieldset">
            <legend>Big picture</legend>
            <div className="win95-grid win95-grid-2">
              {bigPicture.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                  <p className="win95-text">{item.note}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>History</legend>
            <div className="win95-grid win95-grid-2">
              {history.map((event) => (
                <div key={event.title} className="win95-panel">
                  <div className="win95-heading">{event.title}</div>
                  <p className="win95-text">{event.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Core pillars and mental hooks</legend>
            <div className="win95-row">
              <div className="win95-stack">
                {pillars.map((pillar) => (
                  <div key={pillar.title} className="win95-panel">
                    <div className="win95-heading">{pillar.title}</div>
                    <p className="win95-text">{pillar.detail}</p>
                  </div>
                ))}
              </div>
              <div className="win95-stack">
                {mentalModels.map((model) => (
                  <div key={model.title} className="win95-panel">
                    <div className="win95-heading">{model.title}</div>
                    <p className="win95-text">{model.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works</legend>
            <div className="win95-grid win95-grid-2">
              {howItWorks.map((item) => (
                <div key={item.step} className="win95-panel">
                  <div className="win95-heading">{item.step}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity reference</legend>
            <div className="win95-panel">
              <table className="win95-table">
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
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Applications</legend>
            <div className="win95-grid win95-grid-2">
              {applications.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <div className="win95-heading">{failureCallout.title}</div>
              <p className="win95-text">{failureCallout.detail}</p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Pitfalls</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {pitfalls.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>When to use what</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                {whenToUse.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Advanced moves</legend>
            <div className="win95-grid win95-grid-2">
              {advanced.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Code examples</legend>
            <div className="win95-stack">
              {codeExamples.map((example) => (
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
            <legend>Key takeaways</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {keyTakeaways.map((item) => (
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
