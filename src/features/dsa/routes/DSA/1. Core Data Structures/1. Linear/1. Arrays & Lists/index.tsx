import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const historicalMilestones = [
  {
    title: 'John von Neumann formalizes the stored-program model (1945)',
    detail:
      'Arrays matched the sequential memory of early machines, making contiguous blocks and indexing arithmetic the natural way to store lists of numbers.',
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
    title: 'Dynamic arrays become standard library defaults (1990s)',
    detail:
      'Vector in C++ and ArrayList in Java shipped amortized O(1) push-back semantics, giving arrays the flexibility once reserved for lists.',
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
    ],
  },
  {
    heading: 'Singly linked lists',
    bullets: [
      'Layout: each node holds value + next pointer; nodes may live anywhere in memory.',
      'Access: O(n) to reach index i; no direct arithmetic jump.',
      'Insert/Delete: O(1) at head or after a known node; no shifts required.',
      'Traversal: pointer chasing risks cache misses; better when elements frequently move.',
    ],
  },
  {
    heading: 'Doubly linked lists',
    bullets: [
      'Layout: value + next + prev pointers; supports O(1) removal from middle with a node handle.',
      'Use cases: LRU caches, intrusive lists, schedulers where nodes are removed via pointers.',
      'Cost: 2x pointer overhead vs singly; more links to update correctly.',
    ],
  },
  {
    heading: 'Hybrid patterns',
    bullets: [
      'Unrolled linked lists store small arrays inside each node to improve locality.',
      'Gap buffers and rope data structures use arrays and lists to support fast edits in text editors.',
      'Chunked vectors (like std::deque) offer stable pointers with block-based arrays.',
    ],
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
]

const pitfalls = [
  'Out-of-bounds access in arrays is undefined behavior in C and C++; always bounds-check or rely on safe wrappers.',
  'Linked list reversal and deletion bugs often stem from forgetting to update both next and prev pointers or losing the head reference.',
  'Frequent small allocations for list nodes fragment the heap and stress the allocator; prefer pooling or arena allocators.',
  'Dynamic array reallocation invalidates raw pointers and iterators. Code that stores addresses into the array must refresh them after growth.',
  'Choosing a linked list for random access workloads yields O(n) latency surprises that no amount of micro-optimization can hide.',
]

const decisionGuidance = [
  'Need random access, tight loops, or SIMD scans: choose an array or dynamic array.',
  'Need O(1) inserts/removals with stable references given a node handle: choose a linked list (often doubly linked).',
  'Need both: consider chunked sequences (deque, rope, unrolled list) to balance locality with edit performance.',
  'For real-time systems sensitive to pauses, avoid unbounded dynamic array growth or pre-reserve capacity to sidestep reallocations.',
  'When in doubt, prototype with a dynamic array for simplicity, measure, then switch to a list only if profiling shows shifting costs dominate.',
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
]

const takeaways = [
  'Arrays trade flexibility for locality and O(1) indexing. Linked lists trade locality for O(1) structural edits when you have a node handle.',
  'Dynamic arrays rely on amortization; plan for rare reallocations or pre-reserve when latency spikes are unacceptable.',
  'Cache behavior often outweighs big-O when lists grow large. Measure miss rates, not just asymptotics.',
  'Hybrid structures exist for middle-ground needs. Reach for them before forcing arrays or lists into ill-suited roles.',
  'Cross-check patterns with CLRS, Sedgewick, GeeksforGeeks, and LeetCode discussions to avoid folklore mistakes.',
]

export default function Page(): JSX.Element {
  return (
    <TopicLayout
      title="Arrays and Linked Lists"
      subtitle="Contiguity vs pointers: choosing the right linear sequence"
      intro="Arrays deliver constant-time indexing and cache-friendly scans by storing elements contiguously. Linked lists embrace pointers to make inserts and deletes O(1) given a node, at the cost of locality. Understanding the mechanics, trade-offs, and real-world patterns lets you pick the right spine for your data."
    >
      <TopicSection heading="The big picture">
        <p className="text-white/80">
          Linear sequences are the backbone of most programs. Arrays shine when the shape is stable and you need fast
          indexing. Linked lists shine when the shape changes frequently and you can navigate with node references.
          Modern practice blends the two: dynamic arrays, deques, ropes, and unrolled lists all mix contiguity and pointers
          to tame different workloads.
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

      <TopicSection heading="How they work: structure mechanics">
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
          Mental model: arrays pay a one-time cost to resize but then give O(1) access and traversal.
          Linked lists pay a per-hop cost but give stable node addresses and cheap splices. Unrolled and chunked variants
          try to capture the best of both worlds.
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
          A branch misprediction is often 10 to 20 cycles; a cache miss can be 100+. Arrays avoid many branches and pack
          elements into few cache lines. Lists avoid shifting work but pay the miss penalty on each hop unless carefully allocated.
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

      <TopicSection heading="When to use which">
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
          Sources: CLRS, Sedgewick and Wayne, GeeksforGeeks array and linked list primers, and LeetCode discussions
          all document these patterns and edge cases. Cross-reading keeps intuition aligned with real-world constraints.
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
