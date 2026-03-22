import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const pageTitle = 'Express.js vs Fastify'
const pageSubtitle = 'Comparing the classic Node.js web framework with the performance-oriented modern alternative.'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const bigPictureSections: Array<{ title: string; paragraphs: string[] }> = [
  {
    title: 'What both frameworks do',
    paragraphs: [
      'Express.js and Fastify are HTTP server frameworks for Node.js. Both can handle routing, middleware-like request processing, request and response handling, plugins, error handling, and the usual work of building APIs and backend services.',
      'The meaningful difference is not whether either one can return JSON from a route. The meaningful difference is the programming model each framework pushes teams toward: Express emphasizes minimalism and a very large ecosystem, while Fastify emphasizes predictable structure, schema-aware APIs, and performance-oriented internals.',
    ],
  },
  {
    title: 'What Express optimizes for',
    paragraphs: [
      'Express is intentionally small and unopinionated. The official site still presents it as a minimal and flexible framework that provides a robust set of web and mobile application features. That design makes Express easy to learn, easy to wire into existing code, and easy to surround with whatever other libraries a team already prefers.',
      'Its biggest strength is not novelty. It is familiarity. The ecosystem, tutorials, middleware libraries, hosting examples, and team familiarity around Express are enormous.',
    ],
  },
  {
    title: 'What Fastify optimizes for',
    paragraphs: [
      'Fastify positions itself around low overhead, high performance, schema-driven development, and plugin-based encapsulation. The official docs repeatedly emphasize speed, serialization and validation efficiency, and a strongly structured plugin model.',
      'That means Fastify is usually not just “Express but faster.” It is a framework with more opinion about how routes, schemas, decorators, and plugin boundaries should be organized.',
    ],
  },
  {
    title: 'What teams often oversimplify',
    paragraphs: [
      'The shallow internet summary is “use Express for simplicity and Fastify for performance.” That is incomplete. Express can be the simpler operational choice because everyone knows it. Fastify can be the simpler architecture choice because schemas, type-provider workflows, and encapsulation reduce ad hoc patterns in larger services.',
      'Likewise, raw benchmark wins do not automatically make Fastify the better framework for every product. If the bottleneck is database latency, external APIs, or team throughput, framework overhead may matter less than API design, caching, or developer familiarity.',
    ],
  },
  {
    title: 'Short version',
    paragraphs: [
      'Choose Express when you want maximal familiarity, a minimal core, and the broadest ecosystem of examples and middleware. Choose Fastify when you want a more structured backend framework with strong schema support, cleaner plugin boundaries, and performance-aware defaults.',
      'If the team already knows Express well and does not need Fastify’s model, Express remains a rational choice. If you are designing a modern API platform and want conventions that scale better, Fastify often earns its extra structure.',
    ],
  },
]

const decisionGuide: Array<{ title: string; choice: string }> = [
  {
    title: 'Need the most familiar and widely taught Node.js backend framework',
    choice: 'Prefer Express.',
  },
  {
    title: 'Need strong request and response schema support baked into the framework style',
    choice: 'Prefer Fastify.',
  },
  {
    title: 'Need the easiest migration path for a codebase already built around classic Express middleware patterns',
    choice: 'Prefer Express.',
  },
  {
    title: 'Need a framework that strongly encourages plugin encapsulation and local context boundaries',
    choice: 'Prefer Fastify.',
  },
  {
    title: 'Need raw framework overhead to stay low under high request throughput',
    choice: 'Prefer Fastify, while still testing with your real workload.',
  },
  {
    title: 'Need the broadest ecosystem of existing middleware packages and team familiarity',
    choice: 'Prefer Express.',
  },
  {
    title: 'Need a more opinionated modern path for building JSON APIs in Node',
    choice: 'Prefer Fastify.',
  },
  {
    title: 'Need to assemble your own stack from small familiar pieces without framework-level structure pressure',
    choice: 'Prefer Express.',
  },
]

const historyAndDirection: string[] = [
  'Express became the default Node.js backend framework for years, which is why so much middleware design and community knowledge still assumes the Express request-response model.',
  'Fastify emerged later with a different emphasis: lower overhead, schema-first ergonomics, plugin encapsulation, and performance-oriented serialization and validation paths.',
  'Because Fastify arrived after the community had already seen large Express codebases become inconsistent, part of its value proposition is architectural discipline rather than speed alone.',
  'That means the modern decision is less about old versus new and more about whether your team wants maximum ecosystem familiarity or stronger framework-guided structure.',
]

const decisionQuestions: string[] = [
  'Will your team benefit more from familiarity and ecosystem breadth, or from stronger framework conventions around schemas and plugins?',
  'Is framework throughput actually a bottleneck for your workload, or are latency and capacity dominated by downstream systems?',
  'Do you want request validation and typed contracts to be a first-class part of the framework model?',
  'Is the codebase small enough that Express minimalism is a feature, or large enough that stronger boundaries would reduce drift?',
  'Will you reuse a large amount of existing Express middleware or team knowledge?',
  'Are you choosing a framework for a quick service, or for a platform where consistency across many routes and plugins matters?',
]

const coreConceptSections: Array<{ id: string; heading: string; paragraphs: string[] }> = [
  {
    id: 'core-model',
    heading: 'Programming Model',
    paragraphs: [
      'Express is centered on a simple request-response pipeline. Handlers receive `req`, `res`, and optionally `next`, and the framework stays out of the way. This makes Express easy to explain and easy to bend.',
      'Fastify is centered on decorated instances, lifecycle hooks, schemas, and encapsulated plugins. The request-response flow is still straightforward, but the framework nudges teams toward explicit structure rather than ad hoc layering.',
    ],
  },
  {
    id: 'core-routing',
    heading: 'Routing and Handler Style',
    paragraphs: [
      'Express routing is famously direct. Define an app or router, attach handlers, and send responses manually or through helper abstractions. That simplicity is why Express still feels comfortable for small APIs and quick services.',
      'Fastify routing looks similar at first, but route definitions more naturally carry schema, validation, serialization, and typed metadata alongside the handler. Over time that tends to make route definitions feel more declarative and less incidental.',
    ],
  },
  {
    id: 'core-middleware',
    heading: 'Middleware Versus Hooks',
    paragraphs: [
      'Express is built around middleware as the core composition primitive. Middleware is flexible, but large Express apps often accumulate unclear ordering, hidden shared state, and route-specific special cases unless teams enforce strong conventions themselves.',
      'Fastify has hooks and plugin-scoped composition rather than copying Express middleware culture exactly. That different composition model is one reason Fastify codebases often feel more intentionally bounded once the team adopts its conventions.',
    ],
  },
  {
    id: 'core-schemas',
    heading: 'Validation, Serialization, and Schemas',
    paragraphs: [
      'Fastify treats JSON schema support as a first-class concern. Validation and serialization can be tied directly to route schemas, which improves correctness, documentation potential, and performance characteristics in JSON-heavy APIs.',
      'Express can absolutely support validation and serialization through libraries such as Zod, Joi, Ajv, or custom middleware, but the framework does not make schemas part of the core route definition model. Teams have to standardize that themselves.',
    ],
  },
  {
    id: 'core-plugins',
    heading: 'Plugins and Encapsulation',
    paragraphs: [
      'Express usually scales by layering routers, middleware, service modules, and conventions chosen by the team. That can work very well, but the architectural discipline comes from your codebase patterns more than from the framework.',
      'Fastify’s plugin system is intentionally central, and encapsulation is one of its defining ideas. Plugins can register routes, decorators, and hooks in bounded scopes, which helps prevent every concern from leaking into the global app context.',
    ],
  },
  {
    id: 'core-types',
    heading: 'TypeScript and Type Shape',
    paragraphs: [
      'Express works with TypeScript, but the experience is often a layered one: framework types plus middleware types plus your own request augmentation conventions. This is manageable, but it can get messy if the project extends request and response objects heavily.',
      'Fastify’s design often feels friendlier to a typed API style because schemas, decorators, and type providers fit more naturally into the framework model. That does not make it magically type-safe by default, but it does align better with teams that want typed contracts to be part of the route definition story.',
    ],
  },
  {
    id: 'core-performance',
    heading: 'Performance Reality',
    paragraphs: [
      'Fastify is explicitly performance-oriented and publishes benchmark guidance. In synthetic framework-level benchmarks it usually outperforms Express. That is real, but it should be interpreted carefully.',
      'Framework overhead matters most when the app is CPU-sensitive, serialization-heavy, or operating at very high request volume. In many ordinary business APIs, database queries, cache misses, network hops, and application logic dominate overall latency more than the framework choice does.',
    ],
  },
  {
    id: 'core-ecosystem',
    heading: 'Ecosystem and Community Gravity',
    paragraphs: [
      'Express still wins on sheer ecosystem gravity. Middleware examples, hosting tutorials, older stack integrations, and institutional familiarity are all easier to find. That matters because boring infrastructure decisions often benefit from the largest body of existing operational knowledge.',
      'Fastify’s ecosystem is smaller but more intentionally shaped around the framework’s design. If you adopt Fastify, you are often buying into a cleaner local ecosystem, not necessarily the broadest one.',
    ],
  },
  {
    id: 'core-operations',
    heading: 'Operations and Observability',
    paragraphs: [
      'Both frameworks can support real production concerns such as logging, metrics, error handling, tracing, and graceful shutdown. The difference is that Fastify tends to surface those concerns through a more coherent framework story, especially around logging and lifecycle hooks.',
      'Express can be equally production-grade, but teams often have to compose more of the operational discipline themselves and make more local choices about how cross-cutting concerns are wired.',
    ],
  },
  {
    id: 'core-migration',
    heading: 'Migration and Rewrite Cost',
    paragraphs: [
      'Moving an existing Express application to Fastify is not usually a search-and-replace exercise. The frameworks differ in middleware assumptions, route structure, plugin boundaries, validation style, and often in how teams think about shared app context.',
      'That means Fastify is often easiest to adopt on new services or on substantial rewrites, not on thin incremental migrations of old Express apps that depend on a large pile of existing middleware behavior.',
    ],
  },
  {
    id: 'core-team-fit',
    heading: 'Team and Codebase Fit',
    paragraphs: [
      'Express is often best when the team values low ceremony, quick familiarity, and the freedom to define its own service conventions. It works especially well for smaller services, legacy ecosystems, or teams that already have strong Express habits.',
      'Fastify is often best when the team wants framework help in staying disciplined. On larger or more API-centric backends, its route schemas, hooks, and encapsulated plugin model can keep the codebase more coherent over time.',
    ],
  },
  {
    id: 'core-cost',
    heading: 'Cost and Ownership Tradeoff',
    paragraphs: [
      'Express can be cheaper because everyone already knows it and the ecosystem is huge. The cost appears later if the project grows without clear internal structure and the framework offers little help in correcting that drift.',
      'Fastify can be cheaper over time for teams that benefit from stronger defaults. The upfront cost is learning the framework properly and adapting to a more structured mental model.',
    ],
  },
  {
    id: 'core-recommendations',
    heading: 'What Usually Matters Most',
    paragraphs: [
      'If you need the safest conventional Node.js backend choice with the broadest familiarity, Express is still a sound answer. If you are building modern high-throughput or schema-heavy APIs and want stronger framework guidance, Fastify is often the better engineering fit.',
      'The best answer usually comes from team shape and service profile, not from abstract ideology about minimalism or benchmarks.',
    ],
  },
]

const operatingNotes: Array<{ title: string; detail: string }> = [
  {
    title: 'Benchmark wins are real but limited',
    detail:
      'Fastify’s performance advantages are most meaningful when framework overhead is actually part of the problem. Do not treat synthetic benchmark results as a substitute for testing your real workload.',
  },
  {
    title: 'Express minimalism shifts responsibility to the team',
    detail:
      'That can be excellent in small apps and risky in large ones. You get flexibility, but you must supply your own architectural discipline.',
  },
  {
    title: 'Fastify structure is a feature, not just a learning curve',
    detail:
      'Teams sometimes resist Fastify because it is less instantly loose than Express. That extra structure is also why many larger Fastify services stay cleaner over time.',
  },
  {
    title: 'Middleware reuse can dominate the decision',
    detail:
      'If your organization already depends on a large set of Express middleware and patterns, staying with Express may be the cheaper choice even if Fastify looks cleaner on paper.',
  },
  {
    title: 'Schema-first APIs benefit more from Fastify',
    detail:
      'If request validation, response serialization, and typed route contracts are core to the platform, Fastify aligns with that style more naturally than Express does.',
  },
]

const workloadFitCases: Array<{ title: string; detail: string }> = [
  {
    title: 'Small internal service or quick prototype',
    detail:
      'Express is often the simpler choice because the team can move immediately with minimal framework ceremony.',
  },
  {
    title: 'High-throughput JSON API',
    detail:
      'Fastify is often the stronger fit because its performance-oriented internals and schema-driven route model are more likely to pay off.',
  },
  {
    title: 'Legacy Node backend with lots of existing middleware',
    detail:
      'Express is usually the lower-risk fit because the ecosystem and codebase assumptions already match it.',
  },
  {
    title: 'Platform team building consistent service conventions',
    detail:
      'Fastify is often stronger because encapsulated plugins and schema-aware routes make it easier to standardize APIs cleanly.',
  },
  {
    title: 'Team with strong Express experience and no current throughput pain',
    detail:
      'Express remains a rational default unless the team has a concrete reason to absorb migration or retraining cost.',
  },
  {
    title: 'Team prioritizing typed contracts and route-level validation discipline',
    detail:
      'Fastify usually aligns better with that style out of the box.',
  },
]

const pitfalls: string[] = [
  'Choosing Fastify only because benchmark charts look impressive while ignoring whether framework overhead is actually the bottleneck.',
  'Choosing Express and then letting middleware ordering and request augmentation become an undocumented mess.',
  'Assuming Fastify is just Express with better speed instead of learning its plugin and encapsulation model properly.',
  'Assuming Express has no path to validation or typed APIs when the real issue is missing team conventions.',
  'Migrating a mature Express app to Fastify without budgeting for middleware rewrites, plugin reorganization, and route-contract cleanup.',
  'Using raw ecosystem popularity as a substitute for thinking about codebase structure and long-term maintenance.',
]

const examples: Array<{ id: string; title: string; code: string; explanation: string }> = [
  {
    id: 'ex-express-route',
    title: 'Express route shape',
    code: `import express from 'express'

const app = express()

app.get('/users/:id', async (req, res) => {
  res.json({ id: req.params.id })
})`,
    explanation:
      'This is the classic Express feel: direct, minimal, and easy to read, with most structure decisions left to the application.',
  },
  {
    id: 'ex-fastify-route',
    title: 'Fastify route shape',
    code: `import Fastify from 'fastify'

const app = Fastify()

app.get('/users/:id', {
  schema: {
    params: {
      type: 'object',
      properties: { id: { type: 'string' } },
      required: ['id'],
    },
  },
}, async (request) => {
  return { id: request.params.id }
})`,
    explanation:
      'This shows the more schema-oriented Fastify style, where route metadata and validation are more naturally part of the route definition.',
  },
  {
    id: 'ex-express-middleware',
    title: 'Express middleware mental model',
    code: `request
  -> middleware A
  -> middleware B
  -> route handler
  -> response`,
    explanation:
      'Express composition is simple and powerful, but large apps often need strict conventions to keep middleware flow understandable.',
  },
  {
    id: 'ex-fastify-plugin',
    title: 'Fastify plugin mental model',
    code: `root instance
  -> plugin scope A
     -> decorators
     -> hooks
     -> routes
  -> plugin scope B
     -> its own local registrations`,
    explanation:
      'This captures why Fastify often feels cleaner in bigger systems: plugin registration naturally creates boundaries.',
  },
  {
    id: 'ex-decision',
    title: 'Decision shortcut',
    code: `Need maximum familiarity and minimal core?
  -> Express

Need schema-driven APIs and stronger framework structure?
  -> Fastify

Need proof either one is faster enough to matter?
  -> benchmark your actual workload`,
    explanation:
      'This is usually a better rubric than generic internet advice.',
  },
]

const glossaryTerms: Array<{ term: string; definition: string }> = [
  {
    term: 'Express',
    definition:
      'A minimal and flexible Node.js web application framework centered on request-response handlers and middleware composition.',
  },
  {
    term: 'Fastify',
    definition:
      'A Node.js web framework designed around low overhead, high performance, schema support, and plugin encapsulation.',
  },
  {
    term: 'Middleware',
    definition:
      'A processing step in the request-response pipeline. It is the core composition model in Express.',
  },
  {
    term: 'Hook',
    definition:
      'A Fastify lifecycle interception point used to run logic around requests, replies, validation, and other framework phases.',
  },
  {
    term: 'Encapsulation',
    definition:
      'Fastify’s plugin-scoping model, where decorations, hooks, and routes can be registered in bounded contexts instead of leaking globally.',
  },
  {
    term: 'Decorator',
    definition:
      'A Fastify mechanism for attaching utilities or shared values to the Fastify instance, request, or reply in a structured way.',
  },
  {
    term: 'JSON schema',
    definition:
      'A schema format used by Fastify for request validation and response serialization, and optionally by Express apps through separate libraries.',
  },
  {
    term: 'Type provider',
    definition:
      'A Fastify TypeScript pattern that maps schema definitions to richer type inference in route handlers.',
  },
  {
    term: 'Throughput',
    definition:
      'The number of requests a service can process over time. Framework overhead influences it, but real systems are often limited by more than the framework.',
  },
]

const pageSources: string[] = [
  'https://expressjs.com/',
  'https://expressjs.com/en/guide/routing.html',
  'https://expressjs.com/en/guide/using-middleware.html',
  'https://expressjs.com/en/starter/faq.html',
  'https://fastify.dev/',
  'https://fastify.dev/docs/latest/Reference/Routes/',
  'https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/',
  'https://fastify.dev/docs/latest/Reference/Hooks/',
  'https://fastify.dev/docs/latest/Reference/Plugins/',
  'https://fastify.dev/docs/latest/Reference/Encapsulation/',
  'https://fastify.dev/docs/latest/Reference/Type-Providers/',
  'https://fastify.dev/benchmarks/',
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
    { id: 'bp-decision', label: 'Decision Guide' },
    { id: 'bp-history', label: 'History and Direction' },
    { id: 'bp-questions', label: 'Decision Questions' },
  ],
  'core-concepts': [
    { id: 'core-model', label: 'Programming Model' },
    { id: 'core-routing', label: 'Routing' },
    { id: 'core-middleware', label: 'Middleware and Hooks' },
    { id: 'core-schemas', label: 'Schemas' },
    { id: 'core-plugins', label: 'Plugins' },
    { id: 'core-types', label: 'TypeScript' },
    { id: 'core-performance', label: 'Performance' },
    { id: 'core-ecosystem', label: 'Ecosystem' },
    { id: 'core-operations', label: 'Operations' },
    { id: 'core-migration', label: 'Migration' },
    { id: 'core-team-fit', label: 'Team Fit' },
    { id: 'core-cost', label: 'Cost and Ownership' },
    { id: 'core-recommendations', label: 'What Matters Most' },
    { id: 'core-notes', label: 'Operating Notes' },
    { id: 'core-workload-fit', label: 'Workload Fit' },
    { id: 'core-pitfalls', label: 'Pitfalls' },
  ],
  examples: examples.map((example) => ({
    id: example.id,
    label: example.title,
  })),
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

const expressFastifyHelpStyles = `
.express-fastify-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.express-fastify-help-window {
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  background: #c0c0c0;
  width: 100%;
  min-height: 100dvh;
  margin: 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.express-fastify-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.express-fastify-help-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.express-fastify-help-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.express-fastify-help-control {
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
  font-family: inherit;
}

.express-fastify-help-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
}

.express-fastify-help-tab {
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

.express-fastify-help-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.express-fastify-help-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.express-fastify-help-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.express-fastify-help-toc-title {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 10px;
}

.express-fastify-help-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.express-fastify-help-toc-list li {
  margin: 0 0 8px;
}

.express-fastify-help-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.express-fastify-help-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.express-fastify-help-doc-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px;
}

.express-fastify-help-section {
  margin: 0 0 20px;
}

.express-fastify-help-heading {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px;
}

.express-fastify-help-subheading {
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 6px;
}

.express-fastify-help-content p,
.express-fastify-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.express-fastify-help-content p {
  margin: 0 0 10px;
}

.express-fastify-help-content ul,
.express-fastify-help-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.express-fastify-help-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.express-fastify-help-codebox {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 8px;
  margin: 6px 0 10px;
}

.express-fastify-help-codebox code {
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
  display: block;
}

.express-fastify-help-inline-link {
  color: #000080;
}

@media (max-width: 900px) {
  .express-fastify-help-main {
    grid-template-columns: 1fr;
  }

  .express-fastify-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .express-fastify-help-title-text {
    position: static;
    transform: none;
    margin-left: 8px;
    font-size: 14px;
  }
}
`

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

export default function ExpressVsFastifyPage(): JSX.Element {
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
    <div className="express-fastify-help-page">
      <style>{expressFastifyHelpStyles}</style>
      <div className="express-fastify-help-window" role="presentation">
        <header className="express-fastify-help-titlebar">
          <span className="express-fastify-help-title-text">{pageTitle}</span>
          <div className="express-fastify-help-title-controls">
            <button className="express-fastify-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="express-fastify-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>
        <div className="express-fastify-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`express-fastify-help-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="express-fastify-help-main">
          <aside className="express-fastify-help-toc" aria-label="Table of contents">
            <h2 className="express-fastify-help-toc-title">Contents</h2>
            <ul className="express-fastify-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="express-fastify-help-content">
            <h1 className="express-fastify-help-doc-title">{pageTitle}</h1>
            <p className="express-fastify-help-subheading">{pageSubtitle}</p>
            <p>
              This page compares Express and Fastify as framework choices, not as internet memes. The real trade is familiarity and
              ecosystem breadth versus stronger structure, schema-aware APIs, and lower framework overhead.
            </p>
            <p>
              The title-bar minimize control returns to the previous page when possible, or to{' '}
              <Link to="/algoViz" className="express-fastify-help-inline-link">
                /algoViz
              </Link>{' '}
              when there is no prior history entry.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="express-fastify-help-section">
                  <h2 className="express-fastify-help-heading">Overview</h2>
                  {bigPictureSections.map((section) => (
                    <div key={section.title}>
                      <h3 className="express-fastify-help-subheading">{section.title}</h3>
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  ))}
                </section>
                <hr className="express-fastify-help-divider" />
                <section id="bp-decision" className="express-fastify-help-section">
                  <h2 className="express-fastify-help-heading">Decision Guide</h2>
                  <ul>
                    {decisionGuide.map((item) => (
                      <li key={item.title}>
                        <strong>{item.title}:</strong> {item.choice}
                      </li>
                    ))}
                  </ul>
                </section>
                <hr className="express-fastify-help-divider" />
                <section id="bp-history" className="express-fastify-help-section">
                  <h2 className="express-fastify-help-heading">History and Direction</h2>
                  <ul>
                    {historyAndDirection.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <hr className="express-fastify-help-divider" />
                <section id="bp-questions" className="express-fastify-help-section">
                  <h2 className="express-fastify-help-heading">Decision Questions</h2>
                  <ul>
                    {decisionQuestions.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                {coreConceptSections.map((section) => (
                  <section key={section.id} id={section.id} className="express-fastify-help-section">
                    <h2 className="express-fastify-help-heading">{section.heading}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </section>
                ))}

                <section id="core-notes" className="express-fastify-help-section">
                  <h2 className="express-fastify-help-heading">Operating Notes</h2>
                  {operatingNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-workload-fit" className="express-fastify-help-section">
                  <h2 className="express-fastify-help-heading">Workload Fit by Scenario</h2>
                  {workloadFitCases.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-pitfalls" className="express-fastify-help-section">
                  <h2 className="express-fastify-help-heading">Common Pitfalls</h2>
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
                  <section key={example.id} id={example.id} className="express-fastify-help-section">
                    <h2 className="express-fastify-help-heading">{example.title}</h2>
                    <div className="express-fastify-help-codebox">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </section>
                ))}
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="express-fastify-help-section">
                <h2 className="express-fastify-help-heading">Glossary</h2>
                {glossaryTerms.map((item) => (
                  <p key={item.term}>
                    <strong>{item.term}:</strong> {item.definition}
                  </p>
                ))}
                <h3 className="express-fastify-help-subheading">Primary Source Set</h3>
                <ul>
                  {pageSources.map((source) => (
                    <li key={source}>
                      <a href={source} className="express-fastify-help-inline-link" target="_blank" rel="noreferrer">
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
