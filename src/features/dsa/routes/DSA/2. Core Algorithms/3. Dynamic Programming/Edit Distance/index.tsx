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
      'Place string A on one axis and string B on the other. Each cell aligns prefixes. Moving right means insert into A, moving down means delete from A, diagonal means match or substitute.',
  },
  {
    title: 'Minimal edits as shortest path',
    detail:
      'Each move has a cost. The edit distance is the minimum-cost path from the empty-prefix cell to the full-prefix cell.',
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
  {
    title: 'Edits are local',
    detail:
      'An optimal global edit script always ends with one local operation. That local choice is exactly what the recurrence enumerates.',
  },
]

const formalDefinition = [
  {
    title: 'Operations',
    detail:
      'Levenshtein distance allows insertion, deletion, and substitution. Each operation edits one character.',
  },
  {
    title: 'Cost model',
    detail:
      'In the classic form, each operation costs 1. Weighted variants assign different costs per operation or per character pair.',
  },
  {
    title: 'Objective',
    detail:
      'Find the minimum total cost to transform string A into string B using the allowed operations.',
  },
  {
    title: 'Metric properties',
    detail:
      'With equal costs it is a metric: non-negative, symmetric, zero only for identical strings, and it satisfies triangle inequality.',
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
      'Captures common typos like "teh" -> "the".',
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
      'For each i, j compute the minimum of delete, insert, or substitute (or match) costs using already computed prefixes.',
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

const recurrenceBreakdown = [
  {
    title: 'Delete',
    detail:
      'dp[i-1][j] + 1 removes a[i-1]. You shrink A and pay one delete.',
  },
  {
    title: 'Insert',
    detail:
      'dp[i][j-1] + 1 inserts b[j-1] into A. You grow A to match B.',
  },
  {
    title: 'Substitute / Match',
    detail:
      'dp[i-1][j-1] + cost compares a[i-1] and b[j-1]. The cost is 0 if equal, 1 if different.',
  },
]

const workedExample = [
  {
    title: 'Strings',
    detail: 'A = "kitten", B = "sitting". m = 6, n = 7.',
  },
  {
    title: 'Initialize borders',
    detail:
      'First row: 0..7, first column: 0..6. This is the cost to build or erase prefixes.',
  },
  {
    title: 'Fill table',
    detail:
      'Compare each pair of characters. The diagonal handles match/substitute. The minimum path accumulates edits.',
  },
  {
    title: 'Result',
    detail:
      'dp[6][7] = 3. One optimal script: kitten -> sitten (sub k->s), sitten -> sittin (sub e->i), sittin -> sitting (insert g).',
  },
]

const backtrackingSteps = [
  {
    title: 'Start at dp[m][n]',
    detail:
      'Choose the predecessor that achieved the current value. That choice is the final edit.',
  },
  {
    title: 'Walk to dp[0][0]',
    detail:
      'Move left (insert), up (delete), or diagonal (match/substitute) until you reach the origin.',
  },
  {
    title: 'Reverse the path',
    detail:
      'The backtracked edits are in reverse order. Reverse to get the edit script from A to B.',
  },
]

const variantComparison = [
  {
    heading: 'Levenshtein vs Damerau',
    bullets: [
      'Levenshtein ignores transpositions; Damerau treats adjacent swaps as one edit.',
      'Damerau is more realistic for human typos but slightly more complex.',
    ],
  },
  {
    heading: 'Weighted vs unweighted',
    bullets: [
      'Weighted costs encode domain knowledge (keyboard distance, OCR errors).',
      'Unweighted is simpler and symmetric, good for general similarity.',
    ],
  },
  {
    heading: 'Edit distance vs LCS',
    bullets: [
      'LCS uses insert/delete only; substitutions count as two edits.',
      'LCS is useful when you only allow deletions/insertions.',
    ],
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
  {
    title: 'Ordering matters',
    detail:
      'Row-major filling ensures dependencies (top, left, diagonal) are already computed.',
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

const optimizationPlaybook = [
  {
    title: 'Banded DP',
    detail:
      'When you only care about distances <= k, compute a diagonal band of width 2k + 1 to reduce time and memory.',
  },
  {
    title: 'Early stopping',
    detail:
      'If the smallest value in the current row already exceeds a threshold, you can stop for bounded searches.',
  },
  {
    title: 'Pre-check length gap',
    detail:
      'If |m - n| already exceeds your threshold k, the distance must be > k.',
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

const miniFaq = [
  {
    question: 'Is edit distance the same as Hamming distance?',
    answer:
      'No. Hamming distance only counts substitutions and requires equal-length strings. Edit distance allows insertions and deletions.',
  },
  {
    question: 'Why is dp sized (m + 1) x (n + 1)?',
    answer:
      'The extra row/column represent the empty prefix, which anchors the base cases for inserts/deletes.',
  },
  {
    question: 'Can edit distance be normalized?',
    answer:
      'Yes. Divide by max(m, n) to get a similarity score between 0 and 1.',
  },
  {
    question: 'Why is substitution cost sometimes 2?',
    answer:
      'If your model only allows insert/delete, a substitution becomes delete+insert, which is cost 2.',
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
    title: 'Edit distance and similarity',
    detail:
      'Similarity = 1 - dist / max(m, n) gives a normalized score that compares strings of different lengths.',
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
  'Backtracking turns the table into a concrete edit script.',
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
                It is foundational for fuzzy matching, spell checking, and sequence alignment. This page dives deep into the
                formal definition, the DP grid, recurrence details, worked examples, and how to reconstruct the actual edit script.
                You will also see variants, optimization strategies, and real-world tradeoffs.
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
                Think of it as aligning two strings character by character while paying for mismatches and gaps.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Formal definition</legend>
            <div className="win95-grid win95-grid-2">
              {formalDefinition.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
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
            <legend>Recurrence: why each move matters</legend>
            <div className="win95-grid win95-grid-3">
              {recurrenceBreakdown.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                Every optimal edit sequence ends in exactly one of these three moves, so the minimum over these cases is correct.
                This is the core optimal-substructure argument.
              </p>
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
            <legend>Worked example (kitten to sitting)</legend>
            <div className="win95-grid win95-grid-2">
              {workedExample.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Reconstructing the edit script</legend>
            <div className="win95-grid win95-grid-3">
              {backtrackingSteps.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel">
              <p className="win95-text">
                For diffs, store a parent pointer for each cell. Each pointer indicates whether you came from left (insert),
                up (delete), or diagonal (match/substitute). Backtracking yields the exact edits.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Variant comparison</legend>
            <div className="win95-grid win95-grid-3">
              {variantComparison.map((block) => (
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
            <legend>Optimization playbook</legend>
            <div className="win95-grid win95-grid-3">
              {optimizationPlaybook.map((item) => (
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
            <legend>Quick FAQ</legend>
            <div className="win95-stack">
              {miniFaq.map((item) => (
                <div key={item.question} className="win95-panel">
                  <div className="win95-heading">{item.question}</div>
                  <p className="win95-text">{item.answer}</p>
                </div>
              ))}
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
