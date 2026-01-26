
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { win95Styles } from '@/styles/win95'

import type { JSX } from 'react'

type Clause = {
  id: string
  literals: string[]
}

type Assignment = Record<string, boolean>

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

export default function SatAndThreeSatPage(): JSX.Element {
  const [assignment, setAssignment] = useState<Assignment>({
    x: false,
    y: false,
    z: false,
    w: false,
  })

  const [selectedClauseId, setSelectedClauseId] = useState(clauseExamples[0]?.id ?? 'c1')

  const selectedClause = clauseExamples.find((clause) => clause.id === selectedClauseId) ?? clauseExamples[0]

  const clauseValue = useMemo(() => {
    if (!selectedClause) {
      return false
    }
    return selectedClause.literals.some((literal) => {
      const isNegated = literal.startsWith('~')
      const variable = isNegated ? literal.slice(1) : literal
      const value = assignment[variable]
      return isNegated ? !value : value
    })
  }, [assignment, selectedClause])

  const formulaValue = useMemo(() => {
    return clauseExamples.every((clause) => {
      return clause.literals.some((literal) => {
        const isNegated = literal.startsWith('~')
        const variable = isNegated ? literal.slice(1) : literal
        const value = assignment[variable]
        return isNegated ? !value : value
      })
    })
  }, [assignment])

  const toggleVariable = (variable: string) => {
    setAssignment((prev) => ({
      ...prev,
      [variable]: !prev[variable],
    }))
  }

  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">SAT & 3-SAT</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Boolean satisfiability and the canonical NP-complete problem</div>
              <p className="win95-text">
                SAT asks if there exists a boolean assignment that makes every clause true. 3-SAT restricts clauses to exactly three
                literals, yet remains NP-complete. This page covers the key definitions, proof ideas, algorithm landscape, and practical
                solver intuition.
              </p>
            </div>
            <Link to="/algoViz" className="win95-button" role="button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-fieldset">
            <legend>The Big Picture</legend>
            <div className="win95-grid win95-grid-3">
              {bigPicture.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.details}</p>
                  <p className="win95-text">{item.notes}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Historical Context</legend>
            <div className="win95-grid win95-grid-2">
              {historicalContext.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.details}</p>
                  <p className="win95-text">{item.notes}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Quick Glossary</legend>
            <div className="win95-grid win95-grid-2">
              {quickGlossary.map((item) => (
                <div key={item.term} className="win95-panel">
                  <div className="win95-heading">{item.term}</div>
                  <p className="win95-text">{item.definition}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Problem Setup</legend>
            <div className="win95-grid win95-grid-2">
              {problemSetup.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Key Claims</legend>
            <div className="win95-grid win95-grid-2">
              {keyClaims.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Reduction Sketch: SAT to 3-SAT</legend>
            <div className="win95-grid win95-grid-2">
              {reductionSketch.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Algorithm Landscape</legend>
            <div className="win95-grid win95-grid-2">
              {algorithmLandscape.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Proof Ideas</legend>
            <div className="win95-grid win95-grid-2">
              {proofIdeas.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>
          <fieldset className="win95-fieldset">
            <legend>Worked Examples</legend>
            <div className="win95-stack">
              {workedExamples.map((example) => (
                <div key={example.title} className="win95-panel">
                  <div className="win95-heading">{example.title}</div>
                  <pre className="win95-code">
                    <code>{example.code.trim()}</code>
                  </pre>
                  <p className="win95-text">{example.explanation}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Pseudocode Reference</legend>
            <div className="win95-stack">
              {pseudocode.map((example) => (
                <div key={example.title} className="win95-panel">
                  <div className="win95-heading">{example.title}</div>
                  <pre className="win95-code">
                    <code>{example.code.trim()}</code>
                  </pre>
                  <p className="win95-text">{example.explanation}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Interactive SAT Explorer</legend>
            <div className="win95-stack">
              <div className="win95-panel">
                <div className="win95-heading">Toggle Assignment</div>
                <p className="win95-text">
                  Flip variables and see how clauses and the full formula evaluate. This models the SAT decision question.
                </p>
                <div className="win95-grid win95-grid-2">
                  {variableSet.map((variable) => (
                    <button
                      key={variable}
                      type="button"
                      className="win95-button"
                      onClick={() => toggleVariable(variable)}
                    >
                      {variable}: {assignment[variable] ? 'true' : 'false'}
                    </button>
                  ))}
                </div>
                <div className="win95-panel win95-panel--raised">
                  <p className="win95-text"><strong>Formula value:</strong> {formulaValue ? 'SATISFIED' : 'UNSAT'}</p>
                  <p className="win95-text">
                    Assignment: {variableSet.map((variable) => `${variable}=${assignment[variable] ? 'T' : 'F'}`).join(', ')}
                  </p>
                </div>
              </div>

              <div className="win95-panel">
                <div className="win95-heading">Clause Inspector</div>
                <p className="win95-text">
                  Inspect a single clause and see whether it is satisfied under the current assignment.
                </p>
                <div className="win95-grid win95-grid-3">
                  {clauseExamples.map((clause) => (
                    <button
                      key={clause.id}
                      type="button"
                      className="win95-button"
                      onClick={() => setSelectedClauseId(clause.id)}
                    >
                      {clause.id.toUpperCase()}
                    </button>
                  ))}
                </div>
                <div className="win95-panel win95-panel--raised">
                  <p className="win95-text"><strong>Selected clause:</strong> {selectedClause?.literals.join(' ? ')}</p>
                  <p className="win95-text"><strong>Clause value:</strong> {clauseValue ? 'TRUE' : 'FALSE'}</p>
                </div>
              </div>

              <div className="win95-panel">
                <div className="win95-heading">3-SAT View</div>
                <p className="win95-text">
                  All clauses in 3-SAT must have exactly three literals. The example here is already in 3-CNF.
                </p>
                <div className="win95-panel win95-panel--raised">
                  <p className="win95-text">
                    Formula: {clauseExamples.map((clause) => `(${clause.literals.join(' ? ')})`).join(' ? ')}
                  </p>
                  <p className="win95-text">
                    Each clause has {selectedClause?.literals.length ?? 3} literals.
                  </p>
                </div>
              </div>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Applications</legend>
            <div className="win95-grid win95-grid-2">
              {applications.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Common Pitfalls</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {pitfalls.map((pitfall) => (
                  <li key={pitfall.mistake}>
                    <strong>{pitfall.mistake}:</strong> {pitfall.description}
                  </li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Key Takeaways</legend>
            <div className="win95-grid win95-grid-2">
              {keyTakeaways.map((takeaway) => (
                <div key={takeaway} className="win95-panel">
                  <p className="win95-text">{takeaway}</p>
                </div>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}

