import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: 'Edsgar Dijkstra formalizes stacks for expression parsing (1960s)',
    detail:
      'Dijkstra used stacks in the shunting-yard algorithm to convert infix expressions to postfix, cementing LIFO as the natural tool for precedence handling.',
  },
  {
    title: 'Call stacks become hardware-supported',
    detail:
      'Early architectures like the PDP-11 added stack pointer registers and push/pop instructions, making function calls and returns efficient by convention.',
  },
  {
    title: 'Forth and PostScript popularize stack languages (1970s-1980s)',
    detail:
      'Reverse Polish Notation languages place all computation on stacks, demonstrating that a simple LIFO can model complete programs.',
  },
  {
    title: 'Structured programming formalizes block scope',
    detail:
      'Compilers mapped structured blocks and scope lifetimes to stack frames, clarifying how local variables are created and destroyed.',
  },
  {
    title: 'Compilers rely on activation records',
    detail:
      'Activation records (stack frames) store return addresses, locals, and saved registers. This layout defines how languages implement recursion and scope.',
  },
  {
    title: 'Browser navigation and undo histories',
    detail:
      'Stacks moved from theory to UX: back/forward navigation, undo/redo, and modal flows all lean on paired push/pop semantics to reverse actions safely.',
  },
  {
    title: 'Managed runtimes and safety tooling',
    detail:
      'Stack overflow detection, guard pages, and safe recursion limits became standard in managed runtimes and debuggers.',
  },
]

const mentalModels = [
  {
    title: 'Plates in a cafeteria',
    detail:
      'You can only take from or add to the top. This constraint guarantees that the most recent item is the first to leave.',
  },
  {
    title: 'Breadcrumbs for backtracking',
    detail:
      'Each push records a decision point. Popping rewinds to the previous state, perfect for DFS, maze solving, and undo systems.',
  },
  {
    title: 'Call frames as stacked boxes',
    detail:
      'Every function call adds a box with its locals and return address. Returning pops that box, restoring the previous context.',
  },
  {
    title: 'Undo stack of photos',
    detail:
      'Each edit pushes a snapshot. Undo pops back to the last known good state.',
  },
  {
    title: 'Safety rail',
    detail:
      'The stack enforces discipline: if you push three times, you must pop three times. That predictable symmetry simplifies reasoning about correctness.',
  },
]

const mechanics = [
  {
    heading: 'Core operations',
    bullets: [
      'push(x): place x on top in O(1).',
      'pop(): remove and return the top; underflow if empty.',
      'peek(): read top without removing it.',
      'size/empty(): track depth for safety checks.',
      'clear(): drop all elements by resetting the top index.',
    ],
  },
  {
    heading: 'Array-backed stack',
    bullets: [
      'Uses a dynamic array and a top index.',
      'push increments index and writes; pop decrements without shifting.',
      'Reallocations on growth cost O(n) but amortize to O(1) per push.',
      'Best choice for cache locality and predictable iteration.',
    ],
  },
  {
    heading: 'Linked-list stack',
    bullets: [
      'Uses a head pointer; push prepends a node, pop removes head.',
      'No reallocations; memory overhead is a pointer per node.',
      'Good when size is unknown or churn is high.',
      'Stable node addresses help when external handles are stored.',
    ],
  },
  {
    heading: 'Specialized variants',
    bullets: [
      'Min stack tracks current minimum alongside each push for O(1) getMin.',
      'Two-stack queue flips order twice to give amortized O(1) enqueue/dequeue.',
      'Monotonic stacks maintain sorted order to solve range queries in O(n).',
      'Max stack supports O(1) getMax with an auxiliary stack.',
    ],
  },
]

const anatomy = [
  {
    title: 'Top pointer or index',
    detail:
      'Stacks only need a pointer to the top node or an integer index. That is enough to support O(1) push/pop.',
  },
  {
    title: 'Array capacity',
    detail:
      'Array-backed stacks track size and capacity. Growth reallocates and copies, shrink can keep capacity to avoid churn.',
  },
  {
    title: 'Frame layout',
    detail:
      'Call stacks store return address, saved registers, parameters, and locals in a fixed frame layout per function.',
  },
  {
    title: 'Ownership rules',
    detail:
      'Decide who owns elements. Clearing popped slots avoids leaks in managed runtimes and use-after-free in manual memory.',
  },
]

const operationsTable = [
  {
    op: 'push',
    array: 'O(1) amortized',
    linked: 'O(1)',
    note: 'Array growth occasionally costs O(n).',
  },
  {
    op: 'pop',
    array: 'O(1)',
    linked: 'O(1)',
    note: 'Guard against underflow when empty.',
  },
  {
    op: 'peek',
    array: 'O(1)',
    linked: 'O(1)',
    note: 'Reads top element without removal.',
  },
  {
    op: 'size',
    array: 'O(1)',
    linked: 'O(1) if tracked',
    note: 'Otherwise length is O(n) in a linked stack.',
  },
  {
    op: 'memory overhead',
    array: 'low',
    linked: '1 pointer per node',
    note: 'Linked stacks pay per-node allocator overhead.',
  },
  {
    op: 'locality',
    array: 'excellent',
    linked: 'poor',
    note: 'Arrays win for tight loops and prefetching.',
  },
]

const memoryNotes = [
  {
    title: 'Guard pages',
    detail:
      'OSes place a guard page after the call stack. Touching it triggers a fault to catch overflow early.',
  },
  {
    title: 'Clearing slots',
    detail:
      'Managed languages keep references alive. Clearing popped elements lets GC reclaim memory promptly.',
  },
  {
    title: 'Fixed vs dynamic',
    detail:
      'Embedded stacks are often fixed-size arrays to guarantee maximum memory usage.',
  },
  {
    title: 'Stack depth risk',
    detail:
      'Deep recursion can exhaust call stacks. Prefer iterative algorithms with an explicit stack when depth is unbounded.',
  },
]

const complexityNotes = [
  {
    title: 'Time',
    detail:
      'push/pop/peek are O(1); array-backed push is amortized O(1) with occasional O(n) resize; monotonic-stack solutions to next-greater-element run in O(n).',
  },
  {
    title: 'Space',
    detail:
      'O(n) for n elements. Array stacks may reserve extra capacity; linked stacks store pointers. Call stacks add frame metadata (return address, locals).',
  },
  {
    title: 'Cache behavior',
    detail:
      'Array stacks are cache-friendly and vectorizable for bulk operations. Linked stacks incur pointer-chasing overhead but avoid reallocation pauses.',
  },
  {
    title: 'Failure modes',
    detail:
      'Overflow occurs when capacity is fixed (embedded systems, limited call stack). Underflow arises when popping an empty stack; guard with size checks.',
  },
  {
    title: 'Predictability',
    detail:
      'Stacks avoid linear scans, so latency per operation stays stable unless a resize is triggered.',
  },
]

const applications = [
  {
    context: 'Recursion and DFS',
    detail:
      'Call stacks or explicit stacks drive depth-first search, tree traversals, topological sorts, and backtracking puzzles like Sudoku.',
  },
  {
    context: 'Parsing and evaluation',
    detail:
      'Shunting-yard uses operator and operand stacks; postfix evaluation uses a value stack; syntax checkers validate parentheses and HTML tags with stacks.',
  },
  {
    context: 'Monotonic stack algorithms',
    detail:
      'Stock span, next greater element, largest rectangle in a histogram all reduce to a single pass with a monotonic stack.',
  },
  {
    context: 'Runtime systems',
    detail:
      'VMs and interpreters store activation records, exception handlers, and return addresses on stacks. Guard pages detect overflow with a trap.',
  },
  {
    context: 'Undo/redo and navigation',
    detail:
      'Editors, IDEs, and browsers push actions or pages on a stack and pop to reverse. A second stack often models redo by re-pushing undone actions.',
  },
  {
    context: 'Memory allocators',
    detail:
      'Linear allocators (stack allocators) use LIFO discipline to release memory quickly and deterministically.',
  },
  {
    context: 'State machines and gameplay',
    detail:
      'Game states and UI modals use stacks to return to the previous screen or mode in O(1).',
  },
]

const practicalExamples = [
  {
    title: 'Array-backed stack with amortized push',
    code: `class Stack {
  constructor() {
    this.data = []
    this.top = 0
  }
  push(x) {
    this.data[this.top++] = x
  }
  pop() {
    if (this.top === 0) throw new Error('underflow')
    const val = this.data[--this.top]
    this.data.length = this.top  // avoid leaks
    return val
  }
  peek() {
    if (this.top === 0) throw new Error('empty')
    return this.data[this.top - 1]
  }
}`,
    note:
      'JavaScript arrays resize automatically. In lower-level languages you would double capacity when full to keep push amortized O(1).',
  },
  {
    title: 'Validate parentheses with a stack',
    code: `function isValid(s):
    pairs = { ')': '(', ']': '[', '}': '{' }
    st = []
    for ch in s:
        if ch in '([{':
            st.push(ch)
        else:
            if st is empty or st.pop() != pairs[ch]:
                return false
    return st is empty`,
    note:
      'Classic stack use: LIFO mirrors nested structure. Time O(n), space O(n) in the worst case.',
  },
  {
    title: 'Monotonic stack for next greater element',
    code: `function nextGreater(nums):
    n = len(nums)
    ans = array of length n filled with -1
    st = []  // holds indices with decreasing values
    for i in 0..n-1:
        while st not empty and nums[i] > nums[st[-1]]:
            idx = st.pop()
            ans[idx] = nums[i]
        st.push(i)
    return ans`,
    note:
      'Each index is pushed and popped at most once, giving O(n) time and O(n) space. Works for temperatures, stock span, and histogram problems.',
  },
  {
    title: 'Evaluate postfix (RPN) expression',
    code: `function evalRPN(tokens):
    st = []
    for t in tokens:
        if t is number:
            st.push(int(t))
        else:
            b = st.pop()
            a = st.pop()
            st.push(apply(t, a, b))
    return st.pop()`,
    note:
      'Operands are pushed, operators pop the last two values. This mirrors how stack languages execute programs.',
  },
  {
    title: 'Min stack with auxiliary tracking',
    code: `class MinStack {
  constructor() {
    this.data = []
    this.mins = []
  }
  push(x) {
    this.data.push(x)
    const min = this.mins.length === 0 ? x : Math.min(x, this.mins[this.mins.length - 1])
    this.mins.push(min)
  }
  pop() {
    this.mins.pop()
    return this.data.pop()
  }
  getMin() {
    return this.mins[this.mins.length - 1]
  }
}`,
    note:
      'Every push stores the current minimum. getMin is O(1) with O(n) extra space.',
  },
]

const patterns = [
  {
    title: 'Explicit stack for recursion',
    detail:
      'Replace recursion with a manual stack to avoid call stack overflow and gain control over traversal order.',
  },
  {
    title: 'Two-stack undo/redo',
    detail:
      'Undo pops from the undo stack to redo; new actions clear redo to keep history consistent.',
  },
  {
    title: 'Monotonic stacks',
    detail:
      'Maintain increasing or decreasing order to answer next greater/smaller element queries in linear time.',
  },
  {
    title: 'Delimiter matching',
    detail:
      'Push opening symbols; pop when a closing symbol appears. Stack order mirrors nested structure.',
  },
  {
    title: 'Stack allocator',
    detail:
      'LIFO allocation and free is fast and predictable for temporary objects in tight loops.',
  },
]

const variants = [
  {
    title: 'Min/Max stack',
    detail:
      'Auxiliary stack tracks current min or max for O(1) queries.',
  },
  {
    title: 'Persistent stack',
    detail:
      'Immutable nodes share tails across versions to enable cheap snapshots.',
  },
  {
    title: 'Bounded stack',
    detail:
      'Fixed-capacity stack used in embedded or real-time systems for deterministic memory use.',
  },
  {
    title: 'Stack with frames',
    detail:
      'Frames group multiple values (locals, return address) to model call stacks and interpreters.',
  },
  {
    title: 'Deque-based stack',
    detail:
      'Use a deque when you need stack operations plus occasional pops from the bottom.',
  },
]

const invariants = [
  {
    title: 'Top pointer correctness',
    detail:
      'After push, top points to the new element; after pop, top points to the previous element.',
  },
  {
    title: 'No underflow',
    detail:
      'Pop and peek are invalid when size is zero. Guard with checks or sentinels.',
  },
  {
    title: 'Array bounds',
    detail:
      'For array-backed stacks, top must stay within 0..capacity.',
  },
  {
    title: 'Cleared slots',
    detail:
      'In managed languages, clear popped slots to avoid retaining references.',
  },
]

const pitfalls = [
  'Underflow when popping an empty stack; always guard or assert before pop/peek.',
  'Overflow in fixed-capacity stacks (embedded, kernel stacks); detect and fail fast.',
  'Leaking references in managed languages if you do not clear popped slots (prevents GC).',
  'Mixing stack and recursion can double-memory footprint; choose one explicit stack for control.',
  'Concurrency: pushing/popping from multiple threads without synchronization corrupts order; use locks or lock-free stacks.',
  'Forgetting to reset top during clear leads to stale data and incorrect size reporting.',
  'Off-by-one errors in array-backed stacks cause overwrite or missing elements.',
]

const decisionGuidance = [
  'Use a stack when the most recent item must be processed first or when modeling nested structure.',
  'Pick array backing for performance and cache locality when maximum depth is known or bounded.',
  'Pick linked nodes when size is unbounded or when you want stable references to elements.',
  'For undo/redo, pair two stacks so you can move items between them as actions are undone and redone.',
  'If you need both ends, consider a deque; if you need ordering with random access, choose a vector or list instead.',
  'For deep recursion, switch to an explicit stack to prevent call stack overflow.',
]

const advancedInsights = [
  {
    title: 'Min/Max stacks',
    detail:
      'Store an auxiliary min or max with each node to answer getMin/getMax in O(1) without extra traversal.',
  },
  {
    title: 'Two-stack queue',
    detail:
      'Enqueue pushes to stack A; dequeue pops from stack B, refilling B from A when empty. Amortized O(1) per operation.',
  },
  {
    title: 'Guard pages and overflow detection',
    detail:
      'OS kernels place an unmapped guard page after the call stack. Touching it triggers a fault, catching runaway recursion early.',
  },
  {
    title: 'Persistent stacks',
    detail:
      'Functional stacks share tails between versions. push returns a new stack head that reuses the previous nodes, enabling cheap snapshots.',
  },
  {
    title: 'Tail-call optimization',
    detail:
      'Eliminates growth of the call stack for tail-recursive functions by reusing the current frame, turning recursion into iteration implicitly.',
  },
  {
    title: 'Stack discipline in allocators',
    detail:
      'Stack allocators free in LIFO order to avoid fragmentation and support fast resets after a frame or phase ends.',
  },
]

const takeaways = [
  'Stacks enforce LIFO discipline, making recent work easy to revisit and nested structure easy to validate.',
  'push/pop are O(1); array backing is cache-friendly, linked backing avoids reallocations.',
  'Most stack bugs are underflow/overflow or forgotten clean-up; add size checks and clear popped slots.',
  'Monotonic and min/max stacks extend the basic idea to solve range and extremum queries in O(n).',
  'Authoritative references: CLRS, Sedgewick and Wayne, GeeksforGeeks, and LeetCode stack patterns.',
]

const checkpoints = [
  'Explain why array-backed stack push is amortized O(1).',
  'Show how to replace recursion with an explicit stack.',
  'Implement a min stack and justify the space cost.',
  'Describe what causes stack overflow in recursive algorithms.',
  'Illustrate delimiter matching with a stack.',
]

export default function StacksPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Stacks</span>
          <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div className="win95-stack">
              <div className="win95-subheading">Last-in, first-out discipline for nested and recent work</div>
              <p className="win95-text">
                Stacks capture recency. Whatever you push last is what you see first, making them perfect for recursion, parsing,
                backtracking, undo, and single-pass range problems. The simplicity of push and pop keeps reasoning and performance
                predictable.
              </p>
              <p className="win95-text">
                Stacks thrive when the newest item matters most. They mirror how call frames, parentheses, and undo steps naturally
                nest. By restricting access to the top, stacks make correctness proofs and performance analysis straightforward: push
                and pop are constant-time, and the order is fully determined.
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
                Array stacks excel when maximum depth is known or bounded; linked stacks excel when churn is high or depth is
                unknown. Specialized stacks (monotonic, min) adjust stored metadata to answer richer queries while keeping push/pop
                O(1).
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
                Real-world intuition: a cache miss is far more expensive than the O(1) arithmetic of push/pop. Favor contiguous stacks
                in performance-critical loops and add guards for overflow/underflow in constrained environments.
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
                    <th>Array Stack</th>
                    <th>Linked Stack</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {operationsTable.map((row) => (
                    <tr key={row.op}>
                      <td>{row.op}</td>
                      <td>{row.array}</td>
                      <td>{row.linked}</td>
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
                Sources: CLRS, Sedgewick and Wayne, GeeksforGeeks stack guides, and LeetCode monotonic stack discussions provide proofs,
                edge cases, and performance notes that back these patterns.
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

