import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

export default function MergeSortPage(): JSX.Element {
  return (
    <TopicLayout
      title="Merge Sort"
      subtitle="Weaving order from two halves"
      intro="Merge sort feels like a calm atelier: every sequence pauses while the artist splits it into smaller canvases, then merges the painted pieces back together with careful, ordered strokes."
    >
      <TopicSection heading="Why merge sort exists">
        <p>
          Not every list can be tamed by one left-to-right sweep. Merge sort exists to tame chaos by asking the list to quiet down, divide into manageable chunks, and trust the system to reassemble them without losing perspective.
        </p>
        <p>
          It is one of the purest divide-and-conquer routines: the work is the same at every scale. You keep splitting until the pieces are inevitable, then you trust the merging step to restore the rhythm.
        </p>
      </TopicSection>

      <TopicSection heading="Breaking problems down">
        <p>
          Split the sequence exactly in half. No heuristics, no fancy pivots. Each recursive call gets a smaller neighborhood of the data until it only holds one element, a trivially sorted piece.
        </p>
        <p>
          Even though you are calling the same routine over and over, every level of recursion works on exponentially fewer items. The call stack grows logarithmically, so the work per level stays steady.
        </p>
      </TopicSection>

      <TopicSection heading="The merge choreography">
        <p>
          Two ordered halves sit side by side with pointers at the front of each. The merge step compares their heads, appends the smaller to the output, and advances that pointer. It is a polite negotiation between halves, always picking the friendliest candidate.
        </p>
        <p>
          When one half runs dry, the other has already been living in sorted order, so you append the rest without another comparison. The merged result preserves every order relation from the halves without backtracking.
        </p>
      </TopicSection>

      <TopicSection heading="What you can do with merge sort">
        <div className="space-y-2 text-sm text-white/90">
          <p>
            Build stable sorts: equal elements keep their original ordering because merges never rearrange ties.
          </p>
          <p>
            Divide huge data sets into chunks that fit in memory, sort each slice independently, and then stream the merges so you never load everything at once.
          </p>
          <p>
            Parallelize the halves by splitting the work among threads or machines and merging the sorted streams back together in a reduction tree.
          </p>
          <p>
            Use it for linked lists too. You can split and merge without random access, which keeps the advantages of O(n log n) time while avoiding extra space for array copies.
          </p>
        </div>
      </TopicSection>

      <TopicSection heading="Building your own">
        <p>
          Represent the recursive split explicitly, or simulate it with an explicit stack when you need control over recursion depth. The key is to remember the merge order so that you only combine segments when both are ready.
        </p>
        <p>
          In-place variants exist, but they require careful bookkeeping to rotate elements without breaking stability. Keep the logic separate: write a clean merge first, then only optimize if memory becomes the bottleneck.
        </p>
        <p>
          Always test with edge cases: empty inputs, already sorted lists, and reverse-sorted lists all exercise different parts of the recursion tree.
        </p>
      </TopicSection>

      <TopicSection heading="Performance and space trade-offs">
        <p>
          Merge sort visits every element exactly once per level, and there are O(log n) levels, so the running time stays at O(n log n) regardless of how the data started.
        </p>
        <p>
          The cost is space: the merge step needs a buffer proportional to the number of active elements unless you carefully splice nodes in linked structures. That trade-off is worth it when you care more about guarantees than squeezing out every byte.
        </p>
      </TopicSection>

      <TopicSection heading="Related sorts and hybrids">
        <div className="space-y-3 text-sm text-white/90">
          <article>
            <p className="font-semibold text-white">Sorting neighbors:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Quick sort splits with a pivot and sorts in place, but its worst case can degrade without good pivot selection.</li>
              <li>Heap sort guarantees O(n log n) with constant space overhead, yet it breaks stability for the sake of brevity.</li>
              <li>Tim sort combines merge sort with insertion sort to exploit runs in real data, making it the practical default for many libraries.</li>
              <li>Radix sort moves beyond comparisons, handling digits directly for linear time at the cost of extra passes.</li>
            </ul>
          </article>

          <article>
            <p className="font-semibold text-white">Merge-inspired structures:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>K-way merge extends the idea to more than two inputs, which is key for multi-way merge joins in databases.</li>
              <li>External merge sort keeps sorted runs on disk and only loads what is necessary for each merge.</li>
              <li>Mergeable heaps and priority queues reuse the ordered merge when melding two structures.</li>
            </ul>
          </article>
        </div>
      </TopicSection>
    </TopicLayout>
  )
}
