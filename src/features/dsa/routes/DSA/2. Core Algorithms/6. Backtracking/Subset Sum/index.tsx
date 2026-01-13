import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

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

export default function SubsetSumPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Subset Sum</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Backtracking for exact target totals</div>
              <p className="win95-text">
                Subset Sum asks whether any subset of numbers adds up to a target. The backtracking solution branches on include vs
                exclude, pruning impossible paths and stopping when a valid subset is found.
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
                This problem captures the challenge of exact selection. Each element is either used or ignored, making the search
                space exponential. Backtracking keeps the approach simple while enabling pruning strategies.
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
                Every subset corresponds to a unique path in the decision tree. By exploring both include and exclude branches, the
                algorithm is complete.
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

