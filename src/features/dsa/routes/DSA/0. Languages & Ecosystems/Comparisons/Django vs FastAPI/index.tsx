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
  djangoCode: string
  fastapiCode: string
  explanation: string
}

type GlossaryItem = {
  term: string
  definition: string
}

const pageTitle = 'Django vs FastAPI'
const pageSubtitle =
  'Comparing a batteries-included Python web framework with a modern API-first Python framework.'
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
      'Django and FastAPI are both Python web frameworks, but they solve different problems and reward different engineering habits. Django is a broad, batteries-included framework for building complete web applications with ORM, admin, authentication, forms, templating, middleware, and a long-established project structure. FastAPI is a modern API-first framework built on ASGI and designed to make request handling, validation, dependency injection, and automatic OpenAPI generation feel fast and direct.',
      'A useful shorthand is this: Django is a full web platform that happens to build APIs very well when needed, while FastAPI is an API platform that stays intentionally focused on HTTP services rather than on providing the entire traditional web framework surface. Both can serve backend systems. The practical decision is whether your project wants a full-stack framework with strong conventions and built-in features or a leaner framework optimized around Python APIs and typed request models.',
      'That means the real question is not Which Python framework is better. The real question is whether your workload is fundamentally a complete web application with admin, auth, ORM, and long-lived convention-driven structure, or whether it is primarily an API service where schema validation, async handlers, and compact endpoint authoring are the main source of leverage.',
    ],
  },
  {
    id: 'bp-philosophy',
    title: 'Philosophy Difference',
    paragraphs: [
      'Django behaves like a full application framework. The official docs present it as taking care of much of the hassle of web development so you can focus on writing your app without needing to reinvent common parts. That statement is reflected in the product itself. Django expects models, migrations, admin, authentication, middleware, URL routing, templating, forms, and project structure to be first-class concerns.',
      'FastAPI behaves like an API framework with a strong focus on type-driven developer ergonomics. The official tutorial and features documentation emphasize type hints, data validation, dependency injection, async support, and automatic interactive docs. FastAPI does not try to be a giant full-stack web platform in the same sense as Django. It tries to make HTTP APIs exceptionally pleasant and explicit in Python.',
      'This is why Django often feels broader and more opinionated, while FastAPI often feels narrower and more immediately efficient for service endpoints. Django gives you more built-in platform. FastAPI gives you a more concentrated API authoring experience.',
    ],
  },
  {
    id: 'bp-where',
    title: 'Where Each Fits Best',
    paragraphs: [
      'Django is strongest for products that want a primary relational app backend with strong conventions, admin interfaces, user accounts, forms, template rendering, and long-term maintainability through a stable project structure. It is especially strong for SaaS backends, internal business systems, content-driven products, dashboards, portals, and systems where the admin and ORM are real accelerators rather than side details.',
      'FastAPI is strongest for API services, microservices, ML and data-adjacent backends, Python-heavy service layers, and teams that want request and response validation to be central to the framework experience. It is especially attractive for services that already live in the Python ecosystem but do not need the rest of a classic web framework such as template rendering or a built-in admin site.',
      'If the core question is Which framework best supports a full Python web application with many built-in capabilities, Django usually wins. If the core question is Which framework lets a Python team build typed APIs quickly with minimal ceremony, FastAPI usually wins.',
    ],
  },
  {
    id: 'bp-quick-picks',
    title: 'Quick Decision Guide',
    bullets: [
      'Choose Django when ORM, admin, authentication, templates, and strong framework conventions matter most.',
      'Choose FastAPI when API-first design, schema validation, and async endpoint ergonomics matter most.',
      'Choose Django when the app is broader than an API and wants long-lived full-stack structure.',
      'Choose FastAPI when the service is mostly HTTP contracts plus Python business logic and surrounding services.',
      'If the debate is really full application framework versus API framework, that is the true decision boundary.',
    ],
  },
]

const mentalModels = [
  {
    title: 'Django is batteries included',
    detail:
      'ORM, admin, forms, auth, templating, migrations, and middleware are ordinary parts of the framework rather than optional add-ons.',
  },
  {
    title: 'FastAPI is API-first',
    detail:
      'Its center of gravity is request handling, validation, dependency injection, async support, and docs generation.',
  },
  {
    title: 'Django prefers project structure and conventions',
    detail:
      'It helps larger applications stay coherent by giving teams a common architectural language early.',
  },
  {
    title: 'FastAPI prefers directness through typing',
    detail:
      'Function signatures and Pydantic-style models become a major source of truth for validation and docs.',
  },
  {
    title: 'Async means different things in each framework',
    detail:
      'FastAPI was designed around ASGI and async endpoints. Django supports async views too, but large parts of the classic Django stack still reflect a broader historical framework model.',
  },
  {
    title: 'The admin matters more than people admit',
    detail:
      'Djangos admin can eliminate entire classes of back-office work. FastAPI deliberately does not try to solve that same problem.',
  },
  {
    title: 'Both are Python decisions, but not the same kind of Python decision',
    detail:
      'Django is a full product-platform choice inside Python. FastAPI is a focused service-framework choice inside Python.',
  },
]

const coreSections: DocSection[] = [
  {
    id: 'core-platform-shape',
    title: 'Overall Platform Shape',
    paragraphs: [
      'Django is a framework platform. Its major built-in pieces are meant to work together: ORM, migrations, auth, admin, middleware, URL routing, forms, templating, and management commands. This matters because it lets teams build full applications without having to assemble the fundamentals from many independent packages. That integrated shape is one of Django biggest strengths.',
      'FastAPI is much more deliberately scoped. It is a web framework for building APIs with Python type hints, but it usually lives alongside other pieces such as SQLAlchemy, a background worker system, a templating layer if needed, and surrounding Python tooling. This is not a flaw. It is the point. FastAPI stays focused on making API work pleasant instead of trying to be the center of all web concerns.',
      'The practical difference is that Django can be the whole application framework for a team, while FastAPI is often the API layer within a broader Python service architecture.',
    ],
  },
  {
    id: 'core-orm-admin',
    title: 'ORM, Admin, and Data-Centric Productivity',
    paragraphs: [
      'Django ORM and migrations are central to the framework identity, and the admin is a major differentiator. The Django admin docs are explicit that the admin site exists for trusted site administrators and is tightly integrated with your data model. In practice this often means teams can stand up internal operations screens, content workflows, moderation tools, and management interfaces at a speed that would otherwise require significant custom engineering.',
      'FastAPI does not come with an equivalent built-in admin or an opinionated ORM. That is usually the correct trade for API-focused work, but it means teams must assemble more of the surrounding application platform themselves if the service grows beyond pure API concerns. If you need an admin, you build or adopt one. If you need a specific ORM pattern, you choose and integrate it.',
      'This is one of the clearest reasons to choose Django. If the data model is central and back-office management screens matter, Djangos built-in platform often creates leverage that FastAPI intentionally does not try to provide.',
    ],
  },
  {
    id: 'core-routing',
    title: 'Routing and Endpoint Style',
    paragraphs: [
      'Django routing is explicit and stable, but its natural style often reflects the fact that it is solving more than pure API concerns. URL configuration, views, class-based views, templates, forms, and app structure all live inside a mature framework vocabulary. That can feel slightly heavier than API-only frameworks, but it also keeps large apps organized over time.',
      'FastAPI uses decorator-based path operations directly on callables, and the route declaration is closely tied to the endpoint signature. This is one reason FastAPI feels immediately expressive. The code that defines the route often simultaneously defines the input contract, output contract, validation behavior, and docs metadata.',
      'FastAPI often feels cleaner for a narrow API surface. Django often feels stronger when routes are only one part of a bigger application story.',
    ],
  },
  {
    id: 'core-validation',
    title: 'Validation, Serialization, and Schema Shape',
    paragraphs: [
      'FastAPI is especially strong when request and response schemas are the heart of the system. Python type hints and Pydantic models drive parsing, validation, error reporting, and OpenAPI output in a way that feels unusually tight and productive. The framework identity is closely tied to this typed request-model workflow.',
      'Django can absolutely validate data and serialize it through forms, serializers when using Django REST Framework, model constraints, and broader framework machinery. But the experience is not centered on the same direct type-signature-to-schema pipeline that makes FastAPI feel so compact for API work. Django cares about many other application concerns in parallel.',
      'So if the product team thinks of the API contract itself as the main source of truth, FastAPI usually feels more natural. If validation is just one component inside a broader application platform, Django remains very comfortable.',
    ],
  },
  {
    id: 'core-async',
    title: 'Async Support and Concurrency Model',
    paragraphs: [
      'FastAPI is built on ASGI and treats async endpoints as a first-class part of normal development. This makes it attractive for I/O-bound services, async database access patterns, and modern service architectures that want Python endpoints to feel lightweight and concurrent.',
      'Django supports async views and async request handling in modern versions, but the Django docs are careful about where async and sync boundaries still matter. In particular, not every part of the traditional Django stack has the same async story, and teams need to understand those boundaries instead of assuming Django is simply FastAPI with templates added on top.',
      'The right interpretation is not that Django lacks async. It is that FastAPI was born around an API and ASGI-first model, while Django evolved a broader framework into the async era. That difference still shapes how each framework feels in day-to-day development.',
    ],
  },
  {
    id: 'core-auth',
    title: 'Authentication, Users, and Application Features',
    paragraphs: [
      'Django includes a mature authentication system and a broad set of application features that matter a great deal in real products. User models, sessions, forms, admin permissions, middleware, and template integration mean many common product requirements already have a strong first-class home. This is one reason Django remains so effective for full web applications.',
      'FastAPI can absolutely support authentication and authorization, but it does so through composable API patterns, dependencies, and surrounding libraries rather than through one large built-in application platform. This is excellent when the service only needs token-based API auth and a few focused abstractions. It is less magical when the product wants the full user-management and application-feature experience that Django already expects to host.',
      'If auth is part of a broader application platform story, Django often creates more leverage. If auth is one focused concern inside an API service, FastAPI is usually sufficient and pleasantly direct.',
    ],
  },
  {
    id: 'core-di',
    title: 'Dependency Injection and Composition Style',
    paragraphs: [
      'FastAPI includes a dependency system centered on function signatures and request-scoped composition. Dependencies declared with `Depends` integrate neatly into endpoint definitions and work naturally with validation and docs. This keeps the composition model close to the place where HTTP behavior is defined.',
      'Django does not revolve around dependency injection in the same explicit way. It relies more on framework conventions, application structure, settings, middleware, model layers, service abstractions that you define, and the broader object model of the framework. Some teams see this as less explicit. Other teams see it as a simpler consequence of a framework that already provides more built-in structure.',
      'The practical difference is that FastAPI often feels elegant for service composition at the endpoint layer, while Django often feels stronger when the framework itself already solves enough of the architecture that explicit DI is not the main design tool.',
    ],
  },
  {
    id: 'core-openapi',
    title: 'OpenAPI, Docs, and API Developer Experience',
    paragraphs: [
      'FastAPI is especially well known for automatic OpenAPI docs and interactive API exploration. The request and response models flow into generated docs naturally, which means the development experience often feels aligned: define the endpoint once, get validation and docs from the same source of truth, and move on.',
      'Django by itself is not centered on automatic API documentation because its mission is larger than API developer ergonomics. In practice many Django API teams use Django REST Framework and related tooling when API documentation becomes a major concern. That works well, but it also shows the difference in framework identity. FastAPI is API-docs-native in a way Django is not trying to be.',
      'If external API consumers, quick schema iteration, and low-friction docs are central to the product, FastAPI usually feels better immediately.',
    ],
  },
  {
    id: 'core-data-workflows',
    title: 'Data Access, Background Work, and Broader System Boundaries',
    paragraphs: [
      'Django fits naturally with relational application development. The ORM, migrations, transactions, admin, and model conventions make it easy to treat the database as the center of a long-lived business application. Background jobs, caching, and messaging are common too, but they usually orbit a strongly modeled relational app core.',
      'FastAPI often fits systems where the API layer sits next to other Python concerns such as ML inference, data processing, task queues, or specialized service logic. It does not impose one dominant data model in the same way Django does. That flexibility is valuable when the service is more of an integration or computation boundary than a classic CRUD web application.',
      'So the key question is whether the application is fundamentally database-and-business-model-centered or API-and-service-boundary-centered. Django tends to win the first shape. FastAPI tends to win the second.',
    ],
  },
  {
    id: 'core-testing',
    title: 'Testing, Maintainability, and Team Scale',
    paragraphs: [
      'Django often rewards teams that want explicit conventions and a durable project vocabulary. Models, apps, migrations, middleware, templates, admin registrations, and management commands create a shared structure that helps larger teams stay aligned over time. This is one reason Django has remained productive for mature products rather than only for prototypes.',
      'FastAPI makes small and medium API services extremely readable because the important behavior usually sits close to the endpoint definition. But as systems grow, maintainability depends more on the teams own discipline about layering, services, repository patterns, background work boundaries, and domain organization outside the framework core.',
      'This is a recurring theme: Django spends more framework surface area to help large applications stay structured. FastAPI spends less framework surface area and relies more heavily on the teams own architectural habits.',
    ],
  },
  {
    id: 'core-deploy',
    title: 'Deployment and Operational Model',
    paragraphs: [
      'Django deployment is very mature. WSGI and ASGI options, management commands, migrations, static asset workflows, admin-backed operational processes, and broad hosting support make Django straightforward to run in conventional production environments. It is especially comfortable in organizations that expect long-lived services with conventional app lifecycle processes.',
      'FastAPI typically runs in an ASGI stack with Uvicorn or similar servers and fits naturally into containerized service deployments, serverless-style API hosting, and Python service meshes. The deployment story is clear, but it is usually more service-oriented than application-platform-oriented. That is often perfect for APIs and microservices.',
      'If the ops team wants a classic application deployment shape with lots of surrounding framework conventions, Django is often easier to standardize. If the ops team mostly thinks in API processes and Python services, FastAPI feels cleaner.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance and Efficiency Tradeoffs',
    paragraphs: [
      'FastAPI is widely regarded as fast within the Python ecosystem, especially for API services, and its ASGI-first design helps it fit modern I/O-bound workloads well. For many teams this makes FastAPI feel like the high-performance default Python API framework.',
      'Django can absolutely power serious production systems, but raw API throughput is usually not the reason teams reach for it. Teams choose Django more often because it solves more of the total product problem, not because it maximizes minimal-ceremony API speed. In many applications, that broader leverage matters more than benchmark posture.',
      'So performance should be framed carefully. If the only job is to expose an efficient Python API surface, FastAPI often has the cleaner story. If the larger product benefits from Djangos integrated platform, the total engineering leverage can outweigh raw framework minimalism.',
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Ecosystem, Hiring, and Organizational Fit',
    paragraphs: [
      'Django benefits from long-term maturity, extensive documentation, a large ecosystem, and a deep pool of engineers who understand how to build structured Python web applications. For many organizations this creates confidence that the framework will remain maintainable and easy to staff over a long horizon.',
      'FastAPI benefits from strong mindshare among modern Python backend engineers, especially teams near data science, machine learning, and service-heavy architectures. It often feels more aligned with current Python API development habits, and it integrates naturally into codebases that already rely heavily on typed data models and service endpoints.',
      'This often becomes decisive. Some teams need a complete and stable application framework culture. Others need a modern API framework that sits comfortably beside the rest of a Python service and data stack.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs and Failure Modes',
    paragraphs: [
      'Django can be more framework than a small API service really needs. If the project does not benefit from the ORM, admin, auth system, templates, or the broader application conventions, the framework can feel heavier than necessary and may encourage carrying more platform than the service actually uses.',
      'FastAPI can be deceptively easy to start with, which makes it easy for teams to ship many endpoints quickly without investing enough in long-term structure. The danger is not that FastAPI is weak. The danger is that the frameworks very low-friction API surface can hide the need for stronger application architecture once the system becomes large.',
      'The real tradeoff is not old versus new or enterprise versus startup. It is broad built-in application leverage versus compact API leverage and how much surrounding structure the team wants the framework itself to provide.',
    ],
  },
  {
    id: 'core-checklist',
    title: 'Decision Checklist',
    bullets: [
      'Choose Django when ORM, admin, auth, and framework conventions are major sources of leverage.',
      'Choose FastAPI when the service is primarily an API and typed request-schema ergonomics are central.',
      'Prefer Django when the product is broader than an API and wants a long-lived application platform.',
      'Prefer FastAPI when the service sits beside other Python systems such as workers, ML code, or data-processing services.',
      'If maintainable full-stack application structure dominates the conversation, Django usually wins.',
      'If API authoring speed, OpenAPI generation, and ASGI-first service design dominate the conversation, FastAPI usually wins.',
    ],
  },
]

const examples: ExampleItem[] = [
  {
    id: 'ex-basic',
    title: 'Basic JSON Endpoint',
    summary:
      'Both frameworks can return JSON easily, but the surrounding platform assumptions differ.',
    djangoCode: `from django.http import JsonResponse
from django.urls import path

def health(_request):
    return JsonResponse({'status': 'ok'})

urlpatterns = [
    path('health/', health),
]`,
    fastapiCode: `from fastapi import FastAPI

app = FastAPI()

@app.get('/health')
async def health():
    return {'status': 'ok'}`,
    explanation:
      'FastAPI presents the endpoint directly as the main abstraction. Django can do the same endpoint cleanly, but the framework still assumes a larger application platform around it.',
  },
  {
    id: 'ex-validation',
    title: 'Validate Structured Input',
    summary:
      'Validation exists in both worlds, but FastAPI makes schema-driven API contracts especially central.',
    djangoCode: `from django import forms

class CreateUserForm(forms.Form):
    email = forms.EmailField()
    name = forms.CharField(max_length=100)`,
    fastapiCode: `from pydantic import BaseModel

class CreateUserRequest(BaseModel):
    email: str
    name: str`,
    explanation:
      'Django has mature validation tools, but FastAPI makes typed request models the main path for API contracts, validation, and docs all at once.',
  },
  {
    id: 'ex-admin',
    title: 'Register a Model for Management',
    summary:
      'This is one of the clearest places where Django gives built-in leverage FastAPI does not try to replicate.',
    djangoCode: `from django.contrib import admin
from .models import Customer

admin.site.register(Customer)`,
    fastapiCode: `# FastAPI has no built-in equivalent admin site.
# Teams usually build internal tooling separately or adopt another package.`,
    explanation:
      'Djangos admin can turn a model into an internal management interface almost immediately. FastAPI stays focused on APIs and leaves that problem to surrounding tooling or custom development.',
  },
  {
    id: 'ex-dependency',
    title: 'Inject a Per-Request Dependency',
    summary: 'The two frameworks express composition very differently.',
    djangoCode: `def current_time(_request):
    return {'now': '2026-03-20T00:00:00Z'}`,
    fastapiCode: `from fastapi import Depends, FastAPI

app = FastAPI()

class Clock:
    def utc_now(self) -> str:
        return '2026-03-20T00:00:00Z'

def get_clock() -> Clock:
    return Clock()

@app.get('/time')
async def get_time(clock: Clock = Depends(get_clock)):
    return {'now': clock.utc_now()}`,
    explanation:
      'FastAPI makes request-scoped dependency declaration a visible part of the endpoint signature. Django usually relies more on framework structure and application conventions than on one explicit DI mechanism.',
  },
]

const glossaryTerms: GlossaryItem[] = [
  {
    term: 'Batteries included',
    definition:
      'A framework style where many common features are built in and designed to work together out of the box.',
  },
  {
    term: 'Django admin',
    definition:
      'Djangos built-in site for trusted administrators to manage models and application data.',
  },
  {
    term: 'ORM',
    definition:
      'Object-relational mapping layer used to map Python objects to relational database tables and queries.',
  },
  {
    term: 'ASGI',
    definition:
      'Asynchronous Server Gateway Interface, the Python standard used by FastAPI and other modern async frameworks.',
  },
  {
    term: 'Pydantic model',
    definition:
      'A typed Python data model used by FastAPI for parsing, validation, and schema generation.',
  },
  {
    term: 'Depends',
    definition: 'FastAPI dependency declaration mechanism used in endpoint signatures.',
  },
  {
    term: 'Migration',
    definition: 'A versioned database schema change managed by the framework or ORM tooling.',
  },
  {
    term: 'Middleware',
    definition:
      'A request and response processing layer that can inspect or modify traffic before it reaches the view or endpoint.',
  },
  {
    term: 'OpenAPI',
    definition: 'A machine-readable API description format used for documentation and tooling.',
  },
  {
    term: 'Class-based view',
    definition:
      'A Django view pattern that organizes request handling behavior into classes instead of simple functions.',
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
    { id: 'core-platform-shape', label: 'Platform Shape' },
    { id: 'core-orm-admin', label: 'ORM and Admin' },
    { id: 'core-routing', label: 'Routing' },
    { id: 'core-validation', label: 'Validation and Schema' },
    { id: 'core-async', label: 'Async Support' },
    { id: 'core-auth', label: 'Auth and User Features' },
    { id: 'core-di', label: 'Dependency Composition' },
    { id: 'core-openapi', label: 'OpenAPI and Docs' },
    { id: 'core-data-workflows', label: 'Data and Background Work' },
    { id: 'core-testing', label: 'Testing and Team Scale' },
    { id: 'core-deploy', label: 'Deployment Model' },
    { id: 'core-performance', label: 'Performance' },
    { id: 'core-ecosystem', label: 'Ecosystem and Hiring' },
    { id: 'core-tradeoffs', label: 'Tradeoffs' },
    { id: 'core-checklist', label: 'Decision Checklist' },
  ],
  examples: examples.map((example) => ({ id: example.id, label: example.title })),
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function DjangoVsFastApiPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle,
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title={pageTitle}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">{pageTitle}</h1>
      <p className="bin98-doc-subtitle">{pageSubtitle}</p>
      <p>
        This page compares Django and FastAPI as real backend engineering choices rather than as
        Python brand labels. The goal is to make the practical tradeoffs explicit: framework
        breadth, ORM and admin leverage, async behavior, API validation ergonomics, deployment
        shape, ecosystem fit, and where each framework is the stronger long-term bet.
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
              <h3 className="bin98-subheading">Django</h3>
              <div className="bin98-codebox">
                <code>{example.djangoCode.trim()}</code>
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
