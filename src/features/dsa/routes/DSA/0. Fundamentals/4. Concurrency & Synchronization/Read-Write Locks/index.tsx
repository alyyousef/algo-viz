import { useState } from 'react'
import { Link } from 'react-router-dom'

import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'What it is',
    details:
      'A read-write lock allows multiple readers to access shared state concurrently, but writers have exclusive access.',
    notes:
      'It improves throughput when reads are frequent and writes are rare.',
  },
  {
    title: 'Why it matters',
    details:
      'It balances safety and performance for read-heavy workloads like caches and configuration stores.',
    notes:
      'Misuse can cause writer starvation or excessive overhead.',
  },
  {
    title: 'What it teaches',
    details:
      'Correctness depends on policy choices: reader-preference, writer-preference, or fair scheduling.',
    notes:
      'Understanding these policies helps avoid starvation and performance traps.',
  },
]

const mentalModel = [
  {
    title: 'Shared vs exclusive',
    detail:
      'Readers acquire a shared lock; writers acquire an exclusive lock.',
  },
  {
    title: 'Read concurrency',
    detail:
      'Any number of readers can hold the lock simultaneously if no writer is active.',
  },
  {
    title: 'Writer exclusivity',
    detail:
      'Only one writer can hold the lock, and no readers are allowed while it does.',
  },
  {
    title: 'Policy choice',
    detail:
      'Decide whether readers or writers have priority when both are waiting.',
  },
]

const glossary = [
  { term: 'Read-write lock', definition: 'A lock that supports shared (read) and exclusive (write) modes.' },
  { term: 'Shared lock', definition: 'A lock mode that allows concurrent readers.' },
  { term: 'Exclusive lock', definition: 'A lock mode that excludes all other readers and writers.' },
  { term: 'Reader-preference', definition: 'Readers are admitted even if writers are waiting.' },
  { term: 'Writer-preference', definition: 'Writers block new readers to avoid starvation.' },
  { term: 'Fair lock', definition: 'Readers and writers are served in arrival order.' },
  { term: 'Upgrade', definition: 'Convert a read lock to a write lock (often unsafe without special support).' },
  { term: 'Downgrade', definition: 'Convert a write lock to a read lock to allow other readers.' },
]

const coreRules = [
  {
    title: 'Pick a fairness policy',
    detail:
      'Choose reader-preference, writer-preference, or fair scheduling based on workload needs.',
  },
  {
    title: 'Protect all writes',
    detail:
      'Every write must hold the exclusive lock to maintain correctness.',
  },
  {
    title: 'Reads must be consistent',
    detail:
      'Use the shared lock for all reads of shared invariants.',
  },
  {
    title: 'Avoid upgrades without support',
    detail:
      'Upgrading can deadlock if multiple readers attempt it simultaneously.',
  },
  {
    title: 'Keep lock hold times short',
    detail:
      'Long writes block all readers and can collapse throughput.',
  },
  {
    title: 'Prefer a plain mutex when writes are common',
    detail:
      'Read-write locks add overhead and can be slower than a mutex under heavy write load.',
  },
]

const policyComparison = [
  {
    title: 'Reader-preference',
    detail:
      'Maximizes read throughput but can starve writers under heavy read load.',
  },
  {
    title: 'Writer-preference',
    detail:
      'Ensures writers progress but can reduce read throughput when writes are frequent.',
  },
  {
    title: 'Fair',
    detail:
      'Balances both by queueing; often the safest default in shared libraries.',
  },
]

const compareTools = [
  {
    title: 'Read-write lock vs mutex',
    detail:
      'A mutex serializes all access; RW locks allow concurrent readers when no writer exists.',
  },
  {
    title: 'Read-write lock vs copy-on-write',
    detail:
      'Copy-on-write avoids reader locks but incurs higher memory and copy costs on writes.',
  },
  {
    title: 'Read-write lock vs RCU',
    detail:
      'RCU allows lock-free reads at the cost of complex update and reclamation logic.',
  },
  {
    title: 'Read-write lock vs seqlock',
    detail:
      'Seqlocks allow optimistic reads with retries but require writers to be exclusive.',
  },
]

const correctnessChecklist = [
  {
    title: 'Safety',
    detail:
      'Writers have exclusive access; readers never see partial updates.',
  },
  {
    title: 'Liveness',
    detail:
      'Readers and writers both eventually make progress.',
  },
  {
    title: 'No upgrade deadlock',
    detail:
      'Avoid read-to-write upgrades unless the lock API explicitly supports them.',
  },
  {
    title: 'Consistency',
    detail:
      'All reads of shared invariants are guarded by the shared lock.',
  },
  {
    title: 'Fairness',
    detail:
      'Policy prevents starvation of writers (or readers) in your workload.',
  },
  {
    title: 'Fallback path',
    detail:
      'If contention is high, consider switching to a mutex or different strategy.',
  },
]

const implementationNotes = [
  {
    title: 'Internal counters',
    detail:
      'Implementations track active readers and waiting writers to enforce policy.',
  },
  {
    title: 'Writer waiting flag',
    detail:
      'Writer-preference often blocks new readers when a writer is queued.',
  },
  {
    title: 'Fair queueing',
    detail:
      'Fair locks often maintain a queue or ticket system.',
  },
  {
    title: 'Memory ordering',
    detail:
      'Lock acquisition and release enforce happens-before between readers and writers.',
  },
]

const performanceTips = [
  {
    title: 'Use only if reads dominate',
    detail:
      'RW locks pay overhead; they help only when read contention is the bottleneck.',
  },
  {
    title: 'Short write sections',
    detail:
      'Writes block all readers; keep writes minimal and fast.',
  },
  {
    title: 'Avoid upgrade patterns',
    detail:
      'If you need to read-then-write, release and re-acquire in write mode if safe.',
  },
  {
    title: 'Batch writes',
    detail:
      'Group multiple updates in a single exclusive hold to amortize overhead.',
  },
  {
    title: 'Measure contention',
    detail:
      'Profile before and after switching from a mutex.',
  },
]

const commonPitfalls = [
  {
    mistake: 'Writer starvation',
    description:
      'Reader-preference can keep writers waiting indefinitely.',
  },
  {
    mistake: 'Assuming upgrades are safe',
    description:
      'Multiple readers attempting upgrade can deadlock.',
  },
  {
    mistake: 'Using RW locks with frequent writes',
    description:
      'The overhead can outweigh the benefits and reduce throughput.',
  },
  {
    mistake: 'Locking too much',
    description:
      'Holding read locks for long periods blocks writers and reduces freshness.',
  },
  {
    mistake: 'Ignoring policy impacts',
    description:
      'The wrong policy can starve readers or writers in real workloads.',
  },
  {
    mistake: 'Forgetting to downgrade',
    description:
      'After a write, keeping exclusive access longer than needed wastes concurrency.',
  },
]

const pseudocode = [
  {
    title: 'Reader workflow',
    code: `readLock()
value = sharedState
readUnlock()`,
    explanation:
      'Multiple readers can run together when no writer holds the lock.',
  },
  {
    title: 'Writer workflow',
    code: `writeLock()
sharedState = newValue
writeUnlock()`,
    explanation:
      'Writers require exclusive access.',
  },
  {
    title: 'Downgrade example',
    code: `writeLock()
update()
downgradeToRead()
readMore()
readUnlock()`,
    explanation:
      'Downgrading preserves exclusivity during the update but allows readers afterward.',
  },
]

const workedExamples = [
  {
    title: 'Configuration store',
    code: `readLock()
config = settings[key]
readUnlock()

writeLock()
settings[key] = value
writeUnlock()`,
    explanation:
      'Many readers can load settings while rare writes update values.',
  },
  {
    title: 'Cache with refresh',
    code: `readLock()
if (!fresh):
  readUnlock()
  writeLock()
  refresh()
  downgradeToRead()
useCache()
readUnlock()`,
    explanation:
      'Use downgrade if supported, or release and re-acquire safely.',
  },
  {
    title: 'Index structure',
    code: `readLock()
lookup(key)
readUnlock()

writeLock()
insert(key, value)
writeUnlock()`,
    explanation:
      'Readers run concurrently; writers serialize updates.',
  },
]

const timelineScenarios = [
  {
    id: 'readers',
    title: 'Concurrent readers',
    steps: [
      'Reader A acquires the shared lock.',
      'Reader B acquires the shared lock.',
      'Reader C acquires the shared lock.',
      'All three read concurrently.',
      'All release; no writer was blocked.',
    ],
    summary:
      'Shared lock allows high read concurrency.',
  },
  {
    id: 'writer-blocks',
    title: 'Writer blocks readers',
    steps: [
      'Writer acquires exclusive lock.',
      'New readers attempt to read and block.',
      'Writer updates and releases.',
      'Readers acquire shared lock and proceed.',
    ],
    summary:
      'Writes exclude all readers.',
  },
  {
    id: 'starvation',
    title: 'Writer starvation',
    steps: [
      'Readers continuously acquire shared locks.',
      'Writer arrives and waits.',
      'More readers arrive and are allowed in.',
      'Writer waits indefinitely.',
    ],
    summary:
      'Reader-preference policies can starve writers.',
  },
]

const keyTakeaways = [
  'Read-write locks allow concurrent readers but exclusive writers.',
  'They are best for read-heavy workloads with infrequent writes.',
  'Policy choice (reader vs writer preference) is crucial for fairness.',
  'Upgrades are risky; downgrades are safer when supported.',
  'When writes dominate, a plain mutex may perform better.',
]

export default function ReadWriteLocksPage(): JSX.Element {
  const [selectedScenarioId, setSelectedScenarioId] = useState(timelineScenarios[0]?.id ?? 'readers')
  const [stepIndex, setStepIndex] = useState(0)

  const selectedScenario = timelineScenarios.find((scenario) => scenario.id === selectedScenarioId) ?? timelineScenarios[0]
  const stepText = selectedScenario?.steps[stepIndex] ?? 'No steps available.'
  const canStepForward = selectedScenario ? stepIndex < selectedScenario.steps.length - 1 : false

  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Read-Write Locks</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Shared reads, exclusive writes</div>
              <p className="win95-text">
                Read-write locks allow multiple readers to access shared state concurrently, while writers require exclusive access.
                They are excellent for read-heavy workloads, but the policy (reader-preference, writer-preference, or fair) matters for
                correctness and starvation. This page covers the model, usage rules, patterns, and tradeoffs.
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
            <legend>Mental Model</legend>
            <div className="win95-grid win95-grid-4">
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
              {glossary.map((item) => (
                <div key={item.term} className="win95-panel">
                  <div className="win95-heading">{item.term}</div>
                  <p className="win95-text">{item.definition}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Core Rules of Use</legend>
            <div className="win95-grid win95-grid-2">
              {coreRules.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                Read-write locks are not always faster than mutexes. They only help when reads dominate and are long enough to overlap.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Policy Comparison</legend>
            <div className="win95-grid win95-grid-2">
              {policyComparison.map((item) => (
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
              {compareTools.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Correctness Checklist</legend>
            <div className="win95-grid win95-grid-2">
              {correctnessChecklist.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Pseudocode Reference</legend>
            <div className="win95-stack">
              {pseudocode.map((item) => (
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
            <legend>Worked Examples</legend>
            <div className="win95-stack">
              {workedExamples.map((item) => (
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
            <legend>Interactive Timeline</legend>
            <div className="win95-panel">
              <div className="win95-heading">Read-Write Lock Stepper</div>
              <p className="win95-text">
                Select a scenario and step through how shared and exclusive access behaves under contention.
              </p>
              <div className="win95-grid win95-grid-3">
                {timelineScenarios.map((scenario) => (
                  <button
                    key={scenario.id}
                    type="button"
                    className="win95-button"
                    onClick={() => {
                      setSelectedScenarioId(scenario.id)
                      setStepIndex(0)
                    }}
                  >
                    {scenario.title}
                  </button>
                ))}
              </div>
              <div className="win95-panel win95-panel--raised">
                <p className="win95-text"><strong>Selected:</strong> {selectedScenario?.title ?? 'None'}</p>
                <p className="win95-text">{stepText}</p>
                <p className="win95-text win95-note">{selectedScenario?.summary ?? ''}</p>
              </div>
              <div className="win95-grid win95-grid-3">
                <button
                  type="button"
                  className="win95-button"
                  onClick={() => setStepIndex(0)}
                >
                  RESET
                </button>
                <button
                  type="button"
                  className="win95-button"
                  onClick={() => setStepIndex((prev) => Math.max(0, prev - 1))}
                >
                  BACK
                </button>
                <button
                  type="button"
                  className="win95-button"
                  onClick={() => {
                    if (canStepForward) {
                      setStepIndex((prev) => prev + 1)
                    }
                  }}
                >
                  STEP
                </button>
              </div>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Implementation Notes</legend>
            <div className="win95-grid win95-grid-2">
              {implementationNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Performance Tips</legend>
            <div className="win95-grid win95-grid-2">
              {performanceTips.map((item) => (
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
                {commonPitfalls.map((pitfall) => (
                  <li key={pitfall.mistake}>
                    <strong>{pitfall.mistake}:</strong> {pitfall.description}
                  </li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Key Takeaways</legend>
            <div className="win95-grid win95-grid-2">
              {keyTakeaways.map((item) => (
                <div key={item} className="win95-panel">
                  <p className="win95-text">{item}</p>
                </div>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}
