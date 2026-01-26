import { useState } from 'react'
import { Link } from 'react-router-dom'

import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'What it is',
    details:
      'Atomics are operations that appear indivisible to other threads. Memory ordering defines which reads and writes must be visible and in what order.',
    notes:
      'Together they form the language-level contract that lets threads communicate safely without full locks.',
  },
  {
    title: 'Why it matters',
    details:
      'Without ordering rules, CPUs and compilers can reorder operations, causing subtle visibility bugs even when code looks correct.',
    notes:
      'Memory orderings let you trade off performance and reasoning complexity.',
  },
  {
    title: 'Where it shows up',
    details:
      'Lock-free algorithms, queues, reference counters, signal flags, once-init, and performance-critical synchronization.',
    notes:
      'Even high-level constructs (mutexes, channels) are built on top of atomics.',
  },
]

const mentalModel = [
  {
    title: 'Three layers of reordering',
    detail:
      'Compilers reorder instructions, CPUs execute out of order, and caches delay visibility. Memory ordering constrains all three.',
  },
  {
    title: 'Visibility vs atomicity',
    detail:
      'Atomicity prevents torn reads/writes; ordering controls when other threads can see those changes.',
  },
  {
    title: 'Happens-before',
    detail:
      'If A happens-before B, every effect of A must be visible to B. Ordering rules exist to build this relation.',
  },
  {
    title: 'Data race freedom',
    detail:
      'If two threads access the same location and at least one is a write, it must be synchronized. Otherwise behavior is undefined.',
  },
]

const quickGlossary = [
  {
    term: 'Atomic operation',
    definition: 'An operation that appears indivisible to all other threads.',
  },
  {
    term: 'Memory order',
    definition: 'Rules that constrain visibility and ordering of reads/writes across threads.',
  },
  {
    term: 'Acquire',
    definition: 'Prevents later reads/writes from moving before the acquire.',
  },
  {
    term: 'Release',
    definition: 'Prevents earlier reads/writes from moving after the release.',
  },
  {
    term: 'Relaxed',
    definition: 'Guarantees atomicity only; no ordering or visibility constraints across locations.',
  },
  {
    term: 'Sequentially consistent (SC)',
    definition: 'All threads observe a single global order of SC operations.',
  },
  {
    term: 'Fence',
    definition: 'An ordering barrier that constrains reordering without reading/writing a specific location.',
  },
  {
    term: 'ABA problem',
    definition: 'A location changes A→B→A, fooling compare-and-swap that checks only equality.',
  },
]

const atomicOperations = [
  {
    title: 'Load',
    detail:
      'Read an atomic value with specified ordering (relaxed, acquire, seq-cst).',
  },
  {
    title: 'Store',
    detail:
      'Write an atomic value with specified ordering (relaxed, release, seq-cst).',
  },
  {
    title: 'Read-modify-write (RMW)',
    detail:
      'Operations like fetch_add or exchange are atomic as a single step.',
  },
  {
    title: 'Compare-and-swap (CAS)',
    detail:
      'Updates only if the current value matches an expected value; cornerstone of lock-free algorithms.',
  },
  {
    title: 'Fetch-add / fetch-sub',
    detail:
      'Atomic counters and reference counts; ordering depends on how results are used.',
  },
  {
    title: 'Bitwise atomic ops',
    detail:
      'Fetch-and, fetch-or, fetch-xor; useful for flags or packed state.',
  },
]

const memoryOrders = [
  {
    id: 'relaxed',
    name: 'Relaxed',
    guarantee:
      'Atomicity only. No ordering with other operations.',
    useCases:
      'Statistics counters, approximate metrics, or when ordering is established elsewhere.',
    example:
      'fetch_add(relaxed) for a metrics counter that does not affect correctness.',
  },
  {
    id: 'acquire',
    name: 'Acquire',
    guarantee:
      'Prevents later operations from moving before the acquire.',
    useCases:
      'Loading a flag that publishes data written before a release.',
    example:
      'if (ready.load(acquire)) read shared data.',
  },
  {
    id: 'release',
    name: 'Release',
    guarantee:
      'Prevents earlier operations from moving after the release.',
    useCases:
      'Publishing data before setting a flag.',
    example:
      'write data; ready.store(true, release).',
  },
  {
    id: 'acqrel',
    name: 'Acquire-Release',
    guarantee:
      'Combine acquire and release for RMW operations.',
    useCases:
      'Lock-free algorithms where a CAS both reads and publishes state.',
    example:
      'compare_exchange with acq_rel on success.',
  },
  {
    id: 'seqcst',
    name: 'Sequentially Consistent',
    guarantee:
      'All seq-cst atomics appear in a single global order.',
    useCases:
      'Simplest reasoning, debugging, and correctness-critical flags.',
    example:
      'Use seq-cst for a single global shutdown flag.',
  },
]

const happensBeforeRules = [
  {
    title: 'Sequenced-before (single thread)',
    detail:
      'Within one thread, earlier operations are sequenced before later ones.',
  },
  {
    title: 'Synchronizes-with (acquire/release)',
    detail:
      'A release store synchronizes-with a matching acquire load that observes it.',
  },
  {
    title: 'Happens-before (transitive)',
    detail:
      'If A happens-before B and B happens-before C, then A happens-before C.',
  },
  {
    title: 'Data race freedom',
    detail:
      'If all shared accesses are properly synchronized, the program behaves as if interleavings are consistent.',
  },
]

const commonPatterns = [
  {
    title: 'Message passing',
    detail:
      'Producer writes data, then release-stores a flag. Consumer acquire-loads flag, then reads data.',
  },
  {
    title: 'Once initialization',
    detail:
      'Initialize object, then release-store a pointer. Readers acquire-load pointer.',
  },
  {
    title: 'Reference counting',
    detail:
      'fetch_add relaxed for increments; release on decrement to zero; acquire fence before destroying.',
  },
  {
    title: 'Spinlock',
    detail:
      'Lock uses acquire on load/CAS; unlock uses release store.',
  },
  {
    title: 'Double-checked locking',
    detail:
      'Requires release on publish and acquire on check, otherwise readers may see partial state.',
  },
  {
    title: 'Work stealing queues',
    detail:
      'Use acq_rel for queue indices to avoid reordering around steals/pushes.',
  },
]

const pitfalls = [
  {
    mistake: 'Using relaxed when you need ordering',
    description:
      'The write becomes visible but other data may not, leading to reading stale or uninitialized values.',
  },
  {
    mistake: 'Assuming atomic implies visible',
    description:
      'Atomicity prevents tearing but does not guarantee visibility without ordering.',
  },
  {
    mistake: 'Relying on timing',
    description:
      'Bugs vanish on slow machines but appear on fast or highly parallel CPUs.',
  },
  {
    mistake: 'Ignoring ABA',
    description:
      'CAS may succeed even though the value was changed and changed back.',
  },
  {
    mistake: 'Mixing atomics and non-atomics on same data',
    description:
      'Accessing the same location with both atomic and non-atomic operations is undefined.',
  },
  {
    mistake: 'Assuming volatile is enough',
    description:
      'Volatile prevents some compiler optimizations but does not provide atomicity or cross-thread ordering.',
  },
]

const litmusTests = [
  {
    title: 'Message passing (safe with release/acquire)',
    code: `Thread 1:
data = 42
ready.store(true, release)

Thread 2:
if (ready.load(acquire))
  print(data)`,
    explanation:
      'Acquire-release ensures that if Thread 2 sees ready=true, it also sees data=42.',
  },
  {
    title: 'Reordering risk (relaxed)',
    code: `Thread 1:
x.store(1, relaxed)
y.store(1, relaxed)

Thread 2:
if (y.load(relaxed) == 1)
  print(x.load(relaxed))`,
    explanation:
      'Thread 2 might read y=1 but still see x=0 because no ordering is established.',
  },
  {
    title: 'Store buffering (SC avoids this outcome)',
    code: `Initially x = y = 0

Thread 1: x.store(1, relaxed); r1 = y.load(relaxed)
Thread 2: y.store(1, relaxed); r2 = x.load(relaxed)`,
    explanation:
      'It is possible for r1=0 and r2=0 on weak memory models unless SC is enforced.',
  },
]

const fencesAndBarriers = [
  {
    title: 'Acquire fence',
    detail:
      'Prevents later operations from moving before the fence, without loading a specific atomic.',
  },
  {
    title: 'Release fence',
    detail:
      'Prevents earlier operations from moving after the fence, without storing a specific atomic.',
  },
  {
    title: 'Sequentially consistent fence',
    detail:
      'Participates in the global SC order, similar to an SC atomic.',
  },
  {
    title: 'When to use fences',
    detail:
      'Use when ordering is needed but the synchronization variable is in a different structure or API.',
  },
]

const languageMapping = [
  {
    title: 'C/C++',
    detail:
      'std::atomic with memory_order_*; SC is default for most operations unless specified.',
  },
  {
    title: 'Rust',
    detail:
      'std::sync::atomic::{Atomic*, Ordering}; same semantics as C++ with explicit ordering.',
  },
  {
    title: 'Java',
    detail:
      'volatile reads/writes are acquire/release-like; VarHandle and Atomic* provide finer control.',
  },
  {
    title: 'JavaScript',
    detail:
      'Atomics on SharedArrayBuffer provide sequential consistency for their operations.',
  },
  {
    title: 'C#',
    detail:
      'volatile and Interlocked operations map to acquire/release or full fences depending on platform.',
  },
  {
    title: 'Go',
    detail:
      'sync/atomic provides load/store/CAS; memory order is effectively acquire/release.',
  },
]

const performanceNotes = [
  {
    title: 'Contended atomics are expensive',
    detail:
      'Hot atomic variables cause cache line bouncing and serialization across cores.',
  },
  {
    title: 'False sharing',
    detail:
      'Unrelated atomics on the same cache line still contend; padding can help.',
  },
  {
    title: 'Prefer relaxed for stats',
    detail:
      'Counters and metrics can often be relaxed to avoid unnecessary fences.',
  },
  {
    title: 'Use stronger ordering for correctness',
    detail:
      'If you are unsure, use acquire/release or seq-cst until proven safe to weaken.',
  },
]

const orderingChecklist = [
  'Do both threads access the same location? If yes, use atomic or lock.',
  'Is a value used as a flag to publish data? Use release on store, acquire on load.',
  'Is the operation an RMW that both reads and publishes? Use acq_rel.',
  'Is global reasoning needed or debugging? Prefer seq-cst.',
  'If an operation is truly independent, relaxed can be safe and faster.',
  'Never mix atomic and non-atomic accesses to the same location.',
]

const compareContrast = [
  {
    title: 'Atomics vs mutexes',
    detail:
      'Mutexes are simpler to reason about and can protect multiple variables at once, but they add blocking overhead.',
  },
  {
    title: 'Acquire-release vs seq-cst',
    detail:
      'Acquire-release provides minimal ordering; seq-cst adds a global order that is easier to reason about but slower.',
  },
  {
    title: 'Fences vs atomic operations',
    detail:
      'Fences order operations without touching a particular memory location; atomics combine ordering with data access.',
  },
  {
    title: 'Visibility vs synchronization',
    detail:
      'Visibility means a value can be seen; synchronization means a defined order of actions across threads.',
  },
]

const keyTakeaways = [
  'Atomicity prevents tearing, but ordering is what ensures visibility and correct cross-thread communication.',
  'Acquire-release pairs are the workhorse for publishing data safely with minimal overhead.',
  'Sequential consistency offers the simplest reasoning model but costs more.',
  'Relaxed operations are safe only when no ordering or visibility guarantees are required.',
  'Data race freedom is non-negotiable: mix atomics or locks consistently.',
]

const orderingPlaybook = [
  {
    id: 'publish',
    title: 'Publish data with a flag',
    description:
      'Classic message-passing pattern using release/acquire.',
    code: `Producer:
data = payload
ready.store(true, release)

Consumer:
if (ready.load(acquire))
  use(data)`,
    takeaway:
      'Acquire sees everything before the release store.',
  },
  {
    id: 'lock',
    title: 'Spinlock acquire/release',
    description:
      'CAS for lock acquisition, release store to unlock.',
    code: `lock():
while (!state.compare_exchange(false, true, acq_rel)) spin

unlock():
state.store(false, release)`,
    takeaway:
      'acq_rel on CAS orders both read and write side effects.',
  },
  {
    id: 'counter',
    title: 'Relaxed counter',
    description:
      'Non-critical metrics that do not gate behavior.',
    code: `hits.fetch_add(1, relaxed)`,
    takeaway:
      'No ordering is needed if the counter does not guard data.',
  },
]

export default function AtomicsAndMemoryOrderingPage(): JSX.Element {
  const defaultPlay = orderingPlaybook[0] ?? {
    id: 'fallback',
    title: 'No scenarios configured',
    description: 'Add ordering scenarios to display examples.',
    code: 'No code available.',
    takeaway: 'No takeaway available.',
  }
  const [selectedOrderId, setSelectedOrderId] = useState(defaultPlay.id)

  const selectedOrder = orderingPlaybook.find((item) => item.id === selectedOrderId) ?? defaultPlay

  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Atomics &amp; Memory Ordering</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">How threads communicate safely without locks</div>
              <p className="win95-text">
                Atomics provide indivisible reads, writes, and read-modify-write operations. Memory ordering defines the rules that
                constrain how those operations become visible across threads. This page builds a practical, detailed mental model,
                explains the major memory orders, and shows patterns that appear in real systems.
              </p>
            </div>
            <Link to="/algoViz" className="win95-button" role="button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-fieldset">
            <legend>The Big Picture</legend>
            <div className="win95-grid win95-grid-3">
              {bigPicture.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.details}</p>
                  <p className="win95-text">{item.notes}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Core Mental Model</legend>
            <div className="win95-grid win95-grid-2">
              {mentalModel.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Quick Glossary</legend>
            <div className="win95-grid win95-grid-2">
              {quickGlossary.map((item) => (
                <div key={item.term} className="win95-panel">
                  <div className="win95-heading">{item.term}</div>
                  <p className="win95-text">{item.definition}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Atomic Operations You Actually Use</legend>
            <div className="win95-grid win95-grid-3">
              {atomicOperations.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Memory Orders (Pick the Right Contract)</legend>
            <div className="win95-grid win95-grid-2">
              {memoryOrders.map((item) => (
                <div key={item.id} className="win95-panel">
                  <div className="win95-heading">{item.name}</div>
                  <p className="win95-text"><strong>Guarantee:</strong> {item.guarantee}</p>
                  <p className="win95-text"><strong>Use cases:</strong> {item.useCases}</p>
                  <p className="win95-text"><strong>Example:</strong> {item.example}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                A memory order is not about speed alone. It is a formal promise you make to other threads. Use the weakest ordering
                that still makes the program correct, and document the reasoning.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Happens-Before: The Logic That Makes It Work</legend>
            <div className="win95-grid win95-grid-2">
              {happensBeforeRules.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Common Patterns</legend>
            <div className="win95-grid win95-grid-2">
              {commonPatterns.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Litmus Tests (Tiny Programs, Big Lessons)</legend>
            <div className="win95-stack">
              {litmusTests.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <pre className="win95-code">
                    <code>{item.code.trim()}</code>
                  </pre>
                  <p className="win95-text">{item.explanation}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Fences and Barriers</legend>
            <div className="win95-grid win95-grid-2">
              {fencesAndBarriers.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Ordering Playbook (Interactive)</legend>
            <div className="win95-panel">
              <p className="win95-text">
                Select a scenario to see the recommended ordering contract. These are minimal patterns that generalize across languages.
              </p>
              <div className="win95-grid win95-grid-3">
                {orderingPlaybook.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="win95-button"
                    onClick={() => setSelectedOrderId(item.id)}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
              <div className="win95-panel win95-panel--raised">
                <p className="win95-text"><strong>{selectedOrder.title}</strong></p>
                <p className="win95-text">{selectedOrder.description}</p>
                <pre className="win95-code">
                  <code>{selectedOrder.code.trim()}</code>
                </pre>
                <p className="win95-text"><strong>Takeaway:</strong> {selectedOrder.takeaway}</p>
              </div>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Language Mapping (Same Ideas, Different Names)</legend>
            <div className="win95-grid win95-grid-3">
              {languageMapping.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Performance Reality Check</legend>
            <div className="win95-grid win95-grid-2">
              {performanceNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Compare and Contrast</legend>
            <div className="win95-grid win95-grid-2">
              {compareContrast.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Common Pitfalls</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {pitfalls.map((pitfall) => (
                  <li key={pitfall.mistake}>
                    <strong>{pitfall.mistake}:</strong> {pitfall.description}
                  </li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Ordering Checklist</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {orderingChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Key Takeaways</legend>
            <div className="win95-grid win95-grid-2">
              {keyTakeaways.map((takeaway) => (
                <div key={takeaway} className="win95-panel">
                  <p className="win95-text">{takeaway}</p>
                </div>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}
