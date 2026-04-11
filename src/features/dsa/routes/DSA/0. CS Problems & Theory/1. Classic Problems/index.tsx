import { Link } from 'react-router-dom'

import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'
import { slugifySegment } from '@/features/dsa/utils/slug'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const CLASSIC_PROBLEMS_BASE_ROUTE = '/dsa/0-cs-problems-and-theory/1-classic-problems'

const overviewSections = [
  {
    title: 'What this subsection is',
    body: "Classic Problems is the part of CS Problems & Theory where the field's most durable benchmark questions are organized in one place. These are the puzzles, optimization tasks, matching problems, search spaces, synchronization thought experiments, and impossibility results that repeatedly appear because each one captures a deep idea in a compact form.",
  },
  {
    title: 'Why these problems still matter',
    body: "They are not historical curiosities. Shortest path still underlies routing and planning. Maximum flow still models allocation and throughput. SAT still drives verification and solver technology. Stable marriage still informs matching markets. Producer-consumer, readers-writers, dining philosophers, and banker's algorithm still teach concurrency policy, resource ownership, and progress guarantees.",
  },
  {
    title: 'What you are meant to learn here',
    body: 'This subsection teaches recognition and classification. When you see a new problem, you should start asking whether it resembles a graph optimization problem, a search problem, a constraint satisfaction problem, a synchronization problem, or a computability boundary. That classification usually determines the right proof technique and the right algorithmic toolbox.',
  },
  {
    title: 'How to read the pages',
    body: 'Do not study them as isolated trivia. Read each classic problem as a compressed lesson about one general pattern: residual capacity, admissible heuristics, reductions, blocking pairs, deadlock, fairness, safe states, exponential search, or undecidability. The goal is transfer, not memorization.',
  },
]

const whyItMatters = [
  'Classic problems expose the standard structures behind much larger engineering systems.',
  'They supply the canonical examples used in proofs about complexity, reductions, and approximation.',
  'They train the habit of modeling first: state, constraints, objective, and certificate.',
  'They show where exact algorithms are feasible, where heuristics are justified, and where no general algorithm can exist.',
  'They connect implementation details to proof obligations such as optimality, stability, safety, liveness, or impossibility.',
]

const historicalContext = [
  {
    title: 'Graph algorithms gave early examples of elegant tractability',
    detail:
      'Shortest path and maximum flow became famous because they demonstrated that broad real-world tasks can become clean polynomial algorithms when the right structure is identified.',
  },
  {
    title: 'Combinatorial explosion forced complexity theory into the conversation',
    detail:
      'Problems such as SAT, graph coloring, knapsack, and TSP helped formalize the difference between problems that yield efficient exact algorithms and problems that appear to resist them in general.',
  },
  {
    title: 'Operating systems turned thought experiments into correctness policy',
    detail:
      "Readers-writers, producer-consumer, dining philosophers, cigarette smokers, sleeping barber, and banker's algorithm became standard because they make concurrency errors visible before those errors happen in production systems.",
  },
  {
    title: 'Computability limits changed what counts as a valid goal',
    detail:
      'The halting problem is not a hard optimization task. It is a proof that some decision goals are impossible in full generality. That lesson prevents wasted effort and reframes what good tooling can promise.',
  },
]

const problemFamilies = [
  {
    title: 'Graph and network optimization',
    body: 'Shortest path, maximum flow/min cut, and graph coloring show how graph structure, relaxations, residual views, and combinatorial constraints influence both algorithms and proof strategies.',
  },
  {
    title: 'Constraint satisfaction and complexity landmarks',
    body: 'SAT and 3-SAT, graph coloring, knapsack, TSP, and P vs NP define the vocabulary of reductions, hardness, witnesses, and optimization-versus-decision reasoning.',
  },
  {
    title: 'Search and state-space puzzles',
    body: '8-puzzle, 15-puzzle, missionaries and cannibals, tower of Hanoi, and pebble games teach explicit state modeling, branching, admissible heuristics, recursion structure, and combinatorial growth.',
  },
  {
    title: 'Matching and allocation',
    body: "Stable marriage and banker's algorithm both reason about assignment under constraints, but they optimize different properties: one is about stability of preferences, the other about staying in a safe region of resource demand.",
  },
  {
    title: 'Synchronization and shared-resource thought experiments',
    body: 'Readers-writers, producer-consumer, sleeping barber, cigarette smokers, dining philosophers, dining savages, and deadlock detection emphasize interleavings, wakeup discipline, ownership, progress, fairness, and failure recovery.',
  },
  {
    title: 'Impossibility and boundary questions',
    body: 'The halting problem and P vs NP are included because they determine which ambitions are realistic. They do not just add theory overhead; they decide what kind of solution target makes sense at all.',
  },
]

const problemDirectory = [
  {
    heading: 'Graph, Network, and Optimization Problems',
    items: [
      {
        name: 'Shortest Path (Dijkstra-Bellman-Ford)',
        summary:
          'The canonical route-planning problem. It teaches greedy correctness under nonnegative weights, repeated relaxation, path optimality, and why negative edges and negative cycles change everything.',
      },
      {
        name: 'Maximum Flow & Min Cut',
        summary:
          'A central network problem built around capacity, residual graphs, bottlenecks, and certificates of optimality. It is one of the cleanest examples of a theorem that directly links algorithmic output to structure.',
      },
      {
        name: 'Knapsack',
        summary:
          'A compact model of constrained optimization. It is famous because different variants reveal greedy failure, dynamic programming structure, pseudo-polynomial algorithms, and NP-hardness.',
      },
      {
        name: 'Traveling Salesman Problem (TSP)',
        summary:
          'The archetypal hard optimization problem. TSP teaches the boundary between exact exponential algorithms, lower bounds, approximation, and heuristic local improvement.',
      },
      {
        name: 'Graph Coloring',
        summary:
          'A constraint assignment problem with deep complexity significance. It appears in scheduling, register allocation, and reduction proofs because local conflicts create global combinatorial difficulty.',
      },
      {
        name: 'Stable Marriage',
        summary:
          'A matching problem where correctness is not about minimum cost but about the absence of blocking pairs. It is the standard example of stability, deferred acceptance, and policy-driven optimality.',
      },
    ],
  },
  {
    heading: 'Logic, Complexity, and Computability',
    items: [
      {
        name: 'SAT & 3-SAT',
        summary:
          'The hub of NP-completeness. SAT teaches witnesses, boolean modeling, clause structure, reductions, and why many difficult problems are recognized by translating them into satisfiability.',
      },
      {
        name: 'P vs NP',
        summary:
          'The complexity question that frames an enormous amount of algorithmic judgment. It asks whether efficiently verifiable solutions are also efficiently discoverable in general.',
      },
      {
        name: 'Halting Problem',
        summary:
          'The classic undecidability result. It teaches diagonalization, self-reference, and the difference between a hard problem and an impossible specification.',
      },
    ],
  },
  {
    heading: 'Search, Puzzles, and State-Space Reasoning',
    items: [
      {
        name: '8-Puzzle & 15-Puzzle',
        summary:
          'A textbook state-space problem that teaches solvability conditions, heuristic search, A*, admissibility, and the cost of large branching over huge implicit graphs.',
      },
      {
        name: 'Missionaries and Cannibals',
        summary:
          'A compact search and invariant problem. It forces you to define legal states precisely and to reject moves that look plausible locally but violate global safety constraints.',
      },
      {
        name: 'Tower of Hanoi',
        summary:
          'A recursion landmark that exposes self-similarity, recurrence relations, and exponential growth through a very small rule set.',
      },
      {
        name: 'Pebble Games (Memory-Recursion)',
        summary:
          'A more theory-shaped puzzle family about time-space tradeoffs, recomputation, and the cost of managing intermediate results.',
      },
    ],
  },
  {
    heading: 'Concurrency, Coordination, and Resource Allocation',
    items: [
      {
        name: 'Producer-Consumer (Bounded Buffer)',
        summary:
          'The standard queueing and coordination problem for shared buffers. It teaches mutual exclusion, blocking conditions, wakeups, and throughput under bounded capacity.',
      },
      {
        name: 'Readers-Writers',
        summary:
          'A problem about competing access modes. It highlights the tradeoff between parallel reads, exclusive writes, fairness policies, and starvation prevention.',
      },
      {
        name: 'Dining Philosopher',
        summary:
          'The famous deadlock thought experiment in which local correctness is not enough. It teaches circular wait, resource-ordering strategies, and why symmetric rules can fail.',
      },
      {
        name: 'Dining Savages',
        summary:
          'A synchronization variant centered on replenishment, shared containers, and coordination between consumers and a refiller. It reinforces condition-based signaling and ownership rules.',
      },
      {
        name: 'Sleeping Barber',
        summary:
          'A queueing and scheduling puzzle about waiting rooms, service availability, and wakeup conditions, often used to explain semaphore and monitor design.',
      },
      {
        name: 'Cigarette Smokers Problem',
        summary:
          'A signaling problem where the challenge is not mutual exclusion alone but correctly matching available resources to the thread that can make progress.',
      },
      {
        name: "Banker's Algorithm",
        summary:
          'A deadlock-avoidance problem based on safe states and future claims. It teaches the difference between avoiding danger in advance and merely detecting failure after the fact.',
      },
      {
        name: 'Deadlock Detection',
        summary:
          'The post-hoc view of resource failure. Instead of constraining allocation up front, detection asks whether the current wait-for relationships already contain a cycle or an unrecoverable stall.',
      },
    ],
  },
]

const keyTakeaways = [
  'A classic problem is valuable because it isolates a reusable structure, not because the story itself is special.',
  'The first task is classification: graph, search, logic, optimization, synchronization, or impossibility.',
  'Good solutions pair code with proof: invariants, witnesses, reductions, stability arguments, or safety and liveness claims.',
  'Variants matter. Small wording changes can switch the right algorithm, the right theorem, or the right complexity class.',
  'When full generality is impossible or impractical, the correct response is often to restrict the input, approximate, or change the objective explicitly.',
]

const recognitionSignals = [
  {
    title: 'Look for hidden graphs',
    body: 'If the problem is about moving between states, accumulating cost, respecting capacities, or finding routes, you are often in shortest-path, flow, or state-space territory even when the original story does not mention graphs directly.',
  },
  {
    title: 'Look for certificates',
    body: 'If a proposed solution can be checked much faster than it can be found, the problem is probably living in the language of witnesses, verification, NP-style reasoning, or reduction-friendly classification.',
  },
  {
    title: 'Look for interleavings',
    body: 'If correctness depends on the order in which threads observe and modify shared state, you are no longer in ordinary sequential algorithm design. You are in a synchronization problem where safety and liveness must be stated explicitly.',
  },
  {
    title: 'Look for impossibility signals',
    body: 'If the problem asks for perfect prediction of arbitrary program behavior, complete detection of all future failures, or a universal procedure that decides a self-referential property, you should suspect undecidability or a boundary result rather than a missing algorithm.',
  },
]

const modelingFoundations = [
  {
    title: 'State representation',
    body: 'You need a precise answer to what a node, configuration, or partial assignment means. In puzzles this might be a board arrangement. In SAT it is a truth assignment. In concurrency it is the ownership and wait status of shared resources. Weak state definitions produce weak algorithms.',
  },
  {
    title: 'Constraints and legal moves',
    body: "Feasibility must be defined separately from the objective. Missionaries and cannibals fails if the safety constraint is violated. Graph coloring fails if adjacent vertices share a color. Banker's algorithm fails if the system can leave the safe region.",
  },
  {
    title: 'Objective versus decision form',
    body: 'Many problems have both optimization and decision versions. TSP can ask for the shortest tour or whether a tour of cost at most B exists. Knapsack can ask for maximum value or whether some value threshold is reachable. The decision view is usually what reductions talk to most naturally.',
  },
  {
    title: 'Certificates of correctness',
    body: 'A path, a cut, a truth assignment, a coloring, a matching, or a safe sequence often serves as the object you reason about. These certificates do not merely prove a theorem after the fact; they shape what data structures and validation logic you build.',
  },
]

const proofPatterns = [
  {
    title: 'Invariant-based proofs',
    body: "Shortest path, maximum flow, banker's algorithm, and synchronization problems all rely on invariants. The proof explains what remains true after each relaxation, augmentation, allocation, or wakeup step.",
  },
  {
    title: 'Exchange and contradiction arguments',
    body: "Greedy-style analyses, matching arguments, and some scheduling claims often prove correctness by showing that any optimal solution can be transformed to respect the algorithm's choice without becoming worse.",
  },
  {
    title: 'Reduction arguments',
    body: 'When classifying a problem as NP-hard or NP-complete, the proof is rarely direct brute force. You translate a known hard problem into the new one, preserving yes and no answers. The translation itself is the evidence.',
  },
  {
    title: 'Safety and liveness proofs',
    body: 'Concurrency problems require more than "the result is correct." You need to show that forbidden states do not occur and that useful progress is not blocked forever under the stated assumptions.',
  },
  {
    title: 'Impossibility proofs',
    body: 'The halting problem is established by contradiction through self-reference. The structure of the proof matters because impossibility is stronger than poor performance or missing engineering effort.',
  },
]

const tractabilitySpectrum = [
  {
    title: 'Efficient exact algorithms',
    body: 'Some classics, such as shortest path and maximum flow, admit exact polynomial solutions for broad variants. These are the cases where structural insight converts a practical need into a dependable algorithmic primitive.',
  },
  {
    title: 'Pseudo-polynomial structure',
    body: 'Problems like certain knapsack variants are not neatly categorized by input length alone. Their dynamic programs can look efficient when numeric capacities are small, even though the general problem remains hard in the stronger complexity sense.',
  },
  {
    title: 'Exponential exact search',
    body: 'TSP, SAT, graph coloring, and many puzzles may still be solved exactly for moderate instances, but the cost grows explosively. This is where pruning, branch and bound, heuristics, and good lower bounds determine practical success.',
  },
  {
    title: 'Approximation and heuristics',
    body: 'When exact optimality is too expensive, the next question is whether you can guarantee a bound or at least obtain consistently strong empirical solutions. This is why approximation ratios, local search, solver engineering, and benchmarking matter.',
  },
  {
    title: 'Undecidable goals',
    body: 'Some requests are not merely expensive. They cannot be solved in complete generality at all. Recognizing that boundary is part of mature problem solving because it changes the problem statement you should pursue.',
  },
]

const synchronizationReasoning = [
  {
    title: 'Safety is about forbidden states',
    body: 'Examples include buffer overflow or underflow, two writers entering a critical section together, or a deadlocked resource cycle. A safe protocol prevents these outcomes for every legal interleaving.',
  },
  {
    title: 'Liveness is about eventual progress',
    body: 'A protocol can be safe and still be unacceptable if some thread starves forever or if the system can get stuck waiting despite there being work that should continue.',
  },
  {
    title: 'Fairness is a design choice, not a default',
    body: 'Readers-writers and sleeping barber variants differ because policy matters. Favoring throughput, minimizing latency, or preventing starvation leads to different synchronization rules.',
  },
  {
    title: 'Detection and avoidance are different strategies',
    body: "Banker's algorithm constrains future allocations to remain in safe states. Deadlock detection observes the current dependency pattern and then decides whether recovery is needed. These are conceptually and operationally distinct responses.",
  },
]

const comparisons = [
  {
    title: 'Shortest path versus maximum flow',
    body: 'Both use graphs, but shortest path optimizes a single route while maximum flow reasons about aggregate transfer through a network. Relaxation and residual capacity solve different structural questions.',
  },
  {
    title: 'SAT versus graph coloring',
    body: 'Both are canonical NP-complete problems, but SAT is a logic language for expressing constraints while graph coloring is a graph-native conflict model. In practice, coloring is often reduced to SAT or ILP when solver ecosystems are stronger.',
  },
  {
    title: 'Stable marriage versus weighted matching',
    body: 'Stable marriage is about eliminating blocking pairs under preferences. Weighted matching is about optimizing a numeric objective. The meaning of correctness changes with the problem model.',
  },
  {
    title: "Banker's algorithm versus deadlock detection",
    body: "Banker's asks whether a tentative allocation leaves a safe continuation. Deadlock detection asks whether the current system is already trapped. One is preventive, the other diagnostic.",
  },
  {
    title: 'Halting problem versus NP-hard problems',
    body: 'NP-hardness says efficient exact algorithms are unlikely in general. Undecidability says no general algorithm can solve every instance correctly at all. Those are very different boundaries.',
  },
]

const failureModes = [
  {
    title: 'Treating the story as the problem',
    body: 'The narrative wrapper can mislead you. A barber shop, puzzle board, or logistics story only matters insofar as it defines state, constraints, and objective. Surface details should not choose the algorithm.',
  },
  {
    title: 'Ignoring the exact variant',
    body: 'Dijkstra is invalid with negative edges. Graph coloring with a fixed number of colors is not the same as minimizing the number of colors. TSP with metric structure behaves differently from arbitrary weighted tours.',
  },
  {
    title: 'Confusing a hard problem with an impossible one',
    body: 'It is a category error to respond to undecidability with more optimization effort. First decide whether the problem is expensive, probably intractable, or formally impossible.',
  },
  {
    title: 'Proving too little',
    body: 'Returning a correct-looking result on a few examples is not enough. Classic problems require formal reasoning: why the invariant holds, why the reduction preserves answers, why starvation cannot happen, or why a certificate is valid.',
  },
  {
    title: 'Neglecting modeling quality',
    body: 'Many poor solutions fail before the algorithm begins. If the state representation, constraint set, or evaluation metric is underspecified, the implementation can be flawless and still solve the wrong problem.',
  },
]

const studyChecklist = [
  'Name the family first: graph, search, logic, optimization, synchronization, or computability.',
  'State the exact input, output, constraints, and variant before picking a method.',
  'Decide whether the task is decision, search, counting, or optimization.',
  'Write down the intended certificate, invariant, or reduction target early.',
  'Check whether you need exactness, a bound, a heuristic, or a restricted-input result.',
  'For concurrency questions, include both safety and liveness conditions.',
  'For theory questions, separate "hard" from "impossible" explicitly.',
]

const examples = [
  {
    id: 'cp98-example-a-star',
    title: 'Example: A* framing for the 8-puzzle',
    area: 'State-Space Search',
    intro:
      'The sliding puzzle is a classic example of an implicit graph. You do not store every node in advance; you generate neighboring states by moving the blank. The main lesson is that search quality depends on state representation and heuristic discipline.',
    whyFit:
      'This example represents the search-oriented half of the subsection: huge state spaces, explicit moves, and careful use of admissible estimates.',
    code: `open = priority queue ordered by f = g + h
push(start, g = 0, h = manhattan(start))

while open not empty:
  state = pop_min_f(open)
  if state is goal:
    return reconstruct_path(state)
  for each legal move from state:
    next = apply(move, state)
    relax next if g improves`,
    takeaway:
      'A classic puzzle often becomes a shortest-path problem on an implicit graph, which is why heuristic design matters as much as the move rules themselves.',
  },
  {
    id: 'cp98-example-flow',
    title: 'Example: Augmenting paths for maximum flow',
    area: 'Network Optimization',
    intro:
      'Flow problems are solved by repeatedly finding ways to push more value through the residual network. The residual graph records what capacity remains and where previous choices can be adjusted.',
    whyFit:
      'This is a textbook example of an invariant-rich algorithm whose proof is inseparable from the data representation.',
    code: `flow = 0
while exists_path(source, sink, residual_capacity > 0):
  bottleneck = minimum residual capacity on that path
  augment path by bottleneck
  update forward and backward residual edges
  flow += bottleneck
return flow`,
    takeaway:
      'Residual structure is the key idea. Without it, "send more flow" sounds vague; with it, optimality becomes a concrete process.',
  },
  {
    id: 'cp98-example-gs',
    title: 'Example: Gale-Shapley deferred acceptance',
    area: 'Matching and Stability',
    intro:
      'Stable marriage does not optimize a single scalar cost. Instead it eliminates blocking pairs by repeatedly letting unmatched proposers move down their preference lists while tentative matches improve according to the receiving side.',
    whyFit:
      'It shows that correctness can mean stability rather than global minimum cost, and that algorithmic policy affects which stable solution you reach.',
    code: `while some proposer is unmatched and has someone left to propose to:
  receiver = next choice on proposer's list
  if receiver is unmatched:
    tentatively match them
  else if receiver prefers proposer to current partner:
    reject current partner
    tentatively match proposer
  else:
    reject proposer`,
    takeaway:
      'The central proof target is the absence of blocking pairs, not the minimization of a numeric objective.',
  },
  {
    id: 'cp98-example-sat',
    title: 'Example: SAT as a decision and reduction hub',
    area: 'Logic and Complexity',
    intro:
      'SAT asks whether some assignment satisfies a boolean formula. That simple interface makes it a universal language for expressing constraints. Many hard problems become SAT once their local conditions are encoded as clauses.',
    whyFit:
      "This is the subsection's main example of witness-based reasoning and hardness classification through translation.",
    code: `variables: x1, x2, x3
formula: (x1 or not x2) and (x2 or x3) and (not x1 or not x3)

question:
does there exist an assignment to x1, x2, x3
that makes every clause true?`,
    takeaway:
      'SAT matters because it turns "solve this hard problem" into "encode the constraints faithfully, then let the solver search for a witness."',
  },
  {
    id: 'cp98-example-pc',
    title: 'Example: Monitor-style producer-consumer protocol',
    area: 'Synchronization',
    intro:
      'The bounded buffer problem is a compact model for queueing under shared access. Correctness requires both mutual exclusion and condition synchronization, because threads must sleep when the buffer is full or empty instead of spinning or violating capacity.',
    whyFit:
      'This example shows why concurrency problems are about coordination policy, not just data structure mutation.',
    code: `lock(mutex)
while buffer is full:
  wait(not_full, mutex)
enqueue(item)
signal(not_empty)
unlock(mutex)

lock(mutex)
while buffer is empty:
  wait(not_empty, mutex)
item = dequeue()
signal(not_full)
unlock(mutex)`,
    takeaway:
      'The loop around the wait is part of the proof. It protects correctness against wakeup races and stale assumptions.',
  },
  {
    id: 'cp98-example-halting',
    title: 'Example: Why the halting problem is different',
    area: 'Computability',
    intro:
      'Hard optimization problems tempt you to search longer or accept approximations. The halting problem is a different category. It is a proof that no universal procedure can always answer the question correctly for every program-input pair.',
    whyFit:
      "This is the subsection's clearest reminder that some limits are mathematical boundaries, not engineering limitations.",
    code: `assume Halts(program, input) decides correctly for all programs
construct Weird(p):
  if Halts(p, p) == true:
    loop forever
  else:
    halt immediately

ask what Weird(Weird) does`,
    takeaway:
      'Self-reference breaks the assumption. The result is not a slow algorithm; it is the impossibility of a fully general one.',
  },
]

const glossary = [
  {
    term: 'Admissible heuristic',
    definition: 'A heuristic that never overestimates the true remaining cost to a goal.',
  },
  {
    term: 'Approximation ratio',
    definition: "A worst-case bound comparing an algorithm's answer to the optimum.",
  },
  {
    term: 'Blocking pair',
    definition:
      'In stable matching, a pair of participants who prefer each other over their assigned partners.',
  },
  {
    term: 'Certificate',
    definition:
      'A concrete object, such as a path or assignment, that can be checked to justify a claimed solution.',
  },
  {
    term: 'Deadlock',
    definition:
      'A state in which progress stops because competing processes wait on one another indefinitely.',
  },
  { term: 'Decision problem', definition: 'A problem whose output is a yes or no answer.' },
  { term: 'Liveness', definition: 'A guarantee that useful progress eventually happens.' },
  {
    term: 'Negative cycle',
    definition:
      'A cycle whose total weight is negative, allowing path cost to decrease without bound.',
  },
  {
    term: 'NP-complete',
    definition: 'A problem that is both in NP and at least as hard as every other problem in NP.',
  },
  {
    term: 'NP-hard',
    definition:
      'A problem at least as hard as every problem in NP, whether or not it is itself in NP.',
  },
  {
    term: 'Optimization problem',
    definition: 'A problem asking for the best feasible solution under a stated objective.',
  },
  {
    term: 'Residual graph',
    definition: 'A graph showing remaining capacity and reversible choices in a flow network.',
  },
  {
    term: 'Reduction',
    definition: 'A transformation from one problem to another that preserves the relevant answers.',
  },
  {
    term: 'Safe state',
    definition:
      "In banker's algorithm, a resource-allocation state from which some completion order still exists.",
  },
  { term: 'Safety', definition: 'A guarantee that forbidden bad states do not occur.' },
  {
    term: 'Starvation',
    definition: 'Indefinite postponement of a process that should eventually make progress.',
  },
  {
    term: 'Undecidable',
    definition:
      'A property of problems for which no general algorithm can always produce the correct answer.',
  },
  {
    term: 'Witness',
    definition:
      'A short proof object, such as a satisfying assignment, that verifies a yes-instance.',
  },
]

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'cp98-overview', label: 'Overview' },
    { id: 'cp98-why', label: 'Why It Matters' },
    { id: 'cp98-history', label: 'Historical Context' },
    { id: 'cp98-families', label: 'Problem Families' },
    { id: 'cp98-directory', label: 'Problem Directory' },
    { id: 'cp98-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'cp98-signals', label: 'Recognition Signals' },
    { id: 'cp98-modeling', label: 'Modeling Foundations' },
    { id: 'cp98-proofs', label: 'Proof Patterns' },
    { id: 'cp98-tractability', label: 'Tractability Spectrum' },
    { id: 'cp98-sync', label: 'Synchronization Reasoning' },
    { id: 'cp98-compare', label: 'Compare and Contrast' },
    { id: 'cp98-failures', label: 'Failure Modes' },
    { id: 'cp98-checklist', label: 'Study Checklist' },
  ],
  examples: examples.map((example) => ({ id: example.id, label: example.title })),
  glossary: [{ id: 'cp98-glossary', label: 'Terms' }],
}

function toProblemRoute(name: string): string {
  return `${CLASSIC_PROBLEMS_BASE_ROUTE}/${slugifySegment(name)}`
}

export default function ClassicProblemsPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Classic Problems',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Classic Problems"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Classic Problems</h1>
      <p className="cp98-intro">
        This page is the subsection overview for the classic problems inside CS Problems &amp;
        Theory. It is meant to help you see how famous puzzles and benchmarks connect to broader
        themes such as graph structure, complexity, reductions, heuristic search, synchronization
        policy, and computability limits.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="cp98-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            {overviewSections.map((section) => (
              <div key={section.title}>
                <h3 className="bin98-subheading">{section.title}</h3>
                <p>{section.body}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="cp98-why" className="bin98-section">
            <h2 className="bin98-heading">Why It Matters</h2>
            <ul>
              {whyItMatters.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <hr className="bin98-divider" />

          <section id="cp98-history" className="bin98-section">
            <h2 className="bin98-heading">Historical Context</h2>
            {historicalContext.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="cp98-families" className="bin98-section">
            <h2 className="bin98-heading">Problem Families</h2>
            {problemFamilies.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="cp98-directory" className="bin98-section">
            <h2 className="bin98-heading">Problem Directory</h2>
            <p>
              The pages below are the actual classic-problem entries in this subsection. Use this
              list as a map of the terrain rather than as a random catalog. Each problem exists here
              because it teaches a recurring pattern that appears far beyond the toy statement.
            </p>
            {problemDirectory.map((group) => (
              <div key={group.heading}>
                <h3 className="bin98-subheading">{group.heading}</h3>
                {group.items.map((item) => (
                  <div key={item.name}>
                    <p>
                      <Link to={toProblemRoute(item.name)} className="cp98-inline-link">
                        {item.name}
                      </Link>
                    </p>
                    <p>{item.summary}</p>
                  </div>
                ))}
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="cp98-takeaways" className="bin98-section">
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
          <section id="cp98-signals" className="bin98-section">
            <h2 className="bin98-heading">Recognition Signals</h2>
            {recognitionSignals.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="cp98-modeling" className="bin98-section">
            <h2 className="bin98-heading">Modeling Foundations</h2>
            {modelingFoundations.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="cp98-proofs" className="bin98-section">
            <h2 className="bin98-heading">Proof Patterns</h2>
            {proofPatterns.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="cp98-tractability" className="bin98-section">
            <h2 className="bin98-heading">Tractability Spectrum</h2>
            {tractabilitySpectrum.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="cp98-sync" className="bin98-section">
            <h2 className="bin98-heading">Synchronization Reasoning</h2>
            {synchronizationReasoning.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="cp98-compare" className="bin98-section">
            <h2 className="bin98-heading">Compare and Contrast</h2>
            {comparisons.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="cp98-failures" className="bin98-section">
            <h2 className="bin98-heading">Failure Modes</h2>
            {failureModes.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="cp98-checklist" className="bin98-section">
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
          {examples.map((example) => (
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
        <section id="cp98-glossary" className="bin98-section">
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
