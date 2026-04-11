import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-when-actions-fits', label: 'When GitHub Actions Fits Better' },
    { id: 'bp-when-azdo-fits', label: 'When Azure DevOps Fits Better' },
    { id: 'bp-tradeoffs', label: 'Tradeoffs and Decision Drivers' },
  ],
  'core-concepts': [
    { id: 'core-philosophy', label: 'Platform Philosophy' },
    { id: 'core-pipelines', label: 'Pipeline Model and YAML' },
    { id: 'core-integration', label: 'Repo and Platform Integration' },
    { id: 'core-runners', label: 'Runners, Agents, and Execution' },
    { id: 'core-deployments', label: 'Deployments, Releases, and Environments' },
    { id: 'core-security', label: 'Security, Permissions, and Governance' },
    { id: 'core-ecosystem', label: 'Extensions and Ecosystem' },
    { id: 'core-team', label: 'Team Fit and Operational Tradeoffs' },
  ],
  examples: [
    { id: 'ex-ci', label: 'CI Workflow Example' },
    { id: 'ex-deploy', label: 'Deployment Control Example' },
    { id: 'ex-reference', label: 'Decision Reference' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

const bigPictureSections = [
  {
    title: 'Overview',
    paragraphs: [
      'GitHub Actions and Azure DevOps both automate software delivery, but they are not simply two interchangeable CI products with different branding. GitHub Actions is tightly coupled to the GitHub repository and pull request workflow, while Azure DevOps is a broader enterprise delivery platform that covers pipelines, boards, repos, artifacts, test management, and release-oriented operational controls.',
      'That difference affects how teams reason about the tool. GitHub Actions often feels like automation embedded inside the development platform developers already use every day. Azure DevOps often feels like a larger work-management and delivery system that can coordinate repositories, pipelines, approvals, environments, and enterprise governance across more organizational surfaces.',
      'Both can build, test, package, and deploy serious systems. The meaningful comparison is usually about operating model: where source control lives, how much governance the organization needs, how much delivery complexity exists beyond basic CI, and whether the team wants a repository-centric workflow or a broader ALM-style platform.',
    ],
  },
  {
    title: 'When GitHub Actions Fits Better',
    paragraphs: [
      'GitHub Actions is often the better choice when the code already lives in GitHub and the team wants automation close to pull requests, issues, branch protection, and the repository event model. Developers can keep workflow definitions in the repo, review them in the same place as application code, and connect CI directly to normal code review habits.',
      'It is especially strong for teams that value fast setup, straightforward repository-local automation, and a large marketplace of reusable actions. For many application teams, it is the most natural extension of the GitHub development loop: push code, open a pull request, run checks, publish artifacts, and trigger deployment jobs from the same platform surface.',
      'GitHub Actions also fits organizations with strong GitHub adoption, open-source adjacency, or multiple product teams that want a low-friction CI and CD layer without onboarding a separate, more operations-heavy delivery platform.',
    ],
  },
  {
    title: 'When Azure DevOps Fits Better',
    paragraphs: [
      'Azure DevOps is often the stronger choice when delivery needs extend beyond simple repository-triggered automation into enterprise process management, controlled deployments, approvals, environment governance, artifact flows, and integrated planning surfaces. It is designed to operate as more than just a workflow runner.',
      'It is a strong fit for organizations already invested in Microsoft infrastructure, Azure tenancy, enterprise identity controls, or legacy release-management processes that need stronger separation between build stages, deployment stages, approvals, and environment ownership. Its pipeline model can serve complex enterprise workflows well when release governance is not optional.',
      'Azure DevOps is also attractive when the organization wants one platform spanning work tracking, source control, builds, releases, package feeds, and test-related processes, especially in environments where operational standardization matters more than the developer simplicity of repo-local automation.',
    ],
  },
  {
    title: 'Tradeoffs and Decision Drivers',
    paragraphs: [
      'GitHub Actions usually optimizes for developer proximity, repository-native automation, and ease of adoption. Azure DevOps usually optimizes for broader delivery governance, richer enterprise workflow surfaces, and centralized operational control. That does not make one modern and the other outdated; it means they are strongest under different organizational conditions.',
      'If the main problem is CI close to GitHub code review, GitHub Actions usually feels lighter, faster, and more natural. If the main problem is managing a controlled software delivery process across multiple teams, approvals, environments, artifacts, and enterprise constraints, Azure DevOps often has stronger built-in affordances.',
      'The practical decision should consider source-control location, organizational scale, compliance needs, deployment governance, approval paths, self-hosted execution requirements, and how much platform complexity the team can realistically sustain. Tool choice here is less about syntax and more about operational fit.',
    ],
  },
]

const conceptSections = [
  {
    id: 'core-philosophy',
    title: 'Platform Philosophy',
    paragraphs: [
      'GitHub Actions is built around the idea that automation should live beside the repository and respond naturally to repository events. Workflows are usually triggered by pushes, pull requests, schedules, tags, releases, or manual dispatch events. This makes the platform feel deeply integrated into day-to-day developer activity.',
      'Azure DevOps approaches delivery as part of a broader lifecycle management system. Pipelines are important, but they sit in a larger platform that also includes boards, artifacts, repos, test-related workflows, and environment-level controls. The result is a platform with more organizational reach and, typically, more administrative surface area.',
      'This philosophical difference matters because it changes the default center of gravity. GitHub Actions usually centers the repository. Azure DevOps usually centers the enterprise delivery process. Teams should pick the platform whose center matches their real workflow rather than trying to bend the workflow around tool prestige.',
    ],
  },
  {
    id: 'core-pipelines',
    title: 'Pipeline Model and YAML',
    paragraphs: [
      'GitHub Actions defines workflows in YAML files under the repository, typically in a dedicated workflows directory. Jobs, steps, matrices, reusable workflows, and marketplace actions combine into a model that is easy to grasp for repository-local automation. The syntax is event-driven and tends to feel compact for standard CI tasks.',
      'Azure DevOps also supports YAML pipelines, but the conceptual model often emphasizes stages, jobs, environments, service connections, approvals, and enterprise delivery semantics more strongly. Teams can express straightforward CI in Azure DevOps, but its model becomes especially valuable when pipeline design must reflect broader release processes.',
      'In practice, GitHub Actions often feels faster for lightweight build-and-test automation, while Azure DevOps often feels stronger when a pipeline needs to map cleanly onto organizational release structure, separated environments, and more formal promotion flows.',
    ],
  },
  {
    id: 'core-integration',
    title: 'Repo and Platform Integration',
    paragraphs: [
      'GitHub Actions is naturally strongest when the repository is already in GitHub. Status checks, branch protection, pull request annotations, code scanning, issue-driven automation, release triggers, and repository secrets all live in one developer-facing platform. This makes the feedback loop very direct.',
      'Azure DevOps can integrate with repositories effectively, including Azure Repos and external sources, but the surrounding workflow is usually broader than the repository itself. The advantage is organizational control and multi-surface integration. The tradeoff is that everyday developer interaction may feel less minimal than the GitHub-native loop.',
      'If the repository and review process are already the center of engineering collaboration, GitHub Actions usually compounds that strength. If the organization needs tighter coupling between planning, release administration, environments, artifacts, and enterprise process controls, Azure DevOps may offer a more coherent operating model.',
    ],
  },
  {
    id: 'core-runners',
    title: 'Runners, Agents, and Execution',
    paragraphs: [
      'GitHub Actions runs jobs on GitHub-hosted runners or self-hosted runners. For many teams, GitHub-hosted machines are enough for standard application builds and tests. Self-hosted runners become important when builds require private network access, specialized hardware, custom tooling, or tighter data-control requirements.',
      'Azure DevOps uses Microsoft-hosted agents and self-hosted agents with similar broad goals, but organizations often experience the agent model in a more enterprise-operations context. Agent pools, infrastructure placement, and environment-level responsibilities can become part of the platform strategy more explicitly.',
      'Both platforms can support self-hosted execution, but the more important question is organizational ownership. If CI execution is mostly a developer concern, GitHub Actions often feels simpler. If execution infrastructure is part of a centrally managed delivery platform, Azure DevOps may align better with that operational model.',
    ],
  },
  {
    id: 'core-deployments',
    title: 'Deployments, Releases, and Environments',
    paragraphs: [
      'GitHub Actions can handle deployment pipelines well, especially when environments, secrets, protection rules, and manual approvals are enough to model the release process. For many modern teams, that is sufficient because deployment automation is still primarily repository-driven and CI or CD remains close to the application codebase.',
      'Azure DevOps traditionally shines when deployments involve richer release management concepts: explicit environment promotion, stronger separation between build and release concerns, multi-stage enterprise delivery, controlled approvals, service connections, and more operations-facing deployment ownership. This is one of the most important dividing lines between the platforms.',
      'If deployment is just the last stage of repository automation, GitHub Actions is often enough. If deployment is an organizational process with controlled gates, centralized ownership, and a strong distinction between code integration and release administration, Azure DevOps often gives teams more built-in structure.',
    ],
  },
  {
    id: 'core-security',
    title: 'Security, Permissions, and Governance',
    paragraphs: [
      'GitHub Actions security is closely tied to GitHub permissions, repository secrets, environment protections, workflow permissions, branch protections, and the trust model around actions pulled from external sources. This is workable and often effective, but teams must pay attention to token scopes, reusable workflow trust, and supply-chain hygiene.',
      'Azure DevOps is often chosen in environments where governance needs are more explicit and centrally managed. Service connections, permission boundaries, environment controls, approvals, and organizational administration can align better with companies that already operate under stronger enterprise governance or compliance regimes.',
      'Neither platform is secure by default simply because it is popular. The question is which model matches the organization. GitHub Actions requires disciplined repository-centric security practices. Azure DevOps can better match organizations that need heavier delivery governance, but it also introduces more administrative complexity that must be managed correctly.',
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Extensions and Ecosystem',
    paragraphs: [
      'GitHub Actions benefits from a large marketplace of reusable actions and broad community adoption. Standard tasks such as setting up language runtimes, caching dependencies, publishing packages, building containers, and deploying to cloud targets are usually available quickly. This is one of its biggest practical strengths.',
      'Azure DevOps also supports extensions and integration patterns, especially in Microsoft-heavy environments, but its ecosystem story often feels more enterprise and platform oriented than marketplace-driven developer convenience. It can be very capable, but the experience is often less about grabbing a community action and more about integrating into a broader managed delivery estate.',
      'For small and medium teams, GitHub Actions usually wins on ecosystem approachability. For large enterprises, the better question is often not which marketplace is bigger, but which platform integrates more cleanly with the organization standards, cloud platform, identity model, and release process.',
    ],
  },
  {
    id: 'core-team',
    title: 'Team Fit and Operational Tradeoffs',
    paragraphs: [
      'GitHub Actions tends to fit product teams, platform-light organizations, startups, open-source projects, and engineering groups that want CI and CD to feel like a natural extension of repository workflows. It reduces context switching and often keeps automation legible to developers who already understand the repository.',
      'Azure DevOps tends to fit organizations with stronger enterprise process requirements, Microsoft platform alignment, formal environment governance, or teams that want one broader platform for planning, code, pipelines, artifacts, and release administration. The platform can support sophisticated needs, but it asks teams to absorb more platform structure.',
      'In practice, the decision is rarely about which YAML syntax is nicer. It is about whether the team wants a developer-centered repository automation layer or a broader enterprise delivery system. The right answer depends on organizational structure as much as on technical capability.',
    ],
  },
]

const examples = {
  ci: {
    title: 'CI Workflow Example',
    intro:
      'A simple build-and-test pipeline illustrates the difference in tone between the tools. GitHub Actions expresses CI as repository-triggered workflow jobs. Azure DevOps expresses similar work through pipeline stages and jobs inside a broader pipeline model.',
    githubActionsCode: `name: ci

on:
  pull_request:
  push:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm test
      - run: npm run build`,
    azureDevOpsCode: `trigger:
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
  - script: npm test
  - script: npm run build`,
    notes: [
      'GitHub Actions foregrounds repository events and reusable actions.',
      'Azure DevOps foregrounds the pipeline surface and agent execution model.',
      'Both can express routine CI well, so the distinction is less about raw capability and more about operating context.',
    ],
  },
  deploy: {
    title: 'Deployment Control Example',
    intro:
      'Deployment control is where organizational differences become clearer. GitHub Actions can use protected environments and manual approvals, while Azure DevOps can model stages, environments, and more explicit release controls as part of the platform.',
    githubActionsCode: `jobs:
  deploy:
    needs: build-and-test
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4
      - run: ./deploy.sh`,
    azureDevOpsCode: `stages:
  - stage: Deploy
    jobs:
      - deployment: DeployWeb
        environment: production
        strategy:
          runOnce:
            deploy:
              steps:
                - checkout: self
                - script: ./deploy.sh`,
    notes: [
      'GitHub Actions keeps deployment close to the repository workflow and uses environment-level protections for control.',
      'Azure DevOps makes deployment look more like a first-class release process with stronger stage and environment semantics.',
      'If deployments are heavily governed, Azure DevOps often feels more natural. If deployments are repository-driven and team-owned, GitHub Actions often feels simpler.',
    ],
  },
}

const decisionReference = [
  'Choose GitHub Actions when the code already lives in GitHub and the team wants CI and CD tightly integrated with pull requests, branch protection, and repository workflows.',
  'Choose Azure DevOps when delivery is part of a broader enterprise process involving approvals, environment governance, artifacts, planning surfaces, or stronger Microsoft-platform alignment.',
  'Choose based on the real operating model: repo-centric developer automation versus broader enterprise delivery management.',
  'Choose the platform your team can administer clearly and safely over time, not just the one with the shortest getting-started path.',
]

const glossary = [
  {
    term: 'Workflow',
    definition:
      'A GitHub Actions automation definition made of jobs and steps that runs in response to repository events or manual triggers.',
  },
  {
    term: 'Pipeline',
    definition:
      'A defined software-delivery process that automates build, test, packaging, and deployment stages.',
  },
  {
    term: 'Runner',
    definition:
      'A GitHub Actions execution machine, hosted by GitHub or managed by the user, that runs workflow jobs.',
  },
  {
    term: 'Agent',
    definition:
      'An Azure DevOps execution machine, hosted or self-managed, that runs pipeline jobs.',
  },
  {
    term: 'Environment',
    definition:
      'A deployment target or logical deployment boundary that can have protections, approvals, and deployment history.',
  },
  {
    term: 'Service connection',
    definition:
      'An Azure DevOps integration object used to authenticate pipelines against external platforms such as Azure or other services.',
  },
  {
    term: 'Marketplace action',
    definition:
      'A reusable GitHub Actions component published for common workflow tasks such as setup, caching, packaging, or deployment.',
  },
  {
    term: 'Approval gate',
    definition:
      'A control point that requires explicit review or policy satisfaction before a pipeline can continue into a protected stage or environment.',
  },
]

export default function GitHubActionsVsAzureDevOpsPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'GitHub Actions vs Azure DevOps',
    defaultTab: 'big-picture',
  })
  return (
    <TopicPageShell
      title="GitHub Actions vs Azure DevOps"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">GitHub Actions vs Azure DevOps</h1>
      <p className="gha-azdo-help-intro">
        This page compares two software delivery platforms across the dimensions that usually matter
        in real engineering decisions: repository integration, pipeline model, deployment control,
        approvals, governance, execution infrastructure, ecosystem, team fit, and long-term
        operational tradeoffs.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            {bigPictureSections[0]?.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-when-actions-fits" className="bin98-section">
            <h2 className="bin98-heading">When GitHub Actions Fits Better</h2>
            {bigPictureSections[1]?.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-when-azdo-fits" className="bin98-section">
            <h2 className="bin98-heading">When Azure DevOps Fits Better</h2>
            {bigPictureSections[2]?.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-tradeoffs" className="bin98-section">
            <h2 className="bin98-heading">Tradeoffs and Decision Drivers</h2>
            {bigPictureSections[3]?.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        </>
      )}

      {activeTab === 'core-concepts' && (
        <>
          {conceptSections.map((section, index) => (
            <section key={section.id} id={section.id} className="bin98-section">
              <h2 className="bin98-heading">{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {index < conceptSections.length - 1 ? <hr className="bin98-divider" /> : null}
            </section>
          ))}
        </>
      )}

      {activeTab === 'examples' && (
        <>
          <section id="ex-ci" className="bin98-section">
            <h2 className="bin98-heading">{examples.ci.title}</h2>
            <p>{examples.ci.intro}</p>
            <h3 className="bin98-subheading">GitHub Actions</h3>
            <div className="bin98-codebox">
              <code>{examples.ci.githubActionsCode}</code>
            </div>
            <h3 className="bin98-subheading">Azure DevOps</h3>
            <div className="bin98-codebox">
              <code>{examples.ci.azureDevOpsCode}</code>
            </div>
            <ul>
              {examples.ci.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </section>
          <hr className="bin98-divider" />
          <section id="ex-deploy" className="bin98-section">
            <h2 className="bin98-heading">{examples.deploy.title}</h2>
            <p>{examples.deploy.intro}</p>
            <h3 className="bin98-subheading">GitHub Actions</h3>
            <div className="bin98-codebox">
              <code>{examples.deploy.githubActionsCode}</code>
            </div>
            <h3 className="bin98-subheading">Azure DevOps</h3>
            <div className="bin98-codebox">
              <code>{examples.deploy.azureDevOpsCode}</code>
            </div>
            <ul>
              {examples.deploy.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </section>
          <hr className="bin98-divider" />
          <section id="ex-reference" className="bin98-section">
            <h2 className="bin98-heading">Decision Reference</h2>
            <p>
              Use this summary when the platform comparison needs to become a practical tooling
              choice for a real delivery organization.
            </p>
            <ul>
              {decisionReference.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {activeTab === 'glossary' && (
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {glossary.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
