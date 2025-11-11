import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const operations = [
  {
    title: 'Insert (prepend/append)',
    detail:
      'Adjust the head pointer or tail pointer and drive the new node’s next reference to the right neighbor.',
  },
  {
    title: 'Delete',
    detail:
      'Update the previous node (or head) to skip the removed node before dropping it so you avoid leaking references.',
  },
  {
    title: 'Traverse',
    detail:
      'Walk from the head node via the next pointers. Every step takes constant time so traversals remain linear.',
  },
  {
    title: 'Search / Access',
    detail:
      'Linked lists excel when you work with sequential access. Random positions require walking each link.',
  },
]

const variants = [
  {
    title: 'Singly linked list',
    detail:
      'Nodes know about their successor only. Simple, compact, and enough for stacks, queues, and fast append-with-tail tracking.',
  },
  {
    title: 'Doubly linked list',
    detail:
      'Each node also remembers its predecessor. That lets you navigate in both directions and remove nodes without seeking the previous item.',
  },
  {
    title: 'Circular linked list',
    detail:
      'The tail’s next pointer loops back to the head. Use it for round-robin buffers or when you want to cycle through elements without resetting manually.',
  },
]

export default function LinkedListsPage(): JSX.Element {
  return (
    <TopicLayout
      title="Linked Lists"
      subtitle="Nodes connected by pointers"
      intro="Linked lists store a chain of nodes where each node points to the next. They trade random access for fast insertion and removal anywhere along the list."
    >
      <TopicSection heading="What makes a linked list">
        <p>
          A linked list keeps track of its head (and sometimes tail). Each node stores data plus a pointer to the next node.
          Because nodes can live anywhere in memory, insertions and deletions take O(1) time when you already hold a reference to the spot.
        </p>
        <p>
          However, accessing index <code>i</code> still requires walking from the head until you reach that node. That’s the
          tradeoff you accept to avoid shifting elements like arrays do.
        </p>
      </TopicSection>

      <TopicSection heading="Core operations">
        <div className="grid gap-3 md:grid-cols-2">
          {operations.map((op) => (
            <article key={op.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold leading-tight text-white">{op.title}</h3>
              <p className="text-sm text-white/80">{op.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Variants to choose from">
        <div className="grid gap-3">
          {variants.map((variant) => (
            <article
              key={variant.title}
              className="rounded-lg border border-white/10 bg-white/5 p-4"
            >
              <p className="text-sm font-semibold text-white">{variant.title}</p>
              <p className="text-sm text-white/80">{variant.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="When a linked list wins">
        <ul className="list-disc space-y-2 pl-5 text-sm text-white/90">
          <li>Frequently add or remove nodes near the ends without shifting adjacent entries.</li>
          <li>Represent adjacency lists in graph algorithms, where neighbors arrive in batches.</li>
          <li>Implement stacks or queues with explicit control over memory layout.</li>
        </ul>
      </TopicSection>

      <TopicSection heading="Checklist before choosing">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/90">
          <li>Prefer arrays when random access dominates; pick linked lists when insertion order matters more than index lookups.</li>
          <li>Capitalize on code reuse by exposing iterator helpers that hide pointer walking.</li>
          <li>Keep references tidy to avoid memory leaks—clear next pointers for removed nodes and handle tail updates explicitly.</li>
        </ol>
      </TopicSection>
    </TopicLayout>
  )
}
