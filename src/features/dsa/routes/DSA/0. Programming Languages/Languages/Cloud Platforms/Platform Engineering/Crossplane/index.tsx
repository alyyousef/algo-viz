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
  id: string
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
  'Crossplane turns Kubernetes into a control plane for external infrastructure and higher-level platform APIs. Instead of asking every application team to understand each cloud provider API, a platform team can define Kubernetes-native abstractions and let Crossplane reconcile those abstractions into real infrastructure.',
  'That matters because platform engineering is not mainly about provisioning raw resources. It is about publishing reusable internal products such as databases, buckets, clusters, or service foundations with stable interfaces, defaults, policies, and ownership boundaries.',
  'This page focuses on providers, managed resources, XRDs, claims, compositions, connection details, reconciliation, security boundaries, and the design tradeoffs that decide whether a Crossplane platform becomes a useful product layer or just a complicated YAML surface.',
]

const bigPicture: SectionNote[] = [
  {
    title: 'What it is',
    details:
      'Crossplane is a Kubernetes-native control plane framework. It extends the Kubernetes API with custom resources that represent external infrastructure and platform abstractions, then uses controllers to keep those external systems aligned with declared state.',
    notes:
      'The important idea is not simply that Kubernetes can create infrastructure. It is that infrastructure becomes part of an API-and-reconciliation model with status, conditions, ownership, and ongoing control loops.',
  },
  {
    title: 'Why teams adopt it',
    details:
      'Teams adopt Crossplane when they want a platform API instead of a loose collection of Terraform modules, shell scripts, or cloud-console instructions. It lets a platform team publish safer, reusable internal products while hiding provider-specific complexity.',
    notes:
      'This is especially useful when many teams need the same classes of resources with consistent policy, naming, connection handling, and lifecycle behavior.',
  },
  {
    title: 'Where it fits',
    details:
      'Crossplane fits best when Kubernetes is already trusted as a control plane and the organization wants long-lived declarative management for infrastructure, platform products, or shared service foundations.',
    notes:
      'It fits naturally beside GitOps controllers, policy engines, secret managers, and internal developer portals because the platform API is exposed through the same Kubernetes operating model those systems already understand.',
  },
  {
    title: 'What it is not',
    details:
      'Crossplane is not primarily a CI tool, not a drop-in replacement for every Terraform workflow, and not a reason to move every infrastructure problem into Kubernetes automatically. It is strongest where reconciliation and internal platform APIs are the point.',
    notes:
      'If the need is imperative orchestration, one-off provisioning, or a control plane outside Kubernetes, another tool may be the simpler fit.',
  },
]

const adoptionGuide: Array<{ title: string; choice: string }> = [
  {
    title: 'Need a Kubernetes-native control plane for reusable infrastructure APIs',
    choice: 'Use Crossplane as the abstraction and reconciliation layer.',
  },
  {
    title: 'Need to give developers self-service access to databases, buckets, or clusters',
    choice: 'Use XRDs, claims, and compositions rather than exposing raw provider resources directly.',
  },
  {
    title: 'Need GitOps delivery of Kubernetes applications',
    choice: 'Pair Crossplane with Argo CD or another GitOps controller instead of expecting Crossplane alone to be the application delivery plane.',
  },
  {
    title: 'Need broad standalone infrastructure workflows outside a Kubernetes control plane',
    choice: 'Terraform may still be the simpler fit depending on the operating model and ecosystem already in use.',
  },
]

const keyTakeaways = [
  'Crossplane uses Kubernetes APIs and controllers to manage external infrastructure continuously, not as one-time provisioning jobs.',
  'Providers expose low-level managed resources, but the platform value comes from XRDs, claims, and compositions that publish higher-level APIs.',
  'Claims separate platform ownership from application-team consumption by giving developers a namespaced self-service interface.',
  'The hard work is API design, lifecycle policy, and ownership boundaries, not the YAML syntax itself.',
  'Crossplane is most effective when the organization wants reconciliation, internal platform products, and Kubernetes-native control-plane behavior.',
]

const coreSections: NarrativeSection[] = [
  {
    id: 'core-model',
    title: 'Control plane model',
    paragraphs: [
      'Crossplane runs as controllers inside Kubernetes. Those controllers watch custom resources, compare desired state with observed state, and call external provider APIs until the external system converges on the declared spec.',
      'That changes the operational model. Infrastructure is not just something a pipeline applied once. It becomes an object with status, conditions, events, and ongoing controller ownership.',
      'This is why Crossplane feels more like platform API engineering than like a sequence of provisioning commands. The platform publishes the API; the controller keeps enforcing it.',
    ],
  },
  {
    id: 'core-providers',
    title: 'Packages, providers, and managed resources',
    paragraphs: [
      'Crossplane itself is the framework. Providers are packages that extend the cluster with controllers and custom resource definitions for clouds and external systems such as AWS, Azure, GCP, Kubernetes, Helm, or database services.',
      'Managed resources are the low-level provider-backed objects. They map fairly closely to actual provider APIs because they need fields such as region, size, engine, version, network, retention policy, or tags.',
      'A common anti-pattern is to stop here and expose those managed resources directly to developers. That technically works, but it bypasses most of the platform value because consumers still need to understand provider-specific details.',
    ],
  },
  {
    id: 'core-provider-config',
    title: 'ProviderConfig and credential boundaries',
    paragraphs: [
      'ProviderConfig tells managed resources how to authenticate. In practice, this is one of the most sensitive surfaces in Crossplane because it defines where the platform has authority to create, mutate, or delete real infrastructure.',
      'The platform should treat provider credentials, namespace boundaries, RBAC, and provider upgrades as control-plane governance concerns rather than as minor setup details.',
      'A useful mental model is that Crossplane is a privileged infrastructure control plane. The value is high, but so is the blast radius if credentials or permissions are too broad.',
    ],
  },
  {
    id: 'core-xrd',
    title: 'XRDs, claims, and compositions',
    paragraphs: [
      'An XRD, or CompositeResourceDefinition, defines a new API that the platform wants to publish. Claims give application teams a namespaced self-service interface to that API. Compositions implement the contract by mapping the higher-level request to one or more managed resources.',
      'That separation is where the platform value lives. The consumer sees a stable product API; the platform retains freedom to change how that product is realized internally.',
      'Weak design copies a provider API field-for-field. Strong design publishes a product interface that matches how internal users think about the resource they want.',
    ],
  },
  {
    id: 'core-secrets',
    title: 'Connection details, secrets, and lifecycle',
    paragraphs: [
      'Many composed resources produce connection details such as hostnames, ports, usernames, passwords, certificates, or endpoints. Crossplane can publish those details into Kubernetes secrets so workloads or operators can consume them.',
      'A platform API is incomplete until the consumer can actually use what was provisioned. A claim that creates a database but does not surface usable connection information still leaves manual work and hidden operational steps.',
      'Deletion policy, drift handling, and ownership rules also matter here. The platform must decide whether deleting the Kubernetes object should delete the external resource, orphan it, or protect it under stricter policy.',
    ],
  },
  {
    id: 'core-operations',
    title: 'GitOps, portability, and operational tradeoffs',
    paragraphs: [
      'Crossplane is commonly used alongside GitOps tools rather than instead of them. Git stores the resource declarations, a tool such as Argo CD delivers them into the cluster, and Crossplane reconciles the infrastructure behind those objects.',
      'Crossplane is often discussed in multi-cloud terms, but portability is only real when the abstraction offered to users remains meaningful across providers. The best designs standardize on product outcomes rather than exposing every provider-specific knob.',
      'Compared with Terraform, Crossplane is more naturally embedded in Kubernetes and better aligned with reusable platform APIs under controller ownership. Compared with Argo CD, it is broader on infrastructure abstraction while Argo CD remains stronger as the Kubernetes application delivery plane.',
    ],
  },
  {
    id: 'core-pitfalls',
    title: 'Common failure modes',
    paragraphs: [
      'Teams get into trouble when they expose provider-shaped APIs directly to developers, install powerful providers without clear governance, or build compositions so clever that nobody can debug them during incidents.',
      'Another frequent mistake is adopting Crossplane before deciding what the platform products should actually be. The result is lots of controller machinery wrapped around an unclear service model.',
      'The hard part is therefore not resource syntax. It is choosing the right abstraction surface, lifecycle ownership, security boundaries, deletion policy, connection strategy, and upgrade path for the products the platform wants to offer.',
    ],
  },
]

const designChecklist = [
  'Define platform products first instead of exposing raw managed resources and hoping an internal API appears later.',
  'Keep XRDs narrow enough to stay stable. Every exposed field becomes part of the support contract.',
  'Use claims when teams need safe namespace-scoped self-service instead of privileged control-plane access.',
  'Decide explicitly how connection secrets are published, rotated, and authorized.',
  'Treat provider credentials and provider upgrades as governance concerns, not minor setup details.',
]

const examples: ExampleSection[] = [
  {
    id: 'example-provider',
    title: 'Install a provider and bind credentials with ProviderConfig',
    code: `apiVersion: pkg.crossplane.io/v1
kind: Provider
metadata:
  name: provider-aws-rds
spec:
  package: xpkg.crossplane.io/upbound/provider-aws-rds:v1.9.0
---
apiVersion: aws.upbound.io/v1beta1
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
      'The provider installs managed resource APIs and controller logic. The ProviderConfig gives those resources authority to talk to the external system.',
  },
  {
    id: 'example-xrd',
    title: 'Publish a platform API with an XRD',
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
    plural: postgresinstances`,
    explanation:
      'The XRD defines the contract the platform offers. It says what consumers may ask for, which is separate from how the platform chooses to implement that request in a specific provider.',
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
        kind: Instance`,
    explanation:
      'The composition is where the product API becomes real infrastructure. It chooses the provider resource, applies defaults, and maps user-facing fields into the implementation.',
  },
  {
    id: 'example-claim',
    title: 'Consume the platform API with a claim',
    code: `apiVersion: platform.example.org/v1alpha1
kind: PostgresInstance
metadata:
  name: team-a-db
  namespace: team-a
spec:
  storageGiB: 50
  region: us-east-1`,
    explanation:
      'This is the self-service experience the platform wants to create. The application team asks for a database product in its own namespace without needing to know the exact provider CRDs or composition internals.',
  },
]

const glossary: GlossaryTerm[] = [
  { term: 'Crossplane', definition: 'A Kubernetes-native control plane framework for managing external infrastructure and publishing higher-level platform APIs.' },
  { term: 'Provider', definition: 'A package that installs controllers and resource definitions for a specific external system or cloud service.' },
  { term: 'Managed resource', definition: 'A low-level Crossplane resource that maps closely to a provider object such as a bucket, database instance, or network.' },
  { term: 'ProviderConfig', definition: 'Configuration that tells managed resources how to authenticate and connect to the target provider.' },
  { term: 'XRD', definition: 'CompositeResourceDefinition. It defines a new higher-level API that the platform wants to publish.' },
  { term: 'Claim', definition: 'A namespaced self-service resource that lets application teams request a platform product without working with provider-specific resources directly.' },
  { term: 'Composition', definition: 'The mapping layer that realizes a composite resource through one or more managed resources.' },
  { term: 'Connection details', definition: 'Usable outputs such as hostnames, credentials, or ports that Crossplane can publish for consumers after provisioning.' },
  { term: 'Reconciliation', definition: 'The controller loop that continually works to align actual external state with declared desired state.' },
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
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-model', label: 'Control Plane Model' },
    { id: 'core-providers', label: 'Providers and Resources' },
    { id: 'core-provider-config', label: 'ProviderConfig' },
    { id: 'core-xrd', label: 'XRDs and Claims' },
    { id: 'core-secrets', label: 'Connection Details' },
    { id: 'core-operations', label: 'Operations and Tradeoffs' },
    { id: 'core-pitfalls', label: 'Pitfalls' },
    { id: 'core-checklist', label: 'Design Checklist' },
  ],
  examples: examples.map((example) => ({ id: example.id, label: example.title })),
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

const pageStyles = `
.crossplane-help-page{min-height:100dvh;background:#c0c0c0;padding:0;color:#000;font-family:"MS Sans Serif",Tahoma,"Segoe UI",sans-serif;}
.crossplane-window{width:100%;min-height:100dvh;display:flex;flex-direction:column;background:#c0c0c0;border-top:2px solid #fff;border-left:2px solid #fff;border-right:2px solid #404040;border-bottom:2px solid #404040;box-sizing:border-box;}
.crossplane-titlebar{position:relative;display:flex;align-items:center;min-height:24px;padding:2px 6px;background:linear-gradient(90deg,#000080 0%,#1084d0 100%);color:#fff;font-size:13px;font-weight:700;}
.crossplane-title-text{position:absolute;left:50%;transform:translateX(-50%);max-width:calc(100% - 92px);overflow:hidden;white-space:nowrap;text-overflow:ellipsis;pointer-events:none;font-size:15px;}
.crossplane-title-controls{display:flex;gap:2px;margin-left:auto;}
.crossplane-control{width:18px;height:16px;border-top:1px solid #fff;border-left:1px solid #fff;border-right:1px solid #404040;border-bottom:1px solid #404040;background:#c0c0c0;color:#000;display:inline-flex;align-items:center;justify-content:center;text-decoration:none;font-size:11px;line-height:1;cursor:pointer;padding:0;}
.crossplane-tabs{display:flex;flex-wrap:wrap;gap:1px;padding:6px 8px 0;}
.crossplane-tab{border-top:1px solid #fff;border-left:1px solid #fff;border-right:1px solid #404040;border-bottom:none;background:#b6b6b6;padding:5px 10px 4px;font-size:12px;cursor:pointer;}
.crossplane-tab.active{position:relative;top:1px;background:#fff;}
.crossplane-main{flex:1;min-height:0;display:grid;grid-template-columns:240px minmax(0,1fr);border-top:1px solid #404040;background:#fff;}
.crossplane-toc{overflow:auto;padding:12px;background:#f1f1f1;border-right:1px solid #808080;}
.crossplane-toc-title{margin:0 0 10px;font-size:12px;font-weight:700;}
.crossplane-toc-list{margin:0;padding:0;list-style:none;}
.crossplane-toc-list li{margin:0 0 8px;}
.crossplane-toc-list a{color:#000;text-decoration:none;font-size:12px;}
.crossplane-toc-list a:hover{text-decoration:underline;}
.crossplane-content{overflow:auto;padding:14px 20px 20px;}
.crossplane-doc-title{margin:0 0 12px;font-size:20px;font-weight:700;}
.crossplane-section{margin:0 0 20px;}
.crossplane-heading{margin:0 0 8px;font-size:16px;font-weight:700;}
.crossplane-subheading{margin:0 0 6px;font-size:13px;font-weight:700;}
.crossplane-content p,.crossplane-content li{font-size:12px;line-height:1.5;}
.crossplane-content p{margin:0 0 10px;}
.crossplane-content ul{margin:0 0 10px 20px;padding:0;}
.crossplane-divider{border:0;border-top:1px solid #d0d0d0;margin:14px 0;}
.crossplane-codebox{margin:6px 0 10px;padding:8px;background:#f4f4f4;border-top:2px solid #808080;border-left:2px solid #808080;border-right:2px solid #fff;border-bottom:2px solid #fff;}
.crossplane-codebox code{display:block;white-space:pre;font-family:"Courier New",Courier,monospace;font-size:12px;}
@media (max-width:900px){.crossplane-main{grid-template-columns:1fr}.crossplane-toc{border-right:none;border-bottom:1px solid #808080}}
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
            <button className="crossplane-control" type="button" aria-label="Minimize" onClick={handleMinimize}>_</button>
            <Link to="/algoViz" className="crossplane-control" aria-label="Close">X</Link>
          </div>
        </header>
        <div className="crossplane-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button key={tab.id} type="button" className={`crossplane-tab ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)} role="tab" aria-selected={activeTab === tab.id}>
              {tab.label}
            </button>
          ))}
        </div>
        <div className="crossplane-main">
          <aside className="crossplane-toc" aria-label="Table of contents">
            <h2 className="crossplane-toc-title">Contents</h2>
            <ul className="crossplane-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}><a href={`#${section.id}`}>{section.label}</a></li>
              ))}
            </ul>
          </aside>
          <main className="crossplane-content">
            <h1 className="crossplane-doc-title">Crossplane</h1>
            {introParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {activeTab === 'big-picture' && <>
              <section id="bp-overview" className="crossplane-section">
                <h2 className="crossplane-heading">Overview</h2>
                {bigPicture.map((item) => <div key={item.title}><h3 className="crossplane-subheading">{item.title}</h3><p>{item.details}</p><p>{item.notes}</p></div>)}
              </section>
              <hr className="crossplane-divider" />
              <section id="bp-takeaways" className="crossplane-section">
                <h2 className="crossplane-heading">Key Takeaways</h2>
                {adoptionGuide.map((item) => <p key={item.title}><strong>{item.title}:</strong> {item.choice}</p>)}
                <ul>{keyTakeaways.map((item) => <li key={item}>{item}</li>)}</ul>
              </section>
            </>}
            {activeTab === 'core-concepts' && <>
              {coreSections.map((section) => (
                <section key={section.id} id={section.id} className="crossplane-section">
                  <h2 className="crossplane-heading">{section.title}</h2>
                  {section.paragraphs.map((paragraph) => <p key={`${section.id}-${paragraph}`}>{paragraph}</p>)}
                </section>
              ))}
              <section id="core-checklist" className="crossplane-section">
                <h2 className="crossplane-heading">Design Checklist</h2>
                <ul>{designChecklist.map((item) => <li key={item}>{item}</li>)}</ul>
              </section>
            </>}
            {activeTab === 'examples' && <>
              {examples.map((example) => (
                <section key={example.id} id={example.id} className="crossplane-section">
                  <h2 className="crossplane-heading">{example.title}</h2>
                  <div className="crossplane-codebox"><code>{example.code.trim()}</code></div>
                  <p>{example.explanation}</p>
                </section>
              ))}
            </>}
            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="crossplane-section">
                <h2 className="crossplane-heading">Glossary</h2>
                {glossary.map((item) => <p key={item.term}><strong>{item.term}:</strong> {item.definition}</p>)}
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
