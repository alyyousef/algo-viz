import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: '1930s: Tournament method roots',
    detail:
      'Early sorting research used tournament trees to pick winners. Selection sort is the simplest "pick the winner, remove it, repeat" approach.',
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
  {
    title: 'Tournament bracket',
    detail:
      'Every pass plays a tournament among the remaining elements; the minimum wins and is placed into its final slot.',
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

const problemPatterns = [
  {
    title: 'Write-limited storage',
    detail:
      'When writes are costly or limited (flash, EEPROM), selection sort keeps writes low with one swap per pass.',
  },
  {
    title: 'Small fixed-size buffers',
    detail:
      'Sorting tiny arrays where the constant factors of more advanced algorithms do not pay off.',
  },
  {
    title: 'Deterministic behavior',
    detail:
      'No data-dependent early exits: cost is predictable and independent of input order.',
  },
  {
    title: 'Teaching invariants',
    detail:
      'Great for explaining loop invariants and the idea of growing a sorted prefix.',
  },
  {
    title: 'Not for large datasets',
    detail:
      'Quadratic comparisons make it unsuitable for large arrays or performance-sensitive paths.',
  },
]

const loopInvariants = [
  {
    title: 'Sorted prefix invariant',
    detail:
      'At the start of pass i, the subarray a[0..i-1] is sorted and contains the i smallest elements.',
  },
  {
    title: 'Minimum tracking invariant',
    detail:
      'During the inner scan, index min always points to the smallest element seen so far in a[i..j].',
  },
  {
    title: 'Permutation invariant',
    detail:
      'Selection sort only swaps elements, so the output is a permutation of the input.',
  },
]

const stepTrace = [
  {
    step: 'Start',
    state: '[7, 2, 5, 1, 4]',
    note: 'i = 0, scan the whole array to find the minimum.',
  },
  {
    step: 'Pass 1',
    state: 'min = 1 at index 3, swap -> [1, 2, 5, 7, 4]',
    note: 'The smallest element is now fixed at position 0.',
  },
  {
    step: 'Pass 2',
    state: 'scan [2, 5, 7, 4], min = 2 at index 1, no swap',
    note: 'Position 1 already holds the minimum of the suffix.',
  },
  {
    step: 'Pass 3',
    state: 'scan [5, 7, 4], min = 4 at index 4, swap -> [1, 2, 4, 7, 5]',
    note: 'Sorted prefix grows; only a small suffix remains.',
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

const inputSensitivity = [
  {
    title: 'Already sorted input',
    detail:
      'Still O(n^2) comparisons because the inner scan always runs. It only saves swaps.',
  },
  {
    title: 'Reverse sorted input',
    detail:
      'Same number of comparisons as any input. Swaps are still one per pass.',
  },
  {
    title: 'Many duplicates',
    detail:
      'Comparisons remain quadratic; naive swapping can reorder equal elements and break stability.',
  },
  {
    title: 'Random input',
    detail:
      'Behavior is essentially identical to sorted or reverse input because comparisons do not adapt.',
  },
]

const performanceProfile = [
  {
    title: 'Comparisons',
    detail:
      'About n(n-1)/2 comparisons every time, which dominates runtime.',
  },
  {
    title: 'Swaps',
    detail:
      'At most n-1 swaps. This is the main advantage over bubble or insertion sort.',
  },
  {
    title: 'Memory',
    detail:
      'In-place with O(1) extra memory and simple control flow.',
  },
  {
    title: 'Branch predictability',
    detail:
      'The inner loop is regular and predictable, but still heavy for large n.',
  },
]

const comparisonTable = [
  {
    algorithm: 'Selection sort',
    time: 'O(n^2)',
    space: 'O(1)',
    stable: 'No',
    notes: 'Minimal swaps, but heavy comparisons.',
  },
  {
    algorithm: 'Insertion sort',
    time: 'O(n^2)',
    space: 'O(1)',
    stable: 'Yes',
    notes: 'Adaptive on nearly sorted data; more writes.',
  },
  {
    algorithm: 'Bubble sort',
    time: 'O(n^2)',
    space: 'O(1)',
    stable: 'Yes',
    notes: 'Many swaps; simple but usually slower.',
  },
  {
    algorithm: 'Merge sort',
    time: 'O(n log n)',
    space: 'O(n)',
    stable: 'Yes',
    notes: 'Fast and stable but uses extra memory.',
  },
  {
    algorithm: 'Quick sort',
    time: 'O(n log n) avg',
    space: 'O(log n)',
    stable: 'No',
    notes: 'Faster for large arrays, but pivot-sensitive.',
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

const variantsAndTweaks = [
  {
    title: 'Bidirectional selection',
    detail:
      'Find min and max in one pass, then place them at the front and back to shrink faster.',
  },
  {
    title: 'Stable selection',
    detail:
      'Replace swaps with element shifts to preserve order. This increases writes and loses the main advantage.',
  },
  {
    title: 'Heap-based selection',
    detail:
      'Use a heap to repeatedly extract mins. This becomes heap sort and changes time complexity.',
  },
  {
    title: 'Index selection',
    detail:
      'Sort indices instead of data when data writes are expensive and indirection is acceptable.',
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
  {
    title: 'Stable selection (shift instead of swap)',
    code: `function stableSelectionSort(a: number[]): number[] {
  for (let i = 0; i < a.length - 1; i += 1) {
    let min = i;
    for (let j = i + 1; j < a.length; j += 1) {
      if (a[j] < a[min]) min = j;
    }
    const value = a[min];
    for (let j = min; j > i; j -= 1) {
      a[j] = a[j - 1];
    }
    a[i] = value;
  }
  return a;
}`,
    explanation:
      'Shifting preserves stability but increases writes; it is slower when writes are not expensive.',
  },
]

const pitfalls = [
  'No adaptivity: still O(n^2) comparisons on sorted input.',
  'Unstable due to swaps; equal elements can flip order.',
  'Bidirectional variant must adjust max index if it was swapped with the min.',
  'Using it on large datasets causes obvious performance collapse versus O(n log n) sorts.',
  'Stable variants shift many elements, which can be worse than insertion sort in practice.',
]

const implementationTips = [
  {
    title: 'Skip redundant swaps',
    detail:
      'Check min !== i before swapping to avoid useless writes when the minimum is already in place.',
  },
  {
    title: 'Track both min and max',
    detail:
      'The bidirectional variant cuts passes in half at the cost of a slightly more careful swap order.',
  },
  {
    title: 'Avoid for large n',
    detail:
      'Selection sort is quadratic with no best case. Use O(n log n) sorts for real workloads.',
  },
  {
    title: 'Document stability',
    detail:
      'Call out whether your implementation is stable; the default swap-based version is not.',
  },
]

const decisionGuidance = [
  'Writes are expensive and n is tiny: selection sort is acceptable.',
  'Need stability: prefer insertion or merge-based sorts; stable selection costs extra writes.',
  'Need speed on average data: quicksort, merge sort, or TimSort dominate.',
  'Want fewer passes: bidirectional selection reduces passes but not the quadratic comparisons.',
  'Need predictable cost with trivial control flow: selection sort is easy to reason about.',
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
      'Cycle sort extends the "place element directly" idea to achieve the theoretical minimum number of writes for a permutation.',
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
  {
    title: 'Swap minimization',
    detail:
      'Selection sort is optimal among sorts that swap only once per pass, but that constraint limits overall speed.',
  },
]

const takeaways = [
  'Selection sort is in-place and swap-light but fixed at O(n^2) comparisons with no best-case gain.',
  'It is unstable unless modified; stability costs extra writes and undercuts its main advantage.',
  'Use it when writes are expensive and n is small; otherwise prefer adaptive or O(n log n) algorithms.',
  'Bidirectional selection can cut passes but not the quadratic comparison count.',
  'References: Knuth Volume 3, standard CS texts, and flash-memory literature on write-sensitive algorithms.',
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
            <legend>How to think about similar problems</legend>
            <div className="win95-grid win95-grid-3">
              {problemPatterns.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Loop invariants (why it is correct)</legend>
            <div className="win95-grid win95-grid-3">
              {loopInvariants.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Worked trace on a tiny array</legend>
            <div className="win95-stack">
              {stepTrace.map((item) => (
                <div key={item.step} className="win95-panel">
                  <div className="win95-heading">{item.step}</div>
                  <pre className="win95-code">
                    <code>{item.state}</code>
                  </pre>
                  <p className="win95-text">{item.note}</p>
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
            <legend>Input sensitivity</legend>
            <div className="win95-grid win95-grid-2">
              {inputSensitivity.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Performance profile</legend>
            <div className="win95-grid win95-grid-2">
              {performanceProfile.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Compare and contrast</legend>
            <div className="win95-panel">
              <table className="win95-table">
                <thead>
                  <tr>
                    <th>Algorithm</th>
                    <th>Time</th>
                    <th>Space</th>
                    <th>Stable?</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonTable.map((row) => (
                    <tr key={row.algorithm}>
                      <td>{row.algorithm}</td>
                      <td>{row.time}</td>
                      <td>{row.space}</td>
                      <td>{row.stable}</td>
                      <td>{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
            <legend>Variants and performance tweaks</legend>
            <div className="win95-grid win95-grid-2">
              {variantsAndTweaks.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
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
            <legend>Implementation tips</legend>
            <div className="win95-grid win95-grid-2">
              {implementationTips.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
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
