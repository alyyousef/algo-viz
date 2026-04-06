import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

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
    detail: 'Choose a base (e.g., 256) and a large prime modulus; precompute base^(m-1) mod M.',
  },
  {
    title: 'Hash the pattern',
    detail: 'Compute the polynomial hash of the pattern of length m.',
  },
  {
    title: 'Hash the first window',
    detail: 'Compute the hash of text[0..m-1] using the same base and modulus.',
  },
  {
    title: 'Prepare rolling update',
    detail: 'Use the formula: newHash = (oldHash - lead*power) * base + newChar (mod M).',
  },
]

const matchSteps = [
  {
    title: 'Compare hashes',
    detail: 'If window hash equals the pattern hash, verify with direct character comparison.',
  },
  {
    title: 'Slide the window',
    detail: 'Update the hash in O(1) using the rolling formula and move one character forward.',
  },
  {
    title: 'Repeat to the end',
    detail: 'Each step does O(1) hash work plus occasional verification.',
  },
  {
    title: 'Report matches',
    detail: 'When verification succeeds, the window start index is a match.',
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
    detail: 'O(n*m) when many hash collisions or adversarial input.',
  },
  {
    title: 'Memory cost',
    detail: 'O(1) beyond the pattern and a few constants.',
  },
  {
    title: 'Good for many patterns',
    detail: 'Multiple pattern hashes can be compared quickly for the same window length.',
  },
]

const realWorldUses = [
  {
    context: 'Plagiarism detection',
    detail: 'Fingerprinting substrings helps compare large documents efficiently.',
  },
  {
    context: 'Deduplication systems',
    detail: 'Rolling hashes locate chunk boundaries and detect repeated blocks in storage.',
  },
  {
    context: 'Search in large logs',
    detail: 'Quickly reject non-matching windows before performing heavier checks.',
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
    explanation: 'Two independent hashes drastically reduce collision probability in practice.',
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

const quickGlossary = [
  {
    term: 'Rolling hash',
    definition:
      'A hash that can be updated in O(1) when the window slides by removing the old leading character and adding the new trailing character.',
  },
  {
    term: 'Window alignment',
    definition:
      'One candidate substring position in the text where the pattern-length window is currently placed.',
  },
  {
    term: 'Candidate match',
    definition:
      'A window whose hash equals the pattern hash and therefore requires direct verification.',
  },
  {
    term: 'Collision',
    definition:
      'A case where different substrings produce the same hash value, which is why Rabin-Karp must verify matches.',
  },
  {
    term: 'Base',
    definition:
      'The multiplier used in the polynomial hash, often chosen near the alphabet size or as a small random integer.',
  },
  {
    term: 'Modulus',
    definition:
      'The number used to keep hash values bounded; a large prime is typically chosen to reduce collisions.',
  },
  {
    term: 'Double hashing',
    definition: 'Using two independent hashes so that a collision in both is much less likely.',
  },
  {
    term: 'Verification',
    definition:
      'The exact character-by-character comparison performed after a hash match to confirm a real occurrence.',
  },
  {
    term: 'Content-defined chunking',
    definition:
      'A storage technique that uses rolling hash properties to decide chunk boundaries for deduplication.',
  },
]

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const rabinHelpStyles = `
.rk-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.rk-help-window {
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

.rk-help-titlebar {
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

.rk-help-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.rk-help-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.rk-help-control {
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

.rk-help-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.rk-help-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.rk-help-tab.active {
  position: relative;
  top: 1px;
  background: #fff;
}

.rk-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
  border-top: 1px solid #404040;
  background: #fff;
}

.rk-help-toc {
  overflow: auto;
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
}

.rk-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.rk-help-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.rk-help-toc-list li {
  margin: 0 0 8px;
}

.rk-help-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.rk-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.rk-help-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.rk-help-section {
  margin: 0 0 20px;
}

.rk-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.rk-help-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.rk-help-content p,
.rk-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.rk-help-content p {
  margin: 0 0 10px;
}

.rk-help-content ul,
.rk-help-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.rk-help-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.rk-help-link {
  color: #000080;
}

.rk-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.rk-help-codebox pre {
  margin: 0;
  overflow: auto;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
}

@media (max-width: 900px) {
  .rk-help-main {
    grid-template-columns: 1fr;
  }

  .rk-help-toc {
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
    { id: 'core-setup', label: 'Hash Setup Workflow' },
    { id: 'core-matching', label: 'Matching Workflow' },
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

export default function RabinKarpPage(): JSX.Element {
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
    document.title = `Rabin-Karp - Help (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Rabin-Karp - Help',
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
    <div className="rk-help-page">
      <style>{rabinHelpStyles}</style>
      <div className="rk-help-window" role="presentation">
        <header className="rk-help-titlebar">
          <span className="rk-help-title">Rabin-Karp - Help</span>
          <div className="rk-help-title-controls">
            <button
              className="rk-help-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="rk-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="rk-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`rk-help-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="rk-help-main">
          <aside className="rk-help-toc" aria-label="Table of contents">
            <h2 className="rk-help-toc-title">Contents</h2>
            <ul className="rk-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="rk-help-content">
            <h1 className="rk-help-doc-title">Rabin-Karp</h1>
            <p>
              Rabin-Karp compares substrings by hash instead of direct character checks. A rolling
              hash lets the algorithm slide a window across the text in O(1) per step, only
              verifying actual characters when hashes match.
            </p>
            <p>
              This page keeps the material as a help document: use the tabs to switch sections, the
              contents pane to jump within the current tab, or return to the{' '}
              <Link to="/algoViz" className="rk-help-link">
                catalog
              </Link>
              .
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="rk-help-section">
                  <h2 className="rk-help-heading">Overview</h2>
                  <p>
                    Rabin-Karp turns substring search into hash comparison. It precomputes a hash
                    for the pattern and then uses a rolling hash to update the text window
                    efficiently. Hash matches are candidates; direct comparison confirms true
                    matches.
                  </p>
                  {mentalModels.map((item) => (
                    <div key={item.title}>
                      <h3 className="rk-help-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <hr className="rk-help-divider" />

                <section id="bp-history" className="rk-help-section">
                  <h2 className="rk-help-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <hr className="rk-help-divider" />

                <section id="bp-why" className="rk-help-section">
                  <h2 className="rk-help-heading">Why It Matters</h2>
                  <p>
                    The base and modulus define the fingerprint. Good choices reduce collisions and
                    keep hashing stable, which is why Rabin-Karp is fast on average but depends on
                    good hashing to keep collisions rare.
                  </p>
                  {complexityNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <hr className="rk-help-divider" />

                <section id="bp-takeaways" className="rk-help-section">
                  <h2 className="rk-help-heading">Key Takeaways</h2>
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
                <section id="core-mental-models" className="rk-help-section">
                  <h2 className="rk-help-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <div key={item.title}>
                      <h3 className="rk-help-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <section id="core-components" className="rk-help-section">
                  <h2 className="rk-help-heading">Core Components</h2>
                  {coreComponents.map((block) => (
                    <div key={block.heading}>
                      <h3 className="rk-help-subheading">{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>

                <section id="core-setup" className="rk-help-section">
                  <h2 className="rk-help-heading">Hash Setup Workflow</h2>
                  {buildSteps.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-matching" className="rk-help-section">
                  <h2 className="rk-help-heading">Matching Workflow</h2>
                  {matchSteps.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-complexity" className="rk-help-section">
                  <h2 className="rk-help-heading">Complexity and Tradeoffs</h2>
                  {complexityNotes.map((note) => (
                    <p key={note.title}>
                      <strong>{note.title}:</strong> {note.detail}
                    </p>
                  ))}
                </section>

                <section id="core-applications" className="rk-help-section">
                  <h2 className="rk-help-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-pitfalls" className="rk-help-section">
                  <h2 className="rk-help-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section id="core-when" className="rk-help-section">
                  <h2 className="rk-help-heading">When to Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>

                <section id="core-advanced" className="rk-help-section">
                  <h2 className="rk-help-heading">Advanced Insights</h2>
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
                <section id="ex-code" className="rk-help-section">
                  <h2 className="rk-help-heading">Code Examples</h2>
                  {examples.map((example) => (
                    <div key={example.title}>
                      <h3 className="rk-help-subheading">{example.title}</h3>
                      <div className="rk-help-codebox">
                        <pre>{example.code}</pre>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>

                <section id="ex-walkthrough" className="rk-help-section">
                  <h2 className="rk-help-heading">Search Walkthrough</h2>
                  <h3 className="rk-help-subheading">Before the scan</h3>
                  <ol>
                    {buildSteps.map((item) => (
                      <li key={item.title}>
                        <strong>{item.title}:</strong> {item.detail}
                      </li>
                    ))}
                  </ol>
                  <h3 className="rk-help-subheading">During the scan</h3>
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
              <section id="glossary-terms" className="rk-help-section">
                <h2 className="rk-help-heading">Glossary</h2>
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
