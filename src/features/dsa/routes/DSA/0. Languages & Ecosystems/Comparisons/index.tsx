import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import { slugifySegment } from '@/features/dsa/utils/slug'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'
const COMPARISONS_BASE_ROUTE = '/dsa/0-languages-and-ecosystems/comparisons'

const overviewSections = [
  {
    title: 'What this subsection is',
    body: 'Comparisons is the part of Languages & Ecosystems where similar tools, platforms, frameworks, languages, and architectural styles are evaluated against each other directly. The goal is not to crown a universal winner. The goal is to understand which tradeoffs actually matter, which assumptions change the answer, and how to choose a stack without relying on slogans.',
  },
  {
    title: 'Why explicit comparisons matter',
    body: 'Engineers rarely choose technologies in isolation. They choose between realistic alternatives that overlap in use case but differ in runtime behavior, operational model, tooling, ecosystem maturity, cost structure, or architectural constraints. Side-by-side analysis prevents shallow decision-making based on hype, familiarity, or one benchmark taken out of context.',
  },
  {
    title: 'What this subsection teaches',
    body: 'This subsection teaches comparative reasoning. Instead of asking "what is React" or "what is PostgreSQL," it asks what changes when React is chosen instead of Angular, when PostgreSQL is chosen instead of MySQL or SQLite, or when REST is chosen instead of GraphQL or gRPC. That comparison framing forces the real constraints into view.',
  },
  {
    title: 'How to read it',
    body: 'Treat each comparison as a decision framework. Pay attention to workload shape, scaling model, deployment target, team skill set, failure tolerance, operational complexity, and long-term maintenance burden. Those context factors matter far more than one tool sounding more modern than another.',
  },
]

const whyItMatters = [
  'It converts vague preferences into explicit decision criteria.',
  'It helps teams avoid choosing technology based on familiarity alone.',
  'It clarifies which differences are architectural and which are merely ergonomic.',
  'It reveals hidden costs such as operational burden, migration friction, and runtime overhead.',
  'It trains the habit of asking "under what conditions is this better?" instead of asking for one permanent ranking.',
]

const historicalContext = [
  {
    title: 'As ecosystems multiplied, comparison became unavoidable',
    detail:
      'Early software stacks offered fewer mainstream options. Modern engineering now involves overlapping frameworks, clouds, runtimes, databases, CI systems, and architectural patterns, making comparative judgment a core skill rather than a niche one.',
  },
  {
    title: 'Benchmarks alone proved insufficient',
    detail:
      'Simple speed charts or feature checklists could not explain why one tool succeeds in a particular team or workload while another fails. Real evaluation had to include observability, onboarding, deployment model, ecosystem stability, and failure handling.',
  },
  {
    title: 'Cloud and framework competition raised the stakes',
    detail:
      'Once major vendors and ecosystems offered broadly similar capabilities, the important differences moved into integration quality, pricing model, operational defaults, portability, and workflow fit rather than raw possibility.',
  },
  {
    title: 'Modern stack selection is a long-term systems decision',
    detail:
      'A choice among technologies influences architecture, hiring, tooling, deployment, testing, incident response, and migration cost for years. Comparisons therefore need to be deeper than short-term productivity impressions.',
  },
]

const comparisonDirectory = [
  {
    heading: 'Languages, Runtimes, and Core Platforms',
    items: [
      'TypeScript vs JavaScript',
      'Python vs JavaScript',
      'Java vs C Sharp',
      'C++ vs Rust',
      'Go vs Rust',
      'Kotlin vs Swift',
      'Bun vs Node.js',
      'Deno vs Node.js',
      'Node.js vs .NET',
    ],
  },
  {
    heading: 'Frontend, Web, and Developer Experience',
    items: [
      'React vs Angular',
      'React vs Vue.js',
      'Vue.js vs Svelte',
      'Angular vs Svelte',
      'Next.js vs Nuxt',
      'Next.js vs Remix',
      'Vite vs Webpack',
      'Jest vs Vitest',
      'React Query vs SWR',
      'Redux vs Zustand',
      'GraphQL vs REST',
      'REST vs gRPC',
      'gRPC vs GraphQL',
      'Express.js vs Fastify',
      'NestJS vs Express.js',
      'pnpm vs npm',
    ],
  },
  {
    heading: 'Backend Frameworks and Application Platforms',
    items: [
      'ASP.NET Core vs FastAPI',
      'Django vs FastAPI',
      'Flask vs FastAPI',
      'Django vs Ruby on Rails',
      'Ruby on Rails vs Laravel',
      'Laravel vs Django',
      'Spring Boot vs ASP.NET Core',
      'Spring Boot vs Quarkus',
      'Prisma vs TypeORM',
    ],
  },
  {
    heading: 'Cloud, Containers, and Delivery Infrastructure',
    items: [
      'AWS vs Azure',
      'AWS vs GCP',
      'Azure vs GCP',
      'Cloud Run vs AWS Lambda',
      'Serverless vs Containers',
      'Microservices vs Serverless',
      'Microservices vs Monolith',
      'Monolith vs Modular Monolith',
      'Docker Compose vs Kubernetes',
      'Kubernetes vs Docker Swarm',
      'ECS vs EKS',
      'Terraform vs CloudFormation',
      'Terraform vs Pulumi',
      'GitHub Actions vs GitLab CI',
      'GitHub Actions vs Azure DevOps',
    ],
  },
  {
    heading: 'Data, Messaging, and State Management',
    items: [
      'SQL vs NoSQL',
      'MongoDB vs PostgreSQL',
      'PostgreSQL vs MySQL',
      'PostgreSQL vs SQLite',
      'Cassandra vs MongoDB',
      'Cloud SQL vs DynamoDB',
      'Redis vs Memcached',
      'Kafka vs RabbitMQ',
      'RabbitMQ vs SQS',
      'Elasticsearch vs OpenSearch',
      'Firebase vs Supabase',
    ],
  },
  {
    heading: 'Mobile, Native UI, and Product Architecture',
    items: [
      'Flutter vs React Native',
      'Flutter vs Kotlin Multiplatform',
      'React Native vs Kotlin Multiplatform',
      'Expo vs React Native CLI',
      'MAUI vs Flutter',
      'SwiftUI vs Jetpack Compose',
      'iOS vs Android',
      'Unity vs Unreal Engine',
      'Hexagonal Architecture vs Clean Architecture',
      'TDD vs BDD',
    ],
  },
]

const comparisonThemes = [
  {
    title: 'Decision quality depends on criteria quality',
    body: 'Bad comparisons usually come from vague criteria. If the team cannot say whether the priority is startup speed, cloud portability, concurrency model, developer onboarding, query flexibility, or operational simplicity, the resulting debate becomes style preference disguised as engineering reasoning.',
  },
  {
    title: 'The right answer is often workload-dependent',
    body: 'A stack that is excellent for internal tools may be wrong for consumer mobile apps. A database that works for local-first desktop tooling may be wrong for multi-region write-heavy systems. Comparisons only become truthful once the workload and constraints are specified.',
  },
  {
    title: 'Operational complexity is part of the product cost',
    body: 'Teams often compare feature sets while ignoring deployment burden, debugging difficulty, observability gaps, CI friction, production incident behavior, and migration cost. Those hidden operational factors often dominate the total ownership cost.',
  },
  {
    title: 'Comparisons should separate principle from ecosystem luck',
    body: 'Some differences come from deep design principles, such as static typing versus dynamic typing or request-response versus streaming RPC. Others come from maturity, documentation quality, or package ecosystem strength at a particular point in time. Good comparisons keep those layers distinct.',
  },
]

const keyTakeaways = [
  'A comparison page is a structured decision aid, not a winner-takes-all ranking.',
  'The most important variable is usually context: workload, team, deployment target, and failure budget.',
  'Architectural and operational differences matter more than superficial syntax or branding.',
  'Migration and lock-in costs should be considered alongside initial velocity.',
  'The best comparative reasoning asks what assumptions make one choice better than another.',
]

const topicSignals = [
  {
    title: 'Use a comparison lens when multiple options are genuinely viable',
    body: 'If two or more tools can plausibly solve the problem, and the real difficulty is picking the better fit, you are in comparison territory rather than introduction territory.',
  },
  {
    title: 'Use a comparison lens when the same user story hides different architectures',
    body: 'Tools that appear to address the same need can encode radically different assumptions. REST versus GraphQL versus gRPC is not just API syntax; it changes transport semantics, caching patterns, schema discipline, and client coupling.',
  },
  {
    title: 'Use a comparison lens when long-term cost matters',
    body: 'If migration burden, hiring pipeline, observability, infrastructure complexity, or cloud lock-in could dominate the decision later, then a direct comparison is necessary before committing.',
  },
  {
    title: 'Use a comparison lens when local benchmarks feel misleading',
    body: 'Single-machine speed tests often ignore network effects, developer workflow, ecosystem support, and operational failure modes. A comparison page exists to bring those neglected variables back into the discussion.',
  },
]

const evaluationCriteria = [
  {
    title: 'Execution and runtime behavior',
    body: 'How does the tool actually run? Important factors include startup time, warmup characteristics, memory behavior, concurrency model, serialization overhead, and how performance changes under real load rather than synthetic demos.',
  },
  {
    title: 'Developer workflow and tooling',
    body: 'Consider package management, editor support, testing ergonomics, debugging quality, build speed, local iteration loop, CI behavior, and how easy it is for a new team member to become productive without tribal knowledge.',
  },
  {
    title: 'Operational model',
    body: 'What does the system look like once deployed? Relevant questions include scaling unit, observability, failure isolation, rollback strategy, cold start behavior, secret management, network model, and infrastructure footprint.',
  },
  {
    title: 'Ecosystem depth and interop',
    body: 'A technology with strong library support, long-term maintenance, and good interop can outperform a theoretically cleaner option in practical delivery. Ecosystem depth also determines how much custom glue a team will have to maintain.',
  },
  {
    title: 'Organizational fit',
    body: 'Hiring market, existing team expertise, compliance requirements, deployment environment, and cross-team interfaces all matter. A technically attractive option may still be a poor organizational choice if it creates isolated expertise or infrastructure mismatch.',
  },
]

const comparisonPatterns = [
  {
    title: 'Language-versus-language comparisons',
    body: "These comparisons usually revolve around type systems, memory model, concurrency primitives, tooling maturity, ecosystem breadth, and the kinds of applications that benefit from each language's strengths.",
  },
  {
    title: 'Framework-versus-framework comparisons',
    body: 'These are mostly about lifecycle rules, architectural defaults, rendering or request handling model, plugin ecosystem, and how the framework shapes team workflow over time.',
  },
  {
    title: 'Platform-versus-platform comparisons',
    body: 'Clouds, mobile platforms, and orchestration environments differ in integration depth, pricing model, operational defaults, portability, and the cost of adopting or exiting the ecosystem.',
  },
  {
    title: 'Database-and-messaging comparisons',
    body: 'Data tools are best compared through access pattern, consistency model, indexing strategy, write/read amplification, scaling pattern, operational burden, and failure recovery behavior.',
  },
  {
    title: 'Architecture-pattern comparisons',
    body: 'Monolith versus microservices or hexagonal versus clean architecture should be compared by coupling boundaries, deployment topology, testing complexity, team coordination, and the actual scale of the system rather than ideology.',
  },
]

const proofObligations = [
  {
    title: 'State the decision context explicitly',
    body: 'A valid comparison should say who the user is, what the workload looks like, what the deployment target is, and which constraints are non-negotiable. Without that, the conclusion is usually empty.',
  },
  {
    title: 'Separate hard constraints from preferences',
    body: 'If one option fails a compliance requirement, portability requirement, latency target, or staffing reality, that is different from merely preferring a syntax style or team convention.',
  },
  {
    title: 'Compare total cost, not just first-week productivity',
    body: 'A sound conclusion accounts for debugging cost, operational burden, onboarding time, migration risk, and production failure behavior in addition to development speed and feature availability.',
  },
  {
    title: 'Explain where the recommendation stops applying',
    body: 'A strong comparison includes boundary conditions. It should say when the chosen winner stops winning, what scale or workload would change the answer, and which assumptions were load-bearing.',
  },
]

const failureModes = [
  {
    title: 'Forcing a universal ranking',
    body: 'The question is rarely "which is best?" in the abstract. The real question is "which is better for this workload, team, and deployment context?" Ignoring that context produces bad recommendations dressed up as confidence.',
  },
  {
    title: 'Overweighting benchmarks or anecdotes',
    body: 'A microbenchmark or one success story can be informative, but it does not replace ecosystem, maintenance, operational, and failure-mode analysis.',
  },
  {
    title: 'Ignoring migration and switching costs',
    body: 'A stack that looks slightly better today may be dramatically more expensive to adopt, train for, or unwind later. Good comparisons account for entry cost and exit cost.',
  },
  {
    title: 'Comparing at the wrong level',
    body: 'Sometimes the options are not true substitutes. Comparing a framework to a cloud platform, or a library to a language runtime, can blur categories and create fake conclusions.',
  },
  {
    title: 'Mistaking ecosystem popularity for strategic fit',
    body: 'Popular tools may have strong community momentum, but that does not guarantee alignment with the performance budget, integration surface, or organizational constraints of the problem.',
  },
]

const studyChecklist = [
  'Define the workload, team shape, deployment target, and non-negotiable constraints first.',
  'Name the real axis of comparison: runtime, architecture, tooling, cloud model, data model, or organizational fit.',
  'Check operational and observability costs alongside developer ergonomics.',
  'Evaluate interoperability and migration cost before committing to ecosystem lock-in.',
  'State the conditions under which your recommendation would change.',
  'Avoid treating a comparison as a permanent ranking across all contexts.',
]

const examples = [
  {
    id: 'cmp98-example-rest-graphql-grpc',
    title: 'Example: Compare API styles by client and transport needs',
    area: 'Protocol and Interface Design',
    intro:
      'REST, GraphQL, and gRPC all support service communication, but they optimize different aspects of the interface. The right choice depends on client diversity, schema discipline, caching model, performance sensitivity, and whether request-response is enough.',
    whyFit:
      'This example shows how the same user story can conceal three different architectural choices rather than one interchangeable API category.',
    code: `if broad HTTP compatibility and simple resource semantics matter:
  favor REST
else if clients need flexible field selection and a shared graph schema:
  favor GraphQL
else if low-latency typed service-to-service communication matters:
  favor gRPC`,
    takeaway:
      'The correct comparison question is not "which protocol is modern?" but "what communication model matches the system and client landscape?"',
  },
  {
    id: 'cmp98-example-cloud-choice',
    title: 'Example: Compare cloud platforms by integration and lock-in',
    area: 'Cloud and Platform Strategy',
    intro:
      'Cloud choices often look symmetric from a feature-list distance, but the practical differences emerge in IAM design, managed-service depth, billing behavior, region strategy, observability, deployment workflow, and how much the team can tolerate vendor-specific tooling.',
    whyFit:
      'This example illustrates that cloud comparisons are mostly about operational model and organizational fit rather than headline capability.',
    code: `requirements = [regions, managed services, compliance, team familiarity, portability]
score each platform against hard constraints first
eliminate options that fail non-negotiables
compare surviving options on operational burden and long-term lock-in`,
    takeaway:
      'Cloud decisions should be filtered through hard constraints and total ownership cost before convenience or familiarity becomes the tie-breaker.',
  },
  {
    id: 'cmp98-example-db-choice',
    title: 'Example: Compare databases by access pattern and failure model',
    area: 'Data Systems',
    intro:
      'PostgreSQL, MySQL, SQLite, MongoDB, Cassandra, and DynamoDB should not be compared as generic storage boxes. The meaningful dimensions include query shape, consistency needs, write distribution, operational model, local versus distributed assumptions, and how much schema discipline is beneficial.',
    whyFit:
      'This example highlights that data-system comparisons break down quickly when the workload is underspecified.',
    code: `if single-node embedded simplicity matters:
  consider SQLite
else if relational integrity and broad SQL capability matter:
  consider PostgreSQL or MySQL
else if flexible document access or managed key-value scale dominates:
  consider MongoDB, Cassandra, or DynamoDB based on consistency and ops model`,
    takeaway: 'A database comparison is mostly a workload comparison wearing product names.',
  },
  {
    id: 'cmp98-example-framework-choice',
    title: 'Example: Compare frameworks by lifecycle and team structure',
    area: 'Frameworks',
    intro:
      'React, Angular, Vue, Svelte, Next.js, Nuxt, Remix, Express, Fastify, Django, FastAPI, Spring Boot, and ASP.NET Core differ not only in syntax but in lifecycle model, architectural defaults, plugin ecosystem, and how much structure they impose on teams.',
    whyFit:
      'This example demonstrates why framework comparisons are really workflow and architecture comparisons.',
    code: `criteria = [routing model, rendering strategy, typing discipline, ecosystem depth, team conventions]
for each framework:
  evaluate lifecycle constraints
  evaluate operational defaults
  evaluate integration and maintenance burden
choose the option whose defaults reduce, rather than fight, project complexity`,
    takeaway:
      'Frameworks should be judged by the kind of project behavior they encourage over time, not only by first impressions in a demo.',
  },
  {
    id: 'cmp98-example-architecture',
    title: 'Example: Compare monolith, modular monolith, and microservices',
    area: 'Architecture',
    intro:
      'Architectural comparisons must balance deployment independence, team autonomy, observability complexity, operational cost, test strategy, and coupling boundaries. A distributed architecture is not automatically more mature than a well-structured monolith.',
    whyFit:
      'This example shows how comparison logic changes once coordination and operations are treated as first-class costs.',
    code: `if domain boundaries are still unstable:
  prefer monolith or modular monolith
else if teams need independent deployment and can absorb ops complexity:
  consider microservices
if event-driven scale patterns matter but operational simplicity is weak:
  reassess whether distribution is premature`,
    takeaway:
      'Architecture choices should be justified by coordination and deployment realities, not by perceived sophistication.',
  },
]

const glossary = [
  {
    term: 'Benchmark',
    definition:
      'A measurement used to compare performance, often informative but incomplete without workload context.',
  },
  {
    term: 'Decision context',
    definition:
      'The concrete combination of workload, team, deployment target, and constraints that determines whether one option is preferable.',
  },
  {
    term: 'Ecosystem lock-in',
    definition: 'Dependency on vendor- or tool-specific integrations that make migration costly.',
  },
  {
    term: 'Hard constraint',
    definition:
      'A requirement that an option must satisfy, such as compliance, platform support, or latency limits.',
  },
  {
    term: 'Interoperability',
    definition:
      'How well a tool or platform works with surrounding systems, formats, libraries, or protocols.',
  },
  {
    term: 'Lifecycle model',
    definition:
      'The structure that determines when code runs, how it is initialized, and how control flows through a framework or platform.',
  },
  {
    term: 'Operational burden',
    definition:
      'The real-world cost of deploying, observing, scaling, and maintaining a system in production.',
  },
  {
    term: 'Portability',
    definition: 'How easily software or infrastructure can move across environments or providers.',
  },
  {
    term: 'Scaling unit',
    definition:
      'The component that is replicated or expanded under load, such as a process, function, container, or service.',
  },
  {
    term: 'Tradeoff axis',
    definition:
      'The specific dimension along which options differ, such as latency, type safety, deployment simplicity, or schema flexibility.',
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
    { id: 'cmp98-overview', label: 'Overview' },
    { id: 'cmp98-why', label: 'Why It Matters' },
    { id: 'cmp98-history', label: 'Historical Context' },
    { id: 'cmp98-directory', label: 'Comparison Directory' },
    { id: 'cmp98-themes', label: 'Comparison Themes' },
    { id: 'cmp98-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'cmp98-signals', label: 'Topic Signals' },
    { id: 'cmp98-criteria', label: 'Evaluation Criteria' },
    { id: 'cmp98-patterns', label: 'Comparison Patterns' },
    { id: 'cmp98-proofs', label: 'Decision Obligations' },
    { id: 'cmp98-failures', label: 'Failure Modes' },
    { id: 'cmp98-checklist', label: 'Study Checklist' },
  ],
  examples: examples.map((example) => ({ id: example.id, label: example.title })),
  glossary: [{ id: 'cmp98-glossary', label: 'Terms' }],
}

function isTabId(value: string | null): value is TabId {
  return (
    value === 'big-picture' ||
    value === 'core-concepts' ||
    value === 'examples' ||
    value === 'glossary'
  )
}

function toComparisonRoute(name: string): string {
  return `${COMPARISONS_BASE_ROUTE}/${slugifySegment(name)}`
}

const comparisonsHelpStyles = `
.cmp98-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.cmp98-window {
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

.cmp98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-height: 28px;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.cmp98-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  line-height: 1;
  white-space: nowrap;
}

.cmp98-title-controls {
  display: inline-flex;
  gap: 2px;
}

.cmp98-control {
  width: 18px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  text-decoration: none;
  font-size: 11px;
  line-height: 1;
}

.cmp98-control:focus-visible,
.cmp98-tab:focus-visible,
.cmp98-toc-link:focus-visible,
.cmp98-inline-link:focus-visible {
  outline: 1px dotted #000;
  outline-offset: -3px;
}

.cmp98-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.cmp98-tab {
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b7b7b7;
  padding: 5px 10px 4px;
  font-size: 12px;
  line-height: 1.2;
  cursor: pointer;
}

.cmp98-tab-active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.cmp98-main {
  display: grid;
  grid-template-columns: 248px minmax(0, 1fr);
  flex: 1;
  min-height: 0;
  border-top: 1px solid #404040;
  background: #ffffff;
}

.cmp98-toc {
  overflow: auto;
  padding: 12px 12px 18px;
  background: #efefef;
  border-right: 1px solid #808080;
}

.cmp98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.cmp98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.cmp98-toc-item + .cmp98-toc-item {
  margin-top: 8px;
}

.cmp98-toc-link {
  color: #000;
  text-decoration: none;
  font-size: 12px;
  line-height: 1.35;
}

.cmp98-content {
  overflow: auto;
  padding: 16px 22px 24px;
  background: #ffffff;
}

.cmp98-doc-title {
  margin: 0 0 12px;
  font-size: 22px;
  font-weight: 700;
}

.cmp98-intro {
  margin: 0 0 16px;
  font-size: 12px;
  line-height: 1.5;
}

.cmp98-section {
  margin: 0 0 22px;
}

.cmp98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.cmp98-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.cmp98-divider {
  margin: 14px 0 16px;
  border: 0;
  border-top: 1px solid #d4d4d4;
}

.cmp98-content p,
.cmp98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.cmp98-content p {
  margin: 0 0 10px;
}

.cmp98-content ul {
  margin: 0 0 10px 18px;
  padding: 0;
}

.cmp98-content li + li {
  margin-top: 4px;
}

.cmp98-inline-link {
  color: #000080;
  text-decoration: underline;
}

.cmp98-codebox {
  margin: 8px 0 10px;
  padding: 8px 9px;
  background: #f3f3f3;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.cmp98-codebox code {
  display: block;
  white-space: pre-wrap;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  line-height: 1.4;
}

@media (max-width: 900px) {
  .cmp98-main {
    grid-template-columns: 1fr;
  }

  .cmp98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 640px) {
  .cmp98-title {
    font-size: 13px;
    max-width: calc(100% - 72px);
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .cmp98-content {
    padding: 14px 14px 18px;
  }
}
`

export default function ComparisonsPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const requestedTab = searchParams.get('tab')
  const activeTab: TabId = isTabId(requestedTab) ? requestedTab : 'big-picture'
  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(location.search)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Comparisons (${activeTabLabel})`
  }, [activeTab, activeTabLabel, location.search, setSearchParams])

  const handleTabChange = (tab: TabId) => {
    if (tab === activeTab) {
      return
    }

    const nextParams = new URLSearchParams(location.search)
    nextParams.set('tab', tab)
    setSearchParams(nextParams)
  }

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Comparisons',
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
    <div className="cmp98-help-page">
      <style>{comparisonsHelpStyles}</style>
      <div className="cmp98-window" role="presentation">
        <header className="cmp98-titlebar">
          <span className="cmp98-title">Comparisons</span>
          <div className="cmp98-title-controls">
            <button
              className="cmp98-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="cmp98-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="cmp98-tabs" role="tablist" aria-label="Comparisons Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`cmp98-tab ${activeTab === tab.id ? 'cmp98-tab-active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="cmp98-main">
          <aside className="cmp98-toc" aria-label="Table of contents">
            <h2 className="cmp98-toc-title">Contents</h2>
            <ul className="cmp98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id} className="cmp98-toc-item">
                  <a href={`#${section.id}`} className="cmp98-toc-link">
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="cmp98-content">
            <h1 className="cmp98-doc-title">Comparisons</h1>
            <p className="cmp98-intro">
              This page is the overview for the Comparisons subsection inside Languages &amp;
              Ecosystems. It explains how to evaluate competing tools, platforms, frameworks,
              languages, and architectural choices without collapsing into hype-driven rankings or
              context-free advice.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="cmp98-overview" className="cmp98-section">
                  <h2 className="cmp98-heading">Overview</h2>
                  {overviewSections.map((section) => (
                    <div key={section.title}>
                      <h3 className="cmp98-subheading">{section.title}</h3>
                      <p>{section.body}</p>
                    </div>
                  ))}
                </section>

                <hr className="cmp98-divider" />

                <section id="cmp98-why" className="cmp98-section">
                  <h2 className="cmp98-heading">Why It Matters</h2>
                  <ul>
                    {whyItMatters.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <hr className="cmp98-divider" />

                <section id="cmp98-history" className="cmp98-section">
                  <h2 className="cmp98-heading">Historical Context</h2>
                  {historicalContext.map((item) => (
                    <div key={item.title}>
                      <h3 className="cmp98-subheading">{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>

                <hr className="cmp98-divider" />

                <section id="cmp98-directory" className="cmp98-section">
                  <h2 className="cmp98-heading">Comparison Directory</h2>
                  <p>
                    The pages below are the concrete comparison entries in this subsection. Read
                    them as decision frameworks, not as permanent rankings. Each one becomes useful
                    only when matched to a real workload and team.
                  </p>
                  {comparisonDirectory.map((group) => (
                    <div key={group.heading}>
                      <h3 className="cmp98-subheading">{group.heading}</h3>
                      {group.items.map((item) => (
                        <p key={item}>
                          <Link to={toComparisonRoute(item)} className="cmp98-inline-link">
                            {item}
                          </Link>
                        </p>
                      ))}
                    </div>
                  ))}
                </section>

                <hr className="cmp98-divider" />

                <section id="cmp98-themes" className="cmp98-section">
                  <h2 className="cmp98-heading">Comparison Themes</h2>
                  {comparisonThemes.map((item) => (
                    <div key={item.title}>
                      <h3 className="cmp98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <hr className="cmp98-divider" />

                <section id="cmp98-takeaways" className="cmp98-section">
                  <h2 className="cmp98-heading">Key Takeaways</h2>
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
                <section id="cmp98-signals" className="cmp98-section">
                  <h2 className="cmp98-heading">Topic Signals</h2>
                  {topicSignals.map((item) => (
                    <div key={item.title}>
                      <h3 className="cmp98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="cmp98-criteria" className="cmp98-section">
                  <h2 className="cmp98-heading">Evaluation Criteria</h2>
                  {evaluationCriteria.map((item) => (
                    <div key={item.title}>
                      <h3 className="cmp98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="cmp98-patterns" className="cmp98-section">
                  <h2 className="cmp98-heading">Comparison Patterns</h2>
                  {comparisonPatterns.map((item) => (
                    <div key={item.title}>
                      <h3 className="cmp98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="cmp98-proofs" className="cmp98-section">
                  <h2 className="cmp98-heading">Decision Obligations</h2>
                  {proofObligations.map((item) => (
                    <div key={item.title}>
                      <h3 className="cmp98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="cmp98-failures" className="cmp98-section">
                  <h2 className="cmp98-heading">Failure Modes</h2>
                  {failureModes.map((item) => (
                    <div key={item.title}>
                      <h3 className="cmp98-subheading">{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </section>

                <section id="cmp98-checklist" className="cmp98-section">
                  <h2 className="cmp98-heading">Study Checklist</h2>
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
                  <section key={example.id} id={example.id} className="cmp98-section">
                    <h2 className="cmp98-heading">{example.title}</h2>
                    <p>
                      <strong>Area:</strong> {example.area}
                    </p>
                    <p>{example.intro}</p>
                    <p>
                      <strong>Why this example fits:</strong> {example.whyFit}
                    </p>
                    <div className="cmp98-codebox">
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
              <section id="cmp98-glossary" className="cmp98-section">
                <h2 className="cmp98-heading">Glossary</h2>
                {glossary.map((entry) => (
                  <p key={entry.term}>
                    <strong>{entry.term}:</strong> {entry.definition}
                  </p>
                ))}
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
