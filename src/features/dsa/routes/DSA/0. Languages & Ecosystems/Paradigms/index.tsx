import { Link } from 'react-router-dom'

import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'
import { slugifySegment } from '@/features/dsa/utils/slug'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const PARADIGMS_BASE_ROUTE = '/dsa/0-languages-and-ecosystems/paradigms'

const overviewSections = [
  {
    title: 'What this subsection is',
    body: 'Paradigms explains the major ways programmers organize computation, state, and control flow. A paradigm is not just syntax or branding. It is a mental model for how problems should be decomposed, how data should be represented, where mutation should happen, and how pieces of a program should interact.',
  },
  {
    title: 'Why paradigms matter',
    body: 'Two languages can have similar runtime characteristics and still encourage very different software structures because their dominant paradigms differ. Procedural, object-oriented, functional, logic, and scripting styles push developers toward different tradeoffs in modularity, reasoning, testing, reuse, and state management.',
  },
  {
    title: 'What this subsection teaches',
    body: 'This subsection teaches how to recognize the worldview encoded in a language or codebase. Instead of asking only what syntax a language uses, it asks what kinds of program structure it makes natural: functions over immutable data, objects with identity and behavior, procedures over shared state, rules and facts, or fast glue code around other systems.',
  },
  {
    title: 'How to read it',
    body: 'Read each page as an answer to four questions: where does state live, how does control flow move, what is the unit of composition, and how is correctness usually argued. Those questions reveal more than a feature checklist ever could.',
  },
]

const whyItMatters = [
  'It explains why the same problem can be modeled cleanly in one style and awkwardly in another.',
  'It helps teams understand the design assumptions embedded in a language or framework.',
  'It clarifies how state, effects, and composition are expected to behave in a codebase.',
  'It improves architectural judgment by linking problem shape to programming style.',
  'It prevents shallow debates that confuse syntax preference with deeper design tradeoffs.',
]

const historicalContext = [
  {
    title: 'Early programming was procedural by necessity',
    detail:
      'Hardware constraints and primitive toolchains made sequential instruction-oriented programming the default starting point. Programs were shaped as ordered steps acting over mutable memory.',
  },
  {
    title: 'Object orientation scaled software through encapsulation',
    detail:
      'As applications and teams grew, object-oriented design emphasized modularity, identity, interfaces, and behavior packaged with state. This changed the way large systems were organized and taught.',
  },
  {
    title: 'Functional and logic traditions emphasized reasoning',
    detail:
      'Functional and logic programming grew from the need to model computation with stronger mathematical clarity, less incidental mutation, and more declarative problem statements. Their influence now appears across mainstream languages.',
  },
  {
    title: 'Modern languages are multi-paradigm',
    detail:
      'Most widely used languages no longer live in one pure camp. They borrow across paradigms, allowing teams to use procedural loops, object interfaces, higher-order functions, and scripting patterns inside one ecosystem.',
  },
]

const sectionSurvey = [
  {
    name: 'Procedural Programming',
    summary:
      'Focuses on sequences of commands, procedures, mutable state, and straightforward control flow. This style is often the baseline model for system tasks, scripts, and algorithmic walkthroughs.',
  },
  {
    name: 'Object-Oriented Programming (OOP)',
    summary:
      'Focuses on objects, encapsulation, interfaces, inheritance, and behavior packaged with state. This style is common in large application codebases and framework-heavy ecosystems.',
  },
  {
    name: 'Functional Programming',
    summary:
      'Focuses on functions, immutability, composition, transformations, and controlled effects. This style improves local reasoning and often reduces accidental shared-state complexity.',
  },
  {
    name: 'Logic Programming',
    summary:
      'Focuses on facts, rules, and query-driven execution. Instead of describing how to compute step by step, logic programming emphasizes what relationships should hold.',
  },
  {
    name: 'Scripting Languages',
    summary:
      'Focuses on automation, orchestration, integration, and rapid iteration. Scripting often favors pragmatic composition of existing capabilities over deep formal structure.',
  },
]

const paradigmThemes = [
  {
    title: 'Paradigms are defaults, not prisons',
    body: 'A paradigm is a dominant way of thinking, not a law that forbids other styles. Multi-paradigm languages let teams mix approaches, but the default style still shapes readability, architecture, and how newcomers interpret the code.',
  },
  {
    title: 'State handling is the deepest difference',
    body: 'Procedural and object-oriented styles often accept mutation as normal structure. Functional styles treat uncontrolled mutation as a source of reasoning difficulty. Logic styles hide control flow behind search or inference. Scripting often tolerates mutable glue if it accelerates practical work.',
  },
  {
    title: 'Composition changes with the paradigm',
    body: 'Procedural systems compose through routines and modules. OOP composes through objects and interfaces. Functional systems compose through function application and higher-order transformation. Logic systems compose through rules and relations. The composition unit changes how teams think.',
  },
  {
    title: 'Correctness arguments change too',
    body: 'In some paradigms you reason about ordered steps and mutable state transitions. In others you reason about algebraic properties, invariants, referential transparency, interface contracts, or rule satisfaction. The proof mindset changes with the model.',
  },
]

const keyTakeaways = [
  'Paradigms are mental models for structuring programs, not just labels attached to languages.',
  'The most important differences are usually about state, control flow, and composition.',
  'No single paradigm dominates every workload; the right one depends on the problem and the team.',
  'Modern languages are often multi-paradigm, so recognizing the active style matters more than memorizing taxonomy.',
  'Strong engineering judgment means choosing the paradigm that reduces complexity for the actual problem.',
]

const topicSignals = [
  {
    title: 'Use this lens when the design debate is really about structure',
    body: 'If the argument is about whether behavior should live in objects, pure functions, procedures, or declarative rules, then the real topic is paradigm rather than language syntax.',
  },
  {
    title: 'Use this lens when state is the main source of complexity',
    body: 'If bugs arise from shared mutable state, lifecycle coupling, hidden side effects, or identity semantics, paradigm choice is likely shaping the difficulty more than runtime or tooling choice.',
  },
  {
    title: 'Use this lens when the same language supports multiple styles',
    body: 'Many modern languages can be written procedurally, functionally, or object-oriented. When code quality differs drastically across teams using the same language, the governing variable is often paradigm discipline.',
  },
  {
    title: 'Use this lens when composition feels either elegant or painful',
    body: 'If a codebase becomes much easier or much harder as features are added, that often reflects whether the chosen paradigm matches the natural structure of the domain.',
  },
]

const coreFoundations = [
  {
    title: 'Unit of composition',
    body: 'Every paradigm has a preferred building block. Procedural programming prefers procedures and modules. OOP prefers objects, classes, and interfaces. Functional programming prefers functions and data transformations. Logic programming prefers rules and relations. Scripting often prefers short tasks stitched together pragmatically.',
  },
  {
    title: 'Treatment of state',
    body: 'Paradigms differ sharply in how they treat state. Some allow broad mutation and make sequencing central. Others isolate effects or prefer immutable data. This one choice affects testability, concurrency, debugging, and how easy it is to reason about correctness.',
  },
  {
    title: 'Flow of control',
    body: 'Procedural programs usually make control flow explicit. OOP often distributes it across interacting objects. Functional code expresses it through composition and transformation chains. Logic systems can defer control to an inference engine or search process. The visible shape of the code changes accordingly.',
  },
  {
    title: 'How abstraction is expressed',
    body: 'Abstraction may come from interfaces and polymorphism, from reusable functions, from algebraic data types, from rules over facts, or from scripts that coordinate tools. The abstraction style changes what feels natural to model and what feels forced.',
  },
  {
    title: 'Where complexity accumulates',
    body: 'In a poor fit, complexity accumulates in the seams: mutable object graphs, tangled control flow, deeply nested callbacks, ad hoc rule interactions, or unstructured script chains. A good paradigm fit reduces those seam costs rather than adding to them.',
  },
]

const tradeoffThemes = [
  {
    title: 'Explicit steps versus declarative intent',
    body: 'Procedural and scripting styles often make each step obvious. Functional and logic styles can express intent more directly but may hide evaluation order or runtime strategy behind higher-level constructs.',
  },
  {
    title: 'Identity and mutation versus value transformation',
    body: 'OOP and procedural code often revolve around entities whose internal state changes over time. Functional approaches prefer value transformations and immutable data, which can simplify reasoning but may feel less direct for certain interactive systems.',
  },
  {
    title: 'Local practicality versus global discipline',
    body: 'Scripting and procedural styles often let teams solve small tasks quickly with minimal ceremony. Functional and strongly structured paradigms can impose more discipline up front, but that discipline may pay off when systems grow.',
  },
  {
    title: 'Model richness versus operational transparency',
    body: 'Object systems can model rich domain entities elegantly, but message flow and shared state can become difficult to track. Functional pipelines can make data flow clearer, but may feel awkward when rich identity or lifecycle management is central.',
  },
  {
    title: 'Search and inference versus direct control',
    body: 'Logic programming can express constraints and relationships beautifully, but its execution behavior may feel less predictable to teams accustomed to explicit control flow and imperative debugging.',
  },
]

const comparisons = [
  {
    title: 'Procedural programming versus object-oriented programming',
    body: 'Procedural programming organizes work around ordered routines that transform state directly. OOP organizes behavior around objects that own state and expose interfaces. The difference is less about syntax and more about whether identity and encapsulated behavior are central to the model.',
  },
  {
    title: 'Object-oriented programming versus functional programming',
    body: 'OOP emphasizes entities with identity, methods, and evolving state. Functional programming emphasizes transformations, composition, and controlling mutation. Each style offers different strengths in modularity, reasoning, and concurrency.',
  },
  {
    title: 'Functional programming versus logic programming',
    body: 'Functional programming still describes computation through explicit composition of transformations. Logic programming moves closer to describing relationships and constraints, allowing the runtime to determine how solutions are explored.',
  },
  {
    title: 'Scripting versus strongly structured paradigms',
    body: 'Scripting usually optimizes for speed of integration and low ceremony. More structured paradigms optimize for maintainability, reasoning, and explicit design boundaries once the system grows beyond quick orchestration.',
  },
  {
    title: 'Pure taxonomy versus multi-paradigm reality',
    body: 'Real languages often borrow across paradigms. The important question is not what the language brochure says, but which style the actual codebase is relying on and whether that style is coherent for the problem.',
  },
]

const failureModes = [
  {
    title: 'Treating paradigms as personality tribes',
    body: 'Paradigms are engineering tools, not identity categories. Teams lose clarity when they defend a style dogmatically rather than evaluating whether it reduces real complexity for the current workload.',
  },
  {
    title: 'Confusing language support with paradigm mastery',
    body: 'A language may support higher-order functions or classes, but that does not mean a codebase is truly functional or well-structured OOP. Paradigm quality depends on how the tools are used, not just on language features.',
  },
  {
    title: 'Mixing paradigms without boundaries',
    body: 'Combining styles can be powerful, but undisciplined mixing often creates confusing ownership rules, unclear side-effect boundaries, and code that follows no single reasoning model well.',
  },
  {
    title: 'Choosing a paradigm for fashion instead of fit',
    body: 'A paradigm that is elegant in theory can still be a poor fit for the team, framework, domain model, or operational environment. Good choices are contextual, not aspirational.',
  },
  {
    title: 'Ignoring the cost of state and effect management',
    body: 'Many paradigm failures come from mishandled state. If mutation, side effects, or control flow are left implicit in a style that assumes discipline, complexity will accumulate quickly.',
  },
]

const studyChecklist = [
  'Identify the dominant unit of composition in the code: procedures, objects, functions, rules, or scripts.',
  'Ask where state lives and how mutation is supposed to happen.',
  'Check whether the chosen paradigm matches the natural structure of the domain.',
  'Watch for hidden side effects, tangled control flow, or confused ownership between styles.',
  'Prefer clear boundaries when mixing paradigms in one codebase.',
  'Judge a paradigm by how much complexity it removes, not by how fashionable it sounds.',
]

const examples = [
  {
    id: 'par98-example-procedural',
    title: 'Example: Procedural decomposition of a workflow',
    area: 'Procedural Programming',
    intro:
      'Procedural programming organizes work as a sequence of named steps. It is often the clearest style when the problem is naturally a pipeline of operations over shared or explicitly passed state.',
    whyFit:
      'This example shows the directness of a step-by-step model when control flow matters more than rich object identity.',
    code: `load input
validate records
transform fields
aggregate results
write output`,
    takeaway:
      'Procedural style is strong when the main challenge is ordered work over data rather than long-lived interacting entities.',
  },
  {
    id: 'par98-example-oop',
    title: 'Example: Object-oriented domain model',
    area: 'Object-Oriented Programming',
    intro:
      'OOP groups data and behavior around entities with identity. This can be valuable when domain objects have evolving state, clear responsibilities, and interfaces that need to persist across large systems.',
    whyFit:
      'This example shows why OOP often becomes attractive in large applications where behavior belongs naturally with stateful entities.',
    code: `Order.create()
Order.addItem(product, quantity)
Order.applyDiscount(code)
Order.submit()
PaymentService.charge(order)`,
    takeaway:
      'OOP works best when the model is driven by cooperating entities with stable responsibilities and meaningful identity.',
  },
  {
    id: 'par98-example-functional',
    title: 'Example: Functional transformation pipeline',
    area: 'Functional Programming',
    intro:
      'Functional programming treats many problems as transformations from one value to another. This style is especially useful when shared mutable state is the main source of bugs or when composition clarity matters.',
    whyFit:
      'This example shows how a pipeline of pure transformations can make reasoning about data flow simpler.',
    code: `records
  |> filter(valid)
  |> map(normalize)
  |> groupBy(category)
  |> mapValues(score)
  |> sortByDescending(total)`,
    takeaway:
      'Functional style shines when the problem can be framed as a chain of value transformations with controlled side effects.',
  },
  {
    id: 'par98-example-logic',
    title: 'Example: Logic-style rule evaluation',
    area: 'Logic Programming',
    intro:
      'Logic programming focuses on facts and rules rather than hand-written control flow. It is powerful when the problem is best expressed as constraints, relationships, or search over possible solutions.',
    whyFit:
      'This example shows how some domains are clearer when the program states what must be true rather than how to compute it step by step.',
    code: `parent(alex, maya).
parent(maya, noah).
ancestor(X, Y) :- parent(X, Y).
ancestor(X, Y) :- parent(X, Z), ancestor(Z, Y).`,
    takeaway:
      'Logic programming is strongest when relation structure matters more than explicit procedural steps.',
  },
  {
    id: 'par98-example-scripting',
    title: 'Example: Script as system glue',
    area: 'Scripting',
    intro:
      'Scripting often wins when the goal is to coordinate tools, APIs, files, or short automation steps quickly. The code may be less ceremonious because the main value is fast orchestration.',
    whyFit:
      'This example captures the pragmatic style of scripting languages, which often optimize for integration speed over deep formal structure.',
    code: `fetch remote data
transform into local format
call deployment tool
update configuration
send notification`,
    takeaway:
      'Scripting is ideal when the main challenge is integration and automation rather than long-lived domain modeling.',
  },
]

const glossary = [
  {
    term: 'Composition',
    definition: 'The way smaller program pieces are combined into larger behavior.',
  },
  {
    term: 'Declarative',
    definition:
      'A style that emphasizes what should hold or be produced rather than listing every step explicitly.',
  },
  {
    term: 'Encapsulation',
    definition:
      'Bundling state and behavior together while hiding internal details behind interfaces.',
  },
  { term: 'Immutability', definition: 'A property of values that do not change after creation.' },
  {
    term: 'Logic programming',
    definition: 'A paradigm centered on facts, rules, and query-driven inference.',
  },
  {
    term: 'Object identity',
    definition: 'The property that an object is treated as a distinct evolving entity over time.',
  },
  {
    term: 'Paradigm',
    definition: 'A broad model for organizing computation, state, and composition.',
  },
  {
    term: 'Procedural programming',
    definition: 'A paradigm centered on ordered procedures operating over state.',
  },
  {
    term: 'Referential transparency',
    definition:
      'A property where an expression can be replaced by its value without changing program behavior.',
  },
  {
    term: 'Side effect',
    definition: 'A change in state or interaction with the outside world beyond returning a value.',
  },
]

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'par98-overview', label: 'Overview' },
    { id: 'par98-why', label: 'Why It Matters' },
    { id: 'par98-history', label: 'Historical Context' },
    { id: 'par98-survey', label: 'Section Survey' },
    { id: 'par98-themes', label: 'Paradigm Themes' },
    { id: 'par98-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'par98-signals', label: 'Topic Signals' },
    { id: 'par98-foundations', label: 'Foundations' },
    { id: 'par98-tradeoffs', label: 'Tradeoff Themes' },
    { id: 'par98-compare', label: 'Compare and Contrast' },
    { id: 'par98-failures', label: 'Failure Modes' },
    { id: 'par98-checklist', label: 'Study Checklist' },
  ],
  examples: examples.map((example) => ({ id: example.id, label: example.title })),
  glossary: [{ id: 'par98-glossary', label: 'Terms' }],
}

function toParadigmRoute(name: string): string {
  return `${PARADIGMS_BASE_ROUTE}/${slugifySegment(name)}`
}

export default function ParadigmsPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Paradigms',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Paradigms"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Paradigms</h1>
      <p className="par98-intro">
        This page is the overview for the Paradigms subsection inside Languages &amp; Ecosystems. It
        explains how major programming styles organize state, composition, and control flow, and how
        those choices shape the structure of real software systems.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="par98-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            {overviewSections.map((section) => (
              <div key={section.title}>
                <h3 className="bin98-subheading">{section.title}</h3>
                <p>{section.body}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="par98-why" className="bin98-section">
            <h2 className="bin98-heading">Why It Matters</h2>
            <ul>
              {whyItMatters.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <hr className="bin98-divider" />

          <section id="par98-history" className="bin98-section">
            <h2 className="bin98-heading">Historical Context</h2>
            {historicalContext.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="par98-survey" className="bin98-section">
            <h2 className="bin98-heading">Section Survey</h2>
            {sectionSurvey.map((item) => (
              <div key={item.name}>
                <h3 className="bin98-subheading">{item.name}</h3>
                <p>{item.summary}</p>
                <p>
                  <Link to={toParadigmRoute(item.name)} className="par98-inline-link">
                    Open {item.name}
                  </Link>
                </p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="par98-themes" className="bin98-section">
            <h2 className="bin98-heading">Paradigm Themes</h2>
            {paradigmThemes.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="par98-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key Takeaways</h2>
            <ul>
              {keyTakeaways.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {activeTab === 'core-concepts' && (
        <>
          <section id="par98-signals" className="bin98-section">
            <h2 className="bin98-heading">Topic Signals</h2>
            {topicSignals.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="par98-foundations" className="bin98-section">
            <h2 className="bin98-heading">Foundations</h2>
            {coreFoundations.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="par98-tradeoffs" className="bin98-section">
            <h2 className="bin98-heading">Tradeoff Themes</h2>
            {tradeoffThemes.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="par98-compare" className="bin98-section">
            <h2 className="bin98-heading">Compare and Contrast</h2>
            {comparisons.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="par98-failures" className="bin98-section">
            <h2 className="bin98-heading">Failure Modes</h2>
            {failureModes.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="par98-checklist" className="bin98-section">
            <h2 className="bin98-heading">Study Checklist</h2>
            <ul>
              {studyChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {activeTab === 'examples' && (
        <>
          {examples.map((example) => (
            <section key={example.id} id={example.id} className="bin98-section">
              <h2 className="bin98-heading">{example.title}</h2>
              <p>
                <strong>Area:</strong> {example.area}
              </p>
              <p>{example.intro}</p>
              <p>
                <strong>Why this example fits:</strong> {example.whyFit}
              </p>
              <div className="bin98-codebox">
                <code>{example.code}</code>
              </div>
              <p>
                <strong>Takeaway:</strong> {example.takeaway}
              </p>
            </section>
          ))}
        </>
      )}

      {activeTab === 'glossary' && (
        <section id="par98-glossary" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {glossary.map((entry) => (
            <p key={entry.term}>
              <strong>{entry.term}:</strong> {entry.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
