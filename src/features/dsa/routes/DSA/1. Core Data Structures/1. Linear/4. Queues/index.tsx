import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const operations = [
  {
    title: 'Enqueue',
    detail: 'Append a value to the tail. On arrays you wrap around when you hit capacity, on linked lists you attach a new node after the tail pointer.',
  },
  {
    title: 'Dequeue',
    detail: 'Remove and return the head element. Advance the head pointer or drop the first node and let its successor become the new head.',
  },
  {
    title: 'Peek',
    detail: 'Inspect the head without removing it to see what will be processed next.',
  },
  {
    title: 'Empty / size check',
    detail: 'Track whether the queue has elements by comparing head and tail positions, or keep a counter updated on every enqueue/dequeue.',
  },
]

const variants = [
  {
    title: 'Circular buffer',
    detail: 'Array-backed queue that wraps head and tail indexes, so you reuse space without shifting elements.',
  },
  {
    title: 'Linked list queue',
    detail: 'Head and tail pointers keep enqueue/dequeue O(1) with unbounded growth and no resizing penalties.',
  },
  {
    title: 'Priority queue (heap-based)',
    detail: 'Generalizes queues by choosing the next element based on priority rather than arrival order—common in scheduling.',
  },
]

export default function QueuesPage(): JSX.Element {
  return (
    <TopicLayout
      title="Queues"
      subtitle="First-in, first-out order"
      intro="Queues let you process data in the same order it arrived. That makes them ideal for scheduling work, buffering streams, and imitating real-world lines."
    >
      <TopicSection heading="Queue fundamentals">
        <p>
          The queue exposes two ends: new elements enter at the tail and leave at the head. This FIFO ordering stabilizes systems and keeps workloads predictable.
        </p>
        <p>
          Different implementations adjust memory layout and capacity, but the queue contract stays the same: you enqueue at one end, dequeue from the other, and operations remain constant time.
        </p>
      </TopicSection>

      <TopicSection heading="Key operations">
        <div className="grid gap-3 md:grid-cols-2">
          {operations.map((op) => (
            <article key={op.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{op.title}</h3>
              <p className="text-sm text-white/80">{op.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Variants & topology">
        <div className="grid gap-3">
          {variants.map((variant) => (
            <article key={variant.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{variant.title}</p>
              <p className="text-sm text-white/80">{variant.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="When you choose a queue">
        <ul className="list-disc space-y-2 pl-5 text-sm text-white/90">
          <li>Throttle work in pipelines to match producers and consumers.</li>
          <li>Model breadth-first traversal and level-order algorithms.</li>
          <li>Maintain buffers for networking, audio/video, or inter-thread messaging.</li>
        </ul>
      </TopicSection>

      <TopicSection heading="Checklist before implementation">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/90">
          <li>Decide if a fixed-size buffer is enough or if you need a growable list.</li>
          <li>Keep head/tail updates and empty checks simple to avoid off-by-one bugs.</li>
          <li>Document whether the queue reuses space (circular) or creates fresh nodes (linked list).</li>
        </ol>
      </TopicSection>
    </TopicLayout>
  )
}
