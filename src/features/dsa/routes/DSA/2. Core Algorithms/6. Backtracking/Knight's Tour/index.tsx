import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

const historicalMilestones = [
  {
    title: 'A chess puzzle tradition (1700s)',
    detail:
      "The Knight's Tour appears in early chess puzzle collections, emphasizing exploration of the board.",
  },
  {
    title: 'Euler studies tours (1759)',
    detail:
      "Leonhard Euler analyzed the knight's tour and constructed systematic patterns for solving it.",
  },
  {
    title: 'Backtracking popularized (1950s)',
    detail:
      'Computer scientists used backtracking to search for tours on large boards, proving existence and generating examples.',
  },
  {
    title: "Warnsdorff's heuristic (1823)",
    detail:
      "Warnsdorff's rule suggested moving to the square with the fewest onward moves, a powerful pruning heuristic.",
  },
]

const mentalModels = [
  {
    title: 'Hamiltonian path',
    detail:
      "The tour is a Hamiltonian path on the knight's move graph of the board: visit every square exactly once.",
  },
  {
    title: 'Exploration with memory',
    detail:
      'The knight explores, but never revisits a square. Backtracking is the memory that undoes bad paths.',
  },
  {
    title: 'Degree-first strategy',
    detail: "Warnsdorff's heuristic chooses the most constrained next square, reducing dead ends.",
  },
]

const coreIdeas = [
  {
    title: 'Problem statement',
    detail:
      'Find a sequence of knight moves that visits every square on an n x n chessboard exactly once.',
  },
  {
    title: 'Closed vs open tour',
    detail:
      'A closed tour ends one knight move away from the starting square; an open tour does not require that.',
  },
  {
    title: 'Backtracking search',
    detail:
      'Try moves recursively. If you get stuck before visiting all squares, backtrack and try a different move.',
  },
  {
    title: 'Heuristics matter',
    detail:
      'Naive backtracking can explode. Ordering moves by least onward degree often finds tours quickly.',
  },
]

const algorithmSteps = [
  'Initialize the board with -1 (unvisited) and place the knight at the starting square as move 0.',
  'At each step, generate all valid knight moves that stay on the board and go to unvisited squares.',
  "Order candidate moves (optionally by Warnsdorff's rule).",
  'Choose a move, mark it with the next move number, and recurse.',
  'If recursion fails, unmark the square and try another move.',
  'If the move number reaches n*n, a tour is found.',
]

const dataStructures = [
  {
    title: 'Board matrix',
    detail: 'A 2D array stores the move index for each square. -1 denotes unvisited.',
  },
  {
    title: 'Move list',
    detail:
      'Predefine the 8 knight offsets: (+2, +1), (+2, -1), (-2, +1), (-2, -1), (+1, +2), (+1, -2), (-1, +2), (-1, -2).',
  },
  {
    title: 'Validity checker',
    detail: 'A helper ensures row/col are in bounds and the target square is unvisited.',
  },
  {
    title: 'Heuristic ordering',
    detail: 'Compute onward degree for each candidate to implement Warnsdorff ordering.',
  },
]

const correctnessNotes = [
  {
    title: 'Invariant',
    detail:
      'All visited squares have distinct move numbers, and the knight has visited each exactly once.',
  },
  {
    title: 'Completeness',
    detail:
      'Backtracking explores all valid move sequences, guaranteeing a tour will be found if one exists.',
  },
  {
    title: 'Soundness',
    detail: 'Every accepted solution is a valid tour because only legal knight moves are allowed.',
  },
  {
    title: 'Heuristic safety',
    detail: 'Warnsdorff ordering does not prune solutions; it only changes the search order.',
  },
]

const complexityNotes = [
  {
    title: 'Worst-case time',
    detail: 'Exponential in n^2. The branching factor is up to 8, and the depth is n^2.',
  },
  {
    title: 'Space complexity',
    detail: 'O(n^2) for the board plus recursion stack up to depth n^2.',
  },
  {
    title: 'Heuristic effect',
    detail: "Warnsdorff's rule drastically cuts the search space in practice on standard boards.",
  },
  {
    title: 'Scalability',
    detail: 'Large boards may still be expensive; heuristic or randomized strategies help.',
  },
]

const edgeCases = [
  {
    title: 'Small boards',
    detail: 'Tours do not exist for 2x2, 3x3, or 4x4 boards. 1x1 is a trivial open tour.',
  },
  {
    title: 'Starting position',
    detail: 'Some starting squares make search harder; symmetry can reduce redundant work.',
  },
  {
    title: 'Closed tour requirement',
    detail:
      'If you require a closed tour, add a final check that the last square is a knight move away from the start.',
  },
  {
    title: 'Obstacles or missing squares',
    detail:
      'Removing squares turns it into a pathfinding problem on an irregular graph; tours may not exist.',
  },
]

const realWorldUses = [
  {
    context: 'Hamiltonian path search',
    detail:
      "The knight's tour is a concrete Hamiltonian path problem, useful for teaching graph traversal.",
  },
  {
    context: 'Constraint programming',
    detail: 'It models constraint satisfaction with backtracking and heuristics.',
  },
  {
    context: 'Robotics path planning',
    detail:
      'Tour-like traversal covers all cells without repetition, similar to coverage path planning.',
  },
  {
    context: 'Puzzle generation',
    detail: 'Used to create grid-based puzzles and games with unique traversal solutions.',
  },
  {
    context: 'Algorithm visualization',
    detail: 'Perfect for demonstrating recursion, backtracking, and heuristic ordering.',
  },
]

const examples = [
  {
    title: 'Backtracking pseudocode',
    code: `function solveKnight(x, y, moveIndex):
    if moveIndex == n*n: return true
    for (dx, dy) in moves:
        nx = x + dx, ny = y + dy
        if isValid(nx, ny):
            board[nx][ny] = moveIndex
            if solveKnight(nx, ny, moveIndex + 1): return true
            board[nx][ny] = -1
    return false`,
    explanation:
      'The recursion tries all moves from the current square, undoing choices when stuck.',
  },
  {
    title: 'Warnsdorff ordering',
    code: `function orderedMoves(x, y):
    candidates = []
    for move in moves:
        nx, ny = x + move.dx, y + move.dy
        if isValid(nx, ny):
            degree = countOnwardMoves(nx, ny)
            candidates.push((degree, nx, ny))
    return candidates sorted by degree`,
    explanation:
      'The heuristic prefers squares with fewer onward moves to avoid trapping the knight.',
  },
  {
    title: 'Closed tour check',
    code: `if moveIndex == n*n:
    return isKnightMove(x, y, startX, startY)`,
    explanation: 'A closed tour requires the last square to connect back to the start.',
  },
]

const pitfalls = [
  'Failing to mark and unmark squares correctly, causing repeated visits or missed solutions.',
  'Using a fixed move order without heuristics, which can be extremely slow.',
  'Mixing row/column indices and coordinate systems, leading to invalid moves.',
  'Forgetting to handle the closed tour constraint when required.',
  'Assuming tours exist for all board sizes; some sizes have no solutions.',
]

const variants = [
  {
    title: 'Warnsdorff with tie-breaks',
    detail:
      'When multiple moves have the same degree, apply a secondary heuristic or randomization.',
  },
  {
    title: 'Divide and conquer construction',
    detail:
      'For large boards, constructive methods stitch together known tours rather than backtracking.',
  },
  {
    title: 'Obstacles and shapes',
    detail: 'Tours on boards with holes or irregular shapes become graph traversal problems.',
  },
  {
    title: 'Randomized search',
    detail: 'Randomized move ordering can find tours quickly and generate diverse solutions.',
  },
]

const takeaways = [
  "The knight's tour is a Hamiltonian path on a chessboard graph.",
  'Backtracking guarantees correctness but is exponential in the worst case.',
  "Warnsdorff's heuristic often makes the search fast enough for standard boards.",
  'Closed tours require an additional adjacency check to the starting square.',
]

const quickGlossary = [
  {
    term: "Knight's move graph",
    definition: 'Graph where each square is a vertex and edges represent legal knight moves.',
  },
  {
    term: 'Open tour',
    definition: 'Tour visiting every square once without needing to return to the start.',
  },
  {
    term: 'Closed tour',
    definition: 'Tour where the last square is one knight move from the start.',
  },
  {
    term: "Warnsdorff's rule",
    definition: 'Heuristic that picks the next square with the fewest onward moves.',
  },
  {
    term: 'Onward degree',
    definition: 'Number of valid next moves from a candidate square.',
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
    { id: 'bp-models', label: 'Mental Models' },
    { id: 'bp-applications', label: 'Real-World Applications' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-ideas', label: 'What the Algorithm Does' },
    { id: 'core-steps', label: 'Step-by-Step Process' },
    { id: 'core-structures', label: 'Data Structures Used' },
    { id: 'core-correctness', label: 'Why Backtracking Works' },
    { id: 'core-complexity', label: 'Complexity Analysis' },
    { id: 'core-edge-cases', label: 'Edge Cases and Conventions' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-variants', label: 'Variants and Extensions' },
  ],
  examples: [{ id: 'ex-practical', label: 'Practical Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function KnightsTourPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Knight&apos;s Tour',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Knight's Tour"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Knight&apos;s Tour</h1>
      <p>
        Backtracking across the chessboard without revisits. The knight&apos;s tour asks for a
        sequence of knight moves that visits every square exactly once. It is a classic backtracking
        puzzle that highlights recursion, constraint checks, and the power of heuristics such as
        Warnsdorff&apos;s rule.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            <p>
              Model the board as a graph where each square connects to its knight moves. The goal is
              a Hamiltonian path that visits every vertex exactly once. Backtracking explores the
              path while pruning illegal revisits.
            </p>
          </section>
          <hr className="bin98-divider" />
          <section id="bp-history" className="bin98-section">
            <h2 className="bin98-heading">Historical Context</h2>
            {historicalMilestones.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>
          <section id="bp-models" className="bin98-section">
            <h2 className="bin98-heading">Core Concept and Mental Models</h2>
            {mentalModels.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="bp-applications" className="bin98-section">
            <h2 className="bin98-heading">Real-World Applications</h2>
            {realWorldUses.map((item) => (
              <p key={item.context}>
                <strong>{item.context}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="bp-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key Takeaways</h2>
            <ul>
              {takeaways.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {activeTab === 'core-concepts' && (
        <>
          <section id="core-ideas" className="bin98-section">
            <h2 className="bin98-heading">What the Algorithm Does</h2>
            {coreIdeas.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-steps" className="bin98-section">
            <h2 className="bin98-heading">Step-by-Step Process</h2>
            <ol>
              {algorithmSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>
          <section id="core-structures" className="bin98-section">
            <h2 className="bin98-heading">Data Structures Used</h2>
            {dataStructures.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-correctness" className="bin98-section">
            <h2 className="bin98-heading">Why the Backtracking Works</h2>
            {correctnessNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
            <p>
              The search explores all legal move sequences, so it is complete. Heuristics only
              change ordering, not correctness.
            </p>
          </section>
          <section id="core-complexity" className="bin98-section">
            <h2 className="bin98-heading">Complexity Analysis</h2>
            {complexityNotes.map((note) => (
              <p key={note.title}>
                <strong>{note.title}:</strong> {note.detail}
              </p>
            ))}
          </section>
          <section id="core-edge-cases" className="bin98-section">
            <h2 className="bin98-heading">Edge Cases and Conventions</h2>
            {edgeCases.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-pitfalls" className="bin98-section">
            <h2 className="bin98-heading">Common Pitfalls</h2>
            <ul>
              {pitfalls.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section id="core-variants" className="bin98-section">
            <h2 className="bin98-heading">Variants and Extensions</h2>
            {variants.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
        </>
      )}

      {activeTab === 'examples' && (
        <section id="ex-practical" className="bin98-section">
          <h2 className="bin98-heading">Practical Examples</h2>
          {examples.map((example) => (
            <div key={example.title}>
              <h3 className="bin98-subheading">{example.title}</h3>
              <div className="bin98-codebox">
                <code>{example.code.trim()}</code>
              </div>
              <p>{example.explanation}</p>
            </div>
          ))}
        </section>
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
