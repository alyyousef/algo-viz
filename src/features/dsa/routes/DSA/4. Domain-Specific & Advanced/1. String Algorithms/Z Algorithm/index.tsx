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
    title: 'Prefix-function ideas emerge (1970s)',
    detail:
      'Researchers explored linear-time string preprocessing to avoid repeated comparisons.',
  },
  {
    title: 'Z algorithm formalized (1980s)',
    detail:
      'The Z-array provided a direct way to measure prefix matches at every position.',
  },
  {
    title: 'Used alongside KMP (1990s)',
    detail:
      'Z preprocessing became a common alternative to KMP for pattern matching tasks.',
  },
  {
    title: 'Modern use in pattern-heavy tasks (2000s+)',
    detail:
      'Problems involving repetitions, borders, and pattern concatenation often use Z values.',
  },
]

const mentalModels = [
  {
    title: 'Prefix match length at every index',
    detail:
      'Z[i] tells how many characters starting at i match the prefix of the string.',
  },
  {
    title: 'Window reuse (Z-box)',
    detail:
      'Maintain a window [L, R] where matches with the prefix are known and reuse them.',
  },
  {
    title: 'One preprocessing, many answers',
    detail:
      'Once you compute Z, you can answer pattern occurrences and border queries quickly.',
  },
]

const coreComponents = [
  {
    heading: 'Z-array',
    bullets: [
      'Z[i] = length of longest substring starting at i that matches the prefix.',
      'Z[0] is usually 0 or n by convention.',
      'Computed in O(n) with the Z-box technique.',
    ],
  },
  {
    heading: 'Z-box window',
    bullets: [
      'A window [L, R] where s[L..R] matches the prefix.',
      'If i is inside the box, reuse Z[i-L] to skip comparisons.',
      'Extend the box only when needed.',
    ],
  },
  {
    heading: 'Pattern matching trick',
    bullets: [
      'Build string: pattern + "$" + text.',
      'Any index with Z[i] == pattern.length is a match.',
      'Works in linear time for single pattern search.',
    ],
  },
  {
    heading: 'Borders and repeats',
    bullets: [
      'A border is a prefix that is also a suffix.',
      'Z values reveal borders and repetitions in the string.',
      'Useful in compression and periodicity checks.',
    ],
  },
]

const buildSteps = [
  {
    title: 'Initialize L and R',
    detail:
      'Set L = R = 0. These track the rightmost segment matching the prefix.',
  },
  {
    title: 'Reuse inside the box',
    detail:
      'If i <= R, start with Z[i] = min(R - i + 1, Z[i - L]).',
  },
  {
    title: 'Expand when needed',
    detail:
      'While characters match, increment Z[i] and move R forward.',
  },
  {
    title: 'Update the box',
    detail:
      'If i + Z[i] - 1 > R, set L = i and R = i + Z[i] - 1.',
  },
]

const matchSteps = [
  {
    title: 'Concatenate pattern and text',
    detail:
      'Build combined string: pattern + "$" + text to keep matches aligned.',
  },
  {
    title: 'Compute Z array',
    detail:
      'Run the Z algorithm on the combined string in linear time.',
  },
  {
    title: 'Scan for matches',
    detail:
      'Any Z value equal to pattern length indicates a match in the text.',
  },
  {
    title: 'Translate indices',
    detail:
      'Convert the combined index back to text positions.',
  },
]

const complexityNotes = [
  {
    title: 'Preprocessing time',
    detail:
      'O(n) for a string of length n using the Z-box trick.',
  },
  {
    title: 'Search time',
    detail:
      'O(n + m) for a pattern of length m and text length n.',
  },
  {
    title: 'Memory cost',
    detail:
      'O(n) for the Z array.',
  },
  {
    title: 'Comparable to KMP',
    detail:
      'Z is often simpler to implement and is equally linear for single patterns.',
  },
]

const realWorldUses = [
  {
    context: 'Substring search',
    detail:
      'Find all occurrences of a pattern in a text with linear preprocessing.',
  },
  {
    context: 'String periodicity',
    detail:
      'Detect repetitions and smallest periods using Z values.',
  },
  {
    context: 'DNA analysis',
    detail:
      'Fast prefix matching across large genome sequences.',
  },
  {
    context: 'Compression tools',
    detail:
      'Borders and repeats help identify redundant sections for encoding.',
  },
]

const examples = [
  {
    title: 'Build the Z array',
    code: `// Pseudocode
function buildZ(s):
    n = s.length
    z = array(n, 0)
    L = 0
    R = 0
    for i in 1..n-1:
        if i <= R:
            z[i] = min(R - i + 1, z[i - L])
        while i + z[i] < n and s[z[i]] == s[i + z[i]]:
            z[i] += 1
        if i + z[i] - 1 > R:
            L = i
            R = i + z[i] - 1
    return z`,
    explanation:
      'The Z-box [L, R] lets you reuse previous comparisons to stay linear.',
  },
  {
    title: 'Pattern matching with Z',
    code: `// Pseudocode
function findAll(text, pattern):
    combined = pattern + "$" + text
    z = buildZ(combined)
    for i in 0..combined.length-1:
        if z[i] == pattern.length:
            report(i - pattern.length - 1)`,
    explanation:
      'Matches correspond to Z values equal to the pattern length.',
  },
  {
    title: 'Border detection',
    code: `// If z[n - k] == k, then length-k prefix is a suffix.
// Use Z values to list all borders.`,
    explanation:
      'Borders are prefixes that appear at the end; Z reveals them directly.',
  },
]

const pitfalls = [
  'Forgetting to reset L and R when extending the Z-box.',
  'Using the wrong delimiter between pattern and text, causing false matches.',
  'Assuming Z[0] has a meaningful value; it is often unused.',
  'Using Z for multi-pattern search; Aho-Corasick is better.',
  'Mixing 0-based and 1-based indices in translations.',
]

const decisionGuidance = [
  'Need linear-time single-pattern search with simple preprocessing.',
  'Want border or repetition analysis of a string.',
  'Prefer a compact, readable algorithm compared to KMP.',
  'Working with concatenation tricks for multiple queries.',
  'If you need guaranteed worst-case and already know KMP, either is fine.',
]

const advancedInsights = [
  {
    title: 'Z vs prefix-function',
    detail:
      'Z array and prefix function carry similar information but are more convenient for different problems.',
  },
  {
    title: 'Multiple queries',
    detail:
      'Build combined strings to answer several pattern searches by reusing Z computations.',
  },
  {
    title: 'Streaming limitations',
    detail:
      'Z is not naturally streaming; you need the full string to compute values.',
  },
  {
    title: 'Linear-time proofs',
    detail:
      'Total comparisons are bounded because R only moves forward across the string.',
  },
]

const takeaways = [
  'Z algorithm computes prefix matches at every position in linear time.',
  'Great for single-pattern search and repetition analysis.',
  'Uses a Z-box window to avoid redundant comparisons.',
  'Pairs well with concatenation tricks for simple pattern matching.',
]

export default function ZAlgorithmPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Z Algorithm</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Linear-time prefix matching for pattern search</div>
              <p className="win95-text">
                The Z algorithm computes, for every index, how long the substring matches the prefix. With a clever Z-box window,
                it avoids redundant comparisons and powers fast pattern matching, border detection, and repetition analysis.
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
                Z turns a string into an array of prefix match lengths. That single preprocessing step provides immediate answers
                to many classic string tasks, including pattern search and border discovery, all in linear time.
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
            <legend>Z-box construction</legend>
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
                The Z-box is the key: it stores a verified matching segment to reuse comparisons.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Pattern matching workflow</legend>
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
                Z offers linear preprocessing and clean pattern-matching tricks, but needs the full string up front.
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
