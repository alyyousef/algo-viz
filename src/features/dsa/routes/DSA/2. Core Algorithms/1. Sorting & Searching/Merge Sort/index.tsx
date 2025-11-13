import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

export default function MergeSortPage(): JSX.Element {
  return (
    <TopicLayout
      title="Merge Sort"
      subtitle="Divide, sort, and merge"
      intro="Merge sort divides the list in half, recursively sorts each side, and then merges the two sorted halves back together. Each merge stitch keeps the overall order intact."
    >
      <TopicSection heading="Divide and conquer">
        <p>
          Break the sequence in half until you reach trivially sorted pieces (individual elements). Each recursive call operates the same way, so the logic feels like repeating the same melody on smaller sections.
        </p>
        <p>
          Once the halves are sorted, you stitch them back together with a two-finger merge that always picks the smaller front element from either half.
        </p>
      </TopicSection>

      <TopicSection heading="Merging steps">
        <div className="space-y-2 text-sm text-white/90">
          <p>Set two pointers at the start of each half and compare their values.</p>
          <p>Append the smaller value to the output and advance that pointer, repeating until one half is exhausted.</p>
          <p>Copy any remaining values from the non-empty half—those are already sorted.</p>
          <p>Because the merge runs in linear time, each level of recursion costs O(n), and the height is O(log n), so merge sort stays O(n log n) regardless of input shape.</p>
        </div>
      </TopicSection>

      <TopicSection heading="When merge sort shines">
        <p>The stability and predictable performance make merge sort ideal for linked data, external sorting, or systems that need guaranteed bounds.</p>
        <p>It works well for huge data sets because you can merge chunks from disk without loading everything into memory.</p>
        <p>Use it when you need to preserve input order for equal elements or when you can parallelize the recursive halves.</p>
      </TopicSection>

      <TopicSection heading="Implementation checklist">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/90">
          <li>Recursively split until each partition has one element.</li>
          <li>Merge two sorted arrays using pointers that always advance after selecting the smaller head.</li>
          <li>Copy leftover elements after one side empties.</li>
          <li>Document the space trade-off: merge sort needs O(n) extra space unless you use linked lists or in-place merge tricks.</li>
        </ol>
      </TopicSection>
    </TopicLayout>
  )
}
