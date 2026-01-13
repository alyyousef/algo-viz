import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: 'Classic puzzle roots (1900s)',
    detail:
      'Maze traversal puzzles inspired early algorithmic thinking about paths and dead ends.',
  },
  {
    title: 'Depth-first search formalized (1950s)',
    detail:
      'DFS provided a systematic way to explore mazes and became a foundation for backtracking.',
  },
  {
    title: 'Grid pathfinding in AI (1970s)',
    detail:
      'Grid worlds and maze problems were standard benchmarks for search and planning systems.',
  },
  {
    title: 'Teaching backtracking (1990s)',
    detail:
      'Rat in a Maze became a go-to educational problem for recursion and state undo.',
  },
]

const mentalModels = [
  {
    title: 'Left-hand rule with memory',
    detail:
      'Try a direction, but if you hit a wall or a loop, back up and try another path.',
  },
  {
    title: 'Grid as a graph',
    detail:
      'Each open cell is a node. Moves connect adjacent nodes. The rat finds a path from start to finish.',
  },
  {
    title: 'Exploration tree',
    detail:
      'Each move is a branch in a tree of choices. Backtracking prunes dead branches.',
  },
]

const coreIdeas = [
  {
    title: 'Problem statement',
    detail:
      'Given a grid with open and blocked cells, find a path from the top-left to the bottom-right.',
  },
  {
    title: 'Backtracking approach',
    detail:
      'Move step by step. If a move leads to a dead end, undo and try another direction.',
  },
  {
    title: 'Path marking',
    detail:
      'Mark the current cell in a solution matrix. Unmark it when backtracking.',
  },
  {
    title: 'Multiple solutions',
    detail:
      'You can stop at the first path or continue to enumerate all possible paths.',
  },
]

const algorithmSteps = [
  'Start at (0, 0). If the start is blocked, return no solution.',
  'Mark the current cell as part of the path.',
  'Try moves (usually right and down, or all four directions) in a chosen order.',
  'If a move is valid, recurse into that cell.',
  'If recursion fails, unmark the cell and try the next move.',
  'If the destination is reached, record the path as a solution.',
]

const dataStructures = [
  {
    title: 'Maze grid',
    detail:
      'A 2D array where 1 means open and 0 means blocked. Defines legal positions.',
  },
  {
    title: 'Solution matrix',
    detail:
      'Tracks the current path. Useful for printing or returning the path.',
  },
  {
    title: 'Visited set',
    detail:
      'If you allow four directions, a visited tracker prevents cycles.',
  },
  {
    title: 'Move list',
    detail:
      'List of allowed moves: right/down for constrained version, or all four directions for full search.',
  },
]

const correctnessNotes = [
  {
    title: 'Invariant',
    detail:
      'The solution matrix always represents a valid path of open cells from the start to the current cell.',
  },
  {
    title: 'Completeness',
    detail:
      'Backtracking explores all possible paths (given the move set), so a solution is found if one exists.',
  },
  {
    title: 'Soundness',
    detail:
      'Only valid moves to open cells are taken, so any solution returned is valid.',
  },
  {
    title: 'Termination',
    detail:
      'The recursion depth is bounded by the number of cells; visited checks prevent cycles.',
  },
]

const complexityNotes = [
  {
    title: 'Worst-case time',
    detail:
      'Exponential in the number of cells for unrestricted moves, because many paths may be explored.',
  },
  {
    title: 'Space complexity',
    detail:
      'O(n^2) for the grid and solution matrix, plus recursion depth up to n^2.',
  },
  {
    title: 'Directional constraints',
    detail:
      'Restricting moves to right and down makes the search smaller but may miss valid paths.',
  },
  {
    title: 'Enumeration cost',
    detail:
      'Listing all solutions can be huge; stopping after the first keeps the search short.',
  },
]

const edgeCases = [
  {
    title: 'Blocked start or end',
    detail:
      'If the start or destination cell is blocked, there is no solution.',
  },
  {
    title: 'Single-cell maze',
    detail:
      'A 1x1 grid is trivially solved if the cell is open.',
  },
  {
    title: 'Cycles in 4-direction mode',
    detail:
      'If moving in all four directions, visited tracking is required to avoid infinite loops.',
  },
  {
    title: 'Multiple shortest paths',
    detail:
      'Backtracking does not guarantee shortest paths; it finds any valid path by its move order.',
  },
]

const realWorldUses = [
  {
    context: 'Robotics navigation',
    detail:
      'Robots in grid worlds must find collision-free paths with obstacles.',
  },
  {
    context: 'Puzzle solving',
    detail:
      'Maze-based games and puzzles use similar backtracking to verify solvability.',
  },
  {
    context: 'Routing',
    detail:
      'Finding routes in constrained spaces with obstacles mirrors grid traversal.',
  },
  {
    context: 'AI search demos',
    detail:
      'Rat in a Maze is a simple demonstration of DFS and backtracking.',
  },
  {
    context: 'Constraint satisfaction',
    detail:
      'It models decision sequences with constraints and dead ends.',
  },
]

const examples = [
  {
    title: 'Backtracking pseudocode',
    code: `function solveMaze(x, y):
    if (x, y) is destination:
        mark and return true
    if not safe(x, y): return false

    mark (x, y) as part of path
    for each move in moves:
        if solveMaze(x + move.dx, y + move.dy): return true
    unmark (x, y)
    return false`,
    explanation:
      'Try a move, recurse, and backtrack if it fails. The first success yields a path.',
  },
  {
    title: 'Right and down only',
    code: `moves = [(0, 1), (1, 0)]
// This version only searches monotonic paths.`,
    explanation:
      'Restricting to right/down reduces branching but can miss valid solutions.',
  },
  {
    title: 'Enumerating all paths',
    code: `if (x, y) is destination:
    add current path to results
    return
for each move:
    recurse without returning early`,
    explanation:
      'Do not stop at the first success if you want all possible solutions.',
  },
]

const pitfalls = [
  'Forgetting to unmark cells when backtracking, which blocks valid paths.',
  'Allowing four-direction moves without a visited tracker, causing infinite loops.',
  'Assuming the first path is shortest; DFS is not optimal for length.',
  'Hard-coding move order without understanding its impact on the returned path.',
  'Returning success before marking the destination in the solution matrix.',
]

const variants = [
  {
    title: 'Shortest path version',
    detail:
      'Use BFS or Dijkstra instead of backtracking to guarantee shortest paths.',
  },
  {
    title: 'Weighted cells',
    detail:
      'Costs on cells turn it into a weighted pathfinding problem.',
  },
  {
    title: 'Multiple destinations',
    detail:
      'Stop when reaching any of several goal cells, or enumerate paths to all of them.',
  },
  {
    title: 'Diagonal moves',
    detail:
      'Allowing diagonals increases branching and requires updated validity checks.',
  },
]

const takeaways = [
  'Rat in a Maze demonstrates classic DFS backtracking on a grid.',
  'Marking and unmarking cells is essential for correctness.',
  'Move ordering and allowed directions shape which solution you get.',
  'For shortest paths, use BFS or Dijkstra rather than backtracking.',
]

export default function RatInMazePage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Rat in a Maze</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Backtracking through a grid of obstacles</div>
              <p className="win95-text">
                Rat in a Maze is a classic backtracking problem: move through a grid from start to finish while avoiding blocked cells.
                The algorithm tries steps, records the path, and backtracks whenever it hits a dead end.
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
                The maze is a grid graph with obstacles. Backtracking searches for a path by exploring moves, undoing them when they fail.
                It is a simple but powerful example of depth-first search on a constrained space.
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
                Backtracking explores all reachable paths consistent with the move rules, so it is complete and correct.
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

