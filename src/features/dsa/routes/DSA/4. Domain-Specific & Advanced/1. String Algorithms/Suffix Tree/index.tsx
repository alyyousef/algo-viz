import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

const historicalMilestones = [
  {
    title: 'Suffix tree concept emerges (early 1970s)',
    detail:
      'Weiner introduced compact suffix trees, showing that all suffixes can be indexed in linear space.',
  },
  {
    title: "McCreight's linear-time construction (1976)",
    detail: 'McCreight devised a practical algorithm that builds a suffix tree in O(n) time.',
  },
  {
    title: "Ukkonen's online algorithm (1992)",
    detail: 'Ukkonen provided an incremental, streaming construction widely used in practice.',
  },
  {
    title: 'Adoption in search and genomics (2000s+)',
    detail: 'Suffix trees became a staple for large-scale substring and pattern analysis tasks.',
  },
]

const mentalModels = [
  {
    title: 'Trie of all suffixes, compressed',
    detail: 'A suffix tree is a trie of all suffixes with chains compressed into single edges.',
  },
  {
    title: 'Index once, query fast',
    detail: 'Build the tree once, then answer substring queries by walking edges.',
  },
  {
    title: 'Every path spells a substring',
    detail: 'Any path from the root corresponds to a substring of the text.',
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
    detail: 'Add a unique terminal character to ensure no suffix is a prefix of another.',
  },
  {
    title: 'Insert suffixes incrementally',
    detail: 'Online methods (Ukkonen) add one character at a time, updating the tree.',
  },
  {
    title: 'Use suffix links',
    detail: 'Suffix links jump between related nodes to maintain linear-time insertion.',
  },
  {
    title: 'Maintain edge intervals',
    detail: 'Edges store start/end indices into the text, keeping storage compact.',
  },
]

const querySteps = [
  {
    title: 'Match the pattern along edges',
    detail: 'Walk down edges, comparing pattern characters to edge labels.',
  },
  {
    title: 'Verify full match',
    detail: 'If the pattern is consumed, the match exists in the text.',
  },
  {
    title: 'Report occurrences',
    detail: 'All leaf descendants of the match node give starting indices.',
  },
  {
    title: 'Use depths for analytics',
    detail: 'Deepest internal node yields longest repeated substring.',
  },
]

const complexityNotes = [
  {
    title: 'Construction time',
    detail: 'O(n) with Ukkonen or McCreight; more complex to implement than suffix arrays.',
  },
  {
    title: 'Search time',
    detail: 'O(m) to check a pattern of length m, plus reporting occurrences.',
  },
  {
    title: 'Memory cost',
    detail: 'O(n) nodes and edges, but large constant factors due to pointers and maps.',
  },
  {
    title: 'Best for rich queries',
    detail: 'Great when you need many substring and LCP-style queries on a fixed text.',
  },
]

const realWorldUses = [
  {
    context: 'Genomics',
    detail: 'Fast motif and repeat detection in large DNA sequences.',
  },
  {
    context: 'Plagiarism detection',
    detail: 'Longest common substring and repeated substring queries are natural.',
  },
  {
    context: 'Search engines',
    detail: 'Index terms for fast substring lookup and autocomplete.',
  },
  {
    context: 'Data compression',
    detail: 'Repeated substring detection helps optimize compression schemes.',
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
      "Ukkonen's algorithm is intricate but yields linear-time construction by reusing suffix links.",
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
    explanation: 'Walking edges compares the pattern against edge labels stored as text intervals.',
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
    detail: 'Build a suffix tree over multiple strings to solve longest common substring problems.',
  },
  {
    title: 'Edge compression benefits',
    detail:
      'Compressed edges turn long chains into single edges, reducing height and speeding traversal.',
  },
  {
    title: 'Suffix array equivalence',
    detail: 'Suffix arrays + LCP can answer many suffix-tree queries with lower memory.',
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

const quickGlossary = [
  {
    term: 'Suffix tree',
    definition:
      'A compressed trie containing all suffixes of a text, typically built with a unique terminal symbol.',
  },
  {
    term: 'Suffix link',
    definition:
      'A pointer from one internal node to the node representing its longest proper suffix.',
  },
  {
    term: 'Sentinel',
    definition: 'A unique terminal character appended to the text so every suffix ends distinctly.',
  },
  {
    term: 'Edge interval',
    definition:
      'A pair of text indices used to label an edge without storing a separate substring.',
  },
  {
    term: 'Internal node',
    definition: 'A branching node representing a substring shared by multiple suffixes.',
  },
  {
    term: 'Leaf',
    definition: 'A node representing one full suffix and usually carrying its starting index.',
  },
  {
    term: 'Active point',
    definition: "Ukkonen's state tuple that tracks where the next extension begins.",
  },
  {
    term: 'Generalized suffix tree',
    definition: 'A suffix tree built across multiple strings to answer shared-substring queries.',
  },
  {
    term: 'Longest repeated substring',
    definition: 'The substring corresponding to the deepest internal node in the suffix tree.',
  },
]

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const suffixTreeHelpStyles = `
.st-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.st-help-window {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: #c0c0c0;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  box-sizing: border-box;
}

.st-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 24px;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.st-help-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.st-help-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.st-help-control {
  width: 18px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  text-decoration: none;
  font-size: 11px;
  line-height: 1;
  cursor: pointer;
}

.st-help-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.st-help-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.st-help-tab.active {
  position: relative;
  top: 1px;
  background: #fff;
}

.st-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
  border-top: 1px solid #404040;
  background: #fff;
}

.st-help-toc {
  overflow: auto;
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
}

.st-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.st-help-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.st-help-toc-list li {
  margin: 0 0 8px;
}

.st-help-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.st-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.st-help-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.st-help-section {
  margin: 0 0 20px;
}

.st-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.st-help-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.st-help-content p,
.st-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.st-help-content p {
  margin: 0 0 10px;
}

.st-help-content ul,
.st-help-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.st-help-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.st-help-link {
  color: #000080;
}

.st-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.st-help-codebox pre {
  margin: 0;
  overflow: auto;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
}

@media (max-width: 900px) {
  .st-help-main {
    grid-template-columns: 1fr;
  }

  .st-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}
`

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

function isTabId(value: string | null): value is TabId {
  return (
    value === 'big-picture' ||
    value === 'core-concepts' ||
    value === 'examples' ||
    value === 'glossary'
  )
}

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
    { id: 'ex-walkthrough', label: 'Query Walkthrough' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function SuffixTreePage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    const tab = searchParams.get('tab')
    return isTabId(tab) ? tab : 'big-picture'
  })

  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Suffix Tree - Help (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Suffix Tree - Help',
      url: `${location.pathname}${location.search}${location.hash}`,
      kind: 'help',
    }
    const rawTasks = window.localStorage.getItem(MINIMIZED_HELP_TASKS_KEY)
    const parsedTasks = rawTasks ? (JSON.parse(rawTasks) as Array<{ id: string }>) : []
    const nextTasks = [...parsedTasks.filter((task) => task.id !== minimizedTask.id), minimizedTask]
    window.localStorage.setItem(MINIMIZED_HELP_TASKS_KEY, JSON.stringify(nextTasks))

    const historyState = window.history.state as { idx?: number } | null
    if (historyState?.idx && historyState.idx > 0) {
      void navigate(-1)
      return
    }
    void navigate('/algoViz')
  }

  return (
    <div className="st-help-page">
      <style>{suffixTreeHelpStyles}</style>
      <div className="st-help-window" role="presentation">
        <header className="st-help-titlebar">
          <span className="st-help-title">Suffix Tree - Help</span>
          <div className="st-help-title-controls">
            <button
              className="st-help-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="st-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="st-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`st-help-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="st-help-main">
          <aside className="st-help-toc" aria-label="Table of contents">
            <h2 className="st-help-toc-title">Contents</h2>
            <ul className="st-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="st-help-content">
            <h1 className="st-help-doc-title">Suffix Tree</h1>
            <p>
              A suffix tree stores all suffixes of a string in a compact trie. By compressing chains
              and using suffix links, it supports fast substring queries and advanced analytics like
              longest repeated or common substrings.
            </p>
            <p>
              This page keeps the material as a help document: use the tabs to switch sections, the
              contents pane to jump within the current tab, or return to the{' '}
              <Link to="/algoViz" className="st-help-link">
                catalog
              </Link>
              .
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="st-help-section">
                  <h2 className="st-help-heading">Overview</h2>
                  <p>
                    Suffix trees index every suffix of a string so that any substring corresponds to
                    a path from the root. This lets you answer substring existence in O(m) time and
                    power higher-level queries about repeats and similarities.
                  </p>
                  {mentalModels.map((item) => (
                    <div key={item.title}>
                      <h3 className="st-help-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <hr className="st-help-divider" />

                <section id="bp-history" className="st-help-section">
                  <h2 className="st-help-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <hr className="st-help-divider" />

                <section id="bp-why" className="st-help-section">
                  <h2 className="st-help-heading">Why It Matters</h2>
                  <p>
                    Ukkonen&apos;s online algorithm is the most practical linear-time build, but it
                    is detailed to implement correctly. Suffix trees offer fast queries but carry
                    larger constant factors than suffix arrays.
                  </p>
                  {complexityNotes.map((note) => (
                    <p key={note.title}>
                      <strong>{note.title}:</strong> {note.detail}
                    </p>
                  ))}
                </section>

                <hr className="st-help-divider" />

                <section id="bp-takeaways" className="st-help-section">
                  <h2 className="st-help-heading">Key Takeaways</h2>
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
                <section id="core-mental-models" className="st-help-section">
                  <h2 className="st-help-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <div key={item.title}>
                      <h3 className="st-help-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <section id="core-components" className="st-help-section">
                  <h2 className="st-help-heading">Core Components</h2>
                  {coreComponents.map((block) => (
                    <div key={block.heading}>
                      <h3 className="st-help-subheading">{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>

                <section id="core-construction" className="st-help-section">
                  <h2 className="st-help-heading">Construction Workflow</h2>
                  {buildSteps.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-query" className="st-help-section">
                  <h2 className="st-help-heading">Query Workflow</h2>
                  {querySteps.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-complexity" className="st-help-section">
                  <h2 className="st-help-heading">Complexity and Tradeoffs</h2>
                  {complexityNotes.map((note) => (
                    <p key={note.title}>
                      <strong>{note.title}:</strong> {note.detail}
                    </p>
                  ))}
                </section>

                <section id="core-applications" className="st-help-section">
                  <h2 className="st-help-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-pitfalls" className="st-help-section">
                  <h2 className="st-help-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section id="core-when" className="st-help-section">
                  <h2 className="st-help-heading">When to Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>

                <section id="core-advanced" className="st-help-section">
                  <h2 className="st-help-heading">Advanced Insights</h2>
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
                <section id="ex-code" className="st-help-section">
                  <h2 className="st-help-heading">Code Examples</h2>
                  {examples.map((example) => (
                    <div key={example.title}>
                      <h3 className="st-help-subheading">{example.title}</h3>
                      <div className="st-help-codebox">
                        <pre>{example.code}</pre>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>

                <section id="ex-walkthrough" className="st-help-section">
                  <h2 className="st-help-heading">Query Walkthrough</h2>
                  <h3 className="st-help-subheading">Building the tree</h3>
                  <ol>
                    {buildSteps.map((item) => (
                      <li key={item.title}>
                        <strong>{item.title}:</strong> {item.detail}
                      </li>
                    ))}
                  </ol>
                  <h3 className="st-help-subheading">Using the tree</h3>
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
              <section id="glossary-terms" className="st-help-section">
                <h2 className="st-help-heading">Glossary</h2>
                {quickGlossary.map((item) => (
                  <p key={item.term}>
                    <strong>{item.term}:</strong> {item.definition}
                  </p>
                ))}
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
