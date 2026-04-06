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

const pageTitle = 'Azure Blob Storage'
const pageSubtitle =
  'Object storage on Azure for unstructured data, archives, media, backups, analytics, and application file content.'

const introParagraphs = [
  "Azure Blob Storage is Microsoft's object storage service for the cloud. It is built for storing massive amounts of unstructured data such as documents, images, logs, backups, media, dataset files, and application-generated objects. The service is optimized for durability, broad API access, tiered storage economics, and integration with the rest of Azure rather than for traditional POSIX file-server semantics by default.",
  'The most important mental model is that Blob Storage is object storage, not a normal disk and not a classic shared file server. You store blobs inside containers inside a storage account, address them over HTTP or HTTPS, and use APIs, SDKs, identities, lifecycle policies, and redundancy settings to shape how the data behaves. If you treat it like a regular hierarchical file system without understanding the storage model, design mistakes appear quickly.',
  'This page treats Azure Blob Storage as a platform and architecture topic: storage accounts, containers, block/append/page blobs, access tiers, lifecycle policies, redundancy, versioning, soft delete, immutability, authorization, network controls, Azure Data Lake Storage Gen2 and hierarchical namespace, SFTP and NFS support, cost controls, and the design tradeoffs that usually determine whether Blob Storage is the right data boundary.',
]

const bigPictureSections: Array<{ title: string; paragraphs: string[] }> = [
  {
    title: 'What it is',
    paragraphs: [
      "Azure Blob Storage is Azure's object storage solution. It stores arbitrary data objects in a massively scalable, highly durable service exposed through REST APIs, SDKs, tools like AzCopy, and surrounding integrations across Azure and third-party systems. A blob is the fundamental object; a container groups blobs; a storage account is the administrative and billing boundary around the service.",
      'Blob Storage is a foundation service, not a narrow feature. It underpins backups, static content, media pipelines, analytics landing zones, internal package flows, machine learning datasets, log retention, and many application upload scenarios. It is often one of the most widely used data services in Azure because so many systems eventually need durable object storage.',
    ],
  },
  {
    title: 'Why teams use it',
    paragraphs: [
      'Teams use Blob Storage when they need durable storage for large volumes of unstructured data with cost controls and simple HTTP-based access. It is a strong fit for content repositories, backups, restore points, archive data, logs, application uploads, media streaming, and ingestion pipelines where file-like data must be stored reliably but not necessarily mounted like a classic network share.',
      'It is also central to analytics and lakehouse patterns. When hierarchical namespace is enabled, the same underlying storage account can support Azure Data Lake Storage Gen2 semantics, bringing directory-aware operations and analytics-friendly behaviors while still sitting on Blob Storage foundations.',
    ],
  },
  {
    title: 'How to think about it',
    paragraphs: [
      'Think in layers. The storage account is the main operational boundary. Containers organize blob collections and often represent app domains, tenants, datasets, or retention boundaries. Individual blobs are addressed by name and can be protected, versioned, tiered, copied, replicated, locked, or deleted according to account and container configuration. The architecture is not just where the file lands; it is how the surrounding policies shape that object over time.',
      'The biggest design questions are usually not can Blob Storage hold the data. It almost always can. The real questions are how the data should be authorized, whether the namespace should be hierarchical, which redundancy option fits the resilience target, which access tier matches usage patterns, whether versioning or immutability is needed, and whether the workload really wants object storage rather than Azure Files, disks, a database, or a managed analytics store.',
    ],
  },
  {
    title: 'Core object model',
    paragraphs: [
      'The service hierarchy is storage account, then container, then blob. Blob names are part of the URI and can embed slash-delimited path segments. Without hierarchical namespace, those slashes create virtual directory conventions only. With hierarchical namespace enabled, directories become concrete filesystem-like objects with atomic directory operations.',
      'Blob Storage supports block blobs, append blobs, and page blobs. Block blobs are the normal choice for most application and content storage. Append blobs are optimized for append-heavy patterns such as logging. Page blobs are specialized for random-access scenarios such as virtual hard disks and are closely tied to VM-related storage patterns.',
    ],
  },
  {
    title: 'What changed recently',
    paragraphs: [
      "Several current platform details matter for architecture today. Microsoft's latest access-tier docs include hot, cool, cold, and archive tiers for standard blob data. The current redundancy guidance also highlights supported combinations for GPv2 and premium block blob accounts, and the latest docs continue recommending Microsoft Entra ID with managed identities over Shared Key authorization whenever possible.",
      'Blob Storage also continues to expand protocol and governance features. Current Microsoft documentation covers SFTP support, NFS 3.0 support, version-level immutability, lifecycle management, and multi-protocol access in ADLS Gen2 accounts. Those are not edge capabilities anymore; they affect real design decisions for modern storage platforms.',
    ],
  },
]

const operatingModelGuide = [
  {
    title: 'Storage account is the primary boundary',
    detail:
      'Account type, region, redundancy, namespace mode, networking, and identity controls are decided at the storage-account layer.',
  },
  {
    title: 'Container is the common organizational boundary',
    detail:
      'Containers are where teams often separate applications, tenants, environments, retention rules, or access-control scopes.',
  },
  {
    title: 'Blob type matters',
    detail:
      'Block blobs are the default for most objects, append blobs suit append-only write patterns, and page blobs fit random-access or VHD-like scenarios.',
  },
  {
    title: 'Tiering is part of the design, not an afterthought',
    detail:
      'Hot, cool, cold, and archive tiers change storage economics and retrieval behavior significantly, so lifecycle and restore expectations must be planned upfront.',
  },
  {
    title: 'Flat versus hierarchical namespace changes semantics',
    detail:
      'Enabling hierarchical namespace makes the account suitable for Data Lake Storage Gen2 workloads and changes directory behavior, APIs, and some feature considerations.',
  },
]

const fitGuide = [
  {
    title: 'Need durable object storage for uploads, backups, datasets, media, or logs',
    choice: 'Azure Blob Storage is a strong fit.',
  },
  {
    title: 'Need analytics-friendly storage with directory semantics',
    choice: 'Use Blob Storage with hierarchical namespace enabled for ADLS Gen2 scenarios.',
  },
  {
    title: 'Need a normal SMB file share mounted by many clients',
    choice: 'Azure Files may be a better fit than Blob Storage.',
  },
  {
    title: 'Need low-latency relational queries over structured records',
    choice: 'A database or analytical store is usually a better fit than raw blobs.',
  },
  {
    title: 'Need long-term low-cost retention with infrequent access',
    choice: 'Blob tiers and lifecycle rules are specifically built for that pattern.',
  },
  {
    title:
      'Need protocol flexibility such as REST, SDK, SFTP, NFS, or analytics engines on the same data',
    choice: 'Blob Storage can fit well, especially with the right account configuration.',
  },
]

const keyTakeaways = [
  'Blob Storage is object storage, not a normal disk or traditional file server.',
  'Storage account settings such as redundancy, namespace mode, networking, and authorization shape the real behavior of the platform.',
  'Block blobs are the normal default; append and page blobs are specialized tools.',
  'Versioning, soft delete, lifecycle management, and immutability should be designed together instead of enabled randomly.',
  'Microsoft recommends Microsoft Entra ID and managed identities over Shared Key authorization whenever possible.',
]

const coreConceptSections: NarrativeSection[] = [
  {
    id: 'core-accounts',
    heading: 'Storage Accounts, Account Kinds, and the Real Administrative Boundary',
    paragraphs: [
      'The storage account is the main Azure resource boundary for Blob Storage. Region, redundancy, networking rules, namespace mode, public access defaults, identity behavior, and many feature decisions are made here. This is why account design matters so much. A weak account boundary leads to mixed security models, unclear ownership, and lifecycle conflicts between unrelated datasets.',
      'For most modern blob workloads, General Purpose v2 accounts are the default. Premium block blob accounts exist for performance-sensitive scenarios with different characteristics, and account type choices influence which tiering and replication options are available. You do not design Blob Storage only by container names; you design it first by account purpose and policy.',
      'The practical rule is to separate storage accounts when security posture, environment, ownership, retention, performance profile, or namespace semantics differ materially. If two datasets should not share network exposure, replication choice, or account-wide operational settings, they probably should not live in the same account.',
    ],
  },
  {
    id: 'core-containers',
    heading: 'Containers, Naming, and Multi-Tenant Organization',
    paragraphs: [
      'Containers are the top-level data grouping inside an account. Teams often map them to applications, tenants, ingestion zones, content domains, or data classifications. Container structure becomes especially important when SAS delegation, lifecycle policy targeting, legal hold practices, or application ownership lines differ.',
      'Good container design avoids both extremes. One giant container for everything creates governance and retention confusion. A huge explosion of tiny containers can make administration, inventory, and policy reasoning harder than necessary. The better pattern is a small number of purposeful containers with clear ownership and naming discipline.',
      'Blob names inside containers carry more design weight than many teams expect. Naming conventions affect listing behavior, pseudo-directory grouping, partition patterns, and operational discoverability. In practice, naming strategy is part of storage architecture, not a cosmetic afterthought.',
    ],
  },
  {
    id: 'core-blob-types',
    heading: 'Block Blobs, Append Blobs, and Page Blobs',
    paragraphs: [
      'Block blobs are the standard object type for most workloads. Documents, images, archives, exports, model files, backups, and application uploads normally belong here. The service is optimized around block-blob usage patterns, which is why they are the right default unless a different write model is truly needed.',
      'Append blobs are optimized for append-only writes. They are useful for log-style patterns where writers add data sequentially and do not need arbitrary random overwrites. They are not the normal default for generic file content; they are a specialized object type for a narrower behavior profile.',
      'Page blobs are optimized for frequent random reads and writes in aligned pages and are used heavily in VM disk scenarios. They exist in Blob Storage, but most application teams working with content or datasets will spend nearly all their time with block blobs instead.',
    ],
  },
  {
    id: 'core-tiers',
    heading: 'Access Tiers, Rehydration, and Lifecycle Management',
    paragraphs: [
      'Blob Storage economics are strongly influenced by access tier. Microsoft documents hot, cool, cold, and archive tiers for standard blob data. Hot is optimized for frequently accessed data. Cool and cold reduce storage cost for less frequently accessed data at the expense of access pricing and minimum-retention expectations. Archive is the deepest low-cost retention tier and requires rehydration before normal access.',
      'The architectural mistake is choosing a tier only by raw storage price. Retrieval charges, early deletion penalties, restore timing, and operational urgency all matter. Data that must be restored instantly for a production workflow should not be treated like deep archive just because the storage line item looks cheaper.',
      'Lifecycle management is where tiering becomes truly useful. Instead of leaving objects in one tier forever, teams define rules based on age, last modification, version state, or deletion criteria. Done well, this turns Blob Storage into an automatically cost-optimizing platform rather than a static bucket of increasingly expensive retained data.',
    ],
  },
  {
    id: 'core-redundancy',
    heading: 'Durability, Redundancy, and Replication Choices',
    paragraphs: [
      'Redundancy is one of the most important storage-account decisions. Microsoft documents options such as locally redundant storage, zone-redundant storage, geo-redundant storage, and geo-zone-redundant storage, with read-access variants in some cases. These choices influence durability, regional resilience, recovery posture, and cost.',
      'The right option depends on what failure you are trying to survive. LRS protects within a datacenter scope. ZRS adds zonal resilience inside a region. GRS and GZRS add asynchronous replication to a secondary region. None of these are merely pricing toggles; they express a recovery design and a tolerance for regional failure modes.',
      'Replication design also has application implications. Geo-redundant copies are asynchronous, so they are not a zero-data-loss guarantee. If the business requires strict cross-region recovery guarantees, you must design for that reality rather than assuming the redundancy acronym alone solves it.',
    ],
  },
  {
    id: 'core-security',
    heading: 'Authorization, Shared Access Signatures, Entra ID, and Least Privilege',
    paragraphs: [
      "Azure Blob Storage authorization can be built around Microsoft Entra ID, managed identities, SAS tokens, account keys, and public access settings. Microsoft's current guidance recommends Microsoft Entra ID with managed identities for blob access whenever possible, because it avoids broad long-lived shared secrets and fits modern least-privilege patterns much better than Shared Key.",
      'SAS remains useful, but it should be used carefully. A SAS token is delegated power. If it is too broad, too long-lived, or not traceable to a clear workflow, it becomes a quiet data-exfiltration risk. Mature teams scope SAS by resource, operation, and time, and prefer user delegation SAS where appropriate instead of account-wide secret patterns.',
      'Public access, anonymous reads, and Shared Key usage should be conscious decisions. Blob Storage is often the place where data quietly becomes too open because someone needed a quick integration. The safe default is private data, Entra-based access, and only the minimum delegation required for the workload.',
    ],
  },
  {
    id: 'core-networking',
    heading: 'Network Controls, Private Endpoints, and Data Exfiltration Boundaries',
    paragraphs: [
      'Blob Storage is an internet-addressable service by default, but that does not mean it should remain open to every network path. Storage firewalls, private endpoints, trusted-service exceptions, and virtual network rules are central to real production design. These controls often matter just as much as RBAC because they constrain where data can be reached from at all.',
      'Private endpoints are especially important for sensitive data and enterprise network architectures. They let clients access the storage account through a private IP in a virtual network, reducing public exposure and improving control over routing and name resolution. However, once private endpoints are involved, DNS design becomes part of the architecture and cannot be hand-waved away.',
      'Good storage security thinks about exfiltration, not only access. It is not enough to ask who can read the blobs. You also need to ask from where, through which protocols, and under what network paths those reads can occur.',
    ],
  },
  {
    id: 'core-protection',
    heading: 'Versioning, Soft Delete, Snapshots, and Immutability',
    paragraphs: [
      'Blob data protection is multi-layered. Versioning preserves prior blob states when objects are overwritten. Soft delete protects deleted blobs and containers for a retention period. Snapshots capture point-in-time copies. Immutability policies and legal holds prevent changes or deletion for governance or compliance needs. These are separate controls with different purposes, and strong designs use them deliberately rather than piling them on randomly.',
      'Versioning and soft delete are especially useful for human error and application mistakes. They are a practical safety net for accidental deletes and overwrites. But they also affect cost, listing behavior, restore logic, and lifecycle design, so they should be enabled with a plan for how old versions are managed over time.',
      'Immutability is different. It is about preventing change, often for compliance, legal, or ransomware-resilience goals. Microsoft documents version-level WORM capabilities and related immutable-policy patterns. Once immutability is part of the design, operational procedures must account for the fact that the data may not be easily changeable even by administrators.',
    ],
  },
  {
    id: 'core-adls',
    heading: 'Hierarchical Namespace and Azure Data Lake Storage Gen2',
    paragraphs: [
      'Azure Data Lake Storage Gen2 is Blob Storage with hierarchical namespace enabled. This changes the semantics of directories and enables file-system style operations needed by many analytics engines and big-data tools. Directory renames and ACL-oriented operations become meaningful objects instead of virtual naming conventions only.',
      'This matters because the namespace mode is not a tiny option. It changes how the account behaves and which data platform patterns it supports cleanly. If the workload is really an analytics landing zone, a lakehouse foundation, or a multi-engine data-processing environment, hierarchical namespace is often the right default from the beginning.',
      'At the same time, not every blob workload needs HNS. Simple content repositories, media stores, application uploads, and archive systems may work perfectly well with flat namespace accounts. The key is choosing based on real access semantics rather than enabling HNS just because it sounds more advanced.',
    ],
  },
  {
    id: 'core-protocols',
    heading: 'REST, SDKs, AzCopy, SFTP, NFS, and Multi-Protocol Access',
    paragraphs: [
      'Blob Storage is primarily an HTTP API service, and most application access happens through REST or Azure SDKs. AzCopy exists for high-performance data movement and is one of the most important operational tools in the platform for bulk transfer, sync, and migration scenarios.',
      'Blob Storage also supports additional protocol models in some scenarios. Microsoft documents SFTP support and NFS 3.0 support for certain storage-account configurations. These capabilities are useful when legacy tools, batch pipelines, or partner integrations need file-transfer semantics without redesigning everything around custom API calls.',
      'Multi-protocol access is powerful, but it increases design complexity. Once one dataset is accessed through analytics engines, REST clients, SFTP, and possibly NFS, you need strong naming, permission, and mutation rules so those different access paths do not create operational confusion.',
    ],
  },
  {
    id: 'core-performance',
    heading: 'Performance, Request Patterns, and Large-Scale Data Movement',
    paragraphs: [
      'Blob Storage scales very well, but performance still depends on workload shape. Request concurrency, object size distribution, listing behavior, partitioning-by-name patterns, parallel uploads, client retries, and network locality all influence real-world throughput. A design can be theoretically scalable and still perform poorly if the client behavior is inefficient.',
      'Large transfers should use parallelism consciously and often benefit from AzCopy or tuned SDK settings rather than naive single-stream uploads. Likewise, hot-path application downloads should be paired with CDN, caching, or downstream delivery architecture when latency and fan-out matter.',
      'Performance planning also includes understanding tier effects. Archive and colder tiers are intentionally not optimized for instant operational retrieval. If your access pattern is latency-sensitive, tier choice and request path matter more than many teams initially assume.',
    ],
  },
  {
    id: 'core-cost',
    heading: 'Cost, Inventory Drift, and Storage Governance',
    paragraphs: [
      'Blob Storage cost is shaped by more than gigabytes. Capacity, access tier, redundancy, read and write operations, data retrieval, replication, private endpoints, SFTP usage, versioning, soft-delete retention, and lifecycle inefficiency all affect the bill. Cheap object storage becomes less cheap when old versions accumulate indefinitely or archive data is rehydrated repeatedly for operational tasks.',
      'The biggest long-term cost problem is governance drift. Teams store everything forever, never classify data, and leave backup copies, old versions, staging exports, and duplicated datasets in hot storage because nobody owns cleanup. Blob Storage is economically powerful when lifecycle policy and ownership exist. Without them, it quietly becomes expensive entropy.',
      'Cost discipline comes from tagging, container purpose clarity, lifecycle automation, periodic inventory review, and knowing which datasets are operational, analytical, archival, or disposable. Those categories should not all have the same retention and tiering model.',
    ],
  },
]

const designPatterns = [
  {
    title: 'Private-by-default storage accounts',
    detail:
      'Treat blob data as private unless a deliberate publishing pattern requires public delivery, and use private endpoints or firewall rules for sensitive workloads.',
  },
  {
    title: 'Account boundaries by policy and ownership',
    detail:
      'Separate storage accounts when redundancy, environment, identity, analytics mode, or network boundaries differ meaningfully.',
  },
  {
    title: 'Lifecycle-managed tiering',
    detail:
      'Move objects automatically from hot to cooler tiers and eventually to archive or deletion based on age and usage instead of manual cleanup.',
  },
  {
    title: 'Versioning plus soft delete for operational safety',
    detail:
      'Use these as practical safeguards for overwrite and deletion errors, then pair them with policies to control long-term version sprawl.',
  },
  {
    title: 'Entra-based application access',
    detail:
      'Prefer managed identities and Microsoft Entra authorization over Shared Key for application and automation access to blob data.',
  },
  {
    title: 'Hierarchical namespace only when directory semantics matter',
    detail:
      'Enable HNS intentionally for analytics and data-lake workloads, not automatically for every account.',
  },
]

const operationalChecklist = [
  'Choose the storage-account boundary before creating containers and uploads.',
  'Select redundancy based on real failure and recovery objectives, not only price.',
  'Default to private access and strongly prefer Entra ID and managed identity over Shared Key.',
  'Decide whether hierarchical namespace is required before large-scale ingestion begins.',
  'Use lifecycle policies for tiering and cleanup instead of relying on human discipline.',
  'Plan versioning, soft delete, and immutability together so recovery and compliance settings do not conflict operationally.',
  'Use private endpoints and DNS planning for sensitive datasets that should not traverse public paths.',
  'Standardize container naming and blob prefix conventions for inventory and policy targeting.',
  'Test restore, undelete, and rehydration paths before claiming the storage design is production ready.',
  'Review old versions, stale containers, and hot-tier retention regularly to control cost drift.',
]

const compareNotes = [
  {
    title: 'Blob Storage vs Azure Files',
    detail:
      'Blob Storage is object storage for API-driven unstructured data. Azure Files is a managed file-share service with SMB and NFS semantics for traditional file sharing and mount-based workloads.',
  },
  {
    title: 'Blob Storage vs Managed Disks',
    detail:
      'Managed disks back virtual machines and deliver block-storage semantics. Blob Storage is an object service optimized for durable object access rather than mounted OS or database volumes.',
  },
  {
    title: 'Blob Storage vs ADLS Gen2',
    detail:
      'ADLS Gen2 is not a separate storage engine; it is Blob Storage with hierarchical namespace enabled and data-lake oriented semantics.',
  },
  {
    title: 'Blob Storage vs Database Storage',
    detail:
      'Blob Storage is excellent for durable objects, but not for relational queries, transactions over structured records, or application data that really belongs in a database.',
  },
  {
    title: 'Blob Storage vs CDN edge caching',
    detail:
      'Blob Storage holds the origin data. CDN and edge services improve global delivery performance for public content, but they do not replace the object store itself.',
  },
]

const pitfalls = [
  'Treating Blob Storage like a normal mounted filesystem without understanding object semantics.',
  'Putting unrelated datasets with different policies into one storage account because it was convenient initially.',
  'Using Shared Key everywhere and never migrating applications to Entra-based access.',
  'Leaving data in hot tier forever because nobody implemented lifecycle management.',
  'Enabling versioning and soft delete without any plan for version cleanup or storage-cost growth.',
  'Choosing archive for data that actually needs urgent operational retrieval.',
  'Assuming geo-redundancy means zero data loss even though replication is asynchronous.',
  'Ignoring private-endpoint DNS and then treating connectivity failures as random platform issues.',
  'Turning on hierarchical namespace without understanding why, or avoiding it when directory semantics are actually required.',
  'Using blob naming patterns that make list operations, tenant isolation, or lifecycle targeting hard to reason about.',
]

const examples: ExampleSection[] = [
  {
    id: 'ex-upload',
    title: 'Upload a file to a blob container with Azure CLI',
    code: `az storage blob upload \\
  --account-name stappcontentprod \\
  --container-name uploads \\
  --name invoices/2026/03/report.pdf \\
  --file .\\report.pdf \\
  --auth-mode login`,
    explanation:
      'This is the basic object-storage workflow: choose the account, container, and blob name, then upload through authenticated CLI access. Using `--auth-mode login` aligns with Entra-based access instead of embedding account keys in scripts.',
  },
  {
    id: 'ex-lifecycle',
    title: 'Lifecycle policy that cools and archives old blobs',
    code: `{
  "rules": [
    {
      "enabled": true,
      "name": "tier-and-delete-logs",
      "type": "Lifecycle",
      "definition": {
        "filters": {
          "blobTypes": ["blockBlob"],
          "prefixMatch": ["logs/"]
        },
        "actions": {
          "baseBlob": {
            "tierToCool": { "daysAfterModificationGreaterThan": 30 },
            "tierToArchive": { "daysAfterModificationGreaterThan": 180 },
            "delete": { "daysAfterModificationGreaterThan": 730 }
          }
        }
      }
    }
  ]
}`,
    explanation:
      'This shows the core cost-governance pattern: move data through cheaper tiers over time and eventually delete it automatically. The exact thresholds depend on business retention rules, but lifecycle management is what turns Blob Storage from passive retention into intentional storage operations.',
  },
  {
    id: 'ex-sas',
    title: 'Generate a short-lived read-only SAS for one blob',
    code: `az storage blob generate-sas \\
  --account-name stappcontentprod \\
  --container-name media \\
  --name videos/demo.mp4 \\
  --permissions r \\
  --expiry 2026-03-14T18:00Z \\
  --https-only \\
  --auth-mode login`,
    explanation:
      'A SAS token should delegate the smallest set of permissions for the shortest time possible. This example limits access to read only for a single object and enforces HTTPS, which is much safer than issuing broad container-wide or long-lived SAS tokens by default.',
  },
  {
    id: 'ex-azcopy',
    title: 'Bulk copy a local folder into a blob prefix with AzCopy',
    code: `azcopy copy "C:\\exports\\2026\\*" \\
  "https://stappcontentprod.blob.core.windows.net/exports/2026?<sas-token>" \\
  --recursive=true`,
    explanation:
      'AzCopy is one of the most important operational tools for Blob Storage. It is built for high-throughput movement of many objects and is often preferable to custom one-off scripts when migrating or syncing data at scale.',
  },
]

const glossaryTerms = [
  {
    term: 'Storage Account',
    definition:
      'The top-level Azure resource boundary for Blob Storage configuration, billing, networking, redundancy, and many feature settings.',
  },
  {
    term: 'Container',
    definition:
      'A top-level grouping of blobs inside a storage account, commonly used as an organizational and policy boundary.',
  },
  {
    term: 'Block Blob',
    definition:
      'The default blob type for most unstructured content such as documents, media, backups, and application uploads.',
  },
  {
    term: 'Append Blob',
    definition:
      'A blob type optimized for append-only write patterns such as certain logging workflows.',
  },
  {
    term: 'Page Blob',
    definition:
      'A blob type optimized for random read and write patterns, commonly used for virtual hard disk scenarios.',
  },
  {
    term: 'Hierarchical Namespace',
    definition:
      'A storage-account mode that adds directory-aware semantics and enables Azure Data Lake Storage Gen2 behaviors.',
  },
  {
    term: 'Access Tier',
    definition:
      'The pricing and retrieval class for blob data such as hot, cool, cold, or archive.',
  },
  {
    term: 'Rehydration',
    definition:
      'The process of bringing archived blob data back into an online tier so it can be accessed normally.',
  },
  {
    term: 'SAS',
    definition:
      'Shared Access Signature, a delegated token that grants time-scoped permissions to storage resources.',
  },
  {
    term: 'User Delegation SAS',
    definition:
      'A SAS signed with Microsoft Entra credentials for blob access rather than the storage account key.',
  },
  {
    term: 'Soft Delete',
    definition:
      'A retention feature that preserves deleted blobs or containers for a period so they can be restored.',
  },
  {
    term: 'Immutability Policy',
    definition:
      'A retention control that prevents modification or deletion of protected blob data for a defined period or under legal hold.',
  },
]

const pageSources = [
  'https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-introduction',
  'https://learn.microsoft.com/en-us/azure/storage/common/storage-account-overview',
  'https://learn.microsoft.com/en-us/azure/storage/common/storage-redundancy',
  'https://learn.microsoft.com/en-us/azure/storage/blobs/access-tiers-overview',
  'https://learn.microsoft.com/en-us/azure/storage/blobs/lifecycle-management-overview',
  'https://learn.microsoft.com/en-us/azure/storage/blobs/versioning-overview',
  'https://learn.microsoft.com/en-us/azure/storage/blobs/soft-delete-blob-overview',
  'https://learn.microsoft.com/en-us/azure/storage/blobs/immutable-policy-configure-version-scope',
  'https://learn.microsoft.com/en-us/azure/storage/blobs/data-lake-storage-namespace',
  'https://learn.microsoft.com/en-us/azure/storage/blobs/authorize-access-azure-active-directory',
  'https://learn.microsoft.com/en-us/azure/storage/common/storage-network-security',
  'https://learn.microsoft.com/en-us/azure/storage/blobs/secure-file-transfer-protocol-support',
  'https://learn.microsoft.com/en-us/azure/storage/blobs/network-file-system-protocol-support',
  'https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azcopy-v10',
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
    { id: 'core-accounts', label: 'Accounts' },
    { id: 'core-containers', label: 'Containers' },
    { id: 'core-blob-types', label: 'Blob Types' },
    { id: 'core-tiers', label: 'Access Tiers' },
    { id: 'core-redundancy', label: 'Redundancy' },
    { id: 'core-security', label: 'Authorization' },
    { id: 'core-networking', label: 'Networking' },
    { id: 'core-protection', label: 'Protection Features' },
    { id: 'core-adls', label: 'ADLS Gen2' },
    { id: 'core-protocols', label: 'Protocols and Tools' },
    { id: 'core-performance', label: 'Performance' },
    { id: 'core-cost', label: 'Cost' },
    { id: 'core-compare', label: 'Compare and Contrast' },
    { id: 'core-patterns', label: 'Design Patterns' },
    { id: 'core-ops-checklist', label: 'Operational Checklist' },
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
.azure-blob-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.azure-blob-help-page .win98-window {
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

.azure-blob-help-page .win98-titlebar {
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

.azure-blob-help-page .win98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.azure-blob-help-page .win98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.azure-blob-help-page .win98-control {
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

.azure-blob-help-page .win98-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
}

.azure-blob-help-page .win98-tab {
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

.azure-blob-help-page .win98-tab.active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.azure-blob-help-page .win98-main {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  flex: 1;
  min-height: 0;
  border-top: 1px solid #404040;
  background: #ffffff;
}

.azure-blob-help-page .win98-toc {
  overflow: auto;
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
}

.azure-blob-help-page .win98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.azure-blob-help-page .win98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.azure-blob-help-page .win98-toc-list li {
  margin: 0 0 8px;
}

.azure-blob-help-page .win98-toc-list a {
  color: #000000;
  font-size: 12px;
  text-decoration: none;
}

.azure-blob-help-page .win98-content {
  overflow-x: auto;
  overflow-y: scroll;
  scrollbar-gutter: stable;
  padding: 14px 20px 20px;
}

.azure-blob-help-page .win98-doc-title {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 700;
}

.azure-blob-help-page .win98-doc-subtitle {
  margin: 0 0 12px;
  font-size: 12px;
  font-weight: 700;
}

.azure-blob-help-page .win98-section {
  margin: 0 0 22px;
}

.azure-blob-help-page .win98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.azure-blob-help-page .win98-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.azure-blob-help-page .win98-content p,
.azure-blob-help-page .win98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.azure-blob-help-page .win98-content p {
  margin: 0 0 10px;
}

.azure-blob-help-page .win98-content ul,
.azure-blob-help-page .win98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.azure-blob-help-page .win98-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.azure-blob-help-page .win98-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.azure-blob-help-page .win98-codebox code {
  display: block;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
}

.azure-blob-help-page .win98-inline-link {
  color: #000080;
}

@media (max-width: 900px) {
  .azure-blob-help-page .win98-main {
    grid-template-columns: 1fr;
  }

  .azure-blob-help-page .win98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .azure-blob-help-page .win98-title-text {
    position: static;
    transform: none;
    margin-left: 8px;
    font-size: 14px;
  }
}
`

export default function AzureBlobStoragePage(): JSX.Element {
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
    <div className="azure-blob-help-page">
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
                    checked on March 13, 2026. Azure Blob Storage features, tier availability,
                    redundancy support, and protocol details can change, so production decisions
                    should always be revalidated against the current documentation.
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
