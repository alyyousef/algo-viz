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

const pageTitle = 'Azure DevOps'
const pageSubtitle =
  'Integrated planning, source control, CI/CD, package feeds, and test management for software teams.'

const introParagraphs = [
  "Azure DevOps is Microsoft's application lifecycle management platform for planning work, managing source code, automating builds and deployments, publishing packages, and coordinating quality workflows. The platform combines Azure Boards, Azure Repos, Azure Pipelines, Azure Artifacts, and Azure Test Plans into one service boundary so teams can trace work from idea to code to release.",
  'The important architectural point is that Azure DevOps is not only a pipeline tool. It is a delivery operating system for engineering teams. Work items, repositories, pull requests, builds, packages, test runs, approvals, dashboards, and permissions can all live in one project model, which is why Azure DevOps is still common in enterprise organizations that want integrated governance and traceability rather than a loose collection of disconnected tools.',
  'This page treats Azure DevOps as a platform-engineering and delivery-systems topic: organization and project structure, Boards hierarchy, Repos and branch policies, YAML pipelines, agents and pools, environments and approvals, package feeds, test management, security boundaries, service connections, cloud versus server, cost and licensing shape, and the design choices that determine when Azure DevOps is the right toolchain anchor.',
]

const bigPictureSections: Array<{ title: string; paragraphs: string[] }> = [
  {
    title: 'What it is',
    paragraphs: [
      'Azure DevOps is a cloud service and on-premises server product for managing software delivery end to end. In the cloud form, Azure DevOps Services gives you Microsoft-managed hosting, automatic updates, and global availability. In the self-hosted form, Azure DevOps Server gives you the same broad product family for organizations that must keep data on-premises or need deeper control over infrastructure and lifecycle timing.',
      'The product line follows a recognizable flow: plan in Boards, code in Repos, build and deploy with Pipelines, store packages in Artifacts, manage manual and exploratory testing with Test Plans, and observe progress through dashboards, analytics, notifications, and traceability links. That integration is the main reason to think about Azure DevOps as a platform instead of only a collection of individual tools.',
    ],
  },
  {
    title: 'Why teams use it',
    paragraphs: [
      'Teams use Azure DevOps when they want one place to track requirements, enforce code review, automate CI/CD, manage package feeds, and tie test evidence back to work items. It is especially attractive in regulated or enterprise environments where audit trails, approvals, role-based access, and standardized engineering workflows matter as much as raw developer convenience.',
      'It is also valuable when organizations want to support many stacks at once. Microsoft documents support for major languages and platforms, broad IDE integration, deployment to Azure or other clouds, and both Git and TFVC source control. That flexibility makes Azure DevOps a reasonable shared platform for mixed portfolios rather than a tool only for one runtime or one hosting model.',
    ],
  },
  {
    title: 'How to think about it',
    paragraphs: [
      'Think of Azure DevOps as a graph of engineering artifacts. A work item can link to a branch, a commit, a pull request, a pipeline run, a package, a test result, and a deployment. The value is not only in each artifact individually, but in how the system connects them. That traceability is what lets managers ask what shipped, reviewers ask why a change was made, and operators ask which run produced the version now in production.',
      'The platform works best when you establish clear boundaries. Organizations hold users, policies, and billing. Projects are the main delivery boundary for code, pipelines, boards, and feeds. Teams define their own backlogs, boards, area paths, and iteration paths. Agent pools, environments, feeds, and service connections add further operational boundaries. If those scopes are unclear, Azure DevOps becomes noisy and difficult to govern.',
    ],
  },
  {
    title: 'Core service map',
    paragraphs: [
      'Azure Boards handles planning and work tracking. Azure Repos manages Git or TFVC source control. Azure Pipelines automates build, test, and deployment workflows. Azure Artifacts stores internal packages and manages upstream package consumption. Azure Test Plans handles manual and exploratory testing. Dashboards, analytics, wikis, notifications, and service hooks tie these services together for collaboration and reporting.',
      'The broad mental model is simple: Boards answers what are we doing, Repos answers what changed, Pipelines answers what ran and what deployed, Artifacts answers what package version is trusted, and Test Plans answers what was verified. Good Azure DevOps usage keeps those answers linked rather than living in separate systems with weak handoffs.',
    ],
  },
  {
    title: 'Where it fits',
    paragraphs: [
      'Azure DevOps is a strong fit for enterprise application teams, internal platforms, product groups that need disciplined traceability, and organizations that want a single delivery stack across many repositories and business units. It is also a good fit when you need pipeline environments, approvals, service connections, work tracking, and package management in one platform rather than gluing together separate vendors.',
      'It is a weaker fit when the team already standardized deeply on GitHub for source, CI, project planning, and package flows, or when the organization wants a simpler, lighter-weight toolchain. Azure DevOps can absolutely integrate with GitHub, but if you only need one narrow slice of its capability, the full platform can be more governance surface than you actually want.',
    ],
  },
]

const operatingModelGuide = [
  {
    title: 'Organization is the administrative boundary',
    detail:
      'The organization is the top-level Azure DevOps scope. It owns users, billing, security groups, and the collection of projects underneath it.',
  },
  {
    title: 'Project is the main delivery boundary',
    detail:
      'Projects contain boards, repositories, pipelines, test assets, dashboards, and most day-to-day collaboration artifacts. A project is usually where one product or a closely related portfolio lives.',
  },
  {
    title: 'Team is the planning boundary',
    detail:
      'Each team gets its own backlog and board behavior through selected area paths and iteration paths. Teams can share one project while still seeing different planning views.',
  },
  {
    title: 'Services are integrated, not isolated',
    detail:
      'Branches, pull requests, builds, releases, packages, test runs, and work items can be linked so engineering evidence survives handoffs between planning, coding, testing, and deployment.',
  },
  {
    title: 'Cloud and server are separate operating models',
    detail:
      'Azure DevOps Services removes platform maintenance and updates automatically. Azure DevOps Server keeps data on infrastructure you manage, but you also own upgrades, operations, and availability.',
  },
]

const fitGuide = [
  {
    title: 'Need one integrated platform for planning, repos, CI/CD, packages, and manual testing',
    choice: 'Azure DevOps is a strong default.',
  },
  {
    title:
      'Need enterprise permissions, approvals, and traceability across the full software lifecycle',
    choice: 'Azure DevOps is especially strong.',
  },
  {
    title:
      'Need to support mixed stacks, mixed IDEs, and mixed repository strategies across many teams',
    choice: 'Azure DevOps is designed for that breadth.',
  },
  {
    title: 'Need only Git hosting and lightweight CI for a small team',
    choice: 'Azure DevOps can work, but it may be more platform than necessary.',
  },
  {
    title: 'Need full on-premises control or data residency beyond the cloud service model',
    choice: 'Evaluate Azure DevOps Server instead of Azure DevOps Services.',
  },
  {
    title: 'Already standardized on GitHub for planning, reviews, automation, and packages',
    choice: 'Use Azure DevOps only where it adds clear value, not by duplication.',
  },
]

const keyTakeaways = [
  'Azure DevOps is an integrated delivery platform, not only a CI server.',
  'The most important scopes are organization, project, team, environment, feed, and agent pool.',
  'Boards, Repos, Pipelines, Artifacts, and Test Plans are strongest when linked together with traceability.',
  'YAML pipelines are the recommended starting model for new pipeline work.',
  'Most Azure DevOps pain comes from weak boundaries, over-broad permissions, or trying to force one project to model too many unrelated teams.',
]

const coreConceptSections: NarrativeSection[] = [
  {
    id: 'core-architecture',
    heading: 'Organization, Project, Team, and the Real Workspace Model',
    paragraphs: [
      'The first thing to understand about Azure DevOps is scope. The organization is the administrative shell. Projects are the main unit where software-delivery assets live. Teams are not separate projects by default; they are planning views layered on top of a project. That distinction matters because many organizations either oversplit into too many projects or undersplit and turn one giant project into an incoherent dumping ground.',
      'Inside a project, every team gets its own backlog and board behavior through selected area paths and iteration paths. Microsoft documents that backlog and board content is filtered by those paths, and that new work items created from team planning tools inherit the team defaults. This means a healthy project structure depends less on folder names and more on clear area-path ownership and iteration discipline.',
      'The practical rule is simple: use projects for major security, lifecycle, or ownership boundaries. Use teams for planning separation inside a shared product space. If multiple groups share code and release cadences but need their own boards, teams are usually enough. If they need different governance, separate admin boundaries, or a different blast radius, separate projects are usually cleaner.',
    ],
  },
  {
    id: 'core-boards',
    heading: 'Azure Boards: Work Items, Backlogs, Boards, Sprints, and Traceability',
    paragraphs: [
      'Azure Boards is the planning layer of Azure DevOps. It supports work item types such as epics, features, user stories, bugs, and tasks, along with queries, dashboards, sprint planning tools, and delivery plans. Microsoft emphasizes that Boards is meant to start simply and then scale with additional teams, customized fields, portfolio backlogs, and analytics as the organization grows.',
      'The most important operational concept is that Boards views are not just arbitrary lists. Backlogs and boards are shaped by team area paths, iteration paths, and workflow states. When teams misunderstand those defaults, they often think items are missing or duplicated when the real issue is that the work is assigned to the wrong area, sprint, or state category.',
      'Boards becomes much more powerful when you treat work items as durable anchors rather than temporary tickets. Work items can link to branches, commits, pull requests, builds, releases, and test evidence. That gives you requirement-to-code and requirement-to-production traceability, which is valuable for audits, incident reviews, and delivery reporting.',
    ],
  },
  {
    id: 'core-repos',
    heading: 'Azure Repos: Git, TFVC, Pull Requests, and Branch Policies',
    paragraphs: [
      'Azure Repos provides Azure DevOps source control. For new work, Git is the default and usually the right choice. Azure DevOps still supports TFVC for organizations that need centralized version control or that carry historical Team Foundation Server patterns, but modern product teams overwhelmingly center new workflows on Git repositories and pull requests.',
      'In Git mode, Azure Repos is standard Git with Azure DevOps-specific collaboration features around pull requests, review comments, branch permissions, and policies. Branch policies are one of the most important governance tools in the platform because they let you require review, comment resolution, work item linking, or build validation before protected branches such as main are updated.',
      'A healthy Azure Repos model is opinionated. Developers work on short-lived branches, open pull requests, satisfy policies, and merge through protected targets. The key mistake is treating the repository as a shared file drop where direct pushes to main are tolerated. Azure DevOps can enforce disciplined review and validation, but only if you actually turn the policies on and make them match how your team wants to ship.',
    ],
  },
  {
    id: 'core-pipelines',
    heading: 'Azure Pipelines: YAML, Classic, Stages, Jobs, Tasks, and Artifacts',
    paragraphs: [
      'Azure Pipelines is the automation layer for build, test, and deployment. Microsoft documents support for many languages and target environments, and the platform can work with Azure Repos, GitHub, and other source providers. Its conceptual model is straightforward: triggers start a pipeline, stages organize work, jobs execute on agents, and tasks or scripts perform individual steps.',
      'For new pipeline work, Microsoft recommends YAML pipelines. The reason is architectural, not cosmetic. YAML keeps the pipeline definition in version control alongside the application, so every branch can evolve automation with the code it changes. That makes pipeline behavior reviewable, reproducible, and far easier to reason about than opaque click-configured automation.',
      'Classic pipelines still exist and remain useful in some older estates, especially where teams rely on legacy release-pipeline patterns. But if you are designing a new delivery path today, the default should be YAML plus reusable templates, variable groups, secure files, and explicit stage structure. Otherwise the automation surface becomes harder to diff, test, and govern.',
    ],
  },
  {
    id: 'core-agents',
    heading: 'Agents, Pools, and the Difference Between Microsoft-Hosted and Self-Hosted',
    paragraphs: [
      'Pipelines run on agents. Microsoft-hosted agents are the easiest starting point because every job gets a fresh virtual machine image that Microsoft manages and discards after the job completes. That clean-room model reduces maintenance and hidden state, but it also means local machine caches and file system changes do not persist from one job to the next.',
      'Self-hosted agents are the right choice when you need private network reachability, persistent caches, specialized toolchains, custom hardware, more control over software installed on the runner, or access to infrastructure that Microsoft-hosted agents cannot safely reach. Microsoft also documents that self-hosted agents can be used with both Azure DevOps Services and Azure DevOps Server.',
      'Agent pools are the operational abstraction that matters. Pools decide who can use which runners and under what trust model. A common mistake is throwing every build and deployment workload into one shared self-hosted pool. That creates a broad blast radius and weakens isolation. In mature setups, pools are segmented by sensitivity, network access, operating system, or workload class.',
    ],
  },
  {
    id: 'core-environments',
    heading: 'Environments, Approvals, Checks, and Release Safety',
    paragraphs: [
      'Azure Pipelines environments represent deployment targets or deployment contexts, and deployment jobs are the YAML construct that run sequential steps against an environment. This is where Azure DevOps moves from build automation to governed release automation. The environment is not just a label; it is a control point for approvals, checks, history, and deployment visibility.',
      'Microsoft documents that checks can be configured on environments, service connections, repositories, variable groups, secure files, and agent pools. Before a stage starts, Azure Pipelines pauses and evaluates those checks. Categories run in a documented order, beginning with static checks and approvals, then dynamic checks such as REST calls or Azure Monitor validation, and finally exclusive locks.',
      'The deeper lesson is that release safety belongs to resources, not only to pipeline YAML. You should not encode every approval rule as ad hoc script logic. Put approval ownership on the environment, service connection, or other protected resource so that production control survives pipeline refactors and remains visible to the people who actually own the deployment risk.',
    ],
  },
  {
    id: 'core-artifacts',
    heading: 'Azure Artifacts: Feeds, Views, Upstream Sources, and Package Governance',
    paragraphs: [
      'Azure Artifacts gives teams internal package feeds for NuGet, npm, Maven, Python, Cargo, and Universal Packages. This matters because many delivery systems fail at the package boundary, not at the source boundary. If you can build software but cannot reliably publish, promote, and consume trusted versions of dependencies, your supply chain remains fragile.',
      'Feeds are the core abstraction. You publish packages to a feed, control access with feed roles, and expose curated versions through feed views. Microsoft documents three default views in each feed: @Local, @Prerelease, and @Release. That pattern encourages teams to separate raw publication from promotion, which is how package repositories become part of controlled release management instead of just storage.',
      'Artifacts also supports upstream sources, which is operationally important. Instead of letting every build agent fetch arbitrary external dependencies directly at runtime, you can front public ecosystems through controlled feeds, cache approved versions, and reduce both risk and unpredictability. Mature teams treat feeds as part of platform governance, not as a convenience feature.',
    ],
  },
  {
    id: 'core-test-plans',
    heading: 'Azure Test Plans: Manual Testing, Exploratory Testing, and Evidence',
    paragraphs: [
      'Azure Test Plans is the test-management slice of Azure DevOps. It focuses on manual, exploratory, and traceability-oriented testing rather than replacing every automated test framework. Microsoft documents support for test plans, suites, test cases, query-based selection, reusable steps, and linking requirements directly to tests and bugs.',
      'This is most valuable in environments where you need human-verifiable evidence, signoff trails, structured regression passes, or exploratory testing attached to a release. Test cases and test runs become first-class engineering artifacts rather than screenshots lost in chat. Azure DevOps can then tie those artifacts back to work items and pipeline runs.',
      'Current Microsoft documentation also highlights an updated Test Run Hub experience in Azure DevOps Services, with a gradual transition toward general availability beginning in early 2026. The exact rollout timing may vary by organization, but the direction is clear: richer execution analysis and test-result review are becoming more central to the Test Plans workflow rather than remaining peripheral reporting screens.',
    ],
  },
  {
    id: 'core-security',
    heading: 'Permissions, Access Levels, Security Groups, and Least Privilege',
    paragraphs: [
      'Azure DevOps security combines access levels, group membership, and object-level permissions. Microsoft documents that users inherit permissions from the groups they belong to, and that Deny overrides Allow when a user gets conflicting permissions from different groups. That means permission design should be group-first, not user-by-user improvisation.',
      'In practice, most users belong to Contributors plus one or more team groups, while more sensitive abilities are delegated to narrower administrator or custom groups. This matters because Azure DevOps permissions exist at many layers: organization, project, repository, branch, feed, environment, pipeline resource, and more. If you flatten all of that into broad contributor access, governance degrades quickly.',
      'Access level and permission are also different things. A user can have membership in a group but still be blocked from features by a limited access level such as Stakeholder. Mature Azure DevOps administration always checks both dimensions: what the identity is allowed to do by permission, and what the license or access level allows them to see at all.',
    ],
  },
  {
    id: 'core-service-connections',
    heading: 'Service Connections, Variables, Secrets, and External Reach',
    paragraphs: [
      'Service connections are how pipelines authenticate to external systems such as Azure subscriptions, registries, package repositories, or remote services. Microsoft documents a wide range of connection types and explicitly recommends not granting every pipeline automatic access to a connection by default. That recommendation matters because a service connection often represents real deployment power, not just metadata.',
      'The architectural rule is straightforward: service connections are trust boundaries. A production Azure Resource Manager connection, a Docker registry credential, or a package-publishing endpoint should be authorized only for the pipelines that genuinely require it. If every pipeline in a project can reach every external system, a build definition quickly becomes a lateral-movement surface.',
      'Pair service connections with secure files, variable groups, and secret-management discipline. Use the least amount of standing credential necessary, prefer modern identity-backed connection models where available, and keep pipeline YAML free of copied secrets. The safest pipeline is the one that references a governed resource rather than embedding credentials in text.',
    ],
  },
  {
    id: 'core-collaboration',
    heading: 'Dashboards, Wiki, Notifications, Analytics, and Service Hooks',
    paragraphs: [
      'Azure DevOps is not only for code and pipelines. The platform also provides dashboards, project wikis, work item discussions, notifications, analytics, and service hooks. These features matter because delivery systems fail when information is technically present but operationally invisible. Dashboards and analytics create shared visibility; service hooks and notifications move important events into the tools where people actually respond.',
      'The wiki is useful for project runbooks, architecture decisions, onboarding notes, and release procedures. Discussions and @mentions keep context attached to work items or pull requests rather than scattering it across chat history. Analytics and Power BI integration let teams build delivery reports from the system of record instead of maintaining spreadsheet replicas that immediately drift.',
      'Service hooks are a particularly important integration mechanism. They allow Azure DevOps events such as build failures, work item changes, or code pushes to notify or trigger downstream systems. In mature environments, this turns Azure DevOps into an event source for broader platform automation rather than a sealed developer-only portal.',
    ],
  },
  {
    id: 'core-cloud-server',
    heading: 'Azure DevOps Services versus Azure DevOps Server',
    paragraphs: [
      'Azure DevOps Services is the cloud-hosted version and is usually the right default when there are no hard regulatory or network constraints. Microsoft handles platform maintenance, updates, and service availability, and the documentation highlights global scale, automatic updates, and a 99.9 percent SLA for the hosted service.',
      'Azure DevOps Server exists for organizations that must keep the platform on their own infrastructure or require customizations and data locality not offered in the cloud service. The tradeoff is simple: you gain control, but you also own server lifecycle, upgrades, backups, capacity, and operational reliability for the DevOps platform itself.',
      'This is a platform strategy decision, not a developer preference toggle. If your organization chooses Server, it should do so for clear reasons such as compliance or network topology. If it chooses Services, it should embrace the cloud model fully instead of trying to recreate every on-prem assumption in a hosted product.',
    ],
  },
  {
    id: 'core-governance',
    heading: 'Scaling Governance Across Many Teams and Large Portfolios',
    paragraphs: [
      'Azure DevOps can scale well, but only when the organization makes explicit decisions about process templates, naming, team structure, permission delegation, branch protection, pipeline template reuse, feed ownership, and service-connection governance. Without those rules, the platform becomes easy to start but hard to operate consistently across many teams.',
      'Microsoft documentation on teams and Agile tools explicitly describes scaling by creating additional teams and using area paths to structure hierarchy. It also notes that teams often consider splitting when they grow beyond roughly six to nine members. That is not a hard law, but it is a useful warning sign that one backlog may be trying to represent too much work or too many ownership lines.',
      'A sound large-scale design uses standard templates and default policies, then allows local variation only where justified. Central governance should provide paved roads: branch policy baselines, pipeline starter templates, environment naming, feed lifecycle rules, and service connection ownership. Teams should innovate on product delivery, not reinvent platform hygiene from scratch.',
    ],
  },
  {
    id: 'core-cost',
    heading: 'Cost, Access, Parallel Jobs, and the Billing Shape of the Platform',
    paragraphs: [
      'Azure DevOps cost is not only about user seats. You should think in terms of access levels, test-management needs, server versus service hosting model, and pipeline parallelism. Microsoft documents that Azure DevOps Services includes up to five users with basic features for free and unlimited stakeholders for work-item and dashboard visibility, while Basic + Test Plans adds the licensed test-management layer for users who need it.',
      'Pipeline capacity is a second billing axis. Microsoft documentation current as checked on March 13, 2026 states that Azure DevOps grants a free tier of parallel jobs to every organization, with one private parallel job capped at 60 minutes per run and 1,800 minutes per month, and public-project allowances that differ for self-hosted versus Microsoft-hosted agents. The same docs also note that some new organizations do not receive the free grant automatically and may need to request it.',
      'The practical advice is to model cost around bottlenecks. If builds queue constantly, parallelism may be the real constraint. If only a subset of users needs manual testing, access levels matter more than raw user count. If self-hosted infrastructure exists only to avoid hosted-agent minutes but adds heavy maintenance, the apparent savings can be misleading.',
    ],
  },
]

const designPatterns = [
  {
    title: 'Work-item anchored delivery',
    detail:
      'Create user stories or backlog items first, branch from them, link pull requests and deployments back to them, and use the work item as the durable traceability record.',
  },
  {
    title: 'Protected mainline with policy-driven merges',
    detail:
      'Require pull requests, build validation, reviewer checks, and comment resolution on protected branches so release quality is enforced by policy instead of convention.',
  },
  {
    title: 'YAML pipelines with shared templates',
    detail:
      'Keep pipeline definitions in source control and extract common build, test, and deploy logic into templates so teams share one delivery contract rather than copy-pasting YAML.',
  },
  {
    title: 'Environment-owned release controls',
    detail:
      'Put approvals and checks on environments or other protected resources so production control survives pipeline edits and remains visible to resource owners.',
  },
  {
    title: 'Curated internal package feeds',
    detail:
      'Use Azure Artifacts feeds and views to separate raw package publication from tested and promoted package versions.',
  },
  {
    title: 'Pool segmentation by trust boundary',
    detail:
      'Separate hosted and self-hosted runners, private-network deployments, and sensitive workloads into distinct agent pools instead of mixing all jobs on one runner fleet.',
  },
]

const operationalChecklist = [
  'Define clear project boundaries before creating repos, boards, and feeds.',
  'Set area paths and iteration paths deliberately for every team.',
  'Protect main branches with pull-request policies and build validation.',
  'Default new pipelines to YAML and review them like application code.',
  'Use Microsoft-hosted agents first; move to self-hosted only for a concrete need.',
  'Authorize service connections per pipeline instead of granting org-wide usage.',
  'Model production approvals on environments or other resources, not ad hoc scripts.',
  'Separate package publication from package promotion through feed views.',
  'Manage permissions with groups, not individual user exceptions.',
  'Track delivery using dashboards and analytics fed by linked work items, runs, and tests.',
]

const compareNotes = [
  {
    title: 'Azure DevOps versus GitHub',
    detail:
      'GitHub is often the default collaboration hub for source-first workflows and open-source ecosystems, while Azure DevOps remains especially strong where integrated Boards, enterprise project structure, manual test management, and richer built-in delivery governance are central requirements.',
  },
  {
    title: 'Azure Repos versus external Git hosting',
    detail:
      'Azure Repos keeps source control inside the same security, policy, and traceability surface as work items and pipelines. External Git hosting can still integrate well, but some governance and linking flows become cross-system instead of native.',
  },
  {
    title: 'Azure Pipelines versus narrow CI servers',
    detail:
      'Azure Pipelines is not only about build execution. It combines multi-stage delivery, environments, approvals, artifacts, service connections, and cross-cloud deployment support in one platform.',
  },
  {
    title: 'Azure Test Plans versus pure automated test reporting',
    detail:
      'Automated results in pipelines cover code-level validation, but Test Plans adds manual, exploratory, and requirement-linked evidence when a release needs human verification or structured QA management.',
  },
  {
    title: 'Azure DevOps Services versus Server',
    detail:
      'Services reduces platform operations and updates automatically. Server gives you infrastructure control and on-prem data placement, but you own the platform lifecycle.',
  },
]

const pitfalls = [
  'Using one giant project for unrelated products, teams, and permission domains until every board, feed, and pipeline becomes noisy.',
  'Leaving protected branches open to direct pushes and then expecting pull requests to provide meaningful governance.',
  'Treating service connections like harmless metadata and granting them to every pipeline.',
  'Using self-hosted agents without a clear reason, then inheriting patching, network, and runner-drift problems.',
  'Ignoring area paths and iteration paths, which leads to boards and backlogs that seem inconsistent or broken.',
  'Publishing packages to a feed without a promotion model, so consumers cannot tell which versions are actually trusted.',
  'Keeping critical release logic only inside pipeline scripts instead of resource-level approvals and checks.',
  'Managing permissions user by user instead of through groups, which makes effective access impossible to reason about.',
  'Assuming Test Plans is redundant just because automated unit tests exist, even when the organization still needs exploratory or signoff-driven testing.',
  'Running every team on bespoke YAML with no templates, which turns the platform into a maintenance swamp.',
]

const examples: ExampleSection[] = [
  {
    id: 'ex-ci',
    title: 'Minimal CI pipeline for a web app',
    code: `trigger:
- main

pr:
- main

pool:
  vmImage: ubuntu-latest

steps:
- checkout: self
- task: NodeTool@0
  inputs:
    versionSpec: '20.x'
- script: npm ci
  displayName: Install dependencies
- script: npm test
  displayName: Run tests
- script: npm run build
  displayName: Build application
- task: PublishPipelineArtifact@1
  inputs:
    targetPath: dist
    artifact: webapp`,
    explanation:
      'This is the classic Azure Pipelines CI shape: trigger on branch and PR updates, run on a Microsoft-hosted image, execute build steps, and publish a pipeline artifact. It is intentionally simple and versioned with the application, which is why YAML is the recommended starting point for new pipelines.',
  },
  {
    id: 'ex-cd',
    title: 'Multi-stage deployment using environments',
    code: `trigger:
- main

stages:
- stage: Build
  jobs:
  - job: BuildWeb
    pool:
      vmImage: ubuntu-latest
    steps:
    - script: npm ci
    - script: npm run build
    - task: PublishPipelineArtifact@1
      inputs:
        targetPath: dist
        artifact: webapp

- stage: Deploy_Staging
  dependsOn: Build
  jobs:
  - deployment: DeployStaging
    environment: staging
    strategy:
      runOnce:
        deploy:
          steps:
          - download: current
            artifact: webapp
          - script: ./scripts/deploy.sh staging

- stage: Deploy_Production
  dependsOn: Deploy_Staging
  condition: succeeded()
  jobs:
  - deployment: DeployProduction
    environment: production
    strategy:
      runOnce:
        deploy:
          steps:
          - download: current
            artifact: webapp
          - script: ./scripts/deploy.sh production`,
    explanation:
      'The important idea here is not the shell script. It is the use of deployment jobs and environments. Environment owners can attach approvals and checks outside the YAML so production control remains governed even if the pipeline definition evolves.',
  },
  {
    id: 'ex-policy',
    title: 'Build-validation policy for a protected branch',
    code: `az repos policy build create \\
  --blocking true \\
  --branch main \\
  --build-definition-id 1 \\
  --display-name build-policy \\
  --enabled true \\
  --manual-queue-only true \\
  --queue-on-source-update-only false \\
  --repository-id d28cd374-e7f0-4b1f-ad60-f349f155d47c \\
  --valid-duration 0 \\
  --output table`,
    explanation:
      'Azure Repos branch policies are where repository governance becomes enforceable. This example uses the Azure DevOps CLI to require a successful build before pull requests into main can complete. The exact repository and build identifiers vary, but the pattern is durable: protect important branches with automated validation, not social requests.',
  },
  {
    id: 'ex-template',
    title: 'Reusing a shared pipeline template',
    code: `# azure-pipelines.yml
trigger:
- main

extends:
  template: pipelines/templates/service-ci.yml
  parameters:
    vmImage: ubuntu-latest
    nodeVersion: '20.x'
    testCommand: npm test
    buildCommand: npm run build
    artifactName: webapp`,
    explanation:
      'Template-based pipelines are one of the cleanest ways to scale Azure DevOps across many services. Instead of copying YAML between repositories, platform teams publish a small number of reviewed templates and let product teams supply parameters. That gives consistency without forcing every team into a one-off pipeline design.',
  },
]

const glossaryTerms = [
  {
    term: 'Organization',
    definition:
      'The top-level Azure DevOps scope that owns users, billing, settings, security groups, and projects.',
  },
  {
    term: 'Project',
    definition:
      'The main delivery boundary containing boards, repos, pipelines, feeds, tests, and dashboards for a product or portfolio.',
  },
  {
    term: 'Team',
    definition:
      'A planning-focused grouping inside a project with its own backlog and board behavior based on area and iteration paths.',
  },
  {
    term: 'Area Path',
    definition:
      'A field used to scope ownership and filter work items into the appropriate team backlog and board views.',
  },
  {
    term: 'Iteration Path',
    definition:
      'A field that maps work into sprint or cadence structure and affects sprint backlogs and planning views.',
  },
  {
    term: 'Work Item',
    definition:
      'A tracked unit of planned or discovered work such as an epic, feature, user story, bug, task, or test case.',
  },
  {
    term: 'Pull Request',
    definition:
      'A proposed code change reviewed and merged into a target branch after comments, policies, and validation succeed.',
  },
  {
    term: 'Branch Policy',
    definition:
      'A repository rule that can require reviewers, build validation, comment resolution, work item linking, or other protections before merge.',
  },
  {
    term: 'Pipeline',
    definition:
      'An automated workflow that builds, tests, packages, and optionally deploys code using stages, jobs, and tasks.',
  },
  {
    term: 'Agent Pool',
    definition:
      'A collection of build or deployment agents that pipelines are authorized to run on.',
  },
  {
    term: 'Environment',
    definition:
      'A deployment target or logical deployment context that can carry checks, approvals, and history.',
  },
  {
    term: 'Service Connection',
    definition:
      'A stored, governed connection that lets pipeline tasks authenticate to external services or infrastructure.',
  },
  {
    term: 'Feed',
    definition:
      'An Azure Artifacts package repository for publishing, consuming, and promoting internal package versions.',
  },
  {
    term: 'Upstream Source',
    definition:
      'A configured external package source that an Azure Artifacts feed can proxy or save packages from.',
  },
  {
    term: 'Stakeholder',
    definition:
      'A limited Azure DevOps access level intended for broad visibility into work items and dashboards, not full engineering actions.',
  },
  {
    term: 'TFVC',
    definition:
      "Team Foundation Version Control, Azure DevOps's centralized source control option alongside Git.",
  },
]

const pageSources = [
  'https://learn.microsoft.com/en-us/azure/devops/user-guide/what-is-azure-devops?view=azure-devops',
  'https://learn.microsoft.com/en-us/azure/devops/boards/get-started/what-is-azure-boards?view=azure-devops',
  'https://learn.microsoft.com/en-us/azure/devops/organizations/settings/about-teams-and-settings?view=azure-devops',
  'https://learn.microsoft.com/en-us/azure/devops/repos/?view=azure-devops',
  'https://learn.microsoft.com/en-us/azure/devops/repos/git/branch-policies?view=azure-devops',
  'https://learn.microsoft.com/en-us/azure/devops/pipelines/get-started/what-is-azure-pipelines?view=azure-devops',
  'https://learn.microsoft.com/en-us/azure/devops/pipelines/get-started/pipelines-get-started?view=azure-devops',
  'https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/agents?view=azure-devops',
  'https://learn.microsoft.com/en-us/azure/devops/pipelines/process/approvals?view=azure-devops',
  'https://learn.microsoft.com/en-us/azure/devops/pipelines/library/service-endpoints?view=azure-devops-2022',
  'https://learn.microsoft.com/en-us/azure/devops/artifacts/?view=azure-devops',
  'https://learn.microsoft.com/en-us/azure/devops/artifacts/feeds/feed-permissions?view=azure-devops',
  'https://learn.microsoft.com/en-us/azure/devops/test/',
  'https://learn.microsoft.com/en-us/azure/devops/test/test-runs',
  'https://learn.microsoft.com/en-us/azure/devops/organizations/security/add-remove-manage-user-group-security-group?view=azure-devops',
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
    { id: 'core-architecture', label: 'Org and Project Model' },
    { id: 'core-boards', label: 'Boards' },
    { id: 'core-repos', label: 'Repos' },
    { id: 'core-pipelines', label: 'Pipelines' },
    { id: 'core-agents', label: 'Agents and Pools' },
    { id: 'core-environments', label: 'Environments and Checks' },
    { id: 'core-artifacts', label: 'Artifacts' },
    { id: 'core-test-plans', label: 'Test Plans' },
    { id: 'core-security', label: 'Security and Permissions' },
    { id: 'core-service-connections', label: 'Service Connections' },
    { id: 'core-collaboration', label: 'Collaboration and Analytics' },
    { id: 'core-cloud-server', label: 'Services vs Server' },
    { id: 'core-governance', label: 'Governance at Scale' },
    { id: 'core-cost', label: 'Cost and Licensing' },
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
.azure-devops-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.azure-devops-help-page .win98-window {
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

.azure-devops-help-page .win98-titlebar {
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

.azure-devops-help-page .win98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.azure-devops-help-page .win98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.azure-devops-help-page .win98-control {
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

.azure-devops-help-page .win98-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
}

.azure-devops-help-page .win98-tab {
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

.azure-devops-help-page .win98-tab.active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.azure-devops-help-page .win98-main {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  flex: 1;
  min-height: 0;
  border-top: 1px solid #404040;
  background: #ffffff;
}

.azure-devops-help-page .win98-toc {
  overflow: auto;
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
}

.azure-devops-help-page .win98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.azure-devops-help-page .win98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.azure-devops-help-page .win98-toc-list li {
  margin: 0 0 8px;
}

.azure-devops-help-page .win98-toc-list a {
  color: #000000;
  font-size: 12px;
  text-decoration: none;
}

.azure-devops-help-page .win98-content {
  overflow-x: auto;
  overflow-y: scroll;
  scrollbar-gutter: stable;
  padding: 14px 20px 20px;
}
.azure-devops-help-page .win98-doc-title {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 700;
}

.azure-devops-help-page .win98-doc-subtitle {
  margin: 0 0 12px;
  font-size: 12px;
  font-weight: 700;
}

.azure-devops-help-page .win98-section {
  margin: 0 0 22px;
}

.azure-devops-help-page .win98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.azure-devops-help-page .win98-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.azure-devops-help-page .win98-content p,
.azure-devops-help-page .win98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.azure-devops-help-page .win98-content p {
  margin: 0 0 10px;
}

.azure-devops-help-page .win98-content ul,
.azure-devops-help-page .win98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.azure-devops-help-page .win98-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.azure-devops-help-page .win98-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.azure-devops-help-page .win98-codebox code {
  display: block;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
}

.azure-devops-help-page .win98-inline-link {
  color: #000080;
}

@media (max-width: 900px) {
  .azure-devops-help-page .win98-main {
    grid-template-columns: 1fr;
  }

  .azure-devops-help-page .win98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .azure-devops-help-page .win98-title-text {
    position: static;
    transform: none;
    margin-left: 8px;
    font-size: 14px;
  }
}
`

export default function AzureDevOpsPage(): JSX.Element {
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
    <div className="azure-devops-help-page">
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
                    This content was compiled from official Microsoft Learn documentation current as
                    checked on March 13, 2026. Azure DevOps features, licensing details, preview
                    states, and service behavior can change, so production decisions should always
                    be revalidated against the current documentation.
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
