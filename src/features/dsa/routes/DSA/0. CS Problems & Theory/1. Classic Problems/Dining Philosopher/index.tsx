import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'What It Is',
    details:
      'A classic thought experiment in computer science illustrating synchronization problems.',
    notes:
      'It models a set of processes (philosophers) that need to acquire shared, limited resources (forks) to perform a task (eat).',
  },
  {
    title: 'Why It Exists',
    details: 'To expose the dangers of deadlock and resource starvation in concurrent systems.',
    notes:
      'If every philosopher picks up their left fork simultaneously, no one can pick up their right fork, and they all wait forever.',
  },
  {
    title: 'Where It Shows Up',
    details:
      'Any system with shared resources: operating systems, database transaction managers, network protocols.',
    notes:
      'Think of processes needing exclusive access to files, database records, or hardware peripherals.',
  },
]

const history = [
  {
    title: '1965: Proposed by Edsger Dijkstra',
    details:
      'Dijkstra originally framed the problem as five computers trying to access five shared tape drives.',
    notes: 'His goal was to illustrate a specific deadlock scenario in a clear, memorable way.',
  },
  {
    title: '1971: Popularized by Tony Hoare',
    details:
      'Hoare, another titan of computer science, gave the problem its now-famous "Dining Philosophers" formulation.',
    notes:
      'This analogy made the abstract problem of resource allocation much more intuitive and widely taught.',
  },
]

const pillars = [
  {
    title: 'Mutual Exclusion',
    details: 'Only one philosopher can hold a fork at a time.',
    notes: 'The forks are non-shareable resources.',
  },
  {
    title: 'Hold and Wait',
    details: 'A philosopher holds one fork while waiting for the other.',
    notes: 'This is a necessary precondition for deadlock.',
  },
  {
    title: 'No Preemption',
    details: 'A fork cannot be forcibly taken from a philosopher.',
    notes: 'A philosopher must release the fork voluntarily.',
  },
  {
    title: 'Circular Wait',
    details: 'Each philosopher waits for a fork held by the next philosopher in the circle.',
    notes: 'This circular dependency is the direct cause of the deadlock.',
  },
]

const mentalModels = [
  {
    title: 'Roundtable Meeting',
    details:
      'Imagine a meeting where everyone needs two specific documents to review. Each person grabs the document on their left. Now they all must wait for the person on their right to finish with the document they need. No one can proceed.',
    notes: 'This maps directly to the philosophers, forks, and the resulting deadlock.',
  },
  {
    title: 'Single-Track Train Tunnel',
    details:
      'Two trains enter a long, single-track tunnel from opposite ends. They meet in the middle. Neither can move forward, and neither can back up easily. They are deadlocked.',
    notes:
      'This analogy is good for mutual exclusion and deadlock, but less so for the "circular" wait aspect of the multi-process original problem.',
  },
]

const howItWorks = [
  {
    step: 1,
    title: 'The Setup',
    details:
      'Five silent philosophers sit at a round table. In the center is a large bowl of spaghetti. Between each pair of adjacent philosophers is a single fork.',
  },
  {
    step: 2,
    title: 'The Goal',
    details:
      'To eat, a philosopher needs two forks: the one on their left and the one on their right. They can only pick up one fork at a time.',
  },
  {
    step: 3,
    title: 'The Process',
    details:
      'A philosopher thinks for a while. When they get hungry, they try to pick up their left fork, then their right fork. If successful, they eat. Then they put down both forks and go back to thinking.',
  },
  {
    step: 4,
    title: 'The Deadlock',
    details:
      'What if every philosopher gets hungry at the same time and picks up their left fork? Now, each philosopher is holding one fork and waiting for the right fork, which is held by their neighbor. They will all wait forever.',
  },
]

const complexityTable = [
  {
    approach: 'Naive (Deadlock Prone)',
    time: 'N/A (deadlocks)',
    space: 'O(N) for forks/philosophers',
    note: 'The simplest implementation directly models the problem and fails spectacularly.',
  },
  {
    approach: 'Resource Hierarchy (Solution)',
    time: 'No deadlock',
    space: 'O(N)',
    note: 'Number the forks 1 to 5. Philosophers must pick up the lower-numbered fork first. This breaks the circular wait.',
  },
  {
    approach: 'Arbitrator/Waiter (Solution)',
    time: 'No deadlock',
    space: 'O(N) + O(1) for arbitrator',
    note: 'A central "waiter" grants permission to pick up forks. This prevents circular dependencies by serializing requests.',
  },
  {
    approach: 'Chandy/Misra (Solution)',
    time: 'No deadlock or starvation',
    space: 'O(N)',
    note: 'Forks are clean or dirty. A complex but fair system ensuring everyone eventually eats. Overkill for most scenarios.',
  },
]

const applications = [
  {
    domain: 'Operating Systems',
    useCase: 'Process Scheduling',
    details:
      'OS schedulers manage processes that request exclusive access to resources like CPU cores, files, or printers. A deadlock here can freeze the entire system.',
    why: 'The OS must act as a "waiter" or enforce a resource hierarchy to prevent processes from deadlocking over I/O devices or kernel data structures.',
  },
  {
    domain: 'Database Systems',
    useCase: 'Transaction Locking',
    details:
      'Two concurrent transactions might each lock a table the other needs to proceed. Transaction A locks `Users` and waits for `Orders`, while Transaction B locks `Orders` and waits for `Users`.',
    why: 'Database engines implement deadlock detection and resolution, often by killing one transaction and rolling it back to allow the other to proceed.',
  },
  {
    domain: 'Networking',
    useCase: 'Routing Protocols',
    details:
      'In older routing protocols, it was possible for a set of routers to enter a state where they would forward packets to each other in a loop, never reaching the destination. Each router waits for the next one to have a better path.',
    why: 'Modern protocols use techniques like split horizon or poison reverse, which are forms of breaking circular dependencies, to prevent these "routing loops".',
  },
]

const pitfalls = [
  {
    mistake: 'Solving Deadlock but Creating Starvation',
    description:
      'A solution might prevent deadlock but still allow a single philosopher to never get a chance to eat. For example, if two aggressive philosophers on either side of a timid one constantly take the forks before the timid one can.',
  },
  {
    mistake: 'Using Timeouts to "Fix" Deadlock',
    description:
      'A common but fragile approach is to have a philosopher drop their fork if they wait too long for the second one. This can lead to "livelock", where philosophers repeatedly pick up and put down forks without making progress.',
  },
  {
    mistake: 'Off-by-One Errors in Resource Indexing',
    description:
      'When implementing the resource hierarchy solution, mistakes in indexing the forks (e.g., `(i + 1) % N`) can fail to break the circular wait for the last philosopher.',
  },
]

const whenToUse = [
  {
    criteria: 'As an educational tool',
    guidance:
      'It is the go-to example for introducing concurrency issues like deadlock and starvation in any CS curriculum.',
  },
  {
    criteria: 'During system design reviews',
    guidance:
      'Use it as a mental model. "Are we creating a Dining Philosophers scenario here?" can be a powerful question when multiple services need to lock multiple shared resources.',
  },
  {
    criteria: 'When designing locking protocols',
    guidance:
      'If you are building a system that requires entities to acquire multiple locks or resources, the solutions to this problem (hierarchy, arbitrator) are directly applicable patterns.',
  },
]

const advanced = [
  {
    title: 'The Chandy/Misra Solution',
    rationale:
      'A distributed solution where philosophers communicate with each other. Forks are "dirty" or "clean". It is provably fair (no starvation) but highly complex to implement compared to simpler centralized or hierarchical solutions.',
  },
  {
    title: 'Limiting Concurrency',
    rationale:
      'Allow at most N-1 philosophers at the table at any time. This guarantees that at least one philosopher can always acquire both forks, breaking the possibility of a deadlock. It is simple but can be overly restrictive.',
  },
]

const codeExamples = [
  {
    title: 'Deadlock-Prone Python (Conceptual)',
    language: 'python',
    code: `
import threading
import time
import random

class Philosopher(threading.Thread):
    def __init__(self, name, left_fork, right_fork):
        threading.Thread.__init__(self)
        self.name = name
        self.left_fork = left_fork
        self.right_fork = right_fork

    def run(self):
        while True:
            print(f"{self.name} is thinking.")
            time.sleep(random.randint(1, 5))
            print(f"{self.name} is hungry.")

            # This is the danger zone!
            self.left_fork.acquire()
            print(f"{self.name} picked up left fork.")
            self.right_fork.acquire()
            print(f"{self.name} picked up right fork and is eating.")
            time.sleep(random.randint(1, 5))
            self.right_fork.release()
            self.left_fork.release()

# Setup (Conceptual - this will deadlock)
forks = [threading.Lock() for n in range(5)]
philosophers = [
    Philosopher(f"Philosopher {i}", forks[i], forks[(i + 1) % 5])
    for i in range(5)
]

for p in philosophers:
    p.start()
`,
    explanation:
      'This Python code models the problem directly using threads and locks. Each philosopher tries to acquire the left, then the right fork. If all threads run in lockstep, they will all acquire their left fork and then wait indefinitely for the right, causing a deadlock.',
  },
  {
    title: 'Resource Hierarchy Solution in Go',
    language: 'go',
    code: `
package main

import (
    "fmt"
    "sync"
    "time"
)

type Philosopher struct {
    id                  int
    leftFork, rightFork int
}

func (p *Philosopher) dine(wg *sync.WaitGroup, forks []*sync.Mutex) {
    defer wg.Done()
    fmt.Printf("Philosopher %d is thinking.\\n", p.id)
    time.Sleep(time.Second)

    // Enforce hierarchy: always lock smaller index fork first
    if p.leftFork < p.rightFork {
        forks[p.leftFork].Lock()
        forks[p.rightFork].Lock()
    } else {
        forks[p.rightFork].Lock()
        forks[p.leftFork].Lock()
    }

    fmt.Printf("Philosopher %d is eating.\\n", p.id)
    time.Sleep(time.Second)

    forks[p.leftFork].Unlock()
    forks[p.rightFork].Unlock()
    fmt.Printf("Philosopher %d is done eating.\\n", p.id)
}

func main() {
    numPhilosophers := 5
    forks := make([]*sync.Mutex, numPhilosophers)
    for i := 0; i < numPhilosophers; i++ {
        forks[i] = &sync.Mutex{}
    }

    philosophers := make([]*Philosopher, numPhilosophers)
    for i := 0; i < numPhilosophers; i++ {
        philosophers[i] = &Philosopher{
            id: i + 1,
            leftFork: i,
            rightFork: (i + 1) % numPhilosophers,
        }
    }

    var wg sync.WaitGroup
    for i := 0; i < numPhilosophers; i++ {
        wg.Add(1)
        go philosophers[i].dine(&wg, forks)
    }
    wg.Wait()
}
`,
    explanation:
      'This Go example implements the resource hierarchy solution. By comparing the indices of the forks and always locking the one with the smaller index first, it breaks the "circular wait" condition. The last philosopher, instead of reaching for fork 5 then 1, will reach for 1 then 5, preventing the deadlock.',
  },
]

const keyTakeaways = [
  'Deadlock requires four conditions: mutual exclusion, hold and wait, no preemption, and circular wait.',
  'Breaking just one of the four conditions is enough to prevent deadlock.',
  'The most common and practical solution is to enforce a resource ordering (hierarchy).',
  'The problem is a metaphor for a huge class of real-world resource allocation problems in computing.',
  'Beware of solutions that prevent deadlock but introduce starvation or livelock.',
]

const glossary = [
  {
    term: 'Deadlock',
    definition:
      'A state where each participant is waiting forever for a resource held by someone else.',
  },
  {
    term: 'Starvation',
    definition:
      'A process repeatedly loses access to resources and never makes progress, even though the system keeps running.',
  },
  {
    term: 'Livelock',
    definition:
      'Processes keep reacting to each other and changing state, but useful work never completes.',
  },
  {
    term: 'Mutual Exclusion',
    definition: 'A resource can be held by only one participant at a time.',
  },
  {
    term: 'Hold and Wait',
    definition: 'A participant keeps one resource while waiting for another.',
  },
  {
    term: 'No Preemption',
    definition: 'A resource cannot be forcibly taken away; it must be released voluntarily.',
  },
  {
    term: 'Circular Wait',
    definition: 'Each participant waits on the next participant in a closed dependency cycle.',
  },
  {
    term: 'Resource Hierarchy',
    definition: 'An ordering rule that forces resources to be acquired in a consistent sequence.',
  },
  {
    term: 'Arbitrator / Waiter',
    definition: 'A central authority that controls who is allowed to request resources.',
  },
  {
    term: 'Chandy/Misra',
    definition: 'A distributed, fairness-oriented solution that tracks clean and dirty forks.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const diningHelpStyles = `
.dp-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.dp-help-window {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: #c0c0c0;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  box-sizing: border-box;
}

.dp-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 24px;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.dp-help-title {
  position: absolute;
  inset: 0 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  font-size: 16px;
  white-space: nowrap;
}

.dp-help-controls {
  margin-left: auto;
  display: flex;
  gap: 2px;
}

.dp-help-control {
  width: 18px;
  height: 16px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #c0c0c0;
  color: #000;
  text-decoration: none;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  font: inherit;
  font-size: 11px;
  line-height: 1;
  cursor: pointer;
}

.dp-help-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.dp-help-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  color: #000;
  padding: 5px 10px 4px;
  font: inherit;
  font-size: 12px;
  cursor: pointer;
}

.dp-help-tab.is-active {
  position: relative;
  top: 1px;
  background: #fff;
}

.dp-help-main {
  display: grid;
  grid-template-columns: 240px 1fr;
  flex: 1;
  min-height: 0;
  background: #fff;
  border-top: 1px solid #404040;
}

.dp-help-toc {
  overflow: auto;
  background: #f2f2f2;
  border-right: 1px solid #808080;
  padding: 12px;
}

.dp-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.dp-help-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.dp-help-toc-list li {
  margin: 0 0 8px;
}

.dp-help-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.dp-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.dp-help-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.dp-help-section {
  margin: 0 0 20px;
}

.dp-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.dp-help-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.dp-help-content p,
.dp-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.dp-help-content p {
  margin: 0 0 10px;
}

.dp-help-content ul,
.dp-help-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.dp-help-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.dp-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  overflow: auto;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.dp-help-codebox code {
  display: block;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
}

@media (max-width: 900px) {
  .dp-help-main {
    grid-template-columns: 1fr;
  }

  .dp-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 560px) {
  .dp-help-title {
    inset: 0 44px;
    font-size: 13px;
  }

  .dp-help-content {
    padding: 12px 14px 16px;
  }
}
`

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-history', label: 'Historical Context' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-pillars', label: 'Deadlock Conditions' },
    { id: 'core-mental-models', label: 'Mental Models' },
    { id: 'core-solutions', label: 'Solution Strategies' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-when', label: 'When To Apply It' },
    { id: 'core-advanced', label: 'Advanced Considerations' },
  ],
  examples: [
    { id: 'ex-scenario', label: 'Step-by-Step Scenario' },
    { id: 'ex-applications', label: 'Real-World Applications' },
    { id: 'ex-code', label: 'Code Examples' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

function isTabId(value: string | null): value is TabId {
  return (
    value === 'big-picture' ||
    value === 'core-concepts' ||
    value === 'examples' ||
    value === 'glossary'
  )
}

export default function DiningPhilosophersPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const tabParam = searchParams.get('tab')
  const activeTab: TabId = isTabId(tabParam) ? tabParam : 'big-picture'
  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Dining Philosophers (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleTabChange = (tabId: TabId) => {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('tab', tabId)
    setSearchParams(nextParams)
  }

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Dining Philosophers',
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
    <div className="dp-help-page">
      <style>{diningHelpStyles}</style>
      <div className="dp-help-window" role="presentation">
        <header className="dp-help-titlebar">
          <span className="dp-help-title">Dining Philosophers</span>
          <div className="dp-help-controls">
            <button
              className="dp-help-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="dp-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="dp-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`dp-help-tab ${activeTab === tab.id ? 'is-active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="dp-help-main">
          <aside className="dp-help-toc" aria-label="Table of contents">
            <h2 className="dp-help-toc-title">Contents</h2>
            <ul className="dp-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="dp-help-content">
            <h1 className="dp-help-doc-title">Dining Philosophers</h1>
            <p>
              The Dining Philosophers problem is a thought experiment that illustrates a set of
              fundamental challenges in concurrent programming. When multiple processes must compete
              for a finite set of shared resources, how do you design a protocol that ensures nobody
              gets stuck waiting forever?
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="dp-help-section">
                  <h2 className="dp-help-heading">Overview</h2>
                  {bigPicture.map((item) => (
                    <div key={item.title}>
                      <h3 className="dp-help-subheading">{item.title}</h3>
                      <p>{item.details}</p>
                      <p>{item.notes}</p>
                    </div>
                  ))}
                </section>

                <hr className="dp-help-divider" />

                <section id="bp-history" className="dp-help-section">
                  <h2 className="dp-help-heading">Historical Context</h2>
                  {history.map((item) => (
                    <div key={item.title}>
                      <h3 className="dp-help-subheading">{item.title}</h3>
                      <p>{item.details}</p>
                      <p>{item.notes}</p>
                    </div>
                  ))}
                </section>

                <hr className="dp-help-divider" />

                <section id="bp-takeaways" className="dp-help-section">
                  <h2 className="dp-help-heading">Key Takeaways</h2>
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
                <section id="core-pillars" className="dp-help-section">
                  <h2 className="dp-help-heading">The Four Conditions of Deadlock</h2>
                  {pillars.map((item) => (
                    <div key={item.title}>
                      <h3 className="dp-help-subheading">{item.title}</h3>
                      <p>{item.details}</p>
                      <p>{item.notes}</p>
                    </div>
                  ))}
                </section>

                <section id="core-mental-models" className="dp-help-section">
                  <h2 className="dp-help-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <div key={item.title}>
                      <h3 className="dp-help-subheading">{item.title}</h3>
                      <p>{item.details}</p>
                      <p>{item.notes}</p>
                    </div>
                  ))}
                </section>

                <section id="core-solutions" className="dp-help-section">
                  <h2 className="dp-help-heading">Solution Strategies</h2>
                  {complexityTable.map((row) => (
                    <div key={row.approach}>
                      <h3 className="dp-help-subheading">{row.approach}</h3>
                      <p>
                        <strong>Time:</strong> {row.time}
                      </p>
                      <p>
                        <strong>Space:</strong> {row.space}
                      </p>
                      <p>{row.note}</p>
                    </div>
                  ))}
                </section>

                <section id="core-pitfalls" className="dp-help-section">
                  <h2 className="dp-help-heading">Common Pitfalls and Traps</h2>
                  <ul>
                    {pitfalls.map((pitfall) => (
                      <li key={pitfall.mistake}>
                        <strong>{pitfall.mistake}:</strong> {pitfall.description}
                      </li>
                    ))}
                  </ul>
                </section>

                <section id="core-when" className="dp-help-section">
                  <h2 className="dp-help-heading">When To Think About This Problem</h2>
                  <ul>
                    {whenToUse.map((item) => (
                      <li key={item.criteria}>
                        <strong>{item.criteria}:</strong> {item.guidance}
                      </li>
                    ))}
                  </ul>
                </section>

                <section id="core-advanced" className="dp-help-section">
                  <h2 className="dp-help-heading">Advanced Considerations</h2>
                  {advanced.map((item) => (
                    <div key={item.title}>
                      <h3 className="dp-help-subheading">{item.title}</h3>
                      <p>{item.rationale}</p>
                    </div>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                <section id="ex-scenario" className="dp-help-section">
                  <h2 className="dp-help-heading">Step-by-Step Scenario</h2>
                  <ol>
                    {howItWorks.map((item) => (
                      <li key={item.step}>
                        <strong>
                          Step {item.step}: {item.title}
                        </strong>{' '}
                        {item.details}
                      </li>
                    ))}
                  </ol>
                </section>

                <section id="ex-applications" className="dp-help-section">
                  <h2 className="dp-help-heading">Real-World Applications</h2>
                  {applications.map((app) => (
                    <div key={app.useCase}>
                      <h3 className="dp-help-subheading">
                        {app.domain}: {app.useCase}
                      </h3>
                      <p>{app.details}</p>
                      <p>{app.why}</p>
                    </div>
                  ))}
                  <h3 className="dp-help-subheading">A Failure Story: Therac-25</h3>
                  <p>
                    The Therac-25 radiation therapy machine (1980s) was responsible for several
                    patient deaths due to massive overdoses of radiation. One root cause was a race
                    condition, a problem related to concurrency control. The software controlling
                    the machine had no proper locking mechanism (like the forks for philosophers),
                    allowing a fast-typing operator to enter settings in a way the developers did
                    not anticipate, putting the machine into an unsafe state that delivered lethal
                    radiation. It serves as a grim reminder that concurrency bugs can have
                    catastrophic, real-world consequences.
                  </p>
                </section>

                <section id="ex-code" className="dp-help-section">
                  <h2 className="dp-help-heading">Code Examples</h2>
                  {codeExamples.map((example) => (
                    <div key={example.title}>
                      <h3 className="dp-help-subheading">
                        {example.title} ({example.language})
                      </h3>
                      <pre className="dp-help-codebox">
                        <code>{example.code.trim()}</code>
                      </pre>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="dp-help-section">
                <h2 className="dp-help-heading">Glossary</h2>
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
