import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

export default function QueuesPage(): JSX.Element {
  return (
    <TopicLayout
      title="Queues"
      subtitle="Lines you can trust"
      intro="Queues show up wherever work arrives faster than it can be handled. They promise that what arrived first will be processed first, making service lanes, job buffers, and pipelines predictable."
    >
      <TopicSection heading="Why queues exist">
        <p>
          Queues tame bursts by buffering items until the system is ready. Producers can keep generating work while consumers process it at their own pace because the queue remembers the order and protects the contract.
        </p>
        <p>
          Fairness is built in: FIFO ordering means nobody jumps ahead. That stability matters in multi-threaded systems, event handling loops, and scheduling where you want latency to stay bounded.
        </p>
      </TopicSection>

      <TopicSection heading="Core anatomy">
        <p>
          A queue exposes two ends: the tail (where you enqueue) and the head (where you dequeue). Track head/tail pointers, or indexes in an array, so you slide through the structure without shifting elements.
        </p>
        <p>Some queues are bounded circular buffers that wrap around, others grow via linked nodes. Decide whether you care more about memory predictability or unbounded volume.</p>
        <p>Size tracking keeps you from dipping below zero or overflowing the buffer. Simple counters or comparisons between head and tail keep the logic straightforward.</p>
      </TopicSection>

      <TopicSection heading="How you operate">
        <div className="space-y-2 text-sm text-white/90">
          <p>Enqueue appends at the tail. In arrays you advance the tail index and wrap as needed, while in linked lists you append a node and update the tail pointer.</p>
          <p>Dequeue removes from the head, returning the oldest entry. Advance the head pointer or drop the front node so the next value becomes visible.</p>
          <p>Peek inspects the next value without removing it, useful for scheduling decisions.</p>
          <p>Size or empty checks compare head and tail or read a counter so you can respond appropriately when the queue is empty or full.</p>
        </div>
      </TopicSection>

      <TopicSection heading="Variants & strategies">
        <ul className="list-disc space-y-2 pl-5 text-sm text-white/90">
          <li>Circular buffer reuses space by wrapping indexes, keeping operations O(1) without reallocations.</li>
          <li>Linked-list queues grow without a fixed limit and stay constant-time even under heavy pressure.</li>
          <li>Priority queues turn FIFO into priority-driven order, pulling the best candidate instead of the oldest.</li>
          <li>Deques allow insertions and removals on both ends when you need mixed FIFO/LIFO behavior.</li>
        </ul>
      </TopicSection>

      <TopicSection heading="When a queue is the tool">
        <p>Let queues smooth out data across service boundaries, buffering work between producers and consumers.</p>
        <p>Use them for breadth-first traversals, level-order processing, or any scenario where you need to honor arrival order.</p>
        <p>Queues are the building blocks of reactive systems, network stacks, and media pipelines where pacing and fairness matter.</p>
      </TopicSection>

      <TopicSection heading="Implementation checklist">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/90">
          <li>Choose between fixed-capacity buffers (arrays) and unbounded linked lists based on expected load.</li>
          <li>Decide what happens when capacity fills: block, drop, resize, or backpressure.</li>
          <li>Keep head/tail arithmetic simple so you avoid off-by-one errors.</li>
          <li>Document whether the queue reuses slots or allocates new ones so future maintainers know the trade-offs.</li>
        </ol>
      </TopicSection>
    </TopicLayout>
  )
}
