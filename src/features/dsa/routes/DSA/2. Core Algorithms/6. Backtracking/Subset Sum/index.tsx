import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

const historicalMilestones = [
  {
    title: 'Early combinatorics (1800s)',
    detail:
      'Subset selection problems motivated combinatorial counting and early algorithmic thinking.',
  },
  {
    title: 'NP-completeness (1972)',
    detail:
      'Subset Sum became a canonical NP-complete problem, shaping complexity theory and reductions.',
  },
  {
    title: 'Backtracking popularized (1950s)',
    detail:
      'Recursive search made it possible to solve modest instances exactly.',
  },
  {
    title: 'Pseudo-polynomial DP (1970s)',
    detail:
      'Dynamic programming offered a practical alternative when the target sum is small.',
  },
]

const mentalModels = [
  {
    title: 'Binary decision tree',
    detail:
      'For each number, choose include or exclude. The path sum tracks how close you are to the target.',
  },
  {
    title: 'Scale balancing',
    detail:
      'Think of placing weights on a scale to hit a precise total.',
  },
  {
    title: 'Prune with bounds',
    detail:
      'If the current sum exceeds the target or cannot reach it, stop exploring that branch.',
  },
]

const coreIdeas = [
  {
    title: 'Problem statement',
    detail:
      'Given a set of integers and a target sum, decide whether any subset sums exactly to the target.',
  },
  {
    title: 'Backtracking approach',
    detail:
      'Try including or excluding each element, tracking the running sum and backtracking on dead ends.',
  },
  {
    title: 'Decision vs enumeration',
    detail:
      'You can stop at the first valid subset, or collect all subsets that meet the target.',
  },
  {
    title: 'Pruning',
    detail:
      'Sort values and prune when the sum exceeds the target (for nonnegative inputs).',
  },
]

const algorithmSteps = [
  'Sort the numbers (optional but helpful for pruning).',
  'Start with an empty subset and sum = 0.',
  'At each index, branch: include the number or skip it.',
  'If the sum equals the target, record success.',
  'If the sum exceeds the target (nonnegative case), prune.',
  'If all numbers are processed and no success, backtrack.',
]

const dataStructures = [
  {
    title: 'Input array',
    detail:
      'The list of numbers to consider, often sorted for pruning.',
  },
  {
    title: 'Current subset',
    detail:
      'Stores the elements chosen so far if you need to output the subset.',
  },
  {
    title: 'Running sum',
    detail:
      'Tracks the current total to compare against the target.',
  },
  {
    title: 'Index pointer',
    detail:
      'Controls which elements are still available for selection.',
  },
]

const correctnessNotes = [
  {
    title: 'Invariant',
    detail:
      'The current subset sum equals the sum of chosen elements, and all elements before the index are decided.',
  },
  {
    title: 'Completeness',
    detail:
      'Backtracking explores every subset, so it finds a solution if one exists.',
  },
  {
    title: 'Soundness',
    detail:
      'A solution is accepted only if its sum equals the target.',
  },
  {
    title: 'Pruning safety',
    detail:
      'Pruning on sum > target is safe only when all remaining numbers are nonnegative.',
  },
]

const complexityNotes = [
  {
    title: 'Worst-case time',
    detail:
      'O(2^n) subsets in the worst case; backtracking is exponential.',
  },
  {
    title: 'Space complexity',
    detail:
      'O(n) recursion depth plus the subset storage.',
  },
  {
    title: 'Pseudo-polynomial alternative',
    detail:
      'DP can solve it in O(n * target) time when target is not too large.',
  },
  {
    title: 'Meet-in-the-middle',
    detail:
      'Splitting the array yields O(2^(n/2)) time, faster for moderate n.',
  },
]

const edgeCases = [
  {
    title: 'Target is 0',
    detail:
      'The empty subset is a valid solution.',
  },
  {
    title: 'Negative numbers',
    detail:
      'Pruning on sum > target is not valid if negatives exist; branches may recover later.',
  },
  {
    title: 'Duplicates',
    detail:
      'Duplicates can produce multiple equivalent subsets; handle if you want unique results.',
  },
  {
    title: 'Large target',
    detail:
      'DP may be infeasible if target is huge; backtracking or meet-in-the-middle may be better.',
  },
]

const realWorldUses = [
  {
    context: 'Budget selection',
    detail:
      'Choose items that sum exactly to a budget with discrete costs.',
  },
  {
    context: 'Cryptography',
    detail:
      'Subset Sum underpins knapsack-based cryptosystems and hardness assumptions.',
  },
  {
    context: 'Load balancing',
    detail:
      'Pick tasks that exactly fit a time or resource capacity window.',
  },
  {
    context: 'Test case generation',
    detail:
      'Find subsets with specific totals to hit edge-case conditions.',
  },
  {
    context: 'Feature selection',
    detail:
      'Select features whose costs or weights match a given threshold.',
  },
]

const examples = [
  {
    title: 'Backtracking pseudocode',
    code: `function subsetSum(i, sum):
    if sum == target: return true
    if i == n: return false
    if sum > target and allNonNegative: return false

    // include nums[i]
    if subsetSum(i + 1, sum + nums[i]): return true
    // exclude nums[i]
    return subsetSum(i + 1, sum)`,
    explanation:
      'Each element is either included or excluded, forming a binary decision tree.',
  },
  {
    title: 'Example instance',
    code: `nums = [3, 34, 4, 12, 5, 2]
target = 9
Solution subset: [4, 5]`,
    explanation:
      'The backtracking search finds that 4 + 5 equals 9.',
  },
  {
    title: 'Meet-in-the-middle sketch',
    code: `Split nums into A and B.
Compute all subset sums of A and B.
Sort B sums and binary search for target - aSum.`,
    explanation:
      'This reduces time from O(2^n) to roughly O(2^(n/2)).',
  },
]

const pitfalls = [
  'Pruning on sum > target when negatives exist, which can miss valid solutions.',
  'Stopping early when you need all valid subsets.',
  'Not tracking the chosen elements, which makes it hard to output the subset.',
  'Confusing subset sum with subset count; the decision problem is different.',
  'Ignoring the exponential blowup for large n.',
]

const variants = [
  {
    title: 'All subsets enumeration',
    detail:
      'Collect every subset that hits the target rather than returning early.',
  },
  {
    title: 'Count subsets',
    detail:
      'Count the number of subsets that sum to target instead of returning a boolean.',
  },
  {
    title: 'Bounded knapsack',
    detail:
      'Allow each item to be used multiple times, leading to unbounded or bounded variants.',
  },
  {
    title: 'Approximate subset sum',
    detail:
      'Approximation schemes trade accuracy for speed on large inputs.',
  },
]

const takeaways = [
  'Subset Sum is a classic NP-complete decision problem.',
  'Backtracking explores include/exclude decisions and is complete but exponential.',
  'Pruning and heuristics help when numbers are nonnegative or sorted.',
  'DP and meet-in-the-middle provide practical alternatives for certain sizes.',
]

const glossaryTerms = [
  {
    term: 'Subset Sum',
    definition:
      'The decision problem of determining whether any subset of given integers adds up exactly to a target value.',
  },
  {
    term: 'Backtracking',
    definition:
      'A search strategy that tries a choice, explores its consequences, and undoes that choice when it fails.',
  },
  {
    term: 'Running sum',
    definition:
      'The current total of all numbers included so far in the subset under construction.',
  },
  {
    term: 'Pruning',
    definition:
      'Stopping exploration of a branch early when it cannot lead to a valid solution under known constraints.',
  },
  {
    term: 'Decision tree',
    definition:
      'A tree of include or exclude choices, where each root-to-leaf path represents one subset.',
  },
  {
    term: 'Pseudo-polynomial time',
    definition:
      'Running time that depends on the numeric target value as well as input size, such as O(n * target).',
  },
  {
    term: 'Meet-in-the-middle',
    definition:
      'A technique that splits the input into halves and combines subset sums from each side more efficiently.',
  },
  {
    term: 'NP-complete',
    definition:
      'A class of problems believed not to have polynomial-time exact solutions in general, unless P = NP.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const subsetSumHelpStyles = `
.subset-sum-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  padding: 0;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.subset-sum-help-window {
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: #c0c0c0;
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  box-sizing: border-box;
}

.subset-sum-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
}

.subset-sum-help-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  font-weight: 700;
  white-space: nowrap;
}

.subset-sum-help-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.subset-sum-help-control {
  width: 18px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  text-decoration: none;
  font-size: 11px;
  line-height: 1;
  padding: 0;
}

.subset-sum-help-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
  overflow-x: auto;
}

.subset-sum-help-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  font-family: inherit;
  cursor: pointer;
  white-space: nowrap;
}

.subset-sum-help-tab.active {
  position: relative;
  top: 1px;
  background: #fff;
}

.subset-sum-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
  border-top: 1px solid #404040;
  background: #fff;
}

.subset-sum-help-toc {
  overflow: auto;
  background: #f2f2f2;
  border-right: 1px solid #808080;
  padding: 12px;
}

.subset-sum-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.subset-sum-help-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.subset-sum-help-toc-list li {
  margin: 0 0 8px;
}

.subset-sum-help-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.subset-sum-help-content {
  overflow: auto;
  padding: 14px 20px 24px;
}

.subset-sum-help-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.subset-sum-help-section {
  margin: 0 0 20px;
}

.subset-sum-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.subset-sum-help-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.subset-sum-help-content p,
.subset-sum-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.subset-sum-help-content p {
  margin: 0 0 10px;
}

.subset-sum-help-content ul,
.subset-sum-help-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.subset-sum-help-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.subset-sum-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.subset-sum-help-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .subset-sum-help-main {
    grid-template-columns: 1fr;
  }

  .subset-sum-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}
`

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

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

export default function SubsetSumPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const tabParam = searchParams.get('tab')
  const activeTab: TabId = isTabId(tabParam) ? tabParam : 'big-picture'
  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Subset Sum (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleTabChange = (tabId: TabId) => {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('tab', tabId)
    setSearchParams(nextParams, { replace: false })
  }

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Subset Sum',
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
    <div className="subset-sum-help-page">
      <style>{subsetSumHelpStyles}</style>
      <div className="subset-sum-help-window" role="presentation">
        <header className="subset-sum-help-titlebar">
          <span className="subset-sum-help-title">Subset Sum</span>
          <div className="subset-sum-help-controls">
            <button className="subset-sum-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="subset-sum-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="subset-sum-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`subset-sum-help-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="subset-sum-help-main">
          <aside className="subset-sum-help-toc" aria-label="Table of contents">
            <h2 className="subset-sum-help-toc-title">Contents</h2>
            <ul className="subset-sum-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="subset-sum-help-content">
            <h1 className="subset-sum-help-doc-title">Subset Sum</h1>
            <p>
              Subset Sum asks whether any subset of numbers adds up to a target. The backtracking solution branches on include vs
              exclude, pruning impossible paths and stopping when a valid subset is found.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="subset-sum-help-section">
                  <h2 className="subset-sum-help-heading">Overview</h2>
                  <p>
                    This problem captures the challenge of exact selection. Each element is either used or ignored, making the
                    search space exponential. Backtracking keeps the approach simple while enabling pruning strategies.
                  </p>
                  {coreIdeas.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <hr className="subset-sum-help-divider" />
                <section id="bp-history" className="subset-sum-help-section">
                  <h2 className="subset-sum-help-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <div key={item.title}>
                      <h3 className="subset-sum-help-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>
                <hr className="subset-sum-help-divider" />
                <section id="bp-mental-models" className="subset-sum-help-section">
                  <h2 className="subset-sum-help-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <div key={item.title}>
                      <h3 className="subset-sum-help-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>
                <hr className="subset-sum-help-divider" />
                <section id="bp-applications" className="subset-sum-help-section">
                  <h2 className="subset-sum-help-heading">Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <hr className="subset-sum-help-divider" />
                <section id="bp-takeaways" className="subset-sum-help-section">
                  <h2 className="subset-sum-help-heading">Key Takeaways</h2>
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
                <section id="core-foundation" className="subset-sum-help-section">
                  <h2 className="subset-sum-help-heading">Core Foundation</h2>
                  <p>
                    Every subset corresponds to a unique path in the decision tree. By exploring both include and exclude
                    branches, the algorithm is complete.
                  </p>
                  <p>
                    The practical challenge is reducing wasted exploration. Sorting, tracking the running sum, and pruning invalid
                    branches can make an exponential search much more manageable on modest inputs.
                  </p>
                </section>
                <section id="core-process" className="subset-sum-help-section">
                  <h2 className="subset-sum-help-heading">Step-by-Step Process</h2>
                  <ol>
                    {algorithmSteps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </section>
                <section id="core-structures" className="subset-sum-help-section">
                  <h2 className="subset-sum-help-heading">Data Structures</h2>
                  {dataStructures.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-correctness" className="subset-sum-help-section">
                  <h2 className="subset-sum-help-heading">Why It Works</h2>
                  {correctnessNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-complexity" className="subset-sum-help-section">
                  <h2 className="subset-sum-help-heading">Complexity</h2>
                  {complexityNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-edge-cases" className="subset-sum-help-section">
                  <h2 className="subset-sum-help-heading">Edge Cases and Conventions</h2>
                  {edgeCases.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="subset-sum-help-section">
                  <h2 className="subset-sum-help-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-variants" className="subset-sum-help-section">
                  <h2 className="subset-sum-help-heading">Variants and Extensions</h2>
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
                <section id="examples-code" className="subset-sum-help-section">
                  <h2 className="subset-sum-help-heading">Code Examples</h2>
                  {examples.map((example) => (
                    <div key={example.title}>
                      <h3 className="subset-sum-help-subheading">{example.title}</h3>
                      <div className="subset-sum-help-codebox">
                        <code>{example.code.trim()}</code>
                      </div>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>
                <section id="examples-notes" className="subset-sum-help-section">
                  <h2 className="subset-sum-help-heading">Example Notes</h2>
                  <p>
                    The examples cover the core include or exclude recursion, a concrete instance with a matching subset, and the
                    meet-in-the-middle technique used when plain backtracking becomes too expensive.
                  </p>
                  <p>
                    Together they show the main tradeoff in this problem: exact correctness is straightforward, but scale depends
                    heavily on pruning and alternative formulations.
                  </p>
                </section>
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="subset-sum-help-section">
                <h2 className="subset-sum-help-heading">Glossary</h2>
                {glossaryTerms.map((item) => (
                  <p key={item.term}>
                    <strong>{item.term}:</strong> {item.definition}
                  </p>
                ))}
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
