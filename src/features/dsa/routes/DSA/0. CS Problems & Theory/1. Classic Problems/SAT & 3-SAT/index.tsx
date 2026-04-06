
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

type Clause = {
  id: string
  literals: string[]
}

type Assignment = Record<string, boolean>
type MinimizedHelpTask = {
  path: string
  search: string
  title: string
}

const bigPicture = [
  {
    title: 'What it is',
    details:
      'SAT asks if there exists an assignment of boolean variables that makes a propositional formula true.',
    notes:
      '3-SAT is the special case where each clause has exactly three literals.',
  },
  {
    title: 'Why it matters',
    details:
      'SAT is the first known NP-complete problem and a cornerstone of complexity theory.',
    notes:
      '3-SAT remains NP-complete and is used as the canonical source for reductions.',
  },
  {
    title: 'What it teaches',
    details:
      'The difference between decision and search, and how reductions show NP-completeness.',
    notes:
      'It also shows how structure (like clause size) changes algorithms without changing hardness.',
  },
]

const historicalContext = [
  {
    title: '1971: Cook-Levin theorem',
    details:
      'Stephen Cook and Leonid Levin proved that SAT is NP-complete, the first such result.',
    notes:
      'This established the framework for NP-completeness via polynomial-time reductions.',
  },
  {
    title: '3-SAT standardization',
    details:
      '3-SAT became the standard NP-complete problem used in reductions across theory and practice.',
    notes:
      'Any SAT instance can be transformed into 3-CNF with polynomial blow-up.',
  },
  {
    title: 'Modern SAT solvers',
    details:
      'SAT solvers now handle millions of variables using DPLL/CDCL, watched literals, and clause learning.',
    notes:
      'Practical success does not change the worst-case NP-completeness result.',
  },
]

const quickGlossary = [
  {
    term: 'Literal',
    definition: 'A variable (x) or its negation (~x).',
  },
  {
    term: 'Clause',
    definition: 'A disjunction (OR) of literals, e.g., (x ? ~y ? z).',
  },
  {
    term: 'CNF',
    definition: 'Conjunctive Normal Form: an AND of clauses.',
  },
  {
    term: 'k-CNF',
    definition: 'CNF where each clause has at most k literals.',
  },
  {
    term: '3-SAT',
    definition: 'SAT where each clause has exactly three literals.',
  },
  {
    term: 'Satisfying assignment',
    definition: 'A variable assignment that makes every clause true.',
  },
]

const problemSetup = [
  {
    title: 'Input',
    detail: 'A boolean formula in CNF with variables x1..xn.',
  },
  {
    title: 'Question',
    detail: 'Is there a truth assignment that satisfies all clauses?',
  },
  {
    title: 'Decision vs search',
    detail: 'Decision asks if a solution exists; search asks to find one.',
  },
  {
    title: '3-SAT restriction',
    detail: 'Each clause must contain exactly three literals (padding with duplicates if needed).',
  },
]

const keyClaims = [
  {
    title: 'SAT is NP-complete',
    detail: 'Every problem in NP reduces to SAT in polynomial time.',
  },
  {
    title: '3-SAT is NP-complete',
    detail: 'SAT reduces to 3-SAT with polynomial blow-up.',
  },
  {
    title: '2-SAT is different',
    detail: '2-SAT is solvable in polynomial time via implication graphs and SCCs.',
  },
  {
    title: 'Structure matters for solvers',
    detail: 'Clause length and variable frequency dramatically affect practical performance.',
  },
]

const reductionSketch = [
  {
    title: 'Step 1: Convert to CNF',
    detail: 'Use standard transformations (e.g., Tseitin) to avoid exponential blow-up.',
  },
  {
    title: 'Step 2: Ensure 3 literals per clause',
    detail: 'Split long clauses into chains with new variables; pad short clauses with duplicates.',
  },
  {
    title: 'Step 3: Preserve satisfiability',
    detail: 'The transformation is equisatisfiable: new formula is satisfiable iff original is.',
  },
]

const algorithmLandscape = [
  {
    title: 'DPLL',
    detail: 'Backtracking with unit propagation and pure literal elimination.',
  },
  {
    title: 'CDCL',
    detail: 'Conflict-driven clause learning; backbone of modern SAT solvers.',
  },
  {
    title: 'Local search (WalkSAT)',
    detail: 'Heuristic flips in large instances; incomplete but fast in practice.',
  },
  {
    title: '2-SAT algorithms',
    detail: 'Linear-time SCC on implication graphs; shows k=2 is easier.',
  },
]

const proofIdeas = [
  {
    title: 'NP membership',
    detail: 'A candidate assignment can be verified in polynomial time by checking all clauses.',
  },
  {
    title: 'Cook-Levin theorem',
    detail: 'Encodes computation histories as SAT to show NP ? SAT.',
  },
  {
    title: 'SAT to 3-SAT',
    detail: 'Replace long clauses with chains of 3-clauses using new variables.',
  },
  {
    title: '2-SAT contrast',
    detail: 'Implication graph structure makes 2-SAT solvable efficiently.',
  },
]

const workedExamples = [
  {
    title: 'Simple satisfiable formula',
    code: `F = (x ? y) ? (~x ? z)
Assignment: x = true, y = false, z = true`,
    explanation:
      'Both clauses are true under this assignment, so F is satisfiable.',
  },
  {
    title: 'Unsatisfiable example',
    code: `F = (x) ? (~x)
No assignment can satisfy both clauses.`,
    explanation:
      'A variable and its negation cannot both be true.',
  },
  {
    title: '3-SAT padding',
    code: `Clause: (x ? y)
Pad: (x ? y ? y)
Still equivalent for satisfiability.`,
    explanation:
      'Duplicating literals creates 3-clauses without changing satisfiability.',
  },
]

const pseudocode = [
  {
    title: 'DPLL (simplified)',
    code: `function DPLL(formula):
  if formula has empty clause: return false
  if formula has no clauses: return true
  if unit clause exists:
    assign its literal
    simplify
    return DPLL(formula)
  if pure literal exists:
    assign it true
    simplify
    return DPLL(formula)
  choose variable v
  return DPLL(formula with v=true) OR DPLL(formula with v=false)`,
    explanation:
      'DPLL is the classic backtracking solver with pruning rules.',
  },
  {
    title: 'SAT to 3-SAT conversion (long clause)',
    code: `Clause: (a ? b ? c ? d ? e)
Introduce y1, y2:
(a ? b ? y1) ? (~y1 ? c ? y2) ? (~y2 ? d ? e)`,
    explanation:
      'The chain preserves satisfiability while making every clause size 3.',
  },
]

const pitfalls = [
  {
    mistake: 'Assuming 3-SAT is easier than SAT',
    description: '3-SAT is still NP-complete; it is a restriction but not a simplification in complexity.',
  },
  {
    mistake: 'Confusing 2-SAT with 3-SAT',
    description: '2-SAT is in P, while 3-SAT is NP-complete.',
  },
  {
    mistake: 'Dropping equisatisfiability',
    description: 'Transformations must preserve satisfiability, not necessarily logical equivalence.',
  },
  {
    mistake: 'Ignoring clause learning',
    description: 'Modern solvers rely heavily on learning; plain DPLL is often too slow.',
  },
]

const applications = [
  {
    title: 'Hardware verification',
    detail: 'SAT solvers check if circuits meet specifications or contain bugs.',
  },
  {
    title: 'Planning and scheduling',
    detail: 'SAT encodings can express resource constraints and time steps.',
  },
  {
    title: 'Configuration and feature models',
    detail: 'SAT solves consistency of feature selections and dependencies.',
  },
  {
    title: 'Security analysis',
    detail: 'Used for finding counterexamples in protocol verification and exploit synthesis.',
  },
]

const keyTakeaways = [
  'SAT is NP-complete; 3-SAT remains NP-complete despite its restriction.',
  '2-SAT is polynomial-time solvable, highlighting the k=2 vs k=3 boundary.',
  'Reductions and transformations preserve satisfiability, not necessarily equivalence.',
  'Modern SAT solvers are powerful but do not change worst-case complexity.',
  'SAT modeling is a practical tool across verification, planning, and optimization.',
]

const clauseExamples: Clause[] = [
  {
    id: 'c1',
    literals: ['x', 'y', '~z'],
  },
  {
    id: 'c2',
    literals: ['~x', 'z', 'w'],
  },
  {
    id: 'c3',
    literals: ['y', '~w', '~z'],
  },
]

const variableSet = ['x', 'y', 'z', 'w']

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const satHelpStyles = `
.sat-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.sat-help-window {
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background: #c0c0c0;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
}

.sat-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.sat-help-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.sat-help-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.sat-help-control {
  width: 18px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  text-decoration: none;
  font-size: 11px;
  line-height: 1;
  padding: 0;
}

.sat-help-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
  overflow-x: auto;
}

.sat-help-tab {
  flex: 0 0 auto;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.sat-help-tab.active {
  position: relative;
  top: 1px;
  background: #fff;
}

.sat-help-main {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  flex: 1;
  min-height: 0;
  border-top: 1px solid #404040;
  background: #fff;
}

.sat-help-toc {
  overflow: auto;
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
}

.sat-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.sat-help-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.sat-help-toc-list li {
  margin: 0 0 8px;
}

.sat-help-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.sat-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.sat-help-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.sat-help-section {
  margin: 0 0 22px;
}

.sat-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.sat-help-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.sat-help-content p,
.sat-help-content li,
.sat-help-content button {
  font-size: 12px;
  line-height: 1.5;
}

.sat-help-content p {
  margin: 0 0 10px;
}

.sat-help-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.sat-help-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.sat-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.sat-help-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

.sat-help-inline-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 0 0 10px;
}

.sat-help-push {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  padding: 4px 8px;
  cursor: pointer;
}

.sat-help-push.active {
  border-top: 1px solid #404040;
  border-left: 1px solid #404040;
  border-right: 1px solid #fff;
  border-bottom: 1px solid #fff;
  background: #b3b3b3;
}

@media (max-width: 900px) {
  .sat-help-title {
    position: static;
    transform: none;
    margin: 0 auto 0 0;
    font-size: 13px;
  }

  .sat-help-main {
    grid-template-columns: 1fr;
  }

  .sat-help-toc {
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
    { id: 'bp-claims', label: 'Key Claims' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-setup', label: 'Problem Setup' },
    { id: 'core-reduction', label: 'Reduction Sketch' },
    { id: 'core-algorithms', label: 'Algorithm Landscape' },
    { id: 'core-proofs', label: 'Proof Ideas' },
    { id: 'core-applications', label: 'Applications' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
  ],
  examples: [
    { id: 'ex-worked', label: 'Worked Examples' },
    { id: 'ex-pseudocode', label: 'Pseudocode Reference' },
    { id: 'ex-assignment', label: 'Toggle Assignment' },
    { id: 'ex-clause', label: 'Clause Inspector' },
    { id: 'ex-3sat', label: '3-SAT View' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function SatAndThreeSatPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [assignment, setAssignment] = useState<Assignment>({
    x: false,
    y: false,
    z: false,
    w: false,
  })
  const [selectedClauseId, setSelectedClauseId] = useState(clauseExamples[0]?.id ?? 'c1')
  const requestedTab = searchParams.get('tab')
  const activeTab: TabId = isTabId(requestedTab) ? requestedTab : 'big-picture'
  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'
  const tocSections = sectionLinks[activeTab]
  const selectedClause = clauseExamples.find((clause) => clause.id === selectedClauseId) ?? clauseExamples[0]
  const clauseValue = selectedClause
    ? selectedClause.literals.some((literal) => {
        const isNegated = literal.startsWith('~')
        const variable = isNegated ? literal.slice(1) : literal
        const value = assignment[variable]
        return isNegated ? !value : value
      })
    : false
  const formulaValue = clauseExamples.every((clause) =>
    clause.literals.some((literal) => {
      const isNegated = literal.startsWith('~')
      const variable = isNegated ? literal.slice(1) : literal
      const value = assignment[variable]
      return isNegated ? !value : value
    }),
  )
  const assignmentSummary = variableSet.map((variable) => `${variable}=${assignment[variable] ? 'T' : 'F'}`).join(', ')
  const formulaText = clauseExamples.map((clause) => `(${clause.literals.join(' ? ')})`).join(' ? ')

  const toggleVariable = (variable: string) => {
    setAssignment((prev) => ({
      ...prev,
      [variable]: !prev[variable],
    }))
  }

  const handleTabChange = (tab: TabId) => {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('tab', tab)
    setSearchParams(nextParams, { replace: true })
  }

  const handleMinimize = () => {
    try {
      const nextParams = new URLSearchParams(searchParams)
      nextParams.set('tab', activeTab)
      const currentTask = {
        path: location.pathname,
        search: `?${nextParams.toString()}`,
        title: 'SAT & 3-SAT',
      }
      const rawTasks = window.localStorage.getItem(MINIMIZED_HELP_TASKS_KEY)
      const parsedTasks: unknown = rawTasks ? JSON.parse(rawTasks) : []
      const existingTasks = Array.isArray(parsedTasks)
        ? parsedTasks.filter((task): task is MinimizedHelpTask => {
            if (!task || typeof task !== 'object') {
              return false
            }

            const candidate = task as Record<string, unknown>
            return (
              typeof candidate.path === 'string' &&
              typeof candidate.search === 'string' &&
              typeof candidate.title === 'string'
            )
          })
        : []
      const nextTasks = existingTasks.filter(
        (task) =>
          (task.path !== currentTask.path || task.title !== currentTask.title),
      )
      nextTasks.push(currentTask)
      window.localStorage.setItem(MINIMIZED_HELP_TASKS_KEY, JSON.stringify(nextTasks))
    } catch {
      // Ignore storage failures and continue with navigation.
    }

    const historyState = window.history.state as { idx?: number } | null
    const historyIndex = typeof historyState?.idx === 'number' ? historyState.idx : -1

    if (historyIndex > 0) {
      void navigate(-1)
      return
    }

    void navigate('/algoViz')
  }

  useEffect(() => {
    if (!isTabId(searchParams.get('tab'))) {
      const nextParams = new URLSearchParams(searchParams)
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
      return
    }

    document.title = `SAT & 3-SAT - Help - ${activeTabLabel}`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  return (
    <div className="sat-help-page">
      <style>{satHelpStyles}</style>
      <div className="sat-help-window" role="presentation">
        <header className="sat-help-titlebar">
          <span className="sat-help-title">SAT & 3-SAT</span>
          <div className="sat-help-controls">
            <button type="button" className="sat-help-control" onClick={handleMinimize} aria-label="Minimize help window">
              _
            </button>
            <Link to="/algoViz" className="sat-help-control" aria-label="Close help window">
              X
            </Link>
          </div>
        </header>
        <nav className="sat-help-tabs" aria-label="Help sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`sat-help-tab${tab.id === activeTab ? ' active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
              aria-pressed={tab.id === activeTab}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="sat-help-main">
          <aside className="sat-help-toc" aria-label="Table of contents">
            <p className="sat-help-toc-title">Contents</p>
            <ul className="sat-help-toc-list">
              {tocSections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>
          <main className="sat-help-content">
            <h1 className="sat-help-doc-title">{activeTabLabel}</h1>
            <p>
              SAT asks if there exists a boolean assignment that makes every clause true. 3-SAT restricts clauses to exactly three
              literals, yet remains NP-complete. This document covers the key definitions, proof ideas, algorithm landscape, and
              practical solver intuition.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="sat-help-section">
                  <h2 className="sat-help-heading">Overview</h2>
                  {bigPicture.map((item) => (
                    <div key={item.title}>
                      <h3 className="sat-help-subheading">{item.title}</h3>
                      <p>{item.details}</p>
                      <p>{item.notes}</p>
                    </div>
                  ))}
                </section>

                <section id="bp-history" className="sat-help-section">
                  <h2 className="sat-help-heading">Historical Context</h2>
                  {historicalContext.map((item) => (
                    <div key={item.title}>
                      <h3 className="sat-help-subheading">{item.title}</h3>
                      <p>{item.details}</p>
                      <p>{item.notes}</p>
                    </div>
                  ))}
                </section>

                <section id="bp-claims" className="sat-help-section">
                  <h2 className="sat-help-heading">Key Claims</h2>
                  {keyClaims.map((item) => (
                    <div key={item.title}>
                      <h3 className="sat-help-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <section id="bp-takeaways" className="sat-help-section">
                  <h2 className="sat-help-heading">Key Takeaways</h2>
                  <ul>
                    {keyTakeaways.map((takeaway) => (
                      <li key={takeaway}>{takeaway}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                <section id="core-setup" className="sat-help-section">
                  <h2 className="sat-help-heading">Problem Setup</h2>
                  {problemSetup.map((item) => (
                    <div key={item.title}>
                      <h3 className="sat-help-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <section id="core-reduction" className="sat-help-section">
                  <h2 className="sat-help-heading">Reduction Sketch</h2>
                  {reductionSketch.map((item) => (
                    <div key={item.title}>
                      <h3 className="sat-help-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <section id="core-algorithms" className="sat-help-section">
                  <h2 className="sat-help-heading">Algorithm Landscape</h2>
                  {algorithmLandscape.map((item) => (
                    <div key={item.title}>
                      <h3 className="sat-help-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <section id="core-proofs" className="sat-help-section">
                  <h2 className="sat-help-heading">Proof Ideas</h2>
                  {proofIdeas.map((item) => (
                    <div key={item.title}>
                      <h3 className="sat-help-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <section id="core-applications" className="sat-help-section">
                  <h2 className="sat-help-heading">Applications</h2>
                  {applications.map((item) => (
                    <div key={item.title}>
                      <h3 className="sat-help-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <section id="core-pitfalls" className="sat-help-section">
                  <h2 className="sat-help-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((pitfall) => (
                      <li key={pitfall.mistake}>
                        <strong>{pitfall.mistake}:</strong> {pitfall.description}
                      </li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                <section id="ex-worked" className="sat-help-section">
                  <h2 className="sat-help-heading">Worked Examples</h2>
                  {workedExamples.map((example) => (
                    <div key={example.title}>
                      <h3 className="sat-help-subheading">{example.title}</h3>
                      <pre className="sat-help-codebox">
                        <code>{example.code.trim()}</code>
                      </pre>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>

                <section id="ex-pseudocode" className="sat-help-section">
                  <h2 className="sat-help-heading">Pseudocode Reference</h2>
                  {pseudocode.map((example) => (
                    <div key={example.title}>
                      <h3 className="sat-help-subheading">{example.title}</h3>
                      <pre className="sat-help-codebox">
                        <code>{example.code.trim()}</code>
                      </pre>
                      <p>{example.explanation}</p>
                    </div>
                  ))}
                </section>

                <section id="ex-assignment" className="sat-help-section">
                  <h2 className="sat-help-heading">Toggle Assignment</h2>
                  <p>Flip variables and see how clauses and the full formula evaluate. This models the SAT decision question.</p>
                  <div className="sat-help-inline-buttons">
                    {variableSet.map((variable) => (
                      <button
                        key={variable}
                        type="button"
                        className={`sat-help-push${assignment[variable] ? ' active' : ''}`}
                        onClick={() => toggleVariable(variable)}
                      >
                        {variable}: {assignment[variable] ? 'true' : 'false'}
                      </button>
                    ))}
                  </div>
                  <p>
                    <strong>Formula value:</strong> {formulaValue ? 'SATISFIED' : 'UNSAT'}
                  </p>
                  <p>
                    <strong>Assignment:</strong> {assignmentSummary}
                  </p>
                </section>

                <section id="ex-clause" className="sat-help-section">
                  <h2 className="sat-help-heading">Clause Inspector</h2>
                  <p>Inspect a single clause and see whether it is satisfied under the current assignment.</p>
                  <div className="sat-help-inline-buttons">
                    {clauseExamples.map((clause) => (
                      <button
                        key={clause.id}
                        type="button"
                        className={`sat-help-push${clause.id === selectedClauseId ? ' active' : ''}`}
                        onClick={() => setSelectedClauseId(clause.id)}
                      >
                        {clause.id.toUpperCase()}
                      </button>
                    ))}
                  </div>
                  <p>
                    <strong>Selected clause:</strong> {selectedClause?.literals.join(' ? ')}
                  </p>
                  <p>
                    <strong>Clause value:</strong> {clauseValue ? 'TRUE' : 'FALSE'}
                  </p>
                </section>

                <section id="ex-3sat" className="sat-help-section">
                  <h2 className="sat-help-heading">3-SAT View</h2>
                  <p>All clauses in 3-SAT must have exactly three literals. The example here is already in 3-CNF.</p>
                  <p>
                    <strong>Formula:</strong> {formulaText}
                  </p>
                  <p>
                    <strong>Each clause has:</strong> {selectedClause?.literals.length ?? 3} literals.
                  </p>
                </section>
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="sat-help-section">
                <h2 className="sat-help-heading">Terms</h2>
                {quickGlossary.map((item) => (
                  <div key={item.term}>
                    <h3 className="sat-help-subheading">{item.term}</h3>
                    <p>{item.definition}</p>
                  </div>
                ))}
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
