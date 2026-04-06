import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

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

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const win98HelpStyles = `
.sb98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.sb98-window {
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
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

.sb98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.sb98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.sb98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.sb98-control {
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
  padding: 0;
}

.sb98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
  overflow-x: auto;
}

.sb98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
  white-space: nowrap;
}

.sb98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.sb98-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.sb98-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.sb98-toc-title {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 10px;
}

.sb98-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.sb98-toc-list li {
  margin: 0 0 8px;
}

.sb98-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.sb98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.sb98-doc-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px;
}

.sb98-section {
  margin: 0 0 20px;
}

.sb98-heading {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px;
}

.sb98-subheading {
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 6px;
}

.sb98-content p,
.sb98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.sb98-content p {
  margin: 0 0 10px;
}

.sb98-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.sb98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.sb98-codebox {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 8px;
  margin: 6px 0 10px;
}

.sb98-codebox code {
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
  display: block;
}

@media (max-width: 900px) {
  .sb98-main {
    grid-template-columns: 1fr;
  }

  .sb98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .sb98-title-text {
    font-size: 13px;
  }
}
`

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-history', label: 'Historical Context' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-setup', label: 'Problem Setup' },
    { id: 'core-goals', label: 'Correctness Goals' },
    { id: 'core-claims', label: 'Key Claims' },
    { id: 'core-model', label: 'Formal Model' },
    { id: 'core-patterns', label: 'Algorithm Patterns' },
    { id: 'core-variations', label: 'Variations' },
    { id: 'core-applications', label: 'Applications' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
  ],
  examples: [{ id: 'ex-pseudocode', label: 'Pseudocode Reference' }],
  glossary: [{ id: 'glossary-terms', label: 'Quick Glossary' }],
}

export default function SleepingBarberPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    const tab = searchParams.get('tab')
    return isTabId(tab) ? tab : 'big-picture'
  })

  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Sleeping Barber (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Sleeping Barber',
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
    <div className="sb98-help-page">
      <style>{win98HelpStyles}</style>
      <div className="sb98-window" role="presentation">
        <header className="sb98-titlebar">
          <span className="sb98-title-text">Sleeping Barber</span>
          <div className="sb98-title-controls">
            <button className="sb98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="sb98-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>
        <div className="sb98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`sb98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="sb98-main">
          <aside className="sb98-toc" aria-label="Table of contents">
            <h2 className="sb98-toc-title">Contents</h2>
            <ul className="sb98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="sb98-content">
            <h1 className="sb98-doc-title">Sleeping Barber</h1>
            <p>
              The sleeping barber problem models a server that sleeps when idle and wakes when clients arrive, but with a bounded
              waiting room. It captures blocking, admission control, and signaling in a simple and rigorous setting. This page
              presents the formal model, core invariants, and standard semaphore/condition-variable solutions.
            </p>
            <p>
              <Link to="/algoViz">Back to Catalog</Link>
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="sb98-section">
                  <h2 className="sb98-heading">Overview</h2>
                  {bigPicture.map((item) => (
                    <div key={item.title}>
                      <h3 className="sb98-subheading">{item.title}</h3>
                      <p>{item.details}</p>
                      <p>{item.notes}</p>
                    </div>
                  ))}
                </section>
                <hr className="sb98-divider" />
                <section id="bp-history" className="sb98-section">
                  <h2 className="sb98-heading">Historical Context</h2>
                  {historicalContext.map((item) => (
                    <div key={item.title}>
                      <h3 className="sb98-subheading">{item.title}</h3>
                      <p>{item.details}</p>
                      <p>{item.notes}</p>
                    </div>
                  ))}
                </section>
                <hr className="sb98-divider" />
                <section id="bp-takeaways" className="sb98-section">
                  <h2 className="sb98-heading">Key Takeaways</h2>
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
                <section id="core-setup" className="sb98-section">
                  <h2 className="sb98-heading">Problem Setup</h2>
                  {problemSetup.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-goals" className="sb98-section">
                  <h2 className="sb98-heading">Correctness Goals</h2>
                  {correctnessGoals.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    Safety constrains occupancy and waiting limits; liveness ensures the barber eventually serves waiting
                    customers.
                  </p>
                </section>
                <section id="core-claims" className="sb98-section">
                  <h2 className="sb98-heading">Key Claims</h2>
                  {keyClaims.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-model" className="sb98-section">
                  <h2 className="sb98-heading">Formal Model</h2>
                  {formalModel.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-patterns" className="sb98-section">
                  <h2 className="sb98-heading">Algorithm Patterns</h2>
                  {algorithmPatterns.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-variations" className="sb98-section">
                  <h2 className="sb98-heading">Variations</h2>
                  {variations.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-applications" className="sb98-section">
                  <h2 className="sb98-heading">Applications</h2>
                  {applications.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="sb98-section">
                  <h2 className="sb98-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((pitfall) => (
                      <li key={pitfall.mistake}>
                        <strong>{pitfall.mistake}:</strong> {pitfall.description}
                      </li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <section id="ex-pseudocode" className="sb98-section">
                <h2 className="sb98-heading">Pseudocode Reference</h2>
                {pseudocode.map((example) => (
                  <div key={example.title}>
                    <h3 className="sb98-subheading">{example.title}</h3>
                    <div className="sb98-codebox">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </div>
                ))}
              </section>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="sb98-section">
                <h2 className="sb98-heading">Quick Glossary</h2>
                {quickGlossary.map((item) => (
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
