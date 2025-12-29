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
    title: 'Compilers rely on activation records',
    detail:
      'Activation records (stack frames) store return addresses, locals, and saved registers. This layout defines how languages implement recursion and scope.',
  },
  {
    title: 'Browser navigation and undo histories',
    detail:
      'Stacks moved from theory to UX: back/forward navigation, undo/redo, and modal flows all lean on paired push/pop semantics to reverse actions safely.',
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
    ],
  },
  {
    heading: 'Array-backed stack',
    bullets: [
      'Uses a dynamic array and a top index.',
      'push increments index and writes; pop decrements without shifting.',
      'Reallocations on growth cost O(n) but amortize to O(1) per push.',
    ],
  },
  {
    heading: 'Linked-list stack',
    bullets: [
      'Uses a head pointer; push prepends a node, pop removes head.',
      'No reallocations; memory overhead is a pointer per node.',
      'Good when size is unknown or churn is high.',
    ],
  },
  {
    heading: 'Specialized variants',
    bullets: [
      'Min stack tracks current minimum alongside each push for O(1) getMin.',
      'Two-stack queue flips order twice to give amortized O(1) enqueue/dequeue.',
      'Monotonic stacks maintain sorted order to solve range queries in O(n).',
    ],
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
]

const pitfalls = [
  'Underflow when popping an empty stack; always guard or assert before pop/peek.',
  'Overflow in fixed-capacity stacks (embedded, kernel stacks); detect and fail fast.',
  'Leaking references in managed languages if you do not clear popped slots (prevents GC).',
  'Mixing stack and recursion can double-memory footprint; choose one explicit stack for control.',
  'Concurrency: pushing/popping from multiple threads without synchronization corrupts order; use locks or lock-free stacks.',
]

const decisionGuidance = [
  'Use a stack when the most recent item must be processed first or when modeling nested structure.',
  'Pick array backing for performance and cache locality when maximum depth is known or bounded.',
  'Pick linked nodes when size is unbounded or when you want stable references to elements.',
  'For undo/redo, pair two stacks so you can move items between them as actions are undone and redone.',
  'If you need both ends, consider a deque; if you need ordering with random access, choose a vector or list instead.',
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
]

const takeaways = [
  'Stacks enforce LIFO discipline, making recent work easy to revisit and nested structure easy to validate.',
  'push/pop are O(1); array backing is cache-friendly, linked backing avoids reallocations.',
  'Most stack bugs are underflow/overflow or forgotten clean-up; add size checks and clear popped slots.',
  'Monotonic and min/max stacks extend the basic idea to solve range and extremum queries in O(n).',
  'Authoritative references: CLRS, Sedgewick and Wayne, GeeksforGeeks, and LeetCode stack patterns.',
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
