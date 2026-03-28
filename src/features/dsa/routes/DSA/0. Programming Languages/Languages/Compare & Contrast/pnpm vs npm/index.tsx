import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

type SectionLink = {
  id: string
  label: string
}

type ContentSection = {
  id: string
  title: string
  paragraphs: string[]
  bullets?: string[]
}

type ExampleSection = {
  id: string
  title: string
  description: string[]
  code: string
  notes: string[]
}

type GlossarySection = {
  id: string
  title: string
  terms: Array<{
    term: string
    definition: string
  }>
}

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const introParagraphs = [
  'pnpm and npm solve the same broad problem: installing, resolving, and managing JavaScript or TypeScript packages. They both work with the npm registry, `package.json`, semantic versioning, scripts, lockfiles, and standard Node.js project workflows. The real comparison is not whether one is a package manager and the other is not. The real comparison is how they represent dependencies on disk, how strict they are about dependency access, how they behave in monorepos, and what tradeoffs they introduce for speed, disk usage, compatibility, and team discipline.',
  'npm is the default package manager that ships with Node.js and therefore has the strongest baseline familiarity. pnpm is a separate package manager that has gained popularity because of its efficient content-addressable store, fast installs, and stricter dependency model. In practice, the choice often comes down to whether the team values broad default compatibility and lowest-friction onboarding, or values deterministic workspace behavior, better disk efficiency, and stricter dependency hygiene.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'npm is the standard package manager most JavaScript developers encounter first. It is tightly associated with the Node.js ecosystem, ships with Node, and is the reference baseline for many tutorials, starter templates, and CI environments. That makes it the least surprising option for many teams.',
      'pnpm is an alternative package manager designed to improve install efficiency and dependency correctness. It stores packages in a global content-addressable store and links them into projects instead of copying everything into a flat `node_modules` layout. This often reduces disk usage and can make workspace behavior more disciplined, especially in larger repositories.',
    ],
  },
  {
    id: 'bp-core-difference',
    title: 'The Core Difference',
    paragraphs: [
      'The core practical difference is how dependencies are installed and exposed. npm historically optimized for a flatter and more permissive dependency layout, which made many tools work easily but also allowed accidental reliance on transitive packages that were not explicitly declared.',
      'pnpm is stricter. Its linking model is designed so packages generally only see the dependencies they actually declare. That catches dependency mistakes earlier and improves correctness, but it can expose assumptions in tools or scripts that were written against looser package-manager behavior.',
    ],
    bullets: [
      'npm optimizes for default familiarity and broad compatibility.',
      'pnpm optimizes for efficient storage and stricter dependency boundaries.',
      'npm is usually the easiest zero-friction default.',
      'pnpm is often the better long-term choice for disciplined workspaces and monorepos.',
    ],
  },
  {
    id: 'bp-when-npm-fits',
    title: 'When npm Is Usually the Better Fit',
    paragraphs: [
      'npm is usually the better fit when the team wants the default tool that comes with Node.js, values lowest onboarding friction, and does not need advanced workspace behavior beyond what npm already provides. It is also a reasonable choice for smaller repositories where install performance and disk efficiency are not significant pain points.',
      'It remains strong when compatibility and predictability across many external examples matter more than extracting every operational advantage from the package manager.',
    ],
    bullets: [
      'Small to medium projects with simple dependency graphs.',
      'Teams that want the default Node.js toolchain with minimal extra decisions.',
      'Environments where broad ecosystem familiarity matters most.',
      'Projects where existing docs, scripts, and CI already assume npm.',
    ],
  },
  {
    id: 'bp-when-pnpm-fits',
    title: 'When pnpm Is Usually the Better Fit',
    paragraphs: [
      'pnpm is usually the better fit when the repository is large, workspace-heavy, or sensitive to install speed and disk duplication. It is especially attractive in monorepos where many packages share overlapping dependencies and where stricter dependency access helps keep boundaries honest.',
      'It is also a strong choice for teams that want package management to enforce better discipline. pnpm tends to surface dependency declaration problems that looser setups can hide.',
    ],
    bullets: [
      'Large repositories or monorepos with many packages.',
      'Teams that care about faster repeat installs and lower disk use.',
      'Workspaces that benefit from strict dependency visibility.',
      'Organizations willing to adopt a non-default but widely used tool.',
    ],
  },
  {
    id: 'bp-ecosystem-reality',
    title: 'Ecosystem Reality',
    paragraphs: [
      'Most modern JavaScript tooling works with both npm and pnpm, especially mainstream frameworks and bundlers. The important detail is not whether support exists in the abstract, but whether a specific stack, internal tool, or legacy script was written with hidden assumptions about install layout.',
      'That is why teams should validate package-manager choice against their actual repository and workflows. A package manager becomes part of the development platform, not just a command used once per day.',
    ],
  },
  {
    id: 'bp-decision-checklist',
    title: 'Decision Checklist',
    paragraphs: [
      'The most useful way to choose is to ask whether package management is currently a source of pain. If installs are slow, workspaces are messy, and transitive dependency leakage causes surprises, pnpm often creates real value. If the current priority is simplicity and near-universal familiarity, npm is often enough.',
    ],
    bullets: [
      'Choose npm for the simplest default path.',
      'Choose pnpm for stronger workspace discipline and install efficiency.',
      'Test the choice against your real repository, not just toy examples.',
      'Standardize one package manager per repo to avoid lockfile churn and tooling confusion.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-install-model',
    title: 'Install Model',
    paragraphs: [
      'npm installs packages into `node_modules` using a layout that aims to make dependency resolution straightforward for Node and tooling. Modern npm has improved a lot over time, but its mental model still feels like the standard baseline most developers expect.',
      'pnpm installs packages into a global content-addressable store and links them into the project. This means identical package versions can be reused efficiently across many projects. The resulting layout is more space-efficient and often faster after the initial store is populated.',
    ],
  },
  {
    id: 'core-strictness',
    title: 'Dependency Strictness',
    paragraphs: [
      'One of pnpm’s most important characteristics is that it tends to prevent packages from casually reaching undeclared dependencies. That is useful because it aligns runtime access more closely with what the manifest actually says.',
      'npm has historically been more permissive because of hoisting and flatter install structures. That permissiveness can reduce friction in the short term, but it can also hide weak dependency hygiene. The team may not notice a problem until the layout changes, a tool upgrades, or a different environment resolves dependencies slightly differently.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance and Disk Usage',
    paragraphs: [
      'pnpm is often chosen first for performance and storage efficiency. By reusing packages from a central store instead of duplicating them broadly, it can substantially reduce disk usage across many repositories and improve repeated install times.',
      'npm performance has improved significantly and is often perfectly adequate for typical projects. The difference becomes more noticeable as repository size, workspace count, and dependency overlap increase.',
    ],
  },
  {
    id: 'core-monorepos',
    title: 'Monorepo and Workspace Behavior',
    paragraphs: [
      'npm supports workspaces and is capable for many monorepo cases, especially modest ones. If the repository is not extremely large or operationally complex, npm workspaces may be enough.',
      'pnpm is especially strong in monorepos because its workspace model and shared store fit large multi-package repositories well. Teams often choose it because it keeps installs efficient and encourages explicit dependency relationships across internal packages.',
    ],
  },
  {
    id: 'core-lockfiles',
    title: 'Lockfiles and Reproducibility',
    paragraphs: [
      'Both npm and pnpm support lockfiles to make installations reproducible. npm uses `package-lock.json`, while pnpm uses `pnpm-lock.yaml`. In both cases, the lockfile becomes part of the repository contract and should be committed consistently.',
      'The important operational point is that teams should not mix package managers casually in the same repo. Doing so leads to lockfile churn, confusing CI behavior, and uncertainty about which install model is authoritative.',
    ],
  },
  {
    id: 'core-compatibility',
    title: 'Tooling Compatibility',
    paragraphs: [
      'npm has the advantage of being the default assumption in much ecosystem documentation. That matters because every extra instruction adds onboarding cost. A new developer who sees `npm install` in every example immediately understands the path.',
      'pnpm works well with most mainstream tools, but it occasionally reveals packages or scripts that relied on npm-like hoisting behavior. Those cases are usually solvable, but they are real migration friction and should be treated as engineering work rather than hand-waved away.',
    ],
  },
  {
    id: 'core-ci',
    title: 'CI and Team Standardization',
    paragraphs: [
      'In CI, either tool can be used well if the pipeline is explicit and consistent. The bigger risk is inconsistency between developer machines and automation. Once a repo chooses a package manager, local development, CI, and deployment tooling should all follow that same choice.',
      'pnpm sometimes benefits more noticeably from cache strategy because of its store model. npm also benefits from caching, but the operational patterns differ. Teams should encode those patterns clearly in CI rather than relying on tribal knowledge.',
    ],
  },
  {
    id: 'core-migration',
    title: 'Migration Cost',
    paragraphs: [
      'Moving from npm to pnpm is usually straightforward for modern projects, but the cost is not zero. Scripts, CI, docs, onboarding notes, workspace assumptions, and any tooling that depends on a specific install layout must be verified.',
      'The right migration question is not whether switching is theoretically possible. It is whether the benefits of speed, disk efficiency, and stricter dependency hygiene justify the work and the small ecosystem adaptation cost.',
    ],
  },
  {
    id: 'core-team-fit',
    title: 'Team Fit',
    paragraphs: [
      'npm fits teams that want the broadest shared baseline and minimal process friction. It is the easier answer when package management is not currently a significant pain point.',
      'pnpm fits teams that are willing to standardize a slightly more opinionated tool in exchange for better long-term discipline, especially in multi-package repositories and organizations with many related projects.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs',
    paragraphs: [
      'npm usually wins on default familiarity, documentation alignment, and least-surprising setup. pnpm usually wins on efficient installs, shared storage, strictness, and workspace ergonomics at scale.',
      'Neither choice is universally correct. The right answer depends on whether the repository is small and simple, or large enough that package-manager behavior becomes a meaningful part of engineering productivity.',
    ],
    bullets: [
      'Choose npm for default simplicity and broad familiarity.',
      'Choose pnpm for efficiency and stronger dependency hygiene.',
      'Prefer one package manager per repository.',
      'Measure migration cost against real pain, not abstract optimization.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-basic-commands',
    title: 'Basic Commands',
    description: [
      'Both tools cover the same basic daily workflows, but the command surface differs slightly.',
    ],
    code: `npm install
npm run build
npm test

pnpm install
pnpm build
pnpm test`,
    notes: [
      'pnpm often lets script names run without `run`, while npm usually uses `npm run <script>`.',
      'For a small project, these differences are minor compared with install model and workspace behavior.',
    ],
  },
  {
    id: 'examples-lockfiles',
    title: 'Lockfile Difference',
    description: [
      'Each package manager has its own lockfile and should own dependency resolution for the repository.',
    ],
    code: `npm  -> package-lock.json
pnpm -> pnpm-lock.yaml`,
    notes: [
      'Do not keep both lockfiles active in the same repo as part of normal workflow.',
      'Choose one and make CI enforce it.',
    ],
  },
  {
    id: 'examples-monorepo-shape',
    title: 'Monorepo Shape',
    description: [
      'Package-manager choice becomes more important as the repository grows into multiple packages.',
    ],
    code: `repo
  packages/
    app-web
    app-api
    shared-ui
    shared-config`,
    notes: [
      'This is the kind of repository where pnpm often creates more noticeable value.',
      'npm can still work, but the benefits of pnpm become easier to justify at this scale.',
    ],
  },
  {
    id: 'examples-decision-frame',
    title: 'Decision Frame Example',
    description: [
      'A practical comparison starts by checking whether the repository is experiencing real package-management pain.',
    ],
    code: `Question 1:
Is onboarding simplicity the main priority?

Question 2:
Is the repo a large workspace or monorepo?

Question 3:
Are install speed, disk use, or dependency leakage causing problems?`,
    notes: [
      'If only the first question matters, npm is often enough.',
      'If the second and third questions are strongly yes, pnpm is often the stronger choice.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-npm',
    title: 'npm Terms',
    terms: [
      {
        term: 'npm',
        definition:
          'The default package manager commonly distributed with Node.js and widely used across the JavaScript ecosystem.',
      },
      {
        term: 'package-lock.json',
        definition:
          'npm’s lockfile that records the exact dependency tree used for reproducible installs.',
      },
      {
        term: 'Hoisting',
        definition:
          'A package layout behavior that places dependencies higher in `node_modules`, which can affect visibility and deduplication.',
      },
      {
        term: 'npm Registry',
        definition:
          'The package registry from which npm and other compatible package managers typically fetch packages.',
      },
    ],
  },
  {
    id: 'glossary-pnpm',
    title: 'pnpm Terms',
    terms: [
      {
        term: 'pnpm',
        definition:
          'A JavaScript package manager known for a content-addressable store, efficient installs, and stricter dependency behavior.',
      },
      {
        term: 'pnpm-lock.yaml',
        definition:
          'pnpm’s lockfile that records exact dependency resolution for reproducible installations.',
      },
      {
        term: 'Content-Addressable Store',
        definition:
          'A shared package store where package contents are reused by reference instead of duplicated broadly per project.',
      },
      {
        term: 'Workspace',
        definition:
          'A repository structure where multiple related packages are managed together under one dependency-management setup.',
      },
    ],
  },
  {
    id: 'glossary-shared',
    title: 'Shared Package Management Terms',
    terms: [
      {
        term: 'Dependency Graph',
        definition:
          'The full set of direct and transitive package relationships required by a project.',
      },
      {
        term: 'Transitive Dependency',
        definition:
          'A package used indirectly through another dependency rather than declared directly by the current project.',
      },
      {
        term: 'Deterministic Install',
        definition:
          'An installation process that reproduces the same dependency result consistently across environments.',
      },
      {
        term: 'Monorepo',
        definition:
          'A repository containing multiple packages or applications managed together.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-core-difference', label: 'The Core Difference' },
    { id: 'bp-when-npm-fits', label: 'When npm Is Usually the Better Fit' },
    { id: 'bp-when-pnpm-fits', label: 'When pnpm Is Usually the Better Fit' },
    { id: 'bp-ecosystem-reality', label: 'Ecosystem Reality' },
    { id: 'bp-decision-checklist', label: 'Decision Checklist' },
  ],
  'core-concepts': [
    { id: 'core-install-model', label: 'Install Model' },
    { id: 'core-strictness', label: 'Dependency Strictness' },
    { id: 'core-performance', label: 'Performance and Disk Usage' },
    { id: 'core-monorepos', label: 'Monorepo and Workspace Behavior' },
    { id: 'core-lockfiles', label: 'Lockfiles and Reproducibility' },
    { id: 'core-compatibility', label: 'Tooling Compatibility' },
    { id: 'core-ci', label: 'CI and Team Standardization' },
    { id: 'core-migration', label: 'Migration Cost' },
    { id: 'core-team-fit', label: 'Team Fit' },
    { id: 'core-tradeoffs', label: 'Tradeoffs' },
  ],
  examples: [
    { id: 'examples-basic-commands', label: 'Basic Commands' },
    { id: 'examples-lockfiles', label: 'Lockfile Difference' },
    { id: 'examples-monorepo-shape', label: 'Monorepo Shape' },
    { id: 'examples-decision-frame', label: 'Decision Frame Example' },
  ],
  glossary: [
    { id: 'glossary-npm', label: 'npm Terms' },
    { id: 'glossary-pnpm', label: 'pnpm Terms' },
    { id: 'glossary-shared', label: 'Shared Package Management Terms' },
  ],
}

const pageStyles = `
.pnpm-npm-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.pnpm-npm-help-window {
  width: 100%;
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

.pnpm-npm-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  min-height: 24px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.pnpm-npm-help-titletext {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  font-size: 15px;
}

.pnpm-npm-help-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.pnpm-npm-help-control {
  width: 18px;
  height: 16px;
  padding: 0;
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
  font-family: "MS Sans Serif", Tahoma, sans-serif;
  font-size: 11px;
  line-height: 1;
}

.pnpm-npm-help-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
  background: #c0c0c0;
}

.pnpm-npm-help-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-family: "MS Sans Serif", Tahoma, sans-serif;
  font-size: 12px;
  cursor: pointer;
}

.pnpm-npm-help-tab-active {
  background: #fff;
  position: relative;
  top: 1px;
}

.pnpm-npm-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 250px minmax(0, 1fr);
  border-top: 1px solid #404040;
  background: #fff;
}

.pnpm-npm-help-toc {
  overflow: auto;
  padding: 12px;
  background: #efefef;
  border-right: 1px solid #808080;
}

.pnpm-npm-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.pnpm-npm-help-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.pnpm-npm-help-toc-item {
  margin: 0 0 8px;
}

.pnpm-npm-help-toc-link {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.pnpm-npm-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.pnpm-npm-help-doc-title {
  margin: 0 0 10px;
  font-size: 20px;
  font-weight: 700;
}

.pnpm-npm-help-section {
  margin: 0 0 20px;
}

.pnpm-npm-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.pnpm-npm-help-content p,
.pnpm-npm-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.pnpm-npm-help-content p {
  margin: 0 0 10px;
}

.pnpm-npm-help-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.pnpm-npm-help-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.pnpm-npm-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.pnpm-npm-help-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .pnpm-npm-help-main {
    grid-template-columns: 1fr;
  }

  .pnpm-npm-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}

@media (max-width: 640px) {
  .pnpm-npm-help-page {
    min-height: auto;
  }

  .pnpm-npm-help-window {
    min-height: auto;
  }

  .pnpm-npm-help-titlebar {
    padding-top: 4px;
    padding-bottom: 4px;
  }

  .pnpm-npm-help-titletext {
    position: static;
    transform: none;
    margin: 0 auto;
    padding-left: 20px;
    padding-right: 20px;
    text-align: center;
    white-space: normal;
  }
}
`

function isTabId(value: string | null): value is TabId {
  return (
    value === 'big-picture' ||
    value === 'core-concepts' ||
    value === 'examples' ||
    value === 'glossary'
  )
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="pnpm-npm-help-section">
      <h2 className="pnpm-npm-help-heading">{section.title}</h2>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {section.bullets ? (
        <ul>
          {section.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {isLast ? null : <hr className="pnpm-npm-help-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="pnpm-npm-help-section">
      <h2 className="pnpm-npm-help-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="pnpm-npm-help-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="pnpm-npm-help-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="pnpm-npm-help-section">
      <h2 className="pnpm-npm-help-heading">{section.title}</h2>
      {section.terms.map((item) => (
        <p key={item.term}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="pnpm-npm-help-divider" />}
    </section>
  )
}

export default function PnpmVsNpmPage(): JSX.Element {
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
    document.title = `pnpm vs npm (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'pnpm vs npm',
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
    <div className="pnpm-npm-help-page">
      <style>{pageStyles}</style>
      <div className="pnpm-npm-help-window" role="presentation">
        <header className="pnpm-npm-help-titlebar">
          <span className="pnpm-npm-help-titletext">pnpm vs npm</span>
          <div className="pnpm-npm-help-controls">
            <button
              className="pnpm-npm-help-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
              _
            </button>
            <Link to="/algoViz" className="pnpm-npm-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="pnpm-npm-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`pnpm-npm-help-tab ${activeTab === tab.id ? 'pnpm-npm-help-tab-active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="pnpm-npm-help-main">
          <aside className="pnpm-npm-help-toc" aria-label="Table of contents">
            <h2 className="pnpm-npm-help-toc-title">Contents</h2>
            <ul className="pnpm-npm-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id} className="pnpm-npm-help-toc-item">
                  <a href={`#${section.id}`} className="pnpm-npm-help-toc-link">
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="pnpm-npm-help-content">
            <h1 className="pnpm-npm-help-doc-title">pnpm vs npm</h1>
            {introParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            {activeTab === 'big-picture'
              ? bigPictureSections.map((section, index) =>
                  renderContentSection(section, index === bigPictureSections.length - 1),
                )
              : null}

            {activeTab === 'core-concepts'
              ? coreConceptSections.map((section, index) =>
                  renderContentSection(section, index === coreConceptSections.length - 1),
                )
              : null}

            {activeTab === 'examples'
              ? exampleSections.map((section, index) =>
                  renderExampleSection(section, index === exampleSections.length - 1),
                )
              : null}

            {activeTab === 'glossary'
              ? glossarySections.map((section, index) =>
                  renderGlossarySection(section, index === glossarySections.length - 1),
                )
              : null}
          </main>
        </div>
      </div>
    </div>
  )
}
