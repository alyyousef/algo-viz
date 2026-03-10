import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const pageTitle = 'AWS CloudFront'
const pageSubtitle = 'AWS global CDN for caching, acceleration, security, and edge compute.'

const bigPictureSections = [
  {
    title: 'What it is',
    paragraphs: [
      'Amazon CloudFront is AWS\'s content delivery network. It places cached copies of content at edge locations close to viewers, so requests do not have to travel all the way back to the origin on every access.',
      'CloudFront is not limited to static files. It can accelerate websites, APIs, media delivery, software downloads, and private application traffic. The core contract is simple: viewers talk to a distribution, the distribution decides whether to serve from cache or go to an origin, and policies determine how requests and responses are handled at the edge.',
    ],
  },
  {
    title: 'Where it fits',
    paragraphs: [
      'CloudFront usually sits in front of an origin such as Amazon S3, an Application Load Balancer, API Gateway, an EC2-hosted application, MediaPackage, or another HTTP server. It becomes the public edge, while the origin remains the content source.',
      'In mature architectures, CloudFront often combines multiple concerns in one layer: TLS termination, cache control, geo strategy, signed access, origin protection, response header injection, edge compute, and request logging.',
    ],
  },
  {
    title: 'Why teams use it',
    paragraphs: [
      'The obvious reason is latency reduction through caching. The less obvious reason is edge control. CloudFront lets you shape the cache key, normalize or forward headers, protect S3 with origin access control, attach AWS WAF, rewrite requests at the edge, and separate public traffic from internal origin topology.',
      'That makes it useful even when cache hit rates are modest. Many teams use CloudFront primarily as the secure and programmable front door for web delivery rather than just as a static file cache.',
    ],
  },
  {
    title: 'When it is not the right answer',
    paragraphs: [
      'If your workload is entirely private and never needs internet-facing delivery, a CDN may be unnecessary. If traffic is highly personalized and every response is effectively uncacheable, CloudFront still provides edge and security value, but the cost-benefit equation is different.',
      'It is also easy to misuse CloudFront as a place for accidental application logic. Request rewriting, headers, auth hints, and redirects fit well at the edge. Deep business logic does not.',
    ],
  },
]

const coreConceptSections = [
  {
    id: 'core-distribution',
    heading: 'Distribution',
    paragraphs: [
      'A CloudFront distribution is the deployable delivery configuration. It defines origins, behaviors, cache and origin request policies, certificates, logging, security rules, and edge function attachments.',
      'You can think of the distribution as the public product boundary. Viewers never talk to the origin directly when the design is correct; they talk to the distribution domain or to a custom domain mapped to that distribution.',
      'Most important operational changes in CloudFront are distribution configuration changes. Because those propagate globally, you should treat them like production infrastructure releases rather than casual console edits.',
    ],
  },
  {
    id: 'core-origins',
    heading: 'Origins and Origin Groups',
    paragraphs: [
      'An origin is the backend CloudFront fetches from on cache misses or for non-cacheable requests. Common origin types are S3 buckets, custom HTTP origins, Application Load Balancers, API Gateway endpoints, or other AWS media services.',
      'Origin groups let you configure failover. CloudFront can try a primary origin first and then fail over to a secondary origin when configured status-code or connection conditions occur. This is useful for high-availability delivery and some disaster recovery patterns.',
      'Protect the origin wherever possible. For S3, the modern pattern is origin access control, which lets CloudFront sign origin requests and keep the bucket non-public. For custom origins, restrict who can reach the origin and avoid exposing it broadly if the distribution is meant to be the only public path.',
    ],
  },
  {
    id: 'core-behaviors',
    heading: 'Behaviors, Path Patterns, and Request Flow',
    paragraphs: [
      'Behaviors tell CloudFront what to do for a class of requests, usually matched by path pattern. A distribution may route one set of paths to S3, another to an ALB, and another to an API origin, each with different caching, headers, methods, and viewer protocol rules.',
      'Path pattern order matters because the first matching behavior wins. If a broad pattern is placed ahead of a specific one, requests may take the wrong route and debugging becomes surprisingly time-consuming.',
      'Viewer requests arrive at the edge, match a behavior, optionally run an edge function, and then either hit the cache or go to the origin using the policies attached to that behavior.',
    ],
  },
  {
    id: 'core-cache',
    heading: 'Cache Key and Cache Policies',
    paragraphs: [
      'The most important CloudFront design choice is the cache key. The cache key decides which requests are considered equivalent. If you include too many request attributes, your cache fragments and hit rate drops. If you include too few, viewers may receive incorrect content.',
      'CloudFront cache policies define which headers, cookies, and query strings affect the cache key, as well as TTL behavior. This is a major improvement over older coarse-grained behavior settings because it makes cache design explicit and reusable.',
      'A good cache key contains only what truly changes the response. Language, device class, or selected query fields may belong in the key. Random tracking headers and unnecessary cookies usually do not.',
    ],
  },
  {
    id: 'core-origin-request',
    heading: 'Origin Request Policies and Forwarding',
    paragraphs: [
      'The cache key and the origin request are related but not identical. Sometimes the origin needs information that should not fragment the cache. Origin request policies let you forward headers, cookies, or query strings to the origin without putting all of them into the cache key.',
      'That separation is operationally important. It lets you preserve observability or backend routing context while still keeping the cache efficient.',
      'Teams often over-forward request metadata. Forward only what the origin actually uses. Extra forwarding increases origin variability, complicates debugging, and can reduce cache usefulness indirectly.',
    ],
  },
  {
    id: 'core-ttl',
    heading: 'TTL, Revalidation, Invalidation, and Versioning',
    paragraphs: [
      'CloudFront caching behavior is driven by TTL rules and origin cache headers. The minimum, default, and maximum TTL settings interact with origin-provided headers such as Cache-Control and Expires.',
      'Invalidation removes cached objects from edge locations before they would naturally expire, but it should not be your only freshness strategy. In practice, versioned asset names are often cleaner for static assets because they turn deployment into a reference swap rather than a cache purge.',
      'Use invalidations deliberately for HTML shells, emergency revocations, or content that must change in place. Use versioned filenames for build artifacts whenever possible.',
    ],
  },
  {
    id: 'core-security',
    heading: 'Security and Private Content',
    paragraphs: [
      'CloudFront integrates with ACM certificates for HTTPS, supports viewer protocol policies, and can attach AWS WAF at the edge. These controls make the distribution a strong place to enforce transport and request filtering rules.',
      'For private content, CloudFront supports signed URLs and signed cookies. Signed URLs work well for object-level access control or expiring download links. Signed cookies work well when a user needs access to multiple protected objects under one session-like policy.',
      'For S3 origins, origin access control is the preferred modern mechanism. It allows CloudFront to fetch objects from S3 while the bucket itself remains non-public. This closes a common hole where users bypass the CDN and fetch directly from S3.',
    ],
  },
  {
    id: 'core-edge',
    heading: 'Edge Compute: CloudFront Functions and Lambda at Edge',
    paragraphs: [
      'CloudFront offers two edge compute models. CloudFront Functions are lightweight JavaScript functions designed for very fast request and response manipulation at viewer events. Lambda at Edge is heavier but more flexible, with broader runtime capabilities and event coverage.',
      'Use CloudFront Functions for tasks like URL normalization, header tweaks, lightweight redirects, bot or locale hints, and simple authentication gates. Use Lambda at Edge when you need more substantial logic, body access patterns, origin-request customization, or richer runtime features.',
      'Do not default to Lambda at Edge when a CloudFront Function is enough. The lighter tool is easier to operate and aligns better with high-throughput edge workloads.',
    ],
  },
  {
    id: 'core-observability',
    heading: 'Logging, Metrics, and Diagnostics',
    paragraphs: [
      'CloudFront provides standard logging and real-time logging options, plus CloudWatch metrics. The right mix depends on whether you need historical analysis, near-real-time operations, or detailed cache-behavior debugging.',
      'Cache hit ratio, origin latency, error rates, and bytes transferred are the first metrics most teams need. Standard logs are useful for forensic and traffic analysis. Real-time logs are useful when you need lower-latency visibility into edge behavior.',
      'Troubleshooting CloudFront almost always means reasoning about three layers at once: viewer request, distribution policy, and origin response. Logs need enough fields to reconstruct that path.',
    ],
  },
  {
    id: 'core-performance',
    heading: 'Performance and Cost Tradeoffs',
    paragraphs: [
      'CloudFront performance is not just about having a cache. It is about having the right cache key, the right TTLs, the right compression behavior, the right protocol settings, and the right origin architecture.',
      'Uncacheable personalized traffic still benefits from connection reuse, TLS offload, geographic proximity, and origin shielding patterns, but the economics are best when repeated requests can reuse responses.',
      'Cost behavior is shaped by data transfer, request volume, cache misses, logs, edge compute, invalidations, and origin choice. The most expensive CloudFront architectures are often the ones with low cache hit ratio plus unnecessary edge logic plus too much origin forwarding.',
    ],
  },
]

const policyChoices = [
  {
    title: 'Need a high hit rate for static assets',
    choice: 'Use narrow cache keys, long-lived versioned filenames, compression, and S3 plus origin access control.',
  },
  {
    title: 'Need low-latency API delivery but little caching',
    choice: 'Use CloudFront in front of API Gateway or an ALB mainly for TLS, WAF, request normalization, and edge reach, while keeping cache rules conservative.',
  },
  {
    title: 'Need private downloads',
    choice: 'Use signed URLs or signed cookies and keep the origin non-public.',
  },
  {
    title: 'Need a simple redirect or path rewrite at the edge',
    choice: 'Prefer CloudFront Functions over Lambda at Edge.',
  },
  {
    title: 'Need origin failover for delivery resilience',
    choice: 'Use origin groups and define failover behavior carefully.',
  },
  {
    title: 'Need instant-looking deployments for frontend assets',
    choice: 'Prefer asset versioning over routine invalidation-heavy deployments.',
  },
]

const operationsNotes = [
  {
    title: 'Origin access control',
    detail:
      'For S3 origins, origin access control is the preferred way to keep the bucket private while allowing CloudFront to fetch content. It replaces older patterns that relied on public buckets or legacy origin access identity in many cases.',
  },
  {
    title: 'Viewer protocol policy',
    detail:
      'Decide whether viewers may use HTTP, must be redirected to HTTPS, or must use HTTPS only. Most production workloads should converge on HTTPS-only delivery.',
  },
  {
    title: 'Response headers policies',
    detail:
      'Use response headers policies to attach consistent security headers, CORS headers, or other delivery headers at the edge instead of spreading that logic inconsistently across origins.',
  },
  {
    title: 'Geo restriction',
    detail:
      'CloudFront can restrict delivery by geography when licensing or policy requires it. Treat that as a coarse policy control, not as the only access-control mechanism.',
  },
  {
    title: 'Compression and protocol support',
    detail:
      'Enable compression for compressible content and keep viewer protocol capabilities current. These settings often deliver meaningful improvements without touching application code.',
  },
]

const designPatterns = [
  {
    title: 'Static frontend on S3 behind CloudFront',
    detail:
      'The standard frontend pattern is an S3 origin protected by origin access control, long cache TTLs for hashed assets, short TTLs for the HTML shell, and a custom domain with HTTPS.',
  },
  {
    title: 'API acceleration and protection',
    detail:
      'Put CloudFront in front of API Gateway or an ALB when you want global edge reach, WAF, unified TLS and domain management, and optional caching for selected GET endpoints.',
  },
  {
    title: 'Private download service',
    detail:
      'Use signed URLs or cookies with a private S3 origin when downloads should expire or be scoped to paid or authenticated users.',
  },
  {
    title: 'Multi-origin web app',
    detail:
      'Use path-based behaviors so one distribution serves the web app shell, static assets, media, and API calls while each path has its own cache and forwarding policies.',
  },
  {
    title: 'Edge redirect and normalization layer',
    detail:
      'Use CloudFront Functions for redirecting legacy paths, lowercasing URLs, canonical host redirects, or lightweight viewer request normalization before cache lookup.',
  },
]

const pitfalls = [
  'Creating an overly broad cache key by forwarding unnecessary cookies, headers, or query strings.',
  'Leaving the S3 origin public instead of protecting it with origin access control.',
  'Using invalidation for every deployment instead of versioning build artifacts.',
  'Putting expensive or complex business logic at the edge when the origin should own it.',
  'Forgetting that path-pattern order determines which behavior wins.',
  'Mixing API and static-delivery requirements in one behavior with one generic policy.',
  'Assuming CloudFront always helps equally even when responses are effectively uncacheable and highly personalized.',
  'Adding Lambda at Edge where CloudFront Functions would be sufficient.',
  'Ignoring logging and then trying to debug cache misses or origin failures blind.',
  'Treating signed URLs as if they replace all other authentication and authorization concerns.',
]

const examples = [
  {
    id: 'ex-static-site',
    title: 'Static site delivery shape',
    code: `Viewer
  -> CloudFront distribution
  -> behavior: /*
  -> S3 origin protected by origin access control

Hashed assets:
  app.8f3e1.js
  styles.31ab9.css

Typical strategy:
  long TTL for hashed assets
  short TTL for index.html
  custom domain + HTTPS`,
    explanation:
      'This is the standard high-hit-rate frontend pattern. The asset filenames carry version identity, which makes deployments simpler than repeatedly invalidating the whole cache.',
  },
  {
    id: 'ex-cache-policy',
    title: 'Cache policy thought process',
    code: `Content type: product images
Vary by:
  path only

Do not vary by:
  cookies
  authorization header
  tracking query params

TTL strategy:
  long max TTL
  invalidate only for urgent corrections
  prefer versioned object keys for normal releases`,
    explanation:
      'A useful cache policy starts by asking which request fields actually change the response. Everything else should usually stay out of the cache key.',
  },
  {
    id: 'ex-function',
    title: 'CloudFront Function for host redirect',
    code: `function handler(event) {
  var request = event.request
  var host = request.headers.host.value

  if (host === 'www.example.com') {
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: {
        location: { value: 'https://example.com' + request.uri }
      }
    }
  }

  return request
}`,
    explanation:
      'This is the kind of lightweight edge logic that fits CloudFront Functions well: deterministic, fast, and directly related to request handling at the viewer edge.',
  },
  {
    id: 'ex-private-content',
    title: 'Private content model',
    code: `Application
  -> authenticates user
  -> issues signed URL or signed cookie

Viewer
  -> sends signed request to CloudFront

CloudFront
  -> validates signature and time window
  -> serves cached object or fetches from protected origin`,
    explanation:
      'Signed delivery is useful when the object should stay cacheable at the edge but access must expire or be scoped.',
  },
  {
    id: 'ex-origin-failover',
    title: 'Origin failover shape',
    code: `Distribution
  -> origin group
     -> primary origin
     -> secondary origin

Failover triggers:
  selected status codes
  connection problems

Use case:
  resilient media or download delivery`,
    explanation:
      'Origin groups are a delivery-resilience tool. They do not replace full multi-region application design, but they are useful when content can be served from an alternate origin under failure conditions.',
  },
]

const glossaryTerms = [
  {
    term: 'Distribution',
    definition:
      'The top-level CloudFront delivery configuration that defines origins, behaviors, policies, certificates, and logging.',
  },
  {
    term: 'Origin',
    definition:
      'The backend source CloudFront fetches from when content is not served from cache.',
  },
  {
    term: 'Behavior',
    definition:
      'A path-pattern-based delivery rule that determines origin, policies, methods, and other handling for matching requests.',
  },
  {
    term: 'Cache policy',
    definition:
      'A reusable configuration that defines the cache key and TTL-related behavior for requests.',
  },
  {
    term: 'Origin request policy',
    definition:
      'A reusable configuration that controls which headers, cookies, and query strings CloudFront forwards to the origin.',
  },
  {
    term: 'Origin access control',
    definition:
      'The CloudFront mechanism used to securely access certain origins, especially S3, without making the origin public.',
  },
  {
    term: 'Signed URL',
    definition:
      'A CloudFront URL containing cryptographic authorization data so access can be limited by time or policy.',
  },
  {
    term: 'Signed cookie',
    definition:
      'A cookie-based private-content access mechanism useful when many protected objects should be accessible under one policy window.',
  },
  {
    term: 'CloudFront Function',
    definition:
      'A lightweight JavaScript edge function designed for fast viewer-request and viewer-response manipulation.',
  },
  {
    term: 'Lambda at Edge',
    definition:
      'The more capable edge compute option for CloudFront when you need richer logic or broader event handling.',
  },
  {
    term: 'Invalidation',
    definition:
      'A request to remove cached objects from CloudFront edge caches before they naturally expire.',
  },
  {
    term: 'Origin group',
    definition:
      'A paired origin configuration that supports failover from a primary origin to a secondary origin.',
  },
]

const pageSources = [
  'https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html',
  'https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DownloadDistValuesCacheBehavior.html',
  'https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html',
  'https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/origin-access-control.html',
  'https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-signed-urls.html',
  'https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/edge-functions-choosing.html',
  'https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/real-time-logs.html',
  'https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Invalidation.html',
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
    { id: 'bp-when', label: 'When to Use It' },
  ],
  'core-concepts': [
    { id: 'core-distribution', label: 'Distribution' },
    { id: 'core-origins', label: 'Origins' },
    { id: 'core-behaviors', label: 'Behaviors' },
    { id: 'core-cache', label: 'Cache Policy' },
    { id: 'core-origin-request', label: 'Origin Request Policy' },
    { id: 'core-ttl', label: 'TTL and Invalidation' },
    { id: 'core-security', label: 'Security' },
    { id: 'core-edge', label: 'Edge Compute' },
    { id: 'core-observability', label: 'Observability' },
    { id: 'core-performance', label: 'Performance and Cost' },
    { id: 'core-ops', label: 'Operational Notes' },
    { id: 'core-patterns', label: 'Design Patterns' },
    { id: 'core-pitfalls', label: 'Pitfalls' },
  ],
  examples: examples.map((example) => ({
    id: example.id,
    label: example.title,
  })),
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const cloudFrontHelpStyles = `
.cloudfront-help98-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.cloudfront-help98-window {
  width: 100%;
  min-height: 100dvh;
  margin: 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  background: #c0c0c0;
}

.cloudfront-help98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.cloudfront-help98-titletext {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.cloudfront-help98-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.cloudfront-help98-control {
  width: 18px;
  height: 16px;
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
  font-size: 11px;
  line-height: 1;
}

.cloudfront-help98-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
}

.cloudfront-help98-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
  font-family: inherit;
}

.cloudfront-help98-tab.active {
  position: relative;
  top: 1px;
  background: #fff;
}

.cloudfront-help98-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
  border-top: 1px solid #404040;
  background: #fff;
}

.cloudfront-help98-toc {
  overflow: auto;
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
}

.cloudfront-help98-toctitle {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.cloudfront-help98-toclist {
  list-style: none;
  margin: 0;
  padding: 0;
}

.cloudfront-help98-toclist li {
  margin: 0 0 8px;
}

.cloudfront-help98-toclist a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.cloudfront-help98-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.cloudfront-help98-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.cloudfront-help98-section {
  margin: 0 0 20px;
}

.cloudfront-help98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.cloudfront-help98-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.cloudfront-help98-content p,
.cloudfront-help98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.cloudfront-help98-content p {
  margin: 0 0 10px;
}

.cloudfront-help98-content ul,
.cloudfront-help98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.cloudfront-help98-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.cloudfront-help98-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  background: #f4f4f4;
}

.cloudfront-help98-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

.cloudfront-help98-inline-link {
  color: #000080;
}

@media (max-width: 900px) {
  .cloudfront-help98-main {
    grid-template-columns: 1fr;
  }

  .cloudfront-help98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}
`

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

export default function AwsCloudFrontPage(): JSX.Element {
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
    document.title = `${pageTitle} (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

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
    <div className="cloudfront-help98-page">
      <style>{cloudFrontHelpStyles}</style>
      <div className="cloudfront-help98-window" role="presentation">
        <header className="cloudfront-help98-titlebar">
          <span className="cloudfront-help98-titletext">{pageTitle}</span>
          <div className="cloudfront-help98-controls">
            <button className="cloudfront-help98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="cloudfront-help98-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="cloudfront-help98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`cloudfront-help98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="cloudfront-help98-main">
          <aside className="cloudfront-help98-toc" aria-label="Table of contents">
            <h2 className="cloudfront-help98-toctitle">Contents</h2>
            <ul className="cloudfront-help98-toclist">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="cloudfront-help98-content">
            <h1 className="cloudfront-help98-title">{pageTitle}</h1>
            <p className="cloudfront-help98-subheading">{pageSubtitle}</p>
            <p>
              This page focuses on how CloudFront actually behaves in production: what determines cache hits, how policies shape
              request flow, how to protect origins, and where edge compute helps versus where it becomes unnecessary complexity.
            </p>
            <p>
              The title-bar minimize control returns to the previous page when possible, or to{' '}
              <Link to="/algoViz" className="cloudfront-help98-inline-link">
                /algoViz
              </Link>{' '}
              when there is no prior history entry.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="cloudfront-help98-section">
                  <h2 className="cloudfront-help98-heading">Overview</h2>
                  {bigPictureSections.map((section) => (
                    <div key={section.title}>
                      <h3 className="cloudfront-help98-subheading">{section.title}</h3>
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  ))}
                </section>
                <hr className="cloudfront-help98-divider" />
                <section id="bp-when" className="cloudfront-help98-section">
                  <h2 className="cloudfront-help98-heading">When to Use It</h2>
                  <ul>
                    {policyChoices.map((item) => (
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
                  <section key={section.id} id={section.id} className="cloudfront-help98-section">
                    <h2 className="cloudfront-help98-heading">{section.heading}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </section>
                ))}

                <section id="core-ops" className="cloudfront-help98-section">
                  <h2 className="cloudfront-help98-heading">Operational Notes</h2>
                  {operationsNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-patterns" className="cloudfront-help98-section">
                  <h2 className="cloudfront-help98-heading">Design Patterns</h2>
                  {designPatterns.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-pitfalls" className="cloudfront-help98-section">
                  <h2 className="cloudfront-help98-heading">Common Pitfalls</h2>
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
                  <section key={example.id} id={example.id} className="cloudfront-help98-section">
                    <h2 className="cloudfront-help98-heading">{example.title}</h2>
                    <div className="cloudfront-help98-codebox">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </section>
                ))}
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="cloudfront-help98-section">
                <h2 className="cloudfront-help98-heading">Glossary</h2>
                {glossaryTerms.map((item) => (
                  <p key={item.term}>
                    <strong>{item.term}:</strong> {item.definition}
                  </p>
                ))}
                <h3 className="cloudfront-help98-subheading">Primary Source Set</h3>
                <ul>
                  {pageSources.map((source) => (
                    <li key={source}>
                      <a href={source} className="cloudfront-help98-inline-link" target="_blank" rel="noreferrer">
                        {source}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
