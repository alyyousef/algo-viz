import { useState } from 'react'

import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'What it is',
    details:
      'Linear structures are containers where elements are arranged in a sequential order. Each element has at most one predecessor and one successor.',
    notes:
      'They are the foundation of nearly every algorithm and program â€” from call stacks to print queues to undo history.',
  },
  {
    title: 'Why it matters',
    details:
      'The choice of linear structure determines what operations are efficient. Arrays give fast random access; linked lists give fast insertion at the front; stacks enforce LIFO discipline; queues enforce FIFO.',
    notes: 'Picking the wrong structure forces O(n) work where O(1) is available.',
  },
  {
    title: 'Where it shows up',
    details:
      'Function call stacks, undo/redo buffers, BFS/DFS frontiers, job queues, sliding-window algorithms, and dynamic arrays (Vec, ArrayList, std::vector).',
    notes:
      'Most higher-level structures (graphs, trees, heaps) are implemented using one or more linear structures internally.',
  },
]

const mentalModel = [
  {
    title: 'Access pattern defines structure',
    detail:
      'The defining trait of a linear structure is not how it is stored but how you access it: random-access (array), restricted-end (stack/queue), or arbitrary (linked list with a pointer).',
  },
  {
    title: 'Contiguous vs linked memory',
    detail:
      'Arrays store elements in contiguous memory, giving cache-friendly iteration. Linked lists scatter nodes in the heap, making traversal slower but insertion and deletion O(1) at a known node.',
  },
  {
    title: 'Amortized cost',
    detail:
      'Dynamic arrays appear to have O(1) append on average because the occasional O(n) resize is spread over many operations. Worst-case single operation is still O(n).',
  },
  {
    title: 'Iterator invalidation',
    detail:
      'Resizing a dynamic array invalidates all existing pointers and references. Linked list insertions do not invalidate iterators to other nodes.',
  },
]

const keyTakeaways = [
  'Arrays give O(1) random access and cache-friendly traversal at the cost of O(n) mid-insertion.',
  'Linked lists give O(1) insertion and deletion at a known node at the cost of O(n) search and poor cache utilization.',
  'Stacks and queues are abstract interfaces implementable on top of either arrays or linked lists.',
  'Deques (double-ended queues) generalize stacks and queues, enabling O(1) access at both ends.',
  'Dynamic arrays are the default go-to for most general sequential storage needs.',
  'Iterator invalidation is a common source of bugs when modifying containers while iterating.',
]

const structures = [
  {
    title: 'Array (static)',
    detail:
      'Fixed-size block of contiguous memory. O(1) read/write by index. Size is determined at declaration and cannot change.',
  },
  {
    title: 'Dynamic Array (Vec / ArrayList)',
    detail:
      'Resizable array that doubles capacity on overflow. Amortized O(1) append, O(1) random access, O(n) insert/delete in the middle.',
  },
  {
    title: 'Singly Linked List',
    detail:
      'Each node holds a value and a pointer to the next node. O(1) prepend; O(n) search and tail access.',
  },
  {
    title: 'Doubly Linked List',
    detail:
      'Each node holds a value, a next pointer, and a previous pointer. O(1) insert/delete at a known node; O(n) search.',
  },
  {
    title: 'Stack',
    detail:
      'LIFO (Last In, First Out) container. Push and pop from the same end. Typically backed by a dynamic array or linked list.',
  },
  {
    title: 'Queue',
    detail:
      'FIFO (First In, First Out) container. Enqueue at the back, dequeue from the front. Efficiently backed by a ring buffer or linked list.',
  },
  {
    title: 'Deque (Double-Ended Queue)',
    detail:
      'Generalizes stack and queue by allowing O(1) push/pop at both ends. Often backed by a ring buffer or a block-allocated structure.',
  },
  {
    title: 'Circular Buffer (Ring Buffer)',
    detail:
      'Fixed-capacity array with head and tail pointers that wrap around. O(1) enqueue and dequeue without shifting elements.',
  },
]

const complexityTable = [
  {
    structure: 'Array',
    access: 'O(1)',
    search: 'O(n)',
    insertFront: 'O(n)',
    insertBack: 'O(1)*',
    deleteFront: 'O(n)',
    deleteBack: 'O(1)*',
  },
  {
    structure: 'Singly Linked List',
    access: 'O(n)',
    search: 'O(n)',
    insertFront: 'O(1)',
    insertBack: 'O(n)',
    deleteFront: 'O(1)',
    deleteBack: 'O(n)',
  },
  {
    structure: 'Doubly Linked List',
    access: 'O(n)',
    search: 'O(n)',
    insertFront: 'O(1)',
    insertBack: 'O(1)',
    deleteFront: 'O(1)',
    deleteBack: 'O(1)',
  },
  {
    structure: 'Stack',
    access: 'O(n)',
    search: 'O(n)',
    insertFront: 'N/A',
    insertBack: 'O(1)',
    deleteFront: 'N/A',
    deleteBack: 'O(1)',
  },
  {
    structure: 'Queue',
    access: 'O(n)',
    search: 'O(n)',
    insertFront: 'N/A',
    insertBack: 'O(1)',
    deleteFront: 'O(1)',
    deleteBack: 'N/A',
  },
  {
    structure: 'Deque',
    access: 'O(n)',
    search: 'O(n)',
    insertFront: 'O(1)',
    insertBack: 'O(1)',
    deleteFront: 'O(1)',
    deleteBack: 'O(1)',
  },
]

const commonPatterns = [
  {
    title: 'Sliding window',
    detail:
      'Use a deque to maintain the max or min of a moving window in O(n) total by evicting elements that can no longer be candidates.',
  },
  {
    title: 'Monotonic stack',
    detail:
      'Maintain a stack whose elements are in strictly increasing (or decreasing) order to solve "next greater element" problems in O(n).',
  },
  {
    title: 'BFS frontier',
    detail:
      'A queue holds the frontier during breadth-first search. Processing in FIFO order guarantees shortest-path discovery in unweighted graphs.',
  },
  {
    title: 'DFS with explicit stack',
    detail:
      'Replace recursion with an explicit stack to avoid call-stack overflow on deep graphs while preserving DFS order.',
  },
  {
    title: 'Two-pointer technique',
    detail:
      'Use two indices into an array â€” one at each end, or both moving forward at different speeds â€” to solve sorted-array and cycle-detection problems in O(n).',
  },
  {
    title: 'Undo/Redo buffer',
    detail:
      'Two stacks: push actions onto the undo stack; pop from undo and push onto redo. Provides O(1) undo and redo.',
  },
]

const pitfalls = [
  {
    mistake: 'Off-by-one in ring buffer',
    description:
      'A ring buffer with capacity N can hold N-1 or N elements depending on whether head==tail means empty or full. Be consistent.',
  },
  {
    mistake: 'Iterator invalidation',
    description:
      'Appending to a dynamic array can trigger a resize, moving the backing store and invalidating all existing references and iterators.',
  },
  {
    mistake: 'O(n) pop-front on a Vec',
    description:
      'Removing from the front of a dynamic array shifts every element. Use a deque or ring buffer when front-removal is frequent.',
  },
  {
    mistake: 'Stack overflow from deep recursion',
    description:
      'Recursive traversal of a singly-linked list with 10 million nodes will overflow the call stack. Use an iterative approach.',
  },
  {
    mistake: 'Memory fragmentation from linked list',
    description:
      'Allocating millions of small linked-list nodes creates heap fragmentation and defeats the CPU cache. Prefer pooled allocation or arrays for high-throughput use cases.',
  },
  {
    mistake: 'Forgetting to update tail on linked list append',
    description:
      'If you maintain a tail pointer, every operation that adds or removes the last node must update it. Missing one causes silent corruption.',
  },
]

const codeExamples = [
  {
    title: 'Dynamic array â€” append and index',
    code: `// Rust
let mut v: Vec<i32> = Vec::new();
v.push(10);       // O(1) amortized
v.push(20);
println!("{}", v[1]); // O(1) â†’ 20`,
    explanation:
      'Vec grows by doubling capacity. Indexing is bounds-checked and panics on out-of-bounds in debug mode.',
  },
  {
    title: 'Stack â€” push and pop',
    code: `// Python
stack = []
stack.append(1)   # push
stack.append(2)
top = stack.pop() # pop â†’ 2`,
    explanation:
      'A Python list used as a stack. append() and pop() from the end are both O(1) amortized.',
  },
  {
    title: 'Queue â€” enqueue and dequeue',
    code: `// Python (deque for O(1) front-remove)
from collections import deque
q = deque()
q.append(1)       # enqueue back
q.append(2)
front = q.popleft() # dequeue front â†’ 1`,
    explanation:
      'collections.deque uses a doubly-linked list of fixed-size blocks. popleft() is O(1), unlike list.pop(0) which is O(n).',
  },
  {
    title: 'Singly linked list â€” node definition',
    code: `// TypeScript
type ListNode<T> = {
  value: T
  next: ListNode<T> | null
}

function prepend<T>(head: ListNode<T> | null, value: T): ListNode<T> {
  return { value, next: head }
}`,
    explanation:
      'Prepending to a singly-linked list is O(1) because only the new node and the head pointer change.',
  },
  {
    title: 'Ring buffer â€” wrap-around indexing',
    code: `// C
#define CAP 8
int buf[CAP];
int head = 0, tail = 0, size = 0;

void enqueue(int x) {
  buf[tail] = x;
  tail = (tail + 1) % CAP;
  size++;
}

int dequeue() {
  int x = buf[head];
  head = (head + 1) % CAP;
  size--;
  return x;
}`,
    explanation:
      'Modular arithmetic keeps head and tail within the array bounds. Full/empty detection requires tracking size or leaving one slot unused.',
  },
  {
    title: 'Monotonic stack â€” next greater element',
    code: `// Python
def next_greater(arr):
  n = len(arr)
  result = [-1] * n
  stack = []          # holds indices
  for i in range(n):
    while stack and arr[stack[-1]] < arr[i]:
      result[stack.pop()] = arr[i]
    stack.append(i)
  return result`,
    explanation:
      'Each element is pushed and popped at most once, giving O(n) total. The stack maintains a decreasing sequence of values.',
  },
]

const languageMapping = [
  {
    title: 'C++',
    detail:
      'std::vector (dynamic array), std::list (doubly linked), std::deque (block-allocated deque), std::stack and std::queue (adaptors), std::array (fixed-size).',
  },
  {
    title: 'Rust',
    detail:
      'Vec<T> (dynamic array), VecDeque<T> (ring-buffer deque), LinkedList<T> (doubly linked, rarely used).',
  },
  {
    title: 'Java',
    detail:
      'ArrayList and LinkedList implement List; ArrayDeque is preferred for stack/queue use; Stack is legacy.',
  },
  {
    title: 'Python',
    detail:
      'list (dynamic array); collections.deque for O(1) front operations; no built-in linked list.',
  },
  {
    title: 'JavaScript / TypeScript',
    detail:
      'Array is a dynamic array; no standard linked list or deque. Libraries like denque provide efficient deques.',
  },
  {
    title: 'Go',
    detail:
      'Slice (dynamic array backed by array); container/list (doubly linked); container/ring (circular list).',
  },
]

const quickGlossary = [
  {
    term: 'Array',
    definition: 'A contiguous block of same-type elements accessed by index in O(1).',
  },
  {
    term: 'Dynamic array',
    definition:
      'A resizable array that doubles capacity on overflow, providing amortized O(1) append.',
  },
  {
    term: 'Linked list',
    definition: 'A sequence of nodes each containing a value and one or two pointers to neighbors.',
  },
  {
    term: 'Stack',
    definition: 'An abstract LIFO container supporting push, pop, and peek at one end.',
  },
  {
    term: 'Queue',
    definition:
      'An abstract FIFO container supporting enqueue at the back and dequeue from the front.',
  },
  {
    term: 'Deque',
    definition: 'A double-ended queue that supports O(1) push and pop at both front and back.',
  },
  {
    term: 'Ring buffer',
    definition:
      'A fixed-capacity array with wrapping head/tail pointers used to implement a queue in O(1).',
  },
  {
    term: 'Amortized O(1)',
    definition:
      'An operation whose average cost per call is O(1) even though individual calls may be O(n).',
  },
  {
    term: 'Iterator invalidation',
    definition:
      'When a structural modification to a container makes existing iterators or references invalid.',
  },
  {
    term: 'Sentinel node',
    definition:
      'A dummy head or tail node in a linked list that simplifies edge cases when the list is empty.',
  },
  {
    term: 'Monotonic stack',
    definition:
      'A stack maintained in sorted order by popping elements that violate the order before pushing.',
  },
  {
    term: 'Cache locality',
    definition:
      'The degree to which accessed memory is clustered, improving CPU cache hit rates. Arrays have high locality; linked lists have low locality.',
  },
]

const choiceChecklist = [
  'Need O(1) random access? â†’ Array or dynamic array.',
  'Need O(1) insert/delete at both ends? â†’ Deque or doubly-linked list.',
  'Need O(1) insert/delete at a known interior position? â†’ Doubly linked list.',
  'LIFO semantics only? â†’ Stack (backed by dynamic array).',
  'FIFO semantics only? â†’ Queue (backed by ring buffer or linked list).',
  'Iterating in order with no random access? â†’ Linked list or array (prefer array for cache).',
  'Fixed max size and frequent wrap-around? â†’ Ring buffer.',
  'General purpose, unknown access pattern? â†’ Dynamic array as default.',
]

const compareContrast = [
  {
    title: 'Array vs linked list',
    detail:
      'Arrays win on access time and cache locality; linked lists win on O(1) insert/delete at known nodes and no amortized resize cost.',
  },
  {
    title: 'Stack vs queue',
    detail:
      'Stacks process most-recent-first (LIFO), queues process oldest-first (FIFO). Both can be built on the same underlying structure.',
  },
  {
    title: 'Singly vs doubly linked',
    detail:
      'Singly-linked lists use less memory per node (one pointer vs two) but cannot traverse backwards or delete a node without the previous node.',
  },
  {
    title: 'Dynamic array vs deque',
    detail:
      'Dynamic arrays are faster for random access; deques are faster for front-insertion. If you only push/pop from both ends, prefer a deque.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-why', label: 'Why This Matters' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-mental-model', label: 'Core Mental Model' },
    { id: 'core-structures', label: 'The Structures' },
    { id: 'core-complexity', label: 'Complexity Overview' },
    { id: 'core-patterns', label: 'Common Patterns' },
    { id: 'core-languages', label: 'Language Mapping' },
    { id: 'core-compare', label: 'Compare and Contrast' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-checklist', label: 'Choice Checklist' },
  ],
  examples: [{ id: 'ex-code', label: 'Code Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function LinearStructuresPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Linear Structures',
    defaultTab: 'big-picture',
  })

  const defaultExample = codeExamples[0] ?? {
    title: 'No examples configured',
    code: 'No code available.',
    explanation: 'No explanation available.',
  }
  const [selectedExampleTitle, setSelectedExampleTitle] = useState(defaultExample.title)

  const selectedExample =
    codeExamples.find((ex) => ex.title === selectedExampleTitle) ?? defaultExample

  return (
    <TopicPageShell
      title="Linear Structures"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Linear Structures</h1>
      <p>
        Linear structures are sequential containers where each element has at most one predecessor
        and one successor. Arrays, linked lists, stacks, queues, and deques all belong to this
        family. The choice of structure determines which operations are O(1) and which are O(n),
        making it one of the most consequential decisions in everyday programming.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            {bigPicture.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.details}</p>
                <p>{item.notes}</p>
              </div>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-why" className="bin98-section">
            <h2 className="bin98-heading">Why This Matters</h2>
            <p>
              Most algorithmic inefficiencies in production code trace back to an incorrect choice
              of linear structure: removing from the front of an array, searching a list for an
              element that should be in a hash map, or allocating millions of tiny linked-list nodes
              when a ring buffer would do.
            </p>
            <p>
              Understanding the constant-time boundaries of each structure â€” and the cost of
              operations that cross those boundaries â€” is prerequisite knowledge for writing
              software that behaves well under load.
            </p>
          </section>
          <hr className="bin98-divider" />
          <section id="bp-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key Takeaways</h2>
            <ul>
              {keyTakeaways.map((takeaway) => (
                <li key={takeaway}>{takeaway}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {activeTab === 'core-concepts' && (
        <>
          <section id="core-mental-model" className="bin98-section">
            <h2 className="bin98-heading">Core Mental Model</h2>
            {mentalModel.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>
          <section id="core-structures" className="bin98-section">
            <h2 className="bin98-heading">The Structures</h2>
            {structures.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-complexity" className="bin98-section">
            <h2 className="bin98-heading">Complexity Overview</h2>
            <p>* amortized. N/A means the operation is not part of the structure's interface.</p>
            <table className="bin98-table">
              <thead>
                <tr>
                  <th>Structure</th>
                  <th>Access</th>
                  <th>Search</th>
                  <th>Insert front</th>
                  <th>Insert back</th>
                  <th>Delete front</th>
                  <th>Delete back</th>
                </tr>
              </thead>
              <tbody>
                {complexityTable.map((row) => (
                  <tr key={row.structure}>
                    <td>{row.structure}</td>
                    <td>{row.access}</td>
                    <td>{row.search}</td>
                    <td>{row.insertFront}</td>
                    <td>{row.insertBack}</td>
                    <td>{row.deleteFront}</td>
                    <td>{row.deleteBack}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          <section id="core-patterns" className="bin98-section">
            <h2 className="bin98-heading">Common Patterns</h2>
            {commonPatterns.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-languages" className="bin98-section">
            <h2 className="bin98-heading">Language Mapping</h2>
            {languageMapping.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-compare" className="bin98-section">
            <h2 className="bin98-heading">Compare and Contrast</h2>
            {compareContrast.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-pitfalls" className="bin98-section">
            <h2 className="bin98-heading">Common Pitfalls</h2>
            <ul>
              {pitfalls.map((pitfall) => (
                <li key={pitfall.mistake}>
                  <strong>{pitfall.mistake}:</strong> {pitfall.description}
                </li>
              ))}
            </ul>
          </section>
          <section id="core-checklist" className="bin98-section">
            <h2 className="bin98-heading">Choice Checklist</h2>
            <ul>
              {choiceChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {activeTab === 'examples' && (
        <section id="ex-code" className="bin98-section">
          <h2 className="bin98-heading">Code Examples</h2>
          <p>Select a scenario to view an annotated code sample.</p>
          <div className="lsbin98-inline-buttons">
            {codeExamples.map((ex) => (
              <button
                key={ex.title}
                type="button"
                className="lsbin98-push"
                onClick={() => setSelectedExampleTitle(ex.title)}
              >
                {ex.title}
              </button>
            ))}
          </div>
          <h3 className="bin98-subheading">{selectedExample.title}</h3>
          <div className="bin98-codebox">
            <code>{selectedExample.code.trim()}</code>
          </div>
          <p>{selectedExample.explanation}</p>
        </section>
      )}

      {activeTab === 'glossary' && (
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {quickGlossary.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
