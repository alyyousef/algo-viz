import { Link } from 'react-router-dom'

import type { JSX } from 'react'

const win95Styles = `
.win95-page {
  min-height: 100vh;
  background: #C0C0C0;
  padding: 0;
  color: #000;
  font-family: 'MS Sans Serif', 'Tahoma', sans-serif;
  -webkit-font-smoothing: none;
}

.win95-page * {
  box-sizing: border-box;
}

.win95-page a {
  color: #000;
  text-decoration: none;
}

.win95-page a:hover {
  text-decoration: underline;
}

.win95-window {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  background: #C0C0C0;
  box-shadow: none;
  border-radius: 0;
}

.win95-titlebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #000080;
  color: #fff;
  padding: 4px 6px;
  font-weight: 700;
  font-size: 13px;
  line-height: 1;
}

.win95-title {
  display: inline-block;
}

.win95-title-controls {
  display: flex;
  gap: 4px;
}

.win95-control {
  width: 22px;
  height: 20px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  border-radius: 0;
  font-weight: 700;
  font-size: 12px;
  line-height: 1;
  padding: 0;
  cursor: pointer;
}

.win95-control:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-control:focus,
.win95-button:focus {
  outline: 1px dotted #000;
  outline-offset: -3px;
}

.win95-content {
  padding: 10px;
}

.win95-header-row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: flex-start;
  margin-bottom: 8px;
}

.win95-button {
  padding: 3px 10px 2px;
  background: #C0C0C0;
  border: 2px solid;
  border-color: #fff #404040 #404040 #fff;
  border-radius: 0;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  line-height: 1.2;
}

.win95-button:active {
  border-color: #404040 #fff #fff #404040;
}

.win95-fieldset {
  border: 2px solid;
  border-color: #808080 #404040 #404040 #808080;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 0;
  background: #C0C0C0;
}

.win95-fieldset legend {
  padding: 0 6px;
  font-weight: 700;
  font-size: 12px;
}

.win95-grid {
  display: grid;
  gap: 6px;
}

.win95-grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.win95-grid-3 {
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
}

.win95-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 8px;
}

.win95-panel {
  border: 2px solid;
  border-color: #808080 #fff #fff #808080;
  background: #C0C0C0;
  padding: 8px;
  border-radius: 0;
}

.win95-panel--raised {
  border-color: #fff #404040 #404040 #fff;
}

.win95-heading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 4px;
}

.win95-subheading {
  font-weight: 700;
  font-size: 12px;
  margin: 0 0 6px;
}

.win95-text {
  font-size: 12px;
  line-height: 1.35;
  margin: 0 0 6px;
}

.win95-stack {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.win95-list {
  margin: 0;
  padding-left: 18px;
  font-size: 12px;
  line-height: 1.35;
}

.win95-list li {
  margin-bottom: 4px;
}

.win95-list--numbered {
  list-style: decimal;
}

.win95-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.win95-table th,
.win95-table td {
  border: 1px solid #808080;
  padding: 6px 6px 4px;
  text-align: left;
}

.win95-table th {
  font-weight: 700;
}

.win95-code {
  margin: 6px 0;
  background: #C0C0C0;
  color: #000;
  padding: 8px;
  font-family: 'Courier New', monospace;
  font-size: 11px;
  border: 2px solid;
  border-color: #404040 #fff #fff #404040;
  overflow-x: auto;
  border-radius: 0;
}
`

const historicalMilestones = [
  {
    title: 'Django emerges from newsroom tooling (2003)',
    detail:
      'Built to power fast-moving news sites, Django emphasizes rapid development with clean, pragmatic design.',
  },
  {
    title: 'Django 1.0 formal release (2008)',
    detail:
      'The framework stabilizes APIs for ORM, admin, and routing, becoming a mainstream Python backend choice.',
  },
  {
    title: 'Django 2.0 modernizes routing (2017)',
    detail:
      'The path() API improves URL configuration while Python 3 becomes the default target.',
  },
  {
    title: 'Async views and ASGI support (2020)',
    detail:
      'Django embraces async execution for long-lived connections without dropping its batteries-included identity.',
  },
]

const mentalModels = [
  {
    title: 'Batteries included framework',
    detail:
      'Django ships with ORM, admin, templating, auth, and security, minimizing glue code across the stack.',
  },
  {
    title: 'Project vs app boundaries',
    detail:
      'Projects wire settings and URLs; apps encapsulate reusable functionality and domain logic.',
  },
  {
    title: 'Convention over configuration',
    detail:
      'Django leans on sensible defaults to speed delivery, while still allowing deep customization.',
  },
]

const coreConcepts = [
  {
    heading: 'Models and ORM',
    bullets: [
      'Models define schema with Python classes; migrations evolve databases safely.',
      'QuerySets compose filters and joins with lazy evaluation.',
      'Managers encapsulate data access patterns and reusable queries.',
    ],
  },
  {
    heading: 'Views and routing',
    bullets: [
      'URLs map to views (function-based or class-based).',
      'Request/response objects carry headers, cookies, and data.',
      'Middleware shapes the request lifecycle, handling auth, sessions, and security.',
    ],
  },
  {
    heading: 'Templates and rendering',
    bullets: [
      'Template language separates presentation from data.',
      'Context processors inject global data into templates.',
      'Template inheritance encourages reusable layout structure.',
    ],
  },
  {
    heading: 'Admin and auth',
    bullets: [
      'Admin auto-generates CRUD interfaces from models.',
      'Authentication and permissions ship as first-class modules.',
      'Signals and forms integrate validation with data workflows.',
    ],
  },
]

const architectureNotes = [
  {
    title: 'MTV architecture',
    detail:
      'Django uses Model-Template-View, similar to MVC but with templates instead of controllers.',
  },
  {
    title: 'Settings and environment',
    detail:
      'Settings are Python modules; split config by environment and avoid secrets in code.',
  },
  {
    title: 'Database migrations',
    detail:
      'Migration files capture schema changes; apply them consistently across environments.',
  },
  {
    title: 'Security defaults',
    detail:
      'Built-in protections include CSRF, SQL injection prevention, and clickjacking defense headers.',
  },
]

const performanceTradeoffs = [
  {
    title: 'ORM convenience vs raw SQL',
    detail:
      'ORM speeds development, but complex queries may need optimization or raw SQL for performance.',
  },
  {
    title: 'Monolith scalability',
    detail:
      'Django favors monolithic apps; scaling often means caching, async tasks, and careful decomposition.',
  },
  {
    title: 'Template rendering cost',
    detail:
      'Server-rendered templates are fast for initial loads but can be slower for data-heavy pages.',
  },
  {
    title: 'Async limitations',
    detail:
      'Async support exists, but many third-party packages remain sync-bound.',
  },
]

const realWorldUses = [
  {
    context: 'Content-heavy platforms',
    detail:
      'Publishing and CMS systems benefit from Django admin and strong content models.',
  },
  {
    context: 'SaaS backends',
    detail:
      'Rapid development and stable conventions make Django ideal for subscription-based services.',
  },
  {
    context: 'Internal tooling',
    detail:
      'Admin tooling and form handling enable fast internal dashboards and workflows.',
  },
  {
    context: 'APIs and microservices',
    detail:
      'Django + DRF provides robust API layers with authentication, permissions, and pagination.',
  },
]

const examples = [
  {
    title: 'Model with query patterns',
    code: `from django.db import models

class Article(models.Model):
    title = models.CharField(max_length=200)
    published_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        indexes = [models.Index(fields=["published_at"])]

# Usage
recent = Article.objects.filter(published_at__isnull=False).order_by("-published_at")`,
    explanation:
      'Models describe schema and queries. Indexes improve ordering and filtering performance.',
  },
  {
    title: 'Class-based view',
    code: `from django.views.generic import DetailView
from .models import Article

class ArticleDetail(DetailView):
    model = Article
    template_name = "articles/detail.html"`,
    explanation:
      'Generic views reduce boilerplate by wiring common behavior to models.',
  },
  {
    title: 'Middleware for request timing',
    code: `import time

class TimingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        start = time.time()
        response = self.get_response(request)
        response["X-Render-Time"] = f"{time.time() - start:.3f}s"
        return response`,
    explanation:
      'Middleware wraps the request pipeline to add cross-cutting behavior.',
  },
]

const pitfalls = [
  'N+1 queries from lazy ORM access; use select_related or prefetch_related.',
  'Placing heavy logic in templates instead of views or services.',
  'Mixing sync-only libraries into async views.',
  'Hardcoding settings instead of using environment-specific config.',
  'Neglecting migrations leads to drift between dev and production databases.',
]

const decisionGuidance = [
  'Choose Django when you need a full-stack backend with ORM, auth, and admin built-in.',
  'Use Django for teams that value conventions and long-term maintainability.',
  'Pair Django with DRF when building APIs with authentication and permissions.',
  'Avoid Django for ultra-light microservices where minimal dependencies matter.',
  'Plan caching and async task queues early for data-heavy systems.',
]

const advancedInsights = [
  {
    title: 'Service layer patterns',
    detail:
      'Complex domain logic benefits from service modules instead of bloated models or views.',
  },
  {
    title: 'Query optimization',
    detail:
      'Use select_related, prefetch_related, and annotate to avoid N+1 issues and reduce DB load.',
  },
  {
    title: 'Async task queues',
    detail:
      'Celery or RQ offload heavy jobs to worker processes, keeping requests fast.',
  },
  {
    title: 'Multi-tenant data models',
    detail:
      'Schema-per-tenant or row-level isolation requires strict query filtering and authorization.',
  },
]

const takeaways = [
  'Django is a full-stack Python framework optimized for rapid, secure development.',
  'The ORM and admin reduce boilerplate while staying flexible for complex domains.',
  'Performance hinges on query optimization and caching strategy.',
  'Its conventions support large, long-lived codebases.',
]

export default function DjangoPage(): JSX.Element {
  return (
    <div className="win95-page">
      <style>{win95Styles}</style>
      <div className="win95-window" role="presentation">
        <header className="win95-titlebar">
          <span className="win95-title">Django</span>
          <div className="win95-title-controls">
            <Link to="/algoViz" className="win95-control" aria-label="Close window">X</Link>
          </div>
        </header>
        <div className="win95-content">
          <div className="win95-header-row">
            <div>
              <div className="win95-subheading">A batteries-included Python web framework for full-stack backends</div>
              <p className="win95-text">
                Django bundles everything you need to build secure, data-driven web applications quickly. It emphasizes clear
                structure, built-in tooling, and robust defaults, while still letting teams customize architecture as projects grow.
              </p>
            </div>
            <Link to="/algoViz" className="win95-button" role="button">
              BACK TO CATALOG
            </Link>
          </div>

          <fieldset className="win95-fieldset">
            <legend>The big picture</legend>
            <div className="win95-panel">
              <p className="win95-text">
                Django is designed for teams that want to move fast without reinventing common backend layers. It includes a
                ORM, admin, authentication, templates, and security defaults, enabling production-ready systems with minimal setup.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Historical context</legend>
            <div className="win95-grid win95-grid-2">
              {historicalMilestones.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Core concept and mental models</legend>
            <div className="win95-grid win95-grid-2">
              {mentalModels.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works: core Django components</legend>
            <div className="win95-grid win95-grid-2">
              {coreConcepts.map((block) => (
                <div key={block.heading} className="win95-panel">
                  <div className="win95-heading">{block.heading}</div>
                  <ul className="win95-list">
                    {block.bullets.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>How it works: architecture notes</legend>
            <div className="win95-grid win95-grid-2">
              {architectureNotes.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Complexity analysis and tradeoffs</legend>
            <div className="win95-grid win95-grid-2">
              {performanceTradeoffs.map((note) => (
                <div key={note.title} className="win95-panel">
                  <div className="win95-heading">{note.title}</div>
                  <p className="win95-text">{note.detail}</p>
                </div>
              ))}
            </div>
            <div className="win95-panel win95-panel--raised">
              <p className="win95-text">
                Django prioritizes productivity and stability. Performance is strong for most workloads, but scaling requires
                intentional database tuning, caching layers, and background workers.
              </p>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Real-world applications</legend>
            <div className="win95-grid win95-grid-2">
              {realWorldUses.map((item) => (
                <div key={item.context} className="win95-panel">
                  <div className="win95-heading">{item.context}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Practical examples</legend>
            <div className="win95-stack">
              {examples.map((example) => (
                <div key={example.title} className="win95-panel">
                  <div className="win95-heading">{example.title}</div>
                  <pre className="win95-code">
                    <code>{example.code}</code>
                  </pre>
                  <p className="win95-text">{example.explanation}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Common pitfalls</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {pitfalls.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>When to use it</legend>
            <div className="win95-panel">
              <ol className="win95-list win95-list--numbered">
                {decisionGuidance.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Advanced insights</legend>
            <div className="win95-grid win95-grid-2">
              {advancedInsights.map((item) => (
                <div key={item.title} className="win95-panel">
                  <div className="win95-heading">{item.title}</div>
                  <p className="win95-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="win95-fieldset">
            <legend>Key takeaways</legend>
            <div className="win95-panel">
              <ul className="win95-list">
                {takeaways.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  )
}
