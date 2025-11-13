import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

export default function HeapSortPage(): JSX.Element {
  return (
    <TopicLayout
      title="Heap Sort"
      subtitle="Turn the array into a heap, then pull the max down"
      intro="Heap sort treats the array as a binary heap: parents always dominate their children. Build a max-heap, then repeatedly swap the root with the tail and restore the heap to sort everything in place."
    >
      <TopicSection heading="Heap structure">
        <p>
          Represent your binary heap inside the array itself: for a node at index i, its children sit at 2i+1 and 2i+2. The heap property guarantees every parent is greater than its children (max-heap) or smaller (min-heap).
        </p>
        <p>
          That structure makes the largest element easy to find at the root. Heap sort leverages that to repeatedly extract the max and push it to the growing tail of sorted data.
        </p>
      </TopicSection>

      <TopicSection heading="Building and extracting">
        <div className="space-y-2 text-sm text-white/90">
          <p>Heapify the array bottom-up by calling sift-down (or sink) on each parent starting from the last non-leaf node.</p>
          <p>Swap the root with the last item and reduce the heap size by one; the largest element moves into its final position.</p>
          <p>Sift-down the new root to restore the heap property and repeat until the heap is empty, leaving a sorted array.</p>
        </div>
      </TopicSection>

      <TopicSection heading="When heap sort shines">
        <p>Heap sort guarantees O(n log n) time and O(1) extra space, making it predictable even for large arrays.</p>
        <p>It’s solid for systems that need worst-case guarantees and can live with the extra constant factor compared to quick sort.</p>
        <p>Use heap sort when you already operate on arrays and you want to reuse the heap for scheduling or priority queue actions.</p>
      </TopicSection>

      <TopicSection heading="Implementation checklist">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/90">
          <li>Build a max-heap using bottom-up heapify (sift-down on each parent).</li>
          <li>Swap the root with the tail of the heap and shrink the heap size.</li>
          <li>Sift-down the new root to keep the heap property before the next extraction.</li>
          <li>Document that heap sort is stable only if you track positions, so it's usually considered unstable.</li>
        </ol>
      </TopicSection>
    </TopicLayout>
  )
}
