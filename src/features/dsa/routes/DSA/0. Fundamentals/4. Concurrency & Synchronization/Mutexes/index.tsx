import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'What it is',
    details:
      'A mutex (mutual exclusion lock) ensures only one thread at a time can access a critical section.',
    notes:
      'It protects shared state by serializing access to code that reads or writes it.',
  },
  {
    title: 'Why it matters',
    details:
      'Without mutual exclusion, data races corrupt shared state and produce nondeterministic bugs.',
    notes:
      'Mutexes are the foundational primitive used by higher-level concurrency constructs.',
  },
  {
    title: 'What it teaches',
    details:
      'Correctness relies on invariants, careful lock ordering, and keeping critical sections small.',
    notes:
      'Understanding deadlocks and contention starts with understanding mutexes.',
  },
]

const mentalModel = [
  {
    title: 'Critical section',
    detail:
      'A region of code that reads/writes shared state and must be executed by at most one thread.',
  },
  {
    title: 'Lock ownership',
    detail:
      'Only the thread that acquires the mutex should release it (unless the API explicitly allows otherwise).',
  },
  {
    title: 'Mutual exclusion',
    detail:
      'At most one thread holds the lock; all others block or spin.',
  },
  {
    title: 'Happens-before',
    detail:
      'Unlocking a mutex publishes prior writes; locking later makes those writes visible.',
  },
]

const glossary = [
  { term: 'Mutex', definition: 'A lock that guarantees mutual exclusion for a critical section.' },
  { term: 'Critical section', definition: 'Code that must be executed atomically with respect to other threads.' },
  { term: 'Lock/Unlock', definition: 'Operations to acquire and release the mutex.' },
  { term: 'Try-lock', definition: 'A non-blocking attempt to acquire the lock.' },
  { term: 'Recursive mutex', definition: 'A mutex that allows re-entrant locking by the same thread.' },
  { term: 'Deadlock', definition: 'Threads wait forever for locks held by each other.' },
  { term: 'Starvation', definition: 'A thread repeatedly loses the race to acquire a lock.' },
  { term: 'Priority inversion', definition: 'A low-priority thread holds a lock needed by a high-priority thread.' },
  { term: 'Convoying', definition: 'Multiple threads pile up behind a lock, reducing throughput.' },
]

const coreRules = [
  {
    title: 'Lock around every shared access',
    detail:
      'Any read or write that participates in a shared invariant must hold the mutex.',
  },
  {
    title: 'Keep critical sections small',
    detail:
      'Do the minimal work under the lock, then release it.',
  },
  {
    title: 'Use consistent lock ordering',
    detail:
      'Acquire multiple locks in a global order to avoid deadlock.',
  },
  {
    title: 'Avoid calling out',
    detail:
      'Do not call unknown code while holding a mutex; it can re-enter or block.',
  },
  {
    title: 'Prefer RAII / scoped guards',
    detail:
      'Use language constructs that guarantee the lock is released even on early returns or errors.',
  },
  {
    title: 'Pick the right mutex',
    detail:
      'Use simple mutexes by default; recursive mutexes only when re-entrance is unavoidable.',
  },
]

const mutexTypes = [
  {
    title: 'Normal (non-recursive)',
    detail:
      'The simplest and fastest option. Relocking by the same thread deadlocks.',
  },
  {
    title: 'Recursive',
    detail:
      'Allows a thread to lock the same mutex multiple times, with a recursion count.',
  },
  {
    title: 'Timed',
    detail:
      'Supports lock attempts with a timeout to avoid indefinite blocking.',
  },
  {
    title: 'Read-write lock',
    detail:
      'Allows multiple readers or one writer; higher-level than a basic mutex.',
  },
]

const deadlockPrevention = [
  {
    title: 'Lock ordering',
    detail:
      'Acquire multiple locks in a global, consistent order across the codebase.',
  },
  {
    title: 'Lock leveling',
    detail:
      'Assign levels to locks and only acquire higher-level locks while holding lower-level ones.',
  },
  {
    title: 'Try-lock with backoff',
    detail:
      'Use try-lock to avoid deadlock and retry after releasing other locks.',
  },
  {
    title: 'Timeouts',
    detail:
      'Timed locks detect stalls and allow recovery paths.',
  },
  {
    title: 'Avoid nested locks',
    detail:
      'When possible, redesign to minimize locking multiple resources at once.',
  },
]

const lockGranularity = [
  {
    title: 'Coarse-grained',
    detail:
      'One mutex protects a large structure. Simpler but can limit concurrency.',
  },
  {
    title: 'Fine-grained',
    detail:
      'Multiple mutexes protect sub-structures. Higher concurrency but harder to reason about.',
  },
  {
    title: 'Sharded',
    detail:
      'Partition state by hash or key to reduce contention hot spots.',
  },
  {
    title: 'Striped',
    detail:
      'Use a fixed set of locks mapped to data shards for scalable access.',
  },
]

const debuggingChecklist = [
  {
    title: 'Are all shared accesses locked?',
    detail:
      'If any path reads or writes without the lock, invariants can break.',
  },
  {
    title: 'Is lock ordering consistent?',
    detail:
      'Check for lock acquisition cycles across threads.',
  },
  {
    title: 'Are locks released on all paths?',
    detail:
      'Use scoped guards to prevent leaks on errors or early returns.',
  },
  {
    title: 'Is a lock held during I/O?',
    detail:
      'I/O can block indefinitely and amplify contention.',
  },
  {
    title: 'Are critical sections minimal?',
    detail:
      'Large critical sections can look like deadlocks under load.',
  },
  {
    title: 'Is lock contention measured?',
    detail:
      'Use profiling tools to identify hot locks and bottlenecks.',
  },
]

const usagePatterns = [
  {
    title: 'Guarded object',
    detail:
      'All operations on an object are wrapped in a single mutex to preserve invariants.',
  },
  {
    title: 'Split read/write paths',
    detail:
      'Use a separate lock for read-mostly data to reduce contention.',
  },
  {
    title: 'Two-phase work',
    detail:
      'Copy shared state under lock, then compute outside the lock.',
  },
  {
    title: 'Lock striping',
    detail:
      'Map keys to one of many locks for scalable concurrent access.',
  },
]

const faq = [
  {
    question: 'Why lock reads? I only write in one place.',
    answer:
      'Reads participate in invariants and need the same happens-before guarantees as writes.',
  },
  {
    question: 'Can I unlock in a different thread?',
    answer:
      'Most mutexes require the owner to unlock. Violating this can crash or corrupt state.',
  },
  {
    question: 'Is a recursive mutex safe?',
    answer:
      'It can hide design problems and cause unexpected lock hold times. Use only when required.',
  },
  {
    question: 'Is a mutex always slower than atomics?',
    answer:
      'Mutexes are slower for tiny operations but simpler and safer for complex invariants.',
  },
  {
    question: 'Why not use one global lock?',
    answer:
      'It may be correct but can destroy scalability. Use smaller locks when contention is high.',
  },
]

const compareTools = [
  {
    title: 'Mutex vs spinlock',
    detail:
      'Mutexes sleep when contended; spinlocks busy-wait and are only good for very short waits.',
  },
  {
    title: 'Mutex vs semaphore',
    detail:
      'Mutexes guard ownership; semaphores manage counts of available resources.',
  },
  {
    title: 'Mutex vs atomic',
    detail:
      'Atomics handle simple operations without blocking; mutexes handle complex invariants.',
  },
  {
    title: 'Mutex vs monitor',
    detail:
      'A monitor wraps a mutex plus condition variables into a disciplined module.',
  },
]

const correctnessChecklist = [
  {
    title: 'Safety',
    detail:
      'Shared invariants are protected by the mutex and never accessed without it.',
  },
  {
    title: 'Liveness',
    detail:
      'Threads can eventually acquire the lock and make progress.',
  },
  {
    title: 'Deadlock freedom',
    detail:
      'No cycles in the lock acquisition graph.',
  },
  {
    title: 'Fairness',
    detail:
      'If starvation is a risk, use fair mutexes or explicit queues.',
  },
  {
    title: 'Exception safety',
    detail:
      'Locks are released even if errors occur inside the critical section.',
  },
  {
    title: 'Contention hotspots',
    detail:
      'Identify hot locks and consider finer-grained locking or sharding.',
  },
]

const implementationNotes = [
  {
    title: 'Kernel vs user space',
    detail:
      'Fast paths often use user-space atomics; slow paths block in the kernel.',
  },
  {
    title: 'Ownership tracking',
    detail:
      'Some mutexes track owner thread IDs to detect misuse.',
  },
  {
    title: 'Priority inversion handling',
    detail:
      'Some systems support priority inheritance to reduce inversion.',
  },
  {
    title: 'Memory fences',
    detail:
      'Lock/unlock act as acquire/release fences for shared memory.',
  },
]

const performanceTips = [
  {
    title: 'Reduce lock scope',
    detail:
      'Move non-essential work outside the lock.',
  },
  {
    title: 'Shard shared state',
    detail:
      'Split a single lock into many to reduce contention.',
  },
  {
    title: 'Avoid lock convoys',
    detail:
      'Keep critical sections short to prevent queues from forming.',
  },
  {
    title: 'Batch updates',
    detail:
      'Amortize lock overhead by applying multiple changes in one critical section.',
  },
  {
    title: 'Prefer lock-free reads when safe',
    detail:
      'Use read-mostly patterns or atomics when invariants allow it.',
  },
]

const commonPitfalls = [
  {
    mistake: 'Forgetting to lock on reads',
    description:
      'Reads participate in invariants; skipping locks still causes data races.',
  },
  {
    mistake: 'Double locking',
    description:
      'Re-locking a non-recursive mutex by the same thread deadlocks.',
  },
  {
    mistake: 'Inconsistent lock order',
    description:
      'Acquiring locks in different orders across code paths can deadlock.',
  },
  {
    mistake: 'Calling external code',
    description:
      'Unknown callbacks can re-enter and cause deadlocks or long stalls.',
  },
  {
    mistake: 'Holding a lock during I/O',
    description:
      'Blocking I/O while holding the lock increases contention and latency.',
  },
  {
    mistake: 'Using one lock for everything',
    description:
      'Over-serialization destroys parallelism; use finer-grained locking.',
  },
]

const pseudocode = [
  {
    title: 'Minimal critical section',
    code: `lock(mutex)\n// read + update shared state\ncounter++\nunlock(mutex)`,
    explanation:
      'Locks protect invariants over shared variables.',
  },
  {
    title: 'Try-lock fast path',
    code: `if (mutex.tryLock()):\n  // do quick work\n  mutex.unlock()\nelse:\n  // skip or queue work`,
    explanation:
      'Try-lock avoids blocking but must handle failure paths correctly.',
  },
  {
    title: 'Two-lock ordering',
    code: `lock(A)\nlock(B)\n// work using A and B\nunlock(B)\nunlock(A)`,
    explanation:
      'Always lock in a consistent global order.',
  },
]

const workedExamples = [
  {
    title: 'Bank account transfer',
    code: `lock(accountA)\nlock(accountB)\naccountA.balance -= 50\naccountB.balance += 50\nunlock(accountB)\nunlock(accountA)`,
    explanation:
      'Multiple locks require consistent ordering to avoid deadlock.',
  },
  {
    title: 'Simple counter',
    code: `lock(counterMutex)\ncount = count + 1\nunlock(counterMutex)`,
    explanation:
      'Even a single increment needs protection when multiple threads update it.',
  },
  {
    title: 'Guarded cache access',
    code: `lock(cacheMutex)\nvalue = cache[key]\nunlock(cacheMutex)`,
    explanation:
      'Protect both reads and writes to maintain cache consistency.',
  },
]

const timelineScenarios = [
  {
    id: 'contended',
    title: 'Contended acquisition',
    steps: [
      'Thread A locks the mutex and enters the critical section.',
      'Thread B attempts to lock and blocks.',
      'Thread A exits and unlocks.',
      'Thread B acquires the lock and proceeds.',
    ],
    summary:
      'Mutual exclusion ensures only one thread executes the critical section at a time.',
  },
  {
    id: 'deadlock',
    title: 'Deadlock scenario',
    steps: [
      'Thread A locks mutex L1, then waits for L2.',
      'Thread B locks mutex L2, then waits for L1.',
      'Neither can proceed; both are stuck forever.',
    ],
    summary:
      'Avoid by locking in a consistent order or using a higher-level protocol.',
  },
  {
    id: 'priority-inversion',
    title: 'Priority inversion',
    steps: [
      'Low-priority thread holds a lock needed by a high-priority thread.',
      'Medium-priority thread runs and prevents low-priority thread from releasing.',
      'High-priority thread waits longer than expected.',
    ],
    summary:
      'Priority inheritance mitigates this in some systems.',
  },
]

const keyTakeaways = [
  'Mutexes provide mutual exclusion for critical sections.',
  'Locking must protect every access to shared invariants.',
  'Keep critical sections short and consistent in lock ordering.',
  'Use condition variables for waiting on predicates, not mutexes.',
  'Incorrect locking leads to deadlocks, starvation, and data races.',
]

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

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
    { id: 'bp-why', label: 'Why It Matters' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-mental-model', label: 'Mental Model' },
    { id: 'core-rules', label: 'Core Rules' },
    { id: 'core-types', label: 'Types of Mutexes' },
    { id: 'core-deadlock', label: 'Deadlock Prevention' },
    { id: 'core-granularity', label: 'Lock Granularity' },
    { id: 'core-usage', label: 'Usage Patterns' },
    { id: 'core-correctness', label: 'Correctness Checklist' },
    { id: 'core-implementation', label: 'Implementation Notes' },
    { id: 'core-performance', label: 'Performance Tips' },
    { id: 'core-debugging', label: 'Debugging Checklist' },
    { id: 'core-compare', label: 'Compare and Contrast' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-faq', label: 'FAQ' },
  ],
  examples: [
    { id: 'ex-pseudocode', label: 'Pseudocode Reference' },
    { id: 'ex-worked', label: 'Worked Examples' },
    { id: 'ex-timeline', label: 'Interactive Timeline' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Glossary Terms' }],
}

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

.win98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
}

.win98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
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

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

export default function MutexesPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedScenarioId, setSelectedScenarioId] = useState(timelineScenarios[0]?.id ?? 'contended')
  const [stepIndex, setStepIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    const tab = searchParams.get('tab')
    return isTabId(tab) ? tab : 'big-picture'
  })

  const selectedScenario = timelineScenarios.find((scenario) => scenario.id === selectedScenarioId) ?? timelineScenarios[0]
  const stepText = selectedScenario?.steps[stepIndex] ?? 'No steps available.'
  const canStepForward = selectedScenario ? stepIndex < selectedScenario.steps.length - 1 : false
  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Mutexes (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Mutexes',
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
          <span className="win98-title-text">Mutexes</span>
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
            <h1 className="win98-doc-title">Mutexes</h1>
            <p>
              Mutexes protect shared state by allowing only one thread at a time to execute critical sections. They provide the
              simplest and most common way to avoid data races, and they establish the memory ordering that makes shared writes
              visible to other threads. This document covers correct usage, pitfalls, and the patterns built on top of mutexes.
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
                  <h2 className="win98-heading">Why It Matters</h2>
                  <p>
                    Mutual exclusion is the simplest way to keep invariants consistent under concurrency. Without a lock, even
                    simple reads can observe partial or inconsistent updates.
                  </p>
                  <p>
                    Correct locking protocols also establish the happens-before relationships that make writes visible to other
                    threads.
                  </p>
                </section>
                <hr className="win98-divider" />
                <section id="bp-takeaways" className="win98-section">
                  <h2 className="win98-heading">Key Takeaways</h2>
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
                <section id="core-mental-model" className="win98-section">
                  <h2 className="win98-heading">Mental Model</h2>
                  {mentalModel.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-rules" className="win98-section">
                  <h2 className="win98-heading">Core Rules</h2>
                  {coreRules.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p><strong>Reminder:</strong> Mutexes guarantee mutual exclusion, not progress. Avoid deadlocks and starvation.</p>
                </section>
                <section id="core-types" className="win98-section">
                  <h2 className="win98-heading">Types of Mutexes</h2>
                  {mutexTypes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-deadlock" className="win98-section">
                  <h2 className="win98-heading">Deadlock Prevention</h2>
                  {deadlockPrevention.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-granularity" className="win98-section">
                  <h2 className="win98-heading">Lock Granularity</h2>
                  {lockGranularity.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-usage" className="win98-section">
                  <h2 className="win98-heading">Usage Patterns</h2>
                  {usagePatterns.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-correctness" className="win98-section">
                  <h2 className="win98-heading">Correctness Checklist</h2>
                  {correctnessChecklist.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-implementation" className="win98-section">
                  <h2 className="win98-heading">Implementation Notes</h2>
                  {implementationNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-performance" className="win98-section">
                  <h2 className="win98-heading">Performance Tips</h2>
                  {performanceTips.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-debugging" className="win98-section">
                  <h2 className="win98-heading">Debugging Checklist</h2>
                  {debuggingChecklist.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-compare" className="win98-section">
                  <h2 className="win98-heading">Compare and Contrast</h2>
                  {compareTools.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="win98-section">
                  <h2 className="win98-heading">Common Pitfalls</h2>
                  <ul>
                    {commonPitfalls.map((pitfall) => (
                      <li key={pitfall.mistake}>
                        <strong>{pitfall.mistake}:</strong> {pitfall.description}
                      </li>
                    ))}
                  </ul>
                </section>
                <section id="core-faq" className="win98-section">
                  <h2 className="win98-heading">FAQ</h2>
                  {faq.map((item) => (
                    <p key={item.question}>
                      <strong>{item.question}</strong> {item.answer}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                <section id="ex-pseudocode" className="win98-section">
                  <h2 className="win98-heading">Pseudocode Reference</h2>
                  {pseudocode.map((item) => (
                    <div key={item.title}>
                      <h3 className="win98-subheading">{item.title}</h3>
                      <div className="win98-codebox">
                        <code>{item.code.trim()}</code>
                      </div>
                      <p>{item.explanation}</p>
                    </div>
                  ))}
                </section>
                <section id="ex-worked" className="win98-section">
                  <h2 className="win98-heading">Worked Examples</h2>
                  {workedExamples.map((item) => (
                    <div key={item.title}>
                      <h3 className="win98-subheading">{item.title}</h3>
                      <div className="win98-codebox">
                        <code>{item.code.trim()}</code>
                      </div>
                      <p>{item.explanation}</p>
                    </div>
                  ))}
                </section>
                <section id="ex-timeline" className="win98-section">
                  <h2 className="win98-heading">Interactive Timeline</h2>
                  <p>
                    Select a scenario and step through how locks behave. This highlights contention, deadlock, and scheduling effects.
                  </p>
                  <div className="win98-inline-buttons">
                    {timelineScenarios.map((scenario) => (
                      <button
                        key={scenario.id}
                        type="button"
                        className="win98-push"
                        onClick={() => {
                          setSelectedScenarioId(scenario.id)
                          setStepIndex(0)
                        }}
                      >
                        {scenario.title}
                      </button>
                    ))}
                  </div>
                  <p><strong>Selected:</strong> {selectedScenario?.title ?? 'None'}</p>
                  <p>{stepText}</p>
                  <p><strong>Summary:</strong> {selectedScenario?.summary ?? ''}</p>
                  <div className="win98-inline-buttons">
                    <button type="button" className="win98-push" onClick={() => setStepIndex(0)}>
                      RESET
                    </button>
                    <button type="button" className="win98-push" onClick={() => setStepIndex((prev) => Math.max(0, prev - 1))}>
                      BACK
                    </button>
                    <button
                      type="button"
                      className="win98-push"
                      onClick={() => {
                        if (canStepForward) {
                          setStepIndex((prev) => prev + 1)
                        }
                      }}
                    >
                      STEP
                    </button>
                  </div>
                </section>
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="win98-section">
                <h2 className="win98-heading">Glossary</h2>
                {glossary.map((item) => (
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
