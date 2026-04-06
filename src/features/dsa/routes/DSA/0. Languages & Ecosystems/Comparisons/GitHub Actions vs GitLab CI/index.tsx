import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

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

const helpStyles = `
.gha-glci-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.gha-glci-help-window {
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

.gha-glci-help-titlebar {
  position: relative;
  min-height: 24px;
  padding: 2px 4px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #ffffff;
}

.gha-glci-help-title {
  position: absolute;
  inset: 0 52px 0 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  line-height: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  pointer-events: none;
}

.gha-glci-help-controls {
  display: flex;
  gap: 2px;
}

.gha-glci-help-control {
  width: 18px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000000;
  text-decoration: none;
  font-family: inherit;
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
  cursor: pointer;
}

.gha-glci-help-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
}

.gha-glci-help-tab {
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  color: #000000;
  padding: 5px 10px 4px;
  font-family: inherit;
  font-size: 12px;
  cursor: pointer;
}

.gha-glci-help-tab[aria-selected="true"] {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.gha-glci-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 230px 1fr;
  border-top: 1px solid #404040;
  background: #ffffff;
}

.gha-glci-help-toc {
  padding: 12px;
  background: #efefef;
  border-right: 1px solid #808080;
  overflow: auto;
}

.gha-glci-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.gha-glci-help-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.gha-glci-help-toc-item + .gha-glci-help-toc-item {
  margin-top: 8px;
}

.gha-glci-help-toc-link {
  color: #000000;
  font-size: 12px;
  line-height: 1.4;
  text-decoration: none;
}

.gha-glci-help-content {
  padding: 14px 20px 20px;
  overflow: auto;
}

.gha-glci-help-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.15;
}

.gha-glci-help-intro {
  margin: 0 0 14px;
  font-size: 12px;
  line-height: 1.55;
}

.gha-glci-help-section {
  margin: 0 0 22px;
}

.gha-glci-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.gha-glci-help-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.gha-glci-help-content p,
.gha-glci-help-content li {
  font-size: 12px;
  line-height: 1.55;
}

.gha-glci-help-content p {
  margin: 0 0 10px;
}

.gha-glci-help-content ul {
  margin: 0 0 10px 18px;
  padding: 0;
}

.gha-glci-help-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.gha-glci-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.gha-glci-help-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  line-height: 1.45;
}

@media (max-width: 900px) {
  .gha-glci-help-main {
    grid-template-columns: 1fr;
  }

  .gha-glci-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .gha-glci-help-content {
    padding: 14px 14px 18px;
  }
}
`

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

export default function GitHubActionsVsGitLabCIPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const rawTab = searchParams.get('tab')
  const activeTab: TabId = isTabId(rawTab) ? rawTab : 'big-picture'
  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'
  const currentSections = sectionLinks[activeTab]

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }

    document.title = `GitHub Actions vs GitLab CI (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleTabChange = (tabId: TabId) => {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('tab', tabId)
    setSearchParams(nextParams, { replace: false })
  }

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'GitHub Actions vs GitLab CI',
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
    <div className="gha-glci-help-page">
      <style>{helpStyles}</style>
      <div className="gha-glci-help-window" role="presentation">
        <header className="gha-glci-help-titlebar">
          <span className="gha-glci-help-title">GitHub Actions vs GitLab CI</span>
          <div className="gha-glci-help-controls">
            <button
              type="button"
              className="gha-glci-help-control"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="gha-glci-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="gha-glci-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              className="gha-glci-help-tab"
              aria-selected={activeTab === tab.id}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="gha-glci-help-main">
          <aside className="gha-glci-help-toc" aria-label="Table of contents">
            <h2 className="gha-glci-help-toc-title">Contents</h2>
            <ul className="gha-glci-help-toc-list">
              {currentSections.map((section) => (
                <li key={section.id} className="gha-glci-help-toc-item">
                  <a className="gha-glci-help-toc-link" href={`#${section.id}`}>
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="gha-glci-help-content">
            <h1 className="gha-glci-help-doc-title">GitHub Actions vs GitLab CI</h1>
            <p className="gha-glci-help-intro">
              This page compares two CI and delivery platforms across the dimensions that usually matter in real engineering
              decisions: repository integration, pipeline model, runner strategy, security workflow, deployment semantics,
              ecosystem, team fit, and long-term operational tradeoffs.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="gha-glci-help-section">
                  <h2 className="gha-glci-help-heading">Overview</h2>
                  {bigPictureSections[0]?.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </section>
                <hr className="gha-glci-help-divider" />
                <section id="bp-when-actions-fits" className="gha-glci-help-section">
                  <h2 className="gha-glci-help-heading">When GitHub Actions Fits Better</h2>
                  {bigPictureSections[1]?.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </section>
                <hr className="gha-glci-help-divider" />
                <section id="bp-when-gitlab-fits" className="gha-glci-help-section">
                  <h2 className="gha-glci-help-heading">When GitLab CI Fits Better</h2>
                  {bigPictureSections[2]?.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </section>
                <hr className="gha-glci-help-divider" />
                <section id="bp-tradeoffs" className="gha-glci-help-section">
                  <h2 className="gha-glci-help-heading">Tradeoffs and Decision Drivers</h2>
                  {bigPictureSections[3]?.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                {conceptSections.map((section, index) => (
                  <section key={section.id} id={section.id} className="gha-glci-help-section">
                    <h2 className="gha-glci-help-heading">{section.title}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {index < conceptSections.length - 1 ? <hr className="gha-glci-help-divider" /> : null}
                  </section>
                ))}
              </>
            )}

            {activeTab === 'examples' && (
              <>
                <section id="ex-ci" className="gha-glci-help-section">
                  <h2 className="gha-glci-help-heading">{examples.ci.title}</h2>
                  <p>{examples.ci.intro}</p>
                  <h3 className="gha-glci-help-subheading">GitHub Actions</h3>
                  <div className="gha-glci-help-codebox">
                    <code>{examples.ci.githubActionsCode}</code>
                  </div>
                  <h3 className="gha-glci-help-subheading">GitLab CI</h3>
                  <div className="gha-glci-help-codebox">
                    <code>{examples.ci.gitLabCiCode}</code>
                  </div>
                  <ul>
                    {examples.ci.notes.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                </section>
                <hr className="gha-glci-help-divider" />
                <section id="ex-deploy" className="gha-glci-help-section">
                  <h2 className="gha-glci-help-heading">{examples.deploy.title}</h2>
                  <p>{examples.deploy.intro}</p>
                  <h3 className="gha-glci-help-subheading">GitHub Actions</h3>
                  <div className="gha-glci-help-codebox">
                    <code>{examples.deploy.githubActionsCode}</code>
                  </div>
                  <h3 className="gha-glci-help-subheading">GitLab CI</h3>
                  <div className="gha-glci-help-codebox">
                    <code>{examples.deploy.gitLabCiCode}</code>
                  </div>
                  <ul>
                    {examples.deploy.notes.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                </section>
                <hr className="gha-glci-help-divider" />
                <section id="ex-reference" className="gha-glci-help-section">
                  <h2 className="gha-glci-help-heading">Decision Reference</h2>
                  <p>
                    Use this summary when the platform comparison needs to become a practical tooling choice for a real
                    engineering team.
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
              <section id="glossary-terms" className="gha-glci-help-section">
                <h2 className="gha-glci-help-heading">Glossary</h2>
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
