import { Fragment } from 'react'

import TopicPageShell from '@/features/dsa/components/TopicPageShell'
import { useTopicTabs } from '@/features/dsa/hooks/useTopicTabs'

import type { JSX } from 'react'

type DocSection = {
  id: string
  title: string
  paragraphs: readonly string[]
}

type ExampleSnippet = {
  label: string
  code: string
}

type ExampleSection = {
  id: string
  title: string
  description: string
  snippets: readonly ExampleSnippet[]
  takeaway: string
}

type GlossaryTerm = {
  term: string
  definition: string
}

const bigPictureSections: readonly DocSection[] = [
  {
    id: 'bp-overview',
    title: 'Overview',
    paragraphs: [
      'Redis and Memcached are both in-memory technologies often used for caching, but they occupy different points on the capability spectrum. Memcached is a deliberately simple, distributed memory object cache focused on fast key-value storage and retrieval. Redis is an in-memory data store with richer data structures, optional persistence, and features that let it act as much more than a cache.',
      'That means the practical question is not just which one stores cached values faster. The more useful question is whether the system needs a very simple cache that is intentionally narrow, or an in-memory platform that can handle caching plus richer application patterns such as counters, lists, sets, streams, pub/sub, and persistence-aware use cases.',
      'This help-style reference covers Redis vs Memcached across overview, key ideas, core syntax, APIs, ecosystem, architecture, use cases, and tradeoffs.',
    ],
  },
  {
    id: 'bp-redis',
    title: 'When Redis Fits Better',
    paragraphs: [
      'Redis is often the stronger fit when the application needs more than plain cache get and set semantics. It is especially attractive when the system benefits from richer data structures, counters, leaderboards, distributed coordination primitives, pub/sub, streams, rate limiting, session management, or optional persistence.',
      'It is also the stronger choice when the team wants one in-memory system that can support multiple patterns rather than introducing separate technologies for each one. In many architectures, Redis becomes a multi-purpose operational data layer rather than only a cache.',
    ],
  },
  {
    id: 'bp-memcached',
    title: 'When Memcached Fits Better',
    paragraphs: [
      'Memcached is often the stronger fit when the goal is simply high-performance ephemeral caching with minimal feature overhead. It is especially attractive when the team wants a cache that is intentionally simple, horizontally distributable through clients, and not trying to become a broader data platform.',
      'Its greatest strength is focus. When the system only needs fast temporary key-value caching of pre-serialized blobs or rendered results, Memcached can be very effective precisely because it does not attempt to solve many other problems.',
    ],
  },
  {
    id: 'bp-same-word',
    title: 'Same Word, Different Scope',
    paragraphs: [
      'People often compare Redis and Memcached as if both are just cache servers with different branding. That misses the key difference. Memcached is basically a cache by design. Redis can be a cache, but it is also commonly used as an in-memory data store for many non-cache patterns.',
      'The comparison therefore depends on whether you want a tool that is narrow and fast for cache use cases, or a broader operational primitive that may absorb several adjacent responsibilities.',
    ],
  },
  {
    id: 'bp-traps',
    title: 'Common Evaluation Traps',
    paragraphs: [
      'A common mistake is to choose Redis by default because it has more features, even when the product only needs a simple cache. Extra capability is not automatically useful if it introduces unnecessary operational or conceptual weight.',
      'Another mistake is to choose Memcached for any in-memory workload just because it sounds lightweight, even when the application really needs richer structures, persistence options, or coordination features that Memcached is not designed to provide.',
    ],
  },
  {
    id: 'bp-takeaways',
    title: 'Quick Takeaways',
    paragraphs: [
      'Choose Redis when the application needs richer data structures, optional persistence, messaging-like patterns, or a broader in-memory platform.',
      'Choose Memcached when the application mainly needs a simple high-performance cache and does not benefit from broader in-memory database features.',
      'If the real problem is cache only, Memcached can be the more disciplined choice. If the real problem is broader than caching, Redis usually becomes much more compelling.',
    ],
  },
] as const

const coreConceptSections: readonly DocSection[] = [
  {
    id: 'core-shared',
    title: 'Shared Ground',
    paragraphs: [
      'Both Redis and Memcached store data in memory for speed. Both can reduce latency, offload databases, absorb hot reads, and improve throughput when used as caches in front of slower systems.',
      'That shared ground is important, but it does not make them equivalent. The real difference is how much functionality sits behind that in-memory storage model and what role each tool is meant to play in the architecture.',
    ],
  },
  {
    id: 'core-data-model',
    title: 'Data Model',
    paragraphs: [
      'Memcached is fundamentally a simple key-value cache. Values are arbitrary blobs or serialized objects from the applications point of view, and the server does not understand richer structures beyond a few specialized operations such as incr and decr.',
      'Redis supports strings, hashes, lists, sets, sorted sets, streams, and other structures. This means applications can model more than just cached blobs. They can also model counters, queues, leaderboards, event streams, membership sets, and many other in-memory patterns directly.',
    ],
  },
  {
    id: 'core-persistence',
    title: 'Persistence and Durability',
    paragraphs: [
      'Memcached is designed as an ephemeral cache. Forgetting is part of its design philosophy, and applications are expected to treat it as disposable performance infrastructure rather than as an authoritative data store.',
      'Redis can also be used as a pure cache with no persistence, but it can additionally use persistence options such as snapshots and append-only logging. That changes the kinds of systems Redis can support, even though it still remains an in-memory-first technology.',
    ],
  },
  {
    id: 'core-distribution',
    title: 'Distribution Model',
    paragraphs: [
      'Memcached distributes scale through clients. Servers are largely disconnected from one another, and client-side hashing is typically responsible for deciding where a given key lives. This is simple and effective when the system just wants to shard cache space.',
      'Redis has a richer ecosystem and a more involved operational story when distributed behavior matters. That can be a strength when replication, persistence, and broader platform capability matter, but it also means the architecture conversation is usually deeper than with Memcached.',
    ],
  },
  {
    id: 'core-eviction',
    title: 'Eviction and Expiration',
    paragraphs: [
      'Memcached is intentionally cache-first and uses eviction behavior as part of its normal design. Expiration and LRU-style forgetting are not side concerns. They are central to how the system remains useful under memory pressure.',
      'Redis also supports expiration and eviction policies, but those policies sit inside a broader system that may be used for more than cache-only behavior. That means cache design in Redis often has to coexist with other operational expectations and data models.',
    ],
  },
  {
    id: 'core-performance',
    title: 'Performance Mindset',
    paragraphs: [
      'Memcached is optimized around very fast, simple cache operations with a minimal mental model. That simplicity can be a major advantage when the architecture only needs short-lived cached values and the team wants to keep the cache layer conceptually narrow.',
      'Redis is also extremely fast, but the right performance comparison depends on the workload. Redis often pays for broader capability with broader expectations. The key question is not which logo is faster in the abstract, but whether the feature model helps or complicates the actual use case.',
    ],
  },
  {
    id: 'core-use-cases',
    title: 'Beyond Caching',
    paragraphs: [
      'Memcached is fundamentally about caching rendered pages, database results, API responses, session-like blobs, or other temporary computed values. It is intentionally not a general-purpose in-memory application platform.',
      'Redis goes well beyond caching. Teams use it for rate limiting, queues, pub/sub, distributed locks, leaderboards, session stores, counters, feature toggles, temporary coordination data, and streaming-like patterns. This broader utility is why Redis often shows up in architectures where Memcached would be too narrow.',
    ],
  },
  {
    id: 'core-operations',
    title: 'Operational Complexity',
    paragraphs: [
      'Memcached is appealing partly because it is simple to reason about. The system is a cache. If data disappears, the application regenerates it or falls back to the source of truth. That clarity can make operations and incident response simpler.',
      'Redis can still be easy to operate in straightforward cache mode, but it often becomes more operationally significant because teams use it for more roles. The more critical the Redis workload becomes, the more it starts to feel like a real data platform rather than an incidental cache node.',
    ],
  },
  {
    id: 'core-memory',
    title: 'Memory Efficiency and Shape of Data',
    paragraphs: [
      'Memcached is often a very clean fit for caching opaque serialized application values. If the application already shapes and serializes the object outside the cache, Memcached keeps the server-side model extremely simple.',
      'Redis can be more natural when the application wants the store itself to understand the data pattern, such as fields in a hash, entries in a stream, or members of a sorted set. The tradeoff is that the store becomes semantically richer rather than purely blob-oriented.',
    ],
  },
  {
    id: 'core-team-fit',
    title: 'Team Fit and Architectural Discipline',
    paragraphs: [
      'Memcached often fits teams that want cache discipline. By keeping the cache simple, it discourages using the cache layer as a hidden secondary database or an accidental message system.',
      'Redis often fits teams that intentionally want a richer in-memory systems component. But it also requires more discipline because feature richness can tempt teams to push too many unrelated responsibilities into one service.',
    ],
  },
  {
    id: 'core-decision',
    title: 'Decision Checklist',
    paragraphs: [
      'Lean toward Redis if you need data structures, optional persistence, counters, streams, pub/sub, or broader in-memory application behavior.',
      'Lean toward Memcached if you mainly need ephemeral cache storage for opaque values and want the simplest viable cache layer.',
      'If the architecture genuinely needs only a cache, Memcached remains a strong answer. If the architecture needs more than a cache, Redis usually becomes the more capable and pragmatic choice.',
    ],
  },
] as const

const examples: readonly ExampleSection[] = [
  {
    id: 'examples-cache',
    title: 'Basic Cache Write and Read',
    description:
      'Both tools can cache a computed value, but the APIs reflect their different design centers.',
    snippets: [
      {
        label: 'Redis',
        code: `SET product:42 "{\"id\":42,\"price\":1999}" EX 300
GET product:42`,
      },
      {
        label: 'Memcached',
        code: `set product:42 0 300 24
{"id":42,"price":1999}

get product:42`,
      },
    ],
    takeaway:
      'For simple cache entries, both can work well. The bigger differences appear when the application wants richer semantics than set and get.',
  },
  {
    id: 'examples-counter',
    title: 'Counter and Rate-Limit Style Use',
    description:
      'A basic counter exists in both worlds, but Redis often becomes the more natural choice when counters connect to broader application logic.',
    snippets: [
      {
        label: 'Redis',
        code: `INCR page:home:views
EXPIRE page:home:views 60`,
      },
      {
        label: 'Memcached',
        code: `incr page:home:views 1`,
      },
    ],
    takeaway:
      'Both can count. Redis usually becomes more compelling when counters are part of richer rate-limiting or coordination patterns.',
  },
  {
    id: 'examples-queue',
    title: 'Queue-Like Pattern',
    description:
      'This is where the difference becomes obvious: Redis has native data structures for these patterns, while Memcached is not trying to be that kind of system.',
    snippets: [
      {
        label: 'Redis',
        code: `LPUSH jobs "{\"jobId\":123}"
RPOP jobs`,
      },
      {
        label: 'Memcached',
        code: `# Memcached does not provide a native queue structure.
# Applications would need to model this externally
# or choose a more suitable system.`,
      },
    ],
    takeaway:
      'If the app needs in-memory structures beyond cached blobs, Redis quickly separates itself from Memcached.',
  },
  {
    id: 'examples-decision',
    title: 'Architectural Prompt',
    description:
      'A short rule of thumb keeps the comparison tied to role in the architecture rather than raw popularity.',
    snippets: [
      {
        label: 'Redis Rule',
        code: `If the system needs more than a cache
and benefits from richer in-memory structures:
  choose Redis`,
      },
      {
        label: 'Memcached Rule',
        code: `If the system needs a simple ephemeral cache
for serialized values and little else:
  choose Memcached`,
      },
    ],
    takeaway:
      'The better tool depends on whether the architecture needs a narrow cache or a broader in-memory data platform.',
  },
] as const

const glossaryTerms: readonly GlossaryTerm[] = [
  {
    term: 'Ephemeral Cache',
    definition: 'A cache layer that is expected to lose data without becoming the source of truth.',
  },
  {
    term: 'LRU',
    definition:
      'Least Recently Used, an eviction approach commonly associated with cache systems such as Memcached.',
  },
  {
    term: 'Persistence',
    definition: 'Writing in-memory data to durable storage so it can survive restarts or failures.',
  },
  { term: 'RDB', definition: 'Redis snapshot-based persistence format written at intervals.' },
  {
    term: 'AOF',
    definition: 'Redis append-only file persistence, which logs write operations for later replay.',
  },
  {
    term: 'Hash',
    definition: 'A Redis data structure for storing field-value pairs under one key.',
  },
  {
    term: 'Sorted Set',
    definition:
      'A Redis data structure for storing unique members with scores, useful for rankings and ordered collections.',
  },
  {
    term: 'Stream',
    definition: 'A Redis append-only data structure designed for ordered event or log-like data.',
  },
  {
    term: 'Client-Side Hashing',
    definition:
      'A distribution approach where the client decides which cache server holds a given key.',
  },
  {
    term: 'Opaque Value',
    definition:
      'A cached value stored as raw serialized data without the cache server understanding its internal structure.',
  },
  {
    term: 'Rate Limiting',
    definition: 'Restricting how often an action may happen within a given period.',
  },
  {
    term: 'Source of Truth',
    definition: 'The authoritative system that owns the real persistent version of the data.',
  },
] as const

type TabId = 'big-picture' | 'core-concepts' | 'examples' | 'glossary'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'big-picture', label: 'The Big Picture' },
  { id: 'core-concepts', label: 'Core Concepts' },
  { id: 'examples', label: 'Examples' },
  { id: 'glossary', label: 'Glossary' },
]

const sectionLinks: Record<TabId, Array<{ id: string; label: string }>> = {
  'big-picture': bigPictureSections.map((section) => ({ id: section.id, label: section.title })),
  'core-concepts': coreConceptSections.map((section) => ({ id: section.id, label: section.title })),
  examples: examples.map((section) => ({ id: section.id, label: section.title })),
  glossary: [{ id: 'glossary-terms', label: 'Terms' }],
}

export default function RedisVsMemcachedPage(): JSX.Element {
  const { activeTab, setActiveTab } = useTopicTabs({
    tabs,
    pageTitle: 'Redis vs Memcached',
    defaultTab: 'big-picture',
  })

  return (
    <TopicPageShell
      title="Redis vs Memcached"
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tocLinks={sectionLinks[activeTab]}
    >
      <h1 className="bin98-doc-title">Redis vs Memcached</h1>
      <p className="bin98-doc-subtitle">
        Manual-style comparison of cache philosophy, data model, persistence, and practical
        in-memory tradeoffs.
      </p>

      {activeTab === 'big-picture' &&
        bigPictureSections.map((section, index) => (
          <Fragment key={section.id}>
            <section id={section.id} className="bin98-section">
              <h2 className="bin98-heading">{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
            {index < bigPictureSections.length - 1 && <hr className="bin98-divider" />}
          </Fragment>
        ))}

      {activeTab === 'core-concepts' &&
        coreConceptSections.map((section) => (
          <section key={section.id} id={section.id} className="bin98-section">
            <h2 className="bin98-heading">{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}

      {activeTab === 'examples' &&
        examples.map((example) => (
          <section key={example.id} id={example.id} className="bin98-section">
            <h2 className="bin98-heading">{example.title}</h2>
            <p>{example.description}</p>
            {example.snippets.map((snippet) => (
              <Fragment key={`${example.id}-${snippet.label}`}>
                <h3 className="bin98-subheading">{snippet.label}</h3>
                <div className="bin98-codebox">
                  <code>{snippet.code}</code>
                </div>
              </Fragment>
            ))}
            <p>
              <strong>Takeaway:</strong> {example.takeaway}
            </p>
          </section>
        ))}

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
