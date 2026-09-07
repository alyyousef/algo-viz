export const conceptPagesA = [
  {
    rel: '43.1 System Design Concepts/API gateways/index.mdx',
    title: 'API Gateways',
    description:
      'A Layer-7 entry point that authenticates, routes, rate-limits, and aggregates calls so clients talk to one facade instead of every microservice.',
    body: `
**API gateways** sit between clients and a fleet of backend services. The phone app, web SPA, and partner integration call one hostname. The gateway terminates TLS, checks identity, applies policy, and fans the request out to the right owners. Without it, every client must know every service address, version, and auth dance.

## 1. Deep Dive and Mechanics

A gateway is a reverse proxy with opinions. It matches path, host, and sometimes headers, then forwards to an upstream cluster. Cross-cutting work lives here so each microservice does not reimplement it.

**Typical duties.** JWT or mTLS authentication. Per-key and per-IP rate limits. Request size caps. Header rewriting. Canary routing. Protocol translation (REST in, gRPC out). Optional BFF-style aggregation so a dashboard is one round trip, not twelve.

**Where it must not live.** Business rules that only one domain understands. A payments team should own refund logic. If the gateway starts encoding product policy, you have built a distributed monolith with a single choke point.

<Callout icon="warning" title="The gateway is in the critical path">
Every extra hop, regex, and JSON rewrite adds tail latency. Profile p99 on the gateway itself, not only on upstreams.
</Callout>

## 2. Mathematical / Theoretical Foundation

Think of the gateway as a function G that maps an inbound request to a set of upstream calls and a merge function. Fan-out of k services in parallel is bounded by the slowest of those k plus gateway overhead. Availability of the facade is the product of gateway availability and the availability of the required subset of backends (unless you degrade).

Rate limiting is usually a token bucket or sliding window per key. The math is local until you shard counters across gateway replicas, at which point you trade exactness for speed.

<ComparisonTable
  headers={['Layer', 'Sees payload', 'Typical job', 'Example']}
  rows={[
    ['L4 load balancer', 'No', 'TCP fan-out', 'NLB, HAProxy TCP'],
    ['API gateway', 'Yes', 'Auth, route, shape', 'Kong, Apigee, AWS API GW'],
    ['Service mesh sidecar', 'Yes east-west', 'mTLS, retries', 'Envoy, Linkerd'],
    ['BFF', 'Yes', 'Client-specific aggregate', 'GraphQL or mobile BFF'],
  ]}
/>

## 3. Real-World Implementation

TICK3nginx
# Conceptual gateway location: auth + route, not business logic
location /v1/orders/ {
    auth_request /_int/jwt;
    limit_req zone=per_key burst=20 nodelay;
    proxy_pass http://orders_upstream;
    proxy_set_header X-Request-Id $request_id;
}
TICK3

Keep JWT validation in a sidecar or auth_request so the route block stays short. Aggregation belongs in a dedicated BFF service if it grows beyond a few fan-outs.

## 4. Visualizations

TICK3mermaid
flowchart LR
    Mobile[Mobile client] --> GW[API gateway]
    Web[Web SPA] --> GW
    GW --> Auth[AuthN and rate limit]
    Auth --> Orders[Orders service]
    Auth --> Catalog[Catalog service]
    Auth --> Pay[Payments service]
TICK3

## 5. Interview Prep

**Q: Gateway versus load balancer?**
**A:** A balancer often works at L4 and is payload-blind. A gateway parses HTTP, applies identity and policy, and may rewrite or aggregate. Many production edges are both: L4 in front, L7 gateway behind.

**Q: Why not let every client call services directly?**
**A:** Clients then own discovery, versioning, CORS, auth, and fan-out. Mobile binaries cannot change as fast as the backend. The gateway is the stable contract.

**Q: What fails first at scale?**
**A:** Shared connection pools, oversized request bodies, and synchronous aggregation of a slow dependency. Time out and degrade rather than wait for every backend.

## 6. Production Use Cases

- **Public API products** with key-based quotas and developer portals.
- **Mobile BFFs** that collapse several microservice calls into one payload.
- **Enterprise ingress** that terminates mTLS from partners and maps to internal gRPC.

<Callout icon="tip" title="Version the external contract, not the internals">
Keep /v1 stable. Split, merge, or rewrite upstreams behind the gateway without forcing app-store releases.
</Callout>
`,
  },
  {
    rel: '43.1 System Design Concepts/Availability/index.mdx',
    title: 'Availability',
    description:
      'The share of time a service can serve correct work, usually expressed as nines of uptime and bought with redundancy, failover, and honest SLOs.',
    body: `
**Availability** is the fraction of time a system does useful work for a caller who plays by the rules. The classroom formula is uptime divided by uptime plus downtime. In production you measure successful requests against valid attempts, because a process can be "up" and still fail every checkout.

## 1. Deep Dive and Mechanics

Nines are a budget, not a slogan. Two nines allow days of downtime a year. Four nines allow about an hour. Five nines are minutes. Each extra nine usually costs an order of magnitude more architecture: multi-AZ, then multi-region, then active-active with conflict rules.

**What counts as down.** A 500 storm, a hung connection pool, and a dependency timeout that surfaces as errors all burn the same error budget. Planned maintenance counts unless you have a defined exclusion in the SLO.

**How you buy it.** Redundant instances behind a balancer. Health checks that actually probe the dependency you care about. Fast failover. Isolation so one noisy tenant cannot take the fleet. Dependency budgets so a cache miss does not cascade.

<Callout icon="warning" title="Availability is not the same as correctness">
Serving stale balances at 100 percent uptime can still be a Sev-1. Pair availability SLOs with freshness or consistency SLOs where money moves.
</Callout>

## 2. Mathematical / Theoretical Foundation

If independent components are in series, availability multiplies: A_sys = A1 * A2 * A3. Three services at 99.9 percent yield about 99.7 percent if any failure fails the request. Parallel redundancy with failover is 1 minus the product of unavailabilities, assuming failures are independent (they rarely are: shared disks, shared config, shared people).

Error budgets translate nines into allowed failed requests in a window. A 99.9 percent monthly SLO on 100 million calls allows 100 thousand failures. Burn-rate alerts watch how fast you spend that budget.

<ComparisonTable
  headers={['Target', 'Downtime per year', 'Typical posture', 'Cost shape']}
  rows={[
    ['99 percent', 'About 3.7 days', 'Single region, cold spare', 'Low'],
    ['99.9 percent', 'About 8.8 hours', 'Multi-AZ, automated failover', 'Moderate'],
    ['99.99 percent', 'About 53 minutes', 'Multi-region or very tight HA', 'High'],
    ['99.999 percent', 'About 5 minutes', 'Active-active, practiced failover', 'Very high'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
def availability(successes, valid_attempts):
    if valid_attempts <= 0:
        return 0.0
    return successes / valid_attempts

# 99.9 percent monthly SLO on 10_000_000 valid requests
budget = 10_000_000 * (1 - 0.999)
print('allowed failures', int(budget))
TICK3

Exclude bot traffic and 404s for unknown routes if the SLO says so. Do not exclude "just the incident."

## 4. Visualizations

TICK3mermaid
flowchart TD
    Client[Client] --> Edge[Edge and LB]
    Edge --> A[AZ-a replica]
    Edge --> B[AZ-b replica]
    A --> Dep[Shared dependency]
    B --> Dep
    Dep --> Risk[Correlated failure risk]
TICK3

## 5. Interview Prep

**Q: How many nines do we need?**
**A:** Match the cost of being down. An internal report job can live at 99 percent. Card authorization cannot. Write the SLO from user pain, then design to it.

**Q: Why is 99.9 times 99.9 not 99.9?**
**A:** Series dependencies multiply. The user journey crosses gateway, app, and database. The journey SLO is worse than any one box unless you hide failures.

**Q: High availability versus disaster recovery?**
**A:** HA is short-term failover inside a design (AZ loss). DR is rebuilding after a region or data-loss event. RTO and RPO are DR numbers; nines are usually HA plus process.

## 6. Production Use Cases

- **Checkout and login** paths with tight SLOs and multi-AZ databases.
- **Control planes** (Kubernetes API, IAM) that must outlive any single worker pool.
- **Status pages and feature flags** that stay up so you can degrade the main app honestly.

<Callout icon="tip" title="Measure the user journey">
A green /health that pings localhost lies. Probe the query or write the user actually needs.
</Callout>
`,
  },
  {
    rel: '43.1 System Design Concepts/Backpressure/index.mdx',
    title: 'Backpressure',
    description:
      'A flow-control signal that slows or sheds producers when a consumer or queue cannot keep up, protecting memory and tail latency.',
    body: `
**Backpressure** is how a slow consumer tells a fast producer to ease off. Without it, queues grow without bound, heap memory dies, and latency goes non-linear. With it, the system either slows intake, drops low-value work, or fails fast so callers can retry elsewhere.

## 1. Deep Dive and Mechanics

There are three honest responses to overload: **block** the producer, **bounded-queue and reject**, or **shed** (drop or sample). Blocking is simple inside one process (a blocking queue). Across the network you need explicit windows, HTTP 429, gRPC RESOURCE_EXHAUSTED, or a pull model where the consumer asks for the next batch.

**Push versus pull.** Kafka consumers pull; a stuck consumer does not force brokers to buffer infinite application memory. HTTP APIs are push: the client decides to send. Then the server must refuse or the edge must throttle.

**Propagation.** True backpressure walks upstream. If service C is slow, B must stop calling C as fast, and A must see B slow down. Circuit breakers and bulkheads help, but they are cousins, not substitutes: they isolate failure, they do not always slow the original producer.

<Callout icon="warning" title="An unbounded channel is a time bomb">
In-memory queues without a max length convert a downstream outage into an OOM. Bound the queue and define what happens when it is full.
</Callout>

## 2. Mathematical / Theoretical Foundation

Little's law: L = lambda * W. If arrival rate lambda exceeds service rate mu, queue length grows without limit. Stability requires lambda less than mu, or a shed policy that throws work away so the admitted lambda stays under mu.

Windowed protocols (TCP, HTTP/2 flow control, Reactive Streams request-n) keep in-flight work under a credit budget. Credits are the discrete form of backpressure.

<ComparisonTable
  headers={['Strategy', 'Producer sees', 'Data loss', 'Use when']}
  rows={[
    ['Block / credit window', 'Slowdown', 'None if it waits', 'In-process or trusted clients'],
    ['Bounded reject', '429 or error', 'None of admitted work', 'Public APIs'],
    ['Drop oldest / sample', 'Silence or metric', 'Yes', 'Telemetry, best-effort streams'],
    ['Load shed by priority', 'Low-pri fail', 'Low-pri only', 'Mixed criticality'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
from collections import deque

class BoundedInbox:
    def __init__(self, cap):
        self.q = deque()
        self.cap = cap

    def offer(self, item):
        if len(self.q) >= self.cap:
            return False  # caller must 429 or retry later
        self.q.append(item)
        return True

    def take(self):
        return self.q.popleft() if self.q else None
TICK3

Return 429 with Retry-After on False. Do not silently enqueue to disk unless that disk path is itself bounded and monitored.

## 4. Visualizations

TICK3mermaid
flowchart LR
    Prod[Producer] -->|offer| Q[Bounded queue]
    Q -->|full| Rej[Reject or 429]
    Q -->|item| Cons[Consumer]
    Cons -->|credits| Prod
TICK3

## 5. Interview Prep

**Q: Is a message broker backpressure?**
**A:** Only if produce is blocked or rejected when the broker or consumer lag hits a limit. A broker with infinite retention and a deaf consumer is delayed disaster, not flow control.

**Q: Backpressure versus rate limiting?**
**A:** Rate limits are a priori policy (N per key). Backpressure is dynamic: it reacts to actual queue depth or RTT. You usually want both.

**Q: Why does TCP not save my API?**
**A:** TCP windows protect the connection, not your thread pool or downstream database. The app must bound its own concurrency.

## 6. Production Use Cases

- **Ingest APIs** that 429 when the write-ahead log or consumer lag crosses a threshold.
- **Stream processors** using Reactive Streams or async pull so a slow sink does not balloon heap.
- **Edge proxies** that limit in-flight requests per upstream.

<Callout icon="tip" title="Export queue depth as a golden signal">
Depth, age of head, and reject rate tell you whether backpressure is working or whether you are already in the red.
</Callout>
`,
  },
  {
    rel: '43.1 System Design Concepts/Bulkhead pattern/index.mdx',
    title: 'Bulkhead Pattern',
    description:
      'Isolate pools of connections, threads, and resources so a failure or flood in one dependency cannot sink the whole process.',
    body: `
The **bulkhead pattern** borrows from ship design: watertight compartments keep one flooded hold from sinking the hull. In software you partition thread pools, connection pools, processes, or even clusters so that a stuck payments client cannot steal every worker from search.

## 1. Deep Dive and Mechanics

A typical service has one shared executor and one shared HTTP client. When a dependency hangs, every request thread blocks on it, health checks fail, and the instance is pulled from rotation — even for URLs that never touched the bad dependency.

**Isolation axes.** Separate thread pools or semaphores per dependency. Separate connection pools. Separate JVM or container for a risky plugin. Separate node pool or cell for a noisy tenant. The finer the isolation, the more unused capacity you waste; that is the tax.

**Combine with timeouts.** A bulkhead without a timeout still fills: all eight payments permits block forever. Timeouts free the permit. Circuit breakers stop sending once the compartment is clearly unhealthy.

<Callout icon="info" title="Bulkheads waste capacity on purpose">
Idle threads in the search pool while payments is slammed is success, not waste. Shared pools maximize utilization until the first outage.
</Callout>

## 2. Mathematical / Theoretical Foundation

Model each dependency as a queue with capacity C_i (permits). Loss of dependency i saturates only C_i workers. Remaining capacity is Total - C_i for everyone else. Shared-pool blast radius is Total.

This is the same math as multi-class queues with reserved servers. You are choosing a utilization penalty to cap correlated blocking.

<ComparisonTable
  headers={['Isolation', 'Blast radius', 'Ops cost', 'Typical tool']}
  rows={[
    ['Shared pool', 'Whole process', 'Lowest', 'Default HTTP client'],
    ['Semaphore per dep', 'That dep pool', 'Low', 'Resilience4j, failsafe'],
    ['Process / container', 'That process', 'Medium', 'Sidecar, separate pod'],
    ['Cell or cluster', 'That cell', 'High', 'Shard by tenant'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
import threading

class Bulkhead:
    def __init__(self, limit):
        self.sem = threading.Semaphore(limit)

    def call(self, fn):
        if not self.sem.acquire(blocking=False):
            raise RuntimeError('bulkhead_full')
        try:
            return fn()
        finally:
            self.sem.release()

payments = Bulkhead(8)
search = Bulkhead(32)
TICK3

Tune limits from concurrency = target_latency * offered_rate, then add headroom. Alert on bulkhead_full separately from dependency 5xx.

## 4. Visualizations

TICK3mermaid
flowchart TD
    Req[Incoming request] --> Router[Handler]
    Router --> P[Payments bulkhead 8]
    Router --> S[Search bulkhead 32]
    P --> PayAPI[Payments API]
    S --> SearchAPI[Search API]
TICK3

## 5. Interview Prep

**Q: Bulkhead versus circuit breaker?**
**A:** Bulkhead limits concurrent exposure. Circuit breaker stops calling after a failure threshold. Use both: the bulkhead caps the storm; the breaker short-circuits a dead dep.

**Q: Why not isolate every function?**
**A:** Too many tiny pools under-utilize hardware and create tuning hell. Isolate at failure domains: each network dependency, each tenant class, each disk.

**Q: How do you size the pool?**
**A:** Start from expected concurrency and timeout. If timeout is 200 ms and you want 400 payments QPS, you need about 80 in-flight, not 8. Measure, then reserve.

## 6. Production Use Cases

- **BFF or gateway** calling many backends with per-host executors.
- **Multi-tenant SaaS** cells so one customer import cannot starve interactive traffic.
- **Plugin platforms** where third-party code gets its own process and CPU quota.

<Callout icon="tip" title="Name the compartment in metrics">
bulkhead=payments, outcome=full is an actionable page. A generic thread-pool-exhausted is not.
</Callout>
`,
  },
  {
    rel: '43.1 System Design Concepts/CDNs/index.mdx',
    title: 'CDNs',
    description:
      'Edge caches and PoPs that serve static and cacheable HTTP close to users, cutting origin load, latency, and some classes of attack traffic.',
    body: `
A **content delivery network (CDN)** is a fleet of points of presence that cache and sometimes compute at the edge. Users hit a nearby PoP. The PoP serves from cache or fetches from origin. The win is shorter RTT, lower origin IOPS, and a shield against naive floods.

## 1. Deep Dive and Mechanics

DNS or anycast maps the client to a PoP. The PoP looks up the object by URL, Vary headers, and cache key. Hits return immediately. Misses go to origin (or a regional shield) and populate the edge.

**What belongs on a CDN.** Immutable hashed assets (app.ab12.js). Images and video with long TTL. Public API GET responses that tolerate brief staleness. TLS termination and WAF rules. **What does not.** Personalized, authorization-sensitive HTML unless you vary the cache key correctly and accept the leak risk.

**Invalidation.** Purge by URL or tag when content changes. Immutable filenames with content hashes avoid purge races: new deploy = new URL.

<Callout icon="warning" title="Cache keys must include what changes the bytes">
Missing a cookie, Accept-Language, or auth context on a shared cache key serves User A the page of User B.
</Callout>

## 2. Mathematical / Theoretical Foundation

Hit ratio h means origin sees (1 - h) of requests plus revalidations. Origin offload is roughly h, minus uncacheable traffic. Latency is RTT_pop + (1 - h) * (RTT_origin + origin_time) on a simple model.

Capacity planning: edge storage versus working set. A tiny PoP cannot hold a long-tail catalog; expect a power-law of hits.

<ComparisonTable
  headers={['Asset', 'TTL posture', 'Key care', 'Origin load']}
  rows={[
    ['Hashed JS/CSS', 'Year, immutable', 'URL only', 'Near zero after warmup'],
    ['Product image', 'Days plus purge', 'URL plus size', 'Low'],
    ['Public GET API', 'Seconds to minutes', 'URL plus vary', 'Medium'],
    ['Authed HTML', 'Usually bypass', 'Dangerous if shared', 'High'],
  ]}
/>

## 3. Real-World Implementation

TICK3
Cache-Control: public, max-age=31536000, immutable
# filename: main.9f3a2c.js  — content hash, never reuse

Cache-Control: public, max-age=60, stale-while-revalidate=30
# marketing homepage: short TTL, serve stale while origin refreshes
TICK3

Pair short-TTL HTML with a shield PoP so thundering herds collapse to one origin fetch.

## 4. Visualizations

TICK3mermaid
flowchart LR
    User[User] --> DNS[DNS or anycast]
    DNS --> PoP[Nearby PoP]
    PoP -->|hit| User
    PoP -->|miss| Shield[Regional shield]
    Shield --> Origin[Origin]
TICK3

## 5. Interview Prep

**Q: CDN versus reverse proxy cache at origin?**
**A:** An origin cache helps one region. A CDN puts copies near users worldwide and absorbs geographic load. Many stacks use both.

**Q: How do you rotate a leaked asset?**
**A:** Change the content hash / URL. Purging a long-TTL object is best-effort across hundreds of PoPs; a new name is certain.

**Q: Can a CDN replace an API gateway?**
**A:** It can terminate TLS, WAF, and cache GETs. It is a poor place for complex per-tenant business aggregation. Use both when you need both.

## 6. Production Use Cases

- **SPA and mobile asset delivery** with hashed filenames.
- **Video and large-file download** via segmented objects and range requests.
- **API edge caching** for public catalog reads during launches.

<Callout icon="tip" title="Prefer immutable URLs over emergency purges">
Purge is a reliability feature, not a deploy strategy. Hash the content and let TTL be long.
</Callout>
`,
  },
  {
    rel: '43.1 System Design Concepts/Caching strategies/index.mdx',
    title: 'Caching Strategies',
    description:
      'Patterns for where a cache sits and how reads and writes flow: aside, through, back, refresh-ahead, and when to skip caching entirely.',
    body: `
**Caching strategies** decide who writes the cache, who reads it, and what happens on miss or on write. The wrong pattern is a consistency bug with a latency costume. The right one is a working set in fast memory and a database that sleeps.

## 1. Deep Dive and Mechanics

**Cache-aside (lazy).** App reads cache; on miss, loads DB, then fills cache. Writes go to DB and then delete or update the key. Simple and common. Risk: two writers race and restore stale data.

**Write-through.** App writes cache and DB in the same path (cache library or proxy writes DB). Reads are fast and the cache is never secretly behind on that key — at the cost of write latency.

**Write-back.** App writes cache; DB is updated later. Fast writes, risk of loss if the cache node dies before flush.

**Refresh-ahead / read-through.** A cache proxy knows how to load the DB. Clients always talk to the cache.

<Callout icon="warning" title="Invalidation is the hard part">
Every strategy still needs a story for updates, TTL, and stampede. A strategy name is not a complete design.
</Callout>

## 2. Mathematical / Theoretical Foundation

Expected read latency is h * L_cache + (1 - h) * L_miss. Hit rate h is a property of working-set size versus cache size and of key skew (Zipf). Write-heavy keys with tiny TTL have h near zero; do not cache them.

Stampede: if a hot key expires and N clients miss together, miss amplification is N. Probabilistic early expire or single-flight coalescing brings it back toward 1.

<ComparisonTable
  headers={['Strategy', 'Read path', 'Write path', 'Failure worry']}
  rows={[
    ['Cache-aside', 'App fills on miss', 'DB then evict', 'Stale fill race'],
    ['Write-through', 'Cache first', 'Cache and DB together', 'Write latency'],
    ['Write-back', 'Cache first', 'Cache then async DB', 'Lost dirty data'],
    ['Read-through', 'Library loads DB', 'Policy-dependent', 'Hidden coupling'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
def get_user(cache, db, user_id):
    key = 'user:' + user_id
    hit = cache.get(key)
    if hit is not None:
        return hit
    row = db.fetch_user(user_id)
    cache.set(key, row, ttl_s=60)
    return row

def update_user(cache, db, user_id, fields):
    db.update_user(user_id, fields)
    cache.delete('user:' + user_id)
TICK3

Delete-on-write is safer than set-on-write when multiple columns and caches exist. Pair with short TTL as a backstop.

## 4. Visualizations

TICK3mermaid
flowchart TD
    App[App] -->|1 get| Cache[Cache]
    Cache -->|2 miss| App
    App -->|3 query| DB[Database]
    DB --> App
    App -->|4 set| Cache
TICK3

## 5. Interview Prep

**Q: Why is cache-aside so popular?**
**A:** The app already knows the schema. No special cache product logic. You accept a small inconsistency window and fix it with TTL plus delete-on-write.

**Q: When do you pick write-through?**
**A:** When a stale read is worse than a slower write, and the cache is the official read model (sessions, inventory reservation windows).

**Q: What should never be cached?**
**A:** One-time tokens, values that change every request, and anything you cannot key safely under auth. Also giant objects that thrash the slab.

## 6. Production Use Cases

- **Session and profile reads** with cache-aside and delete-on-write.
- **CDN plus origin cache** for public catalog pages.
- **Write-back buffers** in LSM or page caches where durability is fsynced on a journal.

<Callout icon="tip" title="Name the key and the owner">
A cache without a documented key format and TTL owner becomes a junk drawer that nobody dares to purge.
</Callout>
`,
  },
  {
    rel: '43.1 System Design Concepts/Circuit breakers/index.mdx',
    title: 'Circuit Breakers',
    description:
      'A trip switch that stops calling a sick dependency, fails fast, and probes for recovery so thread pools and users are not stuck on timeouts.',
    body: `
A **circuit breaker** watches calls to a dependency. When errors or timeouts cross a threshold, it **opens** and fails fast without touching the network. After a cooldown it **half-opens**, lets a trial call through, and either **closes** (healthy) or opens again. The metaphor is an electrical breaker: stop feeding a short.

## 1. Deep Dive and Mechanics

Closed is the normal path. Each failure increments a windowed count or error ratio. Open returns a fallback or error immediately. Half-open is the dangerous state: too many trial calls can re-flood a recovering service; too few and you stay open too long.

**What should trip.** Timeouts, connection refusals, and 5xx. Usually not 4xx from bad input — that is your bug, not their outage. Do not trip on every slow call if slowness is the SLO; use a separate latency breaker if needed.

**Reset.** Time-based (open for 30 s) or on a health signal. Prefer jittered cooldown so every instance does not half-open in lockstep.

<Callout icon="warning" title="A fallback that hits the same dependency is not a fallback">
Serving a cached value, a default, or a degraded message is a fallback. Retrying the same host immediately is just hope.
</Callout>

## 2. Mathematical / Theoretical Foundation

A breaker is a finite-state machine with hysteresis. Thresholds exist so brief blips do not flap. Error ratio in a sliding window of N calls is a binomial estimate; small N is noisy, so require a minimum sample.

Independence assumption fails when all instances share the same breaker config and the same clock: synchronized half-open is a thundering herd. Jitter breaks the synchrony.

<ComparisonTable
  headers={['State', 'Calls dep', 'User sees', 'Exit when']}
  rows={[
    ['Closed', 'Yes', 'Real result or error', 'Error ratio over limit'],
    ['Open', 'No', 'Fast fail or fallback', 'Cooldown elapses'],
    ['Half-open', 'Limited trial', 'Trial or fail', 'Success closes, fail opens'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
import time

class Breaker:
    def __init__(self, trip_after=5, cool_s=30):
        self.trip_after = trip_after
        self.cool_s = cool_s
        self.fails = 0
        self.open_until = 0.0

    def allow(self):
        return time.time() >= self.open_until

    def ok(self):
        self.fails = 0

    def fail(self):
        self.fails += 1
        if self.fails >= self.trip_after:
            self.open_until = time.time() + self.cool_s
TICK3

Production libraries add sliding windows, half-open permits, and metrics. Do not roll a clever one in every service.

## 4. Visualizations

TICK3mermaid
stateDiagram-v2
    [*] --> Closed
    Closed --> Open: error threshold
    Open --> HalfOpen: cooldown
    HalfOpen --> Closed: trial success
    HalfOpen --> Open: trial failure
TICK3

## 5. Interview Prep

**Q: Breaker versus timeout versus retry?**
**A:** Timeout bounds one call. Retry repeats a maybe-transient error. Breaker stops the whole flow after evidence of outage. Retries into an open outage make things worse; the breaker exists to halt that.

**Q: Where do you put it?**
**A:** On the client of the dependency (service mesh or SDK). A server-side breaker cannot save the client's threads.

**Q: What do you return when open?**
**A:** Cached data, a partial page, a queued write, or a clear error. Pick per use case. Silent success is a consistency bug.

## 6. Production Use Cases

- **Checkout calling a fraud API** that can flap; fail closed or queue for async review.
- **Recommendation widgets** that disappear rather than delay the product page.
- **Mesh defaults** (Envoy outlier detection) around every east-west hop.

<Callout icon="tip" title="Alert on open, not only on 5xx">
An open breaker can hide origin errors and look like a calm error rate. Page on breaker_open and fallback_used.
</Callout>
`,
  },
  {
    rel: '43.1 System Design Concepts/Consistency/index.mdx',
    title: 'Consistency',
    description:
      'Guarantees about when a write becomes visible to reads, from linearizability down to eventual, and why you cannot have every guarantee at once.',
    body: `
**Consistency** answers whether two observers can disagree about the latest value. It is not the C in the old ACID slogan alone, and it is not "the data looks tidy." In distributed systems it is a contract: after a write returns, which reads must see it, and in what order.

## 1. Deep Dive and Mechanics

**Linearizability** (strong / external consistency) makes the system behave as if there is one copy and one real-time order. A read that starts after a write returns must see that write or a later one.

**Sequential consistency** preserves each client's order but may reshuffle real-time across clients.

**Causal consistency** preserves cause-and-effect (you see your writes and the writes you observed) but allows concurrent branches.

**Eventual consistency** says that if writes stop, replicas converge. It says little about any given read.

<Callout icon="info" title="Pick the guarantee per object">
User password hashes want linearizability. View counters can be eventual. One global default is how teams ship bugs.
</Callout>

## 2. Mathematical / Theoretical Foundation

CAP and PACELC constrain what you can promise during a partition and during normal operation. Formal models (Herlihy and Wing linearizability, session guarantees of Terry et al.) define legal histories: sequences of request/response events that could have come from a single-copy spec.

Read-your-writes, monotonic reads, and monotonic writes are session properties you can add on top of a weaker store with sticky routing or version tokens.

<ComparisonTable
  headers={['Model', 'Real-time order', 'Stale read after write', 'Typical store']}
  rows={[
    ['Linearizable', 'Yes', 'No', 'etcd, Spanner reads'],
    ['Serializable SI', 'Per transaction', 'Inside rules', 'Postgres, Cockroach'],
    ['Causal', 'Causal only', 'Possible if concurrent', 'Some CRDT / Cosmos modes'],
    ['Eventual', 'No', 'Yes until catch-up', 'DNS, Dynamo-style'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
# Sticky session: read-your-writes without a linearizable store
def put_profile(cache, db, user_id, body, versions):
    ver = db.upsert(user_id, body)
    versions[user_id] = ver
    cache.set(user_id, body, ver)

def get_profile(cache, db, user_id, versions):
    cached = cache.get(user_id)
    min_ver = versions.get(user_id, 0)
    if cached and cached.ver >= min_ver:
        return cached.body
    return db.fetch(user_id)  # fall back until replica or cache catches up
TICK3

Tokens can live in a cookie or in Redis keyed by session. Do not pretend this is linearizability across devices.

## 4. Visualizations

TICK3mermaid
sequenceDiagram
    participant W as Writer
    participant P as Primary
    participant R as Replica
    participant C as Reader
    W->>P: write v2
    P-->>W: ack
    C->>R: read
    Note over R: may still be v1
    P->>R: replicate v2
    C->>R: read again
    Note over R: v2 after catch-up
TICK3

## 5. Interview Prep

**Q: Is ACID consistency the same as CAP consistency?**
**A:** No. ACID C is about constraints and a valid state after a transaction. CAP C is linearizability of a replicated object. Do not mix them in an interview answer.

**Q: How do you explain consistency to a product manager?**
**A:** "After I save, how long can another screen show the old value, and can two cashiers sell the last seat?" That maps to SLA plus conflict rules.

**Q: Can you buy strong consistency with a cache?**
**A:** Only if the cache is on the linearizable path or is invalidated synchronously. A TTL cache is an eventual layer by construction.

## 6. Production Use Cases

- **Ledger and inventory** with serializable or linearizable writes.
- **Social feeds** with eventual likes and causal comment threads.
- **Feature flags** with session-sticky reads so a user does not flap mid-request.

<Callout icon="tip" title="Write the anomaly you accept">
"Eventual" is incomplete. Say "stale up to 5 s on this key class" or "lost update possible on concurrent edits."
</Callout>
`,
  },
  {
    rel: '43.1 System Design Concepts/Consistent hashing/index.mdx',
    title: 'Consistent Hashing',
    description:
      'A ring-based placement scheme so adding or removing a node remaps only a nearby slice of keys instead of reshuffling the entire set.',
    body: `
**Consistent hashing** places keys and nodes on a ring so that when membership changes, only keys that lived near the changed node move. Classic modulo hashing — hash(key) mod N — remaps nearly every key when N changes. That is a cache stampede and a data-migration disaster.

## 1. Deep Dive and Mechanics

Hash nodes onto a circular identifier space. Hash the key onto the same circle. Walk clockwise to the first node. That node owns the key. Remove a node and its keys fall to the next clockwise neighbor. Add a node and it steals a slice from its successor.

**Virtual nodes (vnodes).** One physical server appears as many points on the ring. That smooths load when hash points would otherwise clump, and it lets a fat machine advertise more vnodes than a small one.

**Replication.** Store copies on the next R-1 successors so a death still has data on the ring. Repair and hinted handoff fill the holes.

<Callout icon="info" title="The ring is a coordination problem">
Everyone must agree on membership and vnode weights. Gossip, a config service, or a control plane publishes the map. A split view of the ring is a consistency bug.
</Callout>

## 2. Mathematical / Theoretical Foundation

On a uniform ring, expected fraction of keys owned by a node is about 1/N. Expected remapped fraction when one node of N is added or removed is about 1/N. Virtual nodes reduce variance of share (order 1/sqrt(v) style concentration).

Rendezvous hashing (HRW) is a cousin: score each node with hash(key, node) and pick the max. It also remaps ~1/N and needs no explicit ring walk.

<ComparisonTable
  headers={['Scheme', 'On N to N+1', 'Hotspot control', 'Common home']}
  rows={[
    ['hash mod N', 'Almost all keys', 'Poor if N small', 'Toy examples'],
    ['Consistent hash ring', 'About 1/N', 'Vnodes', 'Dynamo, caches'],
    ['HRW / rendezvous', 'About 1/N', 'Weighted scores', 'Some CDNs, caches'],
    ['Range shards', 'Split one range', 'Manual or auto split', 'Bigtable, Vitess'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
import hashlib
import bisect

def h(s):
    return int(hashlib.sha1(s.encode()).hexdigest(), 16)

class Ring:
    def __init__(self, nodes, vnodes=50):
        self.points = []
        self.map = {}
        for n in nodes:
            for i in range(vnodes):
                p = h(n + '#' + str(i))
                self.points.append(p)
                self.map[p] = n
        self.points.sort()

    def owner(self, key):
        p = h(key)
        i = bisect.bisect_left(self.points, p) % len(self.points)
        return self.map[self.points[i]]
TICK3

## 4. Visualizations

TICK3mermaid
flowchart LR
    K[Key hash] --> Walk[Walk clockwise]
    Walk --> N2[Node B]
    N1[Node A] --> N2
    N2 --> N3[Node C]
    N3 --> N1
TICK3

## 5. Interview Prep

**Q: Why did modulo hashing fail the cache fleet?**
**A:** Changing N reshuffles almost every key. Hit rate collapses and the database absorbs a stampede. Consistent hashing moves only the slice of the lost or added node.

**Q: How do you rebalance a hot key?**
**A:** Vnodes do not split a single popular key. You need application sharding of that key, a local replica pool, or a different partition function.

**Q: Ring versus directory-based sharding?**
**A:** A directory (lookup table) can place keys anywhere and migrate one shard at a time. It needs a strongly consistent map. The ring is decentralized and simpler, with less placement freedom.

## 6. Production Use Cases

- **Distributed caches** (Memcached clients, some Redis clusters).
- **Dynamo-style stores** with preference lists on the ring.
- **Request routing** to stateful workers that should see the same session.

<Callout icon="tip" title="Watch load per vnode, not only per host">
A bad hash or a skewed keyspace still piles work on one point. Metrics must be per physical node after vnode aggregation.
</Callout>
`,
  },
  {
    rel: '43.1 System Design Concepts/Database replication/index.mdx',
    title: 'Database Replication',
    description:
      'Copying database state to other nodes for reads, failover, and locality, with a chosen lag, conflict, and durability trade-off.',
    body: `
**Database replication** keeps copies of data on more than one node. You do it for high availability (a replica can take over), for read scale (offload SELECTs), and for locality (a replica near a region). The price is lag, conflict, and a failover story you must actually practice.

## 1. Deep Dive and Mechanics

**Single-primary (leader).** All writes go to one node. Secondaries apply a log (WAL, binlog, Oplog). Reads can go to the leader (safe) or to replicas (stale by lag). Failover promotes a replica; you risk losing unflushed or unreplicated writes.

**Multi-primary.** Several nodes accept writes. You need conflict resolution (last-write-wins, CRDTs, or application merge) or a partitioning rule that avoids conflicts.

**Sync versus async.** Synchronous commit waits for N replicas to fsync. That is latency for durability. Asynchronous is fast and can lose the tail of the log on crash.

<Callout icon="warning" title="Replica lag is a product bug if you hide it">
A user writes a profile and immediately reads a replica. They see the old bio and retry forever. Sticky primary reads or a version token fix the session.
</Callout>

## 2. Mathematical / Theoretical Foundation

Durability of a committed write under crash is a function of the ack quorum. If you wait for f replicas of n, you can lose f-1 disks and still have the bytes. CAP shows you cannot stay fully available and linearizable across a partition; replication mode is how you pick the side.

Lag L is roughly apply_rate deficit integrated over time. Backpressure or throttled replicas bound L; infinite queues do not.

<ComparisonTable
  headers={['Mode', 'Write home', 'Failover', 'Conflict']}
  rows={[
    ['Async primary-replica', 'One primary', 'May lose tail', 'None on writes'],
    ['Quorum sync', 'Primary plus acks', 'Safer promote', 'None on writes'],
    ['Multi-primary', 'Many', 'Per region', 'Must resolve'],
    ['Logical CDC', 'Primary log', 'Downstream only', 'Pipeline lag'],
  ]}
/>

## 3. Real-World Implementation

TICK3
# PostgreSQL idea: sync replica for durability, async for reporting
synchronous_standby_names = 'FIRST 1 (standby_az_b)'
# app: writes and read-your-writes to primary
# analytics: prefer replica, accept lag
TICK3

Monitor replay_lag and pause promotion if the candidate is hours behind. Test failover on a cadence, not only in an outage.

## 4. Visualizations

TICK3mermaid
flowchart LR
    AppW[Writes] --> Pri[Primary]
    Pri -->|sync WAL| S1[Standby AZ-b]
    Pri -->|async WAL| S2[Reporting replica]
    AppR[Session reads] --> Pri
    Anon[Analytics] --> S2
TICK3

## 5. Interview Prep

**Q: Does replication replace backups?**
**A:** No. Replicas happily replicate a DROP TABLE. Backups and PITR are a different failure mode (human and logical error).

**Q: How do you scale reads?**
**A:** Replicas help until writes or apply lag dominate. Then you shard. Also, not every read can tolerate replica lag.

**Q: What is split-brain?**
**A:** Two primaries accepting writes after a bad failover. You get divergent rows that no automatic replica can merge safely. Fencing and leases exist to prevent it.

## 6. Production Use Cases

- **OLTP HA** with a sync standby in another AZ.
- **Read replicas** for heavy reporting off the primary.
- **Cross-region async** for disaster recovery with a documented RPO.

<Callout icon="tip" title="State RPO in seconds, not in adjectives">
    "We replicate" is not an RPO. "Async, typical lag 2 s, worst 60 s on saturation" is a design.
</Callout>
`,
  },
]
