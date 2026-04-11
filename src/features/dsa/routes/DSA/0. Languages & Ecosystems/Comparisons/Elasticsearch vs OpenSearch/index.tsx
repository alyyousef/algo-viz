import { Link } from 'react-router-dom'

import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const pageTitle = 'Elasticsearch vs OpenSearch'
const pageSubtitle =
  'Comparing Elasticâ€™s current search platform with the Apache-2.0 OpenSearch fork.'
const bigPictureSections = [
  {
    title: 'What both products are',
    paragraphs: [
      'Elasticsearch and OpenSearch are distributed search and analytics engines built on Apache Lucene. Both organize data into indices, shard data across nodes, replicate for resilience, expose REST APIs, and support common patterns such as full-text search, aggregations, filtering, log analytics, and vector or semantic retrieval.',
      'At a distance they can look interchangeable because they share a common ancestry and many familiar concepts. In practice, they are no longer the same product family, and the differences that matter most usually appear in governance, licensing, ecosystem alignment, client compatibility, migration paths, and long-term platform direction.',
    ],
  },
  {
    title: 'Why this comparison is tricky',
    paragraphs: [
      'There are really three different things people often blur together: older Apache-2.0 Elasticsearch OSS releases up to 7.10.2, Elasticâ€™s current Elasticsearch distributions and source licensing model, and the OpenSearch project that forked from the last Apache-2.0 Elasticsearch OSS code line.',
      'If those distinctions are not made explicitly, architecture discussions become confused. A team may think it is comparing two search engines when it is actually comparing a commercial distribution strategy, an open-source project, and a migration path that depends heavily on which version family is currently in production.',
    ],
  },
  {
    title: 'What changed historically',
    paragraphs: [
      'In 2021, Elastic changed the licensing approach for Elasticsearch and Kibana source code beginning with version 7.11. Elasticâ€™s official FAQ states that the Apache-2.0-licensed source code moved to dual licensing under SSPL 1.0 and Elastic License 2.0, while the default distribution continued under Elastic License 2.0.',
      'OpenSearch was announced in January 2021 as an open-source fork of Elasticsearch and Kibana, and the OpenSearch project states that OpenSearch 1.0 was released in July 2021 under Apache License 2.0. That fork point matters because it explains why older APIs and concepts overlap while newer features, clients, plugins, and ecosystem assumptions continue to diverge.',
    ],
  },
  {
    title: 'What changed again in 2024',
    paragraphs: [
      'On August 29, 2024, Elastic announced that it was adding AGPLv3 as an option for the free portions of the Elasticsearch and Kibana source code. Elastic also states that this did not change the licensing of its default binary distributions, which remain under Elastic License 2.0.',
      'This means the old oversimplified statement that â€œElasticsearch is not open source anymoreâ€ is no longer precise enough. The current reality is more nuanced: portions of the source code are available under AGPLv3, SSPL, and ELv2, while the default distributions still follow Elasticâ€™s distribution model rather than Apache 2.0.',
    ],
  },
  {
    title: 'What changed for OpenSearch governance',
    paragraphs: [
      'OpenSearch positions itself as a community-driven Apache-2.0 project. The project site states that OpenSearch is fully open source and that the OpenSearch Software Foundation is a Linux Foundation project organized to support the ecosystem and its long-term sustainability.',
      'That governance distinction matters because some teams care as much about who controls roadmap, licensing, and ecosystem rules as they care about technical features. For those teams, the comparison is not just search engine versus search engine. It is vendor-controlled distribution strategy versus Linux-Foundation-backed Apache-2.0 project governance.',
    ],
  },
  {
    title: 'Short version',
    paragraphs: [
      'Choose Elasticsearch when you want to align directly with Elasticâ€™s current product direction, client ecosystem, search and AI feature packaging, and commercial platform model. Choose OpenSearch when you want an Apache-2.0 project, Linux Foundation governance, and a roadmap centered on OpenSearch and its surrounding open ecosystem.',
      'The wrong way to decide is to treat this as a minor syntax comparison. The important question is which project model, compatibility story, and long-term operating environment your team actually wants to live with.',
    ],
  },
]

const decisionGuide: Array<{ title: string; choice: string }> = [
  {
    title:
      'Need direct alignment with Elasticâ€™s current distributions, docs, and official clients',
    choice: 'Prefer Elasticsearch.',
  },
  {
    title:
      'Need an Apache-2.0 project with open community governance and broad redistribution freedom',
    choice: 'Prefer OpenSearch.',
  },
  {
    title:
      'Already run modern post-7.11 Elasticsearch in production and depend on current Elastic features',
    choice:
      'Staying on Elasticsearch is usually operationally simpler than forcing a fork migration.',
  },
  {
    title:
      'Already run Elasticsearch OSS 6.x or 7.10.2 and want to move toward the OpenSearch ecosystem',
    choice: 'OpenSearch is a natural migration target.',
  },
  {
    title:
      'Need strong confidence that official server and official client versions evolve together under one vendor roadmap',
    choice: 'Prefer Elasticsearch.',
  },
  {
    title:
      'Need to avoid depending on Elastic distribution terms for the server distribution you run',
    choice: 'Prefer OpenSearch.',
  },
  {
    title: 'Need to standardize on Amazon OpenSearch Service or the broader OpenSearch toolchain',
    choice: 'Prefer OpenSearch.',
  },
  {
    title:
      'Need to maximize continuity with the latest Elastic search and AI documentation and release train',
    choice: 'Prefer Elasticsearch.',
  },
  {
    title: 'Need the smallest migration risk from current Elastic production systems',
    choice:
      'Usually stay with Elasticsearch unless there is a strong governance or cost reason to move.',
  },
  {
    title:
      'Need the strongest guarantee that the project remains fully Apache-2.0 at the distribution level',
    choice: 'Prefer OpenSearch.',
  },
]

const historyAndDirection: string[] = [
  'Elasticsearch OSS up to 7.10.2 and OpenSearch share a common technical ancestry, which is why much terminology and many APIs still feel familiar across both systems.',
  'The fork happened in 2021, so compatibility assumptions weaken the farther you move away from that point. Newer client libraries, plugins, security features, vector workflows, and administrative tooling should not be assumed to be interchangeable.',
  'Elasticâ€™s 2024 AGPL move materially changed the licensing conversation around source availability, but it did not remove the need to distinguish source-code licensing from default-distribution licensing.',
  'OpenSearchâ€™s Linux Foundation support and Apache-2.0 positioning make it attractive for teams whose platform strategy is driven by governance and redistribution freedom as much as by raw search capability.',
]

const decisionQuestions: string[] = [
  'Are you comparing current Elasticsearch to OpenSearch, or are you actually comparing older Elasticsearch OSS to OpenSearch?',
  'Do you need current Elastic-specific features and official client alignment, or do you primarily need a Lucene-based search engine with open governance?',
  'If you run Elasticsearch today, which exact version family are you on: OSS 7.10.2 or lower, or Elastic 7.11 and later?',
  'Will your team tolerate migration work around clients, plugins, dashboards, and operational procedures, or is platform continuity more important?',
  'Do legal, procurement, or platform-governance constraints make Apache-2.0 distribution requirements a first-class decision factor?',
  'Are you choosing a search engine, or are you also choosing a broader product ecosystem for observability, security, AI retrieval, and operations?',
]

const coreConceptSections: Array<{ id: string; heading: string; paragraphs: string[] }> = [
  {
    id: 'core-foundation',
    heading: 'Common Technical Foundation',
    paragraphs: [
      'Both products are distributed Lucene-based engines. They index JSON documents, support full-text search, filtering, aggregations, relevance tuning, shards, replicas, cluster APIs, snapshot workflows, and the general operational model that search teams expect from the Elasticsearch family of systems.',
      'That shared foundation is why developers moving between them often feel immediately comfortable. The hard part is not learning what an index or shard is. The hard part is understanding where the projects have intentionally stopped being the same thing.',
    ],
  },
  {
    id: 'core-governance',
    heading: 'Governance and Project Control',
    paragraphs: [
      'Elasticsearch is developed by Elastic and follows Elasticâ€™s product strategy, release packaging, and licensing decisions. That can be beneficial when a team wants a strong single-vendor story, clear product ownership, and direct alignment with Elasticâ€™s broader platform direction.',
      'OpenSearch is presented as a community-driven project. The OpenSearch site states that the OpenSearch Software Foundation is part of the Linux Foundation and that technical governance is handled through project governance rather than vendor-only control. Teams that care about neutral project stewardship often see this as a major differentiator.',
    ],
  },
  {
    id: 'core-licensing',
    heading: 'Licensing and Distribution Reality',
    paragraphs: [
      'Licensing is where many superficial comparisons fail. Elasticsearch source code history and Elasticsearch distribution history are not identical. Elasticâ€™s FAQ explains that in 2021 source code moved away from Apache 2.0, and in 2024 AGPLv3 was added as an option for the free portions of the source code. Elastic also explicitly states that the default distribution remains under Elastic License 2.0.',
      'OpenSearch presents a simpler story: the project and distribution are Apache 2.0. If your organization needs a clean Apache-2.0 distribution story, OpenSearch is easier to reason about. If your organization is comfortable with Elasticâ€™s licensing and wants Elasticâ€™s current distribution, then Elasticsearch remains a straightforward choice.',
    ],
  },
  {
    id: 'core-version-lineage',
    heading: 'Version Lineage and Fork Boundary',
    paragraphs: [
      'OpenSearch documentation repeatedly anchors compatibility conversations to Elasticsearch OSS 7.10.2, because that was the last Apache-2.0 Elasticsearch OSS release before the fork line became permanent. This is not trivia. It is the practical boundary for many migration and compatibility assumptions.',
      'Once you move into later Elasticsearch versions, you are no longer evaluating close siblings. You are evaluating products that may still rhyme at the API level while differing materially in clients, packaging, integrations, feature shape, and operational tooling.',
    ],
  },
  {
    id: 'core-api',
    heading: 'API Compatibility and Divergence',
    paragraphs: [
      'Many common REST patterns still look familiar across both systems because the fork started from a shared codebase. That can make early proofs of concept deceptively easy. However, OpenSearchâ€™s current client documentation warns that although older Elasticsearch OSS clients may work with OpenSearch 1.x, no Elasticsearch clients are fully compatible with OpenSearch 2.0 and later.',
      'This means teams should not treat apparent API similarity as a long-term contract. For greenfield systems, the safer practice is to use Elasticsearch clients with Elasticsearch and OpenSearch clients with OpenSearch.',
    ],
  },
  {
    id: 'core-clients',
    heading: 'Client Libraries and SDK Strategy',
    paragraphs: [
      'Elastic maintains official Elasticsearch clients and documents forward compatibility for its own version line. That makes Elasticsearch attractive when your application architecture depends heavily on official client support, current language SDKs, and tight server-client version expectations.',
      'OpenSearch also maintains official clients in major languages, but its docs are explicit that mixing modern Elasticsearch clients with OpenSearch carries risk. That matters in real systems because transport assumptions, version checks, and newer APIs often fail first in clients before they fail in raw HTTP experiments.',
    ],
  },
  {
    id: 'core-search',
    heading: 'Search and Query Model',
    paragraphs: [
      'At the core search layer, both products still support the classic capabilities that made the Elasticsearch ecosystem popular: keyword and full-text queries, analyzers, tokenization, relevance tuning, aggregations, faceting-like patterns, filtering, and operational search APIs.',
      'The strategic difference is less about whether either engine can execute a text query and more about which project you want to rely on for future search features, documentation, ranking workflows, AI retrieval features, and surrounding platform integrations.',
    ],
  },
  {
    id: 'core-vector',
    heading: 'Vector Search and AI Direction',
    paragraphs: [
      'Both products now position vector search as a major part of their roadmap. Elasticâ€™s documentation highlights `dense_vector`, `sparse_vector`, and `semantic_text`, and describes vector search as part of modern AI-driven retrieval. Elastic also highlights ELSER and higher-level semantic workflows.',
      'OpenSearch documentation positions vector search as a complete vector database solution and uses features such as neural queries, ML model integration, and hybrid search. The practical takeaway is not that one side has vectors and the other does not. The practical takeaway is that each ecosystem is evolving its own AI-search conventions, APIs, and surrounding tooling.',
    ],
  },
  {
    id: 'core-platform',
    heading: 'Broader Platform Direction',
    paragraphs: [
      'Elastic clearly presents Elasticsearch as part of a broader Elastic platform spanning search, observability, and security. For some teams that is a major advantage because procurement, operations, training, and UI workflows can align around one vendor platform.',
      'OpenSearch also presents itself as more than a plain search engine. Its official platform pages emphasize search, observability, security analytics, vector search, Dashboards, Data Prepper, and related tooling. The difference is not that one has a platform and the other does not. The difference is whose platform strategy you want to adopt.',
    ],
  },
  {
    id: 'core-operations',
    heading: 'Operations, Backups, and Cluster Management',
    paragraphs: [
      'Both systems require serious operational discipline. Shard design, cluster sizing, hot spots, index lifecycle strategy, snapshot repositories, disaster recovery, upgrades, and query performance tuning still matter regardless of branding.',
      'Elasticâ€™s snapshot documentation stresses that snapshots are the supported backup mechanism and that filesystem-level copies are not a supported recovery path. OpenSearch likewise documents structured migration and upgrade paths. Operationally, neither product should be treated as a zero-admin black box just because the API looks familiar.',
    ],
  },
  {
    id: 'core-plugins',
    heading: 'Plugins, Extensions, and Ecosystem Assumptions',
    paragraphs: [
      'Both products are extensible, but teams should not assume plugin compatibility across the fork boundary. A plugin or extension model that works in one ecosystem may require porting, replacement, or a completely different operational approach in the other.',
      'This matters most when your search platform is not merely an API backend but part of a larger observability, analytics, or retrieval stack. The more custom the environment becomes, the more expensive a fork-crossing migration usually becomes.',
    ],
  },
  {
    id: 'core-migration',
    heading: 'Migration Paths and Upgrade Reality',
    paragraphs: [
      'OpenSearch documentation provides practical migration guidance for Elasticsearch OSS 5.x, 6.x, and 7.x, and also describes migration approaches for post-fork Elasticsearch versions using tools such as Logstash and Migration Assistant. That is useful, but it should not be misread as a guarantee that migration is trivial.',
      'Migration across the fork is usually part data move, part API verification, part client replacement, part operational re-learning, and part ecosystem cleanup. The cluster can migrate faster than the organizationâ€™s habits, dashboards, pipelines, and incident response workflows.',
    ],
  },
  {
    id: 'core-managed',
    heading: 'Self-Managed Versus Managed-Service Thinking',
    paragraphs: [
      'Do not confuse the OpenSearch project with Amazon OpenSearch Service, even though the service is a major distribution path for many teams. Likewise, do not confuse Elasticsearch the engine with Elastic Cloud the managed service. A search-engine decision and a managed-service decision overlap, but they are not identical.',
      'Teams evaluating hosted offerings should separate engine-level questions from service-level questions. Engine compatibility, source licensing, and client behavior are one layer. Hosted-service operations, IAM models, billing, and operational controls are another.',
    ],
  },
  {
    id: 'core-cost',
    heading: 'Cost, Procurement, and Organizational Fit',
    paragraphs: [
      'The cost story is not only about infrastructure. It also includes legal review, procurement friction, migration effort, existing staff familiarity, client-library churn, plugin replacements, and the amount of platform-specific knowledge the team must maintain.',
      'Some organizations save money by aligning tightly with Elasticâ€™s integrated platform. Others save money by standardizing on an Apache-2.0 stack and keeping more control over redistribution and platform choice. The correct answer depends on which costs dominate in your environment.',
    ],
  },
  {
    id: 'core-recommendations',
    heading: 'What Usually Matters Most',
    paragraphs: [
      'For most real teams, the deciding factors are not whether both products can run a term query or an aggregation. The deciding factors are current version lineage, legal and governance requirements, ecosystem lock-in tolerance, migration appetite, and whether the team wants to follow Elasticâ€™s roadmap or the OpenSearch roadmap.',
      'Once those questions are answered honestly, the technical choice often becomes much clearer than the internet debate makes it seem.',
    ],
  },
]

const operatingNotes: Array<{ title: string; detail: string }> = [
  {
    title: 'Version names are not enough',
    detail:
      'When someone says â€œwe use Elasticsearch,â€ the first follow-up should be which exact version family and distribution they mean. That answer changes the migration and compatibility discussion immediately.',
  },
  {
    title: 'Source-code openness and distribution openness are different questions',
    detail:
      'Elasticâ€™s 2024 AGPL change matters, but it does not erase the need to distinguish source-code licensing from the default Elasticsearch distribution model.',
  },
  {
    title: 'Shared ancestry does not guarantee future compatibility',
    detail:
      'Forks diverge over time. Clients, plugins, operational tooling, and newer features are where that divergence usually becomes visible first.',
  },
  {
    title: 'Search capability is not the only decision axis',
    detail:
      'Governance, procurement, client strategy, managed-service alignment, and migration risk often matter more than raw search features.',
  },
  {
    title: 'Do not under-budget migration testing',
    detail:
      'Even when data migration works, search relevance, pipelines, clients, dashboards, and alerting workflows may behave differently enough to require substantial verification.',
  },
  {
    title: 'Use native clients for the chosen engine',
    detail:
      'OpenSearch explicitly recommends OpenSearch clients for OpenSearch. The safest long-term pattern is not to depend on cross-project client luck.',
  },
]

const workloadFitCases: Array<{ title: string; detail: string }> = [
  {
    title: 'Search-heavy application already built around current Elastic clients and workflows',
    detail:
      'Elasticsearch is usually the lower-risk choice because the team keeps server, client, and documentation alignment inside the same ecosystem.',
  },
  {
    title: 'Team standardizing on Apache-2.0 infrastructure components',
    detail:
      'OpenSearch is often the better fit because the governance and distribution model align with that policy objective directly.',
  },
  {
    title: 'Legacy Elasticsearch OSS cluster needing a future path',
    detail:
      'OpenSearch is frequently the natural destination because its migration guidance explicitly addresses OSS lineage and compatibility scenarios around 7.10.2.',
  },
  {
    title: 'Organization using search as one part of a larger Elastic platform strategy',
    detail:
      'Elasticsearch may be the stronger fit if search, observability, and security are being intentionally procured and operated as one Elastic-centric platform.',
  },
  {
    title:
      'Team valuing community governance and redistribution flexibility over single-vendor packaging',
    detail:
      'OpenSearch is usually the stronger fit because the project story is cleaner around Apache 2.0 and Linux Foundation support.',
  },
  {
    title: 'Team assuming migration is simple because both use Lucene and similar JSON APIs',
    detail:
      'Neither is automatically a good fit for that assumption. The team needs a more serious migration plan before choosing.',
  },
]

const pitfalls: string[] = [
  'Using â€œElasticsearchâ€ to mean both older Elasticsearch OSS and current Elastic distributions without distinguishing the difference.',
  'Assuming Elasticsearch and OpenSearch are still close enough that client compatibility can be treated as a minor issue.',
  'Reducing the decision to licensing slogans without checking how your organization actually uses server binaries, source code, plugins, or managed services.',
  'Assuming a successful `_search` smoke test proves production compatibility.',
  'Ignoring migration effort around dashboards, pipelines, alerting, SDKs, and platform conventions.',
  'Choosing a platform based only on current familiarity rather than the roadmap and governance model you want to live with for years.',
  'Confusing the OpenSearch project with Amazon OpenSearch Service, or Elasticsearch with Elastic Cloud, during architecture discussions.',
  'Assuming vector-search support means the AI-search experience, APIs, and workflows are equivalent across both ecosystems.',
]

const examples: Array<{ id: string; title: string; code: string; explanation: string }> = [
  {
    id: 'ex-elastic-vector',
    title: 'Elasticsearch vector search shape',
    code: `Elasticsearch docs highlight several search-oriented paths:

field types:
  dense_vector
  sparse_vector
  semantic_text

query styles:
  knn
  sparse_vector
  semantic`,
    explanation:
      'Elasticâ€™s current docs present multiple vector and semantic retrieval paths rather than a single one-size-fits-all API.',
  },
  {
    id: 'ex-opensearch-neural',
    title: 'OpenSearch neural query shape',
    code: `GET /neural_search_pqa/_search
{
  "size": 5,
  "query": {
    "neural": {
      "question_vector": {
        "query_text": "what does the package contain?",
        "model_id": "<model_id>",
        "k": 5
      }
    }
  }
}`,
    explanation:
      'This is the kind of neural-search pattern shown in the current OpenSearch vector-search documentation.',
  },
  {
    id: 'ex-client-boundary',
    title: 'Client boundary rule of thumb',
    code: `Elasticsearch server
  -> use Elastic clients

OpenSearch server
  -> use OpenSearch clients

Shared ancestry is not a long-term compatibility contract.`,
    explanation:
      'This is the practical operational rule suggested by the direction of current OpenSearch client guidance.',
  },
  {
    id: 'ex-compatibility-mode',
    title: 'OpenSearch compatibility setting for older tooling',
    code: `PUT _cluster/settings
{
  "persistent": {
    "compatibility": {
      "override_main_response_version": true
    }
  }
}`,
    explanation:
      'OpenSearch documents this setting as an intermediate compatibility aid for some older tools that expect version 7.10.2 behavior.',
  },
  {
    id: 'ex-migration-path',
    title: 'Migration boundary shortcut',
    code: `Elasticsearch OSS 6.x or 7.10.2
  -> OpenSearch migration paths are directly documented

Elasticsearch 7.11+
  -> treat migration as post-fork migration
  -> plan for data, clients, pipelines, and validation work`,
    explanation:
      'The fork boundary is the highest-signal migration fact to keep in mind before planning anything else.',
  },
  {
    id: 'ex-backup-principle',
    title: 'Backup principle shared by serious search clusters',
    code: `Do:
  snapshot repositories
  tested restore procedures

Do not assume:
  raw filesystem copies
  ad hoc node-level backups
  untested disaster recovery`,
    explanation:
      'Elasticâ€™s documentation is explicit that snapshots are the supported backup path, and the same disciplined mindset applies when operating OpenSearch.',
  },
]

const glossaryTerms: Array<{ term: string; definition: string }> = [
  {
    term: 'Elasticsearch OSS',
    definition:
      'The older Apache-2.0 open-source Elasticsearch release line that ended at version 7.10.2 and forms the technical fork boundary for OpenSearch.',
  },
  {
    term: 'Elastic License 2.0 (ELv2)',
    definition:
      'Elasticâ€™s default distribution license for current Elasticsearch distributions. It is distinct from Apache 2.0 and distinct from the newer AGPL option for parts of the source code.',
  },
  {
    term: 'AGPLv3',
    definition:
      'An OSI-approved open-source license that Elastic added in 2024 as an option for the free portions of the Elasticsearch and Kibana source code.',
  },
  {
    term: 'SSPL',
    definition:
      'A source-available license that Elastic introduced alongside ELv2 for source-code licensing in 2021.',
  },
  {
    term: 'OpenSearch',
    definition:
      'A community-driven Apache-2.0 search and analytics suite forked from Elasticsearch and Kibana in 2021.',
  },
  {
    term: 'OpenSearch Software Foundation',
    definition:
      'The Linux Foundation project organized to support the long-term sustainability of the OpenSearch ecosystem.',
  },
  {
    term: 'Fork boundary',
    definition:
      'The practical point where Elasticsearch and OpenSearch stopped being one code line. For most migration and compatibility discussions, that boundary centers on Elasticsearch OSS 7.10.2 and the 2021 fork.',
  },
  {
    term: 'Vector search',
    definition:
      'Similarity search over embeddings. Both Elasticsearch and OpenSearch now support vector-oriented search flows, but with different APIs, surrounding features, and ecosystem conventions.',
  },
  {
    term: 'semantic_text',
    definition:
      'An Elasticsearch field type documented by Elastic as a higher-level abstraction for semantic search workflows.',
  },
  {
    term: 'Neural query',
    definition:
      'An OpenSearch query style used in its vector-search documentation for semantic retrieval using embeddings and model IDs.',
  },
  {
    term: 'Migration Assistant',
    definition:
      'An OpenSearch migration toolkit designed to help move Elasticsearch and OpenSearch workloads toward OpenSearch managed clusters with lower migration risk.',
  },
  {
    term: 'Client compatibility',
    definition:
      'The practical question of whether language SDKs, version checks, and request assumptions still work across the fork. This is one of the first places real divergence shows up.',
  },
  {
    term: 'Snapshot repository',
    definition:
      'The supported backup and restore mechanism used for serious cluster backup workflows. Elastic explicitly documents snapshots as the supported path for Elasticsearch backups.',
  },
  {
    term: 'Data Prepper',
    definition:
      'An OpenSearch server-side data collector used to enrich, transform, and route data into OpenSearch.',
  },
  {
    term: 'Managed service',
    definition:
      'A hosted service layer such as Elastic Cloud or Amazon OpenSearch Service. Managed-service choices overlap with engine choices but should not be confused with them.',
  },
]

const pageSources: string[] = [
  'https://www.elastic.co/pricing/faq/licensing',
  'https://ir.elastic.co/news/news-details/2024/Elastic-Announces-Open-Source-License-for-Elasticsearch-and-Kibana-Source-Code/default.aspx',
  'https://www.elastic.co/docs/solutions/search/vector',
  'https://www.elastic.co/docs/reference/elasticsearch-clients',
  'https://www.elastic.co/guide/en/elasticsearch/reference/current/snapshot-restore.html',
  'https://opensearch.org/about/',
  'https://opensearch.org/foundation/',
  'https://docs.opensearch.org/latest/vector-search/',
  'https://docs.opensearch.org/3.0/clients/',
  'https://docs.opensearch.org/latest/tools/',
  'https://docs.opensearch.org/latest/migrate-or-upgrade/migration-assistant/',
  'https://docs.opensearch.org/2.17/upgrade-to/upgrade-to/',
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
    { id: 'bp-decision', label: 'Decision Guide' },
    { id: 'bp-history', label: 'History and Direction' },
    { id: 'bp-questions', label: 'Decision Questions' },
  ],
  'core-concepts': [
    { id: 'core-foundation', label: 'Common Foundation' },
    { id: 'core-governance', label: 'Governance' },
    { id: 'core-licensing', label: 'Licensing' },
    { id: 'core-version-lineage', label: 'Fork Boundary' },
    { id: 'core-api', label: 'API Compatibility' },
    { id: 'core-clients', label: 'Clients' },
    { id: 'core-search', label: 'Search Model' },
    { id: 'core-vector', label: 'Vector and AI' },
    { id: 'core-platform', label: 'Platform Direction' },
    { id: 'core-operations', label: 'Operations' },
    { id: 'core-plugins', label: 'Plugins' },
    { id: 'core-migration', label: 'Migration' },
    { id: 'core-managed', label: 'Managed Services' },
    { id: 'core-cost', label: 'Cost and Fit' },
    { id: 'core-recommendations', label: 'What Matters Most' },
    { id: 'core-notes', label: 'Operating Notes' },
    { id: 'core-workload-fit', label: 'Workload Fit' },
    { id: 'core-pitfalls', label: 'Pitfalls' },
  ],
  examples: examples.map((example) => ({
    id: example.id,
    label: example.title,
  })),
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function ElasticsearchVsOpenSearchPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Elasticsearch Vs Open Search Page',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Elasticsearch Vs Open Search Page"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">{pageTitle}</h1>
      <p className="bin98-subheading">{pageSubtitle}</p>
      <p>
        This page compares current Elasticsearch and OpenSearch as platform choices, not just as
        similar-looking REST APIs. The highest-signal questions are version lineage, licensing and
        governance, client compatibility, migration risk, and which project roadmap your team wants
        to follow.
      </p>
      <p>
        The title-bar minimize control returns to the previous page when possible, or to{' '}
        <Link to="/algoViz" className="es-os-help-inline-link">
          /algoViz
        </Link>{' '}
        when there is no prior history entry.
      </p>

      {activeTab === 'big-picture' && (
        <>
          <section id="bp-overview" className="bin98-section">
            <h2 className="bin98-heading">Overview</h2>
            {bigPictureSections.map((section) => (
              <div key={section.title}>
                <h3 className="bin98-subheading">{section.title}</h3>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            ))}
          </section>
          <hr className="bin98-divider" />
          <section id="bp-decision" className="bin98-section">
            <h2 className="bin98-heading">Decision Guide</h2>
            <ul>
              {decisionGuide.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}:</strong> {item.choice}
                </li>
              ))}
            </ul>
          </section>
          <hr className="bin98-divider" />
          <section id="bp-history" className="bin98-section">
            <h2 className="bin98-heading">History and Direction</h2>
            <ul>
              {historyAndDirection.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <hr className="bin98-divider" />
          <section id="bp-questions" className="bin98-section">
            <h2 className="bin98-heading">Decision Questions</h2>
            <ul>
              {decisionQuestions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {activeTab === 'core-concepts' && (
        <>
          {coreConceptSections.map((section) => (
            <section key={section.id} id={section.id} className="bin98-section">
              <h2 className="bin98-heading">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}

          <section id="core-notes" className="bin98-section">
            <h2 className="bin98-heading">Operating Notes</h2>
            {operatingNotes.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-workload-fit" className="bin98-section">
            <h2 className="bin98-heading">Workload Fit by Scenario</h2>
            {workloadFitCases.map((item) => (
              <p key={item.title}>
                <strong>{item.title}:</strong> {item.detail}
              </p>
            ))}
          </section>

          <section id="core-pitfalls" className="bin98-section">
            <h2 className="bin98-heading">Common Pitfalls</h2>
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
            <section key={example.id} id={example.id} className="bin98-section">
              <h2 className="bin98-heading">{example.title}</h2>
              <div className="bin98-codebox">
                <code>{example.code.trim()}</code>
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
          <h3 className="bin98-subheading">Primary Source Set</h3>
          <ul>
            {pageSources.map((source) => (
              <li key={source}>
                <a
                  href={source}
                  className="es-os-help-inline-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  {source}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </TopicPageShell>
  )
}
