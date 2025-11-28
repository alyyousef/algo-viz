import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const historicalMilestones = [
  {
    title: 'Turing frames computation as machines (1936)',
    detail:
      'Alan Turing described abstract machines and gave us a way to talk about the cost of computation separate from any real hardware.',
  },
  {
    title: 'Knuth popularizes Big O in algorithms (1960s)',
    detail:
      'Donald Knuth adopted Bachmann and Landau notation for algorithm analysis, making asymptotic reasoning standard in computer science.',
  },
  {
    title: 'Cook and Karp formalize complexity classes (1970s)',
    detail:
      'Their work on NP-completeness connected algorithm design with hardness assumptions, guiding where to expect efficient solutions.',
  },
  {
    title: 'Amortized analysis gains traction (1980s)',
    detail:
      'Tarjan and others showed how average cost over sequences of operations can be small even when single operations look expensive.',
  },
]

const mentalModels = [
  {
    title: 'Topographic maps for code',
    detail:
      'Complexity tells you how the cost landscape rises as input grows. You are learning where the cliffs are before you hike.',
  },
  {
    title: 'Exchange rates',
    detail:
      'Big O is an exchange rate between input size and work. It ignores constant factors to focus on how fast the bill grows.',
  },
  {
    title: 'Ceilings versus averages',
    detail:
      'Worst case is a ceiling on pain, average case is typical experience, amortized is budget spread across a journey.',
  },
  {
    title: 'Memory as a second currency',
    detail:
      'Space complexity counts how much extra memory you rent to gain speed or simplicity. Sometimes the cheapest time costs the most space.',
  },
]

const growthRates = [
  { name: 'O(1)', meaning: 'Constant. Cost does not grow with input size.' },
  { name: 'O(log n)', meaning: 'Logarithmic. Each step cuts the problem space, like binary search.' },
  { name: 'O(n)', meaning: 'Linear. Work grows directly with input size.' },
  { name: 'O(n log n)', meaning: 'Linearithmic. Divide and conquer with merging or balanced partitions.' },
  { name: 'O(n^2)', meaning: 'Quadratic. Every element interacts with many others, like naive double loops.' },
  { name: 'O(2^n) / O(n!)', meaning: 'Exponential or factorial. Work explodes; feasible only for tiny n.' },
]

const mechanics = [
  {
    heading: 'What Big O captures',
    bullets: [
      'Growth trend as n approaches infinity. Constants and lower-order terms are ignored.',
      'Upper bound guarantee. O(n) means cost grows no faster than some multiple of n beyond a certain size.',
      'Machine-agnostic reasoning. Compares algorithms without needing hardware benchmarks.',
    ],
  },
  {
    heading: 'What it hides',
    bullets: [
      'Constant factors. O(n) with a small constant can beat O(log n) with a huge one for realistic n.',
      'Cache and memory effects. Poor locality can dominate asymptotic wins for moderate inputs.',
      'Input distribution. Average case and practical cases can differ from worst case dramatically.',
    ],
  },
  {
    heading: 'Space complexity',
    bullets: [
      'Counts extra memory beyond the input itself. In-place algorithms aim for O(1) extra space.',
      'Recursive algorithms consume stack frames; depth often equals recursion height.',
      'Time-space tradeoffs: precomputed tables or memoization trade memory for speed.',
    ],
  },
]

const realWorldImplications = [
  {
    context: 'Search and indexing',
    detail:
      'Databases rely on O(log n) tree indexes instead of O(n) scans. At a billion rows, the difference is milliseconds versus minutes.',
  },
  {
    context: 'Sorting pipelines',
    detail:
      'O(n log n) sorts like mergesort and quicksort are defaults in standard libraries. O(n^2) sorts only survive in tiny data or specialized niches.',
  },
  {
    context: 'APIs and SLAs',
    detail:
      'If a handler is O(n^2) in request size, adversaries can craft large bodies to exhaust CPU. Complexity is part of capacity planning and security review.',
  },
  {
    context: 'Mobile and edge devices',
    detail:
      'Memory-sensitive environments push for O(1) or O(log n) space. Algorithms with high constant factors can still drain battery faster despite good asymptotics.',
  },
]

const examples = [
  {
    title: 'Binary search walkthrough',
    code: `function binarySearch(arr, target):
    lo = 0
    hi = arr.length - 1
    while lo <= hi:
        mid = floor((lo + hi) / 2)
        if arr[mid] == target: return mid
        if arr[mid] < target: lo = mid + 1
        else: hi = mid - 1
    return -1`,
    explanation:
      'Each iteration halves the search space. The loop runs at most log2(n) times, so time is O(log n) and space is O(1).',
  },
  {
    title: 'Quadratic pitfall in naive duplicates check',
    code: `function hasDuplicate(arr):
    for i in 0..arr.length-1:
        for j in i+1..arr.length-1:
            if arr[i] == arr[j]: return true
    return false`,
    explanation:
      'Two nested loops over n produce O(n^2) time. Using a hash set drops time to O(n) with O(n) extra space.',
  },
  {
    title: 'Amortized analysis of dynamic array push',
    code: `class DynamicArray:
    init():
        capacity = 1
        data = new array(capacity)
        size = 0

    push(x):
        if size == capacity:
            // allocate new array of 2 * capacity
            newData = new array(2 * capacity)
            copy(data, newData)
            data = newData
            capacity *= 2
        data[size] = x
        size += 1`,
    explanation:
      'Resizing is O(n) when it happens, but it happens rarely. Spreading that cost across many pushes yields O(1) amortized time per push.',
  },
]

const pitfalls = [
  'Assuming asymptotic dominance too early. For small n, an O(n^2) algorithm with tight loops can beat an O(n log n) one with heavy constants.',
  'Ignoring input characteristics. Quickselect average case is O(n) but worst case is O(n^2) without good pivots.',
  'Conflating memory and time. Reducing time with memoization increases space; that can be a regression on constrained devices.',
  'Overlooking hidden costs. Allocations, I/O, and cache misses can dwarf arithmetic operations.',
  'Treating average case as guaranteed. Systems with adversaries or untrusted input must respect worst case bounds.',
]

const decisionGuidance = [
  'If correctness under adversarial input is required: design for worst case O bound or add guards like timeouts and size limits.',
  'If typical workloads are well behaved: average case or amortized guarantees may suffice and yield simpler or faster code.',
  'If memory is scarce: prefer in-place algorithms even if they cost extra time, or use streaming approaches that process data in chunks.',
  'If latency SLOs are tight: favor predictable bounds and cache-friendly layouts over theoretically optimal but cache-poor algorithms.',
  'If inputs can explode: build size checks and backpressure rather than relying solely on asymptotics.',
]

const advancedInsights = [
  {
    title: 'Tight bounds beyond Big O',
    detail:
      'Big Theta gives matching upper and lower bounds, Big Omega gives lower bounds. Together they describe how tight the analysis is.',
  },
  {
    title: 'Probabilistic and average-case analysis',
    detail:
      'Randomized algorithms like randomized quicksort rely on expectation. Understanding distributions is key to trusting those averages.',
  },
  {
    title: 'Cache-aware and cache-oblivious models',
    detail:
      'The I/O model counts memory transfers instead of RAM operations. Algorithms like cache-oblivious matrix multiplication optimize block locality asymptotically.',
  },
  {
    title: 'Lower bounds and impossibility',
    detail:
      'Comparison sorting cannot beat O(n log n). Such bounds guide when to seek domain-specific shortcuts like radix sort or hashing.',
  },
]

const takeaways = [
  'Complexity analysis is about growth trends, not exact timings. It protects you as n scales.',
  'Worst case, average case, and amortized views answer different engineering questions.',
  'Space is a first-class resource. Trading memory for time or vice versa is deliberate design.',
  'Asymptotics must meet reality. Constants, cache, and input shape decide real performance.',
]

export default function ComplexityAnalysisPage(): JSX.Element {
  return (
    <TopicLayout
      title="Complexity Analysis (Big O)"
      subtitle="Measuring algorithmic growth to predict performance"
      intro="Big O notation is a vocabulary for how work and memory grow with input size. It does not predict wall-clock time, but it shows which designs will survive when data scales from thousands to billions. This page builds the intuition, the formalism, and the practical checks you need to use complexity as a design tool."
    >
      <TopicSection heading="The big picture">
        <p className="text-white/80">
          Complexity analysis is a safety net against unbounded growth. It separates hardware-dependent speed from the mathematical
          rate at which cost rises. Understanding it keeps systems predictable, secure against malicious inputs, and efficient when
          datasets grow faster than hardware budgets.
        </p>
      </TopicSection>

      <TopicSection heading="Historical context">
        <div className="grid gap-3 md:grid-cols-2">
          {historicalMilestones.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Core concept and mental models">
        <div className="grid gap-3 md:grid-cols-2">
          {mentalModels.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="How it works: common growth rates">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {growthRates.map((item) => (
            <article key={item.name} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.name}</p>
              <p className="text-sm text-white/80">{item.meaning}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="How it works: what Big O shows and hides">
        <div className="grid gap-3 md:grid-cols-3">
          {mechanics.map((block) => (
            <article key={block.heading} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{block.heading}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/80">
                {block.bullets.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Real-world implications">
        <div className="grid gap-3 md:grid-cols-2">
          {realWorldImplications.map((item) => (
            <article key={item.context} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.context}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Practical examples">
        <div className="space-y-4">
          {examples.map((example) => (
            <article key={example.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{example.title}</p>
              <pre className="mt-2 overflow-x-auto rounded bg-black/40 p-3 text-xs text-white/90">
                <code>{example.code}</code>
              </pre>
              <p className="text-sm text-white/80">{example.explanation}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Common pitfalls">
        <ul className="list-disc space-y-2 pl-5 text-sm text-white/80">
          {pitfalls.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </TopicSection>

      <TopicSection heading="When to use each lens">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/80">
          {decisionGuidance.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </TopicSection>

      <TopicSection heading="Advanced insights">
        <div className="grid gap-3 md:grid-cols-2">
          {advancedInsights.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Key takeaways">
        <div className="rounded-lg border border-emerald-400/40 bg-emerald-500/10 p-4">
          <ul className="list-disc space-y-2 pl-5 text-sm text-emerald-100">
            {takeaways.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </TopicSection>
    </TopicLayout>
  )
}
