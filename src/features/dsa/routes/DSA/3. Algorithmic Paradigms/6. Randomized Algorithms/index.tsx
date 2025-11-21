import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const flavors = [
  {
    title: 'Monte Carlo',
    detail:
      'Always runs fast but might return an incorrect result with small probability. You dial down the error by expanding the sample size or repeating the run and taking a majority vote.',
  },
  {
    title: 'Las Vegas',
    detail:
      "Always returns the correct answer, but the runtime is a random variable. Expected time (or 'with high probability') guarantees keep performance stable in practice.",
  },
  {
    title: 'Randomized data structures',
    detail:
      'The randomness is baked into the structure (hash tables, skip lists, treaps) to avoid adversarial inputs and to keep operations balanced on average.',
  },
]

const signals = [
  'You fear crafted adversarial inputs that break deterministic heuristics (e.g., sorted arrays wrecking vanilla quicksort).',
  'Approximate answers are fine as long as you can bound the error probability.',
  'Sampling or hashing beats scanning everything, and you can afford to rerun a few times to boost confidence.',
]

const patterns = [
  {
    title: 'Random sampling',
    detail: 'Pick pivots, estimate statistics, or grab representative elements (uniform sampling, reservoir sampling).',
  },
  {
    title: 'Hashing tricks',
    detail: 'Universal hashing reduces collision risks; sketches and Bloom filters trade tiny error for big space savings.',
  },
  {
    title: 'Shuffle to neutralize',
    detail: 'Shuffle the input before running a deterministic algorithm to erase worst-case orderings.',
  },
  {
    title: 'Restart and amplify',
    detail: 'Run independent trials and aggregate the answers to drive down failure probability exponentially.',
  },
]

const hygiene = [
  'State the failure probability (epsilon) and how it shrinks with repetitions; make the knob obvious in code.',
  'Use a verification step when possible so Monte Carlo runs can detect and retry bad outputs.',
  'Prefer stable pseudo-random generators when results must be reproducible; use strong randomness if adversaries exist.',
  'Isolate randomness at the edges (seed injection, sampler utilities) so tests can freeze behavior.',
]

export default function RandomizedAlgorithmsPage(): JSX.Element {
  return (
    <TopicLayout
      title="Randomized Algorithms"
      subtitle="Harnessing probability for speed"
      intro="Randomized algorithms trade determinism for predictable averages. By sprinkling randomness into choices, they dodge adversarial inputs, speed up expected runtime, or settle for controlled error rates."
    >
      <TopicSection heading="Three flavors to know">
        <div className="grid gap-3 md:grid-cols-3">
          {flavors.map((flavor) => (
            <article key={flavor.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold leading-tight text-white">{flavor.title}</h3>
              <p className="text-sm text-white/80">{flavor.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="When randomness usually wins">
        <ul className="list-disc space-y-2 pl-5 text-sm text-white/90">
          {signals.map((signal) => (
            <li key={signal}>{signal}</li>
          ))}
        </ul>
      </TopicSection>

      <TopicSection heading="Common randomized patterns">
        <div className="grid gap-3 md:grid-cols-2">
          {patterns.map((pattern) => (
            <article key={pattern.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{pattern.title}</p>
              <p className="text-sm text-white/80">{pattern.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Probability hygiene before shipping">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/90">
          {hygiene.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </TopicSection>
    </TopicLayout>
  )
}
