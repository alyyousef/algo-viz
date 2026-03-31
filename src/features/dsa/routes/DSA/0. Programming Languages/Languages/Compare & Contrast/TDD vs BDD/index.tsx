import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

type SectionLink = {
  id: string
  label: string
}

type ContentSection = {
  id: string
  title: string
  paragraphs: string[]
  bullets?: string[]
}

type ExampleSection = {
  id: string
  title: string
  description: string[]
  code: string
  notes: string[]
}

type GlossarySection = {
  id: string
  title: string
  terms: Array<{
    term: string
    definition: string
  }>
}

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const introParagraphs = [
  'TDD and BDD are related but not interchangeable practices. Test-Driven Development focuses on driving implementation through small failing tests and the red-green-refactor cycle. Behavior-Driven Development grew from TDD but shifts emphasis toward shared understanding of behavior, examples, and business-readable specifications. The serious comparison is not which one is more advanced. It is what level of behavior the team is trying to drive, who participates in the conversation, and whether the tests are serving design or communication or both.',
  'TDD is usually centered on the programmer\'s feedback loop. Write a failing test, make it pass, then refactor. BDD broadens that loop by making examples and expected behavior more visible to product, QA, and business stakeholders, often through scenario language such as Given, When, Then. This does not mean BDD replaces TDD. In many mature teams, BDD helps decide what should happen and TDD helps drive how it is implemented safely at a lower level.',
  'This page is intentionally comprehensive. It covers red-green-refactor, discovery and formulation, executable specifications, scenario language, test levels, collaboration patterns, anti-patterns, tooling misconceptions, and how teams often combine TDD and BDD rather than choosing one as an ideology.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'TDD is a development discipline in which tests are written before production code in very small cycles. The canonical rhythm is red, green, refactor: write a failing test, write the smallest code that makes it pass, then improve the design while keeping tests green. The practice is as much about design pressure and fast feedback as it is about testing.',
      'BDD is a behavior-focused approach that emphasizes specifying system behavior through examples, shared language, and collaboration between technical and non-technical stakeholders. In practice, BDD is often associated with scenario formats like Given, When, Then and tools such as Cucumber, but the methodology is larger than the tool. The real aim is to discover and express behavior clearly enough that the whole team can agree on it.',
      'The biggest mistake in this comparison is to think of TDD and BDD as mutually exclusive test frameworks. They are better understood as related feedback and specification practices operating at different levels.',
    ],
  },
  {
    id: 'bp-core-difference',
    title: 'The Core Difference',
    paragraphs: [
      'TDD usually starts from the developer\'s perspective: what small failing test will drive the next slice of implementation. It tends to live close to code design, unit-level behavior, API shape, and refactoring confidence. The conversation is often technical and immediate.',
      'BDD usually starts from expected behavior and examples: what should the system do for a user, role, or business process, and how can that expectation be expressed in a shared language. It tends to live closer to acceptance criteria, domain understanding, and communication across disciplines.',
    ],
    bullets: [
      'TDD emphasizes implementation-driving tests.',
      'BDD emphasizes shared understanding of behavior.',
      'TDD often operates closest to code design.',
      'BDD often operates closest to user-visible or business-visible outcomes.',
    ],
  },
  {
    id: 'bp-when-tdd-fits',
    title: 'When TDD Is Usually the Better Fit',
    paragraphs: [
      'TDD is usually the better fit when the team is trying to improve code design, refactoring safety, unit-level correctness, and developer feedback speed. It is especially effective in libraries, domain logic, service layers, algorithms, parsing, and code where small examples can drive API shape productively.',
      'It is also a strong fit when the project needs many low-level correctness checks but does not benefit from writing those checks in business-readable language. Not every internal design decision should become a stakeholder-facing scenario.',
    ],
    bullets: [
      'Libraries and domain logic.',
      'Code with frequent refactoring and API evolution.',
      'Small, fast unit-test feedback loops.',
      'Teams focused on code design quality at implementation level.',
    ],
  },
  {
    id: 'bp-when-bdd-fits',
    title: 'When BDD Is Usually the Better Fit',
    paragraphs: [
      'BDD is usually the better fit when misunderstanding requirements is a major source of waste, when product and QA need a stronger shared language with engineering, or when the system\'s value is best clarified through concrete examples and scenarios. It is especially useful in product-heavy systems where the distinction between correct implementation and correct behavior is operationally important.',
      'BDD is also a strong fit when teams want executable specifications that connect acceptance expectations to automation. The key word is specification, not merely test. The scenarios are meant to express intended behavior in a way the whole team can discuss.',
    ],
    bullets: [
      'Product-heavy applications with rich user flows.',
      'Teams involving product, QA, analysts, and developers in behavior definition.',
      'Acceptance-level or workflow-level automation.',
      'Situations where examples clarify requirements better than abstract tickets do.',
    ],
  },
  {
    id: 'bp-shared-goal',
    title: 'What They Share',
    paragraphs: [
      'Both TDD and BDD try to improve software quality by forcing clarity before or during implementation rather than after the fact. Both rely on examples. Both value automation. Both can reduce defects by catching misunderstandings earlier. And both are often misused when teams reduce them to tooling rituals.',
      'This shared foundation matters because BDD historically emerged from TDD, not as a rejection of it. Many teams use BDD for discovering external behavior and TDD for driving the internal implementation of that behavior.',
    ],
  },
  {
    id: 'bp-production-reality',
    title: 'Production Reality',
    paragraphs: [
      'TDD does not guarantee good architecture. A team can still write brittle tests, lock in bad abstractions, or create overly implementation-coupled test suites. BDD does not guarantee better collaboration either. Teams can still write verbose scenarios that nobody reads and automate them badly.',
      'The operational question is whether the tests and examples are actually making the team think more clearly. If they are only creating ceremony, neither practice is being applied well.',
    ],
  },
  {
    id: 'bp-decision-checklist',
    title: 'Decision Checklist',
    paragraphs: [
      'If the main problem is unclear code design, weak refactoring confidence, or too little fast unit feedback, TDD usually deserves priority. If the main problem is misunderstanding requirements, poor communication between roles, or weak acceptance criteria, BDD usually deserves priority.',
      'In many teams the correct answer is not either-or. It is BDD for discovering and naming behavior, then TDD for implementing that behavior safely in small technical steps.',
    ],
    bullets: [
      'Choose TDD when implementation design feedback is the main need.',
      'Choose BDD when requirement understanding and behavior communication are the main need.',
      'Do not reduce BDD to Cucumber files alone.',
      'Do not reduce TDD to writing tests after the code and calling it TDD.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-tdd-cycle',
    title: 'The TDD Cycle: Red, Green, Refactor',
    paragraphs: [
      'The most iconic TDD loop is red, green, refactor. Red means writing a failing test that expresses a tiny next requirement. Green means making that test pass with the simplest implementation that works. Refactor means improving the code and test design while preserving green behavior.',
      'This cycle is valuable because it keeps developers from jumping too far ahead. It creates a tight feedback loop, discourages speculative architecture, and makes the design emerge through a series of executable examples. The test is not only a verification artifact. It is a design pressure.',
    ],
  },
  {
    id: 'core-bdd-cycle',
    title: 'The BDD Flow: Discover, Formulate, Automate',
    paragraphs: [
      'BDD is often described less as a code-level loop and more as a collaboration cycle. Teams discover behavior together through examples, formulate those examples in a shared language, and automate them where automation adds value. The important detail is that the scenario language is supposed to clarify behavior, not simply wrap tests in Given, When, Then syntax.',
      'Official Cucumber documentation emphasizes that BDD is not just about writing acceptance tests with a special tool. The goal is to improve collaboration and build shared understanding of what the software should do.',
    ],
  },
  {
    id: 'core-levels',
    title: 'Test Levels and Scope',
    paragraphs: [
      'TDD is often most natural at the unit and small integration level, where a developer can drive implementation in short cycles. It can be applied at higher levels too, but its strongest feedback loop usually lives close to code and design boundaries.',
      'BDD is often most natural at the acceptance, workflow, or user-behavior level, where examples describe externally meaningful outcomes. That does not mean every BDD scenario must be an end-to-end browser test, but it does mean the language should stay focused on behavior that matters to the shared understanding of the system.',
    ],
  },
  {
    id: 'core-language',
    title: 'Language and Readability',
    paragraphs: [
      'TDD tests are usually written in the implementation language and in a style optimized for developers. Names matter, but the tests are often technical. They describe APIs, return values, invariants, or domain rules in the vocabulary of the code.',
      'BDD tries to move behavior discussion into a more ubiquitous language. Given, When, Then scenarios are meant to be readable by non-programmers, or at least by mixed-discipline teams. That difference in audience is one of the biggest practical distinctions between the approaches.',
    ],
  },
  {
    id: 'core-design-pressure',
    title: 'Design Pressure and Architecture',
    paragraphs: [
      'TDD exerts design pressure directly. If a unit test is hard to write, the production code is often too coupled, too stateful, or too dependent on infrastructure details. This is one reason TDD enthusiasts say the practice is really about design, not testing.',
      'BDD exerts design pressure more indirectly by forcing teams to name and clarify behavior. When scenarios are hard to write clearly, the domain may be poorly understood, the user flow may be too ambiguous, or the acceptance criteria may be unstable. BDD therefore pressures the product and behavior model more than the internal code shape.',
    ],
  },
  {
    id: 'core-collaboration',
    title: 'Collaboration Model',
    paragraphs: [
      'TDD can be practiced entirely inside the programming team. Pairing or mobbing can make it collaborative, but the technique itself does not require business participation. That is often fine, because many low-level design questions do not benefit from product involvement.',
      'BDD explicitly benefits from cross-functional collaboration. Product, QA, analysts, and developers can use examples to expose hidden assumptions before code is written. This is one reason BDD can reduce rework even when scenario automation itself is not the hardest technical problem.',
    ],
  },
  {
    id: 'core-tooling',
    title: 'Tooling Is Not the Method',
    paragraphs: [
      'TDD is not a unit test framework. You can use JUnit, pytest, NUnit, Jest, or many other tools and still fail to do TDD if you only write tests after implementation. The methodology is about order and feedback, not library choice.',
      'BDD is not synonymous with Cucumber or Gherkin either. Teams can write Given, When, Then scenarios badly and get no real behavioral clarity from them. The point is shared understanding expressed through examples. The tool is secondary.',
    ],
  },
  {
    id: 'core-automation',
    title: 'Automation Strategy',
    paragraphs: [
      'TDD tends to produce many fast-running tests because it thrives on rapid cycles. If the feedback loop is slow, the practice becomes painful. That is why TDD is often associated with unit tests and highly isolated code.',
      'BDD scenario automation can be slower and more expensive because scenarios often sit closer to system behavior, integrations, or acceptance paths. This is why teams need discipline about which examples become automated scenarios and which examples remain discussion aids or lower-level tests.',
    ],
  },
  {
    id: 'core-anti-patterns',
    title: 'Common Anti-Patterns',
    paragraphs: [
      'A common TDD anti-pattern is writing tests so coupled to implementation details that every refactor breaks them for the wrong reasons. Another is pretending test-after-development is TDD because tests exist at all.',
      'A common BDD anti-pattern is creating huge libraries of brittle Given, When, Then scenarios that duplicate UI automation without improving understanding. Another is writing scenarios in pseudo-business language that nobody outside engineering actually uses or cares about.',
    ],
  },
  {
    id: 'core-combination',
    title: 'How TDD and BDD Work Together',
    paragraphs: [
      'In strong teams, BDD and TDD often complement rather than compete. BDD helps the team agree on what behavior matters, often through examples and scenarios. TDD then helps developers implement the underlying code in small safe steps with strong design feedback.',
      'A useful mental model is that BDD can operate at the story or acceptance boundary while TDD operates inside the implementation boundary. The two practices answer different questions: what behavior are we agreeing to, and how do we implement it safely and cleanly.',
    ],
  },
  {
    id: 'core-team-fit',
    title: 'Team Fit and Organizational Context',
    paragraphs: [
      'TDD is often easiest to introduce in engineering-led environments where developers already control design and have fast local test infrastructure. It rewards technical discipline and works best when teams can invest in fast feedback loops.',
      'BDD is often easiest to introduce where product, QA, and engineering genuinely want to collaborate through examples. If the organization lacks that appetite, BDD can devolve into a documentation ritual without value.',
    ],
  },
  {
    id: 'core-misconceptions',
    title: 'Common Misconceptions',
    paragraphs: [
      'One common misconception is that BDD replaces TDD. It does not. Another is that TDD is only about testing. It is not. TDD is a design practice as much as a verification practice. BDD is a behavior-discovery and specification practice as much as an automation practice.',
      'The mature comparison is not low-level testing versus high-level testing. It is implementation-driving feedback versus behavior-specifying collaboration.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-tdd',
    title: 'Tiny TDD Cycle',
    description: [
      'This example shows the spirit of TDD: start with a failing test for a very small behavior, make it pass, then improve the design.',
    ],
    code: `// red
it('formats a full name', () => {
  expect(fullName('Ada', 'Lovelace')).toBe('Ada Lovelace')
})

// green
function fullName(first, last) {
  return first + ' ' + last
}

// refactor
function fullName(first, last) {
  return \`\${first} \${last}\`
}`,
    notes: [
      'The test drives a tiny implementation step.',
      'The important part is the cycle and design pressure, not the triviality of the example.',
    ],
  },
  {
    id: 'examples-bdd',
    title: 'BDD Scenario Example',
    description: [
      'This example shows the flavor of BDD: behavior stated as a scenario that a broader team can discuss before implementation.',
    ],
    code: `Feature: Password reset

Scenario: Registered user requests a reset link
  Given a registered user with the email "user@example.com"
  When the user requests a password reset
  Then the system should send a reset link to "user@example.com"`,
    notes: [
      'The scenario is describing behavior, not code structure.',
      'Its main value is shared understanding before or during automation.',
    ],
  },
  {
    id: 'examples-combined',
    title: 'How They Combine',
    description: [
      'A mature team often uses both practices at different levels.',
    ],
    code: `BDD:
  agree on example
  define expected business behavior
  automate acceptance where useful

TDD:
  implement the underlying domain logic
  use red-green-refactor
  keep the internal design clean`,
    notes: [
      'This is often the most practical real-world model.',
      'BDD clarifies what the feature should do. TDD helps build it safely.',
    ],
  },
  {
    id: 'examples-anti-pattern',
    title: 'Anti-Pattern Comparison',
    description: [
      'These are common ways teams think they are using TDD or BDD while missing the actual value.',
    ],
    code: `Fake TDD:
  write code first
  add tests later
  call it test-driven

Fake BDD:
  write Given/When/Then text after requirements are already misunderstood
  automate brittle UI scripts
  call it collaboration`,
    notes: [
      'The ordering and intent matter.',
      'Methodology collapses into ceremony when the feedback loop is gone.',
    ],
  },
  {
    id: 'examples-selection',
    title: 'Selection Heuristic',
    description: [
      'These short rules are usually more useful than arguing over terminology.',
    ],
    code: `Choose TDD emphasis when:
  code design quality is the main pain
  refactoring confidence is low
  fast unit feedback is needed

Choose BDD emphasis when:
  requirements are misunderstood often
  product and QA need a shared language
  acceptance behavior needs clearer examples`,
    notes: [
      'The better question is where your team is currently losing clarity.',
      'In many teams the answer is to use both, but at different layers.',
    ],
  },
  {
    id: 'examples-language',
    title: 'Audience Difference',
    description: [
      'The simplest way to explain the practices is often by asking who the test or example is primarily written for.',
    ],
    code: `TDD test audience:
  developers
  maintainers
  refactoring workflow

BDD scenario audience:
  developers
  QA
  product or analysts
  anyone validating expected behavior`,
    notes: [
      'This is not absolute, but it captures an important practical difference.',
      'Audience often determines whether a technical test or behavior scenario is the more useful artifact.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-tdd',
    title: 'TDD Terms',
    terms: [
      {
        term: 'Red',
        definition:
          'The stage where a new test fails because the behavior is not implemented yet.',
      },
      {
        term: 'Green',
        definition:
          'The stage where the smallest useful implementation is added to make the test pass.',
      },
      {
        term: 'Refactor',
        definition:
          'Improving code and test design while keeping the tests passing.',
      },
      {
        term: 'Unit Test',
        definition:
          'A fast automated test focused on a small piece of behavior or logic in isolation.',
      },
      {
        term: 'Design Pressure',
        definition:
          'The way test-first development reveals coupling and awkward APIs during implementation.',
      },
    ],
  },
  {
    id: 'glossary-bdd',
    title: 'BDD Terms',
    terms: [
      {
        term: 'Given, When, Then',
        definition:
          'A common scenario structure for expressing preconditions, action, and expected outcome in BDD.',
      },
      {
        term: 'Scenario',
        definition:
          'A concrete example of expected system behavior used for discussion and often automation.',
      },
      {
        term: 'Executable Specification',
        definition:
          'A behavior description that is both readable by humans and automatable by tooling.',
      },
      {
        term: 'Ubiquitous Language',
        definition:
          'A shared vocabulary used across roles to describe behavior consistently.',
      },
      {
        term: 'Discovery',
        definition:
          'The collaborative process of exploring examples and clarifying what behavior matters before automation.',
      },
    ],
  },
  {
    id: 'glossary-shared',
    title: 'Shared Testing and Specification Terms',
    terms: [
      {
        term: 'Acceptance Criteria',
        definition:
          'Conditions that define when a feature or story is considered behaviorally correct.',
      },
      {
        term: 'Automation',
        definition:
          'Using tools to execute tests or scenarios repeatedly without manual repetition.',
      },
      {
        term: 'Feedback Loop',
        definition:
          'The time and clarity between changing code or expectations and learning whether the result is correct.',
      },
      {
        term: 'Refactoring Safety',
        definition:
          'Confidence that internal changes can be made while preserving intended behavior.',
      },
      {
        term: 'Specification',
        definition:
          'A clear statement of expected system behavior or constraints.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-core-difference', label: 'The Core Difference' },
    { id: 'bp-when-tdd-fits', label: 'When TDD Fits' },
    { id: 'bp-when-bdd-fits', label: 'When BDD Fits' },
    { id: 'bp-shared-goal', label: 'What They Share' },
    { id: 'bp-production-reality', label: 'Production Reality' },
    { id: 'bp-decision-checklist', label: 'Decision Checklist' },
  ],
  'core-concepts': [
    { id: 'core-tdd-cycle', label: 'The TDD Cycle' },
    { id: 'core-bdd-cycle', label: 'The BDD Flow' },
    { id: 'core-levels', label: 'Test Levels and Scope' },
    { id: 'core-language', label: 'Language and Readability' },
    { id: 'core-design-pressure', label: 'Design Pressure' },
    { id: 'core-collaboration', label: 'Collaboration Model' },
    { id: 'core-tooling', label: 'Tooling Is Not the Method' },
    { id: 'core-automation', label: 'Automation Strategy' },
    { id: 'core-anti-patterns', label: 'Common Anti-Patterns' },
    { id: 'core-combination', label: 'How They Work Together' },
    { id: 'core-team-fit', label: 'Team Fit' },
    { id: 'core-misconceptions', label: 'Common Misconceptions' },
  ],
  examples: [
    { id: 'examples-tdd', label: 'Tiny TDD Cycle' },
    { id: 'examples-bdd', label: 'BDD Scenario Example' },
    { id: 'examples-combined', label: 'How They Combine' },
    { id: 'examples-anti-pattern', label: 'Anti-Pattern Comparison' },
    { id: 'examples-selection', label: 'Selection Heuristic' },
    { id: 'examples-language', label: 'Audience Difference' },
  ],
  glossary: [
    { id: 'glossary-tdd', label: 'TDD Terms' },
    { id: 'glossary-bdd', label: 'BDD Terms' },
    { id: 'glossary-shared', label: 'Shared Terms' },
  ],
}

const pageStyles = `
.tdd-bdd-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.tdd-bdd-help-window {
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: #c0c0c0;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  box-sizing: border-box;
}

.tdd-bdd-help-titlebar {
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  min-height: 24px;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.tdd-bdd-help-titletext {
  grid-column: 2;
  justify-self: center;
  font-size: 15px;
  line-height: 1.1;
  text-align: center;
  white-space: nowrap;
}

.tdd-bdd-help-controls {
  grid-column: 3;
  justify-self: end;
  display: flex;
  gap: 2px;
}

.tdd-bdd-help-control {
  width: 18px;
  height: 16px;
  padding: 0;
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
  font-family: "MS Sans Serif", Tahoma, sans-serif;
  font-size: 11px;
  line-height: 1;
}

.tdd-bdd-help-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.tdd-bdd-help-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-family: "MS Sans Serif", Tahoma, sans-serif;
  font-size: 12px;
  cursor: pointer;
}

.tdd-bdd-help-tab-active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.tdd-bdd-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  border-top: 1px solid #404040;
  background: #ffffff;
}

.tdd-bdd-help-toc {
  overflow: auto;
  padding: 12px;
  background: #efefef;
  border-right: 1px solid #808080;
}

.tdd-bdd-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.tdd-bdd-help-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.tdd-bdd-help-toc-item {
  margin: 0 0 8px;
}

.tdd-bdd-help-toc-link {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.tdd-bdd-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.tdd-bdd-help-doc-title {
  margin: 0 0 10px;
  font-size: 20px;
  font-weight: 700;
}

.tdd-bdd-help-section {
  margin: 0 0 20px;
}

.tdd-bdd-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.tdd-bdd-help-content p,
.tdd-bdd-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.tdd-bdd-help-content p {
  margin: 0 0 10px;
}

.tdd-bdd-help-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.tdd-bdd-help-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.tdd-bdd-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.tdd-bdd-help-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .tdd-bdd-help-main {
    grid-template-columns: 1fr;
  }

  .tdd-bdd-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 640px) {
  .tdd-bdd-help-window {
    min-height: auto;
  }

  .tdd-bdd-help-titlebar {
    grid-template-columns: 1fr auto;
    row-gap: 4px;
    padding-top: 4px;
    padding-bottom: 4px;
  }

  .tdd-bdd-help-titletext {
    grid-column: 1 / span 2;
    grid-row: 1;
    white-space: normal;
    padding: 0 28px;
  }

  .tdd-bdd-help-controls {
    grid-column: 2;
    grid-row: 1;
    align-self: start;
  }
}
`

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="tdd-bdd-help-section">
      <h2 className="tdd-bdd-help-heading">{section.title}</h2>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {section.bullets ? (
        <ul>
          {section.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {isLast ? null : <hr className="tdd-bdd-help-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="tdd-bdd-help-section">
      <h2 className="tdd-bdd-help-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="tdd-bdd-help-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="tdd-bdd-help-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="tdd-bdd-help-section">
      <h2 className="tdd-bdd-help-heading">{section.title}</h2>
      {section.terms.map((item) => (
        <p key={item.term}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="tdd-bdd-help-divider" />}
    </section>
  )
}

export default function TddVsBddPage(): JSX.Element {
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
    document.title = `TDD vs BDD (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'TDD vs BDD',
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
    <div className="tdd-bdd-help-page">
      <style>{pageStyles}</style>
      <div className="tdd-bdd-help-window" role="presentation">
        <header className="tdd-bdd-help-titlebar">
          <span className="tdd-bdd-help-titletext">TDD vs BDD</span>
          <div className="tdd-bdd-help-controls">
            <button
              className="tdd-bdd-help-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="tdd-bdd-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="tdd-bdd-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`tdd-bdd-help-tab ${activeTab === tab.id ? 'tdd-bdd-help-tab-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="tdd-bdd-help-main">
          <aside className="tdd-bdd-help-toc" aria-label="Table of contents">
            <h2 className="tdd-bdd-help-toc-title">Contents</h2>
            <ul className="tdd-bdd-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id} className="tdd-bdd-help-toc-item">
                  <a href={`#${section.id}`} className="tdd-bdd-help-toc-link">
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="tdd-bdd-help-content">
            <h1 className="tdd-bdd-help-doc-title">TDD vs BDD</h1>
            {introParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            {activeTab === 'big-picture'
              ? bigPictureSections.map((section, index) =>
                  renderContentSection(section, index === bigPictureSections.length - 1),
                )
              : null}

            {activeTab === 'core-concepts'
              ? coreConceptSections.map((section, index) =>
                  renderContentSection(section, index === coreConceptSections.length - 1),
                )
              : null}

            {activeTab === 'examples'
              ? exampleSections.map((section, index) =>
                  renderExampleSection(section, index === exampleSections.length - 1),
                )
              : null}

            {activeTab === 'glossary'
              ? glossarySections.map((section, index) =>
                  renderGlossarySection(section, index === glossarySections.length - 1),
                )
              : null}
          </main>
        </div>
      </div>
    </div>
  )
}
