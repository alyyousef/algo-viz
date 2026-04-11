import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-compose-fits', label: 'When Compose Fits Better' },
    { id: 'bp-kubernetes-fits', label: 'When Kubernetes Fits Better' },
    { id: 'bp-tradeoffs', label: 'Tradeoffs' },
  ],
  'core-concepts': [
    { id: 'core-philosophy', label: 'Operational Philosophy' },
    { id: 'core-scope', label: 'Scope and Abstraction' },
    { id: 'core-deployments', label: 'Deployment Model' },
    { id: 'core-networking', label: 'Networking and Discovery' },
    { id: 'core-scaling', label: 'Scaling and Self-Healing' },
    { id: 'core-config', label: 'Configuration and Secrets' },
    { id: 'core-ecosystem', label: 'Tooling and Ecosystem' },
    { id: 'core-team', label: 'Team and Learning Curve' },
  ],
  examples: [
    { id: 'ex-webapp', label: 'Web App Example' },
    { id: 'ex-rollout', label: 'Rollout Example' },
    { id: 'ex-reference', label: 'Decision Reference' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

const bigPictureSections = [
  {
    title: 'Overview',
    paragraphs: [
      'Docker Compose and Kubernetes both run containerized applications, but they solve different levels of the problem. Docker Compose focuses on defining and starting multi-container applications, usually on a single machine or in straightforward development and test workflows.',
      'Kubernetes is a full orchestration platform for scheduling, networking, scaling, updating, and healing containers across a cluster of machines. It is designed for distributed systems operations rather than simple local composition.',
      'The comparison is not really â€œsmall vs largeâ€ in a vague sense. It is â€œservice composition on a hostâ€ versus â€œdeclarative cluster orchestration with operational control planes.â€ That difference affects setup cost, team skill requirements, failure handling, and day-two operations.',
    ],
  },
  {
    title: 'When Compose Fits Better',
    paragraphs: [
      'Docker Compose is often the right choice for local development, demos, CI integration tests, small internal deployments, and environments where a single machine is enough. It is easy to read, easy to start, and keeps the mental model close to the containers themselves.',
      'It is especially useful when the goal is to stand up a web app, database, cache, worker, and message broker quickly without introducing cluster infrastructure. Teams can describe the application stack in one file and run it with minimal operational ceremony.',
      'Compose also fits teams that do not need automated scheduling, self-healing, advanced rollout strategies, or large-scale service management. In those cases, adding Kubernetes can create more complexity than value.',
    ],
  },
  {
    title: 'When Kubernetes Fits Better',
    paragraphs: [
      'Kubernetes becomes attractive when applications must run across multiple nodes, survive host failures, scale horizontally, and support repeatable production operations. It is built for declarative infrastructure, reconciliation loops, and long-running service orchestration.',
      'It is a strong fit for teams managing many services, requiring automated rollouts, centralized observability integrations, namespace isolation, service discovery, and platform-level operational policy.',
      'Kubernetes is also useful when the organization wants a consistent deployment substrate across teams and environments, even though that consistency comes with substantial conceptual and tooling overhead.',
    ],
  },
  {
    title: 'Tradeoffs',
    paragraphs: [
      'Compose is simpler, faster to adopt, and easier to debug at small scale. Kubernetes is more capable, more resilient, and more operationally complete, but it asks the team to think in terms of controllers, manifests, reconciliation, and cluster behavior.',
      'Compose usually optimizes for developer convenience. Kubernetes usually optimizes for operational control at scale. That distinction matters because the right answer depends on whether the problem is primarily development workflow or production orchestration.',
      'A team should not adopt Kubernetes merely because it is popular, and it should not avoid Kubernetes merely because it is complex. The decision should be based on deployment topology, operational requirements, fault tolerance needs, and the maturity of the team running the system.',
    ],
  },
]

const conceptSections = [
  {
    id: 'core-philosophy',
    title: 'Operational Philosophy',
    paragraphs: [
      'Docker Compose is imperative in everyday usage even if the file itself is declarative. You define services, networks, volumes, and environment settings, then use Compose commands to bring the stack up and down. It is usually close to the developer workstation model.',
      'Kubernetes is deeply declarative and controller-driven. You describe the desired state of deployments, services, ingress, configuration, and storage, and the control plane continuously works to reconcile actual cluster state toward that desired state.',
      'This difference changes how teams think about operations. Compose feels like starting an application stack. Kubernetes feels like managing a persistent distributed platform.',
    ],
  },
  {
    id: 'core-scope',
    title: 'Scope and Abstraction',
    paragraphs: [
      'Compose primarily models a set of related containers on one host. It handles service definitions, startup ordering hints, port mappings, named volumes, environment variables, and simple network relationships.',
      'Kubernetes models workloads at cluster scope. Pods, Deployments, Services, StatefulSets, Jobs, ConfigMaps, Secrets, Ingress resources, and controllers all work together to describe how software should run in a distributed environment.',
      'The broader Kubernetes abstraction surface is powerful, but it also means more concepts must be understood before the platform feels predictable.',
    ],
  },
  {
    id: 'core-deployments',
    title: 'Deployment Model',
    paragraphs: [
      'In Compose, deployment is usually a direct host-level action. Containers are started on the same machine that runs the Docker engine, and lifecycle behavior is comparatively simple.',
      'In Kubernetes, deployment is scheduled onto nodes by the control plane. The unit of execution is typically the Pod, and higher-level resources manage rollout, replacement, replica counts, and update strategy.',
      'That means Kubernetes can support rolling updates, replica management, and declarative recovery in ways Compose does not attempt to provide as a core orchestration model.',
    ],
  },
  {
    id: 'core-networking',
    title: 'Networking and Discovery',
    paragraphs: [
      'Compose networking is straightforward: services on the same network can reach each other by service name, and ports can be bound to the host for external access. For local and simple environments, this is usually enough.',
      'Kubernetes networking is designed for intra-cluster communication and stable service discovery. Pods are ephemeral, so Services provide stable virtual endpoints, while Ingress or gateway patterns manage external access.',
      'The Kubernetes model is more powerful for large systems, but it introduces additional layers that teams must understand to troubleshoot traffic flow correctly.',
    ],
  },
  {
    id: 'core-scaling',
    title: 'Scaling and Self-Healing',
    paragraphs: [
      'Compose can run multiple containers and can be used with replica-like patterns in some cases, but it is not a full self-healing scheduler. If a host fails, the orchestration story is limited because the system is usually tied to that machine.',
      'Kubernetes is explicitly designed for scaling and recovery. ReplicaSets, Deployments, readiness checks, liveness probes, and rescheduling behavior let the platform replace failed workloads and distribute replicas across nodes.',
      'This is one of the clearest dividing lines: if automated healing and elastic distributed operation are real requirements, Kubernetes is solving the right category of problem.',
    ],
  },
  {
    id: 'core-config',
    title: 'Configuration and Secrets',
    paragraphs: [
      'Compose handles environment variables, mounted files, and local configuration patterns simply. That simplicity is useful when the application stack is close to the developer or a small deployment surface.',
      'Kubernetes introduces dedicated resources such as ConfigMaps and Secrets to separate runtime configuration from container images. This gives stronger management patterns for production systems, but also increases manifest sprawl and operational detail.',
      'The practical question is not whether Kubernetes has more features. It is whether your team benefits from those features enough to justify the extra configuration surface.',
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Tooling and Ecosystem',
    paragraphs: [
      'Compose fits naturally into Docker-centered workflows. It works well with local container builds, developer laptops, quick smoke tests, and straightforward CI tasks. The toolchain is smaller and easier to reason about.',
      'Kubernetes comes with a much larger ecosystem around package managers, templating, operators, service meshes, policy engines, ingress controllers, observability stacks, and GitOps workflows. That ecosystem makes enterprise operations possible, but also raises the operational bar significantly.',
      'A team should view the Kubernetes ecosystem as both a strength and a cost center. It enables powerful platform capabilities, but it can easily grow into an entire internal platform engineering effort.',
    ],
  },
  {
    id: 'core-team',
    title: 'Team and Learning Curve',
    paragraphs: [
      'Compose is approachable for developers who understand containers and basic networking. Most teams can become productive quickly because the relationship between the file and the running containers is direct.',
      'Kubernetes demands stronger operational literacy. Teams must understand scheduling, probes, services, manifests, rollout behavior, resource limits, storage, networking layers, and failure states across the cluster.',
      'This is often the deciding factor in practice. If the team lacks the time or need to operate Kubernetes well, Compose may be the more correct engineering choice even if Kubernetes is theoretically more capable.',
    ],
  },
]

const examples = {
  webapp: {
    title: 'Web App Example',
    intro:
      'A standard web application with a frontend, API, and database illustrates the difference in deployment style. Compose describes the local stack directly. Kubernetes separates the same concerns into multiple resources that support cluster operation and service discovery.',
    composeCode: `services:
  web:
    build: .
    ports:
      - "8080:8080"
    environment:
      DATABASE_URL: postgres://app:secret@db:5432/app
    depends_on:
      - db

  db:
    image: postgres:16
    environment:
      POSTGRES_DB: app
      POSTGRES_USER: app
      POSTGRES_PASSWORD: secret`,
    kubernetesCode: `apiVersion: apps/v1
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
          image: my-app:latest
          ports:
            - containerPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: web
spec:
  selector:
    app: web
  ports:
    - port: 80
      targetPort: 8080`,
    notes: [
      'Compose keeps the stack compact and local to one runtime surface.',
      'Kubernetes splits responsibilities into resources that support replication and stable cluster access.',
    ],
  },
  rollout: {
    title: 'Rollout Example',
    intro:
      'Rolling an updated application version is another sharp contrast. Compose usually means recreating or restarting containers. Kubernetes provides native rollout mechanics with desired replica counts and update strategies.',
    composeCode: `docker compose pull
docker compose up -d`,
    kubernetesCode: `kubectl set image deployment/web web=my-app:v2
kubectl rollout status deployment/web`,
    notes: [
      'Compose can refresh services quickly, but it does not provide the same orchestrated rollout semantics.',
      'Kubernetes treats rollout as a first-class operational workflow with status, history, and controller-managed replacement.',
    ],
  },
}

const decisionReference = [
  'Choose Docker Compose for local development, simple multi-container apps, demos, and small environments where one host is enough.',
  'Choose Kubernetes for cluster scheduling, self-healing, horizontal scaling, controlled rollouts, and multi-service production operations.',
  'Choose based on operational requirements, not on tool prestige.',
  'Choose the simplest system that still meets failure tolerance, deployment, and team-capability needs.',
]

const glossary = [
  {
    term: 'Orchestration',
    definition:
      'The automated management of container deployment, scheduling, networking, health, and lifecycle behavior.',
  },
  {
    term: 'Control plane',
    definition:
      'The Kubernetes components that store desired state and coordinate scheduling and reconciliation across the cluster.',
  },
  {
    term: 'Pod',
    definition:
      'The basic Kubernetes execution unit, typically containing one or more tightly coupled containers.',
  },
  {
    term: 'Deployment',
    definition:
      'A Kubernetes resource that manages replica creation, rollout strategy, and updates for stateless workloads.',
  },
  {
    term: 'Service discovery',
    definition:
      'A mechanism that lets applications find each other at stable names or addresses even when instances change.',
  },
  {
    term: 'Self-healing',
    definition:
      'Automatic replacement or rescheduling of failed workloads to restore the declared desired state.',
  },
  {
    term: 'ConfigMap',
    definition:
      'A Kubernetes resource used to store non-secret configuration data separately from container images.',
  },
  {
    term: 'Ingress',
    definition:
      'A Kubernetes pattern and resource type for managing external HTTP or HTTPS access to services.',
  },
]

export default function DockerComposeVsKubernetesPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Docker Compose vs Kubernetes',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Docker Compose vs Kubernetes"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Docker Compose vs Kubernetes</h1>
      <p>
        This page compares a lightweight multi-container application tool with a full cluster
        orchestration platform. The goal is to clarify where Docker Compose is sufficient, where
        Kubernetes is justified, and how their different operational models affect real engineering
        choices.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            {bigPictureSections[0]?.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-compose-fits" className="bin98-section">
            <h2 className="bin98-heading">When Compose Fits Better</h2>
            {bigPictureSections[1]?.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-kubernetes-fits" className="bin98-section">
            <h2 className="bin98-heading">When Kubernetes Fits Better</h2>
            {bigPictureSections[2]?.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-tradeoffs" className="bin98-section">
            <h2 className="bin98-heading">Tradeoffs</h2>
            {bigPictureSections[3]?.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p>
              The comparison includes overview, key ideas, configuration model, ecosystem,
              architecture, use cases, tradeoffs, and compare-and-contrast guidance because those
              are the dimensions that usually determine whether a team should stay simple or adopt
              full orchestration.
            </p>
          </section>
        </>
      )}

      {activeTab === 'core-concepts' && (
        <>
          {conceptSections.map((section, index) => (
            <section key={section.id} id={section.id} className="bin98-section">
              <h2 className="bin98-heading">{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {index < conceptSections.length - 1 ? <hr className="bin98-divider" /> : null}
            </section>
          ))}
        </>
      )}

      {activeTab === 'examples' && (
        <>
          <section id="ex-webapp" className="bin98-section">
            <h2 className="bin98-heading">{examples.webapp.title}</h2>
            <p>{examples.webapp.intro}</p>
            <h3 className="bin98-subheading">Docker Compose</h3>
            <div className="bin98-codebox">
              <code>{examples.webapp.composeCode}</code>
            </div>
            <h3 className="bin98-subheading">Kubernetes</h3>
            <div className="bin98-codebox">
              <code>{examples.webapp.kubernetesCode}</code>
            </div>
            <ul>
              {examples.webapp.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </section>
          <hr className="bin98-divider" />
          <section id="ex-rollout" className="bin98-section">
            <h2 className="bin98-heading">{examples.rollout.title}</h2>
            <p>{examples.rollout.intro}</p>
            <h3 className="bin98-subheading">Docker Compose</h3>
            <div className="bin98-codebox">
              <code>{examples.rollout.composeCode}</code>
            </div>
            <h3 className="bin98-subheading">Kubernetes</h3>
            <div className="bin98-codebox">
              <code>{examples.rollout.kubernetesCode}</code>
            </div>
            <ul>
              {examples.rollout.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </section>
          <hr className="bin98-divider" />
          <section id="ex-reference" className="bin98-section">
            <h2 className="bin98-heading">Decision Reference</h2>
            <p>
              Use this summary when the comparison needs to become a concrete tooling decision for
              an application team.
            </p>
            <ul>
              {decisionReference.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
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
