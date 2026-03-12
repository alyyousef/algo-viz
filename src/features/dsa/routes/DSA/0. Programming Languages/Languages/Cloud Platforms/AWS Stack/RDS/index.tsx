import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

type NarrativeSection = {
  id: string
  heading: string
  paragraphs: string[]
}

type ExampleSection = {
  id: string
  title: string
  code: string
  explanation: string
}

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

const pageTitle = 'AWS RDS'
const pageSubtitle =
  'Managed relational databases on AWS, from standard DB instances to highly available production topologies.'

const introParagraphs = [
  "Amazon Relational Database Service, usually shortened to Amazon RDS, is AWS's managed relational database platform. It removes a large amount of undifferentiated infrastructure work such as instance provisioning, backups, patch orchestration, basic high-availability setup, monitoring integration, and routine maintenance workflows while still leaving database design, schema design, indexing, query tuning, data modeling, connection usage, and application correctness in your hands.",
  "This page focuses on the non-Aurora RDS side of the family: RDS for Db2, MariaDB, Microsoft SQL Server, MySQL, Oracle, and PostgreSQL, plus adjacent capabilities such as Multi-AZ, read replicas, RDS Proxy, encryption, backups, Database Insights, and Blue/Green Deployments. Where Aurora or RDS Custom materially changes the design decision, the page calls that out explicitly.",
]

const bigPictureSections: Array<{ title: string; paragraphs: string[] }> = [
  {
    title: 'What it is',
    paragraphs: [
      'An RDS DB instance is an isolated managed database environment in AWS. You still run a familiar database engine, connect with normal drivers and SQL tools, and own the data model and workload behavior, but AWS operates the underlying service scaffolding.',
      'That split matters. RDS is not magical auto-performance. It is managed hosting plus operational features around a relational engine. If your schema, indexes, transactions, or queries are poor, RDS will make them easier to operate but not correct them for you.',
    ],
  },
  {
    title: 'Where it fits',
    paragraphs: [
      'RDS fits teams that want relational semantics, ACID transactions, joins, indexes, familiar SQL tooling, and operational automation without managing database VMs themselves. It is a common fit for web applications, internal business systems, SaaS control planes, content backends, line-of-business applications, and migration targets for self-managed relational databases.',
      'It is especially attractive when the organization wants a managed service boundary but still needs standard engines rather than a purpose-built NoSQL service. Compared with self-managed databases on EC2, RDS usually reduces operational risk and day-two toil substantially.',
    ],
  },
  {
    title: 'What AWS manages and what you still own',
    paragraphs: [
      'AWS manages the database infrastructure, storage plumbing, backup framework, failover mechanisms for supported topologies, patch delivery workflow, integration points with IAM, CloudWatch, KMS, and related AWS services, and the API and console surface used to create and modify the database.',
      'You still own schema design, indexing strategy, SQL quality, lock behavior, transaction boundaries, retention policy, migration sequencing, client retry logic, secrets discipline, networking decisions, and the operational judgment required to know when a change is safe. In other words, RDS removes host management, not database engineering.',
    ],
  },
  {
    title: 'How to think about the product line',
    paragraphs: [
      'There are several distinct shapes under the broader RDS story. A Single-AZ DB instance is the simplest deployment. A Multi-AZ DB instance deployment adds a synchronous standby for high availability but does not add read scaling. A Multi-AZ DB cluster adds a writer and readable standbys, which changes both failover and read scaling behavior. Read replicas are primarily a scaling and asynchronous replication feature. RDS Proxy is a connection-management layer. RDS Custom is the escape hatch for Oracle or SQL Server workloads that need privileged operating-system or database access.',
      'Those are not cosmetic options. They define the failure model, the replication model, the maintenance story, the latency profile, and sometimes which operational playbooks are even possible.',
    ],
  },
  {
    title: 'When it is the wrong tool',
    paragraphs: [
      "RDS is a poor fit when the workload needs server-level access that standard RDS intentionally hides, when the application is fundamentally a NoSQL or cache problem, or when the team actually wants Aurora's cluster architecture rather than instance-based RDS. It is also a bad fit when teams expect the service to solve poor schema design or unbounded connection storms automatically.",
      'It can also be the wrong choice for extreme write scale, unusual extension requirements, or custom operating-system agents that require privileged access. In those cases Aurora, RDS Custom, or a self-managed path may be the better fit depending on the constraints.',
    ],
  },
]

const deploymentModels = [
  {
    title: 'Single-AZ DB instance',
    detail:
      'The simplest deployment model. Good for development, testing, low-risk workloads, and production systems where you consciously accept lower availability or where the application already handles database replacement another way.',
  },
  {
    title: 'Multi-AZ DB instance deployment',
    detail:
      'Designed for high availability. RDS provisions and maintains a synchronous standby replica in a different Availability Zone and fails over automatically when needed. The standby does not serve read traffic, so this is an availability feature rather than a read-scaling feature.',
  },
  {
    title: 'Multi-AZ DB cluster deployment',
    detail:
      'A writer plus two readers across three Availability Zones. It uses native engine replication, readers can serve read traffic, and failover targets are built into the topology. This shape is not Aurora, even though it is cluster-based.',
  },
  {
    title: 'Read replicas',
    detail:
      'Primarily for read scaling, reporting, fan-out, and some migration or disaster-recovery patterns. Replication is engine-specific and generally asynchronous, so read-your-write guarantees do not automatically hold on replicas.',
  },
  {
    title: 'RDS Proxy',
    detail:
      'A managed connection pool and proxy layer that smooths connection spikes, reuses backend connections, and reduces database stress from connection churn. Useful for bursty application fleets and serverless-style connection patterns.',
  },
  {
    title: 'RDS Custom',
    detail:
      'A more permissive operating model for Oracle and SQL Server when the workload requires host-level or privileged database access. It keeps some managed-service benefits but increases your responsibility and shrinks the support perimeter.',
  },
]

const fitGuide = [
  {
    title: 'Need standard relational engines with managed backups, patching workflow, and basic HA',
    choice: 'RDS is a strong fit.',
  },
  {
    title: 'Need read scaling and automatic failover in one managed topology without moving to Aurora',
    choice: 'Consider a Multi-AZ DB cluster if your engine and version support it.',
  },
  {
    title: 'Need high availability but not read scaling',
    choice: 'Use a Multi-AZ DB instance deployment rather than assuming a standby can serve reads.',
  },
  {
    title: 'Need pooled connection management for bursty clients or many short-lived app connections',
    choice: 'Add RDS Proxy where supported.',
  },
  {
    title: 'Need privileged OS access, custom patches, or custom agents on Oracle or SQL Server',
    choice: 'Evaluate RDS Custom instead of standard RDS.',
  },
  {
    title: 'Need engine-specific cluster features, global database patterns, or Aurora-specific storage behavior',
    choice: 'Evaluate Aurora instead of treating it as interchangeable with standard RDS DB instances.',
  },
]

const keyTakeaways = [
  'RDS is a managed database platform, not an outsourced query-tuning service.',
  'High availability, read scaling, and connection scaling are separate design problems with different RDS features.',
  'Single-AZ, Multi-AZ DB instance, Multi-AZ DB cluster, and read replicas have materially different semantics.',
  'Backups, monitoring, encryption, parameter groups, and upgrade strategy should be designed before production, not after the first incident.',
  'The most expensive RDS mistakes usually come from poor workload fit, poor connection behavior, or assuming replicas behave like synchronous copies.',
]

const coreConceptSections: NarrativeSection[] = [
  {
    id: 'core-engines',
    heading: 'Supported Engines and Service Scope',
    paragraphs: [
      'For standard RDS DB instances, AWS documents support for IBM Db2, MariaDB, Microsoft SQL Server, MySQL, Oracle Database, and PostgreSQL. Feature support varies by engine, version, and Region, so the exact answer to "does RDS support this feature" is almost always engine-specific rather than universal.',
      'This is one reason RDS architecture discussions should always include the engine name. Authentication methods, read replica behavior, parameter behavior, option groups, upgrade rules, version cadence, and even which surrounding features are available can differ substantially between engines.',
      'When a team says "we use RDS," the next useful question is "which engine and which topology?" Without that, most operational advice is too vague to be reliable.',
    ],
  },
  {
    id: 'core-instance-model',
    heading: 'DB Instances, DB Clusters, and the Basic Mental Model',
    paragraphs: [
      'A DB instance is the core operational unit for standard RDS. You choose the engine, engine version, DB instance class, storage type and size, availability model, network placement, encryption settings, credentials or authentication scheme, backup retention, maintenance window, monitoring, and several engine-specific options.',
      'A Multi-AZ DB cluster is still part of the RDS family but changes the model from one instance with optional replicas to a cluster with a writer and readers. It is closer to a topology product than a simple single-instance database. The operational shape, failover behavior, and read-routing possibilities all change once you move into the cluster model.',
      'This matters because teams often try to solve availability, scaling, and upgrade needs with the wrong primitive. The instance model is simpler. The cluster model can be stronger for production read-heavy systems. Neither is universally best.',
    ],
  },
  {
    id: 'core-compute-storage',
    heading: 'Compute Classes, Storage Types, and Capacity Planning',
    paragraphs: [
      'RDS instance classes define the compute and memory envelope of the database. AWS documents general-purpose, memory-optimized, compute-optimized, and burstable families. Matching the class to the workload bottleneck matters more than picking a large size by instinct. OLTP systems often care about memory and steady IOPS. Reporting or maintenance-heavy systems may be more sensitive to CPU and storage throughput. Small burstable instances can be efficient for low-duty-cycle workloads but can become unstable if used as underprovisioned production databases.',
      'For non-Aurora RDS DB instances, storage is EBS-based. AWS documents general-purpose SSD options such as gp2 and gp3, provisioned IOPS SSD options such as io1 and io2 Block Express, and magnetic storage for backward compatibility. Production databases should normally start by comparing gp3 with provisioned IOPS rather than defaulting to whichever option looks cheapest on day one.',
      'Storage planning is not only about size. It is about throughput, IOPS ceilings, latency consistency, and operational headroom. A database can have enough GiB and still be undersized because the storage class cannot sustain the I/O pattern.',
    ],
  },
  {
    id: 'core-storage-autoscaling',
    heading: 'Storage Autoscaling and Its Limits',
    paragraphs: [
      'RDS storage autoscaling can automatically increase allocated storage when the service predicts it is needed, which helps avoid manual storage administration and some storage-full incidents. It is useful, but it should not be treated as a substitute for sizing discipline.',
      'The important constraint is that autoscaling only grows storage. It does not shrink it later. AWS also documents that autoscaling cannot completely prevent storage-full situations during very large data loads because further storage modifications are rate-limited for several hours or until storage optimization completes.',
      'In practice this means you should still choose sane initial storage, set a thoughtful maximum threshold, and treat sudden growth as a capacity signal that deserves investigation instead of assuming autoscaling makes storage planning irrelevant.',
    ],
  },
  {
    id: 'core-ha',
    heading: 'High Availability: Single-AZ, Multi-AZ DB Instance, and Multi-AZ DB Cluster',
    paragraphs: [
      'A Single-AZ instance is the simplest deployment and also the weakest from an availability standpoint. It may be entirely acceptable for development or low-criticality workloads, but it puts more recovery burden on the team when something fails.',
      'A Multi-AZ DB instance deployment automatically provisions a synchronous standby in another Availability Zone and uses that standby for automatic failover. AWS explicitly notes that this high-availability option is not a read-scaling feature. You cannot serve read traffic from the standby. The tradeoff is better resilience with some write and commit latency overhead because changes are synchronously replicated.',
      'A Multi-AZ DB cluster is a different product shape. It uses a writer and two readers, replicates using native engine replication, can serve read traffic from the readers, and typically has lower write latency than a Multi-AZ DB instance deployment. This is the important mental split: Multi-AZ instance means standby-only; Multi-AZ cluster means standby plus read-serving nodes.',
    ],
  },
  {
    id: 'core-read-replicas',
    heading: 'Read Replicas and Replication Semantics',
    paragraphs: [
      'Read replicas exist to offload reads, support fan-out, enable reporting, reduce pressure on the primary, and in some cases assist migration or disaster-recovery strategies. They are not interchangeable with Multi-AZ standbys because they are primarily about scaling and replication topology, not synchronous high availability.',
      'Replica behavior is engine-specific. AWS documents that some engines allow a replica to be created from another replica, while others do not. This means replica tree design is not universal across the RDS engine lineup. It also means operational practices such as promotion, lag management, and replica chaining must be reasoned about per engine.',
      'The key application truth is that read replicas are typically eventually consistent relative to the source. If your application cannot tolerate replica lag for a specific request path, that request path should not read from a replica.',
    ],
  },
  {
    id: 'core-networking',
    heading: 'Networking, Reachability, and Private Access',
    paragraphs: [
      'RDS instances live in a VPC context. The subnet group, security groups, routing, and public-access setting together determine who can reach the database and from where. The safe default for production is private access with tightly scoped security groups rather than public database endpoints exposed for convenience.',
      'A well-designed RDS network posture usually means application compute and the database share VPC connectivity, security groups allow only explicit application tiers, and administrative access happens through controlled bastions, SSM-based tooling, or private connectivity rather than broad public ingress.',
      'Database incidents are often network incidents in disguise. A mis-scoped security group or an application deployed to the wrong subnet can look like a database outage even when the engine is healthy.',
    ],
  },
  {
    id: 'core-parameter-option-groups',
    heading: 'Parameter Groups and Option Groups',
    paragraphs: [
      'Parameter groups are the service-level containers for engine configuration values. Default parameter groups exist for each engine and version, but AWS documents that you cannot modify default groups directly. In practice, production systems usually need custom groups so configuration changes are explicit, reviewable, and isolated to the workloads that need them.',
      'Static parameter changes generally require a reboot to take effect, while dynamic parameter changes can often apply immediately. This distinction matters operationally because a parameter change may be logically small but still carry an outage or failover implication. Parameter groups should be treated like deployable configuration, not like a miscellaneous console checkbox collection.',
      'Option groups are separate from parameter groups. They enable and configure engine-specific features that only some engines expose. If a team does not understand the difference, it becomes easy to lose track of why one RDS instance behaves differently from another despite apparently using the same engine.',
    ],
  },
  {
    id: 'core-backups',
    heading: 'Automated Backups, Snapshots, and Point-in-Time Recovery',
    paragraphs: [
      'RDS automated backups run during the configured backup window and, during the retention period, allow recovery to any point in time within that window. Manual DB snapshots are separate artifacts you create intentionally. The first snapshot is full; subsequent snapshots of the same database are incremental.',
      'This distinction matters for operations. Automated backups are the rolling safety net. Manual snapshots are deliberate checkpoints for actions such as major changes, migrations, or pre-delete preservation. They should not be confused with each other in runbooks.',
      'RDS backups are excellent for service-level recovery, but they are not a complete operational story by themselves. You still need to know recovery objectives, test restores, validate application compatibility after restore, and ensure that backup retention aligns with the business requirement rather than just the default setting.',
    ],
  },
  {
    id: 'core-recovery-lifecycle',
    heading: 'Deletion, Final Snapshots, and Recovery Hygiene',
    paragraphs: [
      'Deleting an RDS DB instance is a destructive operation. AWS documents that deletion protection must be turned off first, and that console-created DB instances have deletion protection enabled by default. This is exactly the kind of small default that saves teams from large mistakes.',
      'Before deletion, you choose whether to take a final snapshot and whether to retain automated backups. These are not clerical options. They decide whether you have a convenient rollback path after a human or automation error.',
      'A disciplined team treats deletion as a change-management event, not a casual cleanup action. If a production database can disappear without an explicit recovery checkpoint, the process is too loose.',
    ],
  },
  {
    id: 'core-security',
    heading: 'Security: Encryption, TLS, IAM, and Secrets',
    paragraphs: [
      'RDS supports encryption at rest using AWS KMS. AWS documents that encrypted data at rest includes the underlying storage, logs, automated backups, read replicas, and snapshots. Once encryption choices are made, they affect later migration and replica behavior, so they should be planned early rather than retrofitted in a hurry.',
      'RDS also supports SSL or TLS for data in transit. Production systems should treat encrypted transport as the baseline posture, especially across service boundaries or hybrid connectivity. The fact that a database is private does not mean plaintext connections are a good idea.',
      'Authentication choices also matter. AWS documents password authentication, IAM database authentication, and Kerberos authentication, with engine-specific rules and mutual exclusivity considerations for a given user. Secrets Manager is usually the right operational companion for stored credentials, particularly when rotation matters.',
    ],
  },
  {
    id: 'core-observability',
    heading: 'Observability: CloudWatch Metrics, Logs, Enhanced Monitoring, and Database Insights',
    paragraphs: [
      'The default RDS metric surface in CloudWatch is useful, but it is rarely enough for serious diagnosis. Enhanced Monitoring gives near real-time operating-system metrics, which is valuable when the question is whether the database host is CPU-bound, memory-stressed, swapping, I/O-constrained, or dominated by specific processes.',
      'RDS database logs can be exported to CloudWatch Logs. AWS explicitly notes that you do not get host file-system access to database logs on the DB instance, so publishing logs is the operational path for search, retention management, metric extraction, and alerting workflows.',
      'There is also an active monitoring transition to understand. As of March 12, 2026, AWS documents that the Performance Insights console experience reaches end of life on June 30, 2026, and recommends moving paid-tier usage to the Advanced mode of CloudWatch Database Insights. AWS also documents that Standard mode of Database Insights is enabled by default for Amazon RDS databases. That is a product-direction detail worth baking into current operational planning now, not later.',
    ],
  },
  {
    id: 'core-proxy',
    heading: 'RDS Proxy and Connection Management',
    paragraphs: [
      'Many database outages are actually connection-behavior failures. Too many short-lived connections, excessive connection churn, or sudden concurrency spikes can overwhelm a database even when CPU and storage look acceptable. RDS Proxy exists to address this class of problem.',
      'AWS documents that RDS Proxy establishes a connection pool, reuses those backend connections, and can queue or throttle application connections that cannot be served immediately. The practical outcome is smoother application behavior under connection spikes and less overhead spent repeatedly establishing secure database sessions.',
      'RDS Proxy is not a universal cure. Some features are unsupported or engine-specific, and some session behaviors can reduce multiplexing efficiency. But when the application tier is bursty, serverless, or simply too aggressive with connections, the proxy can move the system from fragile to stable.',
    ],
  },
  {
    id: 'core-upgrades',
    heading: 'Patch Management, Maintenance Windows, and Version Upgrades',
    paragraphs: [
      'RDS gives you a maintenance framework, not a reason to stop caring about versions. Engine versions still age out, security issues still happen, and feature compatibility still matters. AWS documents that minor upgrades typically occur during the maintenance window, and in cases of critical security issues or end-of-support pressure, RDS might apply a minor version upgrade even when auto minor version upgrade is not enabled.',
      'That means version strategy should be intentional. You need to know your current version, the upgrade path, application compatibility assumptions, and whether you want to lean on automatic minor upgrades or control sequencing yourself through staged validation.',
      'Maintenance windows reduce surprise, but they do not eliminate the need for testing. The right question is not "does RDS patch for me?" It is "what is my validation and rollback story when RDS or I change the engine version?"',
    ],
  },
  {
    id: 'core-blue-green',
    heading: 'Blue/Green Deployments for Safer Changes',
    paragraphs: [
      'RDS Blue/Green Deployments create a production-like staging environment, replicate changes from the current production environment, let you test the green side, and then switch over with built-in guardrails. AWS documents that switchovers typically take under a minute with no data loss, depending on workload characteristics.',
      'This is one of the most useful operational features for reducing risk during upgrades, parameter changes, and certain storage or topology adjustments. It is especially valuable for teams that want a controlled cutover instead of modifying the only production database in place.',
      'It is not universal. As of March 12, 2026, AWS documents support only for RDS for MariaDB, MySQL, and PostgreSQL, with additional limitations such as lack of support for Multi-AZ DB cluster deployments and RDS Proxy in blue/green mode. Blue/green is powerful, but you must verify support for your exact engine and topology.',
    ],
  },
  {
    id: 'core-cost',
    heading: 'Cost Model and Cost Drivers',
    paragraphs: [
      'RDS cost is the combination of more than just instance-hours. Real cost comes from DB instance class, storage size, storage type, provisioned IOPS, backup footprint beyond included allowances, data transfer patterns, replicas, Multi-AZ topology, proxy usage, monitoring mode, and license model for commercial engines.',
      'The largest long-term savings usually come from correct topology and correct sizing, not from micro-optimizing one metric. A right-sized instance with disciplined retention, sane replica count, and predictable connection behavior beats an oversized cluster with cleanup debt almost every time.',
      'Reserved DB instances can lower cost when the workload is steady, while on-demand remains useful for flexibility. But cost optimization should never violate operational intent. Choosing Single-AZ for a business-critical system just because it is cheaper is not optimization; it is deferred outage spending.',
    ],
  },
  {
    id: 'core-rds-custom',
    heading: 'RDS Custom and the Boundary of Standard RDS',
    paragraphs: [
      'RDS Custom exists for workloads that still want managed automation but require privileged access to the underlying operating system or database environment. AWS documents support for Oracle Database and Microsoft SQL Server only. That narrow support tells you what RDS Custom is for: specialized legacy or packaged workloads, not general-purpose convenience.',
      'The tradeoff is straightforward. You gain more control and the ability to install custom patches, agents, or native features. In return, you take on more responsibility and can fall outside the RDS Custom support perimeter if you make unsupported changes. It is a deliberate compromise, not a free superset of standard RDS.',
      'If a team is frequently frustrated by the guardrails of standard RDS, that does not automatically mean RDS Custom is the answer. It may mean the workload wants Aurora, or it may mean the team is trying to preserve server-era operational habits that should be retired instead of carried forward.',
    ],
  },
]

const designPatterns = [
  {
    title: 'Private database by default',
    detail:
      'Keep production databases private inside the VPC and expose them only to application tiers that actually need access. Publicly reachable RDS endpoints should be the exception and should be justified explicitly.',
  },
  {
    title: 'Multi-AZ for production availability',
    detail:
      'Use Multi-AZ when the database is mission critical and the workload cannot casually tolerate a single-AZ host or AZ failure. Choose between Multi-AZ DB instance and Multi-AZ DB cluster based on whether you also need read traffic on secondaries.',
  },
  {
    title: 'Replica-backed read segregation',
    detail:
      'Send reporting, dashboards, and eventually consistent read-heavy workflows to replicas so the primary protects write latency and transactional paths.',
  },
  {
    title: 'Proxy in front of bursty clients',
    detail:
      'Use RDS Proxy when application connection behavior is a bigger problem than raw query cost. This is common with Lambda, autoscaled web fleets, and frameworks that open too many short-lived connections.',
  },
  {
    title: 'Blue/green for risky changes',
    detail:
      'Prefer blue/green over direct in-place modification when the engine supports it and the change has meaningful rollback risk, such as upgrades or storage/performance reconfiguration.',
  },
  {
    title: 'Custom parameter groups as code-like config',
    detail:
      'Treat parameter groups as reviewed configuration with clear ownership, not ad hoc runtime tuning. Parameter drift is a common source of hard-to-reproduce behavior between environments.',
  },
]

const operationalChecklist = [
  'Know the engine, engine version, topology, storage type, KMS key, and maintenance window for every production database.',
  'Use deletion protection, tested backups, and explicit final snapshot policy for production databases.',
  'Keep database endpoints private unless a strong reason exists to do otherwise.',
  'Enable the right observability stack: CloudWatch metrics, relevant log exports, Enhanced Monitoring where needed, and current Database Insights strategy.',
  'Test failover, restore, and upgrade procedures before the incident that forces you to learn them live.',
  'Set connection limits and application pool settings intentionally; do not let defaults define production concurrency.',
  'Document replica usage rules so engineers know which paths may tolerate lag and which must always hit the primary or writer.',
  'Track engine lifecycle dates so forced upgrades do not become a surprise project.',
]

const pitfalls = [
  'Assuming Multi-AZ automatically means read scaling. A Multi-AZ DB instance standby cannot serve reads.',
  'Treating read replicas as strongly consistent copies and then being surprised by lag.',
  'Using tiny burstable instances for sustained production workloads because they were inexpensive during early testing.',
  'Leaving databases publicly reachable because it was easier during initial setup.',
  'Changing parameter groups in production without understanding which settings are static, which are dynamic, and whether a reboot or failover will follow.',
  'Assuming automated backups are enough without regularly testing point-in-time restore and snapshot restore procedures.',
  'Ignoring connection storms and blaming the database engine when the application tier is the component oversubscribing connections.',
  'Enabling storage autoscaling and then forgetting that storage can only move upward, not back down.',
  'Relying on Performance Insights planning without accounting for the June 30, 2026 end-of-life of the console experience and the move toward CloudWatch Database Insights.',
  'Deleting or modifying production databases without final snapshots, rollback checkpoints, or a clear recovery plan.',
]

const compareNotes = [
  {
    title: 'RDS vs self-managed database on EC2',
    detail:
      'RDS trades some host-level control for a much better managed operational baseline. Self-managed on EC2 gives full control but also returns patching, backup orchestration, failure automation, and day-two host care to your team.',
  },
  {
    title: 'RDS vs Aurora',
    detail:
      'Aurora is part of the broader AWS relational story but has its own cluster-first architecture, storage model, and feature surface. Treat it as a separate database platform decision, not just a checkbox under generic RDS.',
  },
  {
    title: 'RDS vs DynamoDB',
    detail:
      'If the workload fundamentally needs relational joins, transactions, and SQL semantics, RDS is the natural direction. If the workload is access-pattern-first key-value or document data at extreme scale, DynamoDB may be the better fit.',
  },
  {
    title: 'RDS standard vs RDS Custom',
    detail:
      'Standard RDS is for managed guardrails. RDS Custom is for cases where those guardrails block a legitimate requirement. Choosing RDS Custom without a real control requirement usually adds complexity without adding value.',
  },
]

const examples: ExampleSection[] = [
  {
    id: 'ex-create',
    title: 'Create a production-oriented PostgreSQL DB instance',
    code: `aws rds create-db-instance \\
  --db-instance-identifier app-prod-pg \\
  --engine postgres \\
  --engine-version 16.3 \\
  --db-instance-class db.r7g.large \\
  --allocated-storage 200 \\
  --storage-type gp3 \\
  --max-allocated-storage 500 \\
  --multi-az \\
  --storage-encrypted \\
  --kms-key-id arn:aws:kms:us-east-1:111122223333:key/abcd-1234 \\
  --master-username appadmin \\
  --manage-master-user-password \\
  --backup-retention-period 14 \\
  --preferred-backup-window 04:00-04:30 \\
  --preferred-maintenance-window sun:05:00-sun:05:30 \\
  --vpc-security-group-ids sg-0123456789abcdef0 \\
  --db-subnet-group-name prod-private-db-subnets \\
  --enable-performance-insights \\
  --database-insights-mode advanced \\
  --monitoring-interval 60 \\
  --enable-cloudwatch-logs-exports postgresql,upgrade`,
    explanation:
      'This example shows the shape of a serious production create request: private networking, encryption, backup retention, Multi-AZ, storage headroom, managed password handling, and current Database Insights-oriented monitoring choices. The exact flags vary by engine and version.',
  },
  {
    id: 'ex-read-replica',
    title: 'Create a read replica for reporting traffic',
    code: `aws rds create-db-instance-read-replica \\
  --db-instance-identifier app-reporting-replica \\
  --source-db-instance-identifier app-prod-pg \\
  --db-instance-class db.r7g.large \\
  --publicly-accessible false \\
  --auto-minor-version-upgrade`,
    explanation:
      'Use replicas for read fan-out, reporting, and offloading. Do not move correctness-critical read-after-write paths to a replica unless the application explicitly tolerates lag.',
  },
  {
    id: 'ex-pitr',
    title: 'Restore to a point in time after a bad deployment',
    code: `aws rds restore-db-instance-to-point-in-time \\
  --source-db-instance-identifier app-prod-pg \\
  --target-db-instance-identifier app-prod-pg-restore \\
  --restore-time 2026-03-12T09:15:00Z \\
  --db-instance-class db.r7g.large \\
  --publicly-accessible false`,
    explanation:
      'Point-in-time restore creates a new DB instance rather than rewinding the existing one in place. That is operationally useful because you can inspect, validate, and then decide how to cut traffic or extract data from the restored copy.',
  },
  {
    id: 'ex-proxy',
    title: 'Recognize when RDS Proxy is the right fix',
    code: `Application fleet
  -> thousands of short-lived client connections
  -> authentication and TLS setup on every connect
  -> primary DB hits connection pressure before CPU pressure

Add RDS Proxy:
  clients -> proxy endpoint -> pooled backend DB connections

Result:
  smoother spikes
  fewer backend connects
  lower memory and CPU overhead on the DB`,
    explanation:
      'If the symptom is connection churn rather than expensive SQL, a proxy is often more valuable than scaling the database instance blindly. The problem definition matters.',
  },
  {
    id: 'ex-blue-green',
    title: 'Blue/green upgrade flow for safer production changes',
    code: `Current production (blue)
  -> create green environment from blue
  -> let RDS replicate ongoing changes
  -> apply engine or config changes on green
  -> run validation tests
  -> switchover when guardrails pass
  -> green becomes production`,
    explanation:
      'This is the right model for reducing risk around upgrades and configuration changes on supported engines. It favors rehearsed cutover over in-place hope.',
  },
  {
    id: 'ex-hardening',
    title: 'Minimal production hardening checklist',
    code: `1. Private subnet group and restrictive security groups
2. Encryption at rest with KMS
3. TLS required by clients
4. Deletion protection enabled
5. Backup retention and tested restore path
6. Multi-AZ where the workload is business critical
7. Logs exported to CloudWatch Logs
8. Enhanced Monitoring and Database Insights chosen intentionally
9. Secrets managed outside application source
10. Version and maintenance policy documented`,
    explanation:
      'A production RDS deployment is more than a running engine. Security, recovery, and observability settings are part of the database design, not post-launch decorations.',
  },
]

const glossaryTerms = [
  {
    term: 'DB instance',
    definition:
      'An isolated managed database environment in Amazon RDS. This is the main unit for standard non-Aurora RDS deployments.',
  },
  {
    term: 'DB instance class',
    definition:
      'The compute and memory profile assigned to the database instance.',
  },
  {
    term: 'Multi-AZ DB instance deployment',
    definition:
      'A high-availability deployment with a synchronous standby in another Availability Zone. The standby does not serve reads.',
  },
  {
    term: 'Multi-AZ DB cluster',
    definition:
      'An RDS cluster deployment with one writer and reader instances across multiple Availability Zones, designed for high availability plus read traffic on the readers.',
  },
  {
    term: 'Read replica',
    definition:
      'A replica used primarily for read scaling and asynchronous replication scenarios rather than synchronous failover.',
  },
  {
    term: 'Parameter group',
    definition:
      'A container for engine configuration values applied to one or more RDS DB instances or, for Multi-AZ DB clusters, to the cluster.',
  },
  {
    term: 'Option group',
    definition:
      'A container for engine-specific optional features that some RDS engines can enable and configure.',
  },
  {
    term: 'Storage autoscaling',
    definition:
      'A feature that can automatically increase RDS storage when needed. It only scales storage upward, not downward.',
  },
  {
    term: 'Point-in-time recovery (PITR)',
    definition:
      'Restoring a new DB instance to a specific point within the automated backup retention period.',
  },
  {
    term: 'RDS Proxy',
    definition:
      'A managed proxy and connection pool that reuses backend database connections and helps absorb connection surges.',
  },
  {
    term: 'Database Insights',
    definition:
      'The CloudWatch-based database monitoring experience for RDS. Standard mode is enabled by default, and Advanced mode adds deeper analysis and longer retention.',
  },
  {
    term: 'Performance Insights',
    definition:
      'The legacy RDS performance analysis experience whose console experience reaches end of life on June 30, 2026 according to AWS documentation current on March 12, 2026.',
  },
  {
    term: 'IAM database authentication',
    definition:
      'An authentication model where clients connect to the database using temporary IAM-authenticated tokens rather than static passwords.',
  },
  {
    term: 'Deletion protection',
    definition:
      'A setting that blocks deletion of an RDS database until the protection flag is explicitly turned off.',
  },
  {
    term: 'RDS Custom',
    definition:
      'A more permissive RDS operating model for Oracle and SQL Server that allows privileged access to the underlying OS and database environment.',
  },
]

const pageSources = [
  'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html',
  'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZSingleStandby.html',
  'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/multi-az-db-clusters-concepts.html',
  'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html',
  'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_Storage.html',
  'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PIOPS.Autoscaling.html',
  'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/parameter-groups-overview.html',
  'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithAutomatedBackups.html',
  'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PIT.html',
  'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_DeleteInstance.html',
  'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.Encryption.html',
  'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/database-authentication.html',
  'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html',
  'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_LogAccess.Procedural.UploadtoCloudWatch.html',
  'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_DatabaseInsights.html',
  'https://docs.aws.amazon.com/us_us/AmazonRDS/latest/UserGuide/USER_PerfInsights.Overview.html',
  'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/blue-green-deployments-overview.html',
  'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_UpgradeDBInstance.Upgrading.html',
  'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-custom.html',
  'https://aws.amazon.com/rds/pricing/',
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
    { id: 'bp-deployments', label: 'Deployment Models' },
    { id: 'bp-fit', label: 'When to Use It' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-engines', label: 'Supported Engines' },
    { id: 'core-instance-model', label: 'Instance and Cluster Model' },
    { id: 'core-compute-storage', label: 'Compute and Storage' },
    { id: 'core-storage-autoscaling', label: 'Storage Autoscaling' },
    { id: 'core-ha', label: 'High Availability' },
    { id: 'core-read-replicas', label: 'Read Replicas' },
    { id: 'core-networking', label: 'Networking' },
    { id: 'core-parameter-option-groups', label: 'Parameter and Option Groups' },
    { id: 'core-backups', label: 'Backups and PITR' },
    { id: 'core-recovery-lifecycle', label: 'Deletion and Recovery Hygiene' },
    { id: 'core-security', label: 'Security and Auth' },
    { id: 'core-observability', label: 'Observability' },
    { id: 'core-proxy', label: 'RDS Proxy' },
    { id: 'core-upgrades', label: 'Upgrades and Maintenance' },
    { id: 'core-blue-green', label: 'Blue/Green Deployments' },
    { id: 'core-cost', label: 'Cost Model' },
    { id: 'core-rds-custom', label: 'RDS Custom' },
    { id: 'core-patterns', label: 'Design Patterns' },
    { id: 'core-ops-checklist', label: 'Operational Checklist' },
    { id: 'core-compare', label: 'Compare and Contrast' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
  ],
  examples: examples.map((example) => ({
    id: example.id,
    label: example.title,
  })),
  glossary: [
    { id: 'glossary-terms', label: 'Terms' },
    { id: 'glossary-sources', label: 'Primary Sources' },
  ],
}

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

const win98HelpStyles = `
.aws-rds-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.aws-rds-help-page .win98-window {
  min-height: 100dvh;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background: #c0c0c0;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
}

.aws-rds-help-page .win98-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 24px;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
}

.aws-rds-help-page .win98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.aws-rds-help-page .win98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.aws-rds-help-page .win98-control {
  width: 18px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000000;
  text-decoration: none;
  font-size: 11px;
  line-height: 1;
}

.aws-rds-help-page .win98-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
}

.aws-rds-help-page .win98-tab {
  padding: 5px 10px 4px;
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  font-size: 12px;
  cursor: pointer;
  font-family: inherit;
}

.aws-rds-help-page .win98-tab.active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.aws-rds-help-page .win98-main {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  flex: 1;
  min-height: 0;
  border-top: 1px solid #404040;
  background: #ffffff;
}

.aws-rds-help-page .win98-toc {
  overflow: auto;
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
}

.aws-rds-help-page .win98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.aws-rds-help-page .win98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.aws-rds-help-page .win98-toc-list li {
  margin: 0 0 8px;
}

.aws-rds-help-page .win98-toc-list a {
  color: #000000;
  font-size: 12px;
  text-decoration: none;
}

.aws-rds-help-page .win98-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.aws-rds-help-page .win98-doc-title {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 700;
}

.aws-rds-help-page .win98-doc-subtitle {
  margin: 0 0 12px;
  font-size: 12px;
  font-weight: 700;
}

.aws-rds-help-page .win98-section {
  margin: 0 0 22px;
}

.aws-rds-help-page .win98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.aws-rds-help-page .win98-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.aws-rds-help-page .win98-content p,
.aws-rds-help-page .win98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.aws-rds-help-page .win98-content p {
  margin: 0 0 10px;
}

.aws-rds-help-page .win98-content ul,
.aws-rds-help-page .win98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.aws-rds-help-page .win98-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.aws-rds-help-page .win98-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.aws-rds-help-page .win98-codebox code {
  display: block;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
}

.aws-rds-help-page .win98-inline-link {
  color: #000080;
}

@media (max-width: 900px) {
  .aws-rds-help-page .win98-main {
    grid-template-columns: 1fr;
  }

  .aws-rds-help-page .win98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .aws-rds-help-page .win98-title-text {
    position: static;
    transform: none;
    margin-left: 8px;
    font-size: 14px;
  }
}
`

export default function AWSRdsPage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<TabId>(() => {
    const tab = searchParams.get('tab')
    return isTabId(tab) ? tab : 'big-picture'
  })

  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const tabFromUrl = searchParams.get('tab')
    if (isTabId(tabFromUrl) && tabFromUrl !== activeTab) {
      setActiveTab(tabFromUrl)
    }
  }, [activeTab, searchParams])

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams)
    if (nextParams.get('tab') !== activeTab) {
      nextParams.set('tab', activeTab)
      setSearchParams(nextParams, { replace: true })
    }
    document.title = `${pageTitle} (${activeTabLabel})`
  }, [activeTab, activeTabLabel, searchParams, setSearchParams])

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

  return (
    <div className="aws-rds-help-page">
      <style>{win98HelpStyles}</style>
      <div className="win98-window" role="presentation">
        <header className="win98-titlebar">
          <span className="win98-title-text">{pageTitle}</span>
          <div className="win98-title-controls">
            <button className="win98-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="win98-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="win98-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`win98-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="win98-main">
          <aside className="win98-toc" aria-label="Table of contents">
            <h2 className="win98-toc-title">Contents</h2>
            <ul className="win98-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="win98-content">
            <h1 className="win98-doc-title">{pageTitle}</h1>
            <p className="win98-doc-subtitle">{pageSubtitle}</p>
            {introParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p>
              The title-bar minimize control returns to the previous page when possible, or to{' '}
              <Link to="/algoViz" className="win98-inline-link">
                /algoViz
              </Link>{' '}
              when there is no prior history entry.
            </p>

            {activeTab === 'big-picture' && (
              <>
                <section id="bp-overview" className="win98-section">
                  <h2 className="win98-heading">Overview</h2>
                  {bigPictureSections.map((section) => (
                    <div key={section.title}>
                      <h3 className="win98-subheading">{section.title}</h3>
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  ))}
                </section>

                <hr className="win98-divider" />

                <section id="bp-deployments" className="win98-section">
                  <h2 className="win98-heading">Deployment Models</h2>
                  {deploymentModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <hr className="win98-divider" />

                <section id="bp-fit" className="win98-section">
                  <h2 className="win98-heading">When to Use It</h2>
                  <ul>
                    {fitGuide.map((item) => (
                      <li key={item.title}>
                        <strong>{item.title}:</strong> {item.choice}
                      </li>
                    ))}
                  </ul>
                </section>

                <hr className="win98-divider" />

                <section id="bp-takeaways" className="win98-section">
                  <h2 className="win98-heading">Key Takeaways</h2>
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
                {coreConceptSections.map((section) => (
                  <section key={section.id} id={section.id} className="win98-section">
                    <h2 className="win98-heading">{section.heading}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </section>
                ))}

                <section id="core-patterns" className="win98-section">
                  <h2 className="win98-heading">Design Patterns</h2>
                  {designPatterns.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-ops-checklist" className="win98-section">
                  <h2 className="win98-heading">Operational Checklist</h2>
                  <ul>
                    {operationalChecklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section id="core-compare" className="win98-section">
                  <h2 className="win98-heading">Compare and Contrast</h2>
                  {compareNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                <section id="core-pitfalls" className="win98-section">
                  <h2 className="win98-heading">Common Pitfalls</h2>
                  <ul>
                    {pitfalls.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              </>
            )}

            {activeTab === 'examples' && (
              <>
                {examples.map((example) => (
                  <section key={example.id} id={example.id} className="win98-section">
                    <h2 className="win98-heading">{example.title}</h2>
                    <div className="win98-codebox">
                      <code>{example.code.trim()}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </section>
                ))}
              </>
            )}

            {activeTab === 'glossary' && (
              <>
                <section id="glossary-terms" className="win98-section">
                  <h2 className="win98-heading">Glossary</h2>
                  {glossaryTerms.map((item) => (
                    <p key={item.term}>
                      <strong>{item.term}:</strong> {item.definition}
                    </p>
                  ))}
                </section>

                <section id="glossary-sources" className="win98-section">
                  <h2 className="win98-heading">Primary Sources</h2>
                  <p>
                    This content was compiled from official AWS documentation current as checked on March 12, 2026.
                    Feature support and engine-specific details can change, so production decisions should always be
                    verified against the current engine and Region documentation.
                  </p>
                  <ul>
                    {pageSources.map((source) => (
                      <li key={source}>
                        <a href={source} className="win98-inline-link" target="_blank" rel="noreferrer">
                          {source}
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
