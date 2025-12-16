import { Link } from 'react-router-dom'

import type { JSX } from 'react'

const win95Styles = `
.win95-page {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  background: #C0C0C0;
  color: #000;
  font-family: 'MS Sans Serif', 'Tahoma', sans-serif;
  font-size: 12px;
  line-height: 1.35;
  -webkit-font-smoothing: none;
}

.win95-page * {
  box-sizing: border-box;
}

.win95-page a {
  color: #000;
  text-decoration: none;
}

.win95-page a:hover {
  text-decoration: underline;
}

.win95-page a:focus,
.win95-button:focus,
.win95-control:focus {
  outline: 1px dotted #000;
  outline-offset: -2px;
}

.win95-window {
  width: 100%;
  min-height: 100vh;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  background: #C0C0C0;
  border-radius: 0;
  box-shadow: none;
}

.win95-titlebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #000080;
  color: #fff;
  padding: 4px 6px;
  font-weight: 700;
  font-size: 12px;
  line-height: 1;
}

.win95-title {
  display: inline-block;
}

.win95-control {
  width: 22px;
  height: 20px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  border-radius: 0;
  font-weight: 700;
  font-size: 12px;
  padding: 0;
  cursor: pointer;
}

.win95-control:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-content {
  padding: 10px;
}

.win95-header-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 8px;
}

.win95-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 3px 10px 2px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  border-radius: 0;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  line-height: 1.2;
  color: #000;
  text-decoration: none;
}

.win95-button:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-fieldset {
  border: 2px solid;
  border-color: #808080 #404040 #404040 #808080;
  padding: 8px;
  margin: 0 0 10px;
  background: #C0C0C0;
}

.win95-fieldset legend {
  padding: 0 6px;
  font-weight: 700;
  font-size: 12px;
}

.win95-grid {
  display: grid;
  gap: 8px;
}

.win95-grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.win95-grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
}

.win95-grid-4 {
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
}

.win95-panel {
  border: 2px solid;
  border-color: #808080 #fff #fff #808080;
  background: #C0C0C0;
  padding: 8px;
}

.win95-panel--raised {
  border-color: #fff #404040 #404040 #fff;
}

.win95-heading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 4px;
}

.win95-subheading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 6px;
}

.win95-text {
  margin: 0 0 6px;
}

.win95-list {
  margin: 0;
  padding-left: 18px;
  font-size: 12px;
  line-height: 1.35;
}

.win95-list li {
  margin-bottom: 4px;
}

.win95-list--numbered {
  list-style: decimal;
}

.win95-stack {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.win95-code {
  margin: 6px 0 0;
  background: #C0C0C0;
  color: #000;
  padding: 8px;
  font-family: 'Courier New', monospace;
  font-size: 11px;
  border: 2px solid;
  border-color: #404040 #fff #fff #404040;
  overflow-x: auto;
}
`

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
  'Iterators become invalid when nodes are freed; never continue traversing after deletion without storing the next node first.',
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
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Linked Lists</span>
          <button className="win95-control" type="button" aria-label="Close window">
            X
          </button>
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
