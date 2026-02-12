import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

const milestones = [
  {
    title: 'Resolution and Horn clauses (1965)',
    detail:
      'J. Alan Robinson introduced resolution as a complete proof method for first order logic. Horn clauses, a restricted form, made automated inference computationally manageable.',
  },
  {
    title: 'Prolog emerges at Marseille (1972)',
    detail:
      'Alain Colmerauer and Philippe Roussel created Prolog to express grammar and inference with facts and rules. Backtracking search and unification were baked into the language runtime.',
  },
  {
    title: 'Warren Abstract Machine (1983)',
    detail:
      'David H. D. Warren specified the WAM, a register based abstract machine that made Prolog execution efficient and portable across hardware.',
  },
  {
    title: 'Constraint Logic Programming (late 1980s)',
    detail:
      'Jaffar and Lassez combined constraints with logic programming, letting solvers prune search spaces and reason over integers, reals, or finite domains.',
  },
  {
    title: 'Answer Set Programming and modern solvers',
    detail:
      'Stable model semantics and SAT/SMT integrations widened use in planning, configuration, and verification, demonstrating that declarative encodings can ride on top of powerful search engines.',
  },
  {
    title: 'Datalog resurgence in tooling (2000s-2010s)',
    detail:
      'Datalog and fixed-point engines power program analysis, security policy, and data lineage at scale.',
  },
  {
    title: 'Probabilistic logic programming (2010s)',
    detail:
      'Extensions like ProbLog and Markov logic blend uncertainty with logical inference.',
  },
  {
    title: 'Neuro-symbolic systems (2020s)',
    detail:
      'Logic constraints increasingly complement ML models for explainability and safety.',
  },
]

const mentalModels = [
  {
    title: 'Say what, not how',
    detail:
      'You declare facts and rules; the runtime figures out how to satisfy queries. Control is implicit in search order and unification rather than explicit loops.',
  },
  {
    title: 'Search with pruning',
    detail:
      'Execution is systematic search over possible bindings. Cuts, ordering of goals, and constraints act as pruning shears that shape the search tree.',
  },
  {
    title: 'Logical variables as placeholders',
    detail:
      'Variables stand for unknowns and can be partially instantiated. Unification tries to make structures identical, propagating bindings through a proof attempt.',
  },
  {
    title: 'Knowledge base as database',
    detail:
      'Facts are stored like rows; rules define derived relations queried on demand.',
  },
  {
    title: 'Backtracking as control flow',
    detail:
      'Control emerges from search; the engine explores alternatives automatically.',
  },
  {
    title: 'Constraints prune early',
    detail:
      'Constraints act like filters that cut branches before full enumeration.',
  },
]

const mechanics = [
  {
    heading: 'Facts, rules, and queries',
    bullets: [
      'Facts assert base truths. Rules encode implications using Horn clauses. Queries ask if a goal can be satisfied given the knowledge base.',
      'The engine tries to prove a query by chaining rules until it reaches facts, instantiating variables along the way.',
      'The closed-world assumption treats unprovable statements as false in many logic systems.',
    ],
  },
  {
    heading: 'Unification and backtracking',
    bullets: [
      'Unification matches terms by finding bindings that make them identical, failing if structures clash.',
      'Backtracking explores alternatives when a path fails. Choice points record where to resume search.',
      'Occurs checks prevent infinite self references, though many Prolog implementations skip it for speed.',
      'Cuts commit to a path and can eliminate expensive search branches.',
    ],
  },
  {
    heading: 'Execution models',
    bullets: [
      'The WAM compiles Prolog to efficient instructions: environment frames, choice points, trail stacks, and indexing for fast clause selection.',
      'Depth first search with left to right goal order is standard; it is incomplete for some programs but efficient in practice.',
      'Constraint logic programming integrates domain specific solvers to tighten variable domains during search.',
      'Tabling memoizes subgoals to avoid recomputation and guarantee termination for some recursion.',
    ],
  },
  {
    heading: 'Constraint solving',
    bullets: [
      'CLP(FD) handles finite domains with propagation and domain reduction.',
      'CLP(R) solves over real numbers with specialized solvers.',
      'Constraints can be combined with search to find optimal solutions.',
    ],
  },
]

const complexityNotes = [
  {
    title: 'Search complexity dominates',
    detail:
      'In the worst case, backtracking search is exponential in the branching factor and depth. Pruning through constraints and ordering is essential for practical performance.',
  },
  {
    title: 'Unification cost',
    detail:
      'Unifying two terms is roughly linear in their size. Heavier use of complex terms increases per step cost but can reduce search if it prunes early.',
  },
  {
    title: 'Determinism vs completeness',
    detail:
      'Cuts and committed choice reduce search and improve speed but can sacrifice completeness by discarding alternative proofs.',
  },
  {
    title: 'Indexing impact',
    detail:
      'Good indexing reduces clause scanning dramatically and can turn unusable programs into fast queries.',
  },
]

const applications = [
  {
    context: 'Expert systems and rule engines',
    detail:
      'Encoding domain knowledge as rules enables explainable inference. CLIPS and Drools borrow logic programming ideas for business rules.',
  },
  {
    context: 'Natural language parsing',
    detail:
      'Definite clause grammars in Prolog express grammars as logic rules, enabling parsing, ambiguity exploration, and grammar prototyping.',
  },
  {
    context: 'Planning and scheduling',
    detail:
      'Constraint logic programming and answer set programming tackle resource allocation, timetabling, and path planning by searching over constrained spaces.',
  },
  {
    context: 'Program analysis and verification',
    detail:
      'Datalog based tools (Souffle, Flix) compute data flow, alias analysis, and security properties over codebases using fixed point evaluation.',
  },
  {
    context: 'Knowledge graphs',
    detail:
      'Logic rules infer new edges and relationships in graph data.',
  },
  {
    context: 'Configuration and policy',
    detail:
      'Declarative rules validate infrastructure configs and access control.',
  },
]

const examples = [
  {
    title: 'Family relations (Prolog)',
    code: `parent(alice, bob).
parent(bob, carol).

grandparent(X, Y) :- parent(X, Z), parent(Z, Y).

?- grandparent(alice, Who).
Who = carol.`,
    explanation:
      'Rules declare how grandparent relates to parent. The query asks the engine to find bindings that satisfy the rule chain.',
  },
  {
    title: 'Path finding with recursion (Prolog)',
    code: `edge(a, b). edge(b, c). edge(c, d).

path(X, Y) :- edge(X, Y).
path(X, Y) :- edge(X, Z), path(Z, Y).

?- path(a, d).
true.`,
    explanation:
      'Recursive rules explore reachability. Depth first search will find a path but can loop on cycles unless guarded.',
  },
  {
    title: 'Constraint logic programming (CLP(FD))',
    code: `:- use_module(library(clpfd)).

solve(X, Y, Z) :-
    [X, Y, Z] ins 1..10,
    X + Y #= Z,
    all_different([X, Y, Z]).`,
    explanation:
      'Finite domain constraints prune values early, shrinking the search tree before full enumeration.',
  },
  {
    title: 'Datalog reachability',
    code: `edge(a, b).
edge(b, c).

path(X, Y) :- edge(X, Y).
path(X, Y) :- edge(X, Z), path(Z, Y).`,
    explanation:
      'Datalog computes the transitive closure with fixed-point evaluation and avoids infinite loops.',
  },
  {
    title: 'Rule-based policy',
    code: `allow(User, Resource) :-
  member(User, admins).

allow(User, Resource) :-
  owns(User, Resource).`,
    explanation:
      'Policies are expressed as rules; query evaluation determines access.',
  },
]

const pitfalls = [
  'Left recursion and naive goal order can cause non termination under depth first search.',
  'Missing occurs check may accept cyclic terms, leading to unsoundness or unexpected failures later.',
  'Overuse of cut (!) for performance can hide valid solutions and make logic non declarative.',
  'Impure features (assert/retract, global variables) break referential transparency and complicate reasoning.',
  'Scaling without indexing or constraints can explode search space; performance tuning is often about better clause indexing and ordering.',
  'Mixing logical and procedural constructs makes programs hard to reason about.',
  'Assuming completeness when cuts or ordering prune valid solutions.',
]

const decisionPoints = [
  'Need explainable inference over rules: use logic programming or Datalog for transparency and maintainability.',
  'Need combinatorial search with constraints: choose constraint logic programming or answer set programming to prune effectively.',
  'Performance critical loops over numeric arrays: prefer imperative or functional approaches; logic runtimes are not optimized for tight numeric kernels.',
  'Team familiarity and tooling: ensure debugging, tracing, and solver integration meet operational needs.',
  'Use Datalog when recursion and fixed-point evaluation fit your query model.',
]

const advancedInsights = [
  {
    title: 'Tabling and fixed point evaluation',
    detail:
      'Tabling (SLG resolution) memoizes subgoals to avoid redundant work and ensure termination for many recursive programs, moving toward Datalog style evaluation.',
  },
  {
    title: 'Indexing and clause selection',
    detail:
      'Multi argument and deep indexing reduce backtracking by quickly eliminating impossible clauses. WAM based engines rely heavily on indexing for performance.',
  },
  {
    title: 'Integration with SAT/SMT',
    detail:
      'Modern workflows compile logic programs into SAT or SMT, leveraging highly optimized solvers. This hybrid approach combines declarative encoding with industrial solver performance.',
  },
  {
    title: 'Determinism annotations',
    detail:
      'Some Prolog variants and Mercury use determinism declarations to optimize and catch missing cases, guiding both compiler and reader about expected solution counts.',
  },
  {
    title: 'Constraint propagation strategies',
    detail:
      'Propagation strength and ordering determine how aggressively constraints prune the search space.',
  },
  {
    title: 'Explainable inference',
    detail:
      'Proof traces provide a clear audit trail for decisions, important in regulated domains.',
  },
]

const sources = [
  'Foundations of Logic Programming (Lloyd) for the theory of SLD resolution and semantics.',
  'The Art of Prolog (Sterling, Shapiro) for practical Prolog design and performance patterns.',
  'Warren Abstract Machine papers for execution model details.',
  'Constraint Logic Programming papers (Jaffar, Lassez) for integrating constraints with search.',
  'GeeksforGeeks: logic programming overviews for introductory contrasts.',
]

const takeaways = [
  'Logic programming lets you state relationships and relies on search, unification, and backtracking to find solutions.',
  'Performance is governed by search shape: goal order, indexing, constraints, and cuts decide practicality.',
  'Purity aids reasoning, but impure shortcuts and missing occurs checks can break soundness or completeness.',
  'Use it where explainability and constraint solving matter more than raw numeric throughput.',
  'Datalog and ASP bring logic programming to large-scale analysis and planning.',
  'Successful systems combine declarative models with careful control of search.',
]

const logicTooling = [
  {
    title: 'Languages and systems',
    detail:
      'Prolog, Datalog, Mercury, Answer Set Programming, and CLP variants each balance control and declarativity.',
  },
  {
    title: 'Solvers and engines',
    detail:
      'SAT/SMT solvers and CLP engines power efficient search and constraint propagation.',
  },
  {
    title: 'Tooling',
    detail:
      'Trace tools, debuggers, and visualizers help interpret search and proof paths.',
  },
  {
    title: 'Integration',
    detail:
      'Many systems embed logic engines within larger applications or data pipelines.',
  },
]

const debuggingWorkflow = [
  {
    title: 'Trace proofs',
    detail:
      'Follow unification and backtracking to locate failing goals.',
  },
  {
    title: 'Inspect indexing',
    detail:
      'Check which clauses are being selected to avoid unnecessary scans.',
  },
  {
    title: 'Add constraints early',
    detail:
      'Place constraints near the top of rules to prune faster.',
  },
  {
    title: 'Use deterministic subsets',
    detail:
      'Prefer deterministic clauses where possible to reduce backtracking.',
  },
]

const productionChecklist = [
  {
    title: 'Performance',
    detail:
      'Profile search depth, clause order, and indexing strategies.',
  },
  {
    title: 'Correctness',
    detail:
      'Validate constraints and avoid incomplete cuts unless intended.',
  },
  {
    title: 'Maintainability',
    detail:
      'Document rules and keep logic declarative for future changes.',
  },
  {
    title: 'Observability',
    detail:
      'Capture proof traces for auditing and debugging.',
  },
]

const learningPath = [
  {
    step: 'Foundations',
    detail: 'Facts, rules, unification, and queries.',
  },
  {
    step: 'Search control',
    detail: 'Backtracking, cuts, and goal ordering.',
  },
  {
    step: 'Constraints',
    detail: 'CLP and finite domain reasoning.',
  },
  {
    step: 'Scaling',
    detail: 'Datalog, tabling, and solver integrations.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const win98HelpStyles = `
.lp-win98-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.lp-win98-window {
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  background: #c0c0c0;
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.lp-win98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
}

.lp-win98-titletext {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  font-weight: 700;
  white-space: nowrap;
}

.lp-win98-titlecontrols {
  display: flex;
  gap: 2px;
}

.lp-win98-control {
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
}

.lp-win98-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
  overflow-x: auto;
}

.lp-win98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
  white-space: nowrap;
}

.lp-win98-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.lp-win98-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.lp-win98-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.lp-win98-toc h2 {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 10px;
}

.lp-win98-toc ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.lp-win98-toc li {
  margin: 0 0 8px;
}

.lp-win98-toc a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.lp-win98-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.lp-win98-content h1 {
  font-size: 20px;
  margin: 0 0 12px;
}

.lp-win98-content h2 {
  font-size: 16px;
  margin: 0 0 8px;
}

.lp-win98-content h3 {
  font-size: 13px;
  margin: 0 0 6px;
}

.lp-win98-content section {
  margin: 0 0 20px;
}

.lp-win98-content p,
.lp-win98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.lp-win98-content p {
  margin: 0 0 10px;
}

.lp-win98-content ul,
.lp-win98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.lp-win98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.lp-win98-code {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  margin: 6px 0 10px;
  padding: 8px;
}

.lp-win98-code code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .lp-win98-main {
    grid-template-columns: 1fr;
  }

  .lp-win98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .lp-win98-titletext {
    font-size: 13px;
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
    { id: 'bp-applications', label: 'Real-world Applications' },
    { id: 'bp-complexity', label: 'Complexity and Performance' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-mental-models', label: 'Mental Models' },
    { id: 'core-mechanics', label: 'How It Works' },
    { id: 'core-when-to-use', label: 'When to Use It' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-advanced', label: 'Advanced Insights' },
    { id: 'core-tooling', label: 'Tooling and Ecosystem' },
    { id: 'core-debugging', label: 'Debugging Workflow' },
    { id: 'core-production', label: 'Production Checklist' },
    { id: 'core-learning', label: 'Learning Path' },
  ],
  examples: [{ id: 'ex-practical', label: 'Practical Examples' }],
  glossary: [
    { id: 'glossary-terms', label: 'Terms and Concepts' },
    { id: 'glossary-sources', label: 'Further Reading and Sources' },
  ],
}

export default function LogicProgrammingPage(): JSX.Element {
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
    document.title = `Logic Programming (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Logic Programming',
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
    <div className="lp-win98-page">
      <style>{win98HelpStyles}</style>
      <div className="lp-win98-window" role="presentation">
        <header className="lp-win98-titlebar">
          <span className="lp-win98-titletext">Logic Programming</span>
          <div className="lp-win98-titlecontrols">
            <button className="lp-win98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="lp-win98-control" aria-label="Close">X</Link>
          </div>
        </header>

        <div className="lp-win98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`lp-win98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="lp-win98-main">
          <aside className="lp-win98-toc" aria-label="Table of contents">
            <h2>Contents</h2>
            <ul>
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="lp-win98-content">
            <h1>Logic Programming</h1>
            <p>
              Logic programming expresses computation as inference over facts and rules. Instead of prescribing control flow, you
              ask whether a goal can be proven. The runtime searches, unifies terms, and backtracks through possibilities, making
              declarative knowledge executable.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview">
                  <h2>Overview</h2>
                  <p>
                    Logic programs declare relationships; the engine performs proof search. This yields concise, explainable code for
                    rule based systems, at the cost of careful attention to search order, indexing, and constraint pruning to keep
                    execution tractable.
                  </p>
                </section>
                <hr className="lp-win98-divider" />
                <section id="bp-history">
                  <h2>Historical Context</h2>
                  {milestones.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-applications">
                  <h2>Real-world Applications</h2>
                  {applications.map((item) => (
                    <p key={item.context}>
                      <strong>{item.context}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="bp-complexity">
                  <h2>Complexity and Performance Intuition</h2>
                  {complexityNotes.map((note) => (
                    <p key={note.title}>
                      <strong>{note.title}:</strong> {note.detail}
                    </p>
                  ))}
                  <p>
                    Performance tuning is about shaping the search tree: reorder goals to ground variables early, add constraints to
                    prune, and use indexing to avoid scanning irrelevant clauses. Measure backtracking counts, not just wall clock time.
                  </p>
                </section>
                <section id="bp-takeaways">
                  <h2>Key Takeaways</h2>
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
                <section id="core-mental-models">
                  <h2>Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-mechanics">
                  <h2>How It Works</h2>
                  {mechanics.map((block) => (
                    <div key={block.heading}>
                      <h3>{block.heading}</h3>
                      <ul>
                        {block.bullets.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
                <section id="core-when-to-use">
                  <h2>When to Use It</h2>
                  <ol>
                    {decisionPoints.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
                <section id="core-pitfalls">
                  <h2>Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section id="core-advanced">
                  <h2>Advanced Insights and Frontiers</h2>
                  {advancedInsights.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-tooling">
                  <h2>Tooling and Ecosystem</h2>
                  {logicTooling.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-debugging">
                  <h2>Debugging Workflow</h2>
                  {debuggingWorkflow.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-production">
                  <h2>Production Checklist</h2>
                  {productionChecklist.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
                <section id="core-learning">
                  <h2>Learning Path</h2>
                  {learningPath.map((item) => (
                    <p key={item.step}>
                      <strong>{item.step}:</strong> {item.detail}
                    </p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <section id="ex-practical">
                <h2>Practical Examples</h2>
                {examples.map((example) => (
                  <div key={example.title}>
                    <h3>{example.title}</h3>
                    <div className="lp-win98-code">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </div>
                ))}
              </section>
            )}

            {activeTab === 'glossary' && (
              <>
                <section id="glossary-terms">
                  <h2>Terms and Concepts</h2>
                  <p><strong>Fact:</strong> A base assertion in the knowledge base that is taken as true.</p>
                  <p><strong>Rule:</strong> A Horn-clause implication that derives new truths from existing facts and goals.</p>
                  <p><strong>Query:</strong> A goal posed to the engine to test provability and discover variable bindings.</p>
                  <p><strong>Unification:</strong> Matching terms by finding substitutions that make structures identical.</p>
                  <p><strong>Backtracking:</strong> Systematic exploration of alternatives after a failed proof path.</p>
                  <p><strong>Choice point:</strong> A stored branch in execution where the engine can resume search.</p>
                  <p><strong>Cut (!):</strong> A control operator that commits to choices and prunes alternatives.</p>
                  <p><strong>Occurs check:</strong> A unification guard that prevents cyclic self-referential terms.</p>
                  <p><strong>Tabling:</strong> Memoization of subgoals to avoid repeated work and improve termination behavior.</p>
                  <p><strong>Constraint Logic Programming (CLP):</strong> Logic programming extended with domain solvers to prune search.</p>
                  <p><strong>Datalog:</strong> A restricted logic language with fixed-point semantics, common in analysis and query engines.</p>
                  <p><strong>WAM:</strong> Warren Abstract Machine, a classic execution model for efficient Prolog runtimes.</p>
                </section>
                <section id="glossary-sources">
                  <h2>Further Reading and Sources</h2>
                  <ul>
                    {sources.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
