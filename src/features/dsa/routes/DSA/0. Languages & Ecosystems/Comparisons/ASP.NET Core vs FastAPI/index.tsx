import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

type DocSection = {
  id: string
  title: string
  paragraphs?: string[]
  bullets?: string[]
}

type ExampleItem = {
  id: string
  title: string
  summary: string
  aspnetCode: string
  fastapiCode: string
  explanation: string
}

type GlossaryItem = {
  term: string
  definition: string
}

const pageTitle = 'ASP.NET Core vs FastAPI'
const pageSubtitle =
  'Comparing a high-performance .NET web framework with a Python-first API framework.'
const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const bigPictureSections: DocSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'ASP.NET Core and FastAPI are both modern server-side frameworks for building HTTP APIs, but they target different engineering preferences and different language ecosystems. ASP.NET Core sits inside the broader .NET platform and is designed as a high-performance, production-grade web framework with official support for middleware, dependency injection, routing, OpenAPI integration, authentication, logging, and large application structure.',
      'FastAPI sits in the Python ecosystem and focuses on making API development fast, explicit, and ergonomically pleasant. It is especially well known for request and response validation with Python type hints, automatic OpenAPI generation, and a development experience that feels compact without being toy-like.',
      'A useful shorthand is this: ASP.NET Core optimizes for broad platform depth, performance, and long-lived application structure; FastAPI optimizes for speed of API authoring, Python ergonomics, and a strongly typed request-schema experience built around Pydantic.',
    ],
  },
  {
    id: 'bp-philosophy',
    title: 'Philosophy Difference',
    paragraphs: [
      'ASP.NET Core is a framework platform. It wants to be a serious host for many application shapes: minimal APIs, MVC-style apps, Razor Pages, gRPC services, SignalR, and more. The framework is not just about endpoints. It is about building complete web systems inside the .NET runtime and tooling model.',
      'FastAPI is narrower and more focused. It is unapologetically API-shaped. It wants request parsing, validation, dependency injection, async handlers, and automatic docs to feel direct and highly productive, especially for teams that already work in Python.',
      'That means ASP.NET Core often feels broader and more infrastructural, while FastAPI often feels lighter and more immediately expressive for API-first backends.',
    ],
  },
  {
    id: 'bp-where',
    title: 'Where Each Fits Best',
    paragraphs: [
      'ASP.NET Core is strongest for organizations already invested in .NET, large enterprise APIs, high-throughput services, applications needing deep middleware and hosting flexibility, and teams that want strong long-term structure with excellent built-in platform support.',
      'FastAPI is strongest for Python-heavy teams, machine-learning or data-adjacent backends, startups that want to ship APIs quickly, and services where automatic validation and schema-driven API development are major productivity wins.',
      'If the core question is which framework gives the broadest official web platform around APIs, ASP.NET Core usually wins. If the core question is which framework lets a Python team build a strongly typed API fastest with minimal ceremony, FastAPI usually wins.',
    ],
  },
  {
    id: 'bp-quick-picks',
    title: 'Quick Decision Guide',
    bullets: [
      'Choose ASP.NET Core when performance, platform breadth, and large-system structure matter most.',
      'Choose FastAPI when Python alignment, rapid API authoring, and schema-driven development matter most.',
      'Choose ASP.NET Core when the service must fit naturally into a larger .NET platform and operations model.',
      'Choose FastAPI when the surrounding application logic already lives in Python, especially around ML, data, or scripting-heavy domains.',
      'If the team is debating language ecosystem as much as framework, the language choice is probably the real decision boundary.',
    ],
  },
]

const mentalModels = [
  {
    title: 'ASP.NET Core is broader than just Web API',
    detail:
      'It is a general-purpose web application framework with a mature hosting, middleware, DI, and tooling model across the .NET ecosystem.',
  },
  {
    title: 'FastAPI is API-first by design',
    detail:
      'Its center of gravity is request handling, validation, dependency injection, async endpoints, and OpenAPI generation rather than a giant web-platform surface area.',
  },
  {
    title: 'ASP.NET Core prefers explicit application structure',
    detail:
      'Services, middleware, endpoint registration, configuration, and hosting are all first-class parts of the framework design.',
  },
  {
    title: 'FastAPI prefers directness through Python typing',
    detail:
      'Function signatures, type hints, and Pydantic models become the main source of truth for validation and docs.',
  },
  {
    title: 'Language ecosystem is not secondary here',
    detail:
      'The .NET versus Python difference shapes deployment, library choices, hiring, tooling, and operational assumptions just as much as the framework APIs do.',
  },
  {
    title: 'Both frameworks support dependency injection, but with different feel',
    detail:
      'ASP.NET Core DI is deeply infrastructure-level and container-oriented. FastAPI DI is request-oriented and function-signature-oriented.',
  },
]

const coreSections: DocSection[] = [
  {
    id: 'core-architecture',
    title: 'Overall Architecture Model',
    paragraphs: [
      'ASP.NET Core can be used through minimal APIs, controller-based APIs, or larger layered application patterns. Middleware, endpoint routing, filters, DI, authentication, logging, and configuration are part of one coherent platform model. This makes it well suited to applications that need more than just a few HTTP routes.',
      'FastAPI is centered around path operation functions, dependency injection through Depends, Pydantic-based request and response modeling, and ASGI-based async execution. The model is compact and expressive, but it is intentionally more focused than ASP.NET Cores total platform surface.',
      'A practical framing is that ASP.NET Core can be the web platform for an organization, while FastAPI is often the efficient API framework inside a Python ecosystem that may include Starlette, Pydantic, Uvicorn, background workers, and surrounding Python services.',
    ],
  },
  {
    id: 'core-language',
    title: 'Language and Runtime Consequences',
    paragraphs: [
      'ASP.NET Core runs on .NET and is usually written in C#. That brings strong static typing, mature IDE support, ahead-of-time and runtime optimization options, and a very rich enterprise application ecosystem. It also means the team is buying into .NET operational patterns and hiring assumptions.',
      'FastAPI runs in Python and benefits from Pythons enormous popularity, especially in data, machine learning, automation, and scientific computing. It also inherits Python tradeoffs: different performance characteristics, different packaging realities, and different operational expectations than a .NET service.',
      'This is why many ASP.NET Core versus FastAPI decisions are really C# plus .NET versus Python plus modern API tooling decisions. Framework ergonomics matter, but language and runtime fit matter just as much.',
    ],
  },
  {
    id: 'core-routing',
    title: 'Routing and Endpoint Style',
    paragraphs: [
      'ASP.NET Core supports several endpoint styles. Minimal APIs allow concise route registration, while controller-based APIs provide a more explicit MVC-style organization. This flexibility is useful for teams that want either compact endpoint definitions or stricter architectural separation.',
      'FastAPI uses decorator-based path operation registration directly on Python callables. The syntax is compact, highly readable, and closely tied to the request model for that endpoint.',
      'FastAPI often feels more immediately elegant for small and medium API surfaces. ASP.NET Core often feels stronger when teams want to evolve the same application into a broader platform with many cross-cutting concerns.',
    ],
  },
  {
    id: 'core-validation',
    title: 'Validation, Serialization, and Schema Model',
    paragraphs: [
      'FastAPI is one of the clearest examples of schema-driven API development. Request bodies, query parameters, and responses are described through Python type hints and Pydantic models, and that information flows naturally into validation and OpenAPI generation.',
      'ASP.NET Core also supports strong model binding, validation, and OpenAPI support, especially in modern minimal API and Web API workflows. But its ergonomics are less magical and more framework-platform oriented than FastAPIs model-centric flow.',
      'In practice, FastAPI usually feels more elegant when the API contract is the central abstraction. ASP.NET Core feels stronger when validation is one important part of a larger web platform rather than the frameworks defining identity.',
    ],
  },
  {
    id: 'core-di',
    title: 'Dependency Injection and Composition',
    paragraphs: [
      'ASP.NET Core includes built-in dependency injection as a core framework facility. Services are registered in the container and resolved throughout the application, including middleware, endpoints, controllers, and other infrastructure. This is one of the most foundational parts of the ASP.NET Core model.',
      'FastAPI also has dependency injection, but it is shaped differently. Dependencies are declared in function signatures and resolved for each request path operation. The system is powerful and integrates into validation and OpenAPI behavior, but it remains closer to endpoint composition than to a full container-centric architectural model.',
      'This difference matters in large systems. ASP.NET Core DI often feels more natural for layered application composition. FastAPI DI often feels more convenient for request-scoped API composition.',
    ],
  },
  {
    id: 'core-async',
    title: 'Async Model, Concurrency, and Throughput',
    paragraphs: [
      'ASP.NET Core is built on highly optimized .NET web server infrastructure and can handle high throughput very effectively. Async programming is a first-class part of the platform, and the overall runtime is engineered for demanding production workloads.',
      'FastAPI supports async endpoints through the ASGI stack and works very well for I/O-bound API services, especially when the surrounding Python libraries are async-friendly. Its async model is one of the reasons it became so attractive for modern Python API development.',
      'The real caution is that framework async support is only one part of the story. If a FastAPI service spends most of its time in CPU-heavy Python code, or if an ASP.NET Core service blocks in poor library choices, framework elegance alone will not save performance.',
    ],
  },
  {
    id: 'core-openapi',
    title: 'OpenAPI and Developer Ergonomics',
    paragraphs: [
      'FastAPI is especially famous for making OpenAPI documentation feel automatic and useful. The same type hints and models used to define the endpoint become the basis for validation and interactive API docs.',
      'ASP.NET Core also supports OpenAPI generation and integrates well with API documentation workflows, but it is less identified by this feature because the framework has a broader mission than API-first ergonomics alone.',
      'If a team cares deeply about having request models, docs, and validation stay aligned with very little ceremony, FastAPI often feels exceptionally satisfying.',
    ],
  },
  {
    id: 'core-data',
    title: 'Data Access, Background Work, and System Boundaries',
    paragraphs: [
      'ASP.NET Core fits naturally with the broader .NET ecosystem for data access, background services, messaging, and enterprise integration patterns. Hosted services, middleware, configuration, and official infrastructure patterns make it easier to grow one API into a broader service platform.',
      'FastAPI usually works well when paired with Python ORMs, async data libraries, Celery or other worker systems, and data-heavy Python services. It is often chosen because the API layer needs to live close to analytics or machine-learning code rather than because it wants a giant general-purpose web platform.',
      'The key question is not whether either framework can reach databases and queues. Both can. The question is whether the surrounding platform life is more naturally .NET-shaped or Python-shaped.',
    ],
  },
  {
    id: 'core-testing',
    title: 'Testing, Maintainability, and Team Scale',
    paragraphs: [
      'ASP.NET Core tends to reward teams that want explicit layering, container-driven composition, structured configuration, and repeatable enterprise patterns. That often makes it easier to keep large teams aligned over years of development.',
      'FastAPI makes small and medium API services very easy to read and test because endpoints are usually direct and model-driven. But once the system grows, maintainability depends more heavily on how disciplined the team is about structure outside the framework itself.',
      'This is another recurring theme: ASP.NET Core spends more framework surface area to help larger systems stay organized, while FastAPI spends less and relies more on the teams own conventions.',
    ],
  },
  {
    id: 'core-deploy',
    title: 'Deployment and Operational Model',
    paragraphs: [
      'ASP.NET Core applications fit naturally into .NET hosting, containerized deployment, cloud platform services, Windows or Linux hosting, and mature observability and authentication ecosystems. It is usually very comfortable in enterprise deployment environments.',
      'FastAPI applications commonly run through Uvicorn or Gunicorn-based setups, containers, serverless platforms, or Python-oriented platform environments. Deployment is straightforward, but the operational maturity depends more on the surrounding Python stack and infrastructure discipline.',
      'If the ops team already thinks in .NET service terms, ASP.NET Core is usually easier to standardize. If the org already runs many Python services and worker systems, FastAPI fits that world naturally.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance and Efficiency Tradeoffs',
    paragraphs: [
      'ASP.NET Core is widely respected for raw performance and production efficiency. Combined with modern .NET runtime improvements, it is often a strong choice for high-throughput APIs and latency-sensitive enterprise workloads.',
      'FastAPI is fast relative to much of the Python web ecosystem and is highly capable for many real-world API services. But the bigger performance conversation must include Python itself, data libraries, serialization, blocking work, and the true workload shape.',
      'If absolute performance headroom and infrastructure efficiency are top priorities, ASP.NET Core usually has the advantage. If productivity and Python ecosystem fit matter more than maximum runtime headroom, FastAPI is often the better choice.',
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Ecosystem, Hiring, and Org Fit',
    paragraphs: [
      'ASP.NET Core benefits from the depth of the .NET ecosystem, strong Microsoft stewardship, and a well-established enterprise talent pool. For many organizations, that translates into predictable hiring and long-term maintenance confidence.',
      'FastAPI benefits from the enormous popularity of Python. For organizations with data science, ML, automation, or scripting-heavy teams, FastAPI can dramatically reduce the friction between API development and surrounding business logic.',
      'This often becomes the decisive factor. Many teams do not actually need the best abstract framework. They need the framework that best fits the language, people, and systems they already have.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs and Failure Modes',
    paragraphs: [
      'ASP.NET Core can be more infrastructure-heavy than a small team really needs. For tiny APIs or highly experimental services, the broader platform can feel like more ceremony than necessary, especially if the team is not already comfortable in .NET.',
      'FastAPI can be deceptively easy to start with, which sometimes hides structural problems until later. Teams may build many request handlers quickly without investing enough in layering, domain structure, background processing boundaries, or operational discipline.',
      'The real tradeoff is not simply enterprise versus startup. It is platform breadth and long-term structure versus compact authoring speed and Python alignment.',
    ],
  },
  {
    id: 'core-checklist',
    title: 'Decision Checklist',
    bullets: [
      'Choose ASP.NET Core when the organization already runs heavily on .NET or needs high-performance API infrastructure.',
      'Choose FastAPI when Python is the natural language for the surrounding business logic or data stack.',
      'Prefer ASP.NET Core when DI, middleware, authentication integration, and long-lived service architecture are central.',
      'Prefer FastAPI when request validation, OpenAPI generation, and rapid API authoring are major priorities.',
      'If throughput, platform maturity, and multi-year maintainability dominate the discussion, ASP.NET Core usually wins.',
      'If Python ecosystem leverage and speed of authoring dominate the discussion, FastAPI usually wins.',
    ],
  },
]

const examples: ExampleItem[] = [
  {
    id: 'ex-basic',
    title: 'Basic Endpoint',
    summary:
      'Both frameworks make a simple JSON endpoint easy, but the hosting model around it feels different.',
    aspnetCode: `var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/health", () => Results.Ok(new { status = "ok" }));

app.Run();`,
    fastapiCode: `from fastapi import FastAPI

app = FastAPI()

@app.get("/health")
async def health():
    return {"status": "ok"}`,
    explanation:
      'ASP.NET Core minimal APIs are concise, but they still sit inside a larger hosting and middleware platform. FastAPI route handlers feel immediately direct and Pythonic.',
  },
  {
    id: 'ex-validation',
    title: 'Request Validation',
    summary:
      'Both frameworks can validate structured input, but FastAPI makes the schema model feel especially central.',
    aspnetCode: `public record CreateUserRequest(string Email, string Name);

app.MapPost("/users", (CreateUserRequest request) =>
{
    return Results.Created($"/users/{request.Email}", request);
});`,
    fastapiCode: `from pydantic import BaseModel
from fastapi import FastAPI

class CreateUserRequest(BaseModel):
    email: str
    name: str

app = FastAPI()

@app.post("/users")
async def create_user(request: CreateUserRequest):
    return request`,
    explanation:
      'FastAPI turns the typed model into validation and docs very naturally. ASP.NET Core also supports strong model binding, but the framework identity is not as singularly centered on this flow.',
  },
  {
    id: 'ex-di',
    title: 'Dependency Injection Shape',
    summary: 'The DI systems are both useful, but they express architectural intent differently.',
    aspnetCode: `builder.Services.AddScoped<IClock, SystemClock>();

app.MapGet("/time", (IClock clock) =>
{
    return Results.Ok(new { now = clock.UtcNow });
});`,
    fastapiCode: `from fastapi import Depends, FastAPI

app = FastAPI()

class Clock:
    def utc_now(self) -> str:
        return "2026-03-19T00:00:00Z"

def get_clock() -> Clock:
    return Clock()

@app.get("/time")
async def get_time(clock: Clock = Depends(get_clock)):
    return {"now": clock.utc_now()}`,
    explanation:
      'ASP.NET Core DI feels container-first and infrastructural. FastAPI DI feels endpoint-first and signature-driven.',
  },
]

const glossaryTerms: GlossaryItem[] = [
  {
    term: 'Minimal API',
    definition:
      'An ASP.NET Core style for defining HTTP endpoints directly with concise route mapping code.',
  },
  {
    term: 'Middleware',
    definition:
      'An ASP.NET Core request pipeline component that can inspect, transform, or short-circuit requests and responses.',
  },
  {
    term: 'Model binding',
    definition:
      'The ASP.NET Core process that maps request data into typed parameters or objects for handlers and controllers.',
  },
  {
    term: 'Pydantic model',
    definition:
      'A Python data model used by FastAPI for validation, parsing, and schema generation.',
  },
  {
    term: 'Depends',
    definition:
      'FastAPIs dependency injection mechanism for declaring per-request dependencies in endpoint signatures.',
  },
  {
    term: 'ASGI',
    definition:
      'The asynchronous server interface commonly used by Python web frameworks such as FastAPI.',
  },
  {
    term: 'OpenAPI',
    definition:
      'A machine-readable API description format used for documentation, tooling, and schema-driven workflows.',
  },
  {
    term: '.NET hosting model',
    definition:
      'The broader runtime, configuration, logging, and application startup model around ASP.NET Core services.',
  },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-philosophy', label: 'Philosophy Difference' },
    { id: 'bp-where', label: 'Where Each Fits' },
    { id: 'bp-quick-picks', label: 'Quick Decision Guide' },
  ],
  'core-concepts': [
    { id: 'core-mental', label: 'Mental Models' },
    { id: 'core-architecture', label: 'Architecture Model' },
    { id: 'core-language', label: 'Language and Runtime' },
    { id: 'core-routing', label: 'Routing' },
    { id: 'core-validation', label: 'Validation and Schema' },
    { id: 'core-di', label: 'Dependency Injection' },
    { id: 'core-async', label: 'Async and Throughput' },
    { id: 'core-openapi', label: 'OpenAPI and Docs' },
    { id: 'core-data', label: 'Data and Background Work' },
    { id: 'core-testing', label: 'Testing and Scale' },
    { id: 'core-deploy', label: 'Deployment Model' },
    { id: 'core-performance', label: 'Performance' },
    { id: 'core-ecosystem', label: 'Ecosystem and Hiring' },
    { id: 'core-tradeoffs', label: 'Tradeoffs' },
    { id: 'core-checklist', label: 'Decision Checklist' },
  ],
  examples: examples.map((example) => ({ id: example.id, label: example.title })),
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function AspNetCoreVsFastApiPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Asp Net Core Vs Fast Api Page',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Asp Net Core Vs Fast Api Page"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">{pageTitle}</h1>
      <p className="aspnet-fastapi-help-doc-subtitle">{pageSubtitle}</p>
      <p>
        This page compares ASP.NET Core and FastAPI as real backend engineering choices rather than
        as language fandom. The goal is to make the practical tradeoffs explicit: platform breadth,
        runtime consequences, routing model, validation ergonomics, dependency injection,
        throughput, deployment, ecosystem fit, and where each framework is the safer long-term
        choice.
      </p>

      {activeTab === 'big-picture' && (
        <>
          {bigPictureSections.map((section, index) => (
            <section key={section.id} id={section.id} className="bin98-section">
              <h2 className="bin98-heading">{section.title}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets && (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
              {index < bigPictureSections.length - 1 && <hr className="bin98-divider" />}
            </section>
          ))}
        </>
      )}

      {activeTab === 'core-concepts' && (
        <>
          <section id="core-mental" className="bin98-section">
            <h2 className="bin98-heading">Mental Models</h2>
            {mentalModels.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          {coreSections.map((section) => (
            <section key={section.id} id={section.id} className="bin98-section">
              <h2 className="bin98-heading">{section.title}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets && (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </>
      )}

      {activeTab === 'examples' && (
        <>
          {examples.map((example) => (
            <section key={example.id} id={example.id} className="bin98-section">
              <h2 className="bin98-heading">{example.title}</h2>
              <p>{example.summary}</p>
              <h3 className="bin98-subheading">ASP.NET Core</h3>
              <div className="bin98-codebox">
                <code>{example.aspnetCode.trim()}</code>
              </div>
              <h3 className="bin98-subheading">FastAPI</h3>
              <div className="bin98-codebox">
                <code>{example.fastapiCode.trim()}</code>
              </div>
              <p>{example.explanation}</p>
            </section>
          ))}
        </>
      )}

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
