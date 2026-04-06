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

const pageTitle = 'Azure AKS'
const pageSubtitle = 'Managed Kubernetes on Azure for production clusters, platform teams, and cloud-native workloads.'

const introParagraphs = [
  "Azure Kubernetes Service, usually shortened to AKS, is Microsoft's managed Kubernetes offering on Azure. AKS runs the Kubernetes control plane as a managed Azure service and lets you focus most of your operational effort on node pools, networking, storage, identity, security, workloads, and release processes rather than on bootstrapping and babysitting control-plane VMs yourself.",
  'The engineering value of AKS is not just that it runs containers. The real value is managed cluster lifecycle, Azure-native identity integration, Azure networking and storage integrations, autoscaling, policy and governance hooks, observability options, and a supported path for running Kubernetes in environments where enterprise controls and cloud infrastructure matter as much as raw orchestration features.',
  'This page treats AKS as a systems-design and platform-engineering topic: cluster architecture, system and user node pools, Azure CNI and overlay networking, private clusters, ingress and load balancing, storage through CSI, Workload Identity, autoscaling, upgrades, security boundaries, cost, and the operational tradeoffs that usually decide whether AKS is the right platform choice.',
]

const bigPictureSections: Array<{ title: string; paragraphs: string[] }> = [
  {
    title: 'What it is',
    paragraphs: [
      'AKS is a managed Kubernetes service. Microsoft operates the Kubernetes control plane, API server, scheduler, and etcd as a managed Azure resource, while your workloads run on worker nodes in node pools inside your Azure subscription. In practice, that means you still own cluster design and workload reliability, but you do not build the control plane from scratch.',
      'That split matters. AKS is not serverless magic and it is not just a set of virtual machines either. You still design virtual networks, outbound connectivity, node sizing, pod scheduling, storage classes, RBAC, secrets, upgrades, and incident response. AKS reduces undifferentiated control-plane operations; it does not eliminate platform engineering responsibilities.',
    ],
  },
  {
    title: 'Why teams use it',
    paragraphs: [
      'Teams adopt AKS when they want Kubernetes with strong Azure integration: Microsoft Entra identity, Azure networking, Azure Monitor, Azure Policy, Azure Key Vault, Azure Disk and Azure Files CSI drivers, private connectivity, and the surrounding enterprise tooling that many Azure-first organizations already standardize on.',
      'It is also attractive when platform teams want a common substrate for multiple services, a path for Linux and Windows containers in one managed platform, or a consistent deployment target for microservices, internal platforms, batch jobs, event-driven workers, APIs, and stateful systems that still benefit from Kubernetes primitives.',
    ],
  },
  {
    title: 'How to think about it',
    paragraphs: [
      'Think of AKS as managed Kubernetes plus Azure infrastructure design. The cluster object is only one piece. The real design includes node pools, subnets, ingress, private endpoints, managed identities, storage back ends, upgrade policy, autoscaling policy, and guardrails. If those pieces are unclear, the cluster is not truly designed yet.',
      'A healthy mental model is to separate cluster platform concerns from application concerns. AKS should provide a predictable, secure, scalable substrate. Applications should consume namespaces, identities, policies, ingress, storage, and observability features from that substrate instead of each team improvising infrastructure conventions independently.',
    ],
  },
  {
    title: 'Where it fits',
    paragraphs: [
      'AKS fits when you need Kubernetes semantics and are already committed to Azure networking, identity, governance, or adjacent services. It is strong for teams that need multiple workloads on a shared platform, want declarative deployment and policy, or need a managed Kubernetes control plane instead of running upstream Kubernetes manually on Azure virtual machines.',
      'It is a weaker fit when the workload is simple enough for App Service, Azure Container Apps, Azure Functions, or a small VM deployment, or when the team wants container deployment but does not want Kubernetes complexity. Kubernetes remains operationally demanding even when the control plane is managed.',
    ],
  },
  {
    title: 'What changed in the platform recently',
    paragraphs: [
      "AKS has continued moving toward more managed defaults and away from older networking and identity models. Azure CNI Overlay is a major networking path for new clusters, Microsoft Entra Workload ID is the recommended identity model for pods, and AKS Automatic and node auto-provisioning reflect Microsoft's push toward more opinionated cluster operations.",
      'The current documentation also includes important lifecycle notes. kubenet networking is scheduled to stop being supported on March 31, 2028. Basic Load Balancer is no longer supported for AKS as of September 30, 2025. Azure Linux 2.0 stopped receiving support and security updates on November 30, 2025, and the documentation states its node images are removed starting March 31, 2026. Those dates matter if you are modernizing an older cluster fleet.',
    ],
  },
]

const clusterModelGuide = [
  {
    title: 'Managed control plane',
    detail:
      'AKS manages the Kubernetes control plane as an Azure service. You do not patch or back up control-plane VMs directly. Your design work shifts to how the cluster is exposed, how nodes are organized, and how applications and operators access the API server safely.',
  },
  {
    title: 'System and user node pools',
    detail:
      'AKS requires at least one system node pool, which hosts critical cluster add-ons such as CoreDNS and metrics-server. User node pools host application workloads. Treat that separation as an operational boundary, not just as a naming convention.',
  },
  {
    title: 'VM scale set based nodes',
    detail:
      'AKS node pools are implemented on Azure Virtual Machine Scale Sets. That makes Azure infrastructure behavior, zone placement, image lifecycle, VM size choices, and scale-set constraints part of Kubernetes capacity planning.',
  },
  {
    title: 'Managed versus more opinionated modes',
    detail:
      'Standard AKS gives you broad control over node pools and cluster options. AKS Automatic is a newer, more opinionated mode that manages more of the node and platform behavior for you. It is useful to know about, but it is not just the same product with a new checkbox.',
  },
]

const fitGuide = [
  {
    title: 'Need Kubernetes plus Azure-native identity, networking, governance, and storage',
    choice: 'AKS is a strong fit.',
  },
  {
    title: 'Need a platform for many services, teams, or environments with shared controls',
    choice: 'AKS can work well if you invest in platform standards and cluster operations.',
  },
  {
    title: 'Need a very simple container hosting option with less operational overhead',
    choice: 'Azure Container Apps or App Service may be better than AKS.',
  },
  {
    title: 'Need deep Kubernetes control but want Azure to manage the control plane',
    choice: 'AKS is the natural Azure-managed option.',
  },
  {
    title: 'Need workloads isolated by stronger blast-radius boundaries than namespaces alone',
    choice: 'Use multiple clusters, subscriptions, VNets, or landing zones where appropriate instead of forcing everything into one shared cluster.',
  },
  {
    title: 'Need Linux and Windows containers in one managed Kubernetes platform',
    choice: 'AKS supports mixed operating systems through separate node pools, with the usual Kubernetes scheduling constraints.',
  },
]

const keyTakeaways = [
  'AKS is managed Kubernetes, not no-ops Kubernetes.',
  'The real design is node pools, networking, identity, ingress, storage, upgrades, and governance, not just cluster creation.',
  'System node pools should stay boring and stable; application diversity belongs in user node pools.',
  'Azure CNI Overlay, Workload Identity, CSI drivers, and private-cluster patterns are now central AKS design topics.',
  'Most AKS production problems come from poor platform boundaries, weak upgrade discipline, or networking and identity choices that were never made explicitly.',
]
const coreConceptSections: NarrativeSection[] = [
  {
    id: 'core-architecture',
    heading: 'Cluster Architecture and Responsibility Split',
    paragraphs: [
      'An AKS cluster consists of a Microsoft-managed control plane and one or more node pools that run in your Azure subscription. The control plane handles Kubernetes orchestration functions. The node pools are Azure compute resources that you size, scale, upgrade, secure, and connect to the rest of your environment.',
      'This responsibility split is the first architectural decision to understand. Microsoft is responsible for the managed control plane service. You are responsible for how your workloads consume the platform and for most of the operational decisions that determine whether the cluster is secure, reliable, and economical.',
      'A common mistake is assuming a managed control plane means cluster operations are mostly solved. In reality, the hard parts often move to identity, network topology, ingress, egress, node image lifecycle, storage classes, and workload isolation.',
    ],
  },
  {
    id: 'core-node-pools',
    heading: 'System Node Pools, User Node Pools, and Workload Placement',
    paragraphs: [
      'AKS requires at least one system node pool. System node pools host critical cluster add-ons and should remain stable, conservative, and less noisy than application pools. User node pools are where application teams usually land workloads with different VM sizes, taints, operating systems, availability-zone layouts, and scaling behavior.',
      'This separation matters operationally. If every workload lands on the system pool, system components compete with application demand and cluster stability degrades. If every workload gets its own cluster before a real reason exists, platform sprawl grows unnecessarily. Node pool design is one of the main places where AKS platform maturity shows up.',
      'Use taints, tolerations, node selectors, affinity, and labels deliberately. They are not decoration. They are the mechanisms that turn a general cluster into a predictable placement system for stateless services, batch jobs, GPU pools, Spot workloads, Windows nodes, or regulated workloads with specific infrastructure needs.',
    ],
  },
  {
    id: 'core-networking',
    heading: 'Networking Models: Azure CNI, Overlay, and the End of kubenet',
    paragraphs: [
      'AKS networking choices affect pod IP allocation, subnet planning, east-west traffic, network policy, and how painful cluster growth will become. Azure CNI gives pods routable IP behavior integrated with Azure networking. Azure CNI Overlay keeps Azure networking integration while allocating pod addresses from an overlay address space, which simplifies IP planning for many clusters.',
      'Microsoft documentation now makes lifecycle direction clear: kubenet is on a retirement path, with AKS support ending on March 31, 2028. That means new platform designs should not treat kubenet as a future-proof default, and older clusters need migration plans rather than indefinite postponement.',
      'Networking decisions in AKS are not easy to undo later. Choose with future scale, subnet exhaustion risk, private connectivity, network policy engine support, and your Azure landing zone standards in mind. If the networking model was picked because it was the oldest blog post someone found, that will eventually cost you.',
    ],
  },
  {
    id: 'core-ingress',
    heading: 'Ingress, Load Balancing, and North-South Traffic',
    paragraphs: [
      'AKS can expose services through Kubernetes Service objects of type LoadBalancer, ingress controllers, or more structured gateway patterns. The right design depends on whether you need basic L4 exposure, centralized L7 routing, private internal entry points, DNS integration, TLS management, or a path toward Gateway API.',
      "Microsoft's application routing add-on provides managed NGINX ingress integration with Azure DNS and Key Vault-backed certificate flows, but the current documentation also notes the upstream Ingress NGINX project retirement path and positions Gateway API as the long-term direction. That does not mean ingress is unusable today. It means teams should avoid treating current ingress choices as timeless.",
      'Another lifecycle point matters here: Basic Load Balancer is no longer supported for AKS as of September 30, 2025. Production designs should assume Standard Load Balancer class behavior and related security and networking expectations.',
    ],
  },
  {
    id: 'core-storage',
    heading: 'Persistent Storage, CSI Drivers, and Stateful Workloads',
    paragraphs: [
      'AKS supports persistent storage through CSI drivers. Azure Disk is the standard choice for block storage and usually fits single-node attached stateful workloads. Azure Files provides shared file semantics for workloads that need multi-node access. CSI is the modern storage integration model and the one new designs should assume.',
      'Microsoft documentation notes that the old in-tree Azure Disk and Azure File volume types are deprecated from Kubernetes 1.26 onward and should be replaced with CSI-based storage classes. This is not a cosmetic migration. It affects long-term supportability and access to newer storage features.',
      'Stateful workload design in AKS still requires discipline. Availability zone behavior, disk attachment constraints, backup strategy, failover, restore speed, and application-level replication remain your problem. AKS can schedule the pod and provision the volume; it does not automatically solve database architecture.',
    ],
  },
  {
    id: 'core-identity',
    heading: 'Identity, RBAC, Managed Identities, and Workload Identity',
    paragraphs: [
      'Identity in AKS spans several layers: Azure identities for the cluster and infrastructure actions, Kubernetes identities and RBAC for in-cluster permissions, and workload identities for application access to Azure services. Confusing these layers is a common source of over-privilege and hard-to-debug access failures.',
      'The current AKS direction is Microsoft Entra Workload ID. It uses the cluster OIDC issuer and federated identity credentials so pods can exchange Kubernetes-issued tokens for Microsoft Entra tokens without storing long-lived cloud credentials in secrets. This is the modern replacement path for older pod-managed identity approaches.',
      'That shift matters because older pod-managed identity patterns are effectively on borrowed time. Microsoft documents the managed add-on as patched and supported through September 2025 to give time for migration to Workload ID. New AKS designs should treat Workload Identity as the default identity story for workloads that need Azure resource access.',
    ],
  },
  {
    id: 'core-security',
    heading: 'Security Boundaries, API Exposure, Policy, and Secrets',
    paragraphs: [
      'AKS security is layered. You decide whether the API server is public, public with authorized IP ranges, private, or integrated more tightly with private network access models. You configure Kubernetes RBAC or Azure RBAC, admission and policy controls, image and supply-chain practices, network policy, secret handling, and workload isolation boundaries.',
      'Private clusters reduce exposure of the Kubernetes API server by using private endpoints and private connectivity. Authorized IP ranges help constrain public API access when a cluster is not private. These are design choices, not toggles to apply casually after a breach review.',
      'Security also means refusing to overload one cluster with incompatible trust boundaries. Namespaces, RBAC, and network policy help, but they are not a substitute for separate clusters when blast radius, tenant isolation, regulatory boundaries, or platform ownership lines truly differ.',
    ],
  },
  {
    id: 'core-scaling',
    heading: 'Scaling, Autoscaling, Availability Zones, and Node Auto-Provisioning',
    paragraphs: [
      'AKS scaling has several layers. Horizontal Pod Autoscaler scales replicas. Cluster Autoscaler adjusts node counts in node pools. Node auto-provisioning and AKS Automatic go further by managing or creating node capacity with more automation. These features solve different problems and should not be treated as interchangeable.',
      'Availability-zone design interacts with autoscaling in important ways. Microsoft recommends one node pool per zone when using Cluster Autoscaler with zone-sensitive scheduling behavior, and recommends enabling balance-similar-node-groups to maintain more even scale behavior across zones. This is one of those details teams learn after an outage if they do not read the docs first.',
      'Automation does not eliminate capacity engineering. You still need sane min and max ranges, quota planning, PodDisruptionBudget awareness, Spot eviction strategy, storage topology awareness, and an understanding of what happens when scale-up fails because a zone or VM family is constrained.',
    ],
  },
  {
    id: 'core-upgrades',
    heading: 'Version Support, Node Images, Upgrades, and Maintenance Windows',
    paragraphs: [
      'AKS lifecycle management is a core platform responsibility. You manage Kubernetes version currency, node image currency, API deprecations, and maintenance timing. The cluster being managed does not remove the need for disciplined upgrade planning.',
      'AKS supports cluster auto-upgrade channels, node OS auto-upgrade channels, and planned maintenance windows. Those features are useful, but they are not permission to ignore release notes. Kubernetes API changes, addon compatibility, workload disruption risk, and version skew policies still need deliberate review before production rollouts.',
      'The documentation currently highlights several concrete lifecycle risks: beta APIs are disabled by default when upgrading to Kubernetes 1.30 and 1.27 LTS, Azure Linux 2.0 support ended on November 30, 2025, and its node images are scheduled for removal beginning March 31, 2026. If a fleet has old pools, upgrades become emergency work instead of planned work very quickly.',
    ],
  },
  {
    id: 'core-observability',
    heading: 'Monitoring, Logging, and Operational Visibility',
    paragraphs: [
      'AKS observability is broader than kubectl logs. Production clusters need node metrics, pod metrics, cluster events, control-plane signals, ingress metrics, storage behavior, and correlations into application telemetry. Azure Monitor, Container Insights, managed Prometheus, and Grafana are part of the standard AKS observability story.',
      'Good observability design starts with questions: can you explain unschedulable pods, slow rollouts, image pull failures, node pressure, DNS failures, storage attachment delays, and ingress saturation within minutes. If the answer is no, then the cluster is not observably ready, even if dashboards exist.',
      'Observability must also be scoped well. High-cardinality metric explosions, noisy log pipelines, and unclear label conventions can make Kubernetes telemetry expensive and unusable at the same time. A platform team should standardize what gets emitted and how it is correlated.',
    ],
  },
  {
    id: 'core-windows',
    heading: 'Linux and Windows Node Pools',
    paragraphs: [
      'AKS supports both Linux and Windows workloads through separate node pools. That makes AKS relevant in organizations that still run .NET Framework or Windows-based containers alongside Linux-native services, but it also means scheduling and base-image strategy need more care than in a Linux-only cluster.',
      'Mixed-OS clusters require deliberate workload placement and usually clearer platform contracts. Windows nodes are not just larger Linux nodes with a different image. Networking, daemon support, image maintenance, and operational conventions differ enough that teams should not add Windows support casually.',
      'If only a few workloads require Windows, isolate them carefully in dedicated node pools with explicit selectors and taints. Do not let accidental scheduling determine platform reliability.',
    ],
  },
  {
    id: 'core-private',
    heading: 'Private Clusters, API Server Access, and Network Topology',
    paragraphs: [
      'AKS lets you run private clusters where the API server is exposed through private networking rather than as a broadly reachable public endpoint. This is often the right choice for enterprise environments that already use private VNets, hub-spoke connectivity, bastions, private DNS, and egress controls.',
      'Public clusters can still be hardened through authorized IP ranges, but those ranges only apply to the public API server and are not used with private clusters. The security model is therefore different, and the surrounding access tooling for operators and CI systems must be designed accordingly.',
      'Topology choices here affect day-two operations as much as day-one security. If developers, CI agents, GitOps controllers, and incident responders cannot reliably reach the API server through the chosen connectivity model, the cluster will become operationally brittle.',
    ],
  },
  {
    id: 'core-governance',
    heading: 'Governance, Azure Policy, and Multitenancy',
    paragraphs: [
      'AKS integrates with Azure Policy and broader Azure governance practices. That makes it possible to enforce cluster standards, audit configuration drift, and push platform guardrails closer to the teams using the cluster. This is one of the reasons AKS is attractive in regulated or enterprise-heavy environments.',
      'Multitenancy in AKS should be approached carefully. Namespaces, resource quotas, network policy, workload identity, and RBAC are useful isolation tools, but they do not erase blast radius. A multi-tenant cluster is a product, and if the platform team cannot clearly define tenancy boundaries and support expectations, it should probably not be one cluster.',
      'Governance also includes cost discipline, quota management, naming conventions, and fleet hygiene. A cluster without those standards usually becomes hard to upgrade, hard to audit, and hard to explain.',
    ],
  },
  {
    id: 'core-cost',
    heading: 'Cost Model and Cost Discipline',
    paragraphs: [
      'AKS cost is not just one line item. It includes node pools, load balancers, disks, egress, public IPs, NAT or firewall design, observability pipelines, backup tooling, and operational labor. Some AKS pricing characteristics are favorable compared to self-managed clusters, but a wasteful cluster design still burns money quickly.',
      'The easiest ways to overspend are oversized system pools, too many tiny clusters, poor namespace density, forgotten public load balancers, overly chatty monitoring, idle development environments, and node pools that scale for the worst case but never scale down. Cluster shape matters more than marketing language about managed services.',
      'Cost optimization in AKS is usually about better boundaries and automation rather than just smaller VMs. Right-size node pools, use autoscaling carefully, isolate bursty or Spot-friendly workloads appropriately, and keep platform add-ons and observability choices under review.',
    ],
  },
  {
    id: 'core-anti-patterns',
    heading: 'Where AKS Is the Wrong Tool',
    paragraphs: [
      'AKS is the wrong tool when the organization wants Kubernetes only because it sounds standard, but does not have the appetite for cluster operations, platform ownership, or workload engineering discipline. A managed control plane will not compensate for a team that is fundamentally not ready to run Kubernetes.',
      'It is also the wrong choice for very simple container hosting needs where Azure Container Apps, App Service, or even a small virtual machine deployment would be easier to secure and operate. Kubernetes complexity must be justified by actual workload or platform needs.',
      'Another anti-pattern is using AKS as a generic dumping ground for every containerized system regardless of trust boundary, lifecycle, or operational profile. Not every workload should live in the same cluster merely because it can.',
    ],
  },
]

const designPatterns = [
  {
    title: 'Keep system node pools small, stable, and separate',
    detail:
      'Use system pools for cluster add-ons and reserve user pools for application variety. That separation reduces noisy-neighbor risk and makes upgrades and capacity planning easier to reason about.',
  },
  {
    title: 'Prefer Workload Identity over secret-based cloud credentials',
    detail:
      'Use Microsoft Entra Workload ID for pods that need Azure resource access. Avoid distributing long-lived credentials through Kubernetes secrets whenever possible.',
  },
  {
    title: 'Choose Azure CNI Overlay deliberately for modern IP planning',
    detail:
      "Overlay often reduces subnet pressure and is aligned with current AKS direction. Pick networking based on future scale and policy needs, not just on yesterday's default examples.",
  },
  {
    title: 'Use one node pool per zone for zone-sensitive autoscaling scenarios',
    detail:
      'This aligns with Microsoft guidance for better Cluster Autoscaler behavior when strict topology and availability-zone placement actually matter.',
  },
  {
    title: 'Adopt CSI storage and plan stateful boundaries carefully',
    detail:
      'Use CSI drivers as the normal storage path and keep stateful systems explicit about attachment, failover, and backup behavior rather than assuming Kubernetes abstracts those away.',
  },
  {
    title: 'Treat upgrades as a product capability, not a quarterly surprise',
    detail:
      'Build maintenance windows, staging clusters, rollout plans, API deprecation checks, and node-image hygiene into the platform lifecycle from the start.',
  },
]
const operationalChecklist = [
  'Separate system and user node pools, and use labels, taints, and selectors intentionally.',
  'Choose the networking model with future subnet growth, private access, and policy support in mind.',
  'Use private clusters or authorized IP ranges for API-server exposure based on your security model.',
  'Use Microsoft Entra integration, least privilege RBAC, and Workload Identity for Azure resource access.',
  'Standardize ingress, DNS, certificate, and north-south traffic patterns instead of letting each team invent its own.',
  'Use CSI storage classes and verify zone behavior, restore procedures, and stateful workload design explicitly.',
  'Define cluster and node OS upgrade policies, maintenance windows, and preproduction validation paths.',
  'Monitor nodes, pods, ingress, events, autoscaling, and cost signals with clear team ownership.',
  'Review support deadlines such as kubenet retirement and Azure Linux image lifecycle before they become emergency work.',
  'Use multiple clusters when trust boundaries, failure domains, or team ownership lines justify them.',
]

const pitfalls = [
  'Putting critical applications on the system node pool because it exists by default.',
  'Choosing a networking model without planning for pod IP growth, private connectivity, or retirement timelines.',
  'Relying on old pod-managed identity guidance instead of moving to Microsoft Entra Workload ID.',
  'Using namespaces as the only isolation boundary for workloads that really need separate clusters or subscriptions.',
  'Treating Cluster Autoscaler as zone-aware without designing node pools accordingly.',
  'Ignoring node image lifecycle and OS support dates until scale-out or upgrades start failing.',
  'Using public API exposure with weak access restrictions because private access feels inconvenient.',
  'Running stateful workloads without understanding disk topology, restore paths, or zone constraints.',
  'Letting every team install its own ingress stack, monitoring stack, and secret pattern in the same cluster.',
  'Assuming AKS cost is only node hours while forgetting load balancers, storage, logs, egress, and idle environments.',
]

const compareNotes = [
  {
    title: 'AKS vs self-managed Kubernetes on Azure VMs',
    detail:
      'AKS removes most direct control-plane management and provides supported Azure integrations. Self-managed Kubernetes gives maximum control but requires much more operational effort and ownership for upgrades, HA, and lifecycle work.',
  },
  {
    title: 'AKS vs Azure Container Apps',
    detail:
      'Container Apps aims to reduce Kubernetes operational surface for many app teams. AKS is better when you need deeper Kubernetes control, custom operators, varied node pools, or a platform team operating clusters as a product.',
  },
  {
    title: 'AKS vs App Service',
    detail:
      'App Service is simpler for straightforward web applications. AKS is more flexible and more complex, and it should be chosen because that extra control is actually needed.',
  },
  {
    title: 'AKS vs Amazon EKS',
    detail:
      'Both are managed Kubernetes services. AKS is tightly integrated with Azure networking, Microsoft Entra identity, and Azure governance. EKS is tightly integrated with AWS networking, IAM, and surrounding AWS services. The core Kubernetes patterns are similar; the platform integrations differ substantially.',
  },
]

const examples: ExampleSection[] = [
  {
    id: 'ex-create-cluster',
    title: 'Create a basic AKS cluster with Azure CNI Overlay',
    code: `az aks create \\
  --resource-group rg-platform-prod \\
  --name aks-core-prod \\
  --node-count 3 \\
  --network-plugin azure \\
  --network-plugin-mode overlay \\
  --generate-ssh-keys`,
    explanation:
      'This shows the modern Azure CNI Overlay direction for a new cluster. Real production builds usually add private networking, workload identity, monitoring, autoscaling, zone layout, policy, and upgrade settings at creation time.',
  },
  {
    id: 'ex-node-pool',
    title: 'Add a user node pool for application workloads',
    code: `az aks nodepool add \\
  --resource-group rg-platform-prod \\
  --cluster-name aks-core-prod \\
  --name userapps \\
  --mode User \\
  --node-count 3 \\
  --node-vm-size Standard_D4ds_v5`,
    explanation:
      'This separates application capacity from the required system pool. In practice you would often add labels, taints, autoscaler settings, zones, and possibly a different OS or Spot policy depending on workload type.',
  },
  {
    id: 'ex-workload-identity',
    title: 'Service account annotation for Microsoft Entra Workload ID',
    code: `apiVersion: v1
kind: ServiceAccount
metadata:
  name: orders-api
  namespace: payments
  annotations:
    azure.workload.identity/client-id: "<managed-identity-client-id>"
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: orders-api
spec:
  template:
    metadata:
      labels:
        azure.workload.identity/use: "true"
    spec:
      serviceAccountName: orders-api`,
    explanation:
      'This is the core pattern for giving a workload Azure resource access without storing static credentials in Kubernetes secrets. The cluster must have workload identity enabled and the managed identity must trust the cluster OIDC issuer through a federated credential.',
  },
  {
    id: 'ex-zone-pools',
    title: 'Use one node pool per availability zone for clearer autoscaling behavior',
    code: `az aks nodepool add --resource-group rg-platform-prod --cluster-name aks-core-prod --name appz1 --zones 1 --enable-cluster-autoscaler --min-count 1 --max-count 10
az aks nodepool add --resource-group rg-platform-prod --cluster-name aks-core-prod --name appz2 --zones 2 --enable-cluster-autoscaler --min-count 1 --max-count 10
az aks nodepool add --resource-group rg-platform-prod --cluster-name aks-core-prod --name appz3 --zones 3 --enable-cluster-autoscaler --min-count 1 --max-count 10`,
    explanation:
      'This follows Microsoft guidance for zone-sensitive cluster-autoscaler scenarios. It gives more explicit scaling control than a single multi-zone pool when workloads have strict topology expectations.',
  },
  {
    id: 'ex-private-api',
    title: 'Constrain public API exposure with authorized IP ranges',
    code: `az aks create \\
  --resource-group rg-platform-prod \\
  --name aks-admin \\
  --api-server-authorized-ip-ranges 203.0.113.10/32,198.51.100.0/24`,
    explanation:
      'This is useful when you are not using a private cluster but still want to lock down API-server access. It is not a substitute for full private-cluster design when private connectivity is a hard requirement.',
  },
  {
    id: 'ex-storage',
    title: 'Use a CSI-backed storage class instead of deprecated in-tree drivers',
    code: `apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: managed-csi-premium
provisioner: disk.csi.azure.com
parameters:
  skuName: Premium_LRS
reclaimPolicy: Delete
volumeBindingMode: WaitForFirstConsumer`,
    explanation:
      'The point is not the exact YAML values. The important point is to use CSI-based provisioners such as disk.csi.azure.com or file.csi.azure.com for modern AKS storage instead of older in-tree drivers.',
  },
]

const glossaryTerms = [
  {
    term: 'AKS',
    definition: "Azure Kubernetes Service, Microsoft's managed Kubernetes offering on Azure.",
  },
  {
    term: 'Control plane',
    definition: 'The managed Kubernetes management components such as the API server, scheduler, and etcd.',
  },
  {
    term: 'System node pool',
    definition: 'The required AKS node pool mode that hosts critical cluster add-ons and system workloads.',
  },
  {
    term: 'User node pool',
    definition: 'A node pool intended primarily for application workloads and workload-specific capacity design.',
  },
  {
    term: 'Azure CNI Overlay',
    definition: 'An AKS networking mode that combines Azure networking integration with overlay-based pod IP allocation.',
  },
  {
    term: 'kubenet',
    definition: 'An older AKS networking model that Microsoft documents as retiring from support on March 31, 2028.',
  },
  {
    term: 'Workload Identity',
    definition: 'The AKS identity model that uses OIDC federation between Kubernetes service accounts and Microsoft Entra identities.',
  },
  {
    term: 'Managed identity',
    definition: 'An Azure identity used by AKS components or workloads to access Azure resources without managing secrets manually.',
  },
  {
    term: 'Cluster Autoscaler',
    definition: 'The component that adjusts node counts in AKS node pools based on unschedulable pods and utilization signals.',
  },
  {
    term: 'Horizontal Pod Autoscaler',
    definition: 'A Kubernetes autoscaler that changes pod replica counts based on observed metrics.',
  },
  {
    term: 'CSI',
    definition: 'Container Storage Interface, the plugin model used in AKS for Azure Disk, Azure Files, and related storage integrations.',
  },
  {
    term: 'Private cluster',
    definition: 'An AKS cluster whose API server is exposed through private networking rather than only through a public endpoint.',
  },
  {
    term: 'Authorized IP ranges',
    definition: 'A control that limits access to a public AKS API server to specified public IP address ranges.',
  },
  {
    term: 'Availability zone',
    definition: 'A physically separate Azure datacenter zone in a region used for higher availability and failure-domain separation.',
  },
  {
    term: 'AKS Automatic',
    definition: 'A more opinionated AKS mode in which Microsoft manages more cluster and node behavior for you.',
  },
]
const pageSources = [
  'https://learn.microsoft.com/en-us/azure/aks/concepts-clusters-workloads',
  'https://learn.microsoft.com/en-us/azure/aks/concepts-identity',
  'https://learn.microsoft.com/en-us/azure/aks/azure-cni-overlay',
  'https://learn.microsoft.com/en-us/azure/aks/configure-kubenet',
  'https://learn.microsoft.com/en-us/azure/aks/use-network-policies',
  'https://learn.microsoft.com/en-us/azure/aks/availability-zones',
  'https://learn.microsoft.com/en-us/azure/aks/availability-zones-overview',
  'https://learn.microsoft.com/en-us/azure/aks/reliability-zone-resiliency-recommendations',
  'https://learn.microsoft.com/en-us/azure/aks/use-system-pools',
  'https://learn.microsoft.com/en-us/azure/aks/csi-storage-drivers',
  'https://learn.microsoft.com/en-us/azure/aks/workload-identity-overview',
  'https://learn.microsoft.com/en-us/azure/aks/private-clusters',
  'https://learn.microsoft.com/en-us/azure/aks/api-server-authorized-ip-ranges',
  'https://learn.microsoft.com/en-us/azure/aks/cluster-autoscaler-overview',
  'https://learn.microsoft.com/en-us/azure/aks/auto-upgrade-node-os-image',
  'https://learn.microsoft.com/en-us/azure/aks/upgrade-aks-control-plane',
  'https://learn.microsoft.com/en-us/azure/aks/app-routing',
  'https://learn.microsoft.com/en-us/azure/aks/policy-reference',
  'https://learn.microsoft.com/en-us/azure/aks/intro-aks-automatic',
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
    { id: 'bp-model', label: 'Cluster Model' },
    { id: 'bp-fit', label: 'When to Use It' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-architecture', label: 'Architecture' },
    { id: 'core-node-pools', label: 'Node Pools' },
    { id: 'core-networking', label: 'Networking' },
    { id: 'core-ingress', label: 'Ingress and LB' },
    { id: 'core-storage', label: 'Storage' },
    { id: 'core-identity', label: 'Identity' },
    { id: 'core-security', label: 'Security' },
    { id: 'core-scaling', label: 'Scaling' },
    { id: 'core-upgrades', label: 'Upgrades' },
    { id: 'core-observability', label: 'Observability' },
    { id: 'core-windows', label: 'Windows Nodes' },
    { id: 'core-private', label: 'Private Access' },
    { id: 'core-governance', label: 'Governance' },
    { id: 'core-cost', label: 'Cost' },
    { id: 'core-anti-patterns', label: 'Anti-Patterns' },
    { id: 'core-patterns', label: 'Design Patterns' },
    { id: 'core-ops-checklist', label: 'Operational Checklist' },
    { id: 'core-compare', label: 'Compare and Contrast' },
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
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

function getTabFromSearch(search: string): TabId {
  const tab = new URLSearchParams(search).get('tab')
  return isTabId(tab) ? tab : 'big-picture'
}

const win98HelpStyles = `
.azure-aks-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.azure-aks-help-page .win98-window {
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

.azure-aks-help-page .win98-titlebar {
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

.azure-aks-help-page .win98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.azure-aks-help-page .win98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.azure-aks-help-page .win98-control {
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

.azure-aks-help-page .win98-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
}

.azure-aks-help-page .win98-tab {
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

.azure-aks-help-page .win98-tab.active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.azure-aks-help-page .win98-main {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  flex: 1;
  min-height: 0;
  border-top: 1px solid #404040;
  background: #ffffff;
}

.azure-aks-help-page .win98-toc {
  overflow: auto;
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
}

.azure-aks-help-page .win98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.azure-aks-help-page .win98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.azure-aks-help-page .win98-toc-list li {
  margin: 0 0 8px;
}

.azure-aks-help-page .win98-toc-list a {
  color: #000000;
  font-size: 12px;
  text-decoration: none;
}

.azure-aks-help-page .win98-content {
  overflow-x: auto;
  overflow-y: scroll;
  scrollbar-gutter: stable;
  padding: 14px 20px 20px;
}

.azure-aks-help-page .win98-doc-title {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 700;
}

.azure-aks-help-page .win98-doc-subtitle {
  margin: 0 0 12px;
  font-size: 12px;
  font-weight: 700;
}

.azure-aks-help-page .win98-section {
  margin: 0 0 22px;
}

.azure-aks-help-page .win98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.azure-aks-help-page .win98-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.azure-aks-help-page .win98-content p,
.azure-aks-help-page .win98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.azure-aks-help-page .win98-content p {
  margin: 0 0 10px;
}

.azure-aks-help-page .win98-content ul,
.azure-aks-help-page .win98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}
.azure-aks-help-page .win98-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.azure-aks-help-page .win98-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.azure-aks-help-page .win98-codebox code {
  display: block;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
}

.azure-aks-help-page .win98-inline-link {
  color: #000080;
}

@media (max-width: 900px) {
  .azure-aks-help-page .win98-main {
    grid-template-columns: 1fr;
  }

  .azure-aks-help-page .win98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .azure-aks-help-page .win98-title-text {
    position: static;
    transform: none;
    margin-left: 8px;
    font-size: 14px;
  }
}
`

export default function AzureAKSPage(): JSX.Element {
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
      window.history.replaceState(window.history.state, '', `${url.pathname}?${nextSearch.toString()}`)
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
    window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}#${sectionId}`)
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
    <div className="azure-aks-help-page">
      <style>{win98HelpStyles}</style>
      <div className="win98-window" role="presentation">
        <header className="win98-titlebar">
          <span className="win98-title-text">{pageTitle}</span>
          <div className="win98-title-controls">
            <button className="win98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
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
                  <a href={`#${section.id}`} onClick={(event) => handleSectionJump(event, section.id)}>
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
                  <h2 className="win98-heading">Cluster Model</h2>
                  {clusterModelGuide.map((item) => (
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

                <section id="core-compare" className="win98-section">
                  <h2 className="win98-heading">Compare and Contrast</h2>
                  {compareNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
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
                    This content was compiled from official Microsoft documentation current as checked on March 12,
                    2026. AKS features, support policy details, region availability, and retirement timelines can
                    change, so production decisions should always be verified against the current Azure documentation.
                  </p>
                  <ul>
                    {pageSources.map((source) => (
                      <li key={source}>
                        <a href={source} className="win98-inline-link" target="_blank" rel="noreferrer">
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
