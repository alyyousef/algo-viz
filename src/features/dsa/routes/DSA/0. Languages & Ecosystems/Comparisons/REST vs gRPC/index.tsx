import { Fragment } from 'react'

import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type DocSection = {
  id: string
  title: string
  paragraphs: readonly string[]
}

type ExampleSnippet = {
  label: string
  code: string
}

type ExampleSection = {
  id: string
  title: string
  description: string
  snippets: readonly ExampleSnippet[]
  takeaway: string
}

type GlossaryTerm = {
  term: string
  definition: string
}

const bigPictureSections: readonly DocSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'REST and gRPC are both ways to design network APIs, but they begin from different architectural assumptions. REST is an architectural style commonly associated with resource-oriented HTTP APIs, representations, stateless communication, and standard HTTP semantics. gRPC is a contract-first RPC framework built around service definitions, generated clients, Protocol Buffers by default, and HTTP/2 transport.',
      'That means the practical question is not which one can move data over the network. Both can. The more useful question is whether the system benefits more from resource-oriented HTTP APIs that are broadly understandable and web-friendly, or from strongly typed service contracts with efficient binary transport and RPC semantics.',
      'This help-style reference covers REST vs gRPC across overview, key ideas, core syntax, APIs, ecosystem, architecture, use cases, and tradeoffs.',
    ],
  },
  {
    id: 'bp-rest',
    title: 'When REST Fits Better',
    paragraphs: [
      'REST is often the stronger fit when the API is public-facing, browser-friendly, partner-facing, or meant to be understandable to a wide range of clients and tooling. It is especially attractive when ordinary HTTP semantics, JSON payloads, URLs as resource identifiers, caching, and easy inspection with common web tools are important.',
      'It is also a strong fit when the API is part of a broader web-platform story. Human readability, compatibility with standard HTTP tooling, and a lower barrier to entry for many client environments make REST a natural choice for many external and product-facing APIs.',
    ],
  },
  {
    id: 'bp-grpc',
    title: 'When gRPC Fits Better',
    paragraphs: [
      'gRPC is often the stronger fit when the system is service-to-service, latency-sensitive, schema-driven, and benefits from generated strongly typed clients. It is especially attractive in internal platform environments where teams control both client and server stacks and want efficient serialization, strict contracts, and RPC semantics.',
      'It is also a natural fit when streaming, bidirectional communication, or highly structured multi-language service contracts matter. In those contexts, gRPC often provides a cleaner and more efficient operational model than ad hoc JSON-over-HTTP endpoints.',
    ],
  },
  {
    id: 'bp-same-problem',
    title: 'Same Problem, Different Shape',
    paragraphs: [
      'Both approaches can expose application capabilities over the network. Both can serve internal services, mobile clients, and backend systems. Both can be secure, versioned, observable, and production-ready.',
      'The difference is that REST usually models resources and state transitions through HTTP semantics, while gRPC models remote procedures through service definitions and RPC methods. This changes how teams think about API design, client generation, error handling, and cross-service contracts.',
    ],
  },
  {
    id: 'bp-traps',
    title: 'Common Evaluation Traps',
    paragraphs: [
      'A common mistake is to compare only payload size or only developer familiarity. Performance matters, but so do browser support, tooling, debugging, client diversity, observability, and the social shape of the API.',
      'Another mistake is to treat REST as simply JSON over HTTP and gRPC as simply faster HTTP. REST is a style with resource semantics and broad HTTP interoperability. gRPC is a framework with code generation, service contracts, and streaming capabilities that change both client and server architecture.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Quick Takeaways',
    paragraphs: [
      'Choose REST when broad interoperability, HTTP-native tooling, and public or browser-facing API ergonomics are central.',
      'Choose gRPC when internal service contracts, generated clients, efficient serialization, and streaming or strongly typed RPC workflows are central.',
      'If the API is mainly consumed by other controlled services, gRPC often gains ground. If the API is mainly consumed by heterogeneous external clients, REST often gains ground.',
    ],
  },
] as const

const coreConceptSections: readonly DocSection[] = [
  {
    id: 'core-shared',
    title: 'Shared Ground',
    paragraphs: [
      'Both REST-style HTTP APIs and gRPC services can expose business capabilities, validate requests, return structured responses, propagate errors, and support authentication, authorization, monitoring, and versioning strategies.',
      'That means neither approach is inherently toy or enterprise by default. The meaningful difference is how the API is shaped and what assumptions the client and server stacks are allowed to make about one another.',
    ],
  },
  {
    id: 'core-model',
    title: 'Resource Model vs RPC Model',
    paragraphs: [
      'REST typically models resources, representations, and state transitions through URLs, HTTP methods, and HTTP status codes. The API design often emphasizes nouns, representations, and standard web semantics rather than method calls.',
      'gRPC models services and methods. Clients call defined RPC methods such as GetUser or CreateInvoice, and the schema describes request and response messages explicitly. The design is more naturally operation-oriented than resource-oriented.',
    ],
  },
  {
    id: 'core-contract',
    title: 'Contracts and Schema',
    paragraphs: [
      'REST APIs may be documented with schemas and specifications, but the protocol itself does not force a contract-first development model in the same way. Teams can be disciplined and strongly specified, but the ecosystem tolerates looser patterns as well.',
      'gRPC is fundamentally contract-driven. Services and messages are defined in proto files, and code generation creates clients and server bindings. This makes interface design more explicit and can reduce ambiguity in strongly typed environments.',
    ],
  },
  {
    id: 'core-transport',
    title: 'Transport and Serialization',
    paragraphs: [
      'REST commonly uses HTTP with JSON payloads, though other formats are possible. This makes requests and responses easy to inspect with ordinary web tools and keeps the barrier to entry low for many environments.',
      'gRPC commonly uses Protocol Buffers for compact binary serialization over HTTP/2. This can improve efficiency and strongly typed interoperability, especially in controlled internal systems, but it also makes the protocol less immediately human-readable than JSON APIs.',
    ],
  },
  {
    id: 'core-streaming',
    title: 'Streaming and Long-Lived Interaction',
    paragraphs: [
      'Traditional REST-style APIs are strongest for ordinary request-response interaction. Streaming is possible through other HTTP techniques and related technologies, but it is not the central identity of resource-oriented HTTP API design.',
      'gRPC supports unary RPCs as well as server streaming, client streaming, and bidirectional streaming. This is one of its biggest structural advantages when applications need long-lived logical flows rather than only isolated request-response calls.',
    ],
  },
  {
    id: 'core-browser',
    title: 'Browser and Public-Web Fit',
    paragraphs: [
      'REST fits the browser and general web environment naturally. Browsers, proxies, API gateways, caches, developer tools, and countless client libraries all understand ordinary HTTP APIs with little extra machinery.',
      'gRPC is not as naturally browser-native in the general web sense, especially when compared with straightforward JSON-over-HTTP endpoints. That makes it very strong for internal services and more awkward for some direct browser-facing scenarios unless additional infrastructure or compatibility layers are introduced.',
    ],
  },
  {
    id: 'core-debugging',
    title: 'Debugging and Human Readability',
    paragraphs: [
      'REST is often easier to inspect manually because payloads are frequently JSON and requests map naturally to familiar HTTP concepts. Developers can quickly reason about URLs, headers, status codes, and bodies with common tools.',
      'gRPC can still be debugged well, especially with reflection and specialized tools, but the workflow is different. Strong contracts and binary payloads are great for machines and typed clients, yet less transparent to a human opening a request in a generic browser-like inspector.',
    ],
  },
  {
    id: 'core-errors',
    title: 'Errors and Semantics',
    paragraphs: [
      'REST commonly leans on HTTP status codes and resource-oriented semantics to express success, failure, authorization problems, missing resources, validation errors, and cache behavior. This is especially useful when the API participates in broader HTTP infrastructure.',
      'gRPC formalizes RPC-oriented status handling and metadata around method calls. This can feel cleaner inside service-oriented systems where the team wants application-level RPC semantics rather than relying primarily on the expressive range of HTTP response conventions.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance and Efficiency',
    paragraphs: [
      'gRPC is often more efficient on the wire due to binary serialization, generated clients, and HTTP/2-based transport patterns. This can matter significantly in high-throughput internal systems or latency-sensitive service meshes.',
      'REST can still perform very well, and for many systems the bottleneck is not payload encoding but broader application architecture, database cost, network geography, or operational design. Performance is important, but it should be evaluated in real context rather than treated as the only deciding factor.',
    ],
  },
  {
    id: 'core-ops',
    title: 'Operations and Observability',
    paragraphs: [
      'REST benefits from the ubiquity of HTTP-aware tooling. Gateways, proxies, logs, tracing systems, and API documentation workflows are often easier to integrate because the ecosystem is already built around HTTP resource requests.',
      'gRPC also has strong operational support, but it often assumes a more platform-engineering-oriented environment with service discovery, generated clients, and RPC-aware tooling. This can be excellent for internal platforms, but less immediately universal than ordinary HTTP API operations.',
    ],
  },
  {
    id: 'core-versioning',
    title: 'Versioning and Evolution',
    paragraphs: [
      'REST APIs often evolve through URL versioning, representation changes, additive fields, media-type conventions, and broader API governance practices. Because REST is less prescriptive about contracts, teams must be especially disciplined about change management.',
      'gRPC evolves through proto schema design, field numbering discipline, additive compatibility patterns, and generated code updates. The contract-first model gives clearer rules, but also makes schema governance a highly visible part of the development process.',
    ],
  },
  {
    id: 'core-decision',
    title: 'Decision Checklist',
    paragraphs: [
      'Lean toward REST if the API is external, browser-facing, partner-facing, or needs broad HTTP interoperability and easy human inspection.',
      'Lean toward gRPC if the API is primarily internal, service-to-service, schema-driven, and benefits from generated clients, binary efficiency, or streaming RPCs.',
      'If the main challenge is public API ergonomics and client diversity, REST often fits better. If the main challenge is internal platform efficiency and strongly typed contracts, gRPC often fits better.',
    ],
  },
] as const

const examples: readonly ExampleSection[] = [
  {
    id: 'examples-read',
    title: 'Simple Read Operation',
    description:
      'The first contrast is resource-oriented HTTP access versus method-oriented RPC access.',
    snippets: [
      {
        label: 'REST',
        code: `GET /users/42
Accept: application/json

200 OK
{
  "id": 42,
  "name": "Ana"
}`,
      },
      {
        label: 'gRPC',
        code: `service UserService {
  rpc GetUser(GetUserRequest) returns (UserResponse);
}

message GetUserRequest {
  int64 id = 1;
}`,
      },
    ],
    takeaway:
      'REST frames the interaction as retrieving a resource representation. gRPC frames it as calling a method with typed request and response messages.',
  },
  {
    id: 'examples-write',
    title: 'Create Operation',
    description:
      'Both can create a new entity, but the API shape again reflects resource semantics versus RPC semantics.',
    snippets: [
      {
        label: 'REST',
        code: `POST /users
Content-Type: application/json

{
  "name": "Ana"
}`,
      },
      {
        label: 'gRPC',
        code: `service UserService {
  rpc CreateUser(CreateUserRequest) returns (UserResponse);
}

message CreateUserRequest {
  string name = 1;
}`,
      },
    ],
    takeaway:
      'REST typically uses HTTP methods on resource collections. gRPC uses explicit service operations.',
  },
  {
    id: 'examples-streaming',
    title: 'Streaming Capability',
    description:
      'Streaming is where gRPC usually separates itself most clearly from ordinary REST-style request-response APIs.',
    snippets: [
      {
        label: 'REST',
        code: `# Typical REST APIs are request-response oriented.
# Streaming can be added through other techniques,
# but it is not the default architectural center.`,
      },
      {
        label: 'gRPC',
        code: `service PriceFeed {
  rpc WatchPrices(PriceRequest) returns (stream PriceUpdate);
}`,
      },
    ],
    takeaway:
      'If long-lived streaming is central to the API, gRPC often becomes much more compelling.',
  },
  {
    id: 'examples-decision',
    title: 'Architectural Prompt',
    description:
      'A short prompt helps keep the comparison tied to client and platform reality rather than protocol tribalism.',
    snippets: [
      {
        label: 'REST Rule',
        code: `If the API is broad, public, or browser-friendly
and should feel native to HTTP tooling:
  choose REST`,
      },
      {
        label: 'gRPC Rule',
        code: `If the API is internal, contract-first,
and benefits from generated typed clients or streaming:
  choose gRPC`,
      },
    ],
    takeaway:
      'The better choice depends on whether the system is optimizing for web interoperability or service-contract efficiency.',
  },
] as const

const glossaryTerms: readonly GlossaryTerm[] = [
  {
    term: 'Resource',
    definition:
      'A conceptual entity in REST-style design exposed through a URL and represented through HTTP responses.',
  },
  {
    term: 'Representation',
    definition: 'The returned form of a resource, often JSON in practical REST-style APIs.',
  },
  {
    term: 'Stateless',
    definition:
      'A communication style where each request contains the context needed for it to be processed independently.',
  },
  {
    term: 'RPC',
    definition:
      'Remote Procedure Call, a model where a client invokes a remote method as an explicit operation.',
  },
  {
    term: 'Proto File',
    definition: 'A Protocol Buffers schema file that defines gRPC services and message structures.',
  },
  {
    term: 'Protocol Buffers',
    definition: 'A compact binary serialization format commonly used by gRPC.',
  },
  { term: 'Unary RPC', definition: 'A single request followed by a single response in gRPC.' },
  {
    term: 'Bidirectional Streaming',
    definition:
      'A gRPC mode where both client and server can send multiple messages over one RPC stream.',
  },
  {
    term: 'HTTP/2',
    definition:
      'The transport protocol version commonly used by gRPC, enabling multiplexing and streaming features.',
  },
  {
    term: 'Reflection',
    definition:
      'A gRPC capability that lets servers describe their APIs to compatible tools at runtime.',
  },
  {
    term: 'Status Code',
    definition:
      'A machine-readable success or error indicator, such as HTTP status codes in REST-style APIs or gRPC status codes in gRPC.',
  },
  {
    term: 'Generated Client',
    definition:
      'Client code created automatically from a service contract so developers do not hand-author every request shape.',
  },
] as const

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': bigPictureSections.map((section) => ({ id: section.id, label: section.title })),
  'core-concepts': coreConceptSections.map((section) => ({ id: section.id, label: section.title })),
  examples: examples.map((section) => ({ id: section.id, label: section.title })),
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function RestVsGrpcPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'REST vs gRPC',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="REST vs gRPC"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">REST vs gRPC</h1>
      <p className="rest-grpc-help-doc-subtitle">
        Manual-style comparison of resource-oriented HTTP APIs, contract-first RPC, streaming, and
        service-platform tradeoffs.
      </p>

      {activeTab === 'big-picture' &&
        bigPictureSections.map((section, index) => (
          <Fragment key={section.id}>
            <section id={section.id} className="bin98-section">
              <h2 className="bin98-heading">{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
            {index < bigPictureSections.length - 1 && <hr className="bin98-divider" />}
          </Fragment>
        ))}

      {activeTab === 'core-concepts' &&
        coreConceptSections.map((section) => (
          <section key={section.id} id={section.id} className="bin98-section">
            <h2 className="bin98-heading">{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}

      {activeTab === 'examples' &&
        examples.map((example) => (
          <section key={example.id} id={example.id} className="bin98-section">
            <h2 className="bin98-heading">{example.title}</h2>
            <p>{example.description}</p>
            {example.snippets.map((snippet) => (
              <Fragment key={`${example.id}-${snippet.label}`}>
                <h3 className="bin98-subheading">{snippet.label}</h3>
                <div className="bin98-codebox">
                  <code>{snippet.code}</code>
                </div>
              </Fragment>
            ))}
            <p>
              <strong>Takeaway:</strong> {example.takeaway}
            </p>
          </section>
        ))}

      {activeTab === 'glossary' && (
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {glossaryTerms.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
