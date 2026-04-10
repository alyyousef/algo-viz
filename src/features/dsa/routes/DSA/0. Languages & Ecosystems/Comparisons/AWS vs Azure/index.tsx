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
  awsCode: string
  azureCode: string
  explanation: string
}

type GlossaryItem = {
  term: string
  definition: string
}

const pageTitle = 'AWS vs Azure'
const pageSubtitle =
  "Comparing the broadest public cloud platform with Microsoft's enterprise-and-hybrid centric cloud platform."
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
      'AWS and Azure are both hyperscale cloud platforms capable of running serious production systems across compute, storage, networking, databases, analytics, AI, identity, observability, and automation. The useful comparison is not whether one can host modern applications and the other cannot. Both can. The real comparison is about platform shape, management model, surrounding ecosystem gravity, and which kind of organization each cloud makes easier to operate.',
      'AWS is usually experienced as the broadest service catalog with the strongest reputation for cloud-native optionality. It often feels like the reference cloud for modern infrastructure patterns because so many teams learn multi-account design, IAM discipline, event-driven architecture, and managed-service composition there first. Azure is usually experienced as the cloud that integrates most naturally with Microsoft-heavy enterprises, especially where Microsoft Entra ID, Windows Server, SQL Server, .NET, Microsoft 365, and hybrid datacenter realities are already central.',
      'A useful shorthand is this: AWS usually wins on raw cloud breadth and flexible service composition; Azure usually wins when cloud is not an isolated platform decision but part of a broader Microsoft operating model involving identity, governance, developer tooling, collaboration software, and existing enterprise procurement relationships.',
    ],
  },
  {
    id: 'bp-philosophy',
    title: 'Philosophy Difference',
    paragraphs: [
      'AWS historically grew upward from infrastructure primitives and managed services. The result is a platform that often feels highly composable, deeply granular, and willing to give teams several credible ways to solve the same problem. That flexibility is powerful, but it means platform teams must standardize a lot of decisions themselves if they want a coherent organization-wide model.',
      'Azure often feels more management-plane-centered and enterprise-governance-centered. Resource Manager, subscriptions, resource groups, policies, RBAC, management groups, and Microsoft Entra identity all create a platform experience that is visibly tied to administration, organizational hierarchy, and existing enterprise operations. Azure still has strong low-level infrastructure, but it often feels like cloud inside a broader Microsoft control surface rather than cloud as an entirely separate universe.',
      'That is why AWS often feels like the most cloud-native toolbox while Azure often feels like the most natural cloud continuation of a Microsoft estate. Neither framing is absolute, but it explains a large share of real-world preference.',
    ],
  },
  {
    id: 'bp-where',
    title: 'Where Each Fits Best',
    paragraphs: [
      'AWS is especially strong for product companies, SaaS platforms, startups, infrastructure-heavy engineering cultures, and organizations that want the broadest set of managed-service building blocks even if doing so requires more platform design discipline. It is also a common default for teams that want the industrys broadest cloud reference point for new systems and multi-cloud architecture discussions.',
      'Azure is especially strong for enterprises already standardized on Microsoft technologies, organizations with major Windows or .NET investments, regulated environments with centralized governance, hybrid estates that still depend on on-prem infrastructure, and teams whose surrounding collaboration, identity, and procurement life already centers on Microsoft products.',
      'If the central question is Which cloud gives me the deepest general-purpose service menu, AWS usually has the edge. If the central question is Which cloud reduces the most friction in a Microsoft-centered enterprise, Azure usually has the edge.',
    ],
  },
  {
    id: 'bp-quick-picks',
    title: 'Quick Decision Guide',
    bullets: [
      'Choose AWS when maximum service breadth and cloud-native optionality matter most.',
      'Choose Azure when Microsoft identity, Windows, .NET, SQL Server, and enterprise governance matter most.',
      'Choose AWS when your platform team is comfortable standardizing a large service catalog across many accounts.',
      'Choose Azure when your organization wants cloud operations to line up cleanly with existing Microsoft admin and security workflows.',
      'If the debate is really about vendor ecosystem alignment rather than any single service, the surrounding estate is the actual decision boundary.',
    ],
  },
]

const mentalModels = [
  {
    title: 'AWS is service-catalog first',
    detail:
      'Its main advantage is breadth and depth across many specialized cloud services that can be composed in different ways.',
  },
  {
    title: 'Azure is management-plane first',
    detail:
      'Its platform experience strongly emphasizes organization, policy, RBAC, resource grouping, and identity-led administration.',
  },
  {
    title: 'Identity is not a side topic here',
    detail:
      'AWS IAM is powerful and deeply AWS-specific. Azure often becomes easier when Microsoft Entra ID is already central to workforce and app identity.',
  },
  {
    title: 'Hybrid means different things on each cloud',
    detail:
      'AWS has hybrid products, but Azure is unusually strong when on-prem Windows, AD lineage, and enterprise management continuity are still major constraints.',
  },
  {
    title: 'Naming parity does not imply operational parity',
    detail:
      'VMs, object storage, Kubernetes, and serverless exist on both clouds, but their surrounding governance and operational models differ materially.',
  },
  {
    title: 'Azure is often easier politically',
    detail:
      'When the organization already buys heavily from Microsoft, Azure can reduce procurement, security review, and training friction beyond what a feature matrix shows.',
  },
  {
    title: 'AWS is often easier architecturally for cloud-native greenfield systems',
    detail:
      'Many teams find AWS a more natural first home when they want to build from managed cloud primitives outward without inheriting a broader enterprise vendor model.',
  },
  {
    title: 'Cloud choice is organizational architecture',
    detail:
      'The platform you pick changes IAM, networking, IaC, observability, cost controls, skill demand, and vendor leverage for years.',
  },
]

const coreSections: DocSection[] = [
  {
    id: 'core-platform-shape',
    title: 'Overall Platform Shape',
    paragraphs: [
      'AWS presents itself as the broadest and deepest portfolio of cloud capabilities, and in practice that often means there are multiple valid answers to the same architecture question. One workload might reasonably run on EC2, ECS, EKS, Lambda, Fargate, or a higher-level application service. That flexibility is valuable, but it also increases the number of standards a platform team must define.',
      'Azure also spans the full cloud stack, but it often feels more unified through a common management story. Azure Resource Manager, subscriptions, resource groups, management groups, RBAC, policies, locks, and tags create a more visibly centralized control plane. Azure can absolutely be modular and cloud-native, but it tends to foreground organization and governance earlier than AWS does.',
      'A practical way to frame this is that AWS usually feels like a huge cloud toolbox, while Azure often feels like a cloud operating environment that happens to include a large toolbox.',
    ],
  },
  {
    id: 'core-governance',
    title: 'Accounts, Subscriptions, Resource Groups, and Governance',
    paragraphs: [
      'AWS commonly organizes mature environments through many accounts under AWS Organizations and organizational units. Accounts become primary boundaries for billing, isolation, blast-radius control, service control policies, and workload separation. This is strong architecture, but it requires careful design around account topology, cross-account roles, and shared platform services.',
      'Azure commonly organizes through a Microsoft Entra tenant, management groups, subscriptions, resource groups, and policies. Resource groups are especially important because they create a concrete, visible lifecycle and management unit. This often feels intuitive to enterprises because business ownership, access control, and operational grouping are easier to explain through the hierarchy.',
      'Neither model is objectively simpler. AWS accounts provide excellent hard separation. Azure hierarchy and resource groups often make centralized governance more legible. The better choice depends on whether the organization prefers strong account isolation or strongly visible management hierarchy as its default control model.',
    ],
  },
  {
    id: 'core-identity',
    title: 'Identity, Access Control, and Security Boundaries',
    paragraphs: [
      'AWS Identity and Access Management is one of the most important and most difficult parts of AWS. Policies, principals, roles, trust relationships, condition keys, cross-account access, and service-specific permission details are central to secure AWS architecture. Mature AWS organizations invest heavily in IAM design because almost every security boundary eventually depends on it.',
      'Azure identity often starts with Microsoft Entra ID and then extends into Azure RBAC, managed identities, groups, conditional access, privileged identity management, policy, and broader Microsoft security controls. For companies already using Microsoft identity for workforce access, Azure often feels less like a separate permission world and more like an extension of existing identity operations.',
      'AWS often feels more cloud-provider-specific in identity work. Azure often feels more enterprise-identity-integrated. That difference alone can determine platform preference in regulated, centrally managed organizations.',
    ],
  },
  {
    id: 'core-networking',
    title: 'Networking, Global Footprint, and Connectivity Model',
    paragraphs: [
      'AWS networking revolves around VPCs, subnets, route tables, gateways, security groups, network ACLs, load balancers, Transit Gateway, Direct Connect, and region-level design choices. It is mature and powerful, but it expects teams to reason explicitly about many low-level pieces. AWS also documents global infrastructure in terms of Regions and Availability Zones, which makes region and AZ placement central to architecture thinking.',
      'Azure networking revolves around VNets, subnets, network security groups, route tables, private endpoints, ExpressRoute, VPN, load balancers, and hub-and-spoke or enterprise connectivity patterns that often align well with existing datacenter topology. Azure also has broad regional presence, availability zones, and paired-region guidance, but the overall platform experience often keeps networking more visibly tied to centralized administration and hybrid extension.',
      'In raw capability terms both clouds are strong. In operational feel, AWS networking often feels like deep cloud infrastructure engineering. Azure networking often feels more naturally embedded in enterprise topology, governance, and hybrid planning.',
    ],
  },
  {
    id: 'core-compute',
    title: 'Compute Options and Application Hosting',
    paragraphs: [
      'AWS offers EC2 for virtual machines, ECS and EKS for container orchestration, Lambda for serverless, Fargate for serverless containers, and multiple higher-level hosting paths. This gives AWS teams substantial freedom to tune compute choice to workload shape, operating model, and team maturity. It also means there are many overlapping paths, which can create inconsistency without platform standards.',
      'Azure offers Virtual Machines, App Service, Azure Kubernetes Service, Azure Container Apps, Azure Functions, and other platform services. The compute lineup is broad, but it often feels more visibly oriented toward enterprise application hosting and integration with Microsoft development and management tools. App Service and Functions, for example, frequently feel natural in Microsoft-centered application environments.',
      'If the team wants the broadest compute permutation space, AWS usually has the edge. If the team wants compute that sits neatly inside Microsoft identity, governance, and app-platform workflows, Azure often feels more natural.',
    ],
  },
  {
    id: 'core-storage',
    title: 'Storage, Files, and Unstructured Data',
    paragraphs: [
      'Amazon S3 and Azure Blob Storage are both foundational object storage systems used for application assets, archives, logs, analytics staging, and backup patterns. S3 is one of the defining AWS services and sits at the center of many AWS-native event and data architectures. Blob Storage plays a similarly central role in Azure and also underpins broader Azure storage and analytics workflows.',
      'Beyond object storage, AWS provides EBS, EFS, FSx, and several specialized storage paths. Azure provides managed disks, Azure Files, Blob tiers, and related services through the Azure storage family. The broad categories map cleanly, but the surrounding operational details like identity integration, network access, performance tiers, backup posture, and analytics adjacency differ in ways that matter in production.',
      'If the question is simply Can both store data durably at scale, the answer is yes. The real question is how storage interacts with the rest of the platform, especially IAM or RBAC, application hosting, analytics, backup, and cost management.',
    ],
  },
  {
    id: 'core-data',
    title: 'Databases, Analytics, and Data Ecosystem Gravity',
    paragraphs: [
      'AWS has a very broad data portfolio across managed relational databases, DynamoDB, Redshift, streaming services, data lake tooling, and specialized engines. It is excellent for teams that want many data architecture options and are comfortable composing a broader set of managed building blocks.',
      'Azure has Azure SQL Database, Cosmos DB, managed PostgreSQL and MySQL offerings, Synapse, and strong ties into the broader Microsoft data ecosystem. For enterprises already invested in SQL Server, Microsoft reporting, BI tooling, and identity-centric governance, Azure often reduces friction because the data platform feels culturally aligned with the rest of the estate.',
      'The difference is therefore less about raw capability and more about gravity. AWS data decisions often align with cloud-native platform engineering. Azure data decisions often align with enterprises already shaped by Microsoft data and reporting workflows.',
    ],
  },
  {
    id: 'core-containers',
    title: 'Containers, Kubernetes, and Application Platform Direction',
    paragraphs: [
      'Both clouds support containers very well. AWS offers ECS as a proprietary orchestrator and EKS as managed Kubernetes. This gives AWS teams a notable extra decision: choose an AWS-native non-Kubernetes control plane, choose Kubernetes, or support both. That flexibility is useful, but it adds another standardization burden.',
      'Azure centers more visibly on AKS for Kubernetes while also offering App Service and Container Apps for different operational preferences. In Microsoft-heavy shops, the container platform often feels like one piece of a larger application hosting picture rather than the sole center of gravity. The platform is usually judged not only by AKS itself but by how cleanly it fits with Microsoft identity, networking, monitoring, and developer workflows.',
      'If a team wants the widest container orchestration menu, AWS often feels stronger. If a team wants Kubernetes and application hosting to sit inside a well-integrated Microsoft control plane, Azure is very compelling.',
    ],
  },
  {
    id: 'core-serverless',
    title: 'Serverless and Event-Driven Development',
    paragraphs: [
      'AWS Lambda is one of the most influential serverless products in the industry and remains central to event-driven architecture on AWS. It connects naturally to S3 events, queues, streams, EventBridge, API Gateway, and many other services. AWS often feels especially mature when the architecture is built from many small managed events and functions.',
      'Azure Functions offers the same broad class of event-driven compute, but its operational appeal often depends on the surrounding Microsoft environment. Functions frequently feels most natural when paired with Azure storage, identity, monitoring, and enterprise app workflows rather than treated as an isolated serverless ideology.',
      'AWS is often perceived as slightly more culturally serverless-native because so many event-driven patterns were popularized there. Azure is often preferred when serverless is one mode inside a broader Microsoft platform strategy rather than the sole organizing principle.',
    ],
  },
  {
    id: 'core-devops',
    title: 'Infrastructure as Code, Delivery, and Governance Automation',
    paragraphs: [
      'AWS supports CloudFormation, CDK, Terraform, and a wide CI and deployment ecosystem. Mature AWS estates usually need substantial platform engineering to keep account design, IAM, networking, and service selection coherent over time. The tools are strong, but the service breadth means platform automation must also be strong.',
      'Azure supports Bicep, ARM templates, Terraform, Azure DevOps, GitHub Actions, and policy-driven governance automation. Bicep is especially important because it gives Azure a first-party declarative authoring model closely aligned with Resource Manager. For Microsoft-heavy organizations, this creates a vertically integrated story around governance, deployment, and developer workflow.',
      'If the team already operates a Terraform-heavy platform and values cloud-neutral patterns, AWS often feels familiar. If the organization wants first-party infrastructure authoring tightly coupled to policy, subscriptions, and Microsoft development tooling, Azure often has the ergonomic advantage.',
    ],
  },
  {
    id: 'core-observability',
    title: 'Observability, Security Operations, and Day-2 Management',
    paragraphs: [
      'AWS provides CloudWatch, CloudTrail, Config, X-Ray, GuardDuty, Security Hub, and many adjacent operational tools. Mature AWS operations often involve deliberately stitching several services together to cover metrics, logs, audit trails, posture management, drift detection, and security signals across many accounts.',
      'Azure provides Azure Monitor, Log Analytics, Application Insights, Activity Log, Defender for Cloud, Policy, and related security and observability tooling that often feels tightly connected to the Azure management plane. For many enterprise teams this is attractive because identity, policy, monitoring, and security posture are more visibly centralized in one control surface.',
      'Neither cloud makes day-2 operations trivial. The practical difference is that AWS often rewards explicit platform engineering across a broader surface area, while Azure often rewards centralized governance and operations discipline inside a more visibly unified administration model.',
    ],
  },
  {
    id: 'core-pricing',
    title: 'Pricing, Cost Management, and Procurement Reality',
    paragraphs: [
      'Both AWS and Azure have complex pricing because hyperscale cloud pricing is inherently complex. Compute families, storage tiers, egress, managed databases, observability, support plans, reservations, and commitment models all matter. Any comparison based only on list-price anecdotes is weak engineering analysis.',
      'AWS pricing conversations often revolve around service-by-service optimization, reservations, savings plans, and architectural discipline in a very broad service landscape. Azure pricing conversations include the same themes but also frequently bring in enterprise agreements, Microsoft licensing posture, Azure Hybrid Benefit, and broader vendor consolidation economics tied to an organizations Microsoft footprint.',
      'This is why cloud cost is rarely just a benchmark question. It is a combined question of workload shape, commitment model, licensing leverage, procurement power, operational efficiency, and how much the company values consolidating spend with one strategic vendor.',
    ],
  },
  {
    id: 'core-hybrid',
    title: 'Hybrid, Enterprise Continuity, and Existing Estate Integration',
    paragraphs: [
      'AWS has hybrid products and can absolutely participate in hybrid architectures, but hybrid is not usually the first sentence people use to describe the platform. AWS is most naturally discussed as a cloud-native platform that can extend outward when needed.',
      'Azure is different. Hybrid continuity is a major part of its identity. When organizations still have meaningful on-prem infrastructure, Windows estates, Microsoft identity dependencies, or governance patterns that must span datacenter and cloud, Azure often feels unusually natural. This does not mean Azure is only for legacy enterprises. It means Azure often lowers migration and operating friction when cloud adoption is incremental rather than clean-slate.',
      'If the company is deeply hybrid and strongly Microsoft-shaped, Azure usually deserves serious weight even when AWS looks broader on paper.',
    ],
  },
  {
    id: 'core-global',
    title: 'Global Reach, Resiliency, and Failure Domain Thinking',
    paragraphs: [
      'AWS explicitly teaches architects to think in terms of Regions and Availability Zones, and that model is deeply embedded in service design and best practices. Many AWS reliability decisions are ultimately region-placement and AZ-placement decisions combined with service-specific durability assumptions.',
      'Azure also has a broad global footprint, regions, availability zones, and paired-region guidance. But Azure resiliency discussions often remain more visibly connected to enterprise governance and continuity planning alongside the raw infrastructure picture. In other words, the cloud geography often shows up as part of a broader management conversation rather than as a purely infrastructure-first conversation.',
      'In both clouds, resilient design still depends on understanding the actual failure domains of the services you use. The presence of regions and zones is not enough by itself.',
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Ecosystem, Skills, and Organizational Fit',
    paragraphs: [
      'AWS skills are extremely common and portable. For many organizations AWS feels like the neutral default public cloud because the hiring market, training materials, ecosystem tooling, and architectural vocabulary are so broad. Many engineers learn public cloud concepts through AWS terminology first.',
      'Azure has enormous strength where the vendor relationship already extends beyond cloud hosting into identity, collaboration, endpoint management, developer tooling, Windows, SQL Server, or broader enterprise software contracts. In those environments, Azure can remove friction that does not show up in feature comparison tables because the advantage is organizational, not purely technical.',
      'This is why cloud choice is not merely a services decision. It is also a people, procurement, training, and support decision.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs and Failure Modes',
    paragraphs: [
      'AWS can overwhelm teams with choice. It is easy to end up with inconsistent patterns across accounts, overlapping service usage, overly complex IAM, and weak operational standards if the platform team does not impose discipline. The price of flexibility is governance effort.',
      'Azure can lull teams into assuming that integration with Microsoft products automatically means architectural simplicity. It does not. Azure still has real complexity in networking, RBAC, subscriptions, policy, private connectivity, and service-specific behavior. The price of integration is that teams sometimes underestimate the amount of cloud-specific expertise still required.',
      'A poor AWS outcome often looks like service sprawl. A poor Azure outcome often looks like governance-heavy architecture that is administratively standardized but operationally muddy. Both clouds reward serious platform engineering, just in different ways.',
    ],
  },
  {
    id: 'core-checklist',
    title: 'Decision Checklist',
    bullets: [
      'Choose AWS when service breadth and cloud-native optionality matter more than enterprise vendor alignment.',
      'Choose Azure when Microsoft identity, Windows, .NET, and hybrid continuity are first-class constraints.',
      'Prefer AWS when your platform team wants the broadest managed-service palette and is ready to standardize it.',
      'Prefer Azure when your organization wants cloud operations to align tightly with existing Microsoft admin, security, and procurement workflows.',
      'If the company is building a cloud-native product company from scratch, AWS is often the more natural default.',
      'If the company is a Microsoft-shaped enterprise moving deliberately into cloud, Azure is often the more natural default.',
    ],
  },
]

const examples: ExampleItem[] = [
  {
    id: 'ex-vm',
    title: 'Launch a Virtual Machine',
    summary:
      'Both clouds can provision a VM quickly, but the command shape already hints at their surrounding management model.',
    awsCode: `aws ec2 run-instances \\
  --image-id ami-1234567890abcdef0 \\
  --instance-type t3.micro \\
  --subnet-id subnet-0123456789abcdef0 \\
  --security-group-ids sg-0123456789abcdef0 \\
  --associate-public-ip-address`,
    azureCode: `az vm create \\
  --resource-group app-prod-rg \\
  --name web-01 \\
  --image Ubuntu2204 \\
  --size Standard_B2s \\
  --vnet-name app-prod-vnet \\
  --subnet app \\
  --public-ip-sku Standard`,
    explanation:
      'AWS starts directly from EC2 and subnet vocabulary inside the account model. Azure makes the resource group explicit immediately, which reflects how central grouping, lifecycle, and access management are to the Azure mental model.',
  },
  {
    id: 'ex-storage',
    title: 'Upload an Object to Cloud Storage',
    summary:
      'Object storage is foundational on both clouds, but the surrounding access and platform patterns differ.',
    awsCode: `aws s3 cp ./report.csv s3://finance-archive-logs/reports/2026/report.csv`,
    azureCode: `az storage blob upload \\
  --account-name financearchive \\
  --container-name reports \\
  --name 2026/report.csv \\
  --file ./report.csv \\
  --auth-mode login`,
    explanation:
      'S3 is one of the most central AWS primitives and appears everywhere in AWS-native architectures. Blob Storage is equally important in Azure, but the surrounding experience often feels more explicitly tied to the broader Azure account, RBAC, and storage-account model.',
  },
  {
    id: 'ex-serverless',
    title: 'Define a Simple HTTP Function',
    summary: 'Serverless exists on both clouds, but the cultural framing around it often differs.',
    awsCode: `export const handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'hello from lambda' }),
  }
}`,
    azureCode: `import azure.functions as func

app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)

@app.route(route='hello')
def hello(req: func.HttpRequest) -> func.HttpResponse:
    return func.HttpResponse('hello from azure functions')`,
    explanation:
      'Lambda usually feels like one node in a broader AWS event mesh. Azure Functions is equally event-driven, but many teams experience it as one compute mode inside a larger Microsoft application and governance platform rather than as a serverless-first worldview by itself.',
  },
  {
    id: 'ex-iac',
    title: 'Infrastructure as Code Shape',
    summary:
      'First-party infrastructure authoring reflects what each provider wants teams to internalize about the platform.',
    awsCode: `import * as cdk from 'aws-cdk-lib'
import * as s3 from 'aws-cdk-lib/aws-s3'

export class LogsStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string) {
    super(scope, id)

    new s3.Bucket(this, 'LogsBucket', {
      versioned: true,
      encryption: s3.BucketEncryption.S3_MANAGED,
    })
  }
}`,
    azureCode: `resource storage 'Microsoft.Storage/storageAccounts@2023-05-01' = {
  name: 'logsstorageacct01'
  location: resourceGroup().location
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
  properties: {
    allowBlobPublicAccess: false
  }
}`,
    explanation:
      'AWS CDK leans into software-defined composition over many AWS service constructs. Azure Bicep stays very close to the Resource Manager model, which reinforces Azures resource-group, declarative governance, and management-plane worldview.',
  },
]

const glossaryTerms: GlossaryItem[] = [
  {
    term: 'AWS account',
    definition:
      'A foundational AWS isolation and billing boundary commonly used to separate workloads, environments, or teams.',
  },
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
    term: 'IAM',
    definition:
      'AWS Identity and Access Management, the AWS permission system for users, roles, policies, and access control.',
  },
  {
    term: 'Microsoft Entra ID',
    definition:
      'Microsofts cloud identity platform used for authentication, directory management, application access, and many Azure security scenarios.',
  },
  {
    term: 'VPC',
    definition:
      'An AWS Virtual Private Cloud, the foundational network isolation boundary for many AWS workloads.',
  },
  {
    term: 'VNet',
    definition:
      'An Azure Virtual Network, the foundational private networking boundary for Azure resources and connected services.',
  },
  {
    term: 'Availability Zone',
    definition:
      'A physically separate location within a region used to reduce shared failure domains and improve resilience.',
  },
  {
    term: 'S3',
    definition:
      'Amazon Simple Storage Service, AWS object storage for durable, scalable unstructured data.',
  },
  {
    term: 'Blob Storage',
    definition:
      'Azure object storage for massive-scale unstructured data such as files, media, logs, and archives.',
  },
  {
    term: 'Lambda',
    definition:
      'AWS serverless compute for event-driven code execution without managing servers directly.',
  },
  {
    term: 'Azure Functions',
    definition:
      'Azures event-driven serverless compute platform for HTTP triggers, timers, queues, storage events, and more.',
  },
  {
    term: 'EKS',
    definition: 'Amazon Elastic Kubernetes Service, AWS managed Kubernetes.',
  },
  {
    term: 'AKS',
    definition: 'Azure Kubernetes Service, Azure managed Kubernetes.',
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

export default function AwsVsAzurePage(): JSX.Element {
  const { activeTab, setActiveTab, handleMinimize } = useTopicTabs({
    tabs,
    pageTitle: 'Aws Vs Azure Page',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Aws Vs Azure Page"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
      onMinimize={handleMinimize}
    >
      <h1 className="bin98-doc-title">{pageTitle}</h1>
      <p className="aws-azure-help-doc-subtitle">{pageSubtitle}</p>
      <p>
        This page compares AWS and Azure as platform choices for real infrastructure, application,
        and organization design. The point is not to memorize service-name pairs. The point is to
        understand the deeper tradeoffs: platform shape, governance model, identity, networking,
        compute, storage, data-platform gravity, serverless and container posture, cost control,
        hybrid continuity, and the kind of company each cloud tends to fit best.
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
              <h3 className="bin98-subheading">AWS</h3>
              <div className="bin98-codebox">
                <code>{example.awsCode.trim()}</code>
              </div>
              <h3 className="bin98-subheading">Azure</h3>
              <div className="bin98-codebox">
                <code>{example.azureCode.trim()}</code>
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
