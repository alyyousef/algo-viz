import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

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
const pageSubtitle = "Comparing the broadest public cloud platform with Microsoft's enterprise-centric cloud platform."
const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

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
      'AWS and Azure are both hyperscale cloud platforms, but they are not identical in personality, operational model, or organizational fit. AWS is usually perceived as the broadest cloud platform with the deepest service catalog and a very infrastructure-centric mental model. Azure is usually perceived as the cloud that integrates most naturally with Microsoft-heavy enterprises, especially where Windows Server, Active Directory, Microsoft 365, SQL Server, .NET, and hybrid datacenter realities are already central.',
      'Both platforms provide the same broad categories of capability: virtual machines, containers, serverless functions, object storage, relational databases, networking, identity, observability, infrastructure as code, AI services, data pipelines, and security tooling. The real comparison is not whether either platform can do modern cloud work. Both can. The comparison is about management model, service depth, naming and organization, operational ergonomics, enterprise alignment, and how much the surrounding company already lives in one vendor ecosystem.',
      'A useful shorthand is this: AWS often wins on service breadth, cloud-native maturity, and infrastructure-first optionality; Azure often wins on Microsoft alignment, hybrid enterprise comfort, and a management model that feels familiar to organizations already standardized on Microsoft identity and productivity systems.',
    ],
  },
  {
    id: 'bp-philosophy',
    title: 'Philosophy Difference',
    paragraphs: [
      'AWS historically grew from infrastructure primitives upward. Its culture shows in the platform design: individual services are powerful, composable, and sometimes intentionally low-level. Teams are often expected to understand regions, availability zones, VPCs, IAM policies, service-specific tradeoffs, and many small decisions that add up to a flexible platform.',
      'Azure historically feels more enterprise-platform-shaped. It still has deep infrastructure capability, but its management story is more visibly tied to subscriptions, resource groups, policy, governance, and Microsoft-wide identity. For many companies, Azure does not merely feel like a place to rent compute. It feels like an extension of an already Microsoft-managed operating environment.',
      'That means AWS often feels like the most cloud-native toolbox, while Azure often feels like the most natural cloud continuation of a Microsoft estate. Neither framing is absolute, but it explains a large share of real-world platform preference.',
    ],
  },
  {
    id: 'bp-where',
    title: 'Where Each Fits Best',
    paragraphs: [
      'AWS is especially strong for startups, SaaS platforms, teams that want the largest cloud service menu, organizations building heavily cloud-native systems from first principles, and engineering groups that value fine-grained service choice even when that means more platform complexity. It is also frequently the default reference point for multi-cloud design discussions because many cloud patterns were popularized there first.',
      'Azure is especially strong for enterprises already invested in Microsoft technologies, regulated organizations with existing Microsoft governance footprints, hybrid environments that still care about Windows and on-prem integration, and development teams building around .NET, Microsoft Entra ID, Azure DevOps, GitHub, Power Platform, or Microsoft data tooling.',
      'If the central question is which platform gives the broadest raw set of cloud building blocks, AWS usually has the stronger reputation. If the central question is which platform fits most smoothly into a Microsoft-centered enterprise operating model, Azure usually has the stronger answer.',
    ],
  },
  {
    id: 'bp-quick-picks',
    title: 'Quick Decision Guide',
    bullets: [
      'Choose AWS when cloud-native depth, maximum service breadth, and infrastructure-level optionality matter most.',
      'Choose Azure when Microsoft identity, Windows, .NET, SQL Server, and enterprise governance alignment matter most.',
      'Choose AWS when teams want the reference cloud for many modern platform patterns and managed service combinations.',
      'Choose Azure when the organization already treats Microsoft as its core platform vendor beyond just cloud hosting.',
      'If the debate is really about vendor ecosystem rather than individual services, the surrounding estate is usually the real decision boundary.',
    ],
  },
]

const mentalModels = [
  {
    title: 'AWS is service-catalog first',
    detail:
      'Its power comes from the number and depth of individual services and from the ability to compose them into many architectures.',
  },
  {
    title: 'Azure is management-plane first',
    detail:
      'Its platform story emphasizes subscriptions, resource groups, policy, RBAC, and integration with Microsoft identity and governance tooling.',
  },
  {
    title: 'Both are huge, but their defaults feel different',
    detail:
      'AWS usually feels more infrastructure-native and engineering-driven; Azure usually feels more enterprise-governance-driven and Microsoft-connected.',
  },
  {
    title: 'Identity is central to the decision',
    detail:
      'AWS IAM is powerful and deeply AWS-specific. Azure often becomes easier when Microsoft Entra ID already anchors workforce identity and access.',
  },
  {
    title: 'Hybrid stories are not equal in emphasis',
    detail:
      'AWS has hybrid options, but Azure is especially strong when the organization still has major on-prem, Windows, or Microsoft management dependencies.',
  },
  {
    title: 'Naming parity is misleading',
    detail:
      'VMs map to VMs, object storage maps to object storage, and Kubernetes maps to Kubernetes, but the surrounding operational model can still differ materially.',
  },
  {
    title: 'Cloud platform choice is organizational architecture',
    detail:
      'The platform you choose shapes IAM, networking, IaC, monitoring, cost controls, training, support models, and vendor leverage for years.',
  },
]

const coreSections: DocSection[] = [
  {
    id: 'core-platform-shape',
    title: 'Overall Platform Shape',
    paragraphs: [
      'AWS presents itself as the broadest and deepest cloud service portfolio, and in practice that means there are often multiple credible ways to solve the same problem. A workload might run on EC2, ECS, EKS, Lambda, Fargate, App Runner, or several combinations. That flexibility is powerful, but it can also increase design surface area and operational decision load.',
      'Azure also spans the full cloud stack, but its platform feels more centered on a unified management plane. Resource Manager, subscriptions, resource groups, tags, policies, role assignments, and tenant identity often become the first concepts teams learn. Azure can absolutely be cloud-native and highly modular, but it tends to foreground governance and organization sooner than AWS does.',
      'This difference matters most in large environments. AWS often optimizes for service composability. Azure often optimizes for management clarity across many teams and business units.',
    ],
  },
  {
    id: 'core-resource-model',
    title: 'Resource Organization and Governance Model',
    paragraphs: [
      'AWS commonly organizes environments around accounts, organizations, organizational units, IAM policies, service control policies, VPC boundaries, and account-level separation. A mature AWS estate often uses many accounts for environment, workload, or business isolation. That is powerful and often desirable, but it requires teams to think clearly about account topology early.',
      'Azure commonly organizes around a Microsoft Entra tenant, management groups, subscriptions, resource groups, and Azure Policy. Resource groups are especially important because they create an immediately visible unit for lifecycle and access management. This model often feels easier for enterprises that want a very explicit hierarchy from tenant down to grouped workload resources.',
      'Neither model is universally simpler. AWS accounts provide hard isolation that many platform teams love. Azure subscriptions and resource groups often feel more intuitive to organizations that want to reason about business ownership, billing, lifecycle, and policy inside one visible management structure.',
    ],
  },
  {
    id: 'core-compute',
    title: 'Compute Options and Application Hosting',
    paragraphs: [
      'At the compute layer, AWS offers EC2 for virtual machines, ECS and EKS for containers, Lambda for serverless, Fargate for serverless containers, and several higher-level application hosting services. Azure offers Virtual Machines, AKS, Azure Functions, Container Apps, App Service, and other platform services. So the service categories line up, but the platform feel still differs.',
      'AWS compute choices often feel broader and more granular, especially when teams want to optimize deeply for workload shape. Azure compute choices often feel tightly integrated with identity, governance, and developer platform tooling. For example, App Service or Functions can feel natural in Microsoft-centered application environments even when they are not the lowest-level building blocks available.',
      'If the team wants maximal freedom to compose primitives, AWS often feels stronger. If the team wants cloud compute to sit neatly inside a broader Microsoft estate, Azure often feels more natural.',
    ],
  },
  {
    id: 'core-identity',
    title: 'Identity, Access Control, and Security Boundaries',
    paragraphs: [
      'AWS Identity and Access Management is one of the most important and most difficult parts of AWS. It is extremely powerful, but its policy model, resource scoping, role assumption, cross-account access, and permission debugging can become complex. Mature AWS teams invest heavily in IAM design because almost every secure architecture depends on it.',
      'Azure identity often starts from Microsoft Entra ID and then extends into Azure RBAC, managed identities, conditional access, group membership, policy, and broader Microsoft security controls. For organizations already using Microsoft identity for workforce authentication, Azure access models often feel less like a separate world and more like a continuation of existing identity strategy.',
      'AWS usually feels more cloud-provider-specific in identity design. Azure usually feels more integrated with enterprise identity and productivity infrastructure. That can be a decisive difference in regulated or centrally governed environments.',
    ],
  },
  {
    id: 'core-networking',
    title: 'Networking, Connectivity, and Hybrid Operations',
    paragraphs: [
      'AWS networking revolves around VPCs, subnets, route tables, internet gateways, NAT, security groups, load balancers, and a wide range of connectivity services. It is a very mature networking model, but it expects platform teams to understand how many low-level pieces interact. For cloud-native teams this is often a feature rather than a drawback.',
      'Azure networking revolves around VNets, subnets, network security groups, route tables, load balancers, private endpoints, ExpressRoute, VPN, and hybrid connectivity patterns that often sit naturally beside Microsoft enterprise environments. Azure also has strong hybrid stories for organizations that have not fully left on-prem infrastructure behind.',
      'In pure capability terms both clouds are strong. In operational feel, AWS networking often feels like deep infrastructure engineering, while Azure networking often feels more tightly linked to enterprise topology, datacenter extension, and centralized governance.',
    ],
  },
  {
    id: 'core-storage',
    title: 'Storage Model and Data Durability',
    paragraphs: [
      'Amazon S3 and Azure Blob Storage both provide massively scalable object storage and both are foundational services. S3 is arguably one of the defining AWS services and is deeply embedded into many AWS-native architectures, data pipelines, backups, static site patterns, and event workflows. Blob Storage plays a similarly central role in Azure for unstructured data, application assets, analytics staging, and archival storage.',
      'Beyond object storage, AWS uses EBS, EFS, FSx, and archival tiers across several services. Azure uses managed disks, Azure Files, NetApp integrations, and archival tiers inside the Azure storage family. The capabilities are broadly comparable, but teams often develop a stronger platform instinct on the cloud they use most because storage semantics, permissions, encryption defaults, networking, and event integrations all differ in important details.',
      'If the comparison is just Can both store data durably at scale, the answer is yes. The real question is how storage integrates with the rest of the platform, especially identity, analytics, eventing, backup, and cost management.',
    ],
  },
  {
    id: 'core-data',
    title: 'Databases, Analytics, and Data Platform Direction',
    paragraphs: [
      'AWS has a very broad data portfolio across managed relational databases, DynamoDB, Redshift, streaming, lake services, and specialized storage engines. Azure has Azure SQL Database, Cosmos DB, managed PostgreSQL and MySQL offerings, Synapse, Microsoft Fabric integrations, and strong alignment with the Microsoft data ecosystem. Both can support serious transactional and analytical workloads.',
      'The distinction is often less about raw capability and more about surrounding gravity. AWS data choices frequently align with platform teams building vendor-native cloud architectures from primitives outward. Azure data choices frequently align with enterprises that already rely on SQL Server lineage, Microsoft BI ecosystems, or identity and governance models that tie directly into existing Microsoft operations.',
      'If a team wants a cloud platform largely independent of Microsoft assumptions, AWS often feels cleaner. If a team already lives around Microsoft data tooling and enterprise reporting workflows, Azure often reduces friction.',
    ],
  },
  {
    id: 'core-containers',
    title: 'Containers and Kubernetes',
    paragraphs: [
      'Both clouds support container workloads very well. AWS offers ECS as a proprietary orchestrator and EKS as managed Kubernetes. That gives AWS teams a notable extra decision: stay in an AWS-native scheduler with ECS or adopt upstream Kubernetes through EKS. Azure centers more visibly on AKS, although other container hosting options like Container Apps and App Service also matter depending on the use case.',
      'EKS and AKS both let teams run Kubernetes without managing every control-plane concern themselves, but the operational experience still reflects each cloud. AWS often gives teams many adjacent services to compose around containers. Azure often gives teams container operations that sit naturally within Azure RBAC, Policy, Monitor, and Microsoft identity patterns.',
      'If your platform team wants Kubernetes plus maximal cloud-native composition options, AWS is strong. If your platform team wants Kubernetes inside a Microsoft-governed estate, Azure is extremely compelling.',
    ],
  },
  {
    id: 'core-serverless',
    title: 'Serverless and Event-Driven Development',
    paragraphs: [
      'AWS Lambda is one of the most influential serverless products in the industry and remains central to event-driven design on AWS. It connects naturally with S3 events, queues, streams, EventBridge, API Gateway, and a large number of managed services. AWS often feels particularly mature for teams building heavily event-driven systems from many managed building blocks.',
      'Azure Functions offers comparable event-driven serverless execution and integrates well with the Azure ecosystem, especially where HTTP APIs, storage events, queues, timers, or Microsoft-centric developer workflows are involved. In Azure-heavy shops, Functions often feels easier to operationalize because it aligns well with existing platform expectations.',
      'AWS is often perceived as slightly more culturally serverless-native because so many cloud architecture patterns were popularized there. Azure is often favored when serverless is one part of a broader Microsoft platform rather than the entire architectural center of gravity.',
    ],
  },
  {
    id: 'core-devops',
    title: 'Infrastructure as Code, DevOps, and Delivery Workflows',
    paragraphs: [
      'AWS supports CloudFormation, CDK, Terraform, and a broad CI and deployment ecosystem. Many AWS teams standardize on Terraform or CDK to tame the service sprawl and make account-level automation repeatable. The AWS tooling story is powerful, but large estates often need deliberate platform engineering to keep it coherent.',
      'Azure supports Bicep, ARM templates, Terraform, Azure DevOps, GitHub Actions, and deep ties to Microsoft development tooling. Bicep is particularly notable because it provides a first-party authoring experience over Azure Resource Manager. For Microsoft-heavy organizations, this creates a more vertically integrated development and governance story.',
      'If the team is already standardized on GitHub or Azure DevOps and wants first-party integration that feels close to the rest of its platform stack, Azure often has an ergonomic advantage. If the team wants maximum cloud-agnostic IaC patterns or already operates a mature Terraform-centric platform team, AWS often feels equally or more comfortable.',
    ],
  },
  {
    id: 'core-observability',
    title: 'Observability, Operations, and Day-2 Management',
    paragraphs: [
      'AWS provides CloudWatch, CloudTrail, Config, X-Ray, GuardDuty, Security Hub, and many surrounding operational tools. Mature AWS operations often involve stitching together several services clearly so teams can observe workload health, API usage, audit trails, configuration drift, and security signals without blind spots.',
      'Azure provides Azure Monitor, Log Analytics, Application Insights, Activity Log, Policy, Defender for Cloud, and broader operational tooling that often feels well connected to Microsoft governance and security products. For many enterprise teams, Azure day-2 operations feel comfortable because identity, policy, logs, and resource organization are surfaced in a very centralized way.',
      'Neither platform makes observability automatic. The practical difference is that AWS often rewards teams willing to engineer an explicit platform-wide operations model, while Azure often rewards teams that want governance and operations to be visibly unified in one management experience.',
    ],
  },
  {
    id: 'core-pricing',
    title: 'Pricing, Cost Management, and Procurement Reality',
    paragraphs: [
      'Both AWS and Azure have complex pricing because hyperscale cloud pricing is complex. Compute families, storage tiers, egress, managed databases, support plans, observability, and enterprise agreements all matter. Any serious comparison based only on list-price anecdotes is weak engineering analysis.',
      'AWS pricing conversations often emphasize service-by-service optimization, reserved capacity, savings plans, and cost architecture discipline. Azure pricing conversations often include those same themes but also frequently include enterprise agreements, Microsoft licensing posture, Azure Hybrid Benefit, and broader vendor negotiations tied to a company Microsoft footprint.',
      'So cost is rarely a simple benchmark number. It is a mix of workload shape, commitment model, licensing leverage, operational efficiency, and how much the company can consolidate vendor spend strategically.',
    ],
  },
  {
    id: 'core-global',
    title: 'Global Footprint, Resiliency, and Geographic Design',
    paragraphs: [
      'AWS explicitly frames its global infrastructure around Regions and Availability Zones, and its documentation emphasizes region-level design, zone-level fault isolation, and global networking. That model is deeply embedded in AWS architecture thinking. Many AWS best practices are really region and AZ placement practices in disguise.',
      'Azure also has a huge global footprint and organizes around regions, availability zones, and region-pairing concepts. Azure design discussions often include paired regions, subscription governance, and service-specific regional support. The overall platform is global at hyperscale, but the management conversation often stays more obviously connected to policy and organizational structure.',
      'In both clouds, resilient architecture still depends on service-level understanding, not just the existence of regions. The better question is whether your team understands the failure domains and regional service constraints of the specific products it plans to use.',
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Ecosystem, Skills, and Organizational Fit',
    paragraphs: [
      'AWS skills are widely available and highly portable across modern cloud-native engineering teams. If an organization wants its cloud platform to feel vendor-neutral in culture, even when it is not truly neutral in fact, AWS often has that reputation. Many engineers learn cloud patterns first through AWS terminology and services.',
      'Azure has enormous strength in enterprises where the broader vendor relationship already includes identity, email, collaboration, endpoint management, Windows, SQL Server, GitHub, or development tooling. In those environments Azure can reduce political, operational, and procurement friction in ways that are bigger than any single service comparison table.',
      'This is why cloud platform choice is often not just a technical decision. It is a compound decision involving training, support contracts, security review processes, procurement leverage, architecture standards, and the skills an organization already has.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs and Failure Modes',
    paragraphs: [
      'AWS can overwhelm teams with choice. It is easy to build excellent systems there, but it is also easy to produce inconsistent architecture across accounts and teams when service selection, IAM boundaries, observability, and cost controls are not standardized. The price of freedom is platform discipline.',
      'Azure can lull teams into assuming Microsoft integration automatically equals architectural simplicity. It does not. Azure still has real complexity, especially across networking, RBAC, subscriptions, policy, private connectivity, and service-specific behavior. The price of integration is that teams sometimes underestimate how much cloud-specific expertise is still required.',
      'A poor AWS outcome often looks like uncontrolled service sprawl. A poor Azure outcome often looks like governance-heavy architecture that is nominally standardized but operationally muddy. Both failures are fixable with strong platform engineering, but they are different failure modes.',
    ],
  },
  {
    id: 'core-checklist',
    title: 'Decision Checklist',
    bullets: [
      'Choose AWS when the platform team values maximum service breadth and cloud-native composability over vendor-stack integration.',
      'Choose Azure when Microsoft identity, Windows, .NET, and enterprise governance are first-class constraints rather than side considerations.',
      'Prefer AWS when teams want to build with many specialized managed services and are comfortable owning platform standardization.',
      'Prefer Azure when the organization wants cloud operations to align tightly with existing Microsoft governance, identity, and developer tooling.',
      'If hybrid connectivity and Microsoft enterprise continuity dominate the architecture discussion, Azure usually has the edge.',
      'If the company is essentially building a cloud-native product company from scratch, AWS is often the more natural default.',
    ],
  },
]

const examples: ExampleItem[] = [
  {
    id: 'ex-vm',
    title: 'Launch a Virtual Machine',
    summary: 'Both clouds can provision a VM quickly, but even the first command hints at different platform vocabulary and management assumptions.',
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
    explanation: 'AWS starts from the EC2 and subnet vocabulary directly. Azure makes the resource group impossible to ignore, which reflects its stronger management-plane emphasis from the first provisioning step.',
  },
  {
    id: 'ex-storage',
    title: 'Upload an Object to Cloud Storage',
    summary: 'Object storage is foundational on both platforms, but the service names and surrounding access models differ.',
    awsCode: `aws s3 cp ./report.csv s3://finance-archive-logs/reports/2026/report.csv`,
    azureCode: `az storage blob upload \\
  --account-name financearchive \\
  --container-name reports \\
  --name 2026/report.csv \\
  --file ./report.csv \\
  --auth-mode login`,
    explanation: 'S3 is one of the most central AWS primitives, and many AWS architectures assume it is always nearby. Blob Storage occupies a similarly important role in Azure, but access often feels more explicitly tied to the Azure account and RBAC story.',
  },
  {
    id: 'ex-serverless',
    title: 'Define a Simple HTTP Function',
    summary: 'Serverless exists on both clouds, but the surrounding trigger and platform ecosystems shape how it feels in practice.',
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
    explanation: 'Lambda is usually experienced as one piece of a larger AWS event mesh. Azure Functions is similarly event-driven, but many organizations experience it inside a broader Microsoft application platform rather than as the center of a purely serverless estate.',
  },
  {
    id: 'ex-iac',
    title: 'Infrastructure as Code Shape',
    summary: 'First-party IaC on each cloud reflects the management model the provider wants teams to internalize.',
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
    explanation: 'AWS CDK leans into software-defined composition over AWS services. Azure Bicep stays very close to the Resource Manager model, which reinforces Azure resource-group and declarative-governance worldview.',
  },
]

const glossaryTerms: GlossaryItem[] = [
  {
    term: 'AWS account',
    definition: 'A fundamental AWS isolation and billing boundary often used as a primary unit of workload or environment separation.',
  },
  {
    term: 'Azure subscription',
    definition: 'A primary Azure billing and governance boundary under a tenant, commonly used to separate environments, teams, or business units.',
  },
  {
    term: 'Resource group',
    definition: 'An Azure logical container for related resources that share lifecycle, access control, and management context.',
  },
  {
    term: 'IAM',
    definition: 'AWS Identity and Access Management, the AWS system for users, roles, policies, and permissions across AWS resources.',
  },
  {
    term: 'Microsoft Entra ID',
    definition: "Microsoft's cloud identity platform used for authentication, user and group management, application access, and many Azure access scenarios.",
  },
  {
    term: 'VPC',
    definition: 'An AWS Virtual Private Cloud, the foundational network isolation boundary for many AWS workloads.',
  },
  {
    term: 'VNet',
    definition: 'An Azure Virtual Network, the foundational private networking boundary for Azure resources and connected services.',
  },
  {
    term: 'Availability Zone',
    definition: 'A physically separate location within a region used to improve resilience by reducing shared failure domains.',
  },
  {
    term: 'S3',
    definition: 'Amazon Simple Storage Service, AWS object storage used for unstructured data, backups, analytics staging, static assets, and more.',
  },
  {
    term: 'Blob Storage',
    definition: 'Azure object storage for massive-scale unstructured data such as files, media, logs, archives, and application assets.',
  },
  {
    term: 'Lambda',
    definition: "AWS's serverless compute service for event-driven code execution without managing servers directly.",
  },
  {
    term: 'Azure Functions',
    definition: "Azure's event-driven serverless compute platform for running code in response to HTTP, timers, queues, storage events, and more.",
  },
  {
    term: 'EKS',
    definition: "Amazon Elastic Kubernetes Service, AWS's managed Kubernetes offering.",
  },
  {
    term: 'AKS',
    definition: "Azure Kubernetes Service, Azure's managed Kubernetes offering.",
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
    { id: 'core-resource-model', label: 'Resource Model' },
    { id: 'core-compute', label: 'Compute' },
    { id: 'core-identity', label: 'Identity and Access' },
    { id: 'core-networking', label: 'Networking and Hybrid' },
    { id: 'core-storage', label: 'Storage' },
    { id: 'core-data', label: 'Data Platforms' },
    { id: 'core-containers', label: 'Containers and Kubernetes' },
    { id: 'core-serverless', label: 'Serverless' },
    { id: 'core-devops', label: 'IaC and DevOps' },
    { id: 'core-observability', label: 'Observability' },
    { id: 'core-pricing', label: 'Pricing and Cost' },
    { id: 'core-global', label: 'Global Footprint' },
    { id: 'core-ecosystem', label: 'Ecosystem and Fit' },
    { id: 'core-tradeoffs', label: 'Tradeoffs' },
    { id: 'core-checklist', label: 'Decision Checklist' },
  ],
  examples: examples.map((example) => ({ id: example.id, label: example.title })),
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

const pageStyles = `
.aws-azure-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.aws-azure-help-window {
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

.aws-azure-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.aws-azure-help-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.aws-azure-help-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.aws-azure-help-control {
  width: 18px;
  height: 16px;
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
  font-size: 11px;
  line-height: 1;
  font-family: inherit;
}

.aws-azure-help-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
  flex-wrap: wrap;
}

.aws-azure-help-tab {
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  padding: 5px 10px 4px;
  font-size: 12px;
  cursor: pointer;
  font-family: inherit;
}

.aws-azure-help-tab.active {
  position: relative;
  top: 1px;
  background: #fff;
}

.aws-azure-help-main {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
  border-top: 1px solid #404040;
  background: #fff;
}

.aws-azure-help-toc {
  overflow: auto;
  border-right: 1px solid #808080;
  background: #f2f2f2;
  padding: 12px;
}

.aws-azure-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.aws-azure-help-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.aws-azure-help-toc-list li {
  margin: 0 0 8px;
}

.aws-azure-help-toc-list a {
  color: #000;
  text-decoration: none;
  font-size: 12px;
}

.aws-azure-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.aws-azure-help-doc-title {
  margin: 0 0 6px;
  font-size: 20px;
  font-weight: 700;
}

.aws-azure-help-doc-subtitle {
  margin: 0 0 12px;
  font-size: 13px;
  font-weight: 700;
}

.aws-azure-help-section {
  margin: 0 0 20px;
}

.aws-azure-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.aws-azure-help-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.aws-azure-help-content p,
.aws-azure-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.aws-azure-help-content p {
  margin: 0 0 10px;
}

.aws-azure-help-content ul {
  margin: 0 0 10px 20px;
  padding: 0;
}

.aws-azure-help-divider {
  border: 0;
  border-top: 1px solid #d0d0d0;
  margin: 14px 0;
}

.aws-azure-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  background: #f4f4f4;
}

.aws-azure-help-codebox code {
  display: block;
  white-space: pre-wrap;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .aws-azure-help-main {
    grid-template-columns: 1fr;
  }

  .aws-azure-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .aws-azure-help-title {
    position: static;
    transform: none;
    margin: 0 auto;
    padding-left: 18px;
  }
}
`

export default function AwsVsAzurePage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const tabParam = searchParams.get('tab')
  const activeTab: TabId = isTabId(tabParam) ? tabParam : 'big-picture'

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'
    document.title = `${pageTitle} (${activeTabLabel})`
  }, [activeTab, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: pageTitle,
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

  const handleTabChange = (tabId: TabId) => {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('tab', tabId)
    setSearchParams(nextParams, { replace: true })
  }

  return (
    <div className="aws-azure-help-page">
      <style>{pageStyles}</style>
      <div className="aws-azure-help-window" role="presentation">
        <header className="aws-azure-help-titlebar">
          <span className="aws-azure-help-title">{pageTitle}</span>
          <div className="aws-azure-help-controls">
            <button className="aws-azure-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="aws-azure-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="aws-azure-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`aws-azure-help-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="aws-azure-help-main">
          <aside className="aws-azure-help-toc" aria-label="Table of contents">
            <h2 className="aws-azure-help-toc-title">Contents</h2>
            <ul className="aws-azure-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="aws-azure-help-content">
            <h1 className="aws-azure-help-doc-title">{pageTitle}</h1>
            <p className="aws-azure-help-doc-subtitle">{pageSubtitle}</p>
            <p>
              This page compares AWS and Azure as platform choices for real infrastructure, application, and organization design.
              The point is not to memorize service-name pairs. The point is to understand the deeper tradeoffs: platform shape,
              governance model, identity, networking, compute, storage, Kubernetes, serverless, observability, cost control,
              hybrid integration, and the type of company each cloud tends to fit best.
            </p>

            {activeTab === 'big-picture' && (
              <>
                {bigPictureSections.map((section, index) => (
                  <section key={section.id} id={section.id} className="aws-azure-help-section">
                    <h2 className="aws-azure-help-heading">{section.title}</h2>
                    {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    {section.bullets && (
                      <ul>
                        {section.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                    {index < bigPictureSections.length - 1 && <hr className="aws-azure-help-divider" />}
                  </section>
                ))}
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                <section id="core-mental" className="aws-azure-help-section">
                  <h2 className="aws-azure-help-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                {coreSections.map((section) => (
                  <section key={section.id} id={section.id} className="aws-azure-help-section">
                    <h2 className="aws-azure-help-heading">{section.title}</h2>
                    {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
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
                  <section key={example.id} id={example.id} className="aws-azure-help-section">
                    <h2 className="aws-azure-help-heading">{example.title}</h2>
                    <p>{example.summary}</p>
                    <h3 className="aws-azure-help-subheading">AWS</h3>
                    <div className="aws-azure-help-codebox">
                      <code>{example.awsCode.trim()}</code>
                    </div>
                    <h3 className="aws-azure-help-subheading">Azure</h3>
                    <div className="aws-azure-help-codebox">
                      <code>{example.azureCode.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </section>
                ))}
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="aws-azure-help-section">
                <h2 className="aws-azure-help-heading">Glossary</h2>
                {glossaryTerms.map((item) => (
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
