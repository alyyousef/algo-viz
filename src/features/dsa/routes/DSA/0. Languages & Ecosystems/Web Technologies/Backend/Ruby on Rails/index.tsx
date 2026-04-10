import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const overviewSections = [
  {
    title: 'What Ruby on Rails is',
    body: 'Ruby on Rails is a full-stack web application framework for Ruby built around convention over configuration, MVC structure, integrated tooling, and rapid product development. It includes routing, controllers, models, migrations, templating, background jobs, mailers, websockets, testing support, and a broad set of conventions that shape how applications are built.',
  },
  {
    title: 'Why Rails matters',
    body: 'Rails matters because it became one of the defining frameworks of modern web development by demonstrating how powerful conventions and scaffolding could dramatically increase developer productivity. It shaped how many engineers think about rapid product development, CRUD workflows, integrated application tooling, and convention-driven architecture.',
  },
  {
    title: 'How to think about it',
    body: 'The useful mental model is that Rails is an opinionated product-development platform, not only a request router. It offers a fairly complete story for routing, controllers, models, views, jobs, mail, caching, realtime features, and deployment workflows. Its strength comes from giving teams a coherent default way to build applications quickly.',
  },
  {
    title: 'Where it fits best',
    body: 'Rails fits best for product-oriented web applications, SaaS platforms, dashboards, internal tools, CRUD-heavy systems, and teams that want to move quickly with a mature convention-based framework. It is especially strong when product velocity, integrated application features, and readable conventions matter more than low-level infrastructure control.',
  },
]

const whyItMatters = [
  'It popularized convention over configuration in mainstream web development.',
  'It provided one of the most influential examples of integrated full-stack developer productivity.',
  'It made rapid product iteration practical through coherent framework defaults and generators.',
  'It still serves as a reference point when comparing opinionated web application frameworks.',
  'It helped define how many teams think about MVC, migrations, scaffolding, and product engineering workflows.',
]

const historicalContext = [
  {
    title: 'Rails changed expectations for web development speed',
    detail:
      'When Rails gained attention, it showed that a framework with strong conventions could make building full applications dramatically faster than many developers were used to. This altered expectations around scaffolding, defaults, and how much repetitive work a framework should remove.',
  },
  {
    title: 'Convention over configuration became a signature idea',
    detail:
      'Rails argued that the framework should assume common choices so developers could spend less time wiring basics together. That philosophy became deeply influential even beyond the Ruby ecosystem.',
  },
  {
    title: 'The integrated stack was part of the appeal',
    detail:
      'Rails did not only provide routing or templating. It offered a coherent environment for database migrations, Active Record, controllers, views, tests, background jobs, and later websockets and other platform features. This integrated model made it especially attractive for startup and product teams.',
  },
  {
    title: 'Its influence extends beyond Ruby',
    detail:
      'Many later frameworks in other languages adopted ideas that Rails helped popularize: generators, migrations, convention-heavy structure, scaffolding, and rich first-party tooling. Even teams that do not use Ruby often inherit conceptual patterns that Rails normalized.',
  },
]

const bigPictureThemes = [
  {
    title: 'Convention is the core productivity engine',
    body: 'Rails is strongest when teams let its conventions reduce decision overhead. Consistent file structure, naming rules, migration patterns, controller design, and model assumptions help developers move quickly because much of the basic wiring is already socially and technically standardized.',
  },
  {
    title: 'Rails is product-oriented, not just transport-oriented',
    body: 'Rails is not merely an HTTP handling layer. It is a framework designed around the needs of shipping user-facing applications with forms, persistence, background work, emails, admin flows, and iterative product features. That makes it feel broader than a thin API framework.',
  },
  {
    title: 'Integrated tooling shapes application design',
    body: 'Because Rails has strong answers for migrations, Active Record, background jobs, Action Mailer, caching, and more, teams often design systems differently than they would in a thinner stack. The lower coordination cost of these features influences architecture choices.',
  },
  {
    title: 'Speed can hide complexity if boundaries stay weak',
    body: 'Rails can make feature development extremely fast, but speed can also hide accumulation of implicit coupling, callback-heavy behavior, and model bloat if teams do not maintain clear service boundaries and operational discipline as the application grows.',
  },
]

const keyTakeaways = [
  'Ruby on Rails is an opinionated full-stack framework centered on convention, productivity, and integrated tooling.',
  'Its main strength is helping teams build product features quickly with a coherent default architecture.',
  'It is especially strong for CRUD-heavy applications, SaaS platforms, and team-standardized web development.',
  'Its defaults are most helpful when teams use them coherently instead of mixing many competing styles.',
  'As Rails applications scale, query discipline, boundary clarity, and operational visibility become essential.',
]

const topicSignals = [
  {
    title: 'Choose Rails when product velocity is central',
    body: 'If the team needs to ship web application features quickly and wants a framework that already has answers for many common product concerns, Rails is a strong candidate.',
  },
  {
    title: 'Choose Rails when convention is an advantage',
    body: 'Teams that value standard structure, readable defaults, and lower setup friction often benefit from Rails because it reduces the amount of architectural debate required for common cases.',
  },
  {
    title: 'Choose Rails when full-stack application features matter',
    body: 'If the application includes server-rendered pages, forms, background jobs, emails, dashboards, and CRUD workflows under one roof, Rails often provides a very productive environment.',
  },
  {
    title: 'Avoid assuming framework speed replaces system design',
    body: 'Rails helps teams move quickly, but scaling a codebase still requires careful thinking about service boundaries, persistence patterns, callbacks, jobs, caching, and operational clarity. Productivity does not remove architectural responsibility.',
  },
]

const coreFoundations = [
  {
    title: 'MVC structure',
    body: 'Rails organizes applications around models, views, and controllers. This does not solve every architecture problem automatically, but it does provide a familiar baseline for structuring request handling, persistence, and rendering concerns.',
  },
  {
    title: 'Active Record and migrations',
    body: 'Active Record gives Rails a highly productive ORM model with associations, validations, scopes, and conventions for mapping Ruby classes to database tables. Migrations make schema evolution part of the normal application workflow rather than a separate operational discipline.',
  },
  {
    title: 'Routing and controller actions',
    body: 'Requests move through the router into controller actions, where request handling, parameter access, response rendering, redirects, and integration with models or services take place. This is one of the most visible Rails conventions in daily development.',
  },
  {
    title: 'Views, templates, and full-stack rendering',
    body: 'Rails has long been comfortable with server-rendered HTML and form-heavy product interfaces. Even when used as an API backend, it still carries a strong full-stack application heritage that affects how its tooling and conventions are shaped.',
  },
  {
    title: 'Background jobs and integrated platform features',
    body: 'Jobs, mailers, websockets, caching, and other features are not awkward afterthoughts in Rails. They are part of the normal ecosystem and one of the reasons the framework feels like a broad product platform rather than only a request layer.',
  },
]

const frameworkFeatures = [
  {
    title: 'Convention-heavy project structure',
    body: 'Rails applications tend to look familiar across projects because the framework strongly shapes directory layout, naming, model and controller expectations, and common file roles. This consistency is one of the main reasons teams can move quickly between Rails codebases.',
  },
  {
    title: 'Generators and scaffolding',
    body: 'Rails generators and scaffolding tools reduce the cost of creating the baseline code for models, controllers, migrations, and tests. This accelerates development, especially in CRUD-heavy systems, though generated code still needs thoughtful refinement.',
  },
  {
    title: 'Integrated support for common web concerns',
    body: 'Validations, sessions, cookies, background jobs, emails, caching, and websocket-oriented features all fit naturally into the framework. This helps teams avoid assembling many unrelated libraries before they can build real product functionality.',
  },
  {
    title: 'Strong testing and development workflow',
    body: 'Rails has a long tradition of built-in support for tests, local development conventions, environment management, and migration-driven workflows. This contributes to its reputation as a productive application-development platform.',
  },
  {
    title: 'Action Cable and modern interactive patterns',
    body: 'Rails supports realtime features through Action Cable and can integrate with modern server-driven or hybrid frontend approaches. This broadens the framework beyond classic page rendering while keeping it inside a familiar application model.',
  },
]

const runtimeAndOperations = [
  {
    title: 'Ruby runtime and application-server behavior',
    body: 'Rails applications run inside Ruby application-server environments and are affected by interpreter performance, app-server configuration, request concurrency choices, and deployment setup. Practical behavior depends on the whole runtime stack, not only on framework code.',
  },
  {
    title: 'ORM convenience requires query awareness',
    body: 'Active Record is highly productive, but it can hide costly query behavior, N+1 problems, callback chains, and serialization overhead. Teams need to understand what queries are actually executed and where persistence logic should live.',
  },
  {
    title: 'Background work expands the operational surface',
    body: 'Once a Rails application uses background jobs, mailers, websockets, or asynchronous integrations, the production system becomes broader than a simple web app. Worker supervision, retries, idempotency, and queue visibility become part of normal operations.',
  },
  {
    title: 'Observability and scaling still need explicit discipline',
    body: 'Rails provides many productive defaults, but production success still depends on metrics, logs, tracing, caching discipline, database tuning, and clear error-reporting strategy. Framework convenience does not remove the need for operational maturity.',
  },
]

const ecosystemUses = [
  {
    title: 'Product-centric SaaS applications',
    body: 'Rails is especially strong for customer-facing products, dashboards, onboarding systems, account management, billing flows, and other application domains where business features evolve quickly.',
  },
  {
    title: 'Internal tools and business applications',
    body: 'Teams often use Rails for internal systems, back-office tools, operational interfaces, and workflow applications because the framework makes form handling, persistence, and admin-style features easy to build.',
  },
  {
    title: 'Rapid prototype-to-product paths',
    body: 'Rails is well known for helping teams move from idea to working product quickly, especially when the product shape looks like a web application rather than a low-level infrastructure service.',
  },
  {
    title: 'Organizations standardized on product conventions',
    body: 'Some teams value Rails because it lets multiple engineers work with a familiar shared language about controllers, models, migrations, jobs, and routes instead of inventing that baseline structure repeatedly.',
  },
]

const comparisons = [
  {
    title: 'Rails versus Laravel',
    body: 'Both frameworks are convention-heavy, product-oriented, and highly integrated. Rails occupies this role in Ruby much as Laravel does in PHP. The main differences usually come from language, ecosystem culture, and framework-specific conventions rather than from a complete difference in philosophy.',
  },
  {
    title: 'Rails versus Phoenix',
    body: 'Phoenix offers a very different runtime story through the BEAM and process-oriented concurrency model, while Rails is shaped more by product-oriented convention and integrated web application development. Rails often feels more centered on rapid CRUD and product flow; Phoenix often feels more centered on realtime and OTP-native system design.',
  },
  {
    title: 'Rails versus Express.js or Flask',
    body: 'Express.js and Flask are much thinner and leave more architecture to the application. Rails offers a broader default platform. The tradeoff is integrated productivity and stronger conventions versus lower ceremony and greater baseline flexibility.',
  },
  {
    title: 'Rails versus Spring Boot or ASP.NET Core',
    body: 'Rails emphasizes speed, convention, and product iteration, while larger strongly typed ecosystems often emphasize compile-time tooling, different dependency-injection models, and broader enterprise platform styles. The better fit depends on team preferences and system requirements rather than on raw feature count alone.',
  },
]

const failureModes = [
  {
    title: 'Letting models accumulate every concern',
    body: 'A common Rails failure mode is the so-called fat model pattern taken too far, where persistence, callbacks, business rules, side effects, and query behavior all collapse into one class. This makes the codebase difficult to reason about as complexity grows.',
  },
  {
    title: 'Ignoring query behavior behind Active Record',
    body: 'It is easy to write concise model code without understanding the resulting SQL or association loading behavior. Without query discipline, applications can become slow or unpredictable even though the Ruby code looks clean.',
  },
  {
    title: 'Overreliance on implicit callbacks',
    body: 'Callbacks can make simple workflows elegant, but in larger systems they can hide side effects and make request or job behavior harder to follow. Teams need to be careful about how much hidden control flow they accumulate.',
  },
  {
    title: 'Treating generators as final architecture',
    body: 'Generators and scaffolds are useful starting points, but leaving generated structure untouched in a growing product can produce shallow patterns that no longer fit the real complexity of the application.',
  },
  {
    title: 'Mistaking rapid progress for long-term clarity',
    body: 'Rails is very good at helping teams move quickly, but that speed can cover up missing boundaries, weak service extraction, or unclear ownership if the team does not revisit architecture as the product expands.',
  },
]

const studyChecklist = [
  'Understand Rails as a convention-heavy product framework, not only as MVC shorthand.',
  'Learn how routing, controllers, views, models, and migrations fit together in the normal request lifecycle.',
  'Use Active Record productively, but keep query behavior and data boundaries visible.',
  'Treat background jobs, Action Cable, and other integrated features as real architecture concerns once adopted.',
  'Be willing to move beyond generated defaults when the application becomes more complex.',
  'Pair framework speed with explicit discipline around callbacks, queries, and operational visibility.',
]

const examples = [
  {
    id: 'rails98-example-route-controller',
    title: 'Example: Route to controller action',
    area: 'Routing',
    intro:
      'A standard Rails request moves from the router into a controller action, where parameters are handled and a response is rendered or redirected.',
    whyFit: 'This captures the ordinary Rails request flow that most product features begin with.',
    code: `Rails.application.routes.draw do
  resources :orders, only: [:show]
end

class OrdersController < ApplicationController
  def show
    @order = Order.find(params[:id])
  end
end`,
    takeaway:
      'Rails keeps the web entrypoint readable, but larger systems still need deeper boundaries beyond controller actions alone.',
  },
  {
    id: 'rails98-example-active-record',
    title: 'Example: Active Record query with associations',
    area: 'Data Access',
    intro:
      'Active Record makes association loading and query composition concise, which is one reason Rails remains productive for data-backed product applications.',
    whyFit: 'This shows both the convenience and the hidden-query risk of the ORM style.',
    code: `orders = Order
  .includes(:line_items)
  .where(status: "open")
  .order(created_at: :desc)`,
    takeaway:
      'Concise model code is helpful, but teams still need to understand what queries are actually executed and why.',
  },
  {
    id: 'rails98-example-migration',
    title: 'Example: Schema migration',
    area: 'Persistence Workflow',
    intro:
      'Migrations make schema change part of the normal application-development workflow instead of a separate manual database process.',
    whyFit: "This reflects one of Rails' foundational productivity ideas.",
    code: `class AddStatusToOrders < ActiveRecord::Migration[7.1]
  def change
    add_column :orders, :status, :string, null: false, default: "open"
  end
end`,
    takeaway:
      'Schema evolution becomes more manageable when the application and database change together through explicit, versioned steps.',
  },
  {
    id: 'rails98-example-job',
    title: 'Example: Background job for email delivery',
    area: 'Asynchronous Work',
    intro:
      'Rails applications commonly move slow or non-interactive work into background jobs so request latency stays low and product workflows remain responsive.',
    whyFit: 'This shows how integrated jobs extend Rails beyond plain request-response behavior.',
    code: `class SendReceiptJob < ApplicationJob
  queue_as :default

  def perform(order_id)
    OrderMailer.receipt(order_id).deliver_now
  end
end`,
    takeaway:
      'Background jobs improve responsiveness, but they also create a larger operational surface with retries, worker health, and delivery guarantees to manage.',
  },
  {
    id: 'rails98-example-action-cable',
    title: 'Example: Action Cable broadcast',
    area: 'Real-Time Features',
    intro:
      'Rails can support realtime updates through Action Cable, which lets applications push events to subscribed clients in a framework-integrated way.',
    whyFit:
      'This reflects how Rails can support interactive products without leaving the framework ecosystem entirely.',
    code: `ActionCable.server.broadcast(
  "orders",
  { type: "order_updated", id: order.id }
)`,
    takeaway:
      'Rails can support realtime behavior, but the team still needs clear design around channels, client expectations, and event semantics.',
  },
]

const glossary = [
  {
    term: 'Ruby on Rails',
    definition:
      'A full-stack Ruby web framework known for convention over configuration and rapid product development.',
  },
  {
    term: 'Convention over configuration',
    definition:
      'A framework philosophy where common behavior is assumed by default so developers write less setup code.',
  },
  {
    term: 'MVC',
    definition:
      'The model-view-controller structure commonly associated with Rails application organization.',
  },
  {
    term: 'Active Record',
    definition:
      "Rails' ORM for mapping Ruby models to database tables and composing queries and associations.",
  },
  {
    term: 'Migration',
    definition:
      'A versioned schema change used to evolve the database structure alongside application code.',
  },
  {
    term: 'Scaffolding',
    definition:
      'Rails code generation that creates baseline application structure for common resources.',
  },
  {
    term: 'Action Cable',
    definition: "Rails' framework support for websocket-based realtime communication.",
  },
  { term: 'ApplicationJob', definition: 'The base class used for background jobs in Rails.' },
  {
    term: 'Controller action',
    definition: 'A method on a controller class that handles a routed request.',
  },
  {
    term: 'Callback',
    definition:
      'A hook that runs automatically around model lifecycle events and can introduce implicit control flow.',
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
    { id: 'rails98-overview', label: 'Overview' },
    { id: 'rails98-why', label: 'Why It Matters' },
    { id: 'rails98-history', label: 'Historical Context' },
    { id: 'rails98-themes', label: 'Big Picture Themes' },
    { id: 'rails98-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'rails98-signals', label: 'Topic Signals' },
    { id: 'rails98-foundations', label: 'Foundations' },
    { id: 'rails98-features', label: 'Framework Features' },
    { id: 'rails98-runtime', label: 'Runtime and Operations' },
    { id: 'rails98-uses', label: 'Ecosystem Uses' },
    { id: 'rails98-compare', label: 'Compare and Contrast' },
    { id: 'rails98-failures', label: 'Failure Modes' },
    { id: 'rails98-checklist', label: 'Study Checklist' },
  ],
  examples: examples.map((example) => ({ id: example.id, label: example.title })),
  glossary: [{ id: 'rails98-glossary', label: 'Terms' }],
}

export default function RubyOnRailsPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Ruby on Rails (Backend)',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Ruby on Rails (Backend)"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Ruby on Rails (Backend)</h1>
      <p className="rails98-intro">
        This page is a backend-focused overview of Ruby on Rails as a convention-heavy web
        application framework. It explains MVC structure, Active Record, migrations, integrated
        product tooling, Action Cable, operational tradeoffs, and the architectural discipline
        needed to keep Rails applications clear as they grow.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="rails98-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            {overviewSections.map((section) => (
              <div key={section.title}>
                <h3 className="bin98-subheading">{section.title}</h3>
                <p>{section.body}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="rails98-why" className="bin98-section">
            <h2 className="bin98-heading">Why It Matters</h2>
            <ul>
              {whyItMatters.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <hr className="bin98-divider" />

          <section id="rails98-history" className="bin98-section">
            <h2 className="bin98-heading">Historical Context</h2>
            {historicalContext.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="rails98-themes" className="bin98-section">
            <h2 className="bin98-heading">Big Picture Themes</h2>
            {bigPictureThemes.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="rails98-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key Takeaways</h2>
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
          <section id="rails98-signals" className="bin98-section">
            <h2 className="bin98-heading">Topic Signals</h2>
            {topicSignals.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="rails98-foundations" className="bin98-section">
            <h2 className="bin98-heading">Foundations</h2>
            {coreFoundations.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="rails98-features" className="bin98-section">
            <h2 className="bin98-heading">Framework Features</h2>
            {frameworkFeatures.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="rails98-runtime" className="bin98-section">
            <h2 className="bin98-heading">Runtime and Operations</h2>
            {runtimeAndOperations.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="rails98-uses" className="bin98-section">
            <h2 className="bin98-heading">Ecosystem Uses</h2>
            {ecosystemUses.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="rails98-compare" className="bin98-section">
            <h2 className="bin98-heading">Compare and Contrast</h2>
            {comparisons.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="rails98-failures" className="bin98-section">
            <h2 className="bin98-heading">Failure Modes</h2>
            {failureModes.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="rails98-checklist" className="bin98-section">
            <h2 className="bin98-heading">Study Checklist</h2>
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
            <section key={example.id} id={example.id} className="bin98-section">
              <h2 className="bin98-heading">{example.title}</h2>
              <p>
                <strong>Area:</strong> {example.area}
              </p>
              <p>{example.intro}</p>
              <p>
                <strong>Why this example fits:</strong> {example.whyFit}
              </p>
              <div className="bin98-codebox">
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
        <section id="rails98-glossary" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {glossary.map((entry) => (
            <p key={entry.term}>
              <strong>{entry.term}:</strong> {entry.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
