import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

const historicalMilestones = [
  {
    title: 'Lisp pioneers pointer-based lists (1958)',
    detail:
      'John McCarthy introduced cons cells to represent symbolic expressions. Each cell stored data plus a pointer, making the singly linked list a first-class structure.',
  },
  {
    title: 'Fortran and COBOL adopt array-heavy layouts (1960s)',
    detail:
      'As arrays dominated numeric workloads, lists remained the flexible alternative for symbolic and dynamic data structures.',
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
  {
    title: 'Cache-aware data structures gain momentum (2000s)',
    detail:
      'Performance engineers increasingly favored contiguous storage, relegating lists to niches where O(1) splices matter more than locality.',
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
    title: 'Clipboard of bookmarks',
    detail:
      'Each node is a bookmark to the next page. You can insert a new bookmark instantly once you are at the right page.',
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
      'Tail pointer enables O(1) append; without it, append is O(n).',
    ],
  },
  {
    heading: 'Doubly linked list',
    bullets: [
      'Node = value + next + prev.',
      'Remove in O(1) with only a node handle; no need to find the previous node first.',
      'Useful for LRU caches, schedulers, and intrusive lists where nodes belong to multiple lists.',
      'Sentinel nodes eliminate null checks at head and tail.',
    ],
  },
  {
    heading: 'Circular lists',
    bullets: [
      'Tail points to head; iteration can wrap seamlessly.',
      'Fits round-robin scheduling and ring buffers where there is no natural end sentinel.',
      'Use sentinels to avoid null checks and simplify insert/remove logic.',
      'Single sentinel with next/prev can represent empty and non-empty lists uniformly.',
    ],
  },
  {
    heading: 'Skip lists and towers',
    bullets: [
      'Multiple forward pointers at increasing skip lengths.',
      'Expected O(log n) search and insert with simpler code than balanced trees.',
      'Great for concurrent-friendly ordered sets when balanced-tree rotations are hard to synchronize.',
      'Level selection via coin flips or bit tricks keeps height logarithmic on average.',
    ],
  },
]

const anatomy = [
  {
    title: 'Node layout',
    detail:
      'Minimal node stores payload and next. Doubly linked nodes add prev; intrusive nodes embed links inside the payload object.',
  },
  {
    title: 'List header',
    detail:
      'Common headers track head, tail, and size. Size can be omitted for O(1) memory but then length is O(n).',
  },
  {
    title: 'Sentinel strategy',
    detail:
      'A dummy head (and optionally tail) means insert/remove never handles null. Circular sentinels make empty list a single node.',
  },
  {
    title: 'Ownership model',
    detail:
      'Define who owns nodes. Clear ownership prevents leaks in manual memory models and dangling references in shared structures.',
  },
]

const operationsTable = [
  {
    op: 'Index access',
    singly: 'O(n)',
    doubly: 'O(n)',
    circular: 'O(n)',
    skip: 'O(log n) expected',
    note: 'Lists cannot jump by index; skip lists add levels to reduce hops.',
  },
  {
    op: 'Insert at head',
    singly: 'O(1)',
    doubly: 'O(1)',
    circular: 'O(1)',
    skip: 'O(log n) expected',
    note: 'Skip list insert updates multiple levels.',
  },
  {
    op: 'Append at tail',
    singly: 'O(1) with tail',
    doubly: 'O(1) with tail',
    circular: 'O(1) with tail',
    skip: 'O(log n) expected',
    note: 'Without tail pointer, append is O(n).',
  },
  {
    op: 'Delete by node',
    singly: 'O(1) with prev',
    doubly: 'O(1)',
    circular: 'O(1)',
    skip: 'O(log n) expected',
    note: 'Singly lists need previous pointer to unlink.',
  },
  {
    op: 'Search by value',
    singly: 'O(n)',
    doubly: 'O(n)',
    circular: 'O(n)',
    skip: 'O(log n) expected',
    note: 'Skip lists are ordered; normal lists are linear scans.',
  },
  {
    op: 'Memory overhead',
    singly: '1 pointer/node',
    doubly: '2 pointers/node',
    circular: 'same as base',
    skip: 'multiple pointers/node',
    note: 'Pointer overhead dominates for tiny payloads.',
  },
]

const memoryNotes = [
  {
    title: 'Pointer overhead',
    detail:
      'On 64-bit systems, each pointer is 8 bytes. Doubly linked lists can double or triple memory for small payloads.',
  },
  {
    title: 'Allocator metadata',
    detail:
      'Per-node allocations include allocator headers and alignment padding, inflating real memory cost beyond node fields.',
  },
  {
    title: 'Locality trade-offs',
    detail:
      'Pooling nodes or using arenas keeps nodes contiguous, reducing cache misses and improving traversal speed.',
  },
  {
    title: 'False sharing risk',
    detail:
      'If nodes are modified by multiple threads, adjacent nodes in the same cache line can thrash caches.',
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
  {
    title: 'Stability of handles',
    detail:
      'Node addresses stay stable unless removed. This makes lists good for systems that keep pointers into the structure.',
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
  {
    context: 'Memory allocators and pools',
    detail:
      'Free lists track available blocks and allow O(1) allocation and release without scanning large arrays.',
  },
  {
    context: 'Graphs and adjacency lists',
    detail:
      'Adjacency lists store variable-degree neighbors efficiently, often with linked nodes or vector-backed lists.',
  },
]

const practicalExamples = [
  {
    title: 'Insert after a node (singly linked)',
    code: `function insertAfter(node, value):
    newNode = Node(value)
    newNode.next = node.next
    node.next = newNode`,
    note: 'Given a handle to the predecessor, insertion is O(1) with two pointer writes. No shifting required.',
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
    note: 'Rewires next pointers in one pass. This is a common interview exercise because it tests pointer discipline.',
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
    note: 'Two pointers moving at different speeds will meet if a cycle exists. O(n) time, O(1) space.',
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
    note: 'Having prev removes the need to search for the predecessor. Clearing links helps GC and prevents accidental reuse.',
  },
  {
    title: 'Merge two sorted lists',
    code: `function merge(a, b):
    dummy = Node(0)
    tail = dummy
    while a != null and b != null:
        if a.value <= b.value:
            tail.next = a
            a = a.next
        else:
            tail.next = b
            b = b.next
        tail = tail.next
    tail.next = a if a != null else b
    return dummy.next`,
    note: 'Reuses existing nodes to build a merged list in O(n) time and O(1) extra space.',
  },
  {
    title: 'Remove Nth node from end (two pointers)',
    code: `function removeNthFromEnd(head, n):
    dummy = Node(0)
    dummy.next = head
    fast = dummy
    slow = dummy
    for i in range(0, n):
        fast = fast.next
    while fast.next != null:
        fast = fast.next
        slow = slow.next
    slow.next = slow.next.next
    return dummy.next`,
    note: 'Fast pointer advances n steps ahead; slow then lands before the target.',
  },
]

const patterns = [
  {
    title: 'Dummy head/tail nodes',
    detail:
      'Sentinels unify empty and non-empty cases, reducing conditional logic for insert and delete.',
  },
  {
    title: 'Tortoise-hare pointers',
    detail:
      'Fast/slow pointers find middle nodes, detect cycles, and split lists without extra memory.',
  },
  {
    title: 'Splicing',
    detail:
      'Lists excel at O(1) splices when you have handles to the boundary nodes. Useful for queues and LRU updates.',
  },
  {
    title: 'Stable node handles',
    detail:
      'Nodes keep addresses as long as they remain in the list, simplifying caches and adjacency structures.',
  },
  {
    title: 'Free-list recycling',
    detail: 'Reuse node objects by linking freed nodes into a pool, reducing allocator churn.',
  },
]

const variants = [
  {
    title: 'Intrusive list',
    detail:
      'Link pointers live inside payload objects. Zero extra allocation, but ownership must be explicit.',
  },
  {
    title: 'Unrolled list',
    detail: 'Each node stores a small array to reduce pointer overhead and improve locality.',
  },
  {
    title: 'Circular doubly list',
    detail: 'Head and tail wrap into a ring, making rotation and round-robin traversal trivial.',
  },
  {
    title: 'Skip list',
    detail:
      'Multiple forward levels yield expected O(log n) search while keeping list-like simplicity.',
  },
  {
    title: 'Persistent list',
    detail:
      'Immutable nodes share tails across versions, enabling functional snapshots and undo stacks.',
  },
]

const invariants = [
  {
    title: 'Head/tail correctness',
    detail: 'On insert or delete, update both head and tail when size crosses 0 or 1.',
  },
  {
    title: 'Next/prev symmetry',
    detail: 'In doubly lists, next.prev and prev.next must agree after every change.',
  },
  {
    title: 'No accidental cycles',
    detail:
      'If the list is meant to be linear, ensure the last node points to null (or sentinel only).',
  },
  {
    title: 'Size accounting',
    detail: 'If you track size, update it in every mutation path and guard against underflow.',
  },
]

const pitfalls = [
  'Losing the head or tail reference makes the list inaccessible; always update both ends on insertions and deletions.',
  'Forgetting to update prev when removing in a doubly linked list leads to dangling links and traversal crashes.',
  'Per-node heap allocations fragment memory; use pools or arenas when many nodes churn.',
  'Pointer comparisons do not order nodes; linked lists are poor choices for binary search or indexed access.',
  'Iterators become invalid when nodes are freed; never continue traversing after deletion without storing the next node first.',
  'Concurrent modifications without locks or atomic protocols corrupt next/prev chains.',
  'Storing raw pointers into nodes owned elsewhere can cause dangling references after frees.',
  'Failing to handle empty and single-node lists creates subtle off-by-one bugs.',
]

const decisionGuidance = [
  'Choose a linked list when you need O(1) insert/remove given a node handle and can tolerate O(n) search.',
  'Use a doubly linked list for queues that need fast removal from the middle (LRU, schedulers).',
  'Stick with dynamic arrays or vectors when random access or tight cache-friendly loops dominate.',
  'Consider skip lists when you need ordered operations with simpler concurrency than balanced trees.',
  'If GC pressure or allocator overhead is a concern, batch allocations or use arenas to keep locality predictable.',
  'When payloads are tiny, avoid lists; pointer overhead can exceed useful data.',
  'If you only need queue semantics, a ring buffer often wins on throughput and memory.',
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
  {
    title: 'Stable memory pools',
    detail:
      'Pools reduce allocator overhead, keep nodes cache-adjacent, and provide deterministic performance for real-time systems.',
  },
]

const takeaways = [
  'Linked lists exchange locality and indexing for O(1) structural edits when you have a node handle.',
  'Cache behavior dominates performance; pool allocation and unrolled lists mitigate pointer-chasing costs.',
  'Doubly linked lists unlock O(1) removal without finding predecessors, enabling LRU and scheduler patterns.',
  'Skip lists extend the model with probabilistic shortcuts, offering ordered sets with simple code.',
  "Cross-check patterns with CLRS, Sedgewick and Wayne, GeeksforGeeks, and Pugh's skip list paper to avoid folklore bugs.",
]

const checkpoints = [
  'Explain why searching by index in a linked list is O(n).',
  'Implement O(1) removal in a doubly linked list using only the node pointer.',
  'Demonstrate cycle detection and explain why fast/slow pointers meet.',
  'Describe a scenario where a linked list beats a vector.',
  'Show how sentinel nodes reduce edge cases in insert/delete.',
]

const references = [
  'CLRS (Introduction to Algorithms) for linked list fundamentals and complexity analysis.',
  'Sedgewick and Wayne (Algorithms) for implementation trade-offs and practical patterns.',
  'GeeksforGeeks linked list tutorials for operation contrasts and edge-case handling.',
  "William Pugh's skip list paper for probabilistic ordered-list design.",
]

const glossaryTerms = [
  {
    term: 'Node handle',
    definition:
      'A direct pointer/reference/iterator to a node that enables local O(1) splice operations.',
  },
  {
    term: 'Intrusive list',
    definition:
      'A list where link fields are embedded inside payload objects, avoiding separate node allocations.',
  },
  {
    term: 'Sentinel node',
    definition:
      'A dummy boundary node used to simplify insert/delete logic and reduce null edge cases.',
  },
  {
    term: 'Pointer chasing',
    definition:
      'Traversal pattern of repeatedly following next/prev pointers, often causing cache misses.',
  },
  {
    term: 'Tail pointer',
    definition:
      'A pointer to the final node that makes append O(1) in singly or doubly linked lists.',
  },
  {
    term: 'Circular list',
    definition:
      'A linked list where the tail links back to the head or sentinel for wraparound traversal.',
  },
  {
    term: 'Skip list',
    definition:
      'Layered linked lists with probabilistic forward pointers for expected O(log n) search and update.',
  },
  {
    term: 'Stable handle',
    definition: 'A pointer/reference that stays valid while the node remains in the list.',
  },
  {
    term: 'Free list',
    definition: 'A linked chain of reusable nodes/blocks used by allocators and object pools.',
  },
  {
    term: 'ABA problem',
    definition:
      'Concurrent hazard where a pointer appears unchanged (A->B->A) and misleads CAS-based logic.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-history', label: 'Historical Context' },
    { id: 'bp-complexity', label: 'Complexity and Performance' },
    { id: 'bp-applications', label: 'Real-World Applications' },
    { id: 'bp-decisions', label: 'When to Use It' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-mental-models', label: 'Mental Models' },
    { id: 'core-mechanics', label: 'How It Works' },
    { id: 'core-anatomy', label: 'Structural Anatomy' },
    { id: 'core-operations', label: 'Operations Matrix' },
    { id: 'core-memory', label: 'Memory Layout and Overhead' },
    { id: 'core-patterns', label: 'Patterns and Techniques' },
    { id: 'core-variants', label: 'Variants and Cousins' },
    { id: 'core-invariants', label: 'Invariants to Keep Safe' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-advanced', label: 'Advanced Insights' },
  ],
  examples: [
    { id: 'ex-practical', label: 'Practical Examples' },
    { id: 'ex-checkpoints', label: 'Quick Self-Checks' },
  ],
  glossary: [
    { id: 'glossary-terms', label: 'Terms' },
    { id: 'glossary-references', label: 'References' },
  ],
}

export default function LinkedListsPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Linked Lists',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Linked Lists"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Linked Lists</h1>
      <p>
        Linked lists store nodes connected by pointers instead of contiguous memory. They excel when
        you already hold a handle to the insertion or removal point, making structural changes O(1),
        while accepting O(n) searches and less cache-friendly traversal.
      </p>
      <p>
        Linked lists trade arithmetic indexing for handle-driven updates. When you own a pointer to
        a node, insertion and deletion touch only a couple of links, independent of list length. The
        cost is linear search and weaker cache locality because nodes may be scattered across
        memory.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            <p>
              Linked lists prioritize structural flexibility: local insertions, deletions, and
              splices can be constant time when neighboring handles are known. They are less
              suitable for indexed access and dense scans, where contiguous storage is generally
              faster.
            </p>
            <p>
              The key trade-off is stable node handles versus locality. This makes lists strong in
              LRU-style update patterns, queue internals, and allocator free lists, but weaker in
              random-access or SIMD-heavy workloads.
            </p>
          </section>
          <hr className="bin98-divider" />
          <section id="bp-history" className="bin98-section">
            <h2 className="bin98-heading">Historical Context</h2>
            {historicalMilestones.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-complexity" className="bin98-section">
            <h2 className="bin98-heading">Complexity and Performance Intuition</h2>
            {complexityNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
            <p>
              Real-world effect: a cache miss can cost around 100 cycles, dwarfing the O(1) pointer
              updates. Pooling nodes or using unrolled lists often yields bigger speedups than
              micro-optimizing pointer assignments.
            </p>
          </section>
          <hr className="bin98-divider" />
          <section id="bp-applications" className="bin98-section">
            <h2 className="bin98-heading">Real-World Applications</h2>
            {applications.map((item) => (
              <p key={item.context}>
                <strong>{item.context}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-decisions" className="bin98-section">
            <h2 className="bin98-heading">When to Use It</h2>
            <ol>
              {decisionGuidance.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>
          <hr className="bin98-divider" />
          <section id="bp-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key Takeaways</h2>
            <ul>
              {takeaways.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {activeTab === 'core-concepts' && (
        <>
          <section id="core-mental-models" className="bin98-section">
            <h2 className="bin98-heading">Core Concept and Mental Models</h2>
            {mentalModels.map((model) => (
              <div key={model.title}>
                <h3 className="bin98-subheading">{model.title}</h3>
                <p>{model.detail}</p>
              </div>
            ))}
          </section>
          <section id="core-mechanics" className="bin98-section">
            <h2 className="bin98-heading">How It Works</h2>
            {mechanics.map((block) => (
              <div key={block.heading}>
                <h3 className="bin98-subheading">{block.heading}</h3>
                <ul>
                  {block.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
            <p>
              Sentinel nodes and tail pointers simplify edge cases. Most bugs arise at the
              boundaries: empty lists, single-element lists, and updates at head or tail.
            </p>
          </section>
          <section id="core-anatomy" className="bin98-section">
            <h2 className="bin98-heading">Structural Anatomy</h2>
            {anatomy.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-operations" className="bin98-section">
            <h2 className="bin98-heading">Operations Matrix</h2>
            {operationsTable.map((row) => (
              <p key={row.op}>
                <strong>{row.op}:</strong> Singly {row.singly}; Doubly {row.doubly}; Circular{' '}
                {row.circular}; Skip {row.skip}. {row.note}
              </p>
            ))}
          </section>
          <section id="core-memory" className="bin98-section">
            <h2 className="bin98-heading">Memory Layout and Overhead</h2>
            {memoryNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-patterns" className="bin98-section">
            <h2 className="bin98-heading">Patterns and Techniques</h2>
            {patterns.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-variants" className="bin98-section">
            <h2 className="bin98-heading">Variants and Close Cousins</h2>
            {variants.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-invariants" className="bin98-section">
            <h2 className="bin98-heading">Invariants to Keep Safe</h2>
            {invariants.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-pitfalls" className="bin98-section">
            <h2 className="bin98-heading">Common Pitfalls</h2>
            <ul>
              {pitfalls.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section id="core-advanced" className="bin98-section">
            <h2 className="bin98-heading">Advanced Insights and Variations</h2>
            {advancedInsights.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
        </>
      )}

      {activeTab === 'examples' && (
        <>
          <section id="ex-practical" className="bin98-section">
            <h2 className="bin98-heading">Practical Examples</h2>
            {practicalExamples.map((example) => (
              <div key={example.title}>
                <h3 className="bin98-subheading">{example.title}</h3>
                <div className="bin98-codebox">
                  <code>{example.code.trim()}</code>
                </div>
                <p>{example.note}</p>
              </div>
            ))}
          </section>
          <section id="ex-checkpoints" className="bin98-section">
            <h2 className="bin98-heading">Quick Self-Checks</h2>
            <ul>
              {checkpoints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {activeTab === 'glossary' && (
        <>
          <section id="glossary-terms" className="bin98-section">
            <h2 className="bin98-heading">Glossary</h2>
            {glossaryTerms.map((item) => (
              <p key={item.term}>
                <strong>{item.term}:</strong> {item.definition}
              </p>
            ))}
          </section>
          <section id="glossary-references" className="bin98-section">
            <h2 className="bin98-heading">References</h2>
            <ul>
              {references.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </>
      )}
    </TopicPageShell>
  )
}
