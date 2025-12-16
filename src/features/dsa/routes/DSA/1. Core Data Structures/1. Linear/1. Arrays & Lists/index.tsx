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

export default function ArraysAndListsPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Arrays and Linked Lists</span>
          <button className="win95-control" type="button" aria-label="Close window">
            X
          </button>
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
