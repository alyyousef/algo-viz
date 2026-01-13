import type { JSX } from 'react'

import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'


const historicalMilestones = [
  {
    title: 'Suffix tree concept emerges (early 1970s)',
    detail:
      'Weiner introduced compact suffix trees, showing that all suffixes can be indexed in linear space.',
  },
  {
    title: 'McCreight’s linear-time construction (1976)',
    detail:
      'McCreight devised a practical algorithm that builds a suffix tree in O(n) time.',
  },
  {
    title: 'Ukkonen’s online algorithm (1992)',
    detail:
      'Ukkonen provided an incremental, streaming construction widely used in practice.',
  },
  {
    title: 'Adoption in search and genomics (2000s+)',
    detail:
      'Suffix trees became a staple for large-scale substring and pattern analysis tasks.',
  },
]

const mentalModels = [
  {
    title: 'Trie of all suffixes, compressed',
    detail:
      'A suffix tree is a trie of all suffixes with chains compressed into single edges.',
  },
  {
    title: 'Index once, query fast',
    detail:
      'Build the tree once, then answer substring queries by walking edges.',
  },
  {
    title: 'Every path spells a substring',
    detail:
      'Any path from the root corresponds to a substring of the text.',
  },
]

const coreComponents = [
  {
    heading: 'Nodes and edges',
    bullets: [
      'Edges are labeled by text intervals, not stored strings.',
      'Internal nodes represent branching on next characters.',
      'Leaves represent suffixes with their starting indices.',
    ],
  },
  {
    heading: 'Suffix links',
    bullets: [
      'Each internal node links to the node of its longest proper suffix.',
      'Suffix links enable linear-time construction.',
      'They speed repeated insertions in online algorithms.',
    ],
  },
  {
    heading: 'Implicit tree structure',
    bullets: [
      'Edge labels use (start, end) pointers into the original text.',
      'This keeps memory at O(n) while supporting fast traversal.',
      'Sentinel characters ensure every suffix ends at a unique leaf.',
    ],
  },
  {
    heading: 'LCP and traversal',
    bullets: [
      'Depth of a node corresponds to the length of its substring.',
      'LCPs arise naturally from shared paths.',
      'Traversal answers substring, repeated substring, and LCS queries.',
    ],
  },
]

const buildSteps = [
  {
    title: 'Append a sentinel',
    detail:
      'Add a unique terminal character to ensure no suffix is a prefix of another.',
  },
  {
    title: 'Insert suffixes incrementally',
    detail:
      'Online methods (Ukkonen) add one character at a time, updating the tree.',
  },
  {
    title: 'Use suffix links',
    detail:
      'Suffix links jump between related nodes to maintain linear-time insertion.',
  },
  {
    title: 'Maintain edge intervals',
    detail:
      'Edges store start/end indices into the text, keeping storage compact.',
  },
]

const querySteps = [
  {
    title: 'Match the pattern along edges',
    detail:
      'Walk down edges, comparing pattern characters to edge labels.',
  },
  {
    title: 'Verify full match',
    detail:
      'If the pattern is consumed, the match exists in the text.',
  },
  {
    title: 'Report occurrences',
    detail:
      'All leaf descendants of the match node give starting indices.',
  },
  {
    title: 'Use depths for analytics',
    detail:
      'Deepest internal node yields longest repeated substring.',
  },
]

const complexityNotes = [
  {
    title: 'Construction time',
    detail:
      'O(n) with Ukkonen or McCreight; more complex to implement than suffix arrays.',
  },
  {
    title: 'Search time',
    detail:
      'O(m) to check a pattern of length m, plus reporting occurrences.',
  },
  {
    title: 'Memory cost',
    detail:
      'O(n) nodes and edges, but large constant factors due to pointers and maps.',
  },
  {
    title: 'Best for rich queries',
    detail:
      'Great when you need many substring and LCP-style queries on a fixed text.',
  },
]

const realWorldUses = [
  {
    context: 'Genomics',
    detail:
      'Fast motif and repeat detection in large DNA sequences.',
  },
  {
    context: 'Plagiarism detection',
    detail:
      'Longest common substring and repeated substring queries are natural.',
  },
  {
    context: 'Search engines',
    detail:
      'Index terms for fast substring lookup and autocomplete.',
  },
  {
    context: 'Data compression',
    detail:
      'Repeated substring detection helps optimize compression schemes.',
  },
]

const examples = [
  {
    title: 'Build with Ukkonen (outline)',
    code: `// High-level pseudocode
function buildSuffixTree(s):
    s += '$' // unique sentinel
    root = new Node()
    active = { node: root, edge: -1, length: 0 }
    remainder = 0
    for i in 0..s.length-1:
        remainder += 1
        lastNew = null
        while remainder > 0:
            // walk or split edges as needed
            // create new leaves, set suffix links
            remainder -= 1`,
    explanation:
      'Ukkonen’s algorithm is intricate but yields linear-time construction by reusing suffix links.',
  },
  {
    title: 'Substring search',
    code: `// Pseudocode
function contains(pattern):
    node = root
    i = 0
    while i < pattern.length:
        edge = node.next[pattern[i]]
        if edge is null: return false
        for k in edge.start..edge.end:
            if i == pattern.length: return true
            if pattern[i] != s[k]: return false
            i += 1
        node = edge.to
    return true`,
    explanation:
      'Walking edges compares the pattern against edge labels stored as text intervals.',
  },
  {
    title: 'Longest repeated substring',
    code: `// The deepest internal node gives the longest repeated substring.
// Track max depth during traversal and read the path labels.`,
    explanation:
      'Node depth equals substring length; internal nodes represent substrings that appear at least twice.',
  },
]

const pitfalls = [
  'Ignoring the sentinel leads to suffixes that are prefixes of others and breaks uniqueness.',
  'Storing explicit edge strings bloats memory; use intervals into the text.',
  'Using naive insertion without suffix links results in O(n^2) construction.',
  'Assuming suffix trees are always faster; for many tasks, suffix arrays are simpler and leaner.',
  'Forgetting to handle large alphabets efficiently in child maps.',
]

const decisionGuidance = [
  'Need fast O(m) substring existence queries on a fixed text.',
  'Require rich analytics: LRS, LCS, repeat counts, distinct substrings.',
  'Can afford larger constants in memory and code complexity.',
  'If you need a simpler structure, suffix arrays may be enough.',
  'For single-pattern search, KMP is cheaper to implement.',
]

const advancedInsights = [
  {
    title: 'Generalized suffix trees',
    detail:
      'Build a suffix tree over multiple strings to solve longest common substring problems.',
  },
  {
    title: 'Edge compression benefits',
    detail:
      'Compressed edges turn long chains into single edges, reducing height and speeding traversal.',
  },
  {
    title: 'Suffix array equivalence',
    detail:
      'Suffix arrays + LCP can answer many suffix-tree queries with lower memory.',
  },
  {
    title: 'Practical implementations',
    detail:
      'Many production systems prefer suffix arrays due to simpler code and better cache locality.',
  },
]

const takeaways = [
  'Suffix trees index all substrings with powerful linear-time query capabilities.',
  'They are complex to build but unmatched for rich substring analytics.',
  'Memory overhead is higher than suffix arrays; choose based on workload.',
  'Suffix links are the key to linear-time construction.',
]

export default function SuffixTreePage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Suffix Tree</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Compressed trie for fast substring analytics</div>
              <p className="win95-text">
                A suffix tree stores all suffixes of a string in a compact trie. By compressing chains and using suffix links,
                it supports fast substring queries and advanced analytics like longest repeated or common substrings.
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
                Suffix trees index every suffix of a string so that any substring corresponds to a path from the root. This lets you
                answer substring existence in O(m) time and power higher-level queries about repeats and similarities.
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
                Ukkonen’s online algorithm is the most practical linear-time build, but it is detailed to implement correctly.
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
                Suffix trees offer fast queries but carry larger constant factors than suffix arrays.
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

