import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

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
    detail:
      'Every bit is capacity. Choosing int16 over int64 is deciding how much numeric range and memory you budget for the task.',
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
    <TopicLayout
      title="Primitive Types"
      subtitle="Fixed-size building blocks that shape correctness, performance, and portability"
      intro="Primitive types turn raw bits into integers, booleans, characters, and pointers. They look simple, yet the choices you make at this level ripple through performance, storage, and even security. This page unpacks the history, intuition, mechanics, and tradeoffs behind these smallest units of data."
    >
      <TopicSection heading="The big picture">
        <p className="text-white/80">
          Primitive types are the contract between your program and the machine. They determine how many bits are read, how they are
          interpreted, and how the CPU aligns and moves them. Every higher-level structure relies on these atoms behaving predictably.
        </p>
      </TopicSection>

      <TopicSection heading="Historical context">
        <div className="grid gap-3 md:grid-cols-2">
          {historicalMilestones.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Core concept and mental models">
        <div className="grid gap-3 md:grid-cols-2">
          {mentalModels.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="How it works: primitive categories">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {primitiveCategories.map((block) => (
            <article key={block.heading} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{block.heading}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/80">
                {block.bullets.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="How it works: machine considerations">
        <div className="grid gap-3 md:grid-cols-2">
          {machineConsiderations.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Complexity analysis and tradeoffs">
        <div className="grid gap-3 md:grid-cols-2">
          {complexityNotes.map((note) => (
            <article key={note.title} className="rounded-lg bg-white/5 p-4">
              <h4 className="text-sm font-semibold text-white">{note.title}</h4>
              <p className="text-sm text-white/80">{note.detail}</p>
            </article>
          ))}
        </div>
        <p className="mt-3 text-sm text-white/70">
          Every primitive choice balances range, precision, memory, and speed. The right call depends on the data domain, error
          tolerance, and performance envelope you need to hit.
        </p>
      </TopicSection>

      <TopicSection heading="Real-world applications">
        <div className="grid gap-3 md:grid-cols-2">
          {realWorldUses.map((item) => (
            <article key={item.context} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.context}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Practical examples">
        <div className="space-y-4">
          {examples.map((example) => (
            <article key={example.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{example.title}</p>
              <pre className="mt-2 overflow-x-auto rounded bg-black/40 p-3 text-xs text-white/90">
                <code>{example.code}</code>
              </pre>
              <p className="text-sm text-white/80">{example.explanation}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Common pitfalls">
        <ul className="list-disc space-y-2 pl-5 text-sm text-white/80">
          {pitfalls.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </TopicSection>

      <TopicSection heading="When to use it">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/80">
          {decisionGuidance.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </TopicSection>

      <TopicSection heading="Advanced insights">
        <div className="grid gap-3 md:grid-cols-2">
          {advancedInsights.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Key takeaways">
        <div className="rounded-lg border border-emerald-400/40 bg-emerald-500/10 p-4">
          <ul className="list-disc space-y-2 pl-5 text-sm text-emerald-100">
            {takeaways.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </TopicSection>
    </TopicLayout>
  )
}
