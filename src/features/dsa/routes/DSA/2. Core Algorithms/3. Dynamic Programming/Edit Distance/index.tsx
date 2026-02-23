import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

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


const glossaryTerms = [
  { term: 'Edit Distance', definition: 'Minimum number or cost of edits to transform one string into another.' },
  { term: 'Levenshtein', definition: 'Insert, delete, substitute with unit costs.' },
  { term: 'Damerau-Levenshtein', definition: 'Levenshtein plus adjacent transposition.' },
  { term: 'DP State', definition: 'A cell like dp[i][j] that stores an optimal prefix result.' },
  { term: 'Edit Script', definition: 'The concrete sequence of edit operations.' },
  { term: 'Banded DP', definition: 'Diagonal-window optimization for bounded distance k.' },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const win98HelpStyles = `
.edit98-help-page{min-height:100dvh;background:#c0c0c0;padding:0;color:#000;font-family:"MS Sans Serif",Tahoma,"Segoe UI",sans-serif}
.edit98-window{border-top:2px solid #fff;border-left:2px solid #fff;border-right:2px solid #404040;border-bottom:2px solid #404040;background:#c0c0c0;width:100%;min-height:100dvh;display:flex;flex-direction:column;box-sizing:border-box}
.edit98-titlebar{position:relative;display:flex;align-items:center;padding:2px 4px;background:linear-gradient(90deg,#000080 0%,#1084d0 100%);color:#fff;font-size:13px;font-weight:700}
.edit98-title-text{position:absolute;left:50%;transform:translateX(-50%);font-size:16px}
.edit98-title-controls{display:flex;gap:2px;margin-left:auto}
.edit98-control{width:18px;height:16px;border-top:1px solid #fff;border-left:1px solid #fff;border-right:1px solid #404040;border-bottom:1px solid #404040;background:#c0c0c0;color:#000;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;font-size:11px;line-height:1}
.edit98-tabs{display:flex;gap:1px;padding:6px 8px 0}
.edit98-tab{border-top:1px solid #fff;border-left:1px solid #fff;border-right:1px solid #404040;border-bottom:none;background:#b6b6b6;padding:5px 10px 4px;font-size:12px;cursor:pointer}
.edit98-tab.active{background:#fff;position:relative;top:1px}
.edit98-main{border-top:1px solid #404040;background:#fff;flex:1;min-height:0;display:grid;grid-template-columns:240px 1fr}
.edit98-toc{border-right:1px solid #808080;background:#f2f2f2;padding:12px;overflow:auto}
.edit98-toc-title{font-size:12px;font-weight:700;margin:0 0 10px}
.edit98-toc-list{list-style:none;margin:0;padding:0}
.edit98-toc-list li{margin:0 0 8px}
.edit98-toc-list a{color:#000;text-decoration:none;font-size:12px}
.edit98-content{padding:14px 20px 20px;overflow:auto}
.edit98-doc-title{font-size:20px;font-weight:700;margin:0 0 12px}
.edit98-section{margin:0 0 20px}
.edit98-heading{font-size:16px;font-weight:700;margin:0 0 8px}
.edit98-subheading{font-size:13px;font-weight:700;margin:0 0 6px}
.edit98-content p,.edit98-content li{font-size:12px;line-height:1.5}
.edit98-content p{margin:0 0 10px}
.edit98-content ul,.edit98-content ol{margin:0 0 10px 20px;padding:0}
.edit98-divider{border:0;border-top:1px solid #d0d0d0;margin:14px 0}
.edit98-codebox{background:#f4f4f4;border-top:2px solid #808080;border-left:2px solid #808080;border-right:2px solid #fff;border-bottom:2px solid #fff;padding:8px;margin:6px 0 10px}
.edit98-codebox code{font-family:"Courier New",Courier,monospace;font-size:12px;white-space:pre;display:block}
@media (max-width:900px){.edit98-main{grid-template-columns:1fr}.edit98-toc{border-right:none;border-bottom:1px solid #808080}}
`

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-formal', label: 'Formal Definition' },
    { id: 'bp-history', label: 'Historical Context' },
    { id: 'bp-applications', label: 'Real-World Applications' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-mental-models', label: 'Mental Models' },
    { id: 'core-variants', label: 'Problem Variants' },
    { id: 'core-recurrence', label: 'Recurrence' },
    { id: 'core-workflow', label: 'DP Workflow' },
    { id: 'core-worked', label: 'Worked Example' },
    { id: 'core-backtracking', label: 'Backtracking' },
    { id: 'core-compare', label: 'Variant Comparison' },
    { id: 'core-implementation', label: 'Implementation Notes' },
    { id: 'core-complexity', label: 'Complexity and Tradeoffs' },
    { id: 'core-optimization', label: 'Optimization Playbook' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-usage', label: 'When to Use It' },
    { id: 'core-advanced', label: 'Advanced Insights' },
  ],
  examples: [{ id: 'ex-practical', label: 'Practical Examples' }],
  glossary: [
    { id: 'glossary-terms', label: 'Terms' },
    { id: 'glossary-faq', label: 'Quick FAQ' },
  ],
}

export default function EditDistancePage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    const tab = searchParams.get('tab')
    return isTabId(tab) ? tab : 'big-picture'
  })
  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Edit Distance (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Edit Distance',
      url: `${location.pathname}${location.search}${location.hash}`,
      kind: 'help',
    }
    const rawTasks = window.localStorage.getItem(MINIMIZED_HELP_TASKS_KEY)
    const parsedTasks = rawTasks ? (JSON.parse(rawTasks) as Array<{ id: string }>) : []
    const nextTasks = [...parsedTasks.filter((task) => task.id !== minimizedTask.id), minimizedTask]
    window.localStorage.setItem(MINIMIZED_HELP_TASKS_KEY, JSON.stringify(nextTasks))

    const historyState = window.history.state as { idx?: number } | null
    if (historyState?.idx && historyState.idx > 0) {
      void navigate(-1)
      return
    }
    void navigate('/algoViz')
  }

  return (
    <div className="edit98-help-page">
      <style>{win98HelpStyles}</style>
      <div className="edit98-window" role="presentation">
        <header className="edit98-titlebar">
          <span className="edit98-title-text">Edit Distance</span>
          <div className="edit98-title-controls">
            <button className="edit98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="edit98-control" aria-label="Close">X</Link>
          </div>
        </header>
        <div className="edit98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`edit98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="edit98-main">
          <aside className="edit98-toc" aria-label="Table of contents">
            <h2 className="edit98-toc-title">Contents</h2>
            <ul className="edit98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="edit98-content">
            <h1 className="edit98-doc-title">Edit Distance</h1>
            <p>
              Edit distance quantifies how many insertions, deletions, and substitutions transform one string into another. It is
              foundational for fuzzy matching, spell checking, and sequence alignment. This page covers the formal definition, the
              DP grid, recurrence details, worked examples, and edit script reconstruction.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="edit98-section">
                  <h2 className="edit98-heading">Overview</h2>
                  <p>
                    Edit distance turns string comparison into a shortest-path problem over a grid of prefixes. Each move edits one
                    character, and the minimum-cost path gives the distance. The DP table makes optimal substructure explicit.
                  </p>
                </section>
                <hr className="edit98-divider" />
                <section id="bp-formal" className="edit98-section">
                  <h2 className="edit98-heading">Formal Definition</h2>
                  {formalDefinition.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <hr className="edit98-divider" />
                <section id="bp-history" className="edit98-section">
                  <h2 className="edit98-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <hr className="edit98-divider" />
                <section id="bp-applications" className="edit98-section">
                  <h2 className="edit98-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <hr className="edit98-divider" />
                <section id="bp-takeaways" className="edit98-section">
                  <h2 className="edit98-heading">Key Takeaways</h2>
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
                <section id="core-mental-models" className="edit98-section">
                  <h2 className="edit98-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-variants" className="edit98-section">
                  <h2 className="edit98-heading">Problem Variants</h2>
                  {problemVariants.map((block) => (
                    <div key={block.heading}>
                      <h3 className="edit98-subheading">{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
                <section id="core-recurrence" className="edit98-section">
                  <h2 className="edit98-heading">Recurrence Breakdown</h2>
                  {recurrenceBreakdown.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    Every optimal edit sequence ends in exactly one of these three moves, so the minimum over these cases is
                    correct. This is the core optimal-substructure argument.
                  </p>
                </section>
                <section id="core-workflow" className="edit98-section">
                  <h2 className="edit98-heading">DP Workflow</h2>
                  {algorithmSteps.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    Correctness idea: any optimal edit sequence ends with exactly one of three operations (insert, delete,
                    substitute). The DP recurrence considers those cases, so the minimum at each prefix pair is optimal.
                  </p>
                </section>
                <section id="core-worked" className="edit98-section">
                  <h2 className="edit98-heading">Worked Example (kitten to sitting)</h2>
                  {workedExample.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-backtracking" className="edit98-section">
                  <h2 className="edit98-heading">Edit Script Reconstruction</h2>
                  {backtrackingSteps.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    For diffs, store a parent pointer for each cell. Each pointer indicates whether you came from left (insert),
                    up (delete), or diagonal (match/substitute). Backtracking yields the exact edits.
                  </p>
                </section>
                <section id="core-compare" className="edit98-section">
                  <h2 className="edit98-heading">Variant Comparison</h2>
                  {variantComparison.map((block) => (
                    <div key={block.heading}>
                      <h3 className="edit98-subheading">{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
                <section id="core-implementation" className="edit98-section">
                  <h2 className="edit98-heading">Implementation Notes</h2>
                  {implementationNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-complexity" className="edit98-section">
                  <h2 className="edit98-heading">Complexity and Tradeoffs</h2>
                  {complexityNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    When you only care about small edit distances, banded DP can be dramatically faster. Otherwise, the classic DP
                    remains the simplest and most reliable approach.
                  </p>
                </section>
                <section id="core-optimization" className="edit98-section">
                  <h2 className="edit98-heading">Optimization Playbook</h2>
                  {optimizationPlaybook.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="edit98-section">
                  <h2 className="edit98-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-usage" className="edit98-section">
                  <h2 className="edit98-heading">When to Use It</h2>
                  <ol>
                    {decisionGuidance.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
                <section id="core-advanced" className="edit98-section">
                  <h2 className="edit98-heading">Advanced Insights</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <section id="ex-practical" className="edit98-section">
                <h2 className="edit98-heading">Practical Examples</h2>
                {examples.map((example) => (
                  <div key={example.title}>
                    <h3 className="edit98-subheading">{example.title}</h3>
                    <div className="edit98-codebox">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </div>
                ))}
              </section>
            )}

            {activeTab === 'glossary' && (
              <>
                <section id="glossary-terms" className="edit98-section">
                  <h2 className="edit98-heading">Glossary</h2>
                  {glossaryTerms.map((item) => (
                    <p key={item.term}>
                      <strong>{item.term}:</strong> {item.definition}
                    </p>
                  ))}
                </section>
                <section id="glossary-faq" className="edit98-section">
                  <h2 className="edit98-heading">Quick FAQ</h2>
                  {miniFaq.map((item) => (
                    <p key={item.question}>
                      <strong>{item.question}</strong> {item.answer}
                    </p>
                  ))}
                </section>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
