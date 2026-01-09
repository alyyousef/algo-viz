import type { JSX } from 'react'

import { Link } from 'react-router-dom'

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

const historicalMilestones = [
  {
    title: 'Hashing popularized in search (1970s)',
    detail:
      'Rolling hashes introduced a way to compare substrings by numeric fingerprints instead of character-by-character scans.',
  },
  {
    title: 'Rabin and Karp publish the algorithm (1987)',
    detail:
      'They formalize a hash-based string search that can check many alignments quickly with rolling updates.',
  },
  {
    title: 'Used in plagiarism and document search (1990s)',
    detail:
      'Fingerprinting substrings enabled fast similarity detection and large-scale document comparison.',
  },
  {
    title: 'Modern use in deduplication and streaming (2000s+)',
    detail:
      'Chunking and content-defined fingerprints for storage systems rely on rolling hash ideas.',
  },
]

const mentalModels = [
  {
    title: 'Fingerprint each window',
    detail:
      'Compute a hash for the current text window and compare it to the pattern hash before doing an exact check.',
  },
  {
    title: 'Sliding window arithmetic',
    detail:
      'A rolling hash updates the window hash in O(1) by removing the old character and adding the new one.',
  },
  {
    title: 'Hash first, verify later',
    detail:
      'Hashes can collide, so a match on hash is only a candidate that must be verified with real comparison.',
  },
]

const coreComponents = [
  {
    heading: 'Rolling hash',
    bullets: [
      'Treat the window as a base-B number modulo M.',
      'Hash update: remove leading char contribution, multiply by base, add new char.',
      'Choose large prime modulus to reduce collisions.',
    ],
  },
  {
    heading: 'Window alignment',
    bullets: [
      'Slide a fixed-length window across the text.',
      'When window hash equals pattern hash, do a direct comparison.',
      'If the hashes differ, you skip character checks.',
    ],
  },
  {
    heading: 'Collision handling',
    bullets: [
      'Hash equality is not proof; verify to avoid false positives.',
      'Double hashing reduces collision probability.',
      'Worst-case degrades to O(n*m) if many collisions.',
    ],
  },
  {
    heading: 'Parameter choices',
    bullets: [
      'Base is often alphabet size or a random small integer.',
      'Modulus should fit in 64-bit arithmetic to avoid overflow.',
      'Precompute base^(m-1) for removing leading char.',
    ],
  },
]

const buildSteps = [
  {
    title: 'Pick base and modulus',
    detail:
      'Choose a base (e.g., 256) and a large prime modulus; precompute base^(m-1) mod M.',
  },
  {
    title: 'Hash the pattern',
    detail:
      'Compute the polynomial hash of the pattern of length m.',
  },
  {
    title: 'Hash the first window',
    detail:
      'Compute the hash of text[0..m-1] using the same base and modulus.',
  },
  {
    title: 'Prepare rolling update',
    detail:
      'Use the formula: newHash = (oldHash - lead*power) * base + newChar (mod M).',
  },
]

const matchSteps = [
  {
    title: 'Compare hashes',
    detail:
      'If window hash equals the pattern hash, verify with direct character comparison.',
  },
  {
    title: 'Slide the window',
    detail:
      'Update the hash in O(1) using the rolling formula and move one character forward.',
  },
  {
    title: 'Repeat to the end',
    detail:
      'Each step does O(1) hash work plus occasional verification.',
  },
  {
    title: 'Report matches',
    detail:
      'When verification succeeds, the window start index is a match.',
  },
]

const complexityNotes = [
  {
    title: 'Average time',
    detail:
      'Expected O(n + m) with good hash choices; most windows are discarded by hash mismatch.',
  },
  {
    title: 'Worst-case time',
    detail:
      'O(n*m) when many hash collisions or adversarial input.',
  },
  {
    title: 'Memory cost',
    detail:
      'O(1) beyond the pattern and a few constants.',
  },
  {
    title: 'Good for many patterns',
    detail:
      'Multiple pattern hashes can be compared quickly for the same window length.',
  },
]

const realWorldUses = [
  {
    context: 'Plagiarism detection',
    detail:
      'Fingerprinting substrings helps compare large documents efficiently.',
  },
  {
    context: 'Deduplication systems',
    detail:
      'Rolling hashes locate chunk boundaries and detect repeated blocks in storage.',
  },
  {
    context: 'Search in large logs',
    detail:
      'Quickly reject non-matching windows before performing heavier checks.',
  },
  {
    context: 'Multimatch with same length',
    detail:
      'If many patterns have equal length, compare window hash against a set of pattern hashes.',
  },
]

const examples = [
  {
    title: 'Rolling hash setup',
    code: `// Pseudocode
function hashOf(s, base, mod):
    h = 0
    for ch in s:
        h = (h * base + code(ch)) % mod
    return h`,
    explanation:
      'Polynomial rolling hash treats the string like a base-B number in modular arithmetic.',
  },
  {
    title: 'Rabin-Karp search',
    code: `// Pseudocode
function search(text, pattern):
    m = pattern.length
    base = 256
    mod = 1_000_000_007
    power = pow(base, m - 1) % mod
    patHash = hashOf(pattern, base, mod)
    winHash = hashOf(text[0..m-1], base, mod)
    for i in 0..text.length - m:
        if winHash == patHash and text[i..i+m-1] == pattern:
            report(i)
        if i < text.length - m:
            lead = code(text[i])
            next = code(text[i + m])
            winHash = (winHash - lead * power) % mod
            if winHash < 0: winHash += mod
            winHash = (winHash * base + next) % mod`,
    explanation:
      'Hashes filter candidates; direct comparison confirms matches to avoid collision errors.',
  },
  {
    title: 'Double hashing',
    code: `// Use two moduli to reduce collisions
if hash1 == patHash1 and hash2 == patHash2:
    verify characters`,
    explanation:
      'Two independent hashes drastically reduce collision probability in practice.',
  },
]

const pitfalls = [
  'Skipping verification after hash match; collisions can cause false positives.',
  'Using a small modulus or base that increases collision probability.',
  'Forgetting to normalize negative values after subtraction in modular arithmetic.',
  'Applying Rabin-Karp for many different pattern lengths without rehashing.',
  'Assuming worst-case is linear; adversarial inputs can still degrade performance.',
]

const decisionGuidance = [
  'Need fast average-case single-pattern search with a simple implementation.',
  'Searching for many equal-length patterns in the same text.',
  'You can tolerate probabilistic hashing and verify matches.',
  'Input is huge and you want to filter most windows quickly.',
  'If worst-case guarantees are required, prefer KMP.',
]

const advancedInsights = [
  {
    title: 'Content-defined chunking',
    detail:
      'Rolling hashes can detect boundaries based on hash properties, enabling block-level deduplication.',
  },
  {
    title: 'Unicode and large alphabets',
    detail:
      'Map code points consistently; consider hashing bytes after normalization for stability.',
  },
  {
    title: 'Modular arithmetic safety',
    detail:
      'Use 64-bit integers or bigint to prevent overflow when computing (hash * base + char).',
  },
  {
    title: 'Hybrid strategies',
    detail:
      'Use Rabin-Karp to filter candidates, then switch to KMP or direct compare for verification.',
  },
]

const takeaways = [
  'Rabin-Karp uses rolling hashes to compare many alignments quickly.',
  'It is fast on average but needs verification to avoid collision errors.',
  'Choosing base and modulus well is critical to reliability.',
  'Great for equal-length multi-pattern search and large-scale filtering.',
]

export default function RabinKarpPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Rabin-Karp</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Rolling hash search with fast average-case performance</div>
              <p className="win95-text">
                Rabin-Karp compares substrings by hash instead of direct character checks. A rolling hash lets the algorithm
                slide a window across the text in O(1) per step, only verifying actual characters when hashes match.
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
                Rabin-Karp turns substring search into hash comparison. It precomputes a hash for the pattern and then uses a rolling
                hash to update the text window efficiently. Hash matches are candidates; direct comparison confirms true matches.
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
            <legend>How it works: core components</legend>
            <div className="win95-grid win95-grid-3">
              {coreComponents.map((block) => (
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
            <legend>Hash setup workflow</legend>
            <div className="win95-grid win95-grid-2">
              {buildSteps.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                The base and modulus define the fingerprint. Good choices reduce collisions and keep hashing stable.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Matching workflow</legend>
            <div className="win95-grid win95-grid-2">
              {matchSteps.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity analysis and tradeoffs</legend>
            <div className="win95-grid win95-grid-2">
              {complexityNotes.map((note) => (
                <div key={note.title} className="win95-panel">
                  <div className="win95-heading">{note.title}</div>
                  <p className="win95-text">{note.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                Rabin-Karp is fast on average but depends on good hashing to keep collisions rare.
              </p>
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
