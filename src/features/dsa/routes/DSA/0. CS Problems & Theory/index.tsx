import { Link } from 'react-router-dom'

import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const overviewSections = [
  {
    title: 'What this section is',
    body: 'CS Problems & Theory is the part of the roadmap where algorithmic techniques are tested against canonical problems and foundational theory questions. Instead of learning one more data structure in isolation, you learn how famous problems expose the limits, power, and tradeoffs of computation itself.',
  },
  {
    title: 'Why these problems matter',
    body: 'Classic problems are reusable thought experiments. They teach reduction, complexity, impossibility, search, optimality, synchronization, and approximation. Many of them are not just exam staples; they are compressed versions of real engineering decisions.',
  },
  {
    title: 'What makes this section different',
    body: 'Core DSA topics teach the tools. This section teaches the landmarks: which problems shaped the field, why some admit elegant polynomial solutions, why some are probably intractable, and how to reason when exact answers become unrealistic.',
  },
  {
    title: 'How to read it',
    body: 'Treat the problems as lenses. Each one highlights a distinct idea: search explosion, matching stability, flow conservation, adversarial scheduling, resource safety, computability limits, or complexity class boundaries.',
  },
]

const historicalContext = [
  {
    title: 'Classic problems organized the field',
    detail:
      'Problems such as shortest path, max flow, stable marriage, SAT, TSP, and graph coloring became standard because they isolate one hard idea cleanly enough to study and generalize.',
  },
  {
    title: 'Complexity theory changed the question',
    detail:
      'Once P vs NP, NP-completeness, and undecidability entered the conversation, the goal was no longer just "find an algorithm". It became "prove what kind of algorithm is even plausible".',
  },
  {
    title: 'Operating systems and concurrency turned theory into policy',
    detail:
      "Problems like readers-writers, producer-consumer, dining philosophers, banker's algorithm, and deadlock detection made synchronization and resource allocation concrete rather than abstract.",
  },
  {
    title: 'Modern systems still reuse the same abstractions',
    detail:
      'Routing still looks like shortest path and flow. Resource management still resembles scheduling and safety checks. SAT and graph coloring still power compilers, verification, planning, and optimization.',
  },
]

const sectionSurvey = [
  {
    name: 'Classic Problems',
    summary:
      'This subsection covers the canonical problems every serious CS learner should recognize: shortest path, TSP, stable marriage, max flow/min cut, SAT and 3-SAT, graph coloring, tower of Hanoi, halting problem, readers-writers, producer-consumer, and related synchronization puzzles.',
    route: '/dsa/0-cs-problems-and-theory/1-classic-problems',
  },
  {
    name: 'Advanced Problems',
    summary:
      'This subsection focuses on multi-constraint, multi-objective, and systems-shaped scenarios where one standard algorithm is not enough. It emphasizes modeling, decomposition, bounds, heuristics, approximation, and evaluation under realistic constraints.',
    route: '/dsa/0-cs-problems-and-theory/2-advanced-problems',
  },
]

const classicFamilies = [
  {
    title: 'Search and state-space puzzles',
    body: '8-puzzle, 15-puzzle, missionaries and cannibals, and tower of Hanoi train you to represent state, define legal moves, and think carefully about branching factor, admissible heuristics, and state explosion.',
  },
  {
    title: 'Optimization and combinatorics',
    body: 'Knapsack, TSP, graph coloring, SAT, and stable marriage expose the line between polynomial structure and combinatorial explosion.',
  },
  {
    title: 'Graph and network problems',
    body: 'Shortest path and maximum flow/min cut are foundational because they reveal how graph structure turns broad problems into tractable ones with elegant invariants.',
  },
  {
    title: 'Synchronization and resource-allocation problems',
    body: "Readers-writers, producer-consumer, sleeping barber, cigarette smokers, dining philosophers, dining savages, banker's algorithm, and deadlock detection make liveness and safety explicit in concurrent settings.",
  },
  {
    title: 'Theory and impossibility landmarks',
    body: 'P vs NP and the halting problem are here because they shape what counts as a reasonable algorithmic target in the first place.',
  },
]

const whyItMatters = [
  'It teaches how to classify a problem before you try to solve it.',
  'It gives you the standard examples behind complexity classes, reductions, approximation, and undecidability.',
  'It connects algorithm design to proof obligations: optimality proofs, reduction arguments, safety invariants, and impossibility results.',
  'It trains problem modeling, not just implementation.',
  'It explains why some problems deserve exact algorithms while others demand heuristics, approximation, or proof that no general algorithm exists.',
]

const theoryThemes = [
  {
    title: 'Modeling before solving',
    body: 'Most famous problems become hard only after the model is stated precisely. What is a state, what is a legal move, what counts as a feasible solution, and what objective are you optimizing? Good modeling often decides the algorithm before coding begins.',
  },
  {
    title: 'Reductions as translation tools',
    body: 'A reduction says: if you can solve problem A efficiently, then you can solve problem B efficiently by translating instances. This is one of the most powerful ways to classify difficulty without inventing a brand-new proof from scratch.',
  },
  {
    title: 'Exactness versus tractability',
    body: 'Classic problems teach that exact solutions are not always the right target. Some domains justify pseudo-polynomial, approximate, parameterized, or heuristic solutions once the true complexity landscape is understood.',
  },
  {
    title: 'Safety, liveness, and impossibility',
    body: 'The synchronization problems in this section show that correctness is broader than producing the right numeric answer. Sometimes the question is whether progress is guaranteed, whether deadlock is avoided, or whether a specification is computable at all.',
  },
]

const keyTakeaways = [
  'CS problems become easier to reason about once you classify them by structure, not by surface story.',
  'Classic problems matter because they anchor whole regions of theory: optimization, search, complexity, computability, and synchronization.',
  'Reductions, witnesses, invariants, and impossibility proofs are core tools in this section.',
  'The right response to hardness is often to change the goal: restrict inputs, approximate, or use heuristics consciously.',
  'Advanced problems are where multiple classic ideas interact and force actual design judgment.',
]

const topicSignals = [
  {
    title: 'You are in a classic-problem setting when the problem name itself carries theory',
    body: 'If someone says TSP, SAT, graph coloring, stable marriage, or max flow, the point is not just to solve one instance. It is to recognize the entire body of structure and known results attached to that problem family.',
  },
  {
    title: 'You are in a theory-heavy setting when classification matters as much as code',
    body: 'If the main question is whether a problem is polynomial, NP-hard, reducible, decidable, or approximable, then theoretical framing is part of the solution itself.',
  },
  {
    title: 'You are in a synchronization-problem setting when interleavings define correctness',
    body: 'If the difficulty comes from who waits, who wakes, who owns the resource, or whether progress is guaranteed, the right lens is a classic concurrency problem rather than a standard sequential algorithm.',
  },
  {
    title: 'You are in an advanced-problem setting when one algorithm is not enough',
    body: 'If the problem mixes multiple constraints, objectives, or system realities, you are usually beyond a single textbook primitive and into design space exploration, decomposition, and evaluation.',
  },
]

const coreFoundations = [
  {
    title: 'State, constraints, objective',
    body: 'Nearly every famous CS problem can be decomposed into these three ingredients. What is the state space, what constraints define feasibility, and what objective or decision question are you answering?',
  },
  {
    title: 'Decision versus optimization',
    body: 'Many theoretical results are phrased for decision problems because they compose cleanly under reductions. Yet engineers often care about optimization variants. Knowing how these versions relate is part of real fluency.',
  },
  {
    title: 'Certificates and witnesses',
    body: 'NP-style reasoning is about short proofs of correctness that can be verified efficiently. SAT assignments, graph colorings, and tours become witnesses that clarify why a problem belongs to a complexity class.',
  },
  {
    title: 'Invariant-based reasoning',
    body: 'Shortest path, flow, stable matching, and concurrency puzzles all rely on invariants. The algorithm is only convincing once you can say what remains true after each step and why that truth implies correctness.',
  },
]

const proofObligations = [
  {
    title: 'For constructive algorithms',
    body: 'You usually need an invariant, a feasibility proof, and an argument that the returned solution meets the objective or decision condition.',
  },
  {
    title: 'For complexity classification',
    body: 'You need to show membership in a class and then justify hardness or completeness, often by reduction from a known problem.',
  },
  {
    title: 'For synchronization problems',
    body: 'The proof is often about safety and liveness: no races, no deadlock, no starvation, and progress under the stated assumptions.',
  },
  {
    title: 'For impossibility claims',
    body: 'Problems like halting require argument that no general algorithm can exist, not just that one particular approach fails.',
  },
]

const commonFailureModes = [
  {
    title: 'Memorizing names without structure',
    body: 'Recognizing "this is knapsack" is useful only if you also know whether the relevant variant is exact, pseudo-polynomial, NP-hard, greedy-friendly, or approximation-friendly.',
  },
  {
    title: 'Mixing decision and optimization results carelessly',
    body: 'A decision problem might be NP-complete while the optimization form requires different proof language or approximation analysis. Treating them as identical hides important detail.',
  },
  {
    title: 'Ignoring the variant',
    body: 'Shortest path with negative edges is not the same problem as shortest path with nonnegative weights. SAT is not exactly 3-SAT. Readers-writers policies differ. Variant details change the valid toolset.',
  },
  {
    title: 'Skipping the proof mindset',
    body: 'This section is not just about coding. It requires explaining why an algorithm works, why a reduction is valid, or why a problem likely resists efficient exact solutions.',
  },
  {
    title: 'Treating impossibility as implementation failure',
    body: 'If a problem is undecidable or likely intractable in general, the right response is not "try harder." It is to change the goal, restrict the input, or switch to approximation or heuristics.',
  },
]

const comparisons = [
  {
    title: 'Classic problems versus advanced problems',
    body: 'Classic problems are the canonical landmarks. Advanced problems are the messy scenarios where several of those landmarks collide at once.',
  },
  {
    title: 'Theory versus engineering',
    body: 'Theory classifies what is possible, likely hard, or provably impossible. Engineering chooses what is acceptable under actual constraints. The best practical decisions often come from knowing both.',
  },
  {
    title: 'Synchronization puzzles versus optimization puzzles',
    body: 'Optimization puzzles are usually about best answers under constraints. Synchronization puzzles are usually about safe and live behavior under interleavings. Both require rigor, but the proof shapes differ.',
  },
  {
    title: 'Reduction thinking versus direct design',
    body: 'Direct design asks how to solve one problem. Reduction thinking asks what this problem already means relative to known ones. That second question often gives the faster route to truth.',
  },
]

const studyChecklist = [
  'Classify the problem family before choosing an algorithm.',
  'State whether the task is a decision, search, counting, or optimization problem.',
  'Identify the relevant invariant, witness, or reduction target early.',
  'Check which variant you are actually solving; small wording changes can alter the complexity and the correct tool.',
  'If exact polynomial-time solutions are unlikely, decide whether approximation, heuristics, or restricted inputs are appropriate.',
  'For concurrency-style problems, include liveness conditions, not just safety.',
]

const workedExamples = [
  {
    id: 'ex-sat',
    title: 'Classic Theory Example: SAT as a Decision Problem',
    area: 'Complexity and Reduction',
    intro:
      'SAT asks whether there exists an assignment of boolean variables that makes a formula true. It is the canonical NP-complete problem because many other problems can be translated into it.',
    whyFit:
      'The problem matters less as one puzzle and more as a central classification node for hardness proofs.',
    code: `Given formula F(x1, x2, ..., xn):
does there exist an assignment
such that F evaluates to true?`,
    takeaway:
      'SAT teaches witness-based verification and why reductions are the currency of computational hardness.',
  },
  {
    id: 'ex-flow',
    title: 'Classic Algorithm Example: Maximum Flow and Minimum Cut',
    area: 'Graph Structure',
    intro:
      'A flow network models capacity-constrained transfer. The max-flow/min-cut theorem is important because it links an algorithmic objective to a structural certificate of optimality.',
    whyFit:
      'This is one of the best examples of an elegant invariant-rich problem with strong practical consequences.',
    code: `while augmenting path exists:
  send additional flow along path

return total flow`,
    takeaway:
      'Some famous problems are foundational because they connect algorithm, proof, and structural interpretation cleanly.',
  },
  {
    id: 'ex-rw',
    title: 'Classic Synchronization Example: Readers-Writers Policy',
    area: 'Concurrency Thought Experiment',
    intro:
      'Readers-writers is not just about locks. It is about policy: should readers be favored, writers be favored, or both be treated fairly? Different answers change starvation behavior and throughput.',
    whyFit:
      'The problem is canonical because it exposes the tension between safety, liveness, and performance in a small, understandable setting.',
    code: `if writer active or writers waiting:
  block new readers
else:
  allow shared read access`,
    takeaway:
      'Theory problems often survive because they isolate one design tradeoff so clearly that the lesson generalizes far beyond the toy setup.',
  },
  {
    id: 'ex-advanced',
    title: 'Advanced Problem Example: Optimization Under Multiple Constraints',
    area: 'Modeling and Design',
    intro:
      'An advanced problem may mix latency, capacity, fairness, cost, and uncertainty. No single textbook algorithm is enough. The real task is to model the decision variables, identify exact versus approximate components, and justify the chosen blend of methods.',
    whyFit:
      'This is the core move of advanced problems: decompose, classify subparts, and choose realistic algorithmic machinery for each piece.',
    code: `define variables and constraints
separate exact subproblems from heuristic ones
choose objective and evaluation metrics
solve, bound, and compare alternatives`,
    takeaway: 'Advanced problems are where theoretical literacy turns into design judgment.',
  },
]

const _glossaryBroken = [
  {
    term: 'Reduction',
    definition: 'A translation from one problem to another that preserves the ability to solve it.',
  },
  {
    term: 'NP-complete',
    definition:
      'A class of problems that are in NP and at least as hard as every other problem in NP.',
  },
  {
    term: 'Undecidable',
    definition:
      'A property of problems for which no general algorithm can correctly decide all instances.',
  },
  {
    term: 'Witness',
    definition:
      'A concrete certificate, such as an assignment or tour, that proves a yes-instance.',
  },
  { term: 'Decision problem', definition: 'A problem whose answer is yes or no.' },
  {
    term: 'Optimization problem',
    definition: 'A problem asking for the best feasible solution under an objective.',
  },
  {
    term: 'Invariant',
    definition:
      'A property that remains true throughout an algorithm or protocol and supports correctness.',
  },
  {
    term: 'Approximation ratio',
    definition: 'A bound comparing the quality of an algorithm’s answer to the optimum.',
  },
  { term: 'Liveness', definition: 'A guarantee that useful progress eventually occurs.' },
  { term: 'Safety', definition: 'A guarantee that forbidden bad states do not occur.' },
]

const glossary = [
  {
    term: 'Reduction',
    definition: 'A translation from one problem to another that preserves the ability to solve it.',
  },
  {
    term: 'NP-complete',
    definition:
      'A class of problems that are in NP and at least as hard as every other problem in NP.',
  },
  {
    term: 'Undecidable',
    definition:
      'A property of problems for which no general algorithm can correctly decide all instances.',
  },
  {
    term: 'Witness',
    definition:
      'A concrete certificate, such as an assignment or tour, that proves a yes-instance.',
  },
  { term: 'Decision problem', definition: 'A problem whose answer is yes or no.' },
  {
    term: 'Optimization problem',
    definition: 'A problem asking for the best feasible solution under an objective.',
  },
  {
    term: 'Invariant',
    definition:
      'A property that remains true throughout an algorithm or protocol and supports correctness.',
  },
  {
    term: 'Approximation ratio',
    definition: "A bound comparing the quality of an algorithm's answer to the optimum.",
  },
  { term: 'Liveness', definition: 'A guarantee that useful progress eventually occurs.' },
  { term: 'Safety', definition: 'A guarantee that forbidden bad states do not occur.' },
]

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'cst-overview', label: 'Overview' },
    { id: 'cst-why', label: 'Why It Matters' },
    { id: 'cst-history', label: 'Historical Context' },
    { id: 'cst-survey', label: 'Section Survey' },
    { id: 'cst-classics', label: 'Classic Problem Families' },
    { id: 'cst-themes', label: 'Theory Themes' },
    { id: 'cst-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'cst-signals', label: 'Topic Signals' },
    { id: 'cst-foundations', label: 'Foundations' },
    { id: 'cst-proofs', label: 'Proof Obligations' },
    { id: 'cst-failures', label: 'Failure Modes' },
    { id: 'cst-compare', label: 'Compare and Contrast' },
    { id: 'cst-checklist', label: 'Study Checklist' },
  ],
  examples: workedExamples.map((example) => ({
    id: example.id,
    label: example.title,
  })),
  glossary: [{ id: 'cst-glossary', label: 'Terms' }],
}

export default function CSProblemsAndTheoryPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'CS Problems &amp; Theory',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="CS Problems &amp; Theory"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">CS Problems &amp; Theory</h1>
      <p className="cst98-intro">
        This page is the top-level overview for the CS Problems & Theory section. It explains how
        canonical problems, reductions, computability limits, and complexity classes shape the way
        computer scientists think about what is tractable, what is hard, and what should be solved
        approximately or not at all.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="cst-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            {overviewSections.map((section) => (
              <div key={section.title}>
                <h3 className="bin98-subheading">{section.title}</h3>
                <p>{section.body}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="cst-why" className="bin98-section">
            <h2 className="bin98-heading">Why It Matters</h2>
            <ul>
              {whyItMatters.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <hr className="bin98-divider" />

          <section id="cst-history" className="bin98-section">
            <h2 className="bin98-heading">Historical Context</h2>
            {historicalContext.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="cst-survey" className="bin98-section">
            <h2 className="bin98-heading">Section Survey</h2>
            {sectionSurvey.map((item) => (
              <div key={item.name}>
                <h3 className="bin98-subheading">{item.name}</h3>
                <p>{item.summary}</p>
                <p>
                  <Link to={item.route} className="cst98-inline-link">
                    Open {item.name}
                  </Link>
                </p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="cst-classics" className="bin98-section">
            <h2 className="bin98-heading">Classic Problem Families</h2>
            {classicFamilies.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="cst-themes" className="bin98-section">
            <h2 className="bin98-heading">Theory Themes</h2>
            {theoryThemes.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="cst-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key Takeaways</h2>
            <ul>
              {keyTakeaways.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {activeTab === 'core-concepts' && (
        <>
          <section id="cst-signals" className="bin98-section">
            <h2 className="bin98-heading">Topic Signals</h2>
            {topicSignals.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="cst-foundations" className="bin98-section">
            <h2 className="bin98-heading">Foundations</h2>
            {coreFoundations.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="cst-proofs" className="bin98-section">
            <h2 className="bin98-heading">Proof Obligations</h2>
            {proofObligations.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="cst-failures" className="bin98-section">
            <h2 className="bin98-heading">Failure Modes</h2>
            {commonFailureModes.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="cst-compare" className="bin98-section">
            <h2 className="bin98-heading">Compare and Contrast</h2>
            {comparisons.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="cst-checklist" className="bin98-section">
            <h2 className="bin98-heading">Study Checklist</h2>
            <ul>
              {studyChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {activeTab === 'examples' && (
        <>
          {workedExamples.map((example) => (
            <section key={example.id} id={example.id} className="bin98-section">
              <h2 className="bin98-heading">{example.title}</h2>
              <p>
                <strong>Area:</strong> {example.area}
              </p>
              <p>{example.intro}</p>
              <p>
                <strong>Why this example fits:</strong> {example.whyFit}
              </p>
              <div className="bin98-codebox">
                <code>{example.code}</code>
              </div>
              <p>
                <strong>Takeaway:</strong> {example.takeaway}
              </p>
            </section>
          ))}
        </>
      )}

      {activeTab === 'glossary' && (
        <section id="cst-glossary" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {glossary.map((entry) => (
            <p key={entry.term}>
              <strong>{entry.term}:</strong> {entry.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
