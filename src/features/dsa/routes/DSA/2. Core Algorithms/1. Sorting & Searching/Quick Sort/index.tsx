import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

export default function QuickSortPage(): JSX.Element {
  return (
    <TopicLayout
      title="Quick Sort"
      subtitle="Partition twice, then sort the sides"
      intro="Quick sort picks a pivot, partitions the list into elements left of the pivot and right of it, and recursively sorts each portion. The pivot slides into its final position without touching the rest."
    >
      <TopicSection heading="Pivot philosophy">
        <p>
          Choose a pivot (first element, random sample, median-of-three) and arrange elements so that those less than the pivot sit to its left and those greater to the right.
        </p>
        <p>
          Partitioning happens in place, so quick sort uses very little extra memory while still enjoying logarithmic recursion depth on average.
        </p>
      </TopicSection>

      <TopicSection heading="Partitioning steps">
        <div className="space-y-2 text-sm text-white/90">
          <p>Initialize two pointers on either end of the current segment.</p>
          <p>Move the left pointer right until it finds a value that is greater than or equal to the pivot, and move the right pointer left until it sees a value less than or equal to the pivot.</p>
          <p>Swap those values, then repeat until pointers cross. When they meet, place the pivot so everything left is smaller and right is larger.</p>
          <p>Now recursively sort the subarrays, excluding the pivot which is already in place.</p>
        </div>
      </TopicSection>

      <TopicSection heading="When quick sort rules">
        <p>Quick sort is usually the fastest comparison sort in practice thanks to cache-friendly, in-place work.</p>
        <p>Pick a pivot wisely (randomization, median-of-three, or sampling) to avoid degenerate quadratic cases.</p>
        <p>It is the default sort in many standard libraries because of its low overhead and great average performance.</p>
      </TopicSection>

      <TopicSection heading="Implementation checklist">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/90">
          <li>Pick a pivot strategy to avoid worst-case inputs (random, median-of-three, or sampling).</li>
          <li>Implement partition so the pivot ends in its final correct index.</li>
          <li>Recurse on the left and right segments while guarding against deep recursion (tail recursion elimination or a manual stack if needed).</li>
          <li>Document that the average cost is O(n log n) but the worst case is O(n²) without pivot safeguards.</li>
        </ol>
      </TopicSection>
    </TopicLayout>
  )
}
