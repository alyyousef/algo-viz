import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

const historicalMilestones = [
  {
    title: 'Prefix-function ideas emerge (1970s)',
    detail: 'Researchers explored linear-time string preprocessing to avoid repeated comparisons.',
  },
  {
    title: 'Z algorithm formalized (1980s)',
    detail: 'The Z-array provided a direct way to measure prefix matches at every position.',
  },
  {
    title: 'Used alongside KMP (1990s)',
    detail: 'Z preprocessing became a common alternative to KMP for pattern matching tasks.',
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
    detail: 'Z[i] tells how many characters starting at i match the prefix of the string.',
  },
  {
    title: 'Window reuse (Z-box)',
    detail: 'Maintain a window [L, R] where matches with the prefix are known and reuse them.',
  },
  {
    title: 'One preprocessing, many answers',
    detail: 'Once you compute Z, you can answer pattern occurrences and border queries quickly.',
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
    detail: 'Set L = R = 0. These track the rightmost segment matching the prefix.',
  },
  {
    title: 'Reuse inside the box',
    detail: 'If i <= R, start with Z[i] = min(R - i + 1, Z[i - L]).',
  },
  {
    title: 'Expand when needed',
    detail: 'While characters match, increment Z[i] and move R forward.',
  },
  {
    title: 'Update the box',
    detail: 'If i + Z[i] - 1 > R, set L = i and R = i + Z[i] - 1.',
  },
]

const matchSteps = [
  {
    title: 'Concatenate pattern and text',
    detail: 'Build combined string: pattern + "$" + text to keep matches aligned.',
  },
  {
    title: 'Compute Z array',
    detail: 'Run the Z algorithm on the combined string in linear time.',
  },
  {
    title: 'Scan for matches',
    detail: 'Any Z value equal to pattern length indicates a match in the text.',
  },
  {
    title: 'Translate indices',
    detail: 'Convert the combined index back to text positions.',
  },
]

const complexityNotes = [
  {
    title: 'Preprocessing time',
    detail: 'O(n) for a string of length n using the Z-box trick.',
  },
  {
    title: 'Search time',
    detail: 'O(n + m) for a pattern of length m and text length n.',
  },
  {
    title: 'Memory cost',
    detail: 'O(n) for the Z array.',
  },
  {
    title: 'Comparable to KMP',
    detail: 'Z is often simpler to implement and is equally linear for single patterns.',
  },
]

const realWorldUses = [
  {
    context: 'Substring search',
    detail: 'Find all occurrences of a pattern in a text with linear preprocessing.',
  },
  {
    context: 'String periodicity',
    detail: 'Detect repetitions and smallest periods using Z values.',
  },
  {
    context: 'DNA analysis',
    detail: 'Fast prefix matching across large genome sequences.',
  },
  {
    context: 'Compression tools',
    detail: 'Borders and repeats help identify redundant sections for encoding.',
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
    explanation: 'The Z-box [L, R] lets you reuse previous comparisons to stay linear.',
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
    explanation: 'Matches correspond to Z values equal to the pattern length.',
  },
  {
    title: 'Border detection',
    code: `// If z[n - k] == k, then length-k prefix is a suffix.
// Use Z values to list all borders.`,
    explanation: 'Borders are prefixes that appear at the end; Z reveals them directly.',
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
    detail: 'Build combined strings to answer several pattern searches by reusing Z computations.',
  },
  {
    title: 'Streaming limitations',
    detail: 'Z is not naturally streaming; you need the full string to compute values.',
  },
  {
    title: 'Linear-time proofs',
    detail: 'Total comparisons are bounded because R only moves forward across the string.',
  },
]

const takeaways = [
  'Z algorithm computes prefix matches at every position in linear time.',
  'Great for single-pattern search and repetition analysis.',
  'Uses a Z-box window to avoid redundant comparisons.',
  'Pairs well with concatenation tricks for simple pattern matching.',
]

const quickGlossary = [
  {
    term: 'Z-array',
    definition: 'An array where Z[i] is the longest prefix match starting at position i.',
  },
  {
    term: 'Z-box',
    definition:
      'The current interval [L, R] known to match the prefix and used to skip repeated comparisons.',
  },
  {
    term: 'Border',
    definition: 'A string that is both a prefix and a suffix of the same string.',
  },
  {
    term: 'Delimiter',
    definition:
      'A separator character inserted between pattern and text so matches do not cross the boundary.',
  },
  {
    term: 'Periodicity',
    definition: 'The property that a string is built from repeated copies of a shorter pattern.',
  },
  {
    term: 'Prefix function',
    definition:
      'An alternative preprocessing array, used by KMP, that captures longest proper prefix-suffix lengths.',
  },
  {
    term: 'Combined string',
    definition:
      'The string `pattern + delimiter + text` used to turn pattern search into Z-array computation.',
  },
  {
    term: 'Linear-time preprocessing',
    definition: 'The guarantee that the full Z array can be computed in O(n) time.',
  },
  {
    term: 'Pattern occurrence',
    definition:
      'A text position where the Z value equals the full pattern length after concatenation.',
  },
]

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const zHelpStyles = `
.z-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.z-help-window {
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

.z-help-titlebar {
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

.z-help-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.z-help-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.z-help-control {
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

.z-help-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.z-help-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.z-help-tab.active {
  position: relative;
  top: 1px;
  background: #fff;
}

.z-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
  border-top: 1px solid #404040;
  background: #fff;
}

.z-help-toc {
  overflow: auto;
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
}

.z-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.z-help-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.z-help-toc-list li {
  margin: 0 0 8px;
}

.z-help-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.z-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.z-help-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.z-help-section {
  margin: 0 0 20px;
}

.z-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.z-help-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.z-help-content p,
.z-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.z-help-content p {
  margin: 0 0 10px;
}

.z-help-content ul,
.z-help-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.z-help-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.z-help-link {
  color: #000080;
}

.z-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.z-help-codebox pre {
  margin: 0;
  overflow: auto;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
}

@media (max-width: 900px) {
  .z-help-main {
    grid-template-columns: 1fr;
  }

  .z-help-toc {
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
    { id: 'core-construction', label: 'Z-Box Construction' },
    { id: 'core-matching', label: 'Pattern Matching Workflow' },
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

export default function ZAlgorithmPage(): JSX.Element {
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
    document.title = `Z Algorithm - Help (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Z Algorithm - Help',
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
    <div className="z-help-page">
      <style>{zHelpStyles}</style>
      <div className="z-help-window" role="presentation">
        <header className="z-help-titlebar">
          <span className="z-help-title">Z Algorithm - Help</span>
          <div className="z-help-title-controls">
            <button
              className="z-help-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="z-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="z-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`z-help-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="z-help-main">
          <aside className="z-help-toc" aria-label="Table of contents">
            <h2 className="z-help-toc-title">Contents</h2>
            <ul className="z-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="z-help-content">
            <h1 className="z-help-doc-title">Z Algorithm</h1>
            <p>
              The Z algorithm computes, for every index, how long the substring matches the prefix.
              With a clever Z-box window, it avoids redundant comparisons and powers fast pattern
              matching, border detection, and repetition analysis.
            </p>
            <p>
              This page keeps the material as a help document: use the tabs to switch sections, the
              contents pane to jump within the current tab, or return to the{' '}
              <Link to="/algoViz" className="z-help-link">
                catalog
              </Link>
              .
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="z-help-section">
                  <h2 className="z-help-heading">Overview</h2>
                  <p>
                    Z turns a string into an array of prefix match lengths. That single
                    preprocessing step provides immediate answers to many classic string tasks,
                    including pattern search and border discovery, all in linear time.
                  </p>
                  {mentalModels.map((item) => (
                    <div key={item.title}>
                      <h3 className="z-help-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <hr className="z-help-divider" />

                <section id="bp-history" className="z-help-section">
                  <h2 className="z-help-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <hr className="z-help-divider" />

                <section id="bp-why" className="z-help-section">
                  <h2 className="z-help-heading">Why It Matters</h2>
                  <p>
                    The Z-box is the key: it stores a verified matching segment to reuse
                    comparisons. Z offers linear preprocessing and clean pattern-matching tricks,
                    but needs the full string up front.
                  </p>
                  {complexityNotes.map((note) => (
                    <p key={note.title}>
                      <strong>{note.title}:</strong> {note.detail}
                    </p>
                  ))}
                </section>

                <hr className="z-help-divider" />

                <section id="bp-takeaways" className="z-help-section">
                  <h2 className="z-help-heading">Key Takeaways</h2>
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
                <section id="core-mental-models" className="z-help-section">
                  <h2 className="z-help-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <div key={item.title}>
                      <h3 className="z-help-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <section id="core-components" className="z-help-section">
                  <h2 className="z-help-heading">Core Components</h2>
                  {coreComponents.map((block) => (
                    <div key={block.heading}>
                      <h3 className="z-help-subheading">{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>

                <section id="core-construction" className="z-help-section">
                  <h2 className="z-help-heading">Z-Box Construction</h2>
                  {buildSteps.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-matching" className="z-help-section">
                  <h2 className="z-help-heading">Pattern Matching Workflow</h2>
                  {matchSteps.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-complexity" className="z-help-section">
                  <h2 className="z-help-heading">Complexity and Tradeoffs</h2>
                  {complexityNotes.map((note) => (
                    <p key={note.title}>
                      <strong>{note.title}:</strong> {note.detail}
                    </p>
                  ))}
                </section>

                <section id="core-applications" className="z-help-section">
                  <h2 className="z-help-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-pitfalls" className="z-help-section">
                  <h2 className="z-help-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section id="core-when" className="z-help-section">
                  <h2 className="z-help-heading">When to Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>

                <section id="core-advanced" className="z-help-section">
                  <h2 className="z-help-heading">Advanced Insights</h2>
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
                <section id="ex-code" className="z-help-section">
                  <h2 className="z-help-heading">Code Examples</h2>
                  {examples.map((example) => (
                    <div key={example.title}>
                      <h3 className="z-help-subheading">{example.title}</h3>
                      <div className="z-help-codebox">
                        <pre>{example.code}</pre>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>

                <section id="ex-walkthrough" className="z-help-section">
                  <h2 className="z-help-heading">Search Walkthrough</h2>
                  <h3 className="z-help-subheading">Building the Z values</h3>
                  <ol>
                    {buildSteps.map((item) => (
                      <li key={item.title}>
                        <strong>{item.title}:</strong> {item.detail}
                      </li>
                    ))}
                  </ol>
                  <h3 className="z-help-subheading">Finding occurrences</h3>
                  <ol>
                    {matchSteps.map((item) => (
                      <li key={item.title}>
                        <strong>{item.title}:</strong> {item.detail}
                      </li>
                    ))}
                  </ol>
                </section>
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="z-help-section">
                <h2 className="z-help-heading">Glossary</h2>
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
