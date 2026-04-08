import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const overviewSections = [
  {
    title: 'What Flask is',
    body: 'Flask is a lightweight Python web framework built around routing, request handling, templating integration, and a small core. It is often described as a microframework because it intentionally keeps the core surface area narrow and expects teams to compose surrounding concerns such as ORM access, validation, authentication, background work, and API tooling through extensions or application-specific conventions.',
  },
  {
    title: 'Why Flask matters',
    body: 'Flask matters because it became one of the most influential Python frameworks for learning web development, building small services, and assembling custom backend stacks. It showed that a Python web framework could stay approachable and flexible without requiring a heavy platform-wide architecture from the very beginning.',
  },
  {
    title: 'How to think about it',
    body: 'The most useful mental model is that Flask is a minimal WSGI request framework with strong ergonomics and weak architectural enforcement. It gives you the HTTP entrypoint, routing, request context, response helpers, and a few core conventions, then leaves broader application structure to the team.',
  },
  {
    title: 'Where it fits best',
    body: 'Flask fits best for small to medium APIs, internal tools, server-rendered utilities, prototypes, and backend services where teams want Python flexibility more than framework opinion. It is especially comfortable when the service boundary is simple enough that a thin HTTP layer plus selected extensions are sufficient.',
  },
]

const whyItMatters = [
  'It became one of the defining Python microframeworks and shaped how many developers first learned backend web development.',
  'It keeps the entry barrier low while still supporting disciplined engineering in real services.',
  'It gives teams freedom to assemble the rest of the stack instead of forcing an all-in platform choice immediately.',
  'It works for both server-rendered web apps and API-style services, which made it broadly useful across many teams.',
  'Its ecosystem of extensions and examples gave it long-lasting influence even as newer Python frameworks emerged.',
]

const historicalContext = [
  {
    title: 'Flask grew in the WSGI generation',
    detail:
      'Flask emerged in an era when synchronous Python web applications built on WSGI were the dominant pattern. It sat in contrast to heavier full-stack frameworks by embracing a smaller core with explicit choices left to the application.',
  },
  {
    title: 'Werkzeug and Jinja shaped its foundations',
    detail:
      'Flask did not begin as an isolated framework invention. It grew from related projects such as Werkzeug for HTTP and WSGI utilities and Jinja for templating. That heritage explains why Flask often feels like a thin, elegant layer over lower-level Python web primitives.',
  },
  {
    title: 'Microframework did not mean toy framework',
    detail:
      'Flask was often introduced as a simpler alternative to more opinionated ecosystems, but many teams used it successfully in production. The real distinction was not seriousness but where architectural decisions lived: inside the framework by default, or inside the application by choice.',
  },
  {
    title: 'Newer Python frameworks changed the conversation',
    detail:
      'As async support, type-driven development, and automatic API schemas became more important, frameworks such as FastAPI changed expectations. Flask remained relevant because of familiarity, simplicity, and flexibility, even when it no longer represented the newest default style for API-first Python work.',
  },
]

const bigPictureThemes = [
  {
    title: 'Minimal core, application-owned structure',
    body: 'Flask gives the team a lot of room to define architecture on its own terms. That freedom is attractive when requirements are simple or highly custom, but it also means quality depends heavily on team discipline because the framework does not enforce layered boundaries, dependency injection structure, or contract models automatically.',
  },
  {
    title: 'Request context is a central abstraction',
    body: 'Flask relies on application and request context objects to make request-scoped information available during handling. This can feel elegant and ergonomic, but teams still need to understand what is implicit in the context and what is passed explicitly between layers.',
  },
  {
    title: 'Extensions are part of the real framework story',
    body: 'The Flask core is intentionally small, so production use usually depends on extension choices for forms, auth, ORM integration, migrations, serialization helpers, admin surfaces, or API helpers. To understand Flask in practice, you have to understand both the core and how teams assemble the surrounding stack.',
  },
  {
    title: 'Simplicity at the edge does not remove production complexity',
    body: 'A few lines of Flask code can create a working endpoint quickly, but production systems still need testing, configuration discipline, observability, security, timeouts, deployment standards, and clean module organization. Flask removes ceremony, not engineering responsibility.',
  },
]

const keyTakeaways = [
  'Flask is a lightweight WSGI web framework with a small core and broad extension-based flexibility.',
  'Its strength is low ceremony and adaptability rather than strong built-in architectural guidance.',
  'It is often a strong fit when the application is simple, custom, or incrementally evolving.',
  'As systems grow, Flask codebases need deliberate conventions for structure, validation, and operational behavior.',
  'Flask remains important because many Python teams value explicit assembly over heavy framework opinion.',
]

const topicSignals = [
  {
    title: 'Choose Flask when you want a thin HTTP layer',
    body: 'If the application mostly needs routing, request handling, templates or JSON responses, and a straightforward integration surface to the rest of your code, Flask is often a natural fit.',
  },
  {
    title: 'Choose Flask when architecture must stay custom',
    body: 'Teams that already have clear internal service boundaries or want to build their own conventions for persistence, validation, and auth often appreciate Flask because it does not force a broader application model too early.',
  },
  {
    title: 'Choose Flask when synchronous simplicity is sufficient',
    body: 'For many internal services, admin tools, dashboards, and moderate traffic APIs, Flask remains fully capable. If the workload does not require an async-first architecture, Flask may offer a simpler mental model than newer frameworks.',
  },
  {
    title: 'Avoid expecting Flask to supply structure on its own',
    body: 'If the team needs framework-enforced contracts, strong module boundaries, automatic schema generation, or richer platform defaults, Flask may feel too unopinionated unless the team is ready to supply those patterns independently.',
  },
]

const coreFoundations = [
  {
    title: 'WSGI underneath',
    body: 'Flask is rooted in the WSGI model, which means it historically assumes synchronous request handling and a classic Python web server deployment path. Even when additional capabilities are layered on later, understanding Flask begins with understanding it as a request-response framework over WSGI conventions.',
  },
  {
    title: 'Routing and view functions',
    body: 'The most visible Flask pattern is route registration through decorators that bind a URL pattern and HTTP method to a view function. This direct mapping is one reason Flask feels approachable: request handling logic is easy to read in small services.',
  },
  {
    title: 'Request and application context',
    body: 'Flask provides context-local objects such as request, current_app, and g so code can access request-scoped or application-scoped state without manually threading those objects through every function call. This is ergonomic, but it can also hide dependencies if used carelessly.',
  },
  {
    title: 'Blueprints for modular structure',
    body: "Blueprints are Flask's main built-in mechanism for organizing routes and related logic into reusable or feature-scoped units. They help larger applications avoid turning the entrypoint into one giant file, but they do not replace the need for broader service architecture.",
  },
  {
    title: 'Templates and response helpers',
    body: 'Although many modern Flask applications are APIs, Flask also has a strong history with server-rendered HTML through Jinja templates. That dual identity is part of why Flask remains relevant across both utility dashboards and JSON service layers.',
  },
]

const frameworkFeatures = [
  {
    title: 'Small and stable core',
    body: 'Flask intentionally keeps the default abstraction surface narrow. That helps the framework stay easy to understand, but it also means many important capabilities are not solved centrally by the framework itself.',
  },
  {
    title: 'Extension-friendly design',
    body: 'A major Flask strength is how easily it can be extended. SQLAlchemy integration, login management, migrations, form handling, serialization helpers, admin interfaces, and caching support can all be added through the surrounding ecosystem.',
  },
  {
    title: 'Application factory patterns',
    body: 'Larger Flask applications often use an app factory that creates and configures the app instance at startup time. This improves testability, environment-specific setup, and extension wiring compared with a single global app declared at import time.',
  },
  {
    title: 'Straightforward JSON and HTML handling',
    body: 'Flask is equally comfortable returning JSON for APIs or rendering templates for server-side pages. That versatility makes it useful for internal tools and mixed applications that do not fit neatly into a single backend style.',
  },
  {
    title: 'Readable request entrypoints',
    body: "For small to moderate services, Flask routes can remain very readable because there is so little framework ceremony between the incoming request and the handler logic. That readability is one of Flask's enduring advantages.",
  },
]

const runtimeAndOperations = [
  {
    title: 'Server and deployment model',
    body: 'Flask applications are commonly deployed behind WSGI servers such as Gunicorn or uWSGI and often sit behind a reverse proxy in production. Practical behavior depends on worker count, process model, request timeout policy, and how much blocking work occurs in the request path.',
  },
  {
    title: 'Validation is not a built-in center of gravity',
    body: 'Unlike more contract-oriented frameworks, Flask does not strongly center validation, schema generation, or response models in the default programming style. Teams usually need to choose their own validation libraries and decide where those boundary checks belong.',
  },
  {
    title: 'Observability and error handling remain application work',
    body: 'Structured logs, metrics, tracing, rate limiting, exception taxonomy, correlation IDs, and graceful shutdown all remain explicit engineering work in Flask services. The framework does not prevent good operations, but it does not supply them by default either.',
  },
  {
    title: 'Performance depends more on architecture than on minimalism alone',
    body: "Flask's small core does not guarantee high performance by itself. Database latency, serialization cost, cache design, blocking work, and deployment configuration usually dominate service behavior. The right question is not whether Flask is minimal, but whether the whole system is well-structured for the workload.",
  },
]

const ecosystemUses = [
  {
    title: 'Internal tools and dashboards',
    body: 'Flask is widely used for admin panels, developer tools, operational dashboards, and internal web interfaces where simplicity and quick iteration matter more than a large application platform.',
  },
  {
    title: 'Small and medium APIs',
    body: 'Many teams use Flask successfully for REST-style services, integration layers, and backend utilities when the service boundary is modest and the team is comfortable choosing its own supporting libraries.',
  },
  {
    title: 'Teaching and prototyping',
    body: 'Because the path from empty file to working route is so short, Flask remains a common framework for learning backend concepts and quickly validating product ideas.',
  },
  {
    title: 'Custom stacks around existing domain code',
    body: 'Teams with mature business logic, data-processing systems, or Python libraries often use Flask as a thin HTTP envelope around code that already exists elsewhere in the application or platform.',
  },
]

const comparisons = [
  {
    title: 'Flask versus FastAPI',
    body: 'Flask emphasizes flexibility and a minimal synchronous core, while FastAPI emphasizes typed contracts, built-in validation, and automatic API documentation. Flask gives teams more freedom earlier; FastAPI gives teams more contract-oriented defaults earlier.',
  },
  {
    title: 'Flask versus Django',
    body: 'Django is a broader full-stack framework with an ORM, admin tooling, forms, and stronger conventions. Flask is much smaller and more compositional. The tradeoff is platform completeness versus architectural freedom.',
  },
  {
    title: 'Flask versus Express.js',
    body: 'Both frameworks are known for low ceremony and application-owned architecture. Express lives in the Node ecosystem and centers middleware composition more directly, while Flask lives in Python and often centers view functions, blueprints, and extension choices.',
  },
  {
    title: 'Flask versus ASP.NET Core',
    body: 'ASP.NET Core offers a much richer integrated platform for dependency injection, configuration, typed APIs, and production infrastructure. Flask is lighter and simpler to start, but it expects the application to assemble more of the surrounding architecture itself.',
  },
]

const failureModes = [
  {
    title: 'Letting route files become the whole architecture',
    body: 'Because Flask routes are easy to write, teams sometimes keep piling business logic directly into handlers. That works briefly, then produces a service where HTTP concerns, validation, persistence, and domain rules are all mixed together.',
  },
  {
    title: 'Using global context without clear boundaries',
    body: 'Objects such as request, current_app, and g are convenient, but overusing them can hide dependencies and make code harder to test or reason about. Context convenience should not replace explicit design.',
  },
  {
    title: 'Depending on extensions without architectural review',
    body: "Flask's extension ecosystem is powerful, but teams can accumulate mismatched libraries and inconsistent patterns if they adopt packages one at a time without a clear service design in mind.",
  },
  {
    title: 'Weak validation at the request boundary',
    body: 'If raw request data flows too far into the application before being checked, business logic ends up making fragile assumptions about user input. Flask does not fix that automatically, so the team has to.',
  },
  {
    title: 'Mistaking simplicity for production readiness',
    body: 'A working Flask app can be built in minutes, but production services still need robust testing, configuration control, error handling, observability, and deployment discipline. The short demo path should not be confused with the full engineering path.',
  },
]

const studyChecklist = [
  'Understand Flask first as a WSGI request framework with a minimal core.',
  'Learn how request context and application context work before relying on them heavily.',
  'Use blueprints and service boundaries before route files sprawl across the codebase.',
  'Choose validation, ORM, and auth patterns deliberately instead of extension-by-extension drift.',
  'Prefer an app factory when the service needs testing, environment setup, or clearer initialization.',
  'Treat production concerns as architecture decisions, not as framework afterthoughts.',
]

const examples = [
  {
    id: 'flask98-example-basic-route',
    title: 'Example: Basic route and JSON response',
    area: 'Routing',
    intro:
      'The classic Flask entrypoint shows why the framework feels approachable. A route decorator maps a URL to a view function, and the function returns JSON with very little ceremony.',
    whyFit:
      "This captures Flask's core appeal: a short path from empty file to working backend endpoint.",
    code: `from flask import Flask, jsonify

app = Flask(__name__)

@app.get("/health")
def health():
    return jsonify({"ok": True})`,
    takeaway:
      'Flask keeps the HTTP surface readable because the route and the handler remain close together in the default style.',
  },
  {
    id: 'flask98-example-blueprint',
    title: 'Example: Blueprint for feature organization',
    area: 'Modularity',
    intro:
      'Blueprints help larger Flask services organize related routes together without forcing a heavyweight module system. They are usually the first step away from a single-file application.',
    whyFit:
      "This demonstrates Flask's built-in answer to route sprawl while keeping the framework lightweight.",
    code: `from flask import Blueprint, jsonify

orders = Blueprint("orders", __name__, url_prefix="/orders")

@orders.get("/<order_id>")
def get_order(order_id: str):
    return jsonify({"order_id": order_id})`,
    takeaway:
      'Blueprints improve organization, but they work best when paired with deeper service boundaries beyond the HTTP layer itself.',
  },
  {
    id: 'flask98-example-app-factory',
    title: 'Example: App factory for initialization',
    area: 'Application Setup',
    intro:
      'An app factory keeps startup configuration explicit and helps testing by creating fresh application instances on demand rather than relying on one global object created at import time.',
    whyFit:
      'This shows the pattern many real Flask services adopt once configuration and extension wiring become non-trivial.',
    code: `def create_app(config_object: str | None = None):
    app = Flask(__name__)
    if config_object:
        app.config.from_object(config_object)

    from .routes import orders
    app.register_blueprint(orders)
    return app`,
    takeaway:
      'The app factory is often the boundary between a tutorial-style Flask app and a service that is easier to test and evolve.',
  },
  {
    id: 'flask98-example-validation',
    title: 'Example: Explicit request validation',
    area: 'Boundary Safety',
    intro:
      'Flask does not center request models by default, so teams often perform validation explicitly through their chosen schema or parsing layer before calling deeper application logic.',
    whyFit:
      'This example reflects a real Flask discipline: the framework stays small, so boundary correctness must be designed consciously.',
    code: `@app.post("/users")
def create_user():
    payload = request.get_json(force=True)
    if "email" not in payload:
        return jsonify({"error": "email_required"}), 400

    user = users_service.create(payload)
    return jsonify(user), 201`,
    takeaway:
      'Even in a lightweight framework, validation belongs near the request boundary instead of being deferred until deeper layers fail unpredictably.',
  },
  {
    id: 'flask98-example-error-handler',
    title: 'Example: Centralized error handling',
    area: 'Operations',
    intro:
      'Production services benefit from a consistent translation between internal exceptions and HTTP responses. Flask lets teams register error handlers to keep those concerns centralized.',
    whyFit:
      'This demonstrates that minimalist frameworks still need explicit operational policy for errors.',
    code: `@app.errorhandler(DomainError)
def handle_domain_error(error):
    return jsonify({
        "error": error.code,
        "message": str(error),
    }), 400`,
    takeaway:
      'A framework with low ceremony still needs deliberate rules for how failures become user-visible responses.',
  },
]

const glossary = [
  {
    term: 'Flask',
    definition:
      'A lightweight Python web framework built around routing, request handling, and extension-friendly composition.',
  },
  {
    term: 'WSGI',
    definition:
      'The traditional Python web server gateway interface used by many synchronous web frameworks and servers.',
  },
  {
    term: 'Werkzeug',
    definition:
      "A Python library for WSGI and HTTP utilities that provides much of Flask's lower-level web foundation.",
  },
  {
    term: 'Jinja',
    definition: 'A templating engine commonly used with Flask for server-rendered HTML.',
  },
  {
    term: 'Blueprint',
    definition: 'A Flask mechanism for grouping related routes and setup logic into modular units.',
  },
  {
    term: 'Application factory',
    definition:
      'A function that creates and configures a Flask application instance at startup time.',
  },
  {
    term: 'Request context',
    definition: "Flask's request-scoped state mechanism that powers objects such as request and g.",
  },
  {
    term: 'Extension',
    definition:
      'A third-party package that integrates additional capabilities into a Flask application.',
  },
  {
    term: 'View function',
    definition: 'A Python function that handles a matched Flask route and returns a response.',
  },
  {
    term: 'Microframework',
    definition:
      'A framework style that intentionally keeps the core small and leaves many broader concerns to surrounding libraries or application code.',
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
    { id: 'flask98-overview', label: 'Overview' },
    { id: 'flask98-why', label: 'Why It Matters' },
    { id: 'flask98-history', label: 'Historical Context' },
    { id: 'flask98-themes', label: 'Big Picture Themes' },
    { id: 'flask98-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'flask98-signals', label: 'Topic Signals' },
    { id: 'flask98-foundations', label: 'Foundations' },
    { id: 'flask98-features', label: 'Framework Features' },
    { id: 'flask98-runtime', label: 'Runtime and Operations' },
    { id: 'flask98-uses', label: 'Ecosystem Uses' },
    { id: 'flask98-compare', label: 'Compare and Contrast' },
    { id: 'flask98-failures', label: 'Failure Modes' },
    { id: 'flask98-checklist', label: 'Study Checklist' },
  ],
  examples: examples.map((example) => ({ id: example.id, label: example.title })),
  glossary: [{ id: 'flask98-glossary', label: 'Terms' }],
}

function isTabId(value: string | null): value is TabId {
  return (
    value === 'big-picture' ||
    value === 'core-concepts' ||
    value === 'examples' ||
    value === 'glossary'
  )
}

const flaskHelpStyles = `
.flask98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.flask98-window {
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

.flask98-titlebar {
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

.flask98-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  line-height: 1;
  white-space: nowrap;
}

.flask98-title-controls {
  display: inline-flex;
  gap: 2px;
}

.flask98-control {
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

.flask98-control:focus-visible,
.flask98-tab:focus-visible,
.flask98-toc-link:focus-visible {
  outline: 1px dotted #000;
  outline-offset: -3px;
}

.flask98-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.flask98-tab {
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

.flask98-tab-active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.flask98-main {
  display: grid;
  grid-template-columns: 248px minmax(0, 1fr);
  flex: 1;
  min-height: 0;
  border-top: 1px solid #404040;
  background: #ffffff;
}

.flask98-toc {
  overflow: auto;
  padding: 12px 12px 18px;
  background: #efefef;
  border-right: 1px solid #808080;
}

.flask98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.flask98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.flask98-toc-item + .flask98-toc-item {
  margin-top: 8px;
}

.flask98-toc-link {
  color: #000;
  text-decoration: none;
  font-size: 12px;
  line-height: 1.35;
}

.flask98-content {
  overflow: auto;
  padding: 16px 22px 24px;
  background: #ffffff;
}

.flask98-doc-title {
  margin: 0 0 12px;
  font-size: 22px;
  font-weight: 700;
}

.flask98-intro {
  margin: 0 0 16px;
  font-size: 12px;
  line-height: 1.5;
}

.flask98-section {
  margin: 0 0 22px;
}

.flask98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.flask98-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.flask98-divider {
  margin: 14px 0 16px;
  border: 0;
  border-top: 1px solid #d4d4d4;
}

.flask98-content p,
.flask98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.flask98-content p {
  margin: 0 0 10px;
}

.flask98-content ul {
  margin: 0 0 10px 18px;
  padding: 0;
}

.flask98-content li + li {
  margin-top: 4px;
}

.flask98-codebox {
  margin: 8px 0 10px;
  padding: 8px 9px;
  background: #f3f3f3;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.flask98-codebox code {
  display: block;
  white-space: pre-wrap;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  line-height: 1.4;
}

@media (max-width: 900px) {
  .flask98-main {
    grid-template-columns: 1fr;
  }

  .flask98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 640px) {
  .flask98-title {
    font-size: 13px;
    max-width: calc(100% - 72px);
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .flask98-content {
    padding: 14px 14px 18px;
  }
}
`

export default function FlaskPage(): JSX.Element {
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
    document.title = `Flask (Backend) (${activeTabLabel})`
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
      title: 'Flask (Backend)',
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
    <div className="flask98-help-page">
      <style>{flaskHelpStyles}</style>
      <div className="flask98-window" role="presentation">
        <header className="flask98-titlebar">
          <span className="flask98-title">Flask (Backend)</span>
          <div className="flask98-title-controls">
            <button
              className="flask98-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="flask98-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="flask98-tabs" role="tablist" aria-label="Flask Backend Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`flask98-tab ${activeTab === tab.id ? 'flask98-tab-active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flask98-main">
          <aside className="flask98-toc" aria-label="Table of contents">
            <h2 className="flask98-toc-title">Contents</h2>
            <ul className="flask98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id} className="flask98-toc-item">
                  <a href={`#${section.id}`} className="flask98-toc-link">
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="flask98-content">
            <h1 className="flask98-doc-title">Flask (Backend)</h1>
            <p className="flask98-intro">
              This page is a backend-focused overview of Flask as a lightweight Python web
              framework. It explains Flask's WSGI roots, route and context model, extension
              ecosystem, blueprint and app-factory patterns, operational tradeoffs, and the
              architectural discipline needed to keep Flask services maintainable as they grow.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="flask98-overview" className="flask98-section">
                  <h2 className="flask98-heading">Overview</h2>
                  {overviewSections.map((section) => (
                    <div key={section.title}>
                      <h3 className="flask98-subheading">{section.title}</h3>
                      <p>{section.body}</p>
                    </div>
                  ))}
                </section>

                <hr className="flask98-divider" />

                <section id="flask98-why" className="flask98-section">
                  <h2 className="flask98-heading">Why It Matters</h2>
                  <ul>
                    {whyItMatters.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <hr className="flask98-divider" />

                <section id="flask98-history" className="flask98-section">
                  <h2 className="flask98-heading">Historical Context</h2>
                  {historicalContext.map((item) => (
                    <div key={item.title}>
                      <h3 className="flask98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <hr className="flask98-divider" />

                <section id="flask98-themes" className="flask98-section">
                  <h2 className="flask98-heading">Big Picture Themes</h2>
                  {bigPictureThemes.map((item) => (
                    <div key={item.title}>
                      <h3 className="flask98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <hr className="flask98-divider" />

                <section id="flask98-takeaways" className="flask98-section">
                  <h2 className="flask98-heading">Key Takeaways</h2>
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
                <section id="flask98-signals" className="flask98-section">
                  <h2 className="flask98-heading">Topic Signals</h2>
                  {topicSignals.map((item) => (
                    <div key={item.title}>
                      <h3 className="flask98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="flask98-foundations" className="flask98-section">
                  <h2 className="flask98-heading">Foundations</h2>
                  {coreFoundations.map((item) => (
                    <div key={item.title}>
                      <h3 className="flask98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="flask98-features" className="flask98-section">
                  <h2 className="flask98-heading">Framework Features</h2>
                  {frameworkFeatures.map((item) => (
                    <div key={item.title}>
                      <h3 className="flask98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="flask98-runtime" className="flask98-section">
                  <h2 className="flask98-heading">Runtime and Operations</h2>
                  {runtimeAndOperations.map((item) => (
                    <div key={item.title}>
                      <h3 className="flask98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="flask98-uses" className="flask98-section">
                  <h2 className="flask98-heading">Ecosystem Uses</h2>
                  {ecosystemUses.map((item) => (
                    <div key={item.title}>
                      <h3 className="flask98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="flask98-compare" className="flask98-section">
                  <h2 className="flask98-heading">Compare and Contrast</h2>
                  {comparisons.map((item) => (
                    <div key={item.title}>
                      <h3 className="flask98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="flask98-failures" className="flask98-section">
                  <h2 className="flask98-heading">Failure Modes</h2>
                  {failureModes.map((item) => (
                    <div key={item.title}>
                      <h3 className="flask98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="flask98-checklist" className="flask98-section">
                  <h2 className="flask98-heading">Study Checklist</h2>
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
                  <section key={example.id} id={example.id} className="flask98-section">
                    <h2 className="flask98-heading">{example.title}</h2>
                    <p>
                      <strong>Area:</strong> {example.area}
                    </p>
                    <p>{example.intro}</p>
                    <p>
                      <strong>Why this example fits:</strong> {example.whyFit}
                    </p>
                    <div className="flask98-codebox">
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
              <section id="flask98-glossary" className="flask98-section">
                <h2 className="flask98-heading">Glossary</h2>
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
