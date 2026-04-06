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
  'FastAPI is a modern Python web framework focused on building APIs with type hints, automatic validation, async support, and generated OpenAPI documentation. It is commonly used for backend services, internal APIs, machine-learning serving layers, microservices, and systems where Python teams want strong request and response contracts without sacrificing development speed.',
  'The most useful way to think about FastAPI is as a Python API framework built on Starlette and Pydantic that turns Python type annotations into runtime request parsing, validation, serialization, dependency wiring, and documentation. It is more structured and schema-aware than Flask while still lighter and more API-focused than a large full-stack framework.',
  'This page is intentionally thorough. It covers the FastAPI programming model, async and sync execution, path operations, dependency injection, request validation, response models, OpenAPI generation, security hooks, database integration, deployment, testing, performance, and the tradeoffs that matter in real production services.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'FastAPI is a Python framework for building HTTP APIs with strong use of type hints, automatic data validation, and generated API schemas. It sits on top of Starlette for web behavior and Pydantic for data modeling, which lets it translate ordinary Python function signatures into validated request handlers and documented API contracts.',
      'Its appeal comes from combining modern API ergonomics with relatively low ceremony. Developers define routes as Python callables, annotate inputs and outputs with types, and the framework handles much of the repetitive parsing, validation, serialization, and docs generation that otherwise spreads across API codebases.',
    ],
  },
  {
    id: 'bp-why-it-matters',
    title: 'Why FastAPI Matters',
    paragraphs: [
      'FastAPI matters because it dramatically reduces the amount of glue code needed to build well-specified APIs in Python. Validation, request parsing, response shaping, and OpenAPI docs stop being separate concerns and become part of the normal function definition style.',
      'It is also important because it aligns well with modern service expectations: explicit schemas, editor tooling from type hints, async-friendly request handling, and machine-readable docs for client generation, testing, and service integration.',
    ],
    bullets: [
      'Turns Python types into validation and documentation automatically.',
      'Built for API development rather than generic web pages first.',
      'Supports both synchronous and asynchronous handler styles.',
      'Improves consistency of request and response contracts.',
    ],
  },
  {
    id: 'bp-mental-model',
    title: 'Mental Model',
    paragraphs: [
      'The right mental model is schema-driven API programming with Python callables. A FastAPI endpoint is not just a function behind a URL. It is also a typed contract describing path parameters, query parameters, headers, cookies, request bodies, dependencies, and response shapes.',
      'That means the framework is doing more than routing. It is turning application signatures into a request-processing model. FastAPI works best when engineers embrace that explicit contract-driven style instead of treating the type annotations as optional decoration.',
    ],
    bullets: [
      'Think typed endpoint contracts, not just route handlers.',
      'Think validation and serialization as part of the framework model.',
      'Think API schema generation as a first-class outcome of design.',
    ],
  },
  {
    id: 'bp-when-it-fits',
    title: 'When FastAPI Fits Best',
    paragraphs: [
      'FastAPI fits best for JSON APIs, backend services, ML inference gateways, internal microservices, contract-heavy integrations, and systems where request validation and documentation quality matter a lot. It is especially useful when teams want to build Python APIs with clear schemas and modern tooling.',
      'It is also a strong fit when asynchronous request handling is relevant, though async alone should not be the only reason to choose it. The bigger value is the combination of API clarity, typed contracts, and low-friction development.',
    ],
    bullets: [
      'APIs where validation and generated docs are important.',
      'Teams that want strong schema-driven request and response handling.',
      'Python services that may benefit from async-capable execution.',
      'Systems integrating with many clients or internal consumers.',
    ],
  },
  {
    id: 'bp-when-it-does-not-fit',
    title: 'Where FastAPI Is Not the Best Default',
    paragraphs: [
      'FastAPI is not the best default when the project is mostly server-rendered HTML, when the team is not prepared to work with typed schemas and explicit contracts, or when a more integrated full-stack platform would better match the application shape.',
      'It can also be a weaker fit when teams assume async syntax automatically solves performance problems, or when they need framework-driven conventions for admin, ORM, and template-oriented workflows that FastAPI does not aim to provide directly.',
    ],
    bullets: [
      'Projects centered on server-rendered pages rather than APIs.',
      'Teams unwilling to model data contracts explicitly with types.',
      'Applications wanting a larger batteries-included web platform.',
      'Organizations that mistake async syntax for automatic scalability.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Key Takeaways',
    paragraphs: [
      'FastAPI is strongest when the application is fundamentally an API and the team benefits from request validation, explicit schemas, generated documentation, and modern Python typing. Its real strength is contract clarity combined with developer speed.',
      'The best FastAPI systems treat types, dependencies, and models as part of the architecture, not just convenience syntax. When used well, the framework reduces repetitive API plumbing while keeping service design explicit and testable.',
    ],
    bullets: [
      'Choose FastAPI when API contracts and validation are central concerns.',
      'Treat type annotations and models as part of the runtime design.',
      'Use its convenience to improve rigor, not to hide weak service architecture.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-what-it-is',
    title: 'What FastAPI Actually Is',
    paragraphs: [
      'FastAPI is a Python framework for building APIs on top of Starlette and Pydantic. It provides route declaration, request parsing, validation, response serialization, dependency injection, exception handling, background task hooks, security integrations, testing support, and automatic OpenAPI schema generation.',
      'Its main identity is typed API development. FastAPI uses Python annotations not just for editor hints but as runtime metadata that shapes how requests are accepted, validated, documented, and serialized. That makes its programming model more contract-centric than many older Python web frameworks.',
    ],
  },
  {
    id: 'core-app-structure',
    title: 'Application Object and Project Structure',
    paragraphs: [
      'A FastAPI application centers on an app object that registers routes, middleware, exception handlers, startup and shutdown hooks, and mounted sub-applications. Small services may start with one file, but production systems usually separate routers, schemas, dependencies, domain services, persistence, and infrastructure concerns.',
      'The framework does not force one folder layout, which means teams need to choose structure intentionally. Good FastAPI code usually keeps the API layer thin while domain logic, persistence logic, and external service integrations live outside path operation functions.',
    ],
  },
  {
    id: 'core-path-operations',
    title: 'Path Operations and Routing',
    paragraphs: [
      'FastAPI maps HTTP methods and paths to Python callables called path operation functions. Decorators such as get, post, patch, and delete declare both the route and the semantics of request handling, while annotations describe parameters, bodies, and response models.',
      'The handlers remain readable, but they carry more framework meaning than plain routes in some other frameworks. Their signature is part of the API contract, so changes to parameters and return types directly affect validation, docs, and client expectations.',
    ],
  },
  {
    id: 'core-params',
    title: 'Parameters, Bodies, and Validation',
    paragraphs: [
      'One of FastAPIs defining ideas is that path parameters, query parameters, headers, cookies, and request bodies are all declared directly in the function signature. The framework inspects those annotations and validates incoming data before handler logic runs.',
      'This is powerful because API contracts become explicit and consistent. It also means teams should be disciplined about schema design, optionality, defaults, and field naming, since these choices directly shape both runtime behavior and external documentation.',
    ],
  },
  {
    id: 'core-pydantic',
    title: 'Pydantic Models and Data Contracts',
    paragraphs: [
      'FastAPI commonly uses Pydantic models for request bodies, response shapes, and other structured data contracts. These models perform validation and serialization while also contributing to the generated API schema.',
      'The architectural value is consistency. A well-modeled API surface reduces hand-written parsing and error-prone shape handling. The risk is careless schema churn if models are treated as temporary scaffolding instead of stable interface definitions.',
    ],
  },
  {
    id: 'core-dependencies',
    title: 'Dependency Injection via Depends',
    paragraphs: [
      'FastAPI has a built-in dependency system that lets handlers declare required services, request-derived values, auth state, database sessions, or reusable validation logic through Depends. This is one of the frameworks most distinctive architectural features.',
      'Used well, dependencies keep handlers thin and make cross-cutting concerns reusable. Used poorly, they can become a hidden call graph that makes request behavior harder to reason about. The key is keeping dependencies explicit, bounded, and well named.',
    ],
  },
  {
    id: 'core-async',
    title: 'Async and Sync Execution',
    paragraphs: [
      'FastAPI supports both async def and def route handlers. Async handlers are useful for I O-bound work such as network calls and async database access, while synchronous handlers are still valid for CPU-bound or blocking libraries that are better handled in worker threads.',
      'The important point is that async is a concurrency model, not automatic performance magic. Teams still need to understand blocking calls, event loops, threadpools, database drivers, and the difference between throughput bottlenecks and framework syntax.',
    ],
  },
  {
    id: 'core-openapi',
    title: 'OpenAPI Generation and Interactive Docs',
    paragraphs: [
      'FastAPI automatically generates OpenAPI schemas and usually exposes interactive documentation UIs such as Swagger UI and ReDoc. This turns route and model declarations into developer-facing docs with minimal extra work.',
      'This is one of the frameworks biggest practical advantages. Generated docs improve discoverability and integration, but only if the underlying models, parameter descriptions, response contracts, and status semantics are maintained with care.',
    ],
  },
  {
    id: 'core-security',
    title: 'Security Hooks and Authentication',
    paragraphs: [
      'FastAPI provides security helpers for patterns such as OAuth2 password flow, bearer tokens, API keys, and dependency-based auth checks. Security logic is usually expressed as dependencies that validate credentials or load the authenticated principal.',
      'The framework can make auth wiring cleaner, but it does not define a full security architecture by itself. Session policy, token lifecycle, authorization rules, secret handling, and audit requirements remain application responsibilities.',
    ],
  },
  {
    id: 'core-database',
    title: 'Database Integration and Persistence',
    paragraphs: [
      'FastAPI does not prescribe a single persistence approach. Teams commonly combine it with SQLAlchemy, SQLModel, Tortoise ORM, async database libraries, raw drivers, or repository patterns depending on the workload and maturity of the codebase.',
      'The critical engineering issue is not framework compatibility but operational correctness. Transactions, connection pools, migration discipline, query performance, and consistency guarantees still need deliberate design.',
    ],
  },
  {
    id: 'core-settings',
    title: 'Configuration and Settings',
    paragraphs: [
      'FastAPI services typically manage configuration through environment variables, Pydantic settings models, or dedicated config modules. A strong settings strategy matters because API services often have many external dependencies, secrets, feature flags, and environment-specific behaviors.',
      'Configuration should stay explicit and validated. A framework that values typed contracts at the request layer should usually apply the same discipline to runtime settings and service wiring.',
    ],
  },
  {
    id: 'core-testing',
    title: 'Testing Model',
    paragraphs: [
      'FastAPI is commonly tested with TestClient and ordinary Python test tools such as pytest. The framework also makes it practical to override dependencies during tests, which is very useful for replacing auth providers, database sessions, or external integrations.',
      'That testing model is strongest when dependencies and schemas are explicit. If handler logic remains thin and dependency boundaries are clear, both unit-style tests and API-level integration tests become easier to write and maintain.',
    ],
  },
  {
    id: 'core-deployment',
    title: 'Deployment and Runtime Model',
    paragraphs: [
      'FastAPI applications usually run as ASGI services with servers such as Uvicorn or Hypercorn, sometimes under Gunicorn with Uvicorn workers depending on deployment style. Runtime behavior depends on worker count, concurrency limits, event loop behavior, and the blocking characteristics of dependencies.',
      'Deployment architecture matters because FastAPI is only one layer of the system. Reverse proxies, process supervision, observability, health checks, container settings, and database connectivity all shape production reliability more than the nice route syntax does.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance Mindset',
    paragraphs: [
      'FastAPI can perform well, but the meaningful performance factors are still database access, network latency, serialization cost, dependency behavior, request fan-out, and whether handlers block the event loop. The framework does not remove these fundamentals.',
      'The best performance mindset is empirical and architectural. Measure real endpoints, inspect traces, understand sync versus async behavior, and solve the actual bottleneck rather than assuming the framework choice alone determines service speed.',
    ],
    bullets: [
      'Do not block the event loop with accidental synchronous I O.',
      'Measure database, cache, and downstream service latency directly.',
      'Treat schema and serialization overhead as part of request cost.',
      'Tune workers and concurrency based on the real workload, not guesses.',
    ],
  },
  {
    id: 'core-use-cases',
    title: 'Common Real-World Uses',
    paragraphs: [
      'FastAPI is widely used for REST APIs, internal service layers, ML inference endpoints, gateway APIs, developer platforms, workflow backends, and integration services that benefit from strong contracts and generated documentation.',
      'It is especially popular in Python-heavy organizations where APIs need to be built quickly but still exposed with clear schemas and predictable validation behavior.',
    ],
  },
  {
    id: 'core-not-fit',
    title: 'When Not to Use FastAPI',
    paragraphs: [
      'FastAPI is a weaker fit when the project is mostly about server-rendered pages, when the team does not want to work with explicit schemas and typed endpoint design, or when a more opinionated full-stack framework would better reduce architectural variation.',
      'It can also be a weak fit when the organization misuses async as a marketing checkbox without the operational discipline to manage async-compatible libraries and runtime behavior.',
    ],
  },
  {
    id: 'core-pitfalls',
    title: 'Common Pitfalls',
    paragraphs: [
      'Common FastAPI mistakes include putting too much business logic in path operation functions, creating dependency chains that are hard to trace, abusing Pydantic models without versioning discipline, assuming async handlers are always better, and treating auto-generated docs as a substitute for real API design.',
      'Another recurring issue is mixing sync libraries into async flows without understanding the runtime consequences. The framework can make modern API development feel simple, but it does not eliminate the need for systems thinking.',
    ],
    bullets: [
      'Do not let dependency injection become a hidden architecture maze.',
      'Do not assume generated docs guarantee a good API contract.',
      'Do not mix blocking libraries into async code carelessly.',
      'Do not let schema churn break clients without versioning discipline.',
    ],
  },
  {
    id: 'core-compare',
    title: 'FastAPI Compared with Other Backend Frameworks',
    paragraphs: [
      'Compared with Flask, FastAPI is more schema-driven, more validation-oriented, and more async-aware out of the box. Compared with Django, it is lighter and more API-specialized. Compared with frameworks such as Spring Boot or NestJS, it offers fewer platform-wide conventions but very strong API ergonomics.',
      'The right comparison is whether the team primarily needs a modern API framework with strong typed contracts or a broader application platform with more built-in subsystems and opinions.',
    ],
  },
  {
    id: 'core-decision',
    title: 'Decision Checklist',
    paragraphs: [
      'Choose FastAPI when Python is the right language, APIs are the main product surface, and the team benefits from explicit schemas, generated docs, and validation at the framework layer. Choose something else when the application needs a fuller web platform or when the team will not take advantage of typed contracts meaningfully.',
      'The best FastAPI decisions happen when request shape, client integration, and developer clarity are central engineering concerns rather than afterthoughts.',
    ],
    bullets: [
      'Need schema-driven Python APIs: strong FastAPI signal.',
      'Need generated docs and validation with little manual glue code: strong FastAPI signal.',
      'Need server-rendered full-stack framework conventions: weaker FastAPI signal.',
      'Need async-capable API architecture with explicit contracts: strong FastAPI signal.',
    ],
  },
]
const exampleSections: ExampleSection[] = [
  {
    id: 'examples-basic-route',
    title: 'Basic FastAPI Application with Path Operation',
    description: [
      'A minimal FastAPI service defines an app and attaches path operations with typed parameters. Even simple handlers already participate in validation and documentation generation.',
      'This is the core framework shape that larger applications build on.',
    ],
    code: `from fastapi import FastAPI

app = FastAPI()

@app.get("/health")
async def healthcheck() -> dict[str, str]:
    return {"status": "ok"}`,
    notes: [
      'Type annotations contribute to API clarity immediately.',
      'Even small handlers should remain thin and explicit.',
    ],
  },
  {
    id: 'examples-models',
    title: 'Request and Response Models',
    description: [
      'FastAPI commonly uses Pydantic models for validated request bodies and response models. This gives the endpoint a strong contract with very little glue code.',
      'The framework uses these models for runtime validation and generated documentation.',
    ],
    code: `from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class UserCreate(BaseModel):
    email: str
    full_name: str

class UserResponse(BaseModel):
    id: int
    email: str
    full_name: str

@app.post("/users", response_model=UserResponse, status_code=201)
async def create_user(payload: UserCreate) -> UserResponse:
    user = user_service.create(payload)
    return UserResponse.model_validate(user)`,
    notes: [
      'Models should be treated as stable API contracts, not throwaway classes.',
      'Response models help prevent accidental shape drift.',
    ],
  },
  {
    id: 'examples-dependency',
    title: 'Dependency Injection with Depends',
    description: [
      'Dependencies let route handlers request reusable values such as database sessions, current users, or service objects. This is one of FastAPIs central composition patterns.',
      'Used well, it keeps handlers small and cross-cutting concerns reusable.',
    ],
    code: `from fastapi import Depends, FastAPI, HTTPException

app = FastAPI()

def get_current_user(token: str = Depends(auth_service.read_bearer_token)):
    user = auth_service.authenticate(token)
    if user is None:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return user

@app.get("/me")
async def read_me(current_user = Depends(get_current_user)):
    return {"id": current_user.id, "email": current_user.email}`,
    notes: [
      'Dependencies should stay understandable and not become a hidden maze.',
      'Auth and request-scoped state often fit this model well.',
    ],
  },
  {
    id: 'examples-router',
    title: 'APIRouter for Modular APIs',
    description: [
      'FastAPI applications commonly use APIRouter to group related endpoints and then include them in the main app. This keeps route organization manageable as the API grows.',
      'Routers are transport-level modularization, not a substitute for deeper architecture.',
    ],
    code: `from fastapi import APIRouter, FastAPI

orders_router = APIRouter(prefix="/orders", tags=["orders"])

@orders_router.get("/{order_id}")
async def get_order(order_id: str):
    return order_service.find_one(order_id)

app = FastAPI()
app.include_router(orders_router)`,
    notes: [
      'Routers help organize APIs, but services and repositories still need their own boundaries.',
      'Tags and prefixes also improve generated docs structure.',
    ],
  },
  {
    id: 'examples-query-validation',
    title: 'Query Parameter Validation',
    description: [
      'FastAPI can validate query parameters directly from the function signature, including bounds and optional defaults. This avoids repetitive manual parsing logic.',
      'The result is cleaner handlers and more consistent client feedback.',
    ],
    code: `from fastapi import FastAPI, Query

app = FastAPI()

@app.get("/search")
async def search_items(
    q: str,
    limit: int = Query(default=20, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
):
    return search_service.find(q=q, limit=limit, offset=offset)`,
    notes: [
      'Validation rules in the signature become part of the API contract.',
      'Bounded query parameters help protect service behavior and clarify expectations.',
    ],
  },
  {
    id: 'examples-test-client',
    title: 'Testing with TestClient',
    description: [
      'FastAPI applications are commonly tested with TestClient, which makes normal HTTP-style assertions straightforward.',
      'Dependencies can also be overridden in tests to isolate external integrations and auth requirements.',
    ],
    code: `from fastapi.testclient import TestClient

client = TestClient(app)

def test_healthcheck():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}`,
    notes: [
      'Tests should validate contract behavior, not only implementation details.',
      'Dependency overrides are especially useful for database and auth-heavy routes.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-core',
    title: 'Core FastAPI Terms',
    terms: [
      {
        term: 'FastAPI Application',
        definition:
          'The central app object that registers routes, middleware, lifecycle hooks, and schema generation.',
      },
      {
        term: 'Path Operation',
        definition:
          'A route handler function mapped to an HTTP method and path in a FastAPI application.',
      },
      {
        term: 'APIRouter',
        definition:
          'A grouping mechanism for related FastAPI routes that can be mounted into the main application.',
      },
      {
        term: 'Pydantic Model',
        definition:
          'A typed data model used for validation, serialization, and schema generation.',
      },
      {
        term: 'Depends',
        definition:
          'The FastAPI helper used to declare reusable dependencies in endpoint signatures.',
      },
    ],
  },
  {
    id: 'glossary-request',
    title: 'Request Lifecycle Terms',
    terms: [
      {
        term: 'Request Body',
        definition:
          'Structured request data, usually parsed and validated into a typed model before handler logic runs.',
      },
      {
        term: 'Response Model',
        definition:
          'A declared output schema used by FastAPI to serialize and document the response shape.',
      },
      {
        term: 'Dependency',
        definition:
          'Reusable logic or values injected into path operation functions through the dependency system.',
      },
      {
        term: 'OpenAPI Schema',
        definition:
          'The machine-readable API description generated from routes, models, and metadata.',
      },
      {
        term: 'ASGI',
        definition:
          'The asynchronous Python web server interface commonly used to run FastAPI applications.',
      },
    ],
  },
  {
    id: 'glossary-architecture',
    title: 'Architecture and Testing Terms',
    terms: [
      {
        term: 'Starlette',
        definition:
          'The ASGI toolkit and web foundation on which FastAPI builds its routing and request behavior.',
      },
      {
        term: 'Uvicorn',
        definition:
          'A common ASGI server used to run FastAPI applications in development and production.',
      },
      {
        term: 'Dependency Override',
        definition:
          'A testing technique that replaces a declared FastAPI dependency with a test-specific implementation.',
      },
      {
        term: 'Background Tasks',
        definition:
          'A FastAPI feature for scheduling short follow-up work after returning a response.',
      },
      {
        term: 'TestClient',
        definition:
          'The test utility commonly used to make in-process HTTP requests against a FastAPI app.',
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

export default function FastAPIPage(): JSX.Element {
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
    document.title = `FastAPI (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'FastAPI',
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
          <span className="postgres-help-titletext">FastAPI</span>
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
            <h1 className="postgres-help-doc-title">FastAPI</h1>
            <p className="postgres-help-doc-subtitle">
              Python API framework reference covering typed contracts, validation,
              dependencies, async behavior, OpenAPI generation, and tradeoffs.
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
