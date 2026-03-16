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
  'Crossplane turns Kubernetes into a control plane for external infrastructure and higher-level platform APIs. Instead of asking every team to know each cloud provider API directly, platform engineers define Kubernetes-native abstractions and let Crossplane reconcile those abstractions into concrete resources.',
  'The core value is not just provisioning. Crossplane lets a platform team model opinionated products such as databases, buckets, clusters, or internal service foundations as APIs with defaults, policy boundaries, and reusable compositions. Developers consume those APIs; the platform owns how they map to cloud infrastructure.',
  'This page keeps the focus on platform engineering: where Crossplane fits, how providers and managed resources work, what XRDs, claims, and compositions do, how reconciliation behaves, and what tradeoffs appear compared with tools such as Terraform and Argo CD.',
]

const bigPicture: SectionNote[] = [
  {
    title: 'What it is',
    details:
      'Crossplane is an open-source control plane framework built on Kubernetes. It extends the Kubernetes API with custom resources that represent cloud and platform infrastructure.',
    notes:
      'The important shift is that infrastructure becomes part of a reconciled API model rather than a one-time provisioning job.',
  },
  {
    title: 'Why platform teams use it',
    details:
      'It lets a platform team publish stable internal APIs such as databases, object storage, or application environments while hiding provider-specific complexity behind compositions.',
    notes:
      'This improves self-service, policy consistency, and reuse because the platform owns the abstraction layer instead of each application team inventing its own templates.',
  },
  {
    title: 'Where it fits',
    details:
      'Crossplane fits when Kubernetes is already a trusted control plane and the organization wants continuous reconciliation for infrastructure, reusable platform APIs, and declarative workflows that stay inside the Kubernetes operating model.',
    notes:
      'It is especially useful for internal platforms, multi-cloud abstractions, and teams that want claims or higher-level APIs instead of raw cloud resources.',
  },
  {
    title: 'What it is not',
    details:
      'Crossplane is not primarily a CI tool, not just a YAML wrapper, and not a perfect substitute for every Terraform workflow. It shines when long-lived infrastructure should be expressed as APIs and continuously reconciled.',
    notes:
      'If the need is mostly one-off provisioning or imperative orchestration outside a Kubernetes control plane, another tool may fit better.',
  },
]

const keyTakeaways = [
  'Crossplane uses Kubernetes APIs and controllers to manage external infrastructure continuously.',
  'Providers expose managed resources for specific systems, while XRDs and compositions let platform teams publish safer higher-level APIs.',
  'Claims give application teams a self-service interface without forcing them to understand provider-specific resource details.',
  'The hardest design work is usually the platform API and composition model, not the YAML syntax itself.',
  'Crossplane works best when the organization wants reconciliation and control-plane ownership, not just provisioning scripts.',
]

const controlPlaneSections: NarrativeSection[] = [
  {
    title: 'Control plane model',
    paragraphs: [
      'Crossplane runs as controllers inside Kubernetes. Those controllers watch Kubernetes resources, compare desired state with observed state, and call external provider APIs until the external system converges on the declared intent.',
      'That means infrastructure lives in the same API-and-reconciliation model as other Kubernetes resources. Instead of thinking in terms of "run this provisioning command," the platform thinks in terms of "declare the resource and let the control loop keep it true."',
    ],
  },
  {
    title: 'Providers and packages',
    paragraphs: [
      'Crossplane itself is the framework. Providers are packages that install controllers and custom resource definitions for specific clouds or external systems such as AWS, Azure, GCP, Kubernetes, Helm, or SQL providers.',
      'Installing a provider extends the cluster with managed resource kinds. Each managed resource maps closely to a provider-specific object such as a bucket, database instance, network, or IAM policy.',
    ],
  },
  {
    title: 'Managed resources and ProviderConfig',
    paragraphs: [
      'Managed resources are the low-level objects that talk directly to an external API. They typically resemble the provider model fairly closely because they need to capture concrete configuration such as region, size, tags, version, or network settings.',
      'ProviderConfig and related credential references tell those resources how to authenticate. This is one of the main operational and security boundaries because those credentials are what give Crossplane authority over external systems.',
    ],
  },
]

const abstractionSections: NarrativeSection[] = [
  {
    title: 'XRDs define the platform API',
    paragraphs: [
      'An XRD, or CompositeResourceDefinition, defines a new custom API that the platform wants to offer. This is where the platform says, in effect, "our users may ask for a database" or "our users may ask for an object store" without exposing every field from the raw provider resources.',
      'The XRD is the contract. It defines schema, names, versions, and whether a namespaced claim should exist. Good XRD design is less about copying a cloud provider API and more about publishing an interface that is stable, opinionated, and useful to internal consumers.',
    ],
  },
  {
    title: 'Compositions map the API to real infrastructure',
    paragraphs: [
      'A composition tells Crossplane how a composite resource should be realized. It takes the higher-level API from the XRD and maps it to one or more managed resources, patching fields between the user-facing object and the concrete infrastructure resources.',
      'This is where platform logic lives: defaulting, wiring, dependency structure, naming conventions, connection secret publishing, and provider-specific implementation details. The composition is what turns the abstract request into a deployable product.',
    ],
  },
  {
    title: 'Claims create a safer self-service surface',
    paragraphs: [
      'A claim is the namespaced object a developer typically creates. Instead of authoring a provider-specific bucket or database resource directly, the developer asks for the platform-defined claim. Crossplane then creates the backing composite resource and managed resources behind it.',
      'This pattern is useful because it separates platform ownership from application ownership. The platform team owns the abstraction and its implementation. Application teams consume the API in their own namespaces with fewer ways to bypass policy or complexity boundaries.',
    ],
  },
  {
    title: 'Composition Functions extend assembly logic',
    paragraphs: [
      'Modern Crossplane setups can use Composition Functions to build pipeline-style composition logic. Functions make it easier to generate or transform desired resources when simple field patching is not enough.',
      'They add flexibility, but they also add another layer of logic to own and debug. The platform should use functions when they clarify the abstraction model, not when they merely hide a design that should have been simplified first.',
    ],
  },
]

const operationsSections: NarrativeSection[] = [
  {
    title: 'Reconciliation and lifecycle',
    paragraphs: [
      'Crossplane continuously reconciles. If a managed resource drifts, credentials change, an external object is deleted, or the desired spec changes, the controllers attempt to bring the external state back in line with the declared state.',
      'That makes Crossplane different from a tool that runs once and exits. The reward is continuous control. The cost is that the platform must understand ownership boundaries, drift sources, and what should happen when external systems reject or mutate requests.',
    ],
  },
  {
    title: 'Connection details and secrets',
    paragraphs: [
      'Many composed resources produce connection details such as hostnames, usernames, passwords, ports, or endpoints. Crossplane can publish those details into Kubernetes secrets so workloads or operators can consume them.',
      'This is operationally important because the platform API is not complete until consumers can use the resource they requested. A database claim that provisions successfully but does not surface usable credentials is not actually self-service.',
    ],
  },
  {
    title: 'Architecture and ecosystem notes',
    paragraphs: [
      'Crossplane is usually used alongside GitOps tooling, policy engines, secret-management systems, and internal developer portals. The cluster remains the control plane, while surrounding tools handle delivery workflows, policy review, or secret distribution.',
      'The ecosystem question is therefore not just "can Crossplane create a resource?" It is "how does this abstraction fit into repository layout, environment promotion, credential handling, RBAC, and the developer experience of the platform?"',
    ],
  },
  {
    title: 'Tradeoffs and compare and contrast',
    paragraphs: [
      'Compared with Terraform, Crossplane is more naturally embedded in Kubernetes and better suited to publishing reusable platform APIs with ongoing reconciliation. Terraform often feels simpler for standalone infrastructure stacks, large existing module ecosystems, or teams that do not want Kubernetes to be the control plane.',
      'Compared with Argo CD, Crossplane is broader on infrastructure abstraction while Argo CD is stronger as an application delivery and reconciliation layer for Kubernetes workloads. They are complementary more often than they are direct substitutes.',
    ],
  },
  {
    title: 'Common failure modes',
    paragraphs: [
      'Teams get into trouble when they expose provider-shaped APIs directly to developers, leak credentials too broadly, or build compositions so clever that nobody can reason about them during incidents. Another common problem is adopting Crossplane before deciding what the internal platform products should actually be.',
      'The YAML is rarely the hard part. The hard part is product design for the platform: choosing the right abstractions, defaults, lifecycle rules, ownership boundaries, and escape hatches.',
    ],
  },
]

const examples: ExampleSection[] = [
  {
    id: 'example-provider',
    title: 'Install a provider and credential configuration',
    code: `apiVersion: pkg.crossplane.io/v1
kind: Provider
metadata:
  name: provider-aws-s3
spec:
  package: xpkg.crossplane.io/crossplane-contrib/provider-aws-s3:v1
---
apiVersion: aws.crossplane.io/v1beta1
kind: ProviderConfig
metadata:
  name: default
spec:
  credentials:
    source: Secret
    secretRef:
      namespace: crossplane-system
      name: aws-creds
      key: creds`,
    explanation:
      'Crossplane becomes useful only after a provider installs the managed resource APIs and the provider is given credentials. The exact group names vary by provider package, but the pattern is consistent: install the package, then bind it to credentials through a ProviderConfig.',
  },
  {
    id: 'example-xrd',
    title: 'Define a platform API with an XRD and claim',
    code: `apiVersion: apiextensions.crossplane.io/v1
kind: CompositeResourceDefinition
metadata:
  name: xpostgresinstances.platform.example.org
spec:
  group: platform.example.org
  names:
    kind: XPostgresInstance
    plural: xpostgresinstances
  claimNames:
    kind: PostgresInstance
    plural: postgresinstances
  versions:
    - name: v1alpha1
      served: true
      referenceable: true
      schema:
        openAPIV3Schema:
          type: object
          properties:
            spec:
              type: object
              properties:
                storageGiB:
                  type: integer
                region:
                  type: string
---
apiVersion: platform.example.org/v1alpha1
kind: PostgresInstance
metadata:
  name: team-a-db
spec:
  storageGiB: 50
  region: us-east-1`,
    explanation:
      'The XRD publishes the contract. The claim is what a team creates in its namespace. That lets the platform expose a clean API for "give me a Postgres instance" without requiring application teams to understand every cloud-specific field.',
  },
  {
    id: 'example-composition',
    title: 'Map the platform API to managed resources with a composition',
    code: `apiVersion: apiextensions.crossplane.io/v1
kind: Composition
metadata:
  name: xpostgresinstances.aws
spec:
  compositeTypeRef:
    apiVersion: platform.example.org/v1alpha1
    kind: XPostgresInstance
  resources:
    - name: database
      base:
        apiVersion: rds.aws.upbound.io/v1beta1
        kind: Instance
        spec:
          forProvider:
            engine: postgres
            instanceClass: db.t3.micro
            allocatedStorage: 20
            region: us-east-1
          providerConfigRef:
            name: default
      patches:
        - fromFieldPath: spec.storageGiB
          toFieldPath: spec.forProvider.allocatedStorage
        - fromFieldPath: spec.region
          toFieldPath: spec.forProvider.region`,
    explanation:
      'The composition expresses the implementation. The platform API stays stable, while the composition decides which managed resources are created and how claim fields patch into provider-specific infrastructure objects.',
  },
]

const glossary: GlossaryTerm[] = [
  {
    term: 'Crossplane',
    definition:
      'A Kubernetes-native control plane framework for managing external infrastructure and publishing higher-level platform APIs.',
  },
  {
    term: 'Provider',
    definition:
      'A Crossplane package that installs controllers and custom resources for a specific external system or cloud service.',
  },
  {
    term: 'Managed resource',
    definition:
      'A low-level Crossplane resource that maps closely to an external provider object such as a bucket, network, or database instance.',
  },
  {
    term: 'ProviderConfig',
    definition:
      'Configuration that tells managed resources how to authenticate and connect to the target provider.',
  },
  {
    term: 'XRD',
    definition:
      'CompositeResourceDefinition. It defines a new higher-level API that the platform wants to offer.',
  },
  {
    term: 'Composite resource',
    definition:
      'The cluster-scoped object created from an XRD. It represents the platform-defined abstraction behind one request.',
  },
  {
    term: 'Claim',
    definition:
      'A namespaced self-service resource that lets application teams request a platform product without working with provider-specific managed resources directly.',
  },
  {
    term: 'Composition',
    definition:
      'The template or assembly logic that maps a composite resource to one or more managed resources.',
  },
  {
    term: 'Composition Function',
    definition:
      'A pipeline step used in modern Crossplane compositions to generate or transform desired resources with more flexible logic.',
  },
  {
    term: 'Reconciliation',
    definition:
      'The controller loop that keeps the actual external state aligned with the declared desired state over time.',
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
    { id: 'core-control-plane', label: 'Control Plane Model' },
    { id: 'core-abstractions', label: 'Platform Abstractions' },
    { id: 'core-operations', label: 'Operations and Tradeoffs' },
  ],
  examples: examples.map((example) => ({
    id: example.id,
    label: example.title,
  })),
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

const pageStyles = `
.crossplane-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  padding: 0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.crossplane-window {
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

.crossplane-titlebar {
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

.crossplane-title-text {
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

.crossplane-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.crossplane-control {
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

.crossplane-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
}

.crossplane-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
}

.crossplane-tab.active {
  position: relative;
  top: 1px;
  background: #fff;
}

.crossplane-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  border-top: 1px solid #404040;
  background: #fff;
}

.crossplane-toc {
  overflow: auto;
  padding: 12px;
  background: #f1f1f1;
  border-right: 1px solid #808080;
}

.crossplane-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.crossplane-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.crossplane-toc-list li {
  margin: 0 0 8px;
}

.crossplane-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.crossplane-toc-list a:hover {
  text-decoration: underline;
}

.crossplane-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.crossplane-doc-title {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
}

.crossplane-section {
  margin: 0 0 20px;
}

.crossplane-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.crossplane-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.crossplane-content p,
.crossplane-content li {
  font-size: 12px;
  line-height: 1.5;
}

.crossplane-content p {
  margin: 0 0 10px;
}

.crossplane-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.crossplane-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.crossplane-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.crossplane-codebox code {
  display: block;
  white-space: pre;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .crossplane-main {
    grid-template-columns: 1fr;
  }

  .crossplane-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }
}
`

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

export default function CrossplanePage(): JSX.Element {
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
    document.title = `Crossplane (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'Crossplane',
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
    <div className="crossplane-help-page">
      <style>{pageStyles}</style>
      <div className="crossplane-window" role="presentation">
        <header className="crossplane-titlebar">
          <span className="crossplane-title-text">Crossplane</span>
          <div className="crossplane-title-controls">
            <button className="crossplane-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="crossplane-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="crossplane-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`crossplane-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="crossplane-main">
          <aside className="crossplane-toc" aria-label="Table of contents">
            <h2 className="crossplane-toc-title">Contents</h2>
            <ul className="crossplane-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="crossplane-content">
            <h1 className="crossplane-doc-title">Crossplane</h1>
            {introParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="crossplane-section">
                  <h2 className="crossplane-heading">Overview</h2>
                  {bigPicture.map((item) => (
                    <div key={item.title}>
                      <h3 className="crossplane-subheading">{item.title}</h3>
                      <p>{item.details}</p>
                      <p>{item.notes}</p>
                    </div>
                  ))}
                </section>

                <hr className="crossplane-divider" />

                <section id="bp-why" className="crossplane-section">
                  <h2 className="crossplane-heading">Why It Matters</h2>
                  <p>
                    Platform engineering is usually less about raw provisioning and more about publishing reliable self-service
                    products. Crossplane matters because it gives the platform team a way to express those products as APIs rather
                    than as copied Terraform modules, custom shell scripts, or provider-specific YAML scattered across repositories.
                  </p>
                  <p>
                    It also changes operations. Because the system keeps reconciling, the platform does not stop caring after the
                    first successful apply. Drift, deleted resources, invalid credentials, and lifecycle changes all remain visible
                    inside the control plane.
                  </p>
                </section>

                <hr className="crossplane-divider" />

                <section id="bp-takeaways" className="crossplane-section">
                  <h2 className="crossplane-heading">Key Takeaways</h2>
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
                <section id="core-control-plane" className="crossplane-section">
                  <h2 className="crossplane-heading">Control Plane Model</h2>
                  {controlPlaneSections.map((section) => (
                    <div key={section.title}>
                      <h3 className="crossplane-subheading">{section.title}</h3>
                      {section.paragraphs.map((paragraph) => (
                        <p key={`${section.title}-${paragraph}`}>{paragraph}</p>
                      ))}
                    </div>
                  ))}
                </section>

                <section id="core-abstractions" className="crossplane-section">
                  <h2 className="crossplane-heading">Platform Abstractions</h2>
                  {abstractionSections.map((section) => (
                    <div key={section.title}>
                      <h3 className="crossplane-subheading">{section.title}</h3>
                      {section.paragraphs.map((paragraph) => (
                        <p key={`${section.title}-${paragraph}`}>{paragraph}</p>
                      ))}
                    </div>
                  ))}
                </section>

                <section id="core-operations" className="crossplane-section">
                  <h2 className="crossplane-heading">Operations and Tradeoffs</h2>
                  {operationsSections.map((section) => (
                    <div key={section.title}>
                      <h3 className="crossplane-subheading">{section.title}</h3>
                      {section.paragraphs.map((paragraph) => (
                        <p key={`${section.title}-${paragraph}`}>{paragraph}</p>
                      ))}
                    </div>
                  ))}
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                {examples.map((example) => (
                  <section key={example.id} id={example.id} className="crossplane-section">
                    <h2 className="crossplane-heading">{example.title}</h2>
                    <div className="crossplane-codebox">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </section>
                ))}
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="crossplane-section">
                <h2 className="crossplane-heading">Glossary</h2>
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
