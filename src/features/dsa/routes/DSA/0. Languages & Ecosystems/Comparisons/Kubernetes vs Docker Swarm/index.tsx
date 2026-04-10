import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

type SectionLink = {
  id: string
  label: string
}

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
  notes: string[]
}

type GlossarySection = {
  id: string
  title: string
  terms: Array<{
    term: string
    definition: string
  }>
}

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const introParagraphs = [
  'Kubernetes and Docker Swarm both orchestrate containers across clusters of machines, but they differ dramatically in operational philosophy, ecosystem weight, and the amount of platform complexity they ask a team to absorb. Kubernetes is a broad container platform with a huge ecosystem and deep operational capabilities. Docker Swarm is a simpler orchestration model that emphasizes easier setup and a more direct path from containers to clustered services.',
  'The useful comparison is not which system has more features in the abstract. The useful comparison is whether the team needs a full platform for large-scale cloud-native operations or a lighter orchestration layer that can get clustered container workloads running with less conceptual overhead.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Kubernetes is the dominant cloud-native orchestration platform. It provides a rich control plane, declarative resource model, self-healing behavior, scheduling, service discovery, rollout management, policy integration, and a broad ecosystem of tools built around it.',
      'Docker Swarm is a simpler orchestrator integrated with Docker’s workflow and concepts. It is easier to understand quickly and often easier to stand up for straightforward clustered container deployments, but it offers a smaller ecosystem and less operational depth than Kubernetes.',
    ],
  },
  {
    id: 'bp-shared-goal',
    title: 'What They Share',
    paragraphs: [
      'Both systems solve the problem of running containers across more than one machine. Both help with scheduling, replication, service exposure, and resilience compared to manually managing individual container hosts.',
      'That overlap is real, but the operational ambition is different. Kubernetes wants to be a broad platform for cloud-native infrastructure. Swarm wants to make cluster orchestration simpler and closer to the Docker mental model.',
    ],
    bullets: [
      'Both orchestrate containerized workloads across nodes.',
      'Both provide scheduling and replication of services.',
      'Both help reduce manual host-level management.',
      'Both support service discovery and clustering concepts.',
    ],
  },
  {
    id: 'bp-when-k8s-fits',
    title: 'When Kubernetes Is Usually the Better Fit',
    paragraphs: [
      'Kubernetes is usually the better fit when the system needs platform-level capabilities, strong ecosystem integration, advanced rollout and policy controls, and a standard operational target recognized across cloud providers and infrastructure teams. It is especially compelling for large teams, multi-service platforms, and environments where cloud-native tooling matters.',
      'It is also attractive when the organization expects significant growth in operational sophistication, wants to use the broader ecosystem of controllers and operators, or needs rich deployment patterns beyond simple service replication.',
    ],
    bullets: [
      'Large multi-service or multi-team environments.',
      'Need for rich ecosystem integrations and operators.',
      'Advanced rollout, networking, policy, or platform automation needs.',
      'Cloud-native infrastructure as a strategic direction.',
    ],
  },
  {
    id: 'bp-when-swarm-fits',
    title: 'When Docker Swarm Is Usually the Better Fit',
    paragraphs: [
      'Docker Swarm is usually the better fit when the team wants straightforward container clustering without adopting the full conceptual and operational surface area of Kubernetes. It is attractive for smaller deployments, simpler internal systems, and teams that value directness over platform breadth.',
      'It is especially useful when orchestration needs are real but modest, and when the team would rather keep operational complexity low than adopt the dominant cloud-native control plane by default.',
    ],
    bullets: [
      'Smaller teams with simpler orchestration needs.',
      'Workloads where basic clustering and service replication are enough.',
      'Teams prioritizing ease of setup and lower platform complexity.',
      'Environments already closely tied to Docker-centric workflows.',
    ],
  },
  {
    id: 'bp-decision-checklist',
    title: 'Decision Checklist',
    paragraphs: [
      'The first question is not Which orchestrator is more popular. The first question is whether the organization actually needs the depth and ecosystem gravity of Kubernetes or whether a lighter orchestration model would solve the real problem more efficiently.',
    ],
    bullets: [
      'Choose Kubernetes when platform capability and ecosystem depth matter most.',
      'Choose Swarm when orchestration simplicity matters most.',
      'Choose Kubernetes when cloud-native tooling is part of the strategy.',
      'Choose Swarm when the cluster problem is real but not deeply platform-centric.',
      'Do not adopt orchestration complexity without an operational reason.',
    ],
  },
]

const coreConceptSectionsBase: ContentSection[] = [
  {
    id: 'core-operational-model',
    title: 'Operational Model',
    paragraphs: [
      'Kubernetes is a declarative control-plane system. Users define desired state in resources, and controllers work continuously to reconcile actual state toward that goal. This model is powerful because it supports self-healing and automation, but it also introduces substantial conceptual and operational surface area.',
      'Docker Swarm is operationally simpler. It feels closer to direct service orchestration over Docker hosts, with fewer major concepts to internalize. This simplicity can be a serious advantage when the workload does not justify a platform-sized control plane.',
    ],
  },
  {
    id: 'core-resource-model',
    title: 'Resource Model and Abstractions',
    paragraphs: [
      'Kubernetes exposes many first-class abstractions such as Pods, Deployments, Services, ConfigMaps, Secrets, Jobs, Ingress resources, and more. This richness enables flexible platform design, but it also means teams must learn a larger vocabulary and set of interactions.',
      'Swarm uses a smaller and more direct model around services, tasks, nodes, and networking. It does less, but that reduced surface area often makes it easier for teams to reason about from the beginning.',
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Ecosystem and Industry Gravity',
    paragraphs: [
      'Kubernetes has enormous ecosystem gravity. Observability stacks, deployment tools, service meshes, policy engines, GitOps tools, autoscaling workflows, and managed cloud offerings often assume Kubernetes as the default orchestration target.',
      'Docker Swarm has a much smaller ecosystem footprint. That does not make it unusable, but it does mean teams choosing Swarm are often consciously trading ecosystem breadth for operational simplicity.',
    ],
  },
  {
    id: 'core-complexity',
    title: 'Complexity and Learning Curve',
    paragraphs: [
      'Kubernetes is significantly more complex to learn and operate well. That complexity is often justified only when the organization needs the platform depth, multi-team abstractions, or ecosystem integrations that Kubernetes provides.',
      'Swarm is easier to grasp for teams that simply need clustered container scheduling and basic service management. Its biggest advantage is often that it does not require turning the infrastructure team into a Kubernetes platform team before getting value.',
    ],
  },
  {
    id: 'core-scaling',
    title: 'Scaling and Multi-Team Operations',
    paragraphs: [
      'Kubernetes shines when many teams, many services, and many deployment patterns need to coexist in one platform. Its operational complexity is often worthwhile in organizations large enough to amortize it across many workloads and teams.',
      'Swarm is more likely to be appropriate when the deployment surface is narrower, the team topology is smaller, and the organization is not trying to build a generalized application platform for many internal teams.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  ...coreConceptSectionsBase,
  {
    id: 'core-rollouts-resilience',
    title: 'Rollouts, Resilience, and Automation',
    paragraphs: [
      'Kubernetes provides rich capabilities around rollouts, readiness, liveness checks, autoscaling, and controller-driven recovery. These features make it attractive as a foundation for resilient application platforms and progressive delivery workflows.',
      'Swarm provides basic resilience and service replication well enough for simpler orchestration cases, but it is not usually chosen for maximum controller richness or deep platform automation.',
    ],
  },
  {
    id: 'core-networking-policy',
    title: 'Networking, Policy, and Platform Controls',
    paragraphs: [
      'Kubernetes becomes especially attractive when networking policy, ingress control, service discovery, secret management, and multi-layer operational policy matter in a standardized way across many applications. Its platform model is designed to support these concerns at scale.',
      'Swarm can support simpler networking and service exposure workflows, but it is less likely to be the right answer when the organization needs a deeply extensible policy and platform surface.',
    ],
  },
  {
    id: 'core-managed-services',
    title: 'Managed Services and Cloud Alignment',
    paragraphs: [
      'Kubernetes benefits enormously from managed offerings across major cloud providers and from the fact that much of the cloud-native ecosystem assumes Kubernetes as the deployment substrate. This reduces some operational burden, though not all of it.',
      'Swarm does not enjoy the same level of industry-standard managed service presence or ecosystem assumption, which can matter if the organization wants to align with broader cloud-native operational defaults.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs',
    paragraphs: [
      'Kubernetes often wins on capability, extensibility, ecosystem leverage, and long-term platform depth. Docker Swarm often wins on simplicity, faster conceptual adoption, and reduced operational overhead for modest cluster needs.',
      'The common mistake is to adopt Kubernetes automatically because it is the industry default even when the workload and team size do not justify the cost. The opposite mistake is to stay with a simpler orchestrator when the organization has clearly outgrown it and now needs a richer platform model.',
    ],
    bullets: [
      'Choose Kubernetes for platform depth and ecosystem leverage.',
      'Choose Swarm for simpler orchestration with lower conceptual overhead.',
      'Do not pay Kubernetes complexity tax without a reason.',
      'Do not outgrow a simple orchestrator silently while pretending the platform needs are still small.',
    ],
  },
  {
    id: 'core-architecture-guidance',
    title: 'Architecture Guidance',
    paragraphs: [
      'If the organization is building a cloud-native platform that must host many services, teams, and operational workflows, Kubernetes is usually the stronger foundation. Its complexity is often justified precisely because the platform problem is large enough.',
      'If the organization simply needs to schedule and replicate a manageable number of containerized services with minimal friction, Docker Swarm can be the more rational choice. The architecture should match the real operational problem, not the prestige of the tooling.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-k8s-platform',
    title: 'Kubernetes Platform Shape',
    description: [
      'Kubernetes tends to look like a full application platform rather than just a cluster scheduler.',
    ],
    code: `Deployment
Service
ConfigMap
Secret
Ingress
Autoscaler
Observability stack
Policy controllers`,
    notes: [
      'The richness is powerful, but it comes with operational and conceptual cost.',
      'This is the right shape when the organization needs a real platform, not just clustered containers.',
    ],
  },
  {
    id: 'examples-swarm-shape',
    title: 'Docker Swarm Shape',
    description: [
      'Docker Swarm tends to look more like direct service clustering with fewer orchestration concepts.',
    ],
    code: `manager nodes
worker nodes
services
tasks
overlay networking`,
    notes: [
      'This simpler model is often a feature, not a limitation, when the workload is straightforward.',
      'Teams can get value without adopting a large platform vocabulary.',
    ],
  },
  {
    id: 'examples-team-size',
    title: 'Team Size Example',
    description: [
      'The same technical workload can justify different orchestrators depending on organization size and platform ambition.',
    ],
    code: `Small team, few services:
Swarm may be sufficient

Large org, many teams, platform automation needs:
Kubernetes is usually more appropriate`,
    notes: [
      'This is why orchestration choice is also an organizational design decision.',
      'Scale of operations matters as much as scale of traffic.',
    ],
  },
  {
    id: 'examples-overkill',
    title: 'Avoiding the Wrong Kind of Complexity',
    description: [
      'A common failure mode is treating the most capable platform as the default answer regardless of actual need.',
    ],
    code: `Wrong question:
"What is the industry standard?"

Better question:
"What operational capabilities do we truly need now and soon?"`,
    notes: [
      'This framing prevents teams from adopting platform complexity they cannot support.',
      'It also prevents teams from underinvesting after the platform problem has become real.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-kubernetes',
    title: 'Kubernetes Terms',
    terms: [
      {
        term: 'Pod',
        definition:
          'The smallest deployable compute unit in Kubernetes, usually containing one or more tightly related containers.',
      },
      {
        term: 'Deployment',
        definition:
          'A Kubernetes resource used to manage replicated application rollout and updates.',
      },
      {
        term: 'Ingress',
        definition: 'A Kubernetes resource pattern for managing external access to services.',
      },
      {
        term: 'Controller',
        definition:
          'A Kubernetes process that reconciles actual cluster state toward desired state.',
      },
    ],
  },
  {
    id: 'glossary-swarm',
    title: 'Docker Swarm Terms',
    terms: [
      {
        term: 'Service',
        definition: 'A Swarm definition describing a replicated or global set of container tasks.',
      },
      {
        term: 'Task',
        definition: 'A running instance of a service in Docker Swarm.',
      },
      {
        term: 'Manager Node',
        definition:
          'A Swarm node responsible for cluster coordination and orchestration decisions.',
      },
      {
        term: 'Overlay Network',
        definition: 'A Docker networking feature used to connect containers across cluster nodes.',
      },
    ],
  },
  {
    id: 'glossary-shared',
    title: 'Shared Orchestration Terms',
    terms: [
      {
        term: 'Orchestrator',
        definition:
          'A system that schedules, manages, and maintains containers or services across multiple hosts.',
      },
      {
        term: 'Declarative Infrastructure',
        definition:
          'An approach where operators define desired state and the platform continuously reconciles toward it.',
      },
      {
        term: 'Self-Healing',
        definition:
          'The ability of a system to recover automatically from failed instances or drift from desired state.',
      },
      {
        term: 'Control Plane',
        definition:
          'The set of components responsible for managing and coordinating the orchestration platform.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-shared-goal', label: 'Shared Goal' },
    { id: 'bp-when-k8s-fits', label: 'When Kubernetes Fits' },
    { id: 'bp-when-swarm-fits', label: 'When Docker Swarm Fits' },
    { id: 'bp-decision-checklist', label: 'Decision Checklist' },
  ],
  'core-concepts': [
    { id: 'core-operational-model', label: 'Operational Model' },
    { id: 'core-resource-model', label: 'Resource Model and Abstractions' },
    { id: 'core-ecosystem', label: 'Ecosystem and Industry Gravity' },
    { id: 'core-complexity', label: 'Complexity and Learning Curve' },
    { id: 'core-scaling', label: 'Scaling and Multi-Team Operations' },
    { id: 'core-rollouts-resilience', label: 'Rollouts, Resilience, and Automation' },
    { id: 'core-networking-policy', label: 'Networking, Policy, and Platform Controls' },
    { id: 'core-managed-services', label: 'Managed Services and Cloud Alignment' },
    { id: 'core-tradeoffs', label: 'Tradeoffs' },
    { id: 'core-architecture-guidance', label: 'Architecture Guidance' },
  ],
  examples: [
    { id: 'examples-k8s-platform', label: 'Kubernetes Platform Shape' },
    { id: 'examples-swarm-shape', label: 'Docker Swarm Shape' },
    { id: 'examples-team-size', label: 'Team Size Example' },
    { id: 'examples-overkill', label: 'Avoiding the Wrong Complexity' },
  ],
  glossary: [
    { id: 'glossary-kubernetes', label: 'Kubernetes Terms' },
    { id: 'glossary-swarm', label: 'Docker Swarm Terms' },
    { id: 'glossary-shared', label: 'Shared Orchestration Terms' },
  ],
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="k8s-swarm-help-section">
      <h2 className="k8s-swarm-help-heading">{section.title}</h2>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {section.bullets ? (
        <ul>
          {section.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {isLast ? null : <hr className="k8s-swarm-help-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="k8s-swarm-help-section">
      <h2 className="k8s-swarm-help-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="k8s-swarm-help-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="k8s-swarm-help-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="k8s-swarm-help-section">
      <h2 className="k8s-swarm-help-heading">{section.title}</h2>
      {section.terms.map((item) => (
        <p key={item.term}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="k8s-swarm-help-divider" />}
    </section>
  )
}

export default function KubernetesVsDockerSwarmPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Kubernetes vs Docker Swarm',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Kubernetes vs Docker Swarm"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">Kubernetes vs Docker Swarm</h1>
      {introParagraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}

      {activeTab === 'big-picture'
        ? bigPictureSections.map((section, index) =>
            renderContentSection(section, index === bigPictureSections.length - 1),
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

      {activeTab === 'glossary'
        ? glossarySections.map((section, index) =>
            renderGlossarySection(section, index === glossarySections.length - 1),
          )
        : null}
    </TopicPageShell>
  )
}
