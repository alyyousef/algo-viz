import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
type SectionNote = { title: string; details: string; notes: string }
type NarrativeSection = { id: string; title: string; paragraphs: string[] }
type ExampleSection = { id: string; title: string; code: string; explanation: string }
type GlossaryTerm = { term: string; definition: string }

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const introParagraphs = [
  'Platform engineering builds internal developer platforms that give application teams self-service access to infrastructure, deployment workflows, and operational tooling without forcing every team to become expert in every low-level cloud and operations detail.',
  'The point is not to hide reality behind vague automation. The point is to reduce cognitive load, define well-supported golden paths, and make the common delivery path safer, faster, and easier to reason about. In mature organizations, the platform becomes an internal product with users, support boundaries, and explicit interfaces.',
  'In practice this usually includes a service catalog or portal, templates, infrastructure abstractions, CI/CD workflows, GitOps delivery, policy guardrails, secrets and identity integration, observability defaults, and standardized operational conventions. The platform is the composed operating model built from these pieces, not any one tool in isolation.',
]

const bigPicture: SectionNote[] = [
  {
    title: 'What it is',
    details:
      'Platform engineering is the discipline of building internal developer platforms, or IDPs, that expose self-service infrastructure, delivery, and operational capabilities through supported interfaces.',
    notes:
      'The core goal is to reduce developer cognitive load while still improving consistency, security, reliability, and delivery speed.',
  },
  {
    title: 'Why organizations adopt it',
    details:
      'Organizations adopt platform engineering because ticket-driven infrastructure, inconsistent service setup, and one-off deployment pipelines do not scale across many teams. Repeated operational work becomes too expensive, too slow, and too error-prone when every service invents its own path.',
    notes:
      'Golden paths let teams create services, environments, and dependencies quickly without re-solving logging, IAM, secrets, GitOps, runtime packaging, or on-call conventions from scratch each time.',
  },
  {
    title: 'Where it fits',
    details:
      'Platform engineering sits between raw infrastructure and application delivery. It packages cloud resources, CI/CD, policy, secrets, GitOps, observability, and operational standards into a coherent developer-facing system.',
    notes:
      'Backstage, Argo CD, Helm, Terraform, Pulumi, and Crossplane often appear as ingredients, but the platform itself is the operating model formed around them.',
  },
  {
    title: 'What it is not',
    details:
      'Platform engineering is not just centralizing infrastructure work into another operations queue, and it is not successful if application teams still need deep Kubernetes, IAM, networking, Terraform, and cloud-provider expertise for routine service delivery.',
    notes:
      'A real platform creates paved roads with explicit interfaces, clear ownership, and supported defaults. It does not simply rename shared ops work.',
  },
  {
    title: 'What good looks like',
    details:
      'A good platform makes the safe path the easy path. Developers can discover service templates, provision common dependencies, deploy through auditable workflows, inherit observability and security defaults, and understand when they are on or off the supported path.',
    notes:
      'The best platforms feel boring in the right places. Routine service work stops being a constant architecture exercise.',
  },
  {
    title: 'Where teams fail',
    details:
      'Teams fail when they automate complexity instead of removing it, expose raw provider APIs and call that self-service, or over-standardize to the point that product teams route around the platform.',
    notes:
      'The hard part is not tool installation. The hard part is interface design, governance, lifecycle ownership, and deciding what the platform should standardize versus what it should leave flexible.',
  },
]

const platformDecisionGuide = [
  {
    title: 'Need a software catalog, templates, and discoverability',
    details:
      'Use a portal model such as Backstage as the front door for platform products and ownership metadata.',
  },
  {
    title: 'Need reviewable deployment-time infrastructure workflows',
    details:
      'Use Terraform or Pulumi for plan-or-preview-based infrastructure changes with explicit state boundaries.',
  },
  {
    title: 'Need Kubernetes-native long-lived platform APIs and reconciliation',
    details:
      'Use Crossplane when internal product APIs and ongoing control loops are more important than one-time provisioning.',
  },
  {
    title: 'Need pull-based GitOps delivery for Kubernetes applications',
    details:
      'Use Argo CD for desired-versus-live application reconciliation rather than expecting CI push scripts to remain the source of truth.',
  },
  {
    title: 'Need reusable packaging and parameterized Kubernetes installs',
    details:
      'Use Helm as the packaging and templating layer, often underneath GitOps rather than instead of it.',
  },
]

const keyTakeaways = [
  'Platform engineering treats developer experience as a product concern, not an accidental side effect of infrastructure choices.',
  'Self-service only works when it comes with safe defaults, clear guardrails, and explicit ownership boundaries.',
  'Golden paths should encode security, secrets, observability, and delivery standards so teams inherit them by default.',
  'Tools such as Backstage, Argo CD, Helm, Terraform, Pulumi, and Crossplane are building blocks. The platform is the system of abstractions and workflows around them.',
  'The hard part is not choosing tools. The hard part is building stable interfaces, defining support boundaries, handling drift and lifecycle, and measuring whether the platform actually reduces toil.',
]

const coreSections: NarrativeSection[] = [
  {
    id: 'core-product',
    title: 'Platform as an internal product',
    paragraphs: [
      'Platform engineering works best when the platform is treated as a product for internal developers. That means the platform team has users, support obligations, documented interfaces, a roadmap, adoption goals, and feedback loops shaped by user friction rather than by infrastructure fashion.',
      'This is important because one of the most common failure modes is a central team that automates a few tasks, calls it a platform, and still requires every application team to understand the same low-level operational details as before. That is not cognitive-load reduction. It is just centralized script ownership.',
      'A product mindset changes the success criteria. The question becomes whether developers can discover, provision, deploy, and operate common service patterns with less effort, fewer mistakes, and clearer support boundaries than before.',
    ],
  },
  {
    id: 'core-cognitive-load',
    title: 'Cognitive load and service ownership',
    paragraphs: [
      'The usual motivation for platform engineering is cognitive load. Modern service delivery asks teams to reason about CI pipelines, container packaging, IAM, networking, secrets, observability, deployment safety, cost controls, rollback, and incident response before they even get to application logic.',
      'Not every team should carry all of that complexity directly. A platform reduces the number of operational concepts each product team must hold in active memory, while preserving enough visibility that teams can still understand the systems they rely on.',
      'This does not remove service ownership. Product teams still own their services, behavior, and incidents. The platform team owns the paved roads and shared systems that reduce repeated operational work across those services.',
    ],
  },
  {
    id: 'core-idp',
    title: 'Internal developer platforms and self-service interfaces',
    paragraphs: [
      'An internal developer platform usually exposes a service catalog, portal, CLI, templates, or APIs that let teams bootstrap services, provision common dependencies, request environments, and deploy through approved workflows without filing tickets for every routine action.',
      'Backstage is the most visible open-source example of this model. It provides a software catalog and plugin framework that can become the front door to templates, ownership metadata, documentation, scorecards, runbooks, and operational links.',
      'The key design question is interface quality. Self-service is only useful if the interfaces are stable, understandable, and aligned with what teams actually need to do. A weak interface merely moves platform complexity from tickets into poorly designed forms or YAML.',
    ],
  },
  {
    id: 'core-catalog',
    title: 'Service catalogs, templates, and discovery',
    paragraphs: [
      'A service catalog matters because platforms fail when nobody can discover what exists, who owns it, or which path is supported. Teams need a reliable way to find services, docs, runtime metadata, environments, dashboards, repos, on-call boundaries, and dependency information.',
      'Templates are the other half of discoverability. A platform should not only list existing components. It should also help teams start new components in a supported way, with clear defaults for repos, pipelines, deployment manifests, ownership files, alerting, and dependency wiring.',
      'The strongest platforms treat catalog metadata and scaffolding templates as part of the contract. Ownership, lifecycle, and support expectations should be visible from the first day of a service, not retrofitted later during an incident.',
    ],
  },
  {
    id: 'core-golden-paths',
    title: 'Golden paths, guardrails, and escape hatches',
    paragraphs: [
      'Golden paths are opinionated templates and supported workflows for common service types, deployment models, and infrastructure needs. They reduce variation where variation creates cost without value.',
      'The point is not to forbid all customization. The point is to make the safe, well-supported path the default path. Teams should inherit logging, metrics, tracing, secret handling, policy checks, and deployment safety controls automatically when they stay on that paved road.',
      'Guardrails matter because self-service without constraints becomes distributed misconfiguration. Good platforms make the common path easy, the risky path explicit, and the unsupported path visible enough that teams understand the cost of leaving the platform contract.',
    ],
  },
  {
    id: 'core-building-blocks',
    title: 'Common platform building blocks',
    paragraphs: [
      'Most platforms combine a developer portal, CI/CD workflows, infrastructure abstractions, policy enforcement, secrets management, artifact distribution, observability, and runtime conventions. Each layer solves a different part of the developer experience.',
      'Terraform and Pulumi often define infrastructure products or environment foundations. Argo CD often handles GitOps application delivery into Kubernetes. Helm often packages and parameterizes Kubernetes applications. Crossplane can expose infrastructure through Kubernetes-native APIs. Observability and policy systems add shared operational and governance layers.',
      'No single tool is the platform. The platform is the composed workflow that turns these pieces into a predictable operating model for product teams.',
    ],
  },
  {
    id: 'core-infra-products',
    title: 'Infrastructure products and abstraction design',
    paragraphs: [
      'Platform engineering depends on abstractions that are high enough to remove repeated toil but concrete enough to remain understandable. Terraform modules, Pulumi components, and Crossplane composite resources are all examples of platform-facing abstraction layers.',
      'The most important design rule is that abstractions should model internal products, not merely wrap raw provider resources. An internal database product, service foundation, queue product, or runtime environment is a better interface than a thin layer exposing fifty cloud-provider fields directly to every team.',
      'If the abstraction leaks immediately and every consumer still needs cloud-specific knowledge to use it well, the platform has not actually simplified anything. It has just added indirection.',
    ],
  },
  {
    id: 'core-tools',
    title: 'Terraform, Pulumi, Crossplane, Helm, and Argo CD in one platform',
    paragraphs: [
      'These tools solve different problems and work best when their boundaries are explicit. Terraform is strong for declarative plan-and-apply infrastructure workflows with shared state and reviewable diffs. Pulumi is strong when the platform wants richer language-native abstractions, typed components, or service-driven provisioning through Automation API.',
      'Crossplane is strongest when the organization wants Kubernetes-native platform APIs and continuous reconciliation of infrastructure under controller ownership. Argo CD is strongest as the Kubernetes application delivery and desired-versus-live reconciliation plane. Helm is strongest as a packaging and templating system for Kubernetes resources, often used under GitOps rather than as the full control plane.',
      'Confusion begins when teams expect one tool to become the entire platform. A mature platform deliberately combines them where their operating models fit instead of flattening every concern into whichever tool is currently fashionable.',
    ],
  },
  {
    id: 'core-gitops',
    title: 'GitOps and reconciliation-oriented delivery',
    paragraphs: [
      'GitOps delivery uses a repository as the declared source of truth for deployed state. Argo CD continuously compares cluster reality with that declared state and applies differences to converge the system. This gives teams drift detection, rollback leverage, and an audit trail of cluster changes.',
      'That also changes operational discipline because the approved path is to commit desired state rather than mutate clusters manually. GitOps is valuable precisely because it treats drift as a first-class concern instead of letting deployment intent disappear into shell history or CI logs.',
      'GitOps is often one layer of platform engineering rather than the whole story. It is strongest when connected to templates, policy, environment management, and ownership metadata instead of being treated as a generic YAML launcher.',
    ],
  },
  {
    id: 'core-kubernetes',
    title: 'Kubernetes as a platform boundary',
    paragraphs: [
      'Many platform engineering systems end up using Kubernetes as the application platform boundary because it standardizes deployment APIs, service discovery, health semantics, autoscaling primitives, secret and config injection, namespace-based tenancy, and controller-driven operations.',
      'That power cuts both ways. Kubernetes is valuable when many teams, services, and runtime patterns need one common substrate. It is not valuable if the organization has not staffed for cluster ownership, privileged controllers, policy, networking, upgrades, incident response, and platform governance.',
      'Managed clusters reduce some undifferentiated control-plane work but do not remove the need for platform engineering. Privileged controllers, ingress layers, CSI drivers, GitOps agents, and admission systems are themselves control planes and should be treated with the same rigor as any infrastructure system with broad authority.',
    ],
  },
  {
    id: 'core-security',
    title: 'Policy, identity, secrets, and security boundaries',
    paragraphs: [
      'A platform has production power, which means IAM, secret distribution, repository access, cluster credentials, artifact provenance, and policy enforcement are not secondary concerns. They are part of the platform contract.',
      'Self-service should not mean broad permissions. Teams should be able to get what they need through constrained interfaces that encode least privilege, approved regions or environments, safe resource classes, and default security policies. Policy belongs partly in the abstraction, partly in validation or admission layers, and partly in review workflows.',
      'Secrets handling is a particularly common weak point. A platform should define where secrets live, how they are rotated, who may read them, how workloads consume them, and whether connection details are emitted in a safe and auditable way.',
    ],
  },
  {
    id: 'core-observability',
    title: 'Observability, SLOs, and day-two operations',
    paragraphs: [
      'A platform is incomplete if it helps teams deploy software but leaves logging, metrics, tracing, dashboards, alerting, runbooks, and ownership metadata as an afterthought. The platform should make operational visibility default, not optional.',
      'This is where SLOs and error budgets become relevant. A strong platform makes it easier to define baseline SLIs, attach alerting conventions, wire services into dashboards, and expose health and deployment history without every team rebuilding those integrations by hand.',
      'Day-two operations are the real test. Provisioning a service once is easy. Operating it during incidents, upgrades, drift, and dependency failures is where platform quality becomes visible.',
    ],
  },
  {
    id: 'core-environments',
    title: 'Environments, tenancy, and promotion models',
    paragraphs: [
      'Most platforms need explicit environment models for development, staging, production, ephemeral preview environments, or tenant-specific deployments. These boundaries affect IAM, state partitioning, cluster destinations, cost, and blast radius.',
      'Promotion should be understandable. Teams need to know whether environments are driven by branch structure, image tags, chart versions, GitOps repository layout, stack configuration, or some combination of those. Hidden promotion logic is one of the fastest ways to make a platform feel arbitrary.',
      'Tenancy also matters. Multi-team systems need repository boundaries, namespace or cluster boundaries, project scoping, and clear rules for which shared resources are centrally operated versus team-owned.',
    ],
  },
  {
    id: 'core-operating-model',
    title: 'Team topology, ownership, and support model',
    paragraphs: [
      'A platform team should own the paved roads, not every production problem in every application. Product teams still own their services. The platform team owns the reusable systems, defaults, APIs, templates, and guardrails that make those services easier to build and operate.',
      'This ownership split has to be explicit. Teams need to know which incidents belong to the platform, which belong to the application, which resources are self-service, which products are supported, and where exceptions or unsupported customization begin.',
      'Without clear ownership, the platform either becomes a gatekeeper everyone waits on or a vague shared layer nobody trusts. Both failure modes destroy adoption.',
    ],
  },
  {
    id: 'core-adoption',
    title: 'Adoption strategy and platform metrics',
    paragraphs: [
      'Platform engineering should be measured by outcomes rather than by how many tools are installed. Useful signals include time to bootstrap a new service, deployment lead time, change failure rate, mean time to recovery, platform adoption rate, support load, and how often teams stay on the paved path versus building their own alternatives.',
      'Early platform work should usually target the highest-frequency pain first: new-service scaffolding, standard CI, deploy safety, secret wiring, observability defaults, and common infrastructure products. Trying to solve every edge case before the golden path is good tends to produce a huge platform nobody wants to use.',
      'Adoption also depends on trust. If the platform is unreliable, badly documented, or too rigid, teams will bypass it. Voluntary adoption of the golden path is often a better signal than formal mandates alone.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs and common failure modes',
    paragraphs: [
      'The biggest failure mode is building a platform that automates complexity instead of removing it. If developers still need deep Kubernetes, Terraform, IAM, and networking knowledge for every routine task, the platform has not done its job.',
      'Another common problem is over-standardization. When every path is rigid and every exception requires platform-team intervention, teams route around the platform or duplicate their own tooling. Platform engineering only works when the supported path is good enough that most teams prefer it voluntarily.',
      'Other recurring failures include giant all-purpose abstractions, unclear lifecycle ownership, weak tenancy boundaries, unsupported escape hatches, and measuring the platform by internal elegance rather than by whether it reduces toil for application teams.',
    ],
  },
]

const operatingChecklist = [
  'Define a small number of supported service patterns and make them genuinely easy to adopt.',
  'Expose self-service through a portal, template, CLI, or API with clear ownership, docs, and support expectations.',
  'Encode security, secrets, observability, and delivery defaults inside the golden path rather than relying on after-the-fact review alone.',
  'Standardize around real internal products and interfaces, not on direct exposure of every low-level cloud feature.',
  'Treat privileged controllers, CI credentials, repository access, and secret flows as control-plane security surfaces.',
  'Keep the platform team responsible for the paved roads and shared systems while product teams remain responsible for their services.',
  'Measure platform success with adoption, lead time, change quality, and reduced toil rather than by tool count.',
]

const examples: ExampleSection[] = [
  {
    id: 'example-template',
    title: 'Scaffold a new service through a platform template',
    code: `apiVersion: scaffolder.backstage.io/v1beta3
kind: Template
metadata:
  name: service-node
  title: Node Service Golden Path
spec:
  owner: platform-team
  parameters:
    - title: Service Details
      required: [name, owner]
  steps:
    - id: fetch-base
      action: fetch:template
    - id: publish
      action: publish:github
    - id: register
      action: catalog:register`,
    explanation:
      'A template like this shows the portal acting as a front door to the golden path. The platform is not only documenting standards; it is generating a supported starting point with repo, metadata, and catalog registration built in.',
  },
  {
    id: 'example-backstage',
    title: 'Catalog a service in a developer portal',
    code: `apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: payments-api
  description: Internal payments service
  tags:
    - nodejs
    - golden-path
spec:
  type: service
  lifecycle: production
  owner: team-payments`,
    explanation:
      'A portal or service catalog works as the discovery layer for the platform. Ownership, lifecycle, and service metadata become visible in one place instead of being spread across ad hoc docs and tribal knowledge.',
  },
  {
    id: 'example-appset',
    title: 'Generate many deployments with ApplicationSet',
    code: `apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
  name: tenant-services
spec:
  generators:
    - git:
        repoURL: https://github.com/example/platform-apps
        revision: main
        directories:
          - path: tenants/*
  template:
    metadata:
      name: '{{path.basename}}-service'
    spec:
      project: tenants
      source:
        repoURL: https://github.com/example/platform-apps
        path: '{{path}}'
      destination:
        namespace: '{{path.basename}}'
        server: https://kubernetes.default.svc`,
    explanation:
      'Fleet generation becomes important once many similar applications, environments, or tenants exist. This is a platform pattern, not just an individual app deployment pattern.',
  },
  {
    id: 'example-argocd',
    title: 'Deploy a service through GitOps',
    code: `apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: payments-api
spec:
  source:
    repoURL: https://github.com/example/platform-apps
    path: services/payments-api
  destination:
    server: https://kubernetes.default.svc
    namespace: payments
  syncPolicy:
    automated:
      prune: true
      selfHeal: true`,
    explanation:
      'This is the GitOps delivery model. Desired application state lives in git, and Argo CD continuously reconciles the cluster to that state with drift detection and rollback-friendly history.',
  },
  {
    id: 'example-helm',
    title: 'Package a service with Helm values',
    code: `image:
  repository: ghcr.io/example/payments-api
  tag: "1.9.3"

service:
  port: 8080

resources:
  requests:
    cpu: 250m
    memory: 256Mi

ingress:
  enabled: true`,
    explanation:
      'Helm usually sits underneath the broader platform as the packaging and parameterization layer for Kubernetes resources. The important design question is which values belong in the supported interface and which should remain internal chart details.',
  },
  {
    id: 'example-terraform',
    title: 'Wrap shared infrastructure behind a module',
    code: `module "payments_service" {
  source      = "../../modules/service-foundation"
  name        = "payments"
  environment = "prod"
  team        = "payments"
  enable_slo  = true
}`,
    explanation:
      'Infrastructure abstraction is part of the platform contract. Teams consume supported products through a stable interface instead of hand-authoring every network, IAM, and operational detail.',
  },
  {
    id: 'example-pulumi',
    title: 'Publish a typed infrastructure component',
    code: `export class ServiceBucket extends pulumi.ComponentResource {
  public readonly bucketName: pulumi.Output<string>;

  constructor(name: string, opts?: pulumi.ComponentResourceOptions) {
    super("platform:storage:ServiceBucket", name, {}, opts);
    const bucket = new aws.s3.Bucket(name, {}, { parent: this });
    this.bucketName = bucket.bucket;
    this.registerOutputs({ bucketName: this.bucketName });
  }
}`,
    explanation:
      'Pulumi becomes a platform tool when the team uses it to ship typed internal APIs and reusable components rather than just writing more powerful one-off infrastructure scripts.',
  },
  {
    id: 'example-crossplane',
    title: 'Expose infrastructure as a claim',
    code: `apiVersion: platform.example.io/v1alpha1
kind: PostgresInstance
metadata:
  name: payments-db
spec:
  parameters:
    size: small
    region: us-east-1
  writeConnectionSecretToRef:
    name: payments-db-conn`,
    explanation:
      'Crossplane-style claims show how a platform can expose higher-level infrastructure products through Kubernetes-native APIs while keeping cloud-specific implementation details inside the platform layer.',
  },
  {
    id: 'example-slo',
    title: 'Attach baseline SLO metadata to a service',
    code: `serviceLevelObjectives:
  availability:
    target: 99.9
  latencyP99:
    targetMs: 200
alerts:
  burnRate:
    enabled: true
runbook:
  url: https://internal.example/runbooks/payments-api`,
    explanation:
      'Operational defaults are part of platform engineering. A mature platform helps teams inherit standard SLO, alerting, and runbook wiring instead of treating observability as a separate manual project.',
  },
]

const glossary: GlossaryTerm[] = [
  {
    term: 'Platform engineering',
    definition:
      'The discipline of building internal developer platforms that provide self-service infrastructure, delivery, and operational capabilities.',
  },
  {
    term: 'Internal developer platform (IDP)',
    definition:
      'A developer-facing platform that abstracts common infrastructure and workflow complexity behind supported interfaces.',
  },
  {
    term: 'Golden path',
    definition:
      'An opinionated, well-supported template or workflow that provides the recommended way to build or deploy a service.',
  },
  {
    term: 'Self-service',
    definition:
      'A model where teams can provision or deploy through platform interfaces without filing manual tickets for routine work.',
  },
  {
    term: 'Service catalog',
    definition:
      'A structured registry of software components, owners, documentation, and operational links, often presented through a portal.',
  },
  {
    term: 'Cognitive load',
    definition:
      'The amount of operational and conceptual complexity a development team must carry to build and run software effectively.',
  },
  {
    term: 'Backstage',
    definition:
      'An open-source framework for building an internal developer portal and software catalog.',
  },
  {
    term: 'GitOps',
    definition:
      'An operating model where declared state lives in git and a controller reconciles running systems toward that state.',
  },
  {
    term: 'Argo CD',
    definition:
      'A GitOps controller for Kubernetes that syncs declared application state from git into the cluster.',
  },
  {
    term: 'ApplicationSet',
    definition:
      'An Argo CD mechanism for generating many Application objects from declarative generators and templates.',
  },
  {
    term: 'Helm',
    definition:
      'A package manager and templating system for Kubernetes that installs versioned releases from charts and values.',
  },
  {
    term: 'Terraform',
    definition:
      'A declarative infrastructure as code tool built around providers, modules, state, and plan-and-apply workflows.',
  },
  {
    term: 'Pulumi',
    definition:
      'An infrastructure as code platform that uses general-purpose programming languages to define and deploy infrastructure.',
  },
  {
    term: 'Crossplane',
    definition:
      'A Kubernetes-native infrastructure control plane that manages cloud resources and publishes higher-level platform APIs through reconciliation.',
  },
  {
    term: 'Composite resource',
    definition:
      'A higher-level platform API in Crossplane that maps to one or more lower-level managed resources.',
  },
  {
    term: 'Managed resource',
    definition:
      'A low-level provider-backed infrastructure resource in a system such as Crossplane, typically shaped close to the cloud API.',
  },
  {
    term: 'Claim',
    definition:
      'A consumer-facing, often namespaced request for a platform product such as a database or bucket.',
  },
  {
    term: 'Control plane',
    definition:
      'The system that owns desired state, policy, and reconciliation for a class of infrastructure or application resources.',
  },
  {
    term: 'Tenancy',
    definition:
      'The set of boundaries that separate teams, environments, namespaces, accounts, or clusters in a shared platform.',
  },
  {
    term: 'SLO',
    definition:
      'A service level objective, such as an availability or latency target that guides alerting and operational expectations.',
  },
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
    { id: 'bp-tool-map', label: 'Tool Map' },
    { id: 'bp-why', label: 'Why It Matters' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-product', label: 'Platform Product' },
    { id: 'core-cognitive-load', label: 'Cognitive Load' },
    { id: 'core-idp', label: 'IDP and Self-Service' },
    { id: 'core-catalog', label: 'Catalog and Templates' },
    { id: 'core-golden-paths', label: 'Golden Paths' },
    { id: 'core-building-blocks', label: 'Building Blocks' },
    { id: 'core-infra-products', label: 'Infrastructure Products' },
    { id: 'core-tools', label: 'Tool Roles' },
    { id: 'core-gitops', label: 'GitOps Delivery' },
    { id: 'core-kubernetes', label: 'Kubernetes Boundary' },
    { id: 'core-security', label: 'Security and Secrets' },
    { id: 'core-observability', label: 'Observability' },
    { id: 'core-environments', label: 'Environments and Tenancy' },
    { id: 'core-operating-model', label: 'Team Topology' },
    { id: 'core-adoption', label: 'Adoption and Metrics' },
    { id: 'core-tradeoffs', label: 'Tradeoffs' },
    { id: 'core-checklist', label: 'Operating Checklist' },
  ],
  examples: examples.map((example) => ({ id: example.id, label: example.title })),
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

const pageStyles = `
.platform-help-page{min-height:100dvh;background:#c0c0c0;padding:0;color:#000;font-family:"MS Sans Serif",Tahoma,"Segoe UI",sans-serif}
.platform-help-window{width:100%;min-height:100dvh;display:flex;flex-direction:column;box-sizing:border-box;background:#c0c0c0;border-top:2px solid #fff;border-left:2px solid #fff;border-right:2px solid #404040;border-bottom:2px solid #404040}
.platform-help-titlebar{position:relative;display:flex;align-items:center;min-height:24px;padding:2px 6px;background:linear-gradient(90deg,#000080 0%,#1084d0 100%);color:#fff;font-size:13px;font-weight:700}
.platform-help-titletext{position:absolute;left:50%;transform:translateX(-50%);max-width:calc(100% - 92px);overflow:hidden;white-space:nowrap;text-overflow:ellipsis;pointer-events:none;font-size:15px}
.platform-help-controls{display:flex;gap:2px;margin-left:auto}
.platform-help-control{width:18px;height:16px;padding:0;border-top:1px solid #fff;border-left:1px solid #fff;border-right:1px solid #404040;border-bottom:1px solid #404040;background:#c0c0c0;color:#000;display:inline-flex;align-items:center;justify-content:center;text-decoration:none;font-size:11px;line-height:1;cursor:pointer}
.platform-help-tabs{display:flex;flex-wrap:wrap;gap:1px;padding:6px 8px 0}
.platform-help-tab{padding:5px 10px 4px;border-top:1px solid #fff;border-left:1px solid #fff;border-right:1px solid #404040;border-bottom:none;background:#b6b6b6;font-size:12px;cursor:pointer}
.platform-help-tab.active{position:relative;top:1px;background:#fff}
.platform-help-main{flex:1;min-height:0;display:grid;grid-template-columns:240px minmax(0,1fr);border-top:1px solid #404040;background:#fff}
.platform-help-toc{overflow:auto;padding:12px;background:#f1f1f1;border-right:1px solid #808080}
.platform-help-toc-title{margin:0 0 10px;font-size:12px;font-weight:700}
.platform-help-toc-list{margin:0;padding:0;list-style:none}
.platform-help-toc-list li{margin:0 0 8px}
.platform-help-toc-list a{color:#000;text-decoration:none;font-size:12px}
.platform-help-toc-list a:hover{text-decoration:underline}
.platform-help-content{overflow:auto;padding:14px 20px 20px}
.platform-help-doc-title{margin:0 0 12px;font-size:20px;font-weight:700}
.platform-help-section{margin:0 0 20px}
.platform-help-heading{margin:0 0 8px;font-size:16px;font-weight:700}
.platform-help-subheading{margin:0 0 6px;font-size:13px;font-weight:700}
.platform-help-content p,.platform-help-content li{font-size:12px;line-height:1.5}
.platform-help-content p{margin:0 0 10px}
.platform-help-content ul{margin:0 0 10px 20px;padding:0}
.platform-help-divider{border:0;border-top:1px solid #d0d0d0;margin:14px 0}
.platform-help-codebox{margin:6px 0 10px;padding:8px;background:#f4f4f4;border-top:2px solid #808080;border-left:2px solid #808080;border-right:2px solid #fff;border-bottom:2px solid #fff}
.platform-help-codebox code{display:block;white-space:pre;overflow:auto;font-family:"Courier New",Courier,monospace;font-size:12px}
@media (max-width:900px){.platform-help-main{grid-template-columns:1fr}.platform-help-toc{border-right:none;border-bottom:1px solid #808080}}
`

function isTabId(value: string | null): value is TabId {
  return (
    value === 'big-picture' ||
    value === 'core-concepts' ||
    value === 'examples' ||
    value === 'glossary'
  )
}

export default function PlatformEngineeringPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    const tab = searchParams.get('tab')
    return isTabId(tab) ? tab : 'big-picture'
  })

  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'
  const activeSections = sectionLinks[activeTab] ?? []

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `Platform Engineering (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Platform Engineering',
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
    <div className="platform-help-page">
      <style>{pageStyles}</style>
      <div className="platform-help-window" role="presentation">
        <header className="platform-help-titlebar">
          <span className="platform-help-titletext">Platform Engineering</span>
          <div className="platform-help-controls">
            <button
              className="platform-help-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="platform-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="platform-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`platform-help-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="platform-help-main">
          <aside className="platform-help-toc" aria-label="Table of contents">
            <h2 className="platform-help-toc-title">Contents</h2>
            <ul className="platform-help-toc-list">
              {activeSections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="platform-help-content">
            <h1 className="platform-help-doc-title">Platform Engineering</h1>
            {introParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="platform-help-section">
                  <h2 className="platform-help-heading">Overview</h2>
                  {bigPicture.map((item) => (
                    <div key={item.title}>
                      <h3 className="platform-help-subheading">{item.title}</h3>
                      <p>{item.details}</p>
                      <p>{item.notes}</p>
                    </div>
                  ))}
                </section>

                <hr className="platform-help-divider" />

                <section id="bp-tool-map" className="platform-help-section">
                  <h2 className="platform-help-heading">Tool Map</h2>
                  {platformDecisionGuide.map((item) => (
                    <div key={item.title}>
                      <h3 className="platform-help-subheading">{item.title}</h3>
                      <p>{item.details}</p>
                    </div>
                  ))}
                </section>

                <hr className="platform-help-divider" />

                <section id="bp-why" className="platform-help-section">
                  <h2 className="platform-help-heading">Why It Matters</h2>
                  <p>
                    The operational burden of modern delivery stacks is too high to leave entirely
                    to each application team. Platform engineering matters because it converts
                    repeated infrastructure and delivery work into supported internal products
                    instead of repeated custom setup.
                  </p>
                  <p>
                    It also creates a way to standardize without centralizing every change request.
                    Teams can move faster because the safe path is prebuilt, while governance
                    improves because that path already encodes policy, operational defaults, and
                    ownership expectations.
                  </p>
                  <p>
                    When it works well, the platform becomes a force multiplier. Application teams
                    spend less time stitching together pipelines, IAM, charts, and dashboards and
                    more time shipping the service behavior that matters to the business.
                  </p>
                </section>

                <hr className="platform-help-divider" />

                <section id="bp-takeaways" className="platform-help-section">
                  <h2 className="platform-help-heading">Key Takeaways</h2>
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
                {coreSections.map((section) => (
                  <section key={section.id} id={section.id} className="platform-help-section">
                    <h2 className="platform-help-heading">{section.title}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={`${section.id}-${paragraph}`}>{paragraph}</p>
                    ))}
                  </section>
                ))}

                <section id="core-checklist" className="platform-help-section">
                  <h2 className="platform-help-heading">Operating Checklist</h2>
                  <ul>
                    {operatingChecklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                {examples.map((example) => (
                  <section key={example.id} id={example.id} className="platform-help-section">
                    <h2 className="platform-help-heading">{example.title}</h2>
                    <div className="platform-help-codebox">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </section>
                ))}
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="platform-help-section">
                <h2 className="platform-help-heading">Glossary</h2>
                {glossary.map((item) => (
                  <p key={item.term}>
                    <strong>{item.term}:</strong> {item.definition}
                  </p>
                ))}
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
