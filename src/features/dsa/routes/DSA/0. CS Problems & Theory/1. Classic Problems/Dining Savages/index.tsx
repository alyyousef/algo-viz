import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'What it is',
    details:
      'A classic synchronization problem with a shared pot of servings, multiple savage threads, and a cook who refills the pot when it becomes empty.',
    notes:
      'It models a shared, finite resource and a producer that must be awakened only when needed.',
  },
  {
    title: 'Why it matters',
    details:
      'It captures the tricky boundary between mutual exclusion (one savage at a time) and condition synchronization (wake the cook exactly once).',
    notes: 'Naive solutions lead to races, lost wakeups, or a stampede of savages waking the cook.',
  },
  {
    title: 'What it teaches',
    details:
      'How to coordinate consumers that contend for a resource while safely triggering a producer refill.',
    notes: 'You must prevent both pot underflow and duplicate refills while ensuring progress.',
  },
]

const historicalContext = [
  {
    title: '1970s-1980s: OS textbooks',
    details:
      'The problem appears in operating systems and concurrency texts to teach condition variables, monitors, and semaphores.',
    notes:
      'It is a companion to Sleeping Barber and Producer-Consumer, focusing on "empty buffer" signaling.',
  },
  {
    title: 'Modern relevance',
    details:
      'Today it maps to pooled resources: connection pools, job queues, and cache refill logic.',
    notes: 'The "cook" is a background worker that refills; the "savages" are request handlers.',
  },
]

const roles = [
  {
    title: 'Savages (consumers)',
    detail:
      'Many threads repeatedly take one serving from the pot. Each needs exclusive access to the pot state.',
  },
  {
    title: 'Cook (producer)',
    detail: 'A single thread refills the pot with M servings when notified it is empty.',
  },
  {
    title: 'Pot (shared state)',
    detail:
      'A bounded counter representing the number of servings remaining. It cannot go below zero.',
  },
  {
    title: 'Signals',
    detail:
      'A condition or semaphore wakes the cook when the pot becomes empty; another lets savages proceed when refilled.',
  },
]

const setup = [
  {
    title: 'Parameters',
    detail: 'N savages, one cook, and a pot that holds M servings (M > 0).',
  },
  {
    title: 'Goal',
    detail: 'Every savage eventually eats; the cook refills only when the pot is empty.',
  },
  {
    title: 'Constraints',
    detail: 'Only one savage may decrement the pot at a time; refills must be serialized.',
  },
  {
    title: 'Correctness',
    detail: 'No savage can take a serving if the pot is empty; no missed refill signals.',
  },
]

const howItWorks = [
  {
    step: 1,
    title: 'Savage arrives',
    details:
      'A savage locks the pot, checks the servings count, and decides whether to eat or wake the cook.',
  },
  {
    step: 2,
    title: 'Empty detection',
    details: 'If the pot is empty, exactly one savage signals the cook and waits for a refill.',
  },
  {
    step: 3,
    title: 'Cook refills',
    details: 'The cook wakes, refills the pot with M servings, and signals waiting savages.',
  },
  {
    step: 4,
    title: 'Consume',
    details:
      'A savage decrements the pot and eats. The pot stays consistent under mutual exclusion.',
  },
]

const stateModel = [
  {
    title: 'servings',
    detail: 'An integer in [0, M]. It is the single source of truth for whether the pot is empty.',
  },
  {
    title: 'potMutex',
    detail: 'A mutex protecting the pot state so only one savage or cook modifies it at a time.',
  },
  {
    title: 'emptyPot',
    detail: 'A semaphore or condition signaled when a savage finds the pot empty.',
  },
  {
    title: 'fullPot',
    detail: 'A semaphore or condition signaled by the cook after refilling so savages can proceed.',
  },
]

const correctness = [
  {
    title: 'Safety',
    detail: 'The pot counter never goes below zero, and only one thread updates it at any time.',
  },
  {
    title: 'Liveness',
    detail: 'If the cook runs and savages continue to arrive, every savage eventually eats.',
  },
  {
    title: 'No lost wakeups',
    detail:
      'An empty-pot notification cannot be missed: a savage that signals the cook then waits for the refill.',
  },
  {
    title: 'Single refill per empty',
    detail:
      'Only one savage should wake the cook for each empty pot, or the cook may overfill or refill redundantly.',
  },
]

const solutionPatterns = [
  {
    title: 'Semaphore solution (canonical)',
    detail:
      'Use a mutex for the pot, a semaphore to wake the cook, and another semaphore for savages to wait on.',
  },
  {
    title: 'Monitor + condition variables',
    detail:
      'Encapsulate the pot in a monitor; savages wait on "potNotEmpty" and signal "potEmpty" for the cook.',
  },
  {
    title: 'Message passing',
    detail: 'Savages send a refill request to the cook channel when empty, then wait on a reply.',
  },
  {
    title: 'Single-flight refill',
    detail:
      'Use a flag to ensure only the first savage to observe empty triggers refill; others wait.',
  },
]

const semaphoreSketch = [
  {
    title: 'Shared state',
    code: `semaphore potMutex = 1
semaphore emptyPot = 0
semaphore fullPot = 0
int servings = 0
const int M = 5`,
    explanation:
      'Mutex protects the servings; emptyPot wakes the cook; fullPot releases waiting savages after refill.',
  },
  {
    title: 'Savage (pseudo)',
    code: `savage:
  while true:
    wait(potMutex)
    if servings == 0:
      signal(emptyPot)
      wait(fullPot)
    servings = servings - 1
    signal(potMutex)
    eat()`,
    explanation:
      'A savage signals the cook if empty, waits for refill, then consumes exactly one serving.',
  },
  {
    title: 'Cook (pseudo)',
    code: `cook:
  while true:
    wait(emptyPot)
    wait(potMutex)
    servings = M
    signal(potMutex)
    signal(fullPot)`,
    explanation: 'The cook sleeps until signaled, refills the pot, then wakes a waiting savage.',
  },
]

const monitorSketch = [
  {
    title: 'Monitor idea',
    code: `monitor Pot:
  int servings = 0
  condition potEmpty, potFull

  void getServing():
    while servings == 0:
      signal(potEmpty)
      wait(potFull)
    servings--

  void refill():
    while servings > 0:
      wait(potEmpty)
    servings = M
    signal(potFull)`,
    explanation:
      'The monitor hides all synchronization; savages block on potFull, cook blocks on potEmpty.',
  },
]

const failureModes = [
  {
    title: 'Lost wakeup',
    detail:
      'If a savage checks the pot without holding the mutex, it can miss the empty signal and sleep forever.',
  },
  {
    title: 'Thundering herd',
    detail:
      'If every savage wakes the cook when empty, the cook is spammed and the pot may be refilled multiple times.',
  },
  {
    title: 'Pot underflow',
    detail: 'If multiple savages decrement without mutual exclusion, servings can go negative.',
  },
  {
    title: 'Cook runs too early',
    detail:
      'If the cook refills while servings > 0, the pot is no longer bounded and the model breaks.',
  },
]

const pitfalls = [
  {
    mistake: 'Checking emptiness without a lock',
    description:
      'Two savages can both observe servings == 0, both wake the cook, and both wait. That breaks single-refill semantics.',
  },
  {
    mistake: 'Signaling before waiting',
    description:
      'If a savage signals emptyPot and releases the mutex before waiting, a race can occur where the cook refills but the savage misses fullPot.',
  },
  {
    mistake: 'Using a broadcast with no predicate',
    description: 'Waking all savages without a predicate causes contention and wasted CPU cycles.',
  },
  {
    mistake: 'Never resetting the pot to 0',
    description:
      'If the cook refills without ensuring servings was empty, savages can "steal" servings indefinitely.',
  },
]

const fairness = [
  {
    title: 'Starvation risk',
    detail:
      'If scheduling is unfair, one savage can repeatedly arrive right after refill and monopolize servings.',
  },
  {
    title: 'Bounded waiting',
    detail:
      'A queue or ticketing system can enforce that each savage gets a turn after a finite number of servings.',
  },
  {
    title: 'Cook fairness',
    detail:
      'The cook should only wake when empty; excessive wakeups degrade throughput and fairness.',
  },
]

const variants = [
  {
    title: 'Multiple cooks',
    detail:
      'Requires a refill mutex or single-flight flag; otherwise two cooks can overfill or interleave refills.',
  },
  {
    title: 'Multiple pots',
    detail:
      'Adds load balancing: savages choose a pot or are assigned. You must prevent hot-spotting.',
  },
  {
    title: 'Finite total servings',
    detail:
      'Adds termination: savages must stop when the cook runs out of food. A "closed pot" state is needed.',
  },
  {
    title: 'Priority savages',
    detail:
      'Some savages have priority (for example, VIP requests). This adds policy and increases starvation risk.',
  },
]

const realWorldConnections = [
  {
    title: 'Connection pools',
    detail:
      'Clients (savages) request a connection; when the pool is empty, a refiller grows or reopens connections.',
  },
  {
    title: 'Cache refill',
    detail:
      'Threads wait for a cache miss to be filled. One thread fetches, others wait for the fill.',
  },
  {
    title: 'Job queues',
    detail: 'Workers wait for tasks; when the queue is empty, a producer loads more work.',
  },
  {
    title: 'Rate-limited APIs',
    detail: 'Tokens in a bucket are servings; when empty, threads wait for the limiter to refill.',
  },
]

const compareContrast = [
  {
    title: 'Dining Savages vs Producer-Consumer',
    detail:
      'Producer-consumer models a buffer of items; dining savages is a special case with a single counter and a refill event.',
  },
  {
    title: 'Dining Savages vs Sleeping Barber',
    detail:
      'Both use waiting and signaling, but barber is about queueing customers; savages are about empty refills.',
  },
  {
    title: 'Dining Savages vs Dining Philosophers',
    detail:
      'Philosophers show deadlock on multiple resources; savages focus on empty-conditional signaling.',
  },
  {
    title: 'Dining Savages vs Readers-Writers',
    detail:
      'Readers-writers is about access policy to shared data; savages is about resource availability and refills.',
  },
]

const performanceNotes = [
  {
    title: 'Throughput',
    detail:
      'The critical section is short (check and decrement). Keep it minimal to maximize concurrency.',
  },
  {
    title: 'Latency',
    detail:
      'Refill latency dominates when empty. You can prefetch or refill early, but that changes semantics.',
  },
  {
    title: 'Contention',
    detail:
      'A single potMutex can become a bottleneck at high N. Consider sharding pots for scale.',
  },
]

const codeExamples = [
  {
    title: 'Semaphore solution in C (conceptual)',
    language: 'c',
    code: `
semaphore potMutex = 1;
semaphore emptyPot = 0;
semaphore fullPot = 0;
int servings = 0;
const int M = 5;

void savage() {
  while (true) {
    wait(potMutex);
    if (servings == 0) {
      signal(emptyPot);
      wait(fullPot);
    }
    servings--;
    signal(potMutex);
    eat();
  }
}

void cook() {
  while (true) {
    wait(emptyPot);
    wait(potMutex);
    servings = M;
    signal(potMutex);
    signal(fullPot);
  }
}
`,
    explanation:
      'This canonical pattern ensures only one savage signals the cook for each empty pot and every serving is decremented under mutual exclusion.',
  },
  {
    title: 'Monitor-style sketch in Java (conceptual)',
    language: 'java',
    code: `
class Pot {
  private int servings = 0;
  private final int M = 5;

  synchronized void getServing() throws InterruptedException {
    while (servings == 0) {
      notify();        // wake cook
      wait();          // wait for refill
    }
    servings--;
  }

  synchronized void refill() throws InterruptedException {
    while (servings > 0) {
      wait();
    }
    servings = M;
    notifyAll();       // wake waiting savages
  }
}
`,
    explanation:
      'A monitor encapsulates the pot. Savages wait when empty, the cook refills when empty, and notifications are guarded by predicates.',
  },
]

const debuggingTips = [
  {
    title: 'Log state transitions',
    detail:
      'Log when a savage sees empty, signals the cook, and consumes. It reveals duplicate signals or missing refills.',
  },
  {
    title: 'Assert invariants',
    detail: 'Add assertions that servings stays within [0, M] and refills only happen at 0.',
  },
  {
    title: 'Stress with random sleeps',
    detail: 'Insert randomized delays to surface race conditions and lost wakeups.',
  },
]

const keyTakeaways = [
  'The core challenge is correct signaling when the shared resource becomes empty.',
  'Mutual exclusion alone is not enough; you must coordinate the cook wakeup precisely once.',
  'Always guard waits with predicates to avoid lost wakeups and spurious signals.',
  'Fairness and bounded waiting are policy choices that must be designed explicitly.',
  'The pattern generalizes to pools, token buckets, cache refills, and batch producers.',
]

const glossary = [
  {
    term: 'servings',
    definition: 'The bounded counter that tracks how many portions remain in the pot.',
  },
  {
    term: 'potMutex',
    definition: 'A mutex that protects the pot state so decrements and refills do not race.',
  },
  {
    term: 'emptyPot',
    definition: 'A signal used to wake the cook when the pot becomes empty.',
  },
  {
    term: 'fullPot',
    definition: 'A signal used to release waiting savages after the cook refills the pot.',
  },
  {
    term: 'Lost wakeup',
    definition:
      'A missed notification that leaves a thread sleeping even though the condition became true.',
  },
  {
    term: 'Single-flight refill',
    definition:
      'A pattern that ensures only one thread initiates a refill for a given empty state.',
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
    { id: 'core-roles', label: 'Roles and Components' },
    { id: 'core-setup', label: 'Problem Setup' },
    { id: 'core-state', label: 'State Model' },
    { id: 'core-correctness', label: 'Correctness Requirements' },
    { id: 'core-solutions', label: 'Solution Patterns' },
    { id: 'core-failure', label: 'Failure Modes' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-fairness', label: 'Fairness and Variants' },
    { id: 'core-compare', label: 'Compare and Contrast' },
    { id: 'core-performance', label: 'Performance Notes' },
  ],
  examples: [
    { id: 'ex-flow', label: 'Step-by-Step Flow' },
    { id: 'ex-semaphore', label: 'Semaphore Sketch' },
    { id: 'ex-monitor', label: 'Monitor Sketch' },
    { id: 'ex-code', label: 'Code Examples' },
    { id: 'ex-real-world', label: 'Real-World Connections' },
    { id: 'ex-debugging', label: 'Debugging Tips' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function DiningSavagesPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Dining Savages',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Dining Savages"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Dining Savages</h1>
      <p>
        The Dining Savages problem models a group of consumers sharing a finite pot of servings.
        Each savage wants to eat whenever hungry, but the pot can become empty. A single cook
        refills it, but must only be awakened when needed. This makes it a tight, practical puzzle
        about mutual exclusion, condition synchronization, and avoiding duplicate refills.
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
            {historicalContext.map((item) => (
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
          <section id="core-roles" className="bin98-section">
            <h2 className="bin98-heading">Core Roles and Components</h2>
            {roles.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

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

          <section id="core-correctness" className="bin98-section">
            <h2 className="bin98-heading">Correctness Requirements</h2>
            {correctness.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-solutions" className="bin98-section">
            <h2 className="bin98-heading">Common Solution Patterns</h2>
            {solutionPatterns.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
            <p>
              The heart of the solution is making the "pot empty" signal one-shot. A single savage
              takes responsibility for waking the cook, while everyone else waits for the refill.
            </p>
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

          <section id="core-fairness" className="bin98-section">
            <h2 className="bin98-heading">Fairness and Variants</h2>
            <h3 className="bin98-subheading">Fairness and Starvation</h3>
            {fairness.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
            <h3 className="bin98-subheading">Variants and Extensions</h3>
            {variants.map((item) => (
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

          <section id="core-performance" className="bin98-section">
            <h2 className="bin98-heading">Performance Notes</h2>
            {performanceNotes.map((item) => (
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

          <section id="ex-semaphore" className="bin98-section">
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

          <section id="ex-monitor" className="bin98-section">
            <h2 className="bin98-heading">Monitor Sketch</h2>
            {monitorSketch.map((example) => (
              <div key={example.title}>
                <h3 className="bin98-subheading">{example.title}</h3>
                <pre className="bin98-codebox">
                  <code>{example.code.trim()}</code>
                </pre>
                <p>{example.explanation}</p>
              </div>
            ))}
          </section>

          <section id="ex-code" className="bin98-section">
            <h2 className="bin98-heading">Code Examples</h2>
            {codeExamples.map((example) => (
              <div key={example.title}>
                <h3 className="bin98-subheading">
                  {example.title} ({example.language})
                </h3>
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

          <section id="ex-debugging" className="bin98-section">
            <h2 className="bin98-heading">Debugging and Validation Tips</h2>
            {debuggingTips.map((item) => (
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
