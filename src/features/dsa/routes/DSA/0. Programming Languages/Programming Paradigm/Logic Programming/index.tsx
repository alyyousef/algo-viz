import type { JSX } from 'react'
import { Link } from 'react-router-dom'
import { win95Styles } from '@/styles/win95'


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

export default function LogicProgrammingPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Logic Programming</span>
          <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
        </header>

        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">Facts, rules, and automated inference</div>
              <p className="win95-text">
                Logic programming expresses computation as inference over facts and rules. Instead of prescribing control flow, you
                ask whether a goal can be proven. The runtime searches, unifies terms, and backtracks through possibilities, making
                declarative knowledge executable.
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
                Logic programs declare relationships; the engine performs proof search. This yields concise, explainable code for
                rule based systems, at the cost of careful attention to search order, indexing, and constraint pruning to keep
                execution tractable.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Historical context</legend>
            <div className="win95-grid win95-grid-2">
              {milestones.map((item) => (
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
            <legend>Complexity analysis and performance intuition</legend>
            <div className="win95-grid win95-grid-2">
              {complexityNotes.map((note) => (
                <div key={note.title} className="win95-panel">
                  <div className="win95-heading">{note.title}</div>
                  <p className="win95-text">{note.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                Performance tuning is about shaping the search tree: reorder goals to ground variables early, add constraints to
                prune, and use indexing to avoid scanning irrelevant clauses. Measure backtracking counts, not just wall clock time.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Real-world applications</legend>
            <div className="win95-grid win95-grid-2">
              {applications.map((item) => (
                <div key={item.context} className="win95-panel">
                  <div className="win95-heading">{item.context}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Tooling and ecosystem</legend>
            <div className="win95-grid win95-grid-2">
              {logicTooling.map((item) => (
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
            <legend>Debugging workflow</legend>
            <div className="win95-grid win95-grid-2">
              {debuggingWorkflow.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
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
            <legend>Production checklist</legend>
            <div className="win95-grid win95-grid-2">
              {productionChecklist.map((item) => (
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
                {decisionPoints.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Advanced insights and frontiers</legend>
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
            <legend>Learning path</legend>
            <div className="win95-grid win95-grid-2">
              {learningPath.map((item) => (
                <div key={item.step} className="win95-panel">
                  <div className="win95-heading">{item.step}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Further reading and sources</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {sources.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Key takeaways</legend>
            <div className="win95-grid win95-grid-2">
              {takeaways.map((item) => (
                <div key={item} className="win95-panel win95-panel--raised">
                  <p className="win95-text">{item}</p>
                </div>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}

