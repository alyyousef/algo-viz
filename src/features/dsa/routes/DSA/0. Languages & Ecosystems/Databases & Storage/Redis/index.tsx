import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

type SectionLink = {
  id: string
  label: string
}

type ContentSection = {
  id: string
  title: string
  paragraphs: string[]
  bullets?: string[]
}

type ExampleSection = {
  id: string
  title: string
  description: string[]
  code: string
  notes: string[]
}

type GlossarySection = {
  id: string
  title: string
  terms: Array<{
    term: string
    definition: string
  }>
}

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const introParagraphs = [
  'Redis is an in-memory data structure store commonly used as a cache, message broker, fast state store, rate limiter, queue backbone, and low-latency application database. It is not a relational database and it is not trying to be one. Its design centers on speed, simple operations on rich in-memory data structures, and flexible deployment patterns.',
  'The most important thing to understand about Redis is that the familiar command set sits on top of a fundamentally different performance and data model than SQL systems. Redis trades relational querying and joins for direct key access, powerful in-memory primitives, expiration semantics, and predictable low-latency reads and writes.',
  'This page is intentionally thorough. It covers overview and key ideas, commands and APIs, architecture and persistence, replication and clustering, common use cases, tradeoffs, compare-and-contrast guidance, and practical examples across caching, counters, queues, sorted sets, and streams.',
]

const bigPictureSections: ContentSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Redis stores data primarily in memory and exposes that data through keys mapped to values such as strings, hashes, lists, sets, sorted sets, streams, bitmaps, and other specialized structures. The payoff is very fast access and update patterns for workloads that fit a key-oriented model.',
      'In practice, Redis appears wherever applications need speed and simple server-side state transitions: cache lookups, session storage, counters, pub-sub fanout, queue coordination, leaderboards, short-lived locks, request throttling, and fast derived views. It can also persist data, but the engineering mindset is different from traditional disk-first databases.',
    ],
  },
  {
    id: 'bp-why-it-matters',
    title: 'Why Redis Matters',
    paragraphs: [
      'Modern applications often need a place for data that is too dynamic, too latency-sensitive, or too operationally awkward for a primary relational database alone. Redis fills that role well because it handles high-throughput small operations with simple semantics and rich built-in primitives.',
      'That makes Redis valuable not only as a cache but also as an infrastructure component. It can be the place where an application records temporary state, coordinates workers, tracks limits, fans out events, or materializes fast lookup structures derived from slower systems.',
    ],
    bullets: [
      'Low-latency reads and writes.',
      'Rich server-side data structures instead of only plain strings.',
      'Simple key-based model that maps well to caches and transient state.',
      'Common operational fit for web backends, workers, and event-driven systems.',
    ],
  },
  {
    id: 'bp-mental-model',
    title: 'Mental Model',
    paragraphs: [
      'The right mental model is not mini SQL. Redis is a remote in-memory state engine with durable options, replication options, and specialized primitives. Most operations are direct manipulations of a known key rather than arbitrary relational queries across multiple entities.',
      'That means modeling matters. If a workload can be expressed as key-based access over small fast operations, Redis can feel excellent. If the workload needs ad hoc joins, broad filtering, relational integrity, or complex transactional reporting, Redis is often the wrong center of gravity.',
    ],
    bullets: [
      'Think key-oriented state, not relational tables.',
      'Think fast primitives, not general analytical querying.',
      'Think carefully about memory and expiration because both are part of the design.',
    ],
  },
  {
    id: 'bp-when-it-fits',
    title: 'When Redis Fits Best',
    paragraphs: [
      'Redis is strongest when applications already know the access pattern and need very fast operations on hot data. Common examples include caches, sessions, ephemeral tokens, inventory counters, request throttles, worker queues, live dashboards, leaderboards, and short-lived coordination state.',
      'It is also a strong secondary system under a larger architecture. A relational database or durable event log may remain the system of record while Redis holds fast derived state that improves latency and throughput for the user-facing path.',
    ],
    bullets: [
      'Caching and cache-aside patterns.',
      'Counters, rolling windows, and rate limiting.',
      'Queues, pub-sub, and stream-based event consumption.',
      'Fast lookup state beside a slower primary database.',
    ],
  },
  {
    id: 'bp-when-it-does-not-fit',
    title: 'Where Redis Stops Being the Right Tool',
    paragraphs: [
      'Redis is usually the wrong default for workloads that fundamentally need relational modeling, complex querying, long-term archival durability, or analytical flexibility. It can persist data, but disk-first system-of-record behavior is not the main reason most teams choose Redis.',
      'It is also easy to overreach with Redis by turning it into a pile of loosely structured keys with no discipline. That often leads to fragile naming schemes, memory growth, missing expiration strategy, and state that is hard to reason about or migrate.',
    ],
    bullets: [
      'General relational business data with joins and strict integrity rules.',
      'Broad search and reporting across many entity dimensions.',
      'Very large datasets that do not fit the operational memory budget.',
      'Systems where data model discipline is already weak and key sprawl will make it worse.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Key Takeaways',
    paragraphs: [
      'Redis is best understood as a high-speed in-memory state engine with persistence and distribution options, not as a universal replacement for every other database.',
      'It is extremely effective when used for the workloads it was built for and easy to misuse when teams ask it to solve problems that want a different database model.',
    ],
    bullets: [
      'Use Redis for speed, state primitives, and known access paths.',
      'Be explicit about expiration, memory, persistence, and recovery expectations.',
      'Keep the data model intentional or key sprawl will become the real problem.',
    ],
  },
]

const coreConceptSections: ContentSection[] = [
  {
    id: 'core-what-it-is',
    title: 'What Redis Actually Is',
    paragraphs: [
      'Redis is a networked server process that keeps its working dataset primarily in memory and exposes operations over a simple command protocol. Clients connect over TCP or Unix sockets and issue commands that operate on keys and data structures.',
      'Although Redis began as a simple key-value store, it grew into a data structure server with commands tuned to strings, hashes, lists, sets, sorted sets, streams, hyperloglogs, geospatial indexes, bitmaps, and more. That data-structure orientation is one of its defining strengths.',
    ],
  },
  {
    id: 'core-data-model',
    title: 'Key Space and Data Model',
    paragraphs: [
      'Redis organizes data by keys. A key names a value, and that value has a type such as string, hash, list, set, sorted set, or stream. The application generally knows the key shape in advance and operates directly on it rather than scanning arbitrary relations.',
      'This pushes teams toward explicit naming conventions and predictable access paths. Good Redis design often looks like a careful key schema: prefixes, tenant identifiers, object identifiers, versioning, expiration rules, and clear ownership boundaries.',
    ],
    bullets: [
      'Keys are first-class design elements, not implementation trivia.',
      'Namespacing and TTL strategy matter from the beginning.',
      'The value type chosen for a key should match the access pattern, not personal preference.',
    ],
  },
  {
    id: 'core-strings',
    title: 'Strings, Counters, and Simple Values',
    paragraphs: [
      'Strings are the most general Redis value type. They can hold raw bytes, text, serialized JSON, small blobs, numeric counters, or encoded application state. Many popular Redis patterns such as caching, flags, and counters are built on strings.',
      'Redis also provides atomic numeric operations such as INCR, DECR, and INCRBY, which makes simple counters and quotas easy to implement without application-side races.',
    ],
  },
  {
    id: 'core-hashes-lists-sets',
    title: 'Hashes, Lists, Sets, and Sorted Sets',
    paragraphs: [
      'Hashes store field-value pairs under one key and are often used for objects with a moderate number of attributes. Lists support ordered push and pop operations, which historically made them common for queue-like workflows. Sets store unique members with fast membership checks. Sorted sets attach scores to members and support rank, range, and leaderboard patterns.',
      'The practical lesson is to choose the structure that already provides the operation you need on the server. If the workload is a leaderboard, sorted sets are a better fit than inventing ranking manually on top of strings.',
    ],
  },
  {
    id: 'core-streams',
    title: 'Streams and Consumer Groups',
    paragraphs: [
      'Redis Streams provide an append-only log-like data structure with IDs and consumer groups. They are useful for event ingestion, worker pipelines, and message-processing patterns where multiple consumers need coordinated progress tracking.',
      'Streams are more structured than basic pub-sub and often more suitable when messages must survive temporary disconnects or be acknowledged by workers. They are not identical to Kafka, but they cover many smaller-scale application queue and log-consumption needs effectively.',
    ],
  },
  {
    id: 'core-expiration',
    title: 'Expiration, TTL, and Volatile State',
    paragraphs: [
      'Expiration is a core Redis capability rather than an afterthought. Keys can expire automatically after a given time, which makes Redis natural for caches, sessions, one-time tokens, temporary reservations, rate-limit buckets, and short-lived coordination records.',
      'A strong Redis design usually decides explicitly which keys are durable and which keys are disposable. If expiration policy is vague, memory usage and correctness both become difficult to reason about.',
    ],
    bullets: [
      'Prefer explicit TTL rules over accidental forever-keys.',
      'Think about how expired state affects correctness, not only memory.',
      'Cache invalidation is still hard even when the database supports TTL natively.',
    ],
  },
  {
    id: 'core-atomicity',
    title: 'Atomic Operations, Transactions, and Lua',
    paragraphs: [
      'Single Redis commands are atomic from the point of view of other clients, which is one reason the system works well for counters and small coordination primitives. For multi-step logic, Redis supports transactions through MULTI and EXEC, as well as Lua scripts for server-side atomic sequences.',
      'Lua is often the more practical choice when the application needs read-modify-write logic that must happen as one unit. It keeps the logic close to the data and avoids race windows that would exist if the application issued separate commands.',
    ],
  },
  {
    id: 'core-pipelines',
    title: 'Pipelining and Round-Trip Reduction',
    paragraphs: [
      'Many Redis workloads are limited not by raw server throughput but by network round trips. Pipelining allows clients to send many commands without waiting for each response individually, which can improve throughput significantly.',
      'This matters because a naive Redis client that performs hundreds of tiny requests sequentially can leave a fast server feeling slow. Efficient client behavior is therefore part of Redis performance design.',
    ],
  },
  {
    id: 'core-persistence',
    title: 'Persistence: RDB and AOF',
    paragraphs: [
      'Redis can persist data in multiple ways. RDB snapshots write point-in-time snapshots to disk. AOF records write operations in an append-only log that can be replayed. Some deployments use one approach, some use both, and some intentionally lean toward cache-oriented deployments where durability expectations are lower.',
      'The tradeoff is straightforward: stronger durability and restart fidelity usually cost more disk IO and operational attention. Teams should choose persistence mode based on the real value of the data rather than a vague desire to turn every Redis deployment into a permanent database.',
    ],
  },
  {
    id: 'core-replication',
    title: 'Replication, Failover, and High Availability',
    paragraphs: [
      'Redis supports primary-replica replication so read load can be distributed and failover options can exist. Sentinel is commonly used to monitor instances and coordinate failover in non-clustered deployments.',
      'Replication improves availability and recovery posture, but teams must still understand the consistency model. Replicas can lag, failover is not magic, and not every deployment actually needs high-availability Redis if the state is fundamentally disposable.',
    ],
  },
  {
    id: 'core-cluster',
    title: 'Cluster and Horizontal Scaling',
    paragraphs: [
      'Redis Cluster shards keys across multiple nodes using hash slots. This allows the dataset and write throughput to scale horizontally when one instance is not enough. The application, client library, and key design must all respect cluster behavior.',
      'Cluster solves important scaling problems, but it also introduces operational and modeling constraints. Cross-key operations are more limited when keys do not live in the same slot, so key placement strategy becomes part of system design.',
    ],
  },
  {
    id: 'core-memory',
    title: 'Memory Management and Eviction',
    paragraphs: [
      'Because Redis primarily stores its working set in memory, memory is the central resource. Teams need to understand object overhead, dataset growth, fragmentation, large-key risks, and what happens when memory limits are reached.',
      'Redis supports maxmemory limits and configurable eviction policies. This is powerful for cache workloads, but dangerous if the data is more important than the team admits. If eviction would break correctness, Redis should not be treated as a carefree cache box.',
    ],
    bullets: [
      'Know whether eviction is acceptable before enabling it.',
      'Avoid oversized keys and giant collections with poor access locality.',
      'Monitor memory growth as a product behavior, not just an ops metric.',
    ],
  },
  {
    id: 'core-latency',
    title: 'Performance and Latency Thinking',
    paragraphs: [
      'Redis is fast because most operations are in-memory and the server focuses on simple command execution. But real-world latency also depends on network distance, serialization cost, client behavior, pipelines, key size, and persistence settings.',
      'The practical performance mindset is to keep operations small, avoid unnecessary round trips, use the right data structure, and know which commands can become expensive as cardinality grows.',
    ],
  },
  {
    id: 'core-pubsub',
    title: 'Pub-Sub, Queues, and Event Patterns',
    paragraphs: [
      'Redis Pub/Sub is useful for transient message fanout where consumers only need messages while connected. Lists, sorted sets, and streams can support queue or delayed-work patterns depending on the delivery and replay needs.',
      'The important design question is whether the application needs ephemeral broadcast, durable work queues, replayable event consumption, or precise acknowledgment semantics. Redis offers several patterns, but they are not interchangeable.',
    ],
  },
  {
    id: 'core-locking',
    title: 'Locks, Coordination, and Distributed Caution',
    paragraphs: [
      'Redis is often used for lightweight locks and coordination primitives because commands are atomic and latency is low. Simple patterns such as SET with NX and EX can protect short critical sections when failure handling is understood clearly.',
      'Teams should still be careful. Distributed locking is subtle, and using Redis for coordination does not remove the need to define lease behavior, timeout assumptions, ownership, and what happens when holders crash or clocks drift.',
    ],
  },
  {
    id: 'core-ecosystem',
    title: 'Ecosystem and Language Bindings',
    paragraphs: [
      'Redis has strong client support across almost every mainstream language and framework. It appears in web stacks, job systems, realtime backends, API gateways, mobile backends, and infrastructure tooling.',
      'Its ecosystem strength also means there are many conventions around key naming, serialization, health checks, metrics, and queue behavior. That can be helpful, but teams should still understand the engine beneath the abstraction instead of trusting defaults blindly.',
    ],
  },
  {
    id: 'core-use-cases',
    title: 'Common Real-World Use Cases',
    paragraphs: [
      'Redis commonly powers cache-aside read paths, session stores, shopping-cart state, request throttles, feature-flag snapshots, ranking systems, worker coordination, duplicate suppression, websocket fanout helpers, and temporary materialized views.',
      'It is especially effective when combined with a slower durable source of record. The primary database keeps long-term truth, while Redis keeps the application responsive at the hot edge of the workload.',
    ],
  },
  {
    id: 'core-not-fit',
    title: 'When Not to Use Redis',
    paragraphs: [
      'Redis is usually not the right place for broad relational business data, complex reporting, arbitrary filtering across multiple dimensions, or long-lived archival records that must be reconstructed with strong durability guarantees after failure.',
      'It is also a poor fit when the only reason to choose it is "it is fast" and the team has not actually modeled the data or defined expiration and recovery expectations. Speed without modeling discipline becomes operational debt quickly.',
    ],
  },
  {
    id: 'core-pitfalls',
    title: 'Common Pitfalls',
    paragraphs: [
      'The most frequent Redis failure mode is not command syntax. It is weak data modeling: giant keys, inconsistent prefixes, unclear TTL ownership, no memory budget, and treating Redis as both cache and database without deciding which guarantees actually matter.',
      'Other common mistakes include using KEYS in production paths, issuing many tiny sequential round trips instead of pipelining, storing huge serialized blobs as a convenience, and assuming replicas or persistence make every workload durable enough by default.',
    ],
    bullets: [
      'Do not let key naming drift into chaos.',
      'Do not ignore memory growth because the first launch was fast.',
      'Do not confuse cache semantics with system-of-record semantics.',
      'Do not use expensive whole-keyspace inspection patterns in hot paths.',
    ],
  },
  {
    id: 'core-compare',
    title: 'Redis Compared with SQL Databases and Memcached',
    paragraphs: [
      'Compared with SQL databases, Redis wins on latency, TTL support, and rich in-memory primitives, while SQL systems win on relational querying, constraints, joins, and long-term system-of-record workflows. Redis is usually a complement to SQL, not a replacement for it.',
      'Compared with Memcached, Redis offers richer data structures, persistence options, replication options, scripts, streams, and broader application patterns. Memcached keeps a simpler cache-centric profile, while Redis can support many more stateful infrastructure roles.',
    ],
  },
  {
    id: 'core-decision',
    title: 'Decision Checklist',
    paragraphs: [
      'Use Redis when the workload is key-oriented, latency-sensitive, and benefits from in-memory primitives such as counters, TTLs, sets, sorted ordering, or stream consumption.',
      'Do not choose Redis only because it is popular in infrastructure diagrams. Choose it because the data model and operational expectations match what Redis is good at.',
    ],
    bullets: [
      'Known access pattern and hot state: good Redis signal.',
      'Need joins and relational constraints: weak Redis signal.',
      'Need bounded ephemeral state with TTL: very strong Redis signal.',
    ],
  },
]

const exampleSections: ExampleSection[] = [
  {
    id: 'examples-cache',
    title: 'Cache-Aside with Expiration',
    description: [
      'This is the classic Redis pattern: check Redis first, fall back to the primary database on miss, then populate Redis with a TTL.',
      'The important engineering work is deciding the invalidation rule and TTL, not only writing GET and SET.',
    ],
    code: `const key = "user:42:profile"
let cached = await redis.get(key)

if (cached === null) {
  const profile = await db.loadUserProfile(42)
  await redis.set(key, JSON.stringify(profile), { EX: 300 })
  cached = JSON.stringify(profile)
}

return JSON.parse(cached)`,
    notes: [
      'Cache-aside is simple but still requires invalidation discipline.',
      'TTL should reflect freshness needs, not a random round number.',
    ],
  },
  {
    id: 'examples-rate-limit',
    title: 'Rate Limiter with INCR and EXPIRE',
    description: [
      'Redis is often used for simple fixed-window rate limiting because counters and expiration are cheap and atomic at command granularity.',
      'More advanced limiters may need Lua or sorted sets, but the basic pattern still shows why Redis is good at this class of problem.',
    ],
    code: `const key = "rate:login:ip:203.0.113.4"
const count = await redis.incr(key)

if (count === 1) {
  await redis.expire(key, 60)
}

if (count > 10) {
  throw new Error("Rate limit exceeded")
}`,
    notes: [
      'This is compact because Redis has first-class counters and TTL.',
      'If exact multi-step atomicity matters, move the whole rule into Lua.',
    ],
  },
  {
    id: 'examples-hash',
    title: 'Hash for Session or Profile State',
    description: [
      'Hashes are a natural fit for small object-shaped state where fields may be updated independently.',
      'They often map better to Redis than stuffing everything into one opaque serialized blob.',
    ],
    code: `HSET session:abc123 \
  user_id 42 \
  plan pro \
  locale en-US

EXPIRE session:abc123 1800

HGETALL session:abc123`,
    notes: [
      'Hashes work well for moderate attribute collections under one key.',
      'Expiration keeps session-state lifecycle aligned with product intent.',
    ],
  },
  {
    id: 'examples-zset',
    title: 'Sorted Set Leaderboard',
    description: [
      'Sorted sets are one of the clearest examples of Redis choosing the right server-side primitive for the problem.',
      'The score gives ordering, and range commands provide the top entries efficiently.',
    ],
    code: `ZADD leaderboard:weekly 950 "player:7"
ZADD leaderboard:weekly 1200 "player:14"
ZADD leaderboard:weekly 1100 "player:22"

ZREVRANGE leaderboard:weekly 0 9 WITHSCORES`,
    notes: [
      'Leaderboards are dramatically simpler with sorted sets than with hand-built ranking logic.',
      'Use key partitioning by season or window so old data can expire or archive cleanly.',
    ],
  },
  {
    id: 'examples-streams',
    title: 'Stream and Consumer Group Workflow',
    description: [
      'Streams make Redis useful for durable work distribution and event consumption patterns where acknowledgments matter.',
      'This is more structured than pub-sub because consumers can track pending work and reprocess if needed.',
    ],
    code: `XADD orders * order_id 881 status created amount 4200

XGROUP CREATE orders workers 0 MKSTREAM

XREADGROUP GROUP workers worker-1 COUNT 10 STREAMS orders >

XACK orders workers 1714315012000-0`,
    notes: [
      'Streams are a good fit when messages must survive disconnects.',
      'Consumer-group design still needs ownership, retries, and dead-letter thinking.',
    ],
  },
  {
    id: 'examples-lua',
    title: 'Lua for Atomic Read-Modify-Write',
    description: [
      'Lua is useful when a business rule spans multiple Redis operations and must execute atomically.',
      'It prevents race windows that would exist if the application performed the same logic with separate commands.',
    ],
    code: `EVAL "
local current = redis.call('GET', KEYS[1])
if not current then
  redis.call('SET', KEYS[1], ARGV[1], 'EX', ARGV[2])
  return 1
end
return 0
" 1 lock:checkout worker-7 30`,
    notes: [
      'Use Lua when correctness depends on combining several commands into one atomic unit.',
      'Keep scripts small, explicit, and easy to reason about.',
    ],
  },
]

const glossarySections: GlossarySection[] = [
  {
    id: 'glossary-core',
    title: 'Core Redis Terms',
    terms: [
      {
        term: 'Key space',
        definition: 'The full set of keys stored in a Redis deployment or logical database.',
      },
      {
        term: 'String',
        definition:
          'The simplest Redis value type, used for text, bytes, counters, and serialized objects.',
      },
      {
        term: 'Hash',
        definition: 'A field-value structure stored under one Redis key.',
      },
      {
        term: 'Sorted set',
        definition: 'A collection of unique members ordered by numeric score.',
      },
      {
        term: 'Stream',
        definition: 'An append-only log-like Redis data structure with IDs and consumer groups.',
      },
      {
        term: 'TTL',
        definition: 'Time to live, the remaining lifetime before a key expires.',
      },
    ],
  },
  {
    id: 'glossary-operations',
    title: 'Operational Terms',
    terms: [
      {
        term: 'RDB',
        definition: 'A point-in-time snapshot persistence format written to disk by Redis.',
      },
      {
        term: 'AOF',
        definition: 'Append-only file persistence that records write operations for replay.',
      },
      {
        term: 'Replication',
        definition:
          'Primary-replica copying of Redis data for scaling reads or improving availability.',
      },
      {
        term: 'Sentinel',
        definition:
          'A Redis high-availability component that monitors instances and coordinates failover.',
      },
      {
        term: 'Cluster',
        definition:
          'A sharded Redis deployment that distributes keys across nodes using hash slots.',
      },
      {
        term: 'Eviction policy',
        definition: 'The rule Redis uses to remove keys when memory limits are reached.',
      },
    ],
  },
  {
    id: 'glossary-patterns',
    title: 'Pattern Terms',
    terms: [
      {
        term: 'Cache-aside',
        definition:
          'A pattern where the application reads Redis first and fills it from the source of record on a miss.',
      },
      {
        term: 'Pipelining',
        definition:
          'Sending multiple Redis commands without waiting for each response individually.',
      },
      {
        term: 'Consumer group',
        definition: 'A Redis Streams mechanism for coordinating work among multiple consumers.',
      },
      {
        term: 'Pub-Sub',
        definition:
          'Redis publish-subscribe messaging for transient fanout to connected subscribers.',
      },
      {
        term: 'Lua script',
        definition:
          'Server-side logic executed atomically by Redis to combine multiple operations.',
      },
      {
        term: 'Hot key',
        definition: 'A heavily accessed key that can become a throughput or latency hotspot.',
      },
    ],
  },
]

const sectionLinks: Record<TabId, SectionLink[]> = {
  'big-picture': [
    { id: 'bp-overview', label: 'Overview' },
    { id: 'bp-why-it-matters', label: 'Why It Matters' },
    { id: 'bp-mental-model', label: 'Mental Model' },
    { id: 'bp-when-it-fits', label: 'When It Fits' },
    { id: 'bp-when-it-does-not-fit', label: 'When It Does Not Fit' },
    { id: 'bp-takeaways', label: 'Key Takeaways' },
  ],
  'core-concepts': [
    { id: 'core-what-it-is', label: 'What It Is' },
    { id: 'core-data-model', label: 'Key Space and Data Model' },
    { id: 'core-strings', label: 'Strings and Counters' },
    { id: 'core-hashes-lists-sets', label: 'Core Data Structures' },
    { id: 'core-streams', label: 'Streams' },
    { id: 'core-expiration', label: 'Expiration and TTL' },
    { id: 'core-atomicity', label: 'Atomicity and Lua' },
    { id: 'core-pipelines', label: 'Pipelining' },
    { id: 'core-persistence', label: 'Persistence' },
    { id: 'core-replication', label: 'Replication' },
    { id: 'core-cluster', label: 'Cluster' },
    { id: 'core-memory', label: 'Memory and Eviction' },
    { id: 'core-latency', label: 'Performance' },
    { id: 'core-pubsub', label: 'Pub-Sub and Queues' },
    { id: 'core-locking', label: 'Locks and Coordination' },
    { id: 'core-ecosystem', label: 'APIs and Ecosystem' },
    { id: 'core-use-cases', label: 'Use Cases' },
    { id: 'core-not-fit', label: 'When Not to Use It' },
    { id: 'core-pitfalls', label: 'Pitfalls' },
    { id: 'core-compare', label: 'Compare and Contrast' },
    { id: 'core-decision', label: 'Decision Checklist' },
  ],
  examples: [
    { id: 'examples-cache', label: 'Cache-Aside Example' },
    { id: 'examples-rate-limit', label: 'Rate Limit Example' },
    { id: 'examples-hash', label: 'Hash Example' },
    { id: 'examples-zset', label: 'Sorted Set Example' },
    { id: 'examples-streams', label: 'Streams Example' },
    { id: 'examples-lua', label: 'Lua Example' },
  ],
  glossary: [
    { id: 'glossary-core', label: 'Core Terms' },
    { id: 'glossary-operations', label: 'Operational Terms' },
    { id: 'glossary-patterns', label: 'Pattern Terms' },
  ],
}

function renderContentSection(section: ContentSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="redis-help-section">
      <h2 className="redis-help-heading">{section.title}</h2>
      {section.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {section.bullets ? (
        <ul>
          {section.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {isLast ? null : <hr className="redis-help-divider" />}
    </section>
  )
}

function renderExampleSection(section: ExampleSection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="redis-help-section">
      <h2 className="redis-help-heading">{section.title}</h2>
      {section.description.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <div className="redis-help-codebox">
        <code>{section.code.trim()}</code>
      </div>
      <ul>
        {section.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      {isLast ? null : <hr className="redis-help-divider" />}
    </section>
  )
}

function renderGlossarySection(section: GlossarySection, isLast: boolean): JSX.Element {
  return (
    <section key={section.id} id={section.id} className="redis-help-section">
      <h2 className="redis-help-heading">{section.title}</h2>
      {section.terms.map((item) => (
        <p key={item.term}>
          <strong>{item.term}:</strong> {item.definition}
        </p>
      ))}
      {isLast ? null : <hr className="redis-help-divider" />}
    </section>
  )
}

export default function RedisPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Redis',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Redis"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Redis</h1>
      <p className="redis-help-doc-subtitle">
        In-memory data structure store reference covering data modeling, persistence, replication,
        clustering, TTL, queues, streams, and tradeoffs.
      </p>

      {introParagraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}

      {activeTab === 'big-picture'
        ? bigPictureSections.map((section, index) =>
            renderContentSection(section, index === bigPictureSections.length - 1),
          )
        : null}

      {activeTab === 'core-concepts'
        ? coreConceptSections.map((section, index) =>
            renderContentSection(section, index === coreConceptSections.length - 1),
          )
        : null}

      {activeTab === 'examples'
        ? exampleSections.map((section, index) =>
            renderExampleSection(section, index === exampleSections.length - 1),
          )
        : null}

      {activeTab === 'glossary'
        ? glossarySections.map((section, index) =>
            renderGlossarySection(section, index === glossarySections.length - 1),
          )
        : null}
    </TopicPageShell>
  )
}
