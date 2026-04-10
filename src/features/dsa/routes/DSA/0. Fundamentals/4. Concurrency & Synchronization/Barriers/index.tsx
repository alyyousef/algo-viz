import { useState } from 'react'

import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'What it is',
    details:
      'A barrier is a synchronization point where a group of threads must all arrive before any are allowed to proceed.',
    notes:
      'It enforces phase boundaries in parallel algorithms like iterative solvers and simulations.',
  },
  {
    title: 'Why it matters',
    details:
      'Barriers prevent fast threads from running ahead with stale or partially updated state.',
    notes: 'They are essential when work is structured in rounds or timesteps.',
  },
  {
    title: 'Where it shows up',
    details:
      'Matrix computations, physics engines, map-reduce stages, graph algorithms, parallel BFS/DP.',
    notes: 'Most high-level parallel frameworks include a barrier primitive.',
  },
]

const mentalModel = [
  {
    title: 'Rendezvous for a phase',
    detail: 'Every participant must check in before any can check out.',
  },
  {
    title: 'No one left behind',
    detail: 'The last arriving thread releases the entire cohort.',
  },
  {
    title: 'Cyclic vs one-shot',
    detail:
      'Cyclic barriers reset automatically for repeated rounds; one-shot barriers are used once.',
  },
  {
    title: 'Memory visibility',
    detail:
      'A correctly implemented barrier also provides an ordering guarantee: writes before the barrier become visible after it.',
  },
]

const quickGlossary = [
  {
    term: 'Barrier',
    definition: 'A synchronization point that blocks until all participants arrive.',
  },
  {
    term: 'Participant',
    definition: 'A thread or task that must reach the barrier to release it.',
  },
  { term: 'Cyclic barrier', definition: 'A barrier that can be reused across multiple phases.' },
  { term: 'One-shot barrier', definition: 'A barrier used exactly once.' },
  {
    term: 'Sense reversal',
    definition: 'A technique to reset a barrier by flipping a shared sense flag each round.',
  },
  {
    term: 'Arrival count',
    definition: 'Shared counter tracking how many participants have reached the barrier.',
  },
  {
    term: 'Generation',
    definition: 'A round of the barrier; each generation releases once all arrive.',
  },
  { term: 'Phase', definition: 'A logical unit of work between barrier synchronizations.' },
]

const barrierTypes = [
  {
    title: 'Centralized counter barrier',
    detail:
      'A single atomic counter tracks arrivals. The last thread releases the others by updating a generation/sense flag.',
  },
  {
    title: 'Sense-reversing barrier',
    detail:
      'Threads spin on a local sense value, avoiding resets that race with arrivals from the next generation.',
  },
  {
    title: 'Tree barrier',
    detail: 'Threads synchronize up a tree structure; the root releases all threads down the tree.',
  },
  {
    title: 'Dissemination barrier',
    detail:
      'Threads synchronize in log2(N) rounds, exchanging signals with different partners each round.',
  },
  {
    title: 'Hardware barrier',
    detail: 'Architectures and GPUs provide native barriers for thread blocks and warps.',
  },
  {
    title: 'Distributed barrier',
    detail: 'Nodes synchronize across the network using collective protocols or message passing.',
  },
]

const happensBeforeRules = [
  {
    title: 'Phase ordering',
    detail:
      'All writes before the barrier in phase k become visible to all participants after the barrier in phase k.',
  },
  {
    title: 'Release on arrive',
    detail:
      'The last arriving thread performs a release that publishes the completion of the phase.',
  },
  {
    title: 'Acquire on exit',
    detail: 'Threads that leave the barrier perform an acquire to observe all phase-k writes.',
  },
  {
    title: 'No early access',
    detail: 'A barrier ensures no thread observes partially updated state from the next phase.',
  },
]

const commonUseCases = [
  {
    title: 'Iterative stencil / PDE solvers',
    detail:
      'Each timestep depends on all neighbors from the previous step, so a barrier separates steps.',
  },
  {
    title: 'Parallel BFS layers',
    detail: 'Expand all nodes at depth d, then synchronize before moving to depth d+1.',
  },
  {
    title: 'Map-reduce phases',
    detail: 'Mapping finishes before reduction starts; barrier defines the boundary.',
  },
  {
    title: 'Shared data structure rebuild',
    detail: 'All threads finish updates before a global cleanup or compaction step.',
  },
  {
    title: 'Frame-based simulations',
    detail:
      'Physics or AI updates occur in discrete frames with a barrier at the end of each frame.',
  },
  {
    title: 'Pipeline stage alignment',
    detail: 'Ensure all workers finish stage k before stage k+1 begins.',
  },
]

const pitfalls = [
  {
    mistake: 'Mismatched participant counts',
    description: 'If fewer threads arrive than expected, everyone blocks forever (deadlock).',
  },
  {
    mistake: 'Reusing a one-shot barrier',
    description:
      'One-shot barriers do not reset; reusing them leads to threads skipping or deadlocking.',
  },
  {
    mistake: 'Incorrect sense handling',
    description:
      'Failing to flip the sense for each thread can let early threads pass the next generation incorrectly.',
  },
  {
    mistake: 'Assuming barrier implies mutual exclusion',
    description:
      'Barriers synchronize arrival, not access. Use a mutex if you need exclusive access.',
  },
  {
    mistake: 'Mixing participants dynamically',
    description:
      'Adding/removing threads mid-phase breaks the barrier contract unless the implementation supports it.',
  },
  {
    mistake: 'Ignoring memory ordering',
    description:
      'A barrier must include release/acquire semantics; otherwise visibility bugs can still occur.',
  },
]

const performanceNotes = [
  {
    title: 'Centralized contention',
    detail:
      'A single counter can bottleneck at scale. Tree or dissemination barriers scale better.',
  },
  {
    title: 'Spinning vs blocking',
    detail:
      'Busy-waiting is fast for short waits but wastes CPU. Blocking saves CPU but adds latency.',
  },
  {
    title: 'NUMA effects',
    detail: 'Barrier state placed on one socket can cause cross-socket traffic. Placement matters.',
  },
  {
    title: 'Load imbalance',
    detail:
      'Fast threads wait for slow ones; barrier cost is dominated by the slowest participant.',
  },
  {
    title: 'False sharing',
    detail: 'Barrier counters that share cache lines with other hot data can degrade performance.',
  },
  {
    title: 'Batch work per phase',
    detail: 'More work between barriers amortizes synchronization overhead.',
  },
]

const pseudocode = [
  {
    title: 'Centralized barrier (one-shot)',
    code: `global count = 0
global N = number of threads

barrier():
  if (fetch_add(count, 1) == N - 1):
    // last to arrive
    release_all()
  else:
    wait_until_released()`,
    explanation: 'Works once, but not safely reusable without extra state.',
  },
  {
    title: 'Sense-reversing barrier (cyclic)',
    code: `global count = N
global sense = false
thread localSense = true

barrier():
  localSense = !localSense
  if (fetch_sub(count, 1) == 1):
    count = N
    sense = localSense  // release
  else:
    while (sense != localSense): spin  // acquire`,
    explanation: 'Each generation flips sense, preventing early threads from racing ahead.',
  },
]

const keyTakeaways = [
  'A barrier is a phase boundary: no thread proceeds until all arrive.',
  'Cyclic barriers must reset safely; sense reversal is a standard technique.',
  'A correct barrier establishes happens-before between phases.',
  'Centralized barriers are simple but can bottleneck at high thread counts.',
  'Always ensure the participant count matches the barrier configuration.',
]

const barrierChecklist = [
  'Do you know the exact number of participants for each barrier generation?',
  'Is the barrier one-shot or cyclic?',
  'Is memory visibility between phases required? (Most of the time: yes.)',
  'Is a centralized counter acceptable for the expected thread count?',
  'Do you need to block or spin?',
  'Are participants stable, or can they join/leave dynamically?',
]

const compareContrast = [
  {
    title: 'Barrier vs mutex',
    detail:
      'A barrier is about coordination across threads; a mutex is about exclusive access to shared state.',
  },
  {
    title: 'Barrier vs latch',
    detail: 'A latch is one-shot; a barrier is typically reusable across multiple phases.',
  },
  {
    title: 'Barrier vs semaphore',
    detail:
      'Semaphores control access to a fixed number of permits; barriers synchronize all participants.',
  },
  {
    title: 'Barrier vs condition variable',
    detail:
      'Condition variables require explicit predicate logic; barriers encode the predicate as "all arrived."',
  },
]

const interactiveScenarios = [
  {
    id: 'phase-sim',
    title: 'Two-phase workload',
    description: 'All threads must finish phase A before phase B starts.',
    steps: ['Phase A work', 'Barrier', 'Phase B work'],
    takeaway: 'A barrier ensures that no thread begins phase B with stale data from phase A.',
  },
  {
    id: 'bfs',
    title: 'Parallel BFS layer',
    description: 'Each layer depends on all nodes from the previous layer.',
    steps: ['Process layer d', 'Barrier', 'Process layer d+1'],
    takeaway: 'Barrier boundaries preserve BFS level correctness.',
  },
  {
    id: 'simulation',
    title: 'Simulation timesteps',
    description: 'Each timestep consumes the fully updated world state.',
    steps: ['Compute forces', 'Barrier', 'Integrate positions'],
    takeaway: 'Ensures all forces are computed before integration.',
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
    { id: 'core-types', label: 'Barrier Types' },
    { id: 'core-happens-before', label: 'Happens-Before Guarantees' },
    { id: 'core-use-cases', label: 'Common Use Cases' },
    { id: 'core-performance', label: 'Performance Reality Check' },
    { id: 'core-compare', label: 'Compare and Contrast' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-checklist', label: 'Barrier Checklist' },
  ],
  examples: [
    { id: 'ex-pseudocode', label: 'Barrier Algorithms' },
    { id: 'ex-playbook', label: 'Barrier Playbook' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function BarriersPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Barriers',
    defaultTab: 'big-picture',
  })

  const defaultScenario = interactiveScenarios[0] ?? {
    id: 'fallback',
    title: 'No scenario configured',
    description: 'Add scenarios to display the interactive playbook.',
    steps: ['No steps available'],
    takeaway: 'No takeaway available.',
  }
  const [selectedScenarioId, setSelectedScenarioId] = useState(defaultScenario.id)
  const [arrived, setArrived] = useState(0)
  const [generation, setGeneration] = useState(0)

  const selectedScenario =
    interactiveScenarios.find((item) => item.id === selectedScenarioId) ?? defaultScenario
  const participantCount = 4

  const barrierStatus =
    arrived === 0
      ? 'No threads have arrived yet.'
      : arrived < participantCount
        ? `${arrived} of ${participantCount} threads arrived. Waiting for the rest.`
        : `All ${participantCount} threads arrived. Barrier released (generation ${generation}).`

  const handleArrive = (): void => {
    setArrived((prev) => {
      if (prev + 1 >= participantCount) {
        setGeneration((gen) => gen + 1)
        return 0
      }
      return prev + 1
    })
  }

  return (
    <TopicPageShell
      title="Barriers"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Barriers</h1>
      <p>
        A barrier forces a set of threads to reach the same point before any can proceed. It is a
        core synchronization tool for phase-based parallel work where correctness depends on all
        participants finishing one round before the next starts.
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
              Barriers prevent partial progress from leaking into later phases. Without that phase
              boundary, threads can observe inconsistent snapshots and compute on mixed-generation
              state.
            </p>
            <p>
              In real systems, barrier overhead is often less costly than debugging correctness
              failures caused by ad hoc timing assumptions.
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
          <section id="core-types" className="bin98-section">
            <h2 className="bin98-heading">Barrier Types</h2>
            {barrierTypes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-happens-before" className="bin98-section">
            <h2 className="bin98-heading">Happens-Before Guarantees</h2>
            {happensBeforeRules.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
            <p>
              A correct barrier is also a memory barrier: writes in phase k must be visible to all
              participants in phase k+1.
            </p>
          </section>
          <section id="core-use-cases" className="bin98-section">
            <h2 className="bin98-heading">Common Use Cases</h2>
            {commonUseCases.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-performance" className="bin98-section">
            <h2 className="bin98-heading">Performance Reality Check</h2>
            {performanceNotes.map((item) => (
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
            <h2 className="bin98-heading">Barrier Checklist</h2>
            <ul>
              {barrierChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {activeTab === 'examples' && (
        <>
          <section id="ex-pseudocode" className="bin98-section">
            <h2 className="bin98-heading">Barrier Algorithms (Pseudocode)</h2>
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
          <section id="ex-playbook" className="bin98-section">
            <h2 className="bin98-heading">Barrier Playbook</h2>
            <p>
              Choose a workload pattern and observe how barriers enforce phase ordering. Press
              ARRIVE to simulate threads reaching the barrier.
            </p>
            <div className="bin98-inline-buttons">
              {interactiveScenarios.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="bin98-push"
                  onClick={() => {
                    setSelectedScenarioId(item.id)
                    setArrived(0)
                  }}
                >
                  {item.title}
                </button>
              ))}
            </div>
            <h3 className="bin98-subheading">{selectedScenario.title}</h3>
            <p>{selectedScenario.description}</p>
            <ol>
              {selectedScenario.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p>
              <strong>Takeaway:</strong> {selectedScenario.takeaway}
            </p>
            <div className="bin98-inline-buttons">
              <button type="button" className="bin98-push" onClick={handleArrive}>
                ARRIVE
              </button>
              <button
                type="button"
                className="bin98-push"
                onClick={() => {
                  setArrived(0)
                  setGeneration(0)
                }}
              >
                RESET
              </button>
            </div>
            <p>
              <strong>Status:</strong> {barrierStatus}
            </p>
          </section>
        </>
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
