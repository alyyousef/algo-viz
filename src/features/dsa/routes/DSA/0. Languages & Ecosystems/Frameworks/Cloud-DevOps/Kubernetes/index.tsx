import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
type Section = { id: string; title: string; paragraphs: string[]; bullets?: string[] }
type Example = { id: string; title: string; description: string[]; code: string; notes: string[] }
type GlossarySection = {
  id: string
  title: string
  terms: Array<{ term: string; definition: string }>
}

const PAGE_TITLE = 'Kubernetes'
const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const introParagraphs = [
  'Kubernetes is a container orchestration platform for running, scaling, networking, updating, and operating containerized workloads across clusters of machines. It is best understood as a control plane that continuously tries to reconcile the actual cluster state with the desired state declared through its API.',
  'The key mental model is not just "a place to run containers," but "an API-driven distributed system built around declarative resources, controllers, scheduling, and reconciliation loops." You submit objects such as Deployments, Services, ConfigMaps, and Jobs, and Kubernetes controllers work continuously to make the cluster match those declarations.',
  'This page keeps the main Kubernetes ideas together: cluster architecture, Pods, Deployments, Services, config and secrets, controllers, scheduling, probes, rolling updates, jobs, ingress, storage, observability, tradeoffs, examples, and glossary terms.',
] as const

const bigPictureSections: Section[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Kubernetes became the dominant container orchestration platform because running containers at scale turns into a scheduling, networking, service discovery, rollout, and failure-recovery problem very quickly. Kubernetes provides common abstractions for those concerns instead of forcing every team to build its own deployment platform from scripts and custom glue.',
      'What makes Kubernetes distinctive is that almost everything is expressed through resources in its API. Instead of manually telling nodes when to start or stop containers, you declare the state you want and let controllers continuously reconcile the system toward that state.',
    ],
    bullets: [
      'API-driven orchestration for containerized workloads.',
      'Declarative desired state rather than imperative host management.',
      'Continuous reconciliation instead of one-time deployment steps.',
      'Strong fit for platform teams and multi-service environments.',
    ],
  },
  {
    id: 'bp-mental-model',
    title: 'Mental Model',
    paragraphs: [
      'Think of Kubernetes as a distributed control system. The API server stores cluster intent, controllers watch for changes, the scheduler assigns Pods to nodes, and kubelets on those nodes make the container runtime do the work required to run the Pods.',
      'That is why Kubernetes is more than "Docker on servers." The platform is about desired state, orchestration, health, replacement, rollout safety, networking, and service identity across many machines.',
    ],
  },
  {
    id: 'bp-where-it-fits',
    title: 'Where Kubernetes Fits Best',
    paragraphs: [
      'Kubernetes fits best when teams run many services, need repeatable deployment behavior, want self-healing and rolling updates, or need a shared platform for applications built by multiple teams. It is especially strong for microservice-heavy platforms, internal developer platforms, multi-environment service deployment, and workloads that need standardized operations.',
      'It also fits well when containers are only one part of a broader platform architecture that needs service discovery, workload isolation, batch jobs, autoscaling, config injection, and policy-driven operations.',
    ],
  },
  {
    id: 'bp-where-it-does-not-fit',
    title: 'Where Kubernetes Is Not the Best Default',
    paragraphs: [
      'Kubernetes is not automatically the right choice for every system. Small applications, low-change internal tools, and teams without operational depth may be better served by simpler platforms such as managed app runtimes, serverless platforms, or basic container hosting.',
      'It is also a poor fit when teams adopt it only because it is popular. Kubernetes introduces real operational complexity: cluster lifecycle, networking, RBAC, storage classes, observability, upgrades, cost control, and platform ownership all become ongoing concerns.',
    ],
  },
  {
    id: 'bp-workflow',
    title: 'Typical Workflow',
    paragraphs: [
      'A normal Kubernetes workflow starts with manifests or generated resources that declare workloads and their supporting objects. Those resources are applied to the API, stored in etcd, observed by controllers, and then scheduled and executed across the cluster nodes.',
      'As the system matures, teams usually add health probes, resource requests and limits, autoscaling, ingress or gateway policies, secret management, storage classes, network policies, and GitOps or CI/CD workflows around the cluster API.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Key Takeaways',
    paragraphs: [
      'Kubernetes is an API-centric reconciliation system for containers, not just a deployment tool. Pods, controllers, Services, and scheduling are the core language of the platform.',
      'Teams get the most value when they respect the platform boundary: applications should expose clear health behavior, resource expectations, and configuration contracts, while the platform layer owns orchestration, rollout safety, networking, and cluster-level operations.',
    ],
  },
]

const coreConceptSections: Section[] = [
  {
    id: 'core-architecture',
    title: 'Cluster Architecture',
    paragraphs: [
      'A Kubernetes cluster has a control plane and worker nodes. The control plane includes the API server, etcd, the scheduler, and controller managers. Worker nodes run kubelet and a container runtime, and they host the actual Pods.',
      'The API server is the front door. Most other components watch or write through the API. etcd stores cluster state. Controllers reconcile resources. The scheduler assigns unscheduled Pods to nodes based on constraints and available capacity.',
    ],
    bullets: [
      'API server is the central API surface for cluster state.',
      'etcd is the durable backing store for Kubernetes objects.',
      'Controllers drive reconciliation for higher-level resources.',
      'kubelet makes node-local reality match Pod specifications.',
    ],
  },
  {
    id: 'core-pods',
    title: 'Pods: The Smallest Deployable Unit',
    paragraphs: [
      'A Pod is the basic execution unit in Kubernetes. It groups one or more tightly coupled containers that share network identity and can share storage volumes. In practice, most application Pods contain one main container, sometimes with sidecars.',
      'Pods are intentionally disposable. You normally do not manage individual Pods directly for long-lived services. Instead, higher-level controllers such as Deployments or StatefulSets manage Pod replacement and desired replica count.',
    ],
  },
  {
    id: 'core-controllers',
    title: 'Deployments, ReplicaSets, Jobs, and Other Controllers',
    paragraphs: [
      'Kubernetes uses controllers to manage desired state over time. A Deployment manages ReplicaSets and supports rolling updates for stateless applications. A StatefulSet manages ordered, identity-preserving Pods for stateful workloads. A DaemonSet ensures one Pod per matching node. A Job runs Pods to completion and a CronJob runs Jobs on a schedule.',
      'This controller model is critical because it means operators usually declare intent at a higher level than individual containers. The controller then takes responsibility for creating, replacing, and scaling the right Pods.',
    ],
    bullets: [
      'Deployment is the common controller for stateless app rollouts.',
      'StatefulSet is for stable identity and ordered handling of stateful Pods.',
      'DaemonSet is for node-wide agents such as log shippers or CNI helpers.',
      'Job and CronJob are for finite or scheduled batch work.',
    ],
  },
  {
    id: 'core-services-networking',
    title: 'Services, Networking, and Ingress',
    paragraphs: [
      'Pods are ephemeral, so Kubernetes provides Services as stable network identities for discovering and reaching sets of Pods. A Service selects Pods, gives them a stable virtual IP, and can expose them internally or externally depending on the Service type.',
      'Ingress and newer gateway-oriented patterns handle HTTP or edge traffic routing into clusters. The key point is that workload identity and traffic routing are separated from any individual Pod instance, which is what makes safe rolling replacement practical.',
    ],
    bullets: [
      'ClusterIP is the default internal-only Service type.',
      'NodePort and LoadBalancer expose traffic more directly outside the cluster.',
      'Ingress is an HTTP routing abstraction layered over Services.',
      'Service selectors decouple stable addresses from ephemeral Pods.',
    ],
  },
  {
    id: 'core-config',
    title: 'ConfigMaps, Secrets, and Environment Injection',
    paragraphs: [
      'Kubernetes separates application configuration from container images. ConfigMaps store non-sensitive configuration data and Secrets store sensitive values such as tokens, passwords, and keys. Both can be exposed to Pods through environment variables or mounted volumes.',
      'This separation is operationally important because it lets teams rebuild configuration independently from image builds and control how runtime configuration enters the Pod. It also makes it easier to differentiate image artifacts from environment-specific data.',
    ],
  },
  {
    id: 'core-scheduling',
    title: 'Scheduling, Resources, and Placement',
    paragraphs: [
      'The scheduler decides where Pods should run. It considers available resources, constraints, affinities, taints and tolerations, topology signals, and other rules. Application reliability often depends as much on good scheduling and resource requests as on code quality.',
      'Requests tell Kubernetes what a Pod needs to reserve, while limits cap maximum resource usage. If requests are wrong, scheduling becomes misleading. If limits are wrong, workloads may be throttled or evicted unexpectedly.',
    ],
    bullets: [
      'Resource requests influence scheduling and capacity planning.',
      'Limits bound resource use but can create instability if chosen poorly.',
      'Affinity and anti-affinity shape workload placement.',
      'Taints and tolerations control which workloads may land on certain nodes.',
    ],
  },
  {
    id: 'core-health-rollouts',
    title: 'Probes, Self-Healing, and Rolling Updates',
    paragraphs: [
      'Kubernetes relies on health signals to decide whether a container is ready to receive traffic and whether it should be restarted. Liveness probes detect unhealthy containers, readiness probes determine whether traffic should be sent, and startup probes help slow-starting containers avoid premature restarts.',
      'Rolling updates let Deployments replace Pods gradually while keeping a service available. This only works well if readiness and shutdown behavior are designed correctly. Broken probes or poor termination handling can make Kubernetes appear unstable when the application contract is actually the problem.',
    ],
  },
  {
    id: 'core-storage',
    title: 'Volumes, Persistent Storage, and Stateful Workloads',
    paragraphs: [
      'Containers are ephemeral, so Kubernetes uses volumes for storage mounted into Pods. For durable storage, PersistentVolumes and PersistentVolumeClaims provide an abstraction between workloads and underlying storage systems, often mediated through storage classes.',
      'This matters because stateless and stateful workloads behave very differently under orchestration. Kubernetes can run databases and stateful systems, but doing so requires more careful attention to storage guarantees, identity, backup, and operational failure modes.',
    ],
  },
  {
    id: 'core-security',
    title: 'Namespaces, RBAC, and Isolation',
    paragraphs: [
      'Namespaces partition resources logically inside a cluster. RBAC controls who can do what through roles and bindings. In larger clusters, these are foundational to safe multi-team operation rather than optional extras.',
      'Kubernetes security is layered. It includes API permissions, admission and policy controls, image and runtime constraints, network policies, secret handling, and node-level trust boundaries. Weak defaults or weak conventions quickly become platform risk.',
    ],
  },
  {
    id: 'core-observability',
    title: 'Observability and Day-2 Operations',
    paragraphs: [
      'Running workloads is only the first step. Real Kubernetes operations include logs, metrics, events, tracing, rollout visibility, node health, upgrade procedures, and incident debugging. Many teams underestimate this day-2 layer and then blame Kubernetes for operational blind spots they never instrumented.',
      'A healthy Kubernetes platform usually standardizes metrics collection, centralized logging, dashboarding, alerting, and resource visibility so application teams are not forced to rediscover the same operational patterns service by service.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs and Comparisons',
    paragraphs: [
      'Compared with simpler container platforms, Kubernetes offers more control, extensibility, and consistency for multi-service environments, but at a higher operational cost. Compared with serverless platforms, it gives more runtime control and portability but less simplicity.',
      'The usual failure mode is not that Kubernetes cannot solve the problem. It is that the team adopts a powerful platform without investing in the platform engineering, security, and operational practices required to use it well.',
    ],
  },
]

const exampleSections: Example[] = [
  {
    id: 'ex-deployment',
    title: 'Basic Deployment',
    description: [
      'A Deployment is the standard controller for stateless applications. It declares replica count, update strategy, Pod template, and labels used by other resources such as Services.',
      'The key idea is that you declare the application state once and let the Deployment controller and ReplicaSet manage Pod replacement and rollout behavior.',
    ],
    code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
        - name: web
          image: nginx:1.27
          ports:
            - containerPort: 80`,
    notes: [
      'Deployments manage Pods indirectly through ReplicaSets.',
      'Labels and selectors are the glue connecting Deployments, Services, and other resources.',
    ],
  },
  {
    id: 'ex-service',
    title: 'Service for Stable Network Access',
    description: [
      'A Service gives a stable network identity to a changing set of Pods. This is what lets clients keep talking to a service while Deployments replace individual Pods underneath.',
      'Without Services, Pod replacement would constantly break addresses and discovery.',
    ],
    code: `apiVersion: v1
kind: Service
metadata:
  name: web
spec:
  selector:
    app: web
  ports:
    - port: 80
      targetPort: 80
  type: ClusterIP`,
    notes: [
      'The selector determines which Pods receive traffic.',
      'ClusterIP is the default internal service exposure model.',
    ],
  },
  {
    id: 'ex-config',
    title: 'ConfigMap and Secret Injection',
    description: [
      'Kubernetes separates non-sensitive configuration and sensitive values from the container image. ConfigMaps and Secrets can both be injected into Pods, commonly through environment variables or mounted files.',
      'This keeps image artifacts reusable across environments while still allowing runtime configuration differences.',
    ],
    code: `apiVersion: v1
kind: ConfigMap
metadata:
  name: web-config
data:
  LOG_LEVEL: info
---
apiVersion: v1
kind: Secret
metadata:
  name: web-secret
type: Opaque
stringData:
  API_KEY: replace-me`,
    notes: [
      'ConfigMaps are for non-sensitive configuration and Secrets are for sensitive data.',
      'The storage and handling of Secrets still depend on overall cluster security posture.',
    ],
  },
  {
    id: 'ex-probes',
    title: 'Readiness and Liveness Probes',
    description: [
      'Health probes are one of the most important contracts between the application and the platform. Kubernetes uses them to know when to restart containers and when a Pod is safe to receive traffic.',
      'Correct probes make rolling updates safer. Bad probes cause avoidable instability.',
    ],
    code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
spec:
  replicas: 2
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      containers:
        - name: api
          image: example/api:1.0.0
          readinessProbe:
            httpGet:
              path: /ready
              port: 8080
          livenessProbe:
            httpGet:
              path: /live
              port: 8080`,
    notes: [
      'Readiness controls traffic eligibility and liveness controls restart behavior.',
      'Probes should reflect real application health rather than shallow port-open checks whenever possible.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-core',
    title: 'Core Platform Terms',
    terms: [
      {
        term: 'Cluster',
        definition: 'A set of control plane and worker nodes managed as one Kubernetes system.',
      },
      {
        term: 'API server',
        definition: 'The central API endpoint for reading and writing Kubernetes resources.',
      },
      {
        term: 'etcd',
        definition: 'The backing key-value store that persists Kubernetes object state.',
      },
      {
        term: 'Scheduler',
        definition: 'The control plane component that assigns unscheduled Pods to nodes.',
      },
      {
        term: 'kubelet',
        definition:
          'The node agent that ensures Pods scheduled to the node are running as specified.',
      },
      {
        term: 'Controller',
        definition:
          'A reconciliation loop that watches resources and drives actual state toward desired state.',
      },
    ],
  },
  {
    id: 'glossary-workloads',
    title: 'Workload Terms',
    terms: [
      {
        term: 'Pod',
        definition:
          'The smallest deployable Kubernetes unit, containing one or more tightly coupled containers.',
      },
      {
        term: 'Deployment',
        definition:
          'A controller that manages ReplicaSets and rolling updates for stateless workloads.',
      },
      {
        term: 'StatefulSet',
        definition:
          'A controller for workloads that need stable identity and ordered lifecycle behavior.',
      },
      { term: 'DaemonSet', definition: 'A controller that runs one Pod on each matching node.' },
      { term: 'Job', definition: 'A controller for Pods that run to completion.' },
      {
        term: 'CronJob',
        definition: 'A scheduled controller that creates Jobs on a recurring timetable.',
      },
    ],
  },
  {
    id: 'glossary-networking',
    title: 'Networking and Operations Terms',
    terms: [
      {
        term: 'Service',
        definition: 'A stable network identity that routes traffic to a selected set of Pods.',
      },
      {
        term: 'Ingress',
        definition: 'An HTTP routing abstraction for external access into cluster Services.',
      },
      {
        term: 'ConfigMap',
        definition: 'A resource for storing non-sensitive configuration data for workloads.',
      },
      {
        term: 'Secret',
        definition: 'A resource for storing sensitive values such as tokens, passwords, or keys.',
      },
      {
        term: 'Readiness probe',
        definition: 'A health check that determines whether a Pod should receive traffic.',
      },
      {
        term: 'Liveness probe',
        definition: 'A health check that determines whether a container should be restarted.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': bigPictureSections.map((section) => ({ id: section.id, label: section.title })),
  'core-concepts': coreConceptSections.map((section) => ({ id: section.id, label: section.title })),
  examples: exampleSections.map((section) => ({ id: section.id, label: section.title })),
  glossary: glossarySections.map((section) => ({ id: section.id, label: section.title })),
}

function renderSection(section: Section, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="kubernetes-help98-section">
      <h2 className="kubernetes-help98-heading">{section.title}</h2>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {section.bullets ? (
        <ul>
          {section.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      ) : null}
      {!isLast ? <hr className="kubernetes-help98-divider" /> : null}
    </section>
  )
}

function renderExample(section: Example, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="kubernetes-help98-section">
      <h2 className="kubernetes-help98-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="kubernetes-help98-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {!isLast ? <hr className="kubernetes-help98-divider" /> : null}
    </section>
  )
}

function renderGlossary(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="kubernetes-help98-section">
      <h2 className="kubernetes-help98-heading">{section.title}</h2>
      <dl className="kubernetes-help98-glossary">
        {section.terms.map((item) => (
          <div key={item.term}>
            <dt>{item.term}</dt>
            <dd>{item.definition}</dd>
          </div>
        ))}
      </dl>
      {!isLast ? <hr className="kubernetes-help98-divider" /> : null}
    </section>
  )
}

export default function KubernetesPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Kubernetes Page',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Kubernetes Page"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">{PAGE_TITLE}</h1>
      {introParagraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <hr className="bin98-divider" />

      {activeTab === 'big-picture'
        ? bigPictureSections.map((section, index) =>
            renderSection(section, index === bigPictureSections.length - 1),
          )
        : null}
      {activeTab === 'core-concepts'
        ? coreConceptSections.map((section, index) =>
            renderSection(section, index === coreConceptSections.length - 1),
          )
        : null}
      {activeTab === 'examples'
        ? exampleSections.map((section, index) =>
            renderExample(section, index === exampleSections.length - 1),
          )
        : null}
      {activeTab === 'glossary'
        ? glossarySections.map((section, index) =>
            renderGlossary(section, index === glossarySections.length - 1),
          )
        : null}
    </TopicPageShell>
  )
}
