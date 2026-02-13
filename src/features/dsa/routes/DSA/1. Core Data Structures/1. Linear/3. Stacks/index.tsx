import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

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

const references = [
  'CLRS (Introduction to Algorithms) for stack fundamentals and complexity analysis.',
  'Sedgewick and Wayne (Algorithms) for practical implementations and trade-offs.',
  'GeeksforGeeks stack guides for canonical patterns and edge cases.',
  'LeetCode stack and monotonic-stack discussions for applied problem patterns.',
]

const glossaryTerms = [
  {
    term: 'LIFO',
    definition: 'Last-In, First-Out ordering where the newest pushed element is popped first.',
  },
  {
    term: 'Underflow',
    definition: 'Attempting pop/peek on an empty stack.',
  },
  {
    term: 'Overflow',
    definition: 'Exceeding fixed stack capacity, common in bounded stacks or deep recursion.',
  },
  {
    term: 'Activation record',
    definition: 'A call-stack frame containing return address, locals, parameters, and saved registers.',
  },
  {
    term: 'Monotonic stack',
    definition: 'A stack maintained in sorted order to solve next-greater/smaller style range queries in linear time.',
  },
  {
    term: 'Amortized O(1)',
    definition: 'Average per-operation push cost in dynamic array stacks despite occasional O(n) resize.',
  },
  {
    term: 'Guard page',
    definition: 'An unmapped memory page used to trap stack overflow early.',
  },
  {
    term: 'Explicit stack',
    definition: 'A user-managed stack data structure used instead of recursion.',
  },
  {
    term: 'Persistent stack',
    definition: 'An immutable stack where new versions share tail nodes with old versions.',
  },
  {
    term: 'Top pointer/index',
    definition: 'The state variable that identifies where the next push/pop occurs.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const win98HelpStyles = `
.win98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.win98-help-page .win98-window {
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  background: #c0c0c0;
  width: 100%;
  min-height: 100dvh;
  margin: 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.win98-help-page .win98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.win98-help-page .win98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.win98-help-page .win98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
}

.win98-help-page .win98-control {
  width: 18px;
  height: 16px;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  line-height: 1;
}

.win98-help-page .win98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.win98-help-page .win98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.win98-help-page .win98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.win98-help-page .win98-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.win98-help-page .win98-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.win98-help-page .win98-toc-title {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 10px;
}

.win98-help-page .win98-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.win98-help-page .win98-toc-list li {
  margin: 0 0 8px;
}

.win98-help-page .win98-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.win98-help-page .win98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.win98-help-page .win98-doc-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px;
}

.win98-help-page .win98-section {
  margin: 0 0 20px;
}

.win98-help-page .win98-heading {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px;
}

.win98-help-page .win98-subheading {
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 6px;
}

.win98-help-page .win98-content p,
.win98-help-page .win98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.win98-help-page .win98-content p {
  margin: 0 0 10px;
}

.win98-help-page .win98-content ul,
.win98-help-page .win98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.win98-help-page .win98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.win98-help-page .win98-codebox {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 8px;
  margin: 6px 0 10px;
}

.win98-help-page .win98-codebox code {
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
  display: block;
}

@media (max-width: 900px) {
  .win98-help-page .win98-main {
    grid-template-columns: 1fr;
  }

  .win98-help-page .win98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}
`

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-history', label: 'Historical Context' },
    { id: 'bp-complexity', label: 'Complexity and Performance' },
    { id: 'bp-applications', label: 'Real-World Applications' },
    { id: 'bp-decisions', label: 'When to Use It' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-mental-models', label: 'Mental Models' },
    { id: 'core-mechanics', label: 'How It Works' },
    { id: 'core-anatomy', label: 'Structural Anatomy' },
    { id: 'core-operations', label: 'Operations Matrix' },
    { id: 'core-memory', label: 'Memory Layout and Safety' },
    { id: 'core-patterns', label: 'Patterns and Techniques' },
    { id: 'core-variants', label: 'Variants and Extensions' },
    { id: 'core-invariants', label: 'Invariants to Keep Safe' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-advanced', label: 'Advanced Insights' },
  ],
  examples: [
    { id: 'ex-practical', label: 'Practical Examples' },
    { id: 'ex-checkpoints', label: 'Quick Self-Checks' },
  ],
  glossary: [
    { id: 'glossary-terms', label: 'Terms' },
    { id: 'glossary-references', label: 'References' },
  ],
}

export default function StacksPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    const tab = searchParams.get('tab')
    return isTabId(tab) ? tab : 'big-picture'
  })
  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Stacks (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Stacks',
      url: `${location.pathname}${location.search}${location.hash}`,
      kind: 'help',
    }
    const rawTasks = window.localStorage.getItem(MINIMIZED_HELP_TASKS_KEY)
    const parsedTasks = rawTasks ? (JSON.parse(rawTasks) as Array<{ id: string }>) : []
    const nextTasks = [...parsedTasks.filter((task) => task.id !== minimizedTask.id), minimizedTask]
    window.localStorage.setItem(MINIMIZED_HELP_TASKS_KEY, JSON.stringify(nextTasks))

    const historyState = window.history.state as { idx?: number } | null
    if (historyState?.idx && historyState.idx > 0) {
      void navigate(-1)
      return
    }
    void navigate('/algoViz')
  }

  return (
    <div className="win98-help-page">
      <style>{win98HelpStyles}</style>
      <div className="win98-window" role="presentation">
        <header className="win98-titlebar">
          <span className="win98-title-text">Stacks</span>
          <div className="win98-title-controls">
            <button className="win98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="win98-control" aria-label="Close">X</Link>
          </div>
        </header>
        <div className="win98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`win98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="win98-main">
          <aside className="win98-toc" aria-label="Table of contents">
            <h2 className="win98-toc-title">Contents</h2>
            <ul className="win98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="win98-content">
            <h1 className="win98-doc-title">Stacks</h1>
            <p>
              Stacks capture recency. Whatever you push last is what you see first, making them perfect for recursion, parsing,
              backtracking, undo, and single-pass range problems. The simplicity of push and pop keeps reasoning and performance
              predictable.
            </p>
            <p>
              Stacks thrive when the newest item matters most. They mirror how call frames, parentheses, and undo steps naturally nest.
              By restricting access to the top, stacks make correctness proofs and performance analysis straightforward: push and pop are
              constant-time, and the order is fully determined.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="win98-section">
                  <h2 className="win98-heading">Overview</h2>
                  <p>
                    A stack is a constrained linear structure with one access boundary: the top. This single constraint creates powerful
                    behavior for nested operations and rollback flows, where recent context must be processed before older context.
                  </p>
                  <p>
                    Stacks appear at every layer of systems: language runtimes, parsers, algorithmic traversals, editor undo history, and
                    memory allocators. They are simple but foundational.
                  </p>
                </section>
                <hr className="win98-divider" />
                <section id="bp-history" className="win98-section">
                  <h2 className="win98-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <div key={item.title}>
                      <h3 className="win98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>
                <hr className="win98-divider" />
                <section id="bp-complexity" className="win98-section">
                  <h2 className="win98-heading">Complexity and Performance Intuition</h2>
                  {complexityNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    Real-world intuition: a cache miss is far more expensive than the O(1) arithmetic of push/pop. Favor contiguous
                    stacks in performance-critical loops and add guards for overflow/underflow in constrained environments.
                  </p>
                </section>
                <hr className="win98-divider" />
                <section id="bp-applications" className="win98-section">
                  <h2 className="win98-heading">Real-World Applications</h2>
                  {applications.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <hr className="win98-divider" />
                <section id="bp-decisions" className="win98-section">
                  <h2 className="win98-heading">When to Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
                <hr className="win98-divider" />
                <section id="bp-takeaways" className="win98-section">
                  <h2 className="win98-heading">Key Takeaways</h2>
                  <ul>
                    {takeaways.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                <section id="core-mental-models" className="win98-section">
                  <h2 className="win98-heading">Core Concept and Mental Models</h2>
                  {mentalModels.map((model) => (
                    <div key={model.title}>
                      <h3 className="win98-subheading">{model.title}</h3>
                      <p>{model.detail}</p>
                    </div>
                  ))}
                </section>
                <section id="core-mechanics" className="win98-section">
                  <h2 className="win98-heading">How It Works</h2>
                  {mechanics.map((block) => (
                    <div key={block.heading}>
                      <h3 className="win98-subheading">{block.heading}</h3>
                      <ul>
                        {block.bullets.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <p>
                    Array stacks excel when maximum depth is known or bounded; linked stacks excel when churn is high or depth is
                    unknown. Specialized stacks (monotonic, min) adjust stored metadata to answer richer queries while keeping push/pop
                    O(1).
                  </p>
                </section>
                <section id="core-anatomy" className="win98-section">
                  <h2 className="win98-heading">Structural Anatomy</h2>
                  {anatomy.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-operations" className="win98-section">
                  <h2 className="win98-heading">Operations Matrix</h2>
                  {operationsTable.map((row) => (
                    <p key={row.op}>
                      <strong>{row.op}:</strong> Array Stack {row.array}; Linked Stack {row.linked}. {row.note}
                    </p>
                  ))}
                </section>
                <section id="core-memory" className="win98-section">
                  <h2 className="win98-heading">Memory Layout and Safety</h2>
                  {memoryNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-patterns" className="win98-section">
                  <h2 className="win98-heading">Patterns and Techniques</h2>
                  {patterns.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-variants" className="win98-section">
                  <h2 className="win98-heading">Variants and Extensions</h2>
                  {variants.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-invariants" className="win98-section">
                  <h2 className="win98-heading">Invariants to Keep Safe</h2>
                  {invariants.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="win98-section">
                  <h2 className="win98-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-advanced" className="win98-section">
                  <h2 className="win98-heading">Advanced Insights and Variations</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                <section id="ex-practical" className="win98-section">
                  <h2 className="win98-heading">Practical Examples</h2>
                  {practicalExamples.map((example) => (
                    <div key={example.title}>
                      <h3 className="win98-subheading">{example.title}</h3>
                      <div className="win98-codebox">
                        <code>{example.code.trim()}</code>
                      </div>
                      <p>{example.note}</p>
                    </div>
                  ))}
                </section>
                <section id="ex-checkpoints" className="win98-section">
                  <h2 className="win98-heading">Quick Self-Checks</h2>
                  <ul>
                    {checkpoints.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'glossary' && (
              <>
                <section id="glossary-terms" className="win98-section">
                  <h2 className="win98-heading">Glossary</h2>
                  {glossaryTerms.map((item) => (
                    <p key={item.term}>
                      <strong>{item.term}:</strong> {item.definition}
                    </p>
                  ))}
                </section>
                <section id="glossary-references" className="win98-section">
                  <h2 className="win98-heading">References</h2>
                  <ul>
                    {references.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

