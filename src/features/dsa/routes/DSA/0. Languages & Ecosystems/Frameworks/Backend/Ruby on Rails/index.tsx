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
  'Ruby on Rails is a web application framework built around Ruby, convention over configuration, integrated tooling, and a strong full-stack view of backend development. It is designed to let teams move quickly by providing consistent defaults for routing, models, views, controllers, database migrations, testing, background jobs, and deployment-friendly application structure.',
  'The most useful way to think about Rails is not just as an MVC framework, although MVC is part of it. Rails is a batteries-included application platform. It assumes that most web applications have common needs and tries to solve those needs with conventions, generators, naming patterns, and tightly integrated subsystems so teams can spend more time on product behavior and less time on plumbing.',
  'This page is intentionally thorough. It covers the Rails philosophy, conventions, request lifecycle, Active Record, routing, controllers, views, migrations, background jobs, testing, asset and frontend integration, deployment model, common use cases, tradeoffs, and practical examples that show how Rails applications are structured in real work.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Ruby on Rails is a high-productivity framework for building database-backed web applications. It offers a cohesive development model where routing, controllers, views, models, background jobs, mailing, caching, testing, and deployment patterns all fit into one recognizable structure.',
      'Its central value is speed through convention. Rather than asking developers to make every infrastructure decision manually, Rails establishes strong defaults for naming, file layout, database conventions, and common patterns. When those defaults match the problem well, teams can build meaningful features very quickly.',
    ],
  },
  {
    id: 'bp-why-it-matters',
    title: 'Why Rails Matters',
    paragraphs: [
      'Rails matters because it changed how web frameworks were expected to feel. It popularized the idea that a framework should generate useful structure, integrate the common pieces, and give developers a productive path from idea to working application. That influence can still be seen across many other frameworks today.',
      'It remains relevant because a large class of business applications still benefits from exactly what Rails optimizes: rapid delivery, clear conventions, database-backed domain models, and a strong default architecture for CRUD-heavy but still serious products.',
    ],
    bullets: [
      'Strong conventions reduce setup and repetitive decisions.',
      'Integrated subsystems support common web application needs.',
      'Developer productivity is a primary design goal.',
      'The framework supports full application delivery, not just routing.',
    ],
  },
  {
    id: 'bp-mental-model',
    title: 'Mental Model',
    paragraphs: [
      'The right mental model is a full application framework with a preferred way of doing most ordinary web work. A Rails app is not just a set of handlers. It is an opinionated environment where file names, class names, routes, models, controllers, database tables, and tests all follow recognizable conventions.',
      'That means Rails rewards developers who learn the idioms. Fighting the conventions usually makes the code harder to understand. Leaning into them often produces systems that are simpler to navigate and faster to extend.',
    ],
    bullets: [
      'Think convention-driven application architecture.',
      'Think integrated stack, not a bag of disconnected libraries.',
      'Think developer flow and maintainable defaults.',
    ],
  },
  {
    id: 'bp-when-it-fits',
    title: 'When Rails Fits Best',
    paragraphs: [
      'Rails fits best for product-oriented web applications, SaaS platforms, internal business systems, admin tools, marketplaces, content systems, customer portals, and CRUD-heavy backends where domain modeling, forms, authentication, database-backed workflows, and rapid iteration all matter.',
      'It is especially effective when a small or medium-sized team wants to move quickly with one coherent framework rather than assembling many independent pieces. Rails can also scale into larger systems when the architecture and operations remain disciplined.',
    ],
    bullets: [
      'Database-backed web applications with strong product iteration needs.',
      'Teams that benefit from one framework covering most backend concerns.',
      'Applications where conventions improve onboarding and development speed.',
      'Projects that value developer productivity as a first-class concern.',
    ],
  },
  {
    id: 'bp-when-it-does-not-fit',
    title: 'Where Rails Is Not the Best Default',
    paragraphs: [
      'Rails is not automatically the right answer for tiny APIs, minimal services that only need a few endpoints, extremely performance-sensitive systems where every layer of abstraction must be tightly controlled, or organizations that do not want the Rails programming model and conventions.',
      'It can also be a weaker fit when the team wants a framework with much less opinionation or when the workload is so specialized that the broad web-application defaults become unnecessary overhead.',
    ],
    bullets: [
      'Very small services that do not need a full application framework.',
      'Teams that strongly prefer low-level control over convention.',
      'Workloads dominated by specialized systems concerns rather than web-app concerns.',
      'Projects that do not benefit from the integrated Rails stack.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Key Takeaways',
    paragraphs: [
      'Rails is powerful because it turns a large amount of web-application infrastructure into a coherent, convention-driven workflow. It is not minimal, but it is intentionally productive.',
      'Its value appears most clearly when teams embrace the framework style, model their domains clearly, and let conventions remove the repetitive decisions that slow product work down.',
    ],
    bullets: [
      'Choose Rails when convention and integrated tooling help more than they constrain.',
      'Treat the framework structure as part of the architecture, not as scaffolding to ignore later.',
      'Use Rails to move quickly, but keep the domain model and operations disciplined.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-what-it-is',
    title: 'What Ruby on Rails Actually Is',
    paragraphs: [
      'Rails is a full-stack web framework for Ruby. It includes routing, controller handling, database modeling, migrations, validation, views, mailers, jobs, caching, testing, and generators in one ecosystem. Many other frameworks ask developers to assemble these concerns from separate libraries; Rails prefers to provide a coherent default path.',
      'That coherence is the real product. Rails is less about one individual subsystem and more about how all the pieces fit together with consistent naming and behavior.',
    ],
  },
  {
    id: 'core-philosophy',
    title: 'Convention Over Configuration and DRY',
    paragraphs: [
      'Rails is shaped by two well-known ideas: convention over configuration and do not repeat yourself. Convention over configuration means the framework assumes common defaults so developers do not need to restate them constantly. DRY means the system should avoid scattering the same knowledge across many places.',
      'These ideas reduce noise when used well, but they also require understanding. Developers need to know what convention the framework is assuming or the codebase starts to feel magical instead of productive.',
    ],
  },
  {
    id: 'core-application-structure',
    title: 'Application Structure and File Layout',
    paragraphs: [
      'Rails applications have a standard directory structure: models, controllers, views, jobs, mailers, initializers, configuration files, tests, database migrations, and more. This is not cosmetic. The layout is part of the frameworks contract with the developer and is one reason teams can navigate Rails codebases quickly.',
      'The structure becomes more valuable as the application grows because shared expectations reduce onboarding cost and make common changes easier to find.',
    ],
  },
  {
    id: 'core-routing',
    title: 'Routing and URL Design',
    paragraphs: [
      'The Rails router maps incoming URLs to controller actions. Resourceful routing is one of the frameworks signature ideas because many web applications revolve around resources such as users, orders, projects, invoices, and comments. Rails makes these patterns concise and conventional.',
      'Routing is not just syntax. Good routes reflect the domain model and shape the public interface of the application. Clear URL structure improves maintainability, tests, and client understanding.',
    ],
  },
  {
    id: 'core-controllers',
    title: 'Controllers and Request Lifecycle',
    paragraphs: [
      'Controllers receive requests, coordinate application behavior, and prepare responses. In a well-structured Rails app, controllers stay relatively thin and delegate domain or workflow logic to models, services, or other dedicated objects when complexity grows.',
      'The request lifecycle includes routing, parameter handling, controller execution, rendering or redirecting, and framework-managed middleware behavior around the request. Understanding that flow is important when debugging or designing cross-cutting behavior.',
    ],
  },
  {
    id: 'core-views',
    title: 'Views, Templates, and Rendering',
    paragraphs: [
      'Rails includes server-side rendering through templates and partials. This makes it comfortable for HTML-first applications, admin tools, dashboards, and interfaces where the backend still directly shapes the page structure. It also supports JSON APIs and mixed rendering styles.',
      'The practical value is flexibility. Rails can support classic server-rendered applications, API backends, or hybrid approaches without needing a completely different framework.',
    ],
  },
  {
    id: 'core-active-record',
    title: 'Active Record and the Model Layer',
    paragraphs: [
      'Active Record is the Rails ORM and one of its most influential components. It maps Ruby classes to database tables, provides associations, validations, callbacks, migrations, query building, and persistence behavior in a highly integrated way.',
      'The upside is enormous productivity for ordinary database-backed applications. The caution is that teams still need to understand SQL, indexing, transaction behavior, and query cost. ORM convenience does not replace database literacy.',
    ],
  },
  {
    id: 'core-migrations',
    title: 'Migrations and Schema Evolution',
    paragraphs: [
      'Rails migrations provide a structured way to evolve the database schema over time. Instead of manually editing a database and hoping environments stay aligned, teams describe schema changes as versioned operations that can be applied consistently.',
      'This is one of Rails most practical strengths because real applications change constantly. Good migration discipline makes those changes safer and more repeatable.',
    ],
  },
  {
    id: 'core-validations',
    title: 'Validations and Data Integrity',
    paragraphs: [
      'Rails models often include validations that enforce input rules before records are persisted. These are helpful for user feedback and application-level correctness, especially around forms and API submissions.',
      'Validations are valuable, but they should not be confused with complete integrity guarantees. Important constraints still belong in the database when the business requires them.',
    ],
  },
  {
    id: 'core-associations',
    title: 'Associations and Domain Modeling',
    paragraphs: [
      'Rails provides expressive associations such as belongs_to, has_many, and has_one. These allow developers to model relationships naturally and navigate data with concise code.',
      'Associations improve readability, but they can also hide expensive queries if used carelessly. Strong Rails engineering means understanding when eager loading, query shaping, or explicit joins are needed.',
    ],
  },
  {
    id: 'core-background-jobs',
    title: 'Background Jobs and Async Work',
    paragraphs: [
      'Rails supports background jobs through Active Job and adapters for job backends. This lets applications move email sending, webhook handling, report generation, and other slow tasks out of the request-response path.',
      'The key design point is separating user-facing latency from deferred work. Jobs should be idempotent, observable, and failure-aware rather than treated as magical side channels.',
    ],
  },
  {
    id: 'core-caching',
    title: 'Caching and Performance Support',
    paragraphs: [
      'Rails includes caching primitives for views, fragments, low-level data, and request-adjacent optimizations. This is useful because many web applications need practical caching long before they need exotic architecture changes.',
      'Caching should still be intentional. The real goal is to reduce unnecessary work without making freshness and invalidation behavior impossible to reason about.',
    ],
  },
  {
    id: 'core-testing',
    title: 'Testing Culture and Built-In Support',
    paragraphs: [
      'Rails strongly encourages testing and includes built-in support for model, controller, integration, system, and other test types. The frameworks integrated structure makes it easier to test applications consistently than in environments where every layer uses different conventions and tools.',
      'A good Rails test strategy balances speed and confidence. Not every behavior needs a full browser system test, and not every business rule belongs only in isolated model tests.',
    ],
  },
  {
    id: 'core-security',
    title: 'Security Defaults and Web Safety',
    paragraphs: [
      'Rails includes protective defaults around common web concerns such as CSRF, parameter handling, escaping, and secure-by-default patterns for many ordinary cases. That is one reason it remains strong for serious web application development.',
      'Security still requires engineering judgment. The framework can help, but authentication, authorization, secret handling, session design, and business-specific security rules still need deliberate implementation.',
    ],
  },
  {
    id: 'core-generators',
    title: 'Generators and Developer Workflow',
    paragraphs: [
      'Rails generators can create controllers, models, migrations, mailers, jobs, and scaffolding for common patterns. This supports the framework goal of moving developers from idea to working structure quickly.',
      'Generators are most useful when they create maintainable starting points, not when they generate code the team never understands. Mature teams often customize or selectively use generators while preserving the productive workflow.',
    ],
  },
  {
    id: 'core-operations',
    title: 'Operations and Deployment Model',
    paragraphs: [
      'Rails applications run as long-lived web services and need the usual production disciplines: process management, logging, health visibility, background job monitoring, database performance attention, caching strategy, and deployment rollback safety. The framework helps with application structure, but it does not remove operational responsibility.',
      'In production, Rails quality is usually shaped by database design, queue health, query efficiency, and deployment hygiene more than by the elegance of controller code.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance Mindset',
    paragraphs: [
      'Rails performance work often centers on query shaping, N plus 1 avoidance, caching, background job separation, view efficiency, and reducing unnecessary object work in hot paths. Many performance issues come from abstraction misuse rather than from Ruby itself in the abstract.',
      'The strong habit is measurement. Profile requests, inspect SQL, understand memory behavior, and optimize the actual bottleneck rather than repeating framework folklore.',
    ],
    bullets: [
      'Watch SQL behavior as closely as controller behavior.',
      'Treat eager loading and query shape as core backend tools.',
      'Use caching and jobs to keep request latency focused.',
      'Prefer empirical profiling over assumptions.',
    ],
  },
  {
    id: 'core-use-cases',
    title: 'Common Real-World Uses',
    paragraphs: [
      'Rails is widely used for SaaS products, marketplaces, internal admin systems, customer portals, content and publishing systems, community platforms, ecommerce-adjacent tools, and many operationally conventional web businesses that need to iterate quickly.',
      'Its enduring strength is that a lot of valuable software still looks like forms, workflows, domain models, reports, notifications, and user-facing web pages. Rails is built for that reality.',
    ],
  },
  {
    id: 'core-not-fit',
    title: 'When Not to Use Rails',
    paragraphs: [
      'Rails is a weaker fit when the workload is extremely small, when a minimal API framework is enough, when the team wants fine-grained control with less framework convention, or when the surrounding stack is not Ruby-oriented enough for the ecosystem advantage to matter.',
      'It is also a poor fit when teams keep fighting the frameworks structure instead of using it. If the conventions are always seen as obstacles, the application may want a different platform.',
    ],
  },
  {
    id: 'core-pitfalls',
    title: 'Common Pitfalls',
    paragraphs: [
      'Common Rails mistakes include fat controllers, overgrown models with too many responsibilities, hidden query inefficiencies through associations, callback overuse, weak database indexing, and assuming Active Record abstractions automatically imply good performance or correct integrity.',
      'Another recurring issue is productivity debt: teams move fast at first but do not keep domain boundaries and service structure clear, which turns the codebase into a tangle later.',
    ],
    bullets: [
      'Do not hide business complexity inside callbacks when explicit flows are clearer.',
      'Do not assume ORM convenience removes the need for SQL awareness.',
      'Do not let every responsibility accumulate in one model class.',
      'Do not confuse rapid scaffolding with finished architecture.',
    ],
  },
  {
    id: 'core-compare',
    title: 'Rails Compared with Other Backend Frameworks',
    paragraphs: [
      'Compared with lighter frameworks such as Express or Flask, Rails is more opinionated and more integrated. Compared with Spring Boot, it offers similar full-application ambition but with a very different language, ecosystem, and style of convention. Compared with Django, it shares some full-stack strengths but has its own idioms and ecosystem culture.',
      'The right comparison is not just speed of the first tutorial. It is how well the framework fits the teams language, product workflow, operational needs, and appetite for convention-driven structure.',
    ],
  },
  {
    id: 'core-decision',
    title: 'Decision Checklist',
    paragraphs: [
      'Choose Rails when the application is a product-facing web system that benefits from strong conventions, integrated tooling, and database-backed domain modeling. Choose something smaller when the project is too minimal to need a full application platform.',
      'The best Rails decisions usually happen when the team values developer flow, coherent defaults, and long-term maintainability within the Rails style rather than despite it.',
    ],
    bullets: [
      'Need fast product iteration on a database-backed web app: strong Rails signal.',
      'Need one framework to cover many common backend concerns: strong Rails signal.',
      'Need minimal abstraction and lower framework surface area: weak Rails signal.',
      'Need a Ruby-centric, convention-driven team workflow: strong Rails signal.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-route',
    title: 'Resourceful Routing',
    description: [
      'Rails resourceful routing is one of the clearest examples of convention over configuration. A concise route declaration expands into a conventional set of actions for a resource.',
      'This gives teams a stable structure for many ordinary web application workflows.',
    ],
    code: `Rails.application.routes.draw do
  resources :projects
  resources :invoices, only: [:index, :show, :create]
end`,
    notes: [
      'Resourceful routes make controller and URL structure more predictable.',
      'Use explicit limits when a resource should not expose every default action.',
    ],
  },
  {
    id: 'examples-model',
    title: 'Active Record Model with Validation and Association',
    description: [
      'This example shows a typical model with an association and validations. Active Record keeps common persistence behavior close to the domain model.',
      'The convenience is real, but teams still need clear model boundaries as the domain grows.',
    ],
    code: `class Invoice < ApplicationRecord
  belongs_to :account

  validates :total_cents, numericality: { greater_than_or_equal_to: 0 }
  validates :status, presence: true
end`,
    notes: [
      'Model validations improve application-level correctness.',
      'Associations should be paired with attention to query behavior and indexing.',
    ],
  },
  {
    id: 'examples-controller',
    title: 'Controller Action with Strong Parameters',
    description: [
      'Rails controllers commonly use strong parameters to control which request fields are permitted. This keeps mass assignment behavior explicit.',
      'The controller should coordinate request flow, while domain rules remain elsewhere when they grow complex.',
    ],
    code: `class ProjectsController < ApplicationController
  def create
    project = Project.new(project_params)

    if project.save
      redirect_to project
    else
      render :new, status: :unprocessable_entity
    end
  end

  private

  def project_params
    params.require(:project).permit(:name, :owner_id, :deadline)
  end
end`,
    notes: [
      'Strong parameters are part of the request-boundary safety model.',
      'Controllers should remain readable and not absorb all business logic.',
    ],
  },
  {
    id: 'examples-migration',
    title: 'Database Migration',
    description: [
      'Migrations give Rails applications a versioned way to evolve schema safely across environments. This is one of the foundations of maintainable product iteration.',
      'Schema change discipline matters as much as controller and model code in real systems.',
    ],
    code: `class CreateSubscriptions < ActiveRecord::Migration[7.1]
  def change
    create_table :subscriptions do |t|
      t.references :account, null: false, foreign_key: true
      t.string :plan, null: false
      t.datetime :renews_at, null: false

      t.timestamps
    end
  end
end`,
    notes: [
      'Migrations keep schema evolution explicit and reviewable.',
      'Database constraints still matter alongside model-level validations.',
    ],
  },
  {
    id: 'examples-job',
    title: 'Background Job',
    description: [
      'Active Job provides a framework-friendly interface for deferred work such as email, report generation, and webhook processing.',
      'Moving slow or retry-prone work out of the request path improves user-facing responsiveness.',
    ],
    code: `class InvoiceReminderJob < ApplicationJob
  queue_as :default

  def perform(invoice_id)
    invoice = Invoice.find(invoice_id)
    ReminderMailer.invoice_due(invoice).deliver_now
  end
end`,
    notes: [
      'Jobs should be safe to retry and observable in production.',
      'Asynchronous work is part of application design, not an afterthought.',
    ],
  },
  {
    id: 'examples-test',
    title: 'Model Test',
    description: [
      'Rails encourages testing at several layers. This example focuses on one small model rule so the test remains clear and cheap.',
      'Tests are strongest when they prove behavior directly instead of reproducing framework internals.',
    ],
    code: `require "test_helper"

class InvoiceTest < ActiveSupport::TestCase
  test "is invalid without a status" do
    invoice = Invoice.new(total_cents: 5000)

    assert_not invoice.valid?
    assert_includes invoice.errors[:status], "can't be blank"
  end
end`,
    notes: [
      'Keep tests focused on one behavior when possible.',
      'Use higher-level tests when interaction across layers actually matters.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-core',
    title: 'Core Rails Terms',
    terms: [
      {
        term: 'Convention Over Configuration',
        definition:
          'The Rails principle that sensible defaults should remove the need to specify common behavior repeatedly.',
      },
      {
        term: 'Active Record',
        definition:
          'The Rails ORM and model layer for mapping Ruby objects to database tables and queries.',
      },
      {
        term: 'Scaffold',
        definition:
          'Generated starter code for a common resource pattern including model, controller, views, and related files.',
      },
      {
        term: 'Migration',
        definition:
          'A versioned schema change definition used to evolve the database structure over time.',
      },
      {
        term: 'Resourceful Route',
        definition:
          'A Rails route definition that maps a resource name to conventional REST-style controller actions.',
      },
    ],
  },
  {
    id: 'glossary-web',
    title: 'Web Application Terms',
    terms: [
      {
        term: 'Controller',
        definition:
          'The Rails component that receives requests, coordinates behavior, and returns rendered or redirected responses.',
      },
      {
        term: 'View',
        definition:
          'A template or rendering layer used to generate HTML or other response output.',
      },
      {
        term: 'Strong Parameters',
        definition:
          'A Rails mechanism for explicitly allowing safe request attributes during mass assignment.',
      },
      {
        term: 'Partial',
        definition:
          'A reusable view fragment rendered inside other templates.',
      },
      {
        term: 'Callback',
        definition:
          'A hook that runs before, after, or around model lifecycle events or other framework actions.',
      },
    ],
  },
  {
    id: 'glossary-operations',
    title: 'Operations and Workflow Terms',
    terms: [
      {
        term: 'Active Job',
        definition:
          'The Rails abstraction for background jobs that can run through different queue backends.',
      },
      {
        term: 'Eager Loading',
        definition:
          'A query technique used to load associated records up front and reduce N plus 1 query problems.',
      },
      {
        term: 'Environment',
        definition:
          'A Rails runtime mode such as development, test, or production with different settings and behavior.',
      },
      {
        term: 'Initializer',
        definition:
          'A startup configuration file used to customize framework or application behavior during boot.',
      },
      {
        term: 'N plus 1 Query',
        definition:
          'A performance problem where one query loads parent records and many additional queries load related records individually.',
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

export default function RubyOnRailsPage(): JSX.Element {
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
    document.title = `Ruby on Rails (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Ruby on Rails',
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
          <span className="postgres-help-titletext">Ruby on Rails</span>
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
            <h1 className="postgres-help-doc-title">Ruby on Rails</h1>
            <p className="postgres-help-doc-subtitle">
              Full-stack backend framework reference covering conventions, MVC,
              Active Record, routing, testing, operations, and deployment tradeoffs.
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
