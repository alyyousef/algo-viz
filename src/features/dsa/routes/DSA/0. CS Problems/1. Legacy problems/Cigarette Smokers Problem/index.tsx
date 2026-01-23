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
