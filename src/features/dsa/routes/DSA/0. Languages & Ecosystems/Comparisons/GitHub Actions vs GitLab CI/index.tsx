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
    { id: 'bp-when-gitlab-fits', label: 'When GitLab CI Fits Better' },
    { id: 'bp-tradeoffs', label: 'Tradeoffs and Decision Drivers' },
  ],
  'core-concepts': [
    { id: 'core-philosophy', label: 'Platform Philosophy' },
    { id: 'core-pipelines', label: 'Pipeline Model and YAML' },
    { id: 'core-repo', label: 'Repository and Platform Integration' },
    { id: 'core-runners', label: 'Runners and Execution Model' },
    { id: 'core-security', label: 'Security and DevSecOps Workflow' },
    { id: 'core-deployments', label: 'Deployments and Environments' },
    { id: 'core-ecosystem', label: 'Ecosystem and Extensibility' },
    { id: 'core-team', label: 'Team Fit and Operational Tradeoffs' },
  ],
  examples: [
    { id: 'ex-ci', label: 'CI Workflow Example' },
    { id: 'ex-deploy', label: 'Deployment Example' },
    { id: 'ex-reference', label: 'Decision Reference' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

const bigPictureSections = [
  {
    title: 'Overview',
    paragraphs: [
      'GitHub Actions and GitLab CI both automate build, test, packaging, and deployment workflows, but they sit inside two different platform strategies. GitHub Actions extends the GitHub repository and pull request model with automation, while GitLab CI is part of a broader GitLab platform that treats source control, CI, security, and delivery as one integrated DevSecOps surface.',
      'That difference changes how teams experience the tools. GitHub Actions often feels like lightweight repository-native automation that happens to be powerful. GitLab CI often feels like a pipeline system inside a broader product that wants the whole development and delivery lifecycle to live in one platform.',
      'Both are capable, mature, and widely used. The practical comparison is usually about operating model: whether the team wants automation centered on GitHub repository events and marketplace actions, or a more integrated GitLab workflow where pipelines, stages, environments, artifacts, and security scanning are tightly coupled to the wider platform.',
    ],
  },
  {
    title: 'When GitHub Actions Fits Better',
    paragraphs: [
      'GitHub Actions is often the better choice when the code already lives in GitHub and the team wants CI and CD to be an almost invisible extension of normal repository work. Developers can keep workflow files next to application code, connect them directly to pull requests and branch protection, and use a large ecosystem of reusable actions without adopting a bigger platform model.',
      'It is especially strong for teams that want fast setup, familiar repository-driven triggers, and a low-friction path from code review to automation. For many application teams, that simplicity is a major advantage because delivery automation becomes part of the same development surface they already use every day.',
      'GitHub Actions also fits organizations that value GitHub ecosystem alignment, open-source familiarity, and a workflow model where the repository remains the center of engineering activity rather than one component inside a larger platform suite.',
    ],
  },
  {
    title: 'When GitLab CI Fits Better',
    paragraphs: [
      'GitLab CI is often the stronger choice when the team wants a more integrated DevOps or DevSecOps platform and is comfortable letting the platform own more of the workflow. GitLab CI is not just a pipeline runner. It lives inside a system that also emphasizes merge requests, package registries, environments, security scanning, and broader delivery visibility.',
      'It is a strong fit for teams that want pipelines, artifacts, deployment controls, security features, and repository workflows to feel like one cohesive product rather than a set of loosely combined capabilities. This can be especially attractive in organizations standardizing on GitLab as the central engineering platform.',
      'GitLab CI also tends to fit teams that value stage-based pipelines, integrated runner management, and a platform posture where code, CI, security, and deployment workflow are meant to reinforce one another rather than be assembled from several tools.',
    ],
  },
  {
    title: 'Tradeoffs and Decision Drivers',
    paragraphs: [
      'GitHub Actions usually optimizes for repository-native automation, developer convenience, and ecosystem breadth through reusable actions. GitLab CI usually optimizes for integrated platform workflow, stronger built-in delivery structure, and a broader DevSecOps story. Neither orientation is inherently superior, but they solve different organizational preferences.',
      'If the main goal is to automate what already happens in GitHub with minimal extra platform weight, GitHub Actions usually feels more natural. If the main goal is to use one platform for repository workflow, pipelines, environments, and security-related delivery practices, GitLab CI often feels more coherent.',
      'The practical decision should account for repository location, platform standardization, security workflow expectations, runner strategy, deployment governance, and how much the team values a marketplace-driven model versus a more tightly integrated platform surface.',
    ],
  },
]

const conceptSections = [
  {
    id: 'core-philosophy',
    title: 'Platform Philosophy',
    paragraphs: [
      'GitHub Actions is built around the repository event model. Workflows respond to pushes, pull requests, schedules, tags, releases, and manual triggers, which makes automation feel like a direct extension of source control and code review activity.',
      'GitLab CI is built around the idea that the pipeline is part of a larger integrated delivery platform. The pipeline does not stand alone. It sits alongside merge requests, package and artifact flows, environments, security features, and broader GitLab process tooling.',
      'This difference matters because it changes what the team expects from the platform. GitHub Actions usually starts with the repository and adds automation. GitLab CI usually starts with an integrated platform and expects CI to participate in that wider system.',
    ],
  },
  {
    id: 'core-pipelines',
    title: 'Pipeline Model and YAML',
    paragraphs: [
      'GitHub Actions workflows are defined in repository YAML files and organized around jobs, steps, matrices, and reusable workflows. The syntax is event-oriented, and the model is easy to understand for routine CI, packaging, and deployment automation.',
      'GitLab CI uses a single pipeline YAML model centered around stages, jobs, rules, artifacts, needs, and environment-related constructs. For teams that like stage-oriented pipelines and a delivery model that reads like a structured release flow, GitLab CI can feel especially coherent.',
      'In practice, GitHub Actions often feels faster for repository-local automation and composability through actions, while GitLab CI often feels stronger when the team wants a more uniform pipeline language that ties naturally into GitLab environments, artifacts, and platform-level workflow features.',
    ],
  },
  {
    id: 'core-repo',
    title: 'Repository and Platform Integration',
    paragraphs: [
      'GitHub Actions is naturally strongest when the repository and pull request process already live in GitHub. Status checks, code review feedback, branch protections, and repository secrets are all close to the workflow surface, so the loop from change to validation is very direct.',
      'GitLab CI is strongest when the repository is already in GitLab and the team wants merge requests, pipelines, artifacts, environments, and related platform features to behave as one system. The platform feels less like a repo with automation added on and more like an integrated delivery workspace.',
      'If the repository is the primary center of engineering collaboration, GitHub Actions has a clear ergonomic advantage inside GitHub. If the organization wants repository workflow to be one part of a wider GitLab operating model, GitLab CI often feels more complete.',
    ],
  },
  {
    id: 'core-runners',
    title: 'Runners and Execution Model',
    paragraphs: [
      'GitHub Actions runs jobs on GitHub-hosted runners or self-hosted runners. This works well for teams that want a straightforward hosted experience with the option to bring execution in-house when builds need private networking, custom dependencies, or special hardware.',
      'GitLab CI uses GitLab runners, which can also be hosted or self-managed. Runner registration, tagging, executor choices, and organizational runner patterns are central to how GitLab CI scales across teams and projects.',
      'Both platforms support self-hosted execution, but the experience is framed differently. GitHub Actions usually treats runners as a way to extend repository automation. GitLab CI often treats runners as a first-class operational layer inside the broader platform model.',
    ],
  },
  {
    id: 'core-security',
    title: 'Security and DevSecOps Workflow',
    paragraphs: [
      'GitHub Actions security depends on repository permissions, environment protections, secret management, workflow token scopes, and careful control over third-party actions. It can be very effective, but teams need to actively manage trust boundaries and supply-chain assumptions.',
      'GitLab CI is often attractive to teams that want security tooling and delivery workflow to feel more integrated. GitLab has long emphasized security scanning and DevSecOps positioning, which can be useful when the organization wants security signals to be closer to the pipeline and platform workflow rather than bolted on externally.',
      'The real question is not which platform has the more impressive marketing language around security. It is which security operating model matches the organization. GitHub Actions works well with disciplined repository-centric governance. GitLab CI can be attractive when the team wants a more built-in platform relationship between code, pipeline, and security practices.',
    ],
  },
  {
    id: 'core-deployments',
    title: 'Deployments and Environments',
    paragraphs: [
      'GitHub Actions can model deployments effectively through environments, secrets, protected branches, reusable workflows, and approval-oriented patterns. For many teams, especially repository-centric application teams, that is enough to support reliable deployment automation.',
      'GitLab CI often feels stronger when deployments are treated as a more explicit part of the pipeline lifecycle. Stages, environments, artifacts, and deployment patterns align naturally with the wider GitLab platform, which can make delivery feel more structured and visible.',
      'If deployment is just another repository automation step, GitHub Actions often feels simpler. If deployment is part of a more integrated platform workflow with broader visibility and environment semantics, GitLab CI often feels more native.',
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Ecosystem and Extensibility',
    paragraphs: [
      'GitHub Actions has a major advantage in marketplace breadth and ease of reuse. Teams can adopt community and vendor actions quickly for setup, caching, builds, artifact publishing, cloud deployment, and many language-specific tasks. This dramatically lowers the friction for common automation patterns.',
      'GitLab CI is extensible too, but its appeal is usually less about a giant marketplace and more about the power of an integrated platform. Teams often get leverage from having fewer platform boundaries rather than from composing a large catalog of external workflow components.',
      'For teams that value composability and speed through reusable building blocks, GitHub Actions usually feels lighter. For teams that value platform cohesion over marketplace-style reuse, GitLab CI can feel more predictable.',
    ],
  },
  {
    id: 'core-team',
    title: 'Team Fit and Operational Tradeoffs',
    paragraphs: [
      'GitHub Actions tends to fit product teams, open-source-heavy organizations, and engineering groups that already live inside GitHub and want CI to feel like part of everyday repository work. It lowers the barrier to adoption and keeps automation close to code review.',
      'GitLab CI tends to fit teams and organizations that want to standardize more of the development and delivery lifecycle on GitLab, including pipelines, environments, artifacts, and security-related workflows. It can be especially effective when the organization values platform cohesion over best-of-breed assembly.',
      'In practice, this decision is as organizational as it is technical. The better choice depends on whether the team wants a repository-first automation layer or a more fully integrated platform approach to CI and delivery.',
    ],
  },
]

const examples = {
  ci: {
    title: 'CI Workflow Example',
    intro:
      'A basic build-and-test workflow shows the stylistic difference between the platforms. GitHub Actions expresses the workflow as jobs triggered by repository events, while GitLab CI expresses it as staged jobs inside the pipeline definition.',
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
    gitLabCiCode: `stages:
  - test
  - build

test:
  image: node:20
  stage: test
  script:
    - npm ci
    - npm test

build:
  image: node:20
  stage: build
  script:
    - npm ci
    - npm run build`,
    notes: [
      'GitHub Actions foregrounds event triggers and reusable actions.',
      'GitLab CI foregrounds stages, jobs, and a pipeline-oriented delivery structure.',
      'Both can express routine CI well, so the real difference is the surrounding platform model.',
    ],
  },
  deploy: {
    title: 'Deployment Example',
    intro:
      'Deployment workflows highlight how the platforms frame environments and delivery progression. GitHub Actions keeps deployment close to repository automation, while GitLab CI often makes deployments feel like a natural extension of staged pipelines and environment tracking.',
    githubActionsCode: `jobs:
  deploy:
    needs: build-and-test
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4
      - run: ./deploy.sh`,
    gitLabCiCode: `deploy_production:
  stage: deploy
  script:
    - ./deploy.sh
  environment:
    name: production
  when: manual`,
    notes: [
      'GitHub Actions uses repository environments and workflow protections to control deployment flow.',
      'GitLab CI treats deployment as part of the stage and environment model built into the platform.',
      'If the team prefers repository-first CD, GitHub Actions feels lighter. If it prefers a more integrated pipeline progression, GitLab CI often feels stronger.',
    ],
  },
}

const decisionReference = [
  'Choose GitHub Actions when the code already lives in GitHub and the team wants CI and CD tightly integrated with pull requests, branch protection, and repository events.',
  'Choose GitLab CI when the team wants pipelines to live inside a broader GitLab platform workflow spanning repository work, environments, artifacts, and security-related delivery practices.',
  'Choose based on the real operating model: GitHub-centered repository automation versus a more integrated GitLab platform workflow.',
  'Choose the platform the team can administer, secure, and scale clearly over time rather than the one that only looks simpler in a toy example.',
]

const glossary = [
  {
    term: 'Workflow',
    definition:
      'A GitHub Actions automation definition made of jobs and steps triggered by repository events or manual dispatch.',
  },
  {
    term: 'Pipeline',
    definition:
      'A delivery process definition that automates build, test, packaging, and deployment steps.',
  },
  {
    term: 'Runner',
    definition:
      'An execution machine used by GitHub Actions or GitLab CI to run jobs, hosted by the platform or managed by the user.',
  },
  {
    term: 'Stage',
    definition:
      'A GitLab CI grouping mechanism that orders pipeline work into phases such as test, build, and deploy.',
  },
  {
    term: 'Environment',
    definition:
      'A deployment target or logical deployment space tracked by the platform for release and delivery workflows.',
  },
  {
    term: 'Reusable action',
    definition:
      'A packaged GitHub Actions workflow component that can be used to perform common automation tasks.',
  },
  {
    term: 'Artifact',
    definition:
      'A build output or intermediate result stored and passed between pipeline jobs or retained for later use.',
  },
  {
    term: 'DevSecOps',
    definition:
      'An approach that integrates security practices directly into the software delivery workflow rather than treating them as a separate final-stage concern.',
  },
]

export default function GitHubActionsVsGitLabCIPage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'GitHub Actions vs GitLab CI',
    defaultTab: 'big-picture',
  })
  return (
    <TopicPageShell
      title="GitHub Actions vs GitLab CI"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">GitHub Actions vs GitLab CI</h1>
      <p className="gha-glci-help-intro">
        This page compares two CI and delivery platforms across the dimensions that usually matter
        in real engineering decisions: repository integration, pipeline model, runner strategy,
        security workflow, deployment semantics, ecosystem, team fit, and long-term operational
        tradeoffs.
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
          <section id="bp-when-gitlab-fits" className="bin98-section">
            <h2 className="bin98-heading">When GitLab CI Fits Better</h2>
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
            <h3 className="bin98-subheading">GitLab CI</h3>
            <div className="bin98-codebox">
              <code>{examples.ci.gitLabCiCode}</code>
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
            <h3 className="bin98-subheading">GitLab CI</h3>
            <div className="bin98-codebox">
              <code>{examples.deploy.gitLabCiCode}</code>
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
              choice for a real engineering team.
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
