import { useState } from 'react'

import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

// ─── Big Picture ──────────────────────────────────────────────────────────────

const bigPicture = [
  {
    title: 'What it is',
    details:
      'Cloud platforms are on-demand infrastructure delivered over the internet — compute, storage, networking, databases, messaging, and managed services. AWS, Azure, and GCP are the three dominant hyperscalers, each offering hundreds of services behind a global network of data centers.',
    notes:
      'As of 2024: AWS holds ~31% of cloud infrastructure market share, Azure ~25%, GCP ~11%. All three offer comparable core services; differentiation lies in managed services, pricing models, ecosystem integrations, and regional footprint.',
  },
  {
    title: 'Why it matters',
    details:
      'Cloud platforms replaced on-premises data centers for most workloads. They provide elasticity (scale out on demand), managed services (offload operational burden), global reach (deploy close to users), and a pay-as-you-go model that converts capital expenditure to operational expenditure.',
    notes:
      'Understanding cloud fundamentals — compute models, IAM, networking, storage, and managed databases — is essential for any backend, DevOps, or platform engineering role.',
  },
  {
    title: 'The service model spectrum',
    details:
      'IaaS (Infrastructure as a Service): raw VMs, networks, disks — you manage the OS and above. PaaS (Platform as a Service): managed runtimes, databases, app servers — you manage the application. SaaS (Software as a Service): fully managed products. Serverless sits between PaaS and SaaS: you write functions; the platform manages everything else.',
    notes:
      'Moving up the stack reduces operational burden but increases abstraction and potential lock-in. Most modern architectures mix all three layers.',
  },
  {
    title: 'The shared responsibility model',
    details:
      'Cloud providers secure the infrastructure (hardware, hypervisor, physical data center). Customers secure what runs on it: IAM configuration, data encryption, network access controls, OS patching (for IaaS), and application security. Misunderstanding this boundary is the root cause of most cloud security incidents.',
    notes:
      'The higher up the stack (serverless, managed services), the more security responsibility shifts to the provider. The lower (bare VMs), the more falls on you.',
  },
]

// ─── Mental Model ─────────────────────────────────────────────────────────────

const mentalModel = [
  {
    title: 'Regions and availability zones',
    detail:
      'A region is a geographic cluster of data centers (e.g. us-east-1). Each region contains 2–6+ availability zones (AZs) — isolated physical facilities with independent power and networking. Distribute workloads across AZs for high availability; use multiple regions for disaster recovery and latency optimization.',
  },
  {
    title: 'IAM is the security perimeter',
    detail:
      'Identity and Access Management governs who (users, roles, services) can do what (actions) on which resources. Every API call is an IAM decision. The principle of least privilege — granting only the permissions required — is the single most impactful security control in cloud environments.',
  },
  {
    title: 'Everything is an API',
    detail:
      'Cloud resources are provisioned, configured, and managed via APIs. The console is just a UI over these APIs. Infrastructure as Code (Terraform, CloudFormation, Pulumi) captures resource configuration as version-controlled files, enabling reproducible, auditable, and automated infrastructure.',
  },
  {
    title: 'Managed services trade control for simplicity',
    detail:
      'A managed database (RDS, Cloud SQL, Azure SQL) handles patching, backups, failover, and replication. You lose direct OS access and some configuration flexibility but gain operational simplicity. Evaluate each managed service by what it automates versus what it restricts.',
  },
  {
    title: 'Networking is foundational',
    detail:
      'VPCs (Virtual Private Clouds) are your private network inside the cloud. Subnets partition the VPC into public-facing and private segments. Security groups and NACLs control traffic. Everything in a private subnet is unreachable from the internet by default — intentionally.',
  },
  {
    title: 'Cost requires active management',
    detail:
      'Cloud bills surprise teams that treat infrastructure as infinitely scalable without cost awareness. Compute (EC2/VMs), data transfer, and storage are the top cost drivers. Use reserved instances/commitments for predictable workloads. Set billing alerts. Tag resources for cost allocation. Review costs monthly.',
  },
]

// ─── Compute Models ───────────────────────────────────────────────────────────

const computeModels = [
  {
    title: 'Virtual Machines (IaaS)',
    detail:
      'EC2 (AWS), Azure VMs, Compute Engine (GCP). Full OS access, maximum flexibility, maximum operational burden. You manage OS patching, security hardening, monitoring agents, and scaling. Use for: legacy apps, workloads requiring specific OS configs, HPC, and anything that cannot run in containers or serverless.',
  },
  {
    title: 'Containers on managed Kubernetes',
    detail:
      'EKS (AWS), AKS (Azure), GKE (GCP). Kubernetes orchestrates containerized workloads: scheduling, scaling, self-healing, service discovery. The cloud manages the control plane; you manage node pools and workloads. Standard choice for microservices in production.',
  },
  {
    title: 'Managed container services (no Kubernetes)',
    detail:
      'ECS (AWS), Azure Container Apps, Cloud Run (GCP). Run containers without managing Kubernetes. ECS Fargate and Cloud Run are serverless — no node management. Lower operational overhead than Kubernetes; less configurability. Good for teams without Kubernetes expertise.',
  },
  {
    title: 'Serverless functions (FaaS)',
    detail:
      'Lambda (AWS), Azure Functions, Cloud Functions (GCP). Event-driven functions that scale to zero. You write the handler; the platform manages runtime, scaling, and execution. Pay per invocation and duration. Cold starts add latency. Best for: event processing, webhooks, scheduled tasks, lightweight APIs.',
  },
  {
    title: 'PaaS app hosting',
    detail:
      'Elastic Beanstalk (AWS), Azure App Service, App Engine (GCP). Deploy application code; the platform handles runtime, scaling, and OS. Less control than containers; faster to deploy. Good for teams that want managed deployments without learning Kubernetes.',
  },
]

// ─── Storage ──────────────────────────────────────────────────────────────────

const storageConcepts = [
  {
    title: 'Object storage',
    detail:
      'S3 (AWS), Azure Blob Storage, GCS (GCP). Store arbitrary files as objects (blobs) addressed by key. Unlimited scale, 11 nines durability, cheap at rest, charges per request and egress. Use for: static assets, backups, data lake ingestion, ML datasets, deployment artifacts.',
  },
  {
    title: 'Block storage',
    detail:
      'EBS (AWS), Azure Managed Disks, Persistent Disk (GCP). Network-attached virtual disks for VMs and containers. SSD and HDD tiers. Attached to one instance at a time (with multi-attach exceptions). Use for: databases on VMs, high-IOPS workloads, OS volumes.',
  },
  {
    title: 'File storage',
    detail:
      'EFS (AWS), Azure Files, Filestore (GCP). NFS/SMB-compatible shared file systems mountable by multiple VMs simultaneously. Use for: shared content between instances, legacy apps that expect a file system, CMS media directories.',
  },
  {
    title: 'Storage tiers and lifecycle policies',
    detail:
      'Object storage offers access tiers: hot (frequent access), cool/infrequent, archive (retrieval delay). Lifecycle policies automatically transition objects between tiers based on age or last-access patterns. Moving old logs to archive can cut storage costs by 70%+.',
  },
]

// ─── Databases ────────────────────────────────────────────────────────────────

const databaseServices = [
  {
    title: 'Managed relational databases',
    detail:
      'RDS (AWS — MySQL, Postgres, SQL Server, Oracle), Azure SQL Database / Flexible Server, Cloud SQL (GCP). Managed patching, backups, replication, and failover. Multi-AZ deployments provide automatic failover in ~60 seconds. Aurora (AWS) is a cloud-native Postgres/MySQL-compatible engine with up to 5x performance of standard RDS.',
  },
  {
    title: 'Managed NoSQL',
    detail:
      'DynamoDB (AWS — key-value/document), Cosmos DB (Azure — multi-model, multi-API), Firestore / Bigtable / Spanner (GCP). Each has different consistency, latency, and query models. DynamoDB single-digit millisecond at any scale; Cosmos DB configurable consistency levels; Spanner is globally distributed SQL.',
  },
  {
    title: 'In-memory caches',
    detail:
      'ElastiCache (AWS — Redis/Memcached), Azure Cache for Redis, Memorystore (GCP). Managed Redis reduces session store, cache-aside, and pub/sub latency to sub-millisecond. Use to offload hot read paths from relational databases.',
  },
  {
    title: 'Data warehouse',
    detail:
      'Redshift (AWS), Azure Synapse Analytics, BigQuery (GCP). Columnar storage optimized for analytical queries (OLAP) across petabytes. Separate from transactional databases (OLTP). Ingest from object storage, streaming pipelines, or direct connectors. BigQuery is serverless — no cluster management.',
  },
  {
    title: 'Search',
    detail:
      'OpenSearch Service (AWS — managed Elasticsearch/OpenSearch), Azure AI Search, Vertex AI Search (GCP). Full-text search, vector search, and faceting at scale. Use when relational LIKE queries or DynamoDB scans are insufficient for search UX requirements.',
  },
]

// ─── Networking ───────────────────────────────────────────────────────────────

const networkingConcepts = [
  {
    title: 'VPC (Virtual Private Cloud)',
    detail:
      'An isolated virtual network within a cloud region. You define the IP CIDR range, subnets, route tables, and internet gateway. Resources in a VPC are isolated from other customers and from the internet unless you explicitly allow access.',
  },
  {
    title: 'Subnets — public vs private',
    detail:
      'Public subnets have a route to an Internet Gateway — resources can have public IPs. Private subnets have no direct internet route — resources communicate outbound via a NAT Gateway. Databases, internal services, and worker nodes belong in private subnets.',
  },
  {
    title: 'Security groups and NACLs',
    detail:
      'Security groups are stateful, instance-level firewalls. NACLs (Network ACLs) are stateless, subnet-level rules. Security groups are the primary control: allow only the ports and source IPs required. Default: deny all inbound, allow all outbound.',
  },
  {
    title: 'Load balancers',
    detail:
      'ALB (Application Load Balancer) — HTTP/HTTPS, content-based routing, WebSocket. NLB (Network Load Balancer) — TCP/UDP, ultra-low latency, static IPs. Azure Load Balancer / Application Gateway, GCP Cloud Load Balancing. Distribute traffic across instances or containers and enable health-check-based failover.',
  },
  {
    title: 'CDN',
    detail:
      'CloudFront (AWS), Azure Front Door / CDN, Cloud CDN (GCP). Cache static assets at edge PoPs (Points of Presence) globally. Reduce origin load and improve latency for geographically distributed users. Use for: static sites, media delivery, API acceleration, DDoS mitigation.',
  },
  {
    title: 'Private connectivity',
    detail:
      'VPC Peering connects two VPCs. PrivateLink / Private Service Connect exposes a service to other VPCs without traversing the public internet. VPN and Direct Connect / ExpressRoute / Cloud Interconnect provide encrypted or dedicated links between on-premises networks and the cloud.',
  },
]

// ─── IAM and Security ─────────────────────────────────────────────────────────

const iamSecurity = [
  {
    title: 'Principle of least privilege',
    detail:
      'Grant only the permissions required for a specific task. Use IAM roles (not long-lived access keys) for service-to-service auth. Audit permissions regularly with tools like AWS IAM Access Analyzer, Azure AD Access Reviews, or GCP Policy Analyzer.',
  },
  {
    title: 'IAM roles vs users',
    detail:
      'IAM users have permanent credentials — avoid for service accounts. IAM roles issue temporary credentials (STS, Workload Identity, Managed Identity) that rotate automatically. Assign roles to EC2 instances, Lambda functions, and Kubernetes pods instead of storing keys in environment variables.',
  },
  {
    title: 'Secrets management',
    detail:
      'AWS Secrets Manager / Parameter Store, Azure Key Vault, GCP Secret Manager. Store database passwords, API keys, and certificates centrally. Rotate secrets automatically. Never store secrets in environment variables hardcoded at deploy time or in source control.',
  },
  {
    title: 'Encryption at rest and in transit',
    detail:
      'All major managed services encrypt data at rest by default (AES-256). Use TLS 1.2+ for all data in transit. Bring your own KMS keys for regulatory compliance or audit requirements. Enable field-level encryption for PII where appropriate.',
  },
  {
    title: 'Cloud security posture management',
    detail:
      'AWS Security Hub / GuardDuty, Azure Defender for Cloud, GCP Security Command Center. Continuously monitor resource configurations against security baselines. Alert on public S3 buckets, overly permissive IAM policies, unencrypted volumes, and suspicious API call patterns.',
  },
  {
    title: 'Audit logging',
    detail:
      'CloudTrail (AWS), Azure Activity Log + Diagnostic Logs, Cloud Audit Logs (GCP). Every API call is logged: who, what, when, from where. Enable audit logs in all regions. Forward logs to a centralized, tamper-resistant sink (S3 + CloudWatch, Azure Monitor, GCP Cloud Logging).',
  },
]

// ─── Messaging and Events ─────────────────────────────────────────────────────

const messagingServices = [
  {
    title: 'Message queues',
    detail:
      'SQS (AWS), Azure Service Bus Queues, Cloud Tasks (GCP). Decouple producers from consumers. Messages are stored until consumed. Enable retry, DLQ (dead-letter queue), and backpressure patterns. FIFO queues guarantee ordering; standard queues maximize throughput.',
  },
  {
    title: 'Pub/Sub messaging',
    detail:
      'SNS (AWS), Azure Service Bus Topics, GCP Pub/Sub. Fan-out a message to multiple subscribers. SNS + SQS fan-out pattern: SNS publishes, multiple SQS queues subscribe. Each subscriber receives a copy independently.',
  },
  {
    title: 'Streaming',
    detail:
      'Kinesis (AWS), Azure Event Hubs, GCP Pub/Sub. High-throughput ordered event streams with configurable retention. Consumers read at their own pace and can replay from any offset. Use for: real-time analytics, log aggregation, change data capture, event sourcing.',
  },
  {
    title: 'Event-driven architecture',
    detail:
      'EventBridge (AWS), Azure Event Grid, GCP Eventarc. Route events from cloud services (S3 object created, DynamoDB record changed, Pub/Sub message) to Lambda/Functions/Workflows via routing rules. Enables loosely coupled microservices that react to state changes without polling.',
  },
]

// ─── Infrastructure as Code ───────────────────────────────────────────────────

const iacConcepts = [
  {
    title: 'Terraform',
    detail:
      "HashiCorp's cloud-agnostic IaC tool. Declarative HCL defines desired state. terraform plan previews changes; terraform apply applies them. State is stored remotely (S3, Terraform Cloud). Providers exist for every major cloud and SaaS. The most widely adopted IaC tool across all three clouds.",
  },
  {
    title: 'Pulumi',
    detail:
      'IaC using real programming languages (TypeScript, Python, Go, C#). Same cloud coverage as Terraform. More expressive for complex conditional logic and loops. State managed by Pulumi Cloud or self-hosted backends. Preferred by teams who find HCL limiting.',
  },
  {
    title: 'CloudFormation / ARM / Deployment Manager',
    detail:
      'Native IaC tools for AWS (CloudFormation), Azure (ARM templates / Bicep), and GCP (Deployment Manager). Deep platform integration — access to new services before Terraform providers add support. Verbose and less portable than Terraform.',
  },
  {
    title: 'CDK (Cloud Development Kit)',
    detail:
      'AWS CDK synthesizes CloudFormation from TypeScript, Python, Java, or C#. Azure CDK (experimental) and CDK for Terraform (cdktf) exist. Allows object-oriented infrastructure with reusable constructs. Popular for AWS-native teams who want typed infrastructure.',
  },
  {
    title: 'GitOps principle',
    detail:
      'Infrastructure configuration lives in git. Changes go through pull request review. CI/CD applies changes automatically after merge. Git history provides a full audit trail. Argo CD and Flux implement GitOps for Kubernetes; Terraform Cloud and Atlantis implement it for Terraform.',
  },
]

// ─── Containers and Kubernetes ────────────────────────────────────────────────

const containersConcepts = [
  {
    title: 'Container fundamentals',
    detail:
      'A container packages an application and its dependencies into an isolated runtime. Docker is the standard container format. Images are built from Dockerfiles and stored in registries (ECR, ACR, GCR, Docker Hub). Containers share the host kernel — lighter than VMs but less isolated.',
  },
  {
    title: 'Kubernetes core concepts',
    detail:
      'Pod: the smallest deployable unit (one or more containers). Deployment: manages replicas and rolling updates. Service: stable DNS name and load balancing for pods. Ingress: HTTP routing to Services. ConfigMap/Secret: configuration injection. Namespace: logical cluster partition.',
  },
  {
    title: 'Managed Kubernetes — EKS/AKS/GKE',
    detail:
      'The cloud manages the control plane (API server, etcd, scheduler). You manage node groups (EC2/VMs). Node auto-provisioning and cluster autoscaler handle scaling. Fargate (AWS) and virtual nodes (Azure) allow serverless pods — no node management at all.',
  },
  {
    title: 'Helm',
    detail:
      'Kubernetes package manager. Charts are templated YAML bundles for deploying applications. values.yaml externalizes environment-specific configuration. The Helm repository ecosystem provides charts for common infrastructure (nginx-ingress, cert-manager, Prometheus).',
  },
  {
    title: 'Service mesh',
    detail:
      'Istio, Linkerd, or AWS App Mesh add mutual TLS, traffic management (canary, circuit breaker), observability (distributed tracing), and policy enforcement to Kubernetes service-to-service communication — without changing application code.',
  },
]

// ─── Serverless Architecture ──────────────────────────────────────────────────

const serverlessConcepts = [
  {
    title: 'What serverless means',
    detail:
      'No server management, no capacity planning, automatic scaling to zero and back, pay-per-use billing. The term covers FaaS (Lambda, Cloud Functions) and fully managed services (DynamoDB, Fargate, Cloud Run, BigQuery). The common thread: the provider manages all infrastructure below the application layer.',
  },
  {
    title: 'Cold starts',
    detail:
      'When a Lambda/Function instance starts from zero, it takes 100ms–3s to initialize (cold start). Subsequent invocations on the same instance are warm and fast. Mitigate with: provisioned concurrency (Lambda), minimum instances (Cloud Run), or keeping functions warm with scheduled pings. Cold starts hurt latency-sensitive APIs.',
  },
  {
    title: 'Lambda patterns',
    detail:
      'API Gateway + Lambda for HTTP APIs. SQS + Lambda for queue processing. S3 event + Lambda for file processing. EventBridge + Lambda for scheduled or cross-service events. Step Functions + Lambda for orchestrated workflows. DynamoDB Streams + Lambda for CDC (change data capture).',
  },
  {
    title: 'Execution limits',
    detail:
      'Lambda: 15-minute max execution, 10 GB memory, 512 MB–10 GB ephemeral /tmp. Azure Functions: 10-minute default (unlimited on Premium plan). Cloud Functions Gen2: 60 minutes. Design long-running workflows as step functions / durable functions rather than single long-running handlers.',
  },
  {
    title: 'Event-driven serverless trade-offs',
    detail:
      'Pros: zero operational overhead, scales automatically, cost-efficient for bursty workloads. Cons: cold starts, debugging complexity, distributed tracing required, vendor lock-in, state must be externalized (DynamoDB, S3, Redis). Serverless is not the right model for steady high-throughput workloads — containers are cheaper.',
  },
]

// ─── Observability ────────────────────────────────────────────────────────────

const observabilityConcepts = [
  {
    title: 'The three pillars',
    detail:
      'Metrics (what is the system doing numerically: latency, error rate, throughput), Logs (what happened in sequence: structured event records), Traces (how a request flowed across services: spans with timing). All three are required for complete observability.',
  },
  {
    title: 'Cloud-native observability',
    detail:
      'CloudWatch (AWS — metrics, logs, alarms, dashboards), Azure Monitor + Application Insights (Azure), Cloud Monitoring + Cloud Logging (GCP). Native integration with all platform services. Sufficient for most workloads; limited cross-cloud and advanced analytics capabilities.',
  },
  {
    title: 'Third-party observability',
    detail:
      'Datadog, Grafana + Prometheus, New Relic, Honeycomb. Better cross-cloud visibility, richer correlation between metrics/logs/traces, APM (application performance monitoring). Required for multi-cloud or polyglot environments where native tooling diverges.',
  },
  {
    title: 'Distributed tracing',
    detail:
      'AWS X-Ray, Azure Application Insights, GCP Cloud Trace, Jaeger, OpenTelemetry. Traces follow a request across service boundaries with timing for each span. Essential for debugging latency in microservices. OpenTelemetry is the vendor-neutral standard for instrumentation.',
  },
  {
    title: 'Alerting and SLOs',
    detail:
      'Define SLIs (Service Level Indicators: latency p99, error rate), SLOs (targets: 99.9% of requests < 200ms), and error budgets (how much you can miss before action). Alert on SLO burn rate, not individual metric thresholds, to reduce alert fatigue.',
  },
]

// ─── Platform Engineering ─────────────────────────────────────────────────────

const platformEngineering = [
  {
    title: 'What platform engineering is',
    detail:
      'Platform engineering builds internal developer platforms (IDPs) that give application teams self-service access to infrastructure, deployment pipelines, and operational tooling. The goal: reduce cognitive load on developers, enforce golden paths, and accelerate software delivery.',
  },
  {
    title: 'Internal developer platform (IDP)',
    detail:
      'An IDP abstracts infrastructure complexity behind a service catalog or CLI. Developers provision databases, queues, and deploy services without writing Terraform or filing tickets. Backstage (Spotify) is the most widely adopted open-source IDP framework.',
  },
  {
    title: 'GitOps with Argo CD',
    detail:
      'Argo CD continuously syncs Kubernetes cluster state to the desired state declared in a git repository. Application teams commit to git; Argo CD applies the diff to the cluster. Provides drift detection, rollback, and a full audit trail of every cluster change.',
  },
  {
    title: 'Crossplane',
    detail:
      'Kubernetes-native infrastructure provisioning. Define cloud resources (RDS, S3, VPCs) as Kubernetes CRDs. Crossplane reconciles desired state with the cloud API. Enables a single control plane (Kubernetes) for both workloads and infrastructure.',
  },
  {
    title: 'Golden paths',
    detail:
      'Opinionated, well-supported templates for creating a new service, pipeline, or deployment. Teams follow golden paths to get security, observability, and reliability defaults without expertise. Deviations are allowed but require explicit justification.',
  },
]

// ─── Multi-Cloud and Hybrid ────────────────────────────────────────────────────

const multiCloud = [
  {
    title: 'Why multi-cloud',
    detail:
      'Avoid vendor lock-in, use best-of-breed services per cloud, satisfy data residency requirements in regions only one cloud covers, and improve resilience against cloud outages. In practice, most organizations are multi-cloud by acquisition (different BUs on different clouds) rather than by strategic design.',
  },
  {
    title: 'Multi-cloud challenges',
    detail:
      'Each cloud has different APIs, IAM models, networking constructs, and pricing. Operating teams must develop expertise across all three. Tooling like Terraform, Kubernetes, and OpenTelemetry provides an abstraction layer, but cloud-specific managed services still require per-platform knowledge.',
  },
  {
    title: 'Hybrid cloud',
    detail:
      'Hybrid connects on-premises infrastructure to cloud. AWS Outposts, Azure Arc, and GCP Distributed Cloud run cloud services on-premises. Used for: regulatory requirements mandating on-premises data processing, low-latency edge workloads, and gradual cloud migration strategies.',
  },
  {
    title: 'Cloud-agnostic abstractions',
    detail:
      'Kubernetes runs identically on EKS, AKS, and GKE — workloads are portable with minimal changes. Terraform manages resources across all three clouds in one workflow. OpenTelemetry collects telemetry with one SDK regardless of the observability backend.',
  },
]

// ─── Cost Optimization ────────────────────────────────────────────────────────

const costOptimization = [
  {
    title: 'On-demand vs reserved vs spot',
    detail:
      'On-demand: full price, no commitment. Reserved Instances / Savings Plans: 30–60% discount for 1–3 year commitments. Spot / Preemptible: up to 90% discount for interruptible workloads (batch, stateless workers). Match commitment level to workload predictability.',
  },
  {
    title: 'Rightsizing',
    detail:
      'Most VM workloads run at 10–20% CPU utilization because teams over-provision for safety. Use AWS Compute Optimizer, Azure Advisor, or GCP Recommender to identify oversized instances and switch to smaller ones or more efficient instance families.',
  },
  {
    title: 'Data egress costs',
    detail:
      'Inbound data transfer is free. Outbound data transfer (egress) to the internet and cross-region is charged, often at $0.08–0.09/GB. Egress is a major cost driver for data-heavy applications. Use CDN to reduce origin egress, and co-locate services in the same region.',
  },
  {
    title: 'Tagging and cost allocation',
    detail:
      'Tag every resource with team, environment, project, and cost center. Cost allocation reports show spend per tag. Without tags, multi-team organizations cannot attribute cloud costs or hold teams accountable for their spending.',
  },
  {
    title: 'FinOps',
    detail:
      'FinOps is the practice of bringing financial accountability to cloud spending. FinOps teams provide visibility, set optimization targets, and partner with engineering to align cost with business value. Tools: AWS Cost Explorer, Azure Cost Management, GCP Billing Reports, CloudHealth, Apptio Cloudability.',
  },
]

// ─── Compare and Contrast ─────────────────────────────────────────────────────

const compareContrast = [
  {
    title: 'AWS vs Azure vs GCP — compute',
    detail:
      'EC2 (AWS) is the most mature with the widest instance family selection. Azure VMs integrate deeply with Windows Server and Active Directory. GCP Compute Engine offers per-second billing and live migration during maintenance. All three offer comparable managed Kubernetes (EKS/AKS/GKE).',
  },
  {
    title: 'AWS vs Azure vs GCP — database',
    detail:
      'AWS RDS/Aurora leads on managed relational depth. Azure SQL Database has the best SQL Server compatibility. Cloud SQL and AlloyDB (GCP) are strong for Postgres. DynamoDB (AWS) leads NoSQL for key-value at scale. Cosmos DB (Azure) offers the most multi-model flexibility. Spanner (GCP) is uniquely globally distributed SQL.',
  },
  {
    title: 'AWS vs Azure vs GCP — ecosystem and tooling',
    detail:
      'AWS has the largest service catalog, deepest third-party integrations, and most mature CLI/SDK tooling. Azure wins for Microsoft-stack shops (.NET, Active Directory, SQL Server, Office 365 integration). GCP leads in data analytics (BigQuery), AI/ML (Vertex AI), and Kubernetes (GKE, which Google invented).',
  },
  {
    title: 'Lambda vs Cloud Run vs Azure Container Apps',
    detail:
      'Lambda: FaaS, 15-minute limit, cold starts, great event integration. Cloud Run: container-based serverless, HTTP-triggered, 60-minute timeout, warm instances configurable. Azure Container Apps: container-based, integrates with Dapr, KEDA for event-driven scaling. Cloud Run and ACA give more flexibility; Lambda gives deeper event integration.',
  },
  {
    title: 'Terraform vs CloudFormation',
    detail:
      'Terraform is cloud-agnostic, has a larger community, and is the most widely adopted IaC tool. CloudFormation is AWS-native, has zero-day support for new AWS services, and integrates tightly with AWS Service Catalog and StackSets. Most AWS-only teams use CloudFormation or CDK; multi-cloud teams use Terraform.',
  },
  {
    title: 'Kubernetes vs serverless',
    detail:
      'Kubernetes: more operational overhead, but full control, predictable cost at scale, portable workloads. Serverless: zero ops, scales to zero, cost-efficient for bursty workloads, vendor lock-in. Many architectures use both: Kubernetes for long-running services, Lambda/Cloud Functions for event handlers.',
  },
]

// ─── Common Pitfalls ──────────────────────────────────────────────────────────

const commonPitfalls = [
  {
    mistake: 'Overly permissive IAM policies',
    description:
      'AdministratorAccess for application roles, or wildcard resource ARNs (*), are common in early prototypes and never cleaned up. These become critical vulnerabilities. Use IAM Access Analyzer to find overly permissive policies and enforce least-privilege with SCPs (Service Control Policies).',
  },
  {
    mistake: 'Public S3 buckets / Blob containers',
    description:
      'A misconfigured storage bucket that exposes customer data is one of the most common cloud security incidents. Enable account-level Block Public Access (AWS), enforce "no public access" policies at the management group level (Azure), and use Cloud Asset Inventory to audit public resources (GCP).',
  },
  {
    mistake: 'No multi-AZ or multi-region for critical workloads',
    description:
      'Deploying everything in a single AZ means a single data center failure takes the service down. Use multi-AZ RDS, deploy ALBs across AZs, and run at least 2 container replicas in different AZs. Active-passive multi-region is the standard for RPO/RTO requirements under 1 hour.',
  },
  {
    mistake: 'Forgetting data egress costs',
    description:
      'Architectures that move large volumes of data across regions, from cloud to on-premises, or frequently to the internet generate unexpected egress charges. Model data flow costs before choosing cross-region replication or CDN origin strategies.',
  },
  {
    mistake: 'Not using Infrastructure as Code from day one',
    description:
      'Manually clicking through the console is fast initially but creates snowflake infrastructure — impossible to reproduce, audit, or version. Every resource should be codified in Terraform or CDK from the first week. Retrofitting IaC onto a large existing environment is painful.',
  },
  {
    mistake: 'Lambda timeout and cold start blindness',
    description:
      'Lambda functions with external DB connections saturate connection pools at scale (1 connection per invocation × thousands of invocations). Use RDS Proxy or connection pooling. Functions with synchronous cold starts on every request should use provisioned concurrency or be migrated to a container-based solution.',
  },
  {
    mistake: 'No cost alerts or tagging strategy',
    description:
      'Cloud bills can spike 10× overnight due to a misconfigured autoscaling group, a rogue data pipeline, or a security incident generating egress. Set billing alerts at 80% and 100% of monthly budget. Without resource tags, there is no way to identify which team or service caused the spike.',
  },
]

// ─── Debugging Checklist ──────────────────────────────────────────────────────

const debuggingChecklist = [
  {
    title: 'Permission denied / access denied error?',
    detail:
      'Check the IAM policy attached to the caller\'s role or user. Use IAM Policy Simulator (AWS), "Check Access" (Azure), or Policy Troubleshooter (GCP) to simulate the specific API call. Verify resource-based policies (S3 bucket policy, Lambda resource policy) are not blocking access.',
  },
  {
    title: 'Service cannot reach another service?',
    detail:
      'Check VPC security group inbound rules on the target service. Check NACLs on both subnets. Verify route tables have a route to the target. If cross-VPC, verify VPC peering or PrivateLink is configured. Use VPC Flow Logs to confirm whether packets are reaching the target.',
  },
  {
    title: 'Lambda / Cloud Function timeout?',
    detail:
      'Check whether the timeout is too short for the workload, or whether the function is hanging on a network call (DB connection, external API). Add structured logging to identify the slow step. Enable X-Ray / Cloud Trace to see the duration of each downstream call.',
  },
  {
    title: 'Unexpected cost spike?',
    detail:
      'Check Cost Explorer (AWS) / Cost Management (Azure) / Billing Reports (GCP) filtered by service and region. Look for: runaway autoscaling groups, data transfer between regions, S3 request spikes from a crawler, or an EC2 instance that was never terminated.',
  },
  {
    title: 'Deployment failing in CI?',
    detail:
      'Check whether the CI role has the required IAM permissions for the deployment action. Verify the Terraform state is not locked from a previous failed run (terraform force-unlock). Check for API rate limiting (AWS: describe-* calls during plan can hit limits in large accounts).',
  },
  {
    title: 'Application returning 502/503 behind a load balancer?',
    detail:
      'Check target group health checks — are targets healthy? Check security group: does the ALB security group have outbound to the target port? Check that the application is binding to 0.0.0.0, not 127.0.0.1. Check application logs for startup errors that prevent the health check from passing.',
  },
]

// ─── Correctness Checklist ────────────────────────────────────────────────────

const correctnessChecklist = [
  'Apply the principle of least privilege to all IAM roles — no wildcards (*) on resource ARNs unless absolutely necessary.',
  'Block public access at the account/organization level for all object storage. Never make data buckets public by default.',
  'Deploy stateful services (databases, caches) with multi-AZ failover enabled. Deploy application tier across at least two AZs.',
  'Store all secrets in Secrets Manager / Key Vault / Secret Manager — never in environment variables at provisioning time or source control.',
  'Enable CloudTrail / Activity Log / Cloud Audit Logs in all regions and forward to a centralized, tamper-resistant log archive.',
  'Manage all infrastructure as code (Terraform, CDK, Bicep). No manual console resource creation in production environments.',
  'Tag every resource with team, environment, and project before it goes to production.',
  'Set billing alerts at 80% and 100% of monthly budget on every account.',
  'Enable encryption at rest for all databases, S3 buckets, and EBS/managed disk volumes.',
  'Test multi-AZ failover and auto-scaling policies in a staging environment before relying on them in production.',
]

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faq = [
  {
    question: 'Which cloud should I choose?',
    answer:
      'AWS for general-purpose workloads — widest service catalog, most documentation, largest talent pool. Azure for Microsoft-centric organizations (Active Directory, .NET, Office 365, SQL Server). GCP for data/ML workloads (BigQuery, Vertex AI) or Kubernetes-heavy environments. For startups, AWS or GCP startup credits are most generous.',
  },
  {
    question: 'Should I use serverless or containers?',
    answer:
      'Serverless for: event-driven processing, bursty infrequent workloads, webhooks, scheduled tasks, and teams that want zero infrastructure management. Containers for: long-running services, steady throughput, workloads needing >15 minutes execution, or applications where cold start latency is unacceptable. Most production systems use both.',
  },
  {
    question: 'Should I learn Terraform or a native IaC tool?',
    answer:
      'Learn Terraform first — it is cloud-agnostic, has the largest community, and is the most in-demand IaC skill. Learn CloudFormation or Bicep if you are deeply AWS-only or Azure-only and need zero-day support for new services. AWS CDK is a strong option if you prefer TypeScript/Python over HCL.',
  },
  {
    question: 'When does multi-cloud make sense?',
    answer:
      'Multi-cloud is justified when: you have genuine best-of-breed service requirements (e.g., GCP BigQuery + AWS for compute), regulatory requirements mandate specific cloud providers in specific regions, or you acquired companies already on different clouds. Multi-cloud for its own sake adds operational complexity without proportional benefit.',
  },
  {
    question: 'How do I avoid runaway cloud costs?',
    answer:
      'Set billing alerts on every account. Use Savings Plans or Reserved Instances for predictable compute. Tag everything and review cost allocation reports weekly. Use rightsizing recommendations from your cloud provider. Terminate unused resources — dev environments left running over weekends are a common waste source.',
  },
  {
    question: 'What is the difference between SQS and Kinesis (or equivalent)?',
    answer:
      'SQS is a message queue: each message is consumed once and deleted. Kinesis is a stream: records are retained for 1–365 days and can be replayed by multiple consumers at their own offsets. Use SQS for task distribution (each job processed once). Use Kinesis for event streaming (multiple downstream consumers processing the same events independently).',
  },
  {
    question: 'How do I handle database connection pooling with Lambda?',
    answer:
      'Lambda creates a new instance per invocation burst — each instance opens its own DB connection. At scale this saturates the database connection limit. Use RDS Proxy (AWS) or PgBouncer/pgcat (self-hosted) to pool connections between Lambda and the database. Size the proxy based on Lambda concurrency × connections per function.',
  },
]

// ─── Key Takeaways ────────────────────────────────────────────────────────────

const keyTakeaways = [
  'IAM is the most critical security control in any cloud environment. Least privilege, roles over users, and no hardcoded credentials.',
  'Everything should be Infrastructure as Code from day one — manual console changes create unauditable, unreproducible drift.',
  'Distribute across availability zones for high availability; multi-region only when RPO/RTO requirements demand it.',
  'Serverless scales to zero and reduces ops; containers give more control and predictable cost at steady load. Use both appropriately.',
  'Tag everything and set billing alerts before costs surprise you — cloud spend can spike overnight.',
  'Managed services trade control for operational simplicity. Evaluate each on what it automates versus what it constrains.',
  'The shared responsibility model defines the security boundary: the provider secures the infrastructure; you secure the configuration and data on top of it.',
  'Terraform is the lingua franca for multi-cloud IaC. CDK or CloudFormation are strong choices for AWS-only teams.',
]

// ─── Pseudocode Patterns ──────────────────────────────────────────────────────

const pseudocodePatterns = [
  {
    title: 'Least-privilege IAM role (Terraform)',
    code: `resource "aws_iam_role" "app" {
  name = "my-app-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Service = "lambda.amazonaws.com" }
      Action    = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy" "app" {
  role = aws_iam_role.app.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = ["s3:GetObject", "s3:PutObject"]
        Resource = "\${aws_s3_bucket.data.arn}/*"
      },
      {
        Effect   = "Allow"
        Action   = ["secretsmanager:GetSecretValue"]
        Resource = aws_secretsmanager_secret.db_pass.arn
      }
    ]
  })
}`,
    explanation:
      'Grant only the specific actions and specific resources needed. Never use Action: "*" or Resource: "*". Each permission should have a documented reason. Review and trim quarterly.',
  },
  {
    title: 'VPC networking structure',
    code: `# Three-tier architecture
Region: us-east-1
  VPC: 10.0.0.0/16
    Public subnets (ALB, NAT Gateway):
      10.0.1.0/24  (AZ-a)
      10.0.2.0/24  (AZ-b)
    Private subnets (App servers, ECS tasks):
      10.0.11.0/24 (AZ-a)
      10.0.12.0/24 (AZ-b)
    Isolated subnets (RDS, ElastiCache):
      10.0.21.0/24 (AZ-a)
      10.0.22.0/24 (AZ-b)

Security group rules:
  ALB-SG:   inbound 443 from 0.0.0.0/0
  App-SG:   inbound 8080 from ALB-SG only
  DB-SG:    inbound 5432 from App-SG only`,
    explanation:
      'Public subnets for internet-facing components only. Application servers in private subnets — no public IPs. Databases in isolated subnets with no route to internet. Security groups chain: internet → ALB → app → database.',
  },
  {
    title: 'SQS + Lambda fan-out pattern',
    code: `# Topology
S3 bucket
  → S3 Event Notification (object created)
  → SNS Topic
    → SQS Queue A (processing workers)
    → SQS Queue B (audit log writer)
    → SQS Queue C (notification service)

# Each SQS queue triggers its own Lambda
Lambda A: processes the file (thumbnail, parse, index)
Lambda B: writes audit record to DynamoDB
Lambda C: sends user notification via SES

# Config
SQS Queue:
  VisibilityTimeout: 6x Lambda timeout
  RedrivePolicy: maxReceiveCount=3, DLQ=SQS-DLQ-A`,
    explanation:
      'SNS decouples the producer (S3) from multiple consumers. Each consumer scales independently. VisibilityTimeout must exceed Lambda timeout to prevent duplicate processing. DLQ captures messages that fail after retries for investigation.',
  },
]

// ─── Code Examples ────────────────────────────────────────────────────────────

const codeExamples = [
  {
    title: 'Terraform S3 bucket (hardened)',
    code: `resource "aws_s3_bucket" "app_data" {
  bucket = "my-app-data-\${var.environment}"
}

resource "aws_s3_bucket_public_access_block" "app_data" {
  bucket                  = aws_s3_bucket.app_data.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_server_side_encryption_configuration" "app_data" {
  bucket = aws_s3_bucket.app_data.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "aws:kms"
      kms_master_key_id = aws_kms_key.s3.arn
    }
  }
}

resource "aws_s3_bucket_versioning" "app_data" {
  bucket = aws_s3_bucket.app_data.id
  versioning_configuration { status = "Enabled" }
}`,
    explanation:
      'Block public access, enable KMS encryption, and enable versioning — three controls that should be on every S3 bucket. Use separate buckets per environment and per data classification level.',
  },
  {
    title: 'Lambda with RDS Proxy (Node.js)',
    code: `import { Pool } from 'pg';
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';

// Pool is created once per Lambda container (warm reuse)
let pool: Pool | undefined;

async function getPool(): Promise<Pool> {
  if (pool) return pool;

  const sm = new SecretsManagerClient({});
  const secret = await sm.send(new GetSecretValueCommand({
    SecretId: process.env.DB_SECRET_ARN,
  }));
  const creds = JSON.parse(secret.SecretString!);

  pool = new Pool({
    host: process.env.RDS_PROXY_ENDPOINT,   // RDS Proxy, not direct RDS
    database: creds.dbname,
    user: creds.username,
    password: creds.password,
    ssl: { rejectUnauthorized: true },
    max: 2,     // small pool per Lambda instance
  });
  return pool;
}

export const handler = async (event: unknown) => {
  const db = await getPool();
  const { rows } = await db.query('SELECT count(*) FROM orders');
  return { statusCode: 200, body: JSON.stringify(rows) };
};`,
    explanation:
      'The pool is initialized once per container warm lifecycle — not per invocation. RDS Proxy multiplexes thousands of Lambda connections into a small pool on the database side. max: 2 prevents a single Lambda from overwhelming the proxy.',
  },
  {
    title: 'GKE Deployment + Service (Kubernetes YAML)',
    code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-server
  namespace: production
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api-server
  template:
    metadata:
      labels:
        app: api-server
    spec:
      serviceAccountName: api-server-sa
      containers:
      - name: api-server
        image: gcr.io/my-project/api-server:1.4.2
        ports:
        - containerPort: 8080
        resources:
          requests: { cpu: "100m", memory: "128Mi" }
          limits:  { cpu: "500m", memory: "512Mi" }
        env:
        - name: DB_URL
          valueFrom:
            secretKeyRef:
              name: db-credentials
              key: url
        readinessProbe:
          httpGet: { path: /healthz, port: 8080 }
          initialDelaySeconds: 5
          periodSeconds: 10
---
apiVersion: v1
kind: Service
metadata:
  name: api-server
  namespace: production
spec:
  selector:
    app: api-server
  ports:
  - port: 80
    targetPort: 8080`,
    explanation:
      'Resource requests/limits prevent noisy-neighbor issues on shared nodes. readinessProbe ensures traffic only routes to healthy pods. secretKeyRef injects credentials from a Kubernetes Secret rather than hardcoding them. 3 replicas across AZs (with topology spread constraints) provide HA.',
  },
  {
    title: 'BigQuery streaming insert (Python)',
    code: `from google.cloud import bigquery
from datetime import datetime, timezone

client = bigquery.Client()
table_id = "my-project.analytics.events"

def insert_events(events: list[dict]) -> None:
    rows = [
        {
            "event_id": e["id"],
            "user_id": e["userId"],
            "event_type": e["type"],
            "properties": e.get("properties", {}),
            "inserted_at": datetime.now(timezone.utc).isoformat(),
        }
        for e in events
    ]
    errors = client.insert_rows_json(table_id, rows)
    if errors:
        raise RuntimeError(f"BigQuery insert errors: {errors}")

# BigQuery streaming inserts appear in queries within seconds
# Use for real-time analytics dashboards
# For bulk historical loads, use load jobs from GCS (cheaper)`,
    explanation:
      'Streaming inserts are available for query within seconds — ideal for real-time dashboards. For batch loads (daily ETL, historical data), use BigQuery load jobs from GCS, which are free and faster for large volumes.',
  },
  {
    title: 'Azure Key Vault secret retrieval (C#)',
    code: `using Azure.Identity;
using Azure.Security.KeyVault.Secrets;

// Uses Managed Identity in production (no credentials in code)
// Uses DefaultAzureCredential which falls back through:
// ManagedIdentity → EnvironmentVariables → AzureCLI (local dev)
var client = new SecretClient(
    new Uri("https://my-keyvault.vault.azure.net/"),
    new DefaultAzureCredential()
);

// Retrieve a secret
KeyVaultSecret secret = await client.GetSecretAsync("DatabaseConnectionString");
string connectionString = secret.Value;

// In ASP.NET Core — add Key Vault as a configuration source
// builder.Configuration.AddAzureKeyVault(
//     new Uri("https://my-keyvault.vault.azure.net/"),
//     new DefaultAzureCredential()
// );
// Then access as: config["DatabaseConnectionString"]`,
    explanation:
      'DefaultAzureCredential automatically uses Managed Identity in Azure-hosted environments and Azure CLI credentials locally — no credentials in code or environment variables in either context. The ASP.NET Core extension makes Key Vault secrets available as standard IConfiguration values.',
  },
  {
    title: 'Terraform remote state (S3 + DynamoDB lock)',
    code: `# backend.tf — configure remote state storage
terraform {
  backend "s3" {
    bucket         = "my-org-terraform-state"
    key            = "production/api/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    kms_key_id     = "arn:aws:kms:us-east-1:123456789:key/abc-def"
    dynamodb_table = "terraform-state-lock"  # prevents concurrent applies
  }
}

# The DynamoDB table for locking (provisioned once):
# resource "aws_dynamodb_table" "tf_lock" {
#   name         = "terraform-state-lock"
#   billing_mode = "PAY_PER_REQUEST"
#   hash_key     = "LockID"
#   attribute { name = "LockID" type = "S" }
# }`,
    explanation:
      'Remote state in S3 with KMS encryption stores the state file securely and makes it accessible to all team members and CI. The DynamoDB lock table prevents two concurrent terraform apply runs from corrupting state — essential in CI/CD pipelines.',
  },
]

// ─── Scenarios ────────────────────────────────────────────────────────────────

const scenarios = [
  {
    id: 'three-tier',
    title: 'Three-tier web app on AWS',
    steps: [
      'Route 53 resolves the domain. CloudFront serves cached static assets from S3; dynamic requests forward to the origin.',
      'CloudFront forwards the request to an Application Load Balancer in the public subnet.',
      'The ALB routes to ECS Fargate tasks in private subnets, selected by health-check status.',
      'Fargate tasks authenticate with RDS Proxy using IAM database authentication — no password in environment variables.',
      'RDS Proxy multiplexes task connections to a multi-AZ Aurora PostgreSQL cluster in isolated subnets.',
      'Secrets Manager provides database credentials; ElastiCache Redis provides session caching and hot-key offloading.',
      'CloudWatch collects metrics and logs. X-Ray traces requests end-to-end. Alarms notify on p99 latency and error rate SLOs.',
    ],
    summary:
      'Each tier is isolated by subnet and security group. Public subnets contain only load balancers and NAT gateways. Application and database tiers are unreachable from the internet.',
  },
  {
    id: 'cicd-pipeline',
    title: 'IaC-driven CI/CD deployment pipeline',
    steps: [
      'Developer opens a pull request. GitHub Actions triggers the CI workflow.',
      'terraform plan runs against the PR branch. The plan output is posted as a PR comment for review.',
      'Unit tests, integration tests, and container image build run in parallel. The image is pushed to ECR on success.',
      'PR is approved and merged. The CD workflow triggers: terraform apply deploys any infrastructure changes.',
      'Argo CD detects the new image tag in the Kubernetes manifest git repo and initiates a rolling deployment.',
      'Kubernetes performs a rolling update: new pods are started, health-checked, and made ready before old pods terminate.',
      'Datadog monitors the deployment. If error rate exceeds the SLO for 5 minutes, the on-call alert fires and the rollout pauses.',
    ],
    summary:
      'Infrastructure changes go through PR review (terraform plan). Application deployments are automated but monitored. Rollback is a git revert triggering the same pipeline in reverse.',
  },
  {
    id: 'lambda-event',
    title: 'Serverless image processing pipeline',
    steps: [
      'User uploads a photo. The mobile app calls a presigned S3 URL to upload directly to the uploads bucket — no server in the path.',
      'S3 ObjectCreated event triggers an EventBridge rule, which routes to an SQS queue.',
      'Lambda polls the SQS queue. VisibilityTimeout is set to 6× the Lambda timeout to prevent duplicate processing.',
      'Lambda downloads the image, generates thumbnails (3 sizes), and writes them to the processed bucket.',
      'Lambda updates the DynamoDB record with the processed image URLs and sets status = "ready".',
      'DynamoDB Streams triggers another Lambda that sends a push notification to the user via SNS → FCM/APNs.',
      'If the processing Lambda fails 3 times, SQS moves the message to the DLQ. An alarm fires for manual investigation.',
    ],
    summary:
      'No server is always running — cost is proportional to uploads. The SQS buffer absorbs traffic spikes. The DLQ captures failures without data loss. Each step is independently retryable.',
  },
]

// ─── Types and constants ──────────────────────────────────────────────────────

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'
const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-mental-model', label: 'Mental Model' },
    { id: 'bp-why', label: 'Why This Matters' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-compute', label: 'Compute Models' },
    { id: 'core-storage', label: 'Storage' },
    { id: 'core-databases', label: 'Managed Databases' },
    { id: 'core-networking', label: 'Networking' },
    { id: 'core-iam', label: 'IAM and Security' },
    { id: 'core-messaging', label: 'Messaging and Events' },
    { id: 'core-iac', label: 'Infrastructure as Code' },
    { id: 'core-containers', label: 'Containers and Kubernetes' },
    { id: 'core-serverless', label: 'Serverless Architecture' },
    { id: 'core-observability', label: 'Observability' },
    { id: 'core-platform', label: 'Platform Engineering' },
    { id: 'core-multicloud', label: 'Multi-Cloud and Hybrid' },
    { id: 'core-cost', label: 'Cost Optimization' },
    { id: 'core-compare', label: 'Compare and Contrast' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
    { id: 'core-debugging', label: 'Debugging Checklist' },
    { id: 'core-correctness', label: 'Correctness Checklist' },
    { id: 'core-faq', label: 'FAQ' },
  ],
  examples: [
    { id: 'ex-pseudocode', label: 'Pseudocode Patterns' },
    { id: 'ex-code', label: 'Code Examples' },
    { id: 'ex-scenarios', label: 'Architecture Walkthroughs' },
  ],
  glossary: [{ id: 'glossary-terms', label: 'Glossary Terms' }],
}

// ─── Glossary ─────────────────────────────────────────────────────────────────

const glossary = [
  {
    term: 'IaaS',
    definition:
      'Infrastructure as a Service — raw compute, storage, and networking. You manage the OS and above.',
  },
  {
    term: 'PaaS',
    definition:
      'Platform as a Service — managed runtime and middleware. You manage the application.',
  },
  {
    term: 'SaaS',
    definition: 'Software as a Service — fully managed product. You configure and use it.',
  },
  {
    term: 'Region',
    definition:
      'A geographic cluster of data centers. Data stays in-region unless you explicitly replicate it.',
  },
  {
    term: 'Availability Zone (AZ)',
    definition:
      'An isolated data center facility within a region with independent power and networking.',
  },
  {
    term: 'VPC',
    definition: 'Virtual Private Cloud — your isolated private network inside the cloud provider.',
  },
  {
    term: 'Subnet',
    definition:
      "A segment of a VPC's IP range. Public subnets have internet routes; private do not.",
  },
  {
    term: 'Security Group',
    definition: 'Stateful instance-level firewall controlling inbound and outbound traffic.',
  },
  { term: 'NACL', definition: 'Network Access Control List — stateless subnet-level firewall.' },
  {
    term: 'IAM',
    definition:
      'Identity and Access Management — controls who can perform which actions on which resources.',
  },
  {
    term: 'Least privilege',
    definition:
      'Security principle: grant only the minimum permissions required for a specific task.',
  },
  {
    term: 'IAM Role',
    definition:
      'An AWS/cloud identity with a policy, assumed by services or users. Issues temporary credentials.',
  },
  {
    term: 'STS',
    definition:
      'AWS Security Token Service — issues temporary, limited-privilege credentials for roles.',
  },
  { term: 'EC2', definition: 'AWS Elastic Compute Cloud — virtual machines (IaaS).' },
  {
    term: 'ECS',
    definition:
      'AWS Elastic Container Service — managed container orchestration. Fargate mode is serverless.',
  },
  {
    term: 'EKS / AKS / GKE',
    definition: 'Managed Kubernetes services from AWS, Azure, and GCP respectively.',
  },
  {
    term: 'Lambda',
    definition:
      'AWS serverless function runtime. Event-triggered, scales to zero, pay per invocation.',
  },
  {
    term: 'Cloud Run',
    definition:
      'GCP container-based serverless platform. HTTP-triggered, 60-minute timeout, scales to zero.',
  },
  {
    term: 'Azure Functions',
    definition:
      'Azure serverless function runtime. Multiple trigger types, Durable Functions for orchestration.',
  },
  {
    term: 'S3',
    definition: 'AWS Simple Storage Service — object storage with 11 nines durability.',
  },
  {
    term: 'RDS',
    definition:
      'AWS Relational Database Service — managed MySQL, Postgres, SQL Server, Oracle, MariaDB.',
  },
  {
    term: 'Aurora',
    definition:
      'AWS cloud-native MySQL/Postgres-compatible database with up to 5× standard RDS performance.',
  },
  {
    term: 'DynamoDB',
    definition:
      'AWS fully managed NoSQL key-value/document database. Single-digit millisecond at any scale.',
  },
  {
    term: 'CloudFront',
    definition: 'AWS CDN — global edge caching and delivery for static and dynamic content.',
  },
  {
    term: 'ALB',
    definition:
      'Application Load Balancer — HTTP/HTTPS layer 7 load balancer with content-based routing.',
  },
  {
    term: 'SQS',
    definition: 'AWS Simple Queue Service — managed message queue. Each message consumed once.',
  },
  {
    term: 'SNS',
    definition:
      'AWS Simple Notification Service — managed pub/sub. Fan-out to multiple subscribers.',
  },
  {
    term: 'EventBridge',
    definition:
      'AWS serverless event bus for routing events from AWS services and SaaS applications.',
  },
  {
    term: 'Terraform',
    definition:
      "HashiCorp's cloud-agnostic Infrastructure as Code tool using HCL declarative syntax.",
  },
  {
    term: 'Helm',
    definition:
      'Kubernetes package manager. Charts bundle templated YAML deployments with configurable values.',
  },
  {
    term: 'Argo CD',
    definition:
      'GitOps continuous delivery tool for Kubernetes — syncs cluster state to git repository.',
  },
  {
    term: 'Crossplane',
    definition: 'Kubernetes-native IaC tool — provision cloud resources as Kubernetes CRDs.',
  },
  {
    term: 'FinOps',
    definition: 'Practice of bringing financial accountability and optimization to cloud spending.',
  },
  {
    term: 'Cold start',
    definition: 'Initialization latency when a serverless function starts from zero — 100ms–3s.',
  },
  {
    term: 'RDS Proxy',
    definition:
      'AWS managed database proxy that pools Lambda connections to prevent connection exhaustion.',
  },
  {
    term: 'GitOps',
    definition:
      'Operations model where git is the single source of truth for both infrastructure and application state.',
  },
  {
    term: 'SLI / SLO / SLA',
    definition:
      'Service Level Indicator (metric), Objective (target), Agreement (contract). Used to define and measure reliability.',
  },
  {
    term: 'DLQ',
    definition:
      'Dead Letter Queue — receives messages that failed processing after the maximum retry count.',
  },
  {
    term: 'Spot / Preemptible',
    definition:
      'Discounted cloud compute that can be reclaimed by the provider with short notice. Best for fault-tolerant batch workloads.',
  },
]

// ─── Styles ───────────────────────────────────────────────────────────────────

// ─── Component ────────────────────────────────────────────────────────────────

export default function PlatformsAndCloudPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Platforms &amp; Cloud',
    defaultTab: 'big-picture',
  })

  const defaultExample = codeExamples[0] ?? { title: '', code: '', explanation: '' }
  const defaultScenario = scenarios[0] ?? { id: '', title: '', steps: [], summary: '' }

  const [selectedExampleTitle, setSelectedExampleTitle] = useState(defaultExample.title)
  const [selectedScenarioId, setSelectedScenarioId] = useState(defaultScenario.id)
  const [stepIndex, setStepIndex] = useState(0)

  const selectedExample =
    codeExamples.find((e) => e.title === selectedExampleTitle) ?? defaultExample
  const selectedScenario = scenarios.find((s) => s.id === selectedScenarioId) ?? defaultScenario
  const canStepForward = stepIndex < selectedScenario.steps.length - 1

  const handleScenarioSelect = (id: string) => {
    setSelectedScenarioId(id)
    setStepIndex(0)
  }

  return (
    <TopicPageShell
      title="Platforms &amp; Cloud"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Platforms &amp; Cloud</h1>
      <p>
        Cloud platforms provide on-demand infrastructure: compute, storage, networking, databases,
        messaging, and managed services. This document covers AWS, Azure, and GCP across compute
        models, storage, networking, IAM, messaging, IaC, containers, serverless, observability,
        platform engineering, and cost management.
      </p>

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
          <section id="bp-mental-model" className="bin98-section">
            <h2 className="bin98-heading">Mental Model</h2>
            {mentalModel.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-why" className="bin98-section">
            <h2 className="bin98-heading">Why This Matters</h2>
            <p>
              Cloud fluency is a baseline expectation for backend, DevOps, and platform engineers.
              The ability to design secure, available, and cost-efficient cloud architectures — and
              to debug them when they break — directly determines how fast teams can ship and how
              reliable their systems are.
            </p>
            <p>
              The most expensive cloud mistakes (security breaches from misconfigured IAM, surprise
              bills from uncapped autoscaling, outages from single-AZ deployments) are all
              preventable with correct foundational knowledge. Learn the defaults, know what to
              change, and codify everything in IaC from day one.
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
          <section id="core-compute" className="bin98-section">
            <h2 className="bin98-heading">Compute Models</h2>
            {computeModels.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-storage" className="bin98-section">
            <h2 className="bin98-heading">Storage</h2>
            {storageConcepts.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-databases" className="bin98-section">
            <h2 className="bin98-heading">Managed Databases</h2>
            {databaseServices.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-networking" className="bin98-section">
            <h2 className="bin98-heading">Networking</h2>
            {networkingConcepts.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-iam" className="bin98-section">
            <h2 className="bin98-heading">IAM and Security</h2>
            {iamSecurity.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-messaging" className="bin98-section">
            <h2 className="bin98-heading">Messaging and Events</h2>
            {messagingServices.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-iac" className="bin98-section">
            <h2 className="bin98-heading">Infrastructure as Code</h2>
            {iacConcepts.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-containers" className="bin98-section">
            <h2 className="bin98-heading">Containers and Kubernetes</h2>
            {containersConcepts.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-serverless" className="bin98-section">
            <h2 className="bin98-heading">Serverless Architecture</h2>
            {serverlessConcepts.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-observability" className="bin98-section">
            <h2 className="bin98-heading">Observability</h2>
            {observabilityConcepts.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-platform" className="bin98-section">
            <h2 className="bin98-heading">Platform Engineering</h2>
            {platformEngineering.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-multicloud" className="bin98-section">
            <h2 className="bin98-heading">Multi-Cloud and Hybrid</h2>
            {multiCloud.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-cost" className="bin98-section">
            <h2 className="bin98-heading">Cost Optimization</h2>
            {costOptimization.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-compare" className="bin98-section">
            <h2 className="bin98-heading">Compare and Contrast</h2>
            {compareContrast.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-pitfalls" className="bin98-section">
            <h2 className="bin98-heading">Common Pitfalls</h2>
            <ul>
              {commonPitfalls.map((p) => (
                <li key={p.mistake}>
                  <strong>{p.mistake}:</strong> {p.description}
                </li>
              ))}
            </ul>
          </section>
          <hr className="bin98-divider" />
          <section id="core-debugging" className="bin98-section">
            <h2 className="bin98-heading">Debugging Checklist</h2>
            {debuggingChecklist.map((item) => (
              <p key={item.title}>
                <strong>{item.title}</strong> {item.detail}
              </p>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="core-correctness" className="bin98-section">
            <h2 className="bin98-heading">Correctness Checklist</h2>
            <ul>
              {correctnessChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <hr className="bin98-divider" />
          <section id="core-faq" className="bin98-section">
            <h2 className="bin98-heading">FAQ</h2>
            {faq.map((item) => (
              <div key={item.question}>
                <h3 className="bin98-subheading">{item.question}</h3>
                <p>{item.answer}</p>
              </div>
            ))}
          </section>
        </>
      )}

      {activeTab === 'examples' && (
        <>
          <section id="ex-pseudocode" className="bin98-section">
            <h2 className="bin98-heading">Pseudocode Patterns</h2>
            {pseudocodePatterns.map((item) => (
              <div key={item.title}>
                <h3 className="bin98-subheading">{item.title}</h3>
                <div className="bin98-codebox">
                  <code>{item.code.trim()}</code>
                </div>
                <p>{item.explanation}</p>
              </div>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="ex-code" className="bin98-section">
            <h2 className="bin98-heading">Code Examples</h2>
            <p>Select an example to view the implementation pattern.</p>
            <div className="bin98-inline-buttons">
              {codeExamples.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  className="bin98-push"
                  onClick={() => setSelectedExampleTitle(item.title)}
                >
                  {item.title}
                </button>
              ))}
            </div>
            <h3 className="bin98-subheading">{selectedExample.title}</h3>
            <div className="bin98-codebox">
              <code>{selectedExample.code.trim()}</code>
            </div>
            <p>{selectedExample.explanation}</p>
          </section>
          <hr className="bin98-divider" />
          <section id="ex-scenarios" className="bin98-section">
            <h2 className="bin98-heading">Architecture Walkthroughs</h2>
            <p>
              Select an architecture and step through how a request or deployment flows through it.
            </p>
            <div className="bin98-inline-buttons">
              {scenarios.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className="bin98-push"
                  onClick={() => handleScenarioSelect(s.id)}
                >
                  {s.title}
                </button>
              ))}
            </div>
            <h3 className="bin98-subheading">{selectedScenario.title}</h3>
            <div className="bin98-step-box">
              Step {stepIndex + 1} of {selectedScenario.steps.length}:{' '}
              {selectedScenario.steps[stepIndex]}
            </div>
            <div className="bin98-step-controls">
              <button
                type="button"
                className="bin98-push"
                onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
                disabled={stepIndex === 0}
              >
                &lt; Back
              </button>
              <button
                type="button"
                className="bin98-push"
                onClick={() =>
                  setStepIndex((i) => Math.min(selectedScenario.steps.length - 1, i + 1))
                }
                disabled={!canStepForward}
              >
                Next &gt;
              </button>
              <span>
                {stepIndex + 1} / {selectedScenario.steps.length}
              </span>
            </div>
            <p>
              <strong>Summary:</strong> {selectedScenario.summary}
            </p>
          </section>
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
