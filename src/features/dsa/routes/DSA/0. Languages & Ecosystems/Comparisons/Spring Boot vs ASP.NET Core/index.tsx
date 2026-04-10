import { Fragment } from 'react'

import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type DocSection = {
  id: string
  title: string
  paragraphs: readonly string[]
}

type ExampleSnippet = {
  label: string
  code: string
}

type ExampleSection = {
  id: string
  title: string
  description: string
  snippets: readonly ExampleSnippet[]
  takeaway: string
}

type GlossaryTerm = {
  term: string
  definition: string
}

const bigPictureSections: readonly DocSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Spring Boot and ASP.NET Core are both mature, production-grade application platforms for building APIs, web apps, background services, and cloud backends, but they come from different ecosystem centers. Spring Boot is the dominant application platform in the modern Java world, emphasizing Spring auto-configuration, starters, dependency injection, and a very large enterprise integration ecosystem. ASP.NET Core is the modern web and service framework in the .NET world, emphasizing a unified host model, middleware pipeline, built-in dependency injection, strong tooling, and first-class alignment with the broader .NET runtime and libraries.',
      'That means the practical question is not which one can build a REST API, connect to a database, or run in containers. Both can. The more useful question is whether the team benefits more from Spring Boot and the wider Spring platform or from ASP.NET Core and the broader .NET application stack.',
      'This help-style reference covers Spring Boot vs ASP.NET Core across overview, key ideas, APIs, ecosystem, architecture, use cases, and tradeoffs.',
    ],
  },
  {
    id: 'bp-spring-boot',
    title: 'When Spring Boot Fits Better',
    paragraphs: [
      'Spring Boot is often the stronger choice when the organization already uses Java heavily, the team depends on Spring Data, Spring Security, Spring Cloud, or other Spring ecosystem pieces, or the application must integrate with a broad set of enterprise Java libraries and conventions. It is especially attractive in organizations where Java hiring, JVM operations, and Spring familiarity are already established advantages.',
      'It is also a strong fit when the product benefits from Spring Boot Actuator, starter-driven onboarding, and the depth of Spring guidance around dependency injection, data access, configuration, messaging, and platform operations.',
    ],
  },
  {
    id: 'bp-aspnet-core',
    title: 'When ASP.NET Core Fits Better',
    paragraphs: [
      'ASP.NET Core is often the stronger choice when the team is already invested in .NET, values C# and the wider .NET developer experience, or wants a unified application model that covers web APIs, MVC, minimal APIs, SignalR, background work, authentication, and configuration with strong Microsoft platform integration. It is especially attractive for teams building cloud services in a .NET-first environment.',
      'It is also a strong fit when the organization wants a modern framework with a straightforward middleware pipeline, excellent tooling in Visual Studio and the .NET CLI, and close alignment with the rest of the .NET runtime and library ecosystem.',
    ],
  },
  {
    id: 'bp-same-goal',
    title: 'Same Goal, Different Ecosystem Gravity',
    paragraphs: [
      'Both frameworks aim to make backend application development fast, maintainable, and operationally mature. Both support dependency injection, configuration, authentication, observability, testing, packaging, and cloud deployment. Both have strong stories for HTTP APIs and long-term enterprise support.',
      'The deeper difference is ecosystem gravity. Spring Boot usually pulls teams toward the Spring family and the JVM world. ASP.NET Core usually pulls teams toward the .NET runtime, the C# language, and Microsoft-centric application infrastructure. The choice often says as much about organizational direction as it does about controller syntax or startup benchmarks.',
    ],
  },
  {
    id: 'bp-traps',
    title: 'Common Evaluation Traps',
    paragraphs: [
      'A common mistake is to compare only framework syntax and ignore surrounding ecosystem cost. In real teams, the bigger factors are library compatibility, operational standards, hiring pipelines, deployment tooling, observability, security practices, and existing platform investment.',
      'Another mistake is to compare Java and .NET as if the framework alone makes the choice. Spring Boot is not separable from Spring and the JVM in practice, and ASP.NET Core is not separable from .NET and C# in practice. The true comparison includes language preferences, runtime behavior, team habits, and platform governance.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Quick Takeaways',
    paragraphs: [
      'Choose Spring Boot when Spring ecosystem leverage, enterprise Java familiarity, and Spring-first architectural patterns matter most.',
      'Choose ASP.NET Core when the team wants the .NET application stack, C# developer ergonomics, and the ASP.NET Core middleware and hosting model.',
      'If the organization is already strongly committed to either Java or .NET, that ecosystem gravity often matters more than small framework-level feature differences.',
    ],
  },
] as const

const coreConceptSections: readonly DocSection[] = [
  {
    id: 'core-shared',
    title: 'Shared Ground',
    paragraphs: [
      'Both frameworks provide the basics of modern backend work: routing, JSON serialization, dependency injection, configuration binding, logging, health and metrics integrations, testing support, security building blocks, and container-friendly deployment.',
      'That means neither platform is missing the capabilities required for serious application development. The real differences show up in the programming model, ecosystem assumptions, and how the surrounding platform influences architecture and developer workflow.',
    ],
  },
  {
    id: 'core-programming-model',
    title: 'Programming Model',
    paragraphs: [
      'Spring Boot sits on Spring Framework and the larger Spring family. The dominant model revolves around annotations, inversion of control, auto-configuration, starter dependencies, controller classes, configuration properties, and related Spring modules such as Data, Security, Batch, Integration, and Cloud. Many enterprise Java teams already think in those terms.',
      'ASP.NET Core revolves around a generic host, service registration, middleware, endpoint routing, controllers or minimal APIs, strongly integrated configuration and logging, and a clean application bootstrap in `Program.cs`. It feels very natural inside modern .NET development, especially for teams that like explicit service registration and pipeline composition.',
    ],
  },
  {
    id: 'core-bootstrap',
    title: 'Auto-configuration vs Explicit Pipeline Composition',
    paragraphs: [
      'Spring Boot is famous for auto-configuration. Add the right starter, define a few properties, and the framework can automatically configure substantial application infrastructure. This is one of the main reasons Spring Boot scales so well across large enterprise codebases: it turns a large ecosystem into something teams can adopt quickly without wiring every detail manually.',
      'ASP.NET Core is generally more explicit in how request handling is assembled. Service registration and middleware composition are visible in the application bootstrap. Some behavior is convention-based, but the request pipeline remains a highly visible part of the application structure. Many teams like this because the flow from host setup to middleware to endpoint handling is easy to reason about directly.',
    ],
  },
  {
    id: 'core-di',
    title: 'Dependency Injection Model',
    paragraphs: [
      'Spring Boot uses the Spring container, which is one of the deepest and most flexible dependency injection systems in mainstream application development. Bean scopes, conditional beans, profiles, configuration classes, lifecycle hooks, and auto-configuration all build on that foundation.',
      'ASP.NET Core includes a built-in dependency injection container and a consistent service registration model through the host builder. It is intentionally straightforward and integrates tightly with controllers, middleware, hosted services, options binding, authentication handlers, and the broader framework. In many applications this simplicity is a strength because the DI model is easy to understand and use consistently.',
    ],
  },
  {
    id: 'core-request-pipeline',
    title: 'Servlet and Filter Heritage vs Middleware Pipeline',
    paragraphs: [
      'Spring Boot web applications commonly feel like layered application frameworks built around controllers, servlet or reactive abstractions, filters, interceptors, and Spring-managed components. That is a productive model, but the request path is often expressed through several Spring concepts at once rather than one visible linear pipeline.',
      "ASP.NET Core makes the middleware pipeline a first-class architectural concept. Requests move through ordered middleware components before reaching endpoints. This is one of the framework's clearest identities, and it often makes cross-cutting concerns such as authentication, exception handling, CORS, and routing feel structurally explicit.",
    ],
  },
  {
    id: 'core-web-style',
    title: 'Controllers, Minimal APIs, and Endpoint Style',
    paragraphs: [
      'Spring Boot usually expresses HTTP APIs through annotated controllers, though functional routing exists in some Spring styles. The controller model is deeply familiar to Spring teams and works well for both simple and highly structured applications.',
      'ASP.NET Core supports traditional MVC or API controllers as well as minimal APIs. This gives teams a wider stylistic range inside one framework, from explicit controller-heavy enterprise apps to lightweight endpoint definitions for smaller services. That flexibility is one reason ASP.NET Core adapts well across both large and small service styles.',
    ],
  },
  {
    id: 'core-config',
    title: 'Configuration and Environment Binding',
    paragraphs: [
      'Spring Boot has a strong configuration story built around properties, YAML, profiles, and type-safe configuration binding. It is especially good at turning infrastructure-heavy application setup into predictable property-driven configuration.',
      'ASP.NET Core has a very composable configuration model that can combine JSON files, environment variables, command-line values, user secrets, and other providers into one configuration system. This tends to feel very natural in cloud and multi-environment deployment workflows because provider composition is a visible part of the platform design.',
    ],
  },
  {
    id: 'core-data',
    title: 'Data Access and Persistence Ecosystem',
    paragraphs: [
      'Spring Boot is unusually strong when paired with Spring Data, Spring transaction management, JPA-based stacks, messaging integrations, and the wider JVM data ecosystem. For enterprise applications with many integration points, this depth is hard to overstate.',
      'ASP.NET Core itself is not a data framework, but in practice it commonly works with Entity Framework Core, Dapper, ADO.NET, and the broader .NET data stack. The question is often less whether ASP.NET Core can do data access and more whether the team wants the .NET data ecosystem rather than the Spring and JVM one.',
    ],
  },
  {
    id: 'core-ops',
    title: 'Operations and Observability',
    paragraphs: [
      'Spring Boot Actuator is one of the strongest operational features in any mainstream backend framework. Health checks, metrics, info endpoints, and operational insight are part of the platform story rather than an afterthought. That gives Spring Boot a strong production-ready identity out of the box.',
      'ASP.NET Core also has a strong operations story through hosting, logging, middleware, health checks, OpenTelemetry-friendly workflows, and cloud deployment integration. The platform is especially comfortable in modern .NET operations where configuration, diagnostics, and hosting are treated as first-class runtime concerns.',
    ],
  },
  {
    id: 'core-packaging',
    title: 'Packaging, Runtime, and Deployment',
    paragraphs: [
      'Spring Boot applications commonly ship as executable jars, layered jars, or container images, and they run on the JVM. The packaging model is mature and works very well in containerized environments, especially when teams already have standardized JVM operations.',
      'ASP.NET Core applications compile into .NET applications that can be framework-dependent or self-contained. This gives teams flexibility around deployment shape and runtime ownership. In organizations already standardized on .NET hosting and tooling, that often translates into smoother deployment and operational consistency.',
    ],
  },
  {
    id: 'core-tooling',
    title: 'Tooling and Developer Workflow',
    paragraphs: [
      'Spring Boot benefits from excellent JVM tooling, IDE support, Spring Initializr, Maven and Gradle workflows, and a large amount of documentation and community knowledge. For Java teams, the workflow is mature and highly predictable.',
      'ASP.NET Core benefits from first-class .NET CLI support, Visual Studio and Rider integration, template-driven bootstrapping, and a development experience that is cohesive across the wider .NET stack. Teams that already prefer C# and .NET usually experience very little friction moving among web apps, background services, and shared libraries.',
    ],
  },
  {
    id: 'core-team-fit',
    title: 'Team Fit and Organizational Gravity',
    paragraphs: [
      'Spring Boot is easier to justify when the organization is already a JVM and Spring shop, when Java hiring is easier in the region or company context, or when the product depends heavily on Spring ecosystem conventions and libraries.',
      'ASP.NET Core is easier to justify when the organization is already a .NET and C# shop, when Microsoft platform integration matters, or when the team wants a consistent development story across web apps, APIs, background workers, and desktop or service tooling inside the .NET ecosystem.',
    ],
  },
  {
    id: 'core-decision',
    title: 'Decision Checklist',
    paragraphs: [
      'Lean toward Spring Boot if the broader Spring ecosystem is a strategic advantage, if the team depends on Spring Data or Spring Security heavily, or if enterprise Java conventions already shape the organization.',
      'Lean toward ASP.NET Core if the broader .NET ecosystem is the strategic center, if the team prefers C#, explicit middleware composition, and .NET hosting patterns, or if existing platform investments already align there.',
      'If the application is straightforward and the organization has no strong Java or .NET bias, then team skill, hiring reality, and platform standards usually matter more than raw feature checklists because both frameworks are fully capable for mainstream backend work.',
    ],
  },
] as const

const examples: readonly ExampleSection[] = [
  {
    id: 'examples-bootstrap',
    title: 'Minimal API Bootstrap',
    description:
      'A simple hello endpoint shows how each platform introduces a web application and request handler.',
    snippets: [
      {
        label: 'Spring Boot',
        code: `@SpringBootApplication
@RestController
public class App {
  public static void main(String[] args) {
    SpringApplication.run(App.class, args);
  }

  @GetMapping("/hello")
  String hello() {
    return "hello";
  }
}`,
      },
      {
        label: 'ASP.NET Core',
        code: `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/hello", () => "hello");

app.Run();`,
      },
    ],
    takeaway:
      'Spring Boot centers the application class and annotation-driven controller model. ASP.NET Core can expose a lightweight endpoint directly from the host builder and routing pipeline.',
  },
  {
    id: 'examples-di',
    title: 'Dependency Registration',
    description:
      'The service wiring style reflects one of the clearest cultural differences between the two platforms.',
    snippets: [
      {
        label: 'Spring Boot',
        code: `@Service
public class GreetingService {
  public String message() {
    return "hello";
  }
}

@RestController
class GreetingController {
  private final GreetingService service;

  GreetingController(GreetingService service) {
    this.service = service;
  }
}`,
      },
      {
        label: 'ASP.NET Core',
        code: `builder.Services.AddScoped<GreetingService>();

app.MapGet("/hello", (GreetingService service) =>
  service.Message());`,
      },
    ],
    takeaway:
      'Spring Boot often discovers and wires components through annotations and the container. ASP.NET Core makes registration in the host setup highly visible and then injects services where needed.',
  },
  {
    id: 'examples-cross-cutting',
    title: 'Cross-Cutting Request Behavior',
    description:
      'Cross-cutting concerns are present in both frameworks, but their structure feels different.',
    snippets: [
      {
        label: 'Spring Boot',
        code: `@Component
public class AuditFilter extends OncePerRequestFilter {
  @Override
  protected void doFilterInternal(...) {
    // audit request
    filterChain.doFilter(request, response);
  }
}`,
      },
      {
        label: 'ASP.NET Core',
        code: `app.Use(async (context, next) => {
  // audit request
  await next();
});`,
      },
    ],
    takeaway:
      'Spring Boot expresses this through Spring and servlet-style components. ASP.NET Core expresses it through the ordered middleware pipeline, which is often easier to visualize directly.',
  },
  {
    id: 'examples-decision',
    title: 'Simple Selection Heuristic',
    description:
      'A short rule helps keep the comparison tied to ecosystem fit instead of framework tribalism.',
    snippets: [
      {
        label: 'Choose Spring Boot',
        code: `If the team wants:
- Spring ecosystem depth
- mature enterprise Java integrations
- Spring-first operational conventions
- JVM and Java organizational alignment`,
      },
      {
        label: 'Choose ASP.NET Core',
        code: `If the team wants:
- the broader .NET application stack
- C# and .NET tooling alignment
- explicit middleware composition
- Microsoft-centric platform consistency`,
      },
    ],
    takeaway:
      'In many companies the decisive factor is not controller syntax. It is which application ecosystem the platform wants to standardize on.',
  },
] as const

const glossaryTerms: readonly GlossaryTerm[] = [
  {
    term: 'Starter',
    definition:
      'A Spring Boot dependency bundle that brings in a feature-oriented set of dependencies and defaults.',
  },
  {
    term: 'Auto-configuration',
    definition:
      'Spring Boot configuring infrastructure automatically based on conditions such as classpath contents and existing beans.',
  },
  {
    term: 'Actuator',
    definition:
      "Spring Boot's production-ready operational feature set for health, metrics, and application management endpoints.",
  },
  {
    term: 'Middleware',
    definition:
      'An ASP.NET Core request-processing component that participates in the ordered HTTP pipeline.',
  },
  {
    term: 'Minimal API',
    definition:
      'A lightweight ASP.NET Core endpoint style that allows routes to be declared directly in application bootstrap code.',
  },
  {
    term: 'Generic Host',
    definition:
      'The .NET hosting abstraction used by ASP.NET Core to set up configuration, logging, dependency injection, and application lifetime.',
  },
  {
    term: 'Controller',
    definition:
      'A class that handles routed HTTP requests, common in both Spring Boot and ASP.NET Core MVC-style applications.',
  },
  {
    term: 'Options Binding',
    definition:
      'The .NET pattern of binding configuration data to strongly typed objects used by ASP.NET Core applications.',
  },
  {
    term: 'Profile',
    definition:
      'A Spring mechanism for activating environment-specific beans and configuration behavior.',
  },
  {
    term: 'Bean',
    definition: 'A Spring-managed object in the dependency injection container.',
  },
  {
    term: 'Hosted Service',
    definition:
      'A background service pattern in ASP.NET Core and the .NET host used for long-running or scheduled application work.',
  },
  {
    term: 'Self-Contained Deployment',
    definition:
      'A .NET deployment model that includes the runtime with the application instead of depending on a preinstalled shared runtime.',
  },
] as const

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': bigPictureSections.map((section) => ({ id: section.id, label: section.title })),
  'core-concepts': coreConceptSections.map((section) => ({ id: section.id, label: section.title })),
  examples: examples.map((section) => ({ id: section.id, label: section.title })),
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function SpringBootVsAspNetCorePage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Spring Boot vs ASP.NET Core',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Spring Boot vs ASP.NET Core"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Spring Boot vs ASP.NET Core</h1>
      <p className="spring-aspnet-help-doc-subtitle">
        Manual-style comparison of ecosystem gravity, dependency injection, middleware, hosting,
        operations, and Java-versus-.NET platform tradeoffs.
      </p>

      {activeTab === 'big-picture' &&
        bigPictureSections.map((section, index) => (
          <Fragment key={section.id}>
            <section id={section.id} className="bin98-section">
              <h2 className="bin98-heading">{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
            {index < bigPictureSections.length - 1 && <hr className="bin98-divider" />}
          </Fragment>
        ))}

      {activeTab === 'core-concepts' &&
        coreConceptSections.map((section) => (
          <section key={section.id} id={section.id} className="bin98-section">
            <h2 className="bin98-heading">{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}

      {activeTab === 'examples' &&
        examples.map((example) => (
          <section key={example.id} id={example.id} className="bin98-section">
            <h2 className="bin98-heading">{example.title}</h2>
            <p>{example.description}</p>
            {example.snippets.map((snippet) => (
              <Fragment key={`${example.id}-${snippet.label}`}>
                <h3 className="bin98-subheading">{snippet.label}</h3>
                <div className="bin98-codebox">
                  <code>{snippet.code}</code>
                </div>
              </Fragment>
            ))}
            <p>
              <strong>Takeaway:</strong> {example.takeaway}
            </p>
          </section>
        ))}

      {activeTab === 'glossary' && (
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {glossaryTerms.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
