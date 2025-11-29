import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const historicalMoments = [
  {
    title: 'J. W. J. Williams introduces heaps for heapsort (1964)',
    detail:
      'Williams formalized the binary heap and used it to create heapsort, a comparison sort with O(n log n) time and O(1) extra space.',
  },
  {
    title: 'Floyd optimizes heap construction (1964)',
    detail:
      'Robert Floyd showed you can build a heap in O(n) time using bottom-up heapify, improving on repeated insertions.',
  },
  {
    title: 'Tarjan and Fredman invent Fibonacci heaps (1984-1987)',
    detail:
      'They introduced amortized O(1) decrease-key and meld, reducing Dijkstra’s algorithm to O(E + V log V) and inspiring later pairing and binomial heaps.',
  },
  {
    title: 'Pairing heap emerges as a simple meldable heap (1986)',
    detail:
      'Pairing heaps deliver excellent practical performance with simple code, often outperforming Fibonacci heaps in real systems despite weaker theoretical bounds.',
  },
  {
    title: 'Cache-aware and implicit heaps gain focus (2010s)',
    detail:
      'Binary heaps with implicit arrays remain dominant thanks to cache locality; variants like binary indexed heaps, d-ary heaps, and bucketed priority queues tune for modern memory hierarchies.',
  },
]

const mentalModels = [
  {
    title: 'Nearly sorted shelves',
    detail:
      'A heap keeps the best item (min or max) at the front and ensures every shelf below is no better than the one above. Not fully sorted, but ordered enough for fast access.',
  },
  {
    title: 'Shape plus order',
    detail:
      'Heaps rely on two constraints: a complete tree shape (filled level by level) and the heap order property (parent beats children). The shape makes arrays viable; the order gives O(1) top access.',
  },
  {
    title: 'Gradual sorting',
    detail:
      'Extract-min repeatedly is like revealing the sorted order one item at a time. Heapsort performs this systematically without extra memory.',
  },
  {
    title: 'Amortized debt',
    detail:
      'Meldable heaps (Fibonacci, pairing) postpone structural cleanup. Expensive consolidations are paid for by earlier cheap operations, giving low amortized cost.',
  },
]

const mechanics = [
  {
    heading: 'Core operations',
    bullets: [
      'Push/insert: place new key at the end (to preserve completeness), then bubble up until heap order holds.',
      'Pop/extract-top: remove root, move last element to root, bubble down by swapping with the best child until order is restored.',
      'Peek: read root in O(1).',
      'Build-heap: bottom-up heapify runs in O(n); repeated insertion is O(n log n).',
    ],
  },
  {
    heading: 'Implementation choices',
    bullets: [
      'Binary heap in array: index i has children 2i+1 and 2i+2. Best for cache and simplicity.',
      'd-ary heap: reduce height to shrink bubble-down cost; increases branching and bubble-up comparisons.',
      'Binomial/Fibonacci/pairing heaps: support meld and decrease-key more efficiently for graph algorithms.',
    ],
  },
  {
    heading: 'Priority queue API',
    bullets: [
      'Typical interface: push(key, priority), pop(), peek(), size(), isEmpty().',
      'Extended: decreaseKey/decreasePriority for graph algorithms, merge/meld for combining queues.',
      'Stability: standard heaps are not stable; pairing priorities with insertion counters enforces stable behavior when needed.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Binary heap',
    detail:
      'Insert: O(log n). Extract-min/max: O(log n). Peek: O(1). Build: O(n) via heapify. Space: O(n). Excellent constants and cache behavior.',
  },
  {
    title: 'd-ary heap',
    detail:
      'Insert: O(log_d n). Extract: O(d log_d n) because of d-way comparisons per level. Good for Dijkstra when decrease-key is rare.',
  },
  {
    title: 'Fibonacci heap (amortized)',
    detail:
      'Insert, meld, decrease-key: O(1) amortized; extract-min: O(log n) amortized. Great for theoretical bounds, heavy constants and complex code.',
  },
  {
    title: 'Pairing heap (amortized, practical)',
    detail:
      'Insert: O(1) amortized; extract-min and decrease-key: O(log n) amortized in practice, simple implementation often faster than Fibonacci.',
  },
]

const realWorld = [
  {
    context: 'Schedulers and event loops',
    detail:
      'Task schedulers (OS run queues, async runtimes) use heaps to pick the next job or timer with the earliest deadline.',
  },
  {
    context: 'Graph algorithms',
    detail:
      'Dijkstra, Prim, and A* rely on priority queues for frontier expansion. Binary heaps or d-ary heaps are common; Fibonacci heaps stay mostly theoretical.',
  },
  {
    context: 'Streaming and search',
    detail:
      'Heaps maintain top-k elements, medians (two-heap approach), and best-first search frontiers in pathfinding or game AI.',
  },
  {
    context: 'Load balancing and networking',
    detail:
      'Priority queues manage connection timeouts, retransmission timers, and rate-limiter tokens, where predictable O(log n) updates keep latency bounded.',
  },
  {
    context: 'Compression and data structures',
    detail:
      'Huffman coding builds optimal prefix trees using a min-heap of symbol frequencies. Heapsort leverages the heap property for in-place sorting.',
  },
]

const examples = [
  {
    title: 'Array-based binary min-heap',
    code: `class MinHeap:
    def __init__(self):
        self.a = []  # underlying array

    def push(self, x):
        self.a.append(x)
        i = len(self.a) - 1
        # bubble up
        while i > 0:
            parent = (i - 1) // 2
            if self.a[parent] <= self.a[i]:
                break
            self.a[parent], self.a[i] = self.a[i], self.a[parent]
            i = parent

    def pop(self):
        if not self.a:
            raise IndexError('empty')
        root = self.a[0]
        last = self.a.pop()
        if self.a:
            self.a[0] = last
            self._heapify(0)
        return root

    def _heapify(self, i):
        n = len(self.a)
        while True:
            l = 2 * i + 1
            r = 2 * i + 2
            smallest = i
            if l < n and self.a[l] < self.a[smallest]:
                smallest = l
            if r < n and self.a[r] < self.a[smallest]:
                smallest = r
            if smallest == i:
                break
            self.a[i], self.a[smallest] = self.a[smallest], self.a[i]
            i = smallest`,
    explanation:
      'This is the canonical implicit binary heap. Array layout keeps memory contiguous for cache efficiency.',
  },
  {
    title: 'Using a min-heap for Dijkstra',
    code: `function dijkstra(graph, source):
    dist = map(default=Infinity)
    dist[source] = 0
    heap = new MinHeap()
    heap.push((0, source))
    while not heap.empty():
        (d, u) = heap.pop()
        if d != dist[u]: continue  // stale entry
        for (v, w) in graph.neighbors(u):
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                heap.push((dist[v], v))
    return dist`,
    explanation:
      'Stale-check pattern avoids decrease-key by allowing duplicates; the smallest distance is processed first and later stale entries are skipped.',
  },
  {
    title: 'Two-heaps median maintenance',
    code: `// max-heap for lower half, min-heap for upper half
function add_number(x):
    if maxHeap.empty() or x <= maxHeap.peek():
        maxHeap.push(x)
    else:
        minHeap.push(x)
    // rebalance sizes
    if maxHeap.size() > minHeap.size() + 1:
        minHeap.push(maxHeap.pop())
    if minHeap.size() > maxHeap.size():
        maxHeap.push(minHeap.pop())

function median():
    if maxHeap.size() == minHeap.size():
        return (maxHeap.peek() + minHeap.peek()) / 2
    else:
        return maxHeap.peek()`,
    explanation:
      'Two opposing heaps maintain a streaming median in O(log n) per update and O(1) query, useful in telemetry and rolling statistics.',
  },
]

const pitfalls = [
  'Forgetting that the heap is partially ordered: you cannot search arbitrary elements faster than O(n) without extra indexing.',
  'Ignoring stability: heap order alone does not preserve insertion order for equal priorities; add tie-breakers when needed.',
  'Using decrease-key with binary heaps requires finding the element; either store handles/indices or use stale-entry patterns instead.',
  'Letting the heap grow without bounds in schedulers: pair with timeouts or caps to avoid unbounded memory growth.',
  'Mishandling comparator direction: mixing up min vs max heap leads to inverted results; centralize comparator logic.',
]

const decisionGuidance = [
  'Need fast access to highest/lowest priority with frequent inserts: binary or d-ary heap is the default.',
  'Need meld and frequent decrease-key in theory-heavy workloads: Fibonacci or pairing heap; in practice, pairing heap or binomial heap often wins.',
  'Need stable ordering on equal priority: add secondary keys (timestamp/counter) or use stable priority queue implementations.',
  'Need strict latency bounds: consider bounded-size heaps or bucketed priority queues when priorities are small integers.',
  'Need external memory friendliness: multiway (d-ary) heaps reduce height and I/O; tournament trees can be better for k-way merges on disks.',
]

const advancedInsights = [
  {
    title: 'Cache-aware layouts',
    detail:
      'Implicit heaps exploit contiguous arrays; d-ary heaps cut height further. Some systems pack metadata to reduce branch mispredictions during heapify.',
  },
  {
    title: 'Bucketed and radix heaps',
    detail:
      'For integer priorities with limited range or monotone keys (e.g., Dijkstra with small non-decreasing weights), bucket queues or radix heaps achieve near O(1) operations.',
  },
  {
    title: 'Persistent and functional heaps',
    detail:
      'Leftist heaps, skew heaps, and binomial heaps have purely functional variants that support persistence, enabling rollback and immutable data flows.',
  },
  {
    title: 'Concurrency considerations',
    detail:
      'Lock-free or sharded heaps reduce contention in multi-threaded schedulers. Pairing a global index with per-core heaps can give scalable performance.',
  },
  {
    title: 'Verification and testing',
    detail:
      'Property tests should assert heap order after random inserts and pops, track size consistency, and ensure comparator transitivity. For priority queues in critical paths, add benchmarks to watch tail latency.',
  },
]

export default function HeapsPage(): JSX.Element {
  return (
    <TopicLayout
      title="Heaps & Priority Queues"
      subtitle="Partial order structures that deliver the next best item fast"
      intro="Heaps maintain a partial order so the best element surfaces immediately while everything else stays loosely organized. Priority queues built on heaps power schedulers, graph algorithms, streaming analytics, and in-place sorting. This page explores their history, mechanics, complexity, real-world deployments, and the judgment calls that keep them fast and predictable."
    >
      <TopicSection heading="The big picture">
        <p className="text-white/80">
          A heap enforces just enough order to give O(1) access to the best element and O(log n) updates. The shape constraint
          keeps the structure compact (often an array), while the order constraint guarantees parents dominate children. Priority
          queues expose this with push, pop, and peek operations, trading full sorting for speed and locality.
        </p>
      </TopicSection>

      <TopicSection heading="Historical context">
        <div className="grid gap-3 md:grid-cols-2">
          {historicalMoments.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Core concept and mental models">
        <div className="grid gap-3 md:grid-cols-2">
          {mentalModels.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="How it works: operations and implementations">
        <div className="grid gap-3 md:grid-cols-3">
          {mechanics.map((block) => (
            <article key={block.heading} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{block.heading}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/80">
                {block.bullets.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="mt-3 text-sm text-white/70">
          The array-based binary heap remains the workhorse because of simplicity and cache efficiency. Specialized heaps earn
          their keep when meld or decrease-key dominates, or when integer priorities allow bucketed designs.
        </p>
      </TopicSection>

      <TopicSection heading="Complexity analysis and performance intuition">
        <div className="grid gap-3 md:grid-cols-2">
          {complexityNotes.map((note) => (
            <article key={note.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h4 className="text-sm font-semibold text-white">{note.title}</h4>
              <p className="text-sm text-white/80">{note.detail}</p>
            </article>
          ))}
        </div>
        <p className="mt-3 text-sm text-white/70">
          Big-O captures height, but constants and memory locality drive latency. D-ary heaps reduce height but increase per-level
          comparisons. Fibonacci heaps lower amortized cost for decrease-key at the expense of code complexity and cache
          behavior; pairing heaps often win in practice with simpler code.
        </p>
      </TopicSection>

      <TopicSection heading="Real-world applications">
        <div className="grid gap-3 md:grid-cols-2">
          {realWorld.map((item) => (
            <article key={item.context} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.context}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Practical examples">
        <div className="space-y-4">
          {examples.map((example) => (
            <article key={example.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{example.title}</p>
              <pre className="mt-2 overflow-x-auto rounded bg-black/40 p-3 text-xs text-white/90">
                <code>{example.code}</code>
              </pre>
              <p className="text-sm text-white/80">{example.explanation}</p>
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

      <TopicSection heading="Advanced insights and current frontiers">
        <div className="grid gap-3 md:grid-cols-2">
          {advancedInsights.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
        <p className="mt-3 text-sm text-white/70">
          Further reading: CLRS for heap fundamentals, Knuth TAOCP for heapsort and variants, Tarjan and Fredman papers for
          Fibonacci heaps, and modern engineering blogs on flat hash/prio queues for cache-aware designs.
        </p>
      </TopicSection>
    </TopicLayout>
  )
}
