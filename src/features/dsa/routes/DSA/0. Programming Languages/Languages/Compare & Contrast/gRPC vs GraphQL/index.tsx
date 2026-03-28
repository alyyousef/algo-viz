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
  'gRPC and GraphQL are often compared, but they are not perfect substitutes. gRPC is primarily a strongly typed RPC framework and transport contract system. GraphQL is primarily a client query language and schema-driven API model. They solve different layers of the communication problem, which is why many real systems use both together.',
  'The useful comparison is about interface style, transport assumptions, client needs, type systems, streaming patterns, public API ergonomics, and operational behavior. gRPC is usually strongest for service-to-service contracts and internal platform communication. GraphQL is usually strongest for client-facing data aggregation and flexible reads.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'gRPC is built around remote procedure calls defined in protocol buffers. The contract is explicit, strongly typed, and code generation is central to the workflow. It is optimized for structured service communication, especially in internal distributed systems.',
      'GraphQL is built around a schema and client-defined queries. Clients ask for the exact fields they need, and the server resolves those fields from underlying data sources. It is optimized for flexible client reads rather than raw transport efficiency.',
    ],
  },
  {
    id: 'bp-not-direct-substitutes',
    title: 'They Are Not Direct Substitutes',
    paragraphs: [
      'A REST versus GraphQL comparison is often about two different ways to expose a client-facing API. A gRPC versus GraphQL comparison is different because gRPC is frequently used behind the scenes between services, while GraphQL is often used at the edge for web and mobile clients.',
      'That means the right question is not Which one is better for everything. The right question is Which problem are you solving. If the goal is efficient typed service contracts, gRPC is often the stronger tool. If the goal is flexible product-facing query shapes, GraphQL is often the stronger tool.',
    ],
  },
  {
    id: 'bp-when-grpc-fits',
    title: 'When gRPC Is Usually the Better Fit',
    paragraphs: [
      'gRPC is usually the better fit for internal service-to-service communication, backend platform APIs, and systems where strong contracts, code generation, streaming, and efficient binary transport matter. It is especially attractive when many services are written in different languages but need to share precise contracts.',
      'It is commonly used in microservice environments, internal platform layers, latency-sensitive service meshes, and systems that benefit from unary and streaming RPC patterns.',
    ],
    bullets: [
      'Internal APIs between services and infrastructure components.',
      'Typed contracts with generated clients and servers.',
      'Streaming use cases and long-lived bidirectional communication.',
      'Environments where bandwidth efficiency and low overhead matter.',
    ],
  },
  {
    id: 'bp-when-graphql-fits',
    title: 'When GraphQL Is Usually the Better Fit',
    paragraphs: [
      'GraphQL is usually the better fit for client-facing product surfaces where different screens need different fields and where the UI should be able to fetch a connected graph of data without coordinating many endpoints. It excels as an aggregation layer over multiple backend services.',
      'It is commonly used for web applications, mobile apps, admin consoles, dashboards, and developer-facing APIs where typed introspection and flexible query shapes improve client productivity.',
    ],
    bullets: [
      'Many frontends with different data requirements.',
      'UI-heavy products with rapidly changing read patterns.',
      'Aggregation across several backend sources.',
      'A schema-first client experience with query validation and introspection.',
    ],
  },
  {
    id: 'bp-when-both-fit',
    title: 'When Both Fit Together',
    paragraphs: [
      'A common architecture uses GraphQL at the edge and gRPC behind it. The GraphQL layer becomes a client-facing composition surface while internal services speak gRPC to each other. This keeps internal contracts efficient and typed while giving clients a flexible query interface.',
      'This mixed approach is often the most pragmatic answer because it recognizes that internal service communication and external product-facing data access do not have the same requirements.',
    ],
  },
  {
    id: 'bp-decision-checklist',
    title: 'Decision Checklist',
    paragraphs: [
      'Choose based on consumer shape and system boundaries. gRPC is more about how services talk to services. GraphQL is more about how clients ask for data. Once that is clear, the comparison becomes much less ideological.',
    ],
    bullets: [
      'Choose gRPC when internal typed RPC contracts are the main need.',
      'Choose GraphQL when flexible client-driven reads are the main need.',
      'Choose gRPC when streaming and code-generated service contracts matter.',
      'Choose GraphQL when schema introspection and payload shaping matter.',
      'Use both when a client-facing graph sits on top of internal service APIs.',
    ],
  },
]

const coreConceptSectionsBase: ContentSection[] = [
  {
    id: 'core-mental-model',
    title: 'Mental Model',
    paragraphs: [
      'gRPC models communication as named procedures with request and response messages. The consumer typically knows the method it wants to call and the exact message types involved. This resembles calling a typed function across the network.',
      'GraphQL models communication as a graph of types and fields. The consumer asks for data by shape rather than calling a narrowly named method for every view. This changes the center of gravity from RPC endpoints to schema design and resolver behavior.',
    ],
  },
  {
    id: 'core-contract-model',
    title: 'Contract Model',
    paragraphs: [
      'gRPC contracts are defined in protocol buffers. Messages and services are explicit, language-agnostic, and usually consumed through generated code. The contract tends to feel rigid in a good way: strongly typed, structured, and hard to misunderstand.',
      'GraphQL contracts are defined in a schema of types, fields, arguments, and operations. The contract is also typed, but it is optimized for query flexibility rather than fixed RPC shapes. Clients can often request many different valid response structures against the same schema.',
    ],
  },
  {
    id: 'core-transport-protocol',
    title: 'Transport and Protocol',
    paragraphs: [
      'gRPC is most associated with HTTP/2 and binary protobuf payloads. That usually gives it strong performance characteristics and built-in support for streaming patterns. It is a transport-aware solution rather than just a schema language.',
      'GraphQL is transport-agnostic in theory, but in practice it is commonly delivered over HTTP with JSON payloads. Its strength is not transport efficiency. Its strength is the client-facing query model.',
    ],
  },
  {
    id: 'core-consumer-model',
    title: 'Consumer Model',
    paragraphs: [
      'gRPC assumes a consumer that is comfortable with generated clients, typed stubs, and explicit method calls. This is ideal inside backend systems where services are deployed by engineers who can share tooling and code generation workflows.',
      'GraphQL assumes a consumer that wants to ask for fields, not necessarily learn a large set of endpoint-specific payload shapes. This is ideal for frontend teams that build many screens and want the UI to control the exact response structure it receives.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance Profile',
    paragraphs: [
      'gRPC usually has the advantage in raw transport efficiency. Binary serialization, compact message formats, and efficient internal communication patterns make it a natural choice for high-volume service traffic and low-latency internal calls.',
      'GraphQL can reduce client round trips and over-fetching, which is a different kind of performance win. But the server must execute field resolution and aggregation carefully, or flexibility can turn into hidden backend cost.',
    ],
    bullets: [
      'gRPC usually wins on transport efficiency and internal throughput.',
      'GraphQL often wins on client payload precision and API ergonomics.',
      'gRPC performance issues are often about network and service boundaries.',
      'GraphQL performance issues are often about resolver design and query cost.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  ...coreConceptSectionsBase,
  {
    id: 'core-streaming',
    title: 'Streaming and Realtime Patterns',
    paragraphs: [
      'gRPC has first-class support for unary, server-streaming, client-streaming, and bidirectional streaming RPCs. This makes it attractive for telemetry flows, event pipelines, and service communication patterns that go beyond one request and one response.',
      'GraphQL can support realtime patterns through subscriptions and related mechanisms, but that is not the same thing as gRPC streaming. The strengths are different: GraphQL subscriptions are about client-facing data updates, while gRPC streaming is often about efficient service communication.',
    ],
  },
  {
    id: 'core-browser-fit',
    title: 'Browser and Public API Fit',
    paragraphs: [
      'gRPC is excellent internally, but it is not as naturally browser-friendly as ordinary JSON-over-HTTP APIs. That does not make it unusable, but it does mean it is less often the first choice for broad public consumption by web clients.',
      'GraphQL is designed with client-facing consumption in mind. It integrates naturally with frontend tooling, typed clients, and UI data-fetching workflows. This is one reason GraphQL is far more common than gRPC as the edge API for browser and mobile applications.',
    ],
  },
  {
    id: 'core-errors-governance',
    title: 'Error Handling and Governance',
    paragraphs: [
      'gRPC uses structured status codes and typed message contracts. This often makes failures predictable within service ecosystems, especially when client stubs and interceptors are standardized across teams.',
      'GraphQL commonly returns data and errors together. That is powerful for partial success, but it requires thoughtful client handling and field-level authorization. Governance tends to focus on schema quality, resolver ownership, query limits, and deprecation discipline.',
    ],
  },
  {
    id: 'core-tooling',
    title: 'Tooling and Code Generation',
    paragraphs: [
      'gRPC leans heavily on code generation. Proto files define the contract, and generated clients and servers create a precise workflow across languages. This is often a major strength in platform engineering and large polyglot systems.',
      'GraphQL also supports code generation, but the workflow is different. Instead of generating RPC stubs, teams often generate typed client queries, schema types, and resolver scaffolding. The codegen value is real, but it is optimized for schema-driven clients rather than RPC calls.',
    ],
  },
  {
    id: 'core-architecture-guidance',
    title: 'Architecture Guidance',
    paragraphs: [
      'If the problem is internal service communication, gRPC is often the stronger default. If the problem is client-facing data access across many screens and many entities, GraphQL is often the stronger default.',
      'If the system needs both, do not force one tool to act like the other. Let gRPC own internal typed contracts and let GraphQL own client-facing aggregation. That separation usually reflects the real boundary in the architecture.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-grpc-proto',
    title: 'gRPC Service Contract',
    description: [
      'A gRPC API begins with an explicit service and message contract in a proto file. Code generation then produces clients and servers in the target language.',
    ],
    code: `service UserService {
  rpc GetUser (GetUserRequest) returns (UserResponse);
}

message GetUserRequest {
  string id = 1;
}

message UserResponse {
  string id = 1;
  string name = 2;
}`,
    notes: [
      'The contract is explicit, compact, and strongly typed.',
      'Generated code is part of the normal workflow.',
      'This is ideal when services should feel like typed RPC consumers.',
    ],
  },
  {
    id: 'examples-graphql-query',
    title: 'GraphQL Client Query',
    description: [
      'A GraphQL client asks for the exact fields it needs. The same schema can serve many screens with different shapes of data.',
    ],
    code: `query UserCard {
  user(id: "42") {
    id
    name
    team {
      id
      name
    }
  }
}`,
    notes: [
      'The client chooses the shape of the response.',
      'This is attractive when UI views vary a lot in what they need.',
      'The server must still govern query cost and resolver behavior carefully.',
    ],
  },
  {
    id: 'examples-grpc-streaming',
    title: 'gRPC Streaming Shape',
    description: [
      'gRPC supports streaming patterns directly in the contract. That is a major differentiator for internal communication patterns that go beyond request and response.',
    ],
    code: `service MetricsService {
  rpc StreamMetrics (MetricsRequest) returns (stream MetricPoint);
}`,
    notes: [
      'Streaming is a first-class part of the model.',
      'This is often valuable for telemetry, events, and long-lived service flows.',
    ],
  },
  {
    id: 'examples-graphql-bff',
    title: 'GraphQL Over gRPC Backends',
    description: [
      'A common pattern is to place GraphQL at the edge and have its resolvers call gRPC services internally. This gives clients a flexible query surface while preserving strong internal service contracts.',
    ],
    code: `Web Client
   |
GraphQL Gateway
   |---- gRPC User Service
   |---- gRPC Billing Service
   |---- gRPC Catalog Service`,
    notes: [
      'This is often the most pragmatic architecture when both tools are relevant.',
      'GraphQL owns client shaping while gRPC owns internal service contracts.',
      'The gateway must still manage batching, authorization, and resolver cost.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-grpc',
    title: 'gRPC Terms',
    terms: [
      {
        term: 'Protocol Buffers',
        definition:
          'A language-neutral serialization format and IDL commonly used to define gRPC contracts.',
      },
      {
        term: 'Unary RPC',
        definition: 'A single request followed by a single response.',
      },
      {
        term: 'Streaming RPC',
        definition:
          'A gRPC pattern where one or both sides exchange a stream of messages over time.',
      },
      {
        term: 'Stub',
        definition:
          'Generated client code used to call a remote gRPC service as if it were a local API.',
      },
    ],
  },
  {
    id: 'glossary-graphql',
    title: 'GraphQL Terms',
    terms: [
      {
        term: 'Schema',
        definition: 'The typed contract that defines GraphQL operations, fields, and types.',
      },
      {
        term: 'Resolver',
        definition: 'The server-side function that computes a GraphQL field or operation.',
      },
      {
        term: 'Query',
        definition: 'A GraphQL read operation used to fetch data.',
      },
      {
        term: 'Subscription',
        definition: 'A GraphQL mechanism for pushing updates to subscribed clients.',
      },
    ],
  },
  {
    id: 'glossary-shared',
    title: 'Shared Architecture Terms',
    terms: [
      {
        term: 'Code Generation',
        definition:
          'Producing typed code from a schema or interface definition instead of writing all integration code by hand.',
      },
      {
        term: 'Aggregation Layer',
        definition:
          'A layer that composes data from several backend services into one consumer-facing interface.',
      },
      {
        term: 'Schema Governance',
        definition:
          'The process of reviewing, evolving, deprecating, and documenting an API schema over time.',
      },
      {
        term: 'Polyglot System',
        definition: 'A system where services are implemented in multiple programming languages.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-not-direct-substitutes', label: 'Not Direct Substitutes' },
    { id: 'bp-when-grpc-fits', label: 'When gRPC Fits' },
    { id: 'bp-when-graphql-fits', label: 'When GraphQL Fits' },
    { id: 'bp-when-both-fit', label: 'When Both Fit' },
    { id: 'bp-decision-checklist', label: 'Decision Checklist' },
  ],
  'core-concepts': [
    { id: 'core-mental-model', label: 'Mental Model' },
    { id: 'core-contract-model', label: 'Contract Model' },
    { id: 'core-transport-protocol', label: 'Transport and Protocol' },
    { id: 'core-consumer-model', label: 'Consumer Model' },
    { id: 'core-performance', label: 'Performance Profile' },
    { id: 'core-streaming', label: 'Streaming and Realtime Patterns' },
    { id: 'core-browser-fit', label: 'Browser and Public API Fit' },
    { id: 'core-errors-governance', label: 'Error Handling and Governance' },
    { id: 'core-tooling', label: 'Tooling and Code Generation' },
    { id: 'core-architecture-guidance', label: 'Architecture Guidance' },
  ],
  examples: [
    { id: 'examples-grpc-proto', label: 'gRPC Service Contract' },
    { id: 'examples-graphql-query', label: 'GraphQL Client Query' },
    { id: 'examples-grpc-streaming', label: 'gRPC Streaming Shape' },
    { id: 'examples-graphql-bff', label: 'GraphQL Over gRPC Backends' },
  ],
  glossary: [
    { id: 'glossary-grpc', label: 'gRPC Terms' },
    { id: 'glossary-graphql', label: 'GraphQL Terms' },
    { id: 'glossary-shared', label: 'Shared Architecture Terms' },
  ],
}

const pageStyles = `
.grpc-graphql-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.grpc-graphql-help-window {
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

.grpc-graphql-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  min-height: 24px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.grpc-graphql-help-titletext {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  font-size: 15px;
}

.grpc-graphql-help-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.grpc-graphql-help-control {
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

.grpc-graphql-help-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.grpc-graphql-help-tab {
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

.grpc-graphql-help-tab-active {
  background: #fff;
  position: relative;
  top: 1px;
}

.grpc-graphql-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  border-top: 1px solid #404040;
  background: #fff;
}

.grpc-graphql-help-toc {
  overflow: auto;
  padding: 12px;
  background: #efefef;
  border-right: 1px solid #808080;
}

.grpc-graphql-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.grpc-graphql-help-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.grpc-graphql-help-toc-item {
  margin: 0 0 8px;
}

.grpc-graphql-help-toc-link {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.grpc-graphql-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.grpc-graphql-help-doc-title {
  margin: 0 0 10px;
  font-size: 20px;
  font-weight: 700;
}

.grpc-graphql-help-section {
  margin: 0 0 20px;
}

.grpc-graphql-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.grpc-graphql-help-content p,
.grpc-graphql-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.grpc-graphql-help-content p {
  margin: 0 0 10px;
}

.grpc-graphql-help-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.grpc-graphql-help-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.grpc-graphql-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.grpc-graphql-help-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .grpc-graphql-help-main {
    grid-template-columns: 1fr;
  }

  .grpc-graphql-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 640px) {
  .grpc-graphql-help-page {
    min-height: auto;
  }

  .grpc-graphql-help-window {
    min-height: auto;
  }

  .grpc-graphql-help-titlebar {
    padding-top: 4px;
    padding-bottom: 4px;
  }

  .grpc-graphql-help-titletext {
    position: static;
    transform: none;
    margin: 0 auto;
    padding-left: 20px;
    padding-right: 20px;
    text-align: center;
    white-space: normal;
  }
}
`

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
    <section key={section.id} id={section.id} className="grpc-graphql-help-section">
      <h2 className="grpc-graphql-help-heading">{section.title}</h2>
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
      {isLast ? null : <hr className="grpc-graphql-help-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="grpc-graphql-help-section">
      <h2 className="grpc-graphql-help-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="grpc-graphql-help-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="grpc-graphql-help-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="grpc-graphql-help-section">
      <h2 className="grpc-graphql-help-heading">{section.title}</h2>
      {section.terms.map((item) => (
        <p key={item.term}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="grpc-graphql-help-divider" />}
    </section>
  )
}

export default function GrpcVsGraphqlPage(): JSX.Element {
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
    document.title = `gRPC vs GraphQL (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'gRPC vs GraphQL',
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
    <div className="grpc-graphql-help-page">
      <style>{pageStyles}</style>
      <div className="grpc-graphql-help-window" role="presentation">
        <header className="grpc-graphql-help-titlebar">
          <span className="grpc-graphql-help-titletext">gRPC vs GraphQL</span>
          <div className="grpc-graphql-help-controls">
            <button
              className="grpc-graphql-help-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="grpc-graphql-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="grpc-graphql-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`grpc-graphql-help-tab ${activeTab === tab.id ? 'grpc-graphql-help-tab-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grpc-graphql-help-main">
          <aside className="grpc-graphql-help-toc" aria-label="Table of contents">
            <h2 className="grpc-graphql-help-toc-title">Contents</h2>
            <ul className="grpc-graphql-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id} className="grpc-graphql-help-toc-item">
                  <a href={`#${section.id}`} className="grpc-graphql-help-toc-link">
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="grpc-graphql-help-content">
            <h1 className="grpc-graphql-help-doc-title">gRPC vs GraphQL</h1>
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
