import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: 'John von Neumann formalizes the stored-program model (1945)',
    detail:
      'Arrays matched the sequential memory of early machines, making contiguous blocks and indexing arithmetic the natural way to store lists of numbers.',
  },
  {
    title: 'Fortran standardizes scientific arrays (1957)',
    detail:
      'Fortran arrays made contiguous numeric storage a default for scientific computing, reinforcing row/column-major conventions.',
  },
  {
    title: 'John McCarthy introduces Lisp lists (1958)',
    detail:
      'Cons cells and pointers embodied dynamic, symbolic computation, inspiring the modern singly linked list that grows without fixed capacity.',
  },
  {
    title: 'C brings arrays to systems programming (1972)',
    detail:
      'Pointer arithmetic plus contiguous storage made arrays the backbone of operating systems and the Unix standard library.',
  },
  {
    title: 'Douglas McIlroy popularizes tail pointers (1970s)',
    detail:
      'Maintaining both head and tail pointers turned singly linked lists into efficient queues with O(1) enqueue and dequeue.',
  },
  {
    title: 'CPU caches reshape data structure costs (1980s-1990s)',
    detail:
      'Cache hierarchies made contiguous storage dramatically faster, pushing arrays and vector-like containers into performance-critical paths.',
  },
  {
    title: 'Dynamic arrays become standard library defaults (1990s)',
    detail:
      'Vector in C++ and ArrayList in Java shipped amortized O(1) push-back semantics, giving arrays the flexibility once reserved for lists.',
  },
  {
    title: 'Modern runtimes emphasize locality (2000s+)',
    detail:
      'VMs and managed languages optimized for cache-friendly iteration, making array-like collections the default for most workloads.',
  },
]

const mentalModels = [
  {
    title: 'Array as a hotel hallway',
    detail:
      'Rooms are contiguous, so you can jump straight to room i with simple arithmetic. Rearranging tenants mid-hallway requires shifting everyone down the line.',
  },
  {
    title: 'Linked list as a treasure map',
    detail:
      'Each node hands you the next clue. You cannot skip ahead without following the chain, but you can splice in a new clue without moving the others.',
  },
  {
    title: 'Linked list as train cars',
    detail:
      'Each car points to the next. Adding a car is easy once you are at the coupling; finding car 50 requires walking the train.',
  },
  {
    title: 'Array as a spreadsheet row',
    detail:
      'Each cell has a direct address by column index. Inserting a new column shifts every cell to the right.',
  },
  {
    title: 'Cache as gravity',
    detail:
      'Arrays pull data together, keeping it in the same cache line. Linked lists scatter nodes, so every hop risks a cache miss unless you pool allocate.',
  },
  {
    title: 'Amortization as a budget plan',
    detail:
      'Dynamic arrays over-allocate on growth. A rare reallocation funds many future O(1) appends, just as an occasional big expense smooths many small purchases.',
  },
]

const mechanics = [
  {
    heading: 'Arrays (contiguous)',
    bullets: [
      'Layout: elements stored back-to-back; address = base + i * sizeof(T).',
      'Access: O(1) random access by index; excellent spatial locality for scans.',
      'Insert/Delete: O(n) in the middle due to shifting; O(1) push_back if capacity remains.',
      'Resizing: dynamic arrays double capacity to keep amortized appends O(1).',
      'Iteration: tight loops allow vectorization and branch prediction.',
    ],
  },
  {
    heading: 'Singly linked lists',
    bullets: [
      'Layout: each node holds value + next pointer; nodes may live anywhere in memory.',
      'Access: O(n) to reach index i; no direct arithmetic jump.',
      'Insert/Delete: O(1) at head or after a known node; no shifts required.',
      'Traversal: pointer chasing risks cache misses; better when elements frequently move.',
      'Maintenance: head pointer is mandatory; tail pointer enables O(1) append.',
    ],
  },
  {
    heading: 'Doubly linked lists',
    bullets: [
      'Layout: value + next + prev pointers; supports O(1) removal from middle with a node handle.',
      'Use cases: LRU caches, intrusive lists, schedulers where nodes are removed via pointers.',
      'Cost: 2x pointer overhead vs singly; more links to update correctly.',
      'Safety: sentinel head/tail nodes simplify edge cases and null checks.',
    ],
  },
  {
    heading: 'Hybrid patterns',
    bullets: [
      'Unrolled linked lists store small arrays inside each node to improve locality.',
      'Gap buffers and rope data structures use arrays and lists to support fast edits in text editors.',
      'Chunked vectors (like std::deque) offer stable pointers with block-based arrays.',
      'Circular buffers provide O(1) queueing with fixed-size arrays.',
    ],
  },
]

const anatomy = [
  {
    title: 'Static array layout',
    detail:
      'Fixed length known at allocation time. Stored as a single block with predictable stride, often on the stack or in contiguous heap pages.',
  },
  {
    title: 'Dynamic array header',
    detail:
      'Stores size and capacity next to the buffer. Growth reallocates and copies, while shrink may keep capacity to avoid churn.',
  },
  {
    title: 'Singly linked node layout',
    detail:
      'Node stores payload and a next pointer. A list header may also track size and a tail pointer for O(1) append.',
  },
  {
    title: 'Doubly linked node layout',
    detail:
      'Adds a prev pointer to enable O(1) removal with only a node handle. Memory overhead rises and updates must touch two links.',
  },
]

const operationsTable = [
  {
    op: 'Index access',
    array: 'O(1)',
    dynamicArray: 'O(1)',
    singly: 'O(n)',
    doubly: 'O(n)',
    note: 'Lists must follow next links to reach index i.',
  },
  {
    op: 'Search by value',
    array: 'O(n)',
    dynamicArray: 'O(n)',
    singly: 'O(n)',
    doubly: 'O(n)',
    note: 'Unordered search is linear for all; arrays scan faster due to locality.',
  },
  {
    op: 'Insert at head',
    array: 'O(n)',
    dynamicArray: 'O(n)',
    singly: 'O(1)',
    doubly: 'O(1)',
    note: 'Arrays shift elements; lists relink pointers.',
  },
  {
    op: 'Append at tail',
    array: 'O(1) if space',
    dynamicArray: 'Amortized O(1)',
    singly: 'O(1) with tail',
    doubly: 'O(1) with tail',
    note: 'Without a tail pointer, singly append is O(n).',
  },
  {
    op: 'Insert after node',
    array: 'O(n)',
    dynamicArray: 'O(n)',
    singly: 'O(1)',
    doubly: 'O(1)',
    note: 'Lists do not shift memory when node handle is known.',
  },
  {
    op: 'Delete by index',
    array: 'O(n)',
    dynamicArray: 'O(n)',
    singly: 'O(n)',
    doubly: 'O(n)',
    note: 'Lists must traverse to the node before unlinking.',
  },
  {
    op: 'Delete by node',
    array: 'O(n)',
    dynamicArray: 'O(n)',
    singly: 'O(1) with prev',
    doubly: 'O(1)',
    note: 'Singly lists need previous pointer; doubly lists do not.',
  },
  {
    op: 'Memory locality',
    array: 'Excellent',
    dynamicArray: 'Excellent',
    singly: 'Poor',
    doubly: 'Poor',
    note: 'Pooling or arena allocation can improve list locality.',
  },
]

const memoryFootprint = [
  {
    title: 'Pointer overhead dominates small payloads',
    detail:
      'On 64-bit systems, each pointer is 8 bytes. A doubly linked node adds at least 16 bytes of pointers plus allocator metadata.',
  },
  {
    title: 'Alignment and padding',
    detail:
      'Nodes often align to 8 or 16 bytes, which can waste space when payloads are small or oddly sized.',
  },
  {
    title: 'Cache line packing',
    detail:
      'Arrays pack multiple elements per cache line. Lists often place one node per line unless a pool keeps them contiguous.',
  },
  {
    title: 'Capacity slack',
    detail:
      'Dynamic arrays may reserve extra capacity to avoid frequent reallocations. That slack is a deliberate space-time trade-off.',
  },
]

const complexityNotes = [
  {
    title: 'Time complexity at a glance',
    detail:
      'Array index: O(1). Array insert/delete at middle: O(n). Dynamic array push_back: amortized O(1). Linked list insert/delete with pointer: O(1), search: O(n).',
  },
  {
    title: 'Space and overhead',
    detail:
      'Arrays store only element payload plus potential unused capacity. Linked lists store per-node pointer fields, often doubling memory for pointer-heavy types.',
  },
  {
    title: 'Cache behavior',
    detail:
      'Arrays enjoy prefetching and SIMD-friendly scans. Linked lists cause more cache misses and TLB pressure unless nodes are pooled or allocated in arenas.',
  },
  {
    title: 'Amortized vs worst case',
    detail:
      'Dynamic arrays occasionally reallocate and copy O(n) elements. Spreading that cost across many appends yields amortized O(1), but a real-time system must account for the rare spike.',
  },
  {
    title: 'Iterator invalidation',
    detail:
      'Array growth invalidates pointers and references; list operations typically keep node addresses stable unless you remove the node itself.',
  },
]

const applications = [
  {
    context: 'Operating systems',
    detail:
      'Process tables and page frames often use arrays for predictable indexing. Kernel ready queues and device wait lists frequently use intrusive doubly linked lists for O(1) removal.',
  },
  {
    context: 'Databases and storage engines',
    detail:
      'Record arrays back B+ tree leaves for tight scans. Write-ahead logs append to dynamic arrays or ring buffers; free lists use linked lists to track reusable pages.',
  },
  {
    context: 'Compilers and runtimes',
    detail:
      'Token streams and AST child lists rely on vectors for fast iteration. Garbage collectors use linked lists to chain free blocks and remember sets.',
  },
  {
    context: 'Caches and LRU policies',
    detail:
      'LRU caches pair a hash map with a doubly linked list to move recently used items to the front in O(1) and evict from the tail.',
  },
  {
    context: 'Editors and collaborative tools',
    detail:
      'Gap buffers and ropes mix array blocks with linked structure to support mid-text insertions without copying megabytes on each keystroke.',
  },
  {
    context: 'Networking and streaming',
    detail:
      'Ring buffers implemented with arrays handle high-throughput queues, while linked lists manage packet pools and free lists.',
  },
  {
    context: 'Graphics and simulation',
    detail:
      'Dense arrays store vertices and particle systems for SIMD-friendly updates; linked lists appear in scene graph adjacency or freelists.',
  },
]

const practicalExamples = [
  {
    title: 'Dynamic array push_back with amortized doubling',
    code: `struct Vector {
    data: pointer
    size: int
    capacity: int
}

function push_back(vec, value):
    if vec.size == vec.capacity:
        newCap = max(1, vec.capacity * 2)
        newData = allocate(newCap)
        copy(vec.data, newData, vec.size)
        free(vec.data)
        vec.data = newData
        vec.capacity = newCap
    vec.data[vec.size] = value
    vec.size += 1`,
    note:
      'Doubling keeps total copies across m appends at O(m), giving amortized O(1) insertion. This is the playbook used by std::vector and ArrayList.',
  },
  {
    title: 'O(1) insert after a node in a singly linked list',
    code: `function insertAfter(node, value):
    newNode = Node(value)
    newNode.next = node.next
    node.next = newNode`,
    note:
      'Given a pointer to the node before the insertion point, no shifting is needed. The cost is independent of list size.',
  },
  {
    title: 'LRU cache core using a doubly linked list',
    code: `class Node {
  constructor(key, value) {
    this.key = key
    this.value = value
    this.prev = null
    this.next = null
  }
}

// move node to front
function promote(node, head) {
  if (node === head) return head
  // detach
  node.prev.next = node.next
  if (node.next) node.next.prev = node.prev
  // push front
  node.prev = null
  node.next = head
  head.prev = node
  return node
}`,
    note:
      'Hash map gives O(1) node lookup, list gives O(1) promotion and eviction. This pattern underlies caches in browsers and databases.',
  },
  {
    title: 'Fast/slow pointer to find middle of a list',
    code: `function middle(head):
    slow = head
    fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow`,
    note:
      'Fast moves two steps for every one step slow. When fast hits the end, slow sits at the midpoint.',
  },
  {
    title: 'Array compaction to remove elements in-place',
    code: `function compact(arr, shouldKeep):
    write = 0
    for read in range(0, arr.length):
        if shouldKeep(arr[read]):
            arr[write] = arr[read]
            write += 1
    return write  // new logical length`,
    note:
      'This pattern avoids extra allocations and keeps remaining elements contiguous.',
  },
]

const patterns = [
  {
    title: 'Two pointers and sliding windows',
    detail:
      'Arrays support O(1) index movement, making them ideal for subarray sums, window minimums, and partitioning patterns.',
  },
  {
    title: 'Fast/slow pointers in lists',
    detail:
      'Tortoise-hare detects cycles, finds middles, and helps with in-place list rearrangements without extra memory.',
  },
  {
    title: 'Dummy head/tail nodes',
    detail:
      'Sentinel nodes simplify edge cases by ensuring insert/delete code never deals with null head or tail.',
  },
  {
    title: 'Stable removal without extra space',
    detail:
      'Arrays compact by write index; lists relink around nodes to delete without moving payloads.',
  },
  {
    title: 'Free lists and pools',
    detail:
      'Linked lists track reusable slots in allocators and object pools, avoiding repeated malloc/free.',
  },
]

const variants = [
  {
    title: 'Circular buffer (ring)',
    detail:
      'Array with head/tail indices. Great for queues and streaming with predictable memory and no shifting.',
  },
  {
    title: 'Deque (block array)',
    detail:
      'Array of fixed-size blocks to support fast push/pop at both ends with stable references per block.',
  },
  {
    title: 'Unrolled linked list',
    detail:
      'Each node stores a small array, reducing pointer overhead and improving locality for mid-list edits.',
  },
  {
    title: 'Intrusive list',
    detail:
      'Pointers live inside the payload objects, avoiding separate node allocations and improving cache use.',
  },
  {
    title: 'Skip list',
    detail:
      'Layered linked lists provide average O(log n) search without tree rotations; good for concurrent maps.',
  },
]

const invariants = [
  {
    title: 'Head and tail maintenance',
    detail:
      'Empty list has head and tail null (or sentinels). Insert/delete must update both when size crosses 0 or 1.',
  },
  {
    title: 'Size vs capacity',
    detail:
      'For arrays, size is the logical count, capacity is storage. Never read or iterate beyond size.',
  },
  {
    title: 'Pointer safety',
    detail:
      'After deletion, clear next/prev to avoid accidental cycles and use-after-free bugs in debug builds.',
  },
  {
    title: 'Index stability',
    detail:
      'Array deletions shift indices. Any stored indices must be recomputed or avoided.',
  },
]

const pitfalls = [
  'Out-of-bounds access in arrays is undefined behavior in C and C++; always bounds-check or rely on safe wrappers.',
  'Linked list reversal and deletion bugs often stem from forgetting to update both next and prev pointers or losing the head reference.',
  'Frequent small allocations for list nodes fragment the heap and stress the allocator; prefer pooling or arena allocators.',
  'Dynamic array reallocation invalidates raw pointers and iterators. Code that stores addresses into the array must refresh them after growth.',
  'Choosing a linked list for random access workloads yields O(n) latency surprises that no amount of micro-optimization can hide.',
  'Removing nodes from a singly linked list without a previous pointer forces O(n) traversal or error-prone pointer tricks.',
  'Large arrays that grow one element at a time trigger repeated reallocations unless capacity is reserved up front.',
  'Mixing owning and non-owning pointers in list nodes without clear rules leads to double-free and memory leaks.',
]

const decisionGuidance = [
  'Need random access, tight loops, or SIMD scans: choose an array or dynamic array.',
  'Need O(1) inserts/removals with stable references given a node handle: choose a linked list (often doubly linked).',
  'Need both: consider chunked sequences (deque, rope, unrolled list) to balance locality with edit performance.',
  'For real-time systems sensitive to pauses, avoid unbounded dynamic array growth or pre-reserve capacity to sidestep reallocations.',
  'When in doubt, prototype with a dynamic array for simplicity, measure, then switch to a list only if profiling shows shifting costs dominate.',
  'If you only need a queue, prefer a ring buffer or deque over a linked list for cache-friendly throughput.',
  'When payloads are small, list pointer overhead can dominate; arrays keep memory dense.',
]

const advancedInsights = [
  {
    title: 'Unrolled and blocked layouts',
    detail:
      'Unrolled lists pack small arrays inside each node to recover locality and reduce pointer overhead. They excel in text editors and database leaf pages.',
  },
  {
    title: 'Pooling and arena allocation',
    detail:
      'Allocating list nodes from a bump allocator or pool makes pointer-chasing cheaper by keeping nodes contiguous in memory and improves cache predictability.',
  },
  {
    title: 'Small buffer optimization',
    detail:
      'Some vectors reserve a tiny inline buffer to avoid heap allocation for small sizes. This reduces branchy code paths and improves performance for short sequences.',
  },
  {
    title: 'Persistent lists and arrays',
    detail:
      "Functional languages use persistent vectors (like Clojure's 32-ary trees) to get O(log n) structural sharing, blending array-like indexing with cheap snapshots.",
  },
  {
    title: 'SIMD and prefetching',
    detail:
      'Arrays allow compilers to auto-vectorize loops. For linked lists, manual software prefetching or converting hot paths to arrays can recover throughput.',
  },
  {
    title: 'Sentinel node strategy',
    detail:
      'A circular list with a sentinel head removes null checks and simplifies splice operations in intrusive list implementations.',
  },
  {
    title: 'Copy-on-write buffers',
    detail:
      'Dynamic arrays can share storage until mutation, enabling cheap snapshots in functional or persistent workflows.',
  },
]

const takeaways = [
  'Arrays trade flexibility for locality and O(1) indexing. Linked lists trade locality for O(1) structural edits when you have a node handle.',
  'Dynamic arrays rely on amortization; plan for rare reallocations or pre-reserve when latency spikes are unacceptable.',
  'Cache behavior often outweighs big-O when lists grow large. Measure miss rates, not just asymptotics.',
  'Hybrid structures exist for middle-ground needs. Reach for them before forcing arrays or lists into ill-suited roles.',
  'Cross-check patterns with CLRS, Sedgewick, GeeksforGeeks, and LeetCode discussions to avoid folklore mistakes.',
]

const checkpoints = [
  'Explain why inserting at index i in an array is O(n) even if capacity is available.',
  'Show O(1) removal of a node in a doubly linked list given only the node pointer.',
  'Describe how vector growth invalidates iterators and what to do about it.',
  'Compare a linked-list queue vs a ring buffer under heavy throughput.',
  'Detect a cycle in a list without extra memory and explain why it works.',
]

export default function ArraysAndListsPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Arrays and Linked Lists</span>
          <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div className="win95-stack">
              <div className="win95-subheading">Contiguity vs pointers: choosing the right linear sequence</div>
              <p className="win95-text">
                Arrays deliver constant-time indexing and cache-friendly scans by storing elements contiguously. Linked lists embrace
                pointers to make inserts and deletes O(1) given a node, at the cost of locality. Understanding the mechanics,
                trade-offs, and real-world patterns lets you pick the right spine for your data.
              </p>
              <p className="win95-text">
                Linear sequences are the backbone of most programs. Arrays shine when the shape is stable and you need fast indexing.
                Linked lists shine when the shape changes frequently and you can navigate with node references. Modern practice blends
                the two: dynamic arrays, deques, ropes, and unrolled lists mix contiguity and pointers to tame different workloads.
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
            <legend>How they work</legend>
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
                Arrays pay a one-time resize cost but give O(1) access and traversal. Linked lists pay per hop but give stable node
                addresses and cheap splices. Unrolled and chunked variants try to capture the best of both worlds.
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
                A branch misprediction is often tens of cycles; a cache miss can be hundreds. Arrays avoid many branches and pack
                elements into few cache lines. Lists avoid shifting work but pay the miss penalty on each hop unless carefully
                allocated.
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
                    <th>Array</th>
                    <th>Dynamic Array</th>
                    <th>Singly List</th>
                    <th>Doubly List</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {operationsTable.map((row) => (
                    <tr key={row.op}>
                      <td>{row.op}</td>
                      <td>{row.array}</td>
                      <td>{row.dynamicArray}</td>
                      <td>{row.singly}</td>
                      <td>{row.doubly}</td>
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
              {memoryFootprint.map((item) => (
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
            <legend>When to use which</legend>
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
                Sources: CLRS, Sedgewick and Wayne, GeeksforGeeks array and linked list primers, and LeetCode discussions all document
                these patterns and edge cases. Cross-reading keeps intuition aligned with real-world constraints.
              </p>
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

