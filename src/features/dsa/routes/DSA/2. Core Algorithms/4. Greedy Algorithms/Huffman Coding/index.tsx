import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

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

export default function HuffmanCodingPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Huffman Coding</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Optimal prefix codes that compress data using greedy merges</div>
              <p className="win95-text">
                Huffman coding is a greedy algorithm that builds a binary tree where frequent symbols get shorter codes and rare
                symbols get longer ones. The result is a prefix-free code that minimizes average code length for a known frequency
                distribution, making it a cornerstone of practical lossless compression.
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
                If some symbols appear much more often than others, you can save space by giving them shorter bit patterns. Huffman
                coding turns that intuition into an optimal prefix tree. The greedy merge of the two smallest frequencies forces
                those symbols to live deepest together, minimizing the weighted path length.
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
            <legend>How it works: greedy construction</legend>
            <div className="win95-grid win95-grid-2">
              {workflowSteps.map((step) => (
                <div key={step.title} className="win95-panel">
                  <div className="win95-heading">{step.title}</div>
                  <p className="win95-text">{step.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Prefix code properties</legend>
            <div className="win95-grid win95-grid-3">
              {codeProperties.map((item) => (
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
              {complexityRows.map((row) => (
                <div key={row.label} className="win95-panel">
                  <div className="win95-heading">{row.label}</div>
                  <p className="win95-text">{row.value}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                Huffman gives you a clean tradeoff: quick encode/decode with near-optimal compression. The biggest cost is storing or
                reconstructing the code tree alongside the data.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Variants and refinements</legend>
            <div className="win95-grid win95-grid-3">
              {variants.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Walkthrough example</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {walkthroughSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
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

