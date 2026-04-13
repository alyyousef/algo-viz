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
  'Microservices and serverless are often compared as if they are opposing choices, but they describe different architectural dimensions. Microservices describe how an application is decomposed into independent services around business capabilities. Serverless describes how code is run and operated, usually through managed execution platforms that reduce infrastructure management. That means the two approaches can compete in some situations, but they can also be combined.',
  'The useful comparison is not one buzzword versus another. The useful comparison is where the operational burden lives, how the system is decomposed, how teams own components, how scaling behaves, and how much platform control the organization wants to retain. Microservices are often about bounded services and team autonomy. Serverless is often about reducing infrastructure management and scaling responsibilities through managed cloud primitives.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Microservices break an application into separately deployable services, usually aligned to business capabilities or bounded contexts. Each service can have its own lifecycle, runtime, deployment cadence, and team ownership. The cost is distributed-system complexity: networking, observability, resilience, consistency, and coordination become harder.',
      'Serverless shifts more operational work to the platform provider. Functions, managed APIs, event triggers, managed messaging, and managed storage allow teams to focus more on application code and less on provisioning or scaling servers directly. The cost is reduced control, platform constraints, and often more dependence on a specific cloud provider’s execution model.',
    ],
  },
  {
    id: 'bp-shared-goal',
    title: 'What They Share',
    paragraphs: [
      'Both approaches are often adopted for speed, scalability, and organizational flexibility. Both can support event-driven design, independent deployment of logical units, and alignment between technical boundaries and business capabilities.',
      'They also share many of the same risks when used carelessly. Both can lead to fragmentation, inconsistent boundaries, higher debugging complexity, and a system that is harder to reason about if the decomposition is driven by hype rather than by clear domain or operational needs.',
    ],
    bullets: [
      'Both can support independently evolving units of application behavior.',
      'Both can help teams move faster when boundaries are chosen well.',
      'Both can increase system complexity if decomposition is premature.',
      'Both benefit from strong observability, testing, and boundary discipline.',
    ],
  },
  {
    id: 'bp-when-microservices-fit',
    title: 'When Microservices Are Usually the Better Fit',
    paragraphs: [
      'Microservices are usually the better fit when the organization truly needs independent services with separate team ownership, separate scaling characteristics, different deployment cadences, or different technology choices. They are often justified when the platform problem is organizational as much as technical.',
      'They are especially useful in large systems where several teams must work semi-independently and where service boundaries genuinely match different business capabilities with distinct operational needs.',
    ],
    bullets: [
      'Large teams with clear service ownership boundaries.',
      'Different parts of the system scaling or evolving at different rates.',
      'Need for independent deployment and lifecycle control.',
      'Organizations able to absorb distributed-system complexity deliberately.',
    ],
  },
  {
    id: 'bp-when-serverless-fits',
    title: 'When Serverless Is Usually the Better Fit',
    paragraphs: [
      'Serverless is usually the better fit when the team wants to reduce infrastructure management, move quickly with managed services, and scale based on event-driven or bursty workloads without managing servers directly. It is especially attractive for event handlers, APIs, automation pipelines, background tasks, and systems with variable or spiky load.',
      'It is also attractive for smaller teams that need operational leverage and for workloads where provider-managed scaling and reduced platform maintenance are more valuable than full infrastructure control.',
    ],
    bullets: [
      'Smaller teams seeking operational leverage.',
      'Event-driven or bursty workloads.',
      'Systems that benefit from managed execution and reduced ops surface area.',
      'Projects where speed of delivery matters more than deep platform control.',
    ],
  },
  {
    id: 'bp-when-both-fit',
    title: 'When They Fit Together',
    paragraphs: [
      'A system can absolutely use both. Some organizations build serverless microservices, where each service is still a bounded capability but is implemented on serverless infrastructure. In other cases, serverless functions support a larger microservice ecosystem for edge processing, scheduled jobs, or event fan-out.',
      'This is why the comparison must be framed carefully. Microservices answer the decomposition question. Serverless answers the execution and operations question. Sometimes one decision heavily influences the other, but they are not the same kind of decision.',
    ],
  },
  {
    id: 'bp-decision-checklist',
    title: 'Decision Checklist',
    paragraphs: [
      'The cleanest way to choose is to ask whether the real problem is service decomposition or infrastructure management. If the problem is team autonomy and independent service boundaries, microservices may be appropriate. If the problem is operational burden and scaling undifferentiated glue logic, serverless may be appropriate.',
    ],
    bullets: [
      'Choose microservices when independent bounded services are the real need.',
      'Choose serverless when reducing infrastructure management is the real need.',
      'Use both when bounded capabilities should still run on managed event-driven infrastructure.',
      'Do not decompose or platform-shift unless the organization benefits materially.',
    ],
  },
]

const coreConceptSectionsBase: ContentSection[] = [
  {
    id: 'core-dimension-of-choice',
    title: 'Different Dimensions of Architecture',
    paragraphs: [
      'Microservices and serverless operate on different axes. Microservices define how many application units exist and how they relate. Serverless defines how those units are hosted, scaled, and triggered. Confusing these two dimensions leads to bad architectural conversations.',
      'A monolithic application can use serverless components. A microservice can run on containers. A microservice can also run on serverless functions. The real architectural question is which combination solves the actual business and operational problem with the lowest long-term cost.',
    ],
  },
  {
    id: 'core-boundaries',
    title: 'Boundaries and Ownership',
    paragraphs: [
      'Microservices require explicit service boundaries. Those boundaries should usually correspond to business capabilities, team ownership, and operational independence. If they do not, the system becomes a distributed tangle rather than a meaningful service architecture.',
      'Serverless boundaries are often smaller and more event- or function-oriented. That can accelerate delivery for discrete workflows, but it can also create fragmentation if the team mistakes every small function boundary for a healthy domain boundary.',
    ],
  },
  {
    id: 'core-operations',
    title: 'Operational Responsibility',
    paragraphs: [
      'Microservices often increase operational responsibility because every separate service creates more deployments, more networking, more observability surfaces, and more failure modes. The payoff is control and independent evolution when the organization is large enough to benefit.',
      'Serverless often reduces operational responsibility for infrastructure by shifting scaling, provisioning, and some runtime concerns to the platform. The payoff is speed and reduced ops burden, but the tradeoff is less control and greater provider coupling.',
    ],
  },
  {
    id: 'core-scaling',
    title: 'Scaling Model',
    paragraphs: [
      'Microservices allow different services to scale independently based on their own resource profiles, which can be valuable in systems where workloads differ sharply across business capabilities.',
      'Serverless often provides highly elastic scaling behavior out of the box, which is valuable for unpredictable or bursty workloads. The tradeoff is that the team accepts the platform’s execution constraints, lifecycle model, and provider limits as part of the design.',
    ],
  },
  {
    id: 'core-cost-model',
    title: 'Cost Model',
    paragraphs: [
      'Microservices usually increase platform overhead because each service needs build, deploy, monitor, secure, and runtime support. The cost can be justified in large organizations that gain enough autonomy and scaling flexibility from that decomposition.',
      'Serverless can reduce costs for intermittent or variable workloads because execution is often tied more directly to usage. But it can become less attractive for steady high-throughput workloads or when platform-specific operational patterns create hidden complexity elsewhere.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  ...coreConceptSectionsBase,
  {
    id: 'core-latency-state',
    title: 'Latency, State, and Execution Model',
    paragraphs: [
      'Microservices often run as long-lived services, which makes them natural for stateful in-memory caches, long-running network connections, and predictable low-latency service behavior when the system is provisioned appropriately.',
      'Serverless functions often run in shorter-lived, provider-managed execution environments. This is excellent for stateless event-driven processing, but the execution model changes how teams think about cold starts, long-lived state, and connection management.',
    ],
  },
  {
    id: 'core-platform-lock-in',
    title: 'Platform Coupling and Lock-In',
    paragraphs: [
      'Microservices often increase dependence on internal platform tooling and organizational capabilities, but they do not necessarily force a very specific managed execution environment. Teams usually retain more control over runtime and hosting decisions.',
      'Serverless often increases coupling to the provider’s event model, deployment model, service integrations, and operational constraints. That can be completely acceptable if the platform leverage is worth it, but it should be an explicit tradeoff rather than an accidental one.',
    ],
  },
  {
    id: 'core-team-fit',
    title: 'Team and Organization Fit',
    paragraphs: [
      'Microservices fit organizations that can support strong platform engineering, observability, deployment automation, and service ownership at scale. The model pays off most when those organizational capabilities already exist or are clearly justified.',
      'Serverless fits organizations that want to move quickly with less infrastructure ownership, especially when workloads are event-driven and teams are not trying to become full-time infrastructure operators. It often gives smaller teams disproportionate leverage.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs',
    paragraphs: [
      'Microservices often win on explicit bounded service ownership, independent deployment, and control over runtime architecture. Serverless often wins on speed, elasticity, and reduced infrastructure management. Neither is universally better because they optimize for different pressures.',
      'The common mistake is to think serverless is automatically simpler than microservices in every case, or that microservices are automatically more professional. Serverless can become fragmented if overused, and microservices can become expensive chaos if adopted before the organization is ready.',
    ],
    bullets: [
      'Choose microservices for explicit bounded services and independent runtime control.',
      'Choose serverless for managed execution and operational leverage.',
      'Use both when bounded services still benefit from event-driven managed infrastructure.',
      'Do not adopt either pattern unless the organization can support its real tradeoffs.',
    ],
  },
  {
    id: 'core-architecture-guidance',
    title: 'Architecture Guidance',
    paragraphs: [
      'If the application’s main need is splitting large business capabilities across independent teams and runtimes, start by reasoning about service boundaries. That may lead to microservices, whether they run on containers, VMs, or serverless infrastructure.',
      'If the application’s main need is reducing infrastructure burden for APIs, event handlers, scheduled work, and asynchronous workflows, start by reasoning about managed execution. That may lead to serverless, whether the application remains monolithic, modular, or service-oriented.',
      'Good architecture comes from matching the decomposition model and the execution model separately instead of forcing one label to answer both questions.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-microservices-shape',
    title: 'Microservice Shape',
    description: [
      'Microservices usually look like several separately deployed application services, each aligned with one bounded capability or domain area.',
    ],
    code: `api-gateway
  -> orders-service
  -> billing-service
  -> catalog-service
  -> identity-service`,
    notes: [
      'The emphasis is on service ownership and independent deployment.',
      'This model creates real distributed-system overhead that must be justified.',
    ],
  },
  {
    id: 'examples-serverless-shape',
    title: 'Serverless Shape',
    description: [
      'Serverless architectures often look like event-driven functions connected to managed services rather than long-lived service processes.',
    ],
    code: `HTTP event -> function
Queue message -> function
File upload -> function
Scheduled trigger -> function`,
    notes: [
      'The emphasis is on managed execution and event-triggered compute.',
      'This is powerful for glue logic, APIs, automation, and bursty workloads.',
    ],
  },
  {
    id: 'examples-both',
    title: 'Using Both Together',
    description: [
      'A real system may combine service decomposition with serverless execution where the combination makes sense.',
    ],
    code: `payments service -> serverless handlers
notifications service -> serverless event consumers
core stateful service -> long-lived containerized runtime`,
    notes: [
      'This is often more realistic than choosing one label for the whole platform.',
      'Different capabilities can justify different execution models.',
    ],
  },
  {
    id: 'examples-decision-frame',
    title: 'Decision Frame Example',
    description: [
      'The best way to avoid confusion is to separate the service-boundary question from the hosting-model question.',
    ],
    code: `Question 1:
Do we need independent bounded services?

Question 2:
How should those units run and scale?`,
    notes: [
      'Microservices answer the first question.',
      'Serverless often answers the second question.',
      'Conflating them leads to confused architecture discussions.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-microservices',
    title: 'Microservices Terms',
    terms: [
      {
        term: 'Microservice',
        definition:
          'A separately deployable service aligned to a bounded capability or domain area.',
      },
      {
        term: 'Service Boundary',
        definition:
          'The line that defines what logic, data, and responsibilities belong inside one service.',
      },
      {
        term: 'Independent Deployment',
        definition:
          'The ability to change and release one service without redeploying the entire system.',
      },
      {
        term: 'Distributed System',
        definition:
          'A system composed of many network-connected components that must coordinate despite latency and partial failure.',
      },
    ],
  },
  {
    id: 'glossary-serverless',
    title: 'Serverless Terms',
    terms: [
      {
        term: 'Function as a Service',
        definition:
          'A managed execution model where individual functions run in response to events or requests.',
      },
      {
        term: 'Cold Start',
        definition:
          'The startup latency that can occur when a serverless function is invoked in a new execution environment.',
      },
      {
        term: 'Managed Execution',
        definition:
          'A hosting model where the platform provider manages much of the runtime provisioning and scaling behavior.',
      },
      {
        term: 'Event Trigger',
        definition:
          'A platform event such as an HTTP request, queue message, or file upload that invokes serverless code.',
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
          'A domain boundary within which one model and one language of business meaning remain consistent.',
      },
      {
        term: 'Elastic Scaling',
        definition:
          'The ability to scale execution resources up or down automatically in response to workload changes.',
      },
      {
        term: 'Operational Burden',
        definition:
          'The engineering effort required to run, monitor, secure, and maintain production systems.',
      },
      {
        term: 'Provider Coupling',
        definition:
          'Dependence on the specific APIs, services, and operational patterns of one cloud platform.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-shared-goal', label: 'What They Share' },
    { id: 'bp-when-microservices-fit', label: 'When Microservices Are Usually the Better Fit' },
    { id: 'bp-when-serverless-fits', label: 'When Serverless Is Usually the Better Fit' },
    { id: 'bp-when-both-fit', label: 'When They Fit Together' },
    { id: 'bp-decision-checklist', label: 'Decision Checklist' },
  ],
  'core-concepts': [
    { id: 'core-dimension-of-choice', label: 'Different Dimensions of Architecture' },
    { id: 'core-boundaries', label: 'Boundaries and Ownership' },
    { id: 'core-operations', label: 'Operational Responsibility' },
    { id: 'core-scaling', label: 'Scaling Model' },
    { id: 'core-cost-model', label: 'Cost Model' },
    { id: 'core-latency-state', label: 'Latency, State, and Execution Model' },
    { id: 'core-platform-lock-in', label: 'Platform Coupling and Lock-In' },
    { id: 'core-team-fit', label: 'Team and Organization Fit' },
    { id: 'core-tradeoffs', label: 'Tradeoffs' },
    { id: 'core-architecture-guidance', label: 'Architecture Guidance' },
  ],
  examples: [
    { id: 'examples-microservices-shape', label: 'Microservice Shape' },
    { id: 'examples-serverless-shape', label: 'Serverless Shape' },
    { id: 'examples-both', label: 'Using Both Together' },
    { id: 'examples-decision-frame', label: 'Decision Frame Example' },
  ],
  glossary: [
    { id: 'glossary-microservices', label: 'Microservices Terms' },
    { id: 'glossary-serverless', label: 'Serverless Terms' },
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

export default function MicroservicesVsServerlessPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Microservices vs Serverless',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Microservices vs Serverless"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Microservices vs Serverless</h1>
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
