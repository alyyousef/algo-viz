import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

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

const representationTable = [
  {
    type: 'uint8',
    bits: '8',
    range: '0 to 255',
    notes: 'Common for bytes, ASCII, raw buffers.',
  },
  {
    type: 'int8',
    bits: '8',
    range: '-128 to 127',
    notes: 'Two\'s complement signed byte.',
  },
  {
    type: 'uint16',
    bits: '16',
    range: '0 to 65,535',
    notes: 'Ports, checksums, small IDs.',
  },
  {
    type: 'int32',
    bits: '32',
    range: '-2,147,483,648 to 2,147,483,647',
    notes: 'Default integer in many runtimes.',
  },
  {
    type: 'uint64',
    bits: '64',
    range: '0 to 18,446,744,073,709,551,615',
    notes: 'File sizes, counters, timestamps.',
  },
  {
    type: 'float32',
    bits: '32',
    range: 'approx 1.18e-38 to 3.4e38',
    notes: '7 decimal digits of precision.',
  },
  {
    type: 'float64',
    bits: '64',
    range: 'approx 2.23e-308 to 1.79e308',
    notes: '15-16 decimal digits of precision.',
  },
]

const integerDetails = [
  {
    title: 'Two\'s complement layout',
    detail:
      'The highest bit is the sign. Negatives are represented by bitwise inversion plus one, making addition uniform.',
  },
  {
    title: 'Overflow behavior',
    detail:
      'Many languages wrap on overflow in release mode, while others throw or clamp; always verify your language rules.',
  },
  {
    title: 'Unsigned pitfalls',
    detail:
      'Mixing signed and unsigned can create surprising comparisons (e.g., -1 becomes a huge unsigned value).',
  },
  {
    title: 'Bitwise operations',
    detail:
      'Shifts, masks, and rotates are constant time but rely on exact bit widths and operator semantics.',
  },
  {
    title: 'Modulo arithmetic',
    detail:
      'Wraparound arithmetic is intentional in hashing and crypto, but risky in counters and money.',
  },
  {
    title: 'Endianness interactions',
    detail:
      'Integer byte order matters in serialization; always define network order explicitly.',
  },
]

const floatingPointDetails = [
  {
    title: 'Sign, exponent, mantissa',
    detail:
      'Float32 uses 1 sign bit, 8 exponent bits, 23 mantissa bits; float64 uses 1, 11, 52.',
  },
  {
    title: 'ULP and rounding',
    detail:
      'Units in the last place define spacing between representable numbers; rounding is inevitable.',
  },
  {
    title: 'NaN and infinity',
    detail:
      'NaN propagates through most operations; infinity appears on overflow and divides by zero.',
  },
  {
    title: 'Associativity loss',
    detail:
      'Floating point addition is not associative; reordering can change results in reductions.',
  },
  {
    title: 'Denormals',
    detail:
      'Very small magnitudes fall into subnormal numbers, which are slower and less precise.',
  },
  {
    title: 'Stable comparisons',
    detail:
      'Use epsilon comparisons or relative error checks instead of direct equality.',
  },
]

const encodingDetails = [
  {
    title: 'UTF-8 as dominant encoding',
    detail:
      'UTF-8 uses 1 to 4 bytes per code point and preserves ASCII for the first 128 values.',
  },
  {
    title: 'UTF-16 surrogate pairs',
    detail:
      'Some code points require two 16-bit code units; length in code units is not character count.',
  },
  {
    title: 'Normalization',
    detail:
      'Different byte sequences can represent the same visual text; normalization matters in security and search.',
  },
  {
    title: 'Grapheme clusters',
    detail:
      'What users see as one character may be multiple code points; slicing by code points can still break text.',
  },
  {
    title: 'Binary vs text I/O',
    detail:
      'Text I/O uses encodings and line endings; binary I/O is raw bytes with no interpretation.',
  },
  {
    title: 'Locale and formatting',
    detail:
      'Numeric formatting depends on locale, but primitive storage should remain locale-free.',
  },
]

const memoryLayoutExamples = [
  {
    title: 'Struct padding example',
    code: `// Layout on a 64-bit system
struct Example {
    uint8  a   // offset 0
    uint64 b   // offset 8 (7 bytes padding)
    uint16 c   // offset 16 (6 bytes padding to align)
}`,
    explanation:
      'Ordering fields from largest to smallest can shrink padding and reduce memory footprint.',
  },
  {
    title: 'Array of structs vs struct of arrays',
    code: `// AoS (easy but cache-unfriendly)
struct Particle { float x, y, z, vx, vy, vz }
Particle particles[N]

// SoA (SIMD-friendly)
float x[N], y[N], z[N], vx[N], vy[N], vz[N]`,
    explanation:
      'SoA keeps each field contiguous, improving cache behavior and vectorization.',
  },
]

const conversionRules = [
  {
    title: 'Widening conversions',
    detail:
      'Going from int32 to int64 is safe for values, but may affect performance and memory.',
  },
  {
    title: 'Narrowing conversions',
    detail:
      'Int64 to int32 can lose high bits; prefer explicit checks and range guards.',
  },
  {
    title: 'Float to int',
    detail:
      'Fractional parts are truncated or rounded depending on language; NaN and infinity need handling.',
  },
  {
    title: 'Int to float',
    detail:
      'Large integers lose precision once they exceed float mantissa capacity (about 16 million for float32).',
  },
  {
    title: 'Signedness changes',
    detail:
      'Casting a negative signed value to unsigned reinterprets the bits, producing a huge number.',
  },
  {
    title: 'Parsing vs casting',
    detail:
      'Parsing interprets text; casting reinterprets or converts numeric values. Mixing them is a bug magnet.',
  },
]

const languageQuirks = [
  {
    title: 'C and C++',
    detail:
      'Integer widths can vary by platform; signed overflow is undefined behavior; use fixed-width types for safety.',
  },
  {
    title: 'Java',
    detail:
      'Primitive sizes are fixed (int32, long64). Overflow wraps; float uses IEEE 754.',
  },
  {
    title: 'JavaScript / TypeScript',
    detail:
      'Numbers are float64; integers are safe up to 2^53 - 1. BigInt exists for larger exact values.',
  },
  {
    title: 'Python',
    detail:
      'Ints are arbitrary precision; floats are float64. Numeric performance depends on object overhead.',
  },
  {
    title: 'Go',
    detail:
      'int is word-sized; use int64 or uint64 for stable widths; conversion between numeric types is explicit.',
  },
  {
    title: 'Rust',
    detail:
      'Fixed-width types with explicit signedness. Debug builds check overflow; release wraps unless checked.',
  },
]
const selectionChecklist = [
  'Confirm the range of values and whether they can be negative.',
  'Decide if you need exact decimals or can tolerate rounding.',
  'Estimate memory impact at scale (arrays, tables, caches).',
  'Choose byte order and serialization format for portability.',
  'Define overflow behavior explicitly (wrap, clamp, error).',
  'Add tests around boundary values and conversions.',
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
    title: 'Time cost is constant, but not equal',
    detail:
      'Adds and bitwise ops are fastest; multiply is slower; division and modulo are slower still. Branches and memory access often dominate.',
  },
  {
    title: 'Memory footprint governs scale',
    detail:
      'Bit width determines cache density. Replacing int64 with int32 doubles cache residency and can halve memory bandwidth.',
  },
  {
    title: 'Precision budget is finite',
    detail:
      'Float32 holds about 7 decimal digits and float64 about 15-16; values beyond that lose exactness.',
  },
  {
    title: 'Overflow/underflow policy is a design choice',
    detail:
      'Wrapping is fast but dangerous; checked or saturating arithmetic trades speed for correctness.',
  },
  {
    title: 'Conversions have hidden cost',
    detail:
      'Crossing domains (int <-> float, BigInt <-> int) can trigger slow paths, allocations, or precision loss.',
  },
  {
    title: 'Alignment impacts throughput',
    detail:
      'Misaligned loads may require multiple memory reads; aligned data enables SIMD and stable performance.',
  },
]

const complexityTable = [
  {
    operation: 'Integer add / bitwise',
    time: 'O(1), very low',
    space: 'O(1)',
    notes: 'Often single-cycle; ideal for tight loops.',
  },
  {
    operation: 'Integer multiply',
    time: 'O(1), moderate',
    space: 'O(1)',
    notes: 'Slightly slower; still fast on modern CPUs.',
  },
  {
    operation: 'Integer divide / modulo',
    time: 'O(1), high',
    space: 'O(1)',
    notes: 'Typically the slowest primitive op; avoid in inner loops.',
  },
  {
    operation: 'Float add / multiply',
    time: 'O(1), moderate',
    space: 'O(1)',
    notes: 'Fast but non-associative; rounding error accumulates.',
  },
  {
    operation: 'Float divide',
    time: 'O(1), high',
    space: 'O(1)',
    notes: 'Slower and more error-prone; precompute reciprocals when possible.',
  },
  {
    operation: 'BigInt arithmetic',
    time: 'Varies with digits',
    space: 'O(n) digits',
    notes: 'Precision grows with input size; avoids overflow at a cost.',
  },
  {
    operation: 'Memory load/store',
    time: 'O(1), latency-bound',
    space: 'O(1)',
    notes: 'Cache misses dominate; compact types improve cache hit rate.',
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

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const win98HelpStyles = `
.win98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.win98-window {
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

.win98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.win98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.win98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
}

.win98-control {
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
}

.win98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.win98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.win98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.win98-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.win98-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.win98-toc-title {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 10px;
}

.win98-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.win98-toc-list li {
  margin: 0 0 8px;
}

.win98-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.win98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.win98-doc-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px;
}

.win98-section {
  margin: 0 0 20px;
}

.win98-heading {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px;
}

.win98-subheading {
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 6px;
}

.win98-content p,
.win98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.win98-content p {
  margin: 0 0 10px;
}

.win98-content ul,
.win98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.win98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.win98-codebox {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 8px;
  margin: 6px 0 10px;
}

.win98-codebox code {
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
  display: block;
}

.win98-inline-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 0 0 10px;
}

.win98-push {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  font-size: 12px;
  padding: 4px 8px;
  cursor: pointer;
}

.win98-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  margin: 4px 0 10px;
}

.win98-table th,
.win98-table td {
  border: 1px solid #808080;
  padding: 4px 6px;
  text-align: left;
}

@media (max-width: 900px) {
  .win98-main {
    grid-template-columns: 1fr;
  }

  .win98-toc {
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
    { id: 'bp-mental-models', label: 'Mental Models' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-categories', label: 'Primitive Categories' },
    { id: 'core-reference', label: 'Bit-Width Reference' },
    { id: 'core-integers', label: 'Integer Details' },
    { id: 'core-floats', label: 'Floating Point' },
    { id: 'core-encoding', label: 'Text and Encoding' },
    { id: 'core-machine', label: 'Machine Considerations' },
    { id: 'core-conversions', label: 'Conversion Rules' },
    { id: 'core-language', label: 'Language Differences' },
    { id: 'core-advanced', label: 'Advanced Insights' },
    { id: 'core-complexity', label: 'Complexity Notes' },
    { id: 'core-complexity-table', label: 'Complexity Snapshot' },
  ],
  examples: [
    { id: 'ex-layout', label: 'Memory Layout Patterns' },
    { id: 'ex-practical', label: 'Practical Examples' },
    { id: 'ex-real-world', label: 'Real-World Applications' },
  ],
  glossary: [
    { id: 'glossary-pitfalls', label: 'Common Pitfalls' },
    { id: 'glossary-checklist', label: 'Type Selection Checklist' },
    { id: 'glossary-when', label: 'When to Use It' },
    { id: 'glossary-takeaways', label: 'Key Takeaways' },
  ],
}

export default function PrimitiveTypesPage(): JSX.Element {
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
    document.title = `Primitive Types (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Primitive Types',
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
    <div className="win98-help-page">
      <style>{win98HelpStyles}</style>
      <div className="win98-window" role="presentation">
        <header className="win98-titlebar">
          <span className="win98-title-text">Primitive Types</span>
          <div className="win98-title-controls">
            <button className="win98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="win98-control" aria-label="Close">X</Link>
          </div>
        </header>
        <div className="win98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`win98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="win98-main">
          <aside className="win98-toc" aria-label="Table of contents">
            <h2 className="win98-toc-title">Contents</h2>
            <ul className="win98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="win98-content">
            <h1 className="win98-doc-title">Primitive Types</h1>
            <p>
              Primitive types turn raw bits into integers, booleans, characters, and pointers. They look simple, yet the choices
              you make at this level ripple through performance, storage, and even security. This page unpacks the history, intuition,
              mechanics, and tradeoffs behind these smallest units of data.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="win98-section">
                  <h2 className="win98-heading">Overview</h2>
                  <p>
                    Primitive types are the contract between your program and the machine. They determine how many bits are read, how they
                    are interpreted, and how the CPU aligns and moves them. Every higher-level structure relies on these atoms behaving predictably.
                  </p>
                </section>
                <hr className="win98-divider" />
                <section id="bp-history" className="win98-section">
                  <h2 className="win98-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-mental-models" className="win98-section">
                  <h2 className="win98-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-takeaways" className="win98-section">
                  <h2 className="win98-heading">Key Takeaways</h2>
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
                <section id="core-categories" className="win98-section">
                  <h2 className="win98-heading">Primitive Categories</h2>
                  {primitiveCategories.map((block) => (
                    <div key={block.heading}>
                      <h3 className="win98-subheading">{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
                <section id="core-reference" className="win98-section">
                  <h2 className="win98-heading">Bit-Width Reference</h2>
                  <table className="win98-table">
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Bits</th>
                        <th>Range / Precision</th>
                        <th>Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {representationTable.map((row) => (
                        <tr key={row.type}>
                          <td>{row.type}</td>
                          <td>{row.bits}</td>
                          <td>{row.range}</td>
                          <td>{row.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
                <section id="core-integers" className="win98-section">
                  <h2 className="win98-heading">Integer Details and Overflow Behavior</h2>
                  {integerDetails.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-floats" className="win98-section">
                  <h2 className="win98-heading">Floating Point Deep Dive</h2>
                  {floatingPointDetails.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    If you need predictable decimal math, move to fixed-point or decimal libraries. Float is excellent for scientific
                    ranges but must be treated as approximate.
                  </p>
                </section>
                <section id="core-encoding" className="win98-section">
                  <h2 className="win98-heading">Text and Encoding Realities</h2>
                  {encodingDetails.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-machine" className="win98-section">
                  <h2 className="win98-heading">Machine Considerations</h2>
                  {machineConsiderations.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-conversions" className="win98-section">
                  <h2 className="win98-heading">Conversion Rules and Casting Hazards</h2>
                  {conversionRules.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-language" className="win98-section">
                  <h2 className="win98-heading">Language-Specific Differences</h2>
                  {languageQuirks.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-advanced" className="win98-section">
                  <h2 className="win98-heading">Advanced Insights</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-complexity" className="win98-section">
                  <h2 className="win98-heading">Complexity Analysis and Tradeoffs</h2>
                  {complexityNotes.map((note) => (
                    <p key={note.title}>
                      <strong>{note.title}:</strong> {note.detail}
                    </p>
                  ))}
                  <p>
                    Every primitive choice balances range, precision, memory, and speed. The right call depends on the data domain,
                    error tolerance, and performance envelope you need to hit.
                  </p>
                </section>
                <section id="core-complexity-table" className="win98-section">
                  <h2 className="win98-heading">Complexity Snapshot</h2>
                  <table className="win98-table">
                    <thead>
                      <tr>
                        <th>Operation</th>
                        <th>Time</th>
                        <th>Space</th>
                        <th>Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {complexityTable.map((row) => (
                        <tr key={row.operation}>
                          <td>{row.operation}</td>
                          <td>{row.time}</td>
                          <td>{row.space}</td>
                          <td>{row.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                <section id="ex-layout" className="win98-section">
                  <h2 className="win98-heading">Memory Layout Patterns</h2>
                  {memoryLayoutExamples.map((example) => (
                    <div key={example.title}>
                      <h3 className="win98-subheading">{example.title}</h3>
                      <div className="win98-codebox">
                        <code>{example.code}</code>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>
                <section id="ex-practical" className="win98-section">
                  <h2 className="win98-heading">Practical Examples</h2>
                  {examples.map((example) => (
                    <div key={example.title}>
                      <h3 className="win98-subheading">{example.title}</h3>
                      <div className="win98-codebox">
                        <code>{example.code}</code>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>
                <section id="ex-real-world" className="win98-section">
                  <h2 className="win98-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'glossary' && (
              <>
                <section id="glossary-pitfalls" className="win98-section">
                  <h2 className="win98-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="glossary-checklist" className="win98-section">
                  <h2 className="win98-heading">Type Selection Checklist</h2>
                  <ol>
                    {selectionChecklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
                <section id="glossary-when" className="win98-section">
                  <h2 className="win98-heading">When to Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
                <section id="glossary-takeaways" className="win98-section">
                  <h2 className="win98-heading">Key Takeaways</h2>
                  <ul>
                    {takeaways.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
