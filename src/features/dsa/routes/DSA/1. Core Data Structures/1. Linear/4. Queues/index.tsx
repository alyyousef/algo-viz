import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: 'Telephony switching adopts queues (early 1900s)',
    detail:
      'Queueing theory emerged to model callers waiting for operators. The math of arrivals and service times still shapes network routers and server dispatch.',
  },
  {
    title: 'Dijkstra formalizes mutual exclusion with semaphores (1965)',
    detail:
      'Semaphores and producer-consumer problems established queues as the primitive for coordinating threads and managing buffers safely.',
  },
  {
    title: 'Little\'s Law guides capacity planning (1960s)',
    detail:
      'Average items in system (L) equals arrival rate (lambda) times time in system (W), giving engineers a practical sizing rule for queues.',
  },
  {
    title: 'Breadth-first search popularizes FIFO in algorithms (1959+)',
    detail:
      'BFS uses a queue to explore graph layers level by level, proving that FIFO ordering can guarantee shortest paths in unweighted graphs.',
  },
  {
    title: 'Network routers use packet queues',
    detail:
      'Input and output buffers smooth bursts and enforce fairness; drop-tail and RED policies show how queue design influences congestion and latency.',
  },
  {
    title: 'Event loops and async runtimes',
    detail:
      'Task queues power event-driven systems, letting callbacks and microtasks execute in strict arrival order.',
  },
  {
    title: 'Message brokers industrialize queues',
    detail:
      'Systems like RabbitMQ, Kafka, and SQS expose durable queues so producers and consumers can decouple rate and availability.',
  },
]

const mentalModels = [
  {
    title: 'Airport security line',
    detail:
      'First passenger in is first passenger out. The line absorbs bursts and preserves order so service is predictable.',
  },
  {
    title: 'Two-pointer conveyor belt',
    detail:
      'Head removes, tail adds. Moving the pointers is cheaper than moving the boxes, so nothing shifts even when items come and go.',
  },
  {
    title: 'Water tank buffer',
    detail:
      'Producers pour in, consumers drain out. Level rising or falling shows backpressure and capacity pressure.',
  },
  {
    title: 'Pressure valve',
    detail:
      'A queue absorbs backpressure. When consumers slow, the queue grows; when consumers catch up, it shrinks. Policy decides whether to block, drop, or resize.',
  },
  {
    title: 'Level waves in graphs',
    detail:
      'BFS radiates outward in waves. The queue holds the current frontier so you always process nodes in increasing distance order.',
  },
]

const mechanics = [
  {
    heading: 'Core operations',
    bullets: [
      'enqueue(x): append at tail in O(1).',
      'dequeue(): remove and return head in O(1); underflow if empty.',
      'peek(): inspect head without removing.',
      'size/empty/full: track occupancy to enforce limits.',
      'clear(): drop all elements by resetting indices.',
    ],
  },
  {
    heading: 'Circular buffer (array-backed)',
    bullets: [
      'Fixed capacity; head/tail wrap with modulo arithmetic.',
      'No shifting; overwrite or block when full depending on policy.',
      'Cache-friendly and predictable for real-time systems.',
      'Power-of-two capacity enables cheap masking instead of modulo.',
    ],
  },
  {
    heading: 'Linked-list queue',
    bullets: [
      'Unbounded except by memory; head/tail pointers give O(1) enqueue/dequeue.',
      'More allocations and pointer chasing; less cache locality.',
      'Good when peak size is unknown or highly variable.',
      'Pooling nodes improves locality and reduces allocator churn.',
    ],
  },
  {
    heading: 'Specialized queues',
    bullets: [
      'Double-ended queue (deque) supports push/pop at both ends.',
      'Priority queue reorders by key instead of arrival (uses a heap).',
      'Lock-free queues use atomic CAS to avoid locks in concurrent producers/consumers.',
      'Work-stealing deques balance load across worker threads.',
    ],
  },
]

const anatomy = [
  {
    title: 'Head and tail indices',
    detail:
      'Queues track the front (head) and back (tail). Moving indices is cheaper than moving elements.',
  },
  {
    title: 'Capacity and size',
    detail:
      'Bounded queues store size and capacity. Full/empty checks prevent overwrite or underflow.',
  },
  {
    title: 'Sentinel nodes',
    detail:
      'Linked queues can use a dummy node to avoid null checks on enqueue and dequeue.',
  },
  {
    title: 'Ownership model',
    detail:
      'Define who owns queued items to avoid leaks or double-free in manual memory systems.',
  },
]

const operationsTable = [
  {
    op: 'enqueue',
    circular: 'O(1)',
    linked: 'O(1)',
    twoStack: 'O(1) amortized',
    note: 'Circular buffers require space; two-stack queues defer cost to dequeue.',
  },
  {
    op: 'dequeue',
    circular: 'O(1)',
    linked: 'O(1)',
    twoStack: 'O(1) amortized',
    note: 'Two-stack dequeue may move many elements at once.',
  },
  {
    op: 'peek',
    circular: 'O(1)',
    linked: 'O(1)',
    twoStack: 'O(1)',
    note: 'Peek reads head without removal.',
  },
  {
    op: 'memory overhead',
    circular: 'low',
    linked: '1 pointer per node',
    twoStack: '2 arrays',
    note: 'Linked queues pay allocator overhead per node.',
  },
  {
    op: 'locality',
    circular: 'excellent',
    linked: 'poor',
    twoStack: 'good',
    note: 'Circular buffers are cache-friendly.',
  },
]

const memoryNotes = [
  {
    title: 'Full vs empty ambiguity',
    detail:
      'In circular buffers, head == tail can mean empty or full. Track size or reserve one slot.',
  },
  {
    title: 'Clearing slots',
    detail:
      'Managed languages retain references. Clear dequeued slots to allow GC to reclaim memory.',
  },
  {
    title: 'Bounded queue behavior',
    detail:
      'When full, choose a policy: block, drop newest, drop oldest, or resize.',
  },
  {
    title: 'False sharing risk',
    detail:
      'Shared head/tail in multi-threaded queues can cause cache-line ping-pong.',
  },
]

const complexityNotes = [
  {
    title: 'Time',
    detail:
      'enqueue/dequeue/peek are O(1). Circular buffers stay O(1) without reallocation; linked queues also O(1) but with allocator overhead.',
  },
  {
    title: 'Space',
    detail:
      'Circular buffers allocate O(capacity) up front. Linked queues use O(n) for n elements plus pointer overhead. Bounded queues prevent unbounded growth; unbounded queues risk memory exhaustion.',
  },
  {
    title: 'Cache behavior',
    detail:
      'Array queues keep head and tail in adjacent cache lines and are prefetch-friendly. Linked queues pay cache-miss costs per node unless nodes are pooled.',
  },
  {
    title: 'Throughput vs latency',
    detail:
      'Larger buffers increase throughput by smoothing bursts but increase tail latency. Backpressure and drop policies tune this trade-off.',
  },
  {
    title: 'Predictability',
    detail:
      'Bounded queues provide stable memory use and latency; unbounded queues risk latency spikes under load.',
  },
]

const applications = [
  {
    context: 'Breadth-first search and shortest paths',
    detail:
      'Queues ensure nodes are visited in non-decreasing distance in unweighted graphs, driving BFS, topological sorts, and level-order tree traversals.',
  },
  {
    context: 'Operating systems and runtimes',
    detail:
      'Run queues dispatch threads; I/O completion ports queue events; interrupts are buffered before handlers run.',
  },
  {
    context: 'Networking and messaging',
    detail:
      'Routers buffer packets; message brokers buffer tasks; TCP receive windows are effectively bounded queues enforcing flow control.',
  },
  {
    context: 'Pipelines and streaming',
    detail:
      'Multistage pipelines queue frames or jobs between stages to decouple producer and consumer speeds (media encoding, ETL).',
  },
  {
    context: 'User-facing features',
    detail:
      'Undo/redo can be modeled with two stacks and a queue of redoable operations; print spoolers and job schedulers are literal queues.',
  },
  {
    context: 'Rate limiting and throttling',
    detail:
      'Queues smooth bursts in API gateways and task workers to keep throughput within service budgets.',
  },
  {
    context: 'GUI event handling',
    detail:
      'Event loops use queues to serialize input events, timers, and callbacks in a deterministic order.',
  },
]

const practicalExamples = [
  {
    title: 'Circular buffer queue',
    code: `class Queue {
  constructor(capacity) {
    this.data = new Array(capacity)
    this.head = 0
    this.tail = 0
    this.size = 0
    this.capacity = capacity
  }
  enqueue(x) {
    if (this.size === this.capacity) throw new Error('full')
    this.data[this.tail] = x
    this.tail = (this.tail + 1) % this.capacity
    this.size++
  }
  dequeue() {
    if (this.size === 0) throw new Error('empty')
    const val = this.data[this.head]
    this.data[this.head] = undefined
    this.head = (this.head + 1) % this.capacity
    this.size--
    return val
  }
}`,
    note:
      'Modulo arithmetic wraps head and tail. Clearing slots avoids leaking references in managed languages.',
  },
  {
    title: 'Two-stack queue (amortized O(1))',
    code: `class TwoStackQueue {
  constructor() {
    this.in = []
    this.out = []
  }
  enqueue(x) { this.in.push(x) }
  dequeue() {
    if (this.out.length === 0) {
      while (this.in.length) this.out.push(this.in.pop())
    }
    if (this.out.length === 0) throw new Error('empty')
    return this.out.pop()
  }
}`,
    note:
      'Each element moves at most twice, so amortized enqueue/dequeue are O(1). Useful when you already have a fast stack implementation.',
  },
  {
    title: 'BFS level-order traversal',
    code: `function levelOrder(root):
    if root is null: return []
    q = [root]
    levels = []
    while q not empty:
        levelSize = len(q)
        level = []
        repeat levelSize times:
            node = q.shift()
            level.append(node.val)
            if node.left: q.push(node.left)
            if node.right: q.push(node.right)
        levels.append(level)
    return levels`,
    note:
      'Queue preserves arrival order so children are processed after their parents, level by level.',
  },
  {
    title: 'Queue with head index (avoid O(n) shift)',
    code: `function bfs(root):
    if root is null: return []
    q = [root]
    head = 0
    while head < len(q):
        node = q[head]
        head += 1
        if node.left: q.push(node.left)
        if node.right: q.push(node.right)`,
    note:
      'Using a head index keeps dequeue O(1) in array-backed queues.',
  },
  {
    title: 'Deque for sliding window maximum',
    code: `function maxSlidingWindow(nums, k):
    dq = []  // holds indices, values decreasing
    res = []
    for i in 0..len(nums)-1:
        while dq not empty and dq[0] <= i - k:
            dq.shift()
        while dq not empty and nums[i] >= nums[dq[-1]]:
            dq.pop()
        dq.push(i)
        if i >= k - 1:
            res.push(nums[dq[0]])
    return res`,
    note:
      'Deque stores candidates for the max; each index enters and leaves once.',
  },
]

const patterns = [
  {
    title: 'Producer-consumer',
    detail:
      'Queues decouple producers and consumers. Bounded queues apply backpressure when consumers fall behind.',
  },
  {
    title: 'Two-stack queue',
    detail:
      'Use a pair of stacks to implement FIFO behavior with amortized O(1) operations.',
  },
  {
    title: 'Level-order traversal',
    detail:
      'BFS processes nodes in layers by enqueuing children of the current frontier.',
  },
  {
    title: 'Work queues',
    detail:
      'Task queues drive workers in thread pools and job schedulers.',
  },
  {
    title: 'Token buckets',
    detail:
      'Queues represent available tokens or requests, enforcing rate limits.',
  },
]

const variants = [
  {
    title: 'Deque',
    detail:
      'Double-ended queue supports push/pop at both ends and powers sliding window algorithms.',
  },
  {
    title: 'Priority queue',
    detail:
      'Orders by priority rather than arrival. Implemented with heaps or balanced trees.',
  },
  {
    title: 'Blocking queue',
    detail:
      'Producers or consumers wait when full or empty; common in threaded pipelines.',
  },
  {
    title: 'Lock-free queue',
    detail:
      'Uses atomic operations to avoid locks for multi-producer/multi-consumer use.',
  },
  {
    title: 'Work-stealing deque',
    detail:
      'Workers pop from one end, thieves steal from the other, reducing contention.',
  },
]

const invariants = [
  {
    title: 'FIFO order',
    detail:
      'Items must leave in the same order they entered.',
  },
  {
    title: 'Head/tail correctness',
    detail:
      'After enqueue, tail advances; after dequeue, head advances.',
  },
  {
    title: 'Capacity accounting',
    detail:
      'Size must stay between 0 and capacity for bounded queues.',
  },
  {
    title: 'No lost items',
    detail:
      'Each enqueue must be matched by a dequeue or an explicit drop policy.',
  },
]

const pitfalls = [
  'Off-by-one errors in circular buffers (forgetting modulo or mishandling full vs empty when head == tail).',
  'Unbounded growth without backpressure leads to memory exhaustion and latency spikes.',
  'Contention in multi-threaded queues if not synchronized; lock-free designs must handle ABA and memory reclamation.',
  'Using FIFO when priority is required leads to head-of-line blocking; pick a priority queue instead.',
  'In managed languages, not clearing dequeued slots can retain objects and leak memory.',
  'Array-based dequeue via shift is O(n) and can dominate BFS or event loops at scale.',
  'Drop policies can violate fairness if not documented and tested.',
]

const decisionGuidance = [
  'Need strict arrival order and O(1) enqueue/dequeue: use a queue.',
  'Bounded capacity and real-time predictability: use a circular buffer; define overflow policy.',
  'Unknown or elastic size: use a linked queue or two-stack queue; watch allocator costs.',
  'Multi-producer/multi-consumer: choose a thread-safe or lock-free queue implementation.',
  'If prioritization matters, switch to a heap-based priority queue; if both ends are needed, use a deque.',
  'If latency matters, size buffers carefully and measure tail latency, not just throughput.',
]

const advancedInsights = [
  {
    title: 'Lock-free MPMC queues',
    detail:
      'Algorithms like Michael-Scott queues use atomic CAS on next pointers; ring-buffer queues like LMAX Disruptor use sequence counters to avoid locks.',
  },
  {
    title: 'Backpressure strategies',
    detail:
      'When full: block producers, drop newest/oldest, or signal backpressure to slow upstream. The choice shapes latency and loss behavior.',
  },
  {
    title: 'Batching and cache locality',
    detail:
      'Dequeuing/enqueuing in batches reduces synchronization overhead and improves cache behavior for network and logging pipelines.',
  },
  {
    title: 'Fairness and head-of-line blocking',
    detail:
      'Separate queues per priority class or per client prevent one noisy neighbor from starving others; weighted fair queueing is common in routers.',
  },
  {
    title: 'Persistent and durable queues',
    detail:
      'Message queues append to logs (Kafka) or journals to survive crashes. Acknowledgments and idempotent consumers handle duplicates.',
  },
  {
    title: 'Queueing theory metrics',
    detail:
      'Use Little\'s Law (L = lambda W) and utilization (rho) to reason about backlog and expected wait time.',
  },
]

const takeaways = [
  'Queues enforce FIFO to preserve order and smooth bursts between producers and consumers.',
  'Circular buffers deliver predictability; linked and two-stack queues deliver elasticity.',
  'Buffer sizing and backpressure dictate latency and memory behavior; choose policies deliberately.',
  'Concurrency requires proper synchronization or lock-free algorithms to keep O(1) behavior under load.',
  'Authoritative references: CLRS, Sedgewick and Wayne, GeeksforGeeks, and papers on MPMC queues and router queueing.',
]

const checkpoints = [
  'Explain how a circular buffer distinguishes full vs empty.',
  'Implement a queue with two stacks and justify amortized O(1).',
  'Describe when a priority queue is more appropriate than FIFO.',
  'Show how to avoid O(n) dequeue in array-backed queues.',
  'Pick a backpressure policy and explain its trade-offs.',
]

export default function QueuesPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Queues</span>
          <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div className="win95-stack">
              <div className="win95-subheading">FIFO buffers that smooth bursts and preserve order</div>
              <p className="win95-text">
                Queues buffer work so that the first item in is the first item out. They keep pipelines fair, let producers and consumers
                run at different rates, and underpin BFS, networking, schedulers, and message systems.
              </p>
              <p className="win95-text">
                Queues absorb bursty arrivals and release items in order. This keeps latency predictable, lets producers keep working while
                consumers catch up, and guarantees fairness when order matters. Enqueue at tail, dequeue at head, both in O(1).
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
                Circular buffers excel when capacity is known and predictability matters; linked or two-stack queues shine when size is
                unbounded. Overflow policy (block, drop, resize) shapes real-world behavior as much as big-O.
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
                A cache miss can cost 100 cycles; a lock can add microseconds. Queue choice and synchronization strategy dominate
                performance more than the O(1) algorithm itself when concurrency and high throughput are involved.
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
                    <th>Circular</th>
                    <th>Linked</th>
                    <th>Two-Stack</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {operationsTable.map((row) => (
                    <tr key={row.op}>
                      <td>{row.op}</td>
                      <td>{row.circular}</td>
                      <td>{row.linked}</td>
                      <td>{row.twoStack}</td>
                      <td>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Memory layout and safety</legend>
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
            <legend>Variants and extensions</legend>
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
                Sources: CLRS, Sedgewick and Wayne, GeeksforGeeks queue implementations, and research on lock-free MPMC queues and router
                queueing disciplines cover proofs, contention behavior, and congestion trade-offs.
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

