import { Link } from 'react-router-dom'

import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

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

const pageTitle = 'GCP GKE'
const pageSubtitle =
  'Managed Kubernetes on Google Cloud for production clusters, platform teams, and Kubernetes-native workloads.'

const introParagraphs = [
  "Google Kubernetes Engine, usually shortened to GKE, is Google Cloud's managed Kubernetes platform. Google operates the Kubernetes control plane for you, and depending on the cluster mode it can also take on much more of the node and lifecycle work. What you keep is the Kubernetes API model and the responsibility to design the platform around networking, identity, storage, workload policy, upgrades, and operational discipline.",
  'The engineering value of GKE is not just that it runs containers. The real value is managed Kubernetes integrated with Google Cloud networking, IAM, Artifact Registry, Cloud Load Balancing, Cloud Logging and Monitoring, storage services, Workload Identity Federation, and a supported lifecycle for running Kubernetes as part of a broader cloud platform.',
  'This page treats GKE as a platform-engineering topic rather than a marketing label: Autopilot and Standard modes, regional and zonal cluster choices, VPC-native networking, traffic exposure, workload identity, security posture, storage, autoscaling, upgrades, observability, cost, design patterns, and the reasons GKE is sometimes the right tool and sometimes clearly the wrong one.',
]

const bigPictureSections = [
  {
    title: 'What it is',
    paragraphs: [
      'GKE is a managed Kubernetes service built on Google Cloud. You deploy standard Kubernetes workloads, use familiar Kubernetes objects such as Deployments, Services, Jobs, StatefulSets, Ingress, and Gateway resources, and let Google run the control plane so your team does not have to build and maintain it from raw virtual machines.',
      'That does not mean GKE is "just Kubernetes hosting." Cluster mode, release channels, networking model, service exposure, workload identity, security controls, node strategy, and operational tooling all shape the real platform your applications run on. The cluster object is only one part of the design.',
    ],
  },
  {
    title: 'Why teams choose it',
    paragraphs: [
      'Teams choose GKE when they want Kubernetes as the platform boundary and they also want strong Google Cloud integration. That usually means container orchestration plus Google Cloud IAM, Artifact Registry, VPC networking, Cloud Load Balancing, Cloud DNS, managed storage integrations, Cloud Operations telemetry, and a supported upgrade story rather than self-managing upstream Kubernetes from scratch.',
      'GKE is especially attractive for organizations that already use Helm, GitOps, CRDs, operators, admission policy, service-to-service identity, batch workloads, or multi-team platform conventions that are naturally expressed in Kubernetes. In those environments, Kubernetes is not an implementation detail. It is the platform contract.',
    ],
  },
  {
    title: 'Autopilot and Standard mental model',
    paragraphs: [
      'GKE has two major operating modes. Autopilot is the more opinionated, more managed path. Google manages more of the node lifecycle, scales infrastructure for declared workload demand, and enforces a narrower but safer operating envelope. Standard mode gives you much more direct control over node pools, machine shapes, upgrade timing, and cluster customization, which also means you own more of the operational complexity.',
      'The right way to think about the choice is not "managed versus unmanaged." Both are managed Kubernetes. The real question is how much infrastructure control your workloads truly need and whether that extra control is worth the additional platform responsibility.',
    ],
  },
  {
    title: 'Where it fits',
    paragraphs: [
      'GKE fits when the organization wants real Kubernetes capabilities: advanced scheduling, custom controllers, mixed workload types, stateful systems where Kubernetes integration is justified, platform-level policy, multi-team namespace boundaries, private or tightly governed networking, or deeper control than serverless container platforms expose.',
      'It is also a strong fit when the company wants one consistent orchestration model across services, batch jobs, internal platforms, data-plane components, and supporting infrastructure controllers. Kubernetes becomes the standard interface by design, not by accident.',
    ],
  },
  {
    title: 'When it is the wrong tool',
    paragraphs: [
      'GKE is a poor fit when the team does not actually want Kubernetes and mainly needs a simple way to run stateless HTTP services. In those cases Cloud Run is often the better answer because it removes most cluster operations while keeping container packaging. GKE is also a weak fit when workloads really need plain virtual machines, special host-level software, or a simpler infrastructure model than Kubernetes adds.',
      'A managed control plane does not remove the need for cluster ownership. If the organization has not staffed for Kubernetes lifecycle, workload governance, networking, policy, and incident response, GKE becomes an expensive way to discover that "managed Kubernetes" still requires platform engineering.',
    ],
  },
]

const clusterModelGuide = [
  {
    title: 'Managed control plane',
    detail:
      'Google manages the Kubernetes API server and control-plane lifecycle. Your team focuses on workload architecture, data plane behavior, policy, and operations around the cluster.',
  },
  {
    title: 'Two cluster modes',
    detail:
      'Autopilot is the more opinionated mode with more Google-managed node operations. Standard mode gives you direct control over node pools and more of the infrastructure surface.',
  },
  {
    title: 'Regional bias for production',
    detail:
      'Production GKE designs usually prefer regional control planes for better availability characteristics. Zonal clusters are simpler and cheaper for lighter-weight or non-critical uses.',
  },
  {
    title: 'VPC-native networking',
    detail:
      'Modern GKE design assumes VPC-native clusters using alias IPs. IP planning, subnet boundaries, and private connectivity become real architecture decisions rather than hidden implementation details.',
  },
  {
    title: 'Release channels and maintenance policy',
    detail:
      'Upgrades in GKE are structured through release channels, maintenance windows, and exclusions. Good cluster operations depend on treating upgrades as a program, not as a surprise.',
  },
]

const fitGuide = [
  {
    title:
      'Need Kubernetes-native APIs, operators, CRDs, admission policy, or platform abstractions',
    choice: 'Choose GKE.',
  },
  {
    title: 'Need strong Google Cloud integration around networking, IAM, and managed observability',
    choice: 'GKE is a strong fit when Kubernetes is already justified.',
  },
  {
    title: 'Need the lowest operational overhead for stateless containerized HTTP services',
    choice: 'Cloud Run is often the better answer than GKE.',
  },
  {
    title:
      'Need deep control over nodes, placement, GPUs, custom daemon behavior, or cluster add-ons',
    choice: 'Prefer Standard GKE unless Autopilot explicitly supports the workload shape.',
  },
  {
    title: 'Need the simplest path to Kubernetes with stronger defaults and less node management',
    choice: 'Prefer Autopilot GKE.',
  },
  {
    title: 'Need generic infrastructure without real Kubernetes requirements',
    choice:
      'Use a simpler service or plain VMs instead of buying unnecessary orchestration complexity.',
  },
]

const keyTakeaways = [
  'GKE is managed Kubernetes, not no-ops Kubernetes.',
  'The real design is cluster mode, networking, identity, traffic exposure, storage, upgrades, and ownership boundaries.',
  'Autopilot reduces node and capacity operations; Standard increases control and responsibility.',
  'VPC-native networking, Workload Identity Federation for GKE, release channels, and Cloud Load Balancing integrations are central GKE topics, not edge details.',
  'The most expensive GKE mistakes usually come from weak platform boundaries, poor upgrade hygiene, or choosing Kubernetes where a simpler runtime would have been enough.',
]

const coreConceptSections: NarrativeSection[] = [
  {
    id: 'core-architecture',
    heading: 'Cluster Architecture and Responsibility Split',
    paragraphs: [
      'A GKE cluster is a managed Kubernetes control plane plus the data plane that actually runs your workloads. In Standard mode that data plane is made of node pools that you define and operate. In Autopilot mode Google manages far more of the node and capacity lifecycle on your behalf while you describe workloads through Kubernetes objects and resource requests.',
      'This split matters because it changes what "managed" means. Google manages the control plane service. Your team still owns how workloads are deployed, how access is controlled, how traffic enters and exits, how data is stored, what happens during upgrades, and whether the cluster is designed with real platform discipline or simply accumulates YAML until it becomes hard to reason about.',
      'A useful mental model is that GKE manages the Kubernetes substrate, while you manage the workload platform that sits on top of it. If tenancy, namespace conventions, service exposure, workload identity, add-ons, and release practices are undefined, then the cluster is not truly designed yet.',
    ],
  },
  {
    id: 'core-modes',
    heading: 'Autopilot and Standard Modes',
    paragraphs: [
      "Autopilot is Google's more opinionated GKE mode. It is intended to reduce cluster and node operations by managing infrastructure provisioning more directly from workload declarations and by enforcing a more constrained, more production-oriented runtime model. It is usually the best default when teams want Kubernetes but do not want to own full node-pool engineering.",
      'Standard mode is the classic managed Kubernetes model: Google still manages the control plane, but you manage node pools, machine families, scaling boundaries, more of the add-on surface, and a wider range of cluster customizations. That is the right choice when workloads need features, node behavior, or operational control beyond the Autopilot operating envelope.',
      'The choice is not about prestige. It is about responsibility. If a team needs direct node ownership, GPU pool tuning, unusual DaemonSets, or deeper scheduling and infrastructure control, Standard is usually justified. If it does not, Autopilot often removes a large amount of avoidable operational labor.',
    ],
  },
  {
    id: 'core-availability',
    heading: 'Regional and Zonal Cluster Topology',
    paragraphs: [
      'GKE clusters can be zonal or regional depending on mode and architecture choices. Regional designs are generally preferred for production because they improve control-plane availability characteristics and make it easier to think about multi-zone workload placement. Zonal clusters are simpler but carry a narrower failure domain model.',
      "Autopilot clusters are regional, which aligns with the product's safer-default posture. Standard clusters can be zonal or regional. The decision should reflect reliability requirements, budget, operational maturity, and whether the workload platform is truly intended for production use or lighter-weight internal and development scenarios.",
      'A regional control plane does not automatically make workloads highly available. Applications still need multiple replicas, sane disruption budgets, zone-aware scheduling, storage choices that match failure expectations, and ingress and dependency paths designed for zone failure rather than single-node optimism.',
    ],
  },
  {
    id: 'core-networking',
    heading: 'Networking: VPC-Native Clusters, Alias IPs, and Subnet Planning',
    paragraphs: [
      'Modern GKE networking is built around VPC-native clusters that use alias IPs. This is the recommended networking model and the baseline assumption for most current GKE designs. It gives pods and services first-class network address management inside Google Cloud and avoids many of the awkward constraints of older routes-based models.',
      'The architectural consequence is that IP planning becomes real platform work. Pod CIDR allocation, service ranges, subnet growth, Shared VPC design, private access patterns, and egress design all matter. Teams that treat those as afterthoughts often discover that networking becomes the first scaling bottleneck rather than the last optimization pass.',
      'Private clusters are also part of this conversation. When API-server and node exposure need tighter boundaries, GKE can be designed around private networking instead of assuming that control-plane access is just a public endpoint with credentials. Networking choices in GKE are not easy to undo later, so they deserve early design review.',
    ],
  },
  {
    id: 'core-traffic',
    heading: 'Traffic Exposure: Services, Ingress, Gateway API, and Load Balancing',
    paragraphs: [
      'Traffic in GKE usually enters through Kubernetes Services of type LoadBalancer, ingress controllers, or Gateway API resources backed by Google Cloud load balancing integrations. The platform question is not only how traffic reaches pods. It is how teams express public versus internal entry points, TLS, routing policy, health checks, and ownership of north-south traffic.',
      'Gateway API is particularly important because it separates infrastructure ownership from application routing ownership more cleanly than older one-resource ingress patterns. Gateway, route, and policy resources let platform teams expose controlled entry points while application teams own route intent inside that boundary.',
      'A stable service contract matters more than pod reachability. Pods churn. Services, gateways, DNS, and load-balancer integrations are what make that churn survivable in production. Teams that skip explicit traffic architecture usually end up with accidental exposure patterns and unclear responsibility during outages.',
    ],
  },
  {
    id: 'core-compute',
    heading: 'Nodes, Node Pools, Compute Classes, and Workload Placement',
    paragraphs: [
      'In Standard GKE, node pools are one of the most important architectural boundaries. Different pools can represent different machine types, accelerators, operating systems, Spot usage, zones, taints, or lifecycle expectations. If every workload lands on one generic node pool, the cluster loses much of its ability to be a platform rather than a random container bucket.',
      'Autopilot shifts this model by making resource requests and workload declarations the primary way capacity is expressed, with Google managing more of the underlying node behavior. That reduces raw node engineering work, but it does not remove the need to think about requests, limits, placement constraints, or which workloads actually belong together in the same cluster.',
      'Kubernetes placement tools still matter in both modes: taints and tolerations, affinity rules, topology spread constraints, pod disruption budgets, priority classes, and clear workload classes. Scheduling is one of the main places where platform maturity shows up because it determines whether a cluster behaves predictably under pressure.',
    ],
  },
  {
    id: 'core-scaling',
    heading: 'Autoscaling, Capacity, and Resource Intent',
    paragraphs: [
      'GKE scaling is multi-layered. Horizontal Pod Autoscaler changes replica counts. Cluster Autoscaler reacts to unschedulable pods and grows or shrinks node capacity. Node auto-provisioning can create fitting node shapes for pending workload demand in Standard clusters. Autopilot goes further by making workload resource declarations the main capacity signal for a more automated infrastructure model.',
      'The important detail is that these systems respond to declared resource intent, not to vague hopes. Poor requests and limits create poor scaling behavior. Understated requests cause noisy-neighbor problems. Overstated requests waste money and reduce bin-packing efficiency. Autoscaling cannot rescue a resource model that was never made explicit.',
      'Scaling also has reliability consequences. Pod disruption budgets, safe-to-evict expectations, topology constraints, startup time, and dependency bottlenecks all determine whether scaling helps or simply moves the failure somewhere else. Production GKE capacity engineering is not just "turn on autoscaler."',
    ],
  },
  {
    id: 'core-identity',
    heading: 'Identity, IAM, RBAC, and Workload Identity Federation for GKE',
    paragraphs: [
      'Identity in GKE exists at multiple layers: Google Cloud IAM for cloud resources, Kubernetes RBAC for in-cluster authorization, service accounts for workloads, and node identities for the machines that host them. One of the most valuable GKE capabilities is Workload Identity Federation for GKE, which lets pods obtain Google Cloud access through workload identity rather than through long-lived key files stored in Kubernetes Secrets.',
      'The preferred pattern is to scope Google Cloud permissions to the workload identity instead of giving broad permissions to the node service account and hoping workloads behave. That approach reduces blast radius and makes application permissions part of the deployment model rather than part of hidden infrastructure inheritance.',
      'There is also a subtle platform nuance: identity sameness can exist across clusters in the same project when workloads use the same namespace and Kubernetes service account names. That means platform teams need to think carefully about naming boundaries and IAM conditions if they do not want different clusters to collapse into one effective identity model by accident.',
    ],
  },
  {
    id: 'core-security',
    heading: 'Security Posture: Control Plane Access, Policy, Sandbox, and Supply Chain',
    paragraphs: [
      'GKE security is layered. The cluster endpoint can be public, private, or more tightly controlled with authorized access patterns. Workloads are governed by Kubernetes RBAC, IAM, network policy, admission controls, image provenance, and runtime constraints. A secure cluster is not the result of a single feature toggle. It is the result of many aligned controls.',
      'Autopilot helps by enforcing a narrower, more opinionated security envelope for workloads. Standard mode gives you more freedom, which also means more chances to make avoidable security mistakes. Features such as GKE Sandbox, Binary Authorization, network policy, private cluster design, and least-privilege controller permissions matter because Kubernetes is a highly composable platform with a large blast radius when governance is weak.',
      'The practical rule is simple: treat privileged controllers, ingress layers, CSI drivers, GitOps agents, and admission components as infrastructure control planes in their own right. They deserve the same scrutiny you would apply to any system that can mutate, expose, or exfiltrate your workloads.',
    ],
  },
  {
    id: 'core-storage',
    heading: 'Persistent Storage, CSI Drivers, and Stateful Workloads',
    paragraphs: [
      'Persistent storage in GKE is usually delivered through CSI drivers and Kubernetes storage classes. Persistent Disk CSI is the standard block-storage path for many workloads. Filestore CSI provides managed file shares when shared POSIX-style access is required. The Cloud Storage FUSE CSI driver is useful when workloads need to read or write object storage through a filesystem-style interface.',
      'Stateful design still requires care. ReadWriteOnce block storage, topology constraints, zone placement, failover behavior, backup and restore planning, and application-level replication do not disappear because the volume was provisioned from YAML. Kubernetes persistence is an operational contract, not just a schema field.',
      'A healthy default is to prefer managed external data services when those services fit the system well. Running databases or stateful brokers inside GKE is possible, but the team should do it because the Kubernetes operational model is justified, not because everything was forced into the cluster by habit.',
    ],
  },
  {
    id: 'core-upgrades',
    heading: 'Release Channels, Upgrades, Maintenance Windows, and Lifecycle',
    paragraphs: [
      'GKE upgrades are guided by release channels such as Rapid, Regular, Stable, and Extended, together with maintenance windows and exclusions. Autopilot clusters are always enrolled in a release channel. Standard clusters can either opt into a release channel or manage version choices more manually, but either way the upgrade path needs active ownership.',
      'The core lesson is that control-plane and node lifecycle are not a "later" problem. API deprecations, add-on compatibility, webhook behavior, CRDs, admission policy, and workload rollout tolerance all affect whether upgrades stay routine or turn into emergency projects. Staying reasonably current is usually easier than allowing large drift to accumulate.',
      'Google manages more of the mechanics than a self-managed cluster would, but you still need maintenance policy, preproduction validation, disruption-aware node rotation, and a clear understanding of which workloads or controllers are most likely to break during version transitions.',
    ],
  },
  {
    id: 'core-observability',
    heading: 'Observability and Day-Two Operations',
    paragraphs: [
      'Operating GKE well requires visibility at several layers: Kubernetes events, pod and node metrics, application metrics, audit trails, logs, deployment history, ingress and load-balancing signals, and the health of surrounding Google Cloud dependencies. Cloud Logging, Cloud Monitoring, Managed Service for Prometheus, and audit logs are part of the normal GKE operating surface.',
      'The important question is not whether dashboards exist. It is whether the team can quickly explain unschedulable pods, container restart storms, image-pull failures, DNS issues, node pressure, storage attach delays, ingress misroutes, and policy denials. If the answer is no, then the cluster is not observably ready regardless of how modern the charts look.',
      'Day-two operations also include drain behavior, namespace hygiene, quota enforcement, backup practices for cluster configuration where appropriate, access governance for humans and automation, and a release process that keeps controllers and workload teams from breaking one another by surprise.',
    ],
  },
  {
    id: 'core-cost',
    heading: 'Performance and Cost Tradeoffs',
    paragraphs: [
      'GKE cost is not just a cluster line item. It includes node or workload capacity, load balancers, persistent volumes, egress, logging volume, monitoring retention, idle headroom, and engineering time spent operating the platform. Autopilot and Standard also have different cost shapes because Autopilot trades some infrastructure control for a more managed capacity and billing model, while Standard exposes node-level utilization waste more directly.',
      'Performance optimization usually starts with right-sizing requests and limits, controlling image startup time, choosing appropriate node classes or workload resource envelopes, and making traffic and storage patterns explicit. Cost and performance often improve together when the resource model becomes more intentional.',
      'Underused clusters are expensive in hidden ways. Too many small environments, overprovisioned requests, unnecessary always-on add-ons, and weak workload consolidation all create waste that does not look dramatic in one place but becomes obvious when the platform is examined as a whole.',
    ],
  },
]

const designPatterns = [
  {
    title: 'Shared internal application platform',
    detail:
      'A platform team owns cluster-wide policy, ingress, identity, observability, and upgrades while application teams deploy into namespaces with clear contracts for routing, quotas, service accounts, and delivery.',
  },
  {
    title: 'Environment or trust-boundary separation by cluster',
    detail:
      'Different environments, business units, or security zones run in separate clusters to reduce blast radius and simplify ownership, even if some platform components are standardized across them.',
  },
  {
    title: 'Autopilot-first application hosting',
    detail:
      'General application workloads run in Autopilot clusters to minimize node operations, while specialized GPU or low-level infrastructure workloads are isolated elsewhere if they need Standard mode.',
  },
  {
    title: 'Gateway and route separation',
    detail:
      'Platform teams manage the shared gateway layer and traffic entry points, while service teams own route resources and backend services inside those boundaries.',
  },
  {
    title: 'Workload-scoped cloud access',
    detail:
      'Pods use Workload Identity Federation for GKE to reach Google Cloud services such as Secret Manager, Cloud Storage, BigQuery, or Spanner without storing long-lived service account keys.',
  },
]

const operationalChecklist = [
  'Decide Autopilot versus Standard explicitly instead of defaulting by habit.',
  'Prefer regional production clusters unless there is a concrete reason not to.',
  'Plan pod, service, and subnet IP ranges early for VPC-native networking.',
  'Use workload-scoped identity instead of broad node service account permissions.',
  'Keep controller, gateway, storage, and policy ownership boundaries clear.',
  'Review release channel choice, maintenance windows, and upgrade cadence before production.',
  'Validate how scaling, disruption budgets, and topology rules behave under real failure and burst scenarios.',
  'Treat logging and metrics volume as cost and reliability inputs, not as free side effects.',
]

const compareNotes = [
  {
    title: 'GKE vs Cloud Run',
    detail:
      'Cloud Run is simpler for stateless HTTP services and jobs when you do not need Kubernetes primitives. GKE is stronger when you need broader orchestration, deeper traffic models, custom controllers, more flexible scheduling, or a multi-team Kubernetes platform.',
  },
  {
    title: 'GKE vs Compute Engine',
    detail:
      'Compute Engine is stronger when you truly need VM-level control, custom host software, or non-Kubernetes operational models. GKE is stronger when the workload benefits from declarative orchestration, service discovery, autoscaling, and Kubernetes-native delivery patterns.',
  },
  {
    title: 'GKE vs Amazon EKS',
    detail:
      'Both are managed Kubernetes services. The core Kubernetes model is similar, but GKE is shaped by Google Cloud networking, IAM, Cloud Load Balancing, and Workload Identity Federation, while EKS is shaped by AWS VPC, IAM, load balancer controllers, and surrounding AWS-native infrastructure patterns.',
  },
  {
    title: 'GKE vs Azure AKS',
    detail:
      'Both offer managed Kubernetes integrated with their respective clouds. The practical differences are in networking defaults, identity systems, governance models, and surrounding platform services. The Kubernetes layer is familiar; the cloud integration model is where the real divergence appears.',
  },
]

const pitfalls = [
  'Choosing GKE because Kubernetes is fashionable rather than because Kubernetes capabilities are genuinely required.',
  'Treating Autopilot and Standard as branding choices instead of different operational responsibility models.',
  'Ignoring VPC-native IP planning until subnet pressure or service-range exhaustion becomes a scaling problem.',
  'Granting broad permissions to node service accounts instead of using workload-scoped identity.',
  'Running too many privileged controllers without clear ownership, review, or version discipline.',
  'Assuming a regional cluster automatically makes workloads highly available without replica, zone, and storage design.',
  'Letting release channels, add-ons, CRDs, and webhooks drift until upgrades become emergency projects.',
  'Using one cluster for incompatible trust boundaries and calling namespaces a complete isolation model.',
  'Treating logs and metrics as free and discovering later that observability choices are a meaningful part of platform cost.',
]

const examples: ExampleSection[] = [
  {
    id: 'ex-autopilot-shape',
    title: 'Autopilot mental model',
    code: `GKE Autopilot cluster
  -> Google-managed control plane
  -> Google-managed node and capacity lifecycle
  -> Kubernetes manifests declare workload intent
  -> Pods scheduled onto managed capacity
  -> Cloud Load Balancing / IAM / Logging / Monitoring integrations`,
    explanation:
      'Autopilot is still real Kubernetes, but the node and capacity story is more managed. The platform contract becomes "declare workload intent clearly" rather than "engineer and maintain all node pools yourself."',
  },
  {
    id: 'ex-create-autopilot',
    title: 'Create a basic regional Autopilot cluster',
    code: `gcloud container clusters create-auto gke-prod \\
  --region us-central1 \\
  --release-channel regular \\
  --network default \\
  --subnetwork default`,
    explanation:
      'This captures the common Autopilot starting point: regional scope plus a release channel. Exact networking and security flags depend on your environment, but the example shows the operational shape.',
  },
  {
    id: 'ex-standard-cluster',
    title: 'Create a Standard cluster and an autoscaling node pool',
    code: `gcloud container clusters create gke-standard-prod \\
  --region us-central1 \\
  --release-channel regular \\
  --enable-ip-alias \\
  --num-nodes 1

gcloud container node-pools create app-pool \\
  --cluster gke-standard-prod \\
  --region us-central1 \\
  --machine-type e2-standard-4 \\
  --enable-autoscaling \\
  --min-nodes 1 \\
  --max-nodes 5`,
    explanation:
      'Standard mode gives you direct node-pool control. That power is useful, but it also makes node class design, autoscaling boundaries, and upgrade behavior your responsibility.',
  },
  {
    id: 'ex-workload-identity',
    title: 'Workload identity shape',
    code: `Kubernetes ServiceAccount
  -> GKE metadata server
  -> Workload Identity Federation for GKE
  -> IAM allow policy on Google Cloud resource
  -> Pod receives short-lived Google Cloud credentials

Avoid:
  long-lived service account keys in Secrets
  overly broad node service account permissions`,
    explanation:
      'The design goal is workload-scoped cloud access. A pod should get the permissions tied to its own workload identity, not inherit whatever broad permissions happen to be attached to the node.',
  },
  {
    id: 'ex-traffic-flow',
    title: 'North-south traffic mental model',
    code: `Client
  -> Google Cloud load balancer
  -> Gateway / Ingress
  -> Service
  -> Pods

Inside cluster:
  Service DNS
  stable service names
  pod churn hidden behind service contract`,
    explanation:
      'The stable production boundary is the service and gateway layer, not individual pods. This is the core traffic-management mental model for most GKE applications.',
  },
  {
    id: 'ex-storage',
    title: 'Claim persistent storage for a stateful workload',
    code: `apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: app-data
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: standard-rwo
  resources:
    requests:
      storage: 100Gi`,
    explanation:
      'Kubernetes persistence is simple to declare but not simple to operate. The storage class, access mode, topology, and backup model still determine whether the stateful workload is actually production-ready.',
  },
]

const glossaryTerms = [
  {
    term: 'GKE',
    definition: "Google Kubernetes Engine, Google Cloud's managed Kubernetes platform.",
  },
  {
    term: 'Autopilot',
    definition:
      'A more opinionated GKE mode in which Google manages more of node and capacity operations for you.',
  },
  {
    term: 'Standard',
    definition:
      'A GKE mode in which you manage node pools and more of the cluster infrastructure behavior directly.',
  },
  {
    term: 'Regional cluster',
    definition:
      'A cluster topology with a regional control-plane model intended to improve availability characteristics compared with a zonal design.',
  },
  {
    term: 'Zonal cluster',
    definition:
      'A cluster topology centered on a single zone; simpler and often cheaper, but with a narrower failure-domain model.',
  },
  {
    term: 'VPC-native cluster',
    definition:
      'A GKE cluster that uses alias IPs for pods and services and integrates cluster networking directly with Google Cloud VPC constructs.',
  },
  {
    term: 'Alias IP',
    definition:
      'The IP allocation mechanism used by VPC-native GKE clusters to assign pod and service ranges within Google Cloud networking.',
  },
  {
    term: 'Node pool',
    definition:
      'A group of worker nodes in a Standard GKE cluster with common machine, operating system, and scaling characteristics.',
  },
  {
    term: 'Workload Identity Federation for GKE',
    definition:
      'A GKE mechanism that allows Kubernetes workloads to access Google Cloud resources through workload identity rather than long-lived key files.',
  },
  {
    term: 'GKE metadata server',
    definition:
      'The metadata path used by workloads in GKE to obtain identity-related information for Google Cloud access in the workload identity model.',
  },
  {
    term: 'Gateway API',
    definition:
      'A Kubernetes API family for modeling gateways and routes with clearer role separation than older ingress-only patterns.',
  },
  {
    term: 'Release channel',
    definition:
      'A GKE lifecycle track such as Rapid, Regular, Stable, or Extended that shapes version currency and upgrade posture.',
  },
  {
    term: 'Cluster Autoscaler',
    definition:
      'The component that adjusts node capacity when pending pods cannot be scheduled because declared resources exceed current supply.',
  },
  {
    term: 'Node auto-provisioning',
    definition:
      'A Standard GKE capability that can create fitting node pools automatically based on workload demand.',
  },
  {
    term: 'GKE Sandbox',
    definition:
      'A runtime-isolation feature for GKE workloads based on sandboxed execution technology such as gVisor.',
  },
  {
    term: 'Binary Authorization',
    definition:
      'A policy control that can restrict which container images are allowed to run based on attestation and deployment policy.',
  },
  {
    term: 'CSI driver',
    definition:
      'A Kubernetes storage integration component used to connect workloads to persistent storage systems.',
  },
]

const pageSources = [
  'https://cloud.google.com/kubernetes-engine/docs/concepts/kubernetes-engine-overview',
  'https://cloud.google.com/kubernetes-engine/docs/concepts/cluster-architecture',
  'https://cloud.google.com/kubernetes-engine/docs/concepts/autopilot-overview',
  'https://cloud.google.com/kubernetes-engine/docs/resources/autopilot-standard-feature-comparison',
  'https://cloud.google.com/kubernetes-engine/docs/concepts/configuration-overview',
  'https://cloud.google.com/kubernetes-engine/docs/concepts/alias-ips',
  'https://cloud.google.com/kubernetes-engine/docs/concepts/gateway-api',
  'https://cloud.google.com/kubernetes-engine/docs/concepts/cluster-autoscaler',
  'https://cloud.google.com/kubernetes-engine/docs/concepts/node-auto-provisioning',
  'https://cloud.google.com/kubernetes-engine/docs/concepts/workload-identity',
  'https://cloud.google.com/kubernetes-engine/docs/concepts/security-overview',
  'https://cloud.google.com/kubernetes-engine/docs/concepts/control-plane-security',
  'https://cloud.google.com/kubernetes-engine/docs/concepts/persistent-volumes',
  'https://cloud.google.com/kubernetes-engine/docs/concepts/cloud-storage-fuse-csi-driver',
  'https://cloud.google.com/kubernetes-engine/docs/concepts/release-channels',
  'https://cloud.google.com/kubernetes-engine/docs/concepts/about-logging-monitoring',
  'https://cloud.google.com/binary-authorization/docs/overview',
  'https://cloud.google.com/sdk/gcloud/reference/container/clusters/create-auto',
  'https://cloud.google.com/sdk/gcloud/reference/container/clusters/create',
  'https://cloud.google.com/sdk/gcloud/reference/container/node-pools/create',
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
    { id: 'bp-fit', label: 'When to Use GKE' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-architecture', label: 'Architecture' },
    { id: 'core-modes', label: 'Autopilot and Standard' },
    { id: 'core-availability', label: 'Regional and Zonal' },
    { id: 'core-networking', label: 'Networking' },
    { id: 'core-traffic', label: 'Traffic Exposure' },
    { id: 'core-compute', label: 'Nodes and Placement' },
    { id: 'core-scaling', label: 'Scaling' },
    { id: 'core-identity', label: 'Identity' },
    { id: 'core-security', label: 'Security' },
    { id: 'core-storage', label: 'Storage' },
    { id: 'core-upgrades', label: 'Upgrades' },
    { id: 'core-observability', label: 'Observability' },
    { id: 'core-cost', label: 'Performance and Cost' },
    { id: 'core-patterns', label: 'Design Patterns' },
    { id: 'core-checklist', label: 'Operational Checklist' },
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

export default function GcpGkePage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Gcp Gke Page',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Gcp Gke Page"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">{pageTitle}</h1>
      <p className="bin98-doc-subtitle">{pageSubtitle}</p>
      {introParagraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <p>
        The title-bar minimize control returns to the previous page when possible, or to{' '}
        <Link to="/algoViz" className="bin98-inline-link">
          /algoViz
        </Link>{' '}
        when there is no prior history entry.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            {bigPictureSections.map((section) => (
              <div key={section.title}>
                <h3 className="bin98-subheading">{section.title}</h3>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="bp-model" className="bin98-section">
            <h2 className="bin98-heading">Cluster Model</h2>
            {clusterModelGuide.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <hr className="bin98-divider" />

          <section id="bp-fit" className="bin98-section">
            <h2 className="bin98-heading">When to Use GKE</h2>
            <ul>
              {fitGuide.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}:</strong> {item.choice}
                </li>
              ))}
            </ul>
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
          {coreConceptSections.map((section) => (
            <section key={section.id} id={section.id} className="bin98-section">
              <h2 className="bin98-heading">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}

          <section id="core-patterns" className="bin98-section">
            <h2 className="bin98-heading">Design Patterns</h2>
            {designPatterns.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-checklist" className="bin98-section">
            <h2 className="bin98-heading">Operational Checklist</h2>
            <ul>
              {operationalChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section id="core-compare" className="bin98-section">
            <h2 className="bin98-heading">Compare and Contrast</h2>
            {compareNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-pitfalls" className="bin98-section">
            <h2 className="bin98-heading">Common Pitfalls</h2>
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
        <>
          <section id="glossary-terms" className="bin98-section">
            <h2 className="bin98-heading">Glossary</h2>
            {glossaryTerms.map((item) => (
              <p key={item.term}>
                <strong>{item.term}:</strong> {item.definition}
              </p>
            ))}
          </section>

          <section id="glossary-sources" className="bin98-section">
            <h2 className="bin98-heading">Primary Sources</h2>
            <p>
              This page was compiled against official Google Cloud documentation checked on March
              15, 2026. GKE features, support policy details, regional availability, and product
              guidance can change, so production decisions should always be verified against the
              current documentation.
            </p>
            <ul>
              {pageSources.map((source) => (
                <li key={source}>
                  <a href={source} className="bin98-inline-link" target="_blank" rel="noreferrer">
                    {source}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </TopicPageShell>
  )
}
