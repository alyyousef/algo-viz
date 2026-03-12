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

const pageTitle = 'Azure App Service'
const pageSubtitle = 'Managed PaaS hosting on Azure for web apps, APIs, background jobs, and custom containers.'

const introParagraphs = [
  'Azure App Service is Microsoft\'s managed platform-as-a-service offering for hosting HTTP-based applications. It is designed for teams that want to deploy web apps and APIs without directly managing operating systems, web servers, patching cycles, load balancer fleets, or most of the infrastructure mechanics that come with running application servers on raw virtual machines.',
  'The real value of App Service is not just "host my website." It is managed runtime hosting, integrated deployment workflows, built-in authentication options, deployment slots, scaling, certificates, custom domains, managed identity, private networking options, observability integration, and a much smaller day-two operations surface than self-managed IaaS or Kubernetes for a large class of web workloads.',
  'This page treats App Service as a platform-engineering topic: App Service plans, Windows and Linux hosting, code versus custom-container deployment, inbound and outbound networking, private endpoints, VNet integration, scaling models, deployment slots, authentication, backups, App Service Environment v3, cost, and the tradeoffs that determine when App Service is the right abstraction and when it is not.',
]

const bigPictureSections: Array<{ title: string; paragraphs: string[] }> = [
  {
    title: 'What it is',
    paragraphs: [
      'App Service is a managed hosting platform for web apps, API apps, mobile back ends, and web-accessible workloads. You deploy application code or a custom container, choose an App Service plan that defines the compute, and let Azure handle the surrounding application-hosting platform concerns such as runtime images, TLS termination patterns, scaling hooks, deployment surfaces, and patching of the underlying platform.',
      'This is different from both raw virtual machines and full Kubernetes. On VMs you manage the host and web stack directly. On Kubernetes you manage a broader container orchestration platform. App Service sits at a higher abstraction level. It trades away some flexibility in exchange for much lower platform-operational overhead for common web workloads.',
    ],
  },
  {
    title: 'Why teams use it',
    paragraphs: [
      'Teams use App Service when they want fast delivery of APIs, internal tools, customer-facing web applications, or line-of-business systems without turning every application team into an infrastructure team. It works especially well for traditional web applications, stateless HTTP APIs, and services that benefit from managed deployment slots, built-in auth integration, and straightforward horizontal scaling.',
      'It is also common in enterprise Azure estates where teams want strong integration with Microsoft Entra ID, Azure Monitor, managed identity, Azure Key Vault, private networking controls, and CI/CD systems without adopting the operational overhead of AKS or the limitations of more narrowly scoped serverless platforms.',
    ],
  },
  {
    title: 'How to think about it',
    paragraphs: [
      'Think of App Service as managed web-hosting capacity organized around an App Service plan. The app is the deployable workload, but the plan is the compute boundary. That distinction matters because scaling, pricing, operating system, and certain features are plan-scoped, not app-scoped.',
      'The design question is not only "can my app run on App Service." The real question is whether your workload benefits from the App Service abstraction. If the workload is mostly HTTP, fits the runtime or container model, and does not need low-level infrastructure control, App Service is often the right choice. If the workload demands full VM control, deep network locality, or a broader orchestration substrate, another Azure service may fit better.',
    ],
  },
  {
    title: 'Where it fits',
    paragraphs: [
      'App Service fits for web front ends, REST APIs, internal portals, administrative dashboards, business applications, monoliths that still speak HTTP very well, and many custom-container workloads that do not need Kubernetes features. It is especially strong when deployment safety and operational simplicity matter more than infrastructure customization.',
      'It is a weaker fit for non-HTTP systems, highly stateful platforms that need deep storage and scheduling control, workloads that need arbitrary host-level agents or kernel features, or architectures whose requirements really point toward AKS, Container Apps, Functions, or plain VMs instead of a web-focused managed PaaS.',
    ],
  },
  {
    title: 'What changed in the platform recently',
    paragraphs: [
      'The current App Service platform direction includes newer Premium V4 compute, automatic scaling options beyond classic autoscale, stronger managed identity and private networking patterns, continuing investment in custom-container hosting, and an evolving App Service Environment v3 story for single-tenant isolation.',
      'There are also lifecycle details that matter operationally. Microsoft documents that Premium V4 does not provide stable outbound IP addresses. The App Service backup documentation states that linked database backups are being phased out for custom backups, with support ending on March 31, 2028. Those are not trivia points; they affect production network design and disaster-recovery assumptions.',
    ],
  },
]

const hostingModelGuide = [
  {
    title: 'App Service plan as the compute boundary',
    detail:
      'Every App Service app runs inside an App Service plan. The plan defines region, operating system, VM size, instance count, and pricing tier. Multiple apps can share the same plan and therefore share the same underlying compute capacity.',
  },
  {
    title: 'Code-based hosting and custom containers',
    detail:
      'App Service can run source-code deployments on built-in runtimes or run your own custom container image. Both approaches still use the App Service platform model, but they differ in packaging, startup assumptions, and responsibility for runtime composition.',
  },
  {
    title: 'Windows and Linux choices',
    detail:
      'The operating system is a plan-level choice. It affects runtime availability, container support, feature nuances, and sometimes which pricing-tier capabilities are available. You do not casually switch an existing plan between Windows and Linux later without redesign or migration work.',
  },
  {
    title: 'Multi-tenant versus App Service Environment',
    detail:
      'Standard App Service is a multitenant platform. App Service Environment v3 is the single-tenant, network-isolated variant for organizations that need stronger isolation and more controlled network placement at higher cost and complexity.',
  },
]

const fitGuide = [
  {
    title: 'Need managed hosting for web apps or APIs with lower operational overhead than AKS or VMs',
    choice: 'App Service is often the right default.',
  },
  {
    title: 'Need straightforward deployment slots, custom domains, TLS, and managed identity on a web workload',
    choice: 'App Service is a strong fit.',
  },
  {
    title: 'Need simple container hosting but not Kubernetes complexity',
    choice: 'App Service or Container Apps may fit; choose based on networking, scaling, and workload shape.',
  },
  {
    title: 'Need background compute that is not fundamentally HTTP or web-hosting shaped',
    choice: 'A VM, Functions, Container Apps jobs, AKS, or another compute model may be better.',
  },
  {
    title: 'Need single-tenant isolation and stronger private network placement',
    choice: 'Evaluate App Service Environment v3 rather than assuming multitenant App Service can be stretched into the same role.',
  },
  {
    title: 'Need arbitrary host customization or low-level control over the machine',
    choice: 'App Service is the wrong abstraction; use VMs or another lower-level platform.',
  },
]

const keyTakeaways = [
  'App Service is a managed web platform, not generic infrastructure.',
  'The App Service plan is the real compute and cost boundary; apps are only one layer above it.',
  'Deployment slots, managed identity, private networking, and scaling models are central design topics, not advanced extras.',
  'Code deployments and custom-container deployments share the same platform but carry different operational responsibilities.',
  'Most App Service failures come from misunderstanding plan boundaries, networking directionality, slot behavior, or hidden platform assumptions about scale and storage.',
]
const coreConceptSections: NarrativeSection[] = [
  {
    id: 'core-architecture',
    heading: 'App Service Plans, Apps, and the Real Resource Boundary',
    paragraphs: [
      'The single most important App Service concept is that the plan is the compute boundary. Apps inside the same App Service plan share the same underlying VM resources. That means CPU contention, memory pressure, scaling decisions, operating system choice, and cost are not isolated per app by default just because each app has its own App Service resource name.',
      'This is where many production misunderstandings begin. Teams create multiple applications, assume they are independently isolated, and later discover that one noisy app can affect others sharing the same plan. The right design is deliberate plan segmentation based on lifecycle, scaling, trust, performance, and cost boundaries.',
      'The practical rule is simple: if two apps should not share scale behavior, failure domain, or noisy-neighbor risk, they probably should not share a plan either.',
    ],
  },
  {
    id: 'core-runtime',
    heading: 'Built-In Runtimes, Startup Model, and Code Deployments',
    paragraphs: [
      'App Service supports managed runtimes for common application stacks such as .NET, Node.js, Java, PHP, Python, and others depending on operating system and current platform support. This is the lowest-friction hosting path when the application fits the platform assumptions and the runtime versions you need are available.',
      'Built-in runtime hosting removes a lot of packaging work, but it does not erase the need to understand startup behavior, file system assumptions, environment variables, process model, and how your application binds to the expected port and HTTP flow. Managed does not mean magic. It means the platform takes responsibility for some parts of the stack and expects you to honor its contract for the rest.',
      'For teams that want fewer moving parts than containers, this model is often the fastest route to production. It is especially strong when the workload is a conventional web app or API and does not need custom host-level packaging.',
    ],
  },
  {
    id: 'core-containers',
    heading: 'Custom Containers on App Service',
    paragraphs: [
      'App Service can also run custom container images. This is useful when you need a packaging model the built-in runtimes do not provide, when you want more control over dependencies, or when you are standardizing around containers but do not need full orchestration features from AKS.',
      'The key design point is that App Service custom containers are still App Service, not Kubernetes. You get managed web-hosting behaviors, scale-out, deployment surfaces, and integration features, but you do not get pod scheduling semantics, arbitrary sidecar patterns, or cluster-level primitives. Treating App Service as if it were hidden Kubernetes usually leads to the wrong expectations.',
      'Container deployments also shift more responsibility to you for image construction, base-image hygiene, startup correctness, and registry access. Microsoft documents managed identity support for pulling images from Azure Container Registry, which is usually preferable to username-and-password registry credentials.',
    ],
  },
  {
    id: 'core-scaling',
    heading: 'Scale Up, Scale Out, Autoscale, and Automatic Scaling',
    paragraphs: [
      'App Service scaling has several layers. Scale up changes the SKU or instance size. Scale out changes the number of instances in the plan. Classic autoscale can react to metrics or schedules. Automatic scaling is a newer model in which the platform can adjust instance count for plans without requiring the same kind of explicit autoscale configuration.',
      'The important thing to understand is that scaling often happens at the plan boundary. If many apps share one plan, they share the outcome of plan-level scale decisions. That can be a good efficiency pattern for small related apps, but it is a bad pattern when apps have very different scaling profiles or business criticality.',
      'Scaling strategy should also include warmup behavior, sticky session assumptions, externalized state, and startup time. A platform can scale your instance count, but it cannot fix an application that stores critical session state in memory and breaks as soon as traffic lands on multiple instances.',
    ],
  },
  {
    id: 'core-slots',
    heading: 'Deployment Slots and Safe Releases',
    paragraphs: [
      'Deployment slots are one of App Service\'s strongest platform features. They let you host multiple deployment environments such as production and staging inside the same app, warm a release before cutover, validate configuration, and then swap traffic using slot swap semantics instead of deploying straight into production blindly.',
      'Slots are powerful, but they require discipline. Some settings are slot-specific and some are not. If the team does not understand which configuration values stick to a slot and which follow the swap, production changes can still go wrong even when slots exist. Slots reduce deployment risk only when the team understands their behavioral model.',
      'Operationally, slots are one of the best reasons to choose App Service over a more bare-bones hosting option for business-critical web applications. They create a practical release-safety mechanism without requiring a full custom traffic-shaping platform.',
    ],
  },
  {
    id: 'core-networking',
    heading: 'Inbound and Outbound Networking, VNet Integration, and Private Endpoints',
    paragraphs: [
      'App Service networking has directionality, and teams regularly confuse it. Inbound private access is handled through private endpoints. Outbound access from the app into resources inside a virtual network is handled through VNet integration. These are related but different features solving opposite traffic directions.',
      'That distinction matters because many broken designs come from assuming one feature implies the other. A private endpoint on the app does not automatically give the app outbound access into your VNet. Likewise, VNet integration does not automatically make the app privately reachable from inside the network. You often need both depending on the architecture.',
      'Networking decisions should also account for outbound IP behavior, DNS, firewall allowlists, and whether multitenant App Service is sufficient or an App Service Environment is the right boundary. Microsoft documents that Premium V4 does not provide stable outbound IP addresses, which is a concrete design constraint when downstream systems rely on static egress allowlists.',
    ],
  },
  {
    id: 'core-auth',
    heading: 'Authentication, Authorization, and Easy Auth',
    paragraphs: [
      'App Service includes built-in authentication and authorization features, often called Easy Auth, that can integrate with Microsoft Entra ID and other identity providers. This can eliminate a large amount of repetitive authentication plumbing for many applications, especially internal enterprise systems or APIs that already align with Azure identity patterns.',
      'Built-in auth is valuable, but it is not a substitute for application authorization design. The platform can authenticate the caller and inject identity context, but the app still needs a clear authorization model for roles, tenants, resources, and sensitive business operations. Teams that confuse authentication with authorization usually discover the gap too late.',
      'Use built-in auth when it simplifies the platform boundary. Do not use it blindly if the application needs a more complex custom authentication flow that the platform abstraction will only fight against.',
    ],
  },
  {
    id: 'core-identity',
    heading: 'Managed Identity, Secrets, and Configuration',
    paragraphs: [
      'Managed identity is one of the most important App Service security features. It allows the app to obtain Azure Active Directory tokens for Azure resources without storing long-lived credentials in configuration files or secret stores embedded directly in the application deployment package.',
      'This matters because secret sprawl is one of the fastest ways to turn a manageable web platform into an incident factory. App settings, Key Vault references, and managed identity together create a much better default than hard-coded passwords or manually rotated connection strings hidden in deployment pipelines.',
      'The design principle is straightforward: prefer identity-based access over secret-based access whenever the downstream Azure service supports it. Use secrets only where they are unavoidable, and centralize their handling rather than scattering them across deployment scripts and app settings by habit.',
    ],
  },
  {
    id: 'core-storage',
    heading: 'File System Behavior, Content Storage, and Statelessness',
    paragraphs: [
      'App Service is fundamentally better for stateless applications than for applications that rely heavily on local mutable file storage. The file system available to the app is not the same thing as durable, application-grade state management. Some content can be persistent depending on hosting mode and configuration, but the safe default assumption for application design is still to externalize important state.',
      'Applications should treat App Service instances as replaceable compute nodes. Store durable business data in managed databases or storage services. Store shared files in proper external storage. Store caches in dedicated cache systems. Treat the app host as a place to run the app, not as the permanent home of the app\'s business state.',
      'When teams violate this principle, scale-out, slot swaps, restarts, and disaster recovery all become more fragile than they should be. Statelessness is not just cloud fashion here; it is how you get the real benefits of the platform.',
    ],
  },
  {
    id: 'core-observability',
    heading: 'Logging, Metrics, and Application Monitoring',
    paragraphs: [
      'App Service integrates with Azure Monitor, Application Insights, diagnostic logging, log streaming, and other operational surfaces. This gives teams a fairly complete managed observability path without building the entire web-hosting telemetry substrate themselves.',
      'Good observability on App Service still requires decisions. You need to know which logs matter, how to correlate application failures with platform events, how to detect slow startup and instance restarts, how to trace deployment issues, and how to separate platform symptoms from application defects. If observability is just enabled but not designed, incident response will still be slow.',
      'A mature App Service deployment usually pairs platform metrics with application metrics and structured logs, then uses deployment and slot events as part of incident context. Without that, teams often misdiagnose whether the problem was code, capacity, networking, or platform configuration.',
    ],
  },
  {
    id: 'core-ase',
    heading: 'App Service Environment v3 and Isolation Boundaries',
    paragraphs: [
      'App Service Environment v3 is the single-tenant deployment option for App Service. It gives you stronger network isolation and dedicated environment capacity when multitenant App Service is not the right fit for security, compliance, or enterprise network-topology reasons.',
      'ASE v3 is not a free upgrade path or a default for every app. It is a different operating point with higher cost and more architecture responsibility. The value is isolation and network control, not just prestige. If your workload does not actually need those properties, standard multitenant App Service is usually the better answer.',
      'The right way to evaluate ASE v3 is to ask whether multitenant App Service plus private endpoints and VNet integration solves the requirement. If not, ASE may be warranted. If yes, ASE may simply be unnecessary cost and complexity.',
    ],
  },
  {
    id: 'core-backup',
    heading: 'Backups, Restore, and Recovery Planning',
    paragraphs: [
      'App Service includes backup capabilities, but teams should be precise about what is actually being backed up and what is not. Application content, configuration, and connected backup targets can be part of the strategy, but a full recovery design still needs to account for databases, storage accounts, identity dependencies, DNS, and infrastructure configuration outside the app resource itself.',
      'Microsoft documents that linked database backups are being phased out for custom backups, with support ending on March 31, 2028. That means teams using older assumptions around App Service backup scope should revisit them now rather than later. Recovery designs should be explicit and modern, not inherited from older platform behavior by accident.',
      'The mature recovery mindset is to treat App Service restore as one piece of a broader application recovery plan. The app resource is rarely the only stateful element that matters during an incident.',
    ],
  },
  {
    id: 'core-cicd',
    heading: 'Deployment Center, CI/CD, and Release Mechanics',
    paragraphs: [
      'App Service supports several deployment paths: zip deploy, source-based deployments, Deployment Center integrations, GitHub Actions, Azure DevOps, containers from registries, and slot-based release workflows. The platform is flexible enough that teams can choose a deployment style that matches their delivery maturity.',
      'The important part is not which deployment button you click in the portal. It is whether your delivery path is repeatable, auditable, and safe. Good App Service operations usually mean infrastructure as code for the hosting layer, CI for build validation, CD for deployment, and slots for release safety where the workload justifies them.',
      'If the deployment path depends on a human manually changing app settings in the portal after every release, the platform is not the problem. The delivery discipline is.',
    ],
  },
  {
    id: 'core-cost',
    heading: 'Cost Model and Cost Discipline',
    paragraphs: [
      'App Service cost is centered on the App Service plan, not only on the number of apps. Multiple small applications can share one plan efficiently, but that same feature can hide waste or create bad isolation if used carelessly. Networking add-ons, certificates, monitoring, private endpoints, and environment choices also contribute to cost.',
      'The cheapest design on paper is not always the cheapest design in practice. Over-consolidating many unrelated apps into one plan can create incident and scaling costs that erase any savings. Over-isolating every app into its own premium plan can waste money just as quickly. App Service cost discipline is about choosing the right plan boundaries, not just squeezing instance counts.',
      'Premium tiers, isolate tiers, and ASE variants should be justified by concrete platform requirements such as network isolation, higher scale, advanced networking, or deployment safety needs. Otherwise the bill grows faster than the value.',
    ],
  },
  {
    id: 'core-anti-patterns',
    heading: 'Where App Service Is the Wrong Tool',
    paragraphs: [
      'App Service is the wrong tool when the workload needs arbitrary host-level control, non-web process patterns as the primary design, or deep orchestration capabilities that are better served by AKS or another container platform. It is also a bad fit when the application fundamentally requires infrastructure semantics App Service does not expose cleanly.',
      'It is also the wrong tool for teams that choose it merely because it sounds easier, while ignoring whether their system is actually HTTP-centric and platform-compatible. If the workload shape fights the platform on every deployment, the platform choice is wrong even if the app can technically start.',
      'Another anti-pattern is using App Service as a dumping ground for many unrelated applications in one shared plan with no thought for lifecycle, security, or performance boundaries. Shared hosting is a feature, not an excuse to abandon architecture.',
    ],
  },
]
const designPatterns = [
  {
    title: 'Separate plans by real operational boundary',
    detail:
      'Share a plan only when applications truly share scaling, cost, trust, and lifecycle expectations. Plan sprawl is wasteful, but blind consolidation is worse.',
  },
  {
    title: 'Use deployment slots for important production apps',
    detail:
      'Staging and swap-based releases are one of the platform\'s strongest operational features. Use them where downtime and release risk actually matter.',
  },
  {
    title: 'Prefer managed identity and Key Vault references over static secrets',
    detail:
      'Identity-based access usually reduces secret sprawl and makes operational security much cleaner than passing credentials through app settings by default.',
  },
  {
    title: 'Design networking by direction',
    detail:
      'Use private endpoints for inbound private access and VNet integration for outbound private access. Keep those two concerns separate in architecture diagrams and implementation work.',
  },
  {
    title: 'Keep apps stateless and externalize important state',
    detail:
      'Scale-out, slot swaps, and disaster recovery all work better when the app host is replaceable and durable state lives in dedicated managed services.',
  },
  {
    title: 'Use App Service when the abstraction is the benefit',
    detail:
      'If a workload keeps needing platform behavior App Service does not naturally provide, raise the bar and choose the right hosting model instead of fighting the platform indefinitely.',
  },
]

const operationalChecklist = [
  'Define App Service plan boundaries based on scale, performance, security, and lifecycle rather than convenience alone.',
  'Choose Windows, Linux, built-in runtime, or custom-container hosting deliberately before standardizing deployment patterns.',
  'Use deployment slots and understand which settings are slot-specific before relying on swaps in production.',
  'Use managed identity, Key Vault references, and minimal secret exposure in app configuration.',
  'Design inbound and outbound networking separately, and validate DNS and firewall behavior in preproduction.',
  'Confirm whether stable outbound IPs are required before selecting SKUs such as Premium V4.',
  'Keep critical application state outside the app host and verify scale-out behavior with multiple instances.',
  'Enable platform and application observability that can explain startup, deployment, networking, and runtime failures quickly.',
  'Review backup and restore scope explicitly, especially if older linked-database assumptions still exist.',
  'Use ASE v3 only when single-tenant isolation or network placement requirements genuinely justify it.',
]

const pitfalls = [
  'Assuming every app in a plan is isolated just because it has a separate App Service resource name.',
  'Mixing unrelated workloads in one plan and discovering noisy-neighbor problems in production.',
  'Using deployment slots without understanding slot-specific settings and swap behavior.',
  'Assuming VNet integration and private endpoints are the same feature or solve the same traffic direction.',
  'Expecting stable outbound IPs from Premium V4 when downstream systems require fixed allowlists.',
  'Treating App Service local storage as durable application state.',
  'Shipping long-lived credentials in app settings instead of using managed identity where possible.',
  'Selecting App Service for workloads that really need container orchestration or host-level control.',
  'Relying only on portal diagnostics and not building real application-level telemetry and alerting.',
  'Forgetting that scaling often happens at the shared plan boundary rather than only per app.',
]

const compareNotes = [
  {
    title: 'App Service vs Virtual Machines',
    detail:
      'Virtual Machines give far more control but require much more operational ownership. App Service is preferable when managed web hosting is the real need and host-level control is not.',
  },
  {
    title: 'App Service vs AKS',
    detail:
      'AKS is a container orchestration platform. App Service is a managed web-hosting platform. If you need Kubernetes primitives, choose AKS. If you need to ship web apps with less platform overhead, App Service is often the better fit.',
  },
  {
    title: 'App Service vs Azure Functions',
    detail:
      'Functions is better for event-driven or highly elastic function-style workloads. App Service is better for continuously running web applications and APIs that want a more conventional app-hosting model.',
  },
  {
    title: 'App Service vs Azure Container Apps',
    detail:
      'Container Apps sits between App Service and AKS for many teams. App Service is simpler and more web-hosting-focused. Container Apps is stronger for container-native patterns, revisions, and scale-to-zero style scenarios.',
  },
]

const examples: ExampleSection[] = [
  {
    id: 'ex-plan-app',
    title: 'Create a Linux App Service plan and web app',
    code: `az appservice plan create \\
  --resource-group rg-web-prod \\
  --name asp-web-prod \\
  --sku P1v3 \\
  --is-linux

az webapp create \\
  --resource-group rg-web-prod \\
  --plan asp-web-prod \\
  --name contoso-api-prod \\
  --runtime "NODE|20-lts"`,
    explanation:
      'This shows the core resource model: create the plan first, then create the web app inside it. The plan is the compute boundary; the app is the workload resource deployed into that boundary.',
  },
  {
    id: 'ex-slot',
    title: 'Add a staging slot for safer releases',
    code: `az webapp deployment slot create \\
  --resource-group rg-web-prod \\
  --name contoso-api-prod \\
  --slot staging`,
    explanation:
      'This is one of the most important App Service production patterns. A staging slot lets you deploy, warm, test, and then swap instead of deploying directly into the production slot.',
  },
  {
    id: 'ex-identity',
    title: 'Enable managed identity on an app',
    code: `az webapp identity assign \\
  --resource-group rg-web-prod \\
  --name contoso-api-prod`,
    explanation:
      'Managed identity should usually be the default starting point when the app needs to call Azure resources. It reduces the need for stored credentials and fits well with Key Vault and Azure RBAC patterns.',
  },
  {
    id: 'ex-vnet',
    title: 'Integrate an app with a subnet for outbound private access',
    code: `az webapp vnet-integration add \\
  --resource-group rg-web-prod \\
  --name contoso-api-prod \\
  --vnet app-vnet \\
  --subnet appservice-outbound`,
    explanation:
      'This is outbound networking into a virtual network, not inbound private access to the app. That distinction is one of the most important App Service networking concepts to get right.',
  },
  {
    id: 'ex-private-endpoint',
    title: 'Create a private endpoint for inbound private access',
    code: `az network private-endpoint create \\
  --resource-group rg-web-prod \\
  --name pe-contoso-api \\
  --vnet-name app-vnet \\
  --subnet private-endpoints \\
  --private-connection-resource-id <app-service-resource-id> \\
  --group-ids sites \\
  --connection-name pe-contoso-api-conn`,
    explanation:
      'This is the inbound-private-access pattern. It is different from VNet integration and should be designed as a separate concern with its own DNS and routing validation.',
  },
  {
    id: 'ex-container',
    title: 'Run a custom container image from Azure Container Registry',
    code: `az webapp create \\
  --resource-group rg-web-prod \\
  --plan asp-web-prod \\
  --name contoso-web-prod \\
  --deployment-container-image-name contosoregistry.azurecr.io/web:2026.03.12`,
    explanation:
      'This is the custom-container path for App Service. It keeps the App Service platform model while letting you package the application as a container image rather than relying on a built-in runtime.',
  },
]

const glossaryTerms = [
  {
    term: 'App Service plan',
    definition: 'The compute, pricing, operating system, and scale boundary that hosts one or more App Service apps.',
  },
  {
    term: 'Web app',
    definition: 'An App Service application resource that hosts a web workload inside an App Service plan.',
  },
  {
    term: 'Deployment slot',
    definition: 'An alternate deployment environment such as staging that can be swapped with production for safer releases.',
  },
  {
    term: 'VNet integration',
    definition: 'The App Service feature used for outbound connectivity from the app into a virtual network.',
  },
  {
    term: 'Private endpoint',
    definition: 'The feature used to make an App Service app privately reachable inbound through Azure Private Link.',
  },
  {
    term: 'Managed identity',
    definition: 'An Azure identity assigned to the app so it can access Azure resources without storing credentials manually.',
  },
  {
    term: 'Easy Auth',
    definition: 'The built-in App Service authentication and authorization feature that integrates with identity providers such as Microsoft Entra ID.',
  },
  {
    term: 'Scale out',
    definition: 'Increasing the number of App Service plan instances to handle more load.',
  },
  {
    term: 'Scale up',
    definition: 'Moving to a larger or different App Service pricing tier or instance size.',
  },
  {
    term: 'Premium V4',
    definition: 'A newer App Service Premium tier that Microsoft documents as not providing stable outbound IP addresses.',
  },
  {
    term: 'App Service Environment v3',
    definition: 'The single-tenant deployment model for App Service with stronger network isolation and dedicated environment capacity.',
  },
  {
    term: 'Custom container',
    definition: 'A deployment model where the application is packaged as a container image and run on App Service.',
  },
  {
    term: 'Key Vault reference',
    definition: 'An App Service configuration mechanism that resolves app settings from Azure Key Vault rather than storing raw secret values directly.',
  },
  {
    term: 'Autoscale',
    definition: 'A scaling model that adjusts plan instance count based on schedule or metric rules.',
  },
  {
    term: 'Automatic scaling',
    definition: 'A more managed scaling model in which App Service can adjust instance count without the same manual autoscale-rule configuration pattern.',
  },
]
const pageSources = [
  'https://learn.microsoft.com/en-us/azure/app-service/overview',
  'https://learn.microsoft.com/en-us/azure/app-service/overview-hosting-plans',
  'https://learn.microsoft.com/en-us/azure/app-service/deploy-staging-slots',
  'https://learn.microsoft.com/en-us/azure/app-service/overview-authentication-authorization',
  'https://learn.microsoft.com/en-us/azure/app-service/overview-vnet-integration',
  'https://learn.microsoft.com/en-us/azure/app-service/overview-private-endpoint',
  'https://learn.microsoft.com/en-us/azure/app-service/overview-managed-identity',
  'https://learn.microsoft.com/en-us/azure/app-service/tutorial-custom-container',
  'https://learn.microsoft.com/en-us/azure/app-service/monitor-app-service',
  'https://learn.microsoft.com/en-us/azure/app-service/manage-backup',
  'https://learn.microsoft.com/en-us/azure/app-service/environment/overview',
  'https://learn.microsoft.com/en-us/azure/app-service/manage-scale-up',
  'https://learn.microsoft.com/en-us/azure/app-service/manage-automatic-scaling',
  'https://learn.microsoft.com/en-us/azure/app-service/overview-inbound-outbound-ips',
  'https://learn.microsoft.com/en-us/azure/app-service/configure-custom-container',
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
    { id: 'bp-model', label: 'Hosting Model' },
    { id: 'bp-fit', label: 'When to Use It' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-architecture', label: 'Plans and Apps' },
    { id: 'core-runtime', label: 'Built-In Runtimes' },
    { id: 'core-containers', label: 'Custom Containers' },
    { id: 'core-scaling', label: 'Scaling' },
    { id: 'core-slots', label: 'Deployment Slots' },
    { id: 'core-networking', label: 'Networking' },
    { id: 'core-auth', label: 'Authentication' },
    { id: 'core-identity', label: 'Managed Identity' },
    { id: 'core-storage', label: 'Storage Model' },
    { id: 'core-observability', label: 'Observability' },
    { id: 'core-ase', label: 'ASE v3' },
    { id: 'core-backup', label: 'Backup and DR' },
    { id: 'core-cicd', label: 'CI/CD' },
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
.azure-app-service-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.azure-app-service-help-page .win98-window {
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

.azure-app-service-help-page .win98-titlebar {
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

.azure-app-service-help-page .win98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.azure-app-service-help-page .win98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.azure-app-service-help-page .win98-control {
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

.azure-app-service-help-page .win98-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
}

.azure-app-service-help-page .win98-tab {
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

.azure-app-service-help-page .win98-tab.active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.azure-app-service-help-page .win98-main {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  flex: 1;
  min-height: 0;
  border-top: 1px solid #404040;
  background: #ffffff;
}

.azure-app-service-help-page .win98-toc {
  overflow: auto;
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
}

.azure-app-service-help-page .win98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.azure-app-service-help-page .win98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.azure-app-service-help-page .win98-toc-list li {
  margin: 0 0 8px;
}

.azure-app-service-help-page .win98-toc-list a {
  color: #000000;
  font-size: 12px;
  text-decoration: none;
}

.azure-app-service-help-page .win98-content {
  overflow-x: auto;
  overflow-y: scroll;
  scrollbar-gutter: stable;
  padding: 14px 20px 20px;
}

.azure-app-service-help-page .win98-doc-title {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 700;
}

.azure-app-service-help-page .win98-doc-subtitle {
  margin: 0 0 12px;
  font-size: 12px;
  font-weight: 700;
}

.azure-app-service-help-page .win98-section {
  margin: 0 0 22px;
}

.azure-app-service-help-page .win98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.azure-app-service-help-page .win98-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.azure-app-service-help-page .win98-content p,
.azure-app-service-help-page .win98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.azure-app-service-help-page .win98-content p {
  margin: 0 0 10px;
}

.azure-app-service-help-page .win98-content ul,
.azure-app-service-help-page .win98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}
.azure-app-service-help-page .win98-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.azure-app-service-help-page .win98-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.azure-app-service-help-page .win98-codebox code {
  display: block;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
}

.azure-app-service-help-page .win98-inline-link {
  color: #000080;
}

@media (max-width: 900px) {
  .azure-app-service-help-page .win98-main {
    grid-template-columns: 1fr;
  }

  .azure-app-service-help-page .win98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .azure-app-service-help-page .win98-title-text {
    position: static;
    transform: none;
    margin-left: 8px;
    font-size: 14px;
  }
}
`

export default function AzureAppServicePage(): JSX.Element {
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
    <div className="azure-app-service-help-page">
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
                  <h2 className="win98-heading">Hosting Model</h2>
                  {hostingModelGuide.map((item) => (
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
                    2026. App Service features, SKU behavior, region support, and lifecycle details can change, so
                    production decisions should always be verified against the current Azure documentation.
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


