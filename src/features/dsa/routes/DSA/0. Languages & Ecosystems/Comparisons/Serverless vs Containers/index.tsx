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
      'Serverless and containers are often presented as direct rivals, but they are not exactly the same kind of thing. Serverless is primarily an operational model where the cloud platform manages more of the infrastructure, scaling, and capacity behavior for you. Containers are primarily a packaging and runtime model that bundles an application and its dependencies into a portable unit that can run consistently across environments.',
      'That distinction matters because a container can be run in a serverless way, and a serverless platform may accept container images as its deployment artifact. The useful comparison is therefore not simply functions versus Docker. The real question is how much infrastructure ownership, runtime control, portability, scaling behavior, and operational visibility the team wants.',
      'This help-style reference covers Serverless vs Containers across overview, key ideas, APIs, ecosystem, architecture, use cases, and tradeoffs.',
    ],
  },
  {
    id: 'bp-serverless',
    title: 'When Serverless Fits Better',
    paragraphs: [
      'Serverless is often the stronger choice when the workload is event-driven, bursty, request-based, or operational simplicity matters more than low-level runtime control. It is especially attractive for teams that want to focus on application logic while the platform handles scaling, patching of much of the underlying infrastructure, and much of the fleet management burden.',
      'It also fits well when the application scales unpredictably, has intermittent traffic, or benefits from per-request or per-invocation style pricing. In those cases, removing server management and letting the platform scale the workload automatically can create substantial productivity and cost advantages.',
    ],
  },
  {
    id: 'bp-containers',
    title: 'When Containers Fit Better',
    paragraphs: [
      'Containers are often the stronger choice when the application needs more control over runtime behavior, networking, background processing, sidecars, custom processes, long-lived connections, or the operating environment itself. They are especially attractive when the team wants consistent packaging across local development, CI, staging, and production.',
      'They also fit well when the organization already has strong container operations, Kubernetes or orchestrator expertise, and wants to standardize many workloads on one deployment substrate rather than adapting each workload to a more opinionated serverless platform.',
    ],
  },
  {
    id: 'bp-false-binary',
    title: 'Why The Debate Is Often Framed Poorly',
    paragraphs: [
      'A common mistake is to compare serverless only to self-managed virtual machines and containers only to Kubernetes clusters, as if those were the only shapes available. In practice there are serverless functions, serverless containers, managed container platforms, orchestrated containers, and hybrid approaches. The boundary is not one clean line.',
      'Another mistake is to compare deployment artifacts rather than responsibilities. The right question is not just what gets deployed. The right question is who owns scaling, patching, runtime tuning, networking complexity, and capacity planning.',
    ],
  },
  {
    id: 'bp-hybrid',
    title: 'Hybrid Architectures Are Normal',
    paragraphs: [
      'Many mature systems use both models. A team might run the main API in containers, process uploads with serverless functions, and use scheduled serverless jobs for lightweight automation. Another team might deploy containers on a serverless container platform for request-driven services while keeping stateful or network-heavy workloads on orchestrated containers.',
      'This is one reason the comparison should not be treated as ideology. Serverless and containers are often complementary tools in a wider platform design, not mutually exclusive bets where one must replace the other everywhere.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Quick Takeaways',
    paragraphs: [
      'Choose serverless when operational simplicity, automatic scaling, and event-driven execution matter more than low-level environment control.',
      'Choose containers when runtime control, workload portability, networking freedom, and standardized packaging matter more than maximum platform abstraction.',
      'If the application sits in the middle, serverless containers or a hybrid model may be the more accurate answer than picking one extreme.',
    ],
  },
] as const

const coreConceptSections: readonly DocSection[] = [
  {
    id: 'core-what-serverless-means',
    title: 'What Serverless Usually Means',
    paragraphs: [
      'Serverless usually means the platform provisions and scales compute on demand, and the team pays primarily for actual usage rather than for explicitly managed always-on servers. The application code still runs on servers somewhere, but the operational burden of capacity management is pushed much further into the platform.',
      'That can include function-as-a-service offerings, request-driven managed runtimes, or managed services that run code or containers without exposing cluster management as a day-to-day concern. The key identity is not zero servers in reality. The key identity is reduced server ownership by the application team.',
    ],
  },
  {
    id: 'core-what-containers-mean',
    title: 'What Containers Usually Mean',
    paragraphs: [
      'Containers package an application and its dependencies into a standardized runtime unit. This helps the application behave more consistently across laptops, CI systems, staging, and production because the environment is more explicitly defined.',
      'Containers by themselves do not answer the full operations question. A team still needs some way to run, scale, deploy, observe, and network them. That may be a local Docker runtime, a managed container service, a Kubernetes cluster, or even a serverless container platform.',
    ],
  },
  {
    id: 'core-ops-ownership',
    title: 'Operational Ownership',
    paragraphs: [
      'Serverless shifts more responsibility to the provider. Capacity planning, many scaling concerns, and much of the underlying infrastructure management are handled by the platform. This is often the biggest practical reason teams choose serverless, because it shrinks the amount of infrastructure expertise required for many workloads.',
      'Containers preserve more operational responsibility for the team or platform group. Even on managed services, teams usually think more directly about images, process lifecycles, resource requests, rollout strategy, networking, and runtime configuration. That extra control can be valuable, but it is also real operational work.',
    ],
  },
  {
    id: 'core-scaling',
    title: 'Scaling Model',
    paragraphs: [
      'Serverless platforms usually scale automatically based on incoming events or requests. This is excellent for bursty demand because idle capacity does not need to be managed explicitly by the team. It also changes how teams think about concurrency, statelessness, and the lifetime of any one execution environment.',
      'Container platforms can also scale, but the team generally has to think more explicitly about replicas, autoscaling rules, queue depth, CPU and memory requests, and rollout behavior. That can be more work, yet it also gives teams more control over how the application reacts under load.',
    ],
  },
  {
    id: 'core-cold-starts',
    title: 'Cold Starts and Latency Profile',
    paragraphs: [
      'Serverless platforms can introduce cold-start behavior when new execution environments need to be prepared. For many workloads this is acceptable or can be mitigated, but for latency-sensitive paths it can become a significant architectural concern. Teams need to understand when startup delay is acceptable and when it changes user experience materially.',
      'Containers typically offer a more predictable always-on runtime profile when services are kept running, especially for long-lived APIs. Startup time still matters for deployments and autoscaling events, but it is usually discussed differently because the platform is not constantly creating short-lived execution environments for every traffic burst.',
    ],
  },
  {
    id: 'core-cost-model',
    title: 'Cost Model',
    paragraphs: [
      'Serverless cost is often closely tied to actual request volume, execution time, and allocated resources. That can be financially attractive for spiky or low-duty-cycle workloads because you are not paying for large amounts of idle compute. However, at high and steady volume, the economics can shift and a constantly running service may become more cost-efficient elsewhere.',
      'Containers usually map more directly to provisioned compute or reserved capacity, even when autoscaling is involved. This can be more expensive for highly idle workloads, but it may be more economical for stable, high-throughput, always-on services. The cost comparison depends heavily on traffic shape, not just average traffic level.',
    ],
  },
  {
    id: 'core-runtime-control',
    title: 'Runtime Control and Customization',
    paragraphs: [
      'Serverless platforms often impose constraints around execution duration, process model, local filesystem assumptions, background work, network behavior, or supported runtime shapes. Those constraints are part of the tradeoff for operational simplicity. If the application fits them, the tradeoff is excellent. If it fights them, the platform can become frustrating quickly.',
      'Containers give teams more control over the process model, filesystem layout, OS-level dependencies, startup commands, sidecar patterns, and runtime tuning. That flexibility is one of the strongest reasons containers remain central to many platform strategies.',
    ],
  },
  {
    id: 'core-state-networking',
    title: 'State, Connections, and Networking',
    paragraphs: [
      'Serverless works best when the compute layer is treated as ephemeral and stateless, with durable state living in external services such as databases, queues, object storage, or caches. Long-lived in-memory state, sticky sessions, and connection-heavy assumptions are usually a bad fit unless the specific platform supports them well enough for the use case.',
      'Containers are usually more accommodating for long-lived processes, complex connection management, service meshes, internal networking rules, sidecars, and workloads that need closer control over network topology. They are not automatically stateful, but they are generally easier to integrate into systems with richer runtime networking assumptions.',
    ],
  },
  {
    id: 'core-portability',
    title: 'Portability and Platform Lock-In',
    paragraphs: [
      'Serverless platforms can create tighter coupling to provider-specific triggers, event formats, identity models, and deployment workflows. That lock-in is not always bad if the platform advantage is worth it, but teams should account for it honestly rather than pretending every serverless workload is easy to move unchanged.',
      'Containers often provide a stronger portability story because the deployment artifact is standardized and can run across more environments. That does not eliminate lock-in completely because networking, storage, and managed services still matter, but the compute packaging layer is generally more portable.',
    ],
  },
  {
    id: 'core-debugging',
    title: 'Observability and Debugging',
    paragraphs: [
      'Serverless changes the debugging mindset. Workloads are more ephemeral, scaling is more automatic, and local reproduction of the production environment may be less exact. Teams rely heavily on logs, traces, metrics, and event inspection rather than on shelling into a long-lived runtime environment.',
      'Containers can provide more familiar operational debugging workflows, especially when teams control the runtime fleet and can inspect image contents, rollout behavior, resource usage, and service topology more directly. That said, large container platforms can also become operationally complex enough that debugging remains difficult in different ways.',
    ],
  },
  {
    id: 'core-security',
    title: 'Security and Responsibility Boundaries',
    paragraphs: [
      'Serverless generally reduces the amount of operating system and host management the application team is responsible for, which can improve security posture by shrinking the amount of infrastructure that must be maintained directly. It also means teams depend more heavily on provider controls and service boundaries.',
      'Containers can strengthen isolation and deployment consistency, but they also make teams more responsible for image hygiene, base image updates, runtime policies, cluster hardening, secret handling, and network policy design. Security is not automatically worse, but the responsibility surface is often larger.',
    ],
  },
  {
    id: 'core-team-fit',
    title: 'Team Fit and Organizational Maturity',
    paragraphs: [
      'Serverless is often the right default for smaller teams or product teams that want to move quickly without operating a large internal platform. It is especially useful when the workload shape already matches the platform assumptions instead of constantly fighting them.',
      'Containers are often the right default when the organization has a platform engineering function, needs many workload shapes on one substrate, or values standardization across languages and service types. They reward teams that can absorb the operational sophistication required to run them well.',
    ],
  },
  {
    id: 'core-decision',
    title: 'Decision Checklist',
    paragraphs: [
      'Lean toward serverless if the workload is request-driven or event-driven, scales unevenly, benefits from usage-based billing, and does not require deep control over the runtime environment.',
      'Lean toward containers if the workload is long-lived, networking-heavy, state-adjacent, operationally customized, or part of a broader platform that standardizes around container deployment.',
      'If the application needs container packaging but not cluster management, serverless containers or managed container platforms often provide the middle ground that teams actually need.',
    ],
  },
] as const

const examples: readonly ExampleSection[] = [
  {
    id: 'examples-event',
    title: 'Event-Driven Image Processing',
    description:
      'A classic serverless fit is lightweight processing triggered by uploads or events rather than by a permanently running service.',
    snippets: [
      {
        label: 'Serverless Function Shape',
        code: `export async function handleUpload(event) {
  const image = await loadObject(event.bucket, event.key)
  const resized = await resize(image)
  await storeObject('thumbnails', event.key, resized)
}`,
      },
      {
        label: 'Why It Fits',
        code: `The workload:
- wakes up on demand
- scales with uploads
- does not need a full always-on service
- can stay stateless between invocations`,
      },
    ],
    takeaway:
      'Serverless is strong when the application is naturally event-driven and each unit of work is independent and short-lived.',
  },
  {
    id: 'examples-service',
    title: 'Long-Lived API Service',
    description:
      'A continuously running API with custom dependencies and steady traffic often maps more naturally to a containerized service.',
    snippets: [
      {
        label: 'Container Image Shape',
        code: `FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
CMD ["node", "server.js"]`,
      },
      {
        label: 'Deployment Shape',
        code: `apiVersion: apps/v1
kind: Deployment
spec:
  replicas: 3
  template:
    spec:
      containers:
        - name: api
          image: my-api:1.0.0`,
      },
    ],
    takeaway:
      'Containers fit well when the service should stay warm, expose a stable network presence, and run with explicit replica and rollout control.',
  },
  {
    id: 'examples-hybrid',
    title: 'Hybrid Platform Design',
    description:
      'Many real systems mix both models because different workload shapes benefit from different operational assumptions.',
    snippets: [
      {
        label: 'Hybrid Example',
        code: `Main API: containers
Background thumbnail jobs: serverless
Nightly report export: scheduled serverless job
Stateful search cluster: containers`,
      },
      {
        label: 'Why It Works',
        code: `Use each model where it is strongest:
- containers for long-lived and customized services
- serverless for bursty, scheduled, and event-driven work`,
      },
    ],
    takeaway:
      'The strongest architecture is often not ideological purity. It is assigning each workload to the operational model that fits it best.',
  },
  {
    id: 'examples-decision',
    title: 'Simple Selection Heuristic',
    description:
      'A short prompt helps keep the discussion tied to workload reality rather than platform branding.',
    snippets: [
      {
        label: 'Choose Serverless',
        code: `If the workload is:
- event-driven
- bursty or unpredictable
- short-lived and stateless
- better served by less ops ownership`,
      },
      {
        label: 'Choose Containers',
        code: `If the workload is:
- long-running
- operationally customized
- network-heavy or sidecar-heavy
- best served by portable packaging and runtime control`,
      },
    ],
    takeaway:
      'The real comparison is about operational boundaries and workload shape, not about which buzzword sounds more modern.',
  },
] as const

const glossaryTerms: readonly GlossaryTerm[] = [
  {
    term: 'Serverless',
    definition:
      'A cloud operating model where the platform manages more of the infrastructure, scaling, and capacity behavior for the application team.',
  },
  {
    term: 'Container',
    definition:
      'A packaged runtime unit containing an application and its dependencies so it can run consistently across environments.',
  },
  {
    term: 'Cold Start',
    definition:
      'Startup delay that occurs when a serverless platform must create or initialize a new execution environment before handling work.',
  },
  {
    term: 'Invocation',
    definition: 'A single execution of a serverless function or request-driven workload instance.',
  },
  {
    term: 'Pod',
    definition:
      'The smallest deployable compute unit in Kubernetes, which runs one or more tightly coupled containers.',
  },
  {
    term: 'Deployment',
    definition:
      'A Kubernetes resource that manages replicas and rollout behavior for stateless application Pods.',
  },
  {
    term: 'Autoscaling',
    definition: 'Automatically adjusting compute capacity based on demand or resource signals.',
  },
  {
    term: 'Image',
    definition: 'A packaged container filesystem and runtime definition used to launch containers.',
  },
  {
    term: 'Ephemeral Compute',
    definition:
      'Compute instances that are expected to be short-lived and replaceable rather than long-lived pets.',
  },
  {
    term: 'Sidecar',
    definition:
      'A supporting container that runs alongside a primary application container to provide auxiliary behavior such as logging or proxying.',
  },
  {
    term: 'Managed Container Platform',
    definition:
      'A service that runs containers for you while abstracting away some or most of the underlying cluster operations.',
  },
  {
    term: 'Stateless',
    definition:
      'A workload design where durable state is kept outside the compute instance so any instance can handle requests interchangeably.',
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

export default function ServerlessVsContainersPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Serverless vs Containers',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Serverless vs Containers"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Serverless vs Containers</h1>
      <p className="bin98-doc-subtitle">
        Manual-style comparison of operational ownership, runtime control, scaling behavior,
        portability, and cloud-platform tradeoffs.
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
