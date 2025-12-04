import TopicLayout, { TopicSection } from '@/features/dsa/components/TopicLayout'

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
]

const mechanics = [
  {
    heading: 'Facts, rules, and queries',
    bullets: [
      'Facts assert base truths. Rules encode implications using Horn clauses. Queries ask if a goal can be satisfied given the knowledge base.',
      'The engine tries to prove a query by chaining rules until it reaches facts, instantiating variables along the way.',
    ],
  },
  {
    heading: 'Unification and backtracking',
    bullets: [
      'Unification matches terms by finding bindings that make them identical, failing if structures clash.',
      'Backtracking explores alternatives when a path fails. Choice points record where to resume search.',
      'Occurs checks prevent infinite self references, though many Prolog implementations skip it for speed.',
    ],
  },
  {
    heading: 'Execution models',
    bullets: [
      'The WAM compiles Prolog to efficient instructions: environment frames, choice points, trail stacks, and indexing for fast clause selection.',
      'Depth first search with left to right goal order is standard; it is incomplete for some programs but efficient in practice.',
      'Constraint logic programming integrates domain specific solvers to tighten variable domains during search.',
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
]

const pitfalls = [
  'Left recursion and naive goal order can cause non termination under depth first search.',
  'Missing occurs check may accept cyclic terms, leading to unsoundness or unexpected failures later.',
  'Overuse of cut (!) for performance can hide valid solutions and make logic non declarative.',
  'Impure features (assert/retract, global variables) break referential transparency and complicate reasoning.',
  'Scaling without indexing or constraints can explode search space; performance tuning is often about better clause indexing and ordering.',
]

const decisionPoints = [
  'Need explainable inference over rules: use logic programming or Datalog for transparency and maintainability.',
  'Need combinatorial search with constraints: choose constraint logic programming or answer set programming to prune effectively.',
  'Performance critical loops over numeric arrays: prefer imperative or functional approaches; logic runtimes are not optimized for tight numeric kernels.',
  'Team familiarity and tooling: ensure debugging, tracing, and solver integration meet operational needs.',
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
]

export default function LogicProgrammingPage(): JSX.Element {
  return (
    <TopicLayout
      title="Logic Programming"
      subtitle="Facts, rules, and automated inference"
      intro="Logic programming expresses computation as inference over facts and rules. Instead of prescribing control flow, you ask whether a goal can be proven. The runtime searches, unifies terms, and backtracks through possibilities, making declarative knowledge executable."
    >
      <TopicSection heading="The big picture">
        <p className="text-white/80">
          Logic programs declare relationships; the engine performs proof search. This yields concise, explainable code for rule based
          systems, at the cost of careful attention to search order, indexing, and constraint pruning to keep execution tractable.
        </p>
      </TopicSection>

      <TopicSection heading="Historical context">
        <div className="grid gap-3 md:grid-cols-2">
          {milestones.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Core concept and mental models">
        <div className="grid gap-3 md:grid-cols-3">
          {mentalModels.map((item) => (
            <article key={item.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="How it works">
        <div className="grid gap-3 md:grid-cols-3">
          {mechanics.map((block) => (
            <article key={block.heading} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{block.heading}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/80">
                {block.bullets.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Complexity analysis and performance intuition">
        <div className="grid gap-3 md:grid-cols-2">
          {complexityNotes.map((note) => (
            <article key={note.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <h4 className="text-sm font-semibold text-white">{note.title}</h4>
              <p className="text-sm text-white/80">{note.detail}</p>
            </article>
          ))}
        </div>
        <p className="mt-3 text-sm text-white/70">
          Performance tuning is about shaping the search tree: reorder goals to ground variables early, add constraints to prune,
          and use indexing to avoid scanning irrelevant clauses. Measure backtracking counts, not just wall clock time.
        </p>
      </TopicSection>

      <TopicSection heading="Real-world applications">
        <div className="grid gap-3 md:grid-cols-2">
          {applications.map((item) => (
            <article key={item.context} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.context}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Practical examples">
        <div className="space-y-4">
          {examples.map((example) => (
            <article key={example.title} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{example.title}</p>
              <pre className="mt-2 overflow-x-auto rounded bg-black/40 p-3 text-xs text-white/90">
                <code>{example.code}</code>
              </pre>
              <p className="text-sm text-white/80">{example.explanation}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Common pitfalls">
        <ul className="list-disc space-y-2 pl-5 text-sm text-white/80">
          {pitfalls.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </TopicSection>

      <TopicSection heading="When to use it">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-white/80">
          {decisionPoints.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </TopicSection>

      <TopicSection heading="Advanced insights and frontiers">
        <div className="grid gap-3 md:grid-cols-2">
          {advancedInsights.map((item) => (
            <article key={item.title} className="rounded-lg bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white/80">{item.detail}</p>
            </article>
          ))}
        </div>
      </TopicSection>

      <TopicSection heading="Further reading and sources">
        <ul className="list-disc space-y-2 pl-5 text-sm text-white/80">
          {sources.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </TopicSection>

      <TopicSection heading="Key takeaways">
        <div className="rounded-lg border border-emerald-400/40 bg-emerald-500/10 p-4">
          <ul className="list-disc space-y-2 pl-5 text-sm text-emerald-100">
            {takeaways.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </TopicSection>
    </TopicLayout>
  )
}
