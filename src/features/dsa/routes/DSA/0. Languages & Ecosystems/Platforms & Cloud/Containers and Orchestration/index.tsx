import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
type SectionNote = { title: string; details: string; notes: string }
type NarrativeSection = { id: string; title: string; paragraphs: string[] }
type ExampleSection = { id: string; title: string; code: string; explanation: string }
type GlossaryTerm = { term: string; definition: string }

const introParagraphs = [
  'Containers and orchestration are the operational foundation for packaging, scheduling, networking, scaling, and managing modern distributed applications. Containers standardize how software is shipped. Orchestration systems decide where it runs, how it is connected, how it recovers from failure, and how it evolves over time.',
  'That sounds straightforward until platform questions appear: what belongs in an image, how runtime configuration is injected, how services discover each other, how workloads scale, how multi-tenant clusters are governed, and when orchestration becomes more complexity than the application actually needs.',
  'This page treats containers and orchestration as a platform topic rather than a product pitch. The emphasis is on container images, runtime isolation, registries, scheduling, networking, service discovery, lifecycle management, state, observability, security, and the tradeoffs that decide when orchestration helps or hurts.',
]

const bigPicture: SectionNote[] = [
  {
    title: 'What containers are',
    details:
      'Containers package an application together with its filesystem dependencies and runtime assumptions in a standardized image format. They isolate processes through operating-system primitives rather than booting a full virtual machine for each workload.',
    notes:
      'The value is consistency: the same image can move between laptops, CI systems, staging environments, and production clusters with fewer environment-specific surprises.',
  },
  {
    title: 'What orchestration adds',
    details:
      'Orchestration systems manage the placement, lifecycle, scaling, networking, and recovery of many containerized workloads. They provide control loops and scheduling logic that turn many isolated containers into an operable platform.',
    notes:
      'This is where the problem changes from "can I run one container?" to "can I run a fleet of services safely and repeatedly under load and failure?"',
  },
  {
    title: 'Why teams adopt them',
    details:
      'Teams adopt containers to make packaging and runtime behavior more predictable. They adopt orchestration to reduce manual operations for deployment, service discovery, scaling, rollout management, and failure recovery.',
    notes:
      'The adoption case is strongest when many services or environments need the same operational conventions. It is weaker when the workload is simple enough that the orchestration layer creates more complexity than it removes.',
  },
  {
    title: 'What they are not',
    details:
      'Containers are not a security boundary strong enough to replace all host-level controls, and orchestration is not a reason to ignore application design, observability, or deployment discipline. Packaging and scheduling do not automatically make systems simple.',
    notes:
      'The most common mistake is assuming that putting software in a container somehow solves configuration, state, networking, or organizational ownership problems by itself.',
  },
]

const keyTakeaways = [
  'Containers standardize packaging and runtime assumptions, while orchestration manages placement, recovery, networking, and scaling.',
  'Images, registries, scheduling, service discovery, and rollout behavior are all part of the operational contract, not just implementation details.',
  'The hardest design work is often around state, tenancy, observability, and security boundaries rather than around the container syntax itself.',
  'Orchestration is powerful for many-service platforms, but it can be unnecessary overhead for simple workloads.',
  'Good platform design treats containers as one layer in a broader system that includes CI, secrets management, policy, and runtime governance.',
]

const coreSections: NarrativeSection[] = [
  {
    id: 'core-images',
    title: 'Images, layers, and runtime packaging',
    paragraphs: [
      'A container image is a layered filesystem plus metadata about how a workload should start. Layers make image reuse and caching practical, while image immutability helps environments behave consistently when they pull the same digest.',
      'Platform teams care about images because image design affects startup time, vulnerability surface, rebuild speed, debugging experience, and supply-chain trust. A poor image strategy can make a platform slow and risky before the orchestrator even enters the picture.',
      'A useful mental model is that the image should contain what is stable about the workload, while environment-specific configuration should be injected at runtime through configuration, secrets, or platform wiring.',
    ],
  },
  {
    id: 'core-runtime',
    title: 'Runtime isolation and host interaction',
    paragraphs: [
      'Containers isolate processes through namespaces, cgroups, capabilities, and filesystem controls. They are lighter than virtual machines because they share the host kernel, but that also means the security and resource model depends heavily on host configuration.',
      'This matters because the runtime boundary is not absolute. CPU and memory limits, filesystem mounts, privileged mode, host networking, and device access all shape the real isolation model.',
      'Operationally, the platform needs to know which workloads can be tightly sandboxed and which require more direct host interaction. That is a policy and workload-design question, not just a runtime flag choice.',
    ],
  },
  {
    id: 'core-registries',
    title: 'Registries, tagging, and supply chain',
    paragraphs: [
      'Images are distributed through registries, and the way they are tagged, signed, scanned, and promoted becomes part of the platform supply chain. Tags are convenient, but digests are what make deployments truly reproducible.',
      'Teams should care where images come from, how they are built, whether dependencies are scanned, and how promotion from one environment to another is tracked. The registry is not just storage. It is part of production change control.',
      'A mature platform therefore treats image publication, provenance, and retention as first-class operational concerns rather than as afterthoughts to the build pipeline.',
    ],
  },
  {
    id: 'core-scheduling',
    title: 'Scheduling, placement, and resource management',
    paragraphs: [
      'Orchestration systems schedule workloads onto available compute based on resource requests, constraints, affinities, taints, topology, and policy rules. This is how the platform decides where work should run and which nodes are suitable.',
      'Scheduling is not only about bin-packing efficiency. It is also about failure domains, noisy neighbors, GPU or storage constraints, region and zone placement, and workload isolation between tenants or service classes.',
      'A scheduler is most useful when the platform understands those constraints clearly. Without that, the cluster may technically be dynamic while still producing unpredictable latency, contention, or poor fault isolation.',
    ],
  },
  {
    id: 'core-networking',
    title: 'Service discovery, networking, and ingress',
    paragraphs: [
      'Orchestration platforms usually provide a networking model for pod or container reachability, service discovery, load balancing, and ingress from outside the cluster. These systems determine how services find each other and how external traffic enters the platform.',
      'Networking is one of the least forgiving parts of orchestration because it combines service identity, DNS, policies, TLS termination, and failure behavior. When networking is unclear, every deployment problem starts to look like an application bug.',
      'The platform needs to define what internal service-to-service communication looks like, how external exposure works, which paths are authenticated, and where cross-cutting networking controls such as policies or gateways live.',
    ],
  },
  {
    id: 'core-rollouts',
    title: 'Lifecycle, rollouts, and self-healing',
    paragraphs: [
      'Orchestrators manage restart policies, health checks, scaling signals, rolling updates, and replacement behavior. This is what lets the platform react when a process exits, a node fails, or a new deployment version is introduced.',
      'Health checks and rollout rules are powerful because they turn application behavior into control-plane decisions. They are also dangerous when configured without a clear understanding of startup time, readiness, dependency health, and failure modes.',
      'A good rollout strategy is therefore part application design and part platform policy. The orchestrator can automate recovery and deployment only when the workload exposes meaningful signals to automate against.',
    ],
  },
  {
    id: 'core-state',
    title: 'Stateful workloads and storage',
    paragraphs: [
      'Stateless services fit orchestration more naturally than stateful ones, but real platforms eventually need databases, queues, caches, and stateful internal services. Storage classes, persistent volumes, replication models, and disruption policies become part of the design.',
      'This is where teams often discover that "containers are easy" was only true for stateless apps. Stateful orchestration introduces questions about attach/detach behavior, placement, backup, failover, and consistency that are much harder than image building.',
      'The platform should therefore be honest about which stateful systems belong inside the orchestrator, which should be managed externally, and what operational guarantees the cluster can realistically provide.',
    ],
  },
  {
    id: 'core-observability',
    title: 'Observability, policy, and security',
    paragraphs: [
      'A usable orchestration platform needs logs, metrics, traces, health signals, events, and workload metadata that can be correlated during incidents. Without observability, container fleets become opaque very quickly because workloads are ephemeral and distributed.',
      'Policy and security are equally central. The platform must decide which images are allowed, what privileges containers can request, how secrets are mounted, how network access is limited, and which tenants may schedule where.',
      'Containers and orchestrators multiply operational power. That is why they also multiply the need for governance. A shared cluster without policy is not a platform. It is just a faster way to create hard-to-debug production problems.',
    ],
  },
  {
    id: 'core-compare',
    title: 'Tradeoffs, fit, and compare and contrast',
    paragraphs: [
      'Compared with virtual-machine-centric deployment, containers usually provide faster packaging, denser resource use, and better environment consistency. Compared with serverless or fully managed platforms, orchestration gives more control but also more platform responsibility.',
      'Compared with simple container runners or a small number of manually managed services, full orchestration adds a significant control-plane tax. That tax is worth paying only when the workload count, scaling behavior, environment count, or organizational complexity justify it.',
      'The right question is not "is orchestration modern?" The right question is "does this system benefit enough from orchestration to justify its operational cost?"',
    ],
  },
  {
    id: 'core-pitfalls',
    title: 'Common failure modes',
    paragraphs: [
      'Teams get into trouble when they containerize everything without deciding what belongs in the image versus runtime configuration, when they adopt orchestration before having basic observability and deployment discipline, or when they assume the orchestrator can compensate for weak application health behavior.',
      'Another common problem is using one large cluster without clear tenancy, quotas, network policy, or ownership boundaries. The result is shared infrastructure with unclear blast radius and unclear responsibility during incidents.',
      'The hard part is therefore not learning the CLI commands. It is designing service boundaries, rollout rules, failure recovery, security policy, and operational workflows that make the orchestrated system predictable.',
    ],
  },
]

const designChecklist = [
  'Keep images minimal, reproducible, and clearly separated from environment-specific runtime configuration.',
  'Define scheduling and resource policies around real workload classes, not only around default cluster settings.',
  'Treat networking, service discovery, and ingress as core platform contracts, not incidental YAML.',
  'Be explicit about which stateful systems belong inside the orchestrator and which should remain externally managed.',
  'Invest in observability, policy, and tenancy boundaries before treating the cluster as a shared platform.',
]

const examples: ExampleSection[] = [
  {
    id: 'example-dockerfile',
    title: 'Package an application into a container image',
    code: `FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY package*.json ./
RUN npm ci --omit=dev
CMD ["node", "dist/server.js"]`,
    explanation:
      'This is the basic container packaging pattern: separate build-time concerns from runtime concerns so the final image is smaller, cleaner, and closer to production needs.',
  },
  {
    id: 'example-compose',
    title: 'Run multiple containers together for local orchestration',
    code: `services:
  api:
    image: myorg/payments-api:1.2.0
    ports:
      - "8080:8080"
    environment:
      DATABASE_URL: postgres://postgres:postgres@db:5432/payments
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: postgres`,
    explanation:
      'Local orchestration tools are useful for development and simple environments. They provide a smaller-scale version of the packaging and dependency questions that appear in larger orchestrators.',
  },
  {
    id: 'example-k8s',
    title: 'Declare an orchestrated workload and service',
    code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: payments-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: payments-api
  template:
    metadata:
      labels:
        app: payments-api
    spec:
      containers:
        - name: api
          image: myorg/payments-api:1.2.0
          ports:
            - containerPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: payments-api
spec:
  selector:
    app: payments-api
  ports:
    - port: 80
      targetPort: 8080`,
    explanation:
      'This shows the standard orchestration split: one object manages replicated workload lifecycle, while another provides stable service discovery and traffic routing.',
  },
  {
    id: 'example-health',
    title: 'Use health signals to support self-healing and rollout safety',
    code: `livenessProbe:
  httpGet:
    path: /health/live
    port: 8080
readinessProbe:
  httpGet:
    path: /health/ready
    port: 8080`,
    explanation:
      'Health probes are how applications communicate operational truth to the orchestrator. Good probes make rollout and self-healing behavior safer; bad probes make the control plane act on misleading signals.',
  },
]

const glossary: GlossaryTerm[] = [
  {
    term: 'Container',
    definition:
      'A packaged process environment that bundles an application with its filesystem dependencies and runtime metadata.',
  },
  {
    term: 'Image',
    definition:
      'An immutable container package built from layered filesystem content and metadata.',
  },
  { term: 'Registry', definition: 'A system for storing and distributing container images.' },
  {
    term: 'Orchestrator',
    definition:
      'A control plane that schedules, scales, networks, and manages groups of containerized workloads.',
  },
  {
    term: 'Scheduler',
    definition: 'The part of the orchestration system that decides where workloads should run.',
  },
  {
    term: 'Service discovery',
    definition:
      'The mechanism by which workloads find and communicate with other workloads through stable names or endpoints.',
  },
  {
    term: 'Ingress',
    definition: 'The path and policy by which external traffic enters the orchestrated platform.',
  },
  {
    term: 'Readiness',
    definition: 'A signal indicating whether a workload is prepared to receive traffic.',
  },
  {
    term: 'Liveness',
    definition: 'A signal indicating whether a workload should continue running or be restarted.',
  },
  {
    term: 'Persistent volume',
    definition:
      'A storage resource used to give orchestrated workloads data that outlives container restarts.',
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
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-why', label: 'Why It Matters' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-images', label: 'Images and Packaging' },
    { id: 'core-runtime', label: 'Runtime Isolation' },
    { id: 'core-registries', label: 'Registries and Supply Chain' },
    { id: 'core-scheduling', label: 'Scheduling and Placement' },
    { id: 'core-networking', label: 'Networking and Discovery' },
    { id: 'core-rollouts', label: 'Rollouts and Self-Healing' },
    { id: 'core-state', label: 'State and Storage' },
    { id: 'core-observability', label: 'Observability and Security' },
    { id: 'core-compare', label: 'Fit and Tradeoffs' },
    { id: 'core-pitfalls', label: 'Pitfalls' },
    { id: 'core-checklist', label: 'Design Checklist' },
  ],
  examples: examples.map((example) => ({ id: example.id, label: example.title })),
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function ContainersAndOrchestrationPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Containers and Orchestration',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Containers and Orchestration"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Containers and Orchestration</h1>
      {introParagraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            {bigPicture.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.details}</p>
                <p>{item.notes}</p>
              </div>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-why" className="bin98-section">
            <h2 className="bin98-heading">Why It Matters</h2>
            <p>
              Modern platforms need packaging that is portable and runtime control that is
              repeatable. Containers matter because they reduce environment drift; orchestration
              matters because it turns many packaged workloads into something the platform can
              actually operate under change and failure.
            </p>
            <p>
              That is why this topic sits at the center of cloud platforms. It affects build
              pipelines, runtime policy, networking, tenancy, rollout safety, observability, and how
              much platform complexity an organization is willing to own.
            </p>
          </section>
          <hr className="bin98-divider" />
          <section id="bp-takeaways" className="bin98-section">
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
          {coreSections.map((section) => (
            <section key={section.id} id={section.id} className="bin98-section">
              <h2 className="bin98-heading">{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={`${section.id}-${paragraph}`}>{paragraph}</p>
              ))}
            </section>
          ))}
          <section id="core-checklist" className="bin98-section">
            <h2 className="bin98-heading">Design Checklist</h2>
            <ul>
              {designChecklist.map((item) => (
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
          {glossary.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
