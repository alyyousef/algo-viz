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
  flaskCode: string
  fastapiCode: string
  explanation: string
}

type GlossaryItem = {
  term: string
  definition: string
}

const pageTitle = 'Flask vs FastAPI'
const pageSubtitle =
  'Comparing a minimalist WSGI web microframework with an API-first ASGI framework built around typing and OpenAPI.'
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
      'Flask and FastAPI are both Python web frameworks, but they are optimized for different kinds of work. Flask is a lightweight microframework built on Werkzeug and Jinja that gives you routing, request and response handling, templates, and a small clean core you can extend with your own choices. FastAPI is an API-first framework built on ASGI that emphasizes type hints, validation, automatic OpenAPI generation, dependency injection, and modern async HTTP service development.',
      'A useful shorthand is this: Flask is strongest when you want a small, flexible Python web foundation and are comfortable choosing more of the surrounding architecture yourself. FastAPI is strongest when the product is primarily an HTTP API and you want request models, validation, docs, and endpoint structure to be first-class parts of the framework.',
      'That means the real question is not Which Python framework is newer. The real question is whether your team wants a general-purpose microframework with a long extension ecosystem and minimal core assumptions, or an API framework whose main source of leverage is typed contracts and ASGI-native service ergonomics.',
    ],
  },
  {
    id: 'bp-philosophy',
    title: 'Philosophy Difference',
    paragraphs: [
      'Flask follows the microframework idea. It intentionally keeps the core small and does not force one large batteries-included application platform on you. The result is flexibility. You can start with a tiny app and then add extensions, templates, ORMs, auth libraries, CLI commands, blueprints, and deployment structure as the project grows.',
      'FastAPI follows an API-first philosophy. It expects that request and response schemas matter, that type hints should drive validation and documentation, and that async support should be natural instead of bolted on. It does not try to solve every classic web concern equally. It tries to make HTTP APIs and service endpoints feel explicit, productive, and well-described.',
      'This is why Flask often feels broader but more manual, while FastAPI often feels narrower but more opinionated in exactly the places API teams care about most.',
    ],
  },
  {
    id: 'bp-where',
    title: 'Where Each Fits Best',
    paragraphs: [
      'Flask is strongest for small to medium web applications, internal tools, admin backends, lightweight services, traditional server-rendered apps, and projects where team members want complete control over surrounding libraries and architecture. It is especially useful when the application is not only an API and may include templates, forms, sessions, or a custom composition of extensions.',
      'FastAPI is strongest for JSON APIs, microservices, typed backend contracts, modern service architectures, and teams that want automatic interactive docs plus validation derived from code. It is especially attractive when APIs are a product surface, when request schema correctness is central, or when async I/O patterns matter.',
      'If the application is fundamentally a small flexible web service or web app shell, Flask is often the more natural fit. If the application is fundamentally an API product or service boundary, FastAPI is often the more natural fit.',
    ],
  },
  {
    id: 'bp-quick-picks',
    title: 'Quick Decision Guide',
    bullets: [
      'Choose Flask when flexibility, simplicity, and a small core matter more than built-in API ergonomics.',
      'Choose FastAPI when validation, OpenAPI docs, typed contracts, and async-first service development matter most.',
      'Choose Flask when the app is not only an API and may mix templates, sessions, extensions, and custom structure.',
      'Choose FastAPI when the API contract itself is a central source of truth for the system.',
      'If the real debate is microframework flexibility versus API-first structure, that is the actual decision boundary.',
    ],
  },
]

const mentalModels: Array<{ title: string; detail: string }> = [
  {
    title: 'Flask is a toolkit-shaped framework',
    detail:
      'It gives you a strong minimal core and expects you to assemble more of the surrounding stack yourself.',
  },
  {
    title: 'FastAPI is a contract-shaped framework',
    detail:
      'Types, validation, docs, and endpoint definitions are closely tied together by design.',
  },
  {
    title: 'Flask is historically WSGI-first',
    detail:
      'Its architecture is rooted in the classic Python web server model even though modern Flask also supports async views.',
  },
  {
    title: 'FastAPI is ASGI-first',
    detail:
      'Async request handling, modern server tooling, and protocol-oriented web services are part of the default mental model.',
  },
  {
    title: 'Flask loves explicit composition',
    detail:
      'Blueprints, extensions, factories, and your own module boundaries determine the larger shape of the app.',
  },
  {
    title: 'FastAPI loves explicit schemas',
    detail:
      'Function signatures and request models are expected to describe both behavior and contract.',
  },
  {
    title: 'Async does not mean the same thing in both frameworks',
    detail:
      'FastAPI is designed around async I/O. Flask can run async views, but async in Flask does not magically turn it into the same concurrency model as an ASGI-native framework.',
  },
]

const coreSections: DocSection[] = [
  {
    id: 'core-platform-shape',
    title: 'Overall Platform Shape',
    paragraphs: [
      'Flask gives you routing, request handling, templating, a development server, and a compact set of core concepts, then lets you decide how the rest of the application should be assembled. That is one of Flask strongest qualities. The framework rarely fights you about architecture because it tries not to own too much of it.',
      'FastAPI provides more opinionated leverage for API work immediately. Request parsing, validation, dependency injection, response modeling, and documentation generation all connect naturally to the endpoint signature. The framework feels like it wants the API surface to be defined in one place and to have that definition power several downstream concerns.',
      'The practical difference is that Flask feels like a web framework core you grow into an application architecture, while FastAPI feels like an API architecture that is already partially encoded into the framework.',
    ],
  },
  {
    id: 'core-routing',
    title: 'Routing and Endpoint Style',
    paragraphs: [
      'Flask routing is simple and explicit. Decorators bind URL paths to Python callables, and blueprints let you organize related routes into modules. The style is easy to teach and easy to read. It does not try to infer very much beyond the route itself.',
      'FastAPI also uses decorators for routes, but the endpoint signature carries much more semantic weight. Path parameters, query parameters, headers, request bodies, dependencies, and response models can all be expressed through the function signature and type annotations. That makes the route declaration more powerful, but also more framework-specific in how it encodes behavior.',
      'Flask often feels simpler at first glance. FastAPI often feels more expressive once the API contract grows more complex.',
    ],
  },
  {
    id: 'core-validation',
    title: 'Validation, Parsing, and Schema Contracts',
    paragraphs: [
      'Flask does not center the framework around automatic request-model validation. You can validate request data well, but you usually choose the validation approach yourself through libraries, forms, marshmallow-style schemas, pydantic, or custom logic. This keeps Flask flexible, but also means consistency depends heavily on project discipline.',
      'FastAPI was built around type-driven validation. Request bodies, query parameters, and responses can all be declared with typed models, and the framework uses those declarations for parsing, validation, error reporting, and generated docs. This is one of the main reasons FastAPI became popular so quickly.',
      'If your team wants the request and response contract to be mechanically enforced by the framework, FastAPI usually wins. If your team wants total freedom over validation style or does not need heavy schema machinery, Flask remains comfortable.',
    ],
  },
  {
    id: 'core-docs',
    title: 'OpenAPI and Interactive Documentation',
    paragraphs: [
      'Flask by itself is not an OpenAPI-first framework. You can absolutely add documentation tooling, but it is not the natural core identity of the framework. Many Flask codebases document APIs through external tooling, custom schemas, or additional libraries rather than getting a rich interactive docs experience by default.',
      'FastAPI treats API documentation as part of the normal workflow. OpenAPI schemas and interactive docs are generated automatically from the same code that defines validation and routing. That creates a tight feedback loop between design, implementation, and docs.',
      'This is a major decision boundary. If external API consumers, rapid contract iteration, and interactive docs matter, FastAPI provides unusually strong default leverage.',
    ],
  },
  {
    id: 'core-wsgi-asgi',
    title: 'WSGI, ASGI, and Concurrency Model',
    paragraphs: [
      'Flask is rooted in WSGI. Modern Flask supports async views, but the official docs are explicit that each request still ties up one worker, even for async views. In other words, async in Flask can help inside a request, but it does not fundamentally turn Flask into an ASGI-native high-concurrency framework. That nuance matters because teams often overread the existence of async support.',
      'FastAPI is built on ASGI through Starlette. Async endpoints are a first-class part of the framework and fit naturally with async database clients, streaming, WebSockets, and modern Python service deployment. The framework and ecosystem assume this model from the start.',
      'So the right comparison is not Flask cannot do async and FastAPI can. The right comparison is Flask supports async within a WSGI-shaped framework model, while FastAPI is architected around ASGI as a primary runtime model.',
    ],
  },
  {
    id: 'core-templates',
    title: 'Templates, HTML, and Traditional Web App Patterns',
    paragraphs: [
      'Flask has a comfortable story for classic server-rendered web applications because Jinja integration is part of the framework ecosystem. Sessions, template rendering, and simple browser-oriented workflows are familiar territory for Flask, which is one reason it remains popular for internal tools and small product backends.',
      'FastAPI can absolutely return HTML and work with templates, but that is not where the framework identity is strongest. The framework is optimized around APIs first, not around traditional template-driven application patterns.',
      'If the application is partly a classic Python web app rather than mainly an API, Flask often has the more natural feel.',
    ],
  },
  {
    id: 'core-di',
    title: 'Dependency Injection and Composition Style',
    paragraphs: [
      'Flask relies more on application structure, request context, globals such as g, extension setup, blueprints, and ordinary Python composition than on one explicit dependency injection mechanism. Some teams love this because it keeps things lightweight. Other teams find that it pushes too much architectural responsibility onto the codebase itself.',
      'FastAPI includes an explicit dependency system with Depends, making request-scoped composition a first-class part of the endpoint declaration. That is useful for auth, service access, shared validation logic, and request resources because the wiring stays close to the endpoint surface.',
      'Flask often feels freer. FastAPI often feels more standardized. Which one is better depends on whether your team wants fewer framework patterns or more built-in structure.',
    ],
  },
  {
    id: 'core-extensions',
    title: 'Extensions, Ecosystem, and Architectural Control',
    paragraphs: [
      'Flask has a long extension ecosystem and a mature culture of composing your own stack. SQLAlchemy integrations, auth libraries, admin tools, rate limiting, form handling, and many other concerns can be added selectively. This is powerful because the team can keep the framework small while still building real products.',
      'FastAPI has an active ecosystem too, but the center of gravity is different. Many supporting pieces are chosen because they fit the API-first design, such as Pydantic models, ASGI servers, and modern auth helpers. The ecosystem often feels narrower but more aligned around service development.',
      'If your team values maximal architectural control and library choice, Flask often feels better. If your team values a stronger default center of gravity for APIs, FastAPI usually feels better.',
    ],
  },
  {
    id: 'core-testing',
    title: 'Testing, Maintainability, and Team Scale',
    paragraphs: [
      'Flask codebases can stay extremely clean, but that cleanliness depends on how the team structures the app. Because the framework core is small, long-term maintainability is more a reflection of your architecture than of the framework imposing one. That is both a strength and a risk.',
      'FastAPI tends to make endpoint contracts more explicit, which can help larger API teams maintain consistency around validation and docs. But the framework can also encourage packing too much behavior into endpoint-layer constructs if the team does not maintain clear service boundaries behind them.',
      'The maintainability tradeoff is therefore different, not one-sided. Flask risks inconsistency through under-structure. FastAPI risks overconcentrating application logic around API-layer abstractions if the codebase is not disciplined.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance and Efficiency Tradeoffs',
    paragraphs: [
      'FastAPI is often chosen partly because its ASGI-first design and modern stack make it a strong fit for high-throughput API services in Python. That does not mean every Flask service is slow or that framework benchmarks alone should decide architecture. But if the workload is primarily API traffic and async I/O, FastAPI generally has the cleaner performance story.',
      'Flask performance is often entirely sufficient for many business systems, internal apps, and moderate-scale APIs. Teams usually choose Flask because of simplicity and flexibility, not because they expect it to be the highest-throughput API framework in Python.',
      'Performance should therefore be framed honestly. If the only job is to expose an efficient modern API surface, FastAPI often has the stronger default posture. If the application shape benefits more from Flask simplicity than from maximal API ergonomics, that broader engineering trade can still be the right one.',
    ],
  },
  {
    id: 'core-deploy',
    title: 'Deployment and Operational Model',
    paragraphs: [
      'Flask deployment is straightforward and mature. Gunicorn, uWSGI, mod_wsgi, and a wide range of container and platform hosting patterns are familiar territory. Operations teams tend to understand Flask services easily because they behave like ordinary Python web apps.',
      'FastAPI also deploys cleanly, usually through ASGI servers such as Uvicorn or Gunicorn with Uvicorn workers. It fits especially naturally into containerized API platforms and service-oriented deployments.',
      'If the ops team thinks in traditional Python web services, Flask will feel extremely familiar. If the ops team already lives in modern ASGI and service-heavy deployment patterns, FastAPI will often feel more natural.',
    ],
  },
  {
    id: 'core-websockets',
    title: 'WebSockets and Modern Protocol Features',
    paragraphs: [
      'FastAPI inherits strong support for modern protocol-oriented web service features from the ASGI stack, including WebSockets. That makes it attractive when the service surface is more than basic request and response JSON.',
      'Flask is not primarily designed around WebSockets in the same built-in way. Real-time bidirectional patterns usually require additional tooling or adjacent libraries, because the framework core is centered on the classic request-response web model.',
      'If WebSockets or other ASGI-native features are important, FastAPI usually has the cleaner story.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs and Failure Modes',
    paragraphs: [
      'Flask becomes the wrong choice when the team really wanted automatic schema validation, OpenAPI docs, structured API ergonomics, and ASGI-native behavior but chose Flask because it felt simpler at day one. The failure mode is not that Flask cannot build the service. The failure mode is that the team ends up rebuilding too much API infrastructure manually.',
      'FastAPI becomes the wrong choice when the team really wanted a tiny flexible web framework or a mixed web app stack but chose FastAPI for hype or benchmarks. The failure mode is not that FastAPI is weak. The failure mode is that the framework center of gravity pulls the codebase toward API patterns that were never the main problem to solve.',
      'Both frameworks are excellent. Flask is painful when a team keeps having to reintroduce the machinery FastAPI already wanted to provide. FastAPI is painful when a team did not actually want an API-first framework in the first place.',
    ],
  },
  {
    id: 'core-checklist',
    title: 'Decision Checklist',
    bullets: [
      'Choose Flask when the app needs a small flexible core and the team wants control over surrounding architecture.',
      'Choose FastAPI when request and response schemas, validation, and docs should be first-class framework features.',
      'Prefer Flask when server-rendered pages, simple services, or custom extension composition matter most.',
      'Prefer FastAPI when the system is primarily an API or microservice boundary.',
      'Prefer Flask when the team values minimalism over built-in API structure.',
      'Prefer FastAPI when the team values standardization around typed API contracts and ASGI-native async behavior.',
    ],
  },
]

const examples: ExampleItem[] = [
  {
    id: 'ex-basic',
    title: 'Basic JSON Endpoint',
    summary: 'Both frameworks make this easy, but the surrounding framework assumptions differ.',
    flaskCode: `from flask import Flask, jsonify

app = Flask(__name__)

@app.get("/health")
def health():
    return jsonify({"status": "ok"})`,
    fastapiCode: `from fastapi import FastAPI

app = FastAPI()

@app.get("/health")
async def health():
    return {"status": "ok"}`,
    explanation:
      'Both are concise. Flask gives a minimal HTTP handler. FastAPI gives an endpoint that already sits inside a typed API framework with docs and validation machinery available immediately.',
  },
  {
    id: 'ex-validation',
    title: 'Validate Structured Input',
    summary: 'This is one of the clearest places where the frameworks diverge.',
    flaskCode: `from flask import Flask, request, jsonify

app = Flask(__name__)

@app.post("/users")
def create_user():
    payload = request.get_json() or {}
    email = payload.get("email")
    name = payload.get("name")

    if not email or not name:
        return jsonify({"error": "email and name are required"}), 400

    return jsonify({"email": email, "name": name}), 201`,
    fastapiCode: `from fastapi import FastAPI
from pydantic import BaseModel, EmailStr

app = FastAPI()

class CreateUserRequest(BaseModel):
    email: EmailStr
    name: str

@app.post("/users")
async def create_user(body: CreateUserRequest):
    return body`,
    explanation:
      'Flask can validate well, but you choose the mechanism. FastAPI makes typed validation the default path for request handling.',
  },
  {
    id: 'ex-blueprint-router',
    title: 'Organize Routes',
    summary: 'Both frameworks support modular routing, but they package it differently.',
    flaskCode: `from flask import Blueprint

users = Blueprint("users", __name__, url_prefix="/users")

@users.get("/")
def list_users():
    return {"items": []}`,
    fastapiCode: `from fastapi import APIRouter

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/")
async def list_users():
    return {"items": []}`,
    explanation:
      'Flask blueprints are a classic modularization tool in the Flask ecosystem. FastAPI routers play a similar role but stay closely tied to OpenAPI metadata and typed endpoint structure.',
  },
  {
    id: 'ex-dependency',
    title: 'Inject a Shared Dependency',
    summary: 'The composition style tells you a lot about the framework.',
    flaskCode: `from flask import Flask, g

app = Flask(__name__)

def get_clock():
    return {"now": "2026-03-24T00:00:00Z"}

@app.before_request
def attach_clock():
    g.clock = get_clock()

@app.get("/time")
def get_time():
    return {"now": g.clock["now"]}`,
    fastapiCode: `from fastapi import Depends, FastAPI

app = FastAPI()

def get_clock():
    return {"now": "2026-03-24T00:00:00Z"}

@app.get("/time")
async def get_time(clock = Depends(get_clock)):
    return {"now": clock["now"]}`,
    explanation:
      'Flask composition is usually handled through context, hooks, and app structure. FastAPI exposes dependency composition directly in endpoint signatures.',
  },
]

const glossaryTerms: GlossaryItem[] = [
  {
    term: 'Microframework',
    definition:
      'A web framework with a deliberately small core that leaves many architectural choices to the application.',
  },
  {
    term: 'WSGI',
    definition:
      'The traditional Python web server interface used by many classic synchronous Python web frameworks.',
  },
  {
    term: 'ASGI',
    definition:
      'A modern asynchronous Python server interface that supports async HTTP handling and related protocols such as WebSockets.',
  },
  {
    term: 'Blueprint',
    definition:
      'Flask route and application organization mechanism for grouping related views and behavior.',
  },
  {
    term: 'APIRouter',
    definition: 'FastAPI route organization mechanism for grouping API endpoints and metadata.',
  },
  {
    term: 'Dependency injection',
    definition:
      'A composition style where dependencies are supplied to code rather than being constructed directly inside it.',
  },
  {
    term: 'OpenAPI',
    definition:
      'A machine-readable format for describing HTTP APIs and powering tooling such as docs and client generation.',
  },
  {
    term: 'Pydantic model',
    definition: 'A typed data model commonly used by FastAPI for validation and schema generation.',
  },
  {
    term: 'Werkzeug',
    definition:
      'The WSGI utility library that underpins major parts of Flask request and routing behavior.',
  },
  {
    term: 'Jinja',
    definition: 'The template engine commonly used with Flask for server-rendered HTML.',
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
    { id: 'core-routing', label: 'Routing' },
    { id: 'core-validation', label: 'Validation and Schema' },
    { id: 'core-docs', label: 'OpenAPI and Docs' },
    { id: 'core-wsgi-asgi', label: 'WSGI vs ASGI' },
    { id: 'core-templates', label: 'Templates and HTML' },
    { id: 'core-di', label: 'Dependency Composition' },
    { id: 'core-extensions', label: 'Extensions and Ecosystem' },
    { id: 'core-testing', label: 'Testing and Maintainability' },
    { id: 'core-performance', label: 'Performance' },
    { id: 'core-deploy', label: 'Deployment Model' },
    { id: 'core-websockets', label: 'WebSockets' },
    { id: 'core-tradeoffs', label: 'Tradeoffs' },
    { id: 'core-checklist', label: 'Decision Checklist' },
  ],
  examples: examples.map((example) => ({ id: example.id, label: example.title })),
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function FlaskVsFastApiPage(): JSX.Element {
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
        This page compares Flask and FastAPI as real backend framework choices rather than as
        generic Python brands. The point is to make the practical tradeoffs explicit: flexibility
        versus built-in API structure, WSGI versus ASGI, manual composition versus typed validation,
        template-friendly workflows versus API-first design, and the kinds of teams and products
        each framework serves best.
      </p>

      {activeTab === 'big-picture' && (
        <>
          {bigPictureSections.map((section, index) => (
            <section key={section.id} id={section.id} className="bin98-section">
              <h2 className="bin98-heading">{section.title}</h2>
              {section.paragraphs?.map((paragraph, paragraphIndex) => (
                <p key={`${section.id}-p-${paragraphIndex}`}>{paragraph}</p>
              ))}
              {section.bullets && (
                <ul>
                  {section.bullets.map((bullet, bulletIndex) => (
                    <li key={`${section.id}-b-${bulletIndex}`}>{bullet}</li>
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
              {section.paragraphs?.map((paragraph, paragraphIndex) => (
                <p key={`${section.id}-p-${paragraphIndex}`}>{paragraph}</p>
              ))}
              {section.bullets && (
                <ul>
                  {section.bullets.map((bullet, bulletIndex) => (
                    <li key={`${section.id}-b-${bulletIndex}`}>{bullet}</li>
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
              <h3 className="bin98-subheading">Flask</h3>
              <div className="bin98-codebox">
                <code>{example.flaskCode.trim()}</code>
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
