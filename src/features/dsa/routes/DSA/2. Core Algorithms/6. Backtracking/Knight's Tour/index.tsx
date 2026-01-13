import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: 'A chess puzzle tradition (1700s)',
    detail:
      'The Knight\'s Tour appears in early chess puzzle collections, emphasizing exploration of the board.',
  },
  {
    title: 'Euler studies tours (1759)',
    detail:
      'Leonhard Euler analyzed the knight\'s tour and constructed systematic patterns for solving it.',
  },
  {
    title: 'Backtracking popularized (1950s)',
    detail:
      'Computer scientists used backtracking to search for tours on large boards, proving existence and generating examples.',
  },
  {
    title: 'Warnsdorff\'s heuristic (1823)',
    detail:
      'Warnsdorff\'s rule suggested moving to the square with the fewest onward moves, a powerful pruning heuristic.',
  },
]

const mentalModels = [
  {
    title: 'Hamiltonian path',
    detail:
      'The tour is a Hamiltonian path on the knight\'s move graph of the board: visit every square exactly once.',
  },
  {
    title: 'Exploration with memory',
    detail:
      'The knight explores, but never revisits a square. Backtracking is the memory that undoes bad paths.',
  },
  {
    title: 'Degree-first strategy',
    detail:
      'Warnsdorff\'s heuristic chooses the most constrained next square, reducing dead ends.',
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
  'Order candidate moves (optionally by Warnsdorff\'s rule).',
  'Choose a move, mark it with the next move number, and recurse.',
  'If recursion fails, unmark the square and try another move.',
  'If the move number reaches n*n, a tour is found.',
]

const dataStructures = [
  {
    title: 'Board matrix',
    detail:
      'A 2D array stores the move index for each square. -1 denotes unvisited.',
  },
  {
    title: 'Move list',
    detail:
      'Predefine the 8 knight offsets: (±2, ±1) and (±1, ±2).',
  },
  {
    title: 'Validity checker',
    detail:
      'A helper ensures row/col are in bounds and the target square is unvisited.',
  },
  {
    title: 'Heuristic ordering',
    detail:
      'Compute onward degree for each candidate to implement Warnsdorff ordering.',
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
    detail:
      'Every accepted solution is a valid tour because only legal knight moves are allowed.',
  },
  {
    title: 'Heuristic safety',
    detail:
      'Warnsdorff ordering does not prune solutions; it only changes the search order.',
  },
]

const complexityNotes = [
  {
    title: 'Worst-case time',
    detail:
      'Exponential in n^2. The branching factor is up to 8, and the depth is n^2.',
  },
  {
    title: 'Space complexity',
    detail:
      'O(n^2) for the board plus recursion stack up to depth n^2.',
  },
  {
    title: 'Heuristic effect',
    detail:
      'Warnsdorff\'s rule drastically cuts the search space in practice on standard boards.',
  },
  {
    title: 'Scalability',
    detail:
      'Large boards may still be expensive; heuristic or randomized strategies help.',
  },
]

const edgeCases = [
  {
    title: 'Small boards',
    detail:
      'Tours do not exist for 1x1? (trivial) or 2x2, 3x3, 4x4 in closed form. Some sizes only allow open tours.',
  },
  {
    title: 'Starting position',
    detail:
      'Some starting squares make search harder; symmetry can reduce redundant work.',
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
      'The knight\'s tour is a concrete Hamiltonian path problem, useful for teaching graph traversal.',
  },
  {
    context: 'Constraint programming',
    detail:
      'It models constraint satisfaction with backtracking and heuristics.',
  },
  {
    context: 'Robotics path planning',
    detail:
      'Tour-like traversal covers all cells without repetition, similar to coverage path planning.',
  },
  {
    context: 'Puzzle generation',
    detail:
      'Used to create grid-based puzzles and games with unique traversal solutions.',
  },
  {
    context: 'Algorithm visualization',
    detail:
      'Perfect for demonstrating recursion, backtracking, and heuristic ordering.',
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
    explanation:
      'A closed tour requires the last square to connect back to the start.',
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
    detail:
      'Tours on boards with holes or irregular shapes become graph traversal problems.',
  },
  {
    title: 'Randomized search',
    detail:
      'Randomized move ordering can find tours quickly and generate diverse solutions.',
  },
]

const takeaways = [
  'The knight\'s tour is a Hamiltonian path on a chessboard graph.',
  'Backtracking guarantees correctness but is exponential in the worst case.',
  'Warnsdorff\'s heuristic often makes the search fast enough for standard boards.',
  'Closed tours require an additional adjacency check to the starting square.',
]

export default function KnightsTourPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Knight's Tour</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Backtracking across the chessboard without revisits</div>
              <p className="win95-text">
                The knight\'s tour asks for a sequence of knight moves that visits every square exactly once. It is a classic
                backtracking puzzle that highlights recursion, constraint checks, and the power of heuristics such as Warnsdorff\'s rule.
              </p>
            </div>
            <Link to="/algoViz" className="win95-button" role="button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-fieldset">
            <legend>The big picture</legend>
            <div className="win95-panel">
              <p className="win95-text">
                Model the board as a graph where each square connects to its knight moves. The goal is a Hamiltonian path that visits
                every vertex exactly once. Backtracking explores the path while pruning illegal revisits.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Historical context</legend>
            <div className="win95-grid win95-grid-2">
              {historicalMilestones.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Core concept and mental models</legend>
            <div className="win95-grid win95-grid-2">
              {mentalModels.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>What the algorithm does</legend>
            <div className="win95-grid win95-grid-2">
              {coreIdeas.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Step-by-step process</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                {algorithmSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Data structures used</legend>
            <div className="win95-grid win95-grid-2">
              {dataStructures.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Why the backtracking works</legend>
            <div className="win95-grid win95-grid-2">
              {correctnessNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                The search explores all legal move sequences, so it is complete. Heuristics only change ordering, not correctness.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity analysis</legend>
            <div className="win95-grid win95-grid-2">
              {complexityNotes.map((note) => (
                <div key={note.title} className="win95-panel">
                  <div className="win95-heading">{note.title}</div>
                  <p className="win95-text">{note.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Edge cases and conventions</legend>
            <div className="win95-grid win95-grid-2">
              {edgeCases.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Real-world applications</legend>
            <div className="win95-grid win95-grid-2">
              {realWorldUses.map((item) => (
                <div key={item.context} className="win95-panel">
                  <div className="win95-heading">{item.context}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Practical examples</legend>
            <div className="win95-stack">
              {examples.map((example) => (
                <div key={example.title} className="win95-panel">
                  <div className="win95-heading">{example.title}</div>
                  <pre className="win95-code">
                    <code>{example.code}</code>
                  </pre>
                  <p className="win95-text">{example.explanation}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Common pitfalls</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {pitfalls.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Variants and extensions</legend>
            <div className="win95-grid win95-grid-2">
              {variants.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Key takeaways</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {takeaways.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}

