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

const pageTitle = 'Argo CD'
const pageSubtitle =
  'GitOps continuous delivery for Kubernetes with declarative applications, reconciliation, policy boundaries, and multi-cluster delivery.'

const introParagraphs = [
  'Argo CD is a Kubernetes continuous delivery system built around GitOps. Instead of pushing deploy commands from a CI runner into clusters and hoping the live state stays aligned, Argo CD continuously compares what Git says should exist with what the cluster actually contains, then surfaces or reconciles the difference. The control plane is declarative and cluster-native.',
  'That sounds simple until the real platform concerns appear: how applications are modeled, how teams and environments are isolated, how repositories and cluster credentials are registered, how automated sync should behave, when hooks and sync waves are appropriate, how drift is ignored or enforced, and how large fleets of Applications are generated safely.',
  'This page treats Argo CD as a platform-engineering topic rather than a product brochure. The goal is to explain the GitOps model, the main control-plane components, Application and AppProject design, sync behavior, ApplicationSet, RBAC, security boundaries, operations, and the patterns that keep Argo CD from turning into an uncontrolled YAML launcher.',
]

const bigPictureSections = [
  {
    title: 'What it is',
    paragraphs: [
      'Argo CD is a pull-based GitOps controller for Kubernetes. It watches declarative application definitions, renders the desired manifests from sources such as plain YAML, Kustomize, Helm, Jsonnet, or config-management plugins, compares those manifests to the live cluster state, and reports or reconciles the difference.',
      'The key shift is that deployment intent lives in Git and the cluster control loop pulls toward that intent. Argo CD is not just a nicer deploy dashboard. It is a reconciliation system for Kubernetes application state with a UI, API, CLI, RBAC, health reporting, and multicluster application management layered on top.',
    ],
  },
  {
    title: 'GitOps mental model',
    paragraphs: [
      'The cleanest mental model is Git as desired state, Kubernetes as live state, and Argo CD as the controller that keeps asking whether the two still match. A deployment is no longer "a job ran once." It is an ongoing relationship between a declarative source and a continuously observed runtime.',
      'That matters because drift is treated as a first-class concern. Manual kubectl changes, out-of-band controller mutations, defaulted fields, chart render changes, or environment-specific overrides all show up in the comparison path. Healthy Argo CD design therefore depends on being explicit about what should be reconciled and what should be ignored.',
    ],
  },
  {
    title: 'Where it fits',
    paragraphs: [
      'Argo CD fits when a team is operating Kubernetes and wants a declarative delivery model with auditable Git history, predictable reconciliation, application-level visibility, and cluster pull instead of CI push. It is especially strong for platform teams that manage many services, environments, or clusters and need a common delivery control plane.',
      'It also fits well when Kubernetes delivery needs richer structure than "apply this chart somehow." AppProjects, RBAC, sync windows, health status, hooks, ApplicationSet, multicluster destinations, and declarative repository registration make Argo CD useful as a shared platform boundary rather than just a deploy helper.',
    ],
  },
  {
    title: 'Why teams adopt it',
    paragraphs: [
      'Teams adopt Argo CD because it provides visible desired-versus-live state, supports multiple config generation tools, and turns delivery into a controller problem rather than a shell-script problem. Operators get a UI and API for sync status, history, health, and diffs. Developers get a Git-centered workflow instead of hidden cluster mutations.',
      'It is also attractive because it scales across operating models. A single team can manage a few Applications manually. A platform team can impose AppProject boundaries. Large fleets can be generated through ApplicationSet. High-availability deployments can run as a shared control plane instead of many one-off CI deploy jobs spread across teams.',
    ],
  },
  {
    title: 'Where teams get it wrong',
    paragraphs: [
      'Argo CD goes wrong when organizations confuse declarative delivery with "put every possible runtime choice outside Git." Excessive parameter overrides, manual syncs used as a permanent habit, overly broad default projects, and weak repository or cluster boundaries turn GitOps into a thin veneer over the same uncontrolled release process.',
      'It is also the wrong tool if the team does not actually want Git to be the source of truth for Kubernetes application state. Argo CD assumes reconciliation, drift detection, and controller ownership. If the real operating model is imperative cluster mutation, Argo CD will mostly serve as a noisy reminder that the platform has two competing truths.',
    ],
  },
]

const operatingModels = [
  {
    title: 'Application-by-application management',
    summary:
      'Best for smaller setups where individual Applications are created and reasoned about directly by humans or a small platform team.',
    details: [
      'Clear and explicit for early adoption.',
      'Works well when the number of applications and clusters is still manageable by hand.',
      'Becomes operationally noisy when fleets, tenants, or environments multiply.',
    ],
  },
  {
    title: 'ApplicationSet-driven fleet management',
    summary:
      'Best for repeating application patterns across many clusters, environments, tenants, or repository directories.',
    details: [
      'Generates many Applications from declarative generators and templates.',
      'Useful for multicluster rollouts, per-tenant apps, and repo-driven discovery patterns.',
      'Requires discipline because generator mistakes can fan out quickly.',
    ],
  },
  {
    title: 'AppProject-scoped shared platform',
    summary:
      'Best when many teams share one Argo CD installation but need controlled source, destination, and RBAC boundaries.',
    details: [
      'AppProjects are the main tenancy and policy boundary inside Argo CD.',
      'They restrict allowed repositories, clusters, namespaces, and resource kinds.',
      'Project roles and JWTs make project-level automation and access delegation possible.',
    ],
  },
  {
    title: 'Argo CD Core',
    summary:
      'Best when the team wants the GitOps engine without the full API server, UI, or multi-user control-plane experience.',
    details: [
      'Core mode focuses on Kubernetes reconciliation and CLI interaction.',
      'It reduces some control-plane surface area when the full service experience is not required.',
      'It is not a drop-in replacement for the full shared Argo CD experience if teams need UI, SSO, or broader RBAC workflows.',
    ],
  },
]

const lifecycleFlow = [
  'A repository commit, webhook, or refresh causes Argo CD to look at the Application definition and source settings.',
  'The repo-server fetches the configured source or sources and renders manifests through the selected toolchain such as plain YAML, Helm, Kustomize, Jsonnet, or a config-management plugin.',
  'The application controller compares the rendered desired state with the live resources in the target cluster and computes sync and health status.',
  'If the Application is set to manual sync, operators review and trigger reconciliation explicitly. If it is automated, Argo CD applies the configured sync policy, retry policy, prune behavior, self-heal behavior, and sync options.',
  'Hooks and sync waves can sequence resources or lifecycle actions, while diff customization and ignore rules prevent noisy or unsafe reconciliation on fields that are expected to drift.',
  'After sync, Argo CD keeps watching. Drift, health regressions, or source changes will surface again until the live cluster and declared state converge or an operator changes the configuration.',
]

const fitGuide = [
  {
    title: 'Need pull-based GitOps delivery for Kubernetes applications',
    choice: 'Use Argo CD.',
  },
  {
    title: 'Need to generate many similar Applications across clusters or environments',
    choice: 'Use ApplicationSet on top of Argo CD rather than hand-authoring every Application object.',
  },
  {
    title: 'Need only chart rendering or package templating',
    choice: 'Helm alone is not the same as Argo CD. Helm packages; Argo CD reconciles desired versus live state.',
  },
  {
    title: 'Need a lighter GitOps engine without the full Argo CD service plane',
    choice: 'Consider Argo CD Core if the CLI-and-controller model is sufficient.',
  },
  {
    title: 'Need to manage infrastructure well beyond Kubernetes application delivery',
    choice: 'Combine Argo CD with infrastructure tools such as Terraform or Crossplane rather than expecting Argo CD to become a universal control plane.',
  },
]
const coreConceptSections: NarrativeSection[] = [
  {
    id: 'core-gitops',
    heading: 'GitOps Model: Desired State, Live State, and Reconciliation',
    paragraphs: [
      'Argo CD is easiest to understand as a reconciliation engine. Git declares what an application should look like. The cluster contains what the application actually looks like right now. Argo CD keeps comparing those two realities and marks the Application as Synced or OutOfSync based on that comparison.',
      'This is different from traditional push-based deployment systems where a pipeline emits kubectl or Helm commands and then leaves. In Argo CD, deployment is not finished just because something was applied once. The controller keeps watching. If the live state drifts or the source changes, the application status changes with it.',
      'That continuous reconciliation is powerful, but it also means teams need a disciplined source-of-truth model. If humans, CI systems, admission webhooks, or operators are all mutating the same resources without a clear contract, Argo CD will faithfully reveal the conflict rather than silently resolve it.',
    ],
  },
  {
    id: 'core-architecture',
    heading: 'Control Plane Architecture and Main Components',
    paragraphs: [
      'The main Argo CD control plane includes the API server, the repository server, and the application controller. The API server exposes the UI, CLI, API surface, RBAC checks, and session or auth integration. The repo-server fetches sources and renders manifests. The application controller compares live and desired state and performs sync operations.',
      'Many deployments also include the ApplicationSet controller for fleet generation, Redis for caching and performance support, and optional identity integration such as Dex or direct SSO configuration depending on the chosen auth model. These pieces together form a delivery control plane rather than a single pod doing kubectl apply in a loop.',
      'This architecture matters operationally because performance, scale, and security depend on component responsibilities. Repo-server access to repositories is sensitive. The controller needs cluster access. API access and RBAC determine who may trigger or alter sync behavior. Argo CD is small enough to feel simple, but it is still a real control plane and should be treated that way.',
    ],
  },
  {
    id: 'core-application',
    heading: 'Application Spec, Sources, and Manifest Generation',
    paragraphs: [
      'The Application resource is the central Argo CD abstraction. It defines where the source comes from, how to render it, where it should be deployed, and which sync and diff rules apply. Typical fields include repository URL, target revision, path or chart settings, destination cluster and namespace, sync policy, ignore differences, and sync options.',
      'Argo CD supports multiple source types and multiple generation tools. Plain directory manifests, Helm charts, Kustomize overlays, Jsonnet, and config-management plugins are all supported. Newer Application specs can also use multiple sources, but teams should be careful: combining sources can solve real composition problems while also making application intent harder to reason about.',
      'Parameter overrides exist, but Argo CD documentation explicitly treats this as a weak fit for pure GitOps and mainly useful in development or ad hoc cases. In mature environments, the safest default is still to keep effective deployment intent in Git rather than relying on UI or CLI overrides that are disconnected from the declarative source.',
    ],
  },
  {
    id: 'core-projects',
    heading: 'AppProjects as Policy, Tenancy, and Blast-Radius Boundaries',
    paragraphs: [
      'AppProjects are one of the most important Argo CD design tools because they are the policy boundary for groups of Applications. A project can restrict which repositories are allowed, which clusters and namespaces are valid destinations, and which cluster-scoped or namespaced resource kinds may be managed.',
      'In practice, AppProjects are what prevent a shared Argo CD installation from collapsing into one giant super-admin deploy surface. Without meaningful projects, any team with access to create or modify Applications can potentially target the wrong clusters, consume unreviewed repositories, or manage resources outside its intended scope.',
      'Projects also support roles and JWTs, which makes them useful for scoped automation and delegated control. The strong design pattern is to align AppProjects with real ownership or tenancy boundaries, not with arbitrary naming categories that do nothing to reduce risk.',
    ],
  },
  {
    id: 'core-sync',
    heading: 'Sync Policies: Manual, Automated, Prune, Self-Heal, Retry, and Refresh',
    paragraphs: [
      'Argo CD supports both manual and automated sync. Manual sync keeps reconciliation visible but requires an operator or automation to approve the apply step. Automated sync lets Argo CD apply changes as it detects new desired state or drift. This is where GitOps becomes operationally real rather than just observational.',
      'Automated sync itself has meaningful sub-behavior. Prune removes resources no longer defined in source. SelfHeal tells Argo CD to bring live state back to declared state when the cluster drifts. AllowEmpty changes behavior around empty application results. Retry policy and refresh behavior shape how Argo CD reacts when sync fails or when a new revision appears.',
      'The important design lesson is that automated sync is not one toggle called "safe." Teams should decide which applications should auto-prune, which should self-heal, which need windows or manual review, and where retries are helpful versus dangerous. GitOps maturity is mostly about these policy decisions.',
    ],
  },
  {
    id: 'core-hooks',
    heading: 'Hooks, Phases, Waves, and Ordered Delivery',
    paragraphs: [
      'Argo CD supports resource hooks for lifecycle events such as PreSync, Sync, PostSync, SyncFail, PostDelete, and Skip. These hooks allow actions such as migrations, smoke checks, notifications, or cleanup steps to participate in the delivery workflow. They are powerful because they let reconciliation include more than just blind apply operations.',
      'Sync waves provide ordering. Resources with lower wave numbers are applied before higher ones, and Argo CD also uses phase and kind ordering rules to decide application sequence. This is how teams express that a CRD, migration job, or platform dependency must land before other resources try to use it.',
      'Hooks and waves solve real delivery problems, but they should be used deliberately. When a deployment requires many hidden phases and custom lifecycle tricks, that often indicates the application model is too implicit. Ordered delivery should clarify the release process, not become a second orchestration system hidden in annotations.',
    ],
  },
  {
    id: 'core-diff',
    heading: 'Diffing, Drift Detection, Compare Customization, and Ignore Rules',
    paragraphs: [
      'Diffing is at the center of Argo CD. The controller decides whether an Application is Synced or OutOfSync by comparing rendered desired manifests with live Kubernetes resources. That sounds straightforward, but real clusters contain admission mutations, defaulted fields, controller-owned fields, and generated values that can create noisy or misleading drift.',
      'Argo CD therefore supports diff customization and ignoreDifferences rules. These settings let teams intentionally ignore fields, managers, or specific resource paths that should not trigger reconciliation noise. Used well, this keeps the signal clean. Used carelessly, it can hide real drift and make the system report false confidence.',
      'The rule of thumb is to ignore only what is clearly understood. If a field is drifting, the question is not "how do we silence this diff?" The first question is "why is this changing, and should Argo CD own it?" Compare customization is a precision tool, not a broom for sweeping away design confusion.',
    ],
  },
  {
    id: 'core-sync-options',
    heading: 'Sync Options and the Meaning of Destructive Flags',
    paragraphs: [
      'Argo CD exposes sync options for changing how reconciliation is performed. Common examples include CreateNamespace, ServerSideApply, Replace, Force, PruneLast, FailOnSharedResource, and RespectIgnoreDifferences. These options let teams adapt Argo CD to specific Kubernetes behaviors and resource constraints.',
      'Some options are operationally mild, while others are intentionally sharp. Replace and Force, for example, can delete and recreate resources rather than patch them. ServerSideApply changes ownership and merge behavior. PruneLast changes sequencing. These are not casual convenience flags. They alter the reconciliation contract.',
      'A mature platform treats sync options as explicit policy choices with documentation and review. If teams scatter destructive options through Applications without shared understanding, Argo CD becomes unpredictable under failure or drift. The same feature that rescues a difficult resource today can produce a surprising outage later.',
    ],
  },
  {
    id: 'core-appset',
    heading: 'ApplicationSet and Fleet Generation',
    paragraphs: [
      'ApplicationSet generates multiple Argo CD Applications from a higher-level template plus one or more generators. Common generator patterns include cluster-driven, Git-driven, list-based, matrix, merge, pull-request, and SCM-provider style generation. The result is a fleet of Applications managed from one declarative template instead of many copy-pasted resources.',
      'This is one of Argo CD\'s most important scale features. It allows platform teams to stamp applications across clusters, environments, tenants, or repository structures while keeping the Application spec itself consistent. It is especially useful for multicluster rollout patterns and namespace-per-tenant or environment-per-folder models.',
      'The tradeoff is blast radius. A generator or template mistake can affect many Applications at once. ApplicationSet is therefore powerful in exactly the way infrastructure templating is powerful: it reduces repetition, but it also amplifies bad assumptions. Review, testing, and clear boundaries matter more, not less.',
    ],
  },
  {
    id: 'core-connectivity',
    heading: 'Repository Credentials, Cluster Registration, and Declarative Setup',
    paragraphs: [
      'Argo CD needs trusted access to two worlds: source repositories and destination clusters. Repositories can be registered with credentials, TLS material, SSH configuration, or project scope. Clusters can also be registered declaratively or through the CLI, and project-scoped repositories or clusters can restrict which teams may use them.',
      'This is where many security and governance mistakes begin. If one Argo CD instance has broad access to every repo and every cluster with weak project boundaries, then a single misconfigured Application can cross far more trust boundaries than intended. Repository and cluster registration should be treated as high-sensitivity control-plane configuration.',
      'Declarative setup is important here because it makes the control plane itself reproducible. Argo CD can manage its own configuration, but that only works well when teams are deliberate about bootstrap ordering, secret handling, and who is allowed to alter the Argo CD namespace and control-plane resources.',
    ],
  },
  {
    id: 'core-security',
    heading: 'Security, RBAC, SSO, Local Users, and Project Roles',
    paragraphs: [
      'Argo CD includes RBAC for the API, UI, and CLI. Permissions are typically expressed through roles, policy rules, and group mappings, often backed by SSO. Local users also exist, and project roles can mint JWT tokens for scoped automation. This makes Argo CD powerful for shared environments, but only if role design is intentional.',
      'Security design in Argo CD should focus on who may view, sync, override, delete, or create Applications and who may administer repositories, clusters, and projects. Those are not equal privileges. An engineer allowed to sync one Application in one project should not implicitly gain authority to deploy arbitrary manifests into every cluster the control plane knows about.',
      'Argo CD is also a high-value target because it often holds repository credentials, cluster credentials, and deployment authority. Hardening the control plane, using least privilege, scoping tokens, and reviewing admin access are not optional hygiene tasks. They are core platform responsibilities.',
    ],
  },
  {
    id: 'core-operations',
    heading: 'Health, Rollback, Webhooks, Sync Windows, HA, and Day-Two Operations',
    paragraphs: [
      'Operating Argo CD well means watching more than sync status. Application health, revision history, operation history, webhook delivery, repo-server performance, controller load, and cluster connectivity all affect whether the system behaves like a trustworthy delivery plane or a confusing status board.',
      'Argo CD supports webhook-driven refresh, rollback to previous deployment revisions, sync windows for change control, and high-availability deployment modes. These are the features that matter after the demo. They determine whether Argo CD can be trusted during incidents, release freezes, busy deployment periods, and large control-plane scale.',
      'Day-two maturity also means understanding which differences are expected, which Applications should auto-sync, how bootstrap is handled, how to recover the control plane, how metrics and audit trails are collected, and how teams avoid deadlock between Argo CD ownership and other controllers that legitimately mutate resources.',
    ],
  },
]
const operationsNotes = [
  {
    title: 'Treat AppProjects as mandatory boundaries',
    detail:
      'The default project is convenient for experiments, but serious shared environments should use purpose-built projects with clear repository, destination, and resource limits.',
  },
  {
    title: 'Keep effective intent in Git',
    detail:
      'Parameter overrides are useful in limited scenarios, but long-lived operational truth should stay in the repo if the platform is meant to be genuinely GitOps.',
  },
  {
    title: 'Auto-sync is a policy decision, not a badge of maturity',
    detail:
      'Some Applications should self-heal aggressively. Others should require review windows, sync waves, or manual approval. Treat automation as contract design.',
  },
  {
    title: 'Review ignore rules carefully',
    detail:
      'Every ignored diff is a decision to give up controller visibility on part of the live state. That can be correct, but it should never be accidental.',
  },
  {
    title: 'Protect repo-server and cluster credentials',
    detail:
      'If Argo CD can read the repos and reach the clusters, compromise of the control plane becomes deployment compromise. Credential scope and storage matter.',
  },
  {
    title: 'Plan bootstrap explicitly',
    detail:
      'Self-managing Argo CD is useful, but bootstrap order, secrets, initial admin access, and recovery flows still need a clear design rather than hand-waved optimism.',
  },
]

const designPatterns = [
  {
    title: 'Application per service per environment',
    detail:
      'A straightforward model where each deployable service and environment pair maps to one Application with clear ownership, source path, and sync policy.',
  },
  {
    title: 'Project-scoped shared platform',
    detail:
      'One shared Argo CD control plane hosts many teams, while AppProjects enforce which repos, clusters, namespaces, and resource kinds each team may manage.',
  },
  {
    title: 'ApplicationSet for fleet fan-out',
    detail:
      'Use templated generation to stamp consistent Applications across clusters, environments, or tenants instead of hand-authoring many near-identical objects.',
  },
  {
    title: 'GitOps plus Helm or Kustomize',
    detail:
      'Use Helm, Kustomize, or another supported generator to express manifests, then let Argo CD own reconciliation, health, history, and drift behavior.',
  },
  {
    title: 'Sync waves for dependency-aware rollout',
    detail:
      'Use waves and hooks when the release sequence truly matters, such as CRDs before custom resources or migrations before application rollout.',
  },
  {
    title: 'Platform bootstrap repo',
    detail:
      'Keep Argo CD projects, repository registrations, shared add-ons, and core applications under a reviewed bootstrap source rather than scattered manual setup.',
  },
]

const compareNotes = [
  {
    title: 'Argo CD vs Helm',
    detail:
      'Helm is primarily packaging and templating. Argo CD is the reconciliation and delivery control plane that can consume Helm as one of several source formats.',
  },
  {
    title: 'Argo CD vs CI push deploys',
    detail:
      'CI pipelines push actions into clusters. Argo CD pulls desired state from source and keeps reconciling after the first apply, which changes the operational model completely.',
  },
  {
    title: 'Argo CD vs Terraform or Crossplane',
    detail:
      'Terraform and Crossplane are broader infrastructure management tools. Argo CD is strongest as the Kubernetes application delivery and reconciliation layer.',
  },
  {
    title: 'Argo CD vs Argo CD Core',
    detail:
      'The full product includes the API server, UI, RBAC, and shared control-plane features. Core keeps the GitOps engine and CLI-centric operation without the full service experience.',
  },
]

const pitfalls = [
  'Treating Argo CD as a prettier kubectl runner instead of a reconciliation system with a real source-of-truth model.',
  'Leaving everything in the default project and accidentally creating one giant shared deployment superuser surface.',
  'Relying on UI or CLI parameter overrides as long-lived production truth instead of committing effective configuration to Git.',
  'Turning on automated sync, prune, and self-heal without understanding which applications are safe to reconcile that aggressively.',
  'Using ignoreDifferences to silence unexplained drift instead of understanding why the drift exists.',
  'Letting one Argo CD instance hold overly broad repo and cluster access with weak AppProject restrictions.',
  'Overusing hooks and waves until releases become hidden procedural workflows encoded in annotations.',
  'Generating large fleets with ApplicationSet without sufficient review, testing, or blast-radius awareness.',
]
const examples: ExampleSection[] = [
  {
    id: 'example-application',
    title: 'Define a minimal Application with automated sync',
    code: `
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: payments-prod
  namespace: argocd
spec:
  project: platform-prod
  source:
    repoURL: https://github.com/example/platform-apps.git
    targetRevision: main
    path: services/payments/overlays/prod
  destination:
    server: https://kubernetes.default.svc
    namespace: payments
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true
      - ServerSideApply=true
`,
    explanation:
      'This is the core Argo CD object: one source of truth, one target destination, and an explicit sync policy. It shows the normal GitOps path where the cluster is expected to follow the repo automatically.',
  },
  {
    id: 'example-project',
    title: 'Use an AppProject to constrain sources, destinations, and roles',
    code: `
apiVersion: argoproj.io/v1alpha1
kind: AppProject
metadata:
  name: platform-prod
  namespace: argocd
spec:
  sourceRepos:
    - https://github.com/example/platform-apps.git
  destinations:
    - server: https://kubernetes.default.svc
      namespace: payments
  clusterResourceWhitelist:
    - group: '*'
      kind: Namespace
  namespaceResourceWhitelist:
    - group: apps
      kind: Deployment
    - group: ''
      kind: Service
    - group: ''
      kind: ConfigMap
  roles:
    - name: deployer
      description: Payments deployment operators
      policies:
        - p, proj:platform-prod:deployer, applications, get, platform-prod/*, allow
        - p, proj:platform-prod:deployer, applications, sync, platform-prod/*, allow
      groups:
        - payments-oncall
`,
    explanation:
      'AppProjects are the main tenancy boundary inside a shared Argo CD installation. A good project constrains what can be deployed from where, to which clusters and namespaces, and by whom.',
  },
  {
    id: 'example-appset',
    title: 'Generate fleet Applications with ApplicationSet',
    code: `
apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
  name: ingress-fleet
  namespace: argocd
spec:
  generators:
    - clusters: {}
  template:
    metadata:
      name: '{{name}}-ingress'
    spec:
      project: platform
      source:
        repoURL: https://github.com/example/platform-apps.git
        targetRevision: main
        path: platform/ingress
      destination:
        server: '{{server}}'
        namespace: ingress-system
      syncPolicy:
        automated:
          prune: true
          selfHeal: true
`,
    explanation:
      'ApplicationSet turns one template into many Applications. This example uses the cluster generator so every registered cluster receives a consistent ingress deployment without manually authoring separate Application objects.',
  },
  {
    id: 'example-hooks',
    title: 'Order migrations and workloads with hooks and sync waves',
    code: `
apiVersion: batch/v1
kind: Job
metadata:
  name: payments-migrate
  annotations:
    argocd.argoproj.io/hook: PreSync
    argocd.argoproj.io/sync-wave: "-1"
spec:
  template:
    spec:
      restartPolicy: Never
      containers:
        - name: migrate
          image: ghcr.io/example/payments-migrate:1.0.0
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: payments-api
  annotations:
    argocd.argoproj.io/sync-wave: "0"
spec:
  replicas: 3
`,
    explanation:
      'PreSync hooks and sync waves are useful when release order matters. The migration job runs before the main deployment because it is both a hook and assigned to an earlier wave.',
  },
  {
    id: 'example-diff-sync',
    title: 'Customize diff and sync behavior for expected live-state changes',
    code: `
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: web-prod
  namespace: argocd
spec:
  project: platform-prod
  ignoreDifferences:
    - group: apps
      kind: Deployment
      jsonPointers:
        - /spec/replicas
  syncPolicy:
    syncOptions:
      - RespectIgnoreDifferences=true
      - ApplyOutOfSyncOnly=true
      - PruneLast=true
`,
    explanation:
      'This pattern is useful when a field such as replicas is intentionally managed elsewhere, but it should be used carefully. Ignore rules and sync options change the reconciliation contract and should never be cargo-culted across every Application.',
  },
]

const glossaryTerms = [
  {
    term: 'Application',
    definition:
      'The core Argo CD custom resource that describes one deployable unit: source, destination, sync policy, and diff behavior.',
  },
  {
    term: 'AppProject',
    definition:
      'A policy and tenancy boundary that restricts which repositories, clusters, namespaces, resource kinds, and roles are valid for a set of Applications.',
  },
  {
    term: 'ApplicationSet',
    definition:
      'A higher-level custom resource that generates many Argo CD Applications from generators and templates.',
  },
  {
    term: 'Synced',
    definition:
      'An Argo CD state meaning the rendered desired manifests currently match the live cluster state according to the active diff rules.',
  },
  {
    term: 'OutOfSync',
    definition:
      'An Argo CD state meaning the desired state and live state differ, whether because Git changed, the cluster drifted, or diff rules no longer match.',
  },
  {
    term: 'Health',
    definition:
      'Argo CD\'s view of how healthy the application resources are, separate from pure sync status.',
  },
  {
    term: 'Repo server',
    definition:
      'The Argo CD component that fetches repositories and renders manifests through tools such as Helm, Kustomize, Jsonnet, or plugins.',
  },
  {
    term: 'Self-heal',
    definition:
      'An automated sync setting that tells Argo CD to reapply desired state when live resources drift from what is declared.',
  },
  {
    term: 'Prune',
    definition:
      'A sync behavior that deletes resources which exist in the cluster but are no longer part of the declared application source.',
  },
  {
    term: 'Sync wave',
    definition:
      'An annotation-based ordering mechanism that influences the sequence in which resources are applied during a sync.',
  },
  {
    term: 'Hook',
    definition:
      'A resource annotated to participate in a specific sync lifecycle phase such as PreSync, Sync, PostSync, or SyncFail.',
  },
  {
    term: 'Ignore differences',
    definition:
      'A configuration that tells Argo CD to ignore specified live-state differences when calculating application sync status.',
  },
  {
    term: 'Sync window',
    definition:
      'A project-level allow or deny schedule that controls when Applications may be synchronized.',
  },
  {
    term: 'Argo CD Core',
    definition:
      'A lighter installation mode focused on the GitOps engine and CLI workflow without the full API server and UI experience.',
  },
]

const pageSources = [
  'https://argo-cd.readthedocs.io/en/stable/',
  'https://argo-cd.readthedocs.io/en/stable/operator-manual/architecture/',
  'https://argo-cd.readthedocs.io/en/stable/user-guide/application-specification/',
  'https://argo-cd.readthedocs.io/en/stable/operator-manual/declarative-setup/',
  'https://argo-cd.readthedocs.io/en/stable/operator-manual/rbac/',
  'https://argo-cd.readthedocs.io/en/stable/operator-manual/core/',
  'https://argo-cd.readthedocs.io/en/stable/operator-manual/high_availability/',
  'https://argo-cd.readthedocs.io/en/stable/user-guide/auto_sync/',
  'https://argo-cd.readthedocs.io/en/stable/user-guide/sync-options/',
  'https://argo-cd.readthedocs.io/en/stable/user-guide/sync-waves/',
  'https://argo-cd.readthedocs.io/en/stable/user-guide/diffing/',
  'https://argo-cd.readthedocs.io/en/stable/user-guide/sync_windows/',
  'https://argo-cd.readthedocs.io/en/stable/user-guide/application-set/',
  'https://argo-cd.readthedocs.io/en/stable/operator-manual/applicationset/applicationset-specification/',
  'https://argo-cd.readthedocs.io/en/stable/user-guide/parameters/',
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
    { id: 'bp-models', label: 'Operating Models' },
    { id: 'bp-flow', label: 'Reconciliation Flow' },
    { id: 'bp-fit', label: 'When to Use Argo CD' },
  ],
  'core-concepts': [
    { id: 'core-gitops', label: 'GitOps Model' },
    { id: 'core-architecture', label: 'Architecture' },
    { id: 'core-application', label: 'Applications' },
    { id: 'core-projects', label: 'AppProjects' },
    { id: 'core-sync', label: 'Sync Policies' },
    { id: 'core-hooks', label: 'Hooks and Waves' },
    { id: 'core-diff', label: 'Diff and Drift' },
    { id: 'core-sync-options', label: 'Sync Options' },
    { id: 'core-appset', label: 'ApplicationSet' },
    { id: 'core-connectivity', label: 'Repos and Clusters' },
    { id: 'core-security', label: 'Security and RBAC' },
    { id: 'core-operations', label: 'Operations and HA' },
    { id: 'core-ops', label: 'Operational Notes' },
    { id: 'core-patterns', label: 'Design Patterns' },
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

const argoCdHelpStyles = `
.argo-cd-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.argo-cd-help-page .win98-window {
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

.argo-cd-help-page .win98-titlebar {
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

.argo-cd-help-page .win98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.argo-cd-help-page .win98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.argo-cd-help-page .win98-control {
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
  font-family: inherit;
  padding: 0;
}

.argo-cd-help-page .win98-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
}

.argo-cd-help-page .win98-tab {
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

.argo-cd-help-page .win98-tab.active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.argo-cd-help-page .win98-main {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  flex: 1;
  min-height: 0;
  border-top: 1px solid #404040;
  background: #ffffff;
}

.argo-cd-help-page .win98-toc {
  overflow: auto;
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
}

.argo-cd-help-page .win98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.argo-cd-help-page .win98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.argo-cd-help-page .win98-toc-list li {
  margin: 0 0 8px;
}

.argo-cd-help-page .win98-toc-list a {
  color: #000000;
  font-size: 12px;
  text-decoration: none;
}

.argo-cd-help-page .win98-content {
  overflow-x: auto;
  overflow-y: scroll;
  scrollbar-gutter: stable;
  padding: 14px 20px 20px;
}

.argo-cd-help-page .win98-doc-title {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 700;
}

.argo-cd-help-page .win98-doc-subtitle {
  margin: 0 0 12px;
  font-size: 12px;
  font-weight: 700;
}

.argo-cd-help-page .win98-section {
  margin: 0 0 22px;
}

.argo-cd-help-page .win98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.argo-cd-help-page .win98-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.argo-cd-help-page .win98-content p,
.argo-cd-help-page .win98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.argo-cd-help-page .win98-content p {
  margin: 0 0 10px;
}

.argo-cd-help-page .win98-content ul,
.argo-cd-help-page .win98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.argo-cd-help-page .win98-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.argo-cd-help-page .win98-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.argo-cd-help-page .win98-codebox code {
  display: block;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
}

.argo-cd-help-page .win98-inline-link {
  color: #000080;
}

@media (max-width: 900px) {
  .argo-cd-help-page .win98-main {
    grid-template-columns: 1fr;
  }

  .argo-cd-help-page .win98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .argo-cd-help-page .win98-title-text {
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

function getTabFromSearch(search: string): TabId {
  const tab = new URLSearchParams(search).get('tab')
  return isTabId(tab) ? tab : 'big-picture'
}

export default function ArgoCdPage(): JSX.Element {
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
    <div className="argo-cd-help-page">
      <style>{argoCdHelpStyles}</style>
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

                <section id="bp-models" className="win98-section">
                  <h2 className="win98-heading">Operating Models</h2>
                  {operatingModels.map((item) => (
                    <div key={item.title}>
                      <h3 className="win98-subheading">{item.title}</h3>
                      <p>{item.summary}</p>
                      <ul>
                        {item.details.map((detail) => (
                          <li key={detail}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>

                <hr className="win98-divider" />

                <section id="bp-flow" className="win98-section">
                  <h2 className="win98-heading">Reconciliation Flow</h2>
                  <ol>
                    {lifecycleFlow.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </section>

                <hr className="win98-divider" />

                <section id="bp-fit" className="win98-section">
                  <h2 className="win98-heading">When to Use Argo CD</h2>
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
                  <section key={section.id} id={section.id} className="win98-section">
                    <h2 className="win98-heading">{section.heading}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </section>
                ))}

                <section id="core-ops" className="win98-section">
                  <h2 className="win98-heading">Operational Notes</h2>
                  {operationsNotes.map((item) => (
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
                    This page was compiled against official Argo CD documentation checked on March 15, 2026. Argo CD
                    features, defaults, and workflows can change, so production decisions should always be verified
                    against the current documentation.
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
