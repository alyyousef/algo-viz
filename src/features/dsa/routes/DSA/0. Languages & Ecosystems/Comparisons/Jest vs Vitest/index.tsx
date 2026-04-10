import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

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

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const introParagraphs = [
  'Jest and Vitest solve the same broad problem: running automated JavaScript and TypeScript tests with mocks, assertions, watch mode, and useful developer ergonomics. The meaningful comparison is not old versus new. It is ecosystem fit, startup model, module handling, performance profile, compatibility, and migration cost.',
  'Jest is the long-established test runner with deep ecosystem support and broad familiarity across backend and frontend JavaScript codebases. Vitest is a newer test runner built to fit naturally into the Vite ecosystem and modern ESM-oriented workflows. For many teams, the choice comes down to whether compatibility and maturity matter more than Vite-native speed and simpler modern tooling alignment.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Jest became the dominant JavaScript test runner by offering an integrated experience: test runner, assertions, mocking, watch mode, snapshots, fake timers, and strong ecosystem support. It has been the default in many React, Node.js, and monorepo setups for years.',
      'Vitest brings a similar developer experience but is designed around the Vite toolchain and modern module handling. It aims to be fast, TypeScript-friendly, and highly compatible with common Jest patterns while avoiding some of the weight and configuration friction that older toolchains can accumulate.',
    ],
  },
  {
    id: 'bp-shared-goal',
    title: 'What They Both Do Well',
    paragraphs: [
      'Both tools support unit tests, integration tests, watch mode, mocks, snapshots, coverage, setup files, fake timers, and test organization patterns familiar to JavaScript developers. In ordinary day-to-day usage, they can feel similar because the test authoring style overlaps heavily.',
      'This similarity is why teams often underestimate the real decision point. The syntax overlap is not the main issue. The main issue is how the runner integrates with the rest of the toolchain and what tradeoffs the team is making around speed, compatibility, and module semantics.',
    ],
    bullets: [
      'Both support describe, it or test, and expect-style assertions.',
      'Both support mock functions and test setup files.',
      'Both can run TypeScript tests and support coverage reports.',
      'Both can serve frontend and backend JavaScript projects.',
    ],
  },
  {
    id: 'bp-when-jest-fits',
    title: 'When Jest Is Usually the Better Fit',
    paragraphs: [
      'Jest is usually the better fit when a team already has a mature Jest suite, depends on Jest-specific plugins or patterns, or wants maximum compatibility with the broadest amount of community documentation and historical tooling. It is a safe choice for large existing codebases where migration cost would exceed the practical benefits of switching.',
      'It is also a strong fit when the codebase is not centered on Vite and when test stability, familiarity, and deep ecosystem maturity matter more than optimizing startup speed or developer feedback loops in a modern Vite stack.',
    ],
    bullets: [
      'Large existing Jest test suites.',
      'Projects with significant Jest-specific tooling or custom environment setup.',
      'Teams that prioritize ecosystem maturity and broad documentation.',
      'Codebases not built around Vite or modern ESM-first workflows.',
    ],
  },
  {
    id: 'bp-when-vitest-fits',
    title: 'When Vitest Is Usually the Better Fit',
    paragraphs: [
      'Vitest is usually the better fit when the project already uses Vite or when the team wants a test runner that aligns closely with modern frontend tooling, fast watch mode, and simpler ESM and TypeScript ergonomics. It often feels especially natural in React, Vue, Svelte, and library projects already configured around Vite.',
      'It is also attractive when developer feedback speed matters a lot and when the team wants to avoid the heavier transform and configuration model that can accumulate in long-lived Jest setups.',
    ],
    bullets: [
      'Projects already using Vite in development and build workflows.',
      'Modern frontend codebases that care about fast local iteration.',
      'Teams moving toward ESM-friendly tooling.',
      'New projects where legacy compatibility constraints are low.',
    ],
  },
  {
    id: 'bp-decision-checklist',
    title: 'Decision Checklist',
    paragraphs: [
      'The easiest way to decide is to start from the surrounding toolchain. Jest is often the right answer for existing Jest-heavy systems. Vitest is often the right answer for new or actively modernized Vite-based projects.',
    ],
    bullets: [
      'Choose Jest when compatibility and migration avoidance matter most.',
      'Choose Vitest when Vite integration and fast feedback loops matter most.',
      'Choose Jest when you rely on a large amount of established Jest ecosystem behavior.',
      'Choose Vitest when you want a lighter modern default for a Vite-native stack.',
      'Do not migrate only for fashion; migrate when the toolchain and team workflow benefit materially.',
    ],
  },
]

const coreConceptSectionsBase: ContentSection[] = [
  {
    id: 'core-runner-model',
    title: 'Runner Model and Ecosystem Fit',
    paragraphs: [
      'Jest is a broader standalone testing platform with its own long-established assumptions, configuration model, and ecosystem. It became popular partly because it offered a complete batteries-included experience before many modern tooling stacks matured.',
      'Vitest is designed to feel like the testing counterpart of Vite. Instead of standing apart from the build and module toolchain, it tries to align tightly with it. That makes it especially appealing in projects where Vite is already the development center of gravity.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance and Feedback Loop',
    paragraphs: [
      'Vitest is widely chosen because it is often faster in local development, especially in projects already using Vite. Fast startup and fast watch re-runs improve the experience of test-driven development and quick UI iteration.',
      'Jest can still perform well, especially in mature setups, but it more often carries transform overhead and configuration complexity that make it feel heavier in modern frontend stacks. The difference is most obvious in interactive developer feedback rather than in one-off CI execution alone.',
    ],
  },
  {
    id: 'core-module-model',
    title: 'Module System and Toolchain Alignment',
    paragraphs: [
      'Jest grew up in a world where CommonJS, Babel transforms, and separate testing configuration were more central. It absolutely supports modern code, but that support sometimes comes with additional configuration and edge cases around transforms and module behavior.',
      'Vitest feels more native in ESM-oriented and Vite-based projects because it shares assumptions with the surrounding toolchain. This reduces friction in projects that already use Vite plugins, aliases, and modern TypeScript or frontend configurations.',
    ],
  },
  {
    id: 'core-compatibility',
    title: 'Compatibility and Migration Cost',
    paragraphs: [
      'Jest has the advantage in legacy compatibility simply because so many existing projects, guides, plugins, and internal utilities were built around it. A mature Jest suite often has years of accumulated conventions, mocks, setup helpers, and CI habits.',
      'Vitest intentionally mirrors much of the Jest API surface, which lowers migration cost. But compatibility is not the same as identity. Some Jest-specific behaviors, mocks, timers, or environment assumptions may need deliberate adjustment during migration.',
    ],
  },
  {
    id: 'core-mocking',
    title: 'Mocking and Test API',
    paragraphs: [
      'Jest is known for its comprehensive mocking story and its long-standing patterns for spies, module mocks, fake timers, and snapshots. Many teams know these APIs by muscle memory.',
      'Vitest offers similar APIs through vi and a Jest-like testing style. This familiarity is a strategic advantage because it allows teams to adopt modern tooling without rewriting the entire mental model of authoring tests.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  ...coreConceptSectionsBase,
  {
    id: 'core-snapshots-coverage',
    title: 'Snapshots, Coverage, and Day-to-Day Features',
    paragraphs: [
      'Both tools support snapshots, coverage, setup hooks, and test environments. For many teams, the question is not whether the feature exists, but how naturally it fits into the surrounding toolchain and whether the defaults match the project architecture.',
      'Jest remains very strong for teams already deeply invested in its snapshot and reporter ecosystem. Vitest is strong for teams that want those same everyday testing capabilities without leaving the Vite-first workflow.',
    ],
  },
  {
    id: 'core-ci-and-monorepos',
    title: 'CI, Monorepos, and Operational Fit',
    paragraphs: [
      'Jest has years of production use in large repositories, enterprise CI pipelines, and mixed frontend-backend monorepos. That history matters because it means many edge cases have already been discovered and documented.',
      'Vitest is increasingly capable in these environments as well, but its strongest story remains projects already aligned with Vite and modern frontend tooling. In a large mixed codebase, the decision often depends on whether uniformity with existing Jest infrastructure or modernization toward Vite is more important.',
    ],
  },
  {
    id: 'core-learning-curve',
    title: 'Learning Curve and Team Familiarity',
    paragraphs: [
      'Jest has a familiarity advantage because so many JavaScript developers have already used it. That matters in hiring, onboarding, and maintenance, especially in older codebases.',
      'Vitest has a low learning curve for teams already comfortable with Jest because the test authoring model is intentionally similar. The main learning is usually about configuration and toolchain integration rather than the syntax of writing tests.',
    ],
  },
  {
    id: 'core-migration-guidance',
    title: 'Migration Guidance',
    paragraphs: [
      'Moving from Jest to Vitest makes the most sense when the project already uses Vite, when local test speed is a pain point, and when the team wants to simplify modern frontend tooling. The migration should be justified by workflow improvement, not by novelty alone.',
      'Staying on Jest is often the better decision when the test suite is large, stable, deeply customized, and not blocked by Jest in any meaningful way. Mature systems should not be churned without a clear operational or developer-experience payoff.',
    ],
  },
  {
    id: 'core-architecture-guidance',
    title: 'Architecture Guidance',
    paragraphs: [
      'For new Vite-based frontend projects, Vitest is often the most natural default. For established polyglot JavaScript repositories, Jest remains a strong default if it is already working well.',
      'The right decision is less about ideology and more about toolchain coherence. The test runner should reduce friction in the dominant workflow of the repository rather than forcing the repository to orbit the test runner.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-jest-test',
    title: 'Basic Jest Test',
    description: [
      'A standard Jest test uses the familiar describe, test, and expect pattern. This style is widely recognized across JavaScript teams.',
    ],
    code: `import { sum } from './sum'

describe('sum', () => {
  test('adds two numbers', () => {
    expect(sum(2, 3)).toBe(5)
  })
})`,
    notes: [
      'This is one reason Jest has such a strong ecosystem advantage: the testing style is deeply familiar.',
      'The basic authoring experience is straightforward and well documented.',
    ],
  },
  {
    id: 'examples-vitest-test',
    title: 'Basic Vitest Test',
    description: [
      'Vitest uses a very similar authoring style, which makes adoption easier for teams coming from Jest.',
    ],
    code: `import { describe, expect, test } from 'vitest'
import { sum } from './sum'

describe('sum', () => {
  test('adds two numbers', () => {
    expect(sum(2, 3)).toBe(5)
  })
})`,
    notes: [
      'The similarity reduces migration friction.',
      'The bigger difference is usually toolchain integration rather than test syntax.',
    ],
  },
  {
    id: 'examples-mocking',
    title: 'Mock Function Comparison',
    description: [
      'Both tools support mock functions with similar semantics. The naming differs, but the day-to-day intent is nearly identical.',
    ],
    code: `// Jest
const fn = jest.fn()

// Vitest
const fn = vi.fn()`,
    notes: [
      "API similarity is one of Vitest's biggest migration advantages.",
      'Teams can often port tests incrementally because the mental model remains familiar.',
    ],
  },
  {
    id: 'examples-config-fit',
    title: 'Toolchain Fit Example',
    description: [
      'The real difference often shows up in configuration and toolchain alignment rather than in individual test files.',
    ],
    code: `// Jest mindset
babel or ts-jest transforms
separate runner configuration
independent module handling

// Vitest mindset
reuse Vite config
shared aliases and plugins
native alignment with Vite dev workflow`,
    notes: [
      'If the project is already Vite-native, Vitest often removes duplication.',
      'If the project already has mature Jest infrastructure, rewriting it may not pay off.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-jest',
    title: 'Jest Terms',
    terms: [
      {
        term: 'Snapshot Test',
        definition:
          'A test that stores a serialized output and compares future results against that stored snapshot.',
      },
      {
        term: 'Fake Timer',
        definition:
          'A testing mechanism for controlling time-based behavior without waiting for real time to pass.',
      },
      {
        term: 'Module Mock',
        definition:
          'A mocked replacement for an imported module used to isolate behavior in tests.',
      },
      {
        term: 'Test Environment',
        definition:
          'The runtime context used for tests, such as Node-like or browser-like behavior.',
      },
    ],
  },
  {
    id: 'glossary-vitest',
    title: 'Vitest Terms',
    terms: [
      {
        term: 'vi',
        definition:
          'Vitest’s mocking and utility namespace, analogous to jest in many testing patterns.',
      },
      {
        term: 'Vite Integration',
        definition:
          'The ability to reuse Vite configuration, aliases, and plugins in the test runner.',
      },
      {
        term: 'Watch Mode',
        definition:
          'An interactive mode that reruns relevant tests automatically after file changes.',
      },
      {
        term: 'ESM-Friendly Workflow',
        definition:
          'A test setup that aligns naturally with modern ECMAScript modules and toolchains.',
      },
    ],
  },
  {
    id: 'glossary-shared',
    title: 'Shared Testing Terms',
    terms: [
      {
        term: 'Assertion',
        definition:
          'A statement in a test that checks whether the observed result matches the expected outcome.',
      },
      {
        term: 'Coverage',
        definition: 'A report showing which parts of the code were exercised by the test suite.',
      },
      {
        term: 'Transform',
        definition:
          'A build or compilation step applied before tests execute, often used for TypeScript or JSX.',
      },
      {
        term: 'Test Runner',
        definition: 'The tool responsible for finding, executing, and reporting tests.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-shared-goal', label: 'Shared Goal' },
    { id: 'bp-when-jest-fits', label: 'When Jest Fits' },
    { id: 'bp-when-vitest-fits', label: 'When Vitest Fits' },
    { id: 'bp-decision-checklist', label: 'Decision Checklist' },
  ],
  'core-concepts': [
    { id: 'core-runner-model', label: 'Runner Model and Ecosystem Fit' },
    { id: 'core-performance', label: 'Performance and Feedback Loop' },
    { id: 'core-module-model', label: 'Module System and Toolchain Alignment' },
    { id: 'core-compatibility', label: 'Compatibility and Migration Cost' },
    { id: 'core-mocking', label: 'Mocking and Test API' },
    { id: 'core-snapshots-coverage', label: 'Snapshots and Coverage' },
    { id: 'core-ci-and-monorepos', label: 'CI and Monorepos' },
    { id: 'core-learning-curve', label: 'Learning Curve' },
    { id: 'core-migration-guidance', label: 'Migration Guidance' },
    { id: 'core-architecture-guidance', label: 'Architecture Guidance' },
  ],
  examples: [
    { id: 'examples-jest-test', label: 'Basic Jest Test' },
    { id: 'examples-vitest-test', label: 'Basic Vitest Test' },
    { id: 'examples-mocking', label: 'Mock Function Comparison' },
    { id: 'examples-config-fit', label: 'Toolchain Fit Example' },
  ],
  glossary: [
    { id: 'glossary-jest', label: 'Jest Terms' },
    { id: 'glossary-vitest', label: 'Vitest Terms' },
    { id: 'glossary-shared', label: 'Shared Testing Terms' },
  ],
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="jest-vitest-help-section">
      <h2 className="jest-vitest-help-heading">{section.title}</h2>
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
      {isLast ? null : <hr className="jest-vitest-help-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="jest-vitest-help-section">
      <h2 className="jest-vitest-help-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="jest-vitest-help-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="jest-vitest-help-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="jest-vitest-help-section">
      <h2 className="jest-vitest-help-heading">{section.title}</h2>
      {section.terms.map((item) => (
        <p key={item.term}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="jest-vitest-help-divider" />}
    </section>
  )
}

export default function JestVsVitestPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Jest vs Vitest',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Jest vs Vitest"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Jest vs Vitest</h1>
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
    </TopicPageShell>
  )
}
