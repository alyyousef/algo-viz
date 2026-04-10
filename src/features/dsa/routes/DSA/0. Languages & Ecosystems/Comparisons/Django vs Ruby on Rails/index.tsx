import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-when-django-fits', label: 'When Django Fits Better' },
    { id: 'bp-when-rails-fits', label: 'When Rails Fits Better' },
    { id: 'bp-tradeoffs', label: 'Tradeoffs' },
  ],
  'core-concepts': [
    { id: 'core-philosophy', label: 'Framework Philosophy' },
    { id: 'core-architecture', label: 'Architecture and Structure' },
    { id: 'core-database', label: 'Data Layer and ORM' },
    { id: 'core-routing', label: 'Routing and Request Flow' },
    { id: 'core-tooling', label: 'Tooling and Ecosystem' },
    { id: 'core-security', label: 'Security and Defaults' },
    { id: 'core-performance', label: 'Performance and Scaling' },
    { id: 'core-team', label: 'Team and Learning Curve' },
  ],
  examples: [
    { id: 'ex-crud', label: 'CRUD Example' },
    { id: 'ex-auth', label: 'Authentication Example' },
    { id: 'ex-reference', label: 'Decision Reference' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

const bigPictureSections = [
  {
    title: 'Overview',
    paragraphs: [
      'Django and Ruby on Rails are both batteries-included web frameworks for building server-rendered applications and APIs quickly. Each framework aims to reduce repetitive setup and steer teams toward well-known patterns for routing, data modeling, templating, and security.',
      'Django is built on Python and tends to emphasize explicit structure, reusable apps, and strong administrative tooling. Ruby on Rails is built on Ruby and emphasizes convention over configuration, cohesive defaults, and a highly streamlined path from idea to working product.',
      'Both ecosystems cover the same broad problem space: CRUD applications, dashboards, marketplaces, content systems, internal tools, and API-backed products. The real difference is usually how your team prefers to think, organize code, and leverage language ecosystems.',
    ],
  },
  {
    title: 'When Django Fits Better',
    paragraphs: [
      'Django is often a strong choice when a team already works heavily in Python, wants straightforward explicitness, or needs close alignment with data science, machine learning, scientific tooling, or backend scripting.',
      'Its built-in admin is a major advantage for back-office workflows, content operations, moderation consoles, and internal business tools. In many cases, teams can ship a useful management interface before designing a custom one.',
      'Django also appeals to teams that prefer explicit configuration, direct readability, and a modular app structure that maps cleanly to larger codebases.',
    ],
  },
  {
    title: 'When Rails Fits Better',
    paragraphs: [
      'Rails is often strongest when the goal is to move quickly with cohesive conventions and minimal decision overhead. It gives developers a very opinionated path for naming, file placement, database migrations, generators, and full-stack feature development.',
      'The framework is optimized for product iteration. A small team can move from models and migrations to views, forms, and controller actions with very little boilerplate, especially if the application follows mainstream product patterns.',
      'Rails also has a mature culture around developer happiness, polished scaffolding, and productivity-oriented defaults that make common work feel fast.',
    ],
  },
  {
    title: 'Tradeoffs',
    paragraphs: [
      'Django usually feels more explicit and decomposed; Rails usually feels more convention-driven and integrated. That difference affects onboarding, debugging style, and how teams reason about “the right way” to add new features.',
      'Python is more widely adopted outside web development, which can make hiring or cross-functional collaboration easier in some organizations. Ruby often feels more expressive for framework-oriented DSLs, but that expressiveness can also feel less obvious to developers who prefer directness over magic.',
      'In practice, both frameworks are mature, production-proven, and capable of supporting large applications. The better choice depends less on raw capability and more on team fit, ecosystem priorities, and how much convention you want the framework to impose.',
    ],
  },
]

const conceptSections = [
  {
    id: 'core-philosophy',
    title: 'Framework Philosophy',
    paragraphs: [
      'Django is commonly described as explicit and pragmatic. It offers strong defaults, but it tends to expose important concepts clearly: apps, views, URL configuration, middleware, settings, forms, and models are usually visible and separable.',
      'Rails pushes harder on convention over configuration. If you follow naming conventions and standard file locations, the framework can infer a large amount of behavior. That reduces setup cost, but it also means new developers need to understand the conventions to navigate the system confidently.',
      'This philosophical difference is usually the first major fork in the decision. Teams that prefer framework guidance often enjoy Rails. Teams that want slightly more explicit surfaces and Python semantics often prefer Django.',
    ],
  },
  {
    id: 'core-architecture',
    title: 'Architecture and Structure',
    paragraphs: [
      'Django is frequently described as MVT (Model-View-Template), though in practice it occupies much of the same territory as MVC-style frameworks. URL routing, views, templates, forms, and models are separated into clear modules, and reusable apps can be composed into a larger project.',
      'Rails follows the conventional MVC vocabulary directly. Models, controllers, views, mailers, jobs, channels, and helpers live in standardized locations that many Rails developers can navigate almost by reflex.',
      'Django often feels like a set of interoperating subsystems. Rails often feels like one integrated product surface. Neither is inherently better; they optimize for different developer instincts.',
    ],
  },
  {
    id: 'core-database',
    title: 'Data Layer and ORM',
    paragraphs: [
      'Django ORM is expressive, widely used, and tightly integrated with forms, admin, and validation workflows. It provides a high level of productivity while still making model fields and query behavior relatively explicit.',
      'Active Record in Rails is central to the framework identity. Its conventions are very strong, migrations are first-class, and the model layer often becomes the core of application development. Rails developers frequently benefit from the way models, validations, associations, and generators work together.',
      'Both ORMs support migrations, relationships, validations, and query composition. Rails often feels smoother when embracing its conventions completely. Django often feels more explicit when the team wants a clearer boundary between data model structure and surrounding application behavior.',
    ],
  },
  {
    id: 'core-routing',
    title: 'Routing and Request Flow',
    paragraphs: [
      'Django routes requests through URL configuration into function-based or class-based views. That split gives teams flexibility in how much abstraction they want per endpoint.',
      'Rails routes map to controllers and actions with RESTful conventions deeply embedded into the framework. Resource routing, controller naming, and helper generation all reinforce the standard Rails flow.',
      'If a team values straightforward URL-to-view mapping and Pythonic control flow, Django often feels natural. If a team wants a highly standardized resource lifecycle with generators and naming conventions doing more of the work, Rails often feels faster.',
    ],
  },
  {
    id: 'core-tooling',
    title: 'Tooling and Ecosystem',
    paragraphs: [
      'Django benefits from the broader Python ecosystem, which matters when the application needs to connect naturally to analytics, data processing, scripting, or scientific libraries. This can reduce friction when web features and non-web workloads need to coexist.',
      'Rails benefits from an ecosystem built specifically around Rails conventions and the Ruby community’s emphasis on elegant APIs. The gem ecosystem has long supported common product needs such as authentication, background jobs, administration, testing, and payments.',
      'The practical decision is rarely about which ecosystem is bigger in the abstract. It is about whether the adjacent tools your team already uses are easier to integrate in Python or easier to use within the Rails way of working.',
    ],
  },
  {
    id: 'core-security',
    title: 'Security and Defaults',
    paragraphs: [
      'Both frameworks ship with mature security features. Django includes strong defaults around CSRF protection, ORM-based query construction, authentication building blocks, and an admin that fits many internal workflows. Rails also provides CSRF protection, parameter handling, secure session support, and mature patterns around validations and authorization layers.',
      'Django is often praised for how much security-aware structure is present out of the box, especially for teams that want strong defaults with fewer moving parts. Rails is likewise secure in capable hands, but its ecosystem often expects teams to compose more gems and conventions depending on application style.',
      'In both cases, secure outcomes still depend on application design, authorization rules, deployment practices, and dependency hygiene. The framework helps, but it does not replace disciplined engineering.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance and Scaling',
    paragraphs: [
      'For most business applications, architecture, query behavior, caching, and infrastructure decisions matter more than framework choice. Either Django or Rails can scale well when the application is designed carefully.',
      'Django teams often benefit from Python’s interoperability with async tasks, data pipelines, and service decomposition. Rails teams often benefit from the speed of product iteration, which can matter more than micro-level request differences during early growth.',
      'If performance is the deciding factor, the correct move is usually to benchmark realistic workloads and examine database access patterns, rendering costs, and background job throughput rather than assuming one framework is categorically faster.',
    ],
  },
  {
    id: 'core-team',
    title: 'Team and Learning Curve',
    paragraphs: [
      'Django tends to be easier for teams already comfortable with Python or teams that prefer explicit code organization. Rails tends to be easier for teams willing to embrace a strong conventional path and learn the idioms deeply.',
      'A Python-heavy company may gain leverage by standardizing on Django because language reuse matters across scripts, services, automation, and data workflows. A product-focused startup with experienced Rails developers may gain more leverage by leaning into Rails productivity instead.',
      'This is often the highest-signal decision criterion: choose the framework your team can read, extend, debug, and hire for effectively over several years.',
    ],
  },
]

const examples = {
  crud: {
    title: 'CRUD Example',
    intro:
      'Both frameworks make a simple blog-style resource straightforward, but they express the work differently. Django separates model, URL, and view definitions more explicitly. Rails leans more heavily on conventional controller and route structure.',
    djangoCode: `# Django
from django.db import models
from django.urls import path
from django.views.generic import ListView

class Post(models.Model):
    title = models.CharField(max_length=200)

urlpatterns = [
    path("posts/", ListView.as_view(model=Post), name="post-list"),
]`,
    railsCode: `# Ruby on Rails
class Post < ApplicationRecord
end

Rails.application.routes.draw do
  resources :posts, only: [:index]
end

class PostsController < ApplicationController
  def index
    @posts = Post.all
  end
end`,
    notes: [
      'Django highlights reusable class-based views and explicit URL registration.',
      'Rails highlights resource routing and the default controller-action lifecycle.',
    ],
  },
  auth: {
    title: 'Authentication Example',
    intro:
      'Authentication shows a common cultural difference. Django provides a built-in auth system tightly coupled to the framework. Rails often relies on established gems such as Devise, which can be productive but introduces a more ecosystem-driven assembly process.',
    djangoCode: `# Django
from django.contrib.auth.decorators import login_required

@login_required
def dashboard(request):
    return render(request, "dashboard.html")`,
    railsCode: `# Ruby on Rails
class DashboardController < ApplicationController
  before_action :authenticate_user!

  def show
  end
end`,
    notes: [
      'Django ships core auth primitives directly in the framework.',
      'Rails commonly uses mature gems to provide polished auth workflows.',
    ],
  },
}

const decisionReference = [
  'Choose Django when Python alignment, explicit structure, built-in admin, or data-adjacent workflows matter most.',
  'Choose Rails when strong conventions, streamlined product iteration, and a cohesive opinionated stack matter most.',
  'Choose based on the team you have, not a generic framework popularity argument.',
  'Choose based on long-term maintainability, onboarding fit, and ecosystem adjacency to the rest of the company.',
]

const glossary = [
  {
    term: 'Convention over configuration',
    definition:
      'A design approach where the framework assumes standard naming and structure so developers write less setup code.',
  },
  {
    term: 'Batteries included',
    definition:
      'A framework style that ships many core features out of the box instead of requiring many external packages.',
  },
  {
    term: 'MVT',
    definition: 'Model-View-Template, a label often used for Django’s structural style.',
  },
  {
    term: 'MVC',
    definition:
      'Model-View-Controller, a common architecture label strongly associated with Rails.',
  },
  {
    term: 'ORM',
    definition:
      'Object-relational mapping, which lets application code work with database records as language-level objects.',
  },
  {
    term: 'Active Record',
    definition:
      'Rails’ ORM pattern and implementation, combining persistence and domain behavior in model classes.',
  },
  {
    term: 'Reusable app',
    definition:
      'A Django packaging pattern where related models, views, templates, and URLs are grouped as a modular unit.',
  },
  {
    term: 'Scaffolding',
    definition:
      'Generated project code that accelerates standard CRUD development, especially common in Rails workflows.',
  },
]

export default function DjangoVsRubyOnRailsPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Django vs Ruby on Rails',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Django vs Ruby on Rails"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Django vs Ruby on Rails</h1>
      <p>
        This page compares two mature, high-productivity web frameworks. The goal is not to declare
        a universal winner, but to show how Django and Ruby on Rails differ in philosophy,
        structure, tooling, and the kinds of teams that benefit most from each approach.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            {bigPictureSections[0]?.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-when-django-fits" className="bin98-section">
            <h2 className="bin98-heading">When Django Fits Better</h2>
            {bigPictureSections[1]?.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-when-rails-fits" className="bin98-section">
            <h2 className="bin98-heading">When Rails Fits Better</h2>
            {bigPictureSections[2]?.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-tradeoffs" className="bin98-section">
            <h2 className="bin98-heading">Tradeoffs</h2>
            {bigPictureSections[3]?.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p>
              The comparison includes overview, key ideas, syntax and APIs, ecosystem, architecture,
              use cases, tradeoffs, and compare-and-contrast guidance because those are the
              practical dimensions that usually decide the choice.
            </p>
          </section>
        </>
      )}

      {activeTab === 'core-concepts' && (
        <>
          {conceptSections.map((section, index) => (
            <section key={section.id} id={section.id} className="bin98-section">
              <h2 className="bin98-heading">{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {index < conceptSections.length - 1 ? <hr className="bin98-divider" /> : null}
            </section>
          ))}
        </>
      )}

      {activeTab === 'examples' && (
        <>
          <section id="ex-crud" className="bin98-section">
            <h2 className="bin98-heading">{examples.crud.title}</h2>
            <p>{examples.crud.intro}</p>
            <h3 className="bin98-subheading">Django</h3>
            <div className="bin98-codebox">
              <code>{examples.crud.djangoCode}</code>
            </div>
            <h3 className="bin98-subheading">Ruby on Rails</h3>
            <div className="bin98-codebox">
              <code>{examples.crud.railsCode}</code>
            </div>
            <ul>
              {examples.crud.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </section>
          <hr className="bin98-divider" />
          <section id="ex-auth" className="bin98-section">
            <h2 className="bin98-heading">{examples.auth.title}</h2>
            <p>{examples.auth.intro}</p>
            <h3 className="bin98-subheading">Django</h3>
            <div className="bin98-codebox">
              <code>{examples.auth.djangoCode}</code>
            </div>
            <h3 className="bin98-subheading">Ruby on Rails</h3>
            <div className="bin98-codebox">
              <code>{examples.auth.railsCode}</code>
            </div>
            <ul>
              {examples.auth.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </section>
          <hr className="bin98-divider" />
          <section id="ex-reference" className="bin98-section">
            <h2 className="bin98-heading">Decision Reference</h2>
            <p>
              Use this summary when the comparison needs to be turned into a practical framework
              choice for a real team.
            </p>
            <ul>
              {decisionReference.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </>
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
