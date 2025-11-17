import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const stages = [
  {
    title: 'Divide',
    detail:
      'Break the problem into smaller instances that look like the original. Often the split follows natural halves (arrays, search ranges, geometric regions).',
  },
  {
    title: 'Conquer',
    detail:
      'Solve each subproblem recursively. If the subproblem is small enough, fall back to a base case or trivial algorithm.',
  },
  {
    title: 'Combine',
    detail:
      'Merge the sub-results into a full answer. This might be as simple as concatenating sorted halves or as complex as stitching matrices.',
  },
]

const signals = [
  'The problem has overlapping structure that repeats across subsets, letting you reuse a single logic block.',
  'Working area naturally splits: arrays, trees, matrices, or geometric regions can each be halved efficiently.',
  'You can describe the result of the whole problem in terms of the results of smaller pieces.',
]

const patterns = [
  {
    title: 'Sorting',
    detail: 'Merge sort and quick sort split arrays, sort halves, and then merge or partition.',
  },
  {
    title: 'Searching',
    detail: 'Binary search repeatedly halves the space until it finds the target.',
  },
  {
    title: 'Geometry & DP',
    detail: 'Closest pair of points, Strassen multiplication, and recursive DP rely on divide-and-conquer recurrence relations.',
  },
]

const checklist = [
  'Ensure the combination step does not undo the runtime gains from splitting.',
  'Keep the branching factor and depth balanced so recursion does not explode the stack.',
  'Cache base-case results and memoize overlapping subproblems when future reuse is likely.',
]

export default function DivideAndConquerPage(): JSX.Element {
  return (
    <TopicLayout
      title="Divide &amp; Conquer"
      subtitle="Splitting to simplify"
      intro="Divide and conquer chops problems into smaller pieces, solves each piece recursively, and then merges the answers. The recursion tree defines the runtime and why logarithmic depth matters."
    >
      <TopicSection heading="Core stages">
        <div className="grid gap-3 md:grid-cols-3">
          {stages.map((stage) => (
            <article key={stage.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold leading-tight text-white">{stage.title}</h3>
              <p className="text-sm text-white/80">{stage.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="When you should divide">
        <ul className="list-disc space-y-2 pl-5 text-sm text-white/90">
          {signals.map((signal) => (
            <li key={signal}>{signal}</li>
          ))}
        </ul>
      </TopicSection>

      <TopicSection heading="Common divide-and-conquer patterns">
        <div className="grid gap-3 md:grid-cols-2">
          {patterns.map((pattern) => (
            <article key={pattern.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{pattern.title}</p>
              <p className="text-sm text-white/80">{pattern.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Checklist before committing">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/90">
          {checklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </TopicSection>
    </TopicLayout>
  )
}
