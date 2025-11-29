import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const historicalMilestones = [
  {
    title: 'George Boole links algebra to logic (1854)',
    detail:
      'Boolean algebra made it natural to think of truth as 1 and falsehood as 0, paving the way for hardware that natively understands bitwise logic.',
  },
  {
    title: 'Claude Shannon shows circuits implement Boolean algebra (1937)',
    detail:
      'Shannon proved that relays and gates can compute logical expressions. Modern CPUs expose those gates as bitwise instructions that run in a single cycle.',
  },
  {
    title: 'Richard Hamming introduces parity and error correction (1950)',
    detail:
      'Hamming codes rely on XOR parity bits to detect and fix single-bit errors in memory and communication links, a direct application of bit manipulation.',
  },
  {
    title: 'Brian Kernighan popularizes the x & (x - 1) trick (1970s)',
    detail:
      'A tiny loop that drops the lowest set bit enabled fast population counts before hardware POPCNT existed and still appears in CLRS and GeeksforGeeks tutorials.',
  },
  {
    title: 'Bloom filters demonstrate probabilistic bitsets (1970)',
    detail:
      'Burton Bloom showed how a compact bit array plus multiple hashes can represent large sets with controlled false positives, an early win for space-efficient bit work.',
  },
  {
    title: 'Bitboards reshape chess engines (1980s)',
    detail:
      'Representing a chessboard as a 64-bit integer let engines like Crafty and modern Stockfish evaluate moves with a handful of bitwise operations per piece.',
  },
]

const mentalModels = [
  {
    title: 'Light switch panel',
    detail:
      'A mask selects which switches you can reach. AND tests a switch, OR turns it on, XOR flips it. Shifts slide the whole panel left or right.',
  },
  {
    title: 'Transparent overlay',
    detail:
      'Shifting by k is like sliding an overlay by k columns so every mark now lines up with a different position. It preserves pattern shape while changing its alignment.',
  },
  {
    title: 'Parity ledger',
    detail:
      'XOR behaves like a running ledger for parity: adding the same entry twice cancels it. That intuition powers error detection and fast toggles.',
  },
  {
    title: 'Tiny backpack',
    detail:
      'A W-bit integer stores W booleans in a single cache line. Bitsets trade readability for extreme locality and constant-time bulk operations.',
  },
]

const operations = [
  {
    heading: 'Test and inspect',
    bullets: [
      'Mask then AND: (x & (1 << k)) checks if the kth bit is set.',
      'Combine multiple tests: (x & mask) === mask asserts every targeted bit is on.',
      'Extract ranges by masking then shifting back down to bit 0.',
    ],
  },
  {
    heading: 'Set, clear, and toggle',
    bullets: [
      'Set with OR: x | (1 << k). Clear with AND of the inverted mask: x & ~(1 << k).',
      'Toggle with XOR: x ^ (1 << k). Reapplying the same toggle reverts the change.',
      'Clear lowest set bit with x & (x - 1); isolate it with x & -x.',
    ],
  },
  {
    heading: 'Shift and align',
    bullets: [
      'Left shift multiplies by 2^k for unsigned values and creates room for new flags.',
      'Right shift unsigned divides by 2^k with floor semantics. Arithmetic right shift preserves sign for signed integers.',
      'Round up to powers of two with a sequence of shifts and ORs, then add 1. Useful for memory alignment.',
    ],
  },
  {
    heading: 'Aggregate quickly',
    bullets: [
      "Population count (Hamming weight) counts set bits. Modern CPUs expose POPCNT; fall back to Kernighan's loop or SWAR tricks.",
      'Bitwise DP iterates submasks with for (s = mask; s; s = (s - 1) & mask).',
      'Prefix masks let you apply the same transformation to many flags without branching.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Constant time, constant cache footprint',
    detail:
      'Single bitwise instructions are O(1) with tiny constant factors. Packing 64 flags in one 64-bit word keeps all updates inside a cache line, which is often more important than the instruction count.',
  },
  {
    title: 'Word size limits',
    detail:
      'Bit tricks operate on machine word width (typically 32 or 64 bits). Larger bitsets use arrays of words, so operations become O(n / wordSize) but remain predictable and vectorizable.',
  },
  {
    title: 'Hardware assists',
    detail:
      'Instructions like POPCNT, CLZ, and BMI1/BMI2 on x86 or ARM NEON intrinsics collapse loops into one or two cycles. Knowing whether your target CPU has them informs algorithm choice.',
  },
  {
    title: 'Numerical stability',
    detail:
      'Bitwise operations avoid rounding error common in floating point math, which is why graphics pipelines and cryptography lean on them for deterministic behavior.',
  },
]

const applications = [
  {
    context: 'Operating systems and permissions',
    detail:
      'Unix permission bits, page table flags, and interrupt masks store many booleans inside a single word so kernel checks stay branch-light and cache friendly.',
  },
  {
    context: 'Compilers and virtual machines',
    detail:
      'Register allocation and instruction selection often use bitsets to represent live ranges and feature sets. SSA optimizations rely on fast subset and union checks.',
  },
  {
    context: 'Search and recommendation',
    detail:
      'Bitsets represent user attributes or document features so filters become fast AND/OR scans across roaring bitmaps. Systems like Elasticsearch and analytics engines rely on these layouts.',
  },
  {
    context: 'Games and simulations',
    detail:
      'Chess bitboards, cellular automata, and physics masks evaluate many interactions at once. One 64-bit operation can update an entire row of cells.',
  },
  {
    context: 'Networking and compression',
    detail:
      'Protocol headers pack control fields into specific bit ranges. Variable-length codes in compression formats peel bits off streams with masks and shifts.',
  },
]

const practicalExamples = [
  {
    title: 'Subset DP with bitmasks',
    code: `// Count ways to cover all tasks with given masks
function minTeams(masks, fullMask):
    INF = 1e9
    dp = array[1 << bits] filled with INF
    dp[0] = 0
    for mask in 0..fullMask:
        for m in masks:
            nextMask = mask | m
            dp[nextMask] = min(dp[nextMask], dp[mask] + 1)
    return dp[fullMask]`,
    note:
      "Represent each team's skills as a mask. OR accumulates coverage. Complexity is O(2^n * teams), far faster than enumerating subsets of subsets explicitly.",
  },
  {
    title: 'Isolate and clear bits safely',
    code: `// JavaScript
function lowestSetBit(x) {
  return x & -x
}

function clearLowestSetBit(x) {
  return x & (x - 1)
}

// Use cases: iterate through set bits without branches
for (let bits = mask; bits !== 0; bits &= bits - 1) {
  const bit = bits & -bits
  // process bit
}`,
    note:
      "These identities rely on two's complement representation. They avoid scanning every position and scale with the number of set bits, not word size.",
  },
  {
    title: 'Bitboards for chess moves',
    code: `// 64-bit integer board. 1 means a white rook occupies that square.
rook = 0x0000000000000080  // h1
fileMask = 0x0101010101010101  // file A mask

// Shift by 1 to move east, 8 to move north on a little-endian board
eastMoves = (rook << 1) & 0xfefefefefefefefe  // avoid wrapping to next rank
northMoves = rook << 8
reachable = eastMoves | northMoves`,
    note:
      'Precomputed edge masks prevent wraparound. Engines combine masks for sliding pieces and use occupancy bitboards to block movement in constant time.',
  },
]

const pitfalls = [
  'Shifting a signed integer right can propagate the sign bit. Prefer unsigned types or explicit logical shifts when the sign should be ignored.',
  'Overflow from left shifts is undefined in C and C++. Use unsigned integers or narrow masks to keep behavior portable.',
  'Mask precedence surprises: 1 << k + 3 equals 1 << (k + 3) because << binds lower than +. Parenthesize intent.',
  "Bit tricks trade clarity for speed. Without comments or references, they become maintenance hazards. Link to a source such as Hacker's Delight when using dense idioms.",
  'Endianness matters when reading packed data from the wire. Masks must match the byte order used by the protocol.',
]

const decisionGuidance = [
  'Choose bitsets when you have a bounded universe of flags and need O(1) unions, intersections, and membership with tight memory locality.',
  'Use masks and branchless operations in hot paths where branch misprediction dominates cost, such as parsing or inner loops of simulations.',
  'Switch to higher-level sets or hash tables when the domain is sparse or unbounded. Bitsets waste space when the maximum index grows large.',
  "Prefer language intrinsics like std::bitset, std::popcount, or Java's BitSet to avoid reimplementing primitives and to gain hardware acceleration.",
  'Document any non-obvious identity (x & -x, x & (x - 1), Gray code conversions) and add small tests to catch accidental regressions.',
]

const advancedInsights = [
  {
    title: 'Vectorized and word-parallel techniques',
    detail:
      'SWAR (SIMD Within A Register) packs many small fields into one word and uses masks to operate on them in parallel. Libraries like SIMD bitsets and roaring bitmaps leverage this to scan millions of flags per millisecond.',
  },
  {
    title: 'Hardware popcount and leading-zero counts',
    detail:
      'Modern CPUs expose POPCNT, LZCNT, and CLZ instructions. Use compiler builtins like __builtin_popcountll (GCC/Clang) or std::popcount (C++20) to let the compiler pick the optimal instruction.',
  },
  {
    title: 'Gray codes and enumeration order',
    detail:
      'Gray code sequences change only one bit between neighbors, reducing glitching in digital circuits and enabling smooth traversal of subset spaces in algorithms that benefit from single-bit diffs.',
  },
  {
    title: 'Bit slicing and cryptography',
    detail:
      'Block ciphers and hash functions sometimes implement S-boxes with bit slicing to process multiple blocks in parallel using bitwise logic. This improves constant-time behavior and resists timing attacks.',
  },
  {
    title: 'Memory-friendly compressed bitsets',
    detail:
      'Roaring bitmaps and EWAH compress sparse bitsets while preserving fast bitwise operations. They are widely used in analytics systems like Apache Lucene and Druid.',
  },
]

const takeaways = [
  'Bits are about locality and determinism. They reduce many boolean decisions to a single word operation.',
  'Master a handful of identities (masking, toggling, x & -x, submask iteration) and you cover most interview and systems tasks.',
  'Hardware support like POPCNT and BMI2 shifts the balance: always check what your target CPU offers before inventing software loops.',
  'Readable comments and small assertions keep clever bit hacks from turning into maintenance traps.',
  "Cross-verify tricks with trusted sources such as CLRS, Hacker's Delight, GeeksforGeeks, or LeetCode discussions to avoid folklore bugs.",
]

export default function BitManipulationPage(): JSX.Element {
  return (
    <TopicLayout
      title="Bit Manipulation"
      subtitle="Binary control for speed, space, and determinism"
      intro="Bit manipulation treats integers as dense packs of truth values and low-level fields. It compresses many boolean decisions into word-sized operations that the CPU executes in a single cycle. Used well, it improves cache locality, eliminates branches, and unlocks algorithms that would be infeasible with higher-level structures."
    >
      <TopicSection heading="The big picture">
        <p className="text-white/80">
          Bits are the native language of hardware. They let you store dozens of flags in one cache line,
          scan through subsets without allocations, and implement error detection with tiny constant factors.
          The same ideas explain why file permissions, chess engines, compression codecs, and circuit design all
          converge on the same handful of bitwise primitives.
        </p>
        <p className="text-white/80">
          Thinking in bits also exposes trade-offs. You gain predictability and compactness, but you pay in readability
          and sometimes in portability when you lean on undefined shift behavior. The goal is not to use bit tricks
          everywhere, but to know when they turn a hot path from microseconds to nanoseconds.
        </p>
      </TopicSection>

      <TopicSection heading="Historical context">
        <div className="grid gap-3 md:grid-cols-2">
          {historicalMilestones.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/75">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Core concept and mental models">
        <div className="grid gap-3 md:grid-cols-2">
          {mentalModels.map((model) => (
            <article key={model.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{model.title}</p>
              <p className="text-sm text-white/75">{model.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="How it works in practice">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {operations.map((block) => (
            <article key={block.heading} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{block.heading}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/75">
                {block.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="mt-3 text-sm text-white/70">
          These identities show up in LeetCode, HackerRank, and systems code alike. The mechanics never change:
          choose a mask, combine with AND, OR, XOR, or shifts, and interpret the resulting pattern. The art is
          in choosing representations that make those operations express the problem naturally.
        </p>
      </TopicSection>

      <TopicSection heading="Complexity analysis">
        <div className="grid gap-3 md:grid-cols-2">
          {complexityNotes.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/75">{item.detail}</p>
            </article>
          ))}
        </div>
        <p className="mt-3 text-sm text-white/70">
          Real-world implication: if your inner loop already fits in L1 cache, a branch misprediction costs 10 to 20 cycles
          while a bitwise AND costs 1. That gap widens on superscalar CPUs with POPCNT and BMI2 available.
        </p>
      </TopicSection>

      <TopicSection heading="Real-world applications">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {applications.map((item) => (
            <article key={item.context} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.context}</p>
              <p className="text-sm text-white/75">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Practical examples">
        <div className="space-y-4">
          {practicalExamples.map((example) => (
            <article key={example.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{example.title}</p>
              <pre className="mt-2 overflow-x-auto rounded bg-black/40 p-3 text-xs text-white/90">
                <code>{example.code}</code>
              </pre>
              <p className="text-sm text-white/75">{example.note}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Common pitfalls and debugging cues">
        <ul className="list-disc space-y-2 pl-5 text-sm text-white/80">
          {pitfalls.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-white/70">
          When debugging, print masks in binary with leading zeros so alignment bugs are visible. Many failures boil down to an
          off-by-one shift or a mask that does not cover the intended range.
        </p>
      </TopicSection>

      <TopicSection heading="When to use it">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/80">
          {decisionGuidance.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </TopicSection>

      <TopicSection heading="Advanced insights and optimizations">
        <div className="grid gap-3 md:grid-cols-2">
          {advancedInsights.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/75">{item.detail}</p>
            </article>
          ))}
        </div>
        <p className="mt-3 text-sm text-white/70">
          Sources: CLRS, Hacker's Delight by Warren, GeeksforGeeks bit manipulation series, and LeetCode discussions all
          catalog these patterns with proofs and edge cases. Cross-referencing them prevents subtle portability bugs.
        </p>
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
