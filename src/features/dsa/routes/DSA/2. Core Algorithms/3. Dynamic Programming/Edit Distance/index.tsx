import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: '1960s: Levenshtein distance formalized',
    detail:
      'Vladimir Levenshtein defined the edit distance metric for string transformations using insert, delete, and substitute.',
  },
  {
    title: '1970s: Dynamic programming mainstreamed',
    detail:
      'Edit distance became a canonical DP example, illustrating grid-based recurrence and optimal substructure.',
  },
  {
    title: '1990s: Fuzzy matching and spell correction',
    detail:
      'Search engines and word processors adopted edit distance for autocorrect and approximate matching.',
  },
  {
    title: '2010s: DNA and NLP alignment',
    detail:
      'Edit distance variants power sequence alignment in bioinformatics and similarity scoring in NLP pipelines.',
  },
]

const mentalModels = [
  {
    title: 'Grid alignment',
    detail:
      'Place string A on one axis and string B on the other. Moving right, down, or diagonal corresponds to insert, delete, or substitute.',
  },
  {
    title: 'Minimal edits as shortest path',
    detail:
      'Each move in the grid costs 1 (or a weighted cost). The edit distance is the cheapest path from top-left to bottom-right.',
  },
  {
    title: 'Prefix to prefix',
    detail:
      'dp[i][j] represents the minimal edits to transform the first i chars of A into the first j chars of B.',
  },
  {
    title: 'Match is free',
    detail:
      'If characters are equal, the diagonal move costs 0. Otherwise, the diagonal is a substitution with cost 1.',
  },
]

const problemVariants = [
  {
    heading: 'Levenshtein distance',
    bullets: [
      'Operations: insert, delete, substitute (all cost 1).',
      'Most common in interviews and basic fuzzy matching.',
      'DP grid size (m + 1) by (n + 1).',
    ],
  },
  {
    heading: 'Weighted edit distance',
    bullets: [
      'Different costs for insert/delete/substitute.',
      'Useful for keyboard proximity or domain errors.',
      'Same DP recurrence with custom costs.',
    ],
  },
  {
    heading: 'Damerau-Levenshtein',
    bullets: [
      'Adds transposition of adjacent characters.',
      'Captures common typos like “teh” -> “the”.',
      'Requires extra checks in DP.',
    ],
  },
  {
    heading: 'Edit script reconstruction',
    bullets: [
      'Find the sequence of edits, not just the distance.',
      'Store parent pointers or backtrack from dp[m][n].',
      'Useful for diffs and human-readable changes.',
    ],
  },
  {
    heading: 'Longest common subsequence (LCS)',
    bullets: [
      'Related measure using only insert/delete.',
      'Distance can be derived via LCS length.',
      'Different recurrence but similar grid DP.',
    ],
  },
]

const algorithmSteps = [
  {
    title: 'Set up the DP table',
    detail:
      'Create dp with (m + 1) x (n + 1). dp[0][j] = j and dp[i][0] = i to model insertions/deletions.',
  },
  {
    title: 'Fill row by row',
    detail:
      'For each i, j compute the minimum of delete, insert, or substitute (or match) costs.',
  },
  {
    title: 'Apply the recurrence',
    detail:
      'If a[i-1] == b[j-1], use dp[i-1][j-1]. Else 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]).',
  },
  {
    title: 'Read the answer',
    detail:
      'The value at dp[m][n] is the minimum edit distance between the full strings.',
  },
]

const implementationNotes = [
  {
    title: 'Space optimization',
    detail:
      'You only need the previous row to compute the current row. This reduces memory to O(n).',
  },
  {
    title: 'Indexing clarity',
    detail:
      'Use dp indices for prefix lengths, not character indexes. This avoids off-by-one errors.',
  },
  {
    title: 'Unicode and case',
    detail:
      'If using Unicode or case-insensitive matching, normalize strings before DP.',
  },
  {
    title: 'Edit script',
    detail:
      'If you need the actual edits, store parent directions or backtrack with a second pass.',
  },
]

const complexityNotes = [
  {
    title: 'Time cost',
    detail:
      'Standard DP runs in O(m * n), where m and n are string lengths.',
  },
  {
    title: 'Space cost',
    detail:
      'Full table uses O(m * n). Optimized row DP uses O(n).',
  },
  {
    title: 'Scaling limits',
    detail:
      'For very large strings, O(m * n) can be too slow; consider banded or heuristic methods.',
  },
  {
    title: 'Heuristic alternatives',
    detail:
      'Ukkonen banding limits computation to a diagonal band when the expected distance is small.',
  },
]

const realWorldUses = [
  {
    context: 'Spell checking and autocorrect',
    detail:
      'Find the nearest dictionary word by edit distance to correct typos.',
  },
  {
    context: 'DNA/RNA alignment',
    detail:
      'Measure similarity between sequences with insertions and deletions.',
  },
  {
    context: 'Search and fuzzy matching',
    detail:
      'Allow approximate matches in search interfaces and record linkage.',
  },
  {
    context: 'Diff tools',
    detail:
      'Derive the minimal edits to transform one string into another for code review tools.',
  },
]

const examples = [
  {
    title: 'Classic edit distance (bottom-up)',
    code: `function editDistance(a, b):
    m = len(a)
    n = len(b)
    dp = array(m + 1, n + 1, 0)

    for i in 0..m:
        dp[i][0] = i
    for j in 0..n:
        dp[0][j] = j

    for i in 1..m:
        for j in 1..n:
            if a[i-1] == b[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(
                    dp[i-1][j],    // delete
                    dp[i][j-1],    // insert
                    dp[i-1][j-1]   // substitute
                )
    return dp[m][n]`,
    explanation:
      'The table expands from empty prefixes. Each cell chooses the cheapest edit to align prefixes.',
  },
  {
    title: 'Space-optimized variant',
    code: `function editDistanceFast(a, b):
    if len(a) < len(b):
        swap(a, b) // make b the shorter
    prev = array(len(b) + 1, 0)
    curr = array(len(b) + 1, 0)

    for j in 0..len(b):
        prev[j] = j

    for i in 1..len(a):
        curr[0] = i
        for j in 1..len(b):
            if a[i-1] == b[j-1]:
                curr[j] = prev[j-1]
            else:
                curr[j] = 1 + min(prev[j], curr[j-1], prev[j-1])
        swap(prev, curr)
    return prev[len(b)]`,
    explanation:
      'Only the previous row is required. This reduces memory from O(mn) to O(n).',
  },
  {
    title: 'Edit script hint',
    code: `// Keep a parent pointer grid:
// 'D' delete, 'I' insert, 'S' substitute, 'M' match
// Backtrack from dp[m][n] to dp[0][0] to recover steps.`,
    explanation:
      'Storing parent directions lets you reconstruct the specific edit sequence, useful for diffs.',
  },
]

const pitfalls = [
  'Mixing up insert vs delete when interpreting the recurrence.',
  'Forgetting the base cases dp[i][0] and dp[0][j].',
  'Assuming edit distance is symmetric when custom costs are asymmetric.',
  'Using O(mn) memory on very long strings without optimization.',
  'Ignoring Unicode normalization when comparing user-facing text.',
]

const decisionGuidance = [
  'Use Levenshtein distance for basic typo tolerance and similarity scoring.',
  'If transpositions matter, use Damerau-Levenshtein instead.',
  'If you only care about small distances, use banded DP for speed.',
  'Use space-optimized DP when strings are large and memory is tight.',
  'If you need the edit script, store parent pointers.',
]

const advancedInsights = [
  {
    title: 'Banded DP (Ukkonen)',
    detail:
      'Limit computation to a diagonal band of width k when you only need distances <= k, reducing time to O(k * min(m, n)).',
  },
  {
    title: 'Edit distance and LCS',
    detail:
      'If substitutions are disallowed, edit distance relates to LCS: dist = (m - LCS) + (n - LCS).',
  },
  {
    title: 'Weighted keyboard models',
    detail:
      'Use lower costs for adjacent keyboard substitutions to build better autocorrect systems.',
  },
  {
    title: 'Normalized distance',
    detail:
      'Normalize by max(m, n) to compare distances across strings of different lengths.',
  },
]

const takeaways = [
  'Edit distance measures how many edits transform one string into another.',
  'DP on prefixes yields a simple and robust solution.',
  'Loop order and base cases are critical for correctness.',
  'Space can be optimized to O(n) for large strings.',
  'Variants handle transpositions, weights, or edit script reconstruction.',
]

export default function EditDistancePage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Edit Distance</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Measure how different two strings are with minimal edits</div>
              <p className="win95-text">
                Edit distance quantifies how many insertions, deletions, and substitutions transform one string into another.
                It is foundational for fuzzy matching, spell checking, and sequence alignment. This page lays out the DP grid,
                explains key variants, and shows how to optimize space when strings grow large.
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
                Edit distance turns string comparison into a shortest-path problem over a grid of prefixes. Each move edits one
                character, and the minimum cost path gives the distance. The DP table makes this optimal substructure explicit.
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
            <legend>How it works: problem variants</legend>
            <div className="win95-grid win95-grid-3">
              {problemVariants.map((block) => (
                <div key={block.heading} className="win95-panel">
                  <div className="win95-heading">{block.heading}</div>
                  <ul className="win95-list">
                    {block.bullets.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works: DP workflow</legend>
            <div className="win95-grid win95-grid-2">
              {algorithmSteps.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                Correctness idea: any optimal edit sequence ends with exactly one of three operations (insert, delete, substitute).
                The DP recurrence considers those cases, so the minimum at each prefix pair is optimal.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Implementation notes</legend>
            <div className="win95-grid win95-grid-2">
              {implementationNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity analysis and tradeoffs</legend>
            <div className="win95-grid win95-grid-2">
              {complexityNotes.map((note) => (
                <div key={note.title} className="win95-panel">
                  <div className="win95-heading">{note.title}</div>
                  <p className="win95-text">{note.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                When you only care about small edit distances, banded DP can be dramatically faster. Otherwise, the classic DP
                remains the simplest and most reliable approach.
              </p>
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
            <legend>When to use it</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                {decisionGuidance.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Advanced insights</legend>
            <div className="win95-grid win95-grid-2">
              {advancedInsights.map((item) => (
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

