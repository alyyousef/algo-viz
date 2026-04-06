import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import type { JSX, MouseEvent } from 'react'

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

const pageTitle = 'Azure SQL Database'
const pageSubtitle =
  'Managed relational database service for SQL Server-compatible workloads with built-in patching, high availability, backup, scaling, and intelligent performance features.'

const introParagraphs = [
  'Azure SQL Database is a fully managed relational database service built on the SQL Server engine. It gives teams a familiar T-SQL and tooling surface while offloading a large share of infrastructure work such as operating system maintenance, patching, automated backups, high availability, and many performance and security controls.',
  'The service is best understood as platform SQL, not as SQL Server running on a VM and not as a full instance replacement for every workload. It is designed for application databases that benefit from managed operations, elastic scale options, Azure identity and networking integration, and modern cloud continuity features without requiring the team to run the database host directly.',
  'This page treats Azure SQL Database as a systems and platform topic: logical servers, single databases and elastic pools, DTU and vCore purchasing models, General Purpose, Business Critical, Hyperscale, and serverless compute, backup and restore, failover groups, active geo-replication, Query Store, automatic tuning, security, networking, cost, migration, and the design tradeoffs that determine when Azure SQL Database is the right relational service and when another Azure SQL option fits better.',
]

const bigPictureSections: Array<{ title: string; paragraphs: string[] }> = [
  {
    title: 'What it is',
    paragraphs: [
      'Azure SQL Database is a managed database-as-a-service offering in the Azure SQL family. Microsoft operates the underlying infrastructure and availability model, while the customer manages schema, data, workload behavior, permissions, application integration, and database-level operational decisions. That division of responsibility is the core value proposition.',
      'From the application point of view, Azure SQL Database looks intentionally close to SQL Server. Teams use T-SQL, drivers, Query Store, indexes, transactions, views, stored procedures, and the familiar SQL security model. The difference is that capacity, resilience, backups, and much of the control plane are delivered as a managed service rather than as a host that the team owns.',
    ],
  },
  {
    title: 'Why teams use it',
    paragraphs: [
      'Teams use Azure SQL Database when they want a relational database with strong compatibility, automated operations, and cloud elasticity. It is a common fit for line-of-business applications, SaaS products, web applications, APIs, tenant databases, transactional systems, reporting backends, and modernization efforts that want to leave SQL Server VMs behind without rewriting the application around a non-relational store.',
      'It is also attractive when organizations want built-in backup retention, point-in-time restore, high availability, security defaults, Microsoft Entra integration, and intelligent tuning capabilities without building those controls around a self-managed SQL deployment. In practice, many platform teams choose Azure SQL Database because it reduces the amount of database infrastructure they must own directly.',
    ],
  },
  {
    title: 'How to think about it',
    paragraphs: [
      'The right mental model is managed SQL with explicit deployment and service-tier choices. The service does not remove architectural responsibility. The team still needs to choose between single database and elastic pool, DTU or vCore, provisioned or serverless, General Purpose or Business Critical or Hyperscale, zone redundancy, backup retention, and business continuity topology.',
      'A healthy design starts with workload shape: tenant isolation, steady versus bursty usage, storage growth, read versus write behavior, latency sensitivity, disaster recovery objectives, and migration constraints. Teams that start only from current SQL Server habits often pick the wrong tier or pool model and then discover cost or performance problems later.',
    ],
  },
  {
    title: 'Deployment and service direction',
    paragraphs: [
      'Azure SQL Database today is primarily organized around single databases and elastic pools, with purchasing through vCore or DTU depending on the scenario and region support. The modern default for many new architectures is vCore because it expresses compute and storage more directly and maps better to service tiers such as General Purpose, Business Critical, Hyperscale, and serverless compute in supported configurations.',
      'Current Microsoft Learn material also continues to emphasize Well-Architected guidance, automatic tuning, Query Store-driven performance visibility, and reliability features such as zone redundancy and failover groups. The platform direction is clearly toward intelligent managed operations and cloud continuity rather than only hosted relational capacity.',
    ],
  },
  {
    title: 'What changed recently',
    paragraphs: [
      'As reflected in Microsoft Learn content current on March 13, 2026, Azure SQL Database documentation continues to highlight zone redundancy support across relevant vCore tiers, stronger reliability guidance for failover groups, and the role of automatic tuning and Query Store in routine performance management. The service is increasingly documented through operational and architecture lenses, not only provisioning tutorials.',
      'Current documentation also continues to distinguish Hyperscale-specific behaviors such as creation-time zone redundancy constraints and its separate scale model. Those distinctions matter in production planning because they affect migration, disaster recovery posture, and whether a later reconfiguration is simple or disruptive.',
    ],
  },
]

const operatingModelGuide = [
  {
    title: 'Logical server is the management boundary',
    detail:
      'A logical server groups databases, firewall rules, Entra administration, and some server-level settings while not behaving like a full SQL Server instance that you control directly.',
  },
  {
    title: 'Single database is the isolated default',
    detail:
      'A single database has its own compute and storage characteristics and is the clearest fit when one workload needs isolated performance and governance.',
  },
  {
    title: 'Elastic pool is the shared-capacity model',
    detail:
      'Elastic pools let multiple databases share a compute budget, which is useful when many databases spike at different times rather than all peaking together.',
  },
  {
    title: 'Service tier defines architecture and economics',
    detail:
      'General Purpose, Business Critical, Hyperscale, and legacy DTU tiers differ in storage, replica model, latency profile, HA behavior, and cost shape.',
  },
  {
    title: 'Query Store and tuning are first-class operations',
    detail:
      'Azure SQL Database expects teams to use Query Store, automatic tuning, and performance insight tooling as normal parts of day-2 operations.',
  },
  {
    title: 'Business continuity is configurable, not automatic for every objective',
    detail:
      'Built-in HA exists inside the service, but cross-region recovery, failover groups, geo-replication, and backup strategy still need explicit design choices.',
  },
]

const fitGuide = [
  {
    title: 'Need a managed relational database with strong SQL Server compatibility',
    choice: 'Azure SQL Database is a strong fit.',
  },
  {
    title: 'Need many small or medium tenant databases with burst patterns',
    choice: 'Elastic pools are often a strong fit.',
  },
  {
    title: 'Need automatic pause and resume for intermittent workloads',
    choice: 'Serverless can be a good fit where supported and appropriate.',
  },
  {
    title: 'Need very large relational scale with fast storage and compute elasticity',
    choice: 'Hyperscale may be the right Azure SQL Database tier.',
  },
  {
    title: 'Need instance-level SQL Server features or near-full instance compatibility',
    choice: 'Azure SQL Managed Instance may fit better than Azure SQL Database.',
  },
  {
    title: 'Need complete operating system and instance control',
    choice: 'SQL Server on Azure Virtual Machines may be a better fit.',
  },
]

const keyTakeaways = [
  'Azure SQL Database is managed relational SQL, not simply hosted SQL Server.',
  'Single databases, elastic pools, service tiers, and purchasing models are core architectural choices, not provisioning details.',
  'General Purpose, Business Critical, Hyperscale, and serverless each solve different workload shapes and cost profiles.',
  'Built-in high availability does not replace the need to design cross-region continuity, security posture, and performance governance.',
  'Query Store, automatic tuning, and disciplined observability are central to running Azure SQL Database well in production.',
]

const coreConceptSections: NarrativeSection[] = [
  {
    id: 'core-model',
    heading: 'Logical Servers, Single Databases, and Elastic Pools',
    paragraphs: [
      'A logical server in Azure SQL Database is an administrative boundary, not a full SQL Server instance that you own. It groups databases, authentication settings, firewall rules, auditing integration, and certain control-plane settings. This distinction matters because some teams arrive expecting full instance-level behavior and then discover that Azure SQL Database intentionally exposes a narrower managed surface.',
      'The main deployment choice is whether a workload should run as a single database or inside an elastic pool. A single database has isolated compute and storage economics, which is simpler to reason about when one application or tenant needs consistent performance boundaries. An elastic pool shares compute capacity across many databases, which is often ideal for SaaS or departmental fleets where each database is small but peak times vary.',
      'The practical rule is to align the deployment shape with the usage pattern, not with naming convenience. If one database is consistently hot, it may not belong in a pool. If hundreds of tenant databases spike independently, pools are often far more efficient than treating each database as a separate island.',
    ],
  },
  {
    id: 'core-purchasing',
    heading: 'DTU, vCore, and Why the Purchasing Model Changes Design',
    paragraphs: [
      'Azure SQL Database historically exposed the DTU model as a bundled abstraction of compute, memory, and I/O, while the vCore model expresses resources more directly. Both still matter in real estates because older deployments and some migration paths use DTU, while many modern designs favor vCore for clearer sizing and service-tier choices.',
      'The vCore model is easier to reason about architecturally because it aligns with service tiers and features such as General Purpose, Business Critical, Hyperscale, serverless, and zone redundancy. It also helps teams talk about compute and storage more explicitly when planning cost and performance.',
      'The main lesson is not that one model is universally correct. It is that the purchasing model is part of the workload contract. A migration that simply copies current sizing into the wrong model often produces either overpayment or performance surprises.',
    ],
  },
  {
    id: 'core-tiers',
    heading: 'General Purpose, Business Critical, and Hyperscale',
    paragraphs: [
      'General Purpose is commonly used for mainstream application workloads that need balanced cost and managed relational capability. Business Critical is targeted at workloads that need lower latency, faster recovery behavior, and access to architecture characteristics built on local SSD and replica-based availability. Hyperscale is designed for very large databases and fast scaling patterns where storage and compute behavior differ materially from the other tiers.',
      'These tiers are not only pricing names. They reflect different storage and availability architectures. That means latency, backup and restore behavior, read-scale options, zone redundancy behavior, and continuity planning can differ. Choosing a tier only from a pricing table is a weak engineering decision.',
      'Hyperscale in particular deserves special attention because it changes operational assumptions. It is powerful for large and fast-growing databases, but its architecture and constraints should be studied carefully before adopting it just because it sounds like the biggest option.',
    ],
  },
  {
    id: 'core-serverless',
    heading: 'Provisioned Compute, Serverless Compute, and Burst Economics',
    paragraphs: [
      'Provisioned compute is the stable model: the database runs with an allocated performance envelope whether the workload is currently active or not. Serverless is different. It allows compute to scale automatically within bounds and can auto-pause after inactivity in supported scenarios, which is attractive for intermittent or unpredictable workloads.',
      'Serverless is not a default upgrade over provisioned compute. It is a fit-for-shape option. If a workload is always busy, needs very consistent warm latency, or has patterns that keep the database active continuously, serverless may provide little benefit. If a workload has genuine idle periods or large variability, it can be cost-effective and operationally convenient.',
      'The engineering mistake is to equate serverless with free elasticity for every workload. It changes latency behavior, billing shape, and operational expectations. Those tradeoffs need to be explicit.',
    ],
  },
  {
    id: 'core-hyperscale',
    heading: 'Hyperscale Architecture and When It Is Worth the Complexity',
    paragraphs: [
      'Hyperscale separates compute and storage more aggressively than the traditional single database tiers. Microsoft documentation emphasizes its rapid scaling behavior, support for very large databases, and architecture intended for workloads that outgrow the simpler storage model of other tiers.',
      'This tier is often attractive for large SaaS platforms, heavy OLTP systems with growth pressure, or applications that need very fast backup and restore behavior relative to database size. But Hyperscale also introduces tier-specific planning concerns, including feature nuances, migration implications, and certain configuration choices that must be made at creation time.',
      'The practical rule is simple: choose Hyperscale because the workload genuinely needs Hyperscale characteristics, not because it feels safer to buy the largest tier. Complexity without workload justification is still complexity.',
    ],
  },
  {
    id: 'core-performance',
    heading: 'Performance Management, Query Store, Automatic Tuning, and Intelligent Insights',
    paragraphs: [
      'Azure SQL Database expects performance work to be evidence-driven. Query Store captures workload history, supports plan analysis, and underpins several performance-management workflows. Query Performance Insight and related portal tooling expose the most expensive queries and help teams understand whether the bottleneck is CPU, duration, or execution count.',
      'Automatic tuning is one of the more distinctive managed features. Microsoft documentation currently states that Azure defaults enable FORCE_LAST_GOOD_PLAN while other index-related actions are not enabled by default in the same way. This means the service can automatically intervene for certain plan regressions while still leaving broader index automation under explicit control.',
      'These features reduce toil, but they do not eliminate database engineering. Index design, query shape, parameter sensitivity, schema choices, and workload modeling still matter. Automatic tuning helps good operations; it does not rescue weak relational design indefinitely.',
    ],
  },
  {
    id: 'core-ha-dr',
    heading: 'Built-In High Availability, Zone Redundancy, Geo-Replication, and Failover Groups',
    paragraphs: [
      'Azure SQL Database includes built-in high availability within the service, but business continuity objectives often extend beyond local platform redundancy. Teams may also need zone redundancy inside a region, active geo-replication, or auto-failover groups across regions depending on uptime and recovery objectives.',
      'Current Microsoft reliability guidance highlights that zone redundancy is available in relevant vCore tiers and that behavior differs by service tier. It also notes important operational details such as configuration alignment across primary and secondary databases in failover groups. These are real deployment constraints, not optional cleanup tasks.',
      'The important distinction is between service HA and workload continuity architecture. A database can be highly available inside one region and still fail the business continuity requirement if regional failover, application routing, and recovery procedures are not designed deliberately.',
    ],
  },
  {
    id: 'core-backup-restore',
    heading: 'Backups, Point-in-Time Restore, Long-Term Retention, and Recovery Design',
    paragraphs: [
      'Azure SQL Database performs automated backups and supports point-in-time restore, which removes a large amount of backup plumbing from the customer side. For many teams, this alone is a major operational simplification compared with self-managed SQL Server.',
      'However, automated backup is not the same as complete recovery design. Teams still need to define retention requirements, restore testing practices, and the difference between accidental data recovery, disaster recovery, and legal or audit retention. Long-term retention settings may matter for regulatory workloads even when day-to-day operations rely mostly on point-in-time restore.',
      'Recovery planning should therefore include restore time expectations, region assumptions, and how the application behaves when restoring into a new database or after failover. Backup automation is only one part of resilience.',
    ],
  },
  {
    id: 'core-security',
    heading: 'Security, Entra Authentication, Auditing, Encryption, and Network Isolation',
    paragraphs: [
      'Azure SQL Database supports security features such as Microsoft Entra authentication, firewall rules, private endpoints, transparent data encryption, auditing, threat detection related tooling, and fine-grained database permissions. The strong pattern for modern Azure applications is identity-driven access with network restriction rather than broad SQL logins exposed over public endpoints.',
      'Private connectivity and firewall discipline matter because relational databases are high-value assets. If the database is exposed broadly and authentication depends on a few static secrets, the security posture is weaker than it needs to be. Azure SQL Database integrates well with Azure networking precisely so that teams can avoid that pattern.',
      'Good SQL security also includes operational habits: role separation, limited admin access, audited changes, and careful handling of application identities. Platform features help, but governance still matters.',
    ],
  },
  {
    id: 'core-networking',
    heading: 'Connectivity, Private Link, and Application Access Patterns',
    paragraphs: [
      'Application connectivity to Azure SQL Database should be designed with both security and latency in mind. Public endpoint access with controlled firewall ranges may be acceptable for some workloads, but private endpoints are usually the stronger pattern for sensitive applications that already live in Azure virtual networks.',
      'Connection management also matters at the application layer. Modern frameworks and data-access libraries should use pooling sensibly, avoid chatty patterns, and account for transient fault handling. Managed databases still experience failover events, routing changes, and normal cloud-level interruptions, so resilient clients are part of the design.',
      'The best architecture treats connectivity as a product concern rather than a default setting. Network path, authentication mode, driver behavior, and failover handling all contribute to the perceived reliability of the database service.',
    ],
  },
  {
    id: 'core-migration',
    heading: 'Migration from SQL Server and Choosing Among Azure SQL Options',
    paragraphs: [
      'Azure SQL Database is often the target for SQL Server modernization, but not every SQL Server workload maps cleanly to it. If the application depends heavily on instance-level features, SQL Agent behavior, cross-database patterns, or near-full SQL Server compatibility, Azure SQL Managed Instance may be a better landing zone. If the workload needs operating system control or specialized extensions, SQL Server on Azure Virtual Machines may still be appropriate.',
      'For workloads that mostly need one or more application databases with strong relational compatibility and reduced operations burden, Azure SQL Database is often the cleanest managed target. The question is not simply whether the database can run there; it is whether the surrounding operational model, feature set, and compatibility assumptions fit.',
      'Migration planning should include feature assessment, performance baselining, sizing in the target model, connection string behavior, identity and security changes, and rollback or coexistence strategy. Database migration is rarely just a backup-and-restore exercise.',
    ],
  },
  {
    id: 'core-ops',
    heading: 'Observability, Maintenance, and Day-2 Database Operations',
    paragraphs: [
      'Day-2 operations on Azure SQL Database still require discipline even though the service is managed. Teams should monitor CPU, data IO, log IO, storage growth, connection counts, blocking behavior, top queries, failed logins, deadlocks, and backup or restore posture through Azure Monitor, Query Store, and SQL diagnostics.',
      'The operational difference from self-managed SQL is not that tuning disappears. It is that the team spends less time on host maintenance and more time on workload behavior, schema design, security posture, and business continuity. In well-run environments that is a good trade because those are the concerns that actually affect the application.',
      'A mature runbook should include scaling decisions, known hot queries, tuning baselines, failover expectations, restore procedures, identity troubleshooting, and procedures for noisy-tenant or pool saturation conditions. Managed does not mean hands-off.',
    ],
  },
  {
    id: 'core-cost',
    heading: 'Cost Model, Pool Economics, Reserved Capacity, and Avoiding Surprises',
    paragraphs: [
      'Azure SQL Database cost is driven by service tier, compute model, storage, backup retention choices, zone redundancy in relevant tiers, and whether the workload runs as isolated databases or inside elastic pools. Because the service is managed, teams sometimes underestimate how much architecture choices influence spend. In practice, pool design and tier selection often matter more than small query optimizations when the bill is first being shaped.',
      'Elastic pools are a classic cost lever when many databases have spiky but non-overlapping demand. Reserved capacity can also matter for long-lived steady workloads. Serverless can help intermittent workloads, but only if they truly have idle periods and the resulting latency behavior is acceptable.',
      'The right question is not which option has the lowest list price. It is which option produces the lowest total cost for the workload shape, continuity requirement, and operations model that the business actually needs.',
    ],
  },
]

const compareNotes = [
  {
    title: 'Azure SQL Database vs Azure SQL Managed Instance',
    detail:
      'Azure SQL Database is more database-centric and managed, while Managed Instance is closer to full SQL Server instance compatibility for workloads that need broader instance-level behavior.',
  },
  {
    title: 'Azure SQL Database vs SQL Server on Azure Virtual Machines',
    detail:
      'SQL Server on Azure VMs provides maximum host and instance control, but Azure SQL Database removes much of the infrastructure and HA backup burden through its managed platform model.',
  },
  {
    title: 'Azure SQL Database vs Azure Cosmos DB',
    detail:
      'Azure SQL Database is relational and transaction-oriented with SQL Server compatibility, while Cosmos DB is a distributed operational database platform optimized for different data models and scale assumptions.',
  },
  {
    title: 'Azure SQL Database vs PostgreSQL or MySQL managed services',
    detail:
      'Azure SQL Database is the natural managed choice when SQL Server compatibility, T-SQL, and Microsoft ecosystem integration matter more than open-source engine alignment.',
  },
]

const designPatterns = [
  {
    title: 'SaaS tenant fleet with elastic pools',
    detail:
      'Place many smaller tenant databases in pools when usage peaks differ by tenant and isolated single-database sizing would waste money.',
  },
  {
    title: 'Mission-critical OLTP with Business Critical and zone redundancy',
    detail:
      'Use Business Critical for latency-sensitive transactional workloads that justify higher cost for stronger local architecture and resilience posture.',
  },
  {
    title: 'Intermittent departmental workload with serverless',
    detail:
      'Use serverless where the database truly spends time idle and can benefit from auto-pause and elastic compute rather than constant provisioned capacity.',
  },
  {
    title: 'Large rapidly growing application database on Hyperscale',
    detail:
      'Choose Hyperscale when storage growth, restore expectations, or scale characteristics exceed what simpler tiers handle comfortably.',
  },
  {
    title: 'Cross-region application continuity with failover groups',
    detail:
      'Pair primary and secondary databases through failover groups when the application needs managed cross-region failover behavior rather than only local HA.',
  },
]

const operationalChecklist = [
  'Choose single database versus elastic pool based on workload concurrency and tenant economics, not naming convenience.',
  'Validate service tier against latency, storage growth, and continuity requirements before provisioning at scale.',
  'Use Query Store and performance insights as normal operations tools rather than only incident tools.',
  'Define backup retention, restore testing, and regional recovery objectives explicitly.',
  'Prefer Entra authentication, private endpoints, and least-privilege access over broad public SQL logins.',
  'Review whether serverless really matches the workload before assuming it is the cheapest option.',
  'Plan failover groups or geo-replication together with application routing and connection behavior.',
  'Monitor pool saturation, top queries, storage growth, and blocking as part of standard database operations.',
]

const pitfalls = [
  'Treating Azure SQL Database like a managed VM and expecting instance-level SQL Server behavior everywhere.',
  'Putting consistently hot databases into elastic pools that are better suited for burst-sharing fleets.',
  'Choosing serverless for always-on workloads and then being surprised by little savings or changed latency behavior.',
  'Ignoring Query Store and then tuning performance from anecdotes instead of evidence.',
  'Assuming built-in HA alone satisfies cross-region disaster recovery objectives.',
  'Leaving databases broadly reachable over public endpoints when private connectivity is feasible.',
  'Choosing Hyperscale because it sounds bigger rather than because the workload truly needs it.',
]

const examples: ExampleSection[] = [
  {
    id: 'example-create-db',
    title: 'Azure CLI Example for Creating a vCore General Purpose Database',
    code: `
az sql server create \
  --resource-group rg-data-prod \
  --name sql-prod-app \
  --location eastus \
  --admin-user sqladmin \
  --admin-password "<StrongPassword>"

az sql db create \
  --resource-group rg-data-prod \
  --server sql-prod-app \
  --name appdb \
  --edition GeneralPurpose \
  --family Gen5 \
  --capacity 4 \
  --zone-redundant true \
  --backup-storage-redundancy Geo
`,
    explanation:
      'This shows the control-plane split between the logical server and the database. In production, identity, firewall, private endpoint, and Entra configuration should follow immediately rather than leaving the database in a broad default posture.',
  },
  {
    id: 'example-elastic-pool',
    title: 'Azure CLI Example for an Elastic Pool with Tenant Databases',
    code: `
az sql elastic-pool create \
  --resource-group rg-saas \
  --server sql-saas-prod \
  --name tenants-pool \
  --edition GeneralPurpose \
  --family Gen5 \
  --capacity 8 \
  --db-min-capacity 0.5 \
  --db-max-capacity 4

az sql db create \
  --resource-group rg-saas \
  --server sql-saas-prod \
  --elastic-pool tenants-pool \
  --name tenant-1042
`,
    explanation:
      'Elastic pools are most effective when many databases have bursty usage that does not peak simultaneously. They are less effective when one or a few tenants dominate the shared budget continuously.',
  },
  {
    id: 'example-auto-failover',
    title: 'T-SQL and Conceptual Pattern for Connection Resilience',
    code: `
-- Application-facing database code still uses normal T-SQL.
SELECT TOP (50)
  CustomerId,
  SUM(TotalAmount) AS Revenue
FROM dbo.Orders
WHERE OrderDate >= DATEADD(day, -30, SYSUTCDATETIME())
GROUP BY CustomerId
ORDER BY Revenue DESC;

# Application-side connection strategy
# 1. Use retry-aware SQL client libraries
# 2. Prefer failover group listener endpoints for regional continuity
# 3. Keep transactions short to reduce retry pain during failover
`,
    explanation:
      'Database continuity is not only a server feature. Client retry behavior, listener endpoints, and transaction design all affect how gracefully the application survives transient disruption or failover.',
  },
  {
    id: 'example-query-store',
    title: 'T-SQL Example for Query Store-Oriented Performance Review',
    code: `
SELECT TOP (20)
  q.query_id,
  qt.query_sql_text,
  rs.avg_duration,
  rs.avg_cpu_time,
  rs.count_executions
FROM sys.query_store_query_text AS qt
JOIN sys.query_store_query AS q
  ON qt.query_text_id = q.query_text_id
JOIN sys.query_store_plan AS p
  ON q.query_id = p.query_id
JOIN sys.query_store_runtime_stats AS rs
  ON p.plan_id = rs.plan_id
ORDER BY rs.avg_duration DESC;
`,
    explanation:
      'Azure SQL Database performance work is usually better when driven by Query Store evidence rather than by guesswork. The exact query used in production may differ, but the habit of inspecting workload history is the important point.',
  },
]

const glossaryTerms = [
  {
    term: 'Logical Server',
    definition:
      'The Azure SQL Database management boundary that groups databases, firewall rules, Entra admin configuration, and related server-level settings.',
  },
  {
    term: 'Elastic Pool',
    definition:
      'A shared compute model where multiple databases draw from a common performance budget rather than each carrying isolated capacity.',
  },
  {
    term: 'DTU',
    definition:
      'A bundled performance abstraction combining compute, memory, and IO characteristics in older Azure SQL Database sizing models.',
  },
  {
    term: 'vCore',
    definition:
      'A purchasing model that exposes compute more directly and aligns with major service tiers such as General Purpose, Business Critical, and Hyperscale.',
  },
  {
    term: 'Hyperscale',
    definition:
      'An Azure SQL Database service tier designed for very large databases and fast scaling with a distinct compute and storage architecture.',
  },
  {
    term: 'Serverless',
    definition:
      'A compute model that can scale automatically within bounds and auto-pause in supported scenarios when a workload becomes idle.',
  },
  {
    term: 'Query Store',
    definition:
      'A built-in feature that stores query history, plans, and runtime statistics to support performance analysis and tuning.',
  },
  {
    term: 'Failover Group',
    definition:
      'A managed cross-region continuity feature that groups databases and provides listener endpoints for failover workflows.',
  },
  {
    term: 'Point-in-Time Restore',
    definition:
      'Recovery of a database to a chosen point within the automated backup retention window.',
  },
  {
    term: 'Zone Redundancy',
    definition:
      'A deployment option in supported tiers that spreads availability across Azure availability zones within a region.',
  },
]

const pageSources = [
  'https://learn.microsoft.com/en-us/azure/azure-sql/database/sql-database-paas-overview',
  'https://learn.microsoft.com/en-us/azure/azure-sql/database/service-tiers-sql-database-vcore',
  'https://learn.microsoft.com/en-us/azure/azure-sql/database/service-tiers-general-purpose-business-critical',
  'https://learn.microsoft.com/en-us/azure/azure-sql/database/service-tier-hyperscale',
  'https://learn.microsoft.com/en-us/azure/azure-sql/database/serverless-tier-overview',
  'https://learn.microsoft.com/en-us/azure/azure-sql/database/elastic-pool-overview',
  'https://learn.microsoft.com/en-us/azure/azure-sql/database/high-availability-sla-local-zone-redundancy',
  'https://learn.microsoft.com/en-us/azure/azure-sql/database/auto-failover-group-sql-db',
  'https://learn.microsoft.com/en-us/azure/azure-sql/database/active-geo-replication-overview',
  'https://learn.microsoft.com/en-us/azure/azure-sql/database/automatic-tuning-overview',
  'https://learn.microsoft.com/en-us/azure/azure-sql/database/query-performance-insight-use',
  'https://learn.microsoft.com/en-us/azure/azure-sql/database/private-endpoint-overview',
  'https://learn.microsoft.com/en-us/azure/azure-sql/database/transparent-data-encryption-tde-overview',
  'https://learn.microsoft.com/en-us/azure/well-architected/service-guides/azure-sql-database',
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
    { id: 'bp-model', label: 'Operating Model' },
    { id: 'bp-fit', label: 'When to Use It' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-model', label: 'Logical Model' },
    { id: 'core-purchasing', label: 'DTU and vCore' },
    { id: 'core-tiers', label: 'Service Tiers' },
    { id: 'core-serverless', label: 'Serverless' },
    { id: 'core-hyperscale', label: 'Hyperscale' },
    { id: 'core-performance', label: 'Performance and Tuning' },
    { id: 'core-ha-dr', label: 'High Availability and DR' },
    { id: 'core-backup-restore', label: 'Backup and Restore' },
    { id: 'core-security', label: 'Security' },
    { id: 'core-networking', label: 'Networking' },
    { id: 'core-migration', label: 'Migration and Options' },
    { id: 'core-ops', label: 'Operations' },
    { id: 'core-cost', label: 'Cost' },
    { id: 'core-compare', label: 'Compare and Contrast' },
    { id: 'core-patterns', label: 'Design Patterns' },
    { id: 'core-ops-checklist', label: 'Operational Checklist' },
    { id: 'core-pitfalls', label: 'Common Pitfalls' },
  ],
  examples: examples.map((example) => ({ id: example.id, label: example.title })),
  glossary: [
    { id: 'glossary-terms', label: 'Terms' },
    { id: 'glossary-sources', label: 'Primary Sources' },
  ],
}

function isTabId(value: string | null): value is TabId {
  return (
    value === 'big-picture' ||
    value === 'core-concepts' ||
    value === 'examples' ||
    value === 'glossary'
  )
}

function getTabFromSearch(search: string): TabId {
  const tab = new URLSearchParams(search).get('tab')
  return isTabId(tab) ? tab : 'big-picture'
}

const win98HelpStyles = `
.azure-sql-database-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.azure-sql-database-help-page .win98-window {
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

.azure-sql-database-help-page .win98-titlebar {
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

.azure-sql-database-help-page .win98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.azure-sql-database-help-page .win98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.azure-sql-database-help-page .win98-control {
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

.azure-sql-database-help-page .win98-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
}

.azure-sql-database-help-page .win98-tab {
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

.azure-sql-database-help-page .win98-tab.active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.azure-sql-database-help-page .win98-main {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  flex: 1;
  min-height: 0;
  border-top: 1px solid #404040;
  background: #ffffff;
}

.azure-sql-database-help-page .win98-toc {
  overflow: auto;
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
}

.azure-sql-database-help-page .win98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.azure-sql-database-help-page .win98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}
.azure-sql-database-help-page .win98-toc-list li {
  margin: 0 0 8px;
}

.azure-sql-database-help-page .win98-toc-list a {
  color: #000000;
  font-size: 12px;
  text-decoration: none;
}

.azure-sql-database-help-page .win98-content {
  overflow-x: auto;
  overflow-y: scroll;
  scrollbar-gutter: stable;
  padding: 14px 20px 20px;
}

.azure-sql-database-help-page .win98-doc-title {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 700;
}

.azure-sql-database-help-page .win98-doc-subtitle {
  margin: 0 0 12px;
  font-size: 12px;
  font-weight: 700;
}

.azure-sql-database-help-page .win98-section {
  margin: 0 0 22px;
}

.azure-sql-database-help-page .win98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.azure-sql-database-help-page .win98-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.azure-sql-database-help-page .win98-content p,
.azure-sql-database-help-page .win98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.azure-sql-database-help-page .win98-content p {
  margin: 0 0 10px;
}

.azure-sql-database-help-page .win98-content ul,
.azure-sql-database-help-page .win98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.azure-sql-database-help-page .win98-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.azure-sql-database-help-page .win98-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.azure-sql-database-help-page .win98-codebox code {
  display: block;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
}

.azure-sql-database-help-page .win98-inline-link {
  color: #000080;
}

@media (max-width: 900px) {
  .azure-sql-database-help-page .win98-main {
    grid-template-columns: 1fr;
  }

  .azure-sql-database-help-page .win98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .azure-sql-database-help-page .win98-title-text {
    position: static;
    transform: none;
    margin-left: 8px;
    font-size: 14px;
  }
}
`

export default function AzureSqlDatabasePage(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const contentRef = useRef<HTMLElement | null>(null)
  const [activeTab, setActiveTab] = useState<TabId>(() => getTabFromSearch(location.search))

  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? 'The Big Picture'

  useEffect(() => {
    const url = new URL(window.location.href)
    const nextSearch = new URLSearchParams(url.search)
    const shouldClearHash = url.hash.length > 0
    if (nextSearch.get('tab') !== activeTab || shouldClearHash) {
      nextSearch.set('tab', activeTab)
      window.history.replaceState(
        window.history.state,
        '',
        `${url.pathname}?${nextSearch.toString()}`,
      )
    }
    document.title = `${pageTitle} (${activeTabLabel})`
  }, [activeTab, activeTabLabel])

  useEffect(() => {
    const currentHash = window.location.hash.slice(1)
    if (!currentHash) {
      return
    }

    const container = contentRef.current
    const target = document.getElementById(currentHash)
    if (!container || !target || !container.contains(target)) {
      return
    }

    container.scrollTo({ top: Math.max(target.offsetTop - 8, 0), left: 0, behavior: 'auto' })
  }, [activeTab])

  const handleTabChange = (tabId: TabId) => {
    if (tabId === activeTab) {
      return
    }

    setActiveTab(tabId)
    contentRef.current?.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }

  const handleSectionJump = (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    event.preventDefault()

    const container = contentRef.current
    const target = document.getElementById(sectionId)
    if (!container || !target || !container.contains(target)) {
      return
    }

    container.scrollTo({ top: Math.max(target.offsetTop - 8, 0), left: 0, behavior: 'auto' })

    const url = new URL(window.location.href)
    window.history.replaceState(
      window.history.state,
      '',
      `${url.pathname}${url.search}#${sectionId}`,
    )
  }

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
    <div className="azure-sql-database-help-page">
      <style>{win98HelpStyles}</style>
      <div className="win98-window" role="presentation">
        <header className="win98-titlebar">
          <span className="win98-title-text">{pageTitle}</span>
          <div className="win98-title-controls">
            <button
              className="win98-control"
              type="button"
              aria-label="Minimize"
              onClick={handleMinimize}
            >
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
              onClick={() => handleTabChange(tab.id)}
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
                  <a
                    href={`#${section.id}`}
                    onClick={(event) => handleSectionJump(event, section.id)}
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <main ref={contentRef} className="win98-content">
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

                <section id="bp-model" className="win98-section">
                  <h2 className="win98-heading">Operating Model</h2>
                  {operatingModelGuide.map((item) => (
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

                <section id="core-compare" className="win98-section">
                  <h2 className="win98-heading">Compare and Contrast</h2>
                  {compareNotes.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

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
                    This content was compiled from official Microsoft Learn documentation current as
                    checked on March 13, 2026. Azure SQL Database features, tier behavior,
                    networking, and reliability guidance can change, so production decisions should
                    always be revalidated against the current documentation.
                  </p>
                  <ul>
                    {pageSources.map((source) => (
                      <li key={source}>
                        <a
                          href={source}
                          className="win98-inline-link"
                          target="_blank"
                          rel="noreferrer"
                        >
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
