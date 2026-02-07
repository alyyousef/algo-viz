import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

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
    definition: 'A location changes A->B->A, fooling compare-and-swap that checks only equality.',
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

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const win98HelpStyles = `
.win98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.win98-window {
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

.win98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.win98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.win98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
}

.win98-control {
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

.win98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.win98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.win98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.win98-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.win98-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.win98-toc-title {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 10px;
}

.win98-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.win98-toc-list li {
  margin: 0 0 8px;
}

.win98-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.win98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.win98-doc-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px;
}

.win98-section {
  margin: 0 0 20px;
}

.win98-heading {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px;
}

.win98-subheading {
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 6px;
}

.win98-content p,
.win98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.win98-content p {
  margin: 0 0 10px;
}

.win98-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.win98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.win98-codebox {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 8px;
  margin: 6px 0 10px;
}

.win98-codebox code {
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
  display: block;
}

.win98-inline-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 0 0 10px;
}

.win98-push {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  font-size: 12px;
  padding: 4px 8px;
  cursor: pointer;
}

@media (max-width: 900px) {
  .win98-main {
    grid-template-columns: 1fr;
  }

  .win98-toc {
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
    { id: 'bp-why', label: 'Why This Matters' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-mental-model', label: 'Core Mental Model' },
    { id: 'core-operations', label: 'Atomic Operations' },
    { id: 'core-orders', label: 'Memory Orders' },
    { id: 'core-happens-before', label: 'Happens-Before Rules' },
    { id: 'core-patterns', label: 'Common Patterns' },
    { id: 'core-fences', label: 'Fences and Barriers' },
    { id: 'core-languages', label: 'Language Mapping' },
    { id: 'core-performance', label: 'Performance Notes' },
    { id: 'core-compare', label: 'Compare and Contrast' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-checklist', label: 'Ordering Checklist' },
  ],
  examples: [
    { id: 'ex-litmus', label: 'Litmus Tests' },
    { id: 'ex-playbook', label: 'Ordering Playbook' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function AtomicsAndMemoryOrderingPage(): JSX.Element {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const defaultPlay = orderingPlaybook[0] ?? {
    id: 'fallback',
    title: 'No scenarios configured',
    description: 'Add ordering scenarios to display examples.',
    code: 'No code available.',
    takeaway: 'No takeaway available.',
  }
  const [selectedOrderId, setSelectedOrderId] = useState(defaultPlay.id)
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    const tab = searchParams.get('tab')
    return isTabId(tab) ? tab : 'big-picture'
  })

  const selectedOrder = orderingPlaybook.find((item) => item.id === selectedOrderId) ?? defaultPlay
  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Atomics & Memory Ordering - Help (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
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
          <span className="win98-title-text">Atomics &amp; Memory Ordering - Help</span>
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
            <h1 className="win98-doc-title">Atomics &amp; Memory Ordering</h1>
            <p>
              Atomics provide indivisible reads, writes, and read-modify-write operations. Memory ordering defines the rules that
              constrain how those operations become visible across threads. This document focuses on practical reasoning: what
              guarantees each ordering gives, and how to apply them without adding unnecessary synchronization.
            </p>
            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="win98-section">
                  <h2 className="win98-heading">Overview</h2>
                  {bigPicture.map((item) => (
                    <div key={item.title}>
                      <h3 className="win98-subheading">{item.title}</h3>
                      <p>{item.details}</p>
                      <p>{item.notes}</p>
                    </div>
                  ))}
                </section>
                <hr className="win98-divider" />
                <section id="bp-why" className="win98-section">
                  <h2 className="win98-heading">Why This Matters</h2>
                  <p>
                    CPUs and compilers can reorder operations that seem obvious in source code. Correct synchronization depends on
                    formal ordering contracts, not timing assumptions or test luck.
                  </p>
                  <p>
                    Choosing weaker ordering can improve throughput, but only when correctness does not depend on cross-thread
                    visibility of related data.
                  </p>
                </section>
                <hr className="win98-divider" />
                <section id="bp-takeaways" className="win98-section">
                  <h2 className="win98-heading">Key Takeaways</h2>
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
                <section id="core-mental-model" className="win98-section">
                  <h2 className="win98-heading">Core Mental Model</h2>
                  {mentalModel.map((item) => (
                    <div key={item.title}>
                      <h3 className="win98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>
                <section id="core-operations" className="win98-section">
                  <h2 className="win98-heading">Atomic Operations</h2>
                  {atomicOperations.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-orders" className="win98-section">
                  <h2 className="win98-heading">Memory Orders</h2>
                  {memoryOrders.map((item) => (
                    <div key={item.id}>
                      <h3 className="win98-subheading">{item.name}</h3>
                      <p><strong>Guarantee:</strong> {item.guarantee}</p>
                      <p><strong>Use cases:</strong> {item.useCases}</p>
                      <p><strong>Example:</strong> {item.example}</p>
                    </div>
                  ))}
                </section>
                <section id="core-happens-before" className="win98-section">
                  <h2 className="win98-heading">Happens-Before Rules</h2>
                  {happensBeforeRules.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-patterns" className="win98-section">
                  <h2 className="win98-heading">Common Patterns</h2>
                  {commonPatterns.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-fences" className="win98-section">
                  <h2 className="win98-heading">Fences and Barriers</h2>
                  {fencesAndBarriers.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-languages" className="win98-section">
                  <h2 className="win98-heading">Language Mapping</h2>
                  {languageMapping.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-performance" className="win98-section">
                  <h2 className="win98-heading">Performance Notes</h2>
                  {performanceNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-compare" className="win98-section">
                  <h2 className="win98-heading">Compare and Contrast</h2>
                  {compareContrast.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="win98-section">
                  <h2 className="win98-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((pitfall) => (
                      <li key={pitfall.mistake}>
                        <strong>{pitfall.mistake}:</strong> {pitfall.description}
                      </li>
                    ))}
                  </ul>
                </section>
                <section id="core-checklist" className="win98-section">
                  <h2 className="win98-heading">Ordering Checklist</h2>
                  <ul>
                    {orderingChecklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                <section id="ex-litmus" className="win98-section">
                  <h2 className="win98-heading">Litmus Tests</h2>
                  {litmusTests.map((item) => (
                    <div key={item.title}>
                      <h3 className="win98-subheading">{item.title}</h3>
                      <div className="win98-codebox">
                        <code>{item.code.trim()}</code>
                      </div>
                      <p>{item.explanation}</p>
                    </div>
                  ))}
                </section>
                <section id="ex-playbook" className="win98-section">
                  <h2 className="win98-heading">Ordering Playbook</h2>
                  <p>Select a scenario to view the recommended ordering contract.</p>
                  <div className="win98-inline-buttons">
                    {orderingPlaybook.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className="win98-push"
                        onClick={() => setSelectedOrderId(item.id)}
                      >
                        {item.title}
                      </button>
                    ))}
                  </div>
                  <h3 className="win98-subheading">{selectedOrder.title}</h3>
                  <p>{selectedOrder.description}</p>
                  <div className="win98-codebox">
                    <code>{selectedOrder.code.trim()}</code>
                  </div>
                  <p><strong>Takeaway:</strong> {selectedOrder.takeaway}</p>
                </section>
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="win98-section">
                <h2 className="win98-heading">Glossary</h2>
                {quickGlossary.map((item) => (
                  <p key={item.term}>
                    <strong>{item.term}:</strong> {item.definition}
                  </p>
                ))}
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
