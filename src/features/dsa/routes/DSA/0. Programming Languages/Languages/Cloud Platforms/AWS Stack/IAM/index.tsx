import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const pageTitle = 'AWS IAM'
const pageSubtitle = 'Identity, roles, policies, and permission evaluation across AWS accounts and resources.'
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const bigPictureSections = [
  {
    title: 'What it is',
    paragraphs: [
      'AWS Identity and Access Management, or IAM, is the core AWS service for defining who can do what under which conditions. It provides identities, roles, policies, trust relationships, temporary credentials, and fine-grained permission logic across AWS services.',
      'IAM is not only about login accounts. It is the permission model behind human access, workload access, automation, federation, cross-account trust, and service-to-service delegation throughout AWS.',
    ],
  },
  {
    title: 'Where it fits',
    paragraphs: [
      'IAM sits underneath almost every AWS architecture. EC2 instance profiles, Lambda execution roles, ECS task roles, cross-account deployment roles, S3 bucket policies, and federated human access all depend on IAM concepts.',
      'In modern AWS organizations, IAM is usually used together with IAM Identity Center, Organizations guardrails such as SCPs, resource-based policies, Access Analyzer, and service-specific permission models. That means understanding IAM is really understanding the control plane of AWS access.',
    ],
  },
  {
    title: 'Why teams use it',
    paragraphs: [
      'Teams use IAM because AWS access should be temporary, scoped, auditable, and policy-driven. IAM roles and policy evaluation let teams replace shared static credentials with controlled delegation and service identities.',
      'It also creates a language for governance. Conditions, tagging strategies, permission boundaries, and organization-level guardrails let large AWS estates standardize access without every account inventing a different permission model.',
    ],
  },
  {
    title: 'When it is misunderstood',
    paragraphs: [
      'IAM is often misunderstood as a list of users and roles rather than a policy evaluation system. The real difficulty is not creating a role. It is predicting effective permissions across identity-based policies, resource-based policies, permissions boundaries, session policies, and organization-level controls.',
      'It is also common to confuse authentication with authorization. MFA, federation, and sign-in are not the same thing as resource access evaluation. A user can authenticate successfully and still be correctly denied by policy logic.',
    ],
  },
]

const identityGuide = [
  {
    title: 'IAM users',
    summary:
      'Best minimized and rarely created in mature environments. Use only when a long-term IAM user is genuinely required.',
    details: [
      'Provides long-term credentials.',
      'Usually weaker than role-based temporary access for both humans and workloads.',
      'Should not be the default for modern AWS access models.',
    ],
  },
  {
    title: 'IAM roles',
    summary:
      'Best default for workloads, automation, federation, and cross-account access. Roles issue temporary credentials and rely on trust policies.',
    details: [
      'Used by EC2, Lambda, ECS, EKS workloads, and human federation paths.',
      'A role needs both trust and permissions logic to be useful.',
      'Temporary credentials are safer than static keys.',
    ],
  },
  {
    title: 'Federated access and IAM Identity Center',
    summary:
      'Best default for human access in multi-account environments. Humans should usually federate in and assume roles rather than exist as many local IAM users.',
    details: [
      'Centralizes human identity and permission-set management.',
      'Reduces local account sprawl of long-lived users.',
      'Fits AWS Organizations-based environments well.',
    ],
  },
]

const lifecycleFlow = [
  'An identity signs in or a workload requests access, often through federation or role assumption rather than through long-term credentials.',
  'AWS determines which principal is acting and what policies, boundaries, trust relationships, and session constraints apply.',
  'The target service evaluates the request using IAM policy logic, including explicit denies, allows, conditions, resource-based rules, and applicable organization guardrails.',
  'If the effective permissions allow the action on the requested resource under the current context, the service proceeds. Otherwise, the request is denied.',
  'Audit and troubleshooting then depend on understanding which policy layer actually produced the final decision.',
]

const fitGuide = [
  {
    title: 'Need workload access to AWS services without static credentials',
    choice: 'Use IAM roles.',
  },
  {
    title: 'Need centralized human access across many AWS accounts',
    choice: 'Use IAM Identity Center with role-based access.',
  },
  {
    title: 'Need fine-grained resource access and conditional enforcement',
    choice: 'Use IAM policies with deliberate conditions and least privilege.',
  },
  {
    title: 'Need broad static admin users in every account',
    choice: 'Do not treat that as a good default; redesign around federation and roles.',
  },
]

const coreConceptSections = [
  {
    id: 'core-principals',
    heading: 'Principals, Identities, and Credentials',
    paragraphs: [
      'The acting entity in IAM is the principal. That may be an IAM user, an IAM role session, a federated principal, the account root user, or a service principal. Effective access starts with knowing exactly which principal is making the request.',
      'Credentials are not all equal. IAM users and root can have long-term credentials. Roles issue temporary credentials. Mature AWS environments strongly prefer temporary credentials for both humans and workloads because they reduce exposure and fit delegation patterns better.',
    ],
  },
  {
    id: 'core-policies',
    heading: 'Policies and Policy Types',
    paragraphs: [
      'IAM policy evaluation is built from multiple policy types. Identity-based policies grant permissions to users, groups, or roles. Resource-based policies attach directly to resources. Permissions boundaries define the maximum permissions an identity-based policy can grant. Session policies further constrain temporary sessions. Organizations SCPs define maximum permissions at account or OU scope.',
      'The critical mental model is that many policy types limit or intersect one another, and explicit deny wins. Debugging IAM is usually debugging the intersection of policy layers rather than reading one JSON document in isolation.',
    ],
  },
  {
    id: 'core-evaluation',
    heading: 'Policy Evaluation Logic',
    paragraphs: [
      'AWS evaluates requests by gathering applicable policies and then applying evaluation logic. Explicit denies override allows. Allows are effective only when no stronger control blocks them. Boundaries and SCPs do not grant permissions by themselves; they limit what could otherwise be allowed.',
      'This is why IAM feels simple in tutorials and subtle in production. One role might appear to allow an action, but a permissions boundary, an SCP, or missing resource-based permission can still deny it. Effective access is about the full evaluation context.',
    ],
  },
  {
    id: 'core-roles',
    heading: 'Roles, Trust Policies, and Assumption',
    paragraphs: [
      'A role has two sides: who may assume it, and what the role can do after assumption. The trust policy controls assumption. The permissions policy controls actions after the role is assumed. Confusing those two sides causes many broken or overbroad designs.',
      'Cross-account access, EC2 instance profiles, Lambda execution roles, and federation all depend on this role-assumption model. A role with broad permissions but the wrong trust policy is unusable. A role with correct trust but no permissions is harmless but ineffective.',
    ],
  },
  {
    id: 'core-conditions',
    heading: 'Conditions, Tags, and ABAC',
    paragraphs: [
      'Conditions make IAM much more expressive. They let you restrict actions based on context such as source IP, MFA presence, request tags, resource tags, principal tags, time, or service-specific condition keys. This is where policy becomes governance rather than a flat allow list.',
      'Attribute-based access control, or ABAC, uses attributes such as tags on principals and resources to scale permissions more elegantly than writing one role per project forever. ABAC is powerful, but only when tagging discipline is real and consistent across the environment.',
    ],
  },
  {
    id: 'core-resource-policies',
    heading: 'Resource-Based Policies',
    paragraphs: [
      'Some AWS services support policies attached directly to resources, such as S3 bucket policies, KMS key policies, Lambda resource policies, or EventBridge bus policies. These policies define who may access the resource and under which conditions, often including principals from other accounts.',
      'Resource-based policies matter because access is not always controlled only from the caller side. In many cases the target resource must also allow the action, especially for cross-account access. Good IAM reasoning always asks: what does the caller allow, and what does the resource allow?',
    ],
  },
  {
    id: 'core-boundaries',
    heading: 'Permissions Boundaries and Session Policies',
    paragraphs: [
      'Permissions boundaries define the maximum permissions an IAM user or role could exercise even if an attached identity-based policy seems broader. They are useful when delegated builders may create or modify roles, but you want a hard cap on what those roles can ever become.',
      'Session policies are similar in spirit but apply at the temporary session level, further narrowing what an assumed role session may do. Both are limiting mechanisms, not granting mechanisms. They become especially important in delegated-administration and platform-control scenarios.',
    ],
  },
  {
    id: 'core-org',
    heading: 'Organizations, SCPs, and Multi-Account Guardrails',
    paragraphs: [
      'In AWS Organizations, Service Control Policies define the maximum permissions available in an account or organizational unit. SCPs do not grant permissions; they set the outer boundary inside which IAM in that account can operate.',
      'This is why multi-account AWS access must be reasoned about at multiple layers. A role may look correct inside one account and still be denied because the organization-level guardrail blocks the action. SCPs are platform governance tools, not identity grants.',
    ],
  },
  {
    id: 'core-human-access',
    heading: 'Human Access, Federation, and IAM Identity Center',
    paragraphs: [
      'Mature AWS environments usually avoid creating many long-lived IAM users for humans. Instead, human identities live in an identity provider and access AWS through federation, often managed through IAM Identity Center. The user receives role-based temporary access to target accounts rather than static local account credentials.',
      'This model improves governance, session visibility, and credential hygiene. It also scales better in multi-account environments, where duplicating IAM users across accounts would be operationally weak and hard to audit.',
    ],
  },
  {
    id: 'core-best-practices',
    heading: 'Best Practices and Least Privilege',
    paragraphs: [
      'Least privilege is the baseline goal, but it should be applied pragmatically. Start narrow, observe actual access needs, and refine policies with real usage data where possible. Broad wildcard permissions and long-lived access keys are usually signs that the access model is still immature.',
      'AWS best practices also emphasize avoiding root for routine work, requiring MFA, preferring roles over users, using temporary credentials, monitoring policy changes, and reviewing public or cross-account access paths with tools such as Access Analyzer.',
    ],
  },
  {
    id: 'core-observability',
    heading: 'Observability, Audit, and Troubleshooting',
    paragraphs: [
      'IAM issues are often invisible until a request fails or a privilege is abused, so auditing matters. CloudTrail, Access Analyzer, policy simulator tools, and service-specific error details are central to understanding what was allowed, what was denied, and why.',
      'Troubleshooting IAM should be evidence-driven. Identify the exact principal, action, resource, and context keys involved, then inspect each relevant policy layer. Guessing from one role name or one attached policy is how teams waste hours on simple evaluation problems.',
    ],
  },
]

const operationsNotes = [
  {
    title: 'Prefer roles over long-lived keys',
    detail:
      'Temporary credentials reduce exposure and support cleaner delegation. Static access keys should be the exception, not the platform default.',
  },
  {
    title: 'Review trust policies carefully',
    detail:
      'Permissions on a role are only half the story. If the trust policy is too broad, the role becomes an unintended privilege-escalation path.',
  },
  {
    title: 'Tag consistently if using ABAC',
    detail:
      'ABAC depends on stable tagging. Inconsistent tag discipline turns elegant policies into unreliable permission behavior.',
  },
  {
    title: 'Use Access Analyzer and audit tooling',
    detail:
      'External access paths, public resource exposure, and broad cross-account grants are much easier to catch with analysis tooling than by manually reading policies after the fact.',
  },
  {
    title: 'Treat policy changes as infrastructure changes',
    detail:
      'Permission changes can break production or widen access instantly. Review, version, and audit them with the same seriousness as infrastructure code.',
  },
]

const designPatterns = [
  {
    title: 'Federated human access',
    detail:
      'Humans authenticate through a central identity provider and assume account roles through IAM Identity Center instead of holding long-lived IAM user credentials in each account.',
  },
  {
    title: 'Workload-specific roles',
    detail:
      'Each workload gets its own narrowly scoped role, such as a Lambda execution role or ECS task role, rather than sharing one broad service role across unrelated systems.',
  },
  {
    title: 'Delegated role creation with boundaries',
    detail:
      'Platform teams let application teams create or manage roles, but permissions boundaries enforce the maximum privilege envelope those roles may ever receive.',
  },
  {
    title: 'Multi-account guardrails',
    detail:
      'Organizations use SCPs for hard account-level or OU-level restrictions while each account still manages local least-privilege roles and resource policies within that boundary.',
  },
]

const pitfalls = [
  'Using IAM users and long-lived access keys as the default access model for everything.',
  'Confusing trust policy logic with permission policy logic on roles.',
  'Assuming one attached allow policy guarantees access without checking SCPs, boundaries, session policies, or resource policies.',
  'Writing wildcard permissions because precise permission design feels inconvenient.',
  'Ignoring MFA for privileged human access.',
  'Treating the root user like a routine administrative identity.',
  'Attempting ABAC without real tagging governance.',
  'Troubleshooting IAM by guessing instead of inspecting the exact principal, action, resource, and evaluation context.',
]

const examples = [
  {
    id: 'ex-role-trust',
    title: 'Role trust policy shape',
    code: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}`,
    explanation:
      'A trust policy answers who may assume the role. It does not say what the role may do after assumption.',
  },
  {
    id: 'ex-identity-policy',
    title: 'Identity-based policy shape',
    code: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject"],
      "Resource": ["arn:aws:s3:::my-bucket/*"]
    }
  ]
}`,
    explanation:
      'This is the caller-side permission document. It grants the action only if no stronger control blocks it and the resource side also permits the access where required.',
  },
  {
    id: 'ex-boundary',
    title: 'Permissions boundary mental model',
    code: `identity policy:
  can allow s3:* and dynamodb:*

permissions boundary:
  allows only s3:GetObject and s3:PutObject

effective result:
  only S3 object read/write within the overlap`,
    explanation:
      'Boundaries limit what identity-based policies can make effective. They never add permissions on their own.',
  },
  {
    id: 'ex-cross-account',
    title: 'Cross-account role assumption shape',
    code: `Account A principal
  -> assumes role in Account B
     -> trust policy in Account B allows Account A principal
     -> permissions policy on assumed role grants actions in Account B

Optional additional constraints:
  SCPs
  boundaries
  session policies
  resource policies`,
    explanation:
      'Cross-account access depends on both assumption trust and post-assumption permissions, plus any surrounding guardrails.',
  },
]

const glossaryTerms = [
  {
    term: 'Principal',
    definition:
      'The identity making a request, such as a user, role session, federated identity, service principal, or root.',
  },
  {
    term: 'Identity-based policy',
    definition:
      'A policy attached to a user, group, or role that defines allowed or denied actions for that identity.',
  },
  {
    term: 'Resource-based policy',
    definition:
      'A policy attached directly to a resource that defines who may access it and under what conditions.',
  },
  {
    term: 'Trust policy',
    definition:
      'The policy on a role that defines who may assume that role.',
  },
  {
    term: 'Permissions boundary',
    definition:
      'A limiting policy that defines the maximum permissions an identity-based policy can make effective.',
  },
  {
    term: 'Session policy',
    definition:
      'A policy used to further restrict the permissions available in a temporary session.',
  },
  {
    term: 'SCP',
    definition:
      'A Service Control Policy in AWS Organizations that defines the maximum available permissions in an account or organizational unit.',
  },
  {
    term: 'ABAC',
    definition:
      'Attribute-based access control, where permissions are driven by attributes such as tags on principals and resources.',
  },
  {
    term: 'Instance profile',
    definition:
      'The AWS container used to attach an IAM role to an EC2 instance.',
  },
  {
    term: 'Federation',
    definition:
      'An authentication model in which identities from an external or centralized provider obtain temporary AWS access rather than using long-lived local IAM user credentials.',
  },
]

const pageSources = [
  'https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html',
  'https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html',
  'https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html',
  'https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html',
  'https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html',
  'https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_identity-vs-resource.html',
  'https://docs.aws.amazon.com/IAM/latest/UserGuide/access_tags.html',
  'https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html',
  'https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html',
  'https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html',
  'https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html',
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
    { id: 'bp-fit', label: 'When to Choose Which Model' },
  ],
  'core-concepts': [
    { id: 'core-principals', label: 'Principals' },
    { id: 'core-policies', label: 'Policy Types' },
    { id: 'core-evaluation', label: 'Evaluation Logic' },
    { id: 'core-roles', label: 'Roles and Trust' },
    { id: 'core-conditions', label: 'Conditions and ABAC' },
    { id: 'core-resource-policies', label: 'Resource Policies' },
    { id: 'core-boundaries', label: 'Boundaries and Sessions' },
    { id: 'core-org', label: 'Organizations and SCPs' },
    { id: 'core-human-access', label: 'Human Access' },
    { id: 'core-best-practices', label: 'Best Practices' },
    { id: 'core-observability', label: 'Observability' },
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

const iamHelpStyles = `
.iam-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.iam-help-window {
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

.iam-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.iam-help-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.iam-help-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.iam-help-control {
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

.iam-help-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
}

.iam-help-tab {
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

.iam-help-tab.active {
  position: relative;
  top: 1px;
  background: #fff;
}

.iam-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
  border-top: 1px solid #404040;
  background: #fff;
}

.iam-help-toc {
  overflow: auto;
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
}

.iam-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.iam-help-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.iam-help-toc-list li {
  margin: 0 0 8px;
}

.iam-help-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.iam-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.iam-help-title-main {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.iam-help-section {
  margin: 0 0 20px;
}

.iam-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.iam-help-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.iam-help-content p,
.iam-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.iam-help-content p {
  margin: 0 0 10px;
}

.iam-help-content ul,
.iam-help-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.iam-help-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.iam-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  background: #f4f4f4;
}

.iam-help-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

.iam-help-inline-link {
  color: #000080;
}

@media (max-width: 900px) {
  .iam-help-main {
    grid-template-columns: 1fr;
  }

  .iam-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}
`

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

export default function AwsIamPage(): JSX.Element {
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
    <div className="iam-help-page">
      <style>{iamHelpStyles}</style>
      <div className="iam-help-window" role="presentation">
        <header className="iam-help-titlebar">
          <span className="iam-help-title">{pageTitle}</span>
          <div className="iam-help-controls">
            <button className="iam-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="iam-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="iam-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`iam-help-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="iam-help-main">
          <aside className="iam-help-toc" aria-label="Table of contents">
            <h2 className="iam-help-toc-title">Contents</h2>
            <ul className="iam-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="iam-help-content">
            <h1 className="iam-help-title-main">{pageTitle}</h1>
            <p className="iam-help-subheading">{pageSubtitle}</p>
            <p>
              This page treats IAM as the AWS permission evaluation system rather than as a list of users and roles. The real work
              is understanding principals, trust, policy layers, effective permission calculation, and how governance scales
              across accounts and workloads.
            </p>
            <p>
              The title-bar minimize control returns to the previous page when possible, or to{' '}
              <Link to="/algoViz" className="iam-help-inline-link">
                /algoViz
              </Link>{' '}
              when there is no prior history entry.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="iam-help-section">
                  <h2 className="iam-help-heading">Overview</h2>
                  {bigPictureSections.map((section) => (
                    <div key={section.title}>
                      <h3 className="iam-help-subheading">{section.title}</h3>
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  ))}
                </section>
                <hr className="iam-help-divider" />
                <section id="bp-identities" className="iam-help-section">
                  <h2 className="iam-help-heading">Identity Choices</h2>
                  {identityGuide.map((item) => (
                    <div key={item.title}>
                      <h3 className="iam-help-subheading">{item.title}</h3>
                      <p>{item.summary}</p>
                      <ul>
                        {item.details.map((detail) => (
                          <li key={detail}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>
                <hr className="iam-help-divider" />
                <section id="bp-flow" className="iam-help-section">
                  <h2 className="iam-help-heading">Evaluation Flow</h2>
                  <ol>
                    {lifecycleFlow.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </section>
                <hr className="iam-help-divider" />
                <section id="bp-fit" className="iam-help-section">
                  <h2 className="iam-help-heading">When to Choose Which Model</h2>
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
                  <section key={section.id} id={section.id} className="iam-help-section">
                    <h2 className="iam-help-heading">{section.heading}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </section>
                ))}

                <section id="core-ops" className="iam-help-section">
                  <h2 className="iam-help-heading">Operational Notes</h2>
                  {operationsNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-patterns" className="iam-help-section">
                  <h2 className="iam-help-heading">Design Patterns</h2>
                  {designPatterns.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-pitfalls" className="iam-help-section">
                  <h2 className="iam-help-heading">Common Pitfalls</h2>
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
                  <section key={example.id} id={example.id} className="iam-help-section">
                    <h2 className="iam-help-heading">{example.title}</h2>
                    <div className="iam-help-codebox">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </section>
                ))}
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="iam-help-section">
                <h2 className="iam-help-heading">Glossary</h2>
                {glossaryTerms.map((item) => (
                  <p key={item.term}>
                    <strong>{item.term}:</strong> {item.definition}
                  </p>
                ))}
                <h3 className="iam-help-subheading">Primary Source Set</h3>
                <ul>
                  {pageSources.map((source) => (
                    <li key={source}>
                      <a href={source} className="iam-help-inline-link" target="_blank" rel="noreferrer">
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
