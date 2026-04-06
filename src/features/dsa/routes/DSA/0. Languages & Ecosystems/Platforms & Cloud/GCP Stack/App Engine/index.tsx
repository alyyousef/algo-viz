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

const pageTitle = 'GCP App Engine'
const pageSubtitle =
  'Managed platform-as-a-service for deploying web applications and APIs with versioned rollouts, built-in scaling, and Google Cloud integrations.'

const introParagraphs = [
  'Google Cloud App Engine is a managed platform-as-a-service for running web applications, APIs, and background processing with minimal infrastructure management. It handles deployment packaging, request routing, instance management, scaling behavior, logging integration, and versioned traffic control so application teams can focus more on code and less on server lifecycle.',
  'The service is best understood as an opinionated application platform, not as raw container orchestration and not as a general-purpose VM product. It gives developers a deployment model centered on services, versions, scaling policies, and runtime environments rather than hosts, nodes, or Kubernetes objects.',
  'This page treats App Engine as a platform topic: standard versus flexible environments, services and versions, scaling models, app.yaml configuration, traffic splitting, networking, identity and IAM, observability, deployment patterns, cost shape, migration tradeoffs, and the design choices that determine when App Engine is the right GCP application platform and when another Google Cloud runtime is a better fit.',
]

const bigPictureSections: Array<{ title: string; paragraphs: string[] }> = [
  {
    title: 'What it is',
    paragraphs: [
      "App Engine is Google Cloud's long-standing managed application platform. You deploy application code or a containerized runtime definition, and Google runs the service under an App Engine application boundary associated with a region in the Google Cloud project. Requests arrive through App Engine routing, instances are managed automatically, and versions can receive traffic independently.",
      'The distinguishing idea is that App Engine is application-centric. Instead of reasoning first about infrastructure resources, teams work with services, versions, scaling settings, instance classes, and traffic allocation. This can substantially simplify operations for web workloads that fit the platform model.',
    ],
  },
  {
    title: 'Why teams use it',
    paragraphs: [
      'Teams use App Engine when they want a strongly managed deployment surface with integrated autoscaling, versioned rollouts, and minimal infrastructure ownership. It is especially attractive for classic web applications, internal tools, APIs, and long-lived application stacks that benefit from stable managed deployment rather than deep container orchestration control.',
      'It is also useful when organizations value easy traffic splitting, per-version deployment, simple rollback, and managed integration with Google Cloud logging, monitoring, IAM, and networking. App Engine can be a strong fit when the operational goal is to run application services cleanly rather than to customize every layer of the runtime stack.',
    ],
  },
  {
    title: 'How to think about it',
    paragraphs: [
      'The right mental model is managed application hosting with two execution environments: standard and flexible. Standard is more constrained but can scale very quickly and, in many cases, down to zero. Flexible is more customizable, runs on Compute Engine VMs with Docker containers, and behaves more like managed container hosting with slower scale characteristics and higher baseline cost.',
      'A healthy design starts with workload shape, runtime constraints, startup profile, traffic pattern, need for custom system packages, VPC access, deployment cadence, and latency expectations during rollout. Teams that choose an environment only because it sounds more powerful often end up paying for flexibility they do not need or fighting standard environment constraints they should have evaluated earlier.',
    ],
  },
  {
    title: 'Platform direction and current guidance',
    paragraphs: [
      'Current Google Cloud documentation emphasizes environment choice more explicitly than older App Engine material. Standard environment is positioned for strongly managed supported runtimes and rapid scaling behavior, while flexible environment is positioned for Docker-based customization, broader runtime freedom, and gradual scaling on Compute Engine infrastructure.',
      'As of documentation current on March 13, 2026, Google also highlights operational details that materially affect design, such as the standard environment default `max_instances` setting of 20 for new projects created after March 2025, and the fact that gradual traffic migration is not supported in the flexible environment. These details are not cosmetic. They directly shape scaling and release strategy.',
    ],
  },
  {
    title: 'What changed recently',
    paragraphs: [
      'Recent Google Cloud documentation continues to clarify the differences between standard and flexible environments, especially around scaling behavior, request handling, and deployment rollout mechanics. The standard environment documentation now explicitly calls out the March 2025 default maximum instances change for new projects, which matters for teams expecting historical scaling defaults.',
      'The flexible environment material also continues to stress its Compute Engine and Docker basis, the ability to customize runtimes, and operational behaviors such as always having at least one instance per active version. That distinction remains central when designing cost-sensitive or scale-to-zero style workloads.',
    ],
  },
]

const operatingModelGuide = [
  {
    title: 'Application is the regional root',
    detail:
      'An App Engine application is created in a specific region within a Google Cloud project and becomes the root deployment boundary for App Engine services in that project.',
  },
  {
    title: 'Service is the deployable application component',
    detail:
      'An App Engine app can contain multiple services, each with its own runtime configuration, scaling settings, and versions.',
  },
  {
    title: 'Version is the release unit',
    detail:
      'Each deployment creates a version that can receive all, some, or none of the service traffic, which enables staged rollout and rollback patterns.',
  },
  {
    title: 'Environment defines execution tradeoffs',
    detail:
      'Standard and flexible environments differ in runtime constraints, scaling speed, customization, baseline cost, and operational behavior.',
  },
  {
    title: 'app.yaml is the behavioral contract',
    detail:
      'The app.yaml file defines runtime, scaling settings, handlers, environment variables, networking hints, and other deployment-level behavior for a service version.',
  },
  {
    title: 'Traffic allocation is a first-class release control',
    detail:
      'Traffic can be routed between versions to support canaries, rollbacks, and controlled rollout, subject to environment-specific behavior differences.',
  },
]

const fitGuide = [
  {
    title: 'Need managed deployment for web apps or APIs with minimal infrastructure ownership',
    choice: 'App Engine is a strong fit.',
  },
  {
    title: 'Need rapid scale behavior and strong platform opinionation',
    choice: 'The standard environment may be a strong fit.',
  },
  {
    title: 'Need custom runtimes, Docker-level customization, or SSH-accessible VM behavior',
    choice: 'The flexible environment may be the right App Engine choice.',
  },
  {
    title: 'Need container-first serverless behavior with newer platform ergonomics',
    choice: 'Cloud Run may be a better fit than App Engine for some workloads.',
  },
  {
    title: 'Need full Kubernetes control or complex service mesh behavior',
    choice: 'GKE is usually a better fit than App Engine.',
  },
  {
    title: 'Need operating system and machine-level control',
    choice: 'Compute Engine is a better fit than App Engine.',
  },
]

const keyTakeaways = [
  'App Engine is a managed application platform centered on services, versions, and traffic control rather than on host management.',
  'Choosing between standard and flexible environments is the most important architecture decision in App Engine.',
  'Versioning and traffic splitting are core operational features, not secondary conveniences.',
  'The standard environment can scale quickly and often cheaply, while the flexible environment buys more runtime freedom at the cost of heavier baseline behavior.',
  'Current Google documentation includes important operational specifics such as the standard-environment default max-instances change for new projects after March 2025 and the lack of gradual traffic migration support in flexible.',
]

const coreConceptSections: NarrativeSection[] = [
  {
    id: 'core-environments',
    heading: 'Standard Environment vs Flexible Environment',
    paragraphs: [
      'The environment choice is the central App Engine decision. The standard environment uses supported runtimes in a more restricted sandboxed model on Google infrastructure. It is designed for strong platform management, fast scaling characteristics, and low operational burden. The flexible environment runs Docker containers on Compute Engine VMs, which allows more customization, more runtime freedom, and a model closer to managed infrastructure.',
      'Standard is usually the better choice when the application fits supported runtimes and does not need custom system dependencies or VM-level access. Flexible is usually the better choice when the application needs custom runtimes, unusual libraries, or infrastructure behavior not available in the standard environment. The wrong choice creates long-term pain: either needless platform constraints or needless operational cost.',
      'Google documentation also highlights important behavioral differences. Standard can scale from zero and scale very quickly. Flexible scales more gradually, keeps at least one instance per active version, and is better suited to workloads with steadier traffic or explicit customization needs.',
    ],
  },
  {
    id: 'core-services',
    heading: 'Applications, Services, Versions, and Instance Lifecycles',
    paragraphs: [
      'An App Engine application can contain multiple services, and each service can have multiple versions deployed at the same time. This gives teams a structured way to separate frontends, admin surfaces, APIs, background endpoints, and experimental releases without managing a fleet of unrelated deployment objects.',
      'Versions are particularly important because they are not just build numbers. A version is a runnable deployment target with its own scaling settings and traffic allocation. That means rollout, rollback, debugging, and staging strategies in App Engine often center on versions more than on branches or tags alone.',
      'Instances are then created and managed underneath the version according to the environment and scaling settings. The application team should know how and when instances appear, warm up, shut down, and absorb traffic, because latency, cost, and concurrency behavior all depend on that lifecycle.',
    ],
  },
  {
    id: 'core-scaling',
    heading: 'Scaling Modes, Instance Classes, and Traffic Shape',
    paragraphs: [
      'Scaling in App Engine is configured per version through the service configuration file. In the standard environment, automatic, basic, and manual scaling choices exist depending on runtime and use case, and instance classes influence memory, CPU, and cost characteristics. Flexible has its own autoscaling behavior based on Compute Engine underpinnings and does not mirror every standard-environment scaling trait.',
      'This is where platform details become architecture. Applications with sudden spikes, short-lived requests, and low idle traffic often favor the standard environment. Applications with steady traffic, heavier per-instance memory demands, or custom runtime needs may fit flexible better. Google documentation explicitly describes these differences, and they matter in production much more than early tutorials often suggest.',
      'A current operational detail is important here: for new projects created after March 2025, the standard environment default automatic-scaling maximum instances is 20 unless overridden in app.yaml and redeployed. Teams expecting older default behavior should set explicit scaling bounds instead of assuming historical defaults still apply.',
    ],
  },
  {
    id: 'core-config',
    heading: 'app.yaml, Runtime Configuration, and Deployment Contracts',
    paragraphs: [
      'The `app.yaml` file is the core deployment contract in App Engine. It defines runtime selection, entrypoint behavior where applicable, handlers, environment variables, scaling configuration, instance class, networking, and service-level settings. This file is not boilerplate. It is the operational specification for the deployed service.',
      'Strong App Engine engineering means reviewing `app.yaml` with the same seriousness as application code. Scaling limits, concurrency assumptions, request timeouts, static handler behavior, warmup configuration, and VPC connector settings can all change runtime behavior materially. Weak configuration discipline leads to fragile deployments and mysterious cost or latency problems.',
      'Because configuration is versioned with deployment, teams also need to think about configuration drift across versions. A rollback can restore not only old code but also old scaling or routing behavior if the operational contract is not understood clearly.',
    ],
  },
  {
    id: 'core-routing',
    heading: 'Routing, Custom Domains, and Traffic Splitting',
    paragraphs: [
      'App Engine routes traffic to services and versions using the App Engine application hostname or mapped custom domains. This routing model is part of why App Engine is operationally convenient: the platform understands which service and version should receive a request and can split traffic across versions during deployment workflows.',
      "Traffic splitting is one of App Engine's most valuable features. Teams can send a percentage of traffic to a new version and keep the remainder on the previous version. Split behavior can be based on IP or cookie, which affects how sticky or user-consistent the rollout feels. This makes controlled release possible without building a separate edge proxy strategy for many applications.",
      'However, the environments differ here. Google documentation notes that gradual traffic migration is not supported in the flexible environment in the same way as standard. Teams deploying flexible services need to plan rollout and warmup carefully to avoid latency spikes when switching traffic.',
    ],
  },
  {
    id: 'core-networking',
    heading: 'Networking, Serverless VPC Access, and Private Resource Connectivity',
    paragraphs: [
      'App Engine services often need to reach private resources such as internal services, databases, Memorystore, or VM-hosted systems. In the standard environment this commonly involves Serverless VPC Access connectors, which bridge the service to a VPC network and allow access to internal IP resources. Flexible, because it runs on Compute Engine VMs, has a different network posture and typically feels more infrastructure-native.',
      'Network design should account for connector cost, region placement, Shared VPC behavior, firewall rules, and the security boundary between public ingress and private egress. A VPC connector is not only a checkbox. It becomes part of the runtime path and cost model for the application.',
      'The right approach is to design networking per service rather than assume one blanket answer. A simple public API may need none of this. A service that calls internal Redis, private SQL, and internal HTTP services definitely does.',
    ],
  },
  {
    id: 'core-security',
    heading: 'IAM, Service Accounts, Identity, and Platform Security',
    paragraphs: [
      'App Engine integrates with Google Cloud IAM and service accounts so deployed services can call other Google APIs and resources using workload identity rather than shipping static credentials. This is the default pattern modern GCP applications should prefer. It is safer, easier to audit, and easier to rotate than embedding secrets everywhere.',
      'Security in App Engine is not just about identity. It also includes deployment permissions, service account scoping, VPC posture, ingress rules, environment variables and secret handling, and custom-domain TLS management. A heavily managed platform still requires deliberate access design.',
      'Because App Engine is operationally easy to deploy to, it can become operationally easy to over-permit. Platform teams should keep the deployment roles, runtime identities, and Google API permissions narrow enough that one service compromise does not become a project-wide compromise.',
    ],
  },
  {
    id: 'core-observability',
    heading: 'Logging, Monitoring, Error Reporting, and Day-2 Operations',
    paragraphs: [
      'App Engine integrates naturally with Google Cloud logging and monitoring, which makes request logs, application logs, metrics, and error visibility part of the standard operating model. This is one of the reasons the platform can be productive for smaller teams: operational telemetry is available without building a full infrastructure observability stack first.',
      'That convenience should not lead to operational laziness. Teams still need to define SLOs, monitor latency and error rate by version, understand instance growth, watch cold-start or startup behavior where relevant, and create dashboards that reflect the business service rather than only the platform resource. Managed telemetry is useful only if it is actually interpreted.',
      'Strong App Engine operations also include deployment observability. If a new version receives 5% of traffic, the team should be able to see whether error rate, instance count, and latency differ from the current version before increasing the split.',
    ],
  },
  {
    id: 'core-deployments',
    heading: 'Deployments, Rollbacks, Canary Releases, and Version Hygiene',
    paragraphs: [
      'App Engine makes deployment easy enough that version sprawl can become real. Every deployment can create a new version, and traffic control makes it tempting to keep many versions around indefinitely. Teams need a version lifecycle policy, otherwise cost, confusion, and stale release surfaces accumulate.',
      "Canary deployment is where App Engine shines operationally. Deploy a new version, test it directly, send a small traffic percentage, compare telemetry, then expand or roll back quickly. This is one of the cleanest examples of App Engine's product philosophy: release control as a built-in platform feature rather than a custom operational system.",
      'Rollback discipline still matters. A rollback restores code and configuration behavior for the old version, but data or downstream side effects created by the failed version may remain. Platform rollbacks are helpful, not magical.',
    ],
  },
  {
    id: 'core-background',
    heading: 'Background Work, Task Handling, Cron, and Request Model Limits',
    paragraphs: [
      'App Engine is built around request-serving applications, but many real systems also need scheduled and asynchronous work. Historically, App Engine applications often use task queues or cron-based scheduling patterns integrated with other Google Cloud services or App Engine features depending on the environment and architecture vintage.',
      'The key design principle is to keep long-running or asynchronous work out of normal request paths when possible. Request timeouts, concurrency assumptions, and rollout behavior are easier to manage when foreground request handling stays thin and background work is explicit.',
      'Teams modernizing App Engine systems should review whether background behavior belongs in App Engine itself or in adjacent services such as Cloud Tasks, Cloud Scheduler, Pub/Sub, or Cloud Run jobs. The best answer depends on the application shape, not on habit.',
    ],
  },
  {
    id: 'core-cost',
    heading: 'Cost Model, Free Shape, and Avoiding Expensive Misfits',
    paragraphs: [
      'App Engine cost depends heavily on environment choice, instance class, scaling bounds, traffic profile, and whether the service can spend time near zero or must keep baseline instances running. The standard environment can be very cost-effective for bursty managed applications. The flexible environment typically has a heavier cost floor because it is running on Compute Engine VMs and keeps active versions resident.',
      'This is why architecture fit matters. A lightly used internal admin panel in flexible may be an expensive mismatch. A custom-runtime application with steady traffic may justify flexible perfectly. Cost problems in App Engine usually come from environment mismatch, overprovisioned instance behavior, or forgotten old versions still consuming resources.',
      'Teams should estimate steady-state cost, deployment-time overlap cost, VPC connector cost where relevant, and the effect of keeping multiple versions alive. Managed platforms save effort, but they do not remove the need for financial design.',
    ],
  },
  {
    id: 'core-migration',
    heading: 'Modernization, Migration, and When to Choose Another GCP Runtime',
    paragraphs: [
      'Some organizations continue to rely on App Engine because it remains a stable and productive application platform. Others evaluate Cloud Run, GKE, or Compute Engine for newer services. The right question is not which platform is newer. The right question is which platform matches the operational and runtime needs of the workload.',
      'App Engine is strongest when the team values managed deployment, service-version semantics, and reduced infrastructure complexity. Cloud Run is often stronger when container-first portability and modern serverless ergonomics matter. GKE is stronger for orchestrated container platforms. Compute Engine is stronger when VM-level control is necessary.',
      'Migration should therefore be driven by concrete platform mismatches, not fashion. If App Engine already fits the workload well, moving away may add complexity without meaningful benefit. If the application needs capabilities App Engine handles poorly, migration may be justified.',
    ],
  },
]

const compareNotes = [
  {
    title: 'App Engine vs Cloud Run',
    detail:
      'Cloud Run is more container-first and often more flexible for modern stateless services, while App Engine offers a more opinionated application-platform model with built-in service and version semantics.',
  },
  {
    title: 'App Engine vs GKE',
    detail:
      'GKE offers Kubernetes orchestration and far more infrastructure control, while App Engine deliberately abstracts that complexity away for compatible web workloads.',
  },
  {
    title: 'App Engine vs Compute Engine',
    detail:
      'Compute Engine gives machine-level control and responsibility; App Engine gives managed application hosting with less operational surface and less low-level control.',
  },
  {
    title: 'Standard vs Flexible',
    detail:
      'Standard favors stronger platform constraints and faster scaling, while flexible favors Docker and runtime customization with heavier baseline behavior and slower scale dynamics.',
  },
]

const designPatterns = [
  {
    title: 'Versioned web service with canary rollout',
    detail:
      'Deploy a new version, route a small traffic percentage to it, compare telemetry, then increase or roll back using built-in traffic controls.',
  },
  {
    title: 'Multi-service application boundary',
    detail:
      'Separate frontend, API, and admin services into distinct App Engine services so they can scale and release independently.',
  },
  {
    title: 'Standard environment for bursty public API',
    detail:
      'Use standard when supported runtimes are enough and the workload benefits from fast scale behavior and lower idle cost.',
  },
  {
    title: 'Flexible environment for custom runtime dependency stack',
    detail:
      'Use flexible when the application needs custom system libraries, Docker customization, or infrastructure behavior not available in standard.',
  },
  {
    title: 'Private resource access through VPC connectivity',
    detail:
      'Use App Engine with VPC access patterns when public request serving must also reach internal databases or services without exposing everything publicly.',
  },
]

const operationalChecklist = [
  'Choose standard versus flexible from runtime and traffic requirements, not from intuition about power or modernity.',
  'Set explicit scaling limits in app.yaml rather than relying on platform defaults alone.',
  'Use version labels and cleanup policies so deployments do not turn into stale version sprawl.',
  'Plan traffic splitting and rollback procedures before the first production rollout.',
  'Validate VPC connector and Shared VPC behavior for services that need private network access.',
  'Keep service accounts and IAM permissions narrow for each deployed service.',
  'Monitor latency, errors, instance count, and cost by service and version after every deployment.',
  'Account for flexible-environment rollout and warmup behavior before switching production traffic.',
]

const pitfalls = [
  'Choosing flexible when standard would work, then paying unnecessary baseline cost and carrying slower scaling behavior.',
  'Choosing standard without validating runtime or dependency constraints, then discovering the app does not fit the sandboxed model.',
  'Ignoring per-version cost and leaving many old versions deployed indefinitely.',
  'Relying on default scaling behavior instead of setting explicit limits and concurrency assumptions.',
  'Treating traffic splitting as a checkbox instead of using telemetry to validate each rollout step.',
  'Adding VPC connectivity without accounting for connector cost, regional placement, and firewall requirements.',
  'Assuming rollback fixes all failure impact when the failed version already produced downstream side effects.',
]
const examples: ExampleSection[] = [
  {
    id: 'example-standard-yaml',
    title: 'app.yaml Example for a Standard Environment Service',
    code: `
runtime: nodejs22
service: api
instance_class: F2

automatic_scaling:
  min_instances: 0
  max_instances: 30
  target_cpu_utilization: 0.65

env_variables:
  NODE_ENV: production

handlers:
  - url: /static
    static_dir: dist/static

  - url: /.*
    script: auto
`,
    explanation:
      'This example shows the shape of a standard-environment service definition: runtime, service name, instance class, automatic scaling, environment variables, and request handling rules. The exact fields vary by runtime and workload, but the operational idea remains the same.',
  },
  {
    id: 'example-flex-yaml',
    title: 'app.yaml Example for a Flexible Environment Service',
    code: `
service: worker-api
env: flex
runtime: custom

resources:
  cpu: 2
  memory_gb: 4
  disk_size_gb: 20

automatic_scaling:
  min_num_instances: 1
  max_num_instances: 6
  cpu_utilization:
    target_utilization: 0.7

network:
  session_affinity: true
`,
    explanation:
      'Flexible environment configuration looks different because the runtime model is different. It assumes Docker-based deployment on managed Compute Engine infrastructure and typically carries a higher baseline footprint than standard.',
  },
  {
    id: 'example-deploy-traffic',
    title: 'gcloud Deployment and Traffic Splitting Example',
    code: `
# Deploy a new version without immediately promoting all traffic
gcloud app deploy app.yaml --no-promote

# Send 10% of traffic to the new version
gcloud app services set-traffic api \
  --splits v20260313t1100=0.10,v20260301t0900=0.90
`,
    explanation:
      'This is one of the most useful App Engine workflows: deploy a version, observe it, then route a controlled percentage of traffic before full promotion.',
  },
  {
    id: 'example-multi-service',
    title: 'Conceptual Multi-Service Layout',
    code: `
project
+- App Engine application
   +- service: frontend
   �  +- version: v20260310
   �  +- version: v20260313
   +- service: api
   �  +- version: v20260308
   �  +- version: v20260313
   +- service: admin
      +- version: v20260311
`,
    explanation:
      'App Engine is often easiest to reason about when services represent clear application boundaries and versions represent releasable units inside each boundary.',
  },
]

const glossaryTerms = [
  {
    term: 'App Engine Application',
    definition:
      'The root App Engine deployment boundary in a Google Cloud project, created in a specific region.',
  },
  {
    term: 'Service',
    definition:
      'A deployable App Engine component with its own versions, scaling settings, and routing behavior.',
  },
  {
    term: 'Version',
    definition:
      'A deployed release of a service that can receive traffic independently from other versions.',
  },
  {
    term: 'Standard Environment',
    definition:
      'The more constrained and strongly managed App Engine environment optimized for supported runtimes and rapid scaling behavior.',
  },
  {
    term: 'Flexible Environment',
    definition:
      'The Docker and Compute Engine based App Engine environment that allows more customization and broader runtime freedom.',
  },
  {
    term: 'app.yaml',
    definition:
      'The service configuration file that defines runtime, scaling, handlers, environment variables, and deployment behavior.',
  },
  {
    term: 'Traffic Splitting',
    definition:
      'Routing a defined percentage of service traffic to different deployed versions for canary release or rollback control.',
  },
  {
    term: 'Instance Class',
    definition:
      'A standard-environment sizing choice that influences resource shape and cost for the service instances.',
  },
  {
    term: 'Serverless VPC Access',
    definition:
      'A connectivity mechanism that allows serverless Google Cloud workloads, including App Engine standard services, to reach VPC resources.',
  },
  {
    term: 'Warmup',
    definition:
      'A platform mechanism or deployment concern related to preparing new instances before they serve normal production traffic.',
  },
]

const pageSources = [
  'https://cloud.google.com/appengine/docs/standard/overview',
  'https://cloud.google.com/appengine/docs/flexible/flexible-for-standard-users',
  'https://cloud.google.com/appengine/docs/the-appengine-environments',
  'https://cloud.google.com/appengine/docs/standard/how-instances-are-managed',
  'https://cloud.google.com/appengine/docs/flexible/how-instances-are-managed',
  'https://cloud.google.com/appengine/docs/standard/reference/app-yaml',
  'https://cloud.google.com/appengine/docs/flexible/reference/app-yaml',
  'https://cloud.google.com/appengine/docs/standard/splitting-traffic',
  'https://cloud.google.com/appengine/docs/flexible/migrating-traffic',
  'https://cloud.google.com/appengine/docs/standard/using-shared-vpc',
  'https://cloud.google.com/appengine/docs/standard/connecting-vpc',
  'https://cloud.google.com/iam/docs/roles-permissions/appengine',
  'https://cloud.google.com/appengine/docs/legacy/standard/java/how-instances-are-managed#max_instances',
  'https://cloud.google.com/appengine/docs/flexible/troubleshooter/startup',
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
    { id: 'bp-model', label: 'Operating Model' },
    { id: 'bp-fit', label: 'When to Use It' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-environments', label: 'Environments' },
    { id: 'core-services', label: 'Services and Versions' },
    { id: 'core-scaling', label: 'Scaling' },
    { id: 'core-config', label: 'app.yaml' },
    { id: 'core-routing', label: 'Routing and Traffic' },
    { id: 'core-networking', label: 'Networking' },
    { id: 'core-security', label: 'Security' },
    { id: 'core-observability', label: 'Observability' },
    { id: 'core-deployments', label: 'Deployments' },
    { id: 'core-background', label: 'Background Work' },
    { id: 'core-cost', label: 'Cost' },
    { id: 'core-migration', label: 'Migration and Fit' },
    { id: 'core-compare', label: 'Compare and Contrast' },
    { id: 'core-patterns', label: 'Design Patterns' },
    { id: 'core-ops-checklist', label: 'Operational Checklist' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
  ],
  examples: examples.map((example) => ({ id: example.id, label: example.title })),
  glossary: [
    { id: 'glossary-terms', label: 'Terms' },
    { id: 'glossary-sources', label: 'Primary Sources' },
  ],
}

function isTabId(value: string | null): value is TabId {
  return (
    value === 'big-picture' ||
    value === 'core-concepts' ||
    value === 'examples' ||
    value === 'glossary'
  )
}

function getTabFromSearch(search: string): TabId {
  const tab = new URLSearchParams(search).get('tab')
  return isTabId(tab) ? tab : 'big-picture'
}

const win98HelpStyles = `
.gcp-app-engine-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.gcp-app-engine-help-page .win98-window {
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

.gcp-app-engine-help-page .win98-titlebar {
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

.gcp-app-engine-help-page .win98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.gcp-app-engine-help-page .win98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.gcp-app-engine-help-page .win98-control {
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

.gcp-app-engine-help-page .win98-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
}

.gcp-app-engine-help-page .win98-tab {
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

.gcp-app-engine-help-page .win98-tab.active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.gcp-app-engine-help-page .win98-main {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  flex: 1;
  min-height: 0;
  border-top: 1px solid #404040;
  background: #ffffff;
}

.gcp-app-engine-help-page .win98-toc {
  overflow: auto;
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
}

.gcp-app-engine-help-page .win98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.gcp-app-engine-help-page .win98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.gcp-app-engine-help-page .win98-toc-list li {
  margin: 0 0 8px;
}

.gcp-app-engine-help-page .win98-toc-list a {
  color: #000000;
  font-size: 12px;
  text-decoration: none;
}
.gcp-app-engine-help-page .win98-content {
  overflow-x: auto;
  overflow-y: scroll;
  scrollbar-gutter: stable;
  padding: 14px 20px 20px;
}

.gcp-app-engine-help-page .win98-doc-title {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 700;
}

.gcp-app-engine-help-page .win98-doc-subtitle {
  margin: 0 0 12px;
  font-size: 12px;
  font-weight: 700;
}

.gcp-app-engine-help-page .win98-section {
  margin: 0 0 22px;
}

.gcp-app-engine-help-page .win98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.gcp-app-engine-help-page .win98-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.gcp-app-engine-help-page .win98-content p,
.gcp-app-engine-help-page .win98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.gcp-app-engine-help-page .win98-content p {
  margin: 0 0 10px;
}

.gcp-app-engine-help-page .win98-content ul,
.gcp-app-engine-help-page .win98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.gcp-app-engine-help-page .win98-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.gcp-app-engine-help-page .win98-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.gcp-app-engine-help-page .win98-codebox code {
  display: block;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
}

.gcp-app-engine-help-page .win98-inline-link {
  color: #000080;
}

@media (max-width: 900px) {
  .gcp-app-engine-help-page .win98-main {
    grid-template-columns: 1fr;
  }

  .gcp-app-engine-help-page .win98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .gcp-app-engine-help-page .win98-title-text {
    position: static;
    transform: none;
    margin-left: 8px;
    font-size: 14px;
  }
}
`

export default function GcpAppEnginePage(): JSX.Element {
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
      window.history.replaceState(
        window.history.state,
        '',
        `${url.pathname}?${nextSearch.toString()}`,
      )
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
    window.history.replaceState(
      window.history.state,
      '',
      `${url.pathname}${url.search}#${sectionId}`,
    )
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
    <div className="gcp-app-engine-help-page">
      <style>{win98HelpStyles}</style>
      <div className="win98-window" role="presentation">
        <header className="win98-titlebar">
          <span className="win98-title-text">{pageTitle}</span>
          <div className="win98-title-controls">
            <button
              className="win98-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
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
                  <a
                    href={`#${section.id}`}
                    onClick={(event) => handleSectionJump(event, section.id)}
                  >
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
                  <h2 className="win98-heading">Operating Model</h2>
                  {operatingModelGuide.map((item) => (
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

                <section id="core-compare" className="win98-section">
                  <h2 className="win98-heading">Compare and Contrast</h2>
                  {compareNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

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
                    This content was compiled from official Google Cloud documentation current as
                    checked on March 13, 2026. App Engine environment behavior, defaults, scaling
                    details, and deployment guidance can change, so production decisions should
                    always be revalidated against the current documentation.
                  </p>
                  <ul>
                    {pageSources.map((source) => (
                      <li key={source}>
                        <a
                          href={source}
                          className="win98-inline-link"
                          target="_blank"
                          rel="noreferrer"
                        >
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
