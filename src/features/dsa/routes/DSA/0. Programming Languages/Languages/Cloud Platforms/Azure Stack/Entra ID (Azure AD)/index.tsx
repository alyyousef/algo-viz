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

const pageTitle = 'Entra ID (Azure AD)'
const pageSubtitle =
  'Cloud identity and access management for users, apps, devices, and Zero Trust policy enforcement across Azure and Microsoft services.'

const introParagraphs = [
  "Microsoft Entra ID, formerly Azure Active Directory, is Microsoft's cloud identity and access management service for users, devices, applications, and workload identities. It provides tenant directories, authentication, authorization, policy enforcement, application integration, device identity, external collaboration features, and the identity foundation for services such as Microsoft 365, Azure, Intune, and many third-party SaaS applications.",
  'The most important architectural idea is that Entra ID is not just a login screen. It is the control plane for who can access what, under which conditions, from which devices, with what risk posture, and through which application identities. Tenant design, role delegation, Conditional Access, device trust, and application registration choices all shape the real security posture of the organization.',
  'This page treats Entra ID as a platform and security architecture topic: tenants and directories, users and groups, devices and join models, application objects and service principals, OAuth 2.0 and OpenID Connect, Conditional Access, RBAC, Privileged Identity Management, hybrid sync, external identities, operational governance, licensing shape, and the design tradeoffs that determine how identity should be modeled in a modern Azure estate.',
]

const bigPictureSections: Array<{ title: string; paragraphs: string[] }> = [
  {
    title: 'What it is',
    paragraphs: [
      'Microsoft Entra ID is the foundational identity product in the Microsoft Entra family. It is a cloud-based IAM system that stores directory objects such as users, groups, devices, enterprise applications, app registrations, and service principals. It also issues tokens, evaluates policies, records sign-ins, and acts as the trust layer for many Microsoft and external applications.',
      'That means Entra ID sits underneath much of the Azure and Microsoft 365 control plane. When teams talk about signing in to Azure, granting an application permissions, enforcing multifactor authentication, registering devices, onboarding a guest user, or activating a privileged role, they are usually talking about Entra ID behavior whether they realize it or not.',
    ],
  },
  {
    title: 'Why teams use it',
    paragraphs: [
      'Organizations use Entra ID because identity is now the primary perimeter. Users work remotely, applications are SaaS and cloud hosted, devices move across networks, and workloads need machine identities just as much as humans need login identities. Entra ID gives one policy and identity substrate for that environment instead of scattering identity logic across every application independently.',
      'It is especially attractive for Azure-first and Microsoft 365-first estates because it already underpins those ecosystems. But it is also widely used as an identity provider for custom applications, third-party SaaS tools, APIs, and hybrid estates where on-premises Active Directory still exists but cloud identity and Zero Trust controls are becoming the operational center of gravity.',
    ],
  },
  {
    title: 'How to think about it',
    paragraphs: [
      'Think of Entra ID as a directory plus a policy engine plus an application trust platform. The directory stores identities and relationships. The identity platform issues tokens and supports protocols like OAuth 2.0 and OpenID Connect. Policy engines such as Conditional Access and PIM decide when access is granted, challenged, restricted, or time-bound.',
      'That model matters because Entra ID design is not one decision. Tenant boundaries, role delegation, group strategy, app registration design, device trust, federation or sync choices, and licensing all interact. If those choices are made ad hoc, the identity plane becomes one of the hardest parts of the environment to secure or reason about later.',
    ],
  },
  {
    title: 'Core platform model',
    paragraphs: [
      'The tenant is the top-level boundary. A tenant contains directory objects such as users, groups, devices, enterprise applications, and application registrations. Applications authenticate users or workloads against that tenant, which then issues tokens and enforces policy based on identity, device state, application target, risk, and other contextual signals.',
      'From that foundation, Entra ID branches into several major operating domains: workforce identity, app and API identity, workload identity, device identity, privileged access, external collaboration, and hybrid identity synchronization. Mature organizations explicitly design each of those domains instead of treating them as one generic login setting.',
    ],
  },
  {
    title: 'What changed recently',
    paragraphs: [
      "Current Microsoft Learn documentation highlights several platform directions that matter now. Conditional Access is explicitly framed as Microsoft's Zero Trust policy engine and now includes newer identity categories such as workload identities and agent identities in the broader product story. External identity and multitenant organization capabilities also continue to evolve as more organizations collaborate across tenant boundaries.",
      'The device and hybrid identity docs also continue to shift emphasis toward cloud-native join, Entra-based device trust, and updated Entra Connect sync guidance for hybrid estates. These are not branding changes only; they reflect how Microsoft expects identity architectures to move away from purely on-prem assumptions over time.',
    ],
  },
]

const operatingModelGuide = [
  {
    title: 'Tenant is the primary identity boundary',
    detail:
      'A tenant is the top-level Entra directory instance containing users, groups, apps, devices, policies, and administrative roles for an organization or identity domain.',
  },
  {
    title: 'Users, groups, apps, and devices are first-class objects',
    detail:
      'Identity is not only about human users. Applications, service principals, workload identities, and device identities all participate in access and policy decisions.',
  },
  {
    title: 'Tokens are the trust mechanism',
    detail:
      'Applications rely on Entra-issued tokens and standards-based flows such as OAuth 2.0 and OpenID Connect to authenticate users and authorize access.',
  },
  {
    title: 'Conditional Access is the policy engine',
    detail:
      'Conditional Access combines user, device, app, location, and risk signals to decide whether to allow, challenge, or block access.',
  },
  {
    title: 'Privileged access should be time-bound',
    detail:
      'RBAC and Privileged Identity Management are central to limiting standing administrative access in Azure and Entra-driven environments.',
  },
]

const fitGuide = [
  {
    title: 'Need cloud IAM for Microsoft 365, Azure, SaaS, and custom apps',
    choice: 'Entra ID is the natural foundation.',
  },
  {
    title: 'Need centralized SSO, MFA, Conditional Access, and identity governance',
    choice: 'Entra ID is specifically designed for that.',
  },
  {
    title: 'Need a modern identity platform for OAuth/OIDC applications and APIs',
    choice: 'Entra ID is a strong fit, especially in Azure-centric estates.',
  },
  {
    title:
      'Need only legacy on-premises directory semantics such as classic LDAP/Kerberos everywhere',
    choice:
      'Active Directory Domain Services or Entra Domain Services may still be required alongside Entra ID.',
  },
  {
    title: 'Need partner or guest collaboration and customer identity journeys',
    choice: 'External identity capabilities in the Entra family may fit well.',
  },
  {
    title:
      'Need a Zero Trust identity control plane rather than scattered app-specific login systems',
    choice: "This is one of Entra ID's core strengths.",
  },
]

const keyTakeaways = [
  'Entra ID is the identity control plane for users, apps, workloads, devices, and access policies across much of Azure and Microsoft 365.',
  'Tenant boundaries, role delegation, Conditional Access, and app registration design are core architectural choices, not admin afterthoughts.',
  'Application objects and service principals are different and both matter for how apps exist across tenants.',
  'Conditional Access and PIM are central Zero Trust tools, not optional extras for mature organizations.',
  'Most Entra ID pain comes from overprivileged admins, weak app-registration hygiene, unclear tenant boundaries, or treating identity like a one-time setup step.',
]

const coreConceptSections: NarrativeSection[] = [
  {
    id: 'core-tenants',
    heading: 'Tenants, Directories, and Identity Boundaries',
    paragraphs: [
      'The tenant is the single most important Entra ID concept. It is the administrative and trust boundary containing directory objects, security settings, policies, app registrations, enterprise applications, and many of the identities that interact with Azure resources and Microsoft services. Good tenant design is really boundary design: who belongs together, what should share policy, and what should remain isolated.',
      'A common mistake is treating the tenant as just the default container Microsoft created during subscription setup. In reality, tenant boundaries should reflect security posture, lifecycle control, collaboration model, and sometimes regulatory constraints. Shared tenants simplify collaboration but widen blast radius. Separate tenants improve isolation but increase governance and cross-tenant complexity.',
      'This is why tenant design must be deliberate. If the organization cannot explain why systems and identities are in one tenant or split across many, it will struggle later with admin sprawl, guest-user confusion, app-registration ownership, and role delegation.',
    ],
  },
  {
    id: 'core-users-groups',
    heading: 'Users, Groups, Dynamic Membership, and Administrative Simplicity',
    paragraphs: [
      'Users and groups are the everyday core of Entra ID. Users represent workforce, guest, or synced identities. Groups organize authorization, collaboration, application assignment, licensing, and policy targeting. Microsoft documents both assigned and dynamic group membership models, and dynamic membership becomes especially useful once the organization wants attribute-driven automation instead of hand-maintained lists.',
      'Group design is one of the biggest leverage points in identity operations. If everything is assigned directly to individual users, administration becomes brittle and hard to audit. If groups are designed around role, team, application, and lifecycle purpose, policy and access management become much easier to reason about.',
      'The practical rule is to prefer group-based assignment for access and licensing wherever possible, but to avoid group sprawl with unclear naming and overlapping purposes. Identity governance is often won or lost at the group layer.',
    ],
  },
  {
    id: 'core-devices',
    heading: 'Device Identity, Registration, Join Models, and Trust Signals',
    paragraphs: [
      'Entra ID is not only for users and apps. Device identity is a major part of the platform because access policy increasingly depends on whether the device itself is known, joined, compliant, or risky. Microsoft documents device registration, Microsoft Entra joined devices, and hybrid Microsoft Entra joined devices as distinct trust models with different operational implications.',
      'The key idea is that device state becomes an input into access decisions. Conditional Access can require compliant or hybrid joined devices for sensitive resources. That means device onboarding is not just endpoint management work. It is identity-architecture work because it changes what access controls are possible.',
      'A modern Entra design should treat devices as first-class participants in Zero Trust rather than assuming identity means only usernames and passwords. The more sensitive the estate, the more important device trust becomes.',
    ],
  },
  {
    id: 'core-apps',
    heading: 'Application Registrations, Enterprise Applications, and Service Principals',
    paragraphs: [
      'One of the most commonly misunderstood parts of Entra ID is the distinction between application objects and service principals. The app registration is the global application definition in its home tenant. The service principal is the instance of that application in a tenant where it is actually used. That distinction matters for multitenant apps, consent, permissions, and operations.',
      'Enterprise applications are the operational view of service principals and application access inside a tenant. This is where administrators usually manage SSO configuration, assignment, provisioning, or access visibility for SaaS and custom applications. Teams that do not understand this split often struggle with why an app exists in one portal view but behaves somewhere else entirely.',
      'App registration hygiene is a serious security topic. Redirect URIs, secrets, certificates, API permissions, and ownership all matter. A sprawl of abandoned or overprivileged app registrations is one of the fastest ways to create invisible identity risk.',
    ],
  },
  {
    id: 'core-protocols',
    heading: 'OAuth 2.0, OpenID Connect, Tokens, and the Identity Platform',
    paragraphs: [
      "Entra ID is a standards-based identity platform. OAuth 2.0 and OpenID Connect are central to how applications authenticate users and obtain tokens for APIs. ID tokens answer who the user is. Access tokens authorize access to protected resources. Refresh tokens support session continuity under the platform's token and security model.",
      'This is important because application design and identity design are inseparable once you rely on tokens. Redirect handling, scopes, app roles, consent model, delegated versus application permissions, and token audience all shape how secure and maintainable the app becomes.',
      'The most common mistake is treating token issuance as magic middleware. In reality, token flows should be understood by the engineering team, because errors in flow choice, consent scope, or token validation create either broken auth or quiet security holes.',
    ],
  },
  {
    id: 'core-conditional-access',
    heading: 'Conditional Access, MFA, and Zero Trust Policy Enforcement',
    paragraphs: [
      "Conditional Access is Microsoft's central Zero Trust policy engine in Entra ID. Policies evaluate signals such as user, group, application, device state, location, sign-in risk, and other context to decide whether access is allowed, blocked, or challenged with controls such as multifactor authentication. This is where identity becomes adaptive rather than static.",
      'The operational lesson is simple: access should not depend only on password correctness. Sensitive access should depend on context. Conditional Access is how that context becomes enforceable and consistent across the estate. It is one of the most important reasons Entra ID is more than a directory service.',
      'However, policy sprawl is a real risk. Too many overlapping policies with unclear exclusions or emergency access strategy can create outages just as easily as weak policy can create breaches. Mature Conditional Access design includes naming, documentation, staged rollout, and break-glass thinking.',
    ],
  },
  {
    id: 'core-rbac',
    heading: 'Roles, Delegation, and Least-Privilege Administration',
    paragraphs: [
      'Entra ID includes built-in administrative roles and supports delegation patterns that let organizations separate directory management, security, app admin, help desk, and identity governance duties. This matters because identity is too powerful to run from one permanent global administrator account model.',
      'Least privilege in Entra means more than removing obvious admin roles. It means assigning only the smallest role needed, delegating at the right scope, using groups where appropriate, and understanding which roles affect apps, users, devices, policies, or privileged access flows. Poor role hygiene creates the identity equivalent of an overexposed root account estate.',
      'In Azure-centric organizations, it is also critical to remember that Entra roles and Azure RBAC roles are related but different. One governs the identity directory plane; the other governs Azure resources. Mature security operations understand and separate both.',
    ],
  },
  {
    id: 'core-pim',
    heading: 'Privileged Identity Management and Just-in-Time Admin Access',
    paragraphs: [
      'Privileged Identity Management, or PIM, is one of the most important mature-tenant features because it reduces standing privilege. Instead of granting permanent administrative rights to sensitive roles, users can be made eligible and then activate those roles temporarily with justification, approval, and auditing where configured.',
      'This is central to Zero Trust and identity-hardening practice. Permanent privilege creates permanent blast radius. Time-bound elevation narrows the window of risk and makes privilege use more visible and accountable. In real organizations, PIM is often the difference between theoretical least privilege and something operationally enforceable.',
      "The critical design rule is to apply PIM not only to obvious global admin roles, but more broadly across high-impact role sets where justified. If every sensitive identity role remains permanently assigned, the organization is leaving one of Entra's strongest control surfaces underused.",
    ],
  },
  {
    id: 'core-hybrid',
    heading: 'Hybrid Identity, Entra Connect Sync, and the On-Premises Bridge',
    paragraphs: [
      'Many enterprises are not cloud-only. Microsoft Entra Connect Sync exists to synchronize identities from on-premises Active Directory into Entra ID so users can keep a consistent identity while the organization gradually modernizes. This hybrid model remains common and deeply practical, but it introduces its own operational and security complexity.',
      'The key point is that hybrid identity is not just a connector. It is a trust bridge. Attribute flows, password hash sync, federation history, device join choices, and object ownership now span two directory worlds. That means mistakes or ambiguity in one system propagate into the other.',
      'A mature hybrid design includes clear source-of-authority rules, connector health monitoring, staged modernization plans, and an understanding of which identities and attributes still depend on on-premises Active Directory versus which can become cloud-native over time.',
    ],
  },
  {
    id: 'core-external',
    heading: 'External Identities, Guests, B2B Collaboration, and Cross-Tenant Access',
    paragraphs: [
      'Modern organizations collaborate across tenant boundaries constantly. Entra external identity capabilities support guest access, B2B collaboration, and broader cross-organization identity patterns. This is essential for vendors, partners, subsidiaries, contractors, and multitenant organizational structures where not every identity belongs inside one workforce directory.',
      'The challenge is that guest access is easy to enable and easy to forget. Guest lifecycle, role assignment, application access, review cadence, and sponsor accountability all matter. Without governance, guest collaboration becomes a slow-moving identity sprawl problem rather than a secure collaboration tool.',
      'Cross-tenant access settings and external identity controls should therefore be designed like any other trust boundary. Collaboration is valuable, but it should be explicit, reviewable, and bounded.',
    ],
  },
  {
    id: 'core-workload',
    heading: 'Workload Identities, Managed Identities, and Nonhuman Access',
    paragraphs: [
      'Entra ID increasingly matters for nonhuman identities just as much as for people. Applications, automation jobs, Kubernetes workloads, serverless functions, and Azure resources all need identities to call other services securely. Managed identities are one of the strongest patterns in Azure because they remove the need to store long-lived credentials in application configuration.',
      'This changes how platform teams should think about identity. Identity is no longer only HR-driven user lifecycle. It is also the fabric for workload-to-workload trust. Service principals, federated credentials, managed identities, and workload policies are now part of normal cloud architecture.',
      'The safest default is to prefer short-lived token-based identity for workloads over copied secrets and certificates wherever the platform supports it. That shift dramatically reduces secret sprawl and operational credential risk.',
    ],
  },
  {
    id: 'core-operations',
    heading: 'Sign-In Logs, Audit Logs, and Operational Visibility',
    paragraphs: [
      'Identity systems need strong observability. Entra ID provides sign-in logs, audit logs, provisioning logs, and related monitoring surfaces that let organizations understand who accessed what, from where, under which policy outcome, and what administrative changes occurred. Without that visibility, identity incidents become guesswork.',
      'Operationally, the question is not whether logs exist. It is whether they are being used. Security teams should be able to answer which Conditional Access policy blocked or allowed a sign-in, which admin changed an app registration, which risky sign-ins occurred, and whether privileged-role activation happened when expected.',
      'Good identity observability also means exporting, retaining, and correlating identity signals with the rest of the security stack. Entra logs are often among the highest-value signals in the environment because almost every serious cloud action begins with identity.',
    ],
  },
  {
    id: 'core-cost',
    heading: 'Licensing, Feature Tiers, and the Real Cost Shape',
    paragraphs: [
      'Entra ID cost is not only about the existence of the tenant. The real licensing shape depends on which users need advanced capabilities such as Conditional Access, PIM, identity governance, risk-based protection, or advanced external identity scenarios. Many organizations discover that the identity architecture they want implies a licensing architecture they need to plan for explicitly.',
      'This matters because security controls are often tier-dependent. If the design assumes broad Conditional Access, automated access reviews, or just-in-time privilege, the licensing model must support those features for the relevant users. Treating identity licensing as an afterthought often leads to inconsistent protection rather than deliberate rollout.',
      'The practical lesson is to model licensing around identity posture, not only user count. The cost of stronger identity controls is often easier to justify than the cost of identity incidents caused by partial or uneven control deployment.',
    ],
  },
]

const designPatterns = [
  {
    title: 'Group-first access assignment',
    detail:
      'Assign applications, roles, and licenses to groups instead of directly to individual users wherever possible.',
  },
  {
    title: 'Conditional Access as the default control plane',
    detail:
      'Express MFA, device trust, location policy, and Zero Trust enforcement centrally instead of separately inside every application.',
  },
  {
    title: 'PIM for high-impact roles',
    detail:
      'Make powerful administrative roles eligible and time-bound rather than permanently active.',
  },
  {
    title: 'Managed identity for Azure workloads',
    detail:
      'Prefer workload identities and managed identities over static credentials for service-to-service trust.',
  },
  {
    title: 'Clear ownership for app registrations',
    detail:
      'Every application registration and enterprise app should have accountable owners, documented purpose, and reviewed permissions.',
  },
  {
    title: 'Hybrid identity with a source-of-authority plan',
    detail:
      'If on-premises sync exists, define exactly which system owns user attributes and lifecycle decisions so identity drift does not accumulate.',
  },
]

const operationalChecklist = [
  'Define tenant boundaries intentionally before large-scale app and admin sprawl develops.',
  'Prefer group-based assignment for application access, roles, and licensing where appropriate.',
  'Use Conditional Access for baseline Zero Trust controls such as MFA and device requirements.',
  'Protect privileged roles with PIM and minimize permanent high-impact admin assignments.',
  'Document app registrations, secrets, certificates, redirect URIs, and ownership.',
  'Prefer managed identities and workload federation over copied credentials for automation and services.',
  'Review guest access, external collaboration, and cross-tenant trust regularly.',
  'Separate Entra directory administration from Azure resource administration conceptually and operationally.',
  'Monitor sign-in and audit logs as core security signals, not optional reporting data.',
  'Plan licensing around required identity controls instead of discovering feature gaps mid-rollout.',
]

const compareNotes = [
  {
    title: 'Entra ID vs on-premises Active Directory',
    detail:
      'Active Directory is a traditional domain and directory service for on-prem environments. Entra ID is a cloud identity and access platform built around modern protocols, SaaS, devices, and Zero Trust policy.',
  },
  {
    title: 'App registrations vs enterprise applications',
    detail:
      'App registrations define the application identity template in its home tenant. Enterprise applications represent the service principal instance and operational use of an app inside a tenant.',
  },
  {
    title: 'Entra RBAC vs Azure RBAC',
    detail:
      'Entra roles govern the identity directory plane. Azure RBAC governs Azure resource access. Both are critical and often confused.',
  },
  {
    title: 'Conditional Access vs app-specific auth settings',
    detail:
      'Application-level auth decides how an app handles tokens or login. Conditional Access is the central tenant policy layer that decides whether access is permitted under current context.',
  },
  {
    title: 'PIM vs permanent admin assignment',
    detail:
      'PIM reduces standing privilege and improves auditability. Permanent assignment is operationally simpler but far weaker from a security perspective.',
  },
]

const pitfalls = [
  'Leaving too many permanent global or highly privileged admin assignments in place.',
  'Treating app registrations as one-time setup artifacts and never reviewing their secrets, permissions, or owners.',
  'Scattering user assignments directly instead of using groups and clearer authorization structure.',
  'Building complex Conditional Access policy sets without emergency access planning or rollout discipline.',
  'Assuming Entra roles and Azure RBAC roles are interchangeable.',
  'Ignoring device identity and then expecting identity policy alone to provide full Zero Trust posture.',
  'Allowing guest and external identities to accumulate without review, sponsor ownership, or scoped access.',
  'Keeping workload secrets in app settings or pipelines when managed identity could replace them.',
  'Running hybrid sync without clear source-of-authority rules for identities and attributes.',
  'Treating sign-in and audit logs as after-the-fact reporting rather than primary security telemetry.',
]

const examples: ExampleSection[] = [
  {
    id: 'ex-app-reg',
    title: 'Conceptual app registration for a web API and SPA client',
    code: `Tenant: contoso.onmicrosoft.com

App Registration: orders-api
- Exposes scope: api://orders-api/orders.read
- Exposes scope: api://orders-api/orders.write
- Uses application ID URI for token audience

App Registration: orders-spa
- Redirect URI: https://app.contoso.com/auth/callback
- Requests delegated scopes:
  - openid
  - profile
  - offline_access
  - api://orders-api/orders.read`,
    explanation:
      'This shows the common Entra identity-platform split between a client application and a protected API. The client requests delegated scopes, while the API exposes permissions and validates tokens issued for its audience.',
  },
  {
    id: 'ex-ca',
    title: 'Conditional Access policy pattern for admin roles',
    code: `Policy: Require strong auth for privileged access
Assignments:
- Users: Directory role members
- Cloud apps: Microsoft Azure Management
Conditions:
- Locations: All
Access controls:
- Require multifactor authentication
- Require compliant device OR phishing-resistant MFA
Session:
- Sign-in frequency: shortened for admins`,
    explanation:
      'The important point is not the portal syntax. It is the design pattern: privileged access should have stronger context requirements than normal workforce sign-ins. Conditional Access is where that difference becomes enforceable.',
  },
  {
    id: 'ex-pim',
    title: 'PIM activation workflow for a privileged role',
    code: `1. User is eligible for Privileged Role Administrator
2. User requests activation for 1 hour
3. Justification is supplied
4. MFA is completed
5. Approval is required from security lead
6. Role becomes active temporarily
7. Activation is audited and expires automatically`,
    explanation:
      'This is the essence of PIM: rights are not left standing all day by default. Elevation becomes time-bound, justified, reviewable, and logged.',
  },
  {
    id: 'ex-managed-identity',
    title: 'Conceptual managed identity access flow',
    code: `Azure App Service
  -> Managed Identity
  -> Requests token from Entra ID
  -> Receives access token for Azure Key Vault
  -> Calls Key Vault without stored secret`,
    explanation:
      'This pattern illustrates why Entra ID matters well beyond user sign-in. Workload identity lets Azure-hosted applications access other services securely without embedding long-lived credentials in configuration.',
  },
]

const glossaryTerms = [
  {
    term: 'Tenant',
    definition:
      'The top-level Microsoft Entra directory boundary containing identities, apps, devices, policies, and administrative roles.',
  },
  {
    term: 'App Registration',
    definition:
      'The application definition in its home tenant, including identifiers, redirect URIs, exposed permissions, and credentials.',
  },
  {
    term: 'Service Principal',
    definition:
      'The tenant-local instance of an application used for access control and operational assignment in a directory.',
  },
  {
    term: 'Enterprise Application',
    definition:
      'The operational representation of an application or service principal in a tenant, often used for SSO, assignment, and governance.',
  },
  {
    term: 'Conditional Access',
    definition:
      'The Entra policy engine that evaluates identity and context signals to allow, challenge, or block access.',
  },
  {
    term: 'PIM',
    definition:
      'Privileged Identity Management, a feature for time-bound and controlled activation of privileged roles.',
  },
  {
    term: 'Managed Identity',
    definition:
      'An Entra-backed identity for Azure resources that allows secure service-to-service access without storing credentials manually.',
  },
  {
    term: 'Hybrid Entra Joined Device',
    definition:
      'A device joined to on-premises Active Directory and also registered with Microsoft Entra ID.',
  },
  {
    term: 'Delegated Permission',
    definition: 'A permission used by an app acting on behalf of a signed-in user.',
  },
  {
    term: 'Application Permission',
    definition: 'A permission used by an app acting as itself without a signed-in user present.',
  },
  {
    term: 'Guest User',
    definition:
      'An external identity invited into a tenant for collaboration or controlled access.',
  },
  {
    term: 'Break-Glass Account',
    definition:
      'A carefully protected emergency administrative account excluded from normal lockout or Conditional Access failure scenarios.',
  },
]

const pageSources = [
  'https://learn.microsoft.com/en-us/entra/fundamentals/whatis',
  'https://learn.microsoft.com/en-us/entra/identity-platform/v2-protocols',
  'https://learn.microsoft.com/en-us/entra/identity/conditional-access/overview',
  'https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference',
  'https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure',
  'https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/whatis-entra-connect-sync',
  'https://learn.microsoft.com/en-us/entra/identity/users/groups-dynamic-membership',
  'https://learn.microsoft.com/en-us/entra/identity/devices/concept-device-identities',
  'https://learn.microsoft.com/en-us/entra/external-id/external-identities-overview',
  'https://learn.microsoft.com/en-us/entra/identity-platform/app-objects-and-service-principals',
  'https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/what-is-enterprise-app',
  'https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview',
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
    { id: 'core-tenants', label: 'Tenants and Boundaries' },
    { id: 'core-users-groups', label: 'Users and Groups' },
    { id: 'core-devices', label: 'Devices' },
    { id: 'core-apps', label: 'Apps and Service Principals' },
    { id: 'core-protocols', label: 'OAuth and OIDC' },
    { id: 'core-conditional-access', label: 'Conditional Access' },
    { id: 'core-rbac', label: 'Roles and Delegation' },
    { id: 'core-pim', label: 'PIM' },
    { id: 'core-hybrid', label: 'Hybrid Identity' },
    { id: 'core-external', label: 'External Identities' },
    { id: 'core-workload', label: 'Workload Identity' },
    { id: 'core-operations', label: 'Logs and Operations' },
    { id: 'core-cost', label: 'Licensing' },
    { id: 'core-compare', label: 'Compare and Contrast' },
    { id: 'core-patterns', label: 'Design Patterns' },
    { id: 'core-ops-checklist', label: 'Operational Checklist' },
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
.azure-entra-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.azure-entra-help-page .win98-window {
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

.azure-entra-help-page .win98-titlebar {
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

.azure-entra-help-page .win98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.azure-entra-help-page .win98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.azure-entra-help-page .win98-control {
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

.azure-entra-help-page .win98-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
}

.azure-entra-help-page .win98-tab {
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

.azure-entra-help-page .win98-tab.active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.azure-entra-help-page .win98-main {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  flex: 1;
  min-height: 0;
  border-top: 1px solid #404040;
  background: #ffffff;
}

.azure-entra-help-page .win98-toc {
  overflow: auto;
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
}

.azure-entra-help-page .win98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.azure-entra-help-page .win98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.azure-entra-help-page .win98-toc-list li {
  margin: 0 0 8px;
}

.azure-entra-help-page .win98-toc-list a {
  color: #000000;
  font-size: 12px;
  text-decoration: none;
}

.azure-entra-help-page .win98-content {
  overflow-x: auto;
  overflow-y: scroll;
  scrollbar-gutter: stable;
  padding: 14px 20px 20px;
}

.azure-entra-help-page .win98-doc-title {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 700;
}

.azure-entra-help-page .win98-doc-subtitle {
  margin: 0 0 12px;
  font-size: 12px;
  font-weight: 700;
}

.azure-entra-help-page .win98-section {
  margin: 0 0 22px;
}

.azure-entra-help-page .win98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.azure-entra-help-page .win98-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.azure-entra-help-page .win98-content p,
.azure-entra-help-page .win98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.azure-entra-help-page .win98-content p {
  margin: 0 0 10px;
}

.azure-entra-help-page .win98-content ul,
.azure-entra-help-page .win98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.azure-entra-help-page .win98-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.azure-entra-help-page .win98-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.azure-entra-help-page .win98-codebox code {
  display: block;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
}

.azure-entra-help-page .win98-inline-link {
  color: #000080;
}

@media (max-width: 900px) {
  .azure-entra-help-page .win98-main {
    grid-template-columns: 1fr;
  }

  .azure-entra-help-page .win98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .azure-entra-help-page .win98-title-text {
    position: static;
    transform: none;
    margin-left: 8px;
    font-size: 14px;
  }
}
`

export default function EntraIdPage(): JSX.Element {
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
    <div className="azure-entra-help-page">
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
                    This content was compiled from official Microsoft Learn documentation current as
                    checked on March 13, 2026. Microsoft Entra ID features, licensing coverage, and
                    operational guidance can change, so production decisions should always be
                    revalidated against the current documentation.
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
