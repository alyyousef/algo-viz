import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

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
    note:
      'Reuses existing nodes to build a merged list in O(n) time and O(1) extra space.',
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
    note:
      'Fast pointer advances n steps ahead; slow then lands before the target.',
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
    detail:
      'Reuse node objects by linking freed nodes into a pool, reducing allocator churn.',
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
    detail:
      'Each node stores a small array to reduce pointer overhead and improve locality.',
  },
  {
    title: 'Circular doubly list',
    detail:
      'Head and tail wrap into a ring, making rotation and round-robin traversal trivial.',
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
    detail:
      'On insert or delete, update both head and tail when size crosses 0 or 1.',
  },
  {
    title: 'Next/prev symmetry',
    detail:
      'In doubly lists, next.prev and prev.next must agree after every change.',
  },
  {
    title: 'No accidental cycles',
    detail:
      'If the list is meant to be linear, ensure the last node points to null (or sentinel only).',
  },
  {
    title: 'Size accounting',
    detail:
      'If you track size, update it in every mutation path and guard against underflow.',
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

export default function LinkedListsPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Linked Lists</span>
          <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div className="win95-stack">
              <div className="win95-subheading">Pointer-driven sequences for O(1) structural edits</div>
              <p className="win95-text">
                Linked lists store nodes connected by pointers instead of contiguous memory. They excel when you already hold a handle
                to the insertion or removal point, making structural changes O(1), while accepting O(n) searches and less
                cache-friendly traversal.
              </p>
              <p className="win95-text">
                Linked lists trade arithmetic indexing for handle-driven updates. When you own a pointer to a node, insertion and
                deletion touch only a couple of links, independent of list length. The cost is linear search and weaker cache
                locality because nodes may be scattered across memory.
              </p>
            </div>
            <Link to="/algoViz" className="win95-button" role="button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-fieldset">
            <legend>Historical context</legend>
            <div className="win95-grid win95-grid-2">
              {historicalMilestones.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Core concept and mental models</legend>
            <div className="win95-grid win95-grid-2">
              {mentalModels.map((model) => (
                <div key={model.title} className="win95-panel">
                  <div className="win95-heading">{model.title}</div>
                  <p className="win95-text">{model.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works</legend>
            <div className="win95-grid win95-grid-4">
              {mechanics.map((block) => (
                <div key={block.heading} className="win95-panel">
                  <div className="win95-heading">{block.heading}</div>
                  <ul className="win95-list">
                    {block.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised" style={{ marginTop: 6 }}>
              <p className="win95-text">
                Sentinel nodes and tail pointers simplify edge cases. Most bugs arise at the boundaries: empty lists, single-element
                lists, and updates at head or tail.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Structural anatomy</legend>
            <div className="win95-grid win95-grid-2">
              {anatomy.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity and performance intuition</legend>
            <div className="win95-grid win95-grid-2">
              {complexityNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                Real-world effect: a cache miss can cost 100 cycles, dwarfing the O(1) pointer updates. Pooling nodes or using unrolled
                lists often yields bigger speedups than micro-optimizing pointer assignments.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Operations matrix</legend>
            <div className="win95-panel">
              <table className="win95-table">
                <thead>
                  <tr>
                    <th>Operation</th>
                    <th>Singly</th>
                    <th>Doubly</th>
                    <th>Circular</th>
                    <th>Skip</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {operationsTable.map((row) => (
                    <tr key={row.op}>
                      <td>{row.op}</td>
                      <td>{row.singly}</td>
                      <td>{row.doubly}</td>
                      <td>{row.circular}</td>
                      <td>{row.skip}</td>
                      <td>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Memory layout and overhead</legend>
            <div className="win95-grid win95-grid-2">
              {memoryNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Real-world applications</legend>
            <div className="win95-grid win95-grid-3">
              {applications.map((item) => (
                <div key={item.context} className="win95-panel">
                  <div className="win95-heading">{item.context}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Practical examples</legend>
            <div className="win95-stack">
              {practicalExamples.map((example) => (
                <div key={example.title} className="win95-panel">
                  <div className="win95-heading">{example.title}</div>
                  <pre className="win95-code">
                    <code>{example.code}</code>
                  </pre>
                  <p className="win95-text">{example.note}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Patterns and techniques</legend>
            <div className="win95-grid win95-grid-2">
              {patterns.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Variants and close cousins</legend>
            <div className="win95-grid win95-grid-2">
              {variants.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Invariants to keep safe</legend>
            <div className="win95-grid win95-grid-2">
              {invariants.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Common pitfalls</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {pitfalls.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Quick self-checks</legend>
            <div className="win95-panel win95-panel--raised">
              <ul className="win95-list">
                {checkpoints.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>When to use it</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                {decisionGuidance.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Advanced insights and variations</legend>
            <div className="win95-grid win95-grid-2">
              {advancedInsights.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                Sources: CLRS, Sedgewick and Wayne, GeeksforGeeks linked list tutorials, and Pugh's skip list paper validate the patterns
                above and detail corner cases worth testing.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Key takeaways</legend>
            <div className="win95-panel win95-panel--raised">
              <ul className="win95-list">
                {takeaways.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}

