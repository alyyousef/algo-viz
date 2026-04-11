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
  'Playwright and Cypress are both modern browser automation and end-to-end testing tools, but they make different tradeoffs around execution model, browser support, debugging style, and how broadly they aim to cover application testing. The useful comparison is not just which library can click buttons and assert text. The useful comparison is how each tool behaves in CI, how reliable it is across browsers, how it fits into test architecture, and what it optimizes for in day-to-day developer workflow.',
  'Cypress became popular by making browser testing feel approachable and interactive. Its developer experience, time-travel style debugging, and in-browser runner gave frontend teams a much better experience than older Selenium-era tooling. Playwright arrived later with a broader automation model, stronger multi-browser story, and a design that often fits both end-to-end testing and more general browser automation. In practice, Cypress often wins on familiar interactive workflow, while Playwright often wins on breadth, flexibility, and cross-browser coverage.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Cypress is a browser testing framework focused heavily on frontend developer experience. It runs tests with a tightly integrated runner and offers very approachable local debugging. For many teams, this was the first time end-to-end testing felt fast enough and understandable enough to use regularly.',
      'Playwright is a broader browser automation framework with a strong testing layer. It supports multiple browser engines, multiple language bindings, parallel execution, and a wider range of automation scenarios. While it is often used for end-to-end testing, it is also useful for scraping, browser workflows, and more complex testing needs beyond the narrow web-app happy path.',
    ],
  },
  {
    id: 'bp-core-difference',
    title: 'The Core Difference',
    paragraphs: [
      'The core difference is what the tool is trying to be. Cypress is strongly centered on the interactive frontend testing experience. Playwright is centered more broadly on full-featured browser automation with testing capabilities built around that foundation.',
      'That difference shapes many downstream tradeoffs. Cypress often feels very polished for local app testing workflows. Playwright often feels more flexible and more capable when the team needs broad browser coverage, multiple tabs, richer automation control, or infrastructure-friendly parallel testing.',
    ],
    bullets: [
      'Cypress emphasizes frontend testing ergonomics and an approachable runner.',
      'Playwright emphasizes browser automation breadth and cross-browser depth.',
      'Cypress often feels simpler in the happy path.',
      'Playwright often scales better across broader testing requirements.',
    ],
  },
  {
    id: 'bp-when-cypress-fits',
    title: 'When Cypress Is Usually the Better Fit',
    paragraphs: [
      'Cypress is usually the better fit when the team values highly interactive local debugging, mostly tests one web app in a browser-centric workflow, and does not need the broader automation surface that Playwright provides. It is also a good fit for teams already invested in Cypress patterns and dashboards.',
      'It remains strong when the main priority is developer friendliness for UI testing and the test suite is not pushing hard against Cypress-specific execution constraints.',
    ],
    bullets: [
      'Frontend-heavy teams that value the interactive runner experience.',
      'Projects focused mainly on browser-based UI flows.',
      'Teams already comfortable with Cypress commands and debugging patterns.',
      'Suites where Cypress limitations are not materially blocking coverage.',
    ],
  },
  {
    id: 'bp-when-playwright-fits',
    title: 'When Playwright Is Usually the Better Fit',
    paragraphs: [
      'Playwright is usually the better fit when the team wants stronger multi-browser coverage, more general browser automation power, better support for multiple pages or contexts, or a test framework that feels comfortable in CI-heavy environments. It is especially attractive when teams want one tool for both browser testing and broader automation scenarios.',
      'It is also a strong choice when reliability across Chromium, Firefox, and WebKit matters, or when the organization wants a modern testing tool that can scale across many projects and many execution environments.',
    ],
    bullets: [
      'Teams that need strong cross-browser coverage.',
      'Suites that need multiple tabs, contexts, or richer automation control.',
      'Organizations that value CI scalability and parallel execution.',
      'Projects that want one tool for testing plus broader browser automation.',
    ],
  },
  {
    id: 'bp-hidden-tradeoff',
    title: 'The Hidden Tradeoff',
    paragraphs: [
      'The hidden tradeoff is not only syntax or API taste. It is how much the tool constrains the test architecture and how much that matters to the team. Cypress gives a very guided experience, which can be excellent until the suite needs scenarios that fall outside that design sweet spot.',
      'Playwright gives more breadth and often more raw capability, but that means the team must be deliberate about patterns, fixtures, and test architecture rather than relying on the tool to shape the workflow as strongly.',
    ],
  },
  {
    id: 'bp-decision-checklist',
    title: 'Decision Checklist',
    paragraphs: [
      'The best choice usually comes from evaluating the test suite you actually need rather than from comparing marketing features. If the team mainly needs approachable frontend end-to-end testing, Cypress may be enough. If the team needs broader browser control, multi-browser confidence, or a more infrastructure-oriented testing model, Playwright often creates more value.',
    ],
    bullets: [
      'Choose Cypress for interactive frontend testing ergonomics.',
      'Choose Playwright for broader automation and cross-browser depth.',
      'Measure against your real CI and browser coverage needs.',
      'Pick one tool whose model matches the long-term suite, not just the first demo.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-execution-model',
    title: 'Execution Model',
    paragraphs: [
      'Cypress runs with a distinctive execution model that is deeply integrated with the browser and its own command queue. This gives Cypress much of its signature developer experience, but it also shapes how tests are written and what kinds of flows feel natural.',
      'Playwright exposes a more direct automation API over browser actions and assertions. Its model often feels closer to a general-purpose automation framework with a testing runner layered around it. That can feel more explicit and sometimes less magical, especially for developers who want fine-grained control.',
    ],
  },
  {
    id: 'core-browser-support',
    title: 'Browser Support',
    paragraphs: [
      'One of Playwrightâ€™s strongest advantages is its support for multiple browser engines, including Chromium, Firefox, and WebKit. That matters when teams want confidence across environments rather than confidence only in a Chromium-like world.',
      'Cypress has browser support too, but Playwright is more strongly associated with serious cross-browser testing strategy. If WebKit coverage matters because of Safari risk, Playwright is often the more compelling choice.',
    ],
  },
  {
    id: 'core-debugging',
    title: 'Debugging Experience',
    paragraphs: [
      'Cypress is famous for its interactive debugging experience. The runner, command log, snapshots, and step-by-step visibility make it easy to understand why a test failed. For frontend teams, this was a major reason to adopt it in the first place.',
      'Playwright also provides strong debugging tools such as tracing, screenshots, videos, inspector support, and detailed reports. The style is different. It tends to feel more like a powerful automation-and-reporting toolkit than a browser-embedded interactive console.',
    ],
  },
  {
    id: 'core-parallelism-ci',
    title: 'Parallelism and CI Fit',
    paragraphs: [
      'Playwright often fits CI-oriented testing better because parallel workers, project configuration, retries, and multi-browser runs are first-class concerns. Teams with larger suites often appreciate how naturally Playwright scales into automated pipelines.',
      'Cypress can also be used effectively in CI, but the team should evaluate the total workflow, including orchestration, recording, sharding, and test runtime patterns. For some organizations, Cypress remains excellent. For others, Playwright feels more naturally aligned with CI scale.',
    ],
  },
  {
    id: 'core-test-scope',
    title: 'Test Scope and Breadth',
    paragraphs: [
      'Cypress is primarily chosen for frontend integration and end-to-end testing. It can be excellent in that role when the application is mostly a browser-based web app and the flows fit the Cypress model comfortably.',
      'Playwright often covers a wider testing envelope. It can handle end-to-end UI tests, authentication flows, multiple contexts, API-assisted test setup, and nontraditional browser workflows more comfortably. That breadth matters when one tool should cover many kinds of browser-driven testing.',
    ],
  },
  {
    id: 'core-learning-curve',
    title: 'Learning Curve',
    paragraphs: [
      'Cypress often feels easier to adopt quickly because the feedback loop is so visible and the tool strongly guides how tests are written. New users can become productive quickly if their use case matches the framework well.',
      'Playwright has a straightforward API, but teams often need to think more explicitly about fixtures, projects, contexts, and test architecture. The learning curve is still reasonable, but the tool expects a slightly more deliberate testing mindset.',
    ],
  },
  {
    id: 'core-architecture',
    title: 'Test Architecture and Maintainability',
    paragraphs: [
      'The better tool for maintainability is not just the one with nicer syntax. It is the one whose model best matches the suiteâ€™s long-term complexity. A Cypress suite that constantly fights framework assumptions can become brittle. A Playwright suite with no clear fixture or page-object discipline can also become messy.',
      'Teams should therefore judge each tool not only by how pleasant the first ten tests feel, but by how cleanly the hundredth or thousandth test can still be structured.',
    ],
  },
  {
    id: 'core-flakiness',
    title: 'Reliability and Flakiness',
    paragraphs: [
      'Both tools try to reduce flaky tests through smart waiting and strong assertions. The real source of flakiness is usually bad test design, unstable environments, poor selectors, and unmodeled async behavior rather than the tool alone.',
      'That said, teams often report Playwright as a strong choice for robust automation in broader scenarios, while Cypress remains strongest when the application and suite fit its intended model closely. Reliability depends on fit as much as on raw feature count.',
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Ecosystem and Team Fit',
    paragraphs: [
      'Cypress has a long presence in frontend testing culture and remains familiar to many UI teams. If the team already has Cypress knowledge, dashboards, plugins, and workflows, migration cost should be weighed carefully.',
      'Playwright has built strong momentum because many teams want a modern default for new test suites, especially when cross-browser testing and CI scale matter. It often appeals to teams building a testing platform rather than just an interactive browser test harness.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs',
    paragraphs: [
      'Cypress usually wins on interactive debugging feel and a guided frontend-testing workflow. Playwright usually wins on breadth, multi-browser confidence, and general-purpose automation capability. Neither is automatically better; the value depends on what the suite actually needs.',
      'The wrong move is choosing based on community enthusiasm alone. Teams should instead compare browser coverage needs, debugging style, CI shape, and whether the suite is likely to stay narrow or expand in scope over time.',
    ],
    bullets: [
      'Choose Cypress for polished interactive frontend testing.',
      'Choose Playwright for cross-browser depth and broader automation power.',
      'Treat CI and browser coverage as first-class decision factors.',
      'Optimize for the mature test suite, not the easiest first demo.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-cypress-shape',
    title: 'Cypress Test Shape',
    description: [
      'A Cypress test often reads like a chain of browser actions and assertions inside the Cypress command model.',
    ],
    code: `cy.visit('/login')
cy.get('[data-testid=email]').type('user@example.com')
cy.get('[data-testid=password]').type('secret')
cy.contains('button', 'Sign in').click()
cy.url().should('include', '/dashboard')`,
    notes: [
      'This style is approachable and highly visible in the Cypress runner.',
      'It works very well for common UI flows.',
    ],
  },
  {
    id: 'examples-playwright-shape',
    title: 'Playwright Test Shape',
    description: [
      'A Playwright test often uses a more explicit page-driven automation style with the Playwright test runner.',
    ],
    code: `test('user can sign in', async ({ page }) => {
  await page.goto('/login')
  await page.getByTestId('email').fill('user@example.com')
  await page.getByTestId('password').fill('secret')
  await page.getByRole('button', { name: 'Sign in' }).click()
  await expect(page).toHaveURL(/dashboard/)
})`,
    notes: [
      'The style is explicit and works naturally in a broader automation context.',
      'It often scales well across different browsers and CI environments.',
    ],
  },
  {
    id: 'examples-cross-browser',
    title: 'Cross-Browser Strategy',
    description: [
      'Cross-browser confidence becomes a major factor when product quality depends on more than Chromium-like behavior.',
    ],
    code: `Playwright projects:
  chromium
  firefox
  webkit

Cypress:
  evaluate actual browser matrix needs carefully`,
    notes: [
      'If Safari risk matters, Playwright usually becomes more compelling.',
      'Not every product needs a large browser matrix, but teams should decide that explicitly.',
    ],
  },
  {
    id: 'examples-decision-frame',
    title: 'Decision Frame Example',
    description: [
      'A useful evaluation starts with the shape of the real test suite rather than brand loyalty.',
    ],
    code: `Question 1:
Do we mainly need polished frontend end-to-end workflows?

Question 2:
Do we need broad cross-browser coverage?

Question 3:
Do we want one tool for broader browser automation too?`,
    notes: [
      'If only the first question matters strongly, Cypress may be enough.',
      'If the second and third questions matter strongly, Playwright is often the better fit.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-cypress',
    title: 'Cypress Terms',
    terms: [
      {
        term: 'Cypress',
        definition:
          'A browser testing framework known for an interactive runner and a strong frontend developer experience.',
      },
      {
        term: 'Command Queue',
        definition:
          'The Cypress execution model in which commands are scheduled and run in sequence rather than as ordinary immediate JavaScript calls.',
      },
      {
        term: 'Time-Travel Debugging',
        definition:
          'A debugging style where prior command states and snapshots can be inspected as the test runs.',
      },
      {
        term: 'Spec Runner',
        definition: 'The Cypress interface used to run, inspect, and debug tests interactively.',
      },
    ],
  },
  {
    id: 'glossary-playwright',
    title: 'Playwright Terms',
    terms: [
      {
        term: 'Playwright',
        definition:
          'A browser automation framework with strong support for end-to-end testing, cross-browser execution, and broader automation scenarios.',
      },
      {
        term: 'Browser Context',
        definition:
          'An isolated browser session used to simulate separate users or independent environments within one browser instance.',
      },
      {
        term: 'Trace',
        definition:
          'A recorded execution artifact that captures actions, network behavior, screenshots, and debugging details for a test run.',
      },
      {
        term: 'Project',
        definition:
          'A Playwright test configuration unit often used to run the same suite across different browsers or environments.',
      },
    ],
  },
  {
    id: 'glossary-shared',
    title: 'Shared Testing Terms',
    terms: [
      {
        term: 'End-to-End Test',
        definition:
          'A test that exercises a real user flow across the application boundary rather than isolated internal functions.',
      },
      {
        term: 'Flaky Test',
        definition:
          'A test that sometimes passes and sometimes fails without a real product change.',
      },
      {
        term: 'Selector',
        definition: 'A mechanism used by a test to locate elements in the page DOM.',
      },
      {
        term: 'Cross-Browser Testing',
        definition:
          'Running tests across multiple browser engines to increase confidence that behavior is consistent for users.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-core-difference', label: 'The Core Difference' },
    { id: 'bp-when-cypress-fits', label: 'When Cypress Is Usually the Better Fit' },
    { id: 'bp-when-playwright-fits', label: 'When Playwright Is Usually the Better Fit' },
    { id: 'bp-hidden-tradeoff', label: 'The Hidden Tradeoff' },
    { id: 'bp-decision-checklist', label: 'Decision Checklist' },
  ],
  'core-concepts': [
    { id: 'core-execution-model', label: 'Execution Model' },
    { id: 'core-browser-support', label: 'Browser Support' },
    { id: 'core-debugging', label: 'Debugging Experience' },
    { id: 'core-parallelism-ci', label: 'Parallelism and CI Fit' },
    { id: 'core-test-scope', label: 'Test Scope and Breadth' },
    { id: 'core-learning-curve', label: 'Learning Curve' },
    { id: 'core-architecture', label: 'Test Architecture and Maintainability' },
    { id: 'core-flakiness', label: 'Reliability and Flakiness' },
    { id: 'core-ecosystem', label: 'Ecosystem and Team Fit' },
    { id: 'core-tradeoffs', label: 'Tradeoffs' },
  ],
  examples: [
    { id: 'examples-cypress-shape', label: 'Cypress Test Shape' },
    { id: 'examples-playwright-shape', label: 'Playwright Test Shape' },
    { id: 'examples-cross-browser', label: 'Cross-Browser Strategy' },
    { id: 'examples-decision-frame', label: 'Decision Frame Example' },
  ],
  glossary: [
    { id: 'glossary-cypress', label: 'Cypress Terms' },
    { id: 'glossary-playwright', label: 'Playwright Terms' },
    { id: 'glossary-shared', label: 'Shared Testing Terms' },
  ],
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="play-cypress-help-section">
      <h2 className="play-cypress-help-heading">{section.title}</h2>
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
      {isLast ? null : <hr className="play-cypress-help-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="play-cypress-help-section">
      <h2 className="play-cypress-help-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="play-cypress-help-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="play-cypress-help-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="play-cypress-help-section">
      <h2 className="play-cypress-help-heading">{section.title}</h2>
      {section.terms.map((item) => (
        <p key={item.term}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="play-cypress-help-divider" />}
    </section>
  )
}

export default function PlaywrightVsCypressPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Playwright vs Cypress',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Playwright vs Cypress"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Playwright vs Cypress</h1>
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
