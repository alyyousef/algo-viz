import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const pageTitle = 'AWS ECS'
const pageSubtitle = 'AWS container orchestration for tasks and services on Fargate or EC2.'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const bigPictureSections = [
  {
    title: 'What it is',
    paragraphs: [
      'Amazon Elastic Container Service, or ECS, is AWS\'s managed container orchestrator. It runs containers as tasks, maintains services at the desired count, and integrates directly with IAM, VPC networking, load balancing, and CloudWatch.',
      'ECS gives you the container scheduling model without asking you to run your own orchestrator control plane. It is usually the simplest AWS-native answer when a workload genuinely benefits from containers but does not require Kubernetes.',
    ],
  },
  {
    title: 'Where it fits',
    paragraphs: [
      'ECS fits between raw EC2 and more abstract services such as Lambda. It works well for APIs, internal services, worker fleets, cron-style tasks, and queue consumers that should ship as container images and run continuously or on demand.',
      'The same ECS application model can target different infrastructure strategies, which is one reason teams use it as a long-lived platform boundary rather than as a one-off deployment tool.',
    ],
  },
  {
    title: 'Why teams use it',
    paragraphs: [
      'Teams use ECS because it is pragmatic. Task definitions, services, autoscaling, IAM roles, logs, and load balancers map closely to how production container systems are actually operated on AWS.',
      'Compared with running everything directly on EC2, ECS improves repeatability and service lifecycle management. Compared with Kubernetes, it is usually smaller in conceptual and operational surface area.',
    ],
  },
  {
    title: 'When it is a poor fit',
    paragraphs: [
      'ECS is a poor fit when the workload does not really need containers or long-running service semantics. Some event-driven jobs belong in Lambda, and some data services belong in managed databases rather than in tasks.',
      'It is also a weaker fit when an organization already depends on Kubernetes-specific APIs, operators, or portability assumptions. ECS is deliberately AWS-native.',
    ],
  },
]

const computeChoices = [
  {
    title: 'Fargate',
    summary:
      'Best when you want AWS to manage the underlying servers and you want to think in task-level resources instead of host fleets.',
    details: [
      'Strong default for stateless services and worker systems.',
      'Reduces host patching and AMI management work.',
      'Tradeoff: less host-level control and a different cost profile than self-managed EC2 capacity.',
    ],
  },
  {
    title: 'EC2-backed ECS',
    summary:
      'Best when you need custom AMIs, denser packing, hardware-specific choices, GPUs, privileged patterns, or tighter control over cost and fleet behavior.',
    details: [
      'You own the underlying container instances.',
      'Works well for large steady-state fleets and specialized workloads.',
      'Tradeoff: more operational ownership around patching, scaling, and agent lifecycle.',
    ],
  },
  {
    title: 'Capacity providers',
    summary:
      'Best when you want the service to express which infrastructure pools should be used. Capacity providers are the modern scheduling abstraction for ECS.',
    details: [
      'Can target Fargate, Fargate Spot, or Auto Scaling group-backed EC2.',
      'Useful for mixed baseline and burst strategies.',
      'Recommended over relying only on launch type for many real deployments.',
    ],
  },
]

const lifecycleFlow = [
  'Build an image and publish it to a registry such as Amazon ECR.',
  'Register a task definition that describes containers, sizing, roles, networking, ports, logs, and health checks.',
  'Choose the infrastructure strategy through Fargate or capacity providers that map to Fargate or EC2.',
  'Run a standalone task for one-off work or create a service to maintain steady state.',
  'Attach logs, load balancing, autoscaling, alarms, and discovery so the workload behaves like a real production service.',
]

const fitGuide = [
  {
    title: 'Need container packaging with low AWS-native operational overhead',
    choice: 'Choose ECS, usually starting with Fargate.',
  },
  {
    title: 'Need containers with deep host control or specialized hardware',
    choice: 'Choose ECS on EC2.',
  },
  {
    title: 'Need Kubernetes-native APIs or operators',
    choice: 'Prefer EKS or another Kubernetes platform.',
  },
  {
    title: 'Need only simple event-driven handlers',
    choice: 'Prefer Lambda.',
  },
]

const coreConceptSections = [
  {
    id: 'core-model',
    heading: 'Cluster, Task, and Service Model',
    paragraphs: [
      'A cluster is the logical boundary where tasks and services run. A task is one running copy of a task definition. A service is the controller that maintains the desired number of tasks and replaces unhealthy ones.',
      'That distinction is foundational. One-off jobs are usually tasks. Long-running APIs, consumers, and internal backends are usually services. Good ECS design starts by being explicit about which model the workload actually needs.',
    ],
  },
  {
    id: 'core-task-definitions',
    heading: 'Task Definitions',
    paragraphs: [
      'A task definition is the deployable blueprint for the workload. It describes one or more containers, the image for each container, CPU and memory, roles, logging, port mappings, health checks, networking mode, and volumes.',
      'Task definitions should model containers that genuinely belong together. Putting unrelated independently scalable concerns into one task definition usually creates awkward coupling and poor operational behavior.',
    ],
  },
  {
    id: 'core-services',
    heading: 'Services and Deployments',
    paragraphs: [
      'An ECS service keeps the desired count running and handles rolling deployments, replacement, and interaction with health checks and load balancers. This is where ECS stops being a launch API and becomes orchestration.',
      'Deployment circuit breaker behavior matters because failed rollouts should stop and optionally roll back rather than churning forever. Service configuration is one of the main places where production correctness lives.',
    ],
  },
  {
    id: 'core-compute',
    heading: 'Launch Types and Capacity Providers',
    paragraphs: [
      'Fargate hides the host fleet. EC2-backed ECS exposes it. Capacity providers are the higher-level scheduling model that let services express which infrastructure pool should be used and in what proportion.',
      'The right choice is about responsibility as much as cost. Fargate minimizes host ownership. EC2 maximizes flexibility. Capacity providers make those choices schedulable.',
    ],
  },
  {
    id: 'core-networking',
    heading: 'Networking and `awsvpc`',
    paragraphs: [
      'In `awsvpc` mode, the task gets first-class networking behavior and containers in the task share that network stack. This is common on Fargate and also widely used on EC2-backed ECS.',
      'That model gives cleaner security-group thinking and task-level addressability, but it also means subnet IP space and ENI-related limits matter. For services behind a load balancer, `awsvpc` tasks require target groups with `ip` target type.',
    ],
  },
  {
    id: 'core-identity',
    heading: 'IAM: Task Role vs Execution Role',
    paragraphs: [
      'The task execution role is used for startup plumbing such as pulling images, sending logs, and fetching referenced secrets. The task role is the role the application code inside the task uses to call AWS APIs at runtime.',
      'Confusing those two roles is one of the most common ECS security mistakes. Infrastructure permissions and business-logic permissions should stay separated.',
    ],
  },
  {
    id: 'core-storage',
    heading: 'Storage and Stateful Workloads',
    paragraphs: [
      'Containers should usually be treated as ephemeral, but workloads still need storage decisions. Temporary scratch space may stay local to the task. Durable or shared state usually belongs in EFS, S3, databases, or other deliberately persistent services rather than in the writable container filesystem.',
      'The anti-pattern is pretending task-local mutable storage is durable application state. ECS replaces tasks as a normal part of operation, so anything that must survive replacement needs an explicit persistence strategy.',
    ],
  },
  {
    id: 'core-discovery',
    heading: 'Load Balancing, Discovery, and Service Connect',
    paragraphs: [
      'ECS services commonly sit behind an Application Load Balancer or Network Load Balancer so clients talk to a stable entry point while tasks are replaced underneath. ALBs fit HTTP-aware services. NLBs fit TCP and other lower-level patterns.',
      'For internal service-to-service traffic, Cloud Map and Service Connect provide naming and discovery patterns. The operational goal is stable service-level contracts rather than direct knowledge of individual task identities.',
    ],
  },
  {
    id: 'core-scaling',
    heading: 'Scaling, Placement, and Availability',
    paragraphs: [
      'ECS service autoscaling adjusts desired task count based on metrics such as CPU, memory, request load, or queue backlog. On EC2-backed ECS, that only works well when the host capacity can also grow or already exists.',
      'Availability depends on placement as much as replica count. Services should usually spread across multiple Availability Zones, and the surrounding subnets, IP capacity, and health settings need to support rapid replacement under churn.',
    ],
  },
  {
    id: 'core-observability',
    heading: 'Logs, Metrics, Health Checks, and ECS Exec',
    paragraphs: [
      'Observability on ECS usually starts with container logs in CloudWatch Logs, task and service metrics in CloudWatch, and health signals from both container checks and load balancers. Container health checks in the task definition are the ECS-native readiness signal for container health.',
      'ECS Exec gives a controlled way to run commands in live containers for diagnostics without SSHing to hosts. It should be used as audited diagnostic access, not as the normal deployment or configuration path.',
    ],
  },
  {
    id: 'core-security',
    heading: 'Security Posture',
    paragraphs: [
      'Security on ECS is layered across images, task roles, execution roles, networking, secret injection, and the underlying compute model. Fargate reduces host responsibility, but it does not remove the need for least-privilege IAM, private networking, image provenance, and careful secret handling.',
      'For EC2-backed ECS, host-level hardening, patching, instance-profile minimization, and agent lifecycle are still your problem. Containers are not a complete security boundary by themselves.',
    ],
  },
  {
    id: 'core-cost',
    heading: 'Performance and Cost Tradeoffs',
    paragraphs: [
      'ECS performance depends on more than replica count. CPU and memory sizing, image size, startup latency, networking mode, health-check timing, and downstream dependency behavior all influence how quickly a task becomes useful.',
      'Cost depends heavily on the compute model. Fargate simplifies operations. EC2-backed ECS can be cheaper at large scale when the team can manage hosts well. Good optimization starts with right-sizing tasks and avoiding overprovisioned steady-state replicas before chasing more advanced fleet economics.',
    ],
  },
]

const operationsNotes = [
  {
    title: 'Image hygiene',
    detail:
      'Keep images small, deterministic, and regularly rebuilt. Large images slow deployments and recovery because image pull time becomes part of scaling and rollback behavior.',
  },
  {
    title: 'Private networking',
    detail:
      'Most production ECS services should run in private subnets and use tightly controlled ingress and egress paths rather than broad public exposure.',
  },
  {
    title: 'Secret delivery',
    detail:
      'Prefer task-definition references to Secrets Manager or Systems Manager Parameter Store over baking secrets into images, repos, or environment files.',
  },
  {
    title: 'Deployment safety',
    detail:
      'Use realistic health checks, sane deployment percentages, and deployment circuit breaker behavior where supported. Fast failure is usually better than endless churn.',
  },
  {
    title: 'Capacity planning',
    detail:
      'For `awsvpc` tasks, subnet IP space and ENI-related limits can become scaling bottlenecks before CPU or memory does, especially on EC2-backed clusters.',
  },
]

const designPatterns = [
  {
    title: 'Stateless HTTP service on Fargate',
    detail:
      'A service runs behind an ALB, uses `awsvpc` networking, logs to CloudWatch, scales on traffic or CPU pressure, and keeps durable state outside the task.',
  },
  {
    title: 'Worker fleet with queue-driven scaling',
    detail:
      'Tasks consume from SQS or another queue, scale on backlog, and avoid direct user-facing traffic. This is one of the cleanest ECS workload shapes.',
  },
  {
    title: 'ECS on EC2 for dense cost-sensitive fleets',
    detail:
      'Services run on Auto Scaling group capacity providers so the team can control AMIs, packing density, Spot usage, and hardware selection while still using ECS as the orchestrator.',
  },
  {
    title: 'Service-to-service connectivity with Service Connect',
    detail:
      'Internal services communicate by short logical names inside a namespace, simplifying discovery without adopting the full operational surface of a separate service mesh.',
  },
]

const pitfalls = [
  'Treating task definitions like random JSON blobs instead of versioned deployment contracts.',
  'Confusing the task role with the task execution role and granting application permissions to the wrong place.',
  'Putting state in the container filesystem and assuming task replacement will preserve it.',
  'Forgetting that service autoscaling does not automatically solve EC2 host capacity if the cluster itself cannot grow.',
  'Using `awsvpc` everywhere without planning subnet IP space or ENI constraints.',
  'Registering load balancer target groups with `instance` target type for `awsvpc` tasks instead of `ip`.',
  'Making health checks too strict and then blaming ECS for deployment churn caused by application startup behavior.',
  'Using ECS Exec as a routine operational crutch instead of treating it as controlled diagnostic access.',
  'Building giant multi-purpose tasks that combine components which should scale or fail independently.',
]

const examples = [
  {
    id: 'ex-task-def',
    title: 'Task definition shape',
    code: `{
  "family": "orders-api",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "executionRoleArn": "arn:aws:iam::123456789012:role/ecsTaskExecutionRole",
  "taskRoleArn": "arn:aws:iam::123456789012:role/ordersTaskRole",
  "containerDefinitions": [
    {
      "name": "api",
      "image": "123456789012.dkr.ecr.us-east-1.amazonaws.com/orders:2026-03-11",
      "portMappings": [{ "containerPort": 8080 }],
      "essential": true,
      "logConfiguration": {
        "logDriver": "awslogs"
      }
    }
  ]
}`,
    explanation:
      'This captures the main ECS contract: image, sizing, runtime compatibility, networking mode, and separate execution and application roles.',
  },
  {
    id: 'ex-capacity',
    title: 'Service with capacity provider strategy',
    code: `{
  "serviceName": "orders-api",
  "desiredCount": 4,
  "capacityProviderStrategy": [
    { "capacityProvider": "FARGATE", "base": 2, "weight": 1 },
    { "capacityProvider": "FARGATE_SPOT", "weight": 2 }
  ],
  "deploymentConfiguration": {
    "deploymentCircuitBreaker": {
      "enable": true,
      "rollback": true
    }
  }
}`,
    explanation:
      'Capacity providers are the preferred way to model mixed baseline and burst strategies in modern ECS designs.',
  },
  {
    id: 'ex-awsvpc',
    title: '`awsvpc` and ALB target shape',
    code: `Client
  -> Application Load Balancer
  -> target group (target type: ip)
  -> ECS service
  -> task ENI
  -> containers in task`,
    explanation:
      'With `awsvpc`, the task is a first-class network endpoint, so the load balancer targets the task IP rather than the container host.',
  },
  {
    id: 'ex-health',
    title: 'Container health check',
    code: `{
  "healthCheck": {
    "command": [
      "CMD-SHELL",
      "curl -f http://localhost:8080/health || exit 1"
    ],
    "interval": 30,
    "timeout": 5,
    "retries": 3,
    "startPeriod": 20
  }
}`,
    explanation:
      'Health checks should reflect when the container is actually ready to do useful work. Overly aggressive checks slow deployments and increase churn.',
  },
  {
    id: 'ex-roles',
    title: 'Role boundary reminder',
    code: `execution role:
  pull image
  write logs
  fetch referenced secrets for startup

task role:
  call S3
  call DynamoDB
  publish to SQS
  read runtime secrets if application code needs them`,
    explanation:
      'Separating execution-time plumbing permissions from application permissions is one of the most important ECS security habits.',
  },
]

const glossaryTerms = [
  {
    term: 'Cluster',
    definition:
      'The logical ECS boundary where tasks and services are grouped and scheduled.',
  },
  {
    term: 'Task definition',
    definition:
      'The versioned blueprint that describes one or more containers and how they should run.',
  },
  {
    term: 'Task',
    definition:
      'One running instantiation of a task definition.',
  },
  {
    term: 'Service',
    definition:
      'The ECS controller that maintains a desired number of tasks and manages deployment and replacement.',
  },
  {
    term: 'Capacity provider',
    definition:
      'The scheduling abstraction that tells ECS which infrastructure pool should run tasks and in what proportion.',
  },
  {
    term: 'Task execution role',
    definition:
      'The IAM role used by ECS to pull images, write logs, and perform startup-related actions on your behalf.',
  },
  {
    term: 'Task role',
    definition:
      'The IAM role assumed by the application code inside the running task.',
  },
  {
    term: '`awsvpc`',
    definition:
      'The networking mode in which a task gets its own network identity and containers in that task share the task network stack.',
  },
  {
    term: 'Service Connect',
    definition:
      'An ECS feature that simplifies service-to-service connectivity and discovery using short names inside a namespace.',
  },
  {
    term: 'Deployment circuit breaker',
    definition:
      'A deployment safety feature that can fail and optionally roll back a service deployment that cannot reach steady state.',
  },
  {
    term: 'ECS Exec',
    definition:
      'A controlled mechanism for running commands in a live container for troubleshooting without opening inbound host access.',
  },
]

const pageSources = [
  'https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_services.html',
  'https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definitions.html',
  'https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service_definition_parameters.html',
  'https://docs.aws.amazon.com/AmazonECS/latest/developerguide/capacity-launch-type-comparison.html',
  'https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-networking-awsvpc.html',
  'https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_execution_IAM_role.html',
  'https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html',
  'https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-exec.html',
  'https://docs.aws.amazon.com/AmazonECS/latest/developerguide/load-balancer-healthcheck.html',
  'https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_HealthCheck.html',
  'https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-connect.html',
  'https://docs.aws.amazon.com/AmazonECS/latest/developerguide/infrastructure_IAM_role.html',
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
    { id: 'bp-fit', label: 'When to Choose ECS' },
  ],
  'core-concepts': [
    { id: 'core-model', label: 'Cluster Model' },
    { id: 'core-task-definitions', label: 'Task Definitions' },
    { id: 'core-services', label: 'Services' },
    { id: 'core-compute', label: 'Launch Types' },
    { id: 'core-networking', label: 'Networking' },
    { id: 'core-identity', label: 'IAM Roles' },
    { id: 'core-storage', label: 'Storage' },
    { id: 'core-discovery', label: 'Discovery and LB' },
    { id: 'core-scaling', label: 'Scaling' },
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

const ecsHelpStyles = `
.ecs-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.ecs-help-window {
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

.ecs-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.ecs-help-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.ecs-help-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.ecs-help-control {
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

.ecs-help-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
}

.ecs-help-tab {
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

.ecs-help-tab.active {
  position: relative;
  top: 1px;
  background: #fff;
}

.ecs-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
  border-top: 1px solid #404040;
  background: #fff;
}

.ecs-help-toc {
  overflow: auto;
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
}

.ecs-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.ecs-help-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.ecs-help-toc-list li {
  margin: 0 0 8px;
}

.ecs-help-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.ecs-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.ecs-help-title-main {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.ecs-help-section {
  margin: 0 0 20px;
}

.ecs-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.ecs-help-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.ecs-help-content p,
.ecs-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.ecs-help-content p {
  margin: 0 0 10px;
}

.ecs-help-content ul,
.ecs-help-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.ecs-help-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.ecs-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  background: #f4f4f4;
}

.ecs-help-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

.ecs-help-inline-link {
  color: #000080;
}

@media (max-width: 900px) {
  .ecs-help-main {
    grid-template-columns: 1fr;
  }

  .ecs-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}
`

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

export default function AwsEcsPage(): JSX.Element {
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
    <div className="ecs-help-page">
      <style>{ecsHelpStyles}</style>
      <div className="ecs-help-window" role="presentation">
        <header className="ecs-help-titlebar">
          <span className="ecs-help-title">{pageTitle}</span>
          <div className="ecs-help-controls">
            <button className="ecs-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="ecs-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="ecs-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`ecs-help-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="ecs-help-main">
          <aside className="ecs-help-toc" aria-label="Table of contents">
            <h2 className="ecs-help-toc-title">Contents</h2>
            <ul className="ecs-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="ecs-help-content">
            <h1 className="ecs-help-title-main">{pageTitle}</h1>
            <p className="ecs-help-subheading">{pageSubtitle}</p>
            <p>
              This page focuses on the actual operating model of ECS: how workloads are described, where they run, how services
              maintain desired state, where IAM boundaries live, and which design choices tend to determine whether an ECS system
              feels clean and boring or fragile and confusing.
            </p>
            <p>
              The title-bar minimize control returns to the previous page when possible, or to{' '}
              <Link to="/algoViz" className="ecs-help-inline-link">
                /algoViz
              </Link>{' '}
              when there is no prior history entry.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="ecs-help-section">
                  <h2 className="ecs-help-heading">Overview</h2>
                  {bigPictureSections.map((section) => (
                    <div key={section.title}>
                      <h3 className="ecs-help-subheading">{section.title}</h3>
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  ))}
                </section>
                <hr className="ecs-help-divider" />
                <section id="bp-compute" className="ecs-help-section">
                  <h2 className="ecs-help-heading">Compute Choices</h2>
                  {computeChoices.map((item) => (
                    <div key={item.title}>
                      <h3 className="ecs-help-subheading">{item.title}</h3>
                      <p>{item.summary}</p>
                      <ul>
                        {item.details.map((detail) => (
                          <li key={detail}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
                <hr className="ecs-help-divider" />
                <section id="bp-flow" className="ecs-help-section">
                  <h2 className="ecs-help-heading">Lifecycle Flow</h2>
                  <ol>
                    {lifecycleFlow.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </section>
                <hr className="ecs-help-divider" />
                <section id="bp-fit" className="ecs-help-section">
                  <h2 className="ecs-help-heading">When to Choose ECS</h2>
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
                  <section key={section.id} id={section.id} className="ecs-help-section">
                    <h2 className="ecs-help-heading">{section.heading}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </section>
                ))}

                <section id="core-ops" className="ecs-help-section">
                  <h2 className="ecs-help-heading">Operational Notes</h2>
                  {operationsNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-patterns" className="ecs-help-section">
                  <h2 className="ecs-help-heading">Design Patterns</h2>
                  {designPatterns.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-pitfalls" className="ecs-help-section">
                  <h2 className="ecs-help-heading">Common Pitfalls</h2>
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
                  <section key={example.id} id={example.id} className="ecs-help-section">
                    <h2 className="ecs-help-heading">{example.title}</h2>
                    <div className="ecs-help-codebox">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </section>
                ))}
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="ecs-help-section">
                <h2 className="ecs-help-heading">Glossary</h2>
                {glossaryTerms.map((item) => (
                  <p key={item.term}>
                    <strong>{item.term}:</strong> {item.definition}
                  </p>
                ))}
                <h3 className="ecs-help-subheading">Primary Source Set</h3>
                <ul>
                  {pageSources.map((source) => (
                    <li key={source}>
                      <a href={source} className="ecs-help-inline-link" target="_blank" rel="noreferrer">
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
