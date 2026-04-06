import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

type SectionNote = {
  title: string
  details: string
  notes: string
}

type NarrativeSection = {
  title: string
  paragraphs: string[]
}

type ExampleSection = {
  id: string
  title: string
  code: string
  explanation: string
}

type GlossaryTerm = {
  term: string
  definition: string
}

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const introParagraphs = [
  'Helm is the packaging and templating system most teams meet first when they start managing Kubernetes applications at scale. Instead of copying raw manifests across environments, teams package related resources into charts, parameterize them with values, and install versioned releases into clusters.',
  'That makes Helm more than a templating convenience. It becomes part of the platform delivery surface: how an application is packaged, how environment differences are expressed, how dependencies are versioned, and how upgrade and rollback workflows are run.',
  'This page focuses on Helm as a platform-engineering topic: chart structure, values and template rendering, release lifecycle, dependencies, OCI and repository distribution, tradeoffs, and how Helm relates to tools such as Kustomize and Argo CD.',
]

const bigPicture: SectionNote[] = [
  {
    title: 'What it is',
    details:
      'Helm is a package manager and templating system for Kubernetes. A Helm chart bundles templates, metadata, default values, and optional dependencies into a reusable deployment unit.',
    notes:
      'The core idea is packaging plus parameterized rendering: write a chart once, then supply different values per environment or tenant.',
  },
  {
    title: 'Why teams use it',
    details:
      'Helm reduces duplication in Kubernetes manifests, makes release upgrades more structured, and gives teams a standard way to install application stacks, platform add-ons, and third-party components.',
    notes:
      'It is especially useful when many resources belong together and the same logical application must be deployed with environment-specific settings.',
  },
  {
    title: 'Where it fits',
    details:
      'Helm fits when a team needs reusable packaging, parameterized manifests, release-oriented upgrades, and a common installation format that works well with both human operators and higher-level automation.',
    notes:
      'It is commonly used directly by operators, inside CI pipelines, and as a manifest generator under GitOps tools such as Argo CD or Flux.',
  },
  {
    title: 'What it is not',
    details:
      'Helm is not a continuous reconciliation controller by itself, and it is not a perfect solution for every Kubernetes customization problem. It renders and applies packaged manifests; long-term drift management usually needs another control loop.',
    notes:
      'If the need is primarily patch-based customization with minimal templating, or strong always-on reconciliation, another tool may be a better primary abstraction.',
  },
]

const keyTakeaways = [
  'Helm packages Kubernetes resources into charts and installs them as versioned releases.',
  'Values files and template functions make environment-specific rendering possible without copying entire manifest sets.',
  'Release history, upgrade, rollback, and dependency handling are part of Helm’s real operational value.',
  'Helm is powerful, but over-templating can make charts hard to reason about and harder to debug.',
  'Helm often works best as one layer in a broader platform workflow rather than as the only deployment control plane.',
]

const packagingSections: NarrativeSection[] = [
  {
    title: 'Packaging model',
    paragraphs: [
      'A chart is Helm’s unit of packaging. It contains chart metadata, templates, default values, and optional helper files. The output of a chart is ordinary Kubernetes YAML, but Helm gives that YAML structure, parameters, and versioning.',
      'This matters because platform teams rarely manage one manifest in isolation. They manage related resources that should move through environments together: Deployments, Services, ConfigMaps, Ingresses, RBAC objects, jobs, and policies that belong to one application or platform component.',
    ],
  },
  {
    title: 'Chart structure',
    paragraphs: [
      'The main files are usually Chart.yaml for metadata, values.yaml for defaults, and the templates directory for Kubernetes resources. Charts may also contain helpers, schema files, notes, and dependencies.',
      'The chart structure is simple on purpose, but chart quality depends on what the platform puts inside it. A clean chart exposes a small, stable values surface and keeps template logic readable enough that operators can predict what will be rendered.',
    ],
  },
  {
    title: 'Release model and revision history',
    paragraphs: [
      'Helm does not just render files. It installs a named release, tracks revision history, and gives operators upgrade and rollback operations tied to that release identity.',
      'That release model is why Helm often feels more operationally complete than a directory of YAML plus shell scripts. Teams can reason about what version of a package is installed and what changed between revisions.',
    ],
  },
  {
    title: 'Repositories and OCI distribution',
    paragraphs: [
      'Charts can be distributed through traditional Helm repositories or OCI registries. OCI support matters because many organizations already treat container registries as the standard artifact distribution path.',
      'From a platform perspective, distribution is about trust and reproducibility. Teams need to know which chart version is being installed, where it came from, and how the artifact moves through environments and approval boundaries.',
    ],
  },
]

const templatingSections: NarrativeSection[] = [
  {
    title: 'Values and overrides',
    paragraphs: [
      'Values are the main interface between chart authors and chart consumers. A chart ships with defaults, and operators can override them with one or more values files, `--set` flags, or higher-level tools that generate values on their behalf.',
      'This can be productive or dangerous. Good values expose real configuration choices such as image tags, replica counts, ports, storage classes, or feature flags. Bad values expose every internal implementation detail and effectively turn the chart into a complicated parameter spreadsheet.',
    ],
  },
  {
    title: 'Go template rendering',
    paragraphs: [
      'Helm templates use Go template syntax plus Helm-specific objects and helper functions. The chart author can reference `.Values`, `.Chart`, `.Release`, and `.Capabilities`, and can use helpers to build names, labels, conditionals, loops, or defaults.',
      'The strength of this approach is flexibility. The weakness is that template logic can become dense quickly. Once a chart is full of nested conditionals, generated names, and implicit helper behavior, troubleshooting the rendered result becomes much harder than reading ordinary YAML.',
    ],
  },
  {
    title: 'Helpers, schemas, and reusable conventions',
    paragraphs: [
      'Most serious charts define helper templates in `_helpers.tpl` so naming, labels, annotations, and repeated snippets stay consistent. Good helper usage reduces duplication while keeping rendered resources recognizable.',
      'Values schema files are also important for mature charts. Schema validation turns a loosely documented values surface into a more explicit contract by rejecting invalid types or missing required fields before a bad install reaches the cluster.',
    ],
  },
  {
    title: 'Dependencies, subcharts, and library charts',
    paragraphs: [
      'Helm supports dependency management, which allows one chart to include or reference others. Subcharts package reusable components, while library charts can provide shared template helpers without producing installable resources of their own.',
      'This is useful when a platform wants consistent chart primitives, but it also introduces coupling. Deep dependency trees and excessive helper indirection can make it difficult to understand which chart actually owns a given rendered resource.',
    ],
  },
  {
    title: 'Hooks and lifecycle integration',
    paragraphs: [
      'Helm supports hooks for events such as pre-install, post-install, pre-upgrade, post-upgrade, and test. Hooks are often used for migrations, preflight checks, data initialization, or smoke tests around a release change.',
      'Hooks solve real lifecycle problems, but they also add procedural behavior around what otherwise looks declarative. Platform teams should use them sparingly and document them clearly, because the operational behavior of a release is no longer visible from the steady-state manifests alone.',
    ],
  },
]

const operationsSections: NarrativeSection[] = [
  {
    title: 'Release lifecycle',
    paragraphs: [
      'When Helm installs a chart, it creates a release record and applies the rendered manifests to the cluster. Future upgrades compare the next rendered output against the existing release state, and rollback can target a previous release revision.',
      'That release model is one of Helm’s most practical features. Operators can track versioned upgrades and failures at the application-package level instead of dealing only with a directory of YAML files and shell history.',
    ],
  },
  {
    title: 'Debugging, linting, and dry-run workflows',
    paragraphs: [
      'Healthy Helm usage depends on rendering and inspecting output before production installs. `helm template`, `helm lint`, dry runs, and diff tooling are how teams make template-heavy charts reviewable instead of mysterious.',
      'This matters because Helm failures often come from the gap between what the template author thought would render and what the cluster actually receives. Rendering early closes that gap before the release touches a real environment.',
    ],
  },
  {
    title: 'Security, provenance, and supply chain',
    paragraphs: [
      'A chart is an artifact with operational power, so provenance and source trust matter. Teams should care where charts come from, how versions are approved, whether dependencies are pinned, and whether the registry or repository path is controlled.',
      'From a platform perspective, chart distribution is part of the software supply chain. Unscrutinized third-party charts or loosely managed dependencies can turn Helm into an easy path for hidden operational risk.',
    ],
  },
  {
    title: 'Architecture and ecosystem notes',
    paragraphs: [
      'Helm is usually part of a larger delivery system rather than the whole system. CI may build images and package charts. Artifact registries store chart versions. GitOps controllers may render and apply charts continuously. Policy tools may validate the rendered manifests before admission.',
      'That means the platform question is not just "can Helm render this template?" It is also "who owns the values, how are upgrades approved, how are chart versions promoted, and how much template behavior is acceptable before the chart becomes its own mini-framework?"',
    ],
  },
  {
    title: 'Tradeoffs and compare and contrast',
    paragraphs: [
      'Compared with raw YAML, Helm gives reuse, packaging, and versioned release workflows. Compared with Kustomize, Helm is generally more expressive and more parameter-driven, while Kustomize stays closer to patching and composition over plain YAML.',
      'Compared with Argo CD, Helm is the packaging and rendering layer rather than the long-running reconciliation control plane. Many teams deliberately combine them: Helm generates the manifests; Argo CD watches and reconciles the live cluster state.',
    ],
  },
  {
    title: 'Common failure modes',
    paragraphs: [
      'Teams get into trouble when charts expose too many knobs, hide important behavior in helpers, or rely on `--set` flags and ad hoc overrides that no longer reflect a clear source of truth. Another common problem is using Helm to build an abstraction so dynamic that nobody can predict the rendered YAML without trial and error.',
      'The package format is not usually the hardest part. The real challenge is deciding which configuration should be stable API, which should stay internal to the chart, and how to keep releases understandable during upgrades and incidents.',
    ],
  },
]

const designChecklist = [
  'Keep the values surface small enough that users understand what is actually supported.',
  'Render charts locally or in CI so reviewers can inspect concrete YAML, not only template logic.',
  'Use helpers and dependencies deliberately; avoid hiding core behavior behind too many layers of indirection.',
  'Prefer stable values files over piles of ad hoc `--set` overrides that drift away from source control.',
  'Treat chart versions, dependencies, and registries as part of the software supply chain, not just packaging trivia.',
]

const examples: ExampleSection[] = [
  {
    id: 'example-chart',
    title: 'Define chart metadata and a dependency',
    code: `apiVersion: v2
name: payments
description: Helm chart for the payments service
type: application
version: 0.3.0
appVersion: "1.12.4"
dependencies:
  - name: redis
    version: 18.17.0
    repository: oci://registry-1.docker.io/bitnamicharts`,
    explanation:
      'Chart metadata defines the package itself, while dependencies let the chart pull in related components. This is useful when one application depends on shared infrastructure such as Redis, but the dependency boundary should still be explicit and reviewed.',
  },
  {
    id: 'example-template',
    title: 'Render a Deployment from chart values',
    code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include "payments.fullname" . }}
  labels:
    app.kubernetes.io/name: {{ include "payments.name" . }}
spec:
  replicas: {{ .Values.replicaCount }}
  selector:
    matchLabels:
      app.kubernetes.io/name: {{ include "payments.name" . }}
  template:
    metadata:
      labels:
        app.kubernetes.io/name: {{ include "payments.name" . }}
    spec:
      containers:
        - name: payments
          image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
          ports:
            - containerPort: {{ .Values.service.port }}`,
    explanation:
      'This is the standard Helm pattern: keep the Kubernetes resource recognizable, then substitute only the fields that truly vary by environment or release. The chart is most maintainable when the rendered YAML still looks obvious to a Kubernetes operator.',
  },
  {
    id: 'example-schema',
    title: 'Validate chart inputs with a values schema',
    code: `{
  "$schema": "https://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "replicaCount": { "type": "integer", "minimum": 1 },
    "image": {
      "type": "object",
      "properties": {
        "repository": { "type": "string" },
        "tag": { "type": "string" }
      },
      "required": ["repository", "tag"]
    }
  },
  "required": ["image"]
}`,
    explanation:
      'A values schema makes the chart interface more explicit. Instead of waiting for a bad value to render broken YAML or fail at apply time, Helm can reject invalid input earlier.',
  },
  {
    id: 'example-release',
    title: 'Install or upgrade a release with values',
    code: `helm upgrade --install payments ./payments \\
  --namespace payments \\
  --create-namespace \\
  --values values-prod.yaml \\
  --set image.tag=1.12.4`,
    explanation:
      'This is the release workflow many teams standardize on. `upgrade --install` makes the command idempotent, values files capture environment settings, and a small number of explicit overrides can pin release-specific fields such as the image tag.',
  },
  {
    id: 'example-debug',
    title: 'Render and inspect manifests before an install',
    code: `helm lint ./payments
helm template payments ./payments \
  --namespace payments \
  --values values-prod.yaml
helm upgrade --install payments ./payments \
  --dry-run --debug \
  --values values-prod.yaml`,
    explanation:
      'These commands are part of a mature Helm workflow. They let the team validate chart structure, inspect the concrete YAML, and test an install path before touching the live cluster.',
  },
]

const glossary: GlossaryTerm[] = [
  {
    term: 'Helm',
    definition:
      'A Kubernetes package manager and templating system that installs versioned releases from charts.',
  },
  {
    term: 'Chart',
    definition:
      'The packaged unit of Helm content, including metadata, templates, values, and optional dependencies.',
  },
  {
    term: 'Release',
    definition:
      'A deployed instance of a Helm chart in a cluster, tracked with revision history for upgrade and rollback.',
  },
  {
    term: 'Values',
    definition:
      'Configuration inputs used to parameterize a chart during template rendering.',
  },
  {
    term: 'Template',
    definition:
      'A Kubernetes manifest file that uses Go template expressions and Helm objects to render concrete YAML.',
  },
  {
    term: 'Subchart',
    definition:
      'A dependent chart included by another chart, often used to bundle reusable components.',
  },
  {
    term: 'Library chart',
    definition:
      'A chart that provides reusable template helpers without rendering installable resources by itself.',
  },
  {
    term: 'Hook',
    definition:
      'A chart resource annotated to run at a specific lifecycle event such as install, upgrade, or test.',
  },
  {
    term: 'OCI registry',
    definition:
      'A registry that stores chart artifacts using the OCI distribution model instead of the older index-based Helm repository format.',
  },
  {
    term: 'Rollback',
    definition:
      'A Helm operation that reverts a release to a previous recorded revision.',
  },
  {
    term: 'Values schema',
    definition:
      'A JSON schema file used to validate chart values so invalid inputs can be rejected before installation.',
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
    { id: 'bp-why', label: 'Why It Matters' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-packaging', label: 'Packaging and Distribution' },
    { id: 'core-templating', label: 'Templating and Values' },
    { id: 'core-operations', label: 'Operations and Tradeoffs' },
    { id: 'core-checklist', label: 'Design Checklist' },
  ],
  examples: examples.map((example) => ({
    id: example.id,
    label: example.title,
  })),
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

const pageStyles = `
.helm-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.helm-window {
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

.helm-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 24px;
  padding: 2px 6px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.helm-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  max-width: calc(100% - 92px);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  pointer-events: none;
  font-size: 15px;
}

.helm-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.helm-control {
  width: 18px;
  height: 16px;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: 11px;
  line-height: 1;
  cursor: pointer;
  padding: 0;
}

.helm-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
}

.helm-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.helm-tab.active {
  position: relative;
  top: 1px;
  background: #fff;
}

.helm-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  border-top: 1px solid #404040;
  background: #fff;
}

.helm-toc {
  overflow: auto;
  padding: 12px;
  background: #f1f1f1;
  border-right: 1px solid #808080;
}

.helm-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.helm-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.helm-toc-list li {
  margin: 0 0 8px;
}

.helm-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.helm-toc-list a:hover {
  text-decoration: underline;
}

.helm-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.helm-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.helm-section {
  margin: 0 0 20px;
}

.helm-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.helm-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.helm-content p,
.helm-content li {
  font-size: 12px;
  line-height: 1.5;
}

.helm-content p {
  margin: 0 0 10px;
}

.helm-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.helm-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.helm-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.helm-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .helm-main {
    grid-template-columns: 1fr;
  }

  .helm-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}
`

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

export default function HelmPage(): JSX.Element {
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
    document.title = `Helm (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Helm',
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
    <div className="helm-help-page">
      <style>{pageStyles}</style>
      <div className="helm-window" role="presentation">
        <header className="helm-titlebar">
          <span className="helm-title-text">Helm</span>
          <div className="helm-title-controls">
            <button className="helm-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="helm-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="helm-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`helm-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="helm-main">
          <aside className="helm-toc" aria-label="Table of contents">
            <h2 className="helm-toc-title">Contents</h2>
            <ul className="helm-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="helm-content">
            <h1 className="helm-doc-title">Helm</h1>
            {introParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="helm-section">
                  <h2 className="helm-heading">Overview</h2>
                  {bigPicture.map((item) => (
                    <div key={item.title}>
                      <h3 className="helm-subheading">{item.title}</h3>
                      <p>{item.details}</p>
                      <p>{item.notes}</p>
                    </div>
                  ))}
                </section>

                <hr className="helm-divider" />

                <section id="bp-why" className="helm-section">
                  <h2 className="helm-heading">Why It Matters</h2>
                  <p>
                    Platform engineering needs repeatable application packaging. Helm matters because it gives teams a standard unit
                    for shipping Kubernetes resources, separating reusable templates from environment-specific values, and
                    operationalizing upgrades and rollbacks in a consistent way.
                  </p>
                  <p>
                    It also defines a contract between chart authors and chart users. The platform can publish a chart interface,
                    decide which knobs are supported, and control how those chart versions move through testing and production.
                  </p>
                </section>

                <hr className="helm-divider" />

                <section id="bp-takeaways" className="helm-section">
                  <h2 className="helm-heading">Key Takeaways</h2>
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
                <section id="core-packaging" className="helm-section">
                  <h2 className="helm-heading">Packaging and Distribution</h2>
                  {packagingSections.map((section) => (
                    <div key={section.title}>
                      <h3 className="helm-subheading">{section.title}</h3>
                      {section.paragraphs.map((paragraph) => (
                        <p key={`${section.title}-${paragraph}`}>{paragraph}</p>
                      ))}
                    </div>
                  ))}
                </section>

                <section id="core-templating" className="helm-section">
                  <h2 className="helm-heading">Templating and Values</h2>
                  {templatingSections.map((section) => (
                    <div key={section.title}>
                      <h3 className="helm-subheading">{section.title}</h3>
                      {section.paragraphs.map((paragraph) => (
                        <p key={`${section.title}-${paragraph}`}>{paragraph}</p>
                      ))}
                    </div>
                  ))}
                </section>

                <section id="core-operations" className="helm-section">
                  <h2 className="helm-heading">Operations and Tradeoffs</h2>
                  {operationsSections.map((section) => (
                    <div key={section.title}>
                      <h3 className="helm-subheading">{section.title}</h3>
                      {section.paragraphs.map((paragraph) => (
                        <p key={`${section.title}-${paragraph}`}>{paragraph}</p>
                      ))}
                    </div>
                  ))}
                </section>

                <section id="core-checklist" className="helm-section">
                  <h2 className="helm-heading">Design Checklist</h2>
                  <ul>
                    {designChecklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                {examples.map((example) => (
                  <section key={example.id} id={example.id} className="helm-section">
                    <h2 className="helm-heading">{example.title}</h2>
                    <div className="helm-codebox">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </section>
                ))}
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="helm-section">
                <h2 className="helm-heading">Glossary</h2>
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
