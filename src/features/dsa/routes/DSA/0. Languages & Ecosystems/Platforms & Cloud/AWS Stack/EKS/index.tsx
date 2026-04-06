import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const pageTitle = 'AWS EKS'
const pageSubtitle = 'Managed Kubernetes on AWS with AWS-integrated networking, identity, and operations.'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const bigPictureSections = [
  {
    title: 'What it is',
    paragraphs: [
      'Amazon Elastic Kubernetes Service, or EKS, is AWS\'s managed Kubernetes offering. AWS operates the managed control plane while you run workloads on worker nodes or Fargate, and you keep the Kubernetes API model for deployments, services, controllers, and operators.',
      'EKS is not a simplified container service. It is real Kubernetes with AWS opinionated integrations around networking, identity, upgrades, storage, and node lifecycle.',
    ],
  },
  {
    title: 'Where it fits',
    paragraphs: [
      'EKS fits when the team wants Kubernetes as the platform boundary rather than just containers as a packaging format. It works well for organizations that already use Helm, GitOps, operators, CRDs, admission policy, service mesh patterns, or internal platform abstractions built on upstream Kubernetes concepts.',
      'Inside AWS, EKS commonly integrates with VPC networking, ECR, IAM, CloudWatch, Route 53, load balancers, EBS, EFS, Karpenter, and managed add-ons such as the VPC CNI, CoreDNS, and kube-proxy.',
    ],
  },
  {
    title: 'Why teams use it',
    paragraphs: [
      'Teams use EKS when they want Kubernetes portability of concepts, access to the broader cloud-native ecosystem, and the ability to standardize deployment and operations around Kubernetes-native APIs. It is often the right fit when application teams expect Kubernetes semantics and tooling.',
      'It also gives a path to advanced scheduling, custom controllers, service mesh, policy engines, multi-tenant namespaces, and GitOps-driven environment management that would be awkward or impossible on simpler container platforms.',
    ],
  },
  {
    title: 'When it is a poor fit',
    paragraphs: [
      'EKS is usually a poor fit when the team does not actually want Kubernetes and would benefit more from ECS, Fargate-backed ECS, or Lambda. Running EKS only because it sounds modern is a fast way to buy operational complexity without getting corresponding value.',
      'It is also a bad fit for organizations that have not staffed for cluster lifecycle, Kubernetes networking, admission control, upgrade runbooks, and platform ownership. Managed control plane does not mean managed platform.',
    ],
  },
]

const computeChoices = [
  {
    title: 'Managed node groups',
    summary:
      'Best default when you want EC2-backed worker nodes with AWS-managed lifecycle assistance for provisioning and upgrades.',
    details: [
      'Works well for most general-purpose production clusters.',
      'Keeps Kubernetes node flexibility while reducing some day-two node management burden.',
      'Still requires real capacity, AMI, scaling, and upgrade thinking.',
    ],
  },
  {
    title: 'Self-managed nodes',
    summary:
      'Best when you need full control over the node lifecycle, bootstrap, or custom operational patterns beyond what managed node groups provide.',
    details: [
      'More flexibility, more responsibility.',
      'Often used for unusual bootstrap logic or tightly customized node images.',
      'Usually unnecessary unless there is a specific platform requirement.',
    ],
  },
  {
    title: 'Fargate for EKS',
    summary:
      'Best when selected Kubernetes pods should run without managing EC2 workers, usually for simpler operational boundaries or isolated workload classes.',
    details: [
      'Removes worker-node management for matched pods.',
      'Does not remove the need to operate Kubernetes concepts at the cluster level.',
      'Useful for some platform and security models, but not always the best general default.',
    ],
  },
]

const lifecycleFlow = [
  'Create the EKS cluster and its VPC, subnet, and security-group layout.',
  'Decide how workloads will get compute through managed node groups, self-managed nodes, Karpenter-managed nodes, Fargate profiles, or a combination.',
  'Install or manage the key add-ons such as VPC CNI, CoreDNS, kube-proxy, storage drivers, and any ingress or observability stack.',
  'Deploy workloads with Kubernetes manifests, Helm, or GitOps tooling, then connect them to ingress, service discovery, storage, and IAM-based access patterns.',
  'Operate the cluster as a platform: upgrades, node replacement, policy, logging, scaling, security, and backup all become ongoing responsibilities.',
]

const fitGuide = [
  {
    title: 'Need Kubernetes-native tooling, operators, CRDs, or platform APIs',
    choice: 'Choose EKS.',
  },
  {
    title: 'Need containers on AWS but want less platform complexity',
    choice: 'Prefer ECS.',
  },
  {
    title: 'Need only simple event-driven compute',
    choice: 'Prefer Lambda.',
  },
  {
    title: 'Need platform standardization across teams already invested in Kubernetes',
    choice: 'EKS is often the strongest AWS-native choice.',
  },
]

const coreConceptSections = [
  {
    id: 'core-cluster',
    heading: 'Control Plane and Cluster Model',
    paragraphs: [
      'EKS manages the Kubernetes control plane for you, but you still own the surrounding platform decisions. The cluster is not just an API endpoint. It is the combination of control-plane version, networking model, node strategy, add-ons, policy, observability, and workload conventions.',
      'Managed control plane reduces one category of toil, but it does not remove the need for Kubernetes administration discipline. Teams still need to reason about version skew, add-on compatibility, node health, and workload readiness during upgrades and incidents.',
    ],
  },
  {
    id: 'core-nodes',
    heading: 'Node Strategy and Data Plane',
    paragraphs: [
      'The EKS data plane is how your pods actually get compute. That may be managed node groups, self-managed nodes, Karpenter-provisioned nodes, Fargate-backed pods, or some combination. Choosing the data plane is one of the most important architectural decisions because it determines cost, upgrade style, scaling behavior, and platform flexibility.',
      'Kubernetes does not care whether a node was created by a managed node group, an Auto Scaling group, or Karpenter, but your operational model absolutely does. Platform teams should be explicit about which controller owns node creation and replacement.',
    ],
  },
  {
    id: 'core-networking',
    heading: 'Networking and VPC CNI',
    paragraphs: [
      'EKS networking on AWS is heavily shaped by the Amazon VPC CNI plugin. Pod networking is tied to VPC concepts, IP allocation behavior, subnets, ENIs, routing, and security groups in ways that differ from some other Kubernetes environments.',
      'This makes EKS feel very AWS-native, but it also means subnet design and IP planning are real cluster-scaling concerns. If pod density, pod security groups, or custom networking are introduced later without planning, networking becomes the first major bottleneck.',
    ],
  },
  {
    id: 'core-identity',
    heading: 'Identity: IRSA and EKS Pod Identity',
    paragraphs: [
      'Workloads on EKS often need AWS API access. Historically this was commonly handled through IAM Roles for Service Accounts, or IRSA. EKS also supports Pod Identity as a newer AWS-native way to map IAM roles to Kubernetes service accounts through Pod Identity associations.',
      'The important idea is the same regardless of mechanism: application permissions should be scoped to the workload identity, not inherited broadly from the node. If node roles become catch-all permission buckets, the cluster security model degrades quickly.',
    ],
  },
  {
    id: 'core-addons',
    heading: 'Add-ons and Cluster Components',
    paragraphs: [
      'An EKS cluster is never just Kubernetes control plane plus your workloads. CoreDNS, kube-proxy, the VPC CNI, CSI drivers, metrics agents, ingress controllers, observability agents, and policy controllers all shape cluster behavior. Some of these are available as Amazon EKS add-ons, which gives you a more managed lifecycle.',
      'Add-on version compatibility matters. Cluster upgrades are rarely just control-plane upgrades. They are coordinated upgrades across node versions, add-ons, and the workloads or controllers that depend on specific Kubernetes APIs.',
    ],
  },
  {
    id: 'core-scheduling',
    heading: 'Scheduling, Autoscaling, and Capacity',
    paragraphs: [
      'Kubernetes scheduling on EKS is affected by requests and limits, taints and tolerations, node selectors, topology spread constraints, and the actual node supply available to the cluster. If the cluster cannot provision the right nodes quickly, Kubernetes desired state does not magically become runnable capacity.',
      'Cluster Autoscaler and Karpenter are different approaches to node elasticity. The key operational point is to have exactly one clear owner for node-supply decisions in a given path and to understand how pending pods, provisioning speed, and consolidation behavior affect workload stability.',
    ],
  },
  {
    id: 'core-ingress',
    heading: 'Ingress, Service Exposure, and Traffic',
    paragraphs: [
      'Traffic into EKS commonly flows through Kubernetes Services and Ingress resources, often backed by AWS load balancer integrations. The AWS Load Balancer Controller is a central part of many EKS platforms because it translates Kubernetes intents into AWS ALB or NLB infrastructure.',
      'Expose workloads through stable service-level contracts rather than direct pod reachability assumptions. Ingress, internal load balancing, DNS, TLS, and health checks are all part of the platform contract, not optional afterthoughts.',
    ],
  },
  {
    id: 'core-storage',
    heading: 'Persistent Storage and CSI',
    paragraphs: [
      'Stateful workloads on EKS usually rely on CSI drivers to integrate with storage such as Amazon EBS or EFS. The storage class, access mode, topology constraints, and backup strategy all matter because Kubernetes persistence is not just a YAML field. It has real operational consequences around failover, scheduling, and recovery.',
      'The safe default is still to prefer managed external data services when possible. Running stateful systems inside Kubernetes is possible, but the team should do it because the operational model is justified, not because every workload is being forced through the same platform.',
    ],
  },
  {
    id: 'core-upgrades',
    heading: 'Versioning and Upgrades',
    paragraphs: [
      'EKS upgrades are a platform program, not just a button click. The cluster version, node versions, add-on versions, admission policies, CRDs, and application dependencies all need compatibility review. A clean upgrade path depends on staying reasonably current rather than letting many versions of drift accumulate.',
      'A disciplined upgrade strategy usually includes preproduction validation, node rotation, workload disruption budgets, compatibility testing for controllers and webhooks, and explicit rollback thinking for add-ons and application layers.',
    ],
  },
  {
    id: 'core-observability',
    heading: 'Observability and Day-Two Operations',
    paragraphs: [
      'Operating EKS well requires visibility at multiple layers: Kubernetes objects and events, node health, pod logs, cluster metrics, AWS infrastructure signals, and application telemetry. If the observability stack is weak, teams end up arguing about whether a failure is Kubernetes, AWS, networking, or application code without evidence.',
      'Good day-two operations also include node maintenance, drain behavior, eviction handling, policy enforcement, backup of cluster configuration and state where relevant, and strong access controls for kubectl and automation. Managed control plane does not remove those responsibilities.',
    ],
  },
  {
    id: 'core-security',
    heading: 'Security Posture',
    paragraphs: [
      'Security on EKS spans AWS IAM, Kubernetes RBAC, network policy, admission control, image provenance, runtime isolation, secret management, and workload identity. Weakness in any one of those layers can undermine the rest because Kubernetes is a highly composable platform.',
      'A healthy posture usually includes least-privilege workload identity, limited control-plane access, private networking where practical, restricted node roles, careful controller permissions, and policy around who may deploy privileged workloads or modify cluster-wide resources.',
    ],
  },
  {
    id: 'core-cost',
    heading: 'Performance and Cost Tradeoffs',
    paragraphs: [
      'EKS cost is not only the control-plane fee. It is also node overprovisioning, waste from poor requests and limits, idle daemon overhead, load balancers, logs, persistent volumes, NAT traffic, and engineering time spent operating the platform. Underused clusters are usually expensive in ways that do not show up in a single line item.',
      'Performance tuning on EKS often starts with right-sizing workloads, reducing noisy-neighbor effects, improving image startup times, and choosing the correct node shapes and autoscaling strategy. Cost optimization and performance optimization frequently meet at the same place: a more intentional capacity model.',
    ],
  },
]

const operationsNotes = [
  {
    title: 'Stay current',
    detail:
      'EKS clusters are easier to upgrade when versions do not drift far behind. Delayed upgrades compound compatibility and security risk.',
  },
  {
    title: 'Own platform boundaries',
    detail:
      'Be explicit about which teams own cluster configuration, namespaces, ingress, policy, node supply, and add-ons. Ambiguous ownership is one of the fastest ways to make EKS chaotic.',
  },
  {
    title: 'Watch IP consumption',
    detail:
      'VPC-native pod networking means subnet sizing and IP availability are real scaling constraints, not background implementation details.',
  },
  {
    title: 'Treat controllers as privileged software',
    detail:
      'Ingress controllers, CSI drivers, autoscalers, GitOps agents, and policy engines often have broad access. Their permissions and upgrade path deserve the same scrutiny as any infrastructure control plane.',
  },
  {
    title: 'Access model',
    detail:
      'Restrict who can administer the cluster and how. Kubernetes admin rights plus broad AWS rights is an extremely powerful combination and should be tightly governed.',
  },
]

const designPatterns = [
  {
    title: 'Shared application platform cluster',
    detail:
      'Multiple teams deploy into well-defined namespaces with standardized ingress, policy, observability, and GitOps workflows, while a platform team owns cluster-wide controllers and upgrades.',
  },
  {
    title: 'Dedicated cluster per environment or trust boundary',
    detail:
      'Separate clusters isolate blast radius, compliance boundaries, and upgrade risk at the cost of more platform surface area and duplicated infrastructure.',
  },
  {
    title: 'Karpenter-driven elastic worker model',
    detail:
      'Pending pods drive dynamic node provisioning so the cluster can adapt to varied workload shapes without maintaining large permanently idle node pools.',
  },
  {
    title: 'Ingress plus internal services',
    detail:
      'Public or private ingress terminates external traffic while internal Services and DNS handle east-west communication. This keeps workload discovery stable as pods churn.',
  },
]

const pitfalls = [
  'Choosing EKS because Kubernetes is fashionable rather than because Kubernetes capabilities are actually needed.',
  'Assuming managed control plane means managed platform and underinvesting in day-two operations.',
  'Letting node, add-on, and cluster versions drift until upgrades become disruptive projects.',
  'Granting broad node IAM permissions and treating them as a substitute for workload-scoped identity.',
  'Ignoring subnet and IP planning until pod networking becomes the scaling bottleneck.',
  'Running too many powerful controllers without a clear ownership or permission model.',
  'Treating every workload as equally suitable for Kubernetes, including ones that would be cheaper and simpler elsewhere.',
  'Using one cluster for everything without clear namespace, policy, and blast-radius boundaries.',
  'Skipping observability and then trying to debug Kubernetes, AWS, and application failures blind.',
]

const examples = [
  {
    id: 'ex-node-group',
    title: 'Managed node group mental model',
    code: `EKS cluster
  -> managed node group
     -> EC2 Auto Scaling managed by EKS
     -> worker nodes join cluster
     -> pods scheduled onto nodes`,
    explanation:
      'Managed node groups keep Kubernetes node flexibility while reducing some of the raw infrastructure management burden compared with fully self-managed workers.',
  },
  {
    id: 'ex-workload-identity',
    title: 'Workload identity shape',
    code: `Kubernetes service account
  -> IAM mapping (IRSA or Pod Identity association)
  -> pod receives workload-scoped AWS permissions

Avoid:
  pod inheriting broad node role permissions`,
    explanation:
      'The goal is workload-scoped identity. The application should get only the AWS permissions tied to its own service account, not whatever happens to be on the worker node.',
  },
  {
    id: 'ex-ingress',
    title: 'Ingress traffic shape',
    code: `Client
  -> ALB or NLB via controller-managed integration
  -> Ingress / Service
  -> pods

Inside cluster:
  service DNS
  stable service names
  pod churn hidden behind service contract`,
    explanation:
      'Ingress and Services provide the stable contract while pods come and go underneath. This is the core traffic-management mental model for most EKS applications.',
  },
  {
    id: 'ex-upgrade',
    title: 'Upgrade sequence',
    code: `1. Review target Kubernetes and add-on compatibility.
2. Upgrade cluster control plane.
3. Upgrade managed add-ons.
4. Roll or replace nodes to supported versions.
5. Validate workloads, policies, controllers, and ingress behavior.`,
    explanation:
      'Cluster upgrades should be coordinated, version-aware operations rather than ad hoc control-plane changes with no plan for the rest of the stack.',
  },
]

const glossaryTerms = [
  {
    term: 'EKS cluster',
    definition:
      'A managed Kubernetes control plane on AWS together with its surrounding node, networking, add-on, and access model.',
  },
  {
    term: 'Managed node group',
    definition:
      'An EKS-managed worker-node lifecycle model for EC2-backed Kubernetes nodes.',
  },
  {
    term: 'Fargate profile',
    definition:
      'An EKS configuration that matches selected pods to run on AWS Fargate rather than on EC2 worker nodes.',
  },
  {
    term: 'VPC CNI',
    definition:
      'The networking plugin that connects Kubernetes pod networking to AWS VPC constructs in EKS.',
  },
  {
    term: 'IRSA',
    definition:
      'IAM Roles for Service Accounts; a mechanism for mapping AWS IAM permissions to Kubernetes service accounts.',
  },
  {
    term: 'EKS Pod Identity',
    definition:
      'An AWS-managed mechanism for associating IAM roles with Kubernetes service accounts for workload identity.',
  },
  {
    term: 'Add-on',
    definition:
      'A cluster component such as CoreDNS, kube-proxy, VPC CNI, or a driver that supports the EKS platform and workloads.',
  },
  {
    term: 'Karpenter',
    definition:
      'A node provisioning system often used with EKS to add and consolidate worker capacity based on pending pod demand.',
  },
  {
    term: 'AWS Load Balancer Controller',
    definition:
      'A controller that maps Kubernetes ingress and service intents to AWS load balancing resources.',
  },
  {
    term: 'CSI driver',
    definition:
      'A Kubernetes storage integration component used to connect workloads to persistent storage systems.',
  },
]

const pageSources = [
  'https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html',
  'https://docs.aws.amazon.com/eks/latest/userguide/managed-node-groups.html',
  'https://docs.aws.amazon.com/eks/latest/userguide/eks-compute.html',
  'https://docs.aws.amazon.com/eks/latest/userguide/managing-vpc-cni.html',
  'https://docs.aws.amazon.com/eks/latest/userguide/security-iam-eks-pod-identities.html',
  'https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html',
  'https://docs.aws.amazon.com/eks/latest/userguide/eks-add-ons.html',
  'https://docs.aws.amazon.com/eks/latest/userguide/update-cluster.html',
  'https://docs.aws.amazon.com/eks/latest/userguide/update-managed-node-group.html',
  'https://docs.aws.amazon.com/eks/latest/userguide/auto-scale-workloads.html',
  'https://docs.aws.amazon.com/eks/latest/userguide/lbc-manifest.html',
  'https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html',
  'https://docs.aws.amazon.com/eks/latest/userguide/efs-csi.html',
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
    { id: 'bp-compute', label: 'Compute Choices' },
    { id: 'bp-flow', label: 'Lifecycle Flow' },
    { id: 'bp-fit', label: 'When to Choose EKS' },
  ],
  'core-concepts': [
    { id: 'core-cluster', label: 'Cluster Model' },
    { id: 'core-nodes', label: 'Node Strategy' },
    { id: 'core-networking', label: 'Networking' },
    { id: 'core-identity', label: 'Identity' },
    { id: 'core-addons', label: 'Add-ons' },
    { id: 'core-scheduling', label: 'Scheduling' },
    { id: 'core-ingress', label: 'Ingress and Traffic' },
    { id: 'core-storage', label: 'Storage' },
    { id: 'core-upgrades', label: 'Upgrades' },
    { id: 'core-observability', label: 'Observability' },
    { id: 'core-security', label: 'Security' },
    { id: 'core-cost', label: 'Performance and Cost' },
    { id: 'core-ops', label: 'Operational Notes' },
    { id: 'core-patterns', label: 'Design Patterns' },
    { id: 'core-pitfalls', label: 'Pitfalls' },
  ],
  examples: examples.map((example) => ({
    id: example.id,
    label: example.title,
  })),
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

const eksHelpStyles = `
.eks-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.eks-help-window {
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

.eks-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.eks-help-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.eks-help-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.eks-help-control {
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

.eks-help-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
}

.eks-help-tab {
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

.eks-help-tab.active {
  position: relative;
  top: 1px;
  background: #fff;
}

.eks-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
  border-top: 1px solid #404040;
  background: #fff;
}

.eks-help-toc {
  overflow: auto;
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
}

.eks-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.eks-help-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.eks-help-toc-list li {
  margin: 0 0 8px;
}

.eks-help-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.eks-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.eks-help-title-main {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.eks-help-section {
  margin: 0 0 20px;
}

.eks-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.eks-help-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.eks-help-content p,
.eks-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.eks-help-content p {
  margin: 0 0 10px;
}

.eks-help-content ul,
.eks-help-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.eks-help-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.eks-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  background: #f4f4f4;
}

.eks-help-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

.eks-help-inline-link {
  color: #000080;
}

@media (max-width: 900px) {
  .eks-help-main {
    grid-template-columns: 1fr;
  }

  .eks-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}
`

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

export default function AwsEksPage(): JSX.Element {
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
    <div className="eks-help-page">
      <style>{eksHelpStyles}</style>
      <div className="eks-help-window" role="presentation">
        <header className="eks-help-titlebar">
          <span className="eks-help-title">{pageTitle}</span>
          <div className="eks-help-controls">
            <button className="eks-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="eks-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="eks-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`eks-help-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="eks-help-main">
          <aside className="eks-help-toc" aria-label="Table of contents">
            <h2 className="eks-help-toc-title">Contents</h2>
            <ul className="eks-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="eks-help-content">
            <h1 className="eks-help-title-main">{pageTitle}</h1>
            <p className="eks-help-subheading">{pageSubtitle}</p>
            <p>
              This page focuses on EKS as a platform choice rather than as a marketing label: what AWS manages, what your team
              still owns, how nodes and workload identity really work, and why networking, add-ons, upgrades, and cluster
              operations matter far more than the initial cluster creation command.
            </p>
            <p>
              The title-bar minimize control returns to the previous page when possible, or to{' '}
              <Link to="/algoViz" className="eks-help-inline-link">
                /algoViz
              </Link>{' '}
              when there is no prior history entry.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="eks-help-section">
                  <h2 className="eks-help-heading">Overview</h2>
                  {bigPictureSections.map((section) => (
                    <div key={section.title}>
                      <h3 className="eks-help-subheading">{section.title}</h3>
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  ))}
                </section>
                <hr className="eks-help-divider" />
                <section id="bp-compute" className="eks-help-section">
                  <h2 className="eks-help-heading">Compute Choices</h2>
                  {computeChoices.map((item) => (
                    <div key={item.title}>
                      <h3 className="eks-help-subheading">{item.title}</h3>
                      <p>{item.summary}</p>
                      <ul>
                        {item.details.map((detail) => (
                          <li key={detail}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
                <hr className="eks-help-divider" />
                <section id="bp-flow" className="eks-help-section">
                  <h2 className="eks-help-heading">Lifecycle Flow</h2>
                  <ol>
                    {lifecycleFlow.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </section>
                <hr className="eks-help-divider" />
                <section id="bp-fit" className="eks-help-section">
                  <h2 className="eks-help-heading">When to Choose EKS</h2>
                  <ul>
                    {fitGuide.map((item) => (
                      <li key={item.title}>
                        <strong>{item.title}:</strong> {item.choice}
                      </li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                {coreConceptSections.map((section) => (
                  <section key={section.id} id={section.id} className="eks-help-section">
                    <h2 className="eks-help-heading">{section.heading}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </section>
                ))}

                <section id="core-ops" className="eks-help-section">
                  <h2 className="eks-help-heading">Operational Notes</h2>
                  {operationsNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-patterns" className="eks-help-section">
                  <h2 className="eks-help-heading">Design Patterns</h2>
                  {designPatterns.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-pitfalls" className="eks-help-section">
                  <h2 className="eks-help-heading">Common Pitfalls</h2>
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
                  <section key={example.id} id={example.id} className="eks-help-section">
                    <h2 className="eks-help-heading">{example.title}</h2>
                    <div className="eks-help-codebox">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </section>
                ))}
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="eks-help-section">
                <h2 className="eks-help-heading">Glossary</h2>
                {glossaryTerms.map((item) => (
                  <p key={item.term}>
                    <strong>{item.term}:</strong> {item.definition}
                  </p>
                ))}
                <h3 className="eks-help-subheading">Primary Source Set</h3>
                <ul>
                  {pageSources.map((source) => (
                    <li key={source}>
                      <a href={source} className="eks-help-inline-link" target="_blank" rel="noreferrer">
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
