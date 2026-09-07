export const cachingPages = [
  {
    rel: '43.4 Caching/Application cache/index.mdx',
    title: 'Application Caching',
    description:
      'A cache inside the process or next to it — hash maps, local LRU, or a sidecar — fastest hit, hardest consistency across instances.',
    body: `
**Application caching** stores hot data in the app process (or a sidecar the app owns) so the next request does not leave the machine. Hits are microseconds. The cost is **per-instance copies** and **invalidation that does not fan out** unless you build it.

## 1. Deep Dive and Mechanics

**In-process maps.** A concurrent hash map with TTL. Zero network. Lost on deploy. Each replica has its own view. Feature flags and tiny config love this. User-specific data can explode memory.

**Local LRU libraries.** Caffeine, Guava, lru_cache. Size bounds matter more than you think; a cache without eviction is a leak.

**Sidecar / node-local Redis.** Still "application tier" if only that node talks to it. Helps multi-process hosts (PHP, workers) share one local cache.

**Stampede.** When the local entry expires, every in-flight request on that instance may reload. Single-flight (one loader, others wait) is the fix in-process.

<Callout icon="warning" title="Local cache plus sticky sessions is not a consistency model">
User A updates a name on instance 3. Instance 7 still has the old name until TTL. If that is wrong for the product, you need a shared cache or explicit invalidation.
</Callout>

## 2. Mathematical / Theoretical Foundation

Hit latency is L1/L2 plus a lock. Miss cost is the backing store. Effective capacity is size times instance count, but uniqueness is not: the same key is stored N times.

Invalidation delay is max(TTL, time to receive a bust message). Without a bus, it is just TTL.

<ComparisonTable
  headers={['Layer', 'Latency', 'Shared', 'Invalidate']}
  rows={[
    ['In-process', 'Lowest', 'No', 'TTL or restart'],
    ['Node Redis', 'Low', 'Per node', 'Local only'],
    ['Cluster Redis', 'Network', 'Yes', 'Del or pubsub'],
    ['CDN', 'Geo', 'Users', 'Purge API'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
from functools import lru_cache

@lru_cache(maxsize=4096)
def sku_name(sku_id):
    return db.get_sku(sku_id).name
TICK3

Add a TTL wrapper. Flush on deploy if the process cache can be wrong in a dangerous way (authz).

## 4. Visualizations

TICK3mermaid
flowchart LR
    Req --> Local[In-process LRU]
    Local -->|hit| Out[Response]
    Local -->|miss| Redis
    Redis -->|miss| DB
TICK3

## 5. Interview Prep

**Q: Why not cache everything in-process?**
**A:** Memory, staleness across replicas, and GC. Huge heaps make pauses. Shared Redis is the usual next step.

**Q: How do you bust N instances?**
**A:** Pub-sub (Redis, NATS) or version the key and accept TTL. Do not SSH to every box.

**Q: Request-scoped cache?**
**A:** A map that lives for one request (DataLoader style). Dedupes duplicate keys in one GraphQL query. It is not cross-request.

## 6. Production Use Cases

- **Config and feature flags** with short TTL.
- **ORM identity maps** per request.
- **Hot translations** or SKU names on a storefront node.

<Callout icon="tip" title="Bound size and TTL on day one">
An unbounded process cache will take the JVM down on the first traffic spike.
</Callout>
`,
  },
  {
    rel: '43.4 Caching/Browser cache/index.mdx',
    title: 'Browser Caching',
    description:
      'HTTP caches in the browser and intermediate proxies, driven by Cache-Control, ETag, and Last-Modified — the cheapest cache you do not host.',
    body: `
**Browser caching** is the HTTP cache in the user's agent (and sometimes a shared proxy). You control it with **Cache-Control**, **ETag**, **Last-Modified**, and **Vary**. A correct policy makes repeat visits cheap. A wrong policy serves a stale app.js forever or disables caching you already paid for.

## 1. Deep Dive and Mechanics

**Freshness.** max-age and s-maxage set seconds of freshness. During that window the browser may not revalidate. After it, a conditional request (If-None-Match) can get 304.

**Validators.** ETag is a version token. Last-Modified is a date. Prefer ETag for APIs.

**private versus public.** private is browser-only (user-specific). public may be stored by CDNs. Never mark personalized HTML public.

**immutable plus hashed names.** app.9f3c.js with long max-age and immutable. HTML stays short-lived so it can point at new hashes.

<Callout icon="warning" title="Cache-Control on APIs is a product decision">
A private user JSON with max-age=86400 will show yesterday's cart. Default APIs to no-store unless you designed the freshness.
</Callout>

## 2. Mathematical / Theoretical Foundation

Freshness lifetime is an explicit number of seconds from response time (or heuristic if you send only Last-Modified — avoid heuristics). Revalidation cost is a conditional GET; payload cost is zero on 304.

Vary: Cookie turns the cache key into a per-user explosion. That is how you accidentally disable a CDN.

<ComparisonTable
  headers={['Directive', 'Who stores', 'Revalidate']}
  rows={[
    ['no-store', 'Nobody', 'Always network'],
    ['no-cache', 'May store', 'Must revalidate'],
    ['max-age=N', 'Browser', 'After N seconds'],
    ['s-maxage=N', 'Shared / CDN', 'After N seconds'],
  ]}
/>

## 3. Real-World Implementation

TICK3http
Cache-Control: public, max-age=31536000, immutable
ETag: "9f3c"
TICK3

HTML: no-cache or a short max-age. Assets: hashed name plus immutable.

## 4. Visualizations

TICK3mermaid
sequenceDiagram
    participant B as Browser
    participant S as Origin
    B->>S: GET /app.js
    S-->>B: 200 plus max-age
    B->>B: reuse while fresh
    B->>S: GET If-None-Match
    S-->>B: 304
TICK3

## 5. Interview Prep

**Q: no-cache versus no-store?**
**A:** no-cache means store but revalidate. no-store means do not write to disk. Auth pages want no-store.

**Q: How do you ship a new frontend?**
**A:** Content-hash filenames, long cache on assets, short cache on HTML. A unique query string works but is messier.

**Q: Why is my CDN not caching?**
**A:** Set-Cookie, Vary: Cookie, Authorization, or Cache-Control: private. Check the response, not the Terraform.

## 6. Production Use Cases

- **Static SPAs** with hashed bundles.
- **Profile avatars** with ETag.
- **Avoid** caching bank balances in the browser.

<Callout icon="tip" title="Treat HTML as the pointer">
If HTML is cached for a week, users cannot see new JS hashes. That is the stuck-old-app incident.
</Callout>
`,
  },
  {
    rel: '43.4 Caching/CDN cache/index.mdx',
    title: 'CDN Caching',
    description:
      'Edge caches that store origin responses near users — hit ratio, purge, and cache keys decide whether the origin survives a spike.',
    body: `
A **CDN cache** stores origin responses at **points of presence** close to users. The first request (or a miss) goes to origin. Later requests for the same **cache key** are served from the edge. This is how static sites and many APIs survive launches.

## 1. Deep Dive and Mechanics

**Cache key.** Usually scheme, host, path, and selected query params. Cookies and Authorization often force a miss. Normalize the key or you shard the cache into dust.

**TTL and stale.** s-maxage drives shared caches. stale-while-revalidate serves old bytes while one request refreshes. stale-if-error serves old bytes when origin is down.

**Purge / invalidate.** By URL, tag, or wildcard. Purge is eventual across POPs. Design so a late purge is safe (versioned URLs).

**Shielding.** One POP talks to origin so a global miss storm becomes one origin request per object.

<Callout icon="warning" title="A cache key that includes a session cookie is a miss factory">
Every user gets a unique object. You paid for a CDN and still melt origin. Strip cookies on static paths.
</Callout>

## 2. Mathematical / Theoretical Foundation

Hit ratio H. Origin QPS is roughly (1-H) times edge QPS plus revalidations. A drop of H from 0.99 to 0.90 is a 10x origin increase.

Purge latency is a gossip or push across POPs; treat it as seconds to minutes, not zero.

<ComparisonTable
  headers={['Object', 'CDN fit', 'Key advice']}
  rows={[
    ['Hashed JS/CSS', 'Perfect', 'Long TTL, ignore cookies'],
    ['Product images', 'Great', 'Version in path'],
    ['HTML shell', 'Short TTL', 'Purge or short max-age'],
    ['Personalized API', 'Usually no', 'private, no-store'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
Cache-Control: public, s-maxage=86400, stale-while-revalidate=60
Surrogate-Key: product-42
TICK3

Purge tag product-42 on edit. Cloudflare, Fastly, CloudFront, and Akamai differ in tag names; the idea is the same.

## 4. Visualizations

TICK3mermaid
flowchart LR
    User --> POP[Edge POP]
    POP -->|hit| User
    POP -->|miss| Shield[Shield POP]
    Shield --> Origin
TICK3

## 5. Interview Prep

**Q: How do you handle a bad file at the edge?**
**A:** Versioned URL (best) or purge. If you cannot purge fast, shorten TTL next time.

**Q: Origin shield versus more origin replicas?**
**A:** Shield cuts duplicate misses. Replicas help when the miss traffic is still large or regional.

**Q: Can the CDN cache POST?**
**A:** Generally no, and you should not want it. GET/HEAD with explicit Cache-Control.

## 6. Production Use Cases

- **Static sites** and image delivery.
- **API GET** catalogs with tagged purge.
- **Video segments** with long TTL.

<Callout icon="tip" title="Draw the cache key on the whiteboard">
Most CDN outages are key mistakes, not POP outages.
</Callout>
`,
  },
  {
    rel: '43.4 Caching/Cache fundamentals/index.mdx',
    title: 'Cache Fundamentals',
    description:
      'A smaller, faster store of computed or fetched data: hit, miss, fill, eviction, and a freshness rule — every other cache page is a variant of this.',
    body: `
A **cache** is a small, fast store that remembers the result of a slower lookup. A **hit** returns the remembered value. A **miss** loads from the source of truth, then **fills** the cache. When full, an **eviction policy** drops something. When data changes, **invalidation** or **TTL** stops you from serving a lie forever.

## 1. Deep Dive and Mechanics

**Locality.** Caches work because of temporal locality (the same key again) and spatial locality (nearby keys). Random unique keys have a hit ratio near zero.

**Layers.** Browser, CDN, app process, Redis, database buffer pool. Each has a different key space and failure mode. A miss at one layer can still hit another.

**Correctness.** The hard part is not the hash map. It is who may see stale data, and for how long. Name the SLA in seconds, not "we cache it."

**Stampede, thundering herd, dogpile.** Many misses for one expired key. Prevent with locks, jittered TTL, or stale-while-revalidate.

<Callout icon="info" title="A cache is a performance optimization until it is a consistency bug">
If the business cannot name an acceptable staleness, do not cache that key.
</Callout>

## 2. Mathematical / Theoretical Foundation

Hit ratio H, miss penalty M, hit time C. Mean time is H times C plus (1-H) times M. Capacity versus working set: if the working set does not fit, H collapses (thrash).

Little's law still applies to in-flight fills. Too many parallel fills can DDoS the database you meant to protect.

<ComparisonTable
  headers={['Idea', 'Means', 'Knob']}
  rows={[
    ['Hit ratio', 'Fraction served from cache', 'Key design, size'],
    ['TTL', 'Max staleness', 'Seconds'],
    ['Eviction', 'What drops when full', 'LRU, LFU, TTL'],
    ['Invalidation', 'Drop on write', 'Pub-sub, delete key'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
def get(cache, key, load):
    hit = cache.get(key)
    if hit is not None:
        return hit
    val = load(key)
    cache.set(key, val)
    return val
TICK3

This is cache-aside. Add TTL and single-flight before production.

## 4. Visualizations

TICK3mermaid
flowchart TD
    K[Key] --> H{Hit?}
    H -->|yes| R[Return]
    H -->|no| L[Load source]
    L --> F[Fill]
    F --> R
TICK3

## 5. Interview Prep

**Q: What do you cache?**
**A:** Read-heavy, stable or TTL-tolerant keys with a small working set relative to RAM. Not a unique write-once audit row.

**Q: How do you know it works?**
**A:** Hit ratio, p99 of the path, origin QPS, and error rate on fill. A high hit ratio with stale authz is a failure.

**Q: Cache versus buffer pool?**
**A:** The DB already caches pages. An app cache is for computed results and to cut parse/network, not a replacement for indexes.

## 6. Production Use Cases

- **Session and feature flags**.
- **Product catalog** pages.
- **Idempotency** lookup tables (with care).

<Callout icon="tip" title="State working set and staleness">
Those two numbers tell you if Redis is the right size and if the product will accept the cache.
</Callout>
`,
  },
  {
    rel: '43.4 Caching/Cache invalidation/index.mdx',
    title: 'Cache Invalidation',
    description:
      'Making cached copies forget: delete on write, version keys, or wait for TTL — the famously hard part of caching.',
    body: `
**Cache invalidation** is how you stop serving a value after the source of truth changed. The three honest methods are **delete the key on write**, **change the key** (version or hash), and **wait for TTL**. Mixing them without a rule is how you get zombies.

## 1. Deep Dive and Mechanics

**Write-through delete.** After a successful DB write, DEL the cache key (or SET the new value). If DEL fails, you are stale until TTL. Retry DEL; do not ignore errors.

**Versioned keys.** user:42:v7. The write bumps v in the DB or a generation number. Old keys rot via TTL. Readers learn the generation first (small, hot key).

**Event-driven bust.** Publish user.updated; many cache nodes delete. At-least-once events mean extra DELs (fine). Lost events mean TTL is the backstop.

**CDC.** Invalidate from the WAL so you do not forget a write path. Best when many services write the table.

<Callout icon="warning" title="Invalidate-then-write races a concurrent reader">
A reader can miss, load the old row, and fill the cache after your delete. Prefer write-then-delete, or fill with a version check.
</Callout>

## 2. Mathematical / Theoretical Foundation

If invalidation is unreliable with probability p per write and TTL is T, expected stale time is about p times T for that write. Make p small (retries) and T an upper bound you can defend.

Generation numbers are a monotonic epoch: readers ignore values tagged with a smaller epoch.

<ComparisonTable
  headers={['Method', 'Stale window', 'Cost', 'Risk']}
  rows={[
    ['TTL only', 'Up to T', 'None on write', 'Long lie'],
    ['DEL on write', 'Race + DEL fail', 'Extra write path', 'Forgotten writers'],
    ['Versioned key', 'Until readers see gen', 'Indirection', 'Gen hot key'],
    ['CDC bust', 'Replication lag', 'Pipeline', 'Lag spikes'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
def update_user(db, cache, user):
    db.save(user)
    cache.delete(f"user:{user.id}")
TICK3

Use the same key function on read and write. A typo is a permanent stale.

## 4. Visualizations

TICK3mermaid
sequenceDiagram
    participant W as Writer
    participant D as DB
    participant C as Cache
    W->>D: update
    W->>C: DEL
    Note over C: next read misses and refills
TICK3

## 5. Interview Prep

**Q: Why is invalidation hard?**
**A:** Multiple writers, races with fills, partial failure of DEL, and key-space drift. Phil Karlton's joke is about this, not about hash maps.

**Q: Delete or overwrite?**
**A:** Overwrite (set) if you have the new value and want a warm cache. Delete if other fields are computed and you are not sure you have the full object.

**Q: How do you invalidate a list?**
**A:** Lists are painful. Version the list, cache fragments, or do not cache the list. Purging "all search pages" wants a CDN tag, not a million DELs.

## 6. Production Use Cases

- **Profile updates** that must show on the next page load.
- **Price changes** with a short TTL backstop.
- **CDN purge tags** for HTML that embeds the data.

<Callout icon="tip" title="TTL is the safety net, not the plan">
Say the write-path delete first, then the TTL that saves you when that path misses a code branch.
</Callout>
`,
  },
  {
    rel: '43.4 Caching/Cache stampede prevention/index.mdx',
    title: 'Cache Stampede Prevention',
    description:
      'Stopping a herd of misses on one expired key from DDoSing the origin — single-flight, locks, jitter, and serving stale.',
    body: `
A **cache stampede** (dogpile, thundering herd) is many concurrent misses for the same key after expiry or eviction. Every request hits the database. The database falls over, fills fail, and the cache stays empty. Prevention means **one fill** (or a few) and everyone else **waits or sees stale**.

## 1. Deep Dive and Mechanics

**Single-flight / request coalescing.** In-process, one goroutine loads; waiters share the result. Works per instance, not cluster-wide.

**Distributed lock.** SET key:lock NX PX 2000 around the fill. Losers wait and reread the cache, or serve stale. Lock expiry must exceed fill time.

**Probabilistic early expiration.** XFetch / jitter: some requests refresh before TTL hits zero so expiry is smeared.

**Stale-while-revalidate.** Keep serving the old value past TTL while a background refresh runs. Users see slightly old data; origin sees one load.

<Callout icon="error" title="A herd can take the site down in seconds">
Hot keys (home page, a celebrity profile) are the usual victims. Test expiry under load, not only the happy hit path.
</Callout>

## 2. Mathematical / Theoretical Foundation

If R requests arrive during a fill of duration F, an unprotected cache issues R origin queries. With a lock, origin queries drop to about 1 plus stragglers. Jittered TTLs turn a Dirac expiry at t into a window of width J.

<ComparisonTable
  headers={['Tactic', 'Scope', 'User sees', 'Ops note']}
  rows={[
    ['Single-flight', 'Process', 'Wait', 'Easy, incomplete'],
    ['NX lock', 'Cluster', 'Wait or stale', 'Need TTL on lock'],
    ['Jittered TTL', 'Cluster', 'Mostly hits', 'Smear only'],
    ['Serve stale', 'Cluster', 'Old value', 'Best UX often'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
def get_hot(cache, key, load):
    val, stale = cache.get_with_ttl(key)
    if val is not None and not stale:
        return val
    if cache.set(key + ":lock", "1", nx=True, px=2000):
        try:
            fresh = load()
            cache.set(key, fresh)
            return fresh
        finally:
            cache.delete(key + ":lock")
    return val if val is not None else load()
TICK3

The last load() is the fallback if there is no stale value. Keep it rare.

## 4. Visualizations

TICK3mermaid
sequenceDiagram
    participant H as Herd
    participant C as Cache
    participant L as Lock
    participant D as DB
    H->>C: miss
    C->>L: NX lock
    L->>D: one fill
    D-->>C: set
    H->>C: waiters reread
TICK3

## 5. Interview Prep

**Q: Why not just a longer TTL?**
**A:** That reduces stampede frequency, not severity, and increases staleness. Still add a lock or stale serve for hot keys.

**Q: What if the locker dies?**
**A:** Lock TTL releases it. Waiters may stampede once. That is better than a stuck lock that never fills.

**Q: Redis versus in-process single-flight?**
**A:** Use both. In-process cuts local herds. Redis lock cuts cross-instance herds.

## 6. Production Use Cases

- **Homepage assemblies**.
- **Token validation** dumps.
- **CDN** stale-while-revalidate at the edge.

<Callout icon="tip" title="Name the hottest ten keys">
Stampede work is wasted on the long tail. Instrument miss rate per key.
</Callout>
`,
  },
  {
    rel: '43.4 Caching/Cache-aside/index.mdx',
    title: 'Cache-Aside (Lazy Loading)',
    description:
      'The app reads the cache, loads the store on miss, then fills — simple, common, and stale unless writes also evict.',
    body: `
**Cache-aside** (lazy load) puts the application in charge. Read: GET cache; on miss, read the database; SET cache. Write: write the database, then delete (or update) the cache. The cache never calls the database by itself.

## 1. Deep Dive and Mechanics

**Why it is popular.** The app already knows the key and the query. Redis stays dumb. You can cache computed objects, not just rows.

**Miss path.** Must be idempotent and stampede-safe for hot keys. A naive aside is the stampede.

**Write path.** If you only implement the read side, the cache is stale until TTL. The delete-after-write is part of the pattern, not an extra.

**Negative caching.** Cache "not found" for a short time so missing keys do not beat the DB. Watch the create path: you must evict the negative entry.

<Callout icon="info" title="Aside is not read-through">
Read-through: the cache library loads on miss. Aside: your code loads. Same idea, different who-owns-the-query.
</Callout>

## 2. Mathematical / Theoretical Foundation

Expected latency is H times cache plus (1-H) times (cache + DB + set). Write amplification is one extra DEL. Consistency is TTL plus delete success.

Race: read miss, concurrent write, then SET of old value. Mitigate with versions or short TTL.

<ComparisonTable
  headers={['Pattern', 'Who fills', 'Write behavior', 'Stale risk']}
  rows={[
    ['Cache-aside', 'App on miss', 'App DELs', 'Race + missed DEL'],
    ['Read-through', 'Cache loader', 'Often DEL', 'Same races'],
    ['Write-through', 'On write', 'Sync set plus DB', 'Write latency'],
    ['Write-behind', 'On write to cache', 'Async DB', 'Loss on crash'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
def get_user(cache, db, user_id):
    key = f"user:{user_id}"
    cached = cache.get(key)
    if cached is not None:
        return cached
    user = db.get(user_id)
    if user is not None:
        cache.set(key, user, ttl=60)
    return user
TICK3

Pair with delete on update. Use a version field if the race matters.

## 4. Visualizations

TICK3mermaid
flowchart TD
    R[Read] --> G[GET]
    G -->|hit| Return
    G -->|miss| DB
    DB --> SET
    SET --> Return
TICK3

## 5. Interview Prep

**Q: Why not write-through everywhere?**
**A:** Aside avoids caching writes that are never read and keeps Redis out of the write latency path. Write-through is better when the next read is immediate and must be fresh.

**Q: What do you store?**
**A:** A serialized DTO, not a live ORM object. Include a schema version.

**Q: How long is TTL?**
**A:** As short as the product allows if invalidation can fail; as long as the working set needs to keep H high. Pick with numbers.

## 6. Production Use Cases

- **Default Redis + SQL** stack.
- **Session blobs** with explicit delete on logout.
- **Computed recommendations** with a short TTL.

<Callout icon="tip" title="Implement read and write in the same PR">
A cache-aside read without a write-side delete is just a TTL cache with a fancy name.
</Callout>
`,
  },
  {
    rel: '43.4 Caching/Database cache/index.mdx',
    title: 'Database Cache',
    description:
      'Caches the database already runs — buffer pools, result caches, and materialized views — plus when an extra Redis layer still helps.',
    body: `
**Database cache** means the engine's own caches: **buffer pool** (pages), **plan cache**, and optional **result cache**, plus objects you add next to the DB (**materialized views**, Redis of query results). Before you add Redis, know what Postgres or MySQL already keeps in RAM.

## 1. Deep Dive and Mechanics

**Buffer pool.** Disk pages stay in memory. A well-tuned pool makes "the DB is the cache" true for the working set. Random huge scans evict useful pages (cache stampede at the page layer).

**Result / query cache.** MySQL's old query cache is gone for good reasons (invalidation on any table write). Do not turn on folklore settings.

**Materialized views.** Stored results, refreshed on a schedule or on trigger. Great for dashboards. Stale by definition between refreshes.

**External query cache.** Redis of SELECT output. Same invalidation problems as cache-aside, plus huge keys if you cache wide rows.

<Callout icon="info" title="An index is not a cache">
Indexes make the miss path fast. They do not replace a pool that is too small for the working set.
</Callout>

## 2. Mathematical / Theoretical Foundation

Buffer hit ratio is pages served from RAM. If the working set W is larger than the pool P, hit ratio is roughly P/W for uniform access, better with skew.

Materialized view freshness is the refresh period T. Queries are wrong by up to T plus run time.

<ComparisonTable
  headers={['Layer', 'Unit', 'Invalidate']}
  rows={[
    ['Buffer pool', 'Page', 'Write to page'],
    ['Materialized view', 'Result set', 'Refresh'],
    ['Redis of SQL', 'Object', 'Your code'],
    ['CDN of GET', 'HTTP body', 'TTL / purge'],
  ]}
/>

## 3. Real-World Implementation

TICK3sql
-- Postgres: watch heap hits versus reads
-- shared_buffers sized for the hot working set
TICK3

Measure cache_hit from pg_stat_database before buying Redis for the same rows.

## 4. Visualizations

TICK3mermaid
flowchart LR
    Q[Query] --> Pool[Buffer pool]
    Pool -->|page hit| CPU
    Pool -->|page miss| Disk
    Q --> Redis[Optional Redis]
    Redis -->|miss| Pool
TICK3

## 5. Interview Prep

**Q: Should we cache SQL in Redis?**
**A:** If the query is expensive beyond page IO (joins, fan-out, serialization) or you want to shield the DB from app storms. If the pool already hits 99 percent, Redis may only add a consistency bug.

**Q: Why did the buffer pool miss spike?**
**A:** A new scan, a backup, or a working set that grew past RAM. Look at the query, not only at adding nodes.

**Q: Replica as a cache?**
**A:** A replica is a stale copy with a lag number. Good for read scale. Not a linearizable cache.

## 6. Production Use Cases

- **OLTP** sized so the hot pages fit in RAM.
- **Warehouse** result tables / MVs for BI.
- **Redis** for computed aggregates the DB would redo per request.

<Callout icon="tip" title="Quote the buffer hit ratio in the design">
It shows you understand the first cache, not only the trendy one.
</Callout>
`,
  },
  {
    rel: '43.4 Caching/Eviction policies/index.mdx',
    title: 'Cache Eviction Policies',
    description:
      'What the cache drops when it is full: LRU, LFU, FIFO, random, and TTL — the policy decides whether the working set stays hot.',
    body: `
An **eviction policy** picks the victim when the cache is at capacity. **LRU** drops the least recently used. **LFU** drops the least frequent. **FIFO** drops the oldest insert. **Random** is cheap. **TTL** drops expired entries even before capacity pressure. The right policy matches the access distribution.

## 1. Deep Dive and Mechanics

**LRU.** Scan-resistant? Classic LRU is not: a single full scan evicts the working set. Redis approximated LRU. Caffeine uses W-TinyLFU to resist scans.

**LFU.** Good for stable popularity (a catalog). Slow to admit a new hot key if counts are stale. Aging counters fix that.

**TTL as eviction.** Expiry is correctness (staleness bound) and capacity (natural drain). Do not rely on TTL alone to keep size down if keys refresh.

**Victim + sample.** Redis samples a few keys and evicts the best candidate. Exact LRU is too expensive at millions of keys.

<Callout icon="warning" title="A scan can flush an LRU">
A reporting query that walks every key through the cache layer will evict the homepage. Separate caches or use an admission policy.
</Callout>

## 2. Mathematical / Theoretical Foundation

Under Zipf access, a small cache captures a large hit fraction (heavy head). LRU is competitive for some sequences; there are adversarial sequences where LRU fails (Belady). Belady's MIN (evict the farthest next use) is optimal offline and not implementable online.

<ComparisonTable
  headers={['Policy', 'Drops', 'Good for', 'Weak against']}
  rows={[
    ['LRU', 'Cold recency', 'Temporal locality', 'Scans'],
    ['LFU', 'Unpopular', 'Stable Zipf', 'Shift in popularity'],
    ['FIFO', 'Oldest insert', 'Simple', 'Hot old keys'],
    ['TTL', 'Expired', 'Staleness bound', 'Size if refreshed'],
    ['Random', 'Anything', 'Cheap', 'Unlucky hot keys'],
  ]}
/>

## 3. Real-World Implementation

TICK3text
# Redis maxmemory-policy
allkeys-lru
volatile-ttl
allkeys-lfu
TICK3

volatile-* only evicts keys that have an expire. If you forgot TTL, the cache will hit maxmemory and start failing writes.

## 4. Visualizations

TICK3mermaid
flowchart TD
    Set[SET new key] --> Full{At maxmemory?}
    Full -->|no| Store
    Full -->|yes| Policy[Pick victim]
    Policy --> Evict --> Store
TICK3

## 5. Interview Prep

**Q: LRU versus LFU for a news site?**
**A:** News shifts: LRU or TinyLFU with aging. Pure LFU keeps yesterday's viral story too long and admits today's slowly.

**Q: What is scan resistance?**
**A:** Not letting a one-time sequential read evict the hot set. Windowed / admission filters (TinyLFU) help.

**Q: Why did Redis start rejecting writes?**
**A:** maxmemory hit and policy is noeviction, or only volatile keys exist and none have TTLs. Check the policy.

## 6. Production Use Cases

- **Redis maxmemory-policy** in every cluster that is not a pure store.
- **CDN** LRU at the POP.
- **CPU caches** (hardware LRU approximations) as the metaphor.

<Callout icon="tip" title="Pair eviction with a size budget">
A policy without maxmemory is not a policy. It is a leak.
</Callout>
`,
  },
  {
    rel: '43.4 Caching/Memcached/index.mdx',
    title: 'Memcached',
    description:
      'A simple distributed memory hash map: slabs, LRU per slab, no persistence — still the right dumb cache when you do not need Redis data types.',
    body: `
**Memcached** is an in-memory key-value cache. It speaks a simple protocol, stores bytes, and **forgets on restart**. Clustering is client-side consistent hashing. There are no lists, streams, or Lua. That simplicity is why it still wins as a **pure cache**.

## 1. Deep Dive and Mechanics

**Slabs.** Memory is carved into fixed-size classes. An item goes to the smallest slab that fits. Waste (internal fragmentation) happens when values sit just over a class size. LRU is per slab, not global — a surprising eviction story.

**No persistence.** Restart = empty. That is a feature for a cache. Do not put sessions you cannot rebuild in Memcached unless you accept a logout storm.

**Client sharding.** The client maps keys to nodes. Add a node and you lose a slice of keys (consistent hashing reduces but does not zero that). mcrouter and similar proxies help.

**Multithreading.** Memcached scales on many cores for GET/SET. Fine for high QPS simple values.

<Callout icon="info" title="Memcached is not a database">
If you need replication, persistence, or a counter that must not reset, you wanted Redis or SQL. Use Memcached to drop load.
</Callout>

## 2. Mathematical / Theoretical Foundation

Hit ratio depends on per-slab LRU. A slab class that is too hot evicts inside that class while another class sits idle. Slab auto-reassign (newer versions) tries to move memory.

Consistent hashing: adding 1 of N nodes remaps about 1/N of keys.

<ComparisonTable
  headers={['', 'Memcached', 'Redis as cache']}
  rows={[
    ['Data types', 'Bytes', 'Many'],
    ['Persistence', 'No', 'Optional'],
    ['Eviction', 'Slab LRU', 'Configurable'],
    ['Ops surface', 'Tiny', 'Large'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
# client.set("user:42", blob, expire=60)
# client.get("user:42")
TICK3

Cap value size. Compress large JSON. Do not store 1 MB objects if you can avoid it (slab pain, network).

## 4. Visualizations

TICK3mermaid
flowchart LR
    App --> Hash[Client hash]
    Hash --> N1[Memcached A]
    Hash --> N2[Memcached B]
    Hash --> N3[Memcached C]
TICK3

## 5. Interview Prep

**Q: Why Memcached over Redis?**
**A:** You want a cache that cannot be mistaken for a store, you need simple high-QPS GET/SET, and you like slab simplicity. Facebook-scale lore is Memcached.

**Q: What is a slab eviction surprise?**
**A:** Keys of size 80 bytes evict each other even if there is free RAM in another slab class. Watch slab stats.

**Q: How do you warm after restart?**
**A:** You do not, mostly. Accept a miss storm or pre-warm critical keys. This is why stampede control matters.

## 6. Production Use Cases

- **HTML fragment** caches.
- **ORM** second-level cache.
- **Sidecar** next to a stateless fleet.

<Callout icon="tip" title="Keep values small and TTLs honest">
Memcached rewards boring blobs. The moment you need a lock or a list, switch tools.
</Callout>
`,
  },
  {
    rel: '43.4 Caching/Redis/index.mdx',
    title: 'Redis',
    description:
      'An in-memory data structure server used as cache, lock, queue, and light store — persistence and HA are optional and easy to misconfigure.',
    body: `
**Redis** is an in-memory data structure server: strings, hashes, lists, sets, sorted sets, streams, and more. As a **cache**, it is Memcached-plus. As a **store**, you must choose persistence (RDB, AOF) and HA (replicas, Sentinel, Cluster) on purpose. The default mental model should stay "memory with optional disk."

## 1. Deep Dive and Mechanics

**Single-threaded command execution** (core). Commands are atomic. Throughput is high for small ops. Huge KEYS or big Lua blocks everyone. Use SCAN. Use Cluster to split.

**As cache.** maxmemory plus an eviction policy. TTLs on keys. Aside or write-through in the app.

**As lock.** SET NX PX. Still need a fence token for the Redlock debate; for a single instance, a token and short TTL are the usual job lock.

**Persistence.** RDB snapshots, AOF fsync every-second or always. everysec can lose a second on crash (PACELC: latency over durability).

<Callout icon="warning" title="A replica is async unless you wait">
WAIT and WAIT AOF exist. Default replication is async. Failover can lose the last writes. Do not put the only copy of money in Redis without a design review.
</Callout>

## 2. Mathematical / Theoretical Foundation

Memory is O(keys plus values plus overhead). Fragmentation exists. Cluster shards by hash slot (16384). Hot slots are the same hot-key problem as Kafka partitions.

Eviction plus persistence: an evicted key is gone even if AOF is on; AOF replays writes, not "all keys that used to exist."

<ComparisonTable
  headers={['Role', 'Config you must set', 'Failure']}
  rows={[
    ['Cache', 'maxmemory + policy + TTL', 'Stampede, stale'],
    ['Lock', 'NX + PX + token', 'Long critical section'],
    ['Queue / stream', 'MAXLEN, PEL', 'OOM'],
    ['Primary store', 'AOF, HA, backups', 'Data loss, ops load'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
r.set("user:42", json, ex=60)
r.get("user:42")
TICK3

Pipeline small GETs. Avoid N+1 round trips. Prefer hashes for many tiny fields of one object.

## 4. Visualizations

TICK3mermaid
flowchart TB
    App --> Redis
    Redis --> RDB[RDB snapshot]
    Redis --> AOF[AOF]
    Redis --> Rep[Async replica]
TICK3

## 5. Interview Prep

**Q: Redis versus Memcached?**
**A:** Redis if you need types, TTL ops, pub/sub, or optional persist. Memcached if you want a dumb slab cache and nothing else.

**Q: What does KEYS * do in prod?**
**A:** It walks the keyspace on the main thread and can stall the instance. Never. Use SCAN.

**Q: Cluster versus Sentinel?**
**A:** Sentinel: failover for one primary plus replicas. Cluster: shard slots across primaries. Different problems.

## 6. Production Use Cases

- **Session and rate-limit** counters.
- **Cache-aside** for SQL.
- **Streams** for modest job loads.

<Callout icon="tip" title="Decide cache versus store in the first sentence">
The rest of the Redis design (persist, HA, backup) follows from that sentence.
</Callout>
`,
  },
  {
    rel: '43.4 Caching/TTL/index.mdx',
    title: 'Time-To-Live (TTL)',
    description:
      'A per-key lifetime after which the cache must treat the value as gone — the upper bound on staleness when invalidation fails.',
    body: `
**TTL** (time-to-live) is how long a cached entry may be served before it expires. After expiry the next read misses (or serves stale if you designed that). TTL is the **staleness budget** and the **safety net** when a delete is forgotten.

## 1. Deep Dive and Mechanics

**Absolute versus sliding.** Absolute: expire at T after write. Sliding: expire at T after last read (session-style). Sliding can keep a hot stale value forever if you never write.

**Jitter.** Add a random extra few seconds so many keys do not expire in the same millisecond (stampede smear).

**Lazy versus active expiry.** Redis often expires on access and in a background sample. A key can sit past TTL until sampled. Do not assume a precise wall-clock drop.

**Negative TTL.** Cache misses briefly so the DB is not hammered for absent rows. Evict on create.

<Callout icon="info" title="TTL is not invalidation">
A price change at t=0 with TTL 3600 can be wrong for an hour. If that is too long, delete on write and keep a shorter TTL as backup.
</Callout>

## 2. Mathematical / Theoretical Foundation

If writes are Poisson and TTL is T, worst-case staleness is T. Expected staleness for a random read after a write is T/2 if the write did not evict.

Jitter uniform on [0, J] spreads expiry. Combined with locks, origin QPS stays near the miss rate, not the request rate.

<ComparisonTable
  headers={['TTL style', 'Expires', 'Use']}
  rows={[
    ['Absolute', 'Write time plus T', 'Catalog, pages'],
    ['Sliding', 'Last touch plus T', 'Sessions'],
    ['Jittered', 'T plus random', 'Hot key herds'],
    ['No TTL', 'Only eviction', 'Dangerous as cache'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
import random

def ttl_with_jitter(base, jitter):
    return base + random.randint(0, jitter)
TICK3

Set both base and jitter from config. Log the key when you pick a 24h TTL for authz.

## 4. Visualizations

TICK3mermaid
flowchart LR
    Set[SET plus TTL] --> Fresh[Serve]
    Fresh --> Exp[Expired]
    Exp --> Miss[Reload]
    Miss --> Set
TICK3

## 5. Interview Prep

**Q: How do you pick T?**
**A:** Max staleness the product accepts, then shorter if memory is tight. Measure miss QPS and origin capacity.

**Q: Why is a key still there after TTL?**
**A:** Lazy expiry, or you looked at the wrong Redis, or a write refreshed it. TTL on Redis is PTTL.

**Q: Sliding TTL for a cache of user profiles?**
**A:** A popular stale profile never dies. Use absolute TTL plus delete on write.

## 6. Production Use Cases

- **DNS** TTLs (a related idea at another layer).
- **Redis EXPIRE** on every cache-aside fill.
- **HTTP max-age** as the browser/CDN TTL.

<Callout icon="tip" title="Write TTL next to the key name">
"We cache users" is incomplete. "user:id for 45 seconds plus delete on PATCH" is a design.
</Callout>
`,
  },
  {
    rel: '43.4 Caching/Write-back/index.mdx',
    title: 'Write-Back Cache (Write-Behind)',
    description:
      'Writes hit the cache first and flush to the database later — fast acks, risk of loss, and a queue you must operate.',
    body: `
**Write-back** (write-behind) applies the write to the **cache first** and acknowledges the client. A **flusher** later writes the database. Reads see the cache. This is the CPU-cache story. In distributed systems it is a **durability bet**: if the cache node dies before flush, the write is gone unless you log it.

## 1. Deep Dive and Mechanics

**Why people want it.** Write-heavy APIs with a hot key (counters, last-seen). Batching many increments into one SQL UPDATE.

**The log.** Production write-back is a durable queue (Redis stream, WAL, Kafka) plus a cache. Memory-only write-back is a lab trick.

**Ordering.** Flushes must not apply an old value over a new one. Use versions or last-write-wins with care.

**Failure.** Cache down = cannot read the latest write even if the DB has an old copy. You need a story for both sides.

<Callout icon="error" title="If Redis is the only copy, you adopted Redis as the database">
Say that out loud. Then add AOF, HA, and backups — or do not use write-back for that key.
</Callout>

## 2. Mathematical / Theoretical Foundation

Ack latency is cache RTT, not DB fsync. RPO is the flush lag (seconds of writes). Throughput gain is batch size B: DB writes drop by about B if you coalesce.

PACELC: this is EL (latency) with a large RPO.

<ComparisonTable
  headers={['Pattern', 'Ack waits for DB', 'Loss on cache crash', 'Read after write']}
  rows={[
    ['Write-through', 'Yes', 'Low', 'Fresh'],
    ['Write-around', 'Yes', 'Low', 'Miss then stale risk'],
    ['Write-back', 'No', 'High unless logged', 'Fresh in cache'],
    ['Cache-aside', 'Yes (app write)', 'N/A', 'After DEL + read'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
def incr_views(cache, queue, video_id):
    cache.incr(f"views:{video_id}")
    queue.send(video_id)  # flusher will SUM into SQL
TICK3

The flusher must be idempotent (set views = views + delta from a cursor).

## 4. Visualizations

TICK3mermaid
sequenceDiagram
    participant C as Client
    participant Cache
    participant Q as Flush queue
    participant D as DB
    C->>Cache: write
    Cache-->>C: ok
    Cache->>Q: enqueue
    Q->>D: batched write
TICK3

## 5. Interview Prep

**Q: When is write-back OK?**
**A:** Counters and telemetry where losing a few seconds is fine, or when the queue is as durable as the DB. Not for billing without a WAL.

**Q: Write-around?**
**A:** Write DB only; cache fills on read. Avoids filling the cache with write-only junk. Next read is a miss.

**Q: How do you handle cache miss after a write-back write?**
**A:** You must not load the stale DB over the unflushed value. Read repair from the queue, or pin those keys to never miss (dangerous), or do not use write-back.

## 6. Production Use Cases

- **View counters** flushed every few seconds.
- **CPU and kernel** page caches (the namesake).
- **Session stores** that are explicitly Redis-as-DB.

<Callout icon="tip" title="Draw RPO in seconds">
If the number is not acceptable, you do not have a write-back design. You have write-through or aside.
</Callout>
`,
  },
  {
    rel: '43.4 Caching/Write-through/index.mdx',
    title: 'Write-Through Cache',
    description:
      'Each write updates the cache and the database on the same request path so the next read hits fresh data at the cost of write latency.',
    body: `
**Write-through** updates the **cache and the database** before the write API returns. The cache should already hold the new value, so the next read does not miss and does not see the old row. You pay **two waits** on the write path (or a transaction that includes both).

## 1. Deep Dive and Mechanics

**Order.** Write DB then cache, or cache then DB, or a transaction. DB-then-cache: a crash after DB leaves a stale cache until you retry SET. Cache-then-DB: a crash after cache leaves a value the DB never got (lie). Prefer **DB then SET**, and SET the value you committed, not a separate read.

**What you cache.** If you cannot build the full cached object from the write, SET is incomplete — DEL instead (aside). Write-through shines when the written blob is exactly what you cache.

**Write amplification.** Every write touches Redis, including keys nobody reads. That is wasted RAM and QPS. Aside only fills on read.

<Callout icon="info" title="Write-through is not a distributed transaction unless you make one">
A successful SQL COMMIT plus a failed Redis SET is stale until retry. Retry SET; do not pretend it is atomic.
</Callout>

## 2. Mathematical / Theoretical Foundation

Write latency is T_db plus T_cache (serial) or max if you pipeline after commit. Read latency after a successful write is T_cache.

Failure modes are partial commits. Idempotent SET retries close the window. TTL still bounds a lost SET.

<ComparisonTable
  headers={['Pattern', 'Write latency', 'Warm after write', 'Wasted fills']}
  rows={[
    ['Write-through', 'DB plus cache', 'Yes', 'Yes'],
    ['Write-back', 'Cache', 'Yes', 'Yes'],
    ['Cache-aside', 'DB plus DEL', 'No (miss later)', 'No'],
    ['Write-around', 'DB', 'No', 'No'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
def put_profile(db, cache, profile):
    db.save(profile)
    cache.set(f"profile:{profile.id}", profile, ttl=300)
TICK3

Retry cache.set on failure. Metrics on retry count tell you when Redis is the write SLO.

## 4. Visualizations

TICK3mermaid
sequenceDiagram
    participant C as Client
    participant A as App
    participant D as DB
    participant R as Cache
    C->>A: PUT
    A->>D: COMMIT
    A->>R: SET
    A-->>C: 200
TICK3

## 5. Interview Prep

**Q: Write-through versus cache-aside?**
**A:** Through: next read is warm and fresh, writes are slower, unused keys occupy RAM. Aside: cheaper writes, first read misses, you must remember DEL.

**Q: Can the cache be ahead of the DB?**
**A:** If you SET before COMMIT, yes. Do not. SET after COMMIT.

**Q: ORM write-through?**
**A:** Hibernate/JPA second-level cache can write-through. Confirm the eviction on bulk SQL that bypasses the ORM.

## 6. Production Use Cases

- **Profiles** edited then immediately viewed.
- **Feature-flag** admin writes.
- **Read-through libraries** that also write-through on put.

<Callout icon="tip" title="Retry the SET as part of the handler">
A 200 to the client with a failed SET is a latent support ticket. Make SET failure visible.
</Callout>
`,
  },
]
