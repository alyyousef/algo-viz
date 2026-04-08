import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const overviewSections = [
  {
    title: 'What concurrency and synchronization are',
    body: 'Concurrency is the art of making multiple threads or tasks overlap in time while still producing correct results. Synchronization is the set of rules and primitives that keep those tasks from corrupting shared state, observing impossible intermediate states, or waiting forever for each other.',
  },
  {
    title: 'Why this section matters',
    body: 'Sequential code is hard enough because of state. Concurrent code adds interleavings, contention, reordering, visibility, and liveness. The goal is not only to keep data safe, but to preserve progress and performance under realistic scheduling and hardware behavior.',
  },
  {
    title: 'What concurrency teaches',
    body: 'This section teaches the difference between safety and liveness, mutual exclusion and coordination, ownership and visibility, blocking and spinning, and low-level ordering versus high-level primitives.',
  },
  {
    title: 'How to think about the topic',
    body: 'Start with shared invariants, then ask what can go wrong: races, deadlocks, starvation, lost wakeups, stale reads, convoying, or priority inversion. Once the failure mode is clear, the right primitive becomes much easier to choose.',
  },
]

const historicalContext = [
  {
    title: 'Mutual exclusion came first',
    detail:
      'Early concurrent systems needed a way to protect critical sections from simultaneous entry. Mutexes, semaphores, and monitors became the first serious tools for shared-state safety.',
  },
  {
    title: 'Coordination became as important as exclusion',
    detail:
      'Problems like producer-consumer, barriers, and readers-writers showed that correctness was not just about keeping threads apart. It was also about waking the right thread at the right time under the right predicate.',
  },
  {
    title: 'Weak memory forced a lower-level model',
    detail:
      "As compilers and CPUs reordered aggressively, atomics and memory ordering became necessary to explain how one thread's writes become visible to another without full locks.",
  },
  {
    title: 'Modern systems mix primitives',
    detail:
      'Production systems rarely use exactly one synchronization tool. Mutexes guard invariants, condition variables coordinate predicates, atomics handle fast paths, and barriers or channels organize stages and phases.',
  },
]

const sectionSurvey = [
  {
    name: 'Mutexes',
    summary:
      'The default primitive for protecting a critical section. One owner at a time, clear happens-before edges, and relatively simple reasoning compared with lower-level tools.',
  },
  {
    name: 'Condition Variables',
    summary:
      'A waiting-and-notification mechanism for sleeping until a shared predicate becomes true. They turn busy waiting into disciplined blocking, but require a mutex and a loop.',
  },
  {
    name: 'Monitors',
    summary:
      'An architectural form that bundles shared state, mutual exclusion, and condition variables into one disciplined interface.',
  },
  {
    name: 'Semaphores',
    summary:
      'Permit counters for modeling resource pools and coordination patterns. Powerful, but easier to misuse than mutexes because ownership is not enforced.',
  },
  {
    name: 'Barriers',
    summary:
      'Phase boundaries for a group of threads. Everyone reaches the rendezvous before anyone moves on.',
  },
  {
    name: 'Read-Write Locks',
    summary:
      'Shared access for readers and exclusive access for writers. Best when read-heavy access dominates and writer starvation is controlled.',
  },
  {
    name: 'Spinlocks',
    summary:
      'Locks that wait by spinning rather than sleeping. Useful only for tiny critical sections or contexts where blocking is impossible or too expensive.',
  },
  {
    name: 'Atomics and Memory Ordering',
    summary:
      'Low-level primitives that define indivisible operations and visibility guarantees across threads. Necessary for lock-free code and for understanding what higher-level primitives compile down to.',
  },
]

const whyItMatters = [
  'It defines whether shared state remains consistent under arbitrary interleavings.',
  'It separates programs that merely avoid crashes from programs that also guarantee progress.',
  'It explains when sleeping, spinning, or lock-free coordination is the right tradeoff.',
  'It connects language-level code to compiler and CPU behavior through visibility and ordering rules.',
  'It turns classic bugs like deadlock, starvation, lost wakeups, and data races into concrete design failures you can reason about explicitly.',
]

const concurrencyThemes = [
  {
    title: 'Safety versus liveness',
    body: 'Safety asks whether bad states are prevented: no torn data, no invariant violations, no simultaneous writers. Liveness asks whether the system keeps moving: no deadlock, no starvation, no threads waiting forever for events that will never occur.',
  },
  {
    title: 'Exclusion versus coordination',
    body: 'Mutexes and locks focus on keeping threads out of the same critical section. Condition variables, semaphores, and barriers focus on who may proceed and when. Real programs often need both.',
  },
  {
    title: 'Blocking versus busy waiting',
    body: 'Sleeping primitives yield the CPU and are usually better for user-space contention. Spinning can win for very short waits or in low-level runtimes, but only when the lock holder is likely to run immediately.',
  },
  {
    title: 'High-level predicates versus low-level memory contracts',
    body: 'Condition variables and monitors reason in terms of predicates over shared state. Atomics reason in terms of loads, stores, read-modify-write operations, and ordering edges. You need both levels of thought to write fast concurrent systems safely.',
  },
]

const keyTakeaways = [
  'Concurrency is about shared-state correctness under interleaving; synchronization is the machinery that makes that correctness enforceable.',
  'Choose primitives based on the failure mode you are preventing: races, waiting on predicates, phase coordination, or visibility ordering.',
  'A mutex is usually the first correct answer unless you can justify a more specialized primitive clearly.',
  'Condition variables require a mutex and a loop; atomics require a proof about visibility and ordering.',
  'Deadlock freedom, starvation behavior, and contention cost are part of the design, not optional follow-up concerns.',
]

const topicSignals = [
  {
    title: 'Use a mutex when protecting an invariant',
    body: 'If multiple fields must move together or every access to shared state should be serialized simply, start with a mutex.',
  },
  {
    title: 'Use a condition variable when waiting for a predicate',
    body: 'If a thread should sleep until shared state satisfies a condition such as "buffer not empty" or "shutdown complete", a condition variable is often the right tool.',
  },
  {
    title: 'Use a semaphore when counting permits',
    body: 'If the problem is naturally a counter of available resources or credits, semaphores can express the model directly.',
  },
  {
    title: 'Use a barrier when work happens in phases',
    body: 'If all threads must complete one round before any thread starts the next round, a barrier matches the structure exactly.',
  },
  {
    title: 'Use a read-write lock only when reads dominate',
    body: 'If reads vastly outnumber writes and the lock implementation overhead is justified, read-write locks may improve throughput.',
  },
  {
    title: 'Use a spinlock only when waiting should be shorter than sleeping',
    body: 'This usually means tiny critical sections, low-level runtimes, or kernel-style contexts where blocking is too expensive or impossible.',
  },
  {
    title: 'Use atomics when you truly need low-level synchronization',
    body: 'If the synchronization variable itself is the protocol, or if a lock-free fast path matters, atomics become necessary. They should not be chosen just because they look lightweight.',
  },
]

const coreFoundations = [
  {
    title: 'Shared state and invariants',
    body: 'Start by identifying which variables are shared and what must remain true about them. Good synchronization protects invariants, not just individual variables.',
  },
  {
    title: 'Ownership and access discipline',
    body: 'Correct designs define which code may mutate what state, under which lock or protocol, and when ownership transfers between threads.',
  },
  {
    title: 'Visibility rules',
    body: 'A write being executed is not enough. Another thread must also be guaranteed to observe it. Locks, condition-variable waits, barriers, and atomics all create visibility edges differently.',
  },
  {
    title: 'Contention economics',
    body: 'Every synchronization primitive has a cost model. Locks convoy, spinlocks burn CPU, condition variables wake and sleep, atomics bounce cache lines, and barriers punish load imbalance. Performance is part of the primitive choice.',
  },
]

const proofObligations = [
  {
    title: 'Mutex-based code needs invariant protection',
    body: 'You must show that every access participating in the invariant is covered by the same lock and that lock ordering prevents deadlock when multiple locks exist.',
  },
  {
    title: 'Condition variables need predicate discipline',
    body: 'The proof must explain which mutex protects the predicate, why waits occur in a loop, and why signals happen after state changes rather than before.',
  },
  {
    title: 'Semaphores need balanced meaning',
    body: 'A semaphore must represent one exact quantity. The proof usually depends on showing what the count means and why every wait has a matching signal in the intended lifecycle.',
  },
  {
    title: 'Barriers need phase correctness',
    body: 'You must show that threads do not observe next-phase state early and that the barrier release logic resets or advances generations safely.',
  },
  {
    title: 'Atomic code needs an ordering argument',
    body: 'It is not enough to say operations are atomic. You must show why the chosen acquire, release, acq_rel, relaxed, or seq-cst operations establish the required happens-before relation.',
  },
]

const commonFailureModes = [
  {
    title: 'Data races',
    body: 'Two threads touch the same state without proper synchronization and at least one access is a write. This breaks invariants and can produce undefined behavior in low-level languages.',
  },
  {
    title: 'Deadlock',
    body: "Threads wait forever for each other's resources or signals. Typical causes include cyclic lock ordering, forgotten releases, or waits that can no longer be satisfied.",
  },
  {
    title: 'Starvation and unfairness',
    body: 'A thread remains correct in theory but never makes progress because stronger or more frequent contenders repeatedly win.',
  },
  {
    title: 'Lost wakeups and spurious wakeups',
    body: 'Condition-variable code fails when notification is treated like a durable event instead of a hint about a predicate. This is why waiting must be protected by the same mutex and checked in a loop.',
  },
  {
    title: 'Visibility bugs',
    body: 'One thread writes data and another sees the flag but not the data, or reads stale state because ordering was not established even though the code "looked synchronized".',
  },
  {
    title: 'Contention collapse',
    body: 'A design may be logically correct yet operationally bad because too many threads fight for one lock, one atomic variable, or one barrier generation.',
  },
]

const comparisons = [
  {
    title: 'Mutex versus semaphore',
    body: 'A mutex expresses exclusive ownership of a critical section. A semaphore expresses availability of permits. Using a semaphore as a mutex loses the ownership clarity that makes mutexes easier to reason about.',
  },
  {
    title: 'Condition variable versus semaphore',
    body: 'Condition variables are about predicates guarded by a mutex. Semaphores are counters. They solve different coordination problems even when they can encode similar behavior.',
  },
  {
    title: 'Mutex versus spinlock',
    body: 'Mutexes are usually better in user space because waiting threads can sleep. Spinlocks make sense only when waiting is expected to be tiny and context-switch or sleep overhead dominates.',
  },
  {
    title: 'Monitor versus raw mutex plus condition variables',
    body: 'A monitor packages the state and synchronization policy together. The raw primitives are more flexible, but also easier to scatter and misuse.',
  },
  {
    title: 'Atomics versus locks',
    body: 'Locks simplify reasoning about multi-variable invariants. Atomics are lower level and can avoid blocking, but the proof burden rises sharply once ordering and reclamation concerns appear.',
  },
]

const studyChecklist = [
  'Write down the shared invariant before choosing a primitive.',
  'Identify whether the problem is exclusion, waiting on a predicate, phase alignment, or low-level visibility.',
  'Ask what happens under heavy contention, not only on a two-thread happy path.',
  'Define deadlock prevention or lock ordering explicitly when multiple locks are involved.',
  'If using condition variables, state the predicate and protect it with exactly one mutex.',
  'If using atomics, explain the required happens-before edges in words before writing the code.',
  'Include shutdown, cancellation, and timeout behavior in the design instead of bolting it on later.',
]

const workedExamples = [
  {
    id: 'ex-mutex',
    title: 'Mutex Example: Guarding a Shared Queue',
    domain: 'Mutual Exclusion',
    intro:
      'A queue used by multiple threads must not have two concurrent writers mutating its internal pointers or size fields simultaneously. A mutex around each queue operation gives one clear critical section boundary.',
    whyFit:
      'The problem is protecting a shared invariant over multiple fields, not expressing a count or a phase boundary.',
    code: `lock(queueMutex)
push item into queue
unlock(queueMutex)`,
    takeaway:
      'Mutexes are the simplest correct answer when multiple fields or structural invariants move together.',
  },
  {
    id: 'ex-condition',
    title: 'Condition Variable Example: Bounded Buffer Wait',
    domain: 'Predicate Coordination',
    intro:
      'A consumer should sleep when the buffer is empty rather than poll continuously. The predicate is "bufferCount > 0", and the same mutex that protects the buffer state must also protect that predicate.',
    whyFit:
      'The issue is not just excluding threads. It is sleeping until a condition over shared state becomes true.',
    code: `lock(mutex)
while bufferCount == 0:
  wait(notEmpty, mutex)

item = removeFromBuffer()
unlock(mutex)`,
    takeaway:
      'The loop is the important part. Notifications are hints, but the predicate is the truth.',
  },
  {
    id: 'ex-semaphore',
    title: 'Semaphore Example: Resource Pool of N Permits',
    domain: 'Permit Counting',
    intro:
      'If exactly N identical resources may be used concurrently, a counting semaphore models the rule directly. Threads wait for a permit before entering and signal when returning the resource.',
    whyFit: 'The core abstraction is resource availability, not ownership of one critical section.',
    code: `wait(poolSem)
use one shared resource
signal(poolSem)`,
    takeaway:
      'Semaphores work best when the counter has one precise meaning and every path preserves that meaning.',
  },
  {
    id: 'ex-barrier',
    title: 'Barrier Example: Parallel Simulation Timestep',
    domain: 'Phase Synchronization',
    intro:
      'In a timestep simulation, each worker updates its partition for round k. No worker should read round k + 1 data until every worker has finished round k. The natural shape is a barrier between phases.',
    whyFit: 'The problem is group alignment across phases, not guarding one piece of shared state.',
    code: `compute local updates for this timestep
barrier.wait()
read next-phase shared state`,
    takeaway: 'Barriers solve "everyone meets here before continuing" problems directly.',
  },
  {
    id: 'ex-atomic',
    title: 'Atomic Example: Publish With Release and Acquire',
    domain: 'Visibility Ordering',
    intro:
      'A producer writes shared data and then sets a readiness flag. The consumer must not read the data before that publication is visible. Acquire-release ordering is the standard lightweight contract.',
    whyFit:
      'The synchronization variable itself carries the visibility protocol, so low-level ordering matters.',
    code: `Producer:
data = payload
ready.store(true, release)

Consumer:
if ready.load(acquire):
  use(data)`,
    takeaway:
      'Atomicity alone is not enough. The key idea is establishing visibility with the right ordering edge.',
  },
]

const glossary = [
  {
    term: 'Critical section',
    definition:
      'Code that must not be executed concurrently by more than the allowed number of threads.',
  },
  {
    term: 'Data race',
    definition:
      'Concurrent access to the same memory location where at least one access is a write and synchronization is insufficient.',
  },
  {
    term: 'Deadlock',
    definition:
      'A state in which threads wait forever because each is blocked by another in the cycle.',
  },
  {
    term: 'Starvation',
    definition:
      'A thread makes no progress because other threads repeatedly win access to a needed resource.',
  },
  {
    term: 'Condition variable',
    definition:
      'A primitive for sleeping until a predicate protected by a mutex may have become true.',
  },
  {
    term: 'Semaphore',
    definition:
      'A synchronization counter that tracks permits or credits using wait and signal operations.',
  },
  {
    term: 'Barrier',
    definition: 'A rendezvous point where all participants must arrive before any may proceed.',
  },
  {
    term: 'Monitor',
    definition:
      'A construct that bundles shared state, mutual exclusion, and condition variables behind one interface.',
  },
  {
    term: 'Acquire',
    definition: 'An ordering rule that prevents later operations from moving before the acquire.',
  },
  {
    term: 'Release',
    definition: 'An ordering rule that prevents earlier operations from moving after the release.',
  },
  {
    term: 'Happens-before',
    definition:
      'A visibility relation ensuring effects of one action are observable by another in the required order.',
  },
  {
    term: 'Convoying',
    definition:
      'Throughput collapse caused by many threads lining up behind one heavily contended lock.',
  },
]

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'con-overview', label: 'Overview' },
    { id: 'con-why', label: 'Why It Matters' },
    { id: 'con-history', label: 'Historical Context' },
    { id: 'con-survey', label: 'Section Survey' },
    { id: 'con-themes', label: 'Concurrency Themes' },
    { id: 'con-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'con-signals', label: 'Topic Signals' },
    { id: 'con-foundations', label: 'Foundations' },
    { id: 'con-proofs', label: 'Proof Obligations' },
    { id: 'con-failures', label: 'Failure Modes' },
    { id: 'con-compare', label: 'Compare and Contrast' },
    { id: 'con-checklist', label: 'Study Checklist' },
  ],
  examples: workedExamples.map((example) => ({
    id: example.id,
    label: example.title,
  })),
  glossary: [{ id: 'con-glossary', label: 'Terms' }],
}

function isTabId(value: string | null): value is TabId {
  return (
    value === 'big-picture' ||
    value === 'core-concepts' ||
    value === 'examples' ||
    value === 'glossary'
  )
}

const concurrencyHelpStyles = `
.con98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.con98-window {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: #c0c0c0;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  box-sizing: border-box;
}

.con98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-height: 28px;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.con98-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  line-height: 1;
  white-space: nowrap;
}

.con98-title-controls {
  display: inline-flex;
  gap: 2px;
}

.con98-control {
  width: 18px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  text-decoration: none;
  font-size: 11px;
  line-height: 1;
}

.con98-control:focus-visible,
.con98-tab:focus-visible,
.con98-toc-link:focus-visible {
  outline: 1px dotted #000;
  outline-offset: -3px;
}

.con98-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.con98-tab {
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b7b7b7;
  padding: 5px 10px 4px;
  font-size: 12px;
  line-height: 1.2;
  cursor: pointer;
}

.con98-tab-active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.con98-main {
  display: grid;
  grid-template-columns: 236px minmax(0, 1fr);
  flex: 1;
  min-height: 0;
  border-top: 1px solid #404040;
  background: #ffffff;
}

.con98-toc {
  overflow: auto;
  padding: 12px 12px 18px;
  background: #efefef;
  border-right: 1px solid #808080;
}

.con98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.con98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.con98-toc-item + .con98-toc-item {
  margin-top: 8px;
}

.con98-toc-link {
  color: #000;
  text-decoration: none;
  font-size: 12px;
  line-height: 1.35;
}

.con98-content {
  overflow: auto;
  padding: 16px 22px 24px;
  background: #ffffff;
}

.con98-doc-title {
  margin: 0 0 12px;
  font-size: 22px;
  font-weight: 700;
}

.con98-intro {
  margin: 0 0 16px;
  font-size: 12px;
  line-height: 1.5;
}

.con98-section {
  margin: 0 0 22px;
}

.con98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.con98-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.con98-divider {
  margin: 14px 0 16px;
  border: 0;
  border-top: 1px solid #d4d4d4;
}

.con98-content p,
.con98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.con98-content p {
  margin: 0 0 10px;
}

.con98-content ul {
  margin: 0 0 10px 18px;
  padding: 0;
}

.con98-content li + li {
  margin-top: 4px;
}

.con98-codebox {
  margin: 8px 0 10px;
  padding: 8px 9px;
  background: #f3f3f3;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.con98-codebox code {
  display: block;
  white-space: pre-wrap;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  line-height: 1.4;
}

@media (max-width: 900px) {
  .con98-main {
    grid-template-columns: 1fr;
  }

  .con98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 640px) {
  .con98-title {
    font-size: 13px;
    max-width: calc(100% - 72px);
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .con98-content {
    padding: 14px 14px 18px;
  }
}
`

export default function ConcurrencyAndSynchronizationPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const requestedTab = searchParams.get('tab')
  const activeTab: TabId = isTabId(requestedTab) ? requestedTab : 'big-picture'
  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(location.search)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Concurrency & Synchronization (${activeTabLabel})`
  }, [activeTab, activeTabLabel, location.search, setSearchParams])

  const handleTabChange = (tab: TabId) => {
    if (tab === activeTab) {
      return
    }

    const nextParams = new URLSearchParams(location.search)
    nextParams.set('tab', tab)
    setSearchParams(nextParams)
  }

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Concurrency & Synchronization',
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
    <div className="con98-help-page">
      <style>{concurrencyHelpStyles}</style>
      <div className="con98-window" role="presentation">
        <header className="con98-titlebar">
          <span className="con98-title">Concurrency &amp; Synchronization</span>
          <div className="con98-title-controls">
            <button
              className="con98-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="con98-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div
          className="con98-tabs"
          role="tablist"
          aria-label="Concurrency and Synchronization Sections"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`con98-tab ${activeTab === tab.id ? 'con98-tab-active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="con98-main">
          <aside className="con98-toc" aria-label="Table of contents">
            <h2 className="con98-toc-title">Contents</h2>
            <ul className="con98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id} className="con98-toc-item">
                  <a href={`#${section.id}`} className="con98-toc-link">
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="con98-content">
            <h1 className="con98-doc-title">Concurrency &amp; Synchronization</h1>
            <p className="con98-intro">
              This page is the top-level overview for the concurrency and synchronization material.
              It explains which primitive matches which failure mode, how visibility and ordering
              fit into shared-state reasoning, and why correctness here is always a mix of safety,
              progress, and contention control.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="con-overview" className="con98-section">
                  <h2 className="con98-heading">Overview</h2>
                  {overviewSections.map((section) => (
                    <div key={section.title}>
                      <h3 className="con98-subheading">{section.title}</h3>
                      <p>{section.body}</p>
                    </div>
                  ))}
                </section>

                <hr className="con98-divider" />

                <section id="con-why" className="con98-section">
                  <h2 className="con98-heading">Why It Matters</h2>
                  <ul>
                    {whyItMatters.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <hr className="con98-divider" />

                <section id="con-history" className="con98-section">
                  <h2 className="con98-heading">Historical Context</h2>
                  {historicalContext.map((item) => (
                    <div key={item.title}>
                      <h3 className="con98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <hr className="con98-divider" />

                <section id="con-survey" className="con98-section">
                  <h2 className="con98-heading">Section Survey</h2>
                  {sectionSurvey.map((item) => (
                    <div key={item.name}>
                      <h3 className="con98-subheading">{item.name}</h3>
                      <p>{item.summary}</p>
                    </div>
                  ))}
                </section>

                <hr className="con98-divider" />

                <section id="con-themes" className="con98-section">
                  <h2 className="con98-heading">Concurrency Themes</h2>
                  {concurrencyThemes.map((item) => (
                    <div key={item.title}>
                      <h3 className="con98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <hr className="con98-divider" />

                <section id="con-takeaways" className="con98-section">
                  <h2 className="con98-heading">Key Takeaways</h2>
                  <ul>
                    {keyTakeaways.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                <section id="con-signals" className="con98-section">
                  <h2 className="con98-heading">Topic Signals</h2>
                  {topicSignals.map((item) => (
                    <div key={item.title}>
                      <h3 className="con98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="con-foundations" className="con98-section">
                  <h2 className="con98-heading">Foundations</h2>
                  {coreFoundations.map((item) => (
                    <div key={item.title}>
                      <h3 className="con98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="con-proofs" className="con98-section">
                  <h2 className="con98-heading">Proof Obligations</h2>
                  {proofObligations.map((item) => (
                    <div key={item.title}>
                      <h3 className="con98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="con-failures" className="con98-section">
                  <h2 className="con98-heading">Failure Modes</h2>
                  {commonFailureModes.map((item) => (
                    <div key={item.title}>
                      <h3 className="con98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="con-compare" className="con98-section">
                  <h2 className="con98-heading">Compare and Contrast</h2>
                  {comparisons.map((item) => (
                    <div key={item.title}>
                      <h3 className="con98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="con-checklist" className="con98-section">
                  <h2 className="con98-heading">Study Checklist</h2>
                  <ul>
                    {studyChecklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                {workedExamples.map((example) => (
                  <section key={example.id} id={example.id} className="con98-section">
                    <h2 className="con98-heading">{example.title}</h2>
                    <p>
                      <strong>Domain:</strong> {example.domain}
                    </p>
                    <p>{example.intro}</p>
                    <p>
                      <strong>Why this primitive fits:</strong> {example.whyFit}
                    </p>
                    <div className="con98-codebox">
                      <code>{example.code}</code>
                    </div>
                    <p>
                      <strong>Takeaway:</strong> {example.takeaway}
                    </p>
                  </section>
                ))}
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="con-glossary" className="con98-section">
                <h2 className="con98-heading">Glossary</h2>
                {glossary.map((entry) => (
                  <p key={entry.term}>
                    <strong>{entry.term}:</strong> {entry.definition}
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
