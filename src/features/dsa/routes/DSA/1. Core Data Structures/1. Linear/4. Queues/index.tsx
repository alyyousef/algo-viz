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
    ],
  },
  {
    heading: 'Circular buffer (array-backed)',
    bullets: [
      'Fixed capacity; head/tail wrap with modulo arithmetic.',
      'No shifting; overwrite or block when full depending on policy.',
      'Cache-friendly and predictable for real-time systems.',
    ],
  },
  {
    heading: 'Linked-list queue',
    bullets: [
      'Unbounded except by memory; head/tail pointers give O(1) enqueue/dequeue.',
      'More allocations and pointer chasing; less cache locality.',
      'Good when peak size is unknown or highly variable.',
    ],
  },
  {
    heading: 'Specialized queues',
    bullets: [
      'Double-ended queue (deque) supports push/pop at both ends.',
      'Priority queue reorders by key instead of arrival (uses a heap).',
      'Lock-free queues use atomic CAS to avoid locks in concurrent producers/consumers.',
    ],
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
]

const pitfalls = [
  'Off-by-one errors in circular buffers (forgetting modulo or mishandling full vs empty when head == tail).',
  'Unbounded growth without backpressure leads to memory exhaustion and latency spikes.',
  'Contention in multi-threaded queues if not synchronized; lock-free designs must handle ABA and memory reclamation.',
  'Using FIFO when priority is required leads to head-of-line blocking; pick a priority queue instead.',
  'In managed languages, not clearing dequeued slots can retain objects and leak memory.',
]

const decisionGuidance = [
  'Need strict arrival order and O(1) enqueue/dequeue: use a queue.',
  'Bounded capacity and real-time predictability: use a circular buffer; define overflow policy.',
  'Unknown or elastic size: use a linked queue or two-stack queue; watch allocator costs.',
  'Multi-producer/multi-consumer: choose a thread-safe or lock-free queue implementation.',
  'If prioritization matters, switch to a heap-based priority queue; if both ends are needed, use a deque.',
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
]

const takeaways = [
  'Queues enforce FIFO to preserve order and smooth bursts between producers and consumers.',
  'Circular buffers deliver predictability; linked and two-stack queues deliver elasticity.',
  'Buffer sizing and backpressure dictate latency and memory behavior; choose policies deliberately.',
  'Concurrency requires proper synchronization or lock-free algorithms to keep O(1) behavior under load.',
  'Authoritative references: CLRS, Sedgewick and Wayne, GeeksforGeeks, and papers on MPMC queues and router queueing.',
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

