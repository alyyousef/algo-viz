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
  'ASP.NET Core is a modern cross-platform framework for building web APIs, web applications, real-time systems, and backend services on .NET. It is widely used for enterprise backends, APIs, microservices, web applications, cloud services, internal platforms, and systems where teams want a high-performance, strongly typed, fully featured backend platform.',
  'The most useful way to think about ASP.NET Core is as a broad web application platform rather than just a routing library. It provides hosting, middleware, dependency injection, configuration, logging, authentication, authorization, model binding, endpoint routing, controllers, minimal APIs, Razor-based web options, and deep integration with the wider .NET ecosystem.',
  'This page is intentionally thorough. It covers the ASP.NET Core programming model, hosting and middleware pipeline, dependency injection, controllers, minimal APIs, model binding, configuration, auth, data access, testing, deployment, performance, and the tradeoffs that matter when using ASP.NET Core in production.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'ASP.NET Core is Microsofts cross-platform web framework for .NET. It supports APIs, MVC applications, minimal APIs, SignalR hubs, gRPC endpoints, background services, and many other backend patterns on a shared hosting and middleware foundation.',
      'Its main appeal is that it offers a broad and coherent backend platform rather than a narrow HTTP toolkit. Teams get first-class dependency injection, configuration, logging, auth primitives, routing, testing support, and cloud-friendly hosting patterns in one framework family.',
    ],
  },
  {
    id: 'bp-why-it-matters',
    title: 'Why ASP.NET Core Matters',
    paragraphs: [
      'ASP.NET Core matters because it gives .NET teams a modern, high-performance, production-focused backend framework with a coherent programming model. It can serve simple APIs and also scale up to very large applications with complex security, data, and operational requirements.',
      'It is also important because it unifies many backend concerns that other ecosystems often compose from many separate libraries. That can reduce integration friction and make architecture more consistent across large codebases.',
    ],
    bullets: [
      'Provides a full-featured .NET web platform with strong performance.',
      'Includes built-in dependency injection, configuration, logging, and auth primitives.',
      'Supports multiple endpoint styles from controllers to minimal APIs.',
      'Fits both enterprise backends and smaller cloud-native services.',
    ],
  },
  {
    id: 'bp-mental-model',
    title: 'Mental Model',
    paragraphs: [
      'The right mental model is a hosted application with a request pipeline and framework services assembled through dependency injection. A request enters the hosting environment, moves through middleware, reaches a routed endpoint such as a controller action or minimal API handler, and returns a response using configured services and conventions.',
      'That means ASP.NET Core is not just about route methods. Hosting, DI, configuration, middleware, endpoint routing, model binding, filters, and auth all participate in the final behavior. Understanding those layers is central to designing production applications well.',
    ],
    bullets: [
      'Think hosted application plus request pipeline.',
      'Think dependency injection and configuration as part of normal application structure.',
      'Think middleware and endpoint routing as the core execution model.',
    ],
  },
  {
    id: 'bp-when-it-fits',
    title: 'When ASP.NET Core Fits Best',
    paragraphs: [
      'ASP.NET Core fits best when .NET is the right runtime and the application benefits from a broad, structured backend platform. It is a strong fit for enterprise APIs, internal platforms, microservices, BFF layers, authenticated business systems, cloud backends, and applications where consistency across teams and services matters.',
      'It is especially useful when strong typing, mature tooling, performance, and integrated framework services are meaningful advantages rather than incidental preferences.',
    ],
    bullets: [
      'Teams already invested in .NET and C#.',
      'Applications needing strong built-in infrastructure for backend concerns.',
      'Services where controllers, minimal APIs, or mixed endpoint styles are useful.',
      'Systems that benefit from enterprise-ready platform conventions and tooling.',
    ],
  },
  {
    id: 'bp-when-it-does-not-fit',
    title: 'Where ASP.NET Core Is Not the Best Default',
    paragraphs: [
      'ASP.NET Core is not the best default when the team does not want the .NET ecosystem, when the application wants a much smaller and more minimal framework surface, or when the complexity of the broader platform is not justified by the problem.',
      'It can also be a weaker fit when teams misuse the frameworks breadth and turn every service into a highly abstracted enterprise construction without matching product need.',
    ],
    bullets: [
      'Projects that do not want to adopt .NET as the backend platform.',
      'Very small services where a narrower framework would be simpler.',
      'Teams prone to overengineering because the framework can support many patterns.',
      'Use cases where platform breadth creates more ceremony than value.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Key Takeaways',
    paragraphs: [
      'ASP.NET Core is strongest when the application benefits from a complete and mature backend platform with first-class support for hosting, DI, configuration, auth, routing, and multiple web application styles. It can scale from straightforward APIs to very large service platforms effectively.',
      'The best ASP.NET Core systems use that platform breadth carefully. They adopt the abstractions that fit the problem while keeping architecture understandable, testable, and operationally disciplined.',
    ],
    bullets: [
      'Choose ASP.NET Core when .NET and a broad web platform are real advantages.',
      'Treat middleware, DI, and endpoint design as architectural tools, not setup trivia.',
      'Use platform power to build clarity rather than accidental framework complexity.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-what-it-is',
    title: 'What ASP.NET Core Actually Is',
    paragraphs: [
      'ASP.NET Core is the modern web framework for .NET. It provides hosting, middleware, dependency injection, routing, endpoint execution, configuration, logging, authentication, authorization, model binding, validation, and multiple endpoint styles such as controllers, Razor Pages, SignalR, gRPC, and minimal APIs.',
      'Its identity is a broad application platform rather than a single narrow web library. It is designed to support both straightforward services and complex production systems with a coherent runtime and tooling story.',
    ],
  },
  {
    id: 'core-app-structure',
    title: 'Application Object and Project Structure',
    paragraphs: [
      'An ASP.NET Core application typically begins in Program.cs where services are registered and the middleware pipeline is assembled. Projects often separate controllers or endpoints, domain services, infrastructure concerns, data access, configuration, and tests into clear layers or assemblies depending on complexity.',
      'The framework supports many architectural shapes, but teams still need to impose clarity. Good ASP.NET Core systems keep transport concerns, business logic, persistence, and integration code intentionally separated even when the framework makes everything available through DI.',
    ],
  },
  {
    id: 'core-hosting',
    title: 'Hosting Model and Application Startup',
    paragraphs: [
      'ASP.NET Core applications run inside a generic host that provides configuration, logging, lifetime management, and service registration. Startup in modern versions is typically expressed through top-level setup in Program.cs.',
      'This matters because startup is not just bootstrapping noise. It defines service registration, configuration sources, middleware order, endpoint mapping, and environment-specific behavior. Much of the applications runtime behavior is visible there.',
    ],
  },
  {
    id: 'core-middleware',
    title: 'Middleware Pipeline',
    paragraphs: [
      'Middleware is the backbone of request execution in ASP.NET Core. Requests move through configured middleware for concerns such as exception handling, HTTPS redirection, routing, authentication, authorization, static files, and endpoint execution.',
      'Order matters. A misordered pipeline can break auth, routing, error handling, and caching behavior. Teams should treat middleware order as part of the applications architecture rather than incidental setup.',
    ],
  },
  {
    id: 'core-di',
    title: 'Dependency Injection and Service Lifetimes',
    paragraphs: [
      'ASP.NET Core includes a built-in dependency injection container used throughout the framework. Controllers, minimal API handlers, middleware, filters, hosted services, and application services can all consume registered dependencies.',
      'Service lifetimes such as transient, scoped, and singleton matter deeply. Misunderstanding them can create bugs, memory issues, stale state, or thread-safety problems. DI is a core part of the architecture, not just a convenience mechanism.',
    ],
  },
  {
    id: 'core-routing',
    title: 'Endpoint Routing',
    paragraphs: [
      'ASP.NET Core uses endpoint routing to match incoming requests to handlers such as controller actions, Razor Pages, minimal APIs, hubs, or other mapped endpoints. Routing is deeply integrated with middleware and auth behavior.',
      'That makes route design part of framework composition rather than an isolated concern. Route templates, constraints, metadata, and endpoint grouping all shape how requests are dispatched and documented.',
    ],
  },
  {
    id: 'core-controllers',
    title: 'Controllers and MVC Style APIs',
    paragraphs: [
      'Controllers remain a major ASP.NET Core API style. They combine route attributes, action methods, model binding, validation, filters, and result types into a structured controller-based pattern.',
      'Controllers are especially useful when teams want explicit API classes, filters, conventions, and a familiar MVC-style organizational model. They can be very productive, but teams should still keep action methods thin and domain logic elsewhere.',
    ],
  },
  {
    id: 'core-minimal-apis',
    title: 'Minimal APIs',
    paragraphs: [
      'Minimal APIs provide a lower-ceremony style for defining endpoints directly in Program.cs or related modules. They are useful for small services, focused APIs, and applications that prefer less controller ceremony.',
      'They are not automatically simpler in large systems. Used well, they reduce noise. Used carelessly, they can turn application startup files into large endpoint registries with unclear boundaries.',
    ],
  },
  {
    id: 'core-model-binding',
    title: 'Model Binding and Validation',
    paragraphs: [
      'ASP.NET Core can bind route values, query parameters, headers, forms, and request bodies to strongly typed .NET models. Validation commonly works through data annotations, custom validators, or external validation libraries.',
      'This makes endpoint signatures expressive, but teams still need discipline about where validation lives. Transport validation, business rules, and persistence invariants are related but not identical concerns.',
    ],
  },
  {
    id: 'core-auth',
    title: 'Authentication and Authorization',
    paragraphs: [
      'ASP.NET Core provides mature authentication and authorization infrastructure with support for cookies, JWT bearer tokens, OpenID Connect, policy-based authorization, claims, roles, and custom handlers.',
      'Security design still requires application-level clarity. Authentication tells the system who the caller is; authorization determines what that caller may do. The framework provides strong tools, but the policy design remains the teams responsibility.',
    ],
  },
  {
    id: 'core-errors',
    title: 'Exception Handling and Error Responses',
    paragraphs: [
      'ASP.NET Core commonly uses exception-handling middleware, problem details responses, filters, and logging to produce consistent failure behavior. Centralized error handling is a core operational concern in production APIs.',
      'Error shaping should be deliberate. Clients should receive stable, structured error responses rather than a mixture of raw exceptions and ad hoc messages from different layers of the codebase.',
    ],
  },
  {
    id: 'core-config',
    title: 'Configuration and Options Pattern',
    paragraphs: [
      'ASP.NET Core has a strong configuration system that can compose settings from JSON files, environment variables, secrets stores, command-line arguments, and other providers. The options pattern lets typed configuration objects be injected throughout the application.',
      'This is one of the platforms strongest operational features. Configuration becomes structured and testable, but only if teams keep settings disciplined and avoid letting configuration logic scatter everywhere.',
    ],
  },
  {
    id: 'core-data',
    title: 'Data Access and EF Core Integration',
    paragraphs: [
      'ASP.NET Core commonly pairs with Entity Framework Core for relational data access, but it also works with Dapper, raw ADO.NET, NoSQL drivers, and repository or CQRS-style patterns depending on the system. The web framework itself does not force one persistence approach.',
      'Teams should be careful not to let ORM convenience dictate all API design. Transactions, query performance, aggregate boundaries, and migration discipline remain separate engineering concerns.',
    ],
  },
  {
    id: 'core-testing',
    title: 'Testing Model',
    paragraphs: [
      'ASP.NET Core supports unit testing and integration testing well, including in-memory hosts and HTTP-level verification through WebApplicationFactory and TestServer. This makes it practical to test middleware, routing, auth behavior, controllers, and endpoint results close to real runtime behavior.',
      'The framework supports strong testability, but architecture still matters. Thin endpoints and clean service boundaries make tests much easier to scope and maintain.',
    ],
  },
  {
    id: 'core-deployment',
    title: 'Deployment and Runtime Model',
    paragraphs: [
      'ASP.NET Core applications are commonly deployed as Kestrel-hosted services behind reverse proxies, in containers, on cloud platforms, or on orchestrated infrastructure. Runtime behavior depends on hosting model, process count, environment settings, memory limits, and surrounding network and data infrastructure.',
      'The important deployment point is that ASP.NET Core is designed for modern production environments, but operational quality still depends on observability, graceful shutdown, configuration discipline, scaling strategy, and dependency health.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance Mindset',
    paragraphs: [
      'ASP.NET Core can be very fast, but framework speed is only one part of end-to-end performance. Database behavior, serialization, network latency, downstream dependencies, middleware cost, memory allocation patterns, and query design still dominate many real bottlenecks.',
      'The right mindset is empirical. Measure real endpoints, inspect traces, benchmark hot paths where necessary, and fix the actual source of latency rather than assuming the framework alone determines performance.',
    ],
    bullets: [
      'Profile endpoints with real dependency behavior and realistic payloads.',
      'Watch allocations, serialization costs, and database query patterns.',
      'Treat caching, batching, and streaming as architectural tools.',
      'Do not let platform performance reputation replace measurement.',
    ],
  },
  {
    id: 'core-use-cases',
    title: 'Common Real-World Uses',
    paragraphs: [
      'ASP.NET Core is widely used for enterprise APIs, internal business systems, cloud backends, BFF layers, microservices, real-time applications with SignalR, gRPC services, and web applications that need a serious and maintainable backend platform.',
      'It is especially common where organizations want a mature C# ecosystem, strong tooling, and a framework that scales across many backend application types.',
    ],
  },
  {
    id: 'core-not-fit',
    title: 'When Not to Use ASP.NET Core',
    paragraphs: [
      'ASP.NET Core is a weaker fit when the .NET platform is not a good organizational fit, when the application needs a much narrower and simpler framework surface, or when the team would struggle with the breadth of platform choices and conventions.',
      'It can also be a weak fit when small systems get overengineered because the framework supports so many enterprise-grade patterns that teams adopt them without real need.',
    ],
  },
  {
    id: 'core-pitfalls',
    title: 'Common Pitfalls',
    paragraphs: [
      'Common ASP.NET Core mistakes include turning Program.cs into an unreadable startup registry, misunderstanding DI lifetimes, overusing abstractions without need, mixing transport logic with domain logic, misordering middleware, and assuming framework features replace architecture.',
      'Another recurring issue is cargo-culting enterprise patterns into small services. The framework supports many styles, but not every application needs all of them.',
    ],
    bullets: [
      'Do not treat DI configuration and middleware order as incidental.',
      'Do not let controllers or endpoints become the entire application.',
      'Do not add abstraction layers just because the platform supports them.',
      'Do not assume strong framework defaults eliminate the need for design discipline.',
    ],
  },
  {
    id: 'core-compare',
    title: 'ASP.NET Core Compared with Other Backend Frameworks',
    paragraphs: [
      'Compared with lighter frameworks such as Express or Flask, ASP.NET Core is broader and more integrated. Compared with Spring Boot, it occupies a similar space as a full backend application platform with strong enterprise support. Compared with smaller API frameworks, it provides more built-in infrastructure but also a larger conceptual surface.',
      'The right comparison is whether the team wants a full-featured backend platform with strong conventions and tooling or a thinner framework with fewer integrated subsystems.',
    ],
  },
  {
    id: 'core-decision',
    title: 'Decision Checklist',
    paragraphs: [
      'Choose ASP.NET Core when .NET is the right runtime, the application benefits from a broad backend platform, and the team values integrated DI, configuration, routing, auth, and hosting patterns. Choose something else when the platform breadth would be more cost than advantage.',
      'The best ASP.NET Core decisions happen when the team uses the frameworks breadth deliberately and resists the urge to turn every application into a maximal architecture exercise.',
    ],
    bullets: [
      'Need .NET plus a mature and integrated backend platform: strong ASP.NET Core signal.',
      'Need built-in DI, configuration, auth, and multiple endpoint styles: strong ASP.NET Core signal.',
      'Need a very small framework surface with minimal platform assumptions: weaker ASP.NET Core signal.',
      'Need scalable enterprise and cloud backend support: strong ASP.NET Core signal.',
    ],
  },
]
const exampleSections: ExampleSection[] = [
  {
    id: 'examples-minimal-api',
    title: 'Minimal API Endpoint',
    description: [
      'Minimal APIs let teams map endpoints directly during startup with relatively little ceremony. This works well for focused services and straightforward route definitions.',
      'The key idea is that the framework still provides DI, routing, and model binding even in a lighter endpoint style.',
    ],
    code: `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/health", () => Results.Ok(new { status = "ok" }));

app.Run();`,
    notes: [
      'Minimal APIs reduce ceremony without discarding the hosting model.',
      'They still need disciplined modularization in larger systems.',
    ],
  },
  {
    id: 'examples-controller',
    title: 'Controller Action with Route Attribute',
    description: [
      'Controllers remain a common and structured way to build APIs in ASP.NET Core. They work well when teams want explicit API classes, attributes, filters, and organized action methods.',
      'This style is familiar to many enterprise teams and integrates cleanly with the rest of the framework.',
    ],
    code: `using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    [HttpGet("{id:int}")]
    public IActionResult GetById(int id)
    {
        return Ok(new { id, status = "processing" });
    }
}`,
    notes: [
      'Controllers make route, result, and metadata behavior explicit.',
      'Action methods should still delegate real work to services.',
    ],
  },
  {
    id: 'examples-di',
    title: 'Dependency Injection Registration',
    description: [
      'ASP.NET Core applications usually register services during startup and let the framework inject them into controllers, endpoints, or other services.',
      'This is central to how application composition works in the platform.',
    ],
    code: `var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IEmailSender, SmtpEmailSender>();
builder.Services.AddControllers();`,
    notes: [
      'Service lifetimes affect runtime behavior and correctness.',
      'Registration code should stay understandable as the app grows.',
    ],
  },
  {
    id: 'examples-auth',
    title: 'JWT Bearer Authentication Setup',
    description: [
      'ASP.NET Core commonly uses JWT bearer authentication for APIs. The authentication and authorization middleware then apply those policies during request execution.',
      'Security setup belongs in the application pipeline and service configuration, not as scattered ad hoc checks.',
    ],
    code: `builder.Services
    .AddAuthentication("Bearer")
    .AddJwtBearer("Bearer", options =>
    {
        options.Authority = "https://identity.example.com";
        options.Audience = "orders-api";
    });

builder.Services.AddAuthorization();`,
    notes: [
      'Authentication establishes identity; authorization decides access.',
      'Pipeline ordering still matters when enabling auth middleware.',
    ],
  },
  {
    id: 'examples-ef-core',
    title: 'EF Core DbContext Registration',
    description: [
      'Entity Framework Core is a common data access choice with ASP.NET Core. The DbContext is usually registered through dependency injection and configured from application settings.',
      'This makes data access configuration part of the startup story.',
    ],
    code: `builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")
    )
);`,
    notes: [
      'DbContext lifetime and query behavior still need careful design.',
      'Framework integration does not replace transaction and query discipline.',
    ],
  },
  {
    id: 'examples-integration-test',
    title: 'Integration Test with WebApplicationFactory',
    description: [
      'ASP.NET Core supports realistic HTTP-level integration tests using a test host. This makes it practical to verify routing, middleware, serialization, and auth behavior together.',
      'These tests are especially useful for public API contracts and cross-cutting concerns.',
    ],
    code: `public class HealthTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public HealthTests(WebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task Healthcheck_ReturnsOk()
    {
        var response = await _client.GetAsync("/health");
        response.EnsureSuccessStatusCode();
    }
}`,
    notes: [
      'Integration tests are valuable for real runtime behavior, not just unit isolation.',
      'Keep endpoints and services structured so tests can remain focused and fast.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-core',
    title: 'Core ASP.NET Core Terms',
    terms: [
      {
        term: 'Middleware',
        definition:
          'A pipeline component that can inspect requests, modify behavior, and either continue processing or produce a response.',
      },
      {
        term: 'Dependency Injection',
        definition:
          'The built-in ASP.NET Core service resolution mechanism used across the application platform.',
      },
      {
        term: 'Controller',
        definition:
          'A class containing action methods that handle routed requests in the MVC-style API model.',
      },
      {
        term: 'Minimal API',
        definition:
          'A lower-ceremony endpoint style that maps routes directly to delegates or handlers.',
      },
      {
        term: 'Kestrel',
        definition:
          'The cross-platform web server commonly used to host ASP.NET Core applications.',
      },
    ],
  },
  {
    id: 'glossary-request',
    title: 'Request Lifecycle Terms',
    terms: [
      {
        term: 'Endpoint Routing',
        definition:
          'The ASP.NET Core system that matches requests to mapped endpoints such as controllers and minimal APIs.',
      },
      {
        term: 'Model Binding',
        definition:
          'The process of reading request data and populating strongly typed parameters or models for handlers.',
      },
      {
        term: 'Authorization Policy',
        definition:
          'A named set of requirements that controls whether an authenticated principal can access an endpoint.',
      },
      {
        term: 'Problem Details',
        definition:
          'A structured error response format often used in ASP.NET Core APIs for consistent failure payloads.',
      },
      {
        term: 'Scoped Service',
        definition:
          'A dependency injection lifetime where one service instance is created per request scope.',
      },
    ],
  },
  {
    id: 'glossary-architecture',
    title: 'Architecture and Testing Terms',
    terms: [
      {
        term: 'Options Pattern',
        definition:
          'The common ASP.NET Core approach for binding typed configuration objects from settings.',
      },
      {
        term: 'EF Core',
        definition:
          'Entity Framework Core, the .NET ORM commonly paired with ASP.NET Core applications.',
      },
      {
        term: 'WebApplicationFactory',
        definition:
          'A testing helper used to spin up an ASP.NET Core app for integration testing.',
      },
      {
        term: 'Hosted Service',
        definition:
          'A background service registered with the host to run application work outside request-response handlers.',
      },
      {
        term: 'Program.cs',
        definition:
          'The common startup entry file where services and middleware are configured in modern ASP.NET Core apps.',
      },
    ],
  },
]

const pageStyles = `
.postgres-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.postgres-help-window {
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

.postgres-help-titlebar {
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

.postgres-help-titletext {
  grid-column: 2;
  justify-self: center;
  font-size: 15px;
  line-height: 1.1;
  text-align: center;
  white-space: nowrap;
}

.postgres-help-controls {
  grid-column: 3;
  justify-self: end;
  display: flex;
  gap: 2px;
}

.postgres-help-control {
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

.postgres-help-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.postgres-help-tab {
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

.postgres-help-tab-active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.postgres-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  border-top: 1px solid #404040;
  background: #ffffff;
}

.postgres-help-toc {
  overflow: auto;
  padding: 12px;
  background: #efefef;
  border-right: 1px solid #808080;
}

.postgres-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.postgres-help-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.postgres-help-toc-item {
  margin: 0 0 8px;
}

.postgres-help-toc-link {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.postgres-help-toc-link:hover,
.postgres-help-toc-link:focus-visible {
  text-decoration: underline;
}

.postgres-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.postgres-help-doc-title {
  margin: 0 0 10px;
  font-size: 20px;
  font-weight: 700;
}

.postgres-help-doc-subtitle {
  margin: 0 0 12px;
  font-size: 12px;
}

.postgres-help-section {
  margin: 0 0 20px;
  scroll-margin-top: 12px;
}

.postgres-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.postgres-help-content p,
.postgres-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.postgres-help-content p {
  margin: 0 0 10px;
}

.postgres-help-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.postgres-help-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.postgres-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.postgres-help-codebox code {
  display: block;
  white-space: pre-wrap;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .postgres-help-main {
    grid-template-columns: 1fr;
  }

  .postgres-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 640px) {
  .postgres-help-window {
    min-height: auto;
  }

  .postgres-help-titlebar {
    grid-template-columns: 1fr auto;
    row-gap: 4px;
    padding-top: 4px;
    padding-bottom: 4px;
  }

  .postgres-help-titletext {
    grid-column: 1 / span 2;
    grid-row: 1;
    white-space: normal;
    padding: 0 28px;
  }

  .postgres-help-controls {
    grid-column: 2;
    grid-row: 1;
    align-self: start;
  }
}
`

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': bigPictureSections.map((section) => ({ id: section.id, label: section.title })),
  'core-concepts': coreConceptSections.map((section) => ({ id: section.id, label: section.title })),
  examples: exampleSections.map((section) => ({ id: section.id, label: section.title })),
  glossary: glossarySections.map((section) => ({ id: section.id, label: section.title })),
}

function isTabId(value: string | null): value is TabId {
  return (
    value === 'big-picture' ||
    value === 'core-concepts' ||
    value === 'examples' ||
    value === 'glossary'
  )
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="postgres-help-section">
      <h2 className="postgres-help-heading">{section.title}</h2>
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
      {isLast ? null : <hr className="postgres-help-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="postgres-help-section">
      <h2 className="postgres-help-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="postgres-help-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="postgres-help-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="postgres-help-section">
      <h2 className="postgres-help-heading">{section.title}</h2>
      {section.terms.map((item) => (
        <p key={item.term}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="postgres-help-divider" />}
    </section>
  )
}

export default function AspNetCorePage(): JSX.Element {
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
    document.title = `ASP.NET Core (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'ASP.NET Core',
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
    <div className="postgres-help-page">
      <style>{pageStyles}</style>
      <div className="postgres-help-window" role="presentation">
        <header className="postgres-help-titlebar">
          <span className="postgres-help-titletext">ASP.NET Core</span>
          <div className="postgres-help-controls">
            <button className="postgres-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="postgres-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="postgres-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`postgres-help-tab ${activeTab === tab.id ? 'postgres-help-tab-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="postgres-help-main">
          <aside className="postgres-help-toc" aria-label="Table of contents">
            <h2 className="postgres-help-toc-title">Contents</h2>
            <ul className="postgres-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id} className="postgres-help-toc-item">
                  <a href={`#${section.id}`} className="postgres-help-toc-link">
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="postgres-help-content">
            <h1 className="postgres-help-doc-title">ASP.NET Core</h1>
            <p className="postgres-help-doc-subtitle">
              .NET backend framework reference covering middleware, hosting,
              controllers, minimal APIs, DI, deployment, and tradeoffs.
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
          </main>
        </div>
      </div>
    </div>
  )
}
