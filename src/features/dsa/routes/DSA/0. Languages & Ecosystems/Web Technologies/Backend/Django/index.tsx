import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

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
    detail: 'The path() API improves URL configuration while Python 3 becomes the default target.',
  },
  {
    title: 'Async views and ASGI support (2020)',
    detail:
      'Django embraces async execution for long-lived connections without dropping its batteries-included identity.',
  },
  {
    title: 'Modern Django releases (2021+)',
    detail:
      'Long-term support releases focus on stability, security, and incremental async support.',
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
  {
    title: 'Explicit structure beats magic',
    detail: 'Settings, URLs, and apps make dependencies visible for large teams.',
  },
]

const languageFundamentals = [
  {
    title: 'Python-first ergonomics',
    detail: 'Django leans on Python readability and explicitness over DSL-heavy configuration.',
  },
  {
    title: 'Model-centric design',
    detail: 'Models are the single source of truth for data shape and business rules.',
  },
  {
    title: 'Explicit request lifecycle',
    detail: 'Middleware and views define the full path from request to response.',
  },
  {
    title: 'Security by default',
    detail: 'CSRF protection, secure cookies, and clickjacking defenses are on by default.',
  },
]

const architecturePipeline = [
  {
    stage: 'ASGI/WSGI entry',
    description: 'Requests enter through an ASGI or WSGI server.',
  },
  {
    stage: 'Middleware stack',
    description: 'Security, sessions, and auth run before views.',
  },
  {
    stage: 'URL routing',
    description: 'URLconf dispatches to function or class-based views.',
  },
  {
    stage: 'ORM and templates',
    description: 'Views fetch data and render templates or JSON.',
  },
]

const standardLibraryHighlights = [
  {
    title: 'Admin interface',
    detail: 'Auto-generated admin saves weeks of back-office tooling.',
  },
  {
    title: 'Authentication system',
    detail: 'Built-in user model, permissions, and session management.',
  },
  {
    title: 'Forms and validation',
    detail: 'Form classes centralize validation and error reporting.',
  },
  {
    title: 'Migrations framework',
    detail: 'Schema evolution is tracked and replayable across environments.',
  },
]

const coreConcepts = [
  {
    heading: 'Models and ORM',
    bullets: [
      'Models define schema with Python classes; migrations evolve databases safely.',
      'QuerySets compose filters and joins with lazy evaluation.',
      'Managers encapsulate data access patterns and reusable queries.',
      'Signals hook into create/update events for cross-cutting behavior.',
    ],
  },
  {
    heading: 'Views and routing',
    bullets: [
      'URLs map to views (function-based or class-based).',
      'Request/response objects carry headers, cookies, and data.',
      'Middleware shapes the request lifecycle, handling auth, sessions, and security.',
      'View mixins compose common CRUD logic.',
    ],
  },
  {
    heading: 'Templates and rendering',
    bullets: [
      'Template language separates presentation from data.',
      'Context processors inject global data into templates.',
      'Template inheritance encourages reusable layout structure.',
      'Template tags and filters extend rendering safely.',
    ],
  },
  {
    heading: 'Admin and auth',
    bullets: [
      'Admin auto-generates CRUD interfaces from models.',
      'Authentication and permissions ship as first-class modules.',
      'Signals and forms integrate validation with data workflows.',
      'Custom user models enable long-term flexibility.',
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
    detail: 'Settings are Python modules; split config by environment and avoid secrets in code.',
  },
  {
    title: 'Database migrations',
    detail: 'Migration files capture schema changes; apply them consistently across environments.',
  },
  {
    title: 'Security defaults',
    detail:
      'Built-in protections include CSRF, SQL injection prevention, and clickjacking defense headers.',
  },
  {
    title: 'App layering',
    detail: 'Keep domain logic in apps, and avoid business logic in templates.',
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
    detail: 'Async support exists, but many third-party packages remain sync-bound.',
  },
  {
    title: 'Database bottlenecks',
    detail: 'Most performance issues are query count or indexing problems.',
  },
]

const realWorldUses = [
  {
    context: 'Content-heavy platforms',
    detail: 'Publishing and CMS systems benefit from Django admin and strong content models.',
  },
  {
    context: 'SaaS backends',
    detail:
      'Rapid development and stable conventions make Django ideal for subscription-based services.',
  },
  {
    context: 'Internal tooling',
    detail: 'Admin tooling and form handling enable fast internal dashboards and workflows.',
  },
  {
    context: 'APIs and microservices',
    detail:
      'Django + DRF provides robust API layers with authentication, permissions, and pagination.',
  },
  {
    context: 'Marketplace platforms',
    detail: 'Relational models and admin workflows fit multi-tenant product catalogs.',
  },
  {
    context: 'Education and analytics',
    detail: 'Django handles auth, permissions, and reporting dashboards cleanly.',
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
    explanation: 'Generic views reduce boilerplate by wiring common behavior to models.',
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
    explanation: 'Middleware wraps the request pipeline to add cross-cutting behavior.',
  },
  {
    title: 'DRF serializer sketch',
    code: `from rest_framework import serializers
from .models import Article

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ["id", "title", "published_at"]`,
    explanation: 'DRF serializers define API payloads and validation rules.',
  },
  {
    title: 'Signal for audit trail',
    code: `from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=Article)
def article_audit(sender, instance, created, **kwargs):
    if created:
        AuditLog.objects.create(action="created", ref_id=instance.id)`,
    explanation: 'Signals keep cross-cutting concerns out of model methods.',
  },
]

const pitfalls = [
  'N+1 queries from lazy ORM access; use select_related or prefetch_related.',
  'Placing heavy logic in templates instead of views or services.',
  'Mixing sync-only libraries into async views.',
  'Hardcoding settings instead of using environment-specific config.',
  'Neglecting migrations leads to drift between dev and production databases.',
  'Overusing signals for core logic, making flow hard to trace.',
  'Skipping indexes on high-traffic queries.',
]

const decisionGuidance = [
  'Choose Django when you need a full-stack backend with ORM, auth, and admin built-in.',
  'Use Django for teams that value conventions and long-term maintainability.',
  'Pair Django with DRF when building APIs with authentication and permissions.',
  'Avoid Django for ultra-light microservices where minimal dependencies matter.',
  'Plan caching and async task queues early for data-heavy systems.',
  'Use Django when relational data and admin tooling are key requirements.',
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
    detail: 'Celery or RQ offload heavy jobs to worker processes, keeping requests fast.',
  },
  {
    title: 'Multi-tenant data models',
    detail:
      'Schema-per-tenant or row-level isolation requires strict query filtering and authorization.',
  },
  {
    title: 'Observability',
    detail: 'Structured logging and query tracing reveal hotspots early.',
  },
]

const takeaways = [
  'Django is a full-stack Python framework optimized for rapid, secure development.',
  'The ORM and admin reduce boilerplate while staying flexible for complex domains.',
  'Performance hinges on query optimization and caching strategy.',
  'Its conventions support large, long-lived codebases.',
  'Good architecture keeps models lean and services explicit.',
]

const toolingWorkflow = [
  {
    title: 'Development setup',
    detail: 'manage.py, settings modules, and dotenv-style config are the baseline.',
  },
  {
    title: 'Testing',
    detail: 'pytest-django and built-in test runner cover unit and integration tests.',
  },
  {
    title: 'Background jobs',
    detail: 'Celery, RQ, and cron tasks handle async work.',
  },
  {
    title: 'Debugging',
    detail: 'Django Debug Toolbar and logging help isolate slow queries.',
  },
]

const deploymentOptions = [
  {
    title: 'WSGI deployments',
    detail: 'Gunicorn or uWSGI serve traditional sync Django apps.',
  },
  {
    title: 'ASGI deployments',
    detail: 'Daphne or Uvicorn handle async views and WebSocket support.',
  },
  {
    title: 'Caching and queues',
    detail: 'Redis or Memcached support caching and background jobs.',
  },
  {
    title: 'Static assets',
    detail: 'Collectstatic plus a CDN or object storage serves static files.',
  },
]

const comparisonNotes = [
  {
    title: 'Compared to Flask',
    detail: 'Django is full-stack, Flask is lightweight and more manual.',
  },
  {
    title: 'Compared to FastAPI',
    detail: 'Django has stronger admin and ORM; FastAPI excels at async APIs.',
  },
  {
    title: 'Compared to Rails',
    detail: 'Django is Pythonic and explicit, Rails is more convention-driven.',
  },
  {
    title: 'Compared to Node.js',
    detail: 'Django offers batteries-included backend structure; Node excels in event-driven IO.',
  },
]

const learningPath = [
  {
    title: 'Core Django models',
    detail: 'Learn models, migrations, and QuerySets.',
  },
  {
    title: 'Views and templates',
    detail: 'Practice function-based and class-based views with templates.',
  },
  {
    title: 'Authentication and admin',
    detail: 'Customize user models and admin screens.',
  },
  {
    title: 'APIs and DRF',
    detail: 'Build serializers, viewsets, and permissions.',
  },
  {
    title: 'Scaling and ops',
    detail: 'Add caching, background jobs, and observability.',
  },
]

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const glossary = [
  { term: 'MTV', definition: 'Model-Template-View architecture used by Django.' },
  {
    term: 'ORM',
    definition: 'Object-relational mapper used for querying and persistence with Python models.',
  },
  {
    term: 'QuerySet',
    definition: 'Lazy database query representation supporting composition and evaluation.',
  },
  {
    term: 'Migration',
    definition: 'Versioned schema change tracked and applied across environments.',
  },
  {
    term: 'Middleware',
    definition: 'Request/response hooks for cross-cutting concerns like auth and logging.',
  },
  { term: 'CSRF', definition: 'Cross-Site Request Forgery protection built into forms and views.' },
  { term: 'DRF', definition: 'Django REST Framework for API serialization, auth, and viewsets.' },
  { term: 'ASGI', definition: 'Async server gateway interface for modern Django async execution.' },
  { term: 'WSGI', definition: 'Sync server gateway interface for traditional Django deployment.' },
  {
    term: 'select_related',
    definition: 'ORM optimization for eager loading foreign key relations in one query.',
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
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-history', label: 'Historical Context' },
    { id: 'bp-models', label: 'Mental Models' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-fundamentals', label: 'Language Fundamentals' },
    { id: 'core-lifecycle', label: 'Request Lifecycle' },
    { id: 'core-highlights', label: 'Built-in Highlights' },
    { id: 'core-components', label: 'Core Components' },
    { id: 'core-workflow', label: 'Tooling and Workflow' },
    { id: 'core-architecture', label: 'Architecture Notes' },
    { id: 'core-tradeoffs', label: 'Complexity and Tradeoffs' },
    { id: 'core-uses', label: 'Real-World Applications' },
    { id: 'core-deploy', label: 'Deployment and Ops' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-compare', label: 'Comparisons and Tradeoffs' },
    { id: 'core-when', label: 'When to Use It' },
    { id: 'core-learning', label: 'Learning Path' },
    { id: 'core-advanced', label: 'Advanced Insights' },
  ],
  examples: [{ id: 'ex-practical', label: 'Practical Examples' }],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function DjangoPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Django',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Django"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Django</h1>
      <p>
        Django bundles everything you need to build secure, data-driven web applications quickly. It
        emphasizes clear structure, built-in tooling, and robust defaults, while still letting teams
        customize architecture as projects grow.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            <p>
              Django is designed for teams that want to move fast without reinventing common backend
              layers. It includes a ORM, admin, authentication, templates, and security defaults,
              enabling production-ready systems with minimal setup.
            </p>
          </section>
          <hr className="bin98-divider" />
          <section id="bp-history" className="bin98-section">
            <h2 className="bin98-heading">Historical Context</h2>
            {historicalMilestones.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="bp-models" className="bin98-section">
            <h2 className="bin98-heading">Mental Models</h2>
            {mentalModels.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="bp-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key Takeaways</h2>
            <ul>
              {takeaways.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {activeTab === 'core-concepts' && (
        <>
          <section id="core-fundamentals" className="bin98-section">
            <h2 className="bin98-heading">Language Fundamentals</h2>
            {languageFundamentals.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-lifecycle" className="bin98-section">
            <h2 className="bin98-heading">Request Lifecycle</h2>
            <table>
              <thead>
                <tr>
                  <th>Stage</th>
                  <th>What happens</th>
                </tr>
              </thead>
              <tbody>
                {architecturePipeline.map((item) => (
                  <tr key={item.stage}>
                    <td>{item.stage}</td>
                    <td>{item.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          <section id="core-highlights" className="bin98-section">
            <h2 className="bin98-heading">Built-in Highlights</h2>
            {standardLibraryHighlights.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-components" className="bin98-section">
            <h2 className="bin98-heading">How It Works: Core Django Components</h2>
            {coreConcepts.map((block) => (
              <div key={block.heading}>
                <h3 className="bin98-subheading">{block.heading}</h3>
                <ul>
                  {block.bullets.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
          <section id="core-workflow" className="bin98-section">
            <h2 className="bin98-heading">Tooling and Workflow</h2>
            {toolingWorkflow.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-architecture" className="bin98-section">
            <h2 className="bin98-heading">How It Works: Architecture Notes</h2>
            {architectureNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-tradeoffs" className="bin98-section">
            <h2 className="bin98-heading">Complexity Analysis and Tradeoffs</h2>
            {performanceTradeoffs.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
            <p>
              Django prioritizes productivity and stability. Performance is strong for most
              workloads, but scaling requires intentional database tuning, caching layers, and
              background workers.
            </p>
          </section>
          <section id="core-uses" className="bin98-section">
            <h2 className="bin98-heading">Real-World Applications</h2>
            {realWorldUses.map((item) => (
              <p key={item.context}>
                <strong>{item.context}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-deploy" className="bin98-section">
            <h2 className="bin98-heading">Deployment and Ops</h2>
            {deploymentOptions.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-pitfalls" className="bin98-section">
            <h2 className="bin98-heading">Common Pitfalls</h2>
            <ul>
              {pitfalls.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section id="core-compare" className="bin98-section">
            <h2 className="bin98-heading">Comparisons and Tradeoffs</h2>
            {comparisonNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-when" className="bin98-section">
            <h2 className="bin98-heading">When to Use It</h2>
            <ol>
              {decisionGuidance.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>
          <section id="core-learning" className="bin98-section">
            <h2 className="bin98-heading">Learning Path</h2>
            {learningPath.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <section id="core-advanced" className="bin98-section">
            <h2 className="bin98-heading">Advanced Insights</h2>
            {advancedInsights.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
        </>
      )}

      {activeTab === 'examples' && (
        <section id="ex-practical" className="bin98-section">
          <h2 className="bin98-heading">Practical Examples</h2>
          {examples.map((example) => (
            <div key={example.title}>
              <h3 className="bin98-subheading">{example.title}</h3>
              <div className="bin98-codebox">
                <code>{example.code.trim()}</code>
              </div>
              <p>{example.explanation}</p>
            </div>
          ))}
        </section>
      )}

      {activeTab === 'glossary' && (
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {glossary.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
