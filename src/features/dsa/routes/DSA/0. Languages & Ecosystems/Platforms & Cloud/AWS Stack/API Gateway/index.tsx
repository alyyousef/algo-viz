import { Link } from 'react-router-dom'

import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const pageTitle = 'AWS API Gateway'
const pageSubtitle = 'Managed front door for HTTP, REST, and WebSocket APIs on AWS.'

const bigPictureSections = [
  {
    title: 'What it is',
    paragraphs: [
      "Amazon API Gateway is AWS's managed service for publishing, securing, monitoring, and operating APIs. It sits between clients and backend systems, giving you a consistent control plane for routing requests, enforcing auth, shaping traffic, transforming payloads, and observing runtime behavior.",
      'The service supports three API families. HTTP APIs target modern, low-latency request-response workloads with a simpler feature set. REST APIs expose the older, richer model with features such as usage plans, API keys, request validation, caching, and private APIs. WebSocket APIs support long-lived bidirectional connections for realtime systems.',
    ],
  },
  {
    title: 'Where it fits',
    paragraphs: [
      'API Gateway is commonly used in front of Lambda functions, containerized services behind load balancers, internal services reached through VPC links, and selected AWS services invoked directly through service integrations. In serverless architectures it often becomes the public entry point for auth, routing, and observability.',
      'It is not just a reverse proxy. It is also a product boundary: routes, stages, authorizers, custom domains, throttling rules, logging, metrics, and deployment behavior are all first-class concepts.',
    ],
  },
  {
    title: 'Why teams use it',
    paragraphs: [
      'It removes the need to run and harden your own API edge for many workloads. TLS termination, request authentication, throttling, access logging, CloudWatch metrics, deployment stages, and IAM integration are built into the service model.',
      'It also standardizes operational behavior across multiple backends. That matters when one API route hits Lambda, another hits an ALB through a VPC link, and a third uses a direct AWS integration.',
    ],
  },
  {
    title: 'When it is a poor fit',
    paragraphs: [
      'If all you need is a very thin path-based proxy in front of ECS or EC2, an Application Load Balancer can be simpler. If you need graph-native querying, field-level resolution, and schema-driven composition, AppSync may be a better front door. If you need full custom proxy behavior, API Gateway may feel opinionated.',
      'Choosing the wrong API family is the most common design mistake. Teams often start with REST APIs out of habit when HTTP APIs are sufficient, or choose HTTP APIs and later discover they need REST-only features such as usage plans or private APIs.',
    ],
  },
]

const apiTypeGuide = [
  {
    title: 'HTTP APIs',
    summary:
      'Best default for new request-response APIs when you want low latency, lower cost, Lambda or HTTP backends, JWT or Lambda authorizers, and a simpler model.',
    details: [
      'Model: routes and integrations rather than the older resource and method tree.',
      'Typical backends: Lambda proxy integrations, HTTP proxy integrations, AWS service integrations, and private integrations via VPC links.',
      'Common reasons to choose: straightforward microservice front door, serverless APIs, mobile/backend-for-frontend endpoints, and lighter operational overhead.',
      'Common reasons not to choose: you need REST-only features such as usage plans with API keys, request validation, stage caching, or private APIs.',
    ],
  },
  {
    title: 'REST APIs',
    summary:
      'Choose when you need the mature feature set and are willing to accept the more complex model and generally higher overhead.',
    details: [
      'Model: resources, methods, deployments, stages, mappings, and a broader policy and transformation surface.',
      'Common reasons to choose: API keys and usage plans, request validation, transformation-heavy integrations, caching, stage variables, or private API endpoints.',
      'Typical backends: Lambda, HTTP endpoints, AWS services, mock integrations, or private integrations through VPC links.',
      'Common reasons not to choose: you only need a modern proxy-style API with standard auth and routing, where HTTP APIs are the cleaner fit.',
    ],
  },
  {
    title: 'WebSocket APIs',
    summary:
      'Choose for realtime bidirectional communication where clients keep a connection open and receive pushed messages.',
    details: [
      'Model: routes keyed by route selection expressions, connection lifecycle events, and backend integrations.',
      'Typical workloads: chat, collaborative editing, device control, dashboards, notifications, and custom realtime protocols.',
      'Operational note: WebSocket APIs change the shape of your backend because you must reason about connection IDs, message routing, disconnect cleanup, and state.',
      'Do not use WebSocket APIs for ordinary CRUD traffic just because they seem more interactive. For most business APIs, HTTP remains the simpler contract.',
    ],
  },
]

const requestLifecycle = [
  'A client resolves the execute-api hostname or your custom domain and opens a TLS connection.',
  'API Gateway matches the request to an API, stage, and route or method based on host, path, verb, and protocol.',
  'Auth and policy checks run before the backend integration. Depending on API type, this can include JWT validation, Lambda authorizers, IAM authorization, or resource-policy evaluation.',
  'API Gateway prepares the integration request. In richer configurations this may involve request parameter mapping, payload transformation, path rewriting, or stage-variable resolution.',
  'The backend runs and returns a response. API Gateway can then map the integration result into the public response shape and emit access logs, metrics, and tracing signals.',
]

const coreConceptSections = [
  {
    id: 'core-api-model',
    heading: 'API Model',
    paragraphs: [
      'An API Gateway API is more than a URL. The full model includes routes or methods, integrations, stages, custom domains, authorization strategy, logging, throttling, deployment configuration, and network reachability.',
      'For HTTP APIs, the route key is usually METHOD /path, with a $default route available as a catch-all. For REST APIs, the model is a resource tree where each resource can expose multiple methods such as GET, POST, or DELETE.',
      'Integrations describe what actually happens when a route is matched. API Gateway itself is not the application. It is the policy and routing layer in front of the application.',
    ],
  },
  {
    id: 'core-routing',
    heading: 'Routing, Routes, and Resources',
    paragraphs: [
      'HTTP APIs optimize for direct routing. You define route keys such as GET /orders/{id} or ANY /{proxy+} and attach integrations. The $default route is useful for proxy-style architectures but can hide mistakes if used too early.',
      'REST APIs expose a deeper resource model. That makes them more verbose but also more flexible when you need method-specific request validation, transformation rules, API keys, or fine-grained method settings.',
      'Route design affects operations. A few well-defined routes are easier to authorize, log, and reason about than a single giant catch-all proxy route.',
    ],
  },
  {
    id: 'core-integrations',
    heading: 'Integrations',
    paragraphs: [
      'The integration type is one of the most important design choices. Lambda proxy integrations are common for serverless workloads because the backend receives a structured event and returns a structured response. HTTP proxy integrations are common when API Gateway fronts existing web services.',
      'API Gateway also supports AWS service integrations, which let a route call selected AWS services without inserting your own service in the middle. For private backends, VPC links let API Gateway reach resources behind internal load balancers or service discovery targets depending on API type.',
      'Keep the contract boundary clean. Use API Gateway for edge concerns and coarse routing, but avoid pushing excessive business logic into mappings and templates unless there is a strong operational reason.',
    ],
  },
  {
    id: 'core-auth',
    heading: 'Authorization and Access Control',
    paragraphs: [
      'HTTP APIs support JWT authorizers, Lambda authorizers, and IAM authorization. JWT authorizers are a strong default when you already have an OpenID Connect or OAuth 2.0 issuer and want token validation at the edge. Lambda authorizers are useful when authorization depends on custom business logic or legacy token formats.',
      'REST APIs support IAM, Lambda authorizers, Cognito user pools, and resource policies, plus surrounding features such as usage plans and API keys. Resource policies matter when you want to constrain which principals, accounts, networks, or VPC endpoints may invoke the API.',
      'API keys are not auth by themselves. In REST APIs they are primarily product and throttling controls through usage plans, not a substitute for identity and authorization.',
    ],
  },
  {
    id: 'core-networking',
    heading: 'Networking and Reachability',
    paragraphs: [
      'Public APIs use the service-managed edge endpoint with either the default execute-api hostname or your own custom domain. Custom domains matter for stable client contracts, certificate management, and versioning strategy.',
      'For HTTP APIs, private integrations use VPC links to reach services inside your VPC, commonly through an Application Load Balancer, Network Load Balancer, or Cloud Map-backed service discovery. For REST APIs, private integrations and private APIs are distinct concepts: one is about reaching a private backend, the other is about making the API itself reachable only from inside approved VPC environments.',
      'Do not blur endpoint exposure with backend reachability. A public API can talk to a private backend, and a private API can still have a complex auth and policy model.',
    ],
  },
  {
    id: 'core-deployments',
    heading: 'Deployments, Stages, and Domains',
    paragraphs: [
      'A deployment is a publishable snapshot of your API configuration. A stage is the named runtime environment that clients call, such as dev, staging, or prod. REST APIs emphasize explicit deployments and stage management. HTTP APIs can also use stages and support auto-deploy behavior, which speeds up iteration but must be controlled carefully in production.',
      'Custom domains let you map one or more APIs and stages behind human-meaningful hostnames. Good domain strategy avoids leaking internal stage names into public contracts and makes version transitions easier.',
      'If the API is business critical, treat stage configuration as production infrastructure. Logging, throttling, CORS, domain mappings, and access controls should be reviewed with the same rigor as application code.',
    ],
  },
  {
    id: 'core-observability',
    heading: 'Observability',
    paragraphs: [
      'CloudWatch metrics and access logs are the baseline. Metrics tell you about error rates, latency, and volume. Access logs let you correlate client-visible failures with backend and authorization behavior.',
      'Execution logging and tracing are where teams often underinvest. Without structured logging at the gateway and backend, debugging auth failures, mapping errors, or path mismatches becomes slower than it should be.',
      'Instrument the API boundary intentionally. Request IDs, route keys, caller identity, integration latency, and backend status codes are the fields that usually matter first during incident response.',
    ],
  },
  {
    id: 'core-security',
    heading: 'Security Posture',
    paragraphs: [
      'Security in API Gateway is layered: TLS at the edge, route-level authorization, IAM and resource policies where supported, careful CORS, backend least privilege, and log hygiene.',
      'For HTTP APIs, a common hardening pattern is to require an authorizer on every route, disable accidental open routes, and use a narrow custom domain mapping rather than exposing everything through a giant $default route. For REST APIs, pair strong auth with usage controls, validation, and least-privilege invoke policies.',
      'CORS deserves special care. It is a browser-enforced access policy, not server authentication. Misconfigured CORS creates support noise and occasionally exposes data to unintended frontends.',
    ],
  },
]

const featureComparisons = [
  {
    title: 'Need the simplest front door for Lambda or HTTP backends',
    choice: 'Prefer HTTP API.',
  },
  {
    title: 'Need API keys and usage plans for per-client product throttling',
    choice: 'Prefer REST API.',
  },
  {
    title: 'Need request validation, caching, or stage variables',
    choice: 'Prefer REST API.',
  },
  {
    title: 'Need private API endpoints inside VPC-only access patterns',
    choice: 'Prefer REST API.',
  },
  {
    title: 'Need JWT-based auth with a modern route model',
    choice: 'Prefer HTTP API.',
  },
  {
    title: 'Need bidirectional realtime connections',
    choice: 'Use WebSocket API.',
  },
]

const authOptions = [
  {
    title: 'JWT authorizers',
    detail:
      'Best when tokens come from an external or AWS-hosted OIDC or OAuth issuer and you want edge validation of issuer, audience, scopes, and claims without writing custom verification logic in each backend.',
  },
  {
    title: 'Lambda authorizers',
    detail:
      'Best when authorization logic depends on custom rules, tenant metadata, nonstandard tokens, or external systems. They are flexible but introduce more moving parts, cold starts, and cache-key design concerns.',
  },
  {
    title: 'IAM authorization',
    detail:
      'Best for service-to-service access, signed requests, internal automation, and account-level permission models. It integrates well with existing AWS identity boundaries but is usually not the right public-web auth strategy.',
  },
  {
    title: 'Resource policies and network constraints',
    detail:
      'Useful for limiting who may invoke supported API types based on principals, accounts, source IPs, VPC endpoints, or similar coarse-grained controls. They complement, not replace, route-level auth.',
  },
]

const operationsNotes = [
  {
    title: 'Throttling',
    detail:
      'API Gateway can protect backends from sudden spikes, but throttling strategy should reflect backend capacity and product expectations. Use it as part of a broader resilience design, not as the only safety mechanism.',
  },
  {
    title: 'Caching',
    detail:
      'REST APIs can cache responses at the stage or method level for suitable workloads. That can reduce backend load dramatically, but stale-data semantics and cache invalidation rules need to be explicit.',
  },
  {
    title: 'CORS',
    detail:
      'Treat CORS as part of the API contract. Preflight behavior, allowed methods, headers, and credentials handling should be tested with real browsers, not assumed from backend behavior alone.',
  },
  {
    title: 'Versioning',
    detail:
      'Version in the contract deliberately: hostnames, base paths, route prefixes, or backward-compatible schema evolution all work, but mixing strategies without a plan creates operational confusion.',
  },
  {
    title: 'Infrastructure as Code',
    detail:
      'Define APIs in SAM, CloudFormation, CDK, or OpenAPI where possible. Console-created drift becomes expensive as soon as multiple stages, custom domains, and authorizers are involved.',
  },
]

const designPatterns = [
  {
    title: 'Lambda-backed serverless API',
    detail:
      'HTTP API in front of Lambda is the common low-friction pattern for event-driven apps, BFF layers, and internal tools. Keep handlers thin and push reusable business logic into libraries or services.',
  },
  {
    title: 'Service front door for containers',
    detail:
      'API Gateway fronts internal services through an HTTP or private integration when you want auth, domains, and observability at the edge but keep compute on ECS, EKS, or EC2.',
  },
  {
    title: 'Hybrid edge',
    detail:
      'Some routes can invoke Lambda while others proxy existing services. This is useful during migrations, but route ownership and error handling must stay consistent.',
  },
  {
    title: 'Productized API',
    detail:
      'REST API with usage plans and API keys is common when different consumers receive different quotas or when the API is sold or metered as a product.',
  },
]

const pitfalls = [
  'Choosing REST APIs by default even when HTTP APIs cover the real requirements.',
  'Using API keys as if they were user authentication or authorization.',
  'Creating one giant proxy route and then struggling with logging, auth exceptions, and per-route ownership.',
  'Relying on console-only changes instead of Infrastructure as Code.',
  'Forgetting that CORS failures are often browser-policy problems rather than backend bugs.',
  'Treating VPC links, private integrations, and private APIs as if they were the same thing.',
  'Ignoring authorizer latency and cache behavior until it becomes a production bottleneck.',
  'Shipping access logs without enough identifiers to correlate failures end to end.',
  'Allowing auto-deploy semantics in production without a release process.',
  'Overusing mapping and transformation logic until API Gateway becomes a hidden application layer.',
]

const examples = [
  {
    id: 'ex-lambda-http',
    title: 'HTTP API + Lambda proxy handler',
    code: `export const handler = async (event) => {
  const id = event.pathParameters?.id

  return {
    statusCode: 200,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      orderId: id,
      requestId: event.requestContext?.requestId,
      routeKey: event.requestContext?.routeKey,
    }),
  }
}`,
    explanation:
      'This is the canonical HTTP API pattern: route to Lambda, read path and request-context fields from the event, and return a structured response with statusCode, headers, and body.',
  },
  {
    id: 'ex-jwt-route',
    title: 'OpenAPI route with JWT authorizer',
    code: `openapi: 3.0.1
info:
  title: Orders API
  version: '1.0'
paths:
  /orders:
    get:
      security:
        - jwtAuth: []
      x-amazon-apigateway-integration:
        payloadFormatVersion: '2.0'
        type: aws_proxy
        httpMethod: POST
        uri: arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:123456789012:function:orders/invocations
components:
  securitySchemes:
    jwtAuth:
      type: openIdConnect
      openIdConnectUrl: https://issuer.example.com/.well-known/openid-configuration`,
    explanation:
      'JWT authorizers are a strong fit when the API serves browser or mobile clients that already authenticate through an OIDC or OAuth 2.0 provider.',
  },
  {
    id: 'ex-cors',
    title: 'HTTP API CORS configuration idea',
    code: `{
  "AllowOrigins": ["https://app.example.com"],
  "AllowMethods": ["GET", "POST", "OPTIONS"],
  "AllowHeaders": ["authorization", "content-type"],
  "ExposeHeaders": ["x-request-id"],
  "MaxAge": 300,
  "AllowCredentials": true
}`,
    explanation:
      'Keep CORS narrow. Allow only the origins, methods, and headers the frontend actually needs. Broad wildcard rules are easier initially but usually age badly.',
  },
  {
    id: 'ex-private',
    title: 'Private integration shape',
    code: `Client
  -> Custom domain / execute-api hostname
  -> API Gateway route
  -> VPC link
  -> Internal ALB / NLB / service-discovery target
  -> Private service`,
    explanation:
      'This pattern is useful when the public API boundary lives in API Gateway but the service implementation stays private inside the VPC.',
  },
  {
    id: 'ex-rest-product',
    title: 'REST API productization checklist',
    code: `1. Define resources and methods.
2. Attach auth and request validation.
3. Create deployment and stage.
4. Enable access logging and metrics.
5. Create API keys and usage plans.
6. Bind client keys to the usage plan.
7. Publish a custom domain and documentation.`,
    explanation:
      'REST APIs remain the right tool when the API itself is a managed product with quotas, keys, and method-specific governance.',
  },
]

const glossaryTerms = [
  {
    term: 'API Gateway API',
    definition:
      'A managed API configuration in API Gateway, including routes or resources, integrations, stages, auth, and domains.',
  },
  {
    term: 'HTTP API',
    definition:
      'The simpler, lower-overhead API Gateway family for standard request-response APIs.',
  },
  {
    term: 'REST API',
    definition:
      'The mature API Gateway family with the richest feature set and the older resource and method model.',
  },
  {
    term: 'WebSocket API',
    definition: 'The API Gateway family for persistent bidirectional realtime communication.',
  },
  {
    term: 'Route key',
    definition:
      'The HTTP API route identifier, usually in the form METHOD plus path, plus special values such as $default.',
  },
  {
    term: 'Integration',
    definition:
      'The backend action API Gateway takes after a route matches, such as invoking Lambda or forwarding to an HTTP endpoint.',
  },
  {
    term: 'VPC link',
    definition:
      'The managed networking bridge API Gateway uses to reach certain private resources inside a VPC.',
  },
  {
    term: 'Authorizer',
    definition:
      'An API Gateway authorization mechanism such as JWT validation or a custom Lambda-based decision.',
  },
  {
    term: 'Stage',
    definition: 'A named runtime environment that exposes a specific deployment of an API.',
  },
  {
    term: 'Custom domain',
    definition: 'A user-owned hostname mapped to one or more API Gateway APIs and stages.',
  },
  {
    term: 'Usage plan',
    definition: 'A REST API feature for associating API keys with quotas and throttling rules.',
  },
  {
    term: 'Access log',
    definition:
      'A structured log record emitted for API requests, typically sent to CloudWatch Logs for troubleshooting and analytics.',
  },
]

const pageSources = [
  'https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html',
  'https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-vs-rest.html',
  'https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations.html',
  'https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-jwt-authorizer.html',
  'https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-vpc-links.html',
  'https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-cors.html',
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
    { id: 'bp-api-types', label: 'API Types' },
    { id: 'bp-lifecycle', label: 'Request Flow' },
    { id: 'bp-when-to-use', label: 'When to Use It' },
  ],
  'core-concepts': [
    { id: 'core-api-model', label: 'API Model' },
    { id: 'core-routing', label: 'Routing' },
    { id: 'core-integrations', label: 'Integrations' },
    { id: 'core-auth', label: 'Authorization' },
    { id: 'core-networking', label: 'Networking' },
    { id: 'core-deployments', label: 'Deployments' },
    { id: 'core-observability', label: 'Observability' },
    { id: 'core-security', label: 'Security' },
    { id: 'core-ops', label: 'Operations' },
    { id: 'core-patterns', label: 'Design Patterns' },
    { id: 'core-pitfalls', label: 'Pitfalls' },
  ],
  examples: examples.map((example) => ({
    id: example.id,
    label: example.title,
  })),
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function AwsApiGatewayPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Aws Api Gateway Page',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Aws Api Gateway Page"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="apigw-help98-title">{pageTitle}</h1>
      <p className="bin98-subheading">{pageSubtitle}</p>
      <p>
        This page is intentionally broad because API Gateway is really a family of gateway products
        inside one service name. The goal is to help you choose the right API type, understand the
        control plane, and avoid the feature mismatches that usually cause expensive rework.
      </p>
      <p>
        The title-bar minimize control returns to the previous page when possible, or to{' '}
        <Link to="/algoViz" className="apigw-help98-inline-link">
          /algoViz
        </Link>{' '}
        when there is no prior history entry.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            {bigPictureSections.map((section) => (
              <div key={section.title}>
                <h3 className="bin98-subheading">{section.title}</h3>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-api-types" className="bin98-section">
            <h2 className="bin98-heading">API Types</h2>
            {apiTypeGuide.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.summary}</p>
                <ul>
                  {item.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-lifecycle" className="bin98-section">
            <h2 className="bin98-heading">Request Flow</h2>
            <ol>
              {requestLifecycle.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>
          <hr className="bin98-divider" />
          <section id="bp-when-to-use" className="bin98-section">
            <h2 className="bin98-heading">When to Use It</h2>
            <ul>
              {featureComparisons.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}:</strong> {item.choice}
                </li>
              ))}
            </ul>
          </section>
        </>
      )}

      {activeTab === 'core-concepts' && (
        <>
          {coreConceptSections.map((section) => (
            <section key={section.id} id={section.id} className="bin98-section">
              <h2 className="bin98-heading">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}

          <section id="core-ops" className="bin98-section">
            <h2 className="bin98-heading">Operational Notes</h2>
            {operationsNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
            <p>
              A practical production checklist usually includes custom domains, stage-specific
              logging, alarms on 4XX and 5XX rates, explicit auth on every route, Infrastructure as
              Code, and at least one load test that includes the authorizer path instead of only the
              happy-path backend.
            </p>
          </section>

          <section id="core-patterns" className="bin98-section">
            <h2 className="bin98-heading">Design Patterns</h2>
            {designPatterns.map((item) => (
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
            <h3 className="bin98-subheading">Authorization Options</h3>
            {authOptions.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
        </>
      )}

      {activeTab === 'examples' && (
        <>
          {examples.map((example) => (
            <section key={example.id} id={example.id} className="bin98-section">
              <h2 className="bin98-heading">{example.title}</h2>
              <div className="bin98-codebox">
                <code>{example.code.trim()}</code>
              </div>
              <p>{example.explanation}</p>
            </section>
          ))}
        </>
      )}

      {activeTab === 'glossary' && (
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {glossaryTerms.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
          <h3 className="bin98-subheading">Primary Source Set</h3>
          <ul>
            {pageSources.map((source) => (
              <li key={source}>
                <a
                  href={source}
                  className="apigw-help98-inline-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  {source}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </TopicPageShell>
  )
}
