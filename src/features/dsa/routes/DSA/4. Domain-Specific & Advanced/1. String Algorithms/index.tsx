import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

import type { JSX } from 'react'

const matchers = [
  {
    title: 'Prefix-function (KMP)',
    detail:
      'Precompute the longest proper prefix that is also a suffix for each position to skip redundant comparisons. Great for exact pattern search with O(n + m) time and O(m) space.',
  },
  {
    title: 'Z-algorithm',
    detail:
      'Builds a Z-array of prefix matches; handy for pattern search, palindrome tricks, and building runs in linear time with a simple sliding window over matches.',
  },
  {
    title: 'Rabin-Karp rolling hash',
    detail:
      'Hash windows and slide in O(n), comparing only on hash hits. Useful when you need multiple pattern matches or want a quick plagiarism/substring scan with low constant factors.',
  },
  {
    title: 'Boyer-Moore family',
    detail:
      'Bad-character and good-suffix heuristics let you jump over chunks of text. Shines on large alphabets and long patterns where skips pay off.',
  },
]

const indexes = [
  {
    title: 'Trie / prefix tree',
    detail:
      'Stores a dictionary of strings with prefix sharing. Good for autocomplete, prefix checks, and small alphabets; combine with weights for top-k suggestions.',
  },
  {
    title: 'Suffix array + LCP',
    detail:
      'Sorted suffixes with longest common prefix array answer substring checks, lexicographic queries, and pattern matches with binary search. Memory-light compared to trees.',
  },
  {
    title: 'Suffix automaton (SAM)',
    detail:
      'Deterministic automaton that represents all substrings in O(n) states. Supports fast substring existence, longest common substring, and frequency queries.',
  },
  {
    title: 'Rolling hashes / polynomial hashes',
    detail:
      'Fingerprints of prefixes let you compare any substring in O(1) after O(n) prep. Use double hashing or 128-bit mixing to keep collision risk negligible.',
  },
]

const checklists = [
  'Define your alphabet and normalization (case folding, Unicode code points, accents) before hashing or building automata.',
  'Guard against hash collisions in critical paths with a secondary check; keep modulus and base co-prime and sized for overflow safety.',
  'Treat streaming input separately: incremental rolling hashes or automata handle unbounded streams without reloading the whole buffer.',
  'Test degenerate cases: repeated characters ("aaaa"), empty strings, and very long patterns relative to the text.',
  'Document index build costs versus query costs so callers know when preprocessing pays for itself.',
]

const recipes = [
  {
    title: 'Single pattern search in a long text',
    steps: ['KMP or Z builds in O(n + m)', 'Choose Boyer-Moore if the alphabet is large and the pattern is long'],
  },
  {
    title: 'Many pattern queries over a fixed corpus',
    steps: ['Build a suffix array or SAM once', 'Answer queries with binary search (SA) or automaton traversal (SAM)'],
  },
  {
    title: 'Fast substring equality checks',
    steps: ['Precompute rolling hashes (and a second hash for safety)', 'Compare substrings in O(1); verify on collisions'],
  },
  {
    title: 'Autocomplete / prefix-heavy workloads',
    steps: ['Use a trie with per-node counts/weights', 'Cache top suggestions; compress with DAWGs if memory is tight'],
  },
]

export default function StringAlgorithmsPage(): JSX.Element {
  return (
    <TopicLayout
      title="String Algorithms"
      subtitle="Pattern matching, indexing, and text tooling"
      intro="String problems reward the right preprocessing. Linear-time pattern matchers, suffix structures, and careful hashing turn raw text into predictable search, compare, and autocomplete operations."
    >
      <TopicSection heading="Pattern matching staples">
        <div className="grid gap-3 md:grid-cols-2">
          {matchers.map((matcher) => (
            <article key={matcher.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold leading-tight text-white">{matcher.title}</h3>
              <p className="text-sm text-white/80">{matcher.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Indexing structures for heavy reuse">
        <div className="grid gap-3 md:grid-cols-2">
          {indexes.map((index) => (
            <article key={index.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{index.title}</p>
              <p className="text-sm text-white/80">{index.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Pitfalls and correctness checks">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/90">
          {checklists.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </TopicSection>

      <TopicSection heading="Pick the right tool by scenario">
        <div className="grid gap-3 md:grid-cols-2">
          {recipes.map((recipe) => (
            <article key={recipe.title} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{recipe.title}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/80">
                {recipe.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </TopicSection>
    </TopicLayout>
  )
}
