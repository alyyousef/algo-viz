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
  'Microservices and monoliths are often framed as a maturity ladder, but that framing is shallow and usually wrong. A monolith is a deployment shape in which the application is released and operated as one unit. Microservices are a distributed architecture in which the system is split into separately deployable services with explicit network boundaries. The real question is not which one sounds more modern. The real question is which model best matches the size of the system, the shape of the domain, the operational discipline of the team, and the costs the organization is prepared to absorb.',
  'A monolith is not automatically poorly designed, and microservices are not automatically well designed. A disciplined monolith with clear internal modules can be easier to reason about, faster to ship, cheaper to run, and easier to test end to end. Microservices can unlock independent deployment, team autonomy, and scaling flexibility, but they also introduce the permanent costs of a distributed system. The right comparison is therefore about coupling, ownership, deployment, reliability, coordination, and long-term organizational fit.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'A monolith packages most or all application functionality into one deployable unit. That does not mean the code must be one giant file or one giant layer. A good monolith can still have strong modular boundaries, well-defined domain concepts, and careful internal abstractions. What makes it a monolith is that deployment and runtime are mostly unified.',
      'Microservices divide the application into multiple separately deployable services, usually aligned to business capabilities or bounded contexts. Each service can have its own codebase, deployment cadence, data ownership, and scaling profile. The advantage is autonomy and isolation. The cost is that communication moves across the network, failures become partial instead of local, and basic cross-cutting concerns become much harder.',
    ],
  },
  {
    id: 'bp-core-difference',
    title: 'The Core Difference',
    paragraphs: [
      'The key difference is where boundaries become expensive and enforceable. In a monolith, boundaries are mostly logical and enforced by code structure, review discipline, and architecture. In microservices, boundaries are physical as well as logical because service calls cross process and network boundaries.',
      'That physical separation creates both the value and the cost of microservices. Value comes from stronger isolation and independent evolution. Cost comes from latency, retries, partial failure, compatibility management, deployment orchestration, observability, and operational burden.',
    ],
    bullets: [
      'A monolith optimizes for simplicity of deployment and unified reasoning.',
      'Microservices optimize for independent deployment and organizational autonomy.',
      'A monolith pays less distributed-system tax.',
      'Microservices pay more tax in exchange for stronger runtime separation.',
    ],
  },
  {
    id: 'bp-when-monolith-fits',
    title: 'When a Monolith Is Usually the Better Fit',
    paragraphs: [
      'A monolith is usually the better fit for early-stage products, smaller teams, simpler domains, and systems where most features evolve together. If the same team changes many parts of the system at once and the release cadence is shared anyway, splitting into services often creates overhead without creating real autonomy.',
      'Monoliths are also strong when the business needs fast iteration, straightforward local development, easy transactional consistency, and simpler end-to-end debugging. Many organizations should stay monolithic much longer than they initially expect.',
    ],
    bullets: [
      'Small to medium teams with shared ownership.',
      'Products still discovering the domain and changing rapidly.',
      'Need for fast local development and simple end-to-end debugging.',
      'Systems where transactional workflows span many features tightly.',
    ],
  },
  {
    id: 'bp-when-microservices-fit',
    title: 'When Microservices Are Usually the Better Fit',
    paragraphs: [
      'Microservices are usually justified when the system has grown large enough that different parts need to evolve, scale, or operate independently, and when those differences map to clear service boundaries. They are most effective when the organization already has multiple teams with stable ownership and enough operational maturity to handle the consequences.',
      'Microservices are especially useful when different capabilities have sharply different performance profiles, compliance requirements, uptime expectations, or technology needs, and when those differences are durable rather than temporary.',
    ],
    bullets: [
      'Multiple teams need real autonomy with clear ownership lines.',
      'Different subsystems scale differently or release on different cadences.',
      'Certain domains need isolation for reliability, compliance, or security.',
      'The organization can support platform tooling, observability, and service governance.',
    ],
  },
  {
    id: 'bp-false-binary',
    title: 'Why the Comparison Is Often a False Binary',
    paragraphs: [
      'The most useful path is often not monolith forever or microservices everywhere. Many healthy systems start as a monolith, become a modular monolith, and only extract services where the boundary is proven by real pressure. That pressure may come from scale, team growth, reliability isolation, or deployment friction.',
      'The bad path is starting with microservices because they sound advanced, or keeping a collapsing monolith because service extraction sounds painful. Both are forms of avoiding the real architecture question, which is where boundaries create enough benefit to justify their cost.',
    ],
  },
  {
    id: 'bp-decision-checklist',
    title: 'Decision Checklist',
    paragraphs: [
      'A good decision starts by separating local code-organization pain from actual distributed-system need. Many codebase problems are solved by better modularity, not by network boundaries. Many deployment problems are solved by better automation, not by more services.',
    ],
    bullets: [
      'Choose a monolith when the system mostly changes together.',
      'Choose microservices when parts truly need independent ownership and operation.',
      'Prefer a modular monolith before premature service extraction.',
      'Do not adopt microservices unless the organization can carry the operational cost.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-deployment-unit',
    title: 'Deployment Unit',
    paragraphs: [
      'In a monolith, most application logic is delivered as one deployable artifact or one coordinated runtime unit. That simplifies release management because there is one deployment pipeline, one environment shape, and one runtime topology to reason about.',
      'In microservices, each service is usually built and deployed independently. That can increase release flexibility, but it also multiplies the number of pipelines, service contracts, environments, and rollback scenarios. Independent deployment is valuable only if the organization actually benefits from using it.',
    ],
  },
  {
    id: 'core-coupling',
    title: 'Coupling',
    paragraphs: [
      'A monolith often has lower operational coupling because calls remain in process, but it can still have high design coupling if the codebase is not modular. That is why monolith versus microservices is not the same as bad design versus good design.',
      'Microservices can reduce codebase coupling across major domains by creating hard boundaries, but they often increase temporal and operational coupling through service contracts, network dependencies, retries, and version coordination. They reduce one kind of coupling by introducing another.',
    ],
  },
  {
    id: 'core-data-boundaries',
    title: 'Data Ownership and Consistency',
    paragraphs: [
      'A monolith makes transactional consistency easier because related workflows can often execute against one database transaction and one in-process model. This is a major reason monoliths remain practical for a long time.',
      'Microservices usually push teams toward service-owned data and asynchronous coordination. That improves autonomy and isolation, but it makes cross-service consistency harder. Teams must reason about eventual consistency, idempotency, compensating actions, and failures that happen after partial success.',
    ],
  },
  {
    id: 'core-scaling',
    title: 'Scaling Behavior',
    paragraphs: [
      'A monolith usually scales as one unit, which can be inefficient when only one part of the system is hot. However, that inefficiency is often acceptable for a long time, especially when infrastructure is cheap relative to engineering complexity.',
      'Microservices allow different services to scale independently based on workload shape. That is powerful when one subsystem is far hotter than the rest, but it should be justified by real traffic patterns rather than hypothetical future scale.',
    ],
  },
  {
    id: 'core-reliability',
    title: 'Reliability and Failure Modes',
    paragraphs: [
      'A monolith can fail catastrophically because many features share one runtime, but it is also simpler to trace because most failures stay within one process boundary. Logging, debugging, and local reproduction are usually more direct.',
      'Microservices can improve blast-radius isolation when services are properly separated, but they create many new failure modes: timeouts, retries, queue buildup, partial responses, schema drift, and cascading dependency failures. Reliability does not come for free just because services are separated.',
    ],
  },
  {
    id: 'core-organization',
    title: 'Team and Organization Design',
    paragraphs: [
      'Architecture should match the organization. A monolith often works best when one team or a small number of closely collaborating teams own most of the product and can coordinate changes efficiently.',
      'Microservices fit organizations where service ownership is durable, team boundaries are stable, and platform support exists for build pipelines, observability, incident response, service discovery, and policy enforcement. Without that organizational base, microservices often become confusion at scale.',
    ],
  },
  {
    id: 'core-developer-experience',
    title: 'Developer Experience',
    paragraphs: [
      'A monolith usually gives a better local development story. One repository, one runtime, one debugger, one end-to-end environment, and fewer contract boundaries can dramatically improve day-to-day productivity.',
      'Microservices can improve focus by reducing the amount of one codebase each team must understand, but they often make local development harder because reproducing behavior may require many dependent services, mocks, seeded environments, or remote dev stacks.',
    ],
  },
  {
    id: 'core-cost',
    title: 'Cost Model',
    paragraphs: [
      'Monoliths are often cheaper to build and run at small to medium scale because the platform surface area is smaller. There are fewer pipelines, fewer dashboards, fewer service instances, and less network choreography.',
      'Microservices usually raise engineering and operational cost even when infrastructure cost is acceptable. The real bill is not only compute. It is architecture reviews, service templates, API governance, CI complexity, on-call burden, debugging time, and the need for stronger platform engineering.',
    ],
  },
  {
    id: 'core-migration',
    title: 'Migration Paths',
    paragraphs: [
      'A healthy migration path usually starts with improving modularity inside the monolith. Once domain boundaries are clear and the team can measure where friction actually exists, targeted extraction becomes safer and more meaningful.',
      'Attempting a full rewrite from monolith to microservices in one move is usually high risk. Incremental extraction from proven seams is more realistic because it preserves business continuity and allows teams to learn where service boundaries are actually stable.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs',
    paragraphs: [
      'Monoliths usually win on simplicity, transactional coherence, end-to-end reasoning, and fast iteration for small or medium teams. Microservices usually win on hard isolation, independent scaling, and organizational autonomy when service boundaries are real and durable.',
      'The mistake is treating microservices as an upgrade badge or monoliths as a sign of immaturity. The better architecture is the one whose costs you can actually pay while meeting product needs.',
    ],
    bullets: [
      'Choose a monolith for simplicity, speed, and unified reasoning.',
      'Choose microservices for independent ownership, scaling, and operational isolation.',
      'Use modular design either way.',
      'Let real pressure, not fashion, drive service extraction.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-monolith-shape',
    title: 'Monolith Shape',
    description: [
      'A monolith can still have strong internal modules even though deployment is unified.',
    ],
    code: `application
  -> auth module
  -> billing module
  -> orders module
  -> catalog module
single deployable unit`,
    notes: [
      'The code can be modular even when runtime deployment is unified.',
      'This shape is often enough for a long time if the team enforces internal boundaries.',
    ],
  },
  {
    id: 'examples-microservices-shape',
    title: 'Microservices Shape',
    description: [
      'A microservice system turns some of those internal module boundaries into service boundaries across processes.',
    ],
    code: `api-gateway
  -> auth-service
  -> billing-service
  -> orders-service
  -> catalog-service
separate deployable units`,
    notes: [
      'The benefit is independent deployment and stronger isolation.',
      'The cost is network communication, contract management, and operational overhead.',
    ],
  },
  {
    id: 'examples-modular-monolith',
    title: 'Modular Monolith as a Stepping Stone',
    description: [
      'A modular monolith often provides the best learning path before extracting services.',
    ],
    code: `internal modules
  -> explicit interfaces
  -> limited cross-module access
  -> shared deployable artifact

extract only proven hot or high-friction boundaries`,
    notes: [
      'This keeps deployment simple while improving architectural discipline.',
      'It also reveals whether a proposed service boundary is real or imagined.',
    ],
  },
  {
    id: 'examples-decision-frame',
    title: 'Decision Frame Example',
    description: [
      'A clean comparison asks whether the organization needs distributed boundaries badly enough to justify their cost.',
    ],
    code: `Question 1:
Does the system mostly change together?

Question 2:
Do teams need independent deployment and ownership?

Question 3:
Can the organization operate distributed systems well?`,
    notes: [
      'If the answer to the first question is yes, a monolith is often correct.',
      'If the answer to the second and third questions is strongly yes, microservices may be justified.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-monolith',
    title: 'Monolith Terms',
    terms: [
      {
        term: 'Monolith',
        definition:
          'An application delivered and operated primarily as one deployable unit, even if the code is internally modular.',
      },
      {
        term: 'Modular Monolith',
        definition:
          'A monolith with strong internal module boundaries and explicit domain separation, but still one deployment unit.',
      },
      {
        term: 'In-Process Call',
        definition:
          'A function or method call that occurs inside one runtime rather than across the network.',
      },
      {
        term: 'Transactional Consistency',
        definition:
          'The ability to apply related changes atomically so a workflow succeeds or fails as one unit.',
      },
    ],
  },
  {
    id: 'glossary-microservices',
    title: 'Microservices Terms',
    terms: [
      {
        term: 'Microservice',
        definition:
          'A separately deployable service aligned to one bounded capability or domain area.',
      },
      {
        term: 'Service Boundary',
        definition:
          'The line that defines what logic, data, and responsibility belong inside one service.',
      },
      {
        term: 'Eventual Consistency',
        definition:
          'A model in which data becomes consistent over time rather than immediately in one transaction.',
      },
      {
        term: 'Blast Radius',
        definition: 'The scope of impact a failure can have on the larger system.',
      },
    ],
  },
  {
    id: 'glossary-shared',
    title: 'Shared Architecture Terms',
    terms: [
      {
        term: 'Bounded Context',
        definition:
          'A domain boundary within which one model and one business language remain consistent.',
      },
      {
        term: 'Coupling',
        definition:
          'The degree to which one part of the system depends on another part to change, run, or evolve.',
      },
      {
        term: 'Independent Deployment',
        definition:
          'The ability to release one part of the system without redeploying everything else.',
      },
      {
        term: 'Distributed-System Tax',
        definition:
          'The ongoing complexity added by network calls, partial failure, coordination, and operational tooling.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-core-difference', label: 'The Core Difference' },
    { id: 'bp-when-monolith-fits', label: 'When a Monolith Is Usually the Better Fit' },
    { id: 'bp-when-microservices-fit', label: 'When Microservices Are Usually the Better Fit' },
    { id: 'bp-false-binary', label: 'Why the Comparison Is Often a False Binary' },
    { id: 'bp-decision-checklist', label: 'Decision Checklist' },
  ],
  'core-concepts': [
    { id: 'core-deployment-unit', label: 'Deployment Unit' },
    { id: 'core-coupling', label: 'Coupling' },
    { id: 'core-data-boundaries', label: 'Data Ownership and Consistency' },
    { id: 'core-scaling', label: 'Scaling Behavior' },
    { id: 'core-reliability', label: 'Reliability and Failure Modes' },
    { id: 'core-organization', label: 'Team and Organization Design' },
    { id: 'core-developer-experience', label: 'Developer Experience' },
    { id: 'core-cost', label: 'Cost Model' },
    { id: 'core-migration', label: 'Migration Paths' },
    { id: 'core-tradeoffs', label: 'Tradeoffs' },
  ],
  examples: [
    { id: 'examples-monolith-shape', label: 'Monolith Shape' },
    { id: 'examples-microservices-shape', label: 'Microservices Shape' },
    { id: 'examples-modular-monolith', label: 'Modular Monolith as a Stepping Stone' },
    { id: 'examples-decision-frame', label: 'Decision Frame Example' },
  ],
  glossary: [
    { id: 'glossary-monolith', label: 'Monolith Terms' },
    { id: 'glossary-microservices', label: 'Microservices Terms' },
    { id: 'glossary-shared', label: 'Shared Architecture Terms' },
  ],
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="bin98-section">
      <h2 className="bin98-heading">{section.title}</h2>
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
      {isLast ? null : <hr className="bin98-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="bin98-section">
      <h2 className="bin98-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="bin98-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="bin98-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="bin98-section">
      <h2 className="bin98-heading">{section.title}</h2>
      {section.terms.map((item) => (
        <p key={item.term}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="bin98-divider" />}
    </section>
  )
}

export default function MicroservicesVsMonolithPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Microservices vs Monolith',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Microservices vs Monolith"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Microservices vs Monolith</h1>
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
