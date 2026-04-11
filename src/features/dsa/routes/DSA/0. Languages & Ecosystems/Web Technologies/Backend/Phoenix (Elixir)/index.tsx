import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const overviewSections = [
  {
    title: 'What Phoenix is',
    body: "Phoenix is a web framework for Elixir built on top of Plug and the BEAM runtime. It supports controllers, routing, real-time messaging, server-rendered applications, APIs, and interactive LiveView interfaces, all within an ecosystem shaped by Elixir's concurrency model and OTP supervision principles.",
  },
  {
    title: 'Why Phoenix matters',
    body: 'Phoenix matters because it brought the reliability and concurrency strengths of the BEAM to modern web development in a framework that still feels productive and approachable. It became especially notable for real-time features, fault tolerance, and the ability to build interactive applications without adopting a separate frontend-heavy architecture by default.',
  },
  {
    title: 'How to think about it',
    body: 'The useful mental model is that Phoenix is not only an HTTP framework. It is a web application platform shaped by Elixir processes, OTP supervision, Plug request pipelines, channels, and LiveView. It lives in an ecosystem where concurrency, fault isolation, and long-running process behavior are normal architectural tools rather than special cases.',
  },
  {
    title: 'Where it fits best',
    body: 'Phoenix fits best for real-time applications, collaborative systems, dashboards, APIs, event-rich products, and backend teams that want the operational strengths of the BEAM together with a coherent web framework. It is particularly compelling when websockets, presence, resilience, and interactive server-driven UI patterns matter.',
  },
]

const whyItMatters = [
  'It brought BEAM reliability and process-oriented concurrency into mainstream web application development.',
  'It became a leading framework for real-time and interactive Elixir applications.',
  'It offers a coherent way to build APIs, traditional web apps, and LiveView-driven interfaces in one ecosystem.',
  'It made OTP and supervision concepts practical for everyday backend and product engineering.',
  'It remains a reference point when discussing highly concurrent, fault-tolerant web systems.',
]

const historicalContext = [
  {
    title: 'Phoenix emerged from the Elixir and BEAM ecosystem',
    detail:
      'Elixir was designed to run on the BEAM, a runtime long known for concurrency, fault tolerance, and distributed systems. Phoenix grew out of that environment, so it inherited a very different set of strengths from frameworks shaped primarily around thread-per-request or event-loop-centric histories.',
  },
  {
    title: 'Plug provided the HTTP compositional base',
    detail:
      'Phoenix is built on Plug, which provides a composable request and response abstraction for Elixir web applications. This gives Phoenix a clear pipeline model while keeping it anchored in the functional style of the language and ecosystem.',
  },
  {
    title: 'Real-time features helped define its identity',
    detail:
      'Phoenix channels and later LiveView made real-time behavior a first-class part of the framework story. That helped Phoenix stand out from frameworks where real-time features often felt like later additions or external integrations.',
  },
  {
    title: 'LiveView changed what server-driven UI could mean',
    detail:
      'LiveView expanded Phoenix beyond APIs and classic templates by letting teams build rich interactive interfaces with server-managed state and websockets. That changed how many engineers thought about the tradeoff between frontend complexity and backend-driven interactivity.',
  },
]

const bigPictureThemes = [
  {
    title: 'The BEAM changes backend assumptions',
    body: 'Phoenix inherits a runtime where lightweight processes, supervision trees, and fault isolation are normal. That means concurrency, resilience, and long-lived process behavior are not fringe topics in Phoenix applications; they are often central architectural tools.',
  },
  {
    title: 'Web development is process-oriented here',
    body: 'In many ecosystems, web frameworks are mostly about request-response flow. Phoenix still handles that, but it also lives comfortably in a world of background processes, channels, PubSub, LiveView sessions, and supervised application components. That broader process model affects how teams think about architecture.',
  },
  {
    title: 'Real-time is part of the normal framework model',
    body: 'Phoenix does not treat websockets or interactive server-driven updates as external concerns. Channels and LiveView are part of the normal way the framework can be used, which gives teams a more unified approach to many interactive product problems.',
  },
  {
    title: 'Productivity still depends on OTP literacy',
    body: 'Phoenix can be highly productive, but its deeper strengths emerge only when teams understand Elixir, processes, supervision, message passing, and the BEAM model well enough to design with them intentionally. Without that understanding, teams may only use a fraction of what makes the framework distinctive.',
  },
]

const keyTakeaways = [
  'Phoenix is a web framework for Elixir shaped by Plug, OTP, and the BEAM runtime.',
  'Its strengths are especially visible in real-time, highly concurrent, and resilience-sensitive systems.',
  'It supports APIs, server-rendered pages, channels, and LiveView within one coherent ecosystem.',
  'Its architecture makes the most sense when teams understand supervision and process-oriented design.',
  'Phoenix is most distinctive when used as a BEAM-native application platform, not merely as another MVC framework.',
]

const topicSignals = [
  {
    title: 'Choose Phoenix when real-time behavior matters',
    body: 'If the application needs live collaboration, dashboards, notifications, presence tracking, streaming updates, or rich interactive behavior without excessive client-side complexity, Phoenix is a strong candidate.',
  },
  {
    title: 'Choose Phoenix when resilience and concurrency are first-class',
    body: 'Teams building systems that benefit from supervised processes, message-passing patterns, and graceful failure isolation often find Phoenix attractive because those ideas fit naturally into the surrounding runtime and framework model.',
  },
  {
    title: 'Choose Phoenix when server-driven UI is desirable',
    body: 'LiveView can be compelling when the team wants interactive UI without committing fully to a separate frontend application architecture for every product surface.',
  },
  {
    title: 'Avoid treating Phoenix as generic web MVC only',
    body: "If a team adopts Phoenix without learning the BEAM, OTP, or process model, it may miss much of the framework's actual value. The framework makes the most sense when its runtime assumptions are part of the design, not just background trivia.",
  },
]

const coreFoundations = [
  {
    title: 'Plug pipelines underneath',
    body: 'Phoenix uses Plug as its HTTP foundation. Requests move through plugs that can parse, authenticate, enrich, redirect, or halt processing before the request reaches the controller or endpoint logic. Understanding plug pipelines is essential for reasoning about Phoenix request flow.',
  },
  {
    title: 'OTP and supervision',
    body: 'Phoenix applications are OTP applications. Supervision trees, long-running processes, worker lifecycles, and fault isolation are not optional advanced trivia; they are part of how robust Phoenix systems are built and operated.',
  },
  {
    title: 'Controllers, routers, and contexts',
    body: 'Phoenix uses routers and controllers for HTTP request handling, but idiomatic applications also often separate broader domain logic into contexts. That helps keep web concerns from becoming the whole architecture.',
  },
  {
    title: 'Channels, PubSub, and LiveView',
    body: 'Real-time messaging and state synchronization are part of the framework story through channels, PubSub, and LiveView. These features allow Phoenix applications to model many interactive problems directly in the backend instead of outsourcing them to a separate stack immediately.',
  },
  {
    title: 'Ecto for data boundaries',
    body: 'Phoenix commonly uses Ecto for database interaction, query composition, and changeset-driven validation. This helps establish clearer boundaries for data access and validation, though teams still need to design those boundaries carefully.',
  },
]

const frameworkFeatures = [
  {
    title: 'Integrated real-time capabilities',
    body: 'Phoenix channels, PubSub, and LiveView are not bolt-on features. They are a core part of why the framework is interesting, because they let applications handle interactive, stateful, and multi-user behavior in a framework-native way.',
  },
  {
    title: 'Strong request pipeline model',
    body: 'Plug pipelines keep request behavior explicit and composable. Authentication, content negotiation, session handling, and request shaping can all be expressed clearly in pipeline stages rather than hidden in global magic.',
  },
  {
    title: 'Contexts encourage boundary-oriented application design',
    body: 'Phoenix applications often organize domain behavior into contexts so that controllers and LiveViews do not become the only place where the application is understood. This can create much healthier boundaries when used consistently.',
  },
  {
    title: 'LiveView supports server-driven interactivity',
    body: 'LiveView lets teams build interactive interfaces with server-managed state and websocket updates while staying inside the Elixir and Phoenix ecosystem. This is a major differentiator for teams that want rich product interaction without a separate SPA architecture everywhere.',
  },
  {
    title: 'OTP alignment improves operational design',
    body: 'Because Phoenix sits naturally in an OTP application, background workers, registries, supervisors, and event-driven internal components can all be managed in a way that feels coherent rather than improvised.',
  },
]

const runtimeAndOperations = [
  {
    title: 'The BEAM shapes runtime behavior',
    body: 'Phoenix applications run in an environment optimized for many lightweight processes, supervision, and resilience. This creates different operational tradeoffs from many traditional web stacks and is part of why Phoenix can feel unusually comfortable under concurrent and real-time workloads.',
  },
  {
    title: 'Stateful interactivity needs lifecycle discipline',
    body: 'Channels and LiveView sessions introduce longer-lived server-side interactions than a simple request-response app. That makes lifecycle management, presence strategy, disconnect behavior, and memory visibility important architectural concerns.',
  },
  {
    title: 'Database and query discipline still matter',
    body: 'Phoenix and Ecto can provide clean abstractions, but real system behavior still depends on query quality, transaction design, preload behavior, and the data model. BEAM concurrency does not remove ordinary persistence bottlenecks.',
  },
  {
    title: 'Observability should include processes and messages',
    body: 'In Phoenix systems, operational understanding often depends on more than HTTP metrics alone. Process supervision, queue behavior, PubSub fan-out, LiveView session behavior, and mailbox pressure can all matter depending on the application design.',
  },
]

const ecosystemUses = [
  {
    title: 'Real-time collaborative applications',
    body: 'Phoenix is especially well known for chat systems, collaboration tools, dashboards, and live data experiences where many connected clients need updates quickly and reliably.',
  },
  {
    title: 'Interactive server-driven products',
    body: 'Applications using LiveView can deliver rich interaction while keeping much of the state and logic on the server, which appeals to teams that want to reduce frontend fragmentation.',
  },
  {
    title: 'APIs and operational control planes',
    body: "Phoenix is also used for more conventional APIs, internal tools, and operational systems where Elixir's reliability model and the framework's structured request handling are still valuable.",
  },
  {
    title: 'Systems that benefit from OTP architecture',
    body: 'If the broader application naturally wants supervisors, background processes, event handling, and internal message passing, Phoenix can be a strong fit because those patterns belong to the surrounding platform already.',
  },
]

const comparisons = [
  {
    title: 'Phoenix versus Rails or Laravel',
    body: 'Rails and Laravel are strong product-oriented frameworks with rich conventions, but Phoenix stands apart because it lives on the BEAM and makes real-time, process-oriented design feel much more native. The difference is not only syntax or scaffolding; it is runtime philosophy.',
  },
  {
    title: 'Phoenix versus Node real-time stacks',
    body: 'Node frameworks can certainly build websocket and real-time systems, but Phoenix often offers a more unified story because concurrency, process isolation, and PubSub-style architecture fit naturally into the runtime and framework model rather than depending on as many external patterns.',
  },
  {
    title: 'Phoenix versus thin HTTP frameworks',
    body: 'Thin frameworks often focus mainly on routes and middleware. Phoenix can do that, but it also provides a stronger application story around contexts, channels, LiveView, and OTP-aligned system structure.',
  },
  {
    title: 'Phoenix versus generic MVC descriptions',
    body: 'Describing Phoenix only as MVC misses a lot of what makes it interesting. Its real distinctiveness comes from process orientation, supervision, real-time primitives, and server-driven interactivity on the BEAM.',
  },
]

const failureModes = [
  {
    title: 'Using only the HTTP layer and ignoring OTP strengths',
    body: 'A team can build ordinary HTTP services in Phoenix, but if it ignores supervision, process design, and the surrounding runtime model entirely, it may miss much of the value that makes the stack distinctive.',
  },
  {
    title: 'Letting controllers or LiveViews become the whole architecture',
    body: 'If controllers or LiveViews contain all the application behavior, boundaries become muddy. Contexts and domain-focused modules still matter even in a highly integrated framework.',
  },
  {
    title: 'Treating LiveView as a shortcut with no tradeoffs',
    body: 'LiveView can be powerful, but it introduces stateful server-side interaction patterns that need careful reasoning about lifecycle, scaling, and UI behavior. It is a real architectural choice, not a free abstraction.',
  },
  {
    title: 'Assuming BEAM resilience removes the need for design',
    body: 'The runtime is strong, but poor database design, weak context boundaries, confused process ownership, or unclear supervision decisions can still create brittle systems. Runtime strengths amplify good architecture; they do not replace it.',
  },
  {
    title: 'Underestimating operational visibility needs',
    body: 'Real-time features, background processes, and message-driven behaviors can make production systems harder to understand if the team only watches ordinary web metrics. Process-level visibility matters.',
  },
]

const studyChecklist = [
  'Understand Phoenix together with Elixir, OTP, and the BEAM rather than as a standalone web framework only.',
  'Learn Plug pipelines and router structure well enough to reason about request flow.',
  'Use contexts to keep domain boundaries explicit beyond controllers and LiveViews.',
  'Treat channels and LiveView as architectural tools with real lifecycle and state tradeoffs.',
  'Design supervision and process ownership intentionally when applications become more concurrent or stateful.',
  'Remember that Ecto and persistence discipline still matter even in a runtime built for resilience.',
]

const examples = [
  {
    id: 'phx98-example-controller',
    title: 'Example: Router to controller action',
    area: 'HTTP Flow',
    intro:
      'A conventional Phoenix route maps an HTTP path to a controller action, with plugs and router pipelines shaping the request before it gets there.',
    whyFit:
      'This shows the ordinary request-response side of Phoenix before moving into its more distinctive real-time features.',
    code: `scope "/api", MyAppWeb do
  pipe_through :api

  get "/orders/:id", OrderController, :show
end`,
    takeaway:
      'Phoenix handles standard HTTP routing cleanly, but it is most interesting when paired with the broader BEAM-native application model around it.',
  },
  {
    id: 'phx98-example-context',
    title: 'Example: Context boundary for domain logic',
    area: 'Architecture',
    intro:
      'Phoenix applications often place domain behavior inside contexts so controllers and LiveViews can call focused domain functions instead of becoming the whole application.',
    whyFit:
      'This reflects one of the most important boundary patterns in larger Phoenix codebases.',
    code: `def get_order!(id) do
  Repo.get!(Order, id)
  |> Repo.preload(:line_items)
end`,
    takeaway:
      'Contexts help keep web-facing modules thin while preserving a clearer domain boundary underneath.',
  },
  {
    id: 'phx98-example-channel',
    title: 'Example: Channel event broadcast',
    area: 'Real-Time Messaging',
    intro:
      'Channels let Phoenix applications push and receive structured events over websockets in a framework-native way. This is one of the features that made Phoenix especially notable for real-time systems.',
    whyFit:
      "This captures the framework's strong native support for interactive multi-client behavior.",
    code: `def handle_in("message:new", payload, socket) do
  broadcast!(socket, "message:new", payload)
  {:noreply, socket}
end`,
    takeaway:
      'Real-time interactions in Phoenix are not an afterthought; they are part of the normal framework model.',
  },
  {
    id: 'phx98-example-liveview',
    title: 'Example: LiveView state update',
    area: 'LiveView',
    intro:
      'LiveView keeps UI state on the server and updates the browser over a persistent connection. This can simplify some product interfaces significantly when server-driven interactivity is a good fit.',
    whyFit: "This illustrates the framework's distinctive server-driven UI capabilities.",
    code: `def handle_event("increment", _params, socket) do
  {:noreply, assign(socket, :count, socket.assigns.count + 1)}
end`,
    takeaway:
      'LiveView can reduce frontend complexity for some applications, but it also makes server-side state and lifecycle management more important.',
  },
  {
    id: 'phx98-example-supervision',
    title: 'Example: Supervised worker process',
    area: 'OTP Design',
    intro:
      'Phoenix applications often rely on supervised workers or background processes as part of the normal system design, not only as deployment details hidden from the app.',
    whyFit:
      'This reflects the OTP-native architecture that makes Phoenix different from many ordinary web frameworks.',
    code: `children = [
  MyApp.Repo,
  {Phoenix.PubSub, name: MyApp.PubSub},
  MyApp.WorkerSupervisor
]`,
    takeaway:
      'Phoenix becomes much more powerful when the team designs with supervised processes and OTP structure intentionally.',
  },
]

const glossary = [
  {
    term: 'Phoenix',
    definition:
      'An Elixir web framework built on Plug and OTP, known for real-time features and BEAM-native architecture.',
  },
  {
    term: 'BEAM',
    definition:
      'The Erlang virtual machine runtime used by Elixir, known for lightweight processes, fault tolerance, and concurrency.',
  },
  {
    term: 'OTP',
    definition:
      'The set of design principles and libraries on the BEAM for building supervised, fault-tolerant systems.',
  },
  {
    term: 'Plug',
    definition:
      'A composable request and response abstraction used as the HTTP foundation for Phoenix applications.',
  },
  {
    term: 'Context',
    definition:
      'A Phoenix application boundary pattern used to group related domain behavior outside controllers or views.',
  },
  {
    term: 'Channel',
    definition:
      "Phoenix's abstraction for real-time websocket communication between server and clients.",
  },
  {
    term: 'LiveView',
    definition:
      'A Phoenix technology for building interactive server-driven user interfaces over persistent connections.',
  },
  {
    term: 'PubSub',
    definition:
      'A publish-subscribe messaging mechanism used in Phoenix for event fan-out and coordination.',
  },
  {
    term: 'Ecto',
    definition:
      'The Elixir data toolkit commonly used with Phoenix for queries, changesets, and persistence boundaries.',
  },
  {
    term: 'Supervisor',
    definition:
      'An OTP process responsible for starting, monitoring, and restarting child processes.',
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
    { id: 'phx98-overview', label: 'Overview' },
    { id: 'phx98-why', label: 'Why It Matters' },
    { id: 'phx98-history', label: 'Historical Context' },
    { id: 'phx98-themes', label: 'Big Picture Themes' },
    { id: 'phx98-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'phx98-signals', label: 'Topic Signals' },
    { id: 'phx98-foundations', label: 'Foundations' },
    { id: 'phx98-features', label: 'Framework Features' },
    { id: 'phx98-runtime', label: 'Runtime and Operations' },
    { id: 'phx98-uses', label: 'Ecosystem Uses' },
    { id: 'phx98-compare', label: 'Compare and Contrast' },
    { id: 'phx98-failures', label: 'Failure Modes' },
    { id: 'phx98-checklist', label: 'Study Checklist' },
  ],
  examples: examples.map((example) => ({ id: example.id, label: example.title })),
  glossary: [{ id: 'phx98-glossary', label: 'Terms' }],
}

export default function PhoenixElixirPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Phoenix (Elixir) (Backend)',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Phoenix (Elixir) (Backend)"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Phoenix (Elixir) (Backend)</h1>
      <p className="phx98-intro">
        This page is a backend-focused overview of Phoenix as an Elixir web framework. It explains
        Plug pipelines, OTP and supervision, contexts, channels, LiveView, Ecto, operational
        tradeoffs, and the architectural discipline needed to keep Phoenix systems clear as they
        grow.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="phx98-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            {overviewSections.map((section) => (
              <div key={section.title}>
                <h3 className="bin98-subheading">{section.title}</h3>
                <p>{section.body}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="phx98-why" className="bin98-section">
            <h2 className="bin98-heading">Why It Matters</h2>
            <ul>
              {whyItMatters.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <hr className="bin98-divider" />

          <section id="phx98-history" className="bin98-section">
            <h2 className="bin98-heading">Historical Context</h2>
            {historicalContext.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="phx98-themes" className="bin98-section">
            <h2 className="bin98-heading">Big Picture Themes</h2>
            {bigPictureThemes.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="phx98-takeaways" className="bin98-section">
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
          <section id="phx98-signals" className="bin98-section">
            <h2 className="bin98-heading">Topic Signals</h2>
            {topicSignals.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="phx98-foundations" className="bin98-section">
            <h2 className="bin98-heading">Foundations</h2>
            {coreFoundations.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="phx98-features" className="bin98-section">
            <h2 className="bin98-heading">Framework Features</h2>
            {frameworkFeatures.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="phx98-runtime" className="bin98-section">
            <h2 className="bin98-heading">Runtime and Operations</h2>
            {runtimeAndOperations.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="phx98-uses" className="bin98-section">
            <h2 className="bin98-heading">Ecosystem Uses</h2>
            {ecosystemUses.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="phx98-compare" className="bin98-section">
            <h2 className="bin98-heading">Compare and Contrast</h2>
            {comparisons.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="phx98-failures" className="bin98-section">
            <h2 className="bin98-heading">Failure Modes</h2>
            {failureModes.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </section>

          <section id="phx98-checklist" className="bin98-section">
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
        <section id="phx98-glossary" className="bin98-section">
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
