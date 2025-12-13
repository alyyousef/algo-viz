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

const historicalMilestones = [
  {
    title: 'Early assembly languages codify bytes and words (1950s)',
    detail:
      'Programmers moved from raw machine code to assembly, formalizing the notions of bytes, words, and registers as the atoms of computation.',
  },
  {
    title: 'C popularizes portable primitive types (1972)',
    detail:
      'C mapped directly to hardware while promising portability. Its int, char, and float influenced type systems in C++, Java, Go, and Rust.',
  },
  {
    title: 'IEEE 754 standardizes floating point (1985)',
    detail:
      'A uniform representation for real numbers stabilized behavior across CPUs, enabling reliable numerical software and hardware acceleration.',
  },
  {
    title: 'Unicode expands the notion of character (1991)',
    detail:
      'Characters became code points instead of single bytes, forcing developers to distinguish between encoded bytes and textual units.',
  },
]

const mentalModels = [
  {
    title: 'Atoms and measuring cups',
    detail:
      'Primitive types are the atoms of data. They have fixed size and shape like measuring cups, making them predictable for memory layout and performance.',
  },
  {
    title: 'Bits as budget',
    detail: 'Every bit is capacity. Choosing int16 over int64 is deciding how much numeric range and memory you budget for the task.',
  },
  {
    title: 'Contracts with hardware',
    detail:
      'Primitive types are contracts between your code and the CPU about how many bits to read, how to interpret them, and how to align them in memory.',
  },
]

const primitiveCategories = [
  {
    heading: 'Integers',
    bullets: [
      'Signed vs unsigned. Range determined by bit width (int8 to int64, BigInt for arbitrary precision).',
      'Two complement dominates modern CPUs, simplifying addition and subtraction hardware.',
      'Use fixed width for protocols and storage; BigInt when correctness requires unbounded range.',
    ],
  },
  {
    heading: 'Floating point',
    bullets: [
      'IEEE 754 single (32-bit) and double (64-bit) are ubiquitous. Provide sign, exponent, mantissa.',
      'Special values: NaN, +Infinity, -Infinity, signed zero. They simplify hardware pipelines but surprise comparisons.',
      'Not exact for most decimals; use decimal types or rationals for money and precise fractions.',
    ],
  },
  {
    heading: 'Characters and bytes',
    bullets: [
      'Bytes are 8-bit raw units. Text requires encodings like UTF-8 or UTF-16 to map code points to bytes.',
      'Code point versus glyph: multiple code points can render as one visual symbol. Length in bytes differs from length in characters.',
      'Use byte slices for I/O and cryptography; use string abstractions that respect encoding for text.',
    ],
  },
  {
    heading: 'Booleans',
    bullets: [
      'Stored as a byte or a bit-packed flag. Represent truth values but often incur alignment padding.',
      'Branching on booleans can cause pipeline stalls; vectorized code may favor bit masks.',
    ],
  },
  {
    heading: 'Pointers and references',
    bullets: [
      'Hold memory addresses. Size matches machine word (32-bit or 64-bit).',
      'Nullability is a property; languages vary in how they enforce non-null references.',
      'Pointer arithmetic is powerful and dangerous; managed languages abstract it away for safety.',
    ],
  },
]

const machineConsiderations = [
  {
    title: 'Word size and alignment',
    detail:
      'CPUs fetch data in word-sized chunks. Aligning 64-bit values on 8-byte boundaries avoids extra memory cycles. Misalignment penalties vary by architecture.',
  },
  {
    title: 'Endianness',
    detail:
      'Little endian stores least significant byte first; big endian stores most significant first. Network protocols often standardize on big endian (network byte order).',
  },
  {
    title: 'Cache behavior',
    detail:
      'Dense primitive arrays leverage cache lines better than sparse object graphs. Packing flags into bitsets can improve locality but adds bit manipulation cost.',
  },
  {
    title: 'SIMD and vector units',
    detail:
      'Vector instructions operate on multiple primitive elements at once. Choosing contiguous, properly aligned primitive buffers unlocks SIMD speedups.',
  },
]

const complexityNotes = [
  {
    title: 'Time cost',
    detail:
      'Primitive operations are O(1), but constants differ: integer addition is cheaper than floating point; integer division is slower than multiplication; memory access dominates arithmetic when data is not cache resident.',
  },
  {
    title: 'Space cost',
    detail:
      'Bit width drives memory footprint. Millions of records with an int64 field consume 8 MB per column, while int32 halves that. Bit packing booleans can reduce space by up to 8x in dense arrays.',
  },
  {
    title: 'Precision versus range',
    detail:
      'Floats trade precision for range through exponents. Decimal types trade range for precise base-10 arithmetic. Choosing the wrong primitive shifts errors into downstream calculations.',
  },
  {
    title: 'Overflow and underflow',
    detail:
      'Overflow wraps for unsigned integers and two complement signed integers in many languages. Checked arithmetic or wider types mitigate silent bugs.',
  },
]

const realWorldUses = [
  {
    context: 'Network protocols',
    detail:
      'Protocol headers specify exact bit widths (uint16 for ports, uint32 for sequence numbers) to guarantee interoperability and compactness.',
  },
  {
    context: 'Databases',
    detail:
      'Column types dictate on-disk and in-memory layout. Choosing INT versus BIGINT changes index size and cache fit, impacting query latency.',
  },
  {
    context: 'Graphics and signal processing',
    detail:
      'RGBA pixels often use four 8-bit channels; audio samples use 16-bit or 24-bit integers or floats. SIMD thrives on tightly packed primitives.',
  },
  {
    context: 'Cryptography',
    detail:
      'Operations depend on exact bit widths and endian conversions. Misinterpreting byte order or padding breaks protocols and security guarantees.',
  },
  {
    context: 'Embedded systems',
    detail:
      'Memory is scarce. Using uint8 and bitfields conserves RAM, while floating point may be absent or emulated, influencing algorithm choices.',
  },
]

const examples = [
  {
    title: 'Choosing fixed-width integers for protocols',
    code: `// TypeScript-like pseudocode for encoding a message header
function encodeHeader({ version, length, flags }):
    // version: uint8, length: uint32, flags: bitset
    buffer = new Uint8Array(6)
    buffer[0] = version
    writeUint32BE(buffer, 1, length) // big endian network order
    buffer[5] = flags
    return buffer`,
    explanation:
      'Explicit widths prevent ambiguity across languages and architectures. Big endian keeps multi-byte fields consistent on the wire.',
  },
  {
    title: 'Avoiding floating point for currency',
    code: `// Store cents as integers to avoid rounding surprises
class Money {
    constructor(cents) { this.cents = BigInt(cents) }

    add(other) { return new Money(this.cents + other.cents) }
    multiply(factor) { return new Money(this.cents * BigInt(factor)) }
}`,
    explanation:
      'Base-10 currency math demands exactness. Using integers or decimal libraries avoids binary floating point rounding drift.',
  },
  {
    title: 'Bit packing booleans',
    code: `// Pack 8 boolean flags into one byte
function packFlags(flags[8]):
    byte = 0
    for i in 0..7:
        if flags[i]: byte |= (1 << i)
    return byte`,
    explanation:
      'Packing improves cache locality and reduces memory, valuable in tight loops and large bitsets. The tradeoff is extra bit manipulation per access.',
  },
]

const pitfalls = [
  'Assuming char equals byte. Unicode code points need encodings; counting characters by bytes breaks multibyte scripts.',
  'Relying on default integer sizes across platforms. int can be 32-bit or 64-bit depending on compiler and architecture.',
  'Using floating point for equality checks. Rounding error makes direct comparison unreliable; compare within tolerances.',
  'Ignoring overflow. Loop counters and accumulators that exceed their bit width silently wrap, producing logic bugs or security issues.',
  'Misaligned or endianness-mismatched data in network or file I/O. Always specify byte order when serializing multi-byte primitives.',
]

const decisionGuidance = [
  'Need exact counts, indexes, or identifiers within known ranges: choose the smallest fixed-width integer that safely fits the range.',
  'Need fractional values with tolerable rounding: use float or double and document acceptable error margins.',
  'Need exact decimal arithmetic (currency, billing, inventory): prefer integers representing base units or decimal libraries.',
  'Need compact flags over large datasets: pack booleans into bitsets or use typed arrays of uint8 for simplicity.',
  'Need portability across systems: specify endianness and explicit widths in protocols and file formats; avoid platform dependent defaults.',
]

const advancedInsights = [
  {
    title: 'Alignment-driven struct design',
    detail:
      'Reordering fields to place wider primitives first can reduce padding, shrinking struct size. Profilers and sizeof checks verify savings.',
  },
  {
    title: 'SIMD friendly layouts',
    detail:
      'Structure of arrays (SoA) layouts keep primitive columns contiguous, unlocking vectorization and better cache use versus array of structures (AoS).',
  },
  {
    title: 'Arbitrary precision tradeoffs',
    detail:
      'BigInt and bignum libraries enable cryptography and exact math but increase memory and asymptotic cost. Use them when overflow is unacceptable.',
  },
  {
    title: 'Checked arithmetic',
    detail:
      'Languages like Rust offer checked, saturating, and wrapping arithmetic. Picking the right mode documents intent and prevents hidden overflow.',
  },
]

const takeaways = [
  'Primitive types define how bits turn into meaning. Choosing the right size and representation is a design decision, not a default.',
  'Performance hinges on layout. Align data, batch primitives, and avoid unnecessary widening to keep caches hot.',
  'Correctness often fails at the boundaries: overflow, rounding, encoding, and endianness.',
  'Portability improves when widths and byte order are explicit in protocols, files, and interfaces.',
]

export default function PrimitiveTypesPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Primitive Types</span>
          <div className="win95-title-controls">
            <button className="win95-control" aria-label="Close window">
              X
            </button>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Fixed-size building blocks that shape correctness, performance, and portability</div>
              <p className="win95-text">
                Primitive types turn raw bits into integers, booleans, characters, and pointers. They look simple, yet the choices
                you make at this level ripple through performance, storage, and even security. This page unpacks the history, intuition,
                mechanics, and tradeoffs behind these smallest units of data.
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
                Primitive types are the contract between your program and the machine. They determine how many bits are read, how they
                are interpreted, and how the CPU aligns and moves them. Every higher-level structure relies on these atoms behaving predictably.
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
            <legend>How it works: primitive categories</legend>
            <div className="win95-grid win95-grid-3">
              {primitiveCategories.map((block) => (
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
            <legend>How it works: machine considerations</legend>
            <div className="win95-grid win95-grid-2">
              {machineConsiderations.map((item) => (
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
                Every primitive choice balances range, precision, memory, and speed. The right call depends on the data domain,
                error tolerance, and performance envelope you need to hit.
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
