import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { win95Styles } from '@/styles/win95'

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
    notes:
      'They are essential when work is structured in rounds or timesteps.',
  },
  {
    title: 'Where it shows up',
    details:
      'Matrix computations, physics engines, map-reduce stages, graph algorithms, parallel BFS/DP.',
    notes:
      'Most high-level parallel frameworks include a barrier primitive.',
  },
]

const mentalModel = [
  {
    title: 'Rendezvous for a phase',
    detail:
      'Every participant must check in before any can check out.',
  },
  {
    title: 'No one left behind',
    detail:
      'The last arriving thread releases the entire cohort.',
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
  { term: 'Barrier', definition: 'A synchronization point that blocks until all participants arrive.' },
  { term: 'Participant', definition: 'A thread or task that must reach the barrier to release it.' },
  { term: 'Cyclic barrier', definition: 'A barrier that can be reused across multiple phases.' },
  { term: 'One-shot barrier', definition: 'A barrier used exactly once.' },
  { term: 'Sense reversal', definition: 'A technique to reset a barrier by flipping a shared sense flag each round.' },
  { term: 'Arrival count', definition: 'Shared counter tracking how many participants have reached the barrier.' },
  { term: 'Generation', definition: 'A round of the barrier; each generation releases once all arrive.' },
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
    detail:
      'Threads synchronize up a tree structure; the root releases all threads down the tree.',
  },
  {
    title: 'Dissemination barrier',
    detail:
      'Threads synchronize in log2(N) rounds, exchanging signals with different partners each round.',
  },
  {
    title: 'Hardware barrier',
    detail:
      'Architectures and GPUs provide native barriers for thread blocks and warps.',
  },
  {
    title: 'Distributed barrier',
    detail:
      'Nodes synchronize across the network using collective protocols or message passing.',
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
    detail:
      'Threads that leave the barrier perform an acquire to observe all phase-k writes.',
  },
  {
    title: 'No early access',
    detail:
      'A barrier ensures no thread observes partially updated state from the next phase.',
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
    detail:
      'Expand all nodes at depth d, then synchronize before moving to depth d+1.',
  },
  {
    title: 'Map-reduce phases',
    detail:
      'Mapping finishes before reduction starts; barrier defines the boundary.',
  },
  {
    title: 'Shared data structure rebuild',
    detail:
      'All threads finish updates before a global cleanup or compaction step.',
  },
  {
    title: 'Frame-based simulations',
    detail:
      'Physics or AI updates occur in discrete frames with a barrier at the end of each frame.',
  },
  {
    title: 'Pipeline stage alignment',
    detail:
      'Ensure all workers finish stage k before stage k+1 begins.',
  },
]

const pitfalls = [
  {
    mistake: 'Mismatched participant counts',
    description:
      'If fewer threads arrive than expected, everyone blocks forever (deadlock).',
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
    detail:
      'Barrier state placed on one socket can cause cross-socket traffic. Placement matters.',
  },
  {
    title: 'Load imbalance',
    detail:
      'Fast threads wait for slow ones; barrier cost is dominated by the slowest participant.',
  },
  {
    title: 'False sharing',
    detail:
      'Barrier counters that share cache lines with other hot data can degrade performance.',
  },
  {
    title: 'Batch work per phase',
    detail:
      'More work between barriers amortizes synchronization overhead.',
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
    explanation:
      'Works once, but not safely reusable without extra state.',
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
    explanation:
      'Each generation flips sense, preventing early threads from racing ahead.',
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
    detail:
      'A latch is one-shot; a barrier is typically reusable across multiple phases.',
  },
  {
    title: 'Barrier vs semaphore',
    detail:
      'Semaphores control access to a fixed number of permits; barriers synchronize all participants.',
  },
  {
    title: 'Barrier vs condition variable',
    detail:
      'Condition variables require explicit predicate logic; barriers encode the predicate as “all arrived.”',
  },
]

const interactiveScenarios = [
  {
    id: 'phase-sim',
    title: 'Two-phase workload',
    description: 'All threads must finish phase A before phase B starts.',
    steps: ['Phase A work', 'Barrier', 'Phase B work'],
    takeaway:
      'A barrier ensures that no thread begins phase B with stale data from phase A.',
  },
  {
    id: 'bfs',
    title: 'Parallel BFS layer',
    description: 'Each layer depends on all nodes from the previous layer.',
    steps: ['Process layer d', 'Barrier', 'Process layer d+1'],
    takeaway:
      'Barrier boundaries preserve BFS level correctness.',
  },
  {
    id: 'simulation',
    title: 'Simulation timesteps',
    description: 'Each timestep consumes the fully updated world state.',
    steps: ['Compute forces', 'Barrier', 'Integrate positions'],
    takeaway:
      'Ensures all forces are computed before integration.',
  },
]

export default function BarriersPage(): JSX.Element {
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

  const selectedScenario = interactiveScenarios.find((item) => item.id === selectedScenarioId) ?? defaultScenario
  const participantCount = 4

  const barrierStatus = useMemo(() => {
    if (arrived === 0) {
      return 'No threads have arrived yet.'
    }
    if (arrived < participantCount) {
      return `${arrived} of ${participantCount} threads arrived. Waiting for the rest.`
    }
    return `All ${participantCount} threads arrived. Barrier released (generation ${generation}).`
  }, [arrived, generation, participantCount])

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
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Barriers</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Synchronize phases across parallel workers</div>
              <p className="win95-text">
                A barrier forces a set of threads to reach the same point before any can proceed. It is the most common tool for
                coordinating iterative or phase-based parallel algorithms. This page breaks down barrier types, correctness rules,
                and practical pitfalls, plus a small interactive demo.
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
            <legend>Barrier Types</legend>
            <div className="win95-grid win95-grid-3">
              {barrierTypes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Happens-Before Guarantees</legend>
            <div className="win95-grid win95-grid-2">
              {happensBeforeRules.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                A correct barrier is a memory barrier: it enforces that all writes in phase k are visible to all participants in phase
                k+1. Without this, phase-based algorithms can observe partially updated state.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Common Use Cases</legend>
            <div className="win95-grid win95-grid-2">
              {commonUseCases.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Barrier Algorithms (Pseudocode)</legend>
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
            <legend>Barrier Playbook (Interactive)</legend>
            <div className="win95-panel">
              <p className="win95-text">
                Choose a workload pattern and observe how barriers enforce phase ordering. Then press ARRIVE to simulate threads
                reaching the barrier.
              </p>
              <div className="win95-grid win95-grid-3">
                {interactiveScenarios.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="win95-button"
                    onClick={() => {
                      setSelectedScenarioId(item.id)
                      setArrived(0)
                    }}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
              <div className="win95-panel win95-panel--raised">
                <p className="win95-text"><strong>{selectedScenario.title}</strong></p>
                <p className="win95-text">{selectedScenario.description}</p>
                <ol className="win95-list">
                  {selectedScenario.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
                <p className="win95-text"><strong>Takeaway:</strong> {selectedScenario.takeaway}</p>
              </div>
              <div className="win95-grid win95-grid-3">
                <button type="button" className="win95-button" onClick={handleArrive}>
                  ARRIVE
                </button>
                <button
                  type="button"
                  className="win95-button"
                  onClick={() => {
                    setArrived(0)
                    setGeneration(0)
                  }}
                >
                  RESET
                </button>
                <div className="win95-panel">
                  <p className="win95-text"><strong>Status:</strong> {barrierStatus}</p>
                </div>
              </div>
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
            <legend>Barrier Checklist</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {barrierChecklist.map((item) => (
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
