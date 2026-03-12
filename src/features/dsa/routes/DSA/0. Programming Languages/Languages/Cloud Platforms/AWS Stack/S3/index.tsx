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

const pageTitle = 'AWS S3'
const pageSubtitle = 'Object storage on AWS for durable data, distribution, data lakes, archives, and application assets.'

const introParagraphs = [
  'Amazon Simple Storage Service, usually shortened to Amazon S3, is AWS\'s object storage platform. It is the default storage primitive for a large portion of AWS architectures because it handles durable object storage at massive scale, integrates with almost every major AWS service, and supports a wide range of access, lifecycle, analytics, security, and data protection features.',
  'Most teams first meet S3 as "a place to store files," but that description is too small. In practice S3 is used for application uploads, static assets, log archives, data lake raw zones, backups, media pipelines, software artifacts, machine learning datasets, compliance retention, cross-account data sharing, and event-driven automation. It is foundational infrastructure, not just a file bucket.',
  'This page focuses on Amazon S3 for application and systems design: general purpose buckets first, then newer bucket types, storage classes, access control, lifecycle policy, replication, encryption, observability, performance, and the architectural mistakes that matter in production.',
]

const bigPictureSections: Array<{ title: string; paragraphs: string[] }> = [
  {
    title: 'What it is',
    paragraphs: [
      'S3 is an object store. You place objects into buckets, address them by key, and retrieve or manage them through APIs. This is not a hierarchical file system and not a block device. The core model is bucket plus key plus optional version, with metadata and policies around that object.',
      'That distinction matters operationally. You do not mount S3 like a normal local disk and expect POSIX semantics. You design around object operations, prefixes, metadata, lifecycle, and network access patterns.',
    ],
  },
  {
    title: 'Why teams use it',
    paragraphs: [
      'S3 is durable, highly available, globally integrated with AWS, and operationally simple compared with self-managed storage tiers. It can serve tiny application uploads or enormous data-lake footprints without forcing teams to operate storage clusters directly.',
      'It also covers a wide range of storage temperatures. Hot active data can live in S3 Standard or S3 Express One Zone. Cost-sensitive data can transition through Intelligent-Tiering, infrequent-access tiers, and archival Glacier classes through lifecycle rules.',
    ],
  },
  {
    title: 'How to think about it',
    paragraphs: [
      'The right mental model is not "folder tree in the cloud." The better model is "durable object namespace with policy, lifecycle, and event hooks." Prefixes are naming structure, not hard directories in general purpose buckets. Access is policy-driven, not path-permission-driven in the traditional filesystem sense.',
      'That mindset leads to better designs: immutable object keys for assets, versioning for recovery, lifecycle for cost control, replication for protection or locality, and events for downstream processing rather than cron-based polling wherever possible.',
    ],
  },
  {
    title: 'Where it fits',
    paragraphs: [
      'S3 is a strong fit for static assets, user uploads, backups, data lakes, long-term log retention, report exports, software package distribution, ML datasets, and asynchronous processing pipelines. It is also the storage backbone behind many higher-level AWS patterns, such as CloudFront origins, Athena data, EMR data lakes, and event-driven ingestion.',
      'It is a poor fit when the workload requires low-latency random block updates, POSIX file locking semantics, or transactional row-level queries. In those cases EBS, EFS, FSx, or a database service is usually the better storage primitive.',
    ],
  },
  {
    title: 'What changed in the service model over time',
    paragraphs: [
      'Modern S3 defaults are more opinionated than older tutorials suggest. New buckets are private by default. Object Ownership defaults to bucket owner enforced with ACLs disabled. New objects are encrypted at rest automatically. Public access is something you should opt into carefully, not assume casually.',
      'The bucket model has also expanded. As of March 12, 2026, AWS documents four S3 bucket types: general purpose buckets, directory buckets, table buckets, and vector buckets. Most application teams still spend most of their time in general purpose buckets, but the product family is broader now and worth understanding at least at a high level.',
    ],
  },
]

const bucketTypeGuide = [
  {
    title: 'General purpose buckets',
    detail:
      'The default and recommended bucket type for most application workloads. They support the classic flat S3 object namespace, broad feature coverage, multiple storage classes, public or private patterns, website hosting, lifecycle, replication, and the familiar SDK and CLI workflows.',
  },
  {
    title: 'Directory buckets',
    detail:
      'Recommended by AWS for low-latency or data-residency use cases. In Availability Zones they support S3 Express One Zone, and in Dedicated Local Zones they support One Zone-IA style residency patterns. They behave differently from general purpose buckets and should be chosen intentionally rather than treated as a drop-in replacement.',
  },
  {
    title: 'Table buckets',
    detail:
      'Purpose-built for tabular data in Apache Iceberg format and oriented toward analytics and machine learning workflows rather than general application object storage.',
  },
  {
    title: 'Vector buckets',
    detail:
      'Purpose-built for storing and querying vectors for similarity search and machine learning workflows. This is not a generic bucket with a new marketing label; it is a different storage specialization.',
  },
]

const fitGuide = [
  {
    title: 'Need durable object storage for files, assets, backups, logs, or datasets',
    choice: 'S3 is a strong fit.',
  },
  {
    title: 'Need static web assets, downloads, or media files at scale',
    choice: 'Use S3, usually with CloudFront in front of it for edge delivery and origin protection.',
  },
  {
    title: 'Need long-term retention with cost-based archival transitions',
    choice: 'Use S3 lifecycle and archival storage classes.',
  },
  {
    title: 'Need immutable retention for compliance or legal-hold workflows',
    choice: 'Use versioning plus S3 Object Lock where appropriate.',
  },
  {
    title: 'Need low-latency block storage or a normal mutable filesystem',
    choice: 'Do not force S3 to behave like EBS or EFS. Pick the correct storage primitive.',
  },
  {
    title: 'Need ultra-low-latency single-AZ object access with a different bucket model',
    choice: 'Evaluate directory buckets and S3 Express One Zone intentionally.',
  },
]

const keyTakeaways = [
  'S3 is object storage, not a filesystem and not a database.',
  'General purpose buckets remain the default choice for most application designs.',
  'Modern S3 defaults favor private access, disabled ACLs, and automatic encryption.',
  'Versioning, lifecycle, replication, and Object Lock solve different data protection problems and should not be conflated.',
  'Most serious S3 incidents are access-control mistakes, lifecycle mistakes, or application assumptions that do not match object-storage semantics.',
]

const coreConceptSections: NarrativeSection[] = [
  {
    id: 'core-data-model',
    heading: 'Buckets, Objects, Keys, and the Namespace Model',
    paragraphs: [
      'Buckets are the top-level containers. Objects are the stored data plus metadata. Keys are the full names of objects inside a bucket. In general purpose buckets the namespace is flat, even though prefixes and delimiters make it look hierarchical in consoles and tools.',
      'This is why deleting a "folder" in the console is really deleting objects with a shared prefix. It is also why naming conventions matter so much. Prefix design affects organization, list behavior, lifecycle scope, event filters, analytics patterns, and sometimes human operability.',
      'Objects can include custom metadata and tags, and many designs should use them intentionally. Metadata is useful when the retrieval path needs object-specific headers or descriptive values. Tags are useful for lifecycle and cost/governance workflows because policies can key off them.',
    ],
  },
  {
    id: 'core-consistency',
    heading: 'Consistency and Request Semantics',
    paragraphs: [
      'AWS documents strong read-after-write consistency for object PUTs and DELETEs in general purpose buckets, and this applies to GET, HEAD, and LIST behavior. That removed a class of old design caveats that used to appear in legacy S3 advice.',
      'Strong consistency does not mean S3 is transactional storage in the database sense. It means that after a successful write, later reads and listings reflect the change. It does not turn object storage into a multi-object ACID system.',
      'The correct takeaway is that modern S3 is simpler to reason about than many outdated blog posts imply, but application-level correctness still matters when multiple objects, workflow states, or external indexes are involved.',
    ],
  },
  {
    id: 'core-storage-classes',
    heading: 'Storage Classes and Temperature Strategy',
    paragraphs: [
      'S3 storage classes exist because access frequency, latency tolerance, and durability or availability expectations vary. Common classes include S3 Standard, S3 Intelligent-Tiering, S3 Standard-IA, S3 One Zone-IA, S3 Glacier Instant Retrieval, S3 Glacier Flexible Retrieval, S3 Glacier Deep Archive, and S3 Express One Zone for directory buckets.',
      'The design mistake is choosing by price per GB alone. Retrieval charges, minimum storage durations, access patterns, and restore delays can matter more than raw storage price. Some teams accidentally build a hot workload on a cold storage class and then wonder why the bill or latency is wrong.',
      'Intelligent-Tiering is useful when access patterns are uncertain and operational simplicity matters. Lifecycle-driven movement is useful when data temperature is predictable. Archival classes are excellent when the business can tolerate restore workflows instead of immediate retrieval.',
    ],
  },
  {
    id: 'core-versioning',
    heading: 'Versioning, Delete Markers, and Recovery',
    paragraphs: [
      'Versioning is one of the most important S3 safety features. When enabled, new writes create new object versions instead of silently overwriting the prior state. Deletes on versioned buckets usually create delete markers instead of immediately erasing prior versions.',
      'This changes recovery posture substantially. Accidental overwrites, buggy deployments, or human mistakes become easier to reverse because the prior object versions still exist until explicitly removed by lifecycle or manual action.',
      'Versioning is not a full backup strategy by itself, but it is often the first protective layer application teams should enable when the bucket stores important business data or deployment artifacts.',
    ],
  },
  {
    id: 'core-lifecycle',
    heading: 'Lifecycle Rules and Archival',
    paragraphs: [
      'Lifecycle policies automate expiration, transition, noncurrent-version cleanup, multipart-upload cleanup, and archival transitions. This is one of S3\'s most powerful operational tools because it turns storage hygiene and cost control into policy instead of manual cleanup labor.',
      'Good lifecycle design starts with data categories: hot active assets, short-lived uploads, immutable releases, compliance records, and long-term archives do not deserve the same retention and storage-class treatment.',
      'Bad lifecycle design deletes data too early, transitions data before the application is ready for retrieval tradeoffs, or ignores noncurrent versions and incomplete multipart uploads until the bill grows quietly in the background.',
    ],
  },
  {
    id: 'core-replication',
    heading: 'Replication, Regional Design, and Data Protection',
    paragraphs: [
      'S3 replication copies objects to another bucket, either in the same Region or another Region, using asynchronous replication rules. Replication can be used for resilience, locality, data sharing, migration staging, regulatory boundaries, or backup and recovery posture enhancement.',
      'Replication is not a synonym for backup, and backup is not a synonym for replication. Replication mirrors data flow. Versioning and restore posture are what let you recover from certain classes of mistakes. If replication blindly copies a bad object state, you need versioning and retention discipline to recover cleanly.',
      'AWS also documents S3 Replication Time Control for workloads with stricter replication-time objectives. That matters when replication delay is not just a convenience issue but part of a business or compliance requirement.',
    ],
  },
  {
    id: 'core-access-control',
    heading: 'Access Control: IAM, Bucket Policies, Object Ownership, and ACLs',
    paragraphs: [
      'Modern S3 access design should start from IAM policies, bucket policies, and Block Public Access settings, not ACL-heavy legacy patterns. AWS recommends keeping ACLs disabled in most cases through Object Ownership set to bucket owner enforced.',
      'That default is important because ACLs are historically one of the biggest sources of confusing cross-account and public-access mistakes in S3. With bucket owner enforced, ACLs are disabled and the bucket owner automatically owns every object. This greatly simplifies permission reasoning.',
      'Bucket policies are the resource-level enforcement surface for patterns such as private-only access, CloudFront origin restriction, cross-account access, VPC endpoint restriction, TLS enforcement, prefix scoping, or service-principal access from other AWS services.',
    ],
  },
  {
    id: 'core-public-access',
    heading: 'Block Public Access and Safe Sharing',
    paragraphs: [
      'Block Public Access is one of the most valuable safety controls in S3. It protects against accidentally exposing buckets or objects publicly through policies or ACLs. For most internal or application buckets, it should remain fully enabled.',
      'If content must be public, make that choice intentionally and narrowly. Even then, many architectures should use CloudFront in front of S3 so the bucket itself remains non-public and origin access control protects the origin path.',
      'A useful engineering standard is that any public bucket should require explicit review, explicit business intent, and clear evidence that private plus CDN or signed-access patterns were considered first.',
    ],
  },
  {
    id: 'core-encryption',
    heading: 'Encryption, Bucket Keys, and Data Protection',
    paragraphs: [
      'AWS documents that all new object uploads to S3 are automatically encrypted at rest. You can still choose the server-side encryption strategy deliberately, such as SSE-S3, SSE-KMS, or DSSE-KMS depending on control, audit, and policy requirements.',
      'SSE-KMS is common when central key policy, auditability, and tighter control matter. S3 Bucket Keys can reduce KMS request cost for SSE-KMS-heavy workloads by reducing direct KMS traffic. This becomes financially relevant on large object volumes.',
      'Encryption at rest and versioning are not interchangeable protections. Encryption protects confidentiality. Versioning protects recoverability against overwrite and delete mistakes. Good S3 design often needs both.',
    ],
  },
  {
    id: 'core-object-lock',
    heading: 'Object Lock, Retention, and Legal Hold',
    paragraphs: [
      'S3 Object Lock is for write-once-read-many style retention. It can enforce retention periods or legal holds so objects cannot be overwritten or deleted before policy allows. This is materially different from ordinary versioning because it introduces tamper-resistant retention semantics.',
      'Object Lock is useful for compliance archives, regulated records, and recovery-oriented designs where immutable retention is part of the requirement. It should be chosen carefully because it changes operational flexibility and deletion behavior significantly.',
      'If a team needs ordinary rollback protection, versioning may be enough. If the team needs regulatory immutability, Object Lock is the feature to evaluate.',
    ],
  },
  {
    id: 'core-access-points',
    heading: 'Access Points, Multi-Region Access Points, and Namespace Scaling',
    paragraphs: [
      'S3 Access Points provide dedicated access names and policies for different applications or teams against the same underlying bucket. This can simplify permissions when one giant bucket serves many consumers with different access patterns.',
      'Multi-Region Access Points provide a global endpoint that routes requests across multiple Region buckets. They are relevant when multi-Region data access, failover, or geography-aware performance is part of the design.',
      'The reason these features matter is organizational scale. A bucket can be operationally correct and still become permission spaghetti if every client path depends on one giant evolving bucket policy. Access points give you another structuring tool.',
    ],
  },
  {
    id: 'core-upload-download',
    heading: 'Upload and Download Patterns: Multipart, Presigned URLs, and Transfer Acceleration',
    paragraphs: [
      'Multipart upload is the standard approach for large objects and resilient upload workflows. It lets clients upload parts independently and then complete the object, which improves throughput and retry behavior. It also means you should clean up abandoned multipart uploads through lifecycle policy so failed clients do not leak storage cost.',
      'Presigned URLs let trusted application code delegate limited-time direct access to S3 without proxying the entire payload through your application servers. This is often the right design for browser uploads, mobile uploads, or controlled downloads because it reduces application bandwidth and simplifies scaling.',
      'S3 Transfer Acceleration can improve long-distance transfer performance for some geographically distributed clients by routing through Amazon CloudFront edge locations. It should be measured, not assumed, because benefit depends on geography and workload shape.',
    ],
  },
  {
    id: 'core-events',
    heading: 'Event Notifications and Event-Driven Processing',
    paragraphs: [
      'S3 can emit object-created and object-removed event notifications to targets such as Lambda, SNS, and SQS. This is the basis of many ingestion and processing architectures: upload to S3, then trigger validation, transformation, metadata extraction, or downstream indexing.',
      'The important architectural rule is idempotency. Event-driven storage pipelines should assume retries, duplicates, ordering differences across keys, and partial downstream failure. The event is a trigger, not a guarantee that the whole business workflow completed safely.',
      'S3 events are excellent when the design goal is asynchronous processing. They are the wrong tool if the application needs in-request transactional processing before acknowledging success to a client.',
    ],
  },
  {
    id: 'core-observability',
    heading: 'Observability, Inventory, Storage Lens, and Batch Operations',
    paragraphs: [
      'S3 observability is broader than request counts. Server access logs, CloudTrail data events, CloudWatch request metrics, Storage Lens, Inventory reports, and Batch Operations all contribute to a mature operating model.',
      'Storage Lens helps teams understand organization-wide usage, activity, and cost-efficiency trends. Inventory gives object-level reporting for auditing, analytics, and bulk checks. Batch Operations provides managed bulk actions such as tag updates or invoking Lambda across large object sets.',
      'These features matter most once a bucket stops being small. At scale, "just list the bucket and inspect it" is not an operating strategy. Reporting and managed bulk workflows become part of normal governance.',
    ],
  },
  {
    id: 'core-performance',
    heading: 'Performance Design and Prefix Planning',
    paragraphs: [
      'Modern S3 performance guidance is much less restrictive than old advice that forced random-prefix hacks everywhere, but request distribution and workload shape still matter. Very high request rates, extremely hot prefixes, and large fan-in or fan-out patterns should still be designed intentionally and load-tested.',
      'The bigger performance question is usually architectural: should the application fetch directly from S3, through CloudFront, through a proxy, or through a queue-backed processing path? Solving the wrong problem at the client layer can waste time on storage tuning that was never the main bottleneck.',
      'For latency-sensitive reads, especially on repeated public or semi-public content, caching through CloudFront is usually a bigger architectural win than trying to force S3 alone to behave like a global edge cache.',
    ],
  },
  {
    id: 'core-cost',
    heading: 'Cost Model and Cost Discipline',
    paragraphs: [
      'S3 cost includes more than storage GB. It also includes request charges, data transfer, lifecycle transitions, retrieval charges for colder classes, replication traffic, inventory/reporting overhead, KMS usage for encryption, and wasted storage in old versions or abandoned multipart uploads.',
      'The most common hidden S3 costs are noncurrent versions, over-retained logs, Glacier retrieval surprises, unnecessary replication, excessive small-object churn, and architectures that proxy traffic through an application tier instead of using direct S3 or CloudFront access.',
      'Good S3 cost control is mostly policy and architecture discipline: lifecycle rules, correct storage class, correct access path, and explicit cleanup. It is rarely about shaving pennies off one storage class while ignoring waste elsewhere.',
    ],
  },
  {
    id: 'core-website',
    heading: 'Static Website Hosting and CloudFront Patterns',
    paragraphs: [
      'S3 general purpose buckets can host static websites, but production-grade public websites usually put CloudFront in front of S3 for HTTPS, caching, WAF, custom domains, and origin protection. Direct bucket website hosting can still be useful, but it is not the strongest default pattern for serious internet-facing delivery.',
      'The modern secure pattern for private origins is CloudFront plus origin access control rather than leaving the bucket public. That lets CloudFront fetch from S3 while users cannot bypass the CDN and hit the bucket endpoint directly.',
      'A useful design principle is to separate "object storage" from "public delivery." S3 stores the assets. CloudFront handles edge delivery, caching, TLS termination, and request control.',
    ],
  },
  {
    id: 'core-directory-buckets',
    heading: 'Directory Buckets and S3 Express One Zone',
    paragraphs: [
      'Directory buckets are the bucket type AWS recommends for low-latency or data-residency workloads. In Availability Zones, they support S3 Express One Zone, which is designed for high-performance, single-AZ object access patterns.',
      'This is not just a cheaper or faster storage class toggle on general purpose buckets. Directory buckets have different feature constraints and semantics. They should be adopted only after confirming the application actually benefits from their latency and locality properties and can accept the model tradeoffs.',
      'Most teams should still default to general purpose buckets unless they have a clear reason to optimize for this newer bucket model.',
    ],
  },
]

const designPatterns = [
  {
    title: 'Private uploads with presigned URLs',
    detail:
      'Let the application authorize the action, then issue a short-lived presigned URL so the client uploads directly to S3. This scales better than proxying every upload through the application tier.',
  },
  {
    title: 'Immutable asset keys',
    detail:
      'Use content-hashed or versioned object names for frontend assets so caches can be long-lived and rollbacks are straightforward.',
  },
  {
    title: 'Versioning plus lifecycle',
    detail:
      'Combine recoverability with cost control by enabling versioning and then expiring noncurrent versions according to a deliberate retention window.',
  },
  {
    title: 'CloudFront in front of S3 for public delivery',
    detail:
      'Use CloudFront and origin access control for public or semi-public internet delivery so the bucket remains private and edge caching absorbs traffic.',
  },
  {
    title: 'Replication only where the business case is real',
    detail:
      'Replicate because you need locality, resilience, or governance separation, not because replication sounds generally safer in the abstract.',
  },
  {
    title: 'Prefix and tag structure as part of data design',
    detail:
      'Think about prefixes and object tags early so lifecycle, events, cost allocation, and data governance work naturally rather than as a retrofit.',
  },
]

const operationalChecklist = [
  'Keep Block Public Access enabled unless a specific reviewed use case requires otherwise.',
  'Prefer Object Ownership bucket owner enforced and avoid ACL-driven designs unless there is a strong legacy requirement.',
  'Enable versioning for important buckets before the first production incident forces the lesson.',
  'Define lifecycle rules for incomplete multipart uploads, stale temporary files, and noncurrent versions.',
  'Choose storage classes based on retrieval behavior and retention, not just price per GB.',
  'Use CloudFront for serious public delivery instead of exposing bucket endpoints directly wherever possible.',
  'Test restore and rollback procedures for important buckets, especially when versioning, Object Lock, or replication is involved.',
  'Audit bucket policies regularly and verify that TLS, principal scope, and public-access intent are explicit.',
]

const pitfalls = [
  'Treating prefixes as real folders and building logic that assumes filesystem semantics.',
  'Leaving a bucket public because it was easier during development and forgetting to reverse the decision.',
  'Using ACLs and bucket policies together without a clear mental model, then being surprised by access behavior.',
  'Skipping versioning on important buckets and learning about overwrite risk only after data loss.',
  'Ignoring incomplete multipart uploads, noncurrent versions, or archival retrieval charges until the bill grows.',
  'Assuming S3 can replace EBS, EFS, or a database for workloads that need different storage semantics.',
  'Building direct application-server upload paths when presigned URL workflows would be simpler and cheaper.',
  'Moving data to cold classes through lifecycle without understanding restore latency and retrieval cost.',
  'Using S3 website hosting as the default public pattern when private-origin CloudFront would be safer.',
  'Assuming object replication is the same thing as backup, retention, or immutable recovery posture.',
]

const compareNotes = [
  {
    title: 'S3 vs EBS',
    detail:
      'EBS is block storage attached to compute. S3 is object storage over APIs. If the workload expects mounted disks, low-latency random block I/O, or database filesystems, EBS is the correct mental model instead of S3.',
  },
  {
    title: 'S3 vs EFS',
    detail:
      'EFS is a managed shared filesystem with POSIX semantics. S3 is an object namespace. If many instances need normal filesystem access, EFS may be the right tool.',
  },
  {
    title: 'S3 vs DynamoDB',
    detail:
      'S3 stores objects and metadata, not indexed application records with query semantics. If the workload is really key-value or document lookup with application querying, DynamoDB is likely the better fit.',
  },
  {
    title: 'S3 general purpose buckets vs directory buckets',
    detail:
      'General purpose buckets are the broad default with the widest compatibility. Directory buckets are a deliberate choice for low-latency or residency-specific scenarios and have a different feature profile.',
  },
]

const examples: ExampleSection[] = [
  {
    id: 'ex-private-bucket',
    title: 'Create a private versioned bucket with public access blocked',
    code: `aws s3api create-bucket \
  --bucket app-prod-uploads-123456 \
  --region us-east-1

aws s3api put-public-access-block \
  --bucket app-prod-uploads-123456 \
  --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true

aws s3api put-bucket-versioning \
  --bucket app-prod-uploads-123456 \
  --versioning-configuration Status=Enabled`,
    explanation:
      'This is the shape of a sane baseline bucket: private, public access blocked, and versioning enabled before important data arrives.',
  },
  {
    id: 'ex-lifecycle',
    title: 'Lifecycle policy for temporary uploads and noncurrent versions',
    code: `{
  "Rules": [
    {
      "ID": "expire-temp-files",
      "Status": "Enabled",
      "Filter": { "Prefix": "tmp/" },
      "Expiration": { "Days": 7 }
    },
    {
      "ID": "clean-old-versions",
      "Status": "Enabled",
      "NoncurrentVersionExpiration": { "NoncurrentDays": 30 }
    },
    {
      "ID": "abort-incomplete-multipart",
      "Status": "Enabled",
      "AbortIncompleteMultipartUpload": { "DaysAfterInitiation": 3 }
    }
  ]
}`,
    explanation:
      'Lifecycle policy should explicitly clean up temporary data, stale object versions, and abandoned multipart uploads. Those are common hidden-cost sources.',
  },
  {
    id: 'ex-presigned-upload',
    title: 'Presigned upload flow',
    code: `Client asks application for upload authorization
  -> application verifies user and intended object key
  -> application generates short-lived presigned PUT URL
  -> client uploads directly to S3
  -> application records object metadata after success`,
    explanation:
      'This is the standard scalable upload pattern for browsers and mobile apps. The application authorizes; S3 carries the payload.',
  },
  {
    id: 'ex-cloudfront-origin',
    title: 'Private S3 origin behind CloudFront',
    code: `Internet users
  -> CloudFront distribution
  -> origin access control
  -> private S3 bucket

Result:
  bucket stays non-public
  CloudFront handles TLS and caching
  users cannot bypass the CDN and hit S3 directly`,
    explanation:
      'This is the safer modern pattern for static sites and download delivery when public internet traffic is involved.',
  },
  {
    id: 'ex-replication',
    title: 'Replication rule intent',
    code: `Source bucket: prod-documents
  -> versioning enabled
  -> replication rule for prefix "legal/"
  -> destination bucket in another Region
  -> destination account optional
  -> optional replication time control`,
    explanation:
      'Replicate the data that has a real business reason to exist elsewhere. Prefix-scoped replication is often more disciplined than bucket-wide mirroring.',
  },
  {
    id: 'ex-object-lock',
    title: 'Object Lock retention mindset',
    code: `Bucket configured with Object Lock
  -> object written with retention until 2027-12-31
  -> delete or overwrite blocked until retention expires
  -> legal hold can prevent change even without a date-based expiration`,
    explanation:
      'Use Object Lock when immutability is the requirement. Do not add it casually to buckets where normal deletion flexibility still matters.',
  },
]

const glossaryTerms = [
  {
    term: 'Bucket',
    definition: 'The top-level S3 container that holds objects and bucket-level configuration.',
  },
  {
    term: 'Object',
    definition: 'The stored payload in S3 together with metadata, key name, and optional version.',
  },
  {
    term: 'Key',
    definition: 'The full object name inside a bucket. Prefixes are just parts of the key string.',
  },
  {
    term: 'Prefix',
    definition: 'A shared leading segment of keys used for organization, lifecycle filters, and event filters; not a real directory in general purpose buckets.',
  },
  {
    term: 'Versioning',
    definition: 'An S3 feature that preserves multiple versions of an object instead of silently overwriting state.',
  },
  {
    term: 'Delete marker',
    definition: 'A marker created by deletes in a versioned bucket that makes the object appear deleted without erasing prior versions immediately.',
  },
  {
    term: 'Lifecycle rule',
    definition: 'A policy that automatically transitions, expires, or cleans up objects and versions over time.',
  },
  {
    term: 'Replication',
    definition: 'Asynchronous copying of objects to another S3 bucket in the same or a different Region.',
  },
  {
    term: 'Object Ownership',
    definition: 'The S3 control that determines object ownership behavior and whether ACLs remain relevant.',
  },
  {
    term: 'Bucket owner enforced',
    definition: 'The Object Ownership mode that disables ACLs and makes the bucket owner own every object in the bucket.',
  },
  {
    term: 'Block Public Access',
    definition: 'A set of S3 safety controls that prevent buckets or objects from being exposed publicly through policies or ACLs.',
  },
  {
    term: 'Presigned URL',
    definition: 'A time-limited URL that grants delegated access to perform a specific S3 operation without exposing long-lived credentials.',
  },
  {
    term: 'Multipart upload',
    definition: 'The S3 upload method that splits large object uploads into parts for better throughput and retry handling.',
  },
  {
    term: 'S3 Object Lock',
    definition: 'The immutability feature that enforces write-once-read-many style retention and legal hold.',
  },
  {
    term: 'Directory bucket',
    definition: 'An S3 bucket type intended for low-latency or data-residency use cases and associated with S3 Express One Zone in Availability Zones.',
  },
]

const pageSources = [
  'https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html',
  'https://docs.aws.amazon.com/AmazonS3/latest/userguide/ConsistencyModel.html',
  'https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingBucket.html',
  'https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html',
  'https://docs.aws.amazon.com/AmazonS3/latest/userguide/Versioning.html',
  'https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html',
  'https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html',
  'https://docs.aws.amazon.com/AmazonS3/latest/userguide/about-object-ownership.html',
  'https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-block-public-access.html',
  'https://docs.aws.amazon.com/AmazonS3/latest/userguide/serv-side-encryption.html',
  'https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html',
  'https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-points.html',
  'https://docs.aws.amazon.com/AmazonS3/latest/userguide/mpuoverview.html',
  'https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html',
  'https://docs.aws.amazon.com/AmazonS3/latest/userguide/transfer-acceleration.html',
  'https://docs.aws.amazon.com/AmazonS3/latest/userguide/EventNotifications.html',
  'https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-inventory.html',
  'https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage_lens.html',
  'https://docs.aws.amazon.com/AmazonS3/latest/userguide/batch-ops.html',
  'https://aws.amazon.com/s3/',
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
    { id: 'bp-bucket-types', label: 'Bucket Types' },
    { id: 'bp-fit', label: 'When to Use It' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-data-model', label: 'Data Model' },
    { id: 'core-consistency', label: 'Consistency' },
    { id: 'core-storage-classes', label: 'Storage Classes' },
    { id: 'core-versioning', label: 'Versioning' },
    { id: 'core-lifecycle', label: 'Lifecycle' },
    { id: 'core-replication', label: 'Replication' },
    { id: 'core-access-control', label: 'Access Control' },
    { id: 'core-public-access', label: 'Public Access' },
    { id: 'core-encryption', label: 'Encryption' },
    { id: 'core-object-lock', label: 'Object Lock' },
    { id: 'core-access-points', label: 'Access Points' },
    { id: 'core-upload-download', label: 'Upload and Download' },
    { id: 'core-events', label: 'Events' },
    { id: 'core-observability', label: 'Observability' },
    { id: 'core-performance', label: 'Performance' },
    { id: 'core-cost', label: 'Cost' },
    { id: 'core-website', label: 'Website and CloudFront' },
    { id: 'core-directory-buckets', label: 'Directory Buckets' },
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
.aws-s3-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.aws-s3-help-page .win98-window {
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

.aws-s3-help-page .win98-titlebar {
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

.aws-s3-help-page .win98-title-text {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.aws-s3-help-page .win98-title-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.aws-s3-help-page .win98-control {
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

.aws-s3-help-page .win98-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  padding: 6px 8px 0;
}

.aws-s3-help-page .win98-tab {
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

.aws-s3-help-page .win98-tab.active {
  position: relative;
  top: 1px;
  background: #ffffff;
}

.aws-s3-help-page .win98-main {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  flex: 1;
  min-height: 0;
  border-top: 1px solid #404040;
  background: #ffffff;
}

.aws-s3-help-page .win98-toc {
  overflow: auto;
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
}

.aws-s3-help-page .win98-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.aws-s3-help-page .win98-toc-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.aws-s3-help-page .win98-toc-list li {
  margin: 0 0 8px;
}

.aws-s3-help-page .win98-toc-list a {
  color: #000000;
  font-size: 12px;
  text-decoration: none;
}

.aws-s3-help-page .win98-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.aws-s3-help-page .win98-doc-title {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 700;
}

.aws-s3-help-page .win98-doc-subtitle {
  margin: 0 0 12px;
  font-size: 12px;
  font-weight: 700;
}

.aws-s3-help-page .win98-section {
  margin: 0 0 22px;
}

.aws-s3-help-page .win98-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.aws-s3-help-page .win98-subheading {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 700;
}

.aws-s3-help-page .win98-content p,
.aws-s3-help-page .win98-content li {
  font-size: 12px;
  line-height: 1.5;
}

.aws-s3-help-page .win98-content p {
  margin: 0 0 10px;
}

.aws-s3-help-page .win98-content ul,
.aws-s3-help-page .win98-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.aws-s3-help-page .win98-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.aws-s3-help-page .win98-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
}

.aws-s3-help-page .win98-codebox code {
  display: block;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  white-space: pre;
}

.aws-s3-help-page .win98-inline-link {
  color: #000080;
}

@media (max-width: 900px) {
  .aws-s3-help-page .win98-main {
    grid-template-columns: 1fr;
  }

  .aws-s3-help-page .win98-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .aws-s3-help-page .win98-title-text {
    position: static;
    transform: none;
    margin-left: 8px;
    font-size: 14px;
  }
}
`

export default function AWSS3Page(): JSX.Element {
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
    <div className="aws-s3-help-page">
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

                <section id="bp-bucket-types" className="win98-section">
                  <h2 className="win98-heading">Bucket Types</h2>
                  {bucketTypeGuide.map((item) => (
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
                    S3 features and bucket-type support can change, so production decisions should always be verified
                    against the current service documentation and Region-specific guidance.
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
