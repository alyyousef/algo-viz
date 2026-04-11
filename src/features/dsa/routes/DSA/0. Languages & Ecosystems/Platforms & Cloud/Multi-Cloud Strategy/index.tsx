import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
type SectionNote = { title: string; details: string; notes: string }
type NarrativeSection = { id: string; title: string; paragraphs: string[] }
type ExampleSection = { id: string; title: string; code: string; explanation: string }
type GlossaryTerm = { term: string; definition: string }

const introParagraphs = [
  'Multi-cloud strategy is not just "use more than one cloud." It is the organizational, architectural, and operational decision about why multiple clouds are involved, which workloads belong where, what portability is actually required, and how the platform manages the resulting complexity.',
  'That matters because multi-cloud can solve real problems such as regional availability, regulatory boundaries, acquisition-driven platform sprawl, or supplier concentration risk. It can also create expensive duplication, weaker abstractions, and harder operations when adopted as a slogan rather than a strategy.',
  'This page treats multi-cloud as a platform topic. The focus is on strategy drivers, architecture patterns, portability boundaries, identity and networking, data gravity, tooling choices, governance, tradeoffs, and the difference between deliberate multi-cloud design and accidental cloud sprawl.',
]

const bigPicture: SectionNote[] = [
  {
    title: 'What it is',
    details:
      'Multi-cloud strategy is the deliberate use of more than one cloud provider for a platform, workload portfolio, or operating model. The strategy includes placement rules, portability expectations, platform abstractions, security boundaries, and operational processes across those clouds.',
    notes:
      'The key word is strategy. Simply having resources in two clouds because of history or vendor drift is not the same thing as having a coherent multi-cloud operating model.',
  },
  {
    title: 'Why organizations pursue it',
    details:
      'Organizations pursue multi-cloud for resilience, regulatory segmentation, acquisition integration, geographic coverage, specialized managed services, or to reduce concentration risk on a single provider.',
    notes:
      'Those are legitimate drivers, but they vary in importance. A platform that treats all of them as equally strong reasons will often overbuild abstraction layers for weak business needs.',
  },
  {
    title: 'Where it fits',
    details:
      'Multi-cloud fits when the business has a concrete reason to place workloads across different providers or to preserve optionality on selected parts of the stack. It also fits when one cloud cannot realistically satisfy all regulatory, geographic, or service requirements.',
    notes:
      'It fits best when the platform is explicit about which layers must be portable and which layers may remain provider-specific.',
  },
  {
    title: 'What it is not',
    details:
      'Multi-cloud is not automatically safer, cheaper, or more modern. It does not mean every workload must be portable, and it does not mean the platform should hide every provider difference behind a false uniform API.',
    notes:
      'The most common mistake is assuming that "support more clouds" is itself a strategy. Without defined goals and boundaries, it usually becomes an expensive way to multiply platform complexity.',
  },
]

const keyTakeaways = [
  'Multi-cloud strategy is about business drivers, placement rules, and operational boundaries, not just about using two providers.',
  'Real portability is selective. Forcing every layer to be portable usually weakens the platform more than it helps.',
  'Identity, networking, observability, state, and data movement are often harder than compute placement itself.',
  'Provider-specific services can still be the right choice if the platform is honest about where portability stops.',
  'A good multi-cloud strategy reduces business risk without creating uncontrolled technical sprawl.',
]

const coreSections: NarrativeSection[] = [
  {
    id: 'core-drivers',
    title: 'Business drivers and strategic fit',
    paragraphs: [
      'A real multi-cloud strategy starts with explicit business reasons. Resilience targets, sovereignty or residency rules, acquisitions, regional presence, or negotiating leverage are stronger reasons than vague fear of vendor lock-in alone.',
      'This matters because the right architecture depends on the driver. A resilience-driven strategy looks different from a sovereignty-driven strategy, and both look different from an acquisition-integration strategy.',
      'The platform should therefore ask not "can we run on multiple clouds?" but "which workloads, for which reason, at what cost, and under which operational model?"',
    ],
  },
  {
    id: 'core-portability',
    title: 'Portability boundaries and abstraction honesty',
    paragraphs: [
      'Not every part of the stack needs the same level of portability. Compute platforms, deployment workflows, observability pipelines, and application runtimes may be portable enough, while databases, identity services, analytics, or messaging layers remain intentionally provider-specific.',
      'Good multi-cloud design chooses where to normalize and where to specialize. It is often better to standardize on platform contracts such as container runtime, deployment interfaces, or service APIs than to pretend every managed service can be abstracted cleanly.',
      'Abstraction honesty matters. A platform that hides real provider differences behind a fake common model may look elegant on paper while making debugging, cost analysis, and incident response much harder in practice.',
    ],
  },
  {
    id: 'core-architecture',
    title: 'Architecture patterns and workload placement',
    paragraphs: [
      'Multi-cloud architectures vary widely. Some organizations use one primary cloud and one secondary cloud for selected failover or regulatory workloads. Others split product domains by cloud. Others support one platform pattern that can be instantiated in different clouds without keeping every workload active in both.',
      'Those choices change everything about networking, deployment cadence, and operations. Active-active across clouds is far more demanding than cloud-per-domain, and cold standby is very different from provider choice at deployment time.',
      'A platform should make placement rules explicit: which workloads may run anywhere, which are pinned for regulatory reasons, which depend on provider-native services, and which layers are standardized across all clouds.',
    ],
  },
  {
    id: 'core-identity',
    title: 'Identity, networking, and trust boundaries',
    paragraphs: [
      'Identity and networking are often where multi-cloud platforms become operationally real. The platform must decide how identities map across providers, how service-to-service trust works, how private connectivity is established, and how traffic policy is enforced across cloud boundaries.',
      'This is not just a connectivity question. It shapes incident response, zero-trust policy, secret distribution, certificate management, and the blast radius of security mistakes.',
      'A weak multi-cloud strategy often focuses on deployment tooling first and leaves identity and trust as an afterthought. That usually produces a platform that looks portable in CI but is brittle in production.',
    ],
  },
  {
    id: 'core-data',
    title: 'Data gravity, consistency, and state',
    paragraphs: [
      'Data is usually the least portable part of a multi-cloud system. Databases, object storage, analytics systems, and event streams have replication, latency, consistency, and cost characteristics that make cross-cloud operation significantly harder than duplicating stateless compute.',
      'The platform should therefore be precise about where data lives, what must replicate, what can be asynchronously copied, and which workloads should follow the data instead of forcing the data to follow the workloads.',
      'Many failed multi-cloud designs underestimate data gravity. Moving container workloads between clouds is often easy compared with moving large, stateful, or compliance-sensitive datasets safely.',
    ],
  },
  {
    id: 'core-tooling',
    title: 'Tooling, control planes, and operational model',
    paragraphs: [
      'Tool choice shapes multi-cloud strategy, but no tool solves it alone. Containers, orchestration, Terraform, Pulumi, Crossplane, service meshes, and identity systems can help create consistent layers across clouds, but they do not eliminate provider differences.',
      'The important question is which control plane owns what. Infrastructure deployment, application delivery, policy enforcement, and runtime operations may each have different tools, and those layers need clear contracts instead of accidental overlap.',
      'A healthy multi-cloud platform uses tools to implement the strategy, not to substitute for it. Buying or adopting one more abstraction layer does not make the workload model, data model, or business rationale coherent by itself.',
    ],
  },
  {
    id: 'core-operations',
    title: 'Governance, cost, and operating tradeoffs',
    paragraphs: [
      'Multi-cloud always increases cognitive load. Teams must understand more APIs, more billing models, more IAM systems, more failure modes, and more integration points. Governance must therefore include not only security and policy but also ownership clarity, documentation quality, and supportability.',
      'Cost is also more complex than a single-cloud comparison suggests. Duplicate tooling, duplicated expertise, data transfer, replication, observability pipelines, and platform headcount all matter. A strategy that lowers concentration risk may still increase day-to-day operating cost substantially.',
      'That does not make multi-cloud wrong. It means the organization should treat it as a real tradeoff with explicit budget, staffing, and platform consequences rather than as an aspirational architecture badge.',
    ],
  },
  {
    id: 'core-compare',
    title: 'Compare and contrast',
    paragraphs: [
      'Compared with single-cloud strategy, multi-cloud can improve flexibility and reduce provider concentration risk, but it also raises complexity in identity, networking, operations, and data movement.',
      'Compared with hybrid cloud, multi-cloud usually focuses on public-cloud-to-public-cloud strategy rather than on cloud plus on-prem environments, though some platforms need both at once.',
      'Compared with provider-specific optimization, multi-cloud often sacrifices access to the deepest managed-service advantages in exchange for strategic flexibility. The platform needs to be deliberate about where that trade is worth making.',
    ],
  },
  {
    id: 'core-pitfalls',
    title: 'Common failure modes',
    paragraphs: [
      'Teams get into trouble when they promise full portability for every workload, adopt a lowest-common-denominator platform that erases useful provider strengths, or spread teams across multiple clouds without enough operational depth in any of them.',
      'Another common mistake is mistaking accidental cloud sprawl for strategy. If the organization inherited two clouds but has no clear placement, policy, or support model, it has a consolidation problem or a portfolio problem, not yet a multi-cloud strategy.',
      'The hard part is therefore not connecting two APIs. It is making deliberate decisions about what must be common, what may be specialized, and what the organization is actually willing to pay to support across clouds.',
    ],
  },
]

const designChecklist = [
  'Start with explicit business drivers and map them to specific workload and platform requirements.',
  'Be selective about portability; do not force every layer into the same abstraction model.',
  'Design identity, networking, and trust boundaries early instead of treating them as integration cleanup.',
  'Assume state and data movement will be the hardest part of the strategy and plan accordingly.',
  'Measure multi-cloud success in business resilience and operational clarity, not only in the number of providers supported.',
]

const examples: ExampleSection[] = [
  {
    id: 'example-placement',
    title: 'Document workload placement rules explicitly',
    code: `placement_rules:
  customer-data-services:
    allowed_clouds: [aws, azure]
    reason: residency_and_contractual_controls
  analytics-batch:
    allowed_clouds: [gcp]
    reason: managed_data_platform_dependency
  public-web-edge:
    allowed_clouds: [aws, gcp]
    reason: regional_resilience`,
    explanation:
      'A real multi-cloud platform needs placement rules, not just support claims. This kind of policy makes the business reason for cloud placement visible instead of leaving decisions implicit.',
  },
  {
    id: 'example-abstraction',
    title: 'Define a portable platform contract selectively',
    code: `platform_contract:
  compute:
    standard: containerized_http_service
  deployment:
    standard: gitops_release_workflow
  observability:
    standard: shared_metrics_and_trace_schema
  databases:
    standard: provider_specific_by_domain`,
    explanation:
      'This is the core multi-cloud design move: standardize only the layers that truly need a shared contract, and explicitly allow specialization where portability would be too expensive or too weak.',
  },
  {
    id: 'example-network',
    title: 'Model cross-cloud trust and traffic boundaries',
    code: `trust_model:
  identity_provider: central_oidc
  east_west_traffic:
    allowed_paths:
      - service_mesh_gateway
      - private_interconnect
  external_ingress:
    policy: cloud_local_edge_then_platform_auth`,
    explanation:
      'Identity and networking are where many multi-cloud strategies fail. The platform must define how services trust each other and how traffic moves across cloud boundaries before portability claims are credible.',
  },
  {
    id: 'example-ops',
    title: 'Track strategy cost and ownership',
    code: `operating_model:
  ownership:
    platform_team: common_runtime_and_policy
    domain_teams: workload_specific_cloud_decisions
  review_metrics:
    - cross_cloud_data_transfer_cost
    - duplicated_service_ownership
    - incident_recovery_time
    - policy_exception_count`,
    explanation:
      'A multi-cloud strategy is operational, not only architectural. Ownership and success metrics need to be defined so the strategy can be judged against actual outcomes rather than against abstract optionality.',
  },
]

const glossary: GlossaryTerm[] = [
  {
    term: 'Multi-cloud',
    definition:
      'A deliberate strategy for using more than one cloud provider with defined placement, operational, and governance rules.',
  },
  {
    term: 'Portability',
    definition:
      'The extent to which workloads, interfaces, or platform patterns can move across providers without major redesign.',
  },
  {
    term: 'Data gravity',
    definition:
      'The tendency for applications and services to stay close to large or operationally expensive-to-move datasets.',
  },
  {
    term: 'Concentration risk',
    definition: 'Business or operational exposure caused by heavy dependence on a single provider.',
  },
  {
    term: 'Placement rule',
    definition:
      'A policy or design constraint that determines where a workload or service is allowed to run.',
  },
  {
    term: 'Provider-specific service',
    definition:
      'A managed capability whose interface or operating model is tied closely to one cloud provider.',
  },
  {
    term: 'Hybrid cloud',
    definition:
      'An operating model that spans cloud environments and on-prem systems, distinct from public-cloud-to-public-cloud multi-cloud.',
  },
  {
    term: 'Control plane',
    definition:
      'The tooling and processes that define, deploy, and govern infrastructure and application behavior across clouds.',
  },
  {
    term: 'Residency',
    definition:
      'A legal or policy requirement about where data or workloads may be stored or processed.',
  },
  {
    term: 'Abstraction honesty',
    definition:
      'The practice of acknowledging where provider differences remain real instead of hiding them behind misleading common interfaces.',
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
    { id: 'core-drivers', label: 'Drivers and Fit' },
    { id: 'core-portability', label: 'Portability Boundaries' },
    { id: 'core-architecture', label: 'Architecture Patterns' },
    { id: 'core-identity', label: 'Identity and Networking' },
    { id: 'core-data', label: 'Data and State' },
    { id: 'core-tooling', label: 'Tooling and Control Planes' },
    { id: 'core-operations', label: 'Governance and Cost' },
    { id: 'core-compare', label: 'Compare and Contrast' },
    { id: 'core-pitfalls', label: 'Pitfalls' },
    { id: 'core-checklist', label: 'Design Checklist' },
  ],
  examples: examples.map((example) => ({ id: example.id, label: example.title })),
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function MultiCloudStrategyPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Multi-Cloud Strategy',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Multi-Cloud Strategy"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Multi-Cloud Strategy</h1>
      {introParagraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            {bigPicture.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.details}</p>
                <p>{item.notes}</p>
              </div>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-why" className="bin98-section">
            <h2 className="bin98-heading">Why It Matters</h2>
            <p>
              Cloud strategy is ultimately a business and platform operating decision. Multi-cloud
              matters because some organizations genuinely need provider diversity, workload
              placement flexibility, or regulatory separation, but they only benefit if those needs
              are translated into clear technical boundaries and ownership rules.
            </p>
            <p>
              Without that discipline, multi-cloud becomes a source of duplicated effort and hidden
              cost. The platform has to know where common layers help, where provider specificity is
              acceptable, and which outcomes justify the extra operational burden.
            </p>
          </section>
          <hr className="bin98-divider" />
          <section id="bp-takeaways" className="bin98-section">
            <h2 className="bin98-heading">Key Takeaways</h2>
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
          {coreSections.map((section) => (
            <section key={section.id} id={section.id} className="bin98-section">
              <h2 className="bin98-heading">{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={`${section.id}-${paragraph}`}>{paragraph}</p>
              ))}
            </section>
          ))}
          <section id="core-checklist" className="bin98-section">
            <h2 className="bin98-heading">Design Checklist</h2>
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
            <section key={example.id} id={example.id} className="bin98-section">
              <h2 className="bin98-heading">{example.title}</h2>
              <div className="bin98-codebox">
                <code>{example.code.trim()}</code>
              </div>
              <p>{example.explanation}</p>
            </section>
          ))}
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
