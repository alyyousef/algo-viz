import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const historicalMilestones = [
  {
    title: 'Lisp pioneers pointer-based lists (1958)',
    detail:
      'John McCarthy introduced cons cells to represent symbolic expressions. Each cell stored data plus a pointer, making the singly linked list a first-class structure.',
  },
  {
    title: 'UNIX kernels embrace intrusive lists (1970s)',
    detail:
      'Kernel subsystems threaded tasks and file descriptors through doubly linked lists, enabling O(1) removal given a node and reinforcing the value of owning the next and prev pointers inside structs.',
  },
  {
    title: 'Tail pointers make queues O(1) (1970s)',
    detail:
      'Douglas McIlroy popularized keeping both head and tail so enqueue and dequeue each cost constant time without searching.',
  },
  {
    title: 'Skip lists offer probabilistic shortcuts (1990)',
    detail:
      'William Pugh layered linked lists with towers of forward pointers, delivering expected O(log n) search without tree rotations.',
  },
  {
    title: 'Persistent lists enable functional sharing (1990s)',
    detail:
      'Languages like ML and Clojure rely on immutable linked lists where new versions share old nodes, giving O(1) prepend and cheap snapshots.',
  },
]

const mentalModels = [
  {
    title: 'Train cars with couplers',
    detail:
      'Each node is a car linked by couplers. Adding or removing a car means adjusting the couplers of neighbors, not shifting the whole train.',
  },
  {
    title: 'Treasure map of clues',
    detail:
      'You follow next pointers like clues on a map. There is no way to jump to clue i without reading the clues before it.',
  },
  {
    title: 'Cache as terrain',
    detail:
      'Pointer chasing crosses cache lines unpredictably. Pool-allocating nodes flattens the terrain so traversals suffer fewer cache misses.',
  },
  {
    title: 'Handles vs indices',
    detail:
      'Lists trade numeric indices for handles (pointers or iterators). Operations are O(1) when you already hold a handle to the spot.',
  },
]

const mechanics = [
  {
    heading: 'Singly linked list',
    bullets: [
      'Node = value + next pointer.',
      'Insert after a known node: O(1). Remove after a known node: O(1).',
      'Access by index: O(n) because you must walk from head.',
    ],
  },
  {
    heading: 'Doubly linked list',
    bullets: [
      'Node = value + next + prev.',
      'Remove in O(1) with only a node handle; no need to find the previous node first.',
      'Useful for LRU caches, schedulers, and intrusive lists where nodes belong to multiple lists.',
    ],
  },
  {
    heading: 'Circular lists',
    bullets: [
      'Tail points to head; iteration can wrap seamlessly.',
      'Fits round-robin scheduling and ring buffers where there is no natural end sentinel.',
      'Use sentinels to avoid null checks and simplify insert/remove logic.',
    ],
  },
  {
    heading: 'Skip lists and towers',
    bullets: [
      'Multiple forward pointers at increasing skip lengths.',
      'Expected O(log n) search and insert with simpler code than balanced trees.',
      'Great for concurrent-friendly ordered sets when balanced-tree rotations are hard to synchronize.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Time complexity',
    detail:
      'Insert or delete with a node handle: O(1). Search by value or index: O(n). Skip lists: expected O(log n). Traversal is linear but sensitive to cache misses.',
  },
  {
    title: 'Space overhead',
    detail:
      'Each node stores at least one pointer; doubly linked lists store two. Skip lists store multiple forward links, increasing space to O(n log n) in the worst case, O(n) expected.',
  },
  {
    title: 'Cache behavior',
    detail:
      'Pointer chasing often defeats hardware prefetchers. Allocating nodes contiguously, using arenas, or unrolled lists improves spatial locality.',
  },
  {
    title: 'Amortization vs worst case',
    detail:
      'Unlike dynamic arrays, lists do not pause for reallocations. Their costs are steady but higher per element due to indirection and cache misses.',
  },
]

const applications = [
  {
    context: 'LRU caches and eviction queues',
    detail:
      'Doubly linked lists support O(1) promotion to the front and eviction from the tail when paired with a hash map for lookups.',
  },
  {
    context: 'Schedulers and OS run queues',
    detail:
      'Kernel task lists and interrupt handlers use intrusive circular lists to add and remove tasks in constant time without extra heap allocations.',
  },
  {
    context: 'Networking and streaming',
    detail:
      'Message buffers are chained as linked segments to avoid copying large payloads when forwarding or reordering packets.',
  },
  {
    context: 'Functional programming',
    detail:
      'Immutable cons lists give O(1) prepend and allow old versions to persist, enabling undo stacks and purely functional algorithms.',
  },
  {
    context: 'Concurrent data structures',
    detail:
      'Lock-free linked lists and skip lists provide ordered sets and queues with fine-grained synchronization (Michael and Scott queue, Pugh skip list).',
  },
]

const practicalExamples = [
  {
    title: 'Insert after a node (singly linked)',
    code: `function insertAfter(node, value):
    newNode = Node(value)
    newNode.next = node.next
    node.next = newNode`,
    note:
      'Given a handle to the predecessor, insertion is O(1) with two pointer writes. No shifting required.',
  },
  {
    title: 'Reverse a singly linked list iteratively',
    code: `function reverse(head):
    prev = null
    curr = head
    while curr != null:
        next = curr.next
        curr.next = prev
        prev = curr
        curr = next
    return prev`,
    note:
      'Rewires next pointers in one pass. This is a common interview exercise because it tests pointer discipline.',
  },
  {
    title: "Detect a cycle with Floyd's algorithm",
    code: `function hasCycle(head):
    slow = head
    fast = head
    while fast != null and fast.next != null:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return true
    return false`,
    note:
      'Two pointers moving at different speeds will meet if a cycle exists. O(n) time, O(1) space.',
  },
  {
    title: 'Doubly linked list remove in O(1)',
    code: `function remove(node):
    if node.prev != null:
        node.prev.next = node.next
    if node.next != null:
        node.next.prev = node.prev
    node.next = null
    node.prev = null`,
    note:
      'Having prev removes the need to search for the predecessor. Clearing links helps GC and prevents accidental reuse.',
  },
]

const pitfalls = [
  'Losing the head or tail reference makes the list inaccessible; always update both ends on insertions and deletions.',
  'Forgetting to update prev when removing in a doubly linked list leads to dangling links and traversal crashes.',
  'Per-node heap allocations fragment memory; use pools or arenas when many nodes churn.',
  'Pointer comparisons do not order nodes; linked lists are poor choices for binary search or indexed access.',
  'Dynamic array iterators may survive reallocations, but linked list iterators become invalid when nodes are freed; never continue traversing after deletion without taking the next node first.',
]

const decisionGuidance = [
  'Choose a linked list when you need O(1) insert/remove given a node handle and can tolerate O(n) search.',
  'Use a doubly linked list for queues that need fast removal from the middle (LRU, schedulers).',
  'Stick with dynamic arrays or vectors when random access or tight cache-friendly loops dominate.',
  'Consider skip lists when you need ordered operations with simpler concurrency than balanced trees.',
  'If GC pressure or allocator overhead is a concern, batch allocations or use arenas to keep locality predictable.',
]

const advancedInsights = [
  {
    title: 'Intrusive lists',
    detail:
      'The node fields live inside the stored object, avoiding extra allocation. Common in kernels (Linux list_head) and game engines where ownership is explicit.',
  },
  {
    title: 'Unrolled and chunked lists',
    detail:
      'Each node holds an array of elements, improving cache locality and reducing pointer overhead. Great for text buffers and database leaf pages.',
  },
  {
    title: 'Lock-free and hazard pointers',
    detail:
      'Concurrent lists rely on atomic CAS operations and memory reclamation schemes (hazard pointers, epoch-based GC) to avoid ABA problems.',
  },
  {
    title: 'Sentinel nodes',
    detail:
      'A dummy head or tail eliminates null checks and unifies edge cases for insert and delete. This simplification reduces bugs in production code.',
  },
  {
    title: 'Persistent lists',
    detail:
      'Immutable lists share tails between versions. Prepends are O(1), and snapshots are cheap, enabling undo stacks and functional pipelines.',
  },
]

const takeaways = [
  'Linked lists exchange locality and indexing for O(1) structural edits when you have a node handle.',
  'Cache behavior dominates performance; pool allocation and unrolled lists mitigate pointer-chasing costs.',
  'Doubly linked lists unlock O(1) removal without finding predecessors, enabling LRU and scheduler patterns.',
  'Skip lists extend the model with probabilistic shortcuts, offering ordered sets with simple code.',
  "Cross-check patterns with CLRS, Sedgewick and Wayne, GeeksforGeeks, and Pugh's skip list paper to avoid folklore bugs.",
]

export default function LinkedListsPage(): JSX.Element {
  return (
    <TopicLayout
      title="Linked Lists"
      subtitle="Pointer-driven sequences for O(1) structural edits"
      intro="Linked lists store nodes connected by pointers instead of contiguous memory. They excel when you already hold a handle to the insertion or removal point, making structural changes O(1), while accepting O(n) searches and less cache-friendly traversal."
    >
      <TopicSection heading="The big picture">
        <p className="text-white/80">
          Linked lists trade the arithmetic indexing of arrays for handle-driven updates. When you own a pointer to a node,
          insertion and deletion touch only a couple of links, independent of list length. The cost is linear search and
          weaker cache locality because nodes may be scattered across memory.
        </p>
      </TopicSection>

      <TopicSection heading="Historical context">
        <div className="grid gap-3 md:grid-cols-2">
          {historicalMilestones.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/75">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Core concept and mental models">
        <div className="grid gap-3 md:grid-cols-2">
          {mentalModels.map((model) => (
            <article key={model.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{model.title}</p>
              <p className="text-sm text-white/75">{model.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="How it works: variants and mechanics">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {mechanics.map((block) => (
            <article key={block.heading} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{block.heading}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/75">
                {block.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="mt-3 text-sm text-white/70">
          Sentinel nodes and tail pointers simplify edge cases. Most bugs arise at the boundaries: empty lists, single-element
          lists, and updates at head or tail.
        </p>
      </TopicSection>

      <TopicSection heading="Complexity analysis and performance intuition">
        <div className="grid gap-3 md:grid-cols-2">
          {complexityNotes.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/75">{item.detail}</p>
            </article>
          ))}
        </div>
        <p className="mt-3 text-sm text-white/70">
          Real-world effect: a cache miss can cost 100 cycles, dwarfing the O(1) pointer updates. Pooling nodes or using unrolled
          lists often yields bigger speedups than micro-optimizing pointer assignments.
        </p>
      </TopicSection>

      <TopicSection heading="Real-world applications">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {applications.map((item) => (
            <article key={item.context} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.context}</p>
              <p className="text-sm text-white/75">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Practical examples">
        <div className="space-y-4">
          {practicalExamples.map((example) => (
            <article key={example.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{example.title}</p>
              <pre className="mt-2 overflow-x-auto rounded bg-black/40 p-3 text-xs text-white/90">
                <code>{example.code}</code>
              </pre>
              <p className="text-sm text-white/75">{example.note}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Common pitfalls">
        <ul className="list-disc space-y-2 pl-5 text-sm text-white/80">
          {pitfalls.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </TopicSection>

      <TopicSection heading="When to use it">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/80">
          {decisionGuidance.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </TopicSection>

      <TopicSection heading="Advanced insights and variations">
        <div className="grid gap-3 md:grid-cols-2">
          {advancedInsights.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/75">{item.detail}</p>
            </article>
          ))}
        </div>
        <p className="mt-3 text-sm text-white/70">
          Sources: CLRS, Sedgewick and Wayne, GeeksforGeeks linked list tutorials, and Pugh's skip list paper validate the
          patterns above and detail corner cases worth testing.
        </p>
      </TopicSection>

      <TopicSection heading="Key takeaways">
        <div className="rounded-lg border border-emerald-400/40 bg-emerald-500/10 p-4">
          <ul className="list-disc space-y-2 pl-5 text-sm text-emerald-100">
            {takeaways.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </TopicSection>
    </TopicLayout>
  )
}
