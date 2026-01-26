import { Link } from 'react-router-dom'

import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'What it is',
    details:
      'A classic synchronization problem modeling a barber shop with one barber, one barber chair, and a limited waiting room.',
    notes:
      'Customers either wait, get a haircut immediately, or leave if the shop is full.',
  },
  {
    title: 'Why it matters',
    details:
      'It captures real-world bounded-resource scheduling with arrivals, service, and blocking.',
    notes:
      'The problem teaches how to coordinate sleep/wake behavior using semaphores or condition variables.',
  },
  {
    title: 'What it teaches',
    details:
      'Correctness requires mutual exclusion, proper signaling, and avoiding lost wakeups.',
    notes:
      'It distinguishes safety (no two customers in the chair) from liveness (the barber eventually works).',
  },
]

const historicalContext = [
  {
    title: 'Origins in OS pedagogy',
    details:
      'The sleeping barber problem is a canonical example for teaching synchronization and process coordination.',
    notes:
      'It appears alongside dining philosophers and producer-consumer in OS textbooks.',
  },
  {
    title: 'Semaphore-based solutions',
    details:
      'The problem is often solved using counting semaphores to track customers and available chairs.',
    notes:
      'It demonstrates the usefulness of blocking primitives over busy-waiting.',
  },
  {
    title: 'Modern analogs',
    details:
      'Today it maps to server queues, rate-limited APIs, and bounded job schedulers.',
    notes:
      'The same patterns appear in thread pools and service systems.',
  },
]

const quickGlossary = [
  {
    term: 'Barber chair',
    definition: 'The single service resource; at most one customer is served at a time.',
  },
  {
    term: 'Waiting room',
    definition: 'A finite buffer of waiting customers (bounded capacity).',
  },
  {
    term: 'Customer arrival',
    definition: 'An event that either joins the queue or is rejected when full.',
  },
  {
    term: 'Semaphore',
    definition: 'A synchronization primitive with wait/signal operations.',
  },
  {
    term: 'Sleeping barber',
    definition: 'The barber blocks when there are no customers.',
  },
  {
    term: 'Lost wakeup',
    definition: 'A missed signal that leaves a thread asleep when it should proceed.',
  },
]

const problemSetup = [
  {
    title: 'Actors',
    detail: 'One barber (server) and many customers (clients).',
  },
  {
    title: 'Resources',
    detail: 'One barber chair and N waiting chairs.',
  },
  {
    title: 'Rules',
    detail: 'If the barber is idle, he sleeps; customers wake him. If all chairs are full, customers leave.',
  },
  {
    title: 'Goal',
    detail: 'Serve customers in a safe and deadlock-free manner with bounded waiting.',
  },
]

const correctnessGoals = [
  {
    title: 'Mutual exclusion',
    detail: 'Only one customer can occupy the barber chair at a time.',
  },
  {
    title: 'Boundedness',
    detail: 'The number of waiting customers never exceeds the number of chairs.',
  },
  {
    title: 'No lost wakeups',
    detail: 'A customer arrival must wake the barber if he is sleeping.',
  },
  {
    title: 'Progress',
    detail: 'If customers exist, the barber eventually serves them.',
  },
]

const keyClaims = [
  {
    title: 'The waiting room is a bounded buffer',
    detail: 'Customers fill a finite queue; arrivals are blocked or dropped when full.',
  },
  {
    title: 'Signaling must be precise',
    detail: 'Incorrect semaphore order can cause deadlock or lost wakeups.',
  },
  {
    title: 'Sleeping is efficient',
    detail: 'Blocking avoids busy-waiting when the shop is empty.',
  },
  {
    title: 'Fairness is policy-dependent',
    detail: 'Simple solutions may not guarantee FIFO service without extra structure.',
  },
]

const formalModel = [
  {
    title: 'State variables',
    detail: 'waiting = number of customers in the waiting room; 0 <= waiting <= N.',
  },
  {
    title: 'Events',
    detail: 'customer_arrival, barber_sleep, barber_wakeup, haircut_start, haircut_end.',
  },
  {
    title: 'Safety invariant',
    detail: 'At most one customer is in the barber chair at any time.',
  },
  {
    title: 'Liveness condition',
    detail: 'If waiting > 0, barber eventually performs haircut_start.',
  },
]

const algorithmPatterns = [
  {
    title: 'Semaphores',
    detail: 'Use a mutex for the waiting count, a customer semaphore, and a barber semaphore.',
  },
  {
    title: 'Condition variables',
    detail: 'Use a mutex plus condition variables for customers and barber state.',
  },
  {
    title: 'Message-passing',
    detail: 'Treat the barber as a server that receives customer requests from a queue.',
  },
  {
    title: 'Fair scheduling',
    detail: 'Maintain an explicit queue for FIFO service.',
  },
]

const pseudocode = [
  {
    title: 'Semaphore solution (classic)',
    code: `semaphore customers = 0
semaphore barber = 0
mutex = 1
waiting = 0

barber():
  while true:
    wait(customers)
    wait(mutex)
    waiting--
    signal(barber)
    signal(mutex)
    cut_hair()

customer():
  wait(mutex)
  if waiting < N:
    waiting++
    signal(customers)
    signal(mutex)
    wait(barber)
    get_haircut()
  else:
    signal(mutex)
    leave()`,
    explanation:
      'A customer either joins the queue and wakes the barber or leaves if full.',
  },
  {
    title: 'Condition variable idea',
    code: `mutex m
cond hasCustomer
waiting = 0

barber():
  lock(m)
  while waiting == 0:
    wait(hasCustomer, m)
  waiting--
  unlock(m)
  cut_hair()

customer():
  lock(m)
  if waiting < N:
    waiting++
    signal(hasCustomer)
    unlock(m)
    get_haircut()
  else:
    unlock(m)
    leave()`,
    explanation:
      'The barber sleeps on a condition variable when there are no customers.',
  },
]

const pitfalls = [
  {
    mistake: 'Forgetting to protect waiting count',
    description: 'Updates to waiting must be protected by a mutex to avoid races.',
  },
  {
    mistake: 'Signaling before enqueueing',
    description: 'If the signal comes before the state update, the barber may sleep again.',
  },
  {
    mistake: 'Overlooking FIFO order',
    description: 'Without a queue, fairness is not guaranteed.',
  },
  {
    mistake: 'Busy-waiting',
    description: 'Spinning wastes CPU; blocking primitives are required.',
  },
]

const variations = [
  {
    title: 'Multiple barbers',
    detail: 'Extend with a pool of servers and shared waiting room.',
  },
  {
    title: 'Priority customers',
    detail: 'Use priority queues to model VIP customers.',
  },
  {
    title: 'Timed waiting',
    detail: 'Customers may leave after a timeout even if seats are available.',
  },
  {
    title: 'Stochastic arrivals',
    detail: 'Queueing theory models arrival/service rates and expected wait times.',
  },
]

const applications = [
  {
    title: 'Web servers',
    detail: 'Request queues with limited capacity; overflow requests are dropped or retried.',
  },
  {
    title: 'Thread pools',
    detail: 'Worker threads sleep when no tasks are queued, wake when tasks arrive.',
  },
  {
    title: 'Call centers',
    detail: 'Agents serve callers with a bounded waiting queue.',
  },
  {
    title: 'Rate-limited services',
    detail: 'Clients may be rejected when queues are saturated.',
  },
]

const keyTakeaways = [
  'The waiting room is a bounded buffer with explicit admission control.',
  'Proper signaling prevents lost wakeups and ensures progress.',
  'Semaphore and condition-variable solutions are both standard.',
  'Fairness requires additional scheduling discipline.',
  'The same pattern appears in many client-server systems.',
]

export default function SleepingBarberPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Sleeping Barber</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Bounded waiting and sleep/wakeup synchronization</div>
              <p className="win95-text">
                The sleeping barber problem models a server that sleeps when idle and wakes when clients arrive, but with a bounded
                waiting room. It captures blocking, admission control, and signaling in a simple and rigorous setting. This page
                presents the formal model, core invariants, and standard semaphore/condition-variable solutions.
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
              {historicalContext.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.details}</p>
                  <p className="win95-text">{item.notes}</p>
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
            <legend>Problem Setup</legend>
            <div className="win95-grid win95-grid-2">
              {problemSetup.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Correctness Goals</legend>
            <div className="win95-grid win95-grid-2">
              {correctnessGoals.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                Safety constrains occupancy and waiting limits; liveness ensures the barber eventually serves waiting customers.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Key Claims</legend>
            <div className="win95-grid win95-grid-2">
              {keyClaims.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Formal Model</legend>
            <div className="win95-grid win95-grid-2">
              {formalModel.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Algorithm Patterns</legend>
            <div className="win95-grid win95-grid-2">
              {algorithmPatterns.map((item) => (
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
            <legend>Variations</legend>
            <div className="win95-grid win95-grid-2">
              {variations.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Applications</legend>
            <div className="win95-grid win95-grid-2">
              {applications.map((item) => (
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
