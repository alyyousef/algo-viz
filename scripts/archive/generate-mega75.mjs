import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PROJECT_ROOT = path.resolve(__dirname, '..')
const ROUTE_DIR = path.join(PROJECT_ROOT, 'src', 'features', 'kb', 'routes', 'KB')

const contentMap = {
  '43. System Design & Distributed Systems/43.3 Messaging & Streaming/Redis Streams/index.mdx': `---
title: Redis Streams
description: A data type that models a log data structure in Redis, providing a way to store multiple fields and string values with an automatically generated, time-based sequence.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Redis Streams"
  subtitle="The lightweight alternative to Apache Kafka"
  logoUrl="https://upload.wikimedia.org/wikipedia/en/6/6b/Redis_Logo.svg"
  description="Introduced in Redis 5.0, Redis Streams is an append-only log data structure. It brings the mathematical persistence and replayability of Apache Kafka directly into the lightning-fast, in-memory world of Redis."
  yearCreated={2018}
  creator="Salvatore Sanfilippo"
  isOpenSource={true}
  websiteUrl="https://redis.io/docs/data-types/streams/"
>

If you are already using Redis for caching, and you need an Event Stream, deploying a massive Java-based Apache Kafka cluster is often severe overkill. Redis Streams provides 80% of Kafka's functionality with 1% of the operational complexity.

<Callout icon="tip" title="In-Memory Speed">
  Because Redis Streams lives entirely in RAM (though it can be persisted to disk via RDB/AOF), it is mathematically faster than Kafka for small-to-medium datasets, routinely achieving sub-millisecond read/write latency.
</Callout>

## Core Features

- **Consumer Groups:** Borrowed directly from Kafka's architecture. It allows a mathematical group of worker nodes to cooperate, ensuring that each event in the stream is delivered to exactly one worker in the group.
- **XADD / XREAD:** The core commands. \`XADD\` appends an event to the stream and mathematically generates a unique timestamp-based ID (e.g., \`1518951480106-0\`). \`XREAD\` allows consumers to block and listen for new events.
- **Memory Limits:** Unlike Kafka (which stores terabytes on cheap HDDs), Redis Streams uses expensive RAM. You must mathematically cap the stream length using \`MAXLEN\` (e.g., \`XADD mystream MAXLEN 100000 *\`) to prevent OOM crashes.

</TechnologyTemplate>
`,
  '43. System Design & Distributed Systems/43.4 Caching/Cache-aside/index.mdx': `---
title: Cache-Aside (Lazy Loading)
description: A caching pattern where the application code is responsible for checking the cache, loading data from the database if there's a cache miss, and then updating the cache.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Cache-Aside (Lazy Loading)">

**Cache-Aside** (also known as Lazy Loading) is the most common mathematical caching strategy in the world. It is the default approach for 95% of web applications.

In this architecture, the Cache server (e.g., Redis) and the Database (e.g., PostgreSQL) have absolutely no knowledge of each other. The Application code acts as the mathematical mediator between the two.

<Callout icon="info" title="The Data Flow">
  1. The App asks Redis: "Do you have User #123?" (Cache Hit = Return to User immediately).
  2. If Redis says "No" (Cache Miss), the App queries PostgreSQL.
  3. The App receives the data from PostgreSQL, mathematically writes a copy of it into Redis, and *then* returns it to the User.
</Callout>

## Mathematical Trade-Offs

<ComparisonTable 
  headers={['Pros', 'Cons']}
  rows={[
    ['Resilient to Cache Failure: If Redis mathematically crashes, the App just experiences a 100% Miss rate and safely falls back to querying the DB directly.', 'The First Penalty: The very first user to request a piece of data always experiences the maximum latency (Cache check + DB query + Cache Write).'],
    ['Efficient RAM Usage: Data is only cached if a user actually requests it. You never waste RAM caching data that no one looks at.', 'Stale Data: If a separate process updates the DB, the Cache is mathematically unaware, serving stale data until the TTL expires.']
  ]}
/>

</ConceptTemplate>
`,
  '43. System Design & Distributed Systems/43.4 Caching/Write-through/index.mdx': `---
title: Write-Through Cache
description: A caching pattern where data is written to the cache and the primary database simultaneously in the same transaction.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Write-Through Cache">

While Cache-Aside solves the problem of *Reading* data efficiently, it is highly prone to serving stale data. If an admin mathematically updates a user's permissions in the Database, the Cache still holds the old permissions.

The **Write-Through** pattern solves this by changing how data is mathematically written to the system.

<Callout icon="success" title="Perfect Consistency">
  In a Write-Through cache, every single time the application updates a record, it writes the new data to Redis AND writes the new data to PostgreSQL simultaneously. This mathematically guarantees the cache is never stale.
</Callout>

## Mathematical Trade-Offs

<ComparisonTable 
  headers={['Pros', 'Cons']}
  rows={[
    ['Absolute Data Consistency. The cache always mathematically matches the database.', 'Higher Write Latency. Every \`UPDATE\` statement mathematically takes twice as long because the app must wait for both the DB and the Cache to acknowledge the write.'],
    ['Fast Reads for Recently Written Data. If User A updates their profile, and User B immediately views it, it is guaranteed to be in the blazing-fast cache.', 'Wasted RAM. The app caches *everything* it writes, even if that data is mathematically never read again (e.g., system logs).']
  ]}
/>

</ConceptTemplate>
`,
  '43. System Design & Distributed Systems/43.4 Caching/Write-back/index.mdx': `---
title: Write-Back Cache (Write-Behind)
description: A caching pattern where the application writes data only to the cache, and an asynchronous process writes the data to the primary database later.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Write-Back Cache (Write-Behind)">

If your application needs to handle 100,000 \`UPDATE\` queries per second, even a massive PostgreSQL cluster will physically melt. Hard drives cannot mathematically spin fast enough to record that many transactions.

The **Write-Back** (or Write-Behind) pattern is the ultimate mathematical solution for extreme write-heavy workloads.

<Callout icon="warning" title="Dangerous but Blazing Fast">
  In Write-Back, the application writes data *only* to the Cache (Redis), and immediately returns "Success" to the user. Later, an asynchronous background worker mathematically "flushes" the changed data from the Cache into the permanent Database.
</Callout>

## Mathematical Trade-Offs

<ComparisonTable 
  headers={['Pros', 'Cons']}
  rows={[
    ['Infinite Write Throughput. Writing to RAM takes ~0.1ms. You can mathematically accept massive spikes of traffic without crashing your DB.', 'Data Loss Risk. If the Redis server loses power *before* the background worker flushes the data to the DB, the data is mathematically gone forever.'],
    ['Database Batching. Instead of sending 10,000 individual \`UPDATE\` statements to the DB, the worker can mathematically combine them into a single, highly efficient bulk query.', 'Extreme Complexity. Building a robust system that tracks exactly which cache keys are "dirty" (unflushed) and safely moving them to the DB is mathematically difficult.']
  ]}
/>

</ConceptTemplate>
`,
  '43. System Design & Distributed Systems/43.4 Caching/Cache invalidation/index.mdx': `---
title: Cache Invalidation
description: The process of removing or updating stale entries in a cache when the underlying data in the source database changes.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Cache Invalidation">

> *"There are only two hard things in Computer Science: cache invalidation and naming things."* — Phil Karlton

**Cache Invalidation** is the mathematical nightmare of ensuring that a blazing-fast cache does not serve old, incorrect data to the user. If an item's price changes in the database from $10 to $20, but the cache still says $10, the company loses money.

<Callout icon="error" title="The Distributed State Problem">
  Invalidation is mathematically difficult because the Database and the Cache are two physically separate computers. There is no atomic transaction that guarantees both change simultaneously without creating a massive performance bottleneck.
</Callout>

## The Three Mathematical Approaches

1. **Absolute TTL (Time-To-Live):** The simplest approach. Give every cache key a mathematical expiration of 5 minutes. You accept the fact that data might be mathematically incorrect for up to 4 minutes and 59 seconds.
2. **Event-Driven Invalidation:** When the Application writes to the Database, it immediately publishes a message to a Message Queue (e.g., "Product 123 Updated"). A separate worker listens to this queue and mathematically deletes \`Product:123\` from Redis.
3. **Write-Through:** The Application mathematically forces the Cache to update the exact millisecond the Database updates.

</ConceptTemplate>
`,
  '43. System Design & Distributed Systems/43.4 Caching/Cache stampede prevention/index.mdx': `---
title: Cache Stampede Prevention
description: Architectural techniques used to prevent a database from being overwhelmed when a highly popular cached item suddenly expires.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Cache Stampede Prevention">

A **Cache Stampede** (also known as a Thundering Herd) is a catastrophic mathematical failure mode in distributed systems.

Imagine a highly popular article on a news site receiving 10,000 requests per second. The article is cached in Redis with a TTL. The instant the TTL mathematically expires, Redis deletes the key. 

In that exact millisecond, 10,000 concurrent user requests check Redis. They all experience a Cache Miss simultaneously. All 10,000 requests bypass the cache and mathematically slam the PostgreSQL database at the exact same time. The database instantly OOMs and crashes.

<Callout icon="warning" title="The Danger of Simplicity">
  Standard Cache-Aside architecture provides absolutely zero mathematical protection against Cache Stampedes. You must actively engineer a prevention mechanism.
</Callout>

## Mathematical Prevention Strategies

<ComparisonTable 
  headers={['Strategy', 'How it Works', 'Drawback']}
  rows={[
    ['Mutex Locks (Distributed Locking)', 'When the key expires, the first thread to realize it mathematically acquires a Redis Lock. The other 9,999 threads are forced to sleep/wait. The first thread queries the DB, repopulates the cache, and releases the lock. The sleeping threads wake up and safely read the new cache.', 'Creates a mathematical bottleneck. The 9,999 threads consume RAM while sleeping.'],
    ['Probabilistic Early Expiration (PER)', 'Threads use a mathematical algorithm (involving a random number) to "pretend" the cache has expired slightly *before* it actually does. One lucky thread repopulates the cache while the TTL is still technically alive, so the other 9,999 threads just get the slightly older cached version.', 'Mathematically complex to tune the probability algorithms correctly.']
  ]}
/>

</ConceptTemplate>
`,
  '43. System Design & Distributed Systems/43.4 Caching/TTL/index.mdx': `---
title: Time-To-Live (TTL)
description: A mechanism that limits the lifespan or lifetime of data in a computer or network.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Time-To-Live (TTL)">

The simplest and most universally used mathematical strategy for Cache Invalidation is the **Time-To-Live (TTL)**. 

When data is written into a cache like Redis or Memcached, it is mathematically tagged with an expiration timer (e.g., 300 seconds). The moment that timer hits zero, the cache server automatically deletes the data from RAM.

<Callout icon="success" title="The Ultimate Safety Net">
  Even if your sophisticated Event-Driven cache invalidation architecture completely fails, a TTL mathematically guarantees that your system will eventually heal itself. You should ALWAYS apply a TTL to every single key in a cache, even if it is set to 30 days.
</Callout>

## Strategic TTL Mathematics

Choosing the correct mathematical TTL is a careful balance between Database Load and Data Freshness.

<ComparisonTable 
  headers={['Data Type', 'Recommended TTL', 'Reasoning']}
  rows={[
    ['Stock Market Ticker', '1 to 5 Seconds', 'Financial data mathematically must be hyper-fresh. However, even a 1-second TTL shields the database from 10,000 requests a second.'],
    ['E-Commerce Product Details', '15 to 60 Minutes', 'Product titles and descriptions rarely change. If an admin edits a typo, the business can usually tolerate the typo remaining on the live site for another 30 minutes.'],
    ['Historical Analytics Reports', '7 to 30 Days', 'A report for "Sales in 2021" will mathematically never change for the rest of eternity. Cache it as long as possible.']
  ]}
/>

</ConceptTemplate>
`,
  '43. System Design & Distributed Systems/43.4 Caching/Memcached/index.mdx': `---
title: Memcached
description: A general-purpose distributed memory-caching system, often used to speed up dynamic database-driven websites.
---
import { TechnologyTemplate } from '@/features/kb/components/templates/TechnologyTemplate'

<TechnologyTemplate 
  title="Memcached"
  subtitle="The original distributed RAM cache"
  logoUrl="https://upload.wikimedia.org/wikipedia/en/2/27/Memcached.svg"
  description="Created in 2003 for LiveJournal, Memcached is the grandfather of all modern caching systems. It is an incredibly simple, lightning-fast, purely in-memory key-value store."
  yearCreated={2003}
  creator="Brad Fitzpatrick"
  isOpenSource={true}
  websiteUrl="https://memcached.org/"
>

Before Redis existed, **Memcached** ruled the internet. It was designed to do exactly one mathematical thing perfectly: store strings in RAM as fast as humanly possible.

Unlike Redis, which is single-threaded, Memcached is natively **Multi-Threaded**. A single Memcached server can mathematically utilize 64 CPU cores to handle millions of operations per second with ease.

<Callout icon="warning" title="Purely Volatile">
  Memcached has absolutely zero mathematical capability to write data to a hard drive. If you restart a Memcached server, 100% of the data is instantly vaporized. It is a true cache, not a database.
</Callout>

## Memcached vs. Redis

While Redis has largely won the caching war due to its advanced features, Memcached is still mathematically relevant for specific use cases:

<ComparisonTable 
  headers={['Feature', 'Memcached', 'Redis']}
  rows={[
    ['Architecture', 'Multi-threaded (scales vertically on massive CPUs).', 'Single-threaded (requires clustering to scale).'],
    ['Data Structures', 'Only simple Strings (Strings and Objects serialized to Strings).', 'Lists, Sets, Hashes, Sorted Sets, Bitmaps, Streams.'],
    ['Disk Persistence', 'None. Purely volatile.', 'RDB Snapshots and AOF (Append Only File) logs.']
  ]}
/>

</TechnologyTemplate>
`,
  '43. System Design & Distributed Systems/43.4 Caching/Browser cache/index.mdx': `---
title: Browser Caching
description: A mechanism where web browsers store copies of static assets locally on the user's hard drive to speed up subsequent page loads.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="Browser Caching">

The fastest mathematical network request is the one that never leaves the user's computer.

**Browser Caching** is the first, and most powerful, layer of defense in System Design. By instructing Google Chrome or Safari to save a 5MB background image to the user's physical hard drive, you mathematically eliminate the bandwidth cost and the 100ms network latency for all future visits to your site.

<Callout icon="tip" title="Cache-Control Headers">
  Browser caching is entirely controlled by mathematical HTTP Headers sent by your web server. The most important is \`Cache-Control: max-age=31536000\` (which tells the browser to keep the file on disk for exactly 1 year).
</Callout>

## The Cache Busting Problem

If you tell Chrome to cache \`styles.css\` for 1 year, and tomorrow you update the background color to blue, the user will mathematically still see the old red background because Chrome will refuse to ask the server for the new file.

**Cache Busting** is the mathematical solution. Webpack or Vite automatically appends a cryptographic hash of the file's contents to the filename (e.g., \`styles.ab12c9.css\`). 

When you change the CSS, the hash mathematically changes to \`styles.x9z8b1.css\`. The browser sees a completely new filename, realizes it isn't in the local cache, and downloads the fresh CSS file perfectly.

</ConceptTemplate>
`,
  '43. System Design & Distributed Systems/43.4 Caching/CDN cache/index.mdx': `---
title: CDN Caching
description: A caching layer located at the edge of the network, physically closer to the user, to reduce latency and origin server load.
---
import { ConceptTemplate } from '@/features/kb/components/templates/ConceptTemplate'

<ConceptTemplate title="CDN Caching">

If a user's **Browser Cache** is completely empty, the next layer of mathematical defense is the **Content Delivery Network (CDN) Cache**.

Instead of the user's request traveling 3,000 miles to your Origin Server in Virginia, the request hits a CDN Edge Node mathematically located 10 miles from the user's house. The CDN checks its own massive RAM/SSD cache. If it has the file, it returns it in ~5 milliseconds.

<Callout icon="success" title="The Global Shield">
  A properly configured CDN (like Cloudflare or Fastly) can mathematically absorb 99% of your static traffic. If your website is featured on national television, the CDN will serve the 10 million image requests from its edge nodes. Your actual Origin Database might only see 100 requests.
</Callout>

## Dynamic vs. Static Caching

<ComparisonTable 
  headers={['Content Type', 'CDN Behavior', 'Mathematical Rule']}
  rows={[
    ['Static Assets (Images, JS, CSS)', 'The CDN caches these aggressively.', 'Always use long TTLs. Rely on filename hashing (Cache Busting) for invalidation.'],
    ['Public Dynamic Content (Blog Posts)', 'The CDN caches the HTML output.', 'Use a shorter TTL (e.g., 5 minutes) so authors don\\'t have to wait a year to see their edits.'],
    ['Private Dynamic Content (User Profile)', 'The CDN MUST mathematically bypass the cache.', 'Use \`Cache-Control: private, no-store\`. If the CDN accidentally caches User A\\'s banking details and serves them to User B, it is a catastrophic security breach.']
  ]}
/>

</ConceptTemplate>
`,
}

async function generateMega75() {
  for (const [relativePath, content] of Object.entries(contentMap)) {
    const fullPath = path.join(ROUTE_DIR, relativePath)
    await fs.mkdir(path.dirname(fullPath), { recursive: true })
    await fs.writeFile(fullPath, content, 'utf-8')
    console.log(`Generated thorough content for ${relativePath}`)
  }
}

generateMega75().catch(console.error)
