import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

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
      'Shannon proved that relays and gates can compute logical expressions. Modern CPUs expose those gates as bitwise instructions.',
  },
  {
    title: 'Richard Hamming introduces parity and error correction (1950)',
    detail:
      'Hamming codes rely on XOR parity bits to detect and fix single-bit errors in memory and communication links.',
  },
  {
    title: 'Bloom filters demonstrate probabilistic bitsets (1970)',
    detail:
      'A compact bit array plus hashes represents large sets with controlled false positives, a major win for space efficiency.',
  },
  {
    title: 'Bitboards reshape chess engines (1980s)',
    detail:
      'Representing a board as a 64-bit integer lets engines evaluate moves with a few bitwise ops per piece.',
  },
  {
    title: 'Modern CPU bit instructions (2000s)',
    detail: 'Hardware POPCNT, CLZ, and BMI2 instructions turn loops into single-cycle operations.',
  },
]

const mentalModels = [
  {
    title: 'Light switch panel',
    detail:
      'A mask selects which switches you can reach. AND tests a switch, OR turns it on, XOR flips it.',
  },
  {
    title: 'Transparent overlay',
    detail:
      'Shifts slide the overlay left or right. The pattern stays the same, but its position changes.',
  },
  {
    title: 'Parity ledger',
    detail:
      'XOR is a parity ledger: adding the same entry twice cancels it. That powers toggles and checksums.',
  },
  {
    title: 'Tiny backpack',
    detail:
      'A 64-bit word stores 64 booleans. Bitsets trade readability for tight memory locality.',
  },
  {
    title: 'Number line of powers of two',
    detail: 'Each bit position is a power of two. Setting bits adds those values together.',
  },
]

const bitFundamentals = [
  {
    title: 'Bit numbering',
    detail:
      'Bit 0 is the least significant bit (LSB). Bit 31 or 63 is the most significant bit (MSB).',
  },
  {
    title: "Two's complement",
    detail: "Signed integers use two's complement. Negation is bitwise NOT plus 1.",
  },
  {
    title: 'Unsigned vs signed shifts',
    detail:
      'Logical shifts fill with zeros; arithmetic shifts preserve the sign bit for signed values.',
  },
  {
    title: 'Masks as filters',
    detail: 'AND keeps bits where the mask has 1s. OR sets bits where the mask has 1s.',
  },
  {
    title: 'Bitwise vs logical',
    detail: 'Bitwise operators act on every bit; logical operators act on whole boolean values.',
  },
  {
    title: 'Endianness',
    detail: 'Endianness changes byte order in memory, not the bit numbering inside a byte.',
  },
]

const coreOperations = [
  {
    heading: 'Test and inspect',
    bullets: [
      'Test bit k: (x & (1 << k)) !== 0.',
      'Check multiple bits: (x & mask) === mask.',
      'Extract a range: (x >> l) & ((1 << width) - 1).',
    ],
  },
  {
    heading: 'Set, clear, toggle',
    bullets: [
      'Set bit k: x | (1 << k).',
      'Clear bit k: x & ~(1 << k).',
      'Toggle bit k: x ^ (1 << k).',
    ],
  },
  {
    heading: 'Shift and align',
    bullets: [
      'Left shift by k multiplies by 2^k for unsigned values.',
      'Right shift by k divides by 2^k with floor for unsigned.',
      'Use shifts to align to powers of two in allocators.',
    ],
  },
  {
    heading: 'Aggregate quickly',
    bullets: [
      'Popcount counts set bits; use hardware intrinsics when available.',
      'Iterate set bits with x & (x - 1) to skip zeros.',
      'Enumerate submasks: for (s = mask; s; s = (s - 1) & mask).',
    ],
  },
  {
    heading: 'Isolate and clear',
    bullets: [
      'Lowest set bit: x & -x.',
      'Clear lowest set bit: x & (x - 1).',
      'Check power of two: x > 0 and (x & (x - 1)) == 0.',
    ],
  },
]

const identities = [
  {
    title: 'x & (x - 1)',
    detail: 'Drops the lowest set bit. Great for iterating set bits or counting bits.',
  },
  {
    title: 'x & -x',
    detail: 'Isolates the lowest set bit. Useful for Fenwick trees and subset iteration.',
  },
  {
    title: 'x ^ x = 0',
    detail: 'XOR cancels duplicates; use it to find the unique element in a paired list.',
  },
  {
    title: 'x | (x + 1)',
    detail: 'Sets the lowest zero bit to 1. Useful in some indexing tricks.',
  },
  {
    title: 'x & ~x = 0',
    detail: 'No bit can be both 1 and 0; a sanity check for masks.',
  },
  {
    title: 'masking ranges',
    detail: 'Low k bits mask: (1 << k) - 1. High bits: ~((1 << k) - 1).',
  },
]

const complexityNotes = [
  {
    title: 'Constant time, tiny constants',
    detail:
      'Bitwise instructions are O(1) and often single-cycle. Packed flags reduce cache misses.',
  },
  {
    title: 'Word-size scaling',
    detail: 'Bit tricks operate on 32- or 64-bit words. Larger bitsets scale as O(n / wordSize).',
  },
  {
    title: 'Hardware assists',
    detail: 'POPCNT, CLZ, and bit scan instructions collapse loops into one or two operations.',
  },
  {
    title: 'Branch elimination',
    detail: 'Bitwise code often avoids branches, reducing misprediction penalties in tight loops.',
  },
  {
    title: 'Determinism',
    detail: 'Integer bit operations avoid floating point rounding, a win for crypto and graphics.',
  },
]

const useCases = [
  {
    context: 'Operating systems and permissions',
    detail:
      'Unix permission bits, page table flags, and interrupt masks store many booleans in one word.',
  },
  {
    context: 'Networking and protocols',
    detail: 'Headers pack multiple fields into bit ranges; masks extract them quickly.',
  },
  {
    context: 'Graphics and games',
    detail: 'Bitboards, collision masks, and shader flags use bitwise math for fast updates.',
  },
  {
    context: 'Databases and search',
    detail: 'Bitmap indexes and roaring bitmaps let filters become fast AND/OR scans.',
  },
  {
    context: 'Error detection',
    detail: 'Parity and CRC checks rely on XOR to detect transmission errors.',
  },
  {
    context: 'Compression',
    detail: 'Variable-length codes peel bits from a stream with shifts and masks.',
  },
]

const cheatSheet = [
  { op: 'Set bit k', expr: 'x | (1 << k)', note: 'Turn on a flag.' },
  { op: 'Clear bit k', expr: 'x & ~(1 << k)', note: 'Turn off a flag.' },
  { op: 'Toggle bit k', expr: 'x ^ (1 << k)', note: 'Flip a flag.' },
  { op: 'Test bit k', expr: '(x & (1 << k)) != 0', note: 'Check a flag.' },
  { op: 'Low k bits', expr: '(1 << k) - 1', note: 'Mask of k ones.' },
  { op: 'Isolate LSB', expr: 'x & -x', note: 'Lowest set bit.' },
  { op: 'Clear LSB', expr: 'x & (x - 1)', note: 'Drop lowest set bit.' },
  { op: 'Power of two', expr: 'x > 0 && (x & (x - 1)) == 0', note: 'Exactly one bit set.' },
]

const practicalExamples = [
  {
    title: 'Subset DP with bitmasks',
    code: `function minTeams(masks, fullMask):
    INF = 1e9
    dp = array[1 << bits] filled with INF
    dp[0] = 0
    for mask in 0..fullMask:
        for m in masks:
            nextMask = mask | m
            dp[nextMask] = min(dp[nextMask], dp[mask] + 1)
    return dp[fullMask]`,
    explanation:
      'Represent each team as a bitmask. OR combines skills. Complexity is O(2^n * teams).',
  },
  {
    title: 'Count set bits fast',
    code: `function popcount(x):
    count = 0
    while x != 0:
        x &= x - 1
        count += 1
    return count`,
    explanation: 'Loops only over set bits, not all bit positions.',
  },
  {
    title: 'Find the unique element',
    code: `function singleNumber(arr):
    acc = 0
    for x in arr:
        acc ^= x
    return acc`,
    explanation: 'Pairs cancel out with XOR, leaving the unique value.',
  },
  {
    title: 'Round up to next power of two',
    code: `function nextPow2(x):
    x -= 1
    x |= x >> 1
    x |= x >> 2
    x |= x >> 4
    x |= x >> 8
    x |= x >> 16
    return x + 1`,
    explanation: 'Sets all bits below the MSB, then adds 1.',
  },
  {
    title: 'Bitboard move generation',
    code: `rook = 0x0000000000000080  // h1
east = (rook << 1) & 0xfefefefefefefefe
north = rook << 8
reachable = east | north`,
    explanation: 'Edge masks prevent wraparound; shifts simulate moves.',
  },
  {
    title: 'Set range of bits',
    code: `function setRange(x, l, r):
    mask = ((1 << (r - l + 1)) - 1) << l
    return x | mask`,
    explanation: 'Build a block of ones and shift it into place.',
  },
]

const pitfalls = [
  'Right shifting signed integers can propagate the sign bit; use unsigned when needed.',
  'Left shifting into the sign bit is undefined in C/C++; use unsigned types.',
  'Operator precedence: 1 << k + 1 means 1 << (k + 1). Add parentheses.',
  'Mixing endianness with bit offsets leads to wrong masks on serialized data.',
  'Bit hacks reduce clarity; document the identity and add tests.',
  'Overflow in (1 << k) when k equals word size; use 1ULL or guard k.',
]

const decisionGuidance = [
  'Use bitsets when the universe is bounded and dense.',
  'Use hashing or sets when the universe is sparse or unbounded.',
  'Use bitwise operations in hot paths where branching is costly.',
  'Prefer language intrinsics for popcount, leading zeros, and bit scan.',
  "Document tricks and link to references like Hacker's Delight.",
]

const advancedInsights = [
  {
    title: 'SWAR and word-parallelism',
    detail:
      'SIMD Within A Register packs many small fields in one word and processes them with masks.',
  },
  {
    title: 'Bit slicing in crypto',
    detail:
      'Bit slicing computes multiple blocks in parallel with boolean ops, improving constant-time behavior.',
  },
  {
    title: 'Compressed bitsets',
    detail: 'Roaring and EWAH compress sparse bitsets while keeping fast AND/OR operations.',
  },
  {
    title: 'Bitwise DP optimizations',
    detail: 'Subset enumeration and meet-in-the-middle often reduce exponential work by half.',
  },
  {
    title: 'Hamming distance at scale',
    detail: 'XOR then popcount gives the number of differing bits, useful in similarity search.',
  },
  {
    title: 'Fenwick and segment trees',
    detail: 'Lowest set bit identities drive index jumps in Fenwick tree updates.',
  },
]

const takeaways = [
  'Bits are about compactness and speed: many booleans in one word.',
  'Learn a small set of identities and you can solve many problems.',
  'Hardware intrinsics change performance; use them when available.',
  'Clarity matters: comment tricks and test edge cases.',
]

const bitNumbering = bitFundamentals[0] ?? {
  title: 'Bit numbering',
  detail:
    'Bit 0 is the least significant bit (LSB). Bit 31 or 63 is the most significant bit (MSB).',
}
const twosComplement = bitFundamentals[1] ?? {
  title: "Two's complement",
  detail: "Signed integers use two's complement. Negation is bitwise NOT plus 1.",
}
const unsignedShifts = bitFundamentals[2] ?? {
  title: 'Unsigned vs signed shifts',
  detail:
    'Logical shifts fill with zeros; arithmetic shifts preserve the sign bit for signed values.',
}
const masksAsFilters = bitFundamentals[3] ?? {
  title: 'Masks as filters',
  detail: 'AND keeps bits where the mask has 1s. OR sets bits where the mask has 1s.',
}
const bitwiseVsLogical = bitFundamentals[4] ?? {
  title: 'Bitwise vs logical',
  detail: 'Bitwise operators act on every bit; logical operators act on whole boolean values.',
}
const endianness = bitFundamentals[5] ?? {
  title: 'Endianness',
  detail: 'Endianness changes byte order in memory, not the bit numbering inside a byte.',
}
const lowestSetBit = identities[1] ?? {
  title: 'x & -x',
  detail: 'Isolates the lowest set bit. Useful for Fenwick trees and subset iteration.',
}
const dropLowestSetBit = identities[0] ?? {
  title: 'x & (x - 1)',
  detail: 'Drops the lowest set bit. Great for iterating set bits or counting bits.',
}

const glossaryTerms = [
  {
    term: bitNumbering.title,
    definition: bitNumbering.detail,
  },
  {
    term: twosComplement.title,
    definition: twosComplement.detail,
  },
  {
    term: unsignedShifts.title,
    definition: unsignedShifts.detail,
  },
  {
    term: masksAsFilters.title,
    definition: masksAsFilters.detail,
  },
  {
    term: bitwiseVsLogical.title,
    definition: bitwiseVsLogical.detail,
  },
  {
    term: endianness.title,
    definition: endianness.detail,
  },
  {
    term: dropLowestSetBit.title,
    definition: dropLowestSetBit.detail,
  },
  {
    term: lowestSetBit.title,
    definition: lowestSetBit.detail,
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-history', label: 'Historical Context' },
    { id: 'bp-models', label: 'Mental Models' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-fundamentals', label: 'Bit Fundamentals' },
    { id: 'core-operations', label: 'Core Operations' },
    { id: 'core-identities', label: 'Identity Toolbox' },
    { id: 'core-complexity', label: 'Complexity Notes' },
    { id: 'core-use-cases', label: 'Real-World Applications' },
    { id: 'core-pitfalls', label: 'Pitfalls' },
    { id: 'core-guidance', label: 'When to Use It' },
    { id: 'core-advanced', label: 'Advanced Insights' },
  ],
  examples: [
    { id: 'ex-practical', label: 'Practical Examples' },
    { id: 'ex-cheatsheet', label: 'Cheat Sheet' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function BitManipulationPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Bit Manipulation',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Bit Manipulation"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Bit Manipulation</h1>
      <p>
        Bit manipulation is the art of using AND, OR, XOR, shifts, and masks to inspect and
        transform data at the bit level. It powers everything from permissions and compression to
        graphics and cryptography, and it turns many O(n) loops into O(1) operations on packed
        words.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            <p>
              Bits are the native language of hardware. A single 64-bit word can store 64 booleans,
              letting you update many flags in one instruction. The cost is readability, so the key
              is to use bit tricks where locality and speed matter most.
            </p>
            <p>
              Great bit manipulation is about representation. Choose an encoding where AND/OR/XOR
              expresses the problem directly, then the CPU does the heavy lifting with constant-time
              operations.
            </p>
          </section>
          <hr className="bin98-divider" />
          <section id="bp-history" className="bin98-section">
            <h2 className="bin98-heading">Historical Context</h2>
            {historicalMilestones.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-models" className="bin98-section">
            <h2 className="bin98-heading">Core Concept and Mental Models</h2>
            {mentalModels.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key Takeaways</h2>
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
          <section id="core-fundamentals" className="bin98-section">
            <h2 className="bin98-heading">Bit Fundamentals</h2>
            {bitFundamentals.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-operations" className="bin98-section">
            <h2 className="bin98-heading">Core Operations</h2>
            {coreOperations.map((block) => (
              <div key={block.heading}>
                <h3 className="bin98-subheading">{block.heading}</h3>
                <ul>
                  {block.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
          <section id="core-identities" className="bin98-section">
            <h2 className="bin98-heading">Identity Toolbox</h2>
            {identities.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
            <p>
              If you only memorize a few identities, focus on x &amp; (x - 1) and x &amp; -x. They
              unlock fast bit iteration, Fenwick trees, and constant-time power-of-two checks.
            </p>
          </section>
          <section id="core-complexity" className="bin98-section">
            <h2 className="bin98-heading">Complexity Analysis</h2>
            {complexityNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-use-cases" className="bin98-section">
            <h2 className="bin98-heading">Real-World Applications</h2>
            {useCases.map((item) => (
              <p key={item.context}>
                <strong>{item.context}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-pitfalls" className="bin98-section">
            <h2 className="bin98-heading">Common Pitfalls and Debugging Cues</h2>
            <ul>
              {pitfalls.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section id="core-guidance" className="bin98-section">
            <h2 className="bin98-heading">When to Use It</h2>
            <ol>
              {decisionGuidance.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>
          <section id="core-advanced" className="bin98-section">
            <h2 className="bin98-heading">Advanced Insights and Optimizations</h2>
            {advancedInsights.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
            <p>
              References: CLRS, Hacker&apos;s Delight, and well-documented bitset libraries are the
              best sources for edge cases. Always validate assumptions about word size and
              signedness on your target platform.
            </p>
          </section>
        </>
      )}

      {activeTab === 'examples' && (
        <>
          <section id="ex-practical" className="bin98-section">
            <h2 className="bin98-heading">Practical Examples</h2>
            {practicalExamples.map((example) => (
              <div key={example.title}>
                <h3 className="bin98-subheading">{example.title}</h3>
                <div className="bin98-codebox">
                  <code>{example.code}</code>
                </div>
                <p>{example.explanation}</p>
              </div>
            ))}
          </section>
          <section id="ex-cheatsheet" className="bin98-section">
            <h2 className="bin98-heading">Bit Manipulation Cheat Sheet</h2>
            <table className="bin98-table">
              <thead>
                <tr>
                  <th>Operation</th>
                  <th>Expression</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {cheatSheet.map((row) => (
                  <tr key={row.op}>
                    <td>{row.op}</td>
                    <td className="bin98-mono">{row.expr}</td>
                    <td>{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </>
      )}

      {activeTab === 'glossary' && (
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {glossaryTerms.map((item) => (
            <div key={item.term}>
              <h3 className="bin98-subheading">{item.term}</h3>
              <p>{item.definition}</p>
            </div>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
