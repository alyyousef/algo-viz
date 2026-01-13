import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: '1930s: Tournament method roots',
    detail:
      'Early sorting research used tournament trees to pick winners. Selection sort is the simplest â€œpick the winner, remove it, repeatâ€ approach.',
  },
  {
    title: '1960s: Textbook staple',
    detail:
      'Selection sort became a CS101 anchor for teaching invariants and contrasting low swap counts with quadratic comparisons.',
  },
  {
    title: 'Flash and EEPROM awareness',
    detail:
      'With flash memory, the one-swap-per-pass property was highlighted for wear-sensitive cases where writes are expensive.',
  },
]

const mentalModels = [
  {
    title: 'Scout and swap',
    detail:
      'Send a scout through the unsorted region to find the minimum, then perform a single swap to place it at the boundary.',
  },
  {
    title: 'Growing a sorted front line',
    detail:
      'The left prefix stays sorted; each pass annexes the smallest remaining element to that front line.',
  },
  {
    title: 'Write-sparing',
    detail:
      'Exactly one swap per pass minimizes writes, trading extra comparisons for write efficiency.',
  },
]

const mechanics = [
  {
    heading: 'Core loop',
    bullets: [
      'For i from 0 to n - 2: set min = i.',
      'Scan j from i + 1 to n - 1; if a[j] < a[min], update min.',
      'Swap a[i] with a[min] once the pass ends.',
    ],
  },
  {
    heading: 'Bidirectional selection',
    bullets: [
      'Find both min and max in the same pass and swap them to the front and back, shrinking both boundaries.',
      'Cuts passes roughly in half but still performs O(n^2) comparisons.',
    ],
  },
  {
    heading: 'Stability considerations',
    bullets: [
      'Naive swaps make it unstable; equal items can cross.',
      'Stable variants shift elements instead of swapping, increasing writes and losing the main advantage.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Time',
    detail:
      'Always O(n^2) comparisons; no best-case improvement. Swaps are O(n) overall (one per pass).',
  },
  {
    title: 'Space and stability',
    detail:
      'In-place with O(1) extra space. Unstable unless you accept more writes to preserve order.',
  },
  {
    title: 'Write profile',
    detail:
      'Minimal writes make it appealing on wear-limited storage or when writes are slower than comparisons.',
  },
]

const realWorldUses = [
  {
    context: 'Write-constrained environments',
    detail:
      'Embedded systems on flash/EEPROM where preserving write cycles matters more than extra comparisons.',
  },
  {
    context: 'Tiny datasets with cheap comparisons',
    detail:
      'Small buffers where simplicity and low swaps outweigh quadratic comparisons (for example, a handful of telemetry fields).',
  },
  {
    context: 'Pedagogical contrast',
    detail:
      'Used in classrooms to highlight invariants, swap minimization, and why O(n^2) comparisons dominate time.',
  },
]

const examples = [
  {
    title: 'Selection sort (TypeScript-like pseudocode)',
    code: `function selectionSort(a: number[]): number[] {
  for (let i = 0; i < a.length - 1; i += 1) {
    let min = i;
    for (let j = i + 1; j < a.length; j += 1) {
      if (a[j] < a[min]) min = j;
    }
    if (min !== i) {
      const tmp = a[i];
      a[i] = a[min];
      a[min] = tmp;
    }
  }
  return a;
}`,
    explanation:
      'One pass, one swap. Swaps are bounded by n - 1, which is why selection sort is swap-light compared to other quadratic sorts.',
  },
  {
    title: 'Bidirectional selection',
    code: `function bidirectionalSelectionSort(a: number[]): number[] {
  let start = 0;
  let end = a.length - 1;
  while (start < end) {
    let min = start, max = start;
    for (let i = start; i <= end; i += 1) {
      if (a[i] < a[min]) min = i;
      if (a[i] > a[max]) max = i;
    }
    [a[start], a[min]] = [a[min], a[start]];
    if (max === start) max = min;
    [a[end], a[max]] = [a[max], a[end]];
    start += 1;
    end -= 1;
  }
  return a;
}`,
    explanation:
      'Shrinks from both ends, halving passes. Comparisons remain quadratic; writes stay low (two swaps per pass).',
  },
]

const pitfalls = [
  'No adaptivity: still O(n^2) comparisons on sorted input.',
  'Unstable due to swaps; equal elements can flip order.',
  'Bidirectional variant must adjust max index if it was swapped with the min.',
  'Using it on large datasets causes obvious performance collapse versus O(n log n) sorts.',
]

const decisionGuidance = [
  'Writes are expensive and n is tiny: selection sort is acceptable.',
  'Need stability: prefer insertion or merge-based sorts; stable selection costs extra writes.',
  'Need speed on average data: quicksort, merge sort, or TimSort dominate.',
  'Want fewer passes: bidirectional selection reduces passes but not the quadratic comparisons.',
]

const advancedInsights = [
  {
    title: 'Comparison vs. write trade-off',
    detail:
      'Selection sort minimizes writes at the cost of comparisons. If write cost dominates, it can beat bubble or insertion despite the same asymptotic class.',
  },
  {
    title: 'Cycle sort connection',
    detail:
      'Cycle sort extends the â€œplace element directlyâ€ idea to achieve the theoretical minimum number of writes for a permutation.',
  },
  {
    title: 'Cache behavior',
    detail:
      'Linear scans are cache-friendly, but the lack of early exit means every suffix is scanned fully even if mostly sorted.',
  },
  {
    title: 'Adversarial robustness',
    detail:
      'Cost is fixed at Theta(n^2) regardless of input pattern; there is no pivot sensitivity as in quicksort.',
  },
]

const takeaways = [
  'Selection sort is in-place and swap-light but fixed at O(n^2) comparisons with no best-case gain.',
  'It is unstable unless modified; stability costs extra writes and undercuts its main advantage.',
  'Use it when writes are expensive and n is small; otherwise prefer adaptive or O(n log n) algorithms.',
  'Bidirectional selection can cut passes but not the quadratic comparison count.',
]

export default function SelectionSortPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Selection Sort</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">One swap per pass, a lesson in write-sparing sorting</div>
              <p className="win95-text">
                Selection sort walks the unsorted region to find an extreme element, then performs a single swap to grow the sorted prefix.
                It is in-place, swap-light, and predictably Theta(n^2), making it interesting for write-sensitive cases but unfit for large
                inputs.
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
                Each pass locks one element into its final position at the boundary of sorted and unsorted regions. Comparisons dominate
                runtime, while swaps are capped at one per pass, which is why selection sort can win in write-constrained environments
                despite its quadratic comparisons.
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
            <legend>How it works</legend>
            <div className="win95-grid win95-grid-3">
              {mechanics.map((block) => (
                <div key={block.heading} className="win95-panel">
                  <div className="win95-heading">{block.heading}</div>
                  <ul className="win95-list">
                    {block.bullets.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
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
            <legend>When to use it</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                {decisionGuidance.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Advanced insights</legend>
            <div className="win95-grid win95-grid-2">
              {advancedInsights.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Key takeaways</legend>
            <div className="win95-panel win95-panel--raised">
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

