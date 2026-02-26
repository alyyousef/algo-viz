import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

const historicalMilestones = [
  {
    title: 'Huffman publishes optimal prefix codes (1952)',
    detail:
      'David A. Huffman proves a greedy algorithm can build a prefix code with minimum expected length for given symbol frequencies.',
  },
  {
    title: 'Compression for telegraph and early storage',
    detail:
      'Variable-length codes reduce cost and storage by giving short codes to common symbols and long codes to rare ones.',
  },
  {
    title: 'Canonical Huffman in file formats (1980s-1990s)',
    detail:
      'Standards like DEFLATE and JPEG use canonical Huffman codes to store trees compactly and decode quickly.',
  },
  {
    title: 'Still the baseline for entropy coding',
    detail:
      'Huffman coding remains a practical, fast alternative to arithmetic coding, especially when speed is critical.',
  },
]

const mentalModels = [
  {
    title: 'Frequency weighted paths',
    detail:
      'Every symbol pays for each bit in its code. High frequency symbols should travel fewer edges in the tree.',
  },
  {
    title: 'Greedy pairing',
    detail:
      'The two least frequent symbols are merged first because they should live deepest together in the final tree.',
  },
  {
    title: 'Prefix safety',
    detail:
      'No code is the prefix of another. This means the decoder can stream bits and know exactly when a symbol ends.',
  },
]

const workflowSteps = [
  {
    title: 'Count symbol frequencies',
    detail:
      'Build a histogram of symbols from the input data. Frequencies drive the shape of the tree.',
  },
  {
    title: 'Build a min-heap of nodes',
    detail:
      'Insert each symbol as a leaf node keyed by its frequency. The heap always exposes the two smallest nodes.',
  },
  {
    title: 'Merge the two smallest',
    detail:
      'Pop the two nodes, create a parent with combined weight, and push it back. Repeat until one node remains.',
  },
  {
    title: 'Assign bits from the root',
    detail:
      'Traverse the final tree: left edge = 0, right edge = 1. The path to each leaf is its code.',
  },
]

const codeProperties = [
  {
    title: 'Prefix-free',
    detail:
      'No code is a prefix of another. This guarantees unique decodability without separators.',
  },
  {
    title: 'Optimal expected length',
    detail:
      'Among all prefix codes, Huffman minimizes the weighted average code length.',
  },
  {
    title: 'Tree-based decoding',
    detail:
      'Decoding walks the tree per bit until a leaf is reached, then resets to the root.',
  },
]

const complexityRows = [
  { label: 'Build time', value: 'O(n log n) for n unique symbols using a heap.' },
  { label: 'Encode time', value: 'O(m) for m symbols once code map is built.' },
  { label: 'Decode time', value: 'O(b) for b bits using a tree walk.' },
]

const variants = [
  {
    title: 'Canonical Huffman',
    detail:
      'Store only code lengths, then regenerate canonical codes for compact headers and faster decoding.',
  },
  {
    title: 'Adaptive Huffman',
    detail:
      'Update the tree as data streams in. Useful when symbol frequencies are not known in advance.',
  },
  {
    title: 'Length-limited codes',
    detail:
      'Constrain maximum code length to fit hardware or protocol limits. Requires a modified algorithm.',
  },
]

const walkthroughSteps = [
  'Frequencies: A:5, B:9, C:12, D:13, E:16, F:45.',
  'Merge A(5) + B(9) -> 14; merge C(12) + D(13) -> 25.',
  'Merge 14 + E(16) -> 30; merge 25 + 30 -> 55.',
  'Merge F(45) + 55 -> 100. Assign bits to get codes like F:0, C:100, D:101, A:1100, B:1101, E:111.',
]

const examples = [
  {
    title: 'Building a Huffman tree with a heap',
    code: `function buildHuffmanTree(freqMap):
    heap = new MinHeap()
    for (symbol, freq) in freqMap:
        heap.push(new Node(symbol, freq))
    while heap.size() > 1:
        left = heap.pop()
        right = heap.pop()
        parent = new Node(null, left.freq + right.freq, left, right)
        heap.push(parent)
    return heap.pop()`,
    explanation:
      'The greedy rule is to always merge the two smallest remaining nodes, which makes them siblings at the deepest level.',
  },
  {
    title: 'Generating codes from the tree',
    code: `function buildCodes(node, prefix, map):
    if node.isLeaf():
        map[node.symbol] = prefix
        return
    buildCodes(node.left, prefix + '0', map)
    buildCodes(node.right, prefix + '1', map)`,
    explanation:
      'Each left edge contributes a 0 and each right edge a 1. The prefix path to a leaf is the code.',
  },
  {
    title: 'Encoding and decoding a message',
    code: `encoded = ''
for ch in message:
    encoded += codeMap[ch]

decoded = ''
node = treeRoot
for bit in encoded:
    node = bit == '0' ? node.left : node.right
    if node.isLeaf():
        decoded += node.symbol
        node = treeRoot`,
    explanation:
      'Encoding is a lookup. Decoding is a stream walk through the prefix tree until a leaf is reached.',
  },
]

const realWorldUses = [
  {
    context: 'File compression',
    detail:
      'DEFLATE, ZIP, and PNG use Huffman coding to compress symbols after LZ-style dictionary steps.',
  },
  {
    context: 'Image formats',
    detail:
      'JPEG uses Huffman codes for quantized DCT coefficients to reduce file size without heavy compute.',
  },
  {
    context: 'Network protocols',
    detail:
      'HTTP/2 uses Huffman coding for header compression to reduce bandwidth.',
  },
  {
    context: 'Embedded systems',
    detail:
      'Huffman decoding is fast and memory-light, making it suitable for constrained devices.',
  },
]

const pitfalls = [
  'Forgetting to transmit or reconstruct the code tree. The decoder needs the same tree to decode.',
  'Using Huffman on uniform data. If frequencies are flat, compression gains are minimal.',
  'Storing explicit codes instead of canonical lengths, which bloats metadata.',
  'Mixing bit and byte boundaries incorrectly when streaming encoded data.',
  'Not handling single-symbol inputs, which require a special-case code like "0".',
]

const decisionGuidance = [
  'Use Huffman when symbol frequencies are skewed and you want fast, lossless compression.',
  'Use canonical Huffman when you need compact headers and fast decoding.',
  'Prefer arithmetic or ANS coding if you need compression closer to entropy limits.',
  'Avoid when data is already compressed or uniformly distributed.',
]

const advancedInsights = [
  {
    title: 'Entropy bound intuition',
    detail:
      'The average code length is within 1 bit of the source entropy for optimal Huffman codes.',
  },
  {
    title: 'Tie-breaking affects shape',
    detail:
      'Different merge orders can produce different trees but the same optimal cost. Canonical forms normalize this.',
  },
  {
    title: 'Streaming decode',
    detail:
      'Decoding is linear in bits and can be implemented with a small table for speed.',
  },
  {
    title: 'Hybrid compressors',
    detail:
      'Most compressors combine LZ-style dictionary compression with Huffman coding on the output tokens.',
  },
]

const takeaways = [
  'Huffman coding builds optimal prefix codes by repeatedly merging the two least frequent symbols.',
  'It is fast, in-place at decode time, and widely used in compression standards.',
  'Its gains depend on skewed frequencies and careful handling of the code tree.',
]

const quickGlossary = [
  {
    term: 'Prefix code',
    definition: 'A code set where no symbol code is the prefix of another symbol code.',
  },
  {
    term: 'Prefix-free',
    definition: 'Property enabling unambiguous streaming decode without delimiters.',
  },
  {
    term: 'Min-heap',
    definition: 'Priority queue used to repeatedly extract the lowest-frequency nodes.',
  },
  {
    term: 'Canonical Huffman',
    definition: 'Normalized Huffman representation using code lengths to rebuild codes deterministically.',
  },
  {
    term: 'Expected code length',
    definition: 'Frequency-weighted average number of bits per symbol.',
  },
  {
    term: 'Entropy coding',
    definition: 'Compression stage that assigns shorter codes to more probable symbols.',
  },
  {
    term: 'Histogram',
    definition: 'Frequency table of symbols from input data.',
  },
  {
    term: 'Single-symbol case',
    definition: 'Edge case where only one symbol exists and needs a valid non-empty code.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const huff98HelpStyles = `
.huff98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.huff98-window {
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  background: #c0c0c0;
  width: 100%;
  min-height: 100dvh;
  margin: 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.huff98-titlebar {
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

.huff98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 15px;
  white-space: nowrap;
  pointer-events: none;
}

.huff98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
  z-index: 1;
}

.huff98-control {
  width: 18px;
  height: 16px;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  line-height: 1;
  cursor: pointer;
}

.huff98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.huff98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.huff98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.huff98-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.huff98-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.huff98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.huff98-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.huff98-toc-list li {
  margin: 0 0 8px;
}

.huff98-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.huff98-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.huff98-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.huff98-section {
  margin: 0 0 22px;
}

.huff98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.huff98-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.huff98-content p,
.huff98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.huff98-content p {
  margin: 0 0 10px;
}

.huff98-content ul,
.huff98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.huff98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.huff98-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.huff98-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .huff98-main {
    grid-template-columns: 1fr;
  }

  .huff98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}
`

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-history', label: 'Historical Context' },
    { id: 'bp-real-world', label: 'Real-World Applications' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-mental-models', label: 'Mental Models' },
    { id: 'core-workflow', label: 'Greedy Construction' },
    { id: 'core-properties', label: 'Prefix Code Properties' },
    { id: 'core-complexity', label: 'Complexity and Tradeoffs' },
    { id: 'core-variants', label: 'Variants and Refinements' },
    { id: 'core-walkthrough', label: 'Walkthrough Example' },
    { id: 'core-advanced', label: 'Advanced Insights' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-guidance', label: 'When to Use It' },
  ],
  examples: [{ id: 'ex-practical', label: 'Practical Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function HuffmanCodingPage(): JSX.Element {
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
    document.title = `Huffman Coding (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Huffman Coding',
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
    <div className="huff98-help-page">
      <style>{huff98HelpStyles}</style>
      <div className="huff98-window" role="presentation">
        <header className="huff98-titlebar">
          <span className="huff98-title-text">Huffman Coding</span>
          <div className="huff98-title-controls">
            <button className="huff98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="huff98-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="huff98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`huff98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="huff98-main">
          <aside className="huff98-toc" aria-label="Table of contents">
            <h2 className="huff98-toc-title">Contents</h2>
            <ul className="huff98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="huff98-content">
            <h1 className="huff98-doc-title">Huffman Coding</h1>
            <p>
              Huffman coding is a greedy algorithm that builds a binary tree where frequent symbols get shorter codes and rare
              symbols get longer ones.
            </p>
            <p>
              The result is a prefix-free code that minimizes average code length for a known frequency distribution, making it a
              cornerstone of practical lossless compression.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="huff98-section">
                  <h2 className="huff98-heading">Overview</h2>
                  <p>
                    If some symbols appear much more often than others, you can save space by giving them shorter bit patterns.
                    Huffman coding turns that intuition into an optimal prefix tree.
                  </p>
                  <p>
                    The greedy merge of the two smallest frequencies forces those symbols to live deepest together, minimizing the
                    weighted path length.
                  </p>
                </section>
                <hr className="huff98-divider" />
                <section id="bp-history" className="huff98-section">
                  <h2 className="huff98-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <div key={item.title}>
                      <h3 className="huff98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>
                <hr className="huff98-divider" />
                <section id="bp-real-world" className="huff98-section">
                  <h2 className="huff98-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <hr className="huff98-divider" />
                <section id="bp-takeaways" className="huff98-section">
                  <h2 className="huff98-heading">Key Takeaways</h2>
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
                <section id="core-mental-models" className="huff98-section">
                  <h2 className="huff98-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <div key={item.title}>
                      <h3 className="huff98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>
                <section id="core-workflow" className="huff98-section">
                  <h2 className="huff98-heading">Greedy Construction</h2>
                  {workflowSteps.map((step) => (
                    <p key={step.title}>
                      <strong>{step.title}:</strong> {step.detail}
                    </p>
                  ))}
                </section>
                <section id="core-properties" className="huff98-section">
                  <h2 className="huff98-heading">Prefix Code Properties</h2>
                  {codeProperties.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-complexity" className="huff98-section">
                  <h2 className="huff98-heading">Complexity and Tradeoffs</h2>
                  {complexityRows.map((row) => (
                    <p key={row.label}>
                      <strong>{row.label}:</strong> {row.value}
                    </p>
                  ))}
                  <p>
                    Huffman gives you a clean tradeoff: quick encode/decode with near-optimal compression. The biggest cost is
                    storing or reconstructing the code tree alongside the data.
                  </p>
                </section>
                <section id="core-variants" className="huff98-section">
                  <h2 className="huff98-heading">Variants and Refinements</h2>
                  {variants.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-walkthrough" className="huff98-section">
                  <h2 className="huff98-heading">Walkthrough Example</h2>
                  <ul>
                    {walkthroughSteps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-advanced" className="huff98-section">
                  <h2 className="huff98-heading">Advanced Insights</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="huff98-section">
                  <h2 className="huff98-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-guidance" className="huff98-section">
                  <h2 className="huff98-heading">When to Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <section id="ex-practical" className="huff98-section">
                <h2 className="huff98-heading">Practical Examples</h2>
                {examples.map((example) => (
                  <div key={example.title}>
                    <h3 className="huff98-subheading">{example.title}</h3>
                    <div className="huff98-codebox">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </div>
                ))}
              </section>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="huff98-section">
                <h2 className="huff98-heading">Glossary</h2>
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
