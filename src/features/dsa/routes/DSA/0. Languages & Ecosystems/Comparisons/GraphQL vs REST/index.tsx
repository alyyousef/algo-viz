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
  'GraphQL and REST both solve the same broad problem: exposing data and behavior over an API boundary. The real comparison is not modern versus legacy. It is a comparison between two interface models with different tradeoffs in payload control, HTTP semantics, caching, tooling, and governance.',
  'REST treats the API as a set of addressable resources with standard HTTP behavior. GraphQL treats the API as a strongly typed graph that clients query for exactly the fields they need. Both can be excellent. The better fit depends on the domain shape, the number of clients, the cost of over-fetching and under-fetching, and the amount of server-side complexity the team is willing to own.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'REST is an architectural style centered on resources, URLs, HTTP verbs, status codes, caching headers, and predictable web semantics. It works best when resources map cleanly to the domain and when infrastructure such as gateways, CDNs, proxies, and observability tooling should understand the API naturally.',
      'GraphQL is a query language and runtime for APIs. Clients ask for the exact shape of data they need against a schema. This is attractive when different screens need different slices of the same domain model or when a frontend would otherwise require many custom endpoints to assemble one view.',
    ],
  },
  {
    id: 'bp-shared-goals',
    title: 'What They Are Both Trying to Do',
    paragraphs: [
      'Both approaches expose operations and data across a network boundary. Both can support authentication, pagination, filtering, validation, rate limiting, caching, and strong documentation. Neither guarantees a good API on its own. Design discipline still matters.',
      'The meaningful difference is where complexity lives. REST usually keeps infrastructure and protocol behavior simpler. GraphQL usually gives clients more control, but that shifts complexity into schema governance, resolver performance, and query safety.',
    ],
    bullets: [
      'Both can serve internal and external consumers.',
      'Both can be typed, tested, documented, and versioned sensibly.',
      'Both can become difficult if ownership and conventions are weak.',
      'Both can coexist in the same architecture.',
    ],
  },
  {
    id: 'bp-when-rest-fits',
    title: 'When REST Is Usually the Better Fit',
    paragraphs: [
      'REST is usually the better fit when the domain already looks like resources, when HTTP should remain the main abstraction, and when simple operational behavior matters more than flexible client-driven reads. It is often the safer default for public APIs and partner integrations.',
      'It is especially strong for CRUD-heavy systems, file and media workflows, stable service APIs, and environments where teams want ordinary HTTP tools to remain enough for debugging and operations.',
    ],
    bullets: [
      'Clear resource boundaries and mostly stable payloads.',
      'Heavy use of HTTP caching and CDN behavior.',
      'Broad interoperability with external consumers and tooling.',
      'A preference for simple server and gateway behavior.',
    ],
  },
  {
    id: 'bp-when-graphql-fits',
    title: 'When GraphQL Is Usually the Better Fit',
    paragraphs: [
      'GraphQL is usually the better fit when clients need flexible reads across related entities, when multiple frontends need different field combinations, or when product teams are slowed down by endpoint sprawl. It shines as a client-facing aggregation surface.',
      'It is especially useful for dashboards, admin consoles, mobile products, and rich application surfaces where many views share the same data model but need different shapes of that data.',
    ],
    bullets: [
      'Many clients with different read requirements.',
      'Nested reads across several related entities.',
      'Rapid UI iteration and frequent payload shape changes.',
      'A willingness to invest in schema governance and resolver performance.',
    ],
  },
  {
    id: 'bp-decision-checklist',
    title: 'Decision Checklist',
    paragraphs: [
      'Choose based on where you want complexity to live. REST usually keeps the server and infrastructure model more obvious. GraphQL usually gives clients more power, but that power must be governed carefully.',
    ],
    bullets: [
      'Choose REST when resource boundaries are clear and query flexibility is not your main pain point.',
      'Choose GraphQL when over-fetching, under-fetching, and endpoint proliferation are product-level problems.',
      'Choose REST when plain HTTP semantics and infrastructure-native caching matter a lot.',
      'Choose GraphQL when one typed graph can replace many bespoke read endpoints.',
      'Use both when public integrations benefit from REST and internal product clients benefit from GraphQL.',
    ],
  },
]

const coreConceptSectionsBase: ContentSection[] = [
  {
    id: 'core-mental-model',
    title: 'Mental Model',
    paragraphs: [
      'REST models an API as resources reachable through URLs. Clients operate on those resources through standard HTTP methods such as GET, POST, PATCH, and DELETE. The route and method together express the contract.',
      'GraphQL models an API as a schema of types and fields. Clients submit queries and mutations, and the server resolves a graph of related fields. The schema rather than the endpoint map becomes the central contract.',
    ],
  },
  {
    id: 'core-payload-shape',
    title: 'Payload Shape and Client Control',
    paragraphs: [
      'REST endpoints usually return a fixed or mostly fixed representation. That keeps behavior predictable, documentation concrete, and infrastructure simple. The downside appears when several screens need only slightly different subsets of the same resource.',
      'GraphQL lets clients request exactly the fields they need. That can reduce payload waste and cut down on custom endpoints, but it also means the server must safely execute many possible shapes of work.',
    ],
  },
  {
    id: 'core-endpoints-vs-schema',
    title: 'Endpoints Versus Schema',
    paragraphs: [
      'In REST, endpoint design is the contract. Naming, nesting, pagination, filtering conventions, verbs, and status codes all matter. A good REST API is often a well-governed URL space.',
      'In GraphQL, the schema is the contract. Type names, field names, nullability, arguments, pagination patterns, and mutation shapes determine whether the API will stay coherent as it grows.',
    ],
  },
  {
    id: 'core-caching',
    title: 'Caching and Performance',
    paragraphs: [
      'REST aligns naturally with HTTP caching. GET requests, ETags, cache-control headers, and CDNs can often work without application-specific knowledge. That makes REST operationally elegant for many read-heavy APIs.',
      'GraphQL can perform very well, but it usually requires more application-aware caching. Teams often cache at the object, field, resolver, or persisted-query level. The main risk is resolver waterfalls and N plus 1 behavior if batching is not designed carefully.',
    ],
    bullets: [
      'REST usually wins on infrastructure-native caching.',
      'GraphQL often wins on query flexibility and payload efficiency.',
      'GraphQL performance depends heavily on resolver design and batching.',
      'REST performance depends heavily on endpoint shape and client call patterns.',
    ],
  },
  {
    id: 'core-versioning',
    title: 'Versioning and Evolution',
    paragraphs: [
      'REST teams often version at the URL, header, or media-type level. The mechanics vary, but the underlying idea is that breaking changes often require a new contract. This is straightforward, though it can create duplication.',
      'GraphQL often evolves by adding fields and deprecating old ones rather than versioning the whole API. That can be smoother for clients, but only if the schema is actively governed and deprecated fields are eventually retired.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  ...coreConceptSectionsBase,
  {
    id: 'core-errors',
    title: 'Error Handling',
    paragraphs: [
      'REST uses HTTP status codes as the first layer of meaning. This is a major strength because clients, proxies, monitoring tools, and humans all understand those semantics immediately. A 404, 401, or 429 already says a lot before the body is read.',
      'GraphQL commonly returns application-level errors alongside data in a successful HTTP response. That supports partial success and field-level failure, but it also means clients and observability tooling must understand a more nuanced response model.',
    ],
  },
  {
    id: 'core-security-governance',
    title: 'Security, Authorization, and Governance',
    paragraphs: [
      'REST security often maps cleanly to routes and verbs. Rate limiting, audit rules, authorization middleware, and gateway policies can be attached at predictable boundaries. This is one reason REST remains attractive for public and partner-facing APIs.',
      'GraphQL centralizes access through a small number of endpoints, so route-level controls are not enough. Authorization often needs to be enforced at the operation, field, or resolver level. Query depth limits, cost analysis, persisted queries, and abuse protection become first-class concerns.',
    ],
  },
  {
    id: 'core-tooling',
    title: 'Tooling and Developer Experience',
    paragraphs: [
      'REST benefits from the universality of HTTP. Curl, browsers, gateways, proxies, logs, and API testing tools all work naturally. The cognitive model is familiar to almost every engineering team.',
      'GraphQL offers a different advantage: schema introspection, typed client generation, query validation, and close frontend-backend contracts. For product teams building many screens, those benefits can materially speed up UI development once the schema is healthy.',
    ],
  },
  {
    id: 'core-org-fit',
    title: 'Team and Organization Fit',
    paragraphs: [
      'REST tends to fit organizations that value broad interoperability, low conceptual overhead, and API boundaries that many teams can consume with ordinary HTTP knowledge. It is often the safer organizational default.',
      'GraphQL tends to fit organizations with strong schema governance, mature frontend platforms, and a willingness to treat the schema as a product. It rewards teams that will invest in operational discipline around the query layer.',
    ],
  },
  {
    id: 'core-architecture-guidance',
    title: 'Architecture Guidance',
    paragraphs: [
      'REST is often the best default for simple services, public integrations, and systems where HTTP itself should remain the primary abstraction. GraphQL is often the best fit for aggregation layers and product-facing data graphs where payload flexibility is worth the extra server complexity.',
      'A mixed architecture is common and often sensible. Internal services may remain RESTful while a GraphQL layer aggregates and shapes that data for web and mobile clients. This keeps service contracts simple while giving product teams a more expressive read interface.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-rest-resource',
    title: 'REST Resource Design',
    description: [
      'A REST API typically exposes separate endpoints for separate resources. The shape is easy to understand through ordinary HTTP semantics, and each route can be cached, secured, and observed independently.',
    ],
    code: `GET /users/42
GET /users/42/posts
POST /posts
PATCH /posts/99
DELETE /posts/99`,
    notes: [
      'The contract is distributed across URLs, verbs, status codes, and payload formats.',
      'This works well when resource boundaries are stable and intuitive.',
      'The drawback appears when clients need highly customized combinations of related data.',
    ],
  },
  {
    id: 'examples-graphql-query',
    title: 'GraphQL Query Shape',
    description: [
      'A GraphQL query asks for exactly the fields needed by the client. The response mirrors the query shape, which makes UI data dependencies explicit and often reduces payload waste.',
    ],
    code: `query GetUserProfile {
  user(id: "42") {
    id
    name
    posts(limit: 3) {
      title
      publishedAt
    }
  }
}`,
    notes: [
      'One query can replace several endpoint calls when the client needs a connected graph.',
      'The response shape is client driven rather than endpoint driven.',
      'Resolver performance must be designed carefully to avoid hidden N plus 1 work.',
    ],
  },
  {
    id: 'examples-rest-error',
    title: 'REST Error Semantics',
    description: [
      'REST uses HTTP status codes as the outer protocol contract. That gives infrastructure and clients immediate standardized meaning before any JSON body is inspected.',
    ],
    code: `HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "error": "user_not_found",
  "message": "No user exists with id 42"
}`,
    notes: [
      'Status codes are a major strength of REST because every layer in the stack understands them.',
      'Error bodies can still be domain specific, but the protocol meaning remains universal.',
    ],
  },
  {
    id: 'examples-graphql-schema',
    title: 'GraphQL Schema Contract',
    description: [
      'In GraphQL, the schema is the main contract. It defines what can be queried, which arguments are accepted, and what structure the client can expect back.',
    ],
    code: `type Query {
  user(id: ID!): User
}

type User {
  id: ID!
  name: String!
  posts(limit: Int = 10): [Post!]!
}

type Post {
  id: ID!
  title: String!
  publishedAt: String!
}`,
    notes: [
      'The schema becomes the artifact teams review, govern, and evolve.',
      'Schema quality directly affects client productivity and server maintainability.',
    ],
  },
  {
    id: 'examples-mixed-architecture',
    title: 'Common Mixed Architecture',
    description: [
      'Many teams do not choose one approach everywhere. A common pattern is to keep internal services simple and resource oriented while exposing a GraphQL aggregation layer to product clients.',
    ],
    code: `Web Client
   |
GraphQL Gateway
   |---- REST User Service
   |---- REST Billing Service
   |---- REST Catalog Service`,
    notes: [
      'This keeps internal service boundaries operationally simple.',
      'The GraphQL layer becomes a client-facing composition surface.',
      'The gateway must own resolver performance, authorization, and schema governance.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-api',
    title: 'API Modeling Terms',
    terms: [
      {
        term: 'Resource',
        definition: 'A domain entity or collection addressed through a URL in a REST-style API.',
      },
      {
        term: 'Representation',
        definition: 'The serialized form of a resource returned to a client, usually JSON.',
      },
      {
        term: 'Schema',
        definition:
          'The typed contract that defines fields, types, and operations in a GraphQL API.',
      },
      {
        term: 'Resolver',
        definition: 'The server-side function that computes a GraphQL field or operation result.',
      },
      {
        term: 'Mutation',
        definition: 'A GraphQL operation used for writes or side-effecting behavior.',
      },
    ],
  },
  {
    id: 'glossary-http',
    title: 'HTTP and REST Terms',
    terms: [
      {
        term: 'HTTP Verb',
        definition: 'The request method such as GET, POST, PUT, PATCH, or DELETE.',
      },
      {
        term: 'Status Code',
        definition: 'The numeric HTTP response code that communicates protocol-level outcome.',
      },
      {
        term: 'ETag',
        definition: 'A response validator used for cache validation and conditional requests.',
      },
      {
        term: 'Cache-Control',
        definition:
          'An HTTP header that communicates caching behavior to clients and intermediaries.',
      },
      {
        term: 'Idempotent',
        definition:
          'A property where repeating the same request has the same effect as performing it once.',
      },
    ],
  },
  {
    id: 'glossary-graphql',
    title: 'GraphQL Terms',
    terms: [
      {
        term: 'Introspection',
        definition:
          'The ability to query the schema itself to discover available types and fields.',
      },
      {
        term: 'Over-Fetching',
        definition: 'Receiving more data than the client actually needs.',
      },
      {
        term: 'Under-Fetching',
        definition:
          'Needing multiple calls because one response does not include enough related data.',
      },
      {
        term: 'N Plus 1 Problem',
        definition:
          'A performance issue where nested GraphQL field resolution causes many redundant backend calls.',
      },
      {
        term: 'Persisted Query',
        definition:
          'A pre-registered query identifier used to improve safety, performance, or caching behavior.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-shared-goals', label: 'Shared Goals' },
    { id: 'bp-when-rest-fits', label: 'When REST Fits' },
    { id: 'bp-when-graphql-fits', label: 'When GraphQL Fits' },
    { id: 'bp-decision-checklist', label: 'Decision Checklist' },
  ],
  'core-concepts': [
    { id: 'core-mental-model', label: 'Mental Model' },
    { id: 'core-payload-shape', label: 'Payload Shape and Client Control' },
    { id: 'core-endpoints-vs-schema', label: 'Endpoints Versus Schema' },
    { id: 'core-caching', label: 'Caching and Performance' },
    { id: 'core-versioning', label: 'Versioning and Evolution' },
    { id: 'core-errors', label: 'Error Handling' },
    { id: 'core-security-governance', label: 'Security and Governance' },
    { id: 'core-tooling', label: 'Tooling and Developer Experience' },
    { id: 'core-org-fit', label: 'Team and Organization Fit' },
    { id: 'core-architecture-guidance', label: 'Architecture Guidance' },
  ],
  examples: [
    { id: 'examples-rest-resource', label: 'REST Resource Design' },
    { id: 'examples-graphql-query', label: 'GraphQL Query Shape' },
    { id: 'examples-rest-error', label: 'REST Error Semantics' },
    { id: 'examples-graphql-schema', label: 'GraphQL Schema Contract' },
    { id: 'examples-mixed-architecture', label: 'Mixed Architecture' },
  ],
  glossary: [
    { id: 'glossary-api', label: 'API Modeling Terms' },
    { id: 'glossary-http', label: 'HTTP and REST Terms' },
    { id: 'glossary-graphql', label: 'GraphQL Terms' },
  ],
}

const pageStyles = `
.graphql-rest-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.graphql-rest-help-window {
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

.graphql-rest-help-titlebar {
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

.graphql-rest-help-titletext {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  font-size: 15px;
}

.graphql-rest-help-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.graphql-rest-help-control {
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

.graphql-rest-help-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.graphql-rest-help-tab {
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

.graphql-rest-help-tab-active {
  background: #fff;
  position: relative;
  top: 1px;
}

.graphql-rest-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  border-top: 1px solid #404040;
  background: #fff;
}

.graphql-rest-help-toc {
  overflow: auto;
  padding: 12px;
  background: #efefef;
  border-right: 1px solid #808080;
}

.graphql-rest-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.graphql-rest-help-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.graphql-rest-help-toc-item {
  margin: 0 0 8px;
}

.graphql-rest-help-toc-link {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.graphql-rest-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.graphql-rest-help-doc-title {
  margin: 0 0 10px;
  font-size: 20px;
  font-weight: 700;
}

.graphql-rest-help-section {
  margin: 0 0 20px;
}

.graphql-rest-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.graphql-rest-help-content p,
.graphql-rest-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.graphql-rest-help-content p {
  margin: 0 0 10px;
}

.graphql-rest-help-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.graphql-rest-help-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.graphql-rest-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.graphql-rest-help-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .graphql-rest-help-main {
    grid-template-columns: 1fr;
  }

  .graphql-rest-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 640px) {
  .graphql-rest-help-page {
    min-height: auto;
  }

  .graphql-rest-help-window {
    min-height: auto;
  }

  .graphql-rest-help-titlebar {
    padding-top: 4px;
    padding-bottom: 4px;
  }

  .graphql-rest-help-titletext {
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
    <section key={section.id} id={section.id} className="graphql-rest-help-section">
      <h2 className="graphql-rest-help-heading">{section.title}</h2>
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
      {isLast ? null : <hr className="graphql-rest-help-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="graphql-rest-help-section">
      <h2 className="graphql-rest-help-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="graphql-rest-help-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="graphql-rest-help-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="graphql-rest-help-section">
      <h2 className="graphql-rest-help-heading">{section.title}</h2>
      {section.terms.map((item) => (
        <p key={item.term}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="graphql-rest-help-divider" />}
    </section>
  )
}

export default function GraphqlVsRestPage(): JSX.Element {
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
    document.title = `GraphQL vs REST (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'GraphQL vs REST',
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
    <div className="graphql-rest-help-page">
      <style>{pageStyles}</style>
      <div className="graphql-rest-help-window" role="presentation">
        <header className="graphql-rest-help-titlebar">
          <span className="graphql-rest-help-titletext">GraphQL vs REST</span>
          <div className="graphql-rest-help-controls">
            <button
              className="graphql-rest-help-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="graphql-rest-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="graphql-rest-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`graphql-rest-help-tab ${activeTab === tab.id ? 'graphql-rest-help-tab-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="graphql-rest-help-main">
          <aside className="graphql-rest-help-toc" aria-label="Table of contents">
            <h2 className="graphql-rest-help-toc-title">Contents</h2>
            <ul className="graphql-rest-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id} className="graphql-rest-help-toc-item">
                  <a href={`#${section.id}`} className="graphql-rest-help-toc-link">
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="graphql-rest-help-content">
            <h1 className="graphql-rest-help-doc-title">GraphQL vs REST</h1>
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
