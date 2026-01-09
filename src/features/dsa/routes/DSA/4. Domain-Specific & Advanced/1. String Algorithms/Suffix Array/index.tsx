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
    detail:
      'Algorithms like SA-IS and DC3 showed that suffix arrays can be built in O(n) time.',
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
    detail:
      'A suffix array stores the starting indices of all suffixes in lexicographic order.',
  },
  {
    title: 'Binary search on text',
    detail:
      'With suffixes sorted, you can binary search for any pattern by comparing against suffixes.',
  },
  {
    title: 'Suffix tree without pointers',
    detail:
      'Suffix arrays are a compact alternative to suffix trees when you add the LCP array.',
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
    detail:
      'Sort suffixes by the pair (rank[i], rank[i + 2^k]) and update ranks.',
  },
  {
    title: 'Double until complete',
    detail:
      'Increase k each round until the ranks are unique or 2^k >= n.',
  },
  {
    title: 'Build LCP',
    detail:
      'Use Kasai algorithm to compute LCP in linear time from SA and rank.',
  },
]

const querySteps = [
  {
    title: 'Binary search the suffix array',
    detail:
      'Compare the pattern against suffixes at midpoints to narrow a match range.',
  },
  {
    title: 'Locate match interval',
    detail:
      'Find the leftmost and rightmost suffixes with the pattern as a prefix.',
  },
  {
    title: 'Report occurrences',
    detail:
      'All suffix indices in the interval are match positions.',
  },
  {
    title: 'Use LCP for speedups',
    detail:
      'LCP can reduce repeated comparisons in range queries and advanced tasks.',
  },
]

const complexityNotes = [
  {
    title: 'Construction time',
    detail:
      'O(n log n) with prefix-doubling sorts; O(n) with advanced algorithms.',
  },
  {
    title: 'Search time',
    detail:
      'O(m log n) for pattern length m using binary search comparisons.',
  },
  {
    title: 'Memory cost',
    detail:
      'O(n) for SA, rank, and LCP arrays, typically much smaller than suffix trees.',
  },
  {
    title: 'Best when text is reused',
    detail:
      'Upfront build cost amortizes across many queries and analyses.',
  },
]

const realWorldUses = [
  {
    context: 'Full-text search',
    detail:
      'Index large documents for substring queries and autocomplete features.',
  },
  {
    context: 'Bioinformatics',
    detail:
      'Find motifs and repeated patterns in DNA or protein sequences.',
  },
  {
    context: 'Compression',
    detail:
      'Burrows-Wheeler Transform relies on suffix ordering for block sorting.',
  },
  {
    context: 'Plagiarism detection',
    detail:
      'Repeated substring detection and longest-common-substring analysis.',
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
    explanation:
      'LCP compares neighboring suffixes in SA order with linear overall work.',
  },
  {
    title: 'Pattern search',
    code: `// Binary search for pattern "ana" in "banana"
// SA: [5, 3, 1, 0, 4, 2] -> ["a","ana","anana","banana","na","nana"]
// Match interval is indices 1..2 -> starts at 3 and 1.`,
    explanation:
      'Binary search finds the interval of suffixes with the pattern as a prefix.',
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
    detail:
      'Induced sorting builds suffix arrays in O(n) time, but implementation is complex.',
  },
  {
    title: 'Range minimum on LCP',
    detail:
      'RMQ on LCP enables fast longest common prefix queries between any two suffixes.',
  },
  {
    title: 'BWT connection',
    detail:
      'The Burrows-Wheeler Transform is derived from the suffix array order.',
  },
  {
    title: 'Compressed suffix arrays',
    detail:
      'FM-index and related structures compress SA while supporting fast queries.',
  },
]

const takeaways = [
  'Suffix arrays store sorted suffix indices, enabling fast substring search with low memory.',
  'LCP adds powerful queries like longest repeated substring and LRS/LCS variants.',
  'Construction cost is upfront and pays off when text is reused.',
  'Choose suffix arrays when you need indexing power without suffix tree overhead.',
]

export default function SuffixArrayPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Suffix Array</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Compact indexing for fast substring search</div>
              <p className="win95-text">
                A suffix array stores the starting positions of every suffix in sorted order, letting you binary search
                for any pattern as if you had sorted all suffixes. Pair it with the LCP array and you get many suffix-tree
                capabilities using only arrays and simple comparisons.
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
                A suffix array is a sorted index of all suffixes of a string. With this sorted list, substring queries reduce
                to binary searches and prefix comparisons. It offers strong querying power with less memory than suffix trees.
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
            <legend>Construction workflow</legend>
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
                Most practical builds use prefix doubling for simplicity; linear-time builds exist if you need top-end performance.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Query workflow</legend>
            <div className="win95-grid win95-grid-2">
              {querySteps.map((item) => (
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
                Suffix arrays balance build cost with compact memory and fast repeated queries.
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
