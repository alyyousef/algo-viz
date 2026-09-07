export const conceptPagesB = [
  {
    rel: '43.1 System Design Concepts/Distributed locks/index.mdx',
    title: 'Distributed Locks',
    description:
      'A lease-based mutex across processes so only one worker performs a critical section, with fencing so a stale holder cannot corrupt state.',
    body: `
A **distributed lock** is a mutex that works across machines. You use it so only one cron runs a nightly job, only one writer rebuilds an index, or only one leader mutates a shard. A lock that is "usually exclusive" is worse than no lock: two holders will corrupt state on the rare network blip.

## 1. Deep Dive and Mechanics

The primitive is a **lease**, not a forever lock. Client A acquires key K with a TTL and a unique token. It heartbeats to extend. If A dies, the TTL expires and B may acquire. If A was paused by a GC storm and wakes after expiry, A is a **zombie holder** and must be fenced.

**Fencing tokens.** Each acquire returns a monotonic token (version). Storage rejects writes with a stale token. Without fencing, the zombie writes after the new owner has started.

**What not to use.** A single Redis SET NX without fencing for money movement. A DB row lock that you hold across a network call. ZooKeeper / etcd / Consul ephemeral nodes are closer to a correct design if you treat session loss as loss of the lock.

<Callout icon="error" title="Pause is indistinguishable from death">
A lock service that expires you cannot tell GC from crash. Always assume you may run the critical section after losing the lock, and make that safe with tokens or idempotency.
</Callout>

## 2. Mathematical / Theoretical Foundation

Safety is mutual exclusion: at most one **valid** holder at a time. Liveness is that some acquirer eventually succeeds if holders fail. TTL-based locks sacrifice safety under long pauses unless the resource is fenced.

Martin Kleppmann's critique of Redlock is about this timing assumption: if the lock service and the clients do not share a correct timing model, SET NX is not a safety proof.

<ComparisonTable
  headers={['Tool', 'Lease', 'Fence token', 'Fit']}
  rows={[
    ['DB unique row / txn', 'Txn lifetime', 'Txn itself', 'Short sections, same DB'],
    ['etcd / ZooKeeper', 'Session', 'Revision / zxid', 'Leaders, jobs'],
    ['Redis SET NX PX', 'TTL', 'You must add', 'Best-effort, not ledgers'],
    ['Chubby / locksmith', 'Lease', 'Yes', 'Control planes'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
# Fence: storage refuses stale tokens
def write_shard(store, shard, token, payload):
    current = store.token(shard)
    if token < current:
        raise RuntimeError('stale_fence_token')
    store.put(shard, payload, token)
TICK3

Acquire the lock, read the token, pass the token into every write. Do not do 30 seconds of CPU while holding a 10-second lease.

## 4. Visualizations

TICK3mermaid
sequenceDiagram
    participant A as Client A
    participant L as Lock service
    participant S as Storage
    A->>L: acquire lease token 7
    L-->>A: ok
    Note over A: GC pause, lease expires
    participant B as Client B
    B->>L: acquire token 8
    A->>S: write token 7
    S-->>A: reject stale
    B->>S: write token 8
    S-->>B: accept
TICK3

## 5. Interview Prep

**Q: Is Redis a good distributed lock?**
**A:** For dropping duplicate cache fills, often yes. For a bank transfer, no, unless you add fencing and accept Redis as not a consensus system in the Redlock sense. Prefer the database transaction or etcd.

**Q: Lock versus leader election?**
**A:** Election is a long-lived lock on the "leader" role plus a watch so followers notice loss. Same lease and fence problems.

**Q: How long should the TTL be?**
**A:** Longer than one safe heartbeat plus jitter, shorter than the outage you can tolerate with no owner. Heartbeat at a fraction of TTL.

## 6. Production Use Cases

- **Scheduled jobs** so k8s cron replicas do not all send the same email blast.
- **Shard primary** in a home-grown datastore.
- **Idempotent migrations** that must not run twice on overlapping deploys.

<Callout icon="tip" title="Prefer idempotency over a long critical section">
If the work can safely run twice, you may not need a lock. If it cannot, fence every write.
</Callout>
`,
  },
  {
    rel: '43.1 System Design Concepts/Durability/index.mdx',
    title: 'Durability',
    description:
      'The promise that a committed write survives process crash and disk loss to the degree you paid for with fsync, replicas, and backups.',
    body: `
**Durability** is the D in ACID: after the system says "committed," the write must survive the failures you listed in the contract. RAM is not durable. A single SSD is not durable against fire. A replica in the same rack is not durable against the rack.

## 1. Deep Dive and Mechanics

Writes become durable through a **log**. The database appends to a WAL, fsyncs (or equivalent), then later checkpoints pages. If you skip fsync, you trade durability for latency and can lose the last few milliseconds or seconds of "committed" work on power loss.

**Replication is a second disk.** Quorum commit waits until enough nodes have the log bytes. Async replication is a durability maybe.

**Backups are a third axis.** They protect against logical deletes and bad deploys that replication will cheerfully copy. Point-in-time recovery needs the WAL after the snapshot.

<Callout icon="warning" title="Committed is a defined word">
If the driver timed out, you do not know if the commit landed. Design the write to be idempotent and check server-side state.
</Callout>

## 2. Mathematical / Theoretical Foundation

Independent failure of disks with annual failure rate p gives survival (1 - p)^n for n copies if failures are independent. They are not: same firmware, same SAN, same AZ flood. Durability math without correlated-failure design is fiction.

fsync latency is a physical lower bound on sync commit. Group commit batches many transactions into one fsync to amortize.

<ComparisonTable
  headers={['Ack when', 'Lost on crash', 'Lost on AZ fire', 'Typical']}
  rows={[
    ['Memory only', 'Yes', 'Yes', 'Cache, Redis default caveats'],
    ['Local fsync', 'Unlikely', 'Yes', 'Single-node Postgres'],
    ['Quorum of AZs', 'Unlikely', 'Unlikely if spread', 'Multi-AZ DBs'],
    ['Object store + PITR', 'Depends on RPO', 'Recoverable', 'Backups'],
  ]}
/>

## 3. Real-World Implementation

TICK3
# PostgreSQL: do not turn these off because a blog said it was faster
fsync = on
synchronous_commit = on
full_page_writes = on
wal_level = replica
TICK3

For a cache of derived HTML, asynchronous is fine. For a payment capture, wait for the durability you sold the auditor.

## 4. Visualizations

TICK3mermaid
flowchart TD
    Txn[Commit request] --> WAL[Append WAL]
    WAL --> Sync[fsync or quorum]
    Sync --> Ack[Ack client]
    Ack --> Ckpt[Later checkpoint]
    Ckpt --> Pages[Data pages]
TICK3

## 5. Interview Prep

**Q: Is replication durability?**
**A:** Only for the failures it covers. Three replicas in one AZ die together. Durability is a list of tolerated failures, not a replica count.

**Q: Why is fsync expensive?**
**A:** It waits for the device to put bits in non-volatile media. Group commit and a battery-backed controller hide some of that cost.

**Q: Durability versus availability?**
**A:** Sync quorum can refuse writes if too many replicas are down (you kept durability, lost availability). Async keeps taking writes you might lose.

## 6. Production Use Cases

- **Payment ledgers** with sync commit and off-site PITR.
- **Queue acknowledgements** only after the consumer's side effect is durable.
- **Object storage** with cross-region replication for blobs that cannot be regenerated.

<Callout icon="tip" title="Write the failure list on the design doc">
Process crash, disk loss, AZ loss, region loss, bad DROP. Each needs a different control.
</Callout>
`,
  },
  {
    rel: '43.1 System Design Concepts/Event streaming/index.mdx',
    title: 'Event Streaming',
    description:
      'A durable, ordered log of facts that many consumers read independently, used to decouple writes from downstream projections and reactions.',
    body: `
**Event streaming** treats the log as the system of record for "things that happened." Producers append events. Consumers read at their own offset. Unlike a queue that deletes a message after one worker acks, a stream retains history so new consumers can replay.

## 1. Deep Dive and Mechanics

A stream is partitioned for scale. Each partition is an ordered append-only log. A key (user id, order id) hashes to a partition so that events for that key stay ordered. Consumers in a group split partitions among themselves.

**Retention.** Time, size, or compact-by-key (keep the latest value per key, as in a changelog). Compaction turns the stream into a replicated state snapshot plus tail.

**Delivery.** At-least-once is the honest default: a crash before offset commit replays. Exactly-once is an end-to-end protocol (idempotent produce + transactional consume) and is still easy to break in your side effects.

<Callout icon="info" title="The log is not a database by itself">
You still need projections for queries you cannot answer by scanning a week of events on the request path.
</Callout>

## 2. Mathematical / Theoretical Foundation

A partition is a total order. The stream as a whole is a partial order: events in different partitions have no defined sequence unless you add timestamps or a join. Throughput scales with partition count until you hit per-partition hot keys.

Offset o is a cursor. Consumer lag is high_watermark minus committed offset. Stability requires consume rate at or above produce rate on each partition, or lag grows without bound.

<ComparisonTable
  headers={['Style', 'Retention', 'Consumer model', 'Example']}
  rows={[
    ['Queue', 'Until ack', 'Competing consumers', 'SQS classic'],
    ['Stream / log', 'Hours to forever', 'Replay by offset', 'Kafka, Kinesis'],
    ['Pub-sub push', 'Short buffer', 'All subscribers', 'SNS, some MQTT'],
    ['CDC stream', 'Log of DB writes', 'Projectors', 'Debezium'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
# Conceptual consumer loop: process then commit
def run(consumer, handler):
    while True:
        rec = consumer.poll()
        if rec is None:
            continue
        handler(rec.value)
        consumer.commit(rec.offset)
TICK3

If handler is not idempotent, a crash between handler and commit duplicates the side effect. Put a unique event id in a processed table, or use transactional outbox plus store transactions.

## 4. Visualizations

TICK3mermaid
flowchart LR
    Prod[Producer] --> P0[Partition 0]
    Prod --> P1[Partition 1]
    P0 --> C1[Consumer A]
    P1 --> C2[Consumer B]
    P0 --> New[New projector replay]
TICK3

## 5. Interview Prep

**Q: Stream versus queue?**
**A:** A queue is a buffer of work to do once. A stream is a history many readers can share and replay. Use a queue for "send this email." Use a stream for "order lifecycle that billing, fraud, and search all need."

**Q: How do you guarantee order?**
**A:** Per key, by putting that key on one partition and consuming it with one worker at a time. Global order does not scale.

**Q: What is a compacted topic for?**
**A:** Latest state per key (user profile, ktable). New consumers bootstrap from compacted snapshots instead of the entire history.

## 6. Production Use Cases

- **Order and payment events** feeding search, email, and analytics.
- **CDC** from OLTP into a warehouse or search index.
- **Activity logs** for ML features and audit.

<Callout icon="tip" title="Put a schema and an event id on every record">
Unversioned JSON and missing ids make replay and exactly-once a folklore project.
</Callout>
`,
  },
  {
    rel: '43.1 System Design Concepts/Fault tolerance/index.mdx',
    title: 'Fault Tolerance',
    description:
      'Designing so the system keeps correct service despite failed disks, nodes, and processes, using redundancy, isolation, and recovery.',
    body: `
**Fault tolerance** is the ability to continue correct operation when parts fail. Failures are normal: disks die, GC pauses look like death, operators ship bad config. Tolerance is redundancy plus a recovery story, not optimism.

## 1. Deep Dive and Mechanics

Classify faults. **Crash-stop:** a node disappears. **Crash-recovery:** it returns with or without disk. **Omission:** messages drop. **Byzantine:** a node lies. Most business systems assume crash and omission, not Byzantine, except in multi-party or hostile settings.

**Patterns.** Replicas and quorum. Timeouts and retries with jitter. Bulkheads. Graceful degradation. Chaos tests that pull the plug on a dependency. Health checks that fail the instance out of the balancer.

**Correctness still matters.** Serving leftover cached prices during an outage may be available and still wrong. Define the degraded mode explicitly.

<Callout icon="info" title="MTTR often beats another nine of MTTF">
Detecting and failing over in 30 seconds can beat heroic hardware that still needs an hour of human repair.
</Callout>

## 2. Mathematical / Theoretical Foundation

Reliability of a series system multiplies. Parallel redundancy with independent failures: unavailability is the product of unavailabilities. The independence assumption is the weak spot (shared power, shared config repo).

The FLP result says deterministic consensus is impossible in a fully async crash-stop model. Practical systems add timeouts (partial synchrony) to elect and make progress.

<ComparisonTable
  headers={['Fault', 'User symptom', 'Control', 'Limit']}
  rows={[
    ['Crash-stop node', 'Fewer replicas', 'LB + restart', 'Need spare capacity'],
    ['Slow node', 'Tail latency', 'Timeouts, shedding', 'Hard to distinguish'],
    ['Bad deploy', 'Error spike', 'Canary, rollback', 'Shared binary'],
    ['Byzantine', 'Wrong answers', 'Quorum of honest', 'Costly'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
def with_fallback(primary, secondary, timeout_s):
    try:
        return primary(timeout_s)
    except TimeoutError:
        return secondary(timeout_s)
TICK3

Fallback must not share the same failure domain as primary (same host, same DB primary). Measure how often you take the branch.

## 4. Visualizations

TICK3mermaid
flowchart TD
    Req[Request] --> Try[Primary path]
    Try -->|ok| Ok[Response]
    Try -->|timeout| Iso[Isolate and degrade]
    Iso --> Fb[Fallback or cached]
    Iso --> Alert[Page if budget burns]
TICK3

## 5. Interview Prep

**Q: Fault tolerance versus high availability?**
**A:** HA is a user-visible uptime goal. Fault tolerance is the mechanism (redundancy, isolation) that makes HA possible. You can be fault tolerant for crashes and still miss an SLO due to overload.

**Q: How many replicas?**
**A:** Two survive one crash if failover works. Three is the usual consensus minimum so a majority remains. More than that is geography and read scale, not magic.

**Q: What do you test?**
**A:** Kill a node, a AZ, a dependency, and the clock. If you never pull the plug, you have a document, not a property.

## 6. Production Use Cases

- **Stateless app tiers** with N+1 instances and rolling deploys.
- **Quorum stores** for config and locks.
- **Degraded search** that returns a smaller, stale index rather than a 500.

<Callout icon="tip" title="Write the degraded mode in the runbook">
If the payments client is down, do we queue, fail the cart, or take orders in review? Decide before the page.
</Callout>
`,
  },
  {
    rel: '43.1 System Design Concepts/Horizontal scaling/index.mdx',
    title: 'Horizontal Scaling',
    description:
      'Adding machines to raise capacity, which works easily for stateless tiers and needs partitioning, rebalancing, and coordination for stateful ones.',
    body: `
**Horizontal scaling** (scale out) adds more machines. A load balancer spreads work. Stateless app servers scale out almost linearly until a shared dependency (the database) saturates. Stateful systems scale out only after you partition data and accept the operational cost.

## 1. Deep Dive and Mechanics

**Stateless workers.** Put sessions in Redis or JWTs, keep the app disk empty, and add pods. This is the default web pattern.

**Stateful scale-out.** Shard by key. Each node owns a slice. You now own rebalancing, hot keys, cross-shard queries, and distributed transactions. That is a different product.

**What does not scale out for free.** A single-primary database, a global lock, a chatty chatty N-squared service mesh, and a giant in-memory set that must be fully replicated to every node.

<Callout icon="info" title="You are scaling the bottleneck">
Adding app pods when the primary CPU is at 95 percent makes the outage louder. Profile the constraint first.
</Callout>

## 2. Mathematical / Theoretical Foundation

Ideal speedup is linear: capacity ~ N. Amdahl's law: if a fraction s of the work is serial (one primary, one lock), speedup is bounded by 1/s. Universal scaling law adds coherency cost that grows with N (cross-talk).

Rebalance cost when adding a node is the data you must move. Consistent hashing aims for about 1/N moved; range splits move one shard.

<ComparisonTable
  headers={['Tier', 'Scale-out ease', 'Shared choke', 'Next step']}
  rows={[
    ['Stateless HTTP', 'Easy', 'DB or cache', 'Add pods'],
    ['Cache cluster', 'Moderate', 'Hot keys', 'Vnodes, split keys'],
    ['SQL primary', 'Hard', 'The primary', 'Replicas then shards'],
    ['Queue consumers', 'Easy', 'Poison messages', 'Add workers'],
  ]}
/>

## 3. Real-World Implementation

TICK3yaml
# k8s: scale the deployment, not the single-primary DB
apiVersion: apps/v1
kind: Deployment
metadata:
  name: checkout-api
spec:
  replicas: 12
  template:
    spec:
      containers:
        - name: app
          resources:
            limits:
              cpu: '1'
              memory: 512Mi
TICK3

Autoscale on concurrency or lag, not only CPU. A blocked thread pool can be at low CPU and still need more pods — or need a bigger pool, not more pods.

## 4. Visualizations

TICK3mermaid
flowchart LR
    LB[Load balancer] --> A[App 1]
    LB --> B[App 2]
    LB --> C[App N]
    A --> DB[Shared primary]
    B --> DB
    C --> DB
TICK3

## 5. Interview Prep

**Q: Horizontal versus vertical?**
**A:** Vertical buys a bigger box (simple, ceiling, blast radius). Horizontal buys more boxes (elastic, needs statelessness or shards). Most mature systems do both: fat enough nodes, then many of them.

**Q: When does scale-out make latency worse?**
**A:** When each request fans out to more nodes (scatter-gather) or when coordination (locks, 2PC) grows with N.

**Q: How do you know it worked?**
**A:** Plot capacity (QPS at SLO) versus N. If the curve bends over, you found the serial part.

## 6. Production Use Cases

- **Web and API fleets** behind an LB or service mesh.
- **Consumer groups** on Kafka partitions.
- **Sharded KV or search** clusters with planned rebalance windows.

<Callout icon="tip" title="Keep one extra replica of capacity">
N+1 (or N+2) is how you deploy and survive a node loss without riding 100 percent.
</Callout>
`,
  },
  {
    rel: '43.1 System Design Concepts/Latency/index.mdx',
    title: 'Latency',
    description:
      'The time from request to response, dominated by tails, queues, and network hops, and managed with budgets, not average-case hope.',
    body: `
**Latency** is how long one unit of work takes to finish. Users feel p50 a little and p99 a lot. Averages hide the queue. System design is mostly a fight with tails: GC, disk, lock waits, and a slow dependency on the critical path.

## 1. Deep Dive and Mechanics

Latency adds along a **critical path**. Parallel fan-out is max, not sum, plus merge cost. Sequential hops add. A "microservice refactor" that turns one DB query into eight RPCs often loses even if each RPC is fast.

**Queues.** When utilization rises, wait time explodes (M/M/1 wait ~ rho / (1-rho)). Running hot is how you buy a latency incident.

**Budgets.** Give the page 800 ms. Spend it: 50 ms edge, 100 ms app, 200 ms DB, rest for JS. Any new hop must steal from someone.

<Callout icon="warning" title="p99 is a different system than p50">
The median may be a cache hit. The tail is a miss, a retry, a slow disk, and a cold JVM. Optimize the tail on purpose.
</Callout>

## 2. Mathematical / Theoretical Foundation

Little's law: concurrency L = lambda * W. If you want W low, you cannot run huge L without huge lambda. Tail bounds (Chebyshev, or empirical histograms) beat a single mean.

Retry amplification: a 1 percent timeout with two retries can triple load on an already slow dep, which raises latency further (retry storm).

<ComparisonTable
  headers={['Metric', 'What it hides', 'Use for']}
  rows={[
    ['Average', 'Tails and multi-modes', 'Never as an SLO'],
    ['p50', 'The unhappy 50 percent', 'Happy-path debug'],
    ['p95 / p99', 'The last 1 percent', 'User SLOs'],
    ['p99.9 / max', 'Cost of extremes', 'Hard real-time, or debug'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
import time

def timed(fn):
    t0 = time.perf_counter()
    try:
        return fn()
    finally:
        ms = (time.perf_counter() - t0) * 1000
        # histogram.observe(ms)  — never just a running mean
        _ = ms
TICK3

Export a histogram (Prometheus native, or HDR). Alert on SLO burn, not on a 5-minute average crossing 200 ms after users already left.

## 4. Visualizations

TICK3mermaid
flowchart TD
    Edge[Edge 20 ms] --> App[App 40 ms]
    App --> Cache[Cache 2 ms]
    App --> DB[DB 80 ms p50, 800 ms p99]
    App --> Rec[Reco 120 ms]
    Cache --> Merge[Merge]
    DB --> Merge
    Rec --> Merge
TICK3

## 5. Interview Prep

**Q: How do you cut latency in a design interview?**
**A:** Remove hops, cache the hot read, precompute, move work off the request path, and stop synchronizing on a lock. Then talk about p99, not a happy diagram.

**Q: Why is the p99 10x the p50?**
**A:** Multimodal paths (hit versus miss), GC, noisy neighbors, and queueing. Fix the slow mode; do not micro-optimize the fast one.

**Q: Latency versus bandwidth?**
**A:** Bandwidth is bytes per second. A fat pipe can still have 80 ms RTT. Streaming and windowing help throughput; they do not shrink speed-of-light.

## 6. Production Use Cases

- **Search and checkout** with explicit hop budgets.
- **Edge caches** to eat RTT for static and semi-static reads.
- **Async APIs** that return 202 when the work cannot meet a sync SLO.

<Callout icon="tip" title="Trace the critical path">
A waterfall trace (OpenTelemetry) shows which span stole the budget. Guessing is how you add another cache and miss the lock.
</Callout>
`,
  },
  {
    rel: '43.1 System Design Concepts/Leader election/index.mdx',
    title: 'Leader Election',
    description:
      'Choosing one replica to take writes or coordinate a shard, then noticing death and electing a successor without split-brain.',
    body: `
**Leader election** picks one node as the coordinator for a shard or cluster. Followers replicate and serve reads if you allow them. When the leader fails, survivors elect a new one. The hard part is not winning; it is making sure the old leader stays fenced.

## 1. Deep Dive and Mechanics

Algorithms (Raft, Zab, etcd elections) use **terms** or **epochs**. A candidate that gathers a majority becomes leader for that term. Majority means two elections cannot both succeed in the same term.

**Heartbeats.** The leader proves it is alive. Followers start an election if the heartbeat lapses. Timeouts need jitter so they do not all campaign at once.

**Fencing.** Every write carries the term. Storage or the replica set rejects stale terms. A leader that paused and woke up must not overwrite the new leader's log.

<Callout icon="error" title="Two leaders is a data-loss event">
Split-brain happens when a minority partition still thinks it is leader and accepts writes. Quorum writes and term checks are the cure, not hope.
</Callout>

## 2. Mathematical / Theoretical Foundation

Safety: at most one leader can commit in a given term, and a committed entry stays committed. Liveness requires partial synchrony (timeouts eventually work). FLP says you cannot guarantee both safety and progress in a fully async model with one crash.

Lease-based election (Chubby-style) is a timed lock on the leader key. Same pause-versus-death problem as distributed locks.

<ComparisonTable
  headers={['Style', 'Safety mechanism', 'Typical', 'Weakness']}
    rows={[
    ['Majority vote (Raft)', 'Term + quorum log', 'etcd, Consul', 'Needs majority alive'],
    ['Lease in a store', 'TTL + fence', 'Job leaders', 'Clock / pause'],
    ['Human primary', 'Runbook', 'Legacy DBs', 'Slow MTTR'],
    ['Static primary', 'Config', 'Tiny clusters', 'No failover'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
# Conceptual: only act while we still hold the elected term
class Leader:
    def __init__(self, store, name):
        self.store = store
        self.name = name

    def step(self):
        term = self.store.current_term()
        if self.store.leader() != self.name:
            return False
        return self.store.heartbeat(self.name, term)
TICK3

If heartbeat fails, stop writing immediately. Do not finish "just this one" batch.

## 4. Visualizations

TICK3mermaid
stateDiagram-v2
    [*] --> Follower
    Follower --> Candidate: heartbeat timeout
    Candidate --> Leader: won majority
    Candidate --> Follower: saw higher term
    Leader --> Follower: lost lease or higher term
TICK3

## 5. Interview Prep

**Q: Why majority, not all nodes?**
**A:** Waiting for all nodes loses liveness on one crash. Majority stays safe (intersection of quorums) and can proceed with a minority down.

**Q: Can you elect without consensus?**
**A:** You can pick a leader with a lock service that itself uses consensus. If the lock is a single Redis without fencing, you can elect two leaders.

**Q: Leader versus leaderless (Dynamo)?**
**A:** Leader simplifies ordering and transactions per shard. Leaderless avoids a failover hiccup and pays in conflict repair.

## 6. Production Use Cases

- **Shard primaries** in MongoDB, Kafka controllers, and home-grown stores.
- **Singleton jobs** (only one reindexer) via etcd campaign.
- **Control planes** that must serialize cluster-wide mutations.

<Callout icon="tip" title="Practice leader kill on a schedule">
Elections that only run in production incidents are untested code paths. Chaos the leader and watch commit latency.
</Callout>
`,
  },
  {
    rel: '43.1 System Design Concepts/Load balancing/index.mdx',
    title: 'Load Balancing',
    description:
      'Spreading connections or requests across healthy backends with algorithms that trade evenness, connection reuse, and tail latency.',
    body: `
A **load balancer** sits in front of replicas and chooses where the next connection or request goes. It is how horizontal scaling becomes a single name. Bad balancing creates hot nodes and cold nodes that look like a capacity problem.

## 1. Deep Dive and Mechanics

**L4 versus L7.** L4 (TCP/UDP) maps connections. L7 (HTTP/gRPC) can route on path, host, and header, terminate TLS, and retry idempotent GETs.

**Algorithms.** Round-robin is simple and wrong when requests are heavy-tailed. Least-connections helps. P2C (power of two choices) picks the better of two random healthy nodes and is excellent at scale. Consistent hashing sends the same key to the same node for cache locality.

**Health.** Passive (watch errors) and active (probe). A probe that only hits /health/local will keep a node that cannot reach its DB.

<Callout icon="warning" title="Retries at three layers multiply">
Client retry plus mesh retry plus LB retry can turn one 500 into a self-DDoS. Pick one layer to retry, and cap.
</Callout>

## 2. Mathematical / Theoretical Foundation

The power of two choices: throwing balls into bins, picking the less loaded of two random bins, makes max load grow as log log N instead of log N / log log N. That is why Envoy and many LBs use P2C.

Utilization and latency: a node at 0.9 utilization has long queues. "Even" CPU is not enough if one node got the expensive queries.

<ComparisonTable
  headers={['Algorithm', 'State needed', 'Good at', 'Weak at']}
  rows={[
    ['Round-robin', 'None', 'Equal cheap calls', 'Heavy tails'],
    ['Least-conn', 'Conn counts', 'Long-lived streams', 'Slow to notice CPU'],
    ['P2C', 'Two samples', 'Large fleets', 'Tiny fleets (noise)'],
    ['Consistent hash', 'Key', 'Cache hit rate', 'Hot keys'],
  ]}
/>

## 3. Real-World Implementation

TICK3
# Envoy-style idea: least-request (P2C) + outlier ejection
lb_policy: LEAST_REQUEST
outlier_detection:
  consecutive_5xx: 5
  interval: 10s
  base_ejection_time: 30s
TICK3

Pair with connection limits per backend so one node cannot take the whole herd after a restart (slow-start / warmup).

## 4. Visualizations

TICK3mermaid
flowchart TD
    C[Clients] --> LB[Load balancer]
    LB --> H1[Healthy replica]
    LB --> H2[Healthy replica]
    LB -.->|ejected| X[Unhealthy replica]
TICK3

## 5. Interview Prep

**Q: Where does the balancer live?**
**A:** Edge (NLB/ALB), service mesh sidecar, or client-side (look up endpoints, pick locally). Client-side removes a hop but pushes health logic into every caller.

**Q: Sticky sessions?**
**A:** They compensate for server memory. They also pin load and complicate failover. Prefer external session stores and stickiness only as a migration crutch.

**Q: How do you avoid thundering a new replica?**
**A:** Slow-start: gradually increase traffic for tens of seconds while JIT, cache, and pools warm.

## 6. Production Use Cases

- **Public HTTPS** via cloud LBs and CDN origins.
- **gRPC east-west** with P2C and outlier detection.
- **Stateful workers** with consistent hashing and virtual nodes.

<Callout icon="tip" title="Balance the expensive unit">
If cost is CPU-seconds, balance on in-flight or EWMA latency, not only connection count.
</Callout>
`,
  },
  {
    rel: '43.1 System Design Concepts/Partitioning/index.mdx',
    title: 'Partitioning',
    description:
      'Splitting data or traffic into slices that can live on different nodes, chosen by key, range, or directory, so one box is not the ceiling.',
    body: `
**Partitioning** (sharding when the slices are data) divides a problem so each node owns a subset. Compute partitions are worker pools. Data partitions are key ranges or hashes. The slice key is the most important design choice you will make for a decade.

## 1. Deep Dive and Mechanics

**Hash partitions.** hash(key) maps to a bucket. Even load if the key is even. Range queries across keys become scatter-gather.

**Range partitions.** Keys in [A, M) on node 1, [M, Z) on node 2. Great for scans of a user id prefix. Bad if you shard by timestamp (all writes hit the latest range).

**Directory / lookup.** A table maps key or tenant to a shard. Flexible migrations; the directory must be highly available and consistent.

**Secondary indexes and joins** that span partitions become fan-out queries or are forbidden. Design queries first, then the key.

<Callout icon="warning" title="A hot key is not a partition">
The celebrity user or a popular product id still lands on one shard. You must split the key (bucket suffixes) or cache that row everywhere.
</Callout>

## 2. Mathematical / Theoretical Foundation

Load imbalance: if keys are Zipf, hash partitioning still leaves a heavy tail of hot keys. Expected max load depends on the key distribution, not only on N.

Cross-partition transactions need 2PC or sagas; their latency and abort rate grow with the number of partitions touched. Keep transactions single-partition when you can.

<ComparisonTable
  headers={['Scheme', 'Scan by key prefix', 'Rebalance', 'Hot time-series']}
  rows={[
    ['Hash', 'Poor', 'Ring or vnode move', 'OK if key is not time'],
    ['Range', 'Excellent', 'Split/merge ranges', 'Bad if key is time'],
    ['Directory', 'Depends', 'Move one mapping', 'You can isolate'],
    ['Tenant = shard', 'Per tenant', 'Move a tenant', 'Huge tenant problem'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
def shard_of(user_id, n):
    return hash(user_id) % n

def shard_of_hot(user_id, n, buckets=16):
    # split a hot user across buckets at the cost of fan-out reads
    return hash(user_id + ':b0') % n
TICK3

When one user is hot, store user_id#0 .. user_id#k and query them in parallel. Document that the entity is no longer atomic.

## 4. Visualizations

TICK3mermaid
flowchart TD
    Key[Partition key] --> Hash[Hash or range]
    Hash --> S0[Shard 0]
    Hash --> S1[Shard 1]
    Hash --> S2[Shard 2]
    Q[Cross-shard query] --> S0
    Q --> S1
    Q --> S2
TICK3

## 5. Interview Prep

**Q: Partition versus shard versus replica?**
**A:** A partition is a slice of the keyspace. A shard is that slice placed on a node. A replica is a copy of a shard for HA or reads. Do not call three replicas "three shards."

**Q: How do you pick the key?**
**A:** It must be on every request that needs to stay fast, have high cardinality, and keep transactions local. User id, tenant id, or order id are common. Created-at is usually wrong.

**Q: How do you reshard live?**
**A:** Dual-write or migrate by vnode, keep a directory version, and replay. Treat it as a product launch, not a Friday toggle.

## 6. Production Use Cases

- **Multi-tenant SaaS** with tenant id as the shard key.
- **Time-series** sharded by metric id plus time bucket, not by time alone.
- **Search indexes** split by collection or hash of document id.

<Callout icon="tip" title="List the queries before the key">
If the primary read is "all orders last week," a hash of order id will hurt. Start from access patterns.
</Callout>
`,
  },
  {
    rel: '43.1 System Design Concepts/Pub-sub/index.mdx',
    title: 'Pub-Sub',
    description:
      'A messaging style where publishers emit to a topic and subscribers each receive a copy, decoupling producers from the set of consumers.',
    body: `
**Publish-subscribe** decouples senders from receivers. The publisher writes to a **topic**. The broker fans the message out to each subscription. Publishers do not know how many consumers exist. That is the point — and the operational surprise when a new subscriber triples load.

## 1. Deep Dive and Mechanics

**Fan-out.** Each subscription is its own cursor or queue. A slow subscriber should not block others if the broker isolates storage. In naive in-process observers, one slow listener blocks the publish call.

**Push versus pull.** Push delivers to an HTTP endpoint (SNS, webhooks). Pull lets the subscriber request batches (Pub/Sub pull, Kafka is a log cousin). Pull handles backpressure more naturally.

**Filtering.** Server-side filters reduce traffic. Client-side filters waste bandwidth. Ordering, if any, is usually per key or per partition, not global.

<Callout icon="info" title="Pub-sub is not a job queue">
If exactly one worker should process each item, you want a competing-consumer queue. If every interested system should see the item, you want pub-sub.
</Callout>

## 2. Mathematical / Theoretical Foundation

Cost is O(subscribers) per message in naive fan-out, or O(1) append plus per-subscriber consume in a log design. Retention and replay distinguish "true streams" from fire-and-forget topics that drop when the subscriber is down.

Delivery is typically at-least-once. Dedup is the subscriber's job unless the product offers idempotent keys.

<ComparisonTable
  headers={['Model', 'Who receives', 'Backpressure', 'Example']}
  rows={[
    ['Pub-sub topic', 'All subscribers', 'Per subscription', 'SNS, Pub/Sub'],
    ['Queue', 'One of many workers', 'Queue depth', 'SQS, Rabbit work queues'],
    ['Log stream', 'Each group independently', 'Consumer lag', 'Kafka'],
    ['In-process event', 'In-memory listeners', 'Caller blocks', 'UI buses'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
# Conceptual fan-out: each subscriber gets a copy
def publish(topics, topic, message):
    for sub in topics.get(topic, []):
        sub.enqueue(message)
TICK3

In production, use a broker. Put a schema, a producer id, and an idempotency key on the payload. Make handlers safe to run twice.

## 4. Visualizations

TICK3mermaid
flowchart LR
    Pub[Publisher] --> T[Topic]
    T --> S1[Email subscription]
    T --> S2[Search subscription]
    T --> S3[Analytics subscription]
TICK3

## 5. Interview Prep

**Q: SNS plus SQS?**
**A:** SNS is the fan-out. Each SQS queue is a durable subscription with its own retry and DLQ. That is the classic AWS pattern for "many independent workers."

**Q: Will a subscriber down miss messages?**
**A:** If the topic has no retention and no durable subscription, yes. If the subscription is a queue or a log with retention, it catches up.

**Q: How do you evolve the payload?**
**A:** Additive schema changes, a version field, and a registry. Breaking field reuse is how you poison old consumers.

## 6. Production Use Cases

- **Domain events** (OrderPlaced) to email, loyalty, and fraud.
- **Config or cache invalidation** fan-out (use care; invalidation storms exist).
- **IoT and notifications** with device or user topics.

<Callout icon="tip" title="Give each subscriber its own failure domain">
A shared lambda that does five jobs turns pub-sub back into a monolith with extra steps.
</Callout>
`,
  },
  {
    rel: '43.1 System Design Concepts/Queues/index.mdx',
    title: 'Queues',
    description:
      'A buffer of work items between producers and consumers that smooths spikes, enables retries, and turns sync RPC into asynchronous jobs.',
    body: `
A **queue** holds work until a consumer can do it. Producers enqueue and return. Consumers pull, process, and ack. Queues absorb spikes, isolate failures, and let you retry. They also hide a growing pile of undone work if nobody watches depth and age.

## 1. Deep Dive and Mechanics

**Competing consumers.** Several workers pull from one queue. Each message should be processed by one worker (at-least-once in practice). Visibility timeouts hide a message while it is in flight; if the worker dies, it reappears.

**Dead-letter queues.** After N failures, park the message. Poison pills must not block the queue forever.

**Ordering.** FIFO queues order per group at a throughput cost. Standard queues are cheaper and can reorder. If order matters, design the key and accept the cap, or make handlers commutative.

<Callout icon="warning" title="Ack after the side effect is durable">
Ack-then-write loses work on crash. Write-then-ack can duplicate. Prefer write-then-ack plus idempotency keys.
</Callout>

## 2. Mathematical / Theoretical Foundation

A queue is a G/G/c system. Stability: arrival rate less than service rate times workers. Depth D ~ (lambda - mu_eff) * t during a spike. Age of the head is the user-visible delay.

Little's law again: in-flight = rate * time-in-system. Visibility timeout must exceed p99 processing or you will double-deliver healthy work.

<ComparisonTable
  headers={['Queue type', 'Order', 'At-least-once', 'Typical cap']}
  rows={[
    ['Standard / best effort', 'No', 'Yes', 'Very high'],
    ['FIFO / group', 'Per group', 'Yes', 'Lower throughput'],
    ['Delay / scheduled', 'No', 'Yes', 'Deferred jobs'],
    ['In-memory channel', 'Yes local', 'No if process dies', 'Tiny'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
def worker(q, db):
    msg = q.receive(visibility_s=30)
    if db.already_done(msg.id):
        q.ack(msg)
        return
    db.apply(msg)  # durable side effect
    q.ack(msg)
TICK3

If apply is not idempotent, store msg.id in a unique table in the same transaction as the side effect.

## 4. Visualizations

TICK3mermaid
flowchart LR
    P[Producer] --> Q[Queue]
    Q --> W1[Worker 1]
    Q --> W2[Worker 2]
    W1 -->|fail N times| DLQ[Dead-letter queue]
TICK3

## 5. Interview Prep

**Q: Queue versus RPC?**
**A:** RPC is for when the caller needs the answer now. A queue is for when the work can finish later and should survive caller death. Timeouts and user polling or websockets close the loop.

**Q: How do you scale consumers?**
**A:** Add workers until you hit the bottleneck (DB, rate limit, partition count). Autoscale on age or depth, not only CPU.

**Q: Why is the queue growing?**
**A:** Produce greater than consume, or a poison message, or visibility too short causing retries. Graph produce, consume, in-flight, and DLQ.

## 6. Production Use Cases

- **Email and webhook delivery** with retries and DLQs.
- **Image transcode** and other bursty CPU jobs.
- **Outbox relay** from a DB transaction to downstream systems.

<Callout icon="tip" title="Alert on age, not only depth">
A million cheap messages may be fine. A head-of-line message that is 40 minutes old is a missed SLA.
</Callout>
`,
  },
  {
    rel: '43.1 System Design Concepts/Rate limiting/index.mdx',
    title: 'Rate Limiting',
    description:
      'Policy that caps how often a key may call an API, implemented with token buckets or windows, to protect capacity and enforce fairness.',
    body: `
**Rate limiting** is a policy: this key may do N units per window. Units might be requests, tokens, or expensive search units. Limits protect your database, enforce plan tiers, and slow abuse. They are not a substitute for authentication or for backpressure from a truly overloaded dependency.

## 1. Deep Dive and Mechanics

**Token bucket.** Tokens refill at rate r, bucket holds burst b. A request costs one token. This is the default modern algorithm: smooth rate plus controlled burst.

**Fixed window.** Count in [00:00, 00:01). Cheap and bursty at the window edge (double fire).

**Sliding window / sliding log.** Fairer, more state.

**Where it runs.** Edge (cheap, coarse), gateway (per API key), or service (per-tenant expensive query). Distributed limits need a shared counter (Redis) or an approximate local limit plus a global reconciler.

<Callout icon="info" title="Return 429 with a hint">
Tell honest clients Retry-After or X-RateLimit-Reset. Silent drops look like an outage and they retry harder.
</Callout>

## 2. Mathematical / Theoretical Foundation

Long-run admitted rate is at most r. Instantaneous burst is at most b. If arrivals are Poisson with mean lambda greater than r, reject probability is positive and the bucket spends time empty.

Sharded counters (one per gateway replica) over-admit by about the number of shards times b unless you coordinate. That may be acceptable at the edge.

<ComparisonTable
  headers={['Algorithm', 'Burst', 'Fairness', 'State']}
  rows={[
    ['Token bucket', 'Up to b', 'Good', 'Tokens + timestamp'],
    ['Fixed window', '2N at boundary', 'Weak', 'One counter'],
    ['Sliding window', 'Smoother', 'Better', 'More counters'],
    ['Leaky bucket', 'Queued / shaped', 'Smooth output', 'Queue'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
import time

class TokenBucket:
    def __init__(self, rate, burst):
        self.rate = rate
        self.burst = burst
        self.tokens = burst
        self.t = time.monotonic()

    def allow(self, cost=1):
        now = time.monotonic()
        self.tokens = min(self.burst, self.tokens + (now - self.t) * self.rate)
        self.t = now
        if self.tokens < cost:
            return False
        self.tokens -= cost
        return True
TICK3

Store this in Redis with a Lua script for atomicity across gateway replicas when you need a global cap.

## 4. Visualizations

TICK3mermaid
flowchart TD
    Req[Request] --> Key[Resolve key]
    Key --> B[Token bucket]
    B -->|token| OK[Pass]
    B -->|empty| R429[429 Retry-After]
TICK3

## 5. Interview Prep

**Q: Per IP versus per user versus per API key?**
**A:** IP is coarse (NAT) and easy to rotate. User and key map to a billable entity. Use all three at different layers: IP at WAF, key at gateway, user at the expensive query.

**Q: How do you rate-limit a distributed fleet?**
**A:** Centralized Redis counters, or local limits plus a global budget, or an edge service. Exact global limits add latency; many products accept slight over-admit.

**Q: Rate limit versus quota?**
**A:** Rate is short window (per second). Quota is long (per month). Both matter for billing plans.

## 6. Production Use Cases

- **Public APIs** with free and paid buckets.
- **Login and OTP** endpoints to blunt stuffing.
- **Expensive AI or search** endpoints priced in tokens not raw QPS.

<Callout icon="tip" title="Limit the expensive unit">
One "search" may cost 50x a ping. Charge tokens, not raw requests, or a legal client will still knock you over.
</Callout>
`,
  },
  {
    rel: '43.1 System Design Concepts/Reliability/index.mdx',
    title: 'Reliability',
    description:
      'The probability that a system keeps working correctly over a period, combining quality, operations, and design — broader than raw uptime.',
    body: `
**Reliability** is whether the system does the right thing for a stretch of time. Availability is "can I talk to it now." Reliability includes "did it charge twice," "did it lose the upload," and "did the nightly job run." SRE treats reliability as an engineered property with SLIs, not a vibe.

## 1. Deep Dive and Mechanics

You measure **SLIs** (success rate, freshness, correctness samples), set **SLOs**, and spend an **error budget**. When the budget is gone, you freeze features and fix toil. That is how reliability competes with feature velocity in the open.

**Correctness SLIs** are hard and necessary. Canary reads against a ledger. Checksums on blobs. Shadow compares on a new ranking model. Uptime alone will not catch a silent wrong multiply.

**Human reliability.** On-call load, runbooks, and deploy friction. A system that pages twice a night will be patched in a hurry and get worse.

<Callout icon="info" title="Reliability is a user promise">
The SLO is written in user terms: successful checkouts, fresh reads, jobs finished by 7:00. Internal CPU is a diagnostic.
</Callout>

## 2. Mathematical / Theoretical Foundation

Reliability R(t) is the probability of no failure in [0, t]. MTTF and MTTR combine into availability ~ MTTF / (MTTF + MTTR) for repairable systems. Improving MTTR (fast rollback) often beats chasing MTTF.

Error budgets convert SLO to a countable allowance. Burn rate is budget-spend per hour versus the ideal linear spend.

<ComparisonTable
  headers={['Word', 'Question', 'Typical SLI']}
  rows={[
    ['Availability', 'Can I use it now', 'Success ratio'],
    ['Reliability', 'Does it keep working right', 'Success plus correctness'],
    ['Durability', 'Is the write still there', 'Loss rate, restore tests'],
    ['Resilience', 'How ugly is failure', 'MTTR, blast radius'],
  ]}
/>

## 3. Real-World Implementation

TICK3
# Conceptual SLO
# SLI: proportion of checkout RPCs that finish 2xx in 800 ms
# SLO: 99.9 percent over 28 days
# Budget: 0.1 percent of eligible RPCs
# Fast-burn alert: 2 percent budget in 1 hour
TICK3

Exclude bad-input 4xx if the user cannot succeed anyway. Do not exclude "our outage."

## 4. Visualizations

TICK3mermaid
flowchart LR
    SLI[SLI measurements] --> SLO[SLO]
    SLO --> Budget[Error budget]
    Budget --> Go[Ship features]
    Budget --> Stop[Reliability work]
TICK3

## 5. Interview Prep

**Q: Reliability versus availability?**
**A:** Availability is a slice (up now). Reliability is the broader habit of correct service over time, including silent data bugs and batch jobs.

**Q: What if product wants 100 percent?**
**A:** There is no 100 percent. There is a cost curve. Make them pick a number and a price.

**Q: How do you improve reliability next quarter?**
**A:** Kill the top budget burners: one flaky deploy, one dependency without a timeout, one missing backup test. Do not start with a rewrite.

## 6. Production Use Cases

- **SRE error-budget policy** between product and platform.
- **Correctness probes** on billing and permissions.
- **Game-day programs** that measure MTTR, not just architecture diagrams.

<Callout icon="tip" title="Test restores, not only backups">
A backup you have never restored is a rumor. Reliability includes the recovery path.
</Callout>
`,
  },
  {
    rel: '43.1 System Design Concepts/Retry strategies/index.mdx',
    title: 'Retry Strategies',
    description:
      'When and how to repeat a failed call so transient faults recover without amplifying an outage into a retry storm.',
    body: `
**Retries** repeat a failed attempt because many faults are brief: a blip, a leader election, a full connection pool. Blind retries turn a small outage into a herd. A strategy is the set of rules: which errors, how many times, how long to wait, and whether the call is safe to repeat.

## 1. Deep Dive and Mechanics

**Idempotency first.** GET, PUT of the same body, and deletes keyed by id are usually safe. POST that charges a card is not, unless you send an Idempotency-Key the server stores.

**Backoff and jitter.** Exponential backoff (100 ms, 200 ms, 400 ms, ...) plus random jitter so clients do not align. Full jitter (pick uniform in [0, cap]) works well.

**Budgets.** Cap attempts and total time. Do not retry 429 forever. Do not retry 400. Do not retry if the breaker is open.

<Callout icon="warning" title="Retries are load amplifiers">
If 20 percent of calls time out and each retries twice, the dependency sees about 1.4x traffic when it is least able to take it.
</Callout>

## 2. Mathematical / Theoretical Foundation

If each attempt fails independently with probability p, P(success by n) = 1 - p^n. Failures are not independent in an outage (p jumps toward 1). Then retries only add load.

Hedged requests (send a duplicate after a delay) cut tail latency and double load on the tail. Use for read-only, cheap, idempotent calls.

<ComparisonTable
  headers={['Error', 'Retry', 'Why']}
  rows={[
    ['408 / 503 / timeout', 'Yes, with jitter', 'Often transient'],
    ['429', 'Yes, honor Retry-After', 'You are the overload'],
    ['401 / 403 / 404', 'No', 'Will not change'],
    ['409 conflict', 'Maybe after refresh', 'Not a blind retry'],
    ['Unsure POST', 'Only with idempotency key', 'Duplicate side effect'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
import random
import time

def retry(fn, attempts=4, base=0.1, cap=2.0):
    last = None
    for i in range(attempts):
        try:
            return fn()
        except TransientError as e:
            last = e
            sleep = min(cap, base * (2 ** i))
            time.sleep(random.random() * sleep)  # full jitter
    raise last
TICK3

Classify TransientError tightly. Socket timeout maybe. Application 500 on "card_declined" never.

## 4. Visualizations

TICK3mermaid
flowchart TD
    Call[Attempt] -->|ok| Done[Return]
    Call -->|transient| Wait[Jittered backoff]
    Wait --> Budget{Attempts left}
    Budget -->|yes| Call
    Budget -->|no| Fail[Surface error]
TICK3

## 5. Interview Prep

**Q: Why jitter?**
**A:** Synchronized clients retry on the same clock after a shared outage. They recreate the outage. Jitter smears the herd.

**Q: Where should retries live?**
**A:** One place. If the client, the mesh, and the SDK all retry, you get multiplicative storms. Document the owner.

**Q: Retry versus queue?**
**A:** Short retries hide blips on the request path. Long retries belong in a queue with a DLQ so the user is not connected for two minutes.

## 6. Production Use Cases

- **Idempotent reads** to a replica set during leader election.
- **Webhook delivery** with exponential backoff for hours, then DLQ.
- **Mesh defaults** with tight budgets on non-idempotent RPCs (often: do not retry).

<Callout icon="tip" title="Log attempt number on every span">
attempt=3 is how you prove a storm. Without it, you will argue about client behavior from memory.
</Callout>
`,
  },
  {
    rel: '43.1 System Design Concepts/Scalability/index.mdx',
    title: 'Scalability',
    description:
      'How capacity and cost grow as load grows — a property of the bottleneck, the serial fraction, and the coordination tax, not a synonym for Kubernetes.',
    body: `
**Scalability** is how a system behaves as load grows: more users, more data, more regions. A scalable design adds capacity without a rewrite and without linear cost in human toil. It is not "we run on many pods." It is a curve: QPS at SLO versus dollars and versus engineering time.

## 1. Deep Dive and Mechanics

Find the **bottleneck**. CPU on the app, IOPS on the primary, a global lock, a single-threaded event loop, a shard with a celebrity key. Scale that thing. Everything else is decoration.

**Dimensions.** Load (requests), data size, and complexity (tenants, features). Some systems scale in QPS and die on data size (unpartitioned indexes). Some scale in data and die on fan-out (every request touches every shard).

**Elasticity** is how fast you can add capacity. Scalability is whether adding capacity works at all.

<Callout icon="info" title="Draw the curve">
If 2x machines is not about 2x goodput, write down why. That sentence is the scalability design.
</Callout>

## 2. Mathematical / Theoretical Foundation

Amdahl: speedup less than or equal to 1 / (s + (1-s)/N). Universal Scalability Law adds a coherency term: contention and cross-talk eventually dominate. That is why "just add nodes" fails for chatty monoliths and for huge scatter-gather.

Cost scalability: if your bill is linear in QPS and you have no waste, you are doing well. If it is super-linear (cross-AZ chatter, O(N^2) meshes), fix the communication pattern.

<ComparisonTable
  headers={['Symptom', 'Likely limit', 'Move']}
  rows={[
    ['CPU high, latency OK', 'Compute', 'Scale out stateless'],
    ['DB CPU / locks', 'Primary', 'Cache, then shard'],
    ['p99 explodes before CPU', 'Queueing or chatter', 'Reduce hops, shed'],
    ['One tenant hot', 'Skew', 'Isolate cell or split key'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
def goodput_at_slo(qps_points, p99_ms, slo_ms=200):
    return max((q for q, p in zip(qps_points, p99_ms) if p <= slo_ms), default=0)
TICK3

Capacity is the max QPS that still meets the SLO, not the QPS at which the process melts. Load-test that definition.

## 4. Visualizations

TICK3mermaid
flowchart TD
    Load[More load] --> App[App tier]
    App --> Cache[Cache]
    Cache --> DB[Database]
    DB --> Wall[Serial bottleneck]
    Wall --> Shard[Partition or pay]
TICK3

## 5. Interview Prep

**Q: How do you design for 10x?**
**A:** State the bottleneck at 1x, show what breaks at 10x, and pick the one change that moves the bottleneck (cache, replica, shard, async). Do not list 20 patterns.

**Q: Scalability versus performance?**
**A:** Performance is fast at current load. Scalability is still correct and fast (enough) at much higher load. A very fast single box may not scale.

**Q: When do you shard early?**
**A:** When a single primary cannot hold the data or the write rate in the year-one model. Otherwise a well-tuned primary plus cache is simpler.

## 6. Production Use Cases

- **Read-heavy products** that scale with cache and CDN before shards.
- **Write-heavy ingest** that partitions on day one.
- **Multi-region** where scalability includes locality, not just node count.

<Callout icon="tip" title="Scale the SLO, not the vanity QPS">
A million QPS of 500s is not a scalable system. Quote goodput at the user SLO.
</Callout>
`,
  },
  {
    rel: '43.1 System Design Concepts/Sharding/index.mdx',
    title: 'Sharding',
    description:
      'Horizontal data partitioning that places disjoint key slices on different database nodes so write and storage capacity can grow beyond one primary.',
    body: `
**Sharding** is partitioning a dataset across databases or clusters. Each shard is its own primary (plus replicas). You shard when one machine cannot store the rows or absorb the writes. You inherit every distributed-systems problem you were avoiding: resharding, cross-shard joins, and uneven keys.

## 1. Deep Dive and Mechanics

Pick a **shard key** that appears on the hot paths and has high cardinality. Route with a hash, a range, or a directory service. The application (or a proxy like Vitess or a Mongo cluster) owns the map.

**Resharding.** Split a hot shard, migrate with dual-write or vnode move, then cut reads. This is a project, not a config flag.

**Queries.** Point lookups by shard key are cheap. Global secondary indexes are another distributed system (or they live on every shard and you scatter). Cross-shard transactions need sagas or a distributed txn layer.

<Callout icon="warning" title="You cannot hide a bad key with more shards">
If 40 percent of writes are one tenant, 40 percent of writes stay on one shard. Isolate that tenant or split its key.
</Callout>

## 2. Mathematical / Theoretical Foundation

Capacity ~ number of shards if load is balanced. Imbalance is the ratio max_load / mean_load. Hashing helps; Zipf keys do not disappear.

Cross-shard txn abort probability rises with shards touched (more locks, more network). The design goal is one-shard transactions for the common path.

<ComparisonTable
  headers={['Approach', 'Routing', 'Reshard', 'Ops weight']}
  rows={[
    ['App-level hash', 'App modulo or ring', 'Painful', 'You own it'],
    ['Proxy (Vitess)', 'Vindex / keyspace', 'Planned workflows', 'Heavy but known'],
    ['Mongo / Cosmos shards', 'Cluster map', 'Splitter', 'Vendor rules'],
    ['Citus / Spanner', 'DB-aware', 'Built-in', 'SQL constraints'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
SHARDS = ['db-a', 'db-b', 'db-c']

def shard_name(tenant_id):
    return SHARDS[hash(tenant_id) % len(SHARDS)]

def with_shard(pool, tenant_id, fn):
    return fn(pool[shard_name(tenant_id)])
TICK3

Never run a full-table query in a loop over shards on the user path without a budget. That is an accidental DDoS of your own fleet.

## 4. Visualizations

TICK3mermaid
flowchart TD
    App[App or proxy] --> Map[Shard map]
    Map --> S0[Shard 0 primary]
    Map --> S1[Shard 1 primary]
    S0 --> R0[Replicas]
    S1 --> R1[Replicas]
TICK3

## 5. Interview Prep

**Q: When do you shard?**
**A:** When vertical scale and read replicas cannot hold writes or disk with 12–24 months of growth. Sharding earlier is optional complexity.

**Q: Shard key versus primary key?**
**A:** The primary key identifies a row. The shard key decides placement. They can match (user id) or not (order id sharded by customer id).

**Q: How do you do a global unique id?**
**A:** Snowflake-style (timestamp, worker, sequence) or UUIDv7. Do not ask a single sequence table after you sharded to escape that table.

## 6. Production Use Cases

- **Multi-tenant OLTP** with tenant id sharding and a few dedicated shards for whales.
- **Messaging inboxes** sharded by user id.
- **Inventory** sharded by warehouse plus SKU range.

<Callout icon="tip" title="Keep a dump-and-restore escape hatch">
The first reshard will be uglier than the slide. Practice moving one small shard in staging with production-shaped data.
</Callout>
`,
  },
  {
    rel: '43.1 System Design Concepts/Throughput/index.mdx',
    title: 'Throughput',
    description:
      'Completed work per unit time — the capacity number you raise with parallelism, batching, and fewer serialized bottlenecks.',
    body: `
**Throughput** is completed units per second: requests, messages, or bytes. Latency is how long one unit takes. You can have high throughput and bad latency (huge batches) or low throughput and great latency (an idle luxury box). Design interviews that only quote latency have not sized the system.

## 1. Deep Dive and Mechanics

Throughput is limited by the **narrowest stage**: disk fsyncs, a single-threaded loop, a lock, or a downstream quota. Pipeline stages run in parallel; the slow stage sets the rate (Amdahl / theory of constraints).

**Batching** raises throughput by amortizing overhead (one fsync, one RPC, one TLS handshake) and usually raises latency. That trade is explicit in Kafka, in DB group commit, and in ML batch inference.

**Concurrency** raises throughput until you saturate a resource or until context-switch and lock contention eat the gain.

<Callout icon="info" title="Quote the unit">
QPS, records/s, and MiB/s are different systems. A 1 kQPS API of 10-byte pings is not a 1 kQPS API of 2 MiB uploads.
</Callout>

## 2. Mathematical / Theoretical Foundation

Little's law: throughput lambda = L / W. For a given concurrency L, cutting latency W raises throughput. For a given W, you need more L (more in-flight) to raise lambda — until a resource saturates.

Utilization rho = lambda / mu. As rho approaches 1, queues and latency explode, so usable throughput is less than theoretical mu if you have an SLO.

<ComparisonTable
  headers={['Lever', 'Throughput', 'Latency', 'Risk']}
  rows={[
    ['More replicas', 'Up', 'Flat if balanced', 'Shared dep'],
    ['Larger batches', 'Up', 'Up', 'Memory, delay'],
    ['More in-flight', 'Up then down', 'Up', 'Overload'],
    ['Cheaper payload', 'Up', 'Down', 'Product change'],
  ]}
/>

## 3. Real-World Implementation

TICK3python
def records_per_sec(n_records, seconds):
    if seconds <= 0:
        return 0.0
    return n_records / seconds

# capacity test: raise concurrency until p99 SLO breaks; that QPS is the number
TICK3

Report goodput (successful, valid) not accepted-then-500. Load generators that ignore errors will flatter you.

## 4. Visualizations

TICK3mermaid
flowchart LR
    In[Ingress] --> S1[Stage parse]
    S1 --> S2[Stage persist]
    S2 --> S3[Stage fan-out]
    S2 --> Cap[Persist is the cap]
TICK3

## 5. Interview Prep

**Q: How many servers for X QPS?**
**A:** Measure one server's goodput at the SLO, subtract headroom (usually 30–50 percent), divide. Then check the database, not only the app.

**Q: Why did throughput drop when we added threads?**
**A:** Lock contention, cache-line ping-pong, or the DB maxed out. The extra threads only queued.

**Q: Throughput versus bandwidth?**
**A:** Bandwidth is the pipe. Throughput is completed application work. You can saturate bandwidth with inefficient chatty RPCs and still have low record throughput.

## 6. Production Use Cases

- **Ingest pipelines** sized in records/s with batching.
- **Checkout** sized in successful checkouts/s at p99.
- **ETL** where throughput matters more than per-row latency.

<Callout icon="tip" title="Put a ceiling in the load test">
Find the knee of the latency-throughput curve. Operating past the knee is how you fail over a long weekend.
</Callout>
`,
  },
  {
    rel: '43.1 System Design Concepts/Vertical scaling/index.mdx',
    title: 'Vertical Scaling',
    description:
      'Making one node bigger — more CPU, RAM, or faster disks — a simple win with a hard ceiling, a larger blast radius, and diminishing returns.',
    body: `
**Vertical scaling** (scale up) buys a larger machine: more cores, more RAM, faster NVMe, a bigger DB instance class. It is the first move when the software is single-primary or poorly parallel. It is also a dead end: there is a largest SKU, and that SKU is a single failure domain.

## 1. Deep Dive and Mechanics

Databases love vertical scale because one node means one set of locks, one planner, no distributed txn. Many products live for years on a large primary plus replicas for reads. That is a valid design.

**Diminishing returns.** Doubling cores does not double throughput if the workload is serialized on a WAL, a single writer thread, or a hot row. Memory helps working set; once the working set fits, more RAM is cache luxury.

**Ops.** Bigger boxes take longer to start, longer to snapshot, and hurt more when they die. Failover of a 4 TB primary is a different sport than failover of a 100 GB one.

<Callout icon="warning" title="The largest SKU is not a strategy">
If year-two data does not fit, you will shard under duress. Estimate data and write rate before you promise "we will just buy bigger."
</Callout>

## 2. Mathematical / Theoretical Foundation

Amdahl again: serial fraction s caps speedup on more cores. I/O latency does not fall just because the CPU is faster; you need a better device or fewer fsyncs (group commit).

Cost: cloud instance prices are often super-linear at the top end. Two medium nodes can be cheaper than one huge one — but only if the software can use both.

<ComparisonTable
  headers={['Move', 'Complexity', 'Ceiling', 'Blast radius']}
  rows={[
    ['Bigger instance', 'Low', 'SKU max', 'One node'],
    ['Faster disk', 'Low', 'Device max', 'One node'],
    ['Read replica', 'Medium', 'Write still primary', 'Primary writes'],
    ['Shard out', 'High', 'Fleet', 'Per shard'],
  ]}
/>

## 3. Real-World Implementation

TICK3
# Intentional scale-up: raise the primary class, keep the same DNS name
# instance: db.r6i.2xlarge -> db.r6i.4xlarge
# then re-measure: WAL disk, lock waits, and hit rate. If WAL is the wall, cores will not save you.
TICK3

Take a snapshot and a parameter snapshot before the resize. Some resizes reboot; treat it as a planned failover.

## 4. Visualizations

TICK3mermaid
flowchart TD
    Load[Growing load] --> Box[Single primary]
    Box --> Up[Scale up SKU]
    Up --> Fit{Fits year-two}
    Fit -->|yes| Stay[Stay vertical plus replicas]
    Fit -->|no| Out[Plan horizontal shards]
TICK3

## 5. Interview Prep

**Q: Why start vertical?**
**A:** One node is easier to reason about, query, and back up. You postpone distributed bugs until the numbers force you.

**Q: When is vertical the wrong answer?**
**A:** Multi-region active-active, data larger than one disk, or write rates above one machine's WAL. Also when a single-box outage exceeds the SLO.

**Q: Can you mix both?**
**A:** Yes. Fat shards (vertical) times many shards (horizontal) is how large stores actually look.

## 6. Production Use Cases

- **Early-stage OLTP** on a managed large primary.
- **In-memory analytics** that need a terabyte-class box.
- **License-bound software** that cannot cluster.

<Callout icon="tip" title="Measure the serial resource">
If the wait is Lock or WALWrite, a larger CPU class is a more expensive wait. Fix the query or the write pattern first.
</Callout>
`,
  },
]
