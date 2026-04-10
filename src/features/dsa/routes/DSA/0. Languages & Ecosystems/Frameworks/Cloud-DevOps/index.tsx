import { Link } from 'react-router-dom'

import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'
import { slugifySegment } from '@/features/dsa/utils/slug'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

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
  takeaway: string
}

const CLOUD_DEVOPS_BASE_ROUTE = '/dsa/0-languages-and-ecosystems/frameworks/cloud-devops'

const frameworkDirectory = ['Docker', 'Kubernetes', 'Terraform']

const introParagraphs = [
  'Cloud and DevOps Frameworks is the overview page for the part of Languages & Ecosystems that focuses on infrastructure modeling, deployment orchestration, environment reproducibility, and the automation systems that move software from source control into running services.',
  'The key idea is that cloud and DevOps frameworks are still frameworks even when they do not look like application code frameworks. They define structure, lifecycle, extension points, conventions, and operational workflows.',
  'Use this page as a field guide for understanding what these frameworks standardize, why they matter, how they interact with delivery architecture, and how to reason about tools like Docker, Kubernetes, and Terraform as part of a broader cloud and platform ecosystem.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'cloud98-overview',
    title: 'Overview',
    paragraphs: [
      'Cloud and DevOps frameworks are structured systems for defining how software is packaged, deployed, operated, and evolved across environments. They standardize workflows around infrastructure declaration, service runtime, configuration, networking, rollout coordination, and the automation pipelines that keep environments reproducible.',
      'They are frameworks because they do more than expose commands. They define models: container model, orchestration model, infrastructure state model, pipeline model, environment model, and platform integration model. Once a team adopts one, that model tends to influence architecture, deployment discipline, and operational responsibilities far beyond the initial setup.',
      'This makes cloud and DevOps framework choice highly consequential. These tools become the invisible architecture of delivery itself. They affect how applications are built, how teams debug incidents, how environments are created, how changes are reviewed, and how much operational complexity the organization can sustain.',
    ],
  },
  {
    id: 'cloud98-why',
    title: 'Why Cloud and DevOps Frameworks Matter',
    paragraphs: [
      'Modern systems are rarely shipped by copying binaries onto one server by hand. Teams package software into images, provision infrastructure through code, deploy through pipelines, expose telemetry, define scaling behavior, and roll changes out across multiple environments. Cloud and DevOps frameworks matter because they make these repeated delivery concerns structured and automatable rather than ad hoc.',
      'They also matter because operational inconsistency is expensive. If every service has its own deployment assumptions, local environment model, build process, runtime contract, and infrastructure management approach, delivery becomes fragile and hard to scale organizationally. Frameworks reduce that variance by imposing conventions around how systems are built and run.',
      'The deeper reason they matter is that operational behavior is part of software behavior. Reliability, reproducibility, rollback, scalability, and compliance all depend on the delivery framework around the code, not just the code itself.',
    ],
    bullets: [
      'They make environments reproducible rather than manually assembled.',
      'They turn deployment and infrastructure changes into reviewable artifacts.',
      'They encode operational workflows so teams do not reinvent delivery logic per project.',
      'They reduce configuration drift and inconsistent deployment practices.',
      'They influence reliability, incident response, and migration cost.',
    ],
  },
  {
    id: 'cloud98-what-they-solve',
    title: 'What These Frameworks Usually Solve',
    paragraphs: [
      'Cloud and DevOps frameworks exist because delivery and operations contain recurring categories of complexity. Teams need repeatable ways to package applications, declare infrastructure, model runtime dependencies, connect services, manage secrets, roll changes out, observe system behavior, and recover from failure. Those concerns exist whether the workload is a small service or a large multi-team platform.',
      'Different tools focus on different slices of this problem. Container frameworks standardize packaging and runtime encapsulation. Orchestration frameworks standardize scheduling, service discovery, rollout policy, and runtime topology. Infrastructure-as-code frameworks standardize declaration of cloud resources and environment composition. CI and delivery frameworks standardize how code changes are validated and promoted.',
    ],
    bullets: [
      'Packaging and runtime isolation.',
      'Infrastructure declaration and state management.',
      'Deployment automation and promotion workflows.',
      'Service orchestration and scaling.',
      'Environment consistency and configuration control.',
      'Observability, rollback, and change safety.',
    ],
  },
  {
    id: 'cloud98-mental-model',
    title: 'Mental Model',
    paragraphs: [
      'A useful mental model is that cloud and DevOps frameworks are lifecycle frameworks for systems in operation. They define how a system is built, where it is placed, how it is configured, how it starts, how it scales, how it is updated, how it is monitored, and how it is torn down.',
      'That differs from backend or frontend frameworks mainly in subject matter, not in kind. A web framework may own request lifecycle. A cloud framework may own deployment lifecycle. A container framework may own process packaging and runtime environment. An infrastructure framework may own the declarative model of resources. In each case, the framework reduces repeated design work by giving a system shape.',
      'This is why these tools should be evaluated as architecture, not just tooling. They determine who owns what, where state lives, which operations are safe, and how much change complexity the team can absorb.',
    ],
  },
  {
    id: 'cloud98-landscape',
    title: 'Framework Landscape in This Section',
    paragraphs: [
      'This subsection currently includes three concrete reference pages representing major parts of the cloud and DevOps toolchain. Together they show the packaging, orchestration, and infrastructure declaration layers that many modern teams rely on.',
    ],
    bullets: frameworkDirectory,
  },
  {
    id: 'cloud98-why-hard',
    title: 'Why This Domain Feels Hard',
    paragraphs: [
      'Cloud and DevOps frameworks often feel harder than application frameworks because they expose distributed systems concerns directly. Networking, IAM, infrastructure drift, rollout safety, environment sprawl, secrets, scaling, quotas, and operational debugging all appear at once. The framework is dealing with real systems under change, not just local code composition.',
      'The second reason is that mistakes are often delayed and cross-cutting. A framework decision about infrastructure state, cluster topology, deployment strategy, or image construction may not fail immediately. It may fail during scale, under load, during incident response, or while upgrading the platform months later.',
      'That is why maturity in this space depends on reasoning about lifecycle and operations, not only on learning commands.',
    ],
  },
  {
    id: 'cloud98-when-to-use',
    title: 'When These Frameworks Are the Right Tool',
    paragraphs: [
      'Cloud and DevOps frameworks are the right tool when a team needs repeatability, automation, and organizational consistency across environments. As soon as systems are deployed repeatedly, scaled across services, or operated by multiple people, manual infrastructure and deployment practices become a liability.',
      'They are especially valuable when environments must be recreated, reviewed, promoted, audited, or migrated. In those cases, explicit models for packaging, infrastructure declaration, and rollout behavior become part of core engineering quality rather than optional process overhead.',
    ],
  },
  {
    id: 'cloud98-when-not-to-use',
    title: 'Where They Can Hurt',
    paragraphs: [
      'These frameworks can hurt when teams adopt them for prestige rather than fit. It is possible to add containers, clusters, infrastructure-as-code layers, and complex delivery pipelines to systems that did not need that much operational machinery. In those cases, the framework increases complexity faster than it increases reliability.',
      'The real danger is adopting abstractions that exceed the scale, team maturity, or workload shape of the project. A single small product with stable infrastructure needs is not automatically improved by every advanced orchestration or platform-engineering practice. Sometimes a simpler deployment model is the more disciplined choice.',
      'The right question is whether the framework reduces operational ambiguity or merely multiplies the number of moving parts the team now has to understand.',
    ],
  },
  {
    id: 'cloud98-roadmap',
    title: 'Coverage Roadmap',
    paragraphs: [
      'This page provides a roadmap for the subsection and keeps the deeper follow-on topics aligned with the same scope.',
    ],
    bullets: [
      'Overview and key ideas will be added.',
      'Core syntax, APIs, ecosystem, and architecture notes will be added.',
      'Use cases, tradeoffs, and compare/contrast references will be added.',
    ],
  },
  {
    id: 'cloud98-takeaways',
    title: 'Key Takeaways',
    paragraphs: [
      'Cloud and DevOps frameworks are delivery and operations frameworks. They standardize how systems are packaged, declared, deployed, updated, and observed. Their value comes from coordinated structure, not from command novelty.',
      'Choosing them well requires understanding organizational maturity, environment complexity, delivery frequency, and operational constraints. These tools shape the lived reality of production systems, so they should be treated as first-class architecture decisions.',
    ],
    bullets: [
      'Treat cloud and DevOps tooling as architecture, not just automation.',
      'Prefer frameworks that reduce operational ambiguity and environment drift.',
      'Evaluate complexity cost, not only feature count or ecosystem popularity.',
      'Assume the tool will shape incident response and migration behavior later.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'cloud98-packaging',
    title: 'Packaging and Artifact Model',
    paragraphs: [
      'One foundational concern in this domain is how software becomes a deployable artifact. Cloud and DevOps frameworks often define this through container images, build outputs, bundles, module plans, or immutable artifacts promoted across environments.',
      'The quality of the artifact model matters because it determines reproducibility. If an artifact can be rebuilt consistently, tagged clearly, scanned, promoted, and rolled back, the surrounding delivery system becomes more reliable. If not, teams end up debugging environment-specific differences and hidden build assumptions.',
      'Docker is a major example here because it standardizes packaging and runtime encapsulation. But the broader principle is more important than any one tool: delivery starts with a stable artifact boundary.',
    ],
  },
  {
    id: 'cloud98-declarative',
    title: 'Declarative Infrastructure and Desired State',
    paragraphs: [
      'A central idea in modern cloud tooling is desired state. Instead of issuing imperative commands one by one and hoping the final environment is correct, teams define what resources should exist and let the framework compute how to converge the live system toward that declaration.',
      'This declarative model is powerful because it turns infrastructure into reviewable configuration rather than tribal operational memory. Terraform is a major example, but the underlying principle shows up broadly in infrastructure frameworks and orchestrators.',
      'The tradeoff is that state management becomes critical. Teams need to understand what system owns the truth, how drift is detected, how plans are reviewed, and how destructive changes are controlled.',
    ],
  },
  {
    id: 'cloud98-orchestration',
    title: 'Orchestration and Runtime Scheduling',
    paragraphs: [
      'Once applications are packaged and infrastructure exists, the next question is how services are placed, started, restarted, scaled, connected, and updated. Orchestration frameworks answer this by defining units of deployment, scheduling rules, health checks, service discovery, rollout policies, and runtime topology.',
      'Kubernetes is the most visible example in this subsection, but the architectural idea is broader: orchestration frameworks standardize how distributed workloads behave after deployment. They do not only run containers. They define the operating model around them.',
      'This is why orchestration frameworks are often harder to learn than packaging tools. They are managing real runtime behavior under load, failure, and change.',
    ],
  },
  {
    id: 'cloud98-pipelines',
    title: 'Pipelines and Promotion Flow',
    paragraphs: [
      'Delivery frameworks also define how code moves from commit to production. This includes linting, testing, artifact creation, image publishing, plan generation, approvals, environment promotion, deployment triggers, and rollback procedures.',
      'A mature delivery pipeline is not only a sequence of shell commands. It is a policy and risk-control framework. It determines when changes are allowed to move forward, what evidence is required, and how the system behaves when part of the delivery flow fails.',
      'The deeper concept is promotion discipline: software should move through environments in a controlled way rather than being reassembled differently at each stage.',
    ],
  },
  {
    id: 'cloud98-config-secrets',
    title: 'Configuration, Secrets, and Environment Boundaries',
    paragraphs: [
      'Cloud and DevOps frameworks inevitably touch configuration because environments differ. Teams need a coherent model for runtime variables, secret references, certificates, service endpoints, and environment-scoped feature flags.',
      'A good framework setup makes configuration visible and deliberate without making secrets easy to leak. The system should clearly separate what is safe to store in version control, what belongs in secret stores, and what can be promoted automatically across environments.',
      'Weak configuration discipline is one of the most common causes of cloud delivery pain because it creates hidden environmental coupling that is hard to test locally and hard to debug in production.',
    ],
  },
  {
    id: 'cloud98-networking',
    title: 'Networking and Service Connectivity',
    paragraphs: [
      'These frameworks also define how services find and talk to each other. That includes ingress, service discovery, DNS, internal routing, load balancing, policy boundaries, and sometimes service mesh integration.',
      'This is important because a deployment framework is not useful if the runtime topology it creates is opaque or inconsistent. Teams need to know how traffic enters the system, how internal components reach one another, and where failures are likely to surface.',
      'Networking concerns are often where cloud frameworks shift from feeling like build tooling to feeling like infrastructure architecture.',
    ],
  },
  {
    id: 'cloud98-observability',
    title: 'Observability and Operational Feedback',
    paragraphs: [
      'A cloud or DevOps framework is only as useful as the visibility it enables. Deployments, infrastructure changes, autoscaling events, crash loops, plan diffs, and pipeline failures all need to be observable. Otherwise the automation becomes opaque rather than trustworthy.',
      'Teams should evaluate how well a framework supports logs, metrics, traces, health checks, events, audit trails, and deployment history. The question is not only whether telemetry can be added. The question is whether the operational model makes that telemetry easy to interpret.',
      'Good delivery systems shorten the distance between change and understanding. Bad ones create many automated steps without clear feedback loops.',
    ],
  },
  {
    id: 'cloud98-security',
    title: 'Security, IAM, and Policy',
    paragraphs: [
      'Security is inseparable from cloud and DevOps frameworks because those tools often hold permissions to create infrastructure, deploy workloads, access registries, read secrets, and mutate production environments. IAM design, role boundaries, secret storage, policy enforcement, and auditability are part of the framework decision.',
      'A mature framework setup should make least-privilege design easier rather than harder. It should support reviewability, policy checks, secret isolation, and environment separation in ways that reduce the chance of dangerous accidental access.',
      'This is also where organizational maturity matters. Powerful automation with weak access boundaries can scale mistakes faster than manual workflows ever could.',
    ],
  },
  {
    id: 'cloud98-platform-teams',
    title: 'Platform Engineering and Shared Standards',
    paragraphs: [
      'As organizations grow, cloud and DevOps frameworks often become the basis for platform engineering. Instead of each application team inventing its own build, deploy, IAM, networking, and observability model, a platform team defines paved roads and reusable templates that encode the preferred way to ship software.',
      'This is a framework mindset at organizational scale. The value is not only speed. The value is reducing variation in the highest-risk parts of delivery while still leaving application teams enough flexibility to solve domain-specific problems.',
      'A good platform framework does not remove engineering judgment. It removes repeated low-value decisions and unsafe inconsistency.',
    ],
  },
  {
    id: 'cloud98-operations',
    title: 'Operational Complexity and Day Two Concerns',
    paragraphs: [
      'The first deployment is rarely the hard part. The hard part is what happens on day two: cluster upgrades, state migration, secret rotation, policy changes, scaling anomalies, cost pressure, noisy alerts, broken pipelines, and the need to recover quickly during incidents.',
      'Cloud and DevOps frameworks should therefore be judged by life after adoption. How painful are upgrades? How understandable is rollback? How fragile is state? How hard is drift recovery? How well does the framework support safe changes under pressure?',
      'These are often the questions that distinguish a merely impressive framework from one that is operationally sound.',
    ],
  },
  {
    id: 'cloud98-performance-cost',
    title: 'Performance, Utilization, and Cost',
    paragraphs: [
      'Unlike many developer tools, cloud and DevOps frameworks affect cost directly. Packaging choices affect image size and startup behavior. Orchestration affects bin-packing, scaling, and idle overhead. Infrastructure frameworks influence resource sprawl, duplication, and drift. Pipelines affect compute usage and feedback speed.',
      'That means performance in this domain includes delivery performance and operational efficiency, not only application latency. Teams should consider deploy speed, plan clarity, scaling efficiency, image pull cost, cold starts where relevant, and the operational burden of the chosen abstraction.',
      'The right framework may sometimes be the one that is slightly less feature-rich but much more understandable and cost-predictable at the actual team and workload scale.',
    ],
  },
  {
    id: 'cloud98-comparisons',
    title: 'Compare and Contrast',
    paragraphs: [
      'Docker versus Kubernetes is not a direct comparison because one is primarily about packaging and runtime encapsulation while the other is about orchestration. Terraform versus Kubernetes is also not a clean substitution because one describes infrastructure resources while the other manages running workloads. Cloud and DevOps frameworks often overlap in workflow without replacing each other directly.',
      'The useful comparison is usually by control boundary. Which tool owns build artifacts? Which tool owns infrastructure state? Which tool owns runtime scheduling? Which tool owns promotion policy? Once those boundaries are clear, the stack becomes more understandable.',
      'This is why teams get into trouble when they ask only which tool is best. The more accurate question is which operational layer the tool is meant to govern and whether that ownership boundary is clean in the current system.',
    ],
  },
  {
    id: 'cloud98-failure-modes',
    title: 'Common Failure Modes',
    paragraphs: [
      'Recurring mistakes include adopting complex orchestration too early, mixing imperative and declarative ownership of infrastructure, storing secrets unsafely, building pipelines that are too opaque to debug, and introducing more platform surface area than the team can reliably operate.',
      'Another common failure mode is equating automation with maturity. A system can have many YAML files and still be poorly structured if ownership, state boundaries, rollout safety, and observability are unclear.',
    ],
    bullets: [
      'Choosing tooling based on hype instead of operational fit.',
      'Letting multiple systems fight over the same infrastructure state.',
      'Hiding too much logic in brittle pipelines or shell glue.',
      'Creating cluster or infrastructure sprawl without governance.',
      'Treating platform complexity as a badge of sophistication.',
    ],
  },
  {
    id: 'cloud98-selection',
    title: 'Selection Checklist',
    paragraphs: [
      'When choosing cloud and DevOps frameworks, ask what delivery problems actually exist today and which ones are likely to exist soon. The tool should reduce real operational ambiguity, not merely add a fashionable abstraction layer.',
      'Good selection criteria include team size, deployment frequency, infrastructure complexity, compliance requirements, rollback expectations, workload portability, state management maturity, and how much operational specialization the organization can support.',
    ],
    bullets: [
      'Do you need packaging, orchestration, infrastructure declaration, or all three?',
      'Can the team operate the framework safely after adoption, not only install it?',
      'Does the framework reduce environment drift and improve reviewability?',
      'Will the abstraction remain understandable during incidents and upgrades?',
      'Is the organization ready for the complexity cost of the tool?',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'cloud98-example-dockerfile',
    title: 'Example: Container Packaging with Docker',
    description: [
      'A container packaging framework standardizes how application code becomes a runnable artifact. The container image becomes the promoted unit across environments rather than rebuilding the service differently for each stage.',
      'This matters because reproducibility starts with the artifact boundary.',
    ],
    code: `FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
CMD ["node", "server.js"]`,
    takeaway:
      'Packaging frameworks add value when the same image can move through environments without being rebuilt into a different system each time.',
  },
  {
    id: 'cloud98-example-kubernetes',
    title: 'Example: Orchestrated Deployment on Kubernetes',
    description: [
      'An orchestration framework defines how workloads are described, scheduled, updated, and exposed at runtime. A deployment manifest is not just config. It is a runtime contract for desired state and rollout behavior.',
      'This is where the delivery model becomes an operational model.',
    ],
    code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
spec:
  replicas: 3
  template:
    spec:
      containers:
        - name: api
          image: registry.example.com/api:1.4.0`,
    takeaway:
      'Orchestration frameworks are valuable when runtime placement, rollout, and recovery need to be standardized rather than managed manually.',
  },
  {
    id: 'cloud98-example-terraform',
    title: 'Example: Declarative Infrastructure with Terraform',
    description: [
      'Infrastructure-as-code frameworks model cloud resources as versioned configuration instead of manual console state. This makes environment changes reviewable, repeatable, and easier to reason about over time.',
      'The important concept is desired state ownership, not only the syntax.',
    ],
    code: `resource "aws_s3_bucket" "assets" {
  bucket = "acme-assets-prod"
}

resource "aws_cloudfront_distribution" "cdn" {
  enabled = true
}`,
    takeaway:
      'Infrastructure frameworks are most valuable when they turn live environment changes into planned, reviewable changes with explicit ownership.',
  },
  {
    id: 'cloud98-example-pipeline',
    title: 'Example: CI and Promotion Pipeline',
    description: [
      'A delivery pipeline frameworks the path from change to deployment. It encodes testing, artifact creation, approvals, and promotion flow in one repeatable system.',
      'This converts release behavior from tribal process into explicit operational logic.',
    ],
    code: `steps:
  - run: npm test
  - run: docker build -t registry/app:$GIT_SHA .
  - run: terraform plan
  - approve: production
  - run: kubectl apply -f deploy.yaml`,
    takeaway:
      'Pipelines are frameworks when they define change control and promotion discipline, not just command automation.',
  },
  {
    id: 'cloud98-example-secrets',
    title: 'Example: Secrets as Environment References',
    description: [
      'Cloud delivery systems need a clear boundary between checked-in configuration and secret material. Secrets should be referenced by the runtime environment, not embedded directly in artifacts or configuration committed to the repo.',
      'This is a framework concern because the delivery model determines how secrets are injected and rotated.',
    ],
    code: `env:
  DATABASE_URL: secret://prod/database-url
  REDIS_URL: secret://prod/redis-url
  JWT_SIGNING_KEY: secret://prod/jwt-key`,
    takeaway:
      'A healthy DevOps framework makes secret handling explicit, consistent, and separated from normal configuration.',
  },
  {
    id: 'cloud98-example-rollout',
    title: 'Example: Controlled Rollout Strategy',
    description: [
      'Delivery frameworks should make progressive change possible. Rolling updates, canaries, blue-green strategies, and health-based rollback behavior are all examples of frameworking operational risk rather than handling it manually.',
      'This is part of why cloud tooling is architectural: it defines how change behaves under uncertainty.',
    ],
    code: `strategy:
  type: RollingUpdate
  rollingUpdate:
    maxUnavailable: 1
    maxSurge: 1`,
    takeaway:
      'Operational safety is not an afterthought. In mature systems, rollout behavior is part of the framework contract.',
  },
]

const glossary: Array<{ term: string; definition: string }> = [
  {
    term: 'Artifact',
    definition:
      'A packaged output such as a container image, binary, or bundle that is promoted through environments.',
  },
  {
    term: 'Desired state',
    definition:
      'A declared model of what the system should look like, which the framework tries to reconcile with the live environment.',
  },
  {
    term: 'Infrastructure as code',
    definition:
      'Managing infrastructure resources through versioned configuration rather than manual console or CLI changes.',
  },
  {
    term: 'Container image',
    definition:
      'A packaged filesystem and runtime definition used to run an application consistently across environments.',
  },
  {
    term: 'Orchestration',
    definition:
      'The coordination of workload scheduling, scaling, service discovery, rollout behavior, and runtime state.',
  },
  {
    term: 'Pipeline',
    definition:
      'An automated sequence of validation, build, packaging, approval, and deployment steps for software changes.',
  },
  {
    term: 'Drift',
    definition:
      'A mismatch between declared configuration and the actual live state of infrastructure or runtime systems.',
  },
  {
    term: 'Promotion',
    definition:
      'Moving the same artifact or change through successive environments in a controlled way.',
  },
  {
    term: 'Rollout',
    definition:
      'The process and strategy by which a new version is introduced into a running environment.',
  },
  {
    term: 'Rollback',
    definition: 'Reverting a change or deployment to a previously known-good state.',
  },
  {
    term: 'Secret management',
    definition:
      'The secure storage, access control, rotation, and injection of sensitive values such as tokens, passwords, and keys.',
  },
  {
    term: 'Service discovery',
    definition:
      'The mechanism by which services locate and communicate with one another at runtime.',
  },
  {
    term: 'Idempotence',
    definition:
      'The property that applying the same operation repeatedly results in the same intended state without unexpected side effects.',
  },
  {
    term: 'Health check',
    definition:
      'A runtime signal used to determine whether a workload is ready, alive, or safe to receive traffic.',
  },
  {
    term: 'Immutable infrastructure',
    definition:
      'An operational approach where environments are replaced with new versions rather than modified extensively in place.',
  },
  {
    term: 'Platform engineering',
    definition:
      'The practice of building internal paved roads, reusable infrastructure abstractions, and delivery standards for application teams.',
  },
  {
    term: 'Observability',
    definition:
      'The logs, metrics, traces, events, and audit signals used to understand system behavior and operational change.',
  },
  {
    term: 'State ownership',
    definition:
      'The question of which tool or framework is authoritative for a given part of system configuration or infrastructure.',
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
    { id: 'cloud98-overview', label: 'Overview' },
    { id: 'cloud98-why', label: 'Why Cloud and DevOps Frameworks Matter' },
    { id: 'cloud98-what-they-solve', label: 'What These Frameworks Usually Solve' },
    { id: 'cloud98-mental-model', label: 'Mental Model' },
    { id: 'cloud98-landscape', label: 'Framework Landscape in This Section' },
    { id: 'cloud98-why-hard', label: 'Why This Domain Feels Hard' },
    { id: 'cloud98-when-to-use', label: 'When These Frameworks Are the Right Tool' },
    { id: 'cloud98-when-not-to-use', label: 'Where They Can Hurt' },
    { id: 'cloud98-roadmap', label: 'Coverage Roadmap' },
    { id: 'cloud98-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'cloud98-packaging', label: 'Packaging and Artifact Model' },
    { id: 'cloud98-declarative', label: 'Declarative Infrastructure and Desired State' },
    { id: 'cloud98-orchestration', label: 'Orchestration and Runtime Scheduling' },
    { id: 'cloud98-pipelines', label: 'Pipelines and Promotion Flow' },
    { id: 'cloud98-config-secrets', label: 'Configuration, Secrets, and Environment Boundaries' },
    { id: 'cloud98-networking', label: 'Networking and Service Connectivity' },
    { id: 'cloud98-observability', label: 'Observability and Operational Feedback' },
    { id: 'cloud98-security', label: 'Security, IAM, and Policy' },
    { id: 'cloud98-platform-teams', label: 'Platform Engineering and Shared Standards' },
    { id: 'cloud98-operations', label: 'Operational Complexity and Day Two Concerns' },
    { id: 'cloud98-performance-cost', label: 'Performance, Utilization, and Cost' },
    { id: 'cloud98-comparisons', label: 'Compare and Contrast' },
    { id: 'cloud98-failure-modes', label: 'Common Failure Modes' },
    { id: 'cloud98-selection', label: 'Selection Checklist' },
  ],
  examples: exampleSections.map((section) => ({ id: section.id, label: section.title })),
  glossary: [{ id: 'cloud98-glossary', label: 'Terms' }],
}

function toFrameworkRoute(name: string): string {
  return `${CLOUD_DEVOPS_BASE_ROUTE}/${slugifySegment(name)}`
}

function renderContentSection(
  section: ContentSection,
  isLast: boolean,
  options?: { linkedBullets?: string[] },
): JSX.Element {
  const linkedBullets = new Set(options?.linkedBullets ?? [])

  return (
    <section key={section.id} id={section.id} className="cloud98-section">
      <h2 className="cloud98-heading">{section.title}</h2>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {section.bullets ? (
        <ul>
          {section.bullets.map((item) => (
            <li key={item}>
              {linkedBullets.has(item) ? (
                <Link to={toFrameworkRoute(item)} className="cloud98-inline-link">
                  {item}
                </Link>
              ) : (
                item
              )}
            </li>
          ))}
        </ul>
      ) : null}
      {isLast ? null : <hr className="cloud98-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="cloud98-section">
      <h2 className="cloud98-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="cloud98-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <p>
        <strong>Takeaway:</strong> {section.takeaway}
      </p>
      {isLast ? null : <hr className="cloud98-divider" />}
    </section>
  )
}

export default function CloudAndDevOpsFrameworksPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Cloud and DevOps Frameworks',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Cloud and DevOps Frameworks"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Cloud and DevOps Frameworks</h1>
      <p className="cloud98-doc-subtitle">
        Help-style overview of packaging, orchestration, infrastructure declaration, delivery
        automation, and operational tradeoffs across cloud and DevOps frameworks.
      </p>

      {introParagraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}

      {activeTab === 'big-picture'
        ? bigPictureSections.map((section, index) =>
            renderContentSection(section, index === bigPictureSections.length - 1, {
              linkedBullets: frameworkDirectory,
            }),
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

      {activeTab === 'glossary' ? (
        <section id="cloud98-glossary" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {glossary.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
        </section>
      ) : null}
    </TopicPageShell>
  )
}
