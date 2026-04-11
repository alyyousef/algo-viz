import { useState } from 'react'

import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'What it is',
    details:
      'A read-write lock allows multiple readers to access shared state concurrently, but writers have exclusive access.',
    notes: 'It improves throughput when reads are frequent and writes are rare.',
  },
  {
    title: 'Why it matters',
    details:
      'It balances safety and performance for read-heavy workloads like caches and configuration stores.',
    notes: 'Misuse can cause writer starvation or excessive overhead.',
  },
  {
    title: 'What it teaches',
    details:
      'Correctness depends on policy choices: reader-preference, writer-preference, or fair scheduling.',
    notes: 'Understanding these policies helps avoid starvation and performance traps.',
  },
]

const mentalModel = [
  {
    title: 'Shared vs exclusive',
    detail: 'Readers acquire a shared lock; writers acquire an exclusive lock.',
  },
  {
    title: 'Read concurrency',
    detail: 'Any number of readers can hold the lock simultaneously if no writer is active.',
  },
  {
    title: 'Writer exclusivity',
    detail: 'Only one writer can hold the lock, and no readers are allowed while it does.',
  },
  {
    title: 'Policy choice',
    detail: 'Decide whether readers or writers have priority when both are waiting.',
  },
]

const glossary = [
  {
    term: 'Read-write lock',
    definition: 'A lock that supports shared (read) and exclusive (write) modes.',
  },
  { term: 'Shared lock', definition: 'A lock mode that allows concurrent readers.' },
  {
    term: 'Exclusive lock',
    definition: 'A lock mode that excludes all other readers and writers.',
  },
  { term: 'Reader-preference', definition: 'Readers are admitted even if writers are waiting.' },
  { term: 'Writer-preference', definition: 'Writers block new readers to avoid starvation.' },
  { term: 'Fair lock', definition: 'Readers and writers are served in arrival order.' },
  {
    term: 'Upgrade',
    definition: 'Convert a read lock to a write lock (often unsafe without special support).',
  },
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
    detail: 'Every write must hold the exclusive lock to maintain correctness.',
  },
  {
    title: 'Reads must be consistent',
    detail: 'Use the shared lock for all reads of shared invariants.',
  },
  {
    title: 'Avoid upgrades without support',
    detail: 'Upgrading can deadlock if multiple readers attempt it simultaneously.',
  },
  {
    title: 'Keep lock hold times short',
    detail: 'Long writes block all readers and can collapse throughput.',
  },
  {
    title: 'Prefer a plain mutex when writes are common',
    detail: 'Read-write locks add overhead and can be slower than a mutex under heavy write load.',
  },
]

const policyComparison = [
  {
    title: 'Reader-preference',
    detail: 'Maximizes read throughput but can starve writers under heavy read load.',
  },
  {
    title: 'Writer-preference',
    detail: 'Ensures writers progress but can reduce read throughput when writes are frequent.',
  },
  {
    title: 'Fair',
    detail: 'Balances both by queueing; often the safest default in shared libraries.',
  },
]

const upgradeDowngradeRules = [
  {
    title: 'Avoid upgrades by default',
    detail: 'Many RW locks do not support upgrade and can deadlock if multiple readers attempt it.',
  },
  {
    title: 'Use downgrade when available',
    detail: 'Downgrading allows a writer to become a reader without releasing the lock fully.',
  },
  {
    title: 'Two-phase protocol',
    detail: 'Release read lock, then acquire write lock. Re-check condition after acquiring.',
  },
  {
    title: 'Be explicit in APIs',
    detail: 'If upgrades are supported, use dedicated upgrade locks to avoid ambiguity.',
  },
]

const workloadGuide = [
  {
    title: 'Read-mostly workloads',
    detail: 'RW locks often help when reads are long enough to overlap and writes are rare.',
  },
  {
    title: 'Write-heavy workloads',
    detail: 'A plain mutex is often simpler and faster than RW locks.',
  },
  {
    title: 'Short reads',
    detail: 'If reads are tiny, RW lock overhead can dominate.',
  },
  {
    title: 'Latency-sensitive writes',
    detail: 'Prefer writer-preference or fair policies to avoid write stalls.',
  },
]

const policyTable = [
  { policy: 'Reader-preference', upside: 'High read throughput', risk: 'Writer starvation' },
  { policy: 'Writer-preference', upside: 'Writer progress', risk: 'Readers blocked more often' },
  { policy: 'Fair', upside: 'Balanced', risk: 'Higher overhead' },
]

const debuggingChecklist = [
  {
    title: 'Are all writes exclusive?',
    detail: 'Any write without a write lock can corrupt shared state.',
  },
  {
    title: 'Are reads truly read-only?',
    detail: 'Hidden mutations while holding a read lock violate invariants.',
  },
  {
    title: 'Is upgrade used?',
    detail: 'Check for read-to-write upgrades; this can deadlock on many APIs.',
  },
  {
    title: 'Are writers starving?',
    detail: 'Continuous readers can starve writers under reader-preference policies.',
  },
  {
    title: 'Are read holds long?',
    detail: 'Long read locks can block urgent writes and reduce freshness.',
  },
  {
    title: 'Is the policy documented?',
    detail: 'The chosen policy should be explicit in code and documentation.',
  },
]

const faq = [
  {
    question: 'Are RW locks always faster than mutexes?',
    answer: 'No. They help only when reads dominate and are long enough to overlap.',
  },
  {
    question: 'Can a reader see partial writes?',
    answer: 'No, if writers always use the exclusive lock correctly.',
  },
  {
    question: 'Is upgrade safe?',
    answer: 'Only if your lock explicitly supports it. Otherwise, release and re-acquire.',
  },
  {
    question: 'What policy should I choose?',
    answer:
      'Fair is safest; writer-preference if writer latency matters; reader-preference for read-heavy analytics.',
  },
  {
    question: 'When should I use RCU instead?',
    answer: 'When you need extremely fast reads and can tolerate complex update logic.',
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
    detail: 'Copy-on-write avoids reader locks but incurs higher memory and copy costs on writes.',
  },
  {
    title: 'Read-write lock vs RCU',
    detail: 'RCU allows lock-free reads at the cost of complex update and reclamation logic.',
  },
  {
    title: 'Read-write lock vs seqlock',
    detail: 'Seqlocks allow optimistic reads with retries but require writers to be exclusive.',
  },
]

const correctnessChecklist = [
  {
    title: 'Safety',
    detail: 'Writers have exclusive access; readers never see partial updates.',
  },
  {
    title: 'Liveness',
    detail: 'Readers and writers both eventually make progress.',
  },
  {
    title: 'No upgrade deadlock',
    detail: 'Avoid read-to-write upgrades unless the lock API explicitly supports them.',
  },
  {
    title: 'Consistency',
    detail: 'All reads of shared invariants are guarded by the shared lock.',
  },
  {
    title: 'Fairness',
    detail: 'Policy prevents starvation of writers (or readers) in your workload.',
  },
  {
    title: 'Fallback path',
    detail: 'If contention is high, consider switching to a mutex or different strategy.',
  },
]

const implementationNotes = [
  {
    title: 'Internal counters',
    detail: 'Implementations track active readers and waiting writers to enforce policy.',
  },
  {
    title: 'Writer waiting flag',
    detail: 'Writer-preference often blocks new readers when a writer is queued.',
  },
  {
    title: 'Fair queueing',
    detail: 'Fair locks often maintain a queue or ticket system.',
  },
  {
    title: 'Memory ordering',
    detail: 'Lock acquisition and release enforce happens-before between readers and writers.',
  },
]

const performanceTips = [
  {
    title: 'Use only if reads dominate',
    detail: 'RW locks pay overhead; they help only when read contention is the bottleneck.',
  },
  {
    title: 'Short write sections',
    detail: 'Writes block all readers; keep writes minimal and fast.',
  },
  {
    title: 'Avoid upgrade patterns',
    detail: 'If you need to read-then-write, release and re-acquire in write mode if safe.',
  },
  {
    title: 'Batch writes',
    detail: 'Group multiple updates in a single exclusive hold to amortize overhead.',
  },
  {
    title: 'Measure contention',
    detail: 'Profile before and after switching from a mutex.',
  },
]

const commonPitfalls = [
  {
    mistake: 'Writer starvation',
    description: 'Reader-preference can keep writers waiting indefinitely.',
  },
  {
    mistake: 'Assuming upgrades are safe',
    description: 'Multiple readers attempting upgrade can deadlock.',
  },
  {
    mistake: 'Using RW locks with frequent writes',
    description: 'The overhead can outweigh the benefits and reduce throughput.',
  },
  {
    mistake: 'Locking too much',
    description: 'Holding read locks for long periods blocks writers and reduces freshness.',
  },
  {
    mistake: 'Ignoring policy impacts',
    description: 'The wrong policy can starve readers or writers in real workloads.',
  },
  {
    mistake: 'Forgetting to downgrade',
    description: 'After a write, keeping exclusive access longer than needed wastes concurrency.',
  },
]

const pseudocode = [
  {
    title: 'Reader workflow',
    code: `readLock()\nvalue = sharedState\nreadUnlock()`,
    explanation: 'Multiple readers can run together when no writer holds the lock.',
  },
  {
    title: 'Writer workflow',
    code: `writeLock()\nsharedState = newValue\nwriteUnlock()`,
    explanation: 'Writers require exclusive access.',
  },
  {
    title: 'Downgrade example',
    code: `writeLock()\nupdate()\ndowngradeToRead()\nreadMore()\nreadUnlock()`,
    explanation:
      'Downgrading preserves exclusivity during the update but allows readers afterward.',
  },
]

const workedExamples = [
  {
    title: 'Configuration store',
    code: `readLock()\nconfig = settings[key]\nreadUnlock()\n\nwriteLock()\nsettings[key] = value\nwriteUnlock()`,
    explanation: 'Many readers can load settings while rare writes update values.',
  },
  {
    title: 'Cache with refresh',
    code: `readLock()\nif (!fresh):\n  readUnlock()\n  writeLock()\n  refresh()\n  downgradeToRead()\nuseCache()\nreadUnlock()`,
    explanation: 'Use downgrade if supported, or release and re-acquire safely.',
  },
  {
    title: 'Index structure',
    code: `readLock()\nlookup(key)\nreadUnlock()\n\nwriteLock()\ninsert(key, value)\nwriteUnlock()`,
    explanation: 'Readers run concurrently; writers serialize updates.',
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
    summary: 'Shared lock allows high read concurrency.',
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
    summary: 'Writes exclude all readers.',
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
    summary: 'Reader-preference policies can starve writers.',
  },
]

const keyTakeaways = [
  'Read-write locks allow concurrent readers but exclusive writers.',
  'They are best for read-heavy workloads with infrequent writes.',
  'Policy choice (reader vs writer preference) is crucial for fairness.',
  'Upgrades are risky; downgrades are safer when supported.',
  'When writes dominate, a plain mutex may perform better.',
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
    { id: 'bp-why', label: 'Why It Matters' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-mental-model', label: 'Mental Model' },
    { id: 'core-rules', label: 'Core Rules' },
    { id: 'core-policy', label: 'Policy Comparison' },
    { id: 'core-upgrade', label: 'Upgrade and Downgrade' },
    { id: 'core-workload', label: 'Workload Fit Guide' },
    { id: 'core-correctness', label: 'Correctness Checklist' },
    { id: 'core-implementation', label: 'Implementation Notes' },
    { id: 'core-performance', label: 'Performance Tips' },
    { id: 'core-compare', label: 'Compare and Contrast' },
    { id: 'core-policy-table', label: 'Policy Summary' },
    { id: 'core-debugging', label: 'Debugging Checklist' },
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

export default function ReadWriteLocksPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Read-Write Locks',
    defaultTab: 'big-picture',
  })

  const [selectedScenarioId, setSelectedScenarioId] = useState(
    timelineScenarios[0]?.id ?? 'readers',
  )
  const [stepIndex, setStepIndex] = useState(0)

  const selectedScenario =
    timelineScenarios.find((scenario) => scenario.id === selectedScenarioId) ?? timelineScenarios[0]
  const stepText = selectedScenario?.steps[stepIndex] ?? 'No steps available.'
  const canStepForward = selectedScenario ? stepIndex < selectedScenario.steps.length - 1 : false

  return (
    <TopicPageShell
      title="Read-Write Locks"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Read-Write Locks</h1>
      <p>
        Read-write locks allow multiple readers to access shared state concurrently, while writers
        require exclusive access. They are excellent for read-heavy workloads, but the policy
        (reader-preference, writer-preference, or fair) matters for correctness and starvation. This
        document covers the model, usage rules, patterns, and tradeoffs.
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
            <h2 className="bin98-heading">Why It Matters</h2>
            <p>
              Read-write locks improve throughput only when read contention dominates and reads are
              long enough to overlap. Otherwise a plain mutex is often simpler and faster.
            </p>
            <p>
              Policy choice is part of correctness: reader-preference can starve writers, and
              writer-preference can reduce read throughput under mixed load.
            </p>
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
          <section id="core-mental-model" className="bin98-section">
            <h2 className="bin98-heading">Mental Model</h2>
            {mentalModel.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-rules" className="bin98-section">
            <h2 className="bin98-heading">Core Rules</h2>
            {coreRules.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
            <p>
              <strong>Reminder:</strong> Read-write locks only help when reads dominate and overlap.
            </p>
          </section>
          <section id="core-policy" className="bin98-section">
            <h2 className="bin98-heading">Policy Comparison</h2>
            {policyComparison.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-upgrade" className="bin98-section">
            <h2 className="bin98-heading">Upgrade and Downgrade</h2>
            {upgradeDowngradeRules.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-workload" className="bin98-section">
            <h2 className="bin98-heading">Workload Fit Guide</h2>
            {workloadGuide.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-correctness" className="bin98-section">
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
          <section id="core-compare" className="bin98-section">
            <h2 className="bin98-heading">Compare and Contrast</h2>
            {compareTools.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-policy-table" className="bin98-section">
            <h2 className="bin98-heading">Policy Summary</h2>
            <table className="bin98-table">
              <thead>
                <tr>
                  <th>Policy</th>
                  <th>Upside</th>
                  <th>Risk</th>
                </tr>
              </thead>
              <tbody>
                {policyTable.map((row) => (
                  <tr key={row.policy}>
                    <td>{row.policy}</td>
                    <td>{row.upside}</td>
                    <td>{row.risk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
              Select a scenario and step through how shared and exclusive access behaves under
              contention.
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
                RESET
              </button>
              <button
                type="button"
                className="bin98-push"
                onClick={() => setStepIndex((prev) => Math.max(0, prev - 1))}
              >
                BACK
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
                STEP
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
