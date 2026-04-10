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
  'Phoenix is a web framework for Elixir built to take advantage of the BEAM runtime, lightweight processes, message passing, fault tolerance, and soft real-time concurrency. It is used for backend web applications, APIs, real-time systems, and interactive applications where concurrency and reliability are part of the architecture rather than afterthoughts.',
  'The most useful way to think about Phoenix is not as a Rails clone written in Elixir, even though it shares some full-stack productivity goals. Phoenix is a framework shaped by Elixir and the Erlang VM. That means requests, channels, background work, supervision, and live interactions all sit on top of a runtime that was designed for many concurrent processes and resilient systems.',
  'This page is intentionally thorough. It covers the Phoenix programming model, request pipeline, contexts, controllers, Ecto, templates, LiveView, channels, supervision, testing, deployment, operations, tradeoffs, and practical examples showing how Phoenix applications are organized in real backend systems.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Phoenix is an Elixir framework for building web applications, APIs, and real-time systems. It provides routing, controller handling, template rendering, WebSocket support, LiveView, integration with Ecto for data access, testing support, and deployment-friendly structure for BEAM applications.',
      'Its value comes partly from productive web conventions and partly from the runtime beneath it. Because Phoenix sits on the BEAM, it inherits a concurrency and fault-tolerance model that makes large numbers of simultaneous connections and real-time interactions feel natural rather than bolted on.',
    ],
  },
  {
    id: 'bp-why-it-matters',
    title: 'Why Phoenix Matters',
    paragraphs: [
      'Phoenix matters because it offers a rare combination: productive web development with a runtime that is exceptionally strong at concurrency, resilience, and long-lived process management. Many frameworks are productive or scalable under concurrency with enough engineering. Phoenix is notable because those strengths fit together more naturally.',
      'It is especially important for systems that need real-time interaction, high connection counts, collaborative interfaces, low-latency messaging, or operational reliability under load. The framework takes those problems seriously at the platform level.',
    ],
    bullets: [
      'Built on a runtime designed for massive concurrency and resilience.',
      'Supports conventional web apps and real-time systems in one framework.',
      'LiveView and channels make interactive applications a first-class use case.',
      'The Elixir ecosystem encourages functional, explicit backend design.',
    ],
  },
  {
    id: 'bp-mental-model',
    title: 'Mental Model',
    paragraphs: [
      'The right mental model is a web framework layered onto a concurrent, process-oriented runtime. A Phoenix app is not only request handlers and templates. It is also supervisors, processes, channels, sockets, background work, message passing, and application structure shaped by the BEAM.',
      'That means Phoenix design is often about more than controller code. Engineers think about process ownership, supervision boundaries, live state, concurrency patterns, request pipelines, and how application modules expose domain behavior through contexts.',
    ],
    bullets: [
      'Think BEAM application with a web layer, not only a routing library.',
      'Think process model and supervision alongside HTTP behavior.',
      'Think explicit domain modules rather than framework-heavy hidden magic.',
    ],
  },
  {
    id: 'bp-when-it-fits',
    title: 'When Phoenix Fits Best',
    paragraphs: [
      'Phoenix fits best for real-time products, collaborative interfaces, APIs with meaningful concurrency needs, messaging-heavy systems, dashboards, marketplaces, multiplayer or interactive systems, and web applications where thousands or millions of concurrent connections may matter. It is also strong for ordinary backend APIs when the team values Elixir and the BEAM model.',
      'It becomes especially compelling when the same system needs web delivery, background work, stateful live interaction, and operational resilience without introducing many disconnected technologies.',
    ],
    bullets: [
      'Real-time and interactive applications.',
      'Systems that benefit from BEAM concurrency and fault tolerance.',
      'Teams that want functional backend design with strong runtime guarantees.',
      'Applications combining APIs, web views, and live client interaction.',
    ],
  },
  {
    id: 'bp-when-it-does-not-fit',
    title: 'Where Phoenix Is Not the Best Default',
    paragraphs: [
      'Phoenix is not automatically the right answer when the team does not want Elixir, when the project is too small to benefit from the runtime model, or when the broader ecosystem requirements are better served by a more mainstream stack already embedded in the organization. Framework choice is not only technical elegance; staffing and ecosystem fit matter too.',
      'It can also be the wrong fit if the team wants a programming style very different from Elixirs explicit functional and process-oriented model. Fighting the language and runtime makes the framework less valuable.',
    ],
    bullets: [
      'Teams without appetite for Elixir and BEAM concepts.',
      'Very small services where the framework and runtime strengths are not needed.',
      'Organizations whose surrounding tooling strongly favors another platform.',
      'Projects that do not benefit from real-time or concurrency-oriented architecture.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Key Takeaways',
    paragraphs: [
      'Phoenix is powerful because it combines productive web development with a runtime built for concurrent, reliable systems. It does not just add WebSockets or async libraries to an otherwise conventional stack; it sits on a platform where those capabilities are natural.',
      'Its value is clearest when the architecture can benefit from the BEAM model and when the team is willing to design with processes, supervision, and explicit domain boundaries in mind.',
    ],
    bullets: [
      'Choose Phoenix when real-time interaction and resilience are genuine requirements or advantages.',
      'Treat the BEAM runtime model as central to the architecture, not incidental.',
      'Use Phoenix as an application platform, not just as a router plus templates.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-what-it-is',
    title: 'What Phoenix Actually Is',
    paragraphs: [
      'Phoenix is a web framework for Elixir applications running on the Erlang VM. It provides HTTP request handling, routing, controllers, templating, JSON APIs, WebSocket communication, channels, LiveView, testing support, and integration with the rest of a typical Elixir backend stack.',
      'The framework is most meaningful when understood in combination with Elixir and OTP. Phoenix is not only a set of helpers; it is the web-facing part of a broader concurrent application platform.',
    ],
  },
  {
    id: 'core-beam',
    title: 'The BEAM and Process-Oriented Runtime',
    paragraphs: [
      'Phoenix runs on the BEAM, which is designed for lightweight processes, message passing, isolation, and fault recovery. This matters because application concurrency is not simulated with one or two heavyweight primitives. The runtime is built to host large numbers of independent processes with strong isolation properties.',
      'That makes system design different in practice. Connections, live sessions, background tasks, and supervised workers can each have a more natural place in the architecture.',
    ],
  },
  {
    id: 'core-request-pipeline',
    title: 'Request Pipeline and Plugs',
    paragraphs: [
      'Phoenix request handling is built around plugs and pipelines. Requests flow through a series of composable steps for parsing, session handling, authentication, and other concerns before reaching the route and controller logic. This gives the framework a clear and explicit middleware-style processing model.',
      'The main engineering benefit is predictable composition. Cross-cutting behavior can be attached at the pipeline layer instead of being repeated in every controller action.',
    ],
  },
  {
    id: 'core-routing',
    title: 'Routing and Endpoint Structure',
    paragraphs: [
      'The router maps paths and verbs to controllers, LiveView sessions, and other endpoints. Phoenix routing stays readable even as applications grow because pipelines, scopes, and route modules organize the surface area clearly.',
      'Good routing is part of system design. Routes are the public contract of the application, and Phoenix gives teams a structured place to express that contract.',
    ],
  },
  {
    id: 'core-controllers',
    title: 'Controllers, Views, and HTTP Responses',
    paragraphs: [
      'Phoenix controllers coordinate request work and produce HTML, JSON, redirects, or other responses. In well-structured applications, controllers remain thin and domain work is pushed into contexts or dedicated modules rather than hidden in the web layer.',
      'This keeps the application easier to test and makes domain logic reusable outside the immediate request path.',
    ],
  },
  {
    id: 'core-contexts',
    title: 'Contexts and Domain Boundaries',
    paragraphs: [
      'Phoenix encourages the use of contexts to define domain boundaries. Context modules group business logic and data interactions into coherent areas such as accounts, billing, catalog, or messaging. This is one of the frameworks strongest architectural ideas because it prevents the web layer from becoming the whole application.',
      'Contexts are valuable because they make domain capabilities explicit. They help teams build applications where controllers, channels, and jobs all call the same domain-facing APIs instead of duplicating business logic.',
    ],
  },
  {
    id: 'core-ecto',
    title: 'Ecto and Data Access',
    paragraphs: [
      'Phoenix commonly uses Ecto for database access, schema definitions, validations through changesets, querying, and repository behavior. Ecto is not an active record style ORM in the Rails sense; it is more explicit and tends to keep domain data and persistence concerns somewhat more separated.',
      'That explicitness is useful for correctness and clarity, but teams still need database literacy. Query shape, indexing, transactions, and migration discipline still matter as much here as in any other serious backend stack.',
    ],
  },
  {
    id: 'core-changesets',
    title: 'Changesets and Validation',
    paragraphs: [
      'Changesets are a central Ecto concept for casting, validating, and preparing data changes. They give Phoenix applications a structured way to turn external input into validated data operations.',
      'This is important because application boundaries are one of the main places where correctness lives. Changesets make that boundary explicit instead of leaving validation scattered loosely through controller code.',
    ],
  },
  {
    id: 'core-liveview',
    title: 'LiveView and Server-Driven Interactivity',
    paragraphs: [
      'Phoenix LiveView enables rich interactive interfaces without requiring a full client-side single-page application architecture for every use case. The server manages stateful processes for live views and pushes updates over persistent connections as the UI changes.',
      'LiveView is one of Phoenixs most distinctive features because it uses the BEAM model naturally. It lets teams build dynamic, real-time interfaces while keeping a large part of the complexity on the server side in Elixir.',
    ],
  },
  {
    id: 'core-channels',
    title: 'Channels and Real-Time Messaging',
    paragraphs: [
      'Phoenix channels provide structured real-time communication over WebSockets. They are useful for chat, collaboration, dashboards, presence, notifications, and any interaction pattern where clients need live server updates or multi-user coordination.',
      'The important point is that real-time behavior is not an awkward extension in Phoenix. It is a first-class part of the framework and fits the runtime naturally.',
    ],
  },
  {
    id: 'core-supervision',
    title: 'Supervision and Fault Tolerance',
    paragraphs: [
      'Phoenix applications are usually organized under OTP supervision trees. Supervisors restart failed processes according to defined strategies, which helps systems recover from local failures without crashing the whole application.',
      'This is one of the biggest conceptual differences from many mainstream web stacks. Failure handling is part of the runtime architecture rather than something improvised ad hoc in every service.',
    ],
  },
  {
    id: 'core-background-work',
    title: 'Background Work and Process Design',
    paragraphs: [
      'Background tasks, scheduled work, and process-level application behavior fit naturally into Elixir applications because concurrent workers and supervision are already part of the runtime model. Phoenix applications can coordinate request handling with background work without needing a completely separate conceptual world.',
      'The engineering discipline is still to define clear ownership, supervision strategy, retry behavior, and observability for that work.',
    ],
  },
  {
    id: 'core-testing',
    title: 'Testing Model',
    paragraphs: [
      'Phoenix supports testing across controllers, contexts, channels, LiveView components, and integration behavior. The Elixir ecosystem generally encourages explicit, function-oriented code, which often makes business logic straightforward to test outside the full web layer.',
      'The best test strategy keeps the domain logic testable on its own while still covering the framework integration points that matter in production.',
    ],
  },
  {
    id: 'core-security',
    title: 'Security and Application Boundaries',
    paragraphs: [
      'Phoenix applications still need the usual backend security disciplines: authentication, authorization, session handling, secret management, input validation, and careful treatment of live and real-time channels. The framework provides good tools, but the design decisions remain the teams responsibility.',
      'Security design becomes especially important when real-time features and long-lived sessions are involved because authorization and state management must remain clear over time, not just at first request entry.',
    ],
  },
  {
    id: 'core-operations',
    title: 'Operations and Deployment',
    paragraphs: [
      'Phoenix applications are deployed as BEAM services and benefit from the usual operational strengths of the platform: runtime introspection, supervised processes, and stable long-lived systems. Teams still need deployment discipline, logging, metrics, queue visibility, database monitoring, and release strategy.',
      'Operational quality in Phoenix is often determined less by raw request routing and more by domain design, process supervision, Ecto query efficiency, and visibility into real-time behavior under load.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance Mindset',
    paragraphs: [
      'Phoenix can support impressive concurrency and real-time throughput, but performance still comes from good architecture. Database bottlenecks, inefficient serialization, poor process boundaries, and unmeasured LiveView or channel behavior can still create trouble.',
      'The strongest performance habit is empirical observation. Measure mailbox growth, latency, query counts, and process behavior rather than relying only on the reputation of the runtime.',
    ],
    bullets: [
      'Profile actual system behavior instead of assuming the runtime solves every bottleneck.',
      'Watch Ecto and database usage closely.',
      'Treat LiveView and channel state as part of performance design.',
      'Use supervision and process isolation intentionally, not mechanically.',
    ],
  },
  {
    id: 'core-use-cases',
    title: 'Common Real-World Uses',
    paragraphs: [
      'Phoenix is strong for collaborative tools, chat systems, notifications, dashboards, marketplaces, event-driven applications, control panels, APIs with high concurrency, and products where real-time user interaction is part of the core experience. It is also suitable for ordinary backend APIs when the team wants Elixir and the BEAM advantages.',
      'Its major advantage is not only raw concurrency. It is how naturally the framework supports applications where connection handling, live updates, and resilient process behavior all matter together.',
    ],
  },
  {
    id: 'core-not-fit',
    title: 'When Not to Use Phoenix',
    paragraphs: [
      'Phoenix is a weaker fit when the project is trivial, when a very small API-only stack is enough, when the team does not want to invest in Elixir and BEAM concepts, or when the surrounding organization depends too heavily on ecosystems that Phoenix does not naturally match.',
      'It is also the wrong fit if the team wants to write in a style that treats the runtime model as irrelevant. Phoenix is strongest when the system design embraces what the platform is built for.',
    ],
  },
  {
    id: 'core-pitfalls',
    title: 'Common Pitfalls',
    paragraphs: [
      'Common Phoenix mistakes include keeping all domain logic in controllers, underusing contexts, assuming LiveView removes the need for UI discipline, ignoring database performance because the runtime is fast, and building process trees without clear ownership or observability.',
      'Another pitfall is adopting Phoenix for the reputation of concurrency without designing a workload that actually benefits from it. The framework is excellent, but its biggest strengths should match the problem.',
    ],
    bullets: [
      'Do not let the web layer become the whole application.',
      'Do not ignore database behavior just because the BEAM is efficient.',
      'Do not treat LiveView as a replacement for all frontend reasoning.',
      'Do not use supervision patterns without understanding restart behavior.',
    ],
  },
  {
    id: 'core-compare',
    title: 'Phoenix Compared with Other Backend Frameworks',
    paragraphs: [
      'Compared with Rails, Phoenix shares some productivity goals but differs sharply in runtime model, language style, and real-time architecture. Compared with Spring Boot or ASP.NET Core, Phoenix often feels more naturally aligned with concurrent live systems because the BEAM is central rather than incidental. Compared with minimal frameworks, it offers a much more complete application platform.',
      'The key comparison is not just developer happiness or performance anecdotes. The real question is whether the team and the workload benefit from Elixir, functional design, supervision, and the BEAM process model.',
    ],
  },
  {
    id: 'core-decision',
    title: 'Decision Checklist',
    paragraphs: [
      'Choose Phoenix when the application benefits from real-time behavior, strong concurrency, resilient processes, and an Elixir-first architecture. Choose something smaller or more conventional when those strengths are not relevant enough to justify the platform choice.',
      'The best Phoenix decisions happen when the teams language preferences, architecture, and product interaction model align naturally with the BEAM way of building backend systems.',
    ],
    bullets: [
      'Need real-time or concurrency-heavy behavior: strong Phoenix signal.',
      'Need resilience and process supervision as core architecture: strong Phoenix signal.',
      'Need mainstream ecosystem familiarity over runtime advantages: weaker Phoenix signal.',
      'Need Elixir and BEAM strengths to be meaningful, not theoretical: strong Phoenix signal.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-router',
    title: 'Router with Browser and API Pipelines',
    description: [
      'Phoenix request handling is commonly organized through named pipelines that apply plugs before requests reach routes. This keeps repeated behavior explicit and composable.',
      'The router becomes a structural description of how different kinds of traffic move through the application.',
    ],
    code: `defmodule MyAppWeb.Router do
  use MyAppWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :protect_from_forgery
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", MyAppWeb do
    pipe_through :browser
    get "/", PageController, :index
  end
end`,
    notes: [
      'Pipelines make cross-cutting request behavior explicit.',
      'Different request classes can use different middleware flows cleanly.',
    ],
  },
  {
    id: 'examples-context',
    title: 'Context Function for Domain Access',
    description: [
      'Contexts expose application behavior outside the immediate web layer. This example keeps account lookup inside a domain module rather than in a controller.',
      'That structure helps controllers, channels, and jobs reuse the same application-facing APIs.',
    ],
    code: `defmodule MyApp.Accounts do
  alias MyApp.Repo
  alias MyApp.Accounts.User

  def get_user!(id) do
    Repo.get!(User, id)
  end
end`,
    notes: [
      'Contexts define application boundaries more clearly than controller-heavy code.',
      'Reusable domain APIs help keep Phoenix apps from becoming web-layer-centric.',
    ],
  },
  {
    id: 'examples-changeset',
    title: 'Ecto Schema and Changeset',
    description: [
      'Changesets are a core Ecto pattern for casting and validating input before persistence. They make data-shaping rules explicit and testable.',
      'This is one of the cleanest ways Phoenix applications turn external input into domain-safe changes.',
    ],
    code: `defmodule MyApp.Billing.Invoice do
  use Ecto.Schema
  import Ecto.Changeset

  schema "invoices" do
    field :status, :string
    field :total_cents, :integer
    timestamps()
  end

  def changeset(invoice, attrs) do
    invoice
    |> cast(attrs, [:status, :total_cents])
    |> validate_required([:status, :total_cents])
  end
end`,
    notes: [
      'Changesets combine casting and validation in one explicit workflow.',
      'Data boundaries are easier to reason about when invalid changes fail early.',
    ],
  },
  {
    id: 'examples-controller',
    title: 'Controller Action Using a Context',
    description: [
      'A conventional Phoenix controller delegates domain work to a context and keeps the web-specific layer focused on request and response concerns.',
      'That separation makes testing and reuse clearer as the application grows.',
    ],
    code: `def create(conn, %{"invoice" => invoice_params}) do
  case Billing.create_invoice(invoice_params) do
    {:ok, invoice} ->
      conn
      |> put_status(:created)
      |> json(%{id: invoice.id})

    {:error, changeset} ->
      conn
      |> put_status(:unprocessable_entity)
      |> json(%{errors: changeset.errors})
  end
end`,
    notes: [
      'Controllers should manage HTTP concerns, not own all domain logic.',
      'Context return shapes make success and failure handling explicit.',
    ],
  },
  {
    id: 'examples-liveview',
    title: 'LiveView for Server-Driven Interactivity',
    description: [
      'LiveView keeps interactive state on the server and pushes updates over a persistent connection. This example shows a minimal counter with event handling.',
      'The important idea is not the counter itself. The idea is that live interaction sits naturally inside the server application model.',
    ],
    code: `defmodule MyAppWeb.CounterLive do
  use MyAppWeb, :live_view

  def mount(_params, _session, socket) do
    {:ok, assign(socket, count: 0)}
  end

  def handle_event("inc", _params, socket) do
    {:noreply, update(socket, :count, &(&1 + 1))}
  end
end`,
    notes: [
      'LiveView uses server-side state and events instead of pushing all UI logic to the browser.',
      'Interactive behavior should still be designed with clarity around state ownership.',
    ],
  },
  {
    id: 'examples-channel',
    title: 'Channel for Real-Time Messaging',
    description: [
      'Phoenix channels support structured real-time communication for multi-user systems. This example broadcasts a new message to a room topic.',
      'The framework treats this as a normal architectural pattern rather than as an awkward add-on.',
    ],
    code: `defmodule MyAppWeb.RoomChannel do
  use Phoenix.Channel

  def join("room:" <> _room_id, _params, socket) do
    {:ok, socket}
  end

  def handle_in("new_message", %{"body" => body}, socket) do
    broadcast!(socket, "new_message", %{body: body})
    {:noreply, socket}
  end
end`,
    notes: [
      'Channels are strong when the product genuinely needs shared live updates.',
      'Real-time architecture still needs authorization and operational visibility.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-core',
    title: 'Core Phoenix Terms',
    terms: [
      {
        term: 'BEAM',
        definition:
          'The Erlang virtual machine that runs Elixir code and provides lightweight processes, isolation, and fault-tolerant runtime behavior.',
      },
      {
        term: 'Plug',
        definition:
          'A composable request processing unit used in Phoenix pipelines and endpoint handling.',
      },
      {
        term: 'Context',
        definition:
          'A Phoenix application boundary module that groups related business logic and domain-facing operations.',
      },
      {
        term: 'Endpoint',
        definition:
          'The Phoenix component that defines the outer web interface, including sockets, plugs, and request entry behavior.',
      },
      {
        term: 'Supervisor',
        definition:
          'An OTP process responsible for starting and restarting child processes according to a defined strategy.',
      },
    ],
  },
  {
    id: 'glossary-web',
    title: 'Web and Real-Time Terms',
    terms: [
      {
        term: 'Channel',
        definition:
          'A Phoenix abstraction for topic-based real-time communication over persistent socket connections.',
      },
      {
        term: 'LiveView',
        definition:
          'A Phoenix feature for building interactive server-rendered interfaces with live updates over a persistent connection.',
      },
      {
        term: 'Pipeline',
        definition:
          'A named sequence of plugs applied to matching routes before controller or LiveView execution.',
      },
      {
        term: 'Socket',
        definition:
          'The connection and state structure used by Phoenix for channels, LiveView, and other persistent interactions.',
      },
      {
        term: 'Presence',
        definition:
          'A Phoenix feature commonly used to track connected users or shared real-time state across topics.',
      },
    ],
  },
  {
    id: 'glossary-data',
    title: 'Data and Validation Terms',
    terms: [
      {
        term: 'Ecto',
        definition:
          'The Elixir database and data-mapping toolkit commonly used with Phoenix for schemas, queries, changesets, and repositories.',
      },
      {
        term: 'Changeset',
        definition:
          'An Ecto data structure that casts, validates, and tracks proposed changes to data.',
      },
      {
        term: 'Repo',
        definition: 'The Ecto repository module responsible for database interaction.',
      },
      {
        term: 'Schema',
        definition: 'An Ecto module that describes structured data fields and persistence mapping.',
      },
      {
        term: 'OTP',
        definition:
          'The Erlang and Elixir application framework layer that provides behaviors, supervision, and structured concurrent system patterns.',
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

export default function PhoenixElixirPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Phoenix (Elixir)',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Phoenix (Elixir)"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Phoenix (Elixir)</h1>
      <p className="postgres-help-doc-subtitle">
        Elixir backend framework reference covering the BEAM runtime, request handling, LiveView,
        Ecto, supervision, channels, and deployment tradeoffs.
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
