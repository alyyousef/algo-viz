import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

export default function LongestCommonSubsequencePage(): JSX.Element {
  return (
    <TopicLayout
      title="Longest Common Subsequence"
      subtitle="Align two sequences by maximizing the shared ordered subsequence"
      intro="Longest Common Subsequence builds a matrix that compares every prefix of both inputs so that you can measure how many elements can stay in relative order without substituting or reordering them."
    >
      <TopicSection heading="What LCS tracks">
        <p>
          Take two strings or arrays and ask: what is the longest sequence of items that appears in both while preserving their original order? The subsequence is not required to be contiguous, but it must move forward in both inputs without skipping backwards.
        </p>
        <p>
          Dynamic programming keeps track of how deep that agreement can go for every combination of prefixes, which lets you answer the question for the full inputs once the matrix is filled.
        </p>
      </TopicSection>

      <TopicSection heading="DP matrix breakdown">
        <p>
          Build a table of size (n + 1) × (m + 1) where n and m are the lengths of the two sequences. Initialize the first row and column to zero since an empty string has no subsequence with anything else.
        </p>
        <p>
          Iterate down the rows and across the columns. When characters match, you extend the previous subsequence length by one: <code>dp[i][j] = dp[i - 1][j - 1] + 1</code>. Otherwise take the best of dropping the current item from either string: <code>Math.max(dp[i - 1][j], dp[i][j - 1])</code>.
        </p>
        <p>
          Filling the grid row by row shows how a shared subsequence grows while keeping both inputs in sync, and the bottom-right cell holds the length of the LCS for the complete strings.
        </p>
      </TopicSection>

      <TopicSection heading="Tracing one longest path">
        <p>
          Recover a concrete subsequence by backtracking from the bottom-right corner. Whenever two characters match, prepend that character and move diagonally. When they disagree, step to the neighbor with the greater value (up or left), which reflects the larger subsequence found so far.
        </p>
        <p>
          Stop when you hit the top row or left column; by then you have reconstructed one valid LCS in reverse order. If you need all optimal subsequences, you can branch whenever the values tie, but even a single trace provides a useful alignment.
        </p>
      </TopicSection>

      <TopicSection heading="Complexity and when to pull it out">
        <p>
          The runtime is O(n · m) because each cell depends only on its immediate neighbors. The straightforward table requires the same space, though you can reduce it to two rows if you only care about the length.
        </p>
        <p>
          LCS powers diff tools, merge helpers, and bioinformatics sequence alignments where ordering matters but exact adjacency does not. It also surfaces similarities between student answers, version history, or time series that share common steps.
        </p>
      </TopicSection>

      <TopicSection heading="Implementation checklist">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/90">
          <li>
            Allocate an (n + 1) × (m + 1) table, zero out the top row and left column, and store the inputs in variables you can index clearly.
          </li>
          <li>
            Loop through both strings, compute matches with <code>dp[i - 1][j - 1] + 1</code>, and otherwise pick the maximum between the top or left neighbors.
          </li>
          <li>
            If you need the subsequence itself, walk from <code>dp[n][m]</code> diagonally when characters match and move toward the larger neighbor when they do not.
          </li>
          <li>
            Document what side optimizations you use: rolling arrays for length-only queries, memoized recursion to expose the overlap, or tie-breaking to recover consistent answers when multiple LCS exist.
          </li>
          <li>
            Highlight best use cases (diffing, convergence checking, sequence alignment) so future readers know when to reach for LCS instead of a simpler edit distance.
          </li>
        </ol>
      </TopicSection>
    </TopicLayout>
  )
}
