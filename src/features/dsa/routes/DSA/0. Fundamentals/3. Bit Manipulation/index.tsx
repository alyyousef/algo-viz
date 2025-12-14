import { Link } from 'react-router-dom'

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

const styles = `
  * {
    box-sizing: border-box;
  }

  .win95-page {
    width: 100%;
    min-height: 100vh;
    background: #C0C0C0;
    color: #000;
    font-family: 'MS Sans Serif', 'Tahoma', sans-serif;
    font-size: 12px;
    line-height: 1.35;
    -webkit-font-smoothing: none;
    text-rendering: optimizeSpeed;
    margin: 0;
    padding: 0;
  }

  .win95-window {
    width: 100%;
    min-height: 100vh;
    border: 2px solid;
    border-color: #fff #404040 #404040 #fff;
    background: #C0C0C0;
    display: flex;
    flex-direction: column;
  }

  .win95-title-bar {
    background: #000080;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 6px;
    gap: 8px;
    font-weight: bold;
    letter-spacing: 0.2px;
  }

  .win95-title {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .win95-close {
    background: #C0C0C0;
    color: #000;
    border: 2px solid;
    border-color: #fff #404040 #404040 #fff;
    font-weight: bold;
    padding: 2px 10px;
    min-width: 28px;
    cursor: pointer;
  }

  .win95-close:active {
    border-color: #404040 #fff #fff #404040;
    background: #9c9c9c;
  }

  .win95-close:focus-visible {
    outline: 1px dotted #000;
    outline-offset: -4px;
  }

  .win95-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 10px;
  }

  .win95-header-row {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 4px;
  }

  .win95-button {
    padding: 3px 10px 2px;
    background: #C0C0C0;
    border: 2px solid;
    border-color: #fff #404040 #404040 #fff;
    font-size: 11px;
    font-weight: bold;
    cursor: pointer;
    line-height: 1.2;
    text-decoration: none;
    color: #000;
  }

  .win95-button:active {
    border-color: #404040 #fff #fff #404040;
    background: #9c9c9c;
  }

  .win95-button:focus-visible {
    outline: 1px dotted #000;
    outline-offset: -3px;
  }

  .win95-section {
    border: 2px solid;
    border-color: #808080 #404040 #404040 #808080;
    padding: 10px;
    margin: 0;
  }

  .win95-section legend {
    padding: 0 6px;
    font-weight: bold;
  }

  .win95-stack {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .win95-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 8px;
  }

  .win95-grid.tight {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 6px;
  }

  .win95-panel {
    border: 2px solid;
    border-color: #808080 #fff #fff #808080;
    background: #C0C0C0;
    padding: 8px;
  }

  .win95-panel.raised {
    border-color: #fff #404040 #404040 #fff;
  }

  .win95-panel code,
  .win95-panel strong {
    font-weight: bold;
  }

  .win95-text {
    margin: 0;
  }

  .win95-list {
    margin: 0;
    padding-left: 18px;
    display: grid;
    gap: 6px;
  }

  .win95-ordered {
    margin: 0;
    padding-left: 20px;
    display: grid;
    gap: 6px;
  }

  .win95-code {
    margin: 8px 0 6px;
    padding: 8px;
    background: #bdbdbd;
    border: 2px solid;
    border-color: #404040 #fff #fff #404040;
    font-family: 'Courier New', monospace;
    font-size: 11px;
    overflow-x: auto;
    color: #000;
  }

  a {
    color: #000;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  a:focus-visible,
  button:focus-visible {
    outline: 1px dotted #000;
    outline-offset: 2px;
  }

  button {
    font-family: 'MS Sans Serif', 'Tahoma', sans-serif;
    font-size: 12px;
  }

  .win95-caption {
    margin: 6px 0 0;
  }
`

export default function BitManipulationPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{styles}</style>
      <div className="win95-window">
        <div className="win95-title-bar">
          <span className="win95-title">Bit Manipulation</span>
          <button type="button" className="win95-close" aria-label="Close">
            X
          </button>
        </div>

        <div className="win95-content">
          <div className="win95-header-row">
            <Link to="/algoViz" className="win95-button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-section">
            <legend>The big picture</legend>
            <div className="win95-panel">
              <p className="win95-text">
                Bits are the native language of hardware. They let you store dozens of flags in one cache line, scan through
                subsets without allocations, and implement error detection with tiny constant factors. The same ideas explain
                why file permissions, chess engines, compression codecs, and circuit design all converge on the same handful
                of bitwise primitives.
              </p>
              <p className="win95-text win95-caption">
                Thinking in bits also exposes trade-offs. You gain predictability and compactness, but you pay in readability
                and sometimes in portability when you lean on undefined shift behavior. The goal is not to use bit tricks
                everywhere, but to know when they turn a hot path from microseconds to nanoseconds.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-section">
            <legend>Historical context</legend>
            <div className="win95-grid">
              {historicalMilestones.map((item) => (
                <div key={item.title} className="win95-panel">
                  <p className="win95-text">
                    <strong>{item.title}</strong>
                  </p>
                  <p className="win95-text win95-caption">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-section">
            <legend>Core concept and mental models</legend>
            <div className="win95-grid">
              {mentalModels.map((model) => (
                <div key={model.title} className="win95-panel">
                  <p className="win95-text">
                    <strong>{model.title}</strong>
                  </p>
                  <p className="win95-text win95-caption">{model.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-section">
            <legend>How it works in practice</legend>
            <div className="win95-grid tight">
              {operations.map((block) => (
                <div key={block.heading} className="win95-panel">
                  <p className="win95-text">
                    <strong>{block.heading}</strong>
                  </p>
                  <ul className="win95-list">
                    {block.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="win95-text win95-caption">
              These identities show up in LeetCode, HackerRank, and systems code alike. The mechanics never change: choose a
              mask, combine with AND, OR, XOR, or shifts, and interpret the resulting pattern. The art is in choosing
              representations that make those operations express the problem naturally.
            </p>
          </fieldset>

          <fieldset className="win95-section">
            <legend>Complexity analysis</legend>
            <div className="win95-grid">
              {complexityNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <p className="win95-text">
                    <strong>{item.title}</strong>
                  </p>
                  <p className="win95-text win95-caption">{item.detail}</p>
                </div>
              ))}
            </div>
            <p className="win95-text win95-caption">
              Real-world implication: if your inner loop already fits in L1 cache, a branch misprediction costs 10 to 20
              cycles while a bitwise AND costs 1. That gap widens on superscalar CPUs with POPCNT and BMI2 available.
            </p>
          </fieldset>

          <fieldset className="win95-section">
            <legend>Real-world applications</legend>
            <div className="win95-grid">
              {applications.map((item) => (
                <div key={item.context} className="win95-panel">
                  <p className="win95-text">
                    <strong>{item.context}</strong>
                  </p>
                  <p className="win95-text win95-caption">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-section">
            <legend>Practical examples</legend>
            <div className="win95-stack">
              {practicalExamples.map((example) => (
                <div key={example.title} className="win95-panel">
                  <p className="win95-text">
                    <strong>{example.title}</strong>
                  </p>
                  <pre className="win95-code">
                    <code>{example.code}</code>
                  </pre>
                  <p className="win95-text win95-caption">{example.note}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-section">
            <legend>Common pitfalls and debugging cues</legend>
            <ul className="win95-list">
              {pitfalls.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="win95-text win95-caption">
              When debugging, print masks in binary with leading zeros so alignment bugs are visible. Many failures boil down
              to an off-by-one shift or a mask that does not cover the intended range.
            </p>
          </fieldset>

          <fieldset className="win95-section">
            <legend>When to use it</legend>
            <ol className="win95-ordered">
              {decisionGuidance.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </fieldset>

          <fieldset className="win95-section">
            <legend>Advanced insights and optimizations</legend>
            <div className="win95-grid">
              {advancedInsights.map((item) => (
                <div key={item.title} className="win95-panel">
                  <p className="win95-text">
                    <strong>{item.title}</strong>
                  </p>
                  <p className="win95-text win95-caption">{item.detail}</p>
                </div>
              ))}
            </div>
            <p className="win95-text win95-caption">
              Sources: CLRS, Hacker&apos;s Delight by Warren, GeeksforGeeks bit manipulation series, and LeetCode discussions all
              catalog these patterns with proofs and edge cases. Cross-referencing them prevents subtle portability bugs.
            </p>
          </fieldset>

          <fieldset className="win95-section">
            <legend>Key takeaways</legend>
            <div className="win95-panel raised">
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
