import { Link } from 'react-router-dom'
import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

export default function SortingSearchingPage(): JSX.Element {
  return (
    <TopicLayout
      title="Sorting & Searching"
      subtitle="Organising and locating data quickly"
      intro="Ranking, rearranging, and scanning data is the foundation of every efficient algorithm. Sorting gives you order; searching lets you find answers inside that order."
    >
      <TopicSection heading="Why it matters">
        <p>
          Sorting underpins operations like deduplication, ranking, and compression. Searching lets you answer questions without scanning every entry, turning chaos into precise queries.
        </p>
        <p>
          Together they power databases, indexes, scheduling, and real-time analytics. Every pipeline needs to know how to reorganize its inputs and then reach the right result fast.
        </p>
      </TopicSection>

      <TopicSection heading="Featured walkthrough">
        <p className="text-sm text-white/90">
          Bubble sort shows how comparison-based sorting works. It’s simple, stable, and perfect for building intuition before you explore more advanced techniques.
        </p>
        <Link className="win96-link win96-link--sm" to="/dsa/2-core-algorithms/1-sorting-searching/bubble-sort">
          Explore Bubble Sort
        </Link>
      </TopicSection>

      <TopicSection heading="What to dig into next">
        <ul className="list-disc space-y-2 pl-5 text-sm text-white/90">
          <li>Study divide-and-conquer sorts (merge, quick) to handle large arrays.</li>
          <li>Learn binary search and jump search to avoid linear scans.</li>
          <li>Explore counting/radix sorts when values fit predictable ranges.</li>
          <li>Combine sort + search with hybrid structures like BSTs and heaps.</li>
        </ul>
      </TopicSection>
    </TopicLayout>
  )
}
