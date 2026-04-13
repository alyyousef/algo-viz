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
  gcpCode: string
  explanation: string
}

type GlossaryItem = {
  term: string
  definition: string
}

const pageTitle = 'AWS vs GCP'
const pageSubtitle =
  'Comparing the broadest cloud platform with the cloud platform most associated with data, Kubernetes, and a global-network-first design.'
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
      'AWS and Google Cloud Platform are both serious hyperscale clouds, but they tend to attract teams for different reasons. AWS is usually seen as the broadest cloud platform with the deepest service catalog and the strongest general-purpose cloud-native reference position. GCP is usually seen as the cloud with especially strong credibility around data platforms, Kubernetes, developer ergonomics, and network design that often feels cleaner and more opinionated.',
      'Both platforms cover the same major categories: virtual machines, containers, serverless, object storage, managed databases, networking, IAM, observability, AI services, infrastructure automation, and security tooling. The real comparison is not about whether one has compute and the other does not. The real comparison is about platform shape, resource hierarchy, network model, data gravity, operational complexity, and the engineering culture each cloud seems to encourage.',
      'A useful shorthand is this: AWS usually wins on sheer breadth, mature service optionality, and being the default cloud reference for many architecture patterns; GCP usually wins when teams care deeply about cleaner project structure, a global-network-centered model, first-class data and analytics workflows, and a platform experience that often feels more streamlined.',
    ],
  },
  {
    id: 'bp-philosophy',
    title: 'Philosophy Difference',
    paragraphs: [
      'AWS historically grew as a huge catalog of cloud primitives and managed services. It tends to reward teams willing to compose many parts together and learn a large amount of provider-specific detail. That can be a strength because it gives architects many options, but it also means the platform can feel sprawling and sometimes uneven across services.',
      'GCP often feels more systems-shaped and product-line coherent. Its project model, global network story, managed data products, and Kubernetes lineage create an impression of fewer but more tightly integrated choices in several areas. GCP is still a large cloud, but it often feels like it wants teams to work through a smaller number of clearer platform opinions.',
      'That means AWS often feels like the maximum-choice cloud, while GCP often feels like the cleaner-model cloud. Neither framing is universally correct, but it captures why some teams experience AWS as more powerful and others experience GCP as more elegant.',
    ],
  },
  {
    id: 'bp-where',
    title: 'Where Each Fits Best',
    paragraphs: [
      'AWS is especially strong for organizations that want the broadest possible managed-service menu, teams building cloud platforms from many infrastructure primitives, companies that expect to use many specialized vendor services over time, and businesses that want the default industry reference cloud for multi-account platform engineering.',
      'GCP is especially strong for data-heavy platforms, analytics and ML organizations, teams that care a lot about Kubernetes and container ergonomics, engineers who prefer a simpler project and networking model, and products that want a cloud platform with particularly strong managed data services and a good developer experience around modern application deployment.',
      'If the central question is Which cloud gives me the biggest service universe and the most architecture permutations, AWS usually has the edge. If the central question is Which cloud gives me the cleanest experience for data, Kubernetes, and global-network-oriented application design, GCP is often the stronger answer.',
    ],
  },
  {
    id: 'bp-quick-picks',
    title: 'Quick Decision Guide',
    bullets: [
      'Choose AWS when maximum service breadth and long-term platform optionality matter most.',
      'Choose GCP when data platforms, Kubernetes, Cloud Run style deployment, and cleaner global networking matter most.',
      'Choose AWS when your platform team is comfortable standardizing a large, highly composable service catalog.',
      'Choose GCP when your team wants a cloud experience that often feels more opinionated and less sprawling.',
      'If the debate is really about data and ML gravity versus general cloud breadth, that is probably the true decision boundary.',
    ],
  },
]

const mentalModels = [
  {
    title: 'AWS is the maximum-choice cloud',
    detail:
      'Its biggest strength is the depth and width of the service catalog and the ability to compose many specialized services into one platform.',
  },
  {
    title: 'GCP is strongly shaped by Google infrastructure instincts',
    detail:
      'Its network model, data systems, container story, and managed platform services often feel more integrated and opinionated.',
  },
  {
    title: 'Resource hierarchy matters more on GCP than many teams expect',
    detail:
      'Organizations, folders, and especially projects become the core unit of ownership, billing, IAM, API enablement, and service boundaries.',
  },
  {
    title: 'Network design feels fundamentally different',
    detail:
      'AWS commonly makes teams think region-first and VPC-first, while GCP often makes teams think in terms of global private networking with regional resources attached.',
  },
  {
    title: 'Data platform gravity is a major GCP differentiator',
    detail:
      'BigQuery, managed analytics workflows, and Google lineage around large-scale data systems make GCP especially attractive for data-centric organizations.',
  },
  {
    title: 'Kubernetes culture is not incidental on GCP',
    detail:
      'GKE is not just another managed Kubernetes product. It reflects Google lineage around containers and orchestration, which shapes how many teams perceive the platform.',
  },
  {
    title: 'Cloud choice is still organizational architecture',
    detail:
      'IAM, billing structure, training, observability, infrastructure automation, support expectations, and vendor leverage all shift with the platform you pick.',
  },
]

const coreSections: DocSection[] = [
  {
    id: 'core-platform-shape',
    title: 'Overall Platform Shape',
    paragraphs: [
      'AWS presents an enormous service universe. For many problem categories there are several plausible approaches, and the platform often rewards deep knowledge of service-specific tradeoffs. That makes AWS very flexible, but it also increases the number of decisions a platform team must standardize for everyone else.',
      'GCP also spans the full cloud stack, but it often feels narrower in a productive way. The platform emphasizes a smaller number of strongly positioned services in some categories, especially data, Kubernetes, and application deployment. Teams often experience this as lower cognitive overhead, though the tradeoff is fewer specialized first-party permutations than AWS offers.',
      'This difference matters most at scale. AWS often optimizes for service composability and optionality. GCP often optimizes for coherence, especially for teams that want the cloud platform to feel less like a giant marketplace of building blocks.',
    ],
  },
  {
    id: 'core-resource-model',
    title: 'Resource Hierarchy, Accounts, and Project Boundaries',
    paragraphs: [
      'AWS usually organizes mature estates around many accounts, often managed through AWS Organizations and organizational units. Accounts become a major isolation, billing, and governance boundary. This is a powerful model, but it means platform teams must think very carefully about account topology and cross-account access patterns from early on.',
      'GCP commonly organizes around an organization resource, optional folders, and projects. Projects are especially central because they group APIs, IAM, quotas, billing relationships, service usage, and many operational boundaries. That project-centric design often feels simple and concrete to teams because the unit of ownership is visible and consistent across much of the platform.',
      'Neither model is universally better. AWS accounts provide strong isolation and are loved by many mature platform teams. GCP projects often feel cleaner and easier to reason about day to day, particularly for teams that want fewer layers between application ownership and cloud resources.',
    ],
  },
  {
    id: 'core-compute',
    title: 'Compute Options and Application Hosting',
    paragraphs: [
      'AWS offers EC2, ECS, EKS, Lambda, Fargate, and several higher-level hosting products, which means teams can choose from many compute abstractions. That is excellent for optimization and specialization, but it can produce architectural inconsistency if teams do not establish strong standards.',
      'GCP offers Compute Engine, GKE, Cloud Run, Cloud Functions, and App Engine. The lineup is broad enough for most modern workloads, but many teams find the compute story easier to reason about because Cloud Run and GKE are so strongly positioned for modern application hosting. GCP often feels like it has fewer competing answers for the same question.',
      'If the team wants maximum compute permutations, AWS usually wins. If the team wants a clear path for VMs, containers, and serverless containers without quite as much service sprawl, GCP often feels more streamlined.',
    ],
  },
  {
    id: 'core-identity',
    title: 'Identity, Access Control, and Security Boundaries',
    paragraphs: [
      'AWS IAM is one of the most important and most difficult parts of AWS. Policies, roles, resource scoping, federated access, and cross-account access are foundational to secure design. Mature AWS usage usually requires a lot of deliberate IAM engineering because almost everything depends on it.',
      'GCP IAM also matters deeply, but many teams find the model easier to reason about because it sits naturally on top of the organization, folder, and project hierarchy. Principals, roles, and policies still require care, but the resource tree gives teams a more visibly structured permission landscape in many cases.',
      'AWS often feels more permission-language heavy. GCP often feels more hierarchy-language heavy. Both can be secure and both can become messy, but the operational burden tends to feel different.',
    ],
  },
  {
    id: 'core-networking',
    title: 'Networking and Traffic Model',
    paragraphs: [
      'AWS networking is deeply centered on VPCs, subnets, routing, gateways, load balancers, security groups, and region-level placement decisions. It is mature and powerful, but it expects teams to think carefully about many low-level networking constructs and about how regional deployment shapes design.',
      'GCP networking is one of its most distinctive features. VPCs are global resources, while subnets are regional. That changes the mental model significantly. Many teams find GCP networking conceptually cleaner because the private network can span regions without needing quite the same account of regional VPC fragmentation that AWS often encourages.',
      'This is one of the most practically important differences between the clouds. AWS networking often feels like deep infrastructure architecture. GCP networking often feels like a more integrated global platform model.',
    ],
  },
  {
    id: 'core-storage',
    title: 'Storage Model and Object Storage',
    paragraphs: [
      'Amazon S3 and Google Cloud Storage are both foundational object storage systems and both support durable, massive-scale unstructured storage. S3 is one of the defining AWS services and is central to huge numbers of AWS-native architectures. Cloud Storage plays a similarly central role on GCP for application assets, archives, logs, data pipelines, and analytics staging.',
      'The deeper difference is not that one can store objects and the other cannot. The difference is how storage fits into the rest of the platform. On AWS, S3 often sits in the middle of event-driven and service-composition patterns. On GCP, Cloud Storage often sits naturally beside analytics products, Cloud Run workflows, and data-processing systems in a way that feels very integrated with the rest of the Google data platform story.',
      'If object storage is just a bucket abstraction to you, the platforms look similar. If object storage is part of a broader event, analytics, and application architecture, the ecosystem around it matters much more.',
    ],
  },
  {
    id: 'core-data',
    title: 'Databases, Analytics, and Data Platform Direction',
    paragraphs: [
      'AWS has an enormous data portfolio across managed relational databases, DynamoDB, warehousing, streaming, lakes, and analytics infrastructure. It can support almost any data architecture, but teams often need to assemble a larger set of services depending on the analytical workload and data platform shape they want.',
      'GCP has strong managed relational options too, but its reputation is especially shaped by BigQuery and the broader managed analytics story. For many organizations, GCP feels unusually compelling when the core business value comes from analytics, event processing, ML pipelines, or a platform where data workflows are central rather than secondary.',
      'If the company wants the broadest possible set of data building blocks, AWS is excellent. If the company wants one of the clearest managed analytics value propositions in public cloud, GCP often has the stronger instinctive appeal.',
    ],
  },
  {
    id: 'core-containers',
    title: 'Containers and Kubernetes',
    paragraphs: [
      'AWS offers ECS and EKS, which gives teams both a proprietary AWS-native orchestrator and managed upstream Kubernetes. That is powerful because organizations can choose how much they want to invest in Kubernetes itself. But it also adds another architectural decision that platform teams must standardize.',
      'GCP offers GKE, and GKE is one of the most important reasons many teams take GCP seriously in the first place. Because Google lineage is deeply connected to container orchestration history, many engineers see GKE as one of the strongest managed Kubernetes offerings in the market. GCP also pairs Kubernetes naturally with Cloud Run for cases where teams want containers without full cluster operations.',
      'If the platform team wants both ECS-like non-Kubernetes orchestration and Kubernetes under one cloud vendor, AWS has a broader menu. If the team wants a cloud whose container platform identity is especially strong and Kubernetes-native, GCP often feels more focused and mature.',
    ],
  },
  {
    id: 'core-serverless',
    title: 'Serverless and Modern Application Deployment',
    paragraphs: [
      'AWS Lambda remains one of the defining products in modern serverless architecture. It integrates naturally with S3, queues, streams, EventBridge, API Gateway, and many other services. AWS often feels especially natural for event-driven applications built from many managed components.',
      'GCP offers Cloud Functions, but many teams increasingly think about GCP serverless through Cloud Run as much as through function-specific products. Cloud Run is important because it gives teams a managed serverless container model that is easy to understand, portable at the container boundary, and often very pleasant for modern web services and APIs.',
      'That creates a real difference in feel. AWS serverless culture often centers on functions as first-class primitives. GCP serverless culture often centers on functions plus a very strong container-first serverless option.',
    ],
  },
  {
    id: 'core-devops',
    title: 'Infrastructure as Code, Delivery, and Platform Automation',
    paragraphs: [
      'AWS supports CloudFormation, CDK, Terraform, and many CI and deployment approaches. Large AWS estates usually need significant platform engineering effort to make this coherent because the service catalog is broad and account structures can become complex quickly.',
      'GCP also works well with Terraform and other automation approaches, and many teams find platform automation straightforward because the project model and product surface can feel less sprawling. Google also tends to push strongly on developer workflows that connect code, containers, artifact management, and deployment more directly around modern application paths.',
      'In practice, the bigger difference is not that one cloud supports automation and the other does not. The difference is how much complexity the platform team must absorb before automation patterns feel stable and reusable.',
    ],
  },
  {
    id: 'core-observability',
    title: 'Observability, Monitoring, and Day-2 Operations',
    paragraphs: [
      'AWS provides CloudWatch, CloudTrail, Config, X-Ray, GuardDuty, Security Hub, and many surrounding services. The tools are powerful, but mature operations often involve stitching multiple AWS services together into one coherent operational practice across accounts and environments.',
      'GCP provides Cloud Logging, Cloud Monitoring, audit logging, operations tooling, and integrated observability across much of the platform. Many teams find the experience comparatively streamlined because the project model, IAM hierarchy, and platform shape can make operational boundaries easier to understand.',
      'Neither platform makes observability automatic. AWS often rewards teams that build explicit operational standards across a large landscape. GCP often rewards teams that want fewer conceptual pieces between workload ownership and observability setup.',
    ],
  },
  {
    id: 'core-pricing',
    title: 'Pricing, Cost Management, and Efficiency Reality',
    paragraphs: [
      'Both AWS and GCP have complex pricing. Compute, managed databases, storage class selection, network egress, observability, and committed-use models all matter. Any comparison based on one synthetic benchmark or one anecdotal bill screenshot is weak analysis.',
      'AWS pricing conversations often revolve around service-by-service optimization, reserved models, savings plans, and governance over broad service usage. GCP pricing conversations often emphasize sustained use, committed use, and whether the cleaner platform shape leads to lower architectural overhead for a specific workload pattern.',
      'Cost is therefore not just a rate-card question. It is a combined question of workload design, platform discipline, data gravity, egress patterns, and how many managed services the team ends up depending on.',
    ],
  },
  {
    id: 'core-global',
    title: 'Global Footprint and Geographic Architecture',
    paragraphs: [
      'AWS explicitly frames its global infrastructure around Regions and Availability Zones. The region and AZ model is central to AWS reliability thinking and is reflected in many best-practice architectures. Teams learn to think about failure domains, regional service support, and placement choices early.',
      'GCP also operates globally at scale, but because the network model feels more global and integrated, teams sometimes experience geography differently on GCP. Regions and zones still matter, but the networking and project experience often feels less fragmented by those boundaries in everyday design conversations.',
      'In both clouds, the real lesson is the same: resilient architecture depends on the specific services you use and the failure domains they expose. The difference is mostly in how visible and central those geographic abstractions feel in ordinary platform design.',
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Ecosystem, Skills, and Team Fit',
    paragraphs: [
      'AWS skills are extremely common and portable. For many organizations, choosing AWS feels organizationally safe because hiring, training, third-party integrations, and consulting support are all abundant. Many engineers first learn public cloud concepts through AWS terminology.',
      'GCP has a smaller footprint, but it often attracts teams with strong data, ML, container, or developer-platform sensibilities. It can be a very high-leverage choice for organizations whose engineering identity already aligns with those strengths. In some companies, GCP feels like the cloud that fits the product better even if AWS looks broader on paper.',
      'This is why cloud choice is rarely just a service comparison table. Skills availability, vendor alignment, internal architecture culture, and the type of engineering work the company does every day usually matter more than a list of feature checkmarks.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Tradeoffs and Failure Modes',
    paragraphs: [
      'AWS can create too much choice. Teams may end up with overlapping patterns across accounts, inconsistent service selection, and governance complexity that grows faster than product value. The price of AWS optionality is that someone has to standardize it.',
      'GCP can look deceptively simple in comparison, which creates a different risk: teams may underestimate how much cloud-specific expertise is still required, especially around IAM, quotas, networking, and data-service behavior. The cleaner experience does not eliminate the need for platform engineering discipline.',
      'A poor AWS outcome often looks like service sprawl. A poor GCP outcome often looks like a team assuming the platform is simpler than its production responsibilities actually are. Both clouds reward clarity, standards, and serious operational ownership.',
    ],
  },
  {
    id: 'core-checklist',
    title: 'Decision Checklist',
    bullets: [
      'Choose AWS when maximum service breadth and mature cloud optionality are the top priorities.',
      'Choose GCP when data platforms, Kubernetes, and streamlined modern application deployment dominate the discussion.',
      'Prefer AWS when your platform team is ready to manage account topology and service standardization at scale.',
      'Prefer GCP when your team values a cleaner project model and especially strong data-platform gravity.',
      'If Cloud Run and GKE feel like your natural application platform, GCP usually deserves serious weight.',
      'If you want the default industry reference cloud with the biggest general-purpose menu, AWS usually remains the safer default.',
    ],
  },
]

const examples: ExampleItem[] = [
  {
    id: 'ex-vm',
    title: 'Launch a Virtual Machine',
    summary:
      'Both clouds can create a VM quickly, but the command shape already hints at their resource models and default assumptions.',
    awsCode: `aws ec2 run-instances \\
  --image-id ami-1234567890abcdef0 \\
  --instance-type t3.micro \\
  --subnet-id subnet-0123456789abcdef0 \\
  --security-group-ids sg-0123456789abcdef0 \\
  --associate-public-ip-address`,
    gcpCode: `gcloud compute instances create web-01 \\
  --project app-prod \\
  --zone us-central1-a \\
  --machine-type e2-medium \\
  --subnet default \\
  --image-family debian-12 \\
  --image-project debian-cloud`,
    explanation:
      'AWS starts from the EC2 and subnet vocabulary directly inside an account. GCP makes the project boundary explicit, which reflects how central projects are to ownership, billing, and API scope across the platform.',
  },
  {
    id: 'ex-storage',
    title: 'Upload an Object to Cloud Storage',
    summary:
      'Object storage is foundational on both clouds, but the surrounding platform patterns around it differ.',
    awsCode: `aws s3 cp ./report.csv s3://finance-archive-logs/reports/2026/report.csv`,
    gcpCode: `gcloud storage cp ./report.csv gs://finance-archive-logs/reports/2026/report.csv`,
    explanation:
      'S3 is deeply embedded in AWS event and service-composition patterns. Cloud Storage is equally central on GCP but often feels especially close to analytics and data-platform workflows.',
  },
  {
    id: 'ex-serverless',
    title: 'Deploy a Simple Serverless Handler',
    summary:
      'Serverless exists on both clouds, but the preferred unit of deployment often feels different.',
    awsCode: `export const handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'hello from lambda' }),
  }
}`,
    gcpCode: `from flask import Flask

app = Flask(__name__)

@app.get('/')
def hello():
    return {'message': 'hello from cloud run'}`,
    explanation:
      'Lambda remains the archetypal AWS serverless primitive. On GCP, many teams increasingly think in terms of Cloud Run as a serverless container target rather than limiting the conversation to function-only deployment.',
  },
  {
    id: 'ex-kubernetes',
    title: 'Create a Managed Kubernetes Cluster',
    summary:
      'Both clouds can provision managed Kubernetes, but the cultural weight of the product differs.',
    awsCode: `eksctl create cluster \\
  --name app-prod \\
  --region us-east-1 \\
  --nodes 3`,
    gcpCode: `gcloud container clusters create-auto app-prod \\
  --project app-prod \\
  --region us-central1`,
    explanation:
      'EKS is strong, but AWS also offers ECS, so Kubernetes is one major path among several. On GCP, GKE often feels closer to the center of the cloud application platform story.',
  },
]

const glossaryTerms: GlossaryItem[] = [
  {
    term: 'AWS account',
    definition:
      'A primary AWS isolation and billing boundary often used to separate environments, teams, or workloads.',
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
    term: 'VPC',
    definition:
      'A private cloud network construct; on AWS it is region-scoped, while on GCP the VPC itself is global and subnets are regional.',
  },
  {
    term: 'Availability Zone',
    definition:
      'A physically distinct location within a region used to reduce shared failure domains.',
  },
  {
    term: 'S3',
    definition:
      'Amazon Simple Storage Service, AWS object storage for durable, scalable unstructured data.',
  },
  {
    term: 'Cloud Storage',
    definition:
      'Google Cloud object storage for durable, scalable unstructured data used by applications, archives, and analytics workflows.',
  },
  {
    term: 'Lambda',
    definition:
      'AWS serverless compute for running event-driven functions without managing servers directly.',
  },
  {
    term: 'Cloud Run',
    definition:
      'Google Cloud managed serverless container platform for deploying HTTP services and other containerized workloads.',
  },
  {
    term: 'EKS',
    definition: 'Amazon Elastic Kubernetes Service, AWS managed Kubernetes.',
  },
  {
    term: 'GKE',
    definition: 'Google Kubernetes Engine, Google Cloud managed Kubernetes.',
  },
  {
    term: 'BigQuery',
    definition:
      'Google Cloud managed analytics data warehouse service that is central to many GCP data platform decisions.',
  },
  {
    term: 'CloudWatch',
    definition:
      'AWS monitoring and observability service family for metrics, logs, alarms, and operational visibility.',
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
    { id: 'core-resource-model', label: 'Resource Hierarchy' },
    { id: 'core-compute', label: 'Compute' },
    { id: 'core-identity', label: 'Identity and Access' },
    { id: 'core-networking', label: 'Networking' },
    { id: 'core-storage', label: 'Storage' },
    { id: 'core-data', label: 'Data Platforms' },
    { id: 'core-containers', label: 'Containers and Kubernetes' },
    { id: 'core-serverless', label: 'Serverless' },
    { id: 'core-devops', label: 'IaC and Delivery' },
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

export default function AwsVsGcpPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle,
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title={pageTitle}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">{pageTitle}</h1>
      <p className="bin98-doc-subtitle">{pageSubtitle}</p>
      <p>
        This page compares AWS and GCP as platform choices for real infrastructure, application, and
        organization design. The point is not to memorize product names. The point is to understand
        the deeper tradeoffs: service breadth, resource hierarchy, network model, data-platform
        gravity, Kubernetes posture, serverless style, operational complexity, and the kind of
        engineering organization each cloud tends to fit best.
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
