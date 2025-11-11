import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const operations = [
  {
    title: 'Access & test',
    description: (
      <>
        Use bit masks and the bitwise <code>&</code> operator to test whether a particular flag is
        set. Shifting a <code>1</code> by <code>n</code> positions gives you the mask that targets
        the nth bit.
      </>
    ),
  },
  {
    title: 'Set & clear',
    description: (
      <>
        Turn a bit on with <code>|</code> and a mask. Clear it with bitwise <code>&</code> and the
        inverse mask (<code>~</code>). Together they make fast flag management routines.
      </>
    ),
  },
  {
    title: 'Toggles',
    description: (
      <>
        Apply <code>^</code> (XOR) with the mask to flip a bit. Repeating the same XOR reverts the
        bit, making toggles and parity checks concise.
      </>
    ),
  },
  {
    title: 'Shifts',
    description: (
      <>
        Left shifts multiply by powers of two, right shifts divide (with floor) for unsigned
        values. Arithmetic right shifts preserve the sign bit for signed integers.
      </>
    ),
  },
]

const techniques = [
  'Use bit fields to store multiple boolean flags in a single integer when memory locality matters.',
  'Precompute masks and combine them with bitwise operations instead of branching for predictable timing.',
  <>
    Represent subsets with bitmasks: iterate through submasks with <code>(mask - 1) &amp; original</code>.
  </>,
  <>
    Exploit tricks like <code>x &amp; -x</code> to isolate the least significant set bit or{' '}
    <code>x &amp; (x - 1)</code> to clear it.
  </>,
]

export default function BitManipulationPage(): JSX.Element {
  return (
    <TopicLayout
      title="Bit Manipulation"
      subtitle="Binary tricks and patterns"
      intro="When performance or low-level control matter, bitwise arithmetic gives you deterministic, constant-time operations that manipulate multiple flags at once."
    >
      <TopicSection heading="Why bits matter">
        <p>
          Bit manipulation treats values as raw binary digits instead of abstract numbers. That lets
          you pack flags tightly, implement arithmetic-heavy algorithms, and express parity, masks,
          or combinatorial subsets without extra allocations.
        </p>
        <p>
          CPUs are wired for bitwise instructions, so clever use of <code>&amp;</code>, <code>|</code>,
          <code>^</code>, and shifts can beat branching-heavy code in tight loops.
        </p>
      </TopicSection>

      <TopicSection heading="Common operations">
        <div className="grid gap-3 md:grid-cols-2">
          {operations.map((op) => (
            <div key={op.title} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold leading-tight text-white">{op.title}</p>
              <p className="text-sm text-white/80">{op.description}</p>
            </div>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Techniques to keep handy">
        <ul className="list-disc space-y-2 pl-5 text-sm text-white/90">
          {techniques.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </TopicSection>

      <TopicSection heading="When bit logic shines">
        <ul className="grid gap-3 sm:grid-cols-2">
          <li className="rounded-lg bg-white/5 p-3">
            <p className="text-sm font-semibold">Flag storage</p>
            <p className="text-sm text-white/80">
              Store diagnostic or access flags inside a single integer instead of spreading booleans
              across the heap. Bit tests stay predictable even as flags grow.
            </p>
          </li>
          <li className="rounded-lg bg-white/5 p-3">
            <p className="text-sm font-semibold">Math tricks</p>
            <p className="text-sm text-white/80">
              Count trailing zeros, align values, or round up to multiples of powers of two without
              slow division or loops.
            </p>
          </li>
          <li className="rounded-lg bg-white/5 p-3">
            <p className="text-sm font-semibold">Algorithm design</p>
            <p className="text-sm text-white/80">
              Bitmasks represent subsets or adjacency lists compactly in combinatorial problems and
              speed up dynamic programming with small budgets.
            </p>
          </li>
          <li className="rounded-lg bg-white/5 p-3">
            <p className="text-sm font-semibold">Micro-optimizations</p>
            <p className="text-sm text-white/80">
              Replace conditionals with bitwise math in hot paths to avoid branch mispredictions and
              leverage SIMD-friendly CPU instructions.
            </p>
          </li>
        </ul>
      </TopicSection>

      <TopicSection heading="Quick checklist">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/90">
          <li>Choose bitsets when you can bound the number of flags and want to manipulate them as a unit.</li>
          <li>Reserve shifts for scaling powers of two and keep signed versus unsigned behavior in mind.</li>
          <li>Use masks, XOR, and arithmetic identities to keep loops branchless and predictable.</li>
          <li>Document any non-obvious patterns—bit tricks are powerful but can confuse future readers.</li>
        </ol>
      </TopicSection>
    </TopicLayout>
  )
}
