import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const pageTitle = 'ECS vs EKS'
const pageSubtitle = 'Choosing between AWS-native container orchestration and AWS-managed Kubernetes.'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const bigPictureSections = [
  {
    title: 'Same problem space',
    paragraphs: [
      'Amazon ECS and Amazon EKS both run containerized workloads on AWS. Both can back APIs, internal services, worker fleets, and scheduled jobs, and both usually integrate with VPC networking, IAM, load balancing, image registries, observability, and autoscaling.',
      'The real decision is not whether containers will run on AWS. The decision is which platform contract the team wants to operate around: the ECS task-and-service model or the Kubernetes model exposed through EKS.',
    ],
  },
  {
    title: 'Primary difference',
    paragraphs: [
      'ECS is AWS\'s own container orchestrator. It gives you tasks, services, capacity providers, IAM roles, and AWS-native integrations without asking the team to operate Kubernetes concepts such as pods, deployments, ingress controllers, admission policy, and cluster add-on compatibility.',
      'EKS is managed Kubernetes on AWS. AWS manages the Kubernetes control plane, but the team still owns node strategy, add-ons, workload identity, ingress patterns, upgrade planning, policy, observability, and the broader cluster operating model.',
    ],
  },
  {
    title: 'Why teams choose ECS',
    paragraphs: [
      'Teams choose ECS when they want containers on AWS with less conceptual surface area. ECS is usually the pragmatic answer when the workload needs container packaging and service orchestration, but does not need Kubernetes APIs, operators, Helm-centric workflows, or a Kubernetes-based internal platform.',
      'Compared with EKS, ECS usually feels smaller, more direct, and more AWS-native. That simplicity is often the reason it wins.',
    ],
  },
  {
    title: 'Why teams choose EKS',
    paragraphs: [
      'Teams choose EKS when Kubernetes is the desired platform boundary rather than just an implementation detail. EKS fits organizations that already depend on Kubernetes-native APIs, custom resources, admission controls, GitOps workflows, service mesh patterns, or internal platform abstractions built on upstream Kubernetes concepts.',
      'Compared with ECS, EKS gives a larger ecosystem and a more portable conceptual model, but it also comes with materially more platform responsibility.',
    ],
  },
  {
    title: 'The real trade',
    paragraphs: [
      'ECS usually trades away Kubernetes portability and ecosystem breadth in exchange for a smaller, more AWS-opinionated operating model. EKS usually trades away simplicity in exchange for Kubernetes standardization, richer extensibility, and alignment with cloud-native tooling.',
      'That is why the right choice depends more on team operating model, platform maturity, and required ecosystem integration than on raw feature checklists.',
    ],
  },
  {
    title: 'Short version',
    paragraphs: [
      'If the organization wants containers on AWS and does not have a strong reason to run Kubernetes, ECS is usually the more maintainable default. If the organization wants Kubernetes as a first-class platform, EKS is usually the correct AWS-native path.',
      'The mistake is treating EKS as the premium version of ECS. It is not. It is a different platform choice with a different cost, ownership, and complexity profile.',
    ],
  },
]

const decisionGuide = [
  {
    title: 'Need AWS-native containers with lower platform complexity',
    choice: 'Prefer ECS, often starting with Fargate.',
  },
  {
    title: 'Need Kubernetes-native tooling, CRDs, operators, or strong Kubernetes alignment across teams',
    choice: 'Prefer EKS.',
  },
  {
    title: 'Need container packaging but do not want to own cluster operations',
    choice: 'ECS is usually the cleaner fit.',
  },
  {
    title: 'Need one platform that matches broader Kubernetes hiring and tooling expectations',
    choice: 'EKS may justify the extra operational surface area.',
  },
  {
    title: 'Need only simple event-driven compute rather than a container platform',
    choice: 'Neither may be the best default; Lambda or another higher-level service may fit better.',
  },
  {
    title: 'Need fast onboarding for teams that mostly think in AWS services rather than Kubernetes resources',
    choice: 'Prefer ECS.',
  },
  {
    title: 'Need a platform team to build reusable abstractions on top of Kubernetes primitives',
    choice: 'Prefer EKS.',
  },
  {
    title: 'Need service mesh, admission control, CRDs, or operator-based platform behavior',
    choice: 'Prefer EKS unless those requirements are actually negotiable.',
  },
  {
    title: 'Need predictable AWS-native least-privilege patterns with less cluster-level governance work',
    choice: 'ECS is usually easier to keep disciplined.',
  },
  {
    title: 'Need broad portability of deployment concepts across cloud or on-prem Kubernetes environments',
    choice: 'Prefer EKS.',
  },
]

const lifecycleComparison = [
  'ECS flow: build an image, register a task definition, choose Fargate or EC2-backed capacity, create a service or task, then attach logs, load balancing, scaling, and IAM roles.',
  'EKS flow: create a cluster and network layout, decide how nodes or Fargate-backed pods will be supplied, manage add-ons, deploy Kubernetes manifests or Helm charts, then operate upgrades, policy, and cluster lifecycle.',
  'That difference matters because EKS does not just add more features. It adds another platform layer between the application and AWS infrastructure.',
  'In practice, ECS tends to make the service itself the center of operations. EKS tends to make the cluster and its conventions the center of operations.',
]

const decisionQuestions = [
  'Does the team explicitly need Kubernetes APIs, Helm charts, operators, CRDs, or GitOps workflows that assume Kubernetes?',
  'Is the organization staffed to own cluster upgrades, add-ons, ingress controllers, policy, and workload identity design?',
  'Will application teams benefit from Kubernetes portability, or is the workload expected to stay deeply AWS-native?',
  'Would the team rather reason in terms of tasks and services, or in terms of pods, deployments, services, ingress, and cluster controllers?',
  'Is the platform team trying to standardize many teams around Kubernetes, or is it trying to make AWS-native service delivery simpler and smaller?',
  'If EKS were removed as an option, would the workload actually become impossible, or merely less fashionable?',
]

const coreConceptSections = [
  {
    id: 'core-platform-boundary',
    heading: 'Platform Boundary',
    paragraphs: [
      'ECS exposes an AWS-native orchestration model built around task definitions, running tasks, services, capacity providers, load balancers, and IAM roles. The team mostly reasons in terms of application workloads and AWS infrastructure contracts.',
      'EKS exposes Kubernetes as the platform boundary. The team reasons in terms of pods, deployments, services, ingress, storage classes, cluster add-ons, and workload identity mechanisms such as IRSA or Pod Identity. That gives more flexibility and ecosystem reach, but also more surface area to govern.',
    ],
  },
  {
    id: 'core-control-plane',
    heading: 'Control Plane and Ownership',
    paragraphs: [
      'With ECS, the orchestration control plane is abstracted behind AWS service APIs. You still design the workload and capacity model, but you are not managing Kubernetes control-plane behavior or the compatibility of cluster components.',
      'With EKS, AWS manages the Kubernetes control plane, not the whole platform. Node supply, add-ons, ingress controllers, storage drivers, cluster policies, namespace structure, and upgrade sequencing remain your problem.',
    ],
  },
  {
    id: 'core-workload-model',
    heading: 'Workload Model',
    paragraphs: [
      'In ECS, one-off jobs are usually tasks and long-running applications are usually services. The contract is explicit and direct. Task definitions describe the deployable workload, and services keep the desired count healthy and replace failed tasks.',
      'In EKS, workloads are usually expressed through Kubernetes deployments, daemon sets, stateful sets, jobs, services, and ingress resources. That model is more expressive, but it asks the team to understand more control loops and more ways for configuration layers to interact.',
    ],
  },
  {
    id: 'core-application-shape',
    heading: 'How Application Design Feels Different',
    paragraphs: [
      'ECS encourages applications to map fairly directly onto AWS deployment concerns. A service has tasks, load balancing, autoscaling, IAM roles, logs, and health checks. That shape is intentionally practical and usually easy to explain to teams that are already comfortable with AWS.',
      'EKS encourages applications to fit into a Kubernetes platform model. That can be valuable because every workload follows shared Kubernetes conventions, but it also means application delivery becomes coupled to cluster conventions, admission policies, sidecars, chart structure, service exposure patterns, and namespace or RBAC design.',
    ],
  },
  {
    id: 'core-compute',
    heading: 'Compute and Scheduling',
    paragraphs: [
      'ECS can run on Fargate or on EC2-backed container instances, often through capacity providers. The scheduling model is comparatively direct: define the service, define the capacity path, and let ECS maintain the desired count.',
      'EKS can run on managed node groups, self-managed nodes, Karpenter-provisioned nodes, Fargate profiles, or a mix. Kubernetes scheduling adds requests and limits, taints and tolerations, topology spread, affinity, and the need for a clear node-supply owner. The model is more capable, but it is not smaller.',
    ],
  },
  {
    id: 'core-scaling',
    heading: 'Scaling and Capacity Signals',
    paragraphs: [
      'ECS scaling usually feels more service-centric. Desired task count rises or falls based on application metrics or queue depth, and capacity providers or Fargate supply the runtime. The main failure mode is usually insufficient capacity or bad health signaling, not a complicated multi-controller interaction.',
      'EKS scaling is split across workload scaling and node scaling. Horizontal Pod Autoscaler, Karpenter, Cluster Autoscaler, requests and limits, pending pods, disruption budgets, and topology preferences can all interact. That can support sophisticated platforms, but it also creates more ways to misconfigure capacity behavior.',
    ],
  },
  {
    id: 'core-networking',
    heading: 'Networking Model',
    paragraphs: [
      'ECS networking is commonly straightforward from an AWS point of view. In `awsvpc` mode, tasks are first-class network endpoints and fit naturally into VPC and security-group thinking.',
      'EKS networking on AWS is strongly shaped by the VPC CNI and by Kubernetes service abstractions. Pod IP consumption, subnet planning, service exposure, ingress controllers, and load balancer integration are more involved, especially as clusters scale and teams add platform features.',
    ],
  },
  {
    id: 'core-traffic',
    heading: 'Traffic, Discovery, and Edge Routing',
    paragraphs: [
      'ECS commonly exposes services through an Application Load Balancer or Network Load Balancer, with service discovery through Cloud Map or Service Connect when needed. This usually keeps the traffic path close to AWS-native constructs and makes the request path relatively easy to audit.',
      'EKS usually routes traffic through Kubernetes Services and often through an ingress or gateway layer managed by controllers. This creates stronger platform standardization, but the path from client to pod usually involves more abstractions, more controllers, and more configuration surfaces.',
    ],
  },
  {
    id: 'core-identity',
    heading: 'Identity and Permissions',
    paragraphs: [
      'ECS draws a clean line between the task execution role and the task role. The execution role handles startup plumbing such as pulling images and writing logs. The task role is for the application code inside the container.',
      'EKS identity is more layered. The cluster has node roles, Kubernetes RBAC, and workload-level AWS permissions through IRSA or Pod Identity. That flexibility is powerful, but it means a weak permission model can spread across both AWS and Kubernetes boundaries at once.',
    ],
  },
  {
    id: 'core-security',
    heading: 'Security Posture',
    paragraphs: [
      'Both ECS and EKS require strong image hygiene, least-privilege access, private networking, careful secret handling, and good observability. The difference is that EKS adds an entire Kubernetes security domain on top: RBAC, admission policy, controller permissions, cluster-scoped resources, and workload policy become part of the attack surface.',
      'ECS security is usually easier to keep mentally small because there are fewer platform layers. EKS can absolutely be secure, but it demands more governance discipline and better ownership boundaries to stay that way.',
    ],
  },
  {
    id: 'core-state',
    heading: 'Stateful Workloads and Persistence',
    paragraphs: [
      'ECS generally pushes teams toward a straightforward rule: keep durable state outside the task unless there is a very deliberate storage plan. That tends to encourage cleaner service boundaries and greater use of managed data services.',
      'EKS can support more sophisticated in-cluster stateful patterns through StatefulSets, CSI drivers, storage classes, operators, and Kubernetes-native data tooling. That flexibility is real, but many teams pay for it with operational fragility if they run stateful systems in Kubernetes without strong platform competence.',
    ],
  },
  {
    id: 'core-deployments',
    heading: 'Deployments and Release Workflow',
    paragraphs: [
      'ECS deployments usually feel closer to the application service itself. A new task definition revision is rolled out through the service, health checks determine progress, and deployment circuit breaker behavior can stop bad releases.',
      'EKS deployments are mediated through Kubernetes controllers, manifests, charts, and often additional tooling such as GitOps agents, admission policy, or custom controllers. This can create a more standardized platform, but it also means there are more layers between a code change and a healthy production rollout.',
    ],
  },
  {
    id: 'core-observability',
    heading: 'Observability and Debugging',
    paragraphs: [
      'ECS debugging usually centers on task health, service events, container logs, load balancer health, IAM behavior, and the capacity path. That is still real operational work, but teams are usually dealing with a comparatively small number of layers.',
      'EKS debugging often spans application code, pod events, scheduling constraints, node health, add-ons, ingress controllers, admission webhooks, DNS, CNI behavior, IAM integration, and Kubernetes controller state. This is one of the biggest practical reasons EKS needs stronger platform ownership.',
    ],
  },
  {
    id: 'core-operations',
    heading: 'Operations and Upgrades',
    paragraphs: [
      'ECS operations center on task sizing, networking, IAM boundaries, image hygiene, logs, health checks, load balancers, and host management if EC2-backed capacity is used. The operational story is still real, but it is more constrained.',
      'EKS operations include those concerns plus Kubernetes version management, node rotation, add-on compatibility, controller behavior, admission policies, storage drivers, cluster access, and platform ownership boundaries. The phrase managed Kubernetes often hides how much day-two work still exists.',
    ],
  },
  {
    id: 'core-team-model',
    heading: 'Team Topology and Platform Ownership',
    paragraphs: [
      'ECS often works well when teams are application-first and want infrastructure that stays close to AWS concepts. A small platform or DevOps function can usually support multiple ECS services without needing to run a full Kubernetes program.',
      'EKS works best when the organization is intentionally investing in a platform team. Someone has to own cluster standards, workload identity patterns, ingress and networking strategy, controller selection, namespace conventions, upgrade policy, and production access controls. If nobody clearly owns those things, EKS degrades quickly.',
    ],
  },
  {
    id: 'core-portability',
    heading: 'Portability and Ecosystem Reality',
    paragraphs: [
      'ECS is deliberately AWS-native. That is a strength when the team wants to optimize for AWS simplicity and integration, and a limitation when the organization expects Kubernetes portability of tooling and platform patterns.',
      'EKS provides portability of Kubernetes concepts more than portability of the full system. In practice, real EKS platforms still depend heavily on AWS networking, IAM, storage, and load-balancer integrations, but they remain much closer to the broader cloud-native ecosystem than ECS does.',
    ],
  },
  {
    id: 'core-cost',
    heading: 'Cost and Team Fit',
    paragraphs: [
      'ECS often wins when a team wants to spend less engineering energy on platform operations. Fargate-backed ECS can cost more than dense EC2 strategies, but many teams save enough operational effort that the trade is still rational.',
      'EKS cost is not just the control-plane fee or worker-node bill. It also includes the time spent on cluster lifecycle, add-ons, observability, access governance, upgrades, and platform conventions. If the organization does not need Kubernetes capabilities, that overhead is usually avoidable.',
    ],
  },
  {
    id: 'core-migration',
    heading: 'Migration and Long-Term Direction',
    paragraphs: [
      'Migrating from ECS to EKS is rarely just a runtime swap. It usually means changing deployment format, operational tooling, identity patterns, service exposure, autoscaling assumptions, and team workflows. The application may stay containerized, but the platform contract changes significantly.',
      'Migrating from EKS to ECS usually means giving up some Kubernetes-native abstractions in exchange for a smaller and often more opinionated operational model. That can be the right move when teams conclude they do not actually need Kubernetes for the workloads they run.',
    ],
  },
]

const operatingNotes = [
  {
    title: 'ECS tends to be the simpler default',
    detail:
      'If a team is choosing between ECS and EKS with no strong Kubernetes requirement, ECS is usually the smaller and more maintainable answer on AWS.',
  },
  {
    title: 'EKS should be chosen for clear platform reasons',
    detail:
      'Use EKS because Kubernetes APIs, ecosystem tooling, or platform conventions matter, not because it sounds more modern.',
  },
  {
    title: 'Fargate does not erase the difference',
    detail:
      'Both ECS and EKS can use Fargate in some forms, but that does not make their operating models equivalent. ECS on Fargate is still ECS. EKS with Fargate is still Kubernetes.',
  },
  {
    title: 'Identity design matters in both',
    detail:
      'ECS task roles and EKS workload identity both exist to avoid broad infrastructure-level permissions. Teams should treat that boundary as a first-class design concern.',
  },
  {
    title: 'Networking becomes more visible on EKS sooner',
    detail:
      'Both platforms depend on VPC design, but EKS usually exposes more networking complexity because pod networking, service exposure, and cluster add-ons all participate in the platform story.',
  },
  {
    title: 'Portability is often overstated',
    detail:
      'EKS gives meaningful Kubernetes portability, but real EKS systems still depend on AWS-specific identity, networking, storage, and ingress integrations. Portability is higher than ECS, not absolute.',
  },
  {
    title: 'Operational boredom is a feature',
    detail:
      'If the workload does not benefit from Kubernetes-specific capabilities, the simpler platform is often the better engineering decision because it leaves more time for application quality and less time for platform ceremony.',
  },
  {
    title: 'The strongest answer can differ by organization',
    detail:
      'A company with an established Kubernetes platform team may rationally standardize on EKS. A company optimizing for small-team efficiency on AWS may rationally standardize on ECS. Context matters more than ideology.',
  },
]

const workloadFitCases = [
  {
    title: 'Stateless APIs and internal backends',
    detail:
      'Both ECS and EKS can run these well. ECS usually wins when the service only needs reliable container deployment, autoscaling, and AWS integrations. EKS usually wins when the service must live inside a larger Kubernetes platform with shared policy and tooling.',
  },
  {
    title: 'Queue consumers and worker fleets',
    detail:
      'ECS is often an excellent fit because the model is simple and maps cleanly to background processing. EKS becomes attractive when the worker system depends on broader Kubernetes-native scheduling or platform conventions.',
  },
  {
    title: 'Multi-team internal platform',
    detail:
      'EKS is often stronger when the goal is to provide namespaces, policy, shared controllers, GitOps workflows, and Kubernetes-native self-service to many teams. ECS can support many services, but it is less naturally a general-purpose application platform.',
  },
  {
    title: 'Stateful or operator-driven platforms',
    detail:
      'EKS usually offers more expressiveness when workloads depend on operators, CRDs, or Kubernetes-native storage and control loops. That advantage only matters if the team can operate those systems safely.',
  },
  {
    title: 'Small teams shipping AWS-native products',
    detail:
      'ECS is commonly the better fit because it reduces platform tax. The smaller model is usually easier to keep healthy with limited staff.',
  },
]

const pitfalls = [
  'Choosing EKS because Kubernetes is fashionable rather than because Kubernetes capabilities are actually required.',
  'Choosing ECS and then expecting Kubernetes-native APIs, operators, or Helm-driven platform patterns to exist there.',
  'Treating ECS and EKS as interchangeable just because both run containers on AWS.',
  'Underestimating the operational difference between managing an application platform and managing a Kubernetes platform.',
  'Using broad node-level or infrastructure-level permissions instead of workload-scoped identity.',
  'Ignoring subnet and IP planning, especially when EKS pod networking scales faster than the original network design.',
  'Assuming Fargate removes all operational responsibility regardless of whether the platform is ECS or EKS.',
  'Running EKS without a clear owner for add-ons, controller selection, cluster access, and upgrade policy.',
  'Treating ECS as if it should replicate every Kubernetes platform feature instead of valuing it for being smaller and more direct.',
  'Believing the control-plane management in EKS removes the need for strong observability and incident response discipline.',
]

const examples = [
  {
    id: 'ex-ecs-shape',
    title: 'ECS service shape',
    code: `{
  "family": "orders-api",
  "requiresCompatibilities": ["FARGATE"],
  "networkMode": "awsvpc",
  "cpu": "512",
  "memory": "1024",
  "executionRoleArn": "arn:aws:iam::123456789012:role/ecsTaskExecutionRole",
  "taskRoleArn": "arn:aws:iam::123456789012:role/ordersTaskRole",
  "containerDefinitions": [
    {
      "name": "api",
      "image": "123456789012.dkr.ecr.us-east-1.amazonaws.com/orders:2026-03-11",
      "portMappings": [{ "containerPort": 8080 }]
    }
  ]
}`,
    explanation:
      'ECS centers the workload contract on a task definition plus a service that maintains desired count and rollout behavior.',
  },
  {
    id: 'ex-eks-shape',
    title: 'EKS workload shape',
    code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: orders-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: orders-api
  template:
    metadata:
      labels:
        app: orders-api
    spec:
      serviceAccountName: orders-api
      containers:
        - name: api
          image: 123456789012.dkr.ecr.us-east-1.amazonaws.com/orders:2026-03-11
          ports:
            - containerPort: 8080`,
    explanation:
      'EKS expresses the workload through Kubernetes resources. That opens the Kubernetes ecosystem, but it also introduces more controllers and more platform conventions.',
  },
  {
    id: 'ex-identity',
    title: 'Identity boundary comparison',
    code: `ECS:
execution role
  -> image pull, logs, startup plumbing
task role
  -> application AWS API access

EKS:
node role
  -> node and cluster plumbing
service account + IRSA / Pod Identity
  -> workload AWS API access
RBAC
  -> Kubernetes API permissions`,
    explanation:
      'Both platforms can provide workload-scoped access, but EKS has more identity layers to design and audit.',
  },
  {
    id: 'ex-scaling',
    title: 'Scaling mental model comparison',
    code: `ECS:
service desired count
  -> task placement
  -> Fargate or EC2-backed capacity

EKS:
Deployment replicas
  -> scheduler places pods
  -> node autoscaling supplies capacity
  -> controllers and resource requests influence success`,
    explanation:
      'ECS scaling is usually more direct. EKS scaling is more composable, but that also means more moving parts.',
  },
  {
    id: 'ex-traffic',
    title: 'Traffic path comparison',
    code: `ECS:
Client
  -> ALB or NLB
  -> ECS service
  -> task ENI
  -> containers

EKS:
Client
  -> load balancer integration
  -> Ingress / Service
  -> pods
  -> node or Fargate-backed pod capacity`,
    explanation:
      'Both platforms can present a stable service endpoint, but EKS usually introduces more abstractions between the client and the workload.',
  },
  {
    id: 'ex-migration',
    title: 'Rough concept mapping',
    code: `ECS concept               -> EKS concept
task definition           -> pod template / workload manifest
service (desired tasks)   -> Deployment / StatefulSet / Job
capacity provider         -> node group / autoscaler strategy
task role                 -> service account + workload identity
ALB or NLB integration    -> ingress/controller-managed exposure`,
    explanation:
      'There is overlap in purpose, but the abstractions are not one-to-one. Migration changes the operational model, not just syntax.',
  },
  {
    id: 'ex-decision',
    title: 'Decision shortcut',
    code: `Need containers on AWS with less platform surface area?
  -> ECS

Need Kubernetes APIs, operators, CRDs, GitOps-heavy cluster workflows, or platform standardization around Kubernetes?
  -> EKS

No strong need for either container platform?
  -> Reconsider the platform choice`,
    explanation:
      'The highest-signal decision question is whether the organization actually wants Kubernetes as a platform boundary.',
  },
]

const glossaryTerms = [
  {
    term: 'ECS',
    definition:
      'Amazon Elastic Container Service, AWS\'s native container orchestrator built around tasks, services, and AWS-integrated operations.',
  },
  {
    term: 'EKS',
    definition:
      'Amazon Elastic Kubernetes Service, AWS managed Kubernetes offering with AWS-operated control plane and customer-owned platform operations around it.',
  },
  {
    term: 'Task definition',
    definition:
      'The ECS blueprint that describes containers, sizing, roles, networking, logging, and runtime behavior.',
  },
  {
    term: 'Service',
    definition:
      'A stable workload abstraction used in both worlds, but with different meanings: an ECS service maintains running tasks, while a Kubernetes Service exposes a stable network contract for pods.',
  },
  {
    term: 'Capacity provider',
    definition:
      'The ECS scheduling abstraction that tells ECS which infrastructure pool should run tasks and in what proportion.',
  },
  {
    term: 'Managed node group',
    definition:
      'An EKS-managed worker-node lifecycle model for EC2-backed Kubernetes nodes.',
  },
  {
    term: 'IRSA',
    definition:
      'IAM Roles for Service Accounts, a common EKS mechanism for mapping AWS permissions to Kubernetes service accounts.',
  },
  {
    term: 'Pod Identity',
    definition:
      'An AWS-managed EKS mechanism for associating IAM roles with Kubernetes service accounts for workload-scoped AWS access.',
  },
  {
    term: '`awsvpc`',
    definition:
      'The ECS networking mode in which a task gets its own network identity and containers in that task share the task network stack.',
  },
  {
    term: 'Ingress',
    definition:
      'A Kubernetes traffic-management abstraction commonly used on EKS to expose HTTP or HTTPS services through controller-managed load balancer integrations.',
  },
  {
    term: 'Fargate',
    definition:
      'AWS serverless container compute that can back ECS tasks directly and can also run selected EKS pods, while leaving the higher-level orchestration model unchanged.',
  },
  {
    term: 'Karpenter',
    definition:
      'A Kubernetes node provisioning system commonly used with EKS to add or consolidate worker capacity based on pending pod demand.',
  },
  {
    term: 'Service Connect',
    definition:
      'An ECS capability for service-to-service connectivity and discovery using logical service names inside an ECS environment.',
  },
  {
    term: 'CRD',
    definition:
      'Custom Resource Definition, a Kubernetes extension mechanism that lets platforms introduce new API types and controllers. This is a major reason some teams need EKS rather than ECS.',
  },
  {
    term: 'Managed control plane',
    definition:
      'In EKS, AWS operates the Kubernetes control plane. It does not mean AWS operates your cluster add-ons, workload design, policies, or platform conventions for you.',
  },
]

const pageSources = [
  'https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_services.html',
  'https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definitions.html',
  'https://docs.aws.amazon.com/AmazonECS/latest/developerguide/capacity-launch-type-comparison.html',
  'https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-networking-awsvpc.html',
  'https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_execution_IAM_role.html',
  'https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html',
  'https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-connect.html',
  'https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html',
  'https://docs.aws.amazon.com/eks/latest/userguide/managed-node-groups.html',
  'https://docs.aws.amazon.com/eks/latest/userguide/eks-compute.html',
  'https://docs.aws.amazon.com/eks/latest/userguide/managing-vpc-cni.html',
  'https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html',
  'https://docs.aws.amazon.com/eks/latest/userguide/security-iam-eks-pod-identities.html',
  'https://docs.aws.amazon.com/eks/latest/userguide/eks-add-ons.html',
  'https://docs.aws.amazon.com/eks/latest/userguide/update-cluster.html',
  'https://docs.aws.amazon.com/pdfs/decision-guides/latest/containers-on-aws-how-to-choose/containers-on-aws-how-to-choose.pdf',
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
    { id: 'bp-decision', label: 'Decision Guide' },
    { id: 'bp-lifecycle', label: 'Lifecycle Comparison' },
    { id: 'bp-questions', label: 'Decision Questions' },
  ],
  'core-concepts': [
    { id: 'core-platform-boundary', label: 'Platform Boundary' },
    { id: 'core-control-plane', label: 'Control Plane' },
    { id: 'core-workload-model', label: 'Workload Model' },
    { id: 'core-application-shape', label: 'Application Shape' },
    { id: 'core-compute', label: 'Compute and Scheduling' },
    { id: 'core-scaling', label: 'Scaling' },
    { id: 'core-networking', label: 'Networking' },
    { id: 'core-traffic', label: 'Traffic and Discovery' },
    { id: 'core-identity', label: 'Identity' },
    { id: 'core-security', label: 'Security' },
    { id: 'core-state', label: 'Stateful Workloads' },
    { id: 'core-deployments', label: 'Deployments' },
    { id: 'core-observability', label: 'Observability' },
    { id: 'core-operations', label: 'Operations' },
    { id: 'core-team-model', label: 'Team Model' },
    { id: 'core-portability', label: 'Portability' },
    { id: 'core-cost', label: 'Cost and Team Fit' },
    { id: 'core-migration', label: 'Migration' },
    { id: 'core-notes', label: 'Operating Notes' },
    { id: 'core-workload-fit', label: 'Workload Fit' },
    { id: 'core-pitfalls', label: 'Pitfalls' },
  ],
  examples: examples.map((example) => ({
    id: example.id,
    label: example.title,
  })),
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

const ecsVsEksHelpStyles = `
.ecs-vs-eks-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.ecs-vs-eks-help-window {
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  background: #c0c0c0;
  width: 100%;
  min-height: 100dvh;
  margin: 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.ecs-vs-eks-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.ecs-vs-eks-help-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.ecs-vs-eks-help-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.ecs-vs-eks-help-control {
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

.ecs-vs-eks-help-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
}

.ecs-vs-eks-help-tab {
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

.ecs-vs-eks-help-tab.active {
  background: #fff;
  position: relative;
  top: 1px;
}

.ecs-vs-eks-help-main {
  border-top: 1px solid #404040;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.ecs-vs-eks-help-toc {
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
  overflow: auto;
}

.ecs-vs-eks-help-toc-title {
  font-size: 12px;
  font-weight: 700;
  margin: 0 0 10px;
}

.ecs-vs-eks-help-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.ecs-vs-eks-help-toc-list li {
  margin: 0 0 8px;
}

.ecs-vs-eks-help-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.ecs-vs-eks-help-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.ecs-vs-eks-help-doc-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px;
}

.ecs-vs-eks-help-section {
  margin: 0 0 20px;
}

.ecs-vs-eks-help-heading {
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 8px;
}

.ecs-vs-eks-help-subheading {
  font-size: 13px;
  font-weight: 700;
  margin: 0 0 6px;
}

.ecs-vs-eks-help-content p,
.ecs-vs-eks-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.ecs-vs-eks-help-content p {
  margin: 0 0 10px;
}

.ecs-vs-eks-help-content ul,
.ecs-vs-eks-help-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.ecs-vs-eks-help-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.ecs-vs-eks-help-codebox {
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  padding: 8px;
  margin: 6px 0 10px;
}

.ecs-vs-eks-help-codebox code {
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
  display: block;
}

.ecs-vs-eks-help-inline-link {
  color: #000080;
}

@media (max-width: 900px) {
  .ecs-vs-eks-help-main {
    grid-template-columns: 1fr;
  }

  .ecs-vs-eks-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .ecs-vs-eks-help-title-text {
    position: static;
    transform: none;
    margin-left: 8px;
    font-size: 14px;
  }
}
`

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

export default function EcsVsEksPage(): JSX.Element {
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
    <div className="ecs-vs-eks-help-page">
      <style>{ecsVsEksHelpStyles}</style>
      <div className="ecs-vs-eks-help-window" role="presentation">
        <header className="ecs-vs-eks-help-titlebar">
          <span className="ecs-vs-eks-help-title-text">{pageTitle}</span>
          <div className="ecs-vs-eks-help-title-controls">
            <button
              className="ecs-vs-eks-help-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="ecs-vs-eks-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="ecs-vs-eks-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`ecs-vs-eks-help-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="ecs-vs-eks-help-main">
          <aside className="ecs-vs-eks-help-toc" aria-label="Table of contents">
            <h2 className="ecs-vs-eks-help-toc-title">Contents</h2>
            <ul className="ecs-vs-eks-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="ecs-vs-eks-help-content">
            <h1 className="ecs-vs-eks-help-doc-title">{pageTitle}</h1>
            <p className="ecs-vs-eks-help-subheading">{pageSubtitle}</p>
            <p>
              This page compares ECS and EKS as platform choices rather than as marketing labels. The key question is whether the
              team wants the smaller ECS operating model or wants Kubernetes itself to be the application platform on AWS.
            </p>
            <p>
              The title-bar minimize control returns to the previous page when possible, or to{' '}
              <Link to="/algoViz" className="ecs-vs-eks-help-inline-link">
                /algoViz
              </Link>{' '}
              when there is no prior history entry.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="ecs-vs-eks-help-section">
                  <h2 className="ecs-vs-eks-help-heading">Overview</h2>
                  {bigPictureSections.map((section) => (
                    <div key={section.title}>
                      <h3 className="ecs-vs-eks-help-subheading">{section.title}</h3>
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  ))}
                </section>
                <hr className="ecs-vs-eks-help-divider" />
                <section id="bp-decision" className="ecs-vs-eks-help-section">
                  <h2 className="ecs-vs-eks-help-heading">Decision Guide</h2>
                  <ul>
                    {decisionGuide.map((item) => (
                      <li key={item.title}>
                        <strong>{item.title}:</strong> {item.choice}
                      </li>
                    ))}
                  </ul>
                </section>
                <hr className="ecs-vs-eks-help-divider" />
                <section id="bp-lifecycle" className="ecs-vs-eks-help-section">
                  <h2 className="ecs-vs-eks-help-heading">Lifecycle Comparison</h2>
                  <ul>
                    {lifecycleComparison.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <hr className="ecs-vs-eks-help-divider" />
                <section id="bp-questions" className="ecs-vs-eks-help-section">
                  <h2 className="ecs-vs-eks-help-heading">Decision Questions</h2>
                  <ul>
                    {decisionQuestions.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                {coreConceptSections.map((section) => (
                  <section key={section.id} id={section.id} className="ecs-vs-eks-help-section">
                    <h2 className="ecs-vs-eks-help-heading">{section.heading}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </section>
                ))}

                <section id="core-notes" className="ecs-vs-eks-help-section">
                  <h2 className="ecs-vs-eks-help-heading">Operating Notes</h2>
                  {operatingNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-workload-fit" className="ecs-vs-eks-help-section">
                  <h2 className="ecs-vs-eks-help-heading">Workload Fit by Scenario</h2>
                  {workloadFitCases.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-pitfalls" className="ecs-vs-eks-help-section">
                  <h2 className="ecs-vs-eks-help-heading">Common Pitfalls</h2>
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
                  <section key={example.id} id={example.id} className="ecs-vs-eks-help-section">
                    <h2 className="ecs-vs-eks-help-heading">{example.title}</h2>
                    <div className="ecs-vs-eks-help-codebox">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </section>
                ))}
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="ecs-vs-eks-help-section">
                <h2 className="ecs-vs-eks-help-heading">Glossary</h2>
                {glossaryTerms.map((item) => (
                  <p key={item.term}>
                    <strong>{item.term}:</strong> {item.definition}
                  </p>
                ))}
                <h3 className="ecs-vs-eks-help-subheading">Primary Source Set</h3>
                <ul>
                  {pageSources.map((source) => (
                    <li key={source}>
                      <a href={source} className="ecs-vs-eks-help-inline-link" target="_blank" rel="noreferrer">
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
