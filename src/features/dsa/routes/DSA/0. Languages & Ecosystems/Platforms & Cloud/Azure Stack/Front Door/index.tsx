import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import type { JSX, MouseEvent } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

type NarrativeSection = {
  id: string
  heading: string
  paragraphs: string[]
}

type ExampleSection = {
  id: string
  title: string
  code: string
  explanation: string
}

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const pageTitle = 'Azure Front Door'
const pageSubtitle =
  'Global layer-7 entry point for acceleration, routing, edge security, and optional caching in front of web applications and APIs.'

const introParagraphs = [
  "Azure Front Door is Microsoft Azure's globally distributed application delivery network for HTTP and HTTPS traffic. It sits at the edge, terminates client connections close to users, evaluates routes and rules, protects traffic with web application firewall policies, and forwards requests to the most appropriate backend origin based on health, latency, and configuration.",
  'The service is best understood as a managed layer-7 reverse proxy with edge acceleration capabilities, not as a generic load balancer. It is designed for internet-facing web applications, APIs, and content delivery scenarios where teams need a single global entry point, TLS offload, routing logic, optional caching, and security controls without building their own worldwide proxy fleet.',
  'This page treats Azure Front Door as a platform topic: profiles, endpoints, custom domains, routes, origin groups, health probes, load-balancing behavior, caching, rules engine, Web Application Firewall, Private Link to origins, observability, cost shape, comparisons, architecture patterns, and the operational decisions that determine whether Front Door is the right edge service for a workload.',
]

const bigPictureSections: Array<{ title: string; paragraphs: string[] }> = [
  {
    title: 'What it is',
    paragraphs: [
      "Azure Front Door is a globally distributed edge service for web traffic. Clients connect to Microsoft's edge network, Front Door applies TLS, routing, rule processing, and security policy, then it forwards requests to backend origins such as App Service, AKS ingress, Application Gateway, public VMs, storage static websites, or other HTTP-capable services.",
      'Because it operates at layer 7, Front Door understands HTTP concepts such as host names, paths, methods, headers, cookies, redirects, and caching. That makes it different from layer-4 products such as Azure Load Balancer, and different from DNS-level traffic steering such as Traffic Manager. Front Door participates directly in each request rather than only helping the client choose a destination.',
    ],
  },
  {
    title: 'Why teams use it',
    paragraphs: [
      'Teams use Front Door when they want one internet-facing hostname or set of hostnames in front of applications deployed across one or more Azure regions or clouds. It is particularly attractive when the application needs global failover, low-latency edge termination, centralized WAF policy, path-based routing, redirect or header logic, or content caching close to users.',
      'It is also a common fit when organizations want to standardize the public edge. Instead of each product team exposing its own public endpoint and security policy, Front Door can become the controlled edge tier where TLS certificates, bot and WAF policy, custom domains, and routing standards are managed consistently.',
    ],
  },
  {
    title: 'How to think about it',
    paragraphs: [
      'The right mental model is edge proxy plus policy engine plus origin-selection system. The public client talks to Front Door first. Front Door then decides which route matches, which rule sets fire, which origin group is eligible, which healthy origin should receive the request, whether the response can be cached, and which headers or redirects should be applied. If any of those decisions are weak, the edge layer becomes a source of outage or confusion rather than resilience.',
      'A healthy design starts with request flow, hostnames, custom domain ownership, origin reachability, health-probe assumptions, cacheability, security posture, and failure behavior. Teams that begin with the portal instead of the request model usually end up with ad hoc routes, overlapping rules, and brittle origin assumptions.',
    ],
  },
  {
    title: 'SKU and product direction',
    paragraphs: [
      'Current Microsoft guidance focuses on Azure Front Door Standard and Azure Front Door Premium as the main service offerings. Both support global layer-7 delivery, routing, rule sets, and WAF integration, while Premium adds capabilities such as Private Link to supported origins and additional security-focused scenarios. SKU choice is not cosmetic because it affects architecture options.',
      'Microsoft documentation also continues to call out retirement planning for Azure Front Door (classic). That matters because many older articles, blog posts, and examples still reference the classic model. New designs should target Standard or Premium and avoid inheriting the classic architecture unless the migration path is already defined.',
    ],
  },
  {
    title: 'What changed recently',
    paragraphs: [
      "As of the official Microsoft Learn material current on March 13, 2026, Private Link with Front Door Premium remains one of the most important architecture features because it allows Microsoft's edge to reach supported origins without exposing them publicly to the broader internet. The documentation also continues to emphasize Standard and Premium service limits, billing dimensions, and rule-engine flexibility as first-class design inputs rather than afterthoughts.",
      'Operational guidance also remains centered on route design, origin health tuning, and WAF policy discipline. These are not secondary features. In practice, most real Front Door production incidents come from route or origin misconfiguration, incomplete origin trust assumptions, or rules that unexpectedly rewrite or redirect traffic.',
    ],
  },
]

const operatingModelGuide = [
  {
    title: 'Profile is the administrative boundary',
    detail:
      'A Front Door profile contains endpoints, routes, origin groups, rule sets, domains, and policy associations for a given deployment boundary.',
  },
  {
    title: 'Endpoint is the edge hostname boundary',
    detail:
      'Each endpoint exposes a Front Door-provided hostname and acts as a public edge entry point that can also host custom domains.',
  },
  {
    title: 'Domain and route define request matching',
    detail:
      'Host names and path patterns determine which route handles a request and which origin group and forwarding behavior are applied.',
  },
  {
    title: 'Origin group is the backend decision unit',
    detail:
      'An origin group contains one or more origins and defines health probing, load balancing, failover, and session-affinity related behavior.',
  },
  {
    title: 'Rule sets add programmable edge behavior',
    detail:
      'Rules can modify requests and responses, redirect, rewrite URLs, influence caching, and enforce edge logic before forwarding.',
  },
  {
    title: 'WAF policy is the security control plane',
    detail:
      'Web Application Firewall policies apply managed and custom protections such as OWASP rules, rate limiting, and allow or block logic.',
  },
]

const fitGuide = [
  {
    title: 'Need one global HTTPS entry point for web apps or APIs',
    choice: 'Azure Front Door is a strong fit.',
  },
  {
    title: 'Need edge TLS termination, custom domains, redirects, and path-based routing',
    choice: 'Front Door is designed for that layer-7 work.',
  },
  {
    title: 'Need CDN-style caching plus application routing and WAF in one edge service',
    choice: 'Front Door can be a good fit if caching behavior matches the workload.',
  },
  {
    title: 'Need only private east-west traffic inside a virtual network',
    choice:
      'Front Door is not the right tool; an internal load-balancing approach is usually better.',
  },
  {
    title: 'Need only DNS-based regional failover without proxying requests',
    choice: 'Traffic Manager may be simpler than Front Door.',
  },
  {
    title: 'Need regional layer-7 load balancing inside one Azure region or VNet boundary',
    choice:
      'Application Gateway may be a better fit than putting everything behind Front Door alone.',
  },
]

const keyTakeaways = [
  'Azure Front Door is a global layer-7 edge proxy, not just DNS failover and not just a CDN.',
  'Profiles, endpoints, routes, origin groups, and rule sets are the main design vocabulary of the service.',
  'Origin health probes, route matching, and rule precedence are operationally critical and should be designed deliberately.',
  'Front Door Premium is especially important when origins should stay private through Private Link.',
  'Most production pain comes from route overlap, weak origin assumptions, or security posture that treats the origin as public anyway.',
]

const coreConceptSections: NarrativeSection[] = [
  {
    id: 'core-topology',
    heading: 'Profiles, Endpoints, Domains, Routes, Origin Groups, and Origins',
    paragraphs: [
      'The Standard and Premium resource model is modular. A profile is the top-level container. Inside it, endpoints expose edge hostnames, custom domains bind real public names, routes decide which requests are handled, origin groups hold backend pools and health settings, and origins represent the actual backend addresses that receive traffic.',
      'This structure matters because it separates concerns. Routes answer the question, "Which traffic pattern is this?" Origin groups answer, "Where can this traffic go?" Rules answer, "What should happen to the request or response on the way?" Teams that blend those mental models usually end up with duplicated routes, conflicting rewrites, and hard-to-debug traffic behavior.',
      'The right design tends to treat the profile as an application-delivery boundary, not a random collection bucket. If unrelated systems share a profile, route and policy sprawl can become difficult to reason about. If every tiny service gets its own profile, operational consistency suffers. The profile boundary should be chosen with governance and blast radius in mind.',
    ],
  },
  {
    id: 'core-request-flow',
    heading: 'Request Flow, Route Matching, and Why Order Matters',
    paragraphs: [
      'A typical request flow begins with DNS resolution for a Front Door endpoint or custom domain, followed by the client connecting to the nearest Microsoft edge location over HTTPS. Front Door terminates the client connection, evaluates the incoming host and path against routes, runs any attached rule sets, checks cache behavior if caching is enabled, and then forwards the request to a selected healthy origin.',
      'Route matching is not a cosmetic detail. Host name and path pattern design determine whether the right backend receives the request at all. Overlapping route patterns, ambiguous wildcards, and undocumented rewrite logic are common sources of misrouting. A team should be able to explain, on paper, exactly why /api/orders/42 on a given host lands on a given origin group.',
      'The operational lesson is to keep routing explicit. Reserve wildcard behavior for cases where it is truly intended, and document which hosts and path prefixes belong to which application surfaces. If the request model is unclear, Front Door will surface that confusion very quickly.',
    ],
  },
  {
    id: 'core-origins',
    heading: 'Origins, Origin Hosts, Host Headers, and Backend Reachability',
    paragraphs: [
      'An origin is the actual backend destination Front Door talks to. That may be an App Service default hostname, an Application Gateway frontend, a VM-hosted site, a public load balancer IP with HTTP service behind it, or another supported HTTP endpoint. Each origin has a host, ports, priority, weight, and origin host header behavior.',
      'The host header setting is especially important. Many backends rely on the incoming host name to decide which site or certificate to serve. If Front Door forwards the wrong host header, the backend may route incorrectly, reject the request, or present the wrong certificate. This is one of the most common mistakes when onboarding App Service or custom reverse-proxy origins.',
      'Reachability is also a design concern. A healthy public test does not guarantee a healthy Front Door path if probe paths, expected status codes, TLS requirements, or hostname assumptions differ. Origin onboarding should include explicit validation of host header behavior, certificates, probe responses, and whether the origin is intended to stay public or should be protected behind Premium Private Link.',
    ],
  },
  {
    id: 'core-health',
    heading: 'Health Probes, Load Balancing, Priority, Weight, and Failover',
    paragraphs: [
      'Front Door continuously evaluates origin health using configurable HTTP or HTTPS health probes. If probes fail, the edge stops sending normal traffic to the unhealthy origin and shifts traffic toward healthy alternatives in the same origin group according to the configured load-balancing model.',
      'Priority and weight have different roles. Priority is usually used for active-passive style failover, where one origin should receive traffic unless it becomes unhealthy. Weight is used when multiple healthy origins should share traffic. Combining probe behavior, priority, and weight allows teams to model active-active, active-passive, or uneven traffic distribution strategies.',
      'Probe design deserves care. A probe path that returns 200 even when the application is broken creates false confidence. A probe path that depends on a slow or fragile downstream dependency may flap unnecessarily. Good probe endpoints are fast, representative enough to detect meaningful failure, and stable under normal deployment activity.',
    ],
  },
  {
    id: 'core-caching',
    heading: 'Caching, Compression, and Performance Acceleration',
    paragraphs: [
      'Azure Front Door can cache eligible content at the edge so repeat requests can be served closer to users without always hitting the origin. This is particularly useful for static assets, media, site bundles, and cache-friendly API responses. Edge caching reduces origin load, improves latency, and can materially change the cost profile of the overall application.',
      'Caching is not magical. It depends on route configuration, cacheability of responses, query-string behavior, and invalidation strategy. If the application emits inconsistent cache headers or depends on highly personalized responses, an aggressive cache policy can create stale or incorrect responses. Teams need a clear content-classification model before enabling cache behavior broadly.',
      'Compression and caching together can provide significant performance gains, but only when the response patterns justify them. Front Door should not be treated as an excuse to avoid fixing oversized payloads or poor application caching semantics at the origin.',
    ],
  },
  {
    id: 'core-rules',
    heading: 'Rule Sets, Rewrites, Redirects, Header Manipulation, and Edge Logic',
    paragraphs: [
      'Rule sets turn Front Door into a programmable edge policy engine. Teams can redirect HTTP to HTTPS, normalize hosts, rewrite URL paths, add or remove headers, influence cache behavior, and make request handling conditional on path, method, header, country, device, or other request properties.',
      'This is powerful, but it also means the edge can become application logic if discipline is weak. Rules should primarily express delivery and security policy, not hide application behavior that developers can no longer trace. If critical product behavior depends on a complex stack of rewrites and header tricks, maintainability drops quickly.',
      'The most effective use of rule sets is targeted and explicit: canonical redirects, security headers, static-asset cache handling, URL normalization, and well-documented migration shims. The most dangerous use is silent business logic that nobody remembers until a production incident forces the team to read the edge configuration line by line.',
    ],
  },
  {
    id: 'core-waf',
    heading: 'Web Application Firewall, Managed Rules, Custom Rules, and Rate Limiting',
    paragraphs: [
      'Azure Web Application Firewall on Front Door provides a centrally managed protection layer for HTTP and HTTPS traffic. Managed rule sets help detect common attack patterns such as SQL injection and cross-site scripting, while custom rules let teams express allow, block, and rate-limiting behavior tailored to their applications.',
      'WAF design should be treated like an application-security engineering task, not a box-checking exercise. Turning on every possible rule without tuning can create false positives that break legitimate traffic. Running permanently in detection mode, on the other hand, often means the organization never actually blocks the behavior it is measuring.',
      'A mature rollout usually starts with observation, then exception tuning, then blocking for well-understood patterns. Rate limiting, IP restrictions, bot posture, and path-specific enforcement often provide more real operational value than generic statements about having a firewall enabled.',
    ],
  },
  {
    id: 'core-tls',
    heading: 'Custom Domains, HTTPS Certificates, and Hostname Ownership',
    paragraphs: [
      "Front Door supports custom domains so public traffic can arrive on the application's real host names rather than only the Azure-provided endpoint domain. Enabling a custom domain requires validating ownership and configuring DNS so that the hostname resolves to Front Door correctly.",
      'TLS is one of the main reasons teams adopt a managed edge. Front Door can manage certificates for supported scenarios and terminate HTTPS at the edge, reducing certificate handling burden on individual application teams. But the certificate lifecycle does not remove the need to understand hostname ownership, DNS cutover, and origin certificate assumptions.',
      'Backends may still need correct certificates and trusted names depending on the origin configuration. Teams should separate client-to-edge TLS concerns from edge-to-origin TLS concerns and validate both paths explicitly.',
    ],
  },
  {
    id: 'core-private-link',
    heading: 'Private Link, Premium Origins, and Reducing Public Exposure',
    paragraphs: [
      "One of the most important Premium capabilities is Private Link to supported origins. This allows Front Door to connect to the backend over Microsoft's private connectivity model rather than requiring the origin to remain broadly exposed on the public internet. For many modern Azure architectures, this is the deciding feature between Standard and Premium.",
      'Private Link does not mean the origin becomes magically secure without further thought. The origin still needs correct approval flow, DNS planning, authentication, and policy. But it does let teams enforce the much healthier architecture in which the edge is public and the application backend is not.',
      'If a system handles sensitive traffic or belongs to a tightly governed platform, it is often worth paying for Premium to eliminate the pattern where the origin is internet-reachable and Front Door is treated as only an optional facade.',
    ],
  },
  {
    id: 'core-origin-security',
    heading: 'Origin Protection, Trust Boundaries, and Preventing Bypass',
    paragraphs: [
      'A common mistake is to put Front Door in front of an application while leaving the backend fully public and unprotected. In that design, an attacker or even a misconfigured client can bypass the edge and talk directly to the origin, avoiding WAF, host normalization, or centralized policy.',
      'Microsoft documentation around origin security emphasizes techniques such as restricting backend access, validating expected hostnames, and using features such as Private Link where possible. The design goal is simple: the origin should trust Front Door as the intended public path, not act as an equally public alternative.',
      'This is a trust-boundary issue, not only a networking issue. If the origin assumes headers inserted by Front Door are authoritative, or if authentication flows assume all traffic passed through the edge, origin bypass becomes a serious security problem.',
    ],
  },
  {
    id: 'core-observability',
    heading: 'Monitoring, Logs, Metrics, Diagnostics, and Troubleshooting',
    paragraphs: [
      'Front Door exposes metrics and diagnostic logs that help teams understand request volume, cache effectiveness, origin health, WAF activity, and routing outcomes. These signals belong in the normal operational telemetry pipeline, not only in one-time setup validation.',
      'Troubleshooting Front Door usually requires looking at both the edge and the origin. A 502 or 503 may come from origin unhealthiness, probe failure, TLS mismatch, host-header issues, or route configuration rather than from a generic Front Door outage. Without joined telemetry, teams often blame the wrong layer.',
      'Strong runbooks should cover request tracing, known route precedence, probe endpoints, certificate and DNS checks, and WAF block diagnostics. Edge services fail in patterns that are understandable, but only if the team collects the right evidence.',
    ],
  },
  {
    id: 'core-cost',
    heading: 'Billing Model, Cost Drivers, and Designing for Predictable Spend',
    paragraphs: [
      'Front Door billing is not just a flat monthly line item. Microsoft bills across dimensions such as outbound data transfer, request volume, WAF policy usage, rule processing, and in some cases Private Link related usage or other premium capabilities. That means cost follows traffic shape and feature usage, not just whether the profile exists.',
      'Caching can reduce origin cost and improve performance, but it may shift more of the delivery cost into Front Door itself. WAF adds security value but also cost. Premium adds architecture options that may justify its price by reducing public exposure and simplifying origin security. The right question is not Which SKU is cheapest? but Which edge design is the cheapest safe design for the traffic pattern we actually have?',
      'Capacity planning should consider requests per second, egress volume, cache hit ratio, region distribution, and how many domains, routes, and rules the platform team expects to manage. A small prototype and a global production application can have very different Front Door cost behavior.',
    ],
  },
  {
    id: 'core-limits',
    heading: 'Service Limits, Scale Boundaries, and Why Limits Belong in Design Reviews',
    paragraphs: [
      'Azure Front Door Standard and Premium have documented service limits around profiles, endpoints, routes, origin groups, origins, rule sets, and other configuration dimensions. These limits are not academic. Platform teams that centralize many applications into one profile can run into them faster than expected.',
      'Limits should be reviewed during architecture design, especially for multi-tenant platforms or shared enterprise edge deployments. Waiting until the shared profile is already crowded turns a limit check into a migration project.',
      'The practical approach is to treat service limits as a placement input. If one profile is going to serve dozens or hundreds of hostnames with many rules and routes, validate that structure against current Microsoft limits before institutionalizing it.',
    ],
  },
]

const compareNotes = [
  {
    title: 'Front Door vs Traffic Manager',
    detail:
      'Traffic Manager is DNS-based steering and does not proxy each request. Front Door is a live layer-7 edge proxy that terminates traffic, applies WAF and rules, and forwards requests itself.',
  },
  {
    title: 'Front Door vs Application Gateway',
    detail:
      'Application Gateway is typically regional and often VNet-centric, while Front Door is globally distributed and internet-edge focused. Many architectures use Front Door at the global edge and Application Gateway regionally behind it.',
  },
  {
    title: 'Front Door vs Azure Load Balancer',
    detail:
      'Azure Load Balancer is layer 4 and does not understand HTTP paths, hostnames, redirects, or WAF policy. Front Door is layer 7 and is built for HTTP and HTTPS application delivery.',
  },
  {
    title: 'Front Door vs a pure CDN',
    detail:
      'A traditional CDN focuses primarily on content caching and delivery. Front Door adds richer application routing, origin selection, and integrated web application security as part of the edge path.',
  },
]

const designPatterns = [
  {
    title: 'Global active-active web application',
    detail:
      'Use one route and origin group spanning multiple healthy regional origins, with probes and weighted balancing, so users land on low-latency healthy backends.',
  },
  {
    title: 'Regional disaster recovery',
    detail:
      'Use origin priority for active-passive failover so the standby region only receives traffic when the preferred region becomes unhealthy.',
  },
  {
    title: 'Static and dynamic split delivery',
    detail:
      'Send /assets/* to a cache-friendly origin configuration and /api/* to uncached API origins, with different rule sets and security posture per route.',
  },
  {
    title: 'Public edge with private backend',
    detail:
      'Use Front Door Premium with Private Link to keep origins non-public while still exposing a global public edge endpoint.',
  },
  {
    title: 'Enterprise security choke point',
    detail:
      'Centralize public custom domains, managed TLS, WAF policy, redirect policy, and edge header standards in Front Door while application teams own only their backend services.',
  },
]

const operationalChecklist = [
  'Document every hostname and path pattern that each route owns before creating wildcard rules.',
  'Validate host-header behavior explicitly for every origin, especially App Service and reverse-proxy backends.',
  'Use health-probe endpoints that represent meaningful application health without depending on fragile downstream chains.',
  'Decide whether origins are allowed to stay public; if not, use origin restrictions or Front Door Premium Private Link.',
  'Tune WAF in detection before broad blocking, then move to prevention for understood traffic patterns.',
  'Separate cache-friendly routes from dynamic or personalized routes instead of applying one cache posture everywhere.',
  'Review current Microsoft service limits before concentrating many domains and routes into one shared profile.',
  'Feed Front Door metrics, diagnostics, and WAF logs into the normal incident-response and observability pipeline.',
]

const pitfalls = [
  'Using ambiguous wildcard routes and then being surprised when traffic lands on the wrong backend.',
  'Assuming Front Door makes the origin secure while the origin is still fully public and bypassable.',
  'Forwarding the wrong host header to an origin and causing backend routing or certificate failures.',
  'Treating WAF enablement as complete security without tuning false positives or defining enforcement posture.',
  'Enabling caching broadly for responses that are user-specific, short-lived, or not safe to serve from cache.',
  'Choosing Standard when Premium Private Link is actually required by the origin security model.',
  'Ignoring probe design so unhealthy applications still pass health checks or healthy applications flap out of rotation.',
]
const examples: ExampleSection[] = [
  {
    id: 'example-cli-skeleton',
    title: 'Azure CLI Skeleton for a Basic Front Door Deployment',
    code: `
az afd profile create \
  --resource-group rg-edge-prod \
  --profile-name fd-prod \
  --sku Premium_AzureFrontDoor

az afd endpoint create \
  --resource-group rg-edge-prod \
  --profile-name fd-prod \
  --endpoint-name global-app

az afd origin-group create \
  --resource-group rg-edge-prod \
  --profile-name fd-prod \
  --origin-group-name app-origins \
  --probe-request-type GET \
  --probe-protocol Https \
  --probe-path /healthz \
  --sample-size 4 \
  --successful-samples-required 3

az afd origin create \
  --resource-group rg-edge-prod \
  --profile-name fd-prod \
  --origin-group-name app-origins \
  --origin-name app-eastus \
  --host-name app-eastus.contoso.internal \
  --origin-host-header app.contoso.com \
  --priority 1 \
  --weight 1000 \
  --enabled-state Enabled

az afd route create \
  --resource-group rg-edge-prod \
  --profile-name fd-prod \
  --endpoint-name global-app \
  --route-name app-route \
  --origin-group app-origins \
  --supported-protocols Http Https \
  --patterns-to-match '/*' \
  --forwarding-protocol MatchRequest \
  --https-redirect Enabled
`,
    explanation:
      'This example shows the main control-plane shape: profile, endpoint, origin group, origin, and route. It is intentionally small, but the sequence reflects how most real deployments are assembled.',
  },
  {
    id: 'example-bicep-route',
    title: 'Bicep Example for a Static Assets Route with Edge Caching',
    code: `
resource profile 'Microsoft.Cdn/profiles@2024-02-01' = {
  name: 'fd-prod'
  location: 'global'
  sku: {
    name: 'Standard_AzureFrontDoor'
  }
}

resource endpoint 'Microsoft.Cdn/profiles/afdEndpoints@2024-02-01' = {
  name: 'fd-prod/assets-endpoint'
  location: 'global'
  properties: {
    enabledState: 'Enabled'
  }
}

resource route 'Microsoft.Cdn/profiles/afdEndpoints/routes@2024-02-01' = {
  name: 'fd-prod/assets-endpoint/assets-route'
  properties: {
    originGroup: {
      id: resourceId('Microsoft.Cdn/profiles/originGroups', 'fd-prod', 'assets-origins')
    }
    supportedProtocols: [
      'Http'
      'Https'
    ]
    patternsToMatch: [
      '/assets/*'
    ]
    forwardingProtocol: 'MatchRequest'
    httpsRedirect: 'Enabled'
    cacheConfiguration: {
      queryStringCachingBehavior: 'IgnoreSpecifiedQueryStrings'
      queryParameters: 'v'
      compressionSettings: {
        isCompressionEnabled: true
        contentTypesToCompress: [
          'text/css'
          'application/javascript'
          'application/json'
        ]
      }
    }
    linkToDefaultDomain: 'Enabled'
    enabledState: 'Enabled'
  }
}
`,
    explanation:
      'The route isolates cache-friendly static content from dynamic application traffic. That separation is usually easier to reason about than trying to force one route to fit both content classes.',
  },
  {
    id: 'example-rules',
    title: 'Rule-Set Pattern for Canonical Redirect and Security Headers',
    code: `
if request.scheme == "HTTP" then
  redirect 301 to "https://{host}{path}"

if request.host == "www.contoso.com" then
  redirect 301 to "https://contoso.com{path_and_query}"

on response:
  set-header "Strict-Transport-Security" "max-age=31536000; includeSubDomains"
  set-header "X-Content-Type-Options" "nosniff"
  set-header "Referrer-Policy" "strict-origin-when-cross-origin"
`,
    explanation:
      'This shows the kind of edge logic that belongs naturally in Front Door: canonical HTTPS redirects and security header normalization. It is page-delivery policy, not hidden business logic.',
  },
  {
    id: 'example-private-link',
    title: 'Architecture Sketch for Public Edge with Premium Private Link Origins',
    code: `
Internet client
   |
   v
Azure Front Door Premium
   |  TLS termination, WAF, route selection, rules
   |
Private Link connection
   |
   v
Private App Service / internal application origin
   |
   v
App dependencies in virtual network
`,
    explanation:
      'The important design idea is that the public surface ends at Front Door. The origin stays private, which reduces bypass risk and keeps edge security controls meaningful.',
  },
]

const glossaryTerms = [
  {
    term: 'Profile',
    definition:
      'The top-level Azure Front Door resource boundary that contains endpoints, domains, routes, origin groups, and related policy objects.',
  },
  {
    term: 'Endpoint',
    definition:
      'A Front Door edge endpoint with a Microsoft-provided hostname that can also host custom domains.',
  },
  {
    term: 'Route',
    definition:
      'A mapping that matches host and path patterns, then defines how requests are forwarded and which origin group is used.',
  },
  {
    term: 'Origin Group',
    definition: 'A logical set of backend origins plus health-probe and load-balancing behavior.',
  },
  {
    term: 'Origin',
    definition:
      'A specific backend destination that receives traffic from Front Door, such as App Service, Application Gateway, or a web server host.',
  },
  {
    term: 'Health Probe',
    definition:
      'A periodic HTTP or HTTPS request Front Door uses to decide whether an origin is healthy enough to receive traffic.',
  },
  {
    term: 'Rule Set',
    definition:
      'A collection of conditional edge actions such as redirects, rewrites, header changes, and cache-related behavior.',
  },
  {
    term: 'WAF',
    definition:
      'Web Application Firewall protection attached to Front Door for managed threat detection, custom filtering, and rate limiting.',
  },
  {
    term: 'Private Link',
    definition:
      'A private connectivity model that allows Front Door Premium to reach supported origins without leaving them broadly public.',
  },
  {
    term: 'POP',
    definition:
      "Point of presence; an edge location where Front Door accepts client traffic on Microsoft's global network.",
  },
]

const pageSources = [
  'https://learn.microsoft.com/en-us/azure/frontdoor/front-door-overview',
  'https://learn.microsoft.com/en-us/azure/frontdoor/origin',
  'https://learn.microsoft.com/en-us/azure/frontdoor/health-probes',
  'https://learn.microsoft.com/en-us/azure/frontdoor/routing-methods',
  'https://learn.microsoft.com/en-us/azure/frontdoor/front-door-rules-engine',
  'https://learn.microsoft.com/en-us/azure/frontdoor/front-door-rules-engine-actions',
  'https://learn.microsoft.com/en-us/azure/frontdoor/front-door-caching',
  'https://learn.microsoft.com/en-us/azure/frontdoor/private-link',
  'https://learn.microsoft.com/en-us/azure/frontdoor/origin-security',
  'https://learn.microsoft.com/en-us/azure/frontdoor/billing',
  'https://learn.microsoft.com/en-us/azure/web-application-firewall/afds/afds-overview',
  'https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/azure-subscription-service-limits#azure-front-door-standard-and-premium-service-limits',
  'https://learn.microsoft.com/en-us/azure/frontdoor/front-door-custom-domain',
  'https://learn.microsoft.com/en-us/azure/frontdoor/tier-comparison',
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
    { id: 'bp-model', label: 'Operating Model' },
    { id: 'bp-fit', label: 'When to Use It' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-topology', label: 'Topology Model' },
    { id: 'core-request-flow', label: 'Request Flow' },
    { id: 'core-origins', label: 'Origins' },
    { id: 'core-health', label: 'Health and Failover' },
    { id: 'core-caching', label: 'Caching' },
    { id: 'core-rules', label: 'Rule Sets' },
    { id: 'core-waf', label: 'WAF' },
    { id: 'core-tls', label: 'Custom Domains and TLS' },
    { id: 'core-private-link', label: 'Private Link' },
    { id: 'core-origin-security', label: 'Origin Security' },
    { id: 'core-observability', label: 'Observability' },
    { id: 'core-cost', label: 'Cost' },
    { id: 'core-limits', label: 'Service Limits' },
    { id: 'core-compare', label: 'Compare and Contrast' },
    { id: 'core-patterns', label: 'Design Patterns' },
    { id: 'core-ops-checklist', label: 'Operational Checklist' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
  ],
  examples: examples.map((example) => ({
    id: example.id,
    label: example.title,
  })),
  glossary: [
    { id: 'glossary-terms', label: 'Terms' },
    { id: 'glossary-sources', label: 'Primary Sources' },
  ],
}

function isTabId(value: string | null): value is TabId {
  return (
    value === 'big-picture' ||
    value === 'core-concepts' ||
    value === 'examples' ||
    value === 'glossary'
  )
}

function getTabFromSearch(search: string): TabId {
  const tab = new URLSearchParams(search).get('tab')
  return isTabId(tab) ? tab : 'big-picture'
}

const win98HelpStyles = `
.azure-front-door-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.azure-front-door-help-page .win98-window {
  min-height: 100dvh;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background: #c0c0c0;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
}

.azure-front-door-help-page .win98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 24px;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
}

.azure-front-door-help-page .win98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.azure-front-door-help-page .win98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.azure-front-door-help-page .win98-control {
  width: 18px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000000;
  text-decoration: none;
  font-size: 11px;
  line-height: 1;
}

.azure-front-door-help-page .win98-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
}

.azure-front-door-help-page .win98-tab {
  padding: 5px 10px 4px;
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  font-size: 12px;
  cursor: pointer;
  font-family: inherit;
}

.azure-front-door-help-page .win98-tab.active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.azure-front-door-help-page .win98-main {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  flex: 1;
  min-height: 0;
  border-top: 1px solid #404040;
  background: #ffffff;
}

.azure-front-door-help-page .win98-toc {
  overflow: auto;
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
}

.azure-front-door-help-page .win98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.azure-front-door-help-page .win98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.azure-front-door-help-page .win98-toc-list li {
  margin: 0 0 8px;
}

.azure-front-door-help-page .win98-toc-list a {
  color: #000000;
  font-size: 12px;
  text-decoration: none;
}

.azure-front-door-help-page .win98-content {
  overflow-x: auto;
  overflow-y: scroll;
  scrollbar-gutter: stable;
  padding: 14px 20px 20px;
}

.azure-front-door-help-page .win98-doc-title {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 700;
}

.azure-front-door-help-page .win98-doc-subtitle {
  margin: 0 0 12px;
  font-size: 12px;
  font-weight: 700;
}

.azure-front-door-help-page .win98-section {
  margin: 0 0 22px;
}

.azure-front-door-help-page .win98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.azure-front-door-help-page .win98-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.azure-front-door-help-page .win98-content p,
.azure-front-door-help-page .win98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.azure-front-door-help-page .win98-content p {
  margin: 0 0 10px;
}

.azure-front-door-help-page .win98-content ul,
.azure-front-door-help-page .win98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.azure-front-door-help-page .win98-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.azure-front-door-help-page .win98-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.azure-front-door-help-page .win98-codebox code {
  display: block;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
}

.azure-front-door-help-page .win98-inline-link {
  color: #000080;
}

@media (max-width: 900px) {
  .azure-front-door-help-page .win98-main {
    grid-template-columns: 1fr;
  }

  .azure-front-door-help-page .win98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .azure-front-door-help-page .win98-title-text {
    position: static;
    transform: none;
    margin-left: 8px;
    font-size: 14px;
  }
}
`

export default function AzureFrontDoorPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const contentRef = useRef<HTMLElement | null>(null)
  const [activeTab, setActiveTab] = useState<TabId>(() => getTabFromSearch(location.search))

  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const url = new URL(window.location.href)
    const nextSearch = new URLSearchParams(url.search)
    const shouldClearHash = url.hash.length > 0
    if (nextSearch.get('tab') !== activeTab || shouldClearHash) {
      nextSearch.set('tab', activeTab)
      window.history.replaceState(
        window.history.state,
        '',
        `${url.pathname}?${nextSearch.toString()}`,
      )
    }
    document.title = `${pageTitle} (${activeTabLabel})`
  }, [activeTab, activeTabLabel])

  useEffect(() => {
    const currentHash = window.location.hash.slice(1)
    if (!currentHash) {
      return
    }

    const container = contentRef.current
    const target = document.getElementById(currentHash)
    if (!container || !target || !container.contains(target)) {
      return
    }

    container.scrollTo({ top: Math.max(target.offsetTop - 8, 0), left: 0, behavior: 'auto' })
  }, [activeTab])

  const handleTabChange = (tabId: TabId) => {
    if (tabId === activeTab) {
      return
    }

    setActiveTab(tabId)
    contentRef.current?.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }

  const handleSectionJump = (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    event.preventDefault()

    const container = contentRef.current
    const target = document.getElementById(sectionId)
    if (!container || !target || !container.contains(target)) {
      return
    }

    container.scrollTo({ top: Math.max(target.offsetTop - 8, 0), left: 0, behavior: 'auto' })

    const url = new URL(window.location.href)
    window.history.replaceState(
      window.history.state,
      '',
      `${url.pathname}${url.search}#${sectionId}`,
    )
  }

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: pageTitle,
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
    <div className="azure-front-door-help-page">
      <style>{win98HelpStyles}</style>
      <div className="win98-window" role="presentation">
        <header className="win98-titlebar">
          <span className="win98-title-text">{pageTitle}</span>
          <div className="win98-title-controls">
            <button
              className="win98-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="win98-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="win98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`win98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="win98-main">
          <aside className="win98-toc" aria-label="Table of contents">
            <h2 className="win98-toc-title">Contents</h2>
            <ul className="win98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={(event) => handleSectionJump(event, section.id)}
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <main ref={contentRef} className="win98-content">
            <h1 className="win98-doc-title">{pageTitle}</h1>
            <p className="win98-doc-subtitle">{pageSubtitle}</p>
            {introParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p>
              The title-bar minimize control returns to the previous page when possible, or to{' '}
              <Link to="/algoViz" className="win98-inline-link">
                /algoViz
              </Link>{' '}
              when there is no prior history entry.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="win98-section">
                  <h2 className="win98-heading">Overview</h2>
                  {bigPictureSections.map((section) => (
                    <div key={section.title}>
                      <h3 className="win98-subheading">{section.title}</h3>
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  ))}
                </section>

                <hr className="win98-divider" />

                <section id="bp-model" className="win98-section">
                  <h2 className="win98-heading">Operating Model</h2>
                  {operatingModelGuide.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <hr className="win98-divider" />

                <section id="bp-fit" className="win98-section">
                  <h2 className="win98-heading">When to Use It</h2>
                  <ul>
                    {fitGuide.map((item) => (
                      <li key={item.title}>
                        <strong>{item.title}:</strong> {item.choice}
                      </li>
                    ))}
                  </ul>
                </section>

                <hr className="win98-divider" />

                <section id="bp-takeaways" className="win98-section">
                  <h2 className="win98-heading">Key Takeaways</h2>
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
                {coreConceptSections.map((section) => (
                  <section key={section.id} id={section.id} className="win98-section">
                    <h2 className="win98-heading">{section.heading}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </section>
                ))}

                <section id="core-compare" className="win98-section">
                  <h2 className="win98-heading">Compare and Contrast</h2>
                  {compareNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-patterns" className="win98-section">
                  <h2 className="win98-heading">Design Patterns</h2>
                  {designPatterns.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-ops-checklist" className="win98-section">
                  <h2 className="win98-heading">Operational Checklist</h2>
                  <ul>
                    {operationalChecklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section id="core-pitfalls" className="win98-section">
                  <h2 className="win98-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                {examples.map((example) => (
                  <section key={example.id} id={example.id} className="win98-section">
                    <h2 className="win98-heading">{example.title}</h2>
                    <div className="win98-codebox">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </section>
                ))}
              </>
            )}

            {activeTab === 'glossary' && (
              <>
                <section id="glossary-terms" className="win98-section">
                  <h2 className="win98-heading">Glossary</h2>
                  {glossaryTerms.map((item) => (
                    <p key={item.term}>
                      <strong>{item.term}:</strong> {item.definition}
                    </p>
                  ))}
                </section>

                <section id="glossary-sources" className="win98-section">
                  <h2 className="win98-heading">Primary Sources</h2>
                  <p>
                    This content was compiled from official Microsoft Learn documentation current as
                    checked on March 13, 2026. Azure Front Door features, SKU capabilities, limits,
                    and retirement guidance can change, so production decisions should always be
                    revalidated against the current documentation.
                  </p>
                  <ul>
                    {pageSources.map((source) => (
                      <li key={source}>
                        <a
                          href={source}
                          className="win98-inline-link"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {source}
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
