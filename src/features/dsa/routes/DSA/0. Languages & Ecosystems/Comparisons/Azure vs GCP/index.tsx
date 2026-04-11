import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

type DocSection = {
  id: string
  title: string
  paragraphs?: string[]
  bullets?: string[]
}

type ExampleItem = {
  id: string
  title: string
  summary: string
  azureCode: string
  gcpCode: string
  explanation: string
}

type GlossaryItem = {
  term: string
  definition: string
}

const pageTitle = 'Azure vs GCP'
const pageSubtitle =
  'Comparing the Microsoft-centered enterprise cloud with the Google-centered data and platform cloud.'
const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const bigPictureSections: DocSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Azure and Google Cloud Platform are both full hyperscale clouds capable of running serious production systems across compute, storage, networking, databases, analytics, AI, observability, and security. The real comparison is not whether one can host modern workloads and the other cannot. Both can. The useful comparison is about platform shape, management model, surrounding vendor gravity, and which type of organization each cloud makes easier to operate.',
      'Azure is usually experienced as the cloud that integrates most naturally with Microsoft-heavy enterprises. It feels especially strong where Microsoft Entra ID, Windows Server, SQL Server, .NET, Microsoft 365, centralized governance, and hybrid datacenter realities are already first-class concerns. GCP is usually experienced as the cloud with especially strong credibility around data platforms, analytics, Kubernetes, Cloud Run, developer ergonomics, and a networking model that many engineers find cleaner and more coherent.',
      'A useful shorthand is this: Azure usually wins when cloud is one part of a broader Microsoft operating environment; GCP usually wins when the team values strong data-platform gravity, Kubernetes lineage, modern app-platform ergonomics, and a cloud experience that often feels more streamlined and opinionated.',
    ],
  },
  {
    id: 'bp-philosophy',
    title: 'Philosophy Difference',
    paragraphs: [
      'Azure often feels management-plane-first and enterprise-governance-first. Azure Resource Manager, subscriptions, management groups, resource groups, RBAC, policies, and Microsoft Entra identity all make the platform feel strongly tied to organizational administration. Even when Azure is used for modern cloud-native systems, the surrounding experience often remains visibly connected to control, structure, and enterprise continuity.',
      'GCP often feels systems-first and platform-coherence-first. Projects, folders, organization hierarchy, global VPC design, managed data products, GKE, and Cloud Run create a platform experience that many engineers perceive as cleaner and more opinionated. GCP still has complexity, but it often feels like it wants to reduce the number of competing platform stories, especially in data and application deployment.',
      'That is why Azure often feels like cloud inside a broader Microsoft estate, while GCP often feels like a cloud platform optimized around modern data, container, and developer workflows.',
    ],
  },
  {
    id: 'bp-where',
    title: 'Where Each Fits Best',
    paragraphs: [
      'Azure is especially strong for enterprises already standardized on Microsoft identity, collaboration, and infrastructure tooling; organizations with meaningful Windows or .NET investments; regulated environments with centralized governance; and hybrid estates that still depend on on-prem infrastructure and administrative continuity.',
      'GCP is especially strong for data-heavy products, analytics and ML organizations, teams that care deeply about Kubernetes and Cloud Run, engineers who prefer a simpler project hierarchy and global networking model, and companies whose platform culture is closer to modern developer products than to classic enterprise systems management.',
      'If the central question is Which cloud best extends a Microsoft-shaped enterprise operating model, Azure usually has the edge. If the central question is Which cloud best fits data-platform-heavy and Kubernetes-heavy engineering culture, GCP usually has the edge.',
    ],
  },
  {
    id: 'bp-quick-picks',
    title: 'Quick Decision Guide',
    bullets: [
      'Choose Azure when Microsoft identity, Windows, .NET, SQL Server, and enterprise governance are first-class constraints.',
      'Choose GCP when data platforms, BigQuery-style analytics, Cloud Run, and Kubernetes posture matter most.',
      'Choose Azure when hybrid continuity and procurement alignment with Microsoft materially lower organizational friction.',
      'Choose GCP when the team wants a cloud experience that often feels cleaner, more platform-opinionated, and more developer-centric.',
      'If the debate is really about Microsoft ecosystem gravity versus Google data-platform gravity, that is the actual decision boundary.',
    ],
  },
]

const mentalModels = [
  {
    title: 'Azure is management-plane first',
    detail:
      'Its strongest identity is the way subscriptions, resource groups, policy, RBAC, and Microsoft Entra-driven administration fit together.',
  },
  {
    title: 'GCP is project-and-platform first',
    detail:
      'Projects, folders, organization hierarchy, global networking, and tightly positioned data and app services shape the platform strongly.',
  },
  {
    title: 'Identity is a differentiator, not background noise',
    detail:
      'Azure often becomes easier when Microsoft Entra is already central to workforce and app identity. GCP IAM often feels cleaner when teams think in terms of projects and inherited hierarchy.',
  },
  {
    title: 'Network thinking feels different',
    detail:
      'Azure often feels more enterprise-topology and hybrid-connectivity oriented. GCP often feels more globally integrated and less fragmented in everyday network design.',
  },
  {
    title: 'Data platform gravity is a major GCP advantage',
    detail:
      'BigQuery and the broader analytics posture pull many organizations toward GCP when data is central rather than auxiliary.',
  },
  {
    title: 'Hybrid gravity is a major Azure advantage',
    detail:
      'Azure is unusually compelling when cloud adoption must coexist with existing Microsoft infrastructure and administration patterns.',
  },
  {
    title: 'Kubernetes culture matters',
    detail:
      'AKS is strong, but GKE often feels closer to the center of the GCP application platform story because of Googles container lineage.',
  },
  {
    title: 'Cloud choice is organizational architecture',
    detail:
      'The chosen cloud changes IAM, billing, observability, IaC, networking, training, support, and vendor leverage for years.',
  },
]

const coreSections: DocSection[] = [
  {
    id: 'core-platform-shape',
    title: 'Overall Platform Shape',
    paragraphs: [
      'Azure spans the full cloud stack, but it often feels unified through Azure Resource Manager and a centralized administration model. Subscriptions, resource groups, policies, RBAC, management groups, tags, and locks make the platform feel explicitly shaped by control and governance. Even when teams use modern managed services, the experience often stays tied to an overarching Microsoft management story.',
      'GCP also spans the full cloud stack, but it often feels narrower in a productive way. The platform strongly emphasizes projects, global networking, managed data products, GKE, and Cloud Run as especially central stories. Many teams experience this as lower cognitive overhead because fewer overlapping paths compete for mindshare in some categories.',
      'A practical framing is that Azure often feels like a cloud operating environment inside a larger enterprise system, while GCP often feels like a cleaner application and data platform with a strong infrastructure core.',
    ],
  },
  {
    id: 'core-governance',
    title: 'Hierarchy, Governance, and Administrative Scope',
    paragraphs: [
      'Azure commonly organizes through a Microsoft Entra tenant, management groups, subscriptions, resource groups, and resources. Resource groups are especially important because they make lifecycle, ownership, and access boundaries concrete and visible. This often feels intuitive to enterprises because administrators can map governance directly onto business structure and operational process.',
      'GCP organizes through an organization resource, optional folders, and projects. Projects are especially central because APIs, IAM, quotas, billing relationships, and much of everyday ownership flow through them. The hierarchy is powerful, and policies can inherit downward through the tree, but the day-to-day experience often feels more project-centric than Azures resource-group-centric model.',
      'Neither model is inherently better. Azure often feels clearer for centralized administration and enterprise governance. GCP often feels cleaner for product-oriented teams that want projects to be the obvious unit of operational ownership.',
    ],
  },
  {
    id: 'core-identity',
    title: 'Identity, Access Control, and Security Boundaries',
    paragraphs: [
      'Azure identity often begins with Microsoft Entra ID and then extends into Azure RBAC, managed identities, groups, conditional access, policy, and the broader Microsoft security estate. For organizations already using Microsoft identity across workforce access, devices, collaboration tools, and applications, Azure often feels like a natural continuation of existing identity operations rather than a separate cloud-specific world.',
      'GCP IAM is also powerful, but many teams find the mental model cleaner because it sits naturally on top of the organization-folder-project hierarchy. Policies inherit through the tree, and project boundaries are highly visible in day-to-day cloud work. The model still requires discipline, but it often feels less entangled with a wider non-cloud enterprise identity ecosystem.',
      'Azure usually has the advantage when identity must align tightly with a Microsoft-wide operating model. GCP often has the advantage when teams want permissions to map cleanly onto projects and platform resources without bringing in broader vendor gravity.',
    ],
  },
  {
    id: 'core-networking',
    title: 'Networking, Global Reach, and Connectivity Model',
    paragraphs: [
      'Azure networking revolves around VNets, subnets, network security groups, route tables, private endpoints, ExpressRoute, VPN, and hub-and-spoke or enterprise topology patterns. The platform is fully capable for internet-scale cloud systems, but the operational feel is often strongly connected to hybrid connectivity and centralized administration.',
      'GCP networking is one of its most distinctive features. VPCs are global resources, while subnets are regional. Many engineers find that model conceptually cleaner because the private network can span regions without forcing the same style of regional network fragmentation that teams often end up managing elsewhere. Combined with Googles network posture, this gives GCP a notably different feel in multi-region design.',
      'In raw capability terms both clouds are strong. In operational feel, Azure networking often feels enterprise-topology-first, while GCP networking often feels platform-global-first.',
    ],
  },
  {
    id: 'core-compute',
    title: 'Compute Options and Application Hosting',
    paragraphs: [
      'Azure offers Virtual Machines, App Service, Azure Kubernetes Service, Azure Container Apps, Azure Functions, and other hosting paths. The lineup is broad, but the platform often feels especially natural for enterprise web applications, internal services, and workloads that benefit from tight integration with Microsoft identity, monitoring, and developer workflows.',
      'GCP offers Compute Engine, GKE, Cloud Run, Cloud Functions, and App Engine. Many teams find the compute story easier to reason about because Cloud Run and GKE are so clearly positioned for modern application hosting. The path from containerized application to managed deployment often feels especially direct on GCP.',
      'If the team wants compute that fits cleanly into Microsoft app-platform patterns, Azure is strong. If the team wants compute and app hosting that emphasize modern containerized deployment with minimal platform ambiguity, GCP often feels stronger.',
    ],
  },
  {
    id: 'core-storage',
    title: 'Storage, Files, and Object Storage',
    paragraphs: [
      'Azure Blob Storage and Google Cloud Storage are both durable, scalable object stores used for application assets, logs, archives, backup, and analytics staging. Blob Storage sits naturally inside the broader Azure storage and identity model. Cloud Storage sits naturally beside GCP analytics, Cloud Run workloads, and broader data-platform services.',
      'Azure also provides managed disks, Azure Files, and surrounding storage services that often fit well with Windows and enterprise application hosting. GCP provides persistent disks, Cloud Storage tiers, and storage patterns that often feel especially straightforward for modern cloud-native applications and analytics systems.',
      'The deeper difference is not whether one cloud can store unstructured data and the other cannot. The difference is how naturally storage integrates into the surrounding application, analytics, identity, and governance model each cloud encourages.',
    ],
  },
  {
    id: 'core-data',
    title: 'Databases, Analytics, and Data Platform Gravity',
    paragraphs: [
      'Azure has Azure SQL Database, Cosmos DB, managed PostgreSQL and MySQL options, Synapse, and strong ties into the broader Microsoft data ecosystem. For enterprises already invested in SQL Server, Power BI, Microsoft reporting workflows, and identity-centered governance, Azure often reduces friction because the data platform feels culturally aligned with the rest of the estate.',
      'GCP has strong managed relational options too, but its reputation is especially shaped by BigQuery and the broader managed analytics posture. For many organizations, GCP becomes unusually attractive when the product itself is fundamentally data-heavy, analytics-heavy, event-processing-heavy, or ML-heavy. The cloud often feels optimized around that reality rather than merely supporting it as one workload class among many.',
      'If the organization wants data services that line up neatly with Microsoft enterprise systems, Azure is compelling. If the organization wants one of the clearest analytics-first public cloud stories, GCP is often the stronger instinctive choice.',
    ],
  },
  {
    id: 'core-containers',
    title: 'Containers, Kubernetes, and App Platform Direction',
    paragraphs: [
      'Azure Kubernetes Service is a strong managed Kubernetes offering, and Azure also gives teams App Service and Container Apps for different operational preferences. In many Azure shops, Kubernetes is one option inside a larger application platform menu rather than the single center of gravity. The overall question is often how well AKS fits with Microsoft networking, identity, policy, and operational tooling.',
      'GKE is one of the major reasons many teams take GCP seriously in the first place. Because Googles platform identity is deeply connected to container orchestration lineage, GKE often feels closer to the center of the cloud story. Cloud Run then complements GKE by giving teams a strong serverless container path for workloads that do not justify cluster operations.',
      'Azure is strong when Kubernetes must fit into a broader enterprise-hosting picture. GCP is strong when Kubernetes and serverless containers are central to the application platform strategy itself.',
    ],
  },
  {
    id: 'core-serverless',
    title: 'Serverless and Modern Deployment Style',
    paragraphs: [
      'Azure Functions is a capable event-driven serverless platform and often feels especially natural when tied to Azure storage, Azure identity, monitoring, and enterprise application workflows. It is part of a wider Microsoft application platform story rather than a standalone ideology.',
      'GCP offers Cloud Functions, but many teams increasingly think about GCP serverless through Cloud Run as much as through function-specific products. Cloud Run matters because it makes a serverless container model feel direct, portable at the container boundary, and well aligned with modern API and service deployment patterns.',
      'The difference in feel is important. Azure serverless often feels like a mode inside a broader enterprise platform. GCP serverless often feels like a first-class modern deployment style for containerized services and APIs.',
    ],
  },
  {
    id: 'core-devops',
    title: 'Infrastructure as Code, Delivery, and Automation',
    paragraphs: [
      'Azure supports Bicep, ARM templates, Terraform, Azure DevOps, GitHub Actions, and policy-driven governance automation. Bicep is particularly important because it provides a first-party declarative model tightly aligned with Azure Resource Manager. For Microsoft-heavy organizations, this can create a very coherent story from infrastructure description to governance enforcement to deployment workflow.',
      'GCP also works well with Terraform and related automation approaches, and many teams find the project model and product surface easier to automate coherently because the platform often feels less sprawling. Google also pushes strongly on developer workflows that connect code, artifacts, containers, and deployment around modern application paths.',
      'If the organization wants first-party infrastructure authoring integrated tightly with policy and Microsoft development tooling, Azure often has the advantage. If the team wants a simpler-feeling project model and modern app-delivery ergonomics, GCP often feels more streamlined.',
    ],
  },
  {
    id: 'core-observability',
    title: 'Observability, Security Operations, and Day-2 Work',
    paragraphs: [
      'Azure provides Azure Monitor, Log Analytics, Application Insights, Activity Log, Defender for Cloud, and related security and observability tooling that often feels closely connected to the Azure management plane. For enterprise teams this is attractive because identity, policy, posture, logging, and monitoring are surfaced inside a centralized administrative story.',
      'GCP provides Cloud Logging, Cloud Monitoring, audit logging, and integrated operations tooling that many teams find comparatively streamlined because the project hierarchy and platform shape make operational boundaries easier to reason about. The tools are serious enough for production, but they often feel less wrapped in a broad enterprise administration culture than Azures do.',
      'Azure often rewards centralized governance and operations discipline. GCP often rewards teams that want fewer conceptual layers between workload ownership and observability setup.',
    ],
  },
  {
    id: 'core-pricing',
    title: 'Pricing, Cost Management, and Procurement Reality',
    paragraphs: [
      'Both Azure and GCP have complex pricing because hyperscale cloud pricing is inherently complex. Compute, managed databases, storage tiers, network egress, observability, support plans, and commitment models all matter. Any comparison based on a single benchmark or isolated anecdote is weak analysis.',
      'Azure pricing conversations often include enterprise agreements, Microsoft licensing posture, Azure Hybrid Benefit, and the economic effect of consolidating more spend inside a broader Microsoft relationship. GCP pricing conversations more often emphasize sustained use, committed use, workload fit, and whether the cleaner platform shape leads to lower operational overhead for the specific architecture in question.',
      'So cost is not just a rate-card issue. It is a combination of workload shape, vendor leverage, licensing posture, egress behavior, platform efficiency, and how much the organization values consolidating strategic spend with an existing vendor.',
    ],
  },
  {
    id: 'core-hybrid',
    title: 'Hybrid, Migration Path, and Existing Estate Continuity',
    paragraphs: [
      'Azure is unusually strong when cloud adoption must coexist with an existing Microsoft-heavy estate rather than replace it outright. If the organization still has on-prem Windows systems, existing Active Directory or Entra-connected workflows, SQL Server history, or centralized administration practices that cannot be abandoned overnight, Azure often lowers both political and operational migration friction.',
      'GCP can absolutely participate in hybrid and migration strategies, but hybrid continuity is not usually the first sentence people use to describe the platform. GCP is more commonly selected because teams want its data, platform, and network qualities rather than because it feels like the most natural bridge from an existing Microsoft estate.',
      'If the organization is incrementally modernizing a Microsoft-shaped enterprise, Azure usually deserves serious weight. If the organization is free to optimize more directly for platform quality and data gravity, GCP often becomes more attractive.',
    ],
  },
  {
    id: 'core-global',
    title: 'Global Reach, Regions, and Failure Domain Thinking',
    paragraphs: [
      'Azure has a broad global footprint, regions, availability zones, and region-pair guidance. But in practice Azure resiliency conversations often stay visibly tied to enterprise continuity planning and administrative design, not just raw infrastructure placement. The geography is important, but it is often discussed through the wider lens of governance and business continuity.',
      'GCP also operates globally at scale, and because the networking model feels more globally integrated, teams often experience geographic design differently there. Regions and zones still matter, but everyday discussions about private networking and application connectivity can feel less fragmented by those boundaries.',
      'In both clouds, resilient architecture still depends on understanding the specific failure domains of the services you use. Global scale alone is not architecture.',
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Ecosystem, Skills, and Organizational Fit',
    paragraphs: [
      'Azure has enormous strength where the broader vendor relationship already includes identity, collaboration, endpoint management, Windows, SQL Server, developer tooling, and enterprise software contracts. In those environments Azure can remove friction that does not show up in service comparison tables because the advantage is organizational, not just technical.',
      'GCP has a smaller overall enterprise footprint, but it attracts teams with strong data, ML, container, and developer-platform sensibilities. In some organizations GCP simply feels more aligned with how the engineers want to build, even if Azure looks more comfortable politically.',
      'This is why platform choice is not only a feature question. It is also a people, training, procurement, and architecture-culture question.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs and Failure Modes',
    paragraphs: [
      'Azure can become governance-heavy. Teams may end up with an architecture that looks well administered on paper but is operationally muddy in practice because too many decisions are framed through policy and hierarchy rather than through clean service boundaries and clear workload ownership.',
      'GCP can look deceptively simple, which creates a different risk: teams may underestimate how much cloud-specific expertise is still required around IAM, quotas, networking, analytics service behavior, and production operations. Cleaner does not mean simple enough to skip platform discipline.',
      'A poor Azure outcome often looks like administratively standardized complexity. A poor GCP outcome often looks like underestimating production complexity because the platform feels coherent. Both clouds reward serious platform engineering, but they fail in different ways.',
    ],
  },
  {
    id: 'core-checklist',
    title: 'Decision Checklist',
    bullets: [
      'Choose Azure when Microsoft identity, Windows, .NET, SQL Server, and hybrid continuity are hard constraints.',
      'Choose GCP when data platforms, Cloud Run, BigQuery, and Kubernetes-centered application strategy dominate the discussion.',
      'Prefer Azure when procurement, governance, and enterprise continuity with Microsoft materially reduce risk.',
      'Prefer GCP when the engineering team values a cleaner project model, global networking feel, and stronger data-platform gravity.',
      'If the company is deeply Microsoft-shaped, Azure is usually the more natural organizational choice.',
      'If the company is optimizing more directly for developer-platform quality and data-centric architecture, GCP often deserves stronger weight.',
    ],
  },
]

const examples: ExampleItem[] = [
  {
    id: 'ex-vm',
    title: 'Launch a Virtual Machine',
    summary:
      'Both clouds can create a VM quickly, but the command shape already hints at their operational worldview.',
    azureCode: `az vm create \\
  --resource-group app-prod-rg \\
  --name web-01 \\
  --image Ubuntu2204 \\
  --size Standard_B2s \\
  --vnet-name app-prod-vnet \\
  --subnet app \\
  --public-ip-sku Standard`,
    gcpCode: `gcloud compute instances create web-01 \\
  --project app-prod \\
  --zone us-central1-a \\
  --machine-type e2-medium \\
  --subnet default \\
  --image-family debian-12 \\
  --image-project debian-cloud`,
    explanation:
      'Azure makes the resource group impossible to ignore, reflecting its lifecycle and governance model. GCP makes the project boundary explicit, reflecting how central projects are to ownership, IAM, APIs, and billing.',
  },
  {
    id: 'ex-storage',
    title: 'Upload an Object to Cloud Storage',
    summary:
      'Object storage exists on both clouds, but the surrounding account and platform patterns differ.',
    azureCode: `az storage blob upload \\
  --account-name financearchive \\
  --container-name reports \\
  --name 2026/report.csv \\
  --file ./report.csv \\
  --auth-mode login`,
    gcpCode: `gcloud storage cp ./report.csv gs://finance-archive-logs/reports/2026/report.csv`,
    explanation:
      'Azure Blob Storage often feels more explicitly tied to the storage-account and RBAC story. Cloud Storage often feels especially close to broader analytics and application-platform workflows on GCP.',
  },
  {
    id: 'ex-serverless',
    title: 'Define a Simple Serverless Endpoint',
    summary:
      'Serverless exists on both clouds, but the preferred deployment style often feels different.',
    azureCode: `import azure.functions as func

app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)

@app.route(route='hello')
def hello(req: func.HttpRequest) -> func.HttpResponse:
    return func.HttpResponse('hello from azure functions')`,
    gcpCode: `from flask import Flask

app = Flask(__name__)

@app.get('/')
def hello():
    return {'message': 'hello from cloud run'}`,
    explanation:
      'Azure Functions usually feels like one compute mode inside a broader Microsoft application platform. On GCP, many teams increasingly think in terms of Cloud Run as a serverless container target rather than limiting the conversation to function-only deployment.',
  },
  {
    id: 'ex-kubernetes',
    title: 'Create a Managed Kubernetes Cluster',
    summary:
      'Both clouds can run managed Kubernetes, but the cultural weight of the product differs.',
    azureCode: `az aks create \\
  --resource-group app-prod-rg \\
  --name app-prod \\
  --node-count 3 \\
  --generate-ssh-keys`,
    gcpCode: `gcloud container clusters create-auto app-prod \\
  --project app-prod \\
  --region us-central1`,
    explanation:
      'AKS is a strong part of Azures broader app platform menu. GKE often feels closer to the center of GCPs platform identity because of Googles strong container and orchestration lineage.',
  },
]

const glossaryTerms: GlossaryItem[] = [
  {
    term: 'Azure subscription',
    definition:
      'A primary Azure billing and governance boundary under a tenant, often used to separate environments, teams, or business units.',
  },
  {
    term: 'Resource group',
    definition:
      'An Azure logical container for related resources that share lifecycle, access, and management context.',
  },
  {
    term: 'Management group',
    definition:
      'An Azure hierarchy layer above subscriptions used to apply governance and policy across larger environments.',
  },
  {
    term: 'Microsoft Entra ID',
    definition:
      'Microsoft cloud identity platform used for authentication, directory management, application access, and many Azure security scenarios.',
  },
  {
    term: 'GCP project',
    definition:
      'A core Google Cloud management boundary for resources, APIs, billing association, IAM application, quotas, and ownership.',
  },
  {
    term: 'Organization resource',
    definition:
      'The top-level Google Cloud hierarchy node above folders and projects in enterprise environments.',
  },
  {
    term: 'IAM',
    definition:
      'Identity and Access Management, the system each cloud uses to define who can do what on which resources.',
  },
  {
    term: 'VNet',
    definition:
      'An Azure Virtual Network, the foundational private networking boundary for Azure resources and connected services.',
  },
  {
    term: 'VPC',
    definition:
      'A private cloud network construct; on GCP the VPC itself is global and subnets are regional.',
  },
  {
    term: 'Blob Storage',
    definition:
      'Azure object storage for massive-scale unstructured data such as files, media, logs, and archives.',
  },
  {
    term: 'Cloud Storage',
    definition:
      'Google Cloud object storage for durable, scalable unstructured data used by applications, archives, and analytics workflows.',
  },
  {
    term: 'Azure Functions',
    definition:
      'Azures event-driven serverless compute platform for HTTP triggers, timers, queues, storage events, and more.',
  },
  {
    term: 'Cloud Run',
    definition:
      'Google Cloud managed serverless container platform for deploying HTTP services and other containerized workloads.',
  },
  {
    term: 'AKS',
    definition: 'Azure Kubernetes Service, Azure managed Kubernetes.',
  },
  {
    term: 'GKE',
    definition: 'Google Kubernetes Engine, Google Cloud managed Kubernetes.',
  },
  {
    term: 'BigQuery',
    definition:
      'Google Cloud managed analytics warehouse service that is central to many GCP data-platform decisions.',
  },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-philosophy', label: 'Philosophy Difference' },
    { id: 'bp-where', label: 'Where Each Fits' },
    { id: 'bp-quick-picks', label: 'Quick Decision Guide' },
  ],
  'core-concepts': [
    { id: 'core-mental', label: 'Mental Models' },
    { id: 'core-platform-shape', label: 'Platform Shape' },
    { id: 'core-governance', label: 'Governance Model' },
    { id: 'core-identity', label: 'Identity and Access' },
    { id: 'core-networking', label: 'Networking' },
    { id: 'core-compute', label: 'Compute' },
    { id: 'core-storage', label: 'Storage' },
    { id: 'core-data', label: 'Data Platforms' },
    { id: 'core-containers', label: 'Containers and Kubernetes' },
    { id: 'core-serverless', label: 'Serverless' },
    { id: 'core-devops', label: 'IaC and Delivery' },
    { id: 'core-observability', label: 'Observability' },
    { id: 'core-pricing', label: 'Pricing and Cost' },
    { id: 'core-hybrid', label: 'Hybrid and Continuity' },
    { id: 'core-global', label: 'Global Footprint' },
    { id: 'core-ecosystem', label: 'Ecosystem and Fit' },
    { id: 'core-tradeoffs', label: 'Tradeoffs' },
    { id: 'core-checklist', label: 'Decision Checklist' },
  ],
  examples: examples.map((example) => ({ id: example.id, label: example.title })),
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function AzureVsGcpPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Azure Vs Gcp Page',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Azure Vs Gcp Page"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">{pageTitle}</h1>
      <p className="azure-gcp-help-doc-subtitle">{pageSubtitle}</p>
      <p>
        This page compares Azure and GCP as platform choices for real infrastructure, application,
        and organization design. The point is not to memorize service names. The point is to
        understand the deeper tradeoffs: management model, identity, networking, compute,
        data-platform gravity, Kubernetes and serverless posture, procurement reality, hybrid
        continuity, and the type of engineering organization each cloud tends to fit best.
      </p>

      {activeTab === 'big-picture' && (
        <>
          {bigPictureSections.map((section, index) => (
            <section key={section.id} id={section.id} className="bin98-section">
              <h2 className="bin98-heading">{section.title}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets && (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
              {index < bigPictureSections.length - 1 && <hr className="bin98-divider" />}
            </section>
          ))}
        </>
      )}

      {activeTab === 'core-concepts' && (
        <>
          <section id="core-mental" className="bin98-section">
            <h2 className="bin98-heading">Mental Models</h2>
            {mentalModels.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          {coreSections.map((section) => (
            <section key={section.id} id={section.id} className="bin98-section">
              <h2 className="bin98-heading">{section.title}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets && (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </>
      )}

      {activeTab === 'examples' && (
        <>
          {examples.map((example) => (
            <section key={example.id} id={example.id} className="bin98-section">
              <h2 className="bin98-heading">{example.title}</h2>
              <p>{example.summary}</p>
              <h3 className="bin98-subheading">Azure</h3>
              <div className="bin98-codebox">
                <code>{example.azureCode.trim()}</code>
              </div>
              <h3 className="bin98-subheading">GCP</h3>
              <div className="bin98-codebox">
                <code>{example.gcpCode.trim()}</code>
              </div>
              <p>{example.explanation}</p>
            </section>
          ))}
        </>
      )}

      {activeTab === 'glossary' && (
        <section id="glossary-terms" className="bin98-section">
          <h2 className="bin98-heading">Glossary</h2>
          {glossaryTerms.map((item) => (
            <p key={item.term}>
              <strong>{item.term}:</strong> {item.definition}
            </p>
          ))}
        </section>
      )}
    </TopicPageShell>
  )
}
