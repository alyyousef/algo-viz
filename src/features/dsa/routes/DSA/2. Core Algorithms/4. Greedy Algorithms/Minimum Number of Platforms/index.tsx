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
    title: 'Railway scheduling becomes formal (late 1800s)',
    detail:
      'Railways codified timetables and platform usage, pushing early operations research on resource conflicts.',
  },
  {
    title: 'Queueing theory and sweeps (1950s)',
    detail:
      'Analyzing arrivals and departures led to sweep line thinking: count concurrent events to estimate capacity.',
  },
  {
    title: 'Greedy intervals in textbooks (1990s)',
    detail:
      'The minimum platforms problem became a canonical greedy example alongside interval scheduling and partitioning.',
  },
  {
    title: 'Real-time systems adapt it (2000s)',
    detail:
      'Schedulers for processors and network ports adopted the same idea of tracking concurrent jobs.',
  },
]

const mentalModels = [
  {
    title: 'Two sorted lists',
    detail:
      'Think of arrivals and departures as two sorted streams. Walk them in order and track how many trains are on the station.',
  },
  {
    title: 'Busy counter',
    detail:
      'Each arrival increments the busy count; each departure decrements it. The maximum value is the minimum platforms needed.',
  },
  {
    title: 'Same as overlap',
    detail:
      'Platforms needed equals the maximum overlap of intervals. This is a counting version of interval partitioning.',
  },
]

const coreIdeas = [
  {
    title: 'Problem statement',
    detail:
      'Given arrival and departure times for trains, find the minimum number of platforms so that no train waits.',
  },
  {
    title: 'Key insight',
    detail:
      'Only the order of arrivals and departures matters, not which train is which. We count how many are in the station at once.',
  },
  {
    title: 'Greedy approach',
    detail:
      'Sort arrivals and departures separately, then sweep with two pointers to update a running platform count.',
  },
  {
    title: 'Optimality',
    detail:
      'The maximum concurrent count is a lower bound on platforms. The sweep achieves that bound exactly.',
  },
]

const algorithmSteps = [
  'Split times into two arrays: arrivals and departures.',
  'Sort both arrays in nondecreasing order.',
  'Use two indices i, j and a counter for platforms in use.',
  'If arrival <= departure, a train arrives and needs a platform; increment counter and i.',
  'Otherwise, a train departs; decrement counter and j.',
  'Track the maximum counter value during the sweep.',
]

const dataStructures = [
  {
    title: 'Sorted arrival array',
    detail:
      'Gives the next train to arrive in chronological order, regardless of which train it is.',
  },
  {
    title: 'Sorted departure array',
    detail:
      'Gives the next train to leave, allowing us to free platforms as soon as possible.',
  },
  {
    title: 'Two-pointer sweep',
    detail:
      'Linear scan through the two sorted lists. This avoids the overhead of a heap while staying optimal.',
  },
  {
    title: 'Min-heap variant',
    detail:
      'If arrivals are sorted, a min-heap of departure times yields the same answer and can store platform IDs.',
  },
]

const correctnessNotes = [
  {
    title: 'Invariant',
    detail:
      'At any point in the sweep, the counter equals the number of trains currently occupying platforms.',
  },
  {
    title: 'Greedy choice property',
    detail:
      'Processing the earliest event next (arrival or departure) ensures we never miss an opportunity to free a platform.',
  },
  {
    title: 'Lower bound',
    detail:
      'If k trains overlap at time t, at least k platforms are required. The sweep count reaches k at t.',
  },
  {
    title: 'Upper bound',
    detail:
      'The algorithm never uses more than the running count, so the maximum count is sufficient and minimal.',
  },
]

const complexityNotes = [
  {
    title: 'Time complexity',
    detail:
      'Sorting dominates at O(n log n). The two-pointer sweep is O(n).',
  },
  {
    title: 'Space complexity',
    detail:
      'O(n) for the arrival and departure arrays. The sweep itself uses O(1) extra space.',
  },
  {
    title: 'Input constraints',
    detail:
      'Times may be given as integers or timestamps. Sorting handles arbitrary ranges as long as ordering is defined.',
  },
  {
    title: 'Alternative complexity',
    detail:
      'Using a heap still yields O(n log n) but gives assignments if you track platform IDs.',
  },
]

const edgeCases = [
  {
    title: 'Equal arrival and departure',
    detail:
      'Define whether arrival at time t conflicts with departure at t. Common convention: arrival <= departure requires a new platform.',
  },
  {
    title: 'Multiple trains at same time',
    detail:
      'If many trains arrive together, the counter jumps. Sorting preserves their relative order but does not change the max.',
  },
  {
    title: 'Single train',
    detail:
      'With one train, the answer is 1 regardless of times.',
  },
  {
    title: 'Already sorted data',
    detail:
      'You can skip sorting if inputs are guaranteed sorted, but most problems do not promise it.',
  },
]

const realWorldUses = [
  {
    context: 'Railway platforms',
    detail:
      'Estimate the minimum number of platforms needed to avoid delays given a timetable.',
  },
  {
    context: 'Airport gates',
    detail:
      'Assign aircraft gate windows to avoid overlaps and minimize gate count.',
  },
  {
    context: 'CPU cores',
    detail:
      'Determine how many cores are required to run fixed-interval jobs without preemption.',
  },
  {
    context: 'Call center staffing',
    detail:
      'Measure concurrent call intervals to estimate minimum agents needed to avoid waits.',
  },
  {
    context: 'Network ports',
    detail:
      'Plan concurrent bandwidth reservations or time windows for shared links.',
  },
]

const examples = [
  {
    title: 'Classic timetable',
    code: `Arrivals:  [900, 940, 950, 1100, 1500, 1800]
Departures:[910, 1200, 1120, 1130, 1900, 2000]

Sorted arrivals:   900 940 950 1100 1500 1800
Sorted departures: 910 1120 1130 1200 1900 2000

Sweep:
900 arr -> count 1 (max 1)
910 dep -> count 0
940 arr -> count 1
950 arr -> count 2 (max 2)
1100 arr -> count 3 (max 3)
1120 dep -> count 2
1130 dep -> count 1
1200 dep -> count 0
...`,
    explanation:
      'The maximum concurrent trains is 3, so 3 platforms suffice.',
  },
  {
    title: 'Two-pointer pseudocode',
    code: `function minPlatforms(arrivals, departures):
    sort(arrivals)
    sort(departures)
    i = 0
    j = 0
    platforms = 0
    maxPlatforms = 0

    while i < n and j < n:
        if arrivals[i] <= departures[j]:
            platforms += 1
            i += 1
            maxPlatforms = max(maxPlatforms, platforms)
        else:
            platforms -= 1
            j += 1

    return maxPlatforms`,
    explanation:
      'The sweep processes the earliest event next and tracks the maximum number of trains present.',
  },
  {
    title: 'Heap variant for assignments',
    code: `Sort trains by arrival.
Heap holds (departureTime, platformId).

For each train:
  if heap.min.departure <= arrival:
     reuse platform
  else:
     create new platform
  push updated departure`,
    explanation:
      'The heap variant returns platform IDs and a full schedule, not just the count.',
  },
]

const pitfalls = [
  'Mixing the endpoint rule. Decide if arrival at time t conflicts with departure at t and apply consistently.',
  'Sorting pairs incorrectly. For the two-pointer method, sort arrivals and departures independently.',
  'Confusing with interval scheduling. This problem counts resources, not selected intervals.',
  'Forgetting to update the maximum. The answer is the peak count, not the final count.',
  'Using floating time comparisons without tolerance when times are real numbers.',
]

const variants = [
  {
    title: 'Closed vs half-open intervals',
    detail:
      'Using [start, end) lets an arrival at t reuse a platform whose train departs at t. Closed intervals [start, end] do not.',
  },
  {
    title: 'Platform constraints',
    detail:
      'If platforms have attributes or capacity, the problem becomes a constrained assignment or bipartite matching.',
  },
  {
    title: 'Streaming arrivals',
    detail:
      'In real-time systems you can process events as they occur, maintaining a running count without full sorting.',
  },
  {
    title: 'Multiple station segments',
    detail:
      'If trains need several resources in sequence (platform then yard), the problem generalizes to multi-stage scheduling.',
  },
]

const takeaways = [
  'Minimum platforms equals the maximum number of concurrent trains.',
  'Sorting arrivals and departures and sweeping with two pointers yields an optimal greedy solution.',
  'The approach is a counting form of interval partitioning and shares the same overlap logic.',
  'Endpoint conventions matter and should be stated explicitly.',
]

export default function MinimumNumberOfPlatformsPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Minimum Number of Platforms</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Count peak overlap to size platforms, gates, or cores</div>
              <p className="win95-text">
                The minimum number of platforms problem asks how many platforms a station needs so no train waits. The greedy solution
                sorts arrivals and departures, then sweeps through time to measure the maximum concurrency. It is simple, fast, and
                directly generalizes to gates, servers, or any fixed time window resources.
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
                Each train occupies a platform from arrival to departure. The minimum number of platforms is the maximum number of
                trains present at any instant. The algorithm focuses on counting concurrency, not building a full assignment.
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
            <legend>Why the greedy choice works</legend>
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
                The sweep simulates the station in chronological order. Every arrival must have a platform, and the peak count is
                both necessary and sufficient.
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
