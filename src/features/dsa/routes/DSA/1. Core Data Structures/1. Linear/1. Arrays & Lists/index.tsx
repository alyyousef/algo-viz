import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

export default function Page(): JSX.Element {
  return (
    <TopicLayout
      title="Arrays and Linked Lists"
      subtitle="Two ways to keep items in order"
      intro="Arrays and linked lists both store sequences, but they optimise for different kinds of work. Use this page as a quick reference when you need to decide which structure fits the story you are telling in code."
    >
      <TopicSection heading="What they are">
        <p>
          An array keeps every element in one continuous block of memory. Because the layout is
          tightly packed, the computer can jump straight to any position by doing simple arithmetic.
        </p>
        <p>
          A linked list spreads elements out. Each node stores its own value plus a pointer to the
          next node. You follow those links from the head of the list to reach later elements.
        </p>
      </TopicSection>

      <TopicSection heading="Strengths of each structure">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Arrays</strong> excel when you read by index, iterate in order, or need compact
            storage. Appends are cheap while there is spare capacity, but inserting in the middle
            means shifting everything to the right.
          </li>
          <li>
            <strong>Linked lists</strong> shine when you frequently add or remove items at the
            front, or when you do not know the final size up front. You never shift existing values,
            but you must walk node by node to find the place you want.
          </li>
        </ul>
      </TopicSection>

      <TopicSection heading="Typical operations">
        <ul className="grid gap-3 sm:grid-cols-2">
          <li className="rounded-lg bg-white/5 p-3">
            <p className="text-sm font-semibold">Lookup</p>
            <p className="text-sm text-white/80">
              Arrays jump straight to index <em>i</em>. Linked lists start at the head and follow
              next pointers until they arrive.
            </p>
          </li>
          <li className="rounded-lg bg-white/5 p-3">
            <p className="text-sm font-semibold">Insert or remove near the front</p>
            <p className="text-sm text-white/80">
              Arrays shift a block of neighbours. Linked lists only adjust a couple of pointers.
            </p>
          </li>
          <li className="rounded-lg bg-white/5 p-3">
            <p className="text-sm font-semibold">Memory footprint</p>
            <p className="text-sm text-white/80">
              Arrays store raw values with almost no overhead. Linked lists pay for next pointers
              but avoid wasted capacity.
            </p>
          </li>
          <li className="rounded-lg bg-white/5 p-3">
            <p className="text-sm font-semibold">Iteration</p>
            <p className="text-sm text-white/80">
              Arrays iterate quickly thanks to locality. Linked lists can skip reallocations, which
              helps when elements move around often.
            </p>
          </li>
        </ul>
      </TopicSection>

      <TopicSection heading="How to choose quickly">
        <ol className="list-decimal space-y-2 pl-5">
          <li>If the algorithm depends on random access by index, reach for an array or vector.</li>
          <li>
            If the workload is dominated by adding or removing near the head or tail, a linked list
            can stay simple and fast.
          </li>
          <li>
            If you are unsure, prototype with an array. Measure once the behaviour is clear, then
            weigh whether the pointer-based flexibility of a list is worth the extra bookkeeping.
          </li>
        </ol>
      </TopicSection>

      <TopicSection heading="Takeaways">
        <p>
          Arrays and linked lists tell the same story—a line of items—but different chapters focus
          on different characters. Arrays reward predictable access patterns and dense storage.
          Linked lists reward flexibility when the cast keeps changing. Start with the constraint
          you care about most and let that point you to the right structure.
        </p>
      </TopicSection>
    </TopicLayout>
  )
}
