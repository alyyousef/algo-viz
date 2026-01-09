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
      'Programmers moved from raw machine code to assembly, formalizing bytes, words, and registers as the atoms of computation.',
  },
  {
    title: 'ASCII standardizes 7-bit text (1963)',
    detail:
      'A shared character set enabled portability of text across machines, motivating distinct byte/character semantics.',
  },
  {
    title: 'C popularizes portable primitive types (1972)',
    detail:
      'C mapped directly to hardware while promising portability. Its int, char, and float influenced many later type systems.',
  },
  {
    title: 'Two\'s complement becomes ubiquitous (1970s)',
    detail:
      'Signed integer representation converged on two\'s complement, simplifying arithmetic and overflow behavior in hardware.',
  },
  {
    title: 'IEEE 754 standardizes floating point (1985)',
    detail:
      'A uniform representation for real numbers stabilized behavior across CPUs, enabling reliable numerical software.',
  },
  {
    title: 'Unicode expands the notion of character (1991)',
    detail:
      'Characters became code points instead of bytes, forcing developers to distinguish encoding from text semantics.',
  },
  {
    title: '64-bit architectures go mainstream (2000s)',
    detail:
      'Pointer sizes and default integer widths expanded, changing ABI expectations and memory layout decisions.',
  },
]

const mentalModels = [
  {
    title: 'Atoms and measuring cups',
    detail:
      'Primitive types are the atoms of data. Fixed size and shape make memory layout predictable and fast to move.',
  },
  {
    title: 'Bits as budget',
    detail:
      'Every bit is capacity. Choosing int16 over int64 is a concrete memory and range budget choice.',
  },
  {
    title: 'Contracts with hardware',
    detail:
      'Primitive types define how many bits the CPU reads, how it interprets them, and how it aligns them in memory.',
  },
  {
    title: 'Encoding is not meaning',
    detail:
      'Bytes are storage; encoding tells you how to interpret them as characters. Confusing the two causes bugs.',
  },
  {
    title: 'Fast path vs safe path',
    detail:
      'Primitive operations are fast but low-level; safety comes from clear ranges, explicit conversions, and checks.',
  },
]

const primitiveCategories = [
  {
    heading: 'Integers',
    bullets: [
      'Signed vs unsigned; range is determined by bit width (int8 to int64, BigInt for arbitrary precision).',
      'Two\'s complement dominates CPUs, simplifying arithmetic and overflow behavior.',
      'Fixed-width integers are essential for protocols, file formats, and binary storage.',
      'Choose the smallest width that fits to reduce memory and cache pressure.',
    ],
  },
  {
    heading: 'Floating point',
    bullets: [
      'IEEE 754 single (32-bit) and double (64-bit) provide sign, exponent, mantissa.',
      'Special values: NaN, +Infinity, -Infinity, signed zero. Comparisons can be surprising.',
      'Most decimals are not exact in binary; use decimal or integer cents for money.',
      'Rounding modes and precision loss matter in loops and reductions.',
    ],
  },
  {
    heading: 'Fixed-point / decimals',
    bullets: [
      'Store scaled integers (value * scale) to represent decimals exactly.',
      'Great for currency, inventory, and deterministic business logic.',
      'Trade range for precision; choose scale carefully.',
    ],
  },
  {
    heading: 'Characters and bytes',
    bullets: [
      'Bytes are 8-bit raw units. Text requires encodings like UTF-8 or UTF-16.',
      'Code point vs glyph: multiple code points can render as one symbol.',
      'Length in bytes differs from length in characters; slicing by bytes can corrupt text.',
    ],
  },
  {
    heading: 'Booleans',
    bullets: [
      'Stored as a byte or bit-packed flags; alignment padding can waste space.',
      'Vectorized code may prefer bit masks over branching for speed.',
      'Serialization formats often encode booleans as 0/1 bytes.',
    ],
  },
  {
    heading: 'Pointers and references',
    bullets: [
      'Hold memory addresses; size matches machine word (32-bit or 64-bit).',
      'Nullability varies by language: null, optional, or non-null references.',
      'Pointer arithmetic is powerful but unsafe; managed languages abstract it away.',
    ],
  },
  {
    heading: 'Bitfields and flags',
    bullets: [
      'Pack multiple small values into one word using masks and shifts.',
      'Improves locality but adds complexity and endianness concerns.',
      'Common in embedded systems, protocols, and graphics.',
    ],
  },
]

const machineConsiderations = [
  {
    title: 'Word size and alignment',
    detail:
      'CPUs fetch data in word-sized chunks. Aligning 64-bit values on 8-byte boundaries avoids extra memory cycles.',
  },
  {
    title: 'Endianness',
    detail:
      'Little endian stores least significant byte first; big endian stores most significant first. Protocols often fix byte order.',
  },
  {
    title: 'Cache behavior',
    detail:
      'Dense primitive arrays leverage cache lines better than sparse object graphs. Packing flags improves locality but adds bit ops.',
  },
  {
    title: 'SIMD and vector units',
    detail:
      'Vector instructions operate on multiple primitive elements at once. Contiguous, aligned buffers unlock SIMD speedups.',
  },
  {
    title: 'ABI and calling conventions',
    detail:
      'Primitive sizes dictate stack layout, parameter passing, and struct padding across language boundaries.',
  },
  {
    title: 'Atomicity and concurrency',
    detail:
      'Some primitive widths are atomic on a given CPU; others need locks. Misaligned atomics can be slow or unsafe.',
  },
]

const complexityNotes = [
  {
    title: 'Time cost',
    detail:
      'Primitive operations are O(1), but constants differ: integer add < float add; division is slower than multiply; memory access can dominate.',
  },
  {
    title: 'Space cost',
    detail:
      'Bit width drives footprint. Millions of int64 values consume 8 MB per column; int32 halves that. Bit packing booleans can cut space 8x.',
  },
  {
    title: 'Precision versus range',
    detail:
      'Floats trade precision for range. Fixed-point trades range for exactness. Wrong choices leak error into downstream computations.',
  },
  {
    title: 'Overflow and underflow',
    detail:
      'Overflow often wraps. Checked arithmetic, saturating math, or wider types prevent silent bugs.',
  },
  {
    title: 'Conversion cost',
    detail:
      'Casting between types can be expensive in tight loops, especially float <-> int or big integer conversions.',
  },
]

const realWorldUses = [
  {
    context: 'Network protocols',
    detail:
      'Headers specify exact widths (uint16 ports, uint32 sequence numbers) to guarantee interoperability and compactness.',
  },
  {
    context: 'Databases',
    detail:
      'Column types dictate on-disk and in-memory layout. INT vs BIGINT changes index size and cache fit.',
  },
  {
    context: 'Graphics and signal processing',
    detail:
      'RGBA pixels use four 8-bit channels; audio samples use 16-bit or 24-bit integers or floats.',
  },
  {
    context: 'Cryptography',
    detail:
      'Exact bit widths and endianness are mandatory. Misinterpreting byte order breaks protocols and security.',
  },
  {
    context: 'Embedded systems',
    detail:
      'Memory is scarce. uint8 and bitfields conserve RAM; floating point may be emulated.',
  },
  {
    context: 'Machine learning',
    detail:
      'FP16/BF16 reduce memory and bandwidth, while int8 quantization boosts throughput for inference.',
  },
  {
    context: 'Time and finance',
    detail:
      'Timestamps often use int64 epoch counts; money uses fixed-point to avoid rounding drift.',
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
      'Explicit widths prevent ambiguity across languages and architectures. Big endian keeps fields consistent on the wire.',
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
      'Base-10 currency math demands exactness. Integers or decimal libraries avoid floating point drift.',
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
      'Packing improves locality and reduces memory, valuable in dense datasets and tight loops.',
  },
  {
    title: 'Safe narrowing with checks',
    code: `// Avoid silent overflow when narrowing
function toUInt16(x):
    if x < 0 or x > 65535:
        throw RangeError("out of range")
    return x`,
    explanation:
      'Explicit range checks prevent accidental truncation or wraparound during casts.',
  },
  {
    title: 'Fixed-point representation',
    code: `// Fixed-point with 2 decimals
const SCALE = 100
function addMoney(a, b):
    return a + b // both stored in cents
function formatMoney(cents):
    return (cents / SCALE) + "." + (cents % SCALE)`,
    explanation:
      'Fixed-point keeps precise decimals while preserving integer arithmetic performance.',
  },
]

const pitfalls = [
  'Assuming char equals byte. Unicode code points need encodings; byte length differs from character length.',
  'Relying on default integer sizes across platforms. int can be 32-bit or 64-bit.',
  'Using floating point for equality checks. Compare with tolerances instead.',
  'Ignoring overflow. Counters and accumulators can silently wrap.',
  'Misaligned or endianness-mismatched data in I/O. Always specify byte order.',
  'Implicit narrowing casts that truncate high bits or change sign.',
  'Storing time in 32-bit seconds and hitting the 2038 limit.',
]

const decisionGuidance = [
  'Need exact counts, indexes, or identifiers: choose the smallest fixed-width integer that fits the range.',
  'Need fractional values with tolerable rounding: use float or double and document error margins.',
  'Need exact decimal arithmetic (currency, billing, inventory): use fixed-point or decimal libraries.',
  'Need compact flags over large datasets: pack booleans or use bitsets.',
  'Need portability: specify endianness and widths in protocols and file formats.',
  'Need huge ranges: use BigInt or bignum libraries, but account for slower arithmetic.',
]

const advancedInsights = [
  {
    title: 'Alignment-driven struct design',
    detail:
      'Reordering fields to place wider primitives first can reduce padding, shrinking structs significantly.',
  },
  {
    title: 'SIMD-friendly layouts',
    detail:
      'Structure of arrays (SoA) keeps primitives contiguous, improving cache and vectorization versus array of structures.',
  },
  {
    title: 'Arbitrary precision tradeoffs',
    detail:
      'BigInt enables exact math but increases memory use and algorithmic cost. Use only when overflow is unacceptable.',
  },
  {
    title: 'Checked and saturating arithmetic',
    detail:
      'Many languages offer checked, saturating, and wrapping modes. Picking the right mode documents intent.',
  },
  {
    title: 'NaN propagation strategy',
    detail:
      'IEEE 754 NaNs propagate through calculations. Decide whether to sanitize or allow them to surface errors.',
  },
  {
    title: 'Quantization strategies',
    detail:
      'Reducing precision (float16, int8) can boost performance but needs error analysis and calibration.',
  },
]

const takeaways = [
  'Primitive types define how bits turn into meaning; size and representation are core design choices.',
  'Performance hinges on layout, alignment, and cache behavior; choose widths intentionally.',
  'Correctness often fails at boundaries: overflow, rounding, encoding, and endianness.',
  'Portability improves when widths and byte order are explicit in protocols, files, and interfaces.',
  'Use the smallest type that meets range and precision needs, and document why.',
]

export default function PrimitiveTypesPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Primitive Types</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
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
