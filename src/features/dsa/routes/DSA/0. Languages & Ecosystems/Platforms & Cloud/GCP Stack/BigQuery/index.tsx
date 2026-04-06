import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const MINIMIZED_HELP_TASKS_KEY = 'win96:minimized-help-tasks'

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
      'BigQuery is Google Cloud\'s managed analytical data warehouse. The simplest mental model is that it gives you warehouse-scale SQL without asking you to provision, patch, or tune traditional database servers.',
      'It is built for analytical workloads: large scans, aggregations, joins, time slicing, dashboard backends, transformation pipelines, and shared reporting over very large datasets. It is not mainly designed as an OLTP application database.',
      'Adopting BigQuery usually means adopting a warehouse operating model. The operational center of gravity moves away from servers and toward datasets, schemas, table design, governance, performance review, and query cost discipline.',
    ],
  },
  {
    id: 'bp-why',
    title: 'Why it matters',
    paragraphs: [
      'Analytical platforms usually become difficult at the point where both data volume and user count increase together. A system that works for one analyst and a few tables becomes much harder to manage when many teams, dashboards, and pipelines need the same warehouse.',
      'BigQuery matters because it packages several hard problems into one platform: large-scale SQL execution, durable analytical storage, job management, ecosystem integration, and governance controls that support shared use across many consumers.',
      'In a typical GCP stack, it becomes the central analytical layer. Raw data lands from applications, files, or event streams; transformations build curated tables; then dashboards, analysts, machine learning workflows, and data products consume those curated models.',
    ],
  },
  {
    id: 'bp-fit',
    title: 'Where it fits best',
    paragraphs: [
      'BigQuery is strongest for warehouse and lakehouse-style analysis: product analytics, clickstream analysis, finance reporting, data marts, ad hoc exploration, ELT pipelines, machine-learning feature preparation, and organization-wide reporting.',
      'It is also a strong fit when a team wants SQL as the main interface and prefers to spend time on data modeling rather than instance management. Analysts and engineers can query, schedule, automate, and share warehouse logic through one managed system.',
      'It is a weaker fit for row-at-a-time transactional application behavior. If a workload depends on frequent small writes, OLTP transactions, or low-latency record serving, a transactional database is usually the better primary system.',
    ],
  },
  {
    id: 'bp-workflow',
    title: 'Typical workflow',
    paragraphs: [
      'A common warehouse workflow is to land raw data first, either from Cloud Storage files, write APIs, or upstream pipelines. That raw layer then feeds cleaned staging models and curated warehouse tables that standardize business definitions.',
      'Those curated tables become the basis for dashboards, analyst queries, aggregate marts, and downstream exports. In mature systems, teams also add reusable views, materialized views, data quality checks, governance boundaries, and documented semantic definitions.',
      'This matters because BigQuery is not just a place to run isolated SQL. It is an operating surface for data teams. The important questions are not only what query to run, but how data is shaped, protected, reused, and evolved over time.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Key takeaways',
    bullets: [
      'Think of BigQuery as a managed analytical warehouse and SQL platform, not as a transactional application database.',
      'Its main power comes from warehouse-scale SQL, managed operations, and strong integration with the rest of a cloud data platform.',
      'Table design, partitioning, clustering, and governance choices directly affect both performance and cost.',
      'The biggest operational habit is query discipline: reading less data is usually the first and best optimization.',
      'BigQuery becomes more valuable as part of a broader system that includes ingestion, transformation, security, and reporting workflows.',
    ],
  },
]

const mentalModels = [
  {
    title: 'Warehouse first, database second',
    detail:
      'BigQuery behaves like a warehouse platform for analytics, not like a classic transactional row-store. That changes what good design looks like.',
  },
  {
    title: 'Jobs are the unit of work',
    detail:
      'Queries, loads, exports, and copies happen as jobs. Job metadata is important for operations, debugging, and cost awareness.',
  },
  {
    title: 'Scan reduction is a design skill',
    detail:
      'A large part of BigQuery proficiency is learning how to read less data by using good schemas, selective filters, partitioning, clustering, and narrower projections.',
  },
  {
    title: 'Nested data is normal',
    detail:
      'Hierarchical data structures are common in analytical systems. BigQuery supports them directly, so you do not always need to flatten everything into many child tables.',
  },
  {
    title: 'Governance belongs in the warehouse model',
    detail:
      'Access boundaries, row filtering, and sensitive-column handling should be designed into datasets and warehouse objects from the start.',
  },
]

const coreSections: Array<
  | { id: string; title: string; paragraphs: string[] }
  | { id: string; title: string; bullets: string[] }
> = [
  {
    id: 'core-architecture',
    title: 'Architecture and resource model',
    paragraphs: [
      'The main hierarchy is project, dataset, and objects such as tables, views, materialized views, routines, and models. Projects establish billing and administrative boundaries. Datasets organize warehouse objects. Tables and views represent the main analytical surfaces.',
      'BigQuery is job-oriented. Query execution happens as query jobs; ingestion can happen as load jobs or write operations; exports and copies are tracked separately. This makes the warehouse easier to automate, monitor, and reason about at scale.',
      'In practice, teams often structure datasets by lifecycle or trust level, such as raw, staging, curated, and presentation layers. That makes warehouse responsibilities clearer and helps prevent accidental mixing of source fidelity with business-ready reporting logic.',
    ],
  },
  {
    id: 'core-storage',
    title: 'Storage model and table design',
    paragraphs: [
      'Warehouse tables are the core storage abstraction. Good design begins with grain: what does one row represent? One event, one line item, one daily snapshot, one customer version, or one aggregated fact. Grain clarity makes the rest of the schema easier to reason about.',
      'Unlike OLTP design, warehouse tables often tolerate denormalization because analytical users care more about easy reading and efficient scans than about eliminating every repeated attribute. BigQuery supports that style well.',
      'The design tradeoff is always between simplicity, flexibility, and cost. A table that is easy to query usually wins over a theoretically elegant model that forces many expensive joins for ordinary questions.',
    ],
  },
  {
    id: 'core-sql',
    title: 'GoogleSQL and warehouse querying',
    paragraphs: [
      'The main interface is GoogleSQL. Day-to-day usage includes projections, filters, joins, common table expressions, aggregations, DDL, DML, window functions, and array-handling patterns.',
      'Warehouse users rely heavily on analytical SQL features. Window functions support ranking, deduplication, latest-row selection, and rolling metrics. `QUALIFY` makes window-based filtering much easier to express cleanly.',
      'The language also supports data-definition work such as creating tables, views, and materialized views, as well as scripting and procedural logic for multi-step jobs.',
    ],
  },
  {
    id: 'core-modeling',
    title: 'Schemas, nested data, and modeling patterns',
    paragraphs: [
      'A BigQuery schema is not only a technical artifact. It is the business contract of the warehouse object. Field names, types, nullability, and nesting decisions shape how safely and efficiently people can use the data.',
      'Nested and repeated structures are particularly important. Orders with many line items, events with parameter arrays, and profiles with structured attributes can be modeled directly instead of being exploded into many flat tables immediately.',
      'The best model depends on the questions the warehouse must answer. If most users analyze order-level summaries, keep that access path simple. If many analyses need repeated child detail, expose it in a way that is easy to `UNNEST` deliberately.',
    ],
  },
  {
    id: 'core-partition',
    title: 'Partitioning and clustering',
    paragraphs: [
      'Partitioning is one of the most important controls in BigQuery because it helps the engine skip irrelevant slices of a table. If most queries filter by date, a date partition is often the single highest-value design decision for that table.',
      'Clustering complements partitioning by improving data locality for selected columns within partitions or table segments. It is useful when analysts repeatedly filter, group, or join on a small set of important dimensions.',
      'A simple design rule is to partition by a highly common time field and cluster by secondary dimensions that offer selective analytical value. Over-clustering or picking weak keys adds complexity without much benefit.',
    ],
  },
  {
    id: 'core-ingestion',
    title: 'Ingestion patterns and write paths',
    paragraphs: [
      'Data commonly arrives through batch loads, streaming or near-real-time writes, or external-table access. Each path has different implications for freshness, cost, reliability, and downstream modeling.',
      'Batch loads from files are often the cleanest approach for periodic pipelines. Raw files land in Cloud Storage, then load jobs import them into staging or warehouse tables. This is simple, auditable, and usually efficient for large batches.',
      'Streaming or write-API patterns support fresher analytics but require more care around schema evolution, deduplication, and late-arriving events. The closer you move toward real-time analytics, the more operational design matters.',
    ],
  },
  {
    id: 'core-transforms',
    title: 'Transformation and warehouse-building',
    paragraphs: [
      'BigQuery is often used as the place where raw data becomes business-ready data. Teams write scheduled queries, orchestrated transformations, or framework-managed models that convert source structures into stable facts, dimensions, marts, and feature tables.',
      'Common warehouse patterns include append-only event facts, incremental `MERGE` maintenance, snapshot tables, deduplication by latest ingestion timestamp, and aggregate models for dashboards.',
      'The key operational principle is layer separation. Raw tables preserve what arrived. Curated tables express trusted business meaning. Presentation layers tailor that meaning for dashboards or specific business consumers.',
    ],
  },
  {
    id: 'core-views',
    title: 'Views, materialized views, and reusable logic',
    paragraphs: [
      'Views help teams encapsulate business logic and expose stable analytical interfaces. They are useful when many users need the same derived logic but should not all rewrite it independently.',
      'Materialized views are helpful when a repeated aggregate or transformation is valuable enough to precompute. They improve reuse and can reduce repeated computational cost for common access patterns.',
      'Reusable logic can also live in routines, stored procedures, and SQL scripts. The goal is not abstraction for its own sake, but stable and understandable warehouse behavior.',
    ],
  },
  {
    id: 'core-lakehouse',
    title: 'External tables, BigLake, and hybrid access',
    paragraphs: [
      'Not all data needs to be copied into native BigQuery tables immediately. External-table patterns allow SQL over data that remains in external storage, especially object storage.',
      'BigLake extends that idea with a more unified governance and query model across lake and warehouse boundaries. This matters for teams that want one analytical surface across multiple storage layers.',
      'The tradeoff is predictability versus flexibility. Native warehouse tables usually offer the best managed experience. External access patterns can accelerate adoption and reduce movement, but they are a design choice rather than a universal default.',
    ],
  },
  {
    id: 'core-security',
    title: 'Security, governance, and sharing',
    paragraphs: [
      'BigQuery governance starts with IAM at project and dataset boundaries, but mature warehouse designs usually go further with authorized views, row-level security, and protection for sensitive columns.',
      'Authorized views expose a controlled analytical surface without handing out broad base-table access. Row-level security restricts which records different users or groups can see. Column-level protection helps isolate PII or regulated attributes.',
      'The key idea is that governance should be structural. Sensitive data should not be sprinkled randomly into every warehouse object without access planning. Shared analytical platforms need access design that scales with team count.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance tuning and query discipline',
    paragraphs: [
      'BigQuery performance tuning is mostly about reducing work. The first question is usually not how to make the engine faster, but how to ask the warehouse to process less data.',
      'Avoid wide `SELECT *` patterns when only a few columns matter. Filter early on partition columns. Avoid exploding repeated fields before they are needed. Reuse curated intermediate tables or aggregates instead of recomputing expensive logic in every consumer query.',
      'When a query is slow or expensive, inspect the work it is doing. Large joins, shuffles, repeated aggregation over raw events, or poor partition usage are often more important than micro-level SQL style details.',
    ],
  },
  {
    id: 'core-cost',
    title: 'Cost control',
    paragraphs: [
      'BigQuery makes it easy to begin querying large datasets, which is a strength, but it means cost management has to be intentional. Analytical freedom without review habits can become expensive quickly.',
      'The high-leverage controls are straightforward: estimate work before running it, limit columns, use partitions well, cluster thoughtfully, avoid redoing the same heavy logic everywhere, and create curated models for repeated business questions.',
      'At a platform level, organizations also choose how they want to pay for analysis: by data processed or by reserved analytical capacity. The right model depends on workload predictability and governance style.',
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Ecosystem and adjacent services',
    paragraphs: [
      'BigQuery is usually paired with Cloud Storage for landing zones, orchestration systems for pipelines, BI tools for reporting, and governance systems for metadata and access management.',
      'It also serves as a foundation for adjacent analytical work such as machine learning, geospatial analysis, and data-serving patterns that depend on warehouse-curated facts.',
      'This ecosystem fit is one of BigQuery\'s strongest traits. The warehouse is valuable not only because it can answer SQL questions, but because it integrates well into the rest of a cloud data platform.',
    ],
  },
  {
    id: 'core-tradeoffs',
    title: 'Use cases, tradeoffs, and compare-and-contrast',
    paragraphs: [
      'Compared with transactional databases like Cloud SQL, BigQuery is better for analytics, large-scale reporting, and shared SQL exploration, but worse for OLTP application behavior and fine-grained transactional workloads.',
      'Compared with raw object storage, BigQuery adds warehouse semantics, reusable analytical objects, structured governance, and a much smoother interface for analysts and BI tools.',
      'Compared with self-managed warehouses, BigQuery removes a large amount of operational toil. The tradeoff is that optimization happens primarily through warehouse design and query practice rather than low-level infrastructure control.',
    ],
  },
  {
    id: 'core-antipatterns',
    title: 'Common mistakes and anti-patterns',
    bullets: [
      'Treating BigQuery like a transactional row-store instead of an analytical warehouse.',
      'Skipping partitioning on tables where almost every query filters by time.',
      'Using `SELECT *` casually on very wide tables or large raw event stores.',
      'Flattening every nested structure prematurely and creating unnecessary join-heavy analytical models.',
      'Mixing raw source fidelity and trusted business logic in the same layer.',
      'Leaving security design until after the warehouse is already widely shared.',
      'Copying the same complex metric logic into many dashboards and ad hoc queries instead of centralizing it.',
    ],
  },
  {
    id: 'core-decision',
    title: 'Decision checklist',
    bullets: [
      'Choose BigQuery when your main need is warehouse-scale analytics, shared SQL access, or large transformation pipelines.',
      'Choose a transactional store instead when the system must support OLTP semantics, row-level write paths, or low-latency operational serving.',
      'Partition by the field most likely to bound common analytical queries.',
      'Cluster when repeated filter or grouping patterns can benefit from better locality.',
      'Model tables around business grain and common questions, not only around source-system shapes.',
      'Treat cost estimation and query review as part of development, not as a later cleanup task.',
    ],
  },
  {
    id: 'core-advanced',
    title: 'Advanced capabilities worth knowing',
    paragraphs: [
      'Once teams mature on BigQuery, they often expand into materialized views, BigQuery ML, geospatial analysis, JSON-heavy schemas, data sharing patterns, lakehouse access through BigLake, and recovery-oriented features such as time travel.',
      'These capabilities matter because successful warehouse platforms tend to grow beyond reporting. The same system becomes a source for experimentation, modeling, feature engineering, governed sharing, and reusable analytical products.',
      'The operational lesson is to design for evolution. Dataset boundaries, naming conventions, modeling standards, and governance choices matter more as the warehouse becomes shared infrastructure.',
    ],
  },
]

const examples = [
  {
    title: 'Create a partitioned and clustered fact table',
    code: `CREATE TABLE analytics.sales_orders (
  order_id STRING,
  customer_id STRING,
  order_ts TIMESTAMP,
  order_date DATE,
  country STRING,
  status STRING,
  order_total NUMERIC
)
PARTITION BY order_date
CLUSTER BY country, status;`,
    explanation:
      'This is a standard warehouse design pattern. Partition on the date field that almost every analysis uses, then cluster by dimensions that appear frequently in filters and summaries.',
  },
  {
    title: 'Query nested order line items with UNNEST',
    code: `SELECT
  order_id,
  item.sku,
  item.quantity,
  item.line_total
FROM analytics.orders_nested,
UNNEST(line_items) AS item
WHERE order_date >= DATE '2026-03-01';`,
    explanation:
      'Nested schemas are a native BigQuery pattern. Instead of splitting every hierarchy into separate tables, you can store repeated detail inside a row and expand it only when analysis needs it.',
  },
  {
    title: 'Deduplicate events with QUALIFY',
    code: `SELECT
  user_id,
  session_id,
  event_ts,
  source
FROM analytics.raw_events
QUALIFY ROW_NUMBER() OVER (
  PARTITION BY user_id, session_id, event_ts
  ORDER BY ingested_at DESC
) = 1;`,
    explanation:
      'This is a common warehouse cleanup pattern. Window functions rank duplicate candidates, and `QUALIFY` keeps only the preferred record without requiring an extra subquery layer.',
  },
  {
    title: 'Incrementally maintain a dimension with MERGE',
    code: `MERGE analytics.customer_dim AS target
USING staging.customer_updates AS source
ON target.customer_id = source.customer_id
WHEN MATCHED THEN
  UPDATE SET
    email = source.email,
    tier = source.tier,
    updated_at = source.updated_at
WHEN NOT MATCHED THEN
  INSERT (customer_id, email, tier, updated_at)
  VALUES (source.customer_id, source.email, source.tier, source.updated_at);`,
    explanation:
      '`MERGE` is central to incremental warehouse maintenance. It lets a pipeline update existing rows and insert new ones in one declarative statement.',
  },
  {
    title: 'Create a materialized view for a common aggregate',
    code: `CREATE MATERIALIZED VIEW analytics.mv_daily_revenue AS
SELECT
  order_date,
  country,
  SUM(order_total) AS gross_revenue,
  COUNT(*) AS orders_count
FROM analytics.sales_orders
GROUP BY order_date, country;`,
    explanation:
      'Materialized views are useful when many consumers repeatedly need the same aggregate. They reduce repeated work and provide a stable summary surface for dashboards and shared reporting.',
  },
  {
    title: 'Estimate bytes processed with a dry run',
    code: `bq query --use_legacy_sql=false --dry_run "
SELECT
  country,
  SUM(order_total) AS gross_revenue
FROM analytics.sales_orders
WHERE order_date BETWEEN DATE '2026-03-01' AND DATE '2026-03-07'
GROUP BY country
"`,
    explanation:
      'Dry runs are one of the best cost-control habits in BigQuery. They let you estimate work before a query actually executes.',
  },
  {
    title: 'Apply row-level access to a shared table',
    code: `CREATE ROW ACCESS POLICY region_policy
ON analytics.sales_orders
GRANT TO ("group:emea-analysts@example.com")
FILTER USING (region = 'EMEA');`,
    explanation:
      'This example shows governance built into the warehouse itself. One shared table can serve multiple audiences while still enforcing different row visibility rules.',
  },
]

const glossaryTerms = [
  {
    term: 'Dataset',
    definition: 'A logical container inside a project that holds tables, views, routines, and related BigQuery objects.',
  },
  {
    term: 'Table',
    definition: 'The primary storage object for analytical data in BigQuery.',
  },
  {
    term: 'Schema',
    definition: 'The structural definition of a table, including field names, types, nullability, and nesting.',
  },
  {
    term: 'Partitioning',
    definition: 'A storage strategy that divides data by a partition key so irrelevant portions of a table can be skipped.',
  },
  {
    term: 'Clustering',
    definition: 'A storage strategy that groups related values for selected columns to improve selective analytical access.',
  },
  {
    term: 'STRUCT',
    definition: 'A nested record type used to store grouped fields inside a single value.',
  },
  {
    term: 'ARRAY',
    definition: 'A repeated collection type used for lists of scalar values or nested records.',
  },
  {
    term: 'UNNEST',
    definition: 'A SQL operation that expands an array into rows so repeated values can be analyzed relationally.',
  },
  {
    term: 'Query job',
    definition: 'The tracked unit of work created when SQL executes in BigQuery.',
  },
  {
    term: 'Materialized view',
    definition: 'A view-like warehouse object that stores precomputed results for repeated query patterns.',
  },
  {
    term: 'Authorized view',
    definition: 'A view used to expose controlled access to underlying data without granting direct access to every base table.',
  },
  {
    term: 'Row-level security',
    definition: 'A governance feature that restricts which rows a user or group can see in a table.',
  },
  {
    term: 'Dry run',
    definition: 'A query estimation mode that reports expected bytes processed without executing the query.',
  },
  {
    term: 'BigLake',
    definition: 'A hybrid data-access pattern that extends governance and SQL access across warehouse and external storage layers.',
  },
  {
    term: 'Time travel',
    definition: 'A recovery-oriented capability that allows access to prior table states within a retention window.',
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
    { id: 'core-mental', label: 'Mental Models' },
    { id: 'core-architecture', label: 'Architecture and Resources' },
    { id: 'core-storage', label: 'Storage Model' },
    { id: 'core-sql', label: 'GoogleSQL' },
    { id: 'core-modeling', label: 'Schemas and Modeling' },
    { id: 'core-partition', label: 'Partitioning and Clustering' },
    { id: 'core-ingestion', label: 'Ingestion Patterns' },
    { id: 'core-transforms', label: 'Transformation Patterns' },
    { id: 'core-views', label: 'Views and Reusable Logic' },
    { id: 'core-lakehouse', label: 'External Data and BigLake' },
    { id: 'core-security', label: 'Security and Governance' },
    { id: 'core-performance', label: 'Performance Tuning' },
    { id: 'core-cost', label: 'Cost Control' },
    { id: 'core-ecosystem', label: 'Ecosystem' },
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

const bigQueryHelpStyles = `
.bigquery-help-page {
  min-height: 100dvh;
  background: #c0c0c0;
  color: #000;
  font-family: "MS Sans Serif", Tahoma, "Segoe UI", sans-serif;
}

.bigquery-help-window {
  min-height: 100dvh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #c0c0c0;
  border-top: 2px solid #ffffff;
  border-left: 2px solid #ffffff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  box-sizing: border-box;
}

.bigquery-help-titlebar {
  position: relative;
  display: flex;
  align-items: center;
  padding: 2px 4px;
  background: linear-gradient(90deg, #000080 0%, #1084d0 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.bigquery-help-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  white-space: nowrap;
}

.bigquery-help-controls {
  display: flex;
  gap: 2px;
  margin-left: auto;
}

.bigquery-help-control {
  width: 18px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: 1px solid #404040;
  background: #c0c0c0;
  color: #000;
  text-decoration: none;
  font-size: 11px;
  line-height: 1;
  padding: 0;
}

.bigquery-help-tabs {
  display: flex;
  gap: 1px;
  padding: 6px 8px 0;
}

.bigquery-help-tab {
  padding: 5px 10px 4px;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
  border-right: 1px solid #404040;
  border-bottom: none;
  background: #b6b6b6;
  font-size: 12px;
  cursor: pointer;
}

.bigquery-help-tab.active {
  position: relative;
  top: 1px;
  background: #fff;
}

.bigquery-help-main {
  display: grid;
  grid-template-columns: 250px 1fr;
  flex: 1;
  min-height: 0;
  background: #fff;
  border-top: 1px solid #404040;
}

.bigquery-help-toc {
  overflow: auto;
  padding: 12px;
  background: #f2f2f2;
  border-right: 1px solid #808080;
}

.bigquery-help-toc-title {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
}

.bigquery-help-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.bigquery-help-toc-list li {
  margin: 0 0 8px;
}

.bigquery-help-toc-list a {
  color: #000;
  font-size: 12px;
  text-decoration: none;
}

.bigquery-help-content {
  overflow: auto;
  padding: 14px 20px 20px;
}

.bigquery-help-doc-title {
  margin: 0 0 6px;
  font-size: 20px;
  font-weight: 700;
}

.bigquery-help-doc-subtitle {
  margin: 0 0 12px;
  font-size: 13px;
  font-weight: 700;
}

.bigquery-help-section {
  margin: 0 0 20px;
}

.bigquery-help-heading {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.bigquery-help-content p,
.bigquery-help-content li {
  font-size: 12px;
  line-height: 1.5;
}

.bigquery-help-content p {
  margin: 0 0 10px;
}

.bigquery-help-content ul,
.bigquery-help-content ol {
  margin: 0 0 10px 20px;
  padding: 0;
}

.bigquery-help-divider {
  margin: 14px 0;
  border: 0;
  border-top: 1px solid #d0d0d0;
}

.bigquery-help-codebox {
  margin: 6px 0 10px;
  padding: 8px;
  background: #f4f4f4;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
}

.bigquery-help-codebox code {
  display: block;
  white-space: pre-wrap;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
}

@media (max-width: 900px) {
  .bigquery-help-main {
    grid-template-columns: 1fr;
  }

  .bigquery-help-toc {
    border-right: none;
    border-bottom: 1px solid #808080;
  }

  .bigquery-help-title {
    position: static;
    transform: none;
    margin: 0 auto;
    padding-left: 18px;
  }
}
`

function isTabId(value: string | null): value is TabId {
  return value === 'big-picture' || value === 'core-concepts' || value === 'examples' || value === 'glossary'
}

export default function GCPBigQueryPage(): JSX.Element {
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
    document.title = `GCP BigQuery (${activeTabLabel})`
  }, [activeTab, searchParams, setSearchParams])

  const handleMinimize = () => {
    const minimizedTask = {
      id: `help:${location.pathname}`,
      title: 'GCP BigQuery',
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
    <div className="bigquery-help-page">
      <style>{bigQueryHelpStyles}</style>
      <div className="bigquery-help-window" role="presentation">
        <header className="bigquery-help-titlebar">
          <span className="bigquery-help-title">GCP BigQuery</span>
          <div className="bigquery-help-controls">
            <button className="bigquery-help-control" type="button" aria-label="Minimize" onClick={handleMinimize}>
              _
            </button>
            <Link to="/algoViz" className="bigquery-help-control" aria-label="Close">
              X
            </Link>
          </div>
        </header>

        <div className="bigquery-help-tabs" role="tablist" aria-label="Sections">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`bigquery-help-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bigquery-help-main">
          <aside className="bigquery-help-toc" aria-label="Table of contents">
            <h2 className="bigquery-help-toc-title">Contents</h2>
            <ul className="bigquery-help-toc-list">
              {sectionLinks[activeTab].map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.label}</a>
                </li>
              ))}
            </ul>
          </aside>

          <main className="bigquery-help-content">
            <h1 className="bigquery-help-doc-title">GCP BigQuery</h1>
            <p className="bigquery-help-doc-subtitle">Managed analytical warehouse and SQL platform for large-scale data work</p>
            <p>
              This page is intentionally detailed. It is meant to read like a compact BigQuery manual: what the system is, where
              it fits in a GCP data platform, how warehouse objects and queries work, how teams ingest and transform data, and
              which design habits matter for correctness, cost, and performance.
            </p>

            {activeTab === 'big-picture' && (
              <>
                {bigPictureSections.map((section, index) => (
                  <section key={section.id} id={section.id} className="bigquery-help-section">
                    <h2 className="bigquery-help-heading">{section.title}</h2>
                    {'paragraphs' in section &&
                      section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    {'bullets' in section && (
                      <ul>
                        {section.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                    {index < bigPictureSections.length - 1 && <hr className="bigquery-help-divider" />}
                  </section>
                ))}
              </>
            )}

            {activeTab === 'core-concepts' && (
              <>
                <section id="core-mental" className="bigquery-help-section">
                  <h2 className="bigquery-help-heading">Mental Models</h2>
                  {mentalModels.map((item) => (
                    <p key={item.title}>
                      <strong>{item.title}:</strong> {item.detail}
                    </p>
                  ))}
                </section>

                {coreSections.map((section) => (
                  <section key={section.id} id={section.id} className="bigquery-help-section">
                    <h2 className="bigquery-help-heading">{section.title}</h2>
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
                  <section key={example.title} id={`example-${index + 1}`} className="bigquery-help-section">
                    <h2 className="bigquery-help-heading">{example.title}</h2>
                    <div className="bigquery-help-codebox">
                      <code>{example.code}</code>
                    </div>
                    <p>{example.explanation}</p>
                  </section>
                ))}
              </>
            )}

            {activeTab === 'glossary' && (
              <section id="glossary-terms" className="bigquery-help-section">
                <h2 className="bigquery-help-heading">Glossary</h2>
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
