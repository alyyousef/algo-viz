import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

const overviewTiles = [
  {
    title: 'What it is',
    detail:
      'A deadlock-avoidance algorithm that grants a resource request only if the system can still finish all processes in some order.',
  },
  {
    title: 'Why it exists',
    detail:
      'To prevent deadlocks before they occur by ensuring the system never enters an unsafe state.',
  },
  {
    title: 'What it requires',
    detail: 'Each process must declare its maximum claim for every resource type in advance.',
  },
  {
    title: 'What it guarantees',
    detail:
      'If the algorithm approves a request, the system remains in a safe state with a valid completion order.',
  },
]

const quickGlossary = [
  {
    term: 'Safe sequence',
    definition:
      'An ordering of processes where each can finish using the resources available at its turn.',
  },
  {
    term: 'Safe state',
    definition: 'A state with at least one safe sequence.',
  },
  {
    term: 'Unsafe state',
    definition:
      'A state with no safe sequence. Unsafe does not necessarily mean deadlocked, but it is risky.',
  },
  {
    term: 'Maximum claim (Max)',
    definition: 'The most of each resource a process may request over its lifetime.',
  },
  {
    term: 'Need',
    definition:
      'The remaining resources required for a process to finish: Need = Max - Allocation.',
  },
]

const historicalMilestones = [
  {
    title: '1965: Deadlock formalized',
    detail:
      'Dijkstra and others formalize deadlock and illustrate it with the dining philosophers problem.',
  },
  {
    title: '1968: Bankers Algorithm introduced',
    detail:
      'Dijkstra proposes the safety-based resource allocation algorithm and the banker analogy.',
  },
  {
    title: '1970s: Teaching and early OS research',
    detail:
      'Bankers becomes a canonical model in operating systems curricula and research prototypes.',
  },
  {
    title: '1990s+: Production systems shift',
    detail: 'Modern kernels prefer simpler prevention or detection due to Bankers runtime cost.',
  },
]

const mentalModels = [
  {
    title: 'The cautious banker',
    detail:
      'The system is a bank that only approves loans if it can still satisfy all customers in some order.',
  },
  {
    title: 'Safety is a proof',
    detail: 'A safe sequence is a constructive proof that the system can finish all processes.',
  },
  {
    title: 'Every request is a what-if',
    detail: 'Requests are simulated first, then committed only if safety still holds.',
  },
  {
    title: 'Conservativeness is a feature',
    detail:
      'The algorithm may delay requests that would succeed in practice to preserve safety guarantees.',
  },
]

const systemModel = [
  {
    title: 'Processes',
    detail: 'There are n processes, each with a declared maximum claim for every resource type.',
  },
  {
    title: 'Resource types',
    detail:
      'There are m resource types, each with multiple instances (e.g., CPU cores, memory frames, I/O channels).',
  },
  {
    title: 'State components',
    detail: 'System state is captured by Allocation, Max, Need, and Available matrices/vectors.',
  },
  {
    title: 'Goal',
    detail: 'Grant requests only if the resulting state remains safe.',
  },
]

const dataStructures = [
  {
    heading: 'Available vector',
    bullets: [
      'Length m (resource types).',
      'Available[j] is the number of free instances of resource j.',
      'Represents the pool the OS can still allocate immediately.',
    ],
  },
  {
    heading: 'Max matrix',
    bullets: [
      'Size n x m (processes x resource types).',
      'Max[i][j] is the maximum demand of process i for resource j.',
      'Must be declared before requests are evaluated.',
    ],
  },
  {
    heading: 'Allocation matrix',
    bullets: [
      'Allocation[i][j] is what process i currently holds.',
      'Sum of Allocation over all i plus Available equals total resources.',
      'Tracks current commitments the system must honor.',
    ],
  },
  {
    heading: 'Need matrix',
    bullets: [
      'Need = Max - Allocation.',
      'Need[i][j] is what process i still requires to finish.',
      'Primary input to the safety check.',
    ],
  },
  {
    heading: 'Work and Finish',
    bullets: [
      'Work is a copy of Available used in the safety check.',
      'Finish[i] tracks whether a process can complete.',
      'Safety check ends when all Finish are true or no progress is possible.',
    ],
  },
]

const invariants = [
  {
    title: 'Need never negative',
    detail: 'Need = Max - Allocation must be non-negative for all processes and resources.',
  },
  {
    title: 'Resources conserved',
    detail: 'For each resource type: sum(Allocation) + Available = Total instances.',
  },
  {
    title: 'Requests are bounded',
    detail: 'A request must satisfy Request <= Need and Request <= Available to proceed.',
  },
]

const safetyAlgorithmSteps = [
  'Initialize Work = Available and Finish[i] = false for all processes.',
  'Find an i such that Finish[i] == false and Need[i] <= Work.',
  'If no such i exists, stop. If all Finish[i] are true, the state is safe.',
  'If found, simulate completion: Work = Work + Allocation[i], Finish[i] = true.',
  'Repeat until all processes finish or no progress is possible.',
]

const requestAlgorithmSteps = [
  'If Request[i] > Need[i], reject (process exceeded its declared Max).',
  'If Request[i] > Available, delay (not enough free resources).',
  'Temporarily allocate: Available -= Request, Allocation += Request, Need -= Request.',
  'Run the safety check. If safe, commit; otherwise roll back and wait.',
]

const exampleMatrices = [
  {
    title: 'Canonical example state',
    code: `Available = [3, 3, 2]

Allocation = [
  [0, 1, 0],
  [2, 0, 0],
  [3, 0, 2],
  [2, 1, 1],
  [0, 0, 2],
]

Max = [
  [7, 5, 3],
  [3, 2, 2],
  [9, 0, 2],
  [2, 2, 2],
  [4, 3, 3],
]

Need = Max - Allocation`,
    explanation:
      'Compute Need first, then attempt to construct a safe sequence using the safety algorithm.',
  },
]

const safeSequenceWalkthrough = [
  {
    title: 'Safety check walkthrough',
    code: `Work = [3, 3, 2]
Finish = [F, F, F, F, F]

Step 1: P1 Need=[1,2,2] fits Work -> finish P1
Work = Work + Allocation[P1] = [5, 3, 2]

Step 2: P3 Need=[0,1,1] fits Work -> finish P3
Work = [7, 4, 3]

Step 3: P4 Need=[4,3,1] fits Work -> finish P4
Work = [7, 4, 5]

Step 4: P0 Need=[7,4,3] fits Work -> finish P0
Work = [7, 5, 5]

Step 5: P2 Need=[6,0,0] fits Work -> finish P2
All finish -> SAFE`,
    explanation: 'One safe sequence is P1 -> P3 -> P4 -> P0 -> P2, so the system is safe.',
  },
]

const requestWalkthrough = [
  {
    title: 'Handling a request',
    code: `Request(P1) = [1, 0, 2]

Check 1: Request <= Need? yes
Check 2: Request <= Available? yes

Temporarily grant and run safety check.
If safe -> grant; else rollback and wait.`,
    explanation:
      'Bankers may delay a request even if resources are available if it would make the state unsafe.',
  },
]

const correctnessNotes = [
  {
    title: 'Soundness',
    detail:
      'If the algorithm approves a request, there exists a safe sequence, so the system remains safe.',
  },
  {
    title: 'Conservativeness',
    detail:
      'The algorithm can reject requests that would have worked, trading throughput for safety.',
  },
  {
    title: 'Safety vs liveness',
    detail: 'Safety is preserved, but fairness is not guaranteed; starvation can still occur.',
  },
]

const complexityNotes = [
  {
    title: 'Time',
    detail: 'Safety check is O(n^2 * m) in the worst case due to repeated scanning of processes.',
  },
  {
    title: 'Space',
    detail: 'Requires O(n * m) for Allocation, Max, Need plus O(m) for Available and Work.',
  },
  {
    title: 'Operational overhead',
    detail:
      'Every request triggers a safety check, which can be expensive in high-throughput systems.',
  },
]

const practicalConsiderations = [
  {
    title: 'Max claims must be trusted',
    detail: 'If processes lie about Max, safety guarantees collapse.',
  },
  {
    title: 'Works best with stable workloads',
    detail: 'Frequent arrivals, departures, or dynamic resource types reduce practicality.',
  },
  {
    title: 'Admission control helps',
    detail: 'Constraining new processes keeps the system in a safe region from the start.',
  },
  {
    title: 'Combine with fairness policies',
    detail: 'Use aging or priority adjustments to reduce starvation.',
  },
]

const comparisons = [
  {
    title: 'Bankers vs deadlock detection',
    detail:
      'Bankers avoids unsafe states proactively; detection allows deadlock and recovers later.',
  },
  {
    title: 'Bankers vs prevention',
    detail: 'Prevention forbids a deadlock condition outright; Bankers allows it when safe.',
  },
  {
    title: 'Bankers vs lock ordering',
    detail: 'Lock ordering is simpler and lower overhead but less general than Bankers.',
  },
  {
    title: 'Bankers vs optimistic allocation',
    detail:
      'Optimistic allocation grants requests immediately and resolves failures later; Bankers is conservative.',
  },
]

const pitfalls = [
  {
    mistake: 'Skipping Request <= Need validation',
    description: 'Requests that exceed Need violate the model and invalidate safety checks.',
  },
  {
    mistake: 'Confusing unsafe with deadlocked',
    description: 'Unsafe means no guaranteed safe sequence; deadlock is a specific unsafe state.',
  },
  {
    mistake: 'Assuming safe implies optimal',
    description: 'Safe sequences can still be inefficient or unfair.',
  },
  {
    mistake: 'Ignoring overhead',
    description: 'Frequent safety checks can become a bottleneck under heavy request rates.',
  },
]

const whenToUse = [
  {
    title: 'Max demands are known',
    detail: 'Processes can declare accurate maximum claims ahead of time.',
  },
  {
    title: 'Deadlock is unacceptable',
    detail:
      'Systems with strict availability requirements benefit from conservative safety checks.',
  },
  {
    title: 'Request rate is moderate',
    detail: 'Safety checks are feasible when requests are not extremely frequent.',
  },
]

const evaluationChecklist = [
  {
    title: 'Safety preserved',
    detail: 'Does every approved request leave at least one safe sequence?',
  },
  {
    title: 'Max claims enforced',
    detail: 'Are requests strictly bounded by declared Max values?',
  },
  {
    title: 'Performance acceptable',
    detail: 'Can the system tolerate the O(n^2 * m) safety checks?',
  },
  {
    title: 'Starvation mitigated',
    detail: 'Do policies exist to prevent indefinite waiting?',
  },
]

const keyTakeaways = [
  'Bankers Algorithm prevents deadlock by avoiding unsafe states.',
  'Safety is proven by constructing a safe sequence using the safety check.',
  'The method requires accurate Max claims and conservative request handling.',
  'It is powerful for teaching and verification, but often heavy for production kernels.',
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
    { id: 'bp-use', label: 'When to Use It' },
    { id: 'bp-tradeoffs', label: 'Mental Models and Trade-offs' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-system', label: 'System Model' },
    { id: 'core-data', label: 'Core Data Structures' },
    { id: 'core-invariants', label: 'Invariants' },
    { id: 'core-safety', label: 'Safety Test' },
    { id: 'core-request', label: 'Request Algorithm' },
    { id: 'core-correctness', label: 'Correctness Notes' },
    { id: 'core-complexity', label: 'Complexity and Cost' },
    { id: 'core-practical', label: 'Practical Considerations' },
    { id: 'core-compare', label: 'Compare and Contrast' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-evaluation', label: 'Evaluation Checklist' },
  ],
  examples: [
    { id: 'ex-state', label: 'Canonical Example State' },
    { id: 'ex-safe-sequence', label: 'Safe Sequence Walkthrough' },
    { id: 'ex-request', label: 'Handling a Request' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function BankersAlgorithmPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Banker&apos;s Algorithm',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Banker's Algorithm"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Banker&apos;s Algorithm</h1>
      <p>
        Banker&apos;s Algorithm models resource allocation like a cautious bank. It grants a request
        only if the system can still finish every process in some order after the allocation. The
        algorithm uses maximum claims, current allocations, and remaining needs to ensure the system
        never enters an unsafe state.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            {overviewTiles.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="bp-history" className="bin98-section">
            <h2 className="bin98-heading">Historical Context</h2>
            {historicalMilestones.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="bp-use" className="bin98-section">
            <h2 className="bin98-heading">When to Use It</h2>
            {whenToUse.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="bp-tradeoffs" className="bin98-section">
            <h2 className="bin98-heading">Mental Models and Trade-offs</h2>
            {mentalModels.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
            <h3 className="bin98-subheading">Trade-offs</h3>
            {practicalConsiderations.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

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
          <section id="core-system" className="bin98-section">
            <h2 className="bin98-heading">System Model</h2>
            {systemModel.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-data" className="bin98-section">
            <h2 className="bin98-heading">Core Data Structures</h2>
            {dataStructures.map((block) => (
              <div key={block.heading}>
                <h3 className="bin98-subheading">{block.heading}</h3>
                <ul>
                  {block.bullets.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section id="core-invariants" className="bin98-section">
            <h2 className="bin98-heading">Invariants to Maintain</h2>
            {invariants.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-safety" className="bin98-section">
            <h2 className="bin98-heading">Safety Algorithm (Safe State Test)</h2>
            <ol>
              {safetyAlgorithmSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>

          <section id="core-request" className="bin98-section">
            <h2 className="bin98-heading">Resource Request Algorithm</h2>
            <ol>
              {requestAlgorithmSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>

          <section id="core-correctness" className="bin98-section">
            <h2 className="bin98-heading">Correctness Notes</h2>
            {correctnessNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-complexity" className="bin98-section">
            <h2 className="bin98-heading">Complexity and Cost</h2>
            {complexityNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-practical" className="bin98-section">
            <h2 className="bin98-heading">Practical Considerations</h2>
            {practicalConsiderations.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-compare" className="bin98-section">
            <h2 className="bin98-heading">Compare and Contrast</h2>
            {comparisons.map((item) => (
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

          <section id="core-evaluation" className="bin98-section">
            <h2 className="bin98-heading">Evaluation Checklist</h2>
            {evaluationChecklist.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
        </>
      )}

      {activeTab === 'examples' && (
        <>
          <section id="ex-state" className="bin98-section">
            <h2 className="bin98-heading">Canonical Example State</h2>
            {exampleMatrices.map((example) => (
              <div key={example.title}>
                <h3 className="bin98-subheading">{example.title}</h3>
                <div className="bin98-codebox">
                  <code>{example.code.trim()}</code>
                </div>
                <p>{example.explanation}</p>
              </div>
            ))}
          </section>

          <section id="ex-safe-sequence" className="bin98-section">
            <h2 className="bin98-heading">Walkthrough: Safe Sequence</h2>
            {safeSequenceWalkthrough.map((example) => (
              <div key={example.title}>
                <h3 className="bin98-subheading">{example.title}</h3>
                <div className="bin98-codebox">
                  <code>{example.code.trim()}</code>
                </div>
                <p>{example.explanation}</p>
              </div>
            ))}
          </section>

          <section id="ex-request" className="bin98-section">
            <h2 className="bin98-heading">Walkthrough: Handling a Request</h2>
            {requestWalkthrough.map((example) => (
              <div key={example.title}>
                <h3 className="bin98-subheading">{example.title}</h3>
                <div className="bin98-codebox">
                  <code>{example.code.trim()}</code>
                </div>
                <p>{example.explanation}</p>
              </div>
            ))}
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
