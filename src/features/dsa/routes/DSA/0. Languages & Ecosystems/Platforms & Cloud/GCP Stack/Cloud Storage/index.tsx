import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const bigPictureSections: Array<
  | { id: string; title: string; paragraphs: string[] }
  | { id: string; title: string; bullets: string[] }
> = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      "Cloud Storage is Google Cloud's managed object storage service. The simplest mental model is that it stores objects inside buckets rather than rows in tables or files on a traditional mounted filesystem.",
      'It is designed for durable blob and file-like storage: images, videos, logs, backups, archives, static site assets, model artifacts, data lake files, and other unstructured or semi-structured objects.',
      'Adopting Cloud Storage usually means moving from host-local or ad hoc shared storage toward a managed bucket-and-object model with strong durability, lifecycle controls, IAM integration, and API-based access patterns.',
    ],
  },
  {
    id: 'bp-why',
    title: 'Why it matters',
    paragraphs: [
      'Modern cloud systems need a durable place for files, binary assets, uploads, archives, and data exchange artifacts. Those workloads rarely belong in transactional databases and are often awkward on traditional attached disks.',
      'Cloud Storage matters because it gives teams a managed object store with broad language support, lifecycle management, access controls, different storage classes, and deep integration with the rest of Google Cloud.',
      'In a GCP architecture, it often becomes the default landing zone for uploads, media, backups, data lake files, build artifacts, and any object-style data that other services need to consume or produce.',
    ],
  },
  {
    id: 'bp-fit',
    title: 'Where it fits best',
    paragraphs: [
      'Cloud Storage is strongest for object and file workloads: static assets, user uploads, logs, archives, exports, backups, data lake storage, machine learning artifacts, and cross-system file exchange.',
      'It is a strong fit when the data does not need transactional relational semantics and when API-based object access is a natural model.',
      'It is a weaker fit when an application needs low-latency transactional record access, relational querying, or traditional POSIX filesystem semantics as the primary interface.',
    ],
  },
  {
    id: 'bp-workflow',
    title: 'Typical workflow',
    paragraphs: [
      'A common workflow is to create a bucket, choose region and storage class, upload objects, enforce access controls, and then consume those objects through application code, signed URLs, event-driven processing, or downstream analytics and batch pipelines.',
      'Another common pattern is to use Cloud Storage as the persistent handoff layer between systems: one service writes an export, another system processes it later, and a lifecycle policy eventually ages or deletes it.',
      'This matters because Cloud Storage is often not the final user-facing system. It is a foundational storage layer that many other systems rely on.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Key takeaways',
    bullets: [
      'Think of Cloud Storage as managed object storage built around buckets and objects.',
      'Buckets define location, access policy, lifecycle, and broad storage behavior. Objects are the stored data items inside those buckets.',
      'Storage class, lifecycle rules, versioning, and soft delete are major cost and recovery levers.',
      'IAM and access model design matter as much as the object data itself.',
      'Cloud Storage is usually part of a larger platform story involving uploads, processing, archival, analytics, or distribution.',
    ],
  },
]

const mentalModels = [
  {
    title: 'Buckets are policy containers',
    detail:
      'A bucket is not just a folder. It is the unit that carries location, security model, lifecycle behavior, and other storage-level policy decisions.',
  },
  {
    title: 'Objects are immutable-style units of storage',
    detail:
      'In practice, objects are typically replaced with new versions rather than modified like ordinary local files. This changes how applications think about updates and recovery.',
  },
  {
    title: 'Storage class is a cost and access decision',
    detail:
      'Choosing Standard, Nearline, Coldline, or Archive is not cosmetic. It affects retrieval expectations, cost posture, and how data should be used operationally.',
  },
  {
    title: 'Lifecycle is part of data design',
    detail:
      'Retention, deletion, transitions, versioning, and soft delete are design choices that shape both cost and recoverability.',
  },
  {
    title: 'Object storage is not a relational database or a local disk',
    detail:
      'Applications should be designed around object semantics, API access, and eventual processing workflows rather than trying to force object storage into a database or filesystem mental model.',
  },
]

const coreSections: Array<
  | { id: string; title: string; paragraphs: string[] }
  | { id: string; title: string; bullets: string[] }
> = [
  {
    id: 'core-model',
    title: 'Buckets, objects, and the storage model',
    paragraphs: [
      'Cloud Storage is organized around buckets and objects. Buckets are the top-level containers. Objects are the actual stored items such as images, archives, logs, or exported datasets.',
      'The important architectural point is that buckets carry policy and location decisions, while objects carry data and metadata. Naming, organization, and bucket boundaries affect access control, lifecycle management, and operational simplicity.',
      'Applications should therefore choose bucket boundaries intentionally rather than treating one giant bucket as the default answer to every storage problem.',
    ],
  },
  {
    id: 'core-location',
    title: 'Location strategy and durability posture',
    paragraphs: [
      'Bucket location is a core architectural choice. Region, dual-region, or multi-region decisions affect latency, resilience expectations, cost, and how close data sits to the systems that use it.',
      'A good location strategy follows workload shape. User uploads close to a regional app, globally distributed static assets, and compliance-sensitive data may all justify different bucket choices.',
      'The practical lesson is that location is not a deployment checkbox. It is a storage architecture decision.',
    ],
  },
  {
    id: 'core-classes',
    title: 'Storage classes and access patterns',
    paragraphs: [
      'Cloud Storage provides multiple storage classes such as Standard, Nearline, Coldline, and Archive. These classes are not about durability differences so much as access pattern and cost expectations.',
      'The right choice depends on how often the object is read and how quickly it needs to be available economically. Hot application assets belong in a different storage posture than monthly compliance archives.',
      'This matters because poor storage class decisions can quietly become either a cost problem or a usability problem depending on the workload.',
    ],
  },
  {
    id: 'core-access',
    title: 'IAM, bucket-level control, and access patterns',
    paragraphs: [
      'Security in Cloud Storage is built around bucket and object access decisions, but mature design usually starts at the bucket level. Uniform bucket-level access is especially important when teams want cleaner, more centralized access control behavior.',
      'IAM determines who can read, write, administer, or list storage resources. Signed URLs add a controlled way to grant temporary access without making buckets broadly public.',
      'The key point is that access should be designed as part of the data flow. Public assets, internal uploads, regulated archives, and cross-service handoff files should not all share the same access pattern by accident.',
    ],
  },
  {
    id: 'core-versioning',
    title: 'Versioning, soft delete, and recovery',
    paragraphs: [
      'Object versioning helps retain older object generations when objects are overwritten or deleted. This is valuable for recovery and for systems where accidental replacement is a real operational risk.',
      'Soft delete adds another recovery-oriented protection layer. It is important because many real-world storage incidents are not infrastructure failures, but operator or application mistakes.',
      'The lesson is that storage design should include a recovery story. If deletion or overwrite is possible, the team should know how recovery works before the incident happens.',
    ],
  },
  {
    id: 'core-lifecycle',
    title: 'Lifecycle management and retention',
    paragraphs: [
      'Lifecycle policies let Cloud Storage change object behavior over time automatically. A bucket can transition objects to colder classes, delete stale data, or enforce retention-oriented rules based on object age or conditions.',
      'This matters because storage costs usually accumulate slowly and quietly. Lifecycle rules are one of the main ways teams keep long-lived buckets sustainable.',
      'Retention should be treated as a product decision as much as an infrastructure decision. How long data stays available affects recovery, compliance, analytics usefulness, and budget.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance, request patterns, and object naming',
    paragraphs: [
      'Object storage performance depends on request patterns, object sizes, naming distribution, and application behavior. High request rate workloads need naming and access patterns that avoid accidental hotspots.',
      'This is why request-rate guidance matters. Performance is not only about raw network throughput; it is also about how evenly object operations are distributed across the service.',
      'A useful design habit is to think about upload, list, and read behavior together. Object naming is not only a convenience for humans. It can shape system behavior at scale.',
    ],
  },
  {
    id: 'core-namespace',
    title: 'Folders, prefixes, and hierarchical namespace',
    paragraphs: [
      'Classic object storage organization is prefix-based rather than true filesystem directory structure. Applications usually simulate folder organization through object naming conventions.',
      'Cloud Storage also supports hierarchical namespace in specific contexts, which matters when a workload wants stronger directory-like behavior semantics on top of object storage.',
      'The main point is to be explicit about whether the workload actually needs directory semantics or only good prefix organization. Those are related, but not identical, requirements.',
    ],
  },
  {
    id: 'core-encryption',
    title: 'Encryption and data protection',
    paragraphs: [
      'Cloud Storage supports encryption models including Google-managed encryption and customer-managed key patterns where needed. This is relevant for organizations with stronger compliance or key-management expectations.',
      'Encryption decisions should be considered alongside IAM, retention, and data classification. Protecting an object is not only about where it is stored, but also about who can access it, how long it exists, and what recovery path exists.',
      'The right mindset is that security posture emerges from combined controls, not from a single checkbox.',
    ],
  },
  {
    id: 'core-integration',
    title: 'Integration with the rest of the platform',
    paragraphs: [
      'Cloud Storage integrates naturally with analytics pipelines, serverless processing, data lake patterns, archival systems, CDN-backed asset delivery, and event-driven workflows.',
      'It is often the handoff layer between services. One system uploads, another transforms, another archives, and a lifecycle policy later transitions the result to colder storage.',
      'This makes Cloud Storage less like a standalone product and more like a foundation that many other Google Cloud services depend on.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Use cases, tradeoffs, and compare-and-contrast',
    paragraphs: [
      'Compared with local disks or VM-attached storage, Cloud Storage offers stronger managed durability and easier sharing, but it uses object semantics rather than local filesystem semantics.',
      'Compared with Cloud SQL, Cloud Storage is for blobs and objects, not transactional relational records. Compared with BigQuery, it is a storage substrate rather than an analytical SQL system.',
      'Compared with self-managed object stores, Cloud Storage reduces operational burden substantially, but it expects the team to adopt the managed bucket-and-object model rather than customizing every underlying storage concern.',
    ],
  },
  {
    id: 'core-antipatterns',
    title: 'Common mistakes and anti-patterns',
    bullets: [
      'Treating buckets like ordinary folders instead of policy boundaries.',
      'Using one bucket for every workload even when access, lifecycle, and compliance needs differ.',
      'Ignoring lifecycle rules and then being surprised by long-term storage cost growth.',
      'Making objects broadly accessible when signed URLs or narrower IAM would have been safer.',
      'Forcing object storage to behave like a transactional database or a mounted local disk.',
      'Skipping versioning or recovery protections for workflows where overwrite or delete mistakes are likely.',
      'Ignoring naming and request-rate guidance in high-scale workloads.',
    ],
  },
  {
    id: 'core-decision',
    title: 'Decision checklist',
    bullets: [
      'Use Cloud Storage when the workload is naturally object-oriented: files, blobs, exports, uploads, archives, or data lake assets.',
      'Choose bucket boundaries based on access model, lifecycle, and location needs, not only on naming convenience.',
      'Pick storage classes based on access pattern, not habit.',
      'Design recovery through versioning, soft delete, or retention choices where accidental deletion is plausible.',
      'Use signed URLs and IAM intentionally rather than defaulting to broad public access.',
      'Treat lifecycle policy as a normal part of storage architecture from the beginning.',
    ],
  },
  {
    id: 'core-advanced',
    title: 'Advanced capabilities worth knowing',
    paragraphs: [
      'As teams mature on Cloud Storage, they usually adopt stronger lifecycle automation, more deliberate storage-class tiering, better signed URL patterns, hierarchical namespace where appropriate, and stronger recovery posture with versioning and soft delete.',
      'These practices matter because object storage often becomes the quiet backbone of many unrelated systems. Once that happens, small storage decisions have wide operational effects.',
      'The practical lesson is that Cloud Storage is simple to start with, but it becomes most valuable when treated as a serious part of the data platform rather than just a place to drop files.',
    ],
  },
]

const examples = [
  {
    title: 'Create a regional bucket with a chosen storage class',
    code: `gcloud storage buckets create gs://my-app-assets \
  --location=us-central1 \
  --default-storage-class=STANDARD`,
    explanation:
      'Bucket creation is the first policy decision. Location and storage class shape latency, cost, and how the bucket should be used over time.',
  },
  {
    title: 'Upload an object into a bucket',
    code: `gcloud storage cp ./logo.png gs://my-app-assets/images/logo.png`,
    explanation:
      'This is the basic Cloud Storage access model: write an object to a bucket under a chosen object name or prefix.',
  },
  {
    title: 'Set a lifecycle rule for cold transition',
    code: `{
  "rule": [
    {
      "action": { "type": "SetStorageClass", "storageClass": "COLDLINE" },
      "condition": { "age": 30 }
    }
  ]
}`,
    explanation:
      'Lifecycle policies automate storage posture. This kind of rule helps control cost when objects become less frequently accessed as they age.',
  },
  {
    title: 'Generate a signed URL for controlled temporary access',
    code: `gsutil signurl -d 15m service-account-key.json gs://my-app-assets/private/report.pdf`,
    explanation:
      'Signed URLs are a common pattern when an object should be shared temporarily without broadly exposing the bucket itself.',
  },
  {
    title: 'Enable object versioning on a bucket',
    code: `gcloud storage buckets update gs://my-app-assets --versioning`,
    explanation:
      'Versioning is a practical recovery feature when overwrite and deletion mistakes are possible in an important bucket.',
  },
  {
    title: 'List objects under a logical prefix',
    code: `gcloud storage ls gs://my-app-assets/images/**`,
    explanation:
      'Most folder-like organization in object storage is really prefix-based naming. Listing by prefix is therefore a core operational pattern.',
  },
]

const glossaryTerms = [
  {
    term: 'Bucket',
    definition:
      'The top-level Cloud Storage container that carries location, access, lifecycle, and broad storage policy.',
  },
  {
    term: 'Object',
    definition: 'The stored data item inside a bucket, including both content and object metadata.',
  },
  {
    term: 'Storage class',
    definition:
      'The selected cost and access posture for stored objects, such as Standard, Nearline, Coldline, or Archive.',
  },
  {
    term: 'Lifecycle rule',
    definition:
      'An automated rule that changes object behavior over time, such as transition or deletion.',
  },
  {
    term: 'Versioning',
    definition:
      'A bucket feature that preserves older object generations when objects are replaced or deleted.',
  },
  {
    term: 'Soft delete',
    definition:
      'A recovery-oriented protection feature that helps restore deleted objects within a retention window.',
  },
  {
    term: 'Uniform bucket-level access',
    definition:
      'A storage access mode that centralizes access decisions at the bucket level rather than relying on older per-object ACL patterns.',
  },
  {
    term: 'Signed URL',
    definition:
      'A time-limited URL that grants controlled access to an object without broadly exposing the bucket.',
  },
  {
    term: 'Prefix',
    definition: 'The naming pattern used to simulate folder-like organization in object storage.',
  },
  {
    term: 'Hierarchical namespace',
    definition:
      'A Cloud Storage capability that provides stronger directory-like namespace behavior for supported workloads.',
  },
  {
    term: 'CMEK',
    definition:
      'Customer-managed encryption keys used when organizations want tighter control over encryption-key management.',
  },
  {
    term: 'Data lake',
    definition:
      'A storage-oriented analytical pattern where large volumes of files and objects are kept for downstream processing and analytics.',
  },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-why', label: 'Why It Matters' },
    { id: 'bp-fit', label: 'Where It Fits Best' },
    { id: 'bp-workflow', label: 'Typical Workflow' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-model', label: 'Buckets and Objects' },
    { id: 'core-location', label: 'Location Strategy' },
    { id: 'core-classes', label: 'Storage Classes' },
    { id: 'core-access', label: 'Access and IAM' },
    { id: 'core-versioning', label: 'Versioning and Recovery' },
    { id: 'core-lifecycle', label: 'Lifecycle Management' },
    { id: 'core-performance', label: 'Performance and Request Rate' },
    { id: 'core-namespace', label: 'Prefixes and Namespace' },
    { id: 'core-encryption', label: 'Encryption' },
    { id: 'core-integration', label: 'Platform Integration' },
    { id: 'core-tradeoffs', label: 'Tradeoffs' },
    { id: 'core-antipatterns', label: 'Common Mistakes' },
    { id: 'core-decision', label: 'Decision Checklist' },
    { id: 'core-advanced', label: 'Advanced Capabilities' },
  ],
  examples: examples.map((example, index) => ({
    id: `example-${index + 1}`,
    label: example.title,
  })),
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function GCPCloudStoragePage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'GCP Cloud Storage',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="GCP Cloud Storage"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">GCP Cloud Storage</h1>
      <p className="bin98-doc-subtitle">
        Managed object storage for files, blobs, archives, assets, and data lake workloads
      </p>
      <p>
        This page is intentionally detailed. It is meant to read like a compact Cloud Storage
        manual: what the service is, how buckets and objects work, and which design choices matter
        for access control, lifecycle, recovery, performance, and cost.
      </p>

      {activeTab === 'big-picture' && (
        <>
          {bigPictureSections.map((section, index) => (
            <section key={section.id} id={section.id} className="bin98-section">
              <h2 className="bin98-heading">{section.title}</h2>
              {'paragraphs' in section &&
                section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {'bullets' in section && (
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
              {'paragraphs' in section &&
                section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {'bullets' in section && (
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
          {examples.map((example, index) => (
            <section key={example.title} id={`example-${index + 1}`} className="bin98-section">
              <h2 className="bin98-heading">{example.title}</h2>
              <div className="bin98-codebox">
                <code>{example.code}</code>
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
