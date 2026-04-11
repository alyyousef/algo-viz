import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'What it is',
    details:
      'A classic synchronization problem with three smokers and an agent who places two of three ingredients on a table.',
    notes: 'Each smoker has one ingredient and needs the other two to make a cigarette.',
  },
  {
    title: 'Why it matters',
    details:
      'It demonstrates coordination with shared resources, signaling, and avoiding busy-waiting.',
    notes: 'It is a clean example of condition synchronization and correct semaphore usage.',
  },
  {
    title: 'What it teaches',
    details:
      'The difference between mutual exclusion, condition synchronization, and correct signaling.',
    notes: 'Naive solutions can deadlock or starve a smoker.',
  },
]

const setup = [
  {
    title: 'Smokers',
    detail: 'Three smokers: one has tobacco, one has paper, one has matches.',
  },
  {
    title: 'Agent',
    detail:
      'The agent places two random ingredients on the table and signals the smoker who has the third.',
  },
  {
    title: 'Goal',
    detail: 'Only the smoker who has the missing ingredient should proceed; others should wait.',
  },
]

const history = [
  {
    title: '1971: Introduced by Patil',
    details: 'The problem was introduced by Suhas Patil as a synchronization puzzle.',
    notes: 'It became a standard OS/parallel programming example for signaling correctness.',
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
    detail: 'You must protect the table so only one decision is made per agent placement.',
  },
  {
    title: 'Signals are conditional',
    detail: 'A smoker should only be awakened when they can actually proceed.',
  },
  {
    title: 'Avoid busy waiting',
    detail: 'Use semaphores or condition variables so smokers sleep until they are unblocked.',
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
    detail: 'A shared state describing which ingredients are currently on the table.',
  },
  {
    title: 'Ingredient signals',
    detail: 'Semaphores or condition variables for ingredient availability.',
  },
  {
    title: 'Smoker signals',
    detail: 'A per-smoker semaphore that is released only when they can proceed.',
  },
  {
    title: 'Mutex',
    detail: 'Protects shared state so pushers and agent do not race.',
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
    detail: 'A monitor encapsulates the table state; condition variables signal the right smoker.',
  },
  {
    title: 'Message passing',
    detail: 'Agent sends a message to a smoker channel; no shared table needed.',
  },
]

const pusherIdea = [
  {
    title: 'Pushers',
    detail: 'One pusher per ingredient waits for that ingredient to appear.',
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
    detail: 'The agent waits for the smoker to finish before placing the next pair.',
  },
]

const correctnessNotes = [
  {
    title: 'Safety',
    detail: 'At most one smoker proceeds per agent action, and only if they can make a cigarette.',
  },
  {
    title: 'Liveness',
    detail:
      'If the agent continues, every smoker will eventually be signaled (assuming random fair choice).',
  },
  {
    title: 'No lost wakeups',
    detail: 'Signals are tied to actual availability; smokers do not miss their turn.',
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
    description: 'If multiple smokers read or modify the table, race conditions occur.',
  },
  {
    mistake: 'Missing mutual exclusion',
    description:
      'Table state must be protected. Two pushers can otherwise act on stale information.',
  },
  {
    mistake: 'Unfair signaling',
    description: 'If the agent is biased, one smoker can starve. Add fairness if needed.',
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
    detail: 'Smokers is a concrete example of why condition variables need a predicate and a loop.',
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
    detail: 'Track which smoker has waited longest and bias the agent to serve them next.',
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
    detail: 'Only when the correct pair of inputs is ready should the next stage run.',
  },
  {
    title: 'Message brokers',
    detail: 'Routing messages to the correct consumer avoids noisy broadcasts and wasted work.',
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
    explanation: 'Agent waits until a smoker finishes, then places the next pair.',
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
    explanation: 'Pushers coordinate using flags to detect pairs and signal the correct smoker.',
  },
]

const pseudocode = [
  {
    title: 'Agent loop (pseudo)',
    code: `while true:
  choose two ingredients
  place on table
  signal the pushers for those ingredients`,
    explanation: 'Agent only signals ingredient availability. Pushers decide who smokes.',
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
    explanation: 'Pushers coordinate through shared flags to ensure exactly one smoker proceeds.',
  },
]

const keyTakeaways = [
  'The problem is about correct signaling, not just mutual exclusion.',
  'A clean solution separates placement (agent) from matching (pushers/monitor).',
  'Avoid polling; use semaphores or condition variables to sleep and wake appropriately.',
  'Fairness is not guaranteed unless you build it in.',
]

const glossary = [
  {
    term: 'Condition synchronization',
    definition: 'Coordination based on events or state predicates, not just exclusive access.',
  },
  {
    term: 'Pusher',
    definition:
      'A helper thread or routine that tracks ingredient arrivals and signals the correct smoker.',
  },
  {
    term: 'Lost wakeup',
    definition: 'A signal occurs, but the waiting thread misses it and sleeps forever or too long.',
  },
  {
    term: 'Busy waiting',
    definition: 'Repeatedly polling shared state instead of sleeping until a real event occurs.',
  },
  {
    term: 'Mutex',
    definition: 'A lock protecting the shared table state and ingredient flags.',
  },
  {
    term: 'Fairness',
    definition:
      'The property that no smoker is indefinitely postponed while others continue making progress.',
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
    { id: 'bp-history', label: 'Historical Context' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-setup', label: 'Problem Setup' },
    { id: 'core-state', label: 'State Model' },
    { id: 'core-thinking', label: 'How To Think About It' },
    { id: 'core-solutions', label: 'Solution Patterns' },
    { id: 'core-pusher', label: 'Pusher Pattern' },
    { id: 'core-correctness', label: 'Correctness Notes' },
    { id: 'core-failure', label: 'Failure Modes' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-compare', label: 'Compare and Contrast' },
    { id: 'core-variants', label: 'Variants and Fairness' },
  ],
  examples: [
    { id: 'ex-flow', label: 'Step-by-Step Flow' },
    { id: 'ex-semaphores', label: 'Semaphore Sketch' },
    { id: 'ex-pseudocode', label: 'Pseudocode Sketch' },
    { id: 'ex-real-world', label: 'Real-World Connections' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function CigaretteSmokersPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Cigarette Smokers Problem',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Cigarette Smokers Problem"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Cigarette Smokers Problem</h1>
      <p>
        The Cigarette Smokers problem is a synchronization puzzle where an agent places two
        ingredients on a shared table. Only the smoker who has the third ingredient should proceed.
        This forces you to think about correct signaling and avoiding races, rather than just
        locking.
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

          <section id="bp-history" className="bin98-section">
            <h2 className="bin98-heading">Historical Context</h2>
            {history.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.details}</p>
                <p>{item.notes}</p>
              </div>
            ))}
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
          <section id="core-setup" className="bin98-section">
            <h2 className="bin98-heading">Problem Setup</h2>
            {setup.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-state" className="bin98-section">
            <h2 className="bin98-heading">State Model</h2>
            {stateModel.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-thinking" className="bin98-section">
            <h2 className="bin98-heading">How To Think About It</h2>
            {howToThink.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-solutions" className="bin98-section">
            <h2 className="bin98-heading">Common Solution Patterns</h2>
            {commonSolutions.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-pusher" className="bin98-section">
            <h2 className="bin98-heading">The Pusher Pattern</h2>
            {pusherIdea.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
            <p>
              The pushers are the key: they remember which ingredients are on the table and wake
              exactly one smoker. This prevents races and wasted wakeups.
            </p>
          </section>

          <section id="core-correctness" className="bin98-section">
            <h2 className="bin98-heading">Correctness Notes</h2>
            {correctnessNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-failure" className="bin98-section">
            <h2 className="bin98-heading">Failure Modes</h2>
            {failureModes.map((item) => (
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

          <section id="core-compare" className="bin98-section">
            <h2 className="bin98-heading">Compare and Contrast</h2>
            {comparisons.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-variants" className="bin98-section">
            <h2 className="bin98-heading">Variants and Fairness</h2>
            <h3 className="bin98-subheading">Variants and Extensions</h3>
            {variants.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
            <h3 className="bin98-subheading">Fairness and Starvation</h3>
            {fairnessNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
        </>
      )}

      {activeTab === 'examples' && (
        <>
          <section id="ex-flow" className="bin98-section">
            <h2 className="bin98-heading">Step-by-Step Flow</h2>
            <ol>
              {stepByStep.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}:</strong> {item.detail}
                </li>
              ))}
            </ol>
          </section>

          <section id="ex-semaphores" className="bin98-section">
            <h2 className="bin98-heading">Semaphore Sketch</h2>
            {semaphoreSketch.map((example) => (
              <div key={example.title}>
                <h3 className="bin98-subheading">{example.title}</h3>
                <pre className="bin98-codebox">
                  <code>{example.code.trim()}</code>
                </pre>
                <p>{example.explanation}</p>
              </div>
            ))}
          </section>

          <section id="ex-pseudocode" className="bin98-section">
            <h2 className="bin98-heading">Pseudocode Sketch</h2>
            {pseudocode.map((example) => (
              <div key={example.title}>
                <h3 className="bin98-subheading">{example.title}</h3>
                <pre className="bin98-codebox">
                  <code>{example.code.trim()}</code>
                </pre>
                <p>{example.explanation}</p>
              </div>
            ))}
          </section>

          <section id="ex-real-world" className="bin98-section">
            <h2 className="bin98-heading">Real-World Connections</h2>
            {realWorldConnections.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
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
