import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const overviewSections = [
  {
    title: 'What FastAPI is',
    body: 'FastAPI is a modern Python web framework for building HTTP APIs on top of the ASGI ecosystem. It combines routing, request parsing, validation, dependency injection, serialization, and automatic OpenAPI documentation into a framework that treats Python type annotations as first-class application metadata rather than as passive editor hints.',
  },
  {
    title: 'Why FastAPI matters',
    body: 'FastAPI matters because it changed what many Python developers expect from an API framework. It made strong typing, automatic docs, request validation, and async support feel like defaults instead of optional add-ons. That combination made it influential in modern Python backend development, especially for teams building service-oriented APIs.',
  },
  {
    title: 'How to think about it',
    body: 'The useful mental model is that FastAPI is an ASGI-first API framework that turns declared interfaces into runtime behavior. A handler signature describes path parameters, query parameters, headers, bodies, dependencies, and response models; the framework then validates inputs, prepares injected resources, runs the handler, and serializes outputs according to those declarations.',
  },
  {
    title: 'Where it fits best',
    body: 'FastAPI fits best when a team is building JSON-heavy APIs, internal service layers, ML-serving backends, integration services, or developer-facing platforms where validation, discoverability, and iteration speed matter. It is strongest when the system boundary is an API contract and the team wants those contracts to stay explicit, typed, and observable.',
  },
]

const whyItMatters = [
  'It brought a modern typed API-development style to mainstream Python backend work.',
  'It treats validation and schema generation as part of the framework contract, not as optional extras.',
  'It supports async workloads while still allowing ordinary synchronous Python handlers where appropriate.',
  'It reduces duplicate work by reusing declared models for validation, serialization, and documentation.',
  'It became a common reference point when comparing modern Python backend frameworks.',
]

const historicalContext = [
  {
    title: 'FastAPI emerged in the ASGI era',
    detail:
      'Earlier Python web frameworks were shaped mainly around WSGI, synchronous request handling, and weaker runtime integration with type annotations. FastAPI arrived when ASGI, async I/O, and Python typing were mature enough to support a more declarative framework model.',
  },
  {
    title: 'Type hints became operational',
    detail:
      'Python type annotations began as a tool for readability and static analysis, but FastAPI turned them into framework inputs. A function signature could now directly describe request contracts, dependency requirements, and response shapes. That made type information valuable at runtime as well as during editing and linting.',
  },
  {
    title: 'Automatic docs changed expectations',
    detail:
      'Many teams were used to maintaining API documentation separately from the implementation. FastAPI made interactive documentation generation feel natural by deriving OpenAPI schemas from application code. That raised the baseline expectation for developer experience in Python API frameworks.',
  },
  {
    title: 'It became popular for data and ML-adjacent services',
    detail:
      "FastAPI gained attention in teams building machine learning inference services, internal tooling APIs, and data-heavy platforms because it fit well with Python's ecosystem while offering a more modern HTTP service story than many developers were used to.",
  },
]

const bigPictureThemes = [
  {
    title: 'Declared interfaces drive behavior',
    body: 'In FastAPI, many framework decisions flow from what the handler declares. Parameter types, Pydantic models, dependency markers, and response models all inform how the request is interpreted and how the response is produced. This makes the code more self-describing, but it also means developers need to understand the semantics of those declarations clearly.',
  },
  {
    title: 'Async is supported, not mandatory everywhere',
    body: 'FastAPI is often described as an async framework, but the more precise statement is that it is built for ASGI and can handle both async and sync endpoints. That distinction matters because teams should choose async where it fits the workload rather than mechanically converting every function to async syntax.',
  },
  {
    title: 'Validation is part of the architecture',
    body: 'Request parsing and validation happen at the boundary, not as an afterthought deep inside the service logic. That encourages cleaner system design because downstream code can depend on stronger invariants once the framework has accepted the input.',
  },
  {
    title: 'Developer ergonomics are a deliberate feature',
    body: "FastAPI is not only trying to serve requests quickly. It is also designed to make APIs easier to explore, easier to document, and easier to reason about. Interactive docs, explicit models, and dependency declarations are part of the framework's value proposition, not decorative extras.",
  },
]

const keyTakeaways = [
  'FastAPI is best understood as a typed ASGI API framework, not just as a faster Flask alternative.',
  'Its strongest ideas are declared contracts, validation at the edge, and automatic schema and document generation.',
  "Async support is important, but the framework's real value is broader than concurrency alone.",
  'It is especially strong for service-oriented APIs where clear request and response models matter.',
  'FastAPI rewards disciplined boundary design and can become confusing if teams treat annotations as magic instead of as architecture.',
]

const topicSignals = [
  {
    title: 'Choose FastAPI when API contracts need to stay explicit',
    body: 'If the main job of the application is to expose a well-defined HTTP interface, FastAPI is attractive because it keeps request shapes, validation rules, and response models close to the handler definition instead of scattering them across separate layers.',
  },
  {
    title: 'Choose FastAPI when Python ecosystem access matters',
    body: 'Teams building around Python libraries for data science, machine learning, analytics, or automation often want a modern API layer without leaving the Python ecosystem. FastAPI provides that bridge cleanly.',
  },
  {
    title: 'Choose FastAPI when interactive documentation helps consumers',
    body: 'If internal developers, partners, or frontend teams benefit from instantly explorable API docs, FastAPI creates leverage because the docs are generated directly from the implementation contract.',
  },
  {
    title: 'Avoid using FastAPI only because of benchmark headlines',
    body: 'The framework can perform well, but real service quality still depends on downstream I/O, serialization cost, model complexity, deployment choices, caching, and the discipline of the surrounding system. FastAPI should be chosen for architectural fit, not only for raw marketing comparisons.',
  },
]

const coreFoundations = [
  {
    title: 'ASGI underneath',
    body: 'FastAPI sits on the ASGI stack, commonly with Starlette providing much of the web foundation and Uvicorn serving requests. ASGI gives the framework its async-friendly execution model and makes it better suited to modern concurrent Python network workloads than older WSGI-centered designs.',
  },
  {
    title: 'Path operations and routing',
    body: 'FastAPI organizes handlers around path operations such as GET, POST, PUT, and DELETE. Routes are registered declaratively and can specify path parameters, query parameters, request bodies, headers, and cookies directly through handler signatures and annotations.',
  },
  {
    title: 'Pydantic models',
    body: 'Pydantic models are central to the FastAPI style. They define expected request bodies, nested data structures, field constraints, default values, and sometimes response shapes. These models improve consistency because the same schema information informs validation, documentation, and serialization.',
  },
  {
    title: 'Dependency injection through call signatures',
    body: 'FastAPI uses a dependency system based on declared function inputs rather than on a heavy external container. Dependencies can provide authentication context, database sessions, shared services, or validated configuration values. This approach keeps dependency declarations close to the handler that needs them.',
  },
  {
    title: 'Serialization and response models',
    body: 'The framework can validate and shape outgoing data using response models. That allows teams to define what the API exposes externally even if the internal application objects contain more fields. This helps enforce contract boundaries at both input and output edges.',
  },
]

const frameworkFeatures = [
  {
    title: 'Automatic OpenAPI generation',
    body: 'One of the defining FastAPI features is that it can derive OpenAPI metadata from route declarations, models, and parameter annotations. That reduces duplication and gives consumers a live description of the service surface.',
  },
  {
    title: 'Interactive documentation',
    body: 'The generated documentation interfaces make it easy to inspect endpoints, understand schemas, and try requests from the browser. This is especially useful in internal platforms and early-stage APIs where discoverability matters as much as implementation speed.',
  },
  {
    title: 'Async and sync handler support',
    body: 'FastAPI allows both asynchronous and synchronous handlers. This is a practical design choice because many services contain a mix of async-capable I/O and libraries that remain synchronous. Teams can choose the right style per boundary instead of forcing one model onto every function.',
  },
  {
    title: 'Dependency system for cross-cutting concerns',
    body: 'Authentication checks, tenant resolution, DB session acquisition, request-scoped services, and settings access can all be modeled as dependencies. This keeps common setup logic reusable without collapsing everything into global mutable state.',
  },
  {
    title: 'Validation-first boundary handling',
    body: 'Instead of letting raw dictionaries and unchecked JSON flow directly into application logic, FastAPI encourages validated typed data at the boundary. That reduces ambiguity and improves the readability of the code that follows.',
  },
]

const runtimeAndOperations = [
  {
    title: 'Server and process model',
    body: 'FastAPI applications are commonly deployed behind Uvicorn or Gunicorn with Uvicorn workers. Practical production behavior depends on worker count, event-loop usage, timeout policy, container sizing, and how the application manages startup and shutdown lifecycles.',
  },
  {
    title: 'Async boundaries still require discipline',
    body: 'Async handlers do not magically make blocking code safe. If a supposedly async route performs blocking file access, CPU-heavy work, or synchronous database calls in the wrong place, throughput and latency can degrade quickly. The framework supports async architecture, but the team still has to build one correctly.',
  },
  {
    title: 'Validation has a cost and a benefit',
    body: 'Model validation and serialization are not free, especially for large payloads or deeply nested schemas. The benefit is that the system gets explicit contracts and safer inputs. The engineering question is not whether to validate at all, but how much validation belongs at each boundary and how to keep schemas appropriate to the workload.',
  },
  {
    title: 'Observability is still external work',
    body: 'FastAPI improves API ergonomics, but it does not remove the need for metrics, tracing, structured logs, error taxonomy, rate limiting, and deployment visibility. Teams still need deliberate operational standards around the framework.',
  },
]

const ecosystemUses = [
  {
    title: 'Internal and external REST APIs',
    body: 'FastAPI is a natural fit for structured JSON APIs, especially where request validation and response documentation matter for many consumers.',
  },
  {
    title: 'ML inference and model-serving layers',
    body: 'Because many ML teams already work in Python, FastAPI became a common way to expose inference endpoints, model metadata services, and workflow APIs around data-processing systems.',
  },
  {
    title: 'Automation and platform tooling',
    body: 'Internal developer platforms, orchestration services, admin APIs, and integration hubs often benefit from FastAPI because the framework makes contracts explicit and easy to inspect.',
  },
  {
    title: 'Prototype-to-production service paths',
    body: 'FastAPI can support early iteration without requiring teams to give up structure immediately. A service can begin as a small set of typed endpoints and still preserve decent organization as it grows, provided the team keeps boundaries disciplined.',
  },
]

const comparisons = [
  {
    title: 'FastAPI versus Flask',
    body: 'Flask is lighter and more minimal by default, while FastAPI provides more built-in structure around validation, typing, async support, and documentation. Flask gives more architectural freedom earlier; FastAPI gives stronger contract-oriented defaults earlier.',
  },
  {
    title: 'FastAPI versus Express.js',
    body: 'Express centers a middleware pipeline in the Node ecosystem, whereas FastAPI centers declared typed interfaces in Python. Express often requires more third-party layering for validation and docs; FastAPI ships with a stronger opinion about those concerns from the start.',
  },
  {
    title: 'FastAPI versus ASP.NET Core',
    body: 'ASP.NET Core offers a broader platform with stronger framework-wide infrastructure, deep compile-time tooling, and mature enterprise integration. FastAPI is lighter and often quicker to iterate with in Python-centric teams, but it usually relies on a thinner surrounding platform and more ecosystem assembly outside the core framework.',
  },
  {
    title: 'FastAPI versus Django',
    body: 'Django is a full-stack framework with an ORM, templating story, admin surface, and a broader built-in application model. FastAPI is more specialized around APIs. If the project is fundamentally an API platform rather than a full traditional web app, FastAPI often feels more direct.',
  },
]

const failureModes = [
  {
    title: 'Treating annotations as magic instead of design',
    body: 'FastAPI can look deceptively effortless because so much behavior is derived from signatures and models. Teams that do not understand what those declarations mean can end up with unclear contracts, accidental schema exposure, and confusing dependency graphs.',
  },
  {
    title: 'Mixing async and blocking work carelessly',
    body: 'An async route that calls blocking code in the hot path can undermine the benefits of the ASGI model. Teams need to know which libraries are truly async-aware and which operations should be isolated or moved elsewhere.',
  },
  {
    title: 'Overloading one Pydantic model for every purpose',
    body: 'Using the same model for database shape, internal business objects, incoming requests, and outgoing responses can blur important boundaries. Clear systems usually separate input models, internal representations, and public response contracts where necessary.',
  },
  {
    title: 'Relying on generated docs as the only documentation',
    body: 'Automatic docs are useful, but they do not explain architecture, business semantics, error policy, or operational guarantees by themselves. Teams still need human documentation for the parts that schemas cannot express well.',
  },
  {
    title: 'Assuming framework ergonomics solve production engineering',
    body: 'FastAPI improves developer experience, but production systems still demand tests, deployment discipline, security review, monitoring, resilience design, and careful dependency management.',
  },
]

const studyChecklist = [
  'Understand ASGI, Starlette, and Uvicorn well enough to reason about FastAPI at runtime.',
  'Treat request and response models as explicit contracts, not as incidental helpers.',
  'Use dependencies to express shared boundary concerns without hiding too much control flow.',
  'Choose async only where the underlying work actually benefits from it.',
  'Separate public API schemas from internal application representations when boundaries matter.',
  'Pair generated docs with operational and architectural documentation instead of substituting one for the other.',
]

const examples = [
  {
    id: 'fapi98-example-basic-endpoint',
    title: 'Example: Typed endpoint with path and query parameters',
    area: 'Routing and Contracts',
    intro:
      'A simple FastAPI handler already shows the framework model clearly. The function signature describes the path parameter, an optional query parameter, and the return shape without an extra validation layer wrapped around it.',
    whyFit:
      'This demonstrates how FastAPI turns ordinary-looking Python function definitions into explicit HTTP contracts.',
    code: `from fastapi import FastAPI

app = FastAPI()

@app.get("/items/{item_id}")
async def read_item(item_id: int, include_stats: bool = False):
    return {"item_id": item_id, "include_stats": include_stats}`,
    takeaway:
      'In FastAPI, much of the HTTP interface is declared directly in the handler signature instead of being parsed manually inside the function body.',
  },
  {
    id: 'fapi98-example-request-model',
    title: 'Example: Request validation with a Pydantic model',
    area: 'Validation',
    intro:
      'Request models give the framework a precise schema for incoming JSON. The route receives already-validated structured data instead of an unchecked dictionary assembled by hand.',
    whyFit:
      'This captures one of the biggest productivity and correctness benefits of the FastAPI style.',
    code: `from pydantic import BaseModel, Field

class CreateUserRequest(BaseModel):
    email: str
    display_name: str = Field(min_length=2, max_length=50)
    age: int | None = Field(default=None, ge=0)

@app.post("/users")
async def create_user(payload: CreateUserRequest):
    return {"created": True, "email": payload.email}`,
    takeaway:
      'Validation at the edge makes downstream application code simpler because invalid request shapes never reach the core handler logic.',
  },
  {
    id: 'fapi98-example-dependency',
    title: 'Example: Dependency injection for authenticated context',
    area: 'Dependencies',
    intro:
      'Dependencies let the route declare that it needs an authenticated user or another shared request-scoped resource. The handler stays focused on business logic rather than on repeating setup code.',
    whyFit:
      'This shows how FastAPI expresses cross-cutting concerns through function inputs rather than through a large global container.',
    code: `from fastapi import Depends, HTTPException

async def require_user(token: str | None = None):
    if token != "demo-token":
        raise HTTPException(status_code=401, detail="unauthorized")
    return {"user_id": "u_123"}

@app.get("/me")
async def read_me(current_user = Depends(require_user)):
    return current_user`,
    takeaway:
      'Dependencies make request setup reusable, but they should still remain understandable and not hide too much control flow from readers.',
  },
  {
    id: 'fapi98-example-response-model',
    title: 'Example: Response model as an output contract',
    area: 'Serialization',
    intro:
      'A response model lets the API define what leaves the service boundary even if the internal object contains more fields than should be exposed publicly.',
    whyFit:
      'This example highlights that output shaping is as important as input validation when designing a stable API contract.',
    code: `class UserResponse(BaseModel):
    id: str
    email: str

@app.get("/users/{user_id}", response_model=UserResponse)
async def get_user(user_id: str):
    internal_record = {"id": user_id, "email": "a@example.com", "is_admin": True}
    return internal_record`,
    takeaway:
      'FastAPI can enforce an intentional public boundary so implementation details do not leak accidentally through API responses.',
  },
  {
    id: 'fapi98-example-lifespan',
    title: 'Example: Lifespan setup for shared resources',
    area: 'Application Lifecycle',
    intro:
      'Production services often need startup and shutdown hooks for connection pools, caches, or model loading. Lifespan handling makes those phases explicit rather than hiding them in import-time side effects.',
    whyFit:
      'This reflects the difference between a demo app and a service that manages real resources deliberately.',
    code: `from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.cache = {"status": "ready"}
    yield
    app.state.cache.clear()

app = FastAPI(lifespan=lifespan)`,
    takeaway:
      'Lifecycle management belongs in deliberate startup and shutdown logic, not in accidental module initialization paths.',
  },
]

const glossary = [
  {
    term: 'FastAPI',
    definition:
      'A Python API framework built around ASGI, type-driven validation, and automatic schema generation.',
  },
  {
    term: 'ASGI',
    definition:
      'The asynchronous server gateway interface used by modern Python web stacks for concurrent request handling.',
  },
  {
    term: 'Starlette',
    definition:
      'The ASGI toolkit and web foundation on which FastAPI builds much of its core behavior.',
  },
  {
    term: 'Uvicorn',
    definition:
      'A common ASGI server used to run FastAPI applications in development and production.',
  },
  {
    term: 'Pydantic',
    definition:
      'A data validation and modeling library commonly used by FastAPI for typed request and response schemas.',
  },
  {
    term: 'Path operation',
    definition: 'A route handler associated with an HTTP method and path in FastAPI.',
  },
  {
    term: 'Dependency',
    definition: 'A declared reusable input or setup function that FastAPI resolves for a handler.',
  },
  {
    term: 'Response model',
    definition: 'A schema that defines and validates the data shape returned to API consumers.',
  },
  {
    term: 'OpenAPI',
    definition:
      'A standard machine-readable format for describing HTTP APIs, often generated automatically by FastAPI.',
  },
  {
    term: 'Coroutine',
    definition: 'An async function that can suspend and resume execution while waiting for I/O.',
  },
]

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'fapi98-overview', label: 'Overview' },
    { id: 'fapi98-why', label: 'Why It Matters' },
    { id: 'fapi98-history', label: 'Historical Context' },
    { id: 'fapi98-themes', label: 'Big Picture Themes' },
    { id: 'fapi98-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'fapi98-signals', label: 'Topic Signals' },
    { id: 'fapi98-foundations', label: 'Foundations' },
    { id: 'fapi98-features', label: 'Framework Features' },
    { id: 'fapi98-runtime', label: 'Runtime and Operations' },
    { id: 'fapi98-uses', label: 'Ecosystem Uses' },
    { id: 'fapi98-compare', label: 'Compare and Contrast' },
    { id: 'fapi98-failures', label: 'Failure Modes' },
    { id: 'fapi98-checklist', label: 'Study Checklist' },
  ],
  examples: examples.map((example) => ({ id: example.id, label: example.title })),
  glossary: [{ id: 'fapi98-glossary', label: 'Terms' }],
}

function isTabId(value: string | null): value is TabId {
  return (
    value === 'big-picture' ||
    value === 'core-concepts' ||
    value === 'examples' ||
    value === 'glossary'
  )
}

const fastApiHelpStyles = `
.fapi98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.fapi98-window {
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

.fapi98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-height: 28px;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.fapi98-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  line-height: 1;
  white-space: nowrap;
}

.fapi98-title-controls {
  display: inline-flex;
  gap: 2px;
}

.fapi98-control {
  width: 18px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  text-decoration: none;
  font-size: 11px;
  line-height: 1;
}

.fapi98-control:focus-visible,
.fapi98-tab:focus-visible,
.fapi98-toc-link:focus-visible {
  outline: 1px dotted #000;
  outline-offset: -3px;
}

.fapi98-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.fapi98-tab {
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b7b7b7;
  padding: 5px 10px 4px;
  font-size: 12px;
  line-height: 1.2;
  cursor: pointer;
}

.fapi98-tab-active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.fapi98-main {
  display: grid;
  grid-template-columns: 248px minmax(0, 1fr);
  flex: 1;
  min-height: 0;
  border-top: 1px solid #404040;
  background: #ffffff;
}

.fapi98-toc {
  overflow: auto;
  padding: 12px 12px 18px;
  background: #efefef;
  border-right: 1px solid #808080;
}

.fapi98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.fapi98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.fapi98-toc-item + .fapi98-toc-item {
  margin-top: 8px;
}

.fapi98-toc-link {
  color: #000;
  text-decoration: none;
  font-size: 12px;
  line-height: 1.35;
}

.fapi98-content {
  overflow: auto;
  padding: 16px 22px 24px;
  background: #ffffff;
}

.fapi98-doc-title {
  margin: 0 0 12px;
  font-size: 22px;
  font-weight: 700;
}

.fapi98-intro {
  margin: 0 0 16px;
  font-size: 12px;
  line-height: 1.5;
}

.fapi98-section {
  margin: 0 0 22px;
}

.fapi98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.fapi98-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.fapi98-divider {
  margin: 14px 0 16px;
  border: 0;
  border-top: 1px solid #d4d4d4;
}

.fapi98-content p,
.fapi98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.fapi98-content p {
  margin: 0 0 10px;
}

.fapi98-content ul {
  margin: 0 0 10px 18px;
  padding: 0;
}

.fapi98-content li + li {
  margin-top: 4px;
}

.fapi98-codebox {
  margin: 8px 0 10px;
  padding: 8px 9px;
  background: #f3f3f3;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.fapi98-codebox code {
  display: block;
  white-space: pre-wrap;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  line-height: 1.4;
}

@media (max-width: 900px) {
  .fapi98-main {
    grid-template-columns: 1fr;
  }

  .fapi98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 640px) {
  .fapi98-title {
    font-size: 13px;
    max-width: calc(100% - 72px);
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .fapi98-content {
    padding: 14px 14px 18px;
  }
}
`

export default function FastApiPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const requestedTab = searchParams.get('tab')
  const activeTab: TabId = isTabId(requestedTab) ? requestedTab : 'big-picture'
  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(location.search)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `FastAPI (Backend) (${activeTabLabel})`
  }, [activeTab, activeTabLabel, location.search, setSearchParams])

  const handleTabChange = (tab: TabId) => {
    if (tab === activeTab) {
      return
    }

    const nextParams = new URLSearchParams(location.search)
    nextParams.set('tab', tab)
    setSearchParams(nextParams)
  }

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'FastAPI (Backend)',
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
    <div className="fapi98-help-page">
      <style>{fastApiHelpStyles}</style>
      <div className="fapi98-window" role="presentation">
        <header className="fapi98-titlebar">
          <span className="fapi98-title">FastAPI (Backend)</span>
          <div className="fapi98-title-controls">
            <button
              className="fapi98-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="fapi98-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="fapi98-tabs" role="tablist" aria-label="FastAPI Backend Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`fapi98-tab ${activeTab === tab.id ? 'fapi98-tab-active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="fapi98-main">
          <aside className="fapi98-toc" aria-label="Table of contents">
            <h2 className="fapi98-toc-title">Contents</h2>
            <ul className="fapi98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id} className="fapi98-toc-item">
                  <a href={`#${section.id}`} className="fapi98-toc-link">
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="fapi98-content">
            <h1 className="fapi98-doc-title">FastAPI (Backend)</h1>
            <p className="fapi98-intro">
              This page is a backend-focused overview of FastAPI as a modern Python API framework.
              It explains the ASGI foundation, typed request and response contracts, dependency
              system, automatic documentation model, operational tradeoffs, and the architectural
              discipline needed to keep FastAPI services readable as they scale.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="fapi98-overview" className="fapi98-section">
                  <h2 className="fapi98-heading">Overview</h2>
                  {overviewSections.map((section) => (
                    <div key={section.title}>
                      <h3 className="fapi98-subheading">{section.title}</h3>
                      <p>{section.body}</p>
                    </div>
                  ))}
                </section>

                <hr className="fapi98-divider" />

                <section id="fapi98-why" className="fapi98-section">
                  <h2 className="fapi98-heading">Why It Matters</h2>
                  <ul>
                    {whyItMatters.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <hr className="fapi98-divider" />

                <section id="fapi98-history" className="fapi98-section">
                  <h2 className="fapi98-heading">Historical Context</h2>
                  {historicalContext.map((item) => (
                    <div key={item.title}>
                      <h3 className="fapi98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <hr className="fapi98-divider" />

                <section id="fapi98-themes" className="fapi98-section">
                  <h2 className="fapi98-heading">Big Picture Themes</h2>
                  {bigPictureThemes.map((item) => (
                    <div key={item.title}>
                      <h3 className="fapi98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <hr className="fapi98-divider" />

                <section id="fapi98-takeaways" className="fapi98-section">
                  <h2 className="fapi98-heading">Key Takeaways</h2>
                  <ul>
                    {keyTakeaways.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                <section id="fapi98-signals" className="fapi98-section">
                  <h2 className="fapi98-heading">Topic Signals</h2>
                  {topicSignals.map((item) => (
                    <div key={item.title}>
                      <h3 className="fapi98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="fapi98-foundations" className="fapi98-section">
                  <h2 className="fapi98-heading">Foundations</h2>
                  {coreFoundations.map((item) => (
                    <div key={item.title}>
                      <h3 className="fapi98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="fapi98-features" className="fapi98-section">
                  <h2 className="fapi98-heading">Framework Features</h2>
                  {frameworkFeatures.map((item) => (
                    <div key={item.title}>
                      <h3 className="fapi98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="fapi98-runtime" className="fapi98-section">
                  <h2 className="fapi98-heading">Runtime and Operations</h2>
                  {runtimeAndOperations.map((item) => (
                    <div key={item.title}>
                      <h3 className="fapi98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="fapi98-uses" className="fapi98-section">
                  <h2 className="fapi98-heading">Ecosystem Uses</h2>
                  {ecosystemUses.map((item) => (
                    <div key={item.title}>
                      <h3 className="fapi98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="fapi98-compare" className="fapi98-section">
                  <h2 className="fapi98-heading">Compare and Contrast</h2>
                  {comparisons.map((item) => (
                    <div key={item.title}>
                      <h3 className="fapi98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="fapi98-failures" className="fapi98-section">
                  <h2 className="fapi98-heading">Failure Modes</h2>
                  {failureModes.map((item) => (
                    <div key={item.title}>
                      <h3 className="fapi98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="fapi98-checklist" className="fapi98-section">
                  <h2 className="fapi98-heading">Study Checklist</h2>
                  <ul>
                    {studyChecklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                {examples.map((example) => (
                  <section key={example.id} id={example.id} className="fapi98-section">
                    <h2 className="fapi98-heading">{example.title}</h2>
                    <p>
                      <strong>Area:</strong> {example.area}
                    </p>
                    <p>{example.intro}</p>
                    <p>
                      <strong>Why this example fits:</strong> {example.whyFit}
                    </p>
                    <div className="fapi98-codebox">
                      <code>{example.code}</code>
                    </div>
                    <p>
                      <strong>Takeaway:</strong> {example.takeaway}
                    </p>
                  </section>
                ))}
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="fapi98-glossary" className="fapi98-section">
                <h2 className="fapi98-heading">Glossary</h2>
                {glossary.map((entry) => (
                  <p key={entry.term}>
                    <strong>{entry.term}:</strong> {entry.definition}
                  </p>
                ))}
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
