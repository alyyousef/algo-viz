import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const bigPicture = [
  {
    title: 'Why it exists',
    detail:
      'Dynamic programming (DP) is the discipline of turning exponential brute force into polynomial time by reusing answers to overlapping subproblems. It saves systems from recomputing the same state thousands or millions of times.',
  },
  {
    title: 'What it saves us from',
    detail:
      'Without DP, shortest paths, sequence alignment, optimal edit scripts, and resource allocation would be either prohibitively slow or handled by heuristics with no guarantees.',
  },
  {
    title: 'Where it shows up',
    detail:
      'Routing protocols, genome alignment, ad auctions, compiler optimizers, query planners, and recommendation systems all rely on DP tables or memoized recurrences to stay fast and predictable.',
  },
]

const history = [
  {
    title: '1950s: Bellman coins the term',
    detail:
      'Richard Bellman introduced dynamic programming while working on multistage decision processes for control theory. The core idea was the principle of optimality: an optimal policy has optimal sub-policies.',
  },
  {
    title: '1960s: Knapsack and sequence alignment',
    detail:
      'DP formalized the classic 0/1 knapsack and edit distance problems, giving clear polynomial-time solutions where brute force had exploded combinatorially.',
  },
  {
    title: '1970s: Algorithms enter practice',
    detail:
      'The Needleman-Wunsch and Smith-Waterman algorithms brought DP to bioinformatics, proving that rigorous recurrences could power real labs and not just theory.',
  },
  {
    title: 'Modern era: DP meets scale',
    detail:
      'DP ideas power Viterbi decoding in communications, inside-outside for probabilistic grammars, and value iteration in reinforcement learning. The pattern remains: define state, derive recurrence, exploit overlap.',
  },
]

const pillars = [
  {
    title: 'Optimal substructure',
    detail:
      'The best solution can be composed of best solutions to smaller instances. If this is false, DP will give the wrong answer.',
  },
  {
    title: 'Overlapping subproblems',
    detail:
      'The same substate is needed many times. Caching prevents exponential blowup and converts repetition into leverage.',
  },
  {
    title: 'Well-defined state and transition',
    detail:
      'The state must capture everything the future depends on, nothing more. Transitions must be correct and acyclic once ordered.',
  },
]

const mentalModels = [
  {
    title: 'Travel diary',
    detail:
      'Each page (state) records the cheapest cost to reach a city. You never rewrite history; you only fill blanks using already known pages.',
  },
  {
    title: 'Spreadsheet of possibilities',
    detail:
      'Cells reference other cells, but circular references are forbidden. Sorting cells by dependency is the essence of bottom-up order.',
  },
  {
    title: 'Warehouse shelves',
    detail:
      'Memoization is like labeling bins for parts. Once a bin is filled, any worker can reuse it instantly instead of re-crafting the part.',
  },
]

const howItWorks = [
  {
    heading: '1) Define state',
    detail:
      'Pick the smallest tuple that fully describes progress: indices, remaining capacity, mask of chosen items, position in a tree. Eliminate dimensions that do not affect future choices.',
  },
  {
    heading: '2) Derive recurrence',
    detail:
      'Express the answer for a state in terms of smaller states. Prove each dependency is strictly smaller in a well-founded order (index decreases, capacity decreases, subset size decreases).',
  },
  {
    heading: '3) Pick execution style',
    detail:
      'Top-down with memoization mirrors the recurrence and is great for sparse states. Bottom-up tabulation is stack safe and cache friendly once you know the order.',
  },
  {
    heading: '4) Choose base cases and sentinels',
    detail:
      'Initialize impossible states with negative or positive infinity and reachable empties with zero or neutral elements. Bad initialization is the most common DP bug.',
  },
  {
    heading: '5) Reconstruct decisions',
    detail:
      'Store predecessors or take argmax choices to rebuild the path, not just the score. Many production failures come from forgetting reconstruction.',
  },
]

const complexityTable = [
  { approach: 'Naive recursion (Fibonacci)', time: 'O(2^n)', space: 'O(n) stack', note: 'Explodes past n=45' },
  {
    approach: 'Top-down memo',
    time: 'O(n)',
    space: 'O(n) cache + stack',
    note: 'Sparse states shine; overhead from recursion still present',
  },
  {
    approach: 'Bottom-up tabulation',
    time: 'O(n)',
    space: 'O(n) table',
    note: 'No stack blowups; best cache locality',
  },
  {
    approach: 'Space optimized',
    time: 'O(n)',
    space: 'O(1) or O(width)',
    note: 'Keeps only rolling frontier when dependencies are limited',
  },
]

const applications = [
  {
    title: 'Networking and routing',
    detail:
      'Bellman-Ford is a DP over edges and distances. Distributed routing protocols reuse those subresults to converge on shortest paths.',
  },
  {
    title: 'Compilers and query optimizers',
    detail:
      'Dynamic programming picks parenthesization orders in SQL joins (System R), builds optimal parse trees in CYK, and drives instruction scheduling.',
  },
  {
    title: 'Bioinformatics',
    detail:
      'Needleman-Wunsch and Smith-Waterman fill a grid where each cell reuses neighbors to score sequence alignment. Without DP, genome labs would wait days instead of minutes.',
  },
  {
    title: 'Ads, pricing, and auctions',
    detail:
      'Budget pacing and bid shading often solve a resource allocation DP: maximize revenue subject to spend and inventory constraints.',
  },
  {
    title: 'Reinforcement learning',
    detail:
      'Value iteration and policy iteration are DP on Markov decision processes. Each value update reuses downstream values to converge on optimal policies.',
  },
]

const pitfalls = [
  'State is too large: an extra dimension of size 10^3 can turn a solution from feasible to impossible.',
  'Bad base cases: missing empty string rows in edit distance often yields off-by-one scores.',
  'Wrong order: reading from an unfilled cell silently injects garbage. Assertions against sentinel values can save hours.',
  'Overfitting to one instance: a recurrence that assumes sorted input or unique values may fail on adversarial cases.',
  'Ignoring reconstruction: computing only the score forces a second pass or makes the answer unusable to product teams.',
]

const whenToUse = [
  'You can articulate optimal substructure and overlapping subproblems clearly.',
  'The state space is at most around 10^6 to 10^7 states with simple transitions.',
  'Approximation or greedy fails to give guarantees and you need correctness.',
  'Branch and bound or search is exploding, but dependencies are structured.',
]

const advanced = [
  {
    title: 'Bitmask and SOS DP',
    detail:
      'Subset DP and sum-over-subsets transforms shrink exponential subsets by exploiting bit operations for transitions. Classic for TSP with n up to 20.',
  },
  {
    title: 'Divide-and-conquer optimization',
    detail:
      'Knuth and quadrangle inequality optimizations cut a naive O(n^3) DP to O(n^2) by proving the argmin indices move monotonically.',
  },
  {
    title: 'Convex hull trick and Li Chao trees',
    detail:
      'When recurrences involve lines, these structures answer min line queries in logarithmic time, turning O(n^2) DP into O(n log n).',
  },
  {
    title: 'Tree and DAG DP',
    detail:
      'Post-order traversal on trees and topological order on DAGs generalize the fill order principle beyond grids. Widely used in compiler IR passes.',
  },
  {
    title: 'Memory layout tuning',
    detail:
      'Cache-aware tiling and blocking matter for large tables. Production systems sometimes switch to banded DP to keep hot rows in cache.',
  },
]

const codeExamples = [
  {
    title: 'Bottom-up edit distance (Levenshtein)',
    code: `def edit_distance(a: str, b: str) -> int:
    # dp[i][j] = cost to convert a[:i] to b[:j]
    dp = [[0] * (len(b) + 1) for _ in range(len(a) + 1)]
    for i in range(len(a) + 1):
        dp[i][0] = i  # delete all chars
    for j in range(len(b) + 1):
        dp[0][j] = j  # insert all chars

    for i in range(1, len(a) + 1):
        for j in range(1, len(b) + 1):
            cost = 0 if a[i - 1] == b[j - 1] else 1
            dp[i][j] = min(
                dp[i - 1][j] + 1,      # delete
                dp[i][j - 1] + 1,      # insert
                dp[i - 1][j - 1] + cost,  # replace/match
            )
    return dp[len(a)][len(b)]`,
    explanation:
      'Grid DP with O(|a| * |b|) time and space. Dependencies are left, up, and diagonal, so row-major iteration is valid. Base rows are the crucial guardrails.',
  },
  {
    title: 'Space-optimized knapsack (0/1)',
    code: `def knapsack(weights, values, capacity):
    # 1D rolling array; iterate capacity descending to avoid reuse in same row
    dp = [0] * (capacity + 1)
    for w, v in zip(weights, values):
        for c in range(capacity, w - 1, -1):
            dp[c] = max(dp[c], dp[c - w] + v)
    return dp[capacity]`,
    explanation:
      'Transitions only depend on the previous item row, so a single array suffices. Reversing the capacity loop prevents using an item multiple times.',
  },
]

const keyTakeaways = [
  'Define the smallest correct state. Everything else follows.',
  'Order matters as much as the recurrence. Incorrect order is silent failure.',
  'Reconstruction turns a score into a story. Products often need the path.',
]

export default function DynamicProgrammingParadigmPage(): JSX.Element {
  return (
    <TopicLayout
      title="Dynamic Programming Paradigm"
      subtitle="Reuse overlapping solutions"
      intro="Dynamic programming is the craft of converting repeated work into cached answers. It trades exponential branching for orderly state transitions and underpins routing, parsing, alignment, and planning systems across industry."
    >
      <TopicSection heading="The big picture">
        <div className="grid gap-3 md:grid-cols-3">
          {bigPicture.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold leading-tight text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Historical context">
        <div className="grid gap-3 md:grid-cols-2">
          {history.map((event) => (
            <article key={event.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{event.title}</p>
              <p className="text-sm text-white/80">{event.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Core concept and mental hooks">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="space-y-3 rounded-lg bg-white/5 p-4">
            <h3 className="text-sm font-semibold text-white">Three pillars</h3>
            <ul className="space-y-2 text-sm text-white/80">
              {pillars.map((pillar) => (
                <li key={pillar.title}>
                  <span className="font-semibold text-white">{pillar.title}: </span>
                  {pillar.detail}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3 rounded-lg bg-white/5 p-4">
            <h3 className="text-sm font-semibold text-white">Mental models</h3>
            <ul className="space-y-2 text-sm text-white/80">
              {mentalModels.map((model) => (
                <li key={model.title}>
                  <span className="font-semibold text-white">{model.title}: </span>
                  {model.detail}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </TopicSection>

      <TopicSection heading="How it works, step by step">
        <div className="grid gap-3 md:grid-cols-2">
          {howItWorks.map((step) => (
            <article key={step.heading} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{step.heading}</h3>
              <p className="text-sm text-white/80">{step.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Complexity in practice">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-white/80">
            <thead className="text-white">
              <tr>
                <th className="px-2 py-1">Approach</th>
                <th className="px-2 py-1">Time</th>
                <th className="px-2 py-1">Space</th>
                <th className="px-2 py-1">Notes</th>
              </tr>
            </thead>
            <tbody>
              {complexityTable.map((row) => (
                <tr key={row.approach} className="border-t border-white/10">
                  <td className="px-2 py-1 text-white">{row.approach}</td>
                  <td className="px-2 py-1">{row.time}</td>
                  <td className="px-2 py-1">{row.space}</td>
                  <td className="px-2 py-1">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-white/70">
          Big O hides constants, but memory layout and cache behavior matter. Bottom-up tables often outperform memoized recursion in tight loops because they avoid call overhead and exhibit better spatial locality.
        </p>
      </TopicSection>

      <TopicSection heading="Real-world applications and failure stories">
        <div className="grid gap-3 md:grid-cols-2">
          {applications.map((app) => (
            <article key={app.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{app.title}</h3>
              <p className="text-sm text-white/80">{app.detail}</p>
            </article>
          ))}
        </div>
        <div className="mt-4 rounded-lg border border-red-400/40 bg-red-500/10 p-4 text-sm text-white/80">
          <p className="font-semibold text-white">Failure case</p>
          <p>
            A video streaming team once used a greedy bitrate selector per segment, ignoring future bandwidth drops. Under load tests, sessions oscillated and rebuffered. Reframing it as a DP over time and buffer levels stabilized playback and cut rebuffering by double digits.
          </p>
        </div>
      </TopicSection>

      <TopicSection heading="Practical examples">
        <div className="grid gap-4 lg:grid-cols-2">
          {codeExamples.map((example) => (
            <article key={example.title} className="space-y-3 rounded-lg border border-white/10 bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{example.title}</h3>
              <pre className="overflow-auto rounded bg-black/60 p-3 text-xs text-green-100">
                <code>{example.code}</code>
              </pre>
              <p className="text-sm text-white/80">{example.explanation}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Common pitfalls">
        <ul className="space-y-2 text-sm text-white/80">
          {pitfalls.map((pitfall) => (
            <li key={pitfall} className="rounded-lg bg-white/5 px-3 py-2">
              {pitfall}
            </li>
          ))}
        </ul>
      </TopicSection>

      <TopicSection heading="When to use dynamic programming">
        <ul className="space-y-2 text-sm text-white/80">
          {whenToUse.map((item) => (
            <li key={item} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
              {item}
            </li>
          ))}
        </ul>
      </TopicSection>

      <TopicSection heading="Advanced insights and optimizations">
        <div className="grid gap-3 md:grid-cols-2">
          {advanced.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Key takeaways">
        <div className="grid gap-3 md:grid-cols-3">
          {keyTakeaways.map((takeaway) => (
            <article key={takeaway} className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-white/80">
              {takeaway}
            </article>
          ))}
        </div>
      </TopicSection>
    </TopicLayout>
  )
}

