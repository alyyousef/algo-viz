import { Link } from 'react-router-dom'

import type { JSX } from 'react'

const win95Styles = `
.win95-page {
  min-height: 100vh;
  background: #C0C0C0;
  padding: 0;
  color: #000;
  font-family: 'MS Sans Serif', 'Tahoma', sans-serif;
  -webkit-font-smoothing: none;
}

.win95-page * {
  box-sizing: border-box;
}

.win95-page a {
  color: #000;
  text-decoration: none;
}

.win95-page a:hover {
  text-decoration: underline;
}

.win95-window {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  background: #C0C0C0;
  box-shadow: none;
  border-radius: 0;
}

.win95-titlebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #000080;
  color: #fff;
  padding: 4px 6px;
  font-weight: 700;
  font-size: 13px;
  line-height: 1;
}

.win95-title {
  display: inline-block;
}

.win95-title-controls {
  display: flex;
  gap: 4px;
}

.win95-control {
  width: 22px;
  height: 20px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  border-radius: 0;
  font-weight: 700;
  font-size: 12px;
  line-height: 1;
  padding: 0;
  cursor: pointer;
}

.win95-control:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-control:focus,
.win95-button:focus {
  outline: 1px dotted #000;
  outline-offset: -3px;
}

.win95-content {
  padding: 10px;
}

.win95-header-row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: flex-start;
  margin-bottom: 8px;
}

.win95-button {
  padding: 3px 10px 2px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  border-radius: 0;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  line-height: 1.2;
}

.win95-button:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-fieldset {
  border: 2px solid;
  border-color: #808080 #404040 #404040 #808080;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 0;
  background: #C0C0C0;
}

.win95-fieldset legend {
  padding: 0 6px;
  font-weight: 700;
  font-size: 12px;
}

.win95-grid {
  display: grid;
  gap: 6px;
}

.win95-grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.win95-grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
}

.win95-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 8px;
}

.win95-panel {
  border: 2px solid;
  border-color: #808080 #fff #fff #808080;
  background: #C0C0C0;
  padding: 8px;
  border-radius: 0;
}

.win95-panel--raised {
  border-color: #fff #404040 #404040 #fff;
}

.win95-heading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 4px;
}

.win95-subheading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 6px;
}

.win95-text {
  font-size: 12px;
  line-height: 1.35;
  margin: 0 0 6px;
}

.win95-stack {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.win95-list {
  margin: 0;
  padding-left: 18px;
  font-size: 12px;
  line-height: 1.35;
}

.win95-list li {
  margin-bottom: 4px;
}

.win95-list--numbered {
  list-style: decimal;
}

.win95-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.win95-table th,
.win95-table td {
  border: 1px solid #808080;
  padding: 6px 6px 4px;
  text-align: left;
}

.win95-table th {
  font-weight: 700;
}

.win95-code {
  margin: 6px 0;
  background: #C0C0C0;
  color: #000;
  padding: 8px;
  font-family: 'Courier New', monospace;
  font-size: 11px;
  border: 2px solid;
  border-color: #404040 #fff #fff #404040;
  overflow-x: auto;
  border-radius: 0;
}
`

const historicalMilestones = [
  {
    title: 'Early counting principles (1600s)',
    detail:
      'The rule of product and sum set the stage for counting ordered and unordered selections.',
  },
  {
    title: 'Binomial coefficients formalized (1700s)',
    detail:
      'Pascal and others codified combinations with n choose k, connecting counting to algebra.',
  },
  {
    title: 'Enumerative combinatorics (1900s)',
    detail:
      'Systematic study of permutations and combinations fueled algorithms for listing configurations.',
  },
  {
    title: 'Backtracking popularized (1950s)',
    detail:
      'Computers made it feasible to generate permutations and combinations with pruning.',
  },
]

const mentalModels = [
  {
    title: 'Order matters vs does not',
    detail:
      'Permutations care about sequence; combinations care about the set. Sorting and indexes enforce that distinction.',
  },
  {
    title: 'Decision tree',
    detail:
      'Every choice branches. Backtracking explores branches and undoes choices to reach all valid outcomes.',
  },
  {
    title: 'Slots and picks',
    detail:
      'Permutations fill ordered slots. Combinations pick k items without regard to order.',
  },
]

const coreIdeas = [
  {
    title: 'Permutation definition',
    detail:
      'An ordered arrangement of elements. For n distinct items, there are n! permutations.',
  },
  {
    title: 'Combination definition',
    detail:
      'An unordered selection of k items from n. The count is C(n, k) = n! / (k!(n-k)!).',
  },
  {
    title: 'Backtracking approach',
    detail:
      'Build a partial selection, recurse, and backtrack. Constraints prune invalid paths early.',
  },
  {
    title: 'Duplicates',
    detail:
      'When input has repeated values, skip duplicates to avoid repeated permutations or combinations.',
  },
]

const algorithmSteps = [
  'Choose the problem: generate all permutations or all combinations of size k.',
  'Maintain a current path and a visited or start index.',
  'For permutations: try every unused element in each slot, mark it, recurse, then unmark.',
  'For combinations: iterate from a start index and recurse with start + 1 to enforce order.',
  'Collect results when the path reaches the desired length.',
  'Backtrack to explore the next choice.',
]

const dataStructures = [
  {
    title: 'Visited array',
    detail:
      'For permutations, track which elements are already used to avoid repetition.',
  },
  {
    title: 'Current path',
    detail:
      'Stores the partial permutation or combination being built.',
  },
  {
    title: 'Start index',
    detail:
      'For combinations, the start index ensures you only choose elements after the current one.',
  },
  {
    title: 'Result list',
    detail:
      'Collects complete permutations or combinations. Be mindful of memory usage for large n.',
  },
]

const correctnessNotes = [
  {
    title: 'Invariant',
    detail:
      'The current path always represents a valid partial selection without duplicates.',
  },
  {
    title: 'Completeness',
    detail:
      'The recursion explores every valid arrangement or selection, so no valid result is missed.',
  },
  {
    title: 'No duplication',
    detail:
      'Visited flags or start indices prevent repeated use of elements in the same selection.',
  },
  {
    title: 'Termination',
    detail:
      'The recursion depth is bounded by n (or k), ensuring the algorithm finishes.',
  },
]

const complexityNotes = [
  {
    title: 'Permutation count',
    detail:
      'There are n! permutations, and generating them takes O(n * n!) time and O(n) recursion stack.',
  },
  {
    title: 'Combination count',
    detail:
      'There are C(n, k) combinations, and generation takes O(k * C(n, k)).',
  },
  {
    title: 'Space usage',
    detail:
      'The output dominates space. Additional memory is O(n) for path and visited.',
  },
  {
    title: 'Duplicate handling cost',
    detail:
      'Skipping duplicates often needs sorting and checks, adding O(n log n) preprocessing.',
  },
]

const edgeCases = [
  {
    title: 'k = 0',
    detail:
      'There is exactly one combination of size 0: the empty set.',
  },
  {
    title: 'k > n',
    detail:
      'No combinations exist. Handle this up front to avoid unnecessary recursion.',
  },
  {
    title: 'Duplicate elements',
    detail:
      'Sorting and skipping equal neighbors prevents repeated outputs.',
  },
  {
    title: 'Large n',
    detail:
      'The result size grows factorially or combinatorially, so generation can be infeasible.',
  },
]

const realWorldUses = [
  {
    context: 'Anagram generation',
    detail:
      'Permutations of characters create all possible orderings in word games or cryptanalysis.',
  },
  {
    context: 'Subset selection',
    detail:
      'Combinations model selecting teams, features, or items without order.',
  },
  {
    context: 'Scheduling',
    detail:
      'Permutations represent possible task orders; combinations represent choosing tasks.',
  },
  {
    context: 'Probability and statistics',
    detail:
      'Combinatorics underpins counting outcomes in probability models.',
  },
  {
    context: 'Search and optimization',
    detail:
      'Brute-force exploration of permutations is used in TSP and ordering problems.',
  },
]

const examples = [
  {
    title: 'Permutation backtracking',
    code: `function permute(nums):
    results = []
    used = [false]*len(nums)

    function dfs(path):
        if len(path) == len(nums):
            results.push(copy(path))
            return
        for i in 0..len(nums)-1:
            if used[i]: continue
            used[i] = true
            path.push(nums[i])
            dfs(path)
            path.pop()
            used[i] = false

    dfs([])
    return results`,
    explanation:
      'Each position tries all unused elements. Backtracking resets state after exploring a branch.',
  },
  {
    title: 'Combination backtracking',
    code: `function combine(nums, k):
    results = []

    function dfs(start, path):
        if len(path) == k:
            results.push(copy(path))
            return
        for i in start..len(nums)-1:
            path.push(nums[i])
            dfs(i + 1, path)
            path.pop()

    dfs(0, [])
    return results`,
    explanation:
      'The start index ensures each element is used at most once and maintains ordering.',
  },
  {
    title: 'Duplicate handling',
    code: `sort(nums)
for i in start..len(nums)-1:
    if i > start and nums[i] == nums[i-1]: continue
    choose nums[i] and recurse`,
    explanation:
      'Skip duplicate values at the same recursion depth to avoid repeated results.',
  },
]

const pitfalls = [
  'Mixing up permutations and combinations. Order matters only for permutations.',
  'Forgetting to backtrack state (used flags or path), causing missing results.',
  'Generating duplicates when input contains repeated elements.',
  'Not pruning when k elements remain but not enough items left.',
  'Trying to materialize all results for large n, which can overflow memory.',
]

const variants = [
  {
    title: 'Permutations with repetition',
    detail:
      'Allow reuse of elements in each slot, resulting in n^k outcomes instead of n!.',
  },
  {
    title: 'Combinations with repetition',
    detail:
      'Allow choosing the same element multiple times; use a non-decreasing index to avoid order differences.',
  },
  {
    title: 'Iterative generation',
    detail:
      'Heap\'s algorithm and lexicographic next permutation generate permutations without recursion.',
  },
  {
    title: 'Bitmask enumeration',
    detail:
      'Combinations can be generated by scanning bitmasks of length n with k bits set.',
  },
]

const takeaways = [
  'Permutations enumerate ordered arrangements; combinations enumerate unordered selections.',
  'Backtracking with visited flags or start indices generates each result exactly once.',
  'The search space grows rapidly, so pruning and duplicates handling matter.',
  'These patterns appear everywhere: anagrams, subsets, scheduling, and brute-force search.',
]

export default function PermutationsCombinationsPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Permutations & Combinations</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Backtracking for enumerating orders and selections</div>
              <p className="win95-text">
                Permutations and combinations are foundational counting problems. Permutations care about order; combinations do not.
                Backtracking provides a clear, reusable way to generate all valid arrangements and selections with pruning when needed.
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
                These problems model how many ways to arrange or choose items. Backtracking is the workhorse because it can construct
                each result incrementally, enforce constraints early, and generate outputs on demand.
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
                By exploring each choice and undoing it, backtracking ensures every valid selection is visited once and only once.
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
