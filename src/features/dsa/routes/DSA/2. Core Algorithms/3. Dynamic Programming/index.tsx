import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { type TopicTab, useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type TabId = 'overview'

const tabs: TopicTab<TabId>[] = [{ id: 'overview', label: 'Overview' }]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  overview: [
    { id: 'what-lcs-tracks', label: 'What LCS Tracks' },
    { id: 'dp-matrix-breakdown', label: 'DP Matrix Breakdown' },
    { id: 'tracing-one-longest-path', label: 'Tracing One Longest Path' },
    { id: 'complexity-and-when-to-pull-it-out', label: 'Complexity And Use Cases' },
    { id: 'implementation-checklist', label: 'Implementation Checklist' },
  ],
}

export default function LongestCommonSubsequencePage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Longest Common Subsequence',
    defaultTab: 'overview',
  })

  return (
    <TopicPageShell
      title="Longest Common Subsequence"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Longest Common Subsequence</h1>
      <p className="bin98-doc-subtitle">
        Align two sequences by maximizing the shared ordered subsequence
      </p>
      <p>
        Longest Common Subsequence builds a matrix that compares every prefix of both inputs so that
        you can measure how many elements can stay in relative order without substituting or
        reordering them.
      </p>

      <section id="what-lcs-tracks" className="bin98-section">
        <h2 className="bin98-heading">What LCS Tracks</h2>
        <p>
          Take two strings or arrays and ask: what is the longest sequence of items that appears in
          both while preserving their original order? The subsequence is not required to be
          contiguous, but it must move forward in both inputs without skipping backwards.
        </p>
        <p>
          Dynamic programming keeps track of how deep that agreement can go for every combination of
          prefixes, which lets you answer the question for the full inputs once the matrix is
          filled.
        </p>
      </section>

      <hr className="bin98-divider" />

      <section id="dp-matrix-breakdown" className="bin98-section">
        <h2 className="bin98-heading">DP Matrix Breakdown</h2>
        <p>
          Build a table of size (n + 1) x (m + 1) where n and m are the lengths of the two
          sequences. Initialize the first row and column to zero since an empty string has no
          subsequence with anything else.
        </p>
        <p>
          Iterate down the rows and across the columns. When characters match, you extend the
          previous subsequence length by one: <code>dp[i][j] = dp[i - 1][j - 1] + 1</code>.
          Otherwise take the best of dropping the current item from either string:{' '}
          <code>Math.max(dp[i - 1][j], dp[i][j - 1])</code>.
        </p>
        <p>
          Filling the grid row by row shows how a shared subsequence grows while keeping both inputs
          in sync, and the bottom-right cell holds the length of the LCS for the complete strings.
        </p>
      </section>

      <hr className="bin98-divider" />

      <section id="tracing-one-longest-path" className="bin98-section">
        <h2 className="bin98-heading">Tracing One Longest Path</h2>
        <p>
          Recover a concrete subsequence by backtracking from the bottom-right corner. Whenever two
          characters match, prepend that character and move diagonally. When they disagree, step to
          the neighbor with the greater value (up or left), which reflects the larger subsequence
          found so far.
        </p>
        <p>
          Stop when you hit the top row or left column; by then you have reconstructed one valid LCS
          in reverse order. If you need all optimal subsequences, you can branch whenever the values
          tie, but even a single trace provides a useful alignment.
        </p>
      </section>

      <hr className="bin98-divider" />

      <section id="complexity-and-when-to-pull-it-out" className="bin98-section">
        <h2 className="bin98-heading">Complexity And When To Pull It Out</h2>
        <p>
          The runtime is O(n * m) because each cell depends only on its immediate neighbors. The
          straightforward table requires the same space, though you can reduce it to two rows if you
          only care about the length.
        </p>
        <p>
          LCS powers diff tools, merge helpers, and bioinformatics sequence alignments where
          ordering matters but exact adjacency does not. It also surfaces similarities between
          student answers, version history, or time series that share common steps.
        </p>
      </section>

      <hr className="bin98-divider" />

      <section id="implementation-checklist" className="bin98-section">
        <h2 className="bin98-heading">Implementation Checklist</h2>
        <ol>
          <li>
            Allocate an (n + 1) x (m + 1) table, zero out the top row and left column, and store the
            inputs in variables you can index clearly.
          </li>
          <li>
            Loop through both strings, compute matches with <code>dp[i - 1][j - 1] + 1</code>, and
            otherwise pick the maximum between the top or left neighbors.
          </li>
          <li>
            If you need the subsequence itself, walk from <code>dp[n][m]</code> diagonally when
            characters match and move toward the larger neighbor when they do not.
          </li>
          <li>
            Document what side optimizations you use: rolling arrays for length-only queries,
            memoized recursion to expose the overlap, or tie-breaking to recover consistent answers
            when multiple LCS exist.
          </li>
          <li>
            Highlight best use cases (diffing, convergence checking, sequence alignment) so future
            readers know when to reach for LCS instead of a simpler edit distance.
          </li>
        </ol>
      </section>
    </TopicPageShell>
  )
}
