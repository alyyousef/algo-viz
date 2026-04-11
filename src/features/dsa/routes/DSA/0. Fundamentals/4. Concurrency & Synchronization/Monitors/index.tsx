import { useState } from 'react'

import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'What it is',
    details:
      'A monitor is a synchronization construct that bundles shared state, a mutex, and one or more condition variables.',
    notes:
      'Only one thread can execute inside a monitor at a time, enforcing mutual exclusion by design.',
  },
  {
    title: 'Why it matters',
    details:
      'Monitors make concurrency safer by centralizing state and enforcing disciplined access patterns.',
    notes: 'They reduce the chance of data races by eliminating unprotected shared variables.',
  },
  {
    title: 'What it teaches',
    details:
      'Correctness depends on invariants, encapsulation, and precise use of wait/signal semantics.',
    notes: 'A monitor is an architectural pattern as much as a synchronization tool.',
  },
]

const anatomy = [
  {
    title: 'Shared state',
    detail: 'The data protected by the monitor (queues, counters, flags, etc.).',
  },
  {
    title: 'Implicit mutex',
    detail: 'Entering a monitor acquires the lock; leaving releases it.',
  },
  {
    title: 'Condition variables',
    detail: 'Wait queues tied to specific predicates about the shared state.',
  },
  {
    title: 'Public methods',
    detail: 'The only safe way to access the state; each method is executed with mutual exclusion.',
  },
]

const glossary = [
  {
    term: 'Monitor',
    definition: 'A module that combines state, a mutex, and condition variables.',
  },
  {
    term: 'Monitor invariant',
    definition:
      'A property that must hold whenever the monitor is not actively executing a method.',
  },
  { term: 'Entry queue', definition: 'Threads waiting to enter the monitor when it is busy.' },
  {
    term: 'Condition queue',
    definition: 'Threads waiting on a condition variable for a predicate to become true.',
  },
  {
    term: 'wait()',
    definition: 'Atomically releases the monitor lock and sleeps on a condition queue.',
  },
  { term: 'signal()', definition: 'Wakes one thread waiting on a condition queue.' },
  { term: 'broadcast()', definition: 'Wakes all threads waiting on a condition queue.' },
  {
    term: 'Mesa semantics',
    definition: 'Signaler keeps the lock; waiters re-check the predicate.',
  },
  {
    term: 'Hoare semantics',
    definition: 'Signaler yields the lock immediately to a woken waiter.',
  },
]

const coreRules = [
  {
    title: 'Encapsulate all shared state',
    detail: 'No one should read or write the state except through monitor methods.',
  },
  {
    title: 'Guard predicates with condition variables',
    detail: 'Each wait reason should map to a specific predicate and condition variable.',
  },
  {
    title: 'Wait in a loop',
    detail: 'Always check the predicate in a while-loop before and after wait.',
  },
  {
    title: 'Maintain monitor invariants',
    detail: 'Every method must restore the invariant before returning.',
  },
  {
    title: 'Signal after state changes',
    detail: 'Only signal when you have just changed the state so the predicate could now be true.',
  },
  {
    title: 'Keep methods short',
    detail: 'Long critical sections reduce concurrency and can cause lock convoying.',
  },
]

const semanticsComparison = [
  {
    title: 'Mesa (most common)',
    detail:
      'The signaller keeps the lock and continues; the waiter wakes later and re-checks the predicate.',
  },
  {
    title: 'Hoare (theoretical)',
    detail:
      'The signaller yields the lock immediately; the waiter runs with the predicate guaranteed true.',
  },
  {
    title: 'Practical guidance',
    detail:
      'Code that is correct under Mesa semantics is correct everywhere; use while-loops consistently.',
  },
]

const monitorPatterns = [
  {
    title: 'Bounded buffer monitor',
    detail:
      'A queue with notFull and notEmpty condition variables to coordinate producers and consumers.',
  },
  {
    title: 'Barrier monitor',
    detail: 'Threads wait until a counter reaches N, then a broadcast releases them.',
  },
  {
    title: 'Readers-writers monitor',
    detail:
      'Readers and writers coordinate with conditions based on activeReader/activeWriter counters.',
  },
  {
    title: 'One-time latch',
    detail: 'Threads block until a ready flag flips; a broadcast wakes all waiters.',
  },
  {
    title: 'Thread pool work queue',
    detail: 'Workers wait on notEmpty; submitters signal when they add work.',
  },
  {
    title: 'Rate limiter',
    detail: 'Threads wait until tokens are replenished, using a condition variable to sleep.',
  },
]

const monitorInvariants = [
  {
    title: 'Invariant definition',
    detail: 'A statement that is true whenever no thread is executing inside the monitor.',
  },
  {
    title: 'Entry obligation',
    detail: 'Every method must assume the invariant holds at entry.',
  },
  {
    title: 'Exit obligation',
    detail: 'Every method must restore the invariant before it returns.',
  },
  {
    title: 'Wait obligation',
    detail: 'wait() releases the lock; the invariant must hold before waiting.',
  },
  {
    title: 'Signal obligation',
    detail: 'signal() should only happen after making a predicate possibly true.',
  },
]
const entryExitLifecycle = [
  {
    title: 'Enter',
    detail: 'Acquire the monitor lock before accessing any state.',
  },
  {
    title: 'Check predicates',
    detail: 'If the needed condition is false, wait in a loop.',
  },
  {
    title: 'Update state',
    detail: 'Mutate shared state while holding the lock.',
  },
  {
    title: 'Signal or broadcast',
    detail: 'Notify waiters if their predicates might now be true.',
  },
  {
    title: 'Exit',
    detail: 'Restore invariants and release the lock.',
  },
]

const signalStrategy = [
  {
    title: 'Signal one waiter when one can proceed',
    detail: 'If a single state change enables only one thread, signal is enough.',
  },
  {
    title: 'Broadcast for global changes',
    detail: 'When a predicate affects many waiters (like a latch), broadcast is clearer.',
  },
  {
    title: 'Avoid thundering herd',
    detail: 'Broadcast wakes many threads that may immediately sleep again.',
  },
  {
    title: 'Separate condition variables',
    detail: 'Use multiple condition variables when multiple predicates exist.',
  },
]

const languageMapping = [
  { language: 'Java', mapping: 'synchronized + wait/notify/notifyAll' },
  { language: 'C#', mapping: 'lock + Monitor.Wait/Pulse/PulseAll' },
  { language: 'C++', mapping: 'std::mutex + std::condition_variable (manual monitor pattern)' },
  { language: 'Python', mapping: 'threading.Condition + Lock' },
  { language: 'Go', mapping: 'sync.Cond (monitor-like pattern)' },
]

const debuggingChecklist = [
  {
    title: 'Is state encapsulated?',
    detail: 'If callers can access shared state directly, the monitor invariant is broken.',
  },
  {
    title: 'Are waits in loops?',
    detail: 'Mesa semantics require while-loops around wait to handle spurious wakeups.',
  },
  {
    title: 'Are predicates precise?',
    detail: 'Loose predicates cause unnecessary wakeups or incorrect progress.',
  },
  {
    title: 'Is shutdown defined?',
    detail: 'Add a termination predicate and broadcast so waiters can exit.',
  },
  {
    title: 'Are signals after state updates?',
    detail: 'Signals before updates can wake threads too early.',
  },
  {
    title: 'Are methods short?',
    detail: 'Long monitor holds can look like deadlocks under load.',
  },
]

const faq = [
  {
    question: 'Is a monitor just a mutex?',
    answer:
      'No. A monitor is a structured module: mutex + state + condition variables + invariants.',
  },
  {
    question: 'Do monitors guarantee fairness?',
    answer: 'Not by default. Fairness requires explicit queueing or scheduling policies.',
  },
  {
    question: 'Can I signal outside the monitor?',
    answer:
      'Technically possible in some APIs, but correct usage typically signals while holding the lock.',
  },
  {
    question: 'Are condition variables required?',
    answer: 'They are the standard way to block inside a monitor when a predicate is false.',
  },
  {
    question: 'Can I reuse one condition variable for everything?',
    answer:
      'You can, but multiple predicates on one condition variable cause spurious wakeups and confusion.',
  },
]

const compareTools = [
  {
    title: 'Monitor vs mutex + condition variable',
    detail:
      'A monitor is a disciplined pattern that packages the mutex and conditions into a single object.',
  },
  {
    title: 'Monitor vs semaphore',
    detail: 'Semaphores are lower-level and easy to misuse; monitors enforce structured access.',
  },
  {
    title: 'Monitor vs actor',
    detail:
      'Actors avoid shared state entirely; monitors coordinate shared state with locks and conditions.',
  },
  {
    title: 'Monitor vs channel',
    detail:
      'Channels embed queueing and signaling, while monitors provide a general-purpose structure.',
  },
]

const correctnessChecklist = [
  {
    title: 'Safety',
    detail: 'Invariant holds at the start and end of every method.',
  },
  {
    title: 'Liveness',
    detail: 'Waiters are eventually signaled when the predicate becomes true.',
  },
  {
    title: 'No external access',
    detail: 'State is private; callers cannot circumvent the monitor.',
  },
  {
    title: 'No lost wakeups',
    detail: 'Predicate checks and waits happen while holding the lock.',
  },
  {
    title: 'Fairness',
    detail: 'If starvation is possible, add explicit policies (FIFO queues, priorities).',
  },
  {
    title: 'Shutdown path',
    detail: 'Define a clean termination predicate and wake all waiters when shutting down.',
  },
]

const implementationNotes = [
  {
    title: 'Language support',
    detail:
      'Some languages have built-in monitors (Java synchronized + wait/notify) while others require manual assembly.',
  },
  {
    title: 'Atomic unlock + sleep',
    detail: 'wait() must release the lock and park atomically to avoid missed signals.',
  },
  {
    title: 'Spurious wakeups',
    detail:
      'Many runtimes allow spurious wakeups; correct monitor code tolerates them with while-loops.',
  },
  {
    title: 'Visibility guarantees',
    detail:
      'The mutex provides a happens-before relationship for all state read/write inside the monitor.',
  },
]

const performanceTips = [
  {
    title: 'Split condition variables',
    detail: 'Separate predicates to avoid waking threads that cannot proceed.',
  },
  {
    title: 'Avoid broadcast storms',
    detail: 'Prefer signal when only one thread can make progress.',
  },
  {
    title: 'Minimize time in monitor',
    detail: 'Move expensive work outside the monitor after copying needed state.',
  },
  {
    title: 'Batch updates',
    detail: 'Group multiple state changes and signal once if it is safe.',
  },
  {
    title: 'Use timeouts carefully',
    detail: 'Timed waits must still re-check predicates and handle spurious wakeups.',
  },
]

const commonPitfalls = [
  {
    mistake: 'Exposing shared state',
    description: 'Public access breaks the monitor invariant and makes races likely.',
  },
  {
    mistake: 'Using if instead of while',
    description:
      'Spurious wakeups or contention can violate correctness if the predicate is not re-checked.',
  },
  {
    mistake: 'Signaling before updating state',
    description: 'The waiting thread can run and see a false predicate.',
  },
  {
    mistake: 'Single condition for multiple predicates',
    description: 'This causes unnecessary wakeups and can hide starvation issues.',
  },
  {
    mistake: 'Long work inside the monitor',
    description: 'This blocks all other threads and reduces concurrency.',
  },
  {
    mistake: 'No shutdown protocol',
    description: 'Waiters can block forever if the system stops without broadcasting.',
  },
]
const pseudocode = [
  {
    title: 'Monitor structure',
    code: `monitor BoundedBuffer:
  state: queue, count
  condition notFull, notEmpty

  method put(x):
    while (count == capacity):
      wait(notFull)
    enqueue(x); count++
    signal(notEmpty)

  method take():
    while (count == 0):
      wait(notEmpty)
    x = dequeue(); count--
    signal(notFull)
    return x`,
    explanation:
      'The monitor encapsulates state and uses two condition variables for precise signaling.',
  },
  {
    title: 'Monitor invariant example',
    code: `invariant: 0 <= count <= capacity
all methods must preserve invariant`,
    explanation: 'The invariant must hold whenever the monitor is not actively executing a method.',
  },
  {
    title: 'Mesa-style wait pattern',
    code: `method doWork():
  while (!predicate):
    wait(cv)
  // predicate true, proceed`,
    explanation: 'Mesa semantics requires re-checking the predicate after every wakeup.',
  },
]

const workedExamples = [
  {
    title: 'One-time latch',
    code: `monitor Latch:
  state ready = false
  condition readyCv

  method await():
    while (!ready):
      wait(readyCv)

  method signal():
    ready = true
    broadcast(readyCv)`,
    explanation: 'All threads waiting in await() are released once ready becomes true.',
  },
  {
    title: 'Readers-writers sketch',
    code: `monitor RW:
  state readers = 0, writer = false
  condition canRead, canWrite

  method beginRead():
    while (writer):
      wait(canRead)
    readers++

  method endRead():
    readers--
    if (readers == 0):
      signal(canWrite)`,
    explanation:
      'The policy (writer preference, reader preference, or fair) lives in the predicates.',
  },
  {
    title: 'Barrier monitor',
    code: `monitor Barrier:
  state arrived = 0, phase = 0
  condition cv

  method wait():
    local = phase
    arrived++
    if (arrived == N):
      arrived = 0; phase++
      broadcast(cv)
    else:
      while (phase == local):
        wait(cv)`,
    explanation: 'The phase counter avoids releasing late arrivals on an earlier broadcast.',
  },
]

const timelineScenarios = [
  {
    id: 'entry-exit',
    title: 'Single entry and exit',
    steps: [
      'Thread A calls a monitor method and acquires the monitor lock.',
      'Thread B calls a monitor method and waits in the entry queue.',
      'Thread A finishes and releases the lock.',
      'Thread B acquires the lock and enters the monitor.',
    ],
    summary: 'Only one thread executes in the monitor at a time.',
  },
  {
    id: 'wait-signal',
    title: 'Wait and signal',
    steps: [
      'Thread A enters, predicate is false, so it waits on cv.',
      'wait() releases the monitor lock and Thread A sleeps.',
      'Thread B enters, changes state, and signals cv.',
      'Thread B exits; Thread A re-enters and re-checks predicate.',
    ],
    summary: 'The waiting thread always re-checks the predicate after it reacquires the lock.',
  },
  {
    id: 'lost-wakeup',
    title: 'Broken monitor (lost wakeup)',
    steps: [
      'Thread A checks predicate without holding the lock.',
      'Thread B updates state and signals (no waiter yet).',
      'Thread A starts waiting; the signal was lost.',
      'Thread A sleeps forever even though predicate is true.',
    ],
    summary:
      'Correct monitors prevent this by requiring the predicate check and wait to happen while holding the lock.',
  },
]

const keyTakeaways = [
  'A monitor is a structured combination of state, a mutex, and condition variables.',
  'Encapsulation is the main safety guarantee: all shared state stays inside the monitor.',
  'Wait in a loop and signal after state changes.',
  'Monitor invariants define correctness across every method.',
  'Most classic concurrency problems are cleanly expressed as monitors.',
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
    { id: 'bp-anatomy', label: 'Anatomy of a Monitor' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-rules', label: 'Core Rules of Use' },
    { id: 'core-semantics', label: 'Mesa vs Hoare Semantics' },
    { id: 'core-invariants', label: 'Monitor Invariants' },
    { id: 'core-lifecycle', label: 'Entry/Exit Lifecycle' },
    { id: 'core-signal', label: 'Signal Strategy' },
    { id: 'core-patterns', label: 'Monitor Patterns' },
    { id: 'core-compare', label: 'Compare and Contrast' },
    { id: 'core-language', label: 'Language Mapping' },
    { id: 'core-checklist', label: 'Correctness Checklist' },
    { id: 'core-implementation', label: 'Implementation Notes' },
    { id: 'core-performance', label: 'Performance Tips' },
    { id: 'core-debugging', label: 'Debugging Checklist' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-faq', label: 'FAQ' },
  ],
  examples: [
    { id: 'ex-pseudocode', label: 'Pseudocode Reference' },
    { id: 'ex-worked', label: 'Worked Examples' },
    { id: 'ex-timeline', label: 'Interactive Timeline' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function MonitorsPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Monitors',
    defaultTab: 'big-picture',
  })

  const [selectedScenarioId, setSelectedScenarioId] = useState(
    timelineScenarios[0]?.id ?? 'entry-exit',
  )
  const [stepIndex, setStepIndex] = useState(0)

  const selectedScenario =
    timelineScenarios.find((scenario) => scenario.id === selectedScenarioId) ?? timelineScenarios[0]
  const stepText = selectedScenario?.steps[stepIndex] ?? 'No steps available.'
  const canStepForward = selectedScenario ? stepIndex < selectedScenario.steps.length - 1 : false

  return (
    <TopicPageShell
      title="Monitors"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Monitors</h1>
      <p>
        A monitor wraps shared state, a mutex, and condition variables into a single module. You
        enter through methods, change state under mutual exclusion, and wait or signal using
        condition variables tied to predicates. This page explains the core model, correctness
        rules, common patterns, and the subtle bugs monitors are designed to prevent.
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
          <section id="bp-anatomy" className="bin98-section">
            <h2 className="bin98-heading">Anatomy of a Monitor</h2>
            {anatomy.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key Takeaways</h2>
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
          <section id="core-rules" className="bin98-section">
            <h2 className="bin98-heading">Core Rules of Use</h2>
            {coreRules.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
            <p>
              <strong>Rule of thumb:</strong> Callers can only use public methods, and those methods
              must preserve invariants.
            </p>
          </section>
          <section id="core-semantics" className="bin98-section">
            <h2 className="bin98-heading">Mesa vs Hoare Semantics</h2>
            {semanticsComparison.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-invariants" className="bin98-section">
            <h2 className="bin98-heading">Monitor Invariants</h2>
            {monitorInvariants.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-lifecycle" className="bin98-section">
            <h2 className="bin98-heading">Entry/Exit Lifecycle</h2>
            {entryExitLifecycle.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-signal" className="bin98-section">
            <h2 className="bin98-heading">Signal Strategy</h2>
            {signalStrategy.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-patterns" className="bin98-section">
            <h2 className="bin98-heading">Monitor Patterns</h2>
            {monitorPatterns.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-compare" className="bin98-section">
            <h2 className="bin98-heading">Compare and Contrast</h2>
            {compareTools.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-language" className="bin98-section">
            <h2 className="bin98-heading">Language Mapping</h2>
            <table className="bin98-table">
              <thead>
                <tr>
                  <th>Language</th>
                  <th>Monitor-like API</th>
                </tr>
              </thead>
              <tbody>
                {languageMapping.map((row) => (
                  <tr key={row.language}>
                    <td>{row.language}</td>
                    <td>{row.mapping}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          <section id="core-checklist" className="bin98-section">
            <h2 className="bin98-heading">Correctness Checklist</h2>
            {correctnessChecklist.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-implementation" className="bin98-section">
            <h2 className="bin98-heading">Implementation Notes</h2>
            {implementationNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-performance" className="bin98-section">
            <h2 className="bin98-heading">Performance Tips</h2>
            {performanceTips.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-debugging" className="bin98-section">
            <h2 className="bin98-heading">Debugging Checklist</h2>
            {debuggingChecklist.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-pitfalls" className="bin98-section">
            <h2 className="bin98-heading">Common Pitfalls</h2>
            <ul>
              {commonPitfalls.map((pitfall) => (
                <li key={pitfall.mistake}>
                  <strong>{pitfall.mistake}:</strong> {pitfall.description}
                </li>
              ))}
            </ul>
          </section>
          <section id="core-faq" className="bin98-section">
            <h2 className="bin98-heading">FAQ</h2>
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
          <section id="ex-pseudocode" className="bin98-section">
            <h2 className="bin98-heading">Pseudocode Reference</h2>
            {pseudocode.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <div className="bin98-codebox">
                  <code>{item.code.trim()}</code>
                </div>
                <p>{item.explanation}</p>
              </div>
            ))}
          </section>
          <section id="ex-worked" className="bin98-section">
            <h2 className="bin98-heading">Worked Examples</h2>
            {workedExamples.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <div className="bin98-codebox">
                  <code>{item.code.trim()}</code>
                </div>
                <p>{item.explanation}</p>
              </div>
            ))}
          </section>
          <section id="ex-timeline" className="bin98-section">
            <h2 className="bin98-heading">Interactive Timeline</h2>
            <p>
              Select a scenario and step through how monitor entry, wait, and signal work together.
              This highlights why monitors combine mutual exclusion with disciplined waiting.
            </p>
            <div className="bin98-inline-buttons">
              {timelineScenarios.map((scenario) => (
                <button
                  key={scenario.id}
                  type="button"
                  className="bin98-push"
                  onClick={() => {
                    setSelectedScenarioId(scenario.id)
                    setStepIndex(0)
                  }}
                >
                  {scenario.title}
                </button>
              ))}
            </div>
            <p>
              <strong>Selected:</strong> {selectedScenario?.title ?? 'None'}
            </p>
            <p>{stepText}</p>
            <p>
              <strong>Summary:</strong> {selectedScenario?.summary ?? ''}
            </p>
            <div className="bin98-inline-buttons">
              <button type="button" className="bin98-push" onClick={() => setStepIndex(0)}>
                Reset
              </button>
              <button
                type="button"
                className="bin98-push"
                onClick={() => setStepIndex((prev) => Math.max(0, prev - 1))}
              >
                Back
              </button>
              <button
                type="button"
                className="bin98-push"
                onClick={() => {
                  if (canStepForward) {
                    setStepIndex((prev) => prev + 1)
                  }
                }}
              >
                Step
              </button>
            </div>
          </section>
        </>
      )}

      {activeTab === 'glossary' && (
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {glossary.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
