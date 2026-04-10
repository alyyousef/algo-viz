import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

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
    detail: 'Computers made it feasible to generate permutations and combinations with pruning.',
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
    detail: 'Permutations fill ordered slots. Combinations pick k items without regard to order.',
  },
]

const coreIdeas = [
  {
    title: 'Permutation definition',
    detail: 'An ordered arrangement of elements. For n distinct items, there are n! permutations.',
  },
  {
    title: 'Combination definition',
    detail: 'An unordered selection of k items from n. The count is C(n, k) = n! / (k!(n-k)!).',
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
    detail: 'For permutations, track which elements are already used to avoid repetition.',
  },
  {
    title: 'Current path',
    detail: 'Stores the partial permutation or combination being built.',
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
    detail: 'The current path always represents a valid partial selection without duplicates.',
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
    detail: 'The recursion depth is bounded by n (or k), ensuring the algorithm finishes.',
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
    detail: 'There are C(n, k) combinations, and generation takes O(k * C(n, k)).',
  },
  {
    title: 'Space usage',
    detail: 'The output dominates space. Additional memory is O(n) for path and visited.',
  },
  {
    title: 'Duplicate handling cost',
    detail: 'Skipping duplicates often needs sorting and checks, adding O(n log n) preprocessing.',
  },
]

const edgeCases = [
  {
    title: 'k = 0',
    detail: 'There is exactly one combination of size 0: the empty set.',
  },
  {
    title: 'k > n',
    detail: 'No combinations exist. Handle this up front to avoid unnecessary recursion.',
  },
  {
    title: 'Duplicate elements',
    detail: 'Sorting and skipping equal neighbors prevents repeated outputs.',
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
    detail: 'Combinations model selecting teams, features, or items without order.',
  },
  {
    context: 'Scheduling',
    detail: 'Permutations represent possible task orders; combinations represent choosing tasks.',
  },
  {
    context: 'Probability and statistics',
    detail: 'Combinatorics underpins counting outcomes in probability models.',
  },
  {
    context: 'Search and optimization',
    detail: 'Brute-force exploration of permutations is used in TSP and ordering problems.',
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
    explanation: 'Skip duplicate values at the same recursion depth to avoid repeated results.',
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
    detail: 'Allow reuse of elements in each slot, resulting in n^k outcomes instead of n!.',
  },
  {
    title: 'Combinations with repetition',
    detail:
      'Allow choosing the same element multiple times; use a non-decreasing index to avoid order differences.',
  },
  {
    title: 'Iterative generation',
    detail:
      "Heap's algorithm and lexicographic next permutation generate permutations without recursion.",
  },
  {
    title: 'Bitmask enumeration',
    detail: 'Combinations can be generated by scanning bitmasks of length n with k bits set.',
  },
]

const takeaways = [
  'Permutations enumerate ordered arrangements; combinations enumerate unordered selections.',
  'Backtracking with visited flags or start indices generates each result exactly once.',
  'The search space grows rapidly, so pruning and duplicates handling matter.',
  'These patterns appear everywhere: anagrams, subsets, scheduling, and brute-force search.',
]

const quickGlossary = [
  {
    term: 'Permutation',
    definition: 'Ordered arrangement of elements.',
  },
  {
    term: 'Combination',
    definition: 'Unordered selection of elements.',
  },
  {
    term: 'Backtracking',
    definition: 'Recursive search that explores choices and undoes them on return.',
  },
  {
    term: 'Visited flags',
    definition: 'Boolean markers showing which elements are already used in the current path.',
  },
  {
    term: 'Start index',
    definition: 'Lower bound index used in combination generation to avoid reordered duplicates.',
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
    { id: 'bp-models', label: 'Mental Models' },
    { id: 'bp-applications', label: 'Real-World Applications' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-ideas', label: 'What the Algorithm Does' },
    { id: 'core-steps', label: 'Step-by-Step Process' },
    { id: 'core-structures', label: 'Data Structures Used' },
    { id: 'core-correctness', label: 'Why Backtracking Works' },
    { id: 'core-complexity', label: 'Complexity Analysis' },
    { id: 'core-edge-cases', label: 'Edge Cases and Conventions' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-variants', label: 'Variants and Extensions' },
  ],
  examples: [{ id: 'ex-practical', label: 'Practical Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function PermutationsCombinationsPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Permutations &amp; Combinations',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Permutations &amp; Combinations"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Permutations &amp; Combinations</h1>
      <p>
        Backtracking for enumerating orders and selections. Permutations and combinations are
        foundational counting problems. Permutations care about order; combinations do not.
        Backtracking provides a clear, reusable way to generate all valid arrangements and
        selections with pruning when needed.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            <p>
              These problems model how many ways to arrange or choose items. Backtracking is the
              workhorse because it can construct each result incrementally, enforce constraints
              early, and generate outputs on demand.
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
          <section id="bp-models" className="bin98-section">
            <h2 className="bin98-heading">Core Concept and Mental Models</h2>
            {mentalModels.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="bp-applications" className="bin98-section">
            <h2 className="bin98-heading">Real-World Applications</h2>
            {realWorldUses.map((item) => (
              <p key={item.context}>
                <strong>{item.context}:</strong> {item.detail}
              </p>
            ))}
          </section>
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
          <section id="core-ideas" className="bin98-section">
            <h2 className="bin98-heading">What the Algorithm Does</h2>
            {coreIdeas.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-steps" className="bin98-section">
            <h2 className="bin98-heading">Step-by-Step Process</h2>
            <ol>
              {algorithmSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>
          <section id="core-structures" className="bin98-section">
            <h2 className="bin98-heading">Data Structures Used</h2>
            {dataStructures.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-correctness" className="bin98-section">
            <h2 className="bin98-heading">Why the Backtracking Works</h2>
            {correctnessNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
            <p>
              By exploring each choice and undoing it, backtracking ensures every valid selection is
              visited once and only once.
            </p>
          </section>
          <section id="core-complexity" className="bin98-section">
            <h2 className="bin98-heading">Complexity Analysis</h2>
            {complexityNotes.map((note) => (
              <p key={note.title}>
                <strong>{note.title}:</strong> {note.detail}
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
        <section id="ex-practical" className="bin98-section">
          <h2 className="bin98-heading">Practical Examples</h2>
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
      )}

      {activeTab === 'glossary' && (
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {quickGlossary.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
