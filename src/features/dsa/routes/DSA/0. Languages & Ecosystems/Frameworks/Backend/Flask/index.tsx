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
  'Flask is a lightweight Python web framework built around Werkzeug for WSGI request handling and Jinja for templating. It is widely used for APIs, internal tools, admin panels, prototypes, and production services where teams want a small framework core with explicit control over application structure and extensions.',
  'The right way to think about Flask is not as a full batteries-included platform like Django and not merely as a thin wrapper around sockets. Flask gives the essentials for HTTP routing, request and response objects, templating, configuration, error handling, and extension points, while leaving more architecture decisions to the application than more opinionated frameworks do.',
  'This page is intentionally thorough. It covers Flask application structure, routing, request handling, blueprints, templating, extensions, database integration, deployment, testing, performance, security, and the tradeoffs that matter when deciding whether Flask is the right backend framework for a given project.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Flask is a micro web framework for Python. The word micro does not mean toy or incomplete. It means the framework core is intentionally small and focused, providing request dispatching, routing, response handling, configuration, and templating hooks without forcing a large default project structure or a large set of built-in subsystems.',
      'That design makes Flask attractive to engineers who want Python productivity and web primitives without being locked into a single ORM, auth model, folder convention, or application architecture. It can power small tools and also serious production services, but it expects the team to assemble more of the surrounding architecture deliberately.',
    ],
  },
  {
    id: 'bp-why-it-matters',
    title: 'Why Flask Matters',
    paragraphs: [
      'Flask matters because it gives Python teams a backend framework with very low ceremony and a direct programming model. It is easy to read, easy to start, and flexible enough to support many service shapes. That has made it a common choice for APIs, internal platforms, teaching, automation frontends, and teams that want to avoid a very opinionated framework.',
      'Its importance also comes from ecosystem fit. Because Flask stays relatively small, it integrates cleanly with Python libraries for data access, background work, observability, authentication, and deployment. The framework often works best as a thin and understandable HTTP layer around the rest of the Python stack.',
    ],
    bullets: [
      'Small framework core with explicit request handling.',
      'Python-first ergonomics and easy incremental adoption.',
      'Flexible enough for APIs, tools, and custom backend architectures.',
      'Extension-friendly without forcing a large platform model.',
    ],
  },
  {
    id: 'bp-mental-model',
    title: 'Mental Model',
    paragraphs: [
      'The right mental model is a lightweight HTTP framework that gives you clean web primitives and then gets out of the way. A Flask app is usually a Python application that exposes routes, reads request data, calls domain logic, and returns responses. The framework is visible and understandable rather than hidden behind heavy runtime magic.',
      'That simplicity is both the strength and the responsibility. Flask gives enough structure to build backend systems, but it does not prescribe the architecture above the request layer. Teams must decide how they organize services, validation, persistence, auth, configuration, and background work.',
    ],
    bullets: [
      'Think explicit routing and request objects.',
      'Think framework as HTTP shell around Python application code.',
      'Think extension points and architectural freedom rather than platform prescription.',
    ],
  },
  {
    id: 'bp-when-it-fits',
    title: 'When Flask Fits Best',
    paragraphs: [
      'Flask fits best when a team wants a small Python web framework with low ceremony, direct control over architecture, and the ability to choose surrounding libraries deliberately. It is a strong fit for internal tools, REST APIs, simple web apps, admin backends, webhook receivers, service adapters, and projects where developer speed and clarity matter more than framework-provided structure.',
      'It is also useful when the domain is straightforward enough that the team does not need a very large framework, but still wants better routing, request handling, configuration, and testing support than ad hoc scripts provide.',
    ],
    bullets: [
      'Python APIs and internal services with explicit structure.',
      'Small-to-medium web applications that do not need a large integrated platform.',
      'Teams that prefer choosing libraries for ORM, auth, and other concerns independently.',
      'Projects where readability and low startup complexity are important.',
    ],
  },
  {
    id: 'bp-when-it-does-not-fit',
    title: 'Where Flask Is Not the Best Default',
    paragraphs: [
      'Flask is not the best default when a team wants strong framework conventions, integrated admin and ORM patterns, or a broad batteries-included platform. It can also become messy if the application grows large and the team never introduces its own architecture, because the framework will not force one for them.',
      'It is also a weaker fit when async-first behavior is a top priority, when very high throughput requirements make process model choices central, or when the team would benefit from a framework that prescribes more of the stack from the start.',
    ],
    bullets: [
      'Teams wanting stronger built-in conventions and platform defaults.',
      'Large applications with no willingness to define internal architecture explicitly.',
      'Workloads where async-first design is central to the system model.',
      'Projects that want a more integrated full-stack framework out of the box.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Key Takeaways',
    paragraphs: [
      'Flask is strongest when simplicity, explicitness, and Python ecosystem flexibility are real advantages. It gives a clean HTTP framework and lets teams build their own architecture on top. That makes it productive and adaptable, but it also means the framework will not rescue an application from poor structure.',
      'The best Flask systems stay small in framework ceremony and strong in engineering discipline. Clear module boundaries, validation, testing, operational hygiene, and explicit extension choices matter more than the elegance of the route decorator syntax alone.',
    ],
    bullets: [
      'Choose Flask when you want low ceremony and direct Python web development.',
      'Do not confuse lightweight framework design with license for weak architecture.',
      'Use Flask as a clear HTTP layer around well-structured application code.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-what-it-is',
    title: 'What Flask Actually Is',
    paragraphs: [
      'Flask is a Python web framework built on Werkzeug and commonly paired with Jinja for server-rendered HTML. It provides URL routing, request and response objects, configuration, templating, session support, error handling, and an extension model for adding features such as databases, authentication, rate limiting, forms, or migrations.',
      'Its main identity is deliberate minimalism. Flask gives core web functionality and keeps the framework logic relatively transparent. Engineers can usually understand what happens during request handling by reading straightforward Python code rather than deciphering a large amount of hidden runtime behavior.',
    ],
  },
  {
    id: 'core-app-structure',
    title: 'Application Object and Structure',
    paragraphs: [
      'A Flask application centers on an app object that holds configuration, routes, extension registrations, and request lifecycle hooks. Small apps may define everything in one file, but production systems usually split concerns into packages for routes, services, models, configuration, and infrastructure.',
      'A common pattern is the application factory, where a function constructs and configures the app. This helps testing, environment-specific setup, and extension initialization. It also encourages treating app assembly as an explicit step rather than a side effect of imports.',
    ],
  },
  {
    id: 'core-routing',
    title: 'Routing and View Functions',
    paragraphs: [
      'Flask routing maps URL patterns and HTTP methods to Python view functions. Decorators make the mapping readable and direct, which is one reason Flask feels approachable. Route handlers receive request context, perform application work, and return strings, JSON-compatible data, response objects, or rendered templates.',
      'That simplicity is useful, but route functions should not become the whole application. Production Flask code benefits from thin handlers that delegate domain rules, persistence, validation, and external integration to separate layers.',
    ],
  },
  {
    id: 'core-request-context',
    title: 'Request Context and Application Context',
    paragraphs: [
      'Flask uses context-local objects such as request, session, current_app, and g to expose per-request and app-scoped information without requiring every function to thread these objects through parameters manually. This is convenient and widely used, but developers should still understand the underlying context rules.',
      'The important engineering point is that context locals are part of the framework convenience layer, not a substitute for clear dependency boundaries. Heavy hidden reliance on global context can make code harder to test and reason about when a codebase grows.',
    ],
  },
  {
    id: 'core-blueprints',
    title: 'Blueprints and Modular Organization',
    paragraphs: [
      'Blueprints let teams group related routes, error handlers, templates, and static files into modular units that can be registered on the application. This is Flasks main built-in mechanism for structuring larger apps beyond a single file.',
      'Blueprints improve organization, but they are not a full architecture by themselves. They help separate transport concerns, while the team still decides how business logic, data access, and service boundaries are modeled.',
    ],
  },
  {
    id: 'core-templating',
    title: 'Templates and Server-Rendered UI',
    paragraphs: [
      'Flask commonly uses Jinja templates for server-rendered pages. Jinja supports variables, loops, conditional rendering, includes, layout inheritance, and filters, which makes Flask suitable for classic MVC-style web applications and internal tools.',
      'When using templates, the same backend design principles still apply. Views should present data cleanly, but domain logic and persistence logic should not be embedded deeply in template rendering paths.',
    ],
  },
  {
    id: 'core-json-api',
    title: 'JSON APIs and Serialization',
    paragraphs: [
      'Flask is frequently used to build JSON APIs. Handlers can return dictionaries or response objects, and teams often add validation and serialization libraries for clearer contracts. Flask itself does not force one schema library or one API architecture, which can be a strength when the team wants control.',
      'The tradeoff is consistency. Without shared conventions, API error shapes, validation behavior, and schema handling can drift between endpoints. Mature Flask services usually adopt a standard serialization and validation layer explicitly.',
    ],
  },
  {
    id: 'core-extensions',
    title: 'Extensions and Ecosystem Composition',
    paragraphs: [
      'A large part of Flask development involves choosing extensions. Common choices include Flask-SQLAlchemy, Flask-Migrate, Flask-Login, Flask-WTF, Flask-Limiter, and many others. This gives teams flexibility to assemble only the features they need.',
      'The risk is fragmented architecture if extensions are added opportunistically without clear standards. The best Flask projects treat extension selection as a framework design decision, not as a pile of conveniences.',
    ],
  },
  {
    id: 'core-database',
    title: 'Database Integration and Persistence',
    paragraphs: [
      'Flask does not prescribe a single database approach. Teams might use SQLAlchemy directly, Flask-SQLAlchemy as a convenience layer, raw drivers, or specialized libraries depending on workload and complexity. This flexibility is useful, especially in Python ecosystems with many data tools.',
      'Regardless of library choice, transaction boundaries, connection management, migrations, query design, and schema evolution remain application responsibilities. Flask helps expose endpoints; it does not solve persistence discipline automatically.',
    ],
  },
  {
    id: 'core-config',
    title: 'Configuration and Environment Management',
    paragraphs: [
      'Flask apps typically load configuration from Python objects, environment variables, instance folders, or dedicated settings modules. The framework gives mechanisms for configuration access, but teams need a consistent strategy for secrets, environment-specific settings, and deploy-time overrides.',
      'A mature Flask service keeps configuration explicit, auditable, and separate from the request layer. The more environments and integrations a system has, the more important this becomes.',
    ],
  },
  {
    id: 'core-security',
    title: 'Security Model',
    paragraphs: [
      'Flask itself provides only part of an applications security posture. Developers still need to design authentication, authorization, session handling, CSRF protections where relevant, input validation, output escaping, secret management, and rate limits appropriately for the service type.',
      'This is one of the core tradeoffs of lightweight frameworks. You gain flexibility, but you also own more of the final security architecture. Good Flask engineering requires explicit security standards rather than assumptions that the framework has already handled everything.',
    ],
  },
  {
    id: 'core-testing',
    title: 'Testing Model',
    paragraphs: [
      'Flask provides a test client that lets applications simulate requests without a separately deployed server. This makes it straightforward to test routes, response codes, JSON behavior, auth flows, and error handling. Combined with the application factory pattern, it supports clean environment-specific tests.',
      'Strong testing in Flask usually means separating concerns well enough that route tests, service tests, and integration tests each have a clear role. If route functions contain all the business logic, testing becomes more brittle and less focused.',
    ],
  },
  {
    id: 'core-deployment',
    title: 'Deployment and Runtime Model',
    paragraphs: [
      'Flask is traditionally deployed as a WSGI application behind servers such as Gunicorn or uWSGI, often with a reverse proxy like Nginx in front. In practice, runtime behavior depends heavily on worker model, process count, timeout settings, and the behavior of external dependencies.',
      'Understanding deployment is important because Flask itself is not the whole runtime. Threading model, request concurrency, CPU vs I O mix, and process supervision all shape production reliability and performance.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance Mindset',
    paragraphs: [
      'Flask can serve production traffic effectively, but performance depends less on the decorator syntax and more on normal backend fundamentals: database queries, cache use, network latency, serialization cost, process model, and Python runtime characteristics. Many Flask bottlenecks come from application behavior rather than the framework core.',
      'The right mindset is empirical. Measure latency, inspect request traces, profile slow endpoints, and understand where concurrency limits come from. Lightweight does not automatically mean fast, and heavy optimization assumptions without measurement are usually wrong.',
    ],
    bullets: [
      'Profile database and remote dependency latency before blaming the framework.',
      'Choose worker and process settings deliberately for the workload.',
      'Treat caching, batching, and query design as first-class performance tools.',
      'Keep route handlers thin so hot paths stay understandable.',
    ],
  },
  {
    id: 'core-use-cases',
    title: 'Common Real-World Uses',
    paragraphs: [
      'Flask is widely used for REST APIs, internal dashboards, admin tools, lightweight web apps, webhook endpoints, ML service wrappers, prototypes that later harden into production services, and general Python HTTP backends where simplicity matters.',
      'Its broad adoption comes from the fact that it works well as a minimal framework shell around diverse Python ecosystems. Teams can pair it with SQL stacks, data science code, task queues, or template-driven UIs without excessive framework friction.',
    ],
  },
  {
    id: 'core-not-fit',
    title: 'When Not to Use Flask',
    paragraphs: [
      'Flask is a weaker fit when the team needs strong built-in conventions for admin, ORM, forms, auth, and project structure, or when the application is large enough that a more opinionated framework would reduce architectural drift. It can also be a weak fit when the system wants an async-native framework model as a core design requirement.',
      'That does not make Flask outdated or weak. It means its value comes from explicitness and flexibility, which are advantages only when the team is prepared to own the missing conventions thoughtfully.',
    ],
  },
  {
    id: 'core-pitfalls',
    title: 'Common Pitfalls',
    paragraphs: [
      'Common Flask mistakes include letting route files grow into monoliths, relying too heavily on global context objects, scattering extension setup without a clear composition root, mixing database logic directly into handlers, and assuming the framework is secure by default without an explicit security model.',
      'Another recurring mistake is keeping the app tiny in structure even after the system is no longer tiny in scope. Flask starts small very well, but teams must introduce architecture as the application grows.',
    ],
    bullets: [
      'Do not let view functions become the entire application architecture.',
      'Do not depend on context globals where explicit dependencies would be clearer.',
      'Do not add extensions without understanding how they shape the codebase.',
      'Do not delay modularization forever just because the framework started small.',
    ],
  },
  {
    id: 'core-compare',
    title: 'Flask Compared with Other Backend Frameworks',
    paragraphs: [
      'Compared with Django, Flask is lighter, less opinionated, and less integrated. Compared with FastAPI, Flask is traditionally less schema-driven and less async-centric by default. Compared with Spring Boot, NestJS, or Laravel, it offers far less platform-level architecture and more direct control. Compared with bare WSGI usage, it gives a much cleaner and more productive developer experience.',
      'The right comparison is whether the team values freedom and simplicity more than built-in conventions and integrated subsystems. Flask is strongest when that tradeoff is deliberate rather than accidental.',
    ],
  },
  {
    id: 'core-decision',
    title: 'Decision Checklist',
    paragraphs: [
      'Choose Flask when Python is the right language, the application benefits from a small and understandable framework, and the team is willing to define architecture above the HTTP layer. Choose something more opinionated when the team wants stronger defaults, more built-in subsystems, or a framework that pushes structure much harder.',
      'The best Flask choices happen when simplicity and flexibility are operational advantages, not just aesthetic preferences.',
    ],
    bullets: [
      'Need low-ceremony Python web development: strong Flask signal.',
      'Need to compose your own libraries and architecture: strong Flask signal.',
      'Need a broad integrated platform with stronger conventions: weaker Flask signal.',
      'Need explicit and readable HTTP layer code: strong Flask signal.',
    ],
  },
]
const exampleSections: ExampleSection[] = [
  {
    id: 'examples-app-factory',
    title: 'Application Factory with Configuration',
    description: [
      'A common production pattern is to create the Flask app inside a factory function. This makes testing and environment-specific configuration much easier.',
      'It also gives the application a clear composition root where extensions and blueprints are registered.',
    ],
    code: `from flask import Flask

def create_app(config_object: str = "config.DevelopmentConfig") -> Flask:
    app = Flask(__name__)
    app.config.from_object(config_object)

    from .routes import api_bp
    app.register_blueprint(api_bp, url_prefix="/api")

    return app`,
    notes: [
      'Factory-based app assembly improves testability and deployment clarity.',
      'Configuration loading should stay explicit and environment-aware.',
    ],
  },
  {
    id: 'examples-route-json',
    title: 'JSON Route Handler',
    description: [
      'A simple Flask API route can read a path parameter, call a service layer, and return JSON. The route should stay thin even when the framework makes inline handlers easy.',
      'Keeping business logic out of handlers helps the codebase scale beyond the first few endpoints.',
    ],
    code: `from flask import Blueprint, jsonify

api_bp = Blueprint("api", __name__)

@api_bp.get("/orders/<order_id>")
def get_order(order_id: str):
    order = order_service.find_one(order_id)
    return jsonify(order.to_dict())`,
    notes: [
      'Blueprint routes are usually cleaner than a giant single-file app.',
      'Thin handlers make testing and reuse much easier.',
    ],
  },
  {
    id: 'examples-blueprint',
    title: 'Blueprint Registration',
    description: [
      'Blueprints let related routes be grouped and then mounted on the main application with a URL prefix. This is the basic modular unit Flask provides for larger apps.',
      'The goal is not only cleaner files, but a more deliberate separation of transport concerns.',
    ],
    code: `from flask import Blueprint

users_bp = Blueprint("users", __name__)

@users_bp.get("/")
def list_users():
    return {"items": []}

app.register_blueprint(users_bp, url_prefix="/users")`,
    notes: [
      'Blueprints organize route concerns, but they do not replace full architecture.',
      'Use URL prefixes and package boundaries consistently across the app.',
    ],
  },
  {
    id: 'examples-error-handler',
    title: 'Central Error Handling',
    description: [
      'Flask lets applications map exceptions to consistent HTTP responses. This is important for API quality because clients should not receive inconsistent or framework-shaped error payloads.',
      'A centralized handler also keeps route functions focused on normal control flow.',
    ],
    code: `from flask import jsonify

class NotFoundError(Exception):
    pass

@app.errorhandler(NotFoundError)
def handle_not_found(error):
    return jsonify({"error": "not_found", "message": str(error)}), 404`,
    notes: [
      'Central error handling improves consistency across endpoints.',
      'Domain exceptions should map to stable API responses deliberately.',
    ],
  },
  {
    id: 'examples-db-session',
    title: 'SQLAlchemy Session Usage',
    description: [
      'Database work in Flask is usually delegated to a repository or service layer rather than mixed directly into routing code. This example shows a simple create flow.',
      'The important idea is explicit transaction handling and separation of concerns.',
    ],
    code: `@api_bp.post("/users")
def create_user():
    payload = request.get_json()
    user = User(email=payload["email"])
    db.session.add(user)
    db.session.commit()
    return jsonify({"id": user.id, "email": user.email}), 201`,
    notes: [
      'Database access is clearer when session and transaction behavior are explicit.',
      'Validation should usually happen before persistence calls.',
    ],
  },
  {
    id: 'examples-test-client',
    title: 'Testing with the Flask Test Client',
    description: [
      'Flask includes a test client that can call routes directly in tests. This makes endpoint verification fast and practical for normal backend workflows.',
      'Combined with a factory pattern, tests can boot an isolated app instance with test settings.',
    ],
    code: `def test_healthcheck():
    app = create_app("config.TestConfig")
    client = app.test_client()

    response = client.get("/health")

    assert response.status_code == 200
    assert response.get_json() == {"status": "ok"}`,
    notes: [
      'The built-in test client is a major productivity advantage for Flask apps.',
      'Keep tests focused on the contract being verified rather than every internal detail.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-core',
    title: 'Core Flask Terms',
    terms: [
      {
        term: 'Flask Application',
        definition:
          'The central app object that holds configuration, route registrations, hooks, and extension wiring.',
      },
      {
        term: 'View Function',
        definition:
          'A Python function mapped to a route that handles a request and returns a response.',
      },
      {
        term: 'Blueprint',
        definition:
          'A modular grouping of routes and related behavior that can be registered on an application.',
      },
      {
        term: 'Werkzeug',
        definition:
          'The underlying WSGI utility library that provides much of Flasks request and routing machinery.',
      },
      {
        term: 'Jinja',
        definition:
          'The template engine commonly used by Flask for server-rendered HTML responses.',
      },
    ],
  },
  {
    id: 'glossary-request',
    title: 'Request Lifecycle Terms',
    terms: [
      {
        term: 'Request Context',
        definition:
          'The per-request environment that makes objects such as request and session available during handling.',
      },
      {
        term: 'Application Context',
        definition:
          'The context that exposes app-scoped objects such as current_app and g while an app is active.',
      },
      {
        term: 'Session',
        definition:
          'A mechanism for storing per-client state, often using signed cookies in Flask applications.',
      },
      {
        term: 'Error Handler',
        definition:
          'A function registered to convert exceptions or HTTP errors into structured responses.',
      },
      {
        term: 'before_request',
        definition:
          'A Flask hook that runs before each request handler and can be used for setup or validation logic.',
      },
    ],
  },
  {
    id: 'glossary-architecture',
    title: 'Architecture and Testing Terms',
    terms: [
      {
        term: 'Application Factory',
        definition:
          'A function that creates and configures a Flask app instance instead of constructing it at import time.',
      },
      {
        term: 'WSGI',
        definition:
          'The traditional Python web server gateway interface commonly used to deploy Flask applications.',
      },
      {
        term: 'Gunicorn',
        definition: 'A common Python WSGI server used to run Flask apps in production.',
      },
      {
        term: 'Flask-SQLAlchemy',
        definition:
          'A popular extension that integrates SQLAlchemy conveniences into Flask applications.',
      },
      {
        term: 'Test Client',
        definition:
          'Flasks built-in client used to make in-process requests during automated tests.',
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

export default function FlaskPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Flask',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Flask"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Flask</h1>
      <p className="postgres-help-doc-subtitle">
        Python backend framework reference covering routing, blueprints, request handling,
        templating, extensions, deployment, and tradeoffs.
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
