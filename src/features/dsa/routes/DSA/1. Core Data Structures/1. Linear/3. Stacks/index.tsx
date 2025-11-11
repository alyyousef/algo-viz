import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const operations = [
  {
    title: 'Push',
    description:
      'Insert an element at the top. Implementation usually increments a pointer into an array or pushes a node onto the head of a linked list.',
  },
  {
    title: 'Pop',
    description:
      'Remove and return the top element. In array-backed stacks this decrements the pointer without moving other elements.',
  },
  {
    title: 'Peek / Top',
    description:
      'Read the most recently added item without modifying the stack so you can inspect the next value you would pop.',
  },
  {
    title: 'Size / Empty checks',
    description:
      'Track the current depth by checking the pointer against zero or maintaining a counter whenever you push or pop.',
  },
]

const variants = [
  {
    title: 'Stack with array backing',
    detail: 'Fast random access, bounded by capacity so it fits cache-friendly workloads.',
  },
  {
    title: 'Linked-list stack',
    detail: 'Grows without a fixed limit and keeps push/pop in O(1) time even when resizing would hurt.',
  },
  {
    title: 'Double-ended stack (deque can mimic)',
    detail:
      'Allow operations on both ends when the abstract idea needs to mix queue-like behavior with LIFO logic.',
  },
]

export default function StacksPage(): JSX.Element {
  return (
    <TopicLayout
      title="Stacks"
      subtitle="Last-in, first-out storage"
      intro="Stacks are the simplest recursive structure: whatever you push last is the first thing you pop. They underpin recursion, expression parsing, and many algorithms that need to revisit recent work."
    >
      <TopicSection heading="Stack anatomy">
        <p>
          The defining property of a stack is that it only exposes one end—the top. All operations
          happen there, so the stack behaves like a pile of plates where you always touch the top.
          This restriction keeps operations constant-time and makes reasoning about order straightforward.
        </p>
        <p>
          Internally stacks can use contiguous arrays, linked nodes, or even the call stack provided by
          the runtime itself. As long as push/pop stay O(1), the structure remains efficient and easy
          to implement.
        </p>
      </TopicSection>

      <TopicSection heading="Key operations">
        <div className="grid gap-3 md:grid-cols-2">
          {operations.map((op) => (
            <div key={op.title} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{op.title}</p>
              <p className="text-sm text-white/80">{op.description}</p>
            </div>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Variants & memory layout">
        <div className="grid gap-3">
          {variants.map((variant) => (
            <article key={variant.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{variant.title}</h3>
              <p className="text-sm text-white/80">{variant.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="When stacks win">
        <ul className="list-disc space-y-2 pl-5 text-sm text-white/90">
          <li>DFS traversal of trees or graphs naturally uses the call stack or an explicit stack.</li>
          <li>Expression evaluation, compilers, and interpreters handle precedence with stacks of operators and operands.</li>
          <li>Undo histories, backtracking steps, and browser navigation all rely on reversing order.</li>
        </ul>
      </TopicSection>

      <TopicSection heading="Quick checklist">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/90">
          <li>Ensure push/pop stay paired to avoid underflow or leaks.</li>
          <li>Choose the backing container based on capacity needs and whether you need random access.</li>
          <li>Use stacks to mirror recursive function calls explicitly when you need tighter control.</li>
        </ol>
      </TopicSection>
    </TopicLayout>
  )
}
