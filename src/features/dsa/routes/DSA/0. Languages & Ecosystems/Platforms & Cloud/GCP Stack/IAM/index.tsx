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

const pageTitle = 'GCP IAM'
const pageSubtitle =
  'Identity, roles, inheritance, service accounts, federation, and permission evaluation across Google Cloud resources.'

const introParagraphs = [
  'Google Cloud IAM is the authorization system that answers who can do what on which Google Cloud resources under which conditions. It is not just a list of users and roles. It is a hierarchy-aware policy system built from principals, permissions, role bindings, conditions, deny controls, and boundaries that together determine effective access.',
  'IAM sits underneath almost every Google Cloud architecture. Projects, folders, organizations, service accounts, GKE workloads, Cloud Run services, CI/CD systems, external identities, and temporary privileged access all depend on IAM concepts. If the access model is weak, the rest of the platform is weak even when the compute and networking design look polished.',
  'This page treats IAM as a platform topic: principals, resource hierarchy inheritance, role types, allow policies, deny policies, principal access boundaries, service accounts, impersonation, workforce and workload federation, temporary elevated access, troubleshooting, and the operational patterns that keep cloud permissions understandable over time.',
]
const bigPictureSections = [
  {
    title: 'What it is',
    paragraphs: [
      'Google Cloud IAM is the access-control layer for Google Cloud resources. It provides a permission model based on principals, roles, permissions, and policy bindings rather than on static credential files sprinkled around the environment. At a basic level, it decides whether a principal may perform a specific permission-bearing action on a resource.',
      'Modern Google Cloud IAM is broader than classic allow-only role bindings. The current model includes allow policies, deny policies, and principal access boundary policies. Together those give Google Cloud a richer way to express not only what may be allowed, but also what must be blocked and which resource scope a principal is even eligible to access.',
    ],
  },
  {
    title: 'Where it fits',
    paragraphs: [
      'IAM is everywhere in GCP. It affects project administration, service-to-service calls, deployment pipelines, service accounts, human access, external identity federation, public resource exposure, and cross-project platform boundaries. Because Google Cloud resources inherit access down the organization, folder, and project hierarchy, IAM is also the main language for platform-wide governance.',
      'This is why IAM should be designed as part of the platform architecture, not after it. If roles, groups, service accounts, and hierarchy boundaries are invented ad hoc, teams quickly lose track of where access came from, who can impersonate whom, and which permissions are still necessary.',
    ],
  },
  {
    title: 'Why teams use it',
    paragraphs: [
      'Teams use IAM because access should be role-based, auditable, temporary when possible, and scoped to real responsibilities. Service accounts replace shared static credentials for workloads. Group-based bindings replace one-off user grants for humans. Federation replaces many cases where organizations previously distributed key files or created redundant local accounts.',
      'IAM also gives organizations a governance language. Conditions, deny policies, principal access boundaries, service account impersonation, and temporary privileged access let platform teams create layered access control instead of relying on one giant project-level Editor grant and hoping for the best.',
    ],
  },
  {
    title: 'Where people get it wrong',
    paragraphs: [
      'IAM is often misunderstood as a role catalog rather than an evaluation system. The difficult part is rarely attaching a role. The difficult part is understanding the effective result after resource hierarchy inheritance, group membership, conditions, deny controls, boundaries, impersonation paths, and service-specific checks are all taken into account.',
      'It is also common to mix authentication with authorization. A principal can authenticate successfully and still be denied. An application can hold credentials and still be unable to act because the resource hierarchy, the active role bindings, or a deny or boundary policy do not permit the request.',
    ],
  },
]
const identityGuide = [
  {
    title: 'Human access',
    summary:
      'Best handled through Google identities or federated workforce identities, then granted access by groups and roles rather than many direct user bindings.',
    details: [
      'Prefer groups over individual user grants for maintainability.',
      'Use Workforce Identity Federation when external users need Google Cloud access without duplicating identities.',
      'Keep privileged access temporary and reviewable where possible.',
    ],
  },
  {
    title: 'Google Cloud workloads',
    summary:
      'Best handled with attached service accounts and short-lived credentials rather than downloaded JSON keys.',
    details: [
      'Cloud Run, GCE, GKE, and other runtimes should normally use service accounts as workload identities.',
      'Service account impersonation and metadata-based credentials are safer than static keys.',
      'Each workload should have a narrowly scoped identity rather than sharing a catch-all service account.',
    ],
  },
  {
    title: 'External workloads',
    summary:
      'Best handled with Workload Identity Federation so external systems can obtain short-lived Google credentials without storing long-lived service account keys.',
    details: [
      'Useful for external CI/CD, multicloud workloads, or on-premises systems.',
      'Maps trusted external identities into Google Cloud authorization decisions.',
      'Reduces the risk and operational burden of service account key distribution.',
    ],
  },
]
const lifecycleFlow = [
  'A principal authenticates: a human user, group-backed identity, service account, impersonated service account, workforce identity, or workload identity.',
  'Google Cloud identifies the target resource and the resource hierarchy above it, then gathers applicable inherited allow policy bindings and deny rules.',
  'If the request involves impersonation, Google Cloud first evaluates whether the caller may use or mint credentials for the target service account.',
  'IAM evaluates role permissions, conditions, explicit denies, and any principal access boundary limits that constrain which resources the principal may access.',
  'If the effective result permits the action on the resource in the current context, the request proceeds. Otherwise it is denied and should be investigated with policy analysis and audit evidence rather than guesswork.',
]
const fitGuide = [
  {
    title: 'Need employee or internal human access across projects',
    choice: 'Use group-based IAM on the resource hierarchy, with federation or Google-managed identities as appropriate.',
  },
  {
    title: 'Need workload access inside Google Cloud',
    choice: 'Use attached service accounts and short-lived credentials, not downloaded service account keys.',
  },
  {
    title: 'Need external users from another identity system',
    choice: 'Use Workforce Identity Federation instead of creating redundant local accounts wherever possible.',
  },
  {
    title: 'Need external workloads to call Google Cloud APIs',
    choice: 'Use Workload Identity Federation and service account impersonation patterns instead of static keys.',
  },
  {
    title: 'Need time-bound privileged access',
    choice: 'Use Privileged Access Manager or other just-in-time elevation patterns instead of permanent broad grants.',
  },
]
const coreConceptSections: NarrativeSection[] = [
  {
    id: 'core-principals',
    heading: 'Principals and Identity Types',
    paragraphs: [
      'A principal is the entity making a request. In Google Cloud that can include a Google Account, a Google group, a domain, a service account, broad identifiers such as allUsers or allAuthenticatedUsers in some contexts, or identities represented through workforce and workload identity pools. Understanding the exact principal is the first step in any IAM reasoning exercise.',
      'The most important practical distinction is between human principals and workload principals. Human access should usually be group-centered and auditable. Workload access should be scoped to the runtime identity of the workload, not shared through copied credentials. Mixing those models is one of the fastest ways to create access sprawl.',
      'Google Cloud also distinguishes between ordinary service accounts you manage and service agents that Google manages for services. Service agents are not generic identities to reuse casually. They exist for specific Google-managed service integrations and should be treated as platform internals rather than as a convenience pool of credentials.',
    ],
  },
  {
    id: 'core-hierarchy',
    heading: 'Resource Hierarchy and Inheritance',
    paragraphs: [
      'Google Cloud IAM is hierarchy-aware. Organizations contain folders, folders contain projects, and projects contain resources. Allow policy bindings granted higher in the hierarchy are inherited downward unless something more restrictive blocks the result. This inheritance model is one of the most important differences between one-off permission thinking and real cloud access design.',
      'The benefit is scale: an organization or folder can express shared access patterns without repeating every grant on every project. The risk is invisible inheritance. Many access surprises come from engineers inspecting only the project and forgetting that an inherited grant or deny rule is coming from higher in the tree.',
      'When debugging access, always ask where the principal is bound and at which level. The answer might be organization, folder, project, or resource. The effective permission is rarely explained by reading a single resource in isolation.',
    ],
  },
  {
    id: 'core-roles',
    heading: 'Roles and Permissions',
    paragraphs: [
      'Roles are collections of permissions. Google Cloud IAM uses roles to avoid assigning one permission at a time. In practice, the main role categories are broad basic roles, service-specific predefined roles, and custom roles that you define. Mature environments strongly prefer predefined or carefully maintained custom roles over broad basic roles.',
      'Role design should start with job function and workload need, not with convenience. Broad roles such as Editor hide too much privilege and make review difficult. Predefined roles are usually the safest starting point because Google maintains them as services evolve. Custom roles are useful when predefined roles are still too broad or do not fit your control boundary cleanly.',
      'The practical tradeoff is maintenance. Predefined roles can grow as Google adds service features. Custom roles give tighter control but create lifecycle work because the role definition must be reviewed as APIs and permissions change. Neither choice removes the need for deliberate least-privilege design.',
    ],
  },
  {
    id: 'core-policies',
    heading: 'Policy Types: Allow, Deny, and Principal Access Boundaries',
    paragraphs: [
      'The classic IAM model is the allow policy binding: bind a role to a principal on a resource and the principal inherits the role permissions for that resource and its children. This remains the core model most teams use every day.',
      'Deny policies add a separate control plane for explicit blocking. They are attached at the organization, folder, or project level and inherited downward. A deny rule is useful when the organization wants a non-negotiable prohibition, even if some lower-level allow binding would otherwise grant the permission.',
      'Principal access boundary policies are different again. They do not grant permissions and they are not resource-side denies. Instead, they limit which resources principals in a principal set are eligible to access. That makes them an advanced but powerful governance tool when large groups of identities need a hard boundary around where their permissions may apply.',
    ],
  },
  {
    id: 'core-conditions',
    heading: 'IAM Conditions and Attribute-Based Access',
    paragraphs: [
      'IAM Conditions let you attach conditional logic to access decisions, using a subset of Common Expression Language. Conditions are how Google Cloud IAM moves from flat role binding to context-aware policy. Time-based access, resource-name restrictions, tag-aware controls, and other environmental checks often belong here.',
      'Conditions can be used on allow policy bindings, deny rules, and principal access boundary bindings, but there are important limits. For example, conditions are not used with legacy broad basic-role patterns and should not be treated as a magic cleanup layer for already chaotic access models.',
      'Conditions become especially useful when combined with disciplined tagging or naming conventions. That is where IAM starts to support real attribute-based patterns rather than endless role duplication. Without that discipline, conditions become hard to reason about and harder to audit.',
    ],
  },
  {
    id: 'core-service-accounts',
    heading: 'Service Accounts, Default Service Accounts, and Service Agents',
    paragraphs: [
      'A service account is both a principal and a resource. As a principal, it can be granted roles on Google Cloud resources. As a resource, it has its own policy surface controlling who may attach, use, administer, or impersonate it. Missing that dual nature is a common source of broken or unsafe access models.',
      'Many Google Cloud services create default service accounts automatically, and many Google-managed services use service agents. Those identities deserve review rather than blind trust. Default identities often accumulate access over time, and service-agent roles are meant for the Google service that owns them, not for arbitrary human or application use.',
      'The safest default is one service account per meaningful workload boundary, with narrow permissions and no downloadable keys unless there is a clearly justified exception. Shared multi-purpose service accounts usually indicate that the identity model is too coarse.',
    ],
  },
  {
    id: 'core-impersonation',
    heading: 'Service Account Impersonation, actAs, and Short-Lived Credentials',
    paragraphs: [
      'Service account impersonation is a central Google Cloud pattern. Instead of handing out a service account key file, a principal is allowed to act as or generate short-lived credentials for a service account. That keeps credentials ephemeral and shifts the security boundary toward IAM policy and audit rather than secret distribution.',
      'The permissions here are subtle. Attaching a service account to some resources often depends on iam.serviceAccounts.actAs, typically granted through roles such as roles/iam.serviceAccountUser. Generating access tokens or other short-lived credentials for impersonation uses a different permission path, commonly roles such as roles/iam.serviceAccountTokenCreator.',
      'This distinction matters because the ability to use a service account is powerful. It effectively lets the caller operate with that service account\'s permissions. Audit and review should therefore focus not only on what the service account can do, but also on who is allowed to become it.',
    ],
  },
  {
    id: 'core-workforce',
    heading: 'Workforce Identity Federation for Human Access',
    paragraphs: [
      'Workforce Identity Federation is the Google Cloud path for giving external users access without creating and managing equivalent Google identities for all of them. It supports federated login from external identity providers, maps external attributes into Google Cloud access decisions, and works well for organizations with existing enterprise identity systems.',
      'This is especially valuable when contractors, partners, or enterprise users from another identity domain need access to Google Cloud. Instead of copying identities into Google Cloud and then managing lifecycle twice, the organization can trust the external identity source and grant Google Cloud roles to the federated workforce identities or their groups.',
      'From an architecture perspective, workforce federation is the human side of the short-lived, identity-provider-centric model. It reduces local-account sprawl and aligns access changes more closely with the upstream identity system.',
    ],
  },
  {
    id: 'core-workload',
    heading: 'Workload Identity Federation and GKE Workload Identity',
    paragraphs: [
      'Workload Identity Federation is the analogous pattern for non-human systems that are outside Google Cloud. External CI/CD platforms, multicloud workloads, and on-premises services can exchange trusted external identities for short-lived Google credentials without storing long-lived service account keys.',
      'Inside Google Cloud, the same design principle shows up in runtime identity patterns such as Workload Identity Federation for GKE, where pods obtain scoped Google Cloud access through workload identity rather than through embedded key files. The technical mechanism differs by environment, but the security goal is consistent: short-lived, auditable, workload-scoped access.',
      'This is one of the most important modern IAM shifts in Google Cloud. The best-practice question is no longer "where should we store the key file?" The best-practice question is "how do we avoid needing a key file at all?"',
    ],
  },
  {
    id: 'core-pam',
    heading: 'Temporary Elevated Access and Privileged Access Manager',
    paragraphs: [
      'Not every privileged permission should be permanent. Google Cloud Privileged Access Manager is designed for just-in-time elevation patterns where a principal requests temporary access and the system grants it according to policy, approval, and duration rules.',
      'This matters because permanent broad admin roles are operationally easy but security-expensive. A temporary elevated access workflow gives teams a way to keep daily privileges narrower while still allowing urgent administrative work when necessary.',
      'The broader lesson is that IAM should model time as well as identity. Permanent access is often a policy smell. If a permission is only needed occasionally, the access design should reflect that reality.',
    ],
  },
  {
    id: 'core-troubleshooting',
    heading: 'Policy Intelligence, Audit, Troubleshooting, and Eventual Consistency',
    paragraphs: [
      'Google Cloud IAM includes analysis tooling such as Policy Troubleshooter, Policy Analyzer, and related policy intelligence capabilities. These tools matter because effective access often depends on hierarchy, conditions, impersonation, deny controls, and other layers that are difficult to reason about by reading one binding at a time.',
      'Audit also matters. Service account impersonation is easier to trust when logs preserve both the caller and the impersonated identity. Policy changes should be visible in audit trails, and access analysis should be part of normal incident response rather than an exotic admin skill.',
      'IAM is also eventually consistent. Policy changes, group membership changes, and new grants can take time to propagate. Production automation and troubleshooting should account for that. Immediate retry loops with no awareness of propagation delay create confusion and misleading failure narratives.',
    ],
  },
  {
    id: 'core-governance',
    heading: 'Organization-Scale Governance and Least Privilege',
    paragraphs: [
      'Good IAM design at organization scale usually means a layered model: hierarchy-level grants for broad shared needs, group-based human access, narrow service accounts for workloads, denial or boundary controls for non-negotiable limits, and temporary elevation for rare privileged actions.',
      'Least privilege in practice is iterative. Start from clear role intent, prefer groups and service identities over direct user grants and static keys, then tighten with evidence from policy analysis, audit logs, and access reviews. Overly broad roles feel fast at first but create much higher debugging and security cost later.',
      'Governance also means ownership. Someone should own role catalogs, service account lifecycle, federation trust configuration, temporary admin flows, and policy analysis tooling. If ownership is vague, IAM debt accumulates faster than almost any other kind of platform debt.',
    ],
  },
]

const operationsNotes = [
  {
    title: 'Prefer groups for humans',
    detail:
      'Direct user bindings do not scale. Group-based access is easier to review, rotate, and align with real team structure.',
  },
  {
    title: 'Avoid long-lived service account keys',
    detail:
      'Use attached identities, service account impersonation, or federation when possible. Keys should be an exception with clear review and rotation requirements.',
  },
  {
    title: 'Avoid broad basic roles in production',
    detail:
      'Roles such as Owner, Editor, and Viewer are convenient but often far broader than the actual job requires. Prefer predefined or custom roles with clearer scope.',
  },
  {
    title: 'Review who can use service accounts',
    detail:
      'The service account permission surface matters almost as much as the permissions granted to the service account itself. Broad impersonation rights can bypass otherwise careful workload separation.',
  },
  {
    title: 'Expect propagation delay',
    detail:
      'IAM changes are eventually consistent. Troubleshooting and automation should account for that rather than assuming every change is instantly visible everywhere.',
  },
  {
    title: 'Treat public identifiers as dangerous',
    detail:
      'Bindings to allUsers or allAuthenticatedUsers can create broad exposure very quickly. They deserve the same scrutiny as firewall rules or public load balancer settings.',
  },
]

const designPatterns = [
  {
    title: 'Group-based human access on the hierarchy',
    detail:
      'Bind groups to folders or projects based on job function instead of granting individual users ad hoc roles everywhere.',
  },
  {
    title: 'One service account per workload boundary',
    detail:
      'Each deployed service, job, or automation path gets its own service account with narrowly scoped permissions and clear ownership.',
  },
  {
    title: 'External CI/CD via federation plus impersonation',
    detail:
      'An external pipeline authenticates through Workload Identity Federation, then impersonates a target service account instead of holding a long-lived key file.',
  },
  {
    title: 'Temporary privileged access',
    detail:
      'High-impact administration is granted only when needed through temporary elevation or PAM workflows instead of permanent standing admin access.',
  },
  {
    title: 'Guardrails through deny and boundary policy',
    detail:
      'Allow bindings express ordinary access, while deny policies or principal access boundaries enforce hard constraints that lower-level convenience grants cannot bypass.',
  },
]

const compareNotes = [
  {
    title: 'Allow policy vs deny policy',
    detail:
      'Allow policies grant role-based access. Deny policies explicitly block permissions and win over lower-level allows when their scope and conditions apply.',
  },
  {
    title: 'Predefined role vs custom role',
    detail:
      'Predefined roles are easier to adopt and maintained by Google, while custom roles give tighter control but add lifecycle work as services and permissions evolve.',
  },
  {
    title: 'Service account attachment vs impersonation',
    detail:
      'Attaching a service account gives a runtime identity to a Google Cloud resource. Impersonation lets another principal temporarily act as the service account. Both are powerful, but they solve different problems.',
  },
  {
    title: 'Workforce federation vs workload federation',
    detail:
      'Workforce federation is for human users coming from an external identity system. Workload federation is for applications or machines coming from an external workload identity system.',
  },
  {
    title: 'GCP IAM vs AWS IAM',
    detail:
      'Both are policy-based cloud authorization systems, but Google Cloud emphasizes hierarchy inheritance, service accounts as first-class workload identities, and allow, deny, and boundary policy types shaped by the Google resource model.',
  },
]

const pitfalls = [
  'Granting Owner or Editor broadly because it is faster than designing access properly.',
  'Binding roles directly to many users instead of using groups and hierarchy-based patterns.',
  'Treating service accounts as just JSON key files instead of as identities with their own policy surface.',
  'Granting actAs or Token Creator rights too broadly and accidentally creating easy privilege-escalation paths.',
  'Using downloaded service account keys where impersonation or federation would have eliminated the secret entirely.',
  'Debugging access by checking only the project and forgetting inherited grants or denies from higher in the hierarchy.',
  'Ignoring deny policies or principal access boundary policies when troubleshooting effective access.',
  'Using allUsers or allAuthenticatedUsers casually and discovering later that data or administration paths became far broader than intended.',
  'Creating many custom roles with no lifecycle ownership and then losing track of which roles still match actual job functions.',
]

const examples: ExampleSection[] = [
  {
    id: 'ex-project-binding',
    title: 'Grant a predefined role to a group on a project',
    code: `gcloud projects add-iam-policy-binding PROJECT_ID \\
  --member="group:platform-team@example.com" \\
  --role="roles/logging.viewer"`,
    explanation:
      'This is the standard allow-policy pattern: bind a role to a principal on a resource. In practice, groups are usually better than binding many individual users directly.',
  },
  {
    id: 'ex-conditional-binding',
    title: 'Create a time-bound conditional binding',
    code: `gcloud projects add-iam-policy-binding PROJECT_ID \\
  --member="user:alice@example.com" \\
  --role="roles/viewer" \\
  --condition='expression=request.time < timestamp("2026-03-31T23:59:59Z"),title=temporary-view,description=Temporary access'`,
    explanation:
      'IAM Conditions let you add context to a binding. This pattern is useful for temporary access without leaving a permanent standing grant behind.',
  },
  {
    id: 'ex-impersonation',
    title: 'Use service account impersonation from the CLI',
    code: `gcloud auth print-access-token \\
  --impersonate-service-account deployer@PROJECT_ID.iam.gserviceaccount.com`,
    explanation:
      'This shows the short-lived credential pattern. Instead of downloading a key file for the service account, the caller obtains a temporary token through impersonation.',
  },
  {
    id: 'ex-workload-federation',
    title: 'External workload federation mental model',
    code: `External workload identity
  -> Workload Identity Pool
  -> Workload Identity Provider
  -> Service account impersonation
  -> Short-lived Google Cloud credentials

Avoid:
  long-lived JSON key files checked into CI/CD or external systems`,
    explanation:
      'This is the modern external-workload access pattern. Trust the external identity, then exchange it for short-lived Google credentials rather than distributing service account keys.',
  },
  {
    id: 'ex-policy-analysis',
    title: 'Inspect inherited policies from the resource hierarchy',
    code: `gcloud beta projects get-ancestors-iam-policy PROJECT_ID \\
  --include-deny \\
  --format=json`,
    explanation:
      'Effective access may come from organizations, folders, or projects. Hierarchy-aware inspection is often necessary when project-local reasoning does not explain a result.',
  },
]

const glossaryTerms = [
  {
    term: 'Principal',
    definition:
      'The entity making a request, such as a user, group, domain, service account, or federated identity.',
  },
  {
    term: 'Allow policy',
    definition:
      'The standard IAM policy type that grants role-based access through bindings between principals and roles on resources.',
  },
  {
    term: 'Binding',
    definition:
      'A connection in an allow policy that assigns a role to one or more principals, optionally with a condition.',
  },
  {
    term: 'Role',
    definition:
      'A named collection of permissions, such as a predefined Google-managed role or a custom organization-defined role.',
  },
  {
    term: 'Permission',
    definition:
      'The atomic authorization unit checked for an action, such as reading logs or updating an instance.',
  },
  {
    term: 'Deny policy',
    definition:
      'A policy type that explicitly blocks permissions and is inherited from the organization, folder, or project level.',
  },
  {
    term: 'Principal access boundary policy',
    definition:
      'A policy type that limits which resources a principal set is eligible to access, without granting permissions by itself.',
  },
  {
    term: 'IAM Condition',
    definition:
      'A conditional expression attached to a binding or rule that adds context-aware checks to access decisions.',
  },
  {
    term: 'Service account',
    definition:
      'A Google Cloud identity used primarily for workloads and automation, and also a resource with its own policy surface.',
  },
  {
    term: 'Service agent',
    definition:
      'A Google-managed service account used by a Google Cloud service to operate on your behalf.',
  },
  {
    term: 'Service account impersonation',
    definition:
      'A pattern where a caller receives short-lived credentials for a service account instead of using a long-lived key file.',
  },
  {
    term: 'Workforce Identity Federation',
    definition:
      'A federation model for giving external human users access to Google Cloud through an external identity provider.',
  },
  {
    term: 'Workload Identity Federation',
    definition:
      'A federation model for giving external workloads short-lived access to Google Cloud without distributing service account keys.',
  },
  {
    term: 'Privileged Access Manager',
    definition:
      'A Google Cloud capability for just-in-time, temporary elevated access workflows.',
  },
  {
    term: 'Policy Troubleshooter',
    definition:
      'A Google Cloud tool used to analyze why a principal is allowed or denied access to a resource.',
  },
]

const pageSources = [
  'https://cloud.google.com/iam/docs/overview',
  'https://cloud.google.com/iam/docs/principals-overview',
  'https://cloud.google.com/iam/docs/resource-hierarchy-access-control',
  'https://cloud.google.com/iam/docs/roles-overview',
  'https://cloud.google.com/iam/docs/policy-types',
  'https://cloud.google.com/iam/docs/conditions-overview',
  'https://cloud.google.com/iam/docs/service-account-overview',
  'https://cloud.google.com/iam/docs/service-account-permissions',
  'https://cloud.google.com/iam/docs/service-account-impersonation',
  'https://cloud.google.com/iam/docs/workforce-identity-federation',
  'https://cloud.google.com/iam/docs/workload-identities',
  'https://cloud.google.com/iam/docs/troubleshoot-policies',
  'https://cloud.google.com/policy-intelligence/docs/overview',
  'https://cloud.google.com/iam/docs/pam-overview',
  'https://cloud.google.com/iam/docs/temporary-elevated-access',
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
    { id: 'bp-identities', label: 'Identity Choices' },
    { id: 'bp-flow', label: 'Evaluation Flow' },
    { id: 'bp-fit', label: 'When to Use Which Model' },
  ],
  'core-concepts': [
    { id: 'core-principals', label: 'Principals' },
    { id: 'core-hierarchy', label: 'Hierarchy and Inheritance' },
    { id: 'core-roles', label: 'Roles and Permissions' },
    { id: 'core-policies', label: 'Policy Types' },
    { id: 'core-conditions', label: 'Conditions' },
    { id: 'core-service-accounts', label: 'Service Accounts' },
    { id: 'core-impersonation', label: 'Impersonation' },
    { id: 'core-workforce', label: 'Workforce Federation' },
    { id: 'core-workload', label: 'Workload Federation' },
    { id: 'core-pam', label: 'Temporary Elevation' },
    { id: 'core-troubleshooting', label: 'Troubleshooting' },
    { id: 'core-governance', label: 'Governance' },
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

const iamHelpStyles = `
.gcp-iam-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.gcp-iam-help-page .win98-window {
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

.gcp-iam-help-page .win98-titlebar {
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

.gcp-iam-help-page .win98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.gcp-iam-help-page .win98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.gcp-iam-help-page .win98-control {
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

.gcp-iam-help-page .win98-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
}

.gcp-iam-help-page .win98-tab {
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

.gcp-iam-help-page .win98-tab.active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.gcp-iam-help-page .win98-main {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  flex: 1;
  min-height: 0;
  border-top: 1px solid #404040;
  background: #ffffff;
}

.gcp-iam-help-page .win98-toc {
  overflow: auto;
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
}

.gcp-iam-help-page .win98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.gcp-iam-help-page .win98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.gcp-iam-help-page .win98-toc-list li {
  margin: 0 0 8px;
}

.gcp-iam-help-page .win98-toc-list a {
  color: #000000;
  font-size: 12px;
  text-decoration: none;
}

.gcp-iam-help-page .win98-content {
  overflow-x: auto;
  overflow-y: scroll;
  scrollbar-gutter: stable;
  padding: 14px 20px 20px;
}

.gcp-iam-help-page .win98-doc-title {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 700;
}

.gcp-iam-help-page .win98-doc-subtitle {
  margin: 0 0 12px;
  font-size: 12px;
  font-weight: 700;
}

.gcp-iam-help-page .win98-section {
  margin: 0 0 22px;
}

.gcp-iam-help-page .win98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.gcp-iam-help-page .win98-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.gcp-iam-help-page .win98-content p,
.gcp-iam-help-page .win98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.gcp-iam-help-page .win98-content p {
  margin: 0 0 10px;
}

.gcp-iam-help-page .win98-content ul,
.gcp-iam-help-page .win98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.gcp-iam-help-page .win98-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.gcp-iam-help-page .win98-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.gcp-iam-help-page .win98-codebox code {
  display: block;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
}

.gcp-iam-help-page .win98-inline-link {
  color: #000080;
}

@media (max-width: 900px) {
  .gcp-iam-help-page .win98-main {
    grid-template-columns: 1fr;
  }

  .gcp-iam-help-page .win98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .gcp-iam-help-page .win98-title-text {
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

export default function GcpIamPage(): JSX.Element {
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
    <div className="gcp-iam-help-page">
      <style>{iamHelpStyles}</style>
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

                <section id="bp-identities" className="win98-section">
                  <h2 className="win98-heading">Identity Choices</h2>
                  {identityGuide.map((item) => (
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
                  <h2 className="win98-heading">Evaluation Flow</h2>
                  <ol>
                    {lifecycleFlow.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </section>

                <hr className="win98-divider" />

                <section id="bp-fit" className="win98-section">
                  <h2 className="win98-heading">When to Use Which Model</h2>
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
                    This page was compiled against official Google Cloud documentation checked on March 15, 2026.
                    IAM features, policy capabilities, and product guidance can change, so production decisions should
                    always be verified against the current documentation.
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
