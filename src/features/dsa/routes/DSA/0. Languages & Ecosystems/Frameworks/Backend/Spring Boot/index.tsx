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
  'Spring Boot is a Java application framework built on top of the wider Spring ecosystem. It is designed to reduce setup friction for backend services by providing opinionated defaults, auto-configuration, production tooling, and conventions that let teams start quickly without wiring every framework detail by hand.',
  'The most useful way to think about Spring Boot is not as a completely separate framework from Spring, but as the practical application layer that makes Spring usable at product speed. It handles dependency management, embedded server setup, configuration loading, environment-specific behavior, observability hooks, packaging conventions, and production-friendly integration with the rest of the Spring stack.',
  'This page is intentionally thorough. It covers the architectural model, dependency injection and beans, auto-configuration, starters, configuration properties, MVC and reactive options, data access, transactions, testing, security, Actuator, deployment, common use cases, tradeoffs, and practical examples that show how Spring Boot is used in real backend services.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Spring Boot is a framework for building production-ready Java applications, especially backend services, APIs, web applications, and jobs. It packages the Spring programming model with conventions and defaults so teams can create runnable applications quickly without manually assembling every piece of infrastructure.',
      'The central benefit is not that Spring Boot removes complexity entirely. The benefit is that it shifts complexity into a consistent, opinionated structure. Instead of configuring everything from scratch, developers start with common patterns and then override them when the application really needs something different.',
    ],
  },
  {
    id: 'bp-why-it-matters',
    title: 'Why Spring Boot Matters',
    paragraphs: [
      'Large numbers of Java backend systems are built with Spring because the ecosystem is broad, mature, and operationally proven. Spring Boot matters because it makes that ecosystem practical for everyday delivery. Without it, teams would spend much more time wiring dependencies, configuring containers, and standardizing infrastructure decisions that most services want solved the same way.',
      'It is especially valuable in organizations that run many services because it creates repeatable architecture. Teams get familiar project structure, conventional configuration, common metrics and health patterns, and easier onboarding across applications.',
    ],
    bullets: [
      'Speeds up service setup with convention and auto-configuration.',
      'Provides a consistent production model for Java backend applications.',
      'Integrates deeply with the broader Spring ecosystem.',
      'Reduces infrastructure boilerplate without removing extensibility.',
    ],
  },
  {
    id: 'bp-mental-model',
    title: 'Mental Model',
    paragraphs: [
      'The right mental model is an opinionated application runtime built around dependency injection, convention-driven configuration, embedded infrastructure, and framework-managed composition. You declare capabilities through dependencies and annotations, and Spring Boot assembles a working application context around them.',
      'That means the framework is not just a web router. It is the environment that manages object creation, application startup, lifecycle, configuration, transactions, validation, HTTP layers, integration points, and production operations. Understanding that container model is more important than memorizing individual annotations.',
    ],
    bullets: [
      'Think application container, not just request handler library.',
      'Think convention first, then explicit override when needed.',
      'Think beans, configuration, lifecycle, and runtime composition.',
    ],
  },
  {
    id: 'bp-when-it-fits',
    title: 'When Spring Boot Fits Best',
    paragraphs: [
      'Spring Boot fits best for backend APIs, business applications, microservices, internal platforms, event-driven services, batch jobs, and enterprise systems where teams want strong ecosystem integration, long-term maintainability, and mature production tooling. It is particularly effective when the surrounding architecture already values Java, the JVM, and convention-based frameworks.',
      'It is also strong when applications need several concerns at once: web APIs, security, validation, database access, messaging, monitoring, and deployment-ready packaging. Spring Boot handles these combinations well because its ecosystem is designed around composition.',
    ],
    bullets: [
      'Backend services with multiple cross-cutting concerns.',
      'Organizations that want repeatable service structure across teams.',
      'Applications needing strong framework integration around data, security, and operations.',
      'Long-lived systems where ecosystem maturity matters.',
    ],
  },
  {
    id: 'bp-when-it-does-not-fit',
    title: 'Where Spring Boot Is Not the Best Default',
    paragraphs: [
      'Spring Boot is not automatically the right answer for tiny programs, simple scripts, or workloads where the framework overhead outweighs the operational value. If an application only needs a minimal HTTP endpoint or a lightweight local tool, a smaller framework may be easier to understand and faster to iterate.',
      'It can also be the wrong fit when teams do not want or need the Spring programming model. Spring Boot works best when developers are willing to embrace inversion of control, framework-managed lifecycle, and its conventions rather than fighting them at every turn.',
    ],
    bullets: [
      'Very small applications that do not benefit from container-managed architecture.',
      'Teams that want a minimal framework with less abstraction.',
      'Cases where startup profile or memory footprint must stay extremely small.',
      'Projects that do not need the Spring ecosystem at all.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Key Takeaways',
    paragraphs: [
      'Spring Boot is effective because it turns the broad Spring ecosystem into a consistent application platform. It saves time not by hiding all complexity, but by handling the common complexity in a reusable way.',
      'Its value appears most clearly in real backend systems where web layers, configuration, validation, persistence, security, and operations all have to work together under production conditions.',
    ],
    bullets: [
      'Choose Spring Boot when convention and ecosystem depth are advantages, not liabilities.',
      'Treat the application context and configuration model as core concepts.',
      'Use the framework to standardize service architecture, not just to generate files.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-what-it-is',
    title: 'What Spring Boot Actually Is',
    paragraphs: [
      'Spring Boot is the opinionated runtime and setup layer for Spring applications. It manages startup conventions, dependency alignment, auto-configuration, embedded servers, externalized configuration, operational endpoints, and production packaging. It is how many modern Spring applications are actually built and run.',
      'This matters because Boot changes the developer experience from "assemble Spring manually" to "start from a working application and customize deliberately." That shift is what makes Spring practical at scale for many teams.',
    ],
  },
  {
    id: 'core-application-context',
    title: 'Application Context and Bean Container',
    paragraphs: [
      'At the center of Spring Boot is the Spring application context, which manages beans and dependency injection. Beans are the objects the framework creates, wires together, configures, and lifecycle-manages. Controllers, services, repositories, configuration classes, data sources, security filters, and many infrastructure components all live inside this container.',
      'The most important architectural point is that the application is composed by the framework at startup. Developers define components and configuration, and the container decides how to instantiate and connect them. This is the inversion of control model that shapes how Spring applications are structured.',
    ],
  },
  {
    id: 'core-auto-configuration',
    title: 'Auto-Configuration',
    paragraphs: [
      'Auto-configuration is one of Spring Boots defining features. Based on dependencies on the classpath, configuration properties, and existing beans, Boot decides which infrastructure pieces to create automatically. Add web dependencies and you get a web stack. Add a database driver and data-source support appears. Add Actuator and management endpoints become available.',
      'Auto-configuration is powerful because it collapses repetitive setup. It is also a source of confusion when developers do not understand why a bean exists or why a default was chosen. Strong Spring Boot engineers know how to inspect and override auto-configuration rather than treating it like magic.',
    ],
    bullets: [
      'Boot configures common infrastructure from dependencies and environment.',
      'Defaults are useful, but they remain overridable.',
      'Understanding why a bean exists is more important than memorizing every annotation.',
    ],
  },
  {
    id: 'core-starters',
    title: 'Starters and Dependency Management',
    paragraphs: [
      'Spring Boot starters are curated dependency bundles for common use cases such as web, security, data access, messaging, and testing. They reduce the need to hand-pick dozens of library versions and keep the dependency graph aligned with the platform.',
      'This is a major operational benefit because version alignment and compatible library combinations are some of the hardest parts of framework-heavy Java projects. Boot moves those decisions into a managed platform layer.',
    ],
  },
  {
    id: 'core-configuration',
    title: 'Externalized Configuration',
    paragraphs: [
      'Spring Boot applications are heavily driven by configuration. Properties and YAML files, environment variables, command-line arguments, profile-specific overrides, and secrets from deployment environments all feed into the runtime. This makes one codebase adaptable across local development, testing, staging, and production.',
      'The strong practice is to treat configuration as structured application input, not as an ungoverned dumping ground. Clear naming, typed configuration properties, and predictable override rules make large applications easier to reason about.',
    ],
  },
  {
    id: 'core-configuration-properties',
    title: 'Configuration Properties and Typed Binding',
    paragraphs: [
      'Spring Boot supports binding configuration into typed classes so settings can be validated and consumed in a structured way. This is much safer than scattering raw string lookups throughout the codebase.',
      'Typed binding becomes increasingly valuable as a service grows because it gives configuration a real API. Instead of implicit property sprawl, the application defines what it expects and can validate that shape on startup.',
    ],
  },
  {
    id: 'core-profiles',
    title: 'Profiles and Environment-Specific Behavior',
    paragraphs: [
      'Profiles let Spring Boot vary beans and configuration by environment. Development, test, staging, and production can use different settings, and in some cases different component implementations. This is useful when environments genuinely differ in behavior or dependencies.',
      'Profiles should still be used carefully. Overusing them can make the application hard to reason about because behavior changes in too many hidden ways. The best use is for clear environment distinctions, not arbitrary branching.',
    ],
  },
  {
    id: 'core-web-mvc',
    title: 'Spring MVC and HTTP Request Handling',
    paragraphs: [
      'The most common Spring Boot web model is Spring MVC, which handles synchronous HTTP request-response applications. Controllers map routes, validation can run on inputs, argument binding converts request data into typed objects, and responses are serialized back to the client automatically.',
      'The practical advantage is consistency. Request handling, validation, error mapping, content negotiation, interceptors, and controller advice all live inside one coherent programming model.',
    ],
  },
  {
    id: 'core-webflux',
    title: 'WebFlux and Reactive Applications',
    paragraphs: [
      'Spring Boot can also run reactive applications through Spring WebFlux. This model is designed for asynchronous, non-blocking workloads and integrates with reactive programming styles. It is useful in the right workload, but it is not automatically better than MVC for ordinary business APIs.',
      'The real engineering question is whether the systems concurrency model, libraries, and performance needs justify reactive complexity. Many services remain simpler and clearer with the conventional MVC stack.',
    ],
  },
  {
    id: 'core-data-access',
    title: 'Data Access and Persistence Integration',
    paragraphs: [
      'Spring Boot integrates with relational and non-relational data systems through Spring Data and other ecosystem modules. Teams commonly use JPA, JDBC, transactions, repositories, entity mapping, and schema tools as part of the application architecture.',
      'This is one of Boots major strengths because it lets backend services compose web, service, and persistence layers inside one platform. The risk is becoming too dependent on abstractions without understanding what the database is actually doing underneath.',
    ],
  },
  {
    id: 'core-transactions',
    title: 'Transactions and Service Boundaries',
    paragraphs: [
      'Spring Boot applications often use declarative transactions around service methods. This gives business workflows a clear boundary for commit and rollback behavior and integrates naturally with database work in a service-oriented design.',
      'The key discipline is to place transactions at sensible service boundaries rather than scattering them thoughtlessly. Transaction scope affects correctness, isolation, performance, and failure behavior.',
    ],
  },
  {
    id: 'core-validation',
    title: 'Validation and Contract Enforcement',
    paragraphs: [
      'Spring Boot supports bean validation for request payloads, configuration properties, and domain objects. This helps push invalid state out of the system earlier and makes service contracts clearer.',
      'Validation matters most when treated as part of the system boundary design, not as decorative annotation noise. Inputs should be rejected intentionally, with useful error semantics, before broken assumptions spread deeper into the application.',
    ],
  },
  {
    id: 'core-security',
    title: 'Security Integration',
    paragraphs: [
      'Spring Boot works closely with Spring Security for authentication, authorization, session handling, token-based APIs, method security, and filter-based request protection. This gives services a strong platform for real production security concerns.',
      'Security is one of the places where Spring Boots integration depth matters most. The framework can provide a lot, but teams still need a clear threat model and careful configuration. Security cannot be outsourced to defaults alone.',
    ],
  },
  {
    id: 'core-actuator',
    title: 'Actuator, Health, and Observability',
    paragraphs: [
      'Actuator exposes production-oriented endpoints for health, metrics, environment inspection, and operational visibility. This makes Spring Boot strong in managed environments where orchestration, dashboards, alerting, and incident response all depend on application introspection.',
      'The important mindset is that observability is part of the application contract. Health checks, metrics, and traces are not extras once a service is in production.',
    ],
  },
  {
    id: 'core-testing',
    title: 'Testing Model',
    paragraphs: [
      'Spring Boot supports several testing levels, from plain unit tests to slice tests and full integration tests with an application context. This helps teams test business logic, web layers, configuration, and infrastructure behavior at appropriate cost levels.',
      'The danger is making every test a full context test. Good Spring Boot test strategy uses the lightest tool that actually proves the desired behavior.',
    ],
  },
  {
    id: 'core-packaging',
    title: 'Packaging and Deployment',
    paragraphs: [
      'Spring Boot applications are commonly packaged as executable jars with embedded servers, which simplifies deployment. They can run in containers, VM environments, platform services, or traditional server deployments without requiring a separate external servlet container for the common case.',
      'This packaging model is part of why Spring Boot became so dominant for service-oriented backend systems. It makes a Java application feel like a self-contained deployable unit rather than a complicated app-server artifact.',
    ],
  },
  {
    id: 'core-operations',
    title: 'Operations and Runtime Discipline',
    paragraphs: [
      'Healthy Spring Boot services still need attention to startup behavior, memory profile, thread usage, connection pools, HTTP timeouts, logging, health reporting, and dependency management. The framework handles a lot, but it does not eliminate the operational responsibilities of a production backend.',
      'Operational quality usually comes from combining framework conventions with deliberate service design. Teams that rely on defaults alone without measurement often discover performance and reliability problems later than they should.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance Mindset',
    paragraphs: [
      'Spring Boot performance work usually comes down to fundamentals: efficient I O paths, correct database usage, sensible serialization, bounded thread and connection resources, appropriate caching, and careful avoidance of unnecessary reflection-heavy or framework-heavy work on hot paths.',
      'The framework can support high-performance systems, but performance comes from architecture and measurement, not from assuming the framework will optimize everything automatically.',
    ],
    bullets: [
      'Profile actual bottlenecks instead of blaming the framework abstractly.',
      'Watch database and network behavior as closely as application code.',
      'Keep service boundaries and dependency graphs understandable.',
      'Use the simpler web model unless a more complex model is justified.',
    ],
  },
  {
    id: 'core-use-cases',
    title: 'Common Real-World Uses',
    paragraphs: [
      'Spring Boot is widely used for REST APIs, internal platforms, admin systems, enterprise integrations, event-driven backends, authentication systems, scheduling and batch workloads, gateway services, and business applications that need consistent layering around web, data, and operations.',
      'Its real strength is composition: one framework platform can handle many of the repeated concerns that serious backend systems face over time.',
    ],
  },
  {
    id: 'core-not-fit',
    title: 'When Not to Use Spring Boot',
    paragraphs: [
      'Spring Boot is not the best default when the service is trivial, when a very small framework is enough, or when the team strongly prefers direct low-level control and does not want the Spring container model. It can also be more framework than a short-lived project needs.',
      'That does not make it bad. It means the framework is most valuable when its conventions and ecosystem depth solve real problems rather than introducing abstractions for no reason.',
    ],
  },
  {
    id: 'core-pitfalls',
    title: 'Common Pitfalls',
    paragraphs: [
      'Common Spring Boot mistakes include not understanding bean creation, scattering configuration everywhere, overusing annotations without architectural clarity, hiding poor database behavior behind repositories, overloading startup with unnecessary work, and making every test spin up the full world.',
      'Another frequent problem is framework passivity: teams let defaults accumulate without understanding which ones are now part of the systems behavior. Mature Spring Boot work means understanding what was configured, not just accepting that the app starts.',
    ],
    bullets: [
      'Do not treat auto-configuration as uninspectable magic.',
      'Do not let service boundaries disappear into controller or repository layers.',
      'Do not make every environment behave differently without clear reason.',
      'Do not confuse framework integration with architectural correctness.',
    ],
  },
  {
    id: 'core-compare',
    title: 'Spring Boot Compared with Other Backend Frameworks',
    paragraphs: [
      'Compared with lightweight frameworks such as Express, Flask, or FastAPI, Spring Boot usually offers deeper built-in structure, stronger dependency injection patterns, and a more extensive enterprise integration ecosystem, but at the cost of more framework surface area. Compared with frameworks such as ASP.NET Core, it occupies a similar serious-backend role in the Java ecosystem.',
      'The real comparison is not which framework has more annotations or less boilerplate. The important question is whether the teams language, deployment model, architectural preferences, and operational needs align with Spring Boots conventions.',
    ],
  },
  {
    id: 'core-decision',
    title: 'Decision Checklist',
    paragraphs: [
      'Choose Spring Boot when the application is a real backend system with meaningful cross-cutting concerns and when Java and the Spring ecosystem are strategic advantages. Choose a smaller tool when the workload is simple enough that container-driven architecture is unnecessary.',
      'A good decision usually depends on whether the project benefits from convention, ecosystem depth, and long-term service structure more than it suffers from additional abstraction.',
    ],
    bullets: [
      'Need a full backend platform with integrated web, data, and operations: strong Spring Boot signal.',
      'Need repeatable architecture across many services: strong Spring Boot signal.',
      'Need a tiny framework with less indirection: weak Spring Boot signal.',
      'Need strong JVM ecosystem integration: strong Spring Boot signal.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-application',
    title: 'Minimal Application Entry Point',
    description: [
      'A Spring Boot application usually starts from a single annotated entry point. The annotation bundle triggers component scanning, auto-configuration, and the framework-managed startup process.',
      'This is the smallest useful mental model for how the application becomes a running service.',
    ],
    code: `@SpringBootApplication
public class BillingApplication {
  public static void main(String[] args) {
    SpringApplication.run(BillingApplication.class, args);
  }
}`,
    notes: [
      'The entry point starts the application context and embedded runtime.',
      'The annotation is powerful because it combines several Spring setup conventions.',
    ],
  },
  {
    id: 'examples-controller',
    title: 'REST Controller with Typed Input and Output',
    description: [
      'This example shows the conventional MVC style for a simple API endpoint. Requests are mapped to controller methods, payloads are bound into typed objects, and the response is serialized automatically.',
      'The point is not just syntax. The point is that web behavior sits inside the wider dependency-injected application structure.',
    ],
    code: `@RestController
@RequestMapping("/api/orders")
public class OrderController {
  private final OrderService orderService;

  public OrderController(OrderService orderService) {
    this.orderService = orderService;
  }

  @PostMapping
  public OrderResponse create(@Valid @RequestBody CreateOrderRequest request) {
    return orderService.createOrder(request);
  }
}`,
    notes: [
      'Constructor injection keeps dependencies explicit.',
      'Validation belongs at the boundary where input enters the system.',
    ],
  },
  {
    id: 'examples-configuration',
    title: 'Typed Configuration Properties',
    description: [
      'Typed configuration gives the application a structured contract for settings instead of scattering raw property lookups everywhere.',
      'This is one of the most maintainable patterns in larger Spring Boot services.',
    ],
    code: `@ConfigurationProperties(prefix = "billing")
public record BillingProperties(
  String currency,
  int retryLimit
) {}

@Configuration
@EnableConfigurationProperties(BillingProperties.class)
class BillingConfig {}`,
    notes: [
      'Configuration becomes safer when bound into typed classes.',
      'Validation can be added so bad configuration fails fast at startup.',
    ],
  },
  {
    id: 'examples-service-transaction',
    title: 'Service Layer with Transaction Boundary',
    description: [
      'Business workflows often belong in a service layer with an explicit transaction boundary. That keeps controllers thin and persistence behavior deliberate.',
      'The framework can manage the transaction, but the architect still chooses where the boundary should live.',
    ],
    code: `@Service
public class PaymentService {
  private final InvoiceRepository invoiceRepository;

  public PaymentService(InvoiceRepository invoiceRepository) {
    this.invoiceRepository = invoiceRepository;
  }

  @Transactional
  public void markPaid(long invoiceId) {
    Invoice invoice = invoiceRepository.findById(invoiceId)
      .orElseThrow(() -> new IllegalArgumentException("Missing invoice"));

    invoice.markPaid();
  }
}`,
    notes: [
      'Transactions should reflect business correctness boundaries.',
      'Service methods are often the right place to coordinate persistence work.',
    ],
  },
  {
    id: 'examples-actuator',
    title: 'Actuator and Operational Endpoints',
    description: [
      'Actuator exposes runtime visibility for health and monitoring. This example enables a small set of endpoints commonly used by orchestration and dashboards.',
      'Operational visibility should be intentional rather than bolted on later during incidents.',
    ],
    code: `management.endpoints.web.exposure.include=health,info,metrics
management.endpoint.health.show-details=when_authorized
management.info.env.enabled=true`,
    notes: [
      'Actuator endpoints help production systems expose useful operational state.',
      'Health configuration should match what operations teams actually need to know.',
    ],
  },
  {
    id: 'examples-test',
    title: 'Focused Web Layer Test',
    description: [
      'Not every test needs the full application context. Spring Boot supports narrower slices so teams can test the web layer without booting unrelated infrastructure.',
      'This keeps tests faster and helps isolate what behavior is actually under evaluation.',
    ],
    code: `@WebMvcTest(OrderController.class)
class OrderControllerTest {
  @Autowired
  private MockMvc mockMvc;

  @MockBean
  private OrderService orderService;

  @Test
  void returnsCreatedOrder() throws Exception {
    mockMvc.perform(post("/api/orders")
        .contentType("application/json")
        .content("{\\"sku\\":\\"BK-17\\",\\"quantity\\":1}"))
      .andExpect(status().isOk());
  }
}`,
    notes: [
      'Use targeted test slices when a full integration test is unnecessary.',
      'Spring Boot testing is strongest when test scope is chosen deliberately.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-core',
    title: 'Core Spring Boot Terms',
    terms: [
      {
        term: 'Bean',
        definition:
          'An object created and managed by the Spring container rather than manually instantiated throughout the application.',
      },
      {
        term: 'Application Context',
        definition:
          'The central Spring container that holds beans, configuration, and framework-managed runtime state.',
      },
      {
        term: 'Auto-Configuration',
        definition:
          'Spring Boots mechanism for creating infrastructure automatically based on dependencies, existing beans, and configuration.',
      },
      {
        term: 'Starter',
        definition:
          'A curated dependency bundle that brings in a supported set of libraries for a common capability such as web or data access.',
      },
      {
        term: 'Profile',
        definition:
          'A named runtime environment mode that can activate different beans or configuration values.',
      },
    ],
  },
  {
    id: 'glossary-web',
    title: 'Web and Runtime Terms',
    terms: [
      {
        term: 'Embedded Server',
        definition:
          'The packaged web server that runs inside the application process so the service can start as a self-contained executable.',
      },
      {
        term: 'Spring MVC',
        definition:
          'The traditional synchronous web framework used by many Spring Boot applications for HTTP APIs and web apps.',
      },
      {
        term: 'WebFlux',
        definition:
          'The reactive web stack for asynchronous non-blocking applications in the Spring ecosystem.',
      },
      {
        term: 'Actuator',
        definition:
          'The Spring Boot module that exposes health, metrics, and operational endpoints for production visibility.',
      },
      {
        term: 'Controller Advice',
        definition:
          'A Spring mechanism for applying shared exception handling or response customization across controllers.',
      },
    ],
  },
  {
    id: 'glossary-data',
    title: 'Data and Testing Terms',
    terms: [
      {
        term: 'Configuration Properties',
        definition:
          'Typed classes that bind externalized settings into structured application configuration objects.',
      },
      {
        term: 'Repository',
        definition:
          'A persistence-layer abstraction often used with Spring Data to access stored entities or records.',
      },
      {
        term: 'Transactional Boundary',
        definition:
          'The application method or scope where work is grouped into one commit or rollback unit.',
      },
      {
        term: 'Slice Test',
        definition:
          'A focused Spring Boot test that starts only part of the application context for one layer such as MVC or data access.',
      },
      {
        term: 'Dependency Injection',
        definition:
          'The design pattern where dependencies are supplied by the framework container rather than created directly by application code.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': bigPictureSections.map((section) => ({ id: section.id, label: section.title })),
  'core-concepts': coreConceptSections.map((section) => ({ id: section.id, label: section.title })),
  examples: exampleSections.map((section) => ({ id: section.id, label: section.title })),
  glossary: glossarySections.map((section) => ({ id: section.id, label: section.title })),
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

export default function SpringBootPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Spring Boot',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Spring Boot"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Spring Boot</h1>
      <p className="bin98-doc-subtitle">
        Java backend framework reference covering auto-configuration, dependency injection,
        configuration, web stacks, data access, testing, operations, and deployment tradeoffs.
      </p>

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
