import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const bigPicture = [
  {
    title: 'What it is',
    details:
      'A classic synchronization problem with three smokers and an agent who places two of three ingredients on a table.',
    notes:
      'Each smoker has one ingredient and needs the other two to make a cigarette.',
  },
  {
    title: 'Why it matters',
    details:
      'It demonstrates coordination with shared resources, signaling, and avoiding busy-waiting.',
    notes:
      'It is a clean example of condition synchronization and correct semaphore usage.',
  },
  {
    title: 'What it teaches',
    details:
      'The difference between mutual exclusion, condition synchronization, and correct signaling.',
    notes:
      'Naive solutions can deadlock or starve a smoker.',
  },
]

const setup = [
  {
    title: 'Smokers',
    detail:
      'Three smokers: one has tobacco, one has paper, one has matches.',
  },
  {
    title: 'Agent',
    detail:
      'The agent places two random ingredients on the table and signals the smoker who has the third.',
  },
  {
    title: 'Goal',
    detail:
      'Only the smoker who has the missing ingredient should proceed; others should wait.',
  },
]

const history = [
  {
    title: '1971: Introduced by Patil',
    details:
      'The problem was introduced by Suhas Patil as a synchronization puzzle.',
    notes:
      'It became a standard OS/parallel programming example for signaling correctness.',
  },
  {
    title: '1970s+: Semaphore and monitor showcase',
    details:
      'Textbooks used it to teach semaphores and monitors because naive approaches fail subtly.',
    notes:
      'It highlights lost wakeups, incorrect signaling, and the difference between mutual exclusion and condition sync.',
  },
]

const howToThink = [
  {
    title: 'Think in events, not threads',
    detail:
      'The key is to signal the correct smoker when the right pair appears, not to let smokers poll.',
  },
  {
    title: 'Table is a shared state',
    detail:
      'You must protect the table so only one decision is made per agent placement.',
  },
  {
    title: 'Signals are conditional',
    detail:
      'A smoker should only be awakened when they can actually proceed.',
  },
  {
    title: 'Avoid busy waiting',
    detail:
      'Use semaphores or condition variables so smokers sleep until they are unblocked.',
  },
  {
    title: 'Matchmaker mindset',
    detail:
      'The agent provides a pair. Your job is to route that pair to the one smoker who can use it.',
  },
]

const stateModel = [
  {
    title: 'Table state',
    detail:
      'A shared state describing which ingredients are currently on the table.',
  },
  {
    title: 'Ingredient signals',
    detail:
      'Semaphores or condition variables for ingredient availability.',
  },
  {
    title: 'Smoker signals',
    detail:
      'A per-smoker semaphore that is released only when they can proceed.',
  },
  {
    title: 'Mutex',
    detail:
      'Protects shared state so pushers and agent do not race.',
  },
]

const commonSolutions = [
  {
    title: 'Naive signaling (wrong)',
    detail:
      'Agent signals two smokers or broadcasts; smokers race and check the table. This can lose signals.',
  },
  {
    title: 'Pusher pattern (classic)',
    detail:
      'Three pushers track which ingredients are present and signal the correct smoker exactly once.',
  },
  {
    title: 'Monitor solution',
    detail:
      'A monitor encapsulates the table state; condition variables signal the right smoker.',
  },
  {
    title: 'Message passing',
    detail:
      'Agent sends a message to a smoker channel; no shared table needed.',
  },
]

const pusherIdea = [
  {
    title: 'Pushers',
    detail:
      'One pusher per ingredient waits for that ingredient to appear.',
  },
  {
    title: 'State flags',
    detail:
      'Pushers update flags for other ingredients; if a pair is complete, signal the correct smoker.',
  },
  {
    title: 'Single signal',
    detail:
      'Only one smoker is released per agent placement, avoiding races and double consumption.',
  },
]

const stepByStep = [
  {
    title: 'Agent places ingredients',
    detail:
      'The agent puts two items on the table and signals the corresponding ingredient semaphores.',
  },
  {
    title: 'Pushers react',
    detail:
      'Each pusher checks if another ingredient flag is set; if so, it signals the correct smoker.',
  },
  {
    title: 'Smoker proceeds',
    detail:
      'Only the smoker with the missing ingredient wakes, makes a cigarette, and signals the agent.',
  },
  {
    title: 'Agent repeats',
    detail:
      'The agent waits for the smoker to finish before placing the next pair.',
  },
]

const correctnessNotes = [
  {
    title: 'Safety',
    detail:
      'At most one smoker proceeds per agent action, and only if they can make a cigarette.',
  },
  {
    title: 'Liveness',
    detail:
      'If the agent continues, every smoker will eventually be signaled (assuming random fair choice).',
  },
  {
    title: 'No lost wakeups',
    detail:
      'Signals are tied to actual availability; smokers do not miss their turn.',
  },
]

const failureModes = [
  {
    title: 'Lost wakeup',
    detail:
      'If a smoker checks the table before the agent signals, they can miss the event and sleep forever.',
  },
  {
    title: 'Double signaling',
    detail:
      'If two smokers are awakened for the same pair, both may try to consume, breaking correctness.',
  },
  {
    title: 'Table corruption',
    detail:
      'If pushers update flags without a mutex, both can assume the same ingredient and signal incorrectly.',
  },
]

const pitfalls = [
  {
    mistake: 'Broadcasting to all smokers',
    description:
      'Smokers can wake up, check the table, and go back to sleep, wasting CPU and risking lost signals.',
  },
  {
    mistake: 'Letting smokers inspect the table',
    description:
      'If multiple smokers read or modify the table, race conditions occur.',
  },
  {
    mistake: 'Missing mutual exclusion',
    description:
      'Table state must be protected. Two pushers can otherwise act on stale information.',
  },
  {
    mistake: 'Unfair signaling',
    description:
      'If the agent is biased, one smoker can starve. Add fairness if needed.',
  },
]

const comparisons = [
  {
    title: 'Smokers vs Dining Philosophers',
    detail:
      'Both model resource contention, but smokers is about correct signaling for shared resources, not deadlock on individual locks.',
  },
  {
    title: 'Smokers vs Producer-Consumer',
    detail:
      'Producer-consumer is about buffering and rate differences, smokers is about selecting the correct consumer.',
  },
  {
    title: 'Smokers vs Readers-Writers',
    detail:
      'Readers-writers is about access policy and priority. Smokers is about matching complementary resources.',
  },
  {
    title: 'Smokers vs Sleeping Barber',
    detail:
      'Barber is about queueing and service availability; smokers is about selecting the correct consumer.',
  },
  {
    title: 'Smokers vs Condition Variables',
    detail:
      'Smokers is a concrete example of why condition variables need a predicate and a loop.',
  },
]

const variants = [
  {
    title: 'More ingredients',
    detail:
      'Extending to k ingredients and k smokers increases the matching logic and the number of pushers.',
  },
  {
    title: 'Biased agent',
    detail:
      'If the agent chooses pairs non-uniformly, some smokers can starve without fairness controls.',
  },
  {
    title: 'Multiple tables',
    detail:
      'Parallel tables increase throughput but add coordination complexity and possible starvation.',
  },
]

const fairnessNotes = [
  {
    title: 'Random agent is not enough',
    detail:
      'Random choice does not guarantee fairness over finite time. Add rotation or quotas if needed.',
  },
  {
    title: 'Starvation prevention',
    detail:
      'Track which smoker has waited longest and bias the agent to serve them next.',
  },
]

const realWorldConnections = [
  {
    title: 'Event-driven systems',
    detail:
      'Matching events with handlers that have complementary prerequisites mirrors the smokers logic.',
  },
  {
    title: 'Workflow orchestration',
    detail:
      'Only when the correct pair of inputs is ready should the next stage run.',
  },
  {
    title: 'Message brokers',
    detail:
      'Routing messages to the correct consumer avoids noisy broadcasts and wasted work.',
  },
]

const semaphoreSketch = [
  {
    title: 'Semaphore-based structure',
    code: `semaphore tobacco = 0, paper = 0, match = 0
semaphore smokerT = 0, smokerP = 0, smokerM = 0
semaphore agent = 1
mutex table = 1
bool hasT = false, hasP = false, hasM = false`,
    explanation:
      'Separate semaphores for ingredients and smokers; pushers gate the correct smoker.',
  },
  {
    title: 'Agent (pseudo)',
    code: `agent:
  while true:
    wait(agent)
    choose two ingredients
    signal(ingredient1)
    signal(ingredient2)`,
    explanation:
      'Agent waits until a smoker finishes, then places the next pair.',
  },
  {
    title: 'Pusher for Tobacco (pseudo)',
    code: `pusherT:
  while true:
    wait(tobacco)
    lock(table)
    if hasP:
      hasP = false; signal(smokerM)
    else if hasM:
      hasM = false; signal(smokerP)
    else:
      hasT = true
    unlock(table)`,
    explanation:
      'Pushers coordinate using flags to detect pairs and signal the correct smoker.',
  },
]

const pseudocode = [
  {
    title: 'Agent loop (pseudo)',
    code: `while true:
  choose two ingredients
  place on table
  signal the pushers for those ingredients`,
    explanation:
      'Agent only signals ingredient availability. Pushers decide who smokes.',
  },
  {
    title: 'Pusher logic (pseudo)',
    code: `on ingredient X:
  lock table
  if Y is present:
    clear Y
    signal smoker with Z
  else if Z is present:
    clear Z
    signal smoker with Y
  else:
    mark X present
  unlock table`,
    explanation:
      'Pushers coordinate through shared flags to ensure exactly one smoker proceeds.',
  },
]

const keyTakeaways = [
  'The problem is about correct signaling, not just mutual exclusion.',
  'A clean solution separates placement (agent) from matching (pushers/monitor).',
  'Avoid polling; use semaphores or condition variables to sleep and wake appropriately.',
  'Fairness is not guaranteed unless you build it in.',
]

export default function CigaretteSmokersPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Cigarette Smokers Problem</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Coordinating complementary resources without chaos</div>
              <p className="win95-text">
                The Cigarette Smokers problem is a synchronization puzzle where an agent places two ingredients on a
                shared table. Only the smoker who has the third ingredient should proceed. This forces you to think
                about correct signaling and avoiding races, rather than just locking.
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
            <legend>Historical Context</legend>
            <div className="win95-grid win95-grid-2">
              {history.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.details}</p>
                  <p className="win95-text">{item.notes}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Problem Setup</legend>
            <div className="win95-grid win95-grid-2">
              {setup.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>State Model</legend>
            <div className="win95-grid win95-grid-2">
              {stateModel.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How to Think About It</legend>
            <div className="win95-grid win95-grid-2">
              {howToThink.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Step-by-Step Flow</legend>
            <div className="win95-grid win95-grid-2">
              {stepByStep.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Common Solution Patterns</legend>
            <div className="win95-grid win95-grid-2">
              {commonSolutions.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>The Pusher Pattern (Canonical Solution)</legend>
            <div className="win95-grid win95-grid-2">
              {pusherIdea.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                The pushers are the key: they remember which ingredients are on the table and wake exactly one smoker.
                This prevents races and wasted wakeups.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Correctness Notes</legend>
            <div className="win95-grid win95-grid-2">
              {correctnessNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Failure Modes</legend>
            <div className="win95-grid win95-grid-2">
              {failureModes.map((item) => (
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
            <legend>Compare and Contrast</legend>
            <div className="win95-grid win95-grid-2">
              {comparisons.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Variants and Extensions</legend>
            <div className="win95-grid win95-grid-2">
              {variants.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Fairness and Starvation</legend>
            <div className="win95-grid win95-grid-2">
              {fairnessNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Real-World Connections</legend>
            <div className="win95-grid win95-grid-3">
              {realWorldConnections.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Semaphore Sketch</legend>
            <div className="win95-stack">
              {semaphoreSketch.map((example) => (
                <div key={example.title} className="win95-panel">
                  <div className="win95-heading">{example.title}</div>
                  <pre className="win95-code">
                    <code>{example.code.trim()}</code>
                  </pre>
                  <p className="win95-text">{example.explanation}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Pseudocode Sketch</legend>
            <div className="win95-stack">
              {pseudocode.map((example) => (
                <div key={example.title} className="win95-panel">
                  <div className="win95-heading">{example.title}</div>
                  <pre className="win95-code">
                    <code>{example.code.trim()}</code>
                  </pre>
                  <p className="win95-text">{example.explanation}</p>
                </div>
              ))}
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
