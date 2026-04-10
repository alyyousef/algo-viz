import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

const historicalMilestones = [
  {
    title: 'Number place origin (1979)',
    detail: 'The puzzle appeared as "Number Place" before the name Sudoku popularized it.',
  },
  {
    title: 'Sudoku boom (2004)',
    detail:
      'Global popularity led to extensive research into solving strategies and algorithmic approaches.',
  },
  {
    title: 'Constraint satisfaction model',
    detail:
      'Sudoku is a classic CSP with row, column, and subgrid constraints, ideal for backtracking.',
  },
  {
    title: 'Heuristic solvers',
    detail: 'Techniques like MRV and forward checking made solvers far more efficient.',
  },
]

const mentalModels = [
  {
    title: 'Latin square with boxes',
    detail: 'Each row and column must contain 1-9 exactly once, plus each 3x3 subgrid.',
  },
  {
    title: 'Constraint propagation',
    detail:
      'Each placement reduces options in its row, column, and box, shrinking the search space.',
  },
  {
    title: 'Search with backtrack',
    detail: 'When a choice leads to no valid candidates, undo and try the next candidate.',
  },
]

const coreIdeas = [
  {
    title: 'Problem statement',
    detail:
      'Fill a 9x9 grid with digits 1-9 so each row, column, and 3x3 box contains every digit exactly once.',
  },
  {
    title: 'Backtracking approach',
    detail:
      'Pick an empty cell, try a valid digit, recurse, and backtrack if it leads to a contradiction.',
  },
  {
    title: 'Constraints',
    detail: 'Validity requires the chosen digit to be absent in the row, column, and 3x3 box.',
  },
  {
    title: 'Heuristics',
    detail: 'Select the cell with the fewest candidates (MRV) to reduce branching.',
  },
]

const algorithmSteps = [
  'Find the next empty cell (or choose the one with the fewest candidates).',
  'List valid digits for that cell using row, column, and box constraints.',
  'Try each digit, place it, and recurse.',
  'If the recursion fails, remove the digit and try the next.',
  'If no digits work, backtrack.',
  'When all cells are filled, the puzzle is solved.',
]

const dataStructures = [
  {
    title: 'Grid matrix',
    detail: 'A 9x9 array storing digits; 0 or . represents an empty cell.',
  },
  {
    title: 'Row/column/box sets',
    detail: 'Track used digits to test validity quickly without scanning the whole row each time.',
  },
  {
    title: 'Candidate generator',
    detail: 'Build possible digits for a cell by subtracting row, column, and box digits from 1-9.',
  },
  {
    title: 'Empty cell list',
    detail: 'Precompute a list of empty cells to avoid scanning repeatedly.',
  },
]

const correctnessNotes = [
  {
    title: 'Invariant',
    detail: 'All filled cells respect row, column, and box constraints at every step.',
  },
  {
    title: 'Completeness',
    detail: 'Backtracking explores all possible fillings consistent with current constraints.',
  },
  {
    title: 'Soundness',
    detail: 'A solution is accepted only if every cell is filled without constraint violations.',
  },
  {
    title: 'Heuristic safety',
    detail: 'MRV and ordering heuristics change search order but do not remove valid solutions.',
  },
]

const complexityNotes = [
  {
    title: 'Worst-case time',
    detail: 'Exponential in the number of empty cells; Sudoku is NP-complete in generalized form.',
  },
  {
    title: 'Space complexity',
    detail: 'O(81) for the grid plus recursion depth up to the number of empty cells.',
  },
  {
    title: 'Heuristic impact',
    detail: 'MRV and forward checking dramatically reduce the search tree for real puzzles.',
  },
  {
    title: 'Constraint propagation',
    detail:
      'Combining backtracking with constraint propagation can solve many puzzles without deep search.',
  },
]

const edgeCases = [
  {
    title: 'Invalid puzzle',
    detail: 'If the initial grid violates constraints, the solver should fail early.',
  },
  {
    title: 'Multiple solutions',
    detail: 'Some puzzles have more than one solution; decide whether to return first or all.',
  },
  {
    title: 'Empty grid',
    detail: 'An empty grid has many solutions; backtracking without heuristics may be too slow.',
  },
  {
    title: 'Non-standard sizes',
    detail: 'Sudoku can be generalized to n^2 x n^2 grids; adapt box size accordingly.',
  },
]

const realWorldUses = [
  {
    context: 'Constraint satisfaction',
    detail: 'Sudoku is a clean example of CSPs used in scheduling and configuration problems.',
  },
  {
    context: 'SAT solvers',
    detail: 'Sudoku can be encoded as SAT and solved by generic constraint solvers.',
  },
  {
    context: 'Puzzle generation',
    detail: 'Solvers are used to ensure puzzles are valid and have unique solutions.',
  },
  {
    context: 'AI education',
    detail: 'Sudoku is a common demonstration of backtracking, heuristics, and pruning.',
  },
  {
    context: 'Verification systems',
    detail: 'Constraint checking parallels validation in configuration and rule-based systems.',
  },
]

const examples = [
  {
    title: 'Backtracking pseudocode',
    code: `function solve():
    cell = findEmptyCell()
    if cell is None: return true
    for digit in candidates(cell):
        place digit
        if solve(): return true
        remove digit
    return false`,
    explanation: 'Try a digit, recurse, and undo if it leads to a dead end.',
  },
  {
    title: 'Row/column/box check',
    code: `function isValid(r, c, digit):
    return digit not in row[r]
       and digit not in col[c]
       and digit not in box[boxIndex(r, c)]`,
    explanation: 'Fast validity checks are crucial for performance.',
  },
  {
    title: 'MRV heuristic',
    code: `choose cell with fewest candidates
try candidates in increasing order`,
    explanation: 'Selecting the most constrained cell reduces branching.',
  },
]

const pitfalls = [
  'Recomputing constraints by scanning rows/columns each time, which is slow.',
  'Failing to undo row/column/box bookkeeping when backtracking.',
  'Assuming a puzzle is valid without checking initial constraints.',
  'Not handling multiple solutions when uniqueness matters.',
  'Ignoring MRV or heuristics, which can make some puzzles infeasible to solve.',
]

const variants = [
  {
    title: 'Exact cover (DLX)',
    detail: 'Sudoku can be solved as an exact cover problem using Dancing Links for efficiency.',
  },
  {
    title: 'Constraint propagation',
    detail:
      'Techniques like naked singles and hidden singles can solve many puzzles without deep search.',
  },
  {
    title: 'Randomized solver',
    detail: 'Randomize candidate ordering to generate diverse solutions and puzzles.',
  },
  {
    title: 'Generalized Sudoku',
    detail: 'Apply the same algorithm to 4x4, 16x16, or other n^2 grids with adjusted constraints.',
  },
]

const takeaways = [
  'Sudoku is a constraint satisfaction problem solved effectively by backtracking.',
  'Fast constraint checks and heuristics like MRV make the solver practical.',
  'The algorithm is complete and correct but exponential in the worst case.',
  'Sudoku illustrates how constraints prune large search spaces.',
]

const glossaryTerms = [
  {
    term: 'Constraint satisfaction problem',
    definition:
      'A problem where values must be assigned so that all stated rules remain satisfied.',
  },
  {
    term: 'MRV',
    definition:
      'Minimum Remaining Values, a heuristic that chooses the cell with the fewest legal candidates first.',
  },
  {
    term: 'Constraint propagation',
    definition: 'Using known placements to eliminate impossible values from related cells.',
  },
  {
    term: 'Candidate',
    definition: 'A digit that can still legally be placed in a particular empty cell.',
  },
  {
    term: 'Subgrid',
    definition: 'One of the nine 3x3 boxes in a standard 9x9 Sudoku.',
  },
  {
    term: 'Forward checking',
    definition:
      'A search optimization that updates future options immediately after a choice is made.',
  },
  {
    term: 'Exact cover',
    definition:
      'A formulation where each constraint must be satisfied exactly once, enabling DLX-based solvers.',
  },
  {
    term: 'Generalized Sudoku',
    definition:
      'A variant that scales the same idea to n^2 x n^2 boards with matching subgrid sizes.',
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
    { id: 'bp-mental-models', label: 'Mental Models' },
    { id: 'bp-applications', label: 'Applications' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-foundation', label: 'Core Foundation' },
    { id: 'core-process', label: 'Step-by-Step Process' },
    { id: 'core-structures', label: 'Data Structures' },
    { id: 'core-correctness', label: 'Why It Works' },
    { id: 'core-complexity', label: 'Complexity' },
    { id: 'core-edge-cases', label: 'Edge Cases' },
    { id: 'core-pitfalls', label: 'Pitfalls' },
    { id: 'core-variants', label: 'Variants' },
  ],
  examples: [
    { id: 'examples-code', label: 'Code Examples' },
    { id: 'examples-notes', label: 'Example Notes' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function SudokuSolverPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Sudoku Solver',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Sudoku Solver"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Sudoku Solver</h1>
      <p>
        A Sudoku solver assigns digits to empty cells while respecting row, column, and 3x3 box
        constraints. Backtracking explores candidates, and heuristics like MRV keep the search
        efficient.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            <p>
              Sudoku is a constraint satisfaction problem. Backtracking assigns values, checks
              constraints, and backtracks when a choice leads to conflict. With good heuristics,
              most puzzles solve quickly.
            </p>
            {coreIdeas.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
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
          <hr className="bin98-divider" />
          <section id="bp-mental-models" className="bin98-section">
            <h2 className="bin98-heading">Mental Models</h2>
            {mentalModels.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-applications" className="bin98-section">
            <h2 className="bin98-heading">Applications</h2>
            {realWorldUses.map((item) => (
              <p key={item.context}>
                <strong>{item.context}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
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
          <section id="core-foundation" className="bin98-section">
            <h2 className="bin98-heading">Core Foundation</h2>
            <p>
              Every valid Sudoku solution corresponds to a consistent assignment of digits.
              Backtracking ensures all possibilities are explored without violating constraints.
            </p>
            <p>
              The difference between a toy solver and a practical solver is mostly in constraint
              handling. Fast candidate computation and heuristics like MRV shrink the search tree
              dramatically.
            </p>
          </section>
          <section id="core-process" className="bin98-section">
            <h2 className="bin98-heading">Step-by-Step Process</h2>
            <ol>
              {algorithmSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>
          <section id="core-structures" className="bin98-section">
            <h2 className="bin98-heading">Data Structures</h2>
            {dataStructures.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-correctness" className="bin98-section">
            <h2 className="bin98-heading">Why It Works</h2>
            {correctnessNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-complexity" className="bin98-section">
            <h2 className="bin98-heading">Complexity</h2>
            {complexityNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
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
        <>
          <section id="examples-code" className="bin98-section">
            <h2 className="bin98-heading">Code Examples</h2>
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
          <section id="examples-notes" className="bin98-section">
            <h2 className="bin98-heading">Example Notes</h2>
            <p>
              The example set covers the recursive solve loop, the validity predicate, and the MRV
              heuristic that selects the most constrained empty cell first.
            </p>
            <p>
              These pieces work together: constraint checks preserve correctness, while cell
              ordering reduces the number of branches that need to be explored.
            </p>
          </section>
        </>
      )}

      {activeTab === 'glossary' && (
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {glossaryTerms.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
