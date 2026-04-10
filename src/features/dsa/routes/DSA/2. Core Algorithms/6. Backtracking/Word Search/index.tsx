import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

const historicalMilestones = [
  {
    title: 'Puzzle books popularize grid word hunts (1960s-1970s)',
    detail:
      'Printed word-search puzzles trained people to scan grids for paths, formalizing the idea of contiguous letter sequences in 2D.',
  },
  {
    title: 'Recursive depth-first search becomes mainstream (1980s)',
    detail:
      'As recursion entered mainstream languages, DFS over grids became a staple teaching example for backtracking and state restoration.',
  },
  {
    title: 'Programming contests standardize the pattern (1990s-2000s)',
    detail:
      'Online judges adopted word search as a canonical backtracking task: explore neighbors, mark visited, and prune quickly.',
  },
  {
    title: 'Modern variants add constraints (2010s+)',
    detail:
      'Boards with wildcards, diagonals, and multiple words extend the base problem into a broader search and pruning playground.',
  },
]

const mentalModels = [
  {
    title: 'Maze with sticky footprints',
    detail:
      'You walk the grid like a maze, but each step leaves a temporary footprint so you do not reuse the same tile in a single path.',
  },
  {
    title: 'Prefix filter',
    detail:
      'Every partial path must match the prefix of the target word. The moment a letter mismatches, you can abandon the branch.',
  },
  {
    title: 'State as (position, index)',
    detail:
      'Your search state is the cell coordinates plus the index of the next letter to match. Everything else is bookkeeping.',
  },
]

const coreRules = [
  {
    heading: 'Input',
    bullets: [
      'A 2D grid of characters, typically m x n.',
      'A target word to find as a path of adjacent letters.',
      'Adjacency is usually 4-directional (up, down, left, right).',
    ],
  },
  {
    heading: 'Path constraints',
    bullets: [
      'You may start from any cell that matches the first letter.',
      'Each cell can be used at most once per path.',
      'The path must match the word exactly in order.',
    ],
  },
  {
    heading: 'Output',
    bullets: [
      'Return true if any valid path exists; otherwise false.',
      'Optional variants return the actual path or all matches.',
    ],
  },
]

const backtrackingFlow = [
  {
    title: 'Seed the search',
    detail: 'Scan the grid for cells equal to word[0]. Each is a potential start state for DFS.',
  },
  {
    title: 'Advance and mark',
    detail:
      'From a cell, check its four neighbors. When a neighbor matches the next letter, mark the current cell as visited and recurse.',
  },
  {
    title: 'Backtrack',
    detail:
      'After returning, restore the cell to its original value (or clear the visited mark). This keeps other branches correct.',
  },
  {
    title: 'Terminate early',
    detail:
      'If you match the last character, return true immediately and unwind the recursion stack.',
  },
]

const pruningIdeas = [
  {
    title: 'First letter filter',
    detail:
      'Only start DFS at cells matching the first character. This cuts the initial branching factor sharply.',
  },
  {
    title: 'Frequency precheck',
    detail:
      'If the board does not contain enough of any character required by the word, return false before DFS.',
  },
  {
    title: 'Reverse the word',
    detail:
      'Start from the rarer end of the word. Searching for a rare starting letter can reduce wasted exploration.',
  },
  {
    title: 'Prefix failure stop',
    detail:
      'As soon as a neighbor does not match word[k], do not explore deeper from that neighbor.',
  },
]

const complexityNotes = [
  {
    title: 'Time complexity',
    detail:
      'Worst case is O(m * n * 4^L), where L is the word length. Each step branches up to four directions.',
  },
  {
    title: 'Space complexity',
    detail:
      'O(L) for recursion depth plus O(1) extra if you mark in place. A separate visited matrix costs O(m * n).',
  },
  {
    title: 'Pruning impact',
    detail:
      'Real performance is usually far better than the worst case, especially with character frequency checks and early exits.',
  },
  {
    title: 'Recursion limits',
    detail:
      'Deep recursion may hit stack limits in some languages. Iterative stacks or tail recursion can help in constrained runtimes.',
  },
]

const examples = [
  {
    title: 'Baseline DFS with in-place marking',
    code: `function exist(board, word):
    rows = board.length
    cols = board[0].length

    function dfs(r, c, i):
        if i == word.length: return true
        if r < 0 or c < 0 or r >= rows or c >= cols: return false
        if board[r][c] != word[i]: return false

        temp = board[r][c]
        board[r][c] = '#'

        found = dfs(r + 1, c, i + 1)
             or dfs(r - 1, c, i + 1)
             or dfs(r, c + 1, i + 1)
             or dfs(r, c - 1, i + 1)

        board[r][c] = temp
        return found

    for r in 0..rows-1:
        for c in 0..cols-1:
            if dfs(r, c, 0): return true
    return false`,
    explanation:
      'Marking the cell with a sentinel avoids a separate visited matrix. The key is restoring the letter after exploring all branches.',
  },
  {
    title: 'Frequency precheck',
    code: `function canForm(board, word):
    counts = map<char, int>()
    for cell in board: counts[cell] += 1
    for ch in word:
        counts[ch] -= 1
        if counts[ch] < 0: return false
    return true`,
    explanation:
      'If the board lacks enough of any letter, the search cannot succeed. This inexpensive check saves a lot of DFS work.',
  },
  {
    title: 'Directional path example',
    code: `Board:
  A B C E
  S F C S
  A D E E

Word: "ABCCED"
Path:
  (0,0) A -> (0,1) B -> (0,2) C
  -> (1,2) C -> (2,2) E -> (2,1) D`,
    explanation:
      'Paths can turn and move vertically or horizontally, but each cell is used only once in a single search branch.',
  },
]

const pitfalls = [
  'Forgetting to unmark visited cells causes valid paths to be skipped in later branches.',
  'Comparing the wrong index (off-by-one) makes last-letter matches fail.',
  'Allocating a fresh visited matrix per start cell can balloon overhead; reuse or mark in place instead.',
  'Ignoring board bounds in the neighbor loop leads to runtime errors.',
  'Recursion without early exit keeps exploring even after a match is found.',
]

const decisionGuidance = [
  'Use Word Search when you need to find a single word path in a grid with adjacency rules.',
  'Prefer a trie-based multi-word search when you need to find many words at once (Word Search II).',
  'Use DFS with pruning for short to medium words; consider iterative stacks if recursion depth is risky.',
  'Avoid heavy memoization unless there are special constraints; visited-state makes caching tricky.',
  'Add frequency checks or reverse-word heuristics if the input size is large.',
]

const variants = [
  {
    title: 'Diagonal movement',
    detail:
      'Allowing 8-direction adjacency raises the branching factor and the worst-case time, but the DFS structure remains identical.',
  },
  {
    title: 'Multiple words',
    detail:
      'Use a trie to share prefixes across words and prune early. Each DFS step advances in the trie instead of a single word index.',
  },
  {
    title: 'Wildcard tiles',
    detail:
      'Cells that match any character remove the letter check at that step, expanding the search tree and making pruning more important.',
  },
  {
    title: 'Reuse allowed',
    detail:
      'If you can revisit cells, the visited constraint disappears, but you must prevent infinite loops with depth limits.',
  },
]

const advancedInsights = [
  {
    title: 'Ordering neighbors',
    detail:
      'Explore neighbors that match rarer letters first. This increases early exits in negative cases.',
  },
  {
    title: 'In-place marking safety',
    detail:
      'Choose a sentinel value that cannot appear in the board (like "#") to avoid accidental matches.',
  },
  {
    title: 'Iterative DFS stack',
    detail:
      'An explicit stack can simulate recursion, storing (r, c, index, action) frames for enter/exit to manage marking.',
  },
  {
    title: 'Bitset visited',
    detail:
      'On small boards, a bitset for visited cells can be faster than a boolean grid and can make state passing cheaper.',
  },
]

const takeaways = [
  'Word Search is a classic backtracking problem: explore neighbors, mark, recurse, and restore.',
  'Pruning is everything. A few cheap checks often cut the search tree dramatically.',
  'In-place marking is the simplest way to track visited cells without extra memory.',
  'The same backbone powers many grid path problems and scales to multi-word searches with a trie.',
]

const glossaryTerms = [
  {
    term: 'Backtracking',
    definition:
      'A search strategy that tries a path, recurses, and restores state when that path fails.',
  },
  {
    term: 'DFS',
    definition:
      'Depth-first search, the traversal pattern used to follow one candidate path as far as possible before backtracking.',
  },
  {
    term: 'Prefix pruning',
    definition:
      'Abandoning a branch as soon as the partial path no longer matches the needed prefix of the target word.',
  },
  {
    term: 'Visited marking',
    definition:
      'Temporary state used to prevent reusing the same board cell within one search path.',
  },
  {
    term: 'Adjacency',
    definition:
      'The movement rule that determines which neighboring cells may be used next, usually up, down, left, and right.',
  },
  {
    term: 'Frequency precheck',
    definition:
      'A fast count-based test that rejects impossible searches before DFS begins if the board lacks enough required letters.',
  },
  {
    term: 'Sentinel value',
    definition:
      'A placeholder such as "#" used to mark a cell temporarily during in-place backtracking.',
  },
  {
    term: 'Trie',
    definition:
      'A prefix tree used in multi-word variants to share prefixes and prune many searches at once.',
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
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-structure', label: 'Problem Structure' },
    { id: 'core-flow', label: 'Backtracking Flow' },
    { id: 'core-pruning', label: 'Pruning Strategies' },
    { id: 'core-complexity', label: 'Complexity' },
    { id: 'core-guidance', label: 'When To Use It' },
    { id: 'core-pitfalls', label: 'Pitfalls' },
    { id: 'core-variants', label: 'Variants' },
    { id: 'core-advanced', label: 'Advanced Insights' },
  ],
  examples: [
    { id: 'examples-code', label: 'Code Examples' },
    { id: 'examples-notes', label: 'Example Notes' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function WordSearchPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Word Search',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Word Search"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Word Search</h1>
      <p>
        Word Search asks if a sequence of letters can be traced through a 2D board by moving up,
        down, left, or right without reusing a cell. It is the canonical backtracking problem: try a
        step, mark it, recurse, and undo the step if it fails. The simplicity of the rules makes it
        perfect for learning recursion, pruning, and grid traversal patterns.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            <p>
              Word Search is a depth-first exploration of a grid. Each step advances one letter into
              the word. If a step violates the rules, that path stops immediately. If a step reaches
              the final letter, the search ends successfully. The algorithm is straightforward, but
              the key is how quickly you can prune dead ends.
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
          <section id="core-structure" className="bin98-section">
            <h2 className="bin98-heading">Problem Structure</h2>
            {coreRules.map((block) => (
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
          <section id="core-flow" className="bin98-section">
            <h2 className="bin98-heading">Backtracking Flow</h2>
            {backtrackingFlow.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
            <p>
              The correctness hinges on restoring state after exploring. Mark, recurse, unmark. This
              keeps each search branch independent and prevents accidental reuse of cells.
            </p>
          </section>
          <section id="core-pruning" className="bin98-section">
            <h2 className="bin98-heading">Pruning Strategies</h2>
            {pruningIdeas.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-complexity" className="bin98-section">
            <h2 className="bin98-heading">Complexity Analysis and Tradeoffs</h2>
            {complexityNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-guidance" className="bin98-section">
            <h2 className="bin98-heading">When To Use It</h2>
            <ol>
              {decisionGuidance.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
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
          <section id="core-advanced" className="bin98-section">
            <h2 className="bin98-heading">Advanced Insights</h2>
            {advancedInsights.map((item) => (
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
              The examples cover the core DFS, a cheap letter-frequency rejection pass, and a
              concrete path through a board. Together they show the full shape of the algorithm:
              validate, branch, and restore.
            </p>
            <p>
              The implementation details matter. In-place marking avoids extra memory, while the
              precheck can eliminate entire searches before recursion starts.
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
