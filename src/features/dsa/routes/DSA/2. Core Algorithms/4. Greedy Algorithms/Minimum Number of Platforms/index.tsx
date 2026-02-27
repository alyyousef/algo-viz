import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

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

const quickGlossary = [
  {
    term: 'Concurrency count',
    definition: 'Number of trains currently present at a time instant during the sweep.',
  },
  {
    term: 'Two-pointer sweep',
    definition: 'Linear scan over sorted arrivals and departures to update the platform counter.',
  },
  {
    term: 'Peak overlap',
    definition: 'Maximum concurrency value; exactly the minimum number of platforms required.',
  },
  {
    term: 'Endpoint convention',
    definition: 'Rule for handling arrival and departure at equal times, such as arrival <= departure.',
  },
  {
    term: 'Interval partitioning relation',
    definition: 'Minimum platforms is the same overlap-count objective as interval partitioning.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const platformHelpStyles = `
.platform-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.platform-window {
  width: 100%;
  min-height: 100dvh;
  margin: 0;
  display: flex;
  flex-direction: column;
  background: #c0c0c0;
  box-sizing: border-box;
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
}

.platform-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.platform-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
}

.platform-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.platform-control {
  width: 18px;
  height: 16px;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  line-height: 1;
  cursor: pointer;
}

.platform-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.platform-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.platform-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.platform-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.platform-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.platform-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.platform-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.platform-toc-list li {
  margin: 0 0 8px;
}

.platform-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.platform-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.platform-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.platform-section {
  margin: 0 0 20px;
}

.platform-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.platform-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.platform-content p,
.platform-content li {
  font-size: 12px;
  line-height: 1.5;
}

.platform-content p {
  margin: 0 0 10px;
}

.platform-content ul,
.platform-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.platform-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.platform-codebox {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 8px;
  margin: 6px 0 10px;
}

.platform-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .platform-main {
    grid-template-columns: 1fr;
  }

  .platform-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}
`

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

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
    { id: 'core-correctness', label: 'Why Greedy Works' },
    { id: 'core-complexity', label: 'Complexity Analysis' },
    { id: 'core-edge-cases', label: 'Edge Cases and Conventions' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-variants', label: 'Variants and Extensions' },
  ],
  examples: [{ id: 'ex-practical', label: 'Practical Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function MinimumNumberOfPlatformsPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    const tab = searchParams.get('tab')
    return isTabId(tab) ? tab : 'big-picture'
  })

  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Minimum Number of Platforms (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Minimum Number of Platforms',
      url: `${location.pathname}${location.search}${location.hash}`,
      kind: 'help',
    }
    const rawTasks = window.localStorage.getItem(MINIMIZED_HELP_TASKS_KEY)
    const parsedTasks = rawTasks ? (JSON.parse(rawTasks) as Array<{ id: string }>) : []
    const nextTasks = [...parsedTasks.filter((task) => task.id !== minimizedTask.id), minimizedTask]
    window.localStorage.setItem(MINIMIZED_HELP_TASKS_KEY, JSON.stringify(nextTasks))

    const historyState = window.history.state as { idx?: number } | null
    if (historyState?.idx && historyState.idx > 0) {
      void navigate(-1)
      return
    }
    void navigate('/algoViz')
  }

  return (
    <div className="platform-help-page">
      <style>{platformHelpStyles}</style>
      <div className="platform-window" role="presentation">
        <header className="platform-titlebar">
          <span className="platform-title">Minimum Number of Platforms</span>
          <div className="platform-controls">
            <button className="platform-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="platform-control" aria-label="Close">X</Link>
          </div>
        </header>

        <div className="platform-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`platform-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="platform-main">
          <aside className="platform-toc" aria-label="Table of contents">
            <h2 className="platform-toc-title">Contents</h2>
            <ul className="platform-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="platform-content">
            <h1 className="platform-doc-title">Minimum Number of Platforms</h1>
            <p>
              Count peak overlap to size platforms, gates, or cores. The minimum number of platforms problem asks how many platforms a
              station needs so no train waits. The greedy solution sorts arrivals and departures, then sweeps through time to measure
              the maximum concurrency. It is simple, fast, and directly generalizes to gates, servers, or any fixed time window
              resources.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="platform-section">
                  <h2 className="platform-heading">Overview</h2>
                  <p>
                    Each train occupies a platform from arrival to departure. The minimum number of platforms is the maximum number of
                    trains present at any instant. The algorithm focuses on counting concurrency, not building a full assignment.
                  </p>
                </section>
                <hr className="platform-divider" />
                <section id="bp-history" className="platform-section">
                  <h2 className="platform-heading">Historical Context</h2>
                  {historicalMilestones.map((item) => (
                    <div key={item.title}>
                      <h3 className="platform-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>
                <section id="bp-models" className="platform-section">
                  <h2 className="platform-heading">Core Concept and Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-applications" className="platform-section">
                  <h2 className="platform-heading">Real-World Applications</h2>
                  {realWorldUses.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-takeaways" className="platform-section">
                  <h2 className="platform-heading">Key Takeaways</h2>
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
                <section id="core-ideas" className="platform-section">
                  <h2 className="platform-heading">What the Algorithm Does</h2>
                  {coreIdeas.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-steps" className="platform-section">
                  <h2 className="platform-heading">Step-by-Step Process</h2>
                  <ol>
                    {algorithmSteps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </section>
                <section id="core-structures" className="platform-section">
                  <h2 className="platform-heading">Data Structures Used</h2>
                  {dataStructures.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-correctness" className="platform-section">
                  <h2 className="platform-heading">Why the Greedy Choice Works</h2>
                  {correctnessNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                  <p>
                    The sweep simulates the station in chronological order. Every arrival must have a platform, and the peak count is
                    both necessary and sufficient.
                  </p>
                </section>
                <section id="core-complexity" className="platform-section">
                  <h2 className="platform-heading">Complexity Analysis</h2>
                  {complexityNotes.map((note) => (
                    <p key={note.title}>
                      <strong>{note.title}:</strong> {note.detail}
                    </p>
                  ))}
                </section>
                <section id="core-edge-cases" className="platform-section">
                  <h2 className="platform-heading">Edge Cases and Conventions</h2>
                  {edgeCases.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-pitfalls" className="platform-section">
                  <h2 className="platform-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-variants" className="platform-section">
                  <h2 className="platform-heading">Variants and Extensions</h2>
                  {variants.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <section id="ex-practical" className="platform-section">
                <h2 className="platform-heading">Practical Examples</h2>
                {examples.map((example) => (
                  <div key={example.title}>
                    <h3 className="platform-subheading">{example.title}</h3>
                    <div className="platform-codebox">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </div>
                ))}
              </section>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="platform-section">
                <h2 className="platform-heading">Glossary</h2>
                {quickGlossary.map((item) => (
                  <p key={item.term}>
                    <strong>{item.term}:</strong> {item.definition}
                  </p>
                ))}
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
