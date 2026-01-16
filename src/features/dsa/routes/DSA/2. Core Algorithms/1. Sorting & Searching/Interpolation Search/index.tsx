import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'


const historicalMilestones = [
  {
    title: '1950s-1960s: Ordered file search',
    detail:
      'Interpolation search emerged from the idea that if data is uniformly distributed, you can guess where the key should be.',
  },
  {
    title: '1970s: Indexed storage systems',
    detail:
      'File systems and databases with dense numeric keys used interpolation-style probing to reduce disk seeks.',
  },
  {
    title: 'Modern use as a specialized tool',
    detail:
      'Today it is a niche optimization: very fast on uniform numeric data, risky on skewed distributions.',
  },
]

const mentalModels = [
  {
    title: 'Phone book guess',
    detail:
      'If you want "Khan" in a phone book, you open around the K section, not the middle. Interpolation search makes that guess numerically.',
  },
  {
    title: 'Ruler-based estimate',
    detail:
      'Given min and max values, estimate the position of the target by proportional distance.',
  },
  {
    title: 'Fast when evenly spaced',
    detail:
      'If values are roughly uniform, each probe lands near the target and shrinks the range aggressively.',
  },
]

const mechanics = [
  {
    heading: 'Position estimate',
    bullets: [
      'Assume values are roughly uniform across the array.',
      'Compute a probe index by linear interpolation between low and high.',
      'Clamp or guard when values are equal to avoid division by zero.',
    ],
  },
  {
    heading: 'Range narrowing',
    bullets: [
      'If a[pos] < target, move low to pos + 1.',
      'If a[pos] > target, move high to pos - 1.',
      'Repeat while target is within [a[low], a[high]].',
    ],
  },
  {
    heading: 'Termination',
    bullets: [
      'Stop when low exceeds high or the target falls outside the value range.',
      'Return the index if found, otherwise -1.',
    ],
  },
]

const problemPatterns = [
  {
    title: 'Range-to-index mapping',
    detail:
      'If values grow roughly linearly with index, you can map a target value to an estimated index using proportional distance.',
  },
  {
    title: 'Ordered numeric domains',
    detail:
      'Any problem where you can map the key to a numeric scale (timestamps, IDs, sorted scores) is a candidate.',
  },
  {
    title: 'Uniform sampling clues',
    detail:
      'When you know data is generated at a fixed rate (e.g., one reading per second), interpolation is a natural fit.',
  },
]

const reasoningSteps = [
  {
    title: 'Verify distribution',
    detail:
      'Ask: are values roughly evenly spaced? If not, assume interpolation is risky.',
  },
  {
    title: 'Check bounds',
    detail:
      'Ensure the target lies between a[low] and a[high] before computing a position estimate.',
  },
  {
    title: 'Guard degeneracy',
    detail:
      'If a[low] === a[high], you only have one possible value; avoid division by zero.',
  },
  {
    title: 'Measure progress',
    detail:
      'If the probe barely moves, switch to binary search to avoid worst-case drift.',
  },
]

const loopInvariants = [
  {
    title: 'Value range invariant',
    detail:
      'Before each probe, target is guaranteed to be within [a[low], a[high]]. If not, the search stops.',
  },
  {
    title: 'Sorted range invariant',
    detail:
      'The search window always remains a sorted subarray, so comparisons remain valid.',
  },
  {
    title: 'Progress invariant',
    detail:
      'Each probe either returns the target or shrinks the window by moving low or high.',
  },
]

const prerequisites = [
  'Array must be sorted in non-decreasing order.',
  'Values must be numeric or at least orderable with a meaningful distance.',
  'Best results require near-uniform distribution of values.',
]

const stepTrace = [
  {
    step: 'Start',
    state: 'a = [10, 20, 30, 40, 50, 60, 70, 80, 90], target = 70',
    note: 'low=0 (10), high=8 (90).',
  },
  {
    step: 'Estimate',
    state: 'pos = low + (target - a[low]) * (high - low) / (a[high] - a[low])',
    note: 'pos = 0 + (70-10) * 8 / (90-10) = 6.0 -> index 6.',
  },
  {
    step: 'Check',
    state: 'a[6] = 70',
    note: 'Match found in one probe.',
  },
]

const complexityNotes = [
  {
    title: 'Average (uniform data)',
    detail:
      'O(log log n) expected probes on uniformly distributed data, faster than binary search.',
  },
  {
    title: 'Worst case',
    detail:
      'O(n) when data is highly skewed or clustered; probes may barely move.',
  },
  {
    title: 'Space',
    detail: 'O(1) extra space.',
  },
]

const performanceProfile = [
  {
    title: 'When it shines',
    detail:
      'Dense, evenly spaced numeric keys (IDs, timestamps without gaps) where proportional guesses are accurate.',
  },
  {
    title: 'When it struggles',
    detail:
      'Skewed distributions (exponential, clustered values, many duplicates) can cause near-linear behavior.',
  },
  {
    title: 'Cost model',
    detail:
      'Requires extra arithmetic per step compared to binary search; savings come only if probes shrink faster.',
  },
]

const distributionChecks = [
  {
    title: 'Uniformity hint',
    detail:
      'Compute the average gap and check the variance. Low variance implies uniform spacing.',
  },
  {
    title: 'Skew warning',
    detail:
      'If a[high] - a[low] grows much faster than the index range, probes will be biased.',
  },
  {
    title: 'Duplicate density',
    detail:
      'Large blocks of identical values reduce the value range, making interpolation less informative.',
  },
]

const comparisonTable = [
  {
    algorithm: 'Interpolation search',
    time: 'O(log log n) avg',
    space: 'O(1)',
    stable: 'N/A',
    notes: 'Great on uniform numeric data; worst case O(n).',
  },
  {
    algorithm: 'Binary search',
    time: 'O(log n)',
    space: 'O(1)',
    stable: 'N/A',
    notes: 'Reliable on any sorted data; no distribution assumptions.',
  },
  {
    algorithm: 'Exponential search',
    time: 'O(log i)',
    space: 'O(1)',
    stable: 'N/A',
    notes: 'Best when size is unknown or target is near front.',
  },
  {
    algorithm: 'Jump search',
    time: 'O(sqrt(n))',
    space: 'O(1)',
    stable: 'N/A',
    notes: 'Fixed step size; simpler but slower than binary.',
  },
  {
    algorithm: 'Linear search',
    time: 'O(n)',
    space: 'O(1)',
    stable: 'N/A',
    notes: 'Works on unsorted data, but slow for large arrays.',
  },
]

const realWorldUses = [
  {
    context: 'Dense numeric IDs',
    detail:
      'User IDs, ticket numbers, or incremental keys with low sparsity can benefit from interpolation probes.',
  },
  {
    context: 'Time-series blocks',
    detail:
      'Uniformly sampled timestamps (e.g., every second) allow accurate proportional guesses.',
  },
  {
    context: 'Sorted telemetry ranges',
    detail:
      'If data is evenly distributed, interpolation search reduces the number of probes.',
  },
  {
    context: 'Hybrid strategies',
    detail:
      'Systems may start with interpolation and fall back to binary search when estimates look unstable.',
  },
]

const thinkingShortcuts = [
  'If keys are timestamps sampled at a fixed interval, interpolation is a natural first choice.',
  'If keys are user IDs with gaps, prefer binary search unless the gaps are small.',
  'If you only need the nearest value, use interpolation to jump near the region, then scan locally.',
  'If values are skewed (e.g., exponential), interpolation can be worse than binary search.',
]

const examples = [
  {
    title: 'Interpolation search (TypeScript-like pseudocode)',
    code: `function interpolationSearch(a: number[], target: number): number {
  let low = 0;
  let high = a.length - 1;

  while (low <= high && target >= a[low] && target <= a[high]) {
    if (a[high] === a[low]) {
      return a[low] === target ? low : -1;
    }
    const pos = low + Math.floor(
      ((target - a[low]) * (high - low)) / (a[high] - a[low])
    );

    if (a[pos] === target) return pos;
    if (a[pos] < target) low = pos + 1;
    else high = pos - 1;
  }
  return -1;
}`,
    explanation:
      'The interpolation formula estimates where the target should lie between low and high values.',
  },
  {
    title: 'Hybrid: interpolation then binary fallback',
    code: `function hybridSearch(a: number[], target: number): number {
  let low = 0;
  let high = a.length - 1;
  for (let steps = 0; steps < 4 && low <= high; steps += 1) {
    if (target < a[low] || target > a[high]) return -1;
    if (a[high] === a[low]) break;
    const pos = low + Math.floor(
      ((target - a[low]) * (high - low)) / (a[high] - a[low])
    );
    if (a[pos] === target) return pos;
    if (a[pos] < target) low = pos + 1;
    else high = pos - 1;
  }
  return binarySearch(a, target, low, high);
}`,
    explanation:
      'A few interpolation steps can quickly narrow the range, then binary search guarantees logarithmic worst-case.',
  },
]

const pitfalls = [
  'Using it on non-uniform data can degrade to near-linear scans.',
  'Division by zero when a[low] === a[high]; guard explicitly.',
  'Floating point rounding can produce pos outside [low, high] if not clamped.',
  'Not checking target bounds can cause invalid estimates or infinite loops.',
]

const decisionGuidance = [
  'Uniform or nearly uniform numeric data: interpolation search can beat binary search.',
  'Unknown size or unbounded data: choose exponential search instead.',
  'Skewed distributions or many duplicates: prefer binary search for stability.',
  'Non-numeric or unordered keys: interpolation search does not apply.',
]

const implementationTips = [
  {
    title: 'Clamp probe index',
    detail:
      'Make sure pos stays within [low, high] to avoid runaway indices from rounding.',
  },
  {
    title: 'Avoid floating error',
    detail:
      'Use integer arithmetic when possible to avoid precision drift on large values.',
  },
  {
    title: 'Add a fallback',
    detail:
      'After a few poor probes, switch to binary search to guarantee O(log n).',
  },
  {
    title: 'Return first match if needed',
    detail:
      'If duplicates exist, scan left or right to find the first or last occurrence.',
  },
]

const advancedInsights = [
  {
    title: 'Distribution assumptions matter',
    detail:
      'Interpolation search is fast because it assumes linear density. When that assumption fails, progress slows dramatically.',
  },
  {
    title: 'Cache and branch behavior',
    detail:
      'Like binary search, it jumps around the array, but fewer probes can still reduce cache misses overall.',
  },
  {
    title: 'Adaptive hybrids',
    detail:
      'Some systems monitor probe quality and switch to binary search if the estimated position does not shrink the interval enough.',
  },
  {
    title: 'Duplicate-heavy arrays',
    detail:
      'If many values are the same, interpolation provides little guidance; consider a range query or binary search on edges.',
  },
]

const takeaways = [
  'Interpolation search is a specialized optimization for uniform numeric data.',
  'Average-case can be faster than binary search, but worst-case can be linear.',
  'Guard against division by zero and invalid bounds.',
  'When in doubt, binary search is the safer default.',
]

export default function InterpolationSearchPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Interpolation Search</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Estimate the position, then refine the range</div>
              <p className="win95-text">
                Interpolation search assumes values are roughly uniform and uses that assumption to guess where the target should be.
                When the guess is good, it shrinks the range faster than binary search. When the distribution is skewed, performance
                can degrade sharply, so it is a specialized tool rather than a general default.
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
                Binary search splits the range in half every time. Interpolation search tries to jump directly near the target by
                assuming the values are evenly spaced. When that assumption holds, the search converges extremely fast.
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
            <div className="win95-grid win95-grid-3">
              {mentalModels.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works: step-by-step</legend>
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
            <legend>Prerequisites and assumptions</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {prerequisites.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Reasoning steps and invariants</legend>
            <div className="win95-grid win95-grid-2">
              {reasoningSteps.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
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
            <legend>Performance profile</legend>
            <div className="win95-grid win95-grid-3">
              {performanceProfile.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Distribution sanity checks</legend>
            <div className="win95-grid win95-grid-3">
              {distributionChecks.map((item) => (
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
            <legend>Thinking shortcuts</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {thinkingShortcuts.map((item) => (
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
