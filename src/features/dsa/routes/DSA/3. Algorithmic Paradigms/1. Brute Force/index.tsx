import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const steps = [
  {
    title: 'Generate every candidate',
    detail:
      'Translate the problem into a bounded set of possibilities. That could be every permutation, every subset, or every sequence of choices you can encode.',
  },
  {
    title: 'Test each candidate',
    detail:
      'Verify every possibility against your condition. Because brute force has no shortcuts, correctness trumps clever heuristics—stop only when you find the desired result or you exhaust the list.',
  },
  {
    title: 'Collect the best outcome',
    detail:
      'Keep track of the best candidate (max/min/first valid) as you scan. You rarely need to revisit an earlier entry, so the loop stays simple even if the total runtime is large.',
  },
]

const signals = [
  'Input sizes stay small (N ≤ 20, depending on branching) so the exponential blow-up remains manageable.',
  'Problem constraints admit pruning only after you already enumerate every case, so skipping a region is risky.',
  'Correctness matters more than performance while you explore the solution space or validate faster heuristics.',
]

const checklist = [
  'Cap the search space with clear bounds; identify early when the candidate generation would explode.',
  'Add guard clauses that bail out once the first valid match is found if you only need one result.',
  'Document why brute force is acceptable here and mark where future optimizations might fit.',
]

export default function BruteForcePage(): JSX.Element {
  return (
    <TopicLayout
      title="Brute Force"
      subtitle="Exhaustive search patterns"
      intro="Brute force walks every possibility until it finds a solution. The code stays strikingly simple, but you pay with exponential or factorial runtimes unless the input stays tiny."
    >
      <TopicSection heading="The brute force loop">
        <div className="grid gap-3 md:grid-cols-3">
          {steps.map((step) => (
            <article key={step.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold leading-tight text-white">{step.title}</h3>
              <p className="text-sm text-white/80">{step.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="When brute force is OK">
        <ul className="list-disc space-y-2 pl-5 text-sm text-white/90">
          {signals.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </TopicSection>

      <TopicSection heading="Avoiding pitfalls">
        <p>
          Brute force is predictable, but it rarely stays fast. Keep an eye on the input size, stop earlier when you have enough answers, and consider
          memoization or greedy replacements as soon as the search grows too wide.
        </p>
        <p>
          When all else fails, brute force remains a useful fallback because it always gives a correct baseline to compare against faster heuristics.
        </p>
      </TopicSection>

      <TopicSection heading="Checklist before shipping brute force">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/90">
          {checklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </TopicSection>
    </TopicLayout>
  )
}
